"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { hero, site } from "@content/site";
import { heroConfig } from "@/config/hero";
import { NeighborhoodLine } from "./neighborhood-line";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { BlueprintScene } from "./blueprint-scene";
import { createFramePlayer } from "./frame-player";

const usesFrames = heroConfig.frameCount > 0;
const STAGE_COUNT = hero.stages.length;

function stageAt(progress: number) {
  let index = 0;
  heroConfig.stageStarts.forEach((start, i) => {
    if (progress >= start) index = i;
  });
  return index;
}

/**
 * Pinned, scroll-scrubbed "plans to reality" hero. A sticky stage holds the
 * frame canvas (or the SVG placeholder); one ScrollTrigger timeline, scrubbed
 * across the section's height, drives the build, the stage label and the
 * progress line. Reduced motion gets a static still (see HeroStill).
 */
export function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageNumRef = useRef<HTMLSpanElement>(null);
  const stageNameRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const player =
      usesFrames && canvasRef.current
        ? createFramePlayer(canvasRef.current, {
            count: heroConfig.frameCount,
            step: isMobile ? heroConfig.mobileFrameStep : 1,
            path: heroConfig.framePath,
          })
        : null;

    let currentStage = -1;
    const setStage = (progress: number) => {
      const index = stageAt(progress);
      if (index === currentStage) return;
      currentStage = index;
      if (stageNumRef.current) stageNumRef.current.textContent = String(index + 1).padStart(2, "0");
      if (stageNameRef.current) stageNameRef.current.textContent = hero.stages[index];
    };

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            setStage(self.progress);
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // Opening line leaves first.
      tl.to(q("[data-hero-opening]"), { autoAlpha: 0, y: -32, duration: 0.08 }, 0);

      if (player) {
        const state = { frame: 0 };
        tl.to(state, { frame: 1, duration: 1, onUpdate: () => player.seek(state.frame) }, 0);
      } else {
        buildPlaceholderTimeline(tl, q);
      }

      // Overlay chrome turns light as the finished home arrives, then the wordmark resolves.
      tl.to(q("[data-hero-chrome]"), { color: "#e9e2d6", duration: 0.06 }, 0.8)
        .to(q("[data-hero-scrim]"), { autoAlpha: 1, duration: 0.08 }, 0.82)
        .fromTo(q("[data-hero-final] > *"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.08, stagger: 0.025 }, 0.88)
        .to({}, { duration: 0.02 }); // brief hold on the finished home before unpinning
    }, section);

    return () => {
      ctx.revert();
      player?.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative h-[calc(var(--pin-mobile)*100svh)] motion-reduce:hidden md:h-[calc(var(--pin-desktop)*100svh)]"
      style={
        {
          "--pin-mobile": heroConfig.pinLength.mobile,
          "--pin-desktop": heroConfig.pinLength.desktop,
        } as React.CSSProperties
      }
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-limestone">
        {/* Drafting-paper grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70 [background-image:linear-gradient(var(--color-stone)_1px,transparent_1px),linear-gradient(90deg,var(--color-stone)_1px,transparent_1px)] [background-size:48px_48px]"
        />

        {usesFrames ? (
          <>
            {/* First frame as a real image so it paints before any JS. */}
            <Image
              src={heroConfig.framePath(1)}
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
            />
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
          </>
        ) : (
          <>
            <div className="absolute inset-x-0 top-[var(--header-h)] bottom-28 md:bottom-32">
              <BlueprintScene />
            </div>
            <div data-hero-photo className="invisible absolute inset-0 opacity-0">
              <Image
                src={heroConfig.finalImage.src}
                alt={heroConfig.finalImage.alt}
                fill
                sizes="100vw"
                quality={85}
                fetchPriority="low"
                loading="eager"
                className="object-cover"
              />
            </div>
          </>
        )}

        {/* Scrim for legibility over the finished home */}
        <div
          data-hero-scrim
          aria-hidden="true"
          className="invisible absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgb(37_35_32/0.62)_0%,rgb(37_35_32/0.3)_100%),linear-gradient(180deg,rgb(37_35_32/0.2)_0%,rgb(37_35_32/0)_45%,rgb(37_35_32/0.7)_100%)] opacity-0"
        />

        {/* Opening line */}
        <div
          data-hero-opening
          className="container-page absolute inset-x-0 bottom-36 md:bottom-44"
        >
          <p className="label text-graphite">{site.name}</p>
          <h1 id="hero-title" className="mt-5 max-w-[12ch] font-serif text-display font-light text-charcoal">
            {hero.opening}
          </h1>
          <span className="sr-only">
            . A home taken through five stages as you scroll: {hero.stages.join(", ")}.
          </span>
        </div>

        {/* Finished-home lockup */}
        <div
          data-hero-final
          className="absolute inset-0 flex flex-col items-center justify-center px-[var(--gutter)] text-center"
        >
          <Image
            src="/images/site/logo-white.png"
            alt={site.name}
            width={764}
            height={452}
            className="invisible h-auto w-[min(62vw,22rem)] opacity-0"
          />
          <p className="label invisible mt-10 text-ember opacity-0">{site.tagline}</p>
          <NeighborhoodLine className="invisible mt-3 max-w-xl font-serif text-lede text-ember opacity-0" />
          <Link
            href={hero.cta.href}
            className="label invisible mt-10 inline-flex h-12 items-center border border-ember/80 px-8 text-ember opacity-0 transition-colors duration-[var(--duration-hover)] hover:bg-ember hover:text-charcoal"
          >
            {hero.cta.label}
          </Link>
        </div>

        {/* Stage label + progress line */}
        <div
          data-hero-chrome
          aria-hidden="true"
          className="container-page absolute inset-x-0 bottom-8 text-charcoal md:bottom-12"
        >
          <div className="flex items-baseline justify-between">
            <p className="label flex gap-4">
              <span ref={stageNumRef}>01</span>
              <span className="opacity-60">/ {String(STAGE_COUNT).padStart(2, "0")}</span>
              <span ref={stageNameRef} className="min-w-[10ch]">
                {hero.stages[0]}
              </span>
            </p>
            <p className="label hidden opacity-60 sm:block">Scroll</p>
          </div>
          <div className="relative mt-4 h-px w-full bg-current/25">
            <span
              ref={progressRef}
              className="absolute inset-0 origin-left scale-x-0 bg-current"
            />
          </div>
          <ol className="mt-3 hidden grid-cols-5 md:grid">
            {hero.stages.map((stage) => (
              <li key={stage} className="label opacity-60">
                {stage}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** The placeholder build: blueprint draws, rises into a layered elevation, then the photo. */
function buildPlaceholderTimeline(tl: gsap.core.Timeline, q: (selector: string) => Element[]) {
  const drawn = (part: string) => q(`[data-part='${part}'] [data-draw]`);

  gsap.set(q("[data-draw], [data-studs] path, [data-part='ground']"), { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(q("[data-part='plan'] [data-fade]"), { opacity: 0 });
  gsap.set(q("[data-part='plan']"), { transformOrigin: "50% 100%" });
  gsap.set(q("[data-part='foundation']"), { transformOrigin: "50% 100%", scaleY: 0, opacity: 0 });
  gsap.set(q("[data-part='setout']"), { opacity: 0 });
  gsap.set(q("[data-part='exterior'] [data-panel]"), { opacity: 0, y: 12 });

  tl
    // 1 Plans (0 – 0.2)
    .to(drawn("plan"), { strokeDashoffset: 0, duration: 0.14, stagger: 0.008 }, 0.01)
    .to(q("[data-part='plan'] [data-fade]"), { opacity: 1, duration: 0.04 }, 0.12)
    // 2 Foundation (0.2 – 0.4): the plan folds down onto the ground line, is pegged out, and the slab rises
    .to(q("[data-part='plan']"), { scaleY: 0.06, opacity: 0, duration: 0.07 }, 0.18)
    .to(q("[data-part='ground']"), { strokeDashoffset: 0, duration: 0.05 }, 0.2)
    .to(q("[data-part='setout']"), { opacity: 1, duration: 0.04 }, 0.23)
    .to(q("[data-part='foundation']"), { scaleY: 1, opacity: 1, duration: 0.09 }, 0.26)
    .to(q("[data-part='setout']"), { opacity: 0.35, duration: 0.04 }, 0.34)
    // 3 Framing (0.4 – 0.6)
    .to(q("[data-studs] path"), { strokeDashoffset: 0, duration: 0.07, stagger: 0.004 }, 0.4)
    .to(drawn("framing"), { strokeDashoffset: 0, duration: 0.1, stagger: 0.012 }, 0.46)
    // 4 Exterior (0.6 – 0.8): facade, roof, windows; framing recedes behind them
    .to(q("[data-part='exterior'] [data-panel]"), { opacity: 1, y: 0, duration: 0.07, stagger: 0.045 }, 0.6)
    .to(q("[data-part='framing']"), { opacity: 0.15, duration: 0.1 }, 0.62)
    // 5 Home (0.8 – 1): crossfade to the finished photograph
    .fromTo(q("[data-hero-photo]"), { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 0.1 }, 0.8);
}
