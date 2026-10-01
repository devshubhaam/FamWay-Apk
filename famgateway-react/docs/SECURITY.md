# Security
- Frontend holds only `VITE_API_BASE_URL`/timeout. Provider keys, IMAP/Gmail app passwords, DB, JWT/OAuth secrets, encryption keys stay on the backend.
- Never trust client values (status, amount, txn ID, identity); backend re-validates everything and verifies webhooks (signature) and receipts against provider/records.
- HTTPS only; httpOnly+Secure+SameSite cookies; CSRF protection; rate limiting; server-side input validation and authorization per merchant.
- Everything in a built JS bundle/APK is public — assume it can be read.
- Keep keystore + passwords out of git.
