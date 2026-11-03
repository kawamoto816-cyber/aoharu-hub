// 化学「電気分解」の単元模試 (A: ファラデーの法則の計算3問 ＋ B: プール8問から3問)。問題はすべてオリジナル。
// 検算: 時間を 965 s の倍数にして、電子の物質量 It/F がきれいな値になるようにする。calc (問題の数から答えを出す式) を
//   scripts/check-moshi.ts がシード1〜100で照合する。F＝9.65×10⁴ C/mol、Cu＝64、Ag＝108、標準状態の気体 22.4 L/mol。
//   電極で生じる物質・反応式・工業的製法は、レクチャーの記述だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-denki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "陰極では還元、陽極では酸化");
const S2 = L(2, "どの物質が反応するかを見分ける");
const S3 = L(3, "電極での反応式を書く");
const S4 = L(4, "ファラデーの法則：量は流れた電子で決まる");
const S5 = L(5, "工業での電気分解");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const clean = (x: number, d = 3) => Math.abs(x * 10 ** d - Math.round(x * 10 ** d)) < 1e-6;

const IT: [number, number][] = [];
for (const I of [0.5, 1.0, 2.0, 2.5, 4.0, 5.0]) for (const t of [965, 1930, 3860, 4825, 5790, 9650]) if (clean((I * t) / 96500, 3)) IT.push([I, t]);

