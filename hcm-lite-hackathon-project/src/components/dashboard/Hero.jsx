"use client";
import { motion } from "motion/react";
import { fmtDate, greeting } from "@/lib/format";
import { ROLE_META } from "@/lib/constants";

// The one navy band on every dashboard. Teal circles come from the brief's cover art.
export default function Hero({ profile, title, children, aside }) {
  const meta = ROLE_META[profile.role];
  return (
    <motion.section initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[24px] bg-[#1C2640] px-6 py-7 text-white sm:px-8">
      <motion.div aria-hidden className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#12A08A]/25" animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div aria-hidden className="absolute -right-2 -top-6 h-40 w-40 rounded-full bg-[color:var(--accent)]/30" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      <div className="relative flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="inline-block rounded-full bg-[color:var(--accent)] px-3 py-1 text-xs font-bold text-[color:var(--on-accent)]">{meta.label}</span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-[32px]">{greeting()}, {profile.firstName}</h1>
          <p className="mt-1 text-sm text-slate-300">{title} · {fmtDate()}</p>
          {aside}
        </div>
        {children}
      </div>
    </motion.section>
  );
}
