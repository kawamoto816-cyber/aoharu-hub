import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-14。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_14: Scene[] = [
    {
      at: 1,
      caption: "出資前の価値20万円に出資額5万円を足すと、出資後の価値は25万円。相手の持分は5万÷25万で20%で、紙の25%は割る数がちがっていた。",
      alt: "条件の紙のフォルダーと電卓がわりのスマートフォンを前に、大学生が持分を検算して気づいている。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 282, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "folder", x: 70, y: 80, text: "持分25%" },
        { kind: "phone", x: 185, y: 85, text: "検算" },
        { kind: "cross", x: 70, y: 175, s: 0.7 },
      ],
      labels: [
        { x: 185, y: 145, text: "5万÷25万", tone: "blue" },
        { x: 185, y: 175, text: "＝20%", tone: "blue" },
        { x: 110, y: 235, text: "出資後25万円" },
      ],
    },
    {
      at: 3,
      caption: "「すべての決めごとに拒否権」だと、添削の値段を変えるのにも相手の同意が要る。拒否権は、会社を売る・やめる・新しく株を出すといった大事な場面にしぼる。",
      alt: "拒否権と書かれたフォルダーと、つり合いを表す天びんを前に、大学生が困った顔をしている。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 282, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "folder", x: 70, y: 80, text: "拒否権" },
        { kind: "scale", x: 185, y: 85 },
      ],
      labels: [
        { x: 70, y: 140, text: "すべてに拒否権", tone: "red" },
        { x: 185, y: 140, text: "値段も止まる", tone: "red" },
        { x: 120, y: 210, text: "大事な3つだけに", tone: "blue" },
      ],
    },
];
