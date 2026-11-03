// 数学Ⅱ「積分法」の単元模試 (A: 係数・区間を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 不定積分・条件つきの原始関数は、先に F(x) を決めて微分した式を問題にし、採点器が式として照合する。
//   定積分と面積は、原始関数の差 (A/3)(q³−p³)＋(B/2)(q²−p²)＋C(q−p) を calc に書いて照合する (答えは 6 を分母にした整数計算で別に出す)。
//   x 軸の下の部分は −∫、2つのグラフの間は ∫(上−下) として、区間を分けた式をそのまま calc にする
//   (scripts/check-moshi.ts がシード1〜100で確かめる)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-2-sekibun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "不定積分は「微分すると f(x) になる関数」");
const S2 = L(2, "定積分は F(b)−F(a) で計算する");
const S3 = L(3, "f(x)≧0 なら、定積分は面積そのもの");
const S4 = L(4, "x 軸より下の部分は、−をつけて面積にする");
const S5 = L(5, "2つのグラフの間の面積は ∫(上−下)dx");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
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
    const m = ascii ? m0.replace(/²/g, "^2").replace(/³/g, "^3") : m0;
    const a = Math.abs(c);
    const body = m && a === 1 ? m : `${a}${m}`;
    if (!out) out = (c < 0 ? (ascii ? "-" : "−") : "") + body;
    else out += ascii ? `${c < 0 ? "-" : "+"}${body}` : ` ${c < 0 ? "−" : "+"} ${body}`;
  }
  return out || "0";
}
const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };
const SUB: Record<string, string> = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉", "-": "₋" };
const sup = (n: number) => [...String(n)].map((c) => SUP[c]).join("");
const sub = (n: number) => [...String(n)].map((c) => SUB[c]).join("");
const integ = (p: number, q: number, f: string) => `∫${sub(p)}${sup(q)} (${f}) dx`;
const quad = (A: number, B: number, C: number, ascii = false) => poly([[A, "x²"], [B, "x"], [C, ""]], ascii);
/** ∫ₚ^q (Ax²＋Bx＋C)dx の 6 倍 (整数) */
const I6 = (A: number, B: number, C: number, p: number, q: number) => 2 * A * (q ** 3 - p ** 3) + 3 * B * (q * q - p * p) + 6 * C * (q - p);
/** 同じ値を計算する式 (calc 用) */
const Ic = (A: number, B: number, C: number, p: number, q: number) => `(${A}/3)*((${q})^3-(${p})^3)+(${B}/2)*((${q})^2-(${p})^2)+(${C})*((${q})-(${p}))`;
/** (x−α)(x−β) の係数 */
const fromRoots = (k: number, al: number, be: number): [number, number, number] => [k, -k * (al + be), k * al * be];

function futei(r: Rng): QuestionBody {
  const a = nz(r, -3, 3);
  const b = r.int(-4, 4);
  const c = r.int(-7, 7);
  const F: [number, string][] = [
    [a, "x³"],
    [b, "x²"],
    [c, "x"],
  ];
  const f = quad(3 * a, 2 * b, c);
  return {
    prompt: `次の不定積分を求めなさい。ただし、積分定数は C とする。\n∫(${f})dx`,
    answer: { kind: "num", answerKind: "expr", answer: [`${poly(F, true)}+c`] },
    point: "指数を1ふやし、ふやした数でわる。最後に ＋C",
    steps: [
      { title: "項ごとに積分", body: `∫xⁿdx＝xⁿ⁺¹/(n＋1)＋C を使うと、${D(3 * a)}x²→${poly([[a, "x³"]])}、${D(2 * b)}x→${poly([[b, "x²"]])}、${D(c)}→${poly([[c, "x"]])}。`, back: [S1] },
      { title: "まとめる", body: `{{${poly(F)} ＋ C}}。微分して ${f} にもどることを確かめます。`, trap: "積分定数 C を書き忘れない。" },
    ],
  };
}

