// 化学「芳香族化合物」の単元模試 (B: プール9問から4問 ＋ A: 生成量の計算2問)。問題はすべてオリジナル。
// 検算 (A): 原料の物質量をきれいな値に決め、質量を掛け算で作る。calc (問題の数から答えを出す式) を scripts/check-moshi.ts が
//   シード1〜100で照合する。どの反応も原料 1 mol から生成物 1 mol (環の H が1つ置きかわる・官能基が1つ変わる)。
//   分子量 ベンゼン 78、ニトロベンゼン 123、ベンゼンスルホン酸 158、アニリン 93、サリチル酸 138、
//   アセチルサリチル酸 180、サリチル酸メチル 152 (H 1、C 12、N 14、O 16、S 32 から) は問題文で与える。
//   B の事実 (置換反応・呈色反応・酸の強さの順・分離の順) はレクチャーの記述だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-hokozoku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "ベンゼンの構造：二重結合なのに付加しにくい");
const S2 = L(2, "ベンゼンの置換反応3つ");
const S3 = L(3, "フェノール：弱い酸で、塩化鉄(III)で紫色");
const S4 = L(4, "芳香族カルボン酸とサリチル酸：薬のもと");
const S5 = L(5, "アニリンとジアゾカップリング");
const S6 = L(6, "酸の強さの順で、混合物を分ける");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

interface Rx { from: string; Mf: number; to: string; Mt: number; how: string; back: { label: string; href: string } }
const BENZENE: Rx[] = [
  { from: "ベンゼン C₆H₆", Mf: 78, to: "ニトロベンゼン C₆H₅NO₂", Mt: 123, how: "濃硝酸と濃硫酸の混合物（混酸）でニトロ化", back: S2 },
  { from: "ベンゼン C₆H₆", Mf: 78, to: "ベンゼンスルホン酸 C₆H₅SO₃H", Mt: 158, how: "濃硫酸と加熱してスルホン化", back: S2 },
  { from: "ニトロベンゼン C₆H₅NO₂", Mf: 123, to: "アニリン C₆H₅NH₂", Mt: 93, how: "スズと塩酸で還元し、NaOH を加えてアニリンを遊離", back: S5 },
];
const SALICYL: Rx[] = [
  { from: "サリチル酸", Mf: 138, to: "アセチルサリチル酸", Mt: 180, how: "無水酢酸で –OH をアセチル化", back: S4 },
  { from: "サリチル酸", Mf: 138, to: "サリチル酸メチル", Mt: 152, how: "メタノールと濃硫酸で –COOH をエステル化", back: S4 },
];

function make(rx: Rx, n: number): QuestionBody {
  const w = f(n * rx.Mf);
  const y = f(n * rx.Mt);
  return {
    prompt: `${rx.from}（分子量 ${rx.Mf}）${w} g を、${rx.how}して、すべて${rx.to}（分子量 ${rx.Mt}）にしたとします。${rx.to.split(" ")[0]}は理論上何 g 得られますか。`,
    answer: { kind: "num", answerKind: "num", answer: [y], unit: "g", calc: `${w}/${rx.Mf}*${rx.Mt}` },
    point: "原料 1 mol から生成物 1 mol。mol を通して質量へ",
    steps: [
      { title: "原料の物質量", body: `${w}÷${rx.Mf}＝{{${f(n)} mol}}。`, back: [rx.back] },
      { title: "生成物の質量", body: `1 mol から 1 mol できるので ${f(n)} mol。×${rx.Mt}＝{{${y} g}}。`, trap: "原料の質量をそのまま答えにしない。分子量が変わるので質量も変わる。" },
    ],
  };
}

