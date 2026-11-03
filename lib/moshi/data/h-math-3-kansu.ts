// 数学Ⅲ「分数関数・無理関数」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 漸近線は x＝p、y＝a を equations に。k/(x−p)＋q の k は b＋ap を calc に。分数方程式は先に2つの解 r₁＜p＜r₂ を決め、
//   k＝(p−r₁)(r₂−p)、m＝p−(r₁＋r₂) で式を作り、(x−p)(x＋m)−k＝0 を equations に。無理方程式は解 s と t＝s−b (t≧2) を先に決め、
//   a＝t²−s とする (もう1つの解 2b＋1−s は右辺が負になり不適)。不等式は交点と漸近線から区間を作る
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-3-kansu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "y＝k/x のグラフは双曲線。軸が漸近線");
const S2 = L(2, "y＝k/(x−p)＋q は y＝k/x の平行移動");
const S3 = L(3, "分数方程式・不等式はグラフの交わりで読む");
const S4 = L(4, "無理関数は √ の中が0以上の所だけ");
const S5 = L(5, "無理方程式は2乗したら必ず確かめる");

const D = (n: number) => (n < 0 ? `−${-n}` : String(n));
const pm = (n: number) => (n < 0 ? `− ${-n}` : `＋ ${n}`);
const xm = (p: number) => (p === 0 ? "x" : `x ${p > 0 ? "−" : "＋"} ${Math.abs(p)}`);
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
function frac(n: number, d: number): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
}
const F = (s: string) => s.replace(/-/g, "−");
const lin = (a: number, b: number) => `${a === 1 ? "" : a === -1 ? "−" : D(a)}x${b === 0 ? "" : ` ${pm(b)}`}`;

function zenkin(r: Rng): QuestionBody {
  const a = nz(r, -4, 4);
  const p = nz(r, -5, 5);
  let b = r.int(-6, 6);
  if (b === -a * p) b += 1;
  return {
    prompt: `関数 y＝(${lin(a, b)})/(${xm(p)}) のグラフの漸近線を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(p), String(a)], labels: ["x =", "y ="], equations: [`x=${p}`, `y=${a}`] },
    point: "分子を分母で割り、k/(x−p)＋q の形にする",
    steps: [
      { title: "分子を分母で割る", body: `${lin(a, b)}＝${D(a)}(${xm(p)}) ${pm(b + a * p)} なので、y＝${D(b + a * p)}/(${xm(p)}) ${pm(a)}。`, back: [S2] },
      { title: "漸近線を読む", body: `y＝k/(x−p)＋q の漸近線は x＝p と y＝q。よって {{x＝${D(p)}、y＝${D(a)}}}。`, back: [S1], trap: "分母が 0 になる x が縦の漸近線。横の漸近線は x の係数の比。" },
    ],
  };
}

function teigiiki(r: Rng): QuestionBody {
  const a = r.pick([1, 2, 3, -1, -2, -3]);
  const b = r.int(-9, 9);
  const v = frac(-b, a);
  const sign = a > 0 ? "≧" : "≦";
  return {
    prompt: `無理関数 y＝√(${lin(a, b)}) の定義域を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], labels: [`x ${sign}`], calc: `-(${b})/(${a})` },
    point: "√ の中が 0 以上になる x の範囲が定義域",
    steps: [
      { title: "√ の中 ≧ 0", body: `${lin(a, b)} ≧ 0 を解きます。`, back: [S4] },
      { title: "x について解く", body: `${a < 0 ? "x の係数が負なので、両辺を割ると不等号の向きが変わり、" : ""}{{x ${sign} ${F(v)}}}。`, trap: "x の係数が負のときは不等号の向きが変わる。" },
    ],
  };
}

