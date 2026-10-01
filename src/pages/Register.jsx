import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { friendlyMessage } from '../services/api';
import * as auth from '../services/auth';
import { LEGAL_LINKS } from '../services/config';
import AuthShell from '../components/auth/AuthShell';
import Field from '../components/auth/Field';
import { useAuthForm } from '../components/auth/useAuthForm';
import { PASSWORD_MIN, validateRegister } from '../components/auth/validation';

const SIDE = {
  heading: 'Get started', accent: 'in minutes.',
  description: 'Create a free account and start accepting UPI payments through our API instantly.',
  features: ['Free forever — zero platform fees', 'Configure UPI Notifications in 30 seconds', 'Instant API key & live webhook alerts'],
};
const digitsOnly = (v) => v.replace(/\D/g, '').slice(0, 10);

export default function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const form = useAuthForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' }, validateRegister);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  if (user) return <Navigate to="/dashboard" replace />;

  const submit = async (e) => {
    e.preventDefault();
    if (busy || !form.check()) return;
    const { name, email, phone, password } = form.values;
    setBusy(true); setErr('');
    try {
      await auth.register({ name: name.trim(), email: email.trim(), phone, password });
      navigate('/login', { replace: true, state: { registered: true, email: email.trim() } });
    } catch (x) {
      if (x.status === 409) form.setFieldError('email', 'An account with this email already exists. Sign in instead.');
      else if (x.status === 400 || x.status === 422) setErr('Some details were not accepted. Check the form and try again.');
      else setErr(friendlyMessage(x));
      setBusy(false);
    }
  };

  return (
    <AuthShell side={SIDE} title="Register for FamGateway" subtitle="Free forever. No credit card required."
      footer={<>
        <p className="fg-auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        <p className="fg-auth-note">By creating an account, you agree to our <a href={LEGAL_LINKS.terms} target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href={LEGAL_LINKS.privacy} target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>
      </>}>
      {err && <div className="fg-auth-alert is-error" role="alert"><AlertCircle size={16} aria-hidden="true" />{err}</div>}
      <form ref={form.formRef} onSubmit={submit} noValidate>
        <Field id="fg-reg-name" label="Full name" placeholder="Your full name" autoComplete="name" autoFocus readOnly={busy} {...form.bind('name')} />
        <Field id="fg-reg-email" label="Email address" type="email" placeholder="you@example.com" autoComplete="email" readOnly={busy} {...form.bind('email')} />
        <Field id="fg-reg-phone" label="Phone number (WhatsApp)" type="tel" prefix="+91" placeholder="9876543210" inputMode="numeric" autoComplete="tel-national" readOnly={busy} {...form.bind('phone', digitsOnly)} />
        <Field id="fg-reg-password" label="Password" type="password" placeholder={`Min. ${PASSWORD_MIN} characters`} autoComplete="new-password" readOnly={busy} {...form.bind('password')} />
        <Field id="fg-reg-confirm" label="Confirm password" type="password" placeholder="Repeat password" autoComplete="new-password" readOnly={busy} {...form.bind('confirmPassword')} />
        <button type="submit" className="fg-auth-submit" readOnly={busy}>
          {busy && <span className="fg-auth-spinner" aria-hidden="true" />}{busy ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthShell>
  );
}
