import { FiAlertCircle, FiInfo, FiCheckCircle } from "react-icons/fi";

const styles = {
  error: { icon: FiAlertCircle, dark: "bg-rose-500/10 text-rose-200 ring-rose-400/30", light: "bg-rose-50 text-rose-700 ring-rose-200" },
  info: { icon: FiInfo, dark: "bg-white/[0.06] text-slate-300 ring-white/10", light: "bg-slate-50 text-slate-600 ring-slate-200" },
  success: { icon: FiCheckCircle, dark: "bg-emerald-500/10 text-emerald-200 ring-emerald-400/30", light: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
};

export default function Alert({ kind = "info", tone = "dark", children, className = "" }) {
  const s = styles[kind];
  const Icon = s.icon;
  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={`flex items-start gap-2.5 rounded-2xl px-4 py-3 text-sm ring-1 ${s[tone]} ${className}`}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <p>{children}</p>
    </div>
  );
}
