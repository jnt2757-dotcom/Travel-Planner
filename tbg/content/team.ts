import { site } from "./site";
import type { TeamMember } from "./types";

/** Team, in the order thompsonbuildinggroup.com/about shows them. */
export const team: TeamMember[] = [
  {
    name: "Ted Thompson",
    role: "President",
    bio: "27 years of experience. Built alongside his father and earned a degree in civil engineering and a master's in construction management from the University at Buffalo.",
    photo: { src: "/images/team/ted-thompson.webp", alt: "Portrait of Ted Thompson" },
    linkedin: site.social.linkedin.href,
  },
  {
    name: "Kirk Narowski",
    role: "Project Manager",
    bio: "Over twenty years of experience in New York, Los Angeles, and Charlotte.",
    photo: { src: "/images/team/kirk-narowski.webp", alt: "Portrait of Kirk Narowski" },
  },
  {
    name: "Adam Grebner",
    role: "Project Manager",
    bio: "Over twenty years of experience managing luxury custom homes in greater Charlotte.",
    photo: { src: "/images/team/adam-grebner.webp", alt: "Portrait of Adam Grebner" },
  },
  {
    name: "Larry Johns",
    role: "Project Manager",
    bio: "Thirty years of experience in Los Angeles and Charlotte.",
    photo: { src: "/images/team/larry-johns.webp", alt: "Portrait of Larry Johns" },
  },
  {
    name: "Dan Hersom",
    role: "Project Manager",
    bio: "Twenty-plus years building the finest residential homes in the Boston area.",
    photo: { src: "/images/team/dan-hersom.webp", alt: "Portrait of Dan Hersom" },
  },
  {
    name: "Alex White",
    role: "Director of Interiors",
    bio: "A Charlotte native who came to us from the highly acclaimed design team at Circa Interiors.",
    photo: { src: "/images/team/alex-white.webp", alt: "Portrait of Alex White" },
  },
  {
    name: "Ann Phillips",
    role: "Financial Manager",
    bio: "A controller in residential construction for over twenty-five years.",
    photo: { src: "/images/team/ann-phillips.webp", alt: "Portrait of Ann Phillips" },
  },
  {
    name: "Jason Frasure",
    role: "Special Projects & Warranty Manager",
    bio: "Over twenty-five years in the building industry.",
    photo: { src: "/images/team/jason-frasure.webp", alt: "Portrait of Jason Frasure" },
  },
  {
    name: "Mark Jordan",
    role: "Punch-out Specialist",
    bio: "Over twenty years in carpentry and luxury home closings.",
    photo: { src: "/images/team/mark-jordan.webp", alt: "Portrait of Mark Jordan" },
  },
];