function teiseki(r: Rng): QuestionBody {
  const A = nz(r, -3, 3);
  const B = r.int(-4, 4);
  const C = r.int(-5, 5);
  const p = r.int(-2, 1);
  const q = p + r.int(1, 3);
  const n6 = I6(A, B, C, p, q);
  const ans = frac(n6, 6, true);
  return {
    prompt: `次の定積分を求めなさい。\n${integ(p, q, quad(A, B, C))}`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: Ic(A, B, C, p, q) },
    point: "原始関数 F を求め、F(上端)−F(下端)",
    steps: [
      { title: "原始関数", body: `F(x)＝${[A ? `(${frac(A, 3)})x³` : "", B ? `(${frac(B, 2)})x²` : "", C ? `${D(C)}x` : ""].filter(Boolean).join(" ＋ ")} とします。`, back: [S1] },
      { title: "上端 − 下端", body: `F(${D(q)}) − F(${D(p)})＝{{${frac(n6, 6)}}}。`, back: [S2], trap: "下端が負のとき、(−a)³ の符号に気をつける。引く順番は上端が先。" },
    ],
  };
}

function jouken(r: Rng): QuestionBody {
  const a = nz(r, -2, 2);
  const b = r.int(-4, 4);
  const c = r.int(-5, 5);
  const C0 = r.int(-6, 6);
  const k = r.int(-2, 2);
  const Fk = a * k ** 3 + b * k * k + c * k + C0;
  const F: [number, string][] = [
    [a, "x³"],
    [b, "x²"],
    [c, "x"],
    [C0, ""],
  ];
  return {
    prompt: `F′(x)＝${quad(3 * a, 2 * b, c)}、F(${D(k)})＝${D(Fk)} をみたす関数 F(x) を求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [poly(F, true)], labels: ["F(x) ="] },
    point: "不定積分で C つきの F を出し、条件で C を決める",
    steps: [
      { title: "不定積分", body: `F(x)＝${poly([[a, "x³"], [b, "x²"], [c, "x"]])} ＋ C。`, back: [S1] },
      { title: "条件から C", body: `F(${D(k)})＝${D(Fk - C0)} ＋ C＝${D(Fk)} から C＝${D(C0)}。答えは {{F(x)＝${poly(F)}}}。`, trap: "C を求めたら、最後に式に入れて答える。C の値だけで終えない。" },
    ],
  };
}

function menseki(r: Rng): QuestionBody {
  const [al, be] = r.sample([-3, -2, -1, 0, 1, 2, 3, 4], 2).sort((x, y) => x - y);
  const k = r.pick([1, -1, 2, -1, 3]);
  const [A, B, C] = fromRoots(k, al, be);
  const n6 = Math.abs(I6(A, B, C, al, be));
  const ans = frac(n6, 6, true);
  return {
    prompt: `放物線 y＝${quad(A, B, C)} と x 軸で囲まれた部分の面積を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: `${k > 0 ? "-" : ""}(${Ic(A, B, C, al, be)})` },
    point: k > 0 ? "x 軸より下なので −∫ で面積" : "x 軸より上なので ∫ がそのまま面積",
    steps: [
      { title: "x 軸との交点", body: `${quad(A, B, C)}＝0 を解くと x＝${D(al)}、${D(be)}。`, back: [S3] },
      { title: "上下を見る", body: `${D(al)}＜x＜${D(be)} では y ${k > 0 ? "＜" : "＞"} 0。面積は ${k > 0 ? "−" : ""}∫${sub(al)}${sup(be)}(${quad(A, B, C)})dx。`, back: [k > 0 ? S4 : S3] },
      { title: "計算", body: `{{${frac(n6, 6)}}}。（(1/6)${Math.abs(k) === 1 ? "" : `×${Math.abs(k)}`}×(${D(be)}−${D(al)})³ と一致します）`, trap: "x 軸より下の部分をそのまま積分すると負になる。面積は正。" },
    ],
  };
}

