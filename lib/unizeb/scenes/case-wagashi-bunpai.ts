import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/wagashi-bunpai。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 売上は和菓子店が受け取り、生徒はお金を預からない。実在の店や商品は描かない。
export const SC_CASE_WAGASHI_BUNPAI: Scene[] = [
  {
    at: 0,
    caption: "半年で売上120万円。でも経費が80万円あり、覚書には「利益」が何かが書いていなかった。和菓子店の店主と生徒が、分け方で考えこむ。",
    alt: "商店街の和菓子店の前で、生徒と店主がレシートを前に困った顔をしている。",
    art: {
      bg: "outdoor",
      cast: [
        { who: "ハル", look: "girl", x: 215, face: "think", fx: "?" },
        { who: "店主", look: "teacher", x: 298, face: "sweat", flip: true },
      ],
    },
    extras: [
      { kind: "shop", x: 85, y: 160, text: "和菓子" },
      { kind: "receipt", x: 175, y: 50 },
    ],
    labels: [
      { x: 270, y: 40, text: "売上120万円", tone: "navy" },
      { x: 270, y: 85, text: "経費80万円", tone: "red" },
    ],
  },
  {
    at: 1,
    caption: "立て替えた経費を先に返し、手残り40万円を作業時間の割合の6対4で分けた。時給換算はどちらも2,000円。生徒側の取り分は学校が管理する口座で受け取る。",
    alt: "生徒と店主が、帳面と天びんの絵を前に、笑顔でうなずき合っている。",
    art: {
      bg: "outdoor",
      cast: [
        { who: "ハル", look: "girl", x: 60, face: "smile" },
        { who: "店主", look: "teacher", x: 280, face: "smile", flip: true },
      ],
    },
    extras: [
      { kind: "ledger", x: 85, y: 55, text: "手残り40万" },
      { kind: "scale", x: 250, y: 55 },
      { kind: "check", x: 170, y: 235, s: 0.8 },
    ],
    labels: [
      { x: 170, y: 150, text: "経費を先に返す", tone: "blue" },
      { x: 170, y: 195, text: "店24万・生徒16万", tone: "red" },
    ],
  },
];
