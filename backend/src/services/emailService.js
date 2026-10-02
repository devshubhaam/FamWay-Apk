import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

// Provider-agnostic: swap this file's transport (SES, Resend, ...) without touching controllers.
let transport;
export const emailConfigured = () => Boolean(env.smtp.host && env.smtp.user && env.smtp.pass && env.smtp.from);
const getTransport = () => (transport ||= nodemailer.createTransport({
  host: env.smtp.host, port: env.smtp.port, secure: env.smtp.port === 465,
  auth: { user: env.smtp.user, pass: env.smtp.pass },
}));

export async function sendVerificationEmail(to, name, link) {
  if (!emailConfigured()) {
    if (env.isProd) throw new Error('SMTP is not configured');
    console.warn('[email] SMTP not configured (dev): verification link ->', link); // dev only; never in production
    return;
  }
  const safeName = String(name || '').replace(/[<>&"]/g, '');
  await getTransport().sendMail({
    from: env.smtp.from, to, subject: 'Verify your FamGateway email',
    text: `Hi ${safeName},\n\nVerify your email: ${link}\n\nThis link expires in 24 hours. If you did not sign up, ignore this email.`,
    html: `<p>Hi ${safeName},</p><p><a href="${link}">Verify your email</a></p><p>This link expires in 24 hours. If you did not sign up, ignore this email.</p>`,
  });
}
