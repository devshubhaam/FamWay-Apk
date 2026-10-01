import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy } from 'lucide-react';
import { profile, stats as s, transactions, imapConfigured } from '../data/profile';
import { inr, greeting } from '../utils/format';
import ActivityChart from '../components/ActivityChart';
import TransactionsTable from '../components/TransactionsTable';
export default function Dashboard() {
  const [days, setDays] = useState(7);
  const activity = useMemo(() => Array.from({ length: days }, (_, i) => { const d = new Date(Date.now() - (days - 1 - i) * 864e5);
    return { date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }), requests: 0, revenue: 0 }; }), [days]);
  const cards = [['Total Requests', s.totalRequests, 'blue'], ['Successful', s.successful, 'green'], ['Failed / Pending', s.failedOrPending, 'red'], ['Total Revenue', inr(s.revenue), 'green']];
  return (<main className="main-content"><div className="wrap">
    <div className="dash-anim-right page-title-row is-visible" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
      <div><h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-ink)', letterSpacing: '-0.5px' }}>{greeting()}, {profile.name.split(' ')[0]} 👋</h1>
        <p style={{ fontSize: 13, color: 'var(--color-ink-mute)', marginTop: 4 }}>Here's what's happening with your API today.</p></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div className="mid-badge-btn" onClick={() => navigator.clipboard?.writeText(profile.merchantId)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: '#fff', border: '1px solid var(--color-hairline)', borderRadius: 50, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
          <span style={{ color: 'var(--color-ink-mute)', fontSize: 11 }}>MID:</span><span style={{ fontFamily: 'monospace' }}>{profile.merchantId}</span><Copy size={12} /></div>
        <div style={{ fontSize: 12 }}>{imapConfigured ? 'IMAP Connected' : <>IMAP Not Configured <Link to="/integrations">Configure</Link></>}</div></div></div>
    <div className="stat-grid dash-stagger is-visible">{cards.map(([l, v, c]) => <div className="stat-card" key={l}><div className="stat-card-top"><div className="stat-card-label">{l}</div><div className={'stat-card-icon ' + c} /></div><div className="stat-card-value tnum">{v}</div></div>)}</div>
    <ActivityChart data={activity} days={days} onDays={setDays} />
    <TransactionsTable rows={transactions} />
  </div></main>);
}
