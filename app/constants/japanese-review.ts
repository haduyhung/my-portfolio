import { isExerciseType, type ExerciseType } from "./japanese-exercises";
import { BOOK_RANGES, getWordsForLessons, type MinnaDataset } from "./minna";

export interface ReviewConfig {
  from: number;
  to: number;
  exerciseType: ExerciseType;
}

export type ReviewSearchParams = Record<string, string | string[] | undefined>;

export const DEFAULT_REVIEW_CONFIG: ReviewConfig = {
  from: 1,
  to: 1,
  exerciseType: "flashcard",
};

export const REVIEW_LESSONS = Array.from(
  { length: BOOK_RANGES[2].end },
  (_, index) => index + 1,
);

export function isReviewRange(from: number, to: number): boolean {
  return Number.isInteger(from) && Number.isInteger(to)
    && from >= BOOK_RANGES[1].start && to <= BOOK_RANGES[2].end && from <= to;
}

export function parseReviewConfig(
  query: ReviewSearchParams,
  routeExerciseType?: string,
): ReviewConfig | null {
  const { from, to, type } = query;
  if (routeExerciseType === undefined && from === undefined && to === undefined && type === undefined) {
    return { ...DEFAULT_REVIEW_CONFIG };
  }
  if (typeof from !== "string" || typeof to !== "string"
    || !/^[1-9]\d*$/.test(from) || !/^[1-9]\d*$/.test(to)
    || Array.isArray(type)) return null;

  const exerciseType = routeExerciseType ?? type;
  if (!exerciseType || !isExerciseType(exerciseType)
    || (routeExerciseType !== undefined && type !== undefined && type !== routeExerciseType)) return null;

  const config = { from: Number(from), to: Number(to), exerciseType };
  return isReviewRange(config.from, config.to) ? config : null;
}

export function getReviewWords(dataset: MinnaDataset, config: ReviewConfig) {
  if (!isReviewRange(config.from, config.to)) return [];
  const lessonIds = REVIEW_LESSONS.filter((id) => id >= config.from && id <= config.to);
  const selectedLessons = dataset.lessons.filter((lesson) => lessonIds.includes(lesson.id));
  if (selectedLessons.length !== lessonIds.length
    || new Set(selectedLessons.map((lesson) => lesson.id)).size !== lessonIds.length
    || selectedLessons.some((lesson) => lesson.words.length === 0)) return [];
  return getWordsForLessons(dataset, lessonIds);
}

export function getReviewSettingsHref(config: ReviewConfig): string {
  return `/japanese/review?from=${config.from}&to=${config.to}&type=${config.exerciseType}`;
}

export function getReviewSessionHref(config: ReviewConfig): string {
  return `/japanese/review/${config.exerciseType}?from=${config.from}&to=${config.to}`;
}
