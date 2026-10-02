import { VerificationToken } from '../models/VerificationToken.js';
import { env } from '../config/env.js';
import { randomToken, sha256 } from '../utils/crypto.js';
import { sendVerificationEmail } from './emailService.js';

const TTL = 24 * 60 * 60 * 1000;
export async function issueVerification(user) {
  await VerificationToken.deleteMany({ userId: user._id, purpose: 'verify-email' });
  const token = randomToken(32);
  await VerificationToken.create({ userId: user._id, tokenHash: sha256(token), expiresAt: new Date(Date.now() + TTL) });
  await sendVerificationEmail(user.email, user.name, `${env.apiPublicUrl}/auth/verify-email?token=${token}`);
}
export const consumeVerification = (token) =>
  VerificationToken.findOneAndDelete({ tokenHash: sha256(token), purpose: 'verify-email', expiresAt: { $gt: new Date() } });
