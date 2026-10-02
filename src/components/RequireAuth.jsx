import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Route guard. Must render inside the (single) AuthProvider mounted by AuthLayout.
// While the session check is in flight (e.g. page refresh) render nothing, so we
// neither flash protected content nor bounce a valid session to /login.
export default function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
