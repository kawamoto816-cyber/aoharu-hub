// 数学Ⅱ「微分法」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 平均変化率は {f(q)−f(p)}/(q−p) を calc に、導関数・接線の式は採点器が式として照合する (接線は f(t)、f′(t) から作る)。
//   極値は f′(x)＝6(x−α)(x−β) となるように α、β を先に決めて f を作り、f(α) を calc に書く。外の点から引いた接線の傾きは
//   傾き m の接線が点を通る条件 (m の2次方程式) を equations に、区間の最大・最小は端と極値の4つの値を比べ、選んだ点での f の値を calc に書く
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-2-bibun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "平均変化率の区間を縮めると微分係数");
const S2 = L(2, "導関数は公式 (xⁿ)′＝nxⁿ⁻¹ で求める");
const S3 = L(3, "接線は「接点」と「傾き f′(a)」で決まる");
const S4 = L(4, "f′(x) の符号で増減がわかり、極値が求まる");

const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
/** (x − a) を (x + 3)・x のように書く */
const xm = (a: number) => (a === 0 ? "x" : `(x ${a < 0 ? "+" : "−"} ${Math.abs(a)})`);
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
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
/** 3次式 [a, b, c, d] (ax³＋bx²＋cx＋d) */
type C3 = [number, number, number, number];
const show3 = (f: C3, ascii = false) => poly([[f[0], "x³"], [f[1], "x²"], [f[2], "x"], [f[3], ""]], ascii);
const val3 = (f: C3, x: number) => f[0] * x ** 3 + f[1] * x * x + f[2] * x + f[3];
const sub3 = (f: C3, x: number) => `${f[0]}*(${x})^3+(${f[1]})*(${x})^2+(${f[2]})*(${x})+(${f[3]})`;

function heikin(r: Rng): QuestionBody {
  const a = nz(r, -3, 3);
  const b = r.int(-5, 5);
  const c = r.int(-5, 5);
  const p = r.int(-3, 2);
  const q = p + r.int(1, 4);
  const f = (x: number) => a * x * x + b * x + c;
  const v = a * (p + q) + b;
  return {
    prompt: `関数 f(x)＝${poly([[a, "x²"], [b, "x"], [c, ""]])} について、x の値が ${D(p)} から ${D(q)} まで変わるときの平均変化率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `((${f(q)})-(${f(p)}))/((${q})-(${p}))` },
    point: "平均変化率＝(y の増加量)÷(x の増加量)",
    steps: [
      { title: "f の値", body: `f(${D(p)})＝${D(f(p))}、f(${D(q)})＝${D(f(q))}。`, back: [S1] },
      { title: "変化の割合", body: `(${D(f(q))} − ${pa(f(p))})÷(${D(q)} − ${pa(p)})＝{{${D(v)}}}。`, trap: "分母は x の増加量。f の値どうしで割らない。" },
    ],
  };
}

function doukansu(r: Rng): QuestionBody {
  if (r.bool(0.35)) {
    const a = nz(r, -3, 3);
    const p = nz(r, -5, 5);
    const q = nz(r, -5, 5);
    const ans = poly([[2 * a, "x"], [a * q + p, ""]], true);
    const ax = `${a < 0 ? "−" : ""}${Math.abs(a) === 1 ? "" : Math.abs(a)}x`;
    return {
      prompt: `関数 f(x)＝(${ax} ${p < 0 ? "−" : "+"} ${Math.abs(p)})(x ${q < 0 ? "−" : "+"} ${Math.abs(q)}) を微分しなさい。`,
      answer: { kind: "num", answerKind: "expr", answer: [ans], labels: ["f′(x) ="] },
      point: "まず展開してから、項ごとに微分する",
      steps: [
        { title: "展開する", body: `f(x)＝${poly([[a, "x²"], [a * q + p, "x"], [p * q, ""]])}。`, back: [S2] },
        { title: "項ごとに微分", body: `f′(x)＝{{${poly([[2 * a, "x"], [a * q + p, ""]])}}}。`, trap: "定数項は微分すると 0。かっこの積のまま、それぞれを微分してかけない。" },
      ],
    };
  }
  const f: C3 = [nz(r, -3, 3), r.int(-5, 5), r.int(-7, 7), r.int(-9, 9)];
  const g: [number, string][] = [
    [3 * f[0], "x²"],
    [2 * f[1], "x"],
    [f[2], ""],
  ];
  return {
    prompt: `関数 f(x)＝${show3(f)} を微分しなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [poly(g, true)], labels: ["f′(x) ="] },
    point: "(xⁿ)′＝nxⁿ⁻¹、定数の微分は 0",
    steps: [
      { title: "項ごとに微分", body: `(x³)′＝3x²、(x²)′＝2x、(x)′＝1、定数は 0。係数はそのままかけます。`, back: [S2] },
      { title: "まとめる", body: `f′(x)＝{{${poly(g)}}}。`, trap: "x³ の微分を 3x³ としない。指数を前に出して、指数を1へらす。" },
    ],
  };
}

