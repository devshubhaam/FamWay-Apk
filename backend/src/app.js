import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { csrfGuard } from './middleware/csrf.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import passkeyRoutes from './routes/passkey.js';

export function createApp() {
  const app = express();
  app.set('trust proxy', 1); // Koyeb terminates TLS in front of the app (needed for rate-limit IPs + secure cookies)
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({
    origin: (origin, cb) => cb(null, !origin || env.corsOrigins.includes(origin)),
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Requested-With', 'X-CSRF-Token'],
    maxAge: 600,
  }));
  app.use(express.json({ limit: '50kb' }));
  app.use(cookieParser());

  app.get('/health', (req, res) => res.json({ ok: true }));

  // Digital Asset Links so Android Credential Manager lets the APK use passkeys for this RP ID.
  app.get('/.well-known/assetlinks.json', (req, res) => {
    const { packageName, certSha256 } = env.android;
    if (!packageName || !certSha256.length) return res.status(404).json([]);
    res.json([{
      relation: ['delegate_permission/common.get_login_creds', 'delegate_permission/common.handle_all_urls'],
      target: { namespace: 'android_app', package_name: packageName, sha256_cert_fingerprints: certSha256 },
    }]);
  });

  app.use('/auth', (req, res, next) => { res.set('Cache-Control', 'no-store'); next(); }, csrfGuard);
  app.use('/auth/passkey', passkeyRoutes);
  app.use('/auth', authRoutes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
