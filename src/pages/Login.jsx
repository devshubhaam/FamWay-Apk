import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { friendlyMessage } from '../services/api';
import * as auth from '../services/auth';
import { beginGoogleSignIn } from '../services/googleAuth';
import { passkeyAvailable, isCancelled } from '../services/passkey';
import AuthShell from '../components/auth/AuthShell';
import Field from '../components/auth/Field';
import SocialAuth from '../components/auth/SocialAuth';
import { useAuthForm } from '../components/auth/useAuthForm';
import { validateLogin } from '../components/auth/validation';

const SIDE = {
  heading: 'UPI payments,', accent: 'automated.',
  description: 'The most reliable UPI payment gateway built for developers. Accept payments in seconds with a simple API call.',
  features: ['Real-time automated UPI transaction matching', 'Instant webhook callbacks on payment', 'No commission — zero platform fees'],
};

export default function Login() {
  const { signIn, signInWithPasskey, user, authError } = useAuth();
  const { state } = useLocation(); // set by Register on success: { registered, email }
  const form = useAuthForm({ email: state?.email || '', password: '' }, validateLogin);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [unverified, setUnverified] = useState(false);
  const [resent, setResent] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const submit = async (e) => {
    e.preventDefault();
    if (busy || !form.check()) return;
    setBusy(true); setErr(''); setUnverified(false); setResent(false);
    try {
      await signIn(form.values.email.trim(), form.values.password);
    } catch (x) {
      if (x.code === 'email_not_verified') setUnverified(true);
      else setErr(x.kind === 'unauthorized' || x.status === 401 ? 'Invalid email or password.' : friendlyMessage(x));
    } finally { setBusy(false); }
  };

  const google = async () => {
    if (busy) return;
    setBusy(true); setErr('');
    try { await beginGoogleSignIn(); } catch (x) { setErr(x.code === 'google_unavailable' ? 'Google sign-in is not available right now.' : friendlyMessage(x)); } finally { setBusy(false); }
  };

  const passkey = async () => {
    if (busy) return;
    setBusy(true); setErr('');
    try { await signInWithPasskey(); } catch (x) {
      if (isCancelled(x)) setErr('Passkey sign-in was cancelled.');
      else if (x.status === 401 || x.status === 400) setErr('No matching passkey found. Sign in with your password, then add a passkey from the menu.');
      else setErr(x.kind ? friendlyMessage(x) : 'Passkey sign-in failed on this device.');
    } finally { setBusy(false); }
  };

  const resend = async () => {
    try { await auth.resendVerification(form.values.email.trim()); setResent(true); } catch (x) { setErr(friendlyMessage(x)); }
  };

  return (
    <AuthShell side={SIDE} title="Sign in to FamGateway" subtitle="Sign in to your merchant account"
      footer={<p className="fg-auth-switch">Don't have an account? <Link to="/register">Create one free</Link></p>}>
      {state?.registered && !err && !unverified && (
        <div className="fg-auth-alert is-success" role="status"><CheckCircle2 size={16} aria-hidden="true" />Account created. Check your email to verify your address, then sign in.</div>
      )}
      {unverified && (
        <div className="fg-auth-alert is-error" role="alert"><AlertCircle size={16} aria-hidden="true" />
          <span>{resent ? 'Verification email sent. Check your inbox.' : 'Please verify your email before signing in.'}
            {!resent && <button type="button" className="fg-auth-link-btn" onClick={resend}>Resend email</button>}</span>
        </div>
      )}
      {(err || authError) && <div className="fg-auth-alert is-error" role="alert"><AlertCircle size={16} aria-hidden="true" />{err || authError}</div>}
      <SocialAuth onGoogle={google} onPasskey={passkeyAvailable() ? passkey : undefined} disabled={busy} />
      <form ref={form.formRef} onSubmit={submit} noValidate>
        <Field id="fg-login-email" label="Email address" type="email" placeholder="you@example.com" autoComplete="username webauthn" autoFocus readOnly={busy} {...form.bind('email')} />
        <Field id="fg-login-password" label="Password" type="password" placeholder="••••••••" autoComplete="current-password" readOnly={busy} {...form.bind('password')} />
        <button type="submit" className="fg-auth-submit" readOnly={busy}>
          {busy && <span className="fg-auth-spinner" aria-hidden="true" />}{busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthShell>
  );
}
