// 数学Ⅰ「二次方程式と二次不等式」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 解の公式の答えは equations (もとの方程式) に代入して scripts/check-moshi.ts が確かめる。判別式の境目・線分の長さは calc で照合。
//   二次不等式は、2つの解 (α, β) を先に決めて (mx−u)(nx−v) を展開して作る。すべての x で成り立つ条件は、境目 α, β から式を作る。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-1-nijihoteishiki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "因数分解できなければ、解の公式");
const S2 = L(2, "判別式 D で、解の個数がわかる");
const S3 = L(3, "二次不等式は、グラフが x 軸の下か上か");
const S4 = L(4, "D＜0 なら「すべての実数」か「解なし」");

// ---- 式の書き方 (表示は −・²、答えと calc は ASCII) ----
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
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

const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
const quad = ([a, b, c]: number[], ascii = false) => poly([[a, "x²"], [b, "x"], [c, ""]], ascii);
type Op = "<" | ">" | "≦" | "≧";
const FLIP: Record<Op, Op> = { "<": ">", ">": "<", "≦": "≧", "≧": "≦" };
const isSq = (n: number) => n >= 0 && Number.isInteger(Math.sqrt(n));

function kai(r: Rng): QuestionBody {
  let a = 1;
  let b = 1;
  let c = -1;
  for (let i = 0; i < 60; i++) {
    a = r.pick([1, 1, 2, 3]);
    b = nz(r, -7, 7);
    c = nz(r, -6, 6);
    if (b * b - 4 * a * c > 0 && !isSq(b * b - 4 * a * c)) break;
  }
  if (b * b - 4 * a * c <= 0 || isSq(b * b - 4 * a * c)) [a, b, c] = [1, 3, 1];
  const Dd = b * b - 4 * a * c;
  const x1 = surd(-b, 1, Dd, 2 * a, true);
  const x2 = surd(-b, -1, Dd, 2 * a, true);
  const pm = surd(-b, 1, Dd, 2 * a).replace(/([+−])(?=\d*√)/, "±");
  return {
    prompt: `二次方程式 ${quad([a, b, c])}＝0 を解きなさい。`,
    answer: { kind: "num", answerKind: "roots", answer: [x1, x2], labels: ["x =", "x ="], equations: [`${quad([a, b, c], true)}=0`] },
    point: "x＝(−b±√(b²−4ac))/(2a)。√ の中を先に計算する",
    steps: [
      { title: "a、b、c を読む", body: `a＝${a}、b＝${D(b)}、c＝${D(c)}。b²−4ac＝${b * b}−${pa(4 * a * c)}＝{{${Dd}}}。`, back: [S1] },
      { title: "解の公式に入れる", body: `x＝(${D(-b)}±√${Dd})/${2 * a}${sq(Dd)[0] > 1 ? `。√${Dd}＝${surd(0, 1, Dd)} と直して約分` : ""}。{{x＝${pm}}}。`, trap: "−b の符号に注意。b が負なら −b は正になる。" },
    ],
  };
}

