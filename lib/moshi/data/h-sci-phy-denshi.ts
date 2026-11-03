// 物理「電子と光（光電効果）」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: 光子のエネルギー E＝hν＝hc/λ (h＝6.6×10⁻³⁴ J·s、c＝3.0×10⁸ m/s)、光電効果 K₀＝hν−W・限界振動数 ν₀＝W/h、
//   阻止電圧 eV₀＝K₀、物質波 λ＝h/p、加速した電子のエネルギー eV (e＝1.6×10⁻¹⁹ C) を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。10 の累乗は「□×10ⁿ」の □ で答えさせ、式は □ どうしで書く。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-denshi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "電子の発見から粒子と波の二重性まで");
const S2 = L(2, "光電効果は「波」では説明できない");
const S3 = L(3, "光子1個のエネルギーの使い道");
const S4 = L(4, "光子は運動量ももつ：コンプトン効果");
const S5 = L(5, "電子も波になる：物質波 λ＝h/p");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const H = "プランク定数を 6.6×10⁻³⁴ J·s とする。";

function koushi(r: Rng): QuestionBody {
  if (r.bool()) {
    const nu = r.pick([4, 5, 6, 7.5, 8, 10, 12, 15]);
    const E = 0.66 * nu;
    return {
      prompt: `振動数 ${f(nu)}×10¹⁴ Hz の光の光子1個のエネルギーは何 J ですか。${H}答えは「□×10⁻¹⁹」の □ の数で答えなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [f(E)], unit: "×10⁻¹⁹ J", calc: `6.6*${nu}/10` },
      point: "E＝hν",
      steps: [{ title: "E＝hν", body: `6.6×10⁻³⁴×${f(nu)}×10¹⁴＝${f(6.6 * nu)}×10⁻²⁰＝{{${f(E)}×10⁻¹⁹}} J。`, back: [S3], trap: "10 の指数は −34＋14＝−20。" }],
    };
  }
  const lam = r.pick([300, 330, 360, 400, 450, 500, 600, 660]);
  const E = 1980 / lam;
  return {
    prompt: `真空中での波長が ${lam} nm の光の光子1個のエネルギーは何 J ですか。${H}光の速さを 3.0×10⁸ m/s とし、答えは「□×10⁻¹⁹」の □ の数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(E)], unit: "×10⁻¹⁹ J", calc: `6.6*3*100/${lam}` },
    point: "E＝hc/λ：波長が短いほど大きい",
    steps: [
      { title: "振動数に直す", body: `ν＝c/λ＝3.0×10⁸÷(${lam}×10⁻⁹)。`, back: [S3] },
      { title: "E＝hc/λ", body: `6.6×10⁻³⁴×3.0×10⁸÷(${lam}×10⁻⁹)＝{{${f(E)}×10⁻¹⁹}} J。`, trap: "nm の 10⁻⁹ を忘れない。" },
    ],
  };
}

