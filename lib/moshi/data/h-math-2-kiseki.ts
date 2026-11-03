// 数学Ⅱ「軌跡と領域」の単元模試 (A: 点・比・不等式を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 2点から等距離の点の軌跡は PA²＝PB² を整理した直線、放物線の頂点の軌跡は t を消した式で、採点器が式として照合する。
//   アポロニウスの円は PA²＝k²PB² を整理した中心・半径を、中点の軌跡は中点の式を equations に書く (座標が整数になるように作る)。
//   領域の選択肢は不等式に代入して判定し、最大・最小は境界の交点 (整数) と係数を先に決めて calc に書く。
//   scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-2-kiseki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "軌跡を求める手順");
const S2 = L(2, "距離の比が一定なら円（アポロニウスの円）");
const S3 = L(3, "動く点にともなって動く点");
const S4 = L(4, "不等式の表す領域");
const S5 = L(5, "領域を使った最大・最小");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
/** 「− n」を、n が負なら「+ |n|」、0 なら空にする */
const mn = (n: number) => (n === 0 ? "" : n < 0 ? ` + ${-n}` : ` − ${n}`);
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
function frac(n: number, d: number): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  return D(d / g === 1 ? `${n / g}` : `${n / g}/${d / g}`);
}
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
const pt = (x: number, y: number) => `(${D(x)}, ${D(y)})`;
const sh = (v: string, a: number) => (a === 0 ? `${v}²` : `(${v} ${a < 0 ? "+" : "−"} ${Math.abs(a)})²`);

function touchi(r: Rng): QuestionBody {
  const x1 = r.int(-4, 4);
  const y1 = r.int(-4, 4);
  const dx = r.int(-4, 4);
  const dy = nz(r, -4, 4);
  const x2 = x1 + dx;
  const y2 = y1 + dy;
  const S = x2 * x2 + y2 * y2 - x1 * x1 - y1 * y1;
  const ts: [number, number, string][] = [
    [-2 * dx, 2 * dy, "x"],
    [S, 2 * dy, ""],
  ];
  return {
    prompt: `2点 A${pt(x1, y1)}、B${pt(x2, y2)} から等しい距離にある点 P の軌跡を、y＝ の形の方程式で求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [polyQ(ts, true)], labels: ["y ="] },
    point: "P(x, y) とおいて PA²＝PB² を整理する",
    steps: [
      { title: "条件を式にする", body: `P(x, y) とおくと、PA＝PB から {{${sh("x", x1)} ＋ ${sh("y", y1)} ＝ ${sh("x", x2)} ＋ ${sh("y", y2)}}}。`, back: [S1] },
      { title: "整理する", body: `x²、y² は消えて ${poly([[2 * dx, "x"], [2 * dy, "y"]])} ＝ ${D(S)}。`, trap: "2乗のまま比べてよい（PA、PB はどちらも0以上）。" },
      { title: "y について解く", body: `{{y＝${polyQ(ts)}}}。これは線分 AB の垂直二等分線です。` },
    ],
  };
}

function ryoiki(r: Rng): QuestionBody {
  const R = r.pick([9, 10, 13, 16]);
  const m = r.int(-2, 2);
  const k = r.int(-2, 2);
  const inR = (x: number, y: number) => x * x + y * y < R;
  const above = (x: number, y: number) => y > m * x + k;
  const onB = (x: number, y: number) => x * x + y * y === R || y === m * x + k;
  const ins: [number, number][] = [];
  const outs: [number, number][] = [];
  for (let x = -4; x <= 4; x++)
    for (let y = -4; y <= 4; y++) {
      if (onB(x, y)) continue;
      (inR(x, y) && above(x, y) ? ins : outs).push([x, y]);
    }
  const good = ins.length ? r.pick(ins) : ([0, 3] as [number, number]);
  const bads = r.sample(outs, 3);
  const opts = r.shuffle([good, ...bads]);
  const line = poly([[m, "x"], [k, ""]]);
  const why = opts.map(([x, y]) => {
    const c1 = inR(x, y);
    const c2 = above(x, y);
    const s1 = `x²＋y²＝${x * x + y * y}${c1 ? "＜" : "＞"}${R}`;
    const s2 = `y＝${D(y)}、${line}＝${D(m * x + k)} で y${c2 ? "＞" : "＜"}${line}`;
    return c1 && c2 ? `${s1}、${s2}。両方をみたすので正しい。` : `${s1}、${s2}。${!c1 ? "1つ目" : "2つ目"}の不等式をみたさない。`;
  });
  return {
    prompt: `連立不等式 x² ＋ y² ＜ ${R}、y ＞ ${line} の表す領域に含まれる点を選びなさい。`,
    answer: { kind: "choice", options: opts.map(([x, y]) => pt(x, y)), correct: opts.indexOf(good), why },
    point: "点を代入して、2つの不等式を両方みたすか調べる",
    steps: [
      { title: "それぞれの領域", body: `x²＋y²＜${R} は円の{{内部}}、y＞${line} は直線の{{上側}}。その共通部分です。`, back: [S4] },
      { title: "代入して確かめる", body: `${pt(good[0], good[1])} は x²＋y²＝${good[0] ** 2 + good[1] ** 2}＜${R}、y＝${D(good[1])}＞${D(m * good[0] + k)} で、両方をみたします。`, trap: "片方だけみたす点を選ばない。連立は「かつ」。" },
    ],
  };
}

function choten(r: Rng): QuestionBody {
  const k = nz(r, -4, 4);
  const c = r.int(-5, 5);
  const ts: [number, string][] = [
    [-1, "x²"],
    [k, "x"],
    [c, ""],
  ];
  return {
    prompt: `t が実数全体を動くとき、放物線 y ＝ x² − 2tx ${k < 0 ? "−" : "＋"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}t${c === 0 ? "" : ` ${c < 0 ? "−" : "＋"} ${Math.abs(c)}`} の頂点の軌跡を、y＝ の形の方程式で求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [poly(ts, true)], labels: ["y ="] },
    point: "頂点を (X, Y) とおき、t を消去する",
    steps: [
      { title: "頂点を t で表す", body: `y＝(x − t)² − t² ${k < 0 ? "−" : "＋"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}t${c === 0 ? "" : ` ${c < 0 ? "−" : "＋"} ${Math.abs(c)}`} なので、頂点は {{X＝t、Y＝${poly([[-1, "t²"], [k, "t"], [c, ""]])}}}。`, back: [S1] },
      { title: "t を消す", body: `t＝X を代入して Y＝${poly([[-1, "X²"], [k, "X"], [c, ""]])}。文字を x、y にもどして {{y＝${poly(ts)}}}。`, trap: "t が実数全体を動くので、X もすべての実数をとる。除く点はない。" },
    ],
  };
}

