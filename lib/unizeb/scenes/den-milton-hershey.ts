import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/milton-hershey。at は節の番号（0から）。
// 実在の人物・会社のロゴ・商品は描かない。架空の生徒と先生が、列伝の内容を確かめている場面。
export const SC_DEN_MILTON_HERSHEY: Scene[] = [
    {
      at: 1,
      caption: "今売れている事業と、これから育てたい事業。両方を続けるか、一つを手放して力を集めるか。ハーシーは1900年、キャラメルの会社を売る道を選んだ。",
      alt: "教室で、生徒が天びんを前に考えている。天びんの左にはキャラメルの下がるグラフと今売れている、右にはチョコの上がるグラフとこれから育てると書かれている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 282, face: "think", fx: "?" }] },
      extras: [
        { kind: "scale", x: 140, y: 150, s: 1.2 },
        { kind: "chartDown", x: 100, y: 60, s: 0.8, text: "キャラメル" },
        { kind: "chartUp", x: 195, y: 60, s: 0.8, text: "チョコ" },
      ],
      labels: [
        { x: 90, y: 215, text: "今売れている", tone: "red" },
        { x: 178, y: 250, text: "これから育てる", tone: "blue" },
      ],
    },
    {
      at: 2,
      caption: "大きな注文に応えるには、先に材料を買うお金がいる。信用が足りないとき、事情を知って保証してくれる人がいるかどうかが、再出発を左右する（お金は先生が預かる）。",
      alt: "教室で、先生が大口の注文の手紙と帳面を持ち、生徒が材料の箱を運んでいる。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 60, face: "smile" }, { who: "先生", look: "teacher", x: 285, face: "normal", flip: true }] },
      extras: [
        { kind: "mail", x: 120, y: 55, s: 1.1 },
        { kind: "boxes", x: 170, y: 240, s: 0.8 },
        { kind: "ledger", x: 235, y: 60, s: 0.9, text: "材料費" },
      ],
      labels: [{ x: 120, y: 98, text: "大口の注文", tone: "blue" }, { x: 170, y: 160, text: "材料費が先に要る", tone: "red" }],
    },
];
