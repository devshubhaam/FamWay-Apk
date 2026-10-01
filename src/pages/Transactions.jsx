import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { transactions } from '../data/profile';
import { inr } from '../utils/format';
// Each transaction: { orderId, bankRrn, customerRef, createdAt, amount, status: 'created'|'captured'|'expired'|'failed' } (from backend later)
const DAY = 864e5;
function inRange(ts, f) {
  if (f === 'all') return true;
  const now = new Date(), t = new Date(ts), sod = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  if (f === 'today') return t >= sod;
  if (f === 'yesterday') return t >= sod - DAY && t < sod;
  if (f === '7days') return t >= now - 7 * DAY;
  if (f === '30days') return t >= now - 30 * DAY;
  if (f === 'this_month') return t.getFullYear() === now.getFullYear() && t.getMonth() === now.getMonth();
  if (f === 'last_month') { const l = new Date(now.getFullYear(), now.getMonth() - 1, 1); return t.getFullYear() === l.getFullYear() && t.getMonth() === l.getMonth(); }
  return true;
}
const LABEL = { created: 'Created', captured: 'Captured', expired: 'Expired', failed: 'Failed' };
const COLOR = { created: '#d97706', captured: '#059669', expired: '#64748b', failed: '#dc2626' };
function UpiDonut() {
  return (<PieChart width={100} height={100}><Pie data={[{ v: 1 }]} dataKey="v" innerRadius={30} outerRadius={46} stroke="none" isAnimationActive={false}><Cell fill="#2563eb" /></Pie></PieChart>);
}
function TxTable({ rows }) {
  return (<table className="tx-table"><thead><tr><th>Order ID</th><th>Bank RRN</th><th>Customer detail</th><th>Created on</th><th>Amount</th><th>Status</th></tr></thead>
    <tbody>{rows.map((t) => (<tr key={t.orderId}><td>{t.orderId}</td><td>{t.bankRrn || '—'}</td><td>{t.customerRef || '—'}</td><td>{new Date(t.createdAt).toLocaleString('en-IN')}</td>
      <td>{inr(t.amount)}</td><td><span style={{ color: COLOR[t.status], fontWeight: 600 }}>{LABEL[t.status] || 'Unknown'}</span></td></tr>))}</tbody></table>);
}
function Pager({ page, pages, total, onPage }) {
  return (<><span style={{ fontSize: 13, color: 'var(--color-ink-mute)' }}>{total} payments · Page {page} of {pages}</span>
    <div style={{ display: 'flex', gap: 8 }}><button className="btn btn-secondary btn-sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>Previous</button>
      <button className="btn btn-secondary btn-sm" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next</button></div></>);
}
export default function Transactions() {
  const [filter, setFilter] = useState('all'), [dateF, setDateF] = useState('30days'), [limit, setLimit] = useState(25), [q, setQ] = useState(''), [page, setPage] = useState(1);
  const all = transactions;
  const count = (s) => all.filter((t) => t.status === s).length;
  const captured = count('captured'), pending = count('created'), expired = count('expired'), failed = count('failed');
  const totalRevenue = all.filter((t) => t.status === 'captured').reduce((a, t) => a + Number(t.amount || 0), 0);
  const rows = useMemo(() => all.filter((t) => (filter === 'all' || t.status === filter) && inRange(t.createdAt, dateF) && (!q || String(t.orderId).toLowerCase().includes(q.toLowerCase()))), [all, filter, dateF, q]);
  const pages = Math.max(1, Math.ceil(rows.length / limit));
  const pageRows = rows.slice((page - 1) * limit, page * limit);
  return (
<main className="main-content">
 <div className="wrap">
 
 <div className="page-title-row" style={{"marginBottom":"24px"}}>
 <h1 style={{"fontSize":"22px","fontWeight":"700","color":"var(--color-ink)","letterSpacing":"-0.5px"}}>
 Transactions
 </h1>
 <p style={{"fontSize":"13px","color":"var(--color-ink-mute)","marginTop":"4px"}}>View and manage all your payments.</p>
 </div>
 
 <div className="rzp-top-grid">
 <div className="card" style={{"padding":"24px"}}>
 <div style={{"fontSize":"13px","color":"var(--color-ink-mute)","display":"flex","alignItems":"center","gap":"6px"}}>Collected Amount <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="info" aria-hidden="true" style={{"width":"14px","height":"14px"}} className="lucide lucide-info"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></div>
 <div style={{"fontSize":"32px","fontWeight":"700","color":"var(--color-ink)","marginTop":"8px"}} id="valTotalRevenue">{inr(totalRevenue)}</div>
 <div style={{"fontSize":"13px","color":"var(--color-ink-mute)","marginTop":"4px"}}>from {captured} captured payments</div>
 <div style={{"fontSize":"13px","color":"var(--color-ink-mute)","marginTop":"24px","borderTop":"1px dashed var(--color-hairline)","paddingTop":"16px","display":"flex","alignItems":"flex-start","gap":"8px"}}>
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="zap" aria-hidden="true" style={{"width":"16px","height":"16px","color":"var(--color-primary)","flexShrink":"0","marginTop":"2px"}} className="lucide lucide-zap"><path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"></path></svg> 
 <div style={{"lineHeight":"1.5"}}>100% of payments are settled instantly to your bank account with 0% fee.</div>
 </div>
 </div>
 
 <div className="card" style={{"padding":"24px","display":"flex","alignItems":"center","justifyContent":"space-between"}}>
 <div>
 <div style={{"fontSize":"13px","color":"var(--color-ink-mute)","fontWeight":"500"}}>Split by payment method</div>
 <div style={{"position":"relative","width":"100px","height":"100px","marginTop":"16px"}}>
 <UpiDonut />
 </div>
 </div>
 <div style={{"display":"flex","alignItems":"center","gap":"8px","paddingRight":"16px"}}>
 <div style={{"width":"8px","height":"8px","background":"#6366f1","borderRadius":"50%"}}></div>
 <span style={{"fontSize":"13px","fontWeight":"600","color":"var(--color-ink)"}}>UPI</span>
 <span style={{"fontSize":"13px","color":"var(--color-ink-mute)","marginLeft":"16px"}}>100%</span>
 </div>
 </div>
 </div>
 
 <div className="rzp-mid-grid">
 <div className="card" style={{"padding":"16px"}}>
 <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center"}}>
 <div style={{"fontSize":"13px","color":"var(--color-ink)","fontWeight":"600","display":"flex","alignItems":"center","gap":"8px"}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="clock" aria-hidden="true" style={{"width":"16px","height":"16px","color":"#eab308"}} className="lucide lucide-clock"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg> Pending <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="info" aria-hidden="true" style={{"width":"14px","height":"14px","color":"var(--color-ink-mute)"}} className="lucide lucide-info"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></div>
 </div>
 <div style={{"fontSize":"20px","fontWeight":"600","color":"var(--color-ink)","marginTop":"12px"}} id="valPendingCount">{pending}</div>
 <div style={{"fontSize":"12px","color":"var(--color-ink-mute)","marginTop":"8px"}}>Awaiting customer payment</div>
 </div>
 
 <div className="card" style={{"padding":"16px"}}>
 <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center"}}>
 <div style={{"fontSize":"13px","color":"var(--color-ink)","fontWeight":"600","display":"flex","alignItems":"center","gap":"8px"}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="ban" aria-hidden="true" style={{"width":"16px","height":"16px","color":"#94a3b8"}} className="lucide lucide-ban"><circle cx="12" cy="12" r="10"></circle><path d="M4.929 4.929 19.07 19.071"></path></svg> Expired <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="info" aria-hidden="true" style={{"width":"14px","height":"14px","color":"var(--color-ink-mute)"}} className="lucide lucide-info"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></div>
 </div>
 <div style={{"fontSize":"20px","fontWeight":"600","color":"var(--color-ink)","marginTop":"12px"}} id="valExpiredCount">{expired}</div>
 <div style={{"fontSize":"12px","color":"var(--color-ink-mute)","marginTop":"8px"}}>Payment link timed out</div>
 </div>
 
 <div className="card" style={{"padding":"16px"}}>
 <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center"}}>
 <div style={{"fontSize":"13px","color":"var(--color-ink)","fontWeight":"600","display":"flex","alignItems":"center","gap":"8px"}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="x-circle" aria-hidden="true" style={{"width":"16px","height":"16px","color":"#ef4444"}} className="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg> Failed <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="info" aria-hidden="true" style={{"width":"14px","height":"14px","color":"var(--color-ink-mute)"}} className="lucide lucide-info"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></div>
 </div>
 <div style={{"fontSize":"20px","fontWeight":"600","color":"var(--color-ink)","marginTop":"12px"}} id="valFailedCount">{failed}</div>
 <div style={{"fontSize":"12px","color":"var(--color-ink-mute)","marginTop":"8px"}}>Transaction declined</div>
 </div>
 </div>
 
 <div className="main-tabs">
 <div className="main-tab active">Payments</div>
 </div>
 <div className="card" style={{"padding":"0","background":"#fff"}}>
 
 
 <div style={{"padding":"12px 16px","borderBottom":"1px solid var(--color-hairline)"}}>
 <div style={{"display":"flex","gap":"8px","alignItems":"center","overflowX":"auto","whiteSpace":"nowrap","paddingBottom":"4px","maxWidth":"100%"}}>
 <button type="button" className={'rzp-tab' + (filter === 'all' ? ' active' : '')} onClick={() => { setFilter('all'); setPage(1); }}>All</button>
 <button type="button" className={'rzp-tab' + (filter === 'created' ? ' active' : '')} onClick={() => { setFilter('created'); setPage(1); }}>Created</button>
 <button type="button" className={'rzp-tab' + (filter === 'captured' ? ' active' : '')} onClick={() => { setFilter('captured'); setPage(1); }}>Captured</button>
 <button type="button" className={'rzp-tab' + (filter === 'expired' ? ' active' : '')} onClick={() => { setFilter('expired'); setPage(1); }}>Expired</button>
 <button type="button" className={'rzp-tab' + (filter === 'failed' ? ' active' : '')} onClick={() => { setFilter('failed'); setPage(1); }}>Failed</button>
 </div>
 </div>
 
 <div className="card-header-filters" style={{"borderBottom":"1px solid var(--color-hairline)","display":"flex","justifyContent":"space-between","alignItems":"center","padding":"12px 16px","background":"#fafafa"}}>
 
 <div style={{"display":"flex","alignItems":"center","gap":"12px","flexWrap":"wrap"}}>
 <select className="filter-dropdown" id="dateFilter" value={dateF} onChange={(e) => { setDateF(e.target.value); setPage(1); }}>
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="this_month">This Month</option>
                        <option value="last_month">Last Month</option>
                    </select>
 <select className="filter-dropdown" id="limitSelect" value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
                        <option value="10">10 items</option>
                        <option value="25">25 items</option>
                    </select>
 </div>
 
 <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
 <div className="search-box">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="search" aria-hidden="true" style={{"width":"14px","height":"14px"}} className="lucide lucide-search"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
 <input type="text" id="searchInput" placeholder="Search in Order ID..." style={{"background":"#fff"}} value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
 </div>
 </div>
 </div>
 
 <div className="table-responsive" style={{ display: rows.length ? "block" : "none" }}><TxTable rows={pageRows} /></div>
 
 <div id="emptyStateContainer" style={{"display": rows.length ? "none" : "block","textAlign":"center","padding":"60px 20px"}}>
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="inbox" aria-hidden="true" style={{"width":"48px","height":"48px","marginBottom":"12px","opacity":"0.5","display":"inline-block"}} className="lucide lucide-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
 <h3 style={{"fontSize":"16px","fontWeight":"600","color":"var(--color-ink)","marginBottom":"4px"}}>No transactions found</h3>
 <p style={{"fontSize":"13px","color":"var(--color-ink-mute)"}}>No payments match your current search and filters.</p>
 </div>
 
 <div className="pagination-controls" id="paginationContainer" style={{"justifyContent":"space-between","borderTop":"1px solid var(--color-hairline)","display": rows.length ? "flex" : "none"}}><Pager page={page} pages={pages} total={rows.length} onPage={setPage} /></div>
 </div>
 </div>
</main>
  );
}
