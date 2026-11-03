// 化学「脂肪族化合物」の単元模試 (B: プール9問から4問 ＋ A: 量の計算2問)。問題はすべてオリジナル。
// 検算 (A): 先に物質量をきれいな値に決め、質量・体積を掛け算で作る。calc (問題の数から答えを出す式) を scripts/check-moshi.ts が
//   シード1〜100で照合する。反応式はレクチャーと同じ: CH₃COOH＋C₂H₅OH ⇄ CH₃COOC₂H₅＋H₂O、
//   CH₃COOC₂H₅＋NaOH → CH₃COONa＋C₂H₅OH、油脂 1 mol＋NaOH 3 mol → セッケン 3 mol＋グリセリン、CaC₂＋2H₂O → C₂H₂＋Ca(OH)₂。
//   式量 酢酸 60、エタノール 46、酢酸エチル 88、NaOH 40、CaC₂ 64、標準状態の気体 22.4 L/mol。油脂の分子量は問題文で与える。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-shibo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "アルカン・アルケン・アルキンは反応のしかたがちがう");
const S2 = L(2, "アルコールは酸化されてアルデヒド、カルボン酸へ");
const S3 = L(3, "アルデヒドは還元性をもつ");
const S4 = L(4, "エステル化とけん化");
const S5 = L(5, "油脂とセッケン");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function ester(r: Rng): QuestionBody {
  const kind = r.pick(["kenka", "seisei"] as const);
  const n = r.pick([0.05, 0.1, 0.2, 0.25, 0.4, 0.5]);
  if (kind === "kenka") {
    const w = f(n * 88);
    const na = f(n * 40);
    return {
      prompt: `酢酸エチル CH₃COOC₂H₅ ${w} g を完全にけん化するのに必要な水酸化ナトリウムは何 g ですか。酢酸エチル＝88、NaOH＝40 とします。`,
      answer: { kind: "num", answerKind: "num", answer: [na], unit: "g", calc: `${w}/88*40` },
      point: "エステル結合1つに NaOH 1つ",
      steps: [
        { title: "反応式", body: "{{CH₃COOC₂H₅＋NaOH → CH₃COONa＋C₂H₅OH}}。エステル：NaOH＝1：1。", back: [S4] },
        { title: "計算", body: `${w}÷88＝${f(n)} mol。NaOH も ${f(n)} mol で、×40＝{{${na} g}}。` },
      ],
    };
  }
  const wa = f(n * 60);
  const we = f(n * 88);
  return {
    prompt: `酢酸 ${wa} g と十分な量のエタノールに濃硫酸を少量加えて加熱し、酢酸をすべてエステルにしたとします。できる酢酸エチルは何 g ですか。酢酸＝60、酢酸エチル＝88 とします。`,
    answer: { kind: "num", answerKind: "num", answer: [we], unit: "g", calc: `${wa}/60*88` },
    point: "酢酸 1 mol から酢酸エチル 1 mol",
    steps: [
      { title: "反応式", body: "{{CH₃COOH＋C₂H₅OH → CH₃COOC₂H₅＋H₂O}}（濃硫酸・加熱）。", back: [S4] },
      { title: "計算", body: `${wa}÷60＝${f(n)} mol。酢酸エチルも ${f(n)} mol で、×88＝{{${we} g}}。`, trap: "酢酸とエタノールの質量を足さない。水がとれて結びつく。" },
    ],
  };
}

