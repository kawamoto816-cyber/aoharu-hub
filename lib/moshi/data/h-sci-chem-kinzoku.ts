// 化学「金属元素」の単元模試 (B: プール9問から4問 ＋ A: 反応の量の計算2問)。問題はすべてオリジナル。
// 検算 (A): 金属・酸化物の物質量をきれいな値にしてから質量・体積を作り、calc (問題の数から答えを出す式) を
//   scripts/check-moshi.ts がシード1〜100で照合する。反応式はレクチャーと同じ:
//   2Al＋6HCl → 2AlCl₃＋3H₂、2Al＋2NaOH＋6H₂O → 2Na[Al(OH)₄]＋3H₂、Zn＋2NaOH＋2H₂O → Na₂[Zn(OH)₄]＋H₂、
//   Fe₂O₃＋3CO → 2Fe＋3CO₂、2Al＋Fe₂O₃ → Al₂O₃＋2Fe。原子量 Al 27、Zn 65、Fe 56、O 16、標準状態の気体 22.4 L/mol。
//   B の事実 (炎色反応・イオンの色・錯イオン・不動態・系統分離の順) はレクチャーの記述だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-kinzoku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "1族と2族：価電子の数がそろうと性質も似る");
const S2 = L(2, "両性金属：酸にも強塩基にも溶ける");
const S3 = L(3, "鉄と銅をつくる：溶鉱炉と電解精錬");
const S4 = L(4, "遷移元素：イオンに色があり、錯イオンをつくる");
const S5 = L(5, "金属イオンの系統分離");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

const RYOSEI = [
  { m: "アルミニウム", M: 27, sol: "水酸化ナトリウム水溶液", k: 3 / 2, eq: "2Al＋2NaOH＋6H₂O → 2Na[Al(OH)₄]＋3H₂", ratio: "Al：H₂＝2：3" },
  { m: "アルミニウム", M: 27, sol: "塩酸", k: 3 / 2, eq: "2Al＋6HCl → 2AlCl₃＋3H₂", ratio: "Al：H₂＝2：3" },
  { m: "亜鉛", M: 65, sol: "水酸化ナトリウム水溶液", k: 1, eq: "Zn＋2NaOH＋2H₂O → Na₂[Zn(OH)₄]＋H₂", ratio: "Zn：H₂＝1：1" },
];

