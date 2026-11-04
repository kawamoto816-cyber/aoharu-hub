import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/spanx-buyer。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_SPANX_BUYER: Scene[] = [
  {
    at: 0,
    caption: "自分のお金で作った試作品がある。最初の売り場を得るために、だれに、どうやって見せるかを考える場面。",
    alt: "生徒が、試作品の入った袋と、大きな店の絵と、前と後をくらべる矢印のメモを見て考えている。",
    art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "bag", x: 65, y: 205, s: 0.9 },
      { kind: "shop", x: 75, y: 105, s: 0.85, text: "百貨店" },
      { kind: "sticky", x: 170, y: 95, s: 0.9, text: "前と後" },
    ],
    labels: [
      { x: 65, y: 255, text: "試作品" },
      { x: 175, y: 160, text: "だれに見せる？", tone: "red" },
    ],
  },
];
