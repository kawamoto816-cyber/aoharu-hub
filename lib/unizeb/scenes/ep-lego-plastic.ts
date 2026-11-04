import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/lego-plastic。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_LEGO_PLASTIC: Scene[] = [
  {
    at: 0,
    caption: "木のおもちゃを作ってきた工場に、プラスチックの成形機が届いた。身内からは木に戻りたいという声が出ている。",
    alt: "工場の人が、木のおもちゃと、プラスチックの型から出てきた小さなブロックを見くらべて考えている。",
    art: { bg: "plain", cast: [{ who: "工場の人", look: "teacher", x: 275, face: "think", fx: "?" }], props: [{ kind: "factory", x: 80, y: 95, s: 0.8 }] },
    extras: [
      { kind: "boxes", x: 175, y: 105, s: 0.8 },
      { kind: "scale", x: 120, y: 210, s: 0.8 },
    ],
    labels: [
      { x: 80, y: 155, text: "木の工場" },
      { x: 175, y: 160, text: "プラスチック", tone: "blue" },
      { x: 120, y: 262, text: "どちらに賭ける？" },
    ],
  },
];
