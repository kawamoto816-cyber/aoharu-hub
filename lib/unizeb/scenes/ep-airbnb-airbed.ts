import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/airbnb-airbed。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_AIRBNB_AIRBED: Scene[] = [
  {
    at: 0,
    caption: "町のホテルは満室。手元にあるのは自分の部屋とエアマットだけ。宿を開く準備から始めるか、今ある部屋で一晩試すかを考える場面。",
    alt: "生徒が、満室と書かれた建物の絵と、ノートパソコンを見くらべて、ひらめいた顔をしている。",
    art: {
      bg: "plain",
      cast: [{ who: "ミオ", look: "girl", x: 275, face: "smile", fx: "idea" }],
      props: [{ kind: "building", x: 70, y: 110, s: 0.8 }],
    },
    extras: [
      { kind: "laptop", x: 170, y: 120, s: 1.0, text: "部屋あり" },
      { kind: "calendar", x: 90, y: 225, s: 0.7, text: "会議" },
    ],
    labels: [
      { x: 70, y: 180, text: "満室", tone: "red" },
      { x: 175, y: 180, text: "一晩だけ試す", tone: "blue" },
    ],
  },
];
