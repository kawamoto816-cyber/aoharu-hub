// 数学Ⅲ「積分法の応用」の単元模試 (A: 係数・区間を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 放物線と直線の面積は (β−α)³/6、y＝√x と y＝x/m の間の面積は m³/6、区分求積は c/(m＋1) を calc に。
//   回転体の体積は π を単位の外に出し、π の係数 (y＝√x は a²/2、y＝x² は a⁵/5、y＝kx は k²a³/3) を calc に。
//   道のりは v＝2t−c の符号が変わる t＝c/2 で区間を分け t₀²＋(T−t₀)² を、位置の変化は T²−cT を calc に。
//   曲線 y＝(2/3)x^(3/2) の長さは ∫√(1＋x)dx＝(2/3)(s³−u³) (1＋x の両端を平方数にする) を calc に書く
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-3-sekibun-oyo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "面積は「上の式 − 下の式」を積分する");
const S2 = L(2, "区分求積法：長方形の和の極限が定積分");
const S3 = L(3, "体積は「断面積」を積分する");
const S4 = L(4, "曲線の長さと道のりも、微小な部分の和");

const D = (n: number) => (n < 0 ? `−${-n}` : String(n));
const pm = (n: number) => (n < 0 ? `− ${-n}` : `＋ ${n}`);
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
function frac(n: number, d: number): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
}
const SUP: Record<string, string> = { "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵" };

function menseki(r: Rng): QuestionBody {
  const [al, be] = r.sample([-3, -2, -1, 0, 1, 2, 3, 4], 2).sort((x, y) => x - y);
  const p = al + be;
  const q = -al * be;
  const line = `${p === 0 ? "" : `${p === 1 ? "" : p === -1 ? "−" : D(p)}x`}${q === 0 ? "" : p === 0 ? D(q) : ` ${pm(q)}`}` || "0";
  const v = frac((be - al) ** 3, 6);
  return {
    prompt: `放物線 y＝x² と直線 y＝${line} で囲まれた部分の面積を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `((${be})-(${al}))^3/6` },
    point: "交点で区間を決め、∫(上−下)dx",
    steps: [
      { title: "交点", body: `x²＝${line} を解いて x＝${D(al)}、${D(be)}。この間では直線が上。`, back: [S1] },
      { title: "積分する", body: `S＝∫[${D(al)}→${D(be)}] {(${line}) − x²} dx＝(${D(be)} − ${al < 0 ? `(${D(al)})` : al})³/6＝{{${v}}}。`, trap: "上と下を逆にすると負の値になる。面積は「上−下」。" },
    ],
  };
}

function kubun(r: Rng): QuestionBody {
  const m = r.int(1, 4);
  const c = r.int(1, 6);
  const v = frac(c, m + 1);
  const pow = m === 1 ? "" : SUP[String(m)];
  return {
    prompt: `極限 lim[n→∞] (${c === 1 ? "" : c}/n)Σ[k＝1〜n] (k/n)${pow} を、定積分を使って求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${c}/(${m}+1)` },
    point: "1/n を dx、k/n を x とみる",
    steps: [
      { title: "定積分に直す", body: `${c === 1 ? "" : c}∫[0→1] x${pow} dx。`, back: [S2] },
      { title: "計算する", body: `${c === 1 ? "" : c}・1/${m + 1}＝{{${v}}}。`, trap: "区間は 0 から 1。k/n の範囲で決まる。" },
    ],
  };
}

function menseki2(r: Rng): QuestionBody {
  const c = r.int(1, 2);
  const m = r.int(1, 5);
  const X = (c * m) ** 2;
  const v = frac(c ** 4 * m ** 3, 6);
  const cur = c === 1 ? "√x" : `${c}√x`;
  const ln = m === 1 ? "x" : `x/${m}`;
  return {
    prompt: `曲線 y＝${cur} と直線 y＝${ln} で囲まれた部分の面積を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `2/3*${c}*${c * m}^3-${X}^2/(2*${m})` },
    point: "交点 x＝0、" + X + "。この間では曲線が上",
    steps: [
      { title: "交点", body: `${cur}＝${ln} から x＝0、${X}。`, back: [S1] },
      { title: "積分する", body: `∫[0→${X}] (${cur} − ${ln}) dx＝(2/3)・${c === 1 ? "" : `${c}・`}${c * m}³ − ${X}²/${2 * m}＝{{${v}}}。`, trap: "(" + X + ")^(3/2)＝" + c * m + "³。" },
    ],
  };
}

