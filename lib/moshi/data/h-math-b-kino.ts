// 数学B「数学的帰納法」の単元模試 (A: 式を入れかえる生成型 ＋ B: しくみの理解のプール)。問題はすべてオリジナル。
// 検算: 「n＝k＋1 で加える項」「f(k＋1)−f(k)」「b^(k＋1)−1＝(b−1)(□)」は文字式 (expr) の答えで、採点器が式として照合する。
//   出発点の問題は、生成関数の中で n＝1〜60 を実際に調べて「n≧N で成り立つ最小の N」を求めてから選択肢を作る。
//   scripts/check-moshi.ts がシード1〜100で確かめる。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-b-kino";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "しくみ：[1] と [2] の2つを示す");
const S2 = L(2, "等式の証明：仮定の式に「次の1項」をたす");
const S3 = L(3, "倍数の証明：仮定を「＝6m」とおく");
const S4 = L(4, "型ごとの仮定の使い方と、出発点");
const S5 = L(5, "前の2つを仮定する帰納法と、その歴史");

const IDS: { lhs: string; rhs: string; add: string; addShow: string; how: string }[] = [
  { lhs: "1＋3＋5＋…＋(2n−1)", rhs: "n²", add: "2k+1", addShow: "2(k＋1)−1＝2k＋1", how: "k² に 2k＋1 をたすと (k＋1)²" },
  { lhs: "1＋2＋3＋…＋n", rhs: "n(n＋1)/2", add: "k+1", addShow: "k＋1", how: "k(k＋1)/2＋(k＋1)＝(k＋1)(k＋2)/2" },
  { lhs: "1²＋2²＋…＋n²", rhs: "n(n＋1)(2n＋1)/6", add: "k^2+2k+1", addShow: "(k＋1)²＝k²＋2k＋1", how: "(k＋1) でくくると (k＋1)(k＋2)(2k＋3)/6" },
  { lhs: "1·2＋2·3＋…＋n(n＋1)", rhs: "n(n＋1)(n＋2)/3", add: "k^2+3k+2", addShow: "(k＋1)(k＋2)＝k²＋3k＋2", how: "(k＋1)(k＋2) でくくると (k＋1)(k＋2)(k＋3)/3" },
  { lhs: "2＋4＋6＋…＋2n", rhs: "n(n＋1)", add: "2k+2", addShow: "2(k＋1)＝2k＋2", how: "k(k＋1)＋2(k＋1)＝(k＋1)(k＋2)" },
  { lhs: "1＋5＋9＋…＋(4n−3)", rhs: "n(2n−1)", add: "4k+1", addShow: "4(k＋1)−3＝4k＋1", how: "k(2k−1)＋4k＋1＝(k＋1)(2k＋1)" },
  { lhs: "3＋5＋7＋…＋(2n＋1)", rhs: "n(n＋2)", add: "2k+3", addShow: "2(k＋1)＋1＝2k＋3", how: "k(k＋2)＋2k＋3＝(k＋1)(k＋3)" },
  { lhs: "1³＋2³＋…＋n³", rhs: "{n(n＋1)/2}²", add: "k^3+3k^2+3k+1", addShow: "(k＋1)³＝k³＋3k²＋3k＋1", how: "(k＋1)² でくくると {(k＋1)(k＋2)/2}²" },
  { lhs: "1＋4＋7＋…＋(3n−2)", rhs: "n(3n−1)/2", add: "3k+1", addShow: "3(k＋1)−2＝3k＋1", how: "k(3k−1)/2＋3k＋1＝(k＋1)(3k＋2)/2" },
];

