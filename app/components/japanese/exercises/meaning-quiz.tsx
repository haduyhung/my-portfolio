"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "../../../../i18n/navigation";
import type { MinnaWord } from "../../../constants/minna";
import type { MinnaLang } from "../../../hooks/use-minna-lang";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatTime(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
}

function getChoices(correct: MinnaWord, pool: MinnaWord[], lang: MinnaLang): MinnaWord[] {
  const others = shuffle(
    pool.filter((w) => w.id[0] !== correct.id[0] || w.id[1] !== correct.id[1])
  ).slice(0, 3);
  return shuffle([correct, ...others]);
}

interface AnswerRecord {
  word: MinnaWord;
  correct: boolean;
}

interface Props {
  words: MinnaWord[];
  lessonId: number;
  lang: MinnaLang;
}

export function MeaningQuiz({ words, lessonId, lang }: Props) {
  const router = useRouter();
  const [deck] = useState<MinnaWord[]>(() => shuffle(words));
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [history, setHistory] = useState<AnswerRecord[]>([]);
  const [done, setDone] = useState(false);
  const comboRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = deck[index];
  const total = deck.length;
  const comboEmoji = combo >= 10 ? "💥" : combo >= 5 ? "🔥🔥" : "🔥";

  const choices = useMemo(
    () => getChoices(current, words, lang),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index]
  );

  const getMeaning = (w: MinnaWord) => w.meaning[lang] ?? w.meaning.en ?? "";
  const wordKey = (w: MinnaWord) => `${w.id[0]}-${w.id[1]}`;

  useEffect(() => {
    intervalRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    if (done && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [done]);

  const advance = useCallback(
    (isCorrect: boolean, choiceKey: string) => {
      setSelected(choiceKey);
      setFeedback(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        setScore((s) => s + 1);
        const nc = comboRef.current + 1;
        comboRef.current = nc;
        setCombo(nc);
        setMaxCombo((p) => Math.max(p, nc));
      } else {
        comboRef.current = 0;
        setCombo(0);
      }
      setHistory((h) => [...h, { word: current, correct: isCorrect }]);
      setTimeout(() => {
        setFeedback(null);
        setSelected(null);
        if (index + 1 >= total) setDone(true);
        else setIndex((i) => i + 1);
      }, 800);
    },
    [current, index, total]
  );

  if (done) {
    const wrong = history.filter((r) => !r.correct);
    const correct = history.filter((r) => r.correct);
    return (
      <div className="flex min-h-screen flex-col items-center gap-8 p-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <div className="text-5xl">{score === total ? "🎉" : score >= total * 0.8 ? "👏" : "💪"}</div>
          <h2 className="text-2xl font-bold">Kết quả</h2>
          <p className="text-4xl font-bold text-primary">{score} / {total}</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Thời gian: <span className="font-mono font-medium text-foreground">{formatTime(elapsed)}</span></span>
            {maxCombo >= 3 && <span>Combo: <span className="font-medium text-orange-500">🔥 x{maxCombo}</span></span>}
          </div>
          <div className="flex gap-3 mt-1">
            <button
              onClick={() => router.push(`/japanese/minna/${lessonId}/meaning-quiz` as any)}
              className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Làm lại
            </button>
            <button
              onClick={() => router.push(`/japanese/minna/${lessonId}` as any)}
              className="rounded-lg border border-border px-6 py-2 text-sm font-medium hover:bg-secondary"
            >
              Thoát
            </button>
          </div>
        </motion.div>
        <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
          {wrong.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
              <h3 className="mb-3 font-semibold text-red-500">Sai — {wrong.length} câu</h3>
              <div className="flex flex-wrap gap-2">
                {wrong.map((r, i) => (
                  <div key={i} className="rounded-lg border border-red-500/20 bg-background px-3 py-2 text-center text-sm">
                    <p className="font-medium">{r.word.kanji ?? r.word.kana}</p>
                    <p className="text-xs text-muted-foreground">{getMeaning(r.word)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {correct.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5">
              <h3 className="mb-3 font-semibold text-green-500">Đúng — {correct.length} câu</h3>
              <div className="flex flex-wrap gap-2">
                {correct.map((r, i) => (
                  <div key={i} className="rounded-lg border border-green-500/20 bg-background px-3 py-2 text-sm">
                    <p className="font-medium">{r.word.kanji ?? r.word.kana}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>Quiz nghĩa</span>
          <div className="flex gap-3">
            <span className="font-mono">{formatTime(elapsed)}</span>
            <span>{index + 1} / {total}</span>
          </div>
        </div>
        <div className="mb-4 h-1.5 w-full rounded-full bg-secondary">
          <motion.div className="h-1.5 rounded-full bg-primary" animate={{ width: `${(index / total) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>

        <div className="mb-2 flex h-9 items-center justify-center">
          <AnimatePresence mode="wait">
            {combo >= 3 && (
              <motion.div key={combo} initial={{ scale: 0.3, opacity: 0, y: 8 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.3, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }} className="flex items-center gap-1.5">
                <span className="text-xl">{comboEmoji}</span>
                <span className={`text-lg font-bold ${combo >= 10 ? "text-red-500" : "text-orange-500"}`}>x{combo}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
            className={`flex flex-col items-center gap-5 rounded-2xl border p-8 shadow-sm transition-colors ${
              feedback === "correct" ? "border-green-500 bg-green-500/10" : feedback === "wrong" ? "border-red-500 bg-red-500/10" : "border-border bg-card"
            }`}
          >
            {current.kanji && <span className="text-5xl font-medium">{current.kanji}</span>}
            <span className={current.kanji ? "text-xl text-muted-foreground" : "text-5xl font-medium"}>{current.kana}</span>

            <div className="grid w-full grid-cols-2 gap-2">
              {choices.map((choice) => {
                const key = wordKey(choice);
                const isSelected = selected === key;
                const isCorrect = wordKey(choice) === wordKey(current);
                let cls = "rounded-xl border p-3 text-sm text-left transition-all ";
                if (feedback && isSelected) {
                  cls += isCorrect ? "border-green-500 bg-green-500/20 text-green-700" : "border-red-500 bg-red-500/20 text-red-700";
                } else if (feedback && isCorrect) {
                  cls += "border-green-500 bg-green-500/10";
                } else {
                  cls += "border-border bg-background hover:border-primary hover:bg-primary/5";
                }
                return (
                  <button key={key} onClick={() => !feedback && advance(isCorrect, key)} disabled={!!feedback} className={cls}>
                    {getMeaning(choice)}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <span>Điểm: <span className="font-medium text-foreground">{score}</span></span>
          <button onClick={() => router.push(`/japanese/minna/${lessonId}` as any)} className="hover:text-foreground transition-colors">Thoát</button>
        </div>
      </div>
    </div>
  );
}
