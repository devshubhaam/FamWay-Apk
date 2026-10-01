# SETUP (Android phone only)

## The honest limitation
Android's official build tools (SDK build-tools such as `aapt2`, and Gradle's Android plugin) are built for x86 Linux/Windows/macOS.
They are **not officially supported inside Termux** (ARM). Community workarounds exist but break often, so this guide does NOT depend on them.

**Reliable phone-only path:** write code on the phone, build the *web* app on the phone (Termux), and let **GitHub Actions** (free cloud build) produce the APK. You download and install it on the same phone. No PC needed.

## 1. Install tools (once)
1. Install **F-Droid**, then **Termux** from F-Droid (the Play Store version is outdated).
2. Install a code editor: **Acode** (free, Play Store/F-Droid) or edit in Termux with `nano`.
3. In Termux:
```
pkg update && pkg upgrade -y
pkg install nodejs-lts git openssh -y
termux-setup-storage
node -v && npm -v && git --version   # each must print a version
```
Java is NOT needed on the phone in this workflow (the cloud build uses JDK 17).

## 2. Get the project
```
cd ~ && git clone YOUR_REPOSITORY famgateway && cd famgateway
cp .env.example .env      # then edit VITE_API_BASE_URL
npm install
```
(To start from the ZIP: copy it to phone storage, `cd ~ && unzip /sdcard/Download/famgateway-react.zip`.)

## 3. Develop
```
npm run dev
```
Open `http://localhost:5173` in the phone browser. Stop with `Ctrl+C` (Termux: Volume-Down + C). Restart with the same command.
Edit files with Acode (open folder `~/famgateway` via Termux's storage or edit in Termux).

## 4. Production build
```
npm run build      # outputs ./dist
npm run preview    # test it at http://localhost:4173
```

## 5. APK via GitHub Actions
1. Create a free GitHub account + empty repo; create a Personal Access Token (repo scope).
2. In Termux: `git remote add origin https://github.com/USER/REPO.git && git push -u origin main` (use the token as password).
3. GitHub (in phone browser) → **Actions → Build Android APK → Run workflow**.
4. When it finishes, open the run → **Artifacts → app-debug-apk** → download → unzip → tap the APK → allow "Install unknown apps" for your browser.
5. Update: change code → `git add . && git commit -m msg && git push` → download new APK → install over the old one (same signing key keeps data).

## 6. Release signing & AAB
- Create keystore **once**, on the phone: `pkg install openjdk-17 -y` then
  `keytool -genkeypair -v -keystore release.keystore -alias myalias -keyalg RSA -keysize 2048 -validity 10000`
- Back it up (cloud/USB). **If you lose it you can never update a published app under the same listing.** Never commit it (it's in .gitignore).
- Store in GitHub → Settings → Secrets: `KEYSTORE_B64` (`base64 -w0 release.keystore`), `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`; then add a signing step and run `./gradlew bundleRelease` (AAB) / `assembleRelease` (APK) in the workflow. Output: `android/app/build/outputs/{bundle,apk}/release/`.
- Raise `versionCode` (integer, must increase every release) and `versionName` in `android/app/build.gradle`.
- Play Store additionally needs: a Google Play developer account (one-time fee), store listing, privacy policy, Data-safety form, and uploading the AAB in the Play Console (works from a phone browser).

## 7. Configure
| Thing | Where |
|---|---|
| App name / package ID | `capacitor.config.json` (`appName`, `appId`) — change **before** `npx cap add android` |
| API URL | `.env` → `VITE_API_BASE_URL` (rebuild after change) |
| Icon / splash | replace `public/icon.png`; generate Android mipmaps with `@capacitor/assets` in the cloud build |
| Version | `android/app/build.gradle` |

## 8. PWA (no APK at all)
Host `dist/` on any HTTPS host, open it in Chrome on the phone → ⋮ → **Install app / Add to Home screen**.

## 9. Troubleshooting (Problem → Cause → Fix)
- `npm install` ECONNRESET/ENOTFOUND → network → switch Wi-Fi/data, retry; `npm cache clean --force`.
- `EACCES` on /sdcard → shared storage can't hold node_modules → work in `~`, not `/sdcard`.
- `node: command not found` → not installed → `pkg install nodejs-lts`.
- White screen in APK → wrong `base` or missing build → `base: './'` (already set), run `npm run build` then re-sync; HashRouter is used so deep paths work.
- API fails only in APK → CORS/HTTPS → backend must allow origin `https://localhost` and `capacitor://localhost`, and use HTTPS; cookies need `SameSite=None; Secure`.
- SSL error → invalid/expired certificate on backend → fix certificate.
- Gradle failed in Actions → open the log; usually JDK ≠ 17 or `npx cap add android` skipped.
- "App not installed" → older APK signed with a different key → uninstall the old app first; or storage full; or not allowed "install unknown apps".
- App crashes at start → open `chrome://inspect` is PC-only; instead add error text on screen, check API response shape against docs/API.md.
