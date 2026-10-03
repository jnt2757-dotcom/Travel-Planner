# Thompson Building Group — website

Marketing site for Thompson Building Group, a luxury custom home builder in Charlotte, NC.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui · GSAP ScrollTrigger · Lenis · zod

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
npm run images   # convert new photos in public/images to WebP + refresh content/image-sizes.ts
```

## Where things live

| Path | What |
|---|---|
| `content/` | All copy and image references, typed (`site.ts`, `projects.ts`, `team.ts`, `construction.ts`) |
| `content/image-sizes.ts` | Generated intrinsic sizes for every image (don't edit by hand) |
| `src/config/hero.ts` | Hero frame count and timing |
| `src/components/hero/` | Pinned scroll sequence, frame canvas player, SVG placeholder, reduced-motion still |
| `src/app/globals.css` | Design tokens (colors, type scale, motion) |
| `design-system/MASTER.md` | Design system rationale and rules |

## Hero frames

The home hero is a pinned, scroll-scrubbed build sequence. Until real renders exist it plays
an SVG placeholder (blueprint → foundation → framing → exterior → photo at dusk).

To use rendered frames:

1. Export the sequence as `public/hero/frame_0001.webp`, `frame_0002.webp`, … (1920px wide
   WebP at ~quality 70 keeps ~150 frames around 10–15 MB).
2. Set `HERO_FRAME_COUNT` in `src/config/hero.ts`.

Frame 1 is rendered as a normal image so it paints before JavaScript; the rest load
progressively (every 4th frame first), phones use every 2nd frame, and reduced-motion users
get a static final image instead.

## Content

Copy and photos were taken from thompsonbuildinggroup.com. A few things to finish:

- **Inquiries** are validated (client and server) and currently logged on the server — wire
  `src/app/inquiries/actions.ts` to an email provider or CRM before launch.
- **LinkedIn**: the current site doesn't publish Ted Thompson's profile URL; replace the
  search link in `content/site.ts`.
- **Project galleries**: the current site publishes two photos per project (an exterior and
  an interior). Add more `gallery` entries in `content/projects.ts` and they flow into the
  project page and lightbox.
