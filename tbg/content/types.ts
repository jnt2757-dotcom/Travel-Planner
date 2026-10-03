import type { ImagePath } from "./image-sizes";

export type Neighborhood =
  | "Eastover"
  | "Myers Park"
  | "Foxcroft"
  | "SouthPark"
  | "Lake Norman"
  | "Carmel Country Club";

export type Photo = {
  src: ImagePath;
  alt: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Neighborhood shown on cards and used for grouping. */
  neighborhood: Neighborhood;
  /** Community line as written on the project's page of the current site. */
  community: string;
  architect: string;
  cover: Photo;
  gallery: Photo[];
  featured?: boolean;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: Photo;
  linkedin?: string;
};

export type ConstructionHome = {
  id: string;
  neighborhood: Neighborhood;
  photo: Photo;
};

export type NavItem = {
  label: string;
  href: string;
};
