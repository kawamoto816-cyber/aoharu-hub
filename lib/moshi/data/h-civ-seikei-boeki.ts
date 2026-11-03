// 高校政治・経済「国際経済と貿易」の単元模試。問題はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 大問1 (A: 生成型 2問) … 比較生産費説 (比較優位をもつ財に特化したときの生産量) と、為替相場の計算 (外貨建て価格・購買力平価)。数値はシードで変わる。
//   検算方法: 比較生産費は、1単位に必要な労働者数を 40・50・100・125・200・250 人から選ぶ (どれも1000の約数なので、特化後の生産量は小数第3位までで割り切れる)。
//   2国の機会費用 (a1/a2 と b1/b2) が等しい組は選び直す。比較優位の判定は a1·b2 と b1·a2 の大小で行う。
//   為替は、円建て価格がレートで割り切れる組だけを使う。num の calc に「問題の数から答えを出す式」を書き、scripts/check-moshi.ts がシード1〜100で照合する (有理数で厳密に計算)。
// 大問2 (B: プール9問から4問) … 基本3・標準3・発展3。1回に基本2・標準1・発展1 (15×2＋17＋18＝65点)。大問1 (17＋18＝35点) と合わせて100点。
// 事実・年はレクチャー (lib/lecture/data/h-civ-seikei-boeki.ts) の記述に合わせている。
// 自由貿易と保護貿易のどちらが正しいか、円高と円安のどちらが望ましいかなど、立場で評価が分かれる点は問わない (しくみだけを問う)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-civ-seikei-boeki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "比較優位は「何をあきらめるか」で比べる");
const S2 = L(2, "国際分業の利益と、自由貿易・保護貿易");
const S3 = L(3, "国際収支：国と外国との取引の記録");
const S4 = L(4, "為替相場は通貨の需要と供給で決まる");
const S5 = L(5, "円高・円安の影響は立場で変わる");
const S6 = L(6, "固定相場制から変動相場制へ");
const S7 = L(7, "GATTからWTOへ：自由貿易のルール");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const WORKERS = [40, 50, 100, 125, 200, 250] as const;
const PAIRS = [
  ["小麦", "自動車"],
  ["衣類", "機械"],
  ["米", "電子部品"],
  ["ワイン", "織物"],
] as const;

