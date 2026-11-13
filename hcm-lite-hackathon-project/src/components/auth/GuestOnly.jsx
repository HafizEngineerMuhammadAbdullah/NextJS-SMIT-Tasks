"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { dashboardPath } from "@/lib/constants";
import FullPageLoader from "@/components/ui/FullPageLoader";

// Wrap sign-in / sign-up pages. If you open them while already signed in, you're sent to your dashboard.
// It only checks once on load, so it never races with the page's own redirect after submit.
export default function GuestOnly({ children }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const checked = useRef(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (loading || checked.current) return;
    checked.current = true;
    if (user && profile) {
      setRedirecting(true);
      router.replace(dashboardPath(profile.role));
    }
  }, [loading, user, profile, router]);

  if (loading || redirecting) return <FullPageLoader />;
  return children;
}
