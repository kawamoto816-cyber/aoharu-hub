import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { ChoiceQ, Difficulty, NumQ, QuestionC } from "@/lib/moshi/types";

// 慶應義塾大学型 数学（理系）。一般選抜 理工学部の数学の形式を参考にした練習用の型。
// 形式: 120分・大問5題・150点。範囲は数学Ⅰ・Ⅱ・Ⅲ・A・B（数列）・C（ベクトル・平面上の曲線と複素数平面）。
//   多くの設問は答えだけを空欄に入れる形で、最後の大問は途中の過程や証明も書く記述式。
//   微分積分（数学Ⅲ）・数列と極限・確率・複素数平面がよく出る。
// 問題はすべてこの型のために書き下ろしたもの (過去問の文・数値・設定は使っていない)。答えの数値は sympy で検算した。
// 参考:
//   https://www.keio.ac.jp/ja/admissions/docs/240419_generaladmissions2025.pdf (慶應義塾大学 一般選抜要項: 理工学部 数学 120分・150点)
//   https://study-search.jp/columns/294 (慶應理工 数学の傾向: 大問5題・150点・答えのみの形と記述 (証明) の組み合わせ・微積分/数列/極限/確率が頻出)
//   https://www.keio.ac.jp/ja/admissions/docs/rikou_gaiyou.pdf (理工学部の入試概要: 数学Ⅰ・Ⅱ・Ⅲ・A・B・C を重視)

const KEY = "keio-sugaku-ri";
const TAG = (i: number) => `${KEY}:${i}`;
const LEAD1 = "次の文中の空欄にあてはまる数・式を答えよ。答えのみを記入せよ。";
const LEAD2 = "次の問いに答えよ。解答は答えだけでなく、途中の過程や証明も記述せよ。";

type St = ([string, string] | [string, string, string])[];
type Rub = { label: string; points: number; keywords?: string[] }[];
const steps = (st: St) => st.map(([title, body, trap]) => (trap ? { title, body, trap } : { title, body }));
const PTS: Record<Difficulty, number> = { 1: 8, 2: 10, 3: 12 };

interface N {
  id: string;
  u: string;
  d: Difficulty;
  p: string;
  a: Omit<NumQ, "kind">;
  dep?: string;
  pt: string;
  st: St;
}
/** 空所補充の1問 (答えのみ・自動採点) */
function nm(q: N): QuestionC {
  return {
    id: q.id,
    type: "C",
    difficulty: q.d,
    points: PTS[q.d],
    seconds: q.d === 3 ? 720 : q.d === 2 ? 540 : 360,
    skill: "知識・技能",
    unit: q.u,
    ...(q.dep ? { dependsOn: q.dep } : {}),
    prompt: q.p,
    answer: { kind: "num", ...q.a },
    point: q.pt,
    steps: steps(q.st),
  };
}

interface C {
  id: string;
  u: string;
  d: Difficulty;
  p: string;
  a: Omit<ChoiceQ, "kind">;
  dep?: string;
  pt: string;
  st: St;
}
/** 選択肢から選ぶ空所 (π・e を含む答え) */
function ch(q: C): QuestionC {
  return {
    id: q.id,
    type: "C",
    difficulty: q.d,
    points: PTS[q.d],
    seconds: q.d === 3 ? 720 : q.d === 2 ? 540 : 360,
    skill: "知識・技能",
    unit: q.u,
    ...(q.dep ? { dependsOn: q.dep } : {}),
    prompt: q.p,
    answer: { kind: "choice", ...q.a },
    point: q.pt,
    steps: steps(q.st),
  };
}

interface W {
  id: string;
  u: string;
  d: Difficulty;
  p: string;
  model: string;
  rub: Rub;
  auto?: Omit<NumQ, "kind">;
  dep?: string;
  pt: string;
  st: St;
}
/** 記述の1問 (模範解答と採点基準で自己採点。最後の数値は autoPart) */
function wr(q: W): QuestionC {
  const points = q.rub.reduce((x, r) => x + r.points, 0);
  return {
    id: q.id,
    type: "C",
    difficulty: q.d,
    points,
    seconds: q.d === 3 ? 900 : q.d === 2 ? 720 : 540,
    skill: "思考・判断・表現",
    unit: q.u,
    ...(q.dep ? { dependsOn: q.dep } : {}),
    prompt: q.p,
    answer: { kind: "written", model: q.model, rubric: q.rub, ...(q.auto ? { autoPart: { kind: "num", ...q.auto } } : {}) },
    point: q.pt,
    steps: steps(q.st),
  };
}

function sec(tag: number, id: string, unit: string, title: string, lead: string, body: string, qs: QuestionC[]): ExamPoolSection {
  return {
    unit,
    tag: TAG(tag),
    section: {
      id: `keio-sugaku-ri-${tag}-${id}`,
      title,
      lead,
      material: [{ kind: "text" as const, body }],
      questions: qs,
    },
  };
}

// =====================================================================
// 第1問　確率・整数（空所補充）
// =====================================================================

