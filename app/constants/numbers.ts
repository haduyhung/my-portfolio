import type { MinnaWord, MinnaLesson } from "./minna";

// Re-export for convenience
export type { MinnaWord, MinnaLesson };

export const NUMBERS_LESSONS: MinnaLesson[] = [
  // ─── Bài 1: Số cơ bản (0 – 万) ───────────────────────────────────────────
  {
    id: 1,
    key: "basic",
    words: [
      // 0–10
      { id: [1, 1],  edition: [1], kanji: null,     kana: "ゼロ",           romaji: "zero",          meaning: { vi: "0, không",               en: "0, zero",              fr: "0, zéro" } },
      { id: [1, 2],  edition: [1], kanji: "一",      kana: "いち",           romaji: "ichi",          meaning: { vi: "1, một",                 en: "1, one",               fr: "1, un" } },
      { id: [1, 3],  edition: [1], kanji: "二",      kana: "に",             romaji: "ni",            meaning: { vi: "2, hai",                 en: "2, two",               fr: "2, deux" } },
      { id: [1, 4],  edition: [1], kanji: "三",      kana: "さん",           romaji: "san",           meaning: { vi: "3, ba",                  en: "3, three",             fr: "3, trois" } },
      { id: [1, 5],  edition: [1], kanji: "四",      kana: "し・よん",       romaji: "shi / yon",     meaning: { vi: "4, bốn",                 en: "4, four",              fr: "4, quatre" } },
      { id: [1, 6],  edition: [1], kanji: "五",      kana: "ご",             romaji: "go",            meaning: { vi: "5, năm",                 en: "5, five",              fr: "5, cinq" } },
      { id: [1, 7],  edition: [1], kanji: "六",      kana: "ろく",           romaji: "roku",          meaning: { vi: "6, sáu",                 en: "6, six",               fr: "6, six" } },
      { id: [1, 8],  edition: [1], kanji: "七",      kana: "しち・なな",     romaji: "shichi / nana", meaning: { vi: "7, bảy",                 en: "7, seven",             fr: "7, sept" } },
      { id: [1, 9],  edition: [1], kanji: "八",      kana: "はち",           romaji: "hachi",         meaning: { vi: "8, tám",                 en: "8, eight",             fr: "8, huit" } },
      { id: [1, 10], edition: [1], kanji: "九",      kana: "く・きゅう",     romaji: "ku / kyuu",     meaning: { vi: "9, chín",                en: "9, nine",              fr: "9, neuf" } },
      { id: [1, 11], edition: [1], kanji: "十",      kana: "じゅう",         romaji: "juu",           meaning: { vi: "10, mười",               en: "10, ten",              fr: "10, dix" } },
      // 11–99
      { id: [1, 12], edition: [1], kanji: "十一",    kana: "じゅういち",     romaji: "juuichi",       meaning: { vi: "11",                     en: "11",                   fr: "11" } },
      { id: [1, 13], edition: [1], kanji: "十二",    kana: "じゅうに",       romaji: "juuni",         meaning: { vi: "12",                     en: "12",                   fr: "12" } },
      { id: [1, 14], edition: [1], kanji: "十三",    kana: "じゅうさん",     romaji: "juusan",        meaning: { vi: "13",                     en: "13",                   fr: "13" } },
      { id: [1, 15], edition: [1], kanji: "十四",    kana: "じゅうし・じゅうよん", romaji: "juushi / juuyon", meaning: { vi: "14",              en: "14",                   fr: "14" } },
      { id: [1, 16], edition: [1], kanji: "十五",    kana: "じゅうご",       romaji: "juugo",         meaning: { vi: "15",                     en: "15",                   fr: "15" } },
      { id: [1, 17], edition: [1], kanji: "二十",    kana: "にじゅう",       romaji: "nijuu",         meaning: { vi: "20",                     en: "20",                   fr: "20" } },
      { id: [1, 18], edition: [1], kanji: "三十",    kana: "さんじゅう",     romaji: "sanjuu",        meaning: { vi: "30",                     en: "30",                   fr: "30" } },
      { id: [1, 19], edition: [1], kanji: "四十",    kana: "よんじゅう",     romaji: "yonjuu",        meaning: { vi: "40",                     en: "40",                   fr: "40" } },
      { id: [1, 20], edition: [1], kanji: "五十",    kana: "ごじゅう",       romaji: "gojuu",         meaning: { vi: "50",                     en: "50",                   fr: "50" } },
      { id: [1, 21], edition: [1], kanji: "六十",    kana: "ろくじゅう",     romaji: "rokujuu",       meaning: { vi: "60",                     en: "60",                   fr: "60" } },
      { id: [1, 22], edition: [1], kanji: "七十",    kana: "ななじゅう",     romaji: "nanajuu",       meaning: { vi: "70",                     en: "70",                   fr: "70" } },
      { id: [1, 23], edition: [1], kanji: "八十",    kana: "はちじゅう",     romaji: "hachijuu",      meaning: { vi: "80",                     en: "80",                   fr: "80" } },
      { id: [1, 24], edition: [1], kanji: "九十",    kana: "きゅうじゅう",   romaji: "kyuujuu",       meaning: { vi: "90",                     en: "90",                   fr: "90" } },
      { id: [1, 25], edition: [1], kanji: "九十九",  kana: "きゅうじゅうく", romaji: "kyuujuuku",     meaning: { vi: "99",                     en: "99",                   fr: "99" } },
      // Trăm (100–999)
      { id: [1, 26], edition: [1], kanji: "百",      kana: "ひゃく",         romaji: "hyaku",         meaning: { vi: "100",                    en: "100",                  fr: "100" } },
      { id: [1, 27], edition: [1], kanji: "二百",    kana: "にひゃく",       romaji: "nihyaku",       meaning: { vi: "200",                    en: "200",                  fr: "200" } },
      { id: [1, 28], edition: [1], kanji: "三百",    kana: "さんびゃく",     romaji: "sanbyaku",      meaning: { vi: "300 ⚠ biến âm: びゃく",  en: "300 ⚠ irregular: びゃく", fr: "300 ⚠ irrégulier" } },
      { id: [1, 29], edition: [1], kanji: "四百",    kana: "よんひゃく",     romaji: "yonhyaku",      meaning: { vi: "400",                    en: "400",                  fr: "400" } },
      { id: [1, 30], edition: [1], kanji: "五百",    kana: "ごひゃく",       romaji: "gohyaku",       meaning: { vi: "500",                    en: "500",                  fr: "500" } },
      { id: [1, 31], edition: [1], kanji: "六百",    kana: "ろっぴゃく",     romaji: "roppyaku",      meaning: { vi: "600 ⚠ biến âm: ろっぴゃく", en: "600 ⚠ irregular", fr: "600 ⚠ irrégulier" } },
      { id: [1, 32], edition: [1], kanji: "七百",    kana: "ななひゃく",     romaji: "nanahyaku",     meaning: { vi: "700",                    en: "700",                  fr: "700" } },
      { id: [1, 33], edition: [1], kanji: "八百",    kana: "はっぴゃく",     romaji: "happyaku",      meaning: { vi: "800 ⚠ biến âm: はっぴゃく", en: "800 ⚠ irregular", fr: "800 ⚠ irrégulier" } },
      { id: [1, 34], edition: [1], kanji: "九百",    kana: "きゅうひゃく",   romaji: "kyuuhyaku",     meaning: { vi: "900",                    en: "900",                  fr: "900" } },
      // Nghìn & Vạn
      { id: [1, 35], edition: [1], kanji: "千",      kana: "せん",           romaji: "sen",           meaning: { vi: "1.000",                  en: "1,000",                fr: "1 000" } },
      { id: [1, 36], edition: [1], kanji: "二千",    kana: "にせん",         romaji: "nisen",         meaning: { vi: "2.000",                  en: "2,000",                fr: "2 000" } },
      { id: [1, 37], edition: [1], kanji: "三千",    kana: "さんぜん",       romaji: "sanzen",        meaning: { vi: "3.000 ⚠ biến âm: ぜん",  en: "3,000 ⚠ irregular: ぜん", fr: "3 000 ⚠ irrégulier" } },
      { id: [1, 38], edition: [1], kanji: "八千",    kana: "はっせん",       romaji: "hassen",        meaning: { vi: "8.000 ⚠ biến âm: はっせん", en: "8,000 ⚠ irregular", fr: "8 000 ⚠ irrégulier" } },
      { id: [1, 39], edition: [1], kanji: "一万",    kana: "いちまん",       romaji: "ichiman",       meaning: { vi: "10.000, một vạn",        en: "10,000",               fr: "10 000" } },
      { id: [1, 40], edition: [1], kanji: "十万",    kana: "じゅうまん",     romaji: "juuman",        meaning: { vi: "100.000, mười vạn",      en: "100,000",              fr: "100 000" } },
      { id: [1, 41], edition: [1], kanji: "百万",    kana: "ひゃくまん",     romaji: "hyakuman",      meaning: { vi: "1.000.000, một triệu",   en: "1,000,000",            fr: "1 000 000" } },
    ],
  },

  // ─── Bài 2: Đơn vị đếm (助数詞) ─────────────────────────────────────────
  {
    id: 2,
    key: "counters",
    words: [
      { id: [2, 1], edition: [1], kanji: "〜本", kana: "〜ほん", romaji: "~hon", meaning: { vi: "đếm vật dài (bút, chai, cây...)", en: "long/cylindrical objects (pens, bottles...)", fr: "objets longs (stylos, bouteilles...)" } },
      { id: [2, 2], edition: [1], kanji: "〜枚", kana: "〜まい", romaji: "~mai", meaning: { vi: "đếm vật phẳng (giấy, áo, đĩa...)", en: "flat/thin objects (papers, shirts...)", fr: "objets plats (papiers, chemises...)" } },
      { id: [2, 3], edition: [1], kanji: "〜個", kana: "〜こ", romaji: "~ko", meaning: { vi: "đếm vật nhỏ, hình cầu (trứng, táo...)", en: "small/round objects (eggs, apples...)", fr: "petits objets ronds (œufs, pommes...)" } },
      { id: [2, 4], edition: [1], kanji: "〜冊", kana: "〜さつ", romaji: "~satsu", meaning: { vi: "đếm sách, tập vở", en: "books, notebooks", fr: "livres, cahiers" } },
      { id: [2, 5], edition: [1], kanji: "〜匹", kana: "〜ひき", romaji: "~hiki", meaning: { vi: "đếm động vật nhỏ (mèo, cá, côn trùng...)", en: "small animals (cats, fish, insects...)", fr: "petits animaux (chats, poissons...)" } },
      { id: [2, 6], edition: [1], kanji: "〜頭", kana: "〜とう", romaji: "~tou", meaning: { vi: "đếm động vật lớn (bò, ngựa, voi...)", en: "large animals (cows, horses, elephants...)", fr: "grands animaux (vaches, chevaux...)" } },
      { id: [2, 7], edition: [1], kanji: "〜台", kana: "〜だい", romaji: "~dai", meaning: { vi: "đếm máy móc, xe cộ (xe, máy tính...)", en: "machines, vehicles (cars, computers...)", fr: "machines, véhicules" } },
      { id: [2, 8], edition: [1], kanji: "〜杯", kana: "〜はい", romaji: "~hai", meaning: { vi: "đếm chén, ly, bát (cốc nước, tô cơm...)", en: "cups, bowls (glasses, rice bowls...)", fr: "tasses, bols" } },
      { id: [2, 9], edition: [1], kanji: "〜人", kana: "〜にん・り", romaji: "~nin / ~ri", meaning: { vi: "đếm người (ひとり=1 người, ふたり=2 người)", en: "people (ひとり=1, ふたり=2 are irregular)", fr: "personnes (ひとり, ふたり irréguliers)" } },
    ],
  },

  // ─── Bài 3: Số thuần Nhật (和語数詞) ─────────────────────────────────────
  {
    id: 3,
    key: "native",
    words: [
      { id: [3, 1],  edition: [1], kanji: null, kana: "ひとつ",   romaji: "hitotsu",   meaning: { vi: "1 cái, một (vật)", en: "1 (general counter)", fr: "1 (compteur général)" } },
      { id: [3, 2],  edition: [1], kanji: null, kana: "ふたつ",   romaji: "futatsu",   meaning: { vi: "2 cái, hai (vật)", en: "2 (general counter)", fr: "2 (compteur général)" } },
      { id: [3, 3],  edition: [1], kanji: null, kana: "みっつ",   romaji: "mittsu",    meaning: { vi: "3 cái, ba (vật)",  en: "3 (general counter)", fr: "3 (compteur général)" } },
      { id: [3, 4],  edition: [1], kanji: null, kana: "よっつ",   romaji: "yottsu",    meaning: { vi: "4 cái, bốn (vật)", en: "4 (general counter)", fr: "4 (compteur général)" } },
      { id: [3, 5],  edition: [1], kanji: null, kana: "いつつ",   romaji: "itsutsu",   meaning: { vi: "5 cái, năm (vật)", en: "5 (general counter)", fr: "5 (compteur général)" } },
      { id: [3, 6],  edition: [1], kanji: null, kana: "むっつ",   romaji: "muttsu",    meaning: { vi: "6 cái, sáu (vật)", en: "6 (general counter)", fr: "6 (compteur général)" } },
      { id: [3, 7],  edition: [1], kanji: null, kana: "ななつ",   romaji: "nanatsu",   meaning: { vi: "7 cái, bảy (vật)", en: "7 (general counter)", fr: "7 (compteur général)" } },
      { id: [3, 8],  edition: [1], kanji: null, kana: "やっつ",   romaji: "yattsu",    meaning: { vi: "8 cái, tám (vật)", en: "8 (general counter)", fr: "8 (compteur général)" } },
      { id: [3, 9],  edition: [1], kanji: null, kana: "ここのつ", romaji: "kokonotsu", meaning: { vi: "9 cái, chín (vật)", en: "9 (general counter)", fr: "9 (compteur général)" } },
      { id: [3, 10], edition: [1], kanji: null, kana: "とお",     romaji: "too",       meaning: { vi: "10 cái, mười (vật)", en: "10 (general counter)", fr: "10 (compteur général)" } },
    ],
  },
];

export const NUMBERS_LESSON_LABELS: Record<number, string> = {
  1: "Số cơ bản",
  2: "Đơn vị đếm",
  3: "Số thuần Nhật",
};

/** Section headers for grouped lessons (lessonId → ordered sections by word count) */
export interface NumbersSection {
  label: string;
  wordCount: number;
}

export const NUMBERS_SECTIONS: Record<number, NumbersSection[]> = {
  1: [
    { label: "0 – 10",            wordCount: 11 },
    { label: "11 – 99",           wordCount: 14 },
    { label: "Trăm (100–999)",    wordCount:  9 },
    { label: "Nghìn & Vạn",       wordCount:  7 },
  ],
};

export function getNumbersLesson(id: number): MinnaLesson | undefined {
  return NUMBERS_LESSONS.find((l) => l.id === id);
}
