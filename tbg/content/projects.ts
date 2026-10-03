import type { Project } from "./types";

/**
 * Portfolio, in the order it appears on thompsonbuildinggroup.com/portfolio.
 * `architect` and `community` are copied from each project's page; galleries
 * hold every photo the current site publishes for that home. Add more photos
 * to `gallery` and they flow straight into the project page and lightbox.
 */
export const projects: Project[] = [
  {
    slug: "hollywood-bungalow",
    name: "Hollywood Bungalow",
    neighborhood: "Myers Park",
    community: "Myers Park",
    architect: "Garrett Nelson",
    featured: true,
    cover: {
      src: "/images/projects/hollywood-bungalow-1.webp",
      alt: "Hollywood Bungalow in Myers Park: cedar shake roof, tall chimneys and an arched front porch",
    },
    gallery: [
      {
        src: "/images/projects/hollywood-bungalow-1.webp",
        alt: "Front elevation with cedar shake roof, twin chimneys and arched porch openings",
      },
      {
        src: "/images/projects/hollywood-bungalow-2.webp",
        alt: "Study with a desk beneath a landscape painting and a pair of sculptural lounge chairs",
      },
    ],
  },
  {
    slug: "english-storybook",
    name: "English Storybook",
    neighborhood: "Foxcroft",
    community: "Foxcroft",
    architect: "Garrett Nelson",
    featured: true,
    cover: {
      src: "/images/projects/english-storybook-1.webp",
      alt: "English Storybook in Foxcroft: white stucco gables with arched steel windows",
    },
    gallery: [
      {
        src: "/images/projects/english-storybook-1.webp",
        alt: "White stucco facade with steep gables, chimneys and arched steel windows",
      },
      {
        src: "/images/projects/english-storybook-2.webp",
        alt: "Den framed by steel and glass doors with a crystal chandelier and fireplace",
      },
    ],
  },
  {
    slug: "westport-colonial",
    name: "Westport Colonial",
    neighborhood: "Eastover",
    community: "Eastover",
    architect: "Garrett Nelson",
    cover: {
      src: "/images/projects/westport-colonial-1.webp",
      alt: "Westport Colonial in Eastover: painted brick with dormers and a wood front door",
    },
    gallery: [
      {
        src: "/images/projects/westport-colonial-1.webp",
        alt: "Painted brick facade with three dormers, twin chimneys and a natural wood front door",
      },
      {
        src: "/images/projects/westport-colonial-2.webp",
        alt: "Entry hall with a round table, fresh flowers and botanical wallcovering",
      },
    ],
  },
  {
    slug: "monumental-manor",
    name: "Monumental Manor",
    neighborhood: "SouthPark",
    community: "SouthPark",
    architect: "Bryan Mermans",
    featured: true,
    cover: {
      src: "/images/projects/monumental-manor-1.webp",
      alt: "Monumental Manor in SouthPark: limestone manor house with a tall chimney and arched entry",
    },
    gallery: [
      {
        src: "/images/projects/monumental-manor-1.webp",
        alt: "Limestone manor with steep slate roof, tall chimney and an arched entry",
      },
      {
        src: "/images/projects/monumental-manor-2.webp",
        alt: "Dining room with a long table, sculptural chairs and tall leaded windows",
      },
    ],
  },
  {
    slug: "british-arts-and-crafts",
    name: "British Arts & Crafts",
    neighborhood: "Foxcroft",
    community: "SouthPark – Foxcroft",
    architect: "Garrett P. Nelson Studio",
    cover: {
      src: "/images/projects/british-arts-and-crafts-1.webp",
      alt: "British Arts & Crafts in Foxcroft: cream stucco house with clustered chimneys",
    },
    gallery: [
      {
        src: "/images/projects/british-arts-and-crafts-1.webp",
        alt: "Cream stucco facade with clustered chimneys and a wide lawn",
      },
      {
        src: "/images/projects/british-arts-and-crafts-2.webp",
        alt: "Detail of a hand-forged stair rail ending in a spiral",
      },
    ],
  },
  {
    slug: "mid-century-modern",
    name: "Mid-Century Modern",
    neighborhood: "Lake Norman",
    community: "Lake Norman – Mooresville",
    architect: "Elite Design Group",
    featured: true,
    cover: {
      src: "/images/projects/mid-century-modern-1.webp",
      alt: "Mid-Century Modern on Lake Norman at dusk, lit from within beneath low hipped roofs",
    },
    gallery: [
      {
        src: "/images/projects/mid-century-modern-1.webp",
        alt: "Modern lake estate at dusk with glowing glass walls and low hipped roofs",
      },
      {
        src: "/images/projects/mid-century-modern-2.webp",
        alt: "Tiled entry court with a textured art panel above a reflecting pool",
      },
    ],
  },
  {
    slug: "nantucket-modern",
    name: "Nantucket Modern",
    neighborhood: "Foxcroft",
    community: "SouthPark – Foxcroft",
    architect: "Garrett P. Nelson Studio",
    cover: {
      src: "/images/projects/nantucket-modern-1.webp",
      alt: "Nantucket Modern in Foxcroft: shingled home behind a long swimming pool",
    },
    gallery: [
      {
        src: "/images/projects/nantucket-modern-1.webp",
        alt: "Rear elevation with shingled roofs and a long swimming pool",
      },
      {
        src: "/images/projects/nantucket-modern-2.webp",
        alt: "Covered porch with a wood ceiling and lounge daybeds overlooking the pool",
      },
    ],
  },
  {
    slug: "new-england-estate",
    name: "New England Estate",
    neighborhood: "Myers Park",
    community: "Myers Park",
    architect: "Garrett P. Nelson Studio",
    featured: true,
    cover: {
      src: "/images/projects/new-england-estate-1.webp",
      alt: "New England Estate in Myers Park: white painted brick with arched entry and hydrangeas",
    },
    gallery: [
      {
        src: "/images/projects/new-england-estate-1.webp",
        alt: "White painted brick estate with arched entry, chimneys and blooming hydrangeas",
      },
      {
        src: "/images/projects/new-england-estate-2.webp",
        alt: "Bar with dark cabinetry, glass shelving and a framed peacock print",
      },
    ],
  },
  {
    slug: "organic-art-nouveau",
    name: "Organic Art Nouveau",
    neighborhood: "Foxcroft",
    community: "SouthPark – Foxcroft",
    architect: "Garrett P. Nelson Studio",
    cover: {
      src: "/images/projects/organic-art-nouveau-1.webp",
      alt: "Organic Art Nouveau in Foxcroft: cedar shake roof with symmetrical dormers",
    },
    gallery: [
      {
        src: "/images/projects/organic-art-nouveau-1.webp",
        alt: "Symmetrical facade with a cedar shake roof, dormers and twin chimneys",
      },
      {
        src: "/images/projects/organic-art-nouveau-2.webp",
        alt: "Foyer with a steel window wall, sculptural chandelier and large artwork",
      },
    ],
  },
  {
    slug: "american-craftsman",
    name: "American Craftsman",
    neighborhood: "Carmel Country Club",
    community: "Carmel Country Club",
    architect: "Schrader Design",
    cover: {
      src: "/images/projects/american-craftsman-1.webp",
      alt: "American Craftsman at Carmel Country Club: stone and brick home at sunset",
    },
    gallery: [
      {
        src: "/images/projects/american-craftsman-1.webp",
        alt: "Stone and brick facade with gabled garages under a sunset sky",
      },
      {
        src: "/images/projects/american-craftsman-2.webp",
        alt: "Breakfast nook with a built-in banquette beneath shuttered windows",
      },
    ],
  },
  {
    slug: "urban-villa",
    name: "Urban Villa",
    neighborhood: "Myers Park",
    community: "Myers Park",
    architect: "Garrett P. Nelson Studio",
    cover: {
      src: "/images/projects/urban-villa-1.webp",
      alt: "Urban Villa in Myers Park: brick and stone home set among mature trees",
    },
    gallery: [
      {
        src: "/images/projects/urban-villa-1.webp",
        alt: "Brick and stone facade framed by mature trees and a low garden wall",
      },
      {
        src: "/images/projects/urban-villa-2.webp",
        alt: "Living room with a sofa, paired lamps and a large cloudscape painting",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
