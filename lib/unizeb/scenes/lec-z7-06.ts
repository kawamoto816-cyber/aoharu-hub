import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-06。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_06: Scene[] = [
    {
      at: 1,
      caption: "急な雨の日、駅の出口で立ちつくした経験がある人には、「駅を出たら、ぬれずに帰る」という一言で、その場面がすぐに浮かぶ。",
      alt: "雨雲の下、駅の建物の前で、高校生が笑顔で立っている。下に「ぬれずに帰る」という注記がある。",
      art: {
        bg: "outdoor",
        cast: [{ who: "ハル", look: "girl", x: 275, face: "smile", fx: "idea" }],
        props: [
          { kind: "cloud", x: 70, y: 55, s: 1 },
          { kind: "rain", x: 160, y: 70, s: 1.1 },
          { kind: "building", x: 95, y: 175, s: 0.8 },
        ],
      },
      labels: [{ x: 110, y: 255, text: "ぬれずに帰る", tone: "blue" }],
    },
    {
      at: 2,
      caption: "似たサービスがみな「安心」を使っていると、どのチラシがどのサービスのものか区別がつかない。重なる言葉は、覚えてもらえない。",
      alt: "「安心」と書かれた3枚のチラシが並び、高校生が首をかしげている。下に罰の印がある。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 285, face: "think", fx: "?" }] },
      extras: [
        { kind: "flyer", x: 45, y: 100, s: 1.1, text: "安心" },
        { kind: "flyer", x: 120, y: 100, s: 1.1, text: "安心" },
        { kind: "flyer", x: 195, y: 100, s: 1.1, text: "安心" },
        { kind: "cross", x: 120, y: 232 },
      ],
      labels: [{ x: 120, y: 175, text: "どれがどこの？", tone: "red" }],
    },
];
