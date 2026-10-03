import type { Metadata } from "next";
import { story, teamIntro } from "@content/site";
import { team } from "@content/team";
import { Photo } from "@/components/photo";
import { InquiryBand, PageIntro, SectionHeading } from "@/components/sections";
import { TeamGrid } from "@/components/team-grid";

export const metadata: Metadata = {
  title: "About",
  description:
    "For over a decade Thompson Building Group has partnered with Charlotte's high-end architects to build architecturally driven residences. Meet our team.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro label="About" title={story.heading} lede={story.paragraphs[0]} />

      <div className="container-page">
        <div className="relative aspect-[16/10] overflow-hidden bg-stone md:aspect-[21/9]">
          <Photo
            photo={{
              src: "/images/projects/organic-art-nouveau-1.webp",
              alt: "Organic Art Nouveau in Foxcroft: cedar shake roof with symmetrical dormers",
            }}
            fill
            priority
            sizes="(min-width: 1440px) 1360px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <section aria-label="Our story" className="container-page section-y grid gap-10 md:grid-cols-12">
        <p data-reveal className="label text-bronze md:col-span-3">
          Our story
        </p>
        <div className="space-y-8 md:col-span-7 md:col-start-5">
          {story.paragraphs.slice(1).map((p) => (
            <p key={p.slice(0, 24)} data-reveal className="text-lede text-graphite first:text-charcoal">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section aria-labelledby="team" className="border-t border-hairline bg-linen">
        <div className="container-page section-y">
          <SectionHeading id="team" label="The people" title={teamIntro.heading}>
            {teamIntro.paragraphs.slice(1).map((p) => (
              <p key={p.slice(0, 24)} data-reveal className="mt-8 max-w-[62ch] text-lede text-graphite">
                {p}
              </p>
            ))}
          </SectionHeading>
          <div className="mt-24">
            <TeamGrid members={team} />
          </div>
        </div>
      </section>

      <InquiryBand />
    </>
  );
}
