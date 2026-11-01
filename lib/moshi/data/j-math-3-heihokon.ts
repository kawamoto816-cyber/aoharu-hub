// 中3数学「平方根」の大問。答えは python (sympy) で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

const LEC = "/learn/lecture/j-math-3-heihokon";

export const J_MATH_3_HEIHOKON: Daimon[] = [
  // ======================= 1 平方根の意味と大小（基本） =======================
  {
    id: "j-math-3-heihokon/1",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-heihokon"],
    title: "平方根の意味と大小",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 1,
    points: 20,
    minutes: 10,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "81 の平方根を求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "正の数の平方根は正と負の2つ。",
        answer: { kind: "num", answerKind: "roots", answer: ["9", "-9"], equations: ["x^2=81"] },
        steps: [
          {
            title: "2乗して81になる数",
            body: "9²＝81、(−9)²＝81 なので、81 の平方根は {{9 と −9}}（±9）です。",
            figure: { ref: { unit: "j-math-3-heihokon", section: 0 } },
            trap: "9 だけ答える。「√81」なら 9 だけだが、「81 の平方根」は2つ。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次のア〜エのうち、正しいものを1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "√ は正の方。√ どうしのたし算は中身をたせない。",
        answer: {
          kind: "choice",
          options: ["√25 = ±5", "(−√3)² = 3", "√((−6)²) = −6", "√3 + √5 = √8"],
          correct: 1,
          why: [
            "√25 は正の方の平方根だけを表すので 5。±5 は「25 の平方根」。",
            "(−√3)²＝(−√3)×(−√3)＝3 で正しい。",
            "√((−6)²)＝√36＝6。√ の値が負になることはない。",
            "√ どうしをたしても中身はたせない。√3＋√5 はこれ以上まとめられない。",
          ],
          mistakeOf: [0, null, 2, 1],
        },
        steps: [
          {
            title: "√ のきまりを確かめる",
            body: "√a は {{a の正の方の平方根}}。(−√3)² は −√3 を2回かけるので、符号は正になり 3 です。",
            back: [{ label: "レクチャー「平方根は、2乗する前の数」", href: `${LEC}#lec-s1` }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "次の5つの数を、小さい順に並べなさい。\n2、√6、−3、√3、−√5",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "正の数は2乗してくらべる。負の数は絶対値が大きいほど小さい。",
        answer: { kind: "order", tokens: ["−3", "−√5", "√3", "2", "√6"] },
        steps: [
          {
            title: "2乗した数でくらべる",
            body: "正の数は 2＝√4 と見ると √3＜√4＜√6。負の数は 3＝√9 なので {{−√9＜−√5}}、つまり −3＜−√5。",
            figure: { ref: { unit: "j-math-3-heihokon", section: 1 } },
            trap: "−√5 と −3 で、√5 は3より小さいから −√5 の方が小さいと考える（負の数は逆）。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "3 < √a < 4 を満たす自然数 a は、全部で何個ありますか。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "各辺を2乗して 9＜a＜16。",
        answer: { kind: "num", answerKind: "num", answer: ["6"], unit: "個", calc: "15-10+1" },
        steps: [
          {
            title: "2乗して √ をはずす",
            body: "3＝√9、4＝√16 なので {{9＜a＜16}}。a は 10、11、12、13、14、15 の6個です。",
            trap: "9 や 16 も数えてしまう（等号はついていない）。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "√2 や √3 のように、分数で表すことができない数を何といいますか。",
        points: 2,
        skill: "知識・技能",
        level: 1,
        point: "分数で表せる数は有理数。",
        answer: {
          kind: "term",
          accept: ["無理数"],
          script: "kanji",
          near: [
            { text: "むりすう", why: "読みは合っています。漢字で「無理数」と書きましょう。" },
            { text: "有理数", why: "有理数は分数で表せる数です。逆が問われています。" },
          ],
        },
        steps: [
          {
            title: "有理数と無理数",
            body: "整数や分数で表せる数が有理数、表せない数が{{無理数}}。√2＝1.414… は小数がどこまでも続きます。",
            back: [{ label: "レクチャー「√ の大小は、2乗してくらべる」", href: `${LEC}#lec-s2` }],
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "次のア〜オのうち、無理数をすべて選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "√ がついていても、中が平方数なら有理数。",
        answer: {
          kind: "choice",
          options: ["√16", "√7", "0.3", "π", "√(4/9)"],
          correct: [1, 3],
          why: [
            "√16＝4 なので整数。有理数。",
            "7 は平方数ではないので √7 は無理数。",
            "0.3＝3/10 と分数で表せるので有理数。",
            "円周率 π は 3.1415… と規則なく続き、分数で表せない無理数。",
            "√(4/9)＝2/3 なので分数。有理数。",
          ],
        },
        steps: [
          {
            title: "√ をはずせるか確かめる",
            body: "√16＝4、√(4/9)＝2/3 のように {{√ がはずれれば有理数}}。√7 と π は分数で表せません。",
          },
        ],
      },
    ],
  },

  // ======================= 2 根号をふくむ式の計算（標準） =======================
  {
    id: "j-math-3-heihokon/2",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-heihokon"],
    title: "根号をふくむ式の計算",
    lead: "次の計算をしなさい。答えの分母に √ をふくむときは、分母を有理化しなさい。",
    style: "calc",
    level: 2,
    points: 21,
    minutes: 11,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "√80 を a√b の形に表しなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "80 の中のいちばん大きい平方数は16。",
        answer: { kind: "num", answerKind: "surd", answer: ["4√5"], calc: "√80" },
        steps: [
          {
            title: "平方数を外に出す",
            body: "80＝{{16×5}} なので √80＝√16×√5＝4√5。",
            figure: { ref: { unit: "j-math-3-heihokon", section: 2 } },
            trap: "80＝4×20 で 2√20 として止める（√20 の中にまだ4がある）。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "√6 × √15",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "先に素因数に分けると、平方数が見つけやすい。",
        answer: { kind: "num", answerKind: "surd", answer: ["3√10"], calc: "√6*√15" },
        steps: [
          {
            title: "√ の中どうしをかけて整理",
            body: "√6×√15＝√(2×3×3×5)。{{3×3}} が平方数なので外に出して 3√10。",
            back: [{ label: "計算の段「√ のかけ算・わり算と有理化」", href: "/learn/math/45" }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "14 / √7",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "分母・分子に √7 をかけて有理化。",
        answer: { kind: "num", answerKind: "surd", answer: ["2√7"], calc: "14/√7" },
        steps: [
          {
            title: "分母を有理化する",
            body: "14/√7＝14√7/(√7×√7)＝14√7/7＝{{2√7}}。最後に約分します。",
            figure: { ref: { unit: "j-math-3-heihokon", section: 3 } },
            trap: "14√7/7 のまま約分し忘れる。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "√75 − √12 + √3",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "全部を ○√3 にそろえてからまとめる。",
        answer: { kind: "num", answerKind: "surd", answer: ["4√3"], calc: "√75-√12+√3" },
        steps: [
          {
            title: "a√b の形にそろえる",
            body: "√75＝5√3、√12＝2√3。{{5√3−2√3＋√3＝4√3}}。",
            figure: { ref: { unit: "j-math-3-heihokon", section: 4 } },
            trap: "√75−√12＝√63 のように、中どうしをひいてしまう。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "√18 + 4/√2",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "有理化すると √2 がそろう。",
        answer: { kind: "num", answerKind: "surd", answer: ["5√2"], calc: "√18+4/√2" },
        steps: [
          {
            title: "それぞれを ○√2 に",
            body: "√18＝3√2、4/√2＝4√2/2＝{{2√2}}。たして 5√2。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "(√6 − 2)(√6 + 3)",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "(x+a)(x+b) の公式で x＝√6 と見る。",
        answer: { kind: "num", answerKind: "surd", answer: ["√6"], calc: "(√6-2)*(√6+3)" },
        steps: [
          {
            title: "乗法公式で展開",
            body: "x＝√6、a＝−2、b＝3 と見ると {{(√6)²＋(−2＋3)√6＋(−2)×3}}＝6＋√6−6。",
            back: [{ label: "計算の段「√ のたし算・ひき算と展開」", href: "/learn/math/46" }],
          },
          {
            title: "数どうしをまとめる",
            body: "6−6＝0 なので、答えは {{√6}}。",
          },
        ],
      },
    ],
  },

  // ======================= 3 近似値と式の値（標準） =======================
  {
    id: "j-math-3-heihokon/3",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-heihokon"],
    title: "平方根の値と式の値",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 21,
    minutes: 12,
    review: { status: "draft" },
    material: [{ kind: "text", body: "(1)・(2) は、√3 = 1.732 として計算しなさい。" }],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "√300 の値を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "√300＝10√3 にしてから 1.732 を入れる。",
        answer: { kind: "num", answerKind: "num", answer: ["17.32"], calc: "10*1.732" },
        steps: [
          {
            title: "√3 が出てくる形にする",
            body: "300＝100×3 なので √300＝{{10√3}}＝10×1.732＝17.32。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "√0.03 の値を求めなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "0.03＝3/100。√100＝10 で分母に出る。",
        answer: { kind: "num", answerKind: "num", answer: ["0.1732"], calc: "1.732/10" },
        steps: [
          {
            title: "分数に直す",
            body: "√0.03＝√(3/100)＝{{√3/10}}＝1.732÷10＝0.1732。",
            trap: "√0.03＝0.3√3 などとする。0.3²＝0.09 で 0.03 にならない。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "x = √5 + 2 のとき、x² − 4x + 4 の値を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "因数分解すると (x−2)²。x−2＝√5。",
        answer: { kind: "num", answerKind: "num", answer: ["5"], calc: "((√5+2)-2)^2" },
        steps: [
          {
            title: "先に因数分解する",
            body: "x²−4x＋4＝{{(x−2)²}}。x−2＝√5 なので、値は (√5)²＝5。",
            back: [{ label: "計算の段「因数分解」", href: "/learn/math/42" }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "x = √3 + 1、y = √3 − 1 のとき、x² − y² の値を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "x²−y²＝(x＋y)(x−y)。和と差を先に出す。",
        answer: { kind: "num", answerKind: "surd", answer: ["4√3"], calc: "((√3+1)+(√3-1))*((√3+1)-(√3-1))" },
        steps: [
          {
            title: "和と差を求める",
            body: "x＋y＝2√3、x−y＝2。x²−y²＝{{(x＋y)(x−y)}}＝2√3×2＝4√3。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "√10 の小数部分を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "整数部分を出して、√10 からひく。",
        answer: { kind: "num", answerKind: "surd", answer: ["√10-3"], calc: "√10-3" },
        steps: [
          {
            title: "整数部分を決める",
            body: "√9＜√10＜√16 なので 3＜√10＜4。整数部分は {{3}} です。",
          },
          {
            title: "小数部分＝もとの数−整数部分",
            body: "小数部分は {{√10−3}}。0.162… のように近似値で答えないこと。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "√(24n) が自然数になるような、もっとも小さい自然数 n を求めなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 3,
        point: "24 を素因数分解し、2乗にたりない数をかける。",
        answer: { kind: "num", answerKind: "num", answer: ["6"], labels: ["n ="], equations: ["24n=12^2"] },
        steps: [
          {
            title: "素因数分解する",
            body: "24＝2³×3＝{{2²×2×3}}。2² は平方数なので、残りの 2×3 を平方にすればよい。",
          },
          {
            title: "たりない数をかける",
            body: "n＝2×3＝{{6}} のとき 24×6＝144＝12² で、√144＝12。",
          },
        ],
      },
    ],
  },

  // ======================= 4 正方形と平方根（応用・記述） =======================
  {
    id: "j-math-3-heihokon/4",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-heihokon"],
    title: "正方形の1辺と平方根",
    lead: "次の問いに答えなさい。",
    style: "word",
    level: 3,
    points: 20,
    minutes: 13,
    review: { status: "draft" },
    material: [
      { kind: "text", body: "面積が 50 cm² の正方形 A と、面積が 18 cm² の正方形 B がある。" },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "正方形 A の1辺の長さを求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "長さは正なので √50 だけ。a√b の形に。",
        answer: { kind: "num", answerKind: "surd", answer: ["5√2"], unit: "cm", equations: ["x^2=50"] },
        steps: [
          {
            title: "面積の平方根のうち正の方",
            body: "1辺を x cm とすると x²＝50。長さは正なので x＝√50＝{{5√2}}。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "正方形 A と B を、下の辺をそろえて横にすき間なく並べました。横の長さの合計を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "√50＋√18 は、そろえてからたす。",
        answer: { kind: "num", answerKind: "surd", answer: ["8√2"], unit: "cm", calc: "√50+√18" },
        steps: [
          {
            title: "○√2 にそろえる",
            body: "A は 5√2 cm、B は √18＝3√2 cm。合計 {{8√2}} cm。",
            trap: "√50＋√18＝√68 とする（√ の中どうしはたせない）。",
            back: [{ label: "レクチャー「たし算・ひき算は、√ の中が同じものだけまとめる」", href: `${LEC}#lec-s5` }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "正方形 A の1辺の長さは、正方形 B の1辺の長さの何倍ですか。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "5√2 ÷ 3√2。√2 が約分で消える。",
        answer: { kind: "num", answerKind: "num", answer: ["5/3"], unit: "倍", calc: "√50/√18" },
        steps: [
          {
            title: "わり算する",
            body: "5√2÷3√2＝{{5/3}}。面積の比 50÷18＝25/9 とはちがうことに注意。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "1辺の長さが自然数（cm）の正方形のうち、面積が B より大きく A より小さいものは何個ありますか。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "18＜n²＜50 を満たす自然数 n。",
        answer: { kind: "num", answerKind: "num", answer: ["3"], unit: "個", calc: "7-5+1" },
        steps: [
          {
            title: "2乗して範囲に入るものを数える",
            body: "4²＝16、5²＝25、6²＝36、7²＝49、8²＝64。{{18＜n²＜50}} になるのは n＝5、6、7 の3個です。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "ゆうきさんは「√2 + √3 = √5」と計算しました。これが正しくないことを、2乗した数をくらべて説明しなさい。",
        points: 7,
        skill: "思考・判断・表現",
        level: 3,
        point: "両辺を2乗して、値がちがうことを示す。",
        answer: {
          kind: "written",
          model:
            "(√2 + √3)² = 2 + 2√6 + 3 = 5 + 2√6\n" +
            "(√5)² = 5\n" +
            "2√6 は正の数なので 5 + 2√6 > 5 となり、2乗した数がちがう。\n" +
            "√2 + √3 と √5 はどちらも正の数なので、2乗した数がちがえばもとの数もちがう。\n" +
            "よって √2 + √3 = √5 は正しくない。",
          rubric: [
            { label: "(√2＋√3)² を展開して 5＋2√6 にしている", points: 3, keywords: ["5+2√6"] },
            { label: "(√5)²＝5 を求めている", points: 1, keywords: ["(√5)²=5"] },
            { label: "2√6＞0 なので2乗した数がちがうことを書いている", points: 2, keywords: ["2√6", ">5"] },
            { label: "どちらも正の数なので、もとの数もちがうと結論している", points: 1, keywords: ["正の数", "正しくない"] },
          ],
        },
        steps: [
          {
            title: "左辺を2乗する",
            body: "(√2＋√3)²＝(√2)²＋2×√2×√3＋(√3)²＝{{5＋2√6}}。まん中の項が残ります。",
          },
          {
            title: "くらべて結論を書く",
            body: "右辺の2乗は5。2√6 の分だけ左辺が大きいので等しくない。近似値でも √2＋√3≒3.15、√5≒2.24 です。",
            back: [{ label: "レクチャー「√ の大小は、2乗してくらべる」", href: `${LEC}#lec-s2` }],
          },
        ],
      },
    ],
  },
];
