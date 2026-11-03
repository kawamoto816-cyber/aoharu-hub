// 中1数学「平面図形」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
// 作図はさせない（手順の並べかえ・選択・記述に置きかえる）。π をふくむ答えは、欄のうしろに「π cm²」などを出し、π の係数だけを入力させる。
import type { Daimon } from "../types";

const LEC = "/learn/lecture/j-math-1-heimen";

export const J_MATH_1_HEIMEN: Daimon[] = [
  // ================= 1 基本：用語・記号・移動・作図の手順 =================
  {
    id: "j-math-1-heimen/1",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-heimen"],
    title: "平面図形の基本",
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
        prompt: "記号を使って AB⊥CD と書いたとき、これが表す2直線 AB、CD の関係を選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "⊥ は垂直、∥ は平行。",
        answer: {
          kind: "choice",
          options: ["垂直である", "平行である", "長さが等しい", "交わらない"],
          correct: 0,
          why: [
            "⊥ は2直線が直角に交わる（垂直）ことを表す記号です。",
            "平行は ∥ の記号で表します。",
            "長さが等しいことは AB＝CD と書きます。",
            "交わらないのは平行のときです。垂直な2直線は交わります。",
          ],
        },
        steps: [
          {
            title: "記号の意味",
            body: "{{AB⊥CD は垂直}}、{{AB∥CD は平行}}。形を見ると覚えやすい記号です。",
            back: [{ label: "レクチャー「直線・半直線・線分」", href: `${LEC}#lec-s1` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次のうち、長さをはかることができるものを選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "両方に端がある線分だけが、長さをはかれる。",
        answer: {
          kind: "choice",
          options: ["直線 AB", "半直線 AB", "線分 AB", "どれもはかれない"],
          correct: 2,
          why: [
            "直線は両方に限りなくのびるので、長さははかれません。",
            "半直線は片方に限りなくのびるので、長さははかれません。",
            "線分は A と B の両方に端があるので、長さをはかれます。",
            "線分 AB は長さをはかれます。",
          ],
        },
        steps: [
          {
            title: "端がいくつあるか",
            body: "端が2つある {{線分}} だけが、長さの決まった図形です。",
            figure: { ref: { unit: "j-math-1-heimen", section: 0 } },
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "△ABC を平行移動して △DEF にしました。△ABC と △DEF の関係を表す言葉を、漢字2字で答えなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "移動しても形と大きさは変わらない。",
        answer: {
          kind: "term",
          accept: ["合同"],
          script: "kanji",
          near: [{ text: "ごうどう", why: "読みは合っています。漢字で「合同」と書きましょう。" }],
        },
        steps: [
          {
            title: "移動では形も大きさも変わらない",
            body: "平行移動・回転移動・対称移動のどれでも、もとの図形と移した図形は {{合同}} です。",
            figure: { ref: { unit: "j-math-1-heimen", section: 1 } },
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "「点対称移動」の説明として正しいものを選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "点対称移動＝180°の回転移動。対称移動とはちがう。",
        answer: {
          kind: "choice",
          options: [
            "1つの点を中心に 180° 回転させる移動",
            "1つの直線を折り目にして裏返す移動",
            "一定の方向に一定の距離だけずらす移動",
            "1つの点を中心に 90° 回転させる移動",
          ],
          correct: 0,
          why: [
            "点対称移動は、回転移動のうち回す角度が 180° のものです。",
            "これは対称移動です。名前は似ていますが別の移動です。",
            "これは平行移動です。",
            "回転移動ですが、点対称移動は 180° です。",
          ],
          mistakeOf: [null, 2, null, null],
        },
        steps: [
          {
            title: "点を中心に半回転",
            body: "{{点対称移動は 180° の回転移動}}。対称移動は直線を折り目にして裏返す移動です。",
            figure: { ref: { unit: "j-math-1-heimen", section: 1 } },
            back: [{ label: "レクチャー「図形の移動は3種類」", href: `${LEC}#lec-s2` }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "線分 AB の垂直二等分線を直線 ℓ とし、ℓ 上に点 P をとります（P は AB 上にない）。正しいものをすべて選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "垂直二等分線上の点は、両端から等しい距離。",
        answer: {
          kind: "choice",
          options: ["PA＝PB である", "P は線分 AB の中点である", "ℓ と AB は垂直である", "PA＋PB＝AB である"],
          correct: [0, 2],
          why: [
            "垂直二等分線は A、B から等しい距離にある点の集まりなので PA＝PB です。",
            "AB の中点は ℓ と AB の交点だけです。P は AB 上にないので中点ではありません。",
            "垂直二等分線なので、ℓ は AB に垂直です。",
            "P が AB 上にないとき、PA＋PB は AB より長くなります。",
          ],
        },
        steps: [
          {
            title: "垂直二等分線の性質",
            body: "垂直二等分線は {{AB に垂直}} で、その上の点はどれも {{A と B から等しい距離}} にあります。",
            figure: { ref: { unit: "j-math-1-heimen", section: 2 } },
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "線分 AB の垂直二等分線を作図します。正しい手順になるように並べなさい（使わないものが1つあります）。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "A、B を中心に同じ半径の円。交点2つを結ぶ。",
        answer: {
          kind: "order",
          tokens: [
            "点 A を中心に、AB の半分より長い半径の円をかく",
            "点 B を中心に、同じ半径の円をかく",
            "2つの円の交点を直線で結ぶ",
          ],
          distractor: "定規で AB の長さをはかり、真ん中に印をつける",
        },
        steps: [
          {
            title: "作図は定規とコンパスだけ",
            body: "作図では {{定規で長さをはからない}}。等しい距離はコンパスでとります。",
            figure: { ref: { unit: "j-math-1-heimen", section: 2 } },
            back: [{ label: "レクチャー「作図は等しい距離を使う」", href: `${LEC}#lec-s3` }],
          },
        ],
      },
    ],
  },

  // ================= 2 標準：おうぎ形の計算 =================
  {
    id: "j-math-1-heimen/2",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-heimen"],
    title: "おうぎ形の弧の長さと面積",
    lead: "次の問いに答えなさい。ただし、円周率は π とします。π をふくむ答えは、欄のうしろの「π」の前に入る数を答えなさい。",
    style: "calc",
    level: 2,
    points: 20,
    minutes: 12,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "半径 r cm、中心角 a° のおうぎ形の面積を表す式を選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "面積は円の面積 πr² の a/360。",
        answer: {
          kind: "choice",
          options: ["πr² × a/360", "2πr × a/360", "πr² × 360/a", "πr × a/360"],
          correct: 0,
          why: [
            "中心角 a° のおうぎ形は円の a/360 なので、面積は πr²×a/360 です。",
            "2πr は円周です。2πr×a/360 は弧の長さの式です。",
            "割合が逆です。円の何分の1かは a/360 です。",
            "πr は円周でも円の面積でもありません。",
          ],
          mistakeOf: [null, 0, null, null],
        },
        steps: [
          {
            title: "円の何分の1か",
            body: "おうぎ形は円の {{a/360}}。面積は {{πr²}}×a/360、弧の長さは 2πr×a/360 です。",
            figure: { ref: { unit: "j-math-1-heimen", section: 4 } },
            back: [{ label: "レクチャー「おうぎ形は円の何分の1か」", href: `${LEC}#lec-s5` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "半径 8cm、中心角 45° のおうぎ形の弧の長さを求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "45/360＝1/8。円周 16π の 1/8。",
        answer: { kind: "num", answerKind: "num", answer: ["2"], unit: "π cm", calc: "2*8*45/360" },
        steps: [
          {
            title: "円周×割合",
            body: "円周は 2π×8＝16π。45/360＝1/8 なので、弧は 16π×1/8＝{{2π cm}}。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "半径 8cm、中心角 45° のおうぎ形の面積を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "円の面積 64π の 1/8。",
        answer: { kind: "num", answerKind: "num", answer: ["8"], unit: "π cm²", calc: "8^2*45/360" },
        steps: [
          {
            title: "円の面積×割合",
            body: "円の面積は π×8²＝64π。その 1/8 で {{8π cm²}}。",
            trap: "2πr を使って 2π と答える（弧の長さの式）。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "半径 9cm、弧の長さ 4π cm のおうぎ形の中心角を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "弧が円周の何分の1かを出し、360° にかける。",
        answer: { kind: "num", answerKind: "num", answer: ["80"], unit: "°", calc: "4/(2*9)*360" },
        steps: [
          {
            title: "円周の何分の1か",
            body: "半径 9cm の円周は 18π。4π÷18π＝{{2/9}}。",
          },
          {
            title: "360° にかける",
            body: "360°×2/9＝{{80°}}。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "半径 5cm、弧の長さ 6π cm のおうぎ形の面積を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "まず割合（中心角）を求め、円の面積にかける。",
        answer: { kind: "num", answerKind: "num", answer: ["15"], unit: "π cm²", calc: "5^2*(6/(2*5))" },
        steps: [
          {
            title: "割合を求める",
            body: "円周は 10π。6π÷10π＝{{3/5}}（中心角は 216°）。",
          },
          {
            title: "円の面積×割合",
            body: "π×5²×3/5＝{{15π cm²}}。",
            trap: "6π×5 のように、弧の長さと半径をそのままかける（1/2 を忘れる）。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "半径 6cm、中心角 90° のおうぎ形のまわりの長さ（周の長さ）を選びなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "周＝弧＋半径2本。弧だけでは足りない。",
        answer: {
          kind: "choice",
          options: ["(3π＋12) cm", "3π cm", "(3π＋6) cm", "9π cm"],
          correct: 0,
          why: [
            "弧は 2π×6×1/4＝3π。それに半径 6cm を2本たして 3π＋12 です。",
            "弧の長さだけです。おうぎ形の周には2本の半径もふくみます。",
            "半径を1本しかたしていません。",
            "π×6²×1/4＝9π は面積です。",
          ],
          mistakeOf: [null, null, null, 0],
        },
        steps: [
          {
            title: "周は弧と2本の半径",
            body: "弧は 12π×1/4＝3π。周は {{3π＋6＋6＝3π＋12（cm）}}。3π と 12 は1つにまとめられません。",
            trap: "π を 3.14 にして 21.42cm と答える。π のまま答えます。",
          },
        ],
      },
    ],
  },

  // ================= 3 標準：図形の移動 =================
  {
    id: "j-math-1-heimen/3",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-heimen"],
    title: "正方形の中の図形の移動",
    lead: "下の説明の図形について、次の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 20,
    minutes: 12,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "text",
        body:
          "正方形 ABCD がある。頂点は、左上が A、右上が B、右下が C、左下が D である（A→B→C→D は時計回り）。\n" +
          "2本の対角線 AC、BD の交点を O とし、正方形を4つの合同な三角形\n" +
          "ア＝△OAB（上）、イ＝△OBC（右）、ウ＝△OCD（下）、エ＝△ODA（左）\n" +
          "に分ける。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の図形で、アを点 O を中心として回転移動し、ウにぴったり重ねます。回転の角度は何度ですか。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "上の三角形を下へ。半回転で 180°。",
        answer: {
          kind: "choice",
          options: ["90°", "180°", "270°", "360°"],
          correct: 1,
          why: [
            "90° 回すと、アは右のイ（時計回り）か左のエ（反時計回り）に重なります。",
            "上のアを半回転させると、下のウに重なります。",
            "270° 回すと、アはイかエに重なります。",
            "360° 回すと、もとのアにもどります。",
          ],
        },
        steps: [
          {
            title: "A は C へ、B は D へ",
            body: "O を中心に {{180°}} 回すと、A は C、B は D に移り、△OAB は △OCD に重なります。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の図形で、アを1回の移動でウにぴったり重ねることができるものを選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "対角線を軸にした対称移動では、上は横へ移る。",
        answer: {
          kind: "choice",
          options: [
            "点 O を中心とする点対称移動",
            "直線 AC を対称の軸とする対称移動",
            "直線 BD を対称の軸とする対称移動",
            "直線 AB の向きに AB の長さだけ平行移動",
          ],
          correct: 0,
          why: [
            "点対称移動は 180° の回転移動なので、(1) と同じくアはウに重なります。",
            "直線 AC で裏返すと B と D が入れかわり、アは △OAD＝エ に重なります。",
            "直線 BD で裏返すと A と C が入れかわり、アは △OCB＝イ に重なります。",
            "横にずらすと正方形の外に出ます。上のアを下のウに重ねることはできません。",
          ],
          mistakeOf: [null, 2, 2, null],
        },
        steps: [
          {
            title: "点対称移動と対称移動を区別する",
            body: "{{点対称移動＝点 O を中心に 180° 回す}}。直線を折り目に裏返す対称移動とは別の移動です。",
            figure: { ref: { unit: "j-math-1-heimen", section: 1 } },
            back: [{ label: "レクチャー「図形の移動は3種類」", href: `${LEC}#lec-s2` }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の図形で、アを直線 AC を対称の軸として対称移動すると、どの三角形に重なりますか。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "軸上の点 A、O は動かず、B は D へ移る。",
        answer: {
          kind: "choice",
          options: ["イ", "ウ", "エ", "アのまま"],
          correct: 2,
          why: [
            "イに重なるのは、直線 BD を軸に対称移動したときです。",
            "ウに重なるのは、点 O を中心に 180° 回したときです。",
            "A と O は軸上なので動かず、B は D に移ります。△OAB は △OAD＝エ になります。",
            "B が D に移るので、もとの位置にはもどりません。",
          ],
        },
        steps: [
          {
            title: "軸上の点は動かない",
            body: "直線 AC で裏返すと、{{A と O はそのまま、B は D へ}}。△OAB は △OAD（エ）に重なります。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "上の図形で、アを点 O を中心として時計回りに 90° 回転移動すると、どの三角形に重なりますか。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "時計回りに 90° で、A は B へ、B は C へ。",
        answer: {
          kind: "choice",
          options: ["イ", "ウ", "エ"],
          correct: 0,
          why: [
            "時計回りに 90° 回すと A は B、B は C に移るので、△OAB は △OBC＝イ になります。",
            "ウに重なるのは 180° 回したときです。",
            "エに重なるのは、反時計回りに 90° 回したときです。",
          ],
        },
        steps: [
          {
            title: "頂点の行き先を追う",
            body: "A→B→C→D は時計回りの並びなので、時計回りに 90° で {{A は B、B は C}} に移ります。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt:
          "上の図形で、アを対称移動を2回続けてウに重ねたい。どの直線を対称の軸にして、どの順に移動すればよいか、途中でどの三角形に重なるかも書いて説明しなさい。",
        points: 7,
        skill: "思考・判断・表現",
        level: 3,
        point: "AC と BD の2本の対角線を、1回ずつ軸に使う。",
        answer: {
          kind: "written",
          model:
            "まず直線 AC を対称の軸として対称移動すると、アはエ（△OAD）に重なる。\n" +
            "次に直線 BD を対称の軸として対称移動すると、A が C に移るので、エはウ（△OCD）に重なる。\n" +
            "（直線 BD で先に移してイに重ね、次に直線 AC で移してもよい。）",
          rubric: [
            { label: "1回目の軸（AC か BD）と、途中で重なる三角形（エかイ）を正しく書いている", points: 3, keywords: ["直線 AC", "エ"] },
            { label: "2回目に、もう一方の対角線を軸にすることを書いている", points: 3, keywords: ["直線 BD"] },
            { label: "最後にウに重なることを書いている", points: 1, keywords: ["ウ"] },
          ],
        },
        steps: [
          {
            title: "1回ずつ頂点の行き先を追う",
            body: "AC で裏返すと B→D でアは {{エ}}。次に BD で裏返すと A→C でエは {{ウ}}。2本の対角線を1回ずつ使えばよい。",
            trap: "AC で2回裏返して、もとのアにもどってしまう。",
          },
        ],
      },
    ],
  },

  // ================= 4 応用：作図の考え方 =================
  {
    id: "j-math-1-heimen/4",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-heimen"],
    title: "作図の考え方",
    lead: "次の問いに答えなさい。作図はしなくてよい。",
    style: "writing",
    level: 3,
    points: 20,
    minutes: 14,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "直線 ℓ と、ℓ の同じ側に2点 A、B があります。ℓ 上の点 P で、PA＝PB となる点を作図で求めるには、どうすればよいですか。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "A、B から等しい距離＝AB の垂直二等分線。",
        answer: {
          kind: "choice",
          options: [
            "線分 AB の垂直二等分線をかき、ℓ との交点を P とする",
            "A から ℓ に垂線をひき、ℓ との交点を P とする",
            "∠AOB（O は ℓ 上の点）の二等分線をかき、ℓ との交点を P とする",
            "線分 AB の中点を P とする",
          ],
          correct: 0,
          why: [
            "AB の垂直二等分線上の点は PA＝PB。そのうち ℓ 上にある点が P です。",
            "A からの垂線の足は、A に一番近い点です。PA＝PB になるとは限りません。",
            "角の二等分線は、角の2辺から等しい距離の点の集まりです。2点からの距離ではありません。",
            "AB の中点は ℓ 上にありません（A、B は ℓ の同じ側にある）。",
          ],
        },
        steps: [
          {
            title: "「等しい距離」を言いかえる",
            body: "2点 A、B から等しい距離にある点の集まりは {{AB の垂直二等分線}}。それと ℓ の交点が P です。",
            figure: { ref: { unit: "j-math-1-heimen", section: 2 } },
            back: [{ label: "レクチャー「作図は等しい距離を使う」", href: `${LEC}#lec-s3` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "∠XOY の二等分線を作図します。正しい手順になるように並べなさい（使わないものが1つあります）。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "O 中心の円 → 交点2つから同じ半径 → O と結ぶ。",
        answer: {
          kind: "order",
          tokens: [
            "点 O を中心に円をかき、辺 OX、OY との交点を C、D とする",
            "点 C、D をそれぞれ中心に、同じ半径の円をかく",
            "その2つの円の交点 E と点 O を通る直線をひく",
          ],
          distractor: "点 C と点 D を直線で結ぶ",
        },
        steps: [
          {
            title: "O から等しい2点をとる",
            body: "まず O を中心にした円で、2辺上に {{OC＝OD}} となる点をとります。C、D から同じ半径の円をかき、交点と O を結びます。",
            trap: "C と D を結んでしまう。結ぶのは交点 E と O です。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "円 O の周上の点 A を通る接線を作図します。どの直線をかけばよいですか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "接線は、接点を通る半径に垂直。",
        answer: {
          kind: "choice",
          options: [
            "点 A を通り、半径 OA に垂直な直線",
            "線分 OA の垂直二等分線",
            "点 O を通り、半径 OA に垂直な直線",
            "点 A と点 O を通る直線",
          ],
          correct: 0,
          why: [
            "円の接線は接点を通る半径に垂直なので、A を通る OA の垂線が接線です。",
            "OA の垂直二等分線は OA の中点を通り、点 A を通りません。",
            "O を通る直線は円と2点で交わるので、接線ではありません。",
            "直線 OA は円の中心を通り、円と2点で交わります。",
          ],
        },
        steps: [
          {
            title: "接線と半径の関係",
            body: "{{円の接線は、接点を通る半径に垂直}}。だから A を通る OA の垂線をかけば接線になります。",
            figure: { ref: { unit: "j-math-1-heimen", section: 3 } },
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "垂線の作図で 90°、正三角形の作図で 60° の角がつくれます。90° の角の中に 60° の角をつくり、残りの 30° の角を二等分すると、60° の辺と二等分線がつくる角は何度になりますか。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "60°＋30°÷2。",
        answer: { kind: "num", answerKind: "num", answer: ["75"], unit: "°", calc: "60+(90-60)/2" },
        steps: [
          {
            title: "角をたす",
            body: "残りは 90°−60°＝30°。その半分 15° を 60° にたして {{75°}}。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt:
          "△ABC の3つの頂点 A、B、C から等しい距離にある点 O を作図で求めます。どの線を使えばよいかと、その方法で OA＝OB＝OC になる理由を説明しなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "2本の辺の垂直二等分線の交点。等しい距離が2つつながる。",
        answer: {
          kind: "written",
          model:
            "辺 AB の垂直二等分線と、辺 BC の垂直二等分線をかき、その交点を O とする。\n" +
            "O は AB の垂直二等分線上にあるので OA＝OB、BC の垂直二等分線上にあるので OB＝OC。\n" +
            "よって OA＝OB＝OC となる。",
          rubric: [
            { label: "2つの辺の垂直二等分線の交点を使うと書いている", points: 2, keywords: ["垂直二等分線", "交点"] },
            { label: "AB の垂直二等分線上なので OA＝OB と書いている", points: 2, keywords: ["OA=OB"] },
            { label: "BC（または CA）の垂直二等分線上なので OB＝OC（OC＝OA）と書き、OA＝OB＝OC とまとめている", points: 2, keywords: ["OB=OC", "OA=OB=OC"] },
          ],
        },
        steps: [
          {
            title: "2点ずつ等しい距離を考える",
            body: "A、B から等しい距離の点は {{AB の垂直二等分線}} 上、B、C から等しい距離の点は BC の垂直二等分線上。両方にのっている交点が O です。",
            figure: { ref: { unit: "j-math-1-heimen", section: 2 } },
            trap: "角の二等分線を使う。角の二等分線は辺からの距離が等しい点です。",
          },
        ],
      },
    ],
  },
];
