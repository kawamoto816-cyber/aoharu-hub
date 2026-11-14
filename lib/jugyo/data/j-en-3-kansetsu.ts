import type { UnitBase } from "../types";

// 止まる授業：間接疑問文（中3・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-3-kansetsu.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 where he lives →「ウェア ヒー リブズ」）。答え（answer）は lecture の文のまま、読みは say.answer で直す。
// ホームズ物語の英文は本文にある部分だけを引き、登場人物のせりふは作らない。
// せりふはキャストごと：j-en-3-kansetsu.j-dark.ts（ダーク解説）・j-en-3-kansetsu.j-kisaku.ts（気さくな兄・姉）。

export const J_KANSETSU_BASE: UnitBase = {
  unitId: "j-en-3-kansetsu",
  pauses: {
    "mistake:0": {
      question: "{seito}の「I know where does he live.」。正しいのはどちら？",
      choices: ["I know where does he live.", "I know where he lives."],
      answer: "I know where he lives.",
      why: "間接疑問では does を使わず、主語＋動詞の語順にして動詞に s をつけます。",
      say: {
        question: "{seito}の、アイ ノウ ウェア ダズ ヒー リブ。正しいのはどちら？",
        choices: ["アイ ノウ ウェア ダズ ヒー リブ", "アイ ノウ ウェア ヒー リブズ"],
        answer: "アイ ノウ ウェア ヒー リブズ",
        why: "間接疑問でわ、ダズを使わず、主語たす動詞の、語順にして、動詞に、エスを、つけます。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Tell me when did you get up.」。正しいのはどちら？",
      choices: ["Tell me when did you get up.", "Tell me when you got up."],
      answer: "Tell me when you got up.",
      why: "did が消えるので、動詞を過去形 got にして時を表します。",
      say: {
        question: "{seito}の、テル ミー ウェン ディッド ユー ゲット アップ。正しいのはどちら？",
        choices: ["テル ミー ウェン ディッド ユー ゲット アップ", "テル ミー ウェン ユー ガット アップ"],
        answer: "テル ミー ウェン ユー ガット アップ",
        why: "ディッドが、消えるので、動詞を、かこけいの、ガットにして、ときを、表します。",
      },
    },
    "check:1": {
      question: "Who broke the window? を Do you know に続けると？",
      answer: "Do you know who broke the window?",
      why: "who が主語なので語順はそのまま。",
      say: {
        question: "フー ブローク ザ ウィンドウ、を、ドゥ ユー ノウに、続けると？",
        answer: "ドゥ ユー ノウ フー ブローク ザ ウィンドウ",
        why: "フーが、主語なので、語順わ、そのまま。",
      },
    },
    "check:2": {
      question: "Where is the station? を Do you know に続けると？",
      choices: ["Do you know where is the station?", "Do you know where the station is?"],
      answer: "Do you know where the station is?",
      why: "be動詞 is を主語 the station のうしろへ。",
      say: {
        question: "ウェア イズ ザ ステーション、を、ドゥ ユー ノウに、続けると？",
        choices: ["ドゥ ユー ノウ ウェア イズ ザ ステーション", "ドゥ ユー ノウ ウェア ザ ステーション イズ"],
        answer: "ドゥ ユー ノウ ウェア ザ ステーション イズ",
        why: "ビー動詞の、イズを、主語、ザ ステーションの、うしろへ。",
      },
    },
  },
};
