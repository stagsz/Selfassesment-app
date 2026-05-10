/* global React */
window.HQ = window.HQ || {};

window.HQ.Button = function Button({ variant = 'primary', size = 'md', icon, children, onClick, type='button', style={}, ...rest }) {
  const Icon = window.HQ.Icon;
  const v = hqButtonVariants[variant] || hqButtonVariants.primary;
  const s = hqButtonSizes[size] || hqButtonSizes.md;
  return (
    <button type={type} onClick={onClick} style={{...hqButtonStyles.base, ...v, ...s, ...style}} {...rest}>
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
    </button>
  );
};

const hqButtonStyles = {
  base: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 0, borderRadius: 12, cursor: 'pointer', font: '500 14px Inter, sans-serif', transition: 'all .15s', whiteSpace: 'nowrap' },
};
const hqButtonVariants = {
  primary: { background: '#557349', color: '#fff', boxShadow: '0 1px 2px rgba(85,115,73,.4), 0 0 0 1px rgba(168,196,153,.3)' },
  outline: { background: '#fff', color: '#445c3b', border: '1.5px solid #cddbc9' },
  secondary: { background: '#ececea', color: '#474743' },
  ghost: { background: 'transparent', color: '#64645c' },
  danger: { background: '#dc2626', color: '#fff' },
  success: { background: '#16874f', color: '#fff' },
  dark: { background: '#0f172a', color: '#fff' },
};
const hqButtonSizes = {
  sm: { height: 32, padding: '0 12px', fontSize: 13, borderRadius: 10 },
  md: { height: 38, padding: '0 16px', fontSize: 13.5 },
  lg: { height: 44, padding: '0 22px', fontSize: 14 },
};

window.HQ.Badge = function Badge({ tone = 'neutral', children, dot = false }) {
  const t = hqBadgeTones[tone] || hqBadgeTones.neutral;
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:6,padding:'3px 10px',borderRadius:9999,font:'500 11px Inter, sans-serif',background:t.bg,color:t.fg}}>
      {dot && <span style={{width:6,height:6,borderRadius:9999,background:t.dot}} />}
      {children}
    </span>
  );
};

const hqBadgeTones = {
  neutral: { bg: '#f3f4f6', fg: '#4b5563', dot: '#9ca3af' },
  warning: { bg: '#fef3c7', fg: '#92400e', dot: '#f59e0b' },
  info: { bg: '#dbeafe', fg: '#1e40af', dot: '#3b82f6' },
  success: { bg: '#dcfce7', fg: '#15803d', dot: '#22c55e' },
  sage: { bg: '#e6ede4', fg: '#384b32', dot: '#557349' },
  danger: { bg: '#fef2f2', fg: '#b91c1c', dot: '#ef4444' },
  orange: { bg: '#fff7ed', fg: '#c2410c', dot: '#f97316' },
};
