// 数学Ⅰ「実数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 答えは整数の組から作り、calc (√ をふくむ式) を scripts/check-moshi.ts がシード1〜100で計算して照合する。
//   有理化・二重根号は「答え → 問題」の順に作る (二重根号は √p＋√q を先に決めて p＋q、pq から問題を作る)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-1-jissu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S2 = L(2, "循環小数は分数に直せる");
const S3 = L(3, "絶対値は0からの距離、√a² = |a|");
const S4 = L(4, "根号をふくむ式は、文字式と同じように展開する");
const S5 = L(5, "分母の有理化：和と差の積で根号を消す");

// ---- 式の書き方 (表示は −・²、答えと calc は ASCII) ----
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
function frac(n: number, d: number, ascii = false): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  const s = d / g === 1 ? `${n / g}` : `${n / g}/${d / g}`;
  return ascii ? s : D(s);
}
function sq(n: number): [number, number] {
  let k = 1;
  let m = n;
  for (let i = 2; i * i <= m; i++) while (m % (i * i) === 0) { m /= i * i; k *= i; }
  return [k, m];
}
function surd(p: number, q: number, t: number, d = 1, ascii = false): string {
  const [k, m] = sq(t);
  q *= k;
  t = m;
  if (t === 1 || q === 0) { p += q * (t === 1 ? 1 : 0); q = 0; }
  if (d < 0) [p, q, d] = [-p, -q, -d];
  const g = gcd(gcd(p, q), d) || 1;
  [p, q, d] = [p / g, q / g, d / g];
  let s: string;
  if (q === 0) s = frac(p, d, true);
  else {
    const r = `${Math.abs(q) === 1 ? "" : Math.abs(q)}√${t}`;
    if (p === 0) s = `${q < 0 ? "-" : ""}${r}${d === 1 ? "" : `/${d}`}`;
    else {
      const inner = `${p}${q < 0 ? "-" : "+"}${r}`;
      s = d === 1 ? inner : `(${inner})/${d}`;
    }
  }
  return ascii ? s : D(s);
}

/** 平方数でない 2〜max */
const nonSquares = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, i) => i + min).filter((n) => !Number.isInteger(Math.sqrt(n)));

const DOT = "\u0307"; // 循環小数の点 (数字の上に打つ)

function junkan(r: Rng): QuestionBody {
  if (r.bool()) {
    // 0.ȧḃ ＝ ab/99
    let a = 0;
    let b = 0;
    while (a === b) {
      a = r.int(0, 9);
      b = r.int(1, 9);
    }
    const n = 10 * a + b;
    const s = `0.${a}${DOT}${b}${DOT}`;
    return {
      prompt: `循環小数 ${s}（${a}${b} がくり返す）を分数で表しなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [frac(n, 99, true)], calc: `${n}/99` },
      point: "くり返しが2けたなら、100倍して引く",
      steps: [
        { title: "100倍して引く", body: `x＝${s} とおくと、100x＝${n}.${a}${DOT}${b}${DOT}。引くと {{99x＝${n}}}。`, back: [S2] },
        { title: "約分する", body: `x＝${n}/99＝{{${frac(n, 99)}}}。`, trap: "10倍して引くと、くり返しの部分がずれて消えない。くり返しのけた数だけ10倍する。" },
      ],
    };
  }
  // 0.aḃ ＝ (10a+b−a)/90
  let a = 0;
  let b = 0;
  while (a === b) {
    a = r.int(1, 9);
    b = r.int(1, 8);
  }
  const s = `0.${a}${b}${DOT}`;
  const n = 10 * a + b - a;
  return {
    prompt: `循環小数 ${s}（小数第2位から ${b} がくり返す）を分数で表しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [frac(n, 90, true)], calc: `(${10 * a + b}-${a})/90` },
    point: "くり返しの始まりをそろえてから引く",
    steps: [
      { title: "くり返しの始まりをそろえる", body: `x＝${s} とおくと、100x＝${10 * a + b}.${b}${DOT}、10x＝${a}.${b}${DOT}。引くと {{90x＝${n}}}。`, back: [S2] },
      { title: "約分する", body: `x＝${n}/90＝{{${frac(n, 90)}}}。`, trap: `${10 * a + b}/99 としない。くり返すのは ${b} だけで、${a} はくり返さない。` },
    ],
  };
}

