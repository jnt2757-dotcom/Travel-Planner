import type { Accommodation, Overview as OverviewData } from "../data/trip";
import { nightsBetween } from "../lib/date";
import { Reveal } from "./Reveal";

interface OverviewProps {
  overview: OverviewData;
  startDate: string;
  endDate: string;
  accommodations: Accommodation[];
}

function StatPill({ value, label, index }: { value: string | number; label: string; index: number }) {
  return (
    <Reveal
      index={index}
      className="flex items-baseline gap-2.5 rounded-full bg-white px-6 py-3.5 shadow-card"
    >
      <span className="font-display text-3xl leading-none text-accent">{value}</span>
      <span className="text-sm text-ink-soft">{label}</span>
    </Reveal>
  );
}

export function Overview({ overview, startDate, endDate, accommodations }: OverviewProps) {
  const nights = nightsBetween(startDate, endDate);

  return (
    <section id="overview" className="mx-auto max-w-[1120px] px-6 py-24 sm:px-10 sm:py-24">
      <div className="flex flex-wrap gap-4">
        <StatPill index={0} value={nights} label={nights === 1 ? "night" : "nights"} />
        <StatPill index={1} value={overview.destinationsCount} label="destinations" />
        <StatPill index={2} value={accommodations.length} label="properties" />
        <StatPill
          index={3}
          value={overview.travelerCount}
          label={overview.travelerCount === 1 ? "traveler" : "travelers"}
        />
      </div>

      <Reveal index={4} className="mt-12 max-w-2xl">
        {overview.introCopy.map((paragraph, i) => (
          <p key={i} className={`text-[17px] leading-[1.65] text-ink-soft ${i > 0 ? "mt-4" : ""}`}>
            {paragraph}
          </p>
        ))}
      </Reveal>
    </section>
  );
}
