// 物理「電流と磁場」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: ソレノイド H＝nI・円形電流の中心 H＝I/(2r)、電流が磁場から受ける力 F＝IBL (斜めなら IBL sinθ)、
//   ローレンツ力 f＝qvB と円運動の半径 r＝mv/(qB)、平行電流の力 F/L＝μ₀I₁I₂/(2πr)＝2×10⁻⁷·I₁I₂/r を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。π が答えに残らない式だけを使い、割り切れない組は引き直す。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-jiba";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "直線電流の磁場 H＝I/(2πr) のわけ");
const S2 = L(2, "電流の形で変わる3つの式");
const S3 = L(3, "F＝IBL は電子1個の力 qvB の合計");
const S4 = L(4, "平行電流の力、モーターとスピーカー");
const S5 = L(5, "ローレンツ力で荷電粒子は円をえがく");
const S6 = L(6, "磁場で粒子を加速し、選び分ける");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const nice = (x: number) => Math.abs(x * 1000 - Math.round(x * 1000)) < 1e-6;

function jiba(r: Rng): QuestionBody {
  for (;;) {
    const I = r.pick([0.5, 1, 2, 2.5, 4, 5]);
    if (r.bool()) {
      const N = r.pick([100, 200, 300, 500, 1000]);
      const len = r.pick([0.1, 0.2, 0.25, 0.4, 0.5]);
      const H = (N / len) * I;
      if (!nice(H)) continue;
      return {
        prompt: `長さ ${f(len)} m、巻数 ${N} 回のソレノイドに ${f(I)} A の電流を流した。ソレノイドの内部の磁場の強さは何 A/m ですか。`,
        answer: { kind: "num", answerKind: "num", answer: [f(H)], unit: "A/m", calc: `${N}/${len}*${I}` },
        point: "ソレノイド：H＝nI (n は 1 m あたりの巻数)",
        steps: [
          { title: "1 m あたりの巻数", body: `n＝${N}÷${f(len)}＝{{${f(N / len)} 回/m}}。`, back: [S2] },
          { title: "H＝nI", body: `H＝${f(N / len)}×${f(I)}＝{{${f(H)}}} A/m。`, trap: "全体の巻数 N をそのまま使わない。" },
        ],
      };
    }
    const rad = r.pick([0.05, 0.1, 0.2, 0.25]);
    const N = r.pick([1, 10, 20, 50]);
    const H = (N * I) / (2 * rad);
    if (!nice(H)) continue;
    return {
      prompt: `半径 ${f(rad)} m の円形${N === 1 ? "の導線" : `に ${N} 回巻いたコイル`}に ${f(I)} A の電流を流した。円の中心の磁場の強さは何 A/m ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(H)], unit: "A/m", calc: `${N}*${I}/(2*${rad})` },
      point: "円形電流の中心：H＝I/(2r) (N 回巻きなら N 倍)",
      steps: [{ title: "H＝NI/(2r)", body: `H＝${N}×${f(I)}÷(2×${f(rad)})＝{{${f(H)}}} A/m。`, back: [S2], trap: "直線電流の式 I/(2πr) と混ぜない。" }],
    };
  }
}

function ibl(r: Rng): QuestionBody {
  const I = r.pick([1, 2, 3, 4, 5]);
  const B = r.pick([0.1, 0.2, 0.4, 0.5, 0.8]);
  const len = r.pick([0.1, 0.2, 0.4, 0.5]);
  const slant = r.bool();
  const F = I * B * len * (slant ? 0.5 : 1);
  return {
    prompt: `磁束密度 ${f(B)} T の一様な磁場の中で、長さ ${f(len)} m のまっすぐな導線を磁場の向きと ${slant ? "30° の角をなす" : "垂直な"}向きに置き、${I} A の電流を流した。導線が磁場から受ける力の大きさは何 N ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(F)], unit: "N", calc: slant ? `${I}*${B}*${len}*(1/2)` : `${I}*${B}*${len}` },
    point: slant ? "F＝IBL sinθ：磁場に垂直な成分だけが効く" : "F＝IBL",
    steps: [
      { title: "F＝IBL", body: slant ? `電流の磁場に垂直な成分は I sin30°。F＝${I}×${f(B)}×${f(len)}×½＝{{${f(F)}}} N。` : `F＝${I}×${f(B)}×${f(len)}＝{{${f(F)}}} N。`, back: [S3], trap: slant ? "磁場と平行な成分は力を受けない。" : undefined },
      { title: "向き", body: "力の向きは電流と磁場の両方に垂直 (フレミングの左手の法則)。", back: [S4] },
    ],
  };
}

