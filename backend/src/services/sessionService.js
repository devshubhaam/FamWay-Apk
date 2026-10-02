import { Session } from '../models/Session.js';
import { env } from '../config/env.js';
import { randomToken, sha256 } from '../utils/crypto.js';

export const COOKIE_NAME = 'fg_sid';
const cookieOpts = () => ({
  httpOnly: true,
  secure: env.cookieSecure,
  sameSite: env.cookieSecure ? 'none' : 'lax',
  path: '/',
});

export async function createSession(res, user, req) {
  const token = randomToken(32);
  const csrfToken = randomToken(24);
  await Session.create({
    tokenHash: sha256(token), userId: user._id, csrfToken,
    userAgent: String(req.get('user-agent') || '').slice(0, 200),
    expiresAt: new Date(Date.now() + env.sessionTtlMs),
  });
  res.cookie(COOKIE_NAME, token, { ...cookieOpts(), maxAge: env.sessionTtlMs });
  return { csrfToken };
}

export const findSession = (token) =>
  token ? Session.findOne({ tokenHash: sha256(token), expiresAt: { $gt: new Date() } }).populate('userId') : null;

export async function destroySession(req, res) {
  const token = req.cookies?.[COOKIE_NAME];
  if (token) await Session.deleteOne({ tokenHash: sha256(token) });
  res.clearCookie(COOKIE_NAME, cookieOpts());
}
