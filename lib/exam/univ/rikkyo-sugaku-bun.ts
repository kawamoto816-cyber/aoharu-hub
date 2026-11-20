import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Difficulty, NumQ, QuestionC } from "@/lib/moshi/types";

// 立教大学型 数学（文系）。一般入試 経済学部・経営学部などで選べる「数学（文系）」(全学部で共通の問題) の形式を参考にした練習用の型。
// 形式: 60分・大問3題。大問Ⅰは計算の小問群 (答えのみ記入の空欄補充)、大問Ⅱ・Ⅲは途中の過程も書く記述式。
//   範囲は数学Ⅰ・Ⅱ・A・B（数列）・C（ベクトル）。大学公表の「出題意図」(2025年度) では、Ⅱ が確率と漸化式・三角関数と相加相乗平均、
//   Ⅲ が図形と方程式と積分 (面積)・3次関数のグラフと直線の共有点。配点は学部で 100〜200点とちがうので、ここでは 100点満点にした。
//   (ブリーフの目安は「大問4題」だったが、文系数学の出題意図はどの日程も大問Ⅰ〜Ⅲの3題なので3題にした。大問4題は理学部の数学。)
// 問題はすべてこの型のために書き下ろしたもの (過去問の文・数値・設定は使っていない)。答えの数値は sympy で検算した。
// 参考:
//   https://www.rikkyo.ac.jp/admissions/undergraduate/mknpps0000034sdc-att/mknpps0000034wiy.pdf (2025年度 数学（文系）出題意図 2月6日: 大問Ⅰ〜Ⅲ)
//   https://www.rikkyo.ac.jp/admissions/undergraduate/mknpps0000034sdc-att/mknpps000003518w.pdf (2025年度 数学（文系）出題意図 2月9日: 大問Ⅰ〜Ⅲ)
//   https://www.rikkyo.ac.jp/admissions/undergraduate/mknpps0000034sdc-att/mknpps0000035bn4.pdf (2025年度 数学（理系）出題意図: 大問4題は理系)
//   https://jyuke-labo.com/daigakujyukentaisaku/rikkyodaigaku/kamokubetsu/ (立教の科目別対策: 文系数学は60分・大問3題・小問集合と誘導つきの問題、配点は学部で100〜200点)

const KEY = "rikkyo-sugaku-bun";
const TAG = (i: number) => `${KEY}:${i}`;
const LEAD1 = "次の空欄にあてはまる数または式を答えよ。答えのみを記入せよ。";
const LEAD2 = "次の問いに答えよ。解答は答えだけでなく、途中の過程も記述せよ。";

type St = ([string, string] | [string, string, string])[];
type Rub = { label: string; points: number; keywords?: string[] }[];
const steps = (st: St) => st.map(([title, body, trap]) => (trap ? { title, body, trap } : { title, body }));

interface N {
  id: string;
  u: string;
  d: Difficulty;
  p: string;
  a: Omit<NumQ, "kind">;
  pt: string;
  st: St;
}
/** 小問集合の1問 (答えのみ・自動採点) */
function nm(q: N): QuestionC {
  return {
    id: q.id,
    type: "C",
    difficulty: q.d,
    points: 8,
    seconds: q.d === 3 ? 360 : 240,
    skill: "知識・技能",
    unit: q.u,
    prompt: q.p,
    answer: { kind: "num", ...q.a },
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
    seconds: q.d === 1 ? 300 : q.d === 2 ? 420 : 540,
    skill: "思考・判断・表現",
    unit: q.u,
    ...(q.dep ? { dependsOn: q.dep } : {}),
    prompt: q.p,
    answer: { kind: "written", model: q.model, rubric: q.rub, ...(q.auto ? { autoPart: { kind: "num", ...q.auto } } : {}) },
    point: q.pt,
    steps: steps(q.st),
  };
}

function sec(tag: number, id: string, unit: string, title: string, lead: string, qs: QuestionC[], body?: string): ExamPoolSection {
  return {
    unit,
    tag: TAG(tag),
    section: {
      id: `rikkyo-sugaku-${tag}-${id}`,
      title,
      lead,
      ...(body ? { material: [{ kind: "text" as const, body }] } : {}),
      questions: qs,
    },
  };
}

// =====================================================================
// 大問Ⅰ　小問集合（空欄補充・答えのみ）。どの節も5問・難易度 1,1,2,2,3
// =====================================================================

