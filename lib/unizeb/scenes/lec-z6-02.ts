import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-02。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_02: Scene[] = [
    {
      at: 1,
      caption: "お客さんがスマホで払った代金は、決済代行がまとめて、翌月に入金する。売れた月と、お金が入る月は1か月ずれる。",
      alt: "スマートフォンの支払い画面と、翌月の入金日に印がついたカレンダー。高校生が、ずれに気づいて驚いている。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 285, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "phone", x: 60, y: 125, s: 1.4, text: "支払い" },
        { kind: "calendar", x: 160, y: 125, s: 1.2, text: "翌月" },
        { kind: "coins", x: 160, y: 250, text: "入金" },
      ],
      labels: [
        { x: 60, y: 40, text: "売れた月" },
        { x: 160, y: 40, text: "入る月", tone: "red" },
        { x: 110, y: 195, text: "1か月ずれる", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "2か月目は、まだ入らない売上と、年額のツール代24,000円の支払いが重なり、月末の残高が−5,000円の谷になる。",
      alt: "2か月目のカレンダーと、年額のツール代の請求書を前に、高校生があせっている。残高はマイナス5,000円。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 260, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "calendar", x: 70, y: 115, s: 1.2, text: "2か月目" },
        { kind: "receipt", x: 155, y: 115, s: 1.3 },
      ],
      labels: [
        { x: 150, y: 40, text: "年額24,000円" },
        { x: 85, y: 205, text: "残高−5,000円", tone: "red" },
      ],
    },
];
