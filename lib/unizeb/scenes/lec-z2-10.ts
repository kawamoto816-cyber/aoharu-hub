import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-10。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_10: Scene[] = [
    {
      at: 2,
      caption: "定額プランは、毎月の定額の費用18,000円を、1人あたり残る7,712円で割って約2.3。2人では足りないので、損益分岐は3人。従量プランなら1人で届く。",
      alt: "大学生がノートパソコンの計算を見て考えている。上に「定額は3人で黒字」「従量は1人で届く」の注記がある。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 270, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "laptop", x: 115, y: 226, s: 1.2, text: "約2.3人" },
        { kind: "calendar", x: 115, y: 120, text: "月" },
      ],
      labels: [
        { x: 115, y: 30, text: "定額は3人で黒字", tone: "red" },
        { x: 115, y: 64, text: "従量は1人で届く", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "生徒が見込みの半分の5人になると、手残り率は従量が74%、定額は51%。人数が読めないうちは、人数に合わせて費用も減る従量のほうが安全。",
      alt: "2人の大学生の間にてんびんがあり、従量と定額の手残り率をくらべている。",
      art: {
        bg: "class",
        cast: [
          { who: "ハル", look: "girl", x: 55, face: "surprise", fx: "!" },
          { who: "アオ", look: "boy", x: 285, face: "smile" },
        ],
      },
      extras: [{ kind: "scale", x: 170, y: 120 }],
      labels: [
        { x: 170, y: 30, text: "生徒5人の月", tone: "navy" },
        { x: 170, y: 178, text: "従量 74%", tone: "blue" },
        { x: 170, y: 212, text: "定額 51%", tone: "red" },
      ],
    },
];
