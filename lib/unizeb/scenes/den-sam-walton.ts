import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/sam-walton。at は節の番号（0から）。
// 実在の人物・会社のロゴ・商品は描かない。架空の高校生と先生で、節の考え方を身近な場面にして描く。
export const SC_DEN_SAM_WALTON: Scene[] = [
    {
      at: 1,
      caption: "店をどれだけ育てても、借りた場所の契約が切れれば、そこで商売は続けられない。文化祭や地域のイベントで場所を借りるときも、いつまで使えて、続けて借りられるのかを先に確かめる（契約は先生・大人が結ぶ）。",
      alt: "教室で、先生が契約のファイルと予定表を見せ、高校生が考えこんでいる。横には上がるグラフと店の絵がある。",
      art: {
        bg: "class",
        cast: [
          { who: "アオ", look: "boy", x: 60, face: "think", fx: "?" },
          { who: "先生", look: "teacher", x: 285, face: "normal", flip: true },
        ],
      },
      extras: [
        { kind: "shop", x: 130, y: 95, s: 0.8 },
        { kind: "chartUp", x: 215, y: 70, s: 0.7, text: "売上" },
        { kind: "folder", x: 140, y: 225, s: 0.9, text: "契約" },
        { kind: "calendar", x: 205, y: 230, s: 0.8, text: "期限" },
      ],
      labels: [
        { x: 170, y: 22, text: "借りた場所の店", tone: "navy" },
        { x: 175, y: 170, text: "更新できる？", tone: "red" },
      ],
    },
    {
      at: 2,
      caption: "大きなチェーンが来ない小さな町に店を出し、大きな倉庫から1日で行ける範囲に店を集める。まとめて仕入れて自分たちで運べば、安く売り続けやすくなる。",
      alt: "大きな倉庫の箱から矢印が二つの小さな町の店へのびている図の横で、高校生がうなずいている。",
      art: {
        bg: "plain",
        cast: [{ who: "ハル", look: "girl", x: 288, face: "smile", fx: "idea" }],
        props: [
          { kind: "arrow", x: 110, y: 150, s: 0.5 },
          { kind: "arrow", x: 110, y: 230, s: 0.5 },
        ],
      },
      extras: [
        { kind: "boxes", x: 50, y: 215, s: 0.8 },
        { kind: "shop", x: 185, y: 130, s: 0.6 },
        { kind: "shop", x: 185, y: 235, s: 0.6 },
      ],
      labels: [
        { x: 50, y: 150, text: "大きな倉庫", tone: "navy" },
        { x: 185, y: 70, text: "小さな町の店", tone: "blue" },
        { x: 120, y: 30, text: "1日で行ける範囲", tone: "navy" },
      ],
    },
];
