import type { ExerciseType } from "../../../constants/japanese-exercises";
import type { MinnaWord } from "../../../constants/minna";
import type { MinnaLang } from "../../../hooks/use-minna-lang";

export type QuizType = "meaning-quiz" | "reading-quiz";

export function wordKey(word: MinnaWord): string {
  return `${word.id[0]}-${word.id[1]}`;
}

export function getMeaning(word: MinnaWord, lang: MinnaLang): string {
  return word.meaning[lang] ?? word.meaning.en ?? "";
}

function normalizeLabel(label: string): string {
  return label.normalize("NFC").trim().replace(/\s+/g, " ");
}

/** The pair is also the visible prompt used by Matching. */
export function wordPrompt(word: MinnaWord): string {
  return JSON.stringify([normalizeLabel(word.kanji ?? ""), normalizeLabel(word.kana)]);
}

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function quizPrompt(word: MinnaWord, type: QuizType): string {
  return type === "reading-quiz" ? normalizeLabel(word.kanji ?? "") : wordPrompt(word);
}

function quizLabel(word: MinnaWord, type: QuizType, lang: MinnaLang): string {
  return normalizeLabel(type === "reading-quiz" ? word.kana : getMeaning(word, lang));
}

export interface QuizPool {
  words: MinnaWord[];
  type: QuizType;
  lang: MinnaLang;
  labels: Map<string, MinnaWord>;
  answersByPrompt: Map<string, Set<string>>;
}

/** Index all valid answers for a prompt, including records from other lessons. */
export function createQuizPool(words: MinnaWord[], type: QuizType, lang: MinnaLang): QuizPool {
  const eligible = type === "reading-quiz" ? words.filter((word) => Boolean(word.kanji?.trim())) : words;
  const labels = new Map<string, MinnaWord>();
  const answersByPrompt = new Map<string, Set<string>>();
  for (const word of eligible) {
    const label = quizLabel(word, type, lang);
    const prompt = quizPrompt(word, type);
    if (label) labels.set(label, word);
    const answers = answersByPrompt.get(prompt) ?? new Set<string>();
    answers.add(label);
    answersByPrompt.set(prompt, answers);
  }
  return { words: eligible, type, lang, labels, answersByPrompt };
}

export function getQuizChoices(current: MinnaWord | undefined, pool: QuizPool): MinnaWord[] {
  if (!current) return [];
  const validAnswers = pool.answersByPrompt.get(quizPrompt(current, pool.type)) ?? new Set<string>();
  const distractors = [...pool.labels].filter(([label]) => !validAnswers.has(label)).map(([, word]) => word);
  return shuffle([current, ...shuffle(distractors).slice(0, 3)]);
}

export function getExerciseAvailability(
  words: MinnaWord[], exerciseType: ExerciseType, lang: MinnaLang,
): { available: boolean; wordCount: number; reason?: string } {
  if (exerciseType !== "meaning-quiz" && exerciseType !== "reading-quiz") {
    return words.length > 0
      ? { available: true, wordCount: words.length }
      : { available: false, wordCount: 0, reason: "Không có từ vựng để luyện tập." };
  }
  const pool = createQuizPool(words, exerciseType, lang);
  const wordCount = pool.words.length;
  const reason = exerciseType === "reading-quiz"
    ? "Cần đủ từ có Kanji để tạo 4 cách đọc khác nhau cho mỗi câu. Hãy chọn thêm bài hoặc đổi loại bài tập."
    : "Cần đủ từ để tạo 4 nghĩa khác nhau cho mỗi câu. Hãy chọn thêm bài hoặc đổi loại bài tập.";
  if (!wordCount) return { available: false, wordCount, reason };
  for (const answers of pool.answersByPrompt.values()) {
    // Other valid answers to the same prompt cannot serve as wrong choices.
    if (answers.has("") || pool.labels.size - answers.size < 3) {
      return { available: false, wordCount, reason };
    }
  }
  return { available: true, wordCount };
}

/** Defer colliding labels; never discard a vocabulary record. */
export function buildMatchingRounds(words: MinnaWord[], lang: MinnaLang): MinnaWord[][] {
  const rounds: Array<{ words: MinnaWord[]; prompts: Set<string>; meanings: Set<string> }> = [];
  for (const word of words) {
    const prompt = wordPrompt(word);
    const meaning = normalizeLabel(getMeaning(word, lang));
    let round = rounds.find((candidate) => candidate.words.length < 6
      && !candidate.prompts.has(prompt) && !candidate.meanings.has(meaning));
    if (!round) {
      round = { words: [], prompts: new Set(), meanings: new Set() };
      rounds.push(round);
    }
    round.words.push(word);
    round.prompts.add(prompt);
    round.meanings.add(meaning);
  }
  return rounds.map((round) => round.words);
}
