// 化学基礎「物質量（mol）」の単元模試 (A: 数値を入れかえる生成型 6問)。問題はすべてオリジナル。
// 検算: 先に物質量 n (きれいな値) を決め、質量・体積・個数は n から掛け算で作る。calc (問題の数から答えを出す式) を
//   scripts/check-moshi.ts がシード1〜100で計算して照合する。原子量 H1.0 C12 N14 O16 Na23 Cl35.5、アボガドロ定数 6.0×10²³/mol、
//   標準状態の気体 22.4 L/mol (レクチャーと同じ値)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chemb-mol";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "1 mol ＝ 6.0×10²³ 個の集まり");
const S2 = L(2, "換算の中心は、いつも mol");
const S3 = L(3, "質量から個数を求める");
const S4 = L(4, "気体の体積から質量を求める");
const S6 = L(6, "モル濃度：溶液 1 L にとけている mol");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

interface Sub {
  name: string;
  formula: string;
  M: number;
  gas: boolean;
  /** 数える原子 [記号, 1分子あたりの数] */
  atom?: [string, number];
}
const SUBS: Sub[] = [
  { name: "水", formula: "H₂O", M: 18, gas: false, atom: ["水素原子 H", 2] },
  { name: "二酸化炭素", formula: "CO₂", M: 44, gas: true, atom: ["酸素原子 O", 2] },
  { name: "酸素", formula: "O₂", M: 32, gas: true, atom: ["酸素原子 O", 2] },
  { name: "メタン", formula: "CH₄", M: 16, gas: true, atom: ["水素原子 H", 4] },
  { name: "アンモニア", formula: "NH₃", M: 17, gas: true, atom: ["水素原子 H", 3] },
  { name: "窒素", formula: "N₂", M: 28, gas: true, atom: ["窒素原子 N", 2] },
  { name: "水素", formula: "H₂", M: 2, gas: true, atom: ["水素原子 H", 2] },
];
const GASES = SUBS.filter((s) => s.gas);

function kosu(r: Rng): QuestionBody {
  const s = r.pick(SUBS);
  const n = r.pick([0.25, 0.5, 0.75, 1.25, 1.5]);
  const w = f(n * s.M);
  const N = f(n * 6);
  return {
    prompt: `${s.name} ${s.formula}（分子量 ${s.M}）${w} g にふくまれる分子の数は何個ですか。アボガドロ定数は 6.0×10²³/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [N], unit: "×10²³ 個", calc: `${w}/${s.M}*6.0` },
    point: "質量 → mol → 個数。まずモル質量でわる",
    steps: [
      { title: "mol に直す", body: `${w} g ÷ ${s.M} g/mol ＝ {{${f(n)} mol}}。`, back: [S2, S3] },
      { title: "個数に直す", body: `${f(n)} mol × 6.0×10²³/mol ＝ {{${N}×10²³ 個}}。`, trap: `${w}×6.0×10²³ のように、質量にそのままアボガドロ定数をかけない。`, back: [S1] },
    ],
  };
}

function kitai(r: Rng): QuestionBody {
  const s = r.pick(GASES);
  const n = r.pick([0.25, 0.5, 0.75, 1.5, 2, 2.5, 3]);
  const V = f(n * 22.4);
  const w = f(n * s.M);
  return {
    prompt: `標準状態（0℃、1.013×10⁵ Pa）で ${V} L をしめる${s.name} ${s.formula}（分子量 ${s.M}）の質量は何 g ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [w], unit: "g", calc: `${V}/22.4*${s.M}` },
    point: "標準状態の気体は 1 mol ＝ 22.4 L",
    steps: [
      { title: "mol に直す", body: `${V} L ÷ 22.4 L/mol ＝ {{${f(n)} mol}}。`, back: [S4] },
      { title: "質量に直す", body: `${f(n)} mol × ${s.M} g/mol ＝ {{${w} g}}。`, trap: "22.4 L/mol は気体の種類によらない。分子量で体積が変わるわけではない。", back: [S2] },
    ],
  };
}

const SOLUTES: [string, number][] = [
  ["水酸化ナトリウム NaOH（式量40）", 40],
  ["塩化ナトリウム NaCl（式量58.5）", 58.5],
  ["グルコース C₆H₁₂O₆（分子量180）", 180],
];

