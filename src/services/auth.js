import { request, setCsrfToken } from './api';
import { AUTH_ENDPOINTS, USE_MOCK_AUTH } from './config';

// DEV-ONLY mock. `import.meta.env.DEV` is false in production builds, so this branch (and mockAuth.js) is removed from the APK.
const useMock = () => import.meta.env.DEV && USE_MOCK_AUTH;
const mock = () => import('./mockAuth');
const withCsrf = (r) => { setCsrfToken(r?.csrfToken); return r; };

export const login = (email, password) => useMock()
  ? mock().then((m) => m.login(email, password))
  : request(AUTH_ENDPOINTS.login, { method: 'POST', body: { email, password } }).then(withCsrf);

// payload: { name, email, phone, password }. Does NOT sign the user in.
export const register = (payload) => useMock()
  ? mock().then((m) => m.register(payload))
  : request(AUTH_ENDPOINTS.register, { method: 'POST', body: payload });

export const logout = () => (useMock()
  ? mock().then((m) => m.logout())
  : request(AUTH_ENDPOINTS.logout, { method: 'POST' })).finally(() => setCsrfToken(null));

export const getSession = () => useMock()
  ? mock().then((m) => m.getSession())
  : request(AUTH_ENDPOINTS.session).then(withCsrf);

export const resendVerification = (email) => request(AUTH_ENDPOINTS.resendVerification, { method: 'POST', body: { email } });
export const googleStart = (body) => request(AUTH_ENDPOINTS.googleStart, { method: 'POST', body });
export const googleExchange = (code, verifier) => request(AUTH_ENDPOINTS.googleExchange, { method: 'POST', body: { code, verifier } }).then(withCsrf);
