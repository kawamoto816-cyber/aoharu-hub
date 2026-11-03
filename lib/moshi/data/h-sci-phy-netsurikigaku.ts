// 物理「熱力学」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: 熱力学第1法則 Q＝ΔU＋W (W は気体がした仕事)、定圧変化の仕事 W＝pΔV、
//   単原子分子の ΔU＝(3/2)nRΔT・定圧で Q＝(5/2)nRΔT (R＝8.3 J/(mol·K))、熱効率 e＝W/Q₁＝1−Q₂/Q₁ を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。答えが小数第3位までで割り切れる組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-netsurikigaku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "熱力学第1法則：エネルギーの帳じり");
const S2 = L(2, "気体がする仕事は p-V グラフの面積");
const S3 = L(3, "4つの変化は「どれが0か」で見分ける");
const S4 = L(4, "熱機関と熱効率");
const S5 = L(5, "不可逆変化と熱力学第2法則");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function daiichi(r: Rng): QuestionBody {
  const kind = r.pick(["dU", "Q", "comp"] as const);
  if (kind === "dU") {
    const W = r.int(2, 30) * 10;
    const Q = W + r.int(1, 30) * 10;
    return {
      prompt: `気体に ${Q} J の熱を加えたところ、気体は膨張して外部に ${W} J の仕事をした。気体の内部エネルギーの増加は何 J ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(Q - W)], unit: "J", calc: `${Q}-${W}` },
      point: "Q＝ΔU＋W (W は気体がした仕事)",
      steps: [{ title: "帳じりを合わせる", body: `もらった熱 ${Q} J のうち、${W} J は外への仕事に使われた。ΔU＝${Q}−${W}＝{{${Q - W}}} J。`, back: [S1] }],
    };
  }
  if (kind === "Q") {
    const W = r.int(2, 30) * 10;
    const dU = r.int(1, 30) * 10;
    return {
      prompt: `気体に熱を加えたところ、内部エネルギーが ${dU} J 増加し、気体は外部に ${W} J の仕事をした。気体に加えた熱量は何 J ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(dU + W)], unit: "J", calc: `${dU}+${W}` },
      point: "Q＝ΔU＋W",
      steps: [{ title: "第1法則", body: `Q＝${dU}＋${W}＝{{${dU + W}}} J。`, back: [S1] }],
    };
  }
  const Win = r.int(2, 30) * 10;
  const Qout = r.int(1, 20) * 10;
  return {
    prompt: `ピストンを押して気体を圧縮し、気体に ${Win} J の仕事をした。この間に気体は外部へ ${Qout} J の熱を放出した。気体の内部エネルギーの増加は何 J ですか（減少したときは負の値で答えなさい）。`,
    answer: { kind: "num", answerKind: "num", answer: [String(Win - Qout)], unit: "J", calc: `${Win}-${Qout}` },
    point: "された仕事は＋、放出した熱は−で数える",
    steps: [
      { title: "符号をそろえる", body: `ΔU＝(もらった熱)＋(された仕事)。もらった熱は −${Qout} J、された仕事は ＋${Win} J。`, back: [S1] },
      { title: "計算", body: `ΔU＝−${Qout}＋${Win}＝{{${Win - Qout}}} J。`, trap: "仕事を「した」のか「された」のかで符号が逆になる。" },
    ],
  };
}

function shigoto(r: Rng): QuestionBody {
  const p = r.pick([1, 1.5, 2, 2.5, 3, 4]);
  const dV = r.pick([1, 2, 3, 4, 5, 6]);
  const W = p * 100 * dV;
  if (r.bool())
    return {
      prompt: `圧力を ${f(p)}×10⁵ Pa に保ったまま、気体の体積が ${dV}.0×10⁻³ m³ だけ増えた。気体が外部にした仕事は何 J ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(W)], unit: "J", calc: `${p}*100*${dV}` },
      point: "定圧：W＝pΔV (p-V グラフの長方形)",
      steps: [{ title: "W＝pΔV", body: `${f(p)}×10⁵×${dV}×10⁻³＝${f(p)}×${dV}×10²＝{{${f(W)}}} J。`, back: [S2], trap: "10⁵ と 10⁻³ の指数をまとめ忘れない。" }],
    };
  const Q = W + r.int(1, 9) * 100;
  return {
    prompt: `圧力 ${f(p)}×10⁵ Pa を保ったまま気体に ${Q} J の熱を加えたところ、体積が ${dV}.0×10⁻³ m³ 増えた。気体の内部エネルギーの増加は何 J ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(Q - W)], unit: "J", calc: `${Q}-${p}*100*${dV}` },
    point: "まず W＝pΔV、次に ΔU＝Q−W",
    steps: [
      { title: "仕事", body: `W＝pΔV＝{{${f(W)} J}}。`, back: [S2] },
      { title: "第1法則", body: `ΔU＝${Q}−${f(W)}＝{{${f(Q - W)}}} J。`, back: [S1] },
    ],
  };
}