const S1: ExamPoolSection[] = [
  sec(1, "a", "h-math-1-shiki", "小問集合（式の値・指数・三角関数・ベクトル・微分）", LEAD1, [
    nm({
      id: "taisho-3jo",
      u: "h-math-1-shiki",
      d: 1,
      p: "実数 x, y が x＋y＝4、xy＝1 を満たすとき、x³＋y³＝□ である。",
      a: { answerKind: "num", answer: ["52"], calc: "4^3-3*1*4" },
      pt: "x³＋y³＝(x＋y)³−3xy(x＋y)",
      st: [["対称式", "x³＋y³＝(x＋y)³−3xy(x＋y)＝64−12＝{{52}}。", "(x＋y)³ をそのまま答えにしない。−3xy(x＋y) を引く。"]],
    }),
    nm({
      id: "shisu-atai",
      u: "h-math-2-shisu",
      d: 1,
      p: "2ˣ＝3 のとき、8ˣ＋4⁻ˣ＝□ である。",
      a: { answerKind: "num", answer: ["244/9"], calc: "27+1/9" },
      pt: "8ˣ＝(2ˣ)³、4⁻ˣ＝1/(2ˣ)²",
      st: [
        ["底を2にそろえる", "8ˣ＝(2ˣ)³＝27、4⁻ˣ＝1/(2ˣ)²＝1/9。"],
        ["足す", "27＋1/9＝{{244/9}}。"],
      ],
    }),
    nm({
      id: "sincos-3jo",
      u: "h-math-2-sankaku",
      d: 2,
      p: "0＜θ＜π で sinθ＋cosθ＝1/3 のとき、sin³θ＋cos³θ＝□ である。",
      a: { answerKind: "num", answer: ["13/27"], calc: "(1/3)*(1+4/9)" },
      pt: "両辺を2乗して sinθcosθ を先に出す",
      st: [
        ["sinθcosθ", "(sinθ＋cosθ)²＝1＋2sinθcosθ＝1/9 より {{sinθcosθ＝−4/9}}。"],
        ["3乗の和", "sin³θ＋cos³θ＝(sinθ＋cosθ)(1−sinθcosθ)＝(1/3)(13/9)＝{{13/27}}。", "a³＋b³＝(a＋b)(a²−ab＋b²) で、a²＋b²＝1 を使う。"],
      ],
    }),
    nm({
      id: "vec-saisho",
      u: "h-math-c-heimen",
      d: 2,
      p: "a→＝(2, 1)、b→＝(1, 3) とする。実数 t を動かすとき、|a→＋t b→| を最小にする t の値は □ である。",
      a: { answerKind: "num", answer: ["-1/2"], labels: ["t ="], equations: ["5+10*t=0"] },
      pt: "|a→＋tb→|² を t の2次式にして平方完成",
      st: [
        ["2乗する", "|a→＋tb→|²＝|b→|²t²＋2(a→·b→)t＋|a→|²＝10t²＋10t＋5。"],
        ["最小", "10(t＋1/2)²＋5/2 より {{t＝−1/2}}。", "最小値 √(5/2) ではなく、t の値を答える。"],
      ],
    }),
    nm({
      id: "kyokuchi-wa",
      u: "h-math-2-bibun",
      d: 3,
      p: "関数 f(x)＝x³−3x²＋k の極大値と極小値の和が 2 であるとき、定数 k の値は □ である。",
      a: { answerKind: "num", answer: ["3"], labels: ["k ="], equations: ["k+(k-4)=2"] },
      pt: "f′(x)＝0 の x で極値。f(0) と f(2) を足す",
      st: [
        ["極値の位置", "f′(x)＝3x²−6x＝3x(x−2)。x＝0 で極大、x＝2 で極小。"],
        ["和", "f(0)＋f(2)＝k＋(k−4)＝2k−4＝2 より {{k＝3}}。"],
      ],
    }),
  ]),
  sec(1, "b", "h-math-1-nijikansu", "小問集合（2次関数・数列・確率・円・指数方程式）", LEAD1, [
    nm({
      id: "choten-chokusen",
      u: "h-math-1-nijikansu",
      d: 1,
      p: "放物線 y＝x²−4x＋c の頂点が直線 y＝2x−1 上にあるとき、c＝□ である。",
      a: { answerKind: "num", answer: ["7"], labels: ["c ="], equations: ["c-4=2*2-1"] },
      pt: "平方完成で頂点 (2, c−4) を出す",
      st: [["頂点", "y＝(x−2)²＋c−4 より頂点は (2, c−4)。これが y＝2x−1 上なので c−4＝3、{{c＝7}}。"]],
    }),
    nm({
      id: "tosa-wa",
      u: "h-math-b-tosa",
      d: 1,
      p: "等差数列 {aₙ} が a₃＝7、a₈＝22 を満たすとき、初項から第10項までの和は □ である。",
      a: { answerKind: "num", answer: ["145"], calc: "10*(1+28)/2" },
      pt: "a₈−a₃＝5d で公差を出す",
      st: [
        ["公差と初項", "5d＝15 より d＝3、a₁＝7−2·3＝1。"],
        ["和", "a₁₀＝28、S₁₀＝10(1＋28)/2＝{{145}}。"],
      ],
    }),
    nm({
      id: "card-tonari",
      u: "h-math-a-kakuritsu",
      d: 2,
      p: "1から5までの数字を1つずつ書いた5枚のカードを、無作為に1列に並べる。1と2のカードが隣り合う確率は □ である。",
      a: { answerKind: "num", answer: ["2/5"], calc: "2*24/120" },
      pt: "隣り合う2枚を1枚とみなして並べる",
      st: [
        ["隣り合う並べ方", "1と2をひとまとまりにすると4つの並び 4!＝24、まとまりの中の順が2通り。"],
        ["確率", "48/120＝{{2/5}}。", "まとまりの中の並び (12 と 21) の2倍を忘れない。"],
      ],
    }),
    nm({
      id: "en-sessen",
      u: "h-math-2-en",
      d: 2,
      p: "円 x²＋y²＝10 と直線 y＝x＋k が接するとき、正の定数 k の値は □ である。",
      a: { answerKind: "surd", answer: ["2√5"], labels: ["k ="], equations: ["k^2=20"] },
      pt: "中心と直線の距離＝半径",
      st: [
        ["距離", "直線 x−y＋k＝0 と原点の距離は |k|/√2。これが半径 √10 に等しい。"],
        ["解く", "|k|＝√20 で k＞0 より {{k＝2√5}}。"],
      ],
    }),
    nm({
      id: "shisu-hoteishiki",
      u: "h-math-2-shisu",
      d: 3,
      p: "方程式 2²ˣ−5·2ˣ⁺¹＋16＝0 のすべての実数解の和は □ である。",
      a: { answerKind: "num", answer: ["4"], calc: "1+3" },
      pt: "2ˣ＝t (t＞0) とおくと t の2次方程式",
      st: [
        ["おきかえ", "2ˣ＝t とおくと 2ˣ⁺¹＝2t。t²−10t＋16＝0、(t−2)(t−8)＝0。"],
        ["戻す", "t＝2, 8 (どちらも正) より x＝1, 3。和は {{4}}。", "5·2ˣ⁺¹ を 5t としない。2ˣ⁺¹＝2·2ˣ。"],
      ],
    }),
  ]),
  sec(1, "c", "h-math-1-nijihoteishiki", "小問集合（2次不等式・三角形の面積・Σ・ベクトル・面積）", LEAD1, [
    nm({
      id: "seisu-kosu",
      u: "h-math-1-nijihoteishiki",
      d: 1,
      p: "不等式 x²−5x＋4＜0 を満たす整数 x は □ 個ある。",
      a: { answerKind: "num", answer: ["2"], unit: "個", calc: "2" },
      pt: "因数分解して 1＜x＜4",
      st: [["解く", "(x−1)(x−4)＜0 より 1＜x＜4。整数は 2, 3 の {{2個}}。", "等号がないので 1 と 4 は入らない。"]],
    }),
    nm({
      id: "menseki-3hen",
      u: "h-math-1-teiri",
      d: 1,
      p: "AB＝5、BC＝7、CA＝8 である三角形ABCの面積は □ である。",
      a: { answerKind: "surd", answer: ["10√3"], equations: ["x^2=300"] },
      pt: "余弦定理で cosA → sinA → 面積",
      st: [
        ["余弦定理", "cosA＝(5²＋8²−7²)/(2·5·8)＝1/2 より A＝60°。"],
        ["面積", "(1/2)·5·8·sin60°＝{{10√3}}。"],
      ],
    }),
    nm({
      id: "sigma-kk1",
      u: "h-math-b-sigma",
      d: 2,
      p: "Σₖ₌₁²⁰ k(k＋1)＝□ である。",
      a: { answerKind: "num", answer: ["3080"], calc: "20*21*22/3" },
      pt: "Σk(k＋1)＝n(n＋1)(n＋2)/3",
      st: [
        ["公式", "Σₖ₌₁ⁿ k(k＋1)＝Σk²＋Σk＝{{n(n＋1)(n＋2)/3}}。"],
        ["代入", "20·21·22/3＝{{3080}}。"],
      ],
    }),
    nm({
      id: "vec-menseki",
      u: "h-math-c-heimen",
      d: 2,
      p: "三角形OAB において |OA→|＝3、|OB→|＝2、OA→·OB→＝2 であるとき、三角形OAB の面積は □ である。",
      a: { answerKind: "surd", answer: ["2√2"], equations: ["x^2=8"] },
      pt: "S＝(1/2)√(|a→|²|b→|²−(a→·b→)²)",
      st: [["面積の公式", "S＝(1/2)√(9·4−2²)＝(1/2)√32＝{{2√2}}。", "内積は2乗してから引く。(a→·b→)²＝4。"]],
    }),
    nm({
      id: "hobutsu-menseki",
      u: "h-math-2-sekibun",
      d: 3,
      p: "放物線 y＝x² と直線 y＝x＋2 で囲まれた部分の面積は □ である。",
      a: { answerKind: "num", answer: ["9/2"], calc: "(2-(-1))^3/6" },
      pt: "交点 x＝−1, 2。∫(α→β)(x−α)(x−β)dx＝−(β−α)³/6",
      st: [
        ["交点", "x²＝x＋2 より x＝−1, 2。"],
        ["面積", "∫₋₁² (x＋2−x²)dx＝(2−(−1))³/6＝{{9/2}}。", "上の関数から下の関数を引く。直線が上。"],
      ],
    }),
  ]),
  sec(1, "d", "h-math-2-koji", "小問集合（指数・剰余の定理・じゃんけん・加法定理・共通接線）", LEAD1, [
    nm({
      id: "shisu-keisan",
      u: "h-math-2-shisu",
      d: 1,
      p: "8^(2/3)＋27^(−1/3)×9＝□ である。",
      a: { answerKind: "num", answer: ["7"], calc: "4+3" },
      pt: "8＝2³、27＝3³ として指数を計算",
      st: [["計算", "8^(2/3)＝2²＝4、27^(−1/3)＝1/3 より 4＋(1/3)×9＝{{7}}。"]],
    }),
    nm({
      id: "joyo-teiri",
      u: "h-math-2-koji",
      d: 1,
      p: "整式 P(x) を x−1 で割ると余りは 3、x＋2 で割ると余りは −3 である。P(x) を (x−1)(x＋2) で割ったときの余りは □ である。",
      a: { answerKind: "expr", answer: ["2x+1"] },
      pt: "余りを ax＋b とおき P(1), P(−2) を使う",
      st: [
        ["余りの形", "P(x)＝(x−1)(x＋2)Q(x)＋ax＋b とおく。"],
        ["剰余の定理", "P(1)＝a＋b＝3、P(−2)＝−2a＋b＝−3 より a＝2, b＝1。余りは {{2x＋1}}。"],
      ],
    }),
    nm({
      id: "janken-1nin",
      u: "h-math-a-kakuritsu",
      d: 2,
      p: "3人が1回じゃんけんをするとき、1人だけが勝つ確率は □ である。",
      a: { answerKind: "num", answer: ["1/3"], calc: "3*3/27" },
      pt: "だれが・どの手で勝つかを数える",
      st: [
        ["数える", "勝つ人の選び方3通り × 勝つ手3通り。残り2人は負ける手に決まる。"],
        ["確率", "9/3³＝{{1/3}}。", "あいこの場合 (全員同じ・3種類そろう) は勝者がいない。"],
      ],
    }),
    nm({
      id: "kahou-tan",
      u: "h-math-2-kahou",
      d: 2,
      p: "tanα＝2、tanβ＝3 のとき、tan(α＋β)＝□ である。",
      a: { answerKind: "num", answer: ["-1"], calc: "(2+3)/(1-2*3)" },
      pt: "tan(α＋β)＝(tanα＋tanβ)/(1−tanα tanβ)",
      st: [["加法定理", "(2＋3)/(1−6)＝{{−1}}。", "分母は 1＋tanα tanβ ではなく 1−tanα tanβ。"]],
    }),
    nm({
      id: "kyotsu-sessen",
      u: "h-math-2-bibun",
      d: 3,
      p: "2つの放物線 y＝x² と y＝x²−4x＋8 の両方に接する直線の方程式は y＝□ である。",
      a: { answerKind: "expr", answer: ["2x-1"], labels: ["y ="] },
      pt: "それぞれの接線の傾きと切片を一致させる",
      st: [
        ["接線", "y＝x² の x＝a での接線は y＝2ax−a²。y＝x²−4x＋8 の x＝b での接線は y＝(2b−4)x−b²＋8。"],
        ["一致", "2a＝2b−4、−a²＝−b²＋8 より a＝1, b＝3。{{y＝2x−1}}。", "接点は2つの放物線でちがう点。同じ x とおかない。"],
      ],
    }),
  ]),
];