function hanbetsu(r: Rng): QuestionBody {
  const a = r.pick([1, 2, 3]);
  const b = nz(r, -8, 8);
  const kind = r.int(0, 3);
  const words = ["異なる2つの実数解をもつ", "重解をもつ", "実数解をもたない", "実数解をもつ"];
  const labs = ["k <", "k =", "k >", "k ≦"];
  const dCond = ["D > 0", "D＝0", "D < 0", "D ≧ 0"];
  const k0 = frac(b * b, 4 * a, true);
  return {
    prompt: `x の二次方程式 ${poly([[a, "x²"], [b, "x"], [1, "k"]])}＝0 が${words[kind]}ような定数 k の値${kind === 1 ? "" : "の範囲"}を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [k0], labels: [labs[kind]], calc: `(${b})^2/(4*${a})` },
    point: "解の個数は判別式 D＝b²−4ac の符号で決まる",
    steps: [
      { title: "判別式を作る", body: `D＝(${D(b)})² − 4×${a}×k＝${b * b} − ${4 * a}k。`, back: [S2] },
      { title: "条件を不等式にする", body: `${words[kind]} ⇔ {{${dCond[kind]}}}。${b * b} − ${4 * a}k ${dCond[kind].replace("D", "").trim()} より、{{${labs[kind]} ${D(k0)}}}。`, trap: "「実数解をもつ」は、異なる2つと重解の両方。D ≧ 0 と等号をふくめる。" },
    ],
  };
}

function futoshiki(r: Rng): QuestionBody {
  let m = 1;
  let n = 1;
  let u = 1;
  let v = 2;
  for (let i = 0; i < 40; i++) {
    m = r.pick([1, 1, 2, 3]);
    n = r.pick([1, 1, 2]);
    u = nz(r, -6, 6);
    v = nz(r, -6, 6);
    if (u * n !== v * m && u * n !== -v * m && gcd(m, u) === 1 && gcd(n, v) === 1) break;
  }
  if (u * n === v * m || u * n === -v * m || gcd(m, u) !== 1 || gcd(n, v) !== 1) [m, n, u, v] = [1, 1, -2, 3];
  const sg = r.bool(0.7) ? 1 : -1;
  const co = [sg * m * n, -sg * (m * v + n * u), sg * u * v];
  const op = r.pick<Op>(["<", ">", "≦", "≧"]);
  const op2: Op = sg > 0 ? op : FLIP[op];
  const al = u / m < v / n ? frac(u, m) : frac(v, n);
  const be = u / m < v / n ? frac(v, n) : frac(u, m);
  const s1 = op2 === "<" ? "<" : op2 === "≦" ? "≦" : "";
  const between = (x: string, y: string, o: string) => `${x} ${o} x ${o} ${y}`;
  const outside = (x: string, y: string, o: string) => `x ${o} ${x}, ${y} ${o} x`;
  const inner = s1 !== "";
  const o = inner ? s1 : op2 === ">" ? "<" : "≦";
  const right = inner ? between(al, be, o) : outside(al, be, o);
  const wrong1 = inner ? outside(al, be, o) : between(al, be, o);
  const nal = u / m < v / n ? frac(-v, n) : frac(-u, m);
  const nbe = u / m < v / n ? frac(-u, m) : frac(-v, n);
  const wrong2 = inner ? between(nal, nbe, o) : outside(nal, nbe, o);
  const wrong3 = inner ? outside(nal, nbe, o) : between(nal, nbe, o);
  const opts = [right, wrong1, wrong2, wrong3];
  const pos = co.map((x) => sg * x);
  const idx = r.shuffle([0, 1, 2, 3]);
  const whys = ["正しい。", sg < 0 ? "x² の係数が負なので、両辺に −1 をかけて向きを変えてから考える。そのままだと内と外が逆になる。" : "グラフが x 軸の上か下かを取りちがえている。", "解の符号が逆。(x − α) が 0 になるのは x＝α。", "解の符号も、内か外かも逆。"];
  return {
    prompt: `二次不等式 ${quad(co)} ${op} 0 の解はどれですか。`,
    answer: { kind: "choice", options: idx.map((i) => opts[i]), correct: idx.indexOf(0), why: idx.map((i) => whys[i]) },
    point: "x² の係数を正にしてから、解の間か外かを決める",
    steps: [
      ...(sg < 0 ? [{ title: "x² の係数を正にする", body: `両辺に −1 をかけて、{{${quad(co.map((x) => -x))} ${op2} 0}}（向きが変わる）。`, back: [S3] }] : []),
      { title: "因数分解して解を出す", body: `${quad(pos)}＝(${poly([[m, "x"], [-u, ""]])})(${poly([[n, "x"], [-v, ""]])})。＝0 の解は x＝${al}、${be}。`, back: [S3] },
      { title: "グラフで決める", body: `y＝${quad(pos)} のグラフは下に凸。y ${op2} 0 となるのは、グラフが x 軸より${inner ? "下" : "上"}${op2 === "≦" || op2 === "≧" ? "（x 軸上をふくむ）" : ""}の部分で、解の${inner ? "間" : "外側"}。{{${right}}}。`, trap: "≦・≧ のときは、端の値（解そのもの）もふくめる。" },
    ],
  };
}

function dminus(r: Rng): QuestionBody {
  const a = r.pick([1, 2, -1]);
  const p = r.int(-4, 4);
  const zero = r.bool(0.45);
  const q = zero ? 0 : r.int(1, 6);
  // a{(x−p)² + q/|a|}: a>0 なら a(x−p)²+q、a<0 なら a(x−p)²−q (どちらも D≦0)
  const qq = a > 0 ? q : -q;
  const co = [a, -2 * a * p, a * p * p + qq];
  const op = r.pick<Op>(["<", ">", "≦", "≧"]);
  const op2: Op = a > 0 ? op : FLIP[op];
  const opts = ["すべての実数", "解なし", `x＝${D(p)} 以外のすべての実数`, `x＝${D(p)}`];
  let correct: number;
  if (!zero) correct = op2 === ">" || op2 === "≧" ? 0 : 1;
  else correct = op2 === ">" ? 2 : op2 === "≧" ? 0 : op2 === "<" ? 1 : 3;
  const pos = a > 0 ? quad(co) : quad(co.map((x) => -x));
  const A = Math.abs(a);
  const vf = `${A === 1 ? "" : A}${p === 0 ? "x²" : `(x ${p < 0 ? "+" : "−"} ${Math.abs(p)})²`}${q === 0 ? "" : ` + ${q}`}`;
  return {
    prompt: `二次不等式 ${quad(co)} ${op} 0 の解はどれですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct,
      why: opts.map((_, i) => (i === correct ? "正しい。" : i <= 1 ? "グラフと x 軸の位置関係を取りちがえている。" : zero ? "等号が入るかどうかを見直す。" : "このグラフは x 軸と共有点をもたない。")),
    },
    point: "平方完成して、グラフが x 軸より上か下かを見る",
    steps: [
      ...(a < 0 ? [{ title: "x² の係数を正に", body: `−1 をかけて ${pos} ${op2} 0（向きが変わる）。`, back: [S3] }] : []),
      { title: "平方完成", body: `${pos}＝${vf}。${zero ? `x＝${D(p)} のときだけ 0 で、ほかは正。` : `つねに ${q > 0 ? `${q} 以上` : ""}で正（D＜0）。`}`, back: [S4] },
      { title: "不等式を読む", body: `${pos} ${op2} 0 を満たすのは {{${opts[correct]}}}。`, trap: "D＜0 でも「解なし」とは限らない。グラフが x 軸より上なら、> 0 はすべての実数。" },
    ],
  };
}

