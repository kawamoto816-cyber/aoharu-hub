import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Difficulty, NumQ, QuestionC } from "@/lib/moshi/types";

// 法政大学型 数学（文系）。一般選抜 A方式（経済学部・社会学部・現代福祉学部などの文系学部）の数学の形式を参考にした練習用の型。
// 形式: 60分・100点・大問3題。すべて空所補充（答えの数値をマークする。途中の過程は書かない）。
//   大学の公表する出題意図（2026年度 A方式）では、大問Ⅰ 図形と計量／図形と方程式、大問Ⅱ 場合の数と確率、
//   大問Ⅲ 微分法と積分法・対数関数 などの組み合わせ。範囲は数学Ⅰ・Ⅱ・A（図形の性質・場合の数と確率）・B（数列）・C（ベクトル）。
// 問題はすべてこの型のために書き下ろしたもの (過去問の文・数値・設定は使っていない)。答えの数値は sympy で検算した。
// 参考:
//   https://nyushi.hosei.ac.jp/application/files/2517/8606/5976/shutsudaiito2026.pdf (法政大学 2026年度 出題意図: A方式 数学は大問3題、図形と計量・図形と方程式・場合の数と確率・微分法と積分法・対数関数など)
//   https://passnavi.obunsha.co.jp/univ/3050/subject/?facultyID=025 (個別試験の数学: 数Ⅰ・数A（図形の性質・場合の数と確率）・数Ⅱ・数B（数列）・数C（ベクトル）、100点)
//   https://manabi.benesse.ne.jp/daigaku/school/3311/nyushi/keizai/index.html (経済学部 A方式・T日程: 数学 100点)
//   https://jyuke-labo.com/daigakujyukentaisaku/houseidaigaku/kamokubetsu/ (法政 文系数学: A方式・T日程とも100点。指数対数・三角関数・微積分・確率・数列・ベクトルが頻出)

const KEY = "hosei-sugaku-bun";
const TAG = (i: number) => `${KEY}:${i}`;
const LEAD = "次の文章の空欄にあてはまる数を求めよ。答えのみを記入せよ。";

type St = ([string, string] | [string, string, string])[];
const steps = (st: St) => st.map(([title, body, trap]) => (trap ? { title, body, trap } : { title, body }));

interface N {
  id: string;
  u: string;
  d: Difficulty;
  p: string;
  a: Omit<NumQ, "kind">;
  pts: number;
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
    points: q.pts,
    seconds: q.sec ?? (q.d === 1 ? 180 : q.d === 2 ? 300 : 420),
    skill: "知識・技能",
    unit: q.u,
    ...(q.dep ? { dependsOn: q.dep } : {}),
    prompt: q.p,
    answer: { kind: "num", ...q.a },
    point: q.pt,
    steps: steps(q.st),
  };
}

function sec(tag: number, id: string, unit: string, title: string, body: string, qs: QuestionC[]): ExamPoolSection {
  return {
    unit,
    tag: TAG(tag),
    section: {
      id: `hosei-sugaku-${tag}-${id}`,
      title,
      lead: LEAD,
      material: [{ kind: "text" as const, body }],
      questions: qs,
    },
  };
}

// =====================================================================
// 第1問　図形と計量・図形と方程式・ベクトル  どの節も4問・難易度 1,2,2,3（配点 6,8,8,8）
// =====================================================================

