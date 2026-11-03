// 中2数学「平行と合同」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

const U = "j-math-2-heiko-godo";
const L = (n: number, label: string) => ({ label: `レクチャー「${label}」`, href: `/learn/lecture/${U}#lec-s${n}` });

export const J_MATH_2_HEIKO_GODO: Daimon[] = [
  // ======================= 1 基本：角の大きさ =======================
  {
    id: "j-math-2-heiko-godo/1",
    subject: "math",
    grade: "中2",
    units: [U],
    title: "平行線と多角形の角",
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
        prompt:
          "平行な2直線 ℓ、m に直線 n が交わっている。n と ℓ の交わる所にできる角 ∠a は 58° で、n と m の交わる所にできる角 ∠b は ∠a の錯角である。∠b のとなりにあって、∠b と合わせて一直線（180°）になる角 ∠c は何度ですか。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "平行線の錯角は等しい。となりの角とは合わせて180°。",
        answer: { kind: "num", answerKind: "num", answer: ["122"], unit: "°", calc: "180-58" },
        steps: [
          {
            title: "錯角から ∠b を出す",
            body: "ℓ∥m なので、{{平行線の錯角は等しい}}から ∠b＝∠a＝58°。",
            figure: { ref: { unit: U, section: 0 } },
            back: [L(1, "対頂角・同位角・錯角")],
          },
          {
            title: "一直線は180°",
            body: "∠b と ∠c は合わせて一直線なので ∠c＝180°−58°＝{{122°}}。",
            trap: "∠c も錯角だと思って 58° と答える。∠c は ∠b のとなりの角。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "△ABC で ∠A＝48°、∠B＝67° のとき、頂点 C における外角は何度ですか。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "外角＝となり合わない2つの内角の和。",
        answer: { kind: "num", answerKind: "num", answer: ["115"], unit: "°", calc: "48+67" },
        steps: [
          {
            title: "となり合わない2つの内角をたす",
            body: "C の外角は、C ととなり合わない ∠A と ∠B の和に等しいので 48°＋67°＝{{115°}}。",
            figure: { ref: { unit: U, section: 1 } },
            trap: "∠C＝180°−115°＝65° を求めて、それを答えにしてしまう。問われているのは外角。",
            back: [L(2, "三角形の内角の和が180°になるわけ")],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "十一角形の内角の和は何度ですか。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "n 角形の内角の和は 180°×(n−2)。",
        answer: { kind: "num", answerKind: "num", answer: ["1620"], unit: "°", calc: "180*(11-2)" },
        steps: [
          {
            title: "三角形いくつに分けられるか",
            body: "1つの頂点から対角線をひくと、十一角形は {{11−2＝9個}}の三角形に分けられます。",
            figure: { ref: { unit: U, section: 2 } },
            back: [L(3, "多角形の内角の和と外角の和")],
          },
          {
            title: "180° をかける",
            body: "180°×9＝{{1620°}}。",
            trap: "180°×11＝1980° としてしまう。三角形の数は n ではなく n−2。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "正十五角形の1つの内角は何度ですか。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "先に1つの外角 360°÷15 を出すと速い。",
        answer: { kind: "num", answerKind: "num", answer: ["156"], unit: "°", calc: "180-360/15" },
        steps: [
          {
            title: "外角から求める",
            body: "外角の和はいつも360°なので、正十五角形の1つの外角は 360°÷15＝{{24°}}。",
            back: [L(3, "多角形の内角の和と外角の和")],
          },
          {
            title: "内角＝180°−外角",
            body: "1つの頂点で内角と外角を合わせると180°なので、内角は 180°−24°＝{{156°}}。内角の和 180°×13＝2340° を15でわっても同じです。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "七角形の内角の和と外角の和の組み合わせとして正しいものを、ア〜エから1つ選びなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "内角の和は角の数で変わり、外角の和は360°で変わらない。",
        answer: {
          kind: "choice",
          options: ["内角の和 900°、外角の和 360°", "内角の和 900°、外角の和 900°", "内角の和 1260°、外角の和 360°", "内角の和 900°、外角の和 180°"],
          correct: 0,
          why: [
            "内角の和は 180°×(7−2)＝900°、外角の和はどの多角形でも360°なので正しい。",
            "外角の和を内角と同じ 180°×(n−2) で計算している。外角の和はいつも360°。",
            "180°×7＝1260° と、n−2 ではなく n をかけている。",
            "外角の和は180°ではなく360°。1つの頂点の内角と外角の和（180°）と混同している。",
          ],
          mistakeOf: [null, 3, null, null],
        },
        steps: [
          {
            title: "内角の和と外角の和を区別する",
            body: "内角の和は 180°×(7−2)＝{{900°}}。外角の和は何角形でも{{360°}}です。",
            figure: { ref: { unit: U, section: 2 } },
            trap: "外角の和も角の数によって変わると思いこむ。",
          },
        ],
      },
    ],
  },

  // ======================= 2 標準：補助線と内角の和の証明 =======================
  {
    id: "j-math-2-heiko-godo/2",
    subject: "math",
    grade: "中2",
    units: [U],
    title: "補助線で角を求める",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 20,
    minutes: 12,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "text",
        body:
          "【証明】三角形の内角の和が180°であることの証明\n" +
          "△ABC の辺 BC を C の方へのばした直線上に点 D をとり、頂点 C を通り辺 BA に平行な直線 CE をひく。\n" +
          "BA∥CE だから\n" +
          "∠BAC＝∠ACE（ ア は等しい）…①\n" +
          "∠ABC＝∠ECD（ イ は等しい）…②\n" +
          "①、②より ∠BAC＋∠ABC＝∠ACE＋∠ECD＝∠ACD …③\n" +
          "∠ACB＋∠ACD＝180° だから ∠BAC＋∠ABC＋∠ACB＝180°",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt:
          "平行な2直線 ℓ、m の間に点 P がある。ℓ 上の点 A、m 上の点 B と P を結ぶ。P は A、B より右側にあり、線分 AP と直線 ℓ（A より右の部分）のつくる角が 35°、線分 BP と直線 m（B より右の部分）のつくる角が 48° である。∠APB（左に開いた角）は何度ですか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "P を通り ℓ に平行な補助線をひき、錯角を2つ移す。",
        answer: { kind: "num", answerKind: "num", answer: ["83"], unit: "°", calc: "35+48" },
        steps: [
          {
            title: "P を通る平行線をひく",
            body: "P を通り ℓ（と m）に平行な直線をひくと、∠APB はその直線で上下2つの角に分かれます。",
            figure: {
              type: "formula",
              title: "補助線で ∠APB を分ける",
              prose: true,
              steps: [
                { expr: "P を通り ℓ に平行な直線をひく", note: "補助線" },
                { expr: "上の角＝35°（ℓ との {{錯角}}）", note: "平行線の錯角" },
                { expr: "下の角＝48°（m との {{錯角}}）", note: "平行線の錯角" },
                { expr: "∠APB＝35°＋48°＝{{83°}}" },
              ],
            },
            back: [L(1, "対頂角・同位角・錯角")],
          },
          {
            title: "2つをたす",
            body: "35°＋48°＝{{83°}}。",
            trap: "180°−(35°＋48°)＝97° としてしまう。三角形はできていない。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "(1) で、P を通る補助線と ℓ のあいだで角を移すときに使った根拠として正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "Zの形に向かい合う角＝錯角。平行が仮定にあるから使える。",
        answer: {
          kind: "choice",
          options: ["対頂角は等しい", "平行線の錯角は等しい", "三角形の内角の和は180°", "2直線が交わると、同位角はいつも等しい"],
          correct: 1,
          why: [
            "対頂角は、交わる2直線の向かい合う角。ここでは ℓ と補助線という平行な2直線の角を移している。",
            "ℓ∥補助線 なので、Zの形の位置にある錯角が等しい。正しい根拠。",
            "(1) の図には三角形はできていない。",
            "同位角が等しいのは2直線が平行のときだけ。「いつも」は誤り。",
          ],
          mistakeOf: [null, null, null, 0],
        },
        steps: [
          {
            title: "角の位置と平行の仮定を確かめる",
            body: "移した2つの角は、平行な2直線（ℓ と補助線）にはさまれて{{Zの形}}に向かい合うので錯角です。錯角が等しいといえるのは{{平行だから}}です。",
            back: [L(1, "対頂角・同位角・錯角")],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の【証明】の ア にあてはまる語を漢字で答えなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "∠BAC と ∠ACE は、AC をはさんでZの形。",
        answer: { kind: "term", accept: ["錯角"], script: "kanji", near: [{ text: "同位角", why: "∠BAC と ∠ACE は AC をはさんで内側でZの形に向かい合うので錯角。同位角は イ。" }] },
        steps: [
          {
            title: "直線 AC を交わる直線とみる",
            body: "平行な BA と CE に直線 AC が交わっています。∠BAC と ∠ACE は内側で Z の形に向かい合うので{{錯角}}です。",
            figure: { ref: { unit: U, section: 1 } },
            back: [L(2, "三角形の内角の和が180°になるわけ")],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "上の【証明】の イ にあてはまる語を、ア〜ウから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "BD を交わる直線とみると、B と C で同じ位置の角。",
        answer: {
          kind: "choice",
          options: ["対頂角", "同位角", "錯角"],
          correct: 1,
          why: [
            "対頂角は交わる2直線の向かい合う角。∠ABC と ∠ECD は別の点にある角。",
            "平行な BA と CE に直線 BD が交わり、B と C で同じ位置にある角なので同位角。",
            "錯角は2直線の内側でZの形の角。∠ECD は外側（D の方）にある。",
          ],
        },
        steps: [
          {
            title: "直線 BD を交わる直線とみる",
            body: "BA∥CE に直線 BD が交わっています。∠ABC と ∠ECD は、どちらも交わる点から見て{{同じ位置}}（BA・CE の上側で D の方）にある角なので{{同位角}}です。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "【証明】の③ ∠BAC＋∠ABC＝∠ACD からわかる三角形の性質として正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "∠ACD は C の外角。外角＝となり合わない2内角の和。",
        answer: {
          kind: "choice",
          options: [
            "三角形の1つの外角は、それととなり合わない2つの内角の和に等しい",
            "三角形の1つの外角は、それととなり合う内角に等しい",
            "三角形の外角の和は180°である",
            "三角形の2つの内角の和は、いつも90°より大きい",
          ],
          correct: 0,
          why: [
            "∠ACD は C の外角で、C ととなり合わない ∠A と ∠B の和に等しい。正しい。",
            "外角ととなり合う内角は、合わせて180°。等しいわけではない。",
            "三角形の外角の和は（1つの頂点に1つずつとると）360°。",
            "③ からはいえない。鈍角三角形では2つの内角の和が90°より小さいこともある。",
          ],
        },
        steps: [
          {
            title: "∠ACD がどの角かを見る",
            body: "∠ACD は辺 BC をのばしてできた角なので{{頂点 C の外角}}です。③ は「外角＝となり合わない2つの内角の和」を表しています。",
            back: [L(2, "三角形の内角の和が180°になるわけ")],
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "△ABC で ∠A＝x＋20°、∠B＝2x、頂点 C における外角が 110° のとき、x の値を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "(5) の性質で方程式 (x＋20)＋2x＝110 をつくる。",
        answer: { kind: "num", answerKind: "num", answer: ["30"], labels: ["x ="], unit: "°", equations: ["(x+20)+2x=110"] },
        steps: [
          {
            title: "外角の性質で式をつくる",
            body: "C の外角は ∠A＋∠B に等しいので {{(x＋20)＋2x＝110}}。",
            trap: "(x＋20)＋2x＋110＝180 と、外角を内角のように扱う。",
          },
          {
            title: "解く",
            body: "3x＝90 より x＝{{30}}。∠A＝50°、∠B＝60° で、たすと110°になり正しい。",
          },
        ],
      },
    ],
  },

  // ======================= 3 標準：合同条件を見ぬく =======================
  {
    id: "j-math-2-heiko-godo/3",
    subject: "math",
    grade: "中2",
    units: [U],
    title: "三角形の合同条件",
    lead: "次の問いに答えなさい。",
    style: "word",
    level: 2,
    points: 20,
    minutes: 10,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt:
          "△ABC と △DEF で、BC＝EF、∠B＝∠E、∠A＝∠D であることがわかっている。この2つの三角形について正しいものを、ア〜エから1つ選びなさい。",
        points: 5,
        skill: "思考・判断・表現",
        level: 3,
        point: "2つの角が等しければ、残りの角も等しい（内角の和）。",
        answer: {
          kind: "choice",
          options: [
            "∠C＝∠F もいえるので「1組の辺とその両端の角」で合同",
            "「2組の辺とその間の角」で合同",
            "等しい角が辺 BC の両端にないので、合同とはいえない",
            "3つの角が等しいことしかわからないので、合同とはいえない",
          ],
          correct: 0,
          why: [
            "内角の和が180°なので ∠C＝180°−∠A−∠B＝∠F。BC の両端の角 ∠B、∠C が等しいので合同。",
            "等しいとわかっている辺は BC と EF の1組だけ。",
            "∠A＝∠D と ∠B＝∠E から ∠C＝∠F が導けるので、BC の両端の角はそろう。",
            "辺 BC＝EF もわかっている。辺が1組でも等しければ、大きさも決まる。",
          ],
        },
        steps: [
          {
            title: "残りの角を求める",
            body: "∠C＝180°−(∠A＋∠B)、∠F＝180°−(∠D＋∠E) なので {{∠C＝∠F}} です。",
            back: [L(2, "三角形の内角の和が180°になるわけ")],
          },
          {
            title: "辺の両端の角を見る",
            body: "BC の両端の角は ∠B と ∠C。これがそれぞれ等しいので、{{1組の辺とその両端の角}}がそれぞれ等しく、合同です。",
            figure: { ref: { unit: U, section: 3 } },
            back: [L(4, "三角形の合同条件は3つ")],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "△ABC と △DEF で、次のことがわかっているとき、△ABC≡△DEF がいえるものを、ア〜オからすべて選びなさい。",
        points: 6,
        skill: "知識・技能",
        level: 2,
        point: "角が2辺の「間」にあるか、辺の「両端」にあるか。",
        answer: {
          kind: "choice",
          options: [
            "AB＝DE、BC＝EF、∠B＝∠E",
            "AB＝DE、BC＝EF、∠C＝∠F",
            "BC＝EF、∠B＝∠E、∠C＝∠F",
            "∠A＝∠D、∠B＝∠E、∠C＝∠F",
            "AB＝DE、BC＝EF、CA＝FD",
          ],
          correct: [0, 2, 4],
          why: [
            "∠B は辺 AB と BC の間の角。2組の辺とその間の角で合同。",
            "∠C は AB と BC の間の角ではない。形のちがう三角形が2通りできることがあり、合同とはいえない。",
            "∠B と ∠C は辺 BC の両端の角。1組の辺とその両端の角で合同。",
            "角だけでは大きさが決まらない。形は同じでも大きさのちがう三角形がある。",
            "3組の辺がそれぞれ等しいので合同。",
          ],
          mistakeOf: [null, 1, null, null, null],
        },
        steps: [
          {
            title: "3つの合同条件にあてはめる",
            body: "ア は{{2組の辺と間の角}}、ウ は{{1組の辺と両端の角}}、オ は{{3組の辺}}。",
            figure: { ref: { unit: U, section: 3 } },
            back: [L(4, "三角形の合同条件は3つ")],
          },
          {
            title: "あてはまらないものを確かめる",
            body: "イ の ∠C は辺 AB と BC の間にありません。エ は角だけで、辺の長さが1つもわかりません。",
            trap: "「2組の辺と1つの角」で合同とする。角は2辺の間でないといけない。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "△ABC と △PQR で、AB＝QR、BC＝RP、CA＝PQ である。この2つの三角形が合同であることを、記号 ≡ を使って正しく表したものを、ア〜エから1つ選びなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "等しい辺から、頂点の対応を1つずつ決める。",
        answer: {
          kind: "choice",
          options: ["△ABC≡△PQR", "△ABC≡△QRP", "△ABC≡△RPQ", "△ABC≡△QPR"],
          correct: 1,
          why: [
            "文字の順番どおりに並べただけ。これだと AB と PQ が対応してしまう。",
            "AB＝QR、BC＝RP から A→Q、B→R、C→P。対応する順に並べているので正しい。",
            "A→R、B→P と対応させていて、AB と RP が対応してしまう。",
            "A→Q、B→P と対応させていて、AB と QP が対応してしまう。",
          ],
          mistakeOf: [2, null, 2, 2],
        },
        steps: [
          {
            title: "頂点の対応を決める",
            body: "AB＝QR と BC＝RP の両方に出てくる B は、両方に出てくる {{R}} に対応します。すると A→{{Q}}、C→{{P}}。",
            figure: {
              type: "compare",
              title: "頂点の対応",
              columns: [{ title: "△ABC" }, { title: "△PQR", tone: "yellow" }],
              rows: [
                { cells: ["A", "Q"] },
                { cells: ["B", "R"] },
                { cells: ["C", "P"] },
              ],
              note: "CA＝PQ（C→P、A→Q）とも合っている。",
            },
            back: [L(4, "三角形の合同条件は3つ")],
          },
          {
            title: "対応する順に書く",
            body: "△ABC≡{{△QRP}}。≡ の両側は、対応する頂点を同じ順に並べます。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "△ABC≡△DEF で、∠A＝50°、∠E＝70° のとき、∠C は何度ですか。",
        points: 5,
        skill: "思考・判断・表現",
        level: 2,
        point: "合同なら対応する角は等しい。∠E は ∠B に対応。",
        answer: { kind: "num", answerKind: "num", answer: ["60"], unit: "°", calc: "180-50-70" },
        steps: [
          {
            title: "対応する角を見つける",
            body: "△ABC≡△DEF なので B と E が対応し、{{∠B＝∠E＝70°}} です。",
            trap: "∠E は △DEF の角なので使えないと思い、∠C を求められなくなる。",
          },
          {
            title: "内角の和から求める",
            body: "∠C＝180°−50°−70°＝{{60°}}。",
          },
        ],
      },
    ],
  },

  // ======================= 4 応用：証明を書く =======================
  {
    id: "j-math-2-heiko-godo/4",
    subject: "math",
    grade: "中2",
    units: [U],
    title: "合同を使った証明",
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
          "【問題】AB∥CD、AB＝CD である4点 A、B、C、D がある。線分 AD と線分 BC が点 O で交わるとき、AO＝DO であることを証明しなさい。\n" +
          "（A は左上、B は右上、C は左下、D は右下にあり、AB と CD は上下に向かい合っている。）",
      },
      { kind: "figure", figure: { ref: { unit: U, section: 4 } } },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の【問題】の仮定と結論の組み合わせとして正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "問題で与えられたことが仮定、示したいことが結論。",
        answer: {
          kind: "choice",
          options: [
            "仮定 AB∥CD、AB＝CD　結論 AO＝DO",
            "仮定 AO＝DO　結論 AB∥CD、AB＝CD",
            "仮定 AB∥CD、AB＝CD、AO＝DO　結論 △ABO≡△DCO",
            "仮定 AB＝CD　結論 AB∥CD",
          ],
          correct: 0,
          why: [
            "「AB∥CD、AB＝CD のとき」が与えられたこと、「AO＝DO」が示したいことなので正しい。",
            "仮定と結論が逆になっている。",
            "AO＝DO は示したいこと（結論）なので、仮定に入れてはいけない。合同は途中で示すこと。",
            "AB∥CD は与えられている。示したいのは AO＝DO。",
          ],
        },
        steps: [
          {
            title: "「〜のとき、…を証明しなさい」を分ける",
            body: "与えられた {{AB∥CD、AB＝CD}} が仮定、示したい {{AO＝DO}} が結論です。",
            back: [L(5, "証明は「仮定 → 根拠 → 結論」")],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "△ABO と △DCO で ∠BAO＝∠CDO がいえる。その根拠として正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "AB∥CD に直線 AD が交わる。Zの形の角。",
        answer: {
          kind: "choice",
          options: ["対頂角は等しい", "AB∥CD より、平行線の錯角は等しい", "AB∥CD より、平行線の同位角は等しい", "仮定"],
          correct: 1,
          why: [
            "対頂角は O のまわりの ∠AOB と ∠DOC。∠BAO と ∠CDO は A と D にある角。",
            "平行な AB と CD に直線 AD が交わり、∠BAO と ∠CDO は内側でZの形に向かい合う錯角。正しい。",
            "同じ位置の角ではない。AB の下側と CD の上側、つまり2直線の内側で向かい合っている。",
            "仮定は AB∥CD と AB＝CD。角が等しいことは、平行から導く。",
          ],
        },
        steps: [
          {
            title: "どの2直線にどの直線が交わっているか",
            body: "平行な AB、CD に直線 AD が交わっています。∠BAO と ∠CDO は{{錯角}}なので等しい。同じように直線 BC について ∠ABO＝∠DCO もいえます。",
            back: [L(1, "対頂角・同位角・錯角")],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "AB＝DC、∠BAO＝∠CDO、∠ABO＝∠DCO から △ABO≡△DCO を示すときに使う合同条件を、ア〜ウから1つ選びなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "辺 AB とその両端 A、B の角。",
        answer: {
          kind: "choice",
          options: ["3組の辺がそれぞれ等しい", "2組の辺とその間の角がそれぞれ等しい", "1組の辺とその両端の角がそれぞれ等しい"],
          correct: 2,
          why: [
            "等しいとわかっている辺は AB＝DC の1組だけ。",
            "等しい辺は1組しかない。",
            "辺 AB の両端 A、B の角がそれぞれ等しいので正しい。",
          ],
        },
        steps: [
          {
            title: "辺と角の位置を確かめる",
            body: "∠BAO は A、∠ABO は B の角で、どちらも{{辺 AB の両端}}にあります。",
            figure: { ref: { unit: U, section: 3 } },
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "△ABO≡△DCO から、AO＝DO のほかにいえる、等しい2つの線分を「○○＝○○」の形で答えなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "B と C が対応するので、BO と CO が対応する辺。",
        answer: {
          kind: "term",
          accept: ["BO=CO", "CO=BO", "OB=OC", "OC=OB", "BO=OC", "OB=CO", "OC=BO", "CO=OB"],
          near: [{ text: "AB=DC", why: "AB＝DC は仮定。合同から新しくわかるのは BO＝CO。" }],
        },
        steps: [
          {
            title: "対応する辺を読む",
            body: "△ABO≡△DCO の順に、A→D、B→C、O→O。辺 BO に対応するのは {{CO}} です。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "上の【問題】を証明しなさい。",
        points: 8,
        skill: "思考・判断・表現",
        level: 3,
        point: "どの三角形か→等しい辺・角と根拠→合同条件→結論。",
        answer: {
          kind: "written",
          model:
            "△ABO と △DCO において\n" +
            "仮定から AB＝DC …①\n" +
            "AB∥CD より、平行線の錯角は等しいので\n" +
            "∠BAO＝∠CDO …②\n" +
            "∠ABO＝∠DCO …③\n" +
            "①、②、③より、1組の辺とその両端の角がそれぞれ等しいので\n" +
            "△ABO≡△DCO\n" +
            "合同な図形の対応する辺は等しいので AO＝DO",
          rubric: [
            { label: "△ABO と △DCO（どちらの三角形に着目するか）を書いている", points: 1, keywords: ["△ABO と △DCO"] },
            { label: "AB＝DC を、根拠（仮定）とともに書いている", points: 1, keywords: ["AB=DC", "仮定"] },
            { label: "等しい2組の角を、根拠「平行線の錯角は等しい」とともに書いている", points: 2, keywords: ["錯角", "∠BAO=∠CDO", "∠ABO=∠DCO"] },
            { label: "合同条件「1組の辺とその両端の角」を正しく書き、△ABO≡△DCO を対応の順に書いている", points: 2, keywords: ["1組の辺とその両端の角", "△ABO≡△DCO"] },
            { label: "「合同な図形の対応する辺は等しい」から AO＝DO を結論している", points: 2, keywords: ["対応する辺", "AO=DO"] },
          ],
          alsoModels: [
            "△ABO と △DCO において、仮定から AB＝DC …①\nAB∥CD より錯角は等しいので ∠BAO＝∠CDO …②\n対頂角は等しいので ∠AOB＝∠DOC …③\n②③と三角形の内角の和から ∠ABO＝∠DCO …④\n①②④より、1組の辺とその両端の角がそれぞれ等しいので △ABO≡△DCO\nよって AO＝DO",
          ],
        },
        steps: [
          {
            title: "着目する三角形を決める",
            body: "結論の AO と DO をそれぞれ辺にもつ {{△ABO と △DCO}} の合同を示します。",
            figure: { ref: { unit: U, section: 4 } },
            back: [L(5, "証明は「仮定 → 根拠 → 結論」")],
          },
          {
            title: "等しい辺・角を根拠つきで並べる",
            body: "AB＝DC（仮定）、∠BAO＝∠CDO と ∠ABO＝∠DCO（{{平行線の錯角}}）。1行ずつ根拠を書きます。",
            trap: "∠AOB＝∠DOC（対頂角）と AB＝DC だけで合同とする。対頂角は辺 AB の両端の角ではない。",
          },
          {
            title: "合同から結論へ",
            body: "{{1組の辺とその両端の角}}で △ABO≡△DCO。対応する辺なので AO＝DO。最後に「合同な図形の対応する辺は等しい」と書いて結論につなげます。",
          },
        ],
      },
    ],
  },
];
