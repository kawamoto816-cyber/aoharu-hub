// 数学Ⅱ「複素数と二次方程式」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 複素数の答えは i を文字とした a＋bi の式で照合する (採点器が式として比べる)。割り算は商 z を先に決め、z×(割る数) を問題にする。
//   判別式は係数から D を計算して選択肢を決める。解と係数の関係の値は −b/a・c/a から作る式を calc に書いて照合する
//   (scripts/check-moshi.ts がシード1〜100で確かめる)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-2-fukuso";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "虚数単位 i と複素数");
const S2 = L(2, "計算は「i を文字あつかい、i² は −1」");
const S3 = L(3, "判別式 D で解の種類がわかる");
const S4 = L(4, "解と係数の関係");

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
function poly(ts: [number, string][], ascii = false): string {
  let out = "";
  for (const [c, m0] of ts) {
    if (c === 0) continue;
    const m = ascii ? m0.replace(/²/g, "^2") : m0;
    const a = Math.abs(c);
    const body = m && a === 1 ? m : `${a}${m}`;
    if (!out) out = (c < 0 ? (ascii ? "-" : "−") : "") + body;
    else out += ascii ? `${c < 0 ? "-" : "+"}${body}` : ` ${c < 0 ? "−" : "+"} ${body}`;
  }
  return out || "0";
}
const cx = (re: number, im: number, ascii = false) => poly([[re, ""], [im, "i"]], ascii);

function seki(r: Rng): QuestionBody {
  const a = r.int(-5, 5);
  const b = nz(r, -4, 4);
  const square = r.bool(0.3);
  const c = square ? a : r.int(-5, 5);
  const d = square ? b : nz(r, -4, 4);
  const re = a * c - b * d;
  const im = a * d + b * c;
  const z = `(${cx(a, b)})`;
  const shown = square ? `${z}²` : `${z}(${cx(c, d)})`;
  return {
    prompt: `次の計算をし、a＋bi（a、b は実数）の形で答えなさい。\n${shown}`,
    answer: { kind: "num", answerKind: "expr", answer: [cx(re, im, true)] },
    point: "文字式と同じに展開し、i² を −1 におきかえる",
    steps: [
      { title: "展開する", body: `i を文字とみて展開すると、${D(a * c)} ＋ (${D(a * d)}＋${pa(b * c)})i ＋ ${pa(b * d)}i²。`, back: [S2] },
      { title: "i²＝−1", body: `${pa(b * d)}i²＝${D(-b * d)} なので、実部 ${D(a * c)}＋${pa(-b * d)}＝${D(re)}、虚部 ${D(im)}。答えは {{${cx(re, im)}}}。`, trap: "i² を 1 にすると実部の符号が逆になる。", back: [S1] },
    ],
  };
}

const KINDS = ["異なる2つの実数解", "重解", "異なる2つの虚数解"];

