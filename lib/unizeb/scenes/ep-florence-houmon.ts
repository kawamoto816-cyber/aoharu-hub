import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/florence-houmon。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_FLORENCE_HOUMON: Scene[] = [
  {
    at: 0,
    caption: "病気の子どもを預かる施設は少なく、建てるには大きなお金がかかる。建物ではなく、人が家へ行く形で始められないかを考える場面。",
    alt: "保育の人が、建物の絵と、家へ向かう矢印と、カレンダーを見くらべて考えている。",
    art: {
      bg: "outdoor",
      cast: [{ who: "保育の人", look: "teacher", x: 275, face: "think", fx: "?" }],
      props: [{ kind: "building", x: 70, y: 110, s: 0.8 }, { kind: "arrow", x: 170, y: 105, s: 0.8 }],
    },
    extras: [
      { kind: "calendar", x: 160, y: 210, s: 0.8, text: "熱" },
    ],
    labels: [
      { x: 70, y: 180, text: "施設は少ない", tone: "red" },
      { x: 175, y: 160, text: "家へ行く", tone: "blue" },
    ],
  },
];
