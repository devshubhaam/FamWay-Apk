import mongoose from 'mongoose';

// One document per registered passkey. Only the PUBLIC key is stored.
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  credentialId: { type: String, required: true },       // base64url
  publicKey: { type: Buffer, required: true },          // COSE public key
  counter: { type: Number, default: 0 },
  deviceType: { type: String, enum: ['singleDevice', 'multiDevice'] },
  backedUp: { type: Boolean, default: false },
  transports: [{ type: String }],
  lastUsedAt: { type: Date },
}, { timestamps: true });
schema.index({ credentialId: 1 }, { unique: true });

export const PasskeyCredential = mongoose.model('PasskeyCredential', schema);
