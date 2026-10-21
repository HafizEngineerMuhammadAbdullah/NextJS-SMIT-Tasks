"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/lib/site";

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
      <div className="glass pointer-events-auto mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full px-3 py-2 sm:px-4">
        <Link href="/" className="min-w-0 pl-2">
          <span className="block font-display text-xl leading-none tracking-tight">{siteConfig.shortName}</span>
          <span className="eyebrow mt-1 hidden sm:block">Tech Blog</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="eyebrow hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="glass">
              <SheetHeader>
                <SheetTitle className="font-display text-3xl font-normal">{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-8 flex flex-col gap-4">
                {siteConfig.nav.map((item) => (
                  <Link key={item.href} href={item.href} className="font-display text-3xl" onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
