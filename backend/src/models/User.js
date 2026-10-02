import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, lowercase: true, trim: true, maxlength: 254 },
  phone: { type: String, trim: true },                  // optional: Google sign-ups have none
  passwordHash: { type: String, select: false },        // absent for Google/passkey-only accounts
  emailVerified: { type: Boolean, default: false },
  merchantId: { type: String, required: true },
  avatarUrl: { type: String },
  providers: { google: { sub: { type: String } } },
  passkeyUserHandle: { type: String },                  // random WebAuthn user.id (base64url); not the Mongo _id
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ merchantId: 1 }, { unique: true });
userSchema.index({ 'providers.google.sub': 1 }, { unique: true, partialFilterExpression: { 'providers.google.sub': { $type: 'string' } } });

userSchema.methods.toPublic = function toPublic() {
  return { id: String(this._id), name: this.name, email: this.email, phone: this.phone, merchantId: this.merchantId, avatarUrl: this.avatarUrl, emailVerified: this.emailVerified };
};

export const User = mongoose.model('User', userSchema);
