"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiLoader, FiZap } from "react-icons/fi";
import { Panel } from "@/components/dashboard/Panel";
import { summarize } from "@/lib/dashboard/assistant";

// Brief: "Summarize" sends the KPI JSON for the current filters and returns 3-5 bullets using only those numbers.
export default function AiSummary({ data, resetKey }) {
  const [phase, setPhase] = useState("idle");
  const [bullets, setBullets] = useState([]);

  useEffect(() => { setPhase("idle"); setBullets([]); }, [resetKey]);

  const run = () => {
    setPhase("loading");
    setTimeout(() => { setBullets(summarize(data)); setPhase("done"); }, 900);
  };

  return (
    <Panel title="AI summary" subtitle="Uses only the numbers on this page"
      action={<span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">AI-generated</span>}>
      <AnimatePresence mode="wait" initial={false}>
        {phase === "idle" && (
          <motion.div key="idle" exit={{ opacity: 0 }} className="py-2">
            <p className="text-sm text-slate-500">Get 3 to 5 plain-language insights for the current filters.</p>
            <button type="button" onClick={run} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-bold text-[color:var(--on-accent)] outline-none hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2">
              <FiZap className="h-4 w-4" aria-hidden />Summarize
            </button>
          </motion.div>
        )}
        {phase === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 py-2" role="status">
            <p className="flex items-center gap-2 text-sm text-slate-500"><FiLoader className="h-4 w-4 animate-spin" aria-hidden />Reading your numbers…</p>
            {[90, 75, 82].map((w, i) => <div key={i} className="h-3 animate-pulse rounded bg-slate-200" style={{ width: `${w}%` }} />)}
          </motion.div>
        )}
        {phase === "done" && (
          <motion.ul key="done" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.18 } } }} className="space-y-3">
            {bullets.map((b, i) => (
              <motion.li key={i} variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />{b}
              </motion.li>
            ))}
            <li><button type="button" onClick={run} className="mt-1 text-xs font-semibold text-slate-500 underline-offset-4 hover:underline">Refresh summary</button></li>
          </motion.ul>
        )}
      </AnimatePresence>
    </Panel>
  );
}
