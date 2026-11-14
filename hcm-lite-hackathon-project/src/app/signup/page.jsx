"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiPhone, FiBriefcase, FiCheck } from "react-icons/fi";
import GuestOnly from "@/components/auth/GuestOnly";
import Field from "@/components/auth/Field";
import PasswordField from "@/components/auth/PasswordField";
import RoleTabs from "@/components/auth/RoleTabs";
import Button from "@/components/auth/Button";
import Alert from "@/components/auth/Alert";
import useForm from "@/hooks/useForm";
import { signupSchema } from "@/lib/validation";
import { getSetupStatus, signUp } from "@/lib/authService";
import { PUBLIC_SIGNUP_ROLES, ROLE_META, ROUTES, dashboardPath, roleStyle } from "@/lib/constants";

// Initial Form Data
const INITIAL = {
  firstName: "", lastName: "", email: "", phone: "", companyName: "",
  password: "", confirmPassword: "", terms: false,
};

function SignupForm() {
  const router = useRouter();
  const [role, setRole] = useState("employee");
  const [setup, setSetup] = useState({ completed: null, companyName: "" });
  const [serverError, setServerError] = useState("");

  const schema = useMemo(() => signupSchema(role), [role]);
  const form = useForm({ initialValues: INITIAL, schema });
  const meta = ROLE_META[role];
  const { error: termsError, ...termsProps } = form.checkbox("terms");

  // First run: nobody has set up the company yet, so the first account has to be the Admin.
  useEffect(() => {
    getSetupStatus().then((s) => {
      setSetup(s);
      if (s.completed === false) setRole("admin");
      if (s.completed === true) setRole((r) => (r === "admin" ? "employee" : r));
    });
  }, []);

  const disabledReasons = {
    ...(setup.completed === true && { admin: "The company is already set up" }),
    ...(setup.completed === false && { hr: "The Admin must set up the company first", employee: "The Admin must set up the company first" }),
  };

  const onSubmit = form.handleSubmit(async (vals, { setFieldError }) => {
    setServerError("");
    try {
      const profile = await signUp(vals, role);
      router.replace(dashboardPath(profile.role));
    } catch (err) {
      if (err.field && err.field !== "role") setFieldError(err.field, err.message);
      else setServerError(err.message);
    }
  });

  return (
    // Main Content
    <main style={roleStyle(role)} className="grid min-h-screen place-items-center bg-[#0F1629] px-4 py-8 sm:py-12">
      <div className="relative w-full max-w-[1040px] overflow-hidden rounded-[28px] bg-[#1C2640] shadow-2xl shadow-black/40 ring-1 ring-white/10">
        {/* decor, taken from the brief's teal circles */}
        <div aria-hidden className="pointer-events-none absolute -right-28 -top-28 h-[440px] w-[440px] rounded-full bg-[#12A08A]/20" />
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-[260px] w-[260px] rounded-full bg-[#12A08A]/20" />

        <header className="relative flex items-center justify-between px-6 py-5 sm:px-10">
          <span className="flex items-center gap-2.5 text-sm font-bold text-white">
            <span aria-hidden className="h-6 w-6 rounded-full bg-[color:var(--accent)] transition-colors" />
            HCM Lite
          </span>
          <Link href={ROUTES.signin} className="rounded-lg px-2 py-1 text-sm font-medium text-slate-300 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]">
            Sign in
          </Link>
        </header>

        <div className="relative grid gap-10 px-6 pb-10 pt-4 sm:px-10 lg:grid-cols-[minmax(0,480px)_1fr]">
          <section aria-labelledby="signup-title">
            <h1 id="signup-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Create your account
              <span aria-hidden className="ml-1 inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--accent)] transition-colors" />
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Already a member?{" "}
              <Link href={ROUTES.signin} className="font-semibold text-[color:var(--accent)] underline-offset-4 hover:underline">
                Sign in
              </Link>
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-7 space-y-4">
              <div>
                <RoleTabs value={role} onChange={(r) => { setRole(r); setServerError(""); }} roles={PUBLIC_SIGNUP_ROLES} disabledReasons={disabledReasons} />
                <p className="mt-2 px-1 text-xs text-slate-400">{meta.hint}</p>
              </div>

              {setup.completed === false && (
                <Alert kind="info">First run: the first account must be the Admin, who sets up the company.</Alert>
              )}
              {setup.completed === true && setup.companyName && (
                <Alert kind="info">You&apos;re joining {setup.companyName}.</Alert>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" icon={FiUser} autoComplete="given-name" placeholder="Michal" {...form.field("firstName")} />
                <Field label="Last name" icon={FiUser} autoComplete="family-name" placeholder="Masiak" {...form.field("lastName")} />
              </div>
              <Field label="Email" icon={FiMail} type="email" inputMode="email" autoComplete="email" placeholder="name@company.com" {...form.field("email")} />
              <Field label="Mobile number" icon={FiPhone} type="tel" inputMode="tel" autoComplete="tel" placeholder="0300 1234567" {...form.field("phone")} />
              {role === "admin" && (
                <Field label="Company name" icon={FiBriefcase} autoComplete="organization" placeholder="Saylani Welfare" hint="You can change office hours and rules after sign-up." {...form.field("companyName")} />
              )}
              <PasswordField label="Password" showStrength autoComplete="new-password" placeholder="Create a password" {...form.field("password")} />
              <PasswordField label="Confirm password" autoComplete="new-password" placeholder="Type it again" {...form.field("confirmPassword")} />

              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-300">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]" aria-describedby="terms-msg" {...termsProps} />
                  <span>I agree to my company&apos;s terms of use and privacy policy.</span>
                </label>
                {termsError && (
                  <p id="terms-msg" role="alert" className="mt-1.5 px-1 text-xs text-rose-300">{termsError}</p>
                )}
              </div>

              {serverError && <Alert kind="error">{serverError}</Alert>}

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <Button type="submit" loading={form.submitting} loadingText="Creating account" className="sm:flex-1">
                  Create account
                </Button>
                <Button as={Link} href={ROUTES.signin} variant="secondary-dark" className="sm:flex-none">
                  I have an account
                </Button>
              </div>
            </form>
          </section>

          <aside aria-label={`${meta.label} access`} className="relative hidden lg:block">
            <svg aria-hidden viewBox="0 0 400 760" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <path d="M150 0 C 40 170, 250 270, 90 430 S 230 650, 140 760" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" strokeDasharray="6 8" />
            </svg>
            <div className="absolute inset-x-6 bottom-2 rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/10 backdrop-blur">
              <p className="text-sm font-semibold text-white">{meta.label} access includes</p>
              <ul className="mt-4 space-y-3">
                {meta.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color:var(--accent)] text-[color:var(--on-accent)] transition-colors">
                      <FiCheck className="h-3 w-3" aria-hidden />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <GuestOnly>
      <SignupForm />
    </GuestOnly>
  );
}
