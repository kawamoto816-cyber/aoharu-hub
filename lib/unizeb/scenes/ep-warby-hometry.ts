import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/warby-hometry。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_WARBY_HOMETRY: Scene[] = [
  {
    at: 0,
    caption: "眼鏡は、かけてみないと似合うか分からない。店がなくても、お客さんが安心して選べる方法を考える場面。",
    alt: "生徒が、小包の箱とカレンダーを見ながら、家で試せるしくみを考えている。",
    art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "boxes", x: 75, y: 105, s: 0.9 },
      { kind: "calendar", x: 180, y: 100, s: 0.9, text: "5日間" },
      { kind: "check", x: 125, y: 210, s: 0.7 },
    ],
    labels: [
      { x: 75, y: 165, text: "5本を家に" },
      { x: 180, y: 165, text: "無料で試す", tone: "blue" },
      { x: 125, y: 262, text: "似合うか不安" },
    ],
  },
];
