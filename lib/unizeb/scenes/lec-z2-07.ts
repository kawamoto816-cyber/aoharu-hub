import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-07。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_07: Scene[] = [
    {
      at: 1,
      caption: "お手本の文に書くのは、毎回同じ所。変数にするのは、相手の呼び名や希望の日時のように、相手ごとに入れかわる所だけ。",
      alt: "お手本の文が書かれた紙と、「呼び名」「日時」のふせんを見比べながら、高校生が考えている。紙には「値段は固定」の注記がある。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 270, face: "think", fx: "?" }] },
      extras: [
        { kind: "flyer", x: 110, y: 78, s: 1.2, text: "お手本" },
        { kind: "sticky", x: 60, y: 200, text: "呼び名" },
        { kind: "sticky", x: 150, y: 200, text: "日時" },
      ],
      labels: [
        { x: 110, y: 150, text: "値段は固定", tone: "red" },
        { x: 105, y: 256, text: "変数にする", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "AIの下書きは、値段・日時・場所が事実と合うかを人が読んで確かめる。送るのは、直したあとに人がする。",
      alt: "机のノートパソコンに出た下書きを、高校生が指でさしながら確かめている。上に「値段」「日時」「場所」の注記とチェックの印がある。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 270, face: "think", hand: [170, 200] }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "laptop", x: 110, y: 226, s: 1.2, text: "下書き" },
        { kind: "mail", x: 190, y: 50 },
      ],
      labels: [
        { x: 60, y: 40, text: "値段", tone: "blue" },
        { x: 60, y: 80, text: "日時", tone: "blue" },
        { x: 60, y: 120, text: "場所", tone: "blue" },
        { x: 190, y: 98, text: "送るのは人", tone: "red" },
      ],
    },
];
