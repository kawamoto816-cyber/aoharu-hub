import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/brian-chesky。at は節の番号（0から）。
// 実在の人物は描かない。部屋を貸す大人も、学ぶ生徒も架空。
export const SC_DEN_BRIAN_CHESKY: Scene[] = [
  {
    at: 1,
    caption: "町に大きな行事があるとホテルは満室になる。新しい建物を建てる前に、今ある部屋で「泊まりたい人はいるか」を確かめる、という考え方を絵にした。",
    alt: "満室の札が出たホテルのとなりで、部屋を貸す大人が、ノートパソコンの予約の画面を見てひらめいた顔をしている。",
    art: { bg: "plain", cast: [{ who: "部屋の主", look: "teacher", x: 285, face: "smile", fx: "idea" }], props: [{ kind: "building", x: 75, y: 200, s: 1.1 }] },
    extras: [
      { kind: "laptop", x: 185, y: 120, s: 1.1, text: "空き部屋" },
      { kind: "calendar", x: 185, y: 230, s: 0.8, text: "会議" },
    ],
    labels: [
      { x: 75, y: 120, text: "ホテルは満室", tone: "red" },
      { x: 185, y: 40, text: "今ある部屋で", tone: "blue" },
    ],
  },
  {
    at: 2,
    caption: "画面の数字だけでなく、使う人に直接会って、何が足りないのかを確かめる。文化祭の出し物でも、来た人に感想を聞くと直す所が見えてくる。",
    alt: "教室で、生徒2人が、スマートフォンで撮った写真とふせんのメモを見比べ、直す所を相談している。",
    art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 60, face: "think" }, { who: "アオ", look: "boy", x: 285, face: "smile", flip: true }] },
    extras: [
      { kind: "phone", x: 135, y: 110, s: 1.3, text: "写真" },
      { kind: "sticky", x: 210, y: 110, s: 1, text: "感想" },
      { kind: "check", x: 172, y: 220, s: 0.9 },
    ],
    labels: [{ x: 172, y: 30, text: "会って確かめる", tone: "navy" }],
  },
];
