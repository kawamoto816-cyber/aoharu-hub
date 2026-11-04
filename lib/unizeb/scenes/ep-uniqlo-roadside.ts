import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/uniqlo-roadside。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_UNIQLO_ROADSIDE: Scene[] = [
  {
    at: 0,
    caption: "1号店は町の中心に開いた。2軒目を同じような町の中心に出すか、郊外の道路沿いで違う形を試すかを考える場面。",
    alt: "店の人が、町の中の店と、道路沿いの広い店の絵を見くらべて考えている。",
    art: {
      bg: "outdoor",
      cast: [{ who: "店の人", look: "teacher", x: 275, face: "think", fx: "?" }],
      props: [{ kind: "building", x: 70, y: 110, s: 0.8 }],
    },
    extras: [
      { kind: "shop", x: 175, y: 120, s: 0.9, text: "道路沿い" },
    ],
    labels: [
      { x: 70, y: 185, text: "町の中心" },
      { x: 175, y: 185, text: "郊外", tone: "blue" },
      { x: 120, y: 250, text: "2軒目はどこに？", tone: "red" },
    ],
  },
];
