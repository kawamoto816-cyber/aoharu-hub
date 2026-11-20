import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Difficulty, NumQ, QuestionC } from "@/lib/moshi/types";

// 明治大学型 数学（文系）。一般選抜 学部別入学試験 商学部の数学の形式を参考にした練習用の型。
// 形式: 60分・100点・大問3題。第1問は小問集合（数値をマークする）、第2問は誘導つきの空所補充（数値をマークする）、
//   第3問は途中の過程も書く記述式。範囲は数学Ⅰ・Ⅱ・A・B（数列）・C（ベクトル）。微分積分・場合の数と確率・数列・ベクトルがよく出る。
// 問題はすべてこの型のために書き下ろしたもの (過去問の文・数値・設定は使っていない)。答えの数値は sympy で検算した。
// 参考:
//   https://manabi.benesse.ne.jp/daigaku/school/3318/nyushi/shou/ (商学部 学部別入試: 数学100点、数学Ⅰ・Ⅱ・A・B・C)
//   https://jyuke-labo.com/daigakujyukentaisaku/meijidaigaku/kamokubetsu/ (明治 文系学部の数学: 60分・100点、二次関数・三角関数・指数対数・確率・数列・ベクトルが頻出)
//   https://kateikyoushicamp.jp/meiji-syo/ (明治商学部 数学: 大問3題。第1問マーク式の小問集合、第2問数値を入れるマーク式、第3問記述式)
//   https://www.daigaku-goukaku.net/school-special/meiji/faculty/com/math.html (明治商学部 数学: 60分・大問3題、マーク・記述併用。微積分・場合の数・確率が頻出)

const KEY = "meiji-sugaku-bun";
const TAG = (i: number) => `${KEY}:${i}`;
const LEAD1 = "次の各問の空欄にあてはまる数を答えよ。答えのみを記入せよ。";
const LEAD2 = "次の文章の空欄にあてはまる数または式を答えよ。答えのみを記入せよ。";
const LEAD3 = "次の問いに答えよ。解答は答えだけでなく、途中の過程も記述せよ。";

type St = ([string, string] | [string, string, string])[];
type Rub = { label: string; points: number; keywords?: string[] }[];
const steps = (st: St) => st.map(([title, body, trap]) => (trap ? { title, body, trap } : { title, body }));

interface N {
  id: string;
  u: string;
  d: Difficulty;
  p: string;
  a: Omit<NumQ, "kind">;
  pts?: number;
  sec?: number;
  dep?: string;
  pt: string;
  st: St;
}
/** 数値を答える1問 (自動採点) */
function nm(q: N): QuestionC {
  return {
    id: q.id,
    type: "C",
    difficulty: q.d,
    points: q.pts ?? 8,
    seconds: q.sec ?? 240,
    skill: "知識・技能",
    unit: q.u,
    ...(q.dep ? { dependsOn: q.dep } : {}),
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
  sec?: number;
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
    seconds: q.sec ?? 400,
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
      id: `meiji-sugaku-${tag}-${id}`,
      title,
      lead,
      ...(body ? { material: [{ kind: "text" as const, body }] } : {}),
      questions: qs,
    },
  };
}

// =====================================================================
// 第1問　小問集合（答えのみ）  どの節も5問・難易度 1,1,2,2,3
// =====================================================================

