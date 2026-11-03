// 数学Ⅱ「指数関数」の単元模試 (A: 底・指数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 指数法則の計算は指数の和 e を先に出して aᵉ (負なら 1/a⁻ᵉ) を calc に、分数の指数は底を素数の累乗 cᵏ で作って cᵖ を calc に書く。
//   累乗根の積・商は答え c について xⁿ＝(根号の中の積) を equations に、指数方程式は指数どうしの1次方程式を equations に書く。
//   大小は指数 m/n を数で比べて正しい順を決め、置きかえの方程式は t＝aˣ の2次方程式の解を先に決めて作る
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-2-shisu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "指数は「同じ数を何回かけるか」");
const S2 = L(2, "0乗・負の指数は「÷a」をつづけて決める");
const S3 = L(3, "分数の指数は累乗根で表す");
const S4 = L(4, "y＝aˣ のグラフは底で向きが決まる");
const S5 = L(5, "大小は「同じ底の累乗」にそろえてくらべる");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
function frac(n: number, d: number, ascii = false): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  const s = d / g === 1 ? `${n / g}` : `${n / g}/${d / g}`;
  return ascii ? s : D(s);
}
const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };
const sup = (n: number) => [...String(n)].map((c) => SUP[c]).join("");
/** c の e 乗 (e は整数) の値の文字列 */
const powv = (c: number, e: number, ascii = false) => (e >= 0 ? String(c ** e) : ascii ? `1/${c ** -e}` : `1/${c ** -e}`);
const rootSym = (n: number) => (n === 2 ? "√" : `${sup(n)}√`);
const xe = (p: number) => (p === 0 ? "x" : `x ${p < 0 ? "−" : "＋"} ${Math.abs(p)}`);
/** 指数 k(x＋p) の書き方: k＝1 ならかっこを外す、p＝0 なら kx */
const ke = (k: number, p: number) => (k === 1 ? xe(p) : p === 0 ? `${k}x` : `${k}(${xe(p)})`);

function keisan(r: Rng): QuestionBody {
  const a = r.pick([2, 3, 5]);
  let m = 0;
  let n = 0;
  let k = 0;
  const lim = a === 2 ? 5 : a === 3 ? 4 : 3;
  for (let i = 0; i < 40; i++) {
    m = nz(r, -4, 6);
    n = nz(r, -4, 6);
    k = nz(r, -4, 6);
    const e = m + n - k;
    if (e >= -3 && e <= lim && (m < 0 || n < 0 || k < 0)) break;
  }
  let e = m + n - k;
  if (e < -3 || e > lim) [m, n, k, e] = [3, -2, 4, -3];
  const ans = powv(a, e, true);
  return {
    prompt: `次の計算をしなさい。\n${a}${sup(m)} × ${a}${sup(n)} ÷ ${a}${sup(k)}`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: e >= 0 ? `${a}^${e}` : `1/${a}^${-e}` },
    point: "かけ算は指数のたし算、わり算は指数のひき算",
    steps: [
      { title: "指数法則", body: `aᵐ×aⁿ÷aᵏ＝aᵐ⁺ⁿ⁻ᵏ なので、指数は ${D(m)} ＋ ${pa(n)} − ${pa(k)}＝{{${D(e)}}}。`, back: [S1] },
      { title: "値にする", body: e >= 0 ? `${a}${sup(e)}＝{{${ans}}}。` : `${a}${sup(e)}＝1/${a}${sup(-e)}＝{{${ans}}}。`, back: [S2], trap: "負の指数は「負の数」ではなく逆数。a⁻ⁿ＝1/aⁿ。" },
    ],
  };
}

const RK: [number, number[]][] = [
  [2, [2, 3, 4, 5]],
  [3, [2, 3, 4]],
  [5, [2, 3]],
];

