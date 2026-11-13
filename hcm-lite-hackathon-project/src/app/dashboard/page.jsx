"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ROUTES, dashboardPath } from "@/lib/constants";
import FullPageLoader from "@/components/ui/FullPageLoader";

// /dashboard sends you to your own role's dashboard.
export default function DashboardIndex() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (loading) return;
    if (!user) router.replace(ROUTES.signin);
    else if (profile) router.replace(dashboardPath(profile.role));
  }, [loading, user, profile, router]);
  return <FullPageLoader />;
}
