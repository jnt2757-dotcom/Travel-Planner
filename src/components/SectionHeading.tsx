import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "text-center" : ""}>
      <div className={`flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{eyebrow}</span>
      </div>
      <h2 className="mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">{title}</h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-[17px] leading-[1.65] text-ink-soft ${isCenter ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
