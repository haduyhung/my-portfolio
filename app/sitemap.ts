import type { MetadataRoute } from "next";
import { SITE_URL, PROJECTS } from "./constants";
import { routing } from "../i18n/routing";
import { getAllSlugs } from "../lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const entries: MetadataRoute.Sitemap = [];

  // Root URL
  entries.push({
    url: SITE_URL,
    changeFrequency: "monthly",
    priority: 1,
  });

  for (const locale of locales) {
    // Homepage per locale
    entries.push({
      url: `${SITE_URL}/${locale}`,
      changeFrequency: "monthly",
      priority: 1,
    });

    // Project pages
    for (const project of PROJECTS) {
      entries.push({
        url: `${SITE_URL}/${locale}/projects/${project.id}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    // Blog listing
    entries.push({
      url: `${SITE_URL}/${locale}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Blog posts
    const slugs = getAllSlugs(locale);
    for (const slug of slugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
