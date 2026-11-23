import type { OshieruSet } from "../types";

// 高校 数学Ⅱ「積分法」。もと：lib/lecture/data/h-math-2-sekibun の mistakes[1]・mistakes[3]、check[0]・check[1]。
// mistakes[0]（積分定数のつけわすれ）は wrong の式が right の式にふくまれていて、機械の型では作れないため使わない。
export const OSHIERU_H_MATH_2_SEKIBUN: OshieruSet = {
  unit: "h-math-2-sekibun",
  grade: "high",
  topic: "積分法",
  misconceptions: [
    {
      mistake: 1,
      kind: "common",
      opener: "積分って微分の逆でしょ？ だから ∫x² dx ＝ 2x ＋ C だと思うんだけど、合ってるよね？",
      belief: "∫x² dx ＝ 2x ＋ C だと思っている（積分を微分と取りちがえている）。",
      understoodWhen: ["∫x² dx ＝ x³/3 ＋ C", "微分と取りちがえています。指数を1ふやして、ふやした数でわります。"],
      probe: "え、でも ∫x² dx ＝ 2x ＋ C じゃないの？ 2x ＋ C を微分したら 2 になっちゃう…？",
      ack: "そっか、∫x² dx ＝ x³/3 ＋ C なんだ！ x³/3 を微分したら x² にもどるもんね。",
    },
    {
      mistake: 3,
      kind: "common",
      opener: "あと定積分の計算で、ぼくは [F(x)]ₐᵇ ＝ F(a) − F(b) って覚えてるんだけど、これでいいよね？",
      belief: "[F(x)]ₐᵇ ＝ F(a) − F(b) だと思っている（上端と下端を逆にひいている）。",
      understoodWhen: ["[F(x)]ₐᵇ ＝ F(b) − F(a)", "上端の値から下端の値をひきます。逆にすると符号が反対になります。"],
      probe: "[F(x)]ₐᵇ ＝ F(a) − F(b) でも、引く順番なんてどっちでも同じじゃないの？",
      ack: "わかった、[F(x)]ₐᵇ ＝ F(b) − F(a) で、上の端から下の端をひくんだね。",
    },
  ],
  restatements: [
    {
      id: "r-ok",
      text: "つまり ∫x² dx ＝ x³/3 ＋ C みたいに、指数を1ふやして、ふやした数でわるんだね。だから ∫(4x³−2x)dx は x⁴ − x² ＋ C！",
      flawed: false,
      check: 0,
    },
    {
      id: "r-flaw",
      text: "∫x² dx ＝ x³/3 ＋ C はわかった！ あとは [F(x)]ₐᵇ ＝ F(a) − F(b) だから、∫₀²(3x²＋1)dx は [x³＋x]₀² で 0 − 10 ＝ −10 だね。",
      flawed: true,
      flaw: "[F(x)]ₐᵇ ＝ F(a) − F(b) のまま、下端から上端をひいている",
      fix: "[F(x)]ₐᵇ ＝ F(b) − F(a)。上端の値から下端の値をひきます。逆にすると符号が反対になります。答えは (8＋2) − 0 ＝ 10",
      check: 1,
    },
  ],
  hints: {
    tatoeru: "微分を「下る坂」、積分を「その坂をのぼってもどる道」にたとえると、",
    zu: "グラフをかいて、x 軸との間の面積で考えると、",
    rei: "例えば x³/3 を微分してみると、",
  },
};
