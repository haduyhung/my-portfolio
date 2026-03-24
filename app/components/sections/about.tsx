"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "../ui/section-heading";
import { PERSONAL_INFO, EDUCATION_PERIOD } from "../../constants";

export function About() {
  const t = useTranslations("about");
  const tEdu = useTranslations("education");

  const highlights = [
    {
      icon: Briefcase,
      label: t("highlights.experience"),
      value: t("highlights.experienceValue"),
    },
    {
      icon: MapPin,
      label: t("highlights.location"),
      value: PERSONAL_INFO.location,
    },
    {
      icon: GraduationCap,
      label: t("highlights.education"),
      value: tEdu("school"),
    },
    {
      icon: Calendar,
      label: t("highlights.born"),
      value: PERSONAL_INFO.dateOfBirth,
    },
  ];

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Profile text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              {t("summary")}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t.rich("specialization", {
                react: (chunks) => (
                  <span className="font-semibold text-foreground">{chunks}</span>
                ),
                nextjs: (chunks) => (
                  <span className="font-semibold text-foreground">{chunks}</span>
                ),
                typescript: (chunks) => (
                  <span className="font-semibold text-foreground">{chunks}</span>
                ),
                reactNative: (chunks) => (
                  <span className="font-semibold text-foreground">{chunks}</span>
                ),
                kotlin: (chunks) => (
                  <span className="font-semibold text-foreground">{chunks}</span>
                ),
              })}
            </p>
          </motion.div>

          {/* Quick info cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/50"
              >
                <item.icon size={24} className="mb-3 text-accent" aria-hidden="true" />
                <dl>
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="mt-1 font-semibold text-card-foreground">
                    {item.value}
                  </dd>
                </dl>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
