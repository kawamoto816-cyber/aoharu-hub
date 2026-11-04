import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/boyan-slat。at は節の番号（0から）。
// 実在の人物は描かない。架空の生徒が、列伝の内容を自分の研究や振り返りに生かしている場面。
export const SC_DEN_BOYAN_SLAT: Scene[] = [
  {
    at: 1,
    caption: "スラットは高校の研究で、海のプラスチックの回収がなぜ無理と言われるのかを調べた。「無理」とされる理由を書き出して一つずつ見ていくと、変えられる所が見つかることがある。",
    alt: "教室で、生徒が机の上の海の地図を見て考えている。上には「無理な理由」と書いたふせんと、ひらめきの電球がある。",
    art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 275, face: "think", fx: "idea" }], props: [{ kind: "table", x: 0, y: 236 }, { kind: "map", x: 80, y: 214 }, { kind: "globe", x: 170, y: 212, s: 0.8 }] },
    extras: [
      { kind: "sticky", x: 70, y: 75, s: 1.1, text: "無理な理由" },
      { kind: "bulbIdea", x: 175, y: 75, s: 1 },
    ],
    labels: [{ x: 120, y: 150, text: "流れを使えないか", tone: "blue" }],
  },
  {
    at: 2,
    caption: "試作がうまくいかなかったら、何が起きたか、なぜ起きたか、次に何を変えるかを分けて書き出す。文化祭の出し物でも、終わったあとに同じやり方で振り返れる。",
    alt: "教室で、生徒2人が、下がったグラフと「起きたこと」「原因」と書いたふせんを見ながら、直す所を相談している。",
    art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 60, face: "think" }, { who: "アオ", look: "boy", x: 285, face: "smile", flip: true }] },
    extras: [
      { kind: "chartDown", x: 172, y: 62, s: 0.9, text: "試作1" },
      { kind: "sticky", x: 140, y: 150, s: 0.75, text: "起きたこと" },
      { kind: "sticky", x: 205, y: 205, s: 0.75, text: "原因" },
      { kind: "check", x: 140, y: 250, s: 0.7 },
    ],
    labels: [{ x: 172, y: 18, text: "分けて振り返る", tone: "navy" }],
  },
];
