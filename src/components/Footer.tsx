import type { FooterInfo } from "../data/trip";

export function Footer({ footer }: { footer: FooterInfo }) {
  if (!footer.agencyName && !footer.contactLine && !footer.closingSentence) return null;

  return (
    <footer className="border-t border-ink/10 py-16">
      <div className="mx-auto max-w-[1120px] px-6 text-center sm:px-10">
        {footer.agencyName && <p className="font-display text-2xl text-ink">{footer.agencyName}</p>}
        {footer.contactLine && <p className="mt-3 text-sm text-ink-soft">{footer.contactLine}</p>}
        {footer.closingSentence && (
          <p className="mt-8 text-sm italic text-ink-soft">{footer.closingSentence}</p>
        )}
      </div>
    </footer>
  );
}