const S1: ExamPoolSection[] = [
  sec(1, "guki", "h-math-a-kakuritsu", "表の回数が偶数である確率", LEAD1, "表が出る確率が 1/3、裏が出る確率が 2/3 の硬貨を n 回投げる。表の出た回数が偶数（0 回も含む）である確率を pₙ とする。", [
    nm({
      id: "p2",
      u: "h-math-a-kakuritsu",
      d: 1,
      p: "(1) p₂＝□ である。",
      a: { answerKind: "num", answer: ["5/9"], calc: "(2/3)^2+(1/3)^2" },
      pt: "表0回か表2回",
      st: [["場合分け", "表0回 (2/3)²＝4/9、表2回 (1/3)²＝1/9。和は {{5/9}}。"]],
    }),
    nm({
      id: "p3",
      u: "h-math-b-zenka",
      d: 2,
      dep: "p2",
      p: "(2) pₙ₊₁ を pₙ で表すと pₙ₊₁＝(1/3)pₙ＋□ となる。これを用いると p₃＝14/27 である。空欄の数を答えよ。",
      a: { answerKind: "num", answer: ["1/3"], calc: "1/3" },
      pt: "n回目まで偶数→裏、奇数→表",
      st: [
        ["推移", "n＋1 回目までで偶数になるのは、n 回目まで偶数で裏 (2/3)、または奇数で表 (1/3)。"],
        ["整理", "pₙ₊₁＝(2/3)pₙ＋(1/3)(1−pₙ)＝(1/3)pₙ＋{{1/3}}。", "奇数である確率 1−pₙ を忘れない。"],
      ],
    }),
    nm({
      id: "saisho",
      u: "h-math-b-zenka",
      d: 3,
      dep: "p3",
      p: "(3) pₙ−1/2＜1/1000 となる最小の正の整数 n は □ である。",
      a: { answerKind: "num", answer: ["6"], labels: ["n ="], calc: "6" },
      pt: "pₙ−1/2＝(1/2)(1/3)ⁿ",
      st: [
        ["一般項", "pₙ−1/2＝(1/3)(pₙ₋₁−1/2) で p₀＝1 から {{pₙ＝1/2＋(1/2)(1/3)ⁿ}}。"],
        ["不等式", "(1/2)(1/3)ⁿ＜1/1000 ⇔ 3ⁿ＞500。3⁵＝243、3⁶＝729 なので {{n＝6}}。", "3ⁿ＞1000 としない（1/2 が掛かっている）。"],
      ],
    }),
  ]),
  sec(1, "futei", "h-math-a-gojo", "1次不定方程式 17x＋23y＝1000", LEAD1, "x, y を整数とする。", [
    nm({
      id: "x1",
      u: "h-math-a-gojo",
      d: 1,
      p: "(1) 17x＋23y＝1 を満たす整数の組 (x, y) のうち、x が最小の正の整数であるものは x＝□ である。",
      a: { answerKind: "num", answer: ["19"], labels: ["x ="], equations: ["17*x-23*14=1"] },
      pt: "互除法で 17x≡1 (mod 23) を解く",
      st: [
        ["互除法", "23＝17·1＋6、17＝6·2＋5、6＝5·1＋1 をさかのぼると 1＝17·(−4)＋23·3。"],
        ["正の最小", "x＝−4＋23k の正で最小は {{x＝19}}（y＝−14）。"],
      ],
    }),
    nm({
      id: "kosu",
      u: "h-math-a-gojo",
      d: 2,
      dep: "x1",
      p: "(2) 17x＋23y＝1000 を満たす正の整数の組 (x, y) は □ 組ある。",
      a: { answerKind: "num", answer: ["3"], unit: "組", calc: "3" },
      pt: "1つの解を見つけ、x＝x₀＋23k の形で数える",
      st: [
        ["1つの解", "x＝2 のとき 23y＝966、y＝42。一般解は {{x＝2＋23k、y＝42−17k}}。"],
        ["正の条件", "2＋23k＞0、42−17k＞0 より k＝0, 1, 2。{{3組}}（(2,42)、(25,25)、(48,8)）。"],
      ],
    }),
    nm({
      id: "xy",
      u: "h-math-a-gojo",
      d: 3,
      dep: "kosu",
      p: "(3) (2) の正の整数の組のうち、積 xy の最大値は □ である。",
      a: { answerKind: "num", answer: ["625"], calc: "25*25" },
      pt: "3組の積を比べる",
      st: [["比べる", "2·42＝84、25·25＝{{625}}、48·8＝384。", "x＋y が最大の組とは別。"]],
    }),
  ]),
  sec(1, "akadama", "h-math-a-kakuritsu", "赤玉がすべて出るまでの回数", LEAD1, "白玉3個と赤玉2個が入った袋から、玉を1個ずつ取り出していく（取り出した玉はもどさない）。2個の赤玉がすべて取り出されたのが k 回目であるとき、X＝k とする。", [
    nm({
      id: "x2",
      u: "h-math-a-kakuritsu",
      d: 1,
      p: "(1) X＝2 である確率は □ である。",
      a: { answerKind: "num", answer: ["1/10"], calc: "(2/5)*(1/4)" },
      pt: "1回目・2回目ともに赤",
      st: [["計算", "(2/5)·(1/4)＝{{1/10}}。"]],
    }),
    nm({
      id: "x4",
      u: "h-math-a-kakuritsu",
      d: 2,
      dep: "x2",
      p: "(2) X＝4 である確率は □ である。",
      a: { answerKind: "num", answer: ["3/10"], calc: "3/10" },
      pt: "4回目が赤で、もう1個の赤は1〜3回目",
      st: [
        ["並べ方", "赤2個の位置の選び方は ₅C₂＝10 通りで同様に確からしい。"],
        ["数える", "大きいほうが4のものは (1,4)(2,4)(3,4) の3通り。{{3/10}}。", "4回目に初めて赤が出る確率と混同しない。"],
      ],
    }),
    nm({
      id: "ex",
      u: "h-math-b-bunpu",
      d: 3,
      dep: "x4",
      p: "(3) X の期待値は □ である。",
      a: { answerKind: "num", answer: ["4"], calc: "(2*1+3*2+4*3+5*4)/10" },
      pt: "P(X＝k)＝(k−1)/10",
      st: [
        ["分布", "X＝k となるのは赤の位置が (j, k)（j＜k）のとき。P(X＝k)＝{{(k−1)/10}}（k＝2, …, 5）。"],
        ["期待値", "(2·1＋3·2＋4·3＋5·4)/10＝40/10＝{{4}}。"],
      ],
    }),
  ]),
];

// =====================================================================
// 第2問　数列と関数の極限（空所補充）
// =====================================================================

