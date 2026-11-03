// 小5算数「分数と小数・整数の関係」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 分数は約分した形を答えにし、小数に直す問題は分母が 2・4・5・8・10・20・25・40・50 の分数だけ (終わる小数) を使う。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-bunsu-shosu";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_SHO = { label: "わり算の商は、分数で表せる", href: L(1) };
const BACK_TOSHO = { label: "分数を小数に直す", href: L(2) };
const BACK_TOBUN = { label: "小数を分数に直す", href: L(3) };
const BACK_SEISU = { label: "整数も分数で書ける", href: L(4) };
const BACK_OWARU = { label: "終わる小数と、終わらない小数", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
/** 約分した分数の文字列 (分母1なら整数) */
const fr = (n: number, d: number) => {
  const g = gcd(n, d);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
const num = (answer: string, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [answer], calc, ...(unit ? { unit } : {}) });
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}

function sho(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(1, 15);
    b = r.int(2, 15);
  } while (gcd(a, b) !== 1 || a % b === 0);
  return {
    prompt: `${a}÷${b} の商を、分数で表しなさい。`,
    answer: num(`${a}/${b}`, `${a}/${b}`),
    point: "a÷b の商は、分子が a、分母が b の分数",
    steps: [
      { title: "わられる数が分子、わる数が分母", body: `${a}÷${b}＝{{${a}/${b}}} です。`, trap: `${b}/${a} と、上下を逆にしない。わられる数（${a}）が分子です。`, back: [BACK_SHO] },
    ],
  };
}

const OWARU_D = [2, 4, 5, 8, 10, 20, 25, 40, 50];
function toShosu(r: Rng): QuestionBody {
  let n = 0;
  let d = 0;
  do {
    d = r.pick(OWARU_D);
    n = r.int(1, d * 2);
  } while (gcd(n, d) !== 1 || n % d === 0);
  return {
    prompt: `${n}/${d} を小数で表しなさい。`,
    answer: num(f(n / d), `${n}/${d}`),
    point: "分数を小数に直すには、分子÷分母",
    steps: [
      { title: "分子÷分母", body: `${n}/${d}＝${n}÷${d}＝{{${f(n / d)}}} です。`, trap: `${d}÷${n} と、逆にわらない。`, back: [BACK_TOSHO] },
    ],
  };
}

function toBunsu(r: Rng): QuestionBody {
  const k = r.pick([10, 100]);
  let m = 0;
  do m = r.int(1, k === 10 ? 29 : 299);
  while (m % 10 === 0);
  const x = m / k;
  const ans = fr(m, k);
  return {
    prompt: `${f(x)} を分数で表しなさい。約分できるときは約分し、1より大きいときは仮分数で答えなさい。`,
    answer: num(ans, `${m}/${k}`),
    point: `小数第${k === 10 ? 1 : 2}位までの小数は、分母${k}の分数にできる`,
    steps: [
      { title: `分母${k}の分数にする`, body: `${f(x)} は ${k === 10 ? "0.1" : "0.01"} の ${m}こ分なので、${m}/${k} です。`, back: [BACK_TOBUN] },
      { title: "約分する", body: `${m}/${k}${ans === `${m}/${k}` ? " はこれ以上約分できないので" : " を約分して"}、{{${ans}}} です。` },
    ],
  };
}

function seisu(r: Rng): QuestionBody {
  const n = r.int(2, 9);
  const d = r.int(2, 12);
  return {
    prompt: `整数の ${n} を、分母が ${d} の分数で表します。分子はいくつですか。`,
    answer: num(String(n * d), `${n}*${d}`),
    point: `1＝${d}/${d}。${n}はその${n}こ分`,
    steps: [
      { title: "1を分数で表す", body: `1＝${d}/${d} です。`, back: [BACK_SEISU] },
      { title: `${n}こ分`, body: `${n}は1の${n}こ分なので、分子は ${d}×${n}＝{{${n * d}}}。${n}＝${n * d}/${d} です。` },
    ],
  };
}

function nanbai(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(2, 18);
    b = r.int(2, 18);
  } while (a === b || a % b === 0);
  const ans = fr(a, b);
  const thing = r.pick(["赤いテープ", "青いリボン", "白いひも"]);
  return {
    prompt: `${thing}は ${a}m、黄色いテープは ${b}m です。${thing}の長さは、黄色いテープの長さの何倍ですか。分数で答えなさい。約分できるときは約分し、1より大きいときは仮分数で答えなさい。`,
    answer: num(ans, `${a}/${b}`, "倍"),
    point: "何倍か＝比べる長さ÷もとにする長さ",
    steps: [
      { title: "わり算の式", body: `黄色いテープをもとにするので、${a}÷${b} です。`, trap: `${b}÷${a} としない。「〜の何倍」の「〜」がわる数です。`, back: [BACK_SHO] },
      { title: "分数で表す", body: `${a}÷${b}＝${a}/${b}${ans === `${a}/${b}` ? "" : `＝${ans}`}。答えは {{${ans}}}倍です。` },
    ],
  };
}

