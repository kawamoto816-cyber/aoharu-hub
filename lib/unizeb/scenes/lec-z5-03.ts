import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-03。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_03: Scene[] = [
    {
      at: 1,
      caption: "Googleトレンドで期間を「過去12か月」にし、グラフの左端（1年前）と右端（今）の数を写す。数は、いちばん多い時を100とした相対的な数。",
      alt: "高校生がノートパソコンで検索の数のグラフを見ながら、1年前の40と今の60を書き写している。",
      art: { bg: "class", cast: [{ who: "ミカ", look: "girl", x: 275, face: "think" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "chartUp", x: 120, y: 82, s: 1.2, text: "過去12か月" },
        { kind: "laptop", x: 120, y: 232, s: 1.3, text: "検索の数" },
      ],
      labels: [
        { x: 60, y: 140, text: "1年前40" },
        { x: 180, y: 140, text: "今60", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "テレビで紹介された週だけの山は一過性。暮らしの習慣が変わってゆるやかに上がる流れは持続。夏祭りの入口には、続く流れを選ぶ。",
      alt: "高校生が、下がっていくグラフと上がっていくグラフを見比べ、上がっていくほうを入口に選んでうなずいている。",
      art: { bg: "outdoor", cast: [{ who: "ソラ", look: "boy", x: 285, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "chartDown", x: 70, y: 100, s: 1.1, text: "テレビの山" },
        { kind: "chartUp", x: 185, y: 100, s: 1.1, text: "水筒 麦茶" },
        { kind: "check", x: 185, y: 230 },
      ],
      labels: [
        { x: 70, y: 165, text: "一過性", tone: "red" },
        { x: 185, y: 165, text: "持続", tone: "blue" },
      ],
    },
];
