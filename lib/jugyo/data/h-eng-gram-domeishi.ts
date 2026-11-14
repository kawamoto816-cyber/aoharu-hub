import type { UnitBase } from "../types";

// 止まる授業：動名詞（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-domeishi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（to →「トゥー」、seeing →「シーイング」）。
// ダーウィン『種の起源』・オースティン『高慢と偏見』の引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-domeishi.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_DOMEISHI_BASE: UnitBase = {
  unitId: "h-eng-gram-domeishi",
  pauses: {
    "mistake:1": {
      question: "{seito}の「I'm looking forward to see you.」。正しいのはどちら？",
      choices: ["I'm looking forward to see you.", "I'm looking forward to seeing you."],
      answer: "I'm looking forward to seeing you.",
      why: "look forward to の to は前置詞なので、後ろは動名詞です。",
      say: {
        question: "{seito}の、アイム ルッキング フォワード トゥー シー ユー。正しいのはどちら？",
        choices: ["アイム ルッキング フォワード トゥー シー ユー", "アイム ルッキング フォワード トゥー シーイング ユー"],
        answer: "アイム ルッキング フォワード トゥー シーイング ユー",
        why: "ルック フォワード トゥーの、トゥーは、前置詞なので、うしろは、動名詞です。",
      },
    },
    "check:0": {
      question: "Would you mind ___ (open) the door?",
      choices: ["to open", "opening"],
      answer: "opening",
      why: "mind は動名詞だけを目的語にとる。",
      say: {
        question: "ウッド ユー マインド、空らん、オープン、ザ ドア？",
        choices: ["トゥー オープン", "オープニング"],
        answer: "オープニング",
        why: "マインドは、動名詞だけを、目的語にとる。",
      },
    },
    "mistake:3": {
      question: "{seito}の「I remember to visit this temple as a child.」。正しいのはどちら？",
      choices: ["I remember to visit this temple as a child.", "I remember visiting this temple as a child."],
      answer: "I remember visiting this temple as a child.",
      why: "子どものころに「訪れたこと」は過去なので -ing。to do は「忘れずに〜する」になります。",
      say: {
        question: "{seito}の、アイ リメンバー トゥー ビジット ディス テンプル アズ ア チャイルド。正しいのはどちら？",
        choices: ["アイ リメンバー トゥー ビジット ディス テンプル アズ ア チャイルド", "アイ リメンバー ビジティング ディス テンプル アズ ア チャイルド"],
        answer: "アイ リメンバー ビジティング ディス テンプル アズ ア チャイルド",
        why: "子どものころに、訪れたことは、過去なので、イング。トゥー ドゥーは、忘れずに、なになにする、になります。",
      },
    },
    "check:2": {
      question: "He is ashamed of ___ (be) lazy last year. の空所を2語で。",
      choices: ["being", "having been"],
      answer: "having been",
      why: "去年のことで、述語の is より前なので完了動名詞。",
      say: {
        question: "ヒー イズ アシェイムド オブ、空らん、ビー、レイジー ラスト イヤー。の、くうしょを、2語で。",
        choices: ["ビーイング", "ハビング ビーン"],
        answer: "ハビング ビーン",
        why: "去年のことで、述語のイズより、前なので、完了動名詞。",
      },
    },
  },
};
