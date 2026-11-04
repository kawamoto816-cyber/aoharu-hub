import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/fusion-books。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_FUSION_BOOKS: Scene[] = [
  {
    at: 0,
    caption: "何でも作れるデザインの道具という大きな夢。最初の一歩に、使う人と作るものがはっきりした卒業アルバムを選ぶかどうかを考える場面。",
    alt: "生徒が、大きな夢の電球と、一冊のアルバムを見くらべて考えている。",
    art: {
      bg: "class",
      cast: [{ who: "アオ", look: "boy", x: 275, face: "think", fx: "?" }],
      props: [{ kind: "book", x: 175, y: 185, s: 0.8 }],
    },
    extras: [
      { kind: "bulbIdea", x: 75, y: 85, s: 1.0 },
      { kind: "laptop", x: 70, y: 200, s: 0.7 },
    ],
    labels: [
      { x: 80, y: 145, text: "何でも作れる" },
      { x: 155, y: 258, text: "まず卒業アルバム", tone: "blue" },
    ],
  },
];
