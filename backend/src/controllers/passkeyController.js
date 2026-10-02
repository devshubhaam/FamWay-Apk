import { asyncHandler, HttpError } from '../utils/httpError.js';
import { PasskeyCredential } from '../models/PasskeyCredential.js';
import * as pk from '../services/passkeyService.js';
import { createSession } from '../services/sessionService.js';

const need = () => { if (!pk.passkeyConfigured()) throw new HttpError(503, 'passkey_unavailable', 'Passkeys are not configured'); };

export const registerOptions = asyncHandler(async (req, res) => { need(); res.json(await pk.registrationOptions(req.user)); });
export const registerVerify = asyncHandler(async (req, res) => {
  need();
  if (!req.body?.response) throw new HttpError(400, 'validation', 'Missing response');
  await pk.verifyRegistration(req.user, req.body.response);
  res.json({ ok: true, passkeys: await PasskeyCredential.countDocuments({ userId: req.user._id }) });
});
export const loginOptions = asyncHandler(async (req, res) => { need(); res.json(await pk.authenticationOptions()); });
export const loginVerify = asyncHandler(async (req, res) => {
  need();
  const user = await pk.verifyAuthentication({ challengeId: req.body?.challengeId, response: req.body?.response });
  const { csrfToken } = await createSession(res, user, req);
  res.json({ user: user.toPublic(), csrfToken });
});
