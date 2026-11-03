// 数学Ⅰ「三角比」の単元模試 (A: 角・辺を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 辺の長さはピタゴラス数 (3,4,5 など) から作る。30°・60° などの値は (P＋Q√3)/6 の形で足し算し、calc の式で照合する。
//   三角比の表の値は小数第3位までに丸めた値 (tan 23°＝0.424 など。python の math.tan で確認) を問題文に示して使う。
//   相互関係の答えは sin²θ＋cos²θ＝1 から作った √ の式を calc にして、scripts/check-moshi.ts がシード1〜100で確かめる。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-1-sankakuhi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "3つの三角比は、直角三角形の辺の比");
const S2 = L(2, "30°・45°・60° の値は、2つの三角定規から");
const S3 = L(3, "三角比の表で、届かない高さを測る");
const S4 = L(4, "0°〜180° は、半径1の半円上の点の座標");
const S5 = L(5, "180°−θ と相互関係で、値を求める");

// ---- 式の書き方 (表示は −・²、答えと calc は ASCII) ----
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
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

const f3 = (x: number) => String(Math.round(x * 1000) / 1000);
const TRIPLES: [number, number, number][] = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
];

function teigi(r: Rng): QuestionBody {
  const [x, y, c] = r.pick(TRIPLES);
  const [a, b] = r.bool() ? [x, y] : [y, x]; // a＝BC、b＝CA、c＝AB
  const ang = r.pick(["A", "B"]);
  const fn = r.pick(["sin", "cos", "tan"]);
  const opp = ang === "A" ? a : b;
  const adj = ang === "A" ? b : a;
  const [n, d] = fn === "sin" ? [opp, c] : fn === "cos" ? [adj, c] : [opp, adj];
  const give = r.int(0, 2); // 0: 2つの直角をはさむ辺 / 1: AB と BC / 2: AB と CA
  const given = give === 0 ? `BC＝${a}、CA＝${b}` : give === 1 ? `AB＝${c}、BC＝${a}` : `AB＝${c}、CA＝${b}`;
  const third = give === 0 ? `AB＝√(${a}²＋${b}²)＝${c}` : give === 1 ? `CA＝√(${c}²−${a}²)＝${b}` : `BC＝√(${c}²−${b}²)＝${a}`;
  return {
    prompt: `∠C＝90° の直角三角形 ABC で、${given} のとき、${fn} ${ang} の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [frac(n, d, true)], calc: `${n}/${d}` },
    point: "sin＝対辺/斜辺、cos＝底辺/斜辺、tan＝対辺/底辺",
    steps: [
      { title: "残りの辺", body: `三平方の定理で ${third}。`, back: [S1] },
      { title: "角から見た辺を決める", body: `∠${ang} から見て、斜辺は AB＝${c}、向かいの辺は ${ang === "A" ? "BC" : "CA"}＝${opp}、となりの辺は ${ang === "A" ? "CA" : "BC"}＝${adj}。${fn} ${ang}＝${n}/${d}＝{{${frac(n, d)}}}。`, trap: `∠${ang} の「向かい」と「となり」を、もう一方の角と取りちがえない。` },
    ],
  };
}

/** (P＋Q√3)/6 で表した値 */
const VAL: Record<string, Record<number, [number, number]>> = {
  sin: { 0: [0, 0], 30: [3, 0], 60: [0, 3], 90: [6, 0], 120: [0, 3], 150: [3, 0], 180: [0, 0] },
  cos: { 0: [6, 0], 30: [0, 3], 60: [3, 0], 90: [0, 0], 120: [-3, 0], 150: [0, -3], 180: [-6, 0] },
  tan: { 0: [0, 0], 30: [0, 2], 60: [0, 6], 120: [0, -6], 150: [0, -2], 180: [0, 0] },
};
const ANG = [0, 30, 60, 90, 120, 150, 180];
/** 鈍角があれば半円の節、なければ三角定規の節へ */
const t2 = (ts: { th: number }[]) => (ts.some((t) => t.th > 90) ? S4 : S2);

function yumei(r: Rng): QuestionBody {
  const fns = r.shuffle(["sin", "cos", "tan"]);
  const terms = fns.map((fn) => {
    const pool = ANG.filter((x) => x in VAL[fn] && x !== 0 && x !== 180);
    return { fn, th: r.pick(pool), sg: 1 };
  });
  terms[1].sg = r.bool() ? 1 : -1;
  terms[2].sg = r.bool() ? 1 : -1;
  let P = 0;
  let Q = 0;
  for (const t of terms) {
    const [p, q] = VAL[t.fn][t.th];
    P += t.sg * p;
    Q += t.sg * q;
  }
  const shown = terms.map((t, i) => `${i === 0 ? "" : t.sg > 0 ? " + " : " − "}${t.fn} ${t.th}°`).join("");
  const val = (t: (typeof terms)[number]) => surd(VAL[t.fn][t.th][0], VAL[t.fn][t.th][1], 3, 6);
  const valA = (t: (typeof terms)[number]) => surd(VAL[t.fn][t.th][0], VAL[t.fn][t.th][1], 3, 6, true);
  return {
    prompt: `次の式の値を求めなさい。\n${shown}`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(P, Q, 3, 6, true)], calc: terms.map((t) => `${t.sg > 0 ? "+" : "-"}(${valA(t)})`).join("") },
    point: "90°をこえる角は、半円上の点の座標で符号を決める",
    steps: [
      { title: "それぞれの値", body: terms.map((t) => `${t.fn} ${t.th}°＝${val(t)}`).join("、") + "。", back: [t2(terms)] },
      { title: "計算する", body: `合わせて {{${surd(P, Q, 3, 6)}}}。`, trap: "120°・150° の cos と tan は負。sin は 0°〜180° でいつも 0 以上。" },
    ],
  };
}

const SUPP = [10, 20, 25, 35, 40, 50, 55, 65, 70, 80];

function henkan(r: Rng): QuestionBody {
  const a = r.pick(SUPP);
  const th = 180 - a;
  const fn = r.pick(["sin", "cos", "tan"]);
  const opts = fn === "tan" ? [`tan ${a}°`, `−tan ${a}°`, `1/tan ${a}°`, `−1/tan ${a}°`] : [`sin ${a}°`, `−sin ${a}°`, `cos ${a}°`, `−cos ${a}°`];
  const correct = fn === "sin" ? 0 : fn === "cos" ? 3 : 1;
  const idx = r.shuffle([0, 1, 2, 3]);
  const rule = fn === "sin" ? `sin(180°−θ)＝sin θ` : fn === "cos" ? `cos(180°−θ)＝−cos θ` : `tan(180°−θ)＝−tan θ`;
  return {
    prompt: `${fn} ${th}° と等しいものはどれですか。`,
    answer: { kind: "choice", options: idx.map((i) => opts[i]), correct: idx.indexOf(correct), why: idx.map((i) => (i === correct ? `正しい。${rule}。` : `${th}°＝180°−${a}° なので、${rule} を使う。これとは等しくない。`)) },
    point: "180°−θ では、sin はそのまま、cos と tan は符号が変わる",
    steps: [
      { title: "180°−θ の形にする", body: `${th}°＝180°−${a}°。半円上で ${th}° と ${a}° の点は、y 軸について対称です。`, back: [S4] },
      { title: "公式を使う", body: `${rule} なので、{{${fn} ${th}°＝${opts[correct]}}}。`, back: [S5], trap: "y 座標（sin）は同じ、x 座標（cos）は符号が逆。tan＝sin/cos も符号が逆になる。" },
    ],
  };
}

const TAN: Record<number, number> = { 20: 0.364, 21: 0.384, 22: 0.404, 23: 0.424, 24: 0.445, 25: 0.466, 26: 0.488, 27: 0.51, 28: 0.532, 29: 0.554, 30: 0.577, 31: 0.601, 32: 0.625, 33: 0.649, 34: 0.675, 35: 0.7 };
const SIN: Record<number, number> = { 10: 0.174, 11: 0.191, 12: 0.208, 13: 0.225, 14: 0.242, 15: 0.259, 16: 0.276, 17: 0.292, 18: 0.309, 19: 0.326, 20: 0.342 };

function hyo(r: Rng): QuestionBody {
  if (r.bool()) {
    const th = r.int(20, 35);
    const t = TAN[th];
    const d = r.step(10, 50, 10);
    const what = r.pick(["木", "校舎", "電柱", "給水塔"]);
    const h = d * t + 1.5;
    return {
      prompt: `${what}から水平に ${d}m はなれた地点で、${what}の先端を見上げた角（仰角）を測ると ${th}° であった。目の高さを 1.5m とするとき、${what}の高さは何m ですか。tan ${th}°＝${f3(t)} として計算しなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [f3(h)], unit: "m", calc: `${d}*${f3(t)}+1.5` },
      point: "高さ＝水平の距離×tan（仰角）＋目の高さ",
      steps: [
        { title: "直角三角形を見つける", body: `目の位置・${what}の真横・先端で直角三角形ができる。tan ${th}°＝（目より上の高さ）÷${d}。`, back: [S3] },
        { title: "計算する", body: `目より上は ${d}×${f3(t)}＝${f3(d * t)}（m）。1.5m を足して {{${f3(h)}m}}。`, trap: "目の高さ 1.5m を足し忘れない。" },
      ],
    };
  }
  const th = r.int(10, 20);
  const s = SIN[th];
  const d = r.step(100, 500, 100);
  const h = d * s;
  return {
    prompt: `傾きの角が ${th}° のまっすぐな坂道を、坂にそって ${d}m 進んだ。はじめの地点から何m 高くなりましたか。sin ${th}°＝${f3(s)} として計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f3(h)], unit: "m", calc: `${d}*${f3(s)}` },
    point: "斜辺がわかっていて高さを求めるなら sin",
    steps: [
      { title: "どの三角比か", body: `坂にそった ${d}m が斜辺、高さが角の向かいの辺なので {{sin}} を使う。`, back: [S1] },
      { title: "計算する", body: `${d}×${f3(s)}＝{{${f3(h)}}}（m）。`, back: [S3], trap: "水平に進んだ距離ではなく、坂にそった距離が斜辺。cos と取りちがえない。" },
    ],
  };
}

const ND: [number, number][] = [];
for (let d = 3; d <= 7; d++) for (let n = 1; n < d; n++) if (gcd(n, d) === 1) ND.push([n, d]);

function sokan(r: Rng): QuestionBody {
  const [n, d] = r.pick(ND);
  const w = d * d - n * n;
  const kind = r.int(0, 2);
  if (kind === 0) {
    // sin 鈍角 → cos
    return {
      prompt: `90° < θ < 180° で、sin θ＝${n}/${d} のとき、cos θ の値を求めなさい。`,
      answer: { kind: "num", answerKind: "surd", answer: [surd(0, -1, w, d, true)], calc: `-√${w}/${d}` },
      point: "sin²θ＋cos²θ＝1。鈍角なら cos は負",
      steps: [
        { title: "相互関係", body: `cos²θ＝1 − (${n}/${d})²＝${frac(w, d * d)}。`, back: [S5] },
        { title: "符号を決める", body: `90° < θ < 180° では cos θ < 0 なので {{cos θ＝${surd(0, -1, w, d)}}}。`, back: [S4], trap: "√ をとるとき ± の両方を考え、角の範囲で片方を選ぶ。" },
      ],
    };
  }
  const t = surd(0, -1, w, n, true);
  if (kind === 1) {
    return {
      prompt: `0° ≦ θ ≦ 180° で、cos θ＝−${n}/${d} のとき、tan θ の値を求めなさい。`,
      answer: { kind: "num", answerKind: "surd", answer: [t], calc: `-√${w}/${n}` },
      point: "sin を先に出し、tan＝sin/cos",
      steps: [
        { title: "sin を求める", body: `sin²θ＝1 − (${n}/${d})²＝${frac(w, d * d)}。0°〜180° では sin θ ≧ 0 なので sin θ＝${surd(0, 1, w, d)}。`, back: [S5] },
        { title: "tan＝sin/cos", body: `tan θ＝${surd(0, 1, w, d)} ÷ (−${n}/${d})＝{{${surd(0, -1, w, n)}}}。`, trap: "0°〜180° で sin が負になることはない。cos が負なら tan も負。" },
      ],
    };
  }
  return {
    prompt: `0° ≦ θ ≦ 180° で、cos θ＝−${n}/${d} のとき、sin θ の値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, 1, w, d, true)], calc: `√${w}/${d}` },
    point: "0°〜180° では sin θ ≧ 0",
    steps: [
      { title: "相互関係", body: `sin²θ＝1 − (−${n}/${d})²＝${frac(w, d * d)}。`, back: [S5] },
      { title: "符号を決める", body: `0° ≦ θ ≦ 180° では sin θ ≧ 0 なので {{sin θ＝${surd(0, 1, w, d)}}}。`, back: [S4], trap: "cos が負でも sin は正。符号を cos にそろえない。" },
    ],
  };
}

