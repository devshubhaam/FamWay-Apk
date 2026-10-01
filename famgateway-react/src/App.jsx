import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Placeholder from './pages/Placeholder';
const PAGES = { transactions: 'Transactions', 'payment-links': 'Payment Links', 'api-keys': 'API Keys', webhooks: 'Webhooks', integrations: 'Integrations', profile: 'Profile', docs: 'Documentation', status: 'System Status' };
export default function App() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Login />;
  return (<Routes><Route element={<AppLayout />}><Route index element={<Dashboard />} />
    {Object.entries(PAGES).map(([p, t]) => <Route key={p} path={p} element={<Placeholder title={t} />} />)}</Route><Route path="*" element={<Navigate to="/" />} /></Routes>);
}
