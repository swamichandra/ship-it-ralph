# Ralph Design System — Eclipse Edition
### Inter (body) · Instrument Serif (display) · Coral + Cyan · Dark/Light mode

A premium interface system with editorial typography, restrained glass surfaces, and a clear
hierarchy of neutral surfaces, coral focal accents, and cyan data accents.

---

## Table of Contents
1. Eclipse Palette (CSS vars — dark + light)
2. Base Reset + Body
3. Type, Spacing, Surface, and Motion Tokens
4. Animations
5. Icons — Iconoir
6. Tailwind Extension
7. Components (JSX)
8. ModeToggle
9. AI-Native Patterns

---

## 1. Eclipse Palette

Paste into `client/src/index.css`.

```css
[data-theme="dark"], :root {
  --bg: #09090F;
  --bg-subtle: #0F0F1A;
  --bg-elevated: #141420;
  --surface: rgba(255,255,255,0.035);
  --surface-hover: rgba(255,255,255,0.065);
  --surface-raised: rgba(255,255,255,0.09);
  --surface-solid: #141420;
  --surface-overlay: rgba(20,20,32,0.82);
  --border: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.14);
  --border-focus: rgba(255,97,84,0.60);
  --text: #F0EDFF;
  --text-muted: #9B96B8;
  --text-subtle: #524F6A;
  --text-inverse: #09090F;
  --accent: #FF6154;
  --accent-hover: #E5503F;
  --accent-dim: rgba(255,97,84,0.12);
  --accent-glow: rgba(255,97,84,0.28);
  --accent-fg: #FFFFFF;
  --accent2: #7EFFF5;
  --accent2-hover: #5EEDDF;
  --accent2-dim: rgba(126,255,245,0.10);
  --accent2-glow: rgba(126,255,245,0.22);
  --accent2-fg: #09090F;
  --success: #34D399;
  --success-bg: rgba(52,211,153,0.10);
  --warning: #FBBF24;
  --warning-bg: rgba(251,191,36,0.10);
  --destructive: #F87171;
  --destructive-bg: rgba(248,113,113,0.10);
  --info: #7EFFF5;
  --info-bg: rgba(126,255,245,0.10);
  --radius-sm: 5px; --radius: 8px; --radius-md: 10px;
  --radius-lg: 14px; --radius-xl: 20px; --radius-2xl: 24px; --radius-full: 9999px;
}

[data-theme="light"] {
  --bg: #F7F5F0;
  --bg-subtle: #EDEAE3;
  --bg-elevated: #FAFAF8;
  --surface: rgba(0,0,0,0.032);
  --surface-hover: rgba(0,0,0,0.055);
  --surface-raised: rgba(0,0,0,0.075);
  --surface-solid: #FFFFFF;
  --surface-overlay: rgba(255,255,255,0.88);
  --border: rgba(0,0,0,0.09);
  --border-strong: rgba(0,0,0,0.16);
  --border-focus: rgba(232,66,47,0.55);
  --text: #1A1825;
  --text-muted: #6B6888;
  --text-subtle: #A09DBE;
  --text-inverse: #FFFFFF;
  --accent: #E8422F;
  --accent-hover: #C93520;
  --accent-dim: rgba(232,66,47,0.10);
  --accent-glow: rgba(232,66,47,0.20);
  --accent-fg: #FFFFFF;
  --accent2: #00B8AB;
  --accent2-hover: #009D91;
  --accent2-dim: rgba(0,184,171,0.10);
  --accent2-glow: rgba(0,184,171,0.18);
  --accent2-fg: #FFFFFF;
  --success: #059669; --success-bg: rgba(5,150,105,0.08);
  --warning: #D97706; --warning-bg: rgba(217,119,6,0.08);
  --destructive: #DC2626; --destructive-bg: rgba(220,38,38,0.08);
  --info: #0891B2; --info-bg: rgba(8,145,178,0.08);
}
```

---

## 2. Base Reset + Body

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { color-scheme: dark light; }

