export const instant = false;
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { DashboardProvider } from "@/context/DashboardContext";
import Shell from "@/components/dashboard/Shell";

// Guard + data + chrome for every /dashboard/[role]/* page.
export default async function RoleLayout({ children, params }) {
  const { role } = await params;
  return (
      <ProtectedRoute role={role}>
        <DashboardProvider>
          <Shell>{children}</Shell>
        </DashboardProvider>
      </ProtectedRoute>
  );
}
