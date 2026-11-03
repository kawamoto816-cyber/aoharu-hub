// 物理「単振動」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: 最大の速さ Aω・最大の加速度 Aω²、ばね振り子 ω²＝k/m、エネルギー ½kA²＝½kx²＋½mv²、
//   単振り子 ω²＝g/L・周期の比 T∝√L を calc / equations に書き、scripts/check-moshi.ts がシード1〜100で答えと照合する。
//   π が答えに入らないように、周期ではなく角振動数や比を問う。g＝9.8 m/s²。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-tanshindo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "中心で速く、端で止まる往復運動");
const S2 = L(2, "円運動の影から、速度と加速度が出る");
const S3 = L(3, "ばね振り子と単振り子");
const S4 = L(4, "単振動のエネルギー");
const S5 = L(5, "等時性が時計を変えた");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function saidai(r: Rng): QuestionBody {
  const A = r.pick([0.02, 0.05, 0.1, 0.2, 0.25, 0.4, 0.5]);
  const w = r.pick([2, 3, 4, 5, 10]);
  const askV = r.bool();
  const ans = askV ? A * w : A * w * w;
  return {
    prompt: `振幅 ${f(A)} m、角振動数 ${w} rad/s の単振動をしている物体がある。${askV ? "速さの最大値は何 m/s " : "加速度の大きさの最大値は何 m/s² "}ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(ans)], unit: askV ? "m/s" : "m/s²", calc: askV ? `${A}*${w}` : `${A}*${w}^2` },
    point: askV ? "最大の速さ Aω は振動の中心で" : "最大の加速度 Aω² は振動の端で",
    steps: [
      { title: "円運動の影", body: `半径 ${f(A)} m・角速度 ${w} rad/s の等速円運動の影と見る。速さは rω、加速度は rω²。`, back: [S2] },
      { title: "最大値", body: askV ? `中心を通るとき v＝Aω＝{{${f(ans)}}} m/s。` : `端にいるとき a＝Aω²＝{{${f(ans)}}} m/s²。`, back: [S1], trap: askV ? "端では速さ 0。最大は中心。" : "中心では加速度 0。最大は端。" },
    ],
  };
}

// k/m が平方数になる [m, k, ω]
const SPRING = [
  [0.1, 10, 10],
  [0.2, 20, 10],
  [0.5, 8, 4],
  [0.25, 25, 10],
  [0.4, 10, 5],
  [1, 9, 3],
  [2, 32, 4],
  [0.5, 18, 6],
] as const;

function bane(r: Rng): QuestionBody {
  const [m, k, w] = r.pick(SPRING);
  if (r.bool())
    return {
      prompt: `ばね定数 ${k} N/m の軽いばねに、質量 ${f(m)} kg のおもりをつけ、なめらかな水平面上で単振動させた。角振動数は何 rad/s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(w)], unit: "rad/s", equations: [`x^2=${k}/${m}`] },
      point: "ばね振り子 ω＝√(k/m)",
      steps: [{ title: "復元力 −kx", body: `ma＝−kx と a＝−ω²x をくらべて ω²＝k/m＝${f(k / m)}、ω＝{{${w}}} rad/s。`, back: [S3] }],
    };
  return {
    prompt: `質量 ${f(m)} kg のおもりを軽いばねにつけて単振動させたところ、角振動数が ${w} rad/s だった。ばね定数は何 N/m ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(k)], unit: "N/m", calc: `${m}*${w}^2` },
    point: "k＝mω²",
    steps: [{ title: "ω²＝k/m を変形", body: `k＝mω²＝${f(m)}×${w}²＝{{${f(k)}}} N/m。`, back: [S3] }],
  };
}

// 3:4:5 で √(A²−x²) が割り切れる [A, x, √(A²−x²)] (m)
const TRI = [
  [0.05, 0.03, 0.04],
  [0.05, 0.04, 0.03],
  [0.1, 0.06, 0.08],
  [0.1, 0.08, 0.06],
  [0.13, 0.05, 0.12],
] as const;

function energy(r: Rng): QuestionBody {
  if (r.bool()) {
    const k = r.pick([20, 40, 50, 80, 100, 200]);
    const A = r.pick([0.1, 0.2, 0.3]);
    const E = 0.5 * k * A * A;
    return {
      prompt: `ばね定数 ${k} N/m のばね振り子が、なめらかな水平面上で振幅 ${f(A)} m の単振動をしている。振動の中心を通るときのおもりの運動エネルギーは何 J ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(E)], unit: "J", calc: `(1/2)*${k}*${A}^2` },
      point: "中心での運動エネルギー＝端の弾性エネルギー ½kA²",
      steps: [{ title: "エネルギー保存", body: `端では速さ 0 で、エネルギーはすべて ½kA²。中心ではそれがすべて運動エネルギー。½×${k}×${f(A)}²＝{{${f(E)}}} J。`, back: [S4] }],
    };
  }
  const [A, x, s] = r.pick(TRI);
  const w = r.pick([2, 4, 5, 10]);
  const v = w * s;
  return {
    prompt: `振幅 ${f(A)} m、角振動数 ${w} rad/s の単振動をしている物体が、振動の中心から ${f(x)} m の位置を通るときの速さは何 m/s ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(v)], unit: "m/s", equations: [`x^2=${w}^2*(${A}^2-${x}^2)`] },
    point: "v＝ω√(A²−x²) (エネルギー保存から)",
    steps: [
      { title: "エネルギー保存", body: "½kA²＝½kx²＋½mv² と k＝mω² から {{v²＝ω²(A²−x²)}}。", back: [S4] },
      { title: "代入", body: `A²−x²＝${f(A * A)}−${f(x * x)}＝${f(s * s)} より √＝${f(s)}。v＝${w}×${f(s)}＝{{${f(v)}}} m/s。`, back: [S2] },
    ],
  };
}

// g/L が平方数になる [L, ω]
const PEND = [
  [2.45, 2],
  [0.2, 7],
  [0.8, 3.5],
  [5, 1.4],
  [1.25, 2.8],
] as const;

function furiko(r: Rng): QuestionBody {
  if (r.bool()) {
    const [len, w] = r.pick(PEND);
    return {
      prompt: `長さ ${f(len)} m の単振り子を小さな振れ幅で振らせた。角振動数は何 rad/s ですか。重力加速度の大きさを 9.8 m/s² とする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(w)], unit: "rad/s", equations: [`x^2=9.8/${len}`] },
      point: "単振り子 ω＝√(g/L)、おもりの質量によらない",
      steps: [
        { title: "復元力", body: "振れが小さいとき、復元力は −(mg/L)x。ばねの k に当たるのが {{mg/L}}。", back: [S3] },
        { title: "ω を求める", body: `ω²＝g/L＝9.8÷${f(len)}＝${f(w * w)} より ω＝{{${f(w)}}} rad/s。`, back: [S5] },
      ],
    };
  }
  const n = r.pick([2, 3, 4]);
  const T0 = r.pick([1.2, 2.4, 3.6]);
  const up = r.bool();
  const ans = up ? T0 * n : T0 / n;
  return {
    prompt: `周期 ${f(T0)} s の単振り子がある。糸の長さを ${up ? n * n : `1/${n * n}`} 倍にすると、周期は何 s になりますか。振れ幅は小さいものとする。`,
    answer: { kind: "num", answerKind: "num", answer: [f(ans)], unit: "s", calc: up ? `${T0}*${n}` : `${T0}/${n}` },
    point: "T＝2π√(L/g)。周期は長さの平方根に比例",
    steps: [{ title: "√L に比例", body: `長さが ${up ? n * n : `1/${n * n}`} 倍なら周期は ${up ? n : `1/${n}`} 倍。${f(T0)}${up ? "×" : "÷"}${n}＝{{${f(ans)}}} s。`, back: [S3, S5], trap: "長さに比例させると周期が大きくずれる。" }],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("hashi-chushin", 1),
    prompt: "単振動をしている物体について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["振動の中心で速さが最大、端で加速度の大きさが最大", "振動の中心で速さも加速度も最大", "端で速さが最大、中心で加速度が最大", "速さも加速度もどこでも同じ"],
      correct: 0,
      why: ["正しい。加速度は −ω²x で、変位が大きい端ほど大きい。", "中心では x＝0 なので加速度は 0。", "端では一瞬止まるので速さは 0。", "単振動は速さが変わり続ける運動。"],
    },
    point: "中心：v 最大・a＝0、端：v＝0・a 最大",
    steps: [{ title: "a＝−ω²x", body: "加速度は変位に比例し、{{中心で 0、端で最大}}。速さはその逆。", back: [S1, S2] }],
  },
  {
    ...base("shitsuryo", 1, "思考・判断・表現"),
    prompt: "単振り子のおもりを、同じ長さの糸のまま質量2倍のものに取りかえた。振れ幅は小さいものとする。周期はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["変わらない", "2倍になる", "√2 倍になる", "1/2 倍になる"],
      correct: 0,
      why: ["正しい。T＝2π√(L/g) に質量は入っていない。", "質量が2倍になると復元力も2倍になり、加速度は変わらない。", "√ がつくのは長さを変えたとき。", "質量で周期は変わらない。"],
    },
    point: "単振り子の周期は質量によらない",
    steps: [{ title: "復元力と質量", body: "復元力 (mg/L)x も質量に比例するので、加速度 {{−(g/L)x}} は質量によらない。", back: [S3] }],
  },
  {
    ...base("toujisei", 2, "思考・判断・表現"),
    prompt: "ばね振り子の振幅を2倍にした（ばねもおもりも同じ）。周期と、振動の中心での速さはそれぞれどうなりますか。",
    answer: {
      kind: "choice",
      options: ["周期は変わらず、中心での速さは2倍", "周期も中心での速さも2倍", "周期は2倍、中心での速さは変わらない", "周期は √2 倍、中心での速さは2倍"],
      correct: 0,
      why: ["正しい。周期は k と m だけで決まり (等時性)、最大の速さは Aω。", "周期は振幅によらない。", "長い距離を速く動くので、周期は同じ。", "周期は振幅によらない。"],
    },
    point: "周期は振幅によらない (等時性)",
    steps: [{ title: "ω は k/m で決まる", body: "ω＝√(k/m) なので周期は同じ。最大の速さ Aω は {{振幅に比例}}して2倍。", back: [S2, S5] }],
  },
  {
    ...base("kage", 2),
    prompt: "半径 A、角速度 ω の等速円運動を、横から平行な光で照らしてできる影の運動について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["振幅 A、角振動数 ω の単振動になる", "振幅 2A の単振動になる", "速さ Aω の等速直線運動になる", "角振動数 2ω の単振動になる"],
      correct: 0,
      why: ["正しい。影の位置は x＝A sin ωt。", "影は −A から A まで動くので、振幅は A。", "影は端で止まり、中心で速くなる。", "1周する間に影は1往復する。"],
    },
    point: "等速円運動の影＝単振動",
    steps: [{ title: "影の位置", body: "影の位置は {{x＝A sin ωt}}。速度・加速度も円運動の成分として出せる。", back: [S2] }],
  },
];

export const H_SCI_PHY_TANSHINDO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 14,
  review: { status: "draft" },
  sections: [
    {
      title: "単振動の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "saidai", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: saidai },
        { id: "bane", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: bane },
        { id: "energy", type: "A", difficulty: 2, points: 17, seconds: 110, skill: "思考・判断・表現", generate: energy },
        { id: "furiko", type: "A", difficulty: 3, points: 18, seconds: 120, skill: "思考・判断・表現", generate: furiko },
      ],
    },
    { title: "単振動のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
