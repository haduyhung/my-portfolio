"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "../../../../i18n/navigation";

interface BlogPostLayoutProps {
  title: string;
  date: string;
  readingTime: number;
  tags: string[];
  backLabel: string;
  tagsLabel: string;
  minReadLabel: string;
  children: React.ReactNode;
}

export function BlogPostLayout({
  title,
  date,
  tags,
  backLabel,
  tagsLabel,
  minReadLabel,
  children,
}: BlogPostLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-3xl px-6 py-6">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="gradient-text">{title}</span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {minReadLabel}
              </span>
            </div>

            {tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">
                  {tagsLabel}:
                </span>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </header>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mx-auto max-w-3xl px-6 py-12"
      >
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-card prose-img:rounded-xl">
          {children}
        </div>
      </motion.article>
    </main>
  );
}
