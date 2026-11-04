import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/netflix-teigaku。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_NETFLIX_TEIGAKU: Scene[] = [
  {
    at: 0,
    caption: "借りる1本ごとに払うか、毎月決まった額を払うか。料金の取り方を変えると、会社に入るお金の流れが変わる。",
    alt: "生徒が、1本ずつの硬貨と、カレンダーに書かれた毎月の料金を見くらべて考えている。",
    art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "coins", x: 70, y: 110, s: 0.9 },
      { kind: "calendar", x: 175, y: 105, s: 0.9, text: "毎月" },
      { kind: "mail", x: 120, y: 215, s: 0.8 },
    ],
    labels: [
      { x: 70, y: 165, text: "1本ごと" },
      { x: 175, y: 165, text: "定額", tone: "blue" },
    ],
  },
];
