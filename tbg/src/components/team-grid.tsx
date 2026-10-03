// Modelled on the 21st.dev "Team Member Cards" pattern (portrait, name, role,
// short bio, profile link) and rebuilt for TBG: tall monochrome portraits,
// serif names, letter-spaced roles, no card chrome.
import type { TeamMember } from "@content/types";
import { Photo } from "@/components/photo";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
      />
    </svg>
  );
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  const [lead, ...rest] = members;
  return (
    <div className="grid gap-x-8 gap-y-20">
      {/* The president leads, larger and alongside his bio. */}
      <article className="grid gap-8 md:grid-cols-12 md:items-end">
        <div data-reveal-image className="relative aspect-[4/5] overflow-hidden bg-stone md:col-span-5">
          <Photo photo={lead.photo} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top" />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p data-reveal className="label text-bronze">
            {lead.role}
          </p>
          <h3 data-reveal className="mt-4 font-serif text-headline font-light text-charcoal">
            {lead.name}
          </h3>
          <p data-reveal className="mt-6 max-w-[52ch] text-lede text-graphite">
            {lead.bio}
          </p>
          {lead.linkedin ? (
            <a
              data-reveal
              href={lead.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-8 inline-flex min-h-11 items-center gap-3 text-charcoal hover:text-bronze"
            >
              <LinkedInIcon />
              LinkedIn
              <span className="sr-only">: {lead.name} (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </article>

      <ul className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((member, i) => (
          <li key={member.name} data-reveal data-reveal-delay={(i % 4) * 0.08}>
            <article>
              <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                <Photo
                  photo={member.photo}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <h3 className="mt-6 font-serif text-title text-charcoal">{member.name}</h3>
              <p className="label mt-3 text-bronze">{member.role}</p>
              <p className="mt-4 text-graphite">{member.bio}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
