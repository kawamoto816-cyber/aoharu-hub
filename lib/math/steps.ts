// AOHARU MATH「中学数学 計算50段」の段差表。
// 1セット10問。解き直しなしで満点・目標時間内なら合格、2セット続けて合格で次の段へ。
// target は10問あたりの目標時間 (分、仮の値)。prev は、つまずいたときに戻る段。
// hint は2回続けて間違えたときに出すヒントカード (考え方 + 例)。

export interface MathUnit {
  key: string;
  title: string;
  grade: "中1" | "中2" | "中3";
  from: number;
  to: number;
}

export interface MathStep {
  no: number;
  unit: string;
  title: string;
  example: string;
  target: number;
  prev: number[];
  hint: string;
  /** ヒントの例 (式 → 途中 → 答え) */
  hintSteps: string[];
}

export const UNITS: MathUnit[] = [
  { key: "seifu", title: "正負の数", grade: "中1", from: 1, to: 8 },
  { key: "mojishiki", title: "文字式", grade: "中1", from: 9, to: 14 },
  { key: "ichiji", title: "一次方程式", grade: "中1", from: 15, to: 21 },
  { key: "shiki", title: "式の計算", grade: "中2", from: 22, to: 28 },
  { key: "renritsu", title: "連立方程式", grade: "中2", from: 29, to: 33 },
  { key: "ichijikansu", title: "一次関数", grade: "中2", from: 34, to: 35 },
  { key: "tenkai", title: "展開と因数分解", grade: "中3", from: 36, to: 42 },
  { key: "heihokon", title: "平方根", grade: "中3", from: 43, to: 46 },
  { key: "niji", title: "二次方程式", grade: "中3", from: 47, to: 49 },
  { key: "nijikansu", title: "関数 y=ax²", grade: "中3", from: 50, to: 50 },
];

