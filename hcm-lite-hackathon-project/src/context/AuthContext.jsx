"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/constants";
import { logOut } from "@/lib/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Firebase Auth user
  const [profile, setProfile] = useState(null); // Firestore users/{uid} (has the role)
  const [authReady, setAuthReady] = useState(false);
  const [profileReady, setProfileReady] = useState(false);

  useEffect(() => {
    let stopProfile = () => {};
    const stopAuth = onAuthStateChanged(auth, (u) => {
      stopProfile();
      setUser(u);
      setProfile(null);
      setAuthReady(true);
      if (!u) {
        setProfileReady(true);
        return;
      }
      setProfileReady(false);
      // Live listener: also picks up the profile right after sign-up creates it.
      stopProfile = onSnapshot(
        doc(db, COLLECTIONS.USERS, u.uid),
        (snap) => {
          setProfile(snap.exists() ? { id: snap.id, ...snap.data() } : null);
          setProfileReady(true);
        },
        () => {
          setProfile(null);
          setProfileReady(true);
        }
      );
    });
    return () => {
      stopAuth();
      stopProfile();
    };
  }, []);

  const value = useMemo(
    () => ({ user, profile, role: profile?.role ?? null, loading: !authReady || !profileReady, logout: logOut }),
    [user, profile, authReady, profileReady]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