function ruijo(r: Rng): QuestionBody {
  const [c, ks] = r.pick(RK);
  const k = r.pick(ks);
  const maxP = c === 2 ? 5 : c === 3 ? 3 : 2;
  let p = nz(r, -maxP, maxP);
  if (gcd(p, k) !== 1) p = p > 0 ? 1 : -1;
  const b = c ** k;
  const ans = powv(c, p, true);
  return {
    prompt: `次の値を求めなさい。\n${b}^(${frac(p, k)})`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: p >= 0 ? `${c}^${p}` : `1/${c}^${-p}` },
    point: "底を素数の累乗に直して (aʳ)ˢ＝aʳˢ",
    steps: [
      { title: "底を累乗に", body: `${b}＝{{${c}${sup(k)}}}。`, back: [S3] },
      { title: "指数をかける", body: `(${c}${sup(k)})^(${frac(p, k)})＝${c}^(${k}×${p < 0 ? `(${frac(p, k)})` : frac(p, k)})＝${c}${sup(p)}＝{{${ans}}}。`, back: [S2], trap: p < 0 ? "指数が負なので、最後に逆数になる。" : "分母の数で累乗根、分子の数で累乗。" },
    ],
  };
}

function konkon(r: Rng): QuestionBody {
  const n = r.pick([3, 3, 4]);
  const c = n === 3 ? r.int(2, 6) : r.int(2, 4);
  const N = c ** n;
  // N＝a×b で、a、b がどちらも n乗数でないもの
  const isPow = (x: number) => Math.round(x ** (1 / n)) ** n === x;
  const divs: number[] = [];
  for (let a = 2; a < N; a++) if (N % a === 0 && !isPow(a) && !isPow(N / a)) divs.push(a);
  const a = divs.length ? r.pick(divs) : c;
  const b = N / a;
  const div = r.bool(0.4);
  const shown = div ? `${rootSym(n)}${a * N} ÷ ${rootSym(n)}${a}` : `${rootSym(n)}${a} × ${rootSym(n)}${b}`;
  return {
    prompt: `次の計算をしなさい。\n${shown}`,
    answer: { kind: "num", answerKind: "num", answer: [String(c)], equations: [`x^${n}=${N}`] },
    point: "同じ n乗根どうしは、中身をまとめてよい",
    steps: [
      { title: "1つの根号にまとめる", body: div ? `${rootSym(n)}(${a * N}÷${a})＝${rootSym(n)}${N}。` : `${rootSym(n)}(${a}×${b})＝${rootSym(n)}${N}。`, back: [S3] },
      { title: "n乗根をとる", body: `${N}＝${c}${sup(n)} なので {{${c}}}。`, trap: "√ どうしのときと同じ考え方。根号の種類（3乗根・4乗根）がそろっているときだけまとめられる。" },
    ],
  };
}

