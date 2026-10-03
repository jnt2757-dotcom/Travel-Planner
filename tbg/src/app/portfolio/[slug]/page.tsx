import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProject, projects } from "@content/projects";
import { Photo } from "@/components/photo";
import { ProjectGallery } from "@/components/gallery/project-gallery";
import { InquiryBand, ProjectCard, TextLink } from "@/components/sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name}, ${project.neighborhood}`,
    description: `${project.name}, a custom residence in ${project.community} built by Thompson Building Group. Architecture by ${project.architect}.`,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: { images: [{ url: project.cover.src, alt: project.cover.alt }] },
  };
}

export default async function ProjectPage(props: PageProps<"/portfolio/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <article>
        <header className="container-page pt-[calc(var(--header-h)+clamp(4rem,8vw,8rem))]">
          <Link
            href="/portfolio"
            className="label inline-flex min-h-11 items-center gap-3 text-graphite hover:text-bronze"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Portfolio
          </Link>
          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="label text-bronze">{project.neighborhood}</p>
              <h1 className="mt-6 text-display text-charcoal">{project.name}</h1>
            </div>
            <dl className="grid grid-cols-2 gap-6 border-t border-hairline pt-6 md:col-span-4">
              <div>
                <dt className="label text-graphite">Architecture</dt>
                <dd className="mt-2 font-serif text-lede text-charcoal">{project.architect}</dd>
              </div>
              <div>
                <dt className="label text-graphite">Community</dt>
                <dd className="mt-2 font-serif text-lede text-charcoal">{project.community}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="mt-16 md:mt-24">
          <div className="relative aspect-[4/3] overflow-hidden bg-stone md:aspect-[21/9]">
            <Photo photo={project.cover} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>

        <section aria-label={`${project.name} gallery`} className="container-page section-y">
          <ProjectGallery photos={project.gallery} title={project.name} />
        </section>
      </article>

      <section aria-labelledby="next-project" className="border-t border-hairline bg-linen">
        <div className="container-page py-[clamp(4rem,8vw,8rem)]">
          <div className="flex items-end justify-between gap-6">
            <h2 id="next-project" data-reveal className="label font-sans font-medium text-bronze">
              Next residence
            </h2>
            <div data-reveal>
              <TextLink href="/portfolio">All projects</TextLink>
            </div>
          </div>
          <div className="mt-10 md:w-7/12">
            <ProjectCard project={next} sizes="(min-width: 768px) 55vw, 100vw" />
          </div>
        </div>
      </section>

      <InquiryBand />
    </>
  );
}
