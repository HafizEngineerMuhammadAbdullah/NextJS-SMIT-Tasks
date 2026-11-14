"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import { FiChevronsLeft, FiLogOut, FiMenu, FiX, FiZap } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { ROLE_META, ROUTES, roleStyle } from "@/lib/constants";
import { NAV, hrefFor } from "@/lib/dashboard/nav";
import { initials } from "@/lib/format";
import NotificationBell from "@/components/dashboard/NotificationBell";
import AssistantPanel from "@/components/dashboard/AssistantPanel";

function Brand({ collapsed }) {
  return (
    <div className="flex h-[72px] items-center gap-3 px-6 text-white">
      <span aria-hidden className="h-7 w-7 shrink-0 rounded-full bg-[color:var(--accent)]" />
      {!collapsed && <span className="text-[17px] font-bold tracking-tight">HCM Lite</span>}
    </div>
  );
}

function NavList({ role, pathname, collapsed, groupId, onNavigate }) {
  return (
    <LayoutGroup id={groupId}>
      <nav aria-label="Main" className="flex-1 space-y-1 px-3">
        {NAV[role].map((item) => {
          const href = hrefFor(role, item.id);
          const active = pathname === href;
          const Icon = item.icon;
          return (
            <Link key={href} href={href} onClick={onNavigate} aria-current={active ? "page" : undefined} title={collapsed ? item.label : undefined}
              className={`relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white ${active ? "text-[color:var(--on-accent)]" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>
              {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-xl bg-[color:var(--accent)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <Icon className="relative h-[18px] w-[18px] shrink-0" aria-hidden />
              {!collapsed && <span className="relative truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </LayoutGroup>
  );
}

export default function Shell({ children }) {
  const { logout } = useAuth();
  const { profile, role, data } = useDashboard();
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [assistant, setAssistant] = useState(false);
  const [menu, setMenu] = useState(false);
  const meta = ROLE_META[role];
  const current = NAV[role].find((n) => hrefFor(role, n.id) === pathname);

  useEffect(() => { setDrawer(false); }, [pathname]);

  const signOut = async () => {
    await logout();
    router.replace(ROUTES.signin);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div style={{ ...roleStyle(role), "--sb": collapsed ? "84px" : "264px" }} className="min-h-screen bg-[#F3F6FB] text-slate-900">
        {/* Desktop sidebar */}
        <motion.aside initial={false} animate={{ width: collapsed ? 84 : 264 }} transition={{ type: "spring", stiffness: 300, damping: 34 }}
          className="fixed inset-y-0 left-0 z-30 hidden flex-col bg-[#16203A] lg:flex">
          <Brand collapsed={collapsed} />
          <NavList role={role} pathname={pathname} collapsed={collapsed} groupId="desktop" />
          <div className="p-3">
            <button type="button" onClick={() => setCollapsed((c) => !c)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-400 outline-none hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-white">
              <motion.span animate={{ rotate: collapsed ? 180 : 0 }}><FiChevronsLeft className="h-[18px] w-[18px]" aria-hidden /></motion.span>
              {!collapsed && "Collapse"}
            </button>
          </div>
        </motion.aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {drawer && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" aria-hidden />
              <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", stiffness: 320, damping: 36 }} className="fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col bg-[#16203A] lg:hidden">
                <div className="flex items-center justify-between pr-3"><Brand /><button type="button" onClick={() => setDrawer(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full text-slate-300 hover:bg-white/10"><FiX /></button></div>
                <NavList role={role} pathname={pathname} groupId="mobile" onNavigate={() => setDrawer(false)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <div className="min-h-screen transition-[padding] duration-300 lg:pl-[var(--sb)]">
          <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between gap-3 border-b border-slate-200/70 bg-[#F3F6FB]/85 px-4 backdrop-blur sm:px-8">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setDrawer(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-slate-200 lg:hidden"><FiMenu /></button>
              <p className="text-base font-bold text-slate-900">{current?.label ?? "Dashboard"}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <button type="button" onClick={() => setAssistant(true)} className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-4 py-2.5 text-sm font-bold text-[color:var(--on-accent)] outline-none hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2">
                <FiZap className="h-4 w-4" aria-hidden /><span className="hidden sm:inline">Ask assistant</span>
              </button>
              <NotificationBell items={data?.notifications ?? []} />
              <div className="relative">
                <button type="button" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-label="Account menu"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#1C2640] text-xs font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2">
                  {initials(profile.fullName)}
                </button>
                <AnimatePresence>
                  {menu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setMenu(false)} aria-hidden />
                      <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: 0.16 }}
                        className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                        <div className="px-3 py-2.5">
                          <p className="truncate text-sm font-bold text-slate-900">{profile.fullName}</p>
                          <p className="truncate text-xs text-slate-500">{profile.email}</p>
                          <span className="mt-2 inline-block rounded-full bg-[color:var(--accent)] px-2.5 py-0.5 text-[11px] font-bold text-[color:var(--on-accent)]">{meta.label}</span>
                        </div>
                        <button type="button" onClick={signOut} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                          <FiLogOut className="h-4 w-4" aria-hidden />Sign out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1320px] px-4 py-6 sm:px-8 sm:py-8">{children}</main>
        </div>

        <AssistantPanel open={assistant} onClose={() => setAssistant(false)} role={role} data={data} profile={profile} />
      </div>
    </MotionConfig>
  );
}
