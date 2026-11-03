import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-04。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_04: Scene[] = [
    {
      at: 0,
      caption: "集めた料金メモは、税抜・月4回・3回券と書き方がばらばら。そのままでは比べられないので、税込・1回あたりの1つの形にそろえる。",
      alt: "書き方のちがう料金のふせんを前に、高校生が首をかしげている。横には、そろえた表を書くノートがある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 250, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "sticky", x: 100, y: 64, s: 1.4 },
        { kind: "ledger", x: 100, y: 196, s: 1.1, text: "税込・1回" },
      ],
      labels: [
        { x: 60, y: 22, text: "税抜", tone: "red" },
        { x: 112, y: 22, text: "月4回", tone: "red" },
        { x: 172, y: 40, text: "3回券", tone: "red" },
        { x: 100, y: 128, text: "1つの形に", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "AIが整えた表の「変わった所」を、写真に残した元のメモと1行ずつ見比べる。税抜のまま割った750円は「直す」。",
      alt: "高校生が、ノートパソコンの整えた表と、元の料金メモを見比べている。750円の行にばつ印、ほかの行に丸印がついている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 262, face: "think" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "laptop", x: 110, y: 226, s: 1.2, text: "差分5行" },
        { kind: "flyer", x: 70, y: 70, s: 1.0, text: "元のメモ" },
        { kind: "cross", x: 160, y: 40 },
        { kind: "check", x: 160, y: 96 },
      ],
      labels: [
        { x: 228, y: 40, text: "750円は直す", tone: "red" },
        { x: 228, y: 96, text: "OK2・保留2", tone: "blue" },
      ],
    },
];
