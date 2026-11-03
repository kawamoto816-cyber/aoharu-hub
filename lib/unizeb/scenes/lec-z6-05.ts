import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-05。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_05: Scene[] = [
    {
      at: 3,
      caption: "2,000円のCDのコースは、手数料340円と原価・送料1,800円を引くと1人あたり−140円。50人が支援すると7,000円の赤字になる。",
      alt: "送るための箱と郵便の封筒、下がっていくグラフを前に、高校生が汗をかいて驚いている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 275, face: "sweat", fx: "!" }] },
      extras: [
        { kind: "boxes", x: 50, y: 262, s: 0.6 },
        { kind: "mail", x: 75, y: 115, s: 1.1, text: "送料" },
        { kind: "chartDown", x: 175, y: 95, s: 1.1, text: "手残り" },
      ],
      labels: [
        { x: 135, y: 180, text: "CDは−140円", tone: "red" },
        { x: 140, y: 212, text: "50人で−7,000円", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "目標額は、空き店舗の会場づくりの使い道10万円から決める。直したコースの手残りの合計124,200円で足りることを、協議会の担当者が確かめる。",
      alt: "商店街の空き店舗の前で、大人の担当者が帳面を見ながら、使い道と手残りを比べている。",
      art: { bg: "outdoor", cast: [{ who: "担当者", look: "teacher", x: 272, face: "think" }] },
      extras: [
        { kind: "shop", x: 100, y: 150, s: 1, text: "空き店舗" },
        { kind: "ledger", x: 270, y: 60, s: 1, text: "使い道" },
      ],
      labels: [
        { x: 100, y: 240, text: "使い道10万円" },
        { x: 120, y: 30, text: "手残り124,200円", tone: "blue" },
      ],
    },
];
