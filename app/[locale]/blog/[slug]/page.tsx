import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllSlugs } from "../../../../lib/blog";
import { SEO_DEFAULTS, SITE_URL } from "../../../constants";
import { routing } from "../../../../i18n/routing";
import { BlogPostLayout } from "./blog-post-layout";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | ${SEO_DEFAULTS.author}`,
      description: post.description,
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <BlogPostLayout
      title={post.title}
      date={post.date}
      readingTime={post.readingTime}
      tags={post.tags}
      backLabel={t("backToBlog")}
      tagsLabel={t("tags")}
      minReadLabel={t("minRead", { count: post.readingTime })}
    >
      <MDXRemote source={post.content} />
    </BlogPostLayout>
  );
}
