// 生物「減数分裂と遺伝」の単元模試 (A: 組換え価・分離比・三点交雑の計算3問 ＋ B: プール6問から3問)。問題はすべてオリジナル。
// 検算: 組換え価＝組換えの個体数÷全体×100、F2 の個体数＝全体×(9,3,3,1)/16、三点交雑の距離＝和または差 を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。個体数は組換え価・16 の倍数から逆算して作るので答えは整数になる。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-bio-genbun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "減数分裂：2回の分裂で染色体数が半分に");
const S2 = L(2, "体細胞分裂とくらべる");
const S3 = L(3, "DNA量の変化を追う");
const S4 = L(4, "配偶子の多様性：組み合わせは2ⁿ通り");
const S5 = L(5, "連鎖と組換え：乗換えで組み合わせが変わる");
const S6 = L(6, "組換え価から染色体地図をつくる");

const ORG = ["ある植物", "ショウジョウバエ", "ある昆虫", "トウモロコシ"];

function kumikae(r: Rng): QuestionBody {
  const s = r.pick([100, 200, 250, 400, 500]);
  const rv = r.pick([4, 8, 10, 12, 16, 20, 24, 30]);
  const y = (s * rv) / 100; // 組換え型1つ分
  const x = s - y; // 親型1つ分
  const org = r.pick(ORG);
  return {
    prompt: `${org}で、遺伝子 A と B は同じ染色体にあり、A と B、a と b が連鎖している。AaBb の個体を aabb の個体と検定交雑したところ、子の表現型は [AB]：[Ab]：[aB]：[ab]＝${x}：${y}：${y}：${x}（個体）であった。A と B の間の組換え価は何%ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(rv)], unit: "%", calc: `(${y}+${y})/(${x}+${y}+${y}+${x})*100` },
    point: "組換え価＝組換え型の数÷全体×100",
    steps: [
      { title: "組換え型を見分ける", body: `A と B が連鎖しているので、数の少ない {{[Ab] と [aB]}} が組換えで生じた型。合わせて ${2 * y} 個体。`, back: [S5] },
      { title: "組換え価", body: `全体は ${2 * s} 個体。${2 * y}÷${2 * s}×100＝{{${rv}}}%。` },
    ],
  };
}

const KEI: [string, number][] = [["[AB]", 9], ["[Ab]", 3], ["[aB]", 3], ["[ab]", 1]];

function bunri(r: Rng): QuestionBody {
  const k = r.int(10, 60);
  const n = 16 * k;
  const [name, w] = r.pick(KEI);
  const ans = k * w;
  return {
    prompt: `遺伝子 A と B は別々の染色体にあり、A は a に、B は b に対して顕性である。AaBb どうしを交配して ${n} 個体の子が得られたとすると、表現型が ${name} の子は理論上何個体ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "個体", calc: `${n}*${w}/16` },
    point: "独立なら [AB]：[Ab]：[aB]：[ab]＝9：3：3：1",
    steps: [
      { title: "分離比", body: "A と B は別の染色体にあるので独立に分かれ、子の表現型は {{9：3：3：1}}（合計16）。", back: [S4] },
      { title: "個体数", body: `${name} は 16 のうち ${w}。${n}×${w}/16＝{{${ans}}} 個体。` },
    ],
  };
}

