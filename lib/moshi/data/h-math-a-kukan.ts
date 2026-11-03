// 数学A「作図・空間図形」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: オイラーの多面体定理 v−e+f＝2・正多面体の辺の数 (面の数×辺の数÷2) は calc に、
// 長さ (√a の作図・三平方の定理・正四面体・立方体の切り口) は答えの2乗の等式を equations に書く。
// ねじれの位置は立方体の頂点を座標にして「平行でも交わりもしない」をコードで判定して選択肢を作る。
// scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-a-kukan";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const BACK_SAKUZU = L(1, "作図の基本");
const BACK_HEIHO = L(2, "長さ a, b から ab や √a をつくる");
const BACK_NEJIRE = L(3, "空間の2直線は3つの関係");
const BACK_EULER = L(4, "多面体の v−e+f=2 と正多面体");
const BACK_KEIRYO = L(5, "立体の計量は「三角形を取り出す」");

/** √n を "k√m" に */
function sq(n: number): { text: string; kind: "num" | "surd" } {
  let k = 1;
  let m = n;
  for (let d = 2; d * d <= m; d++)
    while (m % (d * d) === 0) {
      m /= d * d;
      k *= d;
    }
  if (m === 1) return { text: String(k), kind: "num" };
  return { text: `${k === 1 ? "" : k}√${m}`, kind: "surd" };
}

function euler(r: Rng): QuestionBody {
  const n = r.int(3, 12);
  // n角柱・n角錐・n角錐を2つ底面で貼り合わせた立体の (v, e, f)
  const [v, e, f] = r.pick([
    [2 * n, 3 * n, n + 2],
    [n + 1, 2 * n, n + 1],
    [n + 2, 3 * n, 2 * n],
  ] as const);
  const ask = r.pick(["v", "e", "f"] as const);
  const given = { v: `頂点の数が ${v}`, e: `辺の数が ${e}`, f: `面の数が ${f}` };
  const label = { v: "頂点", e: "辺", f: "面" };
  const ans = { v, e, f }[ask];
  const others = (["v", "e", "f"] as const).filter((k) => k !== ask);
  const calc = ask === "e" ? `${v}+${f}-2` : ask === "v" ? `2+${e}-${f}` : `2-${v}+${e}`;
  return {
    prompt: `へこみのない多面体で、${given[others[0]]}、${given[others[1]]} であるものがある。この多面体の${label[ask]}の数を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], calc },
    point: "オイラーの多面体定理 v−e＋f＝2",
    steps: [
      { title: "オイラーの多面体定理", body: "凸多面体では、頂点の数 v、辺の数 e、面の数 f について {{v−e＋f＝2}}。", back: [BACK_EULER] },
      { title: "代入する", body: `${ask === "v" ? `v−${e}＋${f}＝2` : ask === "e" ? `${v}−e＋${f}＝2` : `${v}−${e}＋f＝2`} より、${label[ask]}の数は {{${ans}}}。`, trap: "符号に注意。v と f はたし、e はひく。" },
    ],
  };
}

const SEI: [string, number, number, number][] = [
  // 名前, 面の数, 1面の辺の数, 1頂点に集まる面の数
  ["正四面体", 4, 3, 3],
  ["正六面体（立方体）", 6, 4, 3],
  ["正八面体", 8, 3, 4],
  ["正十二面体", 12, 5, 3],
  ["正二十面体", 20, 3, 5],
];
const KAKU = ["", "", "", "正三角形", "正方形", "正五角形"];
function seitamen(r: Rng): QuestionBody {
  const [name, f, p, q] = r.pick(SEI);
  const askV = r.bool();
  const e = (f * p) / 2;
  const v = (f * p) / q;
  return {
    prompt: `${name}は、合同な${KAKU[p]}${f}枚でできていて、どの頂点にも${q}枚の面が集まっている。${name}の${askV ? "頂点" : "辺"}の数を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(askV ? v : e)], calc: askV ? `${f}*${p}/${q}` : `${f}*${p}/2` },
    point: askV ? "面の頂点の合計を、1頂点に集まる面の数で割る" : "面の辺の合計を2で割る (1辺を2面が共有)",
    steps: askV
      ? [
          { title: "面の頂点を全部数える", body: `${f}枚×${p}個＝${f * p}個。1つの頂点は${q}枚の面に共有されています。`, back: [BACK_EULER] },
          { title: "重なりを割る", body: `${f * p}÷${q}＝{{${v}}}。（確かめ：${v}−${e}＋${f}＝2）` },
        ]
      : [
          { title: "面の辺を全部数える", body: `${f}枚×${p}本＝${f * p}本。1本の辺は2枚の面に共有されています。`, back: [BACK_EULER] },
          { title: "2で割る", body: `${f * p}÷2＝{{${e}}}。（確かめ：${v}−${e}＋${f}＝2）`, trap: "2で割り忘れると、同じ辺を2回数えたままになる。" },
        ],
  };
}

