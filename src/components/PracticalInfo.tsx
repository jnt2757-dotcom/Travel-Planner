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
  const hasContacts = info.emergencyContacts.length > 0;
  const planner = info.plannerContact;
  const hasPlanner = Boolean(planner.name || planner.role || planner.phone || planner.email);
  const hasCurrency = Boolean(info.currency);
  const hasTimeZone = Boolean(info.timeZone);
  const packingNotes = info.packingNotes.filter((n) => n.trim().length > 0);

  const hasAnyCard = hasContacts || hasPlanner || hasCurrency || hasTimeZone || packingNotes.length > 0;
  if (!hasAnyCard) return null;

  let cardIndex = 0;

  return (
    <section id="practical-information" className="bg-white/60 py-24">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <SectionHeading eyebrow="Good to know" title="Practical information" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {hasContacts && (
            <InfoCard index={cardIndex++} title="Emergency contacts">
              <ul className="space-y-2.5">
                {info.emergencyContacts.map((contact, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-4 text-[15px]">
                    <span className="text-ink-soft">{contact.label}</span>
                    <span className="font-medium text-ink">{contact.phone}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          )}

          {hasPlanner && (
            <InfoCard index={cardIndex++} title="Your planner">
              {planner.name && <p className="text-[15px] font-medium text-ink">{planner.name}</p>}
              {planner.role && <p className="text-[13px] text-ink-soft">{planner.role}</p>}
              {planner.phone && <p className="mt-3 text-[15px] text-ink-soft">{planner.phone}</p>}
              {planner.email && <p className="text-[15px] text-ink-soft">{planner.email}</p>}
            </InfoCard>
          )}

          {hasCurrency && (
            <InfoCard index={cardIndex++} title="Currency">
              <p className="text-[15px] leading-[1.65] text-ink-soft">{info.currency}</p>
            </InfoCard>
          )}

          {hasTimeZone && (
            <InfoCard index={cardIndex++} title="Time zone">
              <p className="text-[15px] leading-[1.65] text-ink-soft">{info.timeZone}</p>
            </InfoCard>
          )}

          {packingNotes.length > 0 && (
            <InfoCard index={cardIndex++} title="Packing & dress code">
              <ul className="space-y-2 text-[15px] leading-[1.65] text-ink-soft">
                {packingNotes.map((note, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          )}
        </div>
      </div>
    </section>
  );
}
