import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PROJECTS, SEO_DEFAULTS, SITE_URL } from "../../../constants";
import { JsonLd } from "../../../components/ui/json-ld";
import { generateProjectJsonLd } from "../../../constants/json-ld";
import { ProjectDetail } from "./project-detail";
import { routing } from "../../../../i18n/routing";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECTS.map((project) => ({ locale, id: project.id }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "projects" });

  const title = `${t(`${project.i18nKey}.title`)} | Projects`;
  const description = t(`${project.i18nKey}.description`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/projects/${project.id}`,
      siteName: SEO_DEFAULTS.siteName,
      type: "article",
      images: [
        {
          url: SEO_DEFAULTS.ogImage,
          width: 1200,
          height: 630,
          alt: `${t(`${project.i18nKey}.title`)} - ${SEO_DEFAULTS.author}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SEO_DEFAULTS.ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/projects/${project.id}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <>
      <JsonLd data={generateProjectJsonLd(project)} />
      <ProjectDetail project={project} />
    </>
  );
}
