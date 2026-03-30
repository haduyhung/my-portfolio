"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  GitBranch,
  Link as LinkIcon,
  Send,
  GraduationCap,
  Gamepad2,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "../ui/section-heading";
import { PERSONAL_INFO, EDUCATION_PERIOD } from "../../constants";

export function Contact() {
  const t = useTranslations("contact");
  const tEdu = useTranslations("education");
  const tInterests = useTranslations("interests");

  const interests = tInterests.raw("items") as string[];

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground">{t("intro")}</p>

            <dl className="space-y-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-accent/50 hover:bg-card"
              >
                <div className="rounded-full bg-accent/10 p-3">
                  <Mail size={20} className="text-accent" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">{t("email")}</dt>
                  <dd className="font-medium">{PERSONAL_INFO.email}</dd>
                </div>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-accent/50 hover:bg-card"
              >
                <div className="rounded-full bg-accent/10 p-3">
                  <Phone size={20} className="text-accent" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">{t("phone")}</dt>
                  <dd className="font-medium">{PERSONAL_INFO.phone}</dd>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-xl border border-border p-4">
                <div className="rounded-full bg-accent/10 p-3">
                  <MapPin size={20} className="text-accent" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">{t("location")}</dt>
                  <dd className="font-medium">{PERSONAL_INFO.location}</dd>
                </div>
              </div>
            </dl>

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              <a
                href={PERSONAL_INFO.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border p-3 transition-colors hover:border-accent/50 hover:bg-card hover:text-accent"
                aria-label="GitHub"
              >
                <GitBranch size={20} />
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border p-3 transition-colors hover:border-accent/50 hover:bg-card hover:text-accent"
                aria-label="LinkedIn"
              >
                <LinkIcon size={20} />
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.email}
                className="rounded-full border border-border p-3 transition-colors hover:border-accent/50 hover:bg-card hover:text-accent"
                aria-label="Email"
              >
                <Send size={20} />
              </a>
            </div>
          </motion.div>

          {/* Education & Interests */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Education card */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                <GraduationCap size={22} className="text-accent" />
                {t("education")}
              </h3>
              <div>
                <p className="font-semibold text-card-foreground">
                  {tEdu("school")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {tEdu("major")} &middot; {tEdu("status")}
                </p>
                <p className="text-sm text-muted-foreground">{EDUCATION_PERIOD}</p>
              </div>
            </section>

            {/* Interests card */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                <Sparkles size={22} className="text-accent-secondary" />
                {t("interests")}
              </h3>
              <ul className="space-y-3">
                {interests.map((interest: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <Gamepad2
                      size={18}
                      className="mt-0.5 shrink-0 text-accent-secondary"
                    />
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* English */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                {t("english")}
              </h3>
              <p className="text-muted-foreground">{t("englishLevel")}</p>
            </section>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
