// 中1数学「空間図形」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
// π をふくむ答えは、欄のうしろに「π cm³」などを出し、π の係数だけを入力させる。
import type { Daimon } from "../types";

const LEC = "/learn/lecture/j-math-1-kukan";
const PI_LEAD = "次の問いに答えなさい。ただし、円周率は π とします。π をふくむ答えは、欄のうしろの「π」の前に入る数を答えなさい。";

export const J_MATH_1_KUKAN: Daimon[] = [
  // ================= 1 基本：立体の仲間分けと位置関係 =================
  {
    id: "j-math-1-kukan/1",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-kukan"],
    title: "立体の見方と位置関係",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 1,
    points: 20,
    minutes: 10,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "text",
        body: "(1)〜(3) は直方体 ABCD-EFGH について答える。上の面が ABCD、下の面が EFGH で、E は A の真下、F は B の真下、G は C の真下、H は D の真下にある。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の直方体で、辺 AE とねじれの位置にある辺をすべて選びなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "交わる辺・平行な辺を先に除くと、残りがねじれの位置。",
        answer: {
          kind: "choice",
          options: ["辺 BC", "辺 CD", "辺 FG", "辺 GH", "辺 BF", "辺 EH"],
          correct: [0, 1, 2, 3],
          why: [
            "BC は AE と平行でなく、交わりもしません。ねじれの位置です。",
            "CD は AE と平行でなく、交わりもしません。ねじれの位置です。",
            "FG は AE と平行でなく、交わりもしません。ねじれの位置です。",
            "GH は AE と平行でなく、交わりもしません。ねじれの位置です。",
            "BF は AE と平行です（どちらも上下の辺）。",
            "EH は点 E で AE と交わります。",
          ],
        },
        steps: [
          {
            title: "交わる・平行を除く",
            body: "AE と交わるのは AB・AD・EF・EH、平行なのは BF・CG・DH。残りの {{BC・CD・FG・GH}} がねじれの位置です。",
            figure: { ref: { unit: "j-math-1-kukan", section: 2 } },
            trap: "平行でない辺はすべて交わると考える。空間ではねじれの位置がある。",
            back: [{ label: "レクチャー「2直線の位置関係は3つ」", href: `${LEC}#lec-s3` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の直方体で、辺 AB と垂直な面をすべて選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "AB が面と交わる点で、面上の2直線と垂直になっている面。",
        answer: {
          kind: "choice",
          options: ["面 AEHD", "面 BFGC", "面 ABCD", "面 EFGH", "面 ABFE"],
          correct: [0, 1],
          why: [
            "AB は点 A で面 AEHD と交わり、AD・AE の両方に垂直です。",
            "AB は点 B で面 BFGC と交わり、BC・BF の両方に垂直です。",
            "AB は面 ABCD の上にある辺です。",
            "AB は面 EFGH と平行です（交わらない）。",
            "AB は面 ABFE の上にある辺です。",
          ],
        },
        steps: [
          {
            title: "交わる点で2方向に垂直か",
            body: "AB は A で {{AD と AE の両方に垂直}} なので面 AEHD に垂直。同じように B で面 BFGC に垂直です。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の直方体で、面 ABCD と平行な辺は何本ありますか。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "向かい合う面 EFGH の4本の辺。",
        answer: { kind: "num", answerKind: "num", answer: ["4"], unit: "本", calc: "4" },
        steps: [
          {
            title: "向かいの面の辺",
            body: "面 ABCD と交わらない辺は、下の面の {{EF・FG・GH・HE の4本}}。面 ABCD 上の辺は「平行」とはいいません。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "どの面も合同な正三角形で、1つの頂点に4つの面が集まっている正多面体を選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "正三角形の面は 正四・正八・正二十。集まる数は 3・4・5。",
        answer: {
          kind: "choice",
          options: ["正四面体", "正六面体", "正八面体", "正二十面体"],
          correct: 2,
          why: [
            "正四面体は1つの頂点に3つの面が集まります。",
            "正六面体（立方体）の面は正方形です。",
            "正八面体は、正三角形が1つの頂点に4つずつ集まっています。",
            "正二十面体は1つの頂点に5つの面が集まります。",
          ],
        },
        steps: [
          {
            title: "面の形と集まる数",
            body: "面が正三角形なのは正四・正八・正二十面体。1つの頂点に集まる面は 3・{{4}}・5 です。",
            figure: { ref: { unit: "j-math-1-kukan", section: 0 } },
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "角柱や角錐のように、平面だけで囲まれた立体を何といいますか。漢字で答えなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "平面（多角形の面）だけで囲まれた立体＝多面体。",
        answer: {
          kind: "term",
          accept: ["多面体"],
          script: "kanji",
          near: [
            { text: "ためんたい", why: "読みは合っています。漢字で「多面体」と書きましょう。" },
            { text: "正多面体", why: "正多面体は多面体のうち特別なものです。平面で囲まれた立体全体は「多面体」です。" },
          ],
        },
        steps: [
          {
            title: "多面体と正多面体",
            body: "平面だけで囲まれた立体が {{多面体}}。円柱・円錐・球は曲面があるので多面体ではありません。",
            back: [{ label: "レクチャー「立体の仲間分け」", href: `${LEC}#lec-s1` }],
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "正面から見た図（立面図）が長方形、真上から見た図（平面図）が三角形になる立体を選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "真上から見た形が底面。正面が長方形なら柱体。",
        answer: {
          kind: "choice",
          options: ["三角柱", "三角錐", "円柱", "四角柱"],
          correct: 0,
          why: [
            "底面が三角形なので真上からは三角形、側面が長方形なので正面からは長方形に見えます。",
            "三角錐を正面から見ると三角形です。",
            "円柱を真上から見ると円です。",
            "四角柱を真上から見ると四角形です。",
          ],
        },
        steps: [
          {
            title: "平面図は底面、立面図で柱か錐か",
            body: "平面図が三角形なので底面は三角形。立面図が長方形なので {{柱体}}。だから三角柱です。",
            figure: { ref: { unit: "j-math-1-kukan", section: 0 } },
          },
        ],
      },
    ],
  },

  // ================= 2 標準：体積・表面積の計算 =================
  {
    id: "j-math-1-kukan/2",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-kukan"],
    title: "立体の体積と表面積",
    lead: PI_LEAD,
    style: "calc",
    level: 2,
    points: 20,
    minutes: 12,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "底面が1辺 6cm の正方形で、高さが 7cm の正四角錐の体積を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "錐体は 1/3×底面積×高さ。",
        answer: { kind: "num", answerKind: "num", answer: ["84"], unit: "cm³", calc: "1/3*6^2*7" },
        steps: [
          {
            title: "1/3 を忘れずに",
            body: "底面積は 6×6＝36。{{1/3}}×36×7＝84cm³。",
            figure: { ref: { unit: "j-math-1-kukan", section: 5 } },
            trap: "36×7＝252 と、1/3 をかけ忘れる。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "底面の半径が 4cm、高さが 5cm の円柱の体積を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "柱体は 底面積×高さ。",
        answer: { kind: "num", answerKind: "num", answer: ["80"], unit: "π cm³", calc: "4^2*5" },
        steps: [
          {
            title: "底面積×高さ",
            body: "底面積は π×4²＝16π。16π×5＝{{80π cm³}}。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "(2) の円柱の表面積を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "底面2つ＋側面（長方形：たて 高さ、横 底面の円周）。",
        answer: { kind: "num", answerKind: "num", answer: ["72"], unit: "π cm²", calc: "2*4^2+2*4*5" },
        steps: [
          {
            title: "展開図で考える",
            body: "底面 16π が2つで 32π。側面は横が円周 8π、たてが 5 の長方形で 40π。合計 {{72π cm²}}。",
            trap: "底面を1つしかたさない（56π）。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "底面の半径が 6cm、高さが 8cm の円錐の体積を選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "円錐は、同じ底面と高さの円柱の 1/3。",
        answer: {
          kind: "choice",
          options: ["96π cm³", "288π cm³", "32π cm³", "128π cm³"],
          correct: 0,
          why: [
            "1/3×π×6²×8＝1/3×288π＝96π です。",
            "π×6²×8 で円柱の体積です。1/3 をかけていません。",
            "1/3 を2回かけています。",
            "π×8²×6×1/3 で、半径と高さを入れかえています。",
          ],
          mistakeOf: [null, 0, null, null],
        },
        steps: [
          {
            title: "円柱の 1/3",
            body: "同じ底面・高さの円柱は 36π×8＝288π。円錐はその {{1/3}} で 96π cm³。",
            figure: { ref: { unit: "j-math-1-kukan", section: 5 } },
            back: [{ label: "レクチャー「錐体の体積は柱体の 1/3」", href: `${LEC}#lec-s6` }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "半径 6cm の球の表面積を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "球の表面積は 4πr²。",
        answer: { kind: "num", answerKind: "num", answer: ["144"], unit: "π cm²", calc: "4*6^2" },
        steps: [
          {
            title: "公式にあてはめる",
            body: "4π×6²＝{{144π cm²}}。体積の公式 4/3πr³ と取りちがえないこと。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "半径 3cm の球と、底面の半径が 3cm の円錐の体積が等しくなりました。円錐の高さは何 cm ですか。",
        points: 5,
        skill: "思考・判断・表現",
        level: 3,
        point: "球の体積を出し、円錐の体積の式＝それ、で方程式。",
        answer: { kind: "num", answerKind: "num", answer: ["12"], unit: "cm", equations: ["1/3*3^2*x=4/3*3^3"] },
        steps: [
          {
            title: "球の体積",
            body: "4/3×π×3³＝{{36π}} cm³。",
          },
          {
            title: "円錐の高さを x として方程式",
            body: "1/3×π×3²×x＝36π より 3πx＝36π、x＝{{12}}。",
            back: [{ label: "計算の段「方程式 ax＝b」", href: "/learn/math/15" }],
          },
        ],
      },
    ],
  },

  // ================= 3 標準：円錐の展開図 =================
  {
    id: "j-math-1-kukan/3",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-kukan"],
    title: "円錐の展開図",
    lead: PI_LEAD,
    style: "mix",
    level: 2,
    points: 20,
    minutes: 12,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [{ kind: "text", body: "母線の長さが 12cm、底面の半径が 4cm の円錐がある。この円錐の展開図について考える。" }],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の円錐の展開図で、側面のおうぎ形の半径は何 cm ですか。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "側面のおうぎ形の半径は母線。",
        answer: {
          kind: "choice",
          options: ["12cm", "4cm", "8cm", "16cm"],
          correct: 0,
          why: [
            "側面のおうぎ形は、頂点から底面の円周までの母線が半径になります。",
            "4cm は底面の円の半径です。おうぎ形の半径ではありません。",
            "8cm は底面の直径です。",
            "母線と底面の半径をたしています。",
          ],
          mistakeOf: [null, 2, null, null],
        },
        steps: [
          {
            title: "母線が半径",
            body: "円錐の側面を切り開くと、{{母線を半径とするおうぎ形}}になります。",
            figure: { ref: { unit: "j-math-1-kukan", section: 4 } },
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "側面のおうぎ形の弧の長さを求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "弧の長さ＝底面の円周。",
        answer: { kind: "num", answerKind: "num", answer: ["8"], unit: "π cm", calc: "2*4" },
        steps: [
          {
            title: "弧は底面のまわりに巻きつく",
            body: "組み立てると弧は底面の円周にぴったり重なるので、弧＝2π×4＝{{8π cm}}。",
            back: [{ label: "レクチャー「円錐の展開図は、おうぎ形と円」", href: `${LEC}#lec-s5` }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "側面のおうぎ形の中心角を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "2",
        point: "弧が、半径12の円周の何分の1かを考える。",
        answer: { kind: "num", answerKind: "num", answer: ["120"], unit: "°", calc: "8/(2*12)*360" },
        steps: [
          {
            title: "割合を出す",
            body: "半径 12cm の円周は 24π。8π÷24π＝{{1/3}}。",
            figure: { ref: { unit: "j-math-1-kukan", section: 4 } },
          },
          {
            title: "360° にかける",
            body: "360°×1/3＝{{120°}}。",
            trap: "半径を 4cm として割合を 1 にしてしまう。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "この円錐の側面積を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "3",
        point: "半径12の円の面積の 1/3。",
        answer: { kind: "num", answerKind: "num", answer: ["48"], unit: "π cm²", calc: "12^2/3" },
        steps: [
          {
            title: "おうぎ形の面積",
            body: "π×12²×1/3＝144π×1/3＝{{48π cm²}}。",
            trap: "底面の半径で π×4²×1/3 と計算する。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "この円錐の表面積を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        dependsOn: "4",
        point: "錐体の表面積＝底面積＋側面積（底面は1つ）。",
        answer: { kind: "num", answerKind: "num", answer: ["64"], unit: "π cm²", calc: "48+4^2" },
        steps: [
          {
            title: "底面を1つたす",
            body: "底面積は π×4²＝16π。48π＋16π＝{{64π cm²}}。",
            trap: "柱体と同じように底面を2つたしてしまう（80π）。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "円錐の頂点と、底面の円周上の点を結ぶ線分を何といいますか。漢字で答えなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "回転させて側面をえがく線＝母線。",
        answer: {
          kind: "term",
          accept: ["母線"],
          script: "kanji",
          near: [{ text: "ぼせん", why: "読みは合っています。漢字で「母線」と書きましょう。" }],
        },
        steps: [
          {
            title: "母線",
            body: "頂点と底面の円周上の点を結ぶ線分が {{母線}}。展開図ではおうぎ形の半径になります。",
          },
        ],
      },
    ],
  },

  // ================= 4 応用：回転体と記述 =================
  {
    id: "j-math-1-kukan/4",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-kukan"],
    title: "回転体の体積をくらべる",
    lead: PI_LEAD,
    style: "writing",
    level: 3,
    points: 20,
    minutes: 15,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [{ kind: "text", body: "∠B＝90°、AB＝6cm、BC＝3cm の直角三角形 ABC がある。この三角形を、1つの辺を軸として1回転させる。" }],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の三角形を、辺 AB を軸として1回転させてできる立体を選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "直角三角形を直角をはさむ辺で回すと円錐。",
        answer: {
          kind: "choice",
          options: ["円錐", "円柱", "球", "三角錐"],
          correct: 0,
          why: [
            "AB が高さ、BC が底面の半径になる円錐ができます。",
            "円柱ができるのは長方形を回したときです。",
            "球ができるのは半円を回したときです。",
            "回転体の底面は円なので、角錐にはなりません。",
          ],
        },
        steps: [
          {
            title: "軸が高さ、もう1辺が半径",
            body: "AB を軸にすると、{{高さ 6cm、底面の半径 3cm の円錐}}ができます。",
            figure: { ref: { unit: "j-math-1-kukan", section: 3 } },
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "(1) の立体の体積を求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        dependsOn: "1",
        point: "1/3×π×3²×6。",
        answer: { kind: "num", answerKind: "num", answer: ["18"], unit: "π cm³", calc: "1/3*3^2*6" },
        steps: [
          {
            title: "円錐の体積",
            body: "1/3×π×3²×6＝{{18π cm³}}。",
            trap: "1/3 を忘れて 54π にする。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の三角形を、辺 BC を軸として1回転させてできる立体の体積を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "こんどは高さ 3cm、底面の半径 6cm の円錐。",
        answer: { kind: "num", answerKind: "num", answer: ["36"], unit: "π cm³", calc: "1/3*6^2*3" },
        steps: [
          {
            title: "半径と高さが入れかわる",
            body: "BC が軸（高さ 3cm）、AB が底面の半径（6cm）。1/3×π×6²×3＝{{36π cm³}}。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt:
          "ゆうさんは「同じ三角形を回すのだから、どの辺を軸にしても体積は同じになる」と考えました。この考えが正しいかどうかを、(2)・(3) の結果を使って説明しなさい。BC を軸にした立体の体積は、AB を軸にした立体の何倍かも答えること。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "半径は2乗で効くので、長い辺が半径になる方が大きい。",
        answer: {
          kind: "written",
          model:
            "正しくない。\n" +
            "AB を軸にすると 18π cm³、BC を軸にすると 36π cm³ で、体積はちがう。\n" +
            "36π÷18π＝2 なので、BC を軸にした立体の体積は AB を軸にした立体の 2倍である。\n" +
            "体積は半径を2回かけるので、長い辺（6cm）が半径になる方が大きくなる。",
          rubric: [
            { label: "「正しくない」と判断している", points: 1, keywords: ["正しくない"] },
            { label: "18π と 36π をくらべて、体積がちがうことを示している", points: 2, keywords: ["18π", "36π"] },
            { label: "36π÷18π＝2 で、2倍と答えている", points: 2, keywords: ["2倍"] },
            { label: "半径が2乗で効く（長い辺が半径になる方が大きい）などの理由にふれている", points: 1, keywords: ["半径", "2回かける", "2乗"] },
          ],
          autoPart: { kind: "num", answerKind: "num", answer: ["2"], unit: "倍", calc: "36/18" },
        },
        steps: [
          {
            title: "数でくらべる",
            body: "(2) は 18π、(3) は 36π。{{36π÷18π＝2}} なので体積は同じではなく、2倍になります。",
          },
          {
            title: "理由",
            body: "体積は 1/3×π×{{半径×半径}}×高さ。半径は2回かけるので、長い辺を半径にした方が大きくなります。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "たて AB＝6cm、横 BC＝3cm の長方形を、辺 AB を軸として1回転させると円柱ができます。(2) の立体の体積は、この円柱の体積の何倍ですか。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "2",
        point: "底面と高さが同じ円錐と円柱。",
        answer: { kind: "num", answerKind: "num", answer: ["1/3"], unit: "倍", calc: "18/54" },
        steps: [
          {
            title: "円柱の体積とくらべる",
            body: "円柱は π×3²×6＝54π。18π÷54π＝{{1/3}}。底面と高さが同じなら、錐体は柱体の 1/3 です。",
            figure: { ref: { unit: "j-math-1-kukan", section: 5 } },
          },
        ],
      },
    ],
  },
];