// 立方体 ABCD-EFGH (ABCD が下の面、E は A の真上)
const P: Record<string, [number, number, number]> = {
  A: [0, 0, 0],
  B: [1, 0, 0],
  C: [1, 1, 0],
  D: [0, 1, 0],
  E: [0, 0, 1],
  F: [1, 0, 1],
  G: [1, 1, 1],
  H: [0, 1, 1],
};
const EDGES = ["AB", "BC", "CD", "DA", "EF", "FG", "GH", "HE", "AE", "BF", "CG", "DH"];
const dir = (s: string) => P[s[1]].map((x, i) => x - P[s[0]][i]);
const parallel = (a: string, b: string) => {
  const [u, v] = [dir(a), dir(b)];
  return u[1] * v[2] - u[2] * v[1] === 0 && u[2] * v[0] - u[0] * v[2] === 0 && u[0] * v[1] - u[1] * v[0] === 0;
};
/** 立方体の辺どうしは、頂点を共有するときだけ交わる */
const meets = (a: string, b: string) => [...a].some((c) => b.includes(c));
const rel = (a: string, b: string) => (parallel(a, b) ? "平行" : meets(a, b) ? "交わる" : "ねじれの位置");

function nejire(r: Rng): QuestionBody {
  const base = r.pick(EDGES);
  const others = EDGES.filter((e) => e !== base);
  const skew = others.filter((e) => rel(base, e) === "ねじれの位置");
  const ok = r.pick(skew);
  const wrong = r.sample(
    others.filter((e) => rel(base, e) !== "ねじれの位置"),
    3,
  );
  const opts = r.shuffle([ok, ...wrong]);
  return {
    prompt: `立方体 ABCD-EFGH（四角形 ABCD が底面で、AE、BF、CG、DH が側面の辺）がある。辺 ${base} とねじれの位置にある辺を、次から1つ選びなさい。`,
    answer: {
      kind: "choice",
      options: opts.map((e) => `辺 ${e}`),
      correct: opts.indexOf(ok),
      why: opts.map((e) => (e === ok ? `辺 ${e} は ${base} と平行でなく、交わりもしない。同じ平面上にないので、ねじれの位置。` : `辺 ${e} は辺 ${base} と${rel(base, e) === "平行" ? "平行（同じ平面上にある）" : "頂点を共有して交わる"}。`)),
    },
    point: "平行でも、交わりもしない2直線がねじれの位置",
    steps: [
      { title: "3つの関係", body: "空間の2直線は、{{交わる・平行・ねじれの位置}}のどれか。ねじれの位置の2直線は、同じ平面上にありません。", back: [BACK_NEJIRE] },
      { title: "除いていく", body: `辺 ${base} と頂点を共有する辺（交わる）、平行な辺を除くと、残りは ${skew.map((e) => `辺 ${e}`).join("、")} の {{${skew.length}本}}。`, trap: "見た目で交わっていなくても、平行ならねじれの位置ではない。" },
    ],
  };
}

function heihokon(r: Rng): QuestionBody {
  const a = r.int(2, 12);
  const b = r.int(1, 6);
  const t = sq(a * b);
  return {
    prompt: `一直線上に、AB＝${a}、BC＝${b} となるように点 A、B、C をこの順にとる。AC を直径とする円をかき、B を通り AC に垂直な直線と円の交点の1つを D とする。BD の長さを求めなさい。`,
    answer: { kind: "num", answerKind: t.kind, answer: [t.text], equations: [`x^2=${a}*${b}`] },
    point: "直径の円周角は 90°。△ABD∽△DBC から BD²＝AB·BC",
    steps: [
      { title: "直角三角形をつくる", body: "AC は直径なので {{∠ADC＝90°}}。DB⊥AC だから、△ABD と △DBC は相似です。", back: [BACK_SAKUZU] },
      { title: "相似比から", body: `AB:BD＝BD:BC より BD²＝AB×BC＝${a}×${b}＝${a * b}。BD＝{{${t.text}}}。`, trap: "BD＝(AB＋BC)÷2 は半径。BD は半径とは別の長さです。", back: [BACK_HEIHO] },
    ],
  };
}