// =====================================================================
// 大問Ⅱ　記述（確率と漸化式・三角関数・指数対数）。どの節も3問・難易度 1,2,3
// =====================================================================

const S2: ExamPoolSection[] = [
  sec(
    2,
    "pass",
    "h-math-b-zenka",
    "ボールのパスと漸化式",
    LEAD2,
    [
      wr({
        id: "pass-p2",
        u: "h-math-a-kakuritsu",
        d: 1,
        p: "p₁、p₂ を求めよ。",
        model: "1回目のパスでボールは必ず B か C に移るので p₁＝0。2回目は、B（または C）を持つ人が A に渡す確率が 1/2 なので p₂＝1×1/2＝1/2。",
        rub: [
          { label: "p₁＝0 を求めている", points: 3, keywords: ["p₁＝0"] },
          { label: "p₂＝1/2 を求めている", points: 5, keywords: ["1/2"] },
        ],
        auto: { answerKind: "num", answer: ["1/2"], labels: ["p₂ ="], calc: "1*1/2" },
        pt: "A が持っていれば次は必ず A 以外",
        st: [["はじめの2回", "1回目は必ず A 以外へ。2回目に A へ戻る確率は {{1/2}}。"]],
      }),
      wr({
        id: "pass-pn",
        u: "h-math-b-zenka",
        d: 2,
        dep: "pass-p2",
        p: "pₙ₊₁ を pₙ を用いて表し、pₙ を n の式で表せ。また p₄ を求めよ。",
        model:
          "n 回後に A が持っている (確率 pₙ) とき、n＋1 回後に A が持つことはない。A 以外が持っている (確率 1−pₙ) とき、A に渡す確率は 1/2。よって pₙ₊₁＝(1/2)(1−pₙ)。これは pₙ₊₁−1/3＝(−1/2)(pₙ−1/3) と変形でき、p₀−1/3＝2/3 なので pₙ＝1/3＋(2/3)(−1/2)ⁿ。p₄＝1/3＋(2/3)(1/16)＝3/8。",
        rub: [
          { label: "pₙ₊₁＝(1/2)(1−pₙ) を理由とともに立てている", points: 4, keywords: ["1−pₙ", "1/2"] },
          { label: "pₙ−1/3 が公比 −1/2 の等比数列になると変形している", points: 3, keywords: ["1/3", "−1/2"] },
          { label: "pₙ＝1/3＋(2/3)(−1/2)ⁿ と p₄＝3/8 を求めている", points: 3, keywords: ["(2/3)(−1/2)ⁿ", "3/8"] },
        ],
        auto: { answerKind: "num", answer: ["3/8"], labels: ["p₄ ="], calc: "1/3+(2/3)*(1/16)" },
        pt: "A 以外が持つときだけ A に戻れる",
        st: [
          ["漸化式", "{{pₙ₊₁＝(1/2)(1−pₙ)}}。A が持っているときは A に戻れない。"],
          ["一般項", "α＝(1/2)(1−α) より α＝1/3。pₙ＝{{1/3＋(2/3)(−1/2)ⁿ}}。", "初項は p₀＝1 (はじめに A が持つ)。p₁ から始めるなら p₁＝0 で式の指数が変わる。"],
        ],
      }),
      wr({
        id: "pass-n",
        u: "h-math-b-zenka",
        d: 3,
        dep: "pass-pn",
        p: "|pₙ−1/3|＜1/100 となる最小の自然数 n を求めよ。",
        model:
          "|pₙ−1/3|＝(2/3)(1/2)ⁿ なので、条件は (2/3)(1/2)ⁿ＜1/100、すなわち 2ⁿ＞200/3＝66.66… 。2⁶＝64＜66.66…、2⁷＝128＞66.66… で、2ⁿ は n について増加するので、求める最小の n は 7。",
        rub: [
          { label: "|pₙ−1/3|＝(2/3)(1/2)ⁿ と絶対値をはずしている", points: 4, keywords: ["(2/3)(1/2)ⁿ"] },
          { label: "2ⁿ＞200/3 に直し、2⁶ と 2⁷ を比べている", points: 5, keywords: ["200/3", "64", "128"] },
          { label: "n＝7 と答えている", points: 3, keywords: ["7"] },
        ],
        auto: { answerKind: "num", answer: ["7"], labels: ["n ="], calc: "7" },
        pt: "絶対値をとると (−1/2)ⁿ の符号が消える",
        st: [
          ["不等式", "(2/3)(1/2)ⁿ＜1/100 ⇔ {{2ⁿ＞200/3}}。"],
          ["境目", "2⁶＝64、2⁷＝128 より {{n＝7}}。", "200/3 を 66 と切り捨てて 2⁶＝64 と比べ、まちがえないようにする。"],
        ],
      }),
    ],
    "A, B, C の3人がボールを1つ持ち、パスを続ける。はじめは A がボールを持っている。ボールを持っている人は、ほかの2人のうちどちらか一方に、それぞれ確率 1/2 でパスする。n 回のパスのあとに A がボールを持っている確率を pₙ とする (p₀＝1)。",
  ),
  sec(
    2,
    "sincos-t",
    "h-math-2-sankaku",
    "sinθ＋cosθ のおきかえと最大・最小",
    LEAD2,
    [
      wr({
        id: "t-hyoji",
        u: "h-math-2-sankaku",
        d: 1,
        p: "sin2θ を t を用いて表し、f(θ) を t の式で表せ。",
        model: "t²＝sin²θ＋2sinθcosθ＋cos²θ＝1＋sin2θ より sin2θ＝t²−1。よって f(θ)＝t²−1−2t＝t²−2t−1。",
        rub: [
          { label: "t² を展開して sin2θ＝t²−1 を導いている", points: 4, keywords: ["t²−1", "sin²θ＋cos²θ"] },
          { label: "f(θ)＝t²−2t−1 と表している", points: 4, keywords: ["t²−2t−1"] },
        ],
        auto: { answerKind: "expr", answer: ["t^2-2t-1"], labels: ["f(θ) ="] },
        pt: "(sinθ＋cosθ)²＝1＋2sinθcosθ",
        st: [["2乗する", "t²＝1＋sin2θ より sin2θ＝t²−1。{{f＝t²−2t−1}}。"]],
      }),
      wr({
        id: "t-hani",
        u: "h-math-2-kahou",
        d: 2,
        p: "t のとりうる値の範囲を求めよ。",
        model:
          "合成すると t＝√2 sin(θ＋π/4)。0≦θ≦π より π/4≦θ＋π/4≦5π/4 なので −1/√2≦sin(θ＋π/4)≦1。よって −1≦t≦√2。",
        rub: [
          { label: "t＝√2 sin(θ＋π/4) と合成している", points: 4, keywords: ["√2", "π/4"] },
          { label: "θ＋π/4 の範囲から sin の範囲を求めている", points: 3, keywords: ["5π/4", "−1/√2"] },
          { label: "−1≦t≦√2 と答えている", points: 3, keywords: ["−1≦t≦√2"] },
        ],
        pt: "合成して、角の範囲から sin の範囲を読む",
        st: [
          ["合成", "t＝{{√2 sin(θ＋π/4)}}。"],
          ["範囲", "θ＋π/4 は π/4〜5π/4 を動くので sin は −1/√2〜1。{{−1≦t≦√2}}。", "−√2≦t≦√2 としない。θ の範囲が 0〜π に限られている。"],
        ],
      }),
      wr({
        id: "t-maxmin",
        u: "h-math-2-sankaku",
        d: 3,
        dep: "t-hyoji",
        p: "f(θ) の最大値と最小値、およびそのときの θ の値をそれぞれ求めよ。",
        model:
          "f＝(t−1)²−2 (−1≦t≦√2)。t＝−1 のとき最大値 (−2)²−2＝2、t＝1 のとき最小値 −2。t＝−1 のとき sin(θ＋π/4)＝−1/√2 で θ＋π/4＝5π/4、θ＝π。t＝1 のとき sin(θ＋π/4)＝1/√2 で θ＋π/4＝π/4, 3π/4、θ＝0, π/2。よって最大値 2 (θ＝π)、最小値 −2 (θ＝0, π/2)。",
        rub: [
          { label: "f＝(t−1)²−2 と平方完成し、(2) の範囲で考えている", points: 4, keywords: ["(t−1)²−2"] },
          { label: "最大値 2・最小値 −2 を求めている", points: 4, keywords: ["2", "−2"] },
          { label: "そのときの θ (最大 θ＝π、最小 θ＝0, π/2) を求めている", points: 4, keywords: ["θ＝π", "θ＝0", "π/2"] },
        ],
        auto: { answerKind: "num", answer: ["2"], labels: ["最大値"], calc: "(-1)^2-2*(-1)-1" },
        pt: "t の範囲の端と頂点を比べ、θ に戻す",
        st: [
          ["t の2次関数", "f＝(t−1)²−2。頂点 t＝1 は範囲内で {{最小値 −2}}。軸から遠い端 t＝−1 で {{最大値 2}}。"],
          ["θ に戻す", "t＝−1 ⇔ θ＝π、t＝1 ⇔ θ＝0, π/2。", "t＝1 となる θ は2つある。片方だけにしない。"],
        ],
      }),
    ],
    "0≦θ≦π とし、f(θ)＝sin2θ−2(sinθ＋cosθ) とする。また t＝sinθ＋cosθ とおく。",
  ),
  sec(
    2,
    "ketasu",
    "h-math-2-taisu",
    "12ⁿ の桁数と最高位の数字",
    LEAD2,
    [
      wr({
        id: "keta-20",
        u: "h-math-2-taisu",
        d: 1,
        p: "12²⁰ は何桁の整数か。",
        model: "log₁₀12＝2log₁₀2＋log₁₀3＝0.6020＋0.4771＝1.0791。log₁₀12²⁰＝20×1.0791＝21.582。21≦21.582＜22 より 10²¹≦12²⁰＜10²² なので、12²⁰ は 22 桁。",
        rub: [
          { label: "log₁₀12＝2log₁₀2＋log₁₀3＝1.0791 を求めている", points: 3, keywords: ["1.0791"] },
          { label: "log₁₀12²⁰＝21.582 から 10²¹≦12²⁰＜10²² を示している", points: 3, keywords: ["21.582", "10²¹"] },
          { label: "22 桁と答えている", points: 2, keywords: ["22"] },
        ],
        auto: { answerKind: "num", answer: ["22"], unit: "桁", calc: "22" },
        pt: "N 桁 ⇔ N−1≦log₁₀x＜N",
        st: [["常用対数", "log₁₀12²⁰＝{{21.582}}。整数部分 21 より {{22桁}}。", "整数部分の 21 をそのまま桁数にしない。桁数は整数部分＋1。"]],
      }),
      wr({
        id: "keta-saikoi",
        u: "h-math-2-taisu",
        d: 2,
        dep: "keta-20",
        p: "12²⁰ の最高位の数字を求めよ。",
        model: "12²⁰＝10^21.582＝10^0.582×10²¹。log₁₀3＝0.4771＜0.582＜0.6020＝log₁₀4 より 3＜10^0.582＜4。よって 3×10²¹＜12²⁰＜4×10²¹ で、最高位の数字は 3。",
        rub: [
          { label: "小数部分 0.582 に注目している", points: 3, keywords: ["0.582"] },
          { label: "log₁₀3＜0.582＜log₁₀4 と比べている", points: 5, keywords: ["0.4771", "0.6020"] },
          { label: "最高位の数字 3 と答えている", points: 2, keywords: ["3"] },
        ],
        auto: { answerKind: "num", answer: ["3"], calc: "3" },
        pt: "小数部分を log₁₀k (k＝1〜9) とくらべる",
        st: [["小数部分", "12²⁰＝10^0.582×10²¹。{{log₁₀3＜0.582＜log₁₀4}} より最高位は {{3}}。", "log₁₀4＝2log₁₀2＝0.6020。4 の対数を出し忘れない。"]],
      }),
      wr({
        id: "keta-30",
        u: "h-math-2-taisu",
        d: 3,
        dep: "keta-20",
        p: "12ⁿ が 30 桁以上の整数となる最小の自然数 n を求めよ。",
        model:
          "12ⁿ が 30 桁以上 ⇔ 12ⁿ≧10²⁹ ⇔ n×1.0791≧29 ⇔ n≧29/1.0791＝26.87…。n＝26 のとき 26×1.0791＝28.0566 で 29 桁、n＝27 のとき 27×1.0791＝29.1357 で 30 桁。よって最小の n は 27。",
        rub: [
          { label: "30桁以上 ⇔ 12ⁿ≧10²⁹ と言いかえている", points: 4, keywords: ["10²⁹", "29"] },
          { label: "n×1.0791≧29 を解き、n＝26, 27 の値を確かめている", points: 5, keywords: ["26.87", "28.0566", "29.1357"] },
          { label: "n＝27 と答えている", points: 3, keywords: ["27"] },
        ],
        auto: { answerKind: "num", answer: ["27"], labels: ["n ="], calc: "27" },
        pt: "30桁以上 ⇔ 10²⁹ 以上",
        st: [
          ["言いかえ", "30桁の最小の数は {{10²⁹}}。n log₁₀12≧29。"],
          ["解く", "n≧26.87… より {{n＝27}}。", "12ⁿ≧10³⁰ としない。10³⁰ は31桁。"],
        ],
      }),
    ],
    "log₁₀2＝0.3010、log₁₀3＝0.4771 とする。",
  ),
];