function kuwaeru(r: Rng): QuestionBody {
  const id = r.pick(IDS);
  return {
    prompt: `すべての自然数 n について ${id.lhs}＝${id.rhs} …① が成り立つことを、数学的帰納法で証明する。n＝k のとき①が成り立つと仮定して n＝k＋1 のときを示すとき、仮定の式の両辺に加える項を k の式で表しなさい (展開した形で)。`,
    answer: { kind: "num", answerKind: "expr", answer: [id.add], labels: ["加える項"] },
    point: "左辺の n 番目の項に n＝k＋1 を入れたものが「次の1項」",
    steps: [
      { title: "次の1項", body: `左辺の第 n 項に n＝k＋1 を入れて、{{${id.addShow}}}。`, back: [S2], trap: "第 k 項 (n＝k を入れたもの) をたすと、同じ項を2回たすことになる。" },
      { title: "そのあと", body: `仮定の式の右辺にこの項をたして整理すると、${id.how} となり、n＝k＋1 の右辺と一致します。`, back: [S1] },
    ],
  };
}

const MULT: { f: string; m: number; diff: string; diffShow: string }[] = [
  { f: "n³−n", m: 6, diff: "3k^2+3k", diffShow: "3k²＋3k＝3k(k＋1)" },
  { f: "n³＋2n", m: 3, diff: "3k^2+3k+3", diffShow: "3k²＋3k＋3＝3(k²＋k＋1)" },
  { f: "n³＋5n", m: 6, diff: "3k^2+3k+6", diffShow: "3k²＋3k＋6＝3k(k＋1)＋6" },
  { f: "2n³＋3n²＋n", m: 6, diff: "6k^2+12k+6", diffShow: "6k²＋12k＋6＝6(k＋1)²" },
  { f: "n³＋11n", m: 6, diff: "3k^2+3k+12", diffShow: "3k²＋3k＋12＝3k(k＋1)＋12" },
  { f: "5n³＋n", m: 6, diff: "15k^2+15k+6", diffShow: "15k²＋15k＋6＝15k(k＋1)＋6" },
  { f: "7n³−n", m: 6, diff: "21k^2+21k+6", diffShow: "21k²＋21k＋6＝21k(k＋1)＋6" },
  { f: "n³＋3n²＋2n", m: 6, diff: "3k^2+9k+6", diffShow: "3k²＋9k＋6＝3(k＋1)(k＋2)" },
];

function sa(r: Rng): QuestionBody {
  const t = r.pick(MULT);
  return {
    prompt: `f(n)＝${t.f} とする。すべての自然数 n について f(n) が ${t.m} の倍数であることを数学的帰納法で示すために、f(k＋1)−f(k) を計算したい。f(k＋1)−f(k) を k の式で表しなさい (展開して整理した形で)。`,
    answer: { kind: "num", answerKind: "expr", answer: [t.diff], labels: ["f(k+1)−f(k) ="] },
    point: "f(k＋1)＝f(k)＋(差) とみて、差が倍数かを調べる",
    steps: [
      { title: "f(k＋1) を展開", body: `${t.f.replace(/n/g, "(k＋1)")} を展開して、f(k)＝${t.f.replace(/n/g, "k")} をひきます。`, back: [S3] },
      { title: "差", body: `f(k＋1)−f(k)＝{{${t.diffShow}}}。`, trap: `k(k＋1) は連続する2整数の積なので偶数。${t.m}の倍数かどうかはこれも使って判断する。` },
    ],
  };
}

