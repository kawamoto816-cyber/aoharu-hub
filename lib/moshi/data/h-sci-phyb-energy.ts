// 物理基礎「仕事と力学的エネルギー」の単元模試 (A: 数値を入れかえる計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: W＝Fx cosθ (θ＝0°・60°)、P＝W/t、K＝½mv²、U＝½kx²、mgh＝½mv² を calc か equations (v²＝2gh) に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。高さは v＝√(2gh) が割り切れる組だけをテーブルで持つ。g＝9.8 m/s²。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phyb-energy";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "仕事＝力×移動距離");
const S2 = L(2, "仕事率");
const S3 = L(3, "運動エネルギー ½mv²");
const S4 = L(4, "位置エネルギー：重力とばね");
const S5 = L(5, "力学的エネルギー保存");
const S6 = L(6, "保存力以外の力が仕事をするとき");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function shigoto(r: Rng): QuestionBody {
  const F = r.step(10, 60, 2);
  const x = r.int(2, 10);
  const kind = r.pick(["straight", "slant", "power"] as const);
  if (kind === "straight") {
    return {
      prompt: `水平な床の上で、荷物に水平に ${F} N の力を加え続けて、力の向きに ${x} m 動かした。この力がした仕事は何 J ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(F * x)], unit: "J", calc: `${F}*${x}` },
      point: "W＝Fx（力の向きに動いた距離）",
      steps: [{ title: "W＝Fx", body: `W＝${F}×${x}＝{{${F * x}}} J。F–x グラフの長方形の面積。`, back: [S1] }],
    };
  }
  if (kind === "slant") {
    return {
      prompt: `水平な床の上で、そりのひもを水平から 60° 上向きに ${F} N の力で引き、そりを水平に ${x} m 動かした。ひもを引く力がした仕事は何 J ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String((F * x) / 2)], unit: "J", calc: `${F}*${x}*(1/2)` },
      point: "斜めの力は移動の向きの成分 F cosθ だけが仕事をする",
      steps: [
        { title: "移動の向きの成分", body: `cos 60°＝1/2 なので、移動の向きの成分は ${F}×1/2＝${F / 2} N。`, back: [S1] },
        { title: "W＝Fx cosθ", body: `W＝${F / 2}×${x}＝{{${(F * x) / 2}}} J。`, trap: "F×x のままにすると、上向きの成分まで仕事に数えてしまう。" },
      ],
    };
  }
  const t = r.pick([2, 4, 5, 8, 10]);
  const W = F * x;
  return {
    prompt: `${F} N の力で物体を力の向きに ${x} m 動かすのに ${t} s かかった。このときの仕事率は何 W ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(W / t)], unit: "W", calc: `${F}*${x}/${t}` },
    point: "仕事率 P＝W/t（1秒あたりの仕事）",
    steps: [
      { title: "仕事", body: `W＝${F}×${x}＝${W} J。`, back: [S1] },
      { title: "1秒あたり", body: `P＝${W}÷${t}＝{{${f(W / t)}}} W。`, back: [S2] },
    ],
  };
}

function energy(r: Rng): QuestionBody {
  if (r.bool()) {
    const m = r.pick([0.2, 0.5, 1, 2, 4, 5]);
    const v = r.int(2, 12);
    const K = (m * v * v) / 2;
    return {
      prompt: `質量 ${f(m)} kg の物体が速さ ${v} m/s で動いている。この物体の運動エネルギーは何 J ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(K)], unit: "J", calc: `(1/2)*${m}*${v}^2` },
      point: "K＝½mv²。速さは2乗で効く",
      steps: [{ title: "K＝½mv²", body: `K＝½×${f(m)}×${v}²＝{{${f(K)}}} J。速さが2倍なら K は4倍。`, back: [S3], trap: "½mv のように2乗を忘れない。" }],
    };
  }
  const k = r.pick([20, 40, 50, 80, 100, 200]);
  const x = r.pick([0.1, 0.2, 0.3, 0.4, 0.5]);
  const Uk = (k * x * x) / 2;
  return {
    prompt: `ばね定数 ${k} N/m のばねを、自然の長さから ${f(x)} m のばした。ばねにたくわえられた弾性力による位置エネルギーは何 J ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(Uk)], unit: "J", calc: `(1/2)*${k}*${x}^2` },
    point: "弾性力の位置エネルギー U＝½kx²",
    steps: [{ title: "F–x グラフの三角形", body: `弾性力は 0 から kx までふえるので面積は ½kx²。U＝½×${k}×${f(x)}²＝{{${f(Uk)}}} J。`, back: [S4], trap: "kx² とすると三角形ではなく長方形の面積になる。" }],
  };
}

/** [高さ h (m), 速さ v (m/s)]。v²＝2×9.8×h */
const HV: [number, number][] = [
  [0.4, 2.8],
  [0.9, 4.2],
  [1.6, 5.6],
  [2.5, 7],
  [3.6, 8.4],
  [4.9, 9.8],
  [10, 14],
  [22.5, 21],
  [40, 28],
];

function hozon(r: Rng): QuestionBody {
  const [h, v] = r.pick(HV);
  const what = r.pick(["小球", "台車", "そり"]);
  if (r.bool()) {
    return {
      prompt: `なめらかな斜面の上の、床から高さ ${f(h)} m の点で${what}を静かに放した。${what}が床の高さまですべり下りたときの速さは何 m/s ですか。摩擦と空気の抵抗は考えず、重力加速度の大きさは 9.8 m/s² とする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(v)], unit: "m/s", equations: [`x^2=2*9.8*${h}`] },
      point: "mgh＝½mv²。質量は消える",
      steps: [
        { title: "力学的エネルギー保存", body: `はじめは U＝mgh だけ、床では K＝½mv² だけ。{{mgh＝½mv²}} より v²＝2gh。`, back: [S5] },
        { title: "計算", body: `v²＝2×9.8×${f(h)}＝${f(2 * 9.8 * h)}、v＝{{${f(v)}}} m/s。`, trap: "斜面の形や角度によらない。高さの差だけで決まる。" },
      ],
    };
  }
  return {
    prompt: `なめらかな床の上を速さ ${f(v)} m/s で進んできた${what}が、そのままなめらかな斜面をのぼった。${what}は床から何 m の高さまでのぼりますか。摩擦と空気の抵抗は考えず、重力加速度の大きさは 9.8 m/s² とする。`,
    answer: { kind: "num", answerKind: "num", answer: [f(h)], unit: "m", calc: `${v}^2/(2*9.8)` },
    point: "½mv²＝mgh で、運動エネルギーが高さに変わる",
    steps: [
      { title: "力学的エネルギー保存", body: `床では K＝½mv²、最高点では速さ 0 で U＝mgh。{{½mv²＝mgh}}。`, back: [S5] },
      { title: "計算", body: `h＝v²÷(2g)＝${f(v * v)}÷19.6＝{{${f(h)}}} m。` },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("suihei-aruku", 1),
    prompt: "荷物を持って、水平な床の上を一定の速さで 10 m 歩いた。このとき、荷物にはたらく重力がした仕事について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["0 J", "正の仕事", "負の仕事", "荷物の重さ×10 m"],
      correct: 0,
      why: ["正しい。重力（鉛直）と移動（水平）が垂直なので cos 90°＝0。", "重力の向きには動いていない。", "負になるのは、力と逆向きに動くとき（持ち上げるときの重力など）。", "これは力の向きに 10 m 動いたときの仕事。"],
    },
    point: "力と移動が垂直なら仕事は 0",
    steps: [{ title: "W＝Fx cosθ", body: "重力と移動の向きのなす角は 90°。{{cos 90°＝0}} なので重力の仕事は 0。", back: [S1] }],
  },
  {
    ...base("ke-bai", 1),
    prompt: "同じ物体の速さを 3 倍にすると、運動エネルギーは何倍になりますか。",
    answer: { kind: "num", answerKind: "num", answer: ["9"], unit: "倍", calc: "3^2" },
    point: "K＝½mv² は速さの2乗に比例",
    steps: [{ title: "2乗に比例", body: "K は v² に比例するので、3² ＝{{9}} 倍。", back: [S3], trap: "速さに比例すると考えて 3 倍としない。" }],
  },
  {
    ...base("shigoto-ke", 2),
    prompt: "なめらかな水平面上で、静止していた質量 2.0 kg の物体に水平に 4.0 N の力を加えて、力の向きに 2.5 m 動かした。動かしたあとの物体の運動エネルギーは何 J ですか。",
    answer: { kind: "num", answerKind: "num", answer: ["10"], unit: "J", calc: "4*2.5" },
    point: "された仕事の分だけ運動エネルギーがふえる",
    steps: [{ title: "仕事と運動エネルギー", body: "力がした仕事 W＝4.0×2.5＝10 J。はじめの K は 0 なので、あとの {{K＝10 J}}。", back: [S3] }],
  },
  {
    ...base("hozon-joken", 2),
    prompt: "力学的エネルギーが保存されない運動はどれですか。",
    answer: {
      kind: "choice",
      options: ["あらい水平面の上をすべって、しだいに止まる物体の運動", "空気の抵抗を無視できる、投げ上げた小球の運動", "なめらかな面の上で、ばねにつながれて往復する物体の運動", "空気の抵抗を無視できる、ふりこのおもりの運動"],
      correct: 0,
      why: ["正しい。動摩擦力が負の仕事をして、力学的エネルギーが熱に変わる。", "重力だけが仕事をするので保存される。", "弾性力だけが仕事をするので保存される。", "糸の張力は運動の向きと垂直で仕事をせず、重力だけが仕事をする。"],
    },
    point: "保存力だけが仕事をするとき、力学的エネルギーは一定",
    steps: [{ title: "保存力か", body: "重力・弾性力は{{保存力}}。動摩擦力は保存力ではなく、した仕事の分だけ力学的エネルギーが{{熱}}に変わる。", back: [S5, S6] }],
  },
  {
    ...base("masatsu-netsu", 3, "思考・判断・表現"),
    prompt: "質量 1.0 kg の物体が、あらい水平面の上を速さ 6.0 m/s ですべり始め、やがて止まった。この間に動摩擦力がした仕事は何 J ですか。",
    answer: { kind: "num", answerKind: "num", answer: ["-18"], unit: "J", calc: "0-(1/2)*1*6^2" },
    point: "E後−E前＝保存力以外の力がした仕事",
    steps: [
      { title: "エネルギーの変化", body: "はじめの K＝½×1.0×6.0²＝18 J、止まると 0。高さは変わらない。", back: [S3] },
      { title: "仕事＝変化", body: "W＝0−18＝{{−18 J}}。動摩擦力は運動と逆向きなので負の仕事。減った 18 J は熱になる。", back: [S6], trap: "符号を落として 18 J としない。" },
    ],
  },
  {
    ...base("pfv", 3, "思考・判断・表現"),
    prompt: "モーターで、荷物を一定の速さ 0.50 m/s で真上に引き上げている。ロープが荷物を引く力が 400 N のとき、モーターの仕事率は何 W ですか。",
    answer: { kind: "num", answerKind: "num", answer: ["200"], unit: "W", calc: "400*0.5" },
    point: "一定の速さで動かすとき P＝Fv",
    steps: [{ title: "P＝Fv", body: "1秒間に 0.50 m 動くので、1秒あたりの仕事は 400×0.50＝{{200}} W。", back: [S2] }],
  },
];

export const H_SCI_PHYB_ENERGY_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理基礎",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "仕事とエネルギーの計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "shigoto", type: "A", difficulty: 1, points: 16, seconds: 75, skill: "知識・技能", generate: shigoto },
        { id: "energy", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: energy },
        { id: "hozon", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: hozon },
      ],
    },
    { title: "エネルギーの考え方", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
