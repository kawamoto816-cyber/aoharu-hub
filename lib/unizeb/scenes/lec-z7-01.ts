import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-01。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_01: Scene[] = [
    {
      at: 2,
      caption: "30秒ピッチは、相手の得・すること・頼むこと1つの3つの一言でできている。協賛のお願いなら、最初に店の得を言う。",
      alt: "店先で、高校生が店主に向かって話している。上に「相手の得」「すること」「頼むこと1つ」の3つの札と30秒のストップウォッチ。",
      art: { bg: "outdoor", cast: [{ who: "ハル", look: "girl", x: 80, face: "smile" }, { who: "店主", look: "teacher", x: 270, face: "normal", flip: true }] },
      extras: [
        { kind: "stopwatch", x: 175, y: 200, s: 0.9, text: "30秒" },
      ],
      labels: [
        { x: 175, y: 28, text: "1 相手の得", tone: "red" },
        { x: 175, y: 64, text: "2 すること", tone: "blue" },
        { x: 175, y: 100, text: "3 頼むこと1つ", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "原稿は必ず声に出して読み、ストップウォッチで秒数を測る。30秒を超えたら削って、もう一度測る。",
      alt: "教室で1人が原稿を声に出して読み、もう1人がストップウォッチで秒数を測っている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 80, face: "normal" }, { who: "アオ", look: "boy", x: 270, face: "think", flip: true }] },
      extras: [
        { kind: "flyer", x: 120, y: 80, s: 1.1, text: "原稿" },
        { kind: "stopwatch", x: 210, y: 82, s: 1 },
      ],
      labels: [
        { x: 175, y: 150, text: "読むと35秒", tone: "red" },
        { x: 175, y: 182, text: "削って28秒", tone: "blue" },
      ],
    },
];
