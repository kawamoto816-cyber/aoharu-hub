// 化学基礎「中和反応と塩」の単元模試 (A: 中和の量的関係の生成型4問 ＋ B: プール4問から2問)。問題はすべてオリジナル。
// 検算: 「価数×濃度×体積」が酸と塩基で等しい式から、先に答え (体積・濃度) を決め、滴下量が 5〜50 mL・小数第2位までになる組だけを表にする。
//   calc を scripts/check-moshi.ts がシード1〜100で計算して照合する。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chemb-chuwa";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "中和は H⁺ ＋ OH⁻ → H₂O");
const S2 = L(2, "ちょうど中和：H⁺ の mol ＝ OH⁻ の mol");
const S3 = L(3, "中和滴定と指示薬の選び方");
const S4 = L(4, "塩の水溶液は中性とはかぎらない");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const nice = (x: number, lo: number, hi: number) => x >= lo && x <= hi && Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;

/** [酸の濃度, 酸の体積, 塩基の濃度] で、塩基の体積が 5〜50 mL */
function combos(val: number): [number, number, number][] {
  const out: [number, number, number][] = [];
  for (const c1 of [0.05, 0.1, 0.15, 0.2]) for (const V1 of [10, 20, 25]) for (const c2 of [0.05, 0.1, 0.2, 0.25]) if (nice((val * c1 * V1) / c2, 5, 50)) out.push([c1, V1, c2]);
  return out;
}
const C1 = combos(1);
const C2 = combos(2);

function enzan(r: Rng): QuestionBody {
  const [c1, V1, c2] = r.pick(C1);
  const acid = r.pick(["塩酸 HCl", "硝酸 HNO₃"]);
  const base = r.pick(["水酸化ナトリウム NaOH", "水酸化カリウム KOH"]);
  const V2 = f((c1 * V1) / c2);
  return {
    prompt: `${f(c1)} mol/L の${acid} ${V1} mL をちょうど中和するのに必要な ${f(c2)} mol/L の${base}水溶液は何 mL ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [V2], unit: "mL", calc: `${f(c1)}*${V1}/${f(c2)}` },
    point: "価数×濃度×体積 が等しい",
    steps: [
      { title: "式を立てる", body: `どちらも1価。1×${f(c1)}×${V1} ＝ 1×${f(c2)}×V。`, back: [S2] },
      { title: "解く", body: `V ＝ {{${V2} mL}}。`, trap: "体積は両辺とも mL のままでよい（両辺で同じ単位なら1000でわる必要はない）。" },
    ],
  };
}

function ryusan(r: Rng): QuestionBody {
  const [c1, V1, c2] = r.pick(C2);
  const V2 = f((2 * c1 * V1) / c2);
  return {
    prompt: `${f(c1)} mol/L の硫酸 H₂SO₄ ${V1} mL をちょうど中和するのに必要な ${f(c2)} mol/L の水酸化ナトリウム NaOH 水溶液は何 mL ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [V2], unit: "mL", calc: `2*${f(c1)}*${V1}/${f(c2)}` },
    point: "硫酸は2価。価数をかけ忘れない",
    steps: [
      { title: "価数を確かめる", body: "H₂SO₄ は {{2価}}の酸、NaOH は1価の塩基です。", back: [S1] },
      { title: "式を立てて解く", body: `2×${f(c1)}×${V1} ＝ 1×${f(c2)}×V より V ＝ {{${V2} mL}}。`, trap: `価数をかけ忘れると ${f((c1 * V1) / c2)} mL と半分になってしまう。`, back: [S2] },
    ],
  };
}

const TT: [number, number, number][] = [];
for (const c2 of [0.1, 0.2]) for (const V1 of [10, 20]) for (const c1 of [0.05, 0.06, 0.08, 0.09, 0.12, 0.15]) if (nice((c1 * V1) / c2, 5, 30)) TT.push([c2, V1, c1]);