function taiseki(r: Rng): QuestionBody {
  const kind = r.int(0, 2);
  const a = r.int(1, 4);
  if (kind === 0) {
    const v = frac(a * a, 2);
    return {
      prompt: `曲線 y＝√x（0≦x≦${a}）と x 軸、直線 x＝${a} で囲まれた部分を、x 軸のまわりに1回転してできる立体の体積を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [v], labels: ["V ="], unit: "π", calc: `${a}^2/2` },
      point: "V＝π∫y²dx。切り口は半径 y の円",
      steps: [
        { title: "式を立てる", body: `V＝π∫[0→${a}] (√x)² dx＝π∫[0→${a}] x dx。`, back: [S3] },
        { title: "計算する", body: `π・${a * a}/2＝{{${v}π}}。`, trap: "y を2乗し忘れない。断面積は πy²。" },
      ],
    };
  }
  if (kind === 1) {
    const b = r.int(1, 2);
    const v = frac(b ** 5, 5);
    return {
      prompt: `曲線 y＝x²（0≦x≦${b}）と x 軸、直線 x＝${b} で囲まれた部分を、x 軸のまわりに1回転してできる立体の体積を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [v], labels: ["V ="], unit: "π", calc: `${b}^5/5` },
      point: "V＝π∫y²dx。切り口は半径 y の円",
      steps: [
        { title: "式を立てる", body: `V＝π∫[0→${b}] (x²)² dx＝π∫[0→${b}] x⁴ dx。`, back: [S3] },
        { title: "計算する", body: `π・${b ** 5}/5＝{{${v}π}}。`, trap: "y を2乗し忘れない。(x²)²＝x⁴。" },
      ],
    };
  }
  const k = r.int(1, 3);
  const v = frac(k * k * a ** 3, 3);
  return {
    prompt: `直線 y＝${k === 1 ? "" : k}x（0≦x≦${a}）と x 軸、直線 x＝${a} で囲まれた三角形を、x 軸のまわりに1回転してできる円錐の体積を、積分で求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], labels: ["V ="], unit: "π", calc: `${k}^2*${a}^3/3` },
    point: "V＝π∫y²dx。円錐の公式 (1/3)πr²h と一致する",
    steps: [
      { title: "式を立てる", body: `V＝π∫[0→${a}] (${k === 1 ? "" : k}x)² dx＝${k * k === 1 ? "" : k * k}π∫[0→${a}] x² dx。`, back: [S3] },
      { title: "計算する", body: `${k * k}π・${a ** 3}/3＝{{${v}π}}。底面の半径 ${k * a}、高さ ${a} の円錐の体積と一致します。`, trap: "y を2乗し忘れない。" },
    ],
  };
}

function michinori(r: Rng): QuestionBody {
  const T = r.int(3, 6);
  const t0 = r.int(1, T - 1);
  const c = 2 * t0;
  const askDist = r.bool(0.7);
  const v = askDist ? t0 * t0 + (T - t0) ** 2 : T * T - c * T;
  return {
    prompt: `数直線上を動く点の時刻 t における速度が v＝2t − ${c} であるとき、t＝0 から t＝${T} までの${askDist ? "道のり" : "位置の変化量"}を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: askDist ? `${t0}^2+(${T}-${t0})^2` : `${T}^2-${c}*${T}` },
    point: askDist ? "道のりは ∫|v|dt。v の符号が変わる所で分ける" : "位置の変化は ∫v dt（向きをふくむ）",
    steps: [
      { title: "v の符号", body: `v＝2(t − ${t0}) なので、0≦t≦${t0} で v≦0、${t0}≦t≦${T} で v≧0。`, back: [S4] },
      askDist
        ? { title: "区間を分けて積分", body: `∫[0→${t0}] (${c} − 2t)dt ＋ ∫[${t0}→${T}] (2t − ${c})dt＝${t0 * t0} ＋ ${(T - t0) ** 2}＝{{${v}}}。`, trap: "∫v dt をそのまま計算すると、もどった分が引かれてしまう。" }
        : { title: "そのまま積分", body: `∫[0→${T}] (2t − ${c})dt＝${T * T} − ${c * T}＝{{${D(v)}}}。`, trap: "位置の変化は向きをふくむので、負になることもある。" },
    ],
  };
}

function nagasa(r: Rng): QuestionBody {
  if (r.bool()) {
    const [a, b] = r.sample([0, 1, 2, 3], 2).sort((x, y) => x - y);
    const v = frac(b ** 3 + 3 * b - a ** 3 - 3 * a, 3);
    return {
      prompt: `曲線 y＝(1/3)(x² ＋ 2)^(3/2) の ${a}≦x≦${b} の部分の長さを求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [v], calc: `(${b}^3/3+${b})-(${a}^3/3+${a})` },
      point: "L＝∫√(1＋(y′)²)dx。√ の中が平方になる",
      steps: [
        { title: "y′ を出す", body: "y′＝x√(x² ＋ 2) なので、1 ＋ (y′)²＝x⁴ ＋ 2x² ＋ 1＝(x² ＋ 1)²。", back: [S4] },
        { title: "積分する", body: `L＝∫[${a}→${b}] (x² ＋ 1) dx＝[x³/3 ＋ x]＝{{${v}}}。`, trap: "√(1＋(y′)²) の 1 を忘れない。" },
      ],
    };
  }
  const u = r.int(1, 3);
  const s = r.int(u + 1, 4);
  const a = u * u - 1;
  const b = s * s - 1;
  const v = frac(2 * (s ** 3 - u ** 3), 3);
  return {
    prompt: `曲線 y＝(2/3)x^(3/2) の ${a}≦x≦${b} の部分の長さを求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `2/3*(${s}^3-${u}^3)` },
    point: "L＝∫√(1＋(y′)²)dx",
    steps: [
      { title: "y′ を出す", body: "y′＝x^(1/2) なので、1 ＋ (y′)²＝1 ＋ x。", back: [S4] },
      { title: "積分する", body: `L＝∫[${a}→${b}] √(1 ＋ x) dx＝[(2/3)(1 ＋ x)^(3/2)]＝(2/3)(${s}³ − ${u}³)＝{{${v}}}。`, trap: "√(1＋(y′)²) の 1 を忘れない。" },
    ],
  };
}

export const H_MATH_3_SEKIBUN_OYO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅲ",
  review: { status: "draft" },
  sections: [
    {
      title: "面積と区分求積法",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "menseki", type: "A", difficulty: 1, points: 15, seconds: 90, skill: "知識・技能", generate: menseki },
        { id: "kubun", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: kubun },
        { id: "menseki2", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: menseki2 },
      ],
    },
    {
      title: "体積・道のり・曲線の長さ",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "taiseki", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: taiseki },
        { id: "michinori", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: michinori },
        { id: "nagasa", type: "A", difficulty: 3, points: 22, seconds: 180, skill: "思考・判断・表現", generate: nagasa },
      ],
    },
  ],
};
