import { Capacitor } from '@capacitor/core';
import * as auth from './auth';

// Google sign-in is driven by the BACKEND (authorization-code + PKCE + nonce; client secret stays on the server).
// Native: open the system browser, Google -> backend /auth/google/callback -> famgateway://auth/callback?code=...
// Web:    full-page redirect, returns to #/auth/callback?code=...
// The one-time code is then exchanged by the app itself so the session cookie lands in the APP's cookie jar.
let pendingVerifier = null; // memory only
export const takeVerifier = () => { const v = pendingVerifier; pendingVerifier = null; return v; };

const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export async function beginGoogleSignIn() {
  if (Capacitor.isNativePlatform()) {
    const verifier = b64url(crypto.getRandomValues(new Uint8Array(32)));
    const appChallenge = b64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
    const { url } = await auth.googleStart({ platform: 'native', appChallenge });
    pendingVerifier = verifier;
    const { Browser } = await import('@capacitor/browser');
    await Browser.open({ url });
  } else {
    const { url } = await auth.googleStart({ platform: 'web' });
    window.location.assign(url);
  }
}
