import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Difficulty, NumQ, QuestionC } from "@/lib/moshi/types";

// 上智大学型 数学（文系）。一般選抜 学部学科試験・共通テスト併用方式 経済学部 経済学科の「数学」の形式を参考にした練習用の型。
// 形式: 75分・大問3題・200点。答えは、空所の数値を解答用紙にマークする形 (負の数は符号欄) と、答えだけを書く記述欄、
//   選択肢から1つ選ぶマークの組み合わせ。途中の過程は書かせない。範囲は数学Ⅰ・Ⅱ・A・B（数列）・C（ベクトル）。
//   2次関数・方程式と不等式・微分積分・ベクトル・数列がよく出て、最後の大問は命題・対数・整数・確率などの小問集合になることが多い。
// 問題はすべてこの型のために書き下ろしたもの (過去問の文・数値・設定は使っていない)。答えの数値は sympy で検算した。
// 参考:
//   https://adm.sophia.ac.jp/assets/uploads/sites/2/2026/03/21_2025_EconomicsMath.pdf (経済学部 経済学科 数学: 75分・大問3題・数値のマークと答えのみの記述欄・選択肢のマーク)
//   https://jyuke-labo.com/daigakujyukentaisaku/sophia/keizaigakubu/ (上智経済の数学: 学部学科試験 200点・範囲 数学Ⅰ・Ⅱ・A・B（数列）・C（ベクトル）・マーク式と記述式・確率・数列・ベクトル・関数の最大最小が重点)
//   https://www.sophia.ac.jp/assets/uploads/sites/2/2023/03/2025_shinkateihenkoten.pdf (上智大学 2025年度入試の新課程にともなう変更点)

const KEY = "sophia-sugaku-bun";
const TAG = (i: number) => `${KEY}:${i}`;
const LEAD1 = "次の問いの空欄にあてはまる数・式を答えよ。範囲を問う設問は、答えのみを記述欄に書け。";
const LEAD2 = "次の問いの空欄にあてはまる数を答えよ（数値をマークする形式）。";
const LEAD3 = "次の各問いに答えよ。選択肢のある問いは1つを選び、そのほかは空欄にあてはまる数を答えよ。";

type St = ([string, string] | [string, string, string])[];
type Rub = { label: string; points: number; keywords?: string[] }[];
const steps = (st: St) => st.map(([title, body, trap]) => (trap ? { title, body, trap } : { title, body }));

interface Base {
  id: string;
  u: string;
  d: Difficulty;
  pts: number;
  sec?: number;
  dep?: string;
  p: string;
  pt: string;
  st: St;
}
const head = (q: Base, skill: "知識・技能" | "思考・判断・表現") => ({
  id: q.id,
  type: "C" as const,
  difficulty: q.d,
  points: q.pts,
  seconds: q.sec ?? 360,
  skill,
  unit: q.u,
  ...(q.dep ? { dependsOn: q.dep } : {}),
  prompt: q.p,
  point: q.pt,
  steps: steps(q.st),
});

/** 空所の数値・式 (自動採点) */
function nm(q: Base & { a: Omit<NumQ, "kind"> }): QuestionC {
  return { ...head(q, "知識・技能"), answer: { kind: "num", ...q.a } };
}
/** 選択肢から1つ (マーク) */
function ch(q: Base & { o: string[]; c: number; why: string[] }): QuestionC {
  return { ...head(q, "知識・技能"), answer: { kind: "choice", options: q.o, correct: q.c, why: q.why } };
}
/** 答えのみの記述欄 (範囲など自動採点できないもの) */
function wr(q: Omit<Base, "pts"> & { model: string; rub: Rub }): QuestionC {
  const pts = q.rub.reduce((x, r) => x + r.points, 0);
  return { ...head({ ...q, pts }, "思考・判断・表現"), answer: { kind: "written", model: q.model, rubric: q.rub } };
}

function sec(tag: number, id: string, unit: string, title: string, lead: string, qs: QuestionC[], body?: string): ExamPoolSection {
  return {
    unit,
    tag: TAG(tag),
    section: {
      id: `sophia-sugaku-${tag}-${id}`,
      title,
      lead,
      ...(body ? { material: [{ kind: "text" as const, body }] } : {}),
      questions: qs,
    },
  };
}

const NEC = ["十分条件であるが、必要条件ではない", "必要条件であるが、十分条件ではない", "必要十分条件である", "必要条件でも十分条件でもない"];

// =====================================================================
// 第1問　関数（2次関数・微分積分）
// =====================================================================

