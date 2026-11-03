// 物理基礎「電流と電気抵抗」の単元模試 (A: 数値を入れかえる計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: q＝It、V＝RI、直列 R₁＋R₂・並列 R₁R₂/(R₁＋R₂)、P＝IV、Q＝RI²t、W＝Pt を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。並列は合成抵抗が整数になる組だけをテーブルで持つ。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phyb-denryu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "電流＝1秒間に断面を通る電気量");
const S2 = L(2, "電子の速さで電流を表す I＝envS");
const S3 = L(3, "なぜ R＝ρL/S になるのか");
const S4 = L(4, "合成抵抗は「共通なもの」から考える");
const S5 = L(5, "電力 P＝IV とジュール熱");
const S6 = L(6, "電力量と、家庭の電気の安全");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function ohm(r: Rng): QuestionBody {
  const kind = r.pick(["q", "V", "I"] as const);
  if (kind === "q") {
    const I = r.pick([0.2, 0.25, 0.5, 1.5, 2, 3]);
    const t = r.pick([2, 4, 5, 10, 20, 60]);
    return {
      prompt: `導線に ${f(I)} A の電流が ${t} s 間流れた。この間に導線の断面を通った電気量は何 C ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(I * t)], unit: "C", calc: `${I}*${t}` },
      point: "I＝q/t より q＝It",
      steps: [{ title: "q＝It", body: `1秒間に ${f(I)} C ずつ通るので、q＝${f(I)}×${t}＝{{${f(I * t)}}} C。`, back: [S1] }],
    };
  }
  const R = r.pick([2, 4, 5, 8, 10, 20, 25, 50]);
  const I = r.pick([0.1, 0.2, 0.4, 0.5, 1.2, 2]);
  const V = R * I;
  if (kind === "V") {
    return {
      prompt: `${R} Ω の抵抗に ${f(I)} A の電流が流れている。抵抗の両端の電圧は何 V ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(V)], unit: "V", calc: `${R}*${I}` },
      point: "オームの法則 V＝RI",
      steps: [{ title: "V＝RI", body: `V＝${R}×${f(I)}＝{{${f(V)}}} V。`, back: [S3] }],
    };
  }
  return {
    prompt: `${R} Ω の抵抗の両端に ${f(V)} V の電圧を加えた。流れる電流は何 A ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(I)], unit: "A", calc: `${f(V)}/${R}` },
    point: "I＝V/R",
    steps: [{ title: "V＝RI を変形", body: `I＝${f(V)}÷${R}＝{{${f(I)}}} A。`, back: [S3] }],
  };
}

/** 並列の合成抵抗が整数になる組 [R₁, R₂, R] */
const PARA: [number, number, number][] = [
  [6, 3, 2],
  [12, 4, 3],
  [6, 6, 3],
  [10, 15, 6],
  [20, 30, 12],
  [12, 6, 4],
  [20, 5, 4],
  [30, 6, 5],
  [24, 8, 6],
  [40, 10, 8],
];

function gosei(r: Rng): QuestionBody {
  const [R1, R2, R] = r.pick(PARA);
  const V = R * r.pick([1, 2, 3, 6]);
  if (r.bool()) {
    return {
      prompt: `${R1} Ω と ${R2} Ω の抵抗を並列につないだ。合成抵抗は何 Ω ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(R)], unit: "Ω", calc: `1/(1/${R1}+1/${R2})` },
      point: "並列は 1/R＝1/R₁＋1/R₂。最後に逆数",
      steps: [
        { title: "逆数を足す", body: `1/R＝1/${R1}＋1/${R2}＝1/${R}。`, back: [S4] },
        { title: "逆数にもどす", body: `R＝{{${R}}} Ω。どちらの抵抗よりも小さくなっている。`, trap: `1/R の値 1/${R} を答えにしない。` },
      ],
    };
  }
  const Rs = R1 + R2;
  return {
    prompt: `${R1} Ω と ${R2} Ω の抵抗を直列につなぎ、全体に ${f((V * Rs) / R)} V の電圧を加えた。回路を流れる電流は何 A ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(V / R)], unit: "A", calc: `${f((V * Rs) / R)}/(${R1}+${R2})` },
    point: "直列は電流が共通。R＝R₁＋R₂",
    steps: [
      { title: "合成抵抗", body: `直列なので R＝${R1}＋${R2}＝${Rs} Ω。`, back: [S4] },
      { title: "電流", body: `I＝${f((V * Rs) / R)}÷${Rs}＝{{${f(V / R)}}} A。どちらの抵抗にも同じ電流が流れる。` },
    ],
  };
}

function denryoku(r: Rng): QuestionBody {
  const kind = r.pick(["P", "Q", "kWh"] as const);
  if (kind === "P") {
    const V = r.pick([100, 12, 6, 24]);
    const I = r.pick([0.5, 1.5, 2, 3, 4, 5]);
    return {
      prompt: `${V} V の電圧で使うと ${f(I)} A の電流が流れる電気器具がある。この器具の消費電力は何 W ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(V * I)], unit: "W", calc: `${I}*${V}` },
      point: "電力 P＝IV",
      steps: [{ title: "P＝IV", body: `P＝${f(I)}×${V}＝{{${f(V * I)}}} W。1秒間に ${f(V * I)} J のエネルギーを使う。`, back: [S5] }],
    };
  }
  if (kind === "Q") {
    const R = r.pick([2, 5, 10, 20]);
    const I = r.pick([0.5, 1, 1.5, 2, 3]);
    const t = r.pick([10, 30, 60, 120]);
    const Q = R * I * I * t;
    return {
      prompt: `${R} Ω の電熱線に ${f(I)} A の電流を ${t} s 間流した。発生したジュール熱は何 J ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(Q)], unit: "J", calc: `${R}*${I}^2*${t}` },
      point: "ジュール熱 Q＝RI²t（電流は2乗）",
      steps: [
        { title: "電力", body: `P＝RI²＝${R}×${f(I)}²＝${f(R * I * I)} W。`, back: [S5] },
        { title: "時間をかける", body: `Q＝${f(R * I * I)}×${t}＝{{${f(Q)}}} J。`, trap: "I を2乗し忘れると、電流が 1 A でないときに値がずれる。" },
      ],
    };
  }
  const Pw = r.pick([500, 600, 800, 1000, 1200, 1500]);
  const h = r.pick([0.5, 1.5, 2, 3, 4]);
  const kWh = (Pw / 1000) * h;
  return {
    prompt: `消費電力 ${Pw} W のヒーターを ${f(h)} 時間使った。使った電力量は何 kWh ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(kWh)], unit: "kWh", calc: `${Pw}/1000*${h}` },
    point: "W＝Pt。kW と h の単位でかけると kWh",
    steps: [{ title: "単位をそろえる", body: `${Pw} W＝${f(Pw / 1000)} kW。W＝${f(Pw / 1000)}×${f(h)}＝{{${f(kWh)}}} kWh（1 kWh＝3.6×10⁶ J）。`, back: [S6] }],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("denshi-muki", 1),
    prompt: "金属の導線に電流が流れているとき、導線の中の自由電子の動く向きについて正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["電流の向きと逆向き（−極側から＋極側へ）", "電流の向きと同じ向き", "電流と垂直な向き", "動かずに止まっている"],
      correct: 0,
      why: ["正しい。電子は負の電荷をもつので、電流（＋の電荷が動く向き）と逆に動く。", "電流の向きは＋の電荷が動く向きと決めてある。", "電子は導線にそって動く。", "電流が流れているとき、自由電子は動いている。"],
    },
    point: "電子の動く向きは電流と逆",
    steps: [{ title: "負の電荷", body: "電流の向きは＋の電荷が動く向き。自由電子は{{負}}の電荷なので{{電流と逆向き}}に動く。", back: [S1] }],
  },
  {
    ...base("nagasa", 1),
    prompt: "同じ材質・同じ太さの導線の長さを3倍にすると、抵抗は何倍になりますか。",
    answer: { kind: "num", answerKind: "num", answer: ["3"], unit: "倍", calc: "3" },
    point: "R＝ρL/S。長さに比例",
    steps: [{ title: "直列と同じ", body: "長さ3倍は同じ抵抗を直列に3つつないだのと同じ。R＝ρL/S より{{3倍}}。", back: [S3] }],
  },
  {
    ...base("futosa", 2, "思考・判断・表現"),
    prompt: "同じ材質の導線で、長さを2倍、断面積を4倍にした。抵抗はもとの何倍になりますか。",
    answer: { kind: "num", answerKind: "num", answer: ["1/2"], unit: "倍", calc: "2/4" },
    point: "長さに比例、断面積に反比例",
    steps: [{ title: "R＝ρL/S", body: "L が2倍で2倍、S が4倍で 1/4 倍。合わせて 2×1/4＝{{1/2}} 倍。", back: [S3], trap: "断面積を大きくすると抵抗は小さくなる（並列に並べたのと同じ）。" }],
  },
  {
    ...base("heiretsu-chiisai", 2),
    prompt: "抵抗を並列につないだときの合成抵抗について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["つないだどの抵抗よりも小さい", "つないだ抵抗の和になる", "つないだ抵抗のうち大きいほうと等しい", "つないだどの抵抗よりも大きい"],
      correct: 0,
      why: ["正しい。電流の通り道がふえるので、流れやすくなる。", "和になるのは直列。", "並列では電流が両方に分かれて流れるので、どちらか一方とは等しくならない。", "大きくなるのは直列のとき。"],
    },
    point: "並列の合成抵抗はどの抵抗よりも小さい",
    steps: [{ title: "通り道がふえる", body: "並列では電圧が共通で電流が足し算になる。同じ電圧で電流が多く流れるので{{合成抵抗は小さい}}。", back: [S4] }],
  },
  {
    ...base("ienv", 3, "思考・判断・表現"),
    prompt: "銅線に電流が流れているとき、自由電子の平均の速さは1秒に1 mm にも満たない。それでも大きな電流が流れる理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["導線の中の自由電子の数がけた外れに多いから", "電子1個の電気量がとても大きいから", "電子が光と同じ速さで動いているから", "銅線の中では電子が電流と同じ向きに動くから"],
      correct: 0,
      why: ["正しい。I＝envS で、n（1 m³ あたりの自由電子の数）がとても大きい。", "電気素量は 1.6×10⁻¹⁹ C ととても小さい。", "平均の速さは1秒に1 mm にも満たない。", "向きは電流の大きさとは関係しない。また電子は電流と逆向きに動く。"],
    },
    point: "I＝envS：v は小さくても n がとても大きい",
    steps: [{ title: "I＝envS", body: "電流は e・n・v・S の積。v は小さいが、{{n（自由電子の数）がけた外れに多い}}ので I は大きくなる。", back: [S2] }],
  },
  {
    ...base("tako-ashi", 3, "思考・判断・表現"),
    prompt: "1本の延長コードに、たくさんの電気器具をつないで同時に使うと危険な理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["器具は並列につながるので、コードを流れる電流がふえ、コード自身で発生する熱が電流の2乗でふえるから", "器具は直列につながるので、それぞれの器具にかかる電圧が下がるから", "器具をふやすとコードの抵抗が大きくなり、電流が流れなくなるから", "電圧が器具の数だけ足し算されて高くなるから"],
      correct: 0,
      why: ["正しい。ジュール熱は RI² に比例し、定格をこえると発熱で危険になる。", "家庭のコンセントにつなぐ器具は並列。", "器具を並列にふやすと全体の抵抗は小さくなり、電流はふえる。", "並列なので、どの器具にかかる電圧も同じ。"],
    },
    point: "並列で電流がふえ、発熱は電流の2乗でふえる",
    steps: [{ title: "並列と発熱", body: "器具は{{並列}}なので、使うほどコードを流れる電流がふえる。コードの発熱は {{RI²}} なので急にふえ、{{定格}}をこえると危険。", back: [S6] }],
  },
];

export const H_SCI_PHYB_DENRYU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理基礎",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "電流・抵抗・電力の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "ohm", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: ohm },
        { id: "gosei", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: gosei },
        { id: "denryoku", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: denryoku },
      ],
    },
    { title: "電流と抵抗のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
