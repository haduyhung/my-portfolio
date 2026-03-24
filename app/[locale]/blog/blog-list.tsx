"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/navigation";
import { SectionHeading } from "../../components/ui/section-heading";
import type { BlogPostMeta } from "../../../lib/blog";

export function BlogList({ posts }: { posts: BlogPostMeta[] }) {
  const t = useTranslations("blog");

  return (
    <main className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Home
        </Link>

        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        {posts.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-lg text-muted-foreground"
          >
            {t("noPosts")}
          </motion.p>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg">
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {t("minRead", { count: post.readingTime })}
                      </span>
                    </div>

                    <h2 className="mb-2 text-xl font-bold text-card-foreground transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="mb-4 text-muted-foreground">
                      {post.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
