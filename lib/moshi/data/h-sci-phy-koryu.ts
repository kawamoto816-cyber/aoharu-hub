// 物理「交流回路」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: 抵抗の平均電力 P＝V_eI_e＝V₀I₀/2＝V_e²/R、リアクタンス X_L＝ωL・X_C＝1/(ωC)、
//   RLC 直列のインピーダンス Z＝√(R²＋(X_L−X_C)²)、共振の角周波数 ω₀²＝1/(LC)、送電の損失 P_loss＝(P/V)²r を
//   calc / equations に書き、scripts/check-moshi.ts がシード1〜100で答えと照合する。
//   √2 や π が答えに残らないように、角周波数 ω を与え、実効値と最大値は電力で結ぶ。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-koryu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "交流は sin で表す：周期・周波数・角周波数");
const S2 = L(2, "実効値が最大値の 1/√2 になるわけ");
const S3 = L(3, "コイルとコンデンサーのリアクタンス");
const S4 = L(4, "RLC 直列回路のインピーダンス");
const S5 = L(5, "共振と、高い電圧で送電するわけ");
const S6 = L(6, "電気振動：コイルとコンデンサーのエネルギーのやりとり");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const nice = (x: number) => Math.abs(x * 1000 - Math.round(x * 1000)) < 1e-6;

function denryoku(r: Rng): QuestionBody {
  const kind = r.pick(["max", "eff", "T"] as const);
  if (kind === "T") {
    const fr = r.pick([50, 40, 100, 200, 250, 500]);
    return {
      prompt: `周波数 ${fr} Hz の交流電圧がある。この交流の周期は何 s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(1 / fr)], unit: "s", calc: `1/${fr}` },
      point: "T＝1/f",
      steps: [{ title: "1秒に f 回", body: `1 s に ${fr} 回くり返すので、1回は 1÷${fr}＝{{${f(1 / fr)}}} s。`, back: [S1] }],
    };
  }
  const R = r.pick([10, 20, 25, 50, 100]);
  if (kind === "max") {
    const I0 = r.pick([1, 2, 3, 4]);
    const V0 = I0 * R;
    return {
      prompt: `${R} Ω の抵抗に交流電圧を加えたところ、電流の最大値が ${I0} A、電圧の最大値が ${V0} V だった。抵抗で消費される平均の電力は何 W ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f((V0 * I0) / 2)], unit: "W", calc: `${V0}*${I0}/2` },
      point: "平均の電力＝V₀I₀/2＝V_eI_e",
      steps: [
        { title: "瞬間の電力の平均", body: "p＝V₀I₀ sin²ωt で、sin² の平均は {{½}}。", back: [S2] },
        { title: "計算", body: `P＝${V0}×${I0}÷2＝{{${f((V0 * I0) / 2)}}} W。`, trap: "最大値どうしを掛けたまま (½ なし) にしない。" },
      ],
    };
  }
  const Ve = r.pick([10, 20, 50, 100]);
  return {
    prompt: `実効値 ${Ve} V の交流電圧を ${R} Ω の抵抗に加えた。抵抗で消費される平均の電力は何 W ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f((Ve * Ve) / R)], unit: "W", calc: `${Ve}^2/${R}` },
    point: "実効値を使えば直流と同じ式 P＝V²/R",
    steps: [{ title: "実効値の意味", body: `実効値は「同じ電力を出す直流の値」。P＝${Ve}²÷${R}＝{{${f((Ve * Ve) / R)}}} W。`, back: [S2] }],
  };
}

function reactance(r: Rng): QuestionBody {
  for (;;) {
    const w = r.pick([100, 200, 400, 500, 1000]);
    const Ve = r.pick([10, 20, 50, 100]);
    if (r.bool()) {
      const Lh = r.pick([0.01, 0.02, 0.05, 0.1, 0.2, 0.5]);
      const X = w * Lh;
      const askI = r.bool();
      const ans = askI ? Ve / X : X;
      if (!nice(ans) || !nice(X)) continue;
      return {
        prompt: `自己インダクタンス ${f(Lh)} H のコイルに、角周波数 ${w} rad/s・実効値 ${Ve} V の交流電圧を加えた。${askI ? "コイルを流れる電流の実効値は何 A " : "コイルのリアクタンスは何 Ω "}ですか。コイルの抵抗は無視できる。`,
        answer: { kind: "num", answerKind: "num", answer: [f(ans)], unit: askI ? "A" : "Ω", calc: askI ? `${Ve}/(${w}*${Lh})` : `${w}*${Lh}` },
        point: "X_L＝ωL：周波数が高いほど電流を通しにくい",
        steps: [
          { title: "リアクタンス", body: `X_L＝ωL＝${w}×${f(Lh)}＝{{${f(X)} Ω}}。`, back: [S3] },
          ...(askI ? [{ title: "電流", body: `I_e＝V_e/X_L＝${Ve}÷${f(X)}＝{{${f(ans)}}} A。電流は電圧より 1/4 周期遅れる。`, back: [S3] }] : []),
        ],
      };
    }
    const C = r.pick([1, 2, 5, 10, 20, 50]);
    const X = 1e6 / (w * C);
    const askI = r.bool();
    const ans = askI ? Ve / X : X;
    if (!nice(ans) || !nice(X)) continue;
    return {
      prompt: `電気容量 ${C} μF のコンデンサーに、角周波数 ${w} rad/s・実効値 ${Ve} V の交流電圧を加えた。${askI ? "回路を流れる電流の実効値は何 A " : "コンデンサーのリアクタンスは何 Ω "}ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(ans)], unit: askI ? "A" : "Ω", calc: askI ? `${Ve}*${w}*${C}/1000000` : `1000000/(${w}*${C})` },
      point: "X_C＝1/(ωC)：周波数が高いほど電流を通しやすい",
      steps: [
        { title: "リアクタンス", body: `X_C＝1/(ωC)＝1÷(${w}×${C}×10⁻⁶)＝{{${f(X)} Ω}}。`, back: [S3], trap: "μF の 10⁻⁶ を忘れない。" },
        ...(askI ? [{ title: "電流", body: `I_e＝V_e/X_C＝${Ve}÷${f(X)}＝{{${f(ans)}}} A。電流は電圧より 1/4 周期進む。`, back: [S3] }] : []),
      ],
    };
  }
}

