"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "../../../../i18n/navigation";
import { NUMBERS_LESSONS, NUMBERS_LESSON_LABELS } from "../../../constants/numbers";

export default function NumbersPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("jp_auth") !== "1") {
      router.replace("/secret" as any);
    }
  }, [router]);

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold">Số đếm</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          数の読み方 · {NUMBERS_LESSONS.length} bài
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {NUMBERS_LESSONS.map((lesson, i) => (
          <motion.button
            key={lesson.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => router.push(`/japanese/numbers/${lesson.id}` as any)}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-sm"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-lg font-bold group-hover:text-primary">
              {lesson.id}
            </span>
            <div className="flex-1">
              <p className="font-medium group-hover:text-primary">
                {NUMBERS_LESSON_LABELS[lesson.id]}
              </p>
              <p className="text-xs text-muted-foreground">
                {lesson.words.length} từ vựng
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
