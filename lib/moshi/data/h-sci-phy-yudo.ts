// 物理「電磁誘導」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: ファラデーの法則 V＝NΔΦ/Δt＝NSΔB/Δt、動く導体棒 V＝vBL・I＝V/R・F＝IBL・P＝Fv、
//   自己誘導 V＝LΔI/Δt・U＝½LI²、落下する導体棒の終端速度 mg＝(vB²L²)/R を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。答えが割り切れない組は引き直す。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-yudo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "ファラデーの法則 V＝−NΔΦ/Δt");
const S2 = L(2, "レンツの法則は、エネルギー保存の言いかえ");
const S3 = L(3, "動く導体棒の起電力 V＝vBL のわけ");
const S4 = L(4, "電磁ブレーキと、エネルギーの行き先");
const S5 = L(5, "渦電流：金属のかたまりに生まれる電流");
const S6 = L(6, "自己誘導とコイルのエネルギー");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const nice = (x: number) => Math.abs(x * 1000 - Math.round(x * 1000)) < 1e-6;

function faraday(r: Rng): QuestionBody {
  for (;;) {
    const N = r.pick([50, 100, 200, 500]);
    const S = r.pick([0.002, 0.004, 0.005, 0.01, 0.02]);
    const B1 = r.pick([0.1, 0.2, 0.3, 0.5]);
    const B2 = r.pick([0, 0.1, 0.4, 0.6]);
    const dt = r.pick([0.1, 0.2, 0.25, 0.5]);
    const V = (N * S * Math.abs(B2 - B1)) / dt;
    if (B1 === B2 || !nice(V) || V < 0.01) continue;
    return {
      prompt: `巻数 ${N} 回、断面積 ${f(S)} m² のコイルをつらぬく磁場の磁束密度が、${f(dt)} s の間に一定の割合で ${f(B1)} T から ${f(B2)} T に変化した。コイルに生じる誘導起電力の大きさは何 V ですか。磁場はコイルの面に垂直とする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(V)], unit: "V", calc: `${N}*${S}*(${B1 > B2 ? `${B1}-${B2}` : `${B2}-${B1}`})/${dt}` },
      point: "V＝N×ΔΦ/Δt、ΔΦ＝SΔB",
      steps: [
        { title: "磁束の変化", body: `ΔΦ＝SΔB＝${f(S)}×${f(Math.abs(B2 - B1))}＝{{${f(S * Math.abs(B2 - B1))} Wb}}。`, back: [S1] },
        { title: "起電力", body: `V＝${N}×${f(S * Math.abs(B2 - B1))}÷${f(dt)}＝{{${f(V)}}} V。`, trap: "巻数 N を掛け忘れない。1巻きごとに起電力が生じて直列に足される。" },
      ],
    };
  }
}

function bou(r: Rng): QuestionBody {
  const v = r.pick([1, 2, 2.5, 3, 4, 5]);
  const B = r.pick([0.2, 0.4, 0.5, 0.8]);
  const len = r.pick([0.2, 0.5, 1]);
  const R = r.pick([0.5, 1, 2, 4, 5]);
  const V = v * B * len;
  const askI = r.bool();
  const head = `磁束密度 ${f(B)} T の鉛直な一様磁場の中に、間隔 ${f(len)} m の平行な2本の水平なレールがあり、レールの端は ${f(R)} Ω の抵抗でつながれている。レールに垂直に置いた導体棒を、レールに沿って一定の速さ ${f(v)} m/s で動かす。導体棒とレールの抵抗は無視できる。`;
  if (!askI)
    return {
      prompt: `${head}導体棒に生じる誘導起電力の大きさは何 V ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(V)], unit: "V", calc: `${v}*${B}*${len}` },
      point: "V＝vBL",
      steps: [{ title: "V＝vBL", body: `1 s に面積 vL ぶん磁束が増える。V＝${f(v)}×${f(B)}×${f(len)}＝{{${f(V)}}} V。`, back: [S3] }],
    };
  const I = V / R;
  if (!nice(I))
    return {
      prompt: `${head}導体棒に生じる誘導起電力の大きさは何 V ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(V)], unit: "V", calc: `${v}*${B}*${len}` },
      point: "V＝vBL",
      steps: [{ title: "V＝vBL", body: `V＝${f(v)}×${f(B)}×${f(len)}＝{{${f(V)}}} V。`, back: [S3] }],
    };
  return {
    prompt: `${head}抵抗を流れる電流は何 A ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(I)], unit: "A", calc: `${v}*${B}*${len}/${R}` },
    point: "V＝vBL、I＝V/R",
    steps: [
      { title: "起電力", body: `V＝vBL＝{{${f(V)} V}}。`, back: [S3] },
      { title: "電流", body: `I＝${f(V)}÷${f(R)}＝{{${f(I)}}} A。向きは、棒の動きをさまたげる力が生じる向き (レンツの法則)。`, back: [S2] },
    ],
  };
}

