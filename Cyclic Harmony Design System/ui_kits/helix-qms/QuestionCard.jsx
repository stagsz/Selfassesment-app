/* global React */
const { useState: useStateQ } = React;

window.HQ = window.HQ || {};

window.HQ.QuestionCard = function QuestionCard({ q, value, onScore, onJustify, justification }) {
  const Icon = window.HQ.Icon;
  const def = window.HQ.SCORE_DEFS.find(d => d.v === value);
  const requiresJustification = value === 1 || value === 'NA';

  return (
    <div style={{
      background: '#fff', border: '1px solid #ececea', borderRadius: 16,
      borderLeft: value ? `4px solid ${def.solid}` : '4px solid #d8d8d0',
      padding: '22px 24px', marginBottom: 16,
    }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:14,marginBottom:14}}>
        <div style={{flex:1}}>
          <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8,flexWrap:'wrap'}}>
            <span style={{display:'inline-flex',alignItems:'center',padding:'2px 10px',borderRadius:9999,background:'#e6ede4',color:'#384b32',font:'600 11px Inter, sans-serif'}}>{q.ref}</span>
            <span style={{font:'400 11px Inter, sans-serif',color:'#7a7a70'}}>ISO 9001:2015 §{q.section}</span>
          </div>
          <p style={{font:'500 15.5px Inter, sans-serif',color:'#0f172a',lineHeight:1.5,margin:0}}>{q.text}</p>
        </div>
        {value && (
          <span style={{
            padding:'5px 12px',borderRadius:12,background:def.bg,color:def.color,
            border:`1.5px solid ${def.border}`,font:'600 12px Inter, sans-serif',whiteSpace:'nowrap'
          }}>{def.sub}</span>
        )}
      </div>

      <window.HQ.ScoreButtons value={value} onChange={onScore} />

      {q.guidance && (
        <div style={{display:'flex',gap:10,background:'rgba(239,246,255,.6)',border:'1px solid #dbeafe',borderRadius:12,padding:'12px 14px',marginTop:14}}>
          <div style={{color:'#3b82f6',flexShrink:0,marginTop:1}}><Icon name="info" size={15} /></div>
          <div>
            <div style={{font:'600 11px Inter, sans-serif',color:'#1d4ed8',textTransform:'uppercase',letterSpacing:'.05em',marginBottom:3}}>Auditor Guidance</div>
            <div style={{font:'400 13px Inter, sans-serif',color:'#1e40af',lineHeight:1.55}}>{q.guidance}</div>
          </div>
        </div>
      )}

      {requiresJustification && (
        <div style={{marginTop:14}}>
          <label style={{font:'500 12px Inter, sans-serif',color:'#475569',display:'flex',alignItems:'center',gap:6,marginBottom:6}}>
            Justification <span style={{color:'#dc2626',fontWeight:600,fontSize:11}}>(Required)</span>
          </label>
          <textarea
            value={justification || ''}
            onChange={(e) => onJustify(e.target.value)}
            placeholder="Document why this control is not in place or applicable…"
            style={{width:'100%',minHeight:72,padding:'10px 14px',border:'1px solid #ddddd9',borderRadius:12,font:'400 13.5px Inter, sans-serif',outline:'none',resize:'vertical',boxSizing:'border-box',background:'rgba(255,247,237,.3)'}}
          />
        </div>
      )}

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:14,gap:10}}>
        <div style={{display:'flex',gap:8}}>
          <window.HQ.Button variant="ghost" size="sm" icon="upload">Add Evidence</window.HQ.Button>
          <window.HQ.Button variant="ghost" size="sm" icon="alert">Flag NCR</window.HQ.Button>
        </div>
        <div style={{font:'400 11px Inter, sans-serif',color:'#94a3b8'}}>{q.evidenceCount || 0} evidence files attached</div>
      </div>
    </div>
  );
};
