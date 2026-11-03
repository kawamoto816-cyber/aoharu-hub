import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-08。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_08: Scene[] = [
    {
      at: 1,
      caption: "先月の教室の数。チラシを見た100人、ページを開いた40人、体験を申し込んだ8人、入会した4人。段階が進むほど人数が減るファネルの形になる。",
      alt: "高校生が、チラシ、ページを映したノートパソコン、体験の日のカレンダー、入会の印を見比べ、それぞれの人数を考えている。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 285, face: "think", fx: "?" }] },
      extras: [
        { kind: "flyer", x: 55, y: 70, s: 1.0, text: "チラシ" },
        { kind: "laptop", x: 165, y: 90, s: 1.1, text: "ページ" },
        { kind: "calendar", x: 55, y: 190, s: 0.9, text: "体験" },
        { kind: "check", x: 165, y: 190 },
      ],
      labels: [
        { x: 55, y: 125, text: "100人" },
        { x: 165, y: 125, text: "40人", tone: "blue" },
        { x: 55, y: 245, text: "8人", tone: "red" },
        { x: 165, y: 245, text: "4人" },
      ],
    },
    {
      at: 3,
      caption: "去った人数がいちばん多いのはチラシの所でも、率で見た谷は「ページから体験」の20%。ここを10ポイント上げると、入会は2人増える。",
      alt: "高校生が、ノートの計算を社長に見せている。社長は、伸びるグラフを見て驚いている。",
      art: {
        bg: "class",
        cast: [
          { who: "社長", look: "teacher", x: 270, face: "surprise", fx: "!" },
          { who: "ミオ", look: "girl", x: 85, face: "smile", fx: "idea" },
        ],
      },
      extras: [{ kind: "chartUp", x: 178, y: 85, s: 0.9, text: "入会" }],
      labels: [
        { x: 85, y: 35, text: "谷は20%", tone: "red" },
        { x: 270, y: 35, text: "+2人", tone: "blue" },
      ],
    },
];
