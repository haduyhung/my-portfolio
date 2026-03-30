import { PERSONAL_INFO } from "./personal-info";
import { SITE_URL, SEO_DEFAULTS } from "./seo-data";
import type { Project } from "./projects";

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
    PERSONAL_INFO.socialLinks.facebook,
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

export const PROFILE_PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    description: SEO_DEFAULTS.description,
    url: SITE_URL,
  },
} as const;

export function generateProjectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.id,
    url: `${SITE_URL}/projects/${project.id}`,
    author: {
      "@type": "Person",
      name: PERSONAL_INFO.name,
      url: SITE_URL,
    },
    keywords: project.techStack.join(", "),
    sourceOrganization: {
      "@type": "Organization",
      name: project.company,
    },
  };
}
