// 化学「電離平衡」の単元模試 (A: 計算3問 ＋ B: プール8問から3問)。問題はすべてオリジナル。
// 検算: 濃度は 10 のべきにそろえ、pH は整数になる組だけを使う (pH の calc は指数の数から出す式)。
//   Ka≒cα² は calc、[H⁺]＝√(cKa) は equations (x² の式) で scripts/check-moshi.ts がシード1〜100で照合する。
//   Kw＝1.0×10⁻¹⁴ (25℃)、近似 1−α≒1 はレクチャーと同じ。弱酸は架空の「弱酸 HA」とし、Ka は問題文で与える。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-denri";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "水のイオン積と pH");
const S2 = L(2, "弱酸の電離定数 Ka");
const S3 = L(3, "強酸と弱酸は、うすめたときの変わり方もちがう");
const S4 = L(4, "緩衝液：少量の酸や塩基を打ち消す");
const S5 = L(5, "共通イオン効果と溶解度積");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const m1 = (x: number) => (Math.abs(x * 10 - Math.round(x * 10)) < 1e-9 ? x.toFixed(1) : f(x));
const SUP = "⁰¹²³⁴⁵";

const STRONG = [
  { name: "塩酸 HCl", base: false, v: 1 },
  { name: "硝酸 HNO₃", base: false, v: 1 },
  { name: "水酸化ナトリウム NaOH 水溶液", base: true, v: 1 },
  { name: "水酸化カリウム KOH 水溶液", base: true, v: 1 },
  { name: "硫酸 H₂SO₄", base: false, v: 2 },
];