function brake(r: Rng): QuestionBody {
  for (;;) {
    const v = r.pick([1, 2, 3, 4, 5]);
    const B = r.pick([0.2, 0.4, 0.5, 1]);
    const len = r.pick([0.2, 0.5, 1]);
    const R = r.pick([0.5, 1, 2, 4]);
    const I = (v * B * len) / R;
    const F = I * B * len;
    const P = F * v;
    const askP = r.bool();
    const ans = askP ? P : F;
    if (!nice(ans) || !nice(I) || ans === 0) continue;
    return {
      prompt: `磁束密度 ${f(B)} T の鉛直な一様磁場の中に、間隔 ${f(len)} m の平行な水平レールがあり、端は ${f(R)} Ω の抵抗でつながれている。レールに垂直に置いた導体棒を、外から力を加えて一定の速さ ${v} m/s で動かし続ける。導体棒とレールの抵抗・摩擦は無視できる。${askP ? "外力がする仕事の仕事率は何 W " : "加え続ける外力の大きさは何 N "}ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(ans)], unit: askP ? "W" : "N", calc: askP ? `(${v}*${B}*${len})^2/${R}` : `${v}*${B}*${len}/${R}*${B}*${len}` },
      point: askP ? "外力の仕事率 Fv＝抵抗の消費電力 V²/R" : "等速 → 外力＝電流が受ける力 IBL",
      steps: [
        { title: "電流", body: `V＝vBL＝${f(v * B * len)} V、I＝V/R＝{{${f(I)} A}}。`, back: [S3] },
        { title: "電磁ブレーキ", body: `電流は磁場から運動をさまたげる向きに F＝IBL＝{{${f(F)} N}} の力を受ける。等速なので外力も ${f(F)} N。`, back: [S2, S4] },
        ...(askP ? [{ title: "仕事率", body: `P＝Fv＝${f(F)}×${v}＝{{${f(P)}}} W。これは抵抗で生じるジュール熱 V²/R と等しい。`, back: [S4] }] : []),
      ],
    };
  }
}

function hatten(r: Rng): QuestionBody {
  const kind = r.pick(["self", "energy", "terminal"] as const);
  if (kind === "self") {
    const Lh = r.pick([0.1, 0.2, 0.5, 1, 2]);
    const dI = r.pick([0.5, 1, 2, 3]);
    const dt = r.pick([0.01, 0.02, 0.05, 0.1]);
    const V = (Lh * dI) / dt;
    return {
      prompt: `自己インダクタンス ${f(Lh)} H のコイルを流れる電流が、${f(dt)} s の間に一定の割合で ${f(dI)} A 増加した。コイルに生じる自己誘導起電力の大きさは何 V ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(V)], unit: "V", calc: `${Lh}*${dI}/${dt}` },
      point: "V＝L×ΔI/Δt：電流の変化をさまたげる向き",
      steps: [{ title: "V＝LΔI/Δt", body: `V＝${f(Lh)}×${f(dI)}÷${f(dt)}＝{{${f(V)}}} V。向きは電流の増加をさまたげる向き。`, back: [S6] }],
    };
  }
  if (kind === "energy") {
    const Lh = r.pick([0.1, 0.2, 0.4, 0.5, 2]);
    const I = r.pick([1, 2, 3, 4, 5]);
    const E = 0.5 * Lh * I * I;
    return {
      prompt: `自己インダクタンス ${f(Lh)} H のコイルに ${I} A の電流が流れている。コイルにたくわえられているエネルギーは何 J ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(E)], unit: "J", calc: `(1/2)*${Lh}*${I}^2` },
      point: "U＝½LI²",
      steps: [{ title: "U＝½LI²", body: `電流を 0 から I まで増やすとき、自己誘導にさからってした仕事がたまる。U＝½×${f(Lh)}×${I}²＝{{${f(E)}}} J。`, back: [S6] }],
    };
  }
  for (;;) {
    const m = r.pick([0.01, 0.02, 0.05]);
    const R = r.pick([0.5, 1, 2]);
    const B = r.pick([0.5, 1]);
    const len = r.pick([0.2, 0.5, 1]);
    const vt = (m * 9.8 * R) / (B * B * len * len);
    if (!nice(vt) || vt > 40) continue;
    return {
      prompt: `磁束密度 ${f(B)} T の水平な一様磁場の中に、間隔 ${f(len)} m の2本の鉛直なレールがあり、上端は ${f(R)} Ω の抵抗でつながれている。質量 ${f(m)} kg の導体棒をレールに水平に接触させて静かに放すと、やがて一定の速さで落下するようになった。その速さは何 m/s ですか。磁場はレールの面に垂直で、導体棒とレールの抵抗・摩擦は無視でき、重力加速度の大きさを 9.8 m/s² とする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(vt)], unit: "m/s", calc: `${m}*9.8*${R}/(${B}^2*${len}^2)` },
      point: "一定の速さ ⇔ 重力 mg＝電磁ブレーキの力 IBL",
      steps: [
        { title: "速さ v のときの力", body: "起電力 vBL、電流 vBL/R、上向きの力 {{F＝(vBL/R)×BL＝vB²L²/R}}。", back: [S3, S4] },
        { title: "つり合い", body: `mg＝vB²L²/R より v＝${f(m)}×9.8×${f(R)}÷(${f(B)}²×${f(len)}²)＝{{${f(vt)}}} m/s。`, trap: "速くなるほどブレーキが強くなる。自由落下のまま加速し続けるわけではない。" },
      ],
    };
  }
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("lenz", 1),
    prompt: "コイルに棒磁石の N 極を近づけたとき、コイルに流れる誘導電流について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["磁石に近い側が N 極になる向きに流れ、磁石を押し返す", "磁石に近い側が S 極になる向きに流れ、磁石を引きこむ", "磁石を近づけている間は電流は流れない", "磁石を止めていても電流は流れ続ける"],
      correct: 0,
      why: ["正しい。磁束の増加をさまたげる向き (レンツの法則)。", "引きこむ向きなら、エネルギーがひとりでに増えてしまう。", "磁束が変化している間は電流が流れる。", "磁束が変化しなければ誘導電流は流れない。"],
    },
    point: "誘導電流は磁束の変化をさまたげる向き",
    steps: [{ title: "レンツの法則", body: "近づく N 極による磁束の増加を打ち消すため、コイルは{{近い側を N 極}}にして押し返す。", back: [S2] }],
  },
  {
    ...base("energy-moto", 1, "思考・判断・表現"),
    prompt: "磁場の中で導体棒を動かして電流を流し、抵抗で熱を発生させる。この熱のエネルギーはどこから来ますか。",
    answer: {
      kind: "choice",
      options: ["導体棒を動かす外力がした仕事", "磁場そのものが減っていくエネルギー", "導体棒の中の電子がもともともっていたエネルギー", "どこからも来ず、新しく生まれる"],
      correct: 0,
      why: ["正しい。棒は電磁ブレーキの力を受けるので、動かし続けるには外力の仕事がいる。", "一様な磁場は変化しない。", "電子のエネルギーは使い切られず、外からの仕事が供給する。", "エネルギー保存の法則に反する。"],
    },
    point: "外力の仕事 → 電気エネルギー → ジュール熱",
    steps: [{ title: "エネルギーの流れ", body: "電流が磁場から受ける力は運動をさまたげる。{{それにさからう外力の仕事}}が、抵抗の熱になる。", back: [S4] }],
  },
  {
    ...base("uzu", 2, "思考・判断・表現"),
    prompt: "強い磁石を、アルミニウムの太いパイプの中に落とすと、ゆっくり落ちる。その理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["パイプに渦電流が生じ、その電流がつくる磁場が磁石の落下をさまたげるから", "アルミニウムが磁石を強く引きつけるから", "パイプの中の空気の抵抗が大きいから", "磁石の重さが軽くなるから"],
      correct: 0,
      why: ["正しい。磁石の上下で磁束が変化し、変化をさまたげる渦電流が流れる。", "アルミニウムは強磁性体ではなく、磁石に引きつけられない。", "磁石でない同じ大きさの物体は、パイプの中でもふつうに落ちる。", "重力は変わらない。"],
    },
    point: "渦電流も磁束の変化をさまたげる",
    steps: [{ title: "金属のかたまりの誘導", body: "動く磁石の近くで磁束が変化し、パイプの壁に{{渦電流}}が流れる。その磁場が落下をさまたげる (電磁ブレーキ)。", back: [S5] }],
  },
  {
    ...base("jiko", 2),
    prompt: "コイルと豆電球を直列につないだ回路のスイッチを入れると、豆電球が少し遅れて明るくなる。この理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["コイルに電流の増加をさまたげる向きの自己誘導起電力が生じるから", "コイルの抵抗がしだいに小さくなるから", "コイルに電気がたまるまで時間がかかるから", "豆電球のフィラメントが温まるまで電流が流れないから"],
      correct: 0,
      why: ["正しい。V＝LΔI/Δt が電流の急な変化を抑える。", "コイルの抵抗は一定とみなせる。", "電気をためるのはコンデンサー。コイルは電流の変化をさまたげる。", "フィラメントが温まるのは一瞬で、コイルがない回路ではすぐに明るくなる。"],
    },
    point: "コイルは電流の変化をさまたげる",
    steps: [{ title: "自己誘導", body: "電流が増えるとコイル自身の磁束が増え、{{それをさまたげる起電力}}が生じる。だから電流はゆっくり増える。", back: [S6] }],
  },
];

export const H_SCI_PHY_YUDO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 15,
  review: { status: "draft" },
  sections: [
    {
      title: "電磁誘導の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "faraday", type: "A", difficulty: 1, points: 16, seconds: 70, skill: "知識・技能", generate: faraday },
        { id: "bou", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: bou },
        { id: "brake", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: brake },
        { id: "hatten", type: "A", difficulty: 3, points: 18, seconds: 140, skill: "思考・判断・表現", generate: hatten },
      ],
    },
    { title: "電磁誘導のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
