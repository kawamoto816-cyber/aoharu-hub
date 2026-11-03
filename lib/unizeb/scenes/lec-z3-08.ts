import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-08。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_08: Scene[] = [
    {
      at: 1,
      caption: "聞いた発言を1枚に1つずつふせんに書き、困りごとが近いもの同士を寄せてから、グループに名前を付ける。",
      alt: "教室で、2人の高校生が机の上のふせんを動かして、近い言葉どうしを集めている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 86, face: "think", fx: "idea" }, { who: "アオ", look: "boy", x: 256, face: "smile" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "sticky", x: 172, y: 108, s: 1.2 },
        { kind: "sticky", x: 172, y: 210, s: 0.9 },
      ],
      labels: [
        { x: 86, y: 28, text: "近いものを寄せる", tone: "blue" },
        { x: 258, y: 28, text: "最後に名前", tone: "navy" },
      ],
    },
    {
      at: 3,
      caption: "「スタンプがほしい」は解決策。発言を並べると、「1人だと行く理由がなくなる」という{{できない理由（壁）}}が見えてくる。",
      alt: "朝の公園で、高校生がカレンダーを見て、ひらめいた顔をしている。カレンダーには班で行くと書いてある。",
      art: { bg: "outdoor", cast: [{ who: "ハル", look: "girl", x: 266, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "calendar", x: 110, y: 110, s: 1.2, text: "班で行く" },
        { kind: "check", x: 170, y: 64, s: 0.8 },
      ],
      labels: [
        { x: 104, y: 214, text: "ほしい物：解決策", tone: "red" },
        { x: 104, y: 252, text: "壁：目印がない", tone: "navy" },
      ],
    },
];
