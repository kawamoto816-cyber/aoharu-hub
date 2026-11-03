// 物理「光の干渉と回折」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: ヤングの実験 Δx＝Lλ/d、回折格子 d sinθ＝mλ、薄膜 (空気中・垂直入射) の明るい条件 2nd＝(m＋½)λ、
//   くさび形空気層の暗線の間隔 Δx＝λL/(2D) を calc に書き、scripts/check-moshi.ts がシード1〜100で答えと照合する。
//   nm・mm・μm の換算を式の中で行い、答えが小数第3位までで割り切れる組だけを使う (割り切れない組は引き直す)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-hikari";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "干渉の条件は経路差で決まる");
const S2 = L(2, "ヤングの実験：明線は等間隔に並ぶ");
const S3 = L(3, "回折格子：とても多くのスリット");
const S4 = L(4, "薄膜の干渉：反射の位相のずれを数える");
const S5 = L(5, "くさび形の空気層・ニュートンリング・反射防止膜");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const nice = (x: number) => Math.abs(x * 1000 - Math.round(x * 1000)) < 1e-6;

function young(r: Rng): QuestionBody {
  for (;;) {
    const lam = r.pick([400, 450, 500, 600, 640, 700]);
    const d = r.pick([0.1, 0.2, 0.25, 0.4, 0.5]);
    const Lm = r.pick([0.5, 1, 1.5, 2]);
    const dx = (Lm * lam) / d / 1000;
    if (!nice(dx)) continue;
    if (r.bool())
      return {
        prompt: `間隔 ${f(d)} mm の2つのスリットに波長 ${lam} nm の光を当て、${f(Lm)} m はなれたスクリーンに干渉じまをつくった。となり合う明線の間隔は何 mm ですか。`,
        answer: { kind: "num", answerKind: "num", answer: [f(dx)], unit: "mm", calc: `${Lm}*${lam}/${d}/1000` },
        point: "Δx＝Lλ/d",
        steps: [
          { title: "経路差", body: "スクリーン上の位置 x の点で、経路差は {{dx/L}}。これが mλ のとき明線。", back: [S1, S2] },
          { title: "単位をそろえて計算", body: `Δx＝${f(Lm)}×${lam}×10⁻⁹÷(${f(d)}×10⁻³)＝{{${f(dx)} mm}}。`, trap: "nm (10⁻⁹) と mm (10⁻³) の換算を忘れない。" },
        ],
      };
    return {
      prompt: `間隔 ${f(d)} mm の2つのスリットに単色光を当て、${f(Lm)} m はなれたスクリーンに干渉じまをつくったところ、となり合う明線の間隔が ${f(dx)} mm だった。光の波長は何 nm ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(lam)], unit: "nm", calc: `${f(dx)}*${d}/${Lm}*1000` },
      point: "λ＝dΔx/L",
      steps: [{ title: "式を変形", body: `λ＝dΔx/L＝${f(d)}×10⁻³×${f(dx)}×10⁻³÷${f(Lm)}＝{{${lam}}}×10⁻⁹ m。`, back: [S2] }],
    };
  }
}

function koushi(r: Rng): QuestionBody {
  for (;;) {
    const N = r.pick([100, 200, 250, 400, 500]);
    const dnm = 1e6 / N;
    const lam = r.pick([400, 500, 600, 625]);
    const m = r.pick([1, 2, 3]);
    const s = (m * lam) / dnm;
    if (s >= 1 || !nice(s)) continue;
    if (r.bool())
      return {
        prompt: `1 mm あたり ${N} 本の溝がある回折格子に、波長 ${lam} nm の光を垂直に当てた。${m} 次の明線が見える方向と格子の法線とのなす角を θ とするとき、sinθ の値はいくらですか。`,
        answer: { kind: "num", answerKind: "num", answer: [f(s)], calc: `${m}*${lam}/(1000000/${N})` },
        point: "d sinθ＝mλ、d＝1 mm/(本数)",
        steps: [
          { title: "格子定数", body: `d＝1 mm÷${N}＝{{${f(dnm)} nm}}。`, back: [S3] },
          { title: "sinθ", body: `sinθ＝mλ/d＝${m}×${lam}÷${f(dnm)}＝{{${f(s)}}}。`, trap: "溝の本数をそのまま d にしない。d は溝の間隔。" },
        ],
      };
    return {
      prompt: `1 mm あたり ${N} 本の溝がある回折格子に単色光を垂直に当てたところ、${m} 次の明線が sinθ＝${f(s)} の方向に見えた。光の波長は何 nm ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(lam)], unit: "nm", calc: `(1000000/${N})*${f(s)}/${m}` },
      point: "λ＝d sinθ/m",
      steps: [
        { title: "格子定数", body: `d＝{{${f(dnm)} nm}}。`, back: [S3] },
        { title: "波長", body: `λ＝${f(dnm)}×${f(s)}÷${m}＝{{${lam}}} nm。` },
      ],
    };
  }
}

