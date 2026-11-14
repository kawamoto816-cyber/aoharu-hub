import type { UnitBase } from "../types";

// 止まる授業：会話表現（高校・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-vocab-kaiwa.ts の本文だけ。
// 英語は日本語の声で読むので、say ではカタカナに開く（Could you →「クッジュー」、mind →「マインド」、No, not at all. →「ノー、ノット・アット・オール」）。「〜」は「なになに」。
// 『真面目が肝心』のせりふは lecture にある英文・訳だけを使い、新しいせりふは作らない。
// せりふはキャストごと：h-eng-vocab-kaiwa.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。
// 答え（answer）は lecture の文のまま、読みは say.answer で直す。check:0 は選択肢なし（言ってみてから答えを見る）。

export const H_VOCAB_KAIWA_BASE: UnitBase = {
  unitId: "h-eng-vocab-kaiwa",
  pauses: {
    "mistake:1": {
      question: "{seito}の「Do you mind if I open the window? — Yes, sure.（どうぞ、のつもり）」。正しいのはどちら？",
      choices: ["Do you mind if I open the window? — Yes, sure.（どうぞ、のつもり）", "No, not at all."],
      answer: "No, not at all.",
      why: "mind は「いやだと思う」。OK するときは No（いやではない）と答えます。",
      say: {
        question: "{seito}の、どうぞ、のつもりで、ドゥー・ユー・マインド・イフ・アイ・オープン・ザ・ウィンドウ？　イエス、シュア。正しいのはどちら？",
        choices: ["どうぞ、のつもりで、ドゥー・ユー・マインド・イフ・アイ・オープン・ザ・ウィンドウ？　イエス、シュア", "ノー、ノット・アット・オール"],
        answer: "ノー、ノット・アット・オール",
        why: "マインドは、いやだと思う。オーケーするときは、ノー、いやではない、と答えます。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Why don't you join us? →「なぜ参加しないの？」と責められていると思う」。正しいのはどちら？",
      choices: ["Why don't you join us? →「なぜ参加しないの？」と責められていると思う", "「いっしょにやりませんか」という誘い"],
      answer: "「いっしょにやりませんか」という誘い",
      why: "Why don't you 〜? は相手への提案・誘いの決まった言い方です。",
      say: {
        question: "{seito}の、ホワイ・ドント・ユー・ジョイン・アス？は、なぜ参加しないの？と責められていると思う。正しいのはどちら？",
        choices: ["ホワイ・ドント・ユー・ジョイン・アス？は、なぜ参加しないの？と責められていると思う", "いっしょにやりませんか、という誘い"],
        why: "ホワイ・ドント・ユー、なになに？は、相手への提案、誘いの、決まった言い方です。",
      },
    },
    "check:0": {
      question: "「（私が）荷物を持ちましょうか」を Shall で始めて言いましょう。",
      answer: "Shall I carry your bag?",
      why: "Shall I 〜? は「私が〜しましょうか」という申し出。",
      say: {
        question: "わたしが、荷物を持ちましょうか、を、シャルで始めて言いましょう。",
        answer: "シャル・アイ・キャリー・ユア・バッグ？",
        why: "シャル・アイ、なになに？は、わたしが、なになにしましょうか、という申し出。",
      },
    },
  },
};
