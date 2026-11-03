// 化学「化学反応とエネルギー」の単元模試 (A: 数値を入れかえる生成型 6問)。問題はすべてオリジナル。
// 検算: 先に答えがきれいな値になる組だけを選び、calc (問題の数から答えを出す式) を scripts/check-moshi.ts がシード1〜100で照合する。
//   使う値はレクチャーと同じ: 燃焼エンタルピー H₂ −286、CH₄ −891、C(黒鉛) −394、CO −283 kJ/mol、比熱 4.2 J/(g·K)。
//   ヘスの法則と結合エネルギーの問題は、架空の元素 X・架空の分子 A₂・B₂ にして、値は問題文で与える。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-energy";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "発熱は ΔH＜0、吸熱は ΔH＞0");
const S2 = L(2, "反応式に ΔH を書きそえる");
const S3 = L(3, "反応の熱を測る：温度の上がり方から求める");
const S4 = L(4, "ヘスの法則：道すじによらず ΔH の合計は同じ");
const S5 = L(5, "結合エネルギーから ΔH を見積もる");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const clean = (x: number, d = 3) => Math.abs(x * 10 ** d - Math.round(x * 10 ** d)) < 1e-6;

const FUELS: { name: string; M: number; Q: number }[] = [
  { name: "水素 H₂", M: 2, Q: 286 },
  { name: "メタン CH₄", M: 16, Q: 891 },
  { name: "黒鉛 C", M: 12, Q: 394 },
  { name: "一酸化炭素 CO", M: 28, Q: 283 },
];

function nensho(r: Rng): QuestionBody {
  const fu = r.pick(FUELS);
  const n = r.pick([0.1, 0.2, 0.25, 0.5, 1.5, 2, 3]);
  const w = f(n * fu.M);
  const q = f(n * fu.Q);
  return {
    prompt: `${fu.name}（モル質量 ${fu.M} g/mol）${w} g を完全に燃焼させると、何 kJ の熱が出ますか。${fu.name.split(" ")[0]}の燃焼エンタルピーは −${fu.Q} kJ/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [q], unit: "kJ", calc: `${w}/${fu.M}*${fu.Q}` },
    point: "燃焼エンタルピーは 1 mol あたり。mol をかける",
    steps: [
      { title: "mol に直す", body: `${w}÷${fu.M}＝{{${f(n)} mol}}。`, back: [S2] },
      { title: "1 mol あたりの値をかける", body: `${fu.Q}×${f(n)}＝{{${q} kJ}} の熱が出る（ΔH は負）。`, trap: "「出る熱」を聞かれたら正の値で答える。ΔH で書くなら −をつける。", back: [S1, S2] },
    ],
  };
}

function netsuryo(r: Rng): QuestionBody {
  const m = r.pick([50, 100, 150, 200, 250, 500]);
  const dt = r.pick([2, 4, 5, 6, 8, 10, 12, 15, 20]);
  const q = f((m * 4.2 * dt) / 1000);
  return {
    prompt: `水 ${m} g の温度が ${dt} K 上がりました。水が受けとった熱は何 kJ ですか。水の比熱は 4.2 J/(g·K) とします。`,
    answer: { kind: "num", answerKind: "num", answer: [q], unit: "kJ", calc: `${m}*4.2*${dt}/1000` },
    point: "q＝m×c×Δt。J を kJ に直す",
    steps: [
      { title: "q＝mcΔt", body: `${m}×4.2×${dt}＝{{${f(m * 4.2 * dt)} J}}。`, back: [S3] },
      { title: "kJ に直す", body: `1000 で割って {{${q} kJ}}。`, trap: "J のまま答えない。単位を確かめる。" },
    ],
  };
}

function sokutei(r: Rng): QuestionBody {
  const hot = r.bool();
  const combos: [number, number, number][] = [];
  for (const n of [0.025, 0.05, 0.1]) for (const m of [50, 100, 200]) for (const dt of [1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0, 7.5, 10.5])
    if (clean((m * 4.2 * dt) / 1000 / n, 1) && (m * 4.2 * dt) / 1000 / n < 120) combos.push([n, m, dt]);
  const [n, m, dt] = r.pick(combos);
  const q = f((m * 4.2 * dt) / 1000);
  const dH = (hot ? -1 : 1) * ((m * 4.2 * dt) / 1000 / n);
  const name = r.pick(["ある固体 X", "ある塩 Y", "ある物質 Z"]);
  return {
    prompt: `${name} ${f(n)} mol を水に溶かして、溶液を ${m} g にしたところ、液の温度が ${dt} K ${hot ? "上がりました" : "下がりました"}。この物質の溶解エンタルピーは何 kJ/mol ですか。溶液の比熱は 4.2 J/(g·K) とし、熱はすべて液の温度変化に使われたものとします。`,
    answer: { kind: "num", answerKind: "num", answer: [f(dH)], unit: "kJ/mol", calc: `${hot ? "-" : ""}${m}*4.2*${dt}/1000/${n}` },
    point: "液の温度が上がれば発熱で ΔH＜0、下がれば ΔH＞0",
    steps: [
      { title: "出入りした熱", body: `q＝${m}×4.2×${dt}＝${f(m * 4.2 * dt)} J＝{{${q} kJ}}。`, back: [S3] },
      { title: "1 mol あたり", body: `${q}÷${f(n)}＝${f(Math.abs(dH))} kJ/mol。`, back: [S3] },
      { title: "符号を決める", body: `温度が${hot ? "上がった＝発熱なので {{ΔH＝" + f(dH) + " kJ/mol}}" : "下がった＝吸熱なので {{ΔH＝＋" + f(dH) + " kJ/mol}}"}。`, trap: "ΔH は物質の側から見た変化。液が温まったら物質のエンタルピーは減っている。", back: [S1] },
    ],
  };
}

function hess(r: Rng): QuestionBody {
  const h1 = -r.step(300, 520, 2);
  const h2 = -r.step(150, 290, 3);
  const x = h1 - h2;
  return {
    prompt: `架空の元素 X について、次の2つの反応の ΔH がわかっています。\n① X(固)＋O₂(気) → XO₂(気)　ΔH₁＝${h1} kJ\n② XO(気)＋1/2O₂(気) → XO₂(気)　ΔH₂＝${h2} kJ\nX(固)＋1/2O₂(気) → XO(気) の ΔH は何 kJ ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(x)], unit: "kJ", calc: `(${h1})-(${h2})` },
    point: "求める式＝①−②。ΔH も同じように引く",
    steps: [
      { title: "式の組み合わせ", body: "X → XO → XO₂ と X → XO₂ の ΔH の合計は等しい（{{ヘスの法則}}）。求める式は {{①−②}}。", back: [S4] },
      { title: "引き算", body: `${h1}−(${h2})＝{{${x} kJ}}。`, trap: "①と②を足さない。XO₂ を消すには引く。" },
    ],
  };
}

