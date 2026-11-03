// 数学B「統計的な推定」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。数値の場面はすべて架空。
// 検算: 標本平均の標準偏差 σ/√n は n を平方数にして割り切れる組だけを使う。信頼度95%の区間は x̄±1.96σ/√n、
//   母比率は p̂±1.96√{p̂(1−p̂)/n} で、√ の中が平方数になる (p̂, n) の表から選ぶ。必要な標本の大きさは (1.96σ/e)²。
//   答えはすべて equations・calc に問題の数からの式を書き、scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-b-suitei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "母集団と標本");
const S2 = L(2, "標本平均は N(m, σ²/n) にしたがう");
const S3 = L(3, "母平均の信頼区間（信頼度95%）");
const S4 = L(4, "母比率の信頼区間");
const S5 = L(5, "区間の幅と「95%」の意味");
const S6 = L(6, "必要な標本の大きさ：母集団の大きさは式に出てこない");

const f3 = (x: number) => String(Math.round(x * 1000) / 1000);
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const fr = (n: number, d: number) => {
  const g = gcd(n, d) * (d < 0 ? -1 : 1);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};

const CTX = [
  { what: "ある工場でつくる菓子袋1袋の重さ", unit: "g" },
  { what: "ある町の高校生の1日の通学時間", unit: "分" },
  { what: "ある果樹園でとれるりんご1個の重さ", unit: "g" },
  { what: "ある地域の家庭の1か月の水道使用量", unit: "m³" },
  { what: "ある学校の生徒の1週間の読書時間", unit: "分" },
];

function hyohon(r: Rng): QuestionBody {
  const c = r.pick(CTX);
  const rn = r.pick([4, 5, 6, 7, 8, 10, 12]);
  const n = rn * rn;
  const k = r.pick([1, 2, 3, 0.5, 1.5]);
  const s = Math.round(k * rn * 10) / 10;
  const m = r.int(20, 300);
  return {
    prompt: `${c.what}は、平均 ${m}${c.unit}、標準偏差 ${s}${c.unit} の母集団とみなせる。ここから大きさ ${n} の無作為標本をとるとき、標本平均 X̄ の期待値 E(X̄) と標準偏差 σ(X̄) を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(m), String(k)], labels: ["E(X̄) =", "σ(X̄) ="], unit: c.unit, equations: [`x=${m}`, `y=${s}/√${n}`] },
    point: "E(X̄)＝m、σ(X̄)＝σ/√n",
    steps: [
      { title: "期待値", body: `標本平均の期待値は母平均と同じで {{${m}}}。`, back: [S1, S2] },
      { title: "標準偏差", body: `σ(X̄)＝${s}/√${n}＝${s}/${rn}＝{{${k}}}。`, trap: "σ/n とわると小さくなりすぎる。わるのは √n。" },
    ],
  };
}

function heikin(r: Rng): QuestionBody {
  const c = r.pick(CTX);
  const rn = r.pick([5, 6, 7, 8, 10, 12, 15]);
  const n = rn * rn;
  const k = r.pick([1, 2, 0.5, 3]);
  const s = Math.round(k * rn * 10) / 10;
  const xb = r.int(30, 250) + r.pick([0, 0.5]);
  const e = Math.round(1.96 * k * 1000) / 1000;
  const lo = f3(xb - e);
  const hi = f3(xb + e);
  return {
    prompt: `${c.what}について、大きさ ${n} の無作為標本をとると、標本平均は ${xb}${c.unit} だった。母標準偏差を ${s}${c.unit} として、母平均 m に対する信頼度95%の信頼区間を A≦m≦B と表すとき、A、B を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [lo, hi], labels: ["A =", "B ="], equations: [`x=${xb}-1.96*${s}/√${n}`, `y=${xb}+1.96*${s}/√${n}`] },
    point: "x̄ ± 1.96 × σ/√n",
    steps: [
      { title: "σ/√n", body: `${s}/√${n}＝${s}/${rn}＝${k}。`, back: [S2] },
      { title: "区間の幅の半分", body: `1.96×${k}＝${e}。`, back: [S3] },
      { title: "区間", body: `${xb}−${e}≦m≦${xb}＋${e} より、{{${lo}≦m≦${hi}}}。`, trap: "1.96 をかけ忘れると、信頼度がずっと低い区間になる。" },
    ],
  };
}