function tangenshi(r: Rng): QuestionBody {
  const n = r.pick([0.5, 1, 2, 3]);
  const dT = r.pick([10, 20, 30, 40, 50, 100]);
  const kind = r.pick(["teiseki", "teiatsu", "W"] as const);
  const gas = r.pick(["ヘリウム", "アルゴン", "単原子分子の理想気体"]);
  const what = gas === "単原子分子の理想気体" ? gas : `${gas}（単原子分子の理想気体）`;
  const R = "気体定数を 8.3 J/(mol·K) とする。";
  if (kind === "teiseki")
    return {
      prompt: `${f(n)} mol の${what}を、体積を一定に保ったまま温度を ${dT} K 上げた。加えた熱量は何 J ですか。${R}`,
      answer: { kind: "num", answerKind: "num", answer: [f(1.5 * n * 8.3 * dT)], unit: "J", calc: `(3/2)*${n}*8.3*${dT}` },
      point: "定積：W＝0 なので Q＝ΔU＝(3/2)nRΔT",
      steps: [
        { title: "どれが 0 か", body: "体積が変わらないので {{W＝0}}。熱はすべて内部エネルギーになる。", back: [S3] },
        { title: "計算", body: `Q＝1.5×${f(n)}×8.3×${dT}＝{{${f(1.5 * n * 8.3 * dT)}}} J。`, back: [S1] },
      ],
    };
  if (kind === "teiatsu")
    return {
      prompt: `${f(n)} mol の${what}を、圧力を一定に保ったまま温度を ${dT} K 上げた。加えた熱量は何 J ですか。${R}`,
      answer: { kind: "num", answerKind: "num", answer: [f(2.5 * n * 8.3 * dT)], unit: "J", calc: `(3/2)*${n}*8.3*${dT}+${n}*8.3*${dT}` },
      point: "定圧：Q＝ΔU＋W＝(3/2)nRΔT＋nRΔT",
      steps: [
        { title: "内部エネルギー", body: `ΔU＝(3/2)nRΔT＝{{${f(1.5 * n * 8.3 * dT)} J}}。`, back: [S1] },
        { title: "外への仕事", body: `定圧では W＝pΔV＝nRΔT＝{{${f(n * 8.3 * dT)} J}}。`, back: [S2] },
        { title: "合計", body: `Q＝{{${f(2.5 * n * 8.3 * dT)}}} J。`, trap: "定積と同じ (3/2)nRΔT にしない。膨張する分の仕事がいる。" },
      ],
    };
  return {
    prompt: `${f(n)} mol の${what}を、圧力を一定に保ったまま温度を ${dT} K 上げた。気体が外部にした仕事は何 J ですか。${R}`,
    answer: { kind: "num", answerKind: "num", answer: [f(n * 8.3 * dT)], unit: "J", calc: `${n}*8.3*${dT}` },
    point: "定圧：W＝pΔV＝nRΔT",
    steps: [{ title: "状態方程式で置きかえ", body: `pV＝nRT より、圧力一定なら pΔV＝nRΔT＝${f(n)}×8.3×${dT}＝{{${f(n * 8.3 * dT)}}} J。`, back: [S2] }],
  };
}

