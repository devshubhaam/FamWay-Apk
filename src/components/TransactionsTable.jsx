import { Link } from 'react-router-dom';
import { Receipt } from 'lucide-react';
import { inr, STATUS } from '../utils/format';
export default function TransactionsTable({ rows }) {
  return (<div className="card dash-anim-up is-visible">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <div><div className="card-title"><Receipt size={16} /> Recent Transactions</div><div className="card-sub">Your last 10 orders</div></div>
      <Link to="/transactions" className="btn btn-secondary btn-sm">View All</Link></div>
    <div className="table-responsive"><table className="tx-table"><thead><tr><th>Order ID</th><th>Bank RRN</th><th>Customer detail</th><th>Created on</th><th>Amount</th><th>Status</th></tr></thead>
      <tbody>{rows.length === 0 ? <tr><td colSpan={6}><div className="empty-state"><div className="empty-state-title">No transactions yet</div>
        <div className="empty-state-sub">Create your first payment link to get started</div></div></td></tr>
        : rows.map(t => <tr key={t.orderId}><td>{t.orderId}</td><td>{t.bankRrn || '—'}</td><td>{t.customerRef || '—'}</td><td>{new Date(t.createdAt).toLocaleString()}</td>
          <td>{inr(t.amount)}</td><td title={t.failureReason || ''}>{STATUS[t.verificationStatus] || 'Unknown'}</td></tr>)}</tbody></table></div></div>);
}
