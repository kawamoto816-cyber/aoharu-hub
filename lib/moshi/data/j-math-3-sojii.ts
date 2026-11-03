// 中3数学「相似な図形」の大問。答えは python (sympy) で検算し、scripts/check-moshi.ts でも確かめる。
// 図をかかせる問題は作らない。図の条件は文章で書き、答えは選択・数値・記述で答える。
import type { Daimon } from "../types";

const L = "/learn/lecture/j-math-3-sojii";

export const J_MATH_3_SOJII: Daimon[] = [
  // ======================= 1 基本：相似の性質と相似条件 =======================
  {
    id: "j-math-3-sojii/1",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-sojii"],
    title: "相似な図形の性質と相似条件",
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
        prompt: "相似な2つの図形で、対応する線分の長さの比を何といいますか。漢字で答えなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "対応する線分の比＝相似比。どの組の辺でも同じ比。",
        answer: {
          kind: "term",
          accept: ["相似比"],
          script: "kanji",
          near: [
            { text: "そうじひ", why: "読みは合っています。漢字で「相似比」と書きましょう。" },
            { text: "相似", why: "「相似」は図形どうしの関係の名前。長さの比は「相似比」です。" },
          ],
        },
        steps: [
          {
            title: "相似な図形の2つの性質",
            body: "相似な図形では、{{対応する線分の比はすべて等しく}}、対応する角はそれぞれ等しくなります。この等しい比を{{相似比}}といいます。",
            figure: { ref: { unit: "j-math-3-sojii", section: 0 } },
            back: [{ label: "レクチャー「相似な図形は、辺の比と角が等しい」", href: `${L}#lec-s1` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "△ABC∽△DEF で、AB＝10cm、BC＝8cm、DE＝15cm です。辺 EF の長さを求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "AB と DE、BC と EF が対応。相似比 10:15＝2:3。",
        answer: { kind: "num", answerKind: "num", answer: ["12"], unit: "cm", calc: "8*15/10" },
        steps: [
          {
            title: "対応する辺を記号の順番で見つける",
            body: "△ABC∽△DEF は、A と D、B と E、C と F が対応します。だから {{AB と DE}}、{{BC と EF}} が対応する辺です。",
            trap: "BC と DF を対応させてしまう。∽ の記号は対応する頂点の順に書く。",
          },
          {
            title: "比の式を立てる",
            body: "相似比は AB:DE＝10:15＝{{2:3}}。BC:EF＝2:3 より 8:EF＝2:3、2×EF＝24 なので {{EF＝12cm}}。",
            figure: {
              type: "formula",
              title: "BC:EF＝AB:DE",
              steps: [
                { expr: "8 : EF ＝ 10 : 15", note: "対応する辺の比" },
                { expr: "10 × EF ＝ 8 × 15", note: "外側の積＝内側の積" },
                { expr: "EF ＝ 120 ÷ 10 ＝ {{12}}" },
              ],
            },
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "(2) の △ABC∽△DEF で、∠A＝48°、∠E＝67° のとき、∠C の大きさを求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "∠E は ∠B と等しい。あとは内角の和 180°。",
        answer: { kind: "num", answerKind: "num", answer: ["65"], unit: "°", calc: "180-48-67" },
        steps: [
          {
            title: "対応する角を移す",
            body: "B と E が対応するので {{∠B＝∠E＝67°}}。相似な図形では対応する角は等しいです。",
          },
          {
            title: "三角形の内角の和を使う",
            body: "∠C＝180°−48°−67°＝{{65°}}。",
            trap: "∠E を ∠C と思いこみ、67° と答える。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "△ABC は AB＝6cm、BC＝8cm、∠B＝50°、△PQR は PQ＝9cm、QR＝12cm、∠Q＝50° です。この2つの三角形について正しいものをア〜エから1つ選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 1,
        point: "辺の比 6:9＝8:12＝2:3、その間の角も等しい。",
        answer: {
          kind: "choice",
          options: [
            "3組の辺の比がすべて等しいので相似",
            "2組の辺の比とその間の角がそれぞれ等しいので相似",
            "2組の角がそれぞれ等しいので相似",
            "相似であるとはいえない",
          ],
          correct: 1,
          why: [
            "AC と PR の長さはわかっていないので、3組の辺の比は確かめられない。",
            "AB:PQ＝6:9＝2:3、BC:QR＝8:12＝2:3 で、その間の角 ∠B＝∠Q＝50°。この条件で相似。",
            "等しいとわかっている角は ∠B と ∠Q の1組だけ。2組の角の条件にはならない。",
            "2組の辺の比とその間の角が等しいので、相似であるといえる。",
          ],
        },
        steps: [
          {
            title: "わかっていることを整理する",
            body: "AB:PQ＝6:9＝{{2:3}}、BC:QR＝8:12＝{{2:3}}。等しい角 ∠B と ∠Q は、それぞれ AB と BC、PQ と QR の{{間の角}}です。",
          },
          {
            title: "相似条件にあてはめる",
            body: "「2組の辺の比とその間の角がそれぞれ等しい」にあたるので △ABC∽△PQR です。合同条件の「2辺とその間の角」の辺を、辺の比に変えた形です。",
            figure: { ref: { unit: "j-math-3-sojii", section: 1 } },
            back: [{ label: "レクチャー「三角形の相似条件は3つ」", href: `${L}#lec-s2` }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "次のア〜オのうち、いつも相似になるとは限らない2つの図形を1つ選びなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "形が1通りに決まる図形どうしは、いつも相似。",
        answer: {
          kind: "choice",
          options: ["2つの正三角形", "2つの正方形", "2つの円", "2つの長方形", "2つの直角二等辺三角形"],
          correct: 3,
          why: [
            "角がすべて60°で、辺の比はいつも1:1:1。大きさがちがうだけなので相似。",
            "角はすべて90°で4辺が等しい。拡大・縮小で重なるので相似。",
            "円の形は1通り。半径の比が相似比になり、いつも相似。",
            "角はすべて90°でも、たて:横の比がちがうことがある（例 1:1 と 1:3）。いつも相似とは限らない。",
            "角が45°・45°・90°で、辺の比はいつも 1:1:√2。いつも相似。",
          ],
        },
        steps: [
          {
            title: "形が1通りに決まるかを考える",
            body: "正三角形・正方形・円・直角二等辺三角形は、形が1通りで大きさだけがちがいます。長方形は、角は等しくても{{たてと横の比がいろいろ}}あるので、細長いものと正方形に近いものは相似になりません。",
            trap: "角がすべて等しいから相似と考える。四角形では、角が等しくても辺の比が等しいとは限らない。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "△ABC∽△DEF のとき、辺 CA に対応する辺をア〜ウから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "C→F、A→D と頂点を1つずつ移す。",
        answer: {
          kind: "choice",
          options: ["FD", "EF", "DE"],
          correct: 0,
          why: [
            "C と F、A と D が対応するので、CA に対応するのは FD。",
            "EF は BC に対応する辺。",
            "DE は AB に対応する辺。",
          ],
          mistakeOf: [null, 2, 2],
        },
        steps: [
          {
            title: "記号の順番どおりに対応させる",
            body: "△ABC∽△DEF は、1番目どうし A と D、2番目どうし B と E、3番目どうし C と F が対応します。CA は C→A なので {{F→D、つまり FD}} です。",
          },
        ],
      },
    ],
  },

  // ======================= 2 標準：平行線と線分の比 =======================
  {
    id: "j-math-3-sojii/2",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-sojii"],
    title: "平行線と線分の比",
    lead: "次の問いに答えなさい。",
    style: "calc",
    level: 2,
    points: 24,
    minutes: 13,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "text",
        body: "(1)・(2) は、△ABC の辺 AB 上に点 D、辺 AC 上に点 E があり、DE∥BC である図形について答えます。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の図形で、AD＝6cm、DB＝3cm、AE＝8cm のとき、EC の長さを求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "DE∥BC なら AD:DB＝AE:EC。",
        answer: { kind: "num", answerKind: "num", answer: ["4"], unit: "cm", calc: "8*3/6" },
        steps: [
          {
            title: "平行線は2辺を同じ比に分ける",
            body: "DE∥BC なので {{AD:DB＝AE:EC}}。6:3＝8:EC より 6×EC＝24、{{EC＝4cm}}。",
            figure: { ref: { unit: "j-math-3-sojii", section: 2 } },
            back: [{ label: "レクチャー「平行線は、辺を同じ比に分ける」", href: `${L}#lec-s3` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の図形で、AD＝6cm、DB＝3cm、BC＝15cm のとき、DE の長さとして正しいものをア〜エから1つ選びなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "DE:BC は AD:DB ではなく AD:AB。",
        answer: {
          kind: "choice",
          options: ["10cm", "30cm", "5cm", "7.5cm"],
          correct: 0,
          why: [
            "△ADE∽△ABC で DE:BC＝AD:AB＝6:9＝2:3。DE＝15×2/3＝10cm。",
            "DE:BC＝AD:DB＝6:3 として計算した。DE と BC は △ADE と △ABC の辺なので、くらべるのは AD と AB。",
            "DE:BC＝DB:AB＝3:9 として計算した。DE に対応するのは AD で、DB ではない。",
            "D が中点だと思って BC の半分にした。AD:DB＝2:1 なので中点ではない。",
          ],
          mistakeOf: [null, 1, null, null],
        },
        steps: [
          {
            title: "相似な三角形を見つける",
            body: "DE∥BC なので同位角が等しく、{{△ADE∽△ABC}}。対応する辺は AD と AB、DE と BC です。",
            trap: "AD:DB を使ってしまう。DE:BC に使えるのは AD:AB。",
          },
          {
            title: "AB 全体の長さで比をとる",
            body: "AB＝6＋3＝9cm。AD:AB＝6:9＝{{2:3}} なので DE＝15×2/3＝{{10cm}}。",
            figure: {
              type: "formula",
              title: "DE:BC＝AD:AB",
              steps: [
                { expr: "DE : 15 ＝ 6 : {{9}}", note: "AB＝6＋3" },
                { expr: "9 × DE ＝ 90" },
                { expr: "DE ＝ {{10}}" },
              ],
            },
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "AB＝10cm、BC＝12cm、CA＝8cm の △ABC で、辺 AB、BC、CA の中点をそれぞれ D、E、F とします。△DEF の周の長さを求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "中点連結定理で、△DEF の各辺はもとの辺の半分。",
        answer: { kind: "num", answerKind: "num", answer: ["15"], unit: "cm", calc: "(10+12+8)/2" },
        steps: [
          {
            title: "中点連結定理を3回使う",
            body: "D、F は AB、CA の中点なので {{DF＝BC÷2＝6cm}}。同じように DE＝CA÷2＝4cm、EF＝AB÷2＝5cm。",
            back: [{ label: "レクチャー「平行線は、辺を同じ比に分ける」（中点連結定理）", href: `${L}#lec-s3` }],
          },
          {
            title: "たして周の長さ",
            body: "6＋4＋5＝{{15cm}}。もとの周 30cm のちょうど半分になります。",
            trap: "各辺の対応をまちがえても周の長さは同じになるが、1つずつ確かめる習慣を。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "平行な3本の直線 ℓ、m、n に、2本の直線 p、q が交わっています。直線 p では、ℓ と m の間が 4cm、m と n の間が 6cm です。直線 q では、ℓ と n の間が 15cm です。直線 q の ℓ と m の間の長さを求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "平行線で切られた線分の比は、p でも q でも 4:6。",
        answer: { kind: "num", answerKind: "num", answer: ["6"], unit: "cm", equations: ["6x=4(15-x)"] },
        steps: [
          {
            title: "比は直線 p と同じ",
            body: "平行な3直線に切られる線分の比は等しいので、直線 q でも {{4:6＝2:3}} に分かれます。",
          },
          {
            title: "全体 15cm を 2:3 に分ける",
            body: "15cm を 2:3 に分けると 15×2/5＝{{6cm}}（残りは 9cm）。",
            trap: "15×4/6 のように、全体を部分の比で計算してしまう。全体は 2＋3＝5 にあたる。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "線分 AD と線分 BC が点 O で交わり、AB∥CD です。AB＝8cm、CD＝12cm、OA＝6cm のとき、△OAB∽△ODC であることを証明し、OD の長さを求めなさい。",
        points: 8,
        skill: "思考・判断・表現",
        level: 3,
        point: "平行線の錯角2組（または錯角と対頂角）で2組の角。",
        answer: {
          kind: "written",
          model:
            "△OAB と △ODC において\n" +
            "AB∥CD より、錯角は等しいから ∠OAB＝∠ODC …①\n" +
            "対頂角は等しいから ∠AOB＝∠DOC …②\n" +
            "①、② より、2組の角がそれぞれ等しいから △OAB∽△ODC\n" +
            "相似比は AB:DC＝8:12＝2:3 なので OA:OD＝2:3\n" +
            "6:OD＝2:3 より OD＝9\n" +
            "答え　OD＝9cm",
          rubric: [
            { label: "AB∥CD から錯角が等しい角の組を1つ正しく書いている", points: 2, keywords: ["錯角", "∠OAB＝∠ODC"] },
            { label: "もう1組の等しい角（対頂角、または錯角 ∠OBA＝∠OCD）を根拠つきで書いている", points: 2, keywords: ["対頂角", "∠AOB＝∠DOC"] },
            { label: "「2組の角がそれぞれ等しい」と相似条件を書き、△OAB∽△ODC と結論している", points: 2, keywords: ["2組の角", "△OAB∽△ODC"] },
            { label: "OA:OD＝AB:DC から OD＝9cm を求めている", points: 2, keywords: ["2:3", "9"] },
          ],
          autoPart: { kind: "num", answerKind: "num", answer: ["9"], labels: ["OD ="], unit: "cm", calc: "6*12/8" },
        },
        steps: [
          {
            title: "等しい角を2組さがす",
            body: "A、O、D は一直線、B、O、C も一直線です。AB∥CD なので {{錯角 ∠OAB＝∠ODC}}。O で交わる2直線の{{対頂角 ∠AOB＝∠DOC}} も等しいです。",
            trap: "∠OAB と ∠OCD を組にする。A と対応するのは、AB∥CD の錯角の位置にある D。",
          },
          {
            title: "相似条件を書いて結論",
            body: "2組の角がそれぞれ等しいので △OAB∽△ODC。証明では、使った相似条件を{{ことばで}}書きます。",
            back: [{ label: "レクチャー「三角形の相似条件は3つ」", href: `${L}#lec-s2` }],
          },
          {
            title: "相似比で OD を求める",
            body: "AB:DC＝8:12＝{{2:3}}。OA と OD が対応するので 6:OD＝2:3、{{OD＝9cm}}。",
          },
        ],
      },
    ],
  },

  // ======================= 3 標準：面積比・体積比 =======================
  {
    id: "j-math-3-sojii/3",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-sojii"],
    title: "相似な図形の面積比と体積比",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 22,
    minutes: 12,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "相似比が 2:5 の2つの図形の面積比として正しいものをア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "面積比は相似比の2乗。",
        answer: {
          kind: "choice",
          options: ["2:5", "4:25", "8:125", "4:10"],
          correct: 1,
          why: [
            "相似比そのまま。面積は長さを2回かけた量なので、比も2乗する。",
            "2²:5²＝4:25。面積比は相似比の2乗。",
            "3乗は体積比。面積なら2乗。",
            "2:5 の両方を2倍しただけで、比は 2:5 と同じ。2乗とは別物。",
          ],
          mistakeOf: [0, null, null, null],
        },
        steps: [
          {
            title: "面積は2乗、体積は3乗",
            body: "相似比が m:n なら {{面積比は m²:n²}}。2²:5²＝{{4:25}} です。",
            figure: { ref: { unit: "j-math-3-sojii", section: 3 } },
            back: [{ label: "レクチャー「面積比は2乗、体積比は3乗」", href: `${L}#lec-s4` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "相似比が 3:4 の相似な2つの三角形があります。小さいほうの面積が 27cm² のとき、大きいほうの面積を求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "面積比 9:16。27 は 9 の3倍。",
        answer: { kind: "num", answerKind: "num", answer: ["48"], unit: "cm²", calc: "27*16/9" },
        steps: [
          {
            title: "面積比を出す",
            body: "相似比 3:4 なので面積比は {{9:16}}。",
            trap: "相似比のまま 27×4/3＝36 とする。",
          },
          {
            title: "比の式で求める",
            body: "27:S＝9:16 より 9S＝432、{{S＝48cm²}}。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "△ABC の辺 AB 上に点 D、辺 AC 上に点 E があり、DE∥BC、AD:DB＝3:2 です。△ADE の面積が 18cm² のとき、四角形 DBCE の面積を求めなさい。",
        points: 5,
        skill: "思考・判断・表現",
        level: 2,
        point: "相似比は AD:AB＝3:5。面積比 9:25 から △ADE をひく。",
        answer: { kind: "num", answerKind: "num", answer: ["32"], unit: "cm²", calc: "18*25/9-18" },
        steps: [
          {
            title: "相似比は AD:AB",
            body: "△ADE∽△ABC で、相似比は AD:AB＝3:(3＋2)＝{{3:5}}。AD:DB の 3:2 ではありません。",
            trap: "3:2 を相似比にして面積比 9:4 とする。",
          },
          {
            title: "△ABC の面積を出してからひく",
            body: "面積比 9:25 なので △ABC＝18×25/9＝50cm²。四角形 DBCE＝50−18＝{{32cm²}}。",
            figure: {
              type: "area",
              kind: "bar",
              title: "△ABC の面積 25 のうち",
              bars: [
                {
                  label: "面積の比",
                  parts: [
                    { value: 9, label: "△ADE 9", tone: "blue" },
                    { value: 16, label: "四角形 DBCE 16", tone: "yellow" },
                  ],
                  total: "25",
                },
              ],
              note: "9 にあたるのが 18cm² なので、1 にあたるのは 2cm²。16 は 32cm²。",
            },
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "相似な2つの円柱 A、B があり、高さはそれぞれ 4cm、6cm です。A の体積が 48cm³ のとき、B の体積を求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "相似比 2:3、体積比 8:27。",
        answer: { kind: "num", answerKind: "num", answer: ["162"], unit: "cm³", calc: "48*27/8" },
        steps: [
          {
            title: "高さの比が相似比",
            body: "高さ 4:6＝{{2:3}} が相似比。体積比は 2³:3³＝{{8:27}}。",
            trap: "面積比の 4:9 を使って 108cm³ とする。",
          },
          {
            title: "比で求める",
            body: "48:V＝8:27 より V＝48×27/8＝{{162cm³}}。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "相似な2つの立体 P、Q があり、表面積の比は 9:16 です。P の体積が 54cm³ のとき、Q の体積を求めなさい。考え方も書きなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "表面積比→相似比→体積比の順にもどってから進む。",
        answer: {
          kind: "written",
          model:
            "表面積の比 9:16＝3²:4² なので、相似比は 3:4\n" +
            "体積比は 3³:4³＝27:64\n" +
            "54:V＝27:64 より V＝54×64/27＝128\n" +
            "答え　128cm³",
          rubric: [
            { label: "表面積比 9:16 から相似比 3:4 を求めている", points: 2, keywords: ["3:4"] },
            { label: "体積比を 27:64 としている", points: 2, keywords: ["27:64"] },
            { label: "体積 128cm³ を正しく求めている", points: 2, keywords: ["128"] },
          ],
          autoPart: { kind: "num", answerKind: "num", answer: ["128"], unit: "cm³", calc: "54*64/27" },
        },
        steps: [
          {
            title: "表面積比から相似比にもどす",
            body: "表面積は面積なので、比は相似比の2乗です。9:16＝3²:4² より {{相似比は 3:4}}。",
            trap: "9:16 をそのまま3乗したり、9:16 を体積比と考えたりする。",
          },
          {
            title: "相似比を3乗して体積比",
            body: "体積比は {{27:64}}。54×64/27＝{{128cm³}}。",
            back: [{ label: "レクチャー「面積比は2乗、体積比は3乗」", href: `${L}#lec-s4` }],
          },
        ],
      },
    ],
  },

  // ======================= 4 応用：相似の利用と証明 =======================
  {
    id: "j-math-3-sojii/4",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-sojii"],
    title: "相似の利用",
    lead: "次の問いに答えなさい。",
    style: "word",
    level: 3,
    points: 22,
    minutes: 14,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "縮尺 1/50000 の地図上で 3.2cm の道のりは、実際には何 km ですか。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "実際の長さ＝地図の長さ×50000。cm を km に直す。",
        answer: { kind: "num", answerKind: "num", answer: ["8/5"], unit: "km", calc: "3.2*50000/100000" },
        steps: [
          {
            title: "地図は実際の土地の縮図",
            body: "縮尺 1/50000 は、相似比 1:50000 ということ。実際は 3.2×50000＝{{160000cm}}。",
          },
          {
            title: "単位を直す",
            body: "1km＝100000cm なので 160000cm＝{{1.6km}}。",
            trap: "1km＝1000cm と考えて 160km とする。1m＝100cm、1km＝1000m なので 1km＝100000cm。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "木から 20m はなれた地点 P に立ち、目の位置から木の先を見上げました。このようすを縮尺 1/400 の縮図にかくと、P から木の根もとまでが 5cm、目の高さから木の先までの高さが 3.2cm でした。目の高さを 1.5m とすると、木の高さは何 m ですか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "縮図の 3.2cm を 400倍。最後に目の高さをたす。",
        answer: { kind: "num", answerKind: "num", answer: ["143/10"], unit: "m", calc: "3.2*400/100+1.5" },
        steps: [
          {
            title: "縮図から実際の長さへ",
            body: "縮図は実際と相似で相似比 1:400。3.2cm×400＝1280cm＝{{12.8m}}。これは{{目の高さから上}}の部分です。",
          },
          {
            title: "目の高さをたす",
            body: "12.8＋1.5＝{{14.3m}}。",
            trap: "目の高さ 1.5m をたし忘れて 12.8m とする。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "平行四辺形 ABCD の辺 AD 上に、AE:ED＝2:1 となる点 E をとり、線分 BE と対角線 AC の交点を F とします。AF:FC として正しいものをア〜エから1つ選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "AD∥BC で △AEF∽△CBF。AE:CB をくらべる。",
        answer: {
          kind: "choice",
          options: ["2:3", "2:1", "1:2", "1:1"],
          correct: 0,
          why: [
            "△AEF∽△CBF で、AE:CB＝2:3（CB＝AD＝2＋1＝3）。だから AF:FC＝2:3。",
            "AE:ED をそのまま答えている。F は AC を分ける点で、くらべるのは AE と CB。",
            "AE:ED を逆にした比。△AEF と △CBF の対応する辺 AE と CB をくらべる。",
            "F が AC の中点になるのは E が D と重なるときなど。ここでは AE と CB の長さがちがう。",
          ],
          mistakeOf: [null, 1, null, null],
        },
        steps: [
          {
            title: "相似な三角形を見つける",
            body: "AD∥BC なので、錯角が等しく ∠EAF＝∠BCF、∠AEF＝∠CBF。{{△AEF∽△CBF}} です。",
          },
          {
            title: "対応する辺の比",
            body: "AD＝BC で、AD を 3 とすると AE＝2、CB＝3。{{AF:FC＝AE:CB＝2:3}}。",
            trap: "AE:ED＝2:1 を答えにする。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "(3) で、△AEF の面積が 8cm² のとき、△CBF の面積を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        dependsOn: "3",
        point: "相似比 2:3 なので面積比 4:9。",
        answer: { kind: "num", answerKind: "num", answer: ["18"], unit: "cm²", calc: "8*9/4" },
        steps: [
          {
            title: "面積比は2乗",
            body: "△AEF∽△CBF で相似比 2:3、面積比は {{4:9}}。8×9/4＝{{18cm²}}。",
            trap: "相似比のまま 8×3/2＝12 とする。",
            back: [{ label: "レクチャー「面積比は2乗、体積比は3乗」", href: `${L}#lec-s4` }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "∠A＝90° の直角三角形 ABC で、頂点 A から辺 BC に垂線 AH をひきます。△ABC∽△HBA であることを証明し、AB＝6cm、BC＝10cm のとき、BH の長さを求めなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "∠B が共通、直角どうし。2組の角で相似。",
        answer: {
          kind: "written",
          model:
            "△ABC と △HBA において\n" +
            "∠BAC＝∠BHA＝90° …①\n" +
            "∠B は共通 …②\n" +
            "①、② より、2組の角がそれぞれ等しいから △ABC∽△HBA\n" +
            "よって AB:HB＝BC:BA\n" +
            "6:BH＝10:6 より 10×BH＝36、BH＝18/5\n" +
            "答え　18/5cm（3.6cm）",
          rubric: [
            { label: "∠BAC＝∠BHA＝90° を書いている", points: 1, keywords: ["90°"] },
            { label: "∠B が共通であることを書いている", points: 1, keywords: ["共通"] },
            { label: "2組の角がそれぞれ等しいので △ABC∽△HBA と結論している", points: 2, keywords: ["2組の角", "△ABC∽△HBA"] },
            { label: "対応する辺の比から BH＝18/5cm（3.6cm）を求めている", points: 2, keywords: ["10:6", "18/5", "3.6"] },
          ],
          autoPart: { kind: "num", answerKind: "num", answer: ["18/5"], labels: ["BH ="], unit: "cm", calc: "6*6/10" },
        },
        steps: [
          {
            title: "等しい角を2組",
            body: "直角どうし {{∠BAC＝∠BHA＝90°}}、そして2つの三角形の{{共通な角 ∠B}}。2組の角がそれぞれ等しいので相似です。",
            back: [{ label: "レクチャー「三角形の相似条件は3つ」", href: `${L}#lec-s2` }],
          },
          {
            title: "対応を順番どおりに",
            body: "△ABC∽△HBA は A↔H、B↔B、C↔A。だから AB と HB、BC と BA が対応し、{{AB:HB＝BC:BA}}。",
            trap: "AB:BH＝BH:BC のように対応をずらす。記号の順番で確かめる。",
          },
          {
            title: "計算する",
            body: "6:BH＝10:6 より BH＝36/10＝{{18/5cm}}（3.6cm）。",
          },
        ],
      },
    ],
  },
];
