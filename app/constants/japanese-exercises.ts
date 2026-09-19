export const EXERCISE_TYPES = [
  "flashcard", "meaning-quiz", "reading-quiz", "typing-quiz", "matching",
] as const;

export type ExerciseType = (typeof EXERCISE_TYPES)[number];

export function isExerciseType(value: string): value is ExerciseType {
  return EXERCISE_TYPES.some((type) => type === value);
}

export const EXERCISES = [
  { type: "flashcard", label: "Flashcard", desc: "Lật thẻ ôn từ vựng", emoji: "🃏" },
  { type: "meaning-quiz", label: "Quiz nghĩa", desc: "Chọn nghĩa đúng của từ", emoji: "🧠" },
  { type: "reading-quiz", label: "Quiz đọc", desc: "Chọn cách đọc đúng (kana)", emoji: "👁" },
  { type: "typing-quiz", label: "Quiz gõ", desc: "Gõ romaji từ nghĩa của từ", emoji: "⌨️" },
  { type: "matching", label: "Nối từ", desc: "Nối từ với nghĩa tương ứng", emoji: "🔗" },
] as const satisfies ReadonlyArray<{ type: ExerciseType; label: string; desc: string; emoji: string }>;