function tekitei(r: Rng): QuestionBody {
  const [c2, V1, c1] = r.pick(TT);
  const V2 = f((c1 * V1) / c2);
  const acid = r.pick(["酢酸水溶液", "塩酸"]);
  return {
    prompt: `濃度のわからない${acid} ${V1} mL をホールピペットでとり、${f(c2)} mol/L の水酸化ナトリウム水溶液で滴定すると、中和までに ${V2} mL 必要でした。${acid}のモル濃度は何 mol/L ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(c1)], unit: "mol/L", calc: `${f(c2)}*${V2}/${V1}` },
    point: "弱酸でも、中和の式はそのまま使える",
    steps: [
      { title: "式を立てる", body: `1×x×${V1} ＝ 1×${f(c2)}×${V2}。`, back: [S2, S3] },
      { title: "解く", body: `x ＝ {{${f(c1)} mol/L}}。`, trap: acid === "酢酸水溶液" ? "酢酸が弱酸でも、中和に必要な塩基の量は同じ式で求められる。" : "濃度と体積を取りちがえない。わかっている数を先に書き出す。" },
    ],
  };
}

const SU: [number, number, number][] = [];
for (const c0 of [0.6, 0.7, 0.75, 0.8, 0.9, 1]) for (const Vt of [10, 20]) for (const c2 of [0.1, 0.05]) if (nice((c0 / 10) * Vt / c2, 5, 40)) SU.push([c0, Vt, c2]);

function su(r: Rng): QuestionBody {
  const [c0, Vt, c2] = r.pick(SU);
  const V2 = f(((c0 / 10) * Vt) / c2);
  const cd = f(c0 / 10);
  return {
    prompt: `食酢を水で正確に10倍にうすめ、その ${Vt} mL を ${f(c2)} mol/L の水酸化ナトリウム水溶液で滴定すると、${V2} mL で中和しました。うすめる前の食酢にふくまれる酢酸のモル濃度は何 mol/L ですか。食酢の酸は酢酸（1価）だけとします。`,
    answer: { kind: "num", answerKind: "num", answer: [f(c0)], unit: "mol/L", calc: `${f(c2)}*${V2}/${Vt}*10` },
    point: "うすめた液の濃度を出してから、10倍にもどす",
    steps: [
      { title: "うすめた液の濃度", body: `1×x×${Vt} ＝ 1×${f(c2)}×${V2} より x ＝ {{${cd} mol/L}}。`, back: [S2] },
      { title: "もとの濃度にもどす", body: `10倍にうすめたので、もとの食酢は ${cd}×10 ＝ {{${f(c0)} mol/L}}。`, trap: "うすめた液の濃度を答えにしない。最後に10倍する。", back: [S3] },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  {
    ...b("buret", 1),
    prompt: "中和滴定で、濃度のわかった塩基の水溶液を少しずつ加え、加えた体積を読みとる器具を何といいますか。",
    answer: { kind: "term", accept: ["ビュレット"], near: [{ text: "ホールピペット", why: "ホールピペットは、決まった体積の溶液を正確にとる器具。滴下する体積を読むのはビュレットです。" }] },
    point: "とる＝ホールピペット、滴下する＝ビュレット",
    steps: [{ title: "器具の役割", body: "酸を正確にとるのが{{ホールピペット}}、塩基を少しずつ加えて体積を読むのが{{ビュレット}}です。", back: [S3] }],
  },
  {
    ...b("en", 1),
    prompt: "塩酸と水酸化ナトリウム水溶液を中和させたときにできる塩はどれですか。",
    answer: {
      kind: "choice",
      options: ["塩化ナトリウム NaCl", "水 H₂O", "水素 H₂", "塩化水素 HCl"],
      correct: 0,
      why: ["酸の陰イオン Cl⁻ と塩基の陽イオン Na⁺ から NaCl ができる。", "水は H⁺＋OH⁻ からできるもので、塩ではない。", "中和では水素は発生しない。", "HCl は反応した酸そのもの。"],
    },
    point: "塩＝酸の陰イオン＋塩基の陽イオン",
    steps: [{ title: "何ができるか", body: "H⁺＋OH⁻ → H₂O と同時に、Cl⁻ と Na⁺ から{{塩 NaCl}}ができます。", back: [S1] }],
  },
  {
    ...b("shijiyaku", 2, "思考・判断・表現"),
    prompt: "酢酸水溶液を水酸化ナトリウム水溶液で滴定するとき、指示薬として適しているものはどれですか。",
    answer: {
      kind: "choice",
      options: ["フェノールフタレイン", "メチルオレンジ", "どちらでもよい", "指示薬は使えない"],
      correct: 0,
      why: [
        "弱酸＋強塩基の中和点は CH₃COONa の加水分解で塩基性。塩基性側で変色するフェノールフタレインを使う。",
        "メチルオレンジは酸性側で変色するので、強酸＋弱塩基の滴定に使う。",
        "中和点の pH が7からずれるので、どちらでもよいわけではない。",
        "変色域が中和点の pH にふくまれる指示薬を選べば使える。",
      ],
    },
    point: "弱酸＋強塩基 → フェノールフタレイン",
    steps: [{ title: "中和点の pH", body: "中和点では {{CH₃COONa}} の水溶液になり塩基性。変色域が塩基性側の{{フェノールフタレイン}}を選びます。", back: [S3, S4] }],
  },
  {
    ...b("nahco3", 2, "思考・判断・表現"),
    prompt: "炭酸水素ナトリウム NaHCO₃ について正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["酸性塩に分類されるが、水溶液は弱い塩基性を示す", "酸性塩なので、水溶液は酸性を示す", "正塩なので、水溶液は中性を示す", "塩基なので、水溶液は強い塩基性を示す"],
      correct: 0,
      why: [
        "酸の H が残っているので酸性塩。弱酸と強塩基からなる塩なので水溶液は弱い塩基性。",
        "酸性塩・正塩は組成による名前で、水溶液の性質とは関係しない。",
        "H が残っているので正塩ではない。",
        "NaHCO₃ は塩で、水溶液の塩基性も弱い。",
      ],
    },
    point: "酸性塩という名前と、水溶液の性質は別",
    steps: [{ title: "名前と液性を分ける", body: "{{酸性塩}}は組成（H が残る）による名前。水溶液の性質は、もとの酸と塩基の{{強いほう}}で決まります。", back: [S4] }],
  },
];

export const H_SCI_CHEMB_CHUWA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学基礎",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "中和の量的関係",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "enzan", type: "A", difficulty: 1, points: 16, seconds: 75, skill: "知識・技能", generate: enzan },
        { id: "ryusan", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: ryusan },
        { id: "tekitei", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: tekitei },
        { id: "su", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: su },
      ],
    },
    { title: "滴定と塩", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
