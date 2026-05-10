/* global React */
window.HQ = window.HQ || {};

const SCORE_DEFS = [
  { v: 'NA', label: 'N/A', sub: 'Not applicable', bg: '#f3f4f6', border: '#d1d5db', color: '#4b5563', solid: '#6b7280' },
  { v: 1, label: '1', sub: 'Non-Compliant', bg: '#fef2f2', border: '#fecaca', color: '#b91c1c', solid: '#dc2626' },
  { v: 2, label: '2', sub: 'Initial', bg: '#fff7ed', border: '#fed7aa', color: '#c2410c', solid: '#ea580c' },
  { v: 3, label: '3', sub: 'Developing', bg: '#fefce8', border: '#fde68a', color: '#a16207', solid: '#ca8a04' },
  { v: 4, label: '4', sub: 'Established', bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', solid: '#16a34a' },
  { v: 5, label: '5', sub: 'Optimizing', bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8', solid: '#2563eb' },
];

window.HQ.SCORE_DEFS = SCORE_DEFS;

window.HQ.ScoreButtons = function ScoreButtons({ value, onChange }) {
  return (
    <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
      {SCORE_DEFS.map(d => {
        const isActive = value === d.v;
        return (
          <button key={d.v} onClick={() => onChange(d.v)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            width: 92, height: 92, borderRadius: 14,
            background: isActive ? d.solid : d.bg,
            border: `2px solid ${isActive ? d.solid : d.border}`,
            color: isActive ? '#fff' : d.color,
            font: '700 22px Poppins, sans-serif',
            cursor: 'pointer', transition: 'all .15s', gap: 2,
            boxShadow: isActive ? `0 0 0 3px ${d.bg}, 0 4px 16px -4px ${d.solid}66` : 'none',
          }}>
            {d.label}
            <span style={{font:'500 10px Inter, sans-serif',opacity:.95,letterSpacing:'.02em'}}>{d.sub}</span>
          </button>
        );
      })}
    </div>
  );
};

window.HQ.StatCard = function StatCard({ label, value, unit, sub, trend, icon, tone='neutral' }) {
  const Icon = window.HQ.Icon;
  const tones = {
    neutral: { iconBg: '#f5f5f3', iconFg: '#557349' },
    sage: { iconBg: '#e6ede4', iconFg: '#384b32' },
    warning: { iconBg: '#fef3c7', iconFg: '#b45309' },
    danger: { iconBg: '#fef2f2', iconFg: '#dc2626' },
    info: { iconBg: '#dbeafe', iconFg: '#1d4ed8' },
  };
  const t = tones[tone];
  return (
    <div style={{background:'#fff',border:'1px solid #ececea',borderRadius:16,padding:'18px 22px',display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:14}}>
      <div style={{minWidth:0}}>
        <div style={{font:'500 13px Inter, sans-serif',color:'#7a7a70',marginBottom:8}}>{label}</div>
        <div style={{display:'flex',alignItems:'baseline',gap:8,flexWrap:'wrap'}}>
          <span style={{font:'700 30px Poppins, sans-serif',color:'#0f172a',lineHeight:1,letterSpacing:'-.02em'}}>{value}{unit && <span style={{color:'#7a7a70',fontSize:18,fontWeight:600,marginLeft:2}}>{unit}</span>}</span>
          {trend && (
            <span style={{display:'inline-flex',alignItems:'center',gap:2,color:trend.startsWith('-')?'#dc2626':'#16a34a',font:'500 13px Inter'}}>{trend.startsWith('-')?'↓':'↑'} {trend.replace('-','')}</span>
          )}
        </div>
        {sub && <div style={{font:'400 12px Inter, sans-serif',color:'#7a7a70',marginTop:8}}>{sub}</div>}
      </div>
      {icon && <div style={{padding:10,borderRadius:12,background:t.iconBg,color:t.iconFg,flexShrink:0}}><Icon name={icon} size={20} /></div>}
    </div>
  );
};
