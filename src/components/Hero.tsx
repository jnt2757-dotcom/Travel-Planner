import type { TripMeta } from "../data/trip";
import { formatDateRange } from "../lib/date";

export function Hero({ meta }: { meta: TripMeta }) {
  return (
    <section
      className="print-compact-hero relative flex h-screen min-h-[640px] w-full items-end justify-center overflow-hidden"
      aria-label="Trip overview"
    >
      <img
        src={meta.heroImage}
        alt={meta.heroImageAlt}
        className="print-hero-img absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10 print:hidden"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1120px] px-6 pb-20 pt-40 text-cream sm:px-10 print:px-0 print:pb-0 print:pt-0">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-cream/80">
          {meta.destination}
        </p>
        <h1 className="mt-5 max-w-3xl text-5xl leading-[1.02] tracking-tight sm:text-7xl print:text-3xl">
          {meta.title}
        </h1>
        <p className="mt-6 text-lg text-cream/90 sm:text-xl">
          Prepared for {meta.clientName}
        </p>
        <p className="mt-1 text-base text-cream/70">{formatDateRange(meta.startDate, meta.endDate)}</p>

        <div className="mt-16 flex items-center gap-3 border-t border-cream/25 pt-6 print:mt-3 print:border-none print:pt-0">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          <p className="text-xs uppercase tracking-[0.18em] text-cream/70">{meta.preparedByLine}</p>
        </div>
      </div>
    </section>
  );
}
