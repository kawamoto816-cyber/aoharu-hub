// 化学基礎「化学反応式と量的関係」の単元模試 (A: 数値を入れかえる生成型4問 ＋ B: プール4問から2問)。問題はすべてオリジナル。
// 検算: 先に反応する物質量 n (きれいな値) を決め、質量・体積は n から掛け算で作る。係数は反応式の表から取り、
//   calc (問題の数 → mol → 係数比 → 答え) を scripts/check-moshi.ts がシード1〜100で計算して照合する。
//   原子量 H1.0 C12 O16 Mg24、標準状態の気体 22.4 L/mol。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chemb-hannoshiki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "係数は原子の数をそろえてつける");
const S2 = L(2, "化学の基本法則と、気体の体積のなぞ");
const S3 = L(3, "係数の比 ＝ 物質量の比");
const S4 = L(4, "量の計算は「mol に直して係数比」");
const S5 = L(5, "片方が余るときは、足りないほうで決まる");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

interface Fuel {
  name: string;
  fm: string;
  M: number;
  eq: string;
  /** 燃料1に対する O₂・CO₂・H₂O の係数比 */
  o2: number;
  co2: number;
  h2o: number;
  gas: boolean;
}
const FUELS: Fuel[] = [
  { name: "メタン", fm: "CH₄", M: 16, eq: "CH₄ ＋ 2O₂ → CO₂ ＋ 2H₂O", o2: 2, co2: 1, h2o: 2, gas: true },
  { name: "プロパン", fm: "C₃H₈", M: 44, eq: "C₃H₈ ＋ 5O₂ → 3CO₂ ＋ 4H₂O", o2: 5, co2: 3, h2o: 4, gas: true },
  { name: "エタン", fm: "C₂H₆", M: 30, eq: "2C₂H₆ ＋ 7O₂ → 4CO₂ ＋ 6H₂O", o2: 3.5, co2: 2, h2o: 3, gas: true },
  { name: "エタノール", fm: "C₂H₅OH", M: 46, eq: "C₂H₅OH ＋ 3O₂ → 2CO₂ ＋ 3H₂O", o2: 3, co2: 2, h2o: 3, gas: false },
];

function nensho(r: Rng): QuestionBody {
  const fu = r.pick(FUELS);
  const n = r.pick([0.1, 0.25, 0.5, 0.75, 1.5, 2]);
  const co2 = r.bool();
  const [pfm, pM, k] = co2 ? ["CO₂", 44, fu.co2] : ["H₂O", 18, fu.h2o];
  const w = f(n * fu.M);
  const ans = f(n * k * pM);
  const ratio = fu.fm === "C₂H₆" ? `2 : ${2 * k}` : `1 : ${k}`;
  return {
    prompt: `${fu.name} ${fu.fm}（分子量 ${fu.M}）${w} g を完全に燃焼させると、${pfm}（分子量 ${pM}）は何 g できますか。反応式は ${fu.eq} です。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], unit: "g", calc: `${w}/${fu.M}*${k}*${pM}` },
    point: "質量 → mol → 係数比 → 質量",
    steps: [
      { title: "mol に直す", body: `${w} g ÷ ${fu.M} g/mol ＝ {{${f(n)} mol}}。`, back: [S4] },
      { title: "係数の比", body: `${fu.fm} : ${pfm} ＝ ${ratio} なので、${pfm} は ${f(n)}×${k}＝{{${f(n * k)} mol}}。`, back: [S3] },
      { title: "質量にもどす", body: `${f(n * k)} mol × ${pM} g/mol ＝ {{${ans} g}}。`, trap: "質量の比を係数の比にしない。係数の比は mol の比。" },
    ],
  };
}

function sanso(r: Rng): QuestionBody {
  const fu = r.pick(FUELS.filter((x) => x.gas));
  const V = r.pick([2, 4, 5, 6, 8, 10, 12, 20]);
  const ans = f(V * fu.o2);
  const ratio = fu.fm === "C₂H₆" ? "2 : 7" : `1 : ${fu.o2}`;
  return {
    prompt: `同じ温度・圧力のもとで、${fu.name} ${fu.fm} ${V} L を完全に燃焼させるのに必要な酸素 O₂ は何 L ですか。反応式は ${fu.eq} です。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], unit: "L", calc: `${V}*${fu.o2}` },
    point: "同温・同圧の気体は、体積の比＝係数の比",
    steps: [
      { title: "体積の比を使う", body: `同温・同圧の気体どうしは{{体積の比＝係数の比}}。${fu.fm} : O₂ ＝ ${ratio}。`, back: [S3, S2] },
      { title: "計算", body: `${V} L × ${fu.o2} ＝ {{${ans} L}}。`, trap: "気体どうしなら、わざわざ 22.4 で mol に直さなくてよい。" },
    ],
  };
}

