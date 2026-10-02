import { OAuth2Client } from 'google-auth-library';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { generateMerchantId } from '../utils/crypto.js';
import { HttpError } from '../utils/httpError.js';

const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
export const googleConfigured = () => Boolean(env.google.clientId && env.google.clientSecret && env.google.redirectUri);
const client = () => new OAuth2Client(env.google.clientId, env.google.clientSecret, env.google.redirectUri);

export function buildAuthUrl({ state, nonce, codeChallenge }) {
  const p = new URLSearchParams({
    client_id: env.google.clientId, redirect_uri: env.google.redirectUri, response_type: 'code',
    scope: 'openid email profile', state, nonce, code_challenge: codeChallenge, code_challenge_method: 'S256',
    prompt: 'select_account',
  });
  return `${AUTH_URL}?${p}`;
}

// Exchanges the code (client secret used here, server-side only) and VERIFIES the ID token signature/aud/iss/exp.
export async function verifyGoogleCode({ code, codeVerifier, nonce }) {
  const c = client();
  const { tokens } = await c.getToken({ code, codeVerifier, redirect_uri: env.google.redirectUri });
  if (!tokens.id_token) throw new HttpError(401, 'google_failed');
  const ticket = await c.verifyIdToken({ idToken: tokens.id_token, audience: env.google.clientId });
  const p = ticket.getPayload();
  if (!p || p.nonce !== nonce || !p.sub || !p.email || p.email_verified !== true) throw new HttpError(401, 'google_failed');
  return { sub: p.sub, email: p.email.toLowerCase(), name: p.name, picture: p.picture };
}

// One MongoDB user per verified e-mail: find by Google sub -> link by e-mail -> create.
export async function findOrCreateGoogleUser(g) {
  const bySub = await User.findOne({ 'providers.google.sub': g.sub });
  if (bySub) return bySub;

  const existing = await User.findOne({ email: g.email }).select('+passwordHash');
  if (existing) {
    if (existing.providers?.google?.sub && existing.providers.google.sub !== g.sub) throw new HttpError(409, 'google_conflict');
    // Pre-hijack defence: an UNVERIFIED password account may belong to someone who never owned the mailbox.
    // Google proves ownership, so drop the unproven password before linking.
    if (!existing.emailVerified) existing.passwordHash = undefined;
    existing.emailVerified = true;
    existing.providers = { ...(existing.providers?.toObject?.() || {}), google: { sub: g.sub } };
    if (!existing.avatarUrl && g.picture) existing.avatarUrl = g.picture;
    await existing.save();
    return existing;
  }
  try {
    return await User.create({
      name: g.name || g.email.split('@')[0], email: g.email, emailVerified: true, avatarUrl: g.picture,
      merchantId: await generateMerchantId(User), providers: { google: { sub: g.sub } },
    });
  } catch (e) {
    if (e?.code === 11000) return User.findOne({ email: g.email }); // concurrent sign-up race
    throw e;
  }
}
