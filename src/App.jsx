import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import PaymentLinks from './pages/PaymentLinks';
import Placeholder from './pages/Placeholder';
const PAGES = { 'api-keys': 'API Keys', webhooks: 'Webhooks', integrations: 'Integrations', profile: 'Profile', docs: 'Documentation', status: 'System Status' };
export default function App() {
  return (<Routes><Route index element={<Home />} />
    <Route element={<AppLayout />}><Route path="dashboard" element={<Dashboard />} /><Route path="transactions" element={<Transactions />} /><Route path="payment-links" element={<PaymentLinks />} />
    {Object.entries(PAGES).map(([p, t]) => <Route key={p} path={p} element={<Placeholder title={t} />} />)}</Route><Route path="*" element={<Navigate to="/" />} /></Routes>);
}