function suiso(r: Rng): QuestionBody {
  const n = r.pick([0.05, 0.1, 0.125, 0.25, 0.5, 0.75]);
  const w = f(n * 24);
  const V = f(n * 22.4);
  const askV = r.bool();
  return askV
    ? {
        prompt: `マグネシウム Mg（原子量24）${w} g を十分な量の塩酸と反応させると、水素は標準状態で何 L 発生しますか。反応式は Mg ＋ 2HCl → MgCl₂ ＋ H₂ です。`,
        answer: { kind: "num", answerKind: "num", answer: [V], unit: "L", calc: `${w}/24*22.4` },
        point: "Mg と H₂ は 1 : 1",
        steps: [
          { title: "Mg を mol に", body: `${w} g ÷ 24 g/mol ＝ {{${f(n)} mol}}。`, back: [S4] },
          { title: "係数比と体積", body: `Mg : H₂ ＝ 1 : 1 なので H₂ も ${f(n)} mol。× 22.4 L/mol ＝ {{${V} L}}。`, trap: "HCl の係数2をかけない。H₂ の係数は1。", back: [S3] },
        ],
      }
    : {
        prompt: `マグネシウム Mg（原子量24）を十分な量の塩酸と反応させると、水素が標準状態で ${V} L 発生しました。反応した Mg は何 g ですか。反応式は Mg ＋ 2HCl → MgCl₂ ＋ H₂ です。`,
        answer: { kind: "num", answerKind: "num", answer: [w], unit: "g", calc: `${V}/22.4*24` },
        point: "体積 → mol → 係数比 → 質量",
        steps: [
          { title: "H₂ を mol に", body: `${V} L ÷ 22.4 L/mol ＝ {{${f(n)} mol}}。`, back: [S4] },
          { title: "係数比と質量", body: `Mg : H₂ ＝ 1 : 1 なので Mg も ${f(n)} mol。× 24 g/mol ＝ {{${w} g}}。`, back: [S3] },
        ],
      };
}

