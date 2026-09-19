"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ExerciseProps } from "./exercise-props";
import { useExerciseTimeouts } from "./use-exercise-timeouts";
import { createQuizPool, getQuizChoices, shuffle, wordKey } from "./exercise-data";
import { ExerciseUnavailable } from "./exercise-unavailable";
import type { MinnaWord } from "../../../constants/minna";

function formatTime(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
}

export function ReadingQuiz({ words, lang, onExit, onRestart, exitLabel = "Về bài học" }: ExerciseProps) {
  const schedule = useExerciseTimeouts();
  const answeringRef = useRef(false);
  const pool = useMemo(() => createQuizPool(words, "reading-quiz", lang), [words, lang]);

  const [deck] = useState<MinnaWord[]>(() => shuffle(pool.words));
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const comboRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = deck.length;
  const current = deck[index];
  const comboEmoji = combo >= 10 ? "💥" : combo >= 5 ? "🔥🔥" : "🔥";

  const choices = useMemo(() => getQuizChoices(current, pool), [current, pool]);

  useEffect(() => {
    intervalRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    if (done && intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, [done]);

  const advance = useCallback(
    (isCorrect: boolean, choiceKey: string) => {
      if (answeringRef.current || !current) return;
      answeringRef.current = true;
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
      schedule(() => {
        answeringRef.current = false;
        setFeedback(null);
        setSelected(null);
        if (index + 1 >= total) setDone(true);
        else setIndex((i) => i + 1);
      }, 800);
    },
    [current, index, total, schedule]
  );

  if (!current || choices.length < 4) {
    return <ExerciseUnavailable onExit={onExit} exitLabel={exitLabel} />;
  }

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 text-center">
          <div className="text-5xl">{score === total ? "🎉" : score >= total * 0.8 ? "👏" : "💪"}</div>
          <h2 className="text-2xl font-bold">Kết quả</h2>
          <p className="text-4xl font-bold text-primary">{score} / {total}</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Thời gian: <span className="font-mono font-medium text-foreground">{formatTime(elapsed)}</span></span>
            {maxCombo >= 3 && <span>Combo: <span className="font-medium text-orange-500">🔥 x{maxCombo}</span></span>}
          </div>
          <div className="flex gap-3 mt-1">
            <button onClick={onRestart}
              className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Làm lại</button>
            <button onClick={onExit}
              className="rounded-lg border border-border px-6 py-2 text-sm font-medium hover:bg-secondary">{exitLabel}</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>Quiz đọc</span>
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
            <span className="text-5xl font-medium">{current.kanji}</span>
            {feedback === "wrong" && (
              <p className="text-sm text-red-500">Đáp án: <span className="font-bold">{current.kana}</span></p>
            )}

            <div className="grid w-full grid-cols-2 gap-2">
              {choices.map((choice) => {
                const key = wordKey(choice);
                const isSelected = selected === key;
                const isCorrect = key === wordKey(current);
                let cls = "rounded-xl border p-3 text-sm font-medium text-center transition-all ";
                if (feedback && isSelected) {
                  cls += isCorrect ? "border-green-500 bg-green-500/20 text-green-700" : "border-red-500 bg-red-500/20 text-red-700";
                } else if (feedback && isCorrect) {
                  cls += "border-green-500 bg-green-500/10";
                } else {
                  cls += "border-border bg-background hover:border-primary hover:bg-primary/5";
                }
                return (
                  <button key={key} onClick={() => !feedback && advance(isCorrect, key)} disabled={!!feedback} className={cls}>
                    {choice.kana}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <span>Điểm: <span className="font-medium text-foreground">{score}</span></span>
          <button onClick={onExit} className="hover:text-foreground transition-colors">{exitLabel}</button>
        </div>
      </div>
    </div>
  );
}
