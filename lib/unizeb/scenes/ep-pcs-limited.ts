import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/pcs-limited。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_PCS_LIMITED: Scene[] = [
  {
    at: 0,
    caption: "店に並べるには、売れる前に完成品を作るお金が要る。注文を受けてから組み立てれば、その順番が逆になる。どの順番で商売を回すかを考える場面。",
    alt: "生徒が、店の絵と、電話とノートパソコンを見くらべて考えている。",
    art: { bg: "plain", cast: [{ who: "ハル", look: "boy", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "shop", x: 70, y: 115, s: 0.85, text: "販売店" },
      { kind: "phone", x: 165, y: 95, s: 1.0, text: "注文" },
      { kind: "laptop", x: 160, y: 205, s: 0.9 },
    ],
    labels: [
      { x: 70, y: 185, text: "先に作る" },
      { x: 165, y: 150, text: "注文から", tone: "blue" },
      { x: 70, y: 255, text: "資金は少ない", tone: "red" },
    ],
  },
];
