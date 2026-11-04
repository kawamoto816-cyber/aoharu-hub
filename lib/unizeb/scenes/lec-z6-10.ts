import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-10。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_10: Scene[] = [
    {
      at: 2,
      caption: "予約と支払いが済んだ4,000円は確定の欄に、「行ってみたい」と言われただけの3,000円は見込みの欄に分けて書く。ランウェイに数えるのは確定だけ。",
      alt: "帳面の「確定」の欄にチェック、ふせんの「見込み」の欄にばつ印。その横で大学生が考えこんでいる。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 282, face: "think" }] },
      extras: [
        { kind: "ledger", x: 70, y: 85, s: 1.1, text: "確定" },
        { kind: "sticky", x: 185, y: 85, text: "見込み" },
        { kind: "check", x: 70, y: 215 },
        { kind: "cross", x: 185, y: 215 },
      ],
      labels: [
        { x: 70, y: 160, text: "4,000円", tone: "blue" },
        { x: 185, y: 160, text: "3,000円", tone: "red" },
        { x: 128, y: 22, text: "数えるのは確定だけ", tone: "navy" },
      ],
    },
    {
      at: 3,
      caption: "見直し日に残高を警報ラインと比べる。3か月目の残高36,000円は、注意の線40,000円を下回ったので、先に決めた打ち手を実行する。",
      alt: "下がっていくグラフと、月末に印のついたカレンダーを前に、施設のマネージャーと大学生が残高を確かめている。",
      art: { bg: "class", cast: [{ who: "マネージャー", look: "teacher", x: 282, face: "normal" }, { who: "ミオ", look: "girl", x: 62, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "chartDown", x: 170, y: 112, s: 1, text: "残高" },
        { kind: "calendar", x: 170, y: 222, s: 0.9, text: "月末" },
      ],
      labels: [
        { x: 170, y: 18, text: "注意 40,000円", tone: "red" },
        { x: 170, y: 42, text: "残高 36,000円", tone: "blue" },
      ],
    },
];
