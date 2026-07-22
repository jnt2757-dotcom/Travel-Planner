import type { Accommodation as AccommodationData } from "../data/trip";
import { formatLongDate, nightsBetween } from "../lib/date";
import { Pill } from "./Pill";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function PropertyCard({ property, index }: { property: AccommodationData; index: number }) {
  const nights = property.checkIn && property.checkOut ? nightsBetween(property.checkIn, property.checkOut) : null;
  const hasStayDates = Boolean(property.checkIn || property.checkOut || nights !== null);

  return (
    <Reveal
      index={index}
      as="article"
      className="avoid-break overflow-hidden rounded-card bg-white shadow-card transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="grid gap-0 md:grid-cols-2">
        {property.image ? (
          <img
            src={property.image}
            alt={property.imageAlt || property.name || "Property image"}
            className="h-64 w-full object-cover md:h-full"
          />
        ) : (
          <div className="h-64 w-full bg-ink/5 md:h-full" aria-hidden="true" />
        )}
        <div className="p-8 sm:p-10">
          {property.city && (
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{property.city}</p>
          )}
          <h3 className="mt-3 font-display text-3xl text-ink">{property.name || "Untitled property"}</h3>
          {property.roomType && <p className="mt-1 text-sm text-ink-soft">{property.roomType}</p>}

          {hasStayDates && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-ink/10 py-4 text-[13px] text-ink-soft">
              {property.checkIn && (
                <span>
                  Check-in <span className="font-medium text-ink">{formatLongDate(property.checkIn)}</span>
                </span>
              )}
              {property.checkOut && (
                <span>
                  Check-out <span className="font-medium text-ink">{formatLongDate(property.checkOut)}</span>
                </span>
              )}
              {nights !== null && (
                <span>
                  <span className="font-medium text-ink">{nights}</span> {nights === 1 ? "night" : "nights"}
                </span>
              )}
            </div>
          )}

          {property.description && (
            <p className="mt-6 text-[15px] leading-[1.65] text-ink-soft">{property.description}</p>
          )}

          {property.amenities.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <Pill key={amenity} className="bg-cream text-ink-soft">
                  {amenity}
                </Pill>
              ))}
            </div>
          )}

          {property.confirmationNumber && (
            <p className="mt-6 text-[13px] text-ink-soft">
              Confirmation <span className="font-medium text-ink">{property.confirmationNumber}</span>
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Accommodation({ accommodations }: { accommodations: AccommodationData[] }) {
  if (accommodations.length === 0) return null;

  const sorted = [...accommodations].sort(
    (a, b) => new Date(a.checkIn || 0).getTime() - new Date(b.checkIn || 0).getTime(),
  );

  return (
    <section id="accommodation" className="py-24">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <SectionHeading eyebrow="Stay" title="Accommodation" />

        <div className="mt-14 space-y-4">
          {sorted.map((property, i) => (
            <div key={property.id}>
              <PropertyCard property={property} index={i} />
              {i < sorted.length - 1 && (
                <div className="my-4 flex justify-center">
                  <span className="h-8 w-px bg-ink/15" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
