import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const isPrivate = process.env.SITE_PRIVATE === "true";

  if (isPrivate) {
    return [];
  }

  const staticRoutes = [
    "",
    "/internships",
    "/artificial-intelligence",
    "/about",
    "/contact",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
    })),
  ];
}
