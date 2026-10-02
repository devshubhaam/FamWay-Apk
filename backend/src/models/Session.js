import mongoose from 'mongoose';

// Server-side session. Only a SHA-256 hash of the cookie value is stored.
const sessionSchema = new mongoose.Schema({
  tokenHash: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  csrfToken: { type: String, required: true },
  userAgent: { type: String, maxlength: 200 },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL cleanup

export const Session = mongoose.model('Session', sessionSchema);
