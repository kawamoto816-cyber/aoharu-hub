import type { UnitBase } from "../types";

// 止まる授業：過去形（中1・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-1-kakokei.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 He went to school. →「ヒー ウェント トゥ スクール」）。童謡・小説の英文は引かず、作者や作中の人物のせりふは作らない。
// せりふはキャストごと：j-en-1-kakokei.j-dark.ts（ダーク解説）・j-en-1-kakokei.j-kisaku.ts（気さくな兄・姉）。

export const J_KAKOKEI_BASE: UnitBase = {
  unitId: "j-en-1-kakokei",
  pauses: {
    "check:0": {
      question: "I (study) math last night. の（ ）を正しい形に。",
      choices: ["studyed", "studied"],
      answer: "studied",
      why: "last night があるので過去形。子音字＋y は y を i にかえて -ed。",
      say: {
        question: "アイ、かっこ、スタディ、マス ラスト ナイト。かっこのなかを、正しいかたちに。",
        choices: ["スタディ、ワイ、イー、ディー", "スタディード、アイ、イー、ディー"],
        answer: "スタディード",
        why: "ラスト ナイトがあるので、過去形。子音字たす、ワイは、ワイを、アイにかえて、イーディー。",
      },
    },
    "mistake:3": {
      question: "{seito}の「He goed to school.」。正しいのはどちら？",
      choices: ["He goed to school.", "He went to school."],
      answer: "He went to school.",
      why: "go は不規則動詞で、過去形は went です。",
      say: {
        question: "{seito}の、ヒー ゴウド トゥ スクール。正しいのはどちら？",
        choices: ["ヒー ゴウド トゥ スクール", "ヒー ウェント トゥ スクール"],
        answer: "ヒー ウェント トゥ スクール",
        why: "ゴウは、不規則動詞で、過去形は、ウェントです。",
      },
    },
    "mistake:0": {
      question: "{seito}の「Did you went to the park?」。正しいのはどちら？",
      choices: ["Did you went to the park?", "Did you go to the park?"],
      answer: "Did you go to the park?",
      why: "did を使ったら、あとの動詞は原形にもどします。",
      say: {
        question: "{seito}の、ディッド ユー ウェント トゥ ザ パーク？ 正しいのはどちら？",
        choices: ["ディッド ユー ウェント トゥ ザ パーク", "ディッド ユー ゴウ トゥ ザ パーク"],
        answer: "ディッド ユー ゴウ トゥ ザ パーク",
        why: "ディッドを使ったら、あとの動詞は、原形にもどします。",
      },
    },
    "check:2": {
      question: "They ___ in Osaka two years ago. の ___ に入る be動詞は？",
      choices: ["was", "were"],
      answer: "were",
      why: "two years ago で過去。主語 they は複数なので were。",
      say: {
        question: "ゼイ、なにか、イン オオサカ トゥー イヤーズ アゴウ。なにかに入る、ビー動詞は？",
        choices: ["ワズ", "ワー"],
        answer: "ワー",
        why: "トゥー イヤーズ アゴウで、過去。主語のゼイは、複数なので、ワー。",
      },
    },
  },
};
