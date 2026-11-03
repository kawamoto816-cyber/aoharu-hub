// 数学Ⅱ「式と証明」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 二項定理の係数は ₙCᵣ×aʳ×bⁿ⁻ʳ を calc に書いて照合する。割り算は商 Q・余り R を先に決め、P＝(x−a)Q＋R を展開して問題を作る。
//   恒等式は a・b を先に決めて右辺を作り、係数比較の2式を equations に書く。相加・相乗平均と平均の速さは calc で検算
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-2-shomei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "二項定理：ほしい項だけ取り出す");
const S2 = L(2, "整式の割り算：A＝BQ+R");
const S3 = L(3, "恒等式：係数比較と数値代入");
const S5 = L(5, "不等式の証明と相加平均・相乗平均");
const S6 = L(6, "平均の速さは、もう1つの平均");

// ---- 式の書き方 (表示は −・²、答えと calc は ASCII) ----
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };
const sup = (n: number) => [...String(n)].map((c) => SUP[c]).join("");
const SUB: Record<string, string> = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉" };
const sub = (n: number) => [...String(n)].map((c) => SUB[c]).join("");
const nCr = (n: number, k: number) => {
  let v = 1;
  for (let i = 0; i < k; i++) v = (v * (n - i)) / (i + 1);
  return Math.round(v);
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
function sq(n: number): [number, number] {
  let k = 1;
  let m = n;
  for (let i = 2; i * i <= m; i++)
    while (m % (i * i) === 0) {
      m /= i * i;
      k *= i;
    }
  return [k, m];
}

function nikou(r: Rng): QuestionBody {
  const n = r.int(4, 6);
  const a = r.int(1, 3);
  let b = nz(r, -3, 3);
  if (gcd(a, b) !== 1) b = b > 0 ? 1 : -1;
  const k = r.int(1, n - 1);
  const C = nCr(n, k);
  const v = C * a ** k * b ** (n - k);
  const ax = a === 1 ? "x" : `${a}x`;
  return {
    prompt: `(${ax} ${b < 0 ? "−" : "+"} ${Math.abs(b)})${sup(n)} を展開したときの x${sup(k)} の係数を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `${C}*${a}^${k}*(${b})^${n - k}` },
    point: "一般項 ₙCᵣ aⁿ⁻ʳ bʳ から、x の指数が合う項を選ぶ",
    steps: [
      {
        title: "一般項を書く",
        body: `一般項は ${"ₙ"}C${"ᵣ"}(${ax})${"ⁿ⁻ʳ"}(${D(b)})ʳ。x${sup(k)} になるのは ${ax} を ${k} 個選ぶとき、つまり {{${sub(n)}C${sub(n - k)}×${a}${sup(k)}×${pa(b)}${sup(n - k)}}}。`,
        back: [S1],
      },
      {
        title: "係数を計算する",
        body: `${sub(n)}C${sub(n - k)}＝${C} なので、${C}×${a ** k}×${pa(b ** (n - k))}＝{{${D(v)}}}。`,
        trap: b < 0 ? `${pa(b)} を ${n - k} 回かけるので、符号は ${(n - k) % 2 ? "−" : "＋"}。` : `x の係数 ${a} も ${k} 乗するのを忘れない。`,
      },
    ],
  };
}

function warizan(r: Rng): QuestionBody {
  const a = nz(r, -4, 4);
  const c = nz(r, -5, 5);
  const d = nz(r, -6, 6);
  const R = nz(r, -9, 9);
  const P: [number, string][] = [
    [1, "x³"],
    [c - a, "x²"],
    [d - a * c, "x"],
    [R - a * d, ""],
  ];
  const Q: [number, string][] = [
    [1, "x²"],
    [c, "x"],
    [d, ""],
  ];
  const div = `x ${a < 0 ? "+" : "−"} ${Math.abs(a)}`;
  return {
    prompt: `整式 ${poly(P)} を ${div} で割ったときの商を求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [poly(Q, true)] },
    point: "最高次の項から順に、商の項を1つずつ立てる",
    steps: [
      { title: "x³ を消す", body: `x³÷x＝x² を商に立て、x²(${div}) を引くと ${poly([[c, "x²"], [d - a * c, "x"]])} が残ります。`, back: [S2] },
      { title: "くり返す", body: `次に ${D(c)}x、その次に ${D(d)} を立てます。商は {{${poly(Q)}}}、余りは ${D(R)}。` },
      { title: "確かめ", body: `(${div})(${poly(Q)}) ＋ (${D(R)}) を展開すると、もとの式にもどります（A＝BQ＋R）。`, trap: "引き算のとき、符号を全部変え忘れて余りがずれやすい。" },
    ],
  };
}

