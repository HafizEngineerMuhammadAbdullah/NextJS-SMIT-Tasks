"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiCalendar, FiClock, FiDownload, FiDollarSign, FiLogIn, FiLogOut, FiCheckCircle, FiSun } from "react-icons/fi";
import { useDashboard } from "@/context/DashboardContext";
import Hero from "@/components/dashboard/Hero";
import KpiCard from "@/components/dashboard/KpiCard";
import { Panel, Stagger } from "@/components/dashboard/Panel";
import CountUp from "@/components/dashboard/CountUp";
import { BarChart, EmptyState, Ring, hasData } from "@/components/dashboard/Charts";
import { fmtTime, pkr, pkrCompact } from "@/lib/format";

const pad = (n) => String(n).padStart(2, "0");
const LATE_AFTER = 9 * 60 + 15; // brief: late after 09:15

// Demo check-in: the time comes from the browser. In the real build the SERVER stamps it
// (second check-in in a day returns 409) and camera + location are checked there too.
function CheckInCard() {
  const [now, setNow] = useState(null);
  const [rec, setRec] = useState({ inAt: null, outAt: null });
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const checkedIn = !!rec.inAt && !rec.outAt;
  const done = !!rec.inAt && !!rec.outAt;
  const late = rec.inAt && rec.inAt.getHours() * 60 + rec.inAt.getMinutes() > LATE_AFTER;
  const ms = rec.inAt ? Math.max(0, (rec.outAt ?? now ?? rec.inAt) - rec.inAt) : 0;
  const worked = `${Math.floor(ms / 3600000)}h ${pad(Math.floor((ms % 3600000) / 60000))}m`;

  return (
    <div className="w-full rounded-2xl bg-white/[0.08] p-5 ring-1 ring-white/10 sm:w-[320px]">
      <p className="text-xs font-medium text-slate-300">Today&apos;s attendance</p>
      <p className="mt-1 font-bold tabular-nums tracking-tight text-white" style={{ fontSize: 34 }} suppressHydrationWarning>
        {now ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` : "--:--:--"}
      </p>
      <div className="relative mt-4">
        {checkedIn && (
          <motion.span aria-hidden className="absolute inset-0 rounded-full bg-rose-400/40" animate={{ scale: [1, 1.12], opacity: [0.7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }} />
        )}
        <motion.button type="button" whileTap={{ scale: 0.97 }} disabled={done}
          onClick={() => setRec((r) => (r.inAt ? { ...r, outAt: new Date() } : { inAt: new Date(), outAt: null }))}
          className={`relative flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-70 ${checkedIn ? "bg-rose-500 text-white hover:bg-rose-400" : done ? "bg-white/15 text-white" : "bg-[color:var(--accent)] text-[color:var(--on-accent)] hover:brightness-110"}`}>
          {done ? <FiCheckCircle className="h-4 w-4" aria-hidden /> : checkedIn ? <FiLogOut className="h-4 w-4" aria-hidden /> : <FiLogIn className="h-4 w-4" aria-hidden />}
          {done ? "Done for today" : checkedIn ? "Check out" : "Check in"}
        </motion.button>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={done ? "d" : checkedIn ? "i" : "n"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 text-xs text-slate-300" aria-live="polite">
          {!rec.inAt && <p>You haven&apos;t checked in yet. Late means after 09:15.</p>}
          {rec.inAt && (
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              In at <b className="text-white">{fmtTime(rec.inAt)}</b>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${late ? "bg-amber-400/20 text-amber-300" : "bg-emerald-400/20 text-emerald-300"}`}>{late ? "Late" : "On time"}</span>
              · {done ? `Out at ${fmtTime(rec.outAt)} · ` : "Working "}<b className="text-white">{worked}</b>
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function EmployeeDashboard({ data }) {
  const { profile, applied } = useDashboard();
  const key = `${applied?.range}-${applied?.dept}`;
  const total = +data.week.reduce((s, d) => s + d.value, 0).toFixed(1);
  const leaveLeft = data.leave.reduce((s, l) => s + (l.quota - l.used), 0);
  const p = data.payslip;

  return (
    <div className="space-y-5">
      <Hero profile={profile} title="Your work at a glance"><CheckInCard /></Hero>

      <Stagger key={key} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Hours this week" icon={FiClock} color="#12A08A" value={total} format={(v) => `${v.toFixed(1)}h`} sub={`of ${data.weekTarget}h target`} spark={data.week.map((d) => d.value)} />
          <KpiCard label="Late arrivals" icon={FiSun} color="#F43F5E" goodWhen="down" value={data.lateCount} sub="This month" />
          <KpiCard label="Leave days left" icon={FiCalendar} color="#6D5DF0" value={leaveLeft} sub="Annual, sick and casual" />
          <KpiCard label="Last net pay" icon={FiDollarSign} color="#E8962E" value={p?.net ?? 0} format={pkrCompact} sub={p ? p.month : "No payslip yet"} />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Panel title="Hours this week" subtitle="Dashed line is the 8 hour day" className="lg:col-span-2">
            {hasData(data.week) ? (
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <Ring value={total} max={data.weekTarget} color="#12A08A" size={132} label={`${total}h`} sub={<p className="mt-2 text-xs text-slate-500">of {data.weekTarget}h</p>} />
                <div className="w-full flex-1"><BarChart data={data.week} height={200} target={8} format={(v) => (v ? `${v}` : "")} /></div>
              </div>
            ) : <EmptyState title="No check-ins this week" hint="Check in from the card above to start tracking hours." />}
          </Panel>

          <Panel title="Announcements" subtitle="From Admin and HR">
            {data.announcements.length ? (
              <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }} className="space-y-4">
                {data.announcements.map((a) => (
                  <motion.li key={a.id} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                    <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{a.body}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{a.by} · {a.time}</p>
                  </motion.li>
                ))}
              </motion.ul>
            ) : <EmptyState title="No announcements" />}
          </Panel>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Panel title="Leave balance" subtitle="Days left this year" className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {data.leave.map((l) => (
                <Ring key={l.type} value={l.quota - l.used} max={l.quota} color={l.color} label={l.quota - l.used}
                  sub={<div className="mt-2"><p className="text-sm font-semibold text-slate-900">{l.label}</p><p className="text-xs text-slate-500">{l.used} of {l.quota} used</p></div>} />
              ))}
            </div>
          </Panel>

          <Panel title="Last payslip" subtitle={p?.month}>
            {p ? (
              <div>
                <p className="text-3xl font-bold tracking-tight text-slate-900"><CountUp value={p.net} format={pkr} /></p>
                <p className="text-xs text-slate-500">Net pay</p>
                <dl className="mt-4 space-y-2 text-sm">
                  {[["Basic", p.basic], ["Allowances", p.allowances], ["Gross", p.gross], ["Tax", -p.tax], ["Deductions", -p.deductions]].map(([label, v]) => (
                    <div key={label} className="flex justify-between"><dt className="text-slate-500">{label}</dt><dd className="font-semibold text-slate-800">{v < 0 ? "−" : ""}{pkr(Math.abs(v))}</dd></div>
                  ))}
                </dl>
                <button type="button" disabled title="PDF download arrives with the payroll module" className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-500">
                  <FiDownload className="h-4 w-4" aria-hidden />Download PDF
                </button>
              </div>
            ) : <EmptyState title="No payslip yet" hint="Payslips appear after Admin finalizes a payroll month." />}
          </Panel>
        </div>
      </Stagger>
    </div>
  );
}
