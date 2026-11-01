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
];
