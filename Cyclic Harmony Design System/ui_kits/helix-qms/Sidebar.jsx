/* global React */
const { useState: useStateShell } = React;

window.HQ = window.HQ || {};

window.HQ.Sidebar = function Sidebar({ active, onNav }) {
  const Icon = window.HQ.Icon;
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'assessments', label: 'Assessments', icon: 'check' },
    { id: 'ncrs', label: 'Non-Conformities', icon: 'alert', badge: 18 },
    { id: 'reports', label: 'Reports', icon: 'paper' },
    { id: 'standards', label: 'Standards', icon: 'book' },
    { id: 'users', label: 'Users', icon: 'users' },
  ];
  return (
    <aside style={hqSidebarStyles.aside}>
      <div style={hqSidebarStyles.brand}>
        <div style={hqSidebarStyles.brandIcon}><Icon name="shield" size={18} /></div>
        <div>
          <div style={hqSidebarStyles.brandName}>Helix <span style={{color:'#86efac'}}>QMS</span></div>
          <div style={hqSidebarStyles.brandTag}>ISO 9001:2015</div>
        </div>
      </div>
      <nav style={hqSidebarStyles.nav}>
        {items.map(it => {
          const isActive = it.id === active;
          return (
            <button key={it.id} onClick={() => onNav(it.id)} style={{...hqSidebarStyles.item, ...(isActive ? hqSidebarStyles.itemActive : {})}}>
              <Icon name={it.icon} size={17} />
              <span style={{flex:1,textAlign:'left'}}>{it.label}</span>
              {it.badge && <span style={hqSidebarStyles.badge}>{it.badge}</span>}
            </button>
          );
        })}
      </nav>
      <div style={hqSidebarStyles.user}>
        <div style={hqSidebarStyles.avatar}>AB</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={hqSidebarStyles.uname}>Alex Bennett</div>
          <div style={hqSidebarStyles.urole}>Quality Manager</div>
        </div>
        <button style={hqSidebarStyles.cog}><Icon name="settings" size={15} /></button>
      </div>
    </aside>
  );
};

const hqSidebarStyles = {
  aside: { width: 248, background: '#0f172a', color: '#cbd5e1', display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100vh', position: 'sticky', top: 0 },
  brand: { display: 'flex', alignItems: 'center', gap: 10, padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,.06)' },
  brandIcon: { width: 32, height: 32, borderRadius: 10, background: '#557349', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1px rgba(168,196,153,.3), 0 6px 16px -4px rgba(85,115,73,.55)' },
  brandName: { font: '600 15px Poppins, sans-serif', color: '#fff', letterSpacing: '-.01em' },
  brandTag: { font: '400 10px Inter, sans-serif', color: '#64748b', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 1 },
  nav: { flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 },
  item: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, font: '500 13px Inter, sans-serif', color: '#cbd5e1', background: 'transparent', border: 0, cursor: 'pointer', textAlign: 'left', transition: 'all .15s' },
  itemActive: { background: '#557349', color: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.2), 0 0 0 1px rgba(168,196,153,.2)' },
  badge: { background: 'rgba(239,68,68,.2)', color: '#fca5a5', padding: '1px 7px', borderRadius: 9999, font: '600 10px Inter', minWidth: 18, textAlign: 'center' },
  user: { padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', gap: 10 },
  avatar: { width: 34, height: 34, borderRadius: 11, background: 'linear-gradient(135deg,#8baa7e,#557349)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 12px Inter', flexShrink: 0 },
  uname: { font: '500 12px Inter, sans-serif', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  urole: { font: '400 11px Inter, sans-serif', color: '#94a3b8' },
  cog: { width: 28, height: 28, background: 'transparent', border: 0, color: '#94a3b8', borderRadius: 8, display: 'grid', placeItems: 'center', cursor: 'pointer' },
};
