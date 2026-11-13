"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiCheck } from "react-icons/fi";
import GuestOnly from "@/components/auth/GuestOnly";
import Field from "@/components/auth/Field";
import PasswordField from "@/components/auth/PasswordField";
import RoleTabs from "@/components/auth/RoleTabs";
import Button from "@/components/auth/Button";
import Alert from "@/components/auth/Alert";
import useForm from "@/hooks/useForm";
import { signinSchema } from "@/lib/validation";
import { signIn } from "@/lib/authService";
import { LOCKOUT_SECONDS, MAX_FAILED_ATTEMPTS, ROLE_META, ROUTES, SIGNIN_ROLES, dashboardPath, roleStyle } from "@/lib/constants";

function SigninForm() {
  const router = useRouter();
  const [role, setRole] = useState("employee");
  const [remember, setRemember] = useState(true);
  const [serverError, setServerError] = useState("");
  const [fails, setFails] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const [now, setNow] = useState(0);

  const form = useForm({ initialValues: { email: "", password: "" }, schema: signinSchema });
  const meta = ROLE_META[role];

  // Cooldown timer after too many wrong passwords.
  useEffect(() => {
    if (!lockedUntil) return;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= lockedUntil) {
        setLockedUntil(0);
        setFails(0);
      }
    }, 500);
    return () => clearInterval(id);
  }, [lockedUntil]);
  const secondsLeft = lockedUntil ? Math.max(0, Math.ceil((lockedUntil - (now || Date.now())) / 1000)) : 0;
  const locked = secondsLeft > 0;

  const onSubmit = form.handleSubmit(async (vals) => {
    if (locked) return;
    setServerError("");
    try {
      const profile = await signIn({ ...vals, role, remember });
      router.replace(dashboardPath(profile.role));
    } catch (err) {
      if (err.isCredentialError) {
        const n = fails + 1;
        setFails(n);
        if (n >= MAX_FAILED_ATTEMPTS) {
          const until = Date.now() + LOCKOUT_SECONDS * 1000;
          setNow(Date.now());
          setLockedUntil(until);
          setServerError(`Too many wrong attempts. Try again in ${LOCKOUT_SECONDS} seconds.`);
          return;
        }
      }
      setServerError(err.message);
    }
  });

  return (
    <main style={roleStyle(role)} className="grid min-h-screen place-items-center bg-[#E9EEF7] px-4 py-8 sm:py-12">
      <div className="grid w-full max-w-[960px] overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-slate-900/15 md:grid-cols-[0.9fr_1.1fr]">
        {/* Left: brand panel */}
        <aside className="relative hidden overflow-hidden bg-[#1C2640] p-10 text-white md:flex md:flex-col md:justify-between">
          <div aria-hidden className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#12A08A]/30" />
          <div aria-hidden className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[color:var(--accent)]/30 transition-colors" />
          <div aria-hidden className="absolute bottom-24 left-10 h-24 w-24 rounded-full bg-white/10" />
          <span className="relative flex items-center gap-2.5 text-sm font-bold">
            <span aria-hidden className="h-6 w-6 rounded-full bg-[color:var(--accent)] transition-colors" />
            HCM Lite
          </span>
          <div className="relative">
            <h2 className="text-3xl font-bold leading-tight tracking-tight">Welcome back</h2>
            <p className="mt-3 max-w-[30ch] text-sm text-slate-300">Pick your role, then sign in to continue your work.</p>
            <ul className="mt-6 space-y-2.5">
              {meta.perks.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--accent)]" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right: form */}
        <section aria-labelledby="signin-title" className="px-6 py-10 sm:px-12">
          <span className="mb-6 flex items-center gap-2.5 text-sm font-bold text-slate-900 md:hidden">
            <span aria-hidden className="h-6 w-6 rounded-full bg-[color:var(--accent)]" />
            HCM Lite
          </span>
          <h1 id="signin-title" className="text-3xl font-bold tracking-tight text-slate-900">
            Sign in
            <span aria-hidden className="ml-1 inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--accent)] transition-colors" />
          </h1>
          <p className="mt-2 text-sm text-slate-500">{meta.hint}</p>

          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
            <RoleTabs tone="light" value={role} onChange={(r) => { setRole(r); setServerError(""); }} roles={SIGNIN_ROLES} />
            <Field tone="light" label="Email" icon={FiMail} type="email" inputMode="email" autoComplete="username" placeholder="name@company.com" {...form.field("email")} />
            <PasswordField tone="light" label="Password" autoComplete="current-password" placeholder="Your password" {...form.field("password")} />

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
                Remember me
              </label>
              <Link href={ROUTES.forgot} className="font-semibold text-slate-700 underline-offset-4 hover:underline">
                Forgot password?
              </Link>
            </div>

            {serverError && <Alert tone="light" kind="error">{serverError}</Alert>}
            {locked && <Alert tone="light" kind="info">You can try again in {secondsLeft}s.</Alert>}

            <Button type="submit" loading={form.submitting} loadingText="Signing in" disabled={locked} className="w-full">
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            New here?{" "}
            <Link href={ROUTES.signup} className="font-semibold text-slate-900 underline-offset-4 hover:underline">
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default function SigninPage() {
  return (
    <GuestOnly>
      <SigninForm />
    </GuestOnly>
  );
}