const PROP: { p: number; n: number; se: number }[] = [
  { p: 0.2, n: 100, se: 0.04 },
  { p: 0.2, n: 400, se: 0.02 },
  { p: 0.2, n: 1600, se: 0.01 },
  { p: 0.1, n: 400, se: 0.015 },
  { p: 0.5, n: 100, se: 0.05 },
  { p: 0.5, n: 400, se: 0.025 },
  { p: 0.3, n: 2100, se: 0.01 },
  { p: 0.5, n: 2500, se: 0.01 },
  { p: 0.1, n: 100, se: 0.03 },
  { p: 0.1, n: 900, se: 0.01 },
  { p: 0.8, n: 400, se: 0.02 },
  { p: 0.9, n: 900, se: 0.01 },
];
const PCTX = ["ある市の有権者のうち、ある政策に賛成の人", "ある工場の製品のうち、不良品", "ある町の世帯のうち、ペットを飼っている世帯", "ある種の苗のうち、1か月以内に花が咲いたもの"];

function hiritsu(r: Rng): QuestionBody {
  const t = r.pick(PROP);
  const ctx = r.pick(PCTX);
  const k = Math.round(t.p * t.n);
  const pct = Math.round(t.p * 100);
  const e = Math.round(196 * t.se * 1000) / 1000;
  const lo = f3(pct - e);
  const hi = f3(pct + e);
  return {
    prompt: `${ctx}の割合 p を調べるため、無作為に ${t.n} 個 (人) を選んだところ、${k} 個 (人) があてはまった。母比率 p に対する信頼度95%の信頼区間を、百分率で A%≦p≦B% と表すとき、A、B を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [lo, hi], labels: ["A =", "B ="], equations: [`x=100*(${k}/${t.n}-1.96*${t.se})`, `y=100*(${k}/${t.n}+1.96*${t.se})`] },
    point: "p̂ ± 1.96√{p̂(1−p̂)/n}",
    steps: [
      { title: "標本比率", body: `p̂＝${k}/${t.n}＝${t.p}。`, back: [S4] },
      { title: "√ の部分", body: `√{${t.p}×${f3(1 - t.p)}÷${t.n}}＝√{${f3(t.p * (1 - t.p))}÷${t.n}}＝${t.se}。百分率では ${f3(t.se * 100)}%。`, trap: "p̂(1−p̂) を n でわってから √ をとる。√ をとってから n でわらない。" },
      { title: "区間", body: `1.96×${f3(t.se * 100)}＝${e} なので、${pct}−${e}≦p≦${pct}＋${e} (%)。{{${lo}%≦p≦${hi}%}}。` },
    ],
  };
}

function hukusu(r: Rng): QuestionBody {
  const a = r.pick([4, 9, 16, 25, 100]);
  const big = r.bool();
  const W = r.pick([2, 3, 4, 6, 8, 12]) * (a === 100 ? 5 : 1);
  const n0 = r.pick([25, 36, 50, 64, 100]);
  const n1 = big ? n0 * a : n0;
  const nStart = big ? n0 : n0 * a;
  const ra = Math.round(Math.sqrt(a));
  const ans = big ? fr(W, ra) : String(W * ra);
  return {
    prompt: `母標準偏差がわかっている母集団から大きさ ${nStart} の標本をとって母平均を推定すると、信頼度95%の信頼区間の幅は ${W} だった。同じ母集団で標本の大きさを ${n1} にすると、信頼区間の幅はおよそいくらになりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: `${W}*√${nStart}/√${n1}` },
    point: "幅は 2×1.96σ/√n。n が a 倍なら幅は 1/√a 倍",
    steps: [
      { title: "幅の式", body: "区間の幅は 2×1.96×σ/√n で、{{√n に反比例}}します。", back: [S5] },
      { title: "倍率", body: `n が ${nStart} から ${n1} へ ${big ? `${a} 倍` : `1/${a} 倍`} なので、幅は ${big ? `1/√${a}＝1/${ra}` : `√${a}＝${ra}`} 倍。${W}×${big ? `1/${ra}` : ra}＝{{${ans}}}。`, trap: `n を ${a} 倍しても幅は 1/${a} にはならない。√ がつく。` },
    ],
  };
}

