/* global React */
window.HQ = window.HQ || {};

// Crowned card with elliptical color crown — exact pattern from frontend/src/components/cyclic-harmony/CrownedCard.tsx
window.HQ.CrownedCard = function CrownedCard({ status='pending', children, width=240, onClick, selected }) {
  const crowns = {
    pending:    'linear-gradient(180deg, #A8C499 0%, #8BAA7E 50%, #5C7C52 100%)',
    inProgress: 'linear-gradient(180deg, #8BAA7E 0%, #5C7C52 50%, #3D5A3A 100%)',
    active:     'linear-gradient(180deg, #5C7C52 0%, #3D5A3A 100%)',
    completed:  '#3D5A3A',
  };
  return (
    <div onClick={onClick} style={{
      position:'relative', background:'#fff', borderRadius:24,
      boxShadow: selected
        ? '0 0 0 3px #8baa7e55, 0 12px 30px -10px rgba(85,115,73,.45)'
        : '0 8px 22px -8px rgba(15,42,58,.18), 0 2px 4px rgba(15,42,58,.06)',
      width, overflow:'visible', cursor: onClick ? 'pointer':'default', transition:'all .2s'
    }}>
      <div style={{position:'relative',width:'100%',paddingTop:'45%',overflow:'hidden',borderRadius:'24px 24px 0 0'}}>
        <div style={{position:'absolute',inset:0,background:crowns[status],clipPath:'ellipse(50% 100% at 50% 0%)'}} />
      </div>
      {status === 'completed' && (
        <div style={{position:'absolute',top:10,right:10,width:24,height:24,background:'#3D5A3A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',boxShadow:'0 2px 6px rgba(0,0,0,.18)'}}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
        </div>
      )}
      <div style={{padding:'18px 22px 20px',textAlign:'center'}}>{children}</div>
    </div>
  );
};

// Process flow with 7 ISO stages and dotted-arc connectors
window.HQ.ProcessFlow = function ProcessFlow({ activeIndex = 1, completed = [0], onSelect }) {
  const Icon = window.HQ.Icon;
  const stages = [
    { num: '04', title: 'Context', icon: 'context' },
    { num: '05', title: 'Leadership', icon: 'users' },
    { num: '06', title: 'Planning', icon: 'clock' },
    { num: '07', title: 'Support', icon: 'shield' },
    { num: '08', title: 'Operation', icon: 'check' },
    { num: '09', title: 'Performance', icon: 'trend' },
    { num: '10', title: 'Improvement', icon: 'star' },
  ];
  const statusFor = (i) => completed.includes(i) ? 'completed' : i === activeIndex ? 'active' : i === activeIndex + 1 ? 'inProgress' : 'pending';
  const colorFor = (s) => s === 'completed' ? '#3D5A3A' : s === 'active' ? '#5C7C52' : s === 'inProgress' ? '#8BAA7E' : '#a8c499';

  return (
    <div style={{padding:'30px 0 20px',background:'linear-gradient(180deg, #f4f7f3 0%, #fafaf9 100%)',borderRadius:20,position:'relative'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'center',gap:0,padding:'0 20px',flexWrap:'nowrap',overflowX:'auto'}}>
        {stages.map((s, i) => {
          const status = statusFor(i);
          const isLast = i === stages.length - 1;
          const dimmed = status === 'pending' && i > activeIndex + 1;
          return (
            <React.Fragment key={s.num}>
              <div style={{flexShrink:0, width:138, opacity: dimmed ? 0.5 : 1}}>
                <window.HQ.CrownedCard status={status} width={138} onClick={() => onSelect && onSelect(i)} selected={i === activeIndex}>
                  <div style={{display:'flex',justifyContent:'center',color:colorFor(status),margin:'-4px 0 8px'}}><Icon name={s.icon} size={26} /></div>
                  <div style={{font:'700 12px Poppins, sans-serif',color:'#1f2937',letterSpacing:'-.005em',marginBottom:4,minHeight:30}}>{s.title}</div>
                  <div style={{font:'600 11px Poppins, sans-serif',color:colorFor(status),letterSpacing:'.08em'}}>{s.num}</div>
                </window.HQ.CrownedCard>
              </div>
              {!isLast && (
                <svg width="46" height="84" viewBox="0 0 64 96" style={{flexShrink:0,marginTop:34}}>
                  <path d="M 4 56 Q 32 22, 60 56" stroke={dimmed ? '#d8d8d0' : colorFor(statusFor(i))} strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" fill="none"/>
                  <path d="M 60 56 L 54 52 M 60 56 L 54 60" stroke={dimmed ? '#d8d8d0' : colorFor(statusFor(i))} strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