function kurabe(r: Rng): QuestionBody {
  // 分数2つ・小数2つで、値がすべてちがう組
  for (;;) {
    const fs = r.sample([[1, 2], [3, 4], [2, 5], [3, 5], [4, 5], [1, 4], [5, 8], [7, 8], [3, 8], [7, 10], [9, 20], [13, 20]], 2);
    const ds = r.sample([0.35, 0.45, 0.55, 0.6, 0.65, 0.7, 0.72, 0.78, 0.82, 0.85, 0.9, 0.3], 2);
    const vals = [...fs.map(([n, d]) => n / d), ...ds];
    if (new Set(vals.map((v) => Math.round(v * 1000))).size < 4) continue;
    const labels = [...fs.map(([n, d]) => `${n}/${d}`), ...ds.map(f)];
    const big = r.bool();
    const best = vals.indexOf(big ? Math.max(...vals) : Math.min(...vals));
    const why = (i: number) => (i < 2 ? `${labels[i]}＝${f(vals[i])}。` : `${labels[i]}。`);
    return {
      prompt: `${labels.join("、")} のうち、いちばん${big ? "大きい" : "小さい"}数はどれですか。`,
      answer: choice(
        r,
        [labels[best], `${why(best)}小数にそろえると、いちばん${big ? "大きい" : "小さい"}です。`],
        labels.map((_, i) => i).filter((i) => i !== best).map((i) => [labels[i], `${why(i)}${labels[best]}（${f(vals[best])}）より${big ? "小さい" : "大きい"}です。`] as [string, string]),
      ),
      point: "分数を小数に直して、そろえて比べる",
      steps: [
        { title: "小数にそろえる", body: `${fs.map(([n, d]) => `${n}/${d}＝${f(n / d)}`).join("、")}。`, back: [BACK_TOSHO] },
        { title: "比べる", body: `いちばん${big ? "大きい" : "小さい"}のは {{${labels[best]}}} です。` },
      ],
    };
  }
}

const OWARANAI: [number, number][] = [
  [1, 3], [2, 3], [1, 6], [5, 6], [1, 7], [2, 7], [4, 9], [1, 9], [5, 12], [7, 12], [1, 11], [2, 15],
];
const OWARU: [number, number][] = [
  [1, 4], [3, 8], [2, 5], [7, 20], [9, 25], [3, 16], [7, 40], [11, 50], [5, 8], [3, 4], [1, 5], [3, 20],
];

function owaranai(r: Rng): QuestionBody {
  const yes = r.bool();
  const right = yes ? r.pick(OWARANAI) : r.pick(OWARU);
  const wrongs = yes ? r.sample(OWARU, 3) : r.sample(OWARANAI, 3);
  const ok = (p: [number, number]) => `${p[0]}/${p[1]}＝${f(p[0] / p[1])}。わり切れて、終わる小数です。`;
  const ng = (p: [number, number]) => `${p[0]}÷${p[1]} はわり切れず、小数がどこまでも続きます。`;
  return {
    prompt: yes ? "次の分数のうち、小数で表すと、わり切れずにどこまでも続くものはどれですか。" : "次の分数のうち、小数で表すと、わり切れて終わるものはどれですか。",
    answer: choice(r, [`${right[0]}/${right[1]}`, yes ? ng(right) : ok(right)], wrongs.map((p) => [`${p[0]}/${p[1]}`, yes ? ok(p) : ng(p)] as [string, string])),
    point: "分子÷分母がわり切れるかで決まる",
    steps: [
      { title: "分子÷分母をしてみる", body: "分数を小数に直すと、わり切れて{{終わる小数}}と、同じ数字がくり返して{{終わらない小数}}があります。", back: [BACK_OWARU] },
      { title: "答え", body: `${right[0]}÷${right[1]} は${yes ? "わり切れずに続きます" : "わり切れます"}。答えは {{${right[0]}/${right[1]}}} です。` },
    ],
  };
}

export const E_MATH_5_BUNSU_SHOSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "わり算・分数・小数",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "sho", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: sho },
        { id: "to-shosu", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: toShosu },
        { id: "to-bunsu", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: toBunsu },
      ],
    },
    {
      title: "分数で表す・比べる",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "seisu", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: seisu },
        { id: "nanbai", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: nanbai },
        { id: "kurabe", type: "A", difficulty: 2, points: 15, seconds: 120, skill: "思考・判断・表現", generate: kurabe },
      ],
    },
    {
      title: "終わる小数と終わらない小数",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [{ id: "owaranai", type: "A", difficulty: 3, points: 19, seconds: 150, skill: "思考・判断・表現", generate: owaranai }],
    },
  ],
};
