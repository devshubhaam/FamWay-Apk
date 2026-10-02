import { Capacitor } from '@capacitor/core';
import { startRegistration, startAuthentication, browserSupportsWebAuthn } from '@simplewebauthn/browser';
import { request, setCsrfToken } from './api';
import { AUTH_ENDPOINTS as EP } from './config';

// Real WebAuthn. Options come from the server (@simplewebauthn/server); the browser/OS creates/uses the credential;
// the server verifies the result. On Android the @capgo/capacitor-passkey shim routes navigator.credentials.* to
// Android Credential Manager (needs Digital Asset Links, see backend README).
const isNative = () => Capacitor.isNativePlatform();

// Import the package's MAIN entry (always resolvable by Vite/Rollup) instead of the "/auto" subpath,
// which is not exported by the installed version and broke the build.
let shimPromise;
const ensureShim = async () => {
  if (!isNative()) return;
  shimPromise ||= (async () => {
    const mod = await import('@capgo/capacitor-passkey');
    const plugin = mod.CapacitorPasskey || mod.default;
    if (plugin && typeof plugin.autoShimWebAuthn === 'function') await plugin.autoShimWebAuthn();
  })().catch((e) => { shimPromise = undefined; console.warn('Passkey shim init failed', e); });
  await shimPromise;
};

export const passkeyAvailable = () => isNative() || browserSupportsWebAuthn();
export const isCancelled = (e) => e?.name === 'NotAllowedError' || e?.name === 'AbortError';

export async function loginWithPasskey() {
  await ensureShim();
  const { options, challengeId } = await request(EP.passkeyLoginOptions, { method: 'POST', body: {} });
  const response = await startAuthentication({ optionsJSON: options });
  const r = await request(EP.passkeyLoginVerify, { method: 'POST', body: { challengeId, response } });
  setCsrfToken(r.csrfToken);
  return r;
}

export async function registerPasskey() {
  await ensureShim();
  const options = await request(EP.passkeyRegisterOptions, { method: 'POST', body: {} });
  const response = await startRegistration({ optionsJSON: options });
  return request(EP.passkeyRegisterVerify, { method: 'POST', body: { response } });
}
