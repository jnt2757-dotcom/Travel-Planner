"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, motion, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __tbgMotionReady?: boolean;
  }
}

/**
 * Site-wide motion: Lenis smooth scrolling driven by the GSAP ticker, plus the
 * quiet scroll reveals for any element marked `data-reveal` (text, fades up
 * 16px) or `data-reveal-image` (image, unmasks and settles from 1.08 scale).
 * With reduced motion requested, nothing here runs and content is static.
 */
export function MotionProvider() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    window.__tbgMotionReady = true;
    if (prefersReducedMotion()) {
      document.documentElement.classList.remove("motion-ok");
      return;
    }

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!document.documentElement.classList.contains("motion-ok")) return;

    lenisRef.current?.scrollTo(0, { immediate: true, force: true });

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: motion.reveal,
          ease: motion.ease,
          delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-image]").forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: motion.image, ease: "power2.inOut" });
        if (img) tl.to(img, { scale: 1, duration: motion.image * 1.25, ease: motion.ease }, 0);
      });
    });

    // Images and fonts settle after first paint; re-measure once they have.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}

/**
 * Inline, render-blocking script: hides reveal targets before first paint only
 * when motion is allowed, and restores them if the motion bundle never arrives.
 */
export const motionBootScript = `(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ok');setTimeout(function(){if(!window.__tbgMotionReady)d.classList.remove('motion-ok')},3500)}}catch(e){}})();`;