export const STEPS: MathStep[] = [
  { no: 1, unit: "seifu", title: "正負の数のたし算", example: "(-7)+5", target: 2, prev: [], hint: "同じ符号なら絶対値をたして符号をつける。ちがう符号なら絶対値の大きい方から小さい方をひき、大きい方の符号をつける。", hintSteps: ["(-7)+5", "7-5=2、7の方が大きいので -", "-2"] },
  { no: 2, unit: "seifu", title: "正負の数のひき算", example: "3-(-8)", target: 2, prev: [1], hint: "ひき算は「符号を変えた数のたし算」にする。-(-8) は +8 になる。", hintSteps: ["3-(-8)", "3+8", "11"] },
  { no: 3, unit: "seifu", title: "たし算・ひき算の混じった式", example: "-5+8-(-3)-6", target: 3, prev: [2], hint: "かっこをはずして、正の数どうし・負の数どうしをまとめてから計算する。", hintSteps: ["-5+8-(-3)-6", "-5+8+3-6 → (8+3)+(-5-6)", "11-11=0"] },
  { no: 4, unit: "seifu", title: "かけ算・わり算（整数）", example: "(-6)×4", target: 2, prev: [1], hint: "符号を先に決める。負の数が1つなら -、2つなら +。そのあと絶対値どうしを計算する。", hintSteps: ["(-6)×4", "負の数が1つ → -", "-24"] },
  { no: 5, unit: "seifu", title: "累乗", example: "(-3)^2, -3^2", target: 3, prev: [4], hint: "(-3)² は (-3)×(-3) で 9。-3² は -(3×3) で -9。かっこがあるかどうかで答えが変わる。", hintSteps: ["-3^2", "-(3×3)", "-9"] },
  { no: 6, unit: "seifu", title: "四則の混じった計算", example: "-2×(-3)^2+10÷(-5)", target: 4, prev: [5], hint: "累乗 → かっこの中 → かけ算・わり算 → たし算・ひき算の順に計算する。", hintSteps: ["-2×(-3)^2+10÷(-5)", "-2×9+(-2)", "-18-2=-20"] },
  { no: 7, unit: "seifu", title: "分数のたし算・ひき算", example: "-1/2+2/3", target: 4, prev: [3], hint: "分母をそろえて (通分して) から分子を計算する。最後に約分を忘れずに。", hintSteps: ["-1/2+2/3", "-3/6+4/6", "1/6"] },
  { no: 8, unit: "seifu", title: "分数のかけ算・わり算", example: "(-3/4)÷9/8", target: 4, prev: [6], hint: "わり算は「逆数をかける」に直す。符号を先に決め、約分してからかけると楽。", hintSteps: ["(-3/4)÷9/8", "(-3/4)×8/9", "-2/3"] },
  { no: 9, unit: "mojishiki", title: "文字式の表し方", example: "a×b×3", target: 2, prev: [], hint: "× は書かない。数を前に、文字はアルファベット順に。同じ文字は指数でまとめる。1 は書かない。", hintSteps: ["b×a×(-6)×b", "数を前に・文字は順に", "-6ab^2"] },
  { no: 10, unit: "mojishiki", title: "式の値", example: "x=-2 のとき 3x^2-5", target: 3, prev: [6], hint: "文字に数を入れるときは、かっこをつけて入れる。累乗を先に計算する。", hintSteps: ["3x^2-5 (x=-2)", "3×(-2)^2-5", "12-5=7"] },
  { no: 11, unit: "mojishiki", title: "一次式のたし算・ひき算", example: "(3x-5)-(x-7)", target: 3, prev: [9], hint: "-( ) をはずすと中の符号が全部変わる。x の項どうし、数の項どうしをまとめる。", hintSteps: ["(3x-5)-(x-7)", "3x-5-x+7", "2x+2"] },
  { no: 12, unit: "mojishiki", title: "一次式と数のかけ算・わり算", example: "-3(2x-4)", target: 3, prev: [11], hint: "かっこの前の数を、中のすべての項にかける (分配法則)。わり算は各項をわる。", hintSteps: ["-3(2x-4)", "-3×2x+(-3)×(-4)", "-6x+12"] },
  { no: 13, unit: "mojishiki", title: "かっこがいくつもある一次式", example: "2(3x-1)-3(x-2)", target: 4, prev: [12], hint: "それぞれのかっこを分配法則ではずしてから、同類項をまとめる。", hintSteps: ["2(3x-1)-3(x-2)", "6x-2-3x+6", "3x+4"] },
  { no: 14, unit: "mojishiki", title: "分数の形の一次式", example: "(x+1)/2-(x-3)/3", target: 5, prev: [13, 7], hint: "分母の最小公倍数で通分し、分子をかっこごと計算する。答えは (…)/6 の形でも、x の係数を分数にした形でもよい。", hintSteps: ["(x+1)/2-(x-3)/3", "(3(x+1)-2(x-3))/6", "(x+9)/6"] },
  { no: 15, unit: "ichiji", title: "方程式 x+a=b、ax=b", example: "4x=-12", target: 2, prev: [4], hint: "移項すると符号が変わる。ax=b は両辺を a でわる。", hintSteps: ["4x=-12", "x=-12÷4", "x=-3"] },
  { no: 16, unit: "ichiji", title: "方程式 ax+b=c", example: "3x-5=7", target: 3, prev: [15], hint: "数の項を右辺に移項してから、x の係数でわる。", hintSteps: ["3x-5=7", "3x=7+5=12", "x=4"] },
  { no: 17, unit: "ichiji", title: "両辺に x がある方程式", example: "5x-3=2x+9", target: 4, prev: [16], hint: "x の項を左辺、数の項を右辺に集める。", hintSteps: ["5x-3=2x+9", "5x-2x=9+3", "3x=12 → x=4"] },
  { no: 18, unit: "ichiji", title: "かっこを含む方程式", example: "3(x-2)=x+4", target: 4, prev: [17, 12], hint: "まずかっこをはずしてから、両辺に x がある方程式と同じように解く。", hintSteps: ["3(x-2)=x+4", "3x-6=x+4", "2x=10 → x=5"] },
  { no: 19, unit: "ichiji", title: "小数の係数の方程式", example: "0.3x-1.2=0.5x", target: 5, prev: [18], hint: "両辺を10倍して、係数を整数にしてから解く。すべての項にかけるのを忘れずに。", hintSteps: ["0.3x-1.2=0.5x", "3x-12=5x", "-2x=12 → x=-6"] },
  { no: 20, unit: "ichiji", title: "分数の係数の方程式", example: "(x+1)/2=(x+4)/3", target: 5, prev: [19, 14], hint: "両辺に分母の最小公倍数をかけて、分母をはらう。", hintSteps: ["(x+1)/2=(x+4)/3", "3(x+1)=2(x+4)", "3x+3=2x+8 → x=5"] },
  { no: 21, unit: "ichiji", title: "比例式", example: "x:12=3:4", target: 3, prev: [15], hint: "a:b=c:d なら ad=bc (外側どうしの積 = 内側どうしの積)。", hintSteps: ["x:12=3:4", "4x=12×3", "x=9"] },
  { no: 22, unit: "shiki", title: "2文字の多項式のたし算・ひき算", example: "(3a-2b)-(a-5b)", target: 3, prev: [11], hint: "a の項どうし、b の項どうしをまとめる。-( ) は中の符号を全部変える。", hintSteps: ["(3a-2b)-(a-5b)", "3a-2b-a+5b", "2a+3b"] },
  { no: 23, unit: "shiki", title: "多項式と数の計算・分数の式", example: "(2x-y)/3-(x-y)/2", target: 5, prev: [22, 14], hint: "分数の式は通分し、分子をかっこごと計算する。", hintSteps: ["(2x-y)/3-(x-y)/2", "(2(2x-y)-3(x-y))/6", "(x+y)/6"] },
  { no: 24, unit: "shiki", title: "単項式のかけ算", example: "(-3a)×4ab", target: 3, prev: [5], hint: "係数どうし、文字どうしをかける。同じ文字は指数をたす。", hintSteps: ["(-3a)×4ab", "(-3×4)×(a×a×b)", "-12a^2b"] },
  { no: 25, unit: "shiki", title: "単項式のわり算", example: "12a^2b÷(-4a)", target: 3, prev: [24], hint: "分数の形にして、係数どうし・文字どうしを約分する。÷4a は ÷(4a) のこと。", hintSteps: ["12a^2b÷(-4a)", "-(12×a×a×b)/(4×a)", "-3ab"] },
  { no: 26, unit: "shiki", title: "かけ算・わり算の混じった単項式", example: "6x^2y÷3x×(-2y)", target: 4, prev: [25], hint: "わる式を分母に、かける式を分子に置いた1つの分数にしてから約分する。", hintSteps: ["6x^2y÷3x×(-2y)", "-(6x^2y×2y)/(3x)", "-4xy^2"] },
  { no: 27, unit: "shiki", title: "式を簡単にしてから値を求める", example: "a=2, b=-1 のとき 3(a-2b)-(a-b)", target: 4, prev: [22, 10], hint: "いきなり代入せず、先に式を簡単にしてから数を入れると計算ミスが減る。", hintSteps: ["3(a-2b)-(a-b)", "2a-5b", "2×2-5×(-1)=9"] },
  { no: 28, unit: "shiki", title: "等式の変形", example: "3x+2y=6 を y について解く", target: 4, prev: [17], hint: "解く文字の項だけを左辺に残し、ほかを移項してから係数でわる。", hintSteps: ["3x+2y=6", "2y=-3x+6", "y=-3/2x+3"] },
  { no: 29, unit: "renritsu", title: "連立方程式：加減法（そのまま消せる）", example: "x+y=5、x-y=1", target: 3, prev: [17], hint: "係数が同じならひき、反対の符号ならたして、文字を1つ消す。", hintSteps: ["x+y=5、x-y=1", "たす → 2x=6", "x=3、y=2"] },
  { no: 30, unit: "renritsu", title: "連立方程式：加減法（係数をそろえる）", example: "3x+2y=8、2x-3y=1", target: 5, prev: [29], hint: "消したい文字の係数の絶対値がそろうように、式を何倍かしてから加減する。", hintSteps: ["3x+2y=8、2x-3y=1", "①×3+②×2 → 13x=26", "x=2、y=1"] },
  { no: 31, unit: "renritsu", title: "連立方程式：代入法", example: "y=2x-1、3x+y=9", target: 4, prev: [29], hint: "y=… の式を、もう1つの式の y にかっこごと代入する。", hintSteps: ["3x+(2x-1)=9", "5x=10", "x=2、y=3"] },
  { no: 32, unit: "renritsu", title: "小数・分数を含む連立方程式", example: "0.2x+0.5y=1.6、x/2-y/3=1", target: 6, prev: [30, 20], hint: "小数の式は10倍、分数の式は分母の最小公倍数倍して、係数を整数にしてから解く。", hintSteps: ["0.2x+0.5y=1.6 → 2x+5y=16", "x/2-y/3=1 → 3x-2y=6", "加減法で解く"] },
  { no: 33, unit: "renritsu", title: "A=B=C の形の連立方程式", example: "2x+y=x-y=3", target: 5, prev: [30], hint: "A=C と B=C の2つの式に分けて、連立方程式として解く。", hintSteps: ["2x+y=x-y=3", "2x+y=3、x-y=3", "x=2、y=-1"] },
  { no: 34, unit: "ichijikansu", title: "一次関数：傾きと1点から式を求める", example: "傾き-2で点(1,3)を通る", target: 4, prev: [28], hint: "y=ax+b に傾き a と点の座標を代入して、b を求める。", hintSteps: ["y=-2x+b に (1,3)", "3=-2+b → b=5", "y=-2x+5"] },
  { no: 35, unit: "ichijikansu", title: "一次関数：2点を通る直線の式", example: "(-1,5)と(2,-1)を通る", target: 5, prev: [34], hint: "傾き = y の増加量 ÷ x の増加量。そのあと1点を代入して b を求める。", hintSteps: ["傾き (-1-5)÷(2-(-1)) = -2", "5=-2×(-1)+b → b=3", "y=-2x+3"] },
  { no: 36, unit: "tenkai", title: "単項式×多項式・多項式÷単項式", example: "2x(3x-5)", target: 3, prev: [24, 25], hint: "前の単項式を、かっこの中のすべての項にかける。わり算は各項をわる。", hintSteps: ["2x(3x-5)", "2x×3x+2x×(-5)", "6x^2-10x"] },
  { no: 37, unit: "tenkai", title: "多項式×多項式の展開", example: "(a+2)(b-3)", target: 4, prev: [36], hint: "前のかっこの各項を、うしろのかっこの各項に1つずつかけて、同類項をまとめる。", hintSteps: ["(a+2)(b-3)", "ab-3a+2b-6", "ab-3a+2b-6"] },
  { no: 38, unit: "tenkai", title: "乗法公式 (x+a)(x+b)", example: "(x+3)(x-5)", target: 3, prev: [37], hint: "(x+a)(x+b) = x² + (a+b)x + ab。たした数が x の係数、かけた数が定数項。", hintSteps: ["(x+3)(x-5)", "x^2+(3-5)x+3×(-5)", "x^2-2x-15"] },
  { no: 39, unit: "tenkai", title: "乗法公式 (x±a)²、(x+a)(x-a)", example: "(2x-3)^2", target: 4, prev: [38], hint: "(a+b)² = a²+2ab+b²、(a-b)² = a²-2ab+b²、(a+b)(a-b) = a²-b²。", hintSteps: ["(2x-3)^2", "(2x)^2-2×2x×3+3^2", "4x^2-12x+9"] },
  { no: 40, unit: "tenkai", title: "展開を使う計算のまとめ", example: "(x+2)^2-(x+3)(x-3)", target: 5, prev: [39], hint: "それぞれを展開してから、うしろの式はかっこごとひく。", hintSteps: ["(x+2)^2-(x+3)(x-3)", "(x^2+4x+4)-(x^2-9)", "4x+13"] },
  { no: 41, unit: "tenkai", title: "因数分解：共通因数と x²+(a+b)x+ab", example: "x^2-2x-15", target: 4, prev: [38], hint: "まず共通因数をくくり出す。x²+px+q は、かけて q・たして p になる2数を探す。", hintSteps: ["x^2-2x-15", "かけて-15、たして-2 → -5と3", "(x-5)(x+3)"] },
  { no: 42, unit: "tenkai", title: "因数分解：平方・和と差・共通因数のあと公式", example: "2x^2-18", target: 5, prev: [41, 39], hint: "共通因数をくくり出してから、a²-b²=(a+b)(a-b)、a²+2ab+b²=(a+b)² を使う。", hintSteps: ["2x^2-18", "2(x^2-9)", "2(x+3)(x-3)"] },
  { no: 43, unit: "heihokon", title: "平方根", example: "50の平方根", target: 3, prev: [5], hint: "2乗して a になる数が a の平方根。正と負の2つある。", hintSteps: ["49 の平方根", "7²=49、(-7)²=49", "7 と -7"] },
  { no: 44, unit: "heihokon", title: "a√b の形にする", example: "√72", target: 3, prev: [43], hint: "√ の中を「平方数 × 残り」に分けて、平方数を外に出す。", hintSteps: ["√72", "√(36×2)", "6√2"] },
  { no: 45, unit: "heihokon", title: "√ のかけ算・わり算と有理化", example: "6/√3", target: 4, prev: [44], hint: "√a×√b=√ab。分母に √ があるときは、分母と分子に同じ √ をかけて分母を整数にする (有理化)。", hintSteps: ["6/√3", "6√3/(√3×√3)", "6√3/3=2√3"] },
  { no: 46, unit: "heihokon", title: "√ のたし算・ひき算と展開", example: "√12+√27", target: 5, prev: [45, 39], hint: "a√b の形にそろえてから、√ の中が同じものどうしをまとめる。展開は乗法公式を使う。", hintSteps: ["√12+√27", "2√3+3√3", "5√3"] },
  { no: 47, unit: "niji", title: "二次方程式：平方根を使う", example: "(x-2)^2=5", target: 3, prev: [44], hint: "( )²=k なら ( )=±√k。2つの解を忘れずに。", hintSteps: ["(x-2)^2=5", "x-2=±√5", "x=2+√5、2-√5"] },
  { no: 48, unit: "niji", title: "二次方程式：因数分解で解く", example: "x^2-5x+6=0", target: 4, prev: [42], hint: "左辺を因数分解して、AB=0 なら A=0 または B=0 を使う。", hintSteps: ["x^2-5x+6=0", "(x-2)(x-3)=0", "x=2、3"] },
  { no: 49, unit: "niji", title: "二次方程式：解の公式", example: "2x^2+3x-1=0", target: 6, prev: [47, 45], hint: "ax²+bx+c=0 の解は x = (-b ± √(b²-4ac)) / 2a。√ の中を計算し、できるだけ簡単にする。", hintSteps: ["2x^2+3x-1=0 (a=2, b=3, c=-1)", "x=(-3±√(9+8))/4", "x=(-3+√17)/4、(-3-√17)/4"] },
  { no: 50, unit: "nijikansu", title: "関数 y=ax²：式と変化の割合", example: "点(2,12)を通る", target: 5, prev: [34, 5], hint: "式は点の座標を代入して a を求める。変化の割合 = y の増加量 ÷ x の増加量 (y=ax² では a×(x₁+x₂) になる)。", hintSteps: ["y=2x^2、x が1から3", "(18-2)÷(3-1)", "8"] },
];

export function findStep(no: number): MathStep | null {
  return STEPS.find((s) => s.no === no) ?? null;
}

export function unitOf(no: number): MathUnit {
  return UNITS.find((u) => no >= u.from && no <= u.to)!;
}

/** 学力診断で出す段 (各単元の代表) と、つまずいたときに始める段 */
export const DIAGNOSIS: { step: number; start: number }[] = [
  { step: 3, start: 1 },
  { step: 8, start: 4 },
  { step: 13, start: 9 },
  { step: 18, start: 15 },
  { step: 26, start: 22 },
  { step: 30, start: 29 },
  { step: 39, start: 36 },
  { step: 42, start: 41 },
  { step: 46, start: 43 },
  { step: 49, start: 47 },
];
