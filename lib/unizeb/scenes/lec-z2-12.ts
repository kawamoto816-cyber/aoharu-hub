import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-12。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_12: Scene[] = [
    {
      at: 2,
      caption: "申込から案内までの手順を、ふせんで並べてフローチャートにする。「日時と人数がある？」の分かれ道で、いいえなら聞き直す。",
      alt: "高校生が、壁に3枚並べたふせんの手順を指さしている。真ん中のふせんの下に、分かれ道の注記がある。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 280, face: "smile", hand: [255, 92] }] },
      extras: [
        { kind: "sticky", x: 45, y: 100, s: 0.85, text: "申込" },
        { kind: "sticky", x: 125, y: 100, s: 0.85, text: "日時は？" },
        { kind: "sticky", x: 205, y: 100, s: 0.85, text: "空き枠" },
      ],
      labels: [
        { x: 125, y: 30, text: "はいなら次へ", tone: "blue" },
        { x: 125, y: 160, text: "いいえなら聞き直す", tone: "red" },
        { x: 110, y: 215, text: "分かれ道", tone: "navy" },
      ],
    },
    {
      at: 4,
      caption: "3回走らせて、詰まりは4回から1回に、1件の時間は24分から15分に。主人が確かめて送る7分は削らない。",
      alt: "高校生がストップウォッチと下がっていくグラフの横で、ほっとした顔をしている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 285, face: "smile" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "stopwatch", x: 80, y: 110, text: "15分" },
        { kind: "chartDown", x: 180, y: 120 },
      ],
      labels: [
        { x: 120, y: 30, text: "24分から15分", tone: "blue" },
        { x: 120, y: 200, text: "詰まり4回から1回", tone: "red" },
      ],
    },
];
