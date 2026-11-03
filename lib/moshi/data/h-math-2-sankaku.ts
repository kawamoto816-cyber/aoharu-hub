// 数学Ⅱ「三角関数」の単元模試 (A: 角・値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 弧度法は 度/180 を calc に (答えは π の係数)。三角関数の値は表から答えを出し、calc は「象限の符号 × 鋭角 (30°・45°・60°) の値」で
//   別に作って照合する。相互関係は sin²＋cos²＝1 から √ を calc に、周期は 2π/b を calc に、sinθ＋cosθ＝t の対称式は
//   sinθcosθ＝(t²−1)/2 から作る式を calc に書く (scripts/check-moshi.ts がシード1〜100で確かめる)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-2-sankaku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "弧度法：角を「弧の長さ」で測る");
const S2 = L(2, "単位円の上の点 (cosθ, sinθ)");
const S3 = L(3, "値は単位円の点の座標を読む");
const S4 = L(4, "相互関係で残りの値を出す");
const S5 = L(5, "グラフは波。周期に注目");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
function frac(n: number, d: number, ascii = false): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  const s = d / g === 1 ? `${n / g}` : `${n / g}/${d / g}`;
  return ascii ? s : D(s);
}
/** (n/d)π の表示 */
function rad(n: number, d: number): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  n /= g;
  d /= g;
  if (n === 0) return "0";
  const a = Math.abs(n);
  return `${n < 0 ? "−" : ""}${a === 1 ? "" : a}π${d === 1 ? "" : `/${d}`}`;
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
/** s×a√m/b (m は平方因数なし) を整理した文字列 */
function sf(s: number, a: number, m: number, b: number, ascii = false): string {
  if (m === 1) return frac(s * a, b, ascii);
  const g = gcd(a, b);
  a /= g;
  b /= g;
  const t = `${s < 0 ? "-" : ""}${a === 1 ? "" : a}√${m}${b === 1 ? "" : `/${b}`}`;
  return ascii ? t : D(t);
}

function kodo(r: Rng): QuestionBody {
  const k = r.int(1, 24);
  const deg = 15 * k;
  if (r.bool()) {
    return {
      prompt: `${deg}° を弧度法で表しなさい。答えは ○π の形で、○ にあてはまる数を答えなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [frac(deg, 180, true)], unit: "π", calc: `${deg}/180` },
      point: "180°＝π（ラジアン）",
      steps: [
        { title: "180° が π", body: `1°＝π/180 なので、${deg}°＝${deg}×π/180。`, back: [S1] },
        { title: "約分する", body: `{{${rad(deg, 180)}}}。`, trap: "π/180 と 180/π を逆にしない。度→ラジアンは π/180 をかける。" },
      ],
    };
  }
  const n = deg / gcd(deg, 180);
  const d = 180 / gcd(deg, 180);
  return {
    prompt: `${rad(n, d)} を度数法で表しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(deg)], unit: "°", calc: `${n}*180/${d}` },
    point: "π を 180° におきかえる",
    steps: [
      { title: "π＝180°", body: `${rad(n, d)}＝${n === 1 ? "" : `${n}×`}180°${d === 1 ? "" : `÷${d}`}。`, back: [S1] },
      { title: "計算", body: `{{${deg}°}}。` },
    ],
  };
}

