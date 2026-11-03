// 数学Ⅰ「二次関数とグラフ」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 頂点 (p, q) と a を先に決めて y＝a(x−p)²＋q を展開して問題を作る。頂点は equations で -b/(2a)、c−b²/(4a) と照合し、
//   移動後の式は係数の計算 (展開) で作る。scripts/check-moshi.ts がシード1〜100で確かめる。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-1-nijikansu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "二次関数のグラフは放物線。a の符号で向きが決まる");
const S2 = L(2, "y＝a(x−p)²＋q は、y＝ax² を動かしたもの");
const S3 = L(3, "平方完成で、頂点がわかる形に直す");
const S4 = L(4, "グラフは「頂点・向き・y 軸との交点」でかく");

// ---- 式の書き方 (表示は −・²、答えと calc は ASCII) ----
const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
function poly(ts: [number, string][], ascii = false): string {
  let out = "";
  for (const [c, m0] of ts) {
    if (c === 0) continue;
    const m = ascii ? m0.replace(/²/g, "^2").replace(/³/g, "^3").replace(/⁴/g, "^4") : m0;
    const a = Math.abs(c);
    const body = m && a === 1 ? m : `${a}${m}`;
    if (!out) out = (c < 0 ? (ascii ? "-" : "−") : "") + body;
    else out += ascii ? `${c < 0 ? "-" : "+"}${body}` : ` ${c < 0 ? "−" : "+"} ${body}`;
  }
  return out || "0";
}

const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
/** y＝a(x−p)²＋q を展開した係数 [a, b, c] */
const expand = (a: number, p: number, q: number): [number, number, number] => [a, -2 * a * p, a * p * p + q];
const quad = ([a, b, c]: number[], ascii = false) => poly([[a, "x²"], [b, "x"], [c, ""]], ascii);
/** a(x − p)² + q の表示 */
function vform(a: number, p: number, q: number): string {
  const co = a === 1 ? "" : a === -1 ? "−" : D(a);
  const inner = p === 0 ? "x²" : `(x ${p < 0 ? "+" : "−"} ${Math.abs(p)})²`;
  return `${co}${inner}${q === 0 ? "" : ` ${q < 0 ? "−" : "+"} ${Math.abs(q)}`}`;
}

function choten(r: Rng): QuestionBody {
  const a = r.pick([1, 2, 3, -1, -2, -3]);
  const p = nz(r, -4, 4);
  const q = r.int(-9, 9);
  const [, b, c] = expand(a, p, q);
  return {
    prompt: `放物線 y＝${quad([a, b, c])} の頂点の座標を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(p), String(q)], labels: ["x 座標", "y 座標"], equations: [`x=-(${b})/(2*${a})`, `y=${c}-(${b})^2/(4*${a})`] },
    point: "x² の係数でくくってから平方完成",
    steps: [
      { title: "x² の係数でくくる", body: a === 1 ? `y＝x² ${b < 0 ? "−" : "+"} ${Math.abs(b)}x + …。x の係数の半分 ${D(-p)} を使います。` : `y＝${D(a)}(x² ${-2 * p < 0 ? "−" : "+"} ${Math.abs(2 * p)}x) ${c < 0 ? "−" : "+"} ${Math.abs(c)} とくくります。`, back: [S3] },
      { title: "平方完成", body: `y＝${vform(a, p, q)}。頂点は {{(${D(p)}, ${D(q)})}}。`, trap: `(x ${p < 0 ? "+" : "−"} ${Math.abs(p)})² の頂点の x 座標は ${D(p)}。かっこの中の符号のまま ${D(-p)} としない。` },
    ],
  };
}

function heiko(r: Rng): QuestionBody {
  const a = r.pick([1, 2, -1, -2, 3]);
  const p = r.int(-3, 3);
  const q = r.int(-5, 5);
  const s = nz(r, -4, 4);
  const t = nz(r, -5, 5);
  const before = expand(a, p, q);
  const after = expand(a, p + s, q + t);
  return {
    prompt: `放物線 y＝${quad(before)} を、x 軸方向に ${D(s)}、y 軸方向に ${D(t)} だけ平行移動した放物線の方程式を、y＝ax²＋bx＋c の形で求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [quad(after, true)], labels: ["y ="] },
    point: "頂点を動かすか、x→x−s、y→y−t とおきかえる",
    steps: [
      { title: "頂点を求める", body: `y＝${vform(a, p, q)} なので、頂点は (${D(p)}, ${D(q)})。`, back: [S3] },
      { title: "頂点を動かす", body: `移動後の頂点は (${D(p)}＋${pa(s)}, ${D(q)}＋${pa(t)})＝(${D(p + s)}, ${D(q + t)})。形（a＝${D(a)}）は変わりません。`, back: [S2] },
      { title: "展開する", body: `y＝${vform(a, p + s, q + t)}＝{{${quad(after)}}}。`, trap: "x 軸方向に s 動かすときは x を x−s におきかえる。x＋s にしない。" },
    ],
  };
}