const TRIPLE = [
  [30, 40, 50],
  [40, 30, 50],
  [60, 80, 100],
  [5, 12, 13],
  [12, 5, 13],
  [24, 10, 26],
  [8, 15, 17],
] as const;

function impedance(r: Rng): QuestionBody {
  const [R, X, Z] = r.pick(TRIPLE);
  const XC = r.pick([10, 20, 30, 40]);
  const coilBig = r.bool();
  const XL = coilBig ? XC + X : XC;
  const XCc = coilBig ? XC : XC + X;
  const Ve = Z * r.pick([1, 2, 4, 5]);
  const askI = r.bool();
  const head = `抵抗 ${R} Ω、リアクタンス ${XL} Ω のコイル、リアクタンス ${XCc} Ω のコンデンサーを直列につなぎ、実効値 ${Ve} V の交流電圧を加えた。`;
  if (!askI)
    return {
      prompt: `${head}回路のインピーダンスは何 Ω ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(Z)], unit: "Ω", equations: [`x^2=${R}^2+(${XL}-${XCc})^2`] },
      point: "Z＝√(R²＋(X_L−X_C)²)",
      steps: [
        { title: "ずれ方のちがい", body: "コイルの電圧は電流より 1/4 周期進み、コンデンサーは 1/4 周期遅れる。逆向きなので {{X_L−X_C}} で打ち消し合う。", back: [S3, S4] },
        { title: "三平方で合成", body: `Z²＝${R}²＋(${XL}−${XCc})²＝${Z * Z} より Z＝{{${Z}}} Ω。`, trap: "R＋X_L＋X_C と単純に足さない。" },
      ],
    };
  return {
    prompt: `${head}回路を流れる電流の実効値は何 A ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(Ve / Z)], unit: "A", calc: `${Ve}/${Z}` },
    point: "I_e＝V_e/Z",
    steps: [
      { title: "インピーダンス", body: `Z＝√(${R}²＋(${XL}−${XCc})²)＝{{${Z} Ω}}。`, back: [S4] },
      { title: "電流", body: `I_e＝${Ve}÷${Z}＝{{${f(Ve / Z)}}} A。`, trap: "R だけで割らない。" },
    ],
  };
}

// 1/(LC) が平方数になる [L (H), C (μF), ω₀ (rad/s)]
const RES = [
  [0.1, 10, 1000],
  [0.4, 10, 500],
  [0.01, 100, 1000],
  [0.25, 1, 2000],
  [1, 4, 500],
  [0.1, 40, 500],
  [0.5, 2, 1000],
] as const;