body {
  font-family: var(--font-body);
  font-size: var(--text-md);
  line-height: var(--leading-relaxed);
  color: var(--text);
  min-height: 100vh;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

[data-theme="dark"] body {
  background:
    radial-gradient(ellipse 70% 45% at 15% -5%,  rgba(255,97,84,0.08)   0%, transparent 55%),
    radial-gradient(ellipse 55% 40% at 90% 10%,  rgba(126,255,245,0.06) 0%, transparent 50%),
    radial-gradient(ellipse 60% 55% at 50% 110%, rgba(255,97,84,0.04)   0%, transparent 55%),
    #09090F;
}

[data-theme="light"] body {
  background:
    radial-gradient(ellipse 70% 45% at 15% -5%, rgba(232,66,47,0.05) 0%, transparent 55%),
    radial-gradient(ellipse 55% 40% at 90% 10%, rgba(0,184,171,0.04)  0%, transparent 50%),
    #F7F5F0;
}

input, button, select, textarea { font: inherit; color: inherit; }
a { color: inherit; text-decoration: none; }
button { cursor: pointer; background: none; border: none; }
img, svg { display: block; max-width: 100%; }

*:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: var(--text-subtle); }
::selection { background: var(--accent-dim); color: var(--text); }
```

---

## 3. Type, Spacing, Surface, and Motion Tokens

```css
:root {
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-display: 'Instrument Serif', Georgia, serif;

  --text-xs: 12px; --text-sm: 13px; --text-md: 14px;
  --text-lg: 16px; --text-xl: 18px; --text-2xl: 24px;
  --text-3xl: 32px; --text-4xl: 40px; --text-5xl: 48px;

  --leading-tight: 1.05; --leading-snug: 1.2;
  --leading-normal: 1.5; --leading-relaxed: 1.65;

  --tracking-tight: -0.03em;
  --tracking-label: 0.10em;

  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;
  --space-4: 16px; --space-5: 20px;  --space-6: 24px;
  --space-8: 32px; --space-10: 40px; --space-12: 48px; --space-16: 64px;

  --blur-sm: 12px; --blur-md: 16px; --blur-lg: 20px;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.10);
  --shadow-md: 0 10px 30px rgba(0,0,0,0.16);
  --shadow-lg: 0 20px 50px rgba(0,0,0,0.22);

  --ease-out: cubic-bezier(0.22,1,0.36,1);
  --transition-fast: 140ms;
  --transition-base: 200ms;
}
```

---

## 4. Animations

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(100%); }
}
```

JSX usage:
```jsx
// Page-load stagger
style={{ animation: 'fadeUp 0.5s var(--ease-out) both', animationDelay: '0s' }}
// List row stagger
style={{ animation: 'fadeUp 0.35s var(--ease-out) both', animationDelay: `${i * 0.03}s` }}
// Screen enter
style={{ animation: 'fadeIn 0.25s ease both' }}
```

---

## 5. Icons — Iconoir

