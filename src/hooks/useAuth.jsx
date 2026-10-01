import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as auth from '../services/auth';
import { setUnauthorizedHandler } from '../services/api';
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { setUnauthorizedHandler(() => setUser(null)); auth.getSession().then(r => setUser(r.user)).catch(() => setUser(null)).finally(() => setLoading(false)); }, []);
  const signIn = useCallback(async (e, p) => { const r = await auth.login(e, p); setUser(r.user); }, []);
  const signOut = useCallback(async () => { try { await auth.logout(); } finally { setUser(null); } }, []);
  return <Ctx.Provider value={{ user, loading, signIn, signOut }}>{children}</Ctx.Provider>;
}