const SIN: Record<number, string> = { 0: "0", 30: "1/2", 45: "√2/2", 60: "√3/2", 90: "1", 120: "√3/2", 135: "√2/2", 150: "1/2", 180: "0", 210: "-1/2", 225: "-√2/2", 240: "-√3/2", 270: "-1", 300: "-√3/2", 315: "-√2/2", 330: "-1/2" };
const TAN: Record<number, string> = { 0: "0", 30: "√3/3", 45: "1", 60: "√3", 120: "-√3", 135: "-1", 150: "-√3/3", 180: "0", 210: "√3/3", 225: "1", 240: "√3", 300: "-√3", 315: "-1", 330: "-√3/3" };
const BASE: Record<string, Record<number, string>> = {
  sin: { 30: "1/2", 45: "√2/2", 60: "√3/2" },
  cos: { 30: "√3/2", 45: "√2/2", 60: "1/2" },
  tan: { 30: "√3/3", 45: "1", 60: "√3" },
};
const md = (a: number) => ((a % 360) + 360) % 360;
function trig(f: string, deg: number): string {
  const t = md(deg);
  return f === "sin" ? SIN[t] : f === "cos" ? SIN[md(t + 90)] : TAN[t];
}

function atai(r: Rng): QuestionBody {
  let deg = 30;
  for (let i = 0; i < 30; i++) {
    deg = r.bool() ? 30 * r.int(-11, 23) : 45 * r.int(-7, 15);
    if (deg % 90 !== 0) break;
  }
  if (deg % 90 === 0) deg = 150;
  const f = r.pick(["sin", "cos", "tan"]);
  const ans = trig(f, deg);
  const t = md(deg);
  const ref = Math.min(t % 180, 180 - (t % 180));
  const num = f === "sin" ? Math.sin((t * Math.PI) / 180) : f === "cos" ? Math.cos((t * Math.PI) / 180) : Math.tan((t * Math.PI) / 180);
  const sg = num < 0 ? -1 : 1;
  const n = deg / gcd(deg, 180);
  const d = 180 / gcd(deg, 180);
  const q = t < 90 ? 1 : t < 180 ? 2 : t < 270 ? 3 : 4;
  return {
    prompt: `${f}(${rad(n, d)}) の値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [ans], calc: `${sg}*(${BASE[f][ref]})` },
    point: "単位円の点を取り、鋭角の値に符号をつける",
    steps: [
      { title: "単位円で位置を見る", body: `${rad(n, d)} は ${D(deg)}°。${deg !== t ? `一周分をのぞくと ${t}°、` : ""}{{第${q}象限}}の角です。`, back: [S2] },
      { title: "鋭角と符号", body: `x 軸とのなす角は ${ref}°。${f} の値は ${f}${ref}°＝${D(BASE[f][ref])} に第${q}象限の符号 ${sg < 0 ? "−" : "＋"} をつけて {{${D(ans)}}}。`, back: [S3], trap: "cos は x 座標、sin は y 座標。tan は傾き（y/x）。" },
    ],
  };
}

const ANG: [number, number][] = [
  [1, 6],
  [1, 4],
  [1, 3],
  [2, 3],
  [3, 4],
  [5, 6],
  [1, 2],
  [3, 2],
];

function ougi(r: Rng): QuestionBody {
  const [p, q] = r.pick(ANG);
  const R = r.int(2, 12);
  const area = r.bool();
  const ans = area ? frac(R * R * p, 2 * q, true) : frac(R * p, q, true);
  return {
    prompt: `半径 ${R} cm、中心角 ${rad(p, q)} の扇形の${area ? "面積" : "弧の長さ"}を求めなさい。答えは ○π の形で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], unit: area ? "π cm²" : "π cm", calc: area ? `(1/2)*${R}^2*${p}/${q}` : `${R}*${p}/${q}` },
    point: area ? "扇形の面積＝(1/2)r²θ" : "弧の長さ＝rθ（θ はラジアン）",
    steps: [
      { title: "弧度法の公式", body: area ? "中心角 θ（ラジアン）の扇形の面積は {{S＝(1/2)r²θ}}。" : "中心角 θ（ラジアン）の扇形の弧の長さは {{l＝rθ}}。", back: [S1] },
      { title: "代入する", body: area ? `(1/2)×${R}²×${rad(p, q)}＝{{${rad(R * R * p, 2 * q)}}} cm²。` : `${R}×${rad(p, q)}＝{{${rad(R * p, q)}}} cm。`, trap: "度数法の 360 分の … の式とまぜない。ラジアンならそのまま r をかけるだけ。" },
    ],
  };
}

