import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-1 flex-col justify-center px-5 pt-28">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-6xl">This page is not in the issue.</h1>
        <p className="mt-4 text-lg leading-8 text-graphite">The address does not match a published story or a section of the journal.</p>
        <Link href="/" className="eyebrow mt-8 text-forest">
          Return to the journal
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
