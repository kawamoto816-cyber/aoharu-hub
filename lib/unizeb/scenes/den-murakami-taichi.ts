import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/murakami-taichi。at は節の番号（0から）。
// 実在の人物は描かない。架空の生徒と先生が、お金の取り方のちがいを考える場面にする。
export const SC_DEN_MURAKAMI_TAICHI: Scene[] = [
  {
    at: 1,
    caption: "求人を載せたときに払うか、採用が決まったときに払うか。同じ求人サイトでも、お金を受け取るときを変えると、店にとっての始めやすさが変わる。",
    alt: "教室で、先生と生徒が、求人のちらしと天びんを前に、載せたときに払う形と決まったときに払う形を比べて考えている。",
    art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 60, face: "think", fx: "?" }, { who: "先生", look: "teacher", x: 285, face: "normal", flip: true }] },
    extras: [
      { kind: "flyer", x: 170, y: 58, s: 1.1, text: "求人" },
      { kind: "scale", x: 170, y: 180, s: 1 },
      { kind: "coins", x: 128, y: 250, s: 0.7 },
      { kind: "check", x: 212, y: 250, s: 0.7 },
    ],
    labels: [
      { x: 72, y: 108, text: "載せたら払う", tone: "blue" },
      { x: 276, y: 108, text: "決まったら払う", tone: "red" },
    ],
  },
  {
    at: 2,
    caption: "成功報酬型は、採用が決まるまで収入が入らない。最初の1年は売上がほとんど立たなかったが、続けるうちに2年目に入るころから伸びた。",
    alt: "下がるグラフと上がるグラフが並び、そのあいだのカレンダーを見て、生徒が少し安心した顔をしている。",
    art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 285, face: "smile" }] },
    extras: [
      { kind: "chartDown", x: 70, y: 90, s: 1, text: "1年目" },
      { kind: "chartUp", x: 180, y: 90, s: 1, text: "2年目" },
      { kind: "calendar", x: 125, y: 210, s: 1, text: "続ける" },
    ],
    labels: [
      { x: 70, y: 150, text: "売上が立たない", tone: "red" },
      { x: 190, y: 150, text: "伸び始める", tone: "blue" },
    ],
  },
];
