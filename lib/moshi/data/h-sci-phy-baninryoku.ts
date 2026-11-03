// 物理「万有引力」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: ケプラーの第3法則 T²∝a³、万有引力 F∝1/r²、第2法則 (近日点と遠日点で r₁v₁＝r₂v₂)、
//   円軌道の速さ mv²/r＝GMm/r² と地表の重力 GM＝gR² から v²＝gR を calc / equations に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。架空の惑星の値は v が割り切れる組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-baninryoku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "ケプラーの3つの法則");
const S2 = L(2, "万有引力：質量の積に比例し、距離の2乗に反比例");
const S3 = L(3, "人工衛星：万有引力が向心力になる");
const S4 = L(4, "万有引力による位置エネルギーと脱出速度");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function kyori(r: Rng): QuestionBody {
  const n = r.pick([2, 3, 4, 5]);
  const W = n * n * r.int(2, 30);
  const mode = r.pick(["height", "dist", "mass"] as const);
  if (mode === "height")
    return {
      prompt: `地表で地球から受ける万有引力の大きさが ${W} N の物体を、地表から地球の半径の ${n - 1} 倍の高さまで運んだ。そこで地球から受ける万有引力の大きさは何 N ですか。地球の自転の影響は考えない。`,
      answer: { kind: "num", answerKind: "num", answer: [f(W / (n * n))], unit: "N", calc: `${W}/(1+${n - 1})^2` },
      point: "距離は地球の中心から測る。F∝1/r²",
      steps: [
        { title: "中心からの距離", body: `高さ ${n - 1}R の所は、中心から {{${n}R}}。`, back: [S2], trap: `高さ ${n - 1}R をそのまま距離にしない。` },
        { title: "2乗に反比例", body: `距離 ${n} 倍で力は 1/${n * n} 倍。${W}÷${n * n}＝{{${W / (n * n)}}} N。` },
      ],
    };
  if (mode === "dist")
    return {
      prompt: `2つの小さな物体の間にはたらく万有引力の大きさが ${W} N だった。物体の間の距離を ${n} 倍にすると、万有引力の大きさは何 N になりますか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(W / (n * n))], unit: "N", calc: `${W}/${n}^2` },
      point: "F＝Gm₁m₂/r²",
      steps: [{ title: "2乗に反比例", body: `r が ${n} 倍で F は 1/${n}²＝1/${n * n} 倍。{{${W / (n * n)}}} N。`, back: [S2] }],
    };
  const a = r.pick([2, 3]);
  const W2 = r.int(2, 30) * n * n;
  return {
    prompt: `2つの小さな物体の間にはたらく万有引力の大きさが ${W2} N だった。一方の物体の質量を ${a} 倍にし、同時に物体の間の距離を ${n} 倍にすると、万有引力の大きさは何 N になりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [f((W2 * a) / (n * n))], unit: "N", calc: `${W2}*${a}/${n}^2` },
    point: "質量の積に比例、距離の2乗に反比例",
    steps: [{ title: "掛け合わせる", body: `質量で ×${a}、距離で ×1/${n * n}。${W2}×${a}÷${n * n}＝{{${f((W2 * a) / (n * n))}}} N。`, back: [S2] }],
  };
}

function kepler3(r: Rng): QuestionBody {
  const s = r.pick([2, 3, 4]);
  const T1 = r.pick([1, 2, 3, 5, 10]);
  const inner = r.bool();
  const planet = r.pick(["惑星 A ", "小惑星 A ", "彗星 A "]);
  if (inner) {
    const T0 = T1 * s * s * s;
    return {
      prompt: `太陽のまわりを公転する${planet}の公転周期は ${T0} 年である。楕円軌道の半長軸 (長半径) が${planet}の 1/${s * s} 倍の天体の公転周期は何年ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(T1)], unit: "年", calc: `${T0}/${s}^3` },
      point: "T²∝a³。a が 1/n² 倍なら T は 1/n³ 倍",
      steps: [{ title: "第3法則", body: `T²∝a³ より T∝a^(3/2)。a が 1/${s * s} 倍なら T は 1/${s ** 3} 倍。${T0}÷${s ** 3}＝{{${T1}}} 年。`, back: [S1] }],
    };
  }
  return {
    prompt: `太陽のまわりを公転する${planet}の公転周期は ${T1} 年である。楕円軌道の半長軸 (長半径) が${planet}の ${s * s} 倍の天体の公転周期は何年ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(T1 * s ** 3)], unit: "年", calc: `${T1}*${s}^3` },
    point: "T²∝a³。a が n² 倍なら T は n³ 倍",
    steps: [
      { title: "第3法則", body: `T² は a³ に比例。a が ${s * s} 倍なら a³ は ${s ** 6} 倍、T² も ${s ** 6} 倍。`, back: [S1] },
      { title: "T を求める", body: `T は ${s ** 3} 倍で、${T1}×${s ** 3}＝{{${T1 * s ** 3}}} 年。`, trap: "T を a に比例させない。" },
    ],
  };
}

