import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/hanafuda-to-tvgame。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 架空の人物で状況を描く。会社のロゴ・実際のゲーム機やキャラクターの絵は描かない。実在の経営者は描かない。
export const SC_CASE_HANAFUDA_TO_TVGAME: Scene[] = [
  {
    at: 0,
    caption: "花札から始まり、トランプ、プラスチックのトランプと、80年あまりカードで続いてきた。次の一手を考える場面にいる。",
    alt: "生徒が、花札とトランプと書かれた2枚のふせんを見ながら、次に何をするか考えている。",
    art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "sticky", x: 70, y: 70, text: "花札" },
      { kind: "sticky", x: 160, y: 70, text: "トランプ" },
    ],
    labels: [
      { x: 115, y: 165, text: "80年あまりカード" },
      { x: 115, y: 205, text: "次の一手は？", tone: "red" },
    ],
  },
  {
    at: 1,
    caption: "1973年に業務用のレジャー、1977年に家庭用テレビゲーム機、1983年にファミリーコンピュータ。カードの会社は電子の遊びへ事業を広げた。",
    alt: "2人の生徒が、ゲームと書かれた画面と1983年のカレンダーを間にはさんで、楽しそうに笑っている。",
    art: {
      bg: "plain",
      cast: [{ who: "ハル", look: "girl", x: 60, face: "smile" }, { who: "アオ", look: "boy", x: 280, face: "smile", flip: true }],
    },
    extras: [
      { kind: "calendar", x: 170, y: 45, text: "1983年" },
      { kind: "laptop", x: 170, y: 140, text: "ゲーム" },
    ],
    labels: [{ x: 170, y: 212, text: "電子の遊びへ", tone: "blue" }],
  },
];
