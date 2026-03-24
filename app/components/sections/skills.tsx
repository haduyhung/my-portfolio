"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/section-heading";
import { SKILL_CATEGORIES } from "../../constants";

export function Skills() {
  return (
    <section id="skills" className="bg-secondary/30 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Tools and technologies I work with"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-4 text-lg font-semibold text-card-foreground">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
