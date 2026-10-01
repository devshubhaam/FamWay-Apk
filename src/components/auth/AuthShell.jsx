import { Link } from 'react-router-dom';
import { Check, ChevronLeft } from 'lucide-react';
import logo from '../../assets/logo.png';
import './auth.css';

// Shared two-panel layout of the old login.html / register.html.
export default function AuthShell({ side, title, subtitle, children, footer }) {
  return (
    <div className="fg-auth">
      <aside className="fg-auth-side">
        <div className="fg-auth-side-bg" /><div className="fg-auth-side-grid" />
        <div className="fg-auth-side-content">
          <img className="fg-auth-side-logo" src={logo} alt="FamGateway" />
          <div className="fg-auth-side-heading">{side.heading}<br /><span>{side.accent}</span></div>
          <p className="fg-auth-side-desc">{side.description}</p>
          <ul className="fg-auth-features">
            {side.features.map((f) => (
              <li key={f}><span className="fg-auth-feature-dot"><Check size={14} strokeWidth={2.5} aria-hidden="true" /></span>{f}</li>
            ))}
          </ul>
        </div>
        <div className="fg-auth-side-footer">
          <div>© 2026 Aryanispe FamGateway</div>
          <div className="fg-auth-disclaimer">Independent developer tool. Not affiliated with Tri O Tech Solutions Pvt Ltd / FamApp / FamPay.</div>
        </div>
      </aside>
      <main className="fg-auth-main">
        <Link to="/" className="fg-auth-back"><ChevronLeft size={14} aria-hidden="true" />Home</Link>
        <div className="fg-auth-card">
          <header className="fg-auth-header">
            <img className="fg-auth-card-logo" src={logo} alt="FamGateway" />
            <h1 className="fg-auth-title">{title}</h1>
            <p className="fg-auth-subtitle">{subtitle}</p>
          </header>
          {children}
          {footer}
        </div>
      </main>
    </div>
  );
}