function sessen(r: Rng): QuestionBody {
  const f: C3 = [r.pick([1, 1, -1, 2]), r.int(-4, 4), r.int(-5, 5), r.int(-5, 5)];
  const t = nz(r, -2, 2);
  const m = 3 * f[0] * t * t + 2 * f[1] * t + f[2];
  const ft = val3(f, t);
  const k = ft - m * t;
  return {
    prompt: `曲線 y＝${show3(f)} 上の点 (${D(t)}, ${D(ft)}) における接線の方程式を、y＝ の形で求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [poly([[m, "x"], [k, ""]], true)], labels: ["y ="] },
    point: "傾きは f′(a)。y−f(a)＝f′(a)(x−a)",
    steps: [
      { title: "傾きを出す", body: `f′(x)＝${poly([[3 * f[0], "x²"], [2 * f[1], "x"], [f[2], ""]])} なので、f′(${D(t)})＝{{${D(m)}}}。`, back: [S3] },
      { title: "接線の式", body: `y − ${pa(ft)}＝${D(m)}(x − ${pa(t)}) を整理して {{y＝${poly([[m, "x"], [k, ""]])}}}。`, trap: "f(a) と f′(a) を取りちがえない。傾きは f′、通る点は (a, f(a))。" },
    ],
  };
}

function kyokuchi(r: Rng): QuestionBody {
  const [al, be] = r.sample([-3, -2, -1, 0, 1, 2, 3], 2).sort((x, y) => x - y);
  const half = (al + be) % 2 === 0 && r.bool(0.5);
  const k = half ? 1 : 2;
  const c0 = r.int(-5, 5);
  const f: C3 = half ? [1, (-3 * (al + be)) / 2, 3 * al * be, c0] : [2, -3 * (al + be), 6 * al * be, c0];
  const askMax = r.bool();
  const x0 = askMax ? al : be;
  const v = val3(f, x0);
  return {
    prompt: `関数 f(x)＝${show3(f)} の${askMax ? "極大値" : "極小値"}を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: sub3(f, x0) },
    point: "f′(x)＝0 の解の前後で符号を調べる",
    steps: [
      { title: "f′(x)＝0 を解く", body: `f′(x)＝${poly([[3 * f[0], "x²"], [2 * f[1], "x"], [f[2], ""]])}＝${3 * k}${xm(al)}${xm(be)} なので、x＝${D(al)}、${D(be)}。`, back: [S4] },
      { title: "増減表", body: `x³ の係数が正なので、f′ の符号は ＋、−、＋。x＝${D(al)} で極大、x＝${D(be)} で極小。` },
      { title: "値を出す", body: `f(${D(x0)})＝{{${D(v)}}}。`, trap: `極${askMax ? "大" : "小"}値は x の値ではなく f(x) の値。` },
    ],
  };
}

