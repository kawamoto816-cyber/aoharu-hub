import type { UnitBase } from "../types";

// 止まる授業：分詞の後置修飾（中3・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-3-bunshi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 dancing in the breeze →「ダンシング イン ザ ブリーズ」）。
// ワーズワース・ブレイクの詩、ケネディの演説の英文は本文にある部分だけを引き、実在の人物のせりふは作らない。
// せりふはキャストごと：j-en-3-bunshi.j-dark.ts（ダーク解説）・j-en-3-bunshi.j-kisaku.ts（気さくな兄・姉）。

export const J_BUNSHI3_BASE: UnitBase = {
  unitId: "j-en-3-bunshi",
  pauses: {
    "check:2": {
      question: "a (crying) baby と a baby (crying) in the room、正しいのはどちら？",
      choices: ["a crying baby だけ", "a baby crying in the room だけ", "両方とも正しい"],
      answer: "両方とも正しい",
      why: "1語なら名詞の前、in the room がつくと名詞のうしろ。",
      say: {
        question: "ア クライング ベイビーと、ア ベイビー クライング イン ザ ルーム。正しいのはどちら？",
        choices: ["ア クライング ベイビーだけ", "ア ベイビー クライング イン ザ ルームだけ", "両方とも正しい"],
        why: "1語なら、名詞のまえ。イン ザ ルームがつくと、名詞のうしろ。",
      },
    },
    "mistake:0": {
      question: "{seito}の「Look at the sleeping on the bench cat.」。正しいのはどちら？",
      choices: ["Look at the sleeping on the bench cat.", "Look at the cat sleeping on the bench."],
      answer: "Look at the cat sleeping on the bench.",
      why: "語句がついて2語以上になった分詞は、名詞のうしろに置きます。",
      say: {
        question: "{seito}の、ルック アット ザ スリーピング オン ザ ベンチ キャット。正しいのはどちら？",
        choices: ["ルック アット ザ スリーピング オン ザ ベンチ キャット", "ルック アット ザ キャット スリーピング オン ザ ベンチ"],
        answer: "ルック アット ザ キャット スリーピング オン ザ ベンチ",
        why: "語句がついて、2語以上になった分詞は、名詞のうしろに置きます。",
      },
    },
    "mistake:1": {
      question: "{seito}の「This is a book writing by Soseki.」。正しいのはどちら？",
      choices: ["This is a book writing by Soseki.", "This is a book written by Soseki."],
      answer: "This is a book written by Soseki.",
      why: "本は「書かれる側」なので過去分詞 written を使います。",
      say: {
        question: "{seito}の、ディス イズ ア ブック ライティング バイ ソウセキ。正しいのはどちら？",
        choices: ["ディス イズ ア ブック ライティング バイ ソウセキ", "ディス イズ ア ブック リトゥン バイ ソウセキ"],
        answer: "ディス イズ ア ブック リトゥン バイ ソウセキ",
        why: "本は、書かれるがわ、なので、過去分詞の、リトゥンを使います。",
      },
    },
    "mistake:2": {
      question: "{seito}の「The boy playing tennis are my brother.」。正しいのはどちら？",
      choices: ["The boy playing tennis are my brother.", "The boy playing tennis is my brother."],
      answer: "The boy playing tennis is my brother.",
      why: "主語は the boy（1人）。tennis につられて動詞の形をまちがえないこと。",
      say: {
        question: "{seito}の、ザ ボーイ プレイング テニス アー マイ ブラザー。正しいのはどちら？",
        choices: ["ザ ボーイ プレイング テニス アー マイ ブラザー", "ザ ボーイ プレイング テニス イズ マイ ブラザー"],
        answer: "ザ ボーイ プレイング テニス イズ マイ ブラザー",
        why: "主語は、ザ ボーイ。ひとり。テニスにつられて、動詞のかたちを、まちがえないこと。",
      },
    },
  },
};
