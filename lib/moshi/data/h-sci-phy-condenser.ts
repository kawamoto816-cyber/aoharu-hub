// 物理「コンデンサー」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: Q＝CV、U＝½CV²＝½QV、並列 C＝C₁＋C₂・直列 1/C＝1/C₁＋1/C₂、C＝εS/d (間隔・誘電体での変化) を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。μF・μC・μJ で数を扱い、答えが割り切れる組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-condenser";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "電気をためる部品：極板と充電");
const S2 = L(2, "Q＝CV と C＝εS/d はどこから来るか");
const S3 = L(3, "誘電体を入れると容量がふえる");
const S4 = L(4, "たまるエネルギーは ½QV");
const S5 = L(5, "並列はたし算、直列は逆数のたし算");
const S6 = L(6, "電池を切り離して間隔を広げると");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function qcv(r: Rng): QuestionBody {
  const C = r.pick([0.5, 1, 2, 3, 4, 5, 10, 20]);
  const V = r.pick([5, 6, 10, 12, 20, 50, 100]);
  const Q = C * V;
  const kind = r.pick(["Q", "C", "V"] as const);
  if (kind === "Q")
    return {
      prompt: `電気容量 ${f(C)} μF のコンデンサーを ${V} V の電池につないで充電した。コンデンサーにたまる電気量は何 μC ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(Q)], unit: "μC", calc: `${C}*${V}` },
      point: "Q＝CV",
      steps: [{ title: "Q＝CV", body: `Q＝${f(C)}×10⁻⁶×${V}＝{{${f(Q)}}}×10⁻⁶ C。`, back: [S2] }],
    };
  if (kind === "C")
    return {
      prompt: `あるコンデンサーを ${V} V の電池につないで充電したところ、${f(Q)} μC の電気量がたまった。このコンデンサーの電気容量は何 μF ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(C)], unit: "μF", calc: `${f(Q)}/${V}` },
      point: "C＝Q/V：1 V あたりにためられる電気量",
      steps: [{ title: "C＝Q/V", body: `C＝${f(Q)}÷${V}＝{{${f(C)}}} μF。`, back: [S2] }],
    };
  return {
    prompt: `電気容量 ${f(C)} μF のコンデンサーに ${f(Q)} μC の電気量がたまっている。極板間の電圧は何 V ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(V)], unit: "V", calc: `${f(Q)}/${C}` },
    point: "V＝Q/C",
    steps: [{ title: "V＝Q/C", body: `V＝${f(Q)}÷${f(C)}＝{{${V}}} V。`, back: [S1, S2] }],
  };
}

function energy(r: Rng): QuestionBody {
  const C = r.pick([1, 2, 4, 5, 10]);
  const V = r.pick([2, 4, 6, 10, 20, 30]);
  const Uj = 0.5 * C * V * V;
  if (r.bool())
    return {
      prompt: `電気容量 ${C} μF のコンデンサーを ${V} V で充電した。コンデンサーにたくわえられた静電エネルギーは何 μJ ですか (1 μJ＝1×10⁻⁶ J)。`,
      answer: { kind: "num", answerKind: "num", answer: [f(Uj)], unit: "μJ", calc: `(1/2)*${C}*${V}^2` },
      point: "U＝½CV²",
      steps: [{ title: "U＝½CV²", body: `U＝½×${C}×10⁻⁶×${V}²＝{{${f(Uj)}}}×10⁻⁶ J。`, back: [S4] }],
    };
  const Wb = C * V * V;
  return {
    prompt: `電気容量 ${C} μF のコンデンサーを ${V} V の電池で充電した。この間に電池がした仕事のうち、コンデンサーにたくわえられずに抵抗などで熱になったエネルギーは何 μJ ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(Wb - Uj)], unit: "μJ", calc: `${C}*${V}*${V}-(1/2)*${C}*${V}^2` },
    point: "電池の仕事 QV のうち、たまるのは半分の ½QV",
    steps: [
      { title: "電池の仕事", body: `電池は電気量 Q＝${C * V} μC を電圧 ${V} V で送るので、仕事は QV＝{{${f(Wb)} μJ}}。`, back: [S4] },
      { title: "たまるのは半分", body: `たまるのは ½QV＝${f(Uj)} μJ。残りの {{${f(Wb - Uj)}}} μJ が熱になる。`, trap: "電池の仕事とたまるエネルギーを同じにしない。" },
    ],
  };
}

const PAIRS = [
  [2, 2],
  [3, 6],
  [2, 6],
  [4, 4],
  [1, 4],
  [4, 12],
  [6, 12],
  [2, 3],
  [3, 12],
  [2, 8],
] as const;

