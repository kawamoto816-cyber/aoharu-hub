// 化学基礎「酸と塩基」の単元模試 (A: pH・電離度の生成型4問 ＋ B: プール4問から2問)。問題はすべてオリジナル。
// 検算: 濃度・電離度を 1.0×10⁻ⁿ の形で決め、[H⁺]＝濃度×電離度 (1価の酸) の指数のたし算で pH を作る。
//   calc は「指数のたし算」(pH) または「[H⁺] ÷ 濃度」(電離度) で、scripts/check-moshi.ts がシード1〜100で照合する。
//   うすめる問題は pH が7をこえない範囲 (pH5 まで) にしている。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chemb-san";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "酸と塩基の2つの定義");
const S2 = L(2, "H⁺ のやりとりで見る");
const S3 = L(3, "価数と強弱は別のもの");
const S4 = L(4, "pH は H⁺ の濃さを表す目もり");
const S5 = L(5, "pH を測る・身近な pH");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const SUP: Record<string, string> = { "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵" };
const e = (n: number) => `1.0×10⁻${SUP[String(n)]}`;

function kyosan(r: Rng): QuestionBody {
  const acid = r.pick(["塩酸 HCl", "硝酸 HNO₃"]);
  const p = r.int(1, 4);
  const V = r.pick([10, 50, 100, 200, 500]);
  return {
    prompt: `${e(p)} mol/L の${acid}（強酸・電離度1）${V} mL の pH を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(p)], calc: `${p}+0` },
    point: "[H⁺]＝1.0×10⁻ⁿ mol/L なら pH＝n",
    steps: [
      { title: "[H⁺] を求める", body: `1価の強酸はほぼ完全に電離するので [H⁺]＝${e(p)} mol/L。`, back: [S3] },
      { title: "pH に直す", body: `[H⁺]＝1.0×10⁻ⁿ のとき pH＝n なので {{pH＝${p}}}。`, trap: `体積 ${V} mL は関係ない。pH は濃さで決まり、量では決まらない。`, back: [S4] },
    ],
  };
}

function jakusan(r: Rng): QuestionBody {
  const p = r.int(1, 2);
  const q = r.int(1, 3);
  const name = r.pick(["ある1価の弱酸 HA", "1価の弱酸 HB"]);
  return {
    prompt: `${e(p)} mol/L の${name}の水溶液があります。この濃度での電離度が ${e(q)} のとき、水溶液の pH を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(p + q)], calc: `${p}+${q}` },
    point: "弱酸は [H⁺]＝濃度×電離度",
    steps: [
      { title: "[H⁺] を求める", body: `[H⁺]＝濃度×電離度＝${e(p)}×${e(q)}＝{{${e(p + q)} mol/L}}。`, back: [S4] },
      { title: "pH に直す", body: `{{pH＝${p + q}}}。`, trap: `電離度をかけ忘れて pH${p} にしない。弱酸は一部しか電離しない。`, back: [S3] },
    ],
  };
}

