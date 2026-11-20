import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Difficulty, NumQ, QuestionC } from "@/lib/moshi/types";

// 大阪大学型 数学（理系）（国公立・2次）。一般選抜 個別学力検査「数学」（理学部・工学部・基礎工学部・医学部などの理系学部共通の問題）の形式を参考にした練習用の型。
// 形式: 150分・大問5題・すべて記述式（途中の考え方も採点）。範囲は数学Ⅰ・Ⅱ・Ⅲ・A・B（数列）・C（ベクトル・平面上の曲線と複素数平面）。
//   数学Ⅲの微積分（極限・不等式・定積分・回転体の体積・曲線の長さ）が中心で、複素数平面・ベクトル・確率・整数も出る。
//   配点は学部で異なる（理学部などは数学250点）ため、ここでは250点満点・各50点にした。
// 問題はすべてこの型のために作ったオリジナル (過去問の文・数値・設定は使っていない)。答えはすべて sympy で検算した。
// 参考:
//   https://www.osaka-u.ac.jp/ja/admissions/faculty/general/files/9o1vy3/@@download/file (大阪大学 一般選抜 学生募集要項: 個別学力検査の教科・科目と配点)
//   https://jyuke-labo.com/daigakujyukentaisaku/osakadaigaku/kamokubetsu/ (阪大の科目別の傾向: 理系数学は150分・大問5題の記述式)
//   https://jyuke-labo.com/daigakujyukentaisaku/osakadaigaku/rigakubu/ (阪大理学部の配点と対策)
//   https://passnavi.obunsha.co.jp/univ/0590/subject/ (大阪大学の入試科目)

const KEY = "handai-sugaku-ri";
const TAG = (i: number) => `${KEY}:${i}`;
const LEAD = "次の問いに答えよ。答えだけでなく、答えを導く過程も記述せよ。";

type St = [string, string, string?][];
type Rub = { label: string; points: number; keywords?: string[] }[];
interface W {
  id: string;
  u: string;
  d: Difficulty;
  p: string;
  model: string;
  rub: Rub;
  pt: string;
  st: St;
  auto?: NumQ;
  dep?: string;
}

function wr(a: W): QuestionC {
  const points = a.rub.reduce((x, r) => x + r.points, 0);
  return {
    id: a.id,
    type: "C",
    difficulty: a.d,
    points,
    seconds: a.d === 1 ? 480 : a.d === 2 ? 600 : 720,
    skill: "思考・判断・表現",
    unit: a.u,
    prompt: a.p,
    answer: { kind: "written", model: a.model, rubric: a.rub, ...(a.auto ? { autoPart: a.auto } : {}) },
    point: a.pt,
    steps: a.st.map(([title, body, trap]) => ({ title, body, ...(trap ? { trap } : {}) })),
    ...(a.dep ? { dependsOn: a.dep } : {}),
  };
}

const num = (answer: string, calc: string, extra: Partial<NumQ> = {}): NumQ => ({ kind: "num", answerKind: "num", answer: [answer], calc, ...extra });
const surd = (answer: string, eq: string, extra: Partial<NumQ> = {}): NumQ => ({ kind: "num", answerKind: "surd", answer: [answer], equations: [eq], ...extra });
const expr = (answer: string, label: string): NumQ => ({ kind: "num", answerKind: "expr", answer: [answer], labels: [label] });

function sec(tag: number, id: string, unit: string, title: string, body: string, qs: QuestionC[]): ExamPoolSection {
  return {
    unit,
    tag: TAG(tag),
    section: {
      id: `handai-sr-${tag}-${id}`,
      title,
      lead: LEAD,
      material: [{ kind: "text", body }],
      questions: qs,
    },
  };
}

// =====================================================================
// 第1問　極限
// =====================================================================

