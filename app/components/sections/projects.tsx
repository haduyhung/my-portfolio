"use client";

import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Globe, Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/navigation";
import { SectionHeading } from "../ui/section-heading";
import { PROJECTS } from "../../constants";
import type { Project } from "../../constants";

const categoryIcons = {
  web: Globe,
  mobile: Smartphone,
  fullstack: Layers,
} as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = categoryIcons[project.category];
  const t = useTranslations("projects");

  const highlights = t.raw(`${project.i18nKey}.highlights`) as string[];

  return (
    <Link href={`/projects/${project.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group h-full rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg"
      >
        {/* Category badge */}
        <div className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <Icon size={14} />
            {t(`categories.${project.category}`)}
          </span>
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
          />
        </div>

        <h3 className="mb-2 text-xl font-bold text-card-foreground">
          {t(`${project.i18nKey}.title`)}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {t(`${project.i18nKey}.description`)}
        </p>

        {/* Highlights */}
        <ul className="mb-5 space-y-1.5">
          {highlights.map((highlight: string, i: number) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.article>
    </Link>
  );
}

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="bg-secondary/30 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