function nodo(r: Rng): QuestionBody {
  const [name, M] = r.pick(SOLUTES);
  // 質量が小数第3位までで割り切れる組だけ
  const combos: [number, number][] = [];
  for (const c0 of [0.1, 0.2, 0.25, 0.4, 0.5]) for (const V0 of [100, 200, 250, 500]) {
    const x = ((c0 * V0) / 1000) * M * 1000;
    if (Math.abs(x - Math.round(x)) < 1e-6) combos.push([c0, V0]);
  }
  const [c, V] = r.pick(combos);
  const n = f((c * V) / 1000);
  const w = f(((c * V) / 1000) * M);
  return {
    prompt: `${name} ${w} g を水にとかして、溶液全体を ${V} mL にしました。この水溶液のモル濃度は何 mol/L ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(c)], unit: "mol/L", calc: `${w}/${M}/(${V}/1000)` },
    point: "モル濃度 ＝ 溶質の mol ÷ 溶液の L",
    steps: [
      { title: "溶質を mol に直す", body: `${w} g ÷ ${M} g/mol ＝ {{${n} mol}}。`, back: [S2] },
      { title: "溶液の L でわる", body: `${V} mL ＝ ${f(V / 1000)} L。${n} mol ÷ ${f(V / 1000)} L ＝ {{${f(c)} mol/L}}。`, trap: "mL のままわらない。必ず L に直してからわる。", back: [S6] },
    ],
  };
}

function genshi(r: Rng): QuestionBody {
  const s = r.pick(SUBS);
  const [atom, k] = s.atom!;
  const ns = [0.25, 0.5, 0.75, 1, 1.25, 1.5].filter((n) => n * k * 6 >= 1 && n * k * 6 < 10);
  const n = r.pick(ns);
  const w = f(n * s.M);
  const N = f(n * k * 6);
  return {
    prompt: `${s.name} ${s.formula}（分子量 ${s.M}）${w} g にふくまれる${atom}の数は何個ですか。アボガドロ定数は 6.0×10²³/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [N], unit: "×10²³ 個", calc: `${w}/${s.M}*${k}*6.0` },
    point: "分子の mol に、1分子中の原子の数をかける",
    steps: [
      { title: "分子の mol", body: `${w} g ÷ ${s.M} g/mol ＝ {{${f(n)} mol}}（分子）。`, back: [S2] },
      { title: "原子の mol", body: `${s.formula} 1分子に${atom}は ${k} 個なので、${f(n)}×${k}＝{{${f(n * k)} mol}}。`, trap: "分子の数で止めない。何を数えるか（分子か原子か）を問題文で確かめる。", back: [S1] },
      { title: "個数に直す", body: `${f(n * k)} mol × 6.0×10²³/mol ＝ {{${N}×10²³ 個}}。` },
    ],
  };
}

function taiseki(r: Rng): QuestionBody {
  const s = r.pick(GASES);
  const n = r.pick([0.125, 0.25, 0.5, 0.75, 1.5, 2.5]);
  const w = f(n * s.M);
  const V = f(n * 22.4);
  return {
    prompt: `${s.name} ${s.formula}（分子量 ${s.M}）${w} g は、標準状態で何 L をしめますか。`,
    answer: { kind: "num", answerKind: "num", answer: [V], unit: "L", calc: `${w}/${s.M}*22.4` },
    point: "質量 → mol → 体積。いったん mol を通る",
    steps: [
      { title: "mol に直す", body: `${w} g ÷ ${s.M} g/mol ＝ {{${f(n)} mol}}。`, back: [S2] },
      { title: "体積に直す", body: `${f(n)} mol × 22.4 L/mol ＝ {{${V} L}}。`, trap: "質量 g と体積 L を直接むすぶ式はない。mol を通る。", back: [S4] },
    ],
  };
}

function bunshiryo(r: Rng): QuestionBody {
  const s = r.pick(GASES.filter((g) => g.M >= 16));
  const n = r.pick([0.125, 0.25, 0.5, 0.75, 1.5, 2]);
  const V = f(n * 22.4);
  const w = f(n * s.M);
  return {
    prompt: `ある気体は、標準状態で ${V} L の質量が ${w} g でした。この気体の分子量を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(s.M)], calc: `${w}/(${V}/22.4)` },
    point: "体積から mol を出し、質量 ÷ mol でモル質量",
    steps: [
      { title: "体積から mol", body: `${V} L ÷ 22.4 L/mol ＝ {{${f(n)} mol}}。`, back: [S4] },
      { title: "1 mol あたりの質量", body: `${w} g ÷ ${f(n)} mol ＝ {{${s.M} g/mol}}。モル質量の数値が分子量なので、分子量は ${s.M}。`, trap: "質量 ÷ 体積（g/L）で止めない。それは密度で、分子量ではない。", back: [S1, S2] },
      { title: "見当をつける", body: `分子量 ${s.M} の気体には、たとえば ${s.formula} があります。` },
    ],
  };
}

export const H_SCI_CHEMB_MOL_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学基礎",
  review: { status: "draft" },
  sections: [
    {
      title: "質量・個数・体積と mol",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kosu", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: kosu },
        { id: "kitai", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: kitai },
        { id: "taiseki", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: taiseki },
        { id: "genshi", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: genshi },
      ],
    },
    {
      title: "モル濃度・分子量",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "nodo", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: nodo },
        { id: "bunshiryo", type: "A", difficulty: 3, points: 21, seconds: 150, skill: "思考・判断・表現", generate: bunshiryo },
      ],
    },
  ],
};
