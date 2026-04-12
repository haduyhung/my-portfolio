"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "../../../../i18n/navigation";
import type { MinnaWord } from "../../../constants/minna";
import type { MinnaLang } from "../../../hooks/use-minna-lang";

const ROUND_SIZE = 6;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

interface Props {
  words: MinnaWord[];
  lessonId: number;
  lang: MinnaLang;
}

export function Matching({ words, lessonId, lang }: Props) {
  const router = useRouter();

  const totalRounds = Math.ceil(words.length / ROUND_SIZE);
  const [roundIndex, setRoundIndex] = useState(0);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [done, setDone] = useState(false);
  const [totalMatched, setTotalMatched] = useState(0);

  const getRoundWords = useCallback((round: number) => {
    const start = round * ROUND_SIZE;
    return words.slice(start, start + ROUND_SIZE);
  }, [words]);

  const wordKey = (w: MinnaWord) => `${w.id[0]}-${w.id[1]}`;
  const getMeaning = (w: MinnaWord) => w.meaning[lang] ?? w.meaning.en ?? "";

  const [roundWords] = useState<MinnaWord[]>(() => shuffle(getRoundWords(0)));
  const [roundMeanings, setRoundMeanings] = useState<MinnaWord[]>(() => shuffle(getRoundWords(0)));
  const [currentRoundWords, setCurrentRoundWords] = useState(roundWords);

  const handleWordClick = (key: string) => {
    if (matched.has(key) || wrongPair) return;
    setSelectedWord(key);
  };

  const handleMeaningClick = (word: MinnaWord) => {
    const key = wordKey(word);
    if (matched.has(key) || wrongPair) return;
    if (!selectedWord) return;

    if (selectedWord === key) {
      // correct match
      setMatched((m) => {
        const next = new Set(m);
        next.add(key);
        return next;
      });
      setTotalMatched((t) => t + 1);
      setSelectedWord(null);

      // Check if round is done
      const currentWords = currentRoundWords;
      const newMatched = new Set([...matched, key]);
      if (currentWords.every((w) => newMatched.has(wordKey(w)))) {
        setTimeout(() => {
          const nextRound = roundIndex + 1;
          if (nextRound >= totalRounds) {
            setDone(true);
          } else {
            const nextWords = shuffle(getRoundWords(nextRound));
            setCurrentRoundWords(nextWords);
            setRoundMeanings(shuffle(getRoundWords(nextRound)));
            setMatched(new Set());
            setRoundIndex(nextRound);
          }
        }, 600);
      }
    } else {
      // wrong
      setWrongPair([selectedWord, key]);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedWord(null);
      }, 600);
    }
  };

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 text-center">
          <div className="text-5xl">🎉</div>
          <h2 className="text-2xl font-bold">Hoàn thành!</h2>
          <p className="text-muted-foreground">Đã nối đúng {totalMatched} / {words.length} cặp</p>
          <div className="flex gap-3 mt-2">
            <button onClick={() => router.push(`/japanese/minna/${lessonId}/matching` as any)}
              className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Làm lại</button>
            <button onClick={() => router.push(`/japanese/minna/${lessonId}` as any)}
              className="rounded-lg border border-border px-6 py-2 text-sm font-medium hover:bg-secondary">Thoát</button>
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
          <button onClick={() => router.push(`/japanese/minna/${lessonId}` as any)} className="hover:text-foreground transition-colors">Thoát</button>
        </div>
      </div>
    </div>
  );
}
