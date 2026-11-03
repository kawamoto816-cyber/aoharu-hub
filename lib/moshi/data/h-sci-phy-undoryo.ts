// 物理「運動量と力積」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: 力積＝運動量の変化 FΔt＝mv'−mv、運動量保存 m₁v₁＋m₂v₂＝m₁v₁'＋m₂v₂'、
//   反発係数 e＝−(v₁'−v₂')/(v₁−v₂)・床ではね上がる高さ e²h を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。答えが小数第3位までで割り切れる組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-undoryo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "運動方程式から「力積＝運動量の変化」へ");
const S2 = L(2, "同じ力積なら、時間が長いほど力は小さい");
const S3 = L(3, "運動量保存の法則");
const S4 = L(4, "分裂と、平面内の運動量保存");
const S5 = L(5, "反発係数：はね返りの度合い");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function rikiseki(r: Rng): QuestionBody {
  const m = r.pick([0.1, 0.15, 0.2, 0.4, 0.5]);
  const v1 = r.int(5, 30);
  const ball = r.pick(["ボール", "小球", "ゴムまり"]);
  if (r.bool()) {
    const I = m * v1;
    return {
      prompt: `質量 ${f(m)} kg の${ball}が速さ ${v1} m/s で飛んできて、手で受け止めると静止した。手が${ball}に与えた力積の大きさは何 N·s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(I)], unit: "N·s", calc: `${m}*${v1}` },
      point: "力積＝運動量の変化 mv'−mv",
      steps: [{ title: "運動量の変化", body: `${f(m)}×0−${f(m)}×${v1}＝−${f(I)}。大きさは {{${f(I)}}} N·s。`, back: [S1] }],
    };
  }
  const v2 = r.int(5, 25);
  const I = m * (v1 + v2);
  return {
    prompt: `質量 ${f(m)} kg の${ball}が速さ ${v1} m/s で壁に垂直に当たり、逆向きに ${v2} m/s ではね返った。壁が${ball}に与えた力積の大きさは何 N·s ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(I)], unit: "N·s", calc: `${m}*(${v2}-(-${v1}))` },
    point: "向きを符号で表して mv'−mv",
    steps: [
      { title: "向きを決める", body: `はね返る向きを正とすると、当たる前は −${v1}、後は ＋${v2} m/s。`, back: [S1] },
      { title: "変化を計算", body: `${f(m)}×${v2}−${f(m)}×(−${v1})＝{{${f(I)}}} N·s。`, trap: `速さの差 (${v2}−${v1}) にすると、はね返りの向きを無視したことになる。` },
    ],
  };
}

