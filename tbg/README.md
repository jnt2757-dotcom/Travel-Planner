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

## Hero

The home hero is the 21st.dev **MacBook Neo Hero** (`FrameSequenceHero`, in
`src/components/ui/mac-book-neo-hero.tsx` + `.css`), restyled to the design system. It scrubs a
frame sequence of the build footage through five stages (copy in `content/site.ts` →
`heroSteps`), then holds the final frame with the wordmark, neighborhoods and View Portfolio.

To add or replace the footage:

1. Put the video at `public/hero/build.mp4` (locked camera, slab through finished home at dusk).
2. Run `npm run hero:frames`. It writes ~150 desktop frames (`public/hero/frames`), ~75 lighter
   phone frames (`public/hero/frames-mobile`), `public/hero/final.webp` for reduced motion, and
   `src/config/hero-frames.json`.
3. Commit those files. The home page switches to the frame hero automatically once the manifest
   has frames; until then the earlier placeholder hero is shown.

Stage timing (when each card takes over) is `stageBounds` in `src/config/hero.ts`.

## Content

Copy and photos were taken from thompsonbuildinggroup.com. A few things to finish:

- **Inquiries** are validated (client and server) and currently logged on the server — wire
  `src/app/inquiries/actions.ts` to an email provider or CRM before launch.
- **LinkedIn**: the current site doesn't publish Ted Thompson's profile URL; replace the
  search link in `content/site.ts`.
- **Project galleries**: the current site publishes two photos per project (an exterior and
  an interior). Add more `gallery` entries in `content/projects.ts` and they flow into the
  project page and lightbox.
