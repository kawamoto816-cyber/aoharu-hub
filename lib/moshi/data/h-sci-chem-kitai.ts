// 化学「気体の性質」の単元模試 (A: 数値を入れかえる生成型 6問)。問題はすべてオリジナル。
// 検算: 先に答え (体積・物質量・分子量など) がきれいな値になる組だけを選び、問題の数はそこから掛け算で作る。
//   calc (問題の数から答えを出す式) を scripts/check-moshi.ts がシード1〜100で計算して照合する。
//   気体定数 R＝8.3×10³ Pa·L/(K·mol)、T〔K〕＝t〔℃〕＋273 (レクチャーと同じ値)。水蒸気圧は問題文で与える。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-kitai";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "ボイルの法則：温度一定なら pV＝一定");
const S2 = L(2, "シャルルの法則：温度は絶対温度で");
const S3 = L(3, "気体の状態方程式 pV＝nRT");
const S4 = L(4, "混合気体：全圧は分圧の和");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const m1 = (x: number) => (Math.abs(x * 10 - Math.round(x * 10)) < 1e-9 ? x.toFixed(1) : f(x));
const clean = (x: number, d = 3) => Math.abs(x * 10 ** d - Math.round(x * 10 ** d)) < 1e-6;

function boyle(r: Rng): QuestionBody {
  const combos: [number, number, number][] = [];
  for (const p1 of [1.0, 1.5, 2.0, 2.5, 3.0]) for (const p2 of [1.0, 2.0, 3.0, 4.0, 5.0, 6.0]) for (const V1 of [2.0, 3.0, 4.0, 6.0, 8.0]) {
    if (p1 === p2) continue;
    const V2 = (p1 * V1) / p2;
    if (clean(V2, 2) && V2 >= 0.5) combos.push([p1, p2, V1]);
  }
  const [p1, p2, V1] = r.pick(combos);
  const V2 = f((p1 * V1) / p2);
  return {
    prompt: `温度を一定に保ったまま、${m1(p1)}×10⁵ Pa で ${m1(V1)} L をしめる気体の圧力を ${m1(p2)}×10⁵ Pa にしました。気体の体積は何 L になりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [V2], unit: "L", calc: `${p1}*${V1}/${p2}` },
    point: "温度一定なら p₁V₁＝p₂V₂（ボイルの法則）",
    steps: [
      { title: "式を立てる", body: `ボイルの法則 {{p₁V₁＝p₂V₂}} より、${m1(p1)}×10⁵×${m1(V1)}＝${m1(p2)}×10⁵×V₂。`, back: [S1] },
      { title: "V₂ を求める", body: `V₂＝${f(p1)}×${f(V1)}÷${f(p2)}＝{{${V2} L}}。`, trap: "圧力を大きくしたのに体積が大きくなったら、比を逆にしている。" },
    ],
  };
}

function charles(r: Rng): QuestionBody {
  const combos: [number, number, number][] = [];
  for (const T1 of [250, 280, 300, 320, 350, 400]) for (const T2 of [300, 350, 360, 400, 420, 450, 480, 500, 600]) for (const V1 of [1.5, 2.0, 2.4, 3.0, 4.0, 5.6, 6.0]) {
    if (T1 === T2) continue;
    const V2 = (V1 * T2) / T1;
    if (clean(V2, 2)) combos.push([T1, T2, V1]);
  }
  const [T1, T2, V1] = r.pick(combos);
  const V2 = f((V1 * T2) / T1);
  return {
    prompt: `圧力を一定に保ったまま、${T1 - 273}℃ で ${m1(V1)} L をしめる気体を ${T2 - 273}℃ にしました。気体の体積は何 L になりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [V2], unit: "L", calc: `${V1}*${T2}/${T1}` },
    point: "体積は絶対温度に比例。℃は K に直してから比をとる",
    steps: [
      { title: "絶対温度に直す", body: `${T1 - 273}℃＝{{${T1} K}}、${T2 - 273}℃＝{{${T2} K}}。`, trap: "℃のまま比をとらない。シャルルの法則の比例は絶対温度で成り立つ。", back: [S2] },
      { title: "比例で求める", body: `V/T＝一定より、V₂＝${f(V1)}×${T2}/${T1}＝{{${V2} L}}。`, back: [S2] },
    ],
  };
}

function atsuryoku(r: Rng): QuestionBody {
  const combos: [number, number, number][] = [];
  for (const n0 of [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6]) for (const T0 of [300, 350, 400, 500, 600]) for (const V0 of [4.15, 8.3, 16.6])
    if (clean((n0 * 8300 * T0) / V0 / 1e5, 2)) combos.push([n0, T0, V0]);
  const [n, T, V] = r.pick(combos);
  const p = f((n * 8300 * T) / V / 1e5);
  return {
    prompt: `${f(n)} mol の気体を容積 ${f(V)} L の容器に入れ、${T - 273}℃ に保ちました。容器内の圧力は何 Pa ですか。気体定数は R＝8.3×10³ Pa·L/(K·mol) とします。`,
    answer: { kind: "num", answerKind: "num", answer: [p], unit: "×10⁵ Pa", calc: `${n}*8.3*10^3*${T}/${V}/10^5` },
    point: "p＝nRT/V。T は K、V は L で入れる",
    steps: [
      { title: "温度を K に", body: `${T - 273}℃＋273＝{{${T} K}}。`, back: [S2] },
      { title: "状態方程式に代入", body: `p＝nRT/V＝${f(n)}×8.3×10³×${T}÷${f(V)}＝{{${p}×10⁵ Pa}}。`, trap: "R＝8.3×10³ Pa·L/(K·mol) を使うときは、体積を L で入れる。", back: [S3] },
    ],
  };
}

