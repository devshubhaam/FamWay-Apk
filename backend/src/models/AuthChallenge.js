import mongoose from 'mongoose';

// Short-lived, SINGLE-USE server state: WebAuthn challenges, Google OAuth state, one-time app login codes.
// Consumed with findOneAndDelete, so a value can never be used twice (replay protection).
const schema = new mongoose.Schema({
  kind: { type: String, enum: ['passkey-reg', 'passkey-auth', 'google-state', 'login-code'], required: true },
  key: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed },
  expiresAt: { type: Date, required: true },
});
schema.index({ kind: 1, key: 1 }, { unique: true });
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const AuthChallenge = mongoose.model('AuthChallenge', schema);

export const putChallenge = (kind, key, data, ttlMs) =>
  AuthChallenge.findOneAndUpdate({ kind, key }, { kind, key, data, expiresAt: new Date(Date.now() + ttlMs) }, { upsert: true, new: true });

// Atomically fetch + delete. Returns null if missing/expired.
export const takeChallenge = (kind, key) =>
  AuthChallenge.findOneAndDelete({ kind, key, expiresAt: { $gt: new Date() } }).lean();
