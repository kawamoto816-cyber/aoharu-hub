import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-12。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_12: Scene[] = [
    {
      at: 3,
      caption: "投下コスト2万円、利益倍率14万4,000円、類似事例30万円。どれもまちがいではなく、見ている物が違うので、価値は幅で出る。",
      alt: "てんびんの横に3つの金額が並び、生徒が考えこんでいる。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 282, face: "think", fx: "?" }] },
      extras: [{ kind: "scale", x: 125, y: 85, s: 1.2, text: "価値" }],
      labels: [
        { x: 55, y: 175, text: "2万円" },
        { x: 125, y: 200, text: "14万4,000円", tone: "blue" },
        { x: 195, y: 175, text: "30万円" },
        { x: 125, y: 245, text: "幅で持つ", tone: "navy" },
      ],
    },
    {
      at: 4,
      caption: "顧客数・単価・継続率を少しずつ動かして比べると、継続率を10ポイント上げたときがいちばん価値が増えた。上達を毎月返して、続けたくなる教室にする。",
      alt: "上がっていくグラフと、毎月の印のついたカレンダーを前に、生徒が笑顔でうなずいている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 282, face: "smile" }] },
      extras: [
        { kind: "chartUp", x: 90, y: 75, text: "継続率" },
        { kind: "calendar", x: 190, y: 90, text: "毎月" },
      ],
      labels: [
        { x: 90, y: 150, text: "＋10ポイント", tone: "blue" },
        { x: 190, y: 150, text: "上達を返す" },
        { x: 130, y: 210, text: "いちばん増える", tone: "navy" },
      ],
    },
];
