import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-06。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_06: Scene[] = [
    {
      at: 0,
      caption: "1件500円で、3時間かかり、AIの利用料200円も自分持ち。手元に残る300円を3時間で割ると、時給は100円になる。",
      alt: "ノートパソコンでイラストを描き終えた高校生が、ストップウォッチを見て汗をかいている。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 275, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "laptop", x: 80, y: 125, s: 1.1, text: "イラスト" },
        { kind: "stopwatch", x: 185, y: 90, s: 1, text: "3時間" },
      ],
      labels: [
        { x: 110, y: 200, text: "1件500円", tone: "navy" },
        { x: 110, y: 235, text: "時給100円", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "後払いは入金まで30日、前受けは10日。1日100円の支払いをつなぐお金は、3,000円と1,000円で、2,000円の差がつく。",
      alt: "入金日に印がついた2枚のカレンダーを、高校生が見比べてひらめいている。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 280, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "calendar", x: 70, y: 115, s: 1.1, text: "後払い" },
        { kind: "calendar", x: 175, y: 115, s: 1.1, text: "前受け" },
      ],
      labels: [
        { x: 70, y: 40, text: "30日" },
        { x: 175, y: 40, text: "10日", tone: "blue" },
        { x: 70, y: 200, text: "つなぎ3,000円", tone: "red" },
        { x: 155, y: 240, text: "つなぎ1,000円", tone: "blue" },
      ],
    },
];
