import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/izumo-mitsuru。at は節の番号（0から）。
// 実在の人物・会社のロゴ・商品は描かない。断られた理由を言葉にして説明を直す場面を、架空の高校生で描く。
export const SC_DEN_IZUMO_MITSURU: Scene[] = [
    {
      at: 2,
      caption: "断られた理由（実績がない、知られていない）をふせんに書き出すと、次に何を説明し直せばよいかが見えてくる。列伝の出来事を、架空の高校生の提案に置きかえた場面。",
      alt: "提案書のそばにバツ印がならび、ふせんに断られた理由が書かれている。その横で高校生が考えこみ、少し先にはチェック印がある。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 282, face: "think", fx: "?", flip: true }] },
      extras: [
        { kind: "folder", x: 55, y: 70, s: 1.0, text: "提案書" },
        { kind: "cross", x: 135, y: 55, s: 0.6 },
        { kind: "cross", x: 185, y: 55, s: 0.6 },
        { kind: "sticky", x: 70, y: 175, text: "実績がない" },
        { kind: "sticky", x: 70, y: 240, text: "知られてない" },
        { kind: "check", x: 180, y: 190, s: 0.8 },
      ],
      labels: [
        { x: 160, y: 100, text: "断られた理由", tone: "red" },
        { x: 180, y: 240, text: "最初の一社", tone: "blue" },
      ],
    },
];
