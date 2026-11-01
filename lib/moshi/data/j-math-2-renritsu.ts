// 中2数学「連立方程式」の大問。設計書 tenshi-moshi.md 5章のサンプル (答えは scripts/check-moshi.ts で検算)。
import type { Daimon } from "../types";

export const J_MATH_2_RENRITSU: Daimon[] = [
  {
    id: "j-math-2-renritsu/1",
    subject: "math",
    grade: "中2",
    units: ["j-math-2-renritsu"],
    title: "連立方程式",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 25,
    minutes: 12,
    review: { status: "draft" },
    items: [
      // ---------------- (1) 加減法・そのまま消せる ----------------
      {
        id: "1",
        no: "(1)",
        prompt: "次の連立方程式を解きなさい。\n3x + 2y = 16\nx − 2y = 0",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "y の係数が +2 と −2。たせば y が消える。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["4", "2"],
          labels: ["x =", "y ="],
          equations: ["3x+2y=16", "x-2y=0"],
        },
        steps: [
          {
            title: "消す文字を決める",
            body: "y の係数は +2 と −2 で、{{絶対値が同じで符号が反対}}です。このまま2つの式をたせば y が消えます。",
            figure: { ref: { unit: "j-math-2-renritsu", section: 3 } }, // 「式の形から解き方を選ぶ」の木
          },
          {
            title: "たして x を求める",
            body: "左辺どうし・右辺どうしをたします。",
            figure: {
              type: "formula",
              title: "①＋②",
              steps: [
                { label: "①", expr: "3x {{+ 2y}} = 16" },
                { label: "②", expr: "x {{− 2y}} = 0" },
                { label: "たす", expr: "4x = 16 → {{x = 4}}", note: "+2y と −2y が消える" },
              ],
            },
          },
          {
            title: "代入して y を求め、確かめる",
            body: "② に x＝4 を代入すると 4−2y＝0 なので {{y＝2}}。① に入れて 12＋4＝16 となり、正しいことが確かめられます。",
            trap: "x だけ出して終わらない。連立方程式の解は x と y の組。",
          },
        ],
      },
  
      // ---------------- (2) 代入法 ----------------
      {
        id: "2",
        no: "(2)",
        prompt: "次の連立方程式を解きなさい。\ny = 3x − 5\n2x + 3y = 7",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "「y＝…」の形があるので代入法。かっこごと入れる。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["2", "1"],
          labels: ["x =", "y ="],
          equations: ["y=3x-5", "2x+3y=7"],
        },
        steps: [
          {
            title: "y＝… を、かっこごと代入する",
            body: "上の式が y＝3x−5 の形なので、下の式の y に {{(3x−5)}} を入れます。3y は 3×(3x−5) なので、かっこを忘れると −5 に3をかけ忘れます。",
            figure: {
              type: "formula",
              title: "代入法",
              steps: [
                { expr: "2x + 3{{(3x − 5)}} = 7", note: "y に代入" },
                { expr: "2x + 9x − 15 = 7", note: "分配法則" },
                { expr: "11x = 22 → {{x = 2}}", note: "−15 を移項" },
              ],
            },
            trap: "2x＋9x−5＝7 としてしまう（−5 に3をかけ忘れ）。",
            back: [{ label: "レクチャー「代入法」", href: "/learn/lecture/j-math-2-renritsu#lec-s3" }],
          },
          {
            title: "y を求める",
            body: "y＝3×2−5＝{{1}}。下の式で確かめると 4＋3＝7 で正しい。",
          },
        ],
      },
  
      // ---------------- (3) 小数をふくむ ----------------
      {
        id: "3",
        no: "(3)",
        prompt: "次の連立方程式を解きなさい。\n0.2x + 0.3y = 1.3\n4x − y = 5",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "小数の式は10倍して整数に。それから y の係数をそろえる。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["2", "3"],
          labels: ["x =", "y ="],
          equations: ["0.2x+0.3y=1.3", "4x-y=5"],
        },
        steps: [
          {
            title: "係数を整数に直す",
            body: "上の式の両辺を{{10倍}}して 2x＋3y＝13 …①' にします。右辺の 1.3 も 13 にするのを忘れないこと。",
            trap: "左辺だけ10倍して 2x＋3y＝1.3 のままにする。",
            back: [{ label: "計算の段「小数・分数を含む連立方程式」", href: "/learn/math/32" }],
          },
          {
            title: "y の係数をそろえて、たす",
            body: "下の式を3倍すると y の係数が −3 になり、①' の +3y と打ち消し合います。",
            figure: {
              type: "formula",
              title: "①'＋②×3",
              steps: [
                { label: "①'", expr: "2x {{+ 3y}} = 13" },
                { label: "②×3", expr: "12x {{− 3y}} = 15", note: "右辺の 5 も3倍" },
                { label: "たす", expr: "14x = 28 → {{x = 2}}" },
              ],
            },
          },
          {
            title: "y を求める",
            body: "② に代入して 8−y＝5 より {{y＝3}}。もとの式で確かめると 0.4＋0.9＝1.3 で正しい。",
          },
        ],
      },
  
      // ---------------- (4) 解から係数を求める ----------------
      {
        id: "4",
        no: "(4)",
        prompt: "x, y についての連立方程式\nax + by = 8\nbx − ay = 1\nの解が x = 2, y = 1 であるとき、a, b の値を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "解を代入すると、a と b の連立方程式になる。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["3", "2"],
          labels: ["a =", "b ="],
          // 求めた a, b と、もとの解 x=2, y=1 で、もとの2式が成り立つ
          equations: ["2a+b=8", "2b-a=1"],
        },
        steps: [
          {
            title: "解を代入する",
            body: "「解が x＝2、y＝1」とは、{{この値を入れると2つの式が成り立つ}}ということです。x、y に数を入れると、わからない文字は a と b になります。",
            figure: {
              type: "formula",
              title: "x＝2、y＝1 を代入",
              steps: [
                { label: "上の式", expr: "a×2 + b×1 = 8 → {{2a + b = 8}}", note: "…③" },
                { label: "下の式", expr: "b×2 − a×1 = 1 → {{−a + 2b = 1}}", note: "…④" },
              ],
            },
            trap: "下の式の bx−ay を 2a−b と入れかえてしまう。b に x、a に y をかける。",
          },
          {
            title: "a、b の連立方程式を解く",
            body: "④ を a＝2b−1 と変形して ③ に代入します（代入法）。",
            figure: {
              type: "formula",
              title: "③ に a＝2b−1 を代入",
              steps: [
                { expr: "2{{(2b − 1)}} + b = 8" },
                { expr: "5b − 2 = 8 → {{b = 2}}" },
                { expr: "a = 2×2 − 1 = {{3}}" },
              ],
            },
          },
          {
            title: "確かめる",
            body: "a＝3、b＝2 を入れると、上の式は 3×2＋2×1＝8、下の式は 2×2−3×1＝1 で、どちらも成り立ちます。",
          },
        ],
      },
  
      // ---------------- (5) 文章題 ①式を選ぶ ----------------
      {
        id: "5-1",
        no: "(5)①",
        prompt: "1個120円のパンと1個80円のおにぎりを合わせて15個買ったところ、代金の合計は1480円でした。パンを x 個、おにぎりを y 個買ったとして、正しい連立方程式をア〜エから1つ選びなさい。",
        points: 2,
        skill: "思考・判断・表現",
        level: 2,
        point: "「個数の関係」と「代金の関係」で式を2つ。",
        answer: {
          kind: "choice",
          options: [
            "x + y = 15、120x + 80y = 1480",
            "x + y = 1480、120x + 80y = 15",
            "x + y = 15、80x + 120y = 1480",
            "x − y = 15、120x + 80y = 1480",
          ],
          correct: 0,
          why: [
            "個数の合計が15個、代金の合計が1480円。パン（x 個）は120円、おにぎり（y 個）は80円なので正しい。",
            "個数と代金が入れかわっている。x＋y は「個数の合計」なので15。",
            "値段が入れかわっている。x はパンの個数なので、x にかけるのはパンの値段120円。",
            "「合わせて15個」は和なので x＋y。x−y は「パンがおにぎりより何個多いか」になる。",
          ],
        },
        steps: [
          {
            title: "表に整理する",
            body: "わからない2つの数量を x、y にして、{{個数}}と{{代金}}を表にします。横に足した合計が、問題文の数になります。",
            figure: {
              type: "compare",
              title: "パンとおにぎりの個数と代金",
              columns: [{ title: "パン", tone: "blue" }, { title: "おにぎり", tone: "yellow" }, { title: "合計" }],
              rows: [
                { label: "1個の値段", cells: ["120円", "80円", "—"] },
                { label: "個数", cells: ["x 個", "y 個", "{{15個}}"] },
                { label: "代金", cells: ["120x 円", "80y 円", "{{1480円}}"] },
              ],
              note: "合計の列から、x＋y＝15 と 120x＋80y＝1480 の2つの式ができる。",
            },
          },
        ],
      },
  
      // ---------------- (5) 文章題 ②記述（自己採点） ----------------
      {
        id: "5-2",
        no: "(5)②",
        prompt: "(5)① の連立方程式を解いて、パンとおにぎりをそれぞれ何個買ったか求めなさい。途中の式も書きなさい。",
        points: 7,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "5-1",
        point: "代金の式は40でわってから、個数の式と加減法。",
        answer: {
          kind: "written",
          model:
            "パンを x 個、おにぎりを y 個買ったとする。\n" +
            "x + y = 15 …①\n" +
            "120x + 80y = 1480 …②\n" +
            "②÷40 より 3x + 2y = 37 …②'\n" +
            "②' − ①×2 より x = 7\n" +
            "① に代入して 7 + y = 15、y = 8\n" +
            "答え　パン 7個、おにぎり 8個",
          rubric: [
            { label: "x、y が何を表すかを書いている", points: 1, keywords: ["パンを x 個", "おにぎりを y 個"] },
            { label: "個数の式 x＋y＝15 を書いている", points: 1, keywords: ["x+y=15"] },
            { label: "代金の式 120x＋80y＝1480 を書いている", points: 1, keywords: ["120x+80y=1480"] },
            { label: "文字を1つ消して x（または y）を正しく求める過程がある", points: 2, keywords: ["3x+2y=37", "x=7"] },
            { label: "パン7個・おにぎり8個を、単位をつけて両方答えている", points: 2, keywords: ["7個", "8個"] },
          ],
          autoPart: {
            kind: "num",
            answerKind: "pair",
            answer: ["7", "8"],
            labels: ["パン", "おにぎり"],
            unit: "個",
            equations: ["x+y=15", "120x+80y=1480"],
          },
        },
        steps: [
          {
            title: "大きい数の式は先に小さくする",
            body: "② の 120、80、1480 はどれも{{40でわり切れる}}ので、両辺を40でわって 3x＋2y＝37 …②' にします。数が小さくなり、計算まちがいが減ります。",
            trap: "左辺だけわって 3x＋2y＝1480 のままにする。",
          },
          {
            title: "x をそろえず、y をそろえて消す",
            body: "① を2倍すると 2x＋2y＝30。②' からひくと y が消えて x＝7。",
            figure: {
              type: "formula",
              title: "②' − ①×2",
              steps: [
                { label: "②'", expr: "3x {{+ 2y}} = 37" },
                { label: "①×2", expr: "2x {{+ 2y}} = 30" },
                { label: "ひく", expr: "{{x = 7}}", note: "+2y どうしなのでひく" },
              ],
            },
          },
          {
            title: "y を求めて、問題に合うか確かめる",
            body: "① に代入して y＝8。7＋8＝15個、120×7＋80×8＝840＋640＝1480円で、問題の条件に合います。答えは「x＝7、y＝8」ではなく、{{問われたものを単位つきで}}「パン7個、おにぎり8個」と書きます。",
            figure: {
              type: "area",
              kind: "bar",
              title: "代金 1480 円の内わけ",
              max: 1480,
              bars: [
                {
                  label: "代金",
                  parts: [
                    { value: 840, label: "パン 120×7＝840円", tone: "blue" },
                    { value: 640, label: "おにぎり 80×8＝640円", tone: "yellow" },
                  ],
                  total: "1480円",
                },
              ],
            },
            back: [{ label: "レクチャー「文章題：わからない2つを x、y に」", href: "/learn/lecture/j-math-2-renritsu#lec-s5" }],
          },
        ],
      },
    ],
  },
  // ======================= 2. いろいろな連立方程式の計算 =======================
  {
    id: "j-math-2-renritsu/2",
    subject: "math",
    grade: "中2",
    units: ["j-math-2-renritsu"],
    title: "いろいろな連立方程式",
    lead: "次の問いに答えなさい。",
    style: "calc",
    level: 1,
    points: 22,
    minutes: 12,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt:
          "連立方程式\n2x + 3y = 11 …①\n2x − y = 3 …②\nを加減法で解くとき、①−② を計算した結果として正しいものを、ア〜エから1つ選びなさい。",
        points: 2,
        skill: "知識・技能",
        level: 1,
        point: "ひく式の符号を全部変える。3y−(−y)＝4y。",
        answer: {
          kind: "choice",
          options: ["4y ＝ 8", "2y ＝ 8", "4y ＝ 14", "4x + 2y ＝ 14"],
          correct: 0,
          why: [
            "x は 2x−2x で消え、y は 3y−(−y)＝4y、右辺は 11−3＝8。",
            "3y−y と計算している。② の −y をひくので 3y−(−y)＝3y＋y＝4y。",
            "右辺を 11＋3 とたしている。左辺も右辺も同じようにひく。",
            "2つの式をたしている（①＋②）。たすと x が消えず、2x＋2x＝4x が残る。",
          ],
          mistakeOf: [null, 0, null, null],
        },
        steps: [
          {
            title: "ひく式の符号を全部変える",
            body: "①−② は ① に {{−2x＋y＝−3}} をたすのと同じです。x が消えて 4y＝8 になります。",
            figure: { ref: { unit: "j-math-2-renritsu", section: 1 } },
            trap: "3y−y＝2y としてしまう（−y の符号を変え忘れる）。",
            back: [{ label: "レクチャー「加減法」", href: "/learn/lecture/j-math-2-renritsu#lec-s2" }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次の連立方程式を解きなさい。\n2x + 3y = 1\n3x + 4y = 2",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "どちらの式も何倍かして、x の係数を6にそろえる。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["2", "-1"],
          labels: ["x =", "y ="],
          equations: ["2x+3y=1", "3x+4y=2"],
        },
        steps: [
          {
            title: "x の係数をそろえてひく",
            body: "上の式を3倍、下の式を2倍すると、x の係数がどちらも6になります。右辺にもかけるのを忘れずに。",
            figure: {
              type: "formula",
              title: "上×3 − 下×2",
              steps: [
                { label: "上×3", expr: "{{6x}} + 9y = 3" },
                { label: "下×2", expr: "{{6x}} + 8y = 4" },
                { label: "ひく", expr: "{{y = −1}}", note: "右辺は 3−4＝−1" },
              ],
            },
            trap: "下の式を2倍するとき、右辺の 2 を 4 にし忘れる。",
            back: [{ label: "計算の段「加減法（係数をそろえる）」", href: "/learn/math/30" }],
          },
          {
            title: "代入して x を求める",
            body: "2x＋3×(−1)＝1 より 2x＝4、{{x＝2}}。下の式で確かめると 6−4＝2 で正しい。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "次の連立方程式を解きなさい。\nx = 2y + 1\n3x − 5y = 6",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "「x＝…」の形なので、x にかっこごと代入。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["7", "3"],
          labels: ["x =", "y ="],
          equations: ["x=2y+1", "3x-5y=6"],
        },
        steps: [
          {
            title: "x に (2y＋1) を代入する",
            body: "下の式の x に {{(2y＋1)}} を入れると 3(2y＋1)−5y＝6。6y＋3−5y＝6 より {{y＝3}}。",
            trap: "3×2y＋1 のように、＋1 に3をかけ忘れる。",
            back: [{ label: "計算の段「代入法」", href: "/learn/math/31" }],
          },
          {
            title: "x を求める",
            body: "x＝2×3＋1＝{{7}}。下の式で確かめると 21−15＝6 で正しい。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "次の連立方程式を解きなさい。\nx/2 + y/3 = 1\n2x + 3y = −1",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "分数の式は分母の最小公倍数6をかけて整数に。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["4", "-3"],
          labels: ["x =", "y ="],
          equations: ["x/2+y/3=1", "2x+3y=-1"],
        },
        steps: [
          {
            title: "両辺に6をかける",
            body: "上の式の両辺を6倍して {{3x＋2y＝6}}。右辺の1も6にします。",
            trap: "左辺だけ6倍して 3x＋2y＝1 にしてしまう。",
            back: [{ label: "計算の段「小数・分数を含む連立方程式」", href: "/learn/math/32" }],
          },
          {
            title: "x の係数をそろえる",
            figure: {
              type: "formula",
              title: "(3x＋2y＝6)×2 − (2x＋3y＝−1)×3",
              steps: [
                { expr: "6x + 4y = 12" },
                { expr: "6x + 9y = −3" },
                { expr: "−5y = 15 → {{y = −3}}", note: "上から下をひく" },
              ],
            },
            body: "2x＋3×(−3)＝−1 より 2x＝8、{{x＝4}}。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "次の連立方程式を解きなさい。\n3(x − y) + 2y = 7\nx + 2y = 7",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "かっこのある式は、まず展開して整理する。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["3", "2"],
          labels: ["x =", "y ="],
          equations: ["3(x-y)+2y=7", "x+2y=7"],
        },
        steps: [
          {
            title: "かっこをはずして整理する",
            body: "3x−3y＋2y＝7 より {{3x−y＝7}}。",
          },
          {
            title: "y の係数をそろえて、たす",
            body: "3x−y＝7 を2倍すると 6x−2y＝14。x＋2y＝7 とたして 7x＝21、{{x＝3}}。代入して 3＋2y＝7 より {{y＝2}}。",
            trap: "式を2倍するとき、右辺の7を14にし忘れる。",
            back: [{ label: "レクチャー「加減法」", href: "/learn/lecture/j-math-2-renritsu#lec-s2" }],
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "次の方程式を解きなさい。\n3x + y = x − y = 4",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "A＝B＝C は A＝C と B＝C の2つの式に分ける。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["2", "-2"],
          labels: ["x =", "y ="],
          equations: ["3x+y=4", "x-y=4"],
        },
        steps: [
          {
            title: "2つの式に分ける",
            body: "A＝B＝C の形は、数だけの C を使って {{3x＋y＝4}} と {{x−y＝4}} に分けると計算しやすくなります。",
            back: [{ label: "計算の段「A＝B＝C の形の連立方程式」", href: "/learn/math/33" }],
          },
          {
            title: "たして y を消す",
            body: "2式をたすと 4x＝8、{{x＝2}}。x−y＝4 に入れて 2−y＝4 より {{y＝−2}}。",
            trap: "x＝2 だけ求めて y を答え忘れる。",
          },
        ],
      },
    ],
  },

  // ======================= 3. 文章題（速さ・割合・数） =======================
  {
    id: "j-math-2-renritsu/3",
    subject: "math",
    grade: "中2",
    units: ["j-math-2-renritsu"],
    title: "連立方程式の利用",
    lead: "次の問いに答えなさい。",
    style: "word",
    level: 2,
    points: 21,
    minutes: 14,
    review: { status: "draft" },
    items: [
      {
        id: "1-1",
        no: "(1)①",
        prompt:
          "家から 2400 m はなれた図書館へ行くのに、はじめは分速 60 m で歩き、途中から分速 150 m で走ったところ、全部で 25 分かかりました。歩いた道のりを x m、走った道のりを y m として、正しい連立方程式をア〜エから1つ選びなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "道のりの関係と、時間の関係（時間＝道のり÷速さ）。",
        answer: {
          kind: "choice",
          options: [
            "x + y = 2400、x/60 + y/150 = 25",
            "x + y = 2400、60x + 150y = 25",
            "x + y = 25、60x + 150y = 2400",
            "x + y = 2400、x/150 + y/60 = 25",
          ],
          correct: 0,
          why: [
            "x、y は道のりなので和が 2400 m。歩いた時間は x/60 分、走った時間は y/150 分で、合計25分。",
            "道のり×速さ を時間としている。時間は 道のり÷速さ。",
            "x、y を時間と考えたときの式。この問題では x、y は道のり（m）。",
            "速さが入れかわっている。歩いた道のり x は分速60mで進む。",
          ],
        },
        steps: [
          {
            title: "表に整理する",
            body: "x、y は{{道のり}}です。時間は 道のり÷速さ で表します。",
            figure: {
              type: "compare",
              title: "歩いた区間と走った区間",
              columns: [{ title: "歩く", tone: "blue" }, { title: "走る", tone: "yellow" }, { title: "合計" }],
              rows: [
                { label: "速さ", cells: ["分速60m", "分速150m", "—"] },
                { label: "道のり", cells: ["x m", "y m", "{{2400m}}"] },
                { label: "時間", cells: ["x/60 分", "y/150 分", "{{25分}}"] },
              ],
              note: "合計の列から2つの式ができる。",
            },
            back: [{ label: "レクチャー「文章題：わからない2つを x、y に」", href: "/learn/lecture/j-math-2-renritsu#lec-s5" }],
          },
        ],
      },
      {
        id: "1-2",
        no: "(1)②",
        prompt: "(1)① の連立方程式を解いて、歩いた道のりと走った道のりを求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "1-1",
        point: "時間の式は300倍して分母を払う。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["900", "1500"],
          labels: ["歩いた道のり", "走った道のり"],
          unit: "m",
          equations: ["x+y=2400", "x/60+y/150=25"],
        },
        steps: [
          {
            title: "分母を払う",
            body: "60 と 150 の最小公倍数 300 を両辺にかけて {{5x＋2y＝7500}}。",
            trap: "右辺の25に300をかけ忘れる。",
          },
          {
            title: "y の係数をそろえてひく",
            body: "x＋y＝2400 を2倍して 2x＋2y＝4800。5x＋2y＝7500 からひくと 3x＝2700、{{x＝900}}、y＝1500。時間は 15分＋10分＝25分で合います。",
          },
        ],
      },
      {
        id: "2-1",
        no: "(2)①",
        prompt:
          "ある中学校の昨年の生徒数は、男女合わせて 500 人でした。今年は、昨年にくらべて男子が 4% 増え、女子が 5% 減ったので、全体では 2 人増えました。昨年の男子と女子の生徒数を、それぞれ求めなさい。途中の式も書きなさい。",
        points: 7,
        skill: "思考・判断・表現",
        level: 3,
        point: "増えた人数・減った人数で2つめの式をつくる。",
        answer: {
          kind: "written",
          model:
            "昨年の男子を x 人、女子を y 人とする。\n" +
            "x + y = 500 …①\n" +
            "4/100 x − 5/100 y = 2 …②\n" +
            "②×100 より 4x − 5y = 200 …②'\n" +
            "①×4 − ②' より 9y = 1800、y = 200\n" +
            "① に代入して x = 300\n" +
            "答え　男子 300人、女子 200人",
          rubric: [
            { label: "x、y が昨年の男子・女子の人数を表すと書いている", points: 1, keywords: ["男子を x", "女子を y"] },
            { label: "人数の式 x＋y＝500 を書いている", points: 1, keywords: ["x+y=500"] },
            { label: "増減の式 4/100x−5/100y＝2（または 0.04x−0.05y＝2）を書いている", points: 2, keywords: ["4x-5y=200"] },
            { label: "連立方程式を正しく解く過程がある", points: 1, keywords: ["9y=1800", "y=200"] },
            { label: "男子300人・女子200人を、単位をつけて両方答えている", points: 2, keywords: ["300人", "200人"] },
          ],
          autoPart: {
            kind: "num",
            answerKind: "pair",
            answer: ["300", "200"],
            labels: ["男子（人）", "女子（人）"],
            equations: ["x+y=500", "4/100x-5/100y=2"],
          },
        },
        steps: [
          {
            title: "増えた分・減った分で式をつくる",
            body: "男子は {{4/100x 人増え}}、女子は {{5/100y 人減り}}、合わせて2人増えたので 4/100x−5/100y＝2。今年の人数で 1.04x＋0.95y＝502 としても同じ式になります。",
            trap: "全体の増え方 2 を 500 の 2% と考えてしまう。2 は人数。",
          },
          {
            title: "100倍して解く",
            body: "4x−5y＝200 と、x＋y＝500 を4倍した 4x＋4y＝2000 をひくと 9y＝1800、{{y＝200}}、x＝300。",
          },
        ],
      },
      {
        id: "2-2",
        no: "(2)②",
        prompt: "(2)① のとき、今年の男子の生徒数を求めなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "2-1",
        point: "4%増えた数は もとの数×1.04。",
        answer: { kind: "num", answerKind: "num", answer: ["312"], unit: "人", calc: "300*(1+4/100)" },
        steps: [
          {
            title: "昨年の人数に増えた分をたす",
            body: "300×4/100＝12人増えたので 300＋12＝{{312}}人。",
            trap: "x＝300 をそのまま今年の人数と答える。x は昨年の人数。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt:
          "2けたの自然数があります。十の位の数字と一の位の数字の和は 11 で、十の位の数字と一の位の数字を入れかえてできる数は、もとの数より 27 大きくなります。もとの自然数を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "十の位 x、一の位 y なら、もとの数は 10x＋y。",
        answer: { kind: "num", answerKind: "num", answer: ["47"], calc: "10*4+7" },
        steps: [
          {
            title: "2つの式をつくる",
            body: "十の位を x、一の位を y とすると、もとの数は {{10x＋y}}、入れかえた数は {{10y＋x}}。x＋y＝11、10y＋x＝(10x＋y)＋27 です。",
            trap: "もとの数を xy や x＋y と表してしまう。",
          },
          {
            title: "解いて、もとの数を答える",
            body: "2つめの式を整理すると −9x＋9y＝27、y−x＝3。x＋y＝11 とたして 2y＝14、y＝7、x＝4。答えは x、y ではなく{{もとの数 47}}。74−47＝27 で合います。",
          },
        ],
      },
    ],
  },

  // ======================= 4. 応用（解と係数・手順・資料） =======================
  {
    id: "j-math-2-renritsu/4",
    subject: "math",
    grade: "中2",
    units: ["j-math-2-renritsu"],
    title: "連立方程式の応用",
    lead: "次の問いに答えなさい。",
    style: "synthesis",
    level: 3,
    points: 20,
    minutes: 14,
    review: { status: "draft" },
    material: [
      {
        kind: "table",
        caption: "(3) ある博物館の入館料の記録（大人1人・子ども1人の料金はそれぞれ同じ）",
        head: ["日", "大人", "子ども", "入館料の合計"],
        rows: [
          ["1日目", "2人", "3人", "2600円"],
          ["2日目", "3人", "5人", "4100円"],
        ],
      },
    ],
    items: [
      {
        id: "1-1",
        no: "(1)①",
        prompt:
          "2つの連立方程式\n2x + y = 5、ax + by = 7\nx − y = 4、bx + ay = −5\nが同じ解をもちます。その解を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "a、b をふくまない2つの式を組にして先に解く。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["3", "-1"],
          labels: ["x =", "y ="],
          equations: ["2x+y=5", "x-y=4"],
        },
        steps: [
          {
            title: "数だけの式どうしを組にする",
            body: "同じ解なので、4つの式すべてを満たします。a、b のない {{2x＋y＝5}} と {{x−y＝4}} を組にすると解けます。",
          },
          {
            title: "たして解く",
            body: "2式をたすと 3x＝9、{{x＝3}}。x−y＝4 より {{y＝−1}}。",
          },
        ],
      },
      {
        id: "1-2",
        no: "(1)②",
        prompt: "(1)① のとき、a、b の値を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        dependsOn: "1-1",
        point: "解を代入すると、a と b の連立方程式になる。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["2", "-1"],
          labels: ["a =", "b ="],
          equations: ["3a-b=7", "3b-a=-5"],
        },
        steps: [
          {
            title: "x＝3、y＝−1 を代入する",
            figure: {
              type: "formula",
              title: "a、b の連立方程式をつくる",
              steps: [
                { label: "ax＋by＝7", expr: "{{3a − b = 7}}", note: "…③" },
                { label: "bx＋ay＝−5", expr: "{{−a + 3b = −5}}", note: "…④" },
              ],
            },
            body: "y＝−1 なので、b×(−1)＝−b、a×(−1)＝−a になります。",
            trap: "bx＋ay の方を 3a−b と書いてしまう。b に x、a に y をかける。",
          },
          {
            title: "a、b を求める",
            body: "③ より b＝3a−7。④ に代入して −a＋9a−21＝−5、8a＝16、{{a＝2}}、b＝−1。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt:
          "連立方程式\n4x + 3y = 10 …①\n3x − 2y = −1 …②\nを加減法で解きます。正しい順に並べなさい。（使わないものが1つあります）",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "y の係数を 6 と −6 にそろえて、たす。",
        answer: {
          kind: "order",
          tokens: [
            "①×2：8x＋6y＝20",
            "②×3：9x−6y＝−3",
            "たす：17x＝17、x＝1",
            "① に代入：4＋3y＝10",
            "y＝2",
          ],
          alsoOk: [[1, 0, 2, 3, 4]],
          distractor: "ひく：−x＝23、x＝−23",
        },
        steps: [
          {
            title: "符号が反対ならたす",
            body: "y の係数は ＋6 と −6 で{{符号が反対}}なので、たすと y が消えます。ひくと 6y−(−6y)＝12y が残ってしまいます。",
            figure: { ref: { unit: "j-math-2-renritsu", section: 1 } },
            back: [{ label: "レクチャー「加減法」", href: "/learn/lecture/j-math-2-renritsu#lec-s2" }],
          },
        ],
      },
      {
        id: "3-1",
        no: "(3)①",
        prompt:
          "上の表から、大人1人と子ども1人の入館料をそれぞれ求めなさい。途中の式も書きなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 2,
        point: "1日目と2日目で、合計の式を2つつくる。",
        answer: {
          kind: "written",
          model:
            "大人1人を x 円、子ども1人を y 円とする。\n" +
            "2x + 3y = 2600 …①\n" +
            "3x + 5y = 4100 …②\n" +
            "②×2 − ①×3 より y = 400\n" +
            "① に代入して 2x + 1200 = 2600、x = 700\n" +
            "答え　大人 700円、子ども 400円",
          rubric: [
            { label: "x、y が何を表すかを書き、2つの式 2x＋3y＝2600、3x＋5y＝4100 をつくっている", points: 2, keywords: ["2x+3y=2600", "3x+5y=4100"] },
            { label: "x の係数をそろえて y＝400 を正しく求めている", points: 2, keywords: ["y=400"] },
            { label: "大人700円・子ども400円を、単位をつけて両方答えている", points: 2, keywords: ["700円", "400円"] },
          ],
          autoPart: {
            kind: "num",
            answerKind: "pair",
            answer: ["700", "400"],
            labels: ["大人", "子ども"],
            unit: "円",
            equations: ["2x+3y=2600", "3x+5y=4100"],
          },
        },
        steps: [
          {
            title: "表の1行が1つの式",
            body: "1日目は {{2x＋3y＝2600}}、2日目は {{3x＋5y＝4100}}。",
            back: [{ label: "レクチャー「文章題：わからない2つを x、y に」", href: "/learn/lecture/j-math-2-renritsu#lec-s5" }],
          },
          {
            title: "x の係数を6にそろえる",
            figure: {
              type: "formula",
              title: "②×2 − ①×3",
              steps: [
                { label: "②×2", expr: "6x + 10y = 8200" },
                { label: "①×3", expr: "6x + 9y = 7800" },
                { label: "ひく", expr: "{{y = 400}}" },
              ],
            },
            body: "① に代入して 2x＝2600−1200＝1400、{{x＝700}}。2日目も 2100＋2000＝4100 で合います。",
          },
        ],
      },
      {
        id: "3-2",
        no: "(3)②",
        prompt: "3日目は大人4人・子ども6人の団体で、入館料の合計が2割引きになりました。3日目の入館料の合計を求めなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "3-1",
        point: "2割引きは、もとの金額×0.8。",
        answer: { kind: "num", answerKind: "num", answer: ["4160"], unit: "円", calc: "(4*700+6*400)*(1-2/10)" },
        steps: [
          {
            title: "割引前の合計から2割引く",
            body: "割引前は 4×700＋6×400＝5200円。2割引きは {{×0.8}} なので 5200×0.8＝{{4160}}円。",
            trap: "5200−2＝5198 や 5200×0.2＝1040 としてしまう。",
          },
        ],
      },
    ],
  },
];
