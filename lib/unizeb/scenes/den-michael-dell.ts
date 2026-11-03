import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/michael-dell。at は節の番号（0から）。
// 実在の人物・会社のロゴ・商品は描かない。架空の高校生で、節の考え方を身近な場面にして描く。
export const SC_DEN_MICHAEL_DELL: Scene[] = [
    {
      at: 1,
      caption: "注文を受けてから組み立てて、客に直接届ける。文化祭のクラスTシャツも、注文の数がそろってから業者に頼めば、作りおきの余りが出にくい（お金は先生が預かる）。",
      alt: "スマートフォンの注文から矢印で箱へ、箱から矢印で封筒へと流れる図の横で、高校生がうなずいている。",
      art: {
        bg: "plain",
        cast: [{ who: "ハル", look: "girl", x: 288, face: "smile" }],
        props: [
          { kind: "arrow", x: 82, y: 110, s: 0.5 },
          { kind: "arrow", x: 178, y: 110, s: 0.5 },
        ],
      },
      extras: [
        { kind: "phone", x: 40, y: 110, s: 1.1, text: "注文" },
        { kind: "boxes", x: 130, y: 132, s: 0.75 },
        { kind: "mail", x: 216, y: 110, s: 0.75 },
        { kind: "sticky", x: 120, y: 236, text: "作りおきなし" },
      ],
      labels: [
        { x: 40, y: 160, text: "注文", tone: "blue" },
        { x: 130, y: 160, text: "組み立て", tone: "blue" },
        { x: 216, y: 160, text: "届ける", tone: "blue" },
        { x: 130, y: 36, text: "注文が先、作るのは後", tone: "navy" },
      ],
    },
    {
      at: 2,
      caption: "注文を受けてから組み立てる会社でも、売れる数を見込みすぎて部品や製品を抱えると、売れ残りで手元のお金が苦しくなる。",
      alt: "積み上がった段ボール箱と、下がるグラフを前に、高校生があせっている。",
      art: {
        bg: "plain",
        cast: [{ who: "アオ", look: "boy", x: 285, face: "sweat", fx: "sweat" }],
      },
      extras: [
        { kind: "boxes", x: 60, y: 255, s: 0.9 },
        { kind: "boxes", x: 140, y: 255, s: 0.9 },
        { kind: "cross", x: 100, y: 165, s: 0.8 },
        { kind: "chartDown", x: 170, y: 105, s: 0.9, text: "利益" },
      ],
      labels: [
        { x: 120, y: 30, text: "売れる数を見込みすぎ", tone: "red" },
        { x: 212, y: 200, text: "売れ残り", tone: "red" },
      ],
    },
];
