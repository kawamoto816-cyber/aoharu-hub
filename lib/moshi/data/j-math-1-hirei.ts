// 中1数学「比例と反比例」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

const LEC = "/learn/lecture/j-math-1-hirei";

export const J_MATH_1_HIREI: Daimon[] = [
  // ================= 1 基本：比例・反比例の式 =================
  {
    id: "j-math-1-hirei/1",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-hirei"],
    title: "比例と反比例の式",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 1,
    points: 20,
    minutes: 10,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "次のア〜エのうち、y が x に反比例するものをすべて選びなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "x×y が一定なら反比例。「x が増えると y が減る」だけでは決まらない。",
        answer: {
          kind: "choice",
          options: [
            "1本60円の鉛筆を x 本買ったときの代金 y 円",
            "面積が 18cm² の三角形の底辺 x cm と高さ y cm",
            "20km の道のりを時速 x km で進むときにかかる時間 y 時間",
            "1000円持っていて、x 円使ったときの残りのお金 y 円",
          ],
          correct: [1, 2],
          why: [
            "y＝60x で、y÷x＝60 が一定。比例です。",
            "底辺×高さ÷2＝18 より xy＝36、y＝36/x。x×y が一定なので反比例です。",
            "時間＝道のり÷速さ より y＝20/x。x×y＝20 が一定なので反比例です。",
            "y＝1000−x。x が増えると y は減りますが、x×y も y÷x も一定ではないので、比例でも反比例でもありません。",
          ],
          mistakeOf: [null, null, null, 0],
        },
        steps: [
          {
            title: "x×y と y÷x を確かめる",
            body: "それぞれ y を x の式で表します。{{y＝a/x の形（x×y が一定）}}なら反比例です。",
            figure: { ref: { unit: "j-math-1-hirei", section: 4 } },
            trap: "エは x が増えると y が減るので反比例だと思ってしまう。",
            back: [{ label: "レクチャー「比例と反比例を表でくらべる」", href: `${LEC}#lec-s5` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "y は x に比例し、x＝−6 のとき y＝9 です。比例定数を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "y＝ax に x、y の値を代入して a を求める。",
        answer: { kind: "num", answerKind: "num", answer: ["-3/2"], equations: ["9=-6x"] },
        steps: [
          {
            title: "y＝ax に代入する",
            body: "9＝a×(−6) より a＝9÷(−6)＝{{−3/2}}。符号を忘れずに、約分して答えます。",
            figure: { ref: { unit: "j-math-1-hirei", section: 1 } },
            trap: "a＝−6÷9 と、わる順を逆にして −2/3 にしてしまう。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "(2) の比例で、x＝4 のときの y の値を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        dependsOn: "2",
        point: "式 y＝−3/2 x に x＝4 を代入する。",
        answer: { kind: "num", answerKind: "num", answer: ["-6"], calc: "(-3/2)*4" },
        steps: [
          {
            title: "式に代入する",
            body: "y＝−3/2 x に x＝4 を入れて、y＝−3/2×4＝{{−6}}。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "y は x に反比例し、x＝−5 のとき y＝4 です。y を x の式で表したものを選びなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "反比例の比例定数は x×y。y÷x ではない。",
        answer: {
          kind: "choice",
          options: ["y＝−20/x", "y＝20/x", "y＝−4/5 x", "y＝−x/20"],
          correct: 0,
          why: [
            "比例定数 a＝x×y＝(−5)×4＝−20。よって y＝−20/x です。",
            "x×y の符号をまちがえています。(−5)×4 は負の数です。",
            "y÷x＝−4/5 を使った比例の式です。反比例では x×y を使います。",
            "比例定数を逆数にしています。反比例 y＝a/x の a は x×y＝−20 です。",
          ],
          mistakeOf: [null, null, 0, 1],
        },
        steps: [
          {
            title: "比例定数は x×y",
            body: "反比例では {{x×y がいつも a}} です。a＝(−5)×4＝−20 なので y＝−20/x。",
            figure: { ref: { unit: "j-math-1-hirei", section: 3 } },
            back: [{ label: "レクチャー「反比例 y＝a/x」", href: `${LEC}#lec-s4` }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "(4) の反比例で、y＝10 となるときの x の値を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        dependsOn: "4",
        point: "x×y＝−20 を使えば、x＝−20÷y で求められる。",
        answer: { kind: "num", answerKind: "num", answer: ["-2"], labels: ["x ="], calc: "-20/10" },
        steps: [
          {
            title: "x×y＝−20 を使う",
            body: "x×10＝−20 なので x＝−20÷10＝{{−2}}。y＝−20/x に x＝−2 を入れると 10 になり、正しいです。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "y＝ax や y＝a/x の式の a のように、決まった数を表す a を何といいますか。漢字で答えなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "比例でも反比例でも、a は「比例定数」とよぶ。",
        answer: {
          kind: "term",
          accept: ["比例定数"],
          script: "kanji",
          near: [
            { text: "ひれいていすう", why: "読みは合っています。漢字で「比例定数」と書きましょう。" },
            { text: "反比例定数", why: "反比例でも a は「比例定数」とよびます。" },
          ],
        },
        steps: [
          {
            title: "反比例でも「比例定数」",
            body: "y＝ax の a も、y＝a/x の a も {{比例定数}} といいます。",
          },
        ],
      },
    ],
  },

  // ================= 2 標準：表から見分ける =================
  {
    id: "j-math-1-hirei/2",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-hirei"],
    title: "表から比例・反比例を見分ける",
    lead: "下の表A、表Bは、ともなって変わる x と y の値を表したものです。次の問いに答えなさい。",
    style: "data",
    level: 2,
    points: 20,
    minutes: 12,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "table",
        caption: "表A",
        head: ["x", "1", "2", "3", "4", "6"],
        rows: [["y", "−4", "−8", "ア", "−16", "−24"]],
      },
      {
        kind: "table",
        caption: "表B",
        head: ["x", "1", "2", "3", "4", "6"],
        rows: [["y", "24", "12", "8", "イ", "4"]],
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の表A、表Bの x と y の関係として正しいものを選びなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "表Aは y÷x、表Bは x×y が一定になっている。",
        answer: {
          kind: "choice",
          options: ["Aは比例、Bは反比例", "Aは反比例、Bは比例", "AもBも反比例", "AもBも比例"],
          correct: 0,
          why: [
            "表Aは y÷x がどれも −4 で一定なので比例。表Bは x×y がどれも 24 で一定なので反比例です。",
            "AとBを逆にしています。y÷x が一定なのはA、x×y が一定なのはBです。",
            "表Aは x が増えると y が減りますが、y÷x＝−4 が一定なので比例です（比例定数が負）。",
            "表Bは y÷x が 24、6、8/3…と変わるので比例ではありません。",
          ],
          mistakeOf: [null, null, 0, null],
        },
        steps: [
          {
            title: "y÷x と x×y を計算する",
            body: "表Aは (−4)÷1＝(−8)÷2＝−4 で {{y÷x が一定}}。表Bは 1×24＝2×12＝24 で {{x×y が一定}}。",
            figure: { ref: { unit: "j-math-1-hirei", section: 4 } },
            trap: "表Aの y が減っていくので反比例と思う。比例定数が負の比例です。",
            back: [{ label: "レクチャー「比例と反比例を表でくらべる」", href: `${LEC}#lec-s5` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の表Aのアにあてはまる数を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "表Aの式は y＝−4x。x＝3 を代入する。",
        answer: { kind: "num", answerKind: "num", answer: ["-12"], calc: "-4*3" },
        steps: [
          {
            title: "式を求めて代入する",
            body: "表Aは y＝−4x。x＝3 のとき y＝−4×3＝{{−12}}。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の表Bのイにあてはまる数を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "表Bは x×y＝24。x＝4 なら y＝24÷4。",
        answer: { kind: "num", answerKind: "num", answer: ["6"], calc: "24/4" },
        steps: [
          {
            title: "x×y＝24 を使う",
            body: "表Bの式は y＝24/x。x＝4 のとき y＝24÷4＝{{6}}。",
            figure: { ref: { unit: "j-math-1-hirei", section: 3 } },
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "上の表Aで、x の値が 2 から 6 まで増えるとき、y の値はいくら増えますか。減るときは負の数で答えなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "（あとの y）−（はじめの y）。減るので負の数。",
        answer: { kind: "num", answerKind: "num", answer: ["-16"], calc: "-24-(-8)" },
        steps: [
          {
            title: "変わった量＝あと−はじめ",
            body: "x＝2 のとき y＝−8、x＝6 のとき y＝−24。−24−(−8)＝{{−16}} なので、16 減ります。",
            trap: "−8−(−24)＝16 と、ひく順を逆にする。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "表Bの x と y の関係が、比例ではなく反比例であるといえる理由を、表の数を使って説明しなさい。",
        points: 7,
        skill: "思考・判断・表現",
        level: 2,
        point: "x×y がどこでも同じ数になることを、計算で示す。",
        answer: {
          kind: "written",
          limit: { max: 120, unit: "字" },
          model:
            "x×y を計算すると、1×24＝24、2×12＝24、3×8＝24、6×4＝24 となり、どれも 24 で一定だから反比例である。y÷x は 24、6、8/3 と変わるので比例ではない。",
          rubric: [
            { label: "表の2組以上の x、y について x×y を計算している", points: 3, keywords: ["1×24", "2×12", "3×8"] },
            { label: "x×y がいつも 24（一定）になることを書いている", points: 2, keywords: ["24", "一定"] },
            { label: "y÷x が一定でない（比例ではない）ことにふれ、反比例と結論している", points: 2, keywords: ["y÷x", "比例ではない", "反比例"] },
          ],
        },
        steps: [
          {
            title: "x×y が一定であることを示す",
            body: "「x が増えると y が減る」だけでは理由になりません。{{x×y＝24 がどの組でも成り立つ}}ことを、数で示します。",
            figure: { ref: { unit: "j-math-1-hirei", section: 3 } },
            trap: "「x が2倍になると y が半分になる」を1か所だけで言って終わる。",
          },
        ],
      },
    ],
  },

  // ================= 3 標準：座標とグラフ =================
  {
    id: "j-math-1-hirei/3",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-hirei"],
    title: "座標とグラフ",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 20,
    minutes: 12,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "text",
        body: "比例 y＝ax のグラフは点 A(−6, 4) を通り、反比例 y＝b/x のグラフは点 B(3, −8) を通る。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "点 P(5, −2) の位置の説明として正しいものを選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "座標は（x 座標, y 座標）の順。x は左右、y は上下。",
        answer: {
          kind: "choice",
          options: ["原点から右へ5、下へ2", "原点から左へ5、上へ2", "原点から右へ2、下へ5", "原点から下へ5、右へ2"],
          correct: 0,
          why: [
            "x 座標 5 は右へ5、y 座標 −2 は下へ2 です。",
            "符号を逆にしています。x 座標が正なら右、y 座標が負なら下です。",
            "x 座標と y 座標を入れかえています。先に書くのが x 座標です。",
            "x 座標と y 座標を入れかえています。上下を表すのは y 座標（−2）です。",
          ],
        },
        steps: [
          {
            title: "（x, y）の順に読む",
            body: "前の数が {{x 座標（左右）}}、後ろの数が {{y 座標（上下）}}。正なら右・上、負なら左・下です。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の比例 y＝ax について、a の値を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "グラフが通る点の座標を y＝ax に代入する。",
        answer: { kind: "num", answerKind: "num", answer: ["-2/3"], labels: ["a ="], equations: ["4=-6a"] },
        steps: [
          {
            title: "点 A の座標を代入する",
            body: "x＝−6、y＝4 を入れると 4＝a×(−6)。a＝4÷(−6)＝{{−2/3}}。",
            figure: { ref: { unit: "j-math-1-hirei", section: 1 } },
            trap: "x と y を逆に入れて a＝−6÷4＝−3/2 にする。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "(2) で求めた比例のグラフの説明として正しいものを選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        dependsOn: "2",
        point: "比例のグラフは原点を通る直線。a が負なら右下がり。",
        answer: {
          kind: "choice",
          options: ["原点を通る右下がりの直線", "原点を通る右上がりの直線", "原点を通らない右下がりの直線", "双曲線"],
          correct: 0,
          why: [
            "比例のグラフは原点を通る直線で、a＝−2/3 は負なので右下がりです。",
            "右上がりになるのは a が正のときです。",
            "比例のグラフは x＝0 のとき y＝0 なので、必ず原点を通ります。",
            "双曲線は反比例のグラフです。",
          ],
        },
        steps: [
          {
            title: "a の符号で向きが決まる",
            body: "y＝ax のグラフは {{原点を通る直線}}。a＜0 なので x が増えると y が減る、右下がりの直線です。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "上の反比例 y＝b/x について、b の値を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "反比例の比例定数 b は x×y で求める。",
        answer: { kind: "num", answerKind: "num", answer: ["-24"], labels: ["b ="], calc: "3*(-8)" },
        steps: [
          {
            title: "b＝x×y",
            body: "点 B(3, −8) を通るので、b＝3×(−8)＝{{−24}}。",
            back: [{ label: "レクチャー「反比例 y＝a/x」", href: `${LEC}#lec-s4` }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "(4) の反比例で、x の変域が 2≦x≦8 のとき、y の変域を求めなさい。\n（□≦y≦□ の形で、左の□に最小値、右の□に最大値を答える）",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "4",
        point: "両端の x＝2、x＝8 の y を求め、小さい方を左に書く。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["-12", "-3"],
          labels: ["最小値", "最大値"],
          equations: ["x=-24/2", "y=-24/8"],
        },
        steps: [
          {
            title: "両端の値を求める",
            body: "x＝2 のとき y＝−24÷2＝−12、x＝8 のとき y＝−24÷8＝−3。",
          },
          {
            title: "小さい方を左に",
            body: "−12 の方が小さいので {{−12≦y≦−3}}。x の小さい方の値を左に置くとは限りません。",
            trap: "−3≦y≦−12 と、大小を逆に書く。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "(2) の比例のグラフ上に点 C があり、C の y 座標は −10 です。C の x 座標を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "2",
        point: "y＝−2/3 x に y＝−10 を代入して、方程式を解く。",
        answer: { kind: "num", answerKind: "num", answer: ["15"], equations: ["-10=-2/3*x"] },
        steps: [
          {
            title: "y を代入して方程式を解く",
            body: "−10＝−2/3 x。両辺に −3/2 をかけて x＝{{15}}。",
            back: [{ label: "計算の段「方程式 ax＝b」", href: "/learn/math/15" }],
          },
        ],
      },
    ],
  },

  // ================= 4 応用：身のまわりの比例・反比例 =================
  {
    id: "j-math-1-hirei/4",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-hirei"],
    title: "比例・反比例の利用",
    lead: "次の問いに答えなさい。",
    style: "word",
    level: 3,
    points: 20,
    minutes: 14,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "text",
        body: "【針金】ある針金は、長さ 5m の重さが 120g で、重さは長さに比例する。\n【水そう】ある水そうに毎分 6L ずつ水を入れると、40分で満水になる。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の【針金】で、長さ x m の重さを y g とします。y を x の式で表しなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "1m あたりの重さが比例定数。120÷5。",
        answer: { kind: "num", answerKind: "expr", answer: ["24x"], labels: ["y ="] },
        steps: [
          {
            title: "比例定数を求める",
            body: "y＝ax に x＝5、y＝120 を入れて a＝120÷5＝24。式は {{y＝24x}}。1m あたり 24g という意味です。",
            figure: { ref: { unit: "j-math-1-hirei", section: 1 } },
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の【針金】で、重さが 360g のときの長さは何 m ですか。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        dependsOn: "1",
        point: "y＝24x に y＝360 を代入する。",
        answer: { kind: "num", answerKind: "num", answer: ["15"], unit: "m", calc: "360/24" },
        steps: [
          {
            title: "y を代入して解く",
            body: "360＝24x より x＝360÷24＝{{15}}。15m です。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の【水そう】に、毎分 x L ずつ水を入れると y 分で満水になるとします。y を x の式で表したものを選びなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "水そうの容積＝毎分の量×時間。容積が一定なので反比例。",
        answer: {
          kind: "choice",
          options: ["y＝240/x", "y＝240x", "y＝40/x", "y＝x/240"],
          correct: 0,
          why: [
            "容積は 6×40＝240L。x×y＝240 なので y＝240/x です。",
            "毎分の量を増やすと時間は短くなるので、比例ではありません。",
            "40 は毎分 6L のときの時間です。比例定数は x×y＝6×40＝240 です。",
            "比例定数を逆数にしています。反比例 y＝a/x の a は x×y です。",
          ],
          mistakeOf: [null, null, null, 1],
        },
        steps: [
          {
            title: "一定の量を見つける",
            body: "満水の量は 6×40＝{{240L}} で変わりません。x×y＝240 なので反比例です。",
            figure: { ref: { unit: "j-math-1-hirei", section: 3 } },
            back: [{ label: "レクチャー「反比例 y＝a/x」", href: `${LEC}#lec-s4` }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "上の【水そう】を 25分で満水にするには、毎分何 L ずつ水を入れればよいですか。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "3",
        point: "x×y＝240 に y＝25 を代入。小数で答えてよい。",
        answer: { kind: "num", answerKind: "num", answer: ["9.6"], unit: "L", calc: "240/25" },
        steps: [
          {
            title: "x×y＝240 を使う",
            body: "x×25＝240 より x＝240÷25＝{{9.6}}。毎分 9.6L です。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt:
          "上の【針金】を束にしたものの重さをはかったら 1.8kg でした。この束の針金の長さは何 m ですか。比例の考え方を使い、式と答えを書きなさい。",
        points: 8,
        skill: "思考・判断・表現",
        level: 3,
        dependsOn: "1",
        point: "単位を g にそろえてから y＝24x に代入する。",
        answer: {
          kind: "written",
          model:
            "1.8kg＝1800g。\n" +
            "重さは長さに比例し、y＝24x と表せるので\n" +
            "1800＝24x\n" +
            "x＝1800÷24＝75\n" +
            "答え　75m",
          rubric: [
            { label: "1.8kg を 1800g に直している", points: 2, keywords: ["1800"] },
            { label: "y＝24x に代入した式（1800＝24x、または 1800÷24）を書いている", points: 3, keywords: ["1800=24x", "1800÷24"] },
            { label: "75m と単位をつけて答えている", points: 3, keywords: ["75m", "75 m"] },
          ],
          autoPart: { kind: "num", answerKind: "num", answer: ["75"], unit: "m", calc: "1800/24" },
        },
        steps: [
          {
            title: "単位をそろえる",
            body: "比例定数 24 は「1m あたり 24g」なので、重さを {{g に直して 1800g}} にします。",
            trap: "1.8 のまま代入して 1.8÷24＝0.075m にする。",
          },
          {
            title: "式に代入して解く",
            body: "1800＝24x より x＝{{75}}。長さは 75m です。",
          },
        ],
      },
    ],
  },
];