const S1: ExamPoolSection[] = [
  sec(1, "zenka-sqrt", "h-math-3-kyokugen", "根号を含む漸化式と数列の極限", "数列 {aₙ} を a₁＝0、aₙ₊₁＝√(aₙ + 6)（n＝1, 2, 3, …）で定める。", [
    wr({
      id: "hani",
      u: "h-math-b-zenka",
      d: 1,
      p: "(1) すべての自然数 n について 0≦aₙ＜3 が成り立つことを示せ。",
      model:
        "数学的帰納法で示す。n＝1 のとき a₁＝0 より成り立つ。n＝k のとき 0≦aₖ＜3 と仮定すると、6≦aₖ + 6＜9 であるから √6≦aₖ₊₁＜3。とくに 0≦aₖ₊₁＜3 で、n＝k + 1 のときも成り立つ。よってすべての n で 0≦aₙ＜3。",
      rub: [
        { label: "n＝1 のときを確かめている", points: 4 },
        { label: "6≦aₖ+6＜9 から √6≦aₖ₊₁＜3 を導き、帰納法を完成させている", points: 10, keywords: ["帰納法", "√6", "＜3"] },
      ],
      pt: "根号の中の範囲を押さえて帰納法",
      st: [["帰納法", "0≦aₖ＜3 なら {{6≦aₖ + 6＜9}}、よって √6≦aₖ₊₁＜3。"]],
    }),
    wr({
      id: "hyoka",
      u: "h-math-3-kyokugen",
      d: 2,
      dep: "hani",
      p: "(2) すべての自然数 n について 3 − aₙ₊₁≦(1/3)(3 − aₙ) が成り立つことを示せ。",
      model:
        "3 − aₙ₊₁＝3 − √(aₙ + 6)＝(9 − (aₙ + 6))/(3 + √(aₙ + 6))＝(3 − aₙ)/(3 + √(aₙ + 6))。(1) より 3 − aₙ＞0、また 3 + √(aₙ + 6)≧3 であるから、3 − aₙ₊₁≦(3 − aₙ)/3。",
      rub: [
        { label: "分子の有理化で 3 − aₙ₊₁＝(3 − aₙ)/(3 + √(aₙ+6)) と変形", points: 10, keywords: ["有理化", "3+√(aₙ+6)"] },
        { label: "3 − aₙ＞0 と分母≧3 から不等式を結論", points: 6, keywords: ["≧3"] },
      ],
      pt: "3 − √A は (9 − A)/(3 + √A) と有理化",
      st: [
        ["有理化", "3 − √(aₙ + 6)＝{{(3 − aₙ)/(3 + √(aₙ + 6))}}。"],
        ["評価", "分母は 3 以上、分子は正なので (3 − aₙ)/3 以下。", "分子 3 − aₙ が正であること（(1)）を使わないと、分母を小さくして不等号を向けられない。"],
      ],
    }),
    wr({
      id: "lim",
      u: "h-math-3-kyokugen",
      d: 3,
      dep: "hyoka",
      p: "(3) 極限 lim[n→∞] aₙ を求めよ。",
      model:
        "(2) をくり返し用いると 0＜3 − aₙ≦(1/3)ⁿ⁻¹(3 − a₁)＝3・(1/3)ⁿ⁻¹。n→∞ のとき 3・(1/3)ⁿ⁻¹→0 であるから、はさみうちの原理により lim(3 − aₙ)＝0。よって lim[n→∞] aₙ＝3。",
      rub: [
        { label: "0＜3 − aₙ≦3・(1/3)ⁿ⁻¹ を導いている", points: 10, keywords: ["(1/3)ⁿ⁻¹"] },
        { label: "はさみうちの原理を明示している", points: 4, keywords: ["はさみうち"] },
        { label: "極限値 3", points: 6, keywords: ["3"] },
      ],
      auto: num("3", "3", { labels: ["極限値"] }),
      pt: "差を等比数列で押さえ、はさみうち",
      st: [
        ["くり返す", "0＜3 − aₙ≦{{3・(1/3)ⁿ⁻¹}}。"],
        ["はさみうち", "右辺→0 より {{lim aₙ＝3}}。", "「aₙ＝√(aₙ+6) を解いて 3」だけでは、収束することを示していないので不十分。"],
      ],
    }),
  ]),
  sec(1, "kubun", "h-math-3-sekibun-oyo", "区分求積法と和の極限", "自然数 n に対して、Sₙ＝Σ[k＝1 から n] n/(n² + k²)、Tₙ＝Σ[k＝1 から n] k/(n² + k²) とおく。", [
    wr({
      id: "tan",
      u: "h-math-3-sekibun",
      d: 1,
      p: "(1) 定積分 ∫₀¹ 1/(1 + x²) dx を求めよ。",
      model: "x＝tanθ とおくと dx＝dθ/cos²θ、x：0→1 のとき θ：0→π/4。1 + tan²θ＝1/cos²θ より、∫₀¹ 1/(1 + x²) dx＝∫₀^(π/4) cos²θ・(1/cos²θ) dθ＝∫₀^(π/4) dθ＝π/4。",
      rub: [
        { label: "x＝tanθ と置換し、積分区間を 0→π/4 に変えている", points: 8, keywords: ["tanθ", "π/4"] },
        { label: "値 π/4", points: 6, keywords: ["π/4"] },
      ],
      pt: "1/(1+x²) は x＝tanθ と置換",
      st: [["置換", "x＝tanθ で dx＝dθ/cos²θ、被積分関数は 1 になり {{π/4}}。", "積分区間の変換（0→π/4）を忘れやすい。"]],
    }),
    wr({
      id: "sn",
      u: "h-math-3-sekibun-oyo",
      d: 2,
      dep: "tan",
      p: "(2) lim[n→∞] Sₙ を求めよ。",
      model:
        "Sₙ＝Σ[k＝1 から n] n/(n² + k²)＝(1/n)Σ[k＝1 から n] 1/(1 + (k/n)²)。区分求積法により lim Sₙ＝∫₀¹ 1/(1 + x²) dx＝π/4（(1) による）。",
      rub: [
        { label: "Sₙ＝(1/n)Σ 1/(1+(k/n)²) と変形している", points: 8, keywords: ["(1/n)Σ", "k/n"] },
        { label: "区分求積法で積分に直し、π/4", points: 8, keywords: ["区分求積", "π/4"] },
      ],
      pt: "1/n をくくり出して k/n の関数の和にする",
      st: [
        ["変形", "分母分子を n² で割って {{(1/n)Σ 1/(1 + (k/n)²)}}。"],
        ["区分求積", "∫₀¹ 1/(1 + x²) dx＝{{π/4}}。"],
      ],
    }),
    wr({
      id: "tn",
      u: "h-math-3-sekibun-oyo",
      d: 3,
      dep: "sn",
      p: "(3) lim[n→∞] Tₙ を求めよ。",
      model:
        "Tₙ＝(1/n)Σ[k＝1 から n] (k/n)/(1 + (k/n)²) であるから、区分求積法により lim Tₙ＝∫₀¹ x/(1 + x²) dx＝[(1/2)log(1 + x²)]₀¹＝(1/2)log 2。",
      rub: [
        { label: "Tₙ＝(1/n)Σ (k/n)/(1+(k/n)²) と変形し、∫₀¹ x/(1+x²) dx に直している", points: 10, keywords: ["∫₀¹", "x/(1+x²)"] },
        { label: "f′/f の形として積分し、(1/2)log 2", points: 10, keywords: ["log", "(1/2)log2"] },
      ],
      pt: "x/(1+x²) は (1/2)・(1+x²)′/(1+x²)",
      st: [
        ["変形", "Tₙ＝(1/n)Σ (k/n)/(1 + (k/n)²)。"],
        ["積分", "∫₀¹ x/(1 + x²) dx＝{{(1/2)log 2}}。", "(1) と同じ置換をする必要はない。分子が分母の微分の 1/2 倍になっている。"],
      ],
    }),
  ]),
  sec(1, "sekibun-zenka", "h-math-3-kyokugen", "定積分で定めた数列の極限", "自然数 n に対して、Iₙ＝∫₀¹ xⁿ/(1 + x) dx とおく。", [
    wr({
      id: "wa",
      u: "h-math-3-sekibun",
      d: 1,
      p: "(1) Iₙ + Iₙ₊₁ を n の式で表せ。",
      model: "Iₙ + Iₙ₊₁＝∫₀¹ (xⁿ + xⁿ⁺¹)/(1 + x) dx＝∫₀¹ xⁿ(1 + x)/(1 + x) dx＝∫₀¹ xⁿ dx＝1/(n + 1)。",
      rub: [
        { label: "xⁿ + xⁿ⁺¹＝xⁿ(1 + x) で約分している", points: 8, keywords: ["xⁿ(1+x)"] },
        { label: "Iₙ + Iₙ₊₁＝1/(n + 1)", points: 6, keywords: ["1/(n+1)"] },
      ],
      pt: "足すと分母の 1 + x が消える",
      st: [["約分", "(xⁿ + xⁿ⁺¹)/(1 + x)＝xⁿ だから {{1/(n + 1)}}。"]],
    }),
    wr({
      id: "futo",
      u: "h-math-3-sekibun",
      d: 2,
      dep: "wa",
      p: "(2) すべての自然数 n について、1/(2(n + 1))≦Iₙ≦1/(2n) が成り立つことを示せ。",
      model:
        "0≦x≦1 で xⁿ⁺¹≦xⁿ より、xⁿ⁺¹/(1 + x)≦xⁿ/(1 + x) で Iₙ₊₁≦Iₙ（すべての n）。(1) より 1/(n + 1)＝Iₙ + Iₙ₊₁≦2Iₙ であるから Iₙ≧1/(2(n + 1))。また n≧2 のとき 1/n＝Iₙ₋₁ + Iₙ≧2Iₙ より Iₙ≦1/(2n)。n＝1 のときは I₁＝∫₀¹ (1 − 1/(1 + x)) dx＝1 − log 2 で、log 2＞1/2（e＜4 より）から I₁＜1/2。よって示された。",
      rub: [
        { label: "Iₙ₊₁≦Iₙ（単調減少）を示している", points: 6, keywords: ["Iₙ₊₁≦Iₙ"] },
        { label: "(1) と組み合わせて下からの評価 1/(2(n+1))≦Iₙ", points: 5 },
        { label: "Iₙ₋₁ + Iₙ＝1/n を使った上からの評価（n＝1 も確認）", points: 5, keywords: ["1/n", "I₁"] },
      ],
      pt: "単調減少と (1) の和の式をはさんで使う",
      st: [
        ["単調性", "0≦x≦1 では xⁿ⁺¹≦xⁿ なので {{Iₙ₊₁≦Iₙ}}。"],
        ["両側の評価", "1/(n + 1)＝Iₙ + Iₙ₊₁≦2Iₙ、1/n＝Iₙ₋₁ + Iₙ≧2Iₙ。", "上からの評価は n − 1 番目を使うので、n＝1 は別に確かめる。"],
      ],
    }),
    wr({
      id: "lim-n",
      u: "h-math-3-kyokugen",
      d: 3,
      dep: "futo",
      p: "(3) 極限 lim[n→∞] nIₙ を求めよ。",
      model: "(2) より n/(2(n + 1))≦nIₙ≦1/2。n→∞ のとき n/(2(n + 1))＝1/(2(1 + 1/n))→1/2 であるから、はさみうちの原理により lim nIₙ＝1/2。",
      rub: [
        { label: "(2) の各辺に n をかけて n/(2(n+1))≦nIₙ≦1/2", points: 10 },
        { label: "はさみうちの原理で極限 1/2", points: 10, keywords: ["はさみうち", "1/2"] },
      ],
      auto: num("1/2", "1/2", { labels: ["極限値"] }),
      pt: "評価の両端が同じ値に近づけばはさみうち",
      st: [["はさみうち", "n/(2(n + 1))≦nIₙ≦1/2 で、左辺も 1/2 に近づくので {{1/2}}。", "Iₙ→0 だけを答えにしない。n をかけた極限を聞いている。"]],
    }),
  ]),
];

// =====================================================================
// 第2問　微分法の応用
// =====================================================================

