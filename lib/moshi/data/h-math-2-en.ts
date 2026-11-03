// 数学Ⅱ「円の方程式」の単元模試 (A: 中心・半径・直線を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 円の式は中心と半径から展開し、採点器が式として照合する。半径は平方完成で出る r² から √ を calc に書く。
//   円と直線の位置関係は d² と r² を整数のまま比べて選択肢を決める。接線は円上の格子点から作り、弦の長さは 2√(r²−d²) を calc に書く。
//   2円の交点を通る直線は、2式を引いた式を y について解いたもの (交わることを生成時に確かめる)。scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-2-en";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "円の方程式は距離の式から");
const S2 = L(2, "x²+y²+lx+my+n＝0 は平方完成で読む");
const S3 = L(3, "円と直線の位置関係は d と r でくらべる");
const S4 = L(4, "接線は半径に垂直");
const S5 = L(5, "2つの円の式を引くと、交点を通る直線になる");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
function polyQ(ts: [number, number, string][], ascii = false): string {
  let out = "";
  for (const [n0, d0, m0] of ts) {
    if (n0 === 0) continue;
    let n = n0;
    let d = d0;
    if (d < 0) [n, d] = [-n, -d];
    const g = gcd(n, d);
    n /= g;
    d /= g;
    const m = ascii ? m0.replace(/²/g, "^2") : m0;
    const a = Math.abs(n);
    const body = d === 1 ? (m && a === 1 ? m : `${a}${m}`) : ascii ? `${a}/${d}${m}` : m ? `(${a}/${d})${m}` : `${a}/${d}`;
    if (!out) out = (n < 0 ? (ascii ? "-" : "−") : "") + body;
    else out += ascii ? `${n < 0 ? "-" : "+"}${body}` : ` ${n < 0 ? "−" : "+"} ${body}`;
  }
  return out || "0";
}
const poly = (ts: [number, string][], ascii = false) => polyQ(ts.map(([c, m]) => [c, 1, m]), ascii);
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
const root = (n: number) => {
  const [k, m] = sq(n);
  return m === 1 ? String(k) : `${k === 1 ? "" : k}√${m}`;
};
const pt = (x: number, y: number) => `(${D(x)}, ${D(y)})`;
const sh = (v: string, a: number) => (a === 0 ? `${v}²` : `(${v} ${a < 0 ? "+" : "−"} ${Math.abs(a)})²`);

