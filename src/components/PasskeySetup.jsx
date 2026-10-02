import { useState } from 'react';
import { Fingerprint } from 'lucide-react';
import { registerPasskey, passkeyAvailable, isCancelled } from '../services/passkey';

// Sidebar entry that registers a passkey for the CURRENT signed-in account (reuses the .sidebar-logout look).
export default function PasskeySetup() {
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  if (!passkeyAvailable()) return null;
  const add = async (e) => {
    e.preventDefault(); if (busy) return;
    setBusy(true); setMsg('');
    try { await registerPasskey(); setMsg('Passkey added. You can now sign in with it.'); }
    catch (x) { setMsg(isCancelled(x) ? 'Passkey setup cancelled.' : x.code === 'passkey_exists' ? 'This passkey is already registered.' : 'Could not add a passkey on this device.'); }
    finally { setBusy(false); }
  };
  return (<>
    <a href="#" role="button" className="sidebar-logout" style={{ color: '#93c5fd' }} onClick={add} aria-busy={busy}><Fingerprint size={15} /> {busy ? 'Waiting…' : 'Add passkey'}</a>
    {msg && <div role="status" style={{ fontSize: 11, color: '#94a3b8', padding: '2px 12px' }}>{msg}</div>}
  </>);
}
