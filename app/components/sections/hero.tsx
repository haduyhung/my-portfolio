"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, GitBranch, Link as LinkIcon } from "lucide-react";
import { PERSONAL_INFO, HERO_CONTENT } from "../../constants";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent-secondary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 text-lg font-medium text-muted-foreground"
        >
          {HERO_CONTENT.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          <span className="gradient-text">{PERSONAL_INFO.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-2 text-xl font-semibold text-foreground sm:text-2xl"
        >
          {PERSONAL_INFO.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
        >
          {HERO_CONTENT.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-accent to-accent-secondary px-8 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            {HERO_CONTENT.cta.primary}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            {HERO_CONTENT.cta.secondary}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href={PERSONAL_INFO.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="GitHub"
          >
            <GitBranch size={22} />
          </a>
          <a
            href={PERSONAL_INFO.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="LinkedIn"
          >
            <LinkIcon size={22} />
          </a>
          <a
            href={PERSONAL_INFO.socialLinks.email}
            className="rounded-full p-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
