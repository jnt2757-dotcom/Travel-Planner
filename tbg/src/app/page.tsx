import type { Metadata } from "next";
import { featuredProjects, projects } from "@content/projects";
import { underConstruction } from "@content/construction";
import { neighborhoods, site, story } from "@content/site";
import { buildHero } from "@/config/hero";
import { BuildHero } from "@/components/hero/build-hero";
import { HeroSequence } from "@/components/hero/hero-sequence";
import { HeroStill } from "@/components/hero/hero-still";
import { InquiryBand, ProjectCard, SectionHeading, TextLink } from "@/components/sections";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Luxury Custom Home Builder in Charlotte, NC` },
  description: site.description,
  alternates: { canonical: "/" },
};

const neighborhoodStats = neighborhoods.map((name) => ({
  name,
  completed: projects.filter((p) => p.neighborhood === name).length,
  building: underConstruction.filter((h) => h.neighborhood === name).length,
}));

export default function HomePage() {
  const [lead, ...rest] = featuredProjects;

  return (
    <>
      {buildHero.enabled ? <BuildHero /> : <HeroSequence />}
      <HeroStill />

      {/* Intro */}
      <section aria-labelledby="intro" className="container-page section-y grid gap-12 md:grid-cols-12">
        <p data-reveal className="label text-bronze md:col-span-3">
          The firm
        </p>
        <div className="md:col-span-8 md:col-start-5">
          <h2 id="intro" data-reveal className="text-headline text-charcoal">
            Architecturally driven residences for Charlotte&apos;s most discerning homeowners.
          </h2>
          <p data-reveal className="mt-10 max-w-[62ch] text-lede text-graphite">
            {story.paragraphs[0]}
          </p>
          <p data-reveal className="mt-6 max-w-[62ch] text-graphite">
            {story.paragraphs[2]}
          </p>
          <div data-reveal className="mt-10">
            <TextLink href="/about">About the firm</TextLink>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section aria-labelledby="featured" className="pb-[var(--section)]">
        <div className="container-page flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="featured" label="Portfolio" title="Selected residences" />
          <div data-reveal>
            <TextLink href="/portfolio">View the full portfolio</TextLink>
          </div>
        </div>

        <div className="container-page mt-16 grid gap-x-8 gap-y-20 md:grid-cols-12">
          <div className="md:col-span-12">
            <ProjectCard project={lead} sizes="(min-width: 1440px) 1360px, 100vw" aspect="aspect-[4/3] md:aspect-[21/9]" />
          </div>
          {rest.map((project, i) => (
            <div
              key={project.slug}
              className={i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-32"}
            >
              <ProjectCard
                project={project}
                sizes="(min-width: 768px) 55vw, 100vw"
                aspect={i % 2 === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhoods */}
      <section aria-labelledby="neighborhoods" className="border-y border-hairline bg-linen">
        <div className="container-page py-[clamp(4rem,8vw,8rem)]">
          <p data-reveal className="label text-bronze" id="neighborhoods">
            Where we build
          </p>
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {neighborhoodStats.map((n) => (
              <li
                key={n.name}
                data-reveal
                className="border-t border-hairline py-8 lg:border-t-0 lg:border-l lg:px-8 lg:py-2 lg:first:border-l-0 lg:first:pl-0"
              >
                <p className="font-serif text-title text-charcoal">{n.name}</p>
                <p className="label mt-4 text-graphite">
                  {[
                    n.completed ? `${n.completed} completed` : null,
                    n.building ? `${n.building} underway` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InquiryBand />
    </>
  );
}
