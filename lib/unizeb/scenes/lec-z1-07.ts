import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-07。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_07: Scene[] = [
    {
      at: 0,
      caption: "線は時間・範囲・料金の3つ。ハルは「平日18〜20時」「宿題の代わりはしない」「2回目からは1回30分500円」と、数字か条件で先に決めた。",
      alt: "机に向かう高校生が、時計と、範囲のメモと、料金の札を見比べながら、線を決めている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 268, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "clock", x: 52, y: 78, s: 0.9, text: "18〜20時" },
        { kind: "sticky", x: 132, y: 78, s: 1.1, text: "質問だけ" },
        { kind: "flyer", x: 206, y: 74, s: 0.8, text: "2回目〜" },
      ],
      labels: [
        { x: 52, y: 150, text: "時間", tone: "blue" },
        { x: 132, y: 150, text: "範囲", tone: "blue" },
        { x: 206, y: 150, text: "料金", tone: "red" },
      ],
    },
    {
      at: 2,
      caption: "「無料の相談は1回までなので、2回目からは有料の相談として受けられます」。責めず、線も崩さず、代案を1つ添えて返す。",
      alt: "高校生がにこやかにスマートフォンで返信を打ち、横で同級生が安心した顔をしている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 250, face: "smile" }, { who: "同級生A", look: "boy", x: 80, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "speech", x: 166, y: 86, s: 1, text: "有料の相談" },
        { kind: "phone", x: 166, y: 168, s: 1 },
      ],
      labels: [{ x: 166, y: 24, text: "代案を1つ添える", tone: "blue" }],
    },
];
