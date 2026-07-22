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
  const nights = startDate && endDate ? nightsBetween(startDate, endDate) : null;
  const propertiesCount = accommodations.length;
  const paragraphs = overview.introCopy.filter((p) => p.trim().length > 0);

  const stats: { value: number; label: string }[] = [];
  if (nights !== null && nights > 0) stats.push({ value: nights, label: nights === 1 ? "night" : "nights" });
  if (overview.destinationsCount) {
    stats.push({ value: overview.destinationsCount, label: "destinations" });
  }
  if (propertiesCount > 0) {
    stats.push({ value: propertiesCount, label: propertiesCount === 1 ? "property" : "properties" });
  }
  if (overview.travelerCount) {
    stats.push({ value: overview.travelerCount, label: overview.travelerCount === 1 ? "traveler" : "travelers" });
  }

  if (stats.length === 0 && paragraphs.length === 0) return null;

  return (
    <section id="overview" className="mx-auto max-w-[1120px] px-6 py-24 sm:px-10 sm:py-24">
      {stats.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {stats.map((stat, i) => (
            <StatPill key={stat.label} index={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      )}

      {paragraphs.length > 0 && (
        <Reveal index={stats.length} className={`max-w-2xl ${stats.length > 0 ? "mt-12" : ""}`}>
          {paragraphs.map((paragraph, i) => (
            <p key={i} className={`text-[17px] leading-[1.65] text-ink-soft ${i > 0 ? "mt-4" : ""}`}>
              {paragraph}
            </p>
          ))}
        </Reveal>
      )}
    </section>
  );
}