function nagasa(r: Rng): QuestionBody {
  let a = 1;
  let b = 2;
  let c = -1;
  for (let i = 0; i < 40; i++) {
    a = r.pick([1, 1, 2, -1]);
    b = nz(r, -8, 8);
    c = nz(r, -8, 8);
    if (b * b - 4 * a * c > 0) break;
  }
  if (b * b - 4 * a * c <= 0) [a, b, c] = [1, 2, -2];
  const Dd = b * b - 4 * a * c;
  const A = Math.abs(a);
  return {
    prompt: `放物線 y＝${quad([a, b, c])} が x 軸から切り取る線分の長さを求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, 1, Dd, A, true)], calc: `√${Dd}/${A}` },
    point: "2つの解の差。(−b＋√D)/(2a) − (−b−√D)/(2a)",
    steps: [
      { title: "x 軸との交点", body: `${quad([a, b, c])}＝0 の解が交点の x 座標。D＝${b * b}−${pa(4 * a * c)}＝{{${Dd}}}。`, back: [S2] },
      { title: "解の差", body: `2つの解は (${D(-b)}±√${Dd})/${pa(2 * a)}。差は 2√${Dd}/${2 * A}＝{{${surd(0, 1, Dd, A)}}}。`, back: [S1], trap: "x² の係数が負のときも、長さは正の数。差をとるときは大きい方から引く。" },
    ],
  };
}

function subete(r: Rng): QuestionBody {
  const al = r.int(-4, 3);
  const be = al + r.int(2, 6);
  const strict = r.bool();
  const s = al + be;
  const t = -al * be;
  const tail = poly([[s, "k"], [t, ""]]);
  const tailS = tail === "0" ? "" : tail.startsWith("−") ? ` − ${tail.slice(1)}` : ` + ${tail}`;
  const o = strict ? "<" : "≦";
  const kf = (x: number) => (x === 0 ? "k" : `(k ${x < 0 ? "+" : "−"} ${Math.abs(x)})`);
  return {
    prompt: `すべての実数 x について、不等式 x² − 2kx${tailS} ${strict ? ">" : "≧"} 0 が成り立つような定数 k の値の範囲は p ${o} k ${o} q である。p、q を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(al), String(be)], labels: ["p =", "q ="], equations: [`p^2-(${s})*p-(${t})=0`, `q^2-(${s})*q-(${t})=0`] },
    point: `すべての x で ${strict ? "＞" : "≧"}0 ⇔ 下に凸で D ${strict ? "＜" : "≦"} 0`,
    steps: [
      { title: "グラフの条件にする", body: `y＝x² − 2kx${tailS} は下に凸。いつも${strict ? "正" : "0以上"}になるのは、x 軸と${strict ? "共有点をもたない" : "接するか共有点をもたない"}とき、{{D/4 ${strict ? "<" : "≦"} 0}}。`, back: [S4] },
      { title: "判別式を計算", body: `D/4＝k² − (${tail})＝${poly([[1, "k²"], [-s, "k"], [-t, ""]])}＝${kf(al)}${kf(be)}。`, back: [S2] },
      { title: "k の二次不等式", body: `${kf(al)}${kf(be)} ${o} 0 より {{${D(al)} ${o} k ${o} ${D(be)}}}。`, trap: strict ? "「> 0 がつねに成り立つ」に D＝0 はふくまない（接するとき 0 になる点がある）。" : "「≧ 0」なら接する場合（D＝0）もよいので、等号をふくめる。" },
    ],
  };
}

export const H_MATH_1_NIJIHOTEISHIKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅰ",
  review: { status: "draft" },
  sections: [
    {
      title: "解の公式と判別式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kai", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: kai },
        { id: "hanbetsu", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: hanbetsu },
      ],
    },
    {
      title: "二次不等式とグラフ",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "futoshiki", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: futoshiki },
        { id: "dminus", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: dminus },
        { id: "nagasa", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: nagasa },
      ],
    },
    {
      title: "すべての実数で成り立つ条件",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "subete", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: subete }],
    },
  ],
};