const S2: ExamPoolSection[] = [
  sec(2, "bunsu-zenka", "h-math-3-suretsu", "分数形の漸化式と √2", LEAD1, "数列 {aₙ} を a₁＝1、aₙ₊₁＝(aₙ＋2)/(aₙ＋1) (n＝1, 2, 3, …) で定める。すべての n で aₙ＞0 である。", [
    nm({
      id: "a3",
      u: "h-math-3-suretsu",
      d: 1,
      p: "(1) a₃＝□ である。",
      a: { answerKind: "num", answer: ["7/5"], calc: "(3/2+2)/(3/2+1)" },
      pt: "a₂＝3/2 を代入",
      st: [["順に計算", "a₂＝3/2、a₃＝(7/2)/(5/2)＝{{7/5}}。"]],
    }),
    nm({
      id: "hi",
      u: "h-math-3-suretsu",
      d: 2,
      dep: "a3",
      p: "(2) bₙ＝(aₙ−√2)/(aₙ＋√2) とおくと、{bₙ} は公比 □ の等比数列である。",
      a: { answerKind: "surd", answer: ["-3+2√2"], equations: ["x^2+6x+1=0"] },
      pt: "aₙ₊₁∓√2 をそれぞれ aₙ∓√2 で表す",
      st: [
        ["分子と分母", "aₙ₊₁−√2＝(1−√2)(aₙ−√2)/(aₙ＋1)、aₙ₊₁＋√2＝(1＋√2)(aₙ＋√2)/(aₙ＋1)。"],
        ["公比", "(1−√2)/(1＋√2)＝−(√2−1)²＝{{2√2−3}}。", "有理化で符号をまちがえやすい。値は約 −0.17。"],
      ],
    }),
    nm({
      id: "lim",
      u: "h-math-3-suretsu",
      d: 3,
      dep: "hi",
      p: "(3) lim_{n→∞} aₙ＝□ である。",
      a: { answerKind: "surd", answer: ["√2"], equations: ["x^2=2"] },
      pt: "|公比|＜1 なので bₙ→0",
      st: [
        ["bₙ の極限", "|2√2−3|＜1 より bₙ→0。"],
        ["aₙ に戻す", "aₙ＝√2(1＋bₙ)/(1−bₙ) → {{√2}}。", "−√2 は aₙ＞0 に反する。"],
      ],
    }),
  ]),
  sec(2, "kyusu", "h-math-3-suretsu", "部分分数分解と無限級数", LEAD1, "Sₙ＝Σ_{k=1}^{n} 1/{k(k＋1)(k＋2)} とする。", [
    nm({
      id: "s3",
      u: "h-math-b-sigma",
      d: 1,
      p: "(1) S₃＝□ である。",
      a: { answerKind: "num", answer: ["9/40"], calc: "1/6+1/24+1/60" },
      pt: "1/6＋1/24＋1/60",
      st: [["通分", "1/6＋1/24＋1/60＝(20＋5＋2)/120＝{{9/40}}。"]],
    }),
    nm({
      id: "s10",
      u: "h-math-b-sigma",
      d: 2,
      dep: "s3",
      p: "(2) S₁₀＝□ である。",
      a: { answerKind: "num", answer: ["65/264"], calc: "1/4-1/(2*11*12)" },
      pt: "隣り合う2項の積の逆数の差に分けて消し合う",
      st: [
        ["分解", "1/{k(k＋1)(k＋2)}＝{{(1/2){1/(k(k＋1))−1/((k＋1)(k＋2))}}}。"],
        ["和", "Sₙ＝(1/2){1/2−1/((n＋1)(n＋2))}。S₁₀＝1/4−1/264＝{{65/264}}。", "1/k−1/(k＋2) 型に分けると項が2つずつ残る。"],
      ],
    }),
    nm({
      id: "kyusu",
      u: "h-math-3-suretsu",
      d: 3,
      dep: "s10",
      p: "(3) 無限級数 Σ_{k=1}^{∞} (2k＋1)/{k(k＋1)(k＋2)} の和は □ である。",
      a: { answerKind: "num", answer: ["5/4"], calc: "2-3/4" },
      pt: "(2k＋1)＝2(k＋2)−3 として分ける",
      st: [
        ["分ける", "(2k＋1)/{k(k＋1)(k＋2)}＝2/{k(k＋1)}−3/{k(k＋1)(k＋2)}。"],
        ["和", "Σ 2/{k(k＋1)}＝2、Σ 1/{k(k＋1)(k＋2)}＝1/4。2−3/4＝{{5/4}}。"],
      ],
    }),
  ]),
  sec(2, "kyokugen", "h-math-3-kyokugen", "関数の極限と係数の決定", LEAD1, "関数の極限について考える。", [
    nm({
      id: "sqrt",
      u: "h-math-3-kyokugen",
      d: 1,
      p: "(1) lim_{x→∞} (√(x²＋6x)−x)＝□ である。",
      a: { answerKind: "num", answer: ["3"], calc: "6/2" },
      pt: "分子を有理化する",
      st: [["有理化", "6x/(√(x²＋6x)＋x)＝6/(√(1＋6/x)＋1) → {{3}}。", "∞−∞ を 0 としない。"]],
    }),
    nm({
      id: "ab",
      u: "h-math-3-kyokugen",
      d: 2,
      dep: "sqrt",
      p: "(2) 正の定数 a と定数 b について lim_{x→0} {√(1＋ax)−1−bx}/x²＝−2 が成り立つとき、(a, b)＝□ である。",
      a: { answerKind: "pair", answer: ["4", "2"], labels: ["a =", "b ="], equations: ["a^2=16", "2*b-a=0"] },
      pt: "有理化して x の1次の項が消える条件",
      st: [
        ["有理化", "{√(1＋ax)−(1＋bx)}＝{(a−2b)x−b²x²}/{√(1＋ax)＋1＋bx}。"],
        ["条件", "極限が有限なので {{a＝2b}}。このとき値は −b²/2＝−2、b＝2、a＝4。", "b＝−2 だと a＝−4＜0 で不適。"],
      ],
    }),
    nm({
      id: "sin",
      u: "h-math-3-kyokugen",
      d: 3,
      dep: "ab",
      p: "(3) lim_{x→0} (x−sin x)/x³＝□ である。",
      a: { answerKind: "num", answer: ["1/6"], calc: "1/6" },
      pt: "sin 3x＝3sin x−4sin³x で x と 3x を比べる",
      st: [
        ["形を変える", "ロピタルの定理を使わない場合、L＝lim (x−sin x)/x³ とおき、x を 3x にした式と sin 3x＝3sin x−4sin³x を比べる。"],
        ["値", "27L＝3L＋4·lim (sin x/x)³ より 24L＝4、L＝{{1/6}}。", "極限が存在することを前提にした計算。記述では断りを書く。"],
      ],
    }),
  ]),
];

