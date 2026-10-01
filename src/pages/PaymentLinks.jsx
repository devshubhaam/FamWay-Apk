import { useState } from 'react';
import { Link } from 'react-router-dom';
import { imapConfigured, paymentLinks } from '../data/profile';
import { inr } from '../utils/format';
const I = {
  clock: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="clock" aria-hidden="true" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>),
  copy: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="copy" aria-hidden="true" style={{"width":"13px","height":"13px"}} className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>),
  clock2: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="clock" aria-hidden="true" style={{"width":"13px","height":"13px"}} className="lucide lucide-clock"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>),
  ban: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="ban" aria-hidden="true" style={{"width":"13px","height":"13px"}} className="lucide lucide-ban"><circle cx="12" cy="12" r="10"></circle><path d="M4.929 4.929 19.07 19.071"></path></svg>),
  check: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check-circle-2" aria-hidden="true" className="lucide lucide-check-circle-2"><circle cx="12" cy="12" r="10"></circle><path d="m16 9-5.5 5.5L8 12"></path></svg>),
  ext: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="external-link" aria-hidden="true" style={{"width":"13px","height":"13px"}} className="lucide lucide-external-link"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>),
  warn: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="alert-triangle" aria-hidden="true" style={{"width":"20px","height":"20px","verticalAlign":"middle","marginRight":"6px"}} className="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>),
  list: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="list" aria-hidden="true" style={{"width":"18px","height":"18px","color":"var(--color-primary)"}} className="lucide lucide-list"><path d="M3 5h.01"></path><path d="M3 12h.01"></path><path d="M3 19h.01"></path><path d="M8 5h13"></path><path d="M8 12h13"></path><path d="M8 19h13"></path></svg>),
  off: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="link-2-off" aria-hidden="true" style={{"width":"24px","height":"24px"}} className="lucide lucide-link-2-off"><path d="M9 17H7A5 5 0 0 1 7 7"></path><path d="M15 7h2a5 5 0 0 1 4 8"></path><line x1="8" x2="12" y1="12" y2="12"></line><line x1="2" x2="22" y1="2" y2="22"></line></svg>),
};

