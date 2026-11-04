import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-13。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_13: Scene[] = [
    {
      at: 2,
      caption: "有名さではなく、軸ごとの点×重みの合計で比べる。人気のカフェは7点、講座を開くシニアの会は17点だった。",
      alt: "高校生が、ふせんに書いた候補の点数と、伸びていくグラフを見くらべて考えている。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 270, face: "think", fx: "?" }] },
      extras: [
        { kind: "shop", x: 65, y: 85, s: 0.8, text: "カフェ" },
        { kind: "chartUp", x: 170, y: 80, s: 0.9, text: "17点" },
      ],
      labels: [
        { x: 60, y: 150, text: "カフェ 7点", tone: "red" },
        { x: 165, y: 150, text: "シニアの会 17点", tone: "navy" },
        { x: 115, y: 200, text: "点×重みの合計", tone: "blue" },
        { x: 115, y: 240, text: "有名さは軸にしない", tone: "navy" },
      ],
    },
    {
      at: 3,
      caption: "AIの表では「毎週水曜の夜」。出典のページを開くと「第2・第4土曜の午前」に変わっていた。違いを直し、点数も16点から17点に直す。",
      alt: "2人の高校生が、ノートパソコンに出たAIの答えと、開いた出典のページを見くらべている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 70, face: "normal" }, { who: "ハル", look: "girl", x: 270, face: "surprise", fx: "!", flip: true }] },
      extras: [
        { kind: "laptop", x: 120, y: 60, s: 1.0, text: "AI：水曜夜" },
        { kind: "folder", x: 220, y: 60, s: 1.0, text: "出典" },
      ],
      labels: [
        { x: 170, y: 125, text: "土曜の午前だった", tone: "red" },
        { x: 170, y: 255, text: "出典を開く", tone: "blue" },
      ],
    },
];
