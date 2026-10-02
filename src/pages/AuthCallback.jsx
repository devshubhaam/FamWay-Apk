import { useEffect, useRef, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Web only: landing page after Google sign-in (#/auth/callback?code=...). On Android the same code arrives
// via the famgateway:// deep link and is handled inside AuthProvider.
export default function AuthCallback() {
  const [params] = useSearchParams();
  const { user, completeGoogle } = useAuth();
  const [failed, setFailed] = useState(!params.get('code'));
  const ran = useRef(false);
  useEffect(() => {
    const code = params.get('code');
    if (!code || ran.current) return;
    ran.current = true; // codes are single-use (StrictMode runs effects twice in dev)
    completeGoogle(code).catch(() => setFailed(true));
  }, [params, completeGoogle]);
  if (user) return <Navigate to="/dashboard" replace />;
  if (failed) return <Navigate to="/login" replace />;
  return null;
}
