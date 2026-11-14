import type { UnitBase } from "../types";

// 止まる授業：リスニング（中2・英語）の共通の骨組み（問題）。事実・例文・年は lib/lecture/data/j-en-2-listening.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 Shall we 〜? →「シャル ウィー」）。時刻は say でひらがなに開く（4:15 →「よじじゅうごふん」）。
// 炉辺談話の英文は lecture にある文だけを引き、ルーズベルトのせりふは作らない。漫才（コタとユイ）の英文は使わない。
// せりふはキャストごと：j-en-2-listening.j-dark.ts（ダーク解説）・j-en-2-listening.j-kisaku.ts（気さくな兄・姉）。

export const J_LISTENING2_BASE: UnitBase = {
  unitId: "j-en-2-listening",
  pauses: {
    "mistake:0": {
      question: "{seito}の「Shall we play tennis? — Yes, I do.」。正しい返事はどちら？",
      choices: ["Shall we play tennis? — Yes, I do.", "Yes, let's."],
      answer: "Yes, let's.",
      why: "Shall we 〜?（〜しましょうか）はさそい。Yes, let's. で答えます。",
      say: {
        question: "{seito}の、シャル ウィー プレイ テニス？　イエス、アイ ドゥー。正しい返事はどちら？",
        choices: ["シャル ウィー プレイ テニス？　イエス、アイ ドゥー", "イエス、レッツ"],
        answer: "イエス、レッツ",
        why: "シャル ウィー、しましょうか、は、さそい。イエス、レッツ、で答えます。",
      },
    },
    "check:1": {
      question: "A: Let's meet at ten. B: Sorry, I can't. How about eleven? A: OK. 2人が会うのは何時？",
      choices: ["10時", "11時"],
      answer: "11時",
      why: "Sorry のあとで予定が変わり、A が OK と言っている。",
      say: {
        question: "エー、レッツ ミート アット テン。ビー、ソーリー、アイ キャント。ハウ アバウト イレブン？　エー、オーケー。ふたりが会うのは、なんじ？",
        choices: ["じゅうじ", "じゅういちじ"],
        answer: "じゅういちじ",
        why: "ソーリーの、あとで、予定が変わり、エーが、オーケーと言っている。",
      },
    },
    "check:2": {
      question: "The bus leaves at 4:15. Let's be there ten minutes before. 何時にバス停に行く？",
      choices: ["4時15分", "4時5分"],
      answer: "4時5分",
      why: "4:15 の10分前（before）。",
      say: {
        question: "ザ バス リーブズ アット フォー フィフティーン。レッツ ビー ゼア テン ミニッツ ビフォー。なんじに、バス停に、いく？",
        choices: ["よじ、じゅうごふん", "よじ、ごふん"],
        answer: "よじ、ごふん",
        why: "よじ、じゅうごふんの、じゅっぷんまえ。ビフォー。",
      },
    },
  },
};
