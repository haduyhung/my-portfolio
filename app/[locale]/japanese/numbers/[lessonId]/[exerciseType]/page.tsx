"use client";

import { use, useEffect, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "../../../../../../i18n/navigation";
import { getNumbersLesson } from "../../../../../constants/numbers";
import { isExerciseType } from "../../../../../constants/japanese-exercises";
import type { MinnaLang } from "../../../../../hooks/use-minna-lang";
import { ExercisePlayer } from "../../../../../components/japanese/exercises/exercise-player";

function subscribeAuth(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function readAuth() {
  try {
    return localStorage.getItem("jp_auth") === "1";
  } catch {
    return false;
  }
}

function serverAuth() {
  return false;
}

export default function NumbersExercisePage({
  params,
}: {
  params: Promise<{ lessonId: string; exerciseType: string }>;
}) {
  const router = useRouter();
  const locale = useLocale();
  const { lessonId: lessonIdStr, exerciseType } = use(params);
  const lessonId = Number(lessonIdStr);
  const lesson = /^[1-9]\d*$/.test(lessonIdStr) ? getNumbersLesson(lessonId) : undefined;
  const words = lesson?.words ?? [];
  const lang: MinnaLang = locale === "fr" ? "fr" : locale === "vi" ? "vi" : "en";
  const authorized = useSyncExternalStore(subscribeAuth, readAuth, serverAuth);

  useEffect(() => {
    if (!readAuth()) {
      router.replace("/secret");
      return;
    }
    if (lesson && !isExerciseType(exerciseType)) {
      router.replace(`/japanese/numbers/${lessonId}`);
    }
  }, [authorized, lesson, lessonId, exerciseType, router]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  if (!lesson || words.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <p className="font-medium">Không tìm thấy bài học</p>
        <button
          onClick={() => router.push("/japanese/numbers")}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Về danh sách bài
        </button>
      </div>
    );
  }

  if (!isExerciseType(exerciseType)) return null;

  return (
    <ExercisePlayer
      key={`${lessonId}-${exerciseType}-${lang}`}
      words={words}
      lang={lang}
      exerciseType={exerciseType}
      backHref={`/japanese/numbers/${lessonId}`}
    />
  );
}
