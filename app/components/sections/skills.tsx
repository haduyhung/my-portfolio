"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "../ui/section-heading";
import { SKILL_CATEGORIES } from "../../constants";

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="bg-secondary/30 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, categoryIndex) => (
            <motion.div
              key={category.i18nKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-4 text-lg font-semibold text-card-foreground">
                {t(`categories.${category.i18nKey}`)}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
