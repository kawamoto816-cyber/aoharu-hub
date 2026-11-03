// 数学Ⅲ「微分法」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 導関数の値を問う問題は、公式に代入した式を calc に書く (商は (ac−b)/(t＋c)²、合成は na(at＋b)ⁿ⁻¹、
//   log は 2t/(t²＋a)、√ は t/s (s²−t²＝a となる組を先に決める))。三角関数・指数関数の導関数は式の形を選ぶ問題で、
//   正解の式は積・合成の公式から作り、誤りの選択肢は符号・かけ忘れなどの典型的なまちがいから作る。
//   (x²＋px＋q)eˣ の f′(x)＝0 は2つの解 r₁、r₂ を先に決めて p、q を作り、equations で照合する
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-3-bibun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "積の微分と商の微分");
const S2 = L(2, "合成関数は「外側の微分×中身の微分」");
const S3 = L(3, "三角関数の導関数");
const S4 = L(4, "eˣ は、微分しても変わらない");
const S5 = L(5, "対数関数の微分と、ルールの組み合わせ");

const D = (n: number) => (n < 0 ? `−${-n}` : String(n));
const pm = (n: number) => (n < 0 ? `− ${-n}` : `＋ ${n}`);
const pa = (n: number) => (n < 0 ? `(${D(n)})` : String(n));
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
const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const sup = (n: number) => String(n).split("").map((c) => SUP[c]).join("");
const lin = (a: number, b: number) => `${a === 1 ? "" : a === -1 ? "−" : D(a)}x${b === 0 ? "" : ` ${pm(b)}`}`;
const quad = (p: number, q: number) => `x²${p === 0 ? "" : ` ${p < 0 ? "−" : "＋"} ${Math.abs(p) === 1 ? "" : Math.abs(p)}x`}${q === 0 ? "" : ` ${pm(q)}`}`;
const fac = (r0: number) => (r0 === 0 ? "x" : `(x ${pm(-r0)})`);
const xp = (n: number) => (n === 1 ? "x" : `x${sup(n)}`);

function sho(r: Rng): QuestionBody {
  for (;;) {
    const a = nz(r, -4, 4);
    const b = r.int(-6, 6);
    const c = nz(r, -4, 4);
    const t = r.int(-3, 3);
    if (t + c === 0 || a * c - b === 0) continue;
    const v = frac(a * c - b, (t + c) ** 2);
    const den = `x ${pm(c)}`;
    return {
      prompt: `関数 f(x)＝(${lin(a, b)})/(${den}) について、f′(${D(t)}) の値を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [v], calc: `((${a})*(${c})-(${b}))/((${t})+(${c}))^2` },
      point: "(f/g)′＝(f′g−fg′)/g²。引き算の順番に注意",
      steps: [
        { title: "商の微分", body: `f′(x)＝{${D(a)}(${den}) − (${lin(a, b)})・1}/(${den})²＝${D(a * c - b)}/(${den})²。`, back: [S1] },
        { title: "代入する", body: `f′(${D(t)})＝${D(a * c - b)}/${pa(t + c)}²＝{{${F(v)}}}。`, trap: "分子は「分子の微分×分母」が先。順を逆にすると符号が逆になる。" },
      ],
    };
  }
}

function gosei(r: Rng): QuestionBody {
  const n = r.int(2, 5);
  const a = nz(r, -3, 3);
  const b = r.int(-3, 3);
  let t = r.int(-2, 2);
  if (a * t + b === 0) t += 1;
  const u = a * t + b;
  const v = n * a * u ** (n - 1);
  return {
    prompt: `関数 f(x)＝(${lin(a, b)})${sup(n)} について、f′(${D(t)}) の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `${n}*(${a})*((${a})*(${t})+(${b}))^${n - 1}` },
    point: "外側を微分し、中身の微分をかける",
    steps: [
      { title: "合成関数の微分", body: `f′(x)＝${n}(${lin(a, b)})${sup(n - 1)}・${pa(a)}。`, back: [S2] },
      { title: "代入する", body: `x＝${D(t)} で中身は ${D(u)}。f′(${D(t)})＝${n}・${pa(u)}${sup(n - 1)}・${pa(a)}＝{{${D(v)}}}。`, trap: "中身の微分 " + D(a) + " をかけ忘れない。" },
    ],
  };
}