function taisho(r: Rng): QuestionBody {
  const a = r.pick([1, 2, -1, -3, 3]);
  const b = nz(r, -6, 6);
  const c = nz(r, -7, 7);
  const kind = r.int(0, 2);
  const names = ["x 軸", "y 軸", "原点"];
  const res = kind === 0 ? [-a, -b, -c] : kind === 1 ? [a, -b, c] : [-a, b, -c];
  const rule = kind === 0 ? "y を −y におきかえる" : kind === 1 ? "x を −x におきかえる" : "x を −x、y を −y におきかえる";
  return {
    prompt: `放物線 y＝${quad([a, b, c])} を、${names[kind]}に関して対称移動した放物線の方程式を求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [quad(res, true)], labels: ["y ="] },
    point: "x軸対称は y→−y、y軸対称は x→−x、原点対称は両方",
    steps: [
      { title: "おきかえのきまり", body: `${names[kind]}に関して対称移動するときは、{{${rule}}}。`, back: [S2] },
      {
        title: "式を整理する",
        body: kind === 0 ? `−y＝${quad([a, b, c])} より、y＝{{${quad(res)}}}。` : kind === 1 ? `y＝${D(a)}(−x)² ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}(−x) ${c < 0 ? "−" : "+"} ${Math.abs(c)}＝{{${quad(res)}}}。` : `−y＝${D(a)}(−x)² ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}(−x) ${c < 0 ? "−" : "+"} ${Math.abs(c)} より、y＝{{${quad(res)}}}。`,
        trap: kind === 1 ? "(−x)²＝x² なので、x² の係数の符号は変わらない。" : "−y＝… から y＝… にするとき、右辺のすべての項の符号を変える。",
      },
    ],
  };
}

function kettei(r: Rng): QuestionBody {
  const a = r.pick([1, 2, -1, -2, 3]);
  if (r.bool()) {
    // 頂点と1点
    const p = r.int(-3, 3);
    const q = r.int(-6, 6);
    const s = p + r.pick([-2, -1, 1, 2]);
    const t = a * (s - p) ** 2 + q;
    const co = expand(a, p, q);
    return {
      prompt: `頂点が点 (${D(p)}, ${D(q)}) で、点 (${D(s)}, ${D(t)}) を通る放物線をグラフとする二次関数を、y＝ax²＋bx＋c の形で求めなさい。`,
      answer: { kind: "num", answerKind: "expr", answer: [quad(co, true)], labels: ["y ="] },
      point: "頂点がわかれば y＝a(x−p)²＋q とおく",
      steps: [
        { title: "頂点の形でおく", body: `y＝a${vform(1, p, 0)}${q === 0 ? "" : ` ${q < 0 ? "−" : "+"} ${Math.abs(q)}`} とおきます。`, back: [S2] },
        { title: "通る点を代入", body: `x＝${D(s)}、y＝${D(t)} を入れると ${D(t)}＝a×${(s - p) ** 2} ${q < 0 ? "−" : "+"} ${Math.abs(q)}。{{a＝${D(a)}}}。` },
        { title: "展開する", body: `y＝${vform(a, p, q)}＝{{${quad(co)}}}。` },
      ],
    };
  }
  // 3点
  const b = r.int(-5, 5);
  const c = r.int(-6, 6);
  const xs = r.sample([-2, -1, 0, 1, 2, 3], 3).sort((x, y) => x - y);
  const f = (x: number) => a * x * x + b * x + c;
  const pts = xs.map((x) => `(${D(x)}, ${D(f(x))})`).join("、");
  return {
    prompt: `3点 ${pts} を通る放物線をグラフとする二次関数を、y＝ax²＋bx＋c の形で求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [quad([a, b, c], true)], labels: ["y ="] },
    point: "3点を代入して a、b、c の連立方程式を解く",
    steps: [
      { title: "代入して連立方程式", body: xs.map((x) => `${poly([[x * x, "a"], [x, "b"], [1, "c"]])}＝${D(f(x))}`).join("、") + "。", back: [S4] },
      { title: "文字を減らして解く", body: `2式ずつ引いて c を消し、a、b を求めると {{a＝${D(a)}、b＝${D(b)}、c＝${D(c)}}}。`, trap: "x＝0 の点があれば、そこから c がすぐ出る。先に使うと計算が楽。" },
      { title: "答え", body: `y＝{{${quad([a, b, c])}}}。` },
    ],
  };
}

const QUAD = ["第1象限", "第2象限", "第3象限", "第4象限"];
const sgn = (x: number) => (x > 0 ? "正" : "負");

