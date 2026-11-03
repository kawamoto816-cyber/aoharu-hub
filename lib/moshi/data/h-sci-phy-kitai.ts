// 物理「気体分子の運動」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: ボイル・シャルルの法則 p₁V₁/T₁＝p₂V₂/T₂、状態方程式 pV＝nRT (R＝8.3 J/(mol·K))、
//   2乗平均速度 √(v²)∝√(T/M)、単原子分子の内部エネルギー U＝(3/2)nRT を calc / equations に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。答えが小数第3位までで割り切れる組だけを使う (割り切れない組は引き直す)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-kitai";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "圧力は、分子が壁にぶつかる力積から生まれる");
const S2 = L(2, "温度は、分子1個の平均運動エネルギーの目もり");
const S3 = L(3, "ボイル・シャルルの法則と状態方程式");
const S4 = L(4, "同じ温度でも、軽い分子ほど速い");
const S5 = L(5, "内部エネルギーは、分子の運動エネルギーの総和");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const c = (t: number) => String(t - 273).replace("-", "−");
const nice = (x: number) => Math.abs(x * 1000 - Math.round(x * 1000)) < 1e-6;

function boyle(r: Rng): QuestionBody {
  for (;;) {
    const T1 = r.pick([200, 250, 300, 400, 500, 600]);
    const T2 = r.pick([200, 250, 300, 350, 400, 450, 500, 600]);
    const p1 = r.pick([1, 1.5, 2, 3, 4]);
    const p2 = r.pick([1, 2, 2.5, 4, 5]);
    const V1 = r.int(2, 12);
    const V2 = (p1 * V1 * T2) / (T1 * p2);
    if (T1 === T2 || p1 === p2 || !nice(V2)) continue;
    return {
      prompt: `圧力 ${f(p1)}×10⁵ Pa、温度 ${c(T1)} ℃、体積 ${V1} L の気体がある。この気体を圧力 ${f(p2)}×10⁵ Pa、温度 ${c(T2)} ℃ にすると、体積は何 L になりますか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(V2)], unit: "L", calc: `${p1}*${V1}*${T2}/(${T1}*${p2})` },
      point: "pV/T＝一定。温度は絶対温度 (K) で",
      steps: [
        { title: "絶対温度にする", body: `${c(T1)} ℃＝{{${T1} K}}、${c(T2)} ℃＝{{${T2} K}}。`, back: [S3], trap: "℃ のまま比を取らない。" },
        { title: "ボイル・シャルル", body: `${f(p1)}×${V1}/${T1}＝${f(p2)}×V/${T2} より V＝{{${f(V2)}}} L。`, back: [S3] },
      ],
    };
  }
}

function joutai(r: Rng): QuestionBody {
  for (;;) {
    const n = r.pick([0.1, 0.2, 0.5, 1, 2]);
    const T = r.pick([200, 250, 300, 400, 500]);
    const V = r.pick([0.01, 0.02, 0.025, 0.04, 0.05]);
    const p = (n * 8.3 * T) / V;
    const askP = r.bool();
    if (askP) {
      if (!nice(p)) continue;
      return {
        prompt: `${f(n)} mol の理想気体を、体積 ${f(V)} m³ の容器に入れて温度を ${T} K に保った。気体の圧力は何 Pa ですか。気体定数を 8.3 J/(mol·K) とする。`,
        answer: { kind: "num", answerKind: "num", answer: [f(p)], unit: "Pa", calc: `${n}*8.3*${T}/${V}` },
        point: "pV＝nRT",
        steps: [{ title: "状態方程式", body: `p＝nRT/V＝${f(n)}×8.3×${T}÷${f(V)}＝{{${f(p)}}} Pa。`, back: [S3] }],
      };
    }
    if (!nice(p)) continue;
    return {
      prompt: `圧力 ${f(p)} Pa、体積 ${f(V)} m³、温度 ${T} K の理想気体の物質量は何 mol ですか。気体定数を 8.3 J/(mol·K) とする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(n)], unit: "mol", calc: `${f(p)}*${V}/(8.3*${T})` },
      point: "n＝pV/(RT)",
      steps: [{ title: "状態方程式", body: `n＝pV/(RT)＝${f(p)}×${f(V)}÷(8.3×${T})＝{{${f(n)}}} mol。`, back: [S3] }],
    };
  }
}