const S2: ExamPoolSection[] = [
  sec(2, "log-kaisu", "h-math-3-bibun-oyo", "対数関数を含む方程式の実数解の個数", "x＞0 で定義された関数 f(x)＝(log x)/x² を考える。ただし log は自然対数とし、a は実数の定数とする。", [
    wr({
      id: "max",
      u: "h-math-3-bibun-oyo",
      d: 1,
      p: "(1) f(x) の増減を調べ、最大値とそのときの x の値を求めよ。",
      model:
        "f′(x)＝((1/x)・x² − 2x log x)/x⁴＝(1 − 2log x)/x³。f′(x)＝0 となるのは log x＝1/2、すなわち x＝√e。0＜x＜√e で f′(x)＞0、x＞√e で f′(x)＜0 より、f(x) は x＝√e で最大となり、最大値は f(√e)＝(1/2)/e＝1/(2e)。",
      rub: [
        { label: "f′(x)＝(1 − 2log x)/x³", points: 6, keywords: ["1−2log x"] },
        { label: "x＝√e で最大値 1/(2e)", points: 8, keywords: ["√e", "1/(2e)"] },
      ],
      pt: "商の微分で、分子の符号だけを見る",
      st: [
        ["微分", "f′(x)＝{{(1 − 2log x)/x³}}。x³＞0 なので分子の符号で決まる。"],
        ["最大値", "x＝√e で {{1/(2e)}}。", "(√e)²＝e。log√e＝1/2。"],
      ],
    }),
    wr({
      id: "kyokugen",
      u: "h-math-3-kyokugen",
      d: 2,
      dep: "max",
      p: "(2) x＞0 で log x＜x が成り立つことを示し、それを用いて lim[x→∞] f(x)、lim[x→+0] f(x) を求めよ。",
      model:
        "g(x)＝x − log x とおくと g′(x)＝1 − 1/x。g は x＝1 で最小となり、最小値 g(1)＝1＞0。よって log x＜x。x＞1 では 0＜log x＜x より 0＜f(x)＜x/x²＝1/x→0 であるから、はさみうちの原理で lim[x→∞] f(x)＝0。また x→+0 のとき log x→−∞、1/x²→+∞ であるから lim[x→+0] f(x)＝−∞。",
      rub: [
        { label: "g(x)＝x − log x の最小値が 1＞0 であることから log x＜x", points: 6, keywords: ["x−log x", "最小"] },
        { label: "0＜f(x)＜1/x とはさみうちで lim[x→∞] f(x)＝0", points: 6, keywords: ["はさみうち", "1/x"] },
        { label: "lim[x→+0] f(x)＝−∞", points: 4, keywords: ["−∞"] },
      ],
      pt: "log x＜x で分母の x² の勝ちを示す",
      st: [
        ["不等式", "g(x)＝x − log x の最小値は {{g(1)＝1}}。"],
        ["極限", "0＜f(x)＜1/x より {{0}}。x→+0 では (負の大きい数)×(正の大きい数) で −∞。", "x→+0 は「不定形」ではない。log x→−∞ と 1/x²→+∞ の積。"],
      ],
    }),
    wr({
      id: "kosu",
      u: "h-math-3-bibun-oyo",
      d: 3,
      dep: "kyokugen",
      p: "(3) x の方程式 log x＝ax² の正の実数解の個数を、a の値によって分類して答えよ。",
      model:
        "x＞0 で log x＝ax² ⇔ f(x)＝a。よって解の個数は、曲線 y＝f(x) と直線 y＝a の共有点の個数。(1)(2) より f(x) は 0＜x≦√e で −∞ から 1/(2e) まで単調に増加し、x≧√e で 1/(2e) から 0 に近づきながら単調に減少する（x＞1 で f(x)＞0）。よって a＞1/(2e) のとき 0 個、a＝1/(2e) のとき 1 個、0＜a＜1/(2e) のとき 2 個、a≦0 のとき 1 個。",
      rub: [
        { label: "定数 a を分離して f(x)＝a の共有点の個数に帰着", points: 6, keywords: ["f(x)=a", "共有点"] },
        { label: "(1)(2) をもとにグラフの概形（増減と端の極限）を示している", points: 6 },
        { label: "a＞1/(2e)：0個、a＝1/(2e)：1個、0＜a＜1/(2e)：2個、a≦0：1個", points: 8, keywords: ["1/(2e)", "a≦0"] },
      ],
      pt: "文字定数を分離し、y＝a とグラフの交点を数える",
      st: [
        ["定数分離", "log x＝ax² ⇔ {{(log x)/x²＝a}}。"],
        ["グラフ", "−∞ から 1/(2e) まで増え、その後 0 に近づきながら減る。"],
        ["分類", "a＞1/(2e)：0、a＝1/(2e)：1、0＜a＜1/(2e)：2、{{a≦0：1}}。", "x→∞ で f(x)＞0 のまま 0 に近づくので、a＝0 のときの解は x＝1 の1つだけ。"],
      ],
    }),
  ]),
  sec(2, "naisetsu-sankaku", "h-math-3-bibun-oyo", "円に内接する二等辺三角形の面積の最大", "座標平面上の単位円 x² + y²＝1 の上に、3点 A(−1, 0)、B(cosθ, sinθ)、C(cosθ, −sinθ) をとる。ただし 0＜θ＜π とし、三角形 ABC の面積を S(θ) とする。", [
    wr({
      id: "s-theta",
      u: "h-math-2-sankaku",
      d: 1,
      p: "(1) S(θ) を θ の式で表せ。",
      model: "BC は x 軸に垂直な線分で、長さ 2sinθ（sinθ＞0）。A から直線 x＝cosθ までの距離は cosθ − (−1)＝1 + cosθ。よって S(θ)＝(1/2)・2sinθ・(1 + cosθ)＝sinθ(1 + cosθ)。",
      rub: [
        { label: "底辺 BC＝2sinθ、高さ 1 + cosθ", points: 8, keywords: ["2sinθ", "1+cosθ"] },
        { label: "S(θ)＝sinθ(1 + cosθ)", points: 6, keywords: ["sinθ(1+cosθ)"] },
      ],
      pt: "BC は縦の線分。高さは x 座標の差",
      st: [["底辺と高さ", "BC＝2sinθ、高さ 1 + cosθ で {{S(θ)＝sinθ(1 + cosθ)}}。"]],
    }),
    wr({
      id: "bibun",
      u: "h-math-3-bibun",
      d: 2,
      dep: "s-theta",
      p: "(2) S′(θ) を cosθ の式で因数分解した形で表せ。",
      model: "S′(θ)＝cosθ(1 + cosθ) + sinθ・(−sinθ)＝cosθ + cos²θ − sin²θ＝cosθ + cos²θ − (1 − cos²θ)＝2cos²θ + cosθ − 1＝(2cosθ − 1)(cosθ + 1)。",
      rub: [
        { label: "積の微分で cosθ(1 + cosθ) − sin²θ", points: 8, keywords: ["積の微分", "−sin²θ"] },
        { label: "S′(θ)＝(2cosθ − 1)(cosθ + 1)", points: 8, keywords: ["(2cosθ−1)(cosθ+1)"] },
      ],
      pt: "sin²θ＝1 − cos²θ で cosθ だけの式にする",
      st: [
        ["積の微分", "S′(θ)＝cosθ(1 + cosθ) − sin²θ。"],
        ["因数分解", "{{(2cosθ − 1)(cosθ + 1)}}。", "(1 + cosθ)′＝−sinθ の符号に注意。"],
      ],
    }),
    wr({
      id: "saidai",
      u: "h-math-3-bibun-oyo",
      d: 3,
      dep: "bibun",
      p: "(3) S(θ) の最大値と、そのときの θ の値を求めよ。",
      model:
        "0＜θ＜π で cosθ + 1＞0 であるから、S′(θ) の符号は 2cosθ − 1 の符号と同じ。0＜θ＜π/3 で S′(θ)＞0、π/3＜θ＜π で S′(θ)＜0。よって θ＝π/3 で最大となり、最大値は S(π/3)＝(√3/2)(1 + 1/2)＝3√3/4。（このとき三角形 ABC は正三角形。）",
      rub: [
        { label: "cosθ + 1＞0 に注意して S′ の符号を調べ、増減を示している", points: 8, keywords: ["増減", "cosθ+1＞0"] },
        { label: "θ＝π/3 で最大", points: 4, keywords: ["π/3"] },
        { label: "最大値 3√3/4", points: 8, keywords: ["3√3/4"] },
      ],
      auto: surd("3√3/4", "16*x^2=27", { labels: ["最大値"] }),
      pt: "cosθ＝1/2 の前後で S′ の符号が変わる",
      st: [
        ["増減", "cosθ＞1/2 ⇔ {{0＜θ＜π/3}} で増加、その後減少。"],
        ["最大値", "S(π/3)＝(√3/2)(3/2)＝{{3√3/4}}。", "cosθ が減少関数なので、cosθ＞1/2 は θ＜π/3。向きを逆にしない。"],
      ],
    }),
  ]),
  sec(2, "heikinchi", "h-math-3-bibun-oyo", "平均値の定理と調和級数の増え方", "log は自然対数とする。自然数 n に対して Hₙ＝Σ[k＝1 から n] 1/k とおく。", [
    wr({
      id: "mvt",
      u: "h-math-3-bibun-oyo",
      d: 1,
      p: "(1) 0＜a＜b のとき、(b − a)/b＜log b − log a＜(b − a)/a が成り立つことを示せ。",
      model:
        "関数 log x は区間 [a, b] で連続、(a, b) で微分可能であるから、平均値の定理により (log b − log a)/(b − a)＝1/c を満たす c が a＜c＜b に存在する。1/b＜1/c＜1/a であるから、各辺に b − a＞0 をかけて (b − a)/b＜log b − log a＜(b − a)/a。",
      rub: [
        { label: "平均値の定理で (log b − log a)/(b − a)＝1/c（a＜c＜b）", points: 8, keywords: ["平均値の定理", "1/c"] },
        { label: "1/b＜1/c＜1/a から不等式を結論", points: 6 },
      ],
      pt: "差の商は平均値の定理で導関数の値に",
      st: [["平均値の定理", "log b − log a＝(b − a)・{{1/c}}（a＜c＜b）で、1/b＜1/c＜1/a。"]],
    }),
    wr({
      id: "hasami",
      u: "h-math-3-bibun-oyo",
      d: 2,
      dep: "mvt",
      p: "(2) n≧2 のとき、log(n + 1)＜Hₙ＜1 + log n が成り立つことを示せ。",
      model:
        "(1) で a＝k、b＝k + 1 とすると 1/(k + 1)＜log(k + 1) − log k＜1/k。右側の不等式を k＝1, 2, …, n で加えると log(n + 1) − log 1＜Hₙ、すなわち log(n + 1)＜Hₙ。左側の不等式を k＝1, 2, …, n − 1 で加えると Hₙ − 1＜log n − log 1＝log n、すなわち Hₙ＜1 + log n。",
      rub: [
        { label: "(1) に a＝k、b＝k+1 を代入した不等式", points: 6, keywords: ["1/(k+1)", "1/k"] },
        { label: "k について和をとり log(n+1)＜Hₙ", points: 5 },
        { label: "k＝1〜n−1 の和で Hₙ＜1 + log n", points: 5 },
      ],
      pt: "隣り合う整数で (1) を使い、足して望遠鏡和",
      st: [
        ["代入", "1/(k + 1)＜{{log(k + 1) − log k}}＜1/k。"],
        ["和をとる", "真ん中の和は打ち消し合って log(n + 1) や log n になる。", "上からの評価は k＝1〜n−1 の和。1/1 の項を別にする。"],
      ],
    }),
    wr({
      id: "lim-h",
      u: "h-math-3-kyokugen",
      d: 3,
      dep: "hasami",
      p: "(3) 極限 lim[n→∞] Hₙ/log n を求めよ。",
      model:
        "n≧2 で log n＞0 より、(2) の各辺を log n で割ると log(n + 1)/log n＜Hₙ/log n＜1/log n + 1。log(n + 1)/log n＞1 であるから 1＜Hₙ/log n＜1 + 1/log n。n→∞ で 1/log n→0 であるから、はさみうちの原理により lim Hₙ/log n＝1。",
      rub: [
        { label: "(2) を log n で割り、1＜Hₙ/log n＜1 + 1/log n の形にしている", points: 10, keywords: ["1/log n"] },
        { label: "はさみうちで極限 1", points: 10, keywords: ["はさみうち", "1"] },
      ],
      auto: num("1", "1", { labels: ["極限値"] }),
      pt: "log(n+1)/log n＞1 で下側を 1 にそろえる",
      st: [["はさみうち", "1＜Hₙ/log n＜1 + 1/log n で、{{1}}。", "Hₙ 自体は発散する（log n と同じ速さ）。"]],
    }),
  ]),
];

