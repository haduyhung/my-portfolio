"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "../../../i18n/navigation";
import type { Kana } from "../../constants/japanese";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function KanaQuiz({ kana, title }: { kana: Kana[]; title: string }) {
  const router = useRouter();
  const [deck, setDeck] = useState<Kana[]>(() => shuffle(kana));
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = deck[index];
  const total = deck.length;

  useEffect(() => {
    inputRef.current?.focus();
  }, [index, feedback]);

  const handleSubmit = useCallback(() => {
    if (feedback || !input.trim()) return;
    const answer = input.trim().toLowerCase();
    const correct = current.romaji.includes(answer);
    setFeedback(correct ? "correct" : "wrong");
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      setFeedback(null);
      setInput("");
      if (index + 1 >= total) {
        setDone(true);
      } else {
        setIndex((i) => i + 1);
      }
    }, 800);
  }, [feedback, input, current, index, total]);

  const handleRestart = () => {
    setDeck(shuffle(kana));
    setIndex(0);
    setInput("");
    setFeedback(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center shadow-lg"
        >
          <div className="text-5xl">🎉</div>
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
          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Làm lại
            </button>
            <button
              onClick={() => router.push("/japanese" as any)}
              className="rounded-lg border border-border px-6 py-2 text-sm font-medium hover:bg-secondary transition-colors"
            >
              Quay lại
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

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
            animate={{ width: `${((index) / total) * 100}%` }}
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
            className={`flex flex-col items-center gap-6 rounded-2xl border p-10 shadow-sm transition-colors ${
              feedback === "correct"
                ? "border-green-500 bg-green-500/10"
                : feedback === "wrong"
                ? "border-red-500 bg-red-500/10"
                : "border-border bg-card"
            }`}
          >
            <span className="text-8xl font-light">{current.char}</span>

            {feedback === "wrong" && (
              <p className="text-sm text-red-500">
                Đáp án: <span className="font-bold">{current.romaji[0]}</span>
              </p>
            )}

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              disabled={!!feedback}
              placeholder="Nhập romaji..."
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-center text-lg outline-none focus:border-primary transition-colors disabled:opacity-50"
            />

            <button
              onClick={handleSubmit}
              disabled={!!feedback || !input.trim()}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              Xác nhận
            </button>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <span>Điểm: <span className="font-medium text-foreground">{score}</span></span>
          <button
            onClick={() => router.push("/japanese" as any)}
            className="hover:text-foreground transition-colors"
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  );
}
