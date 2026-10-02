import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// App entry ("/"): logged-in user -> /dashboard, everyone else -> /register.
// Must render inside AuthLayout's AuthProvider. Waits for the session check first.
export default function RootRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return <Navigate to={user ? '/dashboard' : '/register'} replace />;
}
