"use client";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Button from "@/components/auth/Button";
import { useAuth } from "@/context/AuthContext";
import { ROLE_META, ROUTES, roleStyle } from "@/lib/constants";

// Placeholder so you can see the guard working. Replace with your real dashboards (module M7).
function Dashboard() {
  const { profile, logout } = useAuth();
  const router = useRouter();
  const meta = ROLE_META[profile.role];

  return (
    <main style={roleStyle(profile.role)} className="grid min-h-screen place-items-center bg-[#0F1629] px-4">
      <div className="w-full max-w-md rounded-[28px] bg-[#1C2640] p-8 text-white ring-1 ring-white/10">
        <span className="inline-block rounded-full bg-[color:var(--accent)] px-3 py-1 text-xs font-bold text-[color:var(--on-accent)]">{meta.label}</span>
        <h1 className="mt-4 text-2xl font-bold">Welcome, {profile.firstName}</h1>
        <p className="mt-1 text-sm text-slate-400">{profile.email}</p>
        <p className="mt-6 text-sm text-slate-300">You&apos;re signed in. The {meta.label} dashboard goes here.</p>
        <Button
          variant="secondary-dark"
          className="mt-6"
          onClick={async () => {
            await logout();
            router.replace(ROUTES.signin);
          }}
        >
          Sign out
        </Button>
      </div>
    </main>
  );
}

export default function RoleDashboardPage() {
  const { role } = useParams();
  return (
    <ProtectedRoute role={role}>
      <Dashboard />
    </ProtectedRoute>
  );
}