function heikin(r: Rng): QuestionBody {
  const m = r.pick([0.05, 0.1, 0.15, 0.2, 0.5]);
  const v = r.pick([10, 20, 30, 40]);
  const dt = r.pick([0.01, 0.02, 0.04, 0.05, 0.1]);
  const F = (m * v) / dt;
  const what = r.pick(["ボール", "小球", "物体"]);
  return {
    prompt: `静止していた質量 ${f(m)} kg の${what}を打ったところ、${f(dt)} s の接触で速さ ${v} m/s になった。打ったときにはたらいた平均の力の大きさは何 N ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(F)], unit: "N", calc: `${m}*${v}/${dt}` },
    point: "F̄＝(運動量の変化)÷(時間)",
    steps: [
      { title: "力積", body: `運動量の変化は ${f(m)}×${v}＝{{${f(m * v)} N·s}}。`, back: [S1] },
      { title: "時間で割る", body: `F̄＝${f(m * v)}÷${f(dt)}＝{{${f(F)}}} N。時間が短いほど力は大きい。`, back: [S2] },
    ],
  };
}

function hozon(r: Rng): QuestionBody {
  const kind = r.pick(["gattai", "bunretsu", "gattai2"] as const);
  if (kind === "bunretsu") {
    const [m1, m2] = r.pick([
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [2, 5],
      [3, 5],
    ] as const);
    const v1 = m2 * r.int(1, 4);
    const v2 = (m1 * v1) / m2;
    return {
      prompt: `なめらかな水平面上に静止していた質量 ${m1 + m2} kg の物体が、内部の力で質量 ${m1} kg と ${m2} kg の2つに分裂し、${m1} kg の部分は東向きに ${v1} m/s で動き出した。${m2} kg の部分の速さは何 m/s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(v2)], unit: "m/s", calc: `${m1}*${v1}/${m2}` },
      point: "分裂前の運動量 0 は、分裂後も 0",
      steps: [
        { title: "運動量保存", body: `東向きを正とすると、{{0＝${m1}×${v1}＋${m2}×v}}。`, back: [S3, S4] },
        { title: "v を求める", body: `v＝−${f(v2)}。西向きに {{${f(v2)}}} m/s。`, trap: "質量の比のまま速さにしない。速さは質量に反比例する。" },
      ],
    };
  }
  const [m1, m2] = r.pick([
    [1, 1],
    [1, 3],
    [2, 2],
    [3, 2],
    [2, 3],
    [4, 1],
    [3, 7],
  ] as const);
  const v1 = r.int(2, 8);
  if (kind === "gattai") {
    const V = (m1 * v1) / (m1 + m2);
    return {
      prompt: `なめらかな水平面上で、速さ ${v1} m/s で進む質量 ${m1} kg の台車が、静止している質量 ${m2} kg の台車に衝突し、一体となって進んだ。衝突後の速さは何 m/s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(V)], unit: "m/s", calc: `${m1}*${v1}/(${m1}+${m2})` },
      point: "一体になる衝突でも運動量の和は保存",
      steps: [{ title: "運動量保存", body: `${m1}×${v1}＋${m2}×0＝(${m1}＋${m2})V より V＝{{${f(V)}}} m/s。`, back: [S3] }],
    };
  }
  const v2 = r.int(1, v1 - 1);
  const V = (m1 * v1 - m2 * v2) / (m1 + m2);
  return {
    prompt: `なめらかな一直線上で、東向きに ${v1} m/s で進む質量 ${m1} kg の物体 A と、西向きに ${v2} m/s で進む質量 ${m2} kg の物体 B が正面衝突し、一体となった。衝突後の速度は、東向きを正として何 m/s ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(V)], unit: "m/s", calc: `(${m1}*${v1}-${m2}*${v2})/(${m1}+${m2})` },
    point: "逆向きの運動量は負として足す",
    steps: [
      { title: "符号つきで足す", body: `運動量の和は ${m1}×${v1}＋${m2}×(−${v2})＝{{${m1 * v1 - m2 * v2} kg·m/s}}。`, back: [S3] },
      { title: "質量の和で割る", body: `V＝${m1 * v1 - m2 * v2}÷${m1 + m2}＝{{${f(V)}}} m/s${V < 0 ? "（負なので西向き）" : V === 0 ? "（静止する）" : ""}。`, trap: "B の運動量を正のまま足さない。" },
    ],
  };
}

