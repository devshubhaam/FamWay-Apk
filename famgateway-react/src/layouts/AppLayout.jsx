import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAndroidBack } from '../hooks/useAndroidBack';
export default function AppLayout() {
  const [open, setOpen] = useState(false); const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
  useAndroidBack(open, () => setOpen(false));
  return (<div className="dashboard-layout">
    <div className="mobile-header"><button className="mobile-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={18} /></button></div>
    <Sidebar open={open} onClose={() => setOpen(false)} /><Outlet /></div>);
}