const S1: ExamPoolSection[] = [
  sec(
    1,
    "naisetsu-shikakkei",
    "h-math-1-teiri",
    "円に内接する四角形",
    "円 O に内接する四角形ABCDがあり、AB＝5、BC＝3、CD＝3、∠ABC＝120° である。",
    [
      nm({
        id: "ac",
        u: "h-math-1-teiri",
        d: 1,
        pts: 6,
        p: "(1) 対角線 AC の長さは AC＝□ である。",
        a: { answerKind: "num", answer: ["7"], labels: ["AC ="], calc: "7" },
        pt: "余弦定理。cos120°＝−1/2 で符号に注意",
        st: [["余弦定理", "AC²＝5²＋3²−2·5·3·cos120°＝25＋9＋15＝49 より {{AC＝7}}。", "cos120° は負。−2·5·3·(−1/2) は ＋15。"]],
      }),
      nm({
        id: "r",
        u: "h-math-1-teiri",
        d: 2,
        pts: 8,
        dep: "ac",
        p: "(2) 円 O の半径は □ である。",
        a: { answerKind: "surd", answer: ["7√3/3"], equations: ["3*x^2=49"] },
        pt: "正弦定理 AC/sin B＝2R",
        st: [["正弦定理", "2R＝7/sin120°＝7/(√3/2)＝14/√3 より R＝7/√3＝{{7√3/3}}。", "分母の有理化を忘れない。"]],
      }),
      nm({
        id: "ad",
        u: "h-math-1-teiri",
        d: 2,
        pts: 8,
        dep: "ac",
        p: "(3) 辺 DA の長さは DA＝□ である。",
        a: { answerKind: "num", answer: ["8"], equations: ["x^2-3*x-40=0"] },
        pt: "内接四角形の対角の和は180°。∠ADC＝60°",
        st: [
          ["角", "∠ADC＝180°−120°＝60°。"],
          ["余弦定理", "DA＝x とすると 49＝x²＋9−2·3·x·cos60°、x²−3x−40＝0、(x−8)(x＋5)＝0。x＞0 で {{DA＝8}}。"],
        ],
      }),
      nm({
        id: "menseki",
        u: "h-math-1-keiryo",
        d: 3,
        pts: 8,
        dep: "ad",
        p: "(4) 四角形ABCDの面積は □ である。",
        a: { answerKind: "surd", answer: ["39√3/4"], equations: ["16*x^2=4563"] },
        pt: "対角線 AC で2つの三角形に分ける",
        st: [
          ["△ABC", "(1/2)·5·3·sin120°＝15√3/4。"],
          ["△ACD", "(1/2)·8·3·sin60°＝6√3。合計 15√3/4＋24√3/4＝{{39√3/4}}。", "∠ADC＝60° をはさむ2辺は DA と DC。"],
        ],
      }),
    ],
  ),
  sec(
    1,
    "en-chokusen",
    "h-math-2-en",
    "円と直線",
    "座標平面上に円 C：x²＋y²−6x−4y＋9＝0 がある。",
    [
      nm({
        id: "chushin",
        u: "h-math-2-en",
        d: 1,
        pts: 6,
        p: "(1) 円 C の中心の座標は (□, □) であり、半径は 2 である。",
        a: { answerKind: "pair", answer: ["3", "2"], labels: ["x =", "y ="], equations: ["x=3", "y=2"] },
        pt: "平方完成して (x−a)²＋(y−b)²＝r² の形に",
        st: [["平方完成", "(x−3)²＋(y−2)²＝9＋4−9＝4。中心 {{(3, 2)}}、半径 2。"]],
      }),
      nm({
        id: "sessen-k",
        u: "h-math-2-en",
        d: 2,
        pts: 8,
        dep: "chushin",
        p: "(2) 原点を通る直線 y＝kx が円 C に接するとき、k＝0 または k＝□ である。",
        a: { answerKind: "num", answer: ["12/5"], labels: ["k ="], equations: ["5*k^2-12*k=0"] },
        pt: "中心と直線の距離＝半径",
        st: [
          ["距離", "kx−y＝0 と (3, 2) の距離 |3k−2|/√(k²＋1)＝2。"],
          ["解く", "9k²−12k＋4＝4k²＋4 より 5k²−12k＝0、k＝0, {{12/5}}。", "両辺を2乗してから整理する。"],
        ],
      }),
      nm({
        id: "gen-m",
        u: "h-math-2-en",
        d: 2,
        pts: 8,
        dep: "chushin",
        p: "(3) 直線 y＝x＋m が円 C から切り取る線分の長さが 2√2 となるような m の値は、小さい方から □、□ である。",
        a: { answerKind: "pair", answer: ["-3", "1"], labels: ["p =", "q ="], equations: ["(1+p)^2=4", "(1+q)^2=4"] },
        pt: "中心から直線までの距離 d と (弦の半分)²＋d²＝r²",
        st: [
          ["距離", "弦の半分は √2 なので d²＝4−2＝2、d＝√2。"],
          ["解く", "x−y＋m＝0 との距離 |3−2＋m|/√2＝√2 より |1＋m|＝2、{{m＝−3, 1}}。"],
        ],
      }),
      nm({
        id: "x-plus-y",
        u: "h-math-2-kiseki",
        d: 3,
        pts: 8,
        dep: "chushin",
        p: "(4) 点 P(x, y) が円 C 上を動くとき、x＋y の最大値は □ である。",
        a: { answerKind: "surd", answer: ["5+2√2"], equations: ["(x-5)^2=8"] },
        pt: "x＋y＝s とおき、直線が円と共有点をもつ条件",
        st: [
          ["直線で考える", "x＋y＝s は傾き −1 の直線。円と共有点をもつ ⇔ |3＋2−s|/√2≦2。"],
          ["範囲", "|s−5|≦2√2 より 5−2√2≦s≦5＋2√2。最大値 {{5＋2√2}}。", "距離の分母 √2 を忘れて |s−5|≦2 としない。"],
        ],
      }),
    ],
  ),
  sec(
    1,
    "vec-menseki",
    "h-math-c-heimen",
    "ベクトルと三角形の面積比",
    "三角形OABにおいて |OA→|＝3、|OB→|＝2、OA→·OB→＝3 とし、a→＝OA→、b→＝OB→ とする。また、点 P は 2PA→＋3PB→＋PO→＝0→ を満たす。",
    [
      nm({
        id: "ab",
        u: "h-math-c-heimen",
        d: 1,
        pts: 6,
        p: "(1) 辺 AB の長さは □ である。",
        a: { answerKind: "surd", answer: ["√7"], equations: ["x^2=7"] },
        pt: "|b→−a→|² を展開する",
        st: [["展開", "|b→−a→|²＝4−2·3＋9＝7 より {{√7}}。"]],
      }),
      nm({
        id: "oab",
        u: "h-math-c-heimen",
        d: 2,
        pts: 8,
        dep: "ab",
        p: "(2) 三角形OABの面積は □ である。",
        a: { answerKind: "surd", answer: ["3√3/2"], equations: ["4*x^2=27"] },
        pt: "S＝(1/2)√(|a→|²|b→|²−(a→·b→)²)",
        st: [["面積公式", "(1/2)√(9·4−3²)＝(1/2)√27＝{{3√3/2}}。", "(a→·b→)² を引く。a→·b→ のまま引かない。"]],
      }),
      nm({
        id: "op",
        u: "h-math-c-heimen",
        d: 2,
        pts: 8,
        dep: "ab",
        p: "(3) OP→＝s a→＋t b→ と表すと、s＝□、t＝□ である。",
        a: { answerKind: "pair", answer: ["1/3", "1/2"], labels: ["s =", "t ="], equations: ["6*s=2", "6*t=3"] },
        pt: "始点を O にそろえて p→ について解く",
        st: [
          ["書きかえる", "2(a→−p→)＋3(b→−p→)＋(−p→)＝0→ より 6p→＝2a→＋3b→。"],
          ["係数", "p→＝(1/3)a→＋(1/2)b→。{{s＝1/3、t＝1/2}}。", "PO→＝−p→。符号を落とすと 6 でなく 4 で割ってしまう。"],
        ],
      }),
      nm({
        id: "pab",
        u: "h-math-c-zukei",
        d: 3,
        pts: 8,
        dep: "op",
        p: "(4) 三角形PABの面積は □ である。",
        a: { answerKind: "surd", answer: ["√3/4"], equations: ["16*x^2=3"] },
        pt: "P と直線 AB の距離は O と AB の距離の何倍か",
        st: [
          ["比を読む", "p→＝(5/6)·{(2a→＋3b→)/5}。(2a→＋3b→)/5 は AB を 3：2 に内分する点 Q で、OP：PQ＝5：1。"],
          ["面積", "△PAB＝△OAB×(1/6)＝(3√3/2)/6＝{{√3/4}}。", "2PA→＋3PB→＋1PO→＝0→ なら △PAB：△PBO：△POA＝1：2：3。"],
        ],
      }),
    ],
  ),
];

