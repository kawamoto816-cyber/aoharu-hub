import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/crepe。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_CASE_CREPE: Scene[] = [
    {
      at: 0,
      caption: "文化祭のクレープ店。何枚分の材料を用意するかを、1日目の数から決める（売上と予算は先生と実行委員会が預かる）。",
      alt: "クレープの屋台の前で、生徒2人が売れた枚数のメモを見て相談している。",
      art: { bg: "outdoor", cast: [{ who: "ハル", look: "girl", x: 215, face: "think", fx: "?" }, { who: "アオ", look: "boy", x: 300, face: "normal", flip: true }] },
      extras: [
        { kind: "stall", x: 100, y: 150, text: "クレープ" },
        { kind: "crepe", x: 60, y: 134, s: 0.8 },
        { kind: "crepe", x: 100, y: 134, s: 0.8 },
        { kind: "crepe", x: 140, y: 134, s: 0.8 },
        { kind: "sticky", x: 260, y: 60, text: "1時間に30枚？" },
      ],
    },
  
];
