"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ROUTES, dashboardPath } from "@/lib/constants";
import FullPageLoader from "@/components/ui/FullPageLoader";

// <ProtectedRoute role="hr"> ... </ProtectedRoute>
// UX guard only. Real protection is firestore.rules (and server checks for the later modules).
export default function ProtectedRoute({ role: requiredRole, children }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace(ROUTES.signin);
    else if (profile && requiredRole && profile.role !== requiredRole) router.replace(dashboardPath(profile.role));
  }, [loading, user, profile, requiredRole, router]);

  const allowed = !loading && user && profile && (!requiredRole || profile.role === requiredRole);
  return allowed ? children : <FullPageLoader />;
}
