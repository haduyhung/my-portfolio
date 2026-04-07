"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "../../../i18n/navigation";
import type { Kana } from "../../constants/japanese";

export type QuizMode = "kana" | "romaji";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getChoices(correct: Kana, pool: Kana[]): Kana[] {
  const others = shuffle(pool.filter((k) => k.char !== correct.char)).slice(0, 3);
  return shuffle([correct, ...others]);
}

interface AnswerRecord {
  kana: Kana;
  userAnswer: string;
  correct: boolean;
}

interface Props {
  kana: Kana[];
  title: string;
  mode: QuizMode;
}

export function KanaQuiz({ kana, title, mode }: Props) {
  const router = useRouter();
  const [deck, setDeck] = useState<Kana[]>(() => shuffle(kana));
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState<AnswerRecord[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = deck[index];
  const total = deck.length;

  const choices = useMemo(
    () => getChoices(current, kana),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, deck]
  );

  useEffect(() => {
    if (mode === "kana") inputRef.current?.focus();
  }, [index, feedback, mode]);

  const advance = useCallback(
    (answer: string, correct: boolean) => {
      setFeedback(correct ? "correct" : "wrong");
      if (correct) setScore((s) => s + 1);
      setHistory((h) => [...h, { kana: current, userAnswer: answer, correct }]);

      setTimeout(() => {
        setFeedback(null);
        setInput("");
        setSelectedChoice(null);
        if (index + 1 >= total) {
          setDone(true);
        } else {
          setIndex((i) => i + 1);
        }
      }, 800);
    },
    [current, index, total]
  );

  const handleTextSubmit = useCallback(() => {
    if (feedback || !input.trim()) return;
    const answer = input.trim().toLowerCase();
    advance(answer, current.romaji.includes(answer));
  }, [feedback, input, current, advance]);

  const handleChoiceSelect = useCallback(
    (choice: Kana) => {
      if (feedback) return;
      setSelectedChoice(choice.char);
      advance(choice.char, choice.char === current.char);
    },
    [feedback, current, advance]
  );

  const handleRestart = () => {
    setDeck(shuffle(kana));
    setIndex(0);
    setInput("");
    setFeedback(null);
    setScore(0);
    setDone(false);
    setHistory([]);
    setSelectedChoice(null);
  };

  // ── Result screen ──────────────────────────────────────────────
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
          <div className="text-5xl">
            {score === total ? "🎉" : score >= total * 0.8 ? "👏" : "💪"}
          </div>
          <h2 className="text-2xl font-bold">Kết quả</h2>
          <p className="text-4xl font-bold text-primary">
            {score} / {total}
          </p>
          <p className="text-muted-foreground">
            {score === total
              ? "Hoàn hảo! Bạn nhớ hết rồi!"
              : score >= total * 0.8
              ? "Tốt lắm! Cố thêm một chút nữa nhé."
              : "Luyện thêm nhé, bạn sẽ làm được!"}
          </p>
          <div className="mt-1 flex gap-3">
            <button
              onClick={handleRestart}
              className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Làm lại
            </button>
            <button
              onClick={() => router.push("/japanese" as any)}
              className="rounded-lg border border-border px-6 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Quay lại
            </button>
          </div>
        </motion.div>

        <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
          {wrong.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5"
            >
              <h3 className="mb-3 font-semibold text-red-500">
                Sai — {wrong.length} câu
              </h3>
              <div className="flex flex-wrap gap-2">
                {wrong.map((r, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center rounded-lg border border-red-500/20 bg-background px-3 py-2 text-center"
                  >
                    <span className="text-2xl">{r.kana.char}</span>
                    <span className="text-xs text-muted-foreground line-through">
                      {r.userAnswer}
                    </span>
                    <span className="text-xs font-medium text-red-500">
                      {r.kana.romaji[0]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {correct.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5"
            >
              <h3 className="mb-3 font-semibold text-green-500">
                Đúng — {correct.length} câu
              </h3>
              <div className="flex flex-wrap gap-2">
                {correct.map((r, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center rounded-lg border border-green-500/20 bg-background px-3 py-2 text-center"
                  >
                    <span className="text-2xl">{r.kana.char}</span>
                    <span className="text-xs font-medium text-green-500">
                      {r.kana.romaji[0]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // ── Quiz screen ────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>{title}</span>
          <span>
            {index + 1} / {total}
          </span>
        </div>
        <div className="mb-6 h-1.5 w-full rounded-full bg-secondary">
          <motion.div
            className="h-1.5 rounded-full bg-primary"
            animate={{ width: `${(index / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-col items-center gap-6 rounded-2xl border p-8 shadow-sm transition-colors ${
              feedback === "correct"
                ? "border-green-500 bg-green-500/10"
                : feedback === "wrong"
                ? "border-red-500 bg-red-500/10"
                : "border-border bg-card"
            }`}
          >
            {/* Question */}
            {mode === "kana" ? (
              <span className="text-8xl font-light">{current.char}</span>
            ) : (
              <span className="text-5xl font-semibold tracking-widest">
                {current.romaji[0]}
              </span>
            )}

            {/* Kana→Romaji: text input */}
            {mode === "kana" && (
              <>
                {feedback === "wrong" && (
                  <p className="text-sm text-red-500">
                    Đáp án:{" "}
                    <span className="font-bold">{current.romaji[0]}</span>
                  </p>
                )}
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                  disabled={!!feedback}
                  placeholder="Nhập romaji..."
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-center text-lg outline-none transition-colors focus:border-primary disabled:opacity-50"
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={!!feedback || !input.trim()}
                  className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  Xác nhận
                </button>
              </>
            )}

            {/* Romaji→Kana: multiple choice */}
            {mode === "romaji" && (
              <>
                {feedback === "wrong" && (
                  <p className="text-sm text-red-500">
                    Đáp án:{" "}
                    <span className="text-2xl font-bold">{current.char}</span>
                  </p>
                )}
                <div className="grid w-full grid-cols-2 gap-3">
                  {choices.map((choice) => {
                    const isSelected = selectedChoice === choice.char;
                    const isCorrect = choice.char === current.char;
                    let btnClass =
                      "rounded-xl border py-4 text-3xl font-light transition-all ";
                    if (feedback && isSelected) {
                      btnClass += isCorrect
                        ? "border-green-500 bg-green-500/20 text-green-600"
                        : "border-red-500 bg-red-500/20 text-red-600";
                    } else if (feedback && isCorrect) {
                      btnClass += "border-green-500 bg-green-500/10";
                    } else {
                      btnClass +=
                        "border-border bg-background hover:border-primary hover:bg-primary/5";
                    }
                    return (
                      <button
                        key={choice.char}
                        onClick={() => handleChoiceSelect(choice)}
                        disabled={!!feedback}
                        className={btnClass}
                      >
                        {choice.char}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <span>
            Điểm:{" "}
            <span className="font-medium text-foreground">{score}</span>
          </span>
          <button
            onClick={() => router.push("/japanese" as any)}
            className="transition-colors hover:text-foreground"
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  );
}