const PQ: [number, number][] = [
  [1, 3],
  [2, 3],
  [1, 4],
  [3, 4],
  [3, 5],
  [4, 5],
  [2, 5],
  [1, 5],
  [5, 13],
  [12, 13],
];
const QUAD = ["0＜θ＜π/2", "π/2＜θ＜π", "π＜θ＜3π/2", "3π/2＜θ＜2π"];
const SGN = [
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
]; // [sin の符号, cos の符号]

function sogo(r: Rng): QuestionBody {
  const [p, q] = r.pick(PQ);
  const qd = r.int(1, 3);
  const givenSin = r.bool();
  const askTan = r.bool(0.4);
  const [ss, cs] = SGN[qd];
  const s1 = givenSin ? ss : cs; // 与えた値の符号
  const s2 = givenSin ? cs : ss; // 求める (もう一方) の符号
  const n = q * q - p * p;
  const [k, m] = sq(n);
  const other = sf(s2, k, m, q, true);
  const gv = frac(s1 * p, q);
  const gf = givenSin ? "sin" : "cos";
  const of = givenSin ? "cos" : "sin";
  let ans: string;
  let calc: string;
  if (!askTan) {
    ans = other;
    calc = `${s2}*√${n}/${q}`;
  } else if (givenSin) {
    // tan＝(s1 p/q)/(s2 k√m/q)＝s1 s2 p√m/(k m)
    ans = sf(s1 * s2, p, m, k * m, true);
    calc = `(${s1}*${p}/${q})/(${s2}*√${n}/${q})`;
  } else {
    ans = m === 1 ? frac(s1 * s2 * k, p, true) : sf(s1 * s2, k, m, p, true);
    calc = `(${s2}*√${n}/${q})/(${s1}*${p}/${q})`;
  }
  return {
    prompt: `${QUAD[qd]} で ${gf}θ＝${gv} のとき、${askTan ? "tanθ" : `${of}θ`} の値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [ans], calc },
    point: "sin²θ＋cos²θ＝1 で出し、符号は象限で決める",
    steps: [
      { title: "sin²θ＋cos²θ＝1", body: `${of}²θ＝1 − (${gv})²＝${n}/${q * q}。`, back: [S4] },
      { title: "符号を決める", body: `θ は第${qd + 1}象限なので ${of}θ ${s2 < 0 ? "＜" : "＞"} 0。${of}θ＝{{${D(other)}}}。`, back: [S2], trap: "√ をとったあと、± のどちらかを象限で必ず選ぶ。" },
      ...(askTan ? [{ title: "tanθ＝sinθ/cosθ", body: `tanθ＝{{${D(ans)}}}（有理化して答える）。` }] : []),
    ],
  };
}

const BS: [number, number][] = [
  [2, 1],
  [3, 1],
  [4, 1],
  [1, 2],
  [1, 3],
  [2, 3],
  [3, 2],
];

function shuki(r: Rng): QuestionBody {
  const [bn, bd] = r.pick(BS);
  const f = r.pick(["sin", "cos", "tan"]);
  const A = r.pick([1, 2, 3]);
  const [cn, cd] = r.pick([
    [0, 1],
    [1, 6],
    [-1, 3],
    [1, 4],
    [-1, 2],
  ]);
  const bt = bd === 1 ? (bn === 1 ? "" : String(bn)) : `(${bn}/${bd})`;
  const inner = `${bt}θ${cn === 0 ? "" : ` ${cn < 0 ? "−" : "＋"} ${rad(Math.abs(cn), cd)}`}`;
  const base = f === "tan" ? 1 : 2;
  const ans = frac(base * bd, bn, true);
  return {
    prompt: `関数 y＝${A === 1 ? "" : A}${f}(${inner}) の正の周期のうち最小のものを求めなさい。答えは ○π の形で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], unit: "π", calc: `${base}/(${bn}/${bd})` },
    point: f === "tan" ? "tan(bθ＋c) の周期は π/b" : `${f}(bθ＋c) の周期は 2π/b`,
    steps: [
      { title: "θ の係数を見る", body: `θ の係数は ${frac(bn, bd)}。振幅 ${A} や、ずらし ${cn === 0 ? "（なし）" : rad(cn, cd)} は周期に関係しません。`, back: [S5] },
      { title: "周期", body: `${f === "tan" ? "π" : "2π"}÷${frac(bn, bd)}＝{{${rad(base * bd, bn)}}}。`, trap: f === "tan" ? "tan のもとの周期は 2π ではなく π。" : "係数でわる。かけるとグラフが縮む向きが逆になる。" },
    ],
  };
}

