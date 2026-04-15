"use client";

import { use, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "../../../../../../i18n/navigation";
import { getNumbersLesson } from "../../../../../constants/numbers";
import type { MinnaLang } from "../../../../../hooks/use-minna-lang";
import { Flashcard } from "../../../../../components/japanese/exercises/flashcard";
import { MeaningQuiz } from "../../../../../components/japanese/exercises/meaning-quiz";
import { ReadingQuiz } from "../../../../../components/japanese/exercises/reading-quiz";
import { TypingQuiz } from "../../../../../components/japanese/exercises/typing-quiz";
import { Matching } from "../../../../../components/japanese/exercises/matching";

const VALID_TYPES = ["flashcard", "meaning-quiz", "reading-quiz", "typing-quiz", "matching"] as const;
type ExerciseType = (typeof VALID_TYPES)[number];

export default function NumbersExercisePage({
  params,
}: {
  params: Promise<{ lessonId: string; exerciseType: string }>;
}) {
  const router = useRouter();
  const locale = useLocale();
  const { lessonId: lessonIdStr, exerciseType: exerciseTypeStr } = use(params);
  const lessonId = parseInt(lessonIdStr, 10);
  const exerciseType = exerciseTypeStr as ExerciseType;
  const lesson = getNumbersLesson(lessonId);
  const words = lesson?.words ?? [];
  const lang: MinnaLang = locale === "fr" ? "fr" : locale === "vi" ? "vi" : "en";

  useEffect(() => {
    if (sessionStorage.getItem("jp_auth") !== "1") {
      router.replace("/secret" as any);
      return;
    }
    if (!lesson || !VALID_TYPES.includes(exerciseType as ExerciseType)) {
      router.replace(`/japanese/numbers/${lessonId}` as any);
    }
  }, [lesson, lessonId, exerciseType, router]);

  if (!lesson || words.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <p className="font-medium">Không tìm thấy bài học</p>
        <button
          onClick={() => router.push("/japanese/numbers" as any)}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Về danh sách bài
        </button>
      </div>
    );
  }

  const props = { words, lessonId, lang };

  switch (exerciseType) {
    case "flashcard":
      return <Flashcard key={`${lessonId}-flashcard`} {...props} />;
    case "meaning-quiz":
      return <MeaningQuiz key={`${lessonId}-meaning-quiz`} {...props} />;
    case "reading-quiz":
      return <ReadingQuiz key={`${lessonId}-reading-quiz`} {...props} />;
    case "typing-quiz":
      return <TypingQuiz key={`${lessonId}-typing-quiz`} {...props} />;
    case "matching":
      return <Matching key={`${lessonId}-matching`} {...props} />;
    default:
      return null;
  }
}