// =====================================================================
// 第3問　微分法とその応用（空所補充）
// =====================================================================

const S3: ExamPoolSection[] = [
  sec(3, "bunsu-kansu", "h-math-3-bibun-oyo", "分数関数のグラフ", LEAD1, "関数 f(x)＝(x²＋3)/(x−1) (x≠1) を考える。", [
    nm({
      id: "kyokuchi",
      u: "h-math-3-bibun-oyo",
      d: 1,
      p: "(1) f(x) の極大値は □、極小値は □ である。",
      a: { answerKind: "pair", answer: ["-2", "6"], labels: ["極大値 =", "極小値 ="], equations: ["x+2=0", "y-6=0"] },
      pt: "f′(x)＝(x²−2x−3)/(x−1)²",
      st: [
        ["微分", "f′(x)＝{2x(x−1)−(x²＋3)}/(x−1)²＝{{(x−3)(x＋1)/(x−1)²}}。"],
        ["値", "x＝−1 で極大 f(−1)＝{{−2}}、x＝3 で極小 f(3)＝{{6}}。", "極大値＜極小値になるのは、x＝1 でグラフが切れているから。"],
      ],
    }),
    nm({
      id: "zenkin",
      u: "h-math-3-kansu",
      d: 2,
      dep: "kyokuchi",
      p: "(2) 曲線 y＝f(x) の漸近線のうち、y 軸に平行でないものは y＝□ である。",
      a: { answerKind: "expr", answer: ["x+1"], labels: ["y ="] },
      pt: "割り算して f(x)＝x＋1＋4/(x−1)",
      st: [["割り算", "x²＋3＝(x−1)(x＋1)＋4 より f(x)＝x＋1＋4/(x−1)。x→±∞ で {{y＝x＋1}} に近づく。"]],
    }),
    nm({
      id: "kaisu",
      u: "h-math-3-bibun-oyo",
      d: 3,
      dep: "zenkin",
      p: "(3) 方程式 f(x)＝k が実数解をもたないような整数 k は □ 個ある。",
      a: { answerKind: "num", answer: ["7"], unit: "個", calc: "5-(-1)+1" },
      pt: "グラフと直線 y＝k の共有点",
      st: [
        ["値域", "x＜1 の部分の値は −2 以下、x＞1 の部分の値は 6 以上。"],
        ["数える", "解なし ⇔ {{−2＜k＜6}}。整数は −1, 0, …, 5 の {{7個}}。", "k＝−2、6 は重解をもつので含めない。"],
      ],
    }),
  ]),
  sec(3, "enchu", "h-math-3-bibun-oyo", "球に内接する円柱の体積", LEAD1, "半径 √3 の球に内接する直円柱（上下の底面の円周が球面上にある円柱）を考える。", [
    nm({
      id: "takasa",
      u: "h-math-3-bibun-oyo",
      d: 1,
      p: "(1) 円柱の体積が最大になるとき、円柱の高さは □ である。",
      a: { answerKind: "num", answer: ["2"], calc: "2*1" },
      pt: "高さ 2h、半径 r で r²＋h²＝3",
      st: [
        ["式にする", "高さ 2h、底面の半径 r とすると r²＝3−h²、V＝πr²·2h＝{{2π(3h−h³)}}（0＜h＜√3）。"],
        ["最大", "V′＝2π(3−3h²)＝0 より h＝1。高さは {{2}}。", "h を高さそのものとすると式が変わる。"],
      ],
    }),
    nm({
      id: "hankei",
      u: "h-math-3-bibun-oyo",
      d: 2,
      dep: "takasa",
      p: "(2) そのときの円柱の底面の半径は □ である。",
      a: { answerKind: "surd", answer: ["√2"], equations: ["x^2=2"] },
      pt: "r²＝3−h²",
      st: [["代入", "r²＝3−1＝2、r＝{{√2}}。"]],
    }),
    nm({
      id: "vmax",
      u: "h-math-3-bibun-oyo",
      d: 3,
      dep: "hankei",
      p: "(3) 円柱の体積の最大値は □π である。空欄の数を答えよ。",
      a: { answerKind: "num", answer: ["4"], calc: "2*(3-1)" },
      pt: "V＝2π(3h−h³) に h＝1",
      st: [
        ["増減", "0＜h＜1 で V′＞0、1＜h＜√3 で V′＜0 なので h＝1 で最大。"],
        ["値", "V＝2π(3−1)＝{{4π}}。"],
      ],
    }),
  ]),
  sec(3, "sankaku", "h-math-3-bibun-oyo", "sin x＋(1/2)sin 2x の最大と面積", LEAD1, "f(x)＝sin x＋(1/2)sin 2x (0≦x≦2π) とする。", [
    nm({
      id: "cos",
      u: "h-math-3-bibun",
      d: 1,
      p: "(1) 0＜x＜π の範囲で f′(x)＝0 となる x について、cos x＝□ である。",
      a: { answerKind: "num", answer: ["1/2"], equations: ["2*x^2+x-1=0"] },
      pt: "f′(x)＝cos x＋cos 2x を cos x で因数分解",
      st: [
        ["微分", "f′(x)＝cos x＋cos 2x＝2cos²x＋cos x−1＝{{(2cos x−1)(cos x＋1)}}。"],
        ["解", "0＜x＜π では cos x≠−1 なので cos x＝{{1/2}}。"],
      ],
    }),
    nm({
      id: "max",
      u: "h-math-3-bibun-oyo",
      d: 2,
      dep: "cos",
      p: "(2) f(x) の最大値は □ である。",
      a: { answerKind: "surd", answer: ["3√3/4"], equations: ["x^2=27/16"] },
      pt: "x＝π/3 で最大",
      st: [
        ["増減", "0＜x＜π/3 で f′＞0、π/3＜x＜5π/3 で f′≦0、5π/3＜x＜2π で f′＞0。f(0)＝f(2π)＝0。"],
        ["値", "f(π/3)＝√3/2＋√3/4＝{{3√3/4}}。", "x＝π では f′＝0 だが極値ではない。"],
      ],
    }),
    nm({
      id: "menseki",
      u: "h-math-3-sekibun-oyo",
      d: 3,
      dep: "max",
      p: "(3) 曲線 y＝f(x) (0≦x≦π) と x 軸で囲まれた部分の面積は □ である。",
      a: { answerKind: "num", answer: ["2"], calc: "2+0" },
      pt: "f(x)＝sin x(1＋cos x)≧0",
      st: [
        ["符号", "f(x)＝sin x＋sin x cos x＝{{sin x(1＋cos x)}}≧0（0≦x≦π）。"],
        ["積分", "∫₀^π sin x dx＝2、∫₀^π (1/2)sin 2x dx＝0。面積は {{2}}。"],
      ],
    }),
  ]),
];