function zettai(r: Rng): QuestionBody {
  const n = r.pick(nonSquares(5, 60));
  const m = Math.floor(Math.sqrt(n));
  const [a, b] = r.sample([m - 1, m, m + 1, m + 2], 2).sort((x, y) => x - y);
  // |√n − c| は c ≦ m なら √n − c、c ≧ m+1 なら c − √n
  const sg = (c: number) => (c <= m ? 1 : -1);
  const q = sg(a) + sg(b);
  const p = -sg(a) * a - sg(b) * b;
  const piece = (c: number) => (sg(c) > 0 ? `√${n} − ${c}` : `${c} − √${n}`);
  const pieceA = (c: number) => (sg(c) > 0 ? `(√${n}-${c})` : `(${c}-√${n})`);
  const ans = surd(p, q, n, 1, true);
  return {
    prompt: `|√${n} − ${a}| + |√${n} − ${b}| の値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [ans], calc: `${pieceA(a)}+${pieceA(b)}` },
    point: "中身の符号を決めてから、絶対値をはずす",
    steps: [
      { title: "√n の大きさを見る", body: `${m}²＝${m * m}、${m + 1}²＝${(m + 1) ** 2} なので {{${m}＜√${n}＜${m + 1}}}。`, back: [S3] },
      {
        title: "絶対値をはずす",
        body: `|√${n} − ${a}|＝${piece(a)}、|√${n} − ${b}|＝${piece(b)}。足すと {{${surd(p, q, n)}}}。`,
        trap: "中身が負のときは、−をつけて（大小を入れかえて）はずす。そのまま |  | を消さない。",
      },
    ],
  };
}

const PAIRS: [number, number][] = [
  [2, 3],
  [2, 5],
  [3, 5],
  [2, 7],
  [3, 7],
  [5, 7],
];

function tenkai(r: Rng): QuestionBody {
  const [a, b] = r.pick(PAIRS);
  const p = r.int(1, 3);
  const q = r.pick([-2, -1, 1, 2]);
  const s = r.int(1, 3);
  let t = r.pick([-2, -1, 1, 2, 3]);
  if (p === s && q === t) t = -t;
  // (p√a + q√b)(s√a + t√b) = ps·a + qt·b + (pt + qs)√ab
  const P = p * s * a + q * t * b;
  const Q = p * t + q * s;
  const term = (c: number, x: number) => `${Math.abs(c) === 1 ? "" : Math.abs(c)}√${x}`;
  const f = (c1: number, c2: number) => `(${c1 < 0 ? "−" : ""}${term(c1, a)} ${c2 < 0 ? "−" : "+"} ${term(c2, b)})`;
  const fa = (c1: number, c2: number) => `(${c1}*√${a}+(${c2})*√${b})`;
  return {
    prompt: `次の式を計算しなさい。\n${f(p, q)}${f(s, t)}`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(P, Q, a * b, 1, true)], calc: `${fa(p, q)}*${fa(s, t)}` },
    point: "√ を文字とみて展開し、√a×√a＝a を使う",
    steps: [
      { title: "4つの積に分ける", body: `√${a}×√${a}＝${a}、√${b}×√${b}＝${b}、√${a}×√${b}＝√${a * b} を使います。`, back: [S4] },
      {
        title: "まとめる",
        body: `根号のない項は ${p * s}×${a}＋${pa(q * t)}×${b}＝${D(P)}、√${a * b} の係数は ${pa(p * t)}＋${pa(q * s)}＝${D(Q)}。答えは {{${surd(P, Q, a * b)}}}。`,
        trap: "√a×√b を √(a＋b) にしない。かけ算は中身どうしをかける。",
      },
    ],
  };
}

function nijuu(r: Rng): QuestionBody {
  const [q, p] = r.sample([1, 2, 3, 5, 6, 7, 10], 2).sort((x, y) => x - y);
  const plus = r.bool();
  const s = p + q;
  const t = p * q;
  // √(s ± 2√t) = √p ± √q (p > q)
  const rt = (x: number) => (x === 1 ? "1" : `√${x}`);
  const [k, m] = sq(t);
  const inner = `${2 * k}√${m}`; // 2√t を整理した形 (問題文に出す)
  const ans = plus ? `${rt(p)}+${rt(q)}` : `${rt(p)}-${rt(q)}`;
  const ansD = plus ? `${rt(p)} + ${rt(q)}` : `${rt(p)} − ${rt(q)}`;
  return {
    prompt: `√(${s} ${plus ? "+" : "−"} ${inner}) を簡単にしなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [ans], equations: [`x^2=${s}${plus ? "+" : "-"}2*√${t}`] },
    point: "たして中の数、かけて√の中の数になる2数をさがす",
    steps: [
      {
        title: "2√□ の形にする",
        body: `${k === 1 ? "" : `${inner}＝2√${t} と直す。`}(√p ± √q)²＝p＋q ± 2√pq なので、たして ${s}、かけて ${t} になる2数をさがすと {{${p} と ${q}}}。`,
        back: [S4],
        ...(k === 1 ? {} : { trap: `${inner} のまま ${2 * k}√ の中の ${m} を「かけた数」にしない。先に 2√□ の形にそろえる。` }),
      },
      {
        title: "根号をはずす",
        body: `${s} ${plus ? "+" : "−"} 2√${t}＝(${ansD})² なので、答えは {{${ansD}}}。`,
        trap: plus ? "2√t の「2」を忘れて、√t のまま組み合わせを探さない。" : `${rt(q)} − ${rt(p)} にしない。根号の値は正なので、大きい方から小さい方を引く。`,
      },
    ],
  };
}

