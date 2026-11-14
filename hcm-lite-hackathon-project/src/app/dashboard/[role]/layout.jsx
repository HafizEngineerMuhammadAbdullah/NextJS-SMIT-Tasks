"use client";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { DashboardProvider } from "@/context/DashboardContext";
import Shell from "@/components/dashboard/Shell";

// Guard + data + chrome for every /dashboard/[role]/* page.
export default function RoleLayout({ children }) {
  const { role } = useParams();
  return (
    <ProtectedRoute role={role}>
      <DashboardProvider>
        <Shell>{children}</Shell>
      </DashboardProvider>
    </ProtectedRoute>
  );
}
