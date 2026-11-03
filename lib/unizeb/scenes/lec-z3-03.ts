import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-03。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_03: Scene[] = [
    {
      at: 2,
      caption: "まず1人ずつふせんに書き出し、AIの5案も足してから、条件で選ぶ。出す時間と選ぶ時間を分ける。",
      alt: "教室で、2人の高校生がふせんとノートパソコンを前に、案を書き出している。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 92, face: "think", fx: "idea" }, { who: "アオ", look: "boy", x: 252, face: "smile" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "sticky", x: 172, y: 112, s: 1.2 },
        { kind: "laptop", x: 172, y: 236, s: 0.8, text: "AI 5案" },
      ],
      labels: [
        { x: 104, y: 28, text: "出す：決めない", tone: "blue" },
        { x: 240, y: 64, text: "選ぶ：条件で", tone: "navy" },
      ],
    },
    {
      at: 4,
      caption: "使えるお金3,000円をこえる「たこ焼き器を買い足す」は{{条件外}}。QRで事前注文して受け取るだけの列は{{条件内}}で、試す1案になる。",
      alt: "たこ焼きの屋台の横で、高校生がQR注文の画面を見て笑っている。条件内と条件外の札が付いている。",
      art: { bg: "outdoor", cast: [{ who: "ハル", look: "girl", x: 272, face: "smile" }] },
      extras: [
        { kind: "stall", x: 100, y: 150, text: "たこ焼き" },
        { kind: "phone", x: 214, y: 84, s: 1.2, text: "QR" },
        { kind: "check", x: 252, y: 50, s: 0.8 },
      ],
      labels: [
        { x: 100, y: 212, text: "条件内：QR注文", tone: "blue" },
        { x: 100, y: 252, text: "条件外：機械を買う", tone: "red" },
      ],
    },
];
