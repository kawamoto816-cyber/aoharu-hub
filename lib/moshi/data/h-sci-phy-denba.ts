// 物理「電場と電位」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: クーロンの法則 F＝kq₁q₂/r² (k＝9.0×10⁹ N·m²/C²、μC は ×10⁻⁶)、一様な電場 E＝V/d・F＝qE、
//   電場がする仕事 W＝q(V_A−V_B)、点電荷の電位 V＝kQ/r と重ね合わせを calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。10 の累乗は式の中で数にして、答えが割り切れる組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-denba";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "静電気力とクーロンの法則");
const S2 = L(2, "電場：+1 C が受ける力");
const S3 = L(3, "電位：+1 C がもつ位置エネルギー");
const S4 = L(4, "点電荷の電場と電位をくらべる");
const S5 = L(5, "電場がする仕事は「電荷×電位差」");
const S6 = L(6, "導体と不導体：静電誘導と静電遮蔽");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const nice = (x: number) => Math.abs(x * 1000 - Math.round(x * 1000)) < 1e-6;

function coulomb(r: Rng): QuestionBody {
  for (;;) {
    const q1 = r.int(1, 6);
    const q2 = r.int(1, 6);
    const d = r.pick([0.1, 0.2, 0.3, 0.5, 0.6]);
    const F = (9 * q1 * q2) / 1000 / (d * d);
    if (!nice(F)) continue;
    const same = r.bool();
    return {
      prompt: `真空中で、${same ? `+${q1}.0×10⁻⁶ C と +${q2}.0×10⁻⁶ C` : `+${q1}.0×10⁻⁶ C と −${q2}.0×10⁻⁶ C`} の小さな帯電体を ${f(d)} m はなして置いた。2つの間にはたらく静電気力の大きさは何 N ですか。クーロンの法則の比例定数を 9.0×10⁹ N·m²/C² とする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(F)], unit: "N", calc: `9*${q1}*${q2}/1000/${d}^2` },
      point: "F＝kq₁q₂/r²",
      steps: [
        { title: "代入", body: `F＝9.0×10⁹×${q1}×10⁻⁶×${q2}×10⁻⁶÷${f(d)}²＝{{${f(F)}}} N。`, back: [S1] },
        { title: "向き", body: same ? "同符号なので {{退け合う}}。" : "異符号なので {{引き合う}}。大きさに符号はつけない。", trap: "距離の2乗で割るのを忘れない。" },
      ],
    };
  }
}

function itiyou(r: Rng): QuestionBody {
  const V = r.pick([50, 100, 150, 200, 300, 600]);
  const dcm = r.pick([1, 2, 2.5, 4, 5]);
  const E = V / (dcm / 100);
  if (r.bool())
    return {
      prompt: `間隔 ${f(dcm)} cm で平行に置いた2枚の金属板の間に ${V} V の電圧を加えた。板の間にできる一様な電場の強さは何 V/m ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(E)], unit: "V/m", calc: `${V}/(${dcm}/100)` },
      point: "一様な電場：V＝Ed",
      steps: [{ title: "E＝V/d", body: `d＝${f(dcm / 100)} m に直して、E＝${V}÷${f(dcm / 100)}＝{{${f(E)}}} V/m。`, back: [S2, S3], trap: "cm のまま割ると 100 倍ずれる。" }],
    };
  const q = r.int(1, 5);
  const F = (q * E) / 1000;
  return {
    prompt: `間隔 ${f(dcm)} cm で平行に置いた2枚の金属板の間に ${V} V の電圧を加えた。板の間に置いた +${q}.0×10⁻⁶ C の電荷が電場から受ける力の大きさは何 mN ですか (1 mN＝1×10⁻³ N)。`,
    answer: { kind: "num", answerKind: "num", answer: [f(F)], unit: "mN", calc: `${q}*${V}/(${dcm}/100)/1000` },
    point: "E＝V/d、F＝qE",
    steps: [
      { title: "電場", body: `E＝${V}÷${f(dcm / 100)}＝{{${f(E)} V/m}}。`, back: [S2, S3] },
      { title: "力", body: `F＝qE＝${q}×10⁻⁶×${f(E)}＝{{${f(F)}}}×10⁻³ N。`, back: [S2] },
    ],
  };
}