function gousei(r: Rng): QuestionBody {
  const [C1, C2] = r.pick(PAIRS);
  const Cs = (C1 * C2) / (C1 + C2);
  const kind = r.pick(["para", "seri", "V1"] as const);
  if (kind === "para") {
    const V = r.pick([6, 10, 12]);
    return {
      prompt: `${C1} μF と ${C2} μF のコンデンサーを並列につなぎ、${V} V の電池につないだ。2つのコンデンサーにたまる電気量の合計は何 μC ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String((C1 + C2) * V)], unit: "μC", calc: `(${C1}+${C2})*${V}` },
      point: "並列：電圧が共通、C＝C₁＋C₂",
      steps: [{ title: "合成容量", body: `並列は極板の面積がふえるのと同じ。C＝${C1}＋${C2}＝{{${C1 + C2} μF}}。Q＝${C1 + C2}×${V}＝{{${(C1 + C2) * V}}} μC。`, back: [S5] }],
    };
  }
  if (kind === "seri")
    return {
      prompt: `${C1} μF と ${C2} μF のコンデンサーを直列につないだ。合成容量は何 μF ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(Cs)], unit: "μF", calc: `1/(1/${C1}+1/${C2})` },
      point: "直列：1/C＝1/C₁＋1/C₂ (抵抗とは逆)",
      steps: [{ title: "逆数のたし算", body: `1/C＝1/${C1}＋1/${C2} より C＝${C1 * C2}÷${C1 + C2}＝{{${f(Cs)}}} μF。直列は間隔が広がるのと同じで、小さくなる。`, back: [S5], trap: "直列で足し算をしない (それは並列)。" }],
    };
  const V = (C1 + C2) * r.pick([1, 2, 3]);
  const V1 = (C2 * V) / (C1 + C2);
  return {
    prompt: `はじめ電荷のない ${C1} μF と ${C2} μF のコンデンサーを直列につなぎ、両端に ${V} V の電圧を加えた。${C1} μF のコンデンサーにかかる電圧は何 V ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(V1)], unit: "V", calc: `${C2}*${V}/(${C1}+${C2})` },
    point: "直列：電気量が共通、V は C に反比例",
    steps: [
      { title: "電気量が等しい", body: `直列では2つの電気量は等しく Q。${C1}V₁＝${C2}V₂、V₁＋V₂＝${V}。`, back: [S5] },
      { title: "解く", body: `V₁＝${C2}×${V}÷${C1 + C2}＝{{${f(V1)}}} V。容量の小さいほうに大きい電圧がかかる。`, trap: "容量の比のまま電圧を分けない (逆比)。" },
    ],
  };
}

function kankaku(r: Rng): QuestionBody {
  const k = r.pick([2, 3]);
  const C = k * r.pick([1, 2, 3]);
  const V = r.pick([10, 12, 20, 30]);
  const cut = r.bool();
  const what = r.pick(["V", "U"] as const);
  if (cut) {
    const ans = what === "V" ? V * k : 0.5 * C * V * V * k;
    return {
      prompt: `電気容量 ${C} μF の平行板コンデンサーを ${V} V の電池で充電したあと、電池を切り離した。そのあと極板の間隔を ${k} 倍に広げた。${what === "V" ? "極板間の電圧は何 V " : "コンデンサーの静電エネルギーは何 μJ "}になりますか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(ans)], unit: what === "V" ? "V" : "μJ", calc: what === "V" ? `${C}*${V}/(${C}/${k})` : `(1/2)*${C}*${V}*(${C}*${V}/(${C}/${k}))` },
      point: "切り離す → Q 一定。C が 1/k なら V は k 倍",
      steps: [
        { title: "変わらない量", body: `電池を切り離すと電荷の行き場がないので {{Q＝${C * V} μC は一定}}。`, back: [S6] },
        { title: "容量の変化", body: `C＝εS/d より間隔 ${k} 倍で C は ${f(C / k)} μF。V＝Q/C＝{{${V * k} V}}。`, back: [S2] },
        ...(what === "U" ? [{ title: "エネルギー", body: `U＝½QV＝½×${C * V}×${V * k}＝{{${f(ans)}}} μJ。ふえた分は極板を引きはなす仕事。`, back: [S4] }] : []),
      ],
    };
  }
  const ans = what === "V" ? (C * V) / k : (0.5 * C * V * V) / k;
  return {
    prompt: `電気容量 ${C} μF の平行板コンデンサーを ${V} V の電池につないだまま、極板の間隔を ${k} 倍に広げた。${what === "V" ? "コンデンサーにたまっている電気量は何 μC " : "コンデンサーの静電エネルギーは何 μJ "}になりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(ans)], unit: what === "V" ? "μC" : "μJ", calc: what === "V" ? `(${C}/${k})*${V}` : `(1/2)*(${C}/${k})*${V}^2` },
    point: "電池につないだまま → V 一定",
    steps: [
      { title: "変わらない量", body: `電池につながっているので {{V＝${V} V は一定}}。`, back: [S6] },
      { title: "容量の変化", body: `C は 1/${k} 倍の ${f(C / k)} μF。${what === "V" ? `Q＝CV＝{{${f(ans)}}} μC。` : `U＝½CV²＝{{${f(ans)}}} μJ。`}`, back: [S2, S4], trap: "電池につないだままか切り離したかで、一定の量がちがう。" },
    ],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("c-shiki", 1),
    prompt: "平行板コンデンサーの電気容量を大きくする方法として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["極板の面積を大きくする", "極板の間隔を広げる", "加える電圧を大きくする", "極板を厚い金属にかえる"],
      correct: 0,
      why: ["正しい。C＝εS/d で、S に比例する。", "間隔 d に反比例するので、小さくなる。", "電圧を変えても C は変わらない (Q が変わる)。", "極板の厚さは C に関係しない。"],
    },
    point: "C＝εS/d",
    steps: [{ title: "式を見る", body: "C は {{面積 S に比例、間隔 d に反比例}}、誘電率 ε に比例する。", back: [S2] }],
  },
  {
    ...base("yudentai", 1),
    prompt: "充電したあと電池を切り離したコンデンサーの極板の間に、すき間なく誘電体 (比誘電率 εr＞1) を入れた。極板間の電圧はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["1/εr 倍に下がる", "εr 倍に上がる", "変わらない", "0 になる"],
      correct: 0,
      why: ["正しい。Q 一定で C が εr 倍になるので V＝Q/C は 1/εr 倍。", "容量がふえるので電圧は下がる。", "切り離しているので Q が一定で、V は変わる。", "誘電体の分極で電場は弱まるが 0 にはならない。"],
    },
    point: "誘電体：C が εr 倍。Q 一定なら V は 1/εr",
    steps: [{ title: "分極で電場が弱まる", body: "誘電体の表面に現れた電荷が電場を弱め、{{C は εr 倍}}。Q 一定なので V は 1/εr 倍。", back: [S3] }],
  },
  {
    ...base("hanbun", 2, "思考・判断・表現"),
    prompt: "コンデンサーを電池で充電するとき、電池がした仕事 QV のうち、コンデンサーにたまる静電エネルギーが ½QV である理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["電荷を運ぶとき、極板間の電圧は 0 から V まで少しずつ上がるので、平均して V/2 で運んだことになるから", "電荷の半分が電池にもどるから", "コンデンサーの片方の極板にしかエネルギーがたまらないから", "電圧が半分に下がるから"],
      correct: 0,
      why: ["正しい。V–Q グラフの三角形の面積が ½QV。", "たまる電気量は Q のまま。", "エネルギーは極板間の電場にたくわえられる。", "充電が終わると電圧は V。"],
    },
    point: "V–Q グラフの三角形の面積＝½QV",
    steps: [{ title: "グラフの面積", body: "電圧は電荷とともに 0→V と増えるので、運ぶ仕事は{{三角形の面積 ½QV}}。残り ½QV は導線などで熱になる。", back: [S4] }],
  },
  {
    ...base("heiretsu-chokuretsu", 2, "思考・判断・表現"),
    prompt: "同じ電気容量 C のコンデンサー2個について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["並列の合成容量は 2C、直列の合成容量は C/2", "並列も直列も合成容量は 2C", "並列の合成容量は C/2、直列の合成容量は 2C", "並列も直列も合成容量は C のまま"],
      correct: 0,
      why: ["正しい。並列は面積が2倍、直列は間隔が2倍と同じ。", "直列では小さくなる。", "抵抗の合成と取りちがえている。", "つなぎ方で容量は変わる。"],
    },
    point: "並列：面積が増える、直列：間隔が広がる",
    steps: [{ title: "C＝εS/d で考える", body: "並列は S が2倍で {{2C}}、直列は d が2倍で {{C/2}}。抵抗とは逆。", back: [S5] }],
  },
];

export const H_SCI_PHY_CONDENSER_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 14,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "コンデンサーの計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "qcv", type: "A", difficulty: 1, points: 16, seconds: 50, skill: "知識・技能", generate: qcv },
        { id: "energy", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: energy },
        { id: "gousei", type: "A", difficulty: 2, points: 17, seconds: 100, skill: "知識・技能", generate: gousei },
        { id: "kankaku", type: "A", difficulty: 3, points: 18, seconds: 140, skill: "思考・判断・表現", generate: kankaku },
      ],
    },
    { title: "コンデンサーのしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
