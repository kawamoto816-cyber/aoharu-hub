import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-14。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_14: Scene[] = [
    {
      at: 2,
      caption: "1件ずつ読んでもわからなかったかたよりが、20組を比べて数えると見えてくる。住む地域だけで、4組中3組に差が出た。",
      alt: "大学生がノートパソコンの横で、20組の結果を書いた表を見て考えこんでいる。上に「住む地域で3組」「合計7組」の注記がある。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 272, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "laptop", x: 110, y: 226, s: 1.2, text: "AとB" },
        { kind: "ledger", x: 110, y: 110, s: 1.1, text: "20組" },
      ],
      labels: [
        { x: 225, y: 40, text: "住む地域で3組", tone: "red" },
        { x: 225, y: 80, text: "合計7組", tone: "navy" },
      ],
    },
    {
      at: 4,
      caption: "是正のあと、同じ20組で再点検すると、差は7組から3組に減った。使うかどうかは、表の数を見て代表が条件つきで決める。",
      alt: "大人と大学生が、チェックの印の付いたノートパソコンをはさんで立っている。上に「7組から3組」「条件つきで使う」の注記がある。",
      art: {
        bg: "class",
        cast: [
          { who: "代表", look: "teacher", x: 60, face: "smile" },
          { who: "ミオ", look: "girl", x: 280, face: "smile" },
        ],
        props: [{ kind: "table", x: 0, y: 238 }],
      },
      extras: [
        { kind: "laptop", x: 170, y: 226, text: "再点検" },
        { kind: "check", x: 170, y: 150 },
      ],
      labels: [
        { x: 170, y: 36, text: "7組から3組", tone: "red" },
        { x: 170, y: 80, text: "条件つきで使う", tone: "blue" },
      ],
    },
];
