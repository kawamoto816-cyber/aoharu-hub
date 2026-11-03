import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-08。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_08: Scene[] = [
    {
      at: 1,
      caption: "値段は2,000円のまま、無償の追加で1枚にかかる時間が2時間から4時間にのびると、時給は1,000円から500円に下がる。",
      alt: "高校生が、4時間を指す時計と、下がっていくグラフを見て、汗をかいている。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 270, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "clock", x: 65, y: 75, text: "4時間" },
        { kind: "chartDown", x: 190, y: 80, s: 1.1 },
        { kind: "coins", x: 100, y: 215, text: "2,000円" },
      ],
      labels: [
        { x: 190, y: 140, text: "時給500円", tone: "red" },
        { x: 65, y: 140, text: "2時間から4時間", tone: "navy" },
        { x: 100, y: 268, text: "値段は同じ", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "申し込みの前に、含む作業と追加料金の表を見せておく。AIが下書きした返信は、本人が料金と範囲を確かめてから送る。",
      alt: "高校生が、料金表のチラシを横に置き、ノートパソコンの返信の下書きを読んで確かめている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 270, face: "smile", fx: "idea" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "flyer", x: 75, y: 80, s: 1.2, text: "料金表" },
        { kind: "laptop", x: 110, y: 212, s: 1.1, text: "下書き" },
        { kind: "check", x: 190, y: 85 },
      ],
      labels: [
        { x: 75, y: 145, text: "背景＋500円", tone: "blue" },
        { x: 190, y: 35, text: "料金は先に", tone: "navy" },
      ],
    },
];