function hoteishiki(r: Rng): QuestionBody {
  const a = r.int(-5, 5);
  const b = nz(r, -5, 5);
  const viaPoint = r.bool(0.4);
  let R: number;
  let cond: string;
  let how: string;
  if (viaPoint) {
    const dx = nz(r, -4, 4);
    const dy = r.int(-4, 4);
    R = dx * dx + dy * dy;
    cond = `中心が点 ${pt(a, b)} で、点 ${pt(a + dx, b + dy)} を通る円`;
    how = `半径²は2点の距離の2乗で ${pa(dx)}²＋${pa(dy)}²＝${R}。`;
  } else {
    const rr = r.int(1, 6);
    R = rr * rr;
    cond = `中心が点 ${pt(a, b)}、半径が ${rr} の円`;
    how = `r²＝${R}。`;
  }
  const C = a * a + b * b - R;
  const ts: [number, string][] = [
    [1, "x²"],
    [1, "y²"],
    [-2 * a, "x"],
    [-2 * b, "y"],
    [C, ""],
  ];
  return {
    prompt: `${cond}の方程式を x² ＋ y² ＋ lx ＋ my ＋ n ＝ 0 の形で表すとき、左辺を答えなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [poly(ts, true)], unit: "= 0" },
    point: "(x−a)²＋(y−b)²＝r² を書いてから展開する",
    steps: [
      { title: "基本形", body: `${how}{{${sh("x", a)} ＋ ${sh("y", b)} ＝ ${R}}}。`, back: [S1] },
      { title: "展開して移項", body: `展開して右辺を移すと {{${poly(ts)} ＝ 0}}。`, trap: "定数項は a²＋b²−r²。r² を引き忘れない。" },
    ],
  };
}

function hankei(r: Rng): QuestionBody {
  const a = r.int(-5, 5);
  const b = nz(r, -5, 5);
  const R = r.int(2, 30);
  const C = a * a + b * b - R;
  const ts: [number, string][] = [
    [1, "x²"],
    [1, "y²"],
    [-2 * a, "x"],
    [-2 * b, "y"],
    [C, ""],
  ];
  const ans = root(R);
  return {
    prompt: `円 ${poly(ts)} ＝ 0 の半径を求めなさい。`,
    answer: { kind: "num", answerKind: sq(R)[1] === 1 ? "num" : "surd", answer: [ans], calc: `√${R}` },
    point: "x と y をそれぞれ平方完成する",
    steps: [
      { title: "平方完成", body: `${sh("x", a)}${a === 0 ? "" : ` − ${a * a}`} ＋ ${sh("y", b)} − ${b * b}${C === 0 ? "" : ` ${C < 0 ? "−" : "＋"} ${Math.abs(C)}`} ＝ 0。`, back: [S2] },
      { title: "右辺に集める", body: `${sh("x", a)} ＋ ${sh("y", b)} ＝ ${R}。中心は ${pt(a, b)}、半径は √${R}＝{{${ans}}}。`, trap: "右辺の数がそのまま半径ではない。√ をとる。" },
    ],
  };
}

const IKIND = ["異なる2点で交わる", "1点で接する", "共有点をもたない"];

function iti(r: Rng): QuestionBody {
  const kind = r.int(0, 2);
  let R = 5;
  let m = 1;
  let k = 1;
  for (let i = 0; i < 80; i++) {
    R = r.pick([2, 4, 5, 8, 9, 10, 13, 16, 18, 20]);
    m = r.int(-3, 3);
    k = nz(r, -8, 8);
    const lhs = k * k;
    const rhs = R * (1 + m * m);
    if ((kind === 0 && lhs < rhs) || (kind === 1 && lhs === rhs) || (kind === 2 && lhs > rhs)) break;
  }
  const ok = (kind === 0 && k * k < R * (1 + m * m)) || (kind === 1 && k * k === R * (1 + m * m)) || (kind === 2 && k * k > R * (1 + m * m));
  if (!ok) [R, m, k] = kind === 0 ? [5, 1, 2] : kind === 1 ? [5, 2, 5] : [4, 1, 5];
  const Dv = (2 * m * k) ** 2 - 4 * (1 + m * m) * (k * k - R);
  const line = poly([[m, "x"], [k, ""]]);
  const why = [0, 1, 2].map((i) =>
    i === kind ? `D/4＝${D(Dv / 4)}${kind === 1 ? "" : kind === 0 ? " ＞ 0" : " ＜ 0"}（d ${kind === 0 ? "＜" : kind === 1 ? "＝" : "＞"} r）なので正しい。` : `${IKIND[i]}のは D ${i === 0 ? "＞" : i === 1 ? "＝" : "＜"} 0 のとき。この場合 D/4＝${D(Dv / 4)}。`,
  );
  return {
    prompt: `円 x² ＋ y² ＝ ${R} と直線 y ＝ ${line} の位置関係として正しいものを選びなさい。`,
    answer: { kind: "choice", options: IKIND, correct: kind, why },
    point: "代入して判別式、または中心からの距離 d と r を比べる",
    steps: [
      { title: "y を代入", body: `x² ＋ (${line})² ＝ ${R} を整理すると ${poly([[1 + m * m, "x²"], [2 * m * k, "x"], [k * k - R, ""]])} ＝ 0。`, back: [S3] },
      { title: "判別式", body: `D/4＝${pa(m * k)}² − ${1 + m * m}×${pa(k * k - R)}＝{{${D(Dv / 4)}}}。符号から{{${IKIND[kind]}}}。`, trap: "距離で比べるときは d²＝k²/(1＋m²) と r²＝" + R + " を比べると √ がいらない。" },
    ],
  };
}

const LATTICE: [number, number, number][] = [];
for (const R of [2, 5, 8, 10, 13, 17, 20, 25])
  for (let x = -5; x <= 5; x++)
    for (let y = -5; y <= 5; y++) if (x !== 0 && y !== 0 && x * x + y * y === R) LATTICE.push([x, y, R]);

function sessen(r: Rng): QuestionBody {
  const [x1, y1, R] = r.pick(LATTICE);
  const ans = polyQ([[-x1, y1, "x"], [R, y1, ""]], true);
  const disp = polyQ([[-x1, y1, "x"], [R, y1, ""]]);
  return {
    prompt: `円 x² ＋ y² ＝ ${R} 上の点 ${pt(x1, y1)} における接線の方程式を、y＝ の形で求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [ans], labels: ["y ="] },
    point: "円 x²＋y²＝r² 上の点の接線は x₁x＋y₁y＝r²",
    steps: [
      { title: "接線の公式", body: `x₁x＋y₁y＝r² に入れて {{${D(x1)}x ${y1 < 0 ? "−" : "＋"} ${Math.abs(y1) === 1 ? "" : Math.abs(y1)}y ＝ ${R}}}。`, back: [S4] },
      { title: "y について解く", body: `y＝{{${disp}}}。半径の傾き ${polyQ([[y1, x1, ""]])} と積が −1 になっていることも確かめられます。`, trap: "x₁x＋y₁y＝r² の右辺は r²。r としない。" },
    ],
  };
}

