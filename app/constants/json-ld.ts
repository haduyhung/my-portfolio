import { PERSONAL_INFO } from "./personal-info";
import { SITE_URL, SEO_DEFAULTS } from "./seo-data";
import type { Project } from "./projects";

/**
 * JSON-LD: Person schema for the portfolio owner.
 * Helps Google display rich results (knowledge panel, etc.)
 */
export const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSONAL_INFO.name,
  jobTitle: PERSONAL_INFO.title,
  url: SITE_URL,
  email: PERSONAL_INFO.email,
  telephone: PERSONAL_INFO.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hanoi",
    addressCountry: "VN",
  },
  sameAs: [
    PERSONAL_INFO.socialLinks.github,
    PERSONAL_INFO.socialLinks.linkedin,
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Kotlin",
    "Frontend Development",
    "Mobile Development",
  ],
} as const;

/**
 * JSON-LD: WebSite schema for the homepage.
 * Helps Google understand site structure.
 */
export const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SEO_DEFAULTS.siteName,
  url: SITE_URL,
  description: SEO_DEFAULTS.description,
  author: {
    "@type": "Person",
    name: PERSONAL_INFO.name,
  },
} as const;

/**
 * JSON-LD: ProfilePage schema for the portfolio homepage.
 */
export const PROFILE_PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    description: PERSONAL_INFO.profileSummary,
    url: SITE_URL,
  },
} as const;

/**
 * Generate JSON-LD for an individual project page.
 */
export function generateProjectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.id}`,
    author: {
      "@type": "Person",
      name: PERSONAL_INFO.name,
      url: SITE_URL,
    },
    keywords: project.techStack.join(", "),
    about: {
      "@type": "Thing",
      name: project.title,
      description: project.longDescription,
    },
    sourceOrganization: {
      "@type": "Organization",
      name: project.company,
    },
  };
}