function apollo(r: Rng): QuestionBody {
  const k = r.pick([2, 3]);
  const kk = k * k;
  const a = r.int(-4, 4);
  const b = a + (kk - 1) * r.pick([1, -1]) * (k === 2 ? r.int(1, 2) : 1);
  const cx = (kk * b - a) / (kk - 1);
  const rad = (k * Math.abs(a - b)) / (kk - 1);
  return {
    prompt: `2点 A(${D(a)}, 0)、B(${D(b)}, 0) からの距離の比が PA：PB＝${k}：1 である点 P の軌跡は円になる。この円の中心の x 座標と半径を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(cx), String(rad)], labels: ["中心の x 座標 =", "半径 ="], equations: [`x=(${kk}*(${b})-(${a}))/${kk - 1}`, `y=${k}*${Math.abs(a - b)}/${kk - 1}`] },
    point: "PA²＝k²PB² を整理して平方完成",
    steps: [
      { title: "条件を式にする", body: `P(x, y) とおくと、PA＝${k}PB から ${sh("x", a)} ＋ y² ＝ ${kk}{${sh("x", b)} ＋ y²}。`, back: [S2] },
      { title: "整理する", body: `${kk - 1}x² ＋ ${kk - 1}y² ${2 * a - 2 * kk * b < 0 ? "−" : "＋"} ${Math.abs(2 * a - 2 * kk * b)}x ${kk * b * b - a * a < 0 ? "−" : "＋"} ${Math.abs(kk * b * b - a * a)} ＝ 0 を ${kk - 1} でわって平方完成します。` },
      { title: "中心と半径", body: `${cx === 0 ? "x" : `(x${mn(cx)})`}² ＋ y² ＝ ${rad * rad}。中心の x 座標は {{${D(cx)}}}、半径は {{${rad}}}。`, trap: "A と B の中点が中心になるわけではない。比が 1：1 でないときは円になる。" },
    ],
  };
}

function tomonau(r: Rng): QuestionBody {
  const mid = r.bool(0.6);
  const R = r.pick([2, 3, 4, 6]);
  const c = r.int(-4, 4);
  const d = r.int(-4, 4);
  let a: number;
  let b: number;
  let X: number;
  let Y: number;
  let eqs: string[];
  let how: string;
  let rad: string;
  if (mid) {
    a = c + 2 * r.int(-3, 3);
    b = d + 2 * nz(r, -3, 3);
    X = (a + c) / 2;
    Y = (b + d) / 2;
    eqs = [`x=(${a}+(${c}))/2`, `y=(${b}+(${d}))/2`];
    how = `M(x, y) とすると x＝(${D(a)}＋s)/2、y＝(${D(b)}＋t)/2 なので、s＝2x${mn(a)}、t＝2y${mn(b)}`;
    rad = frac(R, 2);
  } else {
    a = c + 3 * r.int(-2, 2);
    b = d + 3 * nz(r, -2, 2);
    X = (a + 2 * c) / 3;
    Y = (b + 2 * d) / 3;
    eqs = [`x=(${a}+2*(${c}))/3`, `y=(${b}+2*(${d}))/3`];
    how = `Q(x, y) とすると x＝(${D(a)}＋2s)/3、y＝(${D(b)}＋2t)/3 なので、s＝(3x${mn(a)})/2、t＝(3y${mn(b)})/2`;
    rad = frac(2 * R, 3);
  }
  const circ = `${sh("x", c)} ＋ ${sh("y", d)} ＝ ${R * R}`;
  return {
    prompt: `点 P が円 ${circ} 上を動くとき、点 A${pt(a, b)} と P を結ぶ線分 AP の${mid ? "中点 M" : "2：1 に内分する点（P に近い側）Q"} の軌跡は円になる。その円の中心の座標を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(X), String(Y)], labels: ["x =", "y ="], equations: eqs },
    point: "動く点 P(s, t) を、軌跡の点の座標で表して代入",
    steps: [
      { title: "P を (s, t) とおく", body: `${how}。`, back: [S3] },
      { title: "P の条件に代入", body: `${sh("s", c)}＋${sh("t", d)}＝${R * R} に代入して整理すると、中心 {{${pt(X, Y)}}}、半径 ${rad} の円になります。`, trap: "P の座標と軌跡の点の座標を同じ文字にしない。別の文字でおく。" },
    ],
  };
}