const NORM: [number, number, number][] = [
  [3, 4, 5],
  [4, 3, 5],
  [3, -4, 5],
  [4, -3, 5],
  [5, 12, 13],
  [12, 5, 13],
  [1, 0, 1],
  [0, 1, 1],
];

function gen(r: Rng): QuestionBody {
  const [a, b, n] = r.pick(NORM);
  const rr = r.int(3, 8);
  const d = r.int(1, rr - 1);
  const c = n * d * (r.bool() ? 1 : -1);
  const len2 = 4 * (rr * rr - d * d);
  const ans = root(len2);
  const line = `${poly([[a, "x"], [b, "y"]])} ＝ ${D(c)}`;
  return {
    prompt: `円 x² ＋ y² ＝ ${rr * rr} が直線 ${line} から切り取る弦の長さを求めなさい。`,
    answer: { kind: "num", answerKind: sq(len2)[1] === 1 ? "num" : "surd", answer: [ans], calc: `2*√${rr * rr - d * d}` },
    point: "中心と直線の距離 d から、弦の半分は √(r²−d²)",
    steps: [
      { title: "中心からの距離", body: `中心 (0, 0) と直線の距離 d＝|${D(-c)}|/√(${a * a}＋${b * b})＝{{${d}}}。`, back: [S3] },
      { title: "三平方の定理", body: `弦の半分は √(${rr * rr} − ${d * d})＝${root(rr * rr - d * d)}。弦の長さは {{${ans}}}。`, trap: "半分の長さで答えを終えない。2倍する。" },
    ],
  };
}

function kouten(r: Rng): QuestionBody {
  let R1 = 9;
  let a = 2;
  let b = 1;
  let R2 = 4;
  for (let i = 0; i < 80; i++) {
    R1 = r.pick([4, 5, 9, 10, 16, 25]);
    a = r.int(-4, 4);
    b = nz(r, -4, 4);
    R2 = r.int(2, 20);
    const d = Math.sqrt(a * a + b * b);
    const r1 = Math.sqrt(R1);
    const r2 = Math.sqrt(R2);
    if (Math.abs(r1 - r2) + 1e-9 < d && d < r1 + r2 - 1e-9) break;
  }
  const dd = Math.sqrt(a * a + b * b);
  if (!(Math.abs(Math.sqrt(R1) - Math.sqrt(R2)) + 1e-9 < dd && dd < Math.sqrt(R1) + Math.sqrt(R2) - 1e-9)) [R1, a, b, R2] = [9, 2, 1, 4];
  const K = a * a + b * b + R1 - R2;
  const ans = polyQ([[-2 * a, 2 * b, "x"], [K, 2 * b, ""]], true);
  const disp = polyQ([[-2 * a, 2 * b, "x"], [K, 2 * b, ""]]);
  const c2 = `${sh("x", a)} ＋ ${sh("y", b)} ＝ ${R2}`;
  const sub = poly([[2 * a, "x"], [2 * b, "y"], [-(a * a + b * b) + R2 - R1, ""]]);
  return {
    prompt: `2つの円 x² ＋ y² ＝ ${R1}、${c2} は2点で交わる。この2つの交点を通る直線の方程式を、y＝ の形で求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [ans], labels: ["y ="] },
    point: "2つの円の式を「＝0」にそろえて引く",
    steps: [
      { title: "「＝0」の形にそろえる", body: `x²＋y²−${R1}＝0、${poly([[1, "x²"], [1, "y²"], [-2 * a, "x"], [-2 * b, "y"], [a * a + b * b - R2, ""]])}＝0。`, back: [S1] },
      { title: "引き算", body: `1つ目から2つ目を引くと x²、y² が消えて {{${sub} ＝ 0}}。2つの交点はどちらもこの式をみたします。`, back: [S5] },
      { title: "y について解く", body: `y＝{{${disp}}}。`, trap: "引く前に、両方を「＝0」の形にしておかないと定数項がずれる。" },
    ],
  };
}

export const H_MATH_2_EN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅱ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "円の方程式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hoteishiki", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: hoteishiki },
        { id: "hankei", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: hankei },
      ],
    },
    {
      title: "円と直線",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "iti", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: iti },
        { id: "sessen", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: sessen },
        { id: "gen", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: gen },
      ],
    },
    {
      title: "2つの円",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "kouten", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: kouten }],
    },
  ],
};