function usumeru(r: Rng): QuestionBody {
  const a = r.int(1, 3);
  const k = r.int(1, Math.min(2, 5 - a));
  const times = k === 1 ? 10 : 100;
  const V = r.pick([5, 10, 20]);
  return {
    prompt: `pH${a} の塩酸 ${V} mL に水を加えて、全体を ${V * times} mL にしました。この水溶液の pH を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a + k)], calc: `${a}+${k}` },
    point: "10倍にうすめるごとに pH は1大きくなる",
    steps: [
      { title: "何倍にうすめたか", body: `${V} mL → ${V * times} mL で {{${times}倍}}。[H⁺] は 1/${times} になります。`, back: [S4] },
      { title: "pH の変化", body: `[H⁺] が1/10になるごとに pH は1大きくなるので、${a}＋${k}＝{{pH${a + k}}}。`, trap: "酸をいくらうすめても pH は7をこえない（塩基性にはならない）。" },
    ],
  };
}

const DEN: [number, number][] = [];
for (const c of [0.01, 0.02, 0.05, 0.1, 0.2, 0.5]) for (const ph of [2, 3]) {
  const a = Math.pow(10, -ph) / c;
  if (a < 0.5 && Math.abs(a * 1000 - Math.round(a * 1000)) < 1e-6) DEN.push([c, ph]);
}

function denrido(r: Rng): QuestionBody {
  const [c, ph] = r.pick(DEN);
  const h = ph === 2 ? "1/100" : "1/1000";
  const a = f(Math.pow(10, -ph) / c);
  return {
    prompt: `${f(c)} mol/L の1価の弱酸の水溶液の pH を測ると ${ph} でした。この弱酸の電離度を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [a], calc: `${h}/${f(c)}` },
    point: "pH から [H⁺]、[H⁺]÷濃度＝電離度",
    steps: [
      { title: "pH から [H⁺]", body: `pH${ph} なので [H⁺]＝${e(ph)} mol/L＝${f(Math.pow(10, -ph))} mol/L。`, back: [S4] },
      { title: "電離度", body: `[H⁺]＝濃度×電離度 より、電離度＝${f(Math.pow(10, -ph))}÷${f(c)}＝{{${a}}}。`, trap: "電離度は1以下の数。濃度÷[H⁺] と逆にしない。", back: [S3] },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  {
    ...b("bronsted", 1),
    prompt: "ブレンステッド・ローリーの定義で、塩基とはどのような物質ですか。",
    answer: {
      kind: "choice",
      options: ["H⁺ を受けとる物質", "H⁺ を与える物質", "水にとけて H⁺ を出す物質", "電子を受けとる物質"],
      correct: 0,
      why: ["ブレンステッド・ローリーの定義では、H⁺ を受けとる物質が塩基。", "H⁺ を与えるのは酸。", "水にとけて H⁺ を出すのはアレニウスの定義の酸。", "電子の受けわたしは酸化還元の見方。"],
    },
    point: "H⁺ を与える＝酸、受けとる＝塩基",
    steps: [{ title: "定義を区別", body: "ブレンステッド・ローリーの定義では、H⁺ を{{与える}}物質が酸、{{受けとる}}物質が塩基です。", back: [S1] }],
  },
  {
    ...b("ketsueki", 1),
    prompt: "ヒトの血液の pH として最も近いものはどれですか。",
    answer: {
      kind: "choice",
      options: ["約7.4（弱い塩基性）", "約1〜2（強い酸性）", "約5.6（弱い酸性）", "約12（強い塩基性）"],
      correct: 0,
      why: ["血液は約7.4の弱い塩基性に保たれている。", "pH1〜2 は胃液。", "pH5.6 程度は二酸化炭素がとけた雨水。", "血液はそこまで強い塩基性ではない。"],
    },
    point: "血液は pH 約7.4",
    steps: [{ title: "身近な pH", body: "胃液は pH1〜2、{{血液は約7.4}}、雨水は約5.6。それより低い雨が酸性雨です。", back: [S5] }],
  },
  {
    ...b("nh3-h2o", 2, "思考・判断・表現"),
    prompt: "NH₃ ＋ H₂O ⇄ NH₄⁺ ＋ OH⁻ の反応（右向き）で、H₂O のはたらきとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["NH₃ に H⁺ を与えるので酸", "NH₃ から H⁺ を受けとるので塩基", "OH⁻ を受けとるので塩基", "H⁺ のやりとりにかかわらない"],
      correct: 0,
      why: ["H₂O が NH₃ に H⁺ を与えて OH⁻ になる。H⁺ を与えたので酸。", "H⁺ を受けとっているのは NH₃。", "H₂O は OH⁻ を受けとっていない。H⁺ を失って OH⁻ になった。", "H₂O は H⁺ を NH₃ にわたしている。"],
    },
    point: "水は相手によって酸にも塩基にもなる",
    steps: [{ title: "H⁺ の行き先", body: "H⁺ は {{H₂O → NH₃}} へ移ります。与えた H₂O が酸、受けとった NH₃ が塩基です。", back: [S2] }],
  },
  {
    ...b("kasu-kyojaku", 2, "思考・判断・表現"),
    prompt: "酸の強弱について正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["強弱は電離度で決まり、価数とは関係しない", "価数が大きい酸ほど強い", "H をたくさんふくむ酸ほど強い", "濃度が大きい酸ほど強い酸である"],
      correct: 0,
      why: ["強弱は水中で電離する割合（電離度）で決まる。", "リン酸 H₃PO₄ は3価だが弱い酸。", "酢酸 CH₃COOH は H を4個もつが1価の弱酸。", "濃度は量の話。同じ酸でも濃度を変えて強酸・弱酸が入れかわるわけではない。"],
    },
    point: "強弱は電離度、価数は出せる H⁺ の数",
    steps: [{ title: "2つを分ける", body: "{{価数}}は1分子が出せる H⁺ の数、{{強弱}}は電離する割合（電離度）。別のものです。", back: [S3] }],
  },
];

export const H_SCI_CHEMB_SAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学基礎",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "酸・塩基の定義と性質", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
    {
      title: "pH と電離度",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kyosan", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: kyosan },
        { id: "jakusan", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: jakusan },
        { id: "usumeru", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: usumeru },
        { id: "denrido", type: "A", difficulty: 3, points: 18, seconds: 120, skill: "思考・判断・表現", generate: denrido },
      ],
    },
  ],
};