const STEEP: [number, number][] = [
  [2, 1],
  [3, 1],
  [3, 2],
];
const SHALLOW: [number, number][] = [
  [1, 2],
  [1, 3],
  [2, 3],
];
const OBJ: [number, number][] = [
  [1, 1],
  [2, 1],
  [1, 2],
  [3, 2],
  [2, 3],
  [3, 1],
  [1, 3],
];

function saidai(r: Rng): QuestionBody {
  const X = r.int(1, 5);
  const Y = r.int(1, 5);
  const [a1, b1] = r.pick(STEEP);
  const [a2, b2] = r.pick(SHALLOW);
  const c1 = a1 * X + b1 * Y;
  const c2 = a2 * X + b2 * Y;
  const objs = OBJ.filter(([p, q]) => p * b2 > a2 * q && p * b1 < a1 * q);
  const [p, q] = objs.length ? r.pick(objs) : [1, 1];
  const v = p * X + q * Y;
  const f = poly([[p, "x"], [q, "y"]]);
  return {
    prompt: `x、y が4つの不等式 x ≧ 0、y ≧ 0、${poly([[a1, "x"], [b1, "y"]])} ≦ ${c1}、${poly([[a2, "x"], [b2, "y"]])} ≦ ${c2} をみたすとき、${f} の最大値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `${p}*${X}+${q}*${Y}` },
    point: "f＝k とおいた直線を平行に動かし、頂点で最大を探す",
    steps: [
      { title: "領域の頂点", body: `領域は四角形で、頂点は (0, 0)、(${frac(c1, a1)}, 0)、{{${pt(X, Y)}}}、(0, ${frac(c2, b2)})。${pt(X, Y)} は2直線の交点です。`, back: [S4] },
      { title: "直線 f＝k を動かす", body: `${f}＝k は傾き ${frac(-p, q)} の直線。傾きが2本の境界の傾き ${frac(-a1, b1)} と ${frac(-a2, b2)} の間にあるので、k が最大になるのは交点 ${pt(X, Y)} を通るとき。`, back: [S5] },
      { title: "最大値", body: `${p}×${X}＋${q}×${Y}＝{{${v}}}。`, trap: `x 軸・y 軸上の頂点の値（${frac(p * c1, a1)}、${frac(q * c2, b2)}）と比べて確かめる。` },
    ],
  };
}

export const H_MATH_2_KISEKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅱ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "軌跡と領域の基本",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "touchi", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: touchi },
        { id: "ryoiki", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: ryoiki },
      ],
    },
    {
      title: "いろいろな軌跡",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "choten", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: choten },
        { id: "apollo", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: apollo },
        { id: "tomonau", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: tomonau },
      ],
    },
    {
      title: "領域と最大値",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "saidai", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: saidai }],
    },
  ],
};
