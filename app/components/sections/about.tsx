"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, GraduationCap } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { PERSONAL_INFO, EDUCATION } from "../../constants";

const highlights = [
  {
    icon: Briefcase,
    label: "Experience",
    value: "3.5+ Years",
  },
  {
    icon: MapPin,
    label: "Location",
    value: PERSONAL_INFO.location,
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: EDUCATION[0].school,
  },
  {
    icon: Calendar,
    label: "Born",
    value: PERSONAL_INFO.dateOfBirth,
  },
];

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="About Me" subtitle="Get to know me better" />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Profile text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              {PERSONAL_INFO.profileSummary}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I specialize in building modern web applications with{" "}
              <span className="font-semibold text-foreground">React</span>,{" "}
              <span className="font-semibold text-foreground">Next.js</span>,
              and{" "}
              <span className="font-semibold text-foreground">TypeScript</span>,
              while also having hands-on experience with mobile development
              using{" "}
              <span className="font-semibold text-foreground">
                React Native
              </span>{" "}
              and{" "}
              <span className="font-semibold text-foreground">Kotlin</span>. I
              am passionate about leveraging AI-assisted tools to boost
              productivity and deliver high-quality code.
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
                <item.icon size={24} className="mb-3 text-accent" />
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-1 font-semibold text-card-foreground">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
