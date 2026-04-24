"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useRouter } from "../../../../../i18n/navigation";
import {
  loadMinnaDataset,
  type MinnaWord,
} from "../../../../constants/minna";
import type { MinnaLang } from "../../../../hooks/use-minna-lang";

const EXERCISES = [
  {
    type: "flashcard",
    label: "Flashcard",
    desc: "Lật thẻ ôn từ vựng",
    emoji: "🃏",
  },
  {
    type: "meaning-quiz",
    label: "Quiz nghĩa",
    desc: "Chọn nghĩa đúng của từ",
    emoji: "🧠",
  },
  {
    type: "reading-quiz",
    label: "Quiz đọc",
    desc: "Chọn cách đọc đúng (kana)",
    emoji: "👁",
  },
  {
    type: "typing-quiz",
    label: "Quiz gõ",
    desc: "Gõ romaji từ nghĩa của từ",
    emoji: "⌨️",
  },
  {
    type: "matching",
    label: "Nối từ",
    desc: "Nối từ với nghĩa tương ứng",
    emoji: "🔗",
  },
] as const;

export default function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const router = useRouter();
  const locale = useLocale();
  const { lessonId: lessonIdStr } = use(params);
  const lessonId = parseInt(lessonIdStr, 10);
  const [words, setWords] = useState<MinnaWord[]>([]);
  const [loading, setLoading] = useState(true);
  const lang: MinnaLang = locale === "fr" ? "fr" : locale === "vi" ? "vi" : "en";

  useEffect(() => {
    if (localStorage.getItem("jp_auth") !== "1") {
      router.replace("/secret" as any);
      return;
    }
    loadMinnaDataset().then((ds) => {
      const lesson = ds.lessons.find((l) => l.id === lessonId);
      setWords(lesson?.words ?? []);
      setLoading(false);
    });
  }, [lessonId, router]);

  const getMeaning = (word: MinnaWord) => word.meaning[lang] ?? word.meaning.en ?? "";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row">
      {/* Left: word list */}
      <div className="flex-1 overflow-x-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <button
            onClick={() => router.push("/japanese/minna" as any)}
            className="mb-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Về danh sách bài
          </button>
          <h1 className="text-2xl font-bold">Bài {lessonId}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{words.length} từ vựng</p>
        </motion.div>

        {/* Word list */}
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="min-w-130">
          {/* Table header */}
          <div className="grid grid-cols-[2rem_1fr_1fr_1fr_1.5fr] border-b border-border bg-secondary/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <div>#</div>
            <div>漢字</div>
            <div>かな</div>
            <div>Romaji</div>
            <div>Nghĩa</div>
          </div>

          {/* Table rows */}
          {words.map((word, i) => (
            <motion.div
              key={`${word.id[0]}-${word.id[1]}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.01 }}
              className="grid grid-cols-[2rem_1fr_1fr_1fr_1.5fr] items-center border-t border-border px-4 py-2.5 transition-colors hover:bg-secondary/30"
            >
              <div className="text-xs text-muted-foreground">{i + 1}</div>
              <div className="font-medium">{word.kanji ?? "—"}</div>
              <div className="text-sm text-muted-foreground">{word.kana}</div>
              <div className="text-sm text-muted-foreground">{word.romaji}</div>
              <div className="text-sm">{getMeaning(word)}</div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>

      {/* Right: sticky exercise panel */}
      <div className="w-full border-t border-border md:w-72 md:shrink-0 md:border-l md:border-t-0">
        <div className="sticky top-14 p-4">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          >
            {/* Panel header */}
            <div className="border-b border-border bg-secondary/30 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Luyện tập
              </p>
              <h2 className="mt-0.5 font-semibold">Bài {lessonId}</h2>
            </div>

            {/* Exercise options */}
            <div className="p-2">
              {EXERCISES.map((ex, i) => (
                <motion.button
                  key={ex.type}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() =>
                    router.push(`/japanese/minna/${lessonId}/${ex.type}` as any)
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all hover:bg-secondary"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-base">
                    {ex.emoji}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{ex.label}</p>
                    <p className="text-xs text-muted-foreground">{ex.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-3 rounded-xl border border-border bg-card p-3"
          >
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{words.length}</span> từ vựng trong bài này
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
