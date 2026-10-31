// AOHARU MATH 高校「高校数学 計算○段」の段差表。中学数学 計算50段 (lib/math) と同じしくみ。
// 1セット10問。解き直しなしで満点・目標時間内なら合格、2セット続けて合格で次の段へ。
// target は10問あたりの目標時間 (分、仮の値)。prev は、つまずいたときに戻る段。
// hint は2回続けて間違えたときに出すヒントカード (考え方 + 例)。

export type Subject = "1" | "A" | "2";

export const SUBJECTS: { key: Subject; name: string }[] = [
  { key: "1", name: "数学Ⅰ" },
  { key: "A", name: "数学A" },
  { key: "2", name: "数学Ⅱ" },
];

export interface KousuuUnit {
  key: string;
  title: string;
  subject: Subject;
}

export interface KousuuStep {
  no: number;
  unit: string;
  title: string;
  example: string;
  target: number;
  prev: number[];
  hint: string;
  hintSteps: string[];
}

export const UNITS: KousuuUnit[] = [
  { key: "tenkai", title: "式の展開", subject: "1" },
  { key: "insu", title: "因数分解", subject: "1" },
  { key: "kongo", title: "根号を含む計算", subject: "1" },
  { key: "futoshiki", title: "一次不等式・絶対値", subject: "1" },
  { key: "nijikansu", title: "二次関数", subject: "1" },
  { key: "nijihotei", title: "二次方程式・二次不等式", subject: "1" },
  { key: "sankakuhi", title: "三角比", subject: "1" },
  { key: "baai", title: "場合の数", subject: "A" },
  { key: "kakuritsu", title: "確率", subject: "A" },
  { key: "seisu", title: "整数の性質", subject: "A" },
  { key: "shiki", title: "式と証明", subject: "2" },
  { key: "fukuso", title: "複素数と方程式", subject: "2" },
  { key: "shisu", title: "指数関数・対数関数", subject: "2" },
  { key: "sankakukansu", title: "三角関数", subject: "2" },
  { key: "bibun", title: "微分", subject: "2" },
  { key: "sekibun", title: "積分", subject: "2" },
];

