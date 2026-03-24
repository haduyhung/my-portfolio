import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS, SEO_DEFAULTS, SITE_URL } from "../../constants";
import { JsonLd } from "../../components/ui/json-ld";
import { generateProjectJsonLd } from "../../constants/json-ld";
import { ProjectDetail } from "./project-detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) return {};

  const title = `${project.title} | Projects`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/projects/${project.id}`,
      siteName: SEO_DEFAULTS.siteName,
      type: "article",
      images: [
        {
          url: SEO_DEFAULTS.ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${SEO_DEFAULTS.author}`,
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
      canonical: `${SITE_URL}/projects/${project.id}`,
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