// =====================================================================
// 第2問　場合の数と確率  どの節も4問・難易度 1,2,2,3（配点 7,9,9,10）
// =====================================================================

const S2: ExamPoolSection[] = [
  sec(
    2,
    "tama-jouken",
    "h-math-a-kakuritsu",
    "玉の取り出しと条件付き確率",
    "赤玉3個と白玉4個が入った袋から、3個の玉を同時に取り出す。",
    [
      nm({
        id: "onaji-iro",
        u: "h-math-a-kakuritsu",
        d: 1,
        pts: 7,
        p: "(1) 取り出した3個がすべて同じ色である確率は □ である。",
        a: { answerKind: "num", answer: ["1/7"], calc: "(1+4)/35" },
        pt: "全部赤・全部白の2つの場合を足す",
        st: [["数える", "全体 ₇C₃＝35。赤3個 1 通り、白3個 ₄C₃＝4 通り。5/35＝{{1/7}}。"]],
      }),
      nm({
        id: "aka-2",
        u: "h-math-a-kakuritsu",
        d: 2,
        pts: 9,
        dep: "onaji-iro",
        p: "(2) 取り出した3個のうち赤玉がちょうど2個である確率は □ である。",
        a: { answerKind: "num", answer: ["12/35"], calc: "3*4/35" },
        pt: "赤2個の選び方 × 白1個の選び方",
        st: [["数える", "₃C₂×₄C₁＝12 通り。{{12/35}}。"]],
      }),
      nm({
        id: "jouken",
        u: "h-math-a-joken",
        d: 2,
        pts: 9,
        dep: "aka-2",
        p: "(3) 取り出した3個に赤玉が少なくとも1個含まれていたとき、赤玉がちょうど2個である条件付き確率は □ である。",
        a: { answerKind: "num", answer: ["12/31"], calc: "(12/35)/(31/35)" },
        pt: "P(B|A)＝P(A∩B)/P(A)。A は余事象で求める",
        st: [
          ["P(A)", "赤0個（白3個）が 4/35 なので P(A)＝31/35。"],
          ["割る", "(12/35)÷(31/35)＝{{12/31}}。", "「赤2個」は「少なくとも1個」に含まれるので、分子は 12/35 のまま。"],
        ],
      }),
      nm({
        id: "kitai",
        u: "h-math-a-kakuritsu",
        d: 3,
        pts: 10,
        dep: "aka-2",
        p: "(4) 取り出した3個に含まれる赤玉の個数の期待値は □ である。",
        a: { answerKind: "num", answer: ["9/7"], calc: "(0*4+1*18+2*12+3*1)/35" },
        pt: "赤0〜3個の確率をそろえて Σk·P",
        st: [
          ["分布", "赤0個 4、1個 ₃C₁·₄C₂＝18、2個 12、3個 1（合計 35）。"],
          ["期待値", "(18＋24＋3)/35＝45/35＝{{9/7}}。", "和が 35 になるか確かめる。"],
        ],
      }),
    ],
  ),
  sec(
    2,
    "coin-tokuten",
    "h-math-a-kakuritsu",
    "硬貨の得点と反復試行",
    "1枚の硬貨を5回投げる。持ち点は最初 0 点で、表が出ると 2 点増え、裏が出ると 1 点減る。",
    [
      nm({
        id: "ten-4",
        u: "h-math-a-kakuritsu",
        d: 1,
        pts: 7,
        p: "(1) 5回投げ終えたときの持ち点が 4 点である確率は □ である。",
        a: { answerKind: "num", answer: ["5/16"], calc: "10/32" },
        pt: "表の回数を h として 2h−(5−h)＝4",
        st: [["回数", "3h−5＝4 より h＝3。₅C₃/2⁵＝10/32＝{{5/16}}。"]],
      }),
      nm({
        id: "ten-4-ijo",
        u: "h-math-a-kakuritsu",
        d: 2,
        pts: 9,
        dep: "ten-4",
        p: "(2) 5回投げ終えたときの持ち点が 4 点以上である確率は □ である。",
        a: { answerKind: "num", answer: ["1/2"], calc: "(10+5+1)/32" },
        pt: "3h−5≧4 ⇔ h≧3",
        st: [["足す", "h＝3, 4, 5 で (10＋5＋1)/32＝{{1/2}}。", "表と裏が対称なので「表3回以上」はちょうど半分。"]],
      }),
      nm({
        id: "fu-nashi",
        u: "h-math-a-baai",
        d: 2,
        pts: 9,
        dep: "ten-4",
        p: "(3) 5回投げるあいだ、持ち点が一度も負にならない確率は □ である。",
        a: { answerKind: "num", answer: ["7/16"], calc: "14/32" },
        pt: "1回目は表でないといけない。そのあと場合分け",
        st: [
          ["1回目", "1回目が裏だと −1 点。1回目は表で 2 点。"],
          ["数える", "残り4回で負になるのは、2〜4回目がすべて裏（2→1→0→−1）で5回目が表・裏の2通りだけ。16−2＝14 通りで 14/32＝{{7/16}}。", "途中で 0 点になるのは負ではない。"],
        ],
      }),
      nm({
        id: "jouken",
        u: "h-math-a-joken",
        d: 3,
        pts: 10,
        dep: "fu-nashi",
        p: "(4) 5回投げ終えたときの持ち点が 4 点であったとき、途中で持ち点が一度も負にならなかった条件付き確率は □ である。",
        a: { answerKind: "num", answer: ["3/5"], calc: "6/10" },
        pt: "表3回・裏2回の10通りのうち負にならないものを数える",
        st: [
          ["条件の中で数える", "1回目は表。残り4回（表2・裏2）の並べ方 6 通りのうち、裏・裏が2回目・3回目に続く並びは 2→1→0 で負にならない。どれも負にならず 6 通り。"],
          ["確率", "6/10＝{{3/5}}。", "1回目が裏の4通りは必ず負になる。"],
        ],
      }),
    ],
  ),
  sec(
    2,
    "en-junretsu",
    "h-math-a-baai",
    "円卓の席の決め方",
    "A、B、C、D、E、F の6人が円形のテーブルのまわりの6つの席に座る。回転して一致する座り方は同じものとみなす。",
    [
      nm({
        id: "zentai",
        u: "h-math-a-baai",
        d: 1,
        pts: 7,
        p: "(1) 座り方は全部で □ 通りある。",
        a: { answerKind: "num", answer: ["120"], unit: "通り", calc: "5*4*3*2*1" },
        pt: "円順列は (n−1)!",
        st: [["円順列", "A を固定して残り5人を並べる。5!＝{{120}}。"]],
      }),
      nm({
        id: "ab-tonari",
        u: "h-math-a-baai",
        d: 2,
        pts: 9,
        dep: "zentai",
        p: "(2) A と B がとなり合う座り方は □ 通りある。",
        a: { answerKind: "num", answer: ["48"], unit: "通り", calc: "2*4*3*2*1" },
        pt: "A と B をひとかたまりにする",
        st: [["かたまり", "AB を1人とみて5つの円順列 4!＝24、AB の並び 2 通りで {{48}}。"]],
      }),
      nm({
        id: "dochiramo-tonarazu",
        u: "h-math-a-baai",
        d: 2,
        pts: 9,
        dep: "ab-tonari",
        p: "(3) A と B がとなり合わず、かつ C と D もとなり合わない座り方は □ 通りある。",
        a: { answerKind: "num", answer: ["48"], unit: "通り", calc: "120-48-48+24" },
        pt: "全体 −（AB 隣）−（CD 隣）＋（両方隣）",
        st: [
          ["両方となり合う", "AB と CD をそれぞれかたまりにして4つの円順列 3!＝6、中の並び 2×2。6×4＝24。"],
          ["包除", "120−48−48＋24＝{{48}}。", "両方となり合う場合を足し戻すのを忘れない。"],
        ],
      }),
      nm({
        id: "abc-hanare",
        u: "h-math-a-kakuritsu",
        d: 3,
        pts: 10,
        dep: "zentai",
        p: "(4) 6人が無作為に座るとき、A、B、C のどの2人もとなり合わない確率は □ である。",
        a: { answerKind: "num", answer: ["1/10"], calc: "2*6/120" },
        pt: "6席に3人を互いにとなり合わないように置くと、1つおきしかない",
        st: [
          ["席を決める", "A を固定すると、B、C は A から2つ先と4つ先の席（1つおき）しかない。B、C の入れ方 2 通り。"],
          ["確率", "残り3人 3!＝6 通り。2×6/120＝{{1/10}}。"],
        ],
      }),
    ],
  ),
];

