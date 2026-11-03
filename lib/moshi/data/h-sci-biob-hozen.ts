// 生物基礎「生態系の保全」の単元模試 (B: プール8問から4問 ＋ A: 生物濃縮の倍率1問 ＋ C: 記述1問)。問題はすべてオリジナル。
// 検算: A は架空の分解されにくい物質 X について、水中の濃度 c と各栄養段階での倍率を先に決めて体内濃度を作り、
//   「体内濃度 ÷ 比べる相手の濃度」の calc を scripts/check-moshi.ts がシード1〜100で計算して照合する。
import type { QuestionB, QuestionBody, QuestionC, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-biob-hozen";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "かく乱と復元力、キーストーン種");
const S2 = L(2, "水の汚れと富栄養化");
const S3 = L(3, "生物濃縮：上の栄養段階ほど高濃度に");
const S4 = L(4, "外来生物が在来の生態系をおびやかす");
const S5 = L(5, "森林の減少と地球温暖化");
const S6 = L(6, "生物多様性を守る");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });
const f = (x: number) => String(Math.round(x * 1000) / 1000);

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("keystone", 1),
    prompt: "食物網の上位にいて、その種がいなくなると生態系が大きく変わってしまう種を何といいますか。",
    answer: { kind: "term", accept: ["キーストーン種"], near: [{ text: "外来生物", why: "外来生物は人の活動で持ちこまれた生物。生態系のバランスのかなめになる種はキーストーン種です。" }] },
    point: "いなくなると全体が大きく変わる＝キーストーン種",
    steps: [{ title: "かなめの種", body: "その種がいなくなると生態系が大きく変わる、食物網の上位の種を{{キーストーン種}}といいます。", back: [S1] }],
  },
  {
    ...b("akashio", 1),
    prompt: "海で、窒素やリンが多くなりすぎて植物プランクトンが大発生する現象を何といいますか。",
    answer: { kind: "term", accept: ["赤潮"], near: [{ text: "アオコ", why: "アオコ（水の華）は湖沼で起こる現象。海で起こるものは赤潮です。" }] },
    point: "海は赤潮、湖沼はアオコ",
    steps: [{ title: "富栄養化の結果", body: "{{富栄養化}}でプランクトンが大発生すると、海では{{赤潮}}、湖沼では{{アオコ}}が起こります。", back: [S2] }],
  },
  {
    ...b("tayosei3", 1),
    prompt: "生物多様性の3つの段階にふくまれないものはどれですか。",
    answer: {
      kind: "choice",
      options: ["個体数の多様性", "遺伝的多様性", "種多様性", "生態系多様性"],
      correct: 0,
      why: ["3つの段階は遺伝的・種・生態系の多様性。個体数の多様性はふくまれない。", "同じ種の中の遺伝子のちがい。3つの段階の1つ。", "さまざまな種がいること。3つの段階の1つ。", "いろいろな生態系があること。3つの段階の1つ。"],
    },
    point: "遺伝的・種・生態系の3段階",
    steps: [{ title: "3つの段階", body: "生物多様性は{{遺伝的多様性}}・{{種多様性}}・{{生態系多様性}}の3つの段階で考えます。", back: [S6] }],
  },
  // ---- 標準 ----
  {
    ...b("gairai", 2),
    prompt: "外来生物について正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["人の活動で本来の生息地の外に持ちこまれて定着した生物で、国内の別の地域から来たものもふくむ", "外国から自然に飛んできた生物だけをいう", "日本にもとからすむ生物のこと", "絶滅のおそれがある生物のこと"],
      correct: 0,
      why: [
        "外来生物は人の活動で持ちこまれたもの。国内の別の地域から持ちこまれた国内外来種もふくむ。",
        "人の活動によって持ちこまれたものをいい、外国からとは限らない。",
        "もとからすむ生物は在来生物。",
        "絶滅のおそれがあるのは絶滅危惧種。",
      ],
    },
    point: "外来生物＝人が持ちこんだ生物（国内からも）",
    steps: [{ title: "定義を確かめる", body: "{{人の活動}}によって本来の生息地の外に持ちこまれた生物。外国からとは限りません。", back: [S4] }],
  },
  {
    ...b("seibutsunoshuku", 2),
    prompt: "生物濃縮が起こりやすい物質の性質として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["分解されにくく、体外に排出されにくい", "すぐに分解され、体外にも出やすい", "水によく溶けて、すぐに尿で出る", "光合成で使われてなくなる"],
      correct: 0,
      why: ["分解・排出されにくい物質は、食物連鎖を通じてたまっていく。", "分解・排出されやすいとたまらない。", "すぐに排出されるとたまらない。", "光合成で使われる物質ではない。"],
    },
    point: "分解・排出されにくい物質がたまる",
    steps: [{ title: "たまる条件", body: "{{分解されにくく、排出されにくい}}物質が、えさを通して上の栄養段階にたまります（DDT・PCB など）。", back: [S3] }],
  },
  {
    ...b("shinrin", 2, "思考・判断・表現"),
    prompt: "熱帯多雨林の減少が地球温暖化につながる理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["二酸化炭素を吸収して炭素をたくわえる森林が減るから", "森林が減ると、太陽の光が弱くなるから", "森林が減ると、酸素がふえすぎるから", "森林が減ると、海の水がふえるから"],
      correct: 0,
      why: [
        "森林は CO₂ を吸収して炭素をたくわえている。減ると大気中の CO₂ がふえやすくなる。",
        "太陽の光の強さは森林で変わらない。",
        "森林が減ると、酸素がふえるのではない。",
        "海の水の量とは直接関係しない。",
      ],
    },
    point: "森林は CO₂ を吸収・炭素をたくわえる",
    steps: [{ title: "森林の役割", body: "森林は{{二酸化炭素を吸収}}して炭素をたくわえています。減ると生物多様性の低下と温暖化の両方につながります。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...b("kansetsu", 3, "思考・判断・表現"),
    prompt: "ある海岸で、ウニを食べるラッコが減ると、ウニがふえて海藻が減りました。ラッコと海藻の関係のように、直接食べる・食べられる関係にない生物に影響することを何といいますか。",
    answer: { kind: "term", accept: ["間接効果"], near: [{ text: "生物濃縮", why: "生物濃縮は物質が体内にたまること。食物網を通した間接的な影響は間接効果です。" }] },
    point: "直接の関係がない相手への影響＝間接効果",
    steps: [{ title: "食物網をたどる", body: "ラッコ → ウニ → 海藻。ラッコは海藻を食べないのに海藻に影響する。これが{{間接効果}}です。", back: [S1] }],
  },
  {
    ...b("satoyama", 3, "思考・判断・表現"),
    prompt: "里山について正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["人が適度に手を入れて維持してきた雑木林や水田などで、多くの生物のすみかになっている", "人がまったく手を入れていない原生林のこと", "人が開発してつくった市街地のこと", "外来生物だけがすむ場所のこと"],
      correct: 0,
      why: [
        "里山は人の適度な手入れで保たれてきた環境で、多くの生物のすみかとして見直されている。",
        "里山は人が手を入れてきた場所。",
        "市街地ではない。",
        "里山には在来の生物が多くすむ。",
      ],
    },
    point: "里山＝人の適度な手入れで保たれた環境",
    steps: [{ title: "人と自然の関わり", body: "{{里山}}は雑木林や水田など、人が{{適度に手を入れて}}維持してきた環境です。", back: [S6] }],
  },
];

