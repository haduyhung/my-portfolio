"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent-secondary/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <h1 className="mb-4 text-8xl font-bold sm:text-9xl">
          <span className="gradient-text">404</span>
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mx-auto mb-8 max-w-md text-lg text-muted-foreground">
          {t("description")}
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-gradient-to-r from-accent to-accent-secondary px-8 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
        >
          {t("backHome")}
        </Link>
      </motion.div>
    </div>
  );
}