function sankaku(r: Rng): QuestionBody {
  const kind = r.int(0, 3);
  const a = r.int(2, 5);
  let f = "";
  let opts: string[] = [];
  let why: string[] = [];
  let back = S3;
  if (kind === 0) {
    f = `${xp(a)} sin x`;
    opts = [`${a}${xp(a - 1)} sin x ＋ ${xp(a)} cos x`, `${a}${xp(a - 1)} cos x`, `${a}${xp(a - 1)} sin x − ${xp(a)} cos x`, `${xp(a)} cos x`];
    why = ["正しい。積の微分 (fg)′＝f′g＋fg′。", "積の微分は、それぞれの微分をかけるのではない。", "(sin x)′＝cos x。符号は ＋。", `${xp(a)} の微分を忘れている。`];
    back = S1;
  } else if (kind === 1) {
    f = `sin${sup(a)}x`;
    opts = [`${a} sin${a - 1 === 1 ? "" : sup(a - 1)}x cos x`, `${a} sin${a - 1 === 1 ? "" : sup(a - 1)}x`, `${a} cos${a - 1 === 1 ? "" : sup(a - 1)}x`, `−${a} sin${a - 1 === 1 ? "" : sup(a - 1)}x cos x`];
    why = ["正しい。(sin x)ⁿ を外側 uⁿ、中身 sin x とみて、中身の微分 cos x をかける。", "中身の微分 cos x をかけ忘れている。", "外側の微分では中身 sin x はそのまま残す。", "(sin x)′＝cos x なので負の符号はつかない。"];
    back = S2;
  } else if (kind === 2) {
    f = `cos ${a}x`;
    opts = [`−${a} sin ${a}x`, `${a} sin ${a}x`, `−sin ${a}x`, `${a} cos ${a}x`];
    why = ["正しい。(cos u)′＝−sin u・u′、u′＝" + a + "。", "(cos x)′＝−sin x。符号が逆。", `中身の微分 ${a} をかけ忘れている。`, "cos の微分は −sin。cos のままにならない。"];
  } else {
    f = `e^(${a}x) sin x`;
    opts = [`e^(${a}x)(${a} sin x ＋ cos x)`, `e^(${a}x)(sin x ＋ cos x)`, `${a}e^(${a}x) cos x`, `e^(${a}x)(${a} sin x − cos x)`];
    why = [`正しい。(e^(${a}x))′＝${a}e^(${a}x) と積の微分を組み合わせる。`, `e^(${a}x) の微分で中身の微分 ${a} を忘れている。`, "積の微分は、それぞれの微分をかけるのではない。", "(sin x)′＝cos x なので符号は ＋。"];
    back = S4;
  }
  return {
    prompt: `関数 y＝${f} の導関数として正しいものはどれですか。`,
    answer: { kind: "choice", options: opts, correct: 0, why },
    point: "積・合成のルールと、基本の導関数を組み合わせる",
    steps: [
      { title: "基本の導関数", body: "(sin x)′＝cos x、(cos x)′＝−sin x、(eˣ)′＝eˣ。中身があれば{{中身の微分をかける}}。", back: [S3, back] },
      { title: "答え", body: `y′＝{{${opts[0]}}}。`, trap: "積は「片方ずつ微分して足す」。それぞれの微分をかけ合わせない。" },
    ],
  };
}

