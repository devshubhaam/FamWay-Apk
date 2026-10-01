import { request } from './api';
import { AUTH_ENDPOINTS, USE_MOCK_AUTH } from './config';

// Mock is a lazy chunk: it is never downloaded unless VITE_USE_MOCK_AUTH=true.
const mock = () => import('./mockAuth');

export const login = (email, password) => USE_MOCK_AUTH
  ? mock().then((m) => m.login(email, password))
  : request(AUTH_ENDPOINTS.login, { method: 'POST', body: { email, password } });

// payload: { name, email, phone, password }
export const register = (payload) => USE_MOCK_AUTH
  ? mock().then((m) => m.register(payload))
  : request(AUTH_ENDPOINTS.register, { method: 'POST', body: payload });

export const logout = () => USE_MOCK_AUTH
  ? mock().then((m) => m.logout())
  : request(AUTH_ENDPOINTS.logout, { method: 'POST' });

export const getSession = () => USE_MOCK_AUTH
  ? mock().then((m) => m.getSession())
  : request(AUTH_ENDPOINTS.session);
