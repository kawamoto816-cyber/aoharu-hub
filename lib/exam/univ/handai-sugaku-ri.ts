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
  sec(1, "kisu-guusu", "h-math-3-kyokugen", "奇数と偶数の積の比と、帰納法で示す不等式", "自然数 n に対して aₙ＝(1・3・5・…・(2n − 1))/(2・4・6・…・(2n)) とおく。たとえば a₁＝1/2、a₂＝(1・3)/(2・4)＝3/8 である。log は自然対数とする。", [
    wr({
      id: "zenka",
      u: "h-math-b-zenka",
      d: 1,
      p: "(1) aₙ₊₁ を aₙ と n で表せ。また a₃ の値を求めよ。",
      model: "aₙ₊₁ は aₙ の分子に 2n + 1、分母に 2n + 2 をかけたものであるから、aₙ₊₁＝((2n + 1)/(2n + 2))aₙ。よって a₃＝(5/6)a₂＝(5/6)・(3/8)＝5/16。",
      rub: [
        { label: "aₙ₊₁＝((2n + 1)/(2n + 2))aₙ", points: 8, keywords: ["(2n+1)/(2n+2)"] },
        { label: "a₃＝5/16", points: 6, keywords: ["5/16"] },
      ],
      auto: num("5/16", "(1*3*5)/(2*4*6)", { labels: ["a₃ ="] }),
      pt: "次の項は分子に 2n+1、分母に 2n+2 が増える",
      st: [["比", "aₙ₊₁/aₙ＝{{(2n + 1)/(2n + 2)}}。a₃＝(3/8)・(5/6)＝5/16。", "2n + 1 と 2n + 2 は「n + 1 番目」の奇数と偶数。2n − 1 と取り違えない。"]],
    }),
    wr({
      id: "futoshiki",
      u: "h-math-b-kino",
      d: 2,
      dep: "zenka",
      p: "(2) すべての自然数 n について、1/(2√n)≦aₙ≦1/√(3n + 1) が成り立つことを、数学的帰納法で示せ。",
      model:
        "n＝1 のとき a₁＝1/2、1/(2√1)＝1/2、1/√4＝1/2 で成り立つ。n＝k で成り立つと仮定する。【右側】aₖ₊₁＝((2k + 1)/(2k + 2))aₖ≦(2k + 1)/((2k + 2)√(3k + 1))。これが 1/√(3k + 4) 以下であることは (2k + 1)²(3k + 4)≦(2k + 2)²(3k + 1) と同値で、右辺 − 左辺＝(12k³ + 28k² + 20k + 4) − (12k³ + 28k² + 19k + 4)＝k＞0 より正しい。【左側】aₖ₊₁≧(2k + 1)/((2k + 2)・2√k)。これが 1/(2√(k + 1)) 以上であることは (2k + 1)²(k + 1)≧(2k + 2)²k と同値で、左辺 − 右辺＝(4k³ + 8k² + 5k + 1) − (4k³ + 8k² + 4k)＝k + 1＞0 より正しい。よって n＝k + 1 でも成り立ち、すべての n で成り立つ。",
      rub: [
        { label: "n＝1 の確認と、(1) の関係式を使った帰納法の組み立て", points: 4, keywords: ["帰納法", "n=1"] },
        { label: "右側：(2k+1)²(3k+4)≦(2k+2)²(3k+1)（差が k）を示している", points: 6, keywords: ["3k+4", "差"] },
        { label: "左側：(2k+1)²(k+1)≧(2k+2)²k（差が k+1）を示している", points: 6, keywords: ["k+1"] },
      ],
      pt: "根号どうしの比較は両辺を2乗して多項式の差",
      st: [
        ["帰納法の形", "aₖ₊₁＝((2k + 1)/(2k + 2))aₖ に仮定を代入し、{{1/√(3k + 4)}} 以下、1/(2√(k + 1)) 以上を示す。"],
        ["2乗して比べる", "(2k + 2)²(3k + 1) − (2k + 1)²(3k + 4)＝{{k}}、(2k + 1)²(k + 1) − (2k + 2)²k＝k + 1。", "示したい形 1/√(3(k+1)+1)＝1/√(3k+4) を先に書いておくと、目標がぶれない。"],
      ],
    }),
    wr({
      id: "lim-log",
      u: "h-math-3-kyokugen",
      d: 3,
      dep: "futoshiki",
      p: "(3) lim[n→∞] aₙ を求めよ。さらに、極限 lim[n→∞] (log aₙ)/(log n) を求めよ。",
      model:
        "(2) より 0＜aₙ≦1/√(3n + 1)→0 であるから、はさみうちの原理で lim aₙ＝0。次に (2) の各辺の対数をとると −log 2 − (1/2)log n≦log aₙ≦−(1/2)log(3n + 1)。n≧2 で log n＞0 であるから、log n で割って −(log 2)/(log n) − 1/2≦(log aₙ)/(log n)≦−(1/2)・log(3n + 1)/(log n)。ここで log(3n + 1)/(log n)＝(log n + log(3 + 1/n))/(log n)＝1 + log(3 + 1/n)/(log n)→1、(log 2)/(log n)→0 であるから、両端はともに −1/2 に近づく。はさみうちの原理により lim (log aₙ)/(log n)＝−1/2。",
      rub: [
        { label: "lim aₙ＝0 をはさみうちで示している", points: 5, keywords: ["0", "はさみうち"] },
        { label: "(2) の対数をとり log n で割った不等式", points: 7, keywords: ["log 2", "log(3n+1)"] },
        { label: "log(3n+1)/log n→1 を示し、極限 −1/2", points: 8, keywords: ["−1/2"] },
      ],
      auto: num("-1/2", "-1/2", { labels: ["極限値"] }),
      pt: "aₙ はおよそ n^(−1/2) の速さで 0 に近づく",
      st: [
        ["対数をとる", "{{−log 2 − (1/2)log n≦log aₙ≦−(1/2)log(3n + 1)}}。"],
        ["はさみうち", "log(3n + 1)/log n＝1 + log(3 + 1/n)/log n→1 で、{{−1/2}}。", "log n で割るとき、n≧2 で log n＞0 なので不等号の向きは変わらない。"],
      ],
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
  sec(2, "teisekibun-kansu", "h-math-3-bibun-oyo", "定積分で表された関数の最大・最小", "0≦x≦2π で定義された関数 F(x)＝∫₀ˣ eᵗ sin t dt を考える。e は自然対数の底とする。", [
    wr({
      id: "zogen",
      u: "h-math-3-sekibun",
      d: 1,
      p: "(1) F′(x) を求め、F(x) の増減を調べよ。",
      model: "微分積分学の基本定理より F′(x)＝eˣ sin x。eˣ＞0 であるから、F′(x) の符号は sin x の符号と同じ。0＜x＜π で F′(x)＞0、π＜x＜2π で F′(x)＜0。よって F(x) は 0≦x≦π で増加し、π≦x≦2π で減少する。",
      rub: [
        { label: "F′(x)＝eˣ sin x（積分の上端で微分）", points: 6, keywords: ["eˣ sin x", "基本定理"] },
        { label: "sin x の符号から、[0, π] で増加・[π, 2π] で減少", points: 8, keywords: ["増加", "減少", "π"] },
      ],
      pt: "d/dx ∫₀ˣ f(t) dt＝f(x)",
      st: [["微分", "F′(x)＝{{eˣ sin x}}。eˣ＞0 なので sin x の符号で決まる。", "F(x) を先に計算しなくても、増減は F′ だけでわかる。"]],
    }),
    wr({
      id: "keisan",
      u: "h-math-3-sekibun",
      d: 2,
      dep: "zogen",
      p: "(2) F(x) を x の式で表せ（積分記号を使わずに）。",
      model:
        "I＝∫eᵗ sin t dt とおく。部分積分を2回行うと I＝eᵗ sin t − ∫eᵗ cos t dt＝eᵗ sin t − (eᵗ cos t + ∫eᵗ sin t dt)＝eᵗ(sin t − cos t) − I。よって I＝(1/2)eᵗ(sin t − cos t) + C。したがって F(x)＝[(1/2)eᵗ(sin t − cos t)]₀ˣ＝(1/2)eˣ(sin x − cos x) − (1/2)(0 − 1)＝(eˣ(sin x − cos x) + 1)/2。",
      rub: [
        { label: "部分積分を2回して同じ積分が現れる形にしている", points: 6, keywords: ["部分積分", "2回"] },
        { label: "原始関数 (1/2)eᵗ(sin t − cos t)", points: 5, keywords: ["(1/2)eᵗ(sin t−cos t)"] },
        { label: "F(x)＝(eˣ(sin x − cos x) + 1)/2", points: 5, keywords: ["+1)/2"] },
      ],
      pt: "eᵗ sin t は部分積分2回で元の積分が戻る",
      st: [
        ["部分積分2回", "I＝eᵗ(sin t − cos t) − I で {{I＝(1/2)eᵗ(sin t − cos t)}}。"],
        ["代入", "t＝0 での値は (1/2)(0 − 1)＝−1/2 なので、F(x)＝{{(eˣ(sin x − cos x) + 1)/2}}。", "下端 t＝0 の値 −1/2 を引くと +1/2 になる。符号に注意。"],
      ],
    }),
    wr({
      id: "saidai-saisho",
      u: "h-math-3-bibun-oyo",
      d: 3,
      dep: "keisan",
      p: "(3) F(x)（0≦x≦2π）の最大値と最小値、およびそのときの x の値を求めよ。",
      model:
        "(1) より F(x) は x＝π で最大となり、最大値は F(π)＝(e^π(0 − (−1)) + 1)/2＝(e^π + 1)/2。最小値の候補は両端 F(0)＝0 と F(2π)＝(e^(2π)(0 − 1) + 1)/2＝(1 − e^(2π))/2。e^(2π)＞1 より F(2π)＜0＝F(0) であるから、最小値は (1 − e^(2π))/2（x＝2π）。",
      rub: [
        { label: "x＝π で最大値 (e^π + 1)/2", points: 7, keywords: ["(e^π+1)/2"] },
        { label: "両端 F(0)＝0、F(2π) を比べている", points: 6, keywords: ["F(0)", "F(2π)"] },
        { label: "x＝2π で最小値 (1 − e^(2π))/2", points: 7, keywords: ["(1−e^(2π))/2"] },
      ],
      pt: "減少区間の終わりの端点と F(0) を比べる",
      st: [
        ["最大", "増加から減少に変わる {{x＝π}} で最大、(e^π + 1)/2。"],
        ["最小", "端の値 F(0)＝0 と F(2π)＝{{(1 − e^(2π))/2}} を比べる。", "π から 2π で減る量 (e^(2π) + e^π)/2 は、0 から π で増えた量より大きい。F(0)＝0 を最小と決めつけない。"],
      ],
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
  sec(3, "lissajous", "h-math-3-sekibun-oyo", "媒介変数表示の曲線と面積・回転体", "座標平面上の曲線 C が、媒介変数 t（0≦t≦π/2）を用いて x＝sin t、y＝sin 2t と表されている。C と x 軸で囲まれた部分を D とする。", [
    wr({
      id: "gaikei",
      u: "h-math-c-baikai",
      d: 1,
      p: "(1) y を x の式で表せ。また、y の最大値とそのときの点の座標を求めよ。",
      model: "0≦t≦π/2 で cos t≧0 であるから cos t＝√(1 − sin²t)＝√(1 − x²)。よって y＝2sin t cos t＝2x√(1 − x²)（0≦x≦1）。y＝sin 2t は 2t＝π/2、すなわち t＝π/4 で最大値 1 をとり、そのとき x＝sin(π/4)＝√2/2。よって最大値 1、点 (√2/2, 1)。",
      rub: [
        { label: "cos t≧0 に注意して y＝2x√(1 − x²)", points: 7, keywords: ["2x√(1−x²)", "cos t≧0"] },
        { label: "t＝π/4 で最大値 1、点 (√2/2, 1)", points: 7, keywords: ["π/4", "(√2/2, 1)"] },
      ],
      pt: "2倍角で y＝2 sin t cos t、cos t は根号で",
      st: [["消去", "y＝2sin t cos t＝{{2x√(1 − x²)}}。最大は t＝π/4 で (√2/2, 1)。", "cos t＝±√(1 − x²) の符号は、t の範囲 0≦t≦π/2 から + に決まる。"]],
    }),
    wr({
      id: "menseki",
      u: "h-math-3-sekibun-oyo",
      d: 2,
      dep: "gaikei",
      p: "(2) D の面積 S を求めよ。",
      model:
        "t：0→π/2 のとき x＝sin t は 0→1 と単調に増加し、y≧0。よって S＝∫₀¹ y dx＝∫₀^(π/2) sin 2t・cos t dt＝∫₀^(π/2) 2sin t cos²t dt。u＝cos t とおくと du＝−sin t dt で、S＝∫₁⁰ 2u²(−du)＝∫₀¹ 2u² du＝2/3。",
      rub: [
        { label: "S＝∫₀^(π/2) y (dx/dt) dt と置換して立式", points: 6, keywords: ["dx/dt", "cos t"] },
        { label: "2sin t cos²t を cos t の置換で積分", points: 4, keywords: ["cos²t"] },
        { label: "S＝2/3", points: 6, keywords: ["2/3"] },
      ],
      auto: num("2/3", "2/3", { labels: ["S ="] }),
      pt: "∫y dx は dx＝cos t dt で t の積分に",
      st: [
        ["置換", "S＝∫₀^(π/2) sin 2t・{{cos t}} dt＝∫₀^(π/2) 2sin t cos²t dt。"],
        ["計算", "[−(2/3)cos³t]₀^(π/2)＝{{2/3}}。", "dx/dt＝cos t をかけ忘れて ∫sin 2t dt＝1 としない。"],
      ],
    }),
    wr({
      id: "taiseki",
      u: "h-math-3-sekibun-oyo",
      d: 3,
      dep: "menseki",
      p: "(3) D を x 軸のまわりに1回転してできる立体の体積 V を求めよ。",
      model:
        "V＝π∫₀¹ y² dx＝π∫₀^(π/2) sin²2t・cos t dt＝π∫₀^(π/2) 4sin²t cos²t・cos t dt＝4π∫₀^(π/2) sin²t(1 − sin²t)cos t dt。s＝sin t とおくと ds＝cos t dt、s：0→1 で、V＝4π∫₀¹ (s² − s⁴) ds＝4π(1/3 − 1/5)＝8π/15。（(1) の y＝2x√(1 − x²) から V＝π∫₀¹ 4x²(1 − x²) dx としても同じ。）",
      rub: [
        { label: "V＝π∫ y² dx を t の積分（または x の積分）に直して立式", points: 8, keywords: ["π∫", "y²"] },
        { label: "sin t の置換で ∫₀¹ (s² − s⁴) ds に帰着", points: 6, keywords: ["s²−s⁴"] },
        { label: "V＝8π/15", points: 6, keywords: ["8π/15"] },
      ],
      pt: "y² dx＝4sin²t cos²t・cos t dt は sin t で置換",
      st: [
        ["立式", "V＝π∫₀^(π/2) sin²2t・cos t dt＝{{4π∫₀¹ (s² − s⁴) ds}}。"],
        ["計算", "4π(1/3 − 1/5)＝{{8π/15}}。", "(1) の式を使えば y²＝4x²(1 − x²) で、根号が消えてすぐ積分できる。"],
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
  sec(4, "juushin-suisen", "h-math-c-fukuso", "単位円に内接する三角形の重心・外心と z₁ + z₂ + z₃", "複素数平面上で、原点 O を中心とする半径 1 の円 |z|＝1 の上に、異なる3点 A(z₁)、B(z₂)、C(z₃) をとる。三角形 ABC の外心は O である。三角形 ABC の重心を G(g) とし、h＝z₁ + z₂ + z₃ で定まる点を H(h) とする。i は虚数単位とし、z の共役複素数を z̄ で表す。", [
    wr({
      id: "suisen",
      u: "h-math-c-fukuso",
      d: 1,
      p: "(1) g を z₁、z₂、z₃ で表せ。また、(h − z₁)/(z₂ − z₃) は純虚数または 0 であることを示し、H が三角形 ABC の垂心であることを説明せよ。",
      model:
        "g＝(z₁ + z₂ + z₃)/3。|zₖ|＝1 より z̄ₖ＝1/zₖ（k＝1, 2, 3）。w＝(h − z₁)/(z₂ − z₃)＝(z₂ + z₃)/(z₂ − z₃) とおくと、w̄＝(1/z₂ + 1/z₃)/(1/z₂ − 1/z₃)＝(z₃ + z₂)/(z₃ − z₂)＝−w。よって w + w̄＝0 で、w の実部は 0、すなわち w は純虚数または 0。w が純虚数のとき AH⊥BC、w＝0 のとき H＝A である。同様に (h − z₂)/(z₃ − z₁) も純虚数または 0 だから BH⊥CA（または H＝B）。H は A を通り BC に垂直な直線と、B を通り CA に垂直な直線の上にあるので、H は三角形 ABC の垂心である。",
      rub: [
        { label: "g＝(z₁ + z₂ + z₃)/3 と z̄ₖ＝1/zₖ", points: 4, keywords: ["1/z", "(z₁+z₂+z₃)/3"] },
        { label: "w̄＝−w を示し、純虚数または 0 と結論", points: 6, keywords: ["w̄=−w", "純虚数"] },
        { label: "AH⊥BC・BH⊥CA から H が垂心と説明", points: 4, keywords: ["垂心", "⊥"] },
      ],
      pt: "|z|＝1 なら z̄＝1/z。w̄＝−w なら純虚数か 0",
      st: [
        ["共役", "w＝(z₂ + z₃)/(z₂ − z₃) の共役は z̄ₖ＝1/zₖ を入れて {{w̄＝−w}}。"],
        ["垂直", "純虚数 ⇔ 2つのベクトル AH→ と CB→ が {{垂直}}。2組で垂心。", "w＝0（H＝A）の場合もあるので「純虚数または 0」と書く。"],
      ],
    }),
    wr({
      id: "kousiki",
      u: "h-math-c-fukuso",
      d: 2,
      dep: "suisen",
      p: "(2) |h|²＝9 − (AB² + BC² + CA²) が成り立つことを示せ。また、AB² + BC² + CA²≦9 であり、等号が成り立つのは G が外心 O と一致するときに限ることを示せ。",
      model:
        "|zₖ|²＝1 を用いる。|h|²＝(z₁ + z₂ + z₃)(z̄₁ + z̄₂ + z̄₃)＝3 + (z₁z̄₂ + z̄₁z₂) + (z₂z̄₃ + z̄₂z₃) + (z₃z̄₁ + z̄₃z₁)。一方 AB²＝|z₁ − z₂|²＝2 − (z₁z̄₂ + z̄₁z₂)、BC²＝2 − (z₂z̄₃ + z̄₂z₃)、CA²＝2 − (z₃z̄₁ + z̄₃z₁)。辺々たして |h|² + AB² + BC² + CA²＝3 + 6＝9。よって |h|²＝9 − (AB² + BC² + CA²)。|h|²≧0 より AB² + BC² + CA²≦9 で、等号は h＝0、すなわち g＝h/3＝0（G＝O）のときに限る。",
      rub: [
        { label: "|h|² を z₁z̄₂ + z̄₁z₂ などで展開", points: 5, keywords: ["z₁z̄₂", "展開"] },
        { label: "AB²＝2 − (z₁z̄₂ + z̄₁z₂) など3辺を表し、和が 9 になることを示す", points: 7, keywords: ["2−", "9"] },
        { label: "|h|²≧0 から不等式、等号 ⇔ h＝0 ⇔ G＝O", points: 4, keywords: ["h=0", "G=O"] },
      ],
      pt: "|α|²＝αᾱ で展開し、交差項を3辺の長さで消す",
      st: [
        ["展開", "|h|²＝3 + Σ(zⱼz̄ₖ + z̄ⱼzₖ)、各辺は {{2 − (zⱼz̄ₖ + z̄ⱼzₖ)}}。"],
        ["和", "{{|h|² + AB² + BC² + CA²＝9}}。等号は h＝0 ⇔ g＝0。", "|z₁ − z₂|² を |z₁|² − |z₂|² のように展開しない。交差項が残る。"],
      ],
    }),
    wr({
      id: "saidai",
      u: "h-math-c-fukuso",
      d: 3,
      dep: "kousiki",
      p: "(3) z₁＝1、z₂＝i とし、点 C(z₃) が円 |z|＝1 上の A、B 以外の点を動くとする。|g| の最大値と、そのときの z₃ を求めよ。また、そのときの AB² + BC² + CA² の値を求めよ。",
      model:
        "g＝(1 + i + z₃)/3 だから、G は中心 (1 + i)/3、半径 1/3 の円の上（A、B に対応する 2 点を除く）を動く。|g|≦|(1 + i)/3| + |z₃/3|＝√2/3 + 1/3 で、等号は z₃ が 1 + i と同じ向き、すなわち z₃＝(1 + i)/√2 のとき成り立つ（この点は A、B と異なる）。よって |g| の最大値は (1 + √2)/3（z₃＝(1 + i)/√2＝(√2/2)(1 + i)）。このとき |h|＝3|g|＝1 + √2 で、(2) より AB² + BC² + CA²＝9 − (1 + √2)²＝9 − (3 + 2√2)＝6 − 2√2。",
      rub: [
        { label: "g＝(1 + i + z₃)/3 と G の動く円（または三角不等式）", points: 6, keywords: ["(1+i)/3", "1/3"] },
        { label: "最大値 (1 + √2)/3 と z₃＝(1 + i)/√2（A、B と異なることも確認）", points: 8, keywords: ["(1+√2)/3", "(1+i)/√2"] },
        { label: "(2) を用いて AB² + BC² + CA²＝6 − 2√2", points: 6, keywords: ["6−2√2"] },
      ],
      auto: surd("(1+√2)/3", "9*x^2-6*x-1=0", { labels: ["最大値"] }),
      pt: "|α + β|≦|α| + |β|、等号は同じ向き",
      st: [
        ["G の動き", "g＝{{(1 + i)/3 + z₃/3}}：中心 (1 + i)/3、半径 1/3 の円。"],
        ["最大", "原点から中心まで √2/3、足して {{(1 + √2)/3}}、z₃＝{{(1 + i)/√2}}。", "等号が成り立つ z₃ が A、B と重ならないか確かめる。"],
        ["辺の2乗和", "|h|²＝(1 + √2)²＝3 + 2√2 より {{6 − 2√2}}。"],
      ],
    }),
  ]),
  sec(4, "nijou-houbutsusen", "h-math-c-fukuso", "直線上の点の2乗が描く放物線", "複素数平面上で、点 z が直線 Re z＝1（実部が 1 の点全体）の上を動くとき、w＝z² で定まる点 w を考える。z＝1 + ti（t は実数）と表し、w＝u + vi（u, v は実数）とおく。i は虚数単位とする。", [
    wr({
      id: "seibun",
      u: "h-math-c-fukuso",
      d: 1,
      p: "(1) u、v を t で表せ。また、t＝2 のときの w を求めよ。",
      model: "w＝(1 + ti)²＝1 + 2ti + t²i²＝(1 − t²) + 2ti。よって u＝1 − t²、v＝2t。t＝2 のとき w＝−3 + 4i。",
      rub: [
        { label: "u＝1 − t²、v＝2t", points: 8, keywords: ["1−t²", "2t"] },
        { label: "t＝2 のとき w＝−3 + 4i", points: 6, keywords: ["−3+4i"] },
      ],
      pt: "i²＝−1 で実部と虚部に分ける",
      st: [["展開", "(1 + ti)²＝{{(1 − t²) + 2ti}}。", "t²i²＝−t² の符号を落として 1 + t² としない。"]],
    }),
    wr({
      id: "houbutsusen",
      u: "h-math-c-nijikyokusen",
      d: 2,
      dep: "seibun",
      p: "(2) 点 w が描く図形の方程式を u、v で表せ。また、w が描く図形上のすべての点で |w|＝2 − u が成り立つことを示し、この図形が原点を焦点とする放物線であることを説明せよ。",
      model:
        "(1) より t＝v/2 を u＝1 − t² に代入して u＝1 − v²/4。t がすべての実数を動くと v＝2t もすべての実数を動くので、w はこの放物線全体を描く。また |w|＝|z|²＝1 + t²、2 − u＝2 − (1 − t²)＝1 + t² であるから |w|＝2 − u。左辺は点 w と原点の距離、右辺は点 w と直線 u＝2（Re w＝2）の距離（u≦1＜2 より 2 − u＞0）であるから、w の描く図形は原点を焦点、直線 Re w＝2 を準線とする放物線である。",
      rub: [
        { label: "t を消去して u＝1 − v²/4（全体を描くことも述べる）", points: 6, keywords: ["u=1−v²/4"] },
        { label: "|w|＝|z|²＝1 + t² と 2 − u＝1 + t² から |w|＝2 − u", points: 6, keywords: ["|z|²", "1+t²"] },
        { label: "焦点（原点）と準線（Re w＝2）までの距離が等しいと説明", points: 4, keywords: ["焦点", "準線"] },
      ],
      pt: "|z²|＝|z|² を使うと距離の関係がすぐ出る",
      st: [
        ["消去", "t＝v/2 で {{u＝1 − v²/4}}。"],
        ["焦点と準線", "|w|＝|z|²＝1 + t²＝2 − u。原点までの距離＝直線 {{Re w＝2}} までの距離。", "放物線 v²＝−4(u − 1) の焦点は頂点 (1, 0) から左へ 1 の原点。"],
      ],
    }),
    wr({
      id: "menseki",
      u: "h-math-2-sekibun",
      d: 3,
      dep: "houbutsusen",
      p: "(3) w が描く放物線と虚軸で囲まれた部分の面積を求めよ。",
      model:
        "放物線 u＝1 − v²/4 と虚軸 u＝0 の交点は v²＝4 より v＝±2。−2≦v≦2 で 1 − v²/4≧0 であるから、面積は ∫₋₂² (1 − v²/4) dv＝2∫₀² (1 − v²/4) dv＝2[v − v³/12]₀²＝2(2 − 2/3)＝8/3。（z の言葉では、−1≦t≦1 に対応する部分である。）",
      rub: [
        { label: "虚軸との交点 v＝±2 を求めている", points: 6, keywords: ["±2", "2i"] },
        { label: "v を変数とした積分 ∫₋₂² (1 − v²/4) dv で立式", points: 8, keywords: ["∫", "1−v²/4"] },
        { label: "面積 8/3", points: 6, keywords: ["8/3"] },
      ],
      auto: num("8/3", "2*(2-8/12)", { labels: ["面積"] }),
      pt: "横向きの放物線は v で積分する",
      st: [
        ["交点", "u＝0 として {{v＝±2}}（点 ±2i）。"],
        ["積分", "∫₋₂² (1 − v²/4) dv＝{{8/3}}。", "u を変数にして積分すると根号が出て面倒。v で積分すれば多項式で済む。"],
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
  sec(5, "tama-kitaichi", "h-math-a-kakuritsu", "玉の色を変える操作と期待値の漸化式", "袋の中に、赤玉と白玉が合わせて 3 個入っている。最初は赤玉が 1 個、白玉が 2 個である。袋から玉を1個無作為に取り出し、赤玉なら白玉に、白玉なら赤玉に取りかえて袋に戻す。この操作を n 回くり返したあとの袋の中の赤玉の個数を Xₙ とし、その期待値を Eₙ とする（X₀＝1、E₀＝1）。", [
    wr({
      id: "x2",
      u: "h-math-a-kakuritsu",
      d: 1,
      p: "(1) X₁ の確率分布を求めよ。また、X₂＝3 となる確率を求めよ。",
      model:
        "1回目に赤玉を取り出す確率は 1/3 で、このとき X₁＝0。白玉を取り出す確率は 2/3 で、このとき X₁＝2。よって P(X₁＝0)＝1/3、P(X₁＝2)＝2/3。X₂＝3 となるのは、X₁＝2 で2回目に白玉（残り 1 個）を取り出すときであるから、P(X₂＝3)＝(2/3)・(1/3)＝2/9。",
      rub: [
        { label: "P(X₁＝0)＝1/3、P(X₁＝2)＝2/3", points: 6, keywords: ["1/3", "2/3"] },
        { label: "X₂＝3 は「X₁＝2 のあと白玉」と見て 2/9", points: 8, keywords: ["2/9"] },
      ],
      auto: num("2/9", "(2/3)*(1/3)", { labels: ["P(X₂＝3)"] }),
      pt: "赤玉の個数は1回ごとに必ず ±1 変わる",
      st: [["推移", "X₁＝0（確率 1/3）か 2（確率 2/3）。X₁＝2 から白玉 1/3 で {{2/9}}。", "X₁＝0 からは必ず赤が増えて 1 になる。X₂＝3 には行けない。"]],
    }),
    wr({
      id: "zenka",
      u: "h-math-b-zenka",
      d: 2,
      dep: "x2",
      p: "(2) Eₙ₊₁＝(1/3)Eₙ + 1 が成り立つことを示せ。",
      model:
        "Xₙ＝k（k＝0, 1, 2, 3）のとき、次の操作で赤玉を取り出す確率は k/3 で赤玉は 1 個減り、白玉を取り出す確率は (3 − k)/3 で 1 個増える。よって Xₙ＝k のときの Xₙ₊₁ の期待値は (k − 1)・k/3 + (k + 1)・(3 − k)/3＝(k² − k + 3k + 3 − k² − k)/3＝(k + 3)/3＝k/3 + 1。したがって Eₙ₊₁＝Σ[k＝0 から 3] P(Xₙ＝k)(k/3 + 1)＝(1/3)Σ k P(Xₙ＝k) + Σ P(Xₙ＝k)＝(1/3)Eₙ + 1。",
      rub: [
        { label: "Xₙ＝k のときの Xₙ₊₁ の期待値が k/3 + 1 であることを計算", points: 8, keywords: ["k/3", "(3−k)/3"] },
        { label: "Xₙ の値で場合分けして足し、Σ P(Xₙ＝k)＝1 を使って結論", points: 8, keywords: ["ΣP", "=1"] },
      ],
      pt: "直前の個数 k ごとに次の期待値を出して足す",
      st: [
        ["条件つきの期待値", "Xₙ＝k なら次は (k − 1)・k/3 + (k + 1)・(3 − k)/3＝{{k/3 + 1}}。"],
        ["足し合わせる", "Σ P(Xₙ＝k)(k/3 + 1)＝{{(1/3)Eₙ + 1}}。", "分布 P(Xₙ＝k) を全部求める必要はない。k の1次式になることが鍵。"],
      ],
    }),
    wr({
      id: "ippan",
      u: "h-math-b-zenka",
      d: 3,
      dep: "zenka",
      p: "(3) Eₙ を n の式で表し、E₃ の値と lim[n→∞] Eₙ を求めよ。",
      model:
        "Eₙ₊₁ − 3/2＝(1/3)(Eₙ − 3/2) と変形できる（3/2 は α＝α/3 + 1 の解）。E₀ − 3/2＝−1/2 であるから Eₙ − 3/2＝−(1/2)(1/3)ⁿ、すなわち Eₙ＝3/2 − (1/2)(1/3)ⁿ。E₃＝3/2 − 1/54＝40/27。また n→∞ で (1/3)ⁿ→0 より lim Eₙ＝3/2。",
      rub: [
        { label: "Eₙ₊₁ − 3/2＝(1/3)(Eₙ − 3/2) と変形", points: 6, keywords: ["3/2", "1/3"] },
        { label: "Eₙ＝3/2 − (1/2)(1/3)ⁿ（E₀＝1 から）", points: 6, keywords: ["3/2−(1/2)(1/3)ⁿ"] },
        { label: "E₃＝40/27、lim Eₙ＝3/2", points: 8, keywords: ["40/27", "3/2"] },
      ],
      auto: num("40/27", "3/2-1/54", { labels: ["E₃ ="] }),
      pt: "特性方程式 α＝α/3 + 1 で α＝3/2",
      st: [
        ["変形", "{{Eₙ − 3/2＝−(1/2)(1/3)ⁿ}}。"],
        ["値", "E₃＝3/2 − 1/54＝{{40/27}}、極限 3/2。", "初項は E₁ ではなく E₀＝1。指数を n − 1 にしない。E₁＝4/3 で確かめる。"],
      ],
    }),
  ]),
  sec(5, "fermat-su", "h-math-a-yakusu", "2^(2ⁿ) + 1 の積の関係と互いに素", "0 以上の整数 n に対して Fₙ＝2^(2ⁿ) + 1 とおく。たとえば F₀＝2¹ + 1＝3、F₁＝2² + 1＝5 である。", [
    wr({
      id: "atai",
      u: "h-math-a-yakusu",
      d: 1,
      p: "(1) F₂、F₃ を求め、F₀F₁F₂＝F₃ − 2 が成り立つことを確かめよ。",
      model: "F₂＝2⁴ + 1＝17、F₃＝2⁸ + 1＝257。F₀F₁F₂＝3・5・17＝255＝257 − 2＝F₃ − 2。",
      rub: [
        { label: "F₂＝17、F₃＝257", points: 8, keywords: ["17", "257"] },
        { label: "3・5・17＝255＝F₃ − 2 を確認", points: 6, keywords: ["255"] },
      ],
      auto: num("257", "2^8+1", { labels: ["F₃ ="] }),
      pt: "指数は 2ⁿ。2^(2³)＝2⁸",
      st: [["計算", "F₂＝2⁴ + 1＝17、F₃＝2⁸ + 1＝{{257}}。", "2^(2ⁿ) を (2²)ⁿ＝4ⁿ と読まない。F₃ は 4³ + 1＝65 ではない。"]],
    }),
    wr({
      id: "kino",
      u: "h-math-b-kino",
      d: 2,
      dep: "atai",
      p: "(2) すべての自然数 n について、F₀F₁⋯Fₙ₋₁＝Fₙ − 2 が成り立つことを、数学的帰納法で示せ。",
      model:
        "n＝1 のとき F₀＝3＝5 − 2＝F₁ − 2 で成り立つ。n＝k で F₀F₁⋯Fₖ₋₁＝Fₖ − 2 と仮定すると、F₀F₁⋯Fₖ＝(Fₖ − 2)Fₖ＝(2^(2ᵏ) − 1)(2^(2ᵏ) + 1)＝(2^(2ᵏ))² − 1＝2^(2ᵏ⁺¹) − 1＝Fₖ₊₁ − 2。よって n＝k + 1 でも成り立ち、すべての自然数 n で成り立つ。",
      rub: [
        { label: "n＝1 の確認", points: 4, keywords: ["F₀=3", "n=1"] },
        { label: "仮定を使い (2^(2ᵏ) − 1)(2^(2ᵏ) + 1) と和と差の積の形にする", points: 6, keywords: ["和と差", "2^(2ᵏ)−1"] },
        { label: "(2^(2ᵏ))²＝2^(2ᵏ⁺¹) で Fₖ₊₁ − 2 を導く", points: 6, keywords: ["2^(2ᵏ⁺¹)"] },
      ],
      pt: "Fₖ − 2 と Fₖ は 2^(2ᵏ) ∓ 1。和と差の積",
      st: [
        ["帰納法", "F₀⋯Fₖ＝(Fₖ − 2)Fₖ＝{{(2^(2ᵏ) − 1)(2^(2ᵏ) + 1)}}。"],
        ["指数法則", "(2^(2ᵏ))²＝2^(2・2ᵏ)＝{{2^(2ᵏ⁺¹)}}。", "(2^(2ᵏ))² を 2^(2ᵏ+2) や 2^(4ᵏ) としない。2ᵏ を2倍すると 2ᵏ⁺¹。"],
      ],
    }),
    wr({
      id: "tagaini-so",
      u: "h-math-a-yakusu",
      d: 3,
      dep: "kino",
      p: "(3) m≠n のとき、Fₘ と Fₙ の最大公約数を求めよ。",
      model:
        "m＜n としてよい。(2) より F₀F₁⋯Fₙ₋₁＝Fₙ − 2 で、左辺は Fₘ を因数にもつ。Fₘ と Fₙ の公約数を d とすると、d は Fₙ と F₀F₁⋯Fₙ₋₁＝Fₙ − 2 の両方を割り切るので、差 Fₙ − (Fₙ − 2)＝2 を割り切る。よって d＝1 または 2。ところが Fₙ＝2^(2ⁿ) + 1 は（偶数）＋1 で奇数なので d≠2。したがって最大公約数は 1（Fₘ と Fₙ は互いに素）。",
      rub: [
        { label: "(2) から公約数 d が Fₙ − 2 と Fₙ を割り切ることを述べる", points: 8, keywords: ["Fₙ−2", "公約数"] },
        { label: "差の 2 を割り切るので d＝1, 2、Fₙ が奇数で d≠2", points: 6, keywords: ["2", "奇数"] },
        { label: "最大公約数 1（互いに素）", points: 6, keywords: ["1", "互いに素"] },
      ],
      auto: num("1", "1", { labels: ["最大公約数"] }),
      pt: "公約数は差の 2 を割り切る。Fₙ は奇数",
      st: [
        ["差をとる", "d は Fₙ と Fₙ − 2 を割り切るので {{2 を割り切る}}。"],
        ["奇数", "Fₙ は奇数なので d＝{{1}}。", "m＜n と大小を決めてから (2) を使う。Fₘ が積 F₀⋯Fₙ₋₁ に含まれることがポイント。"],
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