function fugo(r: Rng): QuestionBody {
  let a = 0;
  let p = 0;
  let q = 0;
  let c = 0;
  for (let i = 0; i < 40; i++) {
    a = r.pick([1, 2, -1, -2]);
    p = nz(r, -3, 3);
    q = nz(r, -6, 6);
    c = a * p * p + q;
    if (c !== 0) break;
  }
  if (c === 0) [a, p, q, c] = [1, 2, -3, 1];
  const b = -2 * a * p;
  const quad0 = p > 0 ? (q > 0 ? 0 : 3) : q > 0 ? 1 : 2;
  const tri = [a, b, c].map(sgn);
  const triText = (t: string[]) => `a は${t[0]}、b は${t[1]}、c は${t[2]}`;
  const all: string[][] = [];
  for (const x of ["正", "負"]) for (const y of ["正", "負"]) for (const z of ["正", "負"]) all.push([x, y, z]);
  const wrong = r.sample(all.filter((t) => t.join() !== tri.join()), 3);
  const opts = r.shuffle([tri, ...wrong]);
  const correct = opts.findIndex((t) => t.join() === tri.join());
  return {
    prompt: `二次関数 y＝ax²＋bx＋c のグラフは${a > 0 ? "下に凸" : "上に凸"}の放物線で、頂点は${QUAD[quad0]}にあり、y 軸と y 座標が${sgn(c)}の点で交わる。a、b、c の符号の組として正しいものはどれですか。`,
    answer: { kind: "choice", options: opts.map(triText), correct, why: opts.map((t, i) => (i === correct ? "正しい。" : `${t[0] !== tri[0] ? "a（グラフの向き）" : t[1] !== tri[1] ? "b（軸の位置と a の符号）" : "c（y 軸との交点）"}の符号がちがう。`)) },
    point: "向き→a、y軸との交点→c、軸の位置と a から b",
    steps: [
      { title: "a と c", body: `${a > 0 ? "下に凸なので a は正" : "上に凸なので a は負"}。x＝0 のとき y＝c なので、c は${sgn(c)}。`, back: [S1, S4] },
      {
        title: "軸から b",
        body: `軸は x＝−b/(2a)。頂点が${QUAD[quad0]}なので軸は ${p > 0 ? "x＞0" : "x＜0"}。−b/(2a) が${p > 0 ? "正" : "負"}で a が${sgn(a)}なので、{{b は${sgn(b)}}}。`,
        trap: "軸が右（x＞0）でも b が正とは限らない。−b/(2a) の符号は a の符号にもよる。",
      },
    ],
  };
}

function gyaku(r: Rng): QuestionBody {
  const a = r.pick([1, 2, -1, 3, -2]);
  const p = r.int(-3, 3);
  const q = r.int(-6, 6);
  const s = nz(r, -4, 4);
  const t = nz(r, -5, 5);
  const before = expand(a, p, q);
  const after = expand(a, p + s, q + t);
  return {
    prompt: `放物線 y＝ax²＋bx＋c を、x 軸方向に ${D(s)}、y 軸方向に ${D(t)} だけ平行移動すると、放物線 y＝${quad(after)} になった。b、c の値を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(before[1]), String(before[2])], labels: ["b =", "c ="], equations: [`b=-2*${a}*(${p + s}-(${s}))`, `c=${a}*(${p + s}-(${s}))^2+${q + t}-(${t})`] },
    point: "移動後の頂点を、逆向きにもどす",
    steps: [
      { title: "移動後の頂点", body: `y＝${vform(a, p + s, q + t)} なので、頂点は (${D(p + s)}, ${D(q + t)})。a＝${D(a)} は移動しても変わりません。`, back: [S3] },
      {
        title: "逆に動かす",
        body: `もとの頂点は (${D(p + s)}−${pa(s)}, ${D(q + t)}−${pa(t)})＝{{(${D(p)}, ${D(q)})}}。`,
        back: [S2],
        trap: `移動後の頂点にさらに ${D(s)}、${D(t)} を足してしまうと、反対向きになる。もとにもどすときは引く。`,
      },
      { title: "展開する", body: `y＝${vform(a, p, q)}＝${quad(before)}。{{b＝${D(before[1])}、c＝${D(before[2])}}}。` },
    ],
  };
}

export const H_MATH_1_NIJIKANSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅰ",
  review: { status: "draft" },
  sections: [
    {
      title: "頂点と平行移動",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "choten", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: choten },
        { id: "heiko", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: heiko },
      ],
    },
    {
      title: "対称移動・二次関数の決定・グラフと係数",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "taisho", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: taisho },
        { id: "kettei", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: kettei },
        { id: "fugo", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: fugo },
      ],
    },
    {
      title: "移動する前の放物線",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "gyaku", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: gyaku }],
    },
  ],
};
