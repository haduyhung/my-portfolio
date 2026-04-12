"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "../../../../i18n/navigation";
import type { MinnaWord } from "../../../constants/minna";
import type { MinnaLang } from "../../../hooks/use-minna-lang";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

interface Props {
  words: MinnaWord[];
  lessonId: number;
  lang: MinnaLang;
}

export function Flashcard({ words, lessonId, lang }: Props) {
  const router = useRouter();
  const [deck, setDeck] = useState<MinnaWord[]>(() => shuffle(words));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<MinnaWord[]>([]);
  const [unknown, setUnknown] = useState<MinnaWord[]>([]);
  const [done, setDone] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const current = deck[index];
  const total = deck.length;

  const getMeaning = (word: MinnaWord) =>
    word.meaning[lang] ?? word.meaning.en ?? "";

  const handleAnswer = useCallback(
    (didKnow: boolean) => {
      if (didKnow) {
        setKnown((k) => [...k, current]);
      } else {
        setUnknown((u) => [...u, current]);
      }
      setFlipped(false);
      setTimeout(() => {
        if (index + 1 >= total) {
          setDone(true);
        } else {
          setIndex((i) => i + 1);
        }
      }, 150);
    },
    [current, index, total]
  );

  const handleReviewUnknown = () => {
    setDeck(shuffle(unknown));
    setIndex(0);
    setKnown([]);
    setUnknown([]);
    setFlipped(false);
    setDone(false);
    setReviewMode(true);
  };

  const handleRestart = () => {
    setDeck(shuffle(words));
    setIndex(0);
    setKnown([]);
    setUnknown([]);
    setFlipped(false);
    setDone(false);
    setReviewMode(false);
  };

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <div className="text-5xl">
            {unknown.length === 0 ? "🎉" : unknown.length <= total * 0.2 ? "👏" : "💪"}
          </div>
          <h2 className="text-2xl font-bold">Kết quả</h2>
          <div className="flex gap-6 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-green-500">{known.length}</span>
              <span className="text-muted-foreground">Đã biết</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-red-500">{unknown.length}</span>
              <span className="text-muted-foreground">Chưa biết</span>
            </div>
          </div>
        </motion.div>
        <div className="flex flex-col gap-3 w-56">
          {unknown.length > 0 && (
            <button
              onClick={handleReviewUnknown}
              className="rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Ôn lại {unknown.length} từ chưa biết
            </button>
          )}
          <button
            onClick={handleRestart}
            className="rounded-lg border border-border py-2.5 text-sm transition-colors hover:bg-secondary"
          >
            Làm lại từ đầu
          </button>
          <button
            onClick={() => router.push(`/japanese/minna/${lessonId}` as any)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
          >
            Về bài học
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-sm">
        {/* Progress */}
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>{reviewMode ? "Ôn lại" : "Flashcard"}</span>
          <span>{index + 1} / {total}</span>
        </div>
        <div className="mb-6 h-1.5 w-full rounded-full bg-secondary">
          <motion.div
            className="h-1.5 rounded-full bg-primary"
            animate={{ width: `${(index / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Card */}
        <div
          className="cursor-pointer"
          style={{ perspective: 1000 }}
          onClick={() => setFlipped((f) => !f)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${index}-${flipped}`}
              initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`rounded-2xl border p-8 text-center shadow-sm min-h-44 flex flex-col items-center justify-center gap-3 ${
                flipped ? "border-primary/30 bg-primary/5" : "border-border bg-card"
              }`}
            >
              {!flipped ? (
                <>
                  {current.kanji && (
                    <span className="text-5xl font-medium">{current.kanji}</span>
                  )}
                  <span
                    className={current.kanji ? "text-xl text-muted-foreground" : "text-5xl font-medium"}
                  >
                    {current.kana}
                  </span>
                  <p className="mt-2 text-xs text-muted-foreground">Nhấn để lật</p>
                </>
              ) : (
                <>
                  <span className="text-lg font-semibold">{getMeaning(current)}</span>
                  <span className="text-sm text-muted-foreground">{current.romaji}</span>
                  <span className="text-xs text-muted-foreground">{current.kana}</span>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        {flipped ? (
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => handleAnswer(false)}
              className="flex-1 rounded-xl border border-red-500/30 bg-red-500/5 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
            >
              Chưa biết
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="flex-1 rounded-xl border border-green-500/30 bg-green-500/5 py-3 text-sm font-medium text-green-600 transition-colors hover:bg-green-500/10"
            >
              Biết rồi
            </button>
          </div>
        ) : (
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setFlipped(true)}
              className="flex-1 rounded-xl border border-border py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Lật thẻ
            </button>
          </div>
        )}

        <div className="mt-3 flex justify-end">
          <button
            onClick={() => router.push(`/japanese/minna/${lessonId}` as any)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  );
}
