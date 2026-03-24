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
import { SectionHeading } from "../ui/section-heading";
import { PERSONAL_INFO, EDUCATION, INTERESTS } from "../../constants";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's work together on something great"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision. Feel free to reach out!
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-accent/50 hover:bg-card"
              >
                <div className="rounded-full bg-accent/10 p-3">
                  <Mail size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{PERSONAL_INFO.email}</p>
                </div>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-accent/50 hover:bg-card"
              >
                <div className="rounded-full bg-accent/10 p-3">
                  <Phone size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{PERSONAL_INFO.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-xl border border-border p-4">
                <div className="rounded-full bg-accent/10 p-3">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{PERSONAL_INFO.location}</p>
                </div>
              </div>
            </div>

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
                href={PERSONAL_INFO.socialLinks.linkedin}
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
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                <GraduationCap size={22} className="text-accent" />
                Education
              </h3>
              {EDUCATION.map((edu) => (
                <div key={edu.school}>
                  <p className="font-semibold text-card-foreground">
                    {edu.school}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {edu.major} &middot; {edu.status}
                  </p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                </div>
              ))}
            </div>

            {/* Interests card */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                <Sparkles size={22} className="text-accent-secondary" />
                Interests
              </h3>
              <ul className="space-y-3">
                {INTERESTS.map((interest, i) => (
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
            </div>

            {/* English */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                English
              </h3>
              <p className="text-muted-foreground">
                Able to read, understand, and write documents
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
