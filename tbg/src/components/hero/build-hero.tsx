"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { hero, heroSteps, site } from "@content/site";
import { buildHero } from "@/config/hero";
import { FrameSequenceHero, type FrameSequenceStep } from "@/components/ui/mac-book-neo-hero";
import { NeighborhoodLine } from "./neighborhood-line";

const total = String(heroSteps.length).padStart(2, "0");
const bounds = buildHero.stageBounds;

const steps: FrameSequenceStep[] = heroSteps.map((step, i) => ({
  from: bounds[i],
  to: bounds[i + 1],
  color: "var(--color-bronze)",
  num: String(i + 1).padStart(2, "0"),
  total,
  title: step.title,
  description: step.description,
  label: step.title,
}));

function Finale() {
  return (
    <>
      <Image
        src="/images/site/logo-white.png"
        alt={site.name}
        width={764}
        height={452}
        className="h-auto w-[min(62vw,22rem)]"
      />
      <p className="label mt-10 text-ember">{site.tagline}</p>
      <NeighborhoodLine className="mt-3 max-w-xl font-serif text-lede text-ember" />
      <Link
        href={hero.cta.href}
        className="label mt-10 inline-flex h-12 items-center border border-ember/80 px-8 text-ember transition-colors duration-[var(--duration-hover)] hover:bg-ember hover:text-charcoal"
      >
        {hero.cta.label}
      </Link>
    </>
  );
}

type Mode = "desktop" | "mobile" | "reduced";

const queries = ["(prefers-reduced-motion: reduce)", "(max-width: 767px)"];

function subscribe(onChange: () => void) {
  const lists = queries.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

function getMode(): Mode {
  if (window.matchMedia(queries[0]).matches) return "reduced";
  return window.matchMedia(queries[1]).matches ? "mobile" : "desktop";
}

/**
 * The build-footage hero. Picks the lighter frame set on phones and mounts the
 * 21st FrameSequenceHero once that is known; until then (and for crawlers) the
 * first frame and title render statically. Reduced motion is handled by
 * <HeroStill />, which CSS shows in place of this section.
 */
export function BuildHero() {
  // null on the server and during hydration, so frames never start loading for the wrong set.
  const mode = useSyncExternalStore<Mode | null>(subscribe, getMode, () => null);

  const set = mode && mode !== "reduced" ? buildHero[mode] : null;

  return (
    <section aria-label="From plans to reality" className="motion-reduce:hidden">
      {set ? (
        <FrameSequenceHero
          key={mode}
          frameCount={set.count}
          framePath={set.path}
          eagerCount={set.eager}
          scrollHeight={set.scrollHeight}
          title={hero.opening}
          subtitle="Scroll to build"
          steps={steps}
          finale={<Finale />}
          finaleFrom={bounds[bounds.length - 1]}
        />
      ) : (
        <div className="relative h-svh overflow-hidden bg-white">
          {/* First frame as a CSS background: unlike an <img>, it isn't fetched while the
              section is display:none, so reduced-motion visitors never download it. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${buildHero.desktop.path(1)})` }}
          />
          <div className="container-page absolute inset-x-0 top-[calc(var(--header-h)+clamp(3rem,8vh,6rem))]">
            <h1 className="max-w-[12ch] font-serif text-display font-light text-charcoal">{hero.opening}</h1>
          </div>
        </div>
      )}
    </section>
  );
}
