// 数学Ⅰ「式の展開と因数分解」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 展開・因数分解の答えは、先に因数 (整数の係数) を決めてから展開して問題を作る (答えから問題を作るので必ず合う)。
//   採点器 (lib/math/check.ts) が展開した形・因数分解した形を式として照合する。対称式の値は calc で検算 (scripts/check-moshi.ts がシード1〜100で確かめる)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-1-shiki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "展開は分配法則のくり返し");
const S2 = L(2, "因数分解は、まず共通因数");
const S3 = L(3, "たすきがけ：x² の係数が1でないとき");
const S4 = L(4, "おきかえで、見なれた形にする");
const S5 = L(5, "3乗の公式は、符号の並びで覚える");

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

const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
/** (ax + b) の形 (ascii / 表示) */
const lin = (a: number, b: number, v = "x", ascii = false) => `(${poly([[a, v], [b, ""]], ascii)})`;

function tenkai(r: Rng): QuestionBody {
  const a = r.int(1, 4);
  const c = r.int(1, 3);
  let b = nz(r, -5, 5);
  let d = nz(r, -5, 5);
  if (gcd(a, b) !== 1) b = b > 0 ? 1 : -1;
  if (gcd(c, d) !== 1) d = d > 0 ? 1 : -1;
  const A = a * c;
  const B = a * d + b * c;
  const C = b * d;
  const f1 = `(${poly([[a, "x"], [b, "y"]])})`;
  const f2 = `(${poly([[c, "x"], [d, "y"]])})`;
  const ans = poly([[A, "x²"], [B, "xy"], [C, "y²"]], true);
  return {
    prompt: `次の式を展開しなさい。\n${f1}${f2}`,
    answer: { kind: "num", answerKind: "expr", answer: [ans] },
    point: "4つの積を出してから、同類項 xy をまとめる",
    steps: [
      {
        title: "分配法則で4つの積",
        body: `前の2項と後ろの2項を1つずつかけます。x² の係数は ${a}×${c}＝${A}、y² の係数は ${pa(b)}×${pa(d)}＝${D(C)}。`,
        back: [S1],
      },
      {
        title: "xy の項をまとめる",
        body: `xy の係数は ${a}×${pa(d)}＋${pa(b)}×${c}＝${D(B)}。答えは {{${poly([[A, "x²"], [B, "xy"], [C, "y²"]])}}}。`,
        trap: "外側どうし・内側どうしの積の片方だけを書いて、xy の項をまちがえやすい。",
      },
    ],
  };
}

function kyotsu(r: Rng): QuestionBody {
  const k = r.pick([2, 3, 4, 5]);
  const p = nz(r, -7, 7);
  let q = nz(r, -7, 7);
  if (q === p) q = p === 7 ? -7 : p + 1;
  const s = p + q;
  const t = p * q;
  const shown = poly([[k, "x²"], [k * s, "x"], [k * t, ""]]);
  const ans = `${k}${lin(1, p, "x", true)}${lin(1, q, "x", true)}`;
  return {
    prompt: `次の式を因数分解しなさい。\n${shown}`,
    answer: { kind: "num", answerKind: "factor", answer: [ans] },
    point: "まず共通因数でくくり、残りを和と積で分ける",
    steps: [
      { title: "共通因数をくくり出す", body: `どの項も ${k} でわれるので、${k}(${poly([[1, "x²"], [s, "x"], [t, ""]])})。`, back: [S2] },
      {
        title: "かっこの中を因数分解",
        body: `たして ${D(s)}、かけて ${D(t)} になる2数は ${D(p)} と ${D(q)}。答えは {{${D(ans)}}}。`,
        trap: `かっこの中だけを因数分解して、前の ${k} を書き忘れない。`,
      },
    ],
  };
}

