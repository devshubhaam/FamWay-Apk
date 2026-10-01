# Architecture
```
UI (pages/components) -> hooks -> services/ (api.js, auth.js, dashboard.js, payment.js) -> HTTPS -> Backend
```
- `api.js`: single fetch wrapper (timeout, offline check, 401 handler, friendly errors, cookies via `credentials:'include'`).
- Auth: backend sets an httpOnly Secure cookie; `AuthProvider` calls `/auth/me` on start; any 401 logs the user out. Nothing sensitive in localStorage.
- Payment flow (backend-owned): Customer -> UPI/provider -> (webhook / IMAP receipt parser) -> backend verifies & cross-checks -> DB -> `/transactions` -> dashboard shows `verificationStatus` only. An email receipt alone is never proof.
- Errors: offline, timeout, 401, 5xx, invalid JSON map to short user messages; raw backend errors are never shown.
- Boundary: client = display + input; backend = identity, amounts, status, verification, secrets.
