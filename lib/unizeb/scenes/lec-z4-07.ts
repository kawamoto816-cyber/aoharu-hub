import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-07。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_07: Scene[] = [
    {
      at: 1,
      caption: "全員が笑顔で賛成していても、穴がないとはかぎらない。言いにくい空気と似た見方が重なると、{{反対が出ない}}まま決まってしまう。",
      alt: "教室で3人の生徒がそろって笑顔で賛成している。頭の上に3つのチェックの印が並ぶ。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 58, face: "smile" }, { who: "ハルト", look: "boy", x: 170, face: "smile" }, { who: "クラスメイト", look: "girl", x: 282, face: "smile", flip: true }] },
      extras: [
        { kind: "check", x: 58, y: 104 },
        { kind: "check", x: 170, y: 104 },
        { kind: "check", x: 282, y: 104 },
      ],
      labels: [
        { x: 170, y: 28, text: "全員賛成？", tone: "navy" },
        { x: 170, y: 62, text: "穴を言う人がいない", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "縁日の4つの反論を、{{起きやすさ}}と{{影響}}で分ける。雨と写真は致命的なので、先に企画を変える。",
      alt: "反対役の高校生が、影響の大きさで左右に分けたふせんの並びを見ている。上の段が起きやすいもの。",
      art: { bg: "class", cast: [{ who: "ハルト", look: "boy", x: 284, face: "think", fx: "idea", flip: true }] },
      extras: [
        { kind: "sticky", x: 60, y: 84, s: 1.1, text: "雨・写真" },
        { kind: "sticky", x: 160, y: 84, s: 1.1, text: "材料費" },
        { kind: "sticky", x: 60, y: 190, s: 1.1, text: "列" },
        { kind: "sticky", x: 160, y: 190, s: 1.1, text: "となり" },
      ],
      labels: [
        { x: 60, y: 22, text: "影響大", tone: "red" },
        { x: 160, y: 22, text: "影響小", tone: "blue" },
        { x: 110, y: 256, text: "上が起きやすい" },
      ],
    },
];
