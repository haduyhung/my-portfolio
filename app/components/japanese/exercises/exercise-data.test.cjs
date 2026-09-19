/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS harness loads TS through the existing compiler. */
const { readFileSync } = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const test = require("node:test");
const ts = require("typescript");

// Run the actual TypeScript helpers without generated files or new dependencies.
require.extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  module._compile(outputText, filename);
};

const {
  buildMatchingRounds, createQuizPool, getExerciseAvailability, getMeaning,
  getQuizChoices, shuffle, wordKey, wordPrompt,
} = require("./exercise-data.ts");
const { EXERCISES, EXERCISE_TYPES, isExerciseType } = require("../../../constants/japanese-exercises.ts");

function word(lesson, index, meaning, { kana = `kana-${lesson}-${index}`, kanji = `kanji-${lesson}-${index}`, ...overrides } = {}) {
  return { id: [lesson, index], kana, kanji, romaji: "example", edition: [1, 2], meaning: { vi: meaning, en: meaning, fr: meaning }, ...overrides };
}

test("one canonical list covers metadata and route validation", () => {
  assert.deepEqual(EXERCISES.map((exercise) => exercise.type), EXERCISE_TYPES);
  EXERCISE_TYPES.forEach((type) => assert.equal(isExerciseType(type), true));
  ["", "meaning", "FLASHCARD", "constructor"].forEach((type) => assert.equal(isExerciseType(type), false));
});

test("tuple identity distinguishes the same word index in different lessons", () => {
  assert.notEqual(wordKey(word(1, 1, "a")), wordKey(word(2, 1, "a")));
});

test("meaning distractors are unique and exclude every valid meaning for the same prompt", () => {
  const correct = word(1, 1, "teacher", { kanji: "先生", kana: "せんせい" });
  const words = [correct,
    word(17, 1, "doctor", { kanji: "先生", kana: "せんせい" }),
    word(32, 1, "doctor"), // Same valid meaning on a different prompt is still excluded.
    word(2, 1, "teacher"), word(3, 1, "cat"), word(4, 1, "cat"),
    word(5, 1, "dog"), word(6, 1, "bird"),
  ];
  const pool = createQuizPool(words, "meaning-quiz", "vi");
  assert.equal(getExerciseAvailability(words, "meaning-quiz", "vi").available, true);
  for (let i = 0; i < 12; i += 1) {
    const choices = getQuizChoices(correct, pool);
    assert.equal(choices.length, 4);
    assert.deepEqual(new Set(choices.map((choice) => getMeaning(choice, "vi"))), new Set(["teacher", "cat", "dog", "bird"]));
    assert.equal(choices.filter((choice) => wordKey(choice) === wordKey(correct)).length, 1);
  }
});

test("reading excludes alternate readings of the same kanji and duplicate kana labels", () => {
  const correct = word(1, 1, "a", { kanji: "生", kana: "せい" });
  const words = [correct,
    word(2, 1, "b", { kanji: "生", kana: "しょう" }),
    word(3, 1, "c", { kana: "しょう" }), word(4, 1, "d", { kana: "せい" }),
    word(5, 1, "e"), word(6, 1, "f"), word(7, 1, "g"),
    word(8, 1, "no kanji", { kanji: null }),
  ];
  const pool = createQuizPool(words, "reading-quiz", "vi");
  const choices = getQuizChoices(correct, pool);
  assert.equal(pool.words.length, 7);
  assert.equal(choices.length, 4);
  assert.equal(new Set(choices.map((choice) => choice.kana)).size, 4);
  assert.equal(choices.some((choice) => choice.kana === "しょう"), false);
  assert.equal(choices.some((choice) => choice.kanji === null), false);
});

