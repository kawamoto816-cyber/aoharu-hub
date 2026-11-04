import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/hp-200a。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_HP_200A: Scene[] = [
  {
    at: 0,
    caption: "借家のガレージで作った、他社よりずっと安い発振器。最初にだれに売るかを考える場面。",
    alt: "作業着の人が、箱に入った測定器と、大きな会社の建物と、小さな店の絵を見くらべて考えている。",
    art: { bg: "plain", cast: [{ who: "作る人", look: "teacher", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "boxes", x: 120, y: 222, s: 0.6 },
      { kind: "shop", x: 60, y: 90, s: 0.75, text: "大きな会社" },
      { kind: "shop", x: 185, y: 90, s: 0.65, text: "小さな客" },
    ],
    labels: [
      { x: 60, y: 150, text: "一社に8台" },
      { x: 185, y: 150, text: "多くに1台" },
      { x: 120, y: 262, text: "54.40ドル", tone: "blue" },
    ],
  },
];