function shigoto(r: Rng): QuestionBody {
  const VA = r.pick([100, 200, 300, 400, 500]);
  const VB = r.pick([-100, 0, 50, 100, 150]);
  const q = r.int(1, 5);
  const W = q * (VA - VB);
  const elec = r.bool();
  if (elec) {
    const dV = r.pick([100, 200, 300, 500]);
    return {
      prompt: `静止していた電子を、電位差 ${dV} V で加速した。電子が得た運動エネルギーは何 J ですか。電気素量を 1.6×10⁻¹⁹ C とし、答えは「□×10⁻¹⁷」の □ の数で答えなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [f(0.016 * dV)], unit: "×10⁻¹⁷ J", calc: `1.6*${dV}/100` },
      point: "電場がする仕事 W＝qV＝eV",
      steps: [{ title: "W＝eV", body: `1.6×10⁻¹⁹×${dV}＝${f(1.6 * dV)}×10⁻¹⁹＝{{${f(0.016 * dV)}×10⁻¹⁷}} J。これがそのまま運動エネルギーになる。`, back: [S5] }],
    };
  }
  return {
    prompt: `電位 ${VA} V の点 A から電位 ${String(VB).replace("-", "−")} V の点 B まで、+${q}.0×10⁻⁶ C の電荷が電場の力で動いた。この間に電場が電荷にした仕事は何 μJ ですか (1 μJ＝1×10⁻⁶ J)。`,
    answer: { kind: "num", answerKind: "num", answer: [String(W)], unit: "μJ", calc: `${q}*(${VA}-(${VB}))` },
    point: "W＝q(V_A−V_B)：道すじによらない",
    steps: [
      { title: "電位差", body: `V_A−V_B＝${VA}−(${String(VB).replace("-", "−")})＝{{${VA - VB} V}}。`, back: [S3] },
      { title: "仕事", body: `W＝${q}×10⁻⁶×${VA - VB}＝{{${W}}}×10⁻⁶ J。坂を下るボールと同じで、高い電位から低い電位へ動くと正の仕事。`, back: [S5] },
    ],
  };
}

function tenden(r: Rng): QuestionBody {
  for (;;) {
    const Q = r.int(1, 5);
    const d = r.pick([0.1, 0.2, 0.3, 0.6, 0.9]);
    const kind = r.pick(["E", "V", "mid"] as const);
    if (kind === "E") {
      const E = (9000 * Q) / (d * d);
      if (!nice(E)) continue;
      return {
        prompt: `真空中に +${Q}.0×10⁻⁶ C の点電荷がある。点電荷から ${f(d)} m はなれた点の電場の強さは何 V/m ですか。クーロンの法則の比例定数を 9.0×10⁹ N·m²/C² とする。`,
        answer: { kind: "num", answerKind: "num", answer: [f(E)], unit: "V/m", calc: `9000*${Q}/${d}^2` },
        point: "点電荷の電場 E＝kQ/r²",
        steps: [{ title: "E＝kQ/r²", body: `9.0×10⁹×${Q}×10⁻⁶÷${f(d)}²＝{{${f(E)}}} V/m。向きは電荷から遠ざかる向き。`, back: [S2, S4] }],
      };
    }
    if (kind === "V") {
      const V = (9000 * Q) / d;
      if (!nice(V)) continue;
      return {
        prompt: `真空中に +${Q}.0×10⁻⁶ C の点電荷がある。点電荷から ${f(d)} m はなれた点の電位は何 V ですか。無限遠を電位の基準とし、クーロンの法則の比例定数を 9.0×10⁹ N·m²/C² とする。`,
        answer: { kind: "num", answerKind: "num", answer: [f(V)], unit: "V", calc: `9000*${Q}/${d}` },
        point: "点電荷の電位 V＝kQ/r (r は1乗)",
        steps: [{ title: "V＝kQ/r", body: `9.0×10⁹×${Q}×10⁻⁶÷${f(d)}＝{{${f(V)}}} V。`, back: [S3, S4], trap: "電場の式と混ぜて r² で割らない。" }],
      };
    }
    const Q2 = r.int(1, 5);
    const neg = r.bool();
    const V = (9000 * (Q + (neg ? -Q2 : Q2))) / (d / 2);
    if (!nice(V) || (neg && Q === Q2)) continue;
    return {
      prompt: `真空中で、+${Q}.0×10⁻⁶ C の点電荷 A と ${neg ? "−" : "+"}${Q2}.0×10⁻⁶ C の点電荷 B を ${f(d)} m はなして置いた。AB の中点の電位は何 V ですか。無限遠を電位の基準とし、クーロンの法則の比例定数を 9.0×10⁹ N·m²/C² とする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(V)], unit: "V", calc: `9000*${Q}/(${d}/2)+9000*(${neg ? -Q2 : Q2})/(${d}/2)` },
      point: "電位はスカラー：符号つきでそのまま足す",
      steps: [
        { title: "それぞれの電位", body: `中点までは ${f(d / 2)} m。A による電位 ${f((9000 * Q) / (d / 2))} V、B による電位 ${neg ? "−" : ""}${f((9000 * Q2) / (d / 2))} V。`, back: [S4] },
        { title: "足す", body: `V＝{{${f(V)}}} V。電場とちがい、向きを考えずに足せる。`, back: [S3] },
      ],
    };
  }
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("denba-muki", 1),
    prompt: "電場の向きの決め方として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["その点に置いた正の電荷が受ける力の向き", "その点に置いた負の電荷が受ける力の向き", "電位が高くなる向き", "電気力線に垂直な向き"],
      correct: 0,
      why: ["正しい。+1 C が受ける力が電場。", "負の電荷は電場と逆向きの力を受ける。", "電場は電位が低くなる向きを向く。", "電場は電気力線の接線の向き。垂直なのは等電位面。"],
    },
    point: "電場＝+1 C が受ける力",
    steps: [{ title: "定義", body: "電場 E は{{正の電荷 +1 C が受ける力}}。向きは高い電位から低い電位へ。", back: [S2] }],
  },
  {
    ...base("touden", 1),
    prompt: "等電位面 (等電位線) と電気力線の関係として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["つねに垂直に交わる", "つねに平行になる", "45° で交わる", "交わることはない"],
      correct: 0,
      why: ["正しい。等電位面に沿って動かしても仕事は 0 なので、力 (電場) は面に垂直。", "平行なら、面に沿って動くと電位が変わってしまう。", "角度は決まって垂直。", "電気力線は等電位面をつらぬく。"],
    },
    point: "電気力線⊥等電位面",
    steps: [{ title: "仕事が 0", body: "等電位面上の移動では W＝qΔV＝0。だから電場は{{等電位面に垂直}}。", back: [S3, S5] }],
  },
  {
    ...base("shaheki", 2, "思考・判断・表現"),
    prompt: "電場の中に中空の金属球を置いた。金属球の内側の空間について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["表面に誘導された電荷の電場が外の電場を打ち消し、内側の電場は 0 になる", "外の電場がそのまま内側に入りこむ", "内側の電場は外の2倍になる", "金属に電流が流れ続けて、内側が熱くなる"],
      correct: 0,
      why: ["正しい。これが静電遮蔽。", "金属が電場をさえぎる。", "強め合うことはない。", "電荷が並び終わると電流は止まる。"],
    },
    point: "導体の内部は電場 0 (静電遮蔽)",
    steps: [{ title: "自由電子が動く", body: "自由電子が移動して表面に電荷が現れ、{{内部の電場が 0}} になったところで止まる。", back: [S6] }],
  },
  {
    ...base("hikaku", 2, "思考・判断・表現"),
    prompt: "正の点電荷からの距離を2倍にすると、その点の電場の強さと電位はそれぞれ何倍になりますか。",
    answer: {
      kind: "choice",
      options: ["電場は 1/4 倍、電位は 1/2 倍", "電場も電位も 1/4 倍", "電場は 1/2 倍、電位は 1/4 倍", "電場も電位も 1/2 倍"],
      correct: 0,
      why: ["正しい。E＝kQ/r²、V＝kQ/r。", "電位は r の1乗に反比例。", "逆になっている。", "電場は r² に反比例。"],
    },
    point: "E∝1/r²、V∝1/r",
    steps: [{ title: "式をくらべる", body: "{{E＝kQ/r²}}、{{V＝kQ/r}}。r が2倍なら E は 1/4、V は 1/2。", back: [S4] }],
  },
];

export const H_SCI_PHY_DENBA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 14,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "電場と電位の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "coulomb", type: "A", difficulty: 1, points: 16, seconds: 80, skill: "知識・技能", generate: coulomb },
        { id: "itiyou", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: itiyou },
        { id: "shigoto", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "思考・判断・表現", generate: shigoto },
        { id: "tenden", type: "A", difficulty: 3, points: 18, seconds: 130, skill: "思考・判断・表現", generate: tenden },
      ],
    },
    { title: "電場と電位のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
