import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-15。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_15: Scene[] = [
    {
      at: 2,
      caption: "計算ミスは1人平均6回から3回に減った。でも顧客数は3か月とも4人で、3か月目の継続率は75%に下がった。成果とお金の数字を並べると、まだ言えないことが見えてくる。",
      alt: "上がるグラフと下がるグラフを前に、高校生が首をかしげて考えている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 282, face: "think", fx: "?" }] },
      extras: [
        { kind: "chartUp", x: 70, y: 85, text: "成果" },
        { kind: "chartDown", x: 185, y: 85, text: "継続率" },
      ],
      labels: [
        { x: 70, y: 145, text: "ミス6回→3回", tone: "blue" },
        { x: 185, y: 145, text: "75%に", tone: "red" },
        { x: 125, y: 210, text: "顧客は4人のまま" },
      ],
    },
    {
      at: 4,
      caption: "名前を「中学生A」のように消してからAIに集計させ、5件を抜き取りで照らした。1件は、新しく入った人を続けた人に数えたまちがいで、継続率を75%に直した。",
      alt: "ノートパソコンの集計と元の記録の帳面を見比べ、高校生がまちがいを見つけている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 282, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "laptop", x: 70, y: 85, text: "中学生A" },
        { kind: "ledger", x: 185, y: 85, text: "記録" },
        { kind: "check", x: 95, y: 235, s: 0.8 },
        { kind: "cross", x: 160, y: 235, s: 0.8 },
      ],
      labels: [
        { x: 125, y: 150, text: "5件中4件一致", tone: "blue" },
        { x: 125, y: 190, text: "100%→75%", tone: "red" },
      ],
    },
];
