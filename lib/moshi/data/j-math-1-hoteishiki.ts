// 中1数学「一次方程式」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

export const J_MATH_1_HOTEISHIKI: Daimon[] = [
  {
    id: "j-math-1-hoteishiki/1",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-hoteishiki"],
    title: "一次方程式",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 25,
    minutes: 12,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "次の方程式を解きなさい。\n5x − 7 = 2x + 8",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "x の項は左辺、数の項は右辺へ。移項すると符号が変わる。",
        answer: { kind: "num", answerKind: "num", answer: ["5"], labels: ["x ="], equations: ["5x-7=2x+8"] },
        steps: [
          {
            title: "移項する",
            body: "2x を左辺へ、−7 を右辺へ移すと 5x−2x＝8＋7。{{移項すると符号が変わります}}。",
            figure: { ref: { unit: "j-math-1-hoteishiki", section: 1 } },
            trap: "−7 を右辺へ移して 8−7 にしてしまう。",
          },
          {
            title: "両辺を x の係数でわる",
            body: "3x＝15 なので x＝{{5}}。もとの式に入れると 18＝18 で正しい。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次の方程式を解きなさい。\n3(x − 2) = 5x + 4",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "かっこをはずしてから移項。答えが負になってもよい。",
        answer: { kind: "num", answerKind: "num", answer: ["-5"], labels: ["x ="], equations: ["3(x-2)=5x+4"] },
        steps: [
          {
            title: "かっこをはずす",
            body: "3(x−2)＝{{3x−6}}。−2 にも3をかけます。",
          },
          {
            title: "移項して解く",
            body: "3x−5x＝4＋6 より −2x＝10、x＝{{−5}}。両辺を −2 でわるので符号に注意。",
            trap: "−2x＝10 から x＝5 としてしまう（わる数の符号）。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "次の方程式を解きなさい。\n0.3x − 1.2 = 0.5x",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "両辺を10倍。数の項 −1.2 も −12 にする。",
        answer: { kind: "num", answerKind: "num", answer: ["-6"], labels: ["x ="], equations: ["0.3x-1.2=0.5x"] },
        steps: [
          {
            title: "両辺を10倍して整数にする",
            body: "すべての項に10をかけて 3x−12＝5x。{{数の項にもかける}}のを忘れないこと。",
            trap: "3x−1.2＝5x のように、数の項だけ10倍し忘れる。",
            back: [{ label: "レクチャー「等式の性質と移項」", href: "/learn/lecture/j-math-1-hoteishiki#lec-s2" }],
          },
          {
            title: "移項して解く",
            body: "3x−5x＝12 より −2x＝12、x＝{{−6}}。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "次の方程式を解きなさい。\nx/2 − (x − 1)/3 = 1",
        points: 4,
        skill: "知識・技能",
        level: 3,
        point: "分母の最小公倍数6を両辺にかける。分子はかっこに入れる。",
        answer: { kind: "num", answerKind: "num", answer: ["4"], labels: ["x ="], equations: ["x/2-(x-1)/3=1"] },
        steps: [
          {
            title: "両辺に6をかけて分母をはらう",
            body: "6×x/2＝3x、6×(x−1)/3＝{{2(x−1)}}、右辺は6。分子にかっこをつけるのがポイント。",
            figure: {
              type: "formula",
              title: "分母をはらう",
              steps: [
                { expr: "x/2 − (x − 1)/3 = 1" },
                { expr: "3x − {{2(x − 1)}} = 6", note: "両辺×6" },
                { expr: "3x − 2x {{+ 2}} = 6", note: "−2×(−1)＝+2" },
                { expr: "{{x = 4}}" },
              ],
            },
            trap: "3x−2x−1＝6 のように、かっこをつけずに −1 のままにする。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt:
          "何人かの子どもに鉛筆を配ります。1人に3本ずつ配ると8本余り、1人に5本ずつ配ると4本たりません。子どもの人数を x 人として方程式をつくり、子どもの人数と鉛筆の本数を求めなさい。途中の式も書きなさい。",
        points: 9,
        skill: "思考・判断・表現",
        level: 3,
        point: "鉛筆の本数を2通りの式で表して、等号で結ぶ。",
        answer: {
          kind: "written",
          model:
            "子どもの人数を x 人とする。\n" +
            "鉛筆の本数は 3x + 8 本とも、5x − 4 本とも表せるので\n" +
            "3x + 8 = 5x − 4\n" +
            "−2x = −12\n" +
            "x = 6\n" +
            "鉛筆は 3×6 + 8 = 26（本）\n" +
            "答え　子ども 6人、鉛筆 26本",
          rubric: [
            { label: "x が何を表すか（子どもの人数）を書いている", points: 1, keywords: ["x 人", "人数を x"] },
            { label: "鉛筆の本数を2通りに表し、方程式 3x＋8＝5x−4 をつくっている", points: 3, keywords: ["3x+8=5x-4"] },
            { label: "方程式を正しく解いて x＝6 を出している", points: 2, keywords: ["x=6"] },
            { label: "子ども6人・鉛筆26本を、単位をつけて両方答えている", points: 3, keywords: ["6人", "26本"] },
          ],
          autoPart: {
            kind: "num",
            answerKind: "pair",
            answer: ["6", "26"],
            labels: ["子ども（人）", "鉛筆（本）"],
            equations: ["3x+8=y", "5x-4=y"],
          },
        },
        steps: [
          {
            title: "同じものを2通りに表す",
            body: "鉛筆の本数は「3本ずつ配って8本余る」なら {{3x＋8}}、「5本ずつだと4本たりない」なら {{5x−4}}。同じ本数なので等号で結びます。",
            figure: {
              type: "compare",
              title: "鉛筆の本数を2通りに表す",
              columns: [{ title: "配り方" }, { title: "鉛筆の本数", tone: "blue" }],
              rows: [
                { cells: ["1人3本ずつ・8本余る", "3x＋8"] },
                { cells: ["1人5本ずつ・4本たりない", "5x−4"] },
              ],
              note: "どちらも同じ鉛筆の本数なので 3x＋8＝5x−4。",
            },
            back: [{ label: "レクチャー「文章題は等しい関係を見つける」", href: "/learn/lecture/j-math-1-hoteishiki#lec-s4" }],
          },
          {
            title: "解いて、問われたものを答える",
            body: "3x−5x＝−4−8 より x＝6。鉛筆は 3×6＋8＝26本。{{人数と本数の両方}}を、単位をつけて答えます。",
            trap: "x＝6 だけ書いて、鉛筆の本数を答え忘れる。",
          },
        ],
      },
    ],
  },
];
