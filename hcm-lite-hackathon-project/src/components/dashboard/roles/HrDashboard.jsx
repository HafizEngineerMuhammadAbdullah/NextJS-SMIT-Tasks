"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiCalendar, FiCheck, FiCheckSquare, FiClock, FiUserCheck, FiUsers, FiX } from "react-icons/fi";
import { useDashboard } from "@/context/DashboardContext";
import Hero from "@/components/dashboard/Hero";
import FilterBar from "@/components/dashboard/FilterBar";
import KpiCard from "@/components/dashboard/KpiCard";
import AiSummary from "@/components/dashboard/AiSummary";
import { Panel, Stagger } from "@/components/dashboard/Panel";
import { AreaChart, BarChart, Donut, EmptyState, ProgressRows, hasData } from "@/components/dashboard/Charts";
import { initials } from "@/lib/format";

const TYPE_STYLE = { Casual: "bg-amber-50 text-amber-700", Sick: "bg-rose-50 text-rose-700", Annual: "bg-violet-50 text-violet-700", Unpaid: "bg-slate-100 text-slate-600" };

export default function HrDashboard({ data }) {
  const { profile, applied } = useDashboard();
  const k = data.kpis;
  const key = `${applied?.range}-${applied?.dept}`;
  const [pending, setPending] = useState(data.pending);
  const [toast, setToast] = useState(null);
  useEffect(() => setPending(data.pending), [data]);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  // Real build: PATCH /leave/:id with { decision, comment }. The server re-checks role and data scope.
  const decide = (req, approved) => {
    setPending((list) => list.filter((r) => r.id !== req.id));
    setToast({ ok: approved, text: `${approved ? "Approved" : "Rejected"} ${req.name}'s ${req.type.toLowerCase()} leave` });
  };

  const leaveTotal = data.leaveByType.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-5">
      <Hero profile={profile} title="People operations" aside={
        data.onLeaveToday.length > 0 && (
          <div className="mt-4 flex items-center gap-3">
            <div className="flex -space-x-2">
              {data.onLeaveToday.slice(0, 5).map((p, i) => (
                <motion.span key={p.name} title={`${p.name}, ${p.type}`} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 400, damping: 20 }}
                  className="grid h-8 w-8 place-items-center rounded-full bg-white text-[10px] font-bold text-[#1C2640] ring-2 ring-[#1C2640]">{initials(p.name)}</motion.span>
              ))}
            </div>
            <p className="text-xs text-slate-300">{data.onLeaveToday.length} on leave today</p>
          </div>
        )
      }><FilterBar /></Hero>

      <Stagger key={key} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          <KpiCard label="Headcount" icon={FiUsers} color="#6D5DF0" value={k.headcount.value} spark={k.headcount.spark} sub="Active and probation" />
          <KpiCard label="Present today" icon={FiUserCheck} color="#12A08A" value={k.present.value} spark={k.present.spark} sub={`of ${k.headcount.value} employees`} />
          <KpiCard label="On leave" icon={FiCalendar} color="#38BDF8" value={k.onLeave.value} spark={k.onLeave.spark} sub="Approved leave today" />
          <KpiCard label="Late today" icon={FiClock} color="#F43F5E" goodWhen="down" value={k.late.value} spark={k.late.spark} sub="After 09:15" />
          <KpiCard label="Pending approvals" icon={FiCheckSquare} color="#E8962E" value={pending.length} sub="Leave requests" />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Panel title="Attendance trend" subtitle="Attendance rate" className="lg:col-span-2">
            {hasData(data.trend) ? <AreaChart data={data.trend} min={80} max={100} unit="%" /> : <EmptyState title="No attendance recorded yet" hint="Once employees check in, the daily rate shows up here." />}
          </Panel>
          <Panel title="Leave by type" subtitle="Approved days in this period">
            {hasData(data.leaveByType) ? <Donut segments={data.leaveByType} centerValue={leaveTotal} centerLabel="days" /> : <EmptyState title="No approved leave yet" />}
          </Panel>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Panel title="Absenteeism by department" subtitle="Absent days ÷ expected working days" className="lg:col-span-2">
            {hasData(data.absenteeism) ? <BarChart data={data.absenteeism} format={(v) => `${v}%`} /> : <EmptyState title="No absence data yet" />}
          </Panel>
          <Panel title="Top 5 late-comers" subtitle="Late arrivals in this period">
            {data.lateComers.length ? <ProgressRows rows={data.lateComers.map((l) => ({ label: l.name, sub: l.dept, value: l.count }))} color="#E8962E" format={(v) => `${v}×`} /> : <EmptyState title="Nobody has been late" hint="Late means after 09:15." />}
          </Panel>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Panel title="Leave requests" subtitle="Waiting for your decision" className="lg:col-span-2">
            {pending.length === 0 ? (
              <EmptyState icon={FiCheck} title="All caught up" hint="New requests from employees land here." />
            ) : (
              <ul className="divide-y divide-slate-100">
                <AnimatePresence initial={false} mode="popLayout">
                  {pending.map((r) => (
                    <motion.li key={r.id} layout exit={{ opacity: 0, x: 40, height: 0 }} transition={{ duration: 0.3 }} className="flex flex-wrap items-center gap-3 py-3.5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">{initials(r.name)}</span>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">{r.name}<span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${TYPE_STYLE[r.type]}`}>{r.type}</span></p>
                        <p className="truncate text-xs text-slate-500">{r.from} to {r.to} · {r.days} working day{r.days > 1 ? "s" : ""} · {r.reason}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => decide(r, false)} aria-label={`Reject ${r.name}'s request`} className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"><FiX className="h-4 w-4" /></button>
                        <button type="button" onClick={() => decide(r, true)} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[color:var(--accent)] px-4 text-sm font-bold text-[color:var(--on-accent)] hover:brightness-110"><FiCheck className="h-4 w-4" aria-hidden />Approve</button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </Panel>
          <AiSummary data={{ ...data, kpis: { ...k, pending: { ...k.pending, value: pending.length } } }} resetKey={key} />
        </div>
      </Stagger>

      <AnimatePresence>
        {toast && (
          <motion.div role="status" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl">
            <span className={`grid h-5 w-5 place-items-center rounded-full ${toast.ok ? "bg-emerald-500" : "bg-rose-500"}`}>{toast.ok ? <FiCheck className="h-3 w-3" /> : <FiX className="h-3 w-3" />}</span>
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