function denshi(r: Rng): QuestionBody {
  const [I, t] = r.pick(IT);
  const Q = f(I * t);
  const n = f((I * t) / 96500);
  return {
    prompt: `${f(I)} A の電流を ${t} 秒間流しました。流れた電子の物質量は何 mol ですか。ファラデー定数は 9.65×10⁴ C/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [n], unit: "mol", calc: `${I}*${t}/(9.65*10^4)` },
    point: "Q＝It〔C〕、電子の mol＝Q÷F",
    steps: [
      { title: "電気量", body: `Q＝It＝${f(I)}×${t}＝{{${Q} C}}。`, trap: "時間は秒〔s〕で入れる。", back: [S4] },
      { title: "電子の物質量", body: `${Q}÷(9.65×10⁴)＝{{${n} mol}}。`, back: [S4] },
    ],
  };
}

const METALS = [
  { sol: "硫酸銅(II) CuSO₄", m: "銅", M: 64, k: 2, eq: "Cu²⁺＋2e⁻ → Cu" },
  { sol: "硝酸銀 AgNO₃", m: "銀", M: 108, k: 1, eq: "Ag⁺＋e⁻ → Ag" },
  { sol: "塩化銅(II) CuCl₂", m: "銅", M: 64, k: 2, eq: "Cu²⁺＋2e⁻ → Cu" },
];

function sekishutsu(r: Rng): QuestionBody {
  const me = r.pick(METALS);
  const [I, t] = r.pick(IT);
  const ne = (I * t) / 96500;
  const w = f((ne / me.k) * me.M);
  return {
    prompt: `白金電極を使い、${me.sol} 水溶液に ${f(I)} A の電流を ${t} 秒間流して電気分解しました。陰極に析出する${me.m}は何 g ですか。ファラデー定数 9.65×10⁴ C/mol、${me.m === "銅" ? "Cu＝64" : "Ag＝108"} とします。`,
    answer: { kind: "num", answerKind: "num", answer: [w], unit: "g", calc: `${I}*${t}/(9.65*10^4)/${me.k}*${me.M}` },
    point: "電子の mol → 反応式の係数で金属の mol → g",
    steps: [
      { title: "電子の物質量", body: `${f(I)}×${t}÷(9.65×10⁴)＝{{${f(ne)} mol}}。`, back: [S4] },
      { title: "係数でつなぐ", body: `陰極は ${me.eq}。電子 ${me.k} mol で${me.m} 1 mol なので、${f(ne)}÷${me.k}＝{{${f(ne / me.k)} mol}}。`, trap: me.k === 2 ? "電子の mol をそのまま銅の mol にしない。Cu²⁺ は電子2個で1個の Cu になる。" : "Ag⁺ は電子1個で Ag 1個。電子の mol と銀の mol は等しい。", back: [S3] },
      { title: "質量に直す", body: `${f(ne / me.k)}×${me.M}＝{{${w} g}}。` },
    ],
  };
}

const GASES = [
  { sol: "硫酸銅(II) CuSO₄ 水溶液を白金電極", pole: "陽極", gas: "酸素", k: 4, eq: "2H₂O → O₂＋4H⁺＋4e⁻" },
  { sol: "塩化ナトリウム NaCl 水溶液を炭素電極", pole: "陽極", gas: "塩素", k: 2, eq: "2Cl⁻ → Cl₂＋2e⁻" },
  { sol: "塩化ナトリウム NaCl 水溶液を炭素電極", pole: "陰極", gas: "水素", k: 2, eq: "2H₂O＋2e⁻ → H₂＋2OH⁻" },
  { sol: "硝酸銀 AgNO₃ 水溶液を白金電極", pole: "陽極", gas: "酸素", k: 4, eq: "2H₂O → O₂＋4H⁺＋4e⁻" },
];

function kitai(r: Rng): QuestionBody {
  const g = r.pick(GASES);
  const [I, t] = r.pick(IT.filter(([i, tt]) => clean(((i * tt) / 96500 / g.k) * 22.4, 3)));
  const ne = (I * t) / 96500;
  const V = f((ne / g.k) * 22.4);
  return {
    prompt: `${g.sol}で、${f(I)} A の電流を ${t} 秒間流して電気分解しました。${g.pole}で発生する気体の体積は、標準状態で何 L ですか。ファラデー定数は 9.65×10⁴ C/mol、気体のモル体積は 22.4 L/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [V], unit: "L", calc: `${I}*${t}/(9.65*10^4)/${g.k}*22.4` },
    point: "まず何の気体か決め、反応式の電子の数で割る",
    steps: [
      { title: "何が発生するか", body: `${g.pole}では {{${g.eq}}} で${g.gas}が発生する。`, back: [S2, S3] },
      { title: "電子 → 気体の mol", body: `電子 ${f(ne)} mol。電子 ${g.k} mol で気体 1 mol なので ${f(ne)}÷${g.k}＝{{${f(ne / g.k)} mol}}。`, trap: g.k === 4 ? "O₂ 1 mol には電子4 mol が必要。2で割らない。" : "電子2 mol で気体1 mol。", back: [S4] },
      { title: "体積", body: `${f(ne / g.k)}×22.4＝{{${V} L}}。` },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("inkyoku", 1),
    prompt: "電気分解で、電源の負極につないだ電極（陰極）で起こる変化はどれですか。",
    answer: {
      kind: "choice",
      options: ["還元", "酸化", "中和", "電離"],
      correct: 0,
      why: ["陰極には電源から電子が流れこむので、電子を受けとる還元が起こる。", "酸化が起こるのは、電子がうばわれる陽極。", "電極で起こるのは電子のやりとり（酸化還元）。", "電離は物質がイオンに分かれること。電極の反応ではない。"],
    },
    point: "陰極で還元、陽極で酸化",
    steps: [{ title: "電子の流れで考える", body: "陰極は電源の負極につながり、{{電子が流れこむので還元}}が起こります。", back: [S1] }],
  },
  {
    ...b("nacl-in", 1),
    prompt: "炭素電極で塩化ナトリウム水溶液を電気分解したとき、陰極で生じる物質はどれですか。",
    answer: {
      kind: "choice",
      options: ["水素", "ナトリウム", "塩素", "酸素"],
      correct: 0,
      why: ["Na⁺ は還元されにくく、水が還元されて H₂ が出る（2H₂O＋2e⁻ → H₂＋2OH⁻）。", "Na⁺ はイオン化傾向が大きく、水溶液中では還元されない。", "塩素は陽極で Cl⁻ が酸化されて出る。", "この電気分解では酸素は出ない。陽極では Cl⁻ が先に酸化される。"],
    },
    point: "Na⁺ は還元されず、水が還元されて H₂",
    steps: [{ title: "イオン化傾向", body: "K⁺・Na⁺ などは還元されにくいので、陰極では{{水が還元されて H₂}}が発生します。", back: [S2] }],
  },
  {
    ...b("cuso4-yo", 1),
    prompt: "白金電極で硫酸銅(II)水溶液を電気分解したとき、陽極で発生する気体は何ですか。",
    answer: { kind: "term", accept: ["酸素", "O2", "O₂", "酸素O₂"], near: [{ text: "水素", why: "水素は陰極で出る気体の代表。CuSO₄ では陰極に Cu が析出し、陽極では水が酸化されて酸素が出ます。" }] },
    point: "SO₄²⁻ は酸化されず、水が酸化されて O₂",
    steps: [{ title: "陽極の反応", body: "SO₄²⁻ は酸化されにくいので、{{2H₂O → O₂＋4H⁺＋4e⁻}} で酸素が発生します。", back: [S2, S3] }],
  },
  // ---- 標準 ----
  {
    ...b("ekisei", 2, "思考・判断・表現"),
    prompt: "炭素電極で塩化ナトリウム水溶液を電気分解する前に、フェノールフタレイン溶液を加えておきました。電気分解を続けると、どこが赤くなりますか。",
    answer: {
      kind: "choice",
      options: ["陰極付近", "陽極付近", "両極付近", "どこも赤くならない"],
      correct: 0,
      why: ["陰極で 2H₂O＋2e⁻ → H₂＋2OH⁻ が起こり、OH⁻ がたまって塩基性になる。", "陽極では Cl⁻ が酸化されて Cl₂ が出るだけで、OH⁻ はふえない。", "OH⁻ ができるのは陰極だけ。", "陰極付近に OH⁻ がたまるので赤くなる。"],
    },
    point: "水が還元される陰極には OH⁻ がたまる",
    steps: [{ title: "陰極の式", body: "陰極では {{2H₂O＋2e⁻ → H₂＋2OH⁻}}。OH⁻ がふえて塩基性になり、フェノールフタレインが赤くなります。", back: [S3] }],
  },
  {
    ...b("cu-yokyoku", 2),
    prompt: "硫酸銅(II)水溶液を、両極とも銅板にして電気分解しました。陽極で起こる変化として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["銅板が溶けて Cu²⁺ になる", "酸素が発生する", "銅が析出する", "水素が発生する"],
      correct: 0,
      why: ["陽極が Cu なら、電極そのものが酸化されて溶け出す（Cu → Cu²⁺＋2e⁻）。", "酸素が出るのは、白金や炭素の陽極のとき。", "銅が析出するのは陰極。", "陽極では還元は起こらない。"],
    },
    point: "陽極が Cu・Ag なら、電極そのものが溶ける",
    steps: [{ title: "電極の材料を確かめる", body: "銅や銀を陽極にすると、{{電極が酸化されて溶け出し}}ます。白金・炭素は溶けません。", back: [S2] }],
  },
  {
    ...b("seiren", 2),
    prompt: "粗銅を陽極、純銅を陰極にして硫酸銅(II)水溶液を電気分解し、純度の高い銅を得る方法を何といいますか。",
    answer: { kind: "term", accept: ["電解精錬"], near: [{ text: "溶融塩電解", why: "溶融塩電解は、融解した化合物を電気分解して Al や Na をつくる方法です。" }] },
    point: "粗銅→純銅は電解精錬",
    steps: [{ title: "工業の電気分解", body: "陰極に純度の高い銅が析出する方法が{{電解精錬}}です。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...b("yoyu", 3, "思考・判断・表現"),
    prompt: "アルミニウムは、アルミニウムイオンをふくむ水溶液の電気分解ではつくれません。その理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "Al³⁺ は還元されにくく、陰極では水が先に還元されて水素が出るから",
        "Al³⁺ は陽極で酸化されてしまうから",
        "アルミニウムは水に溶けない金属だから",
        "水溶液では電流が流れないから",
      ],
      correct: 0,
      why: [
        "Al はイオン化傾向が大きく、水溶液では水が先に還元される。そこで融解した化合物を電気分解する（溶融塩電解）。",
        "陽イオンの Al³⁺ が陽極で酸化されるわけではない。",
        "水に溶けるかどうかではなく、Al³⁺ が還元されにくいことが理由。",
        "電解質の水溶液は電流を通す。",
      ],
    },
    point: "イオン化傾向の大きい金属は溶融塩電解でつくる",
    steps: [{ title: "水との競争", body: "Al³⁺ は還元されにくく、水溶液では{{水が先に還元}}されます。そこで{{溶融塩電解}}を使います。", back: [S2, S5] }],
  },
  {
    ...b("koukan-maku", 3, "思考・判断・表現"),
    prompt: "イオン交換膜法で塩化ナトリウム水溶液を電気分解して水酸化ナトリウムをつくるとき、陽イオン交換膜を通って陰極室へ移動するイオンはどれですか。",
    answer: {
      kind: "choice",
      options: ["Na⁺", "Cl⁻", "OH⁻", "H⁺ と Cl⁻ の両方"],
      correct: 0,
      why: ["膜は陽イオンだけを通すので、Na⁺ が陰極室へ移り、陰極で生じた OH⁻ と NaOH 水溶液になる。", "Cl⁻ は陰イオンなので膜を通れない。", "OH⁻ は陰イオンなので陽極室へ行けない。", "陰イオンの Cl⁻ は通れない。"],
    },
    point: "陽イオン交換膜は陽イオン（Na⁺）だけを通す",
    steps: [{ title: "膜の役割", body: "{{陽イオンだけ}}を通す膜なので、Na⁺ が陰極室へ移り、陰極室に純度の高い NaOH 水溶液がたまります。", back: [S5] }],
  },
];

export const H_SCI_CHEM_DENKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "電極で起こる変化",
      lead: "次の問いに答えなさい。",
      style: "word",
      pick: 3,
      questions: POOL,
    },
    {
      title: "ファラデーの法則",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "denshi", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: denshi },
        { id: "sekishutsu", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: sekishutsu },
        { id: "kitai", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: kitai },
      ],
    },
  ],
};
