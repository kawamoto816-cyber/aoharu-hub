import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/muji-40。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_MUJI_40: Scene[] = [
  {
    at: 0,
    caption: "有名なメーカーの名前がついた商品が並ぶ棚。名前の力に頼らずに、手に取ってもらえる商品を作れるかを考える場面。",
    alt: "店の人が、たくさんの箱が並ぶ棚と、名前の書かれていない少しの品物を見くらべて考えている。",
    art: { bg: "plain", cast: [{ who: "店の人", look: "teacher", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "boxes", x: 70, y: 120, s: 0.8 },
      { kind: "boxes", x: 175, y: 120, s: 0.8 },
      { kind: "bag", x: 120, y: 215, s: 0.7 },
    ],
    labels: [
      { x: 120, y: 45, text: "名前の目立つ棚" },
      { x: 120, y: 262, text: "名前なしの40品目", tone: "red" },
    ],
  },
];
