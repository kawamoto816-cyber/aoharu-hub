import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/body-shop-refill。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_BODY_SHOP_REFILL: Scene[] = [
  {
    at: 0,
    caption: "容器が足りなくなり、新しく買うお金もない。足りなさを乗りこえ、お客さんに喜ばれる特徴に変えられないかを考える場面。",
    alt: "店の人が、貯金箱と、少なくなった容器の箱を前に、ひらめいた顔をしている。",
    art: { bg: "kitchen", cast: [{ who: "店の人", look: "teacher", x: 275, face: "surprise", fx: "idea" }] },
    extras: [
      { kind: "boxes", x: 70, y: 200, s: 0.75 },
      { kind: "piggy", x: 75, y: 85, s: 0.8 },
      { kind: "speech", x: 175, y: 90, s: 0.9, text: "詰め替え" },
    ],
    labels: [
      { x: 75, y: 140, text: "お金が少ない", tone: "red" },
      { x: 175, y: 255, text: "容器が足りない" },
    ],
  },
];
