import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-02。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_02: Scene[] = [
    {
      at: 1,
      caption: "通知の音がきっかけになり、考える前に手がスマホにのびる。これが習慣のループの入口。",
      alt: "机で作業していた高校生が、通知の鳴ったスマホに、思わず手をのばしている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 250, face: "surprise", fx: "!", hand: [182, 206] }], props: [{ kind: "table", x: 0, y: 236 }] },
      extras: [
        { kind: "phone", x: 160, y: 208, s: 1.1, text: "通知" },
        { kind: "flyer", x: 90, y: 200, s: 0.8, text: "下書き" },
      ],
      labels: [
        { x: 160, y: 40, text: "きっかけ：通知", tone: "red" },
        { x: 160, y: 84, text: "考える前に手が出る" },
      ],
    },
    {
      at: 4,
      caption: "なくせるきっかけは、なくしてしまう。「もし机に向かったら、スマホを台所の充電器に置いてから問題集を開く」。",
      alt: "スマホを机から離れた所に置き、高校生が笑顔で問題集を開いている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 100, face: "smile", hand: [168, 214] }], props: [{ kind: "table", x: 0, y: 236 }, { kind: "book", x: 200, y: 214, s: 0.6 }] },
      extras: [
        { kind: "phone", x: 268, y: 84, s: 0.9 },
        { kind: "check", x: 300, y: 196 },
      ],
      labels: [
        { x: 190, y: 30, text: "スマホは台所へ", tone: "blue" },
        { x: 210, y: 140, text: "もし机に向かったら" },
      ],
    },
];