function tasuki(r: Rng): QuestionBody {
  let a = 1;
  let b = 1;
  let c = 1;
  let d = 1;
  for (let i = 0; i < 50; i++) {
    a = r.pick([1, 2, 3]);
    c = r.pick([2, 3, 5]);
    b = nz(r, -5, 5);
    d = nz(r, -5, 5);
    if (gcd(a, b) === 1 && gcd(c, d) === 1 && a * d + b * c !== 0 && a * d !== b * c) break;
  }
  if (gcd(a, b) !== 1 || gcd(c, d) !== 1 || a * d + b * c === 0) [a, b, c, d] = [2, 1, 3, -2];
  const A = a * c;
  const B = a * d + b * c;
  const C = b * d;
  const ans = `${lin(a, b, "x", true)}${lin(c, d, "x", true)}`;
  return {
    prompt: `次の式を因数分解しなさい。\n${poly([[A, "x²"], [B, "x"], [C, ""]])}`,
    answer: { kind: "num", answerKind: "factor", answer: [ans] },
    point: "x² の係数と定数項を分け、ななめの積の和を合わせる",
    steps: [
      { title: "係数を2つずつに分ける", body: `x² の係数 ${A}＝${a}×${c}、定数項 ${D(C)}＝${pa(b)}×${pa(d)} と分けます。`, back: [S3] },
      {
        title: "ななめにかけて足す",
        body: `${a}×${pa(d)}＋${pa(b)}×${c}＝${D(B)} が x の係数と合うので、{{${D(ans)}}}。`,
        trap: "定数項の符号を逆に組むと、x の係数の符号が反対になる。最後に展開して確かめる。",
      },
    ],
  };
}

const INNER: [number, number][] = [
  [1, 1],
  [1, -1],
  [1, 2],
  [2, -1],
  [1, -2],
  [1, 3],
];

function okikae(r: Rng): QuestionBody {
  if (r.bool(0.6)) {
    const [u, v] = r.pick(INNER);
    const p = nz(r, -6, 6);
    let q = nz(r, -6, 6);
    if (q === p) q = -p === p ? p + 1 : -p;
    const s = p + q;
    const t = p * q;
    const X = `(${poly([[u, "x"], [v, "y"]])})`;
    const Xa = poly([[u, "x"], [v, "y"]], true);
    const shown = `${X}²${s === 0 ? "" : ` ${s < 0 ? "−" : "+"} ${Math.abs(s) === 1 ? "" : Math.abs(s)}${X}`} ${t < 0 ? "−" : "+"} ${Math.abs(t)}`;
    const ans = `(${Xa}${p < 0 ? "-" : "+"}${Math.abs(p)})(${Xa}${q < 0 ? "-" : "+"}${Math.abs(q)})`;
    return {
      prompt: `次の式を因数分解しなさい。\n${shown}`,
      answer: { kind: "num", answerKind: "factor", answer: [ans] },
      point: "くり返し出てくるかたまりを1文字におきかえる",
      steps: [
        { title: "かたまりを A とおく", body: `${poly([[u, "x"], [v, "y"]])}＝A とおくと、A²${s === 0 ? "" : ` ${s < 0 ? "−" : "+"} ${Math.abs(s) === 1 ? "" : Math.abs(s)}A`} ${t < 0 ? "−" : "+"} ${Math.abs(t)}＝(A ${p < 0 ? "−" : "+"} ${Math.abs(p)})(A ${q < 0 ? "−" : "+"} ${Math.abs(q)})。`, back: [S4] },
        { title: "A をもとにもどす", body: `A に ${poly([[u, "x"], [v, "y"]])} をもどして {{${D(ans)}}}。`, trap: "A のまま答えを終えない。最後に必ずもとの式にもどす。" },
      ],
    };
  }
  const [a, b] = r.sample([1, 2, 3, 4], 2).sort((x, y) => x - y);
  const shown = poly([[1, "x⁴"], [-(a * a + b * b), "x²"], [a * a * b * b, ""]]);
  const ans = `(x+${a})(x-${a})(x+${b})(x-${b})`;
  return {
    prompt: `次の式を因数分解しなさい。\n${shown}`,
    answer: { kind: "num", answerKind: "factor", answer: [ans] },
    point: "x² を1文字とみて、最後は和と差の積まで分ける",
    steps: [
      { title: "x² を A とおく", body: `x²＝A とおくと、A² − ${a * a + b * b}A + ${a * a * b * b}＝(A − ${a * a})(A − ${b * b})。`, back: [S4] },
      {
        title: "それぞれ和と差の積に",
        body: `(x² − ${a * a})(x² − ${b * b}) の2つのかっこは、まだ分けられます。{{${D(ans)}}}。`,
        trap: `(x² − ${a * a})(x² − ${b * b}) で止めると、因数分解が終わっていない。`,
      },
    ],
  };
}

