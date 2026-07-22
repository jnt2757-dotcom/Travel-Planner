import type { ReactNode } from "react";
import type { PracticalInfo as PracticalInfoData } from "../data/trip";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function InfoCard({ title, children, index }: { title: string; children: ReactNode; index: number }) {
  return (
    <Reveal index={index} as="div" className="avoid-break rounded-nested bg-white p-7 shadow-card">
      <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-accent">{title}</h3>
      <div className="mt-4">{children}</div>
    </Reveal>
  );
}

export function PracticalInfo({ info }: { info: PracticalInfoData }) {
  return (
    <section id="practical-information" className="bg-white/60 py-24">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <SectionHeading eyebrow="Good to know" title="Practical information" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          <InfoCard index={0} title="Emergency contacts">
            <ul className="space-y-2.5">
              {info.emergencyContacts.map((contact) => (
                <li key={contact.label} className="flex items-baseline justify-between gap-4 text-[15px]">
                  <span className="text-ink-soft">{contact.label}</span>
                  <span className="font-medium text-ink">{contact.phone}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard index={1} title="Your planner">
            <p className="text-[15px] font-medium text-ink">{info.plannerContact.name}</p>
            <p className="text-[13px] text-ink-soft">{info.plannerContact.role}</p>
            <p className="mt-3 text-[15px] text-ink-soft">{info.plannerContact.phone}</p>
            <p className="text-[15px] text-ink-soft">{info.plannerContact.email}</p>
          </InfoCard>

          <InfoCard index={2} title="Currency">
            <p className="text-[15px] leading-[1.65] text-ink-soft">{info.currency}</p>
          </InfoCard>

          <InfoCard index={3} title="Time zone">
            <p className="text-[15px] leading-[1.65] text-ink-soft">{info.timeZone}</p>
          </InfoCard>

          <InfoCard index={4} title="Packing & dress code">
            <ul className="space-y-2 text-[15px] leading-[1.65] text-ink-soft">
              {info.packingNotes.map((note) => (
                <li key={note} className="flex gap-2.5">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}
