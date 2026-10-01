import { useSyncExternalStore } from 'react';
import { profile as base } from '../data/profile';
// Tiny local store so edits made on the Profile page show up everywhere (sidebar, dashboard).
// Persisted in localStorage; no backend involved.
const KEY = 'fg_profile';
let state = { ...base };
try { const saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved) state = { ...base, ...saved }; } catch { /* ignore */ }
const subs = new Set();
export function updateProfile(patch) {
  state = { ...state, ...patch };
  try { const { merchantId, ...rest } = state; localStorage.setItem(KEY, JSON.stringify(rest)); } catch { /* storage full or blocked */ }
  subs.forEach((f) => f());
}
const subscribe = (f) => { subs.add(f); return () => subs.delete(f); };
export const useProfile = () => useSyncExternalStore(subscribe, () => state, () => state);

