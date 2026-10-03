import { cn } from "@/lib/utils";

/** The four-bar TBG mark, redrawn from the logo so it stays crisp at any size. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 215 235"
      className={cn("h-7 w-auto", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="#9e8759">
        <rect x="0" y="0" width="30" height="80" />
        <rect x="60" y="0" width="30" height="235" />
        <rect x="122" y="0" width="30" height="235" />
        <rect x="185" y="0" width="30" height="80" />
      </g>
    </svg>
  );
}

/** Mark + name lockup for the header and footer. */
export function BrandLockup({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <BrandMark className="h-6" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.15rem] tracking-[0.18em] uppercase",
            tone === "dark" ? "text-charcoal" : "text-linen",
          )}
        >
          Thompson
        </span>
        <span
          className={cn(
            "mt-1 text-[0.5625rem] font-medium tracking-[0.42em] uppercase",
            tone === "dark" ? "text-graphite" : "text-ember-muted",
          )}
        >
          Building Group
        </span>
      </span>
    </span>
  );
}