function kodenkouka(r: Rng): QuestionBody {
  const kind = r.pick(["K", "nu0", "V0"] as const);
  if (kind === "V0") {
    const W = r.pick([1.9, 2.1, 2.3, 2.5, 4.3]);
    const Ep = W + r.pick([0.5, 1, 1.2, 1.5, 2, 2.5]);
    const K = Ep - W;
    return {
      prompt: `仕事関数 ${f(W)} eV の金属に、光子のエネルギーが ${f(Ep)} eV の光を当てた。光電子の運動エネルギーの最大値を 0 にするのに必要な阻止電圧は何 V ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(K)], unit: "V", calc: `${f(Ep)}-${W}` },
      point: "eV₀＝K₀＝hν−W",
      steps: [
        { title: "最大の運動エネルギー", body: `K₀＝hν−W＝${f(Ep)}−${f(W)}＝{{${f(K)} eV}}。`, back: [S3] },
        { title: "阻止電圧", body: `電圧 V₀ で減速すると電子は eV₀ のエネルギーを失う。eV₀＝K₀ より V₀＝{{${f(K)}}} V。`, trap: "単位 eV は「電子が 1 V で得るエネルギー」なので、数値がそのまま V になる。" },
      ],
    };
  }
  const k0 = r.pick([4, 5, 6, 8]);
  const W = 0.66 * k0;
  if (kind === "nu0")
    return {
      prompt: `仕事関数 ${f(W)}×10⁻¹⁹ J の金属の限界振動数は何 Hz ですか。${H}答えは「□×10¹⁴」の □ の数で答えなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(k0)], unit: "×10¹⁴ Hz", calc: `${f(W)}*10/6.6` },
      point: "限界振動数 ν₀＝W/h",
      steps: [{ title: "hν₀＝W", body: `光子のエネルギーがちょうど仕事関数になる振動数。ν₀＝${f(W)}×10⁻¹⁹÷(6.6×10⁻³⁴)＝{{${k0}×10¹⁴}} Hz。`, back: [S2, S3] }],
    };
  const nu = k0 + r.int(2, 8);
  const K = 0.66 * (nu - k0);
  return {
    prompt: `仕事関数 ${f(W)}×10⁻¹⁹ J の金属に、振動数 ${nu}×10¹⁴ Hz の光を当てた。飛び出す光電子の運動エネルギーの最大値は何 J ですか。${H}答えは「□×10⁻¹⁹」の □ の数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(K)], unit: "×10⁻¹⁹ J", calc: `6.6*${nu}/10-${f(W)}` },
    point: "K₀＝hν−W：光子1個のエネルギーの帳じり",
    steps: [
      { title: "光子のエネルギー", body: `hν＝6.6×10⁻³⁴×${nu}×10¹⁴＝{{${f(0.66 * nu)}×10⁻¹⁹ J}}。`, back: [S3] },
      { title: "差し引く", body: `K₀＝${f(0.66 * nu)}−${f(W)}＝{{${f(K)}}}×10⁻¹⁹ J。`, trap: "光の強さを上げても K₀ は変わらない。変わるのは振動数を変えたとき。" },
    ],
  };
}

function busshitsuha(r: Rng): QuestionBody {
  if (r.bool()) {
    const p = r.pick([1.1, 2.2, 3.3, 1.2, 2, 3, 4, 6]);
    const lam = 6.6 / p;
    return {
      prompt: `運動量の大きさが ${f(p)}×10⁻²⁴ kg·m/s の電子の物質波 (ド・ブロイ波) の波長は何 m ですか。${H}答えは「□×10⁻¹⁰」の □ の数で答えなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [f(lam)], unit: "×10⁻¹⁰ m", calc: `6.6/${p}` },
      point: "λ＝h/p",
      steps: [{ title: "λ＝h/p", body: `6.6×10⁻³⁴÷(${f(p)}×10⁻²⁴)＝{{${f(lam)}×10⁻¹⁰}} m。X 線と同じくらいの波長。`, back: [S5] }],
    };
  }
  const V = r.pick([100, 200, 300, 500]);
  const K = 0.016 * V;
  return {
    prompt: `静止していた電子を電圧 ${V} V で加速した。電子が得る運動エネルギーは何 J ですか。電気素量を 1.6×10⁻¹⁹ C とし、答えは「□×10⁻¹⁷」の □ の数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(K)], unit: "×10⁻¹⁷ J", calc: `1.6*${V}/100` },
    point: "電場がする仕事 eV が運動エネルギーに",
    steps: [{ title: "K＝eV", body: `K＝1.6×10⁻¹⁹×${V}＝{{${f(K)}×10⁻¹⁷}} J (${V} eV)。この電子の運動量 p＝√(2mK) から λ＝h/p が出る。`, back: [S1, S5] }],
  };
}

// グラフの2点から限界振動数を読む (K₀＝h(ν−ν₀))
function graph(r: Rng): QuestionBody {
  const k0 = r.pick([4, 5, 6, 7, 8]);
  const n1 = k0 + r.int(1, 4);
  const n2 = n1 + r.int(2, 6);
  const K1 = 0.66 * (n1 - k0);
  const K2 = 0.66 * (n2 - k0);
  const askW = r.bool();
  return {
    prompt: `ある金属に光を当てて、光電子の運動エネルギーの最大値 K₀ を測った。振動数 ${n1}×10¹⁴ Hz のとき K₀＝${f(K1)}×10⁻¹⁹ J、振動数 ${n2}×10¹⁴ Hz のとき K₀＝${f(K2)}×10⁻¹⁹ J だった。この金属の${askW ? "仕事関数は何 J ですか。答えは「□×10⁻¹⁹」の □ の数で" : "限界振動数は何 Hz ですか。答えは「□×10¹⁴」の □ の数で"}答えなさい。`,
    answer: askW
      ? { kind: "num", answerKind: "num", answer: [f(0.66 * k0)], unit: "×10⁻¹⁹ J", calc: `(${f(K2)}-${f(K1)})/(${n2}-${n1})*${n1}-${f(K1)}` }
      : { kind: "num", answerKind: "num", answer: [String(k0)], unit: "×10¹⁴ Hz", calc: `${n1}-${f(K1)}*(${n2}-${n1})/(${f(K2)}-${f(K1)})` },
    point: "K₀–ν グラフ：傾き h、横軸の切片 ν₀、縦軸の切片 −W",
    steps: [
      { title: "傾き", body: `傾き＝(${f(K2)}−${f(K1)})÷(${n2}−${n1})＝0.66 (×10⁻³³)。これが {{h＝6.6×10⁻³⁴ J·s}}。`, back: [S3] },
      { title: "直線をのばす", body: `K₀＝h(ν−ν₀) で K₀＝0 となる点が ν₀＝{{${k0}×10¹⁴ Hz}}。W＝hν₀＝{{${f(0.66 * k0)}×10⁻¹⁹ J}}。`, back: [S2, S3], trap: "測った点の振動数を限界振動数としない。直線を K₀＝0 までのばす。" },
    ],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("tsuyosa", 1, "思考・判断・表現"),
    prompt: "光電効果が起こっている金属に当てる光を、振動数はそのままで強く（明るく）した。正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["飛び出す光電子の数がふえるが、運動エネルギーの最大値は変わらない", "運動エネルギーの最大値が大きくなる", "光電子の数も運動エネルギーも変わらない", "光電子が出なくなる"],
      correct: 0,
      why: ["正しい。強い光は光子の数が多いだけで、1個のエネルギー hν は同じ。", "1個の電子は1個の光子からエネルギーをもらうので、K₀＝hν−W は変わらない。", "光子の数がふえるので、光電子の数 (光電流) はふえる。", "振動数が限界振動数より大きいままなので、光電子は出る。"],
    },
    point: "強さ→光子の数、振動数→光子1個のエネルギー",
    steps: [{ title: "光子で考える", body: "光の強さは{{光子の数}}、光子1個のエネルギーは {{hν}}。電子は光子1個ずつからエネルギーを受け取る。", back: [S2, S3] }],
  },
  {
    ...base("genkai", 1),
    prompt: "限界振動数より小さい振動数の光を金属に当てたとき、どうなりますか。",
    answer: {
      kind: "choice",
      options: ["どんなに強い光を長く当てても、光電子は飛び出さない", "光を強くすれば光電子が飛び出す", "しばらく当て続ければ光電子が飛び出す", "光電子は飛び出すが、運動エネルギーが小さい"],
      correct: 0,
      why: ["正しい。光子1個のエネルギー hν が仕事関数 W より小さいから。", "強くしても光子1個のエネルギーは変わらない。", "エネルギーをためこむことはなく、すぐ出るか出ないかのどちらか。", "hν＜W なので飛び出せない。"],
    },
    point: "hν＜W なら光電子は出ない",
    steps: [{ title: "1個のエネルギーが足りない", body: "光子1個のエネルギー hν が {{仕事関数 W に届かない}}と、電子は金属から出られない。", back: [S2] }],
  },
  {
    ...base("compton", 2),
    prompt: "物質に X 線を当てると、散乱された X 線の中に、もとより波長の長いものがふくまれる (コンプトン効果)。この理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["X 線の光子が電子と衝突してエネルギーと運動量の一部を電子にわたすから", "X 線が物質の中で速さを落とすから", "X 線が電子からエネルギーをもらうから", "散乱された X 線は振動数が上がるから"],
      correct: 0,
      why: ["正しい。光子のエネルギー hc/λ が減るので、波長が長くなる。", "散乱された X 線は空気中を光速で進む。", "エネルギーをもらうと波長は短くなるはず。", "波長が長くなるので、振動数は下がる。"],
    },
    point: "光子も運動量 h/λ をもち、電子と衝突する",
    steps: [{ title: "粒子どうしの衝突", body: "光子 (運動量 h/λ) が電子をはね飛ばし、{{エネルギーを失う}}ので波長がのびる。", back: [S4] }],
  },
  {
    ...base("niju", 2, "思考・判断・表現"),
    prompt: "電子線を結晶に当てると、X 線と同じような回折模様が現れる。このことからわかることとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["電子のような粒子も波の性質をもつ", "電子は電荷をもたない", "電子線は電磁波の一種である", "結晶の中で電子が光に変わる"],
      correct: 0,
      why: ["正しい。物質波 λ＝h/p が回折を起こす。", "電子は電荷 −e をもつ。", "電子線は電子の流れで、電磁波ではない。", "電子は電子のまま回折する。"],
    },
    point: "粒子も波としてふるまう (粒子と波の二重性)",
    steps: [{ title: "物質波", body: "運動量 p の粒子は {{波長 h/p の波}}の性質をもつ。電子の波長は結晶の原子の間隔に近く、回折が起こる。", back: [S1, S5] }],
  },
];

export const H_SCI_PHY_DENSHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 15,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "光子と電子の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "koushi", type: "A", difficulty: 1, points: 16, seconds: 70, skill: "知識・技能", generate: koushi },
        { id: "kodenkouka", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: kodenkouka },
        { id: "busshitsuha", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: busshitsuha },
        { id: "graph", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: graph },
      ],
    },
    { title: "光の粒子性と電子の波動性", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
