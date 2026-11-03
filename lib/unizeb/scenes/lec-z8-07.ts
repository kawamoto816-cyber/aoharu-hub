import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-07。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_07: Scene[] = [
    {
      at: 1,
      caption: "1件100円の人に頼んでも、指示・確認・やり直しに1件60分かかる。8件で8時間、時給換算で8,000円。払うお金800円と合わせた総費用は8,800円。",
      alt: "高校生が、800円と書いたレシートと、1件60分を指す時計を見比べて、汗をかいている。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 270, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "receipt", x: 60, y: 75, s: 1.1 },
        { kind: "clock", x: 185, y: 75, text: "1件60分" },
        { kind: "scale", x: 110, y: 215, s: 1.1 },
      ],
      labels: [
        { x: 60, y: 140, text: "払う800円", tone: "blue" },
        { x: 185, y: 140, text: "時間8,000円", tone: "red" },
        { x: 110, y: 268, text: "総費用8,800円", tone: "navy" },
      ],
    },
    {
      at: 3,
      caption: "頼む前に、納期・修正回数・検収基準・遅れたときの扱いを、数や日付で発注メモに書く。「早めに」「ちゃんと」では判定できない。",
      alt: "机をはさんで2人の高校生が、発注メモとカレンダーを見ながら取り決めを書きこんでいる。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 60, face: "think" }, { who: "ハル", look: "girl", x: 290, face: "normal", flip: true }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "folder", x: 175, y: 70, s: 1.2, text: "発注メモ" },
        { kind: "calendar", x: 175, y: 222, s: 0.9, text: "20日まで" },
      ],
      labels: [
        { x: 175, y: 132, text: "修正2回まで", tone: "blue" },
        { x: 175, y: 164, text: "誤り0か所", tone: "red" },
      ],
    },
];
