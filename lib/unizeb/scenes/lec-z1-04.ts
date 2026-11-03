import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-04。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_04: Scene[] = [
    {
      at: 0,
      caption: "スクリーンタイムを開くと、1日の画面時間がアプリごとに分で並ぶ。減らす前に、まず今の数字を知る。",
      alt: "高校生がスマホのスクリーンタイムの画面を見て、1日240分という数字におどろいている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 252, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "phone", x: 120, y: 86, s: 1.5, text: "240分" },
        { kind: "chartDown", x: 120, y: 200, s: 0.8 },
      ],
      labels: [
        { x: 120, y: 140, text: "1日240分", tone: "red" },
        { x: 120, y: 254, text: "動画90・SNS60" },
      ],
    },
    {
      at: 4,
      caption: "浮いた60分のうち30分は、放課後の17時から案内文の下書きに。行き先を書いた付せんを、スマホの裏にはっておく。",
      alt: "高校生が、行き先を書いた付せんをスマホの裏にはり、時計を見ながら笑顔で下書きを始めようとしている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 90, face: "smile", hand: [176, 214] }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "phone", x: 210, y: 206 },
        { kind: "sticky", x: 236, y: 96, text: "17時下書き" },
        { kind: "clock", x: 296, y: 196, s: 0.8, text: "17時" },
      ],
      labels: [
        { x: 236, y: 30, text: "浮いた60分の行き先", tone: "red" },
        { x: 236, y: 140, text: "30分は下書き", tone: "blue" },
      ],
    },
];
