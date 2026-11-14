"use client";
import { useId, useState } from "react";
import { motion } from "motion/react";
import { FiInbox } from "react-icons/fi";

export const hasData = (arr) => Array.isArray(arr) && arr.length > 0 && arr.some((d) => (d.value ?? 0) > 0);

export function EmptyState({ title = "Nothing to show yet", hint, icon: Icon = FiInbox, className = "" }) {
  return (
    <div className={`grid place-items-center rounded-2xl border border-dashed border-slate-200 px-6 py-10 text-center ${className}`}>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-400"><Icon className="h-5 w-5" aria-hidden /></span>
      <p className="mt-3 text-sm font-semibold text-slate-700">{title}</p>
      {hint && <p className="mt-1 max-w-[34ch] text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

/* ---------- Sparkline ---------- */
export function Sparkline({ data = [], color = "#12A08A", width = 96, height = 32 }) {
  if (data.length < 2) return <span style={{ width, height }} aria-hidden />;
  const lo = Math.min(...data), hi = Math.max(...data);
  const pts = data.map((v, i) => [(i * (width - 4)) / (data.length - 1) + 2, height - 4 - ((v - lo) / (hi - lo || 1)) * (height - 8)]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <motion.path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.3 }} />
    </svg>
  );
}

/* ---------- Area / line chart ---------- */
export function AreaChart({ data, color = "#12A08A", height = 220, min, max, format = (v) => v, unit = "" }) {
  const gid = useId().replace(/:/g, "");
  const [hover, setHover] = useState(null);
  const W = 640, H = height, P = { l: 40, r: 14, t: 14, b: 28 };
  const vals = data.map((d) => d.value);
  const lo = min ?? Math.floor(Math.min(...vals) * 0.96);
  const hi = max ?? Math.ceil(Math.max(...vals) * 1.02);
  const x = (i) => P.l + (i * (W - P.l - P.r)) / Math.max(1, data.length - 1);
  const y = (v) => P.t + (1 - (v - lo) / (hi - lo || 1)) * (H - P.t - P.b);
  const pts = data.map((d, i) => [x(i), y(d.value)]);
  const line = pts.map(([px, py], i) => {
    if (!i) return `M${px},${py}`;
    const mx = (pts[i - 1][0] + px) / 2;
    return `C${mx},${pts[i - 1][1]} ${mx},${py} ${px},${py}`;
  }).join(" ");
  const area = `${line} L${x(data.length - 1)},${H - P.b} L${x(0)},${H - P.b} Z`;
  const ticks = [0, 1, 2, 3].map((t) => lo + ((hi - lo) * t) / 3);
  const every = Math.ceil(data.length / 6);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const rel = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((rel - P.l) / (W - P.l - P.r)) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" onPointerMove={onMove} onPointerLeave={() => setHover(null)} role="img" aria-label="Trend chart">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity=".28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="#E2E8F0" strokeDasharray="4 6" />
            <text x={P.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#94A3B8">{format(Math.round(t))}</text>
          </g>
        ))}
        <motion.path key={`a${line}`} d={area} fill={`url(#${gid})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }} />
        <motion.path key={`l${line}`} d={line} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }} />
        {data.map((d, i) => i % every === 0 && (
          <text key={d.label + i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#94A3B8">{d.label}</text>
        ))}
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} stroke={color} strokeOpacity=".35" />
            <circle cx={x(hover)} cy={y(data[hover].value)} r="5.5" fill="#fff" stroke={color} strokeWidth="3" />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div className="pointer-events-none absolute top-1 -translate-x-1/2 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs text-white shadow-lg" style={{ left: `${(x(hover) / W) * 100}%` }}>
          <span className="text-slate-300">{data[hover].label}</span> <b>{format(data[hover].value)}{unit}</b>
        </div>
      )}
    </div>
  );
}

/* ---------- Vertical bar chart ---------- */
export function BarChart({ data, height = 230, color = "#12A08A", format = (v) => v, max, target }) {
  const [hover, setHover] = useState(null);
  const W = 520, H = height, P = { l: 8, r: 8, t: 26, b: 30 };
  const n = data.length, slot = (W - P.l - P.r) / n, bw = Math.min(54, slot * 0.58);
  const hi = max ?? Math.max(...data.map((d) => d.value), target ?? 0) * 1.18;
  const base = H - P.b;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Bar chart">
      <line x1={P.l} x2={W - P.r} y1={base} y2={base} stroke="#E2E8F0" />
      {target && (
        <g>
          <line x1={P.l} x2={W - P.r} y1={base - (target / hi) * (base - P.t)} y2={base - (target / hi) * (base - P.t)} stroke="#94A3B8" strokeDasharray="4 5" />
        </g>
      )}
      {data.map((d, i) => {
        const h = (d.value / hi) * (base - P.t);
        const bx = P.l + slot * i + (slot - bw) / 2;
        const dim = hover !== null && hover !== i;
        return (
          <g key={d.label} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} style={{ cursor: "default" }}>
            <rect x={P.l + slot * i} y={0} width={slot} height={H} fill="transparent" />
            <motion.rect x={bx} width={bw} rx="9" fill={d.color ?? color} opacity={dim ? 0.35 : 1}
              initial={{ y: base, height: 0 }} animate={{ y: base - h, height: Math.max(h, 0) }}
              transition={{ duration: 0.8, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }} />
            <motion.text x={bx + bw / 2} y={base - h - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155"
              initial={{ opacity: 0 }} animate={{ opacity: dim ? 0.3 : 1 }} transition={{ delay: 0.5 + 0.08 * i }}>{format(d.value)}</motion.text>
            <text x={bx + bw / 2} y={H - 9} textAnchor="middle" fontSize="11" fill="#64748B">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Donut ---------- */
export function Donut({ segments, centerValue, centerLabel, size = 168, format = (v) => v }) {
  const [hover, setHover] = useState(null);
  const r = 62, C = 2 * Math.PI * r, total = segments.reduce((s, x) => s + x.value, 0) || 1, gap = 4;
  let acc = 0;
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 160 160" width={size} height={size} className="-rotate-90" role="img" aria-label="Distribution chart">
          <circle cx="80" cy="80" r={r} fill="none" stroke="#F1F5F9" strokeWidth="20" />
          {segments.map((s, i) => {
            const len = (s.value / total) * C;
            const off = acc; acc += len;
            return (
              <motion.circle key={s.label} cx="80" cy="80" r={r} fill="none" stroke={s.color} strokeWidth="20" strokeLinecap="butt"
                strokeDashoffset={-off} opacity={hover !== null && hover !== i ? 0.3 : 1}
                initial={{ strokeDasharray: `0 ${C}` }} animate={{ strokeDasharray: `${Math.max(len - gap, 0.1)} ${C}` }}
                transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }} />
            );
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-lg font-bold leading-none text-slate-900">{hover !== null ? format(segments[hover].value) : centerValue}</p>
            <p className="mt-1 max-w-[80px] text-[11px] leading-tight text-slate-500">{hover !== null ? segments[hover].label : centerLabel}</p>
          </div>
        </div>
      </div>
      <ul className="w-full space-y-2">
        {segments.map((s, i) => (
          <li key={s.label} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-slate-600"><span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />{s.label}</span>
            <span className="font-semibold text-slate-900">{format(s.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Progress ring ---------- */
export function Ring({ value, max, color, size = 112, stroke = 10, label, sub }) {
  const ratio = max ? Math.min(1, value / max) : 0;
  const r = (size - stroke) / 2;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={stroke} />
          <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: ratio }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <p className="text-2xl font-bold text-slate-900">{label}</p>
        </div>
      </div>
      {sub}
    </div>
  );
}

/* ---------- Horizontal progress rows ---------- */
export function ProgressRows({ rows, max, color = "#12A08A", format = (v) => v }) {
  const hi = max ?? Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="space-y-3.5">
      {rows.map((r, i) => (
        <li key={r.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate font-medium text-slate-700">{r.label}{r.sub && <span className="ml-2 text-xs font-normal text-slate-400">{r.sub}</span>}</span>
            <span className="font-semibold text-slate-900">{format(r.value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div className="h-full rounded-full" style={{ background: r.color ?? color }}
              initial={{ width: 0 }} animate={{ width: `${(r.value / hi) * 100}%` }} transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
