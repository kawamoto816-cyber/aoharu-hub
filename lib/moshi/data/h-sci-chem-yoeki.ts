// 化学「溶液の性質」の単元模試 (A: 数値を入れかえる生成型 6問)。問題はすべてオリジナル。
// 検算: 先に答え (濃度・析出量・Δt・浸透圧) がきれいな値になる組だけを選び、問題の数はそこから掛け算で作る。
//   calc を scripts/check-moshi.ts がシード1〜100で計算して照合する。水のモル凝固点降下 K＝1.85 K·kg/mol、
//   R＝8.3×10³ Pa·L/(K·mol) (レクチャーと同じ値)。溶解度・気体の溶ける量は架空の物質・値として問題文で与える。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-yoeki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S2 = L(2, "濃度は「何を何で割るか」で3種類");
const S3 = L(3, "溶解度と、冷やして出る結晶");
const S4 = L(4, "気体の溶解度とヘンリーの法則");
const S5 = L(5, "沸点上昇・凝固点降下は粒子の数で決まる");
const S6 = L(6, "浸透圧：水は濃いほうへ移ろうとする");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const m1 = (x: number) => (Math.abs(x * 10 - Math.round(x * 10)) < 1e-9 ? x.toFixed(1) : f(x));
const clean = (x: number, d = 3) => Math.abs(x * 10 ** d - Math.round(x * 10 ** d)) < 1e-6;

const SALTS = ["塩化ナトリウム", "硝酸カリウム", "スクロース", "塩化カリウム"];

function percent(r: Rng): QuestionBody {
  const name = r.pick(SALTS);
  const pc = r.pick([4, 5, 8, 10, 12, 15, 20, 25]);
  const total = r.pick([50, 80, 100, 120, 150, 200, 250]);
  const a = f((total * pc) / 100);
  const b = f(total - (total * pc) / 100);
  return {
    prompt: `${name} ${a} g を水 ${b} g に溶かしました。この水溶液の質量パーセント濃度は何％ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(pc)], unit: "％", calc: `${a}/(${a}+${b})*100` },
    point: "分母は溶媒ではなく溶液（溶質＋溶媒）の質量",
    steps: [
      { title: "溶液の質量", body: `${a}＋${b}＝{{${total} g}}。`, trap: `${a}÷${b} のように、水の質量で割らない。`, back: [S2] },
      { title: "割合にする", body: `${a}÷${total}×100＝{{${pc}％}}。`, back: [S2] },
    ],
  };
}

const SOLUTES: [string, number][] = [
  ["グルコース C₆H₁₂O₆（分子量180）", 180],
  ["尿素 CO(NH₂)₂（分子量60）", 60],
  ["スクロース C₁₂H₂₂O₁₁（分子量342）", 342],
];

function molkg(r: Rng): QuestionBody {
  const [name, M] = r.pick(SOLUTES);
  const m = r.pick([0.05, 0.1, 0.2, 0.25, 0.4, 0.5]);
  const W = r.pick([200, 250, 400, 500]);
  const n = (m * W) / 1000;
  const w = f(n * M);
  return {
    prompt: `${name} ${w} g を水 ${W} g に溶かしました。この水溶液の質量モル濃度は何 mol/kg ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(m)], unit: "mol/kg", calc: `${w}/${M}/(${W}/1000)` },
    point: "質量モル濃度＝溶質の mol ÷ 溶媒の kg",
    steps: [
      { title: "溶質を mol に", body: `${w}÷${M}＝{{${String(Math.round(n * 1e6) / 1e3)} mmol}}（1 mmol＝1/1000 mol）。`, back: [S2] },
      { title: "溶媒の kg で割る", body: `水 ${W} g＝${f(W / 1000)} kg。${String(Math.round(n * 1e6) / 1e3)} mmol÷${f(W / 1000)} kg＝${String(Math.round(m * 1e6) / 1e3)} mmol/kg＝{{${f(m)} mol/kg}}。`, trap: "溶液の体積や質量で割らない。分母は溶媒の質量〔kg〕。", back: [S2] },
    ],
  };
}

function saiketsu(r: Rng): QuestionBody {
  const hi = r.pick([60, 70, 80]);
  const lo = r.pick([10, 20, 30]);
  const Shi = r.pick([60, 80, 100, 110, 120]);
  const Slo = r.pick([20, 25, 30, 32, 40]);
  const W = r.pick([50, 150, 200, 250, 300]);
  const x = f(((Shi - Slo) * W) / 100);
  return {
    prompt: `ある固体 X の水 100 g に対する溶解度は、${hi}℃ で ${Shi}、${lo}℃ で ${Slo} です。${hi}℃ の水 ${W} g に X を溶かした飽和溶液を ${lo}℃ まで冷やすと、X の結晶は何 g 出てきますか。`,
    answer: { kind: "num", answerKind: "num", answer: [x], unit: "g", calc: `(${Shi}-${Slo})*${W}/100` },
    point: "水100 gあたり（溶解度の差）g 出る。あとは比例",
    steps: [
      { title: "水100 gあたり", body: `水100 gなら ${Shi}−${Slo}＝{{${Shi - Slo} g}} 出る。`, back: [S3] },
      { title: "水の量で比例", body: `水は ${W} g なので、${Shi - Slo}×${W}/100＝{{${x} g}}。`, trap: "溶解度は「水100 gあたり」。溶液100 gあたりではない。", back: [S3] },
    ],
  };
}

