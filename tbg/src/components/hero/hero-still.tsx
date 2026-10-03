import Image from "next/image";
import Link from "next/link";
import { hero, site } from "@content/site";
import { heroConfig } from "@/config/hero";
import { NeighborhoodLine } from "./neighborhood-line";

/**
 * Reduced-motion hero: the finished home, wordmark and CTA, no pinning.
 * Shown only under prefers-reduced-motion (CSS), so it never competes with
 * the animated sequence.
 */
export function HeroStill() {
  return (
    <section
      aria-labelledby="hero-still-title"
      className="relative hidden h-svh min-h-[36rem] items-center justify-center overflow-hidden motion-reduce:flex"
    >
      <Image
        src={heroConfig.finalImage.src}
        alt={heroConfig.finalImage.alt}
        fill
        sizes="100vw"
        quality={85}
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgb(37_35_32/0.62)_0%,rgb(37_35_32/0.3)_100%),linear-gradient(180deg,rgb(37_35_32/0.2)_0%,rgb(37_35_32/0)_45%,rgb(37_35_32/0.7)_100%)]"
      />
      <div className="relative flex flex-col items-center px-[var(--gutter)] text-center">
        <h1 id="hero-still-title">
          <Image
            src="/images/site/logo-white.png"
            alt={site.name}
            width={764}
            height={452}
            className="h-auto w-[min(62vw,22rem)]"
          />
        </h1>
        <p className="label mt-10 text-ember">{site.tagline}</p>
        <NeighborhoodLine className="mt-3 max-w-xl font-serif text-lede text-ember" />
        <Link
          href={hero.cta.href}
          className="label mt-10 inline-flex h-12 items-center border border-ember/80 px-8 text-ember hover:bg-ember hover:text-charcoal"
        >
          {hero.cta.label}
        </Link>
      </div>
    </section>
  );
}
