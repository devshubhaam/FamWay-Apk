import { COOKIE_NAME, findSession } from '../services/sessionService.js';
import { HttpError } from '../utils/httpError.js';
import { safeEqual } from '../utils/crypto.js';

export async function requireAuth(req, res, next) {
  try {
    const s = await findSession(req.cookies?.[COOKIE_NAME]);
    if (!s || !s.userId) throw new HttpError(401, 'unauthorized', 'Not signed in');
    req.session = s; req.user = s.userId; next();
  } catch (e) { next(e); }
}
// Synchroniser token for session-bound state changes (logout, passkey registration).
export function requireCsrfToken(req, res, next) {
  if (!safeEqual(req.get('x-csrf-token'), req.session?.csrfToken)) return next(new HttpError(403, 'csrf', 'Invalid CSRF token'));
  next();
}