function ph(r: Rng): QuestionBody {
  const s = r.pick(STRONG);
  const k = r.int(1, 4);
  // 硫酸は 5.0×10⁻ᵏ⁻¹ mol/L にして [H⁺] を 10⁻ᵏ にする
  const c = s.v === 2 ? `5.0×10⁻${SUP[k + 1]}` : `1.0×10⁻${SUP[k]}`;
  const ans = s.base ? 14 - k : k;
  return {
    prompt: `25℃ で、${c} mol/L の${s.name}の pH はいくつですか。${s.base ? "塩基" : "酸"}は水中で完全に電離し、水のイオン積は Kw＝1.0×10⁻¹⁴ (mol/L)² とします。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], calc: s.base ? `14-${k}` : `${k}` },
    point: s.base ? "塩基はまず [OH⁻]、Kw で [H⁺] に直す" : "[H⁺]＝10⁻ⁿ なら pH＝n",
    steps: s.base
      ? [
          { title: "[OH⁻]", body: `完全に電離するので [OH⁻]＝{{1.0×10⁻${SUP[k]} mol/L}}。`, back: [S1] },
          { title: "[H⁺] と pH", body: `[H⁺]＝Kw/[OH⁻]＝1.0×10⁻¹⁴÷10⁻${SUP[k]}＝1.0×10⁻${["", "¹³", "¹²", "¹¹", "¹⁰"][k]} mol/L。pH＝{{${ans}}}。`, trap: `pH＝${k} としない。それは pOH にあたる。`, back: [S1] },
        ]
      : [
          { title: "[H⁺]", body: s.v === 2 ? `H₂SO₄ 1つから H⁺ が2つ出るので [H⁺]＝2×${c}＝{{1.0×10⁻${SUP[k]} mol/L}}。` : `完全に電離するので [H⁺]＝{{1.0×10⁻${SUP[k]} mol/L}}。`, trap: s.v === 2 ? "2価の酸は、[H⁺] が酸の濃度の2倍。" : undefined, back: [S1] },
          { title: "pH", body: `pH＝−log₁₀[H⁺]＝{{${ans}}}。`, back: [S1] },
        ],
  };
}

function ka(r: Rng): QuestionBody {
  const c = r.pick([0.02, 0.05, 0.1, 0.2, 0.4, 0.5]);
  const a = r.pick([0.01, 0.02, 0.03, 0.05]);
  const K = f(c * a * a * 1e5);
  const h = f(c * a * 1e3);
  return {
    prompt: `${f(c)} mol/L の弱酸 HA の水溶液で、HA の電離度は ${f(a)} でした。この弱酸の電離定数 Ka は何 mol/L ですか。α は1よりずっと小さいので 1−α≒1 と近似してよいものとします。`,
    answer: { kind: "num", answerKind: "num", answer: [K], unit: "×10⁻⁵ mol/L", calc: `${c}*${a}*${a}*10^5` },
    point: "Ka＝cα²/(1−α)≒cα²",
    steps: [
      { title: "平衡時の濃度", body: `[H⁺]＝[A⁻]＝cα＝${f(c)}×${f(a)}＝{{${h}×10⁻³ mol/L}}、[HA]＝c(1−α)≒c。`, back: [S2] },
      { title: "Ka を計算", body: `Ka≒cα²＝${f(c)}×${f(a)}²＝{{${K}×10⁻⁵ mol/L}}。`, trap: "cα（[H⁺]）で止めない。Ka は cα² で、α を2回かける。", back: [S2] },
    ],
  };
}

function suiso(r: Rng): QuestionBody {
  const combos: [number, number, number][] = [];
  for (const h of [1, 1.5, 2, 3, 4]) for (const c of [0.02, 0.05, 0.1, 0.2, 0.25, 0.4, 0.5]) {
    const k = (h * h) / (c * 10);
    if (Math.abs(k * 100 - Math.round(k * 100)) < 1e-6 && k >= 0.5 && k <= 9) combos.push([h, c, k]);
  }
  const [h, c, k] = r.pick(combos);
  return {
    prompt: `${f(c)} mol/L の弱酸 HA の水溶液の水素イオン濃度 [H⁺] は何 mol/L ですか。HA の電離定数は Ka＝${m1(k)}×10⁻⁵ mol/L とし、電離度は1よりずっと小さいものとします。`,
    answer: { kind: "num", answerKind: "num", answer: [f(h)], unit: "×10⁻³ mol/L", equations: [`x^2=${c}*${k}*10`] },
    point: "[H⁺]＝√(cKa)。けたは 10⁻⁶ の平方根で 10⁻³",
    steps: [
      { title: "式", body: "Ka≒cα² より α＝√(Ka/c)、[H⁺]＝cα＝{{√(cKa)}}。", back: [S2] },
      { title: "代入", body: `cKa＝${f(c)}×${m1(k)}×10⁻⁵＝${m1(h * h)}×10⁻⁶。√ をとって [H⁺]＝{{${m1(h)}×10⁻³ mol/L}}。`, trap: "[H⁺]＝c（強酸と同じ）としない。弱酸は一部しか電離しない。", back: [S2, S3] },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("ionseki", 1),
    prompt: "25℃ の水溶液で、[H⁺][OH⁻] の値はいくらですか。",
    answer: {
      kind: "choice",
      options: ["1.0×10⁻¹⁴ (mol/L)²", "1.0×10⁻⁷ (mol/L)²", "1.0×10⁻¹ (mol/L)²", "溶けている物質によって変わる"],
      correct: 0,
      why: ["25℃ では水のイオン積 Kw＝[H⁺][OH⁻]＝1.0×10⁻¹⁴ (mol/L)²。", "1.0×10⁻⁷ mol/L は純水の [H⁺] の値で、積ではない。", "けたがまったくちがう。", "温度が一定なら、酸性でも塩基性でも Kw は一定。"],
    },
    point: "水のイオン積 Kw＝1.0×10⁻¹⁴ (25℃)",
    steps: [{ title: "Kw", body: "25℃ では {{[H⁺][OH⁻]＝1.0×10⁻¹⁴ (mol/L)²}}。酸性でも塩基性でも同じです。", back: [S1] }],
  },
  {
    ...b("kanshoeki", 1),
    prompt: "少量の酸や塩基を加えても pH がほとんど変わらない、弱酸とその塩などをふくむ水溶液を何といいますか。",
    answer: { kind: "term", accept: ["緩衝液", "緩衝溶液"], near: [{ text: "中和", why: "中和は酸と塩基の反応です。pH を保つ水溶液は緩衝液といいます。" }] },
    point: "弱酸＋その塩 → 緩衝液",
    steps: [{ title: "用語", body: "酢酸と酢酸ナトリウムの混合水溶液のような液を{{緩衝液}}といいます。", back: [S4] }],
  },
  {
    ...b("ph-10bai", 1),
    prompt: "水溶液の [H⁺] が10倍になると、pH はどう変わりますか。",
    answer: {
      kind: "choice",
      options: ["1 小さくなる", "1 大きくなる", "10 小さくなる", "10倍になる"],
      correct: 0,
      why: ["pH＝−log₁₀[H⁺] なので、[H⁺] が10倍になるごとに pH は1小さくなる。", "[H⁺] がふえると酸性が強くなり、pH は小さくなる。", "pH は [H⁺] の「けた」で決まるので、10倍で1しか変わらない。", "pH は対数なので、10倍にはならない。"],
    },
    point: "[H⁺] が10倍 → pH が1小さい",
    steps: [{ title: "pH は対数", body: "pH＝−log₁₀[H⁺]。[H⁺] が{{10倍で pH は1小さく}}なります。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...b("usumeru", 2, "思考・判断・表現"),
    prompt: "弱酸の水溶液を水でうすめたとき、弱酸の電離度はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["大きくなる", "小さくなる", "変わらない", "0になる"],
      correct: 0,
      why: ["α≒√(Ka/c) なので、c が小さくなると α は大きくなる。", "うすめると電離が進む向きに平衡が移動する。", "電離度は濃度で変わる。変わらないのは Ka。", "うすめても電離はなくならない。"],
    },
    point: "弱酸はうすめると電離度が大きくなる",
    steps: [{ title: "α≒√(Ka/c)", body: "濃度 c が小さくなると、{{電離度は大きく}}なります。だから10倍にうすめても [H⁺] は約1/3 にしかなりません。", back: [S3] }],
  },
  {
    ...b("kansho-san", 2, "思考・判断・表現"),
    prompt: "酢酸と酢酸ナトリウムの緩衝液に少量の塩酸を加えても、pH がほとんど変わらない理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["多くある CH₃COO⁻ が H⁺ を受けとって CH₃COOH になるから", "多くある CH₃COOH が H⁺ を受けとるから", "Na⁺ が H⁺ と反応するから", "塩酸が緩衝液の中では電離しないから"],
      correct: 0,
      why: ["酢酸ナトリウムが完全に電離して CH₃COO⁻ が多くあり、加えた H⁺ を CH₃COOH にしてしまう。", "CH₃COOH は塩基を加えたときに OH⁻ と中和する役。", "Na⁺ は H⁺ と反応しない。", "塩酸はほぼ完全に電離する強酸。"],
    },
    point: "酸には CH₃COO⁻、塩基には CH₃COOH がはたらく",
    steps: [{ title: "2つの役者", body: "酸を加えると {{CH₃COO⁻＋H⁺ → CH₃COOH}}。H⁺ がほとんどふえません。", back: [S4] }],
  },
  {
    ...b("kyotsu", 2),
    prompt: "AgCl の飽和水溶液に NaCl を加えると AgCl がさらに沈殿します。このように、平衡にふくまれるイオンを加えると、そのイオンが減る向きに平衡が移動する現象を何といいますか。",
    answer: { kind: "term", accept: ["共通イオン効果"], near: [{ text: "ルシャトリエの原理", why: "考え方の元はルシャトリエの原理ですが、共通のイオンを加えたときのこの現象は共通イオン効果とよびます。" }] },
    point: "同じイオンを加えると溶けにくくなる＝共通イオン効果",
    steps: [{ title: "用語", body: "共通のイオンを加えると、そのイオンが減る向きに平衡が移動します。これが{{共通イオン効果}}です。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...b("ksp", 3, "思考・判断・表現"),
    prompt: "AgCl の溶解度積を Ksp とします。Ag⁺ と Cl⁻ をふくむ水溶液で AgCl の沈殿が生じるのはどんなときですか。",
    answer: {
      kind: "choice",
      options: ["[Ag⁺][Cl⁻] が Ksp をこえたとき", "[Ag⁺][Cl⁻] が Ksp より小さいとき", "[Ag⁺] と [Cl⁻] が等しくなったとき", "[Ag⁺]＋[Cl⁻] が Ksp をこえたとき"],
      correct: 0,
      why: ["イオン濃度の積が Ksp をこえると、こえた分が沈殿する。", "Ksp より小さければ、まだ溶けていられる。", "濃度が等しいかどうかでは決まらない。", "和ではなく積で比べる。"],
    },
    point: "イオン濃度の積 ＞ Ksp で沈殿",
    steps: [{ title: "溶解度積", body: "{{[Ag⁺][Cl⁻]＞Ksp}} になると沈殿が生じます。", back: [S5] }],
  },
  {
    ...b("ph-usume", 3, "思考・判断・表現"),
    prompt: "pH 5 の塩酸を水で 1000 倍にうすめました。pH はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["7 に近い値になり、7 をこえない", "8 になる", "5 のまま変わらない", "2 になる"],
      correct: 0,
      why: ["とてもうすい酸では水の電離による H⁺ が無視できず、pH は7に近づくだけで7をこえない。", "酸をうすめても塩基性にはならない。", "うすめると [H⁺] が減るので pH は大きくなる。", "うすめると pH は大きくなる。"],
    },
    point: "酸をいくらうすめても pH は7をこえない",
    steps: [{ title: "水の電離", body: "[H⁺] が 10⁻⁸ mol/L のように小さくなると、{{水の電離による H⁺}} を無視できません。pH は7に近づくだけです。", back: [S1, S3] }],
  },
];

export const H_SCI_CHEM_DENRI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "pH と電離定数の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "ph", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: ph },
        { id: "ka", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: ka },
        { id: "suiso", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: suiso },
      ],
    },
    {
      title: "電離平衡のしくみ",
      lead: "次の問いに答えなさい。",
      style: "word",
      pick: 3,
      questions: POOL,
    },
  ],
};