function suiso(r: Rng): QuestionBody {
  const x = r.pick(RYOSEI);
  const n = r.pick([0.02, 0.04, 0.1, 0.2, 0.3, 0.4, 0.5]);
  const w = f(n * x.M);
  const nh = n * x.k;
  const V = f(nh * 22.4);
  return {
    prompt: `${x.m} ${w} g を十分な量の${x.sol}に溶かしました。発生する水素は標準状態で何 L ですか。${x.m === "亜鉛" ? "Zn＝65" : "Al＝27"}、気体のモル体積は 22.4 L/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [V], unit: "L", calc: `${w}/${x.M}*${x.k === 1 ? "1" : "3/2"}*22.4` },
    point: "両性金属は強塩基とも反応して H₂ を出す。係数の比で",
    steps: [
      { title: "反応式", body: `{{${x.eq}}}。${x.ratio}。`, back: [S2] },
      { title: "物質量", body: `${w}÷${x.M}＝${f(n)} mol。H₂ は ${f(n)}${x.k === 1 ? "" : "×3/2"}＝{{${f(nh)} mol}}。`, trap: x.k === 1 ? undefined : "Al と H₂ を1：1にしない。2Al から 3H₂。" },
      { title: "体積", body: `${f(nh)}×22.4＝{{${V} L}}。` },
    ],
  };
}

function tetsu(r: Rng): QuestionBody {
  const kind = r.pick(["kouro", "thermite"] as const);
  const n = r.pick([0.05, 0.1, 0.2, 0.25, 0.5, 1.0, 2.0]); // Fe₂O₃ の mol
  const wo = f(n * 160);
  if (kind === "kouro") {
    const fe = f(n * 2 * 56);
    return {
      prompt: `溶鉱炉の中では、Fe₂O₃＋3CO → 2Fe＋3CO₂ の反応で鉄ができます。酸化鉄(III) Fe₂O₃ ${wo} g がすべて反応すると、鉄は何 g できますか。Fe＝56、O＝16 とします。`,
      answer: { kind: "num", answerKind: "num", answer: [fe], unit: "g", calc: `${wo}/(2*56+3*16)*2*56` },
      point: "Fe₂O₃ 1 mol から Fe 2 mol",
      steps: [
        { title: "式量と物質量", body: `Fe₂O₃＝56×2＋16×3＝160。${wo}÷160＝{{${f(n)} mol}}。`, back: [S3] },
        { title: "係数で鉄へ", body: `Fe₂O₃：Fe＝1：2 より Fe は ${f(2 * n)} mol。×56 で {{${fe} g}}。`, trap: "Fe₂O₃ と Fe を1：1にしない。Fe₂O₃ 1個に Fe が2個ふくまれる。" },
      ],
    };
  }
  const al = f(n * 2 * 27);
  return {
    prompt: `テルミット反応 2Al＋Fe₂O₃ → Al₂O₃＋2Fe で、酸化鉄(III) Fe₂O₃ ${wo} g をすべて反応させるのに必要なアルミニウムは何 g ですか。Al＝27、Fe＝56、O＝16 とします。`,
    answer: { kind: "num", answerKind: "num", answer: [al], unit: "g", calc: `${wo}/(2*56+3*16)*2*27` },
    point: "Fe₂O₃ 1 mol に Al 2 mol",
    steps: [
      { title: "式量と物質量", body: `Fe₂O₃＝160。${wo}÷160＝{{${f(n)} mol}}。`, back: [S2] },
      { title: "係数でアルミニウムへ", body: `Al：Fe₂O₃＝2：1 より Al は ${f(2 * n)} mol。×27 で {{${al} g}}。`, trap: "できる鉄の量と取りちがえない。聞かれているのは必要な Al。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("hozon", 1),
    prompt: "ナトリウムやカリウムの単体を保存する方法として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["灯油（石油）の中に入れる", "水の中に入れる", "空気中にそのまま置く", "うすい塩酸の中に入れる"],
      correct: 0,
      why: ["空気中の酸素や水と反応しないよう、灯油の中に保存する。", "常温の水と激しく反応して水素を出す。", "切り口がすぐに酸素と反応して光沢を失う。", "酸とも激しく反応する。"],
    },
    point: "アルカリ金属は灯油の中に保存",
    steps: [{ title: "水と激しく反応", body: "アルカリ金属は常温の水と激しく反応するので、{{灯油（石油）の中}}に保存します。", back: [S1] }],
  },
  {
    ...b("enshoku", 1),
    prompt: "ナトリウムの炎色反応の色はどれですか。",
    answer: {
      kind: "choice",
      options: ["黄色", "赤紫色", "赤色", "黄緑色"],
      correct: 0,
      why: ["Na は黄色。", "赤紫色は K。", "赤色は Li。", "黄緑色は Ba。"],
    },
    point: "Li 赤・Na 黄・K 赤紫",
    steps: [{ title: "炎色反応", body: "Li は赤、{{Na は黄}}、K は赤紫、Ca は橙赤、Ba は黄緑です。", back: [S1] }],
  },
  {
    ...b("fe3-iro", 1),
    prompt: "鉄(III)イオン Fe³⁺ をふくむ水溶液の色はどれですか。",
    answer: {
      kind: "choice",
      options: ["黄褐色", "淡緑色", "青色", "無色"],
      correct: 0,
      why: ["Fe³⁺ は黄褐色。", "淡緑色は Fe²⁺。", "青色は Cu²⁺。", "Fe³⁺ には色がある。遷移元素のイオンは色をもつものが多い。"],
    },
    point: "Fe²⁺ 淡緑色、Fe³⁺ 黄褐色",
    steps: [{ title: "酸化数で色がちがう", body: "Fe²⁺ は{{淡緑色}}、Fe³⁺ は{{黄褐色}}です。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...b("cu-nh3", 2, "思考・判断・表現"),
    prompt: "硫酸銅(II)水溶液にアンモニア水を少しずつ加えていき、最後は過剰に加えました。見られる変化として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["青白色の沈殿ができ、過剰に加えると沈殿が溶けて深青色の水溶液になる", "白色の沈殿ができ、過剰に加えても溶けない", "赤褐色の沈殿ができ、過剰に加えると溶ける", "何も変化しない"],
      correct: 0,
      why: ["少量で Cu(OH)₂（青白色）が沈殿し、過剰で [Cu(NH₃)₄]²⁺（深青色）になって溶ける。", "Cu(OH)₂ は青白色で、過剰のアンモニア水には溶ける。", "赤褐色の沈殿は Fe(OH)₃。", "OH⁻ によって沈殿ができる。"],
    },
    point: "Cu(OH)₂ は過剰の NH₃ 水で [Cu(NH₃)₄]²⁺ に",
    steps: [{ title: "錯イオン", body: "少量で {{Cu(OH)₂（青白色）}}、過剰で {{[Cu(NH₃)₄]²⁺（深青色）}} になって溶けます。NaOH を過剰にしても溶けません。", back: [S4] }],
  },
  {
    ...b("fudotai", 2),
    prompt: "アルミニウムを濃硝酸に入れても溶けない理由を表す語はどれですか。",
    answer: { kind: "term", accept: ["不動態"], near: [{ text: "両性", why: "両性は酸とも強塩基とも反応する性質。濃硝酸に溶けないのは、ち密な酸化物の膜ができる不動態のためです。" }] },
    point: "ち密な酸化物の膜で守られる＝不動態",
    steps: [{ title: "用語", body: "表面にち密な酸化物の膜ができて内部が反応しなくなる状態を{{不動態}}といいます。Fe・Ni も同じです。", back: [S2] }],
  },
  {
    ...b("koutetsu", 2),
    prompt: "溶鉱炉から取り出した銑鉄を転炉に移し、酸素を吹きこむ目的として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["炭素を減らして、ねばり強い鋼にする", "炭素をふやして、硬い鋼にする", "鉄を酸化して酸化鉄にもどす", "クロムやニッケルを取り除く"],
      correct: 0,
      why: ["銑鉄は炭素を約4％ふくみ硬くもろい。酸素で炭素を CO₂ などにして抜き、2％以下の鋼にする。", "酸素を吹きこむと炭素は減る。", "目的は炭素を除くことで、鉄を酸化物にもどすことではない。", "クロムやニッケルはステンレス鋼にするために加える金属。"],
    },
    point: "銑鉄（C 約4％）→ 鋼（C 2％以下）",
    steps: [{ title: "転炉", body: "酸素を吹きこむと炭素が抜けて、炭素2％以下の{{鋼}}になります。", back: [S3] }],
  },
  // ---- 発展 ----
  {
    ...b("bunri-jun", 3, "思考・判断・表現"),
    prompt: "Ag⁺・Cu²⁺・Fe³⁺ をふくむ水溶液を系統分離するとき、最初に加える試薬として最も適したものはどれですか。",
    answer: {
      kind: "choice",
      options: ["希塩酸", "水酸化ナトリウム水溶液", "アンモニア水", "炭酸アンモニウム水溶液"],
      correct: 0,
      why: ["Cl⁻ と沈殿をつくるのは Ag⁺ と Pb²⁺ くらいなので、AgCl だけを先に分けられる。", "Ag₂O・Cu(OH)₂・Fe(OH)₃ がいっぺんに沈殿してまざる。", "Ag⁺ と Cu²⁺ が錯イオンになって溶けたまま残り、分けられない。", "Ca²⁺ などを沈殿させる試薬で、最初には使わない。"],
    },
    point: "相手のせまい試薬から順に加える",
    steps: [{ title: "順番が大事", body: "相手のせまい試薬から加えます。まず{{希塩酸で AgCl}}、次に酸性で H₂S を通じて CuS を沈殿させます。", back: [S5] }],
  },
  {
    ...b("funsha", 3, "思考・判断・表現"),
    prompt: "系統分離で、酸性で H₂S を通じて CuS を沈殿させたあと、ろ液を煮沸してから希硝酸を加えます。この操作の目的として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["H₂S を追い出し、H₂S で Fe²⁺ に還元された鉄を Fe³⁺ にもどすため", "ろ液を濃くして、Fe²⁺ を沈殿させるため", "Cu²⁺ をもう一度溶かすため", "Ag⁺ を沈殿させるため"],
      correct: 0,
      why: ["Fe³⁺ は H₂S に還元されて Fe²⁺ になっている。煮沸で H₂S を追い出し、希硝酸で酸化して Fe³⁺ にもどす。", "目的は濃縮ではなく、H₂S の除去と酸化。", "CuS はすでにろ過して取り除いている。", "Ag⁺ は最初に AgCl として分けている。"],
    },
    point: "H₂S を追い出し、Fe²⁺ を Fe³⁺ にもどす",
    steps: [{ title: "還元をもとにもどす", body: "H₂S で Fe³⁺ は Fe²⁺ に還元されています。{{煮沸で H₂S を追い出し、希硝酸で Fe³⁺ にもどして}}から、アンモニア水を加えます。", back: [S5] }],
  },
  {
    ...b("zn-oh", 3, "思考・判断・表現"),
    prompt: "Zn²⁺ と Fe³⁺ をふくむ水溶液に、水酸化ナトリウム水溶液を過剰に加えました。沈殿として残るのはどれですか。",
    answer: {
      kind: "choice",
      options: ["Fe(OH)₃ だけ", "Zn(OH)₂ だけ", "Zn(OH)₂ と Fe(OH)₃ の両方", "どちらも溶けて沈殿は残らない"],
      correct: 0,
      why: ["Zn(OH)₂ は両性水酸化物で、過剰の NaOH で [Zn(OH)₄]²⁻ になって溶ける。Fe(OH)₃ は赤褐色の沈殿のまま残る。", "Zn(OH)₂ は過剰の NaOH に溶ける。", "Zn(OH)₂ は溶けてしまう。", "Fe(OH)₃ は強塩基には溶けない。"],
    },
    point: "両性水酸化物は過剰の NaOH に溶ける",
    steps: [{ title: "両性かどうか", body: "{{Zn(OH)₂ は両性}}で過剰の NaOH に溶けます。Fe(OH)₃ は溶けずに残ります。", back: [S2] }],
  },
];

export const H_SCI_CHEM_KINZOKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "draft" },
  sections: [
    {
      title: "金属元素とイオンの性質",
      lead: "次の問いに答えなさい。",
      style: "word",
      pick: 4,
      questions: POOL,
    },
    {
      title: "金属の反応と量",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "suiso", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: suiso },
        { id: "tetsu", type: "A", difficulty: 3, points: 18, seconds: 120, skill: "思考・判断・表現", generate: tetsu },
      ],
    },
  ],
};
