import type { ItineraryDay, ItineraryEntry } from "../data/trip";
import { formatLongDate, formatWeekday } from "../lib/date";
import { useActiveDay } from "../hooks/useActiveDay";
import { EntryTypeIcon, ENTRY_TYPE_LABEL, ENTRY_TYPE_STYLE } from "./EntryTypeIcon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function TimelineEntry({ entry, index }: { entry: ItineraryEntry; index: number }) {
  return (
    <li className="relative pl-6">
      <span className="absolute -left-1 top-2 h-2 w-2 rounded-full bg-accent ring-4 ring-cream" aria-hidden="true" />
      <Reveal index={index} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
        <span className="font-display text-lg leading-tight text-accent sm:w-14 sm:shrink-0">
          {entry.time}
        </span>
        <div className="min-w-0 flex-1 pb-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-[15px] font-medium text-ink">{entry.title}</h4>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide ${ENTRY_TYPE_STYLE[entry.type]}`}
            >
              <EntryTypeIcon type={entry.type} className="h-3 w-3" />
              {ENTRY_TYPE_LABEL[entry.type]}
            </span>
          </div>
          {entry.location && <p className="mt-1 text-[13px] text-ink-soft">{entry.location}</p>}
          {entry.description && (
            <p className="mt-1.5 max-w-2xl text-[15px] leading-[1.65] text-ink-soft">{entry.description}</p>
          )}
        </div>
      </Reveal>
    </li>
  );
}

function DayBlock({
  day,
  isFirst,
  registerDay,
}: {
  day: ItineraryDay;
  isFirst: boolean;
  registerDay: (day: number) => (node: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={registerDay(day.dayNumber)}
      data-day-number={day.dayNumber}
      className={`day-block scroll-mt-24 ${isFirst ? "" : "mt-20 border-t border-ink/10 pt-20"}`}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
        <span className="font-display text-6xl leading-none text-accent">{pad(day.dayNumber)}</span>
        <div>
          <p className="text-sm text-ink-soft">
            {formatWeekday(day.date)}, {formatLongDate(day.date)} · {day.city}
          </p>
          <h3 className="mt-1 font-display text-2xl text-ink sm:text-3xl">{day.title}</h3>
        </div>
      </div>

      <ol className="relative mt-10 ml-1 space-y-7 border-l border-ink/15">
        {day.entries.map((entry, i) => (
          <TimelineEntry key={`${entry.time}-${entry.title}`} entry={entry} index={i} />
        ))}
      </ol>

      {day.notes && (
        <div className="mt-8 rounded-nested bg-[#F1E9DD] p-5">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-accent">Note</p>
          <p className="mt-1.5 text-[15px] leading-[1.65] text-ink-soft">{day.notes}</p>
        </div>
      )}
    </article>
  );
}

export function Itinerary({ days }: { days: ItineraryDay[] }) {
  const dayNumbers = days.map((d) => d.dayNumber);
  const { activeDay, registerDay, scrollToDay } = useActiveDay(dayNumbers);

  return (
    <section id="itinerary" className="py-24">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <SectionHeading eyebrow="Day by day" title="Itinerary" />

        {/* Mobile chip rail */}
        <nav
          aria-label="Jump to day"
          className="no-scrollbar sticky top-0 z-20 -mx-6 mt-8 overflow-x-auto border-b border-ink/10 bg-cream/95 px-6 py-3 backdrop-blur print:hidden md:hidden"
        >
          <ul className="flex w-max gap-2">
            {days.map((day) => (
              <li key={day.dayNumber}>
                <button
                  type="button"
                  onClick={() => scrollToDay(day.dayNumber)}
                  aria-current={activeDay === day.dayNumber ? "true" : undefined}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    activeDay === day.dayNumber
                      ? "bg-accent text-white"
                      : "bg-white text-ink-soft shadow-card"
                  }`}
                >
                  <span className="font-medium">{pad(day.dayNumber)}</span> {day.city}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16 print:!block">
          {/* Desktop sticky rail */}
          <nav aria-label="Jump to day" className="hidden print:hidden md:block">
            <ol className="sticky top-24 space-y-1">
              {days.map((day) => (
                <li key={day.dayNumber}>
                  <button
                    type="button"
                    onClick={() => scrollToDay(day.dayNumber)}
                    aria-current={activeDay === day.dayNumber ? "true" : undefined}
                    className={`flex w-full items-baseline gap-3 rounded-full px-4 py-2.5 text-left text-sm transition-colors ${
                      activeDay === day.dayNumber
                        ? "bg-white text-ink shadow-card"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    <span
                      className={`font-display text-lg ${activeDay === day.dayNumber ? "text-accent" : "text-ink-soft"}`}
                    >
                      {pad(day.dayNumber)}
                    </span>
                    <span className="truncate">{day.city}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 md:mt-0">
            {days.map((day, i) => (
              <DayBlock key={day.dayNumber} day={day} isFirst={i === 0} registerDay={registerDay} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