function log(r: Rng): QuestionBody {
  const a = r.int(1, 9);
  const t = nz(r, -3, 3);
  const v = frac(2 * t, t * t + a);
  return {
    prompt: `関数 f(x)＝log(x² ＋ ${a}) について、f′(${D(t)}) の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `2*(${t})/((${t})^2+${a})` },
    point: "(log u)′＝u′/u",
    steps: [
      { title: "公式を使う", body: `f′(x)＝(x² ＋ ${a})′/(x² ＋ ${a})＝2x/(x² ＋ ${a})。`, back: [S5] },
      { title: "代入する", body: `f′(${D(t)})＝${D(2 * t)}/${t * t + a}＝{{${F(v)}}}。`, trap: "1/(x²＋" + a + ") で終わらせない。中身の微分 2x をかける。" },
    ],
  };
}

function root(r: Rng): QuestionBody {
  const [t, s] = r.pick([
    [1, 2], [1, 3], [2, 3], [1, 4], [2, 4], [3, 4], [3, 5], [4, 5], [2, 5], [1, 5], [5, 6], [4, 6], [6, 7], [5, 7],
  ] as const);
  const a = s * s - t * t;
  const neg = r.bool(0.3);
  const tt = neg ? -t : t;
  const v = frac(tt, s);
  return {
    prompt: `関数 f(x)＝√(x² ＋ ${a}) について、f′(${D(tt)}) の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `(${tt})/√${t * t + a}` },
    point: "(√u)′＝u′/(2√u)",
    steps: [
      { title: "合成関数の微分", body: `f′(x)＝2x/(2√(x² ＋ ${a}))＝x/√(x² ＋ ${a})。`, back: [S1, S2] },
      { title: "代入する", body: `√(${t * t} ＋ ${a})＝${s} なので、f′(${D(tt)})＝{{${F(v)}}}。`, trap: "(√u)′ の分母の 2 と、中身の微分 2x の 2 が約分される。" },
    ],
  };
}

function kyokuchi(r: Rng): QuestionBody {
  const [r1, r2] = r.sample([-4, -3, -2, -1, 0, 1, 2, 3], 2).sort((x, y) => x - y);
  // f′(x)＝{x²＋(p＋2)x＋(p＋q)}eˣ ＝ (x−r₁)(x−r₂)eˣ
  const p = -(r1 + r2) - 2;
  const q = r1 * r2 - p;
  const fx = quad(p, q);
  return {
    prompt: `関数 f(x)＝(${fx})eˣ について、f′(x)＝0 となる x の値をすべて求めなさい。`,
    answer: { kind: "num", answerKind: "roots", answer: [String(r1), String(r2)], labels: ["x =", "x ="], equations: [`x^2+(${p + 2})*x+(${p + q})=0`] },
    point: "積の微分のあと eˣ でくくる。eˣ＞0 は 0 にならない",
    steps: [
      { title: "積の微分", body: `f′(x)＝(2x${p === 0 ? "" : ` ${pm(p)}`})eˣ ＋ (${fx})eˣ。`, back: [S1, S4] },
      { title: "eˣ でくくる", body: `f′(x)＝(${quad(p + 2, p + q)})eˣ＝${fac(r1)}${fac(r2)}eˣ。` },
      { title: "解く", body: `eˣ＞0 なので、{{x＝${D(r1)}、${D(r2)}}}。`, trap: "eˣ を微分しても eˣ。(" + fx + ") の微分だけで終わらせない。" },
    ],
  };
}

export const H_MATH_3_BIBUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅲ",
  review: { status: "draft" },
  sections: [
    {
      title: "積・商・合成関数の微分",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "sho", type: "A", difficulty: 1, points: 15, seconds: 90, skill: "知識・技能", generate: sho },
        { id: "gosei", type: "A", difficulty: 1, points: 15, seconds: 90, skill: "知識・技能", generate: gosei },
        { id: "root", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: root },
      ],
    },
    {
      title: "いろいろな関数の微分",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "sankaku", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: sankaku },
        { id: "log", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: log },
        { id: "kyokuchi", type: "A", difficulty: 3, points: 22, seconds: 210, skill: "思考・判断・表現", generate: kyokuchi },
      ],
    },
  ],
};
