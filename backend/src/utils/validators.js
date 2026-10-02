import { z } from 'zod';

const email = z.string().trim().toLowerCase().max(254).email();
export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email,
  phone: z.string().trim().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  // Strong password: 8-72 chars (bcrypt limit), at least one letter and one number.
  password: z.string().min(8).max(72).regex(/[A-Za-z]/, 'Needs a letter').regex(/[0-9]/, 'Needs a number'),
});
export const loginSchema = z.object({ email, password: z.string().min(1).max(128) });
export const emailOnlySchema = z.object({ email });
