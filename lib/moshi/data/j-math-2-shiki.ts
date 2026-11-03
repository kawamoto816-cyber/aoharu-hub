// 中2数学「式の計算」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

export const J_MATH_2_SHIKI: Daimon[] = [
  // ======================= 1. 基本の計算 =======================
  {
    id: "j-math-2-shiki/1",
    subject: "math",
    grade: "中2",
    units: ["j-math-2-shiki"],
    title: "式の計算（基本）",
    lead: "次の問いに答えなさい。",
    style: "calc",
    level: 1,
    points: 16,
    minutes: 9,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "多項式 4x²y − 3xy + 5 は何次式ですか。ア〜エから1つ選びなさい。",
        points: 2,
        skill: "知識・技能",
        level: 1,
        point: "多項式の次数は、各項の次数のうちいちばん大きいもの。",
        answer: {
          kind: "choice",
          options: ["二次式", "三次式", "五次式", "一次式"],
          correct: 1,
          why: [
            "x² の「2」だけを見ている。4x²y は x・x・y の3つの文字をかけているので次数は3。",
            "4x²y の次数は3、−3xy は2、5 は0。いちばん大きい3が多項式の次数なので三次式。",
            "各項の次数をたしている（3＋2＝5）。多項式の次数は、たすのではなく最大のもの。",
            "文字の種類（x と y）の数や、最後の項だけを見ている。次数はかけ合わされた文字の個数。",
          ],
        },
        steps: [
          {
            title: "項ごとに次数を数える",
            body: "4x²y は x・x・y で{{3}}、−3xy は x・y で2、5 は文字がないので0。多項式の次数は、そのうち{{いちばん大きいもの}}なので3、三次式です。",
            figure: { ref: { unit: "j-math-2-shiki", section: 0 } },
            back: [{ label: "レクチャー「単項式・多項式と次数」", href: "/learn/lecture/j-math-2-shiki#lec-s1" }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次のア〜エのうち、同類項の組を1つ選びなさい。",
        points: 2,
        skill: "知識・技能",
        level: 1,
        point: "文字の部分（文字の種類と個数）がまったく同じなら同類項。",
        answer: {
          kind: "choice",
          options: ["3a²b と −5a²b", "2ab² と 2a²b", "4a と 4a²", "3x と 3y"],
          correct: 0,
          why: [
            "どちらも文字の部分が a²b で同じ。係数がちがっても同類項なので、まとめると −2a²b。",
            "ab² は a・b・b、a²b は a・a・b で、文字の部分がちがう。係数が同じでも同類項ではない。",
            "a と a² は文字の部分がちがう（a² は a・a）。同類項ではないので 4a＋4a² はこれ以上まとめられない。",
            "文字が x と y でちがう。係数が同じでも同類項ではない。",
          ],
          mistakeOf: [null, null, 2, null],
        },
        steps: [
          {
            title: "文字の部分だけを見くらべる",
            body: "係数は関係ありません。文字の部分が{{文字の種類も個数も同じ}}ものが同類項です。a²b と a²b は同じなので、アが同類項です。",
            trap: "a と a² を同類項と考えて 4a＋4a²＝8a³ のようにまとめてしまう。",
            back: [{ label: "レクチャー「同類項をまとめる」", href: "/learn/lecture/j-math-2-shiki#lec-s2" }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "次の計算をしなさい。\n(2x − 7y) − (5x − 3y)",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "−( ) をはずすときは、かっこの中の符号を全部変える。",
        answer: { kind: "num", answerKind: "expr", answer: ["-3x-4y"] },
        steps: [
          {
            title: "かっこをはずす",
            body: "うしろのかっこの前は −。{{かっこの中の符号を全部変えて}} 2x−7y−5x＋3y にします。",
            figure: { ref: { unit: "j-math-2-shiki", section: 1 } },
            trap: "2x−7y−5x−3y のように、−3y の符号を変え忘れる。",
          },
          {
            title: "同類項をまとめる",
            body: "x どうし 2x−5x＝−3x、y どうし −7y＋3y＝−4y。答えは {{−3x−4y}} です。",
            back: [{ label: "計算の段「2文字の多項式のたし算・ひき算」", href: "/learn/math/22" }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "次の計算をしなさい。\n3(2a − b) − 2(a − 4b)",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "分配法則でかっこをはずす。−2 は中の両方にかける。",
        answer: { kind: "num", answerKind: "expr", answer: ["4a+5b"] },
        steps: [
          {
            title: "分配法則でかっこをはずす",
            body: "3(2a−b)＝6a−3b、−2(a−4b)＝−2a{{＋8b}}。−2×(−4b) は＋8b になります。",
            trap: "−2(a−4b) を −2a−8b としてしまう（負×負＝正を忘れる）。",
          },
          {
            title: "同類項をまとめる",
            body: "6a−2a＝4a、−3b＋8b＝5b。答えは {{4a＋5b}} です。",
            back: [{ label: "計算の段「多項式と数の計算・分数の式」", href: "/learn/math/23" }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "次の計算をしなさい。\n(−2x)² × 3y",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "(−2x)² は (−2x)×(−2x)。符号も2乗する。",
        answer: { kind: "num", answerKind: "expr", answer: ["12x^2y"] },
        steps: [
          {
            title: "累乗を先に計算する",
            body: "(−2x)²＝(−2x)×(−2x)＝{{4x²}}。負の数を2回かけるので正になります。",
            trap: "(−2x)² を −4x² や −2x² にしてしまう。",
          },
          {
            title: "係数どうし・文字どうしをかける",
            body: "4x²×3y は、係数 4×3＝12、文字 x²×y＝x²y で {{12x²y}} です。",
            figure: { ref: { unit: "j-math-2-shiki", section: 2 } },
            back: [{ label: "計算の段「単項式のかけ算」", href: "/learn/math/24" }],
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "次の計算をしなさい。\n20ab² ÷ (−4b)",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "符号を先に決めて、分数の形にして約分する。",
        answer: { kind: "num", answerKind: "expr", answer: ["-5ab"] },
        steps: [
          {
            title: "符号を決めて分数の形にする",
            body: "負の数が1つなので答えは{{負}}。−20ab²/4b と書きます。",
          },
          {
            title: "約分する",
            body: "20÷4＝5、ab² を b で約分すると ab。答えは {{−5ab}} です。",
            trap: "b² を b でわって b² のまま残す。b²÷b＝b。",
            back: [{ label: "計算の段「単項式のわり算」", href: "/learn/math/25" }],
          },
        ],
      },
    ],
  },

  // ======================= 2. 分数の式・式の値・等式の変形 =======================
  {
    id: "j-math-2-shiki/2",
    subject: "math",
    grade: "中2",
    units: ["j-math-2-shiki"],
    title: "式の計算と式の値・等式の変形",
    lead: "次の問いに答えなさい。",
    style: "calc",
    level: 2,
    points: 20,
    minutes: 11,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "次の計算をしなさい。\n(3x − y)/4 − (x − 2y)/3",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "通分して分子をかっこごと計算。分母は払わない。",
        answer: { kind: "num", answerKind: "expr", answer: ["(5x+5y)/12"] },
        steps: [
          {
            title: "分母を12にそろえる",
            body: "{{3(3x−y)/12 − 4(x−2y)/12}} として、分子をかっこごと書きます。これは方程式ではないので、両辺に12をかけて分母を払うことはできません。",
            trap: "方程式と混同して 3(3x−y)−4(x−2y) を答えにしてしまう（分母の12が消える）。",
          },
          {
            title: "分子を計算する",
            figure: {
              type: "formula",
              title: "分子の計算",
              steps: [
                { expr: "3(3x − y) − 4(x − 2y)" },
                { expr: "9x − 3y − 4x {{+ 8y}}", note: "−4×(−2y)＝＋8y" },
                { expr: "5x + 5y", note: "同類項をまとめる" },
              ],
            },
            body: "分子は 5x＋5y。答えは {{(5x＋5y)/12}} です（5/12x＋5/12y と書いてもよい）。",
            back: [{ label: "計算の段「多項式と数の計算・分数の式」", href: "/learn/math/23" }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次の計算をしなさい。\n4a²b × 3b ÷ (−6ab)",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "1つの分数の式にまとめてから約分する。",
        answer: { kind: "num", answerKind: "expr", answer: ["-2ab"] },
        steps: [
          {
            title: "符号を決め、分数の形にまとめる",
            body: "負の数は1つなので答えは負。{{−(4a²b×3b)/(6ab)}} とし、わる式は分母に置きます。",
            trap: "左から順に計算するとき、÷(−6ab) を ×(−6ab) にしてしまう。",
          },
          {
            title: "約分する",
            body: "係数は 4×3÷6＝2、文字は a²b²÷ab＝ab。答えは {{−2ab}} です。",
            back: [{ label: "計算の段「かけ算・わり算の混じった単項式」", href: "/learn/math/26" }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "a ＝ −2、b ＝ 3 のとき、次の式の値を求めなさい。\n2(3a − b) − (4a − 5b)",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "先に式を簡単にしてから数を代入する。",
        answer: { kind: "num", answerKind: "num", answer: ["5"], calc: "2*(-2)+3*3" },
        steps: [
          {
            title: "式を簡単にする",
            body: "6a−2b−4a＋5b＝{{2a＋3b}}。代入する前にまとめると、計算が短くなりまちがいが減ります。",
            trap: "−(4a−5b) の −5b の符号を変え忘れて 2a−7b にする。",
          },
          {
            title: "代入する",
            body: "2×(−2)＋3×3＝−4＋9＝{{5}}。負の数はかっこをつけて代入します。",
            back: [{ label: "計算の段「式を簡単にしてから値を求める」", href: "/learn/math/27" }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "等式 2x − 3y ＝ 12 を y について解きなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "y の項だけを左辺に残し、y の係数でわる。",
        answer: { kind: "num", answerKind: "expr", answer: ["2/3x-4"], labels: ["y ="] },
        steps: [
          {
            title: "2x を右辺へ移項する",
            body: "−3y＝12{{−2x}}。移項すると符号が変わります。",
            figure: { ref: { unit: "j-math-2-shiki", section: 4 } },
          },
          {
            title: "両辺を −3 でわる",
            body: "y＝(12−2x)/(−3)＝{{2/3x−4}}。右辺の2つの項の両方を −3 でわります。",
            trap: "12 だけを −3 でわって y＝−4−2x のようにしてしまう。",
            back: [{ label: "計算の段「等式の変形」", href: "/learn/math/28" }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "3つの数 a、b、c の平均を m とすると、m ＝ (a + b + c)/3 と表せます。この等式を c について解きなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "両辺を3倍して分母をなくしてから移項する。",
        answer: { kind: "num", answerKind: "expr", answer: ["3m-a-b"], labels: ["c ="] },
        steps: [
          {
            title: "両辺を3倍する",
            body: "3m＝a＋b＋c。左辺と右辺を入れかえて {{a＋b＋c＝3m}} とすると、c を左辺に残しやすくなります。",
            trap: "m だけを3倍し忘れて m＝a＋b＋c としてしまう。",
          },
          {
            title: "a、b を右辺へ移項する",
            body: "c＝{{3m−a−b}}。a も b も移項するので、どちらも符号が − になります。",
            back: [{ label: "レクチャー「等式の変形」", href: "/learn/lecture/j-math-2-shiki#lec-s5" }],
          },
        ],
      },
    ],
  },

  // ======================= 3. 文字式を使った説明 =======================
  {
    id: "j-math-2-shiki/3",
    subject: "math",
    grade: "中2",
    units: ["j-math-2-shiki"],
    title: "文字式を使った説明",
    lead: "m、n、a、b は整数とします。次の問いに答えなさい。",
    style: "writing",
    level: 3,
    points: 15,
    minutes: 12,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt:
          "「2つの奇数の和は偶数になる」ことを説明するのに、太郎さんは2つの奇数を 2n＋1、2n＋1 と表しました。この表し方についての説明として正しいものを、ア〜エから1つ選びなさい。",
        points: 2,
        skill: "思考・判断・表現",
        level: 2,
        point: "どんな2つでもよいことを示すには、別々の文字でおく。",
        answer: {
          kind: "choice",
          options: [
            "正しい。2n＋1 はどんな奇数も表せるので、2つとも 2n＋1 でよい。",
            "正しくない。同じ文字では同じ奇数どうしの和しか説明できないので、2m＋1、2n＋1 のように別々の文字でおく。",
            "正しくない。奇数は 2n−1 と表さなければならない。",
            "正しくない。奇数は n＋1 と表すべきである。",
          ],
          correct: 1,
          why: [
            "1つずつなら奇数を表せるが、2つとも n にすると 3 と 3、5 と 5 のような同じ奇数の組しか表せない。",
            "2n＋1 と 2n＋1 では「同じ奇数どうし」しか表せない。3＋7 のような組も含めるために文字を分ける。",
            "2n＋1 でも 2n−1 でも奇数は表せる。問題は文字が同じことにある。",
            "n＋1 は n が整数なら偶数にも奇数にもなるので、奇数を表す式ではない。",
          ],
          mistakeOf: [1, null, null, null],
        },
        steps: [
          {
            title: "文字を分ける理由",
            body: "2n＋1、2n＋1 とおくと、n＝1 なら 3 と 3 のように{{いつも同じ数}}になります。どんな2つの奇数でもよいことを示すため、{{2m＋1、2n＋1}} と別々の文字にします。",
            figure: { ref: { unit: "j-math-2-shiki", section: 3 } },
            back: [{ label: "レクチャー「文字式を使って説明する」", href: "/learn/lecture/j-math-2-shiki#lec-s4" }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt:
          "「偶数と奇数の和は奇数になる」ことを、偶数を 2m、奇数を 2n＋1 として説明します。和を計算したあと、どのような形になることを示せばよいですか。ア〜エから1つ選びなさい。",
        points: 2,
        skill: "思考・判断・表現",
        level: 2,
        point: "奇数は「2×整数＋1」の形。和をその形に直す。",
        answer: {
          kind: "choice",
          options: ["2(m＋n)＋1", "2(m＋n＋1)", "2m＋2n", "m＋n＋1"],
          correct: 0,
          why: [
            "2m＋(2n＋1)＝2(m＋n)＋1。m＋n は整数なので「2×整数＋1」、つまり奇数の形。",
            "2×整数の形は偶数を表す。それに 2m＋2n＋1 は 2(m＋n＋1) にはならない（＋2 ではなく＋1）。",
            "＋1 を書き落としている。2m＋2n は偶数の形で、和そのものとも等しくない。",
            "2でくくった中身だけを書いている。m＋n＋1 は偶数にも奇数にもなる。",
          ],
        },
        steps: [
          {
            title: "計算して、2でくくる",
            body: "2m＋(2n＋1)＝2m＋2n＋1＝{{2(m＋n)＋1}}。m＋n は整数なので、和は「2×整数＋1」の形、つまり奇数です。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt:
          "「連続する3つの整数の和は3の倍数になる」ことの説明です。正しい順に並べなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "文字で表す → 計算する → 形を読みとる → 結論。",
        answer: {
          kind: "order",
          tokens: [
            "真ん中の整数を n とすると、連続する3つの整数は n−1、n、n＋1 と表せる。",
            "それらの和は (n−1)＋n＋(n＋1)＝3n",
            "n は整数なので、3n は3の倍数である。",
            "したがって、連続する3つの整数の和は3の倍数になる。",
          ],
          distractor: "連続する3つの整数を n、n、n と表す。",
        },
        steps: [
          {
            title: "説明の3つの手順",
            body: "{{文字で表す → 計算する → 形を読みとる}}の順に書き、最後に結論を書きます。連続する整数は1ずつちがうので、n−1、n、n＋1 です。",
            figure: { ref: { unit: "j-math-2-shiki", section: 3 } },
            trap: "3つとも同じ n で表してしまう。連続する整数は1ずつちがう。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt:
          "2けたの自然数と、その数の十の位の数字と一の位の数字を入れかえてできる数の和は、11の倍数になります。このことを、もとの数の十の位の数字を a、一の位の数字を b として説明しなさい。",
        points: 8,
        skill: "思考・判断・表現",
        level: 3,
        point: "2けたの数は 10a＋b。入れかえた数は 10b＋a。",
        answer: {
          kind: "written",
          model:
            "もとの数の十の位の数字を a、一の位の数字を b とすると、\n" +
            "もとの数は 10a＋b、入れかえた数は 10b＋a と表せる。\n" +
            "それらの和は\n" +
            "(10a＋b)＋(10b＋a)＝11a＋11b＝11(a＋b)\n" +
            "a＋b は整数なので、11(a＋b) は11の倍数である。\n" +
            "したがって、2けたの自然数と、その数の十の位と一の位を入れかえた数の和は11の倍数になる。",
          rubric: [
            { label: "もとの数を 10a＋b、入れかえた数を 10b＋a と表している", points: 2, keywords: ["10a+b", "10b+a"] },
            { label: "和を計算して 11a＋11b を出している", points: 2, keywords: ["11a+11b"] },
            { label: "11(a＋b) と、11×整数の形に変形している", points: 2, keywords: ["11(a+b)"] },
            { label: "「a＋b は整数なので11の倍数」と理由をつけて結論を書いている", points: 2, keywords: ["整数", "11の倍数"] },
          ],
        },
        steps: [
          {
            title: "位の数字から数を表す",
            body: "十の位が a、一の位が b の数は {{10a＋b}}（a＋b や ab ではない）。入れかえた数は十の位が b なので {{10b＋a}} です。",
            trap: "2けたの数を ab や a＋b と表してしまう。",
          },
          {
            title: "計算して11でくくる",
            figure: {
              type: "formula",
              title: "和を11×整数の形にする",
              steps: [
                { expr: "(10a + b) + (10b + a)" },
                { expr: "= 11a + 11b", note: "同類項をまとめる" },
                { expr: "= {{11(a + b)}}", note: "11 でくくる" },
              ],
            },
            body: "a＋b は整数なので、和は「11×整数」、つまり11の倍数です。最後に結論を1文で書きます。",
            back: [{ label: "レクチャー「文字式を使って説明する」", href: "/learn/lecture/j-math-2-shiki#lec-s4" }],
          },
        ],
      },
    ],
  },

  // ======================= 4. 用語・式の利用 =======================
  {
    id: "j-math-2-shiki/4",
    subject: "math",
    grade: "中2",
    units: ["j-math-2-shiki"],
    title: "式の計算の利用",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 16,
    minutes: 10,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "2x＋5y や x²−3xy＋1 のように、単項式の和の形で表された式を何といいますか。",
        points: 2,
        skill: "知識・技能",
        level: 1,
        point: "単項式の和は多項式。",
        answer: {
          kind: "term",
          accept: ["多項式"],
          script: "kanji",
          near: [{ text: "単項式", why: "単項式は 3a²b のように、かけ算だけでできた式です。和の形の式は多項式です。" }],
        },
        steps: [
          {
            title: "単項式と多項式",
            body: "かけ算だけでできた式が{{単項式}}、単項式の和の形の式が{{多項式}}です。",
            figure: { ref: { unit: "j-math-2-shiki", section: 0 } },
            back: [{ label: "レクチャー「単項式・多項式と次数」", href: "/learn/lecture/j-math-2-shiki#lec-s1" }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt:
          "花子さんは 3a ＋ 2a² を計算して 5a³ と答えました。この答えについての説明として正しいものを、ア〜エから1つ選びなさい。",
        points: 2,
        skill: "知識・技能",
        level: 1,
        point: "a と a² は同類項ではない。",
        answer: {
          kind: "choice",
          options: [
            "正しい。",
            "正しくない。答えは 5a² である。",
            "正しくない。a と a² は同類項ではないので、3a＋2a² はこれ以上まとめられない。",
            "正しくない。答えは 6a³ である。",
          ],
          correct: 2,
          why: [
            "係数をたし、次数もたしているが、同類項でない項はまとめられない。",
            "a² に合わせて係数をたしているが、a と a² は文字の部分がちがうのでまとめられない。",
            "a は a、a² は a・a で文字の部分がちがう。同類項ではないので、このままが答え。",
            "3×2a×a² のようにかけ算と混同している。たし算なのでまとめられない。",
          ],
          mistakeOf: [2, 2, null, null],
        },
        steps: [
          {
            title: "同類項かどうかを確かめる",
            body: "a と a² は文字の部分がちがうので{{同類項ではありません}}。3a＋2a² はこれ以上まとめられません。",
            back: [{ label: "レクチャー「同類項をまとめる」", href: "/learn/lecture/j-math-2-shiki#lec-s2" }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "A ＝ 2x − 3y、B ＝ x + 4y のとき、2A − B を計算しなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "式をかっこごと代入してから計算する。",
        answer: { kind: "num", answerKind: "expr", answer: ["3x-10y"] },
        steps: [
          {
            title: "かっこごと代入する",
            body: "2A−B＝2{{(2x−3y)}}−{{(x＋4y)}}。B の前の − があるので、かっこをつけて代入します。",
            trap: "2(2x−3y)−x＋4y のように、4y の符号を変え忘れる。",
          },
          {
            title: "かっこをはずしてまとめる",
            body: "4x−6y−x−4y＝{{3x−10y}} です。",
            back: [{ label: "計算の段「多項式と数の計算・分数の式」", href: "/learn/math/23" }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "底辺が 6x cm、高さが 4y cm の三角形の面積を、x、y を使った式で表しなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "三角形の面積＝底辺×高さ÷2。単項式のかけ算。",
        answer: { kind: "num", answerKind: "expr", answer: ["12xy"], unit: "cm²" },
        steps: [
          {
            title: "公式に入れて計算する",
            body: "6x×4y÷2 は、係数 6×4÷2＝12、文字 x×y＝xy で {{12xy}}（cm²）です。",
            trap: "÷2 を忘れて 24xy にする。",
            back: [{ label: "計算の段「単項式のかけ算」", href: "/learn/math/24" }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)①",
        prompt:
          "1個 a 円のりんごを3個と、1個 b 円のみかんを5個買って1000円を出したところ、おつりは c 円でした。この数量の関係を表す等式として正しいものを、ア〜エから1つ選びなさい。",
        points: 2,
        skill: "思考・判断・表現",
        level: 2,
        point: "代金＋おつり＝出したお金。",
        answer: {
          kind: "choice",
          options: ["3a＋5b＋c＝1000", "3a＋5b−c＝1000", "1000−3a−5b＝−c", "5a＋3b＋c＝1000"],
          correct: 0,
          why: [
            "代金は 3a＋5b 円。代金とおつり c 円を合わせると、出した1000円になる。",
            "おつりを代金からひいている。おつりは出したお金の残りなので、代金にたすと1000円。",
            "1000−(代金)＝c なので右辺は ＋c。符号が反対になっている。",
            "個数が入れかわっている。りんご（a 円）が3個、みかん（b 円）が5個。",
          ],
        },
        steps: [
          {
            title: "代金とおつりの関係",
            body: "代金は {{3a＋5b}} 円。出した1000円は「代金＋おつり」なので {{3a＋5b＋c＝1000}} です。",
          },
        ],
      },
      {
        id: "6",
        no: "(5)②",
        prompt: "(5)① の等式を b について解きなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "5",
        point: "5b を左辺に残して移項し、両辺を5でわる。",
        answer: { kind: "num", answerKind: "expr", answer: ["(1000-3a-c)/5"], labels: ["b ="] },
        steps: [
          {
            title: "5b だけを左辺に残す",
            body: "3a と c を右辺へ移項して {{5b＝1000−3a−c}}。",
            trap: "移項した 3a、c の符号を変え忘れる。",
          },
          {
            title: "両辺を5でわる",
            body: "b＝{{(1000−3a−c)/5}}。200−3/5a−1/5c と書いても同じです。",
            back: [{ label: "計算の段「等式の変形」", href: "/learn/math/28" }],
          },
        ],
      },
    ],
  },
];
