import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-10。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_10: Scene[] = [
    {
      at: 2,
      caption: "効き目が小さく手間が重い「感想の自動要約」と「友だちと共有」を削り、「読んだ本の記録」は残す。作った苦労ではなく、表の数字で決める。",
      alt: "高校生がノートパソコンの棚卸し表を前に考えている。上に3枚のふせんがあり、「記録」には確認の印、「要約」と「共有」にはバツ印が付いている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 282, face: "think" }], props: [{ kind: "table", x: 0, y: 244 }] },
      extras: [
        { kind: "sticky", x: 70, y: 104, s: 0.8, text: "記録" },
        { kind: "sticky", x: 140, y: 104, s: 0.8, text: "要約" },
        { kind: "sticky", x: 210, y: 104, s: 0.8, text: "共有" },
        { kind: "check", x: 70, y: 160, s: 0.6 },
        { kind: "cross", x: 140, y: 160, s: 0.6 },
        { kind: "cross", x: 210, y: 160, s: 0.6 },
        { kind: "laptop", x: 124, y: 236, s: 0.8, text: "棚卸し表" },
      ],
      labels: [
        { x: 140, y: 30, text: "効き目小・手間重", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "残した3つの保守は月4時間で、上限の月5時間に収まり、1時間のゆとりがある。作業は22時より前に終える。",
      alt: "高校生がノートパソコンの前でほっとした顔をしている。横のカレンダーに保守の上限「月5時間」と書かれ、確認の印が付いている。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 70, face: "smile" }], props: [{ kind: "table", x: 0, y: 244 }] },
      extras: [
        { kind: "calendar", x: 210, y: 92, s: 1.1, text: "月5時間" },
        { kind: "check", x: 292, y: 92, s: 0.8 },
        { kind: "laptop", x: 220, y: 236, s: 0.8, text: "4時間" },
      ],
      labels: [
        { x: 230, y: 170, text: "残した3つで4時間", tone: "navy" },
        { x: 70, y: 22, text: "ゆとり1時間", tone: "blue" },
        { x: 220, y: 30, text: "保守の上限", tone: "navy" },
      ],
    },
];
