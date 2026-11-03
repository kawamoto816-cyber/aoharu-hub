import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-04。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_04: Scene[] = [
    {
      at: 3,
      caption: "「これがないと、1回800円払うかどうかがわからないか」と聞いて、機能を{{残す・削る}}。散歩中の写真をLINEで送る機能だけを残し、地図と会員登録は削る。",
      alt: "高校生がスマートフォンの写真の機能に丸、地図と会員登録のふせんにばつを付けて、機能をしぼっている。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 268, face: "think", fx: "idea" }] },
      extras: [
        { kind: "phone", x: 70, y: 150, s: 1.3, text: "写真" },
        { kind: "check", x: 70, y: 230, s: 0.8 },
        { kind: "sticky", x: 160, y: 120, s: 1.0, text: "地図" },
        { kind: "cross", x: 160, y: 185, s: 0.7 },
        { kind: "sticky", x: 160, y: 235, s: 1.0, text: "会員登録" },
      ],
      labels: [
        { x: 96, y: 26, text: "残す：写真をLINE", tone: "blue" },
        { x: 96, y: 62, text: "削る：地図・会員", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "試す前に「2週間で、知り合いから申込2件」と{{成功基準}}を決める。代金は保護者が受け取り、高校生は記録をつける係。",
      alt: "高校生が記録のノートに申込の件数を書き、横で保護者がうなずいている。上にカレンダーと合格ラインの札。",
      art: { bg: "kitchen", cast: [{ who: "ミオ", look: "girl", x: 88, face: "smile" }, { who: "母", look: "teacher", x: 262, face: "normal", flip: true }] },
      extras: [
        { kind: "calendar", x: 175, y: 92, s: 1.0, text: "2週間" },
        { kind: "ledger", x: 175, y: 220, s: 0.9 },
      ],
      labels: [
        { x: 100, y: 24, text: "合格：申込2件以上", tone: "blue" },
        { x: 262, y: 120, text: "代金は保護者", tone: "navy" },
      ],
    },
];
