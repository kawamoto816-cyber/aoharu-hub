import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-09。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_09: Scene[] = [
    {
      at: 1,
      caption: "声をかけたい知っている人を、仮名で4人書き出し、関係の強さと痛みの有無の印をつける。最初の1人は、関係が強く、課題で困ったと聞いたいとこA。",
      alt: "高校生が、付せんに仮名で書いた4人の名前と、関係と痛みの印を見比べ、いとこAに丸をつけている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 285, face: "think", fx: "idea" }] },
      extras: [
        { kind: "sticky", x: 100, y: 55, s: 1.2, text: "仮名で" },
        { kind: "check", x: 200, y: 128, s: 0.8 },
      ],
      labels: [
        { x: 100, y: 128, text: "いとこA 強・ある", tone: "blue" },
        { x: 100, y: 163, text: "後輩B 中・たぶん" },
        { x: 100, y: 198, text: "同級生D 強・ない" },
        { x: 100, y: 233, text: "近所C 弱・ない" },
      ],
    },
    {
      at: 4,
      caption: "声かけ文は、送る前に保護者に見てもらう。確認を受けたら、本人が1件ずつ、その人に合わせた文で送る。一斉送信はしない。",
      alt: "家の台所で、高校生がスマートフォンの声かけ文を母親に見せ、母親がうなずいている。",
      art: {
        bg: "kitchen",
        cast: [
          { who: "ハル", look: "girl", x: 270, face: "normal" },
          { who: "母", look: "teacher", x: 85, face: "smile" },
        ],
      },
      extras: [{ kind: "phone", x: 178, y: 80, s: 1.3, text: "送る" }],
      labels: [
        { x: 80, y: 30, text: "確認のあと", tone: "blue" },
        { x: 262, y: 30, text: "一斉送信しない", tone: "red" },
        { x: 178, y: 135, text: "1件ずつ" },
      ],
    },
];
