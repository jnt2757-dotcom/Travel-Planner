import type { Metadata } from "next";
import { underConstruction } from "@content/construction";
import { Photo } from "@/components/photo";
import { InquiryBand, PageIntro } from "@/components/sections";

export const metadata: Metadata = {
  title: "Under Construction",
  description:
    "Homes Thompson Building Group is building now in Eastover, Foxcroft, Myers Park and SouthPark.",
  alternates: { canonical: "/under-construction" },
};

const countBy = underConstruction.reduce<Record<string, number>>((acc, h) => {
  acc[h.neighborhood] = (acc[h.neighborhood] ?? 0) + 1;
  return acc;
}, {});

export default function UnderConstructionPage() {
  return (
    <>
      <PageIntro
        label="Under Construction"
        title="Currently building"
        lede={`${underConstruction.length} residences underway across ${Object.entries(countBy)
          .map(([n, c]) => `${n}${c > 1 ? ` (${c})` : ""}`)
          .join(", ")}.`}
      />
      <section aria-label="Homes in progress" className="container-page pb-[var(--section)]">
        <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
          {underConstruction.map((home, i) => (
            <li key={home.id} className={i % 2 === 1 ? "sm:mt-24" : undefined}>
              <figure>
                <div
                  data-reveal-image={i < 2 ? undefined : ""}
                  className="relative aspect-[3/2] overflow-hidden bg-stone"
                >
                  <Photo
                    photo={home.photo}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 640px) 48vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-b border-hairline pb-5">
                  <span className="font-serif text-title text-charcoal">{home.neighborhood}</span>
                  <span className="label text-graphite">
                    No. {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
      <InquiryBand />
    </>
  );
}