function hitsuyo(r: Rng): QuestionBody {
  const K = r.pick([4, 5, 7, 8, 10, 14, 20]);
  const s = r.pick([5, 10, 15, 20]);
  const e = f3((1.96 * s) / K);
  return {
    prompt: `母標準偏差 ${s} の母集団の母平均を、信頼度95%で推定したい。信頼区間の幅の半分 (1.96σ/√n) を ${e} 以下にするには、標本の大きさ n を少なくとも何以上にすればよいですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(K * K)], calc: `(1.96*${s}/${e})^2` },
    point: "1.96σ/√n≦e を √n について解く",
    steps: [
      { title: "不等式", body: `1.96×${s}/√n≦${e} より、√n≧1.96×${s}÷${e}＝${f3(1.96 * s)}÷${e}＝${K}。`, back: [S6] },
      { title: "2乗する", body: `n≧${K}²＝{{${K * K}}}。`, trap: "母集団の大きさ (全体の人数) は、この式に出てこない。" },
    ],
  };
}

function gyaku(r: Rng): QuestionBody {
  const rn = r.pick([5, 8, 10, 4, 6]);
  const n = rn * rn;
  const k = r.pick([1, 2, 3, 0.5, 1.5]);
  const s = Math.round(k * rn * 10) / 10;
  const xb = r.int(40, 160);
  const e = Math.round(1.96 * k * 1000) / 1000;
  const lo = f3(xb - e);
  const hi = f3(xb + e);
  return {
    prompt: `ある母集団から大きさ ${n} の無作為標本をとり、母平均 m に対する信頼度95%の信頼区間を求めたところ、${lo}≦m≦${hi} となった。このときの標本平均 x̄ と、用いた母標準偏差 σ を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(xb), String(s)], labels: ["x̄ =", "σ ="], equations: [`x=(${lo}+${hi})/2`, `y=(${hi}-${lo})/2/1.96*√${n}`] },
    point: "区間のまん中が x̄、幅の半分が 1.96σ/√n",
    steps: [
      { title: "まん中", body: `x̄＝(${lo}＋${hi})÷2＝{{${xb}}}。`, back: [S3] },
      { title: "幅の半分", body: `(${hi}−${lo})÷2＝${e}＝1.96×σ/√${n}。σ/${rn}＝${e}÷1.96＝${k}。`, back: [S5] },
      { title: "σ", body: `σ＝${k}×${rn}＝{{${s}}}。`, trap: "幅全体を 1.96 でわると、σ が2倍になってしまう。半分にしてからわる。" },
    ],
  };
}

export const H_MATH_B_SUITEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学B",
  review: { status: "draft" },
  sections: [
    {
      title: "標本平均と信頼区間",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hyohon", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: hyohon },
        { id: "heikin", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: heikin },
        { id: "hiritsu", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: hiritsu },
      ],
    },
    {
      title: "区間の幅と標本の大きさ",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hukusu", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: hukusu },
        { id: "hitsuyo", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: hitsuyo },
        { id: "gyaku", type: "A", difficulty: 3, points: 24, seconds: 150, skill: "思考・判断・表現", generate: gyaku },
      ],
    },
  ],
};
