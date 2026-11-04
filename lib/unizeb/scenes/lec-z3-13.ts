import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-13。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_13: Scene[] = [
    {
      at: 1,
      caption: "部活のあとの部室で、60分のワークショップ。参加者に紙へ「こんな画面なら使いたい」を描いてもらい、作り手も一緒に描き足す。",
      alt: "放課後の教室で、女子の高校生と男子の高校生が机をはさみ、ふせんと紙を前に画面の絵を描いている。上にストップウォッチがある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 86, face: "smile" }, { who: "アオ", look: "boy", x: 254, face: "think" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "sticky", x: 170, y: 222, s: 0.9, text: "パート" },
        { kind: "stopwatch", x: 170, y: 92, s: 0.9 },
      ],
      labels: [
        { x: 86, y: 28, text: "一緒に描く", tone: "navy" },
        { x: 258, y: 28, text: "名前は書かない", tone: "blue" },
        { x: 170, y: 150, text: "描く25分", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "採った要素だけでなく、採らなかった要素にも、事業の条件と結び付けた理由と、いつ見直すかを書いて返す。",
      alt: "教室で、女子の高校生が「採否と理由」と書いた紙を見せ、男子の高校生が笑顔で読んでいる。紙の横に確認の印と、採らない印がある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 86, face: "normal" }, { who: "アオ", look: "boy", x: 254, face: "smile" }] },
      extras: [
        { kind: "flyer", x: 170, y: 104, s: 1.1, text: "採否と理由" },
        { kind: "check", x: 150, y: 222, s: 0.7 },
        { kind: "cross", x: 192, y: 222, s: 0.7 },
      ],
      labels: [
        { x: 86, y: 28, text: "採らない理由も", tone: "navy" },
        { x: 258, y: 28, text: "見直す時期", tone: "blue" },
      ],
    },
];
