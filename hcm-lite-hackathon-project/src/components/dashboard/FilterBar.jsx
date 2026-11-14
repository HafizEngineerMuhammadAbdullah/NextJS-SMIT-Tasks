"use client";
import { motion } from "motion/react";
import { FiChevronDown } from "react-icons/fi";
import { DEPARTMENTS, RANGES } from "@/lib/dashboard/demoData";
import { useDashboard } from "@/context/DashboardContext";

// Date range + department. Both change the numbers on the server side in the real build (brief: M7).
export default function FilterBar() {
  const { filters, setFilters } = useDashboard();
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <div role="radiogroup" aria-label="Date range" className="flex rounded-full bg-white/10 p-1">
        {RANGES.map((r) => {
          const active = filters.range === r.id;
          return (
            <button key={r.id} type="button" role="radio" aria-checked={active} onClick={() => setFilters((f) => ({ ...f, range: r.id }))}
              className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white ${active ? "text-[color:var(--on-accent)]" : "text-slate-300 hover:text-white"}`}>
              {active && <motion.span layoutId="range-pill" className="absolute inset-0 rounded-full bg-[color:var(--accent)]" transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
              <span className="relative">{r.label}</span>
            </button>
          );
        })}
      </div>
      <label className="relative">
        <span className="sr-only">Department</span>
        <select value={filters.dept} onChange={(e) => setFilters((f) => ({ ...f, dept: e.target.value }))}
          className="appearance-none rounded-full bg-white/10 py-2 pl-4 pr-9 text-xs font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-white">
          <option value="all" className="text-slate-900">All departments</option>
          {DEPARTMENTS.map((d) => <option key={d.id} value={d.id} className="text-slate-900">{d.name}</option>)}
        </select>
        <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-300" aria-hidden />
      </label>
    </div>
  );
}
