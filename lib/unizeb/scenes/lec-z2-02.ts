import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-02。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_02: Scene[] = [
    {
      at: 1,
      caption: "AIの要約は読みやすい。けれど、その中に、論点の落ち・数の誤り・原文にない付け足しがひそんでいることがある。",
      alt: "ノートパソコンに出た読みやすい要約を見て、高校生が首をかしげている。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 270, face: "think", fx: "?" }] },
      extras: [{ kind: "laptop", x: 120, y: 120, s: 1.3, text: "要約" }],
      labels: [
        { x: 90, y: 172, text: "落ち", tone: "red" },
        { x: 90, y: 206, text: "誤り", tone: "red" },
        { x: 90, y: 240, text: "付け足し", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "照らし合わせは、表の1行ごとに原文の該当箇所を探し、自分で数えること。AIに「合ってる？」と聞き直すのではない。",
      alt: "高校生が、要約表と印刷した原文を並べ、虫めがねで原文の言葉を探している。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 96, face: "think", hand: [170, 214] }], props: [{ kind: "table", x: 0, y: 236 }, { kind: "loupe", x: 178, y: 206 }] },
      extras: [
        { kind: "ledger", x: 196, y: 90, s: 1.2, text: "要約表" },
        { kind: "flyer", x: 262, y: 196, s: 0.9, text: "原文" },
      ],
      labels: [{ x: 250, y: 258, text: "自分で数える", tone: "blue" }],
    },
];