function ruijo(r: Rng): QuestionBody {
  const b = r.pick([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 16]);
  const m = b - 1;
  return {
    prompt: `すべての自然数 n について ${b}ⁿ−1 が ${m} の倍数であることを数学的帰納法で示す。n＝k のとき ${b}ᵏ−1＝${m}M (M は整数) と仮定すると、${b}ᵏ⁺¹−1＝${m}(□) と表せる。□ にあてはまる式を M を使って表しなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [`${b}m+1`], labels: ["□ ="] },
    point: "仮定から bᵏ＝(b−1)M＋1 として代入する",
    steps: [
      { title: "仮定を書きかえる", body: `${b}ᵏ＝${m}M＋1 です。`, back: [S3] },
      { title: "代入する", body: `${b}ᵏ⁺¹−1＝${b}×${b}ᵏ−1＝${b}(${m}M＋1)−1＝${m * b}M＋${m}＝${m}({{${b}M＋1}})。`, trap: `${b}ᵏ⁺¹ を ${b}ᵏ＋${b} としない。指数が1ふえると ${b} 倍になる。` },
    ],
  };
}

const INEQ: { show: string; f: (n: number) => boolean }[] = [
  { show: "2ⁿ＞n²", f: (n) => 2 ** n > n * n },
  { show: "2ⁿ＞2n＋1", f: (n) => 2 ** n > 2 * n + 1 },
  { show: "2ⁿ＞5n", f: (n) => 2 ** n > 5 * n },
  { show: "3ⁿ＞10n", f: (n) => 3 ** n > 10 * n },
  { show: "3ⁿ＞n³", f: (n) => 3 ** n > n ** 3 },
  { show: "2ⁿ＞n³", f: (n) => 2 ** n > n ** 3 },
  { show: "3ⁿ＞2n²＋5", f: (n) => 3 ** n > 2 * n * n + 5 },
  { show: "2ⁿ＞n²＋3", f: (n) => 2 ** n > n * n + 3 },
  { show: "4ⁿ＞n⁴", f: (n) => 4 ** n > n ** 4 },
  { show: "2ⁿ＞4n＋1", f: (n) => 2 ** n > 4 * n + 1 },
  { show: "2ⁿ＞3n＋2", f: (n) => 2 ** n > 3 * n + 2 },
];
function shuppatsu(r: Rng): QuestionBody {
  const t = r.pick(INEQ);
  // n＝1〜60 を調べ、それ以降すべて成り立つ最小の N
  let N = 60;
  while (N > 1 && t.f(N - 1)) N--;
  const fails = Array.from({ length: N - 1 }, (_, i) => i + 1).filter((n) => !t.f(n));
  const cand = [N - 2, N - 1, N, N + 1].filter((x) => x >= 1);
  while (cand.length < 4) cand.push(cand[cand.length - 1] + 1);
  const opts = r.shuffle(cand);
  return {
    prompt: `不等式 ${t.show} が「n≧N のすべての自然数 n で成り立つ」ような最小の自然数 N を求め、数学的帰納法の [1] では n＝N のときを確かめたい。N はどれですか。`,
    answer: {
      kind: "choice",
      options: opts.map((x) => `N＝${x}`),
      correct: opts.indexOf(N),
      why: opts.map((x) => (x === N ? `正しい。n＝${N} で成り立ち、それ以降も成り立つ。` : x < N ? `n＝${fails[fails.length - 1]} で成り立たないので、N＝${x} からは示せない。` : `n＝${N} でもう成り立つので、最小ではない。`)),
    },
    point: "小さい n を順に入れて、成り立ち始める所を出発点にする",
    steps: [
      { title: "小さい n で調べる", body: `n＝${fails.join(", ")} では成り立たず、n＝${N} で成り立ちます。`, back: [S4] },
      { title: "出発点", body: `[1] で n＝{{${N}}} を確かめ、[2] で k≧${N} として k＋1 のときを示します。`, trap: "n＝1 で成り立つからといって、そこから始められるとは限らない。途中で成り立たない n があるなら、[2] がどこかで示せない。" },
    ],
  };
}

export const H_MATH_B_KINO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学B",
  review: { status: "draft" },
  sections: [
    {
      title: "等式の証明",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "kuwaeru", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: kuwaeru }],
    },
    {
      title: "帰納法のしくみ",
      lead: "次の問いに答えなさい。",
      style: "mix",
      pick: 2,
      questions: [
        {
          id: "shikumi-2",
          type: "B",
          difficulty: 1,
          points: 14,
          seconds: 45,
          skill: "知識・技能",
          prompt: "数学的帰納法で「すべての自然数 n で P(n) が成り立つ」ことを示すとき、[1] とあわせて示すことはどれですか。",
          answer: {
            kind: "choice",
            options: ["P(k) が成り立つと仮定すると、P(k＋1) も成り立つ", "P(k＋1) が成り立つと仮定すると、P(k) も成り立つ", "P(2) と P(3) も成り立つ", "P(k) がすべての k で成り立つ"],
            correct: 0,
            why: ["正しい。[1] の n＝1 から、次々に成り立つことが伝わる。", "向きが逆。これでは n＝1 から先へ進めない。", "いくつか確かめても、すべての n で成り立つことにはならない。", "それは示したい結論そのもので、仮定にしてはいけない。"],
          },
          point: "[1] n＝1 で成り立つ、[2] k で成り立てば k＋1 でも",
          steps: [{ title: "2つの段階", body: "[1] で出発点、[2] で {{k のとき → k＋1 のとき}} を示します。ドミノの1枚目が倒れ、どれかが倒れれば次も倒れる、という形です。", back: [S1] }],
        },
        {
          id: "shikumi-1",
          type: "B",
          difficulty: 1,
          points: 14,
          seconds: 45,
          skill: "知識・技能",
          prompt: "数学的帰納法の [1] (n＝1 のとき) を省いて [2] だけを示すと、どうなりますか。",
          answer: {
            kind: "choice",
            options: ["どの n についても成り立つとはいえない", "すべての n で成り立つといえる", "n が偶数のときだけ成り立つといえる", "n≧2 で成り立つといえる"],
            correct: 0,
            why: ["正しい。出発点がないので、何も伝わらない。", "[2] は「k で成り立つなら」という条件つきなので、出発点がないと何も決まらない。", "[2] だけからは、偶数かどうかに関係なく何もいえない。", "n＝2 で成り立つことも示していないので、いえない。"],
          },
          point: "[2] は条件つき。[1] がないと何も決まらない",
          steps: [{ title: "出発点の役わり", body: "[2] は「P(k) が成り立つなら」という仮定の話です。{{[1] がなければ}}、最初のドミノが倒れないのと同じで、どの n も示せません。", back: [S1, S4] }],
        },
        {
          id: "shikumi-3",
          type: "B",
          difficulty: 1,
          points: 14,
          seconds: 45,
          skill: "知識・技能",
          prompt: "数学的帰納法の [2] で使ってよいものはどれですか。",
          answer: {
            kind: "choice",
            options: ["n＝k のときに成り立つという仮定", "n＝k＋1 のときに成り立つという仮定", "すべての n で成り立つという結論", "n＝k＋2 のときに成り立つという仮定"],
            correct: 0,
            why: ["正しい。この仮定から k＋1 のときを導く。", "それは [2] で示すことなので、使ってはいけない。", "示したい結論を使うと、証明にならない。", "k＋2 のことはまだ何もわかっていない。"],
          },
          point: "使えるのは「n＝k で成り立つ」だけ",
          steps: [{ title: "仮定と結論", body: "[2] では {{n＝k のとき成り立つ}} と仮定し、n＝k＋1 のときを導きます。", back: [S1, S2] }],
        },
        {
          id: "uma",
          type: "B",
          difficulty: 2,
          points: 16,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "「n 頭の馬はすべて同じ色」という主張を、次のように「証明」した。[1] n＝1 なら1頭なので正しい。[2] k 頭で正しいとする。k＋1 頭のうち、前の k 頭は同じ色で、後ろの k 頭も同じ色。両方に入っている馬がいるので、k＋1 頭は同じ色。この「証明」のまちがいはどこにありますか。",
          answer: {
            kind: "choice",
            options: ["k＝1 から k＋1＝2 に進むとき、前の1頭と後ろの1頭に共通の馬がいない", "[1] で n＝1 を確かめたこと", "k 頭で正しいと仮定したこと", "馬の数が自然数でないこと"],
            correct: 0,
            why: ["正しい。2頭のとき前の1頭と後ろの1頭は別の馬で、「両方に入っている馬」がいない。[2] がすべての k で成り立っていない。", "1頭なら同じ色なのは正しく、[1] にまちがいはない。", "仮定を置くのは帰納法の正しい手順。", "馬の頭数は自然数で、問題はない。"],
          },
          point: "[2] がすべての k で成り立つかを確かめる",
          steps: [
            { title: "k＝1 のとき", body: "k＋1＝2 頭のとき、前の1頭と後ろの1頭は {{重ならない}}。共通の馬がいないので、2頭が同じ色とはいえません。", back: [S1] },
            { title: "教訓", body: "[2] の議論は k≧2 でしか使えず、1 → 2 の段がつながっていません。ドミノが1か所でも倒れないと全体が崩れます。" },
          ],
        },
        {
          id: "futatsu",
          type: "B",
          difficulty: 2,
          points: 16,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "a₁＝1、a₂＝3、aₙ₊₂＝aₙ₊₁＋2aₙ で定められる数列について、「aₙ は奇数」を数学的帰納法で示す。[2] で仮定することとして適切なものはどれですか。",
          answer: {
            kind: "choice",
            options: ["n＝k と n＝k＋1 のとき奇数であること", "n＝k のときだけ奇数であること", "n＝k＋2 のとき奇数であること", "n＝1 のとき奇数であること"],
            correct: 0,
            why: ["正しい。aₖ₊₂ は aₖ₊₁ と aₖ の2つから決まるので、2つとも仮定する。[1] では n＝1, 2 を確かめる。", "aₖ₊₁ がわからないと、aₖ₊₂ が決まらない。", "それは示すほうのこと。", "[1] で確かめることで、[2] の仮定ではない。"],
          },
          point: "前の2つで決まる数列は、2つ続けて仮定する",
          steps: [
            { title: "何が必要か", body: "aₖ₊₂＝aₖ₊₁＋2aₖ なので、{{aₖ と aₖ₊₁}} の両方が奇数だとわかれば、aₖ₊₂＝奇数＋偶数＝奇数。", back: [S5] },
            { title: "[1] も2つ", body: "仮定が2つなので、[1] では n＝1 と n＝2 の両方を確かめます。" },
          ],
        },
        {
          id: "fudo",
          type: "B",
          difficulty: 2,
          points: 16,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "n≧4 のとき 2ⁿ≧n² を数学的帰納法で示す。[2] で k≧4、2ᵏ≧k² を仮定したとき、2ᵏ⁺¹≧(k＋1)² を示すために使う式として適切なものはどれですか。",
          answer: {
            kind: "choice",
            options: ["2ᵏ⁺¹−(k＋1)²≧2k²−(k＋1)²＝(k−1)²−2＞0", "2ᵏ⁺¹＝2ᵏ＋1≧k²＋1", "2ᵏ⁺¹≧(k＋1)² を両辺 2 でわる", "(k＋1)²−2ᵏ⁺¹≧0"],
            correct: 0,
            why: ["正しい。仮定から 2ᵏ⁺¹＝2·2ᵏ≧2k²。k≧4 なら (k−1)²−2≧7＞0。", "2ᵏ⁺¹ は 2ᵏ の2倍で、2ᵏ＋1 ではない。", "示したい式を変形しても、仮定を使っていないので証明にならない。", "大小が逆で、示したい向きとちがう。"],
          },
          point: "仮定 2ᵏ≧k² を使って 2ᵏ⁺¹≧2k² とし、差をとる",
          steps: [
            { title: "仮定を使う", body: "2ᵏ⁺¹＝2·2ᵏ≧{{2k²}}。", back: [S4] },
            { title: "差が正", body: "2k²−(k＋1)²＝k²−2k−1＝(k−1)²−2。k≧4 なら 9−2＝7 以上で正。k≧4 の条件をここで使います。" },
          ],
        },
      ],
    },
    {
      title: "倍数と出発点",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "sa", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: sa },
        { id: "ruijo", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: ruijo },
        { id: "shuppatsu", type: "A", difficulty: 3, points: 24, seconds: 150, skill: "思考・判断・表現", generate: shuppatsu },
      ],
    },
  ],
};
