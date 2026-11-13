import type { UnitBase } from "../types";

// 止まる授業：文型（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-bunkei.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 Call me Ishmael. →「コール ミー イシュメール」）。S・V・O・C・M も say で開く。
// せりふはキャストごと：h-eng-gram-bunkei.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_BUNKEI_BASE: UnitBase = {
  unitId: "h-eng-gram-bunkei",
  pauses: {
    "mistake:1": {
      question: "{seito}の「I went to the station. を第3文型と考える」。正しいのはどちら？",
      choices: ["I went to the station. を第3文型と考える", "第1文型（to the station は M）"],
      answer: "第1文型（to the station は M）",
      why: "「前置詞＋名詞」は修飾語で、目的語ではありません。go の後ろに O はありません。",
      say: {
        question: "{seito}の、アイ ウェント トゥー ザ ステーションを、第3文型と考える。正しいのはどちら？",
        choices: ["アイ ウェント トゥー ザ ステーションを、第3文型と考える", "第1文型。トゥー ザ ステーションわ、エム"],
        answer: "第1文型。トゥー ザ ステーションわ、エム",
        why: "前置詞、たす、名詞は、修飾語で、目的語では、ありません。ゴーのうしろに、オーは、ありません。",
      },
    },
    "mistake:0": {
      question: "{seito}の「She looks happily.」。正しいのはどちら？",
      choices: ["She looks happily.", "She looks happy."],
      answer: "She looks happy.",
      why: "look（〜に見える）は第2文型をつくり、C には形容詞が入ります。副詞は C になれません。",
      say: {
        question: "{seito}の、シー ルックス ハッピリー。正しいのはどちら？",
        choices: ["シー ルックス ハッピリー", "シー ルックス ハッピー"],
        answer: "シー ルックス ハッピー",
        why: "ルック、に見える、は、第2文型をつくり、シーには、形容詞が入ります。副詞は、シーになれません。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I bought a present to my sister.」。正しいのはどちら？",
      choices: ["I bought a present to my sister.", "I bought a present for my sister."],
      answer: "I bought a present for my sister.",
      why: "buy は「相手のために買ってあげる」動作なので for を使います。",
      say: {
        question: "{seito}の、アイ ボート ア プレゼント トゥー マイ シスター。正しいのはどちら？",
        choices: ["アイ ボート ア プレゼント トゥー マイ シスター", "アイ ボート ア プレゼント フォー マイ シスター"],
        answer: "アイ ボート ア プレゼント フォー マイ シスター",
        why: "バイは、相手のために、買ってあげる動作なので、フォーを使います。",
      },
    },
    "check:0": {
      question: "Kenji painted the fence white. の文型は？",
      choices: ["第3文型（SVO）", "第4文型（SVOO）", "第5文型（SVOC）"],
      answer: "第5文型（SVOC）",
      why: "the fence＝white の関係があるので、white は C。",
      say: {
        question: "ケンジ ペインテッド ザ フェンス ホワイト。の文型は？",
        choices: ["第3文型。エス ブイ オー", "第4文型。エス ブイ オー オー", "第5文型。エス ブイ オー シー"],
        answer: "第5文型。エス ブイ オー シー",
        why: "ザ フェンス、イコール、ホワイトの関係があるので、ホワイトは、シー。",
      },
    },
  },
};
