// 小5算数「分数のたし算とひき算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 分母・分子は rng で作り、答えは約分した分数 (1より大きいときは仮分数) にする。ひき算は答えが正になる組だけ。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-bunsu-tashihiki";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_HITOSHII = { label: "大きさの等しい分数", href: L(1) };
const BACK_YAKU = { label: "約分：分母と分子を同じ数でわる", href: L(2) };
const BACK_TSU = { label: "通分：分母を公倍数にそろえる", href: L(3) };
const BACK_3 = { label: "たし算・ひき算は3つの手順", href: L(4) };
const BACK_TAI = { label: "帯分数は、整数と分数に分けて", href: L(5) };

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const lcmOf = (a: number, b: number) => (a * b) / gcd(a, b);
const fr = (n: number, d: number) => {
  const g = gcd(Math.abs(n), d);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
const num = (answer: string, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [answer], calc, ...(unit ? { unit } : {}) });
/** 真分数 n/d (約分ずみ) */
function proper(r: Rng, ds: number[]): [number, number] {
  for (;;) {
    const d = r.pick(ds);
    const n = r.int(1, d - 1);
    if (gcd(n, d) === 1) return [n, d];
  }
}
const DS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15];

function yakubun(r: Rng): QuestionBody {
  const [n, d] = proper(r, [3, 4, 5, 6, 7, 8, 9]);
  const k = r.pick([2, 3, 4, 5, 6, 8]);
  return {
    prompt: `${n * k}/${d * k} を約分しなさい。`,
    answer: num(`${n}/${d}`, `${n * k}/${d * k}`),
    point: "分母と分子を、最大公約数でわる",
    steps: [
      { title: "分母と分子の公約数", body: `${d * k}と${n * k}の最大公約数は${gcd(n * k, d * k)}です。`, back: [BACK_YAKU] },
      { title: "同じ数でわる", body: `分母も分子も${gcd(n * k, d * k)}でわって {{${n}/${d}}} です。`, trap: "2でわっただけで止めない。まだ同じ数でわれないか確かめます。", back: [BACK_HITOSHII] },
    ],
  };
}

function tsubun(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(3, 12);
    b = r.int(3, 12);
  } while (a === b || a % b === 0 || b % a === 0);
  const m = lcmOf(a, b);
  return {
    prompt: `1/${a} と 1/${b} を通分します。いちばん小さい共通な分母はいくつですか。`,
    answer: num(String(m), `${a}*${b}/${gcd(a, b)}`),
    point: "共通な分母は、2つの分母の最小公倍数",
    steps: [
      { title: "分母の公倍数", body: `${a}と${b}の公倍数のうち、いちばん小さいのは {{${m}}} です。1/${a}＝${m / a}/${m}、1/${b}＝${m / b}/${m} になります。`, trap: `${a}×${b}＝${a * b} でも通分できるが、いちばん小さい分母ではない。`, back: [BACK_TSU] },
    ],
  };
}

function tasu(r: Rng): QuestionBody {
  let p: [number, number];
  let q: [number, number];
  do {
    p = proper(r, DS);
    q = proper(r, DS);
  } while (p[1] === q[1]);
  const m = lcmOf(p[1], q[1]);
  const s = p[0] * (m / p[1]) + q[0] * (m / q[1]);
  const ans = fr(s, m);
  return {
    prompt: `${p[0]}/${p[1]}＋${q[0]}/${q[1]} を計算しなさい。`,
    answer: num(ans, `${p[0]}/${p[1]}+${q[0]}/${q[1]}`),
    point: "通分してから分子をたし、最後に約分",
    steps: [
      { title: "通分する", body: `分母を${m}にそろえると、${p[0] * (m / p[1])}/${m}＋${q[0] * (m / q[1])}/${m} です。`, back: [BACK_TSU] },
      { title: "分子をたして約分", body: `${s}/${m}${ans === `${s}/${m}` ? "" : `＝${ans}`}。答えは {{${ans}}} です。`, trap: "分母どうしもたしてしまわない。分母はそろえたまま、分子だけをたします。", back: [BACK_3] },
    ],
  };
}

function hiku(r: Rng): QuestionBody {
  let p: [number, number];
  let q: [number, number];
  let m = 0;
  let s = 0;
  do {
    p = proper(r, DS);
    q = proper(r, DS);
    m = lcmOf(p[1], q[1]);
    s = p[0] * (m / p[1]) - q[0] * (m / q[1]);
  } while (p[1] === q[1] || s <= 0 || gcd(s, m) === 1);
  const ans = fr(s, m);
  return {
    prompt: `${p[0]}/${p[1]}−${q[0]}/${q[1]} を計算しなさい。`,
    answer: num(ans, `${p[0]}/${p[1]}-${q[0]}/${q[1]}`),
    point: "通分→分子をひく→約分。約分のわすれに注意",
    steps: [
      { title: "通分する", body: `分母を${m}にそろえると、${p[0] * (m / p[1])}/${m}−${q[0] * (m / q[1])}/${m}＝${s}/${m} です。`, back: [BACK_TSU] },
      { title: "約分する", body: `${s}/${m} は${gcd(s, m)}で約分できて、{{${ans}}} です。`, trap: `${s}/${m} のままにしない。最後に約分できるか確かめます。`, back: [BACK_YAKU] },
    ],
  };
}

