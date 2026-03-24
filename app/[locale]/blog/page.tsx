import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllPosts } from "../../../lib/blog";
import { SEO_DEFAULTS, SITE_URL } from "../../constants";
import { BlogList } from "./blog-list";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: `${t("title")} | ${SEO_DEFAULTS.author}`,
      description: t("subtitle"),
      url: `${SITE_URL}/${locale}/blog`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  return <BlogList posts={posts} />;
}
