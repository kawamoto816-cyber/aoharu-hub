// 中1数学「データの活用」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
// 表の数値はすべて問題用につくった架空のデータ。
import type { Daimon } from "../types";

const LEC = "/learn/lecture/j-math-1-data";

export const J_MATH_1_DATA: Daimon[] = [
  // ================= 1 基本：代表値と範囲 =================
  {
    id: "j-math-1-data/1",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-data"],
    title: "代表値と範囲",
    lead: "下の表は、10人の小テスト（10点満点）の得点です。次の問いに答えなさい。",
    style: "data",
    level: 1,
    points: 20,
    minutes: 10,
    review: { status: "draft" },
    material: [
      {
        kind: "table",
        caption: "10人の小テストの得点（点）",
        head: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        rows: [["5", "9", "3", "8", "6", "10", "8", "4", "8", "7"]],
        source: "問題用の架空のデータ",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の表の得点の平均値を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "合計÷人数。",
        answer: { kind: "num", answerKind: "num", answer: ["6.8"], unit: "点", calc: "(5+9+3+8+6+10+8+4+8+7)/10" },
        steps: [
          {
            title: "合計÷個数",
            body: "合計は 68 点。68÷10＝{{6.8 点}}。",
            figure: { ref: { unit: "j-math-1-data", section: 2 } },
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の表の得点の中央値を求めなさい。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "小さい順に並べてから。10個なので5番目と6番目の平均。",
        answer: { kind: "num", answerKind: "num", answer: ["7.5"], unit: "点", calc: "(7+8)/2" },
        steps: [
          {
            title: "小さい順に並べる",
            body: "3, 4, 5, 6, {{7, 8}}, 8, 8, 9, 10。個数が偶数なので、真ん中は5番目と6番目の2つです。",
            trap: "表の順のまま5番目と6番目（6 と 10）をとって 8 にする。",
            back: [{ label: "レクチャー「代表値は3つ」", href: `${LEC}#lec-s3` }],
          },
          {
            title: "2つの平均",
            body: "(7＋8)÷2＝{{7.5 点}}。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の表の得点の最頻値を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "いちばん多く出てくる「値」。回数ではない。",
        answer: { kind: "num", answerKind: "num", answer: ["8"], unit: "点", calc: "8" },
        steps: [
          {
            title: "いちばん多い値",
            body: "8 点が3人でいちばん多いので、最頻値は {{8 点}}。「3」は人数なので答えではありません。",
            trap: "人数の 3 を答える。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "上の表の得点の範囲を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "範囲＝最大値−最小値。",
        answer: { kind: "num", answerKind: "num", answer: ["7"], unit: "点", calc: "10-3" },
        steps: [
          {
            title: "最大値−最小値",
            body: "最大は 10 点、最小は 3 点。10−3＝{{7 点}}。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "あとから11人目の得点 9 点が加わりました。11人の得点の中央値を求めなさい。",
        points: 3,
        skill: "思考・判断・表現",
        level: 2,
        point: "11個なら真ん中は6番目の1つ。",
        answer: { kind: "num", answerKind: "num", answer: ["8"], unit: "点", calc: "8" },
        steps: [
          {
            title: "並べ直して6番目",
            body: "3, 4, 5, 6, 7, {{8}}, 8, 8, 9, 9, 10。個数が奇数なので、真ん中の6番目 {{8 点}} が中央値です。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "最初の10人のうち、得点が平均値より高い人は何人ですか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "1",
        point: "平均 6.8 点より高い＝7点以上。",
        answer: { kind: "num", answerKind: "num", answer: ["6"], unit: "人", calc: "1+3+1+1" },
        steps: [
          {
            title: "平均より高い人を数える",
            body: "6.8 点より高いのは 7, 8, 8, 8, 9, 10 の {{6 人}}。平均値は「真ん中の人」の値とはかぎりません。",
          },
        ],
      },
    ],
  },

  // ================= 2 標準：度数分布表 =================
  {
    id: "j-math-1-data/2",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-data"],
    title: "度数分布表を読む",
    lead: "下の表は、ある中学校の1年生40人のハンドボール投げの記録を度数分布表に整理したものです。次の問いに答えなさい。",
    style: "data",
    level: 2,
    points: 20,
    minutes: 14,
    review: { status: "draft" },
    material: [
      {
        kind: "table",
        caption: "ハンドボール投げの記録（40人）",
        head: ["階級（m）", "度数（人）"],
        rows: [
          ["10以上 15未満", "4"],
          ["15 〜 20", "6"],
          ["20 〜 25", "14"],
          ["25 〜 30", "10"],
          ["30 〜 35", "6"],
          ["計", "40"],
        ],
        source: "問題用の架空のデータ",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の表の階級の幅は何 m ですか。",
        points: 2,
        skill: "知識・技能",
        level: 1,
        point: "区間のはば。15−10。",
        answer: { kind: "num", answerKind: "num", answer: ["5"], unit: "m", calc: "15-10" },
        steps: [
          {
            title: "区間のはば",
            body: "10m 以上 15m 未満のように、{{5m}} ごとに区切られています。",
            figure: { ref: { unit: "j-math-1-data", section: 0 } },
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の表で、20m 以上 25m 未満の階級の相対度数を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "その階級の度数÷度数の合計。",
        answer: { kind: "num", answerKind: "num", answer: ["0.35"], calc: "14/40" },
        steps: [
          {
            title: "度数÷合計",
            body: "14÷40＝{{0.35}}。全体の35%にあたります。",
            figure: { ref: { unit: "j-math-1-data", section: 1 } },
            back: [{ label: "レクチャー「相対度数で割合としてくらべる」", href: `${LEC}#lec-s2` }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の表で、記録が 25m 未満の人は何人ですか。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "最初の階級から20〜25mの階級までの累積度数。",
        answer: { kind: "num", answerKind: "num", answer: ["24"], unit: "人", calc: "4+6+14" },
        steps: [
          {
            title: "累積度数",
            body: "4＋6＋14＝{{24 人}}。「25m 未満」には 25〜30m の階級は入りません。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "上の表から、最頻値を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "度数最大の階級の階級値（真ん中の値）。",
        answer: { kind: "num", answerKind: "num", answer: ["22.5"], unit: "m", calc: "(20+25)/2" },
        steps: [
          {
            title: "度数がいちばん多い階級の階級値",
            body: "いちばん多いのは 20〜25m（14人）。階級値は (20＋25)÷2＝{{22.5m}}。",
            figure: { ref: { unit: "j-math-1-data", section: 2 } },
            trap: "度数の 14 を最頻値と答える。最頻値は記録（m）の値です。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "上の表で、中央値がふくまれる階級を選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "40人なら20番目と21番目。累積度数で探す。",
        answer: {
          kind: "choice",
          options: ["15m以上20m未満", "20m以上25m未満", "25m以上30m未満", "30m以上35m未満"],
          correct: 1,
          why: [
            "20m 未満は 4＋6＝10人までなので、20番目はこの階級に入りません。",
            "20m 未満が10人、25m 未満が24人。20番目・21番目はどちらもこの階級に入ります。",
            "25〜30m は 25番目〜34番目です。",
            "30〜35m は 35番目〜40番目です。真ん中ではありません。",
          ],
        },
        steps: [
          {
            title: "真ん中は何番目か",
            body: "40人なので、小さい方から {{20番目と21番目}} の平均が中央値です。",
          },
          {
            title: "累積度数で探す",
            body: "累積度数は 4、10、{{24}}、34、40。20番目・21番目は 11〜24番目の 20〜25m の階級に入ります。",
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "上の度数分布表から平均値を求めなさい。各階級に入る記録は、すべてその階級の階級値であるとみなして計算します。",
        points: 5,
        skill: "思考・判断・表現",
        level: 3,
        point: "（階級値×度数）の合計÷度数の合計。",
        answer: {
          kind: "num",
          answerKind: "num",
          answer: ["23.5"],
          unit: "m",
          calc: "(12.5*4+17.5*6+22.5*14+27.5*10+32.5*6)/40",
        },
        steps: [
          {
            title: "階級値×度数",
            body: "12.5×4＝50、17.5×6＝105、22.5×14＝315、27.5×10＝275、32.5×6＝195。",
          },
          {
            title: "合計÷人数",
            body: "合計は 940。940÷40＝{{23.5m}}。",
            trap: "度数をかけずに階級値だけを平均して 22.5 にする。",
          },
        ],
      },
    ],
  },

  // ================= 3 標準：相対度数で2つの集団をくらべる =================
  {
    id: "j-math-1-data/3",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-data"],
    title: "人数のちがう集団をくらべる",
    lead: "下の表は、A組25人とB組40人について、1週間の読書時間を調べた結果です。次の問いに答えなさい。",
    style: "data",
    level: 2,
    points: 20,
    minutes: 13,
    review: { status: "draft" },
    material: [
      {
        kind: "table",
        caption: "1週間の読書時間",
        head: ["階級（分）", "A組（人）", "B組（人）"],
        rows: [
          ["0以上 20未満", "2", "6"],
          ["20 〜 40", "6", "10"],
          ["40 〜 60", "8", "12"],
          ["60 〜 80", "6", "8"],
          ["80 〜 100", "3", "4"],
          ["計", "25", "40"],
        ],
        source: "問題用の架空のデータ",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の表で、A組の 40分以上60分未満の階級の相対度数を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "8÷25。",
        answer: { kind: "num", answerKind: "num", answer: ["0.32"], calc: "8/25" },
        steps: [
          {
            title: "度数÷合計",
            body: "A組の合計は 25人。8÷25＝{{0.32}}。",
            figure: { ref: { unit: "j-math-1-data", section: 1 } },
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の表で、B組の 40分以上60分未満の階級の相対度数を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "12÷40。",
        answer: { kind: "num", answerKind: "num", answer: ["0.3"], calc: "12/40" },
        steps: [
          {
            title: "合計がちがうことに注意",
            body: "B組の合計は 40人。12÷40＝{{0.3}}。度数は B組の方が多いのに、相対度数は A組の方が大きい。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の表で、A組の中央値がふくまれる階級を選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "25人なら13番目。累積度数 2、8、16…。",
        answer: {
          kind: "choice",
          options: ["20分以上40分未満", "40分以上60分未満", "60分以上80分未満"],
          correct: 1,
          why: [
            "40分未満は 2＋6＝8人まで。13番目はこの階級に入りません。",
            "60分未満の累積度数は 16人。9〜16番目の階級に、13番目が入ります。",
            "60〜80分は 17〜22番目です。",
          ],
        },
        steps: [
          {
            title: "真ん中は13番目",
            body: "25人なので、小さい方から {{13番目}} が中央値。累積度数は 2、8、16 なので 40〜60分の階級です。",
            back: [{ label: "レクチャー「代表値は3つ」", href: `${LEC}#lec-s3` }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "上の表で、B組の 40分未満の累積相対度数を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 2,
        point: "（6＋10）÷40。",
        answer: { kind: "num", answerKind: "num", answer: ["0.4"], calc: "(6+10)/40" },
        steps: [
          {
            title: "累積度数÷合計",
            body: "40分未満は 6＋10＝16人。16÷40＝{{0.4}}。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt:
          "けんさんは「60分以上読んだ人は、A組が9人、B組が12人だから、B組の方が本をよく読む人の割合が大きい」と言いました。この意見が正しいかどうかを、上の表の数値を使って説明しなさい。",
        points: 7,
        skill: "思考・判断・表現",
        level: 3,
        point: "人数のちがう組は、相対度数（割合）にそろえてくらべる。",
        answer: {
          kind: "written",
          model:
            "正しくない。\n" +
            "2つの組は人数がちがうので、人数ではなく相対度数でくらべる。\n" +
            "60分以上の人の割合は、A組 9÷25＝0.36、B組 12÷40＝0.3。\n" +
            "0.36＞0.3 なので、60分以上読んだ人の割合は A組の方が大きい。",
          rubric: [
            { label: "人数（度数）ではなく相対度数（割合）でくらべるべきだと書いている", points: 2, keywords: ["相対度数", "割合"] },
            { label: "A組 9÷25＝0.36 を求めている", points: 2, keywords: ["0.36"] },
            { label: "B組 12÷40＝0.3 を求めている", points: 2, keywords: ["0.3"] },
            { label: "A組の方が割合が大きく、意見は正しくないと結論している", points: 1, keywords: ["正しくない", "A組"] },
          ],
        },
        steps: [
          {
            title: "割合にそろえる",
            body: "組の人数が 25人と40人でちがうので、{{相対度数}}でくらべます。",
            figure: { ref: { unit: "j-math-1-data", section: 1 } },
            back: [{ label: "レクチャー「相対度数で割合としてくらべる」", href: `${LEC}#lec-s2` }],
          },
          {
            title: "計算してくらべる",
            body: "A組 (6＋3)÷25＝{{0.36}}、B組 (8＋4)÷40＝{{0.3}}。割合が大きいのは A組です。",
            trap: "人数が多い B組の方が「よく読む」と決めてしまう。",
          },
        ],
      },
    ],
  },

  // ================= 4 応用：相対度数と確率 =================
  {
    id: "j-math-1-data/4",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-data"],
    title: "実験の結果から確率を考える",
    lead: "下の表は、ペットボトルのキャップを投げて、表向きになった回数を記録したものです。次の問いに答えなさい。",
    style: "data",
    level: 3,
    points: 20,
    minutes: 14,
    review: { status: "draft" },
    material: [
      {
        kind: "table",
        caption: "キャップ投げの結果",
        head: ["投げた回数", "100", "200", "500", "1000", "2000"],
        rows: [
          ["表向きの回数", "41", "76", "186", "377", "750"],
          ["表向きの相対度数", "0.41", "0.38", "ア", "0.377", "0.375"],
        ],
        source: "問題用の架空のデータ",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の表のアにあてはまる数を求めなさい。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "表向きの回数÷投げた回数。",
        answer: { kind: "num", answerKind: "num", answer: ["0.372"], calc: "186/500" },
        steps: [
          {
            title: "回数÷全体",
            body: "186÷500＝{{0.372}}。",
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の表から、このキャップが表向きになる確率はおよそいくつと考えられますか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "回数を増やしたときに近づいていく値。",
        answer: {
          kind: "choice",
          options: ["0.41", "0.38 くらい", "0.5", "0.75"],
          correct: 1,
          why: [
            "0.41 は 100回だけの結果です。回数が少ないと、相対度数はばらつきます。",
            "回数を増やすと相対度数は 0.38、0.372、0.377、0.375 と、0.38 くらいに近づいています。",
            "表と裏の2通りでも、起こりやすさが同じとは限りません。実験の結果を使います。",
            "750 は 2000回のうちの回数です。750÷1000 ではなく 750÷2000 で考えます。",
          ],
        },
        steps: [
          {
            title: "近づいていく値を読む",
            body: "回数が多くなるほど、相対度数は {{0.38 くらい}}で安定しています。この値を確率とみなします。",
            figure: { ref: { unit: "j-math-1-data", section: 3 } },
            back: [{ label: "レクチャー「相対度数を確率とみる」", href: `${LEC}#lec-s4` }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の表で、2000回投げたとき、表向きにならなかったのは何回ですか。",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "全体−表向き。",
        answer: { kind: "num", answerKind: "num", answer: ["1250"], unit: "回", calc: "2000-750" },
        steps: [
          {
            title: "ひき算",
            body: "2000−750＝{{1250 回}}。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "このキャップを 8000回投げるとき、表向きになるのはおよそ何回と考えられますか。2000回のときの相対度数を使って求めなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "回数×相対度数。0.375×8000。",
        answer: { kind: "num", answerKind: "num", answer: ["3000"], unit: "回", calc: "0.375*8000" },
        steps: [
          {
            title: "回数×確率",
            body: "0.375×8000＝{{3000 回}}。2000回の4倍なので 750×4 と考えても同じです。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "100回投げた結果だけで「表向きになる確率は 0.41」と決めるのはよくありません。その理由を説明しなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "少ない回数では相対度数がばらつく。多数回で安定する。",
        answer: {
          kind: "written",
          limit: { max: 100, unit: "字" },
          model:
            "投げる回数が少ないと、相対度数は偶然によって大きくばらつくから。回数を増やすと相対度数は 0.38 くらいの一定の値に近づくので、多数回の結果から確率を考えるべきである。",
          rubric: [
            { label: "回数が少ないと相対度数がばらつく（変わりやすい）ことを書いている", points: 3, keywords: ["回数が少ない", "ばらつく"] },
            { label: "回数を増やすと一定の値に近づくことを書いている", points: 3, keywords: ["回数を増やす", "近づく", "一定"] },
          ],
        },
        steps: [
          {
            title: "回数とばらつき",
            body: "表の相対度数は 0.41 → 0.38 → 0.372 と変わり、{{回数が多くなると 0.38 くらいで安定}}します。少ない回数の結果は偶然の影響が大きいのです。",
            figure: { ref: { unit: "j-math-1-data", section: 3 } },
          },
        ],
      },
    ],
  },
];