function makuhaku(r: Rng): QuestionBody {
  for (;;) {
    const n = r.pick([1.25, 1.5, 1.6, 2]);
    const lam = r.pick([400, 480, 500, 600, 640]);
    const d = lam / (4 * n);
    if (!nice(d)) continue;
    const film = "薄い透明な膜";
    if (r.bool())
      return {
        prompt: `空気中にある屈折率 ${f(n)} の${film}に、波長 ${lam} nm の光を垂直に当てた。反射光が強め合うような膜の厚さのうち、最も薄いものは何 nm ですか。`,
        answer: { kind: "num", answerKind: "num", answer: [f(d)], unit: "nm", calc: `${lam}/(4*${n})` },
        point: "上面だけで反射の位相が π ずれる → 2nd＝(m＋½)λ",
        steps: [
          { title: "反射のずれを数える", body: "膜の上面 (空気→膜) の反射は位相が π ずれ、下面 (膜→空気) の反射はずれない。1回ずれるので条件が入れかわる。", back: [S4] },
          { title: "最も薄い厚さ", body: `強め合い：{{2nd＝(m＋½)λ}}。m＝0 で d＝λ/(4n)＝${lam}÷${f(4 * n)}＝{{${f(d)}}} nm。`, trap: "光路差は 2d ではなく、屈折率を掛けた 2nd。" },
        ],
      };
    return {
      prompt: `空気中にある屈折率 ${f(n)} の${film}に、波長 ${lam} nm の光を垂直に当てた。反射光が弱め合うような膜の厚さのうち、0 でない最も薄いものは何 nm ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(2 * d)], unit: "nm", calc: `${lam}/(2*${n})` },
      point: "反射のずれ1回 → 弱め合いは 2nd＝mλ",
      steps: [
        { title: "反射のずれ", body: "上面の反射だけ位相が π ずれるので、弱め合いは {{2nd＝mλ}}。", back: [S4] },
        { title: "m＝1", body: `d＝λ/(2n)＝${lam}÷${f(2 * n)}＝{{${f(2 * d)}}} nm。`, trap: "m＝0 (厚さ 0) は答えにしない。" },
      ],
    };
  }
}

function kusabi(r: Rng): QuestionBody {
  for (;;) {
    const lam = r.pick([400, 500, 600, 640]);
    const Lmm = r.pick([50, 80, 100, 120, 150]);
    const D = r.pick([0.02, 0.025, 0.03, 0.04, 0.05]);
    const dx = (lam * Lmm) / (2 * D) / 1e6;
    if (!nice(dx)) continue;
    return {
      prompt: `2枚の平面ガラスを重ね、一端から ${Lmm} mm はなれた所に厚さ ${f(D)} mm の薄い紙をはさんで、くさび形の空気層をつくった。真上から波長 ${lam} nm の光を当てて上から見ると、明暗のしまが見えた。となり合う暗線の間隔は何 mm ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(dx)], unit: "mm", calc: `${lam}*${Lmm}/(2*${D})/1000000` },
      point: "空気層の厚さが λ/2 ふえるごとに次のしま",
      steps: [
        { title: "となりのしまの条件", body: `往復で経路差 2d。となりの暗線では {{2Δd＝λ}}、つまり厚さが λ/2 だけちがう。`, back: [S5] },
        { title: "相似で間隔へ", body: `Δd/Δx＝D/L より Δx＝λL/(2D)＝${lam}×10⁻⁶ mm×${Lmm}÷(2×${f(D)})＝{{${f(dx)}}} mm。`, trap: "λ/2 ではなく λ にすると間隔が2倍になる。" },
      ],
    };
  }
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("joken", 1),
    prompt: "同じ位相の2つの光源からの光がある点で重なるとき、その点が明るくなる（強め合う）条件はどれですか。m＝0, 1, 2, … とする。",
    answer: {
      kind: "choice",
      options: ["経路差が mλ", "経路差が (m＋½)λ", "経路差が mλ/4", "経路差が 0 のときだけ"],
      correct: 0,
      why: ["正しい。山と山が重なる。", "これは弱め合う (暗い) 条件。", "λ/4 ずれでは、強め合いにも弱め合いにもならない。", "0 だけでなく、λ・2λ… でも強め合う。"],
    },
    point: "同位相の光源：経路差 mλ で明、(m＋½)λ で暗",
    steps: [{ title: "波長の何倍か", body: "経路差が{{波長の整数倍}}なら山と山がそろって明るい。半端 (½ ずれ) なら打ち消す。", back: [S1] }],
  },
  {
    ...base("hansha-iso", 1),
    prompt: "光が屈折率の小さい媒質から大きい媒質へ進もうとして、境界で反射するとき、反射光について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["位相が π (半波長分) ずれる", "位相は変わらない", "波長が半分になる", "振動数が変わる"],
      correct: 0,
      why: ["正しい。固定端反射と同じ扱い。", "位相が変わらないのは、大きい媒質から小さい媒質へ向かうときの反射。", "反射で波長は変わらない。", "反射で振動数は変わらない。"],
    },
    point: "小→大の境界での反射は π ずれ (固定端)",
    steps: [{ title: "固定端と自由端", body: "屈折率の大きい媒質との境界は{{固定端}}のようにはたらき、位相が π ずれる。", back: [S4] }],
  },
  {
    ...base("young-change", 2, "思考・判断・表現"),
    prompt: "ヤングの実験で、装置全体を水 (屈折率 1.33) の中に入れた。明線の間隔はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["せまくなる", "広くなる", "変わらない", "しまが消える"],
      correct: 0,
      why: ["正しい。水中では波長が λ/n に短くなり、Δx＝Lλ/d も小さくなる。", "波長が短くなるので、間隔は小さくなる。", "波長が変わるので、間隔も変わる。", "干渉は水中でも起こる。"],
    },
    point: "媒質中の波長は λ/n",
    steps: [{ title: "波長が縮む", body: "屈折率 n の中で光の波長は {{λ/n}}。Δx＝Lλ/d なので間隔も 1/n 倍になる。", back: [S2] }],
  },
  {
    ...base("hakushoku", 2, "思考・判断・表現"),
    prompt: "回折格子に白色光を当てると、1次の明線は色づいて広がって見える。中央 (0次) から最も遠い側に見える色はどれですか。",
    answer: {
      kind: "choice",
      options: ["赤", "紫", "緑", "どの色も同じ位置"],
      correct: 0,
      why: ["正しい。d sinθ＝λ より、波長が長いほど θ が大きい。", "紫は波長が短く、中央に近い側。", "緑は赤と紫の間。", "波長ごとに角度がちがうので分かれる。"],
    },
    point: "波長が長いほど大きく曲がる (sinθ＝mλ/d)",
    steps: [{ title: "sinθ∝λ", body: "1次では sinθ＝λ/d。波長の長い{{赤}}が最も外側、紫が最も内側。0次は白のまま。", back: [S3] }],
  },
];

export const H_SCI_PHY_HIKARI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 15,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "光の干渉の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "young", type: "A", difficulty: 1, points: 16, seconds: 80, skill: "知識・技能", generate: young },
        { id: "koushi", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: koushi },
        { id: "makuhaku", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: makuhaku },
        { id: "kusabi", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: kusabi },
      ],
    },
    { title: "光の干渉のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
