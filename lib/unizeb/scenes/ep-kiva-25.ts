import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/kiva-25。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_KIVA_25: Scene[] = [
  {
    at: 0,
    caption: "遠くで商売をする人を、インターネットで応援したい。お金をあげる寄付にするか、返してもらう融資にするかを考える場面。",
    alt: "生徒が、ハートのついた貯金箱と、行き来する矢印の書かれた帳簿を見くらべて考えている。",
    art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "piggy", x: 70, y: 100, s: 0.9 },
      { kind: "ledger", x: 175, y: 100, s: 0.9 },
      { kind: "coins", x: 120, y: 210, s: 0.8 },
    ],
    labels: [
      { x: 70, y: 160, text: "あげる" },
      { x: 175, y: 160, text: "貸して戻る", tone: "blue" },
      { x: 120, y: 262, text: "25ドルから？" },
    ],
  },
];