function hanbetsu(r: Rng): QuestionBody {
  const kind = r.int(0, 2);
  let a = 1;
  let b = 0;
  let c = 0;
  for (let i = 0; i < 60; i++) {
    a = r.int(1, 4);
    if (kind === 1) {
      const p = nz(r, -4, 4);
      const q = r.pick([1, 2, 3].filter((x) => gcd(x, p) === 1));
      a = q * q;
      b = 2 * q * p;
      c = p * p;
      break;
    }
    b = r.int(-7, 7);
    c = nz(r, -8, 8);
    const Dv = b * b - 4 * a * c;
    if ((kind === 0 && Dv > 0) || (kind === 2 && Dv < 0)) break;
  }
  if (kind === 0 && b * b - 4 * a * c <= 0) [a, b, c] = [1, 3, -4];
  if (kind === 2 && b * b - 4 * a * c >= 0) [a, b, c] = [2, 1, 3];
  const Dv = b * b - 4 * a * c;
  const eq = `${poly([[a, "x²"], [b, "x"], [c, ""]])} ＝ 0`;
  const idx = [0, 1, 2];
  const why = [
    kind === 0 ? `D＝${D(Dv)}＞0 なので正しい。` : `D＞0 のときの解。この式は D＝${D(Dv)}。`,
    kind === 1 ? "D＝0 なので正しい。" : `D＝0 のときの解。この式は D＝${D(Dv)}。`,
    kind === 2 ? `D＝${D(Dv)}＜0 なので正しい。` : `D＜0 のときの解。この式は D＝${D(Dv)}。`,
  ];
  return {
    prompt: `2次方程式 ${eq} の解の種類として正しいものを選びなさい。`,
    answer: { kind: "choice", options: idx.map((i) => KINDS[i]), correct: kind, why },
    point: "D＝b²−4ac の符号で、実数解か虚数解かが決まる",
    steps: [
      { title: "判別式を計算", body: `D＝${pa(b)}² − 4×${a}×${pa(c)}＝{{${D(Dv)}}}。`, back: [S3] },
      { title: "符号で判断", body: `D ${Dv > 0 ? "＞" : Dv === 0 ? "＝" : "＜"} 0 なので {{${KINDS[kind]}}}。`, trap: "c が負のときは −4ac が正になる。符号に気をつける。" },
    ],
  };
}

function waru(r: Rng): QuestionBody {
  const p = r.int(-4, 4);
  const q = nz(r, -4, 4);
  const c = nz(r, -3, 3);
  const d = nz(r, -3, 3);
  const re = p * c - q * d;
  const im = p * d + q * c;
  const n = c * c + d * d;
  return {
    prompt: `次の計算をし、a＋bi（a、b は実数）の形で答えなさい。\n(${cx(re, im)}) ÷ (${cx(c, d)})`,
    answer: { kind: "num", answerKind: "expr", answer: [cx(p, q, true)] },
    point: "分母と共役な複素数を分母・分子にかける",
    steps: [
      { title: "共役な複素数をかける", body: `分母・分子に ${cx(c, -d)} をかけると、分母は ${c * c}＋${d * d}＝{{${n}}} の実数になります。`, back: [S2] },
      { title: "分子を計算", body: `分子は (${cx(re, im)})(${cx(c, -d)})＝${cx(p * n, q * n)}。` },
      { title: "わる", body: `${n} でわって {{${cx(p, q)}}}。`, trap: "(a＋bi)(a−bi)＝a²＋b²。a²−b² としない。" },
    ],
  };
}

