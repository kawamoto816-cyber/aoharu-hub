import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-10。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_10: Scene[] = [
    {
      at: 3,
      caption: "A案は40訪問で予約2件、B案は38訪問で予約1件。倍近い差でも、先に決めた1案50訪問に届くまでは決めずに集め続ける。40訪問なら、予約1件で率が2.5ポイント動く。",
      alt: "高校生が、2つのページの訪問数と予約数を映したノートパソコンと、カレンダーを見比べて考えこんでいる。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 285, face: "think", fx: "?" }] },
      extras: [
        { kind: "laptop", x: 62, y: 80, s: 1.0, text: "A案" },
        { kind: "laptop", x: 180, y: 80, s: 1.0, text: "B案" },
        { kind: "calendar", x: 120, y: 205, s: 0.9, text: "2週間" },
      ],
      labels: [
        { x: 62, y: 112, text: "40訪問 2件", tone: "blue" },
        { x: 180, y: 112, text: "38訪問 1件" },
        { x: 120, y: 145, text: "50訪問まで待つ", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "公開の前に、運営の大人とページを表示ルール5項目で点検する。「必ず」を消し、税込の価格、返金の条件、決済代行、運営の問い合わせ先があるかを確かめる。",
      alt: "教室で、高校生がノートパソコンの申込みページを見せ、運営の大人がチェックの印をつけながら確かめている。",
      art: {
        bg: "class",
        cast: [
          { who: "運営の人", look: "teacher", x: 285, face: "normal" },
          { who: "ハル", look: "girl", x: 68, face: "smile" },
        ],
      },
      extras: [
        { kind: "laptop", x: 175, y: 95, s: 1.1, text: "LP" },
        { kind: "check", x: 175, y: 28 },
      ],
      labels: [
        { x: 175, y: 132, text: "「必ず」を消す", tone: "red" },
        { x: 175, y: 160, text: "税込1,500円" },
        { x: 175, y: 188, text: "決済代行", tone: "blue" },
      ],
    },
];
