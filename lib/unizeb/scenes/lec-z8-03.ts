import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-03。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_03: Scene[] = [
    {
      at: 0,
      caption: "ご飯を炊くあいだに野菜を切って煮込む。おたがいの結果を使わない作業は、同時に進められる。",
      alt: "台所で高校生が、時計を見ながら鍋のカレーを煮込み、その横で炊飯の時間を待っている。",
      art: { bg: "kitchen", cast: [{ who: "アオ", look: "boy", x: 270, face: "smile" }], props: [{ kind: "soup", x: 90, y: 220, s: 1.2 }] },
      extras: [{ kind: "clock", x: 170, y: 80, text: "炊飯45分" }],
      labels: [
        { x: 90, y: 150, text: "その間に煮込む", tone: "blue" },
        { x: 170, y: 30, text: "同時に進める" },
      ],
    },
    {
      at: 3,
      caption: "クリティカル・パスの作業（展示物づくり）には赤い印。ポスターには2日、案内の札には5日の余裕がある。",
      alt: "教室で2人の実行委員が、カレンダーの公開日と、赤い印を付けた作業のふせんを見ている。",
      art: {
        bg: "class",
        cast: [
          { who: "ハル", look: "girl", x: 270, face: "normal" },
          { who: "アオ", look: "boy", x: 70, face: "think" },
        ],
      },
      extras: [
        { kind: "calendar", x: 170, y: 80, s: 1.1, text: "公開日" },
        { kind: "sticky", x: 170, y: 190 },
      ],
      labels: [
        { x: 170, y: 140, text: "C 余裕0日", tone: "red" },
        { x: 170, y: 232, text: "B 余裕2日", tone: "blue" },
        { x: 170, y: 262, text: "E 余裕5日", tone: "blue" },
      ],
    },
];
