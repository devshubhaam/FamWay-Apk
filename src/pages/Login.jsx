import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { friendlyMessage } from '../services/api';
import AuthShell from '../components/auth/AuthShell';
import Field from '../components/auth/Field';
import { useAuthForm } from '../components/auth/useAuthForm';
import { validateLogin } from '../components/auth/validation';

const SIDE = {
  heading: 'UPI payments,', accent: 'automated.',
  description: 'The most reliable UPI payment gateway built for developers. Accept payments in seconds with a simple API call.',
  features: ['Real-time automated UPI transaction matching', 'Instant webhook callbacks on payment', 'No commission — zero platform fees'],
};

export default function Login() {
  const { signIn, user } = useAuth();
  const { state } = useLocation(); // set by Register on success: { registered, email }
  const form = useAuthForm({ email: state?.email || '', password: '' }, validateLogin);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  if (user) return <Navigate to="/dashboard" replace />;

  const submit = async (e) => {
    e.preventDefault();
    if (busy || !form.check()) return;
    setBusy(true); setErr('');
    try {
      await signIn(form.values.email.trim(), form.values.password);
    } catch (x) {
      setErr(x.kind === 'unauthorized' || x.status === 401 ? 'Invalid email or password.' : friendlyMessage(x));
    } finally { setBusy(false); }
  };

  return (
    <AuthShell side={SIDE} title="Sign in to FamGateway" subtitle="Sign in to your merchant account"
      footer={<p className="fg-auth-switch">Don't have an account? <Link to="/register">Create one free</Link></p>}>
      {state?.registered && !err && (
        <div className="fg-auth-alert is-success" role="status"><CheckCircle2 size={16} aria-hidden="true" />Account created. Sign in to continue.</div>
      )}
      {err && <div className="fg-auth-alert is-error" role="alert"><AlertCircle size={16} aria-hidden="true" />{err}</div>}
      <form ref={form.formRef} onSubmit={submit} noValidate>
        <Field id="fg-login-email" label="Email address" type="email" placeholder="you@example.com" autoComplete="username" autoFocus readOnly={busy} {...form.bind('email')} />
        <Field id="fg-login-password" label="Password" type="password" placeholder="••••••••" autoComplete="current-password" readOnly={busy} {...form.bind('password')} />
        <button type="submit" className="fg-auth-submit" readOnly={busy}>
          {busy && <span className="fg-auth-spinner" aria-hidden="true" />}{busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthShell>
  );
}