function kouritsu(r: Rng): QuestionBody {
  const Q1 = r.pick([200, 400, 500, 800, 1000, 1250, 2000]);
  const e = r.pick([0.1, 0.2, 0.25, 0.3, 0.4]);
  const W = Q1 * e;
  const Q2 = Q1 - W;
  const kind = r.pick(["e", "W", "Q2"] as const);
  if (kind === "e")
    return {
      prompt: `ある熱機関は、1サイクルの間に高温の熱源から ${Q1} J の熱を受け取り、低温の熱源に ${f(Q2)} J の熱を捨てる。この熱機関の熱効率はいくらですか。小数で答えなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [f(e)], calc: `1-${f(Q2)}/${Q1}` },
      point: "e＝W/Q₁＝(Q₁−Q₂)/Q₁",
      steps: [
        { title: "仕事を出す", body: `1サイクルで内部エネルギーはもとにもどるので、W＝Q₁−Q₂＝{{${f(W)} J}}。`, back: [S4] },
        { title: "効率", body: `e＝${f(W)}÷${Q1}＝{{${f(e)}}}。`, trap: "捨てた熱 Q₂÷Q₁ を効率にしない。" },
      ],
    };
  if (kind === "W")
    return {
      prompt: `熱効率 ${f(e)} の熱機関が、1サイクルの間に高温の熱源から ${Q1} J の熱を受け取る。1サイクルで外部にする仕事は何 J ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(W)], unit: "J", calc: `${e}*${Q1}` },
      point: "W＝eQ₁",
      steps: [{ title: "効率の定義", body: `e＝W/Q₁ より W＝${f(e)}×${Q1}＝{{${f(W)}}} J。`, back: [S4] }],
    };
  return {
    prompt: `熱効率 ${f(e)} の熱機関が、1サイクルの間に高温の熱源から ${Q1} J の熱を受け取る。1サイクルで低温の熱源に捨てる熱量は何 J ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(Q2)], unit: "J", calc: `${Q1}-${e}*${Q1}` },
    point: "Q₂＝Q₁−W。熱はすべて仕事にはならない",
    steps: [
      { title: "仕事", body: `W＝${f(e)}×${Q1}＝{{${f(W)} J}}。`, back: [S4] },
      { title: "捨てる熱", body: `Q₂＝${Q1}−${f(W)}＝{{${f(Q2)}}} J。`, back: [S5] },
    ],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("touon", 1),
    prompt: "理想気体の等温変化について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["内部エネルギーは変化せず、加えた熱はすべて外への仕事になる", "外への仕事は 0 で、加えた熱はすべて内部エネルギーになる", "熱の出入りがない", "内部エネルギーも仕事も 0 になる"],
      correct: 0,
      why: ["正しい。温度一定なら ΔU＝0 で Q＝W。", "これは定積変化。", "熱の出入りがないのは断熱変化。", "等温膨張では外へ仕事をする。"],
    },
    point: "等温：ΔU＝0 → Q＝W",
    steps: [{ title: "どれが 0 か", body: "内部エネルギーは温度だけで決まるので、温度一定なら {{ΔU＝0}}。", back: [S3] }],
  },
  {
    ...base("dannetsu", 1, "思考・判断・表現"),
    prompt: "空気入れでタイヤに空気を入れると、空気入れの筒が熱くなる。素早く空気を圧縮したときに起きていることとして最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["熱が出入りするひまがなく (断熱圧縮)、された仕事の分だけ内部エネルギーが増えて温度が上がる", "圧縮すると気体の熱が外から入ってくるので温度が上がる", "体積が小さくなると分子の数がふえるので温度が上がる", "圧縮しても温度は変わらないが、摩擦で筒が熱くなるだけ"],
      correct: 0,
      why: ["正しい。Q＝0 なので ΔU＝(された仕事) で、温度が上がる。", "素早い圧縮では熱の出入りはほとんどない。", "閉じこめた空気の分子の数は変わらない。", "摩擦もあるが、断熱圧縮による温度上昇が主な理由。"],
    },
    point: "断熱圧縮：Q＝0、された仕事で温度上昇",
    steps: [{ title: "Q＝0 の変化", body: "断熱なので Q＝0。第1法則で {{ΔU＝(された仕事)＞0}}、温度が上がる。", back: [S1, S3] }],
  },
  {
    ...base("daini", 2, "思考・判断・表現"),
    prompt: "熱力学第2法則の考え方として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["熱は、ほかに何の変化も残さずに低温の物体から高温の物体へ自然に移ることはない", "熱はエネルギーではないので、保存されない", "効率 1 (100%) の熱機関は、摩擦をなくせばつくれる", "冷蔵庫は冷たさを外からつくり出している"],
      correct: 0,
      why: ["正しい。冷蔵庫は外から仕事を加えて熱を移している。", "熱もエネルギーで、第1法則で保存が表される。", "熱機関は必ず低温の熱源に熱を捨てるので、効率は 1 未満。", "冷蔵庫は内部の熱を仕事を使って外へ「移す」装置。"],
    },
    point: "熱は自然には低温→高温へ移らない",
    steps: [{ title: "不可逆変化", body: "高温→低温は自然に進むが、逆は{{仕事を加えないと起こらない}}。熱機関の効率も 1 にできない。", back: [S5] }],
  },
  {
    ...base("pv-menseki", 2),
    prompt: "p-V グラフで、気体の状態が1周して元にもどるサイクルを右回り（時計回り）にたどった。1サイクルについて正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["グラフに囲まれた面積の分だけ、気体は正味で外へ仕事をする", "内部エネルギーは、囲まれた面積の分だけ増える", "気体が外へする仕事は 0", "気体は正味で熱を放出し、外から仕事をされる"],
      correct: 0,
      why: ["正しい。膨張でする仕事が、圧縮でされる仕事より大きい。", "元にもどるので ΔU＝0。", "膨張と圧縮の圧力がちがうので打ち消し合わない。", "左回り (冷凍機) のときのようす。"],
    },
    point: "右回りサイクルの面積＝正味の仕事",
    steps: [{ title: "膨張と圧縮の差", body: "膨張時のグラフの下の面積から、圧縮時の面積を引いた {{囲まれた面積}}が正味の仕事。ΔU＝0 なので Q＝W。", back: [S2, S4] }],
  },
];

export const H_SCI_PHY_NETSURIKIGAKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 14,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "熱力学の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "daiichi", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: daiichi },
        { id: "shigoto", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: shigoto },
        { id: "tangenshi", type: "A", difficulty: 2, points: 17, seconds: 100, skill: "思考・判断・表現", generate: tangenshi },
        { id: "kouritsu", type: "A", difficulty: 3, points: 18, seconds: 110, skill: "思考・判断・表現", generate: kouritsu },
      ],
    },
    { title: "熱力学のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