function benzene(r: Rng): QuestionBody {
  return make(r.pick(BENZENE), r.pick([0.1, 0.2, 0.25, 0.5, 1.0, 1.5, 2.0]));
}
function salicyl(r: Rng): QuestionBody {
  return make(r.pick(SALICYL), r.pick([0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.5]));
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("chikan", 1),
    prompt: "ベンゼンで起こりやすい反応はどれですか。",
    answer: {
      kind: "choice",
      options: ["置換反応", "付加反応", "けん化", "中和反応"],
      correct: 0,
      why: ["ベンゼン環はとても安定なので、環の形を保ったまま H が置きかわる置換反応が起こりやすい。", "付加反応は環の安定な状態をこわすので起こりにくい。", "けん化はエステルの反応。", "ベンゼンは酸でも塩基でもない。"],
    },
    point: "ベンゼン環は安定 → 付加より置換",
    steps: [{ title: "環の安定さ", body: "環の結合は単結合と二重結合の{{中間}}で安定なので、{{置換反応}}が起こりやすいのです。", back: [S1] }],
  },
  {
    ...b("fecl3", 1),
    prompt: "塩化鉄(III)水溶液を加えると青紫〜赤紫色になることで見分けられる化合物の仲間はどれですか。",
    answer: {
      kind: "choice",
      options: ["フェノール類", "アルコール", "アニリン", "ベンゼン"],
      correct: 0,
      why: ["ベンゼン環に –OH が直接ついたフェノール類が呈色する。", "アルコールは呈色しない。", "アニリンはさらし粉水溶液で赤紫色になる。", "ベンゼンは呈色しない。"],
    },
    point: "フェノール類は FeCl₃ で青紫〜赤紫",
    steps: [{ title: "呈色反応", body: "{{フェノール類は塩化鉄(III)で青紫〜赤紫}}、アニリンはさらし粉で赤紫。", back: [S3] }],
  },
  {
    ...b("aspirin", 1),
    prompt: "サリチル酸に無水酢酸を反応させてできる、解熱鎮痛剤に使われる物質は何ですか。",
    answer: { kind: "term", accept: ["アセチルサリチル酸"], near: [{ text: "サリチル酸メチル", why: "サリチル酸メチルはメタノールでエステル化したもので、湿布薬に使われます。" }] },
    point: "無水酢酸 → アセチルサリチル酸",
    steps: [{ title: "どちらの官能基か", body: "無水酢酸は –OH をアセチル化して{{アセチルサリチル酸}}、メタノールは –COOH をエステル化してサリチル酸メチル。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...b("phenol-san", 2, "思考・判断・表現"),
    prompt: "ナトリウムフェノキシドの水溶液に二酸化炭素を通じると、フェノールが遊離します。この理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["炭酸はフェノールより強い酸だから", "フェノールは炭酸より強い酸だから", "フェノールは塩基だから", "二酸化炭素がフェノールを還元するから"],
      correct: 0,
      why: ["弱い酸の塩に強い酸を加えると、弱い酸が遊離する。炭酸 ＞ フェノール。", "逆。フェノールは炭酸より弱い。", "フェノールは弱い酸。", "酸化還元ではなく、酸の強さによる反応。"],
    },
    point: "弱い酸の塩＋強い酸 → 弱い酸が遊離",
    steps: [{ title: "酸の強さの順", body: "{{塩酸・スルホン酸 ＞ カルボン酸 ＞ 炭酸 ＞ フェノール}}。炭酸のほうが強いので、弱いフェノールが追い出されます。", back: [S6] }],
  },
  {
    ...b("nahco3", 2, "思考・判断・表現"),
    prompt: "炭酸水素ナトリウム水溶液に加えたとき、二酸化炭素の泡を出して溶けるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["安息香酸", "フェノール", "アニリン", "ニトロベンゼン"],
      correct: 0,
      why: ["安息香酸は炭酸より強い酸なので、炭酸水素ナトリウムと反応して CO₂ を出す。", "フェノールは炭酸より弱いので反応しない。", "アニリンは弱い塩基。", "ニトロベンゼンは酸でも塩基でもない。"],
    },
    point: "炭酸より強い酸（カルボン酸）だけが CO₂ を出す",
    steps: [{ title: "炭酸と比べる", body: "{{カルボン酸は炭酸より強い}}ので NaHCO₃ と反応します。フェノールは炭酸より弱いので反応しません。", back: [S4, S6] }],
  },
  {
    ...b("diazo", 2),
    prompt: "アニリンの希塩酸溶液に亜硝酸ナトリウム水溶液を加えて塩化ベンゼンジアゾニウムをつくるとき、温度を5℃以下に保つ理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["温度が上がると窒素を出して分解し、フェノールになってしまうから", "温度が上がるとアニリンが凍るから", "5℃以下でないと亜硝酸ナトリウムが溶けないから", "温度が上がるとアゾ染料が青くなるから"],
      correct: 0,
      why: ["塩化ベンゼンジアゾニウムは不安定で、温度が上がると N₂ を出して分解しフェノールになる。", "温度が上がって凍ることはない。", "溶けやすさが理由ではない。", "色の話ではない。"],
    },
    point: "ジアゾニウム塩は不安定。冷やして分解を防ぐ",
    steps: [{ title: "ジアゾ化", body: "塩化ベンゼンジアゾニウムは不安定で、温まると{{窒素を出してフェノールに}}なるので、5℃以下に保ちます。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...b("bunri", 3, "思考・判断・表現"),
    prompt: "アニリン・安息香酸・フェノール・ニトロベンゼンのエーテル溶液に、まず塩酸を加えてよくふり混ぜました。水層に移る物質はどれですか。",
    answer: {
      kind: "choice",
      options: ["アニリン", "安息香酸", "フェノール", "ニトロベンゼン"],
      correct: 0,
      why: ["塩基のアニリンが塩酸と反応してアニリン塩酸塩になり、イオンからなるので水層へ移る。", "安息香酸は酸なので塩酸とは反応しない。NaHCO₃ で水層へ移る。", "フェノールは NaOH で水層へ移る。", "ニトロベンゼンは酸とも塩基とも反応せず、最後までエーテル層に残る。"],
    },
    point: "塩酸で塩になるのは塩基のアニリン",
    steps: [{ title: "塩になると水層へ", body: "塩酸と反応するのは塩基の{{アニリン}}だけ。塩酸塩になって水層へ移ります。", back: [S6] }],
  },
  {
    ...b("kumen", 3),
    prompt: "工業的にフェノールをつくるクメン法で、フェノールと同時に得られる物質はどれですか。",
    answer: {
      kind: "choice",
      options: ["アセトン", "エタノール", "酢酸", "安息香酸"],
      correct: 0,
      why: ["クメンヒドロペルオキシドを希硫酸で分解すると、フェノールとアセトンができる。", "エタノールはできない。", "酢酸はできない。", "安息香酸はトルエンの酸化でできる。"],
    },
    point: "クメン法 → フェノール＋アセトン",
    steps: [{ title: "クメン法", body: "ベンゼンとプロペンからクメン、酸化してクメンヒドロペルオキシド、分解して{{フェノールとアセトン}}。", back: [S3] }],
  },
  {
    ...b("toluen", 3, "思考・判断・表現"),
    prompt: "トルエンを過マンガン酸カリウムで酸化するとできる物質はどれですか。",
    answer: {
      kind: "choice",
      options: ["安息香酸", "フェノール", "ベンゼン", "フタル酸"],
      correct: 0,
      why: ["環に直接ついた炭素の側鎖（メチル基）が酸化されて –COOH になり、安息香酸になる。", "フェノールはクメン法などでつくる。", "環そのものは変わらず、側鎖が –COOH になる。", "フタル酸は o-キシレン（側鎖2つ）の酸化でできる。"],
    },
    point: "環の側鎖は酸化されて –COOH",
    steps: [{ title: "側鎖の酸化", body: "ベンゼン環は変わらず、環に直接ついた側鎖が {{–COOH}} になります。トルエン → {{安息香酸}}。", back: [S4] }],
  },
];

export const H_SCI_CHEM_HOKOZOKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "draft" },
  sections: [
    {
      title: "芳香族化合物の性質と反応",
      lead: "次の問いに答えなさい。",
      style: "word",
      pick: 4,
      questions: POOL,
    },
    {
      title: "生成量の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "benzene", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: benzene },
        { id: "salicyl", type: "A", difficulty: 3, points: 18, seconds: 120, skill: "思考・判断・表現", generate: salicyl },
      ],
    },
  ],
};
