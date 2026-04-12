export interface Kana {
  char: string;
  romaji: string[];
  /** Consonant row key used for chart grouping.
   *  "" = vowel row, "ん" = the ん entry (displays as "n" but distinct from な-row "n") */
  row: string;
  /** Vowel column position: 0=a 1=i 2=u 3=e 4=o */
  col: number;
}

export const HIRAGANA: Kana[] = [
  // ── 五十音 Basic ───────────────────────────────────────────────────────────
  { char: "あ", romaji: ["a"],        row: "",  col: 0 },
  { char: "い", romaji: ["i"],        row: "",  col: 1 },
  { char: "う", romaji: ["u"],        row: "",  col: 2 },
  { char: "え", romaji: ["e"],        row: "",  col: 3 },
  { char: "お", romaji: ["o"],        row: "",  col: 4 },
  { char: "か", romaji: ["ka"],       row: "k", col: 0 },
  { char: "き", romaji: ["ki"],       row: "k", col: 1 },
  { char: "く", romaji: ["ku"],       row: "k", col: 2 },
  { char: "け", romaji: ["ke"],       row: "k", col: 3 },
  { char: "こ", romaji: ["ko"],       row: "k", col: 4 },
  { char: "さ", romaji: ["sa"],       row: "s", col: 0 },
  { char: "し", romaji: ["shi","si"], row: "s", col: 1 },
  { char: "す", romaji: ["su"],       row: "s", col: 2 },
  { char: "せ", romaji: ["se"],       row: "s", col: 3 },
  { char: "そ", romaji: ["so"],       row: "s", col: 4 },
  { char: "た", romaji: ["ta"],       row: "t", col: 0 },
  { char: "ち", romaji: ["chi","ti"], row: "t", col: 1 },
  { char: "つ", romaji: ["tsu","tu"], row: "t", col: 2 },
  { char: "て", romaji: ["te"],       row: "t", col: 3 },
  { char: "と", romaji: ["to"],       row: "t", col: 4 },
  { char: "な", romaji: ["na"],       row: "n", col: 0 },
  { char: "に", romaji: ["ni"],       row: "n", col: 1 },
  { char: "ぬ", romaji: ["nu"],       row: "n", col: 2 },
  { char: "ね", romaji: ["ne"],       row: "n", col: 3 },
  { char: "の", romaji: ["no"],       row: "n", col: 4 },
  { char: "は", romaji: ["ha"],       row: "h", col: 0 },
  { char: "ひ", romaji: ["hi"],       row: "h", col: 1 },
  { char: "ふ", romaji: ["fu","hu"],  row: "h", col: 2 },
  { char: "へ", romaji: ["he"],       row: "h", col: 3 },
  { char: "ほ", romaji: ["ho"],       row: "h", col: 4 },
  { char: "ま", romaji: ["ma"],       row: "m", col: 0 },
  { char: "み", romaji: ["mi"],       row: "m", col: 1 },
  { char: "む", romaji: ["mu"],       row: "m", col: 2 },
  { char: "め", romaji: ["me"],       row: "m", col: 3 },
  { char: "も", romaji: ["mo"],       row: "m", col: 4 },
  { char: "や", romaji: ["ya"],       row: "y", col: 0 },
  { char: "ゆ", romaji: ["yu"],       row: "y", col: 2 },
  { char: "よ", romaji: ["yo"],       row: "y", col: 4 },
  { char: "ら", romaji: ["ra"],       row: "r", col: 0 },
  { char: "り", romaji: ["ri"],       row: "r", col: 1 },
  { char: "る", romaji: ["ru"],       row: "r", col: 2 },
  { char: "れ", romaji: ["re"],       row: "r", col: 3 },
  { char: "ろ", romaji: ["ro"],       row: "r", col: 4 },
  { char: "わ", romaji: ["wa"],       row: "w", col: 0 },
  { char: "を", romaji: ["wo","o"],   row: "w", col: 4 },
  { char: "ん", romaji: ["n","nn"],   row: "ん", col: 0 },
  // ── 濁音 Dakuten ──────────────────────────────────────────────────────────
  { char: "が", romaji: ["ga"],       row: "g", col: 0 },
  { char: "ぎ", romaji: ["gi"],       row: "g", col: 1 },
  { char: "ぐ", romaji: ["gu"],       row: "g", col: 2 },
  { char: "げ", romaji: ["ge"],       row: "g", col: 3 },
  { char: "ご", romaji: ["go"],       row: "g", col: 4 },
  { char: "ざ", romaji: ["za"],       row: "z", col: 0 },
  { char: "じ", romaji: ["ji","zi"],  row: "z", col: 1 },
  { char: "ず", romaji: ["zu"],       row: "z", col: 2 },
  { char: "ぜ", romaji: ["ze"],       row: "z", col: 3 },
  { char: "ぞ", romaji: ["zo"],       row: "z", col: 4 },
  { char: "だ", romaji: ["da"],       row: "d", col: 0 },
  { char: "ぢ", romaji: ["di","ji"],  row: "d", col: 1 },
  { char: "づ", romaji: ["du","zu"],  row: "d", col: 2 },
  { char: "で", romaji: ["de"],       row: "d", col: 3 },
  { char: "ど", romaji: ["do"],       row: "d", col: 4 },
  { char: "ば", romaji: ["ba"],       row: "b", col: 0 },
  { char: "び", romaji: ["bi"],       row: "b", col: 1 },
  { char: "ぶ", romaji: ["bu"],       row: "b", col: 2 },
  { char: "べ", romaji: ["be"],       row: "b", col: 3 },
  { char: "ぼ", romaji: ["bo"],       row: "b", col: 4 },
  // ── 半濁音 Handakuten ─────────────────────────────────────────────────────
  { char: "ぱ", romaji: ["pa"],       row: "p", col: 0 },
  { char: "ぴ", romaji: ["pi"],       row: "p", col: 1 },
  { char: "ぷ", romaji: ["pu"],       row: "p", col: 2 },
  { char: "ぺ", romaji: ["pe"],       row: "p", col: 3 },
  { char: "ぽ", romaji: ["po"],       row: "p", col: 4 },
];

