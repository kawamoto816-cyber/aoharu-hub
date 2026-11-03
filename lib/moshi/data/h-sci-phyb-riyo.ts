// 物理基礎「エネルギーとその利用」の単元模試 (A: 数値を入れかえる計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: 変換効率＝(目的の形になったエネルギー)÷(入れたエネルギー)×100、半減期 n 回で (1/2)ⁿ を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。経過時間は半減期の整数倍だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phyb-riyo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "エネルギーは形を変えて移っていく");
const S2 = L(2, "変換効率：役に立つ形になった割合");
const S3 = L(3, "いろいろな発電と、その課題");
const S4 = L(4, "放射線と半減期");
const S5 = L(5, "放射線の種類と単位");
const S6 = L(6, "核分裂と原子力発電");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

/** [装置, 入れたもの, 目的の形] */
const DEV: [string, string, string][] = [
  ["LED 照明", "電気エネルギー", "光"],
  ["モーター", "電気エネルギー", "仕事（力学的エネルギー）"],
  ["電気ポット", "電気エネルギー", "水の温度を上げる熱"],
  ["発電機", "力学的エネルギー", "電気エネルギー"],
];

function koritsu(r: Rng): QuestionBody {
  const [dev, inn, out] = r.pick(DEV);
  const Ein = r.step(200, 2000, 200);
  const pct = r.step(10, 90, 5);
  const Eout = (Ein * pct) / 100;
  return {
    prompt: `ある${dev}に ${Ein} J の${inn}を与えたところ、${f(Eout)} J が${out}になった。この${dev}の変換効率は何％ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(pct)], unit: "％", calc: `${f(Eout)}/${Ein}*100` },
    point: "変換効率＝目的の形になった量÷入れた量",
    steps: [
      { title: "割合を出す", body: `${f(Eout)}÷${Ein}＝${f(pct / 100)}、つまり {{${pct}％}}。`, back: [S2] },
      { title: "残りはどこへ", body: `残りの ${f(Ein - Eout)} J はおもに熱として周りに逃げた。総量は ${Ein} J のまま（エネルギー保存）。`, back: [S1] },
    ],
  };
}

function hangenki(r: Rng): QuestionBody {
  const half = r.pick([2, 5, 8, 10, 20, 30]);
  const n = r.int(1, 5);
  const t = half * n;
  const den = 2 ** n;
  const unitT = r.pick(["日", "年"]);
  return {
    prompt: `半減期が ${half} ${unitT}の放射性の原子核がある。${t} ${unitT}たつと、はじめの数の何倍が、こわれずに残っていますか。分数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [`1/${den}`], unit: "倍", calc: `1/2^${n}` },
    point: "半減期1回ごとに、そのときの量の 1/2",
    steps: [
      { title: "何回分か", body: `${t}÷${half}＝${n} で、半減期 ${n} 回分。`, back: [S4] },
      { title: "1/2 を回数分かける", body: `(1/2)^${n}＝{{1/${den}}}。`, trap: n >= 2 ? `半減期の2倍で「全部なくなる」わけではない。1/2 の 1/2 で 1/4。` : "ゼロにはならない。少しずつ減り続ける。" },
    ],
  };
}