// =====================================================================
// 第3問　微分積分・指数対数・数列  どの節も4問・難易度 1,2,2,3（配点 7,9,9,10）
// =====================================================================

const S3: ExamPoolSection[] = [
  sec(
    3,
    "sanji-kyokuchi",
    "h-math-2-bibun",
    "3次関数のグラフと最大値",
    "関数 f(x)＝x³−6x²＋9x がある。",
    [
      nm({
        id: "kyokudai",
        u: "h-math-2-bibun",
        d: 1,
        pts: 7,
        p: "(1) f(x) の極大値は □ である。",
        a: { answerKind: "num", answer: ["4"], calc: "1-6+9" },
        pt: "f′(x)＝0 の小さい方の解で極大",
        st: [["微分", "f′(x)＝3x²−12x＋9＝3(x−1)(x−3)。x＝1 で極大 f(1)＝{{4}}（x＝3 で極小 0）。"]],
      }),
      nm({
        id: "kaisu",
        u: "h-math-2-bibun",
        d: 2,
        pts: 9,
        dep: "kyokudai",
        p: "(2) 方程式 f(x)＝k が異なる3つの実数解をもつような整数 k は □ 個ある。",
        a: { answerKind: "num", answer: ["3"], unit: "個", calc: "3" },
        pt: "y＝k が極小値と極大値の間を通る",
        st: [["グラフと直線", "極小値 0 ＜ k ＜ 極大値 4。整数は 1, 2, 3 の {{3個}}。", "k＝0, 4 は重解になり、異なる解は2つ。"]],
      }),
      nm({
        id: "saidai-a",
        u: "h-math-2-bibun",
        d: 2,
        pts: 9,
        dep: "kyokudai",
        p: "(3) a を正の定数とする。0≦x≦a における f(x) の最大値が 4 となるような a の値の範囲は 1≦a≦□ である。",
        a: { answerKind: "num", answer: ["4"], labels: ["a ="], equations: ["a^3-6*a^2+9*a=4"] },
        pt: "f(x)＝4 となる x を求める。(x−1)² で割れる",
        st: [
          ["f(x)＝4", "x³−6x²＋9x−4＝(x−1)²(x−4)＝0 より x＝1, 4。"],
          ["範囲", "a≧1 で極大値 4 を含み、a≦4 なら f(a)≦4。よって 1≦a≦{{4}}。", "x＝1 が重解になることを使うと因数分解が速い。"],
        ],
      }),
      nm({
        id: "menseki",
        u: "h-math-2-sekibun",
        d: 3,
        pts: 10,
        dep: "kyokudai",
        p: "(4) 曲線 y＝f(x) と x 軸で囲まれた図形の面積は □ である。",
        a: { answerKind: "num", answer: ["27/4"], calc: "81/4-54+81/2" },
        pt: "f(x)＝x(x−3)² で 0≦x≦3 では f(x)≧0",
        st: [
          ["交点", "f(x)＝x(x−3)²。x 軸とは x＝0 と x＝3（接する）で共有点をもつ。"],
          ["積分", "∫₀³(x³−6x²＋9x)dx＝[x⁴/4−2x³＋9x²/2]₀³＝81/4−54＋81/2＝{{27/4}}。"],
        ],
      }),
    ],
  ),
  sec(
    3,
    "shisu-taisu",
    "h-math-2-taisu",
    "指数・対数の方程式と最大最小",
    "以下の (1)〜(4) に答えよ。(1)(2) では t＝2ˣ とおくとよい。",
    [
      nm({
        id: "shisu-hoteishiki",
        u: "h-math-2-shisu",
        d: 1,
        pts: 7,
        p: "(1) 方程式 4ˣ−6·2ˣ＋8＝0 の解は、小さい方から x＝□、□ である。",
        a: { answerKind: "pair", answer: ["1", "2"], labels: ["p =", "q ="], equations: ["p+q=3", "q-p=1"] },
        pt: "4ˣ＝(2ˣ)²。t の2次方程式にする",
        st: [["置きかえ", "t²−6t＋8＝0、t＝2, 4。2ˣ＝2, 4 より {{x＝1, 2}}。"]],
      }),
      nm({
        id: "shisu-saisho",
        u: "h-math-2-shisu",
        d: 2,
        pts: 9,
        dep: "shisu-hoteishiki",
        p: "(2) 関数 y＝4ˣ−2ˣ⁺²＋5 の最小値は □ である。",
        a: { answerKind: "num", answer: ["1"], calc: "4-8+5" },
        pt: "2ˣ⁺²＝4·2ˣ。t＞0 の範囲で平方完成",
        st: [["平方完成", "y＝t²−4t＋5＝(t−2)²＋1（t＞0）。t＝2 すなわち x＝1 で最小値 {{1}}。", "t の範囲 t＞0 を確かめる。t＝2 は範囲内。"]],
      }),
      nm({
        id: "taisu-hoteishiki",
        u: "h-math-2-taisu",
        d: 2,
        pts: 9,
        p: "(3) 方程式 log₂(x−1)＋log₂(x＋2)＝2 の解は x＝□ である。",
        a: { answerKind: "num", answer: ["2"], equations: ["(x-1)*(x+2)=4"] },
        pt: "真数条件 x＞1 を先に書く",
        st: [
          ["まとめる", "真数条件 x＞1。(x−1)(x＋2)＝4、x²＋x−6＝0、x＝2, −3。"],
          ["真数条件", "x＞1 より {{x＝2}}。", "x＝−3 は真数が負になるので不適。"],
        ],
      }),
      nm({
        id: "taisu-saidai",
        u: "h-math-2-taisu",
        d: 3,
        pts: 10,
        dep: "taisu-hoteishiki",
        p: "(4) x＞0 のとき、関数 (log₃x)·log₃(27/x) は x＝□ で最大となる。",
        a: { answerKind: "surd", answer: ["3√3"], equations: ["x^2=27"] },
        pt: "L＝log₃x とおくと L(3−L)",
        st: [
          ["置きかえ", "log₃(27/x)＝3−L。L(3−L)＝−(L−3/2)²＋9/4。"],
          ["x を戻す", "L＝3/2 で最大値 9/4。x＝3^(3/2)＝{{3√3}}。", "答えるのは最大値でなく、そのときの x。"],
        ],
      }),
    ],
  ),
  sec(
    3,
    "gun-suretsu",
    "h-math-b-tosa",
    "奇数の群数列",
    "正の奇数を、第 n 群に n 個の数が入るように次のように分ける。\n1 ｜ 3, 5 ｜ 7, 9, 11 ｜ 13, 15, 17, 19 ｜ 21, …",
    [
      nm({
        id: "dai6-saisho",
        u: "h-math-b-tosa",
        d: 1,
        pts: 7,
        p: "(1) 第6群の最初の数は □ である。",
        a: { answerKind: "num", answer: ["31"], calc: "2*16-1" },
        pt: "第5群までに 1＋2＋…＋5＝15 個",
        st: [["何番目の奇数か", "第6群の最初は 16 番目の奇数で 2·16−1＝{{31}}。", "第 k 番目の奇数は 2k−1。"]],
      }),
      nm({
        id: "199-gun",
        u: "h-math-b-sigma",
        d: 2,
        pts: 9,
        dep: "dai6-saisho",
        p: "(2) 199 は第 □ 群に含まれる。",
        a: { answerKind: "num", answer: ["14"], calc: "14" },
        pt: "199 は100番目の奇数。n(n−1)/2＜100≦n(n＋1)/2",
        st: [
          ["番号", "199＝2·100−1 で 100 番目の奇数。"],
          ["群", "第13群までに 91 個、第14群までに 105 個。91＜100≦105 より {{第14群}}。"],
        ],
      }),
      nm({
        id: "199-banme",
        u: "h-math-b-sigma",
        d: 2,
        pts: 9,
        dep: "199-gun",
        p: "(3) 199 は、その群の中で最初から数えて □ 番目の数である。",
        a: { answerKind: "num", answer: ["9"], unit: "番目", calc: "100-91" },
        pt: "第13群までの個数 91 を引く",
        st: [["引く", "100−91＝{{9}}。", "群の中の順番は「奇数の番号」で数える。199−181 などの差をそのまま答えない。"]],
      }),
      nm({
        id: "gun-wa",
        u: "h-math-b-sigma",
        d: 3,
        pts: 10,
        dep: "dai6-saisho",
        p: "(4) 第10群に含まれる数の和は □ である。",
        a: { answerKind: "num", answer: ["1000"], calc: "10*(91+109)/2" },
        pt: "最初と最後の数を求め、等差数列の和",
        st: [
          ["両端", "第9群までに 45 個。第10群は 46 番目〜55 番目の奇数で 91〜109。"],
          ["和", "10·(91＋109)/2＝{{1000}}。", "第 n 群の和は n³ になっている（1, 8, 27, …）。"],
        ],
      }),
    ],
  ),
];

export const U_HOSEI_SUGAKU_BUN: UnivExam = {
  key: KEY,
  univ: "法政大学",
  kamoku: "数学（文系）",
  tier: "MARCH",
  order: 208,
  basis: "A方式（経済学部・社会学部など文系学部）の傾向を参考。大学公表の出題意図では大問3題（図形と計量・方程式／場合の数と確率／微積分・指数対数）",
  format: "60分・大問3題。すべて空所補充で答えの数値のみを記入（マーク）。図形・確率・微積分や指数対数から出題。",
  minutes: 60,
  groups: ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学C"],
  sections: [
    { title: "第1問　図形と計量・図形と方程式", lead: LEAD, count: [4, 4], mix: [0.3, 0.35, 0.35], points: 30, prefer: "material", poolTag: TAG(1) },
    { title: "第2問　場合の数と確率", lead: LEAD, count: [4, 4], mix: [0.3, 0.35, 0.35], points: 35, prefer: "material", poolTag: TAG(2) },
    { title: "第3問　微分積分・指数対数・数列", lead: LEAD, count: [4, 4], mix: [0.3, 0.35, 0.35], points: 35, prefer: "material", poolTag: TAG(3) },
  ],
  pool: [...S1, ...S2, ...S3],
};
