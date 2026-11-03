// 小6算数「分数のわり算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 分数は約分ずみで作り、答えは約分した分数 (1より大きいときは仮分数、分母1なら整数)。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-6-bunsu-wari";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_ATARI = { label: "1dLあたりは、1/3dL分を3つ集める", href: L(1) };
const BACK_GYAKU = { label: "÷2/3 は ×3/2 と同じ", href: L(2) };
const BACK_TSUKURI = { label: "逆数のつくり方", href: L(3) };
const BACK_OOKII = { label: "1より小さい数でわると、答えは大きくなる", href: L(4) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const fr = (n: number, d: number) => {
  const g = gcd(n, d);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
const num = (answer: string, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [answer], calc, ...(unit ? { unit } : {}) });
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}
/** 約分ずみの分数 n/d (分子は maxN 以下、整数にならない) */
function frac(r: Rng, ds: number[], maxN: number): [number, number] {
  for (;;) {
    const d = r.pick(ds);
    const n = r.int(1, maxN);
    if (gcd(n, d) === 1 && n % d !== 0) return [n, d];
  }
}
const DS = [2, 3, 4, 5, 6, 7, 8, 9, 10];

function bunBun(r: Rng): QuestionBody {
  const [a, b] = frac(r, DS, 9);
  const [c, d] = frac(r, DS, 9);
  const ans = fr(a * d, b * c);
  return {
    prompt: `${a}/${b}÷${c}/${d} を計算しなさい。`,
    answer: num(ans, `${a}/${b}/(${c}/${d})`),
    point: "わる数の逆数をかける",
    steps: [
      { title: "逆数をかける", body: `${a}/${b}÷${c}/${d}＝${a}/${b}×${d}/${c} です。`, trap: `わられる数 ${a}/${b} の方を逆数にしない。`, back: [BACK_GYAKU] },
      { title: "計算して約分", body: `${a * d}/${b * c}${ans === `${a * d}/${b * c}` ? "" : `＝${ans}`}。答えは {{${ans}}} です。` },
    ],
  };
}

function seisuWari(r: Rng): QuestionBody {
  const k = r.int(2, 12);
  const [c, d] = frac(r, DS, 9);
  const ans = fr(k * d, c);
  return {
    prompt: `${k}÷${c}/${d} を計算しなさい。`,
    answer: num(ans, `${k}/(${c}/${d})`),
    point: "整数÷分数も、逆数をかける",
    steps: [{ title: "逆数をかける", body: `${k}÷${c}/${d}＝${k}×${d}/${c}＝${k * d}/${c}${ans === `${k * d}/${c}` ? "" : `＝${ans}`}。答えは {{${ans}}} です。`, back: [BACK_GYAKU] }],
  };
}

function gyakusu(r: Rng): QuestionBody {
  const mode = r.int(0, 2);
  if (mode === 0) {
    const [a, b] = frac(r, DS, 12);
    return {
      prompt: `${a}/${b} の逆数を答えなさい。`,
      answer: num(fr(b, a), `1/(${a}/${b})`),
      point: "分母と分子を入れかえる",
      steps: [{ title: "入れかえる", body: `${a}/${b} の逆数は {{${fr(b, a)}}} です。かけると ${a}/${b}×${b}/${a}＝1 になります。`, back: [BACK_TSUKURI] }],
    };
  }
  if (mode === 1) {
    const k = r.int(2, 15);
    return {
      prompt: `${k} の逆数を答えなさい。`,
      answer: num(`1/${k}`, `1/${k}`),
      point: "整数は 分母1の分数と見て入れかえる",
      steps: [{ title: "分数に直して入れかえる", body: `${k}＝${k}/1 なので、逆数は {{1/${k}}} です。`, back: [BACK_TSUKURI] }],
    };
  }
  const x10 = r.pick([1, 3, 7, 9, 11, 13, 17, 19, 21, 23]);
  return {
    prompt: `${f(x10 / 10)} の逆数を、分数で答えなさい。`,
    answer: num(fr(10, x10), `1/${f(x10 / 10)}`),
    point: "小数は分数に直してから入れかえる",
    steps: [{ title: "分数に直す", body: `${f(x10 / 10)}＝${x10}/10 なので、逆数は {{${fr(10, x10)}}} です。`, back: [BACK_TSUKURI] }],
  };
}

