import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-13。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_13: Scene[] = [
    {
      at: 2,
      caption: "帳簿で確かめられる9月末の顧客8人は実績。体験会で申し込みたいと答えた12人は、まだ見込み。足して「顧客20人」とは言わない。",
      alt: "帳簿とふせんを前に、高校生が、実績と見込みを分けて考えている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 282, face: "think", fx: "?" }] },
      extras: [
        { kind: "ledger", x: 70, y: 80, text: "帳簿" },
        { kind: "sticky", x: 185, y: 80, text: "見込み" },
        { kind: "cross", x: 125, y: 235, s: 0.8 },
      ],
      labels: [
        { x: 70, y: 135, text: "実績 顧客8人", tone: "blue" },
        { x: 185, y: 135, text: "見込み客12人" },
        { x: 125, y: 190, text: "足して20人？", tone: "red" },
      ],
    },
    {
      at: 5,
      caption: "3分のピッチは約900字。いちばん長い約60秒をトラクションに使い、実績と見込みを言葉で分けて話す。先生が、本番の前に原稿と数字を確かめる。",
      alt: "ストップウォッチの前で高校生がピッチの練習をし、先生が原稿を見ながら聞いている。",
      art: {
        bg: "class",
        cast: [
          { who: "アオ", look: "boy", x: 252, face: "smile", hand: [200, 200] },
          { who: "先生", look: "teacher", x: 86, face: "normal" },
        ],
      },
      extras: [
        { kind: "stopwatch", x: 168, y: 38, text: "3分" },
        { kind: "flyer", x: 168, y: 230, s: 0.8, text: "原稿" },
      ],
      labels: [
        { x: 168, y: 90, text: "約900字", tone: "blue" },
        { x: 168, y: 122, text: "実績と見込み" },
      ],
    },
];
