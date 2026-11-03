import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-07。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_07: Scene[] = [
    {
      at: 2,
      caption: "「見ないと損！」で始まった動画を最後まで見たのに、本編はふつうの紹介だった。約束が回収されないと、見た人は「何の損だったの？」とがっかりし、次のフックを信じなくなる。",
      alt: "スマートフォンの画面に「見ないと損」の文字と赤いバツ印。横で高校生が首をかしげて、がっかりしている。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 270, face: "sweat", fx: "?" }] },
      extras: [
        { kind: "phone", x: 110, y: 105, s: 1.8, text: "損！" },
        { kind: "cross", x: 175, y: 105 },
      ],
      labels: [
        { x: 110, y: 28, text: "「見ないと損！」", tone: "navy" },
        { x: 110, y: 185, text: "何の損だったの？", tone: "red" },
        { x: 110, y: 225, text: "次はもう見ない" },
      ],
    },
    {
      at: 4,
      caption: "AIに5つの型で1本ずつ案を出してもらい、本編で回収できて誇大な言葉のない3本を、自分で残す。残した理由も書く。",
      alt: "教室で、高校生がノートパソコンに出たフックの案を見比べ、型のちがう3枚のふせんを選んでいる。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 80, face: "think", fx: "idea" }] },
      extras: [
        { kind: "laptop", x: 230, y: 200, s: 1.1, text: "AI案5本" },
        { kind: "sticky", x: 230, y: 70, s: 1.4, text: "問い・数字・共感" },
        { kind: "check", x: 170, y: 125 },
      ],
      labels: [
        { x: 230, y: 125, text: "残す3本", tone: "blue" },
        { x: 230, y: 255, text: "回収できる？", tone: "navy" },
      ],
    },
];