function yushi(r: Rng): QuestionBody {
  const kind = r.pick(["yushi", "cac2"] as const);
  if (kind === "yushi") {
    const M = r.pick([878, 884, 890]);
    const n = r.pick([0.01, 0.02, 0.05, 0.1, 0.2]);
    const w = f(n * M);
    const na = f(n * 3 * 40);
    return {
      prompt: `分子量 ${M} の油脂 ${w} g を完全にけん化するのに必要な水酸化ナトリウムは何 g ですか。NaOH＝40 とします。`,
      answer: { kind: "num", answerKind: "num", answer: [na], unit: "g", calc: `${w}/${M}*3*40` },
      point: "油脂はエステル結合3つ → NaOH 3 mol",
      steps: [
        { title: "油脂の物質量", body: `${w}÷${M}＝{{${f(n)} mol}}。`, back: [S5] },
        { title: "NaOH は3倍", body: `油脂はグリセリンに脂肪酸3つがエステル結合したもの。NaOH は ${f(n)}×3＝${f(3 * n)} mol、×40＝{{${na} g}}。`, trap: "酢酸エチルと同じ1：1にしない。油脂1分子にエステル結合は3つ。", back: [S4, S5] },
      ],
    };
  }
  const n = r.pick([0.05, 0.1, 0.25, 0.5, 1.0, 1.5]);
  const w = f(n * 64);
  const V = f(n * 22.4);
  return {
    prompt: `炭化カルシウム CaC₂ ${w} g に水を十分に加えました。発生するアセチレンは標準状態で何 L ですか。CaC₂＝64、気体のモル体積は 22.4 L/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [V], unit: "L", calc: `${w}/64*22.4` },
    point: "CaC₂ 1 mol から C₂H₂ 1 mol",
    steps: [
      { title: "反応式", body: "{{CaC₂＋2H₂O → C₂H₂＋Ca(OH)₂}}。CaC₂：C₂H₂＝1：1。", back: [S1] },
      { title: "計算", body: `${w}÷64＝${f(n)} mol。×22.4＝{{${V} L}}。`, trap: "水の係数2につられて2倍にしない。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("fuka", 1),
    prompt: "エチレンを臭素水に通すと、臭素水の赤褐色が消えます。このとき起こる反応を何といいますか。",
    answer: { kind: "term", accept: ["付加反応", "付加"], near: [{ text: "置換反応", why: "置換反応は H がほかの原子に置きかわる反応（アルカン＋Cl₂・光）。C＝C に臭素が結びつくのは付加反応です。" }] },
    point: "C＝C に原子が結びつく＝付加反応",
    steps: [{ title: "不飽和結合", body: "二重結合の1本が切れて臭素が結びつく{{付加反応}}で、1,2-ジブロモエタンができます。", back: [S1] }],
  },
  {
    ...b("ichikyu", 1),
    prompt: "第一級アルコールを酸化すると、まず何ができますか。",
    answer: {
      kind: "choice",
      options: ["アルデヒド", "ケトン", "エステル", "エーテル"],
      correct: 0,
      why: ["第一級アルコール → アルデヒド → カルボン酸と酸化される。", "ケトンになるのは第二級アルコール。", "エステルはカルボン酸とアルコールの縮合でできる。", "エーテルはアルコール2分子から水がとれてできる。"],
    },
    point: "第一級 → アルデヒド → カルボン酸",
    steps: [{ title: "酸化の道すじ", body: "{{第一級アルコール → アルデヒド → カルボン酸}}。第二級はケトンになります。", back: [S2] }],
  },
  {
    ...b("sekken", 1),
    prompt: "油脂に水酸化ナトリウム水溶液を加えて加熱すると、グリセリンと何ができますか。",
    answer: { kind: "term", accept: ["セッケン", "せっけん", "石けん", "石鹸", "脂肪酸ナトリウム"], near: [{ text: "エステル", why: "油脂そのものがエステル。けん化で分解されてできるのは脂肪酸ナトリウム（セッケン）です。" }] },
    point: "油脂のけん化 → セッケン＋グリセリン",
    steps: [{ title: "けん化", body: "油脂をけん化すると、グリセリンと脂肪酸ナトリウム（{{セッケン}}）ができます。", back: [S5] }],
  },
  // ---- 標準 ----
  {
    ...b("aceton", 2, "思考・判断・表現"),
    prompt: "2-プロパノールを酸化してできる物質と、その物質の性質の組み合わせとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["アセトン ― 銀鏡反応を示さない", "アセトン ― 銀鏡反応を示す", "プロピオンアルデヒド ― 銀鏡反応を示す", "酢酸 ― 弱い酸性を示す"],
      correct: 0,
      why: ["第二級アルコールの酸化でケトンのアセトンができる。ケトンは還元性を示さない。", "アセトンはホルミル基をもたないので銀鏡反応を示さない。", "アルデヒドになるのは第一級アルコール。", "2-プロパノールの酸化ではカルボン酸はできない。"],
    },
    point: "第二級 → ケトン。ケトンは還元性なし",
    steps: [{ title: "第二級アルコール", body: "2-プロパノールは第二級なので{{アセトン（ケトン）}}になり、{{銀鏡反応を示しません}}。", back: [S2, S3] }],
  },
  {
    ...b("iodoform", 2, "思考・判断・表現"),
    prompt: "次の物質のうち、ヨードホルム反応を示すものはどれですか。",
    answer: {
      kind: "choice",
      options: ["エタノール", "メタノール", "酢酸", "ホルムアルデヒド"],
      correct: 0,
      why: ["CH₃CH(OH)− の構造をもつので、黄色の CHI₃ が生じる。", "CH₃OH には CH₃CH(OH)− も CH₃CO− もない。", "酢酸は示さない。", "HCHO には CH₃CO− の構造がない。"],
    },
    point: "CH₃CH(OH)− か CH₃CO− があれば示す",
    steps: [{ title: "必要な構造", body: "{{CH₃CH(OH)−}} または {{CH₃CO−}} をもつ物質が、黄色の CHI₃ を生じます。", back: [S3] }],
  },
  {
    ...b("ester-ka", 2),
    prompt: "エステル化について正しく述べたものはどれですか。",
    answer: {
      kind: "choice",
      options: ["カルボン酸とアルコールから水がとれて結びつく可逆反応", "カルボン酸とアルコールの中和反応", "エステルに NaOH を加えて分解する反応", "アルコールが酸化される反応"],
      correct: 0,
      why: ["−COOH の OH とアルコールの H から水がとれる縮合で、可逆反応。濃硫酸を触媒にして加熱する。", "アルコールは塩基ではないので中和ではない。", "それはけん化。", "エステル化は酸化ではない。"],
    },
    point: "エステル化は縮合で、可逆反応",
    steps: [{ title: "縮合", body: "カルボン酸とアルコールから{{水がとれて}}結びつきます。{{可逆反応}}なので、水が多いと加水分解します。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...b("dasshi", 3, "思考・判断・表現"),
    prompt: "エタノールに濃硫酸を加えて加熱するとき、約130℃ と約170℃ でおもにできる物質の組み合わせとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["130℃ ジエチルエーテル、170℃ エチレン", "130℃ エチレン、170℃ ジエチルエーテル", "どちらもエチレン", "どちらも酢酸エチル"],
      correct: 0,
      why: ["約130℃では2分子の間から水がとれてエーテル、約170℃では1分子から水がとれてエチレン（脱離反応）。", "温度が逆。", "約130℃ではエーテルができる。", "酢酸エチルはカルボン酸とアルコールからできる。"],
    },
    point: "130℃ 分子間でエーテル、170℃ 分子内でエチレン",
    steps: [{ title: "温度でちがう", body: "約130℃は{{2分子の間}}から水がとれてジエチルエーテル、約170℃は{{1分子から}}水がとれてエチレン。", back: [S1] }],
  },
  {
    ...b("koushui", 3, "思考・判断・表現"),
    prompt: "セッケンを硬水（Ca²⁺ や Mg²⁺ を多くふくむ水）で使うと泡立ちが悪くなります。その理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Ca²⁺ や Mg²⁺ と水に溶けにくい塩をつくるから", "硬水は酸性で、セッケンが中和されるから", "硬水ではセッケンがけん化されるから", "硬水ではミセルが大きくなりすぎるから"],
      correct: 0,
      why: ["脂肪酸の陰イオンが Ca²⁺・Mg²⁺ と溶けにくい塩をつくり、洗浄力が落ちる。", "硬水の問題は Ca²⁺・Mg²⁺ で、酸性かどうかではない。", "けん化はセッケンができる反応。", "原因は溶けにくい塩ができること。"],
    },
    point: "セッケン＋Ca²⁺・Mg²⁺ → 溶けにくい塩",
    steps: [{ title: "硬水とセッケン", body: "セッケンは Ca²⁺・Mg²⁺ と{{水に溶けにくい塩}}をつくります。合成洗剤は硬水でも沈殿をつくりにくい。", back: [S5] }],
  },
  {
    ...b("gisan", 3, "思考・判断・表現"),
    prompt: "カルボン酸なのに銀鏡反応を示すものはどれですか。",
    answer: {
      kind: "choice",
      options: ["ギ酸 HCOOH", "酢酸 CH₃COOH", "アセトン CH₃COCH₃", "エタノール C₂H₅OH"],
      correct: 0,
      why: ["ギ酸はカルボキシ基とともにホルミル基の構造をもつので還元性がある。", "酢酸はホルミル基をもたない。", "アセトンはケトンで、カルボン酸でもなく、還元性も示さない。", "エタノールはアルコール。"],
    },
    point: "ギ酸はホルミル基をもち、還元性がある",
    steps: [{ title: "ギ酸の構造", body: "ギ酸 HCOOH は{{ホルミル基}}の構造をふくむので、銀鏡反応やフェーリング液の還元を示します。", back: [S3] }],
  },
];

export const H_SCI_CHEM_SHIBO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "draft" },
  sections: [
    {
      title: "脂肪族化合物の反応",
      lead: "次の問いに答えなさい。",
      style: "word",
      pick: 4,
      questions: POOL,
    },
    {
      title: "反応の量の関係",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "ester", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: ester },
        { id: "yushi", type: "A", difficulty: 3, points: 18, seconds: 120, skill: "思考・判断・表現", generate: yushi },
      ],
    },
  ],
};
