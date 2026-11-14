"use client";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "motion/react";
import { NAV, hrefFor } from "@/lib/dashboard/nav";

// Placeholder for modules that aren't built yet (employees, leave, payroll ...).
export default function SectionPage() {
  const { role, section } = useParams();
  const item = NAV[role]?.find((n) => n.id === section);
  if (!item) notFound();
  const Icon = item.icon;
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid place-items-center rounded-[24px] border border-dashed border-slate-300 bg-white px-6 py-24 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[color:var(--accent)] text-[color:var(--on-accent)]"><Icon className="h-6 w-6" aria-hidden /></span>
      <h1 className="mt-5 text-xl font-bold text-slate-900">{item.label}</h1>
      <p className="mt-2 max-w-[44ch] text-sm text-slate-500">This module isn&apos;t built yet. It plugs into the same sidebar, guard and data layer as the dashboard.</p>
      <Link href={hrefFor(role, "")} className="mt-6 rounded-full bg-[#1C2640] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#26335a]">Back to dashboard</Link>
    </motion.div>
  );
}
