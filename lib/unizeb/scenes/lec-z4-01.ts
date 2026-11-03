import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-01。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_01: Scene[] = [
    {
      at: 0,
      caption: "模擬店会議で飛びかう声を、事実・意見・推測の3つに分けてから信じる。確かめられるのは「去年は300杯」の1つだけ。",
      alt: "教室で2人の生徒が、事実・意見・推測と色分けした3枚の札を間にして話し合っている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 60, face: "think", fx: "?" }, { who: "アオ", look: "boy", x: 290, face: "normal", flip: true }] },
      extras: [
        { kind: "scale", x: 175, y: 210, s: 1 },
      ],
      labels: [
        { x: 175, y: 30, text: "事実：去年300杯", tone: "blue" },
        { x: 175, y: 66, text: "意見：もう古い", tone: "red" },
        { x: 175, y: 102, text: "推測：きっと売れる" },
      ],
    },
    {
      at: 3,
      caption: "まとめ記事や人づての話から、国や市の統計・団体の発表などの一次情報までさかのぼって、もとの数を開く。",
      alt: "高校生がスマートフォンのまとめ記事から、ノートパソコンで開いた統計の表へと出どころをさかのぼっている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 280, face: "smile", fx: "idea" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "phone", x: 50, y: 90, s: 1.4, text: "まとめ" },
        { kind: "folder", x: 160, y: 92, s: 1, text: "発表" },
        { kind: "laptop", x: 140, y: 226, s: 1.2, text: "統計" },
      ],
      labels: [
        { x: 105, y: 24, text: "人づて→一次情報", tone: "blue" },
        { x: 140, y: 150, text: "もとの数を開く", tone: "red" },
      ],
    },
];
