import type { UnitBase } from "../types";

// 止まる授業：仮定法（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-kateiho.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 were →「ワー」、would have caught →「ウッド ハヴ コート」）。
// 『嵐が丘』とキーツの手紙の引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-kateiho.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const KATEIHO_BASE: UnitBase = {
  unitId: "h-eng-gram-kateiho",
  pauses: {
    "mistake:0": {
      question: "{seito}の「If I am you, I would wait.」。正しいのはどちら？",
      choices: ["If I am you, I would wait.", "If I were you, I would wait."],
      answer: "If I were you, I would wait.",
      why: "今の事実とちがう仮定なので、if 節は過去形。be動詞は were を使います。",
      say: {
        question: "{seito}の、イフ アイ アム ユー、アイ ウッド ウェイト。正しいのはどちら？",
        choices: ["イフ アイ アム ユー、アイ ウッド ウェイト", "イフ アイ ワー ユー、アイ ウッド ウェイト"],
        answer: "イフ アイ ワー ユー、アイ ウッド ウェイト",
        why: "いまの事実とちがう仮定なので、イフせつは、過去形。ビー動詞は、ワーを使います。",
      },
    },
    "check:1": {
      question: "If you had left earlier, you ___ (catch) the train.",
      answer: "would have caught",
      why: "if 節が had ＋過去分詞で過去の仮定。主節は would have ＋過去分詞。",
      say: {
        question: "イフ ユー ハッド レフト アーリアー、ユー、空らん、キャッチ、ザ トレイン。",
        answer: "ウッド ハヴ コート",
        why: "イフせつが、ハッド、たす、過去分詞で、過去の仮定。主節は、ウッド ハヴ、たす、過去分詞。",
      },
    },
    "mistake:3": {
      question: "{seito}の考え「if I had had time の had had を誤植だと思って had にする」。正しいのはどちら？",
      choices: ["if I had had time の had had を誤植だと思って had にする", "if I had had time（時間があったなら）"],
      answer: "if I had had time（時間があったなら）",
      why: "have（持つ）の過去完了は had had。過去の事実の反対なので、仮定法過去完了で had が2つ並びます。",
      say: {
        question: "{seito}の考え。イフ アイ ハッド ハッド タイムの、ハッド ハッドを、誤植だと思って、ハッドにする。正しいのはどちら？",
        choices: ["イフ アイ ハッド ハッド タイムの、ハッド ハッドを、誤植だと思って、ハッドにする", "イフ アイ ハッド ハッド タイム。時間があったなら"],
        answer: "イフ アイ ハッド ハッド タイム。時間があったなら",
        why: "ハヴ、持つ、の過去完了は、ハッド ハッド。過去の事実の反対なので、仮定法過去完了で、ハッドが2つ並びます。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I wish I can swim.」。正しいのはどちら？",
      choices: ["I wish I can swim.", "I wish I could swim."],
      answer: "I wish I could swim.",
      why: "I wish のあとは仮定法。今の願望は can を過去形 could にします。",
      say: {
        question: "{seito}の、アイ ウィッシュ アイ キャン スウィム。正しいのはどちら？",
        choices: ["アイ ウィッシュ アイ キャン スウィム", "アイ ウィッシュ アイ クッド スウィム"],
        answer: "アイ ウィッシュ アイ クッド スウィム",
        why: "アイ ウィッシュのあとは、仮定法。いまの願望は、キャンを、過去形の、クッドにします。",
      },
    },
  },
};