function kajo(r: Rng): QuestionBody {
  let a = 0;
  let c = 0;
  while (a === 2 * c) {
    a = r.pick([1, 1.5, 2, 3, 4]);
    c = r.pick([0.5, 1, 1.5, 2, 2.5]);
  }
  const h2g = f(2 * a);
  const o2g = f(32 * c);
  const h2Short = a < 2 * c;
  const water = h2Short ? a : 2 * c;
  const ans = f(18 * water);
  return {
    prompt: `水素 H₂ ${h2g} g と酸素 O₂ ${o2g} g を混ぜて点火し、どちらか一方がなくなるまで反応させました。2H₂ ＋ O₂ → 2H₂O の反応で、水 H₂O（分子量18）は何 g できますか。分子量は H₂＝2.0、O₂＝32 とします。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], unit: "g", calc: h2Short ? `${h2g}/2*18` : `${o2g}/32*2*18` },
    point: "不足するほうの量で、できる量が決まる",
    steps: [
      { title: "mol に直す", body: `H₂ は ${h2g}÷2.0＝${f(a)} mol、O₂ は ${o2g}÷32＝${f(c)} mol。`, back: [S4] },
      {
        title: "どちらが足りないか",
        body: h2Short
          ? `H₂ ${f(a)} mol と反応する O₂ は ${f(a / 2)} mol で、O₂ は ${f(c - a / 2)} mol 余る。{{H₂ が不足}}。`
          : `O₂ ${f(c)} mol と反応する H₂ は ${f(2 * c)} mol で、H₂ は ${f(a - 2 * c)} mol 余る。{{O₂ が不足}}。`,
        back: [S5],
      },
      {
        title: "できる水",
        body: `不足する${h2Short ? " H₂" : " O₂"}をもとに、H₂O は ${f(water)} mol。× 18 g/mol ＝ {{${ans} g}}。`,
        trap: "余るほうの量から計算しない。余った分は反応していない。",
      },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  {
    ...b("shitsuryo-hozon", 1),
    prompt: "化学反応の前後で、物質の質量の総和が変わらないという法則を何といいますか。",
    answer: { kind: "term", accept: ["質量保存の法則"], near: [{ text: "定比例の法則", why: "定比例の法則は、化合物の成分元素の質量比が一定という法則です。" }] },
    point: "反応の前後で質量の総和は一定",
    steps: [{ title: "法則の名前", body: "原子の種類と数が変わらないので質量の総和も変わらない。これが{{質量保存の法則}}です。", back: [S2] }],
  },
  {
    ...b("kakeisu", 1),
    prompt: "水素と酸素から水ができる反応式を書くとき、O の数をそろえる方法として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["H₂O の前に係数2をつける", "H₂O を H₂O₂ と書きかえる", "O₂ を O と書きかえる", "H₂O の右下に 2 をつけて H₂O₂ にする"],
      correct: 0,
      why: [
        "化学式は変えずに係数で数をそろえる。2H₂＋O₂→2H₂O。",
        "H₂O₂ は過酸化水素という別の物質。",
        "酸素の単体は O₂ という分子。化学式を変えてはいけない。",
        "右下の数字を変えると物質が変わる。",
      ],
    },
    point: "化学式は変えず、係数だけで合わせる",
    steps: [{ title: "係数で合わせる", body: "化学式の右下の数字は物質そのもの。数をそろえるのは{{前の係数}}だけです。", back: [S1] }],
  },
  {
    ...b("shitsuryo-hi", 2, "思考・判断・表現"),
    prompt: "2H₂ ＋ O₂ → 2H₂O の反応式からわかることとして正しいものはどれですか（H₂＝2.0、O₂＝32）。",
    answer: {
      kind: "choice",
      options: ["H₂ 4.0 g と O₂ 32 g が過不足なく反応する", "H₂ 2 g と O₂ 1 g が過不足なく反応する", "反応すると質量の総和が減る", "H₂ 2 L と O₂ 2 L が過不足なく反応する（同温・同圧）"],
      correct: 0,
      why: [
        "係数の比は mol の比。H₂ 2 mol（4.0 g）と O₂ 1 mol（32 g）が反応する。",
        "係数の比を質量の比と読みちがえている。",
        "質量保存の法則により、総和は変わらない。",
        "同温・同圧なら体積の比は 2 : 1。H₂ 2 L と O₂ 1 L。",
      ],
    },
    point: "係数の比は mol の比で、質量の比ではない",
    steps: [{ title: "mol に読みかえる", body: "係数 2 : 1 は{{物質量の比}}。H₂ 2 mol＝4.0 g、O₂ 1 mol＝32 g です。", back: [S3] }],
  },
  {
    ...b("avogadro", 2),
    prompt: "「同じ温度・同じ圧力のもとで、同じ体積の気体には、気体の種類によらず同じ数の分子がふくまれる」という考えを何といいますか。",
    answer: { kind: "term", accept: ["アボガドロの法則", "アボガドロの仮説", "アボガドロの分子説"], near: [{ text: "気体反応の法則", why: "気体反応の法則は、気体どうしの反応で体積が簡単な整数比になるという法則。分子の数についての考えはアボガドロの法則です。" }] },
    point: "同温・同圧・同体積なら分子の数は同じ",
    steps: [{ title: "法則の名前", body: "同温・同圧・同体積の気体は同数の分子をふくむ＝{{アボガドロの法則}}。これで気体反応の法則が説明されました。", back: [S2] }],
  },
];

export const H_SCI_CHEMB_HANNOSHIKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学基礎",
  review: { status: "draft" },
  sections: [
    { title: "反応式と法則", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
    {
      title: "反応式を使った量の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "sanso", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: sanso },
        { id: "nensho", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: nensho },
        { id: "suiso", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: suiso },
        { id: "kajo", type: "A", difficulty: 3, points: 18, seconds: 180, skill: "思考・判断・表現", generate: kajo },
      ],
    },
  ],
};
