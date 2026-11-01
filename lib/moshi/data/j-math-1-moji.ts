// 中1数学「文字の式」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

export const J_MATH_1_MOJI: Daimon[] = [
  {
    id: "j-math-1-moji/1",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-moji"],
    title: "文字の式",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 20,
    minutes: 10,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "x × (−1) × y を、文字の式の表し方にしたがって書いたものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "×を省き、数を先に。1 は書かず、−1 は「−」だけ。",
        answer: {
          kind: "choice",
          options: ["−xy", "−1xy", "xy−1", "x(−1)y"],
          correct: 0,
          why: [
            "数を前に出し、×を省く。係数の −1 は 1 を書かずに「−」だけにするので正しい。",
            "係数の1は書かないきまり。−1xy ではなく −xy。",
            "−1 は「ひく1」ではなく、かけている数。xy−1 は別の式になる。",
            "数は文字の前に書く。かっこが残っているので表し方のきまりに合わない。",
          ],
        },
        steps: [
          {
            title: "書き方のきまりを順に使う",
            body: "①×を省く ②数は文字の前 ③文字はアルファベット順 ④{{1 は書かない}}。−1 は「−」だけを書きます。",
            figure: { ref: { unit: "j-math-1-moji", section: 1 } },
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次の計算をしなさい。\n3(2x − 5) − 2(x − 4)",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "−2 をかっこの中の全部にかける。−2×(−4)＝+8。",
        answer: { kind: "num", answerKind: "expr", answer: ["4x-7"] },
        steps: [
          {
            title: "分配法則でかっこをはずす",
            body: "後ろのかっこには {{−2}} をかけます。−2×(−4) は +8 です。",
            figure: {
              type: "formula",
              title: "かっこをはずして同類項をまとめる",
              steps: [
                { expr: "3(2x − 5) − 2(x − 4)" },
                { expr: "6x − 15 {{− 2x + 8}}", note: "−2 を両方の項にかける" },
                { expr: "{{4x − 7}}", note: "x の項・数の項をまとめる" },
              ],
            },
            trap: "−2(x−4) を −2x−8 にしてしまう（−2×(−4) の符号）。",
            back: [{ label: "レクチャー「かっこをはずす（分配法則）」", href: "/learn/lecture/j-math-1-moji#lec-s4" }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "次の計算をしなさい。\n(8x − 12) ÷ (−4)",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "わる数の逆数 −1/4 を、両方の項にかける。",
        answer: { kind: "num", answerKind: "expr", answer: ["-2x+3"] },
        steps: [
          {
            title: "両方の項を −4 でわる",
            body: "8x÷(−4)＝−2x、−12÷(−4)＝{{+3}}。負の数どうしのわり算は正になります。",
            trap: "−12÷(−4) を −3 にして −2x−3 と答える。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "x = −3 のとき、2x² − 5x の値を求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "負の数を代入するときは、かっこをつける。",
        answer: { kind: "num", answerKind: "num", answer: ["33"], calc: "2*(-3)^2-5*(-3)" },
        steps: [
          {
            title: "かっこをつけて代入する",
            body: "2x² は 2×{{(−3)²}}＝2×9＝18。−5x は −5×(−3)＝+15。",
            figure: {
              type: "formula",
              title: "x＝−3 を代入",
              steps: [
                { expr: "2 × {{(−3)²}} − 5 × {{(−3)}}" },
                { expr: "2 × 9 + 15" },
                { expr: "18 + 15 = {{33}}" },
              ],
            },
            trap: "−3² と書いて −9 にしてしまう（(−3)² は +9）。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "1個 a 円のりんごを3個と、1個 b 円のなしを2個買い、1000円を出しました。おつりは何円ですか。a、b を使った式で表しなさい。",
        points: 5,
        skill: "思考・判断・表現",
        level: 2,
        point: "おつり＝出したお金−代金。代金は 3a＋2b。",
        answer: { kind: "num", answerKind: "expr", answer: ["1000-3a-2b"], unit: "円" },
        steps: [
          {
            title: "ことばの式をつくる",
            body: "{{おつり＝出したお金−代金}}。代金はりんご 3a 円となし 2b 円の合計です。",
            figure: { ref: { unit: "j-math-1-moji", section: 0 } },
          },
          {
            title: "かっこをはずして書く",
            body: "1000−(3a＋2b)＝{{1000−3a−2b}}。かっこのまま 1000−(3a＋2b) と書いても値は同じですが、かっこをはずした形で答えます。",
            trap: "1000−3a＋2b としてしまう（−( ) の中の符号の変え忘れ）。",
          },
        ],
      },
    ],
  },
];
