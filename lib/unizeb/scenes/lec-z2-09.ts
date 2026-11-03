import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-09。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_09: Scene[] = [
    {
      at: 3,
      caption: "表の見出しが文字化けすると、スクリプトは「売上」の列を見つけられない。数字は正しく見えるのに、合計は0円になる。",
      alt: "ノートパソコンの画面に意味のない記号が並び、高校生がおどろいている。上に「合計0円」と「正しくは48,000円」の注記がある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 270, face: "surprise", fx: "sweat" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "laptop", x: 110, y: 226, s: 1.3, text: "螟ｩ荳?" },
        { kind: "chartDown", x: 110, y: 110 },
      ],
      labels: [
        { x: 110, y: 30, text: "合計0円", tone: "red" },
        { x: 110, y: 150, text: "正しくは48,000円", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "現金を数えて預かるのは先生。会計係は集計の前に見出しを確かめ、合計が現金の額とちがえば止めて人が見る。",
      alt: "先生が手さげ金庫の横に立ち、高校生がノートパソコンで集計の前のチェックをしている。上に止める基準の注記がある。",
      art: {
        bg: "class",
        cast: [
          { who: "先生", look: "teacher", x: 55, face: "smile" },
          { who: "アオ", look: "boy", x: 285, face: "smile" },
        ],
        props: [{ kind: "table", x: 0, y: 238 }],
      },
      extras: [
        { kind: "cashbox", x: 118, y: 226 },
        { kind: "laptop", x: 196, y: 226, text: "チェック" },
        { kind: "check", x: 290, y: 44 },
      ],
      labels: [
        { x: 160, y: 30, text: "現金とちがえば止める", tone: "red" },
        { x: 160, y: 70, text: "見出しの4列を確認", tone: "blue" },
      ],
    },
];
