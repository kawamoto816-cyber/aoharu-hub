// 物理「平面内の運動と放物運動」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: 水平投射 y＝½gt²・x＝v₀t、斜方投射 v₀y＝v₀sin30°、最高点 vy＝0、速度の合成 v²＝vx²＋vy² を calc / equations に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。g＝9.8 m/s²。答えが小数第3位までで割り切れる組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-hoshabutsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "速度は分解・合成できる");
const S2 = L(2, "なぜ分けて考えてよいのか");
const S3 = L(3, "水平投射：0.50秒ごとに見る");
const S4 = L(4, "斜方投射：最高点では vy＝0");
const S5 = L(5, "到達距離は45°で最大");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function suihei(r: Rng): QuestionBody {
  const t = r.pick([0.5, 1, 1.5, 2, 2.5, 3]);
  const h = 4.9 * t * t;
  const v0 = r.int(2, 9);
  const where = r.pick(["がけの上", "ビルの屋上", "橋の上", "高い台の上"]);
  if (r.bool()) {
    return {
      prompt: `高さ ${f(h)} m の${where}から、小球を水平に ${v0} m/s で投げ出した。小球が地面に落ちるまでの時間は何 s ですか。重力加速度の大きさを 9.8 m/s² とし、空気の抵抗は考えない。`,
      answer: { kind: "num", answerKind: "num", answer: [f(t)], unit: "s", equations: [`(1/2)*9.8*x^2=${f(h)}`] },
      point: "落ちる時間はたての自由落下だけで決まる",
      steps: [
        { title: "たてだけを見る", body: `水平に投げても、たての運動は自由落下。{{${f(h)}＝½×9.8×t²}}。`, back: [S2, S3] },
        { title: "t を求める", body: `t²＝${f(h)}÷4.9＝${f(t * t)} より t＝{{${f(t)}}} s。初速度 ${v0} m/s は時間に関係しない。`, trap: "水平の初速度を使って時間を出そうとしない。" },
      ],
    };
  }
  const x = v0 * t;
  return {
    prompt: `高さ ${f(h)} m の${where}から、小球を水平に ${v0} m/s で投げ出した。投げた点の真下から、小球が地面に落ちた点までの水平距離は何 m ですか。重力加速度の大きさを 9.8 m/s² とし、空気の抵抗は考えない。`,
    answer: { kind: "num", answerKind: "num", answer: [f(x)], unit: "m", calc: `${v0}*${t}` },
    point: "時間はたてで決め、水平は等速で x＝v₀t",
    steps: [
      { title: "落ちる時間", body: `${f(h)}＝½×9.8×t² より {{t＝${f(t)} s}}。`, back: [S3] },
      { title: "水平は等速", body: `x＝${v0}×${f(t)}＝{{${f(x)}}} m。`, back: [S2] },
    ],
  };
}

function shaho(r: Rng): QuestionBody {
  const vy = r.pick([4.9, 9.8, 14.7, 19.6, 24.5]);
  const v0 = vy * 2;
  const t = vy / 9.8;
  const kind = r.pick(["top", "height", "land"] as const);
  const head = `水平な地面から、小球を水平と 30° の向きに初速度 ${f(v0)} m/s で投げ上げた。`;
  const tail = "重力加速度の大きさを 9.8 m/s² とし、空気の抵抗は考えない。";
  const s1 = { title: "初速度を分ける", body: `たての成分は ${f(v0)}×sin30°＝{{${f(vy)} m/s}}。`, back: [S1, S4] };
  if (kind === "top")
    return {
      prompt: `${head}投げてから最高点に達するまでの時間は何 s ですか。${tail}`,
      answer: { kind: "num", answerKind: "num", answer: [f(t)], unit: "s", calc: `${v0}*(1/2)/9.8` },
      point: "最高点ではたての速度 vy＝0",
      steps: [s1, { title: "vy＝0 になるとき", body: `0＝${f(vy)}−9.8t より t＝{{${f(t)}}} s。`, back: [S4] }],
    };
  if (kind === "height") {
    const H = (vy * vy) / 19.6;
    return {
      prompt: `${head}最高点の地面からの高さは何 m ですか。${tail}`,
      answer: { kind: "num", answerKind: "num", answer: [f(H)], unit: "m", calc: `(${v0}/2)^2/(2*9.8)` },
      point: "たての成分だけで v²−v₀²＝2ay",
      steps: [s1, { title: "時間を使わない式", body: `0²−${f(vy)}²＝2×(−9.8)×H より H＝{{${f(H)}}} m。`, back: [S4], trap: `初速度 ${f(v0)} をそのまま使うと、真上に投げたときの高さになる。` }],
    };
  }
  return {
    prompt: `${head}投げてから地面に落ちるまでの時間は何 s ですか。${tail}`,
    answer: { kind: "num", answerKind: "num", answer: [f(2 * t)], unit: "s", calc: `2*${v0}*(1/2)/9.8` },
    point: "上りと下りは同じ時間。最高点までの2倍",
    steps: [s1, { title: "最高点まで", body: `0＝${f(vy)}−9.8t より ${f(t)} s。`, back: [S4] }, { title: "2倍する", body: `落ちるまでは {{${f(2 * t)}}} s。`, trap: "最高点までの時間で止めない。" }],
  };
}