const S1: ExamPoolSection[] = [
  sec(
    1,
    "kai-haichi",
    "h-math-1-nijikansu",
    "2次方程式の解と2次関数の最小値",
    LEAD1,
    [
      nm({
        id: "juukai",
        u: "h-math-1-nijihoteishiki",
        d: 1,
        pts: 15,
        p: "方程式 f(x)＝0 が重解をもつような a の値をすべて求めると、a＝□ である。",
        a: { answerKind: "roots", answer: ["2", "-1"], labels: ["a ="], equations: ["a^2-a-2=0"] },
        pt: "判別式 D/4＝a²−(a＋2)＝0",
        st: [["判別式", "D/4＝a²−(a＋2)＝(a−2)(a＋1)＝0 より {{a＝2, −1}}。"]],
      }),
      wr({
        id: "sei-2kai",
        u: "h-math-1-nijihoteishiki",
        d: 2,
        dep: "juukai",
        p: "方程式 f(x)＝0 が異なる2つの正の解をもつような a の値の範囲を求めよ（答えのみ）。",
        model: "D/4＝(a−2)(a＋1)＞0 より a＜−1 または a＞2。軸 x＝a＞0。f(0)＝a＋2＞0 より a＞−2。これらをすべて満たすのは a＞2。",
        rub: [
          { label: "判別式・軸・f(0) の3条件を立てている", points: 7, keywords: ["D", "軸", "f(0)"] },
          { label: "a＞2 と答えている", points: 8, keywords: ["a＞2"] },
        ],
        pt: "判別式・軸の位置・端の値の3点セット",
        st: [
          ["3つの条件", "{{D＞0}}：a＜−1, a＞2。{{軸 a＞0}}。{{f(0)＝a＋2＞0}}：a＞−2。"],
          ["共通部分", "まとめて {{a＞2}}。", "解と係数の関係でも同じ（和 2a＞0、積 a＋2＞0、D＞0）。D＞0 を落とさない。"],
        ],
      }),
      nm({
        id: "nijowa",
        u: "h-math-2-koji",
        d: 2,
        pts: 20,
        dep: "sei-2kai",
        p: "f(x)＝0 が実数解 α, β をもち、α²＋β²＝16 となるような a の値をすべて求めると、a＝□ である。",
        a: { answerKind: "roots", answer: ["5/2", "-2"], labels: ["a ="], equations: ["2a^2-a-10=0"] },
        pt: "α²＋β²＝(α＋β)²−2αβ。実数解の条件も確かめる",
        st: [
          ["解と係数の関係", "α＋β＝2a、αβ＝a＋2 より 4a²−2(a＋2)＝16、{{2a²−a−10＝0}}、(2a−5)(a＋2)＝0。"],
          ["実数解の条件", "D≧0 は a≦−1 または a≧2。a＝5/2、−2 はどちらも満たす。{{a＝5/2, −2}}。", "D≧0 の確認をしないと、条件外の値を答えに入れてしまう問題もある。"],
        ],
      }),
      nm({
        id: "kukan-min",
        u: "h-math-1-saidai",
        d: 3,
        pts: 20,
        sec: 480,
        p: "0≦x≦3 における f(x) の最小値が −2 となるような a の値をすべて求めると、a＝□ である。",
        a: { answerKind: "roots", answer: ["-4", "(1+√17)/2"], labels: ["a ="], equations: ["(a+4)*(a^2-a-4)=0"] },
        pt: "軸 x＝a が区間の左・中・右のどこにあるかで分ける",
        st: [
          ["a＜0", "最小は f(0)＝a＋2＝−2 より a＝−4（a＜0 を満たす）。"],
          ["0≦a≦3", "最小は f(a)＝−a²＋a＋2＝−2 より a²−a−4＝0、a＝(1±√17)/2。範囲に入るのは {{(1＋√17)/2}}（約2.56）。"],
          ["a＞3", "最小は f(3)＝11−5a＝−2 より a＝13/5 で a＞3 を満たさない。よって {{a＝−4, (1＋√17)/2}}。", "各場合で出た値が、その場合の範囲に入るかを必ず確かめる。"],
        ],
      }),
    ],
    "a を実数の定数とし、f(x)＝x²−2ax＋a＋2 とする。",
  ),
  sec(
    1,
    "sanji-kyokuchi",
    "h-math-2-bibun",
    "3次関数の極値と実数解の個数",
    LEAD1,
    [
      nm({
        id: "kyokudai",
        u: "h-math-2-bibun",
        d: 1,
        pts: 15,
        p: "f(x) の極大値を a を用いて表すと □ である。",
        a: { answerKind: "expr", answer: ["3a-1"] },
        pt: "f′(x)＝6(x−1)(x−a)。a＞1 なので x＝1 で極大",
        st: [
          ["微分", "f′(x)＝6x²−6(a＋1)x＋6a＝{{6(x−1)(x−a)}}。a＞1 より x＝1 で極大、x＝a で極小。"],
          ["代入", "f(1)＝2−3(a＋1)＋6a＝{{3a−1}}。"],
        ],
      }),
      nm({
        id: "sa",
        u: "h-math-2-bibun",
        d: 2,
        pts: 15,
        dep: "kyokudai",
        p: "f(x) の極大値と極小値の差が 27/8 となるとき、a＝□ である。",
        a: { answerKind: "num", answer: ["5/2"], labels: ["a ="], equations: ["(a-1)^3=27/8"] },
        pt: "極大値−極小値＝(a−1)³ ときれいに因数分解できる",
        st: [
          ["極小値", "f(a)＝2a³−3(a＋1)a²＋6a²＝−a³＋3a²。"],
          ["差", "(3a−1)−(−a³＋3a²)＝a³−3a²＋3a−1＝{{(a−1)³}}＝27/8 より a−1＝3/2、{{a＝5/2}}。"],
        ],
      }),
      nm({
        id: "kyokusho-zero",
        u: "h-math-2-bibun",
        d: 2,
        pts: 20,
        dep: "sa",
        p: "f(x) の極小値が 0 となるとき、a＝□ である。",
        a: { answerKind: "num", answer: ["3"], labels: ["a ="], equations: ["-a^3+3a^2=0"] },
        pt: "極小値 −a²(a−3)＝0 と a＞1",
        st: [["解く", "−a³＋3a²＝−a²(a−3)＝0。a＞1 より {{a＝3}}。", "a＝0 は条件 a＞1 に合わない。"]],
      }),
      wr({
        id: "3kai",
        u: "h-math-2-bibun",
        d: 3,
        sec: 480,
        dep: "kyokusho-zero",
        p: "方程式 f(x)＝0 が異なる3つの実数解をもつような a の値の範囲を求めよ（答えのみ）。",
        model:
          "f(x)＝x{2x²−3(a＋1)x＋6a} で x＝0 は解。2x²−3(a＋1)x＋6a＝0 が 0 以外の異なる2つの実数解をもてばよい。判別式 9(a＋1)²−48a＝3(3a−1)(a−3)＞0、x＝0 を解にもたない条件 6a≠0。a＞1 と合わせて a＞3。（極大値 3a−1＞0 かつ 極小値 −a²(a−3)＜0 からも同じ。）",
        rub: [
          { label: "x＝0 を解にもつことに気づき、残りの2次方程式（または極大値＞0・極小値＜0）の条件を立てている", points: 10, keywords: ["x＝0", "判別式", "極小値＜0"] },
          { label: "a＞3 と答えている", points: 10, keywords: ["a＞3"] },
        ],
        pt: "極大値＞0 かつ 極小値＜0 でも判定できる",
        st: [
          ["グラフで見る", "3つの実数解 ⇔ {{極大値＞0 かつ 極小値＜0}}。"],
          ["条件", "3a−1＞0 は a＞1 で成り立つ。−a²(a−3)＜0 より a＞3。よって {{a＞3}}。", "(3) の a＝3 では極小値が 0 で、解は2個（重解あり）になる。"],
        ],
      }),
    ],
    "a を a＞1 を満たす定数とし、f(x)＝2x³−3(a＋1)x²＋6ax とする。",
  ),
  sec(
    1,
    "kyotsu-sessen",
    "h-math-2-sekibun",
    "2つの放物線の共通接線と面積",
    LEAD1,
    [
      nm({
        id: "sessen-shiki",
        u: "h-math-2-bibun",
        d: 1,
        pts: 15,
        p: "C₁ と C₂ の両方に接する直線 ℓ の方程式は y＝□ である。",
        a: { answerKind: "expr", answer: ["x-1/4"], labels: ["y ="] },
        pt: "C₁ の接線 y＝2tx−t² が C₂ に接する条件（判別式 0）",
        st: [
          ["C₁ の接線", "x＝t での接線は y＝2tx−t²。"],
          ["C₂ に接する", "x²−8x＋20＝2tx−t² の判別式 D/4＝(4＋t)²−(20＋t²)＝8t−4＝0 より t＝1/2。{{y＝x−1/4}}。"],
        ],
      }),
      nm({
        id: "menseki",
        u: "h-math-2-sekibun",
        d: 2,
        pts: 15,
        dep: "sessen-shiki",
        p: "C₁、C₂ と ℓ で囲まれた部分の面積は □ である。",
        a: { answerKind: "num", answer: ["16/3"], calc: "8/3+8/3" },
        pt: "接点は x＝1/2 と 9/2、C₁ と C₂ の交点は x＝5/2",
        st: [
          ["境目", "C₁ と C₂ の交点は x²＝x²−8x＋20 より x＝5/2。接点は C₁ 上 x＝1/2、C₂ 上 x＝9/2。"],
          ["積分", "∫[1/2→5/2](x−1/2)²dx＋∫[5/2→9/2](x−9/2)²dx＝8/3＋8/3＝{{16/3}}。", "被積分関数は「放物線−接線」＝(x−接点)² になる。"],
        ],
      }),
      wr({
        id: "2ten",
        u: "h-math-2-bibun",
        d: 2,
        dep: "menseki",
        p: "C₁ 上の点 (s, s²) における C₁ の接線が、C₂ と異なる2点で交わるような s の値の範囲を求めよ（答えのみ）。",
        model: "接線 y＝2sx−s² と C₂ の式から x²−(8＋2s)x＋20＋s²＝0。判別式 D/4＝(4＋s)²−(20＋s²)＝8s−4＞0 より s＞1/2。",
        rub: [
          { label: "接線と C₂ を連立した2次方程式の判別式を立てている", points: 10, keywords: ["判別式", "8s−4"] },
          { label: "s＞1/2 と答えている", points: 10, keywords: ["s＞1/2"] },
        ],
        pt: "(1) の計算の t を s にして D＞0",
        st: [["判別式", "(1) と同じ式で {{8s−4＞0}}、s＞1/2。", "D＝0 が共通接線（s＝1/2）。"]],
      }),
      nm({
        id: "menseki2",
        u: "h-math-2-sekibun",
        d: 3,
        pts: 20,
        sec: 480,
        dep: "2ten",
        p: "s＝5/2 のとき、(3) の接線と C₂ で囲まれた部分の面積は □ である。",
        a: { answerKind: "num", answer: ["256/3"], calc: "8^3/6" },
        pt: "放物線と直線で囲む面積は (β−α)³/6",
        st: [
          ["交点", "y＝5x−25/4 と C₂ から x²−13x＋105/4＝0、x＝5/2, 21/2。β−α＝8。"],
          ["公式", "面積＝(β−α)³/6＝512/6＝{{256/3}}。", "x² の係数が1なので 1/6 公式がそのまま使える。"],
        ],
      }),
    ],
    "2つの放物線 C₁：y＝x²、C₂：y＝x²−8x＋20 がある。",
  ),
];