function santen(r: Rng): QuestionBody {
  const ab = r.int(3, 18);
  const bc = r.int(2, 15);
  const order = r.pick(["A−B−C", "B−A−C"]);
  // A−B−C なら A−C＝ab＋bc。B−A−C (A が真ん中) なら B−C＝ab＋(A−C) なので A−C＝bc−ab (bc>ab にそろえる)
  const big = Math.max(ab, bc) + (order === "B−A−C" ? r.int(2, 6) : 0);
  const ac = order === "A−B−C" ? ab + bc : big - ab;
  const bcShown = order === "A−B−C" ? bc : big;
  return {
    prompt: `同じ染色体にある3つの遺伝子 A・B・C について、組換え価は A−B 間が ${ab}%、B−C 間が ${bcShown}% であった。3つの遺伝子が染色体上で ${order} の順に並んでいるとすると、A−C 間の組換え価はおよそ何%と考えられますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ac)], unit: "%", calc: order === "A−B−C" ? `${ab}+${bcShown}` : `${bcShown}-${ab}` },
    point: "組換え価は距離の目安。並び順に沿って足し引き",
    steps: [
      { title: "距離として考える", body: "組換え価を遺伝子間の{{距離}}とみなし、並び順どおりに線の上に置く。", back: [S6] },
      order === "A−B−C"
        ? { title: "A−C 間", body: `B が A と C の間にあるので、A−C＝${ab}＋${bcShown}＝{{${ac}}}%。` }
        : { title: "A−C 間", body: `A が B と C の間にあるので、B−C＝B−A＋A−C。A−C＝${bcShown}−${ab}＝{{${ac}}}%。` },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
type Back = { label: string; href: string }[];
type Skill = QuestionB["skill"];
/** 選択肢問題。opts の先頭が正解 ([選択肢, その理由]) */
const ch = (id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, body: string, back: Back, skill: Skill = "知識・技能"): QuestionB => ({
  id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt,
  answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) },
  point, steps: [{ title: "考え方", body, back }],
});
/** 語句の入力問題 */
const tm = (id: string, d: 1 | 2 | 3, prompt: string, accept: string[], near: { text: string; why: string }[], point: string, body: string, back: Back): QuestionB => ({
  id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill: "知識・技能", prompt,
  answer: { kind: "term", accept, near }, point, steps: [{ title: "考え方", body, back }],
});

const POOL: QuestionB[] = [
  tm("taigo", 1, "減数分裂の第一分裂前期に、相同染色体どうしが全長にわたって並んでくっつくことを何といいますか。", ["対合"], [{ text: "乗換え", why: "乗換えは、対合した相同染色体の間で一部が交換されることです。並んでくっつくこと自体は対合です。" }], "相同染色体が並んでくっつく＝対合", "第一分裂前期に相同染色体が{{対合}}し、4本の染色分体からなる{{二価染色体}}ができる。", [S1]),
  ch("hangen", 1, "減数分裂で、染色体数が 2n から n に減るのはどの時点ですか。", [["第一分裂で相同染色体が分かれるとき", "正しい。第一分裂は相同染色体を分ける分裂。"], ["第二分裂で染色分体が分かれるとき", "第二分裂では本数は変わらない（染色分体が分かれるだけ）。"], ["分裂の前に DNA が複製されるとき", "複製で DNA 量は2倍になるが、染色体の本数は変わらない。"], ["受精するとき", "受精では n＋n で 2n にもどる。"]], "染色体数が半分になるのは第一分裂", "第一分裂で{{相同染色体}}が別々の細胞へ行き、2n→{{n}}。第二分裂は染色分体を分けるだけ。", [S2]),
  ch("dna-ryo", 2, "減数分裂の前の DNA 量（細胞1つあたり）を 2 とすると、複製後・第一分裂後・第二分裂後の DNA 量はそれぞれいくつですか。", [["4・2・1", "正しい。複製で倍、2回の分裂でそれぞれ半分。"], ["4・2・2", "第二分裂でも DNA 量は半分になる。"], ["2・1・0.5", "分裂の前に複製が起こり、まず4になる。"], ["4・4・2", "第一分裂でも細胞が2つに分かれ、DNA 量は半分になる。"]], "2 → 4 → 2 → 1。半分になる場面は2回", "複製で{{4}}、第一分裂で{{2}}、第二分裂で{{1}}。DNA 量が半分になる場面が2回ある。", [S3], "思考・判断・表現"),
  ch("haigushi", 2, "体細胞の染色体が 2n＝8 の生物で、乗換えを考えないとき、減数分裂でできる配偶子の染色体の組み合わせは何通りですか。", [["16通り", "正しい。n＝4 なので 2⁴＝16 通り。"], ["8通り", "2×4 ではなく、2 を n 回かける。"], ["4通り", "4 は相同染色体の対の数 n。"], ["256通り", "2⁸ は 2n を使った誤り。対の数は n＝4。"]], "相同染色体が n 対なら 2ⁿ 通り", "二価染色体の並ぶ向きは対ごとに偶然。n＝{{4}} 対なので {{2⁴＝16}} 通り。", [S4], "思考・判断・表現"),
  ch("kentei", 3, "検定交雑に潜性ホモ接合体（aabb）を使う理由として正しいものはどれですか。", [["aabb の配偶子は ab だけなので、子の表現型の比が相手の配偶子の比をそのまま表すから", "正しい。潜性遺伝子は表現型に影響しない。"], ["aabb は組換えを起こさないので、子にも組換えが起こらないから", "子の表現型の比は相手（AaBb）の配偶子でできた組換えを映す。"], ["aabb の子は必ず顕性の形質になるから", "子の表現型は相手の配偶子による。"], ["aabb は配偶子を 4 種類つくるから", "aabb の配偶子は ab の1種類だけ。"]], "aabb の配偶子は ab だけ → 子の比＝相手の配偶子の比", "aabb がつくる配偶子は{{ab だけ}}。だから子の表現型の比は、相手がつくる{{配偶子の比}}そのものになる。", [S5], "思考・判断・表現"),
  ch("kyori", 3, "組換え価を、遺伝子どうしの染色体上の距離の目安に使える理由として正しいものはどれですか。", [["離れた遺伝子ほど、その間で乗換えが起こりやすいから", "正しい。離れているほど組換え価が大きくなる。"], ["近い遺伝子ほど、乗換えが起こりやすいから", "逆。近いと間で乗換えが起こりにくい。"], ["組換え価は染色体の長さに比例するから", "染色体全体の長さではなく、2つの遺伝子の間の距離にかかわる。"], ["組換え価はいつも 50% だから", "連鎖していれば組換え価は 50% より小さく、遺伝子の組ごとに異なる。"]], "離れているほど組換え価が大きい", "2つの遺伝子が{{離れている}}ほど間で乗換えが起こりやすく、組換え価が{{大きく}}なる。これで{{染色体地図}}が描ける。", [S6], "思考・判断・表現"),
];

export const H_SCI_BIO_GENBUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物",
  minutes: 13,
  review: { status: "draft" },
  sections: [
    {
      title: "遺伝の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kumikae", type: "A", difficulty: 1, points: 16, seconds: 90, skill: "知識・技能", generate: kumikae },
        { id: "bunri", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: bunri },
        { id: "santen", type: "A", difficulty: 2, points: 17, seconds: 100, skill: "思考・判断・表現", generate: santen },
      ],
    },
    { title: "減数分裂と遺伝のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