function taibunsu(r: Rng): QuestionBody {
  let p: [number, number];
  let q: [number, number];
  do {
    p = proper(r, [2, 3, 4, 5, 6, 8]);
    q = proper(r, [2, 3, 4, 5, 6, 8]);
  } while (p[1] === q[1]);
  const a = r.int(1, 4);
  const b = r.int(1, 3);
  const plus = r.bool();
  const m = lcmOf(p[1], q[1]);
  const x = (a * p[1] + p[0]) * (m / p[1]);
  const y = (b * q[1] + q[0]) * (m / q[1]);
  let big = x;
  let small = y;
  let A = `${a}と${p[0]}/${p[1]}`;
  let B = `${b}と${q[0]}/${q[1]}`;
  let cA = `(${a}+${p[0]}/${p[1]})`;
  let cB = `(${b}+${q[0]}/${q[1]})`;
  if (!plus && x < y) {
    [big, small, A, B, cA, cB] = [y, x, B, A, cB, cA];
  }
  const s = plus ? big + small : big - small;
  const ans = fr(s, m);
  return {
    prompt: `${A}${plus ? "＋" : "−"}${B} を計算しなさい。1より大きいときは、答えは仮分数で答えなさい。`,
    answer: num(ans, `${cA}${plus ? "+" : "-"}${cB}`),
    point: "帯分数は仮分数に直すか、整数と分数に分けて計算",
    steps: [
      { title: "仮分数に直して通分", body: `分母を${m}にそろえて仮分数にすると、${big}/${m}${plus ? "＋" : "−"}${small}/${m} です。`, back: [BACK_TAI, BACK_TSU] },
      { title: "計算して約分", body: `${s}/${m}${ans === `${s}/${m}` ? "" : `＝${ans}`}。答えは {{${ans}}} です。`, trap: plus ? undefined : "整数と分数に分けて計算するときは、分数の部分がひけなければ、整数から1をくり下げます。" },
    ],
  };
}

function bunsho(r: Rng): QuestionBody {
  let p: [number, number];
  let q: [number, number];
  let t: [number, number];
  let s = 0;
  let m = 0;
  for (;;) {
    p = [r.int(5, 15), r.pick([2, 3, 4, 6])];
    q = proper(r, [2, 3, 4, 5, 6, 8, 10]);
    t = proper(r, [3, 4, 5, 6, 10, 12]);
    if (gcd(p[0], p[1]) !== 1) continue;
    m = lcmOf(lcmOf(p[1], q[1]), t[1]);
    s = p[0] * (m / p[1]) - q[0] * (m / q[1]) + t[0] * (m / t[1]);
    if (new Set([p[1], q[1], t[1]]).size >= 2 && m <= 24 && p[0] * (m / p[1]) - q[0] * (m / q[1]) > 0) break; // 共通な分母は24まで (101/60 のような数にしない)
  }
  const ans = fr(s, m);
  const what = r.pick(["お茶", "ジュース", "水"]);
  return {
    prompt: `ポットに${what}が ${p[0]}/${p[1]}L 入っています。そこから ${q[0]}/${q[1]}L 飲み、そのあと ${t[0]}/${t[1]}L たしました。ポットの${what}は何Lになりましたか。1より大きいときは、答えは仮分数で答えなさい。`,
    answer: num(ans, `${p[0]}/${p[1]}-${q[0]}/${q[1]}+${t[0]}/${t[1]}`, "L"),
    point: "3つの分数は、3つの分母の公倍数でまとめて通分",
    steps: [
      { title: "式をたてる", body: `${p[0]}/${p[1]}−${q[0]}/${q[1]}＋${t[0]}/${t[1]} です。` },
      { title: "まとめて通分", body: `分母を${m}にそろえると、${p[0] * (m / p[1])}/${m}−${q[0] * (m / q[1])}/${m}＋${t[0] * (m / t[1])}/${m}＝${s}/${m} です。`, back: [BACK_TSU, BACK_3] },
      { title: "約分", body: `${s}/${m}${ans === `${s}/${m}` ? " はこれ以上約分できないので" : ` を約分して`}、{{${ans}}}（L）です。`, back: [BACK_YAKU] },
    ],
  };
}

export const E_MATH_5_BUNSU_TASHIHIKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "約分と通分",
      lead: "次の問いに答えなさい。分数の答えは約分し、1より大きいときは仮分数で答えなさい。",
      style: "calc",
      questions: [
        { id: "yakubun", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: yakubun },
        { id: "tsubun", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: tsubun },
        { id: "tasu", type: "A", difficulty: 1, points: 15, seconds: 75, skill: "知識・技能", generate: tasu },
      ],
    },
    {
      title: "ひき算と帯分数",
      lead: "答えは約分して答えなさい。",
      style: "calc",
      questions: [
        { id: "hiku", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: hiku },
        { id: "taibunsu", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: taibunsu },
      ],
    },
    {
      title: "分数の文章題",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "bunsho", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: bunsho }],
    },
  ],
};
