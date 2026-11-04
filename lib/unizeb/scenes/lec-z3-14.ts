import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-14。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_14: Scene[] = [
    {
      at: 0,
      caption: "A案とB案は、ボタンの言葉だけがちがう。訪問した人を偶然で半分ずつに分け、同じ28日間に比べる。",
      alt: "教室で、女子の高校生と男子の高校生のあいだに、A案とB案と書かれた2台のノートパソコンが並んでいる。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 62, face: "smile" }, { who: "アオ", look: "boy", x: 278, face: "normal" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "laptop", x: 132, y: 236, s: 0.7, text: "A案" },
        { kind: "laptop", x: 210, y: 236, s: 0.7, text: "B案" },
        { kind: "calendar", x: 170, y: 92, s: 1.0, text: "28日" },
      ],
      labels: [
        { x: 74, y: 28, text: "変えるのは1つ", tone: "navy" },
        { x: 268, y: 28, text: "同じ期間", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "B案は登録率で3.0ポイント勝ったが、取り消し率は25.0%で、上限の20%を超えた。守る指標を超えた案は採らない。",
      alt: "子ども食堂の運営委員の大人と女子の高校生が、上がるグラフと下がるグラフを見比べている。グラフの間に天びんがある。",
      art: { bg: "plain", cast: [{ who: "運営委員", look: "teacher", x: 262, face: "think", fx: "sweat" }, { who: "ハル", look: "girl", x: 78, face: "normal" }] },
      extras: [
        { kind: "chartUp", x: 120, y: 58, s: 0.8, text: "登録8.0%" },
        { kind: "chartDown", x: 220, y: 58, s: 0.8, text: "取消25%" },
        { kind: "scale", x: 170, y: 206, s: 0.9 },
      ],
      labels: [
        { x: 170, y: 118, text: "上限20%を超えた", tone: "red" },
      ],
    },
];
