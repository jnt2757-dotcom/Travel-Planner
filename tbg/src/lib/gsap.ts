"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Shared motion tokens, mirrored from globals.css. */
export const motion = {
  ease: "power3.out",
  reveal: 0.9,
  image: 1.2,
  stagger: 0.08,
} as const;

export { gsap, ScrollTrigger };
