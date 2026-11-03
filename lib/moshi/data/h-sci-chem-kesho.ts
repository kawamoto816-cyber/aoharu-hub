// 化学「固体の構造（結晶）」の単元模試 (A: 数値を入れかえる生成型 6問)。問題はすべてオリジナル。
// 検算: 先に答えがきれいな値になる組だけを選び、calc (問題の数から答えを出す式) を scripts/check-moshi.ts がシード1〜100で照合する。
//   密度は d＝nM/(Nᴀa³)。a³ を「□×10⁻²³ cm³」で与え、Nᴀ＝6.0×10²³/mol の 10²³ と打ち消し合うので calc は n*M/(6.0*□)。
//   √2≒1.41、√3≒1.73 は問題文で与える。金属・イオンは架空の「金属 X」などにして、原子量・半径は問題文で与える。
//   粒子の数え方 (頂点1/8・面1/2・辺1/4・内部1)、√3a＝4r、√2a＝4r、NaCl 型の a＝2(r₊＋r₋) と粒子の数4はレクチャーのとおり。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-kesho";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S2 = L(2, "単位格子の粒子は「分け合い」で数える");
const S3 = L(3, "体心立方格子と面心立方格子のくらべ");
const S4 = L(4, "イオン結晶と共有結合の結晶の単位格子");
const S5 = L(5, "密度＝単位格子の質量÷単位格子の体積");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const m1 = (x: number) => (Math.abs(x * 10 - Math.round(x * 10)) < 1e-9 ? x.toFixed(1) : f(x));
const clean = (x: number, d = 3) => Math.abs(x * 10 ** d - Math.round(x * 10 ** d)) < 1e-6;
const eq = (x: number) => (clean(x, 3) ? "＝" : "≒");