function xjiku(r: Rng): QuestionBody {
  const al = r.int(-2, 1);
  const be = al + r.int(1, 3);
  const R = be + r.int(1, 2);
  const [A, B, C] = fromRoots(1, al, be);
  const n6 = -I6(A, B, C, al, be) + I6(A, B, C, be, R);
  const ans = frac(n6, 6, true);
  return {
    prompt: `曲線 y＝${quad(A, B, C)} と x 軸、および直線 x＝${D(R)} で囲まれた2つの部分の面積の和を求めなさい。（x の範囲は ${D(al)} ≦ x ≦ ${D(R)}）`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: `-(${Ic(A, B, C, al, be)})+(${Ic(A, B, C, be, R)})` },
    point: "x 軸との交点で区間を分け、下の部分は −∫",
    steps: [
      { title: "区間を分ける", body: `y＝(x − ${al < 0 ? `(${D(al)})` : al})(x − ${be < 0 ? `(${D(be)})` : be}) は ${D(al)}＜x＜${D(be)} で負、${D(be)}＜x＜${D(R)} で正。`, back: [S4] },
      { title: "それぞれ計算", body: `−∫${sub(al)}${sup(be)} y dx＝${frac(-I6(A, B, C, al, be), 6)}、∫${sub(be)}${sup(R)} y dx＝${frac(I6(A, B, C, be, R), 6)}。`, back: [S2] },
      { title: "たす", body: `面積の和は {{${frac(n6, 6)}}}。`, trap: `∫${sub(al)}${sup(R)} を一度に計算すると、上と下が打ち消し合って面積にならない。` },
    ],
  };
}

function futatsu(r: Rng): QuestionBody {
  const [al, be] = r.sample([-3, -2, -1, 0, 1, 2, 3], 2).sort((x, y) => x - y);
  const two = r.bool(0.4);
  const p = r.int(-3, 3);
  let q = r.int(-4, 4);
  // 上−下＝−k(x−α)(x−β)
  const k = two ? 2 : 1;
  const [dA, dB, dC] = fromRoots(-k, al, be);
  if (!two && p + dB === 0 && q + dC === 0) q += 1;
  let upper: string;
  let lower: string;
  if (two) {
    // 下: y＝x²＋px＋q、上: y＝−x²＋(p＋dB)x＋(q＋dC)
    lower = quad(1, p, q);
    upper = quad(-1, p + dB, q + dC);
  } else {
    // 下: 放物線 y＝x²＋px＋q、上: 直線 y＝(p＋dB)x＋(q＋dC)
    lower = quad(1, p, q);
    upper = poly([[p + dB, "x"], [q + dC, ""]]);
  }
  const n6 = I6(dA, dB, dC, al, be);
  const ans = frac(n6, 6, true);
  return {
    prompt: two ? `2つの放物線 y＝${lower}、y＝${upper} で囲まれた部分の面積を求めなさい。` : `放物線 y＝${lower} と直線 y＝${upper} で囲まれた部分の面積を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: Ic(dA, dB, dC, al, be) },
    point: "交点の x 座標を出し、∫(上−下)dx",
    steps: [
      { title: "交点の x 座標", body: `2式から y を消すと ${quad(k, -dB, -dC)}＝0、つまり ${k === 1 ? "" : `${k}`}(x − ${al < 0 ? `(${D(al)})` : al})(x − ${be < 0 ? `(${D(be)})` : be})＝0。x＝${D(al)}、${D(be)}。`, back: [S5] },
      { title: "上−下を積分", body: `${D(al)}＜x＜${D(be)} では ${two ? `y＝${upper}` : "直線"} が上。∫${sub(al)}${sup(be)}(${quad(dA, dB, dC)})dx を計算します。` },
      { title: "答え", body: `{{${frac(n6, 6)}}}。(1/6)${k === 1 ? "" : `×${k}`}×(${D(be)}−${D(al)})³ でも確かめられます。`, trap: "上と下を逆にすると負の値になる。交点の間でどちらが上かを先に確かめる。" },
    ],
  };
}

export const H_MATH_2_SEKIBUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅱ",
  review: { status: "draft" },
  sections: [
    {
      title: "不定積分と定積分",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "futei", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: futei },
        { id: "teiseki", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: teiseki },
      ],
    },
    {
      title: "原始関数と面積",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "jouken", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: jouken },
        { id: "menseki", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: menseki },
        { id: "xjiku", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: xjiku },
      ],
    },
    {
      title: "2つのグラフで囲まれた面積",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "futatsu", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: futatsu }],
    },
  ],
};