// =====================================================================
// 第4問　積分法とその応用（空所補充）
// =====================================================================

const S4: ExamPoolSection[] = [
  sec(4, "y-x-kaiten", "h-math-3-sekibun-oyo", "直線 y＝x のまわりの回転体", LEAD1, "2曲線 y＝√x と y＝x² で囲まれた部分を D とする。D は直線 y＝x に関して対称である。", [
    nm({
      id: "s",
      u: "h-math-3-sekibun-oyo",
      d: 1,
      p: "(1) D の面積は □ である。",
      a: { answerKind: "num", answer: ["1/3"], calc: "2/3-1/3" },
      pt: "∫₀¹ (√x−x²) dx",
      st: [["積分", "[(2/3)x^{3/2}−x³/3]₀¹＝{{1/3}}。"]],
    }),
    nm({
      id: "vx",
      u: "h-math-3-sekibun-oyo",
      d: 2,
      dep: "s",
      p: "(2) D を x 軸のまわりに1回転してできる立体の体積は □π である。空欄の数を答えよ。",
      a: { answerKind: "num", answer: ["3/10"], calc: "1/2-1/5" },
      pt: "外側 √x、内側 x² の差",
      st: [["積分", "π∫₀¹ {(√x)²−(x²)²} dx＝π(1/2−1/5)＝{{(3/10)π}}。", "π∫(√x−x²)² dx としない（ドーナツ型は2乗の差）。"]],
    }),
    nm({
      id: "vyx",
      u: "h-math-3-sekibun-oyo",
      d: 3,
      dep: "vx",
      p: "(3) D を直線 y＝x のまわりに1回転してできる立体の体積は □π である。空欄の数を答えよ。",
      a: { answerKind: "surd", answer: ["√2/60"], equations: ["x^2=1/1800"] },
      pt: "回転軸に沿った長さ s と軸からの距離 d で積分",
      st: [
        ["半分で考える", "D は y＝x について対称なので、y＝x と y＝x² の間の部分を回転した立体と同じ。"],
        ["軸の座標", "点 (x, x²) の軸からの距離は {{(x−x²)/√2}}、軸上の位置は s＝(x＋x²)/√2、ds＝(1＋2x)/√2 dx。"],
        ["積分", "V＝π∫₀¹ (x−x²)²/2·(1＋2x)/√2 dx＝π/(2√2)·(1/30＋1/30)＝{{(√2/60)π}}。", "dx のまま積分すると軸方向の長さがずれる。"],
      ],
    }),
  ]),
  sec(4, "nagasa", "h-math-3-sekibun-oyo", "曲線 y＝(2/3)x^{3/2} の長さ", LEAD1, "曲線 C: y＝(2/3)x^{3/2} (x≧0) を考える。", [
    nm({
      id: "l3",
      u: "h-math-3-sekibun-oyo",
      d: 1,
      p: "(1) 0≦x≦3 の部分の C の長さは □ である。",
      a: { answerKind: "num", answer: ["14/3"], calc: "(2/3)*(8-1)" },
      pt: "1＋(y′)²＝1＋x",
      st: [["積分", "y′＝√x より L＝∫₀³ √(1＋x) dx＝(2/3)[(1＋x)^{3/2}]₀³＝(2/3)(8−1)＝{{14/3}}。"]],
    }),
    nm({
      id: "a",
      u: "h-math-3-sekibun-oyo",
      d: 2,
      dep: "l3",
      p: "(2) 0≦x≦a の部分の C の長さが 52/3 となる正の数 a は □ である。",
      a: { answerKind: "num", answer: ["8"], labels: ["a ="], equations: ["(1+a)^3=729"] },
      pt: "(2/3){(1＋a)^{3/2}−1}＝52/3",
      st: [["解く", "(1＋a)^{3/2}＝27 より 1＋a＝9、{{a＝8}}。", "−1 を忘れて (1＋a)^{3/2}＝26 としない。"]],
    }),
    nm({
      id: "men",
      u: "h-math-3-sekibun-oyo",
      d: 3,
      dep: "a",
      p: "(3) C と x 軸と直線 x＝3 で囲まれた部分の面積は □ である。",
      a: { answerKind: "surd", answer: ["12√3/5"], equations: ["x^2=432/25"] },
      pt: "∫₀³ (2/3)x^{3/2} dx",
      st: [["積分", "(2/3)·(2/5)·3^{5/2}＝(4/15)·9√3＝{{12√3/5}}。", "3^{5/2}＝9√3。"]],
    }),
  ]),
  sec(4, "dannmen", "h-math-3-sekibun-oyo", "断面が正三角形の立体と楔形", LEAD1, "座標空間で、xy 平面上の円板 x²＋y²≦1 を底面とし、x 軸に垂直な平面による切り口が、底面の弦を1辺とする正三角形である立体を K とする。", [
    nm({
      id: "s0",
      u: "h-math-3-sekibun-oyo",
      d: 1,
      p: "(1) 平面 x＝0 による K の切り口の面積は □ である。",
      a: { answerKind: "surd", answer: ["√3"], equations: ["x^2=3"] },
      pt: "1辺 2 の正三角形",
      st: [["面積", "弦の長さは 2√(1−x²)。x＝0 で1辺 2、面積 (√3/4)·4＝{{√3}}。"]],
    }),
    nm({
      id: "vk",
      u: "h-math-3-sekibun-oyo",
      d: 2,
      dep: "s0",
      p: "(2) K の体積は □ である。",
      a: { answerKind: "surd", answer: ["4√3/3"], equations: ["x^2=16/3"] },
      pt: "S(x)＝√3(1−x²) を −1 から 1 まで",
      st: [["積分", "S(x)＝(√3/4)·4(1−x²)＝√3(1−x²)。V＝√3∫₋₁¹ (1−x²) dx＝√3·(4/3)＝{{4√3/3}}。"]],
    }),
    nm({
      id: "kusabi",
      u: "h-math-3-sekibun-oyo",
      d: 3,
      dep: "vk",
      p: "(3) 円柱 x²＋y²≦1 のうち、y≧0 かつ 0≦z≦2y を満たす部分の体積は □ である。",
      a: { answerKind: "num", answer: ["4/3"], calc: "2*2/3" },
      pt: "x 軸に垂直な切り口は直角三角形",
      st: [
        ["切り口", "x を固定すると 0≦y≦√(1−x²)、0≦z≦2y の直角三角形で、面積 (1/2)·√(1−x²)·2√(1−x²)＝{{1−x²}}。"],
        ["積分", "∫₋₁¹ (1−x²) dx＝{{4/3}}。", "y 軸に垂直に切ると長方形になり、それでも同じ値になる。"],
      ],
    }),
  ]),
];

