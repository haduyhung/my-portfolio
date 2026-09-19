"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ExerciseProps } from "./exercise-props";
import { useExerciseTimeouts } from "./use-exercise-timeouts";
import { buildMatchingRounds, shuffle, wordKey } from "./exercise-data";
import { ExerciseUnavailable } from "./exercise-unavailable";
import type { MinnaWord } from "../../../constants/minna";

export function Matching({ words, lang, onExit, onRestart, exitLabel = "Về bài học" }: ExerciseProps) {
  const schedule = useExerciseTimeouts();
  const answeringRef = useRef(false);
  const matchedRef = useRef(new Set<string>());
  const selectedWordRef = useRef<string | null>(null);

  const [rounds] = useState(() => buildMatchingRounds(shuffle(words), lang));
  const totalRounds = rounds.length;
  const [roundIndex, setRoundIndex] = useState(0);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [done, setDone] = useState(false);
  const [totalMatched, setTotalMatched] = useState(0);

  const getMeaning = (w: MinnaWord) => w.meaning[lang] ?? w.meaning.en ?? "";

  const [roundMeanings, setRoundMeanings] = useState<MinnaWord[]>(() => shuffle(rounds[0] ?? []));
  const [currentRoundWords, setCurrentRoundWords] = useState(() => shuffle(rounds[0] ?? []));

  const handleWordClick = (key: string) => {
    if (matchedRef.current.has(key) || answeringRef.current) return;
    selectedWordRef.current = key;
    setSelectedWord(key);
  };

  const handleMeaningClick = (word: MinnaWord) => {
    const key = wordKey(word);
    if (matchedRef.current.has(key) || answeringRef.current) return;
    const selected = selectedWordRef.current;
    if (!selected) return;

    if (selected === key) {
      const nextMatched = new Set([...matchedRef.current, key]);
      matchedRef.current = nextMatched;
      selectedWordRef.current = null;
      setMatched(nextMatched);
      setTotalMatched((t) => t + 1);
      setSelectedWord(null);

      if (currentRoundWords.every((w) => nextMatched.has(wordKey(w)))) {
        answeringRef.current = true;
        schedule(() => {
          const nextRound = roundIndex + 1;
          if (nextRound >= totalRounds) {
            setDone(true);
          } else {
            setCurrentRoundWords(shuffle(rounds[nextRound]));
            setRoundMeanings(shuffle(rounds[nextRound]));
            matchedRef.current = new Set();
            setMatched(matchedRef.current);
            setRoundIndex(nextRound);
          }
          answeringRef.current = false;
        }, 600);
      }
    } else {
      answeringRef.current = true;
      setWrongPair([selected, key]);
      schedule(() => {
        answeringRef.current = false;
        selectedWordRef.current = null;
        setWrongPair(null);
        setSelectedWord(null);
      }, 600);
    }
  };

  if (!words.length) return <ExerciseUnavailable onExit={onExit} exitLabel={exitLabel} />;

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 text-center">
          <div className="text-5xl">🎉</div>
          <h2 className="text-2xl font-bold">Hoàn thành!</h2>
          <p className="text-muted-foreground">Đã nối đúng {totalMatched} / {words.length} cặp</p>
          <div className="flex gap-3 mt-2">
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
      <div className="w-full max-w-2xl">
        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Nối từ</span>
          <span>Vòng {roundIndex + 1} / {totalRounds}</span>
        </div>
        <div className="mb-6 h-1.5 w-full rounded-full bg-secondary">
          <motion.div className="h-1.5 rounded-full bg-primary"
            animate={{ width: `${(roundIndex / totalRounds) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Words column */}
          <div className="flex flex-col gap-2">
            {currentRoundWords.map((word) => {
              const key = wordKey(word);
              const isMatched = matched.has(key);
              const isSelected = selectedWord === key;
              const isWrong = wrongPair?.[0] === key;
              return (
                <AnimatePresence key={key} mode="wait">
                  {!isMatched ? (
                    <motion.button
                      layout
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => handleWordClick(key)}
                      className={`rounded-xl border px-4 py-3 text-center text-sm font-medium transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : isWrong
                          ? "border-red-500 bg-red-500/10 text-red-500"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      {word.kanji ?? word.kana}
                      {word.kanji && (
                        <span className="ml-1 text-xs text-muted-foreground">({word.kana})</span>
                      )}
                    </motion.button>
                  ) : (
                    <motion.div
                      layout
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0.3 }}
                      className="rounded-xl border border-green-500/30 bg-green-500/5 px-4 py-3 text-center text-sm text-green-600"
                    >
                      ✓
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>

          {/* Meanings column */}
          <div className="flex flex-col gap-2">
            {roundMeanings.map((word) => {
              const key = wordKey(word);
              const isMatched = matched.has(key);
              const isWrong = wrongPair?.[1] === key;
              return (
                <AnimatePresence key={key} mode="wait">
                  {!isMatched ? (
                    <motion.button
                      layout
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => handleMeaningClick(word)}
                      className={`rounded-xl border px-4 py-3 text-center text-sm transition-all ${
                        isWrong
                          ? "border-red-500 bg-red-500/10 text-red-500"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      {getMeaning(word)}
                    </motion.button>
                  ) : (
                    <motion.div
                      layout
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0.3 }}
                      className="rounded-xl border border-green-500/30 bg-green-500/5 px-4 py-3 text-center text-sm text-green-600"
                    >
                      ✓
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <span>Đã nối: {totalMatched} / {words.length}</span>
          <button onClick={onExit} className="hover:text-foreground transition-colors">{exitLabel}</button>
        </div>
      </div>
    </div>
  );
}
