// 地学「鉱物と岩石」の単元模試 (A: 色指数の計算2問 ＋ B: プール8問から4問)。問題はすべてオリジナル。
// 検算: 色指数＝有色鉱物の数(または体積%)の合計÷全体×100 を calc に書き、scripts/check-moshi.ts がシード1〜100で照合する。
//   全体の点数は 200・400・500 などにして、答えは小数第2位以内になるようにする。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-earth-kobutsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "鉱物の基本単位は SiO₄ 四面体");
const S2 = L(2, "固溶体と多形");
const S3 = L(3, "火成岩は SiO₂ の量と冷え方で分ける");
const S4 = L(4, "色指数：有色鉱物の体積の割合");
const S5 = L(5, "マグマのでき方と結晶分化作用");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function point(r: Rng): QuestionBody {
  const n = r.pick([200, 400, 500, 1000]);
  const kise = r.int(0, Math.floor(n * 0.15));
  const kaku = r.int(0, Math.floor(n * 0.15));
  const kuro = r.int(1, Math.floor(n * 0.1));
  const col = kise + kaku + kuro;
  const ci = (col / n) * 100;
  return {
    prompt: `ある火成岩の薄片で、格子の交点 ${n} か所にある鉱物を数えると、輝石 ${kise}、角閃石 ${kaku}、黒雲母 ${kuro} で、残りはすべて石英と長石であった。この岩石の色指数はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(ci)], calc: `(${kise}+${kaku}+${kuro})/${n}*100` },
    point: "色指数＝有色鉱物の割合（%）",
    steps: [
      { title: "有色鉱物", body: `有色鉱物は輝石・角閃石・黒雲母。${kise}＋${kaku}＋${kuro}＝${col}。石英・長石は無色鉱物。`, back: [S4] },
      { title: "色指数", body: `${col}÷${n}×100＝{{${f(ci)}}}。` },
    ],
  };
}

function taiseki(r: Rng): QuestionBody {
  const kan = r.int(0, 20);
  const ki = r.int(5, 35);
  const kaku = r.int(0, 15);
  const sekiei = r.int(0, 10);
  const chou = 100 - kan - ki - kaku - sekiei;
  const ci = kan + ki + kaku;
  return {
    prompt: `ある火成岩にふくまれる鉱物の体積の割合は、かんらん石 ${kan}%、輝石 ${ki}%、角閃石 ${kaku}%、石英 ${sekiei}%、斜長石 ${chou}% であった。この岩石の色指数はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ci)], calc: `${kan}+${ki}+${kaku}` },
    point: "有色鉱物：かんらん石・輝石・角閃石・黒雲母",
    steps: [
      { title: "有色鉱物を選ぶ", body: "有色鉱物はかんらん石・輝石・角閃石（・黒雲母）。{{石英・長石は無色鉱物}}なので数えない。", back: [S4] },
      { title: "色指数", body: `${kan}＋${ki}＋${kaku}＝{{${ci}}}。色指数が大きいほど黒っぽく、苦鉄質の岩石に近い。`, back: [S3] },
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

const POOL: QuestionB[] = [
  // ---- 基本 ----
  ch("shimen", 1, "ケイ酸塩鉱物の基本単位である SiO₄ 四面体のつくりとして正しいものはどれですか。", [["ケイ素1個を酸素4個が囲む", "正しい。"], ["酸素1個をケイ素4個が囲む", "逆。"], ["ケイ素4個と酸素4個が交互に並ぶ", "中心はケイ素1個。"], ["ケイ素2個を酸素1個が囲む", "ちがう。"]], "Si 1個を O 4個が囲む", "{{ケイ素1個}}を{{酸素4個}}が囲む SiO₄ 四面体が基本単位。", [S1]),
  ch("tashoku", 1, "化学組成が同じで結晶構造がちがう多形の代表例はどれですか。", [["ダイヤモンドと石墨", "正しい。どちらも炭素からなる。"], ["かんらん石と輝石", "化学組成がちがう別の鉱物。"], ["石英と長石", "化学組成がちがう。"], ["斜長石の Na と Ca", "これは固溶体の例。"]], "多形＝同じ組成で構造がちがう", "炭素からなる{{ダイヤモンド}}と{{石墨}}は{{多形}}。", [S2]),
  ch("shinsei", 1, "地下深くでマグマがゆっくり冷えてできた深成岩の組織はどれですか。", [["等粒状組織", "正しい。大きな結晶がそろう。"], ["斑状組織", "急に冷えた火山岩の組織。"], ["縞状の組織", "片麻岩などの変成岩に見られる。"], ["層理", "地層の重なり。"]], "深成岩＝等粒状、火山岩＝斑状", "ゆっくり冷えた{{深成岩}}は{{等粒状組織}}、急に冷えた{{火山岩}}は{{斑状組織}}。", [S3]),
  // ---- 標準 ----
  ch("koyotai", 2, "かんらん石で Mg と Fe が結晶構造を保ったまま連続的に置きかわる。このような鉱物を何といいますか。", [["固溶体", "正しい。斜長石の Na と Ca も同じ。"], ["多形", "同じ組成で構造がちがう関係。"], ["変成岩", "岩石の種類。"], ["造岩鉱物ではない鉱物", "かんらん石は代表的な造岩鉱物。"]], "連続的に置きかわる＝固溶体", "かんらん石の Mg・Fe、斜長石の Na・Ca のように連続的に置きかわる鉱物が{{固溶体}}。", [S2]),
  ch("kutetsu", 2, "SiO₂ の少ない苦鉄質岩の特徴として正しいものはどれですか。", [["Fe・Mg をふくむ有色鉱物が多く、黒っぽい", "正しい。"], ["石英が多く、白っぽい", "これはケイ長質岩。"], ["色指数が小さい", "苦鉄質岩ほど色指数は大きい。"], ["必ず等粒状組織である", "冷え方で組織は変わる。"]], "SiO₂ が少ない → 有色鉱物が多く黒い", "SiO₂ が少ないほど{{Fe・Mg をふくむ有色鉱物}}が多く黒っぽい（色指数が大きい）。", [S3]),
  ch("bubun", 2, "マグマのでき方として、講義の内容に合うものはどれですか。", [["マントル上部のかんらん岩の一部がとける（部分溶融）", "正しい。"], ["地殻の花こう岩がすべてとける", "講義ではマントル上部のかんらん岩の部分溶融として説明している。"], ["外核の液体の鉄がしみ出す", "外核は鉄が主成分で、マグマのもとではない。"], ["海水が地下で温められてできる", "マグマはとけた岩石。"]], "マグマ＝マントル上部の部分溶融", "マグマは{{マントル上部}}の{{かんらん岩}}の一部がとける{{部分溶融}}でできる。", [S5]),
  // ---- 発展 ----
  ch("bunka", 3, "結晶分化作用で、マグマが冷えるにつれて残りの液がどう変わるかについて正しいものはどれですか。", [["高温でできるかんらん石や輝石が先に結晶して取り除かれ、残りの液は SiO₂ に富むようになる", "正しい。"], ["石英が先に結晶して、残りの液は SiO₂ が少なくなる", "先に結晶するのは高温でできるかんらん石や輝石。"], ["結晶ができても液の成分は変わらない", "取り除かれる鉱物によって液の成分が変わる。"], ["残りの液は Fe・Mg に富むようになる", "Fe・Mg をふくむ鉱物が先に取り除かれる。"]], "Fe・Mg 鉱物が先に抜ける → 液は SiO₂ に富む", "{{かんらん石・輝石}}が先に結晶して取り除かれ、残りの液は{{SiO₂ に富む}}。", [S5], "思考・判断・表現"),
  ch("tsunagari", 3, "SiO₄ 四面体どうしのつながりが多くなるほど、Si に対する O の割合はどうなりますか。", [["小さくなる", "正しい。酸素を共有するので、Si 1個あたりの O が減る。"], ["大きくなる", "共有するほど O は少なくてすむ。"], ["変わらない", "つながり方によって変わる。"], ["0 になる", "O がなくなることはない。"]], "酸素を共有 → O/Si が小さくなる", "四面体どうしが{{酸素を共有}}してつながるほど、Si に対する O の割合は{{小さく}}なる。", [S1], "思考・判断・表現"),
];

export const H_SCI_EARTH_KOBUTSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "地学",
  minutes: 11,
  review: { status: "draft" },
  sections: [
    {
      title: "色指数の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "taiseki", type: "A", difficulty: 1, points: 17, seconds: 60, skill: "知識・技能", generate: taiseki },
        { id: "point", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: point },
      ],
    },
    { title: "鉱物と火成岩", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
  ],
};