function koto(r: Rng): QuestionBody {
  const m = nz(r, -4, 4);
  let n = nz(r, -4, 4);
  if (n === m) n = m === 4 ? -4 : m + 1;
  const a = nz(r, -6, 6);
  let b = nz(r, -6, 6);
  if (a + b === 0) b = b === 6 ? 5 : b + 1;
  const p = a + b;
  const q = a * m + b * n;
  const lin = (k: number) => `x ${k < 0 ? "−" : "+"} ${Math.abs(k)}`;
  return {
    prompt: `等式 a(${lin(m)}) ＋ b(${lin(n)}) ＝ ${poly([[p, "x"], [q, ""]])} が x についての恒等式となるように、定数 a、b の値を定めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(a), String(b)], labels: ["a =", "b ="], equations: [`a+b=${p}`, `${m}*a+(${n})*b=${q}`] },
    point: "左辺を整理して、同じ次数の係数を等しくおく",
    steps: [
      { title: "左辺を整理する", body: `左辺＝(a＋b)x ＋ (${D(m)}a ${n < 0 ? "−" : "+"} ${Math.abs(n)}b)。`, back: [S3] },
      { title: "係数を比べる", body: `{{a＋b＝${D(p)}}}、{{${D(m)}a ${n < 0 ? "−" : "+"} ${Math.abs(n)}b＝${D(q)}}} を連立します。` },
      { title: "解く", body: `a＝{{${D(a)}}}、b＝{{${D(b)}}}。x＝${D(-m)} を代入すると b の式だけになり、早く確かめられます。` },
    ],
  };
}

function sokan(r: Rng): QuestionBody {
  let a = 1;
  let b = 1;
  for (let i = 0; i < 30; i++) {
    a = r.int(1, 6);
    b = r.int(2, 30);
    if (a !== b && gcd(a, b) < 4) break;
  }
  const c = r.int(-5, 5);
  const [k, m] = sq(a * b);
  const ansA = m === 1 ? String(2 * k + c) : c === 0 ? `${2 * k}√${m}` : `${c}+${2 * k}√${m}`;
  const shown = `${a === 1 ? "" : a}x ＋ ${b}/x${c === 0 ? "" : ` ${c < 0 ? "−" : "＋"} ${Math.abs(c)}`}`;
  return {
    prompt: `x＞0 のとき、${shown} の最小値を求めなさい。`,
    answer: { kind: "num", answerKind: m === 1 ? "num" : "surd", answer: [ansA], calc: `2*√${a * b}+${c}` },
    point: "積が定数になる2数に、相加平均≧相乗平均を使う",
    steps: [
      { title: "積が定数の2数を見つける", body: `${a === 1 ? "" : a}x と ${b}/x は正で、積は ${a * b}（x が消える）。`, back: [S5] },
      {
        title: "相加平均≧相乗平均",
        body: `${a === 1 ? "" : a}x ＋ ${b}/x ≧ 2√(${a}x×${b}/x)＝2√${a * b}＝${m === 1 ? 2 * k : `${2 * k}√${m}`}。等号は ${a === 1 ? "" : a}x＝${b}/x のとき成り立ちます。`,
        trap: "等号が成り立つ x があるかを確かめないと、最小値とはいえない。",
      },
      { title: "定数を加える", body: `最小値は {{${D(ansA)}}}。` },
    ],
  };
}

const SPEED: { who: string; pairs: [number, number][]; unit: string }[] = [
  { who: "自転車", unit: "km", pairs: [[10, 15], [12, 24], [20, 30], [18, 9], [24, 12], [15, 10]] },
  { who: "車", unit: "km", pairs: [[40, 60], [30, 60], [60, 90], [45, 90], [36, 45], [70, 30], [50, 75], [80, 48]] },
  { who: "徒歩", unit: "km", pairs: [[3, 6], [6, 3], [2, 6], [6, 2]] },
];
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

function sokudo(r: Rng): QuestionBody {
  const ctx = r.pick(SPEED);
  const [v1, v2] = r.pick(ctx.pairs);
  const d = lcm(v1, v2) * r.int(1, 2);
  const t1 = d / v1;
  const t2 = d / v2;
  const h = (2 * d) / (t1 + t2);
  const name = r.pick(["A さん", "B さん", "C さん"]);
  const move = ctx.who === "徒歩" ? "歩いて" : `${ctx.who}で`;
  return {
    prompt: `${name}は、${d}km はなれた2地点の間を${move}往復した。行きは時速 ${v1}km、帰りは時速 ${v2}km で進んだ。往復の平均の速さは時速何 km ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(h)], unit: "km", labels: ["時速"], calc: `2*${d}/(${d}/${v1}+${d}/${v2})` },
    point: "平均の速さ＝全体の道のり÷全体の時間",
    steps: [
      { title: "全体の時間", body: `行き ${d}÷${v1}＝${t1} 時間、帰り ${d}÷${v2}＝${t2} 時間で、合計 ${t1 + t2} 時間。`, back: [S6] },
      {
        title: "全体の道のり÷時間",
        body: `${2 * d}÷${t1 + t2}＝{{${h}}}。これは ${v1} と ${v2} の{{調和平均}} 2×${v1}×${v2}/(${v1}＋${v2}) と同じです。`,
        trap: `(${v1}＋${v2})÷2＝${(v1 + v2) / 2} は相加平均。遅いほうに長くいるので、平均の速さはそれより小さくなる。`,
      },
    ],
  };
}

