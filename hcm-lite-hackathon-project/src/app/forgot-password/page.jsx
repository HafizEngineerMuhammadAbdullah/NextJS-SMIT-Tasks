"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import GuestOnly from "@/components/auth/GuestOnly";
import Field from "@/components/auth/Field";
import Button from "@/components/auth/Button";
import Alert from "@/components/auth/Alert";
import useForm from "@/hooks/useForm";
import { forgotSchema } from "@/lib/validation";
import { sendReset } from "@/lib/authService";
import { ROUTES, roleStyle } from "@/lib/constants";

function ForgotForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState("");
  const form = useForm({ initialValues: { email: "" }, schema: forgotSchema });

  const onSubmit = form.handleSubmit(async (vals) => {
    setServerError("");
    try {
      await sendReset(vals.email);
      setSent(true);
    } catch (err) {
      setServerError(err.message);
    }
  });

  return (
    <main style={roleStyle("hr")} className="grid min-h-screen place-items-center bg-[#E9EEF7] px-4 py-10">
      <section aria-labelledby="forgot-title" className="w-full max-w-[440px] rounded-[28px] bg-white p-8 shadow-2xl shadow-slate-900/15 sm:p-10">
        <h1 id="forgot-title" className="text-2xl font-bold tracking-tight text-slate-900">Reset your password</h1>
        <p className="mt-2 text-sm text-slate-500">Enter your email and we&apos;ll send a link to choose a new password.</p>

        {sent ? (
          <Alert tone="light" kind="success" className="mt-6">
            If an account exists for that email, a reset link is on its way. Check your inbox and spam folder.
          </Alert>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
            <Field tone="light" label="Email" icon={FiMail} type="email" inputMode="email" autoComplete="email" placeholder="name@company.com" {...form.field("email")} />
            {serverError && <Alert tone="light" kind="error">{serverError}</Alert>}
            <Button type="submit" loading={form.submitting} loadingText="Sending" className="w-full">Send reset link</Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm">
          <Link href={ROUTES.signin} className="font-semibold text-slate-900 underline-offset-4 hover:underline">Back to sign in</Link>
        </p>
      </section>
    </main>
  );
}

export default function ForgotPasswordPage() {
  return (
    <GuestOnly>
      <ForgotForm />
    </GuestOnly>
  );
}
