"use client";
import { motion } from "motion/react";

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// <Stagger> orchestrates the page-load reveal; every <Panel> inside it is one step in the sequence.
export function Stagger({ children, className = "" }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className={className}>
      {children}
    </motion.div>
  );
}

export function Panel({ title, subtitle, action, children, className = "", bodyClass = "" }) {
  return (
    <motion.section variants={item} className={`rounded-[20px] border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,.04)] ${className}`}>
      {(title || action) && (
        <header className="flex items-start justify-between gap-3 px-5 pt-5">
          <div>
            <h2 className="text-[15px] font-bold text-slate-900">{title}</h2>
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={`p-5 ${title ? "pt-4" : ""} ${bodyClass}`}>{children}</div>
    </motion.section>
  );
}