const ELECTROLYTES: [string, number, string][] = [
  ["グルコース", 1, "電離しないので、粒子はそのまま"],
  ["塩化ナトリウム NaCl", 2, "NaCl → Na⁺＋Cl⁻ で粒子は2倍"],
  ["塩化カルシウム CaCl₂", 3, "CaCl₂ → Ca²⁺＋2Cl⁻ で粒子は3倍"],
];

function gyoko(r: Rng): QuestionBody {
  const combos: [number, number][] = [];
  ELECTROLYTES.forEach((_, i) => {
    for (const m of [0.02, 0.04, 0.05, 0.1, 0.2, 0.4]) if (clean(1.85 * m * ELECTROLYTES[i][1], 3)) combos.push([i, m]);
  });
  const [i, m] = r.pick(combos);
  const [name, k, why] = ELECTROLYTES[i];
  const mt = f(m * k);
  const dt = f(1.85 * m * k);
  return {
    prompt: `${f(m)} mol/kg の${name}水溶液の凝固点降下度は何 K ですか。水のモル凝固点降下は 1.85 K·kg/mol とし、電解質は水中で完全に電離するものとします。`,
    answer: { kind: "num", answerKind: "num", answer: [dt], unit: "K", calc: `1.85*${m}*${k}` },
    point: "Δt＝K·m。m は電離したあとの粒子の総数で数える",
    steps: [
      { title: "粒子の濃度", body: `${why}。粒子の質量モル濃度は {{${mt} mol/kg}}。`, trap: "電解質を溶質の式の数のまま数えない。電離で粒子がふえる。", back: [S5] },
      { title: "Δt＝K·m", body: `1.85×${mt}＝{{${dt} K}}。`, back: [S5] },
    ],
  };
}

function henry(r: Rng): QuestionBody {
  const s = r.pick([1.0, 1.2, 1.4, 2.0, 2.5]);
  const p = r.pick([2.0, 3.0, 4.0, 5.0]);
  const V = r.pick([1.0, 2.0, 3.0, 5.0]);
  const t = r.pick([10, 20, 25]);
  const gas = r.pick(["酸素", "窒素", "水素"]);
  const n = f(s * p * V);
  return {
    prompt: `${t}℃ で、${gas}は圧力 1.0×10⁵ Pa のとき水 1.0 L に ${m1(s)}×10⁻³ mol 溶けるとします。同じ温度で、圧力 ${m1(p)}×10⁵ Pa の${gas}を水 ${m1(V)} L に接触させると、溶ける${gas}は何 mol ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [n], unit: "×10⁻³ mol", calc: `${s}*${p}/1.0*${V}` },
    point: "溶ける気体の物質量は、圧力と水の量に比例する",
    steps: [
      { title: "圧力に比例", body: `圧力が ${f(p)} 倍なので、水 1.0 L に ${f(s)}×${f(p)}＝{{${f(s * p)}×10⁻³ mol}}。`, back: [S4] },
      { title: "水の量に比例", body: `水 ${f(V)} L では ${f(s * p)}×${f(V)}＝{{${n}×10⁻³ mol}}。`, trap: "ヘンリーの法則は温度が一定のときの関係。温度が上がると溶ける量は減る。", back: [S4] },
    ],
  };
}

function shinto(r: Rng): QuestionBody {
  const [name, M] = r.pick(SOLUTES);
  const combos: [number, number, number][] = [];
  for (const c of [0.01, 0.02, 0.04, 0.05, 0.1]) for (const T of [280, 290, 300, 310]) for (const V of [100, 200, 250, 500])
    if (clean((c * 8300 * T) / 1e4, 3) && clean(((c * V) / 1000) * M, 3)) combos.push([c, T, V]);
  const [c, T, V] = r.pick(combos);
  const w = f(((c * V) / 1000) * M);
  const P = f((c * 8300 * T) / 1e4);
  return {
    prompt: `${name} ${w} g を水に溶かして ${V} mL にした水溶液の、${T - 273}℃ における浸透圧は何 Pa ですか。R＝8.3×10³ Pa·L/(K·mol) とします。`,
    answer: { kind: "num", answerKind: "num", answer: [P], unit: "×10⁴ Pa", calc: `${w}/${M}/(${V}/1000)*8.3*10^3*${T}/10^4` },
    point: "Π＝cRT。c はモル濃度、T は絶対温度",
    steps: [
      { title: "モル濃度", body: `${w}÷${M}＝${f((c * V) / 1000)} mol、${V} mL＝${f(V / 1000)} L なので c＝{{${f(c)} mol/L}}。`, back: [S2] },
      { title: "Π＝cRT", body: `${f(c)}×8.3×10³×${T}＝{{${P}×10⁴ Pa}}。`, trap: "温度は℃ではなく K（＋273）で入れる。", back: [S6] },
    ],
  };
}

export const H_SCI_CHEM_YOEKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "濃度と溶解度",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "percent", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: percent },
        { id: "molkg", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: molkg },
        { id: "saiketsu", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: saiketsu },
      ],
    },
    {
      title: "気体の溶解度と希薄溶液の性質",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "henry", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: henry },
        { id: "gyoko", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: gyoko },
        { id: "shinto", type: "A", difficulty: 3, points: 21, seconds: 150, skill: "思考・判断・表現", generate: shinto },
      ],
    },
  ],
};