export const KATAKANA: Kana[] = [
  // ── 五十音 Basic ───────────────────────────────────────────────────────────
  { char: "ア", romaji: ["a"],        row: "",  col: 0 },
  { char: "イ", romaji: ["i"],        row: "",  col: 1 },
  { char: "ウ", romaji: ["u"],        row: "",  col: 2 },
  { char: "エ", romaji: ["e"],        row: "",  col: 3 },
  { char: "オ", romaji: ["o"],        row: "",  col: 4 },
  { char: "カ", romaji: ["ka"],       row: "k", col: 0 },
  { char: "キ", romaji: ["ki"],       row: "k", col: 1 },
  { char: "ク", romaji: ["ku"],       row: "k", col: 2 },
  { char: "ケ", romaji: ["ke"],       row: "k", col: 3 },
  { char: "コ", romaji: ["ko"],       row: "k", col: 4 },
  { char: "サ", romaji: ["sa"],       row: "s", col: 0 },
  { char: "シ", romaji: ["shi","si"], row: "s", col: 1 },
  { char: "ス", romaji: ["su"],       row: "s", col: 2 },
  { char: "セ", romaji: ["se"],       row: "s", col: 3 },
  { char: "ソ", romaji: ["so"],       row: "s", col: 4 },
  { char: "タ", romaji: ["ta"],       row: "t", col: 0 },
  { char: "チ", romaji: ["chi","ti"], row: "t", col: 1 },
  { char: "ツ", romaji: ["tsu","tu"], row: "t", col: 2 },
  { char: "テ", romaji: ["te"],       row: "t", col: 3 },
  { char: "ト", romaji: ["to"],       row: "t", col: 4 },
  { char: "ナ", romaji: ["na"],       row: "n", col: 0 },
  { char: "ニ", romaji: ["ni"],       row: "n", col: 1 },
  { char: "ヌ", romaji: ["nu"],       row: "n", col: 2 },
  { char: "ネ", romaji: ["ne"],       row: "n", col: 3 },
  { char: "ノ", romaji: ["no"],       row: "n", col: 4 },
  { char: "ハ", romaji: ["ha"],       row: "h", col: 0 },
  { char: "ヒ", romaji: ["hi"],       row: "h", col: 1 },
  { char: "フ", romaji: ["fu","hu"],  row: "h", col: 2 },
  { char: "ヘ", romaji: ["he"],       row: "h", col: 3 },
  { char: "ホ", romaji: ["ho"],       row: "h", col: 4 },
  { char: "マ", romaji: ["ma"],       row: "m", col: 0 },
  { char: "ミ", romaji: ["mi"],       row: "m", col: 1 },
  { char: "ム", romaji: ["mu"],       row: "m", col: 2 },
  { char: "メ", romaji: ["me"],       row: "m", col: 3 },
  { char: "モ", romaji: ["mo"],       row: "m", col: 4 },
  { char: "ヤ", romaji: ["ya"],       row: "y", col: 0 },
  { char: "ユ", romaji: ["yu"],       row: "y", col: 2 },
  { char: "ヨ", romaji: ["yo"],       row: "y", col: 4 },
  { char: "ラ", romaji: ["ra"],       row: "r", col: 0 },
  { char: "リ", romaji: ["ri"],       row: "r", col: 1 },
  { char: "ル", romaji: ["ru"],       row: "r", col: 2 },
  { char: "レ", romaji: ["re"],       row: "r", col: 3 },
  { char: "ロ", romaji: ["ro"],       row: "r", col: 4 },
  { char: "ワ", romaji: ["wa"],       row: "w", col: 0 },
  { char: "ヲ", romaji: ["wo","o"],   row: "w", col: 4 },
  { char: "ン", romaji: ["n","nn"],   row: "ん", col: 0 },
  // ── 濁音 Dakuten ──────────────────────────────────────────────────────────
  { char: "ガ", romaji: ["ga"],       row: "g", col: 0 },
  { char: "ギ", romaji: ["gi"],       row: "g", col: 1 },
  { char: "グ", romaji: ["gu"],       row: "g", col: 2 },
  { char: "ゲ", romaji: ["ge"],       row: "g", col: 3 },
  { char: "ゴ", romaji: ["go"],       row: "g", col: 4 },
  { char: "ザ", romaji: ["za"],       row: "z", col: 0 },
  { char: "ジ", romaji: ["ji","zi"],  row: "z", col: 1 },
  { char: "ズ", romaji: ["zu"],       row: "z", col: 2 },
  { char: "ゼ", romaji: ["ze"],       row: "z", col: 3 },
  { char: "ゾ", romaji: ["zo"],       row: "z", col: 4 },
  { char: "ダ", romaji: ["da"],       row: "d", col: 0 },
  { char: "ヂ", romaji: ["di","ji"],  row: "d", col: 1 },
  { char: "ヅ", romaji: ["du","zu"],  row: "d", col: 2 },
  { char: "デ", romaji: ["de"],       row: "d", col: 3 },
  { char: "ド", romaji: ["do"],       row: "d", col: 4 },
  { char: "バ", romaji: ["ba"],       row: "b", col: 0 },
  { char: "ビ", romaji: ["bi"],       row: "b", col: 1 },
  { char: "ブ", romaji: ["bu"],       row: "b", col: 2 },
  { char: "ベ", romaji: ["be"],       row: "b", col: 3 },
  { char: "ボ", romaji: ["bo"],       row: "b", col: 4 },
  // ── 半濁音 Handakuten ─────────────────────────────────────────────────────
  { char: "パ", romaji: ["pa"],       row: "p", col: 0 },
  { char: "ピ", romaji: ["pi"],       row: "p", col: 1 },
  { char: "プ", romaji: ["pu"],       row: "p", col: 2 },
  { char: "ペ", romaji: ["pe"],       row: "p", col: 3 },
  { char: "ポ", romaji: ["po"],       row: "p", col: 4 },
];

