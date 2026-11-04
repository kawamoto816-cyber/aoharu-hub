import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-14。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_14: Scene[] = [
    {
      at: 3,
      caption: "アプリが広まるかと、テストの日程が早まるか。独立な2つの軸の組み合わせで、名前のついた{{4つの未来}}ができる。不利な「急ぎのアプリ時代」も必ず描く。",
      alt: "高校生が「4つの未来」と書いたボードの横に立っている。上に「いつもの」「アプリと並ぶ」「駆けこみ」「急ぎのアプリ時代」の4つの名前が2段に並び、急ぎのアプリ時代だけ赤い。",
      art: { bg: "class", cast: [{ who: "メイ", look: "girl", x: 280, face: "think", fx: "idea", flip: true }], props: [{ kind: "board", x: 120, y: 160, text: "4つの未来" }] },
      labels: [
        { x: 70, y: 30, text: "いつもの", tone: "blue" },
        { x: 180, y: 30, text: "アプリと並ぶ", tone: "blue" },
        { x: 70, y: 76, text: "駆けこみ", tone: "blue" },
        { x: 180, y: 76, text: "急ぎのアプリ時代", tone: "red" },
        { x: 120, y: 118, text: "軸2つで4つ", tone: "navy" },
      ],
    },
    {
      at: 5,
      caption: "学校の行事予定とアプリの料金の発表を、週1回5分だけ見る。{{出典と取得日}}を書き、先週とのちがいを1行で残す。",
      alt: "高校生が、カレンダーとスマートフォンとストップウォッチを前に、ノートパソコンで記録をつけている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 282, face: "normal", flip: true }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "calendar", x: 56, y: 88, s: 1, text: "行事予定" },
        { kind: "phone", x: 132, y: 88, s: 1, text: "料金" },
        { kind: "stopwatch", x: 206, y: 88, s: 1, text: "5分" },
        { kind: "laptop", x: 120, y: 226, s: 1.2, text: "取得日" },
      ],
      labels: [
        { x: 132, y: 22, text: "週1回だけ見る", tone: "blue" },
        { x: 120, y: 160, text: "出典と取得日", tone: "red" },
      ],
    },
];