test("availability checks every question and unique labels, with locale fallback", () => {
  const repeated = Array.from({ length: 8 }, (_, i) => word(i + 1, 1, "same"));
  for (const type of EXERCISE_TYPES) assert.equal(getExerciseAvailability([], type, "vi").available, false);
  assert.equal(getExerciseAvailability(repeated, "meaning-quiz", "vi").available, false);
  assert.equal(getExerciseAvailability(repeated, "flashcard", "vi").wordCount, 8);
  const distinct = ["a", "b", "c", "d"].map((label, i) => word(i + 1, 1, label));
  assert.equal(getExerciseAvailability(distinct, "meaning-quiz", "fr").available, true);
  const fallback = word(5, 1, "fallback", { meaning: { vi: null, en: "a", fr: null } });
  assert.equal(getMeaning(fallback, "vi"), "a");
  assert.equal(getQuizChoices(distinct[0], createQuizPool([...distinct, fallback], "meaning-quiz", "vi")).length, 4);
  const samePrompt = word(6, 1, "b", { kanji: distinct[0].kanji, kana: distinct[0].kana });
  assert.equal(getExerciseAvailability([...distinct, samePrompt], "meaning-quiz", "vi").available, false);
});

test("matching defers repeated labels while keeping all records and partial rounds", () => {
  const words = Array.from({ length: 15 }, (_, i) => word(i + 1, 1, i < 4 ? "same meaning" : `meaning-${i}`));
  words[5] = { ...words[5], kanji: words[4].kanji, kana: words[4].kana };
  const rounds = buildMatchingRounds(words, "vi");
  assert.equal(rounds.flat().length, words.length);
  assert.deepEqual(new Set(rounds.flat().map(wordKey)), new Set(words.map(wordKey)));
  for (const round of rounds) {
    assert.ok(round.length > 0 && round.length <= 6);
    assert.equal(new Set(round.map(wordPrompt)).size, round.length);
    assert.equal(new Set(round.map((entry) => getMeaning(entry, "vi"))).size, round.length);
  }
  assert.ok(rounds.some((round) => round.length < 6));
  assert.deepEqual(buildMatchingRounds([], "vi"), []);
});

test("shuffle returns a new array and preserves every original identity", () => {
  const words = Array.from({ length: 10 }, (_, i) => word(i + 1, 1, String(i)));
  const original = [...words];
  const shuffled = shuffle(words);
  assert.notEqual(shuffled, words);
  assert.deepEqual(words, original);
  assert.deepEqual(new Set(shuffled.map(wordKey)), new Set(original.map(wordKey)));
});

test("the full 50-lesson dataset is playable with collision-free choices and complete matching rounds", () => {
  const dataset = JSON.parse(readFileSync(path.join(__dirname, "../../../../public/data/minna-no-ds.json"), "utf8"));
  const words = dataset.lessons.flatMap((lesson) => lesson.words);
  assert.equal(words.length, 2692);
  for (const lang of ["vi", "en", "fr"]) {
    for (const type of ["meaning-quiz", "reading-quiz"]) {
      const availability = getExerciseAvailability(words, type, lang);
      assert.equal(availability.available, true, `${type}/${lang}: ${availability.reason}`);
      assert.equal(availability.wordCount, type === "reading-quiz" ? 1899 : 2692);
      const pool = createQuizPool(words, type, lang);
      for (const current of pool.words) {
        const choices = getQuizChoices(current, pool);
        const labels = choices.map((entry) => type === "reading-quiz" ? entry.kana : getMeaning(entry, lang));
        assert.equal(choices.length, 4);
        assert.equal(new Set(labels).size, 4);
        assert.equal(choices.filter((entry) => wordKey(entry) === wordKey(current)).length, 1);
      }
    }
    const rounds = buildMatchingRounds(words, lang);
    assert.deepEqual(new Set(rounds.flat().map(wordKey)), new Set(words.map(wordKey)));
    for (const round of rounds) {
      assert.ok(round.length <= 6);
      assert.equal(new Set(round.map(wordPrompt)).size, round.length);
      assert.equal(new Set(round.map((entry) => getMeaning(entry, lang))).size, round.length);
    }
  }
});