function kyoshin(r: Rng): QuestionBody {
  if (r.bool()) {
    const [Lh, C, w0] = r.pick(RES);
    return {
      prompt: `自己インダクタンス ${f(Lh)} H のコイルと電気容量 ${C} μF のコンデンサーと抵抗を直列につなぎ、交流電源の角周波数を変えていった。電流の実効値が最大になる (共振する) 角周波数は何 rad/s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(w0)], unit: "rad/s", equations: [`x^2*${Lh}*${C}=1000000`] },
      point: "共振：X_L＝X_C → ω₀＝1/√(LC)",
      steps: [
        { title: "共振の条件", body: "X_L＝X_C のとき Z＝R で最小、電流が最大。{{ωL＝1/(ωC)}}。", back: [S5] },
        { title: "ω₀ を求める", body: `ω₀²＝1/(LC)＝1÷(${f(Lh)}×${C}×10⁻⁶) より ω₀＝{{${w0}}} rad/s。`, back: [S6] },
      ],
    };
  }
  for (;;) {
    const Pkw = r.pick([10, 20, 50, 100, 200]);
    const Vkv = r.pick([1, 2, 5, 10]);
    const rr = r.pick([0.5, 1, 2, 5]);
    const I = Pkw / Vkv;
    const loss = I * I * rr;
    if (!nice(loss)) continue;
    return {
      prompt: `発電所から ${Pkw} kW の電力を、電圧の実効値 ${Vkv} kV で送る。送電線全体の抵抗が ${f(rr)} Ω のとき、送電線で熱として失われる電力は何 W ですか。電流と電圧の位相はそろっているものとする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(loss)], unit: "W", calc: `(${Pkw}*1000/(${Vkv}*1000))^2*${rr}` },
      point: "I＝P/V、損失＝RI²：電圧を上げると損失は 1/V²",
      steps: [
        { title: "送電線の電流", body: `I＝P/V＝${Pkw}×10³÷(${Vkv}×10³)＝{{${f(I)} A}}。`, back: [S5] },
        { title: "損失", body: `P_loss＝rI²＝${f(rr)}×${f(I)}²＝{{${f(loss)}}} W。電圧を10倍にすると損失は 1/100。`, trap: "送電の電圧 V で V²/r としない。送電線にかかる電圧は V ではない。" },
      ],
    };
  }
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("jikkochi", 1),
    prompt: "家庭のコンセントの電圧が「100 V」というとき、この 100 V が表すものはどれですか。",
    answer: {
      kind: "choice",
      options: ["実効値 (電圧の最大値は約 141 V)", "電圧の最大値", "電圧の平均値 (1周期の平均)", "電圧の最小値"],
      correct: 0,
      why: ["正しい。最大値は 100×√2≒141 V。", "最大値は約 141 V。", "1周期の単純な平均は 0。", "最小値は約 −141 V。"],
    },
    point: "100 V は実効値。最大値は √2 倍",
    steps: [{ title: "実効値", body: "同じ電力を出す直流の電圧が実効値。{{V_e＝V₀/√2}} なので、V₀＝√2×100≒141 V。", back: [S2] }],
  },
  {
    ...base("ichi-zure", 1),
    prompt: "コイルだけをつないだ交流回路で、電流と電圧の関係として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["電流は電圧より 1/4 周期遅れる", "電流は電圧より 1/4 周期進む", "電流と電圧は同じ位相", "電流は電圧より 1/2 周期遅れる"],
      correct: 0,
      why: ["正しい。自己誘導が電流の変化をさまたげ、電流が遅れる。", "これはコンデンサーのとき。", "同じ位相なのは抵抗のとき。", "ずれは 1/4 周期 (位相で π/2)。"],
    },
    point: "コイル：電流が遅れる、コンデンサー：電流が進む",
    steps: [{ title: "自己誘導", body: "コイルは電流の変化をさまたげるので、電流は電圧より{{1/4 周期遅れる}}。", back: [S3] }],
  },
  {
    ...base("shohi-zero", 2, "思考・判断・表現"),
    prompt: "コイルだけ (抵抗は無視できる) をつないだ交流回路で、1周期の間にコイルで消費される電力の平均はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["0 になる。エネルギーをためたり返したりするだけ", "V_eI_e になる", "V₀I₀ になる", "電流が流れるので、必ず正の値になる"],
      correct: 0,
      why: ["正しい。位相が 1/4 周期ずれると、瞬間の電力の正負が打ち消し合う。", "位相がそろった抵抗のときの値。", "最大値の積は平均にならない。", "電流が流れても、電力の平均は 0 になる。"],
    },
    point: "コイル・コンデンサーの平均消費電力は 0",
    steps: [{ title: "電力の正負", body: "位相が 1/4 周期ずれると、瞬間の電力は正と負が半分ずつ。磁場にためては電源に{{返す}}だけ。", back: [S3, S6] }],
  },
  {
    ...base("soden", 2, "思考・判断・表現"),
    prompt: "発電所からの送電に高い電圧を使う理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["同じ電力なら電流が小さくなり、送電線で熱として失われる電力 RI² が減るから", "電圧が高いほど送電線の抵抗が小さくなるから", "電圧が高いほど交流の周波数が上がり、遠くまで届くから", "高い電圧のほうが安全だから"],
      correct: 0,
      why: ["正しい。電圧を n 倍にすると電流は 1/n、損失は 1/n²。", "送電線の抵抗は電圧で変わらない。", "電圧と周波数は関係しない。", "高い電圧はむしろ危険で、変圧器で下げてから家庭に送る。"],
    },
    point: "P＝VI で V を上げて I を下げる",
    steps: [{ title: "損失は電流の2乗", body: "送る電力 P＝VI が同じなら、V を上げると I が下がり、損失 {{RI²}} が大きく減る。", back: [S5] }],
  },
];

export const H_SCI_PHY_KORYU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 15,
  review: { status: "draft" },
  sections: [
    {
      title: "交流回路の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "denryoku", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: denryoku },
        { id: "reactance", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: reactance },
        { id: "impedance", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: impedance },
        { id: "kyoshin", type: "A", difficulty: 3, points: 18, seconds: 140, skill: "思考・判断・表現", generate: kyoshin },
      ],
    },
    { title: "交流のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
