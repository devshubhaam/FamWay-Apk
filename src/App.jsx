import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import PaymentLinks from './pages/PaymentLinks';
import ApiKeys from './pages/ApiKeys';
import Webhooks from './pages/Webhooks';
import Integrations from './pages/Integrations';
import Profile from './pages/Profile';
import Placeholder from './pages/Placeholder';
const PAGES = { docs: 'Documentation', status: 'System Status' };
export default function App() {
  return (<Routes><Route index element={<Home />} />
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} /><Route path="register" element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}><Route path="dashboard" element={<Dashboard />} /><Route path="transactions" element={<Transactions />} /><Route path="payment-links" element={<PaymentLinks />} /><Route path="api-keys" element={<ApiKeys />} /><Route path="webhooks" element={<Webhooks />} /><Route path="integrations" element={<Integrations />} /><Route path="profile" element={<Profile />} />
        {Object.entries(PAGES).map(([p, t]) => <Route key={p} path={p} element={<Placeholder title={t} />} />)}</Route>
      </Route>
    </Route><Route path="*" element={<Navigate to="/" />} /></Routes>);
}
