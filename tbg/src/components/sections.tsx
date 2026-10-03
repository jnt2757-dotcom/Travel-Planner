import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@content/types";
import { Photo } from "@/components/photo";
import { cn } from "@/lib/utils";

/** Letter-spaced eyebrow label above a serif heading. */
export function SectionHeading({
  id,
  label,
  title,
  as: Tag = "h2",
  className,
  children,
}: {
  id?: string;
  label: string;
  title: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p data-reveal className="label text-bronze">
        {label}
      </p>
      <Tag
        id={id}
        data-reveal
        className={cn("mt-6 text-charcoal", Tag === "h1" ? "text-display" : "text-headline")}
      >
        {title}
      </Tag>
      {children}
    </div>
  );
}

/**
 * Top of every inner page. Deliberately not scroll-revealed: it is the first
 * thing on screen and usually the LCP element.
 */
export function PageIntro({ label, title, lede }: { label: string; title: string; lede?: string }) {
  return (
    <header className="container-page pt-[calc(var(--header-h)+clamp(5rem,10vw,10rem))] pb-[clamp(3rem,6vw,6rem)]">
      <p className="label text-bronze">{label}</p>
      <h1 className="mt-6 max-w-[16ch] text-display text-charcoal">{title}</h1>
      {lede ? <p className="mt-8 max-w-2xl text-lede text-graphite">{lede}</p> : null}
    </header>
  );
}

export function ProjectCard({
  project,
  sizes,
  aspect = "aspect-[4/3]",
  priority,
  headingLevel: Heading = "h3",
}: {
  project: Project;
  sizes: string;
  aspect?: string;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block focus-visible:outline-offset-8">
      <div data-reveal-image={priority ? undefined : ""} className={cn("relative overflow-hidden bg-stone", aspect)}>
        <Photo
          photo={project.cover}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[var(--duration-image)] ease-[var(--ease-arrive)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <Heading className="font-serif text-title text-charcoal">
          <span className="link-underline group-hover:bg-[length:100%_1px]">{project.name}</span>
        </Heading>
        <p className="label shrink-0 text-graphite">{project.neighborhood}</p>
      </div>
    </Link>
  );
}

export function TextLink({ href, children, tone = "dark" }: { href: string; children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <Link
      href={href}
      className={cn(
        "label group inline-flex items-center gap-3 py-2",
        tone === "dark" ? "text-charcoal hover:text-bronze" : "text-ember hover:text-gilt",
      )}
    >
      <span className="link-underline group-hover:bg-[length:100%_1px]">{children}</span>
      <ArrowRight
        className="size-4 transition-transform duration-[var(--duration-hover)] group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}

/** Dark band that closes most pages with the inquiry call to action. */
export function InquiryBand() {
  return (
    <section aria-labelledby="inquiry-band" className="dark-surface bg-charcoal-soft text-ember">
      <div className="container-page section-y grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p data-reveal className="label text-gilt">
            Inquiries
          </p>
          <h2 id="inquiry-band" data-reveal className="mt-6 text-headline text-ember">
            Begin a conversation about your home.
          </h2>
        </div>
        <div data-reveal className="md:col-span-4 md:justify-self-end">
          <Link
            href="/inquiries"
            className="label inline-flex h-14 items-center gap-3 bg-ember px-8 text-charcoal transition-colors duration-[var(--duration-hover)] hover:bg-linen"
          >
            Start an inquiry
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