function ketsugo(r: Rng): QuestionBody {
  const a = r.step(150, 450, 10);
  const b = r.step(150, 450, 10);
  const c = r.step(250, 500, 5);
  const dH = a + b - 2 * c;
  return {
    prompt: `気体の分子 A₂ と B₂ から気体 AB ができる反応 A₂(気)＋B₂(気) → 2AB(気) の ΔH は何 kJ ですか。結合エネルギーは A−A ${a} kJ/mol、B−B ${b} kJ/mol、A−B ${c} kJ/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [String(dH)], unit: "kJ", calc: `(${a}+${b})-2*${c}` },
    point: "ΔH＝（反応物の結合エネルギー）−（生成物の結合エネルギー）",
    steps: [
      { title: "切る結合", body: `A−A 1本と B−B 1本：${a}＋${b}＝{{${a + b} kJ}}（吸収）。`, back: [S5] },
      { title: "つくる結合", body: `A−B 2本：${c}×2＝{{${2 * c} kJ}}（放出）。`, back: [S5] },
      { title: "差をとる", body: `${a + b}−${2 * c}＝{{${dH} kJ}}。`, trap: "（生成物）−（反応物）にすると符号が逆になる。結合エネルギーは切るのに必要なエネルギー。" },
    ],
  };
}

function kongo(r: Rng): QuestionBody {
  const a = r.pick([0.1, 0.2, 0.3, 0.4, 0.5, 0.6]);
  const b = r.pick([0.1, 0.2, 0.3, 0.4, 0.5]);
  const n = f(a + b);
  const Q = f(286 * a + 891 * b);
  return {
    prompt: `水素 H₂ とメタン CH₄ の混合気体が合わせて ${n} mol あります。これを完全に燃焼させて生じた水をすべて液体にしたところ、${Q} kJ の熱が出ました。混合気体にふくまれていた水素は何 mol ですか。燃焼エンタルピーは H₂ −286 kJ/mol、CH₄ −891 kJ/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [f(a)], unit: "mol", calc: `(891*${n}-${Q})/(891-286)` },
    point: "物質量の合計と熱の合計で、連立方程式",
    steps: [
      { title: "文字でおく", body: `H₂ を x mol、CH₄ を y mol とすると、{{x＋y＝${n}}}、{{286x＋891y＝${Q}}}。`, back: [S2] },
      { title: "連立方程式を解く", body: `y＝${n}−x を代入して 286x＋891(${n}−x)＝${Q}。${f(891 * (a + b))}−605x＝${Q}、605x＝{{${f(605 * a)}}} より x＝{{${f(a)} mol}}。`, trap: "燃焼エンタルピーは 1 mol あたり。2H₂＋O₂ の係数につられて2倍にしない。" },
    ],
  };
}

export const H_SCI_CHEM_ENERGY_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "draft" },
  sections: [
    {
      title: "反応の熱と熱量の測定",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "nensho", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: nensho },
        { id: "netsuryo", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: netsuryo },
        { id: "sokutei", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: sokutei },
      ],
    },
    {
      title: "ヘスの法則と結合エネルギー",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hess", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: hess },
        { id: "ketsugo", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: ketsugo },
        { id: "kongo", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: kongo },
      ],
    },
  ],
};