function lorentz(r: Rng): QuestionBody {
  for (;;) {
    const v = r.pick([1, 2, 3, 4, 5]);
    const B = r.pick([0.05, 0.1, 0.2, 0.25, 0.5]);
    const head = `質量 1.6×10⁻²⁷ kg、電気量 +1.6×10⁻¹⁹ C の荷電粒子が、速さ ${v}.0×10⁶ m/s で、磁束密度 ${f(B)} T の一様な磁場に垂直に入った。`;
    if (r.bool()) {
      const rad = (v * 0.01) / B;
      if (!nice(rad)) continue;
      return {
        prompt: `${head}粒子がえがく円の半径は何 m ですか。重力は考えない。`,
        answer: { kind: "num", answerKind: "num", answer: [f(rad)], unit: "m", calc: `1.6*${v}/(1.6*${B})/100` },
        point: "qvB＝mv²/r → r＝mv/(qB)",
        steps: [
          { title: "向心力はローレンツ力", body: "ローレンツ力は速度に垂直なので、粒子は等速円運動。{{mv²/r＝qvB}}。", back: [S5] },
          { title: "r を求める", body: `r＝mv/(qB)＝1.6×10⁻²⁷×${v}×10⁶÷(1.6×10⁻¹⁹×${f(B)})＝{{${f(rad)}}} m。`, trap: "10 の累乗をまとめるとき、指数のたし引きをまちがえない。" },
        ],
      };
    }
    const F = 1.6 * v * B;
    if (!nice(F)) continue;
    return {
      prompt: `${head}粒子が受けるローレンツ力の大きさは何 N ですか。答えは「□×10⁻¹³」の □ の数で答えなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [f(F)], unit: "×10⁻¹³ N", calc: `1.6*${v}*${B}` },
      point: "ローレンツ力 f＝qvB",
      steps: [{ title: "f＝qvB", body: `1.6×10⁻¹⁹×${v}×10⁶×${f(B)}＝{{${f(F)}×10⁻¹³}} N。`, back: [S3, S5] }],
    };
  }
}

function heikou(r: Rng): QuestionBody {
  for (;;) {
    const I1 = r.pick([2, 4, 5, 10]);
    const I2 = r.pick([1, 2, 5, 10]);
    const d = r.pick([0.01, 0.02, 0.04, 0.05, 0.1]);
    const F = (2 * I1 * I2) / d / 100;
    if (!nice(F)) continue;
    const same = r.bool();
    return {
      prompt: `真空中で、${f(d)} m はなして平行に張った2本の長い導線に、${same ? "同じ" : "逆"}向きにそれぞれ ${I1} A と ${I2} A の電流を流した。導線 1 m あたりにはたらく力の大きさは何 N ですか。真空の透磁率を 4π×10⁻⁷ N/A² とし、答えは「□×10⁻⁵」の □ の数で答えなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [f(F)], unit: "×10⁻⁵ N", calc: `2*${I1}*${I2}/${d}/100` },
      point: `F/L＝μ₀I₁I₂/(2πr)。${same ? "同じ向きなら引き合う" : "逆向きなら退け合う"}`,
      steps: [
        { title: "一方がつくる磁場", body: `導線 1 の電流が導線 2 の位置につくる磁束密度は B＝μ₀I₁/(2πr)＝{{2×10⁻⁷×${I1}÷${f(d)}}} T。`, back: [S1] },
        { title: "力", body: `1 m あたり F＝I₂B＝2×10⁻⁷×${I1}×${I2}÷${f(d)}＝{{${f(F)}×10⁻⁵}} N。${same ? "引き合う" : "退け合う"}向き。`, back: [S4], trap: "4π×10⁻⁷÷2π＝2×10⁻⁷ と π を消す。" },
      ],
    };
  }
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("migineji", 1),
    prompt: "まっすぐな導線を流れる電流がつくる磁場について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["導線を中心とする同心円状で、向きは右ねじの回る向き", "電流と同じ向きにまっすぐ伸びる", "導線から放射状に外向き", "電流と逆向きにまっすぐ伸びる"],
      correct: 0,
      why: ["正しい。右ねじの進む向きが電流、回る向きが磁場。", "磁力線は電流のまわりを回る。", "磁力線は導線から出入りしない輪になる。", "向きは電流のまわりを回る向き。"],
    },
    point: "右ねじの法則：電流のまわりに同心円",
    steps: [{ title: "右ねじ", body: "電流の向きに右ねじを進めると、ねじの{{回る向き}}が磁場の向き。強さは距離に反比例。", back: [S1] }],
  },
  {
    ...base("heikou-muki", 1),
    prompt: "平行な2本の導線に、同じ向きに電流を流した。2本の導線の間にはたらく力について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["たがいに引き合う", "たがいに退け合う", "力ははたらかない", "導線に沿って同じ向きに押される"],
      correct: 0,
      why: ["正しい。一方の磁場から他方が受ける力は、相手に向かう向き。", "退け合うのは逆向きの電流のとき。", "それぞれの電流が磁場をつくるので、力がはたらく。", "力は導線に垂直な向き。"],
    },
    point: "同じ向き：引き合う、逆向き：退け合う",
    steps: [{ title: "左手の法則", body: "相手の位置での磁場の向きを右ねじで求め、フレミングの左手の法則を使うと{{相手に向かう力}}。", back: [S4] }],
  },
  {
    ...base("shigoto-zero", 2, "思考・判断・表現"),
    prompt: "一様な磁場の中で、荷電粒子がローレンツ力だけを受けて運動している。粒子の運動について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["ローレンツ力は速度につねに垂直なので仕事をせず、速さは変わらない", "ローレンツ力で加速され、速さはしだいに大きくなる", "ローレンツ力で減速され、やがて止まる", "粒子は磁場の向きに引き寄せられる"],
      correct: 0,
      why: ["正しい。力が速度に垂直なので、向きだけが変わる (等速円運動)。", "仕事をしないので運動エネルギーは変わらない。", "速さは一定のまま。", "力は磁場にも垂直。"],
    },
    point: "ローレンツ力は仕事をしない",
    steps: [{ title: "力と速度が垂直", body: "f＝qvB は {{速度に垂直}}。W＝0 なので速さは一定、向きだけが変わる。", back: [S5] }],
  },
  {
    ...base("hankei", 2, "思考・判断・表現"),
    prompt: "一様な磁場に垂直に入った荷電粒子が円運動している。粒子の速さを2倍にすると、円の半径と1周の時間はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["半径は2倍、1周の時間は変わらない", "半径は2倍、1周の時間も2倍", "半径は変わらず、1周の時間は 1/2", "半径は 1/2、1周の時間は変わらない"],
      correct: 0,
      why: ["正しい。r＝mv/(qB)、T＝2πr/v＝2πm/(qB)。", "円周も速さも2倍なので、時間は同じ。", "半径は速さに比例して変わる。", "速いほど大きな円になる。"],
    },
    point: "r∝v、周期 2πm/(qB) は速さによらない",
    steps: [{ title: "式で見る", body: "r＝mv/(qB) は v に比例、{{T＝2πm/(qB)}} は v を含まない。サイクロトロンはこの性質を使う。", back: [S5, S6] }],
  },
];

export const H_SCI_PHY_JIBA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 14,
  review: { status: "draft" },
  sections: [
    {
      title: "電流と磁場の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "jiba", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: jiba },
        { id: "ibl", type: "A", difficulty: 2, points: 17, seconds: 70, skill: "知識・技能", generate: ibl },
        { id: "lorentz", type: "A", difficulty: 2, points: 17, seconds: 110, skill: "思考・判断・表現", generate: lorentz },
        { id: "heikou", type: "A", difficulty: 3, points: 18, seconds: 140, skill: "思考・判断・表現", generate: heikou },
      ],
    },
    { title: "電流と磁場のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
