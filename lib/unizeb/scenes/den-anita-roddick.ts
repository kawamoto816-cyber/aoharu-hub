import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/anita-roddick。at は節の番号（0から）。
// 実在の人物・会社のロゴ・商品は描かない。架空の高校生で、節の考え方を身近な場面にして描く。
export const SC_DEN_ANITA_RODDICK: Scene[] = [
    {
      at: 1,
      caption: "容器が足りず、買い足すお金もない。そこで、客に容器を持ってきてもらって詰め替える。足りないことを、店の特徴に変えた発想。",
      alt: "ばつ印のついた箱から矢印がのび、その先に容器持参と書いたふせんがある。横で高校生がひらめいている。",
      art: {
        bg: "plain",
        cast: [{ who: "ミオ", look: "girl", x: 285, face: "smile", fx: "idea" }],
        props: [{ kind: "arrow", x: 122, y: 150, s: 0.6 }],
      },
      extras: [
        { kind: "boxes", x: 60, y: 175, s: 0.8 },
        { kind: "cross", x: 60, y: 95, s: 0.8 },
        { kind: "sticky", x: 180, y: 175, text: "容器持参" },
      ],
      labels: [
        { x: 60, y: 250, text: "容器が足りない", tone: "red" },
        { x: 180, y: 250, text: "詰め替える", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "社会によいことを掲げる会社には、評価する声と批判する声の両方が向けられる。どちらか一方だけで決めず、両方の言い分と根拠を並べて考える。",
      alt: "天びんの左に丸印、右にばつ印がのっていて、横で高校生が考えている。",
      art: {
        bg: "class",
        cast: [{ who: "アオ", look: "boy", x: 285, face: "think", fx: "?" }],
      },
      extras: [
        { kind: "scale", x: 130, y: 160, s: 1.2 },
        { kind: "check", x: 75, y: 70, s: 0.8 },
        { kind: "cross", x: 185, y: 70, s: 0.8 },
      ],
      labels: [
        { x: 75, y: 25, text: "評価する見方", tone: "blue" },
        { x: 185, y: 25, text: "批判する見方", tone: "red" },
        { x: 130, y: 262, text: "根拠を並べる", tone: "navy" },
      ],
    },
];
