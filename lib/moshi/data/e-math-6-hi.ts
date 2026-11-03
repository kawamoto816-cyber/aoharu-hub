// 小6算数「比」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 先にいちばん簡単な比 p:q (p と q の最大公約数が1) を決め、問題の数はその何倍かで作る。
// 比を答える問題は pair (前の数・後ろの数) で、equations (x:y が問題の比と等しい) と calc で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-6-hi";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_HI = { label: "比 a:b は「aつ分とbつ分」", href: L(1) };
const BACK_HITOSHII = { label: "等しい比は、同じ数をかけたりわったりしてつくる", href: L(2) };
const BACK_KANTAN = { label: "比を簡単にする", href: L(3) };
const BACK_WAKERU = { label: "比で分けるときは、全体をいくつ分と見る", href: L(4) };

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const fr = (n: number, d: number) => {
  const g = gcd(n, d);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
const num = (answer: number | string, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(answer)], calc, ...(unit ? { unit } : {}) });
/** 比の答え p:q (a:b と等しいことを equations で確かめる) */
const ratio = (p: number, q: number, a: string, b: string): NumQ => ({
  kind: "num",
  answerKind: "pair",
  answer: [String(p), String(q)],
  labels: ["", "："],
  calc: `${p}`,
  equations: [`x*(${b})=y*(${a})`],
});
function pq(r: Rng, max = 9): [number, number] {
  for (;;) {
    const p = r.int(1, max);
    const q = r.int(1, max);
    if (p !== q && gcd(p, q) === 1) return [p, q];
  }
}

function kantan(r: Rng): QuestionBody {
  const [p, q] = pq(r);
  const k = r.pick([2, 3, 4, 5, 6, 8, 12, 15]);
  return {
    prompt: `${p * k}:${q * k} を、いちばん簡単な整数の比にしなさい。`,
    answer: ratio(p, q, `${p * k}`, `${q * k}`),
    point: "前と後ろの数を、最大公約数でわる",
    steps: [{ title: "最大公約数でわる", body: `${p * k}と${q * k}の最大公約数は${k}。両方を${k}でわって {{${p}:${q}}} です。`, trap: "2でわっただけで止めない。まだ同じ数でわれないか確かめます。", back: [BACK_KANTAN, BACK_HITOSHII] }],
  };
}

function atai(r: Rng): QuestionBody {
  const [p, q] = pq(r);
  const k = r.int(2, 9);
  const ans = fr(p, q);
  return {
    prompt: `比 ${p * k}:${q * k} の比の値を求めなさい。`,
    answer: num(ans, `${p * k}/${q * k}`),
    point: "a:b の比の値は a÷b",
    steps: [{ title: "前÷後ろ", body: `${p * k}÷${q * k}＝${p * k}/${q * k}＝{{${ans}}} です。`, trap: `${q * k}÷${p * k} と、逆にわらない。`, back: [BACK_HITOSHII] }],
  };
}

