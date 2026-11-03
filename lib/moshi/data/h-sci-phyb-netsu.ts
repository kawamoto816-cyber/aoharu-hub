// 物理基礎「熱とエネルギー」の単元模試 (A: 数値を入れかえる計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: T＝t＋273、熱効率 e＝W′/Q₁、Q＝mcΔT、熱量の保存 m₁c(t₁−T)＝m₂c(T−t₂) を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。混合の問題は先に平衡温度を決めてから、質量の逆比で温度差を作る。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phyb-netsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "温度は熱運動の激しさ。T＝t＋273");
const S2 = L(2, "熱量 Q＝mcΔT");
const S3 = L(3, "熱量の保存：失った熱＝得た熱");
const S4 = L(4, "状態変化の間は、温度が上がらない");
const S5 = L(5, "仕事は熱に変わる：ジュールの実験");
const S6 = L(6, "内部エネルギーと熱機関");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

function ondo(r: Rng): QuestionBody {
  const kind = r.pick(["toK", "toC", "eff"] as const);
  if (kind === "toK") {
    const t = r.int(-40, 120);
    return {
      prompt: `${t}℃ を絶対温度で表すと何 K ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(t + 273)], unit: "K", calc: `${t}+273` },
      point: "T＝t＋273",
      steps: [{ title: "273 をたす", body: `T＝${t}＋273＝{{${t + 273}}} K。`, back: [S1] }],
    };
  }
  if (kind === "toC") {
    const T = r.int(200, 400);
    return {
      prompt: `絶対温度 ${T} K はセルシウス温度で何℃ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(T - 273)], unit: "℃", calc: `${T}-273` },
      point: "t＝T−273",
      steps: [{ title: "273 をひく", body: `t＝${T}−273＝{{${T - 273}}}℃。`, back: [S1], trap: "温度差なら 1℃＝1 K だが、温度そのものは 273 ずれる。" }],
    };
  }
  const Q1 = r.step(1000, 8000, 500);
  const e = r.pick([0.1, 0.2, 0.25, 0.3, 0.4]);
  const W = Q1 * e;
  return {
    prompt: `ある熱機関が、高温の熱源から ${Q1} J の熱を受けとり、外部に ${f(W)} J の仕事をした。この熱機関の熱効率はいくらですか。小数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(e)], calc: `${f(W)}/${Q1}` },
    point: "熱効率 e＝（した仕事）÷（受けとった熱）",
    steps: [{ title: "e＝W′/Q₁", body: `e＝${f(W)}÷${Q1}＝{{${f(e)}}}。残りの ${f(Q1 - W)} J は低温側へ捨てられる。`, back: [S6] }],
  };
}

/** [物質, 比熱 J/(g·K)] (問題文で与える) */
const MAT: [string, number][] = [
  ["水", 4.2],
  ["アルミニウム", 0.9],
  ["鉄", 0.45],
];

function netsuryo(r: Rng): QuestionBody {
  const [name, c] = r.pick(MAT);
  const m = r.step(50, 500, 50);
  const dT = r.step(5, 40, 5);
  const Q = m * c * dT;
  if (r.bool()) {
    return {
      prompt: `${name} ${m} g の温度を ${dT} K 上げるのに必要な熱量は何 J ですか。${name}の比熱を ${f(c)} J/(g·K) とする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(Q)], unit: "J", calc: `${m}*${c}*${dT}` },
      point: "Q＝mcΔT（質量×比熱×温度変化）",
      steps: [{ title: "Q＝mcΔT", body: `Q＝${m}×${f(c)}×${dT}＝{{${f(Q)}}} J。`, back: [S2] }],
    };
  }
  const t0 = r.int(10, 30);
  return {
    prompt: `${t0}℃ の${name} ${m} g に ${f(Q)} J の熱を加えた。${name}の温度は何℃になりますか。${name}の比熱を ${f(c)} J/(g·K) とし、熱は外に逃げず、状態変化はしないものとする。`,
    answer: { kind: "num", answerKind: "num", answer: [String(t0 + dT)], unit: "℃", calc: `${t0}+${f(Q)}/(${m}*${c})` },
    point: "ΔT＝Q÷(mc) を求めて、はじめの温度にたす",
    steps: [
      { title: "温度変化", body: `ΔT＝${f(Q)}÷(${m}×${f(c)})＝${dT} K。`, back: [S2] },
      { title: "温度", body: `${t0}＋${dT}＝{{${t0 + dT}}}℃。`, trap: "ΔT をそのまま答えにしない。" },
    ],
  };
}

