import { Capacitor } from '@capacitor/core';
import {
  startRegistration,
  startAuthentication,
  browserSupportsWebAuthn,
} from '@simplewebauthn/browser';
import { request, setCsrfToken } from './api';
import { AUTH_ENDPOINTS as EP } from './config';

// Real WebAuthn.
// On Android, @capgo/capacitor-passkey installs a WebAuthn shim
// that routes navigator.credentials.* to Android Credential Manager.
//
// IMPORTANT:
// Do not silently swallow shim initialization errors.
// We need the real error while diagnosing Android passkey setup.

const isNative = () => Capacitor.isNativePlatform();

let shimPromise;

const ensureShim = async () => {
  if (!isNative()) return;

  if (!shimPromise) {
    shimPromise = (async () => {
      console.log('[Passkey] Initializing native passkey shim...');

      const mod = await import('@capgo/capacitor-passkey');

      console.log('[Passkey] Plugin module loaded:', mod);

      const plugin = mod.CapacitorPasskey || mod.default;

      if (!plugin) {
        throw new Error(
          'CapacitorPasskey plugin was not found in @capgo/capacitor-passkey'
        );
      }

      console.log('[Passkey] Plugin found:', plugin);

      if (typeof plugin.getConfiguration === 'function') {
        try {
          const config = await plugin.getConfiguration();
          console.log('[Passkey] Plugin configuration:', config);
        } catch (e) {
          console.warn(
            '[Passkey] Could not read plugin configuration:',
            e
          );
        }
      }

      if (typeof plugin.isSupported === 'function') {
        try {
          const supported = await plugin.isSupported();
          console.log('[Passkey] Native passkey supported:', supported);
        } catch (e) {
          console.warn(
            '[Passkey] Could not check native passkey support:',
            e
          );
        }
      }

      if (typeof plugin.autoShimWebAuthn !== 'function') {
        throw new Error(
          'autoShimWebAuthn() is not available in the installed passkey plugin'
        );
      }

      console.log('[Passkey] Installing WebAuthn shim...');

      await plugin.autoShimWebAuthn();

      console.log('[Passkey] WebAuthn shim installed successfully.');
    })();

    try {
      await shimPromise;
    } catch (e) {
      console.error(
        '[Passkey] Native shim initialization FAILED:',
        e
      );

      // Allow a later attempt.
      shimPromise = undefined;

      throw e;
    }
  } else {
    await shimPromise;
  }
};

export const passkeyAvailable = () => {
  try {
    return isNative() || browserSupportsWebAuthn();
  } catch {
    return isNative();
  }
};

export const isCancelled = (e) =>
  e?.name === 'NotAllowedError' ||
  e?.name === 'AbortError';

export async function loginWithPasskey() {
  console.log('[Passkey] Login started');

  await ensureShim();

  console.log('[Passkey] Requesting authentication options...');

  const { options, challengeId } = await request(
    EP.passkeyLoginOptions,
    {
      method: 'POST',
      body: {},
    }
  );

  console.log('[Passkey] Authentication options received.');

  const response = await startAuthentication({
    optionsJSON: options,
  });

  console.log('[Passkey] Native authentication response received.');

  const r = await request(
    EP.passkeyLoginVerify,
    {
      method: 'POST',
      body: {
        challengeId,
        response,
      },
    }
  );

  console.log('[Passkey] Authentication verified by server.');

  setCsrfToken(r.csrfToken);

  return r;
}

export async function registerPasskey() {
  console.log('[Passkey] Registration started');

  try {
    await ensureShim();

    console.log(
      '[Passkey] Requesting registration options from server...'
    );

    const options = await request(
      EP.passkeyRegisterOptions,
      {
        method: 'POST',
        body: {},
      }
    );

    console.log(
      '[Passkey] Registration options received:',
      options
    );

    console.log(
      '[Passkey] Starting native WebAuthn registration...'
    );

    const response = await startRegistration({
      optionsJSON: options,
    });

    console.log(
      '[Passkey] Native registration response received:',
      response
    );

    console.log(
      '[Passkey] Sending registration response to server...'
    );

    const result = await request(
      EP.passkeyRegisterVerify,
      {
        method: 'POST',
        body: {
          response,
        },
      }
    );

    console.log(
      '[Passkey] Passkey registration verified successfully:',
      result
    );

    return result;
  } catch (e) {
    console.error(
      '[Passkey] REGISTRATION FAILED',
      {
        name: e?.name,
        message: e?.message,
        code: e?.code,
        kind: e?.kind,
        status: e?.status,
        stack: e?.stack,
        error: e,
      }
    );

    throw e;
  }
}
