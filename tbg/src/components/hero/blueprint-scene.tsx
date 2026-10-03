/**
 * Placeholder build sequence, drawn as one SVG so a single scroll timeline can
 * drive it. Groups are addressed by data-part; strokes use pathLength=1 so they
 * can be "drawn" by tweening stroke-dashoffset from 1 to 0.
 */

const INK = "#252320";
const BRONZE = "#7a5c3e";
const STONE = "#e6dfd3";
const LINEN = "#fbf9f5";

// Footprint shared by plan and elevation so the plan visibly "rises".
const L = 520; // main mass left
const M = 1080; // main mass right / wing left
const R = 1300; // wing right
const GROUND = 660;

const studsMain = Array.from({ length: 15 }, (_, i) => L + 20 + i * 37.1);
const studsWing = Array.from({ length: 6 }, (_, i) => M + 20 + i * 36);
const windowsUpper = [590, 700, 900, 1000];
const windowsLower = [590, 700, 1000];
const wingWindows = [1120, 1210];

export function BlueprintScene() {
  return (
    <svg
      viewBox="430 140 980 600"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      {/* 1 — Plans: floor plan linework in the same footprint */}
      <g data-part="plan" fill="none" stroke={INK} strokeWidth="2">
        <rect data-draw x={L} y="330" width={M - L} height="300" pathLength="1" />
        <rect data-draw x={M} y="410" width={R - M} height="220" pathLength="1" />
        <path data-draw d={`M ${L + 230} 330 V 520 M ${L} 470 H ${L + 230} M ${L + 380} 330 V 630 M ${L + 380} 480 H ${M}`} pathLength="1" />
        <path data-draw d={`M ${M + 110} 410 V 630`} pathLength="1" />
        {/* door swings */}
        <path data-draw d={`M 790 630 A 60 60 0 0 1 850 570`} strokeWidth="1.25" pathLength="1" />
        <path data-draw d={`M ${L + 230} 520 A 50 50 0 0 0 ${L + 180} 470`} strokeWidth="1.25" pathLength="1" />
        {/* dimension strings */}
        <g stroke={BRONZE} strokeWidth="1.25">
          <path data-draw d={`M ${L} 300 H ${R}`} pathLength="1" />
          <path data-draw d={`M ${L} 292 V 308 M ${M} 292 V 308 M ${R} 292 V 308`} pathLength="1" />
          <path data-draw d={`M ${R + 30} 330 V 630`} pathLength="1" />
          <path data-draw d={`M ${R + 22} 330 H ${R + 38} M ${R + 22} 630 H ${R + 38}`} pathLength="1" />
        </g>
        <g data-fade fill={INK} stroke="none" fontFamily="var(--font-manrope), sans-serif" fontSize="11" letterSpacing="2.5">
          <text x="575" y="410">LIVING</text>
          <text x="575" y="560">STUDY</text>
          <text x="790" y="410">GREAT ROOM</text>
          <text x="935" y="560">KITCHEN</text>
          <text x="1115" y="530">GARAGE</text>
          <text x="780" y="288" fill={BRONZE}>{`78'-0"`}</text>
          <text x={R + 40} y="485" fill={BRONZE}>{`30'-0"`}</text>
        </g>
      </g>

      {/* Ground line */}
      <path data-part="ground" d={`M 450 ${GROUND} H 1370`} stroke={INK} strokeWidth="1.5" fill="none" pathLength="1" />

      {/* 2 — Foundation */}
      <g data-part="foundation">
        <rect x={L - 10} y={GROUND - 22} width={R - L + 20} height="22" fill={STONE} stroke={INK} strokeWidth="1.5" />
        <g stroke={INK} strokeWidth="1" opacity="0.5">
          {Array.from({ length: 26 }, (_, i) => (
            <path key={i} d={`M ${L - 6 + i * 31} ${GROUND} l 18 -22`} />
          ))}
        </g>
        <g fill="none" stroke={INK} strokeWidth="1" strokeDasharray="5 5">
          <rect x={L - 20} y={GROUND} width="40" height="34" />
          <rect x={M - 20} y={GROUND} width="40" height="34" />
          <rect x={R - 20} y={GROUND} width="40" height="34" />
        </g>
      </g>

      {/* Excavation outline: the plan's footprint pegged out on the ground */}
      <g data-part="setout" fill="none" stroke={BRONZE} strokeWidth="1.25" strokeDasharray="6 6">
        <path d={`M ${L - 10} ${GROUND} V ${GROUND + 40} H ${R + 10} V ${GROUND}`} />
      </g>

      {/* 3 — Framing */}
      <g data-part="framing" stroke={INK} strokeWidth="2" fill="none">
        {/* Studs are drawn bottom-up, so they rise off the slab. */}
        <g data-studs>
          {studsMain.map((x) => (
            <path key={`m${x}`} d={`M ${x} ${GROUND - 22} V 380`} pathLength="1" />
          ))}
          {studsWing.map((x) => (
            <path key={`w${x}`} d={`M ${x} ${GROUND - 22} V 490`} pathLength="1" />
          ))}
        </g>
        <path data-draw d={`M ${L} 380 H ${M} M ${L} 500 H ${M} M ${M} 490 H ${R}`} pathLength="1" />
        <path data-draw d={`M ${L - 20} 385 L 800 225 L ${M + 20} 385`} pathLength="1" />
        <path data-draw d={`M ${M - 10} 495 L 1190 425 L ${R + 20} 495`} pathLength="1" />
        <path data-draw d={`M 620 323 V 380 M 700 272 V 380 M 800 225 V 380 M 900 272 V 380 M 980 323 V 380`} strokeWidth="1.25" pathLength="1" />
      </g>

      {/* 4 — Exterior */}
      <g data-part="exterior">
        <g data-panel>
          <rect x={L} y="380" width={M - L} height={GROUND - 22 - 380} fill={LINEN} stroke={INK} strokeWidth="1.5" />
          <rect x={M} y="490" width={R - M} height={GROUND - 22 - 490} fill={LINEN} stroke={INK} strokeWidth="1.5" />
        </g>
        <g data-panel>
          <rect x="940" y="250" width="44" height="120" fill={STONE} stroke={INK} strokeWidth="1.5" />
          <polygon points={`${L - 30},388 800,215 ${M + 30},388`} fill={INK} />
          <polygon points={`${M - 15},498 1190,420 ${R + 25},498`} fill={INK} />
        </g>
        <g data-panel fill={STONE} stroke={INK} strokeWidth="1.25">
          {windowsUpper.map((x) => (
            <g key={`u${x}`}>
              <rect x={x} y="410" width="56" height="70" />
              <path d={`M ${x + 28} 410 V 480 M ${x} 445 H ${x + 56}`} fill="none" />
            </g>
          ))}
          {windowsLower.map((x) => (
            <g key={`l${x}`}>
              <rect x={x} y="530" width="56" height="86" />
              <path d={`M ${x + 28} 530 V 616 M ${x} 573 H ${x + 56}`} fill="none" />
            </g>
          ))}
          {wingWindows.map((x) => (
            <rect key={`g${x}`} x={x} y="530" width="70" height="80" />
          ))}
          <path d="M 778 638 V 545 A 22 22 0 0 1 822 545 V 638 Z" fill={BRONZE} />
          <path d="M 760 638 H 840" fill="none" />
        </g>
      </g>
    </svg>
  );
}
