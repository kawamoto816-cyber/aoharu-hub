// 化学「有機化合物の構造と異性体」の単元模試 (B: プール9問から4問 ＋ A: 元素分析の計算2問)。問題はすべてオリジナル。
// 検算 (A): 先に化合物の分子式と物質量 (mmol) を決め、試料・CO₂・H₂O の質量を掛け算で作る。
//   C＝CO₂×12/44、H＝H₂O×2.0/18、O は差し引き (レクチャーと同じ求め方)。calc・equations を scripts/check-moshi.ts が
//   シード1〜100で照合する。原子量 H 1.0、C 12、O 16。B の事実 (異性体の数・シス-トランス・不斉炭素) はレクチャーの記述だけ。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-yuki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "炭化水素は骨組みの形で分類する");
const S2 = L(2, "官能基が性質を決める");
const S3 = L(3, "元素分析で分子式を決める");
const S4 = L(4, "構造異性体：つながり方がちがう");
const S5 = L(5, "立体異性体：つながりは同じで、空間での形がちがう");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

/** [C, H, O] (どれも実在する分子式) */
const FORMULAS: [number, number, number][] = [
  [2, 6, 1],
  [2, 4, 2],
  [3, 8, 1],
  [3, 6, 1],
  [3, 6, 3],
  [4, 10, 1],
  [4, 8, 2],
  [6, 12, 6],
  [1, 4, 1],
];
const Mof = ([x, y, z]: [number, number, number]) => 12 * x + y + 16 * z;

function sanso(r: Rng): QuestionBody {
  const fm = r.pick(FORMULAS);
  const n = r.pick([0.05, 0.1, 0.2, 0.25, 0.5]);
  const w = f(n * Mof(fm));
  const co2 = f(n * fm[0] * 44);
  const h2o = f(n * (fm[1] / 2) * 18);
  const c = f(n * fm[0] * 12);
  const h = f(n * fm[1]);
  const o = f(n * fm[2] * 16);
  return {
    prompt: `炭素・水素・酸素だけからなる有機化合物 ${w} mg を完全燃焼させたところ、二酸化炭素 ${co2} mg と水 ${h2o} mg が生じました。この試料にふくまれていた酸素は何 mg ですか。原子量は H＝1.0、C＝12、O＝16 とします。`,
    answer: { kind: "num", answerKind: "num", answer: [o], unit: "mg", calc: `${w}-${co2}*12/44-${h2o}*2/18` },
    point: "C と H は生成物から、O は試料から差し引く",
    steps: [
      { title: "C と H の質量", body: `C＝${co2}×12/44＝{{${c} mg}}、H＝${h2o}×2.0/18＝{{${h} mg}}。`, back: [S3] },
      { title: "O は差し引き", body: `O＝${w}−${c}−${h}＝{{${o} mg}}。`, trap: "生成物の CO₂・H₂O の O から求めない。燃焼に外から酸素を使っている。", back: [S3] },
    ],
  };
}