function kankei(r: Rng): QuestionBody {
  const a = r.int(1, 3);
  const b = nz(r, -7, 7);
  const c = nz(r, -7, 7);
  const kind = r.int(0, 2);
  const S = `${frac(-b, a)}`;
  const P = `${frac(c, a)}`;
  let what: string;
  let n: number;
  let d: number;
  let calc: string;
  let how: string;
  if (kind === 0) {
    what = "α² ＋ β²";
    n = b * b - 2 * a * c;
    d = a * a;
    calc = `(${-b}/${a})^2-2*(${c}/${a})`;
    how = "α²＋β²＝(α＋β)²−2αβ";
  } else if (kind === 1) {
    what = "α²β ＋ αβ²";
    n = -b * c;
    d = a * a;
    calc = `(${c}/${a})*(${-b}/${a})`;
    how = "α²β＋αβ²＝αβ(α＋β)";
  } else {
    what = "(α − 1)(β − 1)";
    n = c + b + a;
    d = a;
    calc = `${c}/${a}-(${-b}/${a})+1`;
    how = "(α−1)(β−1)＝αβ−(α＋β)＋1";
  }
  const ans = frac(n, d, true);
  return {
    prompt: `2次方程式 ${poly([[a, "x²"], [b, "x"], [c, ""]])} ＝ 0 の2つの解を α、β とするとき、${what} の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc },
    point: "対称式は α＋β と αβ だけで表してから代入する",
    steps: [
      { title: "解と係数の関係", body: `{{α＋β＝${S}}}、{{αβ＝${P}}}。`, back: [S4] },
      { title: "和と積で表す", body: `${how} に代入して {{${frac(n, d)}}}。`, trap: "α＋β＝−b/a。マイナスを付け忘れやすい。" },
    ],
  };
}

function tsukuru(r: Rng): QuestionBody {
  const p = r.int(-4, 4);
  const q = r.int(1, 5);
  const real = r.bool(0.3);
  let s: number;
  let t: number;
  let shown: string;
  if (real) {
    const u = r.int(-5, 5);
    let v = r.int(-5, 5);
    if (v === u) v = u + 1;
    s = u + v;
    t = u * v;
    shown = `${D(u)}、${D(v)}`;
  } else {
    s = 2 * p;
    t = p * p + q * q;
    shown = `${cx(p, q)}、${cx(p, -q)}`;
  }
  return {
    prompt: `2数 ${shown} を解とする2次方程式のうち、x² の係数が 1 のものを求め、左辺を答えなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [poly([[1, "x²"], [-s, "x"], [t, ""]], true)], unit: "= 0" },
    point: "x²−(和)x＋(積)＝0 を作る",
    steps: [
      { title: "和と積", body: `和は {{${D(s)}}}、積は {{${D(t)}}}${real ? "" : `（(${cx(p, q)})(${cx(p, -q)})＝${p * p}＋${q * q}）`}。`, back: [S4] },
      { title: "式を作る", body: `x² − (和)x ＋ (積)＝0 から {{${poly([[1, "x²"], [-s, "x"], [t, ""]])} ＝ 0}}。`, trap: "和の前の符号は −。x² ＋(和)x としない。" },
    ],
  };
}

function hatten(r: Rng): QuestionBody {
  const b = nz(r, -6, 6);
  const c = nz(r, -6, 6);
  const kind = r.bool() ? 0 : 1;
  const s = -b;
  const p = c;
  let n: number;
  let d: number;
  let calc: string;
  let how: string;
  let what: string;
  if (kind === 0) {
    what = "α³ ＋ β³";
    n = s ** 3 - 3 * p * s;
    d = 1;
    calc = `(${s})^3-3*(${p})*(${s})`;
    how = `α³＋β³＝(α＋β)³−3αβ(α＋β)＝${pa(s)}³ − 3×${pa(p)}×${pa(s)}`;
  } else {
    what = "β/α ＋ α/β";
    n = s * s - 2 * p;
    d = p;
    calc = `((${s})^2-2*(${p}))/(${p})`;
    how = `β/α＋α/β＝(α²＋β²)/(αβ)＝{(α＋β)²−2αβ}/(αβ)＝(${s * s}−${pa(2 * p)})/${pa(p)}`;
  }
  return {
    prompt: `2次方程式 ${poly([[1, "x²"], [b, "x"], [c, ""]])} ＝ 0 の2つの解を α、β とするとき、${what} の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [frac(n, d, true)], calc },
    point: "解が虚数でも、和と積を使えば実数の計算ですむ",
    steps: [
      { title: "和と積", body: `α＋β＝${D(s)}、αβ＝${D(p)}。`, back: [S4] },
      { title: "和と積で表す", body: `${how}＝{{${frac(n, d)}}}。`, trap: kind === 0 ? "(α＋β)³ を展開すると 3αβ(α＋β) が出てくる。それを引く。" : "まず通分して、分子を α²＋β² の形にする。" },
    ],
  };
}

export const H_MATH_2_FUKUSO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅱ",
  review: { status: "draft" },
  sections: [
    {
      title: "複素数の計算と判別式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "seki", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: seki },
        { id: "hanbetsu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: hanbetsu },
      ],
    },
    {
      title: "割り算・解と係数の関係",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "waru", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: waru },
        { id: "kankei", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: kankei },
        { id: "tsukuru", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: tsukuru },
      ],
    },
    {
      title: "対称式の値",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "hatten", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: hatten }],
    },
  ],
};
