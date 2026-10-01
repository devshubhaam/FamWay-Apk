import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Link2, KeyRound, Send, PlugZap, UserCircle, BookOpen, Activity, MessageCircle, LogOut, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../hooks/useAuth';
const MAIN = [['/', 'Dashboard', LayoutDashboard], ['/transactions', 'Transactions', Receipt], ['/payment-links', 'Payment Links', Link2], ['/api-keys', 'API Keys', KeyRound], ['/webhooks', 'Webhooks', Send]];
const SET = [['/integrations', 'Integrations', PlugZap], ['/profile', 'Profile', UserCircle], ['/docs', 'Documentation', BookOpen], ['/status', 'System Status', Activity]];
export default function Sidebar({ open, onClose }) {
  const { user, signOut } = useAuth();
  const item = ([to, label, Icon]) => (
    <NavLink key={to} to={to} end={to === '/'} onClick={onClose} className={({ isActive }) => 'sidebar-item' + (isActive ? ' active' : '')}><Icon size={16} /> {label}</NavLink>);
  return (<>
    <aside className={'sidebar' + (open ? ' is-open' : '')} id="sidebar">
      <div className="sidebar-header"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="sidebar-brand"><img src={logo} alt="FamGateway" style={{ height: 26, width: 'auto', display: 'block', objectFit: 'contain' }} /></div>
        <button className="mobile-menu-btn" onClick={onClose} aria-label="Close menu"><X size={18} /></button></div></div>
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Main</div>{MAIN.map(item)}
        <div className="sidebar-section-label">Settings</div>{SET.map(item)}
        <a href="https://wa.me/919771348544?text=Hello%2C%20I%20need%20support." target="_blank" rel="noopener noreferrer" className="sidebar-item" style={{ color: '#10b981', fontWeight: 600 }}><MessageCircle size={16} /> WhatsApp Support</a>
      </nav>
      <div className="sidebar-footer">
        {user && <NavLink to="/profile" className="sidebar-user-card" onClick={onClose}>
          {user.avatarUrl && <img src={user.avatarUrl} className="sidebar-avatar" alt={user.name} />}
          <div style={{ overflow: 'hidden', minWidth: 0 }}><div className="sidebar-user-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
            <div className="sidebar-user-role">{user.email}</div></div></NavLink>}
        <a href="#" className="sidebar-logout" onClick={(e) => { e.preventDefault(); signOut(); }}><LogOut size={15} /> Sign Out</a>
      </div>
    </aside>
    {open && <div className="sidebar-overlay" onClick={onClose} />}
  </>);
}