function hanpatsu(r: Rng): QuestionBody {
  if (r.bool()) {
    const h = r.pick([1, 1.5, 2, 2.5, 3, 4, 5]);
    const e = r.pick([0.4, 0.5, 0.6, 0.8, 0.9]);
    const h2 = e * e * h;
    return {
      prompt: `床から高さ ${f(h)} m の所で小球を静かに放した。床と小球の間の反発係数が ${f(e)} のとき、1回目にはね上がる高さは何 m ですか。空気の抵抗は考えない。`,
      answer: { kind: "num", answerKind: "num", answer: [f(h2)], unit: "m", calc: `${e}^2*${h}` },
      point: "速さが e 倍 → 高さは e² 倍",
      steps: [
        { title: "速さの変化", body: `当たる直前の速さを v とすると、はね返った直後は {{${f(e)}v}}。`, back: [S5] },
        { title: "高さは速さの2乗", body: `h＝v²/(2g) なので高さは ${f(e)}²＝${f(e * e)} 倍。${f(h)}×${f(e * e)}＝{{${f(h2)}}} m。`, trap: "高さを e 倍にしない。" },
      ],
    };
  }
  const [m1, m2] = r.pick([
    [1, 1],
    [1, 3],
    [3, 1],
    [2, 3],
    [1, 4],
    [3, 2],
  ] as const);
  const e = r.pick([0, 0.5, 1]);
  const v = r.pick([4, 5, 6, 8, 10]);
  const askA = r.bool();
  const vA = ((m1 - e * m2) * v) / (m1 + m2);
  const vB = (m1 * (1 + e) * v) / (m1 + m2);
  const ans = askA ? vA : vB;
  return {
    prompt: `なめらかな一直線上で、質量 ${m1} kg の小球 A が右向きに ${v} m/s で進み、静止している質量 ${m2} kg の小球 B に正面衝突した。反発係数が ${f(e)} のとき、衝突直後の${askA ? " A" : " B"} の速度は、右向きを正として何 m/s ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(ans)], unit: "m/s", calc: askA ? `(${m1}-${e}*${m2})*${v}/(${m1}+${m2})` : `${m1}*(1+${e})*${v}/(${m1}+${m2})` },
    point: "運動量保存と反発係数の2式を連立",
    steps: [
      { title: "運動量保存", body: `{{${m1}×${v}＝${m1}v_A＋${m2}v_B}}`, back: [S3] },
      { title: "反発係数", body: `{{v_B−v_A＝${f(e)}×${v}}}（離れる速さ＝e×近づく速さ）`, back: [S5] },
      { title: "連立する", body: `v_A＝${f(vA)}、v_B＝${f(vB)}。答えは {{${f(ans)}}} m/s。`, trap: "反発係数の式で、近づく前と離れた後の向きを取りちがえない。" },
    ],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("ft-menseki", 1),
    prompt: "物体にはたらく力 F と時間 t のグラフ（F–t グラフ）で、グラフと t 軸で囲まれた面積が表すものはどれですか。",
    answer: {
      kind: "choice",
      options: ["力積（運動量の変化）", "仕事", "運動エネルギー", "加速度"],
      correct: 0,
      why: ["正しい。力×時間の和が力積。", "仕事は力×移動距離で、F–x グラフの面積。", "運動エネルギーの変化は仕事に等しく、F–t の面積ではない。", "加速度は力を質量で割ったもの。"],
    },
    point: "F–t グラフの面積＝力積",
    steps: [{ title: "単位で確かめる", body: "面積の単位は N×s＝{{N·s}}。これは kg·m/s と同じで、運動量の単位。", back: [S1] }],
  },
  {
    ...base("airbag", 1, "思考・判断・表現"),
    prompt: "エアバッグやクッションが、ぶつかったときの衝撃をやわらげる理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["止まるまでの時間を長くして、同じ力積を小さい力で与えるから", "運動量の変化を小さくするから", "力積を 0 にするから", "物体の質量を小さくするから"],
      correct: 0,
      why: ["正しい。FΔt が同じなら、Δt が長いほど F は小さい。", "止まるまでの運動量の変化は、エアバッグがあっても同じ。", "止まる以上、力積は必ず必要。", "質量は変わらない。"],
    },
    point: "同じ力積なら、時間を長く → 力は小さく",
    steps: [{ title: "FΔt は同じ", body: "止まるまでの運動量の変化は決まっている。{{時間 Δt をのばす}}と、平均の力 F は小さくなる。", back: [S2] }],
  },
  {
    ...base("hozon-riyu", 2, "思考・判断・表現"),
    prompt: "2つの物体が衝突するとき、外力がなければ運動量の和が保存される理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["たがいにおよぼし合う力は作用・反作用で、同じ時間はたらくので力積が打ち消し合うから", "衝突の前後で運動エネルギーが保存されるから", "衝突では力がはたらかないから", "2つの物体の質量が等しいから"],
      correct: 0,
      why: ["正しい。大きさが同じで逆向きの力積が2つの物体に加わる。", "運動エネルギーは、弾性衝突でない限り保存されない。", "衝突中は大きな力がはたらいている。", "質量が異なっても運動量は保存される。"],
    },
    point: "作用・反作用の力積が打ち消し合う",
    steps: [{ title: "力積で考える", body: "A が B から受ける力積と、B が A から受ける力積は{{大きさが同じで逆向き}}。和の変化は 0 になる。", back: [S3] }],
  },
  {
    ...base("bunrui", 2),
    prompt: "反発係数 e と衝突のようすについて、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["e＝1 のとき運動エネルギーは保存され、e＝0 のとき2物体は一体となる", "e＝0 のとき運動エネルギーは保存される", "e は 1 より大きくなることがふつうである", "e＝1 のとき2物体は一体となる"],
      correct: 0,
      why: ["正しい。e＝1 は弾性衝突、e＝0 は完全非弾性衝突。", "e＝0 は運動エネルギーがいちばん多く失われる衝突。", "ふつうの衝突では 0≦e≦1。", "一体となるのは e＝0 のとき。"],
    },
    point: "e＝1 弾性衝突、0<e<1 非弾性、e＝0 完全非弾性",
    steps: [{ title: "3つに分ける", body: "{{e＝1}}：弾性衝突、0<e<1：非弾性衝突、{{e＝0}}：完全非弾性衝突 (一体になる)。", back: [S5] }],
  },
];

export const H_SCI_PHY_UNDORYO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 15,
  review: { status: "draft" },
  sections: [
    {
      title: "運動量と力積の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "rikiseki", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: rikiseki },
        { id: "heikin", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: heikin },
        { id: "hozon", type: "A", difficulty: 2, points: 17, seconds: 100, skill: "思考・判断・表現", generate: hozon },
        { id: "hanpatsu", type: "A", difficulty: 3, points: 18, seconds: 160, skill: "思考・判断・表現", generate: hanpatsu },
      ],
    },
    { title: "運動量のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
