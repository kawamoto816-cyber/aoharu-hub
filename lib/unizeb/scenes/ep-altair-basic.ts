import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/altair-basic。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_ALTAIR_BASIC: Scene[] = [
  {
    at: 0,
    caption: "雑誌で知った新しいコンピューター。動かすソフトはまだない。先に売りこむか、作ってから売りこむかを決める場面。",
    alt: "生徒が、雑誌と、まだ何も書いていないノートを見くらべて考えている。そばに電話がある。",
    art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 275, face: "think", fx: "?" }], props: [{ kind: "book", x: 70, y: 95, s: 0.8 }] },
    extras: [
      { kind: "laptop", x: 170, y: 95, s: 0.9, text: "未完成" },
      { kind: "phone", x: 110, y: 205, s: 0.8 },
    ],
    labels: [
      { x: 70, y: 150, text: "雑誌の表紙" },
      { x: 110, y: 262, text: "先に連絡する？", tone: "blue" },
    ],
  },
];