const EXP = { '1m': 60e3, '5m': 5 * 60e3, '30m': 30 * 60e3, '1h': 36e5, '2h': 72e5, '24h': 864e5 };
const fmt = (t) => new Date(t).toLocaleString('en-IN', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const left = (t) => { const ms = t - Date.now(); if (ms <= 0) return null; const h = Math.floor(ms / 36e5), m = Math.floor((ms % 36e5) / 6e4); return h ? `${h}h ${m}m left` : `${m}m left`; };
const slug = () => 'fg_' + Math.random().toString(36).slice(2, 10).toUpperCase();
export default function PaymentLinks() {
  const configured = imapConfigured;
  const [links, setLinks] = useState(paymentLinks);
  const [amount, setAmount] = useState(''), [expiry, setExpiry] = useState('24h'), [generated, setGenerated] = useState('');
  const copy = (t) => navigator.clipboard?.writeText(t);
  const urlOf = (s) => location.origin + '/pay/' + s;
  const generate = () => {
    const a = Number(amount); if (!(a >= 1)) return;
    const s = slug(), now = Date.now();
    setLinks([{ slug: s, amount: a, status: 'pending', createdAt: now, expiresAt: now + EXP[expiry] }, ...links]);
    setGenerated(urlOf(s)); setAmount('');
  };
  const setStatus = (s, status) => setLinks(links.map((l) => (l.slug === s ? { ...l, status } : l)));
  const rows = links.map((l) => {
    const rem = l.status === 'pending' ? left(l.expiresAt) : null;
    const st = l.status === 'paid' ? ['success', I.check, 'Paid'] : l.status === 'pending' && rem ? ['pending', I.clock, 'Pending'] : ['failed', I.ban, l.status === 'disabled' ? 'Disabled' : 'Expired'];
    return (<tr key={l.slug}>
      <td style={{ fontFamily: 'var(--font)' }}><span style={{ fontWeight: 600, color: 'var(--color-ink)', fontSize: 13.5 }}>{l.slug}</span>
        <code style={{ fontSize: 11, color: 'var(--color-ink-mute)', background: 'var(--surface-page)', padding: '2px 7px', borderRadius: 5, border: '1px solid var(--color-hairline)', marginLeft: 8 }}>/pay/{l.slug}</code></td>
      <td className="tnum" style={{ fontWeight: 600, color: 'var(--color-ink)', fontSize: 14 }}>{inr(l.amount)}</td>
      <td><span className={'status-badge status-' + st[0]}>{st[1]} {st[2]}</span></td>
      <td className="tnum" style={{ color: 'var(--color-ink-secondary)', fontSize: 12.5 }}>{fmt(l.createdAt)}</td>
      <td className="tnum" style={{ fontSize: 12.5 }}>{rem ? <span style={{ color: 'var(--color-warning-text)', fontWeight: 600 }} title={'Expires: ' + fmt(l.expiresAt)}>{rem}</span> : <span style={{ color: 'var(--color-ink-mute)' }}>—</span>}</td>
      <td style={{ textAlign: 'right', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }} onClick={() => copy(urlOf(l.slug))}>{I.copy} Copy</button>
        {l.status === 'pending' && rem && <>
          <button className="btn btn-secondary btn-sm" style={{ color: 'var(--color-warning-text)', display: 'inline-flex', alignItems: 'center', gap: 4 }} onClick={() => setStatus(l.slug, 'expired')}>{I.clock2} Expire</button>
          <button className="btn btn-danger btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }} onClick={() => setStatus(l.slug, 'disabled')}>{I.ban} Disable</button></>}
        {l.status === 'paid' && <Link to="/transactions" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--color-primary)' }}>{I.ext} Details</Link>}
      </td></tr>);
  });
  return (
    <main className="main-content">
 <div className="wrap">
 
 
 <div style={{"marginBottom":"24px"}}>
 <h1 style={{"fontSize":"22px","fontWeight":"700","color":"var(--color-ink)","letterSpacing":"-0.5px"}}>
 Payment Links
 </h1>
 <p style={{"fontSize":"13px","color":"var(--color-ink-mute)","marginTop":"4px"}}>Create and manage checkout URLs to share with your customers.</p>
 </div>
 
 <div className="card">
 <div className="card-header" style={{"marginBottom":"16px"}}>
 <div className="card-title" style={{"justifyContent":"flex-start"}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="link" aria-hidden="true" style={{"width":"18px","height":"18px","color":"var(--color-primary)"}} className="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> <span>Generate Payment Link</span></div>
 <div className="card-sub">Create an instant checkout link with auto-generated ID to share with your customers.</div>
 </div>
      {configured ? (
        <>
        <div className="generate-link-form">
 <div className="input-currency-box">
 <span className="currency-sym">₹</span>
 <input type="number" id="linkAmount" className="form-input" placeholder="Amount (e.g. 499)" step="any" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} />
 </div>
 <select value={expiry} onChange={(e) => setExpiry(e.target.value)} id="linkExpiry" className="form-input" style={{"width":"120px","marginBottom":"0","flexShrink":"0"}}>
                <option value="1m">1 Min</option>
                <option value="5m">5 Mins</option>
                <option value="30m">30 Mins</option>
                <option value="1h">1 Hour</option>
                <option value="2h">2 Hours</option>
                <option value="24h">1 Day</option>
            </select>
 <button className="btn btn-primary" onClick={generate} style={{"marginTop":"0","whiteSpace":"nowrap","display":"inline-flex","alignItems":"center","gap":"6px","flexShrink":"0"}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="zap" aria-hidden="true" style={{"width":"15px","height":"15px"}} className="lucide lucide-zap"><path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"></path></svg> Generate</button>
 </div>
 
 {generated && (<div style={{"display":"flex","gap":"12px","alignItems":"center","flexWrap":"wrap","marginTop":"20px","padding":"14px 18px","border":"1px solid var(--blue-200)","background":"var(--blue-50)","borderRadius":"var(--r-md)"}}><span style={{ fontSize: 13, fontWeight: 600, wordBreak: "break-all" }}>{generated}</span><button className="btn btn-secondary btn-sm" onClick={() => copy(generated)} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{I.copy} Copy</button></div>)}
        </>
      ) : (
        <div style={{"padding":"24px","textAlign":"center","background":"#fffbeb","border":"1px solid #fde68a","borderRadius":"var(--r-md)","marginTop":"14px"}}>
 <div style={{"color":"#ca8a04","fontWeight":"600","fontSize":"14px","marginBottom":"8px"}}>
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="alert-triangle" aria-hidden="true" style={{"width":"20px","height":"20px","verticalAlign":"middle","marginRight":"6px"}} className="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
 Payment Gateway Not Configured
 </div>
 <div style={{"color":"#854d0e","fontSize":"13px","marginBottom":"16px"}}>
 Please configure your FamPay IMAP settings to start creating payment links.
 </div>
 <a href="#/integrations" className="btn btn-primary btn-sm">Configure Now</a>
 </div>
      )}
    </div>
    <div className="card" style={{"padding":"0","overflow":"hidden"}}>
 <div style={{"padding":"22px 28px","borderBottom":"1px solid var(--color-hairline)"}}>
 <div className="card-title" style={{"justifyContent":"flex-start!important"}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="list" aria-hidden="true" style={{"width":"18px","height":"18px","color":"var(--color-primary)"}} className="lucide lucide-list"><path d="M3 5h.01"></path><path d="M3 12h.01"></path><path d="M3 19h.01"></path><path d="M8 5h13"></path><path d="M8 12h13"></path><path d="M8 19h13"></path></svg> <span>My Payment Links</span></div>
 <div className="card-sub">Manage your active and expired payment links.</div>
 </div>
 
 
      {configured && links.length ? (<div className="table-responsive" style={{ margin: 0, borderTop: 'none' }}><table className="tx-table">
        <thead>
 <tr>
 <th>Link (Slug)</th>
 <th>Amount</th>
 <th>Status</th>
 <th>Created</th>
 <th>Expires</th>
 <th style={{"textAlign":"right"}}>Actions</th>
 </tr>
 </thead>
 <tbody>{rows}</tbody></table></div>) : (
        <div className="empty-state" style={{"padding":"60px 20px"}}>
 <div className="empty-state-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="link-2-off" aria-hidden="true" style={{"width":"24px","height":"24px"}} className="lucide lucide-link-2-off"><path d="M9 17H7A5 5 0 0 1 7 7"></path><path d="M15 7h2a5 5 0 0 1 4 8"></path><line x1="8" x2="12" y1="12" y2="12"></line><line x1="2" x2="22" y1="2" y2="22"></line></svg></div>
 <div className="empty-state-title">No payment links generated yet</div>
 <div className="empty-state-sub">Create your custom payment link above to get started</div>
 </div>
      )}
    </div>
  </div></main>
  );
}
