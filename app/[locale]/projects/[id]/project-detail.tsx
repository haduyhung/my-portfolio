"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Users,
  Smartphone,
  Globe,
  Layers,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "../../../../i18n/navigation";
import { PROJECTS } from "../../../constants";
import type { Project } from "../../../constants";

const categoryIcons = {
  web: Globe,
  mobile: Smartphone,
  fullstack: Layers,
} as const;

export function ProjectDetail({ project }: { project: Project }) {
  const CategoryIcon = categoryIcons[project.category];
  const t = useTranslations("projects");

  const highlights = t.raw(`${project.i18nKey}.highlights`) as string[];
  const responsibilities = t.raw(
    `${project.i18nKey}.responsibilities`
  ) as string[];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link
            href="/#projects"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            {t("detail.backToProjects")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <CategoryIcon size={14} />
              {t(`categories.${project.category}`)}
            </span>

            <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span className="gradient-text">
                {t(`${project.i18nKey}.title`)}
              </span>
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Building2 size={16} className="text-accent" />
                {project.company}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={16} className="text-accent" />
                {project.period}
              </span>
              {project.teamSize && (
                <span className="flex items-center gap-1.5">
                  <Users size={16} className="text-accent" />
                  {t("detail.teamMembers", { count: project.teamSize })}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                {t("detail.overview")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(`${project.i18nKey}.longDescription`)}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                {t("detail.keyFeatures")}
              </h2>
              <ul className="space-y-3">
                {highlights.map((highlight: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                {t("detail.myResponsibilities")}
              </h2>
              <ul className="space-y-3">
                {responsibilities.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-secondary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t("detail.myRole")}
              </h3>
              <p className="font-semibold text-foreground">
                {t(`${project.i18nKey}.title`)}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t("detail.techStack")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t("detail.projectInfo")}
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">{t("detail.company")}</dt>
                  <dd className="font-medium text-foreground">{project.company}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{t("detail.period")}</dt>
                  <dd className="font-medium text-foreground">{project.period}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{t("detail.type")}</dt>
                  <dd className="font-medium text-foreground">
                    {t(`categories.${project.category}`)}
                  </dd>
                </div>
                {project.teamSize && (
                  <div>
                    <dt className="text-muted-foreground">{t("detail.teamSize")}</dt>
                    <dd className="font-medium text-foreground">
                      {t("detail.teamMembers", { count: project.teamSize })}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </motion.aside>
        </div>

        {/* Navigation between projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-16 border-t border-border pt-8"
        >
          <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("detail.otherProjects")}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {PROJECTS.filter((p) => p.id !== project.id).map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/50 hover:bg-card hover:text-accent"
              >
                {t(`${p.i18nKey}.title`)}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