function teisu(r: Rng): QuestionBody {
  const form = r.int(0, 2);
  const a = r.pick([1, 2, 3, -1, -2, -3]);
  let n: number;
  let k: number;
  let shown: string;
  let expo: string;
  const A = Math.abs(a);
  const sg = a < 0 ? "−" : "＋";
  if (form === 0) {
    n = r.pick([4, 6]);
    k = n / 2;
    shown = `(x ${sg} ${A}/x)${sup(n)}`;
    expo = `xⁿ⁻ʳ×(1/x)ʳ＝x${sup(n)}⁻²ʳ なので、${n}−2r＝0 から r＝${k}`;
  } else if (form === 1) {
    n = r.pick([3, 6]);
    k = (2 * n) / 3;
    shown = `(x² ${sg} ${A}/x)${sup(n)}`;
    expo = `(x²)ⁿ⁻ʳ×(1/x)ʳ＝x${sup(2 * n)}⁻³ʳ なので、${2 * n}−3r＝0 から r＝${k}`;
  } else {
    n = r.pick([3, 6]);
    k = n / 3;
    shown = `(x ${sg} ${A}/x²)${sup(n)}`;
    expo = `xⁿ⁻ʳ×(1/x²)ʳ＝x${sup(n)}⁻³ʳ なので、${n}−3r＝0 から r＝${k}`;
  }
  const C = nCr(n, k);
  const v = C * a ** k;
  return {
    prompt: `${shown} を展開したときの定数項を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `${C}*(${a})^${k}` },
    point: "一般項の x の指数が 0 になる r を探す",
    steps: [
      { title: "一般項の x の指数", body: `後ろの項を r 個選ぶ一般項を考えます。${expo}。`, back: [S1] },
      { title: "係数を計算する", body: `${sub(n)}C${sub(k)}×${pa(a)}${sup(k)}＝${C}×${pa(a ** k)}＝{{${D(v)}}}。`, trap: "x の指数だけでなく、分子の数 a も r 乗する。" },
    ],
  };
}

export const H_MATH_2_SHOMEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅱ",
  review: { status: "draft" },
  sections: [
    {
      title: "二項定理と整式の割り算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "nikou", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: nikou },
        { id: "warizan", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: warizan },
      ],
    },
    {
      title: "恒等式・相加平均と相乗平均",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "koto", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: koto },
        { id: "sokan", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: sokan },
        { id: "sokudo", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: sokudo },
      ],
    },
    {
      title: "二項定理の応用",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "teisu", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: teisu }],
    },
  ],
};
