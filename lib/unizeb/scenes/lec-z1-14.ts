import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-14。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_14: Scene[] = [
    {
      at: 0,
      caption: "「1回1,000円で手伝ってくれる？」が申し込み、「いいよ」が承諾。紙に書かなくても契約は成り立つので、条件は数字で文にして残しておく。",
      alt: "二人の高校生が向き合い、一人が頼みごとをし、もう一人がうなずいて引き受けている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 256, face: "smile" }, { who: "アオ", look: "boy", x: 84, face: "normal" }] },
      extras: [
        { kind: "speech", x: 92, y: 64, s: 1, text: "千円で頼める？" },
        { kind: "speech", x: 248, y: 64, s: 1, text: "いいよ" },
        { kind: "check", x: 170, y: 118 },
      ],
      labels: [
        { x: 92, y: 118, text: "申し込み", tone: "blue" },
        { x: 248, y: 118, text: "承諾", tone: "blue" },
        { x: 170, y: 18, text: "口約束でも契約", tone: "red" },
      ],
    },
    {
      at: 2,
      caption: "時計が22時に近づいたら、作業を保存して終える。18歳未満を雇って午後10時から午前5時に働かせることは原則禁止。ユニゼブでは自分の事業でも22時以降は作業しない。",
      alt: "高校生が、時計を見てノートパソコンを閉じ、作業を終えようとしている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 266, face: "normal" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "clock", x: 66, y: 88, s: 1, text: "22時" },
        { kind: "calendar", x: 170, y: 88, s: 0.9, text: "平日18-20" },
        { kind: "laptop", x: 116, y: 214, s: 0.9, text: "保存" },
      ],
      labels: [
        { x: 66, y: 152, text: "ここで終える", tone: "red" },
        { x: 170, y: 152, text: "連絡の時間", tone: "blue" },
        { x: 130, y: 20, text: "22時以降は作業なし", tone: "navy" },
      ],
    },
];
