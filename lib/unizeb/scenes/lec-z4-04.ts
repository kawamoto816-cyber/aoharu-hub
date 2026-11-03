import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-04。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_04: Scene[] = [
    {
      at: 1,
      caption: "宣伝・SNS・チラシと原因を3つ挙げても、どれも「知ってもらう」という同じ枝の中で{{重なって}}いる。申込みの割合と単価の枝は{{漏れて}}いた。",
      alt: "教室で教室長が首をかしげている。左にメガホン・スマートフォン・チラシが1列に並び、その下の「割合」と「単価」には赤いばつ印がついている。",
      art: { bg: "class", cast: [{ who: "教室長", look: "teacher", x: 284, face: "think", fx: "?" }] },
      extras: [
        { kind: "megaphone", x: 46, y: 104, s: 0.9 },
        { kind: "phone", x: 112, y: 104, s: 1, text: "SNS" },
        { kind: "flyer", x: 176, y: 104, s: 0.8, text: "チラシ" },
        { kind: "cross", x: 66, y: 240 },
        { kind: "cross", x: 176, y: 240 },
      ],
      labels: [
        { x: 112, y: 26, text: "3つとも宣伝の枝", tone: "red" },
        { x: 112, y: 52, text: "知ってもらう", tone: "navy" },
        { x: 66, y: 200, text: "割合：漏れ", tone: "red" },
        { x: 176, y: 200, text: "単価：漏れ", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "目標を1とした割合でそろえると、申込みの割合が0.5でいちばん目標から遠い。宣伝より先に、体験会の最後の説明と申込みの紙の渡し方を見直す。",
      alt: "高校生と教室長が、記録の帳面をはさんで話している。上に、人数0.8・割合0.5・単価1.0の3つの数字が並び、割合だけが赤い。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 66, face: "smile", fx: "idea" }, { who: "教室長", look: "teacher", x: 274, face: "normal", flip: true }] },
      extras: [
        { kind: "ledger", x: 170, y: 226, text: "体験会" },
      ],
      labels: [
        { x: 170, y: 24, text: "人数 0.8", tone: "blue" },
        { x: 170, y: 52, text: "割合 0.5", tone: "red" },
        { x: 170, y: 80, text: "単価 1.0", tone: "blue" },
        { x: 170, y: 112, text: "差の大きい枝から" },
      ],
    },
];
