import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-04。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_04: Scene[] = [
    {
      at: 2,
      caption: "30分の作戦会議。報告は5分の数字の確認と3分の連絡に短くし、いちばん長い15分を「来週作る景品を決める」議題に置く。",
      alt: "教室で2人の学生が、ストップウォッチとふせんの議題表を見ながら、持ち時間を確かめている。",
      art: {
        bg: "class",
        cast: [
          { who: "アオ", look: "boy", x: 60, face: "think" },
          { who: "ハル", look: "girl", x: 290, face: "smile", flip: true },
        ],
        props: [{ kind: "table", x: 0, y: 240 }],
      },
      extras: [
        { kind: "stopwatch", x: 175, y: 60, text: "30分" },
        { kind: "sticky", x: 175, y: 205, s: 0.9 },
      ],
      labels: [
        { x: 175, y: 120, text: "決める 15分", tone: "red" },
        { x: 175, y: 146, text: "受付 7分", tone: "red" },
        { x: 175, y: 172, text: "数字5分・連絡3分", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "議事メモに、決めたこと・担当・期限を書く。次の週は、このメモと準備リストの数字（12項目から19項目へ）を確かめるところから始める。",
      alt: "学生が、議事メモの帳面とカレンダーを見比べ、進んだ項目の数のグラフに満足している。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 270, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "ledger", x: 80, y: 70, s: 1.2, text: "議事メモ" },
        { kind: "calendar", x: 175, y: 70, text: "金曜まで" },
        { kind: "chartUp", x: 110, y: 232, s: 0.8 },
      ],
      labels: [
        { x: 120, y: 140, text: "担当・期限", tone: "blue" },
        { x: 110, y: 165, text: "12から19項目", tone: "red" },
      ],
    },
];
