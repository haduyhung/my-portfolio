"use client";

import { useEffect, useState } from "react";
import { useRouter } from "../../../../i18n/navigation";
import { KanaQuiz, type QuizMode } from "../../../components/japanese/kana-quiz";
import { HIRAGANA } from "../../../constants/japanese";

export default function HiraganaPage() {
  const router = useRouter();
  const [mode, setMode] = useState<QuizMode>("kana");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("jp_auth") !== "1") {
      router.replace("/secret" as any);
    }
  }, [router]);

  if (!started) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Luyện Hiragana</h1>
          <p className="mt-1 text-muted-foreground">ひらがな · 46 ký tự</p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <p className="text-sm text-center text-muted-foreground">Chọn chế độ</p>
          <button
            onClick={() => setMode("kana")}
            className={`rounded-xl border px-6 py-4 text-left transition-all ${
              mode === "kana"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <p className="font-medium">Kana → Romaji</p>
            <p className="text-xs text-muted-foreground mt-0.5">Nhìn ký tự, nhập cách đọc</p>
          </button>
          <button
            onClick={() => setMode("romaji")}
            className={`rounded-xl border px-6 py-4 text-left transition-all ${
              mode === "romaji"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <p className="font-medium">Romaji → Kana</p>
            <p className="text-xs text-muted-foreground mt-0.5">Nhìn cách đọc, chọn ký tự đúng</p>
          </button>

          <button
            onClick={() => setStarted(true)}
            className="mt-2 w-full rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Bắt đầu
          </button>
          <button
            onClick={() => router.push("/japanese" as any)}
            className="text-xs text-center text-muted-foreground hover:text-foreground transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const title =
    mode === "kana"
      ? "Hiragana · Kana → Romaji"
      : "Hiragana · Romaji → Kana";

  return <KanaQuiz key={mode} kana={HIRAGANA} title={title} mode={mode} />;
}