function heiko(r: Rng): QuestionBody {
  const a = nz(r, -4, 4);
  const p = nz(r, -5, 5);
  let b = r.int(-8, 8);
  if (b + a * p === 0) b += 2;
  const k = b + a * p;
  return {
    prompt: `関数 y＝(${lin(a, b)})/(${xm(p)}) を y＝k/(x − p)＋q の形に表すとき、k の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(k)], labels: ["k ="], calc: `${b}+(${a})*(${p})` },
    point: "分子 ＝ a(x−p)＋(余り) と分けて、余りが k",
    steps: [
      { title: "分子を分母で割る", body: `${lin(a, b)}＝${D(a)}(${xm(p)}) ${pm(k)}。`, back: [S2] },
      { title: "形をそろえる", body: `y＝${D(k)}/(${xm(p)}) ${pm(a)} なので、{{k＝${D(k)}}}（p＝${D(p)}、q＝${D(a)}）。`, trap: "q（＝x の係数の比）と k を取りちがえない。" },
    ],
  };
}

/** r₁ ＜ p ＜ r₂ を決めて、k/(x−p)＝x＋m が r₁, r₂ を解にもつように作る */
function setup(r: Rng) {
  const p = r.int(-3, 3);
  const r1 = p - r.int(1, 3);
  const r2 = p + r.int(1, 3);
  const m = p - (r1 + r2);
  const k = (p - r1) * (r2 - p);
  return { p, r1, r2, m, k };
}

function bunsuHoteishiki(r: Rng): QuestionBody {
  const { p, r1, r2, m, k } = setup(r);
  const rhs = m === 0 ? "x" : `x ${pm(m)}`;
  return {
    prompt: `方程式 ${k}/(${xm(p)})＝${rhs} を解きなさい。`,
    answer: { kind: "num", answerKind: "roots", answer: [String(r1), String(r2)], labels: ["x =", "x ="], equations: [`(x-(${p}))*(x+(${m}))-(${k})=0`] },
    point: "分母をはらって2次方程式。分母≠0 も確かめる",
    steps: [
      { title: "分母をはらう", body: `両辺に ${xm(p)} をかけて、${k}＝(${xm(p)})(${rhs})。`, back: [S3] },
      { title: "2次方程式を解く", body: `整理すると (x ${pm(-r1)})(x ${pm(-r2)})＝0 なので、{{x＝${D(r1)}、${D(r2)}}}。どちらも x≠${D(p)} なので解として適します。` },
    ],
  };
}

function murihoteishiki(r: Rng): QuestionBody {
  const b = r.int(-2, 3);
  const t = r.int(2, 4);
  const s = b + t;
  const a = t * t - s;
  const other = 2 * b + 1 - s;
  const inside = a === 0 ? "x" : `x ${pm(a)}`;
  const rhs = b === 0 ? "x" : `x ${pm(-b)}`;
  return {
    prompt: `方程式 √(${inside})＝${rhs} を解きなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(s)], labels: ["x ="], equations: [`x+(${a})=(x-(${b}))^2`] },
    point: "2乗して解いたら、もとの式に代入して確かめる",
    steps: [
      { title: "両辺を2乗", body: `${inside}＝(${rhs})² を整理して解くと、x＝${D(s)}、${D(other)}。`, back: [S5] },
      { title: "もとの式で確かめる", body: `x＝${D(other)} は右辺が ${D(other - b)}（負）になり、√ の値（0以上）と合わないので不適。答えは {{x＝${D(s)}}}。`, trap: "2乗すると「右辺が負」の場合が混ざる。代入の確認を省かない。" },
    ],
  };
}

function futoshiki(r: Rng): QuestionBody {
  const { p, r1, r2, m, k } = setup(r);
  const rhs = m === 0 ? "x" : `x ${pm(m)}`;
  const A = D(r1);
  const P = D(p);
  const B = D(r2);
  const opts = [`x＜${A}、${P}＜x＜${B}`, `${A}＜x＜${P}、x＞${B}`, `${A}＜x＜${B}`, `x＜${A}、x＞${B}`];
  return {
    prompt: `不等式 ${k}/(${xm(p)})＞${rhs} を解きなさい。`,
    answer: {
      kind: "choice",
      options: opts,
      correct: 0,
      why: [
        `正しい。双曲線が直線より上にあるのは、x＜${A} と ${P}＜x＜${B}。`,
        "双曲線が直線より下にある範囲（不等号が逆のとき）。",
        `x＝${P} では左辺が定義されない。漸近線をまたいで1つの区間にしない。`,
        "分母の符号を考えずに両辺に分母をかけたときの誤り。",
      ],
    },
    point: "グラフの上下で読む。漸近線の左右で分けて考える",
    steps: [
      { title: "交点を求める", body: `${k}/(${xm(p)})＝${rhs} を解くと x＝${A}、${B}。漸近線は x＝${P}。`, back: [S3] },
      { title: "グラフの上下を読む", body: `y＝${k}/(${xm(p)}) が直線 y＝${rhs} より上にあるのは {{x＜${A}、${P}＜x＜${B}}}。`, trap: "両辺に x−p をかけるときは、x−p の符号で不等号の向きが変わる。" },
    ],
  };
}

export const H_MATH_3_KANSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅲ",
  review: { status: "draft" },
  sections: [
    {
      title: "分数関数のグラフ",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "zenkin", type: "A", difficulty: 1, points: 16, seconds: 90, skill: "知識・技能", generate: zenkin },
        { id: "heiko", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: heiko },
      ],
    },
    {
      title: "無理関数",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "teigiiki", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: teigiiki },
        { id: "murihoteishiki", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: murihoteishiki },
      ],
    },
    {
      title: "方程式・不等式とグラフ",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "bunsu-hoteishiki", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: bunsuHoteishiki },
        { id: "futoshiki", type: "A", difficulty: 3, points: 22, seconds: 210, skill: "思考・判断・表現", generate: futoshiki },
      ],
    },
  ],
};
