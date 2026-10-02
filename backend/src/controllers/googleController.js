import { asyncHandler, HttpError } from '../utils/httpError.js';
import { env } from '../config/env.js';
import { putChallenge, takeChallenge } from '../models/AuthChallenge.js';
import { randomToken, sha256, sha256b64url } from '../utils/crypto.js';
import { buildAuthUrl, verifyGoogleCode, findOrCreateGoogleUser, googleConfigured } from '../services/googleService.js';
import { createSession } from '../services/sessionService.js';
import { User } from '../models/User.js';

const B64URL = /^[A-Za-z0-9_-]{43}$/;

// POST /auth/google/start  { platform: 'native'|'web', appChallenge? }  -> { url }
export const start = asyncHandler(async (req, res) => {
  if (!googleConfigured()) throw new HttpError(503, 'google_unavailable', 'Google sign-in is not configured');
  const platform = req.body?.platform === 'native' ? 'native' : 'web';
  const appChallenge = req.body?.appChallenge;
  if (platform === 'native' && !B64URL.test(String(appChallenge || ''))) throw new HttpError(400, 'validation', 'Bad challenge');
  const state = randomToken(32), nonce = randomToken(24), codeVerifier = randomToken(48);
  await putChallenge('google-state', sha256(state), { nonce, codeVerifier, platform, appChallenge: platform === 'native' ? appChallenge : undefined }, 10 * 60_000);
  res.json({ url: buildAuthUrl({ state, nonce, codeChallenge: sha256b64url(codeVerifier) }) });
});

const back = (platform, query) => platform === 'native'
  ? `${env.deepLinkScheme}://auth/callback?${query}`
  : `${env.webAppUrl || env.apiPublicUrl}/#/auth/callback?${query}`;

// GET /auth/google/callback  (Google redirects the SYSTEM BROWSER here; no cookie is set here on purpose)
export const callback = asyncHandler(async (req, res) => {
  const { code, state, error } = req.query;
  const ch = typeof state === 'string' ? await takeChallenge('google-state', sha256(state)) : null; // single use
  if (!ch) return res.status(400).type('text').send('Sign-in link expired. Return to the app and try again.');
  const { nonce, codeVerifier, platform, appChallenge } = ch.data;
  try {
    if (error || typeof code !== 'string') throw new HttpError(401, 'google_failed');
    const g = await verifyGoogleCode({ code, codeVerifier, nonce });
    const user = await findOrCreateGoogleUser(g);
    const appCode = randomToken(32);
    await putChallenge('login-code', sha256(appCode), { userId: String(user._id), appChallenge }, 2 * 60_000);
    res.redirect(302, back(platform, `code=${appCode}`));
  } catch (e) {
    console.error('[google] callback failed:', e?.code || e?.message);
    res.redirect(302, back(platform, `error=${e?.code === 'google_conflict' ? 'google_conflict' : 'google_failed'}`));
  }
});

// POST /auth/google/exchange { code, verifier? } -> sets the session cookie in the APP's own HTTP context
export const exchange = asyncHandler(async (req, res) => {
  const { code, verifier } = req.body || {};
  const bad = new HttpError(401, 'invalid_code', 'Sign-in failed');
  if (typeof code !== 'string' || code.length > 128) throw bad;
  const rec = await takeChallenge('login-code', sha256(code));
  if (!rec) throw bad;
  if (rec.data.appChallenge && sha256b64url(String(verifier || '')) !== rec.data.appChallenge) throw bad; // PKCE-style binding
  const user = await User.findById(rec.data.userId);
  if (!user) throw bad;
  const { csrfToken } = await createSession(res, user, req);
  res.json({ user: user.toPublic(), csrfToken });
});
