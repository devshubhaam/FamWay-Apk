export class HttpError extends Error {
  constructor(status, code, message) { super(message || code); this.status = status; this.code = code; }
}
export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