// =====================================================================
// 第5問　複素数平面・二次曲線・証明（記述）
// =====================================================================

const S5: ExamPoolSection[] = [
  sec(5, "seisankaku", "h-math-c-fukuso", "正三角形となる条件", LEAD2, "複素数平面上の3点 A(α)、B(β)、C(γ) を考える。", [
    wr({
      id: "hitsuyou",
      u: "h-math-c-fukuso",
      d: 1,
      p: "(1) γ−α＝(β−α)(cos 60°＋i sin 60°) が成り立つとき、α²＋β²＋γ²−αβ−βγ−γα＝0 であることを示せ。",
      model:
        "ω＝cos 60°＋i sin 60° とおくと ω²−ω＋1＝0（ω＝(1＋√3i)/2 を代入して確かめられる）。u＝β−α とおくと γ−α＝ωu。α²＋β²＋γ²−αβ−βγ−γα＝(1/2){(α−β)²＋(β−γ)²＋(γ−α)²}。α−β＝−u、β−γ＝u−ωu＝(1−ω)u、γ−α＝ωu より、和は u²{1＋(1−ω)²＋ω²}＝u²(2ω²−2ω＋2)＝2u²(ω²−ω＋1)＝0。よって成り立つ。",
      rub: [
        { label: "ω²−ω＋1＝0 を示している（または使っている）", points: 3, keywords: ["ω²−ω＋1"] },
        { label: "式を (α−β)²＋(β−γ)²＋(γ−α)² の形などで u を使って表している", points: 3, keywords: ["(α−β)²"] },
        { label: "0 になることを結論づけている", points: 2, keywords: ["＝0"] },
      ],
      pt: "ω＝cos60°＋i sin60° は ω²−ω＋1＝0 を満たす",
      st: [
        ["ω の性質", "ω＝(1＋√3i)/2 は {{ω²−ω＋1＝0}}（ω³＝−1 の根で ω≠−1）。"],
        ["平方の和", "左辺＝(1/2){(α−β)²＋(β−γ)²＋(γ−α)²} にして u＝β−α でくくる。"],
      ],
    }),
    wr({
      id: "gamma",
      u: "h-math-c-fukuso",
      d: 2,
      dep: "hitsuyou",
      p: "(2) α＝1、β＝3＋2i とする。三角形 ABC が正三角形で、A→B→C が反時計回りであるとき、γ を求めよ。",
      model:
        "A→B→C が反時計回りなので、C は A を中心に B を 60° 回転した点。γ＝α＋(β−α)(cos 60°＋i sin 60°)＝1＋(2＋2i)(1/2＋(√3/2)i)＝1＋{1−√3＋(1＋√3)i}＝(2−√3)＋(1＋√3)i。",
      rub: [
        { label: "A を中心に B を 60° 回転すると捉えている", points: 4, keywords: ["60°", "回転"] },
        { label: "(2＋2i)(1/2＋(√3/2)i) を正しく計算している", points: 3, keywords: ["1−√3"] },
        { label: "γ＝(2−√3)＋(1＋√3)i", points: 3, keywords: ["2−√3", "1＋√3"] },
      ],
      pt: "反時計回り → ＋60° 回転",
      st: [
        ["回転", "γ−α＝(β−α)(cos 60°＋i sin 60°)。"],
        ["計算", "(2＋2i)(1/2＋(√3/2)i)＝1＋√3i＋i−√3。γ＝{{(2−√3)＋(1＋√3)i}}。", "−60° 回転すると時計回りの頂点になる。"],
      ],
    }),
    wr({
      id: "z",
      u: "h-math-c-fukuso",
      d: 3,
      dep: "gamma",
      p: "(3) 0, 1 と異なる複素数 z について、3点 z, z², z³ が正三角形の3頂点となるような z をすべて求めよ。ただし、相異なる3点 α, β, γ について「α²＋β²＋γ²−αβ−βγ−γα＝0 ならば3点は正三角形の頂点である」ことは用いてよい。",
      model:
        "3点が相異なる条件は z≠z²、z²≠z³、z≠z³ で、z≠0, 1 のもとでは z≠−1。α＝z, β＝z², γ＝z³ を代入すると z²＋z⁴＋z⁶−z³−z⁵−z⁴＝z²−z³−z⁵＋z⁶＝z²(1−z)−z⁵(1−z)＝z²(1−z)(1−z³)＝z²(1−z)²(1＋z＋z²)。z≠0, 1 なので、この式が 0 ⇔ z²＋z＋1＝0。正三角形ならば（向きが逆のときも cos60°−i sin60° が同じ ω²−ω＋1＝0 を満たすので (1) と同様に）式は 0、逆は仮定から成り立つ。z＝(−1±√3i)/2。このとき z³＝1 で、3点は z, z², 1（1の3乗根）となり、確かに相異なり正三角形である。",
      rub: [
        { label: "z, z², z³ を (1) の式に代入している", points: 3, keywords: ["z⁶", "z⁴"] },
        { label: "z²(1−z)²(z²＋z＋1) と因数分解している", points: 4, keywords: ["(1−z)²", "z²＋z＋1"] },
        { label: "z＝(−1±√3i)/2 を求め、3点が相異なることを確かめている", points: 5, keywords: ["(−1±√3i)/2", "相異なる"] },
      ],
      pt: "代入した式が z²(1−z)²(z²＋z＋1) になる",
      st: [
        ["代入", "z²＋z⁴＋z⁶−z³−z⁵−z⁴＝{{z²(1−z)²(z²＋z＋1)}}。"],
        ["解", "z≠0, 1 より z²＋z＋1＝0、{{z＝(−1±√3i)/2}}。3点は 1 の3乗根で正三角形。", "z＝−1 だと z と z³ が同じ点になる（相異なる確認を忘れない）。"],
      ],
    }),
  ]),
  sec(5, "sokyokusen", "h-math-c-nijikyokusen", "双曲線の焦点と接線", LEAD2, "双曲線 H: x²−y²/3＝1 の焦点を F(2, 0)、F′(−2, 0) とする。H 上の x＞0 の部分にある点を P(x₀, y₀) とする。", [
    wr({
      id: "pf",
      u: "h-math-c-nijikyokusen",
      d: 1,
      p: "(1) PF＝2x₀−1、PF′＝2x₀＋1 であることを示せ。",
      model:
        "y₀²＝3(x₀²−1) より PF²＝(x₀−2)²＋y₀²＝x₀²−4x₀＋4＋3x₀²−3＝4x₀²−4x₀＋1＝(2x₀−1)²。x₀≧1 なので 2x₀−1＞0、PF＝2x₀−1。同様に PF′²＝(x₀＋2)²＋y₀²＝4x₀²＋4x₀＋1＝(2x₀＋1)²、PF′＝2x₀＋1。",
      rub: [
        { label: "y₀²＝3(x₀²−1) を代入して平方の形にしている", points: 4, keywords: ["(2x₀−1)²"] },
        { label: "x₀≧1 から 2x₀−1＞0 として根号をはずしている", points: 2, keywords: ["x₀≧1"] },
        { label: "PF′ も同様に示している", points: 2, keywords: ["2x₀＋1"] },
      ],
      pt: "y₀² を消すと完全平方になる",
      st: [["代入", "PF²＝(x₀−2)²＋3(x₀²−1)＝{{(2x₀−1)²}}。", "根号をはずすとき 2x₀−1 の符号を確かめる。"]],
    }),
    wr({
      id: "q",
      u: "h-math-c-nijikyokusen",
      d: 2,
      dep: "pf",
      p: "(2) P における H の接線と x 軸の交点を Q とする。QF : QF′＝PF : PF′ が成り立つことを示せ。",
      model:
        "接線は x₀x−y₀y/3＝1。y＝0 とすると x＝1/x₀ で Q(1/x₀, 0)。0＜1/x₀≦1＜2 なので QF＝2−1/x₀＝(2x₀−1)/x₀、QF′＝2＋1/x₀＝(2x₀＋1)/x₀。よって QF : QF′＝(2x₀−1) : (2x₀＋1)＝PF : PF′（(1) より）。（したがって接線は ∠FPF′ の二等分線である。）",
      rub: [
        { label: "接線の方程式 x₀x−y₀y/3＝1 を書いている", points: 3, keywords: ["x₀x−y₀y/3＝1"] },
        { label: "Q(1/x₀, 0) を求めている", points: 3, keywords: ["1/x₀"] },
        { label: "QF、QF′ を求め (1) と比べて比が等しいことを示している", points: 4, keywords: ["(2x₀−1)/x₀"] },
      ],
      pt: "Q(1/x₀, 0) で QF、QF′ を x₀ で表す",
      st: [
        ["接線", "x₀x−y₀y/3＝1、y＝0 で {{Q(1/x₀, 0)}}。"],
        ["比", "QF : QF′＝(2x₀−1) : (2x₀＋1) で (1) と一致。", "Q が F と F′ の間にあることを確かめてから長さを書く。"],
      ],
    }),
    wr({
      id: "naisetsu",
      u: "h-math-c-nijikyokusen",
      d: 3,
      dep: "q",
      p: "(3) P(2, 3) のとき、三角形 PFF′ の内接円の半径 r を求めよ。また、その中心の x 座標を求めよ。",
      model:
        "P(2, 3) は H 上にある（4−9/3＝1）。(1) より PF＝3、PF′＝5、FF′＝4。面積は (1/2)·4·3＝6（PF は x 軸に垂直）。周の半分 s＝(3＋5＋4)/2＝6 より r＝6/6＝1。内接円は辺 FF′ と点 T で接し、F′T−FT＝PF′−PF＝2、F′T＋FT＝4 より FT＝1、T(1, 0)。中心は (1, 1) で x 座標は 1。",
      rub: [
        { label: "PF＝3、PF′＝5、FF′＝4 を求めている", points: 4, keywords: ["PF＝3", "PF′＝5"] },
        { label: "面積と周の長さから r＝1 を求めている", points: 4, keywords: ["r＝1"] },
        { label: "接点の位置から中心の x 座標 1 を求めている", points: 4, keywords: ["x 座標は 1", "(1, 1)"] },
      ],
      auto: { answerKind: "num", answer: ["1"], labels: ["r ="], equations: ["2*6=r*(3+4+5)"] },
      pt: "面積＝r×(周の半分)。接点は双曲線の頂点 (1, 0)",
      st: [
        ["3辺", "PF＝2·2−1＝3、PF′＝5、FF′＝4（直角三角形）。"],
        ["半径", "6＝r·6 より {{r＝1}}。"],
        ["中心", "接点は F′T−FT＝2 から T(1, 0)。中心 {{(1, 1)}}。", "接点が双曲線の頂点になるのは、PF′−PF＝2a だから。"],
      ],
    }),
  ]),
  sec(5, "ex-futoshiki", "h-math-3-bibun-oyo", "eˣ の不等式と極限", LEAD2, "e は自然対数の底とする。", [
    wr({
      id: "f",
      u: "h-math-3-bibun-oyo",
      d: 1,
      p: "(1) x＞0 のとき、eˣ＞1＋x＋x²/2 であることを示せ。",
      model:
        "f(x)＝eˣ−1−x−x²/2 とおく。f′(x)＝eˣ−1−x、f″(x)＝eˣ−1。x＞0 で f″(x)＞0 なので f′(x) は x≧0 で増加し、f′(0)＝0 より x＞0 で f′(x)＞0。よって f(x) は x≧0 で増加し、f(0)＝0 より x＞0 で f(x)＞0。",
      rub: [
        { label: "差の関数をおいて微分している", points: 3, keywords: ["f′(x)＝eˣ−1−x"] },
        { label: "f″ で f′ の符号を調べている", points: 3, keywords: ["f″(x)＝eˣ−1"] },
        { label: "f(0)＝0 と増加から結論している", points: 2, keywords: ["f(0)＝0"] },
      ],
      pt: "2回微分して符号を順にたどる",
      st: [["2段階", "f″＝eˣ−1＞0 → f′ 増加・f′(0)＝0 → {{f′＞0}} → f 増加・f(0)＝0 → f＞0。", "f′(x)＝eˣ−1−x の符号を1回で決めようとしない。"]],
    }),
    wr({
      id: "e83",
      u: "h-math-3-bibun-oyo",
      d: 2,
      dep: "f",
      p: "(2) (1) と同様の方法で、x＞0 のとき eˣ＞1＋x＋x²/2＋x³/6 を示し、これを用いて e＞8/3 であることを示せ。",
      model:
        "g(x)＝eˣ−1−x−x²/2−x³/6 とおくと g′(x)＝eˣ−1−x−x²/2。(1) より x＞0 で g′(x)＞0 なので g は x≧0 で増加し、g(0)＝0 より x＞0 で g(x)＞0。x＝1 を代入すると e＞1＋1＋1/2＋1/6＝8/3。",
      rub: [
        { label: "g′(x) が (1) の式になることに気づいている", points: 4, keywords: ["g′(x)＝eˣ−1−x−x²/2"] },
        { label: "g(0)＝0 と増加から g(x)＞0 を示している", points: 3, keywords: ["g(0)＝0"] },
        { label: "x＝1 を代入して e＞8/3 を導いている", points: 3, keywords: ["x＝1", "8/3"] },
      ],
      pt: "g′ が (1) の差の関数そのもの",
      st: [
        ["微分", "g′(x)＝eˣ−1−x−x²/2＞0（(1) より）。"],
        ["代入", "x＝1 で e＞1＋1＋1/2＋1/6＝{{8/3}}。", "(1) だけでは e＞5/2 しか出ない。"],
      ],
    }),
    wr({
      id: "lim",
      u: "h-math-3-kyokugen",
      d: 3,
      dep: "e83",
      p: "(3) lim_{x→∞} x²/eˣ＝0 であることを示せ。さらに、lim_{x→∞} x² e^{−x}·(x＋1)/x を求めよ。",
      model:
        "(2) より x＞0 で eˣ＞x³/6。よって 0＜x²/eˣ＜x²/(x³/6)＝6/x。x→∞ で 6/x→0 なので、はさみうちの原理より lim x²/eˣ＝0。また x²e^{−x}·(x＋1)/x＝(x²/eˣ)·(1＋1/x) → 0·1＝0。",
      rub: [
        { label: "eˣ＞x³/6 を (2) から導いている", points: 4, keywords: ["x³/6"] },
        { label: "0＜x²/eˣ＜6/x とはさんでいる", points: 4, keywords: ["6/x", "はさみうち"] },
        { label: "後半の極限を 0 と求めている", points: 4, keywords: ["1＋1/x", "0"] },
      ],
      auto: { answerKind: "num", answer: ["0"], calc: "0*1" },
      pt: "eˣ＞x³/6 を使ってはさむ",
      st: [
        ["評価", "eˣ＞1＋x＋x²/2＋x³/6＞{{x³/6}}（x＞0）。"],
        ["はさむ", "0＜x²/eˣ＜6/x → 0。", "eˣ＞x²/2 だけでは x²/eˣ＜2 となり、はさめない。"],
      ],
    }),
  ]),
];