const TS: [number, number][] = [
  [1, 2],
  [1, 3],
  [2, 3],
  [1, 4],
  [3, 4],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [6, 5],
  [7, 5],
];

function taisho(r: Rng): QuestionBody {
  const [p0, q] = r.pick(TS);
  const p = r.bool(0.3) ? -p0 : p0;
  const t = `${p}/${q}`;
  const scN = p * p - q * q; // sc＝scN/(2q²)
  const scD = 2 * q * q;
  const kind = r.int(0, 2);
  let what: string;
  let ans: string;
  let calc: string;
  let how: string;
  if (kind === 0) {
    what = "sin³θ ＋ cos³θ";
    // t(1 − sc)
    ans = frac(p * (scD - scN), q * scD, true);
    calc = `(${t})*(1-((${t})^2-1)/2)`;
    how = `sin³θ＋cos³θ＝(sinθ＋cosθ)(1 − sinθcosθ)＝${frac(p, q)}×(1 − (${frac(scN, scD)}))`;
  } else if (kind === 1) {
    what = "sin⁴θ ＋ cos⁴θ";
    ans = frac(scD * scD - 2 * scN * scN, scD * scD, true);
    calc = `1-2*(((${t})^2-1)/2)^2`;
    how = `sin⁴θ＋cos⁴θ＝(sin²θ＋cos²θ)² − 2sin²θcos²θ＝1 − 2×(${frac(scN, scD)})²`;
  } else {
    what = "tanθ ＋ 1/tanθ";
    ans = frac(scD, scN, true);
    calc = `1/(((${t})^2-1)/2)`;
    how = `tanθ＋1/tanθ＝sinθ/cosθ＋cosθ/sinθ＝1/(sinθcosθ)＝1÷(${frac(scN, scD)})`;
  }
  return {
    prompt: `sinθ ＋ cosθ ＝ ${frac(p, q)} のとき、${what} の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc },
    point: "両辺を2乗して、まず sinθcosθ を求める",
    steps: [
      { title: "sinθcosθ を出す", body: `両辺を2乗すると 1 ＋ 2sinθcosθ＝${frac(p * p, q * q)} なので、{{sinθcosθ＝${frac(scN, scD)}}}。`, back: [S4] },
      { title: "和と積で表す", body: `${how}＝{{${D(ans)}}}。`, trap: "(sinθ＋cosθ)² を sin²θ＋cos²θ だけにしない。2sinθcosθ が残る。" },
    ],
  };
}

export const H_MATH_2_SANKAKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅱ",
  review: { status: "draft" },
  sections: [
    {
      title: "弧度法と三角関数の値",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kodo", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: kodo },
        { id: "atai", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: atai },
      ],
    },
    {
      title: "扇形・相互関係・周期",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "ougi", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: ougi },
        { id: "sogo", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: sogo },
        { id: "shuki", type: "A", difficulty: 2, points: 16, seconds: 75, skill: "知識・技能", generate: shuki },
      ],
    },
    {
      title: "sinθ＋cosθ の値から",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "taisho", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: taisho }],
    },
  ],
};
