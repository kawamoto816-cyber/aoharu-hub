// 中3数学「三平方の定理」の大問。答えは python (sympy) で検算し、scripts/check-moshi.ts でも確かめる。
// 図をかかせる問題は作らない。図形の条件は文章で書き、答えは選択・数値（√ をふくむ）・記述で答える。
import type { Daimon } from "../types";

const L = "/learn/lecture/j-math-3-sanheiho";
const ASQRTB = { label: "計算の段「a√b の形にする」", href: "/learn/math/44" };

export const J_MATH_3_SANHEIHO: Daimon[] = [
  // ======================= 1 基本：三平方の定理 =======================
  {
    id: "j-math-3-sanheiho/1",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-sanheiho"],
    title: "三平方の定理",
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
        prompt: "直角三角形で、直角に向かい合う辺を何といいますか。漢字で答えなさい。",
        points: 2,
        skill: "知識・技能",
        level: 1,
        point: "直角の向かいの辺＝斜辺。いちばん長い辺。",
        answer: {
          kind: "term",
          accept: ["斜辺"],
          script: "kanji",
          near: [{ text: "しゃへん", why: "読みは合っています。漢字で「斜辺」と書きましょう。" }],
        },
        steps: [
          {
            title: "斜辺は c",
            body: "直角をはさむ2辺を a、b、直角に向かい合う{{斜辺}}を c とすると a²＋b²＝c²。斜辺はいちばん長い辺です。",
            figure: { ref: { unit: "j-math-3-sanheiho", section: 0 } },
            back: [{ label: "レクチャー「3辺の上の正方形の面積の関係」", href: `${L}#lec-s1` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "直角をはさむ2辺が 7cm と 24cm の直角三角形の、斜辺の長さを求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "c²＝7²＋24²＝625。",
        answer: { kind: "num", answerKind: "num", answer: ["25"], unit: "cm", equations: ["x^2=7^2+24^2"] },
        steps: [
          {
            title: "2乗してたす",
            body: "c²＝49＋576＝625。c＞0 なので {{c＝25cm}}。",
            trap: "7＋24＝31 とする。成り立つのは2乗どうしの関係。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "斜辺が 7cm、ほかの1辺が 3cm の直角三角形の、残りの辺の長さを求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "斜辺の2乗からひく。√40 は 2√10 に。",
        answer: { kind: "num", answerKind: "surd", answer: ["2√10"], unit: "cm", equations: ["x^2=7^2-3^2"] },
        steps: [
          {
            title: "斜辺の2乗からひく",
            body: "7 が斜辺なので b²＝7²−3²＝49−9＝{{40}}。",
            figure: { ref: { unit: "j-math-3-sanheiho", section: 1 } },
            trap: "3²＋7²＝58 としてしまう。斜辺がどれかを先に確かめる。",
            back: [{ label: "レクチャー「どこを求めるかで、式の形が変わる」", href: `${L}#lec-s2` }],
          },
          {
            title: "a√b の形に",
            body: "b＝√40＝√(4×10)＝{{2√10cm}}。",
            back: [ASQRTB],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "3辺の長さが次のア〜エのとき、直角三角形になるものを1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "いちばん長い辺の2乗＝残り2辺の2乗の和か。",
        answer: {
          kind: "choice",
          options: ["4cm、5cm、6cm", "9cm、12cm、15cm", "3cm、4cm、7cm", "5cm、7cm、9cm"],
          correct: 1,
          why: [
            "4²＋5²＝41、6²＝36 で等しくない。",
            "9²＋12²＝81＋144＝225＝15²。三平方の定理の逆により直角三角形。",
            "3＋4＝7 になっている。成り立つのは2乗どうし。3²＋4²＝25、7²＝49（そもそも三角形にならない）。",
            "5²＋7²＝74、9²＝81 で等しくない。",
          ],
          mistakeOf: [null, null, 1, null],
        },
        steps: [
          {
            title: "いちばん長い辺を c にして確かめる",
            body: "a²＋b²＝c² が成り立てば、c を斜辺とする直角三角形です（{{三平方の定理の逆}}）。9²＋12²＝225＝15² でイが成り立ちます。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "1辺が 7cm の正方形の対角線の長さを求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "直角二等辺三角形 1:1:√2。",
        answer: { kind: "num", answerKind: "surd", answer: ["7√2"], unit: "cm", equations: ["x^2=7^2+7^2"] },
        steps: [
          {
            title: "直角二等辺三角形の比",
            body: "正方形を対角線で切ると直角二等辺三角形。辺の比は {{1:1:√2}} なので対角線は {{7√2cm}}。7²＋7²＝98、√98＝7√2 でも同じ。",
            figure: { ref: { unit: "j-math-3-sanheiho", section: 3 } },
            back: [{ label: "レクチャー「覚えておくと速い辺の比」", href: `${L}#lec-s4` }],
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "斜辺が 12cm で、1つの角が 30° の直角三角形があります。60° の角に向かい合う辺の長さとして正しいものをア〜エから1つ選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "1:√3:2。斜辺が2、60° の向かいが √3。",
        answer: {
          kind: "choice",
          options: ["6√3cm", "6cm", "12√3cm", "24/√3cm"],
          correct: 0,
          why: [
            "辺の比 1:√3:2 で斜辺 2 が 12cm、1 が 6cm。60° の向かいは √3 にあたり 6√3cm。",
            "6cm は 30° の向かいの辺（いちばん短い辺）。",
            "12 を 1 にあててしまった。斜辺は比の 2 にあたる。",
            "√3 を斜辺の側にあてている（1:2:√3 の順でまちがえた）。斜辺がいちばん長い 2。",
          ],
          mistakeOf: [null, null, 2, 2],
        },
        steps: [
          {
            title: "比のどこが斜辺か",
            body: "30°・60°・90° の三角形は {{短い辺:長い辺:斜辺＝1:√3:2}}。斜辺 12cm が 2 にあたるので、1 にあたるのは 6cm。",
            trap: "1:2:√3 の順にあてはめる。いちばん長いのは 2（√3≒1.73）。",
          },
          {
            title: "60° の向かいは √3",
            body: "60° の向かいの辺は比の √3 なので {{6√3cm}}。",
            back: [{ label: "レクチャー「覚えておくと速い辺の比」", href: `${L}#lec-s4` }],
          },
        ],
      },
    ],
  },

  // ======================= 2 標準：平面図形への利用 =======================
  {
    id: "j-math-3-sanheiho/2",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-sanheiho"],
    title: "平面図形への利用",
    lead: "次の問いに答えなさい。",
    style: "calc",
    level: 2,
    points: 26,
    minutes: 15,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "1辺が 10cm の正三角形の高さを求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "高さで2つに切ると、30°・60°・90° の三角形。",
        answer: { kind: "num", answerKind: "surd", answer: ["5√3"], unit: "cm", equations: ["x^2=10^2-5^2"] },
        steps: [
          {
            title: "直角三角形をつくる",
            body: "頂点から底辺に垂線をひくと、底辺は半分の 5cm に分かれます。斜辺 10cm、1辺 5cm の直角三角形です。",
          },
          {
            title: "斜辺の2乗からひく",
            body: "h²＝10²−5²＝75、h＝√75＝{{5√3cm}}。1:√3:2 を使っても 5×√3。",
            back: [ASQRTB],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "座標平面上の2点 A(−1, 3)、B(5, −5) の間の距離を求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "x の差 6、y の差 8 を2辺とする直角三角形。",
        answer: { kind: "num", answerKind: "num", answer: ["10"], equations: ["x^2=(5-(-1))^2+(-5-3)^2"] },
        steps: [
          {
            title: "座標の差が2辺",
            body: "x 座標の差は 5−(−1)＝{{6}}、y 座標の差は 3−(−5)＝{{8}}。",
            trap: "5−1＝4 のように、マイナスの座標のひき算をまちがえる。",
          },
          {
            title: "三平方の定理",
            body: "AB²＝6²＋8²＝100 なので {{AB＝10}}。",
            figure: { ref: { unit: "j-math-3-sanheiho", section: 4 } },
            back: [{ label: "レクチャー「直角三角形を見つければ…」", href: `${L}#lec-s5` }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "AB＝AC＝13cm、BC＝10cm の二等辺三角形 ABC の面積を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "A から BC に垂線。底辺の半分 5cm で高さ 12cm。",
        answer: { kind: "num", answerKind: "num", answer: ["60"], unit: "cm²", calc: "10*12/2" },
        steps: [
          {
            title: "高さを求める",
            body: "A から BC にひいた垂線は BC の中点を通ります。斜辺 13、1辺 5 の直角三角形で、高さ²＝169−25＝144、{{高さ 12cm}}。",
          },
          {
            title: "面積",
            body: "10×12÷2＝{{60cm²}}。",
            trap: "13 を高さにして 10×13÷2 とする。13 はななめの辺。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "半径 6cm の円 O で、中心 O からの距離が 4cm である弦 AB の長さを求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "中心から弦への垂線は弦を二等分。半分を求めて2倍。",
        answer: { kind: "num", answerKind: "surd", answer: ["4√5"], unit: "cm", equations: ["(x/2)^2=6^2-4^2"] },
        steps: [
          {
            title: "半径を斜辺に",
            body: "O から AB にひいた垂線の足を H とすると、H は AB の中点。△OAH は斜辺 OA＝6、OH＝4 の直角三角形で AH²＝36−16＝20、{{AH＝2√5}}。",
          },
          {
            title: "2倍する",
            body: "AB＝2×AH＝{{4√5cm}}。",
            trap: "AH の 2√5cm を答えにしてしまう。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "AD∥BC の台形 ABCD で、AD＝4cm、BC＝10cm、AB＝DC＝5cm です。この台形の面積を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "A、D から垂線。はみ出す部分は (10−4)÷2＝3cm。",
        answer: { kind: "num", answerKind: "num", answer: ["28"], unit: "cm²", calc: "(4+10)*4/2" },
        steps: [
          {
            title: "高さを求める",
            body: "A、D から BC に垂線をひくと、両はしに底辺 (10−4)÷2＝{{3cm}}、斜辺 5cm の直角三角形ができます。高さ²＝25−9＝16、{{高さ 4cm}}。",
            trap: "底辺を 10−4＝6cm として計算する。左右に半分ずつ分かれる。",
          },
          {
            title: "台形の面積",
            body: "(4＋10)×4÷2＝{{28cm²}}。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "直角三角形の3辺の長さが x cm、(x＋7) cm、(x＋8) cm で、いちばん長い辺が斜辺です。x の値を求めなさい。途中の式も書きなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "x²＋(x＋7)²＝(x＋8)² を二次方程式として解く。",
        answer: {
          kind: "written",
          model:
            "斜辺は x＋8 なので x²＋(x＋7)²＝(x＋8)²\n" +
            "x²＋x²＋14x＋49＝x²＋16x＋64\n" +
            "x²−2x−15＝0\n" +
            "(x−5)(x＋3)＝0 より x＝5、−3\n" +
            "x＞0 なので x＝5\n" +
            "答え　x＝5（3辺は 5cm、12cm、13cm）",
          rubric: [
            { label: "x²＋(x＋7)²＝(x＋8)² の式を立てている", points: 2, keywords: ["x²+(x+7)²=(x+8)²"] },
            { label: "展開・整理して x²−2x−15＝0 にし、x＝5、−3 を求めている", points: 2, keywords: ["x²-2x-15=0", "(x-5)(x+3)"] },
            { label: "x＞0 から x＝−3 を除き、x＝5 と答えている", points: 2, keywords: ["x>0", "x=5"] },
          ],
          autoPart: { kind: "num", answerKind: "num", answer: ["5"], labels: ["x ="], equations: ["x^2+(x+7)^2=(x+8)^2"] },
        },
        steps: [
          {
            title: "斜辺を右辺に",
            body: "いちばん長い x＋8 が斜辺なので {{x²＋(x＋7)²＝(x＋8)²}}。",
          },
          {
            title: "展開して解く",
            body: "2x²＋14x＋49＝x²＋16x＋64 より x²−2x−15＝0、(x−5)(x＋3)＝0。",
            back: [{ label: "計算の段「二次方程式：因数分解で解く」", href: "/learn/math/48" }],
          },
          {
            title: "長さは正",
            body: "x＝−3 は長さにならないので {{x＝5}}。3辺 5、12、13 で 25＋144＝169 と確かめられます。",
            trap: "x＝5、−3 と2つ答える。",
          },
        ],
      },
    ],
  },

  // ======================= 3 標準：空間図形への利用 =======================
  {
    id: "j-math-3-sanheiho/3",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-sanheiho"],
    title: "空間図形への利用",
    lead: "次の問いに答えなさい。",
    style: "calc",
    level: 2,
    points: 25,
    minutes: 15,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "たて 2cm、横 3cm、高さ 6cm の直方体の対角線の長さを求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "√(a²＋b²＋c²)。",
        answer: { kind: "num", answerKind: "num", answer: ["7"], unit: "cm", equations: ["x^2=2^2+3^2+6^2"] },
        steps: [
          {
            title: "2回直角三角形を使う",
            body: "底面の対角線² は 2²＋3²＝13。その対角線と高さ 6 を2辺とする直角三角形の斜辺が、直方体の対角線です。",
            figure: { ref: { unit: "j-math-3-sanheiho", section: 4 } },
          },
          {
            title: "まとめて計算",
            body: "対角線²＝4＋9＋36＝49 なので {{7cm}}。",
            trap: "底面の対角線 √13 で止めてしまう。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "1辺が 4cm の立方体の対角線の長さを求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "4²＋4²＋4²＝48、√48＝4√3。",
        answer: { kind: "num", answerKind: "surd", answer: ["4√3"], unit: "cm", equations: ["x^2=3*4^2"] },
        steps: [
          {
            title: "3辺の2乗の和",
            body: "対角線²＝16＋16＋16＝48。√48＝√(16×3)＝{{4√3cm}}。",
            trap: "面の対角線 4√2cm と取りちがえる。",
            back: [ASQRTB],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "底面の半径が 5cm、母線の長さが 13cm の円錐の高さを求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "母線が斜辺。半径と高さが直角をはさむ2辺。",
        answer: { kind: "num", answerKind: "num", answer: ["12"], unit: "cm", equations: ["x^2=13^2-5^2"] },
        steps: [
          {
            title: "円錐の断面の直角三角形",
            body: "頂点・底面の中心・底面の円周上の点で、{{母線を斜辺}}とする直角三角形ができます。高さ²＝13²−5²＝144、{{高さ 12cm}}。",
            trap: "5²＋13² を計算する。母線が斜辺なのでひく。",
            back: [{ label: "レクチャー「直角三角形を見つければ…」", href: `${L}#lec-s5` }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "(3) の円錐の体積として正しいものをア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        dependsOn: "3",
        point: "体積＝(1/3)×底面積×高さ。高さは母線ではない。",
        answer: {
          kind: "choice",
          options: ["100π cm³", "300π cm³", "325π/3 cm³", "65π cm³"],
          correct: 0,
          why: [
            "(1/3)×π×5²×12＝100π cm³。",
            "1/3 をかけ忘れた（円柱の体積になっている）。",
            "高さに母線 13cm を使った。高さは (3) の 12cm。",
            "π×5×13＝65π は円錐の側面積（cm²）で、体積ではない。",
          ],
        },
        steps: [
          {
            title: "公式にあてはめる",
            body: "(1/3)×π×5²×{{12}}＝{{100π cm³}}。高さは母線ではなく (3) で求めた 12cm を使います。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "底面が1辺 8cm の正方形で、側面の辺（側辺）がすべて 9cm の正四角錐があります。この正四角錐の高さを求めなさい。",
        points: 5,
        skill: "思考・判断・表現",
        level: 3,
        point: "底面の対角線の半分 4√2 と高さ、側辺 9 で直角三角形。",
        answer: { kind: "num", answerKind: "num", answer: ["7"], unit: "cm", equations: ["x^2=9^2-32"] },
        steps: [
          {
            title: "底面の対角線の半分",
            body: "頂点から底面に下ろした垂線の足は、正方形の対角線の交点。対角線は 8√2 なので、その{{半分は 4√2}}（(4√2)²＝32）。",
          },
          {
            title: "側辺を斜辺にする",
            body: "高さ²＝9²−32＝49 なので {{高さ 7cm}}。",
            trap: "底面の1辺の半分 4cm を使い、側面の三角形の高さ（√65）を出してしまう。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "直方体 ABCD−EFGH で、AB＝4cm、AD＝3cm、AE＝5cm です。頂点 A から辺 BF 上の点を通って頂点 G まで、面の上を通る糸をはります。糸の長さがもっとも短くなるときの長さを求めなさい。",
        points: 5,
        skill: "思考・判断・表現",
        level: 3,
        point: "展開図で A と G を直線で結ぶ。たて 5、横 4＋3。",
        answer: { kind: "num", answerKind: "surd", answer: ["√74"], unit: "cm", equations: ["x^2=(4+3)^2+5^2"] },
        steps: [
          {
            title: "2つの面を展開する",
            body: "糸は面 ABFE と面 BFGC を通ります。この2面を BF で開いて平面に並べると、たて 5cm（AE）、横 {{4＋3＝7cm}}（AB＋BC）の長方形になります。",
          },
          {
            title: "まっすぐ結ぶのが最短",
            body: "展開図の上で A と G を線分で結んだ長さが最短です。7²＋5²＝74 より {{√74cm}}。",
            trap: "立体の対角線 √(16＋9＋25)＝5√2 を答える。糸は面の上を通るので立体の中は通れない。",
          },
        ],
      },
    ],
  },

  // ======================= 4 応用：三平方の定理の利用 =======================
  {
    id: "j-math-3-sanheiho/4",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-sanheiho"],
    title: "三平方の定理の利用",
    lead: "次の問いに答えなさい。",
    style: "word",
    level: 3,
    points: 22,
    minutes: 14,
    review: { status: "draft" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "長さ 5m のはしごを、地面に垂直な壁に立てかけました。はしごの下のはしは壁から 1.4m はなれています。はしごの上のはしの地面からの高さは何 m ですか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "はしごが斜辺。5²−1.4²＝23.04。",
        answer: { kind: "num", answerKind: "num", answer: ["24/5"], unit: "m", equations: ["x^2=5^2-1.4^2"] },
        steps: [
          {
            title: "直角三角形を見つける",
            body: "壁と地面は垂直なので、{{はしご 5m が斜辺}}、壁からのきょり 1.4m と高さが直角をはさむ2辺です。",
          },
          {
            title: "計算する",
            body: "高さ²＝25−1.96＝23.04。4.8²＝23.04 なので {{4.8m}}。",
            trap: "1.4² を 1.96 ではなく 2.8 などとする。小数の2乗に注意。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "(1) の状態から、はしごの下のはしを壁からさらに 1.6m はなしました。はしごの上のはしは、(1) のときより何 m 下がりますか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        dependsOn: "1",
        point: "壁から 3m。3:4:5 で高さ 4m。",
        answer: { kind: "num", answerKind: "num", answer: ["4/5"], unit: "m", calc: "4.8-4" },
        steps: [
          {
            title: "新しい高さ",
            body: "下のはしは壁から 1.4＋1.6＝{{3m}}。高さ²＝25−9＝16 なので高さ 4m（3:4:5 の直角三角形）。",
          },
          {
            title: "差をとる",
            body: "4.8−4＝{{0.8m}} 下がります。",
            trap: "下のはしと同じ 1.6m 下がると考える。斜辺が一定でも、上下の動きと左右の動きは同じではない。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "3辺の長さが 2√3cm、4cm、2√7cm の三角形は直角三角形であるといえますか。理由をつけて答え、直角三角形ならどの辺に向かい合う角が直角かも書きなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "いちばん長い 2√7 を c にして a²＋b²＝c² を確かめる。",
        answer: {
          kind: "written",
          model:
            "いちばん長い辺は 2√7cm（2√7＝√28、4＝√16、2√3＝√12）。\n" +
            "(2√3)²＋4²＝12＋16＝28、(2√7)²＝28\n" +
            "2辺の2乗の和がいちばん長い辺の2乗に等しいので、三平方の定理の逆により直角三角形である。\n" +
            "直角は、長さ 2√7cm の辺に向かい合う角。",
          rubric: [
            { label: "3辺を2乗するなどして、いちばん長い辺が 2√7cm だと示している", points: 1, keywords: ["√28", "2√7"] },
            { label: "(2√3)²＋4²＝28＝(2√7)² を計算している", points: 2, keywords: ["12+16=28", "28"] },
            { label: "三平方の定理の逆により直角三角形であると結論している", points: 2, keywords: ["三平方の定理の逆", "直角三角形"] },
            { label: "2√7cm の辺に向かい合う角が直角だと書いている", points: 1, keywords: ["2√7", "向かい合う角"] },
          ],
        },
        steps: [
          {
            title: "いちばん長い辺を見つける",
            body: "√ の中にそろえると 2√3＝√12、4＝√16、2√7＝√28。{{2√7 がいちばん長い}}ので、直角三角形なら斜辺です。",
            back: [ASQRTB],
          },
          {
            title: "2乗の和をくらべる",
            body: "12＋16＝28＝(2√7)²。三平方の定理の逆より直角三角形で、{{直角は斜辺 2√7cm の向かい}}にあります。",
            trap: "4 がいちばん長いと思いこみ、12＋28 と 16 をくらべる。",
            back: [{ label: "レクチャー「3辺の上の正方形の面積の関係」", href: `${L}#lec-s1` }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "長方形 ABCD（AB＝6cm、AD＝8cm）の紙を、頂点 D が頂点 B に重なるように折りました。折り目と辺 AD の交点を E とするとき、線分 AE の長さを求めなさい。考え方と途中の式も書きなさい。",
        points: 8,
        skill: "思考・判断・表現",
        level: 3,
        point: "折り返すと ED＝EB。AE＝x で △ABE に三平方。",
        answer: {
          kind: "written",
          model:
            "AE＝x cm とすると ED＝8−x。\n" +
            "D を B に重ねて折るので、E から D までと E から B までの長さは等しく EB＝ED＝8−x。\n" +
            "△ABE は ∠A＝90° の直角三角形なので AB²＋AE²＝EB²\n" +
            "6²＋x²＝(8−x)²\n" +
            "36＋x²＝64−16x＋x²\n" +
            "16x＝28、x＝7/4\n" +
            "答え　AE＝7/4cm",
          rubric: [
            { label: "AE＝x として ED＝8−x と表している", points: 1, keywords: ["8-x"] },
            { label: "折り返しの性質から EB＝ED であることを書いている", points: 2, keywords: ["EB＝ED", "折り"] },
            { label: "△ABE で 6²＋x²＝(8−x)² の式を立てている", points: 2, keywords: ["6²+x²=(8-x)²"] },
            { label: "式を解いて AE＝7/4cm と答えている", points: 3, keywords: ["16x=28", "7/4"] },
          ],
          autoPart: { kind: "num", answerKind: "num", answer: ["7/4"], labels: ["AE ="], unit: "cm", equations: ["6^2+x^2=(8-x)^2"] },
        },
        steps: [
          {
            title: "折り返しで等しくなる長さ",
            body: "折り目は D と B を重ねる線なので、折り目上の点 E から D と B までの長さは等しく {{EB＝ED}}。AE＝x とすると EB＝8−x。",
          },
          {
            title: "直角三角形 ABE",
            body: "∠A＝90° なので {{6²＋x²＝(8−x)²}}。x² が両辺で消えて 36＝64−16x、x＝{{7/4}}。",
            trap: "(8−x)² を 64−x² と展開する。(a−b)²＝a²−2ab＋b²。",
            back: [{ label: "レクチャー「直角三角形を見つければ…」", href: `${L}#lec-s5` }],
          },
        ],
      },
    ],
  },
];
