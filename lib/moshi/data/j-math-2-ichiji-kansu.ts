// 中2数学「一次関数」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

export const J_MATH_2_ICHIJI_KANSU: Daimon[] = [
  // ======================= 1. 基本 =======================
  {
    id: "j-math-2-ichiji-kansu/1",
    subject: "math",
    grade: "中2",
    units: ["j-math-2-ichiji-kansu"],
    title: "一次関数（基本）",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 1,
    points: 17,
    minutes: 10,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "次のア〜エのうち、y が x の一次関数であるものをすべて選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "y＝ax＋b の形に表せれば一次関数。比例（b＝0）もふくむ。",
        answer: {
          kind: "choice",
          options: [
            "y ＝ −2x ＋ 5",
            "y ＝ 12/x",
            "y ＝ x/3",
            "1冊120円のノートを x 冊と、80円の封筒を1枚買ったときの代金 y 円",
          ],
          correct: [0, 2, 3],
          why: [
            "a＝−2、b＝5 の y＝ax＋b の形なので一次関数。",
            "反比例の式。x が分母にあり、y＝ax＋b の形にはならない。",
            "y＝1/3 x で、b＝0 の一次関数（比例）。比例は一次関数の特別な場合。",
            "y＝120x＋80 と表せるので一次関数。",
          ],
        },
        steps: [
          {
            title: "y＝ax＋b の形になるか",
            body: "式に表して、{{y＝ax＋b}} の形になれば一次関数です。比例 y＝ax は {{b＝0}} の一次関数なので、ウもふくみます。",
            figure: { ref: { unit: "j-math-2-ichiji-kansu", section: 0 } },
            trap: "y＝x/3 を「b がないから一次関数ではない」と考える。",
            back: [{ label: "レクチャー「y＝ax+b は「はじめの量」と「増える分」」", href: "/learn/lecture/j-math-2-ichiji-kansu#lec-s1" }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "一次関数 y ＝ 5 − 2x の傾きと切片を答えなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "x の係数が傾き、定数項が切片。符号もふくめる。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["-2", "5"],
          labels: ["傾き", "切片"],
          equations: ["x=-2", "y=5"],
        },
        steps: [
          {
            title: "y＝ax＋b の順に書き直す",
            body: "y＝5−2x は {{y＝−2x＋5}} と同じです。x の係数 −2 が傾き、定数項 5 が切片です。",
            figure: { ref: { unit: "j-math-2-ichiji-kansu", section: 2 } },
            trap: "式の前にある 5 を傾きと答えたり、−2 の符号を落として 2 と答えたりする。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "一次関数 y ＝ 3x ＋ 2 で、x の値が 1 から 4 まで増加するときの変化の割合として正しいものを、ア〜エから1つ選びなさい。",
        points: 2,
        skill: "知識・技能",
        level: 1,
        point: "変化の割合＝（y の増加量）÷（x の増加量）＝a。",
        answer: {
          kind: "choice",
          options: ["3", "1/3", "5", "14"],
          correct: 0,
          why: [
            "y は 5 から 14 まで 9 増え、x は 3 増えるので 9÷3＝3。一次関数の変化の割合はいつも a。",
            "x の増加量 ÷ y の増加量（3÷9）と、逆にわっている。",
            "x＝1 のときの y÷x（5÷1）を計算している。それは比例定数の求め方。",
            "x＝4 のときの y の値。変化の割合は増加量どうしの割合。",
          ],
          mistakeOf: [null, 0, 1, null],
        },
        steps: [
          {
            title: "増加量どうしでわる",
            body: "x＝1 で y＝5、x＝4 で y＝14。{{(14−5)÷(4−1)＝3}} で、式の a と同じです。",
            figure: { ref: { unit: "j-math-2-ichiji-kansu", section: 1 } },
            back: [{ label: "レクチャー「変化の割合はいつも a」", href: "/learn/lecture/j-math-2-ichiji-kansu#lec-s2" }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "一次関数 y ＝ −4x ＋ 1 で、x の値が −1 から 3 まで増加するときの y の増加量を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "y の増加量＝変化の割合×x の増加量。",
        answer: { kind: "num", answerKind: "num", answer: ["-16"], calc: "-4*(3-(-1))" },
        steps: [
          {
            title: "x の増加量を出す",
            body: "x は −1 から 3 まで、3−(−1)＝{{4}} 増えます。",
            trap: "3−1＝2 と計算してしまう。",
          },
          {
            title: "変化の割合をかける",
            body: "y の増加量＝−4×4＝{{−16}}。x＝−1 で y＝5、x＝3 で y＝−11 なので、−11−5＝−16 と確かめられます。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "傾きが 3 で、点 (2, 1) を通る直線の式を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "y＝3x＋b に点の座標を代入して b を求める。",
        answer: { kind: "num", answerKind: "expr", answer: ["3x-5"], labels: ["y ="] },
        steps: [
          {
            title: "1点を代入して b を求める",
            body: "y＝3x＋b に x＝2、y＝1 を代入して 1＝6＋b、{{b＝−5}}。式は y＝3x−5 です。",
            figure: { ref: { unit: "j-math-2-ichiji-kansu", section: 3 } },
            trap: "x と y を入れかえて 2＝3×1＋b としてしまう。",
            back: [{ label: "計算の段「傾きと1点から式を求める」", href: "/learn/math/34" }],
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "一次関数 y ＝ −1/2 x ＋ 4 のグラフについて正しいものを、ア〜エから1つ選びなさい。",
        points: 2,
        skill: "知識・技能",
        level: 2,
        point: "傾きが負なら右下がり。点を通るかは代入して確かめる。",
        answer: {
          kind: "choice",
          options: ["右上がりの直線である。", "切片は −1/2 である。", "点 (2, 3) を通る。", "x が 2 増えると、y は 1 増える。"],
          correct: 2,
          why: [
            "傾きが −1/2 で負なので、右下がりの直線。",
            "−1/2 は傾き。切片は定数項の 4。",
            "x＝2 を代入すると y＝−1＋4＝3 なので、点 (2, 3) を通る。",
            "y の増加量は −1/2×2＝−1 なので、1 減る。",
          ],
          mistakeOf: [null, 2, null, null],
        },
        steps: [
          {
            title: "傾きと切片を読み、点を代入する",
            body: "傾き −1/2（{{右下がり}}）、切片 4。x＝2 を代入すると y＝3 なので、点 (2, 3) を通ります。",
            back: [{ label: "レクチャー「グラフ：傾きは a、切片は b」", href: "/learn/lecture/j-math-2-ichiji-kansu#lec-s3" }],
          },
        ],
      },
    ],
  },

  // ======================= 2. 直線の式・交点 =======================
  {
    id: "j-math-2-ichiji-kansu/2",
    subject: "math",
    grade: "中2",
    units: ["j-math-2-ichiji-kansu"],
    title: "直線の式",
    lead: "次の問いに答えなさい。",
    style: "calc",
    level: 2,
    points: 24,
    minutes: 13,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "2点 (1, 4)、(3, −2) を通る直線の式を求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "2点から傾きを出し、1点を代入して切片。",
        answer: { kind: "num", answerKind: "expr", answer: ["-3x+7"], labels: ["y ="] },
        steps: [
          {
            title: "傾きを求める",
            body: "傾き＝(−2−4)÷(3−1)＝{{−3}}。y の増加量を x の増加量でわります。",
            figure: { ref: { unit: "j-math-2-ichiji-kansu", section: 3 } },
            trap: "(3−1)÷(−2−4) と逆にわって −1/3 にする。",
          },
          {
            title: "1点を代入して切片を求める",
            body: "y＝−3x＋b に (1, 4) を代入して 4＝−3＋b、{{b＝7}}。(3, −2) でも −9＋7＝−2 で合います。",
            back: [{ label: "計算の段「2点を通る直線の式」", href: "/learn/math/35" }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "切片が −2 で、点 (4, 4) を通る直線の式を求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "y＝ax−2 に点を代入して a を求める。",
        answer: { kind: "num", answerKind: "expr", answer: ["3/2x-2"], labels: ["y ="] },
        steps: [
          {
            title: "切片がわかっているので a を求める",
            body: "y＝ax−2 に x＝4、y＝4 を代入して 4＝4a−2、4a＝6、{{a＝3/2}}。式は y＝3/2x−2 です。",
            trap: "4a＝6 を a＝2/3 と逆にしてしまう。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "直線 y ＝ 2x ＋ 1 に平行で、点 (−1, 3) を通る直線の式を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "平行な直線は傾きが等しい。",
        answer: { kind: "num", answerKind: "expr", answer: ["2x+5"], labels: ["y ="] },
        steps: [
          {
            title: "傾きを決める",
            body: "平行な2直線は{{傾きが等しい}}ので、求める直線の傾きは 2。y＝2x＋b とおけます。",
            trap: "切片の1もそのまま使って y＝2x＋1 と答える。それは同じ直線。",
          },
          {
            title: "点を代入する",
            body: "3＝2×(−1)＋b より {{b＝5}}。式は y＝2x＋5 です。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "y は x の一次関数で、x ＝ 2 のとき y ＝ 1、x ＝ 6 のとき y ＝ −1 です。この一次関数の式を求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "「x＝2 のとき y＝1」は点 (2, 1) と同じ。",
        answer: { kind: "num", answerKind: "expr", answer: ["-1/2x+2"], labels: ["y ="] },
        steps: [
          {
            title: "変化の割合を求める",
            body: "(−1−1)÷(6−2)＝−2/4＝{{−1/2}}。これが a です。約分を忘れずに。",
          },
          {
            title: "b を求める",
            body: "1＝−1/2×2＋b より 1＝−1＋b、{{b＝2}}。式は y＝−1/2x＋2 です。",
            back: [{ label: "レクチャー「式は「傾き」と「1点」で決まる」", href: "/learn/lecture/j-math-2-ichiji-kansu#lec-s4" }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "2直線 y ＝ x ＋ 2 と y ＝ −2x ＋ 8 の交点の座標を求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "交点の座標は、2つの式を連立方程式として解いた解。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["2", "4"],
          labels: ["x 座標", "y 座標"],
          equations: ["y=x+2", "y=-2x+8"],
        },
        steps: [
          {
            title: "連立方程式として解く",
            body: "交点では両方の式が成り立つので、{{x＋2＝−2x＋8}}。3x＝6、x＝2、y＝2＋2＝4。交点は (2, 4) です。",
            trap: "x＝2 だけで止めて、y 座標を求め忘れる。",
            back: [{ label: "レクチャー「2直線の交点は、連立方程式の解」", href: "/learn/lecture/j-math-2-ichiji-kansu#lec-s5" }],
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "3点 (−1, −1)、(2, 5)、(4, k) が一直線上にあるとき、k の値を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "2点で直線の式を決め、3つめの点の x を代入する。",
        answer: { kind: "num", answerKind: "num", answer: ["9"], labels: ["k ="], equations: ["k-5=2*(4-2)"] },
        steps: [
          {
            title: "2点を通る直線の式を求める",
            body: "傾き＝(5−(−1))÷(2−(−1))＝6÷3＝2。5＝2×2＋b より b＝1 で、{{y＝2x＋1}}。",
          },
          {
            title: "3つめの点を代入する",
            body: "(4, k) もこの直線上にあるので、k＝2×4＋1＝{{9}}。",
            trap: "x と y を入れかえて 4＝2k＋1 としてしまう。",
          },
        ],
      },
    ],
  },

  // ======================= 3. 資料（表）から読む =======================
  {
    id: "j-math-2-ichiji-kansu/3",
    subject: "math",
    grade: "中2",
    units: ["j-math-2-ichiji-kansu"],
    title: "一次関数と表",
    lead: "長さ 24 cm のろうそくに火をつけ、火をつけてから x 分後のろうそくの長さを y cm として、下の表にまとめました。ろうそくは一定の割合で短くなるものとして、次の問いに答えなさい。",
    style: "data",
    level: 2,
    points: 16,
    minutes: 10,
    review: { status: "draft" },
    material: [
      {
        kind: "table",
        caption: "火をつけてからの時間とろうそくの長さ",
        head: ["x（分）", "0", "2", "4", "6"],
        rows: [["y（cm）", "24", "21", "18", "15"]],
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の表から、y が x の一次関数であるといえる理由として正しいものを、ア〜エから1つ選びなさい。",
        points: 2,
        skill: "思考・判断・表現",
        level: 2,
        point: "x が一定ずつ増えるとき、y も一定ずつ増減するか。",
        answer: {
          kind: "choice",
          options: [
            "x が 2 増えるごとに、y が 3 ずつ減っている（変化の割合が一定）。",
            "x が増えると、y が減っている。",
            "x と y の積が一定になっている。",
            "y が x に比例している。",
          ],
          correct: 0,
          why: [
            "変化の割合がどこでも −3/2 で一定。これが一次関数の特徴。",
            "減るだけなら、反比例など一次関数でない場合もある。減り方が一定であることが必要。",
            "積が一定なのは反比例。0×24＝0、2×21＝42 で積も一定ではない。",
            "x＝0 のとき y＝24 で 0 ではないので、比例ではない。",
          ],
        },
        steps: [
          {
            title: "増え方・減り方が一定か見る",
            body: "x が2増えるごとに y は {{3ずつ減って}}います。変化の割合が一定なので一次関数です。",
            figure: { ref: { unit: "j-math-2-ichiji-kansu", section: 1 } },
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の表から、変化の割合を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "減るときの変化の割合は負の数。",
        answer: { kind: "num", answerKind: "num", answer: ["-3/2"], calc: "(15-24)/(6-0)" },
        steps: [
          {
            title: "増加量どうしでわる",
            body: "x が 0 から 6 まで増えると y は 24 から 15 へ、9 減ります。(15−24)÷(6−0)＝{{−3/2}}。",
            trap: "減っているのに 3/2 と正の数で答える。",
            back: [{ label: "レクチャー「変化の割合はいつも a」", href: "/learn/lecture/j-math-2-ichiji-kansu#lec-s2" }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "y を x の式で表しなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        dependsOn: "2",
        point: "傾きは変化の割合、切片は x＝0 のときの y。",
        answer: { kind: "num", answerKind: "expr", answer: ["-3/2x+24"], labels: ["y ="] },
        steps: [
          {
            title: "はじめの量と減り方",
            body: "x＝0 のとき y＝24 なので{{切片は24}}、傾きは (2) の −3/2。式は y＝−3/2x＋24 です。",
            figure: { ref: { unit: "j-math-2-ichiji-kansu", section: 0 } },
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "ろうそくの長さが 9 cm になるのは、火をつけてから何分後ですか。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "3",
        point: "y に 9 を代入して x の方程式を解く。",
        answer: { kind: "num", answerKind: "num", answer: ["10"], unit: "分後", equations: ["-3/2x+24=9"] },
        steps: [
          {
            title: "y＝9 を代入する",
            body: "9＝−3/2x＋24 より 3/2x＝15、{{x＝10}}。10分後です。",
            trap: "x に 9 を代入して y を求めてしまう。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "ろうそくが燃えつきるのは、火をつけてから何分後ですか。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "3",
        point: "燃えつきる＝長さ y が 0。",
        answer: { kind: "num", answerKind: "num", answer: ["16"], unit: "分後", equations: ["-3/2x+24=0"] },
        steps: [
          {
            title: "y＝0 を代入する",
            body: "0＝−3/2x＋24 より 3/2x＝24、{{x＝16}}。2分で3cm ずつ短くなるので、24cm は 16分でなくなります。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "火をつけてから燃えつきるまでの x の変域として正しいものを、ア〜エから1つ選びなさい。",
        points: 2,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "5",
        point: "x の変域は、はじめ（0分）から燃えつきる時間まで。",
        answer: {
          kind: "choice",
          options: ["0 ≦ x ≦ 16", "0 ≦ x ≦ 24", "0 ≦ x ≦ 6", "x ≧ 0"],
          correct: 0,
          why: [
            "火をつけた 0 分から、燃えつきる 16 分まで。",
            "24 は y（長さ）の最大値。x の変域と y の変域を取りちがえている。",
            "表にある x の範囲だけを見ている。燃えつきるのは16分後。",
            "16分より後は長さがないので、式 y＝−3/2x＋24 は使えない。",
          ],
        },
        steps: [
          {
            title: "式が使える範囲を考える",
            body: "x は 0 分から燃えつきる {{16分}}まで。変域は 0≦x≦16 です（このとき y の変域は 0≦y≦24）。",
          },
        ],
      },
    ],
  },

  // ======================= 4. 応用（2人の移動・図形） =======================
  {
    id: "j-math-2-ichiji-kansu/4",
    subject: "math",
    grade: "中2",
    units: ["j-math-2-ichiji-kansu", "j-math-2-renritsu"],
    title: "一次関数の利用",
    lead: "次の問いに答えなさい。",
    style: "synthesis",
    level: 3,
    points: 20,
    minutes: 14,
    review: { status: "draft" },
    material: [
      {
        kind: "text",
        body:
          "(1)〜(4)：弟は家を出て、家から 2700 m はなれた図書館まで分速 60 m で歩きました。兄は弟が家を出てから 10 分後に家を出て、同じ道を分速 180 m の自転車で図書館へ向かいました。弟が家を出てから x 分後に、家から y m の地点にいるとします。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "資料の兄について、x と y の関係を表す式として正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "兄が進んだ時間は x−10 分。",
        answer: {
          kind: "choice",
          options: ["y ＝ 180x − 1800", "y ＝ 180x − 10", "y ＝ 180x + 1800", "y ＝ 180(x + 10)"],
          correct: 0,
          why: [
            "兄が進んだ時間は (x−10) 分なので y＝180(x−10)＝180x−1800。",
            "時間の 10 分を、そのまま道のり y からひいている。ひくのは x から。",
            "10分早く出発したときの式。兄は10分おくれて出発している。",
            "x＋10 は弟より10分長く進んだことになる。おくれて出たので x−10。",
          ],
        },
        steps: [
          {
            title: "兄が進んだ時間を考える",
            body: "弟が出て x 分後、兄はまだ {{x−10}} 分しか進んでいません。y＝180(x−10)＝{{180x−1800}}。x＝10 のとき y＝0 で、兄の出発と合います。",
            trap: "y＝180x としてしまい、10分おくれを考えない。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "兄が弟に追いつくのは、弟が家を出てから何分後で、家から何 m の地点ですか。途中の式も書きなさい。",
        points: 7,
        skill: "思考・判断・表現",
        level: 3,
        dependsOn: "1",
        point: "追いつく＝同じ時刻に同じ地点。2つの式の交点。",
        answer: {
          kind: "written",
          model:
            "弟の式は y ＝ 60x、兄の式は y ＝ 180x − 1800\n" +
            "追いつくとき y が等しいので\n" +
            "60x ＝ 180x − 1800\n" +
            "−120x ＝ −1800\n" +
            "x ＝ 15\n" +
            "y ＝ 60 × 15 ＝ 900\n" +
            "答え　15分後、家から 900 m の地点",
          rubric: [
            { label: "弟の式 y＝60x を書いている", points: 1, keywords: ["y=60x"] },
            { label: "2つの式を連立させ、60x＝180x−1800 をつくっている", points: 2, keywords: ["60x=180x-1800"] },
            { label: "x＝15 を正しく求めている", points: 2, keywords: ["x=15"] },
            { label: "15分後・900m を、単位をつけて両方答えている", points: 2, keywords: ["15分", "900"] },
          ],
          autoPart: {
            kind: "num",
            answerKind: "pair",
            answer: ["15", "900"],
            labels: ["時間（分後）", "道のり（m）"],
            equations: ["y=60x", "y=180x-1800"],
          },
        },
        steps: [
          {
            title: "交点＝連立方程式の解",
            body: "追いつくのは2人の {{x も y も同じ}}とき、つまり2直線の交点です。y＝60x と y＝180x−1800 を連立方程式として解きます。",
            back: [{ label: "レクチャー「2直線の交点は、連立方程式の解」", href: "/learn/lecture/j-math-2-ichiji-kansu#lec-s5" }],
          },
          {
            title: "代入法で解く",
            body: "60x＝180x−1800 より 120x＝1800、{{x＝15}}。y＝60×15＝900。兄も 180×5＝900 m 進んでいて合います。",
            trap: "x＝15 を「兄が出発してから15分後」と読みちがえる。x は弟が出てからの時間。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "兄が図書館に着くのは、弟が家を出てから何分後ですか。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "1",
        point: "兄の式に y＝2700 を代入する。",
        answer: { kind: "num", answerKind: "num", answer: ["25"], unit: "分後", equations: ["180x-1800=2700"] },
        steps: [
          {
            title: "y＝2700 を代入する",
            body: "2700＝180x−1800 より 180x＝4500、{{x＝25}}。兄が走った時間は 2700÷180＝15分で、10＋15＝25 と考えてもよい。",
            trap: "2700÷180＝15 だけで答え、出発の10分おくれをたし忘れる。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "兄が図書館に着いたとき、弟は図書館まであと何 m のところにいますか。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "3",
        point: "弟の式に x＝25 を代入し、2700 からひく。",
        answer: { kind: "num", answerKind: "num", answer: ["1200"], unit: "m", calc: "2700-60*25" },
        steps: [
          {
            title: "そのときの弟の位置",
            body: "x＝25 のとき弟は y＝60×25＝1500 m の地点。図書館まで 2700−1500＝{{1200}} m です。",
            trap: "1500 m と、家からの道のりを答えてしまう。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt:
          "（ここからは別の問題）原点を O とします。直線 y ＝ −x ＋ 6 と直線 y ＝ 2x の交点を P、直線 y ＝ −x ＋ 6 と x 軸との交点を A とするとき、三角形 OAP の面積を求めなさい。ただし、座標の1目もりを 1 cm とします。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "底辺 OA、高さは P の y 座標。",
        answer: { kind: "num", answerKind: "num", answer: ["12"], unit: "cm²", calc: "6*4/2" },
        steps: [
          {
            title: "交点 P と A を求める",
            body: "−x＋6＝2x より x＝2、y＝4 で {{P(2, 4)}}。x 軸との交点は y＝0 として 0＝−x＋6、{{A(6, 0)}}。",
          },
          {
            title: "底辺と高さで面積",
            body: "底辺 OA＝6、高さは P の y 座標の 4。面積は 6×4÷2＝{{12}} cm²。",
            trap: "高さに P の x 座標 2 を使ってしまう。高さは x 軸からの距離＝y 座標。",
          },
        ],
      },
    ],
  },
];
