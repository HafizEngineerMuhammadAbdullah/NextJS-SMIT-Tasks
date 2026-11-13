import { FiLoader } from "react-icons/fi";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold outline-none transition " +
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--accent)] disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-[color:var(--accent)] text-[color:var(--on-accent)] hover:brightness-110 shadow-lg shadow-black/20",
  "secondary-dark": "bg-white/10 text-white hover:bg-white/15 focus-visible:ring-offset-[#1C2640]",
  "secondary-light": "bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-offset-white",
};

export default function Button({ variant = "primary", loading = false, loadingText, children, className = "", disabled, as: Tag = "button", ...rest }) {
  const extra = Tag === "button" ? { type: rest.type ?? "button", disabled: disabled || loading } : {};
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} aria-busy={loading || undefined} {...extra} {...rest}>
      {loading && <FiLoader className="h-4 w-4 animate-spin" aria-hidden />}
      {loading && loadingText ? loadingText : children}
    </Tag>
  );
}
