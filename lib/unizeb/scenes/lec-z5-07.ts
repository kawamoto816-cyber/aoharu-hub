import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-07。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_07: Scene[] = [
    {
      at: 0,
      caption: "ソーシャルリスニングは、相手が書きそうな言葉で検索して読むだけ。返信やいいね、メッセージなど、自分から書き込んだり連絡したりはしない。",
      alt: "図書館の机で、高校生がスマートフォンで投稿を検索して読んでいる。返信のふきだしには、ばつの印がついている。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 275, face: "think" }], props: [{ kind: "book", x: 60, y: 245, s: 0.9 }] },
      extras: [
        { kind: "phone", x: 180, y: 150, s: 1.4, text: "検索" },
        { kind: "speech", x: 80, y: 60, s: 0.9, text: "返信" },
        { kind: "cross", x: 128, y: 40, s: 0.9 },
      ],
      labels: [
        { x: 85, y: 120, text: "書き込まない", tone: "red" },
        { x: 85, y: 160, text: "読むだけ", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "AIが分けた20件を、職員が1件ずつ要約と見比べて検収した。「最高かよ、また忘れた」のような皮肉など、4件が違っていた。",
      alt: "図書館の職員が、ノートパソコンに出たAIの分類を、付せんの要約と1件ずつ見比べ、合う印と違う印をつけている。",
      art: { bg: "class", cast: [{ who: "職員", look: "teacher", x: 280, face: "think", fx: "!" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "laptop", x: 115, y: 225, s: 1.3, text: "AIの分類" },
        { kind: "sticky", x: 115, y: 130, s: 1.1, text: "要約20件" },
        { kind: "check", x: 50, y: 60 },
        { kind: "cross", x: 180, y: 60 },
      ],
      labels: [
        { x: 50, y: 25, text: "合う16件", tone: "blue" },
        { x: 180, y: 25, text: "違う4件", tone: "red" },
      ],
    },
];
