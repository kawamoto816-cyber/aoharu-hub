import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/mori-hanae。at は節の番号（0から）。
// 実在の人物は描かない。架空の高校生と先生で、節の考え方を身近な場面にして描く。
export const SC_DEN_MORI_HANAE: Scene[] = [
    {
      at: 1,
      caption: "森は、日本の布の技を、海外の人が着たいドレスの形に合わせ直した。身近な良さ（たとえば地元の布）も、相手がほしい形に変えると新しい価値になる。",
      alt: "高校生が、地元の布を表すふせんから矢印の先のTシャツを見て、組み合わせを思いついている。",
      art: {
        bg: "class",
        cast: [{ who: "ハル", look: "girl", x: 285, face: "think", fx: "idea" }],
        props: [
          { kind: "arrow", x: 138, y: 228, s: 0.8 },
          { kind: "tshirt", x: 195, y: 250, s: 1.3 },
        ],
      },
      extras: [
        { kind: "sticky", x: 70, y: 228, text: "地元の布" },
      ],
      labels: [
        { x: 70, y: 180, text: "身近な良さ", tone: "blue" },
        { x: 195, y: 180, text: "着たい形", tone: "blue" },
        { x: 130, y: 60, text: "組み合わせて変える", tone: "navy" },
      ],
    },
    {
      at: 2,
      caption: "作品や名前の評判（ブランド）が上がっていても、会社のお金の出入りが崩れれば事業は続かない。2つは別々に見ておく。",
      alt: "先生と高校生のあいだに天びんがあり、片方に上がるグラフ、もう片方に下がるグラフが置かれている。",
      art: {
        bg: "class",
        cast: [
          { who: "アオ", look: "boy", x: 60, face: "think", fx: "?" },
          { who: "先生", look: "teacher", x: 280, face: "normal", flip: true },
        ],
      },
      extras: [
        { kind: "scale", x: 170, y: 110, s: 1.4 },
        { kind: "chartUp", x: 135, y: 222, s: 0.8, text: "評判" },
        { kind: "chartDown", x: 205, y: 222, s: 0.8, text: "お金" },
      ],
      labels: [
        { x: 115, y: 40, text: "ブランドの評判", tone: "blue" },
        { x: 230, y: 40, text: "会社のお金", tone: "red" },
        { x: 170, y: 264, text: "別々に見る", tone: "navy" },
      ],
    },
];
