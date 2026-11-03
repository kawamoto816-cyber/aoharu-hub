// 高校政治・経済「国民所得と経済成長」の単元模試。問題はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 大問1 (A: 生成型 3問) … 付加価値とGDP、GDP→GNI→NNP→NI、名目・実質と実質経済成長率の計算。数値はシードで変わる (数値はすべて仮のもの)。
//   検算方法: 付加価値は各段階の売上を先に決めて差で作る。NI などは足し引きだけ。実質成長率は、前年の実質GDP (100の倍数) と成長率 g (整数%) を先に決め、
//   今年の実質GDP＝前年×(100+g)/100、名目GDP＝実質×デフレーター/100 と作る (前年をデフレーター100の基準年とする) ので、答えは必ず整数になる。
//   num の calc に「問題の数から答えを出す式」を書き、scripts/check-moshi.ts がシード1〜100で答えと照合する (有理数で厳密に計算)。
// 大問2 (B: プール9問から3問) … 基本3・標準3・発展3。1回に基本・標準・発展を1問ずつ (15＋17＋18＝50点)。大問1 (15＋17＋18＝50点) と合わせて100点。
// 事実はレクチャー (lib/lecture/data/h-civ-seikei-shotoku.ts) の記述に合わせている。統計の実数は問わない。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-civ-seikei-shotoku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "フローとストック、そして付加価値");
const S2 = L(2, "GDP から国民所得へ：引く・足すの順番");
const S3 = L(3, "三面等価の原則");
const S4 = L(4, "GDP にふくまれるもの・ふくまれないもの");
const S5 = L(5, "名目と実質、そして景気循環");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

/** 付加価値の合計＝GDP */
function fukaKachi(r: Rng): QuestionBody {
  const [g1, g2, g3, who] = r.pick([
    ["小麦", "小麦粉", "パン", ["農家", "製粉会社", "パン屋"]],
    ["綿花", "綿糸", "シャツ", ["農家", "紡績会社", "衣料品メーカー"]],
    ["牛乳", "チーズ", "ピザ", ["酪農家", "乳製品メーカー", "ピザ店"]],
  ] as const);
  const a = r.step(20, 60, 10);
  const b = a + r.step(20, 50, 10);
  const c = b + r.step(30, 80, 10);
  const ask = r.pick(["gdp", "mid", "last"] as const);
  const q = { gdp: "この3つの生産で生み出された付加価値の合計（GDPにあたる額）は何万円", mid: `${who[1]}が生み出した付加価値は何万円`, last: `${who[2]}が生み出した付加価値は何万円` }[ask];
  const ans = { gdp: c, mid: b - a, last: c - b }[ask];
  const calc = { gdp: `${a}+(${b}-${a})+(${c}-${b})`, mid: `${b}-${a}`, last: `${c}-${b}` }[ask];
  return {
    prompt: `${who[0]}が${g1}を ${a}万円で${who[1]}に売り、${who[1]}はそれを${g2}にして ${b}万円で${who[2]}に売り、${who[2]}は${g3}をつくって ${c}万円で消費者に売りました（${who[0]}の原材料費は0とします）。${q}ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "万円", calc },
    point: "付加価値＝売上−中間生産物",
    steps: [
      { title: "各段階の付加価値", body: `${who[0]} ${a}、${who[1]} ${b}−${a}＝${b - a}、${who[2]} ${c}−${b}＝${c - b}（万円）。`, back: [S1] },
      {
        title: "答え",
        body: ask === "gdp" ? `合計は ${a}＋${b - a}＋${c - b}＝{{${c}}}（万円）。最終生産物の${g3}の価格と等しくなります。` : `求める付加価値は {{${ans}}}万円。`,
        trap: ask === "gdp" ? `売上を全部足して ${a + b + c} にしない（二重計算）。` : "売上そのものではなく、仕入れ（中間生産物）を引いた分。",
      },
    ],
  };
}

/** GDP → GNI → NNP → NI */
function kokuminShotoku(r: Rng): QuestionBody {
  const gdp = r.step(500, 600, 10);
  const uke = r.int(30, 50);
  const shi = r.int(10, 25);
  const gen = r.int(100, 130);
  const tax = r.int(40, 60);
  const sub = r.int(2, 6);
  const gni = gdp + uke - shi;
  const nnp = gni - gen;
  const ni = nnp - tax + sub;
  const ask = r.pick(["GNI（国民総所得）", "NNP（国民純生産）", "NI（国民所得）"] as const);
  const ans = ask.startsWith("GNI") ? gni : ask.startsWith("NNP") ? nnp : ni;
  const calc = ask.startsWith("GNI") ? `${gdp}+${uke}-${shi}` : ask.startsWith("NNP") ? `${gdp}+${uke}-${shi}-${gen}` : `${gdp}+${uke}-${shi}-${gen}-${tax}+${sub}`;
  return {
    prompt: `ある国の1年間の数値（仮のもの）が、GDP ${gdp}兆円、海外からの所得の受け取り ${uke}兆円、海外への所得の支払い ${shi}兆円、固定資本減耗 ${gen}兆円、間接税 ${tax}兆円、補助金 ${sub}兆円でした。${ask}は何兆円ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "兆円", calc },
    point: "GNI→−減耗→NNP→−間接税＋補助金→NI",
    steps: [
      { title: "GNI", body: `GDP＋受け取り−支払い＝${gdp}＋${uke}−${shi}＝{{${gni}}}。`, back: [S2] },
      { title: "NNP", body: `GNI−固定資本減耗＝${gni}−${gen}＝{{${nnp}}}。` },
      { title: "NI", body: `NNP−間接税＋補助金＝${nnp}−${tax}＋${sub}＝{{${ni}}}。`, trap: "補助金は引くのではなく足しもどす。" },
    ],
  };
}

