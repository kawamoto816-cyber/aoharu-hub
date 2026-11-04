import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/irodori-ryotei。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_IRODORI_RYOTEI: Scene[] = [
  {
    at: 0,
    caption: "山にいくらでもある葉っぱを出荷しても、ほとんど売れない。値段を下げるか、買う人の現場に行って何を求めているかを聞くかを考える場面。",
    alt: "生徒が、葉っぱの入った箱と、下がるグラフと、値札を見くらべて考えている。",
    art: {
      bg: "outdoor",
      cast: [{ who: "アオ", look: "boy", x: 275, face: "think", fx: "?" }],
      props: [{ kind: "plant", x: 70, y: 205, s: 0.9 }],
    },
    extras: [
      { kind: "chartDown", x: 80, y: 70, s: 0.8 },
      { kind: "receipt", x: 175, y: 80, s: 0.8 },
      { kind: "speech", x: 170, y: 200, s: 0.8, text: "何がほしい" },
    ],
    labels: [
      { x: 80, y: 130, text: "売れない", tone: "red" },
      { x: 175, y: 135, text: "値下げ？" },
    ],
  },
];