const S1: ExamPoolSection[] = [
  sec(1, "a", "h-math-1-nijihoteishiki", "小問集合（2次方程式・三角関数・確率・対数・数列）", LEAD1, [
    nm({
      id: "kai-nijowa",
      u: "h-math-1-nijihoteishiki",
      d: 1,
      p: "2次方程式 x²−4x＋k＝0 の2つの解を α、β とする。α²＋β²＝10 となるとき、定数 k の値は k＝□ である。",
      a: { answerKind: "num", answer: ["3"], labels: ["k ="], equations: ["16-2*k=10"] },
      pt: "α²＋β²＝(α＋β)²−2αβ に解と係数の関係を入れる",
      st: [
        ["解と係数の関係", "α＋β＝4、αβ＝k。"],
        ["式を立てる", "α²＋β²＝16−2k＝10 より {{k＝3}}。このとき判別式 16−12＞0 で実数解になっている。"],
      ],
    }),
    nm({
      id: "sin-cos-seki",
      u: "h-math-2-sankaku",
      d: 1,
      p: "0＜θ＜π で sinθ＋cosθ＝1/2 のとき、sinθcosθ＝□ である。",
      a: { answerKind: "num", answer: ["-3/8"], calc: "((1/2)^2-1)/2" },
      pt: "両辺を2乗して sin²θ＋cos²θ＝1 を使う",
      st: [
        ["2乗する", "1＋2sinθcosθ＝1/4。"],
        ["解く", "{{sinθcosθ＝−3/8}}。", "2乗したあと sin²θ＋cos²θ を1にまとめ忘れない。"],
      ],
    }),
    nm({
      id: "janken-aiko",
      u: "h-math-a-kakuritsu",
      d: 2,
      p: "5人が1回じゃんけんをするとき、あいこになる確率は □ である。",
      a: { answerKind: "num", answer: ["17/27"], calc: "1-3*(2^5-2)/3^5" },
      pt: "余事象「勝負が決まる＝出た手がちょうど2種類」を数える",
      st: [
        ["勝負が決まる場合", "出る手の2種類の選び方が3通り、その2種類だけで全員の手を決め、1種類だけの場合を除くと 2⁵−2＝30 通り。計 90 通り。"],
        ["余事象", "全体 3⁵＝243 通りなので、あいこは 1−90/243＝{{17/27}}。", "「全員同じ手」も「3種類全部出る」もあいこ。片方だけ数えない。"],
      ],
    }),
    nm({
      id: "keta-6-20",
      u: "h-math-2-taisu",
      d: 2,
      p: "log₁₀2＝0.3010、log₁₀3＝0.4771 とする。6²⁰ は □ 桁の整数である。",
      a: { answerKind: "num", answer: ["16"], unit: "桁", calc: "16" },
      pt: "log₁₀N の整数部分＋1 が桁数",
      st: [
        ["対数をとる", "log₁₀6²⁰＝20(0.3010＋0.4771)＝15.562。"],
        ["桁数", "10¹⁵≦6²⁰＜10¹⁶ なので {{16桁}}。", "log の値 15 をそのまま桁数にしない。"],
      ],
    }),
    nm({
      id: "bubun-bunsu",
      u: "h-math-b-sigma",
      d: 3,
      p: "Σ（k＝1 から 20）1/{k(k＋1)(k＋2)}＝□ である。",
      a: { answerKind: "num", answer: ["115/462"], calc: "(1/2)*(1/2-1/(21*22))" },
      pt: "1/{k(k＋1)} と 1/{(k＋1)(k＋2)} の差に分ける",
      st: [
        ["部分分数", "1/{k(k＋1)(k＋2)}＝(1/2){1/(k(k＋1))−1/((k＋1)(k＋2))}。"],
        ["和", "中が消えて (1/2){1/2−1/(21·22)}＝(1/2)(230/462)＝{{115/462}}。", "残るのは最初の項と最後の項。係数 1/2 を忘れない。"],
      ],
    }),
  ]),
  sec(1, "b", "h-math-2-chokusen", "小問集合（直線・ベクトル・確率・対数・微分）", LEAD1, [
    nm({
      id: "suichoku-nitoubunsen",
      u: "h-math-2-chokusen",
      d: 1,
      p: "2点 A(1, 2)、B(5, −2) を結ぶ線分 AB の垂直二等分線の y 切片は □ である。",
      a: { answerKind: "num", answer: ["-3"], calc: "0-1*3" },
      pt: "中点を通り、AB に垂直な直線",
      st: [
        ["中点と傾き", "中点は (3, 0)。AB の傾きは −1 なので、垂直な直線の傾きは 1。"],
        ["直線", "y＝x−3。y 切片は {{−3}}。"],
      ],
    }),
    nm({
      id: "vec-suichoku",
      u: "h-math-c-heimen",
      d: 1,
      p: "a→＝(2, 1)、b→＝(1, 3) とする。a→＋t b→ が a→ と垂直になるとき、t＝□ である。",
      a: { answerKind: "num", answer: ["-1"], labels: ["t ="], equations: ["(2+t)*2+(1+3*t)*1=0"] },
      pt: "垂直 ⇔ 内積が0",
      st: [
        ["成分", "a→＋t b→＝(2＋t, 1＋3t)。"],
        ["内積", "2(2＋t)＋(1＋3t)＝5＋5t＝0 より {{t＝−1}}。"],
      ],
    }),
    nm({
      id: "card-wa-guusu",
      u: "h-math-a-kakuritsu",
      d: 2,
      p: "1から9までの数が1つずつ書かれた9枚のカードから3枚を同時に取り出すとき、3枚の数の和が偶数となる確率は □ である。",
      a: { answerKind: "num", answer: ["11/21"], calc: "(4+10*4)/84" },
      pt: "和が偶数 ⇔ 奇数のカードが0枚か2枚",
      st: [
        ["場合分け", "奇数は5枚、偶数は4枚。奇数0枚：₄C₃＝4、奇数2枚：₅C₂×₄C₁＝40。"],
        ["確率", "全体 ₉C₃＝84 なので 44/84＝{{11/21}}。", "奇数3枚は和が奇数。奇数1枚も奇数。"],
      ],
    }),
    nm({
      id: "taisu-futoshiki-kosu",
      u: "h-math-2-taisu",
      d: 2,
      p: "不等式 log₃(x−1)＋log₃(x＋5)≦3 を満たす整数 x は □ 個ある。",
      a: { answerKind: "num", answer: ["3"], unit: "個", calc: "4-2+1" },
      pt: "真数条件 x＞1 を先に書く",
      st: [
        ["まとめる", "真数条件 x＞1。log₃(x−1)(x＋5)≦3 より (x−1)(x＋5)≦27、x²＋4x−32≦0、−8≦x≦4。"],
        ["共通部分", "1＜x≦4 なので整数は 2, 3, 4 の {{3個}}。", "真数条件を落とすと −8〜1 も数えてしまう。"],
      ],
    }),
    nm({
      id: "kyokuchi-wa",
      u: "h-math-2-bibun",
      d: 3,
      p: "関数 f(x)＝x³−3x²−9x＋a の極大値と極小値の和が 0 となるとき、定数 a の値は a＝□ である。",
      a: { answerKind: "num", answer: ["11"], labels: ["a ="], equations: ["(5+a)+(a-27)=0"] },
      pt: "f′(x)＝0 の解で極値をとる",
      st: [
        ["極値の位置", "f′(x)＝3x²−6x−9＝3(x＋1)(x−3)。x＝−1 で極大、x＝3 で極小。"],
        ["和", "f(−1)＝5＋a、f(3)＝a−27。和 2a−22＝0 より {{a＝11}}。"],
      ],
    }),
  ]),
  sec(1, "c", "h-math-1-teiri", "小問集合（余弦定理・剰余の定理・場合の数・等比数列・円）", LEAD1, [
    nm({
      id: "saidaikaku",
      u: "h-math-1-teiri",
      d: 1,
      p: "AB＝7、BC＝5、CA＝3 の三角形ABCにおいて、最も大きい角の大きさは □° である。",
      a: { answerKind: "num", answer: ["120"], unit: "°", calc: "120" },
      pt: "最大の辺に向かい合う角が最大",
      st: [
        ["どの角か", "最大の辺 AB＝7 の対角 ∠C が最大。"],
        ["余弦定理", "cos C＝(5²＋3²−7²)/(2·5·3)＝−1/2 より {{120°}}。"],
      ],
    }),
    nm({
      id: "joyo-teiri",
      u: "h-math-2-koji",
      d: 1,
      p: "整式 P(x)＝x³＋ax＋4 が x−2 で割り切れるとき、定数 a の値は a＝□ である。",
      a: { answerKind: "num", answer: ["-6"], labels: ["a ="], equations: ["8+2*a+4=0"] },
      pt: "因数定理 P(2)＝0",
      st: [["因数定理", "P(2)＝8＋2a＋4＝0 より {{a＝−6}}。"]],
    }),
    nm({
      id: "kumiwake",
      u: "h-math-a-baai",
      d: 2,
      p: "A、B を含む6人を、2人ずつの3つの組に分ける。組には区別がないものとするとき、A と B が別の組になる分け方は □ 通りある。",
      a: { answerKind: "num", answer: ["12"], unit: "通り", calc: "15-3" },
      pt: "全体から A と B が同じ組になる場合を引く",
      st: [
        ["全体", "₆C₂×₄C₂×₂C₂÷3!＝15 通り。", "組に区別がないので 3! で割る。"],
        ["引く", "A・B が同じ組なら残り4人を2組に分ける 3 通り。15−3＝{{12}}。"],
      ],
    }),
    nm({
      id: "touhi-wa",
      u: "h-math-b-tosa",
      d: 2,
      p: "公比が実数の等比数列 {aₙ} があり、初項から第3項までの和が 7、第4項から第6項までの和が 56 である。このとき、初項から第8項までの和は □ である。",
      a: { answerKind: "num", answer: ["255"], calc: "2^8-1" },
      pt: "第4〜6項の和＝(第1〜3項の和)×r³",
      st: [
        ["公比", "a₄＋a₅＋a₆＝r³(a₁＋a₂＋a₃) より r³＝8、r＝2。"],
        ["初項と和", "a₁(1＋2＋4)＝7 より a₁＝1。和は 2⁸−1＝{{255}}。"],
      ],
    }),
    nm({
      id: "gen-no-nagasa",
      u: "h-math-2-en",
      d: 3,
      p: "円 x²＋y²＝5 と直線 y＝2x＋k (k＞0) が異なる2点で交わり、その2点間の距離が 2√3 となるとき、k＝□ である。",
      a: { answerKind: "surd", answer: ["√10"], labels: ["k ="], equations: ["k^2=10"] },
      pt: "中心から直線までの距離と三平方の定理",
      st: [
        ["距離", "中心 O と直線 2x−y＋k＝0 の距離は d＝k/√5。"],
        ["三平方", "(弦の半分)²＋d²＝5 より 3＋k²/5＝5、k²＝10。k＞0 で {{k＝√10}}。", "弦の長さ 2√3 の半分 √3 を使う。"],
      ],
    }),
  ]),
];

