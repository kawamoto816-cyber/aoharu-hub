import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/takkyubin-eleven。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 架空の人物で状況を描く。会社のロゴ・マーク・車のデザインは描かない。実在の経営者は描かない。
export const SC_CASE_TAKKYUBIN_ELEVEN: Scene[] = [
  {
    at: 0,
    caption: "企業の荷物で育った会社が始めた、個人の荷物を家まで取りに行くサービス。発売の初日に扱った荷物は11個だった。",
    alt: "外で、生徒が小さな荷物の山と初日と書かれたカレンダーを見ながら、首をかしげて考えている。",
    art: { bg: "outdoor", cast: [{ who: "アオ", look: "boy", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "calendar", x: 110, y: 50, text: "初日" },
      { kind: "boxes", x: 110, y: 140, s: 0.8 },
    ],
    labels: [
      { x: 110, y: 192, text: "初日は11個", tone: "red" },
      { x: 110, y: 225, text: "1軒ずつ取りに行く" },
    ],
  },
  {
    at: 1,
    caption: "宅急便は続けられ、1997年に全国ネットワークが完成した。初日の11個から、使い方の種類を足しながら網を広げていった。",
    alt: "2人の生徒が、地図と積み上がった荷物を間にはさんで、うれしそうに顔を見合わせている。",
    art: {
      bg: "outdoor",
      cast: [{ who: "ハル", look: "girl", x: 60, face: "smile" }, { who: "アオ", look: "boy", x: 280, face: "smile", flip: true }],
      props: [{ kind: "map", x: 170, y: 55, s: 0.8 }],
    },
    extras: [{ kind: "boxes", x: 170, y: 145 }],
    labels: [{ x: 170, y: 215, text: "1997 全国の網", tone: "blue" }],
  },
];
