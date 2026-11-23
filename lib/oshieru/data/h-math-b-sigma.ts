import type { OshieruSet } from "../types";

// 高校 数学B「いろいろな数列（Σ）」。もと：lib/lecture/data/h-math-b-sigma の mistakes[1]・mistakes[2]、check[0]。
// mistakes[0] は wrong の式が right の式にふくまれていて、機械の型では作れないため使わない。
export const OSHIERU_H_MATH_B_SIGMA: OshieruSet = {
  unit: "h-math-b-sigma",
  grade: "high",
  topic: "いろいろな数列（Σ）",
  misconceptions: [
    {
      mistake: 1,
      kind: "common",
      opener: "Σk はもう覚えたから、2乗の和は Σk² ＝ (Σk)² で計算すればいいんでしょ？ 楽だよね。",
      belief: "Σk² ＝ (Σk)² だと思っている（2乗の和と、和の2乗を同じだと思っている）。",
      understoodWhen: ["Σk² ＝ n(n＋1)(2n＋1)/6", "n＝2 で Σk²＝1＋4＝5、(Σk)²＝3²＝9 とちがいます。2乗の和には専用の公式を使います（(Σk)² と等しいのは Σk³ のほう）。"],
      probe: "でも Σk² ＝ (Σk)² でも、だいたい同じくらいにならないの？",
      ack: "ほんとだ、小さい n で試すとちがう。Σk² ＝ n(n＋1)(2n＋1)/6 を使うんだね。",
    },
    {
      mistake: 2,
      kind: "common",
      opener: "あと、Σₖ₌₃¹⁰ の項の数を 10−3＝7 個とするのは合ってるよね？ 引き算すればいいだけだし。",
      belief: "Σₖ₌₃¹⁰ の項の数を 10−3＝7 個とする（スタートの項を数えわすれている）。",
      understoodWhen: ["10−3＋1＝8 個", "k＝3, 4, …, 10 と書き出すと8個。スタートの項も数に入れます。"],
      probe: "Σₖ₌₃¹⁰ の項の数を 10−3＝7 個とすると、どこがずれるの？",
      ack: "書き出したら8個だった！ 10−3＋1＝8 個 なんだね。",
    },
  ],
  restatements: [
    {
      id: "r-ok",
      text: "つまり Σk² ＝ n(n＋1)(2n＋1)/6 の公式を使うんだね。だから Σₖ₌₁⁵ k² は 5·6·11/6 ＝ 55！",
      flawed: false,
      check: 0,
    },
    {
      id: "r-flaw",
      text: "Σk² ＝ n(n＋1)(2n＋1)/6 はわかった！ それと Σₖ₌₃¹⁰ の項の数を 10−3＝7 個とすればいいんだよね。",
      flawed: true,
      flaw: "Σₖ₌₃¹⁰ の項の数を 10−3＝7 個とするのが残っている",
      fix: "10−3＋1＝8 個。k＝3, 4, …, 10 と書き出すと8個。スタートの項も数に入れます。",
    },
  ],
  hints: {
    tatoeru: "Σ を「k に 1, 2, 3, … と順に入れてたす機械」にたとえると、",
    zu: "k の値と足す数を表に書き出すと、",
    rei: "例えば n＝2 で両方を計算してくらべると、",
  },
};