/** 名目・実質と実質経済成長率 */
function jisshitsu(r: Rng): QuestionBody {
  const r0 = r.pick([400, 500, 600]);
  const g = r.pick([-2, -1, 1, 2, 3, 4, 5]);
  const r1 = (r0 * (100 + g)) / 100;
  const d1 = r.pick([96, 98, 102, 104, 105, 110]);
  const n1 = (r1 * d1) / 100;
  const nomG = ((n1 - r0) / r0) * 100;
  const askG = r.bool(0.6);
  const head = `ある国の名目GDPは、前年が ${r0}兆円、今年が ${f(n1)}兆円でした。前年を基準年（GDPデフレーター100）とすると、今年のGDPデフレーターは ${d1} です（数値は仮のもの）。`;
  return {
    prompt: head + (askG ? "今年の実質経済成長率は何%ですか。" : "今年の実質GDPは何兆円ですか。"),
    answer: askG
      ? { kind: "num", answerKind: "num", answer: [String(g)], unit: "%", calc: `(${f(n1)}/${d1}*100-${r0})/${r0}*100` }
      : { kind: "num", answerKind: "num", answer: [f(r1)], unit: "兆円", calc: `${f(n1)}/${d1}*100` },
    point: "実質GDP＝名目GDP÷(デフレーター÷100)",
    steps: [
      { title: "今年の実質GDP", body: `${f(n1)}÷(${d1}÷100)＝{{${f(r1)}}}（兆円）。前年は基準年なので実質も ${r0}兆円。`, back: [S5] },
      {
        title: "実質経済成長率",
        body: `(${f(r1)}−${r0})÷${r0}×100＝{{${g}}}（%）。`,
        trap: `名目で計算すると ${f(nomG)}% になる。物価の${d1 > 100 ? "上昇" : "下落"}分を取りのぞくのが実質。`,
      },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("stock", 1),
    prompt: "次のうち、{{ストック}}にあたるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["国富", "GDP（国内総生産）", "国民所得", "1年間の民間最終消費支出"],
      correct: 0,
      why: ["正しい。ある時点でたくわえられている実物資産と対外純資産。", "1年間に生み出された量なのでフロー。", "フロー。", "1年間の支出なのでフロー。"],
    },
    point: "期間の量＝フロー、時点の量＝ストック",
    steps: [{ title: "フローとストック", body: "1年間に流れた量が {{フロー}}（GDP・国民所得）、ある時点のたくわえが {{ストック}}（{{国富}}）。", back: [S1] }],
  },
  {
    ...base("fukumanai", 1),
    prompt: "次のうち、GDPに{{ふくまれない}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["家族のための料理や洗濯などの家事労働", "外食の代金", "持ち家に住む人が自分に払っているとみなす家賃", "不動産会社が受け取る仲介手数料"],
      correct: 0,
      why: ["ふくまれない。代金のやりとりがなく価格がつかない。", "市場で取り引きされたサービスなのでふくまれる。", "帰属計算で例外的にふくめる。", "その年に提供された新しいサービスなのでふくまれる。"],
    },
    point: "市場で取り引きされない家事はふくまない",
    steps: [{ title: "ふくまれるか", body: "原則は {{市場で取り引きされた財・サービス}}。例外として {{帰属家賃}}・農家の自家消費をふくめます。", back: [S4] }],
  },
  {
    ...base("sanmen", 1),
    prompt: "生産・分配・支出の3つの面から見た国民所得が、理論上等しくなることを何といいますか。",
    answer: { kind: "term", accept: ["三面等価の原則", "三面等価"], script: "kanji" },
    point: "生産＝分配＝支出（三面等価）",
    steps: [{ title: "3つの面", body: "生み出された付加価値は所得として分配され、支出に使われる → {{三面等価の原則}}。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("gdp-gni", 2, "思考・判断・表現"),
    prompt: "日本企業が海外に建てた工場の生産と、そこから日本の本社に送られた配当の扱いとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["工場の生産はその国のGDPに入り、日本へ送られた配当は日本のGNIにふくまれる", "工場の生産は日本のGDPに入る", "配当は日本のGNIにもGDPにもふくまれない", "工場の生産も配当も、その国のGNIだけにふくまれる"],
      correct: 0,
      why: ["正しい。GDPは国内で、GNIは国民（居住者）の受け取る所得で区切る。", "GDPは場所（国内）で区切るので、海外工場の生産は入らない。", "海外から受け取った所得として日本のGNIに足される。", "配当は日本の居住者の所得なので日本のGNIに入る。"],
    },
    point: "GDP＝国内、GNI＝国民（居住者）",
    steps: [{ title: "区切り方のちがい", body: "{{GDP}}は国境の内側、{{GNI}}は居住者が受け取る所得。GNI＝GDP＋海外からの所得−海外への所得。", back: [S2] }],
  },
  {
    ...base("kizoku", 2),
    prompt: "持ち家に住む人が自分に家賃を払っているとみなし、GDPに加える額を何といいますか。",
    answer: { kind: "term", accept: ["帰属家賃"], script: "kanji", near: [{ text: "帰属計算", why: "帰属計算は、こうした見積もり全体の名前です。持ち家の家賃にあたるものは「帰属家賃」。" }] },
    point: "持ち家の家賃＝帰属家賃",
    steps: [{ title: "帰属計算", body: "市場で取り引きされていなくても例外的に見積もる。{{帰属家賃}}や農家の自家消費です。", back: [S4] }],
  },
  {
    ...base("nami", 2),
    prompt: "景気の波と、その主な原因の組み合わせとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["ジュグラーの波（約10年）― 設備投資", "キチンの波（約40か月）― 技術革新", "コンドラチェフの波（約50年）― 在庫投資", "クズネッツの波（約20年）― 設備投資"],
      correct: 0,
      why: ["正しい。", "キチンの波は在庫投資の変動による。", "コンドラチェフの波は技術革新による。", "クズネッツの波は建設投資による。"],
    },
    point: "キチン在庫・ジュグラー設備・クズネッツ建設・コンドラチェフ技術",
    steps: [{ title: "4つの波", body: "{{キチン}}（約40か月・在庫）、{{ジュグラー}}（約10年・設備）、{{クズネッツ}}（約20年・建設）、{{コンドラチェフ}}（約50年・技術革新）。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...base("zaiko", 3, "思考・判断・表現"),
    prompt: "ある会社が車を100台つくり、80台しか売れませんでした。それでも生産と支出が等しくなる理由として、最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["売れ残った20台は、会社が自分で買った在庫投資として支出に数えるから", "売れ残った20台は、生産からも差し引くから", "売れ残った20台は、政府が買い取ったとみなすから", "売れ残りは翌年のGDPに数えるから"],
      correct: 0,
      why: ["正しい。だから生産と支出は理論上かならず等しくなる。", "生産はつくった100台分で数える。", "政府が買い取るとはみなさない。", "その年の在庫投資として数える。"],
    },
    point: "売れ残り＝在庫投資として支出に",
    steps: [{ title: "在庫投資", body: "売れ残りも企業が自分で買った {{在庫投資}} とみなすので、生産＝支出になります。", back: [S3] }],
  },
  {
    ...base("meimoku", 3, "思考・判断・表現"),
    prompt: "名目経済成長率が2%で、物価が4%上がった年について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["物価の上昇率が名目成長率を上回っているので、実質経済成長率はマイナスになる", "名目成長率がプラスなので、生産量は必ず増えている", "実質経済成長率は6%になる", "物価が上がると、名目成長率は実質成長率より低くなる"],
      correct: 0,
      why: ["正しい。生産量の伸びは実質で見る。", "物価が上がっただけでも名目はプラスになる。", "物価の上昇分は引く（およそ2−4＝−2%）。足さない。", "インフレのときは名目が実質を上回る。"],
    },
    point: "インフレ時は名目＞実質",
    steps: [{ title: "名目と実質", body: "物価上昇分を取りのぞいたのが実質。{{インフレ}}のときは名目が実質を上回り、{{デフレ}}のときは逆になります。", back: [S5] }],
  },
  {
    ...base("nnw", 3),
    prompt: "1970年代の日本で試算された、余暇や家事の価値を加え、公害などの損失を差し引いた豊かさの指標を何といいますか。",
    answer: {
      kind: "choice",
      options: ["NNW（国民純福祉）", "NNP（国民純生産）", "GNI（国民総所得）", "GDPデフレーター"],
      correct: 0,
      why: ["正しい。GDPの限界を補う試み。", "NNPはGNIから固定資本減耗を引いたもの。", "GNIは居住者が受け取る所得。", "GDPデフレーターは名目と実質の比を表す物価指数。"],
    },
    point: "GDPを補う物差し＝NNW・グリーンGDP・HDI",
    steps: [{ title: "GDPの限界", body: "公害の後始末でもGDPは増える。そこで {{NNW}}、グリーンGDP、人間開発指数（HDI）などが使われます。", back: [S4] }],
  },
];

export const H_CIV_SEIKEI_SHOTOKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "soc",
  grade: "政治・経済",
  minutes: 13,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "GDP・国民所得・成長率を計算する",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "fuka-kachi", type: "A", difficulty: 1, points: 15, seconds: 90, skill: "知識・技能", generate: fukaKachi },
        { id: "kokumin-shotoku", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: kokuminShotoku },
        { id: "jisshitsu", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: jisshitsu },
      ],
    },
    { title: "国民所得と経済成長のしくみ", lead: "次の問いに答えなさい。", style: "mix", pick: 3, questions: POOL },
  ],
};