// =====================================================================
// 第3問　積分法の応用
// =====================================================================

const S3: ExamPoolSection[] = [
  sec(3, "sin2x", "h-math-3-sekibun-oyo", "2つの正弦曲線で囲まれた部分と回転体", "0≦x≦π/2 の範囲で、2曲線 C₁：y＝sin 2x、C₂：y＝sin x を考える。", [
    wr({
      id: "kyoyu",
      u: "h-math-2-sankaku",
      d: 1,
      p: "(1) C₁ と C₂ の共有点の x 座標をすべて求めよ。また、その間で C₁ と C₂ のどちらが上にあるか答えよ。",
      model: "sin 2x＝sin x ⇔ 2sin x cos x − sin x＝0 ⇔ sin x(2cos x − 1)＝0。0≦x≦π/2 では sin x＝0 から x＝0、cos x＝1/2 から x＝π/3。0＜x＜π/3 では sin x＞0、2cos x − 1＞0 より sin 2x − sin x＞0 で、C₁ が上にある。",
      rub: [
        { label: "sin x(2cos x − 1)＝0 と因数分解", points: 6, keywords: ["2cos x−1"] },
        { label: "x＝0, π/3 と、0＜x＜π/3 で C₁ が上", points: 8, keywords: ["π/3", "C₁"] },
      ],
      pt: "2倍角の公式で sin x をくくり出す",
      st: [["2倍角", "sin 2x − sin x＝{{sin x(2cos x − 1)}}。x＝0, π/3。", "両辺を sin x で割ると x＝0 を落とす。"]],
    }),
    wr({
      id: "menseki",
      u: "h-math-3-sekibun-oyo",
      d: 2,
      dep: "kyoyu",
      p: "(2) C₁ と C₂ で囲まれた部分の面積 S を求めよ。",
      model: "S＝∫₀^(π/3) (sin 2x − sin x) dx＝[−(1/2)cos 2x + cos x]₀^(π/3)＝(−(1/2)(−1/2) + 1/2) − (−1/2 + 1)＝3/4 − 1/2＝1/4。",
      rub: [
        { label: "S＝∫₀^(π/3) (sin 2x − sin x) dx と立式", points: 6, keywords: ["∫", "sin2x−sinx"] },
        { label: "原始関数 −(1/2)cos 2x + cos x", points: 4, keywords: ["−(1/2)cos2x"] },
        { label: "S＝1/4", points: 6, keywords: ["1/4"] },
      ],
      auto: num("1/4", "1/4", { labels: ["S ="] }),
      pt: "cos(2π/3)＝−1/2 の代入を慎重に",
      st: [
        ["積分", "[−(1/2)cos 2x + cos x]₀^(π/3)。"],
        ["代入", "3/4 − 1/2＝{{1/4}}。", "cos 2x の原始関数の係数 1/2 を忘れやすい。"],
      ],
    }),
    wr({
      id: "taiseki",
      u: "h-math-3-sekibun-oyo",
      d: 3,
      dep: "menseki",
      p: "(3) C₁ と C₂ で囲まれた部分を x 軸のまわりに1回転してできる立体の体積 V を求めよ。",
      model:
        "0≦x≦π/3 で sin 2x≧sin x≧0 であるから、V＝π∫₀^(π/3) (sin²2x − sin²x) dx。sin²2x − sin²x＝(1 − cos 4x)/2 − (1 − cos 2x)/2＝(cos 2x − cos 4x)/2。よって V＝(π/2)[(1/2)sin 2x − (1/4)sin 4x]₀^(π/3)＝(π/2)((1/2)(√3/2) − (1/4)(−√3/2))＝(π/2)(3√3/8)＝3√3π/16。",
      rub: [
        { label: "V＝π∫ (sin²2x − sin²x) dx と立式（両方とも x 軸の上にあることを確認）", points: 8, keywords: ["π∫", "sin²2x−sin²x"] },
        { label: "半角の公式で (cos 2x − cos 4x)/2 に直して積分", points: 6, keywords: ["半角", "cos4x"] },
        { label: "V＝3√3π/16", points: 6, keywords: ["3√3π/16"] },
      ],
      pt: "回転体は (外側の半径)² − (内側の半径)²",
      st: [
        ["立式", "V＝π∫₀^(π/3) ({{sin²2x − sin²x}}) dx。", "π∫(sin 2x − sin x)² dx としない。差の2乗ではなく2乗の差。"],
        ["計算", "(π/2)[(1/2)sin 2x − (1/4)sin 4x]＝{{3√3π/16}}。"],
      ],
    }),
  ]),
  sec(3, "log-kaiten", "h-math-3-sekibun-oyo", "対数曲線と2通りの回転体", "曲線 y＝log x と x 軸、および直線 x＝e で囲まれた部分を D とする。ただし log は自然対数とする。", [
    wr({
      id: "menseki-d",
      u: "h-math-3-sekibun",
      d: 1,
      p: "(1) D の面積を求めよ。",
      model: "1≦x≦e で log x≧0。部分積分により ∫₁^e log x dx＝[x log x]₁^e − ∫₁^e 1 dx＝e − (e − 1)＝1。",
      rub: [
        { label: "部分積分で ∫ log x dx＝x log x − x", points: 8, keywords: ["部分積分", "x log x−x"] },
        { label: "面積 1", points: 6, keywords: ["1"] },
      ],
      auto: num("1", "1", { labels: ["面積"] }),
      pt: "log x は 1・log x とみて部分積分",
      st: [["部分積分", "∫ log x dx＝x log x − x。[x log x − x]₁^e＝0 − (−1)＝{{1}}。", "積分の下端は x 軸との交点 x＝1。"]],
    }),
    wr({
      id: "x-jiku",
      u: "h-math-3-sekibun-oyo",
      d: 2,
      dep: "menseki-d",
      p: "(2) D を x 軸のまわりに1回転してできる立体の体積 V₁ を求めよ。",
      model:
        "V₁＝π∫₁^e (log x)² dx。部分積分により ∫(log x)² dx＝x(log x)² − ∫x・2(log x)/x dx＝x(log x)² − 2∫log x dx＝x(log x)² − 2(x log x − x)。よって V₁＝π[x(log x)² − 2x log x + 2x]₁^e＝π((e − 2e + 2e) − 2)＝π(e − 2)。",
      rub: [
        { label: "V₁＝π∫₁^e (log x)² dx と立式", points: 6, keywords: ["π∫", "(log x)²"] },
        { label: "部分積分を2回行っている", points: 4, keywords: ["部分積分"] },
        { label: "V₁＝π(e − 2)", points: 6, keywords: ["π(e−2)"] },
      ],
      pt: "(log x)² も部分積分。(1) の結果を再利用",
      st: [
        ["部分積分", "∫(log x)² dx＝x(log x)² − {{2∫log x dx}}。"],
        ["代入", "[x(log x)² − 2x log x + 2x]₁^e＝e − 2 で {{π(e − 2)}}。", "x＝1 での値 2 を引き忘れない。"],
      ],
    }),
    wr({
      id: "y-jiku",
      u: "h-math-3-sekibun-oyo",
      d: 3,
      dep: "x-jiku",
      p: "(3) D を y 軸のまわりに1回転してできる立体の体積 V₂ を求めよ。",
      model:
        "D は 0≦y≦1 の範囲にあり、高さ y での切り口は x＝e^y から x＝e までの線分である。y 軸のまわりに回すと、切り口は外側の半径 e、内側の半径 e^y の円環になる。よって V₂＝π∫₀¹ (e² − e^(2y)) dy＝π(e² − [(1/2)e^(2y)]₀¹)＝π(e² − (e² − 1)/2)＝π(e² + 1)/2。",
      rub: [
        { label: "y で切った切り口を円環（外側 e、内側 e^y）ととらえている", points: 8, keywords: ["e^y", "円環"] },
        { label: "V₂＝π∫₀¹ (e² − e^(2y)) dy と立式", points: 6, keywords: ["π∫₀¹"] },
        { label: "V₂＝π(e² + 1)/2", points: 6, keywords: ["(e²+1)/2"] },
      ],
      pt: "y 軸回転は x を y で表し、穴のあいた円で考える",
      st: [
        ["切り口", "y＝log x ⇔ x＝e^y。切り口は {{半径 e と e^y の円環}}。"],
        ["積分", "π∫₀¹ (e² − e^(2y)) dy＝{{π(e² + 1)/2}}。", "外側の円柱 πe²・1 を忘れて π∫e^(2y) dy だけにしない。"],
      ],
    }),
  ]),
  sec(3, "rasen", "h-math-c-baikai", "等角らせんの長さ", "座標平面上の点 P の座標が、媒介変数 t（t≧0）を用いて x＝e^(−t)cos t、y＝e^(−t)sin t と表されている。t が 0 から T まで変わるとき P が描く曲線の長さを L(T) とする。", [
    wr({
      id: "sokudo",
      u: "h-math-c-baikai",
      d: 1,
      p: "(1) (dx/dt)² + (dy/dt)² を t の式で表せ。",
      model:
        "dx/dt＝−e^(−t)cos t − e^(−t)sin t＝−e^(−t)(cos t + sin t)、dy/dt＝−e^(−t)sin t + e^(−t)cos t＝e^(−t)(cos t − sin t)。よって (dx/dt)² + (dy/dt)²＝e^(−2t)((cos t + sin t)² + (cos t − sin t)²)＝e^(−2t)・2＝2e^(−2t)。",
      rub: [
        { label: "dx/dt、dy/dt を積の微分で求めている", points: 6, keywords: ["−e^(−t)(cos t+sin t)"] },
        { label: "(dx/dt)² + (dy/dt)²＝2e^(−2t)", points: 8, keywords: ["2e^(−2t)"] },
      ],
      pt: "(c+s)² + (c−s)²＝2 で三角関数が消える",
      st: [["微分", "dx/dt＝−e^(−t)(cos t + sin t)、dy/dt＝e^(−t)(cos t − sin t)。和の2乗は {{2e^(−2t)}}。"]],
    }),
    wr({
      id: "nagasa",
      u: "h-math-3-sekibun-oyo",
      d: 2,
      dep: "sokudo",
      p: "(2) L(T) を T の式で表せ。",
      model: "L(T)＝∫₀ᵀ √((dx/dt)² + (dy/dt)²) dt＝∫₀ᵀ √2 e^(−t) dt＝√2[−e^(−t)]₀ᵀ＝√2(1 − e^(−T))。",
      rub: [
        { label: "L(T)＝∫₀ᵀ √((dx/dt)²+(dy/dt)²) dt と立式", points: 8, keywords: ["∫₀ᵀ", "√"] },
        { label: "L(T)＝√2(1 − e^(−T))", points: 8, keywords: ["√2(1−e^(−T))"] },
      ],
      pt: "√(2e^(−2t))＝√2 e^(−t)",
      st: [["曲線の長さ", "∫₀ᵀ √2 e^(−t) dt＝{{√2(1 − e^(−T))}}。", "√(e^(−2t))＝e^(−t)（e^(−t)＞0）。"]],
    }),
    wr({
      id: "lim-l",
      u: "h-math-3-kyokugen",
      d: 3,
      dep: "nagasa",
      p: "(3) lim[T→∞] L(T) を求めよ。また、T→∞ のとき点 P はどの点に近づくか答え、OP の長さと t の関係から、曲線がどのような形か説明せよ（O は原点）。",
      model:
        "T→∞ のとき e^(−T)→0 であるから lim L(T)＝√2。また OP＝√(x² + y²)＝e^(−t)→0 であるから、P は原点 O に近づく。OP＝e^(−t) は t とともに減少し、偏角は t であるから、曲線は原点のまわりを反時計回りに無限に回りながら原点に近づくらせんである。無限に回るのに、長さは有限の √2 にとどまる。",
      rub: [
        { label: "lim L(T)＝√2", points: 8, keywords: ["√2"] },
        { label: "OP＝e^(−t)→0 から P は原点に近づく", points: 6, keywords: ["e^(−t)", "原点"] },
        { label: "偏角 t、OP 減少から原点を回るらせんと説明", points: 6, keywords: ["らせん", "偏角"] },
      ],
      auto: surd("√2", "x^2=2", { labels: ["極限値"] }),
      pt: "極座標で見ると r＝e^(−θ) のらせん",
      st: [
        ["極限", "e^(−T)→0 で {{√2}}。"],
        ["形", "OP＝e^(−t)、偏角 t。原点を無限に回りながら近づく {{らせん}}。", "無限に回るから長さも無限、とはならない。"],
      ],
    }),
  ]),
];