// =====================================================================
// 第2問　ベクトル・数列
// =====================================================================

const S2: ExamPoolSection[] = [
  sec(
    2,
    "heimen",
    "h-math-c-heimen",
    "三角形と平面ベクトル",
    LEAD2,
    [
      nm({
        id: "ab",
        u: "h-math-c-heimen",
        d: 1,
        pts: 15,
        p: "辺ABの長さは □ である。",
        a: { answerKind: "surd", answer: ["√7"], equations: ["x^2=7"] },
        pt: "|b−a|²＝|b|²−2a·b＋|a|²",
        st: [["展開", "|AB→|²＝4−2·3＋9＝7 より {{AB＝√7}}。"]],
      }),
      nm({
        id: "kouten",
        u: "h-math-c-heimen",
        d: 2,
        pts: 15,
        dep: "ab",
        p: "辺OAを 2:1 に内分する点をC、辺OBの中点をDとし、線分ADと線分BCの交点をEとする。OE→＝s·OA→＋t·OB→ と表すと (s, t)＝□ である。",
        a: { answerKind: "pair", answer: ["1/2", "1/4"], labels: ["s =", "t ="], equations: ["s+2*t=1", "3*s/2+t=1"] },
        pt: "2通りに表して係数比較（a→, b→ は1次独立）",
        st: [
          ["AD 上", "OE→＝(1−u)a→＋(u/2)b→。"],
          ["BC 上", "OE→＝(2v/3)a→＋(1−v)b→。係数を比べて u＝1/2、v＝3/4、{{(s, t)＝(1/2, 1/4)}}。", "係数比較の前に a→, b→ が平行でないことを確かめる。"],
        ],
      }),
      nm({
        id: "oe",
        u: "h-math-c-heimen",
        d: 2,
        pts: 20,
        dep: "kouten",
        p: "線分OEの長さは □ である。",
        a: { answerKind: "surd", answer: ["√13/2"], equations: ["x^2=13/4"] },
        pt: "|a/2＋b/4|² を展開",
        st: [["展開", "|OE→|²＝9/4＋2·(1/8)·3＋4/16＝13/4 より {{OE＝√13/2}}。", "交差項は 2×(1/2)(1/4)×a·b。2倍を忘れない。"]],
      }),
      nm({
        id: "ode",
        u: "h-math-c-heimen",
        d: 3,
        pts: 20,
        sec: 480,
        dep: "oe",
        p: "三角形ODEの面積は □ である。",
        a: { answerKind: "surd", answer: ["3√3/8"], equations: ["x^2=27/64"] },
        pt: "△OAB＝(1/2)√(|a|²|b|²−(a·b)²) と面積比",
        st: [
          ["△OAB", "(1/2)√(9·4−9)＝3√3/2。"],
          ["面積比", "OD→＝(1/2)b→、OE→＝(1/2)a→＋(1/4)b→。△ODE は △OAB の |0·1/4−1/2·1/2|＝1/4 倍で {{3√3/8}}。", "△OBE＝(1/2)△OAB（EはADの中点）の半分、と見てもよい。"],
        ],
      }),
    ],
    "三角形OABにおいて、OA→＝a→、OB→＝b→ とし、|a→|＝3、|b→|＝2、a→·b→＝3 とする。",
  ),
  sec(
    2,
    "suretsu",
    "h-math-b-tosa",
    "和から定まる数列",
    LEAD2,
    [
      nm({
        id: "ippan",
        u: "h-math-b-tosa",
        d: 1,
        pts: 15,
        p: "一般項は aₙ＝□ である。",
        a: { answerKind: "expr", answer: ["6n-4"], labels: ["aₙ ="] },
        pt: "aₙ＝Sₙ−Sₙ₋₁（n≧2）、a₁＝S₁ を確かめる",
        st: [["差をとる", "n≧2 で aₙ＝(3n²−n)−{3(n−1)²−(n−1)}＝6n−4。a₁＝S₁＝2 も満たすので {{aₙ＝6n−4}}。", "n＝1 のときを別に確かめる。"]],
      }),
      nm({
        id: "bunsu-wa",
        u: "h-math-b-sigma",
        d: 2,
        pts: 15,
        dep: "ippan",
        p: "Σ[k＝1→20] 1/(aₖaₖ₊₁)＝□ である。",
        a: { answerKind: "num", answer: ["5/61"], calc: "20/(4*61)" },
        pt: "部分分数に分けて差の和",
        st: [
          ["分ける", "aₖaₖ₊₁＝4(3k−2)(3k＋1)。1/(aₖaₖ₊₁)＝(1/12){1/(3k−2)−1/(3k＋1)}。"],
          ["和", "(1/12)(1−1/61)＝{{5/61}}。", "係数 1/12（＝1/4×1/3）を落とさない。"],
        ],
      }),
      nm({
        id: "5bai",
        u: "h-math-b-sigma",
        d: 2,
        pts: 20,
        dep: "bunsu-wa",
        p: "a₁, a₂, …, a₁₀₀ のうち 5 の倍数であるものの和は □ である。",
        a: { answerKind: "num", answer: ["6100"], calc: "6*(20*(4+99)/2)-4*20" },
        pt: "6n−4≡0（mod 5）⇔ n≡4（mod 5）",
        st: [
          ["条件", "6n−4≡n−4≡0（mod 5）より {{n＝4, 9, …, 99}}（20個）。"],
          ["和", "Σ(6n−4)＝6·(20·103/2)−80＝6180−80＝{{6100}}。"],
        ],
      }),
      nm({
        id: "2beki",
        u: "h-math-b-sigma",
        d: 3,
        pts: 20,
        sec: 480,
        dep: "5bai",
        p: "T＝Σ[k＝1→10] aₖ·2ᵏ の値は □ である。",
        a: { answerKind: "num", answer: ["102420"], calc: "(6*10-10)*2^11+20" },
        pt: "T−2T をつくる（等差×等比の和）",
        st: [
          ["ずらす", "2T と T を並べて引くと、−T＝a₁·2＋6(2²＋…＋2¹⁰)−a₁₀·2¹¹＝4＋6·(2¹¹−4)−56·2048。"],
          ["計算", "−T＝4＋12264−114688＝−102420 より {{T＝102420}}。", "最後の項 a₁₀·2¹¹ の符号に注意。一般に T＝(6n−10)·2ⁿ⁺¹＋20。"],
        ],
      }),
    ],
    "数列 {aₙ} の初項から第 n 項までの和 Sₙ が Sₙ＝3n²−n (n＝1, 2, 3, …) で与えられている。",
  ),
  sec(
    2,
    "kukan",
    "h-math-c-kukan",
    "空間の四面体",
    LEAD2,
    [
      nm({
        id: "cos",
        u: "h-math-c-kukan",
        d: 1,
        pts: 15,
        p: "cos∠AOB＝□ である。",
        a: { answerKind: "num", answer: ["2/5"], calc: "2/(5)" },
        pt: "成分で内積と大きさ",
        st: [["内積", "OA→·OB→＝2、|OA→|＝|OB→|＝√5 より {{cos∠AOB＝2/5}}。"]],
      }),
      nm({
        id: "oab",
        u: "h-math-c-kukan",
        d: 2,
        pts: 15,
        dep: "cos",
        p: "三角形OABの面積は □ である。",
        a: { answerKind: "surd", answer: ["√21/2"], equations: ["x^2=21/4"] },
        pt: "(1/2)√(|OA|²|OB|²−(OA·OB)²)",
        st: [["公式", "(1/2)√(5·5−2²)＝{{√21/2}}。"]],
      }),
      nm({
        id: "taiseki",
        u: "h-math-c-kukan",
        d: 2,
        pts: 20,
        dep: "oab",
        p: "四面体OABCの体積は □ である。",
        a: { answerKind: "num", answer: ["3/2"], calc: "9/6" },
        pt: "平面ABCの方程式を求め、Oとの距離から出す方法もある",
        st: [
          ["平面ABC", "A, B, C はどれも x＋y＋z＝3 を満たすので、平面ABC は {{x＋y＋z＝3}}。"],
          ["体積", "△ABC は AB→＝(−1, 2, −1)、AC→＝(−2, 1, 1) で、|AB|²|AC|²−(AB·AC)²＝36−9＝27、面積 3√3/2。O との距離 √3 から V＝(1/3)(3√3/2)√3＝{{3/2}}。"],
        ],
      }),
      nm({
        id: "kyori",
        u: "h-math-c-kukan",
        d: 3,
        pts: 20,
        sec: 480,
        dep: "taiseki",
        p: "点Pが平面ABC上を動くとき、線分OPの長さの最小値は □ である。",
        a: { answerKind: "surd", answer: ["√3"], equations: ["x^2=3"] },
        pt: "最小は O から平面ABC までの距離",
        st: [
          ["距離", "平面 x＋y＋z＝3 と原点の距離 |−3|/√3＝{{√3}}。"],
          ["確かめ", "3V＝△ABC×d より d＝(9/2)/(3√3/2)＝√3 でも同じ。", "OG（G は重心 (1, 1, 1)）の長さも √3。G がちょうど最も近い点になっている。"],
        ],
      }),
    ],
    "座標空間に 4点 O(0, 0, 0)、A(2, 0, 1)、B(1, 2, 0)、C(0, 1, 2) がある。",
  ),
];