const GASES: [string, number][] = [
  ["メタン CH₄", 16],
  ["窒素 N₂", 28],
  ["酸素 O₂", 32],
  ["二酸化炭素 CO₂", 44],
  ["アルゴン Ar", 40],
  ["エタン C₂H₆", 30],
];

function bunshiryo(r: Rng): QuestionBody {
  const [, M] = r.pick(GASES);
  const combos: [number, number][] = [];
  for (const n of [0.02, 0.025, 0.04, 0.05, 0.1]) for (const T of [300, 350, 400, 500, 600]) {
    const V = (n * 8300 * T) / 1e5;
    if (clean(V, 3)) combos.push([n, T]);
  }
  const [n, T] = r.pick(combos);
  const V = f((n * 8300 * T) / 1e5);
  const w = f(n * M);
  return {
    prompt: `ある気体 ${w} g は、${T - 273}℃・1.0×10⁵ Pa で ${V} L をしめました。この気体の分子量を求めなさい。気体定数は R＝8.3×10³ Pa·L/(K·mol) とします。`,
    answer: { kind: "num", answerKind: "num", answer: [String(M)], calc: `${w}*8.3*10^3*${T}/(1.0*10^5*${V})` },
    point: "pV＝(w/M)RT を M について解く",
    steps: [
      { title: "物質量を求める", body: `n＝pV/(RT)＝1.0×10⁵×${V}÷(8.3×10³×${T})＝{{${f(n)} mol}}。`, back: [S3] },
      { title: "モル質量を出す", body: `M＝w/n＝${w}÷${f(n)}＝{{${M} g/mol}}。よって分子量は ${M}。`, trap: "温度を℃のまま入れると、分子量がまったくちがう値になる。", back: [S3] },
    ],
  };
}

const PAIRS: [string, string][] = [
  ["窒素", "酸素"],
  ["水素", "窒素"],
  ["ヘリウム", "アルゴン"],
  ["メタン", "酸素"],
];

function bunatsu(r: Rng): QuestionBody {
  const [A, B] = r.pick(PAIRS);
  const combos: [number, number, number][] = [];
  for (const a of [0.1, 0.2, 0.3, 0.4, 0.6, 0.8]) for (const b of [0.1, 0.2, 0.4, 0.5]) for (const P of [1.0, 1.5, 2.0, 3.0]) {
    const pa = (P * a) / (a + b);
    if (clean(pa, 2)) combos.push([a, b, P]);
  }
  const [a, b, P] = r.pick(combos);
  const pa = f((P * a) / (a + b));
  const x = f(a / (a + b));
  return {
    prompt: `${A} ${f(a)} mol と${B} ${f(b)} mol を混ぜた混合気体を容器に入れたところ、全圧が ${m1(P)}×10⁵ Pa になりました。${A}の分圧は何 Pa ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [pa], unit: "×10⁵ Pa", calc: `${P}*${a}/(${a}+${b})` },
    point: "分圧＝全圧×モル分率",
    steps: [
      { title: "モル分率", body: `${A}のモル分率は ${f(a)}÷(${f(a)}＋${f(b)})＝{{${x}}}。`, back: [S4] },
      { title: "分圧", body: `${m1(P)}×10⁵×${x}＝{{${pa}×10⁵ Pa}}。`, trap: "全圧を物質量の比で分ける。質量の比で分けない。", back: [S4] },
    ],
  };
}

function suijo(r: Rng): QuestionBody {
  // 27℃ 固定。(P − pw) が R·T·0.04＝9.96×10⁴ Pa になるように大気圧 P を作る
  const T = 300;
  const pw = r.pick([2.0, 2.4, 3.0, 3.6, 4.0]) * 1000;
  const k = 0.04; // mol/L
  const P = Math.round(8300 * T * k + pw);
  const Vs = [0.5, 0.75, 1.0, 1.25, 1.5];
  const V = r.pick(Vs);
  const n = f(k * V);
  const Pm = f(P / 1e5);
  const dp = f((P - pw) / 1e5);
  return {
    prompt: `水素を水上置換で集めたところ、${T - 273}℃・大気圧 ${Pm}×10⁵ Pa で、集気びん内の気体の体積は ${f(V)} L でした（びんの内外の水面はそろえてあります）。集めた水素の物質量は何 mol ですか。${T - 273}℃ の水蒸気圧は ${m1(pw / 1000)}×10³ Pa、R＝8.3×10³ Pa·L/(K·mol) とします。`,
    answer: { kind: "num", answerKind: "num", answer: [n], unit: "mol", calc: `(${Pm}*10^5-${pw})*${V}/(8.3*10^3*${T})` },
    point: "水上置換の気体の分圧＝大気圧−水蒸気圧",
    steps: [
      { title: "水素の分圧", body: `びんの中は水素と水蒸気。水素の分圧＝${Pm}×10⁵−${m1(pw / 1000)}×10³＝{{${dp}×10⁵ Pa}}。`, trap: "大気圧のまま pV＝nRT に入れない。水蒸気の分だけ引く。", back: [S4] },
      { title: "物質量", body: `n＝pV/(RT)＝${dp}×10⁵×${f(V)}÷(8.3×10³×${T})＝{{${n} mol}}。`, back: [S3] },
    ],
  };
}

export const H_SCI_CHEM_KITAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "ボイル・シャルルの法則",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "boyle", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: boyle },
        { id: "charles", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: charles },
      ],
    },
    {
      title: "状態方程式と混合気体",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "atsuryoku", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: atsuryoku },
        { id: "bunshiryo", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: bunshiryo },
        { id: "bunatsu", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: bunatsu },
        { id: "suijo", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: suijo },
      ],
    },
  ],
};
