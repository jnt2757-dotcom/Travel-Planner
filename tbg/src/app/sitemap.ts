import type { MetadataRoute } from "next";
import { projects } from "@content/projects";
import { site } from "@content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/portfolio", "/under-construction", "/inquiries"];
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}`, changeFrequency: "monthly" as const, priority: path ? 0.8 : 1 })),
    ...projects.map((p) => ({ url: `${site.url}/portfolio/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
