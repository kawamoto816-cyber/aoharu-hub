import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-02。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_02: Scene[] = [
    {
      at: 0,
      caption: "部活のあとの中学生が選べるのは、塾だけではない。無料の動画や家族に聞くこと、そして「何もしない」も、同じ相手のお金と時間を取り合う競合。",
      alt: "部活帰りの中学生が、駅前の塾の建物と、無料の動画が映ったスマートフォンを見比べて、首をかしげている。",
      art: { bg: "outdoor", cast: [{ who: "ハル", look: "boy", x: 270, face: "think", fx: "?" }] },
      extras: [
        { kind: "shop", x: 70, y: 150, s: 0.8, text: "塾" },
        { kind: "phone", x: 165, y: 130, s: 1.4, text: "動画" },
      ],
      labels: [
        { x: 70, y: 40, text: "同じ種類" },
        { x: 168, y: 40, text: "代わりの手段", tone: "blue" },
        { x: 110, y: 205, text: "何もしない", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "見つけた空白は「わからない所をその場で聞ける」。部活のあとの18時半から、持ってきた問題に1人15分ずつ答える形にした。",
      alt: "学習スペースの机で、元塾講師の先生が、中学生の持ってきた英語の問題にその場で答えている。壁の時計は18時半。",
      art: {
        bg: "class",
        cast: [
          { who: "先生", look: "teacher", x: 270, face: "smile" },
          { who: "アオ", look: "girl", x: 70, face: "surprise", fx: "idea" },
        ],
        props: [{ kind: "table", x: 0, y: 240 }],
      },
      extras: [{ kind: "clock", x: 170, y: 70, s: 1.1, text: "18時半" }],
      labels: [{ x: 170, y: 150, text: "その場で聞ける", tone: "blue" }],
    },
];
