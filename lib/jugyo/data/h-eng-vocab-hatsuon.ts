import type { UnitBase } from "../types";

// 止まる授業：発音とアクセント（高校・英語）の共通の骨組み（問題）。事実・例・人名・年は lib/lecture/data/h-eng-vocab-hatsuon.ts の本文だけ。
// 英単語・発音記号は日本語の声で読むので、say ではカタカナに開く（例 looked →「ルックト」、/t/ →「ト」、ho-TEL →「後ろのテルが強い」）。
// ショーの文は lecture にある中身だけを言いかえて使い、実在の人に新しいせりふを言わせない。
// せりふはキャストごと：h-eng-vocab-hatsuon.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。
// 「名前動後」は「めいぜんどうご」、「1語」は「いちご」、「年」は「ねん」に開く。
// 答え（answer）は lecture の文のまま、読みは say.answer で直す。

export const H_HATSUON_BASE: UnitBase = {
  unitId: "h-eng-vocab-hatsuon",
  pauses: {
    "mistake:0": {
      question: "{seito}の「looked を『ルックイド』と読む」。正しいのはどちら？",
      choices: ["looked を「ルックイド」と読む", "/lʊkt/（ルックト）"],
      answer: "/lʊkt/（ルックト）",
      why: "-ed の直前の /k/ は無声音なので、-ed は /t/ と読みます。/ɪd/ になるのは直前が /t/・/d/ のときだけです。",
      say: {
        question: "{seito}の、ルック、イーディーを、ルックイドと読む。正しいのはどちら？",
        choices: ["ルック、イーディーを、ルックイドと読む", "ルックト"],
        answer: "ルックト",
        why: "イーディーの直前の、クの音は、無声音なので、イーディーは、トと読みます。イドになるのは、直前が、トか、ドのときだけです。",
      },
    },
    "check:1": {
      question: "economic で最も強く読む音節は？",
      choices: ["ec（EC-o-nom-ic）", "o（ec-O-nom-ic）", "nom（ec-o-NOM-ic）"],
      answer: "nom（ec-o-NOM-ic）",
      why: "-ic で終わる語は、その直前の音節にアクセントが来る。",
      say: {
        question: "エコノミックで、最も強く読む音節は？",
        choices: ["前から1つめの、エック", "前から2つめの、オ", "前から3つめの、ノム"],
        answer: "前から3つめの、ノム",
        why: "イックで終わるごは、その直前の音節に、アクセントが来る。",
      },
    },
    "mistake:1": {
      question: "{seito}の「event を EV-ent と前を強く読む」。正しいのはどちら？",
      choices: ["event を EV-ent と前を強く読む", "e-VENT"],
      answer: "e-VENT",
      why: "カタカナの「イベント」につられやすい語です。hotel（ho-TEL）や guitar（gui-TAR）も同じタイプです。",
      say: {
        question: "{seito}の、イベントを、前のイを強く読む。正しいのはどちら？",
        choices: ["イベントを、前のイを強く読む", "うしろのベントを強く読む"],
        answer: "うしろのベントを強く読む",
        why: "カタカナの、イベントに、つられやすいごです。ホテルは、うしろのテル、ギターは、うしろのターが強い。同じタイプです。",
      },
    },
    "check:2": {
      question: "Prices will increase. の increase のアクセントは前と後ろのどちら？",
      choices: ["前（IN-crease）", "後ろ（in-CREASE）"],
      answer: "後ろ（in-CREASE）",
      why: "ここでは動詞（増える）なので、名前動後の「動詞は後ろ」。",
      say: {
        question: "プライシズ、ウィル、インクリース。この、インクリースの、アクセントは、まえと、うしろの、どちら？",
        choices: ["前。インを強く", "うしろ。クリースを強く"],
        answer: "うしろ。クリースを強く",
        why: "ここでは、動詞、増える、なので、めいぜんどうごの、動詞はうしろ。",
      },
    },
  },
};
