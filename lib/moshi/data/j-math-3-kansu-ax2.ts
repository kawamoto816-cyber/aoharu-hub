// 中3数学「関数 y=ax²」の大問。答えは python (sympy) で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

const LEC = "/learn/lecture/j-math-3-kansu-ax2";

export const J_MATH_3_KANSU_AX2: Daimon[] = [
  // ======================= 1 式とグラフの性質（基本） =======================
  {
    id: "j-math-3-kansu-ax2/1",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-kansu-ax2"],
    title: "関数 y＝ax² の式とグラフ",
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
        prompt: "y は x の2乗に比例し、x = 3 のとき y = −18 です。y を x の式で表しなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "y＝ax² に x＝3、y＝−18 を代入して a を出す。",
        answer: { kind: "num", answerKind: "expr", answer: ["-2x^2"], labels: ["y ="] },
        steps: [
          {
            title: "代入して a を求める",
            body: "−18＝a×3² より 9a＝−18、{{a＝−2}}。式は y＝−2x²。",
            figure: { ref: { unit: "j-math-3-kansu-ax2", section: 1 } },
            trap: "3² を 6 として a＝−3 にする。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "(1) の関数で、x = −4 のときの y の値を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        dependsOn: "1",
        point: "(−4)²＝16。2乗が先、それから −2 をかける。",
        answer: { kind: "num", answerKind: "num", answer: ["-32"], labels: ["y ="], calc: "-2*(-4)^2" },
        steps: [
          {
            title: "かっこをつけて代入",
            body: "y＝−2×{{(−4)²}}＝−2×16＝−32。",
            trap: "−2 と −4 を先にかけてから2乗して 64 にする。2乗が先。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "次のア〜エのうち、y が x の2乗に比例するものを1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "式が y＝(定数)×x² になるものを探す。",
        answer: {
          kind: "choice",
          options: [
            "1辺が x cm の正方形の周の長さ y cm",
            "半径が x cm の円の面積 y cm²",
            "底辺が x cm、高さが 6 cm の三角形の面積 y cm²",
            "時速 x km で 2 時間進んだ道のり y km",
          ],
          correct: 1,
          why: [
            "y＝4x で、y は x に比例する（2乗ではない）。",
            "y＝πx² で、比例定数 π の y＝ax² の形。",
            "y＝3x で、y は x に比例する。",
            "y＝2x で、y は x に比例する。",
          ],
        },
        steps: [
          {
            title: "式に表してみる",
            body: "円の面積は 半径×半径×π なので {{y＝πx²}}。ほかはどれも y＝ax の比例です。",
            back: [{ label: "レクチャー「y は x の2乗に比例する」", href: `${LEC}#lec-s1` }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "関数 y = −3x² のグラフについて、正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "a＜0 なら下に開く放物線。",
        answer: {
          kind: "choice",
          options: [
            "下に開いた放物線である。",
            "x > 0 の範囲では、x が増えると y も増える。",
            "y = 3x² のグラフと、y 軸について対称である。",
            "点 (−1, 3) を通る。",
          ],
          correct: 0,
          why: [
            "a＝−3＜0 なので下に開く。正しい。",
            "下に開くので、x＞0 では x が増えると y は減る。",
            "y＝3x² とは x 軸について対称。y 軸について対称なのは、それぞれのグラフ自身。",
            "x＝−1 のとき y＝−3×1＝−3。(−1, 3) は通らない。",
          ],
        },
        steps: [
          {
            title: "a の符号で形を決める",
            body: "{{a＜0}} なので下に開き、原点が最大の点です。x＞0 では右下がりになります。",
            figure: { ref: { unit: "j-math-3-kansu-ax2", section: 2 } },
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "関数 y = ax² で、x の値が 3 倍になると、y の値は何倍になりますか。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "y は x² に比例。3² 倍。",
        answer: { kind: "num", answerKind: "num", answer: ["9"], unit: "倍", calc: "3^2" },
        steps: [
          {
            title: "x² が何倍になるか",
            body: "x が3倍なら x² は {{3²＝9倍}}。y は x² に比例するので9倍です。",
            figure: { ref: { unit: "j-math-3-kansu-ax2", section: 0 } },
            trap: "比例と同じく3倍と答える。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "次の4つの関数のグラフを、開き方が小さい（細い）順に並べなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "a の絶対値が大きいほど、開き方は小さい。",
        answer: { kind: "order", tokens: ["y = −4x²", "y = 2x²", "y = x²", "y = (1/3)x²"] },
        steps: [
          {
            title: "a の絶対値でくらべる",
            body: "絶対値は 4、2、1、1/3。{{絶対値が大きいほど細い}}ので、符号に関係なく y＝−4x² がいちばん細い。",
            trap: "−4 を小さい数と考えて最後にする。開き方は絶対値で決まる。",
            back: [{ label: "レクチャー「グラフは原点を通る放物線」", href: `${LEC}#lec-s3` }],
          },
        ],
      },
    ],
  },

  // ======================= 2 変域と変化の割合（標準） =======================
  {
    id: "j-math-3-kansu-ax2/2",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-kansu-ax2"],
    title: "変域と変化の割合",
    lead: "次の問いに答えなさい。",
    style: "calc",
    level: 2,
    points: 22,
    minutes: 12,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "関数 y = 2x² で、x の変域が −3 ≦ x ≦ 1 のとき、y の変域を求めなさい。\n（□ ≦ y ≦ □ の、左と右の数を答える）",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "x＝0 をふくむので、最小値は0。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["0", "18"],
          labels: ["最小値", "最大値"],
          // x に最小値、y に最大値 (x＝0 のときと x＝−3 のとき)
          equations: ["x=2*0^2", "y=2*(-3)^2"],
        },
        steps: [
          {
            title: "グラフで最小と最大を見る",
            body: "変域に {{x＝0 がふくまれる}}ので、最小値は y＝0。端は x＝−3 で y＝18、x＝1 で y＝2。",
            figure: { ref: { unit: "j-math-3-kansu-ax2", section: 3 } },
            trap: "両端だけ代入して 2≦y≦18 とする。",
          },
          {
            title: "答え",
            body: "0≦y≦18。絶対値が大きい x＝−3 の方が y は大きい。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "関数 y = −x² で、x の変域が −2 ≦ x ≦ 3 のとき、y の変域を求めなさい。\n（□ ≦ y ≦ □ の、左と右の数を答える）",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "下に開くので、x＝0 で最大値0。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["-9", "0"],
          labels: ["最小値", "最大値"],
          equations: ["x=-(3^2)", "y=-(0^2)"],
        },
        steps: [
          {
            title: "a＜0 なら原点が最大",
            body: "y＝−x² は下に開くので、x＝0 で {{最大値 0}}。原点から遠い x＝3 で最小値 −9。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "関数 y = (1/2)x² で、x の値が 2 から 6 まで増加するときの変化の割合を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "y の増加量 ÷ x の増加量。",
        answer: { kind: "num", answerKind: "num", answer: ["4"], calc: "(1/2*6^2-1/2*2^2)/(6-2)" },
        steps: [
          {
            title: "増加量を出してわる",
            body: "x＝2 で y＝2、x＝6 で y＝18。{{(18−2)÷(6−2)＝4}}。",
            figure: { ref: { unit: "j-math-3-kansu-ax2", section: 4 } },
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "関数 y = ax² で、x の値が 1 から 4 まで増加するときの変化の割合が −15 でした。a の値を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "y の増加量は 16a−a＝15a。",
        answer: { kind: "num", answerKind: "num", answer: ["-3"], labels: ["a ="], equations: ["(16a-a)/(4-1)=-15"] },
        steps: [
          {
            title: "a のまま増加量を表す",
            body: "x＝1 で y＝a、x＝4 で y＝16a。変化の割合は {{15a÷3＝5a}}。",
          },
          {
            title: "方程式を解く",
            body: "5a＝−15 より a＝−3。a(p＋q)＝a×(1＋4) からも同じ式になります。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "関数 y = ax² で、x の変域が −2 ≦ x ≦ 4 のとき、y の変域は 0 ≦ y ≦ 8 でした。a の値を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "y が正なので a＞0。最大は絶対値の大きい x＝4。",
        answer: { kind: "num", answerKind: "num", answer: ["1/2"], labels: ["a ="], equations: ["a*4^2=8"] },
        steps: [
          {
            title: "どの x で最大になるか",
            body: "y≧0 なので上に開く（a＞0）。原点から遠い {{x＝4 で y＝8}} になります。",
            trap: "x＝−2 で y＝8 として a＝2 にする。",
          },
          {
            title: "代入して解く",
            body: "8＝a×16 より a＝1/2。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "関数 y = 3x² の変化の割合について、正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "y＝ax² の変化の割合は一定ではない。",
        answer: {
          kind: "choice",
          options: [
            "変化の割合はいつも 3 である。",
            "変化の割合はいつも 6 である。",
            "x の値がどこからどこまで増加するかで、変化の割合は変わる。",
            "変化の割合は、いつも負の数になる。",
          ],
          correct: 2,
          why: [
            "3 は比例定数。一次関数の傾きのように一定にはならない。",
            "x が 0 から 1 のときは 3、1 から 2 のときは 9 のように変わる。",
            "a(p＋q) の形で、p、q によって値が変わる。正しい。",
            "x＞0 の範囲で増加するときは正になる。",
          ],
          mistakeOf: [1, 1, null, null],
        },
        steps: [
          {
            title: "具体的な値で確かめる",
            body: "x が 0→1 なら (3−0)÷1＝3、1→2 なら (12−3)÷1＝9。{{区間によって変わる}}ことがわかります。",
            back: [{ label: "レクチャー「変化の割合は一定ではない」", href: `${LEC}#lec-s5` }],
          },
        ],
      },
    ],
  },

  // ======================= 3 表から関数を読む（資料） =======================
  {
    id: "j-math-3-kansu-ax2/3",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-kansu-ax2"],
    title: "斜面を転がる球",
    lead: "下の表は、ある斜面で球を静かに転がしたときの、転がり始めてからの時間 x 秒と、転がった距離 y m の関係を表したものです。次の問いに答えなさい。",
    style: "data",
    level: 2,
    points: 20,
    minutes: 12,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "table",
        caption: "転がり始めてからの時間と転がった距離（問題のために作った数値）",
        head: ["時間 x（秒）", "0", "1", "2", "3", "4", "5"],
        rows: [["距離 y（m）", "0", "1.5", "6", "13.5", "24", "ア"]],
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の表で、y は x の2乗に比例しています。y を x の式で表しなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "x＝2、y＝6 などを y＝ax² に代入。",
        answer: { kind: "num", answerKind: "expr", answer: ["3/2x^2"], labels: ["y ="] },
        steps: [
          {
            title: "1組の値を代入する",
            body: "x＝2、y＝6 を入れると 6＝4a、{{a＝3/2}}。x＝4 でも 24＝16a で同じになります。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の表の ア にあてはまる数を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        dependsOn: "1",
        point: "x＝5 を代入。または x＝1 の値の 5²倍。",
        answer: { kind: "num", answerKind: "num", answer: ["37.5"], calc: "3/2*5^2" },
        steps: [
          {
            title: "x＝5 を代入",
            body: "y＝(3/2)×25＝{{37.5}}。x＝1 の 1.5 m の 25倍とも考えられます。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の表で、転がり始めて 2 秒後から 4 秒後までの、球の平均の速さは秒速何 m ですか。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "平均の速さ＝変化の割合＝距離の増加÷時間の増加。",
        answer: { kind: "num", answerKind: "num", answer: ["9"], labels: ["秒速"], unit: "m", calc: "(24-6)/(4-2)" },
        steps: [
          {
            title: "変化の割合として求める",
            body: "表から 2秒で 6 m、4秒で 24 m。{{(24−6)÷(4−2)＝9}} なので秒速 9 m。",
            back: [{ label: "レクチャー「変化の割合は一定ではない」", href: `${LEC}#lec-s5` }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "斜面が十分に長いとき、球が 54 m 転がるのは、転がり始めてから何秒後ですか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "1",
        point: "(3/2)x²＝54。時間は正なので x＞0 の解。",
        answer: { kind: "num", answerKind: "num", answer: ["6"], unit: "秒後", equations: ["3/2*x^2=54"] },
        steps: [
          {
            title: "y＝54 を代入して解く",
            body: "(3/2)x²＝54、x²＝36、x＝±6。時間は正なので {{6秒後}}。",
            trap: "−6 も答えに入れる。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "上の表をもとに、「1〜2秒」と「3〜4秒」の平均の速さをくらべ、球の速さがどのように変わるかを説明しなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "それぞれの変化の割合を計算して、くらべる。",
        answer: {
          kind: "written",
          model:
            "1〜2秒の平均の速さは (6 − 1.5) ÷ (2 − 1) = 4.5 より秒速 4.5 m。\n" +
            "3〜4秒の平均の速さは (24 − 13.5) ÷ (4 − 3) = 10.5 より秒速 10.5 m。\n" +
            "あとの区間の方が平均の速さが大きいので、球は時間がたつほど速くなっている。",
          rubric: [
            { label: "1〜2秒の平均の速さを 4.5 m/秒 と求めている", points: 2, keywords: ["4.5"] },
            { label: "3〜4秒の平均の速さを 10.5 m/秒 と求めている", points: 2, keywords: ["10.5"] },
            { label: "時間がたつほど速くなる（一定ではない）と結論している", points: 2, keywords: ["速くなる"] },
          ],
        },
        steps: [
          {
            title: "2つの区間の変化の割合",
            body: "1〜2秒：4.5÷1＝4.5、3〜4秒：10.5÷1＝10.5。{{同じ1秒でも、あとの方が多く進む}}。",
          },
          {
            title: "一次関数とのちがい",
            body: "一次関数なら変化の割合は一定ですが、y＝ax² では区間で変わります。だから速さは一定ではなく、だんだん速くなります。",
          },
        ],
      },
    ],
  },

  // ======================= 4 放物線と直線（応用） =======================
  {
    id: "j-math-3-kansu-ax2/4",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-kansu-ax2"],
    title: "放物線と直線",
    lead: "次の問いに答えなさい。",
    style: "synthesis",
    level: 3,
    points: 20,
    minutes: 14,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "text",
        body: "関数 y = x² のグラフ上に、2点 A、B がある。点 A の x 座標は −2、点 B の x 座標は 4 である。O は原点とする。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の点 A の y 座標を求めなさい。",
        points: 2,
        skill: "知識・技能",
        level: 1,
        point: "x＝−2 を y＝x² に代入。",
        answer: { kind: "num", answerKind: "num", answer: ["4"], calc: "(-2)^2" },
        steps: [
          {
            title: "代入する",
            body: "y＝(−2)²＝{{4}}。A(−2, 4)、同じように B(4, 16)。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の2点 A、B を通る直線の式を求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "傾き＝(16−4)÷(4−(−2))。",
        answer: { kind: "num", answerKind: "expr", answer: ["2x+8"], labels: ["y ="] },
        steps: [
          {
            title: "傾きを求める",
            body: "A(−2, 4)、B(4, 16) より、傾きは {{12÷6＝2}}。",
            back: [{ label: "計算の段「2点を通る直線の式」", href: "/learn/math/35" }],
          },
          {
            title: "切片を求める",
            body: "y＝2x＋b に A を入れて 4＝−4＋b、b＝8。式は {{y＝2x＋8}}。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "△OAB の面積を求めなさい。ただし、座標の1目もりを 1 cm とします。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        dependsOn: "2",
        point: "y 軸で2つの三角形に分ける。底辺は切片の 8。",
        answer: { kind: "num", answerKind: "num", answer: ["24"], unit: "cm²", calc: "1/2*8*(2+4)" },
        steps: [
          {
            title: "y 軸で分ける",
            body: "直線 AB と y 軸の交点を C(0, 8) とすると、△OAB＝△OAC＋△OBC。どちらも {{底辺 OC＝8}} と見ます。",
          },
          {
            title: "高さは x 座標の絶対値",
            body: "△OAC の高さ 2、△OBC の高さ 4。8×2÷2＋8×4÷2＝8＋16＝{{24}}。",
            trap: "高さを y 座標の 4 と 16 にする。底辺 OC は y 軸上なので、高さは横の距離。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "原点 O を通り、△OAB の面積を2等分する直線の式を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "辺 AB の中点を通れば、底辺が半分ずつになる。",
        answer: { kind: "num", answerKind: "expr", answer: ["10x"], labels: ["y ="] },
        steps: [
          {
            title: "AB の中点を求める",
            body: "O から AB の中点 M に引けば、△OAM と △OBM は底辺が等しく高さが共通なので、面積が等しくなります。M は {{((−2＋4)/2, (4＋16)/2)＝(1, 10)}}。",
          },
          {
            title: "原点と M を通る直線",
            body: "原点を通るので y＝ax。(1, 10) を入れて a＝10、{{y＝10x}}。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "関数 y = x² で、x の値が −2 から 4 まで増加するときの変化の割合は、(2) の直線の傾きと等しくなります。その理由を説明しなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "どちらも A、B の座標から同じ計算になる。",
        answer: {
          kind: "written",
          model:
            "x が −2 から 4 まで増加するときの変化の割合は\n" +
            "(16 − 4) ÷ (4 − (−2)) = 12 ÷ 6 = 2\n" +
            "これは、グラフ上の2点 A(−2, 4)、B(4, 16) について (y の増加量) ÷ (x の増加量) を計算したものである。\n" +
            "直線 AB の傾きも、A から B への (y の増加量) ÷ (x の増加量) で求めるので、同じ計算になり等しくなる。",
          rubric: [
            { label: "変化の割合を (16−4)÷(4−(−2))＝2 と計算している", points: 2, keywords: ["12÷6", "2"] },
            { label: "その計算が、グラフ上の2点 A、B の座標を使っていることを書いている", points: 2, keywords: ["A(−2, 4)", "B(4, 16)"] },
            { label: "直線 AB の傾きも同じ2点の (y の増加量)÷(x の増加量) なので等しいと結論している", points: 2, keywords: ["傾き", "同じ"] },
          ],
        },
        steps: [
          {
            title: "変化の割合の意味",
            body: "変化の割合は {{y の増加量÷x の増加量}}。x＝−2、4 のときの点は、グラフ上の A と B です。",
            back: [{ label: "レクチャー「変化の割合は一定ではない」", href: `${LEC}#lec-s5` }],
          },
          {
            title: "直線の傾きと同じ計算",
            body: "A と B を結ぶ直線の傾きも、同じ2点から (y の増加量)÷(x の増加量) で求めます。だから両方とも 2 です。",
          },
        ],
      },
    ],
  },
];
