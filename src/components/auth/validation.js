// Pure validators. Each returns { fieldName: 'message' } in field order; empty object = valid.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9]{10}$/; // same rule as the old register form
export const PASSWORD_MIN = 6;  // same rule as the old register form

export function validateLogin({ email, password }) {
  const e = {};
  if (!email.trim()) e.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(email.trim())) e.email = 'Enter a valid email address.';
  if (!password) e.password = 'Enter your password.';
  return e;
}

export function validateRegister({ name, email, phone, password, confirmPassword }) {
  const e = {};
  if (!name.trim()) e.name = 'Enter your full name.';
  else if (name.trim().length < 2) e.name = 'Name must be at least 2 characters.';
  if (!email.trim()) e.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(email.trim())) e.email = 'Enter a valid email address.';
  if (!phone) e.phone = 'Enter your 10-digit mobile number.';
  else if (!PHONE_RE.test(phone)) e.phone = 'Mobile number must be exactly 10 digits.';
  if (!password) e.password = 'Create a password.';
  else if (password.length < PASSWORD_MIN) e.password = `Password must be at least ${PASSWORD_MIN} characters.`;
  if (!confirmPassword) e.confirmPassword = 'Repeat your password.';
  else if (confirmPassword !== password) e.confirmPassword = 'Passwords do not match.';
  return e;
}
