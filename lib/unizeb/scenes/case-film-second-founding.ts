import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/film-second-founding。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 架空の人物で状況を描く。会社のロゴ・商品・フィルムの箱のデザインは描かない。実在の経営者は描かない。
export const SC_CASE_FILM_SECOND_FOUNDING: Scene[] = [
  {
    at: 0,
    caption: "デジタル化が急に進み、長く主力だった写真フィルムの需要が減っていく。手元にあるのは、写真のために磨いてきたフィルムの技術だった。",
    alt: "教室で、生徒が下がっていくグラフと技術と書かれたファイルを見ながら、考えこんでいる。",
    art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "chartDown", x: 110, y: 60, text: "フィルム" },
      { kind: "folder", x: 110, y: 160, text: "技術" },
    ],
    labels: [{ x: 110, y: 222, text: "第二の創業", tone: "red" }],
  },
  {
    at: 1,
    caption: "写真に使っていたTACフィルムを、液晶ディスプレイの偏光板を守るフィルムに生かした。化粧品や医薬品にも事業を広げた。",
    alt: "生徒と先生が、ひらめきの電球と液晶と書かれた画面を間にして、笑顔でうなずき合っている。",
    art: {
      bg: "class",
      cast: [{ who: "ミオ", look: "girl", x: 60, face: "smile" }, { who: "先生", look: "teacher", x: 280, face: "smile", flip: true }],
    },
    extras: [
      { kind: "bulbIdea", x: 170, y: 40 },
      { kind: "laptop", x: 170, y: 130, text: "液晶" },
    ],
    labels: [{ x: 170, y: 205, text: "技術を別の市場へ", tone: "blue" }],
  },
];