function sokudo(r: Rng): QuestionBody {
  if (r.bool()) {
    const [T1, T2, k] = r.pick([
      [300, 1200, 2],
      [200, 450, 1.5],
      [400, 100, 0.5],
      [100, 900, 3],
      [200, 800, 2],
      [400, 900, 1.5],
    ] as const);
    const v1 = r.pick([400, 500, 600, 800, 1200]);
    const gas = r.pick(["窒素", "ヘリウム", "アルゴン"]);
    return {
      prompt: `絶対温度 ${T1} K の${gas}の分子の2乗平均速度 √(v²) が ${v1} m/s だった。同じ気体を ${T2} K にすると、2乗平均速度は何 m/s になりますか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(v1 * k)], unit: "m/s", equations: [`x^2=${v1}^2*${T2}/${T1}`] },
      point: "½m(v²)＝(3/2)kT → √(v²)∝√T",
      steps: [
        { title: "温度と運動エネルギー", body: "分子1個の平均運動エネルギーは {{絶対温度に比例}}。だから v² は T に比例。", back: [S2] },
        { title: "比で求める", body: `T が ${f(T2 / T1)} 倍なので √(v²) は ${f(k)} 倍。${v1}×${f(k)}＝{{${f(v1 * k)}}} m/s。`, trap: "速さを温度に比例させない。" },
      ],
    };
  }
  const [a, Ma, b, Mb, k] = r.pick([
    ["水素 H₂", 2, "酸素 O₂", 32, 4],
    ["ヘリウム He", 4, "メタン CH₄", 16, 2],
    ["メタン CH₄", 16, "二酸化硫黄 SO₂", 64, 2],
    ["ヘリウム He", 4, "二酸化硫黄 SO₂", 64, 4],
  ] as const);
  const vb = r.pick([400, 450, 500, 600]);
  return {
    prompt: `同じ温度で、${b}（分子量 ${Mb}）の分子の2乗平均速度が ${vb} m/s のとき、${a}（分子量 ${Ma}）の分子の2乗平均速度は何 m/s ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(vb * k)], unit: "m/s", equations: [`x^2=${vb}^2*${Mb}/${Ma}`] },
    point: "同じ温度なら √(v²)∝1/√M (軽いほど速い)",
    steps: [
      { title: "同じ温度＝同じ平均運動エネルギー", body: "½m(v²) が等しいので {{v²∝1/m}}。", back: [S2, S4] },
      { title: "比で求める", body: `分子量の比 ${Mb}÷${Ma}＝${Mb / Ma} なので速さは ${k} 倍。${vb}×${k}＝{{${vb * k}}} m/s。`, trap: "分子量の比をそのまま掛けない (√ を取る)。" },
    ],
  };
}

