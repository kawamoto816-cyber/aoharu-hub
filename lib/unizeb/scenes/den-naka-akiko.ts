import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/naka-akiko。at は節の番号（0から）。
// 実在の人物・会社のロゴは描かない。架空の生徒と先生が、会社との出会い方の入口を比べる場面にする。
export const SC_DEN_NAKA_AKIKO: Scene[] = [
  {
    at: 1,
    caption: "給料や条件を並べて比べるか、まず話を聞きに行って、どんな人が何をめざしているかを知るか。同じ募集でも、最初の一歩の置き方で、人と会社の出会い方は変わる。",
    alt: "教室で、生徒が募集のちらしとスマートフォンを前に考えていて、先生が横で見守っている。左には条件で選ぶ、右には話を聞くと書かれている。",
    art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 60, face: "think", fx: "?" }, { who: "先生", look: "teacher", x: 285, face: "smile", flip: true }] },
    extras: [
      { kind: "flyer", x: 170, y: 58, s: 1.1, text: "募集" },
      { kind: "scale", x: 170, y: 180, s: 1 },
      { kind: "coins", x: 128, y: 250, s: 0.7 },
      { kind: "speech", x: 212, y: 250, s: 0.7 },
    ],
    labels: [
      { x: 72, y: 108, text: "条件で選ぶ", tone: "blue" },
      { x: 276, y: 108, text: "話を聞く", tone: "red" },
    ],
  },
];