function hoteishiki(r: Rng): QuestionBody {
  const c = r.pick([2, 3]);
  const [u, v] = r.sample(c === 2 ? [1, 2, 3, 4] : [1, 2, 3], 2);
  const x0 = r.int(-3, 5);
  let p = 0;
  let q = 0;
  for (let i = 0; i < 40; i++) {
    p = r.int(-3, 3);
    const t = u * (x0 + p);
    if (t % v === 0) {
      q = t / v - x0;
      if (Math.abs(q) <= 6 && p !== q && x0 + p !== 0) break;
    }
  }
  if ((u * (x0 + p)) % v !== 0 || u * (x0 + p) !== v * (x0 + q)) {
    p = 0;
    q = (u * x0) / v - x0;
    if (!Number.isInteger(q)) {
      p = v - x0;
      q = (u * (x0 + p)) / v - x0;
    }
  }
  const A = c ** u;
  const B = c ** v;
  return {
    prompt: `方程式 ${p === 0 ? `${A}ˣ` : `${A}^(${xe(p)})`} ＝ ${q === 0 ? `${B}ˣ` : `${B}^(${xe(q)})`} を解きなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(x0)], labels: ["x ="], equations: [`${u}*(x+(${p}))=${v}*(x+(${q}))`] },
    point: "両辺の底をそろえ、指数どうしを等しくおく",
    steps: [
      { title: "底をそろえる", body: `${A}＝${c}${sup(u)}、${B}＝${c}${sup(v)} なので、${c}^(${ke(u, p)}) ＝ ${c}^(${ke(v, q)})。`, back: [S1] },
      { title: "指数を比べる", body: `{{${ke(u, p)}＝${ke(v, q)}}} を解いて x＝{{${D(x0)}}}。`, back: [S4], trap: "指数に係数をかけるとき、かっこの中の全部の項にかける。" },
    ],
  };
}

const EXPS: [number, number][] = [
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 3],
  [1, 4],
  [4, 3],
  [5, 4],
  [3, 2],
  [5, 6],
  [2, 5],
];

function daisho(r: Rng): QuestionBody {
  const c = r.pick([2, 3]);
  const pool = c === 2 ? EXPS : EXPS.filter(([m]) => m <= 4);
  const three = r.sample(pool, 3);
  const show = ([m, n]: [number, number]) => `${rootSym(n)}${c ** m}`;
  const order = [...three].sort((x, y) => x[0] / x[1] - y[0] / y[1]);
  const perms = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ];
  const right = perms[0];
  const wrong = r.sample(perms.slice(1), 3);
  const opts = r.shuffle([right, ...wrong]);
  const text = (pm: number[]) => pm.map((i) => show(order[i])).join(" ＜ ");
  const ex = order.map(([m, n]) => `${show([m, n])}＝${c}^(${frac(m, n)})`).join("、");
  return {
    prompt: `3つの数 ${three.map(show).join("、")} を小さい順に並べたものを選びなさい。`,
    answer: { kind: "choice", options: opts.map(text), correct: opts.indexOf(right), why: opts.map((pm) => (pm === right ? `${ex}。底 ${c}＞1 なので、指数が小さい順に並ぶ。` : `${ex} なので、指数の小さい順と合わない。`)) },
    point: "同じ底の累乗に直し、底＞1 なら指数の大小で比べる",
    steps: [
      { title: "同じ底にそろえる", body: `ⁿ√(aᵐ)＝a^(m/n) なので、${ex}。`, back: [S3] },
      { title: "指数で比べる", body: `y＝${c}ˣ は増加関数なので、指数 ${order.map(([m, n]) => frac(m, n)).join("＜")} の順に大きくなる。{{${text(right)}}}。`, back: [S5], trap: "根号の中の数の大きさだけで比べない。根号の種類もちがう。" },
    ],
  };
}

function nijiho(r: Rng): QuestionBody {
  const c = r.pick([2, 3]);
  const s = c === 2 ? r.int(1, 4) : r.int(1, 3);
  const P = c ** s;
  const n = r.int(1, 6);
  const sumC = P - n; // t² − (P−n)t − Pn＝0
  const prod = P * n;
  const cx = `${c}ˣ`;
  const mid = sumC === 0 ? "" : ` ${sumC > 0 ? "−" : "＋"} ${Math.abs(sumC) === 1 ? "" : `${Math.abs(sumC)}·`}${cx}`;
  return {
    prompt: `方程式 ${c * c}ˣ${mid} − ${prod} ＝ 0 を解きなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(s)], labels: ["x ="], calc: `(${P})^2-(${sumC})*${P}-${prod}+${s}` },
    point: "t＝aˣ とおくと2次方程式。t＞0 に注意",
    steps: [
      { title: "おきかえ", body: `${c * c}ˣ＝(${cx})² なので、t＝${cx} とおくと t² ${sumC === 0 ? "" : `${sumC > 0 ? "−" : "＋"} ${Math.abs(sumC) === 1 ? "" : Math.abs(sumC)}t `}− ${prod} ＝ 0。{{t＞0}} です。`, back: [S4] },
      { title: "t を求める", body: `(t − ${P})(t ＋ ${n})＝0 から t＝${P}、−${n}。t＞0 なので {{t＝${P}}}。`, trap: `t＝−${n} は ${cx}＞0 に反するので捨てる。` },
      { title: "x にもどす", body: `${cx}＝${P}＝${c}${sup(s)} なので {{x＝${s}}}。` },
    ],
  };
}

export const H_MATH_2_SHISU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅱ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "指数の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "keisan", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: keisan },
        { id: "ruijo", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: ruijo },
      ],
    },
    {
      title: "累乗根・方程式・大小",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "konkon", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: konkon },
        { id: "hoteishiki", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: hoteishiki },
        { id: "daisho", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: daisho },
      ],
    },
    {
      title: "おきかえで解く指数方程式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "nijiho", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: nijiho }],
    },
  ],
};
