"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "../../../../i18n/navigation";
import {
  loadMinnaDataset,
  BOOK_RANGES,
  type MinnaDataset,
} from "../../../constants/minna";

export default function MinnaPage() {
  const router = useRouter();
  const [dataset, setDataset] = useState<MinnaDataset | null>(null);
  const [activeBook, setActiveBook] = useState<1 | 2>(1);

  useEffect(() => {
    if (sessionStorage.getItem("jp_auth") !== "1") {
      router.replace("/secret" as any);
      return;
    }
    loadMinnaDataset().then(setDataset);
  }, [router]);

  const books = [1, 2] as const;

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold">Minna no Nihongo</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          みんなの日本語 · {dataset ? `${dataset.lessons.length} bài` : "Đang tải..."}
        </p>
      </motion.div>

      {/* Book tabs */}
      <div className="mb-6 flex gap-2 border-b border-border">
        {books.map((book) => (
          <button
            key={book}
            onClick={() => setActiveBook(book)}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeBook === book
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Quyển {book}
          </button>
        ))}
      </div>

      {/* Lesson grid */}
      {!dataset ? (
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-8">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-xl border border-border bg-secondary/30 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-8">
          {dataset.lessons
            .filter((l) => {
              const { start, end } = BOOK_RANGES[activeBook];
              return l.id >= start && l.id <= end;
            })
            .map((lesson, i) => (
              <motion.button
                key={lesson.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                onClick={() =>
                  router.push(`/japanese/minna/${lesson.id}` as any)
                }
                className="group flex flex-col items-center justify-center gap-1 rounded-xl border border-border bg-card p-3 text-center transition-all hover:border-primary hover:shadow-sm"
              >
                <span className="text-xs text-muted-foreground">Bài</span>
                <span className="text-xl font-bold group-hover:text-primary">
                  {lesson.id}
                </span>
                <span className="text-xs text-muted-foreground">
                  {lesson.words.length} từ
                </span>
              </motion.button>
            ))}
        </div>
      )}
    </div>
  );
}
