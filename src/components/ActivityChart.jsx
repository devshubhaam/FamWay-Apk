import { useState } from 'react';
import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity } from 'lucide-react';
export default function ActivityChart({ data, days, onDays }) {
  const [rev, setRev] = useState(true); const [req, setReq] = useState(true);
  return (<div className="card dash-anim-up is-visible">
    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
      <div><div className="card-title"><Activity size={16} /> Activity — Last {days} Days</div><div className="card-sub">API requests and revenue over time</div></div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <div><button className={'chart-toggle-btn' + (rev ? ' active' : '')} onClick={() => setRev(!rev)}><span className="dot rev-dot" /> Revenue</button>
          <button className={'chart-toggle-btn' + (req ? ' active' : '')} onClick={() => setReq(!req)}><span className="dot req-dot" /> Requests</button></div>
        <div className="chart-time-pills">{[7, 15, 30].map(d => <button key={d} className={'time-pill' + (d === days ? ' active' : '')} onClick={() => onDays(d)}>{d}D</button>)}</div>
      </div></div>
    <div className="chart-wrapper"><ResponsiveContainer width="100%" height="100%"><ComposedChart data={data}>
      <CartesianGrid stroke="#e2e8f0" vertical={false} /><XAxis dataKey="date" tick={{ fontSize: 11 }} /><YAxis yAxisId="l" tick={{ fontSize: 11 }} width={40} /><YAxis yAxisId="r" orientation="right" hide />
      <Tooltip />{rev && <Area yAxisId="l" dataKey="revenue" stroke="#10b981" fill="#10b98122" />}{req && <Line yAxisId="r" dataKey="requests" stroke="#2563eb" dot={false} />}
    </ComposedChart></ResponsiveContainer></div></div>);
}
