import type { FlightJourney, FlightLeg } from "../data/trip";
import { formatLongDate } from "../lib/date";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function PlaneGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 rotate-90"
      aria-hidden="true"
    >
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.8V22l4-1 4 1v-1.2L13 19v-5.5Z" />
    </svg>
  );
}

function FlightPath() {
  return (
    <div className="relative flex w-full items-center py-5 sm:w-auto sm:flex-1 sm:px-8 sm:py-0">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
      <span className="relative mx-2 h-px flex-1 bg-ink/15">
        <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream px-1.5 text-accent">
          <PlaneGlyph />
        </span>
      </span>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
    </div>
  );
}

function EndpointBlock({
  code,
  airportName,
  city,
  terminal,
  date,
  time,
  align,
}: {
  code: string;
  airportName: string;
  city: string;
  terminal?: string;
  date: string;
  time: string;
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-left sm:text-right" : "text-left"}>
      <p className="font-display text-4xl leading-none text-ink">{code}</p>
      <p className="mt-2 text-sm font-medium text-ink">{city}</p>
      <p className="text-[13px] text-ink-soft">{airportName}</p>
      {terminal && <p className="text-[13px] text-ink-soft">Terminal {terminal}</p>}
      {(date || time) && (
        <p className="mt-2 text-[13px] text-ink-soft">
          {date ? formatLongDate(date) : "Date to be confirmed"}
          {time && <> · <span className="font-medium text-ink">{time}</span></>}
        </p>
      )}
    </div>
  );
}

function LegCard({ leg, index }: { leg: FlightLeg; index: number }) {
  return (
    <Reveal index={index} as="article" className="avoid-break rounded-nested bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 pb-4">
        <p className="text-sm font-medium text-ink">
          {leg.airline} <span className="text-ink-soft">· {leg.flightNumber}</span>
        </p>
        <p className="text-[13px] text-ink-soft">
          Booking ref <span className="font-medium text-ink">{leg.bookingReference}</span>
        </p>
      </div>

      <div className="flex flex-col pt-6 sm:flex-row sm:items-center">
        <EndpointBlock
          align="left"
          code={leg.departure.airportCode}
          airportName={leg.departure.airportName}
          city={leg.departure.city}
          terminal={leg.departure.terminal}
          date={leg.departure.date}
          time={leg.departure.time}
        />
        <FlightPath />
        <EndpointBlock
          align="right"
          code={leg.arrival.airportCode}
          airportName={leg.arrival.airportName}
          city={leg.arrival.city}
          terminal={leg.arrival.terminal}
          date={leg.arrival.date}
          time={leg.arrival.time}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-t border-ink/10 pt-4">
        <span className="rounded-full bg-cream px-3.5 py-1.5 text-[13px] text-ink-soft">
          Duration <span className="font-medium text-ink">{leg.duration}</span>
        </span>
        <span className="rounded-full bg-cream px-3.5 py-1.5 text-[13px] text-ink-soft">
          Cabin <span className="font-medium text-ink">{leg.cabinClass}</span>
        </span>
        <span className="rounded-full bg-cream px-3.5 py-1.5 text-[13px] text-ink-soft">
          Seats <span className="font-medium text-ink">{leg.seats}</span>
        </span>
      </div>
    </Reveal>
  );
}

function JourneyGroup({ journey }: { journey: FlightJourney }) {
  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
        {journey.direction === "outbound" ? "Outbound" : "Return"}
      </h3>
      <div className="mt-5 space-y-4">
        {journey.legs.map((leg, i) => (
          <div key={`${leg.flightNumber}-${i}`}>
            <LegCard leg={leg} index={i} />
            {journey.layovers?.[i] && (
              <div className="flex justify-center py-3">
                <span className="rounded-full bg-[#ECE9E4] px-4 py-1.5 text-[13px] text-ink-soft">
                  {journey.layovers[i]}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Flights({ flights }: { flights: FlightJourney[] }) {
  if (flights.length === 0) return null;

  return (
    <section id="flights" className="bg-white/60 py-24">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <SectionHeading eyebrow="Travel" title="Flights" />

        <div className="mt-14 space-y-14">
          {flights.map((journey) => (
            <JourneyGroup key={journey.id} journey={journey} />
          ))}
        </div>
      </div>
    </section>
  );
}