// =====================================================================
// 第2問　空所補充（誘導つき）  どの節も3問・難易度 1,2,3
// =====================================================================

const S2: ExamPoolSection[] = [
  sec(
    2,
    "menseki-hi",
    "h-math-2-sekibun",
    "放物線と直線で囲まれた図形の面積",
    LEAD2,
    [
      nm({
        id: "menseki-zentai",
        u: "h-math-2-sekibun",
        d: 1,
        pts: 8,
        sec: 300,
        p: "(1) 放物線 C と x 軸で囲まれた図形の面積は S＝□ である。",
        a: { answerKind: "num", answer: ["32/3"], calc: "4^3/6" },
        pt: "∫₀⁴(−x²＋4x)dx を計算する",
        st: [["積分", "∫₀⁴(−x²＋4x)dx＝[−x³/3＋2x²]₀⁴＝−64/3＋32＝{{32/3}}。"]],
      }),
      nm({
        id: "menseki-m",
        u: "h-math-2-sekibun",
        d: 2,
        pts: 10,
        sec: 420,
        dep: "menseki-zentai",
        p: "(2) C と直線 y＝mx で囲まれた図形の面積は (4−m)³/6 と表される。m＝1 のとき、この面積は □ である。",
        a: { answerKind: "num", answer: ["9/2"], calc: "(4-1)^3/6" },
        pt: "交点の x 座標は 0 と 4−m。1/6 公式が使える",
        st: [
          ["交点", "−x²＋4x＝mx より x(x−(4−m))＝0、x＝0, 4−m。"],
          ["1/6 公式", "∫₀^(4−m){−x(x−(4−m))}dx＝(4−m)³/6。m＝1 で 27/6＝{{9/2}}。", "0＜m＜4 なので 4−m＞0。上下を逆にしない。"],
        ],
      }),
      nm({
        id: "menseki-1-7",
        u: "h-math-2-sekibun",
        d: 3,
        pts: 12,
        sec: 480,
        dep: "menseki-m",
        p: "(3) 直線 y＝mx が (1) の図形を、上側（C と直線の間）と下側の面積の比が 1：7 となるように分けるとき、m＝□ である。",
        a: { answerKind: "num", answer: ["2"], labels: ["m ="], equations: ["(4-m)^3=8"] },
        pt: "上側は全体の 1/8",
        st: [
          ["式を立てる", "上側の面積は S の 1/8 で (4−m)³/6＝(32/3)×(1/8)＝4/3。"],
          ["解く", "(4−m)³＝8 より 4−m＝2、{{m＝2}}。", "比 1：7 の上側は全体の 1/8 で、1/7 ではない。"],
        ],
      }),
    ],
    "放物線 C：y＝−x²＋4x がある。m を 0＜m＜4 を満たす定数とする。",
  ),
  sec(
    2,
    "kyotsu-sessen",
    "h-math-2-bibun",
    "2つの放物線の共通接線",
    LEAD2,
    [
      nm({
        id: "sessen-shiki",
        u: "h-math-2-bibun",
        d: 1,
        pts: 8,
        sec: 300,
        p: "(1) C₁ と C₂ の両方に接する直線を y＝ax＋b とすると、a＝□、b＝□ である。",
        a: { answerKind: "pair", answer: ["2", "-1"], labels: ["a =", "b ="], equations: ["a^2+4*b=0", "(4+a)^2-4*(8-b)=0"] },
        pt: "C₁ 上の点 (t, t²) での接線を C₂ に接させる",
        st: [
          ["C₁ の接線", "(t, t²) での接線は y＝2tx−t²。"],
          ["C₂ に接する", "x²−4x＋8＝2tx−t² の判別式 (2＋t)²−(8＋t²)＝4t−4＝0 より t＝1。{{y＝2x−1}}。"],
        ],
      }),
      nm({
        id: "sessen-menseki",
        u: "h-math-2-sekibun",
        d: 2,
        pts: 10,
        sec: 420,
        dep: "sessen-shiki",
        p: "(2) C₁、C₂ と (1) の直線で囲まれた図形の面積は □ である。",
        a: { answerKind: "num", answer: ["2/3"], calc: "1/3+1/3" },
        pt: "C₁ と C₂ の交点 x＝2 で積分を分ける",
        st: [
          ["接点と交点", "C₁ との接点は x＝1、C₂ との接点は x＝3。C₁ と C₂ は x＝2 で交わる。"],
          ["積分", "∫₁²(x−1)²dx＋∫₂³(x−3)²dx＝1/3＋1/3＝{{2/3}}。", "接線との差は (x−接点)² の形になる。展開せずに積分すると速い。"],
        ],
      }),
      nm({
        id: "sessen-c",
        u: "h-math-2-bibun",
        d: 3,
        pts: 12,
        sec: 480,
        dep: "sessen-shiki",
        p: "(3) C₂ を放物線 y＝x²−4x＋c (c は正の定数) にかえる。C₁ とこの放物線の共通接線が点 (0, −4) を通るとき、c＝□ である。",
        a: { answerKind: "num", answer: ["12"], labels: ["c ="], equations: ["(c/4-1)^2=4"] },
        pt: "接点 t を c で表し、y 切片 −t² を使う",
        st: [
          ["t と c", "判別式 (2＋t)²−(c＋t²)＝4t＋4−c＝0 より t＝c/4−1。"],
          ["通る条件", "接線 y＝2tx−t² の y 切片が −4 なので t²＝4、t＝±2。c＝4t＋4 より c＝12, −4。c＞0 で {{c＝12}}。"],
        ],
      }),
    ],
    "2つの放物線 C₁：y＝x²、C₂：y＝x²−4x＋8 がある。",
  ),
  sec(
    2,
    "zenka-ippanko",
    "h-math-b-zenka",
    "漸化式と一般項",
    LEAD2,
    [
      nm({
        id: "zenka-a4",
        u: "h-math-b-zenka",
        d: 1,
        pts: 8,
        sec: 240,
        p: "(1) a₄＝□ である。",
        a: { answerKind: "num", answer: ["19"], calc: "2*(2*(2*1+1)+2)+3" },
        pt: "n＝1, 2, 3 を順に代入する",
        st: [["順に計算", "a₂＝2·1＋1＝3、a₃＝2·3＋2＝8、a₄＝2·8＋3＝{{19}}。"]],
      }),
      nm({
        id: "zenka-pq",
        u: "h-math-b-zenka",
        d: 2,
        pts: 10,
        sec: 420,
        dep: "zenka-a4",
        p: "(2) 数列 {aₙ＋pn＋q} が公比 2 の等比数列となるような定数 p、q は p＝□、q＝□ である。このとき aₙ＝3·2ⁿ⁻¹−n−1 となる。",
        a: { answerKind: "pair", answer: ["1", "1"], labels: ["p =", "q ="], equations: ["1-p=0", "p-q=0"] },
        pt: "aₙ₊₁＋p(n＋1)＋q＝2(aₙ＋pn＋q) と比べる",
        st: [
          ["係数を比べる", "左辺に aₙ₊₁＝2aₙ＋n を入れると 2aₙ＋(1＋p)n＋p＋q。右辺 2aₙ＋2pn＋2q と比べて 1＋p＝2p、p＋q＝2q。"],
          ["解く", "{{p＝1、q＝1}}。bₙ＝aₙ＋n＋1 は初項 3、公比 2。", "n の係数と定数項の2つを比べる。"],
        ],
      }),
      nm({
        id: "zenka-1000",
        u: "h-math-b-zenka",
        d: 3,
        pts: 12,
        sec: 420,
        dep: "zenka-pq",
        p: "(3) aₙ＞1000 となる最小の自然数 n は n＝□ である。",
        a: { answerKind: "num", answer: ["10"], labels: ["n ="], calc: "10" },
        pt: "aₙ は増加するので、境目の前後を代入する",
        st: [
          ["見当をつける", "3·2ⁿ⁻¹ が1000をこえるのは 2ⁿ⁻¹＞333 のあたり。"],
          ["確かめる", "a₉＝3·256−10＝758、a₁₀＝3·512−11＝1525。よって {{n＝10}}。", "−n−1 の分を引き忘れて n＝9 としない。"],
        ],
      }),
    ],
    "数列 {aₙ} は a₁＝1、aₙ₊₁＝2aₙ＋n (n＝1, 2, 3, …) で定められている。",
  ),
];

