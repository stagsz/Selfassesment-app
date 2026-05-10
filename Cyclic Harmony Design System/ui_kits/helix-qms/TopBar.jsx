/* global React */
const { useState: useStateTB } = React;

window.HQ = window.HQ || {};

window.HQ.TopBar = function TopBar({ crumbs = [], saveStatus, actions }) {
  const Icon = window.HQ.Icon;
  return (
    <header style={hqTopBarStyles.bar}>
      <div style={hqTopBarStyles.crumbs}>
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={hqTopBarStyles.sep}><Icon name="chev" size={13} /></span>}
            <span style={i === crumbs.length - 1 ? hqTopBarStyles.crumbActive : hqTopBarStyles.crumb}>{c}</span>
          </React.Fragment>
        ))}
      </div>
      <div style={hqTopBarStyles.search}>
        <Icon name="search" size={14} />
        <input placeholder="Search assessments, NCRs, requirements…" style={hqTopBarStyles.input} />
        <kbd style={hqTopBarStyles.kbd}>⌘K</kbd>
      </div>
      <div style={hqTopBarStyles.right}>
        {saveStatus && <window.HQ.SaveBadge status={saveStatus} />}
        {actions}
        <button style={hqTopBarStyles.iconBtn}><Icon name="bell" size={17} /><span style={hqTopBarStyles.notif} /></button>
      </div>
    </header>
  );
};

window.HQ.SaveBadge = function SaveBadge({ status }) {
  const Icon = window.HQ.Icon;
  if (status === 'saved') {
    return <span style={{...hqTopBarStyles.save, background: '#dcfce7', color: '#15803d'}}><Icon name="check" size={11} sw={3} />Saved</span>;
  }
  if (status === 'saving') {
    return <span style={{...hqTopBarStyles.save, background: '#fef3c7', color: '#92400e'}}><span style={hqTopBarStyles.dot} />Saving…</span>;
  }
  return <span style={{...hqTopBarStyles.save, background: '#f3f4f6', color: '#4b5563'}}>Draft</span>;
};

const hqTopBarStyles = {
  bar: { display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px', background: '#fff', borderBottom: '1px solid #ececea', position: 'sticky', top: 0, zIndex: 10, height: 60 },
  crumbs: { display: 'flex', alignItems: 'center', gap: 6, font: '500 13px Inter, sans-serif', color: '#7a7a70' },
  crumb: {},
  crumbActive: { color: '#1a1a18', fontWeight: 600 },
  sep: { color: '#b8b8b3', display: 'flex' },
  search: { flex: 1, maxWidth: 480, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f5f5f3', borderRadius: 12, color: '#7a7a70' },
  input: { flex: 1, border: 0, background: 'transparent', outline: 'none', font: '400 13px Inter, sans-serif', color: '#1a1a18' },
  kbd: { font: '500 10px ui-monospace', color: '#7a7a70', background: '#fff', border: '1px solid #ddddd9', borderRadius: 4, padding: '1px 5px' },
  right: { display: 'flex', alignItems: 'center', gap: 12 },
  iconBtn: { position: 'relative', width: 36, height: 36, border: 0, background: 'transparent', borderRadius: 10, display: 'grid', placeItems: 'center', color: '#64645c', cursor: 'pointer' },
  notif: { position: 'absolute', top: 8, right: 8, width: 7, height: 7, background: '#ef4444', borderRadius: 9999, border: '2px solid #fff' },
  save: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 9999, font: '500 11px Inter, sans-serif' },
  dot: { width: 8, height: 8, borderRadius: 9999, background: '#f59e0b', animation: 'hqpulse 1.6s ease-in-out infinite' },
};
