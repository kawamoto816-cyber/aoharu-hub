import type { UnitBase } from "../types";

// 止まる授業：過去進行形（中2・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-2-kako-shinko.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I was reading a book. →「アイ ワズ リーディング ア ブック」）。
// 物語・詩は lecture にある短い句だけを引き、キャロル・ポー・作中人物のせりふは作らない。
// せりふはキャストごと：j-en-2-kako-shinko.j-dark.ts（ダーク解説）・j-en-2-kako-shinko.j-kisaku.ts（気さくな兄・姉）。

export const J_KAKO_SHINKO_BASE: UnitBase = {
  unitId: "j-en-2-kako-shinko",
  pauses: {
    "check:0": {
      question: "They ___ swimming in the river. の ___ に入る語は？",
      choices: ["was", "were"],
      answer: "were",
      why: "主語 they は複数なので were。",
      say: {
        question: "ゼイ、くうらん、スイミング イン ザ リバー。くうらんに入る、たんごは？",
        choices: ["ワズ", "ワー"],
        answer: "ワー",
        why: "主語の、ゼイは、複数なので、ワー。",
      },
    },
    "mistake:3": {
      question: "{seito}の「When I got home, my sister cooked dinner.」（帰ったとき、姉は料理中だった）。正しいのはどちら？",
      choices: ["When I got home, my sister cooked dinner.", "When I got home, my sister was cooking dinner."],
      answer: "When I got home, my sister was cooking dinner.",
      why: "「帰ったとき料理中だった」と言うなら過去進行形。過去形だと「帰ってから料理を始めた」に近い意味になります。",
      say: {
        question: "{seito}の、ウェン アイ ガット ホーム、マイ シスター クックト ディナー。帰ったとき、姉は料理ちゅうだった、と言いたい。正しいのはどちら？",
        choices: ["ウェン アイ ガット ホーム、マイ シスター クックト ディナー", "ウェン アイ ガット ホーム、マイ シスター ワズ クッキング ディナー"],
        answer: "ウェン アイ ガット ホーム、マイ シスター ワズ クッキング ディナー",
        why: "帰ったとき、料理ちゅうだった、と言うなら、過去しんこうけい。かこけいだと、帰ってから、料理を始めた、に近い意味になります。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Did you studying then?」。正しいのはどちら？",
      choices: ["Did you studying then?", "Were you studying then?"],
      answer: "Were you studying then?",
      why: "進行形の疑問文は be動詞（was / were）を前に出します。did は使いません。",
      say: {
        question: "{seito}の、ディッド ユー スタディイング ゼン？ 正しいのはどちら？",
        choices: ["ディッド ユー スタディイング ゼン？", "ワー ユー スタディイング ゼン？"],
        answer: "ワー ユー スタディイング ゼン？",
        why: "しんこうけいの疑問文は、ビー動詞、ワズ、ワーを、まえに出します。ディッドは、使いません。",
      },
    },
    "check:2": {
      question: "「あなたはそのとき何をしていましたか」を英語に。",
      choices: ["What did you do then?", "What were you doing then?"],
      answer: "What were you doing then?",
      why: "What のあとに疑問文の語順 were you doing を続ける。",
      say: {
        question: "あなたは、そのとき、なにをしていましたか、を、英語に。",
        choices: ["ワット ディッド ユー ドゥー ゼン？", "ワット ワー ユー ドゥーイング ゼン？"],
        answer: "ワット ワー ユー ドゥーイング ゼン？",
        why: "ワットのあとに、疑問文の語順、ワー ユー ドゥーイング、を続ける。",
      },
    },
  },
};
