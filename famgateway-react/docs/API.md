# API the frontend expects (`VITE_API_BASE_URL` + path). JSON, cookie-authenticated unless noted.
| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | /auth/login | no | body `{email,password}` -> `{user:{name,email,merchantId,avatarUrl}}`; sets session cookie; 401 on bad creds |
| POST | /auth/logout | yes | clears cookie |
| GET | /auth/me | yes | `{user}`; 401 if no session |
| GET | /dashboard?days=7\|15\|30 | yes | `{user, stats:{totalRequests,successful,failedOrPending,revenue}, imap:{configured}, activity:[{date,requests,revenue}]}` |
| GET | /transactions?limit=10 | yes | `{items:[{orderId,bankRrn,customerRef,createdAt,amount,currency,paymentMethod,verificationStatus,failureReason}]}` |
`verificationStatus`: `verified|pending|failed|verification_failed`. Errors: 401 session, 4xx validation `{error}`, 5xx generic. These are my *proposed* contracts — the snapshot had no scripts, so adjust to your real PHP endpoints in `src/services/`.
