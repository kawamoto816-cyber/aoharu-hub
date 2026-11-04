import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/rakuten-rms。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_RAKUTEN_RMS: Scene[] = [
  {
    at: 0,
    caption: "ネットの商店街の店のページは業者が作り、店の人は自分で直せなかった。季節外れの商品が残ったままのページに、お客さんは戻ってこない。",
    alt: "店の人が、古い案内が残ったままのパソコンの画面を前に、困った顔で考えこんでいる。",
    art: { bg: "plain", cast: [{ who: "店の人", look: "teacher", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "laptop", x: 110, y: 95, s: 1, text: "夏のセール" },
      { kind: "calendar", x: 60, y: 200, s: 0.8, text: "12月" },
      { kind: "receipt", x: 165, y: 205, s: 0.7 },
    ],
    labels: [
      { x: 110, y: 160, text: "直せないページ", tone: "red" },
      { x: 165, y: 262, text: "直すのに費用" },
    ],
  },
];
