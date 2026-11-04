import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/walmart-rogers。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_WALMART_ROGERS: Scene[] = [
  {
    at: 0,
    caption: "大手の安売りチェーンは大都市に集まり、小さな町には来ていない。最初の店をどちらに出すかを考える場面。",
    alt: "店の人が、高い建物の並ぶ都市の絵と、小さな店の絵を見くらべて考えている。",
    art: {
      bg: "outdoor",
      cast: [{ who: "店の人", look: "teacher", x: 275, face: "think", fx: "?" }],
      props: [{ kind: "building", x: 70, y: 110, s: 0.9 }],
    },
    extras: [
      { kind: "shop", x: 175, y: 120, s: 0.8, text: "小さな町" },
      { kind: "boxes", x: 70, y: 240, s: 0.55 },
    ],
    labels: [
      { x: 70, y: 185, text: "大都市" },
      { x: 175, y: 185, text: "大手がいない", tone: "blue" },
    ],
  },
];
