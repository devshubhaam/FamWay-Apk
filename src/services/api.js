const BASE = import.meta.env.VITE_API_BASE_URL || '';
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT_MS || 15000);
export class ApiError extends Error { constructor(kind, status) { super(kind); this.kind = kind; this.status = status; } }
const MSG = { offline: 'No internet connection.', timeout: 'The server took too long to respond.', unauthorized: 'Your session has expired. Please sign in again.',
  server: 'Something went wrong on our side. Please try again.', invalid: 'Received an unexpected response from the server.', network: 'Cannot reach the server.' };
export const friendlyMessage = (e) => MSG[e?.kind] || MSG.server;
let onUnauthorized = () => {};
export const setUnauthorizedHandler = (fn) => { onUnauthorized = fn; };
export async function request(path, { method = 'GET', body } = {}) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) throw new ApiError('offline');
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), TIMEOUT);
  try {
    // Session = httpOnly secure cookie set by backend; no tokens kept in JS-readable storage.
    const res = await fetch(BASE + path, { method, credentials: 'include', signal: ctl.signal,
      headers: { Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined });
    if (res.status === 401) { onUnauthorized(); throw new ApiError('unauthorized', 401); }
    if (!res.ok) throw new ApiError('server', res.status);
    try { return await res.json(); } catch { throw new ApiError('invalid'); }
  } catch (e) {
    if (e instanceof ApiError) throw e;
    throw new ApiError(e.name === 'AbortError' ? 'timeout' : 'network');
  } finally { clearTimeout(t); }
}
