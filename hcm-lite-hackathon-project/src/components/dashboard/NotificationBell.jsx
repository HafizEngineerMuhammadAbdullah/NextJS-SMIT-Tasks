"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiBell, FiCheck } from "react-icons/fi";

export default function NotificationBell({ items = [] }) {
  const [list, setList] = useState(items);
  const [open, setOpen] = useState(false);
  useEffect(() => setList(items), [items]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const unread = list.filter((n) => n.unread).length;

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-label={`Notifications, ${unread} unread`} aria-expanded={open}
        className="relative grid h-10 w-10 place-items-center rounded-full bg-white text-slate-600 ring-1 ring-slate-200 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]">
        <FiBell className="h-[18px] w-[18px]" aria-hidden />
        <AnimatePresence>
          {unread > 0 && (
            <motion.span key={unread} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 18 }}
              className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">{unread}</motion.span>
          )}
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
            <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: 0.18 }}
              className="absolute right-0 z-50 mt-2 w-[min(92vw,360px)] origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-sm font-bold text-slate-900">Notifications</p>
                {unread > 0 && (
                  <button type="button" onClick={() => setList((l) => l.map((n) => ({ ...n, unread: false })))} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900">
                    <FiCheck className="h-3.5 w-3.5" aria-hidden />Mark all read
                  </button>
                )}
              </div>
              <ul className="max-h-80 divide-y divide-slate-100 overflow-auto border-t border-slate-100">
                {list.length === 0 && <li className="px-4 py-8 text-center text-sm text-slate-500">You&apos;re all caught up.</li>}
                {list.map((n) => (
                  <li key={n.id} className="flex gap-3 px-4 py-3">
                    <span aria-hidden className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.unread ? "bg-[color:var(--accent)]" : "bg-transparent"}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                      <p className="text-xs text-slate-500">{n.body}</p>
                      <p className="mt-1 text-[11px] text-slate-400">{n.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
