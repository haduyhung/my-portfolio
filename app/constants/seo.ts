import type { Metadata } from "next";
import { SITE_URL, SEO_DEFAULTS } from "./seo-data";

/**
 * Root metadata for the entire site (used in layout.tsx).
 * Next.js will automatically generate the corresponding <meta> and <link> tags.
 */
export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SEO_DEFAULTS.title,
    template: `%s | ${SEO_DEFAULTS.author}`,
  },

  description: SEO_DEFAULTS.description,

  keywords: [...SEO_DEFAULTS.keywords],

  authors: [{ name: SEO_DEFAULTS.author, url: SITE_URL }],

  creator: SEO_DEFAULTS.author,

  openGraph: {
    type: "website",
    locale: SEO_DEFAULTS.locale,
    url: SITE_URL,
    siteName: SEO_DEFAULTS.siteName,
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: [
      {
        url: SEO_DEFAULTS.ogImage,
        width: 1200,
        height: 630,
        alt: `${SEO_DEFAULTS.author} - Front-end Developer Portfolio`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: [SEO_DEFAULTS.ogImage],
    creator: SEO_DEFAULTS.twitterHandle,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};
