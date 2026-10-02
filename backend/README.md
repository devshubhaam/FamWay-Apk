# FamGateway auth backend (Express + MongoDB Atlas + Koyeb)

## Endpoints
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | /health | - | `{ "ok": true }` |
| POST | /auth/register | - | 201, 409 `email_taken`; sends verification e-mail; no auto-login |
| GET | /auth/verify-email?token= | - | marks `emailVerified` |
| POST | /auth/resend-verification | - | always 200 (no enumeration) |
| POST | /auth/login | - | 403 `email_not_verified`; sets `fg_sid` cookie |
| POST | /auth/logout | session + CSRF | deletes server session |
| GET | /auth/me | session | `{ user, csrfToken }` |
| POST | /auth/google/start | - | returns Google URL (code + PKCE + nonce) |
| GET | /auth/google/callback | - | Google redirects here; bounces to `famgateway://auth/callback?code=` (APK) or `<WEB_APP_URL>/#/auth/callback?code=` |
| POST | /auth/google/exchange | - | one-time code -> session cookie |
| POST | /auth/passkey/register/options, /verify | session + CSRF | |
| POST | /auth/passkey/login/options, /verify | - | usernameless |
| GET | /.well-known/assetlinks.json | - | Android Digital Asset Links |

MongoDB collections: `users`, `sessions`, `verificationtokens`, `passkeycredentials`, `authchallenges` (single-use, TTL: passkey challenges, Google state, one-time app codes). Unique indexes: `users.email`, `users.merchantId`, `users.providers.google.sub` (partial), `passkeycredentials.credentialId`, `sessions.tokenHash`, `verificationtokens.tokenHash`.

## Deploy on Koyeb
1. Push repo to GitHub. Koyeb > Create Service > GitHub > this repo, **Work directory: `backend`**, builder Buildpack (Node 20+), run command `npm start`, port 8000 (HTTP), health check `/health`.
2. Atlas: create cluster + DB user, Network Access allow Koyeb egress (0.0.0.0/0 on the free tier), copy the SRV string into `MONGODB_URI`.
3. Add every variable from `.env.example` as a Koyeb **secret/env var** (never commit them). Set `NODE_ENV=production`.
4. Deploy, open `https://<app>.koyeb.app/health`.
5. GitHub repo > Settings > Variables: `VITE_API_BASE_URL=https://<app>.koyeb.app`.

Required: `MONGODB_URI, API_PUBLIC_URL, CORS_ORIGINS`. For features: SMTP_* (verification e-mail), GOOGLE_* , PASSKEY_*, ANDROID_*.
Without SMTP in production, users cannot verify and therefore cannot sign in with a password.

## Google setup
1. Google Cloud Console > APIs & Services > OAuth consent screen (External, add test users while in Testing).
2. Credentials > Create OAuth client ID > **Web application** (not Android).
3. Authorized redirect URI: `https://<koyeb-domain>/auth/google/callback` (exactly `GOOGLE_REDIRECT_URI`). No JavaScript origins needed.
4. Put Client ID/secret in Koyeb as `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`. The secret never reaches the APK.
5. The APK needs no Google SHA-1/Android client: sign-in runs in the system browser and returns via the `famgateway://auth/callback` deep link (manifest patched by the workflow).

## Passkey setup
- `PASSKEY_RP_ID` = backend host only, e.g. `my-app-org.koyeb.app` (no scheme/port). Dev: `localhost`.
- `PASSKEY_ORIGINS` = web origins (prod: `https://my-app-org.koyeb.app`; dev: `http://localhost:5173`).
- `PASSKEY_ANDROID_ORIGINS` = `android:apk-key-hash:<base64url SHA-256 of signing cert>`. Convert the hex fingerprint printed by the workflow: `echo <hex-without-colons> | xxd -r -p | basenc --base64url | tr -d =`.
- `ANDROID_PACKAGE_NAME` (`com.example.paymentdashboard`) + `ANDROID_CERT_SHA256` (`AA:BB:..`) feed `/.well-known/assetlinks.json`; check `https://<host>/.well-known/assetlinks.json` returns JSON with no redirect.
- **Stable signing key is mandatory**: generate once and store as GitHub secret `ANDROID_DEBUG_KEYSTORE_BASE64`:
  `keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US" && base64 -w0 debug.keystore`
- Production needs HTTPS (Koyeb provides it). Dev differs: http://localhost, `COOKIE_SECURE` unset (SameSite=Lax), `PASSKEY_RP_ID=localhost`.

## Session / cookies
`fg_sid` is HttpOnly, Secure, SameSite=None in production (cross-site APK -> Koyeb), stored server-side as a SHA-256 hash with TTL. The APK enables `CapacitorHttp` so requests use the native HTTP stack and its cookie jar. CSRF: Origin allow-list + mandatory `X-Requested-With: FamGateway` header + per-session `X-CSRF-Token` for logout/passkey registration.

## Test commands (replace $API)
```bash
API=https://<app>.koyeb.app; H='-H Content-Type:application/json -H X-Requested-With:FamGateway'
curl $H -X POST $API/auth/register -d '{"name":"Test User","email":"t@example.com","phone":"9876543210","password":"Passw0rdOK"}'      # 201
curl $H -X POST $API/auth/register -d '{"name":"Test User","email":"t@example.com","phone":"9876543210","password":"Passw0rdOK"}'      # 409
curl $H -X POST $API/auth/login -d '{"email":"t@example.com","password":"Passw0rdOK"}'                                                  # 403 email_not_verified
curl "$API/auth/verify-email?token=<token from e-mail>"                                                                                  # HTML "Email verified"
curl $H -c jar -X POST $API/auth/login -d '{"email":"t@example.com","password":"Passw0rdOK"}'                                           # 200 {user,csrfToken}
curl -b jar $API/auth/me                                                                                                                 # 200 (session persists)
curl -b jar $H -H "X-CSRF-Token: <csrfToken>" -X POST $API/auth/logout                                                                   # 200
curl -b jar $API/auth/me                                                                                                                 # 401
curl $API/auth/me                                                                                                                        # 401 (unauthorized access)
```
Google and passkeys are interactive: run them in the APK (Login > Continue with Google / Continue with Passkey; sidebar > Add passkey on a signed-in account).
