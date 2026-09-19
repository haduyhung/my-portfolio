"use client";

import { use, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "../../../../../../i18n/navigation";
import { loadMinnaDataset, type MinnaWord } from "../../../../../constants/minna";
import { isExerciseType } from "../../../../../constants/japanese-exercises";
import type { MinnaLang } from "../../../../../hooks/use-minna-lang";
import { ExercisePlayer } from "../../../../../components/japanese/exercises/exercise-player";

type LessonLoad =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; words: MinnaWord[] };

export default function ExercisePage({
  params,
}: {
  params: Promise<{ lessonId: string; exerciseType: string }>;
}) {
  const locale = useLocale();
  const { lessonId, exerciseType } = use(params);
  const lang: MinnaLang = locale === "fr" ? "fr" : locale === "vi" ? "vi" : "en";

  return (
    <LessonExercise
      key={`${lessonId}-${exerciseType}-${lang}`}
      lessonIdStr={lessonId}
      exerciseType={exerciseType}
      lang={lang}
    />
  );
}

function LessonExercise({
  lessonIdStr,
  exerciseType,
  lang,
}: {
  lessonIdStr: string;
  exerciseType: string;
  lang: MinnaLang;
}) {
  const router = useRouter();
  const lessonId = Number(lessonIdStr);
  const validLessonId = /^[1-9]\d*$/.test(lessonIdStr) && lessonId <= 50;
  const backHref = validLessonId ? `/japanese/minna/${lessonId}` : "/japanese/minna";
  const [load, setLoad] = useState<LessonLoad>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let authorized = false;
    try {
      authorized = localStorage.getItem("jp_auth") === "1";
    } catch {
      // Unavailable browser storage follows the existing sign-in flow.
    }
    if (!authorized) {
      router.replace("/secret");
      return;
    }
    if (!validLessonId || !isExerciseType(exerciseType)) {
      router.replace(backHref);
      return;
    }
    let cancelled = false;
    loadMinnaDataset()
      .then((dataset) => {
        if (cancelled) return;
        const lesson = dataset.lessons.find((item) => item.id === lessonId);
        setLoad({ status: "ready", words: lesson?.words ?? [] });
      })
      .catch(() => {
        if (!cancelled) setLoad({ status: "error" });
      });
    return () => { cancelled = true; };
  }, [lessonId, validLessonId, exerciseType, backHref, attempt, router]);

  if (load.status === "loading" || !validLessonId || !isExerciseType(exerciseType)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  if (load.status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <p role="alert" className="font-medium">Không tải được dữ liệu bài học.</p>
        <button
          onClick={() => {
            setLoad({ status: "loading" });
            setAttempt((value) => value + 1);
          }}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Thử lại
        </button>
        <button onClick={() => router.push(backHref)} className="text-sm text-muted-foreground hover:text-foreground">
          Về bài học
        </button>
      </div>
    );
  }

  if (load.words.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <p className="font-medium">Không tìm thấy bài học</p>
        <button
          onClick={() => router.push("/japanese/minna")}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Về danh sách bài
        </button>
      </div>
    );
  }

  return (
    <ExercisePlayer
      key={`${lessonId}-${exerciseType}-${lang}`}
      words={load.words}
      lang={lang}
      exerciseType={exerciseType}
      backHref={backHref}
    />
  );
}
