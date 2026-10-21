import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site";

function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
        <div className="mx-auto grid max-w-3xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-display text-4xl">{siteConfig.shortName}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-graphite">
            A simple blog. Posts are published from the Sanity project{" "}
            <span className="text-ink">{siteConfig.sanityProjectName}</span>.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-forest">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow">Colophon</p>
          <p className="mt-4 text-sm leading-6 text-graphite">
            Set in DM Serif Display and Inter. Content is structured in Sanity and rendered by Next.js. No analytics are
            attached.
          </p>
        </div>
      </div>
      <Separator />
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs tracking-[0.14em] text-graphite uppercase sm:px-8">
          <span>{siteConfig.name}</span>
          <span>{siteConfig.issueLabel}</span>
        </div>
    </footer>
  );
}

export { SiteFooter };
