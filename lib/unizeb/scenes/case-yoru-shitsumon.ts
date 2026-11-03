import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/yoru-shitsumon。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 夜おそくの場面は描かない（昼の打ち合わせと、朝の返事の場面）。18歳未満は22時以降に働かない。
export const SC_CASE_YORU_SHITSUMON: Scene[] = [
    {
      at: 0,
      caption: "質問の4割は22時から24時に来る。昼の打ち合わせで、高校生のアルバイトに夜の当番を頼む案を考えたが、18歳未満は22時以降に働けない。",
      alt: "昼の教室で、大学生がノートパソコンと時計を見ながら、夜の質問の多さに困っている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 272, face: "think", fx: "?" }] },
      extras: [
        { kind: "laptop", x: 80, y: 100, s: 1, text: "質問200件" },
        { kind: "clock", x: 180, y: 70, s: 1, text: "22時" },
      ],
      labels: [
        { x: 120, y: 175, text: "22〜24時に80件" },
        { x: 120, y: 205, text: "18歳未満は22時まで", tone: "red" },
      ],
    },
    {
      at: 1,
      caption: "夜の質問は、AIが仕分けて下書きを作り、朝7時から大学生2人が確かめて送る。高校生の担当は21時30分までにした。",
      alt: "朝の教室で、大学生2人がノートパソコンの下書きを確かめ、時計は朝7時をさしている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 65, face: "smile" }, { who: "アオ", look: "boy", x: 275, face: "smile", flip: true }] },
      extras: [
        { kind: "laptop", x: 170, y: 118, s: 1, text: "AIの下書き" },
        { kind: "clock", x: 95, y: 40, s: 0.8, text: "朝7時" },
      ],
      labels: [
        { x: 240, y: 28, text: "返事は翌朝9時まで", tone: "blue" },
        { x: 240, y: 56, text: "高校生は21時30分まで" },
      ],
    },
];
