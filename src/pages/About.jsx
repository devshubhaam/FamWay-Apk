import { useEffect, useState } from 'react';
import { useAndroidBack } from '../hooks/useAndroidBack';
import { useScopedStyle } from '../hooks/useScopedStyle';
import homeCss from '../styles/home.css?inline';
// About Us page (formerly Home) converted from the supplied HTML. Images/fonts live in public/home/.
export default function About() {
  const [open, setOpen] = useState(false);
  useScopedStyle(homeCss);
  useAndroidBack(open, () => setOpen(false));
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  const onClick = (e) => {
    const a = e.target.closest && e.target.closest('a'); if (!a) return;
    const h = a.getAttribute('href') || '';
    if (a.closest('#mobile-nav')) setOpen(false);
    if (h === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else if (h.startsWith('#') && !h.startsWith('#/')) { e.preventDefault(); document.getElementById(h.slice(1))?.scrollIntoView({ behavior: 'smooth' }); }
  };
  return (
    <div className="fg-home" onClick={onClick}>


 <header className="nav nav-sticky">
 <div className="shell nav-inner">
 <a className="brand" href="#/about" style={{"padding":"0"}}><img src="./home/351187665b.png" alt="FamGateway" style={{"height":"28px","width":"auto","display":"block","objectFit":"contain"}} /></a>
 <ul className="links"><li><a href="#flow">How it works</a></li><li><a href="#api">API</a></li><li><a href="https://famgateway.in/blog/how-it-works.php" target="_blank">Architecture</a></li><li><a href="https://famgateway.in/docs.php" target="_blank">Docs</a></li></ul>
 <div className="nav-actions"><a href="#/login">Login</a><a className="primary" href="#/register">Register</a></div>
 <button className="menu" onClick={() => setOpen(o => !o)} aria-label="Open menu"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M4 7h16M4 12h16M4 17h16"></path>
 </svg></button>
 </div>
 </header>
 <nav id="mobile-nav" className={"mobile-nav" + (open ? " is-open" : "")}><a href="#flow">How it works</a><a href="#api">API</a><a href="https://famgateway.in/blog/how-it-works.php">Architecture</a><a href="https://famgateway.in/docs.php">Docs</a>
 <div className="mobile-menu-actions"><a className="mobile-register" href="#/register">Register</a><a className="mobile-login" href="#/login">Login</a></div>
 </nav>
 <div id="mobile-overlay" className={"mobile-overlay" + (open ? " is-open" : "")} onClick={() => setOpen(false)}></div>
 <main>
 <section className="hero">
 <div className="shell hero-grid">
 <div>
 <div className="hero-eyebrow-wrap"><div className="eyebrow"><svg className="hero-fampay-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="UPI Engine">
 <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
 </svg>{" Non-Custodial UPI Automation & Webhook Engine"}</div></div>
 <div className="hero-h1-wrap"><h1 style={{"fontSize":"clamp(40px,5vw,68px)"}}>The <em>100% Free</em> Developer UPI API.</h1></div>
 <div className="hero-copy-wrap"><p className="hero-copy">Create a direct peer-to-peer payment link, display a dynamic UPI QR, and know exactly when the money arrives via automated webhook notifications. FamGateway gives Indian developers a simple path from checkout to confirmation — <b>100% Free Forever with 0% Transaction Fees.</b></p></div>
 <div className="hero-actions-wrap"><div className="hero-actions"><a className="primary" href="#/register">Create your free account <span>→</span></a><a className="secondary" href="https://famgateway.in/docs.php">Read the API docs <span>↗</span></a></div></div>
 <div className="hero-proof-wrap"><div className="proof"><span><b>✓</b> 100% Free Forever</span><span><b>✓</b> 0% Transaction Fees</span><span><b>✓</b> Unlimited API Calls</span></div></div>
 </div>
 <div className="hero-visual">
 <div className="hero-card-wrap">
 <div className="product">
 <div className="product-head">
 <div className="dots"><i></i><i></i><i></i></div><span>famgateway.in/pay.php</span><span>LIVE</span>
 </div>
 <div className="product-main">
 <div className="gateway-brand"><img src="./home/f508ba7660.png" alt="FamGateway" style={{"height":"24px","width":"auto","display":"block","objectFit":"contain"}} /></div>
 <div className="product-label">Order total</div>
 <div className="money">₹499 <small>INR</small></div>
 <div className="pay-card">
 <div className="pay-row"><span>Order ID</span><b>order_8H2KQ</b></div>
 <div className="pay-row"><span>UPI payment link</span><b>Created</b></div>
 <div className="pay-row"><span>Verification</span><span className="status"><i></i>Payment received</span></div>
 </div>
 <div className="flow">
 <div>Link created</div><span>→</span>
 <div>Pay with UPI</div><span>→</span>
 <div className="active">Confirmed</div>
 </div>
 </div>
 <div className="hero-note">Verified in seconds ✓</div>
 </div>
 </div>
 </div>
 </div>
 </section>
 <div className="ticker">
 <div className="ticker-track shell"><span>UPI Gateway</span><span>UPI QR Generation</span><span>Instant Payment Links</span><span>Stateless Verification</span><span>Hosted Checkout</span></div>
 </div>
 
 <section className="section anim-fade-up visible" style={{"paddingTop":"60px","paddingBottom":"40px","background":"var(--surface-page,#f8fafc)"}}>
 <div className="shell" style={{"maxWidth":"860px","margin":"0 auto","textAlign":"center"}}>
 <div style={{"display":"inline-flex","alignItems":"center","gap":"8px","background":"rgba(37,99,235,0.08)","color":"#2563eb","border":"1px solid rgba(37,99,235,0.2)","borderRadius":"99px","padding":"6px 16px","fontSize":"12px","fontWeight":"700","textTransform":"uppercase","letterSpacing":"0.8px","marginBottom":"16px"}}>
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
 Developer Walkthrough
 </div>
 <h2 style={{"fontSize":"clamp(26px,4vw,36px)","marginBottom":"24px","color":"#0f172a","letterSpacing":"-0.5px","textAlign":"center","fontWeight":"800"}}>Setting up FamGateway in Minutes</h2>
 <div style={{"position":"relative","paddingBottom":"56.25%","height":"0","overflow":"hidden","borderRadius":"16px","boxShadow":"0 20px 40px -15px rgba(15,23,42,0.15)","border":"1px solid #e2e8f0","background":"#0f172a"}}>
 <iframe style={{"position":"absolute","top":"0","left":"0","width":"100%","height":"100%"}} title="FREE FAM PAY API FOR DEVS" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
 </div>
 </div>
 </section>
 <section id="flow" className="section">
 <div className="shell">
 <div className="flow-intro">
 <div className="anim-slide-left visible">
 <div className="kicker">How FamGateway Architecture Works</div>
 <h2 style={{"fontSize":"clamp(30px,4vw,42px)"}}>{"Automated Peer-to-Peer UPI Notification & Verification Engine."}</h2>
 <p className="section-intro">Generate a dynamic UPI QR, display the exact payable amount, then automatically verify incoming bank UTR references via webhook.</p>
 </div>
 <div className="api-flow-card anim-slide-right visible"><b>YOUR APP → FAMGATEWAY</b>
 <div className="api-flow-line">
 <div className="api-flow-node">API request<small>UPI + amount</small></div><span className="api-flow-arrow">→</span>
 <div className="api-flow-node">QR response<small>order + QR URL</small></div><span className="api-flow-arrow">→</span>
 <div className="api-flow-node">Status check<small>pending / paid</small></div>
 </div>
 <div className="api-flow-result">{"{ \"status\": \"success\", \"utr\": \"...\" }"}</div>
 </div>
 </div>
 <div className="steps anim-stagger visible">
 <article className="step">
 <div className="step-no">01 / CONNECT</div>
 <h3>Get your API key.</h3>
 <p>Create an account and configure your merchant transaction notification listener for automated verification.</p>
 </article>
 <article className="step">
 <div className="step-no">02 / CREATE</div>
 <h3>Generate a QR.</h3>
 <p>Send a UPI ID and amount. The API returns an order ID, QR URL, and unique payable amount.</p>
 </article>
 <article className="step">
 <div className="step-no">03 / CHECK</div>
 <h3>Check payment status.</h3>
 <p>Use the order ID to check whether payment is pending, successful, or expired.</p>
 </article>
 </div>
 </div>
 </section>
 <section id="api" className="section section-dark anim-fade-up visible">
 <div className="shell integration">
 <div className="anim-slide-left visible">
 <div className="kicker">Small API surface. Big control.</div>
 <h2>Two calls. One clear answer.</h2>
 <p className="section-intro">Create a payment session, then ask for its status. The response is clean JSON, so it fits into whatever you already build with.</p>
 <div className="code">
 <div className="code-top"><span>create-payment.py</span><span>copy</span></div>
 <pre><span className="dim">{"# create a payment link"}</span>{"\n"}<span className="green">{"GET"}</span>{" /api/qr.php\n"}<span className="orange">{"upi"}</span>{": \"username@fam\"\n"}<span className="orange">{"amount"}</span>{": 499\n\n"}<span className="dim">{"# response"}</span>{"\norder_id, qr_url, payable_amount"}</pre>
 </div>
 </div>
 <div className="feature-list anim-stagger visible">
 <div className="feature"><span className="feature-num" style={{"color":"#60a5fa","fontWeight":"800"}}>01</span>
 <div>
 <h3>Bank UTR Idempotency</h3>
 <p>Verify clean exact amounts with atomic database locking, zero decimal changes needed.</p>
 </div><span className="arrow">↗</span>
 </div>
 <div className="feature"><span className="feature-num" style={{"color":"#60a5fa","fontWeight":"800"}}>02</span>
 <div>
 <h3>UPI QR generation</h3>
 <p>Create a QR code for a UPI ID and the exact payable amount.</p>
 </div><span className="arrow">↗</span>
 </div>
 <div className="feature"><span className="feature-num" style={{"color":"#60a5fa","fontWeight":"800"}}>03</span>
 <div>
 <h3>Hosted payment page</h3>
 <p>Use the built-in checkout page for a payment link when you need a ready UI.</p>
 </div><span className="arrow">↗</span>
 </div>
 <div className="feature"><span className="feature-num" style={{"color":"#60a5fa","fontWeight":"800"}}>04</span>
 <div>
 <h3>Status verification</h3>
 <p>Check an order and receive its pending, successful, or expired state.</p>
 </div><span className="arrow">↗</span>
 </div>
 </div>
 </div>
 </section>
 <section id="use-cases" className="section">
 <div className="shell">
 <div className="checkout-showcase">
 <div className="checkout-side anim-slide-left visible">
 <div>
 <div className="kicker">Checkout view</div>
 <h2>Show the payment screen before the user pays.</h2>
 <p className="section-intro">This is the real checkout screenshot from the project.</p>
 </div>
 <div className="checkout-card">
 <h3>What the user sees</h3>
 <p>Exact amount, UPI destination, QR scan, and live waiting state all stay visible at once. That makes the payment flow feel direct instead of hidden behind extra steps.</p>
 </div>
 <div className="checkout-metrics">
 <div className="checkout-metric"><b>Amount</b><span>₹100</span></div>
 <div className="checkout-metric"><b>Status</b><span>Waiting</span></div>
 </div>
 </div>
 <div className="checkout-panel"><img src="./home/736e5a6200.png" alt="FamPay checkout screenshot" /></div>
 </div>
 </div>
 </section>
 <section className="section section-dark">
 <div className="shell">
 <div className="checkout-showcase" style={{"gridTemplateColumns":"minmax(300px,420px) minmax(0,1.05fr)"}}>
 <div className="checkout-panel"><img src="./home/2f0888d8c5.png" alt="Payment Confirmed" /></div>
 <div className="checkout-side anim-slide-right visible">
 <div>
 <div className="kicker">Built around the current API</div>
 <h2>QR generation, payment links, and verification.</h2>
 <p className="section-intro">Generate a FamPay UPI QR directly from your application.</p>
 </div>
 <div className="checkout-card">
 <h3>Hosted payment links</h3>
 <p>Create a shareable link with an expiry time and a built-in payment page.</p>
 </div>
 <div className="checkout-card" style={{"background":"var(--ink-2)","borderColor":"rgba(255,255,255,.1)","color":"var(--white)"}}>
 <h3>Manual status polling</h3>
 <p style={{"color":"#afc0b4"}}>Poll the verification endpoint to check whether a payment has been received.</p>
 </div>
 </div>
 </div>
 </div>
 </section>
 <section style={{"background":"#0f172a","padding":"70px 0","borderTop":"1px solid rgba(255,255,255,0.1)","borderBottom":"1px solid rgba(255,255,255,0.1)","textAlign":"center","position":"relative","overflow":"hidden"}}>
 <div style={{"position":"absolute","top":"-50%","left":"50%","transform":"translateX(-50%)","width":"600px","height":"600px","background":"radial-gradient(circle,rgba(96,165,250,0.1) 0%,transparent 70%)","pointerEvents":"none"}}></div>
 <div className="shell" style={{"position":"relative","zIndex":"1"}}>
 <div className="anim-fade-in visible" style={{"display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center","gap":"18px"}}>
 <div style={{"display":"inline-flex","alignItems":"center","gap":"8px","color":"#4ade80","background":"rgba(74,222,128,0.1)","border":"1px solid rgba(74,222,128,0.2)","padding":"8px 18px","borderRadius":"99px","fontSize":"12px","fontWeight":"700","letterSpacing":"0.8px","textTransform":"uppercase"}}>
 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
 Loved by Udyam Registration directed
 </div>
 <h2 style={{"margin":"0","color":"#fff","fontSize":"32px","fontWeight":"600","letterSpacing":"-0.5px"}}>Govt. of India Recognized MSME</h2>
 <div style={{"marginTop":"4px","fontFamily":"ui-monospace,SFMono-Regular,Consolas,monospace","fontSize":"26px","color":"#93c5fd","letterSpacing":"3px","fontWeight":"800","background":"rgba(96,165,250,0.15)","padding":"16px 32px","borderRadius":"16px","border":"1px solid rgba(96,165,250,0.3)","boxShadow":"0 10px 30px rgba(96,165,250,0.1)"}}>UDYAM-BR-28-0050000</div>
 </div>
 </div>
 </section>
 
 <section style={{"background":"#fff","padding":"100px 0","textAlign":"center","position":"relative","overflow":"hidden","borderBottom":"1px solid #e2e8f0"}}>
 <div style={{"position":"absolute","top":"0","left":"0","width":"100%","height":"4px","background":"linear-gradient(90deg,#FF9933 0%,#FFFFFF 50%,#138808 100%)"}}></div>
 <div className="shell anim-fade-up visible">
 <div style={{"display":"inline-flex","alignItems":"center","justifyContent":"center","width":"80px","height":"80px","borderRadius":"50%","background":"#fff","border":"2px solid #e2e8f0","boxShadow":"0 12px 32px rgba(0,0,0,0.05)","marginBottom":"24px","position":"relative"}}>
 <img src="./home/7924237c22.svg" alt="Flag of India" style={{"width":"40px","borderRadius":"4px","display":"block"}} />
 </div>
 
 <h2 style={{"fontSize":"clamp(32px,5vw,48px)","fontWeight":"800","color":"#0f172a","margin":"0 0 20px","letterSpacing":"-1px"}}>
 Proudly Built in <span style={{"background":"linear-gradient(90deg,#FF9933,#138808)","WebkitBackgroundClip":"text","WebkitTextFillColor":"transparent"}}>India</span>
 </h2>
 
 <p style={{"fontSize":"18px","color":"#475569","maxWidth":"680px","margin":"0 auto 40px","lineHeight":"1.7"}}>
 FamGateway is engineered entirely in India, dedicated to empowering Indian developers and businesses with zero-fee, robust UPI payment infrastructure.
 </p>
 <div style={{"display":"flex","justifyContent":"center","gap":"32px","flexWrap":"wrap"}}>
 <div style={{"textAlign":"center"}}>
 <div style={{"fontSize":"32px","fontWeight":"800","color":"#0f172a","marginBottom":"4px"}}>100%</div>
 <div style={{"fontSize":"14px","fontWeight":"600","color":"#64748b","textTransform":"uppercase","letterSpacing":"1px"}}>Free UPI Gateway</div>
 </div>
 <div style={{"width":"1px","background":"#e2e8f0","alignSelf":"stretch"}}></div>
 <div style={{"textAlign":"center"}}>
 <div style={{"fontSize":"32px","fontWeight":"800","color":"#0f172a","marginBottom":"4px"}}>Zero</div>
 <div style={{"fontSize":"14px","fontWeight":"600","color":"#64748b","textTransform":"uppercase","letterSpacing":"1px"}}>Hidden Charges</div>
 </div>
 <div style={{"width":"1px","background":"#e2e8f0","alignSelf":"stretch"}}></div>
 <div style={{"textAlign":"center"}}>
 <div style={{"fontSize":"32px","fontWeight":"800","color":"#0f172a","marginBottom":"4px"}}>Secure</div>
 <div style={{"fontSize":"14px","fontWeight":"600","color":"#64748b","textTransform":"uppercase","letterSpacing":"1px"}}>Data Privacy</div>
 </div>
 </div>
 </div>
 </section>
 
 <section className="section section-dark" style={{"padding":"100px 0"}}>
 <div className="shell">
 <div style={{"textAlign":"center","maxWidth":"600px","margin":"0 auto 60px"}}>
 <div className="kicker" style={{"marginBottom":"12px","display":"inline-block"}}>Why FamGateway?</div>
 <h2 style={{"fontSize":"clamp(32px,5vw,48px)","marginBottom":"20px","letterSpacing":"-1px"}}>Built for scale, designed for speed.</h2>
 <p className="section-intro" style={{"fontSize":"18px","lineHeight":"1.6","margin":"0 auto"}}>Everything you need to automate FamPay payments, without the headache of banking APIs, KYC, or monthly fees.</p>
 </div>
 
 <div className="anim-stagger visible" style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(250px,1fr))","gap":"32px"}}>
 
 <div style={{"background":"var(--ink-2)","padding":"32px","borderRadius":"24px","border":"1px solid rgba(255,255,255,.1)","transition":"transform 0.3s"}}>
 <div style={{"width":"48px","height":"48px","background":"rgba(59,130,246,0.15)","color":"#60a5fa","borderRadius":"12px","display":"flex","alignItems":"center","justifyContent":"center","marginBottom":"24px"}}>
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
 </div>
 <h3 style={{"fontSize":"20px","color":"var(--white)","marginBottom":"12px","fontWeight":"700"}}>{"Zero KYC & GST"}</h3>
 <p style={{"color":"#afc0b4","lineHeight":"1.6","fontSize":"15px","margin":"0"}}>Start accepting payments instantly. No paperwork, no business registration, and no tax hurdles for freelancers.</p>
 </div>
 
 
 <div style={{"background":"var(--ink-2)","padding":"32px","borderRadius":"24px","border":"1px solid rgba(255,255,255,.1)","transition":"transform 0.3s"}}>
 <div style={{"width":"48px","height":"48px","background":"rgba(34,197,94,0.15)","color":"#4ade80","borderRadius":"12px","display":"flex","alignItems":"center","justifyContent":"center","marginBottom":"24px"}}>
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
 </div>
 <h3 style={{"fontSize":"20px","color":"var(--white)","marginBottom":"12px","fontWeight":"700"}}>Direct Settlements</h3>
 <p style={{"color":"#afc0b4","lineHeight":"1.6","fontSize":"15px","margin":"0"}}>Money doesn't pass through our servers. It goes straight to your personal UPI ID instantly and securely.</p>
 </div>
 
 
 <div style={{"background":"var(--ink-2)","padding":"32px","borderRadius":"24px","border":"1px solid rgba(255,255,255,.1)","transition":"transform 0.3s"}}>
 <div style={{"width":"48px","height":"48px","background":"rgba(244,63,94,0.15)","color":"#fb7185","borderRadius":"12px","display":"flex","alignItems":"center","justifyContent":"center","marginBottom":"24px"}}>
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
 </div>
 <h3 style={{"fontSize":"20px","color":"var(--white)","marginBottom":"12px","fontWeight":"700"}}>100% Free Forever</h3>
 <p style={{"color":"#afc0b4","lineHeight":"1.6","fontSize":"15px","margin":"0"}}>We don't charge any transaction fees or monthly subscriptions. Keep 100% of your hard-earned revenue.</p>
 </div>
 
 
 <div style={{"background":"var(--ink-2)","padding":"32px","borderRadius":"24px","border":"1px solid rgba(255,255,255,.1)","transition":"transform 0.3s"}}>
 <div style={{"width":"48px","height":"48px","background":"rgba(168,85,247,0.15)","color":"#c084fc","borderRadius":"12px","display":"flex","alignItems":"center","justifyContent":"center","marginBottom":"24px"}}>
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
 </div>
 <h3 style={{"fontSize":"20px","color":"var(--white)","marginBottom":"12px","fontWeight":"700"}}>Instant Webhooks</h3>
 <p style={{"color":"#afc0b4","lineHeight":"1.6","fontSize":"15px","margin":"0"}}>Receive real-time HTTP callbacks on your server the moment a payment is verified. Automate digital delivery flawlessly.</p>
 </div>
 </div>
 </div>
 </section>
 
 <section id="compliance" className="section anim-fade-up visible" style={{"background":"#0b1120","padding":"90px 0","borderTop":"1px solid rgba(255,255,255,0.08)","borderBottom":"1px solid rgba(255,255,255,0.08)","position":"relative","overflow":"hidden"}}>
 <div style={{"position":"absolute","top":"-40%","left":"50%","transform":"translateX(-50%)","width":"700px","height":"700px","background":"radial-gradient(circle,rgba(37,99,235,0.09) 0%,transparent 70%)","pointerEvents":"none"}}></div>
 <div className="shell" style={{"position":"relative","zIndex":"1"}}>
 <div style={{"textAlign":"center","maxWidth":"760px","margin":"0 auto 50px"}}>
 <div style={{"display":"inline-flex","alignItems":"center","gap":"8px","background":"rgba(37,99,235,0.12)","color":"#60a5fa","border":"1px solid rgba(37,99,235,0.25)","borderRadius":"99px","padding":"6px 16px","fontSize":"12px","fontWeight":"700","textTransform":"uppercase","letterSpacing":"0.8px","marginBottom":"16px"}}>
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>{"\n Statutory Data Protection & Compliance\n "}</div>
 <h2 style={{"fontSize":"clamp(30px,4vw,42px)","color":"#fff","fontWeight":"800","letterSpacing":"-1px","margin":"0 0 16px"}}>DPDP Act 2023 Compliant Architecture</h2>
 <p style={{"color":"#94a3b8","fontSize":"16px","lineHeight":"1.7","margin":"0"}}>
 FamGateway operates as a statutory Data Fiduciary under India's Digital Personal Data Protection (DPDP) Act, 2023 and the Information Technology Act, 2000. Merchant credential protection is our legal duty and architectural foundation.
 </p>
 </div>
 <div className="anim-stagger visible" style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(280px,1fr))","gap":"24px","marginBottom":"40px"}}>
 
 <div style={{"background":"rgba(15,23,42,0.65)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"20px","padding":"32px","backdropFilter":"blur(10px)","transition":"transform 0.3s"}}>
 <div style={{"width":"44px","height":"44px","background":"rgba(59,130,246,0.15)","color":"#60a5fa","borderRadius":"12px","display":"flex","alignItems":"center","justifyContent":"center","marginBottom":"20px"}}>
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
 </div>
 <h3 style={{"color":"#fff","fontSize":"18px","fontWeight":"700","marginBottom":"10px"}}>Dual-Key AES-256-GCM</h3>
 <p style={{"color":"#94a3b8","fontSize":"14px","lineHeight":"1.65","margin":"0"}}>
 Merchant App Passwords are never stored in plaintext. They are encrypted at rest with dedicated initialization vectors and isolated master keys separated from database dumps.
 </p>
 </div>
 
 <div style={{"background":"rgba(15,23,42,0.65)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"20px","padding":"32px","backdropFilter":"blur(10px)","transition":"transform 0.3s"}}>
 <div style={{"width":"44px","height":"44px","background":"rgba(34,197,94,0.15)","color":"#4ade80","borderRadius":"12px","display":"flex","alignItems":"center","justifyContent":"center","marginBottom":"20px"}}>
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
 </div>
 <h3 style={{"color":"#fff","fontSize":"18px","fontWeight":"700","marginBottom":"10px"}}>Stateless RAM-Only Parsing</h3>
 <p style={{"color":"#94a3b8","fontSize":"14px","lineHeight":"1.65","margin":"0"}}>
 Payment notifications are queried via scoped RFC 3501 filters (<code style={{"color":"#cbd5e1","fontFamily":"monospace","fontSize":"12px"}}>FROM "no-reply@famapp.in"</code>), verified in volatile RAM for under 5ms, and purged immediately. Zero disk logs.
 </p>
 </div>
 
 <div style={{"background":"rgba(15,23,42,0.65)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"20px","padding":"32px","backdropFilter":"blur(10px)","transition":"transform 0.3s"}}>
 <div style={{"width":"44px","height":"44px","background":"rgba(168,85,247,0.15)","color":"#c084fc","borderRadius":"12px","display":"flex","alignItems":"center","justifyContent":"center","marginBottom":"20px"}}>
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
 </div>
 <h3 style={{"color":"#fff","fontSize":"18px","fontWeight":"700","marginBottom":"10px"}}>Statutory Data Fiduciary</h3>
 <p style={{"color":"#94a3b8","fontSize":"14px","lineHeight":"1.65","margin":"0"}}>
 Direct compliance with Section 8 of DPDP Act 2023, guaranteed merchant revocation rights without platform permission, and absolute zero third-party commercial data sharing.
 </p>
 </div>
 </div>
 <div style={{"textAlign":"center"}}>
 <a href="https://famgateway.in/blog/famgateway-dpdp-act-2023-data-security-compliance-payment-gateway-india.php" style={{"display":"inline-flex","alignItems":"center","gap":"10px","background":"rgba(37,99,235,0.15)","border":"1px solid rgba(37,99,235,0.35)","color":"#93c5fd","padding":"14px 28px","borderRadius":"12px","fontWeight":"700","fontSize":"14px","textDecoration":"none","transition":"all 0.2s"}}>
 <span>{"Read DPDP Act 2023 Compliance & Credential Protection Architecture"}</span>
 <span style={{"fontSize":"16px"}}>→</span>
 </a>
 </div>
 </div>
 </section>
 
 <section id="status" className="section section-dark" style={{"padding":"80px 0","borderTop":"1px solid rgba(255,255,255,0.05)","borderBottom":"1px solid rgba(255,255,255,0.05)"}}>
 <div className="shell">
 <div className="anim-fade-up visible" style={{"background":"linear-gradient(135deg,var(--ink-2),rgba(15,23,42,0.85))","borderRadius":"24px","padding":"48px 40px","border":"1px solid rgba(255,255,255,0.08)","display":"flex","flexWrap":"wrap","alignItems":"center","justifyContent":"space-between","gap":"32px","boxShadow":"0 20px 40px rgba(0,0,0,0.25)"}}>
 
 <div style={{"flex":"1 1 450px"}}>
 <div style={{"display":"inline-flex","alignItems":"center","gap":"8px","background":"rgba(74,222,128,0.1)","color":"#4ade80","borderRadius":"99px","padding":"6px 14px","fontSize":"12px","fontWeight":"700","letterSpacing":"0.5px","textTransform":"uppercase","marginBottom":"16px","border":"1px solid rgba(74,222,128,0.2)"}}>
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
 100% Transparency
 </div>
 <h2 style={{"fontSize":"clamp(28px,4vw,38px)","marginBottom":"12px","letterSpacing":"-1px","color":"#fff","fontWeight":"800"}}>Live System Status</h2>
 <p style={{"fontSize":"15px","color":"#94a3b8","margin":"0 0 24px","lineHeight":"1.6","maxWidth":"540px"}}>We believe in absolute transparency. Monitor our API, SMTP parsers, and website uptime in real-time on our dedicated public status page backed by independent monitoring.</p>
 <div>
 <a href="https://famgateway.in/status.php" style={{"display":"inline-flex","alignItems":"center","gap":"10px","background":"#2563eb","color":"#fff","padding":"14px 28px","borderRadius":"12px","fontWeight":"700","fontSize":"15px","textDecoration":"none","boxShadow":"0 10px 25px rgba(37,99,235,0.3)","transition":"transform 0.2s,box-shadow 0.2s"}}>
 View Detailed Status →
 </a>
 </div>
 </div>
 
 <div style={{"flex":"1 1 300px","display":"flex","flexDirection":"column","gap":"12px"}}>
 <div style={{"background":"rgba(255,255,255,0.04)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"14px","padding":"16px 20px","display":"flex","alignItems":"center","justifyContent":"space-between"}}>
 <span style={{"color":"#e2e8f0","fontWeight":"600","fontSize":"14px"}}>API Endpoint Gateway</span>
 <span style={{"color":"#4ade80","fontWeight":"700","fontSize":"13px","display":"flex","alignItems":"center","gap":"6px"}}><span style={{"width":"8px","height":"8px","background":"#4ade80","borderRadius":"50%","display":"inline-block"}}></span> Operational</span>
 </div>
 <div style={{"background":"rgba(255,255,255,0.04)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"14px","padding":"16px 20px","display":"flex","alignItems":"center","justifyContent":"space-between"}}>
 <span style={{"color":"#e2e8f0","fontWeight":"600","fontSize":"14px"}}>IMAP Receipt Parser</span>
 <span style={{"color":"#4ade80","fontWeight":"700","fontSize":"13px","display":"flex","alignItems":"center","gap":"6px"}}><span style={{"width":"8px","height":"8px","background":"#4ade80","borderRadius":"50%","display":"inline-block"}}></span> Operational</span>
 </div>
 <div style={{"background":"rgba(255,255,255,0.04)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"14px","padding":"16px 20px","display":"flex","alignItems":"center","justifyContent":"space-between"}}>
 <span style={{"color":"#e2e8f0","fontWeight":"600","fontSize":"14px"}}>Historical Uptime SLA</span>
 <span style={{"color":"#60a5fa","fontWeight":"800","fontSize":"14px"}}>99.98%</span>
 </div>
 </div>
 </div>
 </div>
 </section>
 
 <section style={{"background":"#f8fafc","padding":"80px 0","borderBottom":"1px solid #e2e8f0","position":"relative","overflow":"hidden"}}>
 <div style={{"position":"absolute","top":"50%","left":"50%","transform":"translate(-50%,-50%)","width":"800px","height":"800px","background":"radial-gradient(circle,rgba(37,99,235,0.05) 0%,transparent 60%)","pointerEvents":"none"}}></div>
 <div className="shell anim-fade-up visible" style={{"position":"relative","zIndex":"1","maxWidth":"900px","margin":"0 auto"}}>
 <div style={{"background":"#fff","borderRadius":"24px","padding":"48px","display":"flex","alignItems":"center","gap":"48px","border":"1px solid rgba(226,232,240,0.8)","boxShadow":"0 20px 40px rgba(15,23,42,0.04)","flexWrap":"wrap"}}>
 
 <div style={{"position":"relative","flexShrink":"0","margin":"0 auto"}}>
 <div style={{"position":"absolute","inset":"-8px","borderRadius":"50%","background":"linear-gradient(135deg,#3b82f6,#8b5cf6)","opacity":"0.2","filter":"blur(12px)"}}></div>
 <img src="./home/cc15968d40.png" alt="Aryan Gupta (Aryanispe)" style={{"position":"relative","width":"160px","height":"160px","borderRadius":"50%","objectFit":"cover","border":"4px solid #fff","boxShadow":"0 12px 32px rgba(15,23,42,0.12)"}} />
 <div style={{"position":"absolute","bottom":"8px","right":"8px","width":"28px","height":"28px","background":"#10b981","border":"4px solid #fff","borderRadius":"50%","boxShadow":"0 4px 12px rgba(16,185,129,0.3)","zIndex":"2"}}></div>
 </div>
 
 <div style={{"flex":"1 1 300px","textAlign":"left"}}>
 <div className="kicker" style={{"display":"inline-flex","alignItems":"center","gap":"8px","color":"#2563eb","fontWeight":"700","textTransform":"uppercase","letterSpacing":"1px","fontSize":"12px","marginBottom":"16px","background":"rgba(37,99,235,0.08)","padding":"6px 12px","borderRadius":"99px"}}>
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
 Verified Official Developer
 </div>
 <h2 style={{"fontSize":"clamp(28px,4vw,36px)","color":"#0f172a","margin":"0 0 12px","letterSpacing":"-1px","fontWeight":"800"}}>Aryan Gupta <span style={{"color":"#64748b","fontWeight":"500"}}>(Aryanispe)</span></h2>
 <p style={{"fontSize":"16px","color":"#475569","margin":"0 0 24px","lineHeight":"1.7"}}>FamGateway is exclusively built, maintained, and operated by Aryan Gupta, widely known as <strong>Aryanispe</strong>. By providing a 100% free API infrastructure, Aryanispe empowers developers to automate their UPI flows flawlessly.</p>
 <div style={{"display":"flex","gap":"16px","flexWrap":"wrap"}}>
 <a href="https://famgateway.in/blog/who-is-the-official-developer-of-famgateway.php" style={{"display":"inline-flex","alignItems":"center","gap":"8px","background":"#0f172a","color":"#fff","padding":"14px 28px","borderRadius":"12px","fontWeight":"700","fontSize":"14px","textDecoration":"none","boxShadow":"0 8px 20px rgba(15,23,42,0.2)","transition":"transform 0.2s,box-shadow 0.2s"}}>Read the Full Story →</a>
 <a href="https://wa.me/919771348544?text=Hello%20Aryan%2C%20I%20came%20from%20your%20FamGateway%20website." target="_blank" rel="noopener noreferrer" style={{"display":"inline-flex","alignItems":"center","gap":"8px","background":"rgba(15,23,42,0.05)","color":"#0f172a","padding":"14px 28px","borderRadius":"12px","fontWeight":"700","fontSize":"14px","textDecoration":"none","transition":"background 0.2s"}}>
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
 Contact Directly
 </a>
 </div>
 </div>
 
 </div>
 </div>
 </section>
 
 <section style={{"background":"linear-gradient(135deg,#0b1120 0%,#0f172a 50%,#1e293b 100%)","padding":"100px 0","borderTop":"1px solid rgba(255,255,255,0.08)","position":"relative","overflow":"hidden"}}>
 <div style={{"position":"absolute","top":"-30%","left":"50%","transform":"translateX(-50%)","width":"700px","height":"700px","background":"radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 70%)","pointerEvents":"none"}}></div>
 <div className="shell" style={{"display":"flex","flexWrap":"wrap","alignItems":"center","gap":"60px","justifyContent":"space-between","position":"relative","zIndex":"1"}}>
 <div className="anim-slide-left visible" style={{"flex":"1 1 400px","minWidth":"300px"}}>
 <div style={{"display":"inline-flex","alignItems":"center","gap":"8px","background":"rgba(37,99,235,0.15)","border":"1px solid rgba(37,99,235,0.3)","borderRadius":"999px","padding":"7px 16px","fontSize":"12px","fontWeight":"700","letterSpacing":".8px","textTransform":"uppercase","color":"#60a5fa","marginBottom":"24px"}}>
 <svg style={{"width":"13px","height":"13px"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
 </svg> Get started in minutes
 </div>
 <h2 style={{"color":"#ffffff","fontSize":"clamp(36px,5vw,56px)","letterSpacing":"-2px","margin":"0 0 20px","lineHeight":"1.1","fontWeight":"800"}}>Ready to accept <br />UPI payments?</h2>
 <p style={{"color":"#94a3b8","fontSize":"16px","maxWidth":"440px","margin":"0 0 36px","lineHeight":"1.7"}}>Create an account, generate an API key, and make your first payment link in minutes. No complex banking integration or KYC needed.</p>
 <div style={{"display":"flex","gap":"14px","flexWrap":"wrap"}}>
 <a href="#/register" style={{"display":"inline-flex","alignItems":"center","gap":"8px","background":"#2563eb","color":"#fff","padding":"16px 36px","borderRadius":"12px","fontWeight":"700","fontSize":"15px","textDecoration":"none","boxShadow":"0 10px 28px rgba(37,99,235,0.35)","transition":"transform 0.2s ease,box-shadow 0.2s ease"}}>Get your API key →</a>
 <a href="https://famgateway.in/docs.php" style={{"display":"inline-flex","alignItems":"center","gap":"8px","background":"rgba(255,255,255,0.08)","border":"1px solid rgba(255,255,255,0.12)","color":"#e2e8f0","padding":"16px 28px","borderRadius":"12px","fontWeight":"700","fontSize":"15px","textDecoration":"none","transition":"background 0.2s ease"}}>Read docs</a>
 </div>
 <div style={{"display":"flex","gap":"20px","marginTop":"32px","flexWrap":"wrap"}}>
 <span style={{"display":"flex","alignItems":"center","gap":"7px","fontSize":"13px","fontWeight":"600","color":"#4ade80"}}>✓ 100% Free Forever</span>
 <span style={{"display":"flex","alignItems":"center","gap":"7px","fontSize":"13px","fontWeight":"600","color":"#4ade80"}}>✓ 0% Transaction Fees</span>
 <span style={{"display":"flex","alignItems":"center","gap":"7px","fontSize":"13px","fontWeight":"600","color":"#4ade80"}}>✓ Unlimited API Calls</span>
 </div>
 </div>
 <div className="cta-closing-metrics anim-stagger visible" style={{"flex":"1 1 450px","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(200px,1fr))","gap":"16px"}}>
 <div style={{"background":"rgba(15,23,42,0.6)","backdropFilter":"blur(12px)","borderRadius":"20px","padding":"28px 24px","border":"1px solid rgba(255,255,255,0.08)","transition":"transform 0.3s ease"}}>
 <div className="cta-counter" data-target="2" style={{"fontSize":"38px","fontWeight":"800","letterSpacing":"-1.5px","color":"#ffffff"}}>2</div>
 <div style={{"fontSize":"13px","fontWeight":"600","color":"#94a3b8","marginTop":"8px","lineHeight":"1.4"}}>API calls to complete a payment</div>
 </div>
 <div style={{"background":"rgba(15,23,42,0.6)","backdropFilter":"blur(12px)","borderRadius":"20px","padding":"28px 24px","border":"1px solid rgba(255,255,255,0.08)","transition":"transform 0.3s ease"}}>
 <div className="cta-counter" data-target="99" data-suffix="%" style={{"fontSize":"38px","fontWeight":"800","letterSpacing":"-1.5px","color":"#ffffff"}}>99%</div>
 <div style={{"fontSize":"13px","fontWeight":"600","color":"#94a3b8","marginTop":"8px","lineHeight":"1.4"}}>Uptime across all endpoints</div>
 </div>
 <div style={{"background":"rgba(15,23,42,0.6)","backdropFilter":"blur(12px)","borderRadius":"20px","padding":"28px 24px","border":"1px solid rgba(255,255,255,0.08)","transition":"transform 0.3s ease"}}>
 <div style={{"fontSize":"38px","fontWeight":"800","letterSpacing":"-1.5px","color":"#38bdf8"}}>{"<5s"}</div>
 <div style={{"fontSize":"13px","fontWeight":"600","color":"#94a3b8","marginTop":"8px","lineHeight":"1.4"}}>Average payment confirmation</div>
 </div>
 <div style={{"background":"rgba(37,99,235,0.15)","borderRadius":"20px","padding":"28px 24px","border":"1px solid rgba(37,99,235,0.3)","transition":"transform 0.3s ease"}}>
 <div style={{"fontSize":"38px","fontWeight":"800","letterSpacing":"-1.5px","color":"#60a5fa"}}>UPI</div>
 <div style={{"fontSize":"13px","fontWeight":"600","color":"#cbd5e1","marginTop":"8px","lineHeight":"1.4"}}>Direct UPI payments</div>
 </div>
 </div>
 </div>
 </section>
 </main>
 <footer style={{"background":"#0b1120","color":"#94a3b8","padding":"64px 0 32px","fontSize":"14px","borderTop":"1px solid rgba(255,255,255,0.08)"}}>
 <div className="shell">
 <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(200px,1fr))","gap":"40px","marginBottom":"40px"}}>
 
 <div style={{"maxWidth":"360px"}}>
 <a className="brand" href="#/about" style={{"padding":"0","marginBottom":"16px","display":"inline-block"}}><img src="./home/351187665b.png" alt="FamGateway" style={{"height":"28px","width":"auto","display":"block","objectFit":"contain"}} /></a>
 <p style={{"margin":"0 0 18px","lineHeight":"1.6","fontSize":"14px","color":"#94a3b8"}}>{"Automated peer-to-peer UPI payment verification & webhook gateway for developers with zero transaction fees."}</p>
 <div style={{"display":"flex","alignItems":"center","gap":"10px","flexWrap":"wrap"}}>
 <a href="https://famgateway.in/status.php" style={{"display":"inline-flex","alignItems":"center","gap":"8px","background":"rgba(74,222,128,0.08)","border":"1px solid rgba(74,222,128,0.2)","padding":"6px 14px","borderRadius":"99px","fontSize":"12px","color":"#4ade80","fontWeight":"600","textDecoration":"none","transition":"all 0.2s"}}>
 <span style={{"width":"7px","height":"7px","background":"#4ade80","borderRadius":"50%","display":"inline-block","boxShadow":"0 0 8px #4ade80"}}></span> All Systems Operational
 </a>
 <button id="indexGooglePreferredBtn" type="button" style={{"display":"inline-flex","alignItems":"center","gap":"7px","background":"rgba(255,255,255,0.06)","border":"1px solid rgba(255,255,255,0.12)","padding":"6px 14px","borderRadius":"99px","fontSize":"12px","color":"#e2e8f0","fontWeight":"600","cursor":"pointer","fontFamily":"inherit","transition":"all 0.2s"}}>
 <svg viewBox="0 0 24 24" width="14" height="14" style={{"display":"block","flexShrink":"0"}}>
 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"></path>
 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"></path>
 </svg>
 <span>Add to Preferred Sources</span>
 </button>
 <a href="https://famgateway.in/blog/famgateway-dpdp-act-2023-data-security-compliance-payment-gateway-india.php" style={{"display":"inline-flex","alignItems":"center","gap":"6px","background":"rgba(59,130,246,0.08)","border":"1px solid rgba(59,130,246,0.25)","padding":"6px 14px","borderRadius":"99px","fontSize":"12px","color":"#93c5fd","fontWeight":"600","textDecoration":"none","transition":"all 0.2s"}}>
 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
 <span>DPDP Act 2023 Compliant</span>
 </a>
 </div>
 </div>
 
 <div>
 <h3 style={{"color":"#fff","fontSize":"16px","margin":"0 0 20px","fontWeight":"700","letterSpacing":"-0.2px"}}>Resources</h3>
 <div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>
 <a href="https://famgateway.in/docs.php" style={{"color":"#94a3b8","textDecoration":"none","transition":"color 0.2s"}}>API Documentation</a>
 <a href="https://famgateway.in/blog/how-it-works.php" style={{"color":"#94a3b8","textDecoration":"none","transition":"color 0.2s"}}>{"Architecture & Webhooks"}</a>
 <a href="https://famgateway.in/blog/preventing-double-payments.php" style={{"color":"#94a3b8","textDecoration":"none","transition":"color 0.2s"}}>Handling Collisions</a>
 <a href="https://famgateway.in/blog/how-famgateway-prevents-fake-upi-payments-and-email-spoofing.php" style={{"color":"#94a3b8","textDecoration":"none","transition":"color 0.2s"}}>{"Security & Anti-Fraud"}</a>
 </div>
 </div>
 
 <div>
 <h3 style={{"color":"#fff","fontSize":"16px","margin":"0 0 20px","fontWeight":"700","letterSpacing":"-0.2px"}}>Ecosystem</h3>
 <div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>
 <a href="https://aryanispehost.in/" target="_blank" rel="noopener noreferrer" style={{"color":"#94a3b8","textDecoration":"none","transition":"color 0.2s"}}>Aryanispe Host (Web Hosting)</a>
 <a href="https://github.com/aryanispe" target="_blank" rel="noopener noreferrer" style={{"color":"#94a3b8","textDecoration":"none","transition":"color 0.2s"}}>GitHub Open Source</a>
 </div>
 </div>
 
 <div>
 <h3 style={{"color":"#fff","fontSize":"16px","margin":"0 0 20px","fontWeight":"700","letterSpacing":"-0.2px"}}>{"Legal & Blog"}</h3>
 <div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>
 <a href="https://famgateway.in/blog/index.php" style={{"color":"#60a5fa","textDecoration":"none","transition":"color 0.2s"}}>Blog Hub</a>
 <a href="https://famgateway.in/blog/famgateway-dpdp-act-2023-data-security-compliance-payment-gateway-india.php" style={{"color":"#93c5fd","textDecoration":"none","fontWeight":"600","transition":"color 0.2s"}}>DPDP Act Compliance</a>
 <a href="https://famgateway.in/terms.php" style={{"color":"#94a3b8","textDecoration":"none","transition":"color 0.2s"}}>Terms of Service</a>
 <a href="https://famgateway.in/privacy.php" style={{"color":"#94a3b8","textDecoration":"none","transition":"color 0.2s"}}>Privacy Policy</a>
 <a href="https://famgateway.in/blog/beware-of-fake-famgateway-scams-online.php" style={{"color":"#ef4444","textDecoration":"none","fontWeight":"500"}}>Scam Warning</a>
 </div>
 </div>
 
 <div>
 <h3 style={{"color":"#fff","fontSize":"16px","margin":"0 0 20px","fontWeight":"700","letterSpacing":"-0.2px"}}>{"Contact & Community"}</h3>
 <div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>
 <a href="https://wa.me/919771348544?text=Hello%2C%20I%20came%20from%20your%20FamGateway%20website%2C%20and%20I%20need%20support." target="_blank" rel="noopener noreferrer" style={{"color":"#4ade80","textDecoration":"none","fontWeight":"600"}}>WhatsApp Support</a>
 <a href="https://t.me/aryanispe_related" target="_blank" rel="noopener noreferrer" style={{"color":"#60a5fa","textDecoration":"none","fontWeight":"600"}}>Telegram (3k+ Devs)</a>
 <a href="https://www.youtube.com/@aryanispe" target="_blank" rel="noopener noreferrer" style={{"color":"#ff4b4b","textDecoration":"none","fontWeight":"600"}}>YouTube (1.39k+ Devs)</a>
 <div style={{"display":"flex","gap":"12px","marginTop":"8px"}}>
 <a href="http://www.linkedin.com/in/aryanispe" target="_blank" aria-label="LinkedIn" style={{"display":"inline-flex","alignItems":"center","justifyContent":"center","width":"38px","height":"38px","borderRadius":"10px","background":"rgba(255,255,255,0.06)","color":"#94a3b8","border":"1px solid rgba(255,255,255,0.1)","transition":"all 0.2s"}} rel="noopener noreferrer"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
 <a href="https://x.com/aryanispe" target="_blank" aria-label="X/Twitter" style={{"display":"inline-flex","alignItems":"center","justifyContent":"center","width":"38px","height":"38px","borderRadius":"10px","background":"rgba(255,255,255,0.06)","color":"#94a3b8","border":"1px solid rgba(255,255,255,0.1)","transition":"all 0.2s"}} rel="noopener noreferrer"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg></a>
 <a href="https://www.instagram.com/aryanispe/" target="_blank" aria-label="Instagram" style={{"display":"inline-flex","alignItems":"center","justifyContent":"center","width":"38px","height":"38px","borderRadius":"10px","background":"rgba(255,255,255,0.06)","color":"#94a3b8","border":"1px solid rgba(255,255,255,0.1)","transition":"all 0.2s"}} rel="noopener noreferrer"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
 </div>
 </div>
 </div>
 </div>
 
 <div style={{"borderTop":"1px solid rgba(255,255,255,0.08)","paddingTop":"24px","marginTop":"28px","fontSize":"13px","lineHeight":"1.6"}}>
 <div style={{"display":"flex","flexWrap":"wrap","justifyContent":"space-between","alignItems":"center","gap":"16px","marginBottom":"14px"}}>
 <p style={{"margin":"0","color":"#cbd5e1","fontSize":"13px"}}>© 2026 FamGateway. Built with ❤️ by <a href="https://aryanispehost.in/" target="_blank" style={{"color":"#60a5fa","textDecoration":"none","fontWeight":"600"}} rel="noopener noreferrer">Aryan Gupta (Aryanispe)</a>. All rights reserved.</p>
 <span style={{"fontSize":"12px","color":"#94a3b8"}}>MSME: <code style={{"color":"#cbd5e1","fontFamily":"inherit","background":"rgba(255,255,255,0.06)","padding":"2px 6px","borderRadius":"4px"}}>UDYAM-BR-28-0050000</code> • <a href="https://famgateway.in/blog/famgateway-dpdp-act-2023-data-security-compliance-payment-gateway-india.php" style={{"color":"#93c5fd","textDecoration":"none","fontWeight":"600"}}>DPDP Act 2023 Compliant</a> • Govt. of India</span>
 </div>
 <div style={{"background":"rgba(255,255,255,0.025)","border":"1px solid rgba(255,255,255,0.07)","borderRadius":"8px","padding":"12px 16px","marginTop":"10px"}}>
 <p style={{"margin":"0","fontSize":"12.5px","color":"#94a3b8","lineHeight":"1.7"}}>
 <strong style={{"color":"#f1f5f9"}}>Disclaimer:</strong> FamGateway is an independent developer automation utility operated by <strong>ARYANISPE</strong> (Govt. of India Recognized MSME). Operated under the statutory Data Fiduciary compliance framework of the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and Section 43A / 72A of the <strong>Information Technology Act, 2000</strong>. FamGateway is <strong>not</strong> affiliated with, authorized, maintained, sponsored, or endorsed by <strong>Tri O Tech Solutions Private Limited</strong>, <strong>FamApp</strong>, or <strong>FamPay</strong>. All product names, logos, brands, and registered trademarks belong to their respective owners.
 </p>
 </div>
 </div>
 </div>
 </footer>
 
 <a href="#" className="back-to-top visible" aria-label="Back to top"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 19V5M5 12l7-7 7 7"></path>
 </svg></a>
    </div>
  );
}
