// 化学基礎「酸化と還元」の単元模試 (B: プール8問から4問 ＋ A: 酸化数・酸化還元滴定の計算2問)。問題はすべてオリジナル。
// 検算: 酸化数は (化学式, H の数, O の数, 全体の電荷) の表から「H＝＋1、O＝−2、和＝全体の電荷」で calc を作る。
//   滴定は 酸化剤が受け取る e⁻ の mol ＝ 還元剤が出す e⁻ の mol (MnO₄⁻ は 5e⁻、H₂O₂ は 2e⁻。レクチャーの半反応式) から、
//   先に濃度を決め、滴下量が小数第2位までで割り切れる組だけを使う。どちらも calc を check-moshi がシード1〜100で照合する。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chemb-sanka";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "酸化・還元の3つの見方");
const S2 = L(2, "酸化数のきめ方");
const S3 = L(3, "酸化数が上がれば酸化、下がれば還元");
const S4 = L(4, "酸化剤と還元剤：自分は逆の変化をする");
const S5 = L(5, "半反応式と、酸化還元の量的関係");
const S6 = L(6, "身のまわりの酸化還元");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });
const f = (x: number) => String(Math.round(x * 1000) / 1000);
const sg = (n: number) => (n > 0 ? `＋${n}` : n < 0 ? `−${-n}` : "0");

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("denshi", 1),
    prompt: "電子のやりとりで見たとき、「酸化された」とはどういうことですか。",
    answer: {
      kind: "choice",
      options: ["電子を失った", "電子を受け取った", "酸素を失った", "水素を受け取った"],
      correct: 0,
      why: ["酸化＝電子を失うこと。", "電子を受け取るのは還元。", "酸素を失うのは還元。", "水素を受け取るのは還元。"],
    },
    point: "酸化＝電子を失う、還元＝電子を受け取る",
    steps: [{ title: "3つの見方", body: "酸化は、酸素を受け取る・水素を失う・{{電子を失う}}こと。還元はその逆です。", back: [S1] }],
  },
  {
    ...b("tantai", 1),
    prompt: "単体（たとえば O₂ や Cu）にふくまれる原子の酸化数はいくつですか。",
    answer: {
      kind: "choice",
      options: ["0", "＋1", "−2", "＋2"],
      correct: 0,
      why: ["単体の原子の酸化数は0と決める。", "＋1 は化合物中の H の値。", "−2 は化合物中の O の原則の値。単体の O₂ では 0。", "Cu²⁺ のようなイオンなら＋2 だが、単体の Cu は0。"],
    },
    point: "単体の原子は酸化数0",
    steps: [{ title: "決まりを確認", body: "{{単体の原子は0}}、化合物中の H は＋1、O は−2、化合物全体の和は0です。", back: [S2] }],
  },
  {
    ...b("seiren", 1),
    prompt: "鉄鉱石（酸化鉄）を一酸化炭素と反応させて鉄をとり出すとき、酸化鉄に起きている変化はどれですか。",
    answer: {
      kind: "choice",
      options: ["還元された", "酸化された", "中和された", "電離した"],
      correct: 0,
      why: ["酸化鉄は酸素を失って鉄になる。酸素を失う＝還元。", "酸化されたのは酸素を受け取った一酸化炭素。", "酸と塩基の反応ではない。", "電離はイオンに分かれること。この反応ではない。"],
    },
    point: "製錬は酸化物の還元",
    steps: [{ title: "酸素の移動を見る", body: "酸化鉄は酸素を失って鉄に＝{{還元された}}。CO は酸素を受け取って CO₂ に＝酸化されました。", back: [S6] }],
  },
  // ---- 標準 ----
  {
    ...b("sankazai", 2),
    prompt: "酸化剤について正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["相手を酸化し、自分は還元される", "相手を酸化し、自分も酸化される", "相手を還元し、自分は酸化される", "反応で自分の酸化数が上がる"],
      correct: 0,
      why: ["酸化剤は相手から電子を受け取るので、相手を酸化し、自分は還元される。", "自分は電子を受け取るので還元される。", "これは還元剤の説明。", "電子を受け取るので、自分の酸化数は下がる。"],
    },
    point: "「〜剤」は相手にはたらく名前",
    steps: [{ title: "電子の向き", body: "酸化剤は相手の電子を{{受け取る}}ので、相手は酸化され、{{自分は還元}}されます。", back: [S4] }],
  },
  {
    ...b("h2s-so2", 2, "思考・判断・表現"),
    prompt: "2H₂S ＋ SO₂ → 3S ＋ 2H₂O の反応で、還元剤としてはたらいている物質はどれですか。",
    answer: {
      kind: "choice",
      options: ["H₂S", "SO₂", "S", "H₂O"],
      correct: 0,
      why: ["H₂S の S は −2 → 0 と酸化数が上がり、自分は酸化された＝還元剤。", "SO₂ の S は ＋4 → 0 と下がり、還元された＝酸化剤。", "S は生成物。", "H₂O は生成物で、H と O の酸化数は変わっていない。"],
    },
    point: "自分が酸化された物質＝還元剤",
    steps: [
      { title: "酸化数を追う", body: "H₂S の S：−2→0（上がる）、SO₂ の S：＋4→0（下がる）。", back: [S3] },
      { title: "剤を決める", body: "酸化数が上がった（酸化された）{{H₂S が還元剤}}、SO₂ が酸化剤です。", back: [S4] },
    ],
  },
  {
    ...b("h2o2-o", 2),
    prompt: "過酸化水素 H₂O₂ の O の酸化数はいくつですか。",
    answer: {
      kind: "choice",
      options: ["−1", "−2", "0", "＋1"],
      correct: 0,
      why: ["H は＋1 が2個で＋2。和を0にするには O 2個で−2、1個あたり−1。", "O を−2 とするのは原則で、過酸化物は例外。", "0 は単体の O₂ のとき。", "＋1 は H の酸化数。"],
    },
    point: "過酸化物の O は −1",
    steps: [{ title: "和から求める", body: "(＋1)×2 ＋ 2x ＝ 0 より {{x＝−1}}。O がいつも−2 とは限りません。", back: [S2] }],
  },
  // ---- 発展 ----
  {
    ...b("aite", 3, "思考・判断・表現"),
    prompt: "過酸化水素 H₂O₂ のはたらきについて、正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["ふつうは酸化剤だが、KMnO₄ が相手のときは還元剤としてはたらく", "いつも酸化剤としてはたらく", "いつも還元剤としてはたらく", "酸化剤にも還元剤にもならない"],
      correct: 0,
      why: [
        "より強い酸化剤の KMnO₄ が相手だと、H₂O₂ は電子を出して O₂ になる（還元剤）。",
        "KMnO₄ が相手だと還元剤になる。",
        "ふつうは酸化剤としてはたらく。",
        "酸化剤としてはたらくことが多い物質。",
      ],
    },
    point: "酸化剤か還元剤かは相手で変わることがある",
    steps: [{ title: "相手で決まる", body: "H₂O₂ はふつう酸化剤ですが、{{KMnO₄ が相手}}だと H₂O₂ → O₂ ＋ 2H⁺ ＋ 2e⁻ と電子を出す{{還元剤}}になります。", back: [S4, S5] }],
  },
  {
    ...b("hanhanno", 3, "思考・判断・表現"),
    prompt: "2つの半反応式を足して酸化還元反応の式をつくるとき、それぞれを何倍するかを決める決まりはどれですか。",
    answer: {
      kind: "choice",
      options: ["酸化剤が受け取る電子の数と、還元剤が出す電子の数を等しくする", "左辺と右辺の H⁺ の数を等しくする", "酸化剤と還元剤の係数を等しくする", "生成物の数を最も少なくする"],
      correct: 0,
      why: ["受け取る e⁻ と出す e⁻ の数をそろえると、足したときに e⁻ が消える。", "H⁺ は足したあとで両辺から整理する。倍数を決める基準ではない。", "係数が等しくなるとは限らない（MnO₄⁻ と H₂O₂ は 2:5）。", "生成物の数は基準ではない。"],
    },
    point: "e⁻ の数をそろえて足す",
    steps: [{ title: "電子を消す", body: "{{出す電子と受け取る電子の数が等しくなるように}}整数倍して足すと、e⁻ が消えます。", back: [S5] }],
  },
];

