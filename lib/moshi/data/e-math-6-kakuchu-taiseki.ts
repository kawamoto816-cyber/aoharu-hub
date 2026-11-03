// 小6算数「角柱と円柱の体積」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 体積＝底面積×高さ。円周率はレクチャーと同じ 3.14 で、3.14 のかけ算は整数にしてから計算して誤差を出さない。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-6-kakuchu-taiseki";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_TEIMEN = { label: "直方体の体積を、底面積×高さと見る", href: L(1) };
const BACK_HIREI = { label: "体積は、高さに比例する", href: L(2) };
const BACK_SANKAKU = { label: "三角柱は、底面の三角形の面積から", href: L(3) };
const BACK_EN = { label: "円柱は、底面の円の面積から", href: L(4) };
const BACK_3 = { label: "3つの柱をくらべる", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
const pi = (k: number) => (314 * k) / 100;

function shikaku(r: Rng): QuestionBody {
  const s = r.int(6, 60);
  const h = r.int(3, 20);
  return {
    prompt: `底面積が ${s}cm² で、高さが ${h}cm の四角柱の体積は何cm³ですか。`,
    answer: num(s * h, `${s}*${h}`, "cm³"),
    point: "角柱の体積＝底面積×高さ",
    steps: [{ title: "底面積×高さ", body: `${s}×${h}＝{{${s * h}}}（cm³）です。`, back: [BACK_TEIMEN] }],
  };
}

function sankaku(r: Rng): QuestionBody {
  const a = r.int(3, 12);
  const b = r.int(2, 10);
  const h = r.int(3, 15);
  const base = (a * b) / 2;
  const v = base * h;
  return {
    prompt: `底面が、底辺 ${a}cm・高さ ${b}cm の三角形で、柱の高さが ${h}cm の三角柱の体積は何cm³ですか。`,
    answer: num(v, `${a}*${b}/2*${h}`, "cm³"),
    point: "まず底面の三角形の面積、次に×高さ",
    steps: [
      { title: "底面積", body: `${a}×${b}÷2＝${f(base)}（cm²）です。`, back: [BACK_SANKAKU] },
      { title: "×高さ", body: `${f(base)}×${h}＝{{${f(v)}}}（cm³）です。`, trap: "三角形の高さと、柱の高さを取りちがえない。" },
    ],
  };
}

function enchu(r: Rng): QuestionBody {
  const a = r.int(1, 10);
  const h = r.int(2, 15);
  const v = pi(a * a * h);
  return {
    prompt: `底面の半径が ${a}cm、高さが ${h}cm の円柱の体積は何cm³ですか。円周率は3.14とします。`,
    answer: num(v, `${a}*${a}*3.14*${h}`, "cm³"),
    point: "円柱の体積＝半径×半径×3.14×高さ",
    steps: [
      { title: "底面積", body: `${a}×${a}×3.14＝${f(pi(a * a))}（cm²）です。`, back: [BACK_EN] },
      { title: "×高さ", body: `${f(pi(a * a))}×${h}＝{{${f(v)}}}（cm³）です。` },
    ],
  };
}

function takasa(r: Rng): QuestionBody {
  if (r.bool()) {
    const s = r.int(8, 50);
    const h = r.int(3, 20);
    const v = s * h;
    return {
      prompt: `底面積が ${s}cm² の角柱の体積が ${v}cm³ です。この角柱の高さは何cmですか。`,
      answer: num(h, `${v}/${s}`, "cm"),
      point: "高さ＝体積÷底面積",
      steps: [{ title: "体積÷底面積", body: `底面積×高さ＝体積 なので、高さ＝${v}÷${s}＝{{${h}}}（cm）です。`, back: [BACK_TEIMEN] }],
    };
  }
  const s = r.int(10, 40);
  const h = r.int(2, 6);
  const k = r.int(2, 5);
  return {
    prompt: `底面積 ${s}cm²、高さ ${h}cm の角柱の高さだけを ${k}倍にしました。体積は何cm³になりますか。`,
    answer: num(s * h * k, `${s}*${h}*${k}`, "cm³"),
    point: "底面積が同じなら、体積は高さに比例する",
    steps: [
      { title: "もとの体積", body: `${s}×${h}＝${s * h}（cm³）です。`, back: [BACK_TEIMEN] },
      { title: "高さが${k}倍なら体積も${k}倍", body: `${s * h}×${k}＝{{${s * h * k}}}（cm³）です。`, back: [BACK_HIREI] },
    ],
  };
}

function chokkei(r: Rng): QuestionBody {
  const d = r.step(2, 20, 2);
  const h = r.int(3, 15);
  const a = d / 2;
  const v = pi(a * a * h);
  return {
    prompt: `底面の直径が ${d}cm、高さが ${h}cm の円柱の形をした入れ物の容積は何cm³ですか。円周率は3.14とします。`,
    answer: num(v, `(${d}/2)*(${d}/2)*3.14*${h}`, "cm³"),
    point: "直径なら半径に直してから、底面積×高さ",
    steps: [
      { title: "半径", body: `${d}÷2＝${a}（cm）です。` },
      { title: "底面積×高さ", body: `${a}×${a}×3.14×${h}＝{{${f(v)}}}（cm³）です。`, trap: `${d}×${d}×3.14 としない。直径のままだと4倍になります。`, back: [BACK_EN] },
    ],
  };
}

function pipe(r: Rng): QuestionBody {
  if (r.bool()) {
    const R = r.int(3, 10);
    const a = r.int(1, R - 1);
    const h = r.int(5, 20);
    const v = pi((R * R - a * a) * h);
    return {
      prompt: `半径 ${R}cm、高さ ${h}cm の円柱から、同じ中心で半径 ${a}cm の円柱をくりぬいた、つつの形の立体があります。この立体の体積は何cm³ですか。円周率は3.14とします。`,
      answer: num(v, `(${R}*${R}-${a}*${a})*3.14*${h}`, "cm³"),
      point: "底面の輪の面積×高さ（大きい円柱−小さい円柱でもよい）",
      steps: [
        { title: "底面の輪の面積", body: `${R}×${R}×3.14−${a}×${a}×3.14＝${R * R - a * a}×3.14＝${f(pi(R * R - a * a))}（cm²）です。`, back: [BACK_EN] },
        { title: "×高さ", body: `${f(pi(R * R - a * a))}×${h}＝{{${f(v)}}}（cm³）です。`, back: [BACK_3] },
      ],
    };
  }
  // 台形が底面の四角柱
  const a = r.int(2, 8);
  const b = r.int(a + 2, 14);
  const t = r.int(2, 8);
  const h = r.int(3, 15);
  const base = ((a + b) * t) / 2;
  const v = base * h;
  return {
    prompt: `底面が、上底 ${a}cm・下底 ${b}cm・高さ ${t}cm の台形で、柱の高さが ${h}cm の四角柱の体積は何cm³ですか。`,
    answer: num(v, `(${a}+${b})*${t}/2*${h}`, "cm³"),
    point: "底面がどんな形でも、底面積×高さ",
    steps: [
      { title: "底面の台形の面積", body: `（${a}＋${b}）×${t}÷2＝${f(base)}（cm²）です。`, back: [BACK_3] },
      { title: "×高さ", body: `${f(base)}×${h}＝{{${f(v)}}}（cm³）です。`, trap: "台形の高さ（底面の中の長さ）と、柱の高さを取りちがえない。", back: [BACK_TEIMEN] },
    ],
  };
}

export const E_MATH_6_KAKUCHU_TAISEKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小6",
  review: { status: "draft" },
  sections: [
    {
      title: "底面積×高さ",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "shikaku", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: shikaku },
        { id: "sankaku", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: sankaku },
        { id: "enchu", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: enchu },
      ],
    },
    {
      title: "高さ・直径から考える",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "takasa", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: takasa },
        { id: "chokkei", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: chokkei },
      ],
    },
    {
      title: "いろいろな柱の体積",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "pipe", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: pipe }],
    },
  ],
};