function kazoe(r: Rng): QuestionBody {
  // 頂点はいつも8個。面の中心・辺の中点・内部の有無を変える
  const face = r.pick([0, 6]);
  const edge = r.pick([0, 12]);
  const inner = r.pick(face === 0 && edge === 0 ? [1, 2, 4] : [0, 1, 2, 4]);
  const parts: string[] = ["8つの頂点"];
  const calc: string[] = ["1/8*8"];
  const sum: string[] = ["1/8×8＝1"];
  if (face) { parts.push("6つの面の中心"); calc.push("1/2*6"); sum.push("1/2×6＝3"); }
  if (edge) { parts.push("12本の辺の中点"); calc.push("1/4*12"); sum.push("1/4×12＝3"); }
  if (inner) { parts.push(`立方体の内部の ${inner} か所`); calc.push(`${inner}`); sum.push(`内部 ${inner}`); }
  const n = 1 + (face ? 3 : 0) + (edge ? 3 : 0) + inner;
  const name = r.pick(["ある結晶", "ある物質の結晶", "架空の結晶 Y "]);
  return {
    prompt: `${name}の立方体の単位格子では、${parts.join("・")}に、同じ種類の粒子が1個ずつあります。この単位格子にふくまれる粒子は全部で何個ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n)], unit: "個", calc: calc.join("+") },
    point: "頂点1/8・面1/2・辺1/4・内部1 で数える",
    steps: [
      { title: "分け合いで数える", body: `${sum.join("、")}。`, trap: "見えている球の数をそのまま数えない。となりの格子と分け合っている。", back: [S2] },
      { title: "合計", body: `合わせて {{${n} 個}}。` },
    ],
  };
}

function ionA(r: Rng): QuestionBody {
  const rp = r.pick([0.07, 0.08, 0.1, 0.12, 0.14, 0.15]);
  const rm = r.pick([0.13, 0.17, 0.18, 0.2, 0.22]);
  const a = f(2 * (rp + rm));
  return {
    prompt: `塩化ナトリウム型の結晶をつくるイオン結晶 AB があります。陽イオン A⁺ の半径を ${f(rp)} nm、陰イオン B⁻ の半径を ${f(rm)} nm とすると、単位格子の一辺の長さ a は何 nm ですか。陽イオンと陰イオンは単位格子の辺の上で接しているものとします。`,
    answer: { kind: "num", answerKind: "num", answer: [a], unit: "nm", calc: `2*(${rp}+${rm})` },
    point: "NaCl 型は辺の上で接する：a＝2(r₊＋r₋)",
    steps: [
      { title: "辺の上に並ぶもの", body: "一辺の上には、陰イオンの半径・陽イオンの直径・陰イオンの半径が並ぶ。つまり {{a＝2(r₊＋r₋)}}。", back: [S4] },
      { title: "代入", body: `2×(${f(rp)}＋${f(rm)})＝{{${a} nm}}。`, trap: "r₊＋r₋ で止めない。一辺には陽イオンと陰イオンの「直径」が1つずつのる。" },
    ],
  };
}

const LATTICE = [
  { name: "体心立方格子", root: "√3", v: 1.73, why: "立方体の対角線（長さ √3a）の上で接するので √3a＝4r" },
  { name: "面心立方格子", root: "√2", v: 1.41, why: "面の対角線（長さ √2a）の上で接するので √2a＝4r" },
];

function hankei(r: Rng): QuestionBody {
  const lt = r.pick(LATTICE);
  const as = [280, 288, 300, 320, 340, 360, 380, 400, 420, 440, 460, 500].filter((a) => clean((lt.v * a) / 4, 3));
  const a = r.pick(as);
  const rr = f((lt.v * a) / 4);
  return {
    prompt: `ある金属の結晶は${lt.name}で、単位格子の一辺の長さは ${a} pm です。この金属の原子の半径 r は何 pm ですか。${lt.root}＝${lt.v} とします。`,
    answer: { kind: "num", answerKind: "num", answer: [rr], unit: "pm", calc: `${lt.v}*${a}/4` },
    point: "体心は √3a＝4r、面心は √2a＝4r",
    steps: [
      { title: "どこで接するか", body: `${lt.name}では、${lt.why}。`, trap: "辺の上では接していないので、a＝2r ではない。", back: [S3] },
      { title: "r を求める", body: `r＝${lt.root}a/4＝${lt.v}×${a}÷4＝{{${rr} pm}}。` },
    ],
  };
}

const METAL = [
  { name: "体心立方格子", n: 2 },
  { name: "面心立方格子", n: 4 },
];

function mitsudo(r: Rng): QuestionBody {
  const m = r.pick(METAL);
  const combos: [number, number][] = [];
  for (const M of [24, 27, 39, 48, 56, 59, 64, 93, 108]) for (const V of [2.4, 3.2, 4.0, 4.8, 6.4, 7.2, 8.0])
    if (clean((m.n * M) / (6 * V), 2)) combos.push([M, V]);
  const [M, V] = r.pick(combos);
  const d = f((m.n * M) / (6 * V));
  const mass = f((m.n * M) / 6);
  return {
    prompt: `金属 X（原子量 ${M}）の結晶は${m.name}で、単位格子の体積は ${m1(V)}×10⁻²³ cm³ です。この結晶の密度は何 g/cm³ ですか。アボガドロ定数は 6.0×10²³/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [d], unit: "g/cm³", calc: `${m.n}*${M}/(6.0*${V})` },
    point: "密度＝（M/Nᴀ×粒子の数）÷ a³",
    steps: [
      { title: "粒子の数", body: `${m.name}の単位格子には原子が {{${m.n} 個}}。`, back: [S2, S3] },
      { title: "単位格子の質量", body: `${M}÷(6.0×10²³)×${m.n}${eq((m.n * M) / 6)}{{${mass}×10⁻²³ g}}。`, back: [S5] },
      { title: "体積で割る", body: `${mass}×10⁻²³÷(${m1(V)}×10⁻²³)${eq((m.n * M) / 6)}{{${d} g/cm³}}。`, trap: "粒子の数をかけ忘れると、密度が 1/2 や 1/4 になる。" },
    ],
  };
}