/** [化学式, 求める元素, その原子の数, H の数, O の数, 全体の電荷] */
const OX: [string, string, number, number, number, number][] = [
  ["H₂SO₄", "S", 1, 2, 4, 0],
  ["SO₂", "S", 1, 0, 2, 0],
  ["H₂S", "S", 1, 2, 0, 0],
  ["SO₄²⁻", "S", 1, 0, 4, -2],
  ["HNO₃", "N", 1, 1, 3, 0],
  ["NH₃", "N", 1, 3, 0, 0],
  ["NO₂", "N", 1, 0, 2, 0],
  ["NO", "N", 1, 0, 1, 0],
  ["NH₄⁺", "N", 1, 4, 0, 1],
  ["MnO₄⁻", "Mn", 1, 0, 4, -1],
  ["MnO₂", "Mn", 1, 0, 2, 0],
  ["Cr₂O₇²⁻", "Cr", 2, 0, 7, -2],
  ["CO₂", "C", 1, 0, 2, 0],
  ["CO", "C", 1, 0, 1, 0],
  ["CH₄", "C", 1, 4, 0, 0],
  ["Fe₂O₃", "Fe", 2, 0, 3, 0],
  ["Cu₂O", "Cu", 2, 0, 1, 0],
  ["H₂O₂", "O", 2, 2, 0, 0],
];