// =====================================================================
// 第3問　小問集合（命題・指数対数・確率・整数・三角関数）
// =====================================================================

const S3: ExamPoolSection[] = [
  sec(3, "a", "h-math-1-shugo", "小問集合（命題・対数・確率・整数・三角関数）", LEAD3, [
    ch({
      id: "meidai",
      u: "h-math-1-shugo",
      d: 1,
      pts: 12,
      sec: 240,
      p: "実数 x について、「x²＝2x」は「x＝2」であるための □。次から1つ選べ。",
      o: NEC,
      c: 1,
      why: [
        "x＝0 でも x²＝2x が成り立つので、「x²＝2x ⇒ x＝2」は偽。十分条件ではない。",
        "正しい。x＝2 ⇒ x²＝2x は真、逆は x＝0 が反例。",
        "逆の「x²＝2x ⇒ x＝2」が x＝0 で成り立たない。",
        "「x＝2 ⇒ x²＝2x」は真なので必要条件ではある。",
      ],
      pt: "p⇒q が真なら p は十分条件、q は必要条件",
      st: [["2方向", "x＝2 ⇒ x²＝2x は真。x²＝2x ⇒ x＝2 は x＝0 が反例で偽。よって {{必要条件だが十分条件ではない}}。", "「〜は〜であるための」の向きを取り違えない。"]],
    }),
    nm({
      id: "taisu",
      u: "h-math-2-taisu",
      d: 2,
      pts: 12,
      sec: 300,
      p: "方程式 log₂(x−1)＋log₂(x＋5)＝4 の解は x＝□ である。",
      a: { answerKind: "num", answer: ["3"], labels: ["x ="], equations: ["(x-1)*(x+5)=16"] },
      pt: "真数条件 x＞1 を先に書く",
      st: [["まとめる", "真数条件 x＞1。(x−1)(x＋5)＝16 より x²＋4x−21＝0、(x＋7)(x−3)＝0。{{x＝3}}。", "x＝−7 は真数条件をみたさない。"]],
    }),
    nm({
      id: "card",
      u: "h-math-a-kakuritsu",
      d: 2,
      pts: 12,
      sec: 300,
      p: "1, 2, 3, 4, 5 の数字が1つずつ書かれた5枚のカードを無作為に1列に並べるとき、奇数のカードどうしが隣り合わない確率は □ である。",
      a: { answerKind: "num", answer: ["1/10"], calc: "2*6/120" },
      pt: "偶数を先に並べ、すき間に奇数を入れる",
      st: [["すき間", "偶数2枚の並べ方 2! 通り。両端と間の3か所に奇数3枚を1枚ずつ 3! 通り。{{12/120＝1/10}}。"]],
    }),
    nm({
      id: "amari",
      u: "h-math-a-gojo",
      d: 2,
      pts: 12,
      sec: 300,
      p: "3¹⁰⁰ を 7 で割った余りは □ である。",
      a: { answerKind: "num", answer: ["4"], calc: "81-77" },
      pt: "3ᵏ を 7 で割った余りは周期 6",
      st: [["周期", "3, 2, 6, 4, 5, 1 と {{3⁶≡1}}（mod 7）。100＝6·16＋4 より 3¹⁰⁰≡3⁴＝81≡{{4}}。"]],
    }),
    nm({
      id: "sincos",
      u: "h-math-2-sankaku",
      d: 3,
      pts: 12,
      sec: 360,
      p: "sinθ＋cosθ＝1/2 のとき、sin³θ＋cos³θ＝□ である。",
      a: { answerKind: "num", answer: ["11/16"], calc: "(1/2)*(1+3/8)" },
      pt: "両辺を2乗して sinθcosθ を出す",
      st: [
        ["積", "1＋2sinθcosθ＝1/4 より {{sinθcosθ＝−3/8}}。"],
        ["3乗の和", "(s＋c)(s²−sc＋c²)＝(1/2)(1＋3/8)＝{{11/16}}。", "s²＋c²＝1 を使う。−sc の符号に注意。"],
      ],
    }),
  ]),
  sec(3, "b", "h-math-a-yakusu", "小問集合（命題・指数・確率・整数・三角関数）", LEAD3, [
    ch({
      id: "meidai",
      u: "h-math-1-shugo",
      d: 1,
      pts: 12,
      sec: 240,
      p: "整数 n について、「n² が 3 の倍数である」は「n が 3 の倍数である」ための □。次から1つ選べ。",
      o: NEC,
      c: 2,
      why: [
        "逆の「n が3の倍数 ⇒ n² が3の倍数」も真なので、必要条件でもある。",
        "「n² が3の倍数 ⇒ n が3の倍数」も真（対偶で示せる）なので、十分条件でもある。",
        "正しい。両方向とも真。",
        "どちらの向きも真である。",
      ],
      pt: "n が3の倍数でないとき n²≡1（mod 3）",
      st: [["対偶", "n＝3k±1 なら n²＝3(3k²±2k)＋1 で3の倍数でない。よって n² が3の倍数 ⇒ n が3の倍数。逆も明らか。{{必要十分条件}}。"]],
    }),
    nm({
      id: "shisu",
      u: "h-math-2-shisu",
      d: 2,
      pts: 12,
      sec: 300,
      p: "方程式 4ˣ−3·2ˣ⁺¹＋8＝0 の解は x＝□ である。",
      a: { answerKind: "roots", answer: ["1", "2"], labels: ["x ="], equations: ["x^2-3x+2=0"] },
      pt: "2ˣ＝t（t＞0）とおく",
      st: [["置きかえ", "t²−6t＋8＝0 より t＝2, 4。2ˣ＝2, 4 から {{x＝1, 2}}。", "3·2ˣ⁺¹＝6·2ˣ。係数を 3 のままにしない。"]],
    }),
    nm({
      id: "janken",
      u: "h-math-a-kakuritsu",
      d: 2,
      pts: 12,
      sec: 300,
      p: "4人が1回じゃんけんをするとき、あいこになる確率は □ である。",
      a: { answerKind: "num", answer: ["13/27"], calc: "1-3*(2^4-2)/81" },
      pt: "勝負がつく＝出た手がちょうど2種類",
      st: [["余事象", "勝負がつくのは手が2種類のとき：2種類の選び方3通り×(2⁴−2) 通り＝42 通り。あいこは 1−42/81＝{{13/27}}。", "全員同じ手（2⁴ から引く2通り）は2種類ではない。"]],
    }),
    nm({
      id: "futei",
      u: "h-math-a-yakusu",
      d: 2,
      pts: 12,
      sec: 300,
      p: "7x＋11y＝1 を満たす整数の組 (x, y) のうち、x が正で最小となるものは (x, y)＝□ である。",
      a: { answerKind: "pair", answer: ["8", "-5"], labels: ["x =", "y ="], equations: ["7*x+11*y=1"] },
      pt: "7x≡1（mod 11）を満たす最小の正の x",
      st: [["1つ見つける", "7×8＝56＝55＋1 より x＝8、y＝−5。一般解は x＝8＋11m、y＝−5−7m で、正で最小は {{(8, −5)}}。"]],
    }),
    nm({
      id: "gousei",
      u: "h-math-2-kahou",
      d: 3,
      pts: 12,
      sec: 360,
      p: "0≦θ≦π/2 のとき、y＝sin²θ＋2√3 sinθcosθ−cos²θ の最大値を M、最小値を m とすると、M−m＝□ である。",
      a: { answerKind: "num", answer: ["3"], calc: "2-(-1)" },
      pt: "2倍角で直してから合成",
      st: [
        ["2倍角", "y＝√3 sin2θ−cos2θ＝{{2sin(2θ−π/6)}}。"],
        ["範囲", "−π/6≦2θ−π/6≦5π/6 より −1/2≦sin≦1、M＝2、m＝−1、{{M−m＝3}}。", "2θ の範囲にしてから考える。"],
      ],
    }),
  ]),
  sec(3, "c", "h-math-2-taisu", "小問集合（命題・対数・期待値・二項定理・三角方程式）", LEAD3, [
    ch({
      id: "meidai",
      u: "h-math-1-shugo",
      d: 1,
      pts: 12,
      sec: 240,
      p: "実数 x, y について、「x＞1 かつ y＞1」は「x＋y＞2 かつ xy＞1」であるための □。次から1つ選べ。",
      o: NEC,
      c: 0,
      why: [
        "正しい。x＞1, y＞1 ⇒ x＋y＞2, xy＞1 は真。逆は x＝3, y＝1/2 が反例。",
        "向きが逆。「x＞1 かつ y＞1」から右の条件が出る。",
        "x＝3, y＝1/2 は右の条件を満たすが左を満たさない。",
        "「x＞1 かつ y＞1 ⇒ x＋y＞2 かつ xy＞1」は真なので、十分条件である。",
      ],
      pt: "逆は反例を1つ探す",
      st: [["反例", "x＝3, y＝1/2 は x＋y＝7/2＞2、xy＝3/2＞1 だが y＜1。よって {{十分条件だが必要条件ではない}}。"]],
    }),
    nm({
      id: "taisu",
      u: "h-math-2-taisu",
      d: 2,
      pts: 12,
      sec: 300,
      p: "実数 a, b が 2ᵃ＝3ᵇ＝36 を満たすとき、1/a＋1/b＝□ である。",
      a: { answerKind: "num", answer: ["1/2"], calc: "1/2" },
      pt: "底 36 の対数をとる",
      st: [["対数", "a＝log₂36 より 1/a＝log₃₆2、同様に 1/b＝log₃₆3。和は log₃₆6＝{{1/2}}。", "逆数にすると底と真数が入れかわる。"]],
    }),
    nm({
      id: "kitaichi",
      u: "h-math-a-kakuritsu",
      d: 2,
      pts: 12,
      sec: 300,
      p: "1個のさいころを2回投げ、出た目のうち大きいほう（同じときはその目）を X とする。X の期待値は □ である。",
      a: { answerKind: "num", answer: ["161/36"], calc: "(1*1+2*3+3*5+4*7+5*9+6*11)/36" },
      pt: "P(X≦k)＝(k/6)² から P(X＝k)＝(2k−1)/36",
      st: [
        ["分布", "P(X＝k)＝(k²−(k−1)²)/36＝{{(2k−1)/36}}。"],
        ["期待値", "Σk(2k−1)/36＝(1＋6＋15＋28＋45＋66)/36＝{{161/36}}。"],
      ],
    }),
    nm({
      id: "nikou",
      u: "h-math-2-shomei",
      d: 2,
      pts: 12,
      sec: 300,
      p: "₁₀C₀＋₁₀C₂＋₁₀C₄＋₁₀C₆＋₁₀C₈＋₁₀C₁₀＝□ である。",
      a: { answerKind: "num", answer: ["512"], calc: "2^9" },
      pt: "(1＋1)¹⁰ と (1−1)¹⁰ を足す",
      st: [["二項定理", "(1＋1)¹⁰＋(1−1)¹⁰＝2×(偶数番目の和) より、和＝2¹⁰/2＝{{512}}。"]],
    }),
    nm({
      id: "hoteishiki",
      u: "h-math-2-sankaku",
      d: 3,
      pts: 12,
      sec: 360,
      p: "0≦x＜2π において、方程式 cos2x＋3sinx＝2 の解の個数は □ 個である。",
      a: { answerKind: "num", answer: ["3"], unit: "個", calc: "1+2" },
      pt: "cos2x＝1−2sin²x で sinx の2次方程式に",
      st: [
        ["sin にそろえる", "1−2s²＋3s＝2 より 2s²−3s＋1＝0、{{s＝1, 1/2}}。"],
        ["個数", "sinx＝1 は x＝π/2 の1個、sinx＝1/2 は π/6, 5π/6 の2個で {{3個}}。", "sinx＝1 は1個しかない（2個と数えない）。"],
      ],
    }),
  ]),
];

export const U_SOPHIA_SUGAKU_BUN: UnivExam = {
  key: KEY,
  univ: "上智大学",
  kamoku: "数学（文系）",
  tier: "早慶上智",
  order: 203,
  basis: "経済学部 経済学科（学部学科試験・共通テスト併用方式）の数学の傾向を参考",
  format: "75分・大問3題・200点。空所の数値をマーク・答えのみの記述欄・選択肢マークの組み合わせ。最後は小問集合。",
  minutes: 75,
  groups: ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学C"],
  sections: [
    { title: "第1問　関数（2次関数・微分積分）", lead: LEAD1, count: [4, 4], mix: [0.25, 0.5, 0.25], points: 70, prefer: "material", poolTag: TAG(1) },
    { title: "第2問　ベクトル・数列", lead: LEAD2, count: [4, 4], mix: [0.25, 0.5, 0.25], points: 70, prefer: "material", poolTag: TAG(2) },
    { title: "第3問　小問集合", lead: LEAD3, count: [5, 5], mix: [0.2, 0.6, 0.2], points: 60, prefer: "material", poolTag: TAG(3) },
  ],
  pool: [...S1, ...S2, ...S3],
};
