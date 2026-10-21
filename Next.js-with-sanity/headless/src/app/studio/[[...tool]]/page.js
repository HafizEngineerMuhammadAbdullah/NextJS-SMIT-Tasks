import { isSanityConfigured } from "@/sanity/env";
import { siteConfig } from "@/lib/site";
import Studio from "./studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured()) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16">
        <p className="text-xs tracking-[0.22em] text-[#77756F] uppercase">Studio</p>
        <h1 className="mt-4 font-serif text-5xl text-[#191916]">Connect {siteConfig.sanityProjectName}</h1>
        <p className="mt-4 leading-7 text-[#77756F]">
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code> to{" "}
          <code>.env.local</code>, then restart the dev server. Studio signs editors in with their Sanity account. The
          route is not a password.
        </p>
      </main>
    );
  }

  return <Studio />;
}
