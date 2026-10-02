import crypto from 'node:crypto';
export const randomToken = (bytes = 32) => crypto.randomBytes(bytes).toString('base64url');
export const sha256 = (v) => crypto.createHash('sha256').update(v).digest('hex');
export const sha256b64url = (v) => crypto.createHash('sha256').update(v).digest('base64url');
export const safeEqual = (a, b) => {
  const x = Buffer.from(String(a ?? '')); const y = Buffer.from(String(b ?? ''));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};
export async function generateMerchantId(User) {
  for (let i = 0; i < 8; i++) {
    const id = String(crypto.randomInt(1_000_000_000, 10_000_000_000)); // 10 digits
    if (!(await User.exists({ merchantId: id }))) return id;
  }
  throw new Error('Could not allocate merchantId');
}
