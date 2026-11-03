import type { OshieruSet } from "../types";

// 小1 算数「くり上がりのあるたし算」。もと：lib/lecture/data/e-math-1-kuriagari.ts の mistakes[0]・[1]、check[0]・[1]、本文の節2・節3。
export const OSHIERU_E_MATH_1_KURIAGARI: OshieruSet = {
  unit: "e-math-1-kuriagari",
  grade: "low",
  topic: "くりあがりの たしざん",
  misconceptions: [
    {
      mistake: 0,
      kind: "common",
      opener: "8＋5 って むずかしいね。ぼく、5を 1と 4に わけて みたよ。8と 1で 9……あれ？ 10に ならない。",
      belief: "8＋5 で、5を 1と 4に わければ よいと おもっている（あと いくつで 10かを たしかめていない）。",
      understoodWhen: ["8は あと 2で 10 だと いう", "だから 5を 2と 3に わける"],
      probe: "どうして 2なの？ 1じゃ だめ？",
      ack: "わあ、8と 2で 10の まとまりが できた！",
    },
    {
      mistake: 1,
      kind: "common",
      opener: "じゃあ こたえは 10だね！",
      belief: "10が できたら、こたえを 10に して しまう（のこりの 3を たすのを わすれる）。",
      understoodWhen: ["のこりの 3を わすれている と いう", "10と 3で 13"],
      probe: "のこり？ どこに のこって いるの？",
      ack: "そっか、のこりが あったんだ！ 10と 3で 13！",
    },
  ],
  restatements: [
    { id: "r-ok", text: "じゃあ 7＋5も やって みるね。7は あと 3で 10。5を 3と 2に わけて、10と 2で 12！ あってる？", flawed: false, check: 1 },
    {
      id: "r-flaw",
      text: "じゃあ 8＋6も やって みるね。8は あと 2で 10。6を 2と 3に わけて、10と 3で 13！ あってる？",
      flawed: true,
      flaw: "6を 2と 3に わけて いる",
      fix: "6は 2と 4。10と 4で 14",
      check: 0,
    },
  ],
  hints: {
    tatoeru: "おはじきが 8こ あって、",
    zu: "ブロックを ならべると、",
    rei: "たとえば 9＋4 なら、",
  },
  wordCards: ["8は あと 2で 10", "5を 2と 3に わける", "10の まとまり", "のこりは 3", "10と 3で 13", "おはじきで かんがえると", "あと いくつで 10か 見る", "のこりを たすのを わすれてる"],
};
