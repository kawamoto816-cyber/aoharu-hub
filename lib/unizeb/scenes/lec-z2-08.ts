import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-08。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_08: Scene[] = [
    {
      at: 3,
      caption: "期待する答えは、スクリプトに頼む前に自分で手で数えておく。空欄のある表で、期待する答え33に対して結果は22。だから不合格。",
      alt: "高校生が、ノートに書いたテストの表と、ノートパソコンに出た結果を見比べている。結果の横にばつ印がある。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 270, face: "think", fx: "!" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "ledger", x: 95, y: 95, s: 1.1, text: "テスト2" },
        { kind: "laptop", x: 150, y: 226, s: 1.2, text: "結果22" },
        { kind: "cross", x: 205, y: 150 },
      ],
      labels: [
        { x: 95, y: 150, text: "期待する答え33", tone: "blue" },
        { x: 175, y: 40, text: "不合格", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "エージェントが読めるのは、集計用に作ったフォルダ1つだけ。写真や学校の書類が入ったフォルダは許さない。",
      alt: "高校生が、ばつ印のついたフォルダから離れ、チェックの印のついた集計用のフォルダを指さしている。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 60, face: "smile", hand: [130, 120] }] },
      extras: [
        { kind: "folder", x: 175, y: 100, text: "集計用" },
        { kind: "folder", x: 285, y: 100, text: "写真・書類" },
        { kind: "check", x: 175, y: 44 },
        { kind: "cross", x: 285, y: 44 },
      ],
      labels: [
        { x: 175, y: 170, text: "ここだけ読む", tone: "blue" },
        { x: 285, y: 170, text: "読ませない", tone: "red" },
        { x: 230, y: 230, text: "最小権限", tone: "navy" },
      ],
    },
];
