import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-04。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_04: Scene[] = [
    {
      at: 2,
      caption: "月の固定費3,000円を1件の手残り900円で割ると3.33件。3件では2,700円で届かないので、切り上げて月4件が黒字化に要る件数。",
      alt: "帳面と、上がっていくグラフの横で、高校生が割り算を考えている。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 275, face: "think", fx: "idea" }] },
      extras: [
        { kind: "ledger", x: 75, y: 110, s: 1.2, text: "固定費" },
        { kind: "chartUp", x: 175, y: 95, s: 1.1, text: "月4件" },
      ],
      labels: [
        { x: 110, y: 190, text: "3,000÷900", tone: "blue" },
        { x: 110, y: 230, text: "切り上げて4件", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "撮影用のライトは後回しにして、晴れた日の昼に、スマホと窓の光で商品を撮る。必須の支出だけを先に払う。",
      alt: "明るい日の光の下で、高校生がスマートフォンで手づくりのブローチを撮っている。横に、必須の支出を書いたふせんがある。",
      art: { bg: "plain", cast: [{ who: "Aさん", look: "girl", x: 272, face: "smile" }], props: [{ kind: "sun", x: 60, y: 45, s: 0.9 }] },
      extras: [
        { kind: "phone", x: 90, y: 150, s: 1.3, text: "撮影" },
        { kind: "sticky", x: 175, y: 70, s: 1, text: "必須だけ" },
        { kind: "check", x: 175, y: 160, s: 0.8 },
      ],
      labels: [
        { x: 120, y: 235, text: "ライトは後回し", tone: "blue" },
      ],
    },
];