function sankasu(r: Rng): QuestionBody {
  const [fm, el, nT, nH, nO, q] = r.pick(OX);
  const x = (q - nH + 2 * nO) / nT;
  const known = [nH ? `(＋1)×${nH}` : "", nO ? `(−2)×${nO}` : ""].filter(Boolean).join(" ＋ ");
  const lhs = `${known}${known ? " ＋ " : ""}${nT === 1 ? "x" : `${nT}x`}`;
  return {
    prompt: `${fm} の ${el} の酸化数を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(x)], calc: `(${q}-${nH}*1-${nO}*(-2))/${nT}` },
    point: q === 0 ? "H＝＋1、O＝−2、化合物全体の和は0" : "多原子イオンでは、和＝イオンの電荷",
    steps: [
      { title: "決まりを当てはめる", body: `${el} の酸化数を x とします。${nH ? "H は＋1" : ""}${nH && nO ? "、" : ""}${nO ? "O は−2" : ""}${q === 0 ? "、全体の和は0。" : `、イオン全体の和は ${sg(q)}。`}`, back: [S2] },
      { title: "式を解く", body: `${lhs} ＝ ${sg(q)} より {{x＝${sg(x)}}}。`, trap: q === 0 ? "符号は数の前に書く（＋2 であって 2＋ ではない）。" : "イオンの電荷を忘れて、和を0にしない。" },
    ],
  };
}

// [KMnO₄ の濃度, H₂O₂ の体積 mL, H₂O₂ の濃度] で、滴下量 V1 ＝ 2×c2×V2 / (5×c1) が小数第2位まで・5〜40 mL
const TITR: [number, number, number, number][] = [];
for (const c1 of [0.01, 0.02, 0.04, 0.05]) for (const V2 of [10, 20]) for (const c2 of [0.025, 0.05, 0.08, 0.1, 0.125, 0.2]) {
  const V1 = (2 * c2 * V2) / (5 * c1);
  if (V1 >= 5 && V1 <= 40 && Math.abs(V1 * 100 - Math.round(V1 * 100)) < 1e-6) TITR.push([c1, V2, c2, Math.round(V1 * 100) / 100]);
}

function tekitei(r: Rng): QuestionBody {
  const [c1, V2, c2, V1] = r.pick(TITR);
  const e = f((5 * c1 * V1) / 1000);
  return {
    prompt: `濃度のわからない過酸化水素水 ${V2} mL を硫酸で酸性にし、${f(c1)} mol/L の過マンガン酸カリウム水溶液で滴定すると、${f(V1)} mL で赤紫色が消えなくなりました。過酸化水素水のモル濃度は何 mol/L ですか。MnO₄⁻ は1 mol あたり電子 5 mol を受け取り、H₂O₂ は1 mol あたり電子 2 mol を出します。`,
    answer: { kind: "num", answerKind: "num", answer: [f(c2)], unit: "mol/L", calc: `5*${f(c1)}*${f(V1)}/(2*${V2})` },
    point: "受け取る e⁻ の mol ＝ 出す e⁻ の mol",
    steps: [
      { title: "受け取る電子", body: `MnO₄⁻ は ${f(c1)}×${f(V1)}/1000 mol。受け取る e⁻ はその5倍で {{${e} mol}}。`, back: [S5] },
      { title: "出す電子と等しく", body: `H₂O₂ の濃度を x とすると 2×x×${V2}/1000 ＝ ${e}。x＝{{${f(c2)} mol/L}}。`, trap: "物質量どうしを等しくしない。等しいのは電子の mol（5倍と2倍をかける）。" },
    ],
  };
}

export const H_SCI_CHEMB_SANKA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学基礎",
  review: { status: "draft" },
  sections: [
    { title: "酸化と還元", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
    {
      title: "酸化数と量的関係",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "sankasu", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: sankasu },
        { id: "tekitei", type: "A", difficulty: 3, points: 18, seconds: 180, skill: "思考・判断・表現", generate: tekitei },
      ],
    },
  ],
};
