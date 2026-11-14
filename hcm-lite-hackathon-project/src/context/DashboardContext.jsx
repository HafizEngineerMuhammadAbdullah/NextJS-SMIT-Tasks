"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { loadDashboard } from "@/lib/dashboard/dataSource";

const Ctx = createContext(null);

// Loads the dashboard data once per role/filters and shares it with the page, the bell and the assistant.
export function DashboardProvider({ children }) {
  const { profile } = useAuth();
  const role = profile.role;
  const [filters, setFilters] = useState({ range: "30d", dept: "all" });
  const [state, setState] = useState({ status: "loading", data: null, error: null, applied: null });
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, status: "loading", error: null }));
    loadDashboard(role, profile, filters)
      .then((data) => alive && setState({ status: "ready", data, error: null, applied: filters }))
      .catch((error) => alive && setState({ status: "error", data: null, error, applied: null }));
    return () => { alive = false; };
  }, [role, profile.uid, filters.range, filters.dept, nonce]); // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo(
    () => ({ ...state, filters, setFilters, role, profile, reload: () => setNonce((n) => n + 1) }),
    [state, filters, role, profile]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useDashboard = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDashboard must be used inside <DashboardProvider>");
  return v;
};
