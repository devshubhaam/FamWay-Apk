const list = (v) => String(v || '').split(',').map((s) => s.trim()).filter(Boolean);
const strip = (v) => String(v || '').replace(/\/+$/, '');
const e = process.env;
const isProd = e.NODE_ENV === 'production';

export const env = {
  isProd,
  port: Number(e.PORT) || 8000,
  mongoUri: e.MONGODB_URI,
  apiPublicUrl: strip(e.API_PUBLIC_URL),
  webAppUrl: strip(e.WEB_APP_URL),
  deepLinkScheme: e.APP_DEEP_LINK_SCHEME || 'famgateway',
  corsOrigins: [...list(e.CORS_ORIGINS), ...(e.WEB_APP_URL ? [strip(e.WEB_APP_URL)] : [])],
  sessionTtlMs: (Number(e.SESSION_TTL_DAYS) || 30) * 24 * 60 * 60 * 1000,
  // Cross-site (APK / separate web host -> Koyeb) needs Secure + SameSite=None. Plain-http local dev uses Lax.
  cookieSecure: isProd || e.COOKIE_SECURE === 'true',
  smtp: { host: e.SMTP_HOST, port: Number(e.SMTP_PORT) || 587, user: e.SMTP_USER, pass: e.SMTP_PASSWORD, from: e.SMTP_FROM },
  google: { clientId: e.GOOGLE_CLIENT_ID, clientSecret: e.GOOGLE_CLIENT_SECRET, redirectUri: e.GOOGLE_REDIRECT_URI },
  passkey: {
    rpId: e.PASSKEY_RP_ID, rpName: e.PASSKEY_RP_NAME || 'FamGateway',
    origins: [...list(e.PASSKEY_ORIGINS), ...list(e.PASSKEY_ANDROID_ORIGINS)],
  },
  android: { packageName: e.ANDROID_PACKAGE_NAME, certSha256: list(e.ANDROID_CERT_SHA256) },
};

export function assertEnv() {
  const missing = ['MONGODB_URI', 'API_PUBLIC_URL'].filter((k) => !process.env[k]);
  if (isProd && !env.corsOrigins.length) missing.push('CORS_ORIGINS');
  if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}