/** (√a ± √b)/(√a ∓ √b) を有理化して整数＋整数√ になる組 */
const YURI: [number, number][] = [];
const SQF = [1, 2, 3, 5, 6, 7, 10, 11];
for (const a of SQF)
  for (const b of SQF.filter((x) => x < a)) {
    const [k, m] = sq(a * b);
    if (m === 1) continue;
    if ((a + b) % (a - b) === 0 && (2 * k) % (a - b) === 0) YURI.push([a, b]);
  }

function yurika(r: Rng): QuestionBody {
  const [a, b] = r.pick(YURI);
  const plus = r.bool();
  const sa = (x: number) => (x === 1 ? "1" : `√${x}`);
  const num = plus ? `${sa(a)} + ${sa(b)}` : `${sa(a)} − ${sa(b)}`;
  const den = plus ? `${sa(a)} − ${sa(b)}` : `${sa(a)} + ${sa(b)}`;
  const numA = plus ? `(${sa(a)}+${sa(b)})` : `(${sa(a)}-${sa(b)})`;
  const sgn = plus ? 1 : -1;
  // 分子・分母に分子と同じ式をかける: 分子 (a+b ± 2√ab)、分母 a−b (plus) / 分母 a−b でも同じ (minus は分母 a−b、分子 a+b−2√ab)
  const ans = surd(a + b, 2 * sgn, a * b, a - b, true);
  return {
    prompt: `次の式の分母を有理化しなさい。\n(${num})/(${den})`,
    answer: { kind: "num", answerKind: "surd", answer: [ans], calc: `${numA}^2/${a - b}` },
    point: "分母と符号だけちがう式を、分母・分子にかける",
    steps: [
      { title: "和と差の積を作る", body: `分母・分子に (${num}) をかけると、分母は (${sa(a)})² − (${sa(b)})²＝{{${a - b}}}。`, back: [S5] },
      {
        title: "分子を展開して約分",
        body: `分子は (${num})²＝${a + b} ${plus ? "+" : "−"} 2√${a * b}。${a - b} でわって {{${surd(a + b, 2 * sgn, a * b, a - b)}}}。`,
        trap: `√${a * b} が簡単にできるときは先に直してから約分する。`,
      },
    ],
  };
}

function seisu(r: Rng): QuestionBody {
  const n = r.pick(nonSquares(3, 40));
  const c = Math.floor(Math.sqrt(n));
  const m = r.int(1, c);
  const d = n - m * m;
  // x = d/(√n − m) = √n + m。整数部分 a = m + c、小数部分 b = √n − c
  const a = m + c;
  const P = a * a - n - c * c;
  const ans = surd(P, 2 * c, n, 1, true);
  const xs = d === 1 ? `1/(√${n} − ${m})` : `${d}/(√${n} − ${m})`;
  return {
    prompt: `x＝${xs} の整数部分を a、小数部分を b とするとき、a² − b² の値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [ans], calc: `${a}^2-(√${n}-${c})^2` },
    point: "まず有理化して x を整理し、√n の整数部分を見る",
    steps: [
      { title: "有理化する", body: `分母・分子に √${n} + ${m} をかけると、分母は ${n} − ${m * m}＝${d}。{{x＝√${n} + ${m}}}。`, back: [S5] },
      { title: "整数部分と小数部分", body: `${c}＜√${n}＜${c + 1} なので ${c + m}＜x＜${c + m + 1}。{{a＝${a}}}、b＝x − a＝{{√${n} − ${c}}}。`, back: [S3], trap: `b＝√${n} − ${m} としない。小数部分は「x − 整数部分」。` },
      { title: "式の値", body: `a²＝${a * a}、b²＝${n + c * c} − ${2 * c}√${n}。a² − b²＝{{${surd(P, 2 * c, n)}}}。` },
    ],
  };
}

export const H_MATH_1_JISSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅰ",
  review: { status: "draft" },
  sections: [
    {
      title: "循環小数・絶対値",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "junkan", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: junkan },
        { id: "zettai", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: zettai },
      ],
    },
    {
      title: "根号をふくむ式の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "tenkai", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: tenkai },
        { id: "nijuu", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: nijuu },
        { id: "yurika", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: yurika },
      ],
    },
    {
      title: "整数部分と小数部分",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "seisu", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: seisu }],
    },
  ],
};
