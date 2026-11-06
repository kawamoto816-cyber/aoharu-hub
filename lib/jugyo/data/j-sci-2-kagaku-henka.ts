import type { UnitBase } from "../types";

// 止まる授業：化学変化（中2・理科）の共通の骨組み（問題）。事実・数字・例は lib/lecture/data/j-sci-2-kagaku-henka.ts の本文だけ。
// 化学式は say でアルファベットの読みに開く（Mg は「エムジー」、O₂ は「オーツー」、＋・→ は「たす」「から」）。
// せりふはキャストごと：j-sci-2-kagaku-henka.j-dark.ts（ダーク解説）・j-sci-2-kagaku-henka.j-kisaku.ts（気さくな兄・姉）。

export const KAGAKU_HENKA_BASE: UnitBase = {
  unitId: "j-sci-2-kagaku-henka",
  pauses: {
    "mistake:2": {
      question: "{seito}の「鉄と硫黄からできた物質も磁石につく」。正しいのはどちら？",
      choices: ["鉄と硫黄からできた物質も磁石につく", "硫化鉄は磁石につかない"],
      answer: "硫化鉄は磁石につかない",
      why: "化学変化で鉄とは性質のちがう別の物質になったからです。",
    },
    "check:1": {
      question: "マグネシウムの燃焼を表す化学反応式「2Mg ＋ O₂ → □」の □ に入るものは？",
      choices: ["2MgO", "MgO"],
      answer: "2MgO",
      why: "左は Mg が2個、O が2個。右も 2MgO で Mg 2個・O 2個になる。",
      say: {
        question: "マグネシウムの燃焼を表す化学反応式。2エムジー、たす、オーツー、から、しかく。しかくに入るものは？",
        choices: ["2エムジーオー", "エムジーオー"],
        answer: "2エムジーオー",
        why: "ひだりは、エムジーが2個、オーが2個。みぎも、2エムジーオーで、エムジー2個、オー2個になる。",
      },
    },
    "mistake:1": {
      question: "{seito}の「酸化銅と炭素の反応で、炭素が還元される」。正しいのはどちら？",
      choices: ["酸化銅と炭素の反応で、炭素が還元される", "酸化銅が還元され、炭素は酸化される"],
      answer: "酸化銅が還元され、炭素は酸化される",
      why: "酸素を失ったほうが還元、酸素と結びついたほうが酸化です。",
    },
    "mistake:3": {
      question: "{seito}の「加熱をやめると、鉄と硫黄の反応も止まる」。正しいのはどちら？",
      choices: ["加熱をやめると、鉄と硫黄の反応も止まる", "加熱をやめても反応は続く"],
      answer: "加熱をやめても反応は続く",
      why: "この反応は発熱反応で、自分が出す熱でつぎつぎと反応が進みます。",
    },
  },
};