function xQ(r: Rng): QuestionBody {
  const [p, q] = pq(r);
  const k = r.int(2, 12);
  const back = r.bool();
  return {
    prompt: back ? `${p}:${q}＝${p * k}:x のとき、xの値を求めなさい。` : `${p}:${q}＝x:${q * k} のとき、xの値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(back ? q * k : p * k)], labels: ["x ="], calc: back ? `${q}*${p * k}/${p}` : `${p}*${q * k}/${q}` },
    point: "片方が何倍になっているかを見て、もう片方も同じ倍に",
    steps: [{ title: "何倍か", body: back ? `${p}→${p * k} は${k}倍なので、x＝${q}×${k}＝{{${q * k}}} です。` : `${q}→${q * k} は${k}倍なので、x＝${p}×${k}＝{{${p * k}}} です。`, back: [BACK_HITOSHII] }],
  };
}

function shosuHi(r: Rng): QuestionBody {
  const [p, q] = pq(r, 12);
  if (r.bool()) {
    // 小数の比: (p×m/10):(q×m/10)
    const m = r.pick([1, 2, 3, 4, 5, 6]);
    const a = (p * m) / 10;
    const b = (q * m) / 10;
    const sa = String(Math.round(a * 1000) / 1000);
    const sb = String(Math.round(b * 1000) / 1000);
    return {
      prompt: `${sa}:${sb} を、いちばん簡単な整数の比にしなさい。`,
      answer: ratio(p, q, sa, sb),
      point: "まず10倍して整数の比にしてから、簡単にする",
      steps: [
        { title: "10倍する", body: `両方を10倍して ${p * m}:${q * m} です。`, back: [BACK_KANTAN] },
        { title: "簡単にする", body: `${m > 1 ? `${m}でわって ` : ""}{{${p}:${q}}} です。` },
      ],
    };
  }
  // 分数の比: (p/b1):(q/b2) → 通分
  for (;;) {
    const d1 = r.pick([2, 3, 4, 5, 6]);
    const d2 = r.pick([2, 3, 4, 5, 6].filter((d) => d !== d1));
    const n1 = r.int(1, d1 - 1 || 1);
    const n2 = r.int(1, d2 - 1 || 1);
    if (gcd(n1, d1) !== 1 || gcd(n2, d2) !== 1) continue;
    const m = (d1 * d2) / gcd(d1, d2);
    const x = n1 * (m / d1);
    const y = n2 * (m / d2);
    const g = gcd(x, y);
    return {
      prompt: `${n1}/${d1}:${n2}/${d2} を、いちばん簡単な整数の比にしなさい。`,
      answer: ratio(x / g, y / g, `${n1}/${d1}`, `${n2}/${d2}`),
      point: "分母の公倍数をかけて、整数の比にする",
      steps: [
        { title: "分母の最小公倍数をかける", body: `両方に${m}をかけると ${x}:${y} です。`, back: [BACK_KANTAN] },
        { title: "簡単にする", body: `${g > 1 ? `${g}でわって ` : ""}{{${x / g}:${y / g}}} です。` },
      ],
    };
  }
}

function wakeru(r: Rng): QuestionBody {
  const [p, q] = pq(r);
  const k = r.pick([5, 10, 20, 25, 50, 100, 150]);
  const total = (p + q) * k;
  const ask = r.bool();
  const ctx = r.pick([
    { s: `${total}円を、兄と弟で ${p}:${q} の比になるように分けます。`, a: "兄", b: "弟", u: "円" },
    { s: `${total}mLのジュースを、AとBのコップに ${p}:${q} の比になるように分けます。`, a: "A", b: "B", u: "mL" },
  ]);
  const ans = (ask ? p : q) * k;
  return {
    prompt: `${ctx.s}${ask ? ctx.a : ctx.b}の分は何${ctx.u}ですか。`,
    answer: num(ans, `${total}*${ask ? p : q}/(${p}+${q})`, ctx.u),
    point: "全体を（前＋後ろ）つ分と見る",
    steps: [
      { title: "全体はいくつ分か", body: `${p}＋${q}＝${p + q} なので、全体は${p + q}つ分。1つ分は ${total}÷${p + q}＝${k}（${ctx.u}）です。`, back: [BACK_WAKERU, BACK_HI] },
      { title: `${ask ? ctx.a : ctx.b}の分`, body: `${ask ? ctx.a : ctx.b}は${ask ? p : q}つ分なので、${k}×${ask ? p : q}＝{{${ans}}}（${ctx.u}）です。` },
    ],
  };
}

function sa(r: Rng): QuestionBody {
  let p = 0;
  let q = 0;
  do [p, q] = pq(r);
  while (p <= q);
  const k = r.pick([20, 30, 40, 50, 60, 80, 100, 120]);
  const diff = (p - q) * k;
  return {
    prompt: `姉と妹の持っているお金の比は ${p}:${q} で、姉は妹より ${diff}円多く持っています。姉が持っているお金は何円ですか。`,
    answer: num(p * k, `${diff}/(${p}-${q})*${p}`, "円"),
    point: "ちがいが（前−後ろ）つ分にあたる",
    steps: [
      { title: "ちがいはいくつ分か", body: `${p}−${q}＝${p - q} なので、${diff}円が${p - q}つ分です。1つ分は ${diff}÷${p - q}＝${k}（円）です。`, back: [BACK_HI] },
      { title: "姉の分", body: `姉は${p}つ分なので、${k}×${p}＝{{${p * k}}}（円）です。`, trap: `${diff}円を ${p}:${q} に分けない。${diff}円は全体ではなく、ちがいです。` },
    ],
  };
}

export const E_MATH_6_HI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小6",
  review: { status: "draft" },
  sections: [
    {
      title: "比を簡単にする・比の値",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kantan", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: kantan },
        { id: "atai", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: atai },
        { id: "x", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: xQ },
      ],
    },
    {
      title: "小数・分数の比と、比で分ける",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "shosu-hi", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "知識・技能", generate: shosuHi },
        { id: "wakeru", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: wakeru },
      ],
    },
    {
      title: "比とちがい",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "sa", type: "A", difficulty: 3, points: 21, seconds: 150, skill: "思考・判断・表現", generate: sa }],
    },
  ],
};
