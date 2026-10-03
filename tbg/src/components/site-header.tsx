"use client";

// Adapted from 21st.dev "Floating Header" (@efferd): floating sticky bar with a
// sheet menu on small screens, restyled to the TBG system — square, hairline,
// limestone glass, letter-spaced labels and a single outlined Build Studio CTA.
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, site } from "@content/site";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BrandLockup } from "@/components/brand";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-[var(--gutter)] pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-6 border border-hairline/80 px-4 sm:px-6",
          "bg-linen/95 backdrop-blur-md supports-[backdrop-filter]:bg-linen/88",
        )}
      >
        <Link href="/" className="py-2">
          <BrandLockup />
          <span className="sr-only">, home</span>
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className="label link-underline py-2 text-charcoal transition-colors hover:text-bronze aria-[current=page]:text-bronze"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.buildStudio.href}
            target="_blank"
            rel="noopener noreferrer"
            className="label hidden h-11 items-center gap-2 border border-charcoal px-5 text-charcoal transition-colors duration-[var(--duration-hover)] hover:bg-charcoal hover:text-linen sm:inline-flex"
          >
            {site.buildStudio.label}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-11 items-center justify-center text-charcoal lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-full gap-0 border-l-hairline bg-limestone p-0 sm:max-w-md"
            >
              <div className="flex h-24 items-center justify-between px-[var(--gutter)]">
                <SheetTitle className="label text-graphite">Menu</SheetTitle>
                <SheetClose
                  className="inline-flex size-11 items-center justify-center text-charcoal"
                  aria-label="Close menu"
                >
                  <X className="size-5" aria-hidden="true" />
                </SheetClose>
              </div>
              <ul className="flex flex-col px-[var(--gutter)]">
                <li>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    aria-current={pathname === "/" ? "page" : undefined}
                    className="block border-b border-hairline py-5 font-serif text-4xl font-light text-charcoal aria-[current=page]:text-bronze"
                  >
                    Home
                  </Link>
                </li>
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      className="block border-b border-hairline py-5 font-serif text-4xl font-light text-charcoal aria-[current=page]:text-bronze"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-6 px-[var(--gutter)] pb-10">
                <a
                  href={site.buildStudio.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label inline-flex h-12 items-center justify-center gap-2 bg-charcoal px-6 text-linen"
                >
                  {site.buildStudio.label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a href={site.contact.phoneHref} className="label text-center text-graphite">
                  {site.contact.phone}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
