import { request } from './api';
export const login = (email, password) => request('/auth/login', { method: 'POST', body: { email, password } });
export const logout = () => request('/auth/logout', { method: 'POST' });
export const getSession = () => request('/auth/me');