export const U_KEIO_SUGAKU_RI: UnivExam = {
  key: KEY,
  univ: "慶應義塾大学",
  kamoku: "数学（理系）",
  tier: "早慶上智",
  order: 222,
  basis: "理工学部（一般選抜）の傾向を参考",
  format: "120分・大問5題・150点。第1〜4問は答えだけを空欄に入れる形、第5問は途中の過程や証明も書く記述式。",
  minutes: 120,
  groups: ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学Ⅲ", "数学C"],
  sections: [
    { title: "第1問　確率・整数（空所補充）", lead: LEAD1, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 30, prefer: "material", poolTag: TAG(1) },
    { title: "第2問　数列と関数の極限（空所補充）", lead: LEAD1, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 30, prefer: "material", poolTag: TAG(2) },
    { title: "第3問　微分法とその応用（空所補充）", lead: LEAD1, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 30, prefer: "material", poolTag: TAG(3) },
    { title: "第4問　積分法とその応用（空所補充）", lead: LEAD1, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 30, prefer: "material", poolTag: TAG(4) },
    { title: "第5問　複素数平面・二次曲線・証明（記述）", lead: LEAD2, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 30, prefer: "material", poolTag: TAG(5) },
  ],
  pool: [...S1, ...S2, ...S3, ...S4, ...S5],
};
