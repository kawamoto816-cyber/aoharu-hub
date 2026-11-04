import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-10。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_10: Scene[] = [
    {
      at: 1,
      caption: "記憶では「連絡は火曜」。でもメッセージの日時を開くと、仲間Aは月曜の19時40分に「手が回らない」と送っていた。時系列は記録で1行ずつ確かめる。",
      alt: "高校生が、スマホのメッセージの日時とカレンダーを見比べて、記憶とちがうことに気づいて驚いている。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 270, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "phone", x: 75, y: 75, s: 1.1, text: "19:40" },
        { kind: "calendar", x: 180, y: 75, text: "1日目" },
        { kind: "ledger", x: 110, y: 240, s: 0.8, text: "時系列" },
      ],
      labels: [
        { x: 75, y: 140, text: "送信の日時", tone: "blue" },
        { x: 180, y: 140, text: "記憶は火曜", tone: "red" },
        { x: 110, y: 170, text: "記録に合わせる", tone: "navy" },
      ],
    },
    {
      at: 3,
      caption: "原因を、分担・工程・確認・道具の4つの場所に分けてふせんに書く。「Aが忘れた」ではなく「〜の欄がない」「〜の工程がない」の形にする。",
      alt: "机をはさんで2人の高校生が、4枚のふせんを並べ、原因を仕組みの言葉で書き出している。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 60, face: "think" }, { who: "ハル", look: "girl", x: 290, face: "normal", flip: true }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "sticky", x: 175, y: 50, s: 1.2 },
        { kind: "cross", x: 140, y: 175, s: 0.8 },
        { kind: "check", x: 210, y: 175, s: 0.8 },
      ],
      labels: [
        { x: 175, y: 100, text: "分担・工程", tone: "blue" },
        { x: 175, y: 126, text: "確認・道具", tone: "blue" },
        { x: 140, y: 212, text: "人のせい", tone: "red" },
        { x: 215, y: 238, text: "仕組み", tone: "navy" },
      ],
    },
];
