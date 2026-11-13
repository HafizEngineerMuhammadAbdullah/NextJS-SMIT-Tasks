import { FiLoader } from "react-icons/fi";

export default function FullPageLoader({ label = "Loading" }) {
  return (
    <div role="status" className="grid min-h-screen place-items-center bg-[#0F1629] text-slate-300">
      <div className="flex items-center gap-3 text-sm">
        <FiLoader className="h-5 w-5 animate-spin" aria-hidden />
        <span>{label}…</span>
      </div>
    </div>
  );
}