function keiryo(r: Rng): QuestionBody {
  const kind = r.pick(["box", "tetra", "pyr"] as const);
  if (kind === "box") {
    const a = r.int(2, 9);
    const b = r.int(2, 9);
    const c = r.int(2, 9);
    const s = a * a + b * b + c * c;
    const t = sq(s);
    return {
      prompt: `縦 ${a}、横 ${b}、高さ ${c} の直方体の対角線の長さを求めなさい。`,
      answer: { kind: "num", answerKind: t.kind, answer: [t.text], equations: [`x^2=${a}^2+${b}^2+${c}^2`] },
      point: "底面の対角線と高さで直角三角形をつくる",
      steps: [
        { title: "底面の対角線", body: `底面の対角線の長さの2乗は ${a}²＋${b}²＝${a * a + b * b}。`, back: [BACK_KEIRYO] },
        { title: "もう一度三平方", body: `対角線の2乗は ${a * a + b * b}＋${c}²＝${s}。長さは {{${t.text}}}。` },
      ],
    };
  }
  if (kind === "tetra") {
    const a = 3 * r.int(1, 5);
    const t = sq((2 * a * a) / 3);
    const g = sq((a * a) / 3);
    return {
      prompt: `1辺の長さが ${a} の正四面体の高さを求めなさい。`,
      answer: { kind: "num", answerKind: t.kind, answer: [t.text], equations: [`x^2=${a}^2-${a * a / 3}`] },
      point: "垂線の足は底面の重心。頂点までは a/√3",
      steps: [
        { title: "垂線の足", body: `頂点から底面に下ろした垂線の足は底面の正三角形の重心で、底面の頂点までの距離は ${a}÷√3＝{{${g.text}}}。`, back: [BACK_KEIRYO] },
        { title: "三平方の定理", body: `高さ²＝${a}²−(${g.text})²＝${a * a}−${(a * a) / 3}＝${(2 * a * a) / 3}。高さは {{${t.text}}}。`, trap: "底面の頂点までの距離を、中線の長さ（a√3/2）としない。重心は中線を 2:1 に分けます。" },
      ],
    };
  }
  const a = 2 * r.int(1, 5);
  const l = r.int(a, a + 6);
  const h2 = l * l - (a * a) / 2;
  const t = sq(h2);
  return {
    prompt: `底面が1辺 ${a} の正方形で、側面の辺の長さがすべて ${l} の正四角錐がある。この正四角錐の高さを求めなさい。`,
    answer: { kind: "num", answerKind: t.kind, answer: [t.text], equations: [`x^2=${l}^2-${(a * a) / 2}`] },
    point: "頂点、底面の中心、底面の頂点で直角三角形",
    steps: [
      { title: "底面の中心まで", body: `底面の対角線は ${a}√2 なので、中心から底面の頂点までは ${a / 2 === 1 ? "" : a / 2}√2。その2乗は ${(a * a) / 2}。`, back: [BACK_KEIRYO] },
      { title: "三平方の定理", body: `高さ²＝${l}²−${(a * a) / 2}＝${h2}。高さは {{${t.text}}}。`, trap: "底面の1辺の半分（中心から辺までの距離）を使うのは、側面の三角形の高さを求めるとき。" },
    ],
  };
}

function kyori(r: Rng): QuestionBody {
  const a = r.int(2, 12);
  // 頂点 A から平面 BDE までの距離＝a/√3＝a√3/3
  const ans = a % 3 === 0 ? (a / 3 === 1 ? "√3" : `${a / 3}√3`) : `${a}√3/3`;
  const vol = (a * a * a) / 6;
  const g6 = a % 3 === 0 ? (a % 2 === 0 ? 6 : 3) : a % 2 === 0 ? 2 : 1; // a³/6 を約分する
  const volText = Number.isInteger(vol) ? String(vol) : `${(a * a * a) / g6}/${6 / g6}`;
  return {
    prompt: `1辺の長さが ${a} の立方体 ABCD-EFGH（四角形 ABCD が底面で、AE、BF、CG、DH が側面の辺）がある。頂点 A から、3点 B、D、E を通る平面に下ろした垂線の長さを求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [ans], equations: [`x^2=${a}^2/3`] },
    point: "三角錐 A-BDE の体積を2通りに表す",
    steps: [
      { title: "体積を1通り目で", body: `三角錐 A-BDE は、底面を △ABD（直角二等辺三角形）、高さを AE とみると、体積は ${a}×${a}÷2×${a}÷3＝{{${volText}}}。`, back: [BACK_KEIRYO] },
      { title: "△BDE の面積", body: `BD＝DE＝EB＝${a}√2 の正三角形なので、面積は (√3/4)×(${a}√2)²＝${a * a / 2 === Math.floor(a * a / 2) ? `${(a * a) / 2}√3` : `${a * a}√3/2`}。` },
      { title: "体積を2通り目で", body: `垂線の長さを h とすると (1/3)×△BDE×h＝${volText} より、h＝{{${ans}}}。`, trap: "AG（立方体の対角線）の長さ a√3 と混同しない。垂線は AG の 1/3 です。" },
    ],
  };
}

export const H_MATH_A_KUKAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学A",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "多面体の頂点・辺・面",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "euler", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: euler },
        { id: "seitamen", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: seitamen },
      ],
    },
    {
      title: "空間の直線・作図・立体の計量",
      lead: "次の問いに答えなさい。根号をふくむ答えは、根号の中をできるだけ小さい整数にして答えなさい。",
      style: "mix",
      questions: [
        { id: "nejire", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: nejire },
        { id: "heihokon", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: heihokon },
        { id: "keiryo", type: "A", difficulty: 2, points: 18, seconds: 150, skill: "知識・技能", generate: keiryo },
      ],
    },
    {
      title: "体積を使って距離を求める",
      lead: "次の問いに答えなさい。根号をふくむ答えは、分母を有理化して答えなさい。",
      style: "word",
      questions: [{ id: "kyori", type: "A", difficulty: 3, points: 22, seconds: 300, skill: "思考・判断・表現", generate: kyori }],
    },
  ],
};
