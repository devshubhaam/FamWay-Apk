// Single place for auth-related configuration. Override any value via .env (see .env.example).
const env = import.meta.env;

// Mock is opt-in only: a production build without VITE_USE_MOCK_AUTH=true always talks to the real backend.
export const USE_MOCK_AUTH = env.VITE_USE_MOCK_AUTH === 'true';

export const AUTH_ENDPOINTS = {
  login: env.VITE_AUTH_LOGIN_PATH || '/auth/login',
  register: env.VITE_AUTH_REGISTER_PATH || '/auth/register',
  logout: env.VITE_AUTH_LOGOUT_PATH || '/auth/logout',
  session: env.VITE_AUTH_SESSION_PATH || '/auth/me',
};

export const LEGAL_LINKS = {
  terms: env.VITE_TERMS_URL || 'https://famgateway.in/terms.php',
  privacy: env.VITE_PRIVACY_URL || 'https://famgateway.in/privacy.php',
};
