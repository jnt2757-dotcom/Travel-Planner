import type { Metadata } from "next";
import { projects } from "@content/projects";
import { InquiryBand, PageIntro, ProjectCard } from "@/components/sections";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Custom homes by Thompson Building Group across Myers Park, Foxcroft, Eastover, SouthPark, Lake Norman and Carmel Country Club.",
  alternates: { canonical: "/portfolio" },
};

// Editorial rhythm: wide, then two staggered, repeating.
const layout = ["md:col-span-12", "md:col-span-7", "md:col-span-5 md:mt-40"];
const aspects = ["aspect-[4/3] md:aspect-[21/9]", "aspect-[4/3]", "aspect-[4/5]"];

export default function PortfolioPage() {
  return (
    <>
      <PageIntro
        label="Portfolio"
        title="Homes we have built"
        lede="Each residence is a collaboration with one of Charlotte's esteemed architects. Select a home to view its gallery."
      />
      <section aria-label="Projects" className="container-page pb-[var(--section)]">
        <ul className="grid gap-x-8 gap-y-20 md:grid-cols-12">
          {projects.map((project, i) => (
            <li key={project.slug} className={layout[i % 3]}>
              <ProjectCard
                project={project}
                headingLevel="h2"
                priority={i === 0}
                aspect={aspects[i % 3]}
                sizes={i % 3 === 0 ? "(min-width: 1440px) 1360px, 100vw" : "(min-width: 768px) 55vw, 100vw"}
              />
            </li>
          ))}
        </ul>
      </section>
      <InquiryBand />
    </>
  );
}