const CHAIN = ["植物プランクトン", "動物プランクトン", "小型の魚", "大型の魚", "魚を食べる鳥"];

function noshuku(r: Rng): QuestionBody {
  const c0 = r.pick([0.001, 0.002, 0.004, 0.005]);
  const muls = [r.pick([10, 20, 50]), r.pick([5, 10]), r.pick([4, 5, 10]), r.pick([2, 5, 10]), r.pick([5, 10, 20])];
  const conc: number[] = [];
  muls.reduce((acc, m) => {
    const v = acc * m;
    conc.push(v);
    return v;
  }, c0);
  const j = r.int(2, 4);
  const vsWater = r.bool();
  const i = vsWater ? -1 : r.int(0, j - 1);
  const base = i < 0 ? c0 : conc[i];
  const baseName = i < 0 ? "水" : CHAIN[i];
  const ans = f(conc[j] / base);
  return {
    prompt: `分解されにくい物質 X の濃度を調べると、水中では ${f(c0)}、${CHAIN.slice(0, j + 1).map((n, k) => `${n}では ${f(conc[k])}`).join("、")}でした（単位はすべて ppm）。${CHAIN[j]}の X の濃度は、${baseName}${i < 0 ? "中" : ""}の濃度の何倍ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], unit: "倍", calc: `${f(conc[j])}/${f(base)}` },
    point: "比べる濃度でわる。上の段階ほど高い",
    steps: [
      { title: "わり算で倍率", body: `${f(conc[j])} ÷ ${f(base)} ＝ {{${ans} 倍}}。`, back: [S3] },
      { title: "なぜ高くなるか", body: "X は分解・排出されにくいので、えさを通して{{上の栄養段階ほど}}たまっていきます。", trap: "逆にわらない。上の段階のほうが濃度が高いので、答えは1より大きい。" },
    ],
  };
}

const FIX: QuestionC[] = [
  {
    id: "fueiyoka",
    type: "C",
    difficulty: 3,
    points: 18,
    seconds: 180,
    skill: "思考・判断・表現",
    prompt: "富栄養化が進んだ湖で、魚などが大量に死ぬことがあります。その理由を、プランクトンと酸素にふれて50字以内で説明しなさい。",
    answer: {
      kind: "written",
      limit: { max: 50, unit: "字" },
      model: "大発生したプランクトンの死がいを分解するときに水中の酸素が多く使われ、酸素不足になるから。",
      rubric: [
        { label: "プランクトンの大発生と死がいの分解にふれている", points: 9, keywords: ["死がい", "分解", "大発生"] },
        { label: "水中の酸素が不足すること", points: 9, keywords: ["酸素不足", "酸素が多く使われ", "酸素が足りな"] },
      ],
    },
    point: "死がいの分解で酸素が使われる",
    steps: [{ title: "順にたどる", body: "栄養塩類がふえる → プランクトンが大発生 → {{死がいの分解で酸素が使われる}} → 酸素不足で魚が死にます。", back: [S2] }],
  },
];

export const H_SCI_BIOB_HOZEN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物基礎",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "生態系のバランスと保全", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
    { title: "生物濃縮", lead: "次の問いに答えなさい。", style: "calc", questions: [{ id: "noshuku", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: noshuku }] },
    { title: "水の汚れ", lead: "次の問いに答えなさい。", style: "writing", questions: FIX },
  ],
};
