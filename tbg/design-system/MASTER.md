# Thompson Building Group — Design System

Source of truth for every page. Generated with the UI UX Pro Max skill
(`--design-system`, variance 3 / motion 4 / density 2, "luxury custom home builder"),
then tuned to the brief: quiet, editorial, architectural.

What was kept from the generator: hero-centric pattern with one primary CTA per view,
spacious density, the accessibility checklist, and its motion rules (transform/opacity
only, reduced-motion renders final state, ScrollTrigger refresh after media loads,
at most one pinned section per page).

What was overridden, and why:

- **Palette** — generator proposed teal/blue ("trust"). Replaced with warm neutrals,
  charcoal and a single bronze accent drawn from the TBG mark (`#9E8759`).
- **Type** — generator proposed Cinzel + Josefin Sans. Cinzel is all-caps Roman and
  reads ceremonial; swapped for Cormorant Garamond (refined, editorial) + Manrope.
- **Stagger easing** — generator's `back.out(1.4)` overshoot reads playful; all reveals
  decelerate with `power3.out`.

## Color

Tokens live in `src/app/globals.css` (`@theme`). Ratios measured against the surface each
token is used on.

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `limestone` | `#F5F1EA` | Page background | — |
| `linen` | `#FBF9F5` | Cards, header, alternating sections | — |
| `stone` | `#E6DFD3` | Image placeholders, drafting grid | — |
| `hairline` | `#D6CCBD` | Decorative rules and dividers | — |
| `rule` | `#8C8273` | Form field underlines (non-text UI) | 3.6:1 on linen |
| `charcoal` | `#252320` | Text, primary buttons, dark sections | 13.9:1 on limestone |
| `graphite` | `#5C564D` | Secondary text, labels | 6.5:1 on limestone |
| `bronze` | `#7A5C3E` | The accent: eyebrows, active nav, focus ring | 5.4:1 on limestone |
| `ember` | `#E9E2D6` | Text on charcoal | 12.2:1 |
| `ember-muted` | `#A39A8C` | Secondary text on charcoal | 5.6:1 |
| `gilt` | `#B89A64` | Accent on charcoal (hover, eyebrows) | 5.9:1 |
| `error` | `#9B2C1F` | Form errors (always with text) | — |

Rules: one accent only; never a large filled bronze block; no raw hex in components.

## Type

| Role | Font | Size | Notes |
|---|---|---|---|
| Display | Cormorant Garamond 300 | `clamp(3rem → 7.5rem)` | line-height .95, h1 |
| Headline | Cormorant Garamond 300 | `clamp(2.25rem → 4.25rem)` | h2 |
| Title | Cormorant Garamond 300 | `clamp(1.625rem → 2.25rem)` | card and person names |
| Lede | Manrope 400 | `clamp(1.19rem → 1.375rem)` | intros, 1.6 line-height |
| Body | Manrope 400 | 17px / 1.65 | max ~62ch |
| Label | Manrope 500, uppercase | 12px, tracking .24em | eyebrows, nav, buttons |

Headings use `text-wrap: balance`, paragraphs `pretty`.

## Space and layout

- 8px base; section padding `clamp(6rem → 12rem)` (`.section-y`), gutter `clamp(1.25rem → 4rem)`.
- 12-column grid, max width 1440px (`.container-page`); photography may run full-bleed.
- Square corners everywhere (radius 0), no shadows — hairlines carry structure.
- Editorial rhythm on grids: one wide image, then two staggered (7 + 5 columns, offset).

## Motion

| Token | Value | Use |
|---|---|---|
| hover | 250ms | color, underline, image scale 1.03 |
| reveal | 900ms, `power3.out` | text fades up 16px (`data-reveal`) |
| image | 1200ms | clip-path unmask + settle from 1.08 (`data-reveal-image`) |
| scroll | Lenis, 1.15s | smooth scroll, driven by the GSAP ticker |

- Slow and subtle everywhere except the hero, which is scrubbed 1:1 with scroll.
- `prefers-reduced-motion`: no Lenis, no reveals, static hero still.
- Reveal targets are hidden only after an inline boot script confirms motion is allowed;
  if the motion bundle hasn't arrived within 3.5s they are shown anyway.
- First-screen content (page intros) is never scroll-revealed, to protect LCP.

## Components

| Component | Source | Restyle |
|---|---|---|
| Header | 21st.dev Floating Header (@efferd) | Square, hairline, linen glass, label links, outlined Build Studio CTA, full-height serif sheet menu |
| Inquiry form | 21st.dev Centered Contact Form (@ln-dev7) | react-hook-form + zod, underline fields, inline errors, in-place confirmation |
| Gallery | Modelled on 21st.dev Grayscale Mosaic Gallery | Asymmetric mosaic, lazy tiles, lightbox loaded on demand |
| Team | Modelled on 21st.dev Team Member Cards | Lead portrait + bio, monochrome 4:5 portraits, no card chrome |
| Footer | Modelled on 21st.dev Large Name Footer | Charcoal, grouped columns, oversized faint wordmark |

(The 21st free tier allowed two code retrievals per day; the last three were rebuilt from
the catalog previews.)

## Hero

See `src/config/hero.ts` and `src/components/hero/`. One ScrollTrigger timeline across a
sticky 400svh (300svh on phones) section drives the frame canvas or the SVG placeholder,
the stage label and the progress line. Stage starts: 0, .2, .4, .6, .8.
