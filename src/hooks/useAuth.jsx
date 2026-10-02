import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import * as auth from '../services/auth';
import * as passkey from '../services/passkey';
import { takeVerifier } from '../services/googleAuth';
import { APP_SCHEME } from '../services/config';
import { setUnauthorizedHandler } from '../services/api';
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  useEffect(() => { setUnauthorizedHandler(() => setUser(null)); auth.getSession().then(r => setUser(r.user)).catch(() => setUser(null)).finally(() => setLoading(false)); }, []);
  const signIn = useCallback(async (e, p) => { const r = await auth.login(e, p); setUser(r.user); }, []);
  const signInWithPasskey = useCallback(async () => { const r = await passkey.loginWithPasskey(); setUser(r.user); }, []);
  const completeGoogle = useCallback(async (code, verifier) => { const r = await auth.googleExchange(code, verifier); setUser(r.user); }, []);
  const signOut = useCallback(async () => { try { await auth.logout(); } finally { setUser(null); } }, []);

  // Android: the backend redirects the system browser to famgateway://auth/callback?code=... after Google sign-in.
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return undefined;
    let handle; let gone = false;
    import('@capacitor/app').then(({ App }) => App.addListener('appUrlOpen', async ({ url }) => {
      let u; try { u = new URL(url); } catch { return; }
      if (u.protocol !== `${APP_SCHEME}:` || u.host !== 'auth') return;
      try { (await import('@capacitor/browser')).Browser.close(); } catch { /* already closed */ }
      const code = u.searchParams.get('code');
      if (!code) { setAuthError('Google sign-in failed. Please try again.'); return; }
      try { await completeGoogle(code, takeVerifier()); setAuthError(''); } catch { setAuthError('Google sign-in failed. Please try again.'); }
    })).then((h) => { if (gone) h.remove(); else handle = h; });
    return () => { gone = true; handle?.remove(); };
  }, [completeGoogle]);

  return <Ctx.Provider value={{ user, loading, authError, signIn, signInWithPasskey, completeGoogle, signOut }}>{children}</Ctx.Provider>;
}