function naibu(r: Rng): QuestionBody {
  const n = r.pick([0.5, 1, 2, 3, 4]);
  const gas = r.pick(["ヘリウム", "アルゴン", "ネオン"]);
  if (r.bool()) {
    const dT = r.pick([10, 20, 40, 50, 100]);
    const dU = 1.5 * n * 8.3 * dT;
    return {
      prompt: `${f(n)} mol の${gas}（単原子分子の理想気体）の温度を ${dT} K 上げた。内部エネルギーの増加は何 J ですか。気体定数を 8.3 J/(mol·K) とする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(dU)], unit: "J", calc: `(3/2)*${n}*8.3*${dT}` },
      point: "単原子分子：U＝(3/2)nRT → ΔU＝(3/2)nRΔT",
      steps: [
        { title: "内部エネルギー", body: "単原子分子の内部エネルギーは、分子の運動エネルギーの総和で {{(3/2)nRT}}。", back: [S5] },
        { title: "変化を計算", body: `ΔU＝1.5×${f(n)}×8.3×${dT}＝{{${f(dU)}}} J。`, trap: "変化の仕方 (定積・定圧) によらず ΔU は温度だけで決まる。" },
      ],
    };
  }
  const T = r.pick([200, 300, 400, 500]);
  const Uv = 1.5 * n * 8.3 * T;
  return {
    prompt: `${f(n)} mol の${gas}（単原子分子の理想気体）が絶対温度 ${T} K にある。この気体の内部エネルギーは何 J ですか。気体定数を 8.3 J/(mol·K) とする。`,
    answer: { kind: "num", answerKind: "num", answer: [f(Uv)], unit: "J", calc: `(3/2)*${n}*8.3*${T}` },
    point: "U＝(3/2)nRT",
    steps: [
      { title: "1個から全体へ", body: "1個の平均運動エネルギー (3/2)kT に分子数 nN_A を掛けると {{(3/2)nRT}}。", back: [S2, S5] },
      { title: "代入", body: `U＝1.5×${f(n)}×8.3×${T}＝{{${f(Uv)}}} J。` },
    ],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("atsuryoku", 1),
    prompt: "容器の中の気体が壁に圧力をおよぼすしくみとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["多数の分子が壁に衝突してはね返るときの力積が、壁を押す力になる", "分子どうしが反発し合う力が、壁に伝わる", "分子が壁にくっついて、壁を引っぱる", "気体の重さが壁にかかる"],
      correct: 0,
      why: ["正しい。1回の衝突で 2mv の運動量が変わり、その平均が力になる。", "理想気体では分子間の力は考えない。", "分子は壁ではね返る。", "気体の重さは小さく、圧力の原因ではない。"],
    },
    point: "圧力＝分子の衝突の力積の平均",
    steps: [{ title: "衝突を数える", body: "1回の衝突で壁が受ける力積は {{2mv}}。単位時間の衝突回数を掛けて平均すると、壁を押す力になる。", back: [S1] }],
  },
  {
    ...base("ondo", 1),
    prompt: "理想気体の絶対温度が2倍になったとき、分子1個の平均運動エネルギーはどうなりますか。",
    answer: {
      kind: "choice",
      options: ["2倍になる", "4倍になる", "√2 倍になる", "変わらない"],
      correct: 0,
      why: ["正しい。平均運動エネルギーは (3/2)kT で、絶対温度に比例する。", "4倍になるのは速さを2倍にしたとき。", "√2 倍になるのは2乗平均速度。", "温度は分子の運動の激しさの目もり。"],
    },
    point: "平均運動エネルギー＝(3/2)kT ∝ T",
    steps: [{ title: "比例関係", body: "½m(v²)＝{{(3/2)kT}}。T が2倍ならエネルギーも2倍、速さは √2 倍。", back: [S2] }],
  },
  {
    ...base("karui", 2, "思考・判断・表現"),
    prompt: "同じ温度の水素と酸素の混合気体について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["分子1個の平均運動エネルギーは等しいが、水素分子のほうが平均して速い", "酸素分子のほうが重いので、平均運動エネルギーも大きい", "どちらの分子も同じ速さで動いている", "水素分子のほうが、平均運動エネルギーが大きい"],
      correct: 0,
      why: ["正しい。½mv² が同じなら、質量が小さいほど速い。", "温度が同じなら平均運動エネルギーは等しい。", "質量がちがうので速さはちがう。水素は酸素の4倍速い。", "平均運動エネルギーは温度だけで決まる。"],
    },
    point: "同じ温度：エネルギーは同じ、軽いほど速い",
    steps: [{ title: "½mv² が同じ", body: "分子量 2 と 32。v²∝1/m より、水素は酸素の {{√16＝4倍}} 速い。", back: [S4] }],
  },
  {
    ...base("zettai", 2),
    prompt: "温度を下げていくと、理想気体の分子の運動について何が起こると考えられますか。",
    answer: {
      kind: "choice",
      options: ["0 K (−273 ℃) で平均運動エネルギーが 0 になり、それより低い温度はない", "0 ℃ で分子の運動が止まる", "温度はいくらでも下げられ、分子は逆向きに動き出す", "温度を下げても分子の速さは変わらない"],
      correct: 0,
      why: ["正しい。(3/2)kT が 0 になる温度が絶対零度。", "0 ℃ (273 K) では分子は活発に動いている。", "運動エネルギーは負にならないので、0 K より下はない。", "温度は平均運動エネルギーの目もりなので、速さも変わる。"],
    },
    point: "絶対零度 0 K＝−273 ℃",
    steps: [{ title: "エネルギーは負にならない", body: "平均運動エネルギー (3/2)kT≧0 なので、{{T＝0 K が下限}}。", back: [S2] }],
  },
];

export const H_SCI_PHY_KITAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 14,
  review: { status: "draft" },
  sections: [
    {
      title: "気体の法則と分子運動の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "boyle", type: "A", difficulty: 1, points: 16, seconds: 80, skill: "知識・技能", generate: boyle },
        { id: "joutai", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: joutai },
        { id: "naibu", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: naibu },
        { id: "sokudo", type: "A", difficulty: 3, points: 18, seconds: 120, skill: "思考・判断・表現", generate: sokudo },
      ],
    },
    { title: "分子運動のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
