import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';

// The ONE AuthProvider for the app. It wraps both the public auth routes
// (/login, /register) and the protected app routes (via RequireAuth + AppLayout),
// so every page and the Sidebar share the same user state.
export default function AuthLayout() {
  return <AuthProvider><Outlet /></AuthProvider>;
}
