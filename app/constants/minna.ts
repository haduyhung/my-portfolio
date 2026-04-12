export interface MinnaWord {
  /** [lesson_number, word_number] */
  id: [number, number];
  /** Which editions contain this word: [1], [2], or [1, 2] */
  edition: number[];
  /** Kanji form, null if none */
  kanji: string | null;
  kana: string;
  romaji: string;
  meaning: {
    en: string | null;
    fr: string | null;
    vi: string | null;
  };
}

export interface MinnaLesson {
  /** Lesson number (1–50) */
  id: number;
  /** e.g. "lesson-01" */
  key: string;
  words: MinnaWord[];
}

export interface MinnaDataset {
  lessons: MinnaLesson[];
}

/** Fetch the dataset lazily (client-side). Cached after first load. */
let _cache: MinnaDataset | null = null;

export async function loadMinnaDataset(): Promise<MinnaDataset> {
  if (_cache) return _cache;
  const res = await fetch("/data/minna-no-ds.json");
  if (!res.ok) throw new Error("Failed to load Minna no Nihongo dataset");
  _cache = await res.json();
  return _cache!;
}

/** Book 1: lessons 1–25, Book 2: lessons 26–50 */
export const BOOK_RANGES = {
  1: { start: 1, end: 25 },
  2: { start: 26, end: 50 },
} as const;

/** Collect words from selected lesson IDs */
export function getWordsForLessons(
  dataset: MinnaDataset,
  lessonIds: number[]
): MinnaWord[] {
  const set = new Set(lessonIds);
  return dataset.lessons
    .filter((l) => set.has(l.id))
    .flatMap((l) => l.words);
}
