// 中1数学「一次方程式」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

export const J_MATH_1_HOTEISHIKI: Daimon[] = [
  {
    id: "j-math-1-hoteishiki/1",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-hoteishiki"],
    title: "一次方程式",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 25,
    minutes: 12,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "次の方程式を解きなさい。\n5x − 7 = 2x + 8",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "x の項は左辺、数の項は右辺へ。移項すると符号が変わる。",
        answer: { kind: "num", answerKind: "num", answer: ["5"], labels: ["x ="], equations: ["5x-7=2x+8"] },
        steps: [
          {
            title: "移項する",
            body: "2x を左辺へ、−7 を右辺へ移すと 5x−2x＝8＋7。{{移項すると符号が変わります}}。",
            figure: { ref: { unit: "j-math-1-hoteishiki", section: 1 } },
            trap: "−7 を右辺へ移して 8−7 にしてしまう。",
          },
          {
            title: "両辺を x の係数でわる",
            body: "3x＝15 なので x＝{{5}}。もとの式に入れると 18＝18 で正しい。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次の方程式を解きなさい。\n3(x − 2) = 5x + 4",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "かっこをはずしてから移項。答えが負になってもよい。",
        answer: { kind: "num", answerKind: "num", answer: ["-5"], labels: ["x ="], equations: ["3(x-2)=5x+4"] },
        steps: [
          {
            title: "かっこをはずす",
            body: "3(x−2)＝{{3x−6}}。−2 にも3をかけます。",
          },
          {
            title: "移項して解く",
            body: "3x−5x＝4＋6 より −2x＝10、x＝{{−5}}。両辺を −2 でわるので符号に注意。",
            trap: "−2x＝10 から x＝5 としてしまう（わる数の符号）。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "次の方程式を解きなさい。\n0.3x − 1.2 = 0.5x",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "両辺を10倍。数の項 −1.2 も −12 にする。",
        answer: { kind: "num", answerKind: "num", answer: ["-6"], labels: ["x ="], equations: ["0.3x-1.2=0.5x"] },
        steps: [
          {
            title: "両辺を10倍して整数にする",
            body: "すべての項に10をかけて 3x−12＝5x。{{数の項にもかける}}のを忘れないこと。",
            trap: "3x−1.2＝5x のように、数の項だけ10倍し忘れる。",
            back: [{ label: "レクチャー「等式の性質と移項」", href: "/learn/lecture/j-math-1-hoteishiki#lec-s2" }],
          },
          {
            title: "移項して解く",
            body: "3x−5x＝12 より −2x＝12、x＝{{−6}}。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "次の方程式を解きなさい。\nx/2 − (x − 1)/3 = 1",
        points: 4,
        skill: "知識・技能",
        level: 3,
        point: "分母の最小公倍数6を両辺にかける。分子はかっこに入れる。",
        answer: { kind: "num", answerKind: "num", answer: ["4"], labels: ["x ="], equations: ["x/2-(x-1)/3=1"] },
        steps: [
          {
            title: "両辺に6をかけて分母をはらう",
            body: "6×x/2＝3x、6×(x−1)/3＝{{2(x−1)}}、右辺は6。分子にかっこをつけるのがポイント。",
            figure: {
              type: "formula",
              title: "分母をはらう",
              steps: [
                { expr: "x/2 − (x − 1)/3 = 1" },
                { expr: "3x − {{2(x − 1)}} = 6", note: "両辺×6" },
                { expr: "3x − 2x {{+ 2}} = 6", note: "−2×(−1)＝+2" },
                { expr: "{{x = 4}}" },
              ],
            },
            trap: "3x−2x−1＝6 のように、かっこをつけずに −1 のままにする。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt:
          "何人かの子どもに鉛筆を配ります。1人に3本ずつ配ると8本余り、1人に5本ずつ配ると4本たりません。子どもの人数を x 人として方程式をつくり、子どもの人数と鉛筆の本数を求めなさい。途中の式も書きなさい。",
        points: 9,
        skill: "思考・判断・表現",
        level: 3,
        point: "鉛筆の本数を2通りの式で表して、等号で結ぶ。",
        answer: {
          kind: "written",
          model:
            "子どもの人数を x 人とする。\n" +
            "鉛筆の本数は 3x + 8 本とも、5x − 4 本とも表せるので\n" +
            "3x + 8 = 5x − 4\n" +
            "−2x = −12\n" +
            "x = 6\n" +
            "鉛筆は 3×6 + 8 = 26（本）\n" +
            "答え　子ども 6人、鉛筆 26本",
          rubric: [
            { label: "x が何を表すか（子どもの人数）を書いている", points: 1, keywords: ["x 人", "人数を x"] },
            { label: "鉛筆の本数を2通りに表し、方程式 3x＋8＝5x−4 をつくっている", points: 3, keywords: ["3x+8=5x-4"] },
            { label: "方程式を正しく解いて x＝6 を出している", points: 2, keywords: ["x=6"] },
            { label: "子ども6人・鉛筆26本を、単位をつけて両方答えている", points: 3, keywords: ["6人", "26本"] },
          ],
          autoPart: {
            kind: "num",
            answerKind: "pair",
            answer: ["6", "26"],
            labels: ["子ども（人）", "鉛筆（本）"],
            equations: ["3x+8=y", "5x-4=y"],
          },
        },
        steps: [
          {
            title: "同じものを2通りに表す",
            body: "鉛筆の本数は「3本ずつ配って8本余る」なら {{3x＋8}}、「5本ずつだと4本たりない」なら {{5x−4}}。同じ本数なので等号で結びます。",
            figure: {
              type: "compare",
              title: "鉛筆の本数を2通りに表す",
              columns: [{ title: "配り方" }, { title: "鉛筆の本数", tone: "blue" }],
              rows: [
                { cells: ["1人3本ずつ・8本余る", "3x＋8"] },
                { cells: ["1人5本ずつ・4本たりない", "5x−4"] },
              ],
              note: "どちらも同じ鉛筆の本数なので 3x＋8＝5x−4。",
            },
            back: [{ label: "レクチャー「文章題は等しい関係を見つける」", href: "/learn/lecture/j-math-1-hoteishiki#lec-s4" }],
          },
          {
            title: "解いて、問われたものを答える",
            body: "3x−5x＝−4−8 より x＝6。鉛筆は 3×6＋8＝26本。{{人数と本数の両方}}を、単位をつけて答えます。",
            trap: "x＝6 だけ書いて、鉛筆の本数を答え忘れる。",
          },
        ],
      },
    ],
  },
  {
    id: "j-math-1-hoteishiki/2",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-hoteishiki"],
    title: "方程式と解・等式の性質",
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
        prompt: "−2 が解である方程式を、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "x に −2 を代入して、左辺＝右辺になるか確かめる。",
        answer: {
          kind: "choice",
          options: ["3x + 4 = −2", "2x − 1 = 3", "x + 5 = −3", "4 − x = 2"],
          correct: 0,
          why: [
            "3×(−2)＋4＝−2 で、左辺と右辺が等しい。−2 が解。",
            "2×(−2)−1＝−5 で、右辺の3と等しくない（解は x＝2）。",
            "−2＋5＝3 で、右辺の −3 と等しくない（解は x＝−8）。",
            "4−(−2)＝6 で、右辺の2と等しくない（解は x＝2）。",
          ],
        },
        steps: [
          {
            title: "代入して両辺を比べる",
            body: "解とは、方程式を {{成り立たせる文字の値}}。x＝−2 を入れて、左辺と右辺が同じになるものを探します。",
            figure: { ref: { unit: "j-math-1-hoteishiki", section: 0 } },
            trap: "4−x に −2 を入れて 4−2＝2 とする（かっこをつけ忘れる）。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "方程式 x/3 = 4 を x = 12 と解きました。このとき使った等式の性質を、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "x/3 から x だけを残すには、3をかける。",
        answer: {
          kind: "choice",
          options: ["両辺に3をかける", "両辺を3でわる", "両辺に3をたす", "両辺から3をひく"],
          correct: 0,
          why: [
            "x/3×3＝x、4×3＝12。両辺に同じ数をかけても等式は成り立つ。",
            "両辺を3でわると x/9＝4/3 になり、x だけにならない。",
            "x/3＋3 となり、x だけにならない。",
            "x/3−3 となり、x だけにならない。",
          ],
        },
        steps: [
          {
            title: "てんびんの両方に同じことをする",
            body: "x/3 は x を3でわった数。もとにもどすには {{両辺に3をかけます}}。4×3＝12。",
            figure: { ref: { unit: "j-math-1-hoteishiki", section: 1 } },
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "等式の一方の辺にある項を、符号を変えて他方の辺に移すことを何といいますか。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "両辺に同じ数をたす・ひくことを、短く書いたもの。",
        answer: {
          kind: "term",
          accept: ["移項"],
          script: "kanji",
          near: [{ text: "いこう", why: "読みは合っています。漢字で「移項」と書きましょう。" }],
        },
        steps: [
          {
            title: "移項は等式の性質から",
            body: "両辺に同じ数をたすと、項が符号を変えて反対側へ移ったように見えます。これを {{移項}} といいます。",
            back: [{ label: "レクチャー「等式の性質と移項」", href: "/learn/lecture/j-math-1-hoteishiki#lec-s2" }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "方程式 4x + 6 = 2 を解くとき、+6 を移項した式として正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "左辺の +6 は、右辺へ移ると −6。",
        answer: {
          kind: "choice",
          options: ["4x = 2 − 6", "4x = 2 + 6", "4x = 6 − 2", "x + 6 = 2/4"],
          correct: 0,
          why: [
            "+6 を右辺へ移すので符号が変わり −6。4x＝−4 となり x＝−1。",
            "移項したのに符号を変えていない。",
            "6 と 2 の順を入れかえている。2−6 と 6−2 は答えの符号が反対になる。",
            "両辺を4でわるなら、+6 も 6/4 にしなければならない。",
          ],
          mistakeOf: [null, 0, null, null],
        },
        steps: [
          {
            title: "移項すると符号が変わる",
            body: "左辺の +6 を右辺へ移すと {{−6}}。4x＝2−6＝−4、x＝−1 です。",
            trap: "4x＝2＋6 としてしまう（符号の変え忘れ）。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "次の方程式を解きなさい。\n2x + 9 = −5",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "9 を移項して 2x＝−14。",
        answer: { kind: "num", answerKind: "num", answer: ["-7"], labels: ["x ="], equations: ["2x+9=-5"] },
        steps: [
          {
            title: "数の項を移項する",
            body: "+9 を右辺へ移して 2x＝−5−9＝{{−14}}。",
            trap: "2x＝−5＋9＝4 にしてしまう。",
          },
          {
            title: "両辺を2でわる",
            body: "x＝−14÷2＝{{−7}}。確かめ：2×(−7)＋9＝−5。",
            back: [{ label: "計算の段「方程式 ax+b=c」", href: "/learn/math/16" }],
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "次の比例式を解きなさい。\nx : 8 = 3 : 2",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "外側の積＝内側の積。x×2＝8×3。",
        answer: { kind: "num", answerKind: "num", answer: ["12"], labels: ["x ="], equations: ["x*2=8*3"] },
        steps: [
          {
            title: "比例式の性質を使う",
            body: "a:b＝c:d なら ad＝bc。x×2＝8×3 で {{2x＝24}}。",
          },
          {
            title: "両辺を2でわる",
            body: "x＝{{12}}。12:8 を簡単にすると 3:2 になり、正しい。",
            back: [{ label: "計算の段「比例式」", href: "/learn/math/21" }],
          },
        ],
      },
    ],
  },
  {
    id: "j-math-1-hoteishiki/3",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-hoteishiki"],
    title: "いろいろな一次方程式",
    lead: "次の問いに答えなさい。",
    style: "calc",
    level: 2,
    points: 20,
    minutes: 12,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "次の方程式を解きなさい。\n7 − 2(x − 3) = 3x + 3",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "−2 をかっこの中の両方にかける。−2×(−3)＝+6。",
        answer: { kind: "num", answerKind: "num", answer: ["2"], labels: ["x ="], equations: ["7-2(x-3)=3x+3"] },
        steps: [
          {
            title: "かっこをはずす",
            body: "−2(x−3)＝{{−2x＋6}}。左辺は 7−2x＋6＝13−2x になります。",
            figure: { ref: { unit: "j-math-1-hoteishiki", section: 2 } },
            trap: "−2(x−3) を −2x−6 にする。",
          },
          {
            title: "移項して解く",
            body: "−2x−3x＝3−13 より −5x＝−10、x＝{{2}}。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次の方程式を解きなさい。\n0.12x − 0.3 = 0.06x + 0.18",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "小数第2位まであるので、両辺を100倍する。",
        answer: { kind: "num", answerKind: "num", answer: ["8"], labels: ["x ="], equations: ["0.12x-0.3=0.06x+0.18"] },
        steps: [
          {
            title: "両辺を100倍する",
            body: "すべての項に100をかけて {{12x−30＝6x＋18}}。0.3 は 30 になります。",
            trap: "10倍だけして 1.2x−3＝0.6x＋1.8 のまま、小数が残る。",
          },
          {
            title: "移項して解く",
            body: "12x−6x＝18＋30 より 6x＝48、x＝{{8}}。",
            back: [{ label: "計算の段「小数の係数の方程式」", href: "/learn/math/19" }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "次の方程式を解きなさい。\n(3x − 1)/4 = (x + 3)/2",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "両辺に4をかける。右辺の分子はかっこごと2倍。",
        answer: { kind: "num", answerKind: "num", answer: ["7"], labels: ["x ="], equations: ["(3x-1)/4=(x+3)/2"] },
        steps: [
          {
            title: "分母をはらう",
            body: "両辺に4をかけると 3x−1＝{{2(x＋3)}}。分子はかっこに入れてからかけます。",
            trap: "3x−1＝2x＋3 にする（3 に2をかけ忘れる）。",
          },
          {
            title: "移項して解く",
            body: "3x−1＝2x＋6 より x＝{{7}}。",
            back: [{ label: "計算の段「分数の係数の方程式」", href: "/learn/math/20" }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "次の比例式を解きなさい。\n(x − 2) : 6 = 4 : 3",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "外側の積＝内側の積。x−2 はかっこのまま。",
        answer: { kind: "num", answerKind: "num", answer: ["10"], labels: ["x ="], equations: ["3(x-2)=6*4"] },
        steps: [
          {
            title: "比例式の性質を使う",
            body: "(x−2)×3＝6×4 で {{3(x−2)＝24}}。",
          },
          {
            title: "解く",
            body: "両辺を3でわると x−2＝8、x＝{{10}}。",
            trap: "3x−2＝24 として、2 に3をかけ忘れる。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "x についての方程式 ax + 7 = 2x − a の解が 3 のとき、a の値を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "解 x＝3 を代入すると、a についての方程式になる。",
        answer: { kind: "num", answerKind: "num", answer: ["-1/4"], labels: ["a ="], equations: ["a*3+7=2*3-a"] },
        steps: [
          {
            title: "解を代入する",
            body: "x に3を入れると 3a＋7＝6−a。これは {{a についての方程式}} です。",
          },
          {
            title: "a について解く",
            body: "3a＋a＝6−7 より 4a＝−1、a＝{{−1/4}}。",
            trap: "4a＝−1 から a＝−4 とする（わる数とわられる数が逆）。",
          },
        ],
      },
    ],
  },
  {
    id: "j-math-1-hoteishiki/4",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-hoteishiki"],
    title: "方程式の利用（速さ）",
    lead: "次の文を読んで、あとの問いに答えなさい。",
    style: "word",
    level: 3,
    points: 20,
    minutes: 13,
    review: { status: "draft" },
    material: [
      {
        kind: "text",
        body: "兄は家を出て、分速60mで歩いて駅へ向かいました。兄が家を出てから10分後に、弟が同じ道を分速160mの自転車で追いかけました。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の文で、弟が家を出てから x 分後に兄に追いつくとします。x を求めるための方程式を、ア〜エから1つ選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "追いつくとき、2人が進んだ道のりは等しい。",
        answer: {
          kind: "choice",
          options: ["60(x + 10) = 160x", "60x = 160(x + 10)", "60x + 10 = 160x", "60(x − 10) = 160x"],
          correct: 0,
          why: [
            "兄は弟より10分長く歩くので (x＋10) 分。道のり 60(x＋10) と 160x が等しい。",
            "時間を10分多くしたのが弟になっている。先に出たのは兄。",
            "10 は時間（分）なのに、道のり（m）にそのままたしている。",
            "兄の歩いた時間を10分短くしている。兄の方が長く歩いている。",
          ],
        },
        steps: [
          {
            title: "速さ・時間・道のりを表にする",
            body: "道のり＝速さ×時間。兄が歩いた時間は {{x＋10}} 分です。",
            figure: {
              type: "compare",
              title: "追いつくまでの2人",
              columns: [{ title: "人" }, { title: "速さ（分速）" }, { title: "時間（分）" }, { title: "道のり（m）", tone: "yellow" }],
              rows: [
                { cells: ["兄", "60", "x＋10", "60(x＋10)"] },
                { cells: ["弟", "160", "x", "160x"] },
              ],
              note: "追いついたとき、2人の道のりは等しい。",
            },
            back: [{ label: "レクチャー「文章題は等しい関係を見つける」", href: "/learn/lecture/j-math-1-hoteishiki#lec-s4" }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "弟は家を出てから何分後に兄に追いつきますか。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "60x＋600＝160x を解く。",
        dependsOn: "1",
        answer: { kind: "num", answerKind: "num", answer: ["6"], unit: "分後", equations: ["60(x+10)=160x"] },
        steps: [
          {
            title: "方程式を解く",
            body: "60x＋600＝160x より 60x−160x＝−600、−100x＝−600、x＝{{6}}。",
            figure: { ref: { unit: "j-math-1-hoteishiki", section: 3 } },
          },
          {
            title: "確かめる",
            body: "兄は16分で 60×16＝960m、弟は6分で 160×6＝960m。{{同じ道のり}}なので正しい。",
            trap: "兄が歩いた時間の16分を答える（弟が出てからの時間を聞かれている）。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "弟が兄に追いつくのは、家から何mの地点ですか。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "弟の道のり 160×6 で求める。",
        dependsOn: "2",
        answer: { kind: "num", answerKind: "num", answer: ["960"], unit: "m", calc: "160*6" },
        steps: [
          {
            title: "道のりを計算する",
            body: "弟は分速160mで6分進むので 160×6＝{{960}}（m）。兄の 60×16 でも同じです。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "家から駅までの道のりが800mのとき、弟は駅に着くまでに兄に追いつくことができますか。理由も書きなさい。",
        points: 8,
        skill: "思考・判断・表現",
        level: 3,
        point: "追いつく地点（960m）と駅までの道のりをくらべる。",
        dependsOn: "3",
        answer: {
          kind: "written",
          model:
            "弟が兄に追いつくのは家から960mの地点である。\n" +
            "駅までの道のりは800mで、960m より短い。\n" +
            "だから、追いつく前に兄が駅に着いてしまうので、弟は駅に着くまでに兄に追いつくことができない。\n" +
            "（別解）兄が駅に着くのは 800÷60＝13分20秒後、弟が駅に着くのは 10＋800÷160＝15分後で、兄の方が先に着く。",
          rubric: [
            { label: "追いつく地点が家から960m（または、2人が駅に着く時間 13分20秒・15分）を示している", points: 3, keywords: ["960m", "15分"] },
            { label: "駅までの道のり800mとくらべている（または着く時間をくらべている）", points: 3, keywords: ["800m"] },
            { label: "「追いつくことができない」と結論を書いている", points: 2, keywords: ["追いつけない", "できない"] },
          ],
          autoPart: {
            kind: "term",
            accept: ["追いつけない", "追いつくことができない", "できない", "追いつかない"],
          },
        },
        steps: [
          {
            title: "求めた答えが問題に合うか考える",
            body: "方程式の解では家から960mで追いつく。でも駅は {{800m}} なので、その前に兄は駅に着いてしまいます。",
            trap: "x＝6 が出たので「追いつける」と答える（解が問題に合うか確かめていない）。",
          },
          {
            title: "時間でくらべてもよい",
            body: "兄は 800÷60＝13分20秒後、弟は 10＋5＝{{15分後}} に駅に着く。兄の方が先なので追いつけません。",
          },
        ],
      },
    ],
  },
];
