import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-06。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_06: Scene[] = [
    {
      at: 0,
      caption: "聞き取りのメモを付せんに書き、ジョブ・ペイン・ゲインの3つのまとまりに分ける。「単語を覚える」はジョブ、「次の日に忘れる」はペイン、「満点を取りたい」はゲイン。",
      alt: "大学の空き教室で、学生が聞き取りの付せんを3つのまとまりに分けて並べている。",
      art: { bg: "class", cast: [{ who: "ユイ", look: "girl", x: 282, face: "think" }] },
      extras: [
        { kind: "sticky", x: 70, y: 54, text: "ジョブ" },
        { kind: "sticky", x: 70, y: 138, text: "ペイン" },
        { kind: "sticky", x: 70, y: 222, text: "ゲイン" },
      ],
      labels: [
        { x: 178, y: 54, text: "単語を覚える", tone: "navy" },
        { x: 178, y: 138, text: "次の日に忘れる", tone: "red" },
        { x: 178, y: 222, text: "満点を取りたい", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "9点の「次の日に忘れる」と言った3人は、もう有料のアプリや単語カードにお金を使っていた。重要度も頻度も高く、今もお金を使っているペインが、払ってでも解きたい痛み。",
      alt: "学生が、有料版と書かれたスマートフォンと硬貨を前に、9点の付せんを指さしてうなずいている。",
      art: { bg: "class", cast: [{ who: "ケン", look: "boy", x: 280, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "phone", x: 70, y: 95, s: 1.6, text: "有料版" },
        { kind: "coins", x: 160, y: 105 },
        { kind: "sticky", x: 115, y: 220, text: "忘れる" },
      ],
      labels: [
        { x: 120, y: 28, text: "3×3＝9点", tone: "red" },
        { x: 120, y: 158, text: "もうお金を使う", tone: "blue" },
      ],
    },
];
