// Modelled on the 21st.dev "Large Name Footer" pattern (oversized wordmark under
// grouped columns), rebuilt in the TBG system: charcoal ground, hairline rules,
// letter-spaced labels and the gilt accent reserved for hover.
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation, neighborhoods, site } from "@content/site";
import { BrandMark } from "@/components/brand";

const year = new Date().getFullYear();

export function SiteFooter() {
  const { contact, social } = site;
  return (
    <footer className="dark-surface bg-charcoal text-ember">
      <div className="container-page pt-24 pb-10 sm:pt-32">
        <div className="grid gap-14 border-b border-ember/15 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandMark className="h-10" />
            <p className="mt-8 max-w-sm font-serif text-title font-light text-ember">
              Architecturally driven residences, built with a boutique hand.
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="label text-ember-muted">Explore</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/" className="link-underline hover:text-gilt">
                  Home
                </Link>
              </li>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline hover:text-gilt">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="label text-ember-muted">{site.tagline}</h2>
            <ul className="mt-6 space-y-3">
              {neighborhoods.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="label text-ember-muted">Visit</h2>
            <address className="mt-6 space-y-3 not-italic">
              <p>
                {contact.street}
                <br />
                {contact.city} {contact.region} {contact.postalCode}
              </p>
              <p>
                <a href={contact.phoneHref} className="link-underline hover:text-gilt">
                  {contact.phone}
                </a>
              </p>
            </address>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={social.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline hover:text-gilt"
                >
                  Instagram {social.instagram.handle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={social.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline hover:text-gilt"
                >
                  {social.linkedin.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
            <a
              href={site.buildStudio.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-10 inline-flex h-12 items-center gap-2 border border-ember/60 px-6 text-ember transition-colors duration-[var(--duration-hover)] hover:border-gilt hover:text-gilt"
            >
              {site.buildStudio.label}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1000 150"
          className="mt-14 w-full fill-ember/10 select-none"
        >
          <text
            x="0"
            y="128"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="font-serif font-light"
            fontSize="168"
          >
            THOMPSON
          </text>
        </svg>

        <div className="mt-10 flex flex-col gap-3 text-sm text-ember-muted sm:flex-row sm:justify-between">
          <p>
            Copyright © {year} {site.name}
          </p>
          <p>{site.contact.city}, North Carolina</p>
        </div>
      </div>
    </footer>
  );
}
