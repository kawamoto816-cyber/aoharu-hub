import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-03。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_03: Scene[] = [
    {
      at: 2,
      caption: "1人の手残りが−120円のまま、お客さんが10人から100人に増えると、損も1,200円から12,000円へと10倍になる。",
      alt: "AIの添削アプリの画面と、下がっていくグラフを前に、高校生が汗をかいて驚いている。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "boy", x: 275, face: "sweat", fx: "!" }] },
      extras: [
        { kind: "laptop", x: 70, y: 120, s: 1.1, text: "AI添削" },
        { kind: "chartDown", x: 170, y: 100, s: 1.1, text: "手残り" },
      ],
      labels: [
        { x: 115, y: 170, text: "1人−120円", tone: "red" },
        { x: 115, y: 210, text: "100人で損も10倍", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "体験会の会場費と材料費18,000円を、来た10人で割ると、1人を集める費用（獲得費用）は1,800円。お金は社長の会社が払う。",
      alt: "体験会の案内のチラシと材料の箱の横で、社長が、1人を集める費用を計算している。",
      art: { bg: "class", cast: [{ who: "社長", look: "teacher", x: 270, face: "think", fx: "idea" }] },
      extras: [
        { kind: "flyer", x: 90, y: 100, s: 1.2, text: "体験会" },
        { kind: "boxes", x: 90, y: 250, s: 0.7 },
      ],
      labels: [
        { x: 185, y: 40, text: "1人1,800円", tone: "blue" },
        { x: 95, y: 180, text: "会場費と材料費" },
      ],
    },
];
