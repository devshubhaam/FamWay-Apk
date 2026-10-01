# FamGateway Dashboard (React + Capacitor)
React 18 + Vite conversion of the supplied dashboard snapshot; original CSS preserved verbatim (`src/styles/original.css`), plus `mobile.css` for Android.

**Features:** responsive sidebar, stat cards, activity chart (7/15/30D), recent transactions, login/logout/session handling, PWA, Capacitor Android wrapper, Android back button.
**Stack:** React, Vite, react-router (HashRouter), recharts, lucide-react, Capacitor 6.

```
src/ components/ pages/ layouts/ hooks/ services/ utils/ assets/ styles/
```
Quick start: `cp .env.example .env && npm install && npm run dev` · Build: `npm run build` · Android: see **SETUP.md** (APK/AAB built by GitHub Actions; phone-only).
Env: only `VITE_*` public values. **No secrets in the frontend** — payment verification is backend-only. More: docs/ARCHITECTURE.md, API.md, ANDROID.md, SECURITY.md.
