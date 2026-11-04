import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-13。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_13: Scene[] = [
    {
      at: 2,
      caption: "校正の工程で、下書きの日付が事実メモとちがうと見つかった。その場で消さずに、戻り先の下書きへ戻して直し、ログに残す。",
      alt: "高校生がノートパソコンの校正の画面を見て、ばつ印に気づいている。横にログのノートがあり、上に「日付のまちがい」「下書きへ戻す」の注記がある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 272, face: "surprise", fx: "!" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "laptop", x: 130, y: 226, s: 1.2, text: "校正" },
        { kind: "cross", x: 190, y: 195 },
        { kind: "ledger", x: 215, y: 100, text: "ログ" },
      ],
      labels: [
        { x: 115, y: 30, text: "日付のまちがい", tone: "red" },
        { x: 115, y: 66, text: "下書きへ戻す", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "送る前は、運営の大人が文を読んで承認する。AIに渡すのは送り先の数と種類だけで、送るのは承認のあとに人がする。",
      alt: "大人がチェックの印の付いたノートパソコンを見てうなずき、高校生が封筒の絵の横で待っている。上に「送るのは人」「数と種類だけ」の注記がある。",
      art: {
        bg: "class",
        cast: [
          { who: "運営の大人", look: "teacher", x: 60, face: "smile" },
          { who: "ハル", look: "girl", x: 280, face: "smile" },
        ],
        props: [{ kind: "table", x: 0, y: 238 }],
      },
      extras: [
        { kind: "laptop", x: 170, y: 226, text: "承認" },
        { kind: "check", x: 170, y: 150 },
        { kind: "mail", x: 280, y: 96 },
      ],
      labels: [
        { x: 150, y: 30, text: "送るのは人", tone: "red" },
        { x: 150, y: 68, text: "数と種類だけ", tone: "blue" },
      ],
    },
];
