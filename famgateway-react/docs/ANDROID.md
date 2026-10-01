# Android
See SETUP.md §5–6. Summary: Termux for code/web build, GitHub Actions builds the APK (`.github/workflows/android.yml`), install on the same phone. Local Android SDK builds in Termux are unsupported/fragile and intentionally not used.
Native bits: back button (`useAndroidBack`), splash (`capacitor.config.json`). Add `@capacitor/browser` for external links and `@capacitor/network` for connectivity events if needed (installed).
