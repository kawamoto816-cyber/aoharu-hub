import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/yoshifuji-ory。at は節の番号（0から）。
// 実在の人物は描かない。架空の生徒が、孤独を生む流れ（移動・対話・役割）を考える場面にする。
export const SC_DEN_YOSHIFUJI_ORY: Scene[] = [
  {
    at: 1,
    caption: "行けない、だから話せない、だから役割をもてない。孤独を生む流れを書き出してみると、どこを断ち切ればよいかが見えてくる。分身ロボットは、最初の「行けない」のところに手を打つ道具だった。",
    alt: "教室で、生徒が移動・対話・役割という3つの言葉を見上げて考えている。その下のノートパソコンの画面には遠隔参加と書かれている。",
    art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 285, face: "think", fx: "idea", flip: true }] },
    extras: [
      { kind: "laptop", x: 110, y: 190, s: 1.2, text: "遠隔参加" },
    ],
    labels: [
      { x: 55, y: 40, text: "移動", tone: "navy" },
      { x: 135, y: 40, text: "対話", tone: "navy" },
      { x: 215, y: 40, text: "役割", tone: "navy" },
      { x: 125, y: 85, text: "行けない→話せない", tone: "red" },
      { x: 110, y: 255, text: "分身をその場に", tone: "blue" },
    ],
  },
];
