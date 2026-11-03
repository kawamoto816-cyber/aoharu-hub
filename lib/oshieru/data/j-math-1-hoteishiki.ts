import type { OshieruSet } from "../types";

// 中1 数学「一次方程式」。もと：lib/lecture/data/j-math-1-hoteishiki.ts の mistakes[0]・[3]、節1（等式の性質と移項）の本文と reveal、check[1]、節2の本文（すべての項に）。
export const OSHIERU_J_MATH_1_HOTEISHIKI: OshieruSet = {
  unit: "j-math-1-hoteishiki",
  grade: "mid",
  topic: "一次方程式",
  misconceptions: [
    {
      mistake: 0,
      kind: "common",
      opener: "3x−5=7 を解いてみたよ。−5 を右に移して 3x=7−5=2。だから x は……2÷3？ わりきれなくて変だなあ。",
      belief: "移項するとき、符号を変えずにそのまま反対側へ移してよいと思っている。",
      understoodWhen: ["移項すると符号が変わる", "両辺に5をたすと、左辺の −5 が消えて右辺に +5 が残る（等式の性質）", "3x=12"],
      probe: "どうして移すと符号が変わるの？ 場所が変わるだけじゃないの？",
      ack: "あ、両辺に5をたしたのを1行で書いたのが移項なんだ！ だから 3x=7+5=12 になるんだね。",
    },
    {
      mistake: 3,
      kind: "common",
      opener: "じゃあ 3x=12 だから、x を残すには3をひいて x=12−3=9 だね！",
      belief: "3x から x を残すには、両辺から3をひけばよいと思っている。",
      understoodWhen: ["3x は 3×x のこと", "両辺を3でわる", "x=4"],
      probe: "3x の3って、たしてあるんじゃないの？",
      ack: "3x は 3×x だから、両辺を3でわるんだ。x=4！ 3×4−5=7 で、ちゃんと合ってる！",
    },
  ],
  restatements: [
    {
      id: "r-ok",
      text: "じゃあ 3(x−2)=x+4 も解いてみるね。かっこをはずして 3x−6=x+4。移項すると符号が変わるから 3x−x=4+6、2x=10、両辺を2でわって x=5！",
      flawed: false,
      check: 1,
    },
    {
      id: "r-flaw",
      text: "じゃあ 3(x−2)=x+4 も解いてみるね。かっこをはずして 3x−2=x+4。移項すると符号が変わるから 3x−x=4+2、2x=6、両辺を2でわって x=3！",
      flawed: true,
      flaw: "かっこをはずすとき −2 にも3をかけていない",
      fix: "3×(−2)=−6 で 3x−6=x+4。x=5（すべての項にかける）",
      check: 1,
    },
  ],
  hints: {
    tatoeru: "方程式をてんびんにたとえると、",
    zu: "線分図にすると、x 3つ分と",
    rei: "例えば x=4 を入れてたしかめると、",
  },
};
