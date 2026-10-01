import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';

// Public auth routes (/login, /register) get their own AuthProvider so they work
// without touching AppLayout. Session is shared via the backend cookie (or the mock session).
export default function AuthLayout() {
  return <AuthProvider><Outlet /></AuthProvider>;
}
