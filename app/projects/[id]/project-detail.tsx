"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Users,
  Smartphone,
  Globe,
  Layers,
} from "lucide-react";
import { PROJECTS } from "../../constants";
import type { Project } from "../../constants";

const categoryIcons = {
  web: Globe,
  mobile: Smartphone,
  fullstack: Layers,
} as const;

const categoryLabels = {
  web: "Web App",
  mobile: "Mobile App",
  fullstack: "Full Stack",
} as const;

export function ProjectDetail({ project }: { project: Project }) {
  const CategoryIcon = categoryIcons[project.category];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link
            href="/#projects"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <CategoryIcon size={14} />
              {categoryLabels[project.category]}
            </span>

            <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span className="gradient-text">{project.title}</span>
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
                  Team of {project.teamSize}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </motion.section>

            {/* Key Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Key Features
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* My Responsibilities */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                My Responsibilities
              </h2>
              <ul className="space-y-3">
                {project.responsibilities.map((item, i) => (
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
            {/* Role card */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                My Role
              </h3>
              <p className="font-semibold text-foreground">{project.role}</p>
            </div>

            {/* Tech stack card */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Tech Stack
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

            {/* Project info card */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Project Info
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Company</dt>
                  <dd className="font-medium text-foreground">
                    {project.company}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Period</dt>
                  <dd className="font-medium text-foreground">
                    {project.period}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Type</dt>
                  <dd className="font-medium text-foreground">
                    {categoryLabels[project.category]}
                  </dd>
                </div>
                {project.teamSize && (
                  <div>
                    <dt className="text-muted-foreground">Team Size</dt>
                    <dd className="font-medium text-foreground">
                      {project.teamSize} members
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
            Other Projects
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {PROJECTS.filter((p) => p.id !== project.id).map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/50 hover:bg-card hover:text-accent"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