/** 比較生産費説：比較優位をもつ財に特化したときの生産量 */
function hikakuSeisanhi(r: Rng): QuestionBody {
  let a1 = 0, a2 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < 50; i++) {
    [a1, a2, b1, b2] = [r.pick(WORKERS), r.pick(WORKERS), r.pick(WORKERS), r.pick(WORKERS)];
    if (a1 * b2 !== b1 * a2) break;
  }
  if (a1 * b2 === b1 * a2) [a1, a2, b1, b2] = [100, 125, 50, 40];
  const [x, y] = r.pick(PAIRS);
  const askA = r.bool();
  // A国がXに比較優位をもつのは a1/a2 < b1/b2
  const aInX = a1 * b2 < b1 * a2;
  const [me, w1, w2, other] = askA ? ["A国", a1, a2, "B国"] : ["B国", b1, b2, "A国"];
  const meInX = askA ? aInX : !aInX;
  const good = meInX ? x : y;
  const per = meInX ? w1 : w2;
  const total = w1 + w2;
  const ans = total / per;
  const ocA = f(a1 / a2);
  const ocB = f(b1 / b2);
  return {
    prompt: `${x}と${y}をそれぞれ1単位つくるのに必要な労働者の数は、A国では${x} ${a1}人・${y} ${a2}人、B国では${x} ${b1}人・${y} ${b2}人です。どちらの国も、いまは両方の財を1単位ずつつくっています。${me}が比較優位をもつ財の生産に、${me}の労働者（${total}人）を全員うつすと、その財を何単位つくれますか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(ans)], unit: "単位", calc: `(${w1}+${w2})/${per}` },
    point: "比較優位は機会費用（あきらめる量）で比べる",
    steps: [
      { title: `${x}の機会費用`, body: `${x}1単位のためにあきらめる${y}は、A国 ${a1}÷${a2}＝${ocA}、B国 ${b1}÷${b2}＝${ocB}（単位）。`, back: [S1] },
      { title: "比較優位", body: `${x}の機会費用が小さい${aInX ? "A国" : "B国"}が${x}に、もう一方の${aInX ? "B国" : "A国"}が${y}に比較優位をもちます。だから${me}は{{${good}}}に特化します。`, trap: `人数の大小（絶対優位）だけで決めない。${other}と比べるのは、自国の中での得意・不得意です。` },
      { title: "特化後の生産量", body: `${total}÷${per}＝{{${f(ans)}}}（単位）。1単位より多くなり、交換すれば両国とも得をします。`, back: [S2] },
    ],
  };
}

/** 為替相場の計算 */
function kawase(r: Rng): QuestionBody {
  if (r.bool(0.6)) {
    // 円建て価格 → ドル建て価格 (レートが変わる)
    let man = 200, r1 = 100, r2 = 80;
    for (let i = 0; i < 60; i++) {
      man = r.pick([150, 200, 240, 300, 360]);
      r1 = r.pick([100, 120, 125, 150]);
      r2 = r.pick([80, 100, 120, 125, 150, 160, 200]);
      if (r1 !== r2 && (man * 10000) % r1 === 0 && (man * 10000) % r2 === 0) break;
    }
    if (r1 === r2 || (man * 10000) % r1 !== 0 || (man * 10000) % r2 !== 0) [man, r1, r2] = [200, 100, 80];
    const d1 = (man * 10000) / r1;
    const d2 = (man * 10000) / r2;
    const daka = r2 < r1;
    return {
      prompt: `日本で ${man}万円の自動車をアメリカに輸出します（輸送費などは考えない）。為替相場が1ドル＝${r1}円から1ドル＝${r2}円に変わると、アメリカでの価格は何ドルになりますか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(d2)], unit: "ドル", calc: `${man}*10000/${r2}` },
      point: "ドル建て価格＝円建て価格÷（1ドルあたりの円）",
      steps: [
        { title: "変わる前", body: `${man * 10000}÷${r1}＝${d1}（ドル）。`, back: [S4] },
        { title: "変わった後", body: `${man * 10000}÷${r2}＝{{${d2}}}（ドル）。`, trap: "円の金額にレートを掛けない。1ドルを何円で買えるかで割ります。" },
        { title: "読みとる", body: `1ドル＝${r1}円→${r2}円は{{${daka ? "円高" : "円安"}}}。アメリカでの値段が${daka ? "上がり、輸出には不利" : "下がり、輸出には有利"}になります。`, back: [S5] },
      ],
    };
  }
  // 購買力平価
  const rate = r.pick([100, 110, 120, 125, 140, 150]);
  const usd = r.pick([3, 4, 5, 6]);
  const yen = rate * usd;
  const item = r.pick(["ハンバーガー", "コーヒー1杯", "ノート1冊", "サンドイッチ"]);
  return {
    prompt: `同じ${item}が、日本では ${yen}円、アメリカでは ${usd}ドルで売られています。購買力平価の考え方では、為替相場の目安は1ドル＝何円ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(rate)], labels: ["1ドル＝"], unit: "円", calc: `${yen}/${usd}` },
    point: "購買力平価＝同じ物が同じ値段になる相場",
    steps: [
      { title: "同じ値段になる相場", body: `${usd}ドル＝${yen}円 なので、1ドル＝${yen}÷${usd}＝{{${rate}}}（円）。`, back: [S4] },
      { title: "注意", body: "購買力平価は長い目で見た目安で、短期的には投資のお金の動きで相場は大きくゆれます。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("ricardo", 1),
    prompt: "比較生産費説を説き、自由貿易を主張した19世紀前半のイギリスの経済学者はだれですか。",
    answer: { kind: "term", accept: ["リカード", "リカードウ"], script: "any", near: [{ text: "リスト", why: "リストは、幼稚産業を守る保護貿易を説いたドイツの経済学者です。" }] },
    point: "比較生産費説＝リカード、保護貿易＝リスト",
    steps: [{ title: "2人の経済学者", body: "{{リカード}}は比較生産費説で {{自由貿易}} を、{{リスト}}は {{幼稚産業}} を守る {{保護貿易}} を説きました。", back: [S1, S2] }],
  },
  {
    ...base("endaka", 1),
    prompt: "為替相場が1ドル＝100円から1ドル＝80円になりました。このことを何といいますか。",
    answer: {
      kind: "choice",
      options: ["円高", "円安", "ドル高", "変化していない"],
      correct: 0,
      why: ["正しい。1ドルを前より少ない円で買えるので、円の価値が上がった。", "1ドル＝120円のように、多くの円が必要になるのが円安。", "ドルの価値は下がったのでドル安。", "円の価値が上がっている。"],
    },
    point: "数字が小さくなる＝円高",
    steps: [{ title: "円の価値", body: "1ドルを買うのに必要な円が {{減った}} → 円の価値が上がった → {{円高}}。", trap: "数字が小さくなったから円安、と考えない。", back: [S4] }],
  },
  {
    ...base("wto", 1),
    prompt: "ウルグアイ・ラウンドの合意を受けて1995年に発足した、貿易のルールを定め紛争を解決する国際機関は何ですか。",
    answer: { kind: "term", accept: ["WTO", "世界貿易機関", "WTO（世界貿易機関）"], script: "any", near: [{ text: "GATT", why: "GATT（1947年）は協定で、正式な国際機関として発足したのがWTOです。" }] },
    point: "GATT(1947)→WTO(1995)",
    steps: [{ title: "協定から機関へ", body: "{{GATT}}の {{ウルグアイ・ラウンド}}（1986〜94年）でサービスや知的財産権もルールの対象になり、{{WTO}} が発足しました。", back: [S7] }],
  },
  // ---- 標準 ----
  {
    ...base("kinri", 2, "思考・判断・表現"),
    prompt: "次のうち、{{円高}}の要因になるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["日本の金利が外国より高くなる", "日本企業の海外投資が増える", "日本の輸入代金の支払いが増える", "日本人の海外旅行が増える"],
      correct: 0,
      why: ["正しい。円で資金を運用しようとする人が増え、円の需要が増える。", "円を売ってドルなどを買うので円安の要因。", "円を売ってドルを買うので円安の要因。", "円を外貨に替えるので円安の要因。"],
    },
    point: "円を買う動き＝円高、円を売る動き＝円安",
    steps: [{ title: "通貨の需要と供給", body: "輸出代金の円転・外国人旅行者・{{日本の金利上昇}} → 円を買う → {{円高}}。輸入・海外投資 → 円を売る → {{円安}}。", back: [S4] }],
  },
  {
    ...base("shotoku-shushi", 2),
    prompt: "日本企業が海外の子会社から受け取る配当や、外国の債券の利子が記録される国際収支の項目はどれですか。",
    answer: {
      kind: "choice",
      options: ["第一次所得収支", "貿易収支", "第二次所得収支", "資本移転等収支"],
      correct: 0,
      why: ["正しい。経常収支の一部で、近年は大きな黒字が経常収支を支えている。", "モノの輸出入。", "対価をともなわない援助や仕送りなど。", "経常収支・金融収支とは別の項目。"],
    },
    point: "利子・配当＝第一次所得収支",
    steps: [{ title: "経常収支の3つ", body: "{{貿易・サービス収支}}、{{第一次所得収支}}（利子・配当・賃金）、{{第二次所得収支}}（援助・仕送り）。", back: [S3] }],
  },
  {
    ...base("bretton", 2),
    prompt: "1944年のブレトン・ウッズ協定でつくられ、為替相場の安定をはかり、国際収支が赤字の国に短期の資金を貸す機関はどれですか。",
    answer: {
      kind: "choice",
      options: ["国際通貨基金（IMF）", "国際復興開発銀行（IBRD）", "世界貿易機関（WTO）", "関税と貿易に関する一般協定（GATT）"],
      correct: 0,
      why: ["正しい。", "IBRD（世界銀行）は戦後の復興や開発のための長期の資金を貸す。", "WTOは1995年発足の貿易の機関。", "GATTは1947年の貿易の協定。"],
    },
    point: "IMF＝短期・為替、IBRD＝長期・復興開発",
    steps: [{ title: "ブレトン・ウッズ体制", body: "{{IMF}}と {{IBRD}} がつくられ、ドルを {{基軸通貨}} とする金・ドル本位制になりました。円は1949年に1ドル＝360円。", back: [S6] }],
  },
  // ---- 発展 ----
  {
    ...base("hendo", 3),
    prompt: "戦後の為替制度の移り変わりを、古い順に並べなさい。",
    answer: { kind: "order", tokens: ["1ドル＝360円の固定相場", "ニクソン・ショック（金とドルの交換停止）", "スミソニアン協定（1ドル＝308円）", "主要国が変動相場制へ移る", "キングストン合意で変動相場制を正式に承認"] },
    point: "1949→1971→1971→1973→1976",
    steps: [{ title: "年を確かめる", body: "360円 {{1949年}} → ニクソン・ショック {{1971年}} → 同年スミソニアン協定 → 変動相場制 {{1973年}} → キングストン合意 {{1976年}}。", trap: "ニクソン・ショックですぐに変動相場制になったわけではない。", back: [S6] }],
  },
  {
    ...base("saikei", 3),
    prompt: "GATTの「無差別」の原則のうち、ある国に認めた有利な条件を、ほかのすべての加盟国にも認めることを何といいますか。",
    answer: { kind: "term", accept: ["最恵国待遇"], script: "kanji", near: [{ text: "内国民待遇", why: "内国民待遇は、輸入品を国産品と同じように扱うことです。" }] },
    point: "無差別＝最恵国待遇と内国民待遇",
    steps: [{ title: "自由・無差別・多角", body: "無差別の中身は {{最恵国待遇}} と {{内国民待遇}}。例外に緊急輸入制限（{{セーフガード}}）があります。", back: [S7] }],
  },
  {
    ...base("bungyo", 3, "思考・判断・表現"),
    prompt: "部品を何か国もの工場でつくって別の国で組み立てるなど、同じ産業の中で製品や部品を輸出し合う貿易を何といいますか。",
    answer: {
      kind: "choice",
      options: ["産業内貿易", "垂直的分業", "ブロック経済", "セーフガード"],
      correct: 0,
      why: ["正しい。近年増えている。", "垂直的分業は、先進国が工業製品を、発展途上国が一次産品を作って交換すること。", "ブロック経済は、1930年代に本国と植民地などで囲いこんだ経済。", "セーフガードは緊急輸入制限。"],
    },
    point: "垂直的・水平的分業と産業内貿易",
    steps: [{ title: "分業の型", body: "{{垂直的分業}}（工業製品と一次産品）、{{水平的分業}}（工業製品どうし）、{{産業内貿易}}（同じ産業の中で部品なども）。", back: [S2] }],
  },
];

export const H_CIV_SEIKEI_BOEKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "soc",
  grade: "政治・経済",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "比較生産費と為替を計算する",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hikaku-seisanhi", type: "A", difficulty: 3, points: 18, seconds: 180, skill: "思考・判断・表現", generate: hikakuSeisanhi },
        { id: "kawase", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: kawase },
      ],
    },
    { title: "国際経済のしくみ", lead: "次の問いに答えなさい。", style: "mix", pick: 4, questions: POOL },
  ],
};