export const STEPS: KousuuStep[] = [
  // 数学Ⅰ 式の展開
  { no: 1, unit: "tenkai", title: "2文字の式の展開", example: "(2x+3y)^2", target: 4, prev: [], hint: "(a+b)²=a²+2ab+b²、(a+b)(a−b)=a²−b²、(ax+b)(cx+d)=acx²+(ad+bc)x+bd。y の項も同じように数として扱う。", hintSteps: ["(2x+3y)^2", "(2x)^2+2×2x×3y+(3y)^2", "4x^2+12xy+9y^2"] },
  { no: 2, unit: "tenkai", title: "くふうする展開（3つの項・組み合わせ）", example: "(x+y+1)(x+y-1)", target: 6, prev: [1], hint: "同じ式のかたまりを A とおくと公式が使える。4つの積は、定数項の和が等しい組を先にかける。", hintSteps: ["(x+y+1)(x+y-1)", "x+y=A とおく → (A+1)(A-1)=A^2-1", "x^2+2xy+y^2-1"] },
  { no: 3, unit: "tenkai", title: "3乗の展開", example: "(x+2)^3", target: 5, prev: [1], hint: "(a+b)³=a³+3a²b+3ab²+b³、(a+b)(a²−ab+b²)=a³+b³、(a−b)(a²+ab+b²)=a³−b³。", hintSteps: ["(2x-y)^3", "(2x)^3-3(2x)^2y+3(2x)y^2-y^3", "8x^3-12x^2y+6xy^2-y^3"] },
  // 因数分解
  { no: 4, unit: "insu", title: "因数分解：共通因数と公式", example: "x^2+5xy+6y^2", target: 4, prev: [1], hint: "まず共通因数をくくり出す。x²+(a+b)xy+aby²=(x+ay)(x+by)、a²−b²=(a+b)(a−b)、a²±2ab+b²=(a±b)²。", hintSteps: ["3x^2y-12y", "3y(x^2-4)", "3y(x+2)(x-2)"] },
  { no: 5, unit: "insu", title: "因数分解：たすきがけ", example: "6x^2+x-2", target: 6, prev: [4], hint: "acx²+(ad+bc)x+bd=(ax+b)(cx+d)。x² の係数と定数項をかけ算に分け、たすきにかけてたした数が x の係数になる組を探す。", hintSteps: ["6x^2+x-2", "2×3、−1×2 → 2×2+3×(−1)=1", "(2x-1)(3x+2)"] },
  { no: 6, unit: "insu", title: "因数分解：おきかえ", example: "(x+y)^2-3(x+y)-10", target: 7, prev: [5], hint: "くり返し出てくる式を A とおく。x⁴ の式は x²=A。最後に A をもどして、さらに分解できないか確かめる。", hintSteps: ["x^4-5x^2+4", "x^2=A → (A-1)(A-4)", "(x+1)(x-1)(x+2)(x-2)"] },
  { no: 7, unit: "insu", title: "因数分解：3乗の公式", example: "x^3+8", target: 5, prev: [3, 4], hint: "a³+b³=(a+b)(a²−ab+b²)、a³−b³=(a−b)(a²+ab+b²)、a³+3a²b+3ab²+b³=(a+b)³。", hintSteps: ["27x^3-y^3", "(3x)^3-y^3", "(3x-y)(9x^2+3xy+y^2)"] },
  { no: 8, unit: "insu", title: "因数分解：2文字の式（1つの文字で整理）", example: "x^2+xy-2y^2+2x+7y-3", target: 8, prev: [5], hint: "x について整理する (y は数とみる)。定数項にあたる y の式を因数分解してから、たすきがけ。", hintSteps: ["x^2+xy-2y^2+2x+7y-3", "x^2+(y+2)x-(2y^2-7y+3) → 定数項 -(2y-1)(y-3)", "(x+2y-1)(x-y+3)"] },
  // 根号
  { no: 9, unit: "kongo", title: "根号を含む式の計算", example: "(2√3-√2)(√3+√2)", target: 5, prev: [], hint: "√ の中を簡単にしてから、文字式と同じように展開・同類項のまとめをする。√a×√a=a。", hintSteps: ["(2√3-√2)(√3+√2)", "6+2√6-√6-2", "4+√6"] },
  { no: 10, unit: "kongo", title: "分母の有理化（分母が2つの項）", example: "1/(√3-√2)", target: 5, prev: [9], hint: "分母が √a−√b なら、分母と分子に √a+√b をかける。(√a−√b)(√a+√b)=a−b で分母が整数になる。", hintSteps: ["4/(√5+1)", "4(√5-1)/((√5+1)(√5-1))", "4(√5-1)/4=√5-1"] },
  { no: 11, unit: "kongo", title: "式の値（対称式）", example: "x=2+√3, y=2-√3 のとき x^2+y^2", target: 6, prev: [10], hint: "x+y と xy を先に求める。x²+y²=(x+y)²−2xy、x³+y³=(x+y)³−3xy(x+y)。", hintSteps: ["x+y=4、xy=1", "x^2+y^2=(x+y)^2-2xy", "16-2=14"] },
  { no: 12, unit: "kongo", title: "二重根号をはずす", example: "√(5+2√6)", target: 5, prev: [9], hint: "√(a+b+2√ab)=√a+√b、√(a+b−2√ab)=√a−√b (a>b)。たして中の数・かけて√の中の数になる2数を探す。2 がないときは中を2倍して 2 をつくる。", hintSteps: ["√(7-2√12)", "たして7・かけて12 → 4と3", "√4-√3=2-√3"] },
  // 不等式・絶対値
  { no: 13, unit: "futoshiki", title: "一次不等式", example: "3x-5>5x+1", target: 4, prev: [], hint: "方程式と同じように移項する。両辺に負の数をかけたり、負の数でわったりすると、不等号の向きが変わる。", hintSteps: ["3x-5>5x+1", "-2x>6", "x<-3"] },
  { no: 14, unit: "futoshiki", title: "連立不等式", example: "2x-1>3, x+2≤8", target: 6, prev: [13], hint: "それぞれの不等式を解いて、数直線で共通の範囲をとる。共通部分がなければ「解なし」。A<B<C は A<B と B<C に分ける。", hintSteps: ["2x-1>3、x+2≤8", "x>2、x≤6", "2<x≤6"] },
  { no: 15, unit: "futoshiki", title: "絶対値を含む方程式", example: "|2x-1|=5", target: 5, prev: [13], hint: "|A|=c (c>0) なら A=±c。右辺に x があるときは、中が 0 以上・0 より小さいで場合分けして、条件に合う解だけを残す。", hintSteps: ["|2x-1|=5", "2x-1=5 または 2x-1=-5", "x=3, -2"] },
  { no: 16, unit: "futoshiki", title: "絶対値を含む不等式", example: "|x-2|<3", target: 5, prev: [15], hint: "|A|<c なら −c<A<c、|A|>c なら A<−c または c<A (c>0)。", hintSteps: ["|x-1|≥2", "x-1≤-2 または 2≤x-1", "x≤-1, 3≤x"] },
  // 二次関数
  { no: 17, unit: "nijikansu", title: "平方完成と頂点", example: "y=2x^2-8x+5", target: 6, prev: [], hint: "x² の係数でくくって、(x−p)² の形をつくる。y=a(x−p)²+q の頂点は (p, q)。", hintSteps: ["y=2x^2-8x+5", "2(x^2-4x)+5=2(x-2)^2-8+5", "頂点 (2, -3)"] },
  { no: 18, unit: "nijikansu", title: "二次関数の最大値・最小値", example: "y=-x^2+4x+1 の最大値", target: 5, prev: [17], hint: "平方完成して頂点を求める。下に凸 (a>0) なら頂点で最小、上に凸 (a<0) なら頂点で最大。", hintSteps: ["y=-x^2+4x+1", "-(x-2)^2+5", "x=2 のとき最大値 5"] },
  { no: 19, unit: "nijikansu", title: "最大・最小（定義域つき）", example: "y=x^2-4x+1 (0≤x≤5)", target: 7, prev: [18], hint: "グラフをかき、軸が定義域の中にあるか外にあるかを見る。頂点と、定義域の両はしの y の値をくらべる。", hintSteps: ["y=(x-2)^2-3 (0≤x≤5)", "x=2 で -3、x=0 で 1、x=5 で 6", "最大値 6、最小値 -3"] },
  // 二次方程式・不等式
  { no: 20, unit: "nijihotei", title: "二次方程式（たすきがけで解く）", example: "6x^2+x-2=0", target: 5, prev: [5], hint: "左辺をたすきがけで因数分解し、AB=0 なら A=0 または B=0。", hintSteps: ["6x^2+x-2=0", "(2x-1)(3x+2)=0", "x=1/2, -2/3"] },
  { no: 21, unit: "nijihotei", title: "二次方程式（解の公式）", example: "x^2-4x+1=0", target: 6, prev: [20, 9], hint: "ax²+bx+c=0 の解は x=(−b±√(b²−4ac))/2a。b が偶数 (b=2b') なら x=(−b'±√(b'²−ac))/a が速い。", hintSteps: ["x^2-4x+1=0 (b'=-2)", "x=2±√(4-1)", "x=2+√3, 2-√3"] },
  { no: 22, unit: "nijihotei", title: "判別式（実数解の個数）", example: "x^2-6x+k=0 が重解をもつ k", target: 6, prev: [21], hint: "D=b²−4ac。D>0 なら異なる2つの実数解、D=0 なら重解 (1個)、D<0 なら実数解なし。", hintSteps: ["x^2-6x+k=0 が重解", "D/4=9-k=0", "k=9"] },
  { no: 23, unit: "nijihotei", title: "二次不等式（因数分解できる）", example: "x^2-x-6<0", target: 6, prev: [20, 13], hint: "x² の係数を正にしてから因数分解し、解を α<β とする。(x−α)(x−β)<0 なら α<x<β、>0 なら x<α, β<x。", hintSteps: ["x^2-x-6≥0", "(x+2)(x-3)≥0", "x≤-2, 3≤x"] },
  { no: 24, unit: "nijihotei", title: "二次不等式（解の公式・判別式）", example: "x^2-2x-1>0", target: 7, prev: [23, 21], hint: "因数分解できなければ解の公式で境目を求める。D<0 なら、グラフが x 軸より上にあるので「すべての実数」か「解なし」。D=0 は頂点だけに注意。", hintSteps: ["x^2-2x-1>0", "x^2-2x-1=0 の解は 1±√2", "x<1-√2, 1+√2<x"] },
  // 三角比
  { no: 25, unit: "sankakuhi", title: "三角比の値（0°〜180°）", example: "sin120°, cos135°", target: 4, prev: [], hint: "半径1の半円で考える。角 θ の点の座標が (cosθ, sinθ)、tanθ=sinθ/cosθ。180°−θ の sin は同じ、cos と tan は符号が変わる。", hintSteps: ["cos135°", "cos(180°-45°)=-cos45°", "-√2/2"] },
  { no: 26, unit: "sankakuhi", title: "三角比の相互関係", example: "sinθ=3/5 (90°<θ<180°)", target: 6, prev: [25], hint: "sin²θ+cos²θ=1、tanθ=sinθ/cosθ、1+tan²θ=1/cos²θ。90°<θ<180° なら cosθ<0、tanθ<0。", hintSteps: ["sinθ=1/3 (0°<θ<90°)", "cos^2θ=1-1/9=8/9 → cosθ=2√2/3", "tanθ=1/(2√2)=√2/4"] },
  { no: 27, unit: "sankakuhi", title: "正弦定理", example: "b=4, A=45°, B=30° のとき a", target: 5, prev: [25], hint: "a/sinA=b/sinB=c/sinC=2R (R は外接円の半径)。", hintSteps: ["a/sin45°=4/sin30°", "a=4×(√2/2)÷(1/2)", "a=4√2"] },
  { no: 28, unit: "sankakuhi", title: "余弦定理", example: "b=3, c=5, A=120° のとき a", target: 6, prev: [25], hint: "a²=b²+c²−2bc cosA。角を求めるときは cosA=(b²+c²−a²)/2bc。", hintSteps: ["a^2=3^2+5^2-2×3×5×cos120°", "9+25+15=49", "a=7"] },
  { no: 29, unit: "sankakuhi", title: "三角形の面積", example: "b=4, c=5, A=60° のとき面積", target: 4, prev: [25], hint: "2辺とその間の角がわかれば S=(1/2)bc sinA。", hintSteps: ["S=1/2×4×5×sin60°", "10×√3/2", "5√3"] },
  // 数学A 場合の数
  { no: 30, unit: "baai", title: "階乗・順列 nPr", example: "7P3", target: 3, prev: [], hint: "n!=n×(n−1)×…×1、0!=1。nPr は n から1ずつ小さくしながら r 個かける。", hintSteps: ["7P3", "7×6×5", "210"] },
  { no: 31, unit: "baai", title: "組合せ nCr", example: "8C3", target: 4, prev: [30], hint: "nCr=nPr/r!。nCr=nC(n−r) を使うと計算が少なくなる。", hintSteps: ["10C8=10C2", "(10×9)/(2×1)", "45"] },
  { no: 32, unit: "baai", title: "いろいろな数え方", example: "6人が円形に並ぶ並び方", target: 6, prev: [31], hint: "円順列は (n−1)!、重複順列は nʳ、同じものを含む順列は n!/(p!q!…)、選んでから並べるなら組合せ×…。", hintSteps: ["6人の円順列", "(6-1)!", "120 通り"] },
  // 確率
  { no: 33, unit: "kakuritsu", title: "確率（さいころ・硬貨）", example: "2個のさいころの目の和が7", target: 5, prev: [], hint: "全部の場合 (さいころ2個なら36通り) のうち、あてはまる場合を表にして数える。答えは約分する。", hintSteps: ["和が7：(1,6)(2,5)(3,4)(4,3)(5,2)(6,1)", "6/36", "1/6"] },
  { no: 34, unit: "kakuritsu", title: "確率（組合せを使う）", example: "赤4個・白3個から2個とも赤", target: 6, prev: [31, 33], hint: "同時に取り出すときは組合せで数える。「少なくとも1つ」は 1−(1つもない確率)。", hintSteps: ["4C2/7C2", "6/21", "2/7"] },
  { no: 35, unit: "kakuritsu", title: "反復試行の確率", example: "さいころを3回投げて1の目がちょうど1回", target: 6, prev: [34], hint: "確率 p のことが n 回中ちょうど r 回おこる確率は nCr × pʳ × (1−p)ⁿ⁻ʳ。", hintSteps: ["3C1×(1/6)×(5/6)^2", "3×25/216", "25/72"] },
  // 整数
  { no: 36, unit: "seisu", title: "最大公約数・最小公倍数", example: "168と252", target: 5, prev: [], hint: "素因数分解して、共通な素因数の指数の小さい方をかけると最大公約数、大きい方をかけると最小公倍数。ab=(最大公約数)×(最小公倍数)。", hintSteps: ["168=2^3×3×7、252=2^2×3^2×7", "最大公約数 2^2×3×7", "84"] },
  { no: 37, unit: "seisu", title: "ユークリッドの互除法", example: "1189と1517の最大公約数", target: 6, prev: [36], hint: "大きい方を小さい方でわった余りで、またわる。余りが0になったときのわる数が最大公約数。", hintSteps: ["1517=1189×1+328、1189=328×3+205", "328=205×1+123、205=123×1+82、123=82×1+41、82=41×2", "41"] },
  { no: 38, unit: "seisu", title: "n進法を10進法に", example: "1011_(2)", target: 4, prev: [], hint: "右から 1, n, n², n³ … の位。各けたの数×位の大きさをたす。", hintSteps: ["1011_(2)", "1×2^3+0×2^2+1×2+1", "11"] },
  { no: 39, unit: "seisu", title: "10進法をn進法に", example: "45 を2進法で", target: 5, prev: [38], hint: "n でわり続けて、余りを下から順に並べる。", hintSteps: ["45÷2=22余り1、22÷2=11余り0、11÷2=5余り1", "5÷2=2余り1、2÷2=1余り0、1", "101101_(2)"] },
  // 数学Ⅱ 式と証明
  { no: 40, unit: "shiki", title: "二項定理（係数を求める）", example: "(2x-1)^5 の x^3 の係数", target: 5, prev: [31, 3], hint: "(a+b)ⁿ の一般項は nCr aⁿ⁻ʳ bʳ。ほしい次数になる r を決めて、係数を符号ごと計算する。", hintSteps: ["(2x-1)^5 の x^3", "5C2 (2x)^3 (-1)^2", "10×8=80"] },
  { no: 41, unit: "shiki", title: "整式の割り算（商と余り）", example: "x^3-2x^2+3 を x-1 で割る", target: 7, prev: [], hint: "次数の高い項から順に、割る式の最高次の項で割って商を立てる。ない次数の項は 0 として場所をあける。余りの次数は割る式より低い。", hintSteps: ["x^3-2x^2+3 ÷ (x-1)", "x^2 → -x → -1 と立てる", "商 x^2-x-1、余り 2"] },
  // 複素数と方程式
  { no: 42, unit: "fukuso", title: "複素数の計算", example: "(3+2i)(1-4i)", target: 5, prev: [1], hint: "i を文字のように計算して、i² が出たら −1 にする。√(−a)=√a i (a>0)。", hintSteps: ["(3+2i)(1-4i)", "3-12i+2i-8i^2", "3-10i+8=11-10i"] },
  { no: 43, unit: "fukuso", title: "複素数の割り算", example: "(3+i)/(1-2i)", target: 6, prev: [42, 10], hint: "分母と分子に、分母と共役な複素数 (虚部の符号を変えたもの) をかける。(a+bi)(a−bi)=a²+b²。", hintSteps: ["(3+i)/(1-2i)", "(3+i)(1+2i)/((1-2i)(1+2i))", "(1+7i)/5=1/5+7/5i"] },
  { no: 44, unit: "fukuso", title: "解と係数の関係", example: "x^2-3x+5=0 の解 α, β で α^2+β^2", target: 6, prev: [11], hint: "ax²+bx+c=0 の2つの解 α, β について α+β=−b/a、αβ=c/a。求める式を α+β と αβ で表す。", hintSteps: ["α+β=3、αβ=5", "α^2+β^2=(α+β)^2-2αβ", "9-10=-1"] },
  { no: 45, unit: "fukuso", title: "剰余の定理", example: "x^3-2x^2+3x-4 を x-2 で割った余り", target: 4, prev: [41], hint: "P(x) を x−a で割った余りは P(a)。ax−b で割った余りは P(b/a)。", hintSteps: ["P(x)=x^3-2x^2+3x-4、x-2", "P(2)=8-8+6-4", "2"] },
  // 指数・対数
  { no: 46, unit: "shisu", title: "0・負の整数の指数", example: "2^-3", target: 4, prev: [], hint: "a⁰=1、a⁻ⁿ=1/aⁿ。指数法則 aᵐ×aⁿ=aᵐ⁺ⁿ、aᵐ÷aⁿ=aᵐ⁻ⁿ、(aᵐ)ⁿ=aᵐⁿ はそのまま使える。", hintSteps: ["3^2×3^-5", "3^(2-5)=3^-3", "1/27"] },
  { no: 47, unit: "shisu", title: "有理数の指数", example: "8^(2/3)", target: 5, prev: [46], hint: "a^(m/n)=(ⁿ√a)ᵐ。底を素数の累乗で表して、指数をかける。", hintSteps: ["8^(2/3)", "(2^3)^(2/3)=2^2", "4"] },
  { no: 48, unit: "shisu", title: "対数の値", example: "log_2 8", target: 4, prev: [47], hint: "log_a M=p ⇔ aᵖ=M。底と真数を同じ数の累乗で表して、指数をくらべる。", hintSteps: ["log_4 8", "4^p=8 → 2^(2p)=2^3", "p=3/2"] },
  { no: 49, unit: "shisu", title: "対数の計算", example: "log_6 4+log_6 9", target: 6, prev: [48], hint: "log_a M+log_a N=log_a MN、log_a M−log_a N=log_a (M/N)、k log_a M=log_a Mᵏ。底がちがうときは底の変換 log_a b=log_c b/log_c a。", hintSteps: ["log_6 4+log_6 9", "log_6 36", "2"] },
  { no: 50, unit: "shisu", title: "指数・対数の方程式", example: "2^x=32, log_2 x=3", target: 5, prev: [48], hint: "指数は両辺の底をそろえて指数をくらべる。log_a A=p は A=aᵖ に直す (真数は正)。", hintSteps: ["4^x=8", "2^(2x)=2^3", "x=3/2"] },
  // 三角関数
  { no: 51, unit: "sankakukansu", title: "三角関数の値（弧度法）", example: "sin (5π)/6", target: 5, prev: [25], hint: "π=180°。単位円の上の点 (cosθ, sinθ) で考える。負の角は時計回り。", hintSteps: ["cos (4π)/3", "240° の点は (-1/2, -√3/2)", "-1/2"] },
  { no: 52, unit: "sankakukansu", title: "加法定理", example: "sin75°", target: 6, prev: [51], hint: "sin(α±β)=sinαcosβ±cosαsinβ、cos(α±β)=cosαcosβ∓sinαsinβ、tan(α±β)=(tanα±tanβ)/(1∓tanαtanβ)。", hintSteps: ["sin75°=sin(45°+30°)", "√2/2×√3/2+√2/2×1/2", "(√6+√2)/4"] },
  { no: 53, unit: "sankakukansu", title: "2倍角の公式", example: "sinα=3/5 のとき sin2α", target: 6, prev: [52, 26], hint: "sin2α=2sinαcosα、cos2α=cos²α−sin²α=1−2sin²α=2cos²α−1。先に cosα (または sinα) の符号を確かめる。", hintSteps: ["sinα=3/5 (0<α<π/2) → cosα=4/5", "sin2α=2×3/5×4/5", "24/25"] },
  // 微分
  { no: 54, unit: "bibun", title: "導関数", example: "f(x)=2x^3-5x^2+3x-1", target: 4, prev: [], hint: "(xⁿ)'=nxⁿ⁻¹、定数の微分は 0。積の形は展開してから微分する。", hintSteps: ["f(x)=2x^3-5x^2+3x-1", "2×3x^2-5×2x+3", "6x^2-10x+3"] },
  { no: 55, unit: "bibun", title: "接線の傾きと方程式", example: "y=x^3-3x の x=2 における接線", target: 6, prev: [54], hint: "x=a での接線の傾きは f'(a)。接線は y−f(a)=f'(a)(x−a)。", hintSteps: ["y=x^3-3x、x=2", "f'(2)=3×4-3=9、f(2)=2", "y=9x-16"] },
  { no: 56, unit: "bibun", title: "極大値・極小値", example: "f(x)=x^3-3x^2-9x+2", target: 7, prev: [55, 20], hint: "f'(x)=0 となる x を求め、増減表をかく。f' が + から − に変わるところで極大、− から + で極小。", hintSteps: ["f'(x)=3x^2-6x-9=3(x+1)(x-3)", "x=-1 で極大、x=3 で極小", "極大値 7、極小値 -25"] },
  // 積分
  { no: 57, unit: "sekibun", title: "定積分", example: "∫[1,3](x^2-2x)dx", target: 5, prev: [54], hint: "xⁿ の不定積分は xⁿ⁺¹/(n+1)。F(b)−F(a) を計算する。", hintSteps: ["∫[1,3](x^2-2x)dx", "[1/3x^3-x^2] を 1 から 3", "(9-9)-(1/3-1)=2/3"] },
  { no: 58, unit: "sekibun", title: "定積分と面積", example: "∫[1,3](x-1)(x-3)dx", target: 7, prev: [57], hint: "∫[α,β](x−α)(x−β)dx=−(β−α)³/6。放物線と x 軸で囲まれた面積は、x 軸より下なら −∫ をとる。", hintSteps: ["∫[1,3](x-1)(x-3)dx", "-(3-1)^3/6", "-4/3"] },
];

export const STEP_COUNT = STEPS.length;

export function findStep(no: number): KousuuStep | null {
  return STEPS.find((s) => s.no === no) ?? null;
}

export function unitOf(no: number): KousuuUnit {
  const s = findStep(no)!;
  return UNITS.find((u) => u.key === s.unit)!;
}

export function subjectName(k: Subject): string {
  return SUBJECTS.find((s) => s.key === k)!.name;
}
