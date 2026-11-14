"use client";
import { FiAlertTriangle } from "react-icons/fi";
import { motion } from "motion/react";
import { useDashboard } from "@/context/DashboardContext";
import DashboardSkeleton from "@/components/dashboard/Skeleton";
import AdminDashboard from "@/components/dashboard/roles/AdminDashboard";
import HrDashboard from "@/components/dashboard/roles/HrDashboard";
import EmployeeDashboard from "@/components/dashboard/roles/EmployeeDashboard";

const VIEWS = { admin: AdminDashboard, hr: HrDashboard, employee: EmployeeDashboard };

export default function RoleDashboardPage() {
  const { status, data, role, reload } = useDashboard();
  const View = VIEWS[role];

  if (!data && status === "loading") return <DashboardSkeleton />;
  if (status === "error") {
    return (
      <div role="alert" className="grid place-items-center rounded-[24px] border border-rose-200 bg-white px-6 py-16 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-rose-500"><FiAlertTriangle className="h-5 w-5" aria-hidden /></span>
        <p className="mt-4 text-base font-bold text-slate-900">We couldn&apos;t load your dashboard</p>
        <p className="mt-1 max-w-[40ch] text-sm text-slate-500">Check your connection and Firestore rules, then try again.</p>
        <button type="button" onClick={reload} className="mt-5 rounded-full bg-[color:var(--accent)] px-6 py-2.5 text-sm font-bold text-[color:var(--on-accent)]">Try again</button>
      </div>
    );
  }
  // While new filters load we keep the old numbers on screen, slightly dimmed, so nothing jumps.
  return (
    <motion.div animate={{ opacity: status === "loading" ? 0.55 : 1 }} transition={{ duration: 0.2 }} aria-busy={status === "loading"}>
      <View data={data} />
    </motion.div>
  );
}
