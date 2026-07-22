import type { EmergencyContact, PlannerContact, PracticalInfo, Trip } from "../data/trip";
import { removeAt, updateAt } from "../lib/arrayOps";
import { Button, Panel, StringListField, TextField } from "./primitives";

interface Props {
  trip: Trip;
  updateTrip: (updater: (t: Trip) => Trip) => void;
}

export function PracticalInfoSection({ trip, updateTrip }: Props) {
  const info = trip.practicalInfo;
  const setInfo = (patch: Partial<PracticalInfo>) =>
    updateTrip((t) => ({ ...t, practicalInfo: { ...t.practicalInfo, ...patch } }));

  const contacts = info.emergencyContacts;
  const setContacts = (next: EmergencyContact[]) => setInfo({ emergencyContacts: next });
  const addContact = () => setContacts([...contacts, { label: "", phone: "" }]);
  const removeContact = (i: number) => setContacts(removeAt(contacts, i));
  const updateContact = (i: number, patch: Partial<EmergencyContact>) =>
    setContacts(updateAt(contacts, i, (c) => ({ ...c, ...patch })));

  const setPlanner = (patch: Partial<PlannerContact>) =>
    setInfo({ plannerContact: { ...info.plannerContact, ...patch } });

  return (
    <Panel title="Practical information">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-ink-soft">Emergency contacts</span>
          <Button variant="ghost" onClick={addContact}>
            + Add contact
          </Button>
        </div>
        <div className="mt-2 space-y-2">
          {contacts.map((c, i) => (
            <div key={i} className="flex items-end gap-2">
              <TextField label="Label" value={c.label} onChange={(v) => updateContact(i, { label: v })} className="flex-1" />
              <TextField label="Phone" value={c.phone} onChange={(v) => updateContact(i, { phone: v })} className="flex-1" />
              <Button variant="danger" onClick={() => removeContact(i)}>
                Remove
              </Button>
            </div>
          ))}
          {contacts.length === 0 && <p className="text-xs text-ink-soft/70">None added.</p>}
        </div>
      </div>

      <div className="border-t border-ink/10 pt-4">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-soft">Your contact details</span>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <TextField label="Name" value={info.plannerContact.name} onChange={(v) => setPlanner({ name: v })} />
          <TextField label="Role / agency" value={info.plannerContact.role} onChange={(v) => setPlanner({ role: v })} />
          <TextField label="Phone" value={info.plannerContact.phone} onChange={(v) => setPlanner({ phone: v })} />
          <TextField label="Email" value={info.plannerContact.email} onChange={(v) => setPlanner({ email: v })} />
        </div>
      </div>

      <div className="border-t border-ink/10 pt-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField label="Currency" value={info.currency} onChange={(v) => setInfo({ currency: v })} />
          <TextField label="Time zone" value={info.timeZone} onChange={(v) => setInfo({ timeZone: v })} />
        </div>
      </div>

      <div className="border-t border-ink/10 pt-4">
        <StringListField
          label="Packing & dress code notes"
          items={info.packingNotes}
          onChange={(v) => setInfo({ packingNotes: v })}
          placeholder="e.g. Smart-casual for dinners"
        />
      </div>
    </Panel>
  );
}
