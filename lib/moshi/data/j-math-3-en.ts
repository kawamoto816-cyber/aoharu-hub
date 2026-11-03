// 中3数学「円」の大問。答えは python (sympy) で検算し、scripts/check-moshi.ts でも確かめる。
// 図をかかせる問題は作らない。点の並び・位置は文章で決め、答えが1つに決まるようにしている。
import type { Daimon } from "../types";

const L = "/learn/lecture/j-math-3-en";

export const J_MATH_3_EN: Daimon[] = [
  // ======================= 1 基本：中心角と円周角 =======================
  {
    id: "j-math-3-en/1",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-en"],
    title: "中心角と円周角",
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
        prompt: "円周上の2点を結ぶ線分を何といいますか。漢字1字で答えなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "円周の一部が弧、弧の両端を結ぶ線分が弦。",
        answer: {
          kind: "term",
          accept: ["弦"],
          script: "kanji",
          near: [
            { text: "げん", why: "読みは合っています。漢字で「弦」と書きましょう。" },
            { text: "弧", why: "弧は円周の一部（曲線）。2点を結ぶまっすぐな線分は「弦」です。" },
          ],
        },
        steps: [
          {
            title: "弧と弦を区別する",
            body: "円周の一部が{{弧}}、弧の両端を結ぶ線分が{{弦}}です。円の中心を通る弦が直径です。",
            figure: { ref: { unit: "j-math-3-en", section: 0 } },
            back: [{ label: "レクチャー「中心角と円周角」", href: `${L}#lec-s1` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "円 O で、弧 AB に対する中心角 ∠AOB が 136° のとき、弧 AB に対する円周角の大きさを求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "円周角＝中心角÷2。",
        answer: { kind: "num", answerKind: "num", answer: ["68"], unit: "°", calc: "136/2" },
        steps: [
          {
            title: "円周角の定理",
            body: "1つの弧に対する円周角は{{中心角の半分}}。136°÷2＝{{68°}}。",
            figure: { ref: { unit: "j-math-3-en", section: 1 } },
            back: [{ label: "レクチャー「円周角の定理」", href: `${L}#lec-s2` }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "円 O で、弧 AB に対する円周角 ∠APB が 37° のとき、中心角 ∠AOB として正しいものをア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "中心角は円周角の2倍。",
        answer: {
          kind: "choice",
          options: ["74°", "18.5°", "37°", "143°"],
          correct: 0,
          why: [
            "中心角＝円周角×2＝37°×2＝74°。",
            "半分にするのは中心角から円周角を求めるとき。ここは逆で2倍する。",
            "同じ弧に対する円周角どうしは等しいが、中心角は円周角とは等しくない。",
            "180°−37° としている。円周角と中心角の関係は「2倍」。",
          ],
          mistakeOf: [null, 0, null, null],
        },
        steps: [
          {
            title: "どちらからどちらを求めるか",
            body: "円周角は中心角の半分なので、{{中心角は円周角の2倍}}。37°×2＝{{74°}}。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "線分 AB を直径とする円の周上に点 C、D があり、D は C をふくまないほうの弧 AB 上にあります。∠CAB＝28° のとき、∠ADC の大きさを求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "直径→∠ACB＝90°。∠ADC は弧 AC に対する円周角。",
        answer: { kind: "num", answerKind: "num", answer: ["62"], unit: "°", calc: "90-28" },
        steps: [
          {
            title: "直径を見たら 90°",
            body: "AB は直径なので {{∠ACB＝90°}}。△ABC で ∠ABC＝180°−90°−28°＝{{62°}}。",
            figure: { ref: { unit: "j-math-3-en", section: 2 } },
            back: [{ label: "レクチャー「直径に対する円周角は 90°」", href: `${L}#lec-s3` }],
          },
          {
            title: "同じ弧に対する円周角",
            body: "∠ADC と ∠ABC は、どちらも{{弧 AC に対する円周角}}なので等しく、∠ADC＝{{62°}}。",
            trap: "∠ADC を ∠CAB と同じ 28° とする。∠CAB は弧 BC に対する円周角で、見こむ弧がちがう。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "円周を9等分する点を、順に A、B、C、…、I とします。B をふくむ弧 AC に対する円周角の大きさを求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "弧 AC は9等分の2つ分。中心角 80°、円周角はその半分。",
        answer: { kind: "num", answerKind: "num", answer: ["40"], unit: "°", calc: "360/9*2/2" },
        steps: [
          {
            title: "中心角を出す",
            body: "9等分の1つ分の中心角は 360°÷9＝40°。弧 AC は2つ分なので{{中心角 80°}}。",
            figure: { ref: { unit: "j-math-3-en", section: 3 } },
            back: [{ label: "レクチャー「円周角は弧の長さに比例する」", href: `${L}#lec-s4` }],
          },
          {
            title: "半分にする",
            body: "円周角は中心角の半分なので {{40°}}。",
            trap: "1つ分の中心角 40° を、2つ分にしないまま半分にして 20° とする。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "直線 AB について同じ側に2点 P、Q があります。4点 A、B、P、Q が1つの円周上にあるといえるのはどれですか。ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "円周角の定理の逆：同じ側で ∠APB＝∠AQB。",
        answer: {
          kind: "choice",
          options: ["∠APB＝∠AQB", "PA＝QB", "∠PAB＝∠QBA", "∠APB＋∠AQB＝180°"],
          correct: 0,
          why: [
            "AB を同じ側から見こむ角が等しいので、円周角の定理の逆により4点は1つの円周上にある。",
            "長さが等しいだけでは、円周上にあるかどうかは決まらない。",
            "A、B の角が等しくても、P、Q から AB を見こむ角が等しいとは限らない。",
            "P、Q が同じ側にあるときに使えるのは「等しい」。和が 180° になる条件はここでは使えない。",
          ],
        },
        steps: [
          {
            title: "円周角の定理の逆",
            body: "2点 P、Q が直線 AB の同じ側にあって {{∠APB＝∠AQB}} なら、4点 A、B、P、Q は1つの円周上にあります。",
            back: [{ label: "レクチャー「円周角は弧の長さに比例する」（定理の逆）", href: `${L}#lec-s4` }],
          },
        ],
      },
    ],
  },

  // ======================= 2 標準：円周角の定理で角度を求める =======================
  {
    id: "j-math-3-en/2",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-en"],
    title: "円周角の定理を使った角度",
    lead: "次の角の大きさを求めなさい。",
    style: "calc",
    level: 2,
    points: 24,
    minutes: 13,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "円 O の周上に3点 A、B、C があり、C は短いほうの弧 AB 上にない点です。∠ACB＝50° のとき、∠OAB の大きさ。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "中心角 100°、△OAB は OA＝OB の二等辺三角形。",
        answer: { kind: "num", answerKind: "num", answer: ["40"], unit: "°", calc: "(180-50*2)/2" },
        steps: [
          {
            title: "中心角を出す",
            body: "∠AOB は弧 AB に対する中心角なので、円周角の2倍で {{100°}}。",
          },
          {
            title: "二等辺三角形の底角",
            body: "OA と OB はどちらも半径なので等しく、△OAB は二等辺三角形。∠OAB＝(180°−100°)÷2＝{{40°}}。",
            trap: "∠OAB を円周角と同じ 50° とする。∠OAB の頂点 A は弧 AB の端で、円周角ではない。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "円周上に4点 A、B、C、D がこの順にあり、線分 AC と BD の交点を P とします。∠BAC＝32°、∠BPC＝78° のとき、∠ACD の大きさ。",
        points: 5,
        skill: "思考・判断・表現",
        level: 2,
        point: "外角で ∠ABD を出し、弧 AD に対する円周角として移す。",
        answer: { kind: "num", answerKind: "num", answer: ["46"], unit: "°", calc: "78-32" },
        steps: [
          {
            title: "△ABP の外角",
            body: "∠BPC は △ABP の頂点 P の外角なので、∠BAP＋∠ABP に等しい。∠ABP＝78°−32°＝{{46°}}。",
            trap: "∠BPC を内角と見て 180°−78°−32°＝70° とする。∠BPC は △ABP の外側の角。",
          },
          {
            title: "同じ弧の円周角",
            body: "∠ABD と ∠ACD は、どちらも{{弧 AD に対する円周角}}。だから ∠ACD＝{{46°}}。",
            back: [{ label: "レクチャー「円周角の定理」", href: `${L}#lec-s2` }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "線分 AB を直径とする円の周上に点 C、D があり、C と D は直線 AB について反対側にあります。∠BCD＝58° のとき、∠ABD の大きさ。",
        points: 5,
        skill: "思考・判断・表現",
        level: 2,
        point: "∠ACB＝90° から ∠ACD を出す。∠ABD は同じ弧 AD。",
        answer: { kind: "num", answerKind: "num", answer: ["32"], unit: "°", calc: "90-58" },
        steps: [
          {
            title: "直径の円周角 90° を分ける",
            body: "AB が直径なので {{∠ACB＝90°}}。D は AB の反対側にあるので、∠ACB は ∠ACD と ∠DCB に分かれ、∠ACD＝90°−58°＝{{32°}}。",
            back: [{ label: "レクチャー「直径に対する円周角は 90°」", href: `${L}#lec-s3` }],
          },
          {
            title: "弧 AD に対する円周角",
            body: "∠ABD と ∠ACD は、どちらも弧 AD に対する円周角なので {{∠ABD＝32°}}。",
            trap: "∠ABD を 58° とする。58° の ∠BCD は弧 BD に対する円周角で、∠BAD と等しい。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "円周上の3点 A、B、C で、弧 AB:弧 BC:弧 CA＝3:4:5 です（どの弧も残りの1点をふくまない）。∠ACB の大きさ。",
        points: 5,
        skill: "思考・判断・表現",
        level: 2,
        point: "∠ACB は弧 AB に対する円周角。円周の 3/12。",
        answer: { kind: "num", answerKind: "num", answer: ["45"], unit: "°", calc: "360*3/12/2" },
        steps: [
          {
            title: "∠ACB が見こむ弧",
            body: "∠ACB は {{C をふくまない弧 AB}} に対する円周角。弧 AB は円周の 3/(3＋4＋5)＝3/12。",
            trap: "∠ACB を「C の弧」と考えて弧 BC や弧 CA を使う。角の両はしの点 A、B の間の弧を使う。",
          },
          {
            title: "中心角→円周角",
            body: "中心角は 360°×3/12＝90°、円周角はその半分で {{45°}}。円周角は弧の長さに比例します。",
            figure: { ref: { unit: "j-math-3-en", section: 3 } },
            back: [{ label: "レクチャー「円周角は弧の長さに比例する」", href: `${L}#lec-s4` }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "円 O の外の点 P から円に2本の接線をひき、接点を A、B とします。∠APB＝64° で、点 C は A、B を両端とする弧のうち長いほうの弧の上にあります。∠ACB の大きさ。",
        points: 5,
        skill: "思考・判断・表現",
        level: 3,
        point: "接線⊥半径。四角形 PAOB の内角の和から ∠AOB。",
        answer: { kind: "num", answerKind: "num", answer: ["58"], unit: "°", calc: "(360-90-90-64)/2" },
        steps: [
          {
            title: "接線と半径は垂直",
            body: "接線は接点を通る半径に垂直なので {{∠OAP＝∠OBP＝90°}}。",
            back: [{ label: "レクチャー「接線は半径に垂直」", href: `${L}#lec-s5` }],
          },
          {
            title: "四角形 PAOB の内角の和",
            body: "四角形の内角の和は 360° なので、∠AOB＝360°−90°−90°−64°＝{{116°}}。",
          },
          {
            title: "円周角は中心角の半分",
            body: "C は長いほうの弧の上なので、∠ACB は短いほうの弧 AB に対する円周角。116°÷2＝{{58°}}。",
            trap: "∠AOB を求めたところで終わり、116° と答える。",
          },
        ],
      },
    ],
  },

  // ======================= 3 標準：円と相似 =======================
  {
    id: "j-math-3-en/3",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-en", "j-math-3-sojii"],
    title: "円と相似",
    lead: "円周上に4点 A、B、C、D がこの順にあり、弦 AC と弦 BD の交点を P とします。次の問いに答えなさい。",
    style: "synthesis",
    level: 2,
    points: 22,
    minutes: 13,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "text",
        body: "円周上に A、B、C、D がこの順に並び、弦 AC と弦 BD は円の内部の点 P で交わっている。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の図形で、∠PAB と大きさが等しい角をア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "∠PAB＝∠CAB は弧 BC に対する円周角。",
        answer: {
          kind: "choice",
          options: ["∠PDC", "∠PCD", "∠PBA", "∠DPC"],
          correct: 0,
          why: [
            "∠PAB（＝∠CAB）と ∠PDC（＝∠BDC）は、どちらも弧 BC に対する円周角なので等しい。",
            "∠PCD（＝∠ACD）は弧 AD に対する円周角で、∠PBA と等しい。",
            "∠PBA は弧 AD に対する円周角。∠PAB とは見こむ弧がちがう。",
            "∠DPC は ∠APB の対頂角。∠PAB ではない。",
          ],
          mistakeOf: [null, 1, 1, null],
        },
        steps: [
          {
            title: "角の両はしの点で弧を決める",
            body: "∠PAB は ∠CAB と同じ角で、{{弧 BC}} を見こむ円周角。弧 BC を見こむもう1つの円周角は {{∠BDC＝∠PDC}}。",
            back: [{ label: "レクチャー「円周角の定理」", href: `${L}#lec-s2` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の図形で △PAB∽△PDC であることを証明します。証明の文を正しい順に並べなさい（使わない文が1つあります）。",
        points: 5,
        skill: "思考・判断・表現",
        level: 2,
        point: "円周角1組＋対頂角1組で、2組の角。",
        answer: {
          kind: "order",
          tokens: [
            "△PAB と △PDC において",
            "弧 BC に対する円周角は等しいから ∠PAB＝∠PDC",
            "対頂角は等しいから ∠APB＝∠DPC",
            "2組の角がそれぞれ等しいから",
            "△PAB∽△PDC",
          ],
          alsoOk: [[0, 2, 1, 3, 4]],
          distractor: "3組の辺の比がすべて等しいから",
        },
        steps: [
          {
            title: "角を2組そろえる",
            body: "(1) の {{∠PAB＝∠PDC}}（円周角）と、P での{{対頂角 ∠APB＝∠DPC}}。2つの角の順番は入れかえてもかまいません。",
          },
          {
            title: "相似条件を書いて結論",
            body: "わかっているのは角だけなので、相似条件は{{「2組の角がそれぞれ等しい」}}。辺の長さは使っていないので「3組の辺の比」は使えません。",
            back: [{ label: "レクチャー「三角形の相似条件は3つ」", href: "/learn/lecture/j-math-3-sojii#lec-s2" }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の図形で、PA＝4cm、PB＝6cm、PD＝3cm のとき、PC の長さを求めなさい。",
        points: 5,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "2",
        point: "△PAB∽△PDC で PA:PD＝PB:PC。",
        answer: { kind: "num", answerKind: "num", answer: ["9/2"], unit: "cm", calc: "6*3/4" },
        steps: [
          {
            title: "対応する辺を記号の順に",
            body: "△PAB∽△PDC は P↔P、A↔D、B↔C。だから {{PA:PD＝PB:PC}}。",
            trap: "PA:PB＝PD:PC としてしまう。三角形の記号の順に対応をとる。",
          },
          {
            title: "比の式を解く",
            body: "4:3＝6:PC より 4×PC＝18、PC＝{{9/2cm}}（4.5cm）。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "上の図形で、PA＝6cm、PC＝4cm、BD＝11cm で、PB は PD より長いとします。PB の長さを求めなさい。",
        points: 5,
        skill: "思考・判断・表現",
        level: 3,
        point: "PA×PC＝PB×PD。PB＝x として二次方程式。",
        answer: { kind: "num", answerKind: "num", answer: ["8"], unit: "cm", equations: ["x(11-x)=24"] },
        steps: [
          {
            title: "相似から積の関係",
            body: "(3) と同じく PA:PD＝PB:PC なので、外側の積＝内側の積で {{PA×PC＝PB×PD}}。6×4＝24。",
          },
          {
            title: "PB＝x とおく",
            body: "PD＝11−x なので x(11−x)＝24。整理して x²−11x＋24＝0、(x−3)(x−8)＝0 より x＝3、8。",
            back: [{ label: "計算の段「二次方程式：因数分解で解く」", href: "/learn/math/48" }],
          },
          {
            title: "条件で1つにしぼる",
            body: "PB＞PD なので x＝8（このとき PD＝3）。{{PB＝8cm}}。",
            trap: "解を2つとも答える。問題の条件 PB＞PD を確かめる。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "上の図形で、PA×PC＝PB×PD がいつも成り立つ理由を、(2) で示した相似を使って説明しなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "相似→対応する辺の比→比の性質で積に。",
        answer: {
          kind: "written",
          model:
            "(2) より △PAB∽△PDC なので、対応する辺の比は等しく PA:PD＝PB:PC。\n" +
            "比の外側の積と内側の積は等しいので PA×PC＝PD×PB。\n" +
            "よって PA×PC＝PB×PD が成り立つ。",
          rubric: [
            { label: "△PAB∽△PDC から PA:PD＝PB:PC を書いている", points: 2, keywords: ["PA:PD＝PB:PC", "相似"] },
            { label: "比の性質（外側の積＝内側の積）で PA×PC＝PB×PD を導いている", points: 2, keywords: ["外側の積", "PA×PC＝PB×PD"] },
          ],
        },
        steps: [
          {
            title: "比を積に直す",
            body: "相似な三角形の対応する辺の比 {{PA:PD＝PB:PC}} から、a:b＝c:d なら ad＝bc を使って {{PA×PC＝PD×PB}}。点 A〜D が円周上のどこにあっても、(2) の相似は成り立つので、この関係もいつも成り立ちます。",
          },
        ],
      },
    ],
  },

  // ======================= 4 応用：円の性質の証明と利用 =======================
  {
    id: "j-math-3-en/4",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-en"],
    title: "円の性質の証明と利用",
    lead: "次の問いに答えなさい。",
    style: "writing",
    level: 3,
    points: 24,
    minutes: 15,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "円の形をした紙の中心を見つけたい。三角定規の直角の頂点を円周に当て、直角をはさむ2辺が円周と交わる2点を結ぶ線分をひきます。これを当てる位置を変えて2回行うと、2本の線分の交点が円の中心になります。この方法の根拠として正しいものをア〜エから1つ選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "円周角が 90° なら、その弦は直径。",
        answer: {
          kind: "choice",
          options: [
            "円周角が 90° である弦は直径なので、2本の線分はどちらも中心を通る",
            "同じ弧に対する円周角はすべて等しいので、2本の線分の長さは等しい",
            "接線は接点を通る半径に垂直なので、線分は接線になる",
            "円周角は中心角の2倍なので、線分の中点が中心になる",
          ],
          correct: 0,
          why: [
            "直径に対する円周角は 90° の逆で、円周角が 90° の弦は直径。直径は中心を通るので、2本の直径の交点が中心。",
            "長さが等しいことからは中心の位置は決まらない。",
            "三角定規の頂点は円周上にあり、ひいた線分は円の内部を通る弦。接線ではない。",
            "中心角は円周角の2倍で、逆になっている。また1本だけで中点を決めるなら2回行う必要がない。",
          ],
          mistakeOf: [null, 1, null, 0],
        },
        steps: [
          {
            title: "90° から直径",
            body: "直径に対する円周角は 90°。逆に、{{円周角が 90° なら、その弦は直径}}です。直径はかならず中心を通るので、2本ひけば交点が中心です。",
            figure: { ref: { unit: "j-math-3-en", section: 2 } },
            back: [{ label: "レクチャー「直径に対する円周角は 90°」", href: `${L}#lec-s3` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "円 O の周上に3点 A、B、P があり、線分 PB は円 O の直径です（中心 O は PB 上）。∠APB＝(1/2)∠AOB であることを証明しなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "OA＝OP の二等辺三角形と、外角の性質。",
        answer: {
          kind: "written",
          model:
            "△OAP で、OA と OP は円 O の半径なので OA＝OP\n" +
            "二等辺三角形の底角は等しいから ∠OAP＝∠OPA …①\n" +
            "∠AOB は △OAP の頂点 O における外角なので\n" +
            "∠AOB＝∠OAP＋∠OPA …②\n" +
            "①、② より ∠AOB＝2∠OPA＝2∠APB\n" +
            "よって ∠APB＝(1/2)∠AOB",
          rubric: [
            { label: "OA＝OP（半径）から △OAP が二等辺三角形で ∠OAP＝∠OPA を示している", points: 2, keywords: ["半径", "OA＝OP", "∠OAP＝∠OPA"] },
            { label: "∠AOB が △OAP の外角で、∠OAP＋∠OPA に等しいと書いている", points: 2, keywords: ["外角"] },
            { label: "2つをまとめて ∠AOB＝2∠APB を導き、結論を書いている", points: 2, keywords: ["2∠APB"] },
          ],
        },
        steps: [
          {
            title: "半径で二等辺三角形",
            body: "OA、OP はどちらも半径なので {{OA＝OP}}。△OAP は二等辺三角形で、∠OAP＝∠OPA です。",
          },
          {
            title: "外角でまとめる",
            body: "P、O、B は一直線なので、∠AOB は △OAP の{{外角}}。外角はとなり合わない2つの内角の和なので ∠AOB＝2∠OPA。",
            figure: { ref: { unit: "j-math-3-en", section: 1 } },
            back: [{ label: "レクチャー「円周角の定理」（証明のすじ）", href: `${L}#lec-s2` }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "円 O の外の点 P から2本の接線をひき、接点を A、B とします。∠APB＝50° のとき、∠PAB の大きさを求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "PA＝PB なので △PAB は二等辺三角形。",
        answer: { kind: "num", answerKind: "num", answer: ["65"], unit: "°", calc: "(180-50)/2" },
        steps: [
          {
            title: "接線の長さは等しい",
            body: "円の外の点からひいた2本の接線の長さは等しいので {{PA＝PB}}。",
            back: [{ label: "レクチャー「接線は半径に垂直」", href: `${L}#lec-s5` }],
          },
          {
            title: "二等辺三角形の底角",
            body: "∠PAB＝(180°−50°)÷2＝{{65°}}。",
            trap: "∠OAP＝90° と混同して 90° や 40° とする。∠PAB は接線 PA と弦 AB の間の角。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "(3) で PA＝PB となる理由を、△OAP と △OBP の合同を使って説明しなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "直角三角形で、斜辺 OP 共通・OA＝OB。",
        answer: {
          kind: "written",
          model:
            "△OAP と △OBP において\n" +
            "接線は接点を通る半径に垂直なので ∠OAP＝∠OBP＝90° …①\n" +
            "OA＝OB（半径） …②\n" +
            "OP は共通 …③\n" +
            "①、②、③ より、直角三角形の斜辺と他の1辺がそれぞれ等しいから △OAP≡△OBP\n" +
            "合同な図形の対応する辺は等しいので PA＝PB",
          rubric: [
            { label: "接線と半径が垂直なので ∠OAP＝∠OBP＝90° を書いている", points: 2, keywords: ["90°", "垂直"] },
            { label: "OA＝OB（半径）と OP 共通を書いている", points: 2, keywords: ["半径", "共通"] },
            { label: "「直角三角形の斜辺と他の1辺」で合同を示し、PA＝PB と結論している", points: 2, keywords: ["斜辺と他の1辺", "PA＝PB"] },
          ],
        },
        steps: [
          {
            title: "直角三角形を2つつくる",
            body: "O と A、B、P を結ぶと、接線と半径は垂直なので △OAP と △OBP はどちらも{{直角三角形}}。斜辺はどちらも OP です。",
          },
          {
            title: "直角三角形の合同条件",
            body: "斜辺 OP が共通、OA＝OB（半径）なので、{{斜辺と他の1辺}}がそれぞれ等しく合同。対応する辺 PA と PB は等しくなります。",
            trap: "「2辺とその間の角」を使おうとする。等しい角 90° は OP と OA の間の角ではない。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "四角形 ABCD に対角線 AC、BD をひくと、∠BAC＝∠BDC＝52°、∠CAD＝38° でした。∠CBD の大きさを求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "定理の逆で4点は同じ円周上。∠CBD は弧 CD の円周角。",
        answer: { kind: "num", answerKind: "num", answer: ["38"], unit: "°", calc: "38" },
        steps: [
          {
            title: "4点が円周上にあるか",
            body: "A、D は直線 BC について同じ側にあり、{{∠BAC＝∠BDC}}。円周角の定理の逆より、4点 A、B、C、D は1つの円周上にあります。",
            back: [{ label: "レクチャー「円周角は弧の長さに比例する」（定理の逆）", href: `${L}#lec-s4` }],
          },
          {
            title: "同じ弧の円周角",
            body: "∠CAD と ∠CBD はどちらも{{弧 CD に対する円周角}}なので、∠CBD＝{{38°}}。",
            trap: "円周上にあると確かめずに、三角形の角だけで求めようとして止まる。",
          },
        ],
      },
    ],
  },
];
