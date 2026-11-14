import type { UnitBase } from "../types";

// 止まる授業：仮定法（中3・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-3-katei.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 If I were a bird →「イフ アイ ワー ア バード」）。答え（answer）は lecture の文のまま、読みは say.answer で直す。
// 「過去形」は say で「かこけい」、「今」は「いま」に開く。作品（シェイクスピア・ディケンズ・マザーグース）の英文は本文にある部分だけを引く。
// せりふはキャストごと：j-en-3-katei.j-dark.ts（ダーク解説）・j-en-3-katei.j-kisaku.ts（気さくな兄・姉）。

export const J_KATEI_BASE: UnitBase = {
  unitId: "j-en-3-katei",
  pauses: {
    "check:2": {
      question: "If I had a lot of money, … の文が表す「時」は過去？　今？",
      choices: ["過去", "今"],
      answer: "今",
      why: "形は過去形でも、今の現実とちがう想像を表している。",
      say: {
        question: "イフ アイ ハド ア ロット オブ マネー、の文が表す、ときわ、過去？　いま？",
        choices: ["かこ", "いま"],
        answer: "いま",
        why: "かたちわ、かこけいでも、いまの、現実とちがう、想像を、表している。",
      },
    },
    "mistake:0": {
      question: "{seito}の「If I am a bird, I could fly.」。正しいのはどちら？",
      choices: ["If I am a bird, I could fly.", "If I were a bird, I could fly."],
      answer: "If I were a bird, I could fly.",
      why: "現実とちがう想像なので、if の中も過去形。be動詞は were にします。",
      say: {
        question: "{seito}の、イフ アイ アム ア バード、アイ クッド フライ。正しいのはどちら？",
        choices: ["イフ アイ アム ア バード、アイ クッド フライ", "イフ アイ ワー ア バード、アイ クッド フライ"],
        answer: "イフ アイ ワー ア バード、アイ クッド フライ",
        why: "現実とちがう、想像なので、イフのなかも、かこけい。ビー動詞わ、ワーにします。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I wish I can play the guitar.」。正しいのはどちら？",
      choices: ["I wish I can play the guitar.", "I wish I could play the guitar."],
      answer: "I wish I could play the guitar.",
      why: "I wish のあとも過去形。can は could にします。",
      say: {
        question: "{seito}の、アイ ウィッシュ アイ キャン プレイ ザ ギター。正しいのはどちら？",
        choices: ["アイ ウィッシュ アイ キャン プレイ ザ ギター", "アイ ウィッシュ アイ クッド プレイ ザ ギター"],
        answer: "アイ ウィッシュ アイ クッド プレイ ザ ギター",
        why: "アイ ウィッシュの、あとも、かこけい。キャンわ、クッドにします。",
      },
    },
  },
};
