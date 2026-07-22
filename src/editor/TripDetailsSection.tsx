import type { Trip } from "../data/trip";
import { DateField, ImageField, NumberField, Panel, StringListField, TextField } from "./primitives";

interface Props {
  trip: Trip;
  updateTrip: (updater: (t: Trip) => Trip) => void;
}

export function TripDetailsSection({ trip, updateTrip }: Props) {
  const { meta, overview, footer } = trip;

  const setMeta = (patch: Partial<Trip["meta"]>) =>
    updateTrip((t) => ({
      ...t,
      meta: { ...t.meta, ...patch },
      footer: patch.agencyName !== undefined ? { ...t.footer, agencyName: patch.agencyName } : t.footer,
    }));

  const setOverview = (patch: Partial<Trip["overview"]>) =>
    updateTrip((t) => ({ ...t, overview: { ...t.overview, ...patch } }));

  const setFooter = (patch: Partial<Trip["footer"]>) =>
    updateTrip((t) => ({ ...t, footer: { ...t.footer, ...patch } }));

  return (
    <Panel title="Trip details">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Trip title" value={meta.title} onChange={(v) => setMeta({ title: v })} />
        <TextField label="Client name" value={meta.clientName} onChange={(v) => setMeta({ clientName: v })} />
        <TextField label="Destination" value={meta.destination} onChange={(v) => setMeta({ destination: v })} />
        <TextField label="Agency name" value={meta.agencyName} onChange={(v) => setMeta({ agencyName: v })} />
        <DateField label="Start date" value={meta.startDate} onChange={(v) => setMeta({ startDate: v })} />
        <DateField label="End date" value={meta.endDate} onChange={(v) => setMeta({ endDate: v })} />
        <TextField
          label="Prepared-by line"
          value={meta.preparedByLine}
          onChange={(v) => setMeta({ preparedByLine: v })}
          className="sm:col-span-2"
        />
      </div>

      <ImageField label="Hero image URL" value={meta.heroImage} onChange={(v) => setMeta({ heroImage: v })} />
      <TextField
        label="Hero image alt text"
        value={meta.heroImageAlt}
        onChange={(v) => setMeta({ heroImageAlt: v })}
      />

      <div className="border-t border-ink/10 pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Overview</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Traveler count"
            value={overview.travelerCount}
            onChange={(v) => setOverview({ travelerCount: v })}
          />
          <NumberField
            label="Destinations count"
            value={overview.destinationsCount}
            onChange={(v) => setOverview({ destinationsCount: v })}
          />
        </div>
        <div className="mt-4">
          <StringListField
            label="Intro paragraphs"
            items={overview.introCopy}
            onChange={(items) => setOverview({ introCopy: items })}
            placeholder="A paragraph of introductory copy…"
            multiline
          />
        </div>
      </div>

      <div className="border-t border-ink/10 pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Footer</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <TextField label="Contact line" value={footer.contactLine} onChange={(v) => setFooter({ contactLine: v })} />
          <TextField
            label="Closing sentence"
            value={footer.closingSentence}
            onChange={(v) => setFooter({ closingSentence: v })}
          />
        </div>
      </div>
    </Panel>
  );
}