function sanjo(r: Rng): QuestionBody {
  const k = r.pick([1, 2, 3]);
  const a = r.pick([1, 2, 3, 4]);
  const kind = r.int(0, 3);
  const kx = k === 1 ? "x" : `${k}x`;
  const k3 = k ** 3;
  let shown: string;
  let ans: string;
  let disp: string;
  let how: string;
  if (kind === 0 || kind === 1) {
    const sg = kind === 0 ? 1 : -1;
    shown = `(${kx} ${sg > 0 ? "+" : "−"} ${a})³`;
    const ts: [number, string][] = [[k3, "x³"], [sg * 3 * k * k * a, "x²"], [3 * k * a * a, "x"], [sg * a ** 3, ""]];
    ans = poly(ts, true);
    disp = poly(ts);
    how = `(A ${sg > 0 ? "+" : "−"} B)³＝A³ ${sg > 0 ? "+" : "−"} 3A²B + 3AB² ${sg > 0 ? "+" : "−"} B³ に、A＝${kx}、B＝${a} を入れます。`;
  } else {
    const sg = kind === 2 ? 1 : -1;
    shown = `(${kx} ${sg > 0 ? "+" : "−"} ${a})(${poly([[k * k, "x²"], [-sg * k * a, "x"], [a * a, ""]])})`;
    ans = poly([[k3, "x³"], [sg * a ** 3, ""]], true);
    disp = poly([[k3, "x³"], [sg * a ** 3, ""]]);
    how = `(A ${sg > 0 ? "+" : "−"} B)(A² ${sg > 0 ? "−" : "+"} AB + B²)＝A³ ${sg > 0 ? "+" : "−"} B³ の形です（A＝${kx}、B＝${a}）。`;
  }
  return {
    prompt: `次の式を展開しなさい。\n${shown}`,
    answer: { kind: "num", answerKind: "expr", answer: [ans] },
    point: "3乗の公式は、A・B に何が入るかを先に決める",
    steps: [
      { title: "公式の形を見分ける", body: how, back: [S5] },
      {
        title: "係数まで計算する",
        body: `答えは {{${disp}}}。`,
        trap: kind <= 1 ? `${kx} を3乗するとき、係数 ${k} も3乗する（${k}³＝${k3}）。符号は ${kind === 0 ? "すべて＋" : "＋と−が交互"}。` : "まん中の項は消えて、2つの項だけが残る。",
      },
    ],
  };
}

function taisho(r: Rng): QuestionBody {
  const s = r.int(2, 7);
  const p = nz(r, -6, 6);
  const v = s ** 3 - 3 * p * s;
  return {
    prompt: `x + y＝${s}、xy＝${D(p)} のとき、x³ + y³ の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `${s}^3-3*(${p})*${s}` },
    point: "x³＋y³＝(x＋y)³−3xy(x＋y) を使う",
    steps: [
      { title: "和と積で表す", body: "(x＋y)³＝x³＋y³＋3xy(x＋y) なので、{{x³＋y³＝(x＋y)³−3xy(x＋y)}}。", back: [S5] },
      {
        title: "値を入れる",
        body: `${s}³ − 3×${pa(p)}×${s}＝${s ** 3} ${-3 * p * s < 0 ? "−" : "+"} ${Math.abs(3 * p * s)}＝{{${D(v)}}}。`,
        trap: `xy が負のときは −3xy(x＋y) が正になる。符号に気をつける。`,
      },
    ],
  };
}

export const H_MATH_1_SHIKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅰ",
  review: { status: "draft" },
  sections: [
    {
      title: "展開と因数分解の基本",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "tenkai", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: tenkai },
        { id: "kyotsu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: kyotsu },
      ],
    },
    {
      title: "たすきがけ・おきかえ・3乗の公式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "tasuki", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: tasuki },
        { id: "okikae", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: okikae },
        { id: "sanjo", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: sanjo },
      ],
    },
    {
      title: "対称式の値",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "taisho", type: "A", difficulty: 3, points: 24, seconds: 150, skill: "思考・判断・表現", generate: taisho }],
    },
  ],
};