const KS: [number, number][] = [
  [1, 2],
  [1, 3],
  [2, 3],
  [1, 4],
  [3, 4],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [5, 6],
  [2, 7],
  [3, 7],
];

function seki(r: Rng): QuestionBody {
  const [p, q] = r.pick(KS);
  return {
    prompt: `0° ≦ θ ≦ 180° で、sin θ + cos θ＝${p}/${q} のとき、sin θ cos θ の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [frac(p * p - q * q, 2 * q * q, true)], calc: `((${p}/${q})^2-1)/2` },
    point: "両辺を2乗して sin²θ＋cos²θ＝1 を使う",
    steps: [
      { title: "両辺を2乗", body: `sin²θ + 2sin θ cos θ + cos²θ＝${p * p}/${q * q}。`, back: [S5] },
      { title: "相互関係で整理", body: `1 + 2sin θ cos θ＝${frac(p * p, q * q)} なので、{{sin θ cos θ＝${frac(p * p - q * q, 2 * q * q)}}}。`, trap: "2乗したときのまん中の項 2sin θ cos θ を落とさない。" },
    ],
  };
}

function sa(r: Rng): QuestionBody {
  const [p, q] = r.pick(KS);
  const w = 2 * q * q - p * p;
  return {
    prompt: `0° ≦ θ ≦ 180° で、sin θ + cos θ＝${p}/${q} のとき、sin θ − cos θ の値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, 1, w, q, true)], calc: `√${w}/${q}` },
    point: "(sinθ−cosθ)²＝1−2sinθcosθ。符号は θ の範囲で決める",
    steps: [
      { title: "sin θ cos θ を出す", body: `2乗して 1 + 2sin θ cos θ＝${frac(p * p, q * q)}、sin θ cos θ＝${frac(p * p - q * q, 2 * q * q)}。`, back: [S5] },
      { title: "差の2乗", body: `(sin θ − cos θ)²＝1 − 2sin θ cos θ＝${frac(w, q * q)}。` },
      {
        title: "符号を決める",
        body: `sin θ cos θ < 0 で、0°〜180° では sin θ ≧ 0 だから cos θ < 0。よって sin θ − cos θ > 0 で {{${surd(0, 1, w, q)}}}。`,
        back: [S4],
        trap: "± の両方を答えにしない。sin と cos の符号から、差の符号が1つに決まる。",
      },
    ],
  };
}

export const H_MATH_1_SANKAKUHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅰ",
  review: { status: "draft" },
  sections: [
    {
      title: "三角比の定義と値",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "teigi", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: teigi },
        { id: "yumei", type: "A", difficulty: 1, points: 12, seconds: 75, skill: "知識・技能", generate: yumei },
        { id: "henkan", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: henkan },
      ],
    },
    {
      title: "三角比の表・相互関係",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "hyo", type: "A", difficulty: 2, points: 14, seconds: 120, skill: "思考・判断・表現", generate: hyo },
        { id: "sokan", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: sokan },
        { id: "seki", type: "A", difficulty: 2, points: 14, seconds: 90, skill: "知識・技能", generate: seki },
      ],
    },
    {
      title: "sin θ − cos θ の値",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "sa", type: "A", difficulty: 3, points: 20, seconds: 180, skill: "思考・判断・表現", generate: sa }],
    },
  ],
};