function bunshishiki(r: Rng): QuestionBody {
  const fm = r.pick(FORMULAS);
  const M = Mof(fm);
  const n = r.pick([0.05, 0.1, 0.2, 0.25, 0.5]);
  const w = f(n * M);
  const co2 = f(n * fm[0] * 44);
  const h2o = f(n * (fm[1] / 2) * 18);
  return {
    prompt: `炭素・水素・酸素だけからなる有機化合物 ${w} mg を完全燃焼させたところ、二酸化炭素 ${co2} mg と水 ${h2o} mg が生じました。この化合物の分子量は ${M} です。分子式を CₓHᵧO_z と表すとき、x と y を求めなさい。原子量は H＝1.0、C＝12、O＝16 とします。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(fm[0]), String(fm[1])], labels: ["x =", "y ="], equations: [`x=${co2}/44/(${w}/${M})`, `y=${h2o}/18*2/(${w}/${M})`] },
    point: "分子1 mol あたりの C・H の mol を数える",
    steps: [
      { title: "試料の物質量", body: `${w} mg÷${M}＝{{${f(n)} mmol}}。`, back: [S3] },
      { title: "C の数", body: `CO₂ は ${co2}÷44＝${f(n * fm[0])} mmol。分子1つあたり ${f(n * fm[0])}÷${f(n)}＝{{${fm[0]} 個}}。`, back: [S3] },
      { title: "H の数", body: `H₂O は ${h2o}÷18＝${f((n * fm[1]) / 2)} mmol で、H はその2倍の ${f(n * fm[1])} mmol。分子1つあたり {{${fm[1]} 個}}。`, trap: "H₂O 1分子に H は2個。H₂O の mol のままにしない。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("carboxy", 1),
    prompt: "カルボン酸がもつ官能基 −COOH の名前はどれですか。",
    answer: {
      kind: "choice",
      options: ["カルボキシ基", "ヒドロキシ基", "ホルミル基", "カルボニル基"],
      correct: 0,
      why: ["−COOH はカルボキシ基で、水中でわずかに電離して弱い酸性を示す。", "ヒドロキシ基は −OH（アルコール）。", "ホルミル基は −CHO（アルデヒド）。", "カルボニル基は ＞C＝O（ケトン）。"],
    },
    point: "−COOH カルボキシ基、−OH ヒドロキシ基、−CHO ホルミル基",
    steps: [{ title: "官能基", body: "{{−COOH はカルボキシ基}}。カルボン酸は弱い酸性を示します。", back: [S2] }],
  },
  {
    ...b("alkane", 1),
    prompt: "単結合だけでできた鎖式の炭化水素（一般式 CₙH₂ₙ₊₂）を何といいますか。",
    answer: { kind: "term", accept: ["アルカン"], near: [{ text: "アルケン", why: "アルケンは C＝C 二重結合を1つもつ CₙH₂ₙ の炭化水素です。" }] },
    point: "単結合だけ＝アルカン CₙH₂ₙ₊₂",
    steps: [{ title: "分類", body: "単結合だけの{{アルカン}}、C＝C をもつアルケン、C≡C をもつアルキン。", back: [S1] }],
  },
  {
    ...b("c4h10", 1),
    prompt: "分子式 C₄H₁₀ で表される化合物の構造異性体は何種類ありますか。",
    answer: {
      kind: "choice",
      options: ["2種類", "1種類", "3種類", "4種類"],
      correct: 0,
      why: ["ブタンと 2-メチルプロパンの2種類。", "炭素骨格のちがう異性体がある。", "3種類あるのは C₅H₁₂。", "鎖の折り曲げ方を変えただけのものは同じ物質。"],
    },
    point: "C₄H₁₀ は2種類、C₅H₁₂ は3種類",
    steps: [{ title: "炭素骨格", body: "一直線の{{ブタン}}と、枝分かれした{{2-メチルプロパン}}の2種類です。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...b("futten", 2, "思考・判断・表現"),
    prompt: "同じ分子式 C₂H₆O をもつエタノールとジメチルエーテルでは、エタノールの沸点がずっと高くなります。その理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["エタノールは −OH どうしで分子間に水素結合をつくるから", "エタノールのほうが分子量が大きいから", "ジメチルエーテルは分子の中に二重結合をもつから", "エタノールはイオン結晶だから"],
      correct: 0,
      why: ["−OH どうしの水素結合で分子が強く引き合い、沸点が約78℃と高い。", "分子式が同じなので分子量も同じ。", "ジメチルエーテル CH₃OCH₃ に二重結合はない。", "エタノールは分子からなる物質。"],
    },
    point: "−OH は分子間で水素結合をつくる",
    steps: [{ title: "分子間の引き合い", body: "エタノールは{{分子間に水素結合}}をつくるので、同じ分子式のジメチルエーテルより沸点が高くなります。", back: [S4] }],
  },
  {
    ...b("cis-trans", 2, "思考・判断・表現"),
    prompt: "次のうち、シス-トランス異性体が存在するものはどれですか。",
    answer: {
      kind: "choice",
      options: ["2-ブテン CH₃CH＝CHCH₃", "1-ブテン CH₂＝CHCH₂CH₃", "エチレン CH₂＝CH₂", "ブタン CH₃CH₂CH₂CH₃"],
      correct: 0,
      why: ["二重結合の両側の C に、それぞれ H と CH₃ というちがう原子・原子団がつく。", "一方の C に同じ H が2つついているので、シス-トランス異性体はない。", "両側の C に同じ H が2つずつつく。", "単結合は自由に回転できるので、シス-トランス異性体はない。"],
    },
    point: "C＝C の両側の C に、それぞれちがう2つがつく",
    steps: [{ title: "条件", body: "C＝C は回転できないので、{{二重結合の両側の C にそれぞれちがう原子・原子団}}がつくとシス-トランス異性体ができます。", back: [S5] }],
  },
  {
    ...b("c5h12", 2),
    prompt: "C₅H₁₂ の構造異性体のうち、沸点がいちばん低いものはどれですか。",
    answer: {
      kind: "choice",
      options: ["2,2-ジメチルプロパン", "ペンタン", "2-メチルブタン", "3つとも同じ"],
      correct: 0,
      why: ["枝分かれが多いほど分子が球に近づき、ふれ合う面積が小さく分子間力が弱いので沸点が低い（約10℃）。", "枝分かれのないペンタンは沸点がいちばん高い（約36℃）。", "2-メチルブタンは約28℃で、中間。", "構造がちがえば沸点もちがう。"],
    },
    point: "枝分かれが多いほど沸点が低い",
    steps: [{ title: "形と分子間力", body: "枝分かれが多いと分子が球に近づき、{{分子間力が弱く}}なるので沸点が下がります。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...b("fusei", 3, "思考・判断・表現"),
    prompt: "次の化合物のうち、不斉炭素原子をもつものはどれですか。",
    answer: {
      kind: "choice",
      options: ["乳酸 CH₃CH(OH)COOH", "エタノール CH₃CH₂OH", "酢酸 CH₃COOH", "2-プロパノール CH₃CH(OH)CH₃"],
      correct: 0,
      why: ["中央の C が −CH₃・−H・−OH・−COOH の4つのちがう原子・原子団と結合している。", "どの C にも同じ H が2つ以上ついている。", "4つのちがう原子・原子団と結合した C がない。", "中央の C に同じ −CH₃ が2つついている。"],
    },
    point: "4つのちがう原子・原子団と結合した C",
    steps: [{ title: "4つがすべてちがうか", body: "乳酸の中央の C は {{−CH₃・−H・−OH・−COOH}} と結合した不斉炭素原子で、鏡像異性体があります。", back: [S5] }],
  },
  {
    ...b("kyozo", 3, "思考・判断・表現"),
    prompt: "鏡像異性体どうしの性質について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["融点・沸点などはほとんど同じだが、生物の体の中では大きくちがうはたらきをすることがある", "融点・沸点が大きくちがう", "分子式がちがう", "原子のつながり方がちがう"],
      correct: 0,
      why: ["物理的な性質はほとんど同じ。受容体や酵素も片方の形をしているので、生物の体の中ではちがう物質としてふるまう。", "融点・沸点はほとんど同じ。", "異性体なので分子式は同じ。", "つながり方は同じで、空間での配置がちがう（立体異性体）。"],
    },
    point: "鏡像異性体は物性ほぼ同じ、生体内でちがう",
    steps: [{ title: "鏡像異性体", body: "融点・沸点・密度などは{{ほとんど同じ}}ですが、体の中では片方だけが甘い・薬として効くなどのちがいが出ます。", back: [S5] }],
  },
  {
    ...b("c3h8o", 3, "思考・判断・表現"),
    prompt: "分子式 C₃H₈O で表される化合物の構造異性体は何種類ありますか。",
    answer: {
      kind: "choice",
      options: ["3種類", "2種類", "4種類", "1種類"],
      correct: 0,
      why: ["1-プロパノール・2-プロパノール（−OH の位置ちがい）と、エーテルのエチルメチルエーテルの3種類。", "アルコール2つのほかに、エーテルがある。", "鎖を折り曲げたり裏返したりしただけのものは数えない。", "官能基の位置や種類のちがう異性体がある。"],
    },
    point: "アルコール2つ＋エーテル1つ",
    steps: [{ title: "官能基の位置と種類", body: "{{1-プロパノール・2-プロパノール・エチルメチルエーテル}}の3種類です。", back: [S4] }],
  },
];

export const H_SCI_CHEM_YUKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "官能基と異性体",
      lead: "次の問いに答えなさい。",
      style: "word",
      pick: 4,
      questions: POOL,
    },
    {
      title: "元素分析",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "sanso", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: sanso },
        { id: "bunshishiki", type: "A", difficulty: 3, points: 18, seconds: 180, skill: "思考・判断・表現", generate: bunshishiki },
      ],
    },
  ],
};