// =====================================================================
// 第4問　複素数平面
// =====================================================================

const S4: ExamPoolSection[] = [
  sec(4, "go-jokon", "h-math-c-fukuso", "1の5乗根と cos(2π/5)", "α＝cos(2π/5) + i sin(2π/5) とおく。ただし i は虚数単位とする。", [
    wr({
      id: "wa-zero",
      u: "h-math-c-fukuso",
      d: 1,
      p: "(1) α⁴ + α³ + α² + α + 1＝0 であることを示せ。",
      model: "ド・モアブルの定理より α⁵＝cos 2π + i sin 2π＝1。よって α⁵ − 1＝(α − 1)(α⁴ + α³ + α² + α + 1)＝0。α≠1 であるから α⁴ + α³ + α² + α + 1＝0。",
      rub: [
        { label: "ド・モアブルの定理で α⁵＝1", points: 6, keywords: ["ド・モアブル", "α⁵=1"] },
        { label: "α⁵ − 1 を因数分解し、α≠1 から結論", points: 8, keywords: ["α≠1"] },
      ],
      pt: "α⁵＝1 と α≠1 の2つを使う",
      st: [["因数分解", "α⁵ − 1＝(α − 1)({{α⁴ + α³ + α² + α + 1}})、α≠1。", "α≠1 を書かずに割るのは減点される。"]],
    }),
    wr({
      id: "cos72",
      u: "h-math-c-fukuso",
      d: 2,
      dep: "wa-zero",
      p: "(2) t＝α + 1/α とおく。t の満たす2次方程式を求め、cos(2π/5) の値を求めよ。",
      model:
        "(1) の両辺を α² で割ると α² + α + 1 + 1/α + 1/α²＝0。α² + 1/α²＝t² − 2 より t² + t − 1＝0。また |α|＝1 より 1/α＝ᾱ で、t＝α + ᾱ＝2cos(2π/5)＞0。t＝(−1 + √5)/2 であるから、cos(2π/5)＝(√5 − 1)/4。",
      rub: [
        { label: "α² で割り t² + t − 1＝0 を導く", points: 8, keywords: ["t²+t−1=0"] },
        { label: "t＝2cos(2π/5)＞0 から正の解を選ぶ", points: 4, keywords: ["2cos"] },
        { label: "cos(2π/5)＝(√5 − 1)/4", points: 4, keywords: ["(√5−1)/4"] },
      ],
      auto: surd("(√5-1)/4", "4*x^2+2*x-1=0", { labels: ["cos(2π/5)"] }),
      pt: "相反方程式は α + 1/α でまとめる",
      st: [
        ["置きかえ", "α² + 1/α²＝t² − 2 で {{t² + t − 1＝0}}。"],
        ["符号", "t＝2cos(2π/5)＞0 より {{(√5 − 1)/4}}。", "t の値を答えにしない。cos は t の半分。"],
      ],
    }),
    wr({
      id: "seki",
      u: "h-math-c-fukuso",
      d: 3,
      dep: "cos72",
      p: "(3) (1 − α)(1 − α²)(1 − α³)(1 − α⁴) の値を求めよ。",
      model:
        "α, α², α³, α⁴ は互いに異なり、いずれも z⁵＝1 を満たし 1 と異なるから、z⁴ + z³ + z² + z + 1＝0 の4つの解である。よって z⁴ + z³ + z² + z + 1＝(z − α)(z − α²)(z − α³)(z − α⁴) が恒等的に成り立つ。z＝1 を代入して (1 − α)(1 − α²)(1 − α³)(1 − α⁴)＝5。",
      rub: [
        { label: "α, α², α³, α⁴ が z⁴+z³+z²+z+1＝0 の4解であることを示している", points: 8, keywords: ["4つの解", "異なる"] },
        { label: "因数分解の恒等式に z＝1 を代入", points: 6, keywords: ["z=1", "恒等式"] },
        { label: "値 5", points: 6, keywords: ["5"] },
      ],
      auto: num("5", "1+1+1+1+1", { labels: ["値"] }),
      pt: "解がわかれば因数分解の形にして代入",
      st: [
        ["4つの解", "z⁴ + z³ + z² + z + 1＝{{(z − α)(z − α²)(z − α³)(z − α⁴)}}。"],
        ["代入", "z＝1 で左辺は {{5}}。", "4つが互いに異なることを言わないと、因数分解できるとは言えない。"],
      ],
    }),
  ]),
  sec(4, "gyakusu", "h-math-c-fukuso", "直線上の点の逆数が描く図形", "複素数平面上で、点 z が直線 Re z＝1（実部が 1 の点全体）の上を動くとき、w＝1/z で定まる点 w を考える。i は虚数単位とする。", [
    wr({
      id: "rei",
      u: "h-math-c-fukuso",
      d: 1,
      p: "(1) z＝1 + i、z＝1 − i のときの w をそれぞれ求めよ。",
      model: "z＝1 + i のとき w＝1/(1 + i)＝(1 − i)/((1 + i)(1 − i))＝(1 − i)/2。z＝1 − i のとき w＝(1 + i)/2。",
      rub: [
        { label: "分母の共役複素数をかけて実数化", points: 6, keywords: ["共役"] },
        { label: "w＝(1 − i)/2、(1 + i)/2", points: 8, keywords: ["(1−i)/2", "(1+i)/2"] },
      ],
      pt: "1/(a+bi) は分母分子に a−bi をかける",
      st: [["実数化", "1/(1 + i)＝{{(1 − i)/2}}。"]],
    }),
    wr({
      id: "en",
      u: "h-math-c-fukuso",
      d: 2,
      dep: "rei",
      p: "(2) w は、ある円から1点を除いた図形の上を動くことを示し、その円の中心と半径、除かれる点を答えよ。",
      model:
        "z＝1/w（w≠0）。Re z＝1 ⇔ z + z̄＝2 ⇔ 1/w + 1/w̄＝2 ⇔ w̄ + w＝2ww̄ ⇔ ww̄ − (1/2)w − (1/2)w̄＝0 ⇔ (w − 1/2)(w̄ − 1/2)＝1/4 ⇔ |w − 1/2|＝1/2。w＝1/z≠0 であるから、w は中心 1/2、半径 1/2 の円から原点 0 を除いた図形の上を動く。逆にこの図形上の w に対して z＝1/w は Re z＝1 を満たすので、この図形全体を動く。",
      rub: [
        { label: "z＝1/w を z + z̄＝2 に代入して w の式にしている", points: 6, keywords: ["z+z̄=2", "1/w"] },
        { label: "|w − 1/2|＝1/2 を導く", points: 6, keywords: ["|w−1/2|=1/2"] },
        { label: "原点が除かれることを示している", points: 4, keywords: ["0", "除く"] },
      ],
      pt: "Re z＝1 は z + z̄＝2 と書いて代入",
      st: [
        ["条件式", "Re z＝1 ⇔ {{z + z̄＝2}}。z＝1/w を代入。"],
        ["円", "|w − 1/2|＝1/2。w＝0 には決してならない。", "z が直線上を動いても w＝0 にはならない。除外点を書き忘れやすい。"],
      ],
    }),
    wr({
      id: "max-dist",
      u: "h-math-c-fukuso",
      d: 3,
      dep: "en",
      p: "(3) |w − i| の最大値を求めよ。",
      model:
        "(2) より w は中心 C(1/2)、半径 1/2 の円（原点を除く）上を動く。点 i と C の距離は |i − 1/2|＝√(1/4 + 1)＝√5/2。|w − i| が最大になるのは、w が直線 i C 上で C に関して i と反対側の円周上の点のときで、最大値は √5/2 + 1/2＝(1 + √5)/2。この点は原点ではない（原点と i の距離は 1＜(1 + √5)/2）ので、最大値は確かにとられる。",
      rub: [
        { label: "円の中心と点 i の距離 √5/2", points: 8, keywords: ["√5/2"] },
        { label: "最大値＝(中心までの距離)＋(半径)、除外点でないことを確認", points: 6, keywords: ["半径", "原点"] },
        { label: "最大値 (1 + √5)/2", points: 6, keywords: ["(1+√5)/2"] },
      ],
      auto: surd("(1+√5)/2", "x^2-x-1=0", { labels: ["最大値"] }),
      pt: "円周上の点との距離の最大は 中心までの距離＋半径",
      st: [
        ["中心との距離", "|i − 1/2|＝{{√5/2}}。"],
        ["最大値", "√5/2 + 1/2＝{{(1 + √5)/2}}。", "最大をとる点が除外点（原点）でないことを確かめる。"],
      ],
    }),
  ]),
  sec(4, "tan-en", "h-math-c-fukuso", "単位円上の点と z² + z + 1 の絶対値", "複素数 z は |z|＝1 を満たすとし、z＝cosθ + i sinθ（0≦θ＜2π）と表す。i は虚数単位とする。", [
    wr({
      id: "kyoyaku",
      u: "h-math-c-fukuso",
      d: 1,
      p: "(1) z̄＝1/z であることを示し、z + 1/z＝2cosθ を示せ。",
      model: "|z|²＝zz̄＝1 より z̄＝1/z。よって z + 1/z＝z + z̄＝(cosθ + i sinθ) + (cosθ − i sinθ)＝2cosθ。",
      rub: [
        { label: "zz̄＝|z|²＝1 から z̄＝1/z", points: 7, keywords: ["zz̄=1"] },
        { label: "z + z̄＝2cosθ", points: 7, keywords: ["2cosθ"] },
      ],
      pt: "|z|＝1 なら 1/z は共役複素数",
      st: [["共役", "zz̄＝1 より {{1/z＝z̄}}、z + z̄＝2cosθ。"]],
    }),
    wr({
      id: "zettai",
      u: "h-math-c-fukuso",
      d: 2,
      dep: "kyoyaku",
      p: "(2) |z² + z + 1| を θ を用いて表し、その最大値を求めよ。",
      model: "z² + z + 1＝z(z + 1 + 1/z)＝z(2cosθ + 1)。|z|＝1 より |z² + z + 1|＝|2cosθ + 1|。−1≦cosθ≦1 より −1≦2cosθ + 1≦3 であるから、最大値は 3（θ＝0、すなわち z＝1 のとき）。",
      rub: [
        { label: "z をくくり出して z(2cosθ + 1) と変形", points: 8, keywords: ["z(z+1+1/z)", "2cosθ+1"] },
        { label: "|z² + z + 1|＝|2cosθ + 1|、最大値 3", points: 8, keywords: ["|2cosθ+1|", "3"] },
      ],
      auto: num("3", "2*1+1", { labels: ["最大値"] }),
      pt: "z でくくると z + 1/z が現れる",
      st: [
        ["変形", "z² + z + 1＝z(z + 1 + 1/z)＝{{z(2cosθ + 1)}}。"],
        ["最大値", "|2cosθ + 1| の最大は {{3}}。", "最小が −1 だからといって最大を 1 と取り違えない。絶対値を取る。"],
      ],
    }),
    wr({
      id: "ichi",
      u: "h-math-c-fukuso",
      d: 3,
      dep: "zettai",
      p: "(3) |z² + z + 1|＝1 を満たす z をすべて求めよ。また、それらを表す点を頂点とする図形の面積を求めよ。",
      model:
        "(2) より |2cosθ + 1|＝1 ⇔ 2cosθ + 1＝±1 ⇔ cosθ＝0 または cosθ＝−1。0≦θ＜2π で θ＝π/2, π, 3π/2。よって z＝i, −1, −i。3点 i, −1, −i を頂点とする三角形は、底辺（i と −i を結ぶ線分）2、高さ 1 であるから面積 1。",
      rub: [
        { label: "|2cosθ + 1|＝1 から cosθ＝0, −1", points: 8, keywords: ["cosθ=0", "cosθ=−1"] },
        { label: "z＝i, −1, −i", points: 6, keywords: ["i", "−1", "−i"] },
        { label: "三角形の面積 1", points: 6, keywords: ["1"] },
      ],
      auto: num("1", "2*1/2", { labels: ["面積"] }),
      pt: "絶対値＝1 は中身が ±1 の2通り",
      st: [
        ["場合分け", "2cosθ + 1＝1 または −1 で {{cosθ＝0, −1}}。"],
        ["面積", "z＝i, −1, −i の三角形で {{1}}。", "2cosθ + 1＝−1 の場合を落とすと z＝−1 が抜ける。"],
      ],
    }),
  ]),
];

