"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "../../../../i18n/navigation";
import { KanaQuiz, type QuizMode } from "../../../components/japanese/kana-quiz";
import { KanaChart } from "../../../components/japanese/kana-chart";
import { HIRAGANA } from "../../../constants/japanese";

const MODES: { value: QuizMode; label: string; desc: string; icon: string }[] = [
  { value: "kana", label: "Kana → Romaji", desc: "Nhìn ký tự, nhập cách đọc", icon: "あ" },
  { value: "romaji", label: "Romaji → Kana", desc: "Nhìn romaji, chọn ký tự đúng", icon: "A" },
];

export default function HiraganaPage() {
  const router = useRouter();
  const [mode, setMode] = useState<QuizMode>("kana");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("jp_auth") !== "1") {
      router.replace("/secret" as any);
    }
  }, [router]);

  if (started) {
    return (
      <KanaQuiz
        key={mode}
        kana={HIRAGANA}
        title={mode === "kana" ? "Hiragana · Kana → Romaji" : "Hiragana · Romaji → Kana"}
        mode={mode}
      />
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row">
      {/* Left: Chart */}
      <div className="flex-1 p-6">
        <KanaChart
          embedded
          title="Hiragana"
          subtitle="ひらがな · 71 ký tự"
          pool={HIRAGANA}
        />
      </div>

      {/* Right: Sticky quiz panel */}
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
              <h2 className="mt-0.5 font-semibold">Hiragana</h2>
            </div>

            {/* Mode options */}
            <div className="p-2">
              {MODES.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMode(opt.value)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                    mode === opt.value
                      ? "bg-primary/10"
                      : "hover:bg-secondary"
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-base font-medium">
                    {opt.icon}
                  </span>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${mode === opt.value ? "text-primary" : ""}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                  {mode === opt.value && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-sm text-primary"
                    >
                      ✓
                    </motion.span>
                  )}
                </button>
              ))}
            </div>

            {/* Start button */}
            <div className="border-t border-border p-3">
              <button
                onClick={() => setStarted(true)}
                className="w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Bắt đầu luyện tập
              </button>
            </div>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-3 rounded-xl border border-border bg-card p-3"
          >
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">46</span> ký tự cơ bản ·{" "}
              <span className="font-medium text-foreground">25</span> biến âm
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
