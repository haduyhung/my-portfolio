"use client";

import { useMemo, useState } from "react";
import { useRouter } from "../../../../i18n/navigation";
import type { ExerciseType } from "../../../constants/japanese-exercises";
import type { MinnaWord } from "../../../constants/minna";
import type { MinnaLang } from "../../../hooks/use-minna-lang";
import { getExerciseAvailability } from "./exercise-data";
import { Flashcard } from "./flashcard";
import { MeaningQuiz } from "./meaning-quiz";
import { ReadingQuiz } from "./reading-quiz";
import { TypingQuiz } from "./typing-quiz";
import { Matching } from "./matching";
import { ExerciseUnavailable } from "./exercise-unavailable";

interface ExercisePlayerProps {
  words: MinnaWord[];
  lang: MinnaLang;
  exerciseType: ExerciseType;
  backHref: string;
  backLabel?: string;
}

const components = {
  flashcard: Flashcard,
  "meaning-quiz": MeaningQuiz,
  "reading-quiz": ReadingQuiz,
  "typing-quiz": TypingQuiz,
  matching: Matching,
};

export function ExercisePlayer({ words, lang, exerciseType, backHref, backLabel = "Về bài học" }: ExercisePlayerProps) {
  const router = useRouter();
  const [session, setSession] = useState(0);
  const availability = useMemo(() => getExerciseAvailability(words, exerciseType, lang), [words, exerciseType, lang]);
  const onExit = () => router.push(backHref);

  if (!availability.available) {
    return <ExerciseUnavailable onExit={onExit} exitLabel={backLabel} reason={availability.reason} />;
  }

  const Component = components[exerciseType];
  return <Component key={`${exerciseType}-${lang}-${session}`} words={words} lang={lang}
    onExit={onExit} onRestart={() => setSession((value) => value + 1)} exitLabel={backLabel} />;
}
