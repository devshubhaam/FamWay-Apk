import { Router } from 'express';
import * as p from '../controllers/passkeyController.js';
import { requireAuth, requireCsrfToken } from '../middleware/auth.js';
import { passkeyLimiter } from '../middleware/rateLimit.js';

const r = Router();
r.use(passkeyLimiter);
r.post('/register/options', requireAuth, requireCsrfToken, p.registerOptions);
r.post('/register/verify', requireAuth, requireCsrfToken, p.registerVerify);
r.post('/login/options', p.loginOptions);
r.post('/login/verify', p.loginVerify);
export default r;
