import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/amazon-books。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_AMAZON_BOOKS: Scene[] = [
  {
    at: 0,
    caption: "どんなに大きな書店でも、棚に置ける本には限りがある。ネットの店なら、棚の広さに限りがない。最初の商品を選ぶ手がかりになった差。",
    alt: "生徒がノートパソコンを前に、本の並んだ棚と画面を見くらべて、ひらめいた顔をしている。",
    art: {
      bg: "plain",
      cast: [{ who: "ミオ", look: "girl", x: 275, face: "smile", fx: "idea" }],
      props: [{ kind: "book", x: 70, y: 200, s: 0.9 }],
    },
    extras: [
      { kind: "laptop", x: 160, y: 120, s: 1.1 },
      { kind: "boxes", x: 60, y: 120, s: 0.6 },
    ],
    labels: [
      { x: 160, y: 40, text: "棚に限りなし", tone: "blue" },
      { x: 150, y: 250, text: "最初は本だけ", tone: "red" },
    ],
  },
];
