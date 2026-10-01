import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy } from 'lucide-react';
import { getDashboard } from '../services/dashboard';
import { getRecentTransactions } from '../services/payment';
import { friendlyMessage } from '../services/api';
import { inr, greeting } from '../utils/format';
import ActivityChart from '../components/ActivityChart';
import TransactionsTable from '../components/TransactionsTable';
export default function Dashboard() {
  const [days, setDays] = useState(7); const [d, setD] = useState(null); const [tx, setTx] = useState([]); const [err, setErr] = useState('');
  useEffect(() => { let off = false; setErr('');
    Promise.all([getDashboard(days), getRecentTransactions(10)]).then(([a, b]) => { if (!off) { setD(a); setTx(b.items || []); } }).catch(e => !off && setErr(friendlyMessage(e)));
    return () => { off = true; }; }, [days]);
  const s = d?.stats || {}; const cards = [['Total Requests', s.totalRequests, 'blue'], ['Successful', s.successful, 'green'], ['Failed / Pending', s.failedOrPending, 'red'], ['Total Revenue', inr(s.revenue), 'green']];
  return (<main className="main-content"><div className="wrap">
    {err && <div className="fg-banner" role="alert">{err}</div>}
    <div className="dash-anim-right page-title-row is-visible" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
      <div><h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-ink)', letterSpacing: '-0.5px' }}>{greeting()}, {d?.user?.name?.split(' ')[0] || ''} 👋</h1>
        <p style={{ fontSize: 13, color: 'var(--color-ink-mute)', marginTop: 4 }}>Here's what's happening with your API today.</p></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        {d?.user?.merchantId && <div className="mid-badge-btn" onClick={() => navigator.clipboard?.writeText(d.user.merchantId)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: '#fff', border: '1px solid var(--color-hairline)', borderRadius: 50, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
          <span style={{ color: 'var(--color-ink-mute)', fontSize: 11 }}>MID:</span><span style={{ fontFamily: 'monospace' }}>{d.user.merchantId}</span><Copy size={12} /></div>}
        <div style={{ fontSize: 12 }}>{d?.imap?.configured ? 'IMAP Connected' : <>IMAP Not Configured <Link to="/integrations">Configure</Link></>}</div></div></div>
    <div className="stat-grid dash-stagger is-visible">{cards.map(([l, v, c]) => <div className="stat-card" key={l}><div className="stat-card-top"><div className="stat-card-label">{l}</div><div className={'stat-card-icon ' + c} /></div><div className="stat-card-value tnum">{v ?? 0}</div></div>)}</div>
    <ActivityChart data={d?.activity || []} days={days} onDays={setDays} />
    <TransactionsTable rows={tx} />
  </div></main>);
}
