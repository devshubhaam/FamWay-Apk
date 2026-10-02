import { useState } from 'react';
import { Fingerprint } from 'lucide-react';
import {
  registerPasskey,
  passkeyAvailable,
  isCancelled,
} from '../services/passkey';

export default function PasskeySetup() {
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  if (!passkeyAvailable()) return null;

  const add = async (e) => {
    e.preventDefault();

    if (busy) return;

    setBusy(true);
    setMsg('Starting passkey setup…');

    try {
      await registerPasskey();

      setMsg(
        'Passkey added successfully. You can now sign in with it.'
      );
    } catch (x) {
      console.error('[Passkey UI] Error:', x);

      if (isCancelled(x)) {
        setMsg('Passkey setup was cancelled.');
      } else if (x?.code === 'passkey_exists') {
        setMsg('This passkey is already registered.');
      } else if (x?.kind === 'network') {
        setMsg(
          'Cannot reach the passkey server. Check your internet connection.'
        );
      } else if (x?.kind === 'timeout') {
        setMsg(
          'The passkey server took too long to respond.'
        );
      } else if (x?.status) {
        setMsg(
          `Passkey setup failed: server returned ${x.status}${x.code ? ` (${x.code})` : ''}`
        );
      } else if (x?.message) {
        setMsg(`Passkey error: ${x.message}`);
      } else {
        setMsg(
          'Passkey setup failed. Check the error details and try again.'
        );
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <a
        href="#"
        role="button"
        className="sidebar-logout"
        style={{ color: '#93c5fd' }}
        onClick={add}
        aria-busy={busy}
      >
        <Fingerprint size={15} />
        {busy ? 'Waiting…' : 'Add passkey'}
      </a>

      {msg && (
        <div
          role="status"
          style={{
            fontSize: 11,
            color: '#94a3b8',
            padding: '4px 12px',
            wordBreak: 'break-word',
          }}
        >
          {msg}
        </div>
      )}
    </>
  );
}
