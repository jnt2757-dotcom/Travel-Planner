import frames from "./hero-frames.json";

/**
 * Home hero.
 *
 * The build-footage hero (21st FrameSequenceHero) plays frames extracted from
 * public/hero/build.mp4 by `npm run hero:frames`, which also rewrites
 * hero-frames.json. While that manifest reports no frames, the earlier
 * placeholder sequence stays on the page.
 */
const pad = (i: number) => String(i).padStart(4, "0");

export const buildHero = {
  enabled: frames.desktop > 0,
  desktop: {
    count: frames.desktop,
    path: (i: number) => `/hero/frames/frame_${pad(i)}.webp`,
    /** Total scroll distance: progress runs over all but the last viewport, which holds the final frame. */
    scrollHeight: "500vh",
    eager: 24,
  },
  mobile: {
    count: frames.mobile,
    path: (i: number) => `/hero/frames-mobile/frame_${pad(i)}.webp`,
    scrollHeight: "400vh",
    eager: 16,
  },
  /** Progress at which each stage card takes over, then the finale. */
  stageBounds: [0.02, 0.2, 0.4, 0.6, 0.8, 0.97],
  finalImage: {
    src: "/hero/final.webp",
    width: frames.final.width,
    height: frames.final.height,
    alt: "A Thompson Building Group home complete at dusk, lit from within",
  },
} as const;

// ——— Placeholder sequence (used only until build frames exist) ———

/** Legacy pre-rendered frames for the placeholder sequence; 0 = SVG placeholder. */
export const HERO_FRAME_COUNT = 0;

export const heroConfig = {
  frameCount: HERO_FRAME_COUNT,
  framePath: (index: number) => `/hero/frame_${pad(index)}.webp`,
  /** Phones load and scrub every Nth frame. */
  mobileFrameStep: 2,
  /** Pinned length in viewport heights. */
  pinLength: { desktop: 4, mobile: 3 },
  /** Shown at the end of the placeholder, and as the reduced-motion still. */
  finalImage: buildHero.enabled
    ? { src: buildHero.finalImage.src, alt: buildHero.finalImage.alt }
    : {
        src: "/images/projects/mid-century-modern-1.webp",
        alt: "A Thompson Building Group modern estate on Lake Norman at dusk, lit from within",
      },
  /** Scroll progress at which each stage begins: Plans, Foundation, Framing, Exterior, Home. */
  stageStarts: [0, 0.2, 0.4, 0.6, 0.8],
} as const;