// =====================================================================
// 第3問　記述  どの節も3問・難易度 1,2,3
// =====================================================================

const S3: ExamPoolSection[] = [
  sec(
    3,
    "card-icchi",
    "h-math-a-kakuritsu",
    "番号と位置が一致するカードの枚数",
    LEAD3,
    [
      wr({
        id: "icchi-3",
        u: "h-math-a-kakuritsu",
        d: 1,
        sec: 300,
        p: "(1) X＝3 となる確率を求めよ。",
        model: "並べ方は全部で 5!＝120 通り。X＝3 となるのは、一致する3枚の選び方が ₅C₃＝10 通りで、残り2枚はどちらも一致しないように入れかえる1通り。よって 10/120＝1/12。",
        rub: [
          { label: "一致する3枚を選び、残り2枚は入れかえる1通りしかないことを示している", points: 5, keywords: ["₅C₃", "10", "入れかえ"] },
          { label: "1/12 と答えている", points: 3, keywords: ["1/12"] },
        ],
        auto: { answerKind: "num", answer: ["1/12"], calc: "10/120" },
        pt: "残り2枚がどちらも一致しない並べ方は1通り",
        st: [["数える", "一致する3枚を選ぶ 10 通り×残りを入れかえる 1 通り。10/120＝{{1/12}}。", "X＝4 はありえない（4枚一致なら残り1枚も一致）。"]],
      }),
      wr({
        id: "icchi-0",
        u: "h-math-a-kakuritsu",
        d: 2,
        dep: "icchi-3",
        p: "(2) X＝0 となる確率を求めよ。",
        model:
          "X＝k となる並べ方の数を N(k) とする。N(5)＝1、N(4)＝0、N(3)＝10。X＝2 は一致する2枚を ₅C₂＝10 通り選び、残り3枚がどれも一致しない並べ方（3枚の完全順列）2通りで N(2)＝20。X＝1 は一致する1枚を5通り選び、残り4枚の完全順列 9 通りで N(1)＝45。よって N(0)＝120−(1＋0＋10＋20＋45)＝44。求める確率は 44/120＝11/30。",
        rub: [
          { label: "3枚・4枚の完全順列（2通り・9通り）を正しく数えている", points: 4, keywords: ["2通り", "9通り", "完全順列"] },
          { label: "N(1)＝45、N(2)＝20 などを求め、余事象として N(0)＝44 を出している", points: 4, keywords: ["45", "20", "44"] },
          { label: "11/30 と答えている", points: 2, keywords: ["11/30"] },
        ],
        auto: { answerKind: "num", answer: ["11/30"], calc: "44/120" },
        pt: "完全順列の個数 2, 9, 44 を順に積み上げる",
        st: [
          ["小さい場合", "3枚の完全順列は 2 通り、4枚は 9 通り。"],
          ["引き算", "120−(1＋10＋20＋45)＝44。44/120＝{{11/30}}。", "X＝1 は 5×9＝45、X＝2 は 10×2＝20。選び方をかけ忘れない。"],
        ],
      }),
      wr({
        id: "icchi-kitai",
        u: "h-math-a-kakuritsu",
        d: 3,
        sec: 480,
        dep: "icchi-0",
        p: "(3) X の期待値を求めよ。",
        model:
          "(2) の N(k) を使うと、X の期待値は (0·44＋1·45＋2·20＋3·10＋4·0＋5·1)/120＝(45＋40＋30＋5)/120＝120/120＝1。",
        rub: [
          { label: "X の確率分布（各 k の並べ方の数）を正しくそろえている", points: 5, keywords: ["44", "45", "20", "10", "1"] },
          { label: "Σk·P(X＝k) の式を立てて計算している", points: 4, keywords: ["120/120"] },
          { label: "期待値 1 と答えている", points: 3, keywords: ["1"] },
        ],
        auto: { answerKind: "num", answer: ["1"], calc: "(45+40+30+5)/120" },
        pt: "確率の合計が1になることも確かめる",
        st: [
          ["分布", "N(0)〜N(5)＝44, 45, 20, 10, 0, 1（合計 120）。"],
          ["期待値", "(45＋40＋30＋5)/120＝{{1}}。", "各カードが自分の位置にくる確率は 1/5 なので、5枚で 5×1/5＝1 と見ても確かめられる。"],
        ],
      }),
    ],
    "1から5までの番号が1つずつ書かれた5枚のカードを、無作為に左から1列に並べる。左から k 番目 (k＝1, 2, 3, 4, 5) のカードの番号が k であるとき、そのカードは「一致している」という。一致しているカードの枚数を X とする。",
  ),
  sec(
    3,
    "amari-7",
    "h-math-a-gojo",
    "累乗を7で割った余り",
    LEAD3,
    [
      wr({
        id: "amari-3-100",
        u: "h-math-a-gojo",
        d: 1,
        sec: 300,
        p: "(1) 3¹⁰⁰ を 7 で割った余りを求めよ。",
        model: "3¹＝3、3²＝9≡2、3³≡6、3⁴≡4、3⁵≡5、3⁶≡1 (mod 7)。3⁶≡1 なので、100＝6·16＋4 より 3¹⁰⁰＝(3⁶)¹⁶·3⁴≡3⁴≡4。余りは 4。",
        rub: [
          { label: "3⁶≡1 (mod 7)（余りが周期6でくり返すこと）を示している", points: 5, keywords: ["3⁶", "周期", "≡1"] },
          { label: "余り 4 と答えている", points: 3, keywords: ["4"] },
        ],
        auto: { answerKind: "num", answer: ["4"], calc: "81-7*11" },
        pt: "余りが1になる指数を探す",
        st: [["周期", "3ⁿ を7で割った余りは 3, 2, 6, 4, 5, 1 をくり返す。100≡4 (mod 6) なので {{4}}。"]],
      }),
      wr({
        id: "amari-wa-kosu",
        u: "h-math-a-gojo",
        d: 2,
        dep: "amari-3-100",
        p: "(2) 1≦n≦100 を満たす整数 n のうち、3ⁿ＋2ⁿ が 7 の倍数となるものの個数を求めよ。",
        model:
          "2ⁿ を7で割った余りは 2, 4, 1 をくり返し、3ⁿ の余りは 3, 2, 6, 4, 5, 1 をくり返すので、3ⁿ＋2ⁿ の余りは周期6でくり返す。n＝1〜6 で 3ⁿ＋2ⁿ の余りは 5, 6, 0, 6, 2, 2。よって 7 の倍数となるのは n≡3 (mod 6) のときに限る。1≦n≦100 では n＝3, 9, …, 99 で、(99−3)/6＋1＝17 個。",
        rub: [
          { label: "3ⁿ＋2ⁿ の余りが周期6でくり返すことと、1周期分の余りを調べている", points: 4, keywords: ["周期6", "5, 6, 0, 6, 2, 2"] },
          { label: "n≡3 (mod 6) のときに限ると結論している", points: 3, keywords: ["n≡3", "6k＋3", "6k−3"] },
          { label: "17 個と答えている", points: 3, keywords: ["17"] },
        ],
        auto: { answerKind: "num", answer: ["17"], unit: "個", calc: "(99-3)/6+1" },
        pt: "2つの周期 6 と 3 の最小公倍数 6 で調べる",
        st: [
          ["1周期を調べる", "n＝1〜6 の余りは 5, 6, {{0}}, 6, 2, 2。0 になるのは n＝3 だけ。"],
          ["数える", "n＝6k＋3 (k＝0〜16) で {{17個}}。", "n＝3 から 99 までの項数は (99−3)/6＋1。＋1 を忘れない。"],
        ],
      }),
      wr({
        id: "amari-shomei",
        u: "h-math-a-gojo",
        d: 3,
        sec: 480,
        dep: "amari-3-100",
        p: "(3) すべての正の整数 n について、3²ⁿ⁺¹＋2ⁿ⁺² は 7 の倍数であることを証明せよ。",
        model:
          "3²ⁿ⁺¹＝3·9ⁿ、2ⁿ⁺²＝4·2ⁿ である。9≡2 (mod 7) より 9ⁿ≡2ⁿ (mod 7)。よって 3²ⁿ⁺¹＋2ⁿ⁺²＝3·9ⁿ＋4·2ⁿ≡3·2ⁿ＋4·2ⁿ＝7·2ⁿ≡0 (mod 7)。したがって、すべての正の整数 n について 3²ⁿ⁺¹＋2ⁿ⁺² は 7 の倍数である。（別解：数学的帰納法。n＝1 で 27＋8＝35＝7·5。n＝k で 3²ᵏ⁺¹＋2ᵏ⁺²＝7m とすると、3²ᵏ⁺³＋2ᵏ⁺³＝9·3²ᵏ⁺¹＋2·2ᵏ⁺²＝9(7m−2ᵏ⁺²)＋2·2ᵏ⁺²＝63m−7·2ᵏ⁺² で 7 の倍数。）",
        rub: [
          { label: "3²ⁿ⁺¹＝3·9ⁿ、2ⁿ⁺²＝4·2ⁿ と底をそろえる形に変形している（帰納法なら n＝1 を確かめている）", points: 4, keywords: ["3·9ⁿ", "4·2ⁿ", "n＝1", "35"] },
          { label: "9≡2 (mod 7) を使って 9ⁿ≡2ⁿ を導いている（帰納法なら n＝k＋1 の式を仮定で書きかえている）", points: 5, keywords: ["9≡2", "9ⁿ≡2ⁿ", "7m"] },
          { label: "7·2ⁿ≡0 などから 7 の倍数であると結論している", points: 3, keywords: ["7·2ⁿ", "7の倍数"] },
        ],
        pt: "9 を 7 で割った余りは 2。底を 2 にそろえる",
        st: [
          ["変形", "3²ⁿ⁺¹＝3·{{9ⁿ}}、2ⁿ⁺²＝4·2ⁿ。"],
          ["合同式", "9≡2 より 3·9ⁿ＋4·2ⁿ≡3·2ⁿ＋4·2ⁿ＝{{7·2ⁿ}}≡0。", "合同式では、かけ算・累乗は余りに置きかえてよいが、指数そのものを mod 7 で減らしてはいけない。"],
        ],
      }),
    ],
    "n を正の整数とする。",
  ),
  sec(
    3,
    "gaishin-vec",
    "h-math-c-zukei",
    "三角形の外心とベクトル",
    LEAD3,
    [
      wr({
        id: "gaishin-ab",
        u: "h-math-c-heimen",
        d: 1,
        sec: 300,
        p: "(1) 内積 a→·b→ と、辺 AB の長さを求めよ。",
        model: "a→·b→＝|a→||b→|cos60°＝2·3·(1/2)＝3。AB²＝|b→−a→|²＝|b→|²−2a→·b→＋|a→|²＝9−6＋4＝7 より AB＝√7。",
        rub: [
          { label: "a→·b→＝3 を求めている", points: 3, keywords: ["3"] },
          { label: "|b→−a→|² を展開して AB＝√7 と答えている", points: 5, keywords: ["|b→−a→|²", "7", "√7"] },
        ],
        auto: { answerKind: "surd", answer: ["√7"], labels: ["AB ="], equations: ["x^2=7"] },
        pt: "AB→＝b→−a→ の大きさを2乗して展開する",
        st: [["内積と長さ", "a→·b→＝{{3}}。|b→−a→|²＝9−6＋4＝7 より AB＝{{√7}}。"]],
      }),
      wr({
        id: "gaishin-st",
        u: "h-math-c-zukei",
        d: 2,
        dep: "gaishin-ab",
        p: "(2) 三角形OABの外心を Q とし、OQ→＝s a→＋t b→ と表す。実数 s、t の値を求めよ。",
        model:
          "Q は OA の垂直二等分線上にあるので、OA の中点を M とすると MQ→·a→＝0、すなわち OQ→·a→＝|a→|²/2＝2。同様に OQ→·b→＝|b→|²/2＝9/2。OQ→·a→＝4s＋3t＝2、OQ→·b→＝3s＋9t＝9/2。これを解いて s＝1/6、t＝4/9。",
        rub: [
          { label: "外心の条件を OQ→·a→＝|a→|²/2、OQ→·b→＝|b→|²/2 と表している", points: 4, keywords: ["|a→|²/2", "|b→|²/2", "垂直二等分線"] },
          { label: "4s＋3t＝2、3s＋9t＝9/2 の連立方程式を立てている", points: 3, keywords: ["4s＋3t＝2", "3s＋9t＝9/2"] },
          { label: "s＝1/6、t＝4/9 と答えている", points: 3, keywords: ["1/6", "4/9"] },
        ],
        auto: { answerKind: "pair", answer: ["1/6", "4/9"], labels: ["s =", "t ="], equations: ["4*s+3*t=2", "3*s+9*t=9/2"] },
        pt: "外心からの内積は「辺の長さの2乗の半分」",
        st: [
          ["条件", "OQ→·a→＝{{2}}、OQ→·b→＝{{9/2}}（各辺の垂直二等分線上にある）。"],
          ["連立", "4s＋3t＝2、3s＋9t＝9/2 より s＝1/6、t＝4/9。", "OQ→·a→ の計算で a→·b→＝3 を使う。|a→|²＝4 と取りちがえない。"],
        ],
      }),
      wr({
        id: "gaishin-hi",
        u: "h-math-c-zukei",
        d: 3,
        sec: 480,
        dep: "gaishin-st",
        p: "(3) 直線 OQ と辺 AB の交点を R とする。AR：RB を求めよ。",
        model:
          "R は直線 OQ 上にあるので OR→＝k OQ→＝(k/6)a→＋(4k/9)b→ (k は実数)。R は辺 AB 上にあるので k/6＋4k/9＝1、11k/18＝1、k＝18/11。よって OR→＝(3/11)a→＋(8/11)b→ となり、R は AB を 8：3 に内分する。AR：RB＝8：3。",
        rub: [
          { label: "OR→＝k OQ→ とおき、係数の和が1という条件を立てている", points: 5, keywords: ["k OQ→", "係数の和", "＝1"] },
          { label: "k＝18/11 を求め、OR→＝(3/11)a→＋(8/11)b→ を出している", points: 4, keywords: ["18/11", "3/11", "8/11"] },
          { label: "AR：RB＝8：3 と答えている", points: 3, keywords: ["8：3", "8:3"] },
        ],
        auto: { answerKind: "num", answer: ["8/3"], labels: ["AR/RB ="], calc: "(8/11)/(3/11)" },
        pt: "直線 AB 上 ⇔ a→、b→ の係数の和が1",
        st: [
          ["係数の和", "OR→＝k(a→/6＋4b→/9)、k(1/6＋4/9)＝1 より k＝18/11。"],
          ["内分比", "OR→＝(3/11)a→＋(8/11)b→ なので {{AR：RB＝8：3}}。", "b→ の係数 8/11 が AR/AB にあたる。3：8 と逆にしない。"],
        ],
      }),
    ],
    "三角形OABにおいて、OA＝2、OB＝3、∠AOB＝60° とし、a→＝OA→、b→＝OB→ とする。",
  ),
];

export const U_MEIJI_SUGAKU_BUN: UnivExam = {
  key: KEY,
  univ: "明治大学",
  kamoku: "数学（文系）",
  tier: "MARCH",
  order: 204,
  basis: "商学部（学部別入学試験）の傾向を参考",
  format: "60分・大問3題。第1問は小問集合、第2問は誘導つきの空所補充（どちらも答えのみ）、第3問は途中の過程も書く記述式。",
  minutes: 60,
  groups: ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学C"],
  sections: [
    { title: "第1問　小問集合", lead: LEAD1, count: [5, 5], mix: [0.3, 0.35, 0.35], points: 40, prefer: "material", poolTag: TAG(1) },
    { title: "第2問　空所補充（微分積分・数列）", lead: LEAD2, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 30, prefer: "material", poolTag: TAG(2) },
    { title: "第3問　記述（確率・整数・ベクトル）", lead: LEAD3, count: [3, 3], mix: [0.3, 0.35, 0.35], points: 30, prefer: "material", poolTag: TAG(3) },
  ],
  pool: [...S1, ...S2, ...S3],
};
