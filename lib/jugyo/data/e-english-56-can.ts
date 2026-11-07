import type { UnitBase } from "../types";

// 止まる授業：できること（can）（小5・6外国語）の共通の骨組み（問題）。事実・例文・年は lib/lecture/data/e-english-56-can.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I can play soccer. →「アイ キャン プレイ サッカー」、the →「ザ」、s →「エス」）。
// マザーグースの歌は本文にあるが、歌の文句そのものは読み上げず、can を足した文（本文にある Jack can jump over the candlestick.）だけを使う。
// せりふはキャストごと：e-english-56-can.e-pop.ts（ポップ掛け合い）・e-english-56-can.e-yasashi.ts（やさしい先生と生徒）。
// 読み：「形」「後ろ」「人」は say でひらがなに開く（かたち・うしろ・ひと）。

export const CAN_BASE: UnitBase = {
  unitId: "e-english-56-can",
  pauses: {
    "check:0": {
      question: "I can ride a unicycle. を「できない」の文《ぶん》にしましょう。",
      choices: ["I can't ride a unicycle.", "I don't ride a unicycle."],
      answer: "I can't ride a unicycle.",
      why: "can を can't（cannot）にかえる。",
      say: {
        question: "アイ キャン ライド ア ユーニサイクル。を、できない、の文にしましょう。",
        choices: ["アイ キャント ライド ア ユーニサイクル", "アイ ドント ライド ア ユーニサイクル"],
        answer: "アイ キャント ライド ア ユーニサイクル",
        why: "キャンを、キャント、キャノットに、かえる。",
      },
    },
    "mistake:3": {
      question: "{seito}の答《こた》え。Can you jump high? と聞《き》かれたら、どう答《こた》える？",
      choices: ["Can you jump high? — Yes, I do.", "Yes, I can."],
      answer: "Yes, I can.",
      why: "Can でたずねられたら can で答えます。",
      say: {
        question: "{seito}の答え。キャン ユー ジャンプ ハイ？　と聞かれたら、どう答える？",
        choices: ["キャン ユー ジャンプ ハイ？　イエス、アイ ドゥー", "イエス、アイ キャン"],
        answer: "イエス、アイ キャン",
        why: "キャンで、たずねられたら、キャンで答えます。",
      },
    },
    "mistake:0": {
      question: "{seito}の言《い》ったこと。正《ただ》しいのはどちら？",
      choices: ["She can plays tennis.", "She can play tennis."],
      answer: "She can play tennis.",
      why: "can の後ろの動作の言葉は、主語が she でももとの形のままです。",
      say: {
        choices: ["シー キャン プレイズ テニス", "シー キャン プレイ テニス"],
        answer: "シー キャン プレイ テニス",
        why: "キャンの、うしろの、動作の言葉は、主語が、シーでも、もとのかたちのままです。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》ったこと。「サッカーができる」は、どちら？",
      choices: ["I can soccer.", "I can play soccer."],
      answer: "I can play soccer.",
      why: "can のすぐ後ろには「する」にあたる動作の言葉が必要です。",
      say: {
        choices: ["アイ キャン サッカー", "アイ キャン プレイ サッカー"],
        answer: "アイ キャン プレイ サッカー",
        why: "キャンの、すぐうしろには、する、にあたる、動作の言葉が、必要です。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。「野球《やきゅう》ができる」は、どちら？",
      choices: ["I can play the baseball.", "I can play baseball."],
      answer: "I can play baseball.",
      why: "スポーツには the をつけません。the をつけるのは楽器です。",
      say: {
        choices: ["アイ キャン プレイ ザ ベースボール", "アイ キャン プレイ ベースボール"],
        answer: "アイ キャン プレイ ベースボール",
        why: "スポーツには、ザを、つけません。ザを、つけるのは、楽器です。",
      },
    },
  },
};
