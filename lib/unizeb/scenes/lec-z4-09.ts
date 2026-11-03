import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-09。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_09: Scene[] = [
    {
      at: 1,
      caption: "競合の打ち出し文句をAIに出典つきで集めてもらい、5件を{{抜き取り}}で開く。どのチラシにも「長時間」が並べば、それが業界の常識の候補になる。",
      alt: "高校生が、同じ言葉が書かれた3枚のチラシと、出典を開いたノートパソコンを見比べている。",
      art: { bg: "class", cast: [{ who: "ナナ", look: "girl", x: 282, face: "think", fx: "?", flip: true }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "flyer", x: 50, y: 92, s: 1.1, text: "長時間" },
        { kind: "flyer", x: 120, y: 92, s: 1.1, text: "長時間" },
        { kind: "flyer", x: 190, y: 92, s: 1.1, text: "何でも" },
        { kind: "laptop", x: 120, y: 226, s: 1.2, text: "出典" },
      ],
      labels: [
        { x: 120, y: 22, text: "どこも同じ言葉", tone: "blue" },
        { x: 120, y: 156, text: "5件を開いて確かめる", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "「あえて15分」に、だれに・どんな価値・{{成り立つ条件}}を書き足して、はじめて確かめられる仮説になる。",
      alt: "ストップウォッチの横で、高校生がボードに「1回1問」と条件を書き足している。",
      art: { bg: "class", cast: [{ who: "ナナ", look: "girl", x: 270, face: "smile", fx: "idea", flip: true }], props: [{ kind: "board", x: 120, y: 150, text: "1回1問" }] },
      extras: [
        { kind: "stopwatch", x: 100, y: 76, s: 1.1, text: "15分" },
        { kind: "sticky", x: 206, y: 70, s: 1, text: "部活の後" },
      ],
      labels: [
        { x: 160, y: 22, text: "だれ・価値・条件", tone: "blue" },
        { x: 120, y: 206, text: "成り立つ条件", tone: "red" },
      ],
    },
];
