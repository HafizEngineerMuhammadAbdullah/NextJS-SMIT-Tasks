"use client";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { Panel } from "@/components/dashboard/Panel";
import CountUp from "@/components/dashboard/CountUp";
import { Sparkline } from "@/components/dashboard/Charts";

// goodWhen: which direction of change is good news ("down" for attrition or late arrivals).
export default function KpiCard({ label, value, format, delta, goodWhen = "up", sub, spark, color = "#12A08A", icon: Icon }) {
  const good = delta === null || delta === undefined ? null : goodWhen === "up" ? delta >= 0 : delta <= 0;
  const Arrow = delta >= 0 ? FiArrowUpRight : FiArrowDownRight;
  return (
    <Panel bodyClass="!p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-[28px] font-bold leading-none tracking-tight text-slate-900"><CountUp value={value} format={format} /></p>
        </div>
        {Icon && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: `${color}1A`, color }}>
            <Icon className="h-[18px] w-[18px]" aria-hidden />
          </span>
        )}
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        {delta !== null && delta !== undefined ? (
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${good ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
            <Arrow className="h-3.5 w-3.5" aria-hidden />{Math.abs(delta)}%<span className="font-normal text-slate-500"> vs last period</span>
          </span>
        ) : (
          <span className="text-xs text-slate-500">{sub ?? "No history yet"}</span>
        )}
        <Sparkline data={spark} color={color} />
      </div>
    </Panel>
  );
}