function ionMitsudo(r: Rng): QuestionBody {
  const combos: [number, number][] = [];
  for (const M of [42, 58.5, 60, 72, 78, 84, 96]) for (const V of [6.0, 7.5, 8.0, 10, 12, 13, 15, 16, 20, 24])
    if (clean((4 * M) / (6 * V), 2)) combos.push([M, V]);
  const [M, V] = r.pick(combos);
  const d = f((4 * M) / (6 * V));
  const mass = f((4 * M) / 6);
  return {
    prompt: `塩化ナトリウム型の結晶をつくるイオン結晶 AB（式量 ${M}）の単位格子の体積は ${m1(V)}×10⁻²³ cm³ です。この結晶の密度は何 g/cm³ ですか。アボガドロ定数は 6.0×10²³/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [d], unit: "g/cm³", calc: `4*${M}/(6.0*${V})` },
    point: "NaCl 型の単位格子には AB が4組ふくまれる",
    steps: [
      { title: "単位格子の中の組", body: "NaCl 型では、陽イオン 1/4×12＋1＝4個、陰イオン 1/8×8＋1/2×6＝4個。組成式 AB が {{4組}}。", back: [S4] },
      { title: "単位格子の質量", body: `${M}÷(6.0×10²³)×4${eq((4 * M) / 6)}{{${mass}×10⁻²³ g}}。`, back: [S5] },
      { title: "体積で割る", body: `${mass}×10⁻²³÷(${m1(V)}×10⁻²³)${eq((4 * M) / 6)}{{${d} g/cm³}}。`, trap: "陽イオンと陰イオンを合わせて8個とし、式量に8をかけない。式量は AB 1組分。" },
    ],
  };
}

function genshiryo(r: Rng): QuestionBody {
  const m = r.pick(METAL);
  const combos: [number, number][] = [];
  for (const M of [23, 27, 39, 40, 52, 56, 64, 108, 197]) for (const V of [2.4, 3.0, 4.0, 4.5, 4.8, 6.0, 7.2])
    if (clean((m.n * M) / (6 * V), 3)) combos.push([M, V]);
  const [M, V] = r.pick(combos);
  const d = f((m.n * M) / (6 * V));
  return {
    prompt: `ある金属の結晶は${m.name}で、単位格子の体積は ${m1(V)}×10⁻²³ cm³、密度は ${d} g/cm³ でした。この金属の原子量を求めなさい。アボガドロ定数は 6.0×10²³/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [String(M)], calc: `${d}*${V}*6.0/${m.n}` },
    point: "d＝nM/(Nᴀa³) を M について解く",
    steps: [
      { title: "単位格子の質量", body: `密度×体積＝${d}×${m1(V)}×10⁻²³${eq(Number(d) * V)}{{${f(Number(d) * V)}×10⁻²³ g}}。これが原子 ${m.n} 個分。`, back: [S5] },
      { title: "1 mol あたりに直す", body: `原子1個は ${f(Number(d) * V)}×10⁻²³÷${m.n} g。×6.0×10²³ で {{${M} g/mol}}。原子量は ${M}。`, trap: `原子 ${m.n} 個分の質量のままアボガドロ定数をかけない。1個あたりにしてから。`, back: [S2, S5] },
    ],
  };
}

export const H_SCI_CHEM_KESHO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "単位格子の粒子と長さ",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kazoe", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: kazoe },
        { id: "ion-a", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: ionA },
        { id: "hankei", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: hankei },
      ],
    },
    {
      title: "結晶の密度",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "mitsudo", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: mitsudo },
        { id: "ion-mitsudo", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: ionMitsudo },
        { id: "genshiryo", type: "A", difficulty: 3, points: 21, seconds: 150, skill: "思考・判断・表現", generate: genshiryo },
      ],
    },
  ],
};