// ── Chart builder — derived from row/col on each Kana entry ──────────────

export interface ChartRow {
  label: string;
  chars: (string | null)[];
}

const BASIC_ROW_ORDER    = ["", "k", "s", "t", "n", "h", "m", "y", "r", "w", "ん"];
const DAKUTEN_ROW_ORDER  = ["g", "z", "d", "b", "p"];

function buildChart(pool: Kana[], rowOrder: string[]): ChartRow[] {
  const grouped = new Map<string, Map<number, string>>();
  for (const k of pool) {
    if (!rowOrder.includes(k.row)) continue;
    if (!grouped.has(k.row)) grouped.set(k.row, new Map());
    grouped.get(k.row)!.set(k.col, k.char);
  }
  return rowOrder.map((row) => {
    const colMap = grouped.get(row) ?? new Map();
    return {
      label: row === "ん" ? "n" : row,
      chars: [0, 1, 2, 3, 4].map((c) => colMap.get(c) ?? null),
    };
  });
}

export function getBasicChart(pool: Kana[]): ChartRow[] {
  return buildChart(pool, BASIC_ROW_ORDER);
}

export function getDakutenChart(pool: Kana[]): ChartRow[] {
  return buildChart(pool, DAKUTEN_ROW_ORDER);
}

export const VOWELS = ["a", "i", "u", "e", "o"] as const;