// =====================================================================
// 大問Ⅲ　記述（3次関数・図形と方程式・積分）。どの節も3問・難易度 1,2,3
// =====================================================================

const S3: ExamPoolSection[] = [
  sec(
    3,
    "3ji-kyoyu",
    "h-math-2-bibun",
    "3次関数のグラフと直線の共有点",
    LEAD2,
    [
      wr({
        id: "3ji-kyokuchi",
        u: "h-math-2-bibun",
        d: 1,
        p: "f(x) の極大値と極小値を求めよ。",
        model: "f′(x)＝3x²−3＝3(x＋1)(x−1)。x＜−1 で f′＞0、−1＜x＜1 で f′＜0、x＞1 で f′＞0。よって x＝−1 で極大値 f(−1)＝2、x＝1 で極小値 f(1)＝−2。",
        rub: [
          { label: "f′(x)＝3(x＋1)(x−1) を求め、増減を調べている", points: 4, keywords: ["3(x＋1)(x−1)", "増減"] },
          { label: "極大値 2 (x＝−1)、極小値 −2 (x＝1) と答えている", points: 4, keywords: ["2", "−2"] },
        ],
        auto: { answerKind: "num", answer: ["2"], labels: ["極大値"], calc: "(-1)^3-3*(-1)" },
        pt: "f′(x)＝0 の前後で符号を調べる",
        st: [["増減表", "x＝−1 で {{極大値 2}}、x＝1 で {{極小値 −2}}。"]],
      }),
      wr({
        id: "3ji-3kai",
        u: "h-math-2-bibun",
        d: 2,
        dep: "3ji-kyokuchi",
        p: "x の方程式 x³−3x＝a が異なる3つの実数解をもつような a の値の範囲を求めよ。",
        model: "方程式の実数解は、曲線 y＝f(x) と直線 y＝a の共有点の x 座標である。(1) の増減から、y＝a が極小値 −2 と極大値 2 の間にあるとき、共有点は3個。よって −2＜a＜2。",
        rub: [
          { label: "y＝f(x) と y＝a の共有点の個数に言いかえている", points: 4, keywords: ["共有点", "y＝a"] },
          { label: "極大値・極小値と比べて範囲を出している", points: 3, keywords: ["極大", "極小"] },
          { label: "−2＜a＜2 と答えている", points: 3, keywords: ["−2＜a＜2"] },
        ],
        pt: "定数 a を分離して、水平な直線との交点を数える",
        st: [["グラフで見る", "y＝a を上下に動かす。極小値と極大値の間で {{3点}}。{{−2＜a＜2}}。", "a＝±2 のときは接して2個。等号は入らない。"]],
      }),
      wr({
        id: "3ji-sei2",
        u: "h-math-2-bibun",
        d: 3,
        dep: "3ji-3kai",
        p: "方程式 x³−3x＝a が異なる3つの実数解をもち、そのうちちょうど2つが正であるような a の値の範囲を求めよ。",
        model:
          "f(x)＝0 の解は x＝−√3, 0, √3 で、f(−2)＝−2、f(2)＝2。−2＜a＜0 のとき、y＝a は x＜−1 で1回 (−2＜x＜−√3)、−1＜x＜1 で1回 (0＜x＜1)、x＞1 で1回 (1＜x＜√3) 交わり、正の解は2つ。a＝0 のとき解は −√3, 0, √3 で正の解は1つ。0＜a＜2 のとき、交点は −√3＜x＜−1、−1＜x＜0、√3＜x＜2 にあり、正の解は1つ。よって −2＜a＜0。",
        rub: [
          { label: "y＝f(x) が x 軸と x＝−√3, 0, √3 で交わることを使っている", points: 3, keywords: ["−√3", "√3", "0"] },
          { label: "−2＜a＜0、a＝0、0＜a＜2 で正の解の個数を調べている", points: 6, keywords: ["−2＜a＜0", "0＜a＜2", "a＝0"] },
          { label: "−2＜a＜0 と答えている", points: 3, keywords: ["−2＜a＜0"] },
        ],
        pt: "y＝a と y 軸の右側での交点の数を見る",
        st: [
          ["x 軸との交点", "f(x)＝x(x²−3) より {{x＝−√3, 0, √3}}。"],
          ["場合分け", "y＝a が x 軸より下 (−2＜a＜0) なら、右側 (x＞0) で2回交わる。{{−2＜a＜0}}。", "a＝0 では x＝0 が解になり、正の解は √3 だけ。"],
        ],
      }),
    ],
    "f(x)＝x³−3x とする。",
  ),
  sec(
    3,
    "hobutsu-sankaku",
    "h-math-2-sekibun",
    "放物線と直線で囲まれた部分と三角形",
    LEAD2,
    [
      wr({
        id: "ps-koten",
        u: "h-math-2-chokusen",
        d: 1,
        p: "2点 A, B の座標を求めよ。ただし A の x 座標は B の x 座標より小さいとする。",
        model: "x²＝2x＋3 より x²−2x−3＝0、(x＋1)(x−3)＝0、x＝−1, 3。よって A(−1, 1)、B(3, 9)。",
        rub: [
          { label: "x²＝2x＋3 を解いて x＝−1, 3 を得ている", points: 5, keywords: ["(x＋1)(x−3)"] },
          { label: "A(−1, 1)、B(3, 9) と答えている", points: 3, keywords: ["(−1, 1)", "(3, 9)"] },
        ],
        pt: "連立して x の2次方程式",
        st: [["連立", "x²−2x−3＝0 より x＝−1, 3。{{A(−1, 1)、B(3, 9)}}。"]],
      }),
      wr({
        id: "ps-menseki",
        u: "h-math-2-sekibun",
        d: 2,
        dep: "ps-koten",
        p: "C と ℓ で囲まれた部分の面積 S を求めよ。",
        model: "−1≦x≦3 で 2x＋3≧x² なので S＝∫₋₁³ (2x＋3−x²)dx＝[x²＋3x−x³/3]₋₁³＝(9＋9−9)−(1−3＋1/3)＝9＋5/3＝32/3。",
        rub: [
          { label: "上下関係を確かめ、S＝∫₋₁³ (2x＋3−x²)dx を立てている", points: 4, keywords: ["∫", "2x＋3−x²"] },
          { label: "積分を計算している", points: 3, keywords: ["x²＋3x−x³/3"] },
          { label: "S＝32/3 と答えている", points: 3, keywords: ["32/3"] },
        ],
        auto: { answerKind: "num", answer: ["32/3"], labels: ["S ="], calc: "(3-(-1))^3/6" },
        pt: "(β−α)³/6 の公式で検算できる",
        st: [["定積分", "S＝∫₋₁³ (2x＋3−x²)dx＝{{32/3}}。", "(3−(−1))³/6＝64/6 で検算できる。"]],
      }),
      wr({
        id: "ps-sankaku",
        u: "h-math-2-bibun",
        d: 3,
        dep: "ps-koten",
        p: "点 P が C 上の A と B の間 (−1＜x＜3 の部分) を動くとき、三角形APB の面積の最大値と、そのときの P の座標を求めよ。",
        model:
          "P(s, s²) (−1＜s＜3) とする。AB→＝(4, 8)、AP→＝(s＋1, s²−1)。三角形APB の面積は (1/2)|4(s²−1)−8(s＋1)|＝2|(s＋1)(s−3)|＝2(s＋1)(3−s)＝−2(s−1)²＋8。−1＜s＜3 より s＝1 で最大値 8。よって P(1, 1) のとき最大値 8。",
        rub: [
          { label: "P(s, s²) とおき、面積を s の式で表している", points: 5, keywords: ["(s, s²)", "2(s＋1)(3−s)"] },
          { label: "s の範囲で最大となる s＝1 を求めている", points: 4, keywords: ["s＝1", "(s−1)²"] },
          { label: "最大値 8、P(1, 1) と答えている", points: 3, keywords: ["8", "(1, 1)"] },
        ],
        auto: { answerKind: "num", answer: ["8"], labels: ["最大値"], calc: "-2*(1-1)^2+8" },
        pt: "底辺 AB を固定し、高さ (直線との距離) を最大に",
        st: [
          ["面積の式", "(1/2)|x₁y₂−x₂y₁| より {{2(s＋1)(3−s)}}。"],
          ["最大", "s＝1 で {{8}}。接線の傾きが ℓ と同じ 2 になる点。", "|…| の中の符号に注意。−1＜s＜3 では (s＋1)(s−3)＜0。"],
        ],
      }),
    ],
    "放物線 C：y＝x² と直線 ℓ：y＝2x＋3 の2つの交点を A, B とする。",
  ),
  sec(
    3,
    "en-kiseki",
    "h-math-2-kiseki",
    "原点を通る円と弦の中点の軌跡",
    LEAD2,
    [
      wr({
        id: "ek-chushin",
        u: "h-math-2-en",
        d: 1,
        p: "円 K の中心の座標と半径を求めよ。",
        model: "(x−2)²＋(y−1)²＝5 と変形できるので、中心 (2, 1)、半径 √5。",
        rub: [
          { label: "(x−2)²＋(y−1)²＝5 と平方完成している", points: 5, keywords: ["(x−2)²＋(y−1)²＝5"] },
          { label: "中心 (2, 1)、半径 √5 と答えている", points: 3, keywords: ["(2, 1)", "√5"] },
        ],
        auto: { answerKind: "surd", answer: ["√5"], labels: ["半径"], equations: ["x^2=5"] },
        pt: "x, y それぞれ平方完成",
        st: [["平方完成", "(x−2)²＋(y−1)²＝5。{{中心 (2, 1)、半径 √5}}。"]],
      }),
      wr({
        id: "ek-gen2",
        u: "h-math-2-en",
        d: 2,
        dep: "ek-chushin",
        p: "弦 OP の長さが 2 となるような m の値を求めよ。",
        model:
          "中心 (2, 1) と直線 mx−y＝0 の距離を d とすると、弦の長さは 2√(5−d²)。これが 2 なので d²＝4、d＝2。d＝|2m−1|/√(m²＋1)＝2 より (2m−1)²＝4(m²＋1)、−4m＋1＝4、m＝−3/4。",
        rub: [
          { label: "中心と直線の距離 d を使い、弦の長さを 2√(5−d²) と表している", points: 4, keywords: ["2√(5−d²)", "距離"] },
          { label: "|2m−1|/√(m²＋1)＝2 を立てて解いている", points: 3, keywords: ["|2m−1|", "√(m²＋1)"] },
          { label: "m＝−3/4 と答えている", points: 3, keywords: ["−3/4"] },
        ],
        auto: { answerKind: "num", answer: ["-3/4"], labels: ["m ="], equations: ["(2*m-1)^2=4*(m^2+1)"] },
        pt: "弦の半分・距離・半径で三平方の定理",
        st: [
          ["三平方", "(弦/2)²＋d²＝5 より d＝2。"],
          ["距離の式", "|2m−1|/√(m²＋1)＝2 を2乗して {{m＝−3/4}}。", "y 軸 (x＝0) も弦の長さ 2 だが、y＝mx の形には入らない。"],
        ],
      }),
      wr({
        id: "ek-kiseki",
        u: "h-math-2-kiseki",
        d: 3,
        dep: "ek-chushin",
        p: "m がすべての実数を動くとき、弦 OP の中点 M の軌跡を求めよ。ただし、直線 y＝mx が K に接する場合は除く。",
        model:
          "K の中心を C(2, 1) とすると、CM⊥OP なので ∠OMC＝90° となり、M は OC を直径とする円 (x−1)²＋(y−1/2)²＝5/4、すなわち x²＋y²−2x−y＝0 の上にある。(計算でも、x≠0 のとき P の x 座標は 2(m＋2)/(m²＋1) で、M＝((m＋2)/(m²＋1), m(m＋2)/(m²＋1)) はこの円の式を満たす。) 逆に、この円上の O 以外の点 M に対して直線 OM は K と O 以外の点で交わる。ただし、直線 OM が y 軸となる点 (0, 1) は y＝mx の形にならないので除く。また K に接する場合 (m＝−2) は M＝O となるので O も除く。よって軌跡は、円 x²＋y²−2x−y＝0 から 2点 (0, 0)、(0, 1) を除いたもの。",
        rub: [
          { label: "CM⊥OP (∠OMC＝90°) に気づくか、M の座標を m で表している", points: 4, keywords: ["CM⊥OP", "90°", "(m＋2)/(m²＋1)"] },
          { label: "円 x²＋y²−2x−y＝0 (中心 (1, 1/2)、半径 √5/2) を求めている", points: 5, keywords: ["x²＋y²−2x−y＝0", "(1, 1/2)", "√5/2"] },
          { label: "除く点 (0, 0)、(0, 1) を理由とともに示している", points: 3, keywords: ["(0, 0)", "(0, 1)"] },
        ],
        pt: "弦の中点 ⇔ 中心からの垂線の足。直径 OC の円",
        st: [
          ["図形の性質", "中心から弦に下ろした垂線は弦を2等分する。{{∠OMC＝90°}} で、M は OC を直径とする円の上。"],
          ["除外点", "y 軸に対応する {{(0, 1)}} と、接する場合の {{O}} を除く。", "除く点を書き忘れると減点。m で表せない直線 (x＝0) を確かめる。"],
        ],
      }),
    ],
    "円 K：x²＋y²−4x−2y＝0 と、原点 O を通る直線 y＝mx を考える。直線が K と O 以外の点 P で交わるとき、線分 OP を弦 OP とよぶ。",
  ),
];

export const U_RIKKYO_SUGAKU_BUN: UnivExam = {
  key: KEY,
  univ: "立教大学",
  kamoku: "数学（文系）",
  tier: "MARCH",
  order: 206,
  basis: "一般入試 経済学部・経営学部などの「数学（文系）」(全学部共通問題) の傾向を参考。大学公表の出題意図では大問Ⅰ〜Ⅲの3題",
  format: "60分・大問3題。大問Ⅰは答えのみの小問集合（空欄補充）、大問Ⅱ・Ⅲは途中の過程も書く記述式。",
  minutes: 60,
  groups: ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学C"],
  sections: [
    { title: "第1問　小問集合", lead: LEAD1, count: [5, 5], mix: [0.3, 0.35, 0.35], points: 40, prefer: "material", poolTag: TAG(1) },
    { title: "第2問　記述（確率と漸化式・三角関数・対数）", lead: LEAD2, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 30, prefer: "material", poolTag: TAG(2) },
    { title: "第3問　記述（微分・積分・図形と方程式）", lead: LEAD2, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 30, prefer: "material", poolTag: TAG(3) },
  ],
  pool: [...S1, ...S2, ...S3],
};
