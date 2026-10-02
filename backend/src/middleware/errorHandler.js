import { ZodError } from 'zod';
import { HttpError } from '../utils/httpError.js';

export const notFound = (req, res) => res.status(404).json({ error: { code: 'not_found', message: 'Not found' } });

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    const fields = {}; err.issues.forEach((i) => { fields[i.path.join('.')] ||= i.message; });
    return res.status(400).json({ error: { code: 'validation', message: 'Invalid input', fields } });
  }
  if (err instanceof HttpError) return res.status(err.status).json({ error: { code: err.code, message: err.message } });
  if (err?.code === 11000) return res.status(409).json({ error: { code: 'conflict', message: 'Already exists' } });
  if (err?.type === 'entity.parse.failed' || err?.type === 'entity.too.large') return res.status(400).json({ error: { code: 'bad_request', message: 'Bad request' } });
  console.error('[error]', req.method, req.path, err?.name, err?.message); // never log bodies, cookies or secrets
  res.status(500).json({ error: { code: 'server_error', message: 'Something went wrong' } });
}
