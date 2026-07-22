import type { CabinClass, FlightEndpoint, FlightJourney, FlightLeg, Trip } from "../data/trip";
import { removeAt, updateAt } from "../lib/arrayOps";
import { createEmptyJourney, createEmptyLeg } from "../lib/tripStorage";
import { Button, DateField, Panel, SelectField, TextField, TimeField } from "./primitives";

interface Props {
  trip: Trip;
  updateTrip: (updater: (t: Trip) => Trip) => void;
}

const CABIN_CLASSES: CabinClass[] = ["Economy", "Premium Economy", "Business", "First"];

export function FlightsSection({ trip, updateTrip }: Props) {
  const flights = trip.flights;
  const setFlights = (next: FlightJourney[]) => updateTrip((t) => ({ ...t, flights: next }));

  const addJourney = (direction: "outbound" | "return") => setFlights([...flights, createEmptyJourney(direction)]);
  const removeJourney = (id: string) => setFlights(flights.filter((j) => j.id !== id));
  const updateJourney = (id: string, updater: (j: FlightJourney) => FlightJourney) =>
    setFlights(flights.map((j) => (j.id === id ? updater(j) : j)));

  return (
    <Panel
      title="Flights"
      actions={
        <>
          <Button variant="ghost" onClick={() => addJourney("outbound")}>
            + Outbound journey
          </Button>
          <Button variant="ghost" onClick={() => addJourney("return")}>
            + Return journey
          </Button>
        </>
      }
    >
      {flights.length === 0 && <p className="text-sm text-ink-soft">No flights added.</p>}
      {flights.map((journey) => (
        <JourneyEditor
          key={journey.id}
          journey={journey}
          onChange={(updater) => updateJourney(journey.id, updater)}
          onRemove={() => removeJourney(journey.id)}
        />
      ))}
    </Panel>
  );
}

function JourneyEditor({
  journey,
  onChange,
  onRemove,
}: {
  journey: FlightJourney;
  onChange: (updater: (j: FlightJourney) => FlightJourney) => void;
  onRemove: () => void;
}) {
  const setLegs = (legs: FlightLeg[]) =>
    onChange((j) => ({
      ...j,
      legs,
      layovers: Array.from({ length: Math.max(0, legs.length - 1) }, (_, i) => j.layovers?.[i] ?? ""),
    }));

  const addLeg = () => setLegs([...journey.legs, createEmptyLeg()]);
  const removeLeg = (i: number) => setLegs(removeAt(journey.legs, i));
  const updateLeg = (i: number, updater: (l: FlightLeg) => FlightLeg) => setLegs(updateAt(journey.legs, i, updater));
  const setLayover = (i: number, value: string) =>
    onChange((j) => ({ ...j, layovers: updateAt(j.layovers ?? [], i, () => value) }));

  return (
    <div className="rounded-nested border border-ink/10 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SelectField
          label="Direction"
          value={journey.direction}
          onChange={(v) => onChange((j) => ({ ...j, direction: v as "outbound" | "return" }))}
          options={[
            { value: "outbound", label: "Outbound" },
            { value: "return", label: "Return" },
          ]}
        />
        <Button variant="danger" onClick={onRemove}>
          Remove journey
        </Button>
      </div>

      <div className="mt-4 space-y-2">
        {journey.legs.map((leg, i) => (
          <div key={i}>
            <LegEditor
              leg={leg}
              onChange={(updater) => updateLeg(i, updater)}
              onRemove={() => removeLeg(i)}
              removable={journey.legs.length > 1}
            />
            {i < journey.legs.length - 1 && (
              <div className="my-2 pl-2">
                <TextField
                  label={`Layover after leg ${i + 1}`}
                  value={journey.layovers?.[i] ?? ""}
                  onChange={(v) => setLayover(i, v)}
                  placeholder="e.g. 1h 50m layover in Paris (CDG)"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3">
        <Button variant="ghost" onClick={addLeg}>
          + Add connecting leg
        </Button>
      </div>
    </div>
  );
}

function LegEditor({
  leg,
  onChange,
  onRemove,
  removable,
}: {
  leg: FlightLeg;
  onChange: (updater: (l: FlightLeg) => FlightLeg) => void;
  onRemove: () => void;
  removable: boolean;
}) {
  const setField = (patch: Partial<FlightLeg>) => onChange((l) => ({ ...l, ...patch }));
  const setDeparture = (patch: Partial<FlightEndpoint>) =>
    onChange((l) => ({ ...l, departure: { ...l.departure, ...patch } }));
  const setArrival = (patch: Partial<FlightEndpoint>) =>
    onChange((l) => ({ ...l, arrival: { ...l.arrival, ...patch } }));

  return (
    <div className="rounded-nested bg-cream/60 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Flight leg</p>
        {removable && (
          <Button variant="danger" onClick={onRemove}>
            Remove leg
          </Button>
        )}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <TextField label="Airline" value={leg.airline} onChange={(v) => setField({ airline: v })} />
        <TextField label="Flight number" value={leg.flightNumber} onChange={(v) => setField({ flightNumber: v })} />
        <TextField
          label="Booking reference"
          value={leg.bookingReference}
          onChange={(v) => setField({ bookingReference: v })}
        />
        <TextField
          label="Duration"
          value={leg.duration}
          onChange={(v) => setField({ duration: v })}
          placeholder="e.g. 7h 20m"
        />
        <SelectField
          label="Cabin class"
          value={leg.cabinClass}
          onChange={(v) => setField({ cabinClass: v as CabinClass })}
          options={CABIN_CLASSES.map((c) => ({ value: c, label: c }))}
        />
        <TextField label="Seats" value={leg.seats} onChange={(v) => setField({ seats: v })} placeholder="e.g. 3A, 3B" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <EndpointEditor title="Departure" endpoint={leg.departure} onChange={setDeparture} />
        <EndpointEditor title="Arrival" endpoint={leg.arrival} onChange={setArrival} />
      </div>
    </div>
  );
}

function EndpointEditor({
  title,
  endpoint,
  onChange,
}: {
  title: string;
  endpoint: FlightEndpoint;
  onChange: (patch: Partial<FlightEndpoint>) => void;
}) {
  return (
    <div className="rounded-nested border border-ink/10 bg-white p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-accent">{title}</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <TextField label="Airport code" value={endpoint.airportCode} onChange={(v) => onChange({ airportCode: v })} />
        <TextField label="Terminal" value={endpoint.terminal ?? ""} onChange={(v) => onChange({ terminal: v })} />
        <TextField
          label="Airport name"
          value={endpoint.airportName}
          onChange={(v) => onChange({ airportName: v })}
          className="col-span-2"
        />
        <TextField label="City" value={endpoint.city} onChange={(v) => onChange({ city: v })} className="col-span-2" />
        <DateField label="Date" value={endpoint.date} onChange={(v) => onChange({ date: v })} />
        <TimeField label="Time" value={endpoint.time} onChange={(v) => onChange({ time: v })} />
      </div>
    </div>
  );
}
