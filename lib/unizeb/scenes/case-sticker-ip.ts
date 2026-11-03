import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/sticker-ip。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 既存のキャラクターに似た絵は描かない（ステッカーはふせんの形だけで表す）。売上は保護者が管理する場面にする。
export const SC_CASE_STICKER_IP: Scene[] = [
  {
    at: 0,
    caption: "月80枚、1枚300円。売上の6割は人気アニメのキャラクターに似せた絵だった。この絵を売り続けてよいのかが気になり始める。",
    alt: "夕方の部屋で、生徒がノートパソコンの注文の数と、机の上のステッカーを見て首をかしげている。",
    art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "sticky", x: 110, y: 50, text: "6割は？" },
      { kind: "laptop", x: 110, y: 150, text: "月80枚" },
    ],
    labels: [{ x: 110, y: 195, text: "1枚300円", tone: "red" }],
  },
  {
    at: 1,
    caption: "文化庁と特許庁の説明、条文、権利者のガイドラインを確かめて、似せた絵の販売をやめた。オリジナルに切りかえ、3か月目に月60枚まで戻した。",
    alt: "生徒と保護者が、決まりのファイルと条文の帳面を確かめ終えて、うなずき合っている。",
    art: {
      bg: "plain",
      cast: [{ who: "ハル", look: "girl", x: 55, face: "smile" }, { who: "保護者", look: "teacher", x: 285, face: "normal", flip: true }],
    },
    extras: [
      { kind: "folder", x: 125, y: 55, text: "決まり" },
      { kind: "ledger", x: 215, y: 55, text: "条文" },
      { kind: "check", x: 170, y: 235, s: 0.8 },
    ],
    labels: [
      { x: 170, y: 150, text: "オリジナルに切りかえ", tone: "red" },
      { x: 170, y: 195, text: "売上は保護者が管理", tone: "blue" },
    ],
  },
];
