import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-10。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_10: Scene[] = [
    {
      at: 2,
      caption: "1回の人数が6人から12人に増えると、60分の教室で1人の質問の時間は10分から5分に減る。満足が下がり、予約が減る{{バランスループ}}が回り始める。",
      alt: "講師が汗をかきながら教室に立ち、そばで2人の子どもが手を止めて困っている。上に60分の時計と、下がっていく予約のグラフ。",
      art: {
        bg: "class",
        cast: [
          { who: "講師", look: "teacher", x: 286, face: "sweat", fx: "sweat" },
          { who: "子ども", look: "boy", x: 190, face: "think", fx: "?" },
          { who: "子ども", look: "girl", x: 100, face: "sweat" },
        ],
      },
      extras: [
        { kind: "clock", x: 60, y: 84, s: 1, text: "60分" },
        { kind: "chartDown", x: 190, y: 90, s: 1, text: "予約" },
      ],
      labels: [{ x: 130, y: 16, text: "12人で1人5分", tone: "red" }],
    },
    {
      at: 5,
      caption: "効く一点は、ブレーキの入口である1回の人数。上限を8人にして週3回に増やせば、週の席は24のまま、1人の質問の時間は7分30秒ほどにもどる。",
      alt: "講師がひらめいた顔で立っている。左に「週3回」のカレンダーと「7分半」のストップウォッチ、手前に「上限8人」と書いた帳面。",
      art: { bg: "plain", cast: [{ who: "講師", look: "teacher", x: 280, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "calendar", x: 70, y: 76, s: 1, text: "週3回" },
        { kind: "stopwatch", x: 170, y: 76, s: 1, text: "7分半" },
        { kind: "ledger", x: 115, y: 236, s: 0.9, text: "上限8人" },
      ],
      labels: [
        { x: 120, y: 18, text: "効く一点：人数", tone: "red" },
        { x: 115, y: 160, text: "席は24で同じ", tone: "blue" },
      ],
    },
];
