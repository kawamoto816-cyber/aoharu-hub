import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-09。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_09: Scene[] = [
    {
      at: 3,
      caption: "AIが出した案内文の下書きを、人が決めた点で確かめる。見学の曜日や申し込み先のまちがいは、検収で直す。",
      alt: "高校生が虫めがねを手に、ノートパソコンに出た下書きを一つずつ確かめている。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 266, face: "think" }], props: [{ kind: "table", x: 0, y: 240 }, { kind: "loupe", x: 190, y: 150, s: 0.9 }] },
      extras: [
        { kind: "laptop", x: 90, y: 196, s: 1.1, text: "AI下書き" },
        { kind: "check", x: 50, y: 70 },
        { kind: "check", x: 50, y: 110 },
      ],
      labels: [
        { x: 120, y: 72, text: "曜日・日時" },
        { x: 120, y: 112, text: "申し込み方" },
        { x: 150, y: 26, text: "人が検収", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "所要時間は、指示づくりから検収で直し終わるまでを測る。従来60分、新しい手順30分で、差は30分。",
      alt: "高校生が2つのストップウォッチを見比べて、驚いている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 270, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "stopwatch", x: 70, y: 100, s: 1, text: "60分" },
        { kind: "stopwatch", x: 170, y: 100, s: 1, text: "30分" },
      ],
      labels: [
        { x: 70, y: 168, text: "従来" },
        { x: 170, y: 168, text: "新しい手順", tone: "blue" },
        { x: 120, y: 220, text: "検収までふくめる", tone: "red" },
      ],
    },
];