function gaibu(r: Rng): QuestionBody {
  let t1 = 0;
  let t2 = 0;
  for (let i = 0; i < 30; i++) {
    [t1, t2] = r.sample([-3, -2, -1, 0, 1, 2, 3, 4], 2).sort((x, y) => x - y);
    if ((t1 + t2) % 2 === 0) break;
  }
  if ((t1 + t2) % 2 !== 0) [t1, t2] = [-1, 3];
  const c = r.int(-3, 3);
  const p = (t1 + t2) / 2;
  const q = t1 * t2 + c;
  return {
    prompt: `点 (${D(p)}, ${D(q)}) から放物線 y＝${poly([[1, "x²"], [c, ""]])} に2本の接線を引く。2本の接線の傾きを求めなさい。`,
    answer: { kind: "num", answerKind: "roots", answer: [String(2 * t1), String(2 * t2)], labels: ["傾き", "傾き"], equations: [`x^2-4*(${p})*x+4*((${q})-(${c}))=0`] },
    point: "接点を (t, f(t)) とおき、点を通る条件で t を決める",
    steps: [
      { title: "接点を t とおく", body: `y′＝2x なので、x＝t での接線は y＝2tx − t²${c === 0 ? "" : ` ${c < 0 ? "−" : "＋"} ${Math.abs(c)}`}。`, back: [S3] },
      { title: "点を通る条件", body: `(${D(p)}, ${D(q)}) を代入すると ${poly([[1, "t²"], [-2 * p, "t"], [q - c, ""]])}＝0 から t＝${D(t1)}、${D(t2)}。` },
      { title: "傾き", body: `傾き 2t は {{${D(2 * t1)}、${D(2 * t2)}}}。`, trap: "点 (" + D(p) + ", " + D(q) + ") は放物線の上にないので、そこでの微分係数を傾きにしない。" },
    ],
  };
}

function saidai(r: Rng): QuestionBody {
  const [al, be] = r.sample([-2, -1, 0, 1, 2, 3], 2).sort((x, y) => x - y);
  const c0 = r.int(-5, 5);
  const f: C3 = [2, -3 * (al + be), 6 * al * be, c0];
  const Lx = al - r.int(0, 2);
  const Rx = be + r.int(1, 2);
  const askMax = r.bool();
  const cands = [...new Set([Lx, al, be, Rx])]; // 区間の端が極値の x と重なるときは1つにする
  const vals = cands.map((x) => val3(f, x));
  const best = askMax ? Math.max(...vals) : Math.min(...vals);
  const x0 = cands[vals.indexOf(best)];
  const xs = cands.filter((_, i) => vals[i] === best).map(D).join("、");
  return {
    prompt: `関数 f(x)＝${show3(f)} の ${D(Lx)} ≦ x ≦ ${D(Rx)} における${askMax ? "最大値" : "最小値"}を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(best)], calc: sub3(f, x0) },
    point: "極値と区間の両端の値を、すべて比べる",
    steps: [
      { title: "極値をとる x", body: `f′(x)＝6${xm(al)}${xm(be)} なので、x＝${D(al)} で極大、x＝${D(be)} で極小。`, back: [S4] },
      { title: "候補の値", body: cands.map((x, i) => `f(${D(x)})＝${D(vals[i])}`).join("、") + "。" },
      { title: "比べる", body: `${askMax ? "最大値" : "最小値"}は {{${D(best)}}}（x＝${xs}）。`, trap: `極${askMax ? "大" : "小"}値がそのまま${askMax ? "最大" : "最小"}値とは限らない。区間の端も必ず調べる。` },
    ],
  };
}

export const H_MATH_2_BIBUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅱ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "平均変化率と導関数",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "heikin", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: heikin },
        { id: "doukansu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: doukansu },
      ],
    },
    {
      title: "接線と極値",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "sessen", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: sessen },
        { id: "kyokuchi", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: kyokuchi },
        { id: "gaibu", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: gaibu },
      ],
    },
    {
      title: "区間での最大・最小",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "saidai", type: "A", difficulty: 3, points: 24, seconds: 210, skill: "思考・判断・表現", generate: saidai }],
    },
  ],
};
