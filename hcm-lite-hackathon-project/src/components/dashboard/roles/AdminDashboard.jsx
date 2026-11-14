"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { FiBriefcase, FiDollarSign, FiTrendingDown, FiUsers } from "react-icons/fi";
import { useDashboard } from "@/context/DashboardContext";
import Hero from "@/components/dashboard/Hero";
import FilterBar from "@/components/dashboard/FilterBar";
import KpiCard from "@/components/dashboard/KpiCard";
import AiSummary from "@/components/dashboard/AiSummary";
import { Panel, Stagger } from "@/components/dashboard/Panel";
import { AreaChart, BarChart, Donut, EmptyState, ProgressRows, hasData } from "@/components/dashboard/Charts";
import { initials, pkrCompact } from "@/lib/format";

const NO_DATA = "Register employees to start seeing this.";

export default function AdminDashboard({ data }) {
  const { profile, applied } = useDashboard();
  const k = data.kpis;
  const key = `${applied?.range}-${applied?.dept}`;
  const payTotal = data.payrollByDept.reduce((s, d) => s + d.value, 0);
  const genderTotal = data.gender.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-5">
      <Hero profile={profile} title="Company overview"><FilterBar /></Hero>

      <Stagger key={key} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Headcount" icon={FiUsers} color="#6D5DF0" value={k.headcount.value} delta={k.headcount.delta} spark={k.headcount.spark} />
          <KpiCard label="Attrition YTD" icon={FiTrendingDown} color="#F43F5E" goodWhen="down" value={k.attrition.value} format={(v) => `${v.toFixed(1)}%`} delta={k.attrition.delta} spark={k.attrition.spark} />
          <KpiCard label="Monthly payroll cost" icon={FiDollarSign} color="#12A08A" value={k.payrollCost.value} format={pkrCompact} delta={k.payrollCost.delta} spark={k.payrollCost.spark} />
          <KpiCard label="Average salary" icon={FiBriefcase} color="#E8962E" value={k.avgSalary.value} format={pkrCompact} delta={k.avgSalary.delta} spark={k.avgSalary.spark} />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Panel title="Headcount trend" subtitle="Active and probation employees" className="lg:col-span-2">
            {hasData(data.headcountTrend) ? <AreaChart data={data.headcountTrend} color="#6D5DF0" /> : <EmptyState title="No headcount history yet" hint={NO_DATA} />}
          </Panel>
          <Panel title="Payroll cost by department" subtitle="Gross, per month">
            {hasData(data.payrollByDept)
              ? <Donut segments={data.payrollByDept} centerValue={pkrCompact(payTotal)} centerLabel="per month" format={pkrCompact} />
              : <EmptyState title="No payroll data yet" hint="Salary structures set by HR appear here." />}
          </Panel>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Panel title="Headcount by department" className="lg:col-span-2">
            {hasData(data.byDept) ? <BarChart data={data.byDept} /> : <EmptyState title="No departments yet" hint="Create departments in Company setup, then register employees." />}
          </Panel>
          <Panel title="Workforce mix" subtitle="Tenure and gender">
            {hasData(data.tenure) ? (
              <div className="space-y-6">
                <ProgressRows rows={data.tenure} color="#12A08A" />
                <div>
                  <p className="mb-3 text-xs font-semibold text-slate-500">Gender</p>
                  <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
                    {data.gender.map((g, i) => (
                      <motion.div key={g.label} style={{ background: g.color }} initial={{ width: 0 }} animate={{ width: `${(g.value / genderTotal) * 100}%` }} transition={{ duration: 0.9, delay: 0.2 + i * 0.1 }} />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-slate-600">
                    {data.gender.map((g) => <span key={g.label} className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: g.color }} />{g.label} {Math.round((g.value / genderTotal) * 100)}%</span>)}
                  </div>
                </div>
              </div>
            ) : <EmptyState title="No workforce data yet" hint={NO_DATA} />}
          </Panel>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Panel title="Audit feed" subtitle="Latest important actions" className="lg:col-span-2"
            action={<Link href="/dashboard/admin/audit-log" className="text-xs font-semibold text-slate-500 underline-offset-4 hover:underline">View all</Link>}>
            {data.audit.length ? (
              <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } } }} className="divide-y divide-slate-100">
                {data.audit.map((a, i) => (
                  <motion.li key={i} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }} className="flex items-center gap-3 py-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-600">{initials(a.actor)}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-slate-700"><b className="font-semibold text-slate-900">{a.actor}</b> · {a.action}</p>
                      <p className="truncate text-xs text-slate-500">{a.entity}</p>
                    </div>
                    <span className="shrink-0 text-xs text-slate-400">{a.time}</span>
                  </motion.li>
                ))}
              </motion.ul>
            ) : <EmptyState title="No activity yet" hint="Every create, update, approve and finalize action is logged here." />}
          </Panel>
          <AiSummary data={data} resetKey={key} />
        </div>
      </Stagger>
    </div>
  );
}
