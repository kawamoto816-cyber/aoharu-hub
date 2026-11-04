import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/sara-blakely。at は節の番号（0から）。
// 実在の人物・会社のロゴ・商品は描かない。試作品を、決める人に直接見せる場面を、架空の高校生の文化祭にたとえて描く。
export const SC_DEN_SARA_BLAKELY: Scene[] = [
    {
      at: 1,
      caption: "自分の困りごとから作った試作品を、売るかどうかを決める人に直接見せる。文化祭の出しものを、担当の先生に試作品で説明する場面にたとえた絵（人物は架空）。",
      alt: "高校生が試作品を手に、先生に説明している。左には何度も直した試作のふせんとTシャツがある。",
      art: {
        bg: "class",
        cast: [{ who: "先生", look: "teacher", x: 190, face: "surprise", fx: "!" }, { who: "ミオ", look: "girl", x: 290, face: "smile", flip: true }],
        props: [{ kind: "tshirt", x: 112, y: 108, s: 0.8 }],
      },
      extras: [
        { kind: "bulbIdea", x: 108, y: 38, s: 0.7 },
        { kind: "sticky", x: 62, y: 185, text: "試作3回目" },
        { kind: "check", x: 62, y: 245, s: 0.7 },
      ],
      labels: [
        { x: 245, y: 28, text: "決める人に直接見せる", tone: "navy" },
        { x: 62, y: 140, text: "困りごとから", tone: "blue" },
      ],
    },
];
