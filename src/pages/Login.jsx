import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { friendlyMessage } from '../services/api';
import logo from '../assets/logo.png';
export default function Login() {
  const { signIn } = useAuth(); const [email, setE] = useState(''); const [pw, setP] = useState(''); const [err, setErr] = useState(''); const [busy, setB] = useState(false);
  const submit = async (e) => { e.preventDefault(); setB(true); setErr(''); try { await signIn(email.trim(), pw); } catch (x) { setErr(x.kind === 'unauthorized' || x.status === 401 ? 'Invalid email or password.' : friendlyMessage(x)); } finally { setB(false); } };
  return (<div className="fg-login"><form onSubmit={submit}><img src={logo} alt="FamGateway" style={{ height: 32, justifySelf: 'center' }} />
    {err && <div className="fg-banner" role="alert">{err}</div>}
    <input type="email" autoComplete="username" placeholder="Email" value={email} onChange={e => setE(e.target.value)} required />
    <input type="password" autoComplete="current-password" placeholder="Password" value={pw} onChange={e => setP(e.target.value)} required />
    <button className="btn btn-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button></form></div>);
}
