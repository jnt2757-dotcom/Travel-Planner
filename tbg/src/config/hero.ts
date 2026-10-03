/**
 * Hero "plans to reality" sequence.
 *
 * Drop rendered frames into /public/hero as frame_0001.webp, frame_0002.webp, …
 * and set HERO_FRAME_COUNT to how many there are. While it is 0 the hero runs
 * the SVG placeholder (blueprint → foundation → framing → exterior → photo).
 */
export const HERO_FRAME_COUNT = 0;

export const heroConfig = {
  frameCount: HERO_FRAME_COUNT,
  framePath: (index: number) => `/hero/frame_${String(index).padStart(4, "0")}.webp`,
  /** Phones load and scrub every Nth frame. */
  mobileFrameStep: 2,
  /** Pinned length in viewport heights. */
  pinLength: { desktop: 4, mobile: 3 },
  /** Shown at the end of the placeholder, and as the reduced-motion still. */
  finalImage: {
    src: "/images/projects/mid-century-modern-1.webp",
    alt: "A Thompson Building Group modern estate on Lake Norman at dusk, lit from within",
  },
  /** Scroll progress at which each stage begins: Plans, Foundation, Framing, Exterior, Home. */
  stageStarts: [0, 0.2, 0.4, 0.6, 0.8],
} as const;