All icons come from [Iconoir](https://iconoir.com) — free, MIT-licensed, consistent stroke weight.

CDN import in `client/index.html` (no npm required):
```html
<script src="https://unpkg.com/iconoir@7.8.0/dist/browser/iconoir.min.js"></script>
```

Or install via npm (preferred for Vite):
```bash
npm install iconoir-react
```

Usage with npm:
```jsx
import { Plus, Trash, EditPencil, Search, Moon, SunLight,
         Dashboard, List, User, Settings, Warning,
         CheckCircle, XmarkCircle, Clock } from 'iconoir-react';

// All icons accept size and strokeWidth props
<Plus width={16} height={16} strokeWidth={2} />
<Search width={16} height={16} strokeWidth={1.5} />
```

Recommended icon set per UI region:

| Context | Icon | Usage |
|---|---|---|
| Create / Add | `Plus` | Primary action buttons |
| Delete | `Trash` | Destructive actions |
| Edit | `EditPencil` | Row actions |
| Search | `Search` | Search inputs |
| Light mode | `SunLight` | ModeToggle |
| Dark mode | `HalfMoon` | ModeToggle |
| Dashboard | `Dashboard` | Nav item |
| List view | `List` | Nav item |
| User / Profile | `User` | Nav item |
| Settings | `Settings` | Nav item |
| Warning | `WarningTriangle` | Error states |
| Success | `CheckCircle` | Confirmation states |
| Error | `XmarkCircle` | Failure states |
| Pending | `Clock` | In-progress states |
| Close / Dismiss | `Xmark` | Modals, toasts |
| Chevron right | `NavArrowRight` | List rows, breadcrumbs |
| Sort | `Sort` | Table headers |
| Filter | `Filter` | List toolbars |
| Refresh | `RefreshDouble` | Retry / reload |

Rules:
- Default strokeWidth: 1.5 for UI, 2 for emphasis
- Default size: 16px inline, 20px standalone
- Always pair with aria-label when icon-only
- Never use emoji as icon substitutes

---

## 6. Tailwind Extension

Already in `STACK.md` — do not duplicate here.

---

## 7. Components (JSX)

All components use CSS custom properties. Zero hardcoded hex.
Copy into `client/src/components/`.

### Badge.jsx

```jsx
const STATUS_MAP = {
  active:'success', paid:'success', completed:'success',
  pending:'warning', draft:'warning', review:'warning',
  overdue:'coral', cancelled:'muted', inactive:'muted',
  open:'info', critical:'coral',
};

const BADGE_STYLES = {
  success: { bg:'var(--success-bg)',     color:'var(--success)'    },
  warning: { bg:'var(--warning-bg)',     color:'var(--warning)'    },
  coral:   { bg:'var(--accent-dim)',     color:'var(--accent)'     },
  info:    { bg:'var(--info-bg)',        color:'var(--info)'       },
  cyan:    { bg:'var(--accent2-dim)',    color:'var(--accent2)'    },
  muted:   { bg:'var(--surface-raised)', color:'var(--text-muted)' },
};

export function Badge({ variant, status, children }) {
  const v = variant || STATUS_MAP[String(status || children).toLowerCase()] || 'muted';
  const s = BADGE_STYLES[v] || BADGE_STYLES.muted;
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:'var(--space-2)',
      background:s.bg, color:s.color, padding:'4px 10px',
      borderRadius:'var(--radius-full)', fontSize:'11px',
      fontWeight:700, lineHeight:1, whiteSpace:'nowrap',
    }}>
      <span style={{ width:6, height:6, borderRadius:'50%',
        background:s.color, flexShrink:0 }} />
      {children || status}
    </span>
  );
}
```

### StatCard.jsx

```jsx
export function StatCard({ label, value, delta, up, icon, accent }) {
  return (
    <div style={{
      background:'var(--surface)',
      border:`1px solid ${accent ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius:'var(--radius-lg)', padding:'var(--space-5)',
      backdropFilter:'blur(var(--blur-md))',
      WebkitBackdropFilter:'blur(var(--blur-md))',
      boxShadow:'var(--shadow-sm)',
      animation:'fadeUp 0.45s var(--ease-out) both',
    }}>
      <div style={{ display:'flex', justifyContent:'space-between',
        alignItems:'center', marginBottom:'var(--space-3)' }}>
        <div style={{ fontSize:11, fontWeight:700, color:'var(--text-subtle)',
          textTransform:'uppercase', letterSpacing:'var(--tracking-label)', lineHeight:1.3 }}>
          {label}
        </div>
        {icon && (
          <span style={{ display:'inline-flex', alignItems:'center',
            justifyContent:'center', color:'var(--text-subtle)', opacity:0.75 }}>
            {icon}
          </span>
        )}
      </div>
      <div style={{ fontFamily:'var(--font-display)', fontSize:34, lineHeight:1,
        letterSpacing:'-0.02em', color: accent ? 'var(--accent)' : 'var(--text)',
        marginBottom:'var(--space-2)' }}>
        {value}
      </div>
      {delta && (
        <div style={{ fontSize:'var(--text-xs)', fontWeight:600, lineHeight:1.4,
          color: up ? 'var(--success)' : 'var(--destructive)' }}>
          {up ? '↑' : '↓'} {delta}
        </div>
      )}
    </div>
  );
}
```

### Table.jsx

```jsx
export function Table({ columns, rows, onRowClick, loading, density='comfortable' }) {
  const pad = density === 'compact' ? '10px 14px' : '12px 16px';

  if (loading) return (
    <div style={{ padding:'var(--space-10)', textAlign:'center',
      color:'var(--text-subtle)', fontSize:'var(--text-sm)' }}>
      Loading…
    </div>
  );

  return (
    <div style={{ overflowX:'auto' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'var(--text-sm)' }}>
        <thead>
          <tr style={{ borderBottom:'1px solid var(--border-strong)' }}>
            {columns.map(col => (
              <th key={col.key} style={{ padding:pad, textAlign:'left', fontSize:10,
                fontWeight:700, color:'var(--text-subtle)', textTransform:'uppercase',
                letterSpacing:'var(--tracking-label)', whiteSpace:'nowrap', lineHeight:1.3 }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i} onClick={() => onRowClick?.(row)}
              style={{ borderBottom:'1px solid var(--border)',
                cursor:onRowClick ? 'pointer' : 'default',
                animation:'fadeUp 0.35s var(--ease-out) both',
                animationDelay:`${i * 0.025}s` }}
              onMouseEnter={e => e.currentTarget.style.background='var(--surface-hover)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              {columns.map(col => (
                <td key={col.key} style={{ padding:pad, color:'var(--text)',
                  fontSize:'var(--text-sm)', lineHeight:1.6 }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### EmptyState.jsx

```jsx
export function EmptyState({ icon, title='Nothing here yet',
  description='Add your first item to get started.', action }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
      justifyContent:'center', padding:'var(--space-16) var(--space-6)',
      gap:'var(--space-3)', textAlign:'center', animation:'fadeIn 0.4s ease' }}>
      {icon && (
        <span style={{ color:'var(--text-subtle)', opacity:0.4, fontSize:36 }}>
          {icon}
        </span>
      )}
      <div style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-2xl)',
        color:'var(--text-muted)', lineHeight:1.2 }}>{title}</div>
      <div style={{ fontSize:'var(--text-sm)', color:'var(--text-subtle)',
        maxWidth:320, lineHeight:1.6 }}>{description}</div>
      {action}
    </div>
  );
}
```

### GlassCard.jsx

```jsx
export function getGlassCardStyle(level = 1) {
  const base = { borderRadius:'var(--radius-lg)', border:'1px solid var(--border)', overflow:'hidden' };
  if (level === 2) return { ...base, background:'var(--surface-raised)',
    backdropFilter:'blur(var(--blur-md))', WebkitBackdropFilter:'blur(var(--blur-md))',
    boxShadow:'var(--shadow-sm)' };
  if (level === 3) return { ...base, background:'var(--surface-solid)', boxShadow:'var(--shadow-md)' };
  return { ...base, background:'var(--surface)',
    backdropFilter:'blur(var(--blur-sm))', WebkitBackdropFilter:'blur(var(--blur-sm))' };
}

export const glassCard      = getGlassCardStyle(1);
export const raisedGlassCard = getGlassCardStyle(2);
export const solidCard       = getGlassCardStyle(3);

export function onCardHover(e) {
  e.currentTarget.style.borderColor = 'var(--border-strong)';
  e.currentTarget.style.boxShadow   = 'var(--shadow-sm)';
}
export function onCardHoverEnd(e) {
  e.currentTarget.style.borderColor = 'var(--border)';
  e.currentTarget.style.boxShadow   = 'none';
}
```

### Chart components (Recharts)

```jsx
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar,
         LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const CHART_COLORS = ['var(--accent)','var(--accent2)','var(--success)','var(--warning)'];

export const axisProps = { tick:{fill:'var(--text-subtle)',fontSize:11},
  tickLine:false, axisLine:false };
export const gridProps = { strokeDasharray:'3 3', stroke:'var(--border)', vertical:false };

export function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'var(--surface-solid)', border:'1px solid var(--border-strong)',
      borderRadius:'var(--radius-md)', padding:'10px 14px',
      fontSize:'var(--text-xs)', boxShadow:'var(--shadow-sm)' }}>
      {label && <div style={{ fontSize:11, color:'var(--text-muted)',
        marginBottom:'var(--space-2)', fontWeight:600, lineHeight:1.3 }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ display:'flex', alignItems:'center',
          gap:'var(--space-2)', marginBottom:i < payload.length-1 ? 4 : 0 }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:p.color }} />
          <span style={{ color:'var(--text-muted)' }}>{p.name}:</span>
          <span style={{ fontWeight:600, color:'var(--text)' }}>
            {formatter ? formatter(p.value) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ChartContainer({ title, subtitle, height=220, level=1, children }) {
  const cardStyle = getGlassCardStyle(level);
  return (
    <div style={{ ...cardStyle, padding:'var(--space-5) var(--space-4) var(--space-3)' }}>
      {title && (
        <div style={{ marginBottom:'var(--space-3)' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)',
            lineHeight:1.2, color:'var(--text)', marginBottom:2 }}>{title}</div>
          {subtitle && <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)',
            lineHeight:1.5 }}>{subtitle}</div>}
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>{children}</ResponsiveContainer>
    </div>
  );
}
```

### NavItem.jsx

```jsx
// Import icons: import { Dashboard, List, User, Settings } from 'iconoir-react';
export function NavItem({ icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      width:'100%', padding:'10px 12px', borderRadius:'var(--radius)',
      border:'none', textAlign:'left',
      background:active ? 'var(--accent-dim)' : 'transparent',
      color:active ? 'var(--accent)' : 'var(--text-muted)',
      fontSize:'var(--text-sm)', fontWeight:active ? 600 : 500, lineHeight:1.4,
      transition:'background var(--transition-fast), color var(--transition-fast)',
    }}
    onMouseEnter={e => { if (!active) {
      e.currentTarget.style.background='var(--surface-hover)';
      e.currentTarget.style.color='var(--text)';
    }}}
    onMouseLeave={e => { if (!active) {
      e.currentTarget.style.background='transparent';
      e.currentTarget.style.color='var(--text-muted)';
    }}}>
      <span style={{ display:'flex', alignItems:'center', gap:'var(--space-3)' }}>
        <span style={{ display:'inline-flex', alignItems:'center',
          justifyContent:'center', width:16, height:16, flexShrink:0 }}>
          {icon}
        </span>
        {label}
      </span>
      {badge != null && (
        <span style={{ fontSize:10, fontWeight:700, lineHeight:1, padding:'2px 6px',
          background:'var(--accent-dim)', color:'var(--accent)',
          borderRadius:'var(--radius-full)' }}>{badge}</span>
      )}
    </button>
  );
}
```

---

## 8. ModeToggle.jsx

```jsx
import { useEffect, useState } from 'react';
import { SunLight, HalfMoon } from 'iconoir-react';

export function ModeToggle() {
  const [mode, setMode] = useState(() => localStorage.getItem('ralph-theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ralph-theme', next);
    setMode(next);
  };

  return (
    <button onClick={toggle} aria-label="Toggle color mode" style={{
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      gap:'var(--space-2)', height:40, padding:'0 var(--space-4)',
      background:'var(--surface)', border:'1px solid var(--border)',
      borderRadius:'var(--radius-md)', color:'var(--text-muted)',
      fontSize:'var(--text-sm)',
      backdropFilter:'blur(var(--blur-sm))',
      WebkitBackdropFilter:'blur(var(--blur-sm))',
      transition:'background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background='var(--surface-hover)';
      e.currentTarget.style.borderColor='var(--border-strong)';
      e.currentTarget.style.color='var(--text)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background='var(--surface)';
      e.currentTarget.style.borderColor='var(--border)';
      e.currentTarget.style.color='var(--text-muted)';
    }}>
      {mode === 'dark'
        ? <><SunLight width={16} height={16} strokeWidth={1.5} /> Light</>
        : <><HalfMoon width={16} height={16} strokeWidth={1.5} /> Dark</>}
    </button>
  );
}
```

---

## 9. AI-Native Patterns

Apply based on the AI-UX mode from Phase 3:
- `AMBIENT` (default) — skeleton loaders, optimistic updates, smart empty states, ambient indicator
- `CONVERSATIONAL` — add streaming text and typing indicator

### SkeletonLoader.jsx

Replaces every spinner. Shape mirrors the content that is loading so the user knows what is coming.

```jsx
export function SkeletonRow({ cols = 4 }) {
  return (
    <tr style={{ borderBottom:'1px solid var(--border)' }}>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} style={{ padding:'12px 16px' }}>
          <div style={{
            height:13,
            borderRadius:'var(--radius-sm)',
            background:'var(--surface-raised)',
            width: i === 0 ? '60%' : i === cols - 1 ? '40%' : '80%',
            position:'relative',
            overflow:'hidden',
          }}>
            <div style={{
              position:'absolute', inset:0,
              background:'linear-gradient(90deg, transparent 0%, var(--surface-hover) 50%, transparent 100%)',
              animation:'shimmer 1.4s infinite',
            }} />
          </div>
        </td>
      ))}
    </tr>
  );
}

export function SkeletonCard() {
  return (
    <div style={{ ...glassCard, padding:'var(--space-5)' }}>
      {[80, 40, 60].map((w, i) => (
        <div key={i} style={{
          height: i === 0 ? 32 : 13,
          width:`${w}%`,
          borderRadius:'var(--radius-sm)',
          background:'var(--surface-raised)',
          marginBottom: i < 2 ? 'var(--space-3)' : 0,
          position:'relative', overflow:'hidden',
        }}>
          <div style={{
            position:'absolute', inset:0,
            background:'linear-gradient(90deg, transparent 0%, var(--surface-hover) 50%, transparent 100%)',
            animation:`shimmer 1.4s ${i * 0.15}s infinite`,
          }} />
        </div>
      ))}
    </div>
  );
}
```

### useOptimisticList.js

List items appear instantly on POST. Roll back gracefully on error. No waiting for the round trip.

```js
import { useState, useCallback } from 'react';

export function useOptimisticList(initialItems = []) {
  const [items, setItems] = useState(initialItems);

  const addOptimistic = useCallback(async (newItem, saveFn) => {
    // Generate a temporary ID so the item can be found and replaced/removed
    const tempId = `temp-${Date.now()}`;
    const optimistic = { ...newItem, id: tempId, _saving: true };

    setItems(prev => [optimistic, ...prev]);

    try {
      const saved = await saveFn(newItem);
      // Replace the optimistic item with the real saved record
      setItems(prev => prev.map(item => item.id === tempId ? saved : item));
      return saved;
    } catch (err) {
      // Roll back — remove the optimistic item
      setItems(prev => prev.filter(item => item.id !== tempId));
      throw err;
    }
  }, []);

  const removeOptimistic = useCallback(async (id, deleteFn) => {
    // Mark as deleting for UI feedback
    setItems(prev => prev.map(item => item.id === id ? { ...item, _deleting: true } : item));

    try {
      await deleteFn(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      // Roll back the deletion
      setItems(prev => prev.map(item => item.id === id ? { ...item, _deleting: false } : item));
      throw err;
    }
  }, []);

  return { items, setItems, addOptimistic, removeOptimistic };
}
```

### SmartEmptyState.jsx

Reads context and suggests the first real action. Uses the entity name as placeholder text.

```jsx
import { Plus } from 'iconoir-react';

export function SmartEmptyState({ entity, onAdd, exampleName }) {
  // entity: e.g. "invoice", exampleName: e.g. first client name from seed data
  const label = entity.charAt(0).toUpperCase() + entity.slice(1);
  const suggestion = exampleName ? `Create one for ${exampleName}?` : `Create your first ${entity}.`;

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
      justifyContent:'center', padding:'var(--space-16) var(--space-6)',
      gap:'var(--space-3)', textAlign:'center', animation:'fadeIn 0.4s ease' }}>
      <span style={{ color:'var(--text-subtle)', opacity:0.35, fontSize:36 }}>◌</span>
      <div style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-2xl)',
        color:'var(--text-muted)', lineHeight:1.2 }}>
        No {entity}s yet
      </div>
      <div style={{ fontSize:'var(--text-sm)', color:'var(--text-subtle)',
        maxWidth:300, lineHeight:1.6 }}>
        {suggestion}
      </div>
      {onAdd && (
        <button onClick={onAdd} style={{
          display:'inline-flex', alignItems:'center', gap:'var(--space-2)',
          marginTop:'var(--space-2)', background:'var(--accent)',
          color:'var(--accent-fg)', border:'none', borderRadius:'var(--radius)',
          padding:'9px 18px', fontSize:'var(--text-sm)', fontWeight:600, cursor:'pointer',
        }}>
          <Plus width={16} height={16} strokeWidth={2} />
          New {label}
        </button>
      )}
    </div>
  );
}
```

### AmbientIndicator.jsx

Subtle pulse in the nav when background work is in flight. Not a blocking spinner. Not a modal.

```jsx
export function AmbientIndicator({ active, label = 'Saving…' }) {
  if (!active) return null;

  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:'var(--space-2)',
      fontSize:'var(--text-xs)', color:'var(--text-subtle)',
      animation:'fadeIn 0.2s ease',
    }}>
      <span style={{
        width:6, height:6, borderRadius:'50%',
        background:'var(--accent2)',
        animation:'pulse 1.2s ease infinite',
      }} />
      {label}
    </div>
  );
}
```

### StreamingText.jsx (CONVERSATIONAL mode only)

Text renders word by word — not dumped all at once.

```jsx
import { useState, useEffect } from 'react';

export function StreamingText({ text, speed = 18, onComplete }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    if (!text) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval);
        onComplete?.();
        return;
      }
      setDisplayed(text.slice(0, i + 1));
      i++;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span style={{ whiteSpace:'pre-wrap', lineHeight:'var(--leading-relaxed)' }}>
      {displayed}
      {displayed.length < (text?.length ?? 0) && (
        <span style={{
          display:'inline-block', width:2, height:'1em',
          background:'var(--accent)', marginLeft:1,
          animation:'pulse 0.8s ease infinite', verticalAlign:'text-bottom',
        }} />
      )}
    </span>
  );
}
```

### TypingIndicator.jsx (CONVERSATIONAL mode only)

Three-dot pulse while waiting for a response.

```jsx
export function TypingIndicator() {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:'var(--space-1)',
      padding:'10px 14px', background:'var(--surface)',
      border:'1px solid var(--border)', borderRadius:'var(--radius-lg)',
      width:'fit-content' }}>
      {[0, 0.2, 0.4].map((delay, i) => (
        <span key={i} style={{
          width:6, height:6, borderRadius:'50%',
          background:'var(--text-subtle)',
          animation:`pulse 1.2s ${delay}s ease infinite`,
        }} />
      ))}
    </div>
  );
}
```

---

## Usage Principles

### Accent usage
- Use coral for primary CTA, active nav, selected states, and key KPI emphasis.
- Use cyan for charts, informational UI, secondary emphasis, and supporting highlights.
- Do not place coral on every border, badge, metric, and button in the same section.

### Icon usage
- Default strokeWidth: 1.5 for UI, 2 for emphasis
- Default size: 16px inline, 20px standalone
- Always add aria-label when the button contains only an icon

### Typography usage
- Use Instrument Serif for page titles, section titles, major metrics, and card headings.
- Use Inter for navigation, tables, forms, controls, chart labels, and body text.
- Avoid ad hoc sizes outside the defined token scale.

### Surface usage
- surface-1 for default cards
- surface-2 for raised or featured panels
- surface-3 for solid, dense, or modal-like surfaces
- Do not apply the heaviest blur to every component

### AI-UX usage
- AMBIENT: always use SkeletonLoader, useOptimisticList, SmartEmptyState, AmbientIndicator
- CONVERSATIONAL: add StreamingText, TypingIndicator to any AI response surface
- Never use a blocking spinner for data fetching — always skeleton instead

---

*v1.0.0 · Swami Chandrasekaran*