function kongo(r: Rng): QuestionBody {
  const [m1, m2] = r.sample([50, 100, 150, 200, 300, 400], 2);
  const g = gcd(m1, m2);
  const a = m2 / g;
  const b = m1 / g;
  const T = r.int(20, 40);
  const smax = Math.max(1, Math.min(Math.floor(50 / a), Math.floor((T - 5) / b)));
  const s = r.int(1, smax);
  const t1 = T + a * s;
  const t2 = T - b * s;
  return {
    prompt: `${t1}℃ の水 ${m1} g と、${t2}℃ の水 ${m2} g を断熱容器の中で混ぜた。じゅうぶん時間がたったあとの水の温度は何℃ですか。熱は容器や外に逃げないものとする。`,
    answer: { kind: "num", answerKind: "num", answer: [String(T)], unit: "℃", calc: `(${m1}*${t1}+${m2}*${t2})/(${m1}+${m2})` },
    point: "失った熱＝得た熱。同じ水なら「質量×温度変化」が等しい",
    steps: [
      { title: "熱量の保存", body: `あとの温度を T とすると、${m1}×c×(${t1}−T)＝${m2}×c×(T−${t2})。比熱 c は共通で消える。`, back: [S3] },
      { title: "解く", body: `${m1 * t1 + m2 * t2}＝${m1 + m2}T より、T＝{{${T}}}℃。`, trap: "2つの温度の平均にするのは、質量が等しいときだけ。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("zettai-reido", 1),
    prompt: "熱運動がもっとも穏やかになる温度で、絶対温度の 0 K にあたる温度はおよそ何℃ですか。",
    answer: {
      kind: "choice",
      options: ["−273℃", "0℃", "−100℃", "273℃"],
      correct: 0,
      why: ["正しい。これを絶対零度という。", "0℃ は水がこおる温度で、273 K。", "−100℃ でも熱運動は続いている。", "273℃ は 546 K。"],
    },
    point: "絶対零度 0 K ≒ −273℃",
    steps: [{ title: "絶対零度", body: "熱運動がもっとも穏やかになる約 {{−273℃}} を絶対零度といい、これを 0 K とする。", back: [S1] }],
  },
  {
    ...base("netsu-ondo", 1),
    prompt: "「熱」と「温度」について正しく説明しているものはどれですか。",
    answer: {
      kind: "choice",
      options: ["温度は熱運動の激しさを表し、熱は温度差によって移ったエネルギーの量である", "熱と温度は同じ量で、単位がちがうだけである", "温度が高い物体ほど、必ず多くの熱をもっている", "熱は物質の一種で、高温の物体から低温の物体へ流れこむ"],
      correct: 0,
      why: ["正しい。熱の単位は J。", "温度（K、℃）と熱（J）は別の量。", "物体が「熱をもつ」とはいわない。また同じ温度でも質量が大きいほど温めるのに多くの熱が必要。", "熱はエネルギーで、物質ではない。"],
    },
    point: "温度＝熱運動の激しさ、熱＝移ったエネルギー",
    steps: [{ title: "区別する", body: "温度は{{熱運動の激しさ}}、熱（熱量）は温度差によって{{移ったエネルギー}}で単位は J。", back: [S1, S2] }],
  },
  {
    ...base("sennetsu", 2),
    prompt: "−10℃ の氷を一定の割合で加熱し続けた。0℃ で氷がとけている間の温度について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["全部とけるまで 0℃ のまま変わらない", "加熱を続けているので少しずつ上がる", "とけ始めると急に 100℃ まで上がる", "いったん下がってから上がる"],
      correct: 0,
      why: ["正しい。加えた熱は融解熱として粒子の結びつきを切るのに使われる。", "融解している間は、熱が温度を上げることに使われない。", "100℃ になるのは、とけたあとの水が加熱されてから。", "加熱しているのに温度は下がらない。"],
    },
    point: "状態変化の間は温度一定。熱は潜熱として使われる",
    steps: [{ title: "潜熱", body: "とけている間は、加えた熱が{{融解熱（潜熱）}}として使われ、温度は {{0℃ のまま}}。グラフに平らな部分ができる。", back: [S4] }],
  },
  {
    ...base("netsuyoryo", 2),
    prompt: "質量 200 g、比熱 0.45 J/(g·K) の鉄球の熱容量は何 J/K ですか。",
    answer: { kind: "num", answerKind: "num", answer: ["90"], unit: "J/K", calc: "200*0.45" },
    point: "熱容量 C＝mc（物体全体を 1 K 上げる熱量）",
    steps: [{ title: "C＝mc", body: "C＝200×0.45＝{{90}} J/K。この鉄球を 1 K 上げるには 90 J 必要。", back: [S2] }],
  },
  {
    ...base("dainihosoku", 3, "思考・判断・表現"),
    prompt: "気体に外から 300 J の仕事をして押し縮めると同時に、気体から 100 J の熱を外へ逃がした。気体の内部エネルギーの変化 ΔU は何 J ですか。",
    answer: { kind: "num", answerKind: "num", answer: ["200"], unit: "J", calc: "-100+300" },
    point: "ΔU＝Q＋W。逃げた熱は Q が負",
    steps: [{ title: "熱力学第一法則", body: "加えた熱 Q＝−100 J（逃がした）、された仕事 W＝＋300 J。{{ΔU＝Q＋W＝200 J}}。", back: [S6], trap: "逃がした熱を＋で足すと 400 J になってしまう。" }],
  },
  {
    ...base("joule", 3, "思考・判断・表現"),
    prompt: "ジュールの実験（おもりが落ちて羽根車を回し、水をかき混ぜる実験）からわかったこととして、最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["した仕事と生じた熱が比例し、仕事と熱は同じエネルギーの別の姿である", "水をかき混ぜても温度は変わらず、熱と仕事は無関係である", "熱はすべて仕事に変えることができる", "おもりが重いほど、水の比熱が大きくなる"],
      correct: 0,
      why: ["正しい。仕事が熱に変わり、水の温度が上がった。", "かき混ぜると水の温度は上がる。", "熱機関の熱効率は必ず 1 より小さい。この実験は仕事が熱に変わることを示した。", "比熱は物質で決まり、おもりには関係しない。"],
    },
    point: "仕事と熱は同じエネルギーの別の姿",
    steps: [{ title: "仕事→熱", body: "おもりの落下でした{{仕事}}が羽根車を通して{{熱}}になり、水の温度が上がった。仕事と熱は比例する。", back: [S5] }],
  },
];

export const H_SCI_PHYB_NETSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理基礎",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "温度と熱量の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "ondo", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: ondo },
        { id: "netsuryo", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: netsuryo },
        { id: "kongo", type: "A", difficulty: 2, points: 17, seconds: 150, skill: "思考・判断・表現", generate: kongo },
      ],
    },
    { title: "熱とエネルギーのしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
