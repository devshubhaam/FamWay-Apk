import { env } from '../config/env.js';
import { HttpError } from '../utils/httpError.js';

const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);
// Baseline CSRF defence for cookie auth: (1) Origin, when sent, must be allow-listed;
// (2) a custom header is mandatory, which a cross-site <form>/simple request cannot add and CORS preflight blocks.
export function csrfGuard(req, res, next) {
  if (SAFE.has(req.method)) return next();
  const origin = req.get('origin');
  if (origin && !env.corsOrigins.includes(origin)) return next(new HttpError(403, 'csrf', 'Origin not allowed'));
  if (req.get('x-requested-with') !== 'FamGateway') return next(new HttpError(403, 'csrf', 'Missing header'));
  next();
}
