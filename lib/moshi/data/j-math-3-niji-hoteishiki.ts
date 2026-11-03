// 中3数学「二次方程式」の大問。答えは python (sympy) で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

const LEC = "/learn/lecture/j-math-3-niji-hoteishiki";

export const J_MATH_3_NIJI_HOTEISHIKI: Daimon[] = [
  // ======================= 1 平方根・因数分解で解く（基本） =======================
  {
    id: "j-math-3-niji-hoteishiki/1",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-niji-hoteishiki"],
    title: "二次方程式（平方根・因数分解）",
    lead: "次の二次方程式を解きなさい。",
    style: "calc",
    level: 1,
    points: 20,
    minutes: 10,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "3x² = 48",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "両辺を3でわって x²＝16。解は ± の2つ。",
        answer: { kind: "num", answerKind: "roots", answer: ["4", "-4"], equations: ["3x^2=48"] },
        steps: [
          {
            title: "x²＝k の形にする",
            body: "両辺を3でわって x²＝16。2乗して16になる数は {{±4}} です。",
            figure: { ref: { unit: "j-math-3-niji-hoteishiki", section: 0 } },
            trap: "x＝4 だけ答える。(−4)²＝16 なので −4 も解。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "(x + 3)² = 7",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "x＋3＝±√7。3 を移項する。",
        answer: { kind: "num", answerKind: "roots", answer: ["-3+√7", "-3-√7"], equations: ["(x+3)^2=7"] },
        steps: [
          {
            title: "かっこの中を平方根にする",
            body: "x＋3 を1つのかたまりと見て {{x＋3＝±√7}}。3 を移項して x＝−3±√7。",
            figure: { ref: { unit: "j-math-3-niji-hoteishiki", section: 1 } },
            trap: "移項で符号を変え忘れて 3±√7 とする。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "x² + 2x − 24 = 0",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "かけて −24、たして 2 の2数は 6 と −4。",
        answer: { kind: "num", answerKind: "roots", answer: ["-6", "4"], equations: ["x^2+2x-24=0"] },
        steps: [
          {
            title: "因数分解して AB＝0",
            body: "(x＋6)(x−4)＝0 なので、{{x＋6＝0 または x−4＝0}}。x＝−6、4。",
            figure: { ref: { unit: "j-math-3-niji-hoteishiki", section: 2 } },
            trap: "(x＋6)(x−4)＝0 から x＝6、−4 としてしまう（符号が逆）。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "x² − 10x + 25 = 0",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "平方の形 (x−5)²＝0。解は1つだけ。",
        answer: { kind: "num", answerKind: "num", answer: ["5"], labels: ["x ="], equations: ["x^2-10x+25=0"] },
        steps: [
          {
            title: "平方の形に因数分解",
            body: "25＝5²、10＝2×5 なので (x−5)²＝0。x−5＝0 より {{x＝5}}。解はこの1つだけです。",
            back: [{ label: "レクチャー「二次方程式の解は、ふつう2つある」", href: `${LEC}#lec-s1` }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "x² = 6x",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "x でわらない。移項して x でくくる。",
        answer: { kind: "num", answerKind: "roots", answer: ["0", "6"], equations: ["x^2=6x"] },
        steps: [
          {
            title: "右辺を0にしてくくる",
            body: "x²−6x＝0、{{x(x−6)＝0}}。x＝0 または x−6＝0 なので x＝0、6。",
            trap: "両辺を x でわって x＝6 だけにする（x＝0 の解が消える）。",
          },
        ],
      },
    ],
  },

  // ======================= 2 解の公式・式の整理（標準） =======================
  {
    id: "j-math-3-niji-hoteishiki/2",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-niji-hoteishiki"],
    title: "二次方程式（解の公式）",
    lead: "次の問いに答えなさい。",
    style: "calc",
    level: 2,
    points: 24,
    minutes: 14,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "次の二次方程式を解きなさい。\nx² + 5x + 3 = 0",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "a＝1、b＝5、c＝3。√ の中は 25−12。",
        answer: { kind: "num", answerKind: "roots", answer: ["(-5+√13)/2", "(-5-√13)/2"], equations: ["x^2+5x+3=0"] },
        steps: [
          {
            title: "解の公式に入れる",
            body: "b²−4ac＝25−12＝{{13}}。x＝(−5±√13)/2。",
            figure: { ref: { unit: "j-math-3-niji-hoteishiki", section: 5 } },
            back: [{ label: "計算の段「解の公式」", href: "/learn/math/49" }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次の二次方程式を解きなさい。\n3x² − 4x − 2 = 0",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "√40＝2√10。最後に分母と約分。",
        answer: { kind: "num", answerKind: "roots", answer: ["(2+√10)/3", "(2-√10)/3"], equations: ["3x^2-4x-2=0"] },
        steps: [
          {
            title: "√ の中を先に計算",
            body: "b²−4ac＝16−4×3×(−2)＝{{40}}。x＝(4±√40)/6＝(4±2√10)/6。",
            trap: "c＝−2 の符号を落として 16−24 とする。",
          },
          {
            title: "約分する",
            body: "分子の 4 と 2√10、分母の 6 は全部2でわれるので {{(2±√10)/3}}。",
            trap: "4 だけを約分して (2±2√10)/3 とする。分子の項すべてをわる。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "次の二次方程式を解きなさい。\n2x² − 7x + 3 = 0",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "√25＝5 なので、解は有理数になる。",
        answer: { kind: "num", answerKind: "roots", answer: ["3", "1/2"], equations: ["2x^2-7x+3=0"] },
        steps: [
          {
            title: "解の公式で",
            body: "b²−4ac＝49−24＝25。x＝(7±5)/4 なので、{{x＝12/4＝3、x＝2/4＝1/2}}。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "次の二次方程式を解きなさい。\n(x − 2)(x + 5) = 8",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "右辺が0ではない。展開して整理してから。",
        answer: { kind: "num", answerKind: "roots", answer: ["-6", "3"], equations: ["(x-2)(x+5)=8"] },
        steps: [
          {
            title: "展開して右辺を0にする",
            body: "x²＋3x−10＝8 より {{x²＋3x−18＝0}}。",
            trap: "x−2＝8 または x＋5＝8 としてしまう。「どちらかが0」は積が0のときだけ。",
          },
          {
            title: "因数分解する",
            body: "(x＋6)(x−3)＝0 より x＝−6、3。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "x² − 3x − 1 = 0 の解として正しいものを、ア〜エから1つ選びなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "−b は −(−3)＝3。2a は分子全体をわる。",
        answer: {
          kind: "choice",
          options: ["x = (3 ± √13)/2", "x = (−3 ± √13)/2", "x = 3 ± √13/2", "x = (3 ± √5)/2"],
          correct: 0,
          why: [
            "a＝1、b＝−3、c＝−1。−b＝3、b²−4ac＝9＋4＝13 で正しい。",
            "−b を −3 にしている。b＝−3 なので −b＝+3。",
            "√13 だけを2でわっている。分数の線は 3 と √13 の両方の下にある。",
            "c＝−1 の符号を落として 9−4＝5 にしている。",
          ],
          mistakeOf: [null, null, 3, null],
        },
        steps: [
          {
            title: "a、b、c を符号ごと読む",
            body: "a＝1、{{b＝−3、c＝−1}}。b²−4ac＝9−4×1×(−1)＝13、x＝(3±√13)/2。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "x² + 6x − 2 = 0 を、( )² = k の形に変形して解きます。正しい順に並べなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "x の係数の半分の2乗（3²＝9）を両辺にたす。",
        answer: {
          kind: "order",
          tokens: ["x² + 6x = 2", "x² + 6x + 9 = 2 + 9", "(x + 3)² = 11", "x + 3 = ±√11", "x = −3 ± √11"],
          distractor: "x² + 6x + 36 = 2 + 36",
        },
        steps: [
          {
            title: "数の項を移項する",
            body: "x²＋6x＝2。左辺を平方の形にするため、{{x の係数 6 の半分の2乗 9}} を両辺にたします。",
            trap: "6² の 36 をたす。たすのは (6÷2)²＝9。",
          },
          {
            title: "平方根で解く",
            body: "(x＋3)²＝11、x＋3＝±√11、{{x＝−3±√11}}。解の公式でも同じ答えになります。",
            back: [{ label: "レクチャー「( )²＝k の形は、平方根で解く」", href: `${LEC}#lec-s2` }],
          },
        ],
      },
    ],
  },

  // ======================= 3 二次方程式の利用（文章題） =======================
  {
    id: "j-math-3-niji-hoteishiki/3",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-niji-hoteishiki"],
    title: "二次方程式の利用",
    lead: "次の問いに答えなさい。",
    style: "word",
    level: 2,
    points: 24,
    minutes: 15,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "x についての二次方程式 x² + ax − 12 = 0 の解の1つが 3 のとき、a の値と、もう1つの解を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "解を代入して a を出し、もとの式を解き直す。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["1", "-4"],
          labels: ["a =", "もう1つの解 x ="],
          // x に a の値、y にもう1つの解を入れて確かめる
          equations: ["9+3x-12=0", "y^2+xy-12=0"],
        },
        steps: [
          {
            title: "x＝3 を代入する",
            body: "9＋3a−12＝0 より {{a＝1}}。",
          },
          {
            title: "もとの方程式を解く",
            body: "x²＋x−12＝0、(x＋4)(x−3)＝0 なので、もう1つの解は {{x＝−4}}。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "ある正の数を2乗すると、もとの数を3倍した数より 10 大きくなります。もとの数を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "x²＝3x＋10。「正の数」の条件で解を選ぶ。",
        answer: { kind: "num", answerKind: "num", answer: ["5"], equations: ["x^2=3x+10"] },
        steps: [
          {
            title: "方程式をつくって解く",
            body: "x²＝3x＋10、x²−3x−10＝0、(x＋2)(x−5)＝0 で x＝−2、5。",
          },
          {
            title: "問題に合う解を選ぶ",
            body: "もとの数は {{正の数}}なので、−2 は合いません。答えは 5。",
            trap: "−2 も答えに入れる。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "連続する2つの自然数があり、その積は 72 です。この2つの自然数を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "小さい方を x とすると x(x＋1)＝72。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["8", "9"],
          labels: ["小さい方", "大きい方"],
          equations: ["xy=72", "y=x+1"],
        },
        steps: [
          {
            title: "解いて自然数を選ぶ",
            body: "x²＋x−72＝0、(x＋9)(x−8)＝0 で x＝−9、8。{{自然数}}なので x＝8、大きい方は 9。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "縦が横より 3 m 長い長方形の花だんがあり、面積は 54 m² です。横の長さを x m として方程式をつくり、縦と横の長さを求めなさい。途中の式も書きなさい。",
        points: 7,
        skill: "思考・判断・表現",
        level: 2,
        point: "解を出したら、長さが正かどうかで選ぶ。",
        answer: {
          kind: "written",
          model:
            "横を x m とすると、縦は x + 3 m。\n" +
            "x(x + 3) = 54\n" +
            "x² + 3x − 54 = 0\n" +
            "(x + 9)(x − 6) = 0\n" +
            "x = −9、6\n" +
            "x > 0 なので x = −9 は問題に合わない。x = 6\n" +
            "答え　横 6 m、縦 9 m",
          rubric: [
            { label: "縦を x＋3 と表し、x(x＋3)＝54 をつくっている", points: 2, keywords: ["x(x+3)=54"] },
            { label: "x²＋3x−54＝0 を因数分解などで正しく解いている", points: 2, keywords: ["(x+9)(x-6)=0"] },
            { label: "x＞0 なので −9 は合わないと、解を選ぶ理由を書いている", points: 1, keywords: ["x>0", "合わない"] },
            { label: "横 6m・縦 9m を、単位をつけて両方答えている", points: 2, keywords: ["6m", "9m"] },
          ],
          autoPart: {
            kind: "num",
            answerKind: "pair",
            answer: ["9", "6"],
            labels: ["縦", "横"],
            unit: "m",
            equations: ["xy=54", "x=y+3"],
          },
        },
        steps: [
          {
            title: "面積の式をつくる",
            body: "縦は {{x＋3}} m なので、面積は x(x＋3)＝54。展開して x²＋3x−54＝0。",
          },
          {
            title: "解の確かめ",
            body: "(x＋9)(x−6)＝0 で x＝−9、6。{{長さは正}}なので x＝6。縦は 9 m で、6×9＝54 になります。",
            trap: "解が2つ出たまま両方答える。長さが負になることはない。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "縦 20 m、横 30 m の長方形の土地に、縦と横に同じ幅の道を1本ずつつくり、残りを畑にしたところ、畑の面積は 504 m² になりました。道の幅は何 m ですか。",
        points: 5,
        skill: "思考・判断・表現",
        level: 3,
        point: "道を端に寄せると、畑は (20−x)(30−x) の長方形。",
        answer: { kind: "num", answerKind: "num", answer: ["2"], unit: "m", equations: ["(20-x)(30-x)=504"] },
        steps: [
          {
            title: "道を端に寄せて考える",
            body: "道の幅を x m とすると、畑は縦 20−x、横 30−x の長方形と同じ面積です。{{(20−x)(30−x)＝504}}。",
          },
          {
            title: "解いて条件に合う方を選ぶ",
            body: "x²−50x＋96＝0、(x−2)(x−48)＝0 で x＝2、48。0＜x＜20 なので {{x＝2}}。",
            trap: "48 m を答える。縦が 20 m しかないので道の幅にならない。",
          },
        ],
      },
    ],
  },

  // ======================= 4 解き方の選択と動点（応用） =======================
  {
    id: "j-math-3-niji-hoteishiki/4",
    subject: "math",
    grade: "中3",
    units: ["j-math-3-niji-hoteishiki"],
    title: "解の性質と動く点",
    lead: "次の問いに答えなさい。",
    style: "synthesis",
    level: 3,
    points: 20,
    minutes: 13,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "text",
        body:
          "(3)〜(5)：1辺が 10 cm の正方形 ABCD がある。点 P は A を出発して辺 AB 上を B まで、点 Q は P と同時に B を出発して辺 BC 上を C まで、どちらも毎秒 1 cm の速さで動く。出発してから x 秒後（0 < x < 10）の △PBQ の面積を考える。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "次のア〜ウの二次方程式のうち、平方根の考えでも因数分解でも解きにくく、解の公式を使うのがよいものを1つ選びなさい。\nア (x − 4)² = 10　イ x² + 3x + 1 = 0　ウ x² − 8x + 15 = 0",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "( )²＝k なら平方根、整数の組がなければ解の公式。",
        answer: {
          kind: "choice",
          options: ["ア", "イ", "ウ"],
          correct: 1,
          why: [
            "( )²＝k の形なので、平方根を使って x＝4±√10 とすぐ解ける。",
            "かけて1・たして3になる整数の組がなく、因数分解できない。解の公式で x＝(−3±√5)/2。",
            "(x−3)(x−5)＝0 と因数分解できる。",
          ],
        },
        steps: [
          {
            title: "形を見て解き方を選ぶ",
            body: "{{( )²＝k → 平方根、因数分解できる → AB＝0、できない → 解の公式}} の順に考えます。",
            figure: { ref: { unit: "j-math-3-niji-hoteishiki", section: 6 } },
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "x についての二次方程式 x² + bx + c = 0 の解が 2 と −5 のとき、b と c の値を求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        point: "解が 2、−5 → (x−2)(x＋5)＝0 を展開。",
        answer: {
          kind: "num",
          answerKind: "pair",
          answer: ["3", "-10"],
          labels: ["b =", "c ="],
          equations: ["4+2b+c=0", "25-5b+c=0"],
        },
        steps: [
          {
            title: "解から式をつくる",
            body: "解が 2 と −5 になる方程式は {{(x−2)(x＋5)＝0}}。展開すると x²＋3x−10＝0。",
          },
          {
            title: "係数をくらべる",
            body: "b＝3、c＝−10。x＝2 を入れると 4＋6−10＝0 で確かめられます。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の正方形 ABCD で、x 秒後の △PBQ の面積を表す式として正しいものを、ア〜エから1つ選びなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "PB＝10−x、BQ＝x。直角三角形の面積。",
        answer: {
          kind: "choice",
          options: ["x(10 − x)/2 cm²", "x(10 − x) cm²", "x²/2 cm²", "(10 − x)²/2 cm²"],
          correct: 0,
          why: [
            "PB＝10−x、BQ＝x で、∠B＝90° なので面積は PB×BQ÷2。",
            "三角形なので ÷2 が必要。",
            "PB を x にしている。P は A から動くので PB は 10−x。",
            "BQ を 10−x にしている。Q は B から動くので BQ は x。",
          ],
        },
        steps: [
          {
            title: "2つの辺を x で表す",
            body: "AP＝x なので {{PB＝10−x}}、BQ＝x。∠B は直角なので、面積は (10−x)×x÷2 です。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "上の正方形 ABCD で、△PBQ の面積が 12 cm² になるのは、出発してから何秒後ですか。すべて求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        dependsOn: "3",
        point: "x(10−x)＝24。0＜x＜10 に入るか確かめる。",
        answer: { kind: "num", answerKind: "roots", answer: ["4", "6"], unit: "秒後", equations: ["x(10-x)/2=12"] },
        steps: [
          {
            title: "方程式をつくって解く",
            body: "x(10−x)/2＝12 より x²−10x＋24＝0、(x−4)(x−6)＝0。{{x＝4、6}}。",
          },
          {
            title: "変域を確かめる",
            body: "どちらも 0＜x＜10 に入るので、4秒後と6秒後の2回あります。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "上の正方形 ABCD で、△PBQ の面積が 15 cm² になることはありますか。方程式をつくり、( )² = k の形に変形して説明しなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        dependsOn: "3",
        point: "(x−5)²＝負の数 になれば、満たす x はない。",
        answer: {
          kind: "written",
          model:
            "x(10 − x)/2 = 15 より x² − 10x + 30 = 0\n" +
            "x² − 10x = −30\n" +
            "x² − 10x + 25 = −30 + 25\n" +
            "(x − 5)² = −5\n" +
            "2乗して負の数になる数はないので、この方程式を満たす x はない。\n" +
            "答え　15 cm² になることはない。",
          rubric: [
            { label: "x(10−x)/2＝15 から x²−10x＋30＝0 をつくっている", points: 2, keywords: ["x²-10x+30=0"] },
            { label: "(x−5)²＝−5 に変形している", points: 2, keywords: ["(x-5)²=-5"] },
            { label: "2乗して負になる数はないことを理由に、ならないと結論している", points: 2, keywords: ["負の数", "ない"] },
          ],
        },
        steps: [
          {
            title: "( )²＝k の形にする",
            body: "x²−10x＝−30 の両辺に {{(10÷2)²＝25}} をたして (x−5)²＝−5。",
          },
          {
            title: "k が負なら解はない",
            body: "どんな数も2乗すると0以上です。だから (x−5)²＝−5 を満たす x はなく、{{15 cm² にはなりません}}。",
            back: [{ label: "レクチャー「( )²＝k の形は、平方根で解く」", href: `${LEC}#lec-s2` }],
          },
        ],
      },
    ],
  },
];