function kepler2(r: Rng): QuestionBody {
  const r1 = r.pick([1, 2, 3, 4]);
  const k = r.pick([2, 3, 4, 5]);
  const r2 = r1 * k;
  const v2 = r.pick([5, 10, 15, 20]);
  const v1 = v2 * k;
  const askNear = r.bool();
  return {
    prompt: `ある彗星が太陽を1つの焦点とする楕円軌道を回っている。太陽にいちばん近い点 (近日点) での太陽からの距離は ${r1}×10¹¹ m、いちばん遠い点 (遠日点) での距離は ${r2}×10¹¹ m である。${askNear ? `遠日点での速さが ${v2} km/s のとき、近日点での速さ` : `近日点での速さが ${v1} km/s のとき、遠日点での速さ`}は何 km/s ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(askNear ? v1 : v2)], unit: "km/s", calc: askNear ? `${v2}*${r2}/${r1}` : `${v1}*${r1}/${r2}` },
    point: "面積速度一定：近日点・遠日点で ½rv が等しい",
    steps: [
      { title: "面積速度", body: "近日点と遠日点では速度が太陽からの線に垂直なので、面積速度は ½rv。{{r₁v₁＝r₂v₂}}。", back: [S1] },
      { title: "代入", body: askNear ? `v₁＝${v2}×${r2}÷${r1}＝{{${v1}}} km/s。` : `v₂＝${v1}×${r1}÷${r2}＝{{${v2}}} km/s。`, trap: "近い所ほど速い。逆にしない。" },
    ],
  };
}

// v²＝gR となる架空の惑星 [g (m/s²), R (×10⁶ m), v (m/s)]
const PLANET = [
  [4, 4, 4000],
  [9, 4, 6000],
  [1.6, 2.5, 2000],
  [2.5, 3.6, 3000],
  [6.4, 10, 8000],
  [10, 6.4, 8000],
  [8.1, 4.9, 6300],
  [3.6, 2.5, 3000],
] as const;

function eisei(r: Rng): QuestionBody {
  if (r.bool()) {
    const [g, R, v] = r.pick(PLANET);
    return {
      prompt: `ある惑星は、半径が ${f(R)}×10⁶ m、表面での重力加速度の大きさが ${f(g)} m/s² である。この惑星の表面すれすれを等速円運動で回る衛星の速さは何 m/s ですか。大気はなく、惑星の自転は考えない。`,
      answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: "m/s", equations: [`x^2=${g}*${R}*10^6`] },
      point: "表面すれすれ：mg が向心力 → v＝√(gR)",
      steps: [
        { title: "向心力＝重力", body: "半径 R の円運動で、万有引力 (表面では mg) が向心力。{{mv²/R＝mg}}。", back: [S3] },
        { title: "v を求める", body: `v²＝gR＝${f(g)}×${f(R)}×10⁶＝${f(g * R)}×10⁶ より v＝{{${v}}} m/s。`, trap: "R を 10⁶ 倍し忘れない。" },
      ],
    };
  }
  const n = r.pick([4, 9, 16]);
  const s = Math.sqrt(n);
  const v0 = s * r.pick([1, 1.5, 1.75]);
  return {
    prompt: `地球のまわりを半径 r の円軌道で回る人工衛星 A の速さは ${v0} km/s である。半径 ${n}r の円軌道を回る人工衛星 B の速さは何 km/s ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(v0 / s)], unit: "km/s", calc: `${v0}/${s}` },
    point: "v＝√(GM/r)。遠い軌道ほど遅い",
    steps: [
      { title: "円軌道の式", body: "mv²/r＝GMm/r² より {{v²＝GM/r}}。v は √r に反比例。", back: [S3] },
      { title: "比で求める", body: `r が ${n} 倍なら v は 1/${s} 倍。${v0}÷${s}＝{{${f(v0 / s)}}} km/s。`, trap: "遠くを回る衛星ほど速い、とはならない。" },
    ],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("kepler1", 1),
    prompt: "ケプラーの第1法則の内容として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["惑星は太陽を1つの焦点とする楕円軌道を描く", "惑星は太陽を中心とする円軌道を描く", "惑星の公転周期の2乗は半長軸の3乗に比例する", "惑星と太陽を結ぶ線分が一定時間に描く面積は一定である"],
      correct: 0,
      why: ["正しい。太陽は楕円の中心ではなく焦点にある。", "円は楕円の特別な場合で、ふつうの惑星は楕円軌道。", "これは第3法則。", "これは第2法則 (面積速度一定)。"],
    },
    point: "第1：楕円・第2：面積速度一定・第3：T²∝a³",
    steps: [{ title: "3つの法則", body: "{{第1法則＝楕円軌道}}（太陽は焦点）、第2法則＝面積速度一定、第3法則＝T²∝a³。", back: [S1] }],
  },
  {
    ...base("mujuryoku", 1, "思考・判断・表現"),
    prompt: "地球のまわりを回る宇宙ステーションの中で、物が浮いて見える理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["ステーションも中の物も、万有引力だけを受けて同じように落ち続けているから", "地球から遠く、万有引力がはたらいていないから", "宇宙には空気がなく、重力が打ち消されているから", "遠心力が万有引力より大きいから"],
      correct: 0,
      why: ["正しい。いっしょに自由落下しているので、たがいに静止して見える。", "高さ数百 km では、万有引力は地表の約 9 割もある。", "空気の有無は重力と関係しない。", "遠心力が大きければ、ステーションは遠ざかっていく。"],
    },
    point: "無重量状態＝いっしょに落ち続けている",
    steps: [{ title: "落ち続ける円運動", body: "万有引力が向心力となり、ステーションも物も{{同じ加速度で地球に向かって落ち続けている}}。", back: [S3] }],
  },
  {
    ...base("kepler2-sokudo", 2, "思考・判断・表現"),
    prompt: "楕円軌道を回る惑星の速さについて、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["太陽に近いところほど速い", "太陽から遠いところほど速い", "軌道上のどこでも同じ速さ", "近日点と遠日点で同じ速さで、その間で速くなる"],
      correct: 0,
      why: ["正しい。面積速度一定なので、半径が短いと速くなる。", "逆。遠いほど遅い。", "円軌道なら一定だが、楕円ではちがう。", "近日点で最も速く、遠日点で最も遅い。"],
    },
    point: "面積速度一定 → 近いほど速い",
    steps: [{ title: "面積を同じに", body: "同じ時間に同じ面積を描くには、半径が短いほど{{弧を長く (速く)}}進む必要がある。", back: [S1] }],
  },
  {
    ...base("ichi-energy", 2),
    prompt: "質量 M の天体の中心から距離 r の点にある質量 m の物体の、万有引力による位置エネルギー U（無限遠を基準）として正しいものはどれですか。G は万有引力定数。",
    answer: {
      kind: "choice",
      options: ["U＝−GMm/r", "U＝GMm/r", "U＝−GMm/r²", "U＝mgr"],
      correct: 0,
      why: ["正しい。無限遠で 0、近づくほど低く (負に) なる。", "符号が逆。引力なので近づくとエネルギーは下がる。", "r² で割るのは力の式。", "mgh は地表付近で g が一定とみなせるときの近似。"],
    },
    point: "U＝−GMm/r (無限遠が 0)",
    steps: [{ title: "基準と符号", body: "無限遠を 0 とすると、引力に引かれて近づくほど U は下がるので {{負}}。U＝−GMm/r。", back: [S4] }],
  },
];

export const H_SCI_PHY_BANINRYOKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 14,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "万有引力と天体の運動の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kyori", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: kyori },
        { id: "kepler3", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: kepler3 },
        { id: "kepler2", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: kepler2 },
        { id: "eisei", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: eisei },
      ],
    },
    { title: "天体の運動のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
