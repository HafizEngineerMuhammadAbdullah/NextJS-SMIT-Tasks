"use client";
import { forwardRef, useId } from "react";

const tones = {
  dark: {
    box: "border-white/10 bg-white/[0.06] focus-within:bg-white/[0.1]",
    err: "border-rose-400/70 bg-rose-500/[0.08]",
    label: "text-slate-400",
    input: "text-white placeholder:text-slate-500",
    icon: "text-slate-400",
    msg: "text-rose-300",
    hint: "text-slate-400",
  },
  light: {
    box: "border-slate-200 bg-slate-50 focus-within:bg-white",
    err: "border-rose-400 bg-rose-50",
    label: "text-slate-500",
    input: "text-slate-900 placeholder:text-slate-400",
    icon: "text-slate-400",
    msg: "text-rose-600",
    hint: "text-slate-500",
  },
};

const Field = forwardRef(function Field(
  { label, icon: Icon, error, hint, tone = "dark", right, className = "", id, ...inputProps },
  ref
) {
  const autoId = useId();
  const inputId = id || autoId;
  const msgId = `${inputId}-msg`;
  const t = tones[tone];

  return (
    <div className={className}>
      <div
        className={`flex items-center gap-3 rounded-2xl border px-4 py-2.5 transition-colors
          focus-within:ring-2 focus-within:ring-[color:var(--accent)]
          ${error ? t.err : `${t.box} focus-within:border-[color:var(--accent)]`}`}
      >
        {Icon && <Icon className={`h-4 w-4 shrink-0 ${t.icon}`} aria-hidden />}
        <div className="min-w-0 flex-1">
          <label htmlFor={inputId} className={`block text-[11px] font-medium ${t.label}`}>
            {label}
          </label>
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error || hint ? msgId : undefined}
            className={`w-full bg-transparent text-sm font-semibold outline-none ${t.input}`}
            {...inputProps}
          />
        </div>
        {right}
      </div>
      {(error || hint) && (
        <p id={msgId} role={error ? "alert" : undefined} className={`mt-1.5 px-1 text-xs ${error ? t.msg : t.hint}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
});

export default Field;
