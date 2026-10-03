import type { NavItem, Neighborhood } from "./types";

export const site = {
  name: "Thompson Building Group",
  shortName: "TBG",
  tagline: "Luxury Builder",
  url: "https://www.thompsonbuildinggroup.com",
  description:
    "Thompson Building Group is a Charlotte luxury custom home builder creating architecturally driven residences in Eastover, Myers Park, Foxcroft, SouthPark and Lake Norman.",
  buildStudio: {
    label: "Login to Build Studio",
    href: "https://thebuildstudio.com",
  },
  contact: {
    street: "519 Fenton Place",
    city: "Charlotte",
    region: "NC",
    postalCode: "28207",
    phone: "704.202.4390",
    phoneHref: "tel:+17042024390",
  },
  social: {
    instagram: {
      handle: "@thompson_cbg",
      href: "https://www.instagram.com/thompson_cbg/",
    },
    linkedin: {
      label: "Ted Thompson on LinkedIn",
      // TODO: replace with Ted's profile URL — the current site doesn't publish one.
      href: "https://www.linkedin.com/search/results/people/?keywords=Ted%20Thompson%20Thompson%20Building%20Group",
    },
  },
} as const;

/** Neighborhoods in the order the current site lists them. */
export const neighborhoods = [
  "Eastover",
  "Myers Park",
  "Foxcroft",
  "SouthPark",
  "Lake Norman",
] as const satisfies readonly Neighborhood[];

export const navigation: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Under Construction", href: "/under-construction" },
  { label: "Inquiries", href: "/inquiries" },
];

/** Company story, verbatim from thompsonbuildinggroup.com/about. */
export const story = {
  heading: "Thompson Building Group",
  paragraphs: [
    "Thompson Building Group has been in business for over a decade, fostering solid connections and rewarding partnerships with esteemed high-end architects and top-producing premier realtors in Charlotte, NC. These collaborations have been instrumental in our success and are a testament to our highly-regarded capabilities.",
    "We are a luxury builder focusing on building in desirable in-town neighborhoods like Eastover, Foxcroft, Myers Park, and Lake Norman. Our firm sets itself apart by its meticulous and aesthetic commitment to constructing architecturally driven residences, a dedication that resonates with the most discerning, knowledgeable homeowners with impeccable taste.",
    "Thompson Building Group is proficient at managing Charlotte's most complex residential projects, including a sprawling 25,000-square-foot modern estate residence on Lake Norman. We pride ourselves on maintaining a boutique feel, ensuring our intimate involvement and personalized approach throughout the collaborative design and construction process.",
  ],
};

/** "Our Team" introduction, verbatim from thompsonbuildinggroup.com/about. */
export const teamIntro = {
  heading: "Our Team",
  paragraphs: [
    "Our team at Thompson Building Group delivers unique, cultivated, educational, and senior-level experience skill sets that distinguish our firm from its peers in Charlotte's custom-build industry. President and namesake Ted Thompson brings 27 years of experience to each project. His knowledge is anchored in his lifelong love and expertise in architecture. He built alongside his father and earned a degree in civil engineering and a master's degree in construction management from the University at Buffalo.",
    "Thompson Building Group is known for delivering an elevated, curated client experience to homeowners. We go above and beyond to understand our client's needs and preferences, providing solutions and exceptional service. No matter how complicated or intricate the architecture is, our team exceeds expectations and leaves a lasting, positive impression on each stage of the journey, ensuring a smooth and enjoyable experience.",
  ],
};

export const inquiry = {
  heading: "Inquiry Form",
  intro: "Please submit this form and we will be in touch with you soon.",
};

/** Stages for the build-footage hero (frame sequence from public/hero/build.mp4). */
export const heroSteps = [
  { title: "Foundation", description: "Every residence begins with a precise, engineered footprint." },
  { title: "Framing", description: "The architect's lines take shape, true and square." },
  { title: "Exterior", description: "Stone, slate and timber, detailed by hand." },
  { title: "Interiors", description: "Millwork and finishes, curated room by room." },
  { title: "Home", description: "A residence ready for the life it was designed for." },
] as const;

export const hero = {
  opening: "From plans to reality",
  stages: ["Plans", "Foundation", "Framing", "Exterior", "Home"],
  cta: { label: "View Portfolio", href: "/portfolio" },
} as const;
