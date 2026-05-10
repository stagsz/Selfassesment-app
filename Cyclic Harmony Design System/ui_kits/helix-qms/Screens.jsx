/* global React */
const { useState: useStateScreens, useMemo } = React;

window.HQ = window.HQ || {};

// ====== DASHBOARD ======
window.HQ.DashboardScreen = function DashboardScreen({ onOpenAssessment }) {
  const Icon = window.HQ.Icon;
  return (
    <div style={{padding:'28px 32px',display:'flex',flexDirection:'column',gap:24}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:16,flexWrap:'wrap'}}>
        <div>
          <div style={{font:'500 13px Inter, sans-serif',color:'#7a7a70',marginBottom:4}}>Welcome back, Alex</div>
          <h1 style={{font:'700 28px Poppins, sans-serif',color:'#0f172a',margin:0,letterSpacing:'-.02em'}}>Quality Dashboard</h1>
          <p style={{font:'400 14px Inter, sans-serif',color:'#64645c',margin:'6px 0 0',maxWidth:520,lineHeight:1.5}}>Three assessments in progress, one due this week. Twelve actions need your review.</p>
        </div>
        <div style={{display:'flex',gap:10}}>
          <window.HQ.Button variant="outline" icon="paper">Export Report</window.HQ.Button>
          <window.HQ.Button variant="primary" icon="plus" onClick={onOpenAssessment}>New Assessment</window.HQ.Button>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:16}}>
        <window.HQ.StatCard label="Overall Compliance" value="72.1" unit="%" trend="4.3%" sub="Q1 2026 trend" icon="check" tone="sage" />
        <window.HQ.StatCard label="Active Assessments" value="3" sub="1 due this week" icon="paper" tone="info" />
        <window.HQ.StatCard label="Open Non-Conformities" value="18" sub="3 major · 15 minor" trend="-2" icon="alert" tone="danger" />
        <window.HQ.StatCard label="Total Assessments" value="42" sub="this year" icon="trend" tone="neutral" />
      </div>

      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:20}}>
        {/* Compliance trend chart */}
        <div style={{background:'#fff',border:'1px solid #ececea',borderRadius:16,padding:24}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:18}}>
            <div>
              <h3 style={{font:'600 16px Poppins, sans-serif',color:'#0f172a',margin:0}}>Compliance trend</h3>
              <p style={{font:'400 12px Inter, sans-serif',color:'#7a7a70',margin:'2px 0 0'}}>Last 6 quarters · ISO 9001:2015</p>
            </div>
            <div style={{display:'flex',gap:6}}>
              {['Q','Y','All'].map((p,i)=>(
                <button key={p} style={{padding:'4px 10px',borderRadius:8,border:'1px solid #ececea',background:i===0?'#557349':'#fff',color:i===0?'#fff':'#64645c',font:'500 11px Inter',cursor:'pointer'}}>{p}</button>
              ))}
            </div>
          </div>
          {/* simple area chart */}
          <svg viewBox="0 0 600 180" style={{width:'100%',height:180}}>
            <defs>
              <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8baa7e" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#8baa7e" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {[0,1,2,3].map(i=><line key={i} x1="40" x2="600" y1={20+i*40} y2={20+i*40} stroke="#ececea" strokeDasharray="3 3"/>)}
            {['100','75','50','25'].map((t,i)=><text key={t} x="32" y={24+i*40} fontSize="10" fill="#94a3b8" textAnchor="end" fontFamily="Inter">{t}</text>)}
            <path d="M 40 110 L 140 96 L 240 80 L 340 72 L 440 56 L 540 40 L 600 32 L 600 160 L 40 160 Z" fill="url(#grad)"/>
            <path d="M 40 110 L 140 96 L 240 80 L 340 72 L 440 56 L 540 40 L 600 32" fill="none" stroke="#557349" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            {[[40,110],[140,96],[240,80],[340,72],[440,56],[540,40]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke="#557349" strokeWidth="2"/>
            ))}
            {['Q3 24','Q4 24','Q1 25','Q2 25','Q3 25','Q4 25'].map((q,i)=>(
              <text key={q} x={40+i*100} y="174" fontSize="10" fill="#7a7a70" textAnchor="middle" fontFamily="Inter">{q}</text>
            ))}
          </svg>
        </div>

        {/* My queue */}
        <div style={{background:'#fff',border:'1px solid #ececea',borderRadius:16,padding:'20px 22px',display:'flex',flexDirection:'column',gap:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{font:'600 16px Poppins, sans-serif',color:'#0f172a',margin:0}}>Your queue</h3>
            <span style={{font:'500 11px Inter',color:'#557349'}}>12 items</span>
          </div>
          {[
            { tone:'danger', icon:'alert', title:'NCR-247 · Calibration log gaps', sub:'Major · due tomorrow' },
            { tone:'orange', icon:'check', title:'Verify CA-088', sub:'Awaiting review · 2 days' },
            { tone:'info', icon:'paper', title:'Q4 Internal Audit Report', sub:'Sign-off requested' },
            { tone:'sage', icon:'plus', title:'Add evidence — 7.1.5', sub:'Supplier Qualification' },
          ].map((r,i)=>(
            <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start',paddingBottom:i<3?12:0,borderBottom:i<3?'1px solid #f5f5f3':'none'}}>
              <div style={{width:32,height:32,borderRadius:10,background:{danger:'#fef2f2',orange:'#fff7ed',info:'#dbeafe',sage:'#e6ede4'}[r.tone],color:{danger:'#dc2626',orange:'#c2410c',info:'#1d4ed8',sage:'#384b32'}[r.tone],display:'grid',placeItems:'center',flexShrink:0}}><Icon name={r.icon} size={15} /></div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{font:'500 13px Inter, sans-serif',color:'#0f172a',marginBottom:2}}>{r.title}</div>
                <div style={{font:'400 11.5px Inter, sans-serif',color:'#7a7a70'}}>{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active assessments */}
      <div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <h2 style={{font:'600 18px Poppins, sans-serif',color:'#0f172a',margin:0}}>Active assessments</h2>
          <button style={{font:'500 13px Inter',color:'#557349',background:'transparent',border:0,cursor:'pointer'}}>View all →</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:16}}>
          {[
            { name:'Annual ISO 9001:2015 Internal Audit', org:'Manufacturing — Plant 03', pct:65, sections:'7 of 10 sections', due:'Due Apr 18', tone:'sage' },
            { name:'Supplier Qualification Review', org:'Procurement', pct:32, sections:'3 of 10 sections', due:'Due Apr 24', tone:'sage' },
            { name:'Customer Complaint Process', org:'Customer Service', pct:88, sections:'9 of 10 sections', due:'Due Apr 12 · overdue', tone:'danger' },
          ].map((a,i)=>(
            <div key={i} onClick={onOpenAssessment} style={{background:'#fff',border:'1px solid #ececea',borderRadius:16,padding:'18px 22px',cursor:'pointer',transition:'all .15s'}}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 8px 22px -8px rgba(15,42,58,.18)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
              <div style={{font:'600 14.5px Poppins, sans-serif',color:'#0f172a',marginBottom:4,lineHeight:1.3}}>{a.name}</div>
              <div style={{font:'400 12px Inter, sans-serif',color:'#7a7a70',marginBottom:14}}>{a.org}</div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,font:'500 12px Inter, sans-serif',color:'#475569'}}>
                <span>{a.sections}</span><span style={{color:a.tone==='danger'?'#dc2626':'#557349',fontWeight:600}}>{a.pct}%</span>
              </div>
              <div style={{height:6,background:'#ececea',borderRadius:9999,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${a.pct}%`,background:a.tone==='danger'?'linear-gradient(90deg,#fb923c,#dc2626)':'linear-gradient(90deg,#a8c499,#557349)',borderRadius:9999}}/>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:14}}>
                <window.HQ.Badge tone={a.tone === 'danger' ? 'danger' : 'sage'} dot>{a.tone==='danger'?'Overdue':'In Progress'}</window.HQ.Badge>
                <span style={{font:'400 11.5px Inter, sans-serif',color:'#7a7a70'}}>{a.due}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ====== ASSESSMENTS LIST ======
window.HQ.AssessmentsScreen = function AssessmentsScreen({ onOpenAssessment }) {
  const Icon = window.HQ.Icon;
  const [filter, setFilter] = useStateScreens('all');
  const rows = [
    { id:1, name:'Annual ISO 9001:2015 Internal Audit', org:'Plant 03', owner:'A. Bennett', status:'In Progress', tone:'sage', pct:65, due:'Apr 18, 2026' },
    { id:2, name:'Supplier Qualification — Tier 1', org:'Procurement', owner:'M. Rivera', status:'In Progress', tone:'sage', pct:32, due:'Apr 24, 2026' },
    { id:3, name:'Customer Complaint Process Review', org:'Customer Service', owner:'L. Park', status:'Overdue', tone:'danger', pct:88, due:'Apr 12, 2026' },
    { id:4, name:'Q1 Document Control Audit', org:'All Sites', owner:'A. Bennett', status:'Completed', tone:'success', pct:100, due:'Mar 31, 2026' },
    { id:5, name:'Calibration & Maintenance', org:'Plant 01', owner:'D. Cohen', status:'Under Review', tone:'info', pct:100, due:'Mar 28, 2026' },
    { id:6, name:'Management Review — Annual', org:'Executive', owner:'A. Bennett', status:'Draft', tone:'neutral', pct:5, due:'May 02, 2026' },
  ];
  const filtered = filter === 'all' ? rows : rows.filter(r => r.status.toLowerCase() === filter);
  return (
    <div style={{padding:'28px 32px',display:'flex',flexDirection:'column',gap:20}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,flexWrap:'wrap'}}>
        <div>
          <h1 style={{font:'700 26px Poppins, sans-serif',color:'#0f172a',margin:0,letterSpacing:'-.02em'}}>Assessments</h1>
          <p style={{font:'400 13px Inter, sans-serif',color:'#7a7a70',margin:'4px 0 0'}}>{rows.length} assessments · 3 in progress · 1 overdue</p>
        </div>
        <window.HQ.Button variant="primary" icon="plus">New Assessment</window.HQ.Button>
      </div>
      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
        {[
          ['all','All',rows.length],
          ['in progress','In Progress',2],
          ['overdue','Overdue',1],
          ['under review','Under Review',1],
          ['completed','Completed',1],
          ['draft','Draft',1],
        ].map(([k,l,c])=>(
          <button key={k} onClick={()=>setFilter(k)} style={{padding:'7px 14px',borderRadius:9999,border:'1px solid '+(filter===k?'#557349':'#ececea'),background:filter===k?'#557349':'#fff',color:filter===k?'#fff':'#64645c',font:'500 12.5px Inter, sans-serif',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:8}}>
            {l}<span style={{font:'500 11px Inter',opacity:.85,padding:'0 6px',borderRadius:9999,background:filter===k?'rgba(255,255,255,.2)':'#f5f5f3'}}>{c}</span>
          </button>
        ))}
      </div>
      <div style={{background:'#fff',border:'1px solid #ececea',borderRadius:16,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr style={{background:'#fafaf9',borderBottom:'1px solid #ececea'}}>
            {['Assessment','Owner','Progress','Status','Due','Actions'].map(h=>(
              <th key={h} style={{textAlign:'left',padding:'12px 18px',font:'600 11px Inter, sans-serif',color:'#7a7a70',textTransform:'uppercase',letterSpacing:'.05em'}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((r,i)=>(
              <tr key={r.id} onClick={onOpenAssessment} style={{borderBottom:i<filtered.length-1?'1px solid #f5f5f3':'none',cursor:'pointer'}}
                onMouseEnter={e=>e.currentTarget.style.background='#fafaf9'}
                onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
                <td style={{padding:'14px 18px'}}>
                  <div style={{font:'500 13.5px Inter, sans-serif',color:'#0f172a',marginBottom:2}}>{r.name}</div>
                  <div style={{font:'400 11.5px Inter, sans-serif',color:'#7a7a70'}}>{r.org}</div>
                </td>
                <td style={{padding:'14px 18px',font:'400 13px Inter, sans-serif',color:'#475569'}}>{r.owner}</td>
                <td style={{padding:'14px 18px',width:160}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{flex:1,height:4,background:'#ececea',borderRadius:9999,overflow:'hidden'}}><div style={{height:'100%',width:`${r.pct}%`,background:r.tone==='danger'?'#dc2626':r.tone==='success'?'#16a34a':r.tone==='info'?'#2563eb':'#557349'}}/></div>
                    <span style={{font:'500 11.5px Inter',color:'#475569',minWidth:32,textAlign:'right'}}>{r.pct}%</span>
                  </div>
                </td>
                <td style={{padding:'14px 18px'}}><window.HQ.Badge tone={r.tone} dot>{r.status}</window.HQ.Badge></td>
                <td style={{padding:'14px 18px',font:'400 12.5px Inter, sans-serif',color:'#475569'}}>{r.due}</td>
                <td style={{padding:'14px 18px'}}><button style={{width:30,height:30,border:0,background:'transparent',borderRadius:8,color:'#94a3b8',cursor:'pointer'}}><Icon name="more" size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ====== ASSESSMENT DETAIL ======
window.HQ.AssessmentDetailScreen = function AssessmentDetailScreen() {
  const Icon = window.HQ.Icon;
  const [activeStage, setActiveStage] = useStateScreens(1);
  const [scores, setScores] = useStateScreens({ q1: 4, q2: 3 });
  const [justifications, setJustifications] = useStateScreens({});

  const questions = [
    { id:'q1', ref:'4.1.1', section:'4.1', text:'Has the organization determined external and internal issues relevant to its purpose and strategic direction?', guidance:'Look for SWOT analysis, environmental scans, or stakeholder mapping documents dated within the last 12 months.', evidenceCount:3 },
    { id:'q2', ref:'4.2.1', section:'4.2', text:'Are interested parties (and their requirements) identified and monitored at planned intervals?', guidance:'Stakeholder register with last-review dates. Watch for blanket "no changes" comments without supporting analysis.', evidenceCount:1 },
    { id:'q3', ref:'4.3.1', section:'4.3', text:'Has the scope of the QMS been determined and documented, including boundaries and applicability?', guidance:'A scope statement covering products, services, sites, and any exclusions with justification.', evidenceCount:0 },
  ];

  return (
    <div style={{padding:'24px 32px',display:'flex',flexDirection:'column',gap:20}}>
      {/* Title */}
      <div>
        <div style={{display:'flex',alignItems:'center',gap:8,font:'500 12px Inter',color:'#7a7a70',marginBottom:6}}>
          <Icon name="paper" size={13} />Assessment · ISO 9001:2015
        </div>
        <h1 style={{font:'700 26px Poppins, sans-serif',color:'#0f172a',margin:0,letterSpacing:'-.02em'}}>Annual ISO 9001:2015 Internal Audit</h1>
        <div style={{display:'flex',gap:14,marginTop:8,font:'400 12.5px Inter',color:'#64645c',flexWrap:'wrap'}}>
          <span>Plant 03</span>·<span>Lead auditor: A. Bennett</span>·<span>Started Mar 24, 2026</span>·<window.HQ.Badge tone="sage" dot>In Progress</window.HQ.Badge>
        </div>
      </div>

      {/* Process flow */}
      <window.HQ.ProcessFlow activeIndex={activeStage} completed={[0]} onSelect={setActiveStage} />

      {/* Section header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:16,flexWrap:'wrap',marginTop:8}}>
        <div>
          <div style={{font:'500 11px Inter',color:'#557349',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:4}}>Section 05</div>
          <h2 style={{font:'700 22px Poppins, sans-serif',color:'#0f172a',margin:0,letterSpacing:'-.01em'}}>Leadership</h2>
          <p style={{font:'400 13px Inter',color:'#64645c',margin:'4px 0 0',maxWidth:560,lineHeight:1.5}}>Top management commitment, customer focus, quality policy, and organizational roles.</p>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <span style={{font:'500 12px Inter',color:'#7a7a70'}}>2 of 8 questions</span>
          <window.HQ.Button variant="outline" size="sm" icon="arrowL">Previous section</window.HQ.Button>
          <window.HQ.Button variant="primary" size="sm" icon="arrow">Next section</window.HQ.Button>
        </div>
      </div>

      {/* Question cards */}
      <div>
        {questions.map(q => (
          <window.HQ.QuestionCard
            key={q.id}
            q={q}
            value={scores[q.id]}
            onScore={(v) => setScores({ ...scores, [q.id]: v })}
            onJustify={(j) => setJustifications({ ...justifications, [q.id]: j })}
            justification={justifications[q.id]}
          />
        ))}
      </div>

      {/* Footer nav */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'#fff',border:'1px solid #ececea',borderRadius:16,padding:'14px 22px'}}>
        <div style={{font:'400 12px Inter',color:'#7a7a70'}}>
          <span style={{color:'#16a34a',fontWeight:600}}>Saved</span> · 30 seconds ago
        </div>
        <div style={{display:'flex',gap:10}}>
          <window.HQ.Button variant="ghost">Save Draft</window.HQ.Button>
          <window.HQ.Button variant="outline" icon="paper">Generate Report</window.HQ.Button>
          <window.HQ.Button variant="primary" icon="check">Mark Section Complete</window.HQ.Button>
        </div>
      </div>
    </div>
  );
};

// ====== NCR LIST ======
window.HQ.NCRsScreen = function NCRsScreen() {
  const Icon = window.HQ.Icon;
  const ncrs = [
    { id:'NCR-247', title:'Calibration logs missing for 3 instruments', sev:'major', area:'Plant 03 — Production', status:'Open', age:'2 days', owner:'D. Cohen' },
    { id:'NCR-246', title:'Supplier audit report not completed within deadline', sev:'minor', area:'Procurement', status:'Action Plan', age:'5 days', owner:'M. Rivera' },
    { id:'NCR-245', title:'Customer complaint trend not reviewed in management meeting', sev:'minor', area:'Customer Service', status:'In Progress', age:'1 week', owner:'L. Park' },
    { id:'NCR-244', title:'Internal audit schedule deviation — Q1 audit late', sev:'major', area:'Quality', status:'Verification', age:'1 week', owner:'A. Bennett' },
    { id:'NCR-243', title:'Document control: 2 procedures past review date', sev:'minor', area:'All', status:'Closed', age:'3 weeks', owner:'A. Bennett' },
  ];
  return (
    <div style={{padding:'28px 32px',display:'flex',flexDirection:'column',gap:20}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,flexWrap:'wrap'}}>
        <div>
          <h1 style={{font:'700 26px Poppins, sans-serif',color:'#0f172a',margin:0,letterSpacing:'-.02em'}}>Non-Conformities</h1>
          <p style={{font:'400 13px Inter',color:'#7a7a70',margin:'4px 0 0'}}>18 active · 3 major · 15 minor</p>
        </div>
        <window.HQ.Button variant="primary" icon="plus">Log NCR</window.HQ.Button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:14}}>
        <window.HQ.StatCard label="Open" value="9" sub="awaiting action plan" tone="warning" icon="alert" />
        <window.HQ.StatCard label="Action Plan" value="5" sub="actions in progress" tone="info" icon="clock" />
        <window.HQ.StatCard label="Verification" value="4" sub="awaiting evidence review" tone="sage" icon="check" />
        <window.HQ.StatCard label="Closed (30d)" value="11" trend="3" sub="vs previous 30 days" tone="neutral" icon="trend" />
      </div>
      <div style={{background:'#fff',border:'1px solid #ececea',borderRadius:16,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr style={{background:'#fafaf9',borderBottom:'1px solid #ececea'}}>
            {['ID','NCR','Severity','Status','Owner','Age',''].map(h=>(
              <th key={h} style={{textAlign:'left',padding:'12px 18px',font:'600 11px Inter, sans-serif',color:'#7a7a70',textTransform:'uppercase',letterSpacing:'.05em'}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {ncrs.map((r,i)=>(
              <tr key={r.id} style={{borderBottom:i<ncrs.length-1?'1px solid #f5f5f3':'none'}}>
                <td style={{padding:'14px 18px',font:'600 12.5px ui-monospace, monospace',color:'#557349'}}>{r.id}</td>
                <td style={{padding:'14px 18px'}}>
                  <div style={{font:'500 13px Inter, sans-serif',color:'#0f172a',marginBottom:2}}>{r.title}</div>
                  <div style={{font:'400 11.5px Inter, sans-serif',color:'#7a7a70'}}>{r.area}</div>
                </td>
                <td style={{padding:'14px 18px'}}>
                  {r.sev === 'major' ?
                    <window.HQ.Badge tone="danger" dot>Major</window.HQ.Badge> :
                    <window.HQ.Badge tone="orange" dot>Minor</window.HQ.Badge>}
                </td>
                <td style={{padding:'14px 18px'}}>
                  <window.HQ.Badge tone={r.status==='Closed'?'success':r.status==='Verification'?'sage':r.status==='Action Plan'?'info':r.status==='Open'?'warning':'neutral'} dot>{r.status}</window.HQ.Badge>
                </td>
                <td style={{padding:'14px 18px',font:'400 12.5px Inter, sans-serif',color:'#475569'}}>{r.owner}</td>
                <td style={{padding:'14px 18px',font:'400 12.5px Inter, sans-serif',color:'#7a7a70'}}>{r.age}</td>
                <td style={{padding:'14px 18px'}}><button style={{width:30,height:30,border:0,background:'transparent',borderRadius:8,color:'#94a3b8',cursor:'pointer'}}><Icon name="more" size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
