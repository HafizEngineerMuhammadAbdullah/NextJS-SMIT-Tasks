"use client";
import { ROLE_META } from "@/lib/constants";

// Real radio inputs underneath: arrow keys, screen readers and form semantics work for free.
export default function RoleTabs({ value, onChange, roles, disabledReasons = {}, tone = "dark", name = "role" }) {
  const rail = tone === "dark" ? "bg-white/[0.06]" : "bg-slate-100";
  const idle = tone === "dark" ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900";

  return (
    <fieldset>
      <legend className="sr-only">Account type</legend>
      <div className={`grid gap-1.5 rounded-2xl p-1.5 ${rail}`} style={{ gridTemplateColumns: `repeat(${roles.length}, minmax(0, 1fr))` }}>
        {roles.map((r) => {
          const meta = ROLE_META[r];
          const active = value === r;
          const reason = disabledReasons[r];
          return (
            <label key={r} title={reason || undefined} className={reason ? "cursor-not-allowed opacity-40" : "cursor-pointer"}>
              <input
                type="radio"
                className="peer sr-only"
                name={name}
                value={r}
                checked={active}
                disabled={!!reason}
                onChange={() => onChange(r)}
              />
              <span
                className={`block rounded-xl px-3 py-2 text-center text-sm font-semibold transition-colors
                  peer-focus-visible:ring-2 peer-focus-visible:ring-white ${active ? "" : idle}`}
                style={active ? { background: meta.accent, color: meta.onAccent } : undefined}
              >
                {meta.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
