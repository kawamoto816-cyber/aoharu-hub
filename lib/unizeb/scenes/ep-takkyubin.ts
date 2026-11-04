import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/takkyubin。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_TAKKYUBIN: Scene[] = [
  {
    at: 0,
    caption: "大口の荷物の運賃は安く、利益はほとんど残らない。一方で、家庭の人は小さな荷物を郵便局や駅まで自分で持っていっていた。",
    alt: "運送会社の人が、下がっていくグラフと、大きな箱の山と、小さな荷物を見くらべて考えこんでいる。",
    art: { bg: "outdoor", cast: [{ who: "会社の人", look: "teacher", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "chartDown", x: 110, y: 55, s: 0.9 },
      { kind: "boxes", x: 70, y: 175, s: 0.8 },
      { kind: "bag", x: 170, y: 180, s: 0.7 },
    ],
    labels: [
      { x: 110, y: 112, text: "利益率0.07%", tone: "red" },
      { x: 70, y: 238, text: "大口" },
      { x: 170, y: 238, text: "家庭の荷物", tone: "blue" },
    ],
  },
];
