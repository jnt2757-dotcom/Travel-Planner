import type { Accommodation, Trip } from "../data/trip";
import { createEmptyAccommodation } from "../lib/tripStorage";
import { Button, DateField, ImageField, Panel, StringListField, TextAreaField, TextField } from "./primitives";

interface Props {
  trip: Trip;
  updateTrip: (updater: (t: Trip) => Trip) => void;
}

export function AccommodationSection({ trip, updateTrip }: Props) {
  const items = trip.accommodations;
  const setItems = (next: Accommodation[]) => updateTrip((t) => ({ ...t, accommodations: next }));

  const addItem = () => setItems([...items, createEmptyAccommodation()]);
  const removeItem = (id: string) => setItems(items.filter((a) => a.id !== id));
  const updateItem = (id: string, updater: (a: Accommodation) => Accommodation) =>
    setItems(items.map((a) => (a.id === id ? updater(a) : a)));

  return (
    <Panel
      title="Accommodation"
      actions={
        <Button variant="ghost" onClick={addItem}>
          + Add property
        </Button>
      }
    >
      {items.length === 0 && <p className="text-sm text-ink-soft">No properties added.</p>}
      {items.map((item) => (
        <PropertyEditor
          key={item.id}
          property={item}
          onChange={(updater) => updateItem(item.id, updater)}
          onRemove={() => removeItem(item.id)}
        />
      ))}
    </Panel>
  );
}

function PropertyEditor({
  property,
  onChange,
  onRemove,
}: {
  property: Accommodation;
  onChange: (updater: (a: Accommodation) => Accommodation) => void;
  onRemove: () => void;
}) {
  const setField = (patch: Partial<Accommodation>) => onChange((p) => ({ ...p, ...patch }));

  return (
    <div className="rounded-nested border border-ink/10 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Property</p>
        <Button variant="danger" onClick={onRemove}>
          Remove property
        </Button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <TextField label="Name" value={property.name} onChange={(v) => setField({ name: v })} />
        <TextField label="City" value={property.city} onChange={(v) => setField({ city: v })} />
        <TextField label="Room / suite type" value={property.roomType} onChange={(v) => setField({ roomType: v })} />
        <TextField
          label="Confirmation number"
          value={property.confirmationNumber}
          onChange={(v) => setField({ confirmationNumber: v })}
        />
        <DateField label="Check-in" value={property.checkIn} onChange={(v) => setField({ checkIn: v })} />
        <DateField label="Check-out" value={property.checkOut} onChange={(v) => setField({ checkOut: v })} />
      </div>

      <div className="mt-3">
        <TextAreaField
          label="Description"
          value={property.description}
          onChange={(v) => setField({ description: v })}
          rows={3}
        />
      </div>

      <div className="mt-3">
        <ImageField label="Image URL" value={property.image} onChange={(v) => setField({ image: v })} />
      </div>
      <div className="mt-3">
        <TextField label="Image alt text" value={property.imageAlt} onChange={(v) => setField({ imageAlt: v })} />
      </div>

      <div className="mt-3">
        <StringListField
          label="Amenities"
          items={property.amenities}
          onChange={(v) => setField({ amenities: v })}
          placeholder="e.g. Private terrace"
        />
      </div>
    </div>
  );
}
