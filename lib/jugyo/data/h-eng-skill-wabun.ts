import type { UnitBase } from "../types";

// 止まる授業：和文英訳は、まず「英語にしやすい日本語」に直す（高校・英語）の共通の骨組み（問題）。事実・例文・人名・年・数は lib/lecture/data/h-eng-skill-wabun.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 It rained yesterday. →「イット レインド イエスタデイ」）。引く英文は lecture にある部分だけ。
// 名著の英文（新渡戸稲造・岡倉天心・ハーン）は lecture にある一節だけを短く。実在の人に新しいせりふを言わせない。
// 答え（answer）は lecture の文のまま、読みは say.answer で直す。
// せりふはキャストごと：h-eng-skill-wabun.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。
// 和英辞典（わえいじてん）・芳一（ほういち）・三単現（さんたんげん）は say で開く。年の「年」は「ねん」。

export const H_WABUN_BASE: UnitBase = {
  unitId: "h-eng-skill-wabun",
  pauses: {
    "check:2": {
      question: "和文英訳で、英語にする前に日本語を直す作業を何という？",
      choices: ["和文和訳", "英文和訳", "直訳"],
      answer: "和文和訳",
      why: "主語を補い、英語にしやすい日本語に直す。",
      say: {
        question: "和文英訳で、英語にする前に、日本語を直す作業を、なんという？",
        why: "主語を補い、英語にしやすい、日本語に、直す。",
      },
    },
    "mistake:1": {
      question: "{seito}の「昨日は雨だった」→ Yesterday was rain.。正しいのはどちら？",
      choices: ["「昨日は雨だった」→ Yesterday was rain.", "It rained yesterday. / It was rainy yesterday."],
      answer: "It rained yesterday. / It was rainy yesterday.",
      why: "天気は It を主語にするのが基本です。rain は名詞なら「雨」そのものなので、Yesterday とイコールにはなりません。",
      say: {
        question: "{seito}の、昨日は、雨だった、を、イエスタデイ ワズ レイン。正しいのはどちら？",
        choices: ["昨日は、雨だった、を、イエスタデイ ワズ レイン", "イット レインド イエスタデイ。イット ワズ レイニー イエスタデイ"],
        answer: "イット レインド イエスタデイ。イット ワズ レイニー イエスタデイ",
        why: "天気は、イットを、主語にするのが、基本です。レインは、名詞なら、雨、そのものなので、イエスタデイと、イコールには、なりません。",
      },
    },
    "mistake:3": {
      question: "{seito}の「日本にしかない物をローマ字だけで書く（I ate onigiri.）」。正しいのはどちら？",
      choices: ["日本にしかない物をローマ字だけで書く（I ate onigiri.）", "最初の1回は説明を添える（I ate onigiri, or rice balls.）"],
      answer: "最初の1回は説明を添える（I ate onigiri, or rice balls.）",
      why: "ローマ字だけでは、日本語を知らない読み手には何のことかわかりません。or やコンマで説明を添えれば、2回目からはローマ字だけで通じます。",
      say: {
        question: "{seito}の、にほんにしかない、ものを、ローマ字だけで書く、アイ エイト おにぎり。正しいのはどちら？",
        choices: ["にほんにしかない、ものを、ローマ字だけで書く、アイ エイト おにぎり", "最初のいっかいは、説明を添える、アイ エイト おにぎり、オア ライス ボールズ"],
        answer: "最初のいっかいは、説明を添える、アイ エイト おにぎり、オア ライス ボールズ",
        why: "ローマ字だけでは、日本語を知らない、読みてには、なんのことか、わかりません。オアや、コンマで、説明を添えれば、2回目からは、ローマ字だけで、つうじます。",
      },
    },
    "check:1": {
      question: "「彼女は毎朝走っている」を英語にするとき、動詞の形で気をつけることは？",
      answer: "三単現の s をつけて runs にする（She runs every morning.）",
      why: "主語が she で、毎朝の習慣なので現在形。",
      say: {
        question: "彼女は、毎朝、走っている、を、英語にするとき、動詞のかたちで、きをつけることは？",
        answer: "さんたんげんの、エスをつけて、ランズにする。シー ランズ エブリ モーニング",
        why: "主語が、シーで、毎朝の、習慣なので、現在形。",
      },
    },
  },
};