// =====================================================================
// 第5問　確率・整数・ベクトル
// =====================================================================

const S5: ExamPoolSection[] = [
  sec(5, "fuda-kitaichi", "h-math-a-kakuritsu", "番号札の最大値の期待値", "n を 3 以上の自然数とする。1 から n までの番号が1つずつ書かれた n 枚の札から、同時に2枚を取り出す。取り出した札の番号の大きいほうを X、小さいほうを Y とする。", [
    wr({
      id: "kakuritsu-x",
      u: "h-math-a-kakuritsu",
      d: 1,
      p: "(1) k を 2≦k≦n の整数とするとき、X＝k となる確率を n、k で表せ。",
      model: "2枚の取り出し方は全部で C(n, 2)＝n(n − 1)/2 通り。X＝k となるのは、k の札と、1 から k − 1 のうちの1枚を取り出すときで k − 1 通り。よって P(X＝k)＝(k − 1)/(n(n − 1)/2)＝2(k − 1)/(n(n − 1))。",
      rub: [
        { label: "全体 C(n,2) 通り、X＝k は k − 1 通り", points: 8, keywords: ["C(n,2)", "k−1"] },
        { label: "P(X＝k)＝2(k − 1)/(n(n − 1))", points: 6, keywords: ["2(k−1)/(n(n−1))"] },
      ],
      pt: "大きいほうを k に決めると、もう1枚は k 未満",
      st: [["数える", "もう1枚は 1〜k−1 の {{k − 1}} 通り。全体 n(n − 1)/2 で割る。"]],
    }),
    wr({
      id: "ex",
      u: "h-math-a-kakuritsu",
      d: 2,
      dep: "kakuritsu-x",
      p: "(2) X の期待値 E(X) を n の式で表せ。",
      model:
        "E(X)＝Σ[k＝2 から n] k・2(k − 1)/(n(n − 1))＝(2/(n(n − 1)))Σ[k＝1 から n] (k² − k)。Σ(k² − k)＝n(n + 1)(2n + 1)/6 − n(n + 1)/2＝n(n + 1)(n − 1)/3。よって E(X)＝(2/(n(n − 1)))・n(n + 1)(n − 1)/3＝2(n + 1)/3。",
      rub: [
        { label: "E(X)＝Σ k・P(X＝k) と立式", points: 6, keywords: ["Σ"] },
        { label: "Σ(k² − k)＝(n+1)n(n−1)/3", points: 4, keywords: ["(n+1)n(n−1)/3"] },
        { label: "E(X)＝2(n + 1)/3", points: 6, keywords: ["2(n+1)/3"] },
      ],
      auto: expr("2n/3+2/3", "E(X) ="),
      pt: "k(k−1) の和は (n+1)n(n−1)/3",
      st: [
        ["立式", "E(X)＝(2/(n(n − 1)))Σ{{k(k − 1)}}。", "k＝1 の項は 0 なので k＝1 から足してよい。"],
        ["計算", "Σk(k − 1)＝(n + 1)n(n − 1)/3 で {{2(n + 1)/3}}。"],
      ],
    }),
    wr({
      id: "sa",
      u: "h-math-a-kakuritsu",
      d: 3,
      dep: "ex",
      p: "(3) Y の期待値 E(Y) を n の式で表せ。さらに n＝10 のとき、X − Y の期待値を求めよ。",
      model:
        "札の番号 j を n + 1 − j に取りかえると、大小が入れかわる。この対応で取り出し方は1対1に対応するので、Y と n + 1 − X は同じ分布をもつ。よって E(Y)＝n + 1 − E(X)＝(n + 1)/3。E(X − Y)＝E(X) − E(Y)＝(n + 1)/3 で、n＝10 のとき 11/3。（直接 P(Y＝k)＝2(n − k)/(n(n − 1)) から計算してもよい。）",
      rub: [
        { label: "対称性（j → n+1−j）または P(Y＝k) から E(Y) を求めている", points: 8, keywords: ["n+1−X", "対称"] },
        { label: "E(Y)＝(n + 1)/3", points: 6, keywords: ["(n+1)/3"] },
        { label: "n＝10 で E(X − Y)＝11/3", points: 6, keywords: ["11/3"] },
      ],
      auto: num("11/3", "(10+1)/3", { labels: ["E(X − Y)"] }),
      pt: "番号を裏返すと大きいほうと小さいほうが入れかわる",
      st: [
        ["対称性", "Y と {{n + 1 − X}} は同じ分布。E(Y)＝(n + 1)/3。"],
        ["差の期待値", "E(X − Y)＝E(X) − E(Y)＝(n + 1)/3、n＝10 で {{11/3}}。", "期待値の差は差の期待値（線形性）。分布を作り直さなくてよい。"],
      ],
    }),
  ]),
  sec(5, "nikou-sosu", "h-math-a-yakusu", "二項係数と素数", "p を素数とする。C(p, k) は p 個から k 個を選ぶ組合せの数（二項係数）を表す。", [
    wr({
      id: "warikire",
      u: "h-math-a-yakusu",
      d: 1,
      p: "(1) 1≦k≦p − 1 のとき、C(p, k) は p で割り切れることを示せ。",
      model:
        "k・C(p, k)＝k・p!/(k!(p − k)!)＝p・(p − 1)!/((k − 1)!(p − k)!)＝p・C(p − 1, k − 1)。よって k・C(p, k) は p の倍数。1≦k≦p − 1 より k は p で割り切れず、p は素数であるから p と k は互いに素。したがって C(p, k) は p で割り切れる。",
      rub: [
        { label: "k・C(p,k)＝p・C(p−1,k−1) を示している", points: 8, keywords: ["p・C(p−1,k−1)"] },
        { label: "p と k が互いに素であることから結論", points: 6, keywords: ["互いに素"] },
      ],
      pt: "k・C(p,k)＝p・C(p−1,k−1) と互いに素",
      st: [["変形", "k・C(p, k)＝{{p・C(p − 1, k − 1)}}。p は素数で k と互いに素。", "「分子に p があるから」だけでは不十分。分母で約分されないことを言う。"]],
    }),
    wr({
      id: "fermat",
      u: "h-math-a-yakusu",
      d: 2,
      dep: "warikire",
      p: "(2) 2^p − 2 は p で割り切れることを示せ。",
      model: "二項定理より 2^p＝(1 + 1)^p＝Σ[k＝0 から p] C(p, k)＝1 + Σ[k＝1 から p−1] C(p, k) + 1。よって 2^p − 2＝Σ[k＝1 から p−1] C(p, k) で、(1) より各項は p で割り切れるから、2^p − 2 は p で割り切れる。",
      rub: [
        { label: "二項定理で 2^p＝Σ C(p,k)", points: 8, keywords: ["二項定理", "(1+1)^p"] },
        { label: "両端の 1 を除いた和が p の倍数であることを (1) で示す", points: 8, keywords: ["(1)"] },
      ],
      pt: "2＝1＋1 として二項定理",
      st: [["二項定理", "2^p − 2＝{{Σ[k＝1 から p−1] C(p, k)}}、各項が p の倍数。"]],
    }),
    wr({
      id: "p3",
      u: "h-math-a-yakusu",
      d: 3,
      dep: "fermat",
      p: "(3) 2^p + 1 が p で割り切れるような素数 p をすべて求めよ。",
      model:
        "2^p + 1 が p で割り切れるとすると、(2) より 2^p − 2 も p で割り切れるので、差 (2^p + 1) − (2^p − 2)＝3 も p で割り切れる。p は素数であるから p＝3。逆に p＝3 のとき 2³ + 1＝9 は 3 で割り切れる。よって p＝3。",
      rub: [
        { label: "差をとって 3 が p で割り切れることを導く", points: 10, keywords: ["差", "3"] },
        { label: "逆の確認（p＝3 で成り立つ）", points: 4, keywords: ["9"] },
        { label: "答え p＝3", points: 6, keywords: ["p=3"] },
      ],
      auto: num("3", "3", { labels: ["p ="] }),
      pt: "2つの倍数の差も倍数",
      st: [
        ["差をとる", "(2^p + 1) − (2^p − 2)＝{{3}} が p の倍数。"],
        ["逆の確認", "p＝3 で 9 は 3 の倍数なので {{p＝3}}。", "必要条件だけで終わらず、実際に成り立つか確かめる。"],
      ],
    }),
  ]),
  sec(5, "kyumen", "h-math-c-kukan", "空間の直線と球面の交わり", "座標空間に点 A(1, 2, 0) と、A を通り方向ベクトル d→＝(1, 0, 1) をもつ直線 ℓ がある。ℓ 上の点 P を OP→＝OA→ + t d→（t は実数）と表す。O は原点とする。", [
    wr({
      id: "op2",
      u: "h-math-c-kukan",
      d: 1,
      p: "(1) |OP→|² を t の式で表せ。",
      model: "OP→＝(1 + t, 2, t) であるから、|OP→|²＝(1 + t)² + 2² + t²＝2t² + 2t + 5。",
      rub: [
        { label: "OP→＝(1 + t, 2, t)", points: 6, keywords: ["(1+t,2,t)"] },
        { label: "|OP→|²＝2t² + 2t + 5", points: 8, keywords: ["2t²+2t+5"] },
      ],
      auto: expr("2t^2+2t+5", "|OP→|² ="),
      pt: "成分で書いて2乗の和",
      st: [["成分", "OP→＝(1 + t, 2, t) で {{2t² + 2t + 5}}。"]],
    }),
    wr({
      id: "kyori",
      u: "h-math-c-kukan",
      d: 2,
      dep: "op2",
      p: "(2) 原点 O と直線 ℓ の距離を求めよ。また、そのときの P は OP→⊥d→ を満たすことを確かめよ。",
      model:
        "|OP→|²＝2(t + 1/2)² + 9/2 は t＝−1/2 で最小値 9/2 をとる。よって距離は √(9/2)＝3√2/2。このとき OP→＝(1/2, 2, −1/2) で、OP→・d→＝1/2 + 0 − 1/2＝0 であるから OP→⊥d→。",
      rub: [
        { label: "平方完成で t＝−1/2 のとき最小値 9/2", points: 6, keywords: ["t=−1/2", "9/2"] },
        { label: "距離 3√2/2", points: 6, keywords: ["3√2/2"] },
        { label: "OP→・d→＝0 を確認", points: 4, keywords: ["OP→・d→=0"] },
      ],
      auto: surd("3√2/2", "2*x^2=9", { labels: ["距離"] }),
      pt: "距離は |OP→|² の最小値の平方根",
      st: [
        ["平方完成", "2(t + 1/2)² + 9/2 で、{{t＝−1/2}} のとき最小。"],
        ["距離", "√(9/2)＝{{3√2/2}}。", "最小値 9/2 をそのまま距離にしない。平方根をとる。"],
      ],
    }),
    wr({
      id: "gen",
      u: "h-math-c-kukan",
      d: 3,
      dep: "kyori",
      p: "(3) 原点を中心とする半径 √7 の球面と ℓ は2点で交わる。その2つの交点を結ぶ線分の長さを求めよ。",
      model:
        "交点では |OP→|²＝7 であるから 2t² + 2t + 5＝7、すなわち t² + t − 1＝0。この2解を t₁、t₂ とすると t₁ + t₂＝−1、t₁t₂＝−1 より (t₁ − t₂)²＝(t₁ + t₂)² − 4t₁t₂＝5。2つの交点を結ぶ線分の長さは |t₁ − t₂|・|d→|＝√5・√2＝√10。（(2) から、半径 √7 と距離 3√2/2 で三平方の定理を使い、2√(7 − 9/2)＝√10 としてもよい。）",
      rub: [
        { label: "2t² + 2t + 5＝7 から t² + t − 1＝0", points: 6, keywords: ["t²+t−1=0"] },
        { label: "線分の長さ＝|t₁ − t₂|・|d→| と立式（または三平方の定理）", points: 8, keywords: ["|d→|", "√2"] },
        { label: "長さ √10", points: 6, keywords: ["√10"] },
      ],
      auto: surd("√10", "x^2=10", { labels: ["長さ"] }),
      pt: "パラメータの差に方向ベクトルの大きさをかける",
      st: [
        ["交点の条件", "2t² + 2t + 5＝7 ⇔ {{t² + t − 1＝0}}、(t₁ − t₂)²＝5。"],
        ["長さ", "√5・|d→|＝√5・√2＝{{√10}}。", "|t₁ − t₂| だけを答えにしない。d→ は単位ベクトルではない。"],
      ],
    }),
  ]),
];

