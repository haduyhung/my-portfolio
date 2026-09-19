/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS harness loads TS through the existing compiler. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const ts = require("typescript");

// Run pure TypeScript helpers using the project's existing compiler, without build artifacts.
require.extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  module._compile(outputText, filename);
};

const {
  DEFAULT_REVIEW_CONFIG, parseReviewConfig, getReviewWords,
  getReviewSettingsHref, getReviewSessionHref,
} = require("./japanese-review.ts");
const dataset = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/data/minna-no-ds.json"), "utf8"));

test("settings default to lesson 1 while exercise links require an explicit range", () => {
  assert.deepEqual(parseReviewConfig({}), DEFAULT_REVIEW_CONFIG);
  assert.equal(parseReviewConfig({}, "flashcard"), null);
  assert.deepEqual(parseReviewConfig({ from: "3", to: "7", type: "meaning-quiz" }), {
    from: 3, to: 7, exerciseType: "meaning-quiz",
  });
});

test("invalid, reversed, incomplete, repeated and conflicting URL values are rejected", () => {
  for (const value of ["0", "51", "-1", "1.2", "1e1", "NaN", "Infinity", "", " 1", "1x", "01"]) {
    assert.equal(parseReviewConfig({ from: value, to: "50" }, "flashcard"), null, value);
    assert.equal(parseReviewConfig({ from: "1", to: value }, "flashcard"), null, value);
  }
  for (const query of [
    { from: "7", to: "3" }, { from: "3" }, { to: "7" },
    { from: ["1", "2"], to: "7" }, { from: "1", to: ["7", "8"] },
    { from: "1", to: "7", type: ["flashcard", "matching"] },
    { from: "1", to: "7", type: "matching" },
  ]) assert.equal(parseReviewConfig(query, "flashcard"), null);
  assert.equal(parseReviewConfig({ from: "1", to: "7" }, "unknown"), null);
  assert.equal(parseReviewConfig({ from: "1", to: "7", type: "unknown" }), null);
  assert.equal(parseReviewConfig({ from: "1", to: "7" }), null);
});

test("selected data covers exactly the inclusive range and retains cross-lesson word IDs", () => {
  for (const [from, to] of [[1, 1], [3, 7], [24, 27], [1, 50], [50, 50]]) {
    const config = { from, to, exerciseType: "flashcard" };
    const expected = dataset.lessons.filter((lesson) => lesson.id >= from && lesson.id <= to).flatMap((lesson) => lesson.words);
    const actual = getReviewWords(dataset, config);
    assert.deepEqual(actual, expected);
    assert.equal(new Set(actual.map((word) => word.id.join("-"))).size, actual.length);
    assert.deepEqual([...new Set(actual.map((word) => word.id[0]))], Array.from({ length: to - from + 1 }, (_, i) => from + i));
  }
  assert.equal(getReviewWords(dataset, { from: 1, to: 50, exerciseType: "flashcard" }).length, 2692);
});

test("missing, duplicate and empty lessons cannot silently produce a partial review", () => {
  const config = { from: 3, to: 7, exerciseType: "matching" };
  const missing = { lessons: dataset.lessons.filter((lesson) => lesson.id !== 4) };
  assert.deepEqual(getReviewWords(missing, config), []);
  const duplicate = { lessons: [...missing.lessons, dataset.lessons.find((lesson) => lesson.id === 3)] };
  assert.deepEqual(getReviewWords(duplicate, config), []);
  const empty = { lessons: dataset.lessons.map((lesson) => lesson.id === 4 ? { ...lesson, words: [] } : lesson) };
  assert.deepEqual(getReviewWords(empty, config), []);
  assert.deepEqual(getReviewWords(dataset, { ...config, from: 8 }), []);
});

test("settings and session URLs round-trip every exercise and preserve the range", () => {
  for (const exerciseType of ["flashcard", "meaning-quiz", "reading-quiz", "typing-quiz", "matching"]) {
    const config = { from: 24, to: 27, exerciseType };
    const settings = new URL(getReviewSettingsHref(config), "http://localhost");
    const session = new URL(getReviewSessionHref(config), "http://localhost");
    assert.equal(settings.pathname, "/japanese/review");
    assert.equal(session.pathname, `/japanese/review/${exerciseType}`);
    assert.deepEqual(parseReviewConfig(Object.fromEntries(settings.searchParams)), config);
    assert.deepEqual(parseReviewConfig(Object.fromEntries(session.searchParams), exerciseType), config);
  }
});