function atari(r: Rng): QuestionBody {
  const [a, b] = frac(r, [3, 4, 5, 6, 8], 7);
  const [c, d] = frac(r, [3, 4, 5, 6], 5);
  const ans = fr(a * d, b * c);
  return {
    prompt: `${c}/${d}dL のペンキで、かべを ${a}/${b}m² ぬれました。このペンキ1dLでは、何m²ぬれますか。答えは約分し、1より大きいときは仮分数で答えなさい。`,
    answer: num(ans, `${a}/${b}/(${c}/${d})`, "m²"),
    point: "1dLあたり＝ぬれた面積÷使った量",
    steps: [
      { title: "式をたてる", body: `1dLあたりを求めるので、${a}/${b}÷${c}/${d} です。`, trap: `${c}/${d}÷${a}/${b} と逆にしない。「1dLあたり」なので dL でわります。`, back: [BACK_ATARI] },
      { title: "計算", body: `${a}/${b}×${d}/${c}＝${a * d}/${b * c}${ans === `${a * d}/${b * c}` ? "" : `＝${ans}`}。答えは {{${ans}}}m² です。`, back: [BACK_GYAKU] },
    ],
  };
}

function ookii(r: Rng): QuestionBody {
  const base = r.int(6, 30);
  const lt = r.pick([[2, 3], [3, 4], [4, 5], [5, 6], [3, 5], [5, 8]]);
  const gt = r.sample([[4, 3], [5, 4], [3, 2], [7, 5], [9, 8]], 2);
  const o = (p: number[]) => `${base}÷${p[0]}/${p[1]}`;
  return {
    prompt: `次の式のうち、商が ${base} より大きくなるものはどれですか。`,
    answer: choice(r, [o(lt), `わる数 ${lt[0]}/${lt[1]} は1より小さいので、商は ${base} より大きくなります。`], [
      ...gt.map((p) => [o(p), `わる数 ${p[0]}/${p[1]} は1より大きいので、商は ${base} より小さくなります。`] as [string, string]),
      [`${base}÷1`, `1でわっても ${base} のままです。`],
    ]),
    point: "1より小さい数でわると、商はわられる数より大きい",
    steps: [{ title: "わる数を1と比べる", body: `÷${lt[0]}/${lt[1]} は ×${lt[1]}/${lt[0]} と同じで、${lt[1]}/${lt[0]} は1より大きい。だから{{商は大きく}}なります。`, back: [BACK_OOKII, BACK_GYAKU] }],
  };
}

function mix(r: Rng): QuestionBody {
  for (;;) {
    const [a, b] = frac(r, [3, 4, 5, 6, 8, 9], 9);
    const [c, d] = frac(r, [3, 4, 5, 6, 8, 9], 9);
    const [e, g] = frac(r, [3, 4, 5, 6, 8, 9], 9);
    const N = a * d * e;
    const D = b * c * g;
    if (gcd(N, D) < 3) continue;
    const ans = fr(N, D);
    return {
      prompt: `${a}/${b}÷${c}/${d}×${e}/${g} を計算しなさい。答えは約分し、1より大きいときは仮分数で答えなさい。`,
      answer: num(ans, `${a}/${b}/(${c}/${d})*${e}/${g}`),
      point: "わり算をかけ算に直し、1つの分数にまとめて約分",
      steps: [
        { title: "かけ算だけの式にする", body: `÷${c}/${d} を ×${d}/${c} にして、${a}/${b}×${d}/${c}×${e}/${g} です。`, back: [BACK_GYAKU] },
        { title: "約分してからかける", body: `${a}×${d}×${e}/${b}×${c}×${g} を約分してから計算すると、{{${ans}}} です。`, trap: `×${e}/${g} の方まで逆数にしない。逆数にするのは、わる数だけです。` },
      ],
    };
  }
}

export const E_MATH_6_BUNSU_WARI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小6",
  review: { status: "draft" },
  sections: [
    {
      title: "分数のわり算と逆数",
      lead: "次の問いに答えなさい。答えは約分し、1より大きいときは仮分数で答えなさい。",
      style: "calc",
      questions: [
        { id: "bun-bun", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: bunBun },
        { id: "seisu-wari", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: seisuWari },
        { id: "gyakusu", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: gyakusu },
      ],
    },
    {
      title: "1あたりと商の大きさ",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "atari", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: atari },
        { id: "ookii", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: ookii },
      ],
    },
    {
      title: "かけ算とわり算のまじった計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "mix", type: "A", difficulty: 3, points: 21, seconds: 150, skill: "知識・技能", generate: mix }],
    },
  ],
};
