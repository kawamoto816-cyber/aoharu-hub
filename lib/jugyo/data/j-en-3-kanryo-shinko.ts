import type { UnitBase } from "../types";

// 止まる授業：現在完了進行形（中3・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-3-kanryo-shinko.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 have been waiting →「ハブ ビーン ウェイティング」）。答え（answer）は lecture の文のまま、読みは say.answer で直す。
// 「リップ・ヴァン・ウィンクル」の英文は本文にある部分だけを引き、登場人物のせりふは作らない。
// せりふはキャストごと：j-en-3-kanryo-shinko.j-dark.ts（ダーク解説）・j-en-3-kanryo-shinko.j-kisaku.ts（気さくな兄・姉）。

export const J_KANRYO_SHINKO_BASE: UnitBase = {
  unitId: "j-en-3-kanryo-shinko",
  pauses: {
    "mistake:3": {
      question: "{seito}の「I have been study for two hours.」。正しいのはどちら？",
      choices: ["I have been study for two hours.", "I have been studying for two hours."],
      answer: "I have been studying for two hours.",
      why: "been のあとは動詞の ing 形です。",
      say: {
        question: "{seito}の、アイ ハブ ビーン スタディ フォー トゥー アワーズ。正しいのはどちら？",
        choices: ["アイ ハブ ビーン スタディ フォー トゥー アワーズ", "アイ ハブ ビーン スタディイング フォー トゥー アワーズ"],
        answer: "アイ ハブ ビーン スタディイング フォー トゥー アワーズ",
        why: "ビーンのあとわ、動詞の、イングけいです。",
      },
    },
    "check:1": {
      question: "「どのくらい（の間）テレビを見ているの？」を英語にしましょう。",
      choices: ["How long are you watching TV?", "How long have you been watching TV?"],
      answer: "How long have you been watching TV?",
      why: "長さは How long。watch は動作の動詞なので have been ＋ ing。",
      say: {
        question: "どのくらいの、あいだ、テレビを見ているの？　を、英語にしましょう。",
        choices: ["ハウ ロング アー ユー ウォッチング ティーブイ", "ハウ ロング ハブ ユー ビーン ウォッチング ティーブイ"],
        answer: "ハウ ロング ハブ ユー ビーン ウォッチング ティーブイ",
        why: "長さわ、ハウ ロング。ウォッチわ、動作の動詞なので、ハブ ビーン たす イング。",
      },
    },
    "mistake:0": {
      question: "{seito}の「I have been knowing him for five years.」。正しいのはどちら？",
      choices: ["I have been knowing him for five years.", "I have known him for five years."],
      answer: "I have known him for five years.",
      why: "know は状態を表す動詞なので進行形にせず、have＋過去分詞を使います。",
      say: {
        question: "{seito}の、アイ ハブ ビーン ノウイング ヒム フォー ファイブ イヤーズ。正しいのはどちら？",
        choices: ["アイ ハブ ビーン ノウイング ヒム フォー ファイブ イヤーズ", "アイ ハブ ノウン ヒム フォー ファイブ イヤーズ"],
        answer: "アイ ハブ ノウン ヒム フォー ファイブ イヤーズ",
        why: "ノウわ、状態を表す動詞なので、しんこうけいにせず、ハブ たす 過去分詞を、使います。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I am waiting for an hour.」。正しいのはどちら？",
      choices: ["I am waiting for an hour.", "I have been waiting for an hour."],
      answer: "I have been waiting for an hour.",
      why: "for an hour（1時間ずっと）と長さを言うときは、現在完了進行形にします。",
      say: {
        question: "{seito}の、アイ アム ウェイティング フォー アン アワー。正しいのはどちら？",
        choices: ["アイ アム ウェイティング フォー アン アワー", "アイ ハブ ビーン ウェイティング フォー アン アワー"],
        answer: "アイ ハブ ビーン ウェイティング フォー アン アワー",
        why: "フォー アン アワー、いちじかん、ずっと、と、長さを言うときわ、現在完了しんこうけいにします。",
      },
    },
  },
};
