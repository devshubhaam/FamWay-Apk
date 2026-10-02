// Single place for auth-related configuration. Override any value via .env (see .env.example).
// Everything here is PUBLIC: no secrets ever belong in the frontend/APK.
const env = import.meta.env;

// Mock auth is DEV-ONLY: in a production build import.meta.env.DEV is false, so the flag is always false
// and the mock module is dropped from the bundle.
export const USE_MOCK_AUTH = env.DEV && env.VITE_USE_MOCK_AUTH === 'true';

export const AUTH_ENDPOINTS = {
  login: env.VITE_AUTH_LOGIN_PATH || '/auth/login',
  register: env.VITE_AUTH_REGISTER_PATH || '/auth/register',
  logout: env.VITE_AUTH_LOGOUT_PATH || '/auth/logout',
  session: env.VITE_AUTH_SESSION_PATH || '/auth/me',
  resendVerification: '/auth/resend-verification',
  googleStart: '/auth/google/start',
  googleExchange: '/auth/google/exchange',
  passkeyRegisterOptions: '/auth/passkey/register/options',
  passkeyRegisterVerify: '/auth/passkey/register/verify',
  passkeyLoginOptions: '/auth/passkey/login/options',
  passkeyLoginVerify: '/auth/passkey/login/verify',
};

// Custom URL scheme the Android app registers; the backend redirects here after Google sign-in.
export const APP_SCHEME = env.VITE_APP_SCHEME || 'famgateway';

export const LEGAL_LINKS = {
  terms: env.VITE_TERMS_URL || 'https://famgateway.in/terms.php',
  privacy: env.VITE_PRIVACY_URL || 'https://famgateway.in/privacy.php',
};