function bq(r: Rng): QuestionBody {
  const half = r.pick([3, 6, 8, 12, 15]);
  const n = r.int(1, 4);
  const den = 2 ** n;
  const A = r.pick([800, 1600, 3200, 4000, 4800, 6400]);
  if (r.bool()) {
    return {
      prompt: `ある試料にふくまれる放射性物質の放射能が、はじめ ${A} Bq であった。この放射性物質の半減期を ${half} 日とすると、${half * n} 日後の放射能は何 Bq ですか。放射能は残っている原子核の数に比例するものとする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(A / den)], unit: "Bq", calc: `${A}*(1/2)^${n}` },
      point: "放射能も半減期ごとに 1/2",
      steps: [
        { title: "回数", body: `${half * n}÷${half}＝${n} 回分。`, back: [S4] },
        { title: "計算", body: `${A}×(1/2)^${n}＝{{${f(A / den)}}} Bq。`, back: [S5] },
      ],
    };
  }
  return {
    prompt: `半減期 ${half} 日の放射性の原子核が、はじめの 1/${den} に減っていた。何日たったと考えられますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(half * n)], unit: "日", calc: `${half}*${n}` },
    point: "1/2ⁿ になった → 半減期 n 回分",
    steps: [
      { title: "何回半分になったか", body: `1/${den}＝(1/2)^${n} なので、半減期 ${n} 回分。`, back: [S4] },
      { title: "時間", body: `${half}×${n}＝{{${half * n}}} 日。`, trap: `1/${den} だから ${den} 回、としない。2 を何回かけたかを数える。` },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("karyoku", 1),
    prompt: "火力発電で、燃料のエネルギーが電気エネルギーになるまでの移り変わりとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["化学エネルギー → 熱 → 運動（タービン） → 電気", "核エネルギー → 熱 → 運動（タービン） → 電気", "光 → 電気", "位置エネルギー → 運動（水車） → 電気"],
      correct: 0,
      why: ["正しい。燃料を燃やした熱で蒸気をつくり、タービンを回して発電する。", "核エネルギーから始まるのは原子力発電。", "光を直接電気に変えるのは太陽光発電。", "高い所の水の位置エネルギーを使うのは水力発電。"],
    },
    point: "火力：化学→熱→運動→電気",
    steps: [{ title: "順にたどる", body: "燃料の{{化学エネルギー}}を燃やして熱に、蒸気でタービンを回し、発電機で{{電気エネルギー}}にする。", back: [S1] }],
  },
  {
    ...base("alpha", 1),
    prompt: "α線・β線・γ線のうち、透過力が最も小さく、紙1枚で止めることができるのはどれですか。",
    answer: {
      kind: "choice",
      options: ["α線", "β線", "γ線", "3つとも同じ"],
      correct: 0,
      why: ["正しい。α線の透過力は最も小さい。", "β線は紙は通りぬける。", "γ線は透過力が大きい電磁波。", "3つは透過力がちがう。"],
    },
    point: "透過力：α線が最も小さい",
    steps: [{ title: "透過力", body: "α線・β線・γ線は物を通りぬける力（{{透過力}}）がちがい、{{α線}}は紙1枚で止まる。", back: [S5] }],
  },
  {
    ...base("bq-sv", 2),
    prompt: "放射線に関する単位で、「人体が受ける影響の大きさ」を表すものはどれですか。",
    answer: {
      kind: "choice",
      options: ["シーベルト（Sv）", "ベクレル（Bq）", "ジュール（J）", "ワット（W）"],
      correct: 0,
      why: ["正しい。", "Bq は放射性物質が1秒間にこわれる原子核の数（放射能の強さ）。", "J はエネルギーの単位。", "W は仕事率・電力の単位。"],
    },
    point: "Bq＝放射性物質の強さ、Sv＝人体が受ける影響",
    steps: [{ title: "2つの単位", body: "{{ベクレル}}は1秒間にこわれる原子核の数、{{シーベルト}}は人体が受ける影響の大きさ。同じ Bq でも距離や時間で Sv は変わる。", back: [S5] }],
  },
  {
    ...base("saisei", 2),
    prompt: "再生可能エネルギーによる発電に{{あてはまらない}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["天然ガスを燃やす火力発電", "風力発電", "地熱発電", "太陽光発電"],
      correct: 0,
      why: ["正しい。天然ガスは使うと減る燃料で、自然の中でくり返し補われるものではない。", "風は自然の中でくり返し補われる。", "地熱は再生可能エネルギーにふくまれる。", "太陽光は再生可能エネルギー。"],
    },
    point: "再生可能＝自然の中でくり返し補われる",
    steps: [{ title: "補われるか", body: "{{再生可能エネルギー}}は水力・太陽光・風力・地熱など、自然の中でくり返し補われるもの。燃料を使う火力・原子力はふくまない。", back: [S3] }],
  },
  {
    ...base("kakubunretsu", 3, "思考・判断・表現"),
    prompt: "原子力発電で熱が得られるしくみとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["ウラン235の原子核が中性子を受けて分裂し、減ったわずかな質量がエネルギーになる", "ウランが酸素と結びついて燃える", "水素の原子核どうしが合体してヘリウムになる", "ウランの原子核が中性子を出さずに、ゆっくり冷えていく"],
      correct: 0,
      why: ["正しい。E＝mc² の関係で、減った質量がエネルギーになる。", "燃焼は化学反応で、核分裂とはちがう。", "これは核融合。原子力発電は核分裂を使う。", "核分裂では 2〜3 個の中性子が出て、次の分裂（連鎖反応）を起こす。"],
    },
    point: "核分裂：減った質量が E＝mc² でエネルギーに",
    steps: [{ title: "核分裂", body: "ウラン235に中性子が当たると{{核分裂}}し、2〜3個の中性子と大きなエネルギーが出る。分裂後に減った質量が {{E＝mc²}} でエネルギーになる。", back: [S6] }],
  },
  {
    ...base("hozon-netsu", 3, "思考・判断・表現"),
    prompt: "「エネルギーは保存されるのに、なぜ節約が必要なのか」という疑問に対する説明として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["エネルギーの総量は変わらないが、熱として周りに散らばると、ふたたび使うのが難しくなるから", "エネルギーは使うたびに少しずつ消えてなくなるから", "変換効率は100％にできるが、装置が高価だから", "熱になったエネルギーは、すぐに電気エネルギーにもどってしまうから"],
      correct: 0,
      why: ["正しい。総量は保存されても、使いやすい形のエネルギーは減っていく。", "エネルギーの総量は増えも減りもしない（エネルギー保存の法則）。", "一部は必ず熱になるので、効率は100％より小さい。", "散らばった熱は、自然に電気にもどることはない。"],
    },
    point: "総量は保存、でも散らばった熱は使いにくい",
    steps: [{ title: "保存と使いやすさ", body: "エネルギーの{{総量は保存}}されるが、変換のたびに一部が{{熱として散らばり}}、使いにくくなる。", back: [S1, S2] }],
  },
];

export const H_SCI_PHYB_RIYO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理基礎",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "効率と半減期の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "koritsu", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: koritsu },
        { id: "hangenki", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: hangenki },
        { id: "bq", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: bq },
      ],
    },
    { title: "エネルギー資源と放射線", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
