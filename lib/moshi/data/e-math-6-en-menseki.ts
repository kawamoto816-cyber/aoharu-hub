// 小6算数「円の面積」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 円周率はレクチャーと同じ 3.14。半径・直径は整数 (半分にする問題は偶数) で作り、3.14 のかけ算は整数にしてから計算して誤差を出さない。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-6-en-menseki";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_NANKO = { label: "円の面積は、半径×半径の何こ分？", href: L(1) };
const BACK_NARABE = { label: "細かく切って並べかえると長方形", href: L(2) };
const BACK_KOSHIKI = { label: "長方形の式から、円の面積の公式へ", href: L(3) };
const BACK_CHOKKEI = { label: "直径がわかっているときは、まず半径に", href: L(4) };
const BACK_HAN = { label: "半円・円の1/4 は、円の面積をわる", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
/** 3.14×k ÷ div (誤差なし) */
const pi = (k: number, div = 1) => (314 * k) / (100 * div);

function hankei(r: Rng): QuestionBody {
  const a = r.int(2, 20);
  const s = pi(a * a);
  return {
    prompt: `半径 ${a}cm の円の面積は何cm²ですか。円周率は3.14とします。`,
    answer: num(s, `${a}*${a}*3.14`, "cm²"),
    point: "円の面積＝半径×半径×3.14",
    steps: [{ title: "公式にあてはめる", body: `${a}×${a}×3.14＝${a * a}×3.14＝{{${f(s)}}}（cm²）です。`, trap: `${a}×2×3.14 は円周の長さ。面積は半径×半径です。`, back: [BACK_KOSHIKI] }],
  };
}

function chokkei(r: Rng): QuestionBody {
  const d = r.step(4, 40, 2);
  const a = d / 2;
  const s = pi(a * a);
  return {
    prompt: `直径 ${d}cm の円の面積は何cm²ですか。円周率は3.14とします。`,
    answer: num(s, `(${d}/2)*(${d}/2)*3.14`, "cm²"),
    point: "直径なら、まず半分にして半径に",
    steps: [
      { title: "半径を出す", body: `${d}÷2＝${a}（cm）です。`, back: [BACK_CHOKKEI] },
      { title: "半径×半径×3.14", body: `${a}×${a}×3.14＝{{${f(s)}}}（cm²）です。`, trap: `${d}×${d}×3.14 としない。4倍の大きさになってしまいます。`, back: [BACK_KOSHIKI] },
    ],
  };
}

function hanen(r: Rng): QuestionBody {
  const a = r.int(2, 20);
  const s = pi(a * a, 2);
  return {
    prompt: `半径 ${a}cm の半円の面積は何cm²ですか。円周率は3.14とします。`,
    answer: num(s, `${a}*${a}*3.14/2`, "cm²"),
    point: "半円は、円の面積÷2",
    steps: [{ title: "円の面積の半分", body: `${a}×${a}×3.14÷2＝{{${f(s)}}}（cm²）です。`, back: [BACK_HAN] }],
  };
}

function shibun(r: Rng): QuestionBody {
  const a = r.step(2, 30, 2);
  const s = pi(a * a, 4);
  return {
    prompt: `半径 ${a}cm の円を、中心で4等分した1つ分（円の1/4）の面積は何cm²ですか。円周率は3.14とします。`,
    answer: num(s, `${a}*${a}*3.14/4`, "cm²"),
    point: "円の1/4は、円の面積÷4",
    steps: [{ title: "円の面積の1/4", body: `${a}×${a}×3.14÷4＝{{${f(s)}}}（cm²）です。`, back: [BACK_HAN] }],
  };
}

function donut(r: Rng): QuestionBody {
  const R = r.int(4, 15);
  const a = r.int(1, R - 2);
  const s = pi(R * R - a * a);
  return {
    prompt: `同じ中心をもつ2つの円があります。大きい円の半径は ${R}cm、小さい円の半径は ${a}cm です。大きい円から小さい円を切りぬいた、輪の形の面積は何cm²ですか。円周率は3.14とします。`,
    answer: num(s, `${R}*${R}*3.14-${a}*${a}*3.14`, "cm²"),
    point: "大きい円の面積−小さい円の面積",
    steps: [
      { title: "まとめて計算", body: `${R}×${R}×3.14−${a}×${a}×3.14＝（${R * R}−${a * a}）×3.14＝${R * R - a * a}×3.14 です。`, back: [BACK_KOSHIKI] },
      { title: "答え", body: `${R * R - a * a}×3.14＝{{${f(s)}}}（cm²）です。`, trap: `（${R}−${a}）×（${R}−${a}）×3.14 としない。半径のちがいで円をつくっても、輪の面積にはなりません。` },
    ],
  };
}

function nokori(r: Rng): QuestionBody {
  if (r.bool()) {
    // 正方形 − 円の1/4
    const a = r.step(2, 20, 2);
    const s = a * a - pi(a * a, 4);
    return {
      prompt: `1辺 ${a}cm の正方形の中に、1つの頂点を中心とする半径 ${a}cm の円の1/4をかきました。正方形のうち、円の1/4の外側の部分の面積は何cm²ですか。円周率は3.14とします。`,
      answer: num(s, `${a}*${a}-${a}*${a}*3.14/4`, "cm²"),
      point: "正方形の面積から、円の1/4をひく",
      steps: [
        { title: "正方形と円の1/4", body: `正方形は ${a}×${a}＝${a * a}（cm²）、円の1/4は ${a}×${a}×3.14÷4＝${f(pi(a * a, 4))}（cm²）です。`, back: [BACK_HAN] },
        { title: "ひく", body: `${a * a}−${f(pi(a * a, 4))}＝{{${f(s)}}}（cm²）です。` },
      ],
    };
  }
  // 円周から面積
  const a = r.int(2, 15);
  const c = pi(a * 2);
  const s = pi(a * a);
  return {
    prompt: `円周の長さが ${f(c)}cm の円があります。この円の面積は何cm²ですか。円周率は3.14とします。`,
    answer: num(s, `(${f(c)}/3.14/2)*(${f(c)}/3.14/2)*3.14`, "cm²"),
    point: "円周→直径→半径→面積の順にもどす",
    steps: [
      { title: "半径を求める", body: `直径は ${f(c)}÷3.14＝${a * 2}（cm）、半径は ${a * 2}÷2＝${a}（cm）です。`, back: [BACK_CHOKKEI] },
      { title: "面積", body: `${a}×${a}×3.14＝{{${f(s)}}}（cm²）です。`, back: [BACK_NANKO, BACK_NARABE] },
    ],
  };
}

export const E_MATH_6_EN_MENSEKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小6",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "円の面積の公式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hankei", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: hankei },
        { id: "chokkei", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: chokkei },
        { id: "hanen", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: hanen },
      ],
    },
    {
      title: "円の一部と、組み合わせた形",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "shibun", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: shibun },
        { id: "donut", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: donut },
      ],
    },
    {
      title: "図形を組み合わせて考える",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "nokori", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: nokori }],
    },
  ],
};
