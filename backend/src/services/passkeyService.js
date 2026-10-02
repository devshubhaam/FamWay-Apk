import {
  generateRegistrationOptions, verifyRegistrationResponse,
  generateAuthenticationOptions, verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { PasskeyCredential } from '../models/PasskeyCredential.js';
import { putChallenge, takeChallenge } from '../models/AuthChallenge.js';
import { randomToken } from '../utils/crypto.js';
import { HttpError } from '../utils/httpError.js';

const TTL = 5 * 60 * 1000;
export const passkeyConfigured = () => Boolean(env.passkey.rpId && env.passkey.origins.length);

export async function registrationOptions(user) {
  if (!user.passkeyUserHandle) { user.passkeyUserHandle = randomToken(32); await user.save(); }
  const existing = await PasskeyCredential.find({ userId: user._id });
  const options = await generateRegistrationOptions({
    rpName: env.passkey.rpName, rpID: env.passkey.rpId,
    userName: user.email, userDisplayName: user.name,
    userID: Buffer.from(user.passkeyUserHandle, 'base64url'),
    attestationType: 'none',
    excludeCredentials: existing.map((c) => ({ id: c.credentialId, transports: c.transports })),
    authenticatorSelection: { residentKey: 'required', userVerification: 'required' },
  });
  await putChallenge('passkey-reg', String(user._id), { challenge: options.challenge }, TTL);
  return options;
}

export async function verifyRegistration(user, response) {
  const ch = await takeChallenge('passkey-reg', String(user._id)); // single use
  if (!ch) throw new HttpError(400, 'challenge_expired');
  let v;
  try {
    v = await verifyRegistrationResponse({
      response, expectedChallenge: ch.data.challenge, expectedOrigin: env.passkey.origins,
      expectedRPID: env.passkey.rpId, requireUserVerification: true,
    });
  } catch { throw new HttpError(400, 'passkey_invalid'); }
  if (!v.verified || !v.registrationInfo) throw new HttpError(400, 'passkey_invalid');
  const { credential, credentialDeviceType, credentialBackedUp } = v.registrationInfo;
  try {
    await PasskeyCredential.create({
      userId: user._id, credentialId: credential.id, publicKey: Buffer.from(credential.publicKey),
      counter: credential.counter, transports: response.response?.transports || credential.transports || [],
      deviceType: credentialDeviceType, backedUp: credentialBackedUp,
    });
  } catch (e) { if (e?.code === 11000) throw new HttpError(409, 'passkey_exists'); throw e; }
}

// Usernameless (discoverable-credential) login: no email needed.
export async function authenticationOptions() {
  const options = await generateAuthenticationOptions({ rpID: env.passkey.rpId, userVerification: 'required' });
  const challengeId = randomToken(24);
  await putChallenge('passkey-auth', challengeId, { challenge: options.challenge }, TTL);
  return { options, challengeId };
}

export async function verifyAuthentication({ challengeId, response }) {
  const fail = new HttpError(401, 'invalid_credentials');
  const ch = await takeChallenge('passkey-auth', String(challengeId || '')); // single use -> replay protection
  if (!ch) throw new HttpError(400, 'challenge_expired');
  const cred = await PasskeyCredential.findOne({ credentialId: String(response?.id || '') });
  if (!cred) throw fail;
  const user = await User.findById(cred.userId);
  if (!user) throw fail;
  const handle = response?.response?.userHandle;
  if (handle && user.passkeyUserHandle && handle !== user.passkeyUserHandle) throw fail;
  let v;
  try {
    v = await verifyAuthenticationResponse({
      response, expectedChallenge: ch.data.challenge, expectedOrigin: env.passkey.origins, expectedRPID: env.passkey.rpId,
      credential: { id: cred.credentialId, publicKey: new Uint8Array(cred.publicKey), counter: cred.counter, transports: cred.transports },
      requireUserVerification: true,
    });
  } catch { throw fail; }
  if (!v.verified) throw fail;
  cred.counter = v.authenticationInfo.newCounter; // library rejects non-increasing counters when counter != 0
  cred.backedUp = v.authenticationInfo.credentialBackedUp;
  cred.lastUsedAt = new Date();
  await cred.save();
  return user;
}

