import rateLimit from 'express-rate-limit';

const make = (windowMs, limit, keyGenerator) => rateLimit({
  windowMs, limit, standardHeaders: true, legacyHeaders: false, ...(keyGenerator ? { keyGenerator } : {}),
  handler: (req, res) => res.status(429).json({ error: { code: 'rate_limited', message: 'Too many attempts. Try again later.' } }),
});
const emailKey = (req) => `e:${String(req.body?.email || '').toLowerCase().slice(0, 254)}`;

export const loginIpLimiter = make(15 * 60_000, 20);
export const loginEmailLimiter = make(15 * 60_000, 8, emailKey);   // per-account brute-force guard
export const registerLimiter = make(60 * 60_000, 10);
export const resendLimiter = make(60 * 60_000, 5);
export const passkeyLimiter = make(15 * 60_000, 40);
export const oauthLimiter = make(15 * 60_000, 40);
