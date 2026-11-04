import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/soma-kokko。at は節の番号（0から）。
// 実在の人物・店のロゴ・商品は描かない。列伝の考え方を、架空の高校生と先生の場面に置きかえて描く。
export const SC_DEN_SOMA_KOKKO: Scene[] = [
    {
      at: 1,
      caption: "列伝の出来事を、架空の高校生の場面に置きかえた絵。前の年にうまくいかなかった模擬店を引き継ぐとき、担当していた先生に失敗の理由を聞き、自分たちの決まりに書きかえる。相馬夫妻も、前の店の失敗を聞き取って店の決まりをつくった。",
      alt: "教室で、高校生が先生から前の店の話を聞いて考えている。あいだに店の絵と、現金で買う・決まりにと書いたふせんがある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 60, face: "think", fx: "idea" }, { who: "先生", look: "teacher", x: 282, face: "normal", flip: true }] },
      extras: [
        { kind: "shop", x: 170, y: 80, s: 0.8, text: "前の店" },
        { kind: "sticky", x: 150, y: 200, text: "現金で買う" },
        { kind: "sticky", x: 192, y: 250, text: "決まりに" },
      ],
      labels: [
        { x: 170, y: 140, text: "失敗の理由を聞く", tone: "red" },
      ],
    },
    {
      at: 2,
      caption: "どこに店を出すか迷ったら、地図の上で考えるだけでなく、実際にそれぞれの場所で売ってみて比べる。中村屋も約1年、パンを売り歩いて日本橋と新宿を比べた。",
      alt: "高校生が、地図をはさんで、伸びないグラフと伸びるグラフを見比べて考えている。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 285, face: "think", fx: "?", flip: true }], props: [{ kind: "map", x: 125, y: 230, s: 1.1 }] },
      extras: [
        { kind: "chartDown", x: 70, y: 70, s: 0.9, text: "学生街" },
        { kind: "chartUp", x: 180, y: 70, s: 0.9, text: "新しい町" },
      ],
      labels: [
        { x: 70, y: 135, text: "伸びない", tone: "red" },
        { x: 180, y: 135, text: "見込みあり", tone: "blue" },
        { x: 125, y: 175, text: "売って比べる", tone: "navy" },
      ],
    },
];
