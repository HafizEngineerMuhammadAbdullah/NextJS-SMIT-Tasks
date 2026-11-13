"use client";
import { forwardRef, useState } from "react";
import { FiLock, FiEye, FiEyeOff, FiCheck, FiCircle } from "react-icons/fi";
import Field from "@/components/auth/Field";
import { passwordChecks, passwordStrength } from "@/lib/validation";

const BAR = ["", "#F43F5E", "#F59E0B", "#38BDF8", "#10B981"];

const PasswordField = forwardRef(function PasswordField(
  { label = "Password", showStrength = false, tone = "dark", value = "", ...props },
  ref
) {
  const [visible, setVisible] = useState(false);
  const [caps, setCaps] = useState(false);
  const { score, label: strengthLabel } = passwordStrength(value);
  const muted = tone === "dark" ? "text-slate-400" : "text-slate-500";
  const done = tone === "dark" ? "text-emerald-300" : "text-emerald-600";

  return (
    <div>
      <Field
        ref={ref}
        {...props}
        value={value}
        label={label}
        tone={tone}
        icon={FiLock}
        type={visible ? "text" : "password"}
        onKeyUp={(e) => setCaps(e.getModifierState?.("CapsLock") ?? false)}
        right={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className={`rounded-lg p-1.5 outline-none hover:text-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] ${muted}`}
          >
            {visible ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
          </button>
        }
      />
      {caps && <p className="mt-1.5 px-1 text-xs text-amber-400">Caps Lock is on.</p>}

      {showStrength && value && (
        <div className="mt-3 px-1" aria-live="polite">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 gap-1.5" aria-hidden>
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="h-1.5 flex-1 rounded-full transition-colors"
                  style={{ background: i <= score ? BAR[score] : tone === "dark" ? "rgba(255,255,255,.12)" : "#E2E8F0" }}
                />
              ))}
            </div>
            <span className={`w-12 text-right text-xs font-semibold ${muted}`}>{strengthLabel}</span>
          </div>
          <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
            {passwordChecks(value).map((c) => (
              <li key={c.id} className={`flex items-center gap-1.5 text-xs ${c.ok ? done : muted}`}>
                {c.ok ? <FiCheck className="h-3 w-3" aria-hidden /> : <FiCircle className="h-3 w-3" aria-hidden />}
                <span>{c.label}</span>
                <span className="sr-only">{c.ok ? "met" : "not met yet"}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default PasswordField;
