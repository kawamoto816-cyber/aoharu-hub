import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/seven-toyosu。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_SEVEN_TOYOSU: Scene[] = [
  {
    at: 0,
    caption: "日本にまだない店の形を、どこで、だれの店として始めるか。自分で一から建てるか、町で店を営む人に加わってもらうかを考える場面。",
    alt: "会社の人が、新しい店の絵と、町の小さな店の絵を見くらべて考えている。",
    art: { bg: "outdoor", cast: [{ who: "会社の人", look: "teacher", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "shop", x: 70, y: 110, s: 0.9, text: "一から" },
      { kind: "shop", x: 175, y: 110, s: 0.9, text: "町の店" },
      { kind: "clock", x: 120, y: 215, s: 0.8 },
    ],
    labels: [
      { x: 120, y: 262, text: "朝7時から夜11時" },
    ],
  },
];