const TRIPLES = [
  [0.9, 1.2, 1.5],
  [1.5, 2, 2.5],
  [0.6, 0.8, 1],
  [1.2, 1.6, 2],
  [0.5, 1.2, 1.3],
  [0.8, 1.5, 1.7],
] as const;

function kawa(r: Rng): QuestionBody {
  const [vr, vb, v] = r.pick(TRIPLES);
  const d = r.pick([12, 24, 36, 48, 60, 120]);
  const ship = r.pick(["ボート", "小舟", "カヌー"]);
  const head = `川の流れの速さが ${f(vr)} m/s の、幅 ${d} m のまっすぐな川がある。${ship}が、水に対して ${f(vb)} m/s の速さで、岸に垂直な向きに船首を向けて進む。`;
  const kind = r.pick(["speed", "time", "drift"] as const);
  if (kind === "speed")
    return {
      prompt: `${head}岸から見た${ship}の速さは何 m/s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(v)], unit: "m/s", equations: [`x^2=${f(vr)}^2+${f(vb)}^2`] },
      point: "垂直な2つの速度は三平方の定理で合成する",
      steps: [{ title: "速度の合成", body: `岸から見た速度は、流れ ${f(vr)} と船 ${f(vb)} の合成。{{v²＝${f(vr)}²＋${f(vb)}²}} より v＝{{${f(v)}}} m/s。`, back: [S1], trap: `${f(vr)}＋${f(vb)} と足すのは同じ向きのときだけ。` }],
    };
  const t = d / vb;
  if (kind === "time")
    return {
      prompt: `${head}向こう岸に着くまでの時間は何 s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(t)], unit: "s", calc: `${d}/${vb}` },
      point: "岸に垂直な成分だけで渡る時間が決まる",
      steps: [{ title: "垂直方向だけ", body: `流れは岸に平行なので、渡る時間に関係しない。t＝${d}÷${f(vb)}＝{{${f(t)}}} s。`, back: [S1, S2] }],
    };
  return {
    prompt: `${head}向こう岸に着くまでに、${ship}は川下へ何 m 流されますか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(vr * t)], unit: "m", calc: `${vr}*${d}/${vb}` },
    point: "渡る時間×流れの速さ＝流される距離",
    steps: [
      { title: "渡る時間", body: `t＝${d}÷${f(vb)}＝{{${f(t)} s}}。`, back: [S1] },
      { title: "その間に流される", body: `${f(vr)}×${f(t)}＝{{${f(vr * t)}}} m。`, back: [S2] },
    ],
  };
}

// [t, vx] : vx/vy が 3/4 か 4/3 になり、速さが割り切れる組
const LAND = [
  [1, 7.35],
  [2, 14.7],
  [3, 22.05],
  [4, 29.4],
  [1.5, 19.6],
  [3, 39.2],
] as const;

function chakuchi(r: Rng): QuestionBody {
  const [t, vx] = r.pick(LAND);
  const h = 4.9 * t * t;
  const vy = 9.8 * t;
  const v = Math.sqrt(vx * vx + vy * vy);
  const where = r.pick(["がけの上", "塔の上", "高い台の上", "ビルの屋上"]);
  return {
    prompt: `高さ ${f(h)} m の${where}から、小球を水平に ${f(vx)} m/s で投げ出した。小球が地面に落ちる直前の速さは何 m/s ですか。重力加速度の大きさを 9.8 m/s² とし、空気の抵抗は考えない。`,
    answer: { kind: "num", answerKind: "num", answer: [f(v)], unit: "m/s", equations: [`x^2=${f(vx)}^2+(9.8*${t})^2`] },
    point: "落ちる直前の速度＝水平 v₀ とたて gt の合成",
    steps: [
      { title: "落ちる時間", body: `${f(h)}＝½×9.8×t² より t＝{{${f(t)} s}}。`, back: [S3] },
      { title: "たての速度", body: `vy＝9.8×${f(t)}＝{{${f(vy)} m/s}}。水平は ${f(vx)} m/s のまま。`, back: [S2] },
      { title: "合成する", body: `v²＝${f(vx)}²＋${f(vy)}² より v＝{{${f(v)}}} m/s。`, back: [S1], trap: "たての速度だけを答えにしない。" },
    ],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("suihei-seibun", 1),
    prompt: "水平に投げ出した小球（空気の抵抗なし）の運動について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["水平方向は等速直線運動、鉛直方向は自由落下", "水平方向も鉛直方向も等加速度運動", "水平方向はしだいに遅くなり、鉛直方向は等速", "水平方向は自由落下、鉛直方向は等速直線運動"],
      correct: 0,
      why: ["正しい。水平方向には力がはたらかず、鉛直方向には重力だけがはたらく。", "水平方向には力がはたらかないので、加速度は 0。", "空気の抵抗がなければ、水平の速さは変わらない。", "水平と鉛直が逆になっている。"],
    },
    point: "横は等速、たては自由落下",
    steps: [{ title: "力の向きで分ける", body: "はたらく力は鉛直下向きの重力だけ。だから{{水平は等速}}、{{鉛直は加速度 g}}。", back: [S2] }],
  },
  {
    ...base("dooji", 1, "思考・判断・表現"),
    prompt: "同じ高さから、小球 A を静かに放すと同時に、小球 B を水平に投げ出した。空気の抵抗がないとき、地面に先に着くのはどちらですか。",
    answer: {
      kind: "choice",
      options: ["同時に着く", "A が先に着く", "B が先に着く", "B の速さによって変わる"],
      correct: 0,
      why: ["正しい。どちらも鉛直方向は初速度 0 の自由落下。", "B は斜めに長い道のりを進むが、たての運動は A と同じ。", "B は水平の速さをもつが、たての速さは A と同じ。", "水平の速さは落ちる時間に関係しない。"],
    },
    point: "落ちる時間はたての運動だけで決まる",
    steps: [{ title: "たてだけ比べる", body: "A も B もたての初速度は 0、加速度は g。{{y＝½gt²}} が同じなので同時に着く。", back: [S2, S3] }],
  },
  {
    ...base("saikoten-sokudo", 2),
    prompt: "水平な地面から斜め上に投げた小球（空気の抵抗なし）が最高点にあるとき、小球の速度について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["水平の成分だけをもち、その大きさは初速度の水平成分と同じ", "速度は 0", "鉛直の成分だけをもつ", "水平の成分も、初速度の水平成分より小さくなっている"],
      correct: 0,
      why: ["正しい。最高点では vy＝0 で、水平成分は最初から変わらない。", "0 になるのはたての成分だけ。真上に投げたときとは異なる。", "最高点で 0 になるのは鉛直成分のほう。", "水平方向には力がないので、水平成分は変わらない。"],
    },
    point: "最高点：vy＝0、vx はそのまま",
    steps: [{ title: "成分ごとに", body: "最高点では{{鉛直成分が 0}}。水平成分は等速なので {{v₀cosθ}} のまま。", back: [S4] }],
  },
  {
    ...base("kakudo-pair", 2, "思考・判断・表現"),
    prompt: "水平な地面から、同じ速さで角度を変えて小球を投げる（空気の抵抗なし）。30° で投げたときと到達距離が等しくなる投げ上げの角度はどれですか。",
    answer: {
      kind: "choice",
      options: ["60°", "45°", "15°", "90°"],
      correct: 0,
      why: ["正しい。到達距離は sin2θ に比例し、sin60°＝sin120°。", "45° は到達距離が最大になる角度で、30° より遠くまで届く。", "15° では sin30° となり、30° のときより短い。", "真上に投げると到達距離は 0。"],
    },
    point: "到達距離は sin2θ に比例。θ と 90°−θ で等しい",
    steps: [{ title: "sin2θ で比べる", body: "到達距離＝v₀²sin2θ/g。30° なら sin60°、{{60°}} なら sin120° で同じ値。45° をはさんで対になる。", back: [S5] }],
  },
];

export const H_SCI_PHY_HOSHABUTSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 14,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "放物運動の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "suihei", type: "A", difficulty: 1, points: 16, seconds: 75, skill: "知識・技能", generate: suihei },
        { id: "shaho", type: "A", difficulty: 2, points: 17, seconds: 100, skill: "知識・技能", generate: shaho },
        { id: "kawa", type: "A", difficulty: 2, points: 17, seconds: 100, skill: "思考・判断・表現", generate: kawa },
        { id: "chakuchi", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: chakuchi },
      ],
    },
    { title: "放物運動のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
