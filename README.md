# Travel itinerary presentation site

A client-facing itinerary deliverable. Vite + React + TypeScript + Tailwind CSS,
no backend, no database, no auth — a single static page you build once per
trip and send (or print to PDF) to a client.

## Running it

```
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

To build a static bundle for hosting or archiving:

```
npm run build
```

Output goes to `dist/`.

## Building a new client trip

**Everything client-specific lives in one file: `src/data/trip.ts`.** You
should never need to touch a component to ship a new trip — only edit the
`trip` object at the bottom of that file. The interfaces above it document
every field; TypeScript will flag anything you miss or get wrong (run `npx
tsc --noEmit` or just watch the dev server for red squiggles/errors).

Below is what each part of the `trip` object controls and where it shows up.

### `meta` — hero section

| Field | What it does |
|---|---|
| `title` | Big serif headline in the hero |
| `clientName` | "Prepared for ___" line |
| `destination` | Small eyebrow label above the title |
| `startDate` / `endDate` | ISO dates (`"2026-09-12"`); drive the date range shown in the hero **and** the nights count in the Overview stat pills |
| `heroImage` / `heroImageAlt` | Background photo for the hero. Put a real image in `public/images/` and reference it as `/images/your-file.jpg`; always fill in `heroImageAlt` with a real description (screen readers use it) |
| `agencyName` | Your agency's name (also used in the footer) |
| `preparedByLine` | Small caption line at the base of the hero, e.g. "Prepared by ___" |

### `overview` — stats + intro paragraph

- `travelerCount` and `destinationsCount` are typed in directly (they're
  judgment calls a planner makes, not something derivable from the data).
- `introCopy` is an array of strings — one array entry per paragraph.
- Nights and number of properties are **computed automatically** from
  `meta.startDate`/`endDate` and `accommodations.length` — don't add fields
  for those.

### `flights` — one entry per journey

Each item in the `flights` array is a `FlightJourney`: a `direction`
(`"outbound"` or `"return"`) and an ordered list of `legs`. A single-leg
journey is a nonstop flight; two or more legs render as a connecting
itinerary with a layover pill between each pair. If a journey has
connections, `layovers` must have exactly `legs.length - 1` entries (one
string per gap between legs), e.g. `["1h 50m layover in Paris (CDG)"]`.

Add more `FlightJourney` objects to the array for more complex trips (e.g. an
internal flight between destinations) — they'll render as additional groups
in the order given.

### `accommodations` — one entry per property

One object per hotel/villa stay. They're sorted and displayed in
chronological order by `checkIn` automatically, with a connecting rule drawn
between properties — you don't need to pre-sort the array yourself.

`image` should point to a real photo in `public/images/`; `amenities` is a
free-form list of short strings rendered as pills — keep each one to two or
three words.

### `itinerary` — the day-by-day plan

The heart of the document. One `ItineraryDay` per calendar day of the trip,
in order. Each day has:

- `dayNumber` — just the sequential number (1, 2, 3…), shown as the big
  serif numeral.
- `date` — ISO date; the weekday and formatted date are derived from this
  automatically, so keep it accurate.
- `city`, `title` — the day's location and one-line summary.
- `entries` — the vertical timeline. Each entry needs a `time` (24h,
  `"14:30"`), a `title`, and a `type`, which must be one of:
  `"dining" | "activity" | "transfer" | "leisure" | "checkin" | "checkout"`.
  The type controls the icon and pill color — pick the closest match, don't
  invent new types (the component styling only covers these six).
  `location` and `description` are both optional; omit them for brief entries.
- `notes` — optional, renders as a tinted callout at the bottom of the day.
  Use it for anything conditional or worth flagging (dress code, weather
  dependency, a change made at the client's request).

### `practicalInfo` and `footer`

Straightforward key/value content — emergency numbers, your own contact
details, currency and time zone notes, packing guidance, and the closing
footer line. Edit these directly; no derived logic involved.

## Images

Drop real photography into `public/images/` and reference it with an
absolute path (`/images/whatever.jpg`). The sample trip ships with three
illustrated SVG placeholders (`hero-amalfi.svg`, `property-positano.svg`,
`property-ravello.svg`) standing in for real photos — swap `meta.heroImage`
and each property's `image` field to replace them. There's no image
processing pipeline, so pre-size/export your photos at a reasonable web
resolution before dropping them in (roughly 1600px wide for the hero, 1200px
for property images is plenty).

## Design system notes

If you do need to touch the components (new section, structural change),
the shared tokens live in `src/index.css` under `@theme`:

- Colors: `cream`, `ink`, `ink-soft`, `accent`, `surface`
- Radii: `rounded-card` (28px), `rounded-nested` (20px), `rounded-full` for
  pills
- Fonts: `font-display` (Instrument Serif) for headings/numerals,
  `font-body` (Inter) for everything else
- Card shadow: `shadow-card`

Keep new UI within these tokens rather than introducing new colors or radii.

## Printing

The page has a dedicated print stylesheet: browser print (Cmd/Ctrl+P)
compresses the hero into a small header block, drops sticky navigation and
shadows, and avoids splitting a single day across a page break. No extra
steps needed — it's automatic based on the data you've entered.
