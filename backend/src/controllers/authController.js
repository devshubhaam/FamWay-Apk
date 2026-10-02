import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { asyncHandler, HttpError } from '../utils/httpError.js';
import { registerSchema, loginSchema, emailOnlySchema } from '../utils/validators.js';
import { generateMerchantId } from '../utils/crypto.js';
import { createSession, destroySession } from '../services/sessionService.js';
import { issueVerification, consumeVerification } from '../services/verificationService.js';

const COST = 12;
// Constant-time-ish defence against user enumeration by response time.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', COST);
const BAD_LOGIN = () => new HttpError(401, 'invalid_credentials', 'Invalid email or password');

export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = registerSchema.parse(req.body);
  if (await User.exists({ email })) throw new HttpError(409, 'email_taken', 'An account with this email already exists');
  const user = await User.create({
    name, email, phone, passwordHash: await bcrypt.hash(password, COST),
    emailVerified: false, merchantId: await generateMerchantId(User),
  });
  let emailSent = true;
  try { await issueVerification(user); } catch (e) { emailSent = false; console.error('[email] verification send failed:', e?.message); }
  // No auto-login: the frontend sends the user to /login after registering.
  res.status(201).json({ ok: true, emailVerificationSent: emailSent });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await User.findOne({ email }).select('+passwordHash');
  const ok = await bcrypt.compare(password, user?.passwordHash || DUMMY_HASH);
  if (!user || !user.passwordHash || !ok) throw BAD_LOGIN();
  if (!user.emailVerified) throw new HttpError(403, 'email_not_verified', 'Please verify your email before signing in');
  const { csrfToken } = await createSession(res, user, req);
  res.json({ user: user.toPublic(), csrfToken });
});

export const logout = asyncHandler(async (req, res) => { await destroySession(req, res); res.json({ ok: true }); });

export const me = (req, res) => res.json({ user: req.user.toPublic(), csrfToken: req.session.csrfToken });

const page = (title, msg) => `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><body style="font-family:system-ui;max-width:420px;margin:15vh auto;padding:0 20px;text-align:center"><h2>${title}</h2><p>${msg}</p></body>`;
export const verifyEmail = asyncHandler(async (req, res) => {
  const token = String(req.query.token || '');
  const rec = token.length >= 20 && token.length <= 128 ? await consumeVerification(token) : null;
  res.set('Cache-Control', 'no-store').type('html');
  if (!rec) return res.status(400).send(page('Link invalid or expired', 'Request a new verification email from the sign-in screen.'));
  await User.updateOne({ _id: rec.userId }, { $set: { emailVerified: true } });
  res.send(page('Email verified', 'You can close this tab and sign in to the FamGateway app.'));
});

// Always 200 with the same body, so it cannot be used to discover which e-mails are registered.
export const resendVerification = asyncHandler(async (req, res) => {
  const { email } = emailOnlySchema.parse(req.body);
  const user = await User.findOne({ email }).select('+passwordHash');
  if (user && !user.emailVerified && user.passwordHash) {
    try { await issueVerification(user); } catch (e) { console.error('[email] resend failed:', e?.message); }
  }
  res.json({ ok: true });
});
