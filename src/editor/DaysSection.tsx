import type { ItineraryDay, ItineraryEntry, ItineraryEntryType, Trip } from "../data/trip";
import { ENTRY_TYPE_LABEL } from "../components/EntryTypeIcon";
import { moveItem, removeAt, updateAt } from "../lib/arrayOps";
import { createEmptyDay, createEmptyEntry } from "../lib/tripStorage";
import { Button, DateField, Panel, SelectField, TextAreaField, TextField, TimeField } from "./primitives";

interface Props {
  trip: Trip;
  updateTrip: (updater: (t: Trip) => Trip) => void;
}

const ENTRY_TYPES: ItineraryEntryType[] = ["dining", "activity", "transfer", "leisure", "checkin", "checkout"];

function renumber(days: ItineraryDay[]): ItineraryDay[] {
  return days.map((d, i) => ({ ...d, dayNumber: i + 1 }));
}

export function DaysSection({ trip, updateTrip }: Props) {
  const days = trip.itinerary;
  const setDays = (next: ItineraryDay[]) => updateTrip((t) => ({ ...t, itinerary: renumber(next) }));

  const addDay = () => setDays([...days, createEmptyDay(days.length + 1)]);
  const removeDay = (index: number) => setDays(removeAt(days, index));
  const moveDay = (index: number, dir: -1 | 1) => setDays(moveItem(days, index, index + dir));
  const updateDay = (index: number, updater: (d: ItineraryDay) => ItineraryDay) => setDays(updateAt(days, index, updater));

  return (
    <Panel
      title="Day by day"
      actions={
        <Button variant="ghost" onClick={addDay}>
          + Add day
        </Button>
      }
    >
      {days.length === 0 && <p className="text-sm text-ink-soft">No days added.</p>}
      {days.map((day, i) => (
        <DayEditor
          key={i}
          day={day}
          index={i}
          count={days.length}
          onChange={(updater) => updateDay(i, updater)}
          onRemove={() => removeDay(i)}
          onMove={(dir) => moveDay(i, dir)}
        />
      ))}
    </Panel>
  );
}

function DayEditor({
  day,
  index,
  count,
  onChange,
  onRemove,
  onMove,
}: {
  day: ItineraryDay;
  index: number;
  count: number;
  onChange: (updater: (d: ItineraryDay) => ItineraryDay) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const setField = (patch: Partial<ItineraryDay>) => onChange((d) => ({ ...d, ...patch }));
  const entries = day.entries;
  const setEntries = (next: ItineraryEntry[]) => setField({ entries: next });

  const addEntry = () => setEntries([...entries, createEmptyEntry()]);
  const removeEntry = (i: number) => setEntries(removeAt(entries, i));
  const moveEntry = (i: number, dir: -1 | 1) => setEntries(moveItem(entries, i, i + dir));
  const updateEntry = (i: number, updater: (e: ItineraryEntry) => ItineraryEntry) =>
    setEntries(updateAt(entries, i, updater));

  return (
    <div className="rounded-nested border border-ink/10 p-4">
      <div className="flex items-center justify-between">
        <p className="font-display text-2xl text-accent">Day {index + 1}</p>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" onClick={() => onMove(-1)} disabled={index === 0}>
            Move up
          </Button>
          <Button variant="ghost" onClick={() => onMove(1)} disabled={index === count - 1}>
            Move down
          </Button>
          <Button variant="danger" onClick={onRemove}>
            Remove day
          </Button>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <DateField label="Date" value={day.date} onChange={(v) => setField({ date: v })} />
        <TextField label="City" value={day.city} onChange={(v) => setField({ city: v })} />
        <TextField
          label="Day title"
          value={day.title}
          onChange={(v) => setField({ title: v })}
          className="sm:col-span-2"
        />
      </div>

      <div className="mt-3">
        <TextAreaField
          label="Notes (optional callout)"
          value={day.notes ?? ""}
          onChange={(v) => setField({ notes: v })}
          rows={2}
        />
      </div>

      <div className="mt-4 border-t border-ink/10 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-ink-soft">Timeline entries</span>
          <Button variant="ghost" onClick={addEntry}>
            + Add entry
          </Button>
        </div>
        <div className="mt-2 space-y-3">
          {entries.map((entry, i) => (
            <EntryEditor
              key={i}
              entry={entry}
              index={i}
              count={entries.length}
              onChange={(updater) => updateEntry(i, updater)}
              onRemove={() => removeEntry(i)}
              onMove={(dir) => moveEntry(i, dir)}
            />
          ))}
          {entries.length === 0 && <p className="text-xs text-ink-soft/70">No entries yet.</p>}
        </div>
      </div>
    </div>
  );
}

function EntryEditor({
  entry,
  index,
  count,
  onChange,
  onRemove,
  onMove,
}: {
  entry: ItineraryEntry;
  index: number;
  count: number;
  onChange: (updater: (e: ItineraryEntry) => ItineraryEntry) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const setField = (patch: Partial<ItineraryEntry>) => onChange((e) => ({ ...e, ...patch }));

  return (
    <div className="rounded-nested bg-cream/60 p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Entry {index + 1}</p>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" onClick={() => onMove(-1)} disabled={index === 0}>
            Up
          </Button>
          <Button variant="ghost" onClick={() => onMove(1)} disabled={index === count - 1}>
            Down
          </Button>
          <Button variant="danger" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        <TimeField label="Time" value={entry.time} onChange={(v) => setField({ time: v })} />
        <SelectField
          label="Type"
          value={entry.type}
          onChange={(v) => setField({ type: v as ItineraryEntryType })}
          options={ENTRY_TYPES.map((t) => ({ value: t, label: ENTRY_TYPE_LABEL[t] }))}
        />
        <TextField label="Location" value={entry.location ?? ""} onChange={(v) => setField({ location: v })} />
        <TextField
          label="Title"
          value={entry.title}
          onChange={(v) => setField({ title: v })}
          className="sm:col-span-3"
        />
      </div>

      <div className="mt-2">
        <TextAreaField
          label="Description"
          value={entry.description ?? ""}
          onChange={(v) => setField({ description: v })}
          rows={2}
        />
      </div>
    </div>
  );
}