export const U_HANDAI_SUGAKU_RI: UnivExam = {
  key: KEY,
  univ: "大阪大学",
  kamoku: "数学（理系）",
  tier: "国公立",
  order: 232,
  basis: "一般選抜 個別学力検査（理学部・工学部・基礎工学部・医学部などの理系学部共通の数学）の傾向を参考",
  format: "150分・大問5題のすべて記述式。極限・微分・積分（回転体・曲線の長さ）を中心に、複素数平面・確率・整数・ベクトル。",
  minutes: 150,
  groups: ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学Ⅲ", "数学C"],
  sections: [
    { title: "第1問　極限", lead: LEAD, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 50, prefer: "material", poolTag: TAG(1) },
    { title: "第2問　微分法の応用", lead: LEAD, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 50, prefer: "material", poolTag: TAG(2) },
    { title: "第3問　積分法の応用", lead: LEAD, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 50, prefer: "material", poolTag: TAG(3) },
    { title: "第4問　複素数平面", lead: LEAD, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 50, prefer: "material", poolTag: TAG(4) },
    { title: "第5問　確率・整数・ベクトル", lead: LEAD, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 50, prefer: "material", poolTag: TAG(5) },
  ],
  pool: [...S1, ...S2, ...S3, ...S4, ...S5],
};
