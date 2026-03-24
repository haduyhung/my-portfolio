"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "../ui/section-heading";
import { EXPERIENCES } from "../../constants";

export function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {EXPERIENCES.map((exp, index) => {
            const responsibilities = t.raw(
              `${exp.i18nKey}.responsibilities`
            ) as string[];

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative mb-12 pl-8 md:w-1/2 md:pl-0 ${
                  index % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Timeline dot */}
                <div
                  aria-hidden="true"
                  className={`absolute top-1 h-3 w-3 rounded-full border-2 border-accent bg-background ${
                    index % 2 === 0
                      ? "-left-1.5 md:left-auto md:-right-1.5"
                      : "-left-1.5 md:-left-1.5"
                  }`}
                />

                {/* Card */}
                <article className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50">
                  <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {exp.period}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-card-foreground">
                    {t(`${exp.i18nKey}.role`)}
                  </h3>
                  <p className="mb-3 font-medium text-accent">{exp.company}</p>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t(`${exp.i18nKey}.description`)}
                  </p>

                  <ul
                    className={`mb-4 space-y-1 text-sm text-muted-foreground ${
                      index % 2 === 0 ? "md:text-right" : ""
                    }`}
                  >
                    {responsibilities.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <ul
                    className={`flex flex-wrap gap-1.5 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    {exp.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
