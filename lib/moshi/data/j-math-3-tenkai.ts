// 中3数学「式の展開と因数分解」の大問。答えは python (sympy) で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

const LEC = "/learn/lecture/j-math-3-tenkai";

export const J_MATH_3_TENKAI: Daimon[] = [
  // ======================= 1 展開（基本） =======================
  {
    id: "j-math-3-tenkai/1",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-tenkai"],
    title: "式の展開",
    lead: "次の計算をしなさい。",
    style: "calc",
    level: 1,
    points: 20,
    minutes: 10,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "−3a(2a − 5b)",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "−3a を、かっこの中の2つの項の両方にかける。",
        answer: { kind: "num", answerKind: "expr", answer: ["-6a^2+15ab"] },
        steps: [
          {
            title: "分配法則でかける",
            body: "−3a×2a＝−6a²、−3a×(−5b)＝{{＋15ab}}。負の数どうしのかけ算は正になります。",
            trap: "−3a×(−5b) を −15ab としてしまう（符号のミス）。",
            back: [{ label: "計算の段「単項式×多項式」", href: "/learn/math/36" }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "(6x²y − 9xy²) ÷ 3xy",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "それぞれの項を 3xy でわる。",
        answer: { kind: "num", answerKind: "expr", answer: ["2x-3y"] },
        steps: [
          {
            title: "各項をわる",
            body: "6x²y÷3xy＝{{2x}}、−9xy²÷3xy＝{{−3y}}。数どうし・文字どうしを約分します。",
            trap: "前の項だけわって、うしろの項をわり忘れる。",
            back: [{ label: "計算の段「多項式÷単項式」", href: "/learn/math/36" }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "(x − 4)(x + 7)",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "x の係数は −4＋7、数の項は −4×7。",
        answer: { kind: "num", answerKind: "expr", answer: ["x^2+3x-28"] },
        steps: [
          {
            title: "公式 (x+a)(x+b) を使う",
            body: "a＝−4、b＝7 なので、x の係数は {{a＋b＝3}}、数の項は {{ab＝−28}}。",
            figure: { ref: { unit: "j-math-3-tenkai", section: 1 } },
            back: [{ label: "レクチャー「よく出る形は乗法公式で一気に」", href: `${LEC}#lec-s2` }],
          },
          {
            title: "答えを書く",
            body: "x²＋3x−28。符号まで確かめると、−4＋7 は +3、(−4)×7 は −28 です。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "(3x + 2y)²",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "(a+b)²＝a²+2ab+b²。a＝3x、b＝2y と見る。",
        answer: { kind: "num", answerKind: "expr", answer: ["9x^2+12xy+4y^2"] },
        steps: [
          {
            title: "かたまりを a、b と見る",
            body: "3x を a、2y を b と見て公式に入れます。a²＝{{(3x)²＝9x²}} で、3² も計算します。",
            figure: {
              type: "formula",
              title: "(3x + 2y)² の展開",
              steps: [
                { expr: "(3x)² + 2×3x×2y + (2y)²" },
                { expr: "9x² {{+ 12xy}} + 4y²", note: "まん中は2倍" },
              ],
            },
            trap: "まん中の 2ab を落として 9x²＋4y² にする。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "(2a + 5)(2a − 5)",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "和と差の積は「2乗−2乗」。",
        answer: { kind: "num", answerKind: "expr", answer: ["4a^2-25"] },
        steps: [
          {
            title: "公式 (x+a)(x−a)＝x²−a²",
            body: "x にあたるのは 2a なので、(2a)²−5²＝{{4a²−25}}。2a² としないように、係数の2も2乗します。",
            back: [{ label: "レクチャー「よく出る形は乗法公式で一気に」", href: `${LEC}#lec-s2` }],
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "(x − 5)² を展開した式として正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "2乗の展開では、まん中の項が2倍になる。",
        answer: {
          kind: "choice",
          options: ["x² − 25", "x² + 25", "x² − 10x + 25", "x² − 5x + 25"],
          correct: 2,
          why: [
            "まん中の項 −10x が落ちている。x²−25 は (x+5)(x−5) の答え。",
            "まん中の項がなく、数の項の符号もちがう。",
            "(x−a)²＝x²−2ax+a² に a＝5 を入れると x²−10x+25 で正しい。",
            "まん中の項を2倍していない。x×(−5) は2回出てくる。",
          ],
          mistakeOf: [0, 0, null, 0],
        },
        steps: [
          {
            title: "(x−5)(x−5) と書いて確かめる",
            body: "x×(−5) と (−5)×x が {{2回}}出るので、まん中は −10x。数の項は (−5)²＝+25 です。",
            back: [{ label: "レクチャー「展開は、長方形を分けて面積をたすこと」", href: `${LEC}#lec-s1` }],
          },
        ],
      },
    ],
  },

  // ======================= 2 因数分解（標準） =======================
  {
    id: "j-math-3-tenkai/2",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-tenkai"],
    title: "因数分解",
    lead: "次の式を因数分解しなさい。",
    style: "calc",
    level: 2,
    points: 20,
    minutes: 11,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "4ab − 6b",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "数の 2 と文字の b の両方が共通因数。",
        answer: { kind: "num", answerKind: "factor", answer: ["2b(2a-3)"] },
        steps: [
          {
            title: "共通因数を全部くくり出す",
            body: "4ab と 6b に共通なのは {{2 と b}}。2b でくくると 2b(2a−3) です。",
            trap: "b だけくくって b(4a−6) で終わる（かっこの中にまだ2が残る）。",
            back: [{ label: "レクチャー「まず共通因数、それから公式」", href: `${LEC}#lec-s4` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "x² + 9x + 20",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "かけて 20、たして 9 になる2数。",
        answer: { kind: "num", answerKind: "factor", answer: ["(x+4)(x+5)"] },
        steps: [
          {
            title: "積の組から探す",
            body: "かけて20の組は 1と20、2と10、{{4と5}}。たして9になるのは 4 と 5 なので (x+4)(x+5)。",
            figure: { ref: { unit: "j-math-3-tenkai", section: 2 } },
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "x² − x − 30",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "積が負なので2数は異符号。和 −1 で大きい方が負。",
        answer: { kind: "num", answerKind: "factor", answer: ["(x+5)(x-6)"] },
        steps: [
          {
            title: "かけて −30、たして −1",
            body: "積が負なので、一方が正・一方が負。和が −1 なので {{絶対値の大きい方が負}}です。5 と −6 が見つかります。",
            trap: "(x−5)(x+6) としてしまう。展開すると x²＋x−30 で、x の係数の符号が逆。",
          },
          {
            title: "展開してもどるか確かめる",
            body: "(x+5)(x−6)＝x²−6x＋5x−30＝x²−x−30 で、もとの式にもどります。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "a² − 14a + 49",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "49＝7²、14＝2×7 なら平方の形。",
        answer: { kind: "num", answerKind: "factor", answer: ["(a-7)^2"] },
        steps: [
          {
            title: "平方の形かを見る",
            body: "数の項 49 は 7² で、まん中の 14a は {{2×7×a}}。だから a²−2×7×a＋7²＝(a−7)² です。",
            figure: { ref: { unit: "j-math-3-tenkai", section: 3 } },
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "3x² − 48",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "共通因数3をくくってから、和と差の公式。",
        answer: { kind: "num", answerKind: "factor", answer: ["3(x+4)(x-4)"] },
        steps: [
          {
            title: "まず共通因数をくくる",
            body: "3x²−48＝{{3(x²−16)}}。",
            trap: "3(x²−16) で終わりにする。かっこの中はまだ因数分解できる。",
          },
          {
            title: "かっこの中を和と差の公式で",
            body: "x²−16＝x²−4²＝(x+4)(x−4)。答えは {{3(x+4)(x−4)}}。",
            back: [{ label: "レクチャー「まず共通因数、それから公式」", href: `${LEC}#lec-s4` }],
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "x² − 3x − 28 を因数分解した式として正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "選んだら展開して、x の係数の符号まで確かめる。",
        answer: {
          kind: "choice",
          options: ["(x − 7)(x + 4)", "(x + 7)(x − 4)", "(x − 7)(x − 4)", "(x − 28)(x + 1)"],
          correct: 0,
          why: [
            "−7×4＝−28、−7＋4＝−3 で、かけても たしても合う。",
            "積は −28 で合うが、和が 7＋(−4)＝+3 になり符号が逆。",
            "積が (−7)×(−4)＝+28 になり、数の項の符号が合わない。",
            "積は −28 だが、和が −27 になる。",
          ],
          mistakeOf: [null, 3, null, null],
        },
        steps: [
          {
            title: "かけて −28、たして −3",
            body: "積が −28 の組のうち、和が −3 になるのは {{−7 と 4}}。(x−7)(x+4) を展開すると x²−3x−28 にもどります。",
          },
        ],
      },
    ],
  },

  // ======================= 3 展開・因数分解の利用（標準） =======================
  {
    id: "j-math-3-tenkai/3",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-tenkai"],
    title: "展開・因数分解の利用",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 20,
    minutes: 12,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "次の計算をしなさい。\n(x + 3)² − (x + 5)(x − 1)",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "うしろの積はかっこに入れたままひく。",
        answer: { kind: "num", answerKind: "expr", answer: ["2x+14"] },
        steps: [
          {
            title: "それぞれ展開する",
            body: "(x+3)²＝x²＋6x＋9、(x+5)(x−1)＝x²＋4x−5。",
          },
          {
            title: "かっこごとひく",
            body: "(x²＋6x＋9){{−(x²＋4x−5)}}＝x²＋6x＋9−x²−4x＋5＝2x＋14。",
            trap: "−5 の符号を変え忘れて 2x＋4 にする。",
            back: [{ label: "計算の段「展開を使う計算のまとめ」", href: "/learn/math/40" }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次の式を因数分解しなさい。\n(x + y)² − 4(x + y) − 12",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "x＋y を1つの文字 M におきかえる。",
        answer: { kind: "num", answerKind: "factor", answer: ["(x+y+2)(x+y-6)"] },
        steps: [
          {
            title: "かたまりを M とおく",
            body: "x＋y＝M とすると {{M²−4M−12}}。かけて −12、たして −4 の2数は 2 と −6 なので (M＋2)(M−6)。",
          },
          {
            title: "M をもとにもどす",
            body: "M に x＋y をもどして {{(x＋y＋2)(x＋y−6)}}。M のままで終わらないようにします。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "乗法公式を利用して、98² を計算しなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "98＝100−2 と見て (x−a)² の公式。",
        answer: { kind: "num", answerKind: "num", answer: ["9604"], calc: "(100-2)^2" },
        steps: [
          {
            title: "100 との差で表す",
            body: "98²＝(100−2)²＝100²−2×100×2＋2²＝10000−400＋4＝{{9604}}。",
            trap: "まん中の 2×100×2 を 200 にして 9804 とする。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "x = 27 のとき、x² − 6x + 9 の値を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "先に因数分解してから代入すると楽。",
        answer: { kind: "num", answerKind: "num", answer: ["576"], calc: "(27-3)^2" },
        steps: [
          {
            title: "因数分解してから代入",
            body: "x²−6x＋9＝{{(x−3)²}}。x＝27 を入れると 24²＝576。",
            figure: {
              type: "formula",
              title: "代入の前に式を変形する",
              steps: [
                { expr: "x² − 6x + 9 = {{(x − 3)²}}", note: "平方の形" },
                { expr: "(27 − 3)² = 24² = {{576}}" },
              ],
            },
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "乗法公式を利用して、103 × 97 を計算しなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "100＋3 と 100−3 の積 → 和と差の公式。",
        answer: { kind: "num", answerKind: "num", answer: ["9991"], calc: "(100+3)*(100-3)" },
        steps: [
          {
            title: "和と差の積にする",
            body: "103×97＝(100＋3)(100−3)＝100²−3²＝{{9991}}。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "x² + 8x + 15 を (x + 3)(x + 5) のように、いくつかの式の積の形に表すことを何といいますか。",
        points: 2,
        skill: "知識・技能",
        level: 1,
        point: "展開の逆。",
        answer: {
          kind: "term",
          accept: ["因数分解"],
          script: "kanji",
          near: [
            { text: "いんすうぶんかい", why: "読みは合っています。漢字で「因数分解」と書きましょう。" },
            { text: "展開", why: "展開は積を和にほどくこと。その逆が問われています。" },
          ],
        },
        steps: [
          {
            title: "展開の逆",
            body: "かっこの積をほどくのが展開、和を積の形にもどすのが{{因数分解}}です。",
            back: [{ label: "レクチャー「因数分解は『たして○、かけて△』をさがす」", href: `${LEC}#lec-s3` }],
          },
        ],
      },
    ],
  },

  // ======================= 4 式の利用（証明・記述） =======================
  {
    id: "j-math-3-tenkai/4",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-tenkai"],
    title: "式の利用（証明）",
    lead: "次の問いに答えなさい。",
    style: "writing",
    level: 3,
    points: 20,
    minutes: 14,
    review: { status: "draft" },
    material: [
      {
        kind: "text",
        body:
          "【Ⅰ】「連続する2つの奇数の積に1をたすと、偶数の2乗になる」ことを、文字を使って説明する。\n" +
          "【Ⅱ】1辺が a m の正方形の土地のまわりに、幅 b m の道がある。道の面積を S m²、道のまん中を通る線の長さを ℓ m とする。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "【Ⅰ】で、n を整数として「連続する2つの奇数」を表したものとして正しいものを、ア〜エから1つ選びなさい。",
        points: 2,
        skill: "思考・判断・表現",
        level: 2,
        point: "奇数は 2n＋1 など。連続する奇数は2ちがい。",
        answer: {
          kind: "choice",
          options: ["2n − 1、2n + 1", "n、n + 2", "2n + 1、2n + 2", "2n、2n + 2"],
          correct: 0,
          why: [
            "2n は偶数なので、その前後の 2n−1 と 2n＋1 は2ちがいの奇数で正しい。",
            "n が偶数のときは偶数になってしまう。",
            "2n＋2 は偶数。2n＋1 と 2n＋2 は連続する整数。",
            "2n と 2n＋2 は連続する偶数。",
          ],
        },
        steps: [
          {
            title: "偶数 2n をもとにする",
            body: "2n は偶数なので、{{1小さい 2n−1 と 1大きい 2n＋1}} は奇数で、差は2です。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "【Ⅰ】で、(2n − 1)(2n + 1) + 1 を展開して整理しなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        dependsOn: "1",
        point: "和と差の積で (2n)²−1²。",
        answer: { kind: "num", answerKind: "expr", answer: ["4n^2"] },
        steps: [
          {
            title: "和と差の公式",
            body: "(2n−1)(2n＋1)＝(2n)²−1＝4n²−1。1をたして {{4n²}}。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "【Ⅰ】の「連続する2つの奇数の積に1をたすと、偶数の2乗になる」ことを説明しなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        dependsOn: "2",
        point: "4n²＝(2n)² で、2n が偶数だと言い切る。",
        answer: {
          kind: "written",
          model:
            "n を整数とすると、連続する2つの奇数は 2n − 1、2n + 1 と表せる。\n" +
            "(2n − 1)(2n + 1) + 1 = 4n² − 1 + 1 = 4n² = (2n)²\n" +
            "2n は偶数だから、(2n)² は偶数の2乗である。\n" +
            "したがって、連続する2つの奇数の積に1をたすと、偶数の2乗になる。",
          rubric: [
            { label: "n を整数として、2つの奇数を 2n−1、2n＋1 と表している", points: 1, keywords: ["2n-1", "2n+1"] },
            { label: "積に1をたした式を展開し 4n² にしている", points: 2, keywords: ["4n²"] },
            { label: "4n²＝(2n)² と2乗の形に直している", points: 1, keywords: ["(2n)²"] },
            { label: "2n が偶数であることを書き、結論をまとめている", points: 2, keywords: ["2n は偶数", "偶数の2乗"] },
          ],
        },
        steps: [
          {
            title: "結論の形に直す",
            body: "4n² のままでは「偶数の2乗」とわかりません。{{(2n)²}} と書き直し、「2n は偶数」と理由を書きます。",
            trap: "「4n² は4の倍数だから」で終える。問われているのは偶数の2乗であること。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "【Ⅱ】で、a = 10、b = 2 のとき、道の面積 S を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "外側の大きな正方形 − 内側の土地。",
        answer: { kind: "num", answerKind: "num", answer: ["96"], unit: "m²", calc: "(10+2*2)^2-10^2" },
        steps: [
          {
            title: "外側の正方形の1辺を考える",
            body: "道は両側にあるので、外側の1辺は {{a＋2b＝14}} m。S＝14²−10²＝196−100＝96。",
            trap: "外側の1辺を a＋b＝12 にする（道は左右の両方にある）。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "【Ⅱ】で、S = bℓ となることを証明しなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "S と bℓ を別々に a、b で表し、同じ式になると示す。",
        answer: {
          kind: "written",
          model:
            "道の面積は S = (a + 2b)² − a² = a² + 4ab + 4b² − a² = 4ab + 4b²\n" +
            "道のまん中を通る線は1辺 a + b m の正方形の周なので ℓ = 4(a + b)\n" +
            "bℓ = b × 4(a + b) = 4ab + 4b²\n" +
            "よって S = bℓ",
          rubric: [
            { label: "S を (a＋2b)²−a² と表している", points: 1, keywords: ["(a+2b)²-a²"] },
            { label: "S を展開して 4ab＋4b² にしている", points: 2, keywords: ["4ab+4b²"] },
            { label: "ℓ を 4(a＋b) と表している（1辺 a＋b の正方形の周）", points: 2, keywords: ["4(a+b)"] },
            { label: "bℓ も 4ab＋4b² になることを示し、S＝bℓ と結論している", points: 1, keywords: ["S=bℓ"] },
          ],
        },
        steps: [
          {
            title: "S を展開する",
            body: "S＝(a＋2b)²−a²＝a²＋4ab＋4b²−a²＝{{4ab＋4b²}}。",
            back: [{ label: "レクチャー「よく出る形は乗法公式で一気に」", href: `${LEC}#lec-s2` }],
          },
          {
            title: "ℓ を a、b で表す",
            body: "道のまん中の線は、土地の各辺から b/2 m ずつ外側を通るので、1辺が {{a＋b}} m の正方形の周。ℓ＝4(a＋b)。",
          },
          {
            title: "bℓ と S をくらべる",
            body: "bℓ＝4b(a＋b)＝4ab＋4b² で、S と同じ式になります。",
          },
        ],
      },
    ],
  },
];
