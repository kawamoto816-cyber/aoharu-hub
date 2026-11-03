// 中2数学「三角形と四角形（証明）」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

const U = "j-math-2-sankaku-shikaku";
const L = (n: number, label: string) => ({ label: `レクチャー「${label}」`, href: `/learn/lecture/${U}#lec-s${n}` });

export const J_MATH_2_SANKAKU_SHIKAKU: Daimon[] = [
  // ======================= 1 基本：角と長さ =======================
  {
    id: "j-math-2-sankaku-shikaku/1",
    subject: "math",
    grade: "中2",
    units: [U],
    title: "二等辺三角形と平行四辺形の性質",
    lead: "次の問いに答えなさい。",
    style: "calc",
    level: 1,
    points: 20,
    minutes: 10,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "AB＝AC の二等辺三角形 ABC で、∠A＝52° のとき、∠B は何度ですか。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "底角は等しい。(180°−頂角)÷2。",
        answer: { kind: "num", answerKind: "num", answer: ["64"], unit: "°", calc: "(180-52)/2" },
        steps: [
          {
            title: "底角は等しい",
            body: "AB＝AC なので底角 {{∠B＝∠C}}。2つの底角の和は 180°−52°＝128°。",
            figure: { ref: { unit: U, section: 1 } },
            back: [L(2, "二等辺三角形の底角は等しい")],
          },
          { title: "2でわる", body: "128°÷2＝{{64°}}。", trap: "180°−52°＝128° で止めてしまう。" },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "AB＝AC の二等辺三角形 ABC で、頂点 A における外角が 140° のとき、∠B は何度ですか。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "A の外角＝∠B＋∠C。底角は等しいので半分。",
        answer: { kind: "num", answerKind: "num", answer: ["70"], unit: "°", calc: "140/2" },
        steps: [
          {
            title: "外角の性質を使う",
            body: "A の外角は、となり合わない2つの内角の和なので {{∠B＋∠C＝140°}}。",
            back: [{ label: "レクチャー「平行と合同」三角形の内角", href: "/learn/lecture/j-math-2-heiko-godo#lec-s2" }],
          },
          {
            title: "底角は等しい",
            body: "∠B＝∠C なので ∠B＝140°÷2＝{{70°}}。",
            trap: "∠A＝140° として (180°−140°)÷2＝20° としてしまう。140° は外角。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "平行四辺形 ABCD で、∠B が ∠A より 40° 大きいとき、∠D は何度ですか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "となり合う角の和は180°。対角は等しい。",
        answer: { kind: "num", answerKind: "num", answer: ["110"], unit: "°", calc: "(180+40)/2" },
        steps: [
          {
            title: "となり合う角の和は180°",
            body: "AD∥BC なので ∠A＋∠B＝180°。∠B＝∠A＋40° より 2∠A＋40°＝180°、{{∠A＝70°}}、∠B＝110°。",
            back: [L(4, "平行四辺形の性質と、なるための条件")],
          },
          {
            title: "対角は等しい",
            body: "∠D は ∠B の対角なので {{∠D＝110°}}。",
            trap: "∠D を ∠A と同じ 70° にする。∠D の向かいは ∠B。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "平行四辺形 ABCD の対角線の交点を O とする。AC＝14cm、BD＝10cm、AB＝8cm のとき、△OAB の周の長さは何 cm ですか。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "対角線はそれぞれの中点で交わる。OA は AC の半分。",
        answer: { kind: "num", answerKind: "num", answer: ["20"], unit: "cm", calc: "14/2+10/2+8" },
        steps: [
          {
            title: "対角線の性質",
            body: "平行四辺形の対角線は{{それぞれの中点で交わる}}ので OA＝14÷2＝7cm、OB＝10÷2＝5cm。",
            figure: { ref: { unit: U, section: 3 } },
          },
          { title: "3辺をたす", body: "7＋5＋8＝{{20cm}}。", trap: "14＋10＋8＝32 と対角線をそのままたす。" },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "平行四辺形 ABCD に「AB＝BC」という条件を加えると、どんな四角形になりますか。ア〜エから1つ選びなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "対辺が等しいので、となりの辺も等しいと4辺が等しい。",
        answer: {
          kind: "choice",
          options: ["長方形", "ひし形", "正方形", "台形"],
          correct: 1,
          why: [
            "長方形は4つの角が等しい四角形。辺の条件ではなれない。",
            "AB＝CD、BC＝DA（対辺）に AB＝BC が加わり、4つの辺が等しくなるのでひし形。",
            "正方形には、角も等しい（90°）という条件が必要。",
            "平行四辺形はもともと2組の対辺が平行で、台形ではない。",
          ],
        },
        steps: [
          {
            title: "対辺が等しいことと合わせる",
            body: "平行四辺形は AB＝CD、BC＝DA。そこに AB＝BC が加わると {{4つの辺がすべて等しい}}ので、ひし形の定義にあてはまります。",
            figure: { ref: { unit: U, section: 4 } },
            back: [L(5, "特別な平行四辺形と「逆」")],
          },
        ],
      },
    ],
  },

  // ======================= 2 標準：条件・逆・反例 =======================
  {
    id: "j-math-2-sankaku-shikaku/2",
    subject: "math",
    grade: "中2",
    units: [U],
    title: "平行四辺形になるための条件と逆",
    lead: "次の問いに答えなさい。",
    style: "word",
    level: 2,
    points: 20,
    minutes: 11,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "四角形 ABCD が次のことをみたすとき、必ず平行四辺形になるものを、ア〜オからすべて選びなさい。（O は対角線の交点）",
        points: 6,
        skill: "知識・技能",
        level: 2,
        point: "「1組の対辺」の条件は、平行と長さが同じ組のとき。",
        answer: {
          kind: "choice",
          options: ["AB∥DC、AB＝DC", "AB∥DC、AD＝BC", "∠A＝∠C、∠B＝∠D", "AC＝BD", "AO＝CO、BO＝DO"],
          correct: [0, 2, 4],
          why: [
            "同じ1組の対辺が平行で長さが等しいので、平行四辺形になる。",
            "平行な組（AB、DC）と等しい組（AD、BC）がちがう。等脚台形のように平行四辺形でないものがある。",
            "2組の対角がそれぞれ等しいので、平行四辺形になる。",
            "対角線の長さが等しいだけでは、等脚台形などもあてはまる。",
            "対角線がそれぞれの中点で交わるので、平行四辺形になる。",
          ],
          mistakeOf: [null, 0, null, null, null],
        },
        steps: [
          {
            title: "5つの条件と照らし合わせる",
            body: "ア は「{{1組の対辺が平行で長さが等しい}}」、ウ は「2組の対角」、オ は「対角線が中点で交わる」にあてはまります。",
            figure: { ref: { unit: U, section: 3 } },
            back: [L(4, "平行四辺形の性質と、なるための条件")],
          },
          {
            title: "反例を思いうかべる",
            body: "イ・エ はどちらも{{等脚台形}}（AB∥DC で AD＝BC、対角線も等しい）があてはまるので、平行四辺形とは限りません。",
            trap: "「平行」と「等しい」が1つずつあれば平行四辺形だと思う。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次のことがらのうち、その逆も正しいものを、ア〜エから1つ選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "仮定と結論を入れかえて、反例がないか探す。",
        answer: {
          kind: "choice",
          options: [
            "正方形ならば、ひし形である",
            "三角形の2つの辺が等しいならば、その2つの辺の向かいの角は等しい",
            "x＝2、y＝3 ならば、x＋y＝5 である",
            "四角形が長方形ならば、対角線の長さは等しい",
          ],
          correct: 1,
          why: [
            "逆「ひし形ならば正方形」は正しくない。角が90°でないひし形がある。",
            "逆「2つの角が等しい三角形は、その角の向かいの辺が等しい（二等辺三角形）」も正しい定理。",
            "逆「x＋y＝5 ならば x＝2、y＝3」は正しくない。x＝1、y＝4 が反例。",
            "逆「対角線の長さが等しい四角形は長方形」は正しくない。等脚台形が反例。",
          ],
          mistakeOf: [2, null, 2, 2],
        },
        steps: [
          {
            title: "逆をつくる",
            body: "「○○ならば△△」の{{仮定と結論を入れかえた}}ものが逆です。それぞれ逆を書いて、反例があるか確かめます。",
            figure: { ref: { unit: U, section: 4 } },
            back: [L(5, "特別な平行四辺形と「逆」")],
          },
          {
            title: "反例が1つでもあれば正しくない",
            body: "ア・ウ・エ には反例があります。イ の逆「2つの角が等しい三角形は二等辺三角形」は、{{証明された定理}}です。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "「整数 x、y で、x＋y が偶数ならば、x も y も偶数である」は正しくない。そのことを示す反例を、ア〜エから1つ選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "反例＝仮定は成り立つのに、結論が成り立たない例。",
        answer: {
          kind: "choice",
          options: ["x＝2、y＝4", "x＝1、y＝3", "x＝1、y＝2", "x＝4、y＝6"],
          correct: 1,
          why: [
            "x＋y＝6 で偶数、x も y も偶数。結論が成り立つので反例ではない。",
            "x＋y＝4 で偶数（仮定は成り立つ）なのに、x も y も奇数（結論が成り立たない）。反例。",
            "x＋y＝3 は奇数で、仮定がそもそも成り立たない。反例にならない。",
            "x＋y＝10 で偶数、x も y も偶数。結論が成り立つので反例ではない。",
          ],
        },
        steps: [
          {
            title: "反例の条件",
            body: "反例は「{{仮定にはあてはまるのに、結論が成り立たない}}」例です。x＋y が偶数で、x か y が偶数でないものを探します。",
            trap: "仮定が成り立たない例（x＝1、y＝2）を反例にする。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "長方形 ABCD の対角線の交点を O とする。∠AOB＝64° のとき、∠OBC は何度ですか。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "長方形の対角線は等しく中点で交わる→OA＝OB。",
        answer: { kind: "num", answerKind: "num", answer: ["32"], unit: "°", calc: "90-(180-64)/2" },
        steps: [
          {
            title: "二等辺三角形を見つける",
            body: "長方形の対角線は{{長さが等しく}}、それぞれの中点で交わるので OA＝OB。△OAB は二等辺三角形です。",
            figure: { ref: { unit: U, section: 4 } },
          },
          {
            title: "底角を求める",
            body: "∠OBA＝(180°−64°)÷2＝{{58°}}。",
            back: [L(2, "二等辺三角形の底角は等しい")],
          },
          {
            title: "90° からひく",
            body: "∠ABC＝90° なので ∠OBC＝90°−58°＝{{32°}}。",
            trap: "∠OBA＝58° を答えてしまう。問われているのは ∠OBC。",
          },
        ],
      },
    ],
  },

  // ======================= 3 標準：証明の穴うめ（直角三角形） =======================
  {
    id: "j-math-2-sankaku-shikaku/3",
    subject: "math",
    grade: "中2",
    units: [U],
    title: "二等辺三角形と直角三角形の証明",
    lead: "次の証明について、下の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 20,
    minutes: 11,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "text",
        body:
          "【問題】AB＝AC の二等辺三角形 ABC で、頂点 B から辺 AC に垂線 BD、頂点 C から辺 AB に垂線 CE をひく。このとき BD＝CE であることを証明しなさい。\n\n" +
          "【証明】△DBC と △ECB において\n" +
          "仮定から ∠BDC＝∠CEB＝90° …①\n" +
          "BC は（ ア ）…②\n" +
          "△ABC は AB＝AC の二等辺三角形だから、（ イ ）ので ∠DCB＝∠EBC …③\n" +
          "①、②、③より、直角三角形の（ ウ ）がそれぞれ等しいので △DBC≡△ECB\n" +
          "合同な図形の対応する辺は等しいので BD＝CE",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の【証明】の ア にあてはまる語を答えなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "2つの三角形のどちらの辺にもなっている。",
        answer: { kind: "term", accept: ["共通", "共通な辺", "共通の辺"], script: "kanji" },
        steps: [
          {
            title: "両方の三角形の辺",
            body: "BC は △DBC の辺でもあり、△ECB の辺でもあるので「{{共通}}」です。",
            figure: { ref: { unit: U, section: 1 } },
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の【証明】の イ にあてはまる根拠として正しいものを、ア〜エから1つ選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "∠DCB と ∠EBC は △ABC の底角。",
        answer: {
          kind: "choice",
          options: ["二等辺三角形の2つの底角は等しい", "二等辺三角形は2つの辺が等しい", "対頂角は等しい", "平行線の錯角は等しい"],
          correct: 0,
          why: [
            "∠DCB は ∠ACB、∠EBC は ∠ABC と同じ角で、△ABC の底角。底角は等しいので正しい。",
            "これは二等辺三角形の定義で、辺についてのこと。角が等しいことは定理を使う。",
            "B と C の角は向かい合う対頂角ではない。",
            "この図に平行線はない。",
          ],
        },
        steps: [
          {
            title: "角がどこにあるか",
            body: "D は AC 上、E は AB 上にあるので、∠DCB＝∠ACB、∠EBC＝∠ABC。どちらも{{底角}}です。",
            back: [L(2, "二等辺三角形の底角は等しい")],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の【証明】の ウ にあてはまる合同条件を、ア〜エから1つ選びなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "BC は直角の向かいの辺＝斜辺。",
        answer: {
          kind: "choice",
          options: ["斜辺と1つの鋭角", "斜辺と他の1辺", "1組の辺とその両端の角", "2組の辺とその間の角"],
          correct: 0,
          why: [
            "直角（①）があり、斜辺 BC が共通（②）、鋭角 ∠DCB＝∠EBC（③）なので正しい。",
            "等しい辺は斜辺 BC だけで、他の1辺が等しいことはわかっていない。",
            "BC の両端の角は △DBC の ∠DBC と ∠DCB。∠DBC＝∠ECB はわかっていない。",
            "等しい辺は1組だけ。",
          ],
        },
        steps: [
          {
            title: "斜辺を確かめる",
            body: "△DBC は ∠D＝90° なので、その向かいの BC が{{斜辺}}。△ECB も同じです。",
            figure: { ref: { unit: U, section: 2 } },
            back: [L(3, "直角三角形の合同条件")],
          },
          {
            title: "条件を選ぶ",
            body: "斜辺 BC と、鋭角 ∠DCB＝∠EBC が等しいので「{{斜辺と1つの鋭角}}」。",
            trap: "斜辺かどうかを確かめずに「1つの辺と1つの鋭角」とする。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "【証明】の③で使った「二等辺三角形の2つの底角は等しい」は、次のどれにあたりますか。ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "定義から証明された性質＝定理。",
        answer: {
          kind: "choice",
          options: ["定義", "定理", "仮定", "結論"],
          correct: 1,
          why: [
            "二等辺三角形の定義は「2つの辺が等しい三角形」。底角のことは定義から証明する。",
            "定義と合同条件から証明された性質なので定理。次の証明の根拠に使える。",
            "この問題の仮定は AB＝AC と2本の垂線。",
            "この問題の結論は BD＝CE。",
          ],
        },
        steps: [
          {
            title: "定義と定理の区別",
            body: "ことばの約束が{{定義}}、定義などから証明された性質が{{定理}}。底角が等しいことは、頂角の二等分線で合同を示して証明しました。",
            figure: { ref: { unit: U, section: 0 } },
            back: [L(1, "定義と定理")],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "この問題は、△ABD と △ACE の合同を示しても証明できる。そのときの合同条件と、使う等しい辺・角の組み合わせとして正しいものを、ア〜エから1つ選びなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "AB と AC が斜辺。∠A は2つの三角形に共通。",
        answer: {
          kind: "choice",
          options: [
            "斜辺 AB＝AC と、共通な鋭角 ∠A で「斜辺と1つの鋭角」",
            "斜辺 AB＝AC と、AD＝AE で「斜辺と他の1辺」",
            "斜辺 AB＝AC と、BD＝CE で「斜辺と他の1辺」",
            "AB＝AC と、∠ADB＝∠AEC＝90° だけで「1組の辺とその両端の角」",
          ],
          correct: 0,
          why: [
            "△ABD は ∠D＝90° で斜辺 AB、△ACE は ∠E＝90° で斜辺 AC。AB＝AC（仮定）、∠A は共通なので合同がいえる。",
            "AD＝AE はまだわかっていない。合同を示したあとでわかること。",
            "BD＝CE は示したい結論。結論を根拠に使ってはいけない。",
            "90° の角は辺 AB の両端の角ではない。辺と角の位置が合わない。",
          ],
        },
        steps: [
          {
            title: "斜辺と共通な角を見つける",
            body: "△ABD と △ACE はどちらも直角三角形で、斜辺は AB と AC（仮定より等しい）。さらに {{∠A は共通}}です。",
            figure: { ref: { unit: U, section: 2 } },
          },
          {
            title: "まだわからないことは使わない",
            body: "AD＝AE や BD＝CE は、{{合同を示したあとで}}わかることです。根拠には、仮定と、すでに正しいとわかったことだけを使います。",
            trap: "結論の BD＝CE を合同の根拠に入れてしまう。",
          },
        ],
      },
    ],
  },

  // ======================= 4 応用：平行四辺形の証明を書く =======================
  {
    id: "j-math-2-sankaku-shikaku/4",
    subject: "math",
    grade: "中2",
    units: [U],
    title: "平行四辺形であることの証明",
    lead: "次の問題について、下の問いに答えなさい。",
    style: "writing",
    level: 3,
    points: 20,
    minutes: 14,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "text",
        body:
          "【問題】平行四辺形 ABCD の対角線 AC 上に、AE＝CF となるように点 E、F をとる（E は A に近い方、F は C に近い方）。このとき、四角形 EBFD は平行四辺形であることを証明しなさい。\n" +
          "ただし、対角線 AC と BD の交点を O として証明する。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "OA＝OC、OB＝OD がいえる根拠として正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "平行四辺形の「性質」を根拠に使う。",
        answer: {
          kind: "choice",
          options: ["平行四辺形の対角線は、それぞれの中点で交わる", "平行四辺形の2組の対辺は、それぞれ等しい", "平行四辺形の定義", "仮定"],
          correct: 0,
          why: [
            "ABCD は平行四辺形なので、その性質として対角線が中点で交わり OA＝OC、OB＝OD。",
            "対辺が等しいのは AB＝DC、AD＝BC。OA や OB は対角線の一部。",
            "定義は「2組の対辺がそれぞれ平行」。対角線のことは定義には入っていない。",
            "仮定は「ABCD が平行四辺形」と「AE＝CF」。OA＝OC はそこから性質を使って導く。",
          ],
        },
        steps: [
          {
            title: "性質を根拠にする",
            body: "ABCD が平行四辺形であることは仮定。その{{性質}}「対角線はそれぞれの中点で交わる」から OA＝OC、OB＝OD がいえます。",
            figure: { ref: { unit: U, section: 3 } },
            back: [L(4, "平行四辺形の性質と、なるための条件")],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "OE＝OF であることの説明として正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "等しい長さから、等しい長さをひくと等しい。",
        answer: {
          kind: "choice",
          options: [
            "OE＝OA−AE、OF＝OC−CF で、OA＝OC、AE＝CF だから",
            "OE＝OA＋AE、OF＝OC＋CF で、OA＝OC、AE＝CF だから",
            "△OEB≡△OFD だから",
            "図で見ると OE と OF は同じ長さに見えるから",
          ],
          correct: 0,
          why: [
            "E は A と O の間、F は C と O の間にある。等しいものから等しいものをひくので OE＝OF。",
            "E は線分 OA 上にあるので、OE は OA より短い。たすのではなくひく。",
            "その合同はまだ示していない。示していないことを根拠にはできない。",
            "図で等しそうに見えても、根拠にはならない。",
          ],
        },
        steps: [
          {
            title: "線分のひき算",
            body: "OE＝OA−AE、OF＝OC−CF。{{OA＝OC}}（(1)）、{{AE＝CF}}（仮定）なので OE＝OF です。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "四角形 EBFD が平行四辺形であるといえる「平行四辺形になるための条件」を、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "EF と BD は EBFD の対角線。どちらも O が中点。",
        answer: {
          kind: "choice",
          options: ["対角線がそれぞれの中点で交わる", "2組の対辺がそれぞれ等しい", "1組の対辺が平行で長さが等しい", "2組の対角がそれぞれ等しい"],
          correct: 0,
          why: [
            "EBFD の対角線は EF と BD。OE＝OF、OB＝OD なので O はどちらの中点でもある。",
            "EB＝DF、BF＝ED はまだ示していない。",
            "EBFD の辺が平行かどうかはまだ示していない。",
            "EBFD の角はまだ調べていない。",
          ],
        },
        steps: [
          {
            title: "EBFD の対角線",
            body: "四角形 EBFD の対角線は {{EF と BD}}。OE＝OF、OB＝OD なので、対角線がそれぞれの中点 O で交わります。",
            figure: { ref: { unit: U, section: 3 } },
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "上の【問題】を証明しなさい。",
        points: 8,
        skill: "思考・判断・表現",
        level: 3,
        point: "OB＝OD、OE＝OF→対角線が中点で交わる→平行四辺形。",
        answer: {
          kind: "written",
          model:
            "対角線 AC と BD の交点を O とする。\n" +
            "平行四辺形の対角線は、それぞれの中点で交わるので\n" +
            "OA＝OC …①、OB＝OD …②\n" +
            "仮定から AE＝CF …③\n" +
            "OE＝OA−AE、OF＝OC−CF と①、③より OE＝OF …④\n" +
            "②、④より、四角形 EBFD は対角線がそれぞれの中点で交わるので、平行四辺形である。",
          rubric: [
            { label: "OA＝OC、OB＝OD を、根拠「平行四辺形の対角線はそれぞれの中点で交わる」とともに書いている", points: 2, keywords: ["OA=OC", "OB=OD", "中点"] },
            { label: "AE＝CF を仮定として書いている", points: 1, keywords: ["AE=CF", "仮定"] },
            { label: "OE＝OA−AE、OF＝OC−CF から OE＝OF を導いている", points: 2, keywords: ["OE=OF"] },
            { label: "四角形 EBFD の対角線 EF、BD がそれぞれの中点で交わることを示している", points: 1, keywords: ["EF", "BD"] },
            { label: "平行四辺形になるための条件を書いて、「EBFD は平行四辺形」と結論している", points: 2, keywords: ["対角線がそれぞれの中点で交わる", "平行四辺形である"] },
          ],
          alsoModels: [
            "△ABE と △CDF において、仮定から AE＝CF、平行四辺形の対辺は等しいので AB＝CD、AB∥DC より錯角は等しいので ∠BAE＝∠DCF。2組の辺とその間の角がそれぞれ等しいので △ABE≡△CDF、よって BE＝DF。同じように △ADE≡△CBF から DE＝BF。2組の対辺がそれぞれ等しいので、四角形 EBFD は平行四辺形である。",
          ],
        },
        steps: [
          {
            title: "平行四辺形の性質から出発",
            body: "ABCD の対角線の性質で {{OA＝OC、OB＝OD}}。仮定の AE＝CF と合わせて OE＝OF を出します。",
            back: [L(4, "平行四辺形の性質と、なるための条件")],
          },
          {
            title: "なるための条件で結論",
            body: "EBFD の対角線 EF と BD が {{O でそれぞれ2等分}}されるので、平行四辺形になるための条件にあてはまります。",
            figure: { ref: { unit: U, section: 3 } },
            trap: "「ABCD が平行四辺形だから EBFD も平行四辺形」と、根拠を書かずに結論する。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "上の【問題】で、AC＝18cm、AE＝4cm のとき、線分 EF の長さは何 cm ですか。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "AE と CF の両方をひく。",
        answer: { kind: "num", answerKind: "num", answer: ["10"], unit: "cm", calc: "18-4-4" },
        steps: [
          {
            title: "両はしの長さをひく",
            body: "CF＝AE＝4cm なので EF＝18−4−4＝{{10cm}}。",
            trap: "18−4＝14 と、AE だけひく。",
          },
        ],
      },
    ],
  },
];
