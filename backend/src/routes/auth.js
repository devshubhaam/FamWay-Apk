import { Router } from 'express';
import * as a from '../controllers/authController.js';
import * as g from '../controllers/googleController.js';
import { requireAuth, requireCsrfToken } from '../middleware/auth.js';
import { loginIpLimiter, loginEmailLimiter, registerLimiter, resendLimiter, oauthLimiter } from '../middleware/rateLimit.js';

const r = Router();
r.post('/register', registerLimiter, a.register);
r.post('/login', loginIpLimiter, loginEmailLimiter, a.login);
r.post('/logout', requireAuth, requireCsrfToken, a.logout);
r.get('/me', requireAuth, a.me);
r.get('/verify-email', a.verifyEmail);
r.post('/resend-verification', resendLimiter, a.resendVerification);
r.post('/google/start', oauthLimiter, g.start);
r.get('/google/callback', oauthLimiter, g.callback);
r.post('/google/exchange', oauthLimiter, g.exchange);
export default r;
