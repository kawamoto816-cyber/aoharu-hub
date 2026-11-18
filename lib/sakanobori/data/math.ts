import type { PrereqUnit } from "../types";

// 算数・数学・情報Ⅰの前提の地図（さかのぼり）
export const PREREQ_MATH: PrereqUnit[] = [
  // ===== 小1 =====
  {
    unit: "e-math-1-10made",
    needs: [],
    mistakes: [
      { i: 0, root: "e-math-1-10made", why: "1つずつよけながら数える方法が身についていない" },
      { i: 1, root: "e-math-1-10made", why: "数字の形をまだ正しく覚えていない" },
      { i: 2, root: "e-math-1-10made", why: "0も数のなかま、というところが学べていない" },
    ],
  },
  {
    unit: "e-math-1-ikutsu",
    needs: [{ unit: "e-math-1-10made", why: "10までの数を数えられないと、分け方を作れない" }],
    mistakes: [
      { i: 0, root: "e-math-1-ikutsu", why: "10をつくる組み合わせがまだ身についていない" },
      { i: 1, root: "e-math-1-ikutsu", why: "1つずつずらして順に分ける考えがまだない" },
    ],
  },
  {
    unit: "e-math-1-tashizan",
    needs: [{ unit: "e-math-1-ikutsu", why: "「いくつといくつ」が、たし算の答えのもとになる" }],
    mistakes: [
      { i: 0, root: "e-math-1-10made", why: "0は「なにもない」ことを表す数だとわかっていない" },
      { i: 1, root: "e-math-1-tashizan", why: "あわせる・ふえる場面と、へる場面の区別があいまい" },
      { i: 2, root: "e-math-1-tashizan", why: "答えに「何がいくつ」までかく約束を知らない" },
    ],
  },
  {
    unit: "e-math-1-hikizan",
    needs: [{ unit: "e-math-1-ikutsu", why: "「いくつといくつ」の分け方から、のこりがわかる" }],
    mistakes: [
      { i: 0, root: "e-math-1-hikizan", why: "はじめの数を先にかく、式の順がわかっていない" },
      { i: 1, root: "e-math-1-hikizan", why: "「ちがい」もひき算だと、まだ結びついていない" },
      { i: 2, root: "e-math-1-10made", why: "0は「なにもない」数、という意味があいまい" },
    ],
  },
  {
    unit: "e-math-1-20made",
    needs: [{ unit: "e-math-1-10made", why: "10までが数えられて、はじめて10のまとまりが作れる" }],
    mistakes: [
      { i: 0, root: "e-math-1-20made", why: "十のくらいと一のくらいを並べて書くしくみが未習熟" },
      { i: 1, root: "e-math-1-20made", why: "ばらが10こで、まとまりが1つふえるしくみが未習熟" },
      { i: 2, root: "e-math-1-20made", why: "14は10と4、と分けて見る力がまだ弱い" },
    ],
  },
  {
    unit: "e-math-1-3tsu",
    needs: [
      { unit: "e-math-1-tashizan", why: "1回ずつのたし算ができないと、3つの数は計算できない" },
      { unit: "e-math-1-hikizan", why: "1回ずつのひき算ができないと、3つの数は計算できない" },
    ],
    mistakes: [
      { i: 0, root: "e-math-1-3tsu", why: "前から順に計算する約束が身についていない" },
      { i: 1, root: "e-math-1-hikizan", why: "へる場面はひき算、という意味がつかめていない" },
      { i: 2, root: "e-math-1-3tsu", why: "とちゅうの答えを使って続ける流れが未習熟" },
    ],
  },
  {
    unit: "e-math-1-kuriagari",
    needs: [
      { unit: "e-math-1-ikutsu", why: "「あといくつで10か」は10の分け方で見つける" },
      { unit: "e-math-1-20made", why: "10といくつで十いくつ、のしくみを答えに使う" },
      { unit: "e-math-1-tashizan", why: "10までのたし算ができてこそ、くり上がりに進める" },
    ],
    mistakes: [
      { i: 0, root: "e-math-1-ikutsu", why: "8はあと2で10、という10の分け方が出てこない" },
      { i: 1, root: "e-math-1-20made", why: "10と3で13になる、十いくつのしくみが弱い" },
      { i: 2, root: "e-math-1-ikutsu", why: "4は1と3、という数の分け方がまちがっている" },
    ],
  },
  {
    unit: "e-math-1-kurisagari",
    needs: [
      { unit: "e-math-1-ikutsu", why: "10から引いたのこりは、10の分け方でわかる" },
      { unit: "e-math-1-20made", why: "14を10と4に分けて見る力を使う" },
      { unit: "e-math-1-hikizan", why: "10までのひき算ができてこそ、くり下がりに進める" },
    ],
    mistakes: [
      { i: 0, root: "e-math-1-hikizan", why: "ひかれる数からひく数をひく、の順があいまい" },
      { i: 1, root: "e-math-1-20made", why: "13は10と3、のばらの3を合わせ忘れている" },
    ],
  },
  {
    unit: "e-math-1-100made",
    needs: [{ unit: "e-math-1-20made", why: "10のまとまりとばらで数を見る考えを100まで広げる" }],
    mistakes: [
      { i: 0, root: "e-math-1-100made", why: "十のくらい・一のくらいに数字を1つずつ書けていない" },
      { i: 1, root: "e-math-1-100made", why: "ばらがないとき一のくらいに0を書く約束が未習熟" },
      { i: 2, root: "e-math-1-100made", why: "大きさは十のくらいから比べる、が身についていない" },
    ],
  },
  {
    unit: "e-math-1-tokei",
    needs: [{ unit: "e-math-1-20made", why: "12までの数字と、5ずつ数える力を時計で使う" }],
    mistakes: [
      { i: 0, root: "e-math-1-tokei", why: "短いはりが「じ」、長いはりが「ふん」の区別が未習熟" },
      { i: 1, root: "e-math-1-tokei", why: "短いはりが数字の間にあるときの読み方が未習熟" },
      { i: 2, root: "e-math-1-tokei", why: "数字1つで5分、の目もりの読み方が身についていない" },
    ],
  },
  {
    unit: "e-math-1-kurabe",
    needs: [{ unit: "e-math-1-10made", why: "「いくつぶん」を数えて、長さやかさを比べる" }],
    mistakes: [
      { i: 0, root: "e-math-1-kurabe", why: "はしをそろえて比べる考えがまだない" },
      { i: 1, root: "e-math-1-kurabe", why: "入れものの太さもかさに関係する、と気づいていない" },
      { i: 2, root: "e-math-1-kurabe", why: "同じものの「いくつぶん」で比べる考えが未習熟" },
    ],
  },
  {
    unit: "e-math-1-katachi",
    needs: [],
    mistakes: [
      { i: 0, root: "e-math-1-katachi", why: "大きさや色でなく形で分ける見方がまだない" },
      { i: 1, root: "e-math-1-katachi", why: "つつの上と下が平らなことに気づいていない" },
      { i: 2, root: "e-math-1-katachi", why: "ボールには平らな面がない、と結びついていない" },
    ],
  },
  {
    unit: "e-math-1-seiri",
    needs: [{ unit: "e-math-1-10made", why: "1つずつ数えられないと、数を整理できない" }],
    mistakes: [
      { i: 0, root: "e-math-1-seiri", why: "絵の大きさをそろえる大切さに気づいていない" },
      { i: 1, root: "e-math-1-kurabe", why: "はしをそろえて比べる考えが身についていない" },
      { i: 2, root: "e-math-1-10made", why: "数えたものを区別しながら数える方法が未習熟" },
    ],
  },

  // ===== 小2 =====
  {
    unit: "e-math-2-1000made",
    needs: [{ unit: "e-math-1-100made", why: "十・一のくらいのしくみに、百のくらいを足して広げる" }],
    mistakes: [
      { i: 0, root: "e-math-2-1000made", why: "ないくらいに0を書いて3けたにする約束が未習熟" },
      { i: 1, root: "e-math-2-1000made", why: "100が10こで1000、のまとまりがつかめていない" },
      { i: 2, root: "e-math-1-100made", why: "大きいくらいから比べる考えが100までで育っていない" },
    ],
  },
  {
    unit: "e-math-2-10000made",
    needs: [{ unit: "e-math-2-1000made", why: "百のくらいまでのしくみに千のくらいを足して広げる" }],
    mistakes: [
      { i: 0, root: "e-math-2-10000made", why: "4つのくらいを作り、ないくらいに0を書けていない" },
      { i: 1, root: "e-math-2-1000made", why: "上のくらいから比べる考えが1000までで身についていない" },
      { i: 2, root: "e-math-2-10000made", why: "読みをそのまま数字に並べ、くらいで書けていない" },
    ],
  },
  {
    unit: "e-math-2-tashi-hissan",
    needs: [
      { unit: "e-math-1-kuriagari", why: "一のくらいのくり上がりは、1年の10をつくるたし算" },
      { unit: "e-math-1-100made", why: "十のくらいと一のくらいのしくみで筆算を書く" },
    ],
    mistakes: [
      { i: 0, root: "e-math-2-tashi-hissan", why: "くり上げた1を小さく書いてたす手順が未習熟" },
      { i: 1, root: "e-math-1-100made", why: "1つのくらいには数字1つ、のしくみが弱い" },
      { i: 2, root: "e-math-1-100made", why: "7はばら7こ、と十・一のくらいで見られていない" },
    ],
  },
  {
    unit: "e-math-2-hiki-hissan",
    needs: [
      { unit: "e-math-1-kurisagari", why: "一のくらいのくり下がりは、1年の10からひく計算" },
      { unit: "e-math-1-100made", why: "十のたばを1つばらすしくみを、くらいで考える" },
    ],
    mistakes: [
      { i: 0, root: "e-math-1-kurisagari", why: "ひけないとき、上下を入れかえるくせが1年から残る" },
      { i: 1, root: "e-math-2-hiki-hissan", why: "10をかしたら十のくらいが1へる手順が未習熟" },
      { i: 2, root: "e-math-2-hiki-hissan", why: "0からもひけないのでかりる、が身についていない" },
    ],
  },
  {
    unit: "e-math-2-kakezan",
    needs: [
      { unit: "e-math-1-tashizan", why: "かけ算は、同じ数をくり返したすことがもとになる" },
      { unit: "e-math-1-100made", why: "九九の答えは2けたの数。100までの数を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-2-kakezan", why: "1つ分の数×いくつ分、の式の意味が未習熟" },
      { i: 1, root: "e-math-2-kakezan", why: "かけ算は同じ数のくり返し、と結びついていない" },
      { i: 2, root: "e-math-2-kakezan", why: "九九を、前の答えにたして確かめる力が弱い" },
    ],
  },
  {
    unit: "e-math-2-bunsu",
    needs: [
      { unit: "e-math-1-ikutsu", why: "同じ数ずつ2つに分ける力が、2分の1のもとになる" },
      { unit: "e-math-2-kakezan", why: "もとの大きさを「何こ分」で見る見方を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-2-bunsu", why: "分数は同じ大きさに分けたとき、の意味が未習熟" },
      { i: 1, root: "e-math-2-bunsu", why: "かさねて同じなら形がちがってもよい、が未習熟" },
      { i: 2, root: "e-math-2-bunsu", why: "たくさんに分けるほど1つ分は小さい、が未習熟" },
      { i: 3, root: "e-math-1-ikutsu", why: "8を同じ数ずつ2つに分ける分け方が身についていない" },
    ],
  },
  {
    unit: "e-math-2-sankaku-shikaku",
    needs: [{ unit: "e-math-1-katachi", why: "形を大きさでなく特ちょうで分ける見方を使う" }],
    mistakes: [
      { i: 0, root: "e-math-2-sankaku-shikaku", why: "三角形は直線3本でかこむ、という定義が未習熟" },
      { i: 1, root: "e-math-2-sankaku-shikaku", why: "「かこまれている」の意味がつかめていない" },
      { i: 2, root: "e-math-2-sankaku-shikaku", why: "おき方では形が変わらない、と気づいていない" },
    ],
  },
  {
    unit: "e-math-2-hako",
    needs: [
      { unit: "e-math-1-katachi", why: "はこの形を、ほかの立体と区別して見る" },
      { unit: "e-math-2-sankaku-shikaku", why: "はこのめんは長方形・正方形。その性質を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-2-hako", why: "見えないところの頂点も数える習慣がない" },
      { i: 1, root: "e-math-2-hako", why: "上下・前後・左右と組で数える方法が未習熟" },
      { i: 2, root: "e-math-2-sankaku-shikaku", why: "長方形の向かい合うへんは等しい、が使えていない" },
    ],
  },
  {
    unit: "e-math-2-hyo-graph",
    needs: [{ unit: "e-math-1-seiri", why: "わけて・ならべて・くらべる1年の整理を表とグラフに" }],
    mistakes: [
      { i: 0, root: "e-math-1-seiri", why: "大きさをそろえて並べる考えが1年で育っていない" },
      { i: 1, root: "e-math-1-hikizan", why: "「ちがい」はひき算、という意味が身についていない" },
      { i: 2, root: "e-math-1-seiri", why: "数えたものに印をつける方法が身についていない" },
    ],
  },
  {
    unit: "e-math-2-jikoku",
    needs: [{ unit: "e-math-1-tokei", why: "時計で時刻を読めないと、時間は求められない" }],
    mistakes: [
      { i: 0, root: "e-math-2-jikoku", why: "60分で時を1つ進めるしくみが未習熟" },
      { i: 1, root: "e-math-2-jikoku", why: "時刻と時間のことばの区別がついていない" },
      { i: 2, root: "e-math-1-tokei", why: "長いはりは60目もりで一回り、が身についていない" },
    ],
  },
  {
    unit: "e-math-2-nagasa",
    needs: [
      { unit: "e-math-1-kurabe", why: "同じものの「いくつぶん」を、1cmを単位にして使う" },
      { unit: "e-math-1-100made", why: "10mmで1cm。10のまとまりの考えを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-2-nagasa", why: "1cmを10に分けた1つが1mm、が身についていない" },
      { i: 1, root: "e-math-2-nagasa", why: "0の目もりに合わせる、ものさしの使い方が未習熟" },
      { i: 2, root: "e-math-2-nagasa", why: "10mmを1cmにまとめる単位のしくみが未習熟" },
    ],
  },
  {
    unit: "e-math-2-m",
    needs: [
      { unit: "e-math-2-nagasa", why: "cmとmmの単位の考えを、mとcmに広げる" },
      { unit: "e-math-2-1000made", why: "1m＝100cm。3けたの数のしくみを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-2-m", why: "1m＝100cm と 1cm＝10mm がまざっている" },
      { i: 1, root: "e-math-2-1000made", why: "100と5で105、の3けたの数のしくみが弱い" },
      { i: 2, root: "e-math-2-m", why: "100cmを1mにまとめる単位のしくみが未習熟" },
    ],
  },
  {
    unit: "e-math-2-kasa",
    needs: [
      { unit: "e-math-1-kurabe", why: "かさを「いくつぶん」で比べる考えを、1dLで使う" },
      { unit: "e-math-2-nagasa", why: "長さで学んだ単位の考えを、かさにも使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-2-kasa", why: "1dLますの10ぱい分で1L、が身についていない" },
      { i: 1, root: "e-math-1-100made", why: "10集まると上のまとまりになる考えが弱い" },
      { i: 2, root: "e-math-2-kasa", why: "単位をそろえてから比べる考えが未習熟" },
    ],
  },

  // ===== 小3 =====
  {
    unit: "e-math-3-hissan",
    needs: [
      { unit: "e-math-2-tashi-hissan", why: "2けたのたし算の筆算を、3けたに広げる" },
      { unit: "e-math-2-hiki-hissan", why: "2けたのひき算の筆算を、3けたに広げる" },
      { unit: "e-math-2-10000made", why: "百・千のくらいまでの数のしくみを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-2-tashi-hissan", why: "くり上げた1をたす手順が2年で身についていない" },
      { i: 1, root: "e-math-2-hiki-hissan", why: "ひけないとき上下を入れかえるくせが残っている" },
      { i: 2, root: "e-math-2-tashi-hissan", why: "一のくらいを右でそろえて書く基本が未習熟" },
    ],
  },
  {
    unit: "e-math-3-kake-kimari",
    needs: [{ unit: "e-math-2-kakezan", why: "九九の表をもとに、かけ算のきまりを見つける" }],
    mistakes: [
      { i: 0, root: "e-math-3-kake-kimari", why: "0こ分は何もない、というかけ算の意味が未習熟" },
      { i: 1, root: "e-math-2-kakezan", why: "九九の段は、かけられる数ずつふえる、が弱い" },
      { i: 2, root: "e-math-3-kake-kimari", why: "分けた両方にかける、分けて計算するきまりが未習熟" },
    ],
  },
  {
    unit: "e-math-3-warizan",
    needs: [{ unit: "e-math-2-kakezan", why: "わり算の答えは、わる数の段の九九で見つける" }],
    mistakes: [
      { i: 0, root: "e-math-3-warizan", why: "0こを分けると1人分も0、の意味が未習熟" },
      { i: 1, root: "e-math-3-warizan", why: "わられる数を先に書く、式の順が未習熟" },
      { i: 2, root: "e-math-2-kakezan", why: "4の段の九九で24になる数がすぐ出てこない" },
    ],
  },
  {
    unit: "e-math-3-amari",
    needs: [{ unit: "e-math-3-warizan", why: "わりきれるわり算ができてこそ、あまりを考えられる" }],
    mistakes: [
      { i: 0, root: "e-math-3-amari", why: "あまりはわる数より小さい、を確かめていない" },
      { i: 1, root: "e-math-3-amari", why: "あまりがわる数と同じなら、もう1回分けられる" },
      { i: 2, root: "e-math-3-amari", why: "あまりを場面に合わせて考える力が未習熟" },
    ],
  },
  {
    unit: "e-math-3-kake-hissan1",
    needs: [
      { unit: "e-math-3-kake-kimari", why: "かけられる数を分けて計算するきまりが筆算のもと" },
      { unit: "e-math-2-tashi-hissan", why: "くり上がりを上のくらいへ送るしくみを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-kake-hissan1", why: "九九のあとに、くり上げた数をたす手順が未習熟" },
      { i: 1, root: "e-math-3-kake-hissan1", why: "九九が先、くり上がりは後、の順が未習熟" },
      { i: 2, root: "e-math-2-tashi-hissan", why: "1つのくらいに数字1つ、くり上がりのしくみが弱い" },
    ],
  },
  {
    unit: "e-math-3-kake-hissan2",
    needs: [
      { unit: "e-math-3-kake-hissan1", why: "×1けたの筆算を2回して、たし合わせる" },
      { unit: "e-math-3-hissan", why: "最後に3けた・4けたのたし算の筆算を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-kake-hissan2", why: "2段目は×何十の答え、と位で見られていない" },
      { i: 1, root: "e-math-3-kake-hissan2", why: "段ごとに別の計算、という区別が未習熟" },
      { i: 2, root: "e-math-3-hissan", why: "大きな数のたし算でくり上がりを落としている" },
    ],
  },
  {
    unit: "e-math-3-ookii",
    needs: [{ unit: "e-math-2-10000made", why: "千のくらいまでのしくみを、万の位へ広げる" }],
    mistakes: [
      { i: 0, root: "e-math-2-10000made", why: "ないくらいに0を書く約束が4けたで身についていない" },
      { i: 1, root: "e-math-3-ookii", why: "右から4けたずつ区切って読む方法が未習熟" },
      { i: 2, root: "e-math-3-ookii", why: "まずけたの数を見る、比べ方の順が未習熟" },
    ],
  },
  {
    unit: "e-math-3-shiki",
    needs: [
      { unit: "e-math-3-hissan", why: "たし算とひき算の逆の関係で□を求める" },
      { unit: "e-math-3-warizan", why: "□×6＝42 の□はわり算で求める" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-shiki", why: "テープ図で□と全体の関係を見られていない" },
      { i: 1, root: "e-math-3-shiki", why: "ひいた数を戻すにはたす、の関係が未習熟" },
      { i: 2, root: "e-math-3-warizan", why: "1こ分を求めるのはわり算、の意味が弱い" },
    ],
  },
  {
    unit: "e-math-3-shosu",
    needs: [
      { unit: "e-math-2-kasa", why: "1dLは1Lを10に分けた1つ。0.1の考えのもと" },
      { unit: "e-math-3-hissan", why: "くらいをそろえて書く筆算を小数でも使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-shosu", why: "0.1が10こで1、くり上がるしくみが未習熟" },
      { i: 1, root: "e-math-3-hissan", why: "同じくらいをそろえて書く筆算の基本が弱い" },
      { i: 2, root: "e-math-3-shosu", why: "0.1のいくつ分で答えを読む見方が未習熟" },
    ],
  },
  {
    unit: "e-math-3-bunsu",
    needs: [
      { unit: "e-math-2-bunsu", why: "同じ大きさに分けた1つ分、という分数の意味を広げる" },
      { unit: "e-math-3-shosu", why: "1/10と0.1を同じ大きさとして結びつける" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-bunsu", why: "1/7のいくつ分で数える分数の見方が未習熟" },
      { i: 1, root: "e-math-2-bunsu", why: "多く分けるほど1つ分は小さい、が2年で未習熟" },
      { i: 2, root: "e-math-3-bunsu", why: "もとにする大きさで1こ分が変わる、が未習熟" },
      { i: 3, root: "e-math-3-bunsu", why: "1を5/5と見る見方が身についていない" },
    ],
  },
  {
    unit: "e-math-3-en-kyu",
    needs: [
      { unit: "e-math-1-katachi", why: "ボールの形（まるい立体）を知っておく" },
      { unit: "e-math-2-nagasa", why: "半径・直径の長さをものさしで正しくはかる" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-en-kyu", why: "直径は半径の2つ分、の関係が身についていない" },
      { i: 1, root: "e-math-3-en-kyu", why: "ボール1こ分の長さは直径、と結びついていない" },
      { i: 2, root: "e-math-3-en-kyu", why: "切る場所で切り口の大きさが変わる、が未習熟" },
    ],
  },
  {
    unit: "e-math-3-nitouhen",
    needs: [
      { unit: "e-math-2-sankaku-shikaku", why: "三角形・へん・頂点のことばを使ってなかま分け" },
      { unit: "e-math-3-en-kyu", why: "コンパスで等しい長さをとって三角形をかく" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-nitouhen", why: "正三角形と二等辺三角形の定義の区別が未習熟" },
      { i: 1, root: "e-math-3-nitouhen", why: "角は辺の長さでなく開きぐあい、が未習熟" },
      { i: 2, root: "e-math-3-en-kyu", why: "コンパスは等しい長さの点を集める道具、が弱い" },
    ],
  },
  {
    unit: "e-math-3-jikoku",
    needs: [{ unit: "e-math-2-jikoku", why: "時刻と時間のちがい、1時間＝60分を使う" }],
    mistakes: [
      { i: 0, root: "e-math-2-jikoku", why: "60分で時を1つ進めるしくみが2年で未習熟" },
      { i: 1, root: "e-math-2-jikoku", why: "1時間＝60分が身についていない" },
      { i: 2, root: "e-math-3-jikoku", why: "聞かれているのが時刻か時間か、の確認が未習熟" },
    ],
  },
  {
    unit: "e-math-3-km",
    needs: [
      { unit: "e-math-2-m", why: "mとcmの単位がえの考えを、kmとmに広げる" },
      { unit: "e-math-2-10000made", why: "1km＝1000m。4けたの数のしくみを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-km", why: "キロは1000の意味、が身についていない" },
      { i: 1, root: "e-math-2-10000made", why: "ないくらいに0を書く4けたの数のしくみが弱い" },
      { i: 2, root: "e-math-3-km", why: "道にそってはかるか、まっすぐかの区別が未習熟" },
    ],
  },
  {
    unit: "e-math-3-omosa",
    needs: [
      { unit: "e-math-2-kasa", why: "量を「単位のいくつ分」で表す考えを重さにも使う" },
      { unit: "e-math-3-km", why: "kは1000倍の意味。1km＝1000mと同じしくみ" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-km", why: "kは1000倍、という単位のしくみが弱い" },
      { i: 1, root: "e-math-2-10000made", why: "ないくらいに0を書く4けたの数のしくみが弱い" },
      { i: 2, root: "e-math-3-omosa", why: "1目もりの大きさを先に確かめる習慣がない" },
    ],
  },
  {
    unit: "e-math-3-bou-graph",
    needs: [{ unit: "e-math-2-hyo-graph", why: "○を並べたグラフを、棒の長さのグラフに進める" }],
    mistakes: [
      { i: 0, root: "e-math-3-bou-graph", why: "1目もりの大きさを先に確かめる習慣がない" },
      { i: 1, root: "e-math-3-bou-graph", why: "「その他」は最後、という表し方の約束が未習熟" },
      { i: 2, root: "e-math-2-hyo-graph", why: "大きさと間をそろえる、が2年で身についていない" },
      { i: 3, root: "e-math-3-bou-graph", why: "目もりが0から始まるか確かめる習慣がない" },
    ],
  },
  {
    unit: "e-math-3-soroban",
    needs: [
      { unit: "e-math-1-ikutsu", why: "5といくつ・10といくつの分け方で玉を動かす" },
      { unit: "e-math-2-1000made", why: "くらいのしくみで、けたごとに玉をおく" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-soroban", why: "五玉1こで5を表すしくみが未習熟" },
      { i: 1, root: "e-math-1-ikutsu", why: "3は5と−2、のような5の分け方がすぐ出ない" },
      { i: 2, root: "e-math-3-soroban", why: "定位点で一の位を決める使い方が未習熟" },
    ],
  },

  // ===== 小4 =====
  {
    unit: "e-math-4-ookii",
    needs: [{ unit: "e-math-3-ookii", why: "万までの4けた区切りを、億・兆へ広げる" }],
    mistakes: [
      { i: 0, root: "e-math-3-ookii", why: "右から4けたずつ区切る読み方が3年で未習熟" },
      { i: 1, root: "e-math-4-ookii", why: "億の下に万と一の4けたずつがある、が未習熟" },
      { i: 2, root: "e-math-4-ookii", why: "10倍を4回で1万倍、の位の関係が未習熟" },
    ],
  },
  {
    unit: "e-math-4-gaisu",
    needs: [{ unit: "e-math-4-ookii", why: "位がわかってはじめて、どこで丸めるか決まる" }],
    mistakes: [
      { i: 0, root: "e-math-4-gaisu", why: "知りたい位の1つ下を見る、が未習熟" },
      { i: 1, root: "e-math-4-gaisu", why: "四捨五入は1回だけ、のきまりが未習熟" },
      { i: 2, root: "e-math-4-gaisu", why: "以上・以下・未満の意味の区別が未習熟" },
      { i: 3, root: "e-math-4-gaisu", why: "目的に合わせて切り上げを使う考えが未習熟" },
    ],
  },
  {
    unit: "e-math-4-kaku",
    needs: [
      { unit: "e-math-3-nitouhen", why: "角は辺の開きぐあい、という見方を数で表す" },
      { unit: "e-math-2-sankaku-shikaku", why: "直角を基準に90°、180°を考える" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-kaku", why: "0°から数える目もりを選ぶ使い方が未習熟" },
      { i: 1, root: "e-math-3-nitouhen", why: "角は辺の長さでなく開きぐあい、が3年で未習熟" },
      { i: 2, root: "e-math-4-kaku", why: "1回転は360°、を使ってひく考えが未習熟" },
    ],
  },
  {
    unit: "e-math-4-suichoku",
    needs: [
      { unit: "e-math-4-kaku", why: "垂直は90°で交わること。角の大きさを使う" },
      { unit: "e-math-2-sankaku-shikaku", why: "直角や四角形の見方をもとになかま分けする" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-suichoku", why: "線をのばして交わり方を見る考えが未習熟" },
      { i: 1, root: "e-math-4-suichoku", why: "平行は向きの関係、という意味が未習熟" },
      { i: 2, root: "e-math-4-suichoku", why: "ひし形と平行四辺形の性質の区別が未習熟" },
    ],
  },
  {
    unit: "e-math-4-chokuhotai",
    needs: [
      { unit: "e-math-2-hako", why: "はこの形の面・辺・頂点の見方をもとにする" },
      { unit: "e-math-4-suichoku", why: "面と面の平行・垂直を、直線の関係から考える" },
    ],
    mistakes: [
      { i: 0, root: "e-math-2-hako", why: "見えない辺も組で数える方法が2年で未習熟" },
      { i: 1, root: "e-math-4-suichoku", why: "平行と垂直の意味の区別がついていない" },
      { i: 2, root: "e-math-2-hako", why: "向かい合う面が同じ形、の見方が育っていない" },
      { i: 3, root: "e-math-4-chokuhotai", why: "展開図を頭の中で組み立てる力が未習熟" },
    ],
  },
  {
    unit: "e-math-4-kawarikata",
    needs: [{ unit: "e-math-3-shiki", why: "わからない数を□にして式に表す考えを使う" }],
    mistakes: [
      { i: 0, root: "e-math-2-sankaku-shikaku", why: "長方形は向かい合う辺が等しい、が使えていない" },
      { i: 1, root: "e-math-4-kawarikata", why: "表にして差が一定かを確かめる考えが未習熟" },
      { i: 2, root: "e-math-3-shiki", why: "かけた数を戻すにはわる、の関係が弱い" },
    ],
  },
  {
    unit: "e-math-4-keisan-kimari",
    needs: [
      { unit: "e-math-3-kake-kimari", why: "かけられる数を分けて計算するきまりを広げる" },
      { unit: "e-math-3-shiki", why: "場面を1つの式に表す考えを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-keisan-kimari", why: "×・÷は＋・−より先、の順序が未習熟" },
      { i: 1, root: "e-math-3-kake-kimari", why: "分けた両方にかけるきまりが3年で未習熟" },
      { i: 2, root: "e-math-4-keisan-kimari", why: "ひき算はまとめ方で答えが変わる、が未習熟" },
    ],
  },
  {
    unit: "e-math-4-menseki",
    needs: [
      { unit: "e-math-2-sankaku-shikaku", why: "長方形・正方形の形と性質を使う" },
      { unit: "e-math-2-m", why: "1m＝100cm の単位がえで長さをそろえる" },
      { unit: "e-math-3-kake-hissan2", why: "たて×横の計算に2けたのかけ算を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-menseki", why: "面積は1cm²のいくつ分、の単位の意味が未習熟" },
      { i: 1, root: "e-math-2-m", why: "mとcmの単位がえが身についていない" },
      { i: 2, root: "e-math-4-menseki", why: "1m²は100cm×100cm、の見方が未習熟" },
    ],
  },
  {
    unit: "e-math-4-oresen",
    needs: [{ unit: "e-math-3-bou-graph", why: "目もりの読み方・グラフのかき方を棒グラフで学ぶ" }],
    mistakes: [
      { i: 0, root: "e-math-4-oresen", why: "折れ線は時間で変わるものに使う、が未習熟" },
      { i: 1, root: "e-math-3-bou-graph", why: "1目もりの大きさを確かめる習慣が3年で育っていない" },
      { i: 2, root: "e-math-4-oresen", why: "変わり方は高さでなく傾きで読む、が未習熟" },
    ],
  },
  {
    unit: "e-math-4-seiri",
    needs: [{ unit: "e-math-3-bou-graph", why: "正の字で数えて表にまとめる方法を使う" }],
    mistakes: [
      { i: 0, root: "e-math-4-seiri", why: "2つの欄をたして読む二次元表の読み方が未習熟" },
      { i: 1, root: "e-math-4-seiri", why: "重なりを2回数えない考えが未習熟" },
      { i: 2, root: "e-math-1-seiri", why: "数えたものに印をつける方法が身についていない" },
      { i: 3, root: "e-math-4-seiri", why: "合計で数え落としを確かめる習慣がない" },
    ],
  },
  {
    unit: "e-math-4-shosu",
    needs: [{ unit: "e-math-3-shosu", why: "0.1のいくつ分の考えを、0.01・0.001へ広げる" }],
    mistakes: [
      { i: 0, root: "e-math-4-shosu", why: "けた数でなく上の位から比べる、が未習熟" },
      { i: 1, root: "e-math-3-shosu", why: "小数点をそろえて書く筆算が3年で身についていない" },
      { i: 2, root: "e-math-4-shosu", why: "10倍で小数点が右へ1けた動く、が未習熟" },
    ],
  },
  {
    unit: "e-math-4-bunsu",
    needs: [
      { unit: "e-math-3-bunsu", why: "1/5のいくつ分、の分数の見方を1より大きい数へ" },
      { unit: "e-math-3-amari", why: "仮分数→帯分数は、あまりのあるわり算で直す" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-bunsu", why: "整数部分は分母の数のいくつ分、が未習熟" },
      { i: 1, root: "e-math-4-bunsu", why: "帯分数の分数部分は真分数にする、が未習熟" },
      { i: 2, root: "e-math-4-bunsu", why: "分子と分母が同じなら1、の見方が未習熟" },
    ],
  },
  {
    unit: "e-math-4-wari-hissan1",
    needs: [
      { unit: "e-math-3-amari", why: "あまりはわる数より小さい、を毎回確かめる" },
      { unit: "e-math-3-hissan", why: "「ひく」の段でひき算の筆算を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-wari-hissan1", why: "商が立たない位に0を書く手順が未習熟" },
      { i: 1, root: "e-math-3-amari", why: "あまりがわる数より小さいか確かめていない" },
      { i: 2, root: "e-math-3-warizan", why: "九九で、わられる数をこえない商を選べていない" },
    ],
  },
  {
    unit: "e-math-4-wari-hissan2",
    needs: [
      { unit: "e-math-4-wari-hissan1", why: "たてる→かける→ひく→おろすの手順は同じ" },
      { unit: "e-math-4-gaisu", why: "わる数を何十とみて商の見当をつける" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-amari", why: "あまりがわる数より小さいか確かめていない" },
      { i: 1, root: "e-math-4-wari-hissan2", why: "商を立てる位を、わられる数の位で決められていない" },
      { i: 2, root: "e-math-4-wari-hissan1", why: "商が立たない位に0を書く手順が未習熟" },
    ],
  },
  {
    unit: "e-math-4-shosu-kakewari",
    needs: [
      { unit: "e-math-4-shosu", why: "0.1・0.01のいくつ分で小数を見る" },
      { unit: "e-math-3-kake-hissan1", why: "整数のかけ算の筆算をそのまま使う" },
      { unit: "e-math-4-wari-hissan1", why: "整数のわり算の筆算をそのまま使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-shosu-kakewari", why: "かけられる数の小数点の位置に合わせる、が未習熟" },
      { i: 1, root: "e-math-4-shosu-kakewari", why: "あまりの小数点はもとの位置、が未習熟" },
      { i: 2, root: "e-math-4-shosu-kakewari", why: "終わりの0を消す答え方の約束が未習熟" },
    ],
  },
  {
    unit: "e-math-4-soroban",
    needs: [{ unit: "e-math-3-soroban", why: "5玉・1玉の表し方と定位点の使い方を広げる" }],
    mistakes: [
      { i: 0, root: "e-math-3-soroban", why: "上の玉は5を表す、が3年で身についていない" },
      { i: 1, root: "e-math-3-soroban", why: "定位点で一の位を決める使い方が未習熟" },
      { i: 2, root: "e-math-3-shosu", why: "0.7は1/10の位、の小数のしくみが弱い" },
      { i: 3, root: "e-math-3-soroban", why: "5を入れて余分をはらう動きが身についていない" },
    ],
  },
  {
    unit: "e-math-4-wariai",
    needs: [
      { unit: "e-math-3-warizan", why: "何倍かは、わり算で求める" },
      { unit: "e-math-3-shiki", why: "□を使ったかけ算の式で関係を表す" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-wariai", why: "もとにする量でわる、が身についていない" },
      { i: 1, root: "e-math-4-wariai", why: "差でなく倍で比べる見方が未習熟" },
      { i: 2, root: "e-math-3-shiki", why: "かけ算を戻すにはわり算、の関係が弱い" },
    ],
  },

  // ===== 小5 =====
  {
    unit: "e-math-5-seisu-shosu",
    needs: [{ unit: "e-math-4-shosu", why: "10倍・1/10で小数点が動くしくみを広げる" }],
    mistakes: [
      { i: 0, root: "e-math-4-shosu", why: "0をつけても大きさは同じ、が4年で未習熟" },
      { i: 1, root: "e-math-5-seisu-shosu", why: "1/100で左へ2けた動く、0を補う方法が未習熟" },
      { i: 2, root: "e-math-5-seisu-shosu", why: "1/10にすると数は小さくなる、の向きが未習熟" },
    ],
  },
  {
    unit: "e-math-5-shosu-kake",
    needs: [
      { unit: "e-math-4-shosu-kakewari", why: "小数×整数を、小数×小数に広げる" },
      { unit: "e-math-5-seisu-shosu", why: "10倍して計算し1/10に戻すしくみを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-shosu-kake", why: "小数点の右のけた数をたす、が未習熟" },
      { i: 1, root: "e-math-5-shosu-kake", why: "積の小数点の位置と見積もりの確かめが未習熟" },
      { i: 2, root: "e-math-4-shosu-kakewari", why: "終わりの0を消す約束が4年で身についていない" },
      { i: 3, root: "e-math-5-shosu-kake", why: "1より小さい数をかけると小さくなる、が未習熟" },
    ],
  },
  {
    unit: "e-math-5-shosu-wari",
    needs: [
      { unit: "e-math-4-shosu-kakewari", why: "小数÷整数の計算とあまりの出し方を使う" },
      { unit: "e-math-4-wari-hissan2", why: "わる数を整数にしたあと、÷2けたの筆算を使う" },
      { unit: "e-math-5-seisu-shosu", why: "両方を10倍して小数点を動かすしくみを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-shosu-kakewari", why: "あまりの小数点はもとの位置、が4年で未習熟" },
      { i: 1, root: "e-math-5-shosu-wari", why: "両方を同じ倍にすると商は同じ、が未習熟" },
      { i: 2, root: "e-math-5-shosu-wari", why: "1より小さい数でわると商は大きい、が未習熟" },
    ],
  },
  {
    unit: "e-math-5-baisu-yakusu",
    needs: [
      { unit: "e-math-2-kakezan", why: "九九の段の答えが、その数の倍数の並び" },
      { unit: "e-math-3-amari", why: "わりきれるかどうかで約数を見分ける" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-baisu-yakusu", why: "1とその数自身も約数、を組で見つける方法が未習熟" },
      { i: 1, root: "e-math-5-baisu-yakusu", why: "公倍数のうちいちばん小さいもの、の意味が未習熟" },
      { i: 2, root: "e-math-3-warizan", why: "0÷2＝0 でわりきれる、0のわり算が弱い" },
    ],
  },
  {
    unit: "e-math-5-bunsu-shosu",
    needs: [
      { unit: "e-math-4-bunsu", why: "仮分数・帯分数で、1より大きい分数を表す" },
      { unit: "e-math-4-shosu-kakewari", why: "わり進んで商を小数で出す計算を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-bunsu-shosu", why: "わられる数が分子、わる数が分母、が未習熟" },
      { i: 1, root: "e-math-5-bunsu-shosu", why: "分数は分子÷分母、の関係が未習熟" },
      { i: 2, root: "e-math-3-shosu", why: "0.3は0.1が3つ分、という小数の見方が弱い" },
    ],
  },
  {
    unit: "e-math-5-bunsu-tashihiki",
    needs: [
      { unit: "e-math-5-baisu-yakusu", why: "通分は公倍数、約分は公約数を使う" },
      { unit: "e-math-4-bunsu", why: "帯分数・仮分数の直し方と同分母のたし算を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-bunsu", why: "分母は何等分したかでたさない、が3年で未習熟" },
      { i: 1, root: "e-math-5-bunsu-tashihiki", why: "分母と分子に同じ数をかける、が未習熟" },
      { i: 2, root: "e-math-5-bunsu-tashihiki", why: "答えを約分して終える習慣がない" },
    ],
  },
  {
    unit: "e-math-5-goudou",
    needs: [
      { unit: "e-math-3-nitouhen", why: "コンパスで辺の長さをうつして三角形をかく" },
      { unit: "e-math-4-kaku", why: "分度器で角の大きさをはかってかく" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-goudou", why: "合同は大きさもふくめてぴったり重なること" },
      { i: 1, root: "e-math-5-goudou", why: "裏返して重なっても合同、が未習熟" },
      { i: 2, root: "e-math-5-goudou", why: "2辺の「間の角」でないと形が決まらない" },
      { i: 3, root: "e-math-5-goudou", why: "角だけでは大きさが決まらない、が未習熟" },
    ],
  },
  {
    unit: "e-math-5-zukei-kaku",
    needs: [
      { unit: "e-math-4-kaku", why: "角の大きさを°で表し、180°・360°を使う" },
      { unit: "e-math-3-nitouhen", why: "二等辺・正三角形の角の性質を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-zukei-kaku", why: "四角形は三角形2つ分、の見方が未習熟" },
      { i: 1, root: "e-math-5-zukei-kaku", why: "中心にできた360°をひく考えが未習熟" },
      { i: 2, root: "e-math-3-nitouhen", why: "二等辺三角形の2つの角は等しい、が弱い" },
    ],
  },
  {
    unit: "e-math-5-menseki",
    needs: [
      { unit: "e-math-4-menseki", why: "長方形の面積をもとに、形を変えて考える" },
      { unit: "e-math-4-suichoku", why: "高さは底辺に垂直な長さ。垂直の意味を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-menseki", why: "三角形は平行四辺形の半分、の見方が未習熟" },
      { i: 1, root: "e-math-4-suichoku", why: "垂直な長さ、という意味がつかめていない" },
      { i: 2, root: "e-math-5-menseki", why: "台形2つで平行四辺形、の見方が未習熟" },
    ],
  },
  {
    unit: "e-math-5-seitakakkei",
    needs: [
      { unit: "e-math-3-en-kyu", why: "円の中心・半径・直径の関係を使う" },
      { unit: "e-math-4-kaku", why: "中心の360°を等分して角をはかる" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-suichoku", why: "ひし形は辺が等しくても角がちがう、が弱い" },
      { i: 1, root: "e-math-3-en-kyu", why: "直径は半径の2つ分、の関係が身についていない" },
      { i: 2, root: "e-math-5-seitakakkei", why: "中心の角を辺の数で等分する、が未習熟" },
    ],
  },
  {
    unit: "e-math-5-kakuchu",
    needs: [
      { unit: "e-math-4-chokuhotai", why: "直方体の面・辺・頂点と展開図の見方を広げる" },
      { unit: "e-math-5-seitakakkei", why: "円柱の側面の横は円周。円周の求め方を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-kakuchu", why: "側面と2つの底面を分けて数える方法が未習熟" },
      { i: 1, root: "e-math-5-seitakakkei", why: "円周＝直径×3.14、が結びついていない" },
      { i: 2, root: "e-math-5-kakuchu", why: "底面は置き方でなく形で決まる、が未習熟" },
      { i: 3, root: "e-math-5-kakuchu", why: "合同で平行な2つの底面、の定義が未習熟" },
    ],
  },
  {
    unit: "e-math-5-taiseki",
    needs: [
      { unit: "e-math-4-chokuhotai", why: "直方体・立方体の形と辺の見方を使う" },
      { unit: "e-math-4-menseki", why: "1段の数＝たて×横、は面積の考えそのもの" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-menseki", why: "1段に並ぶ数はたて×横、の面積の考えが弱い" },
      { i: 1, root: "e-math-5-taiseki", why: "3方向がそれぞれ100倍になる、が未習熟" },
      { i: 2, root: "e-math-5-taiseki", why: "容積は内のりで求める、が未習熟" },
      { i: 3, root: "e-math-5-taiseki", why: "上がった分だけがおしのけた体積、が未習熟" },
    ],
  },
  {
    unit: "e-math-5-heikin",
    needs: [{ unit: "e-math-4-shosu-kakewari", why: "合計÷個数をわり進めて小数で出す" }],
    mistakes: [
      { i: 0, root: "e-math-5-heikin", why: "0の日も1日として個数に入れる、が未習熟" },
      { i: 1, root: "e-math-5-heikin", why: "平均はならした大きさ、の意味が未習熟" },
      { i: 2, root: "e-math-5-heikin", why: "合計＝平均×個数、と逆にたどる考えが未習熟" },
    ],
  },
  {
    unit: "e-math-5-tanni",
    needs: [
      { unit: "e-math-5-heikin", why: "ならして1つ分にそろえる平均の考えを使う" },
      { unit: "e-math-5-shosu-wari", why: "1あたりの量を求める小数のわり算を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-tanni", why: "何を何でわったかで見方が逆になる、が未習熟" },
      { i: 1, root: "e-math-5-tanni", why: "1km²あたりの人数は面積でわる、が未習熟" },
      { i: 2, root: "e-math-5-tanni", why: "1本あたりにそろえて比べる考えが未習熟" },
    ],
  },
  {
    unit: "e-math-5-hayasa",
    needs: [
      { unit: "e-math-5-tanni", why: "速さは「1時間あたりの道のり」。単位量の考え" },
      { unit: "e-math-3-jikoku", why: "1時間＝60分、時間の単位のしくみを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-jikoku", why: "1時間は60分、を10進法とまぜている" },
      { i: 1, root: "e-math-5-hayasa", why: "速さと時間の単位をそろえる、が未習熟" },
      { i: 2, root: "e-math-5-hayasa", why: "道のり÷速さ＝時間の関係が未習熟" },
    ],
  },
  {
    unit: "e-math-5-hirei",
    needs: [{ unit: "e-math-4-kawarikata", why: "ともなって変わる量を表にしてきまりを見る" }],
    mistakes: [
      { i: 0, root: "e-math-5-hirei", why: "2倍なら2倍、を確かめる見方が未習熟" },
      { i: 1, root: "e-math-5-hirei", why: "同じ数ずつ増えるだけでは比例でない、が未習熟" },
    ],
  },
  {
    unit: "e-math-5-wariai",
    needs: [
      { unit: "e-math-4-wariai", why: "何倍かでくらべる考えを、小数の割合に広げる" },
      { unit: "e-math-5-shosu-kake", why: "比べる量＝もとにする量×割合 を小数で計算" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-wariai", why: "百分率を小数の割合に直す、が未習熟" },
      { i: 1, root: "e-math-4-wariai", why: "もとにする量でわる、が4年で身についていない" },
      { i: 2, root: "e-math-5-wariai", why: "残りの割合（1−0.2）で考える方法が未習熟" },
    ],
  },
  {
    unit: "e-math-5-obi-en",
    needs: [{ unit: "e-math-5-wariai", why: "全体を100%として部分の割合を求める" }],
    mistakes: [
      { i: 0, root: "e-math-5-wariai", why: "割合は部分÷全体、もとにする量でわる、が弱い" },
      { i: 1, root: "e-math-3-bou-graph", why: "「その他」は最後、のグラフの約束が未習熟" },
      { i: 2, root: "e-math-5-wariai", why: "量＝全体×割合、と戻して比べる考えが弱い" },
    ],
  },

  // ===== 小6 =====
  {
    unit: "e-math-6-taisho",
    needs: [
      { unit: "e-math-5-goudou", why: "折ったり回したりして、ぴったり重なるかを見る" },
      { unit: "e-math-4-suichoku", why: "対応する点を結ぶ線は軸と垂直、を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-taisho", why: "折って重なるか、実際に確かめる見方が未習熟" },
      { i: 1, root: "e-math-6-taisho", why: "点対称は180°回転、のきまりが未習熟" },
      { i: 2, root: "e-math-4-suichoku", why: "垂直な線をひく作図が身についていない" },
    ],
  },
  {
    unit: "e-math-6-moji-shiki",
    needs: [
      { unit: "e-math-3-shiki", why: "□を使った式を、xやyの式に進める" },
      { unit: "e-math-4-keisan-kimari", why: "かっこ・計算の順序のきまりを文字の式でも使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-moji-shiki", why: "あとの計算から順に戻す逆算の考えが未習熟" },
      { i: 1, root: "e-math-2-kakezan", why: "同じ値段の3つ分はかけ算、の意味が弱い" },
      { i: 2, root: "e-math-4-keisan-kimari", why: "まとめて2倍するにはかっこ、のきまりが弱い" },
      { i: 3, root: "e-math-6-moji-shiki", why: "×をはぶいた書き方の約束が未習熟" },
    ],
  },
  {
    unit: "e-math-6-bunsu-kake",
    needs: [
      { unit: "e-math-5-bunsu-tashihiki", why: "約分のしかたを、かける前や答えで使う" },
      { unit: "e-math-5-shosu-kake", why: "1より小さい数をかけると小さくなる、を分数にも" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-bunsu-kake", why: "かけ算は通分せず分母・分子どうしかける" },
      { i: 1, root: "e-math-6-bunsu-kake", why: "整数は分子にだけかける、のわけが未習熟" },
      { i: 2, root: "e-math-6-bunsu-kake", why: "÷整数は分母にかける、の意味が未習熟" },
      { i: 3, root: "e-math-4-bunsu", why: "帯分数を仮分数に直す方法が身についていない" },
    ],
  },
  {
    unit: "e-math-6-bunsu-wari",
    needs: [
      { unit: "e-math-6-bunsu-kake", why: "わり算は逆数をかけるかけ算に直して計算" },
      { unit: "e-math-5-shosu-wari", why: "1より小さい数でわると商は大きい、を分数にも" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-bunsu-wari", why: "逆数にするのはわる数だけ、が未習熟" },
      { i: 1, root: "e-math-4-bunsu", why: "帯分数を仮分数に直す方法が身についていない" },
      { i: 2, root: "e-math-5-shosu-wari", why: "1より小さい数でわると大きくなる、が弱い" },
    ],
  },
  {
    unit: "e-math-6-en-menseki",
    needs: [
      { unit: "e-math-5-seitakakkei", why: "円周＝直径×3.14 が長方形の横の長さになる" },
      { unit: "e-math-5-menseki", why: "形を変えて長方形にする面積の考えを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-3-en-kyu", why: "直径は半径の2つ分、の関係が身についていない" },
      { i: 1, root: "e-math-6-en-menseki", why: "円周の式と面積の式の区別が未習熟" },
      { i: 2, root: "e-math-6-en-menseki", why: "面積とまわりの長さの区別が未習熟" },
    ],
  },
  {
    unit: "e-math-6-kakuchu-taiseki",
    needs: [
      { unit: "e-math-5-taiseki", why: "直方体の体積を、底面積×高さと見直す" },
      { unit: "e-math-5-kakuchu", why: "角柱・円柱の底面と高さの見方を使う" },
      { unit: "e-math-6-en-menseki", why: "円柱の底面積は円の面積で求める" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-menseki", why: "三角形の面積は÷2、が5年で身についていない" },
      { i: 1, root: "e-math-6-en-menseki", why: "円の面積は半径×半径、が身についていない" },
      { i: 2, root: "e-math-5-taiseki", why: "体積はcm³、の単位の意味がつかめていない" },
    ],
  },
  {
    unit: "e-math-6-hi",
    needs: [
      { unit: "e-math-5-baisu-yakusu", why: "比を簡単にするとき公約数でわる" },
      { unit: "e-math-5-bunsu-shosu", why: "比の値 a÷b を分数で表す" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-bunsu-shosu", why: "a÷b＝a/b、わり算と分数の関係が弱い" },
      { i: 1, root: "e-math-5-baisu-yakusu", why: "最大公約数をすぐに見つける力が弱い" },
      { i: 2, root: "e-math-6-hi", why: "全体を比の和のいくつ分と見る考えが未習熟" },
    ],
  },
  {
    unit: "e-math-6-kakudai",
    needs: [
      { unit: "e-math-6-hi", why: "どの辺も同じ比でのばす。比の考えを使う" },
      { unit: "e-math-5-goudou", why: "対応する辺・角の見方を合同から広げる" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-kakudai", why: "拡大しても角は変わらない、が未習熟" },
      { i: 1, root: "e-math-2-m", why: "100cm＝1m の単位がえが身についていない" },
      { i: 2, root: "e-math-6-kakudai", why: "たすのでなく同じ数をかける、が未習熟" },
      { i: 3, root: "e-math-6-kakudai", why: "同じ形の三角形をつくる条件が未習熟" },
    ],
  },
  {
    unit: "e-math-6-hirei-hanpirei",
    needs: [
      { unit: "e-math-5-hirei", why: "2倍・3倍の関係を、式とグラフに広げる" },
      { unit: "e-math-6-moji-shiki", why: "y＝決まった数×x のように x と y で式に表す" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-hirei", why: "増えるだけでは比例でない、が5年で未習熟" },
      { i: 1, root: "e-math-6-hirei-hanpirei", why: "反比例は「何分の1」になる関係、が未習熟" },
      { i: 2, root: "e-math-6-hirei-hanpirei", why: "反比例は x×y が一定、の区別が未習熟" },
    ],
  },
  {
    unit: "e-math-6-narabekata",
    needs: [
      { unit: "e-math-4-seiri", why: "落ちや重なりがないように整理して数える" },
      { unit: "e-math-2-kakezan", why: "「何通りずつ」をかけ算で数える" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-narabekata", why: "先頭を決めて樹形図にかく方法が未習熟" },
      { i: 1, root: "e-math-6-narabekata", why: "順番のない組み合わせの区別が未習熟" },
      { i: 2, root: "e-math-6-narabekata", why: "条件に合わない枝を消す考えが未習熟" },
    ],
  },
  {
    unit: "e-math-6-data",
    needs: [
      { unit: "e-math-5-heikin", why: "代表値の1つ、平均値の求め方を使う" },
      { unit: "e-math-3-bou-graph", why: "柱状グラフは、棒グラフの読み方・かき方を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-data", why: "大きさの順に並べてから真ん中を見る、が未習熟" },
      { i: 1, root: "e-math-4-gaisu", why: "以上・未満の意味が4年で身についていない" },
      { i: 2, root: "e-math-6-data", why: "目的に合わせて代表値を選ぶ考えが未習熟" },
    ],
  },
  {
    unit: "e-math-6-oyoso",
    needs: [
      { unit: "e-math-5-menseki", why: "三角形・台形などの面積の公式を使う" },
      { unit: "e-math-6-en-menseki", why: "円とみたときの面積の公式を使う" },
      { unit: "e-math-4-gaisu", why: "長さをがい数にして計算を楽にする" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-oyoso", why: "一部の方眼は半分とみる約束が未習熟" },
      { i: 1, root: "e-math-6-en-menseki", why: "円の面積は半径を使う、が身についていない" },
      { i: 2, root: "e-math-4-gaisu", why: "がい数は「約」をつけて表す、が弱い" },
    ],
  },

  // ===== 中1 =====
  {
    unit: "j-math-1-seifu",
    needs: [
      { unit: "e-math-4-keisan-kimari", why: "計算の順序のきまりを負の数でも使う" },
      { unit: "e-math-6-bunsu-wari", why: "分数・小数のかけ算・わり算をそのまま使う" },
    ],
    mistakes: [
      { i: 0, root: "j-math-1-seifu", why: "負の数は0から左へ遠いほど小さい、が未習熟" },
      { i: 1, root: "j-math-1-seifu", why: "ひき算は反対の数をたす、の直し方が未習熟" },
      { i: 2, root: "j-math-1-seifu", why: "指数がかかる範囲の読み方が未習熟" },
      { i: 3, root: "j-math-1-seifu", why: "絶対値は0からの距離、の意味が未習熟" },
    ],
  },
  {
    unit: "j-math-1-moji",
    needs: [
      { unit: "e-math-6-moji-shiki", why: "x を使って数量を式に表す考えを広げる" },
      { unit: "j-math-1-seifu", why: "正負の数の計算を、係数の計算に使う" },
    ],
    mistakes: [
      { i: 0, root: "j-math-1-moji", why: "文字の部分が同じ項だけまとめる、が未習熟" },
      { i: 1, root: "j-math-1-seifu", why: "負の数をひくと符号が変わる、が身についていない" },
      { i: 2, root: "j-math-1-seifu", why: "(−3)×(−4)＝＋12、負×負の符号が弱い" },
      { i: 3, root: "j-math-1-moji", why: "係数の1をはぶく書き方の約束が未習熟" },
    ],
  },
  {
    unit: "j-math-1-hoteishiki",
    needs: [{ unit: "j-math-1-moji", why: "文字式の計算（同類項・分配法則）で式を整理する" }],
    mistakes: [
      { i: 0, root: "j-math-1-hoteishiki", why: "移項すると符号が変わる、が未習熟" },
      { i: 1, root: "j-math-1-hoteishiki", why: "両辺のすべての項に同じ数をかける、が未習熟" },
      { i: 2, root: "j-math-1-moji", why: "かっこの中のすべての項にかける分配法則が弱い" },
      { i: 3, root: "e-math-6-moji-shiki", why: "3x は 3×x、×3 を戻すのは÷3、が弱い" },
    ],
  },
  {
    unit: "j-math-1-hirei",
    needs: [
      { unit: "e-math-6-hirei-hanpirei", why: "小6の比例・反比例を、負の数まで広げる" },
      { unit: "j-math-1-seifu", why: "x や比例定数に負の数が入る" },
      { unit: "j-math-1-hoteishiki", why: "1点を代入して比例定数 a を方程式で求める" },
    ],
    mistakes: [
      { i: 0, root: "j-math-1-hirei", why: "比例定数が負の比例、という見方が未習熟" },
      { i: 1, root: "e-math-6-hirei-hanpirei", why: "反比例の決まった数は x×y、が小6で未習熟" },
      { i: 2, root: "j-math-1-hirei", why: "座標は (x, y) の順、の約束が未習熟" },
      { i: 3, root: "j-math-1-hirei", why: "反比例のグラフは軸に交わらない曲線、が未習熟" },
    ],
  },
  {
    unit: "j-math-1-heimen",
    needs: [
      { unit: "e-math-6-taisho", why: "線対称・点対称を、対称移動・回転移動に広げる" },
      { unit: "e-math-6-en-menseki", why: "円の面積・円周をもとに、おうぎ形を求める" },
      { unit: "j-math-1-moji", why: "円周率を文字 π で表して計算する" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-en-menseki", why: "円周の式と円の面積の式の区別が弱い" },
      { i: 1, root: "j-math-1-heimen", why: "π を文字のまま答える中学の約束が未習熟" },
      { i: 2, root: "e-math-6-taisho", why: "点対称は180°回転、線対称は折り返し、が弱い" },
    ],
  },
  {
    unit: "j-math-1-kukan",
    needs: [
      { unit: "e-math-6-kakuchu-taiseki", why: "柱体の体積＝底面積×高さ をもとに錐体を考える" },
      { unit: "j-math-1-heimen", why: "円錐の展開図の側面はおうぎ形" },
    ],
    mistakes: [
      { i: 0, root: "j-math-1-kukan", why: "錐体は柱体の1/3、が身についていない" },
      { i: 1, root: "j-math-1-kukan", why: "空間ではねじれの位置がある、が未習熟" },
      { i: 2, root: "j-math-1-kukan", why: "側面のおうぎ形の半径は母線、が未習熟" },
    ],
  },
  {
    unit: "j-math-1-data",
    needs: [
      { unit: "e-math-6-data", why: "度数分布表・代表値を、相対度数へ広げる" },
      { unit: "e-math-5-wariai", why: "相対度数は全体に対する割合" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-data", why: "並べてから真ん中、の中央値の求め方が小6で未習熟" },
      { i: 1, root: "j-math-1-data", why: "最頻値は度数でなく階級値、が未習熟" },
      { i: 2, root: "e-math-5-wariai", why: "全体がちがうときは割合で比べる、が弱い" },
    ],
  },

  // ===== 中2 =====
  {
    unit: "j-math-2-shiki",
    needs: [{ unit: "j-math-1-moji", why: "1年の文字式の計算を、多項式・単項式に広げる" }],
    mistakes: [
      { i: 0, root: "j-math-1-moji", why: "−( ) は全部の項の符号を変える、が1年で未習熟" },
      { i: 1, root: "j-math-2-shiki", why: "一般の数を別々の文字で表す考えが未習熟" },
      { i: 2, root: "j-math-1-moji", why: "文字の部分が同じ項だけまとめる、が弱い" },
    ],
  },
  {
    unit: "j-math-2-renritsu",
    needs: [
      { unit: "j-math-1-hoteishiki", why: "文字を1つ消すと、一次方程式として解ける" },
      { unit: "j-math-2-shiki", why: "式を何倍かしてたし・ひきする多項式の計算" },
    ],
    mistakes: [
      { i: 0, root: "j-math-1-seifu", why: "2y−(−y)＝3y、負の数のひき算が弱い" },
      { i: 1, root: "j-math-1-hoteishiki", why: "両辺のすべての項にかける等式の性質が弱い" },
      { i: 2, root: "j-math-1-moji", why: "かっこごと代入して符号を変える、が弱い" },
      { i: 3, root: "j-math-2-renritsu", why: "解は x と y の組、の意味が未習熟" },
    ],
  },
  {
    unit: "j-math-2-ichiji-kansu",
    needs: [
      { unit: "j-math-1-hirei", why: "比例 y＝ax に b を足したのが一次関数" },
      { unit: "j-math-2-renritsu", why: "2直線の交点は連立方程式で求める" },
    ],
    mistakes: [
      { i: 0, root: "j-math-2-ichiji-kansu", why: "y の増加量÷x の増加量、の順が未習熟" },
      { i: 1, root: "j-math-2-ichiji-kansu", why: "増加量どうしでわる変化の割合の意味が未習熟" },
      { i: 2, root: "j-math-1-moji", why: "符号もふくめて係数・定数項を読む力が弱い" },
    ],
  },
  {
    unit: "j-math-2-heiko-godo",
    needs: [
      { unit: "e-math-5-zukei-kaku", why: "三角形・多角形の角の和を、根拠つきで見直す" },
      { unit: "e-math-5-goudou", why: "合同な三角形のかき方が、合同条件のもと" },
    ],
    mistakes: [
      { i: 0, root: "j-math-2-heiko-godo", why: "同位角が等しいのは平行なときだけ、が未習熟" },
      { i: 1, root: "e-math-5-goudou", why: "2辺と「間の角」で形が決まる、が小5で未習熟" },
      { i: 2, root: "j-math-2-heiko-godo", why: "対応する頂点を同じ順に書く約束が未習熟" },
      { i: 3, root: "j-math-2-heiko-godo", why: "内角の和と外角の和の区別が未習熟" },
    ],
  },
  {
    unit: "j-math-2-sankaku-shikaku",
    needs: [
      { unit: "j-math-2-heiko-godo", why: "合同条件・平行線の角を証明の根拠に使う" },
      { unit: "e-math-4-suichoku", why: "平行四辺形・ひし形の性質を証明で確かめる" },
    ],
    mistakes: [
      { i: 0, root: "j-math-2-sankaku-shikaku", why: "平行四辺形になる条件の読み方が未習熟" },
      { i: 1, root: "j-math-2-sankaku-shikaku", why: "直角三角形の合同条件は斜辺が必要、が未習熟" },
      { i: 2, root: "j-math-2-sankaku-shikaku", why: "逆は正しいとは限らない、反例の考えが未習熟" },
    ],
  },
  {
    unit: "j-math-2-kakuritsu",
    needs: [
      { unit: "e-math-6-narabekata", why: "樹形図で、もれなく重なりなく場合を数える" },
      { unit: "j-math-1-data", why: "相対度数を確率とみる考えを使う" },
    ],
    mistakes: [
      { i: 0, root: "j-math-2-kakuritsu", why: "同様に確からしい場合で数える、が未習熟" },
      { i: 1, root: "e-math-6-narabekata", why: "区別して樹形図でもれなく数える、が小6で弱い" },
      { i: 2, root: "j-math-1-data", why: "多数回の相対度数が確率の目安、が弱い" },
    ],
  },
  {
    unit: "j-math-2-hakohige",
    needs: [{ unit: "j-math-1-data", why: "中央値などの代表値を、四分位数に広げる" }],
    mistakes: [
      { i: 0, root: "j-math-2-hakohige", why: "奇数個のとき中央値を除いて分ける、が未習熟" },
      { i: 1, root: "j-math-2-hakohige", why: "箱の線は中央値、平均値でない、が未習熟" },
      { i: 2, root: "j-math-2-hakohige", why: "区間の長さは個数でなく散らばり、が未習熟" },
    ],
  },

  // ===== 中3 =====
  {
    unit: "j-math-3-tenkai",
    needs: [{ unit: "j-math-2-shiki", why: "多項式の計算と分配法則で、式を展開する" }],
    mistakes: [
      { i: 0, root: "j-math-3-tenkai", why: "まん中の 2ax が出る乗法公式が未習熟" },
      { i: 1, root: "j-math-3-tenkai", why: "和と差の積の公式の使い分けが未習熟" },
      { i: 2, root: "j-math-3-tenkai", why: "最後まで分解しきる因数分解の約束が未習熟" },
      { i: 3, root: "j-math-1-seifu", why: "たして−2になる組の符号選びで負の数が弱い" },
    ],
  },
  {
    unit: "j-math-3-heihokon",
    needs: [
      { unit: "j-math-1-seifu", why: "(−4)²＝16、負の数の2乗も正になる" },
      { unit: "j-math-2-shiki", why: "√ をふくむ式を、文字式のように計算する" },
    ],
    mistakes: [
      { i: 0, root: "j-math-1-seifu", why: "負の数の2乗も正、が1年で身についていない" },
      { i: 1, root: "j-math-3-heihokon", why: "√ の中身どうしはたせない、が未習熟" },
      { i: 2, root: "j-math-3-heihokon", why: "√ は正の方の平方根、の約束が未習熟" },
    ],
  },
  {
    unit: "j-math-3-niji-hoteishiki",
    needs: [
      { unit: "j-math-3-tenkai", why: "因数分解で「AB＝0」の形にして解く" },
      { unit: "j-math-3-heihokon", why: "( )²＝k は平方根で解く" },
      { unit: "j-math-1-hoteishiki", why: "移項・等式の性質で式を整える" },
    ],
    mistakes: [
      { i: 0, root: "j-math-3-niji-hoteishiki", why: "x でわると解が消える、が未習熟" },
      { i: 1, root: "j-math-3-heihokon", why: "平方根は正と負の2つある、が弱い" },
      { i: 2, root: "j-math-3-niji-hoteishiki", why: "「どちらかが0」は積が0のときだけ" },
      { i: 3, root: "j-math-3-niji-hoteishiki", why: "解の公式の分数の線のかかり方が未習熟" },
    ],
  },
  {
    unit: "j-math-3-kansu-ax2",
    needs: [
      { unit: "j-math-1-hirei", why: "y＝ax の a の求め方が y＝ax² でも使われる" },
      { unit: "j-math-2-ichiji-kansu", why: "変化の割合・変域の考えを一次関数から広げる" },
    ],
    mistakes: [
      { i: 0, root: "j-math-3-kansu-ax2", why: "x が0をまたぐと y の端は0、が未習熟" },
      { i: 1, root: "j-math-2-ichiji-kansu", why: "変化の割合が一定なのは一次関数だけ、が弱い" },
      { i: 2, root: "j-math-3-kansu-ax2", why: "y は x² に比例、n倍で n²倍、が未習熟" },
    ],
  },
  {
    unit: "j-math-3-sojii",
    needs: [
      { unit: "e-math-6-kakudai", why: "拡大図・縮図の考えを、相似として整理する" },
      { unit: "j-math-2-heiko-godo", why: "合同条件や平行線の角を、相似の証明に使う" },
      { unit: "e-math-6-hi", why: "辺の比をつくり、比例式で長さを求める" },
    ],
    mistakes: [
      { i: 0, root: "j-math-3-sojii", why: "面積比は相似比の2乗、が未習熟" },
      { i: 1, root: "j-math-3-sojii", why: "対応する辺を正しく選ぶ見方が未習熟" },
      { i: 2, root: "j-math-2-heiko-godo", why: "対応する頂点を同じ順に書く約束が弱い" },
    ],
  },
  {
    unit: "j-math-3-en",
    needs: [
      { unit: "j-math-2-sankaku-shikaku", why: "二等辺三角形の性質で円周角の定理を証明する" },
      { unit: "j-math-1-heimen", why: "中心角・弧・接線の基本を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-math-3-en", why: "円周角は中心角の半分、の向きが未習熟" },
      { i: 1, root: "j-math-3-en", why: "等しいのは同じ弧に対する円周角だけ" },
      { i: 2, root: "j-math-3-en", why: "直径に対する円周角は90°、が使えていない" },
    ],
  },
  {
    unit: "j-math-3-sanheiho",
    needs: [
      { unit: "j-math-3-heihokon", why: "辺の長さは2乗の値の平方根で求める" },
      { unit: "e-math-5-menseki", why: "4つの直角三角形の面積で定理を証明する" },
    ],
    mistakes: [
      { i: 0, root: "j-math-3-sanheiho", why: "斜辺を先に確かめる見方が未習熟" },
      { i: 1, root: "j-math-3-sanheiho", why: "2乗どうしの関係、という意味が未習熟" },
      { i: 2, root: "j-math-3-heihokon", why: "√3≒1.73 と 2 の大小を見積もる力が弱い" },
    ],
  },
  {
    unit: "j-math-3-hyohon",
    needs: [
      { unit: "j-math-1-data", why: "相対度数で、標本の割合をとらえる" },
      { unit: "e-math-6-hi", why: "標本の割合を母集団にあてはめて比例式を立てる" },
    ],
    mistakes: [
      { i: 0, root: "j-math-3-hyohon", why: "無作為に選ぶ必要性が未習熟" },
      { i: 1, root: "j-math-3-hyohon", why: "標本と母集団のことばの区別が未習熟" },
      { i: 2, root: "e-math-4-gaisu", why: "およその値は「約」をつけて表す、が弱い" },
    ],
  },

  // ===== 数学Ⅰ =====
  {
    unit: "h-math-1-shiki",
    needs: [{ unit: "j-math-3-tenkai", why: "中3の乗法公式・因数分解を、3乗やたすきがけへ" }],
    mistakes: [
      { i: 0, root: "j-math-3-tenkai", why: "まん中の 2ab が出る乗法公式が中3で未習熟" },
      { i: 1, root: "j-math-3-tenkai", why: "最後まで分解しきる約束が中3で未習熟" },
      { i: 2, root: "j-math-3-tenkai", why: "まず共通因数をくくり出す順序が中3で未習熟" },
      { i: 3, root: "h-math-1-shiki", why: "3乗の公式の符号の並びが未習熟" },
    ],
  },
  {
    unit: "h-math-1-jissu",
    needs: [
      { unit: "j-math-3-heihokon", why: "√ の計算・有理化を、実数全体に広げる" },
      { unit: "e-math-5-bunsu-shosu", why: "分数と小数の関係から、循環小数を分数に直す" },
      { unit: "h-math-1-shiki", why: "根号をふくむ式も展開・乗法公式で計算する" },
    ],
    mistakes: [
      { i: 0, root: "j-math-3-heihokon", why: "√ は正の方の平方根、が中3で未習熟" },
      { i: 1, root: "j-math-3-heihokon", why: "√ の中身どうしはたせない、が中3で未習熟" },
      { i: 2, root: "h-math-1-jissu", why: "循環小数を式で分数に直す考えが未習熟" },
      { i: 3, root: "j-math-3-tenkai", why: "和と差の積で2乗の差になる公式が弱い" },
    ],
  },
  {
    unit: "h-math-1-futoshiki",
    needs: [
      { unit: "j-math-1-hoteishiki", why: "一次方程式と同じ手順で一次不等式を解く" },
      { unit: "j-math-1-seifu", why: "負の数の大小・絶対値の意味を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-futoshiki", why: "負の数でわると向きが逆、が未習熟" },
      { i: 1, root: "h-math-1-futoshiki", why: "連立は共通部分をとる、が未習熟" },
      { i: 2, root: "j-math-1-seifu", why: "絶対値は0からの距離、が中1で未習熟" },
      { i: 3, root: "h-math-1-futoshiki", why: "符号のわからない文字は場合分け、が未習熟" },
    ],
  },
  {
    unit: "h-math-1-shugo",
    needs: [{ unit: "j-math-2-sankaku-shikaku", why: "「ならば」の逆・反例の考えを集合で整理する" }],
    mistakes: [
      { i: 0, root: "h-math-1-shugo", why: "矢印の出発点が十分条件、が未習熟" },
      { i: 1, root: "j-math-2-sankaku-shikaku", why: "逆は正しいとは限らない、が中2で未習熟" },
      { i: 2, root: "h-math-1-shugo", why: "「かつ」の否定は「または」、が未習熟" },
      { i: 3, root: "h-math-1-shugo", why: "「すべて」の否定は「ある〜でない」、が未習熟" },
    ],
  },
  {
    unit: "h-math-1-nijikansu",
    needs: [
      { unit: "j-math-3-kansu-ax2", why: "y＝ax² のグラフを平行移動して考える" },
      { unit: "j-math-3-niji-hoteishiki", why: "平方完成で ( )² の形をつくる方法を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-nijikansu", why: "かっこの中の符号と頂点の x 座標は逆、が未習熟" },
      { i: 1, root: "j-math-1-moji", why: "くくった数を外にかけ戻す分配法則が弱い" },
      { i: 2, root: "j-math-3-kansu-ax2", why: "a の符号でグラフの向きが決まる、が弱い" },
    ],
  },
  {
    unit: "h-math-1-saidai",
    needs: [{ unit: "h-math-1-nijikansu", why: "頂点と軸の位置がわかってはじめて最大・最小が決まる" }],
    mistakes: [
      { i: 0, root: "j-math-3-kansu-ax2", why: "変域の端と頂点を比べる考えが中3で未習熟" },
      { i: 1, root: "h-math-1-saidai", why: "軸が定義域の中か外かの場合分けが未習熟" },
      { i: 2, root: "h-math-1-nijikansu", why: "a の符号で谷か山かが決まる、が弱い" },
      { i: 3, root: "h-math-1-saidai", why: "条件から式を立てて最大を調べる力が未習熟" },
    ],
  },
  {
    unit: "h-math-1-nijihoteishiki",
    needs: [
      { unit: "h-math-1-nijikansu", why: "解はグラフと x 軸の交点として読む" },
      { unit: "j-math-3-niji-hoteishiki", why: "因数分解・解の公式で二次方程式を解く" },
      { unit: "h-math-1-futoshiki", why: "不等号の性質を二次不等式でも使う" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-nijihoteishiki", why: "＜0 はグラフが x 軸より下、の読み方が未習熟" },
      { i: 1, root: "h-math-1-futoshiki", why: "負の数をかけると向きが変わる、が弱い" },
      { i: 2, root: "j-math-3-niji-hoteishiki", why: "分子全体を2aでわる解の公式の扱いが弱い" },
      { i: 3, root: "h-math-1-nijihoteishiki", why: "D＝0 のとき頂点で0になる、が未習熟" },
    ],
  },
  {
    unit: "h-math-1-sankakuhi",
    needs: [
      { unit: "j-math-3-sojii", why: "相似な直角三角形では辺の比が等しい" },
      { unit: "j-math-3-sanheiho", why: "三平方の定理で辺を求め、30°・45°・60°の値を出す" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-sankakuhi", why: "sin は向かいの辺、cos ははさむ辺、が未習熟" },
      { i: 1, root: "h-math-1-sankakuhi", why: "半円上の点の座標で符号を読む、が未習熟" },
      { i: 2, root: "j-math-3-heihokon", why: "2乗から戻すと正と負の2つ、が中3で弱い" },
    ],
  },
  {
    unit: "h-math-1-teiri",
    needs: [
      { unit: "h-math-1-sankakuhi", why: "sin・cos の値と鈍角の符号を使う" },
      { unit: "j-math-3-en", why: "正弦定理は外接円と円周角の定理から導く" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-sankakuhi", why: "cos120°＝−1/2、鈍角の cos の符号が弱い" },
      { i: 1, root: "h-math-1-teiri", why: "辺と向かいの角を組にする、が未習熟" },
      { i: 2, root: "h-math-1-sankakuhi", why: "cos が負なら鈍角、が身についていない" },
      { i: 3, root: "h-math-1-sankakuhi", why: "sin が同じ値の角は2つある、が弱い" },
    ],
  },
  {
    unit: "h-math-1-keiryo",
    needs: [
      { unit: "h-math-1-teiri", why: "余弦定理で cos を出し、sin から面積を求める" },
      { unit: "j-math-1-kukan", why: "空間図形の中から平面の三角形を取り出す" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-keiryo", why: "2辺にはさまれた角を使う、が未習熟" },
      { i: 1, root: "h-math-1-sankakuhi", why: "高さは c sinA、sin の意味が弱い" },
      { i: 2, root: "e-math-5-menseki", why: "三角形の面積は底辺×高さ÷2、が弱い" },
    ],
  },
  {
    unit: "h-math-1-data",
    needs: [{ unit: "j-math-2-hakohige", why: "四分位数・箱ひげ図を、分散や相関へ広げる" }],
    mistakes: [
      { i: 0, root: "h-math-1-data", why: "偏差は2乗してから平均する、が未習熟" },
      { i: 1, root: "h-math-1-data", why: "ずらしても散らばりは変わらない、が未習熟" },
      { i: 2, root: "j-math-2-hakohige", why: "中央値を除いて分ける方法が中2で未習熟" },
      { i: 3, root: "h-math-1-data", why: "相関と因果のちがいが未習熟" },
    ],
  },

  // ===== 数学A =====
  {
    unit: "h-math-a-baai",
    needs: [
      { unit: "e-math-6-narabekata", why: "樹形図と、並べ方・組み合わせ方の区別を広げる" },
      { unit: "j-math-2-kakuritsu", why: "もれなく重なりなく数える考えを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-narabekata", why: "順番のある・ないの区別が小6で未習熟" },
      { i: 1, root: "h-math-a-baai", why: "回転して同じ並びを1つとみる、が未習熟" },
      { i: 2, root: "h-math-a-baai", why: "和の法則と積の法則の使い分けが未習熟" },
      { i: 3, root: "h-math-a-baai", why: "組に区別がないときの重なりが未習熟" },
    ],
  },
  {
    unit: "h-math-a-kakuritsu",
    needs: [
      { unit: "h-math-a-baai", why: "順列・組合せで場合の数を数える" },
      { unit: "j-math-2-kakuritsu", why: "確率＝あてはまる場合÷全部の場合、を広げる" },
    ],
    mistakes: [
      { i: 0, root: "j-math-2-kakuritsu", why: "同様に確からしい数え方が中2で未習熟" },
      { i: 1, root: "h-math-a-kakuritsu", why: "重なりをひく和事象の考えが未習熟" },
      { i: 2, root: "h-math-a-baai", why: "回の選び方 nCr を数える組合せが弱い" },
      { i: 3, root: "h-math-a-kakuritsu", why: "「少なくとも」は余事象で、が未習熟" },
    ],
  },
  {
    unit: "h-math-a-joken",
    needs: [{ unit: "h-math-a-kakuritsu", why: "確率の計算を、全体をしぼった場合に広げる" }],
    mistakes: [
      { i: 0, root: "h-math-a-joken", why: "何を条件にしぼるかを確かめる習慣がない" },
      { i: 1, root: "h-math-a-joken", why: "分母を条件にあてはまる数にする、が未習熟" },
      { i: 2, root: "h-math-a-joken", why: "もどさないと次の確率が変わる、が未習熟" },
      { i: 3, root: "h-math-a-joken", why: "結果から原因の確率を考える見方が未習熟" },
    ],
  },
  {
    unit: "h-math-a-sankakukei",
    needs: [
      { unit: "j-math-3-sojii", why: "平行線と比・相似で、辺の比を求める" },
      { unit: "j-math-2-sankaku-shikaku", why: "二等辺三角形などの性質を証明に使う" },
    ],
    mistakes: [
      { i: 0, root: "h-math-a-sankakukei", why: "角をはさむ2辺の比、が未習熟" },
      { i: 1, root: "h-math-a-sankakukei", why: "重心は頂点から 2:1、が未習熟" },
      { i: 2, root: "h-math-a-sankakukei", why: "外心と内心の区別が未習熟" },
    ],
  },
  {
    unit: "h-math-a-en",
    needs: [
      { unit: "j-math-3-en", why: "円周角の定理を、内接四角形・接弦定理へ広げる" },
      { unit: "j-math-3-sojii", why: "方べきの定理は相似な三角形から導く" },
    ],
    mistakes: [
      { i: 0, root: "j-math-3-en", why: "円周角は中心角の半分、が中3で未習熟" },
      { i: 1, root: "h-math-a-en", why: "内接四角形の対角の和は180°、が未習熟" },
      { i: 2, root: "h-math-a-en", why: "接線では PT×PT になる、が未習熟" },
      { i: 3, root: "h-math-a-en", why: "どれも P からの長さ、の読み方が未習熟" },
    ],
  },
  {
    unit: "h-math-a-kukan",
    needs: [
      { unit: "j-math-1-heimen", why: "垂直二等分線などの作図の基本を使う" },
      { unit: "j-math-1-kukan", why: "2直線の位置関係・多面体の見方を広げる" },
      { unit: "j-math-3-sanheiho", why: "立体の計量で三平方の定理を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-math-1-kukan", why: "平行・交わる・ねじれの3つの区別が中1で弱い" },
      { i: 1, root: "h-math-a-kukan", why: "交わる2直線に垂直、の条件が未習熟" },
      { i: 2, root: "h-math-a-kukan", why: "1本の辺は2つの面が共有、が未習熟" },
    ],
  },
  {
    unit: "h-math-a-yakusu",
    needs: [{ unit: "e-math-5-baisu-yakusu", why: "約数・倍数・最大公約数の意味を素因数分解で見る" }],
    mistakes: [
      { i: 0, root: "h-math-a-yakusu", why: "指数0も選べるので「指数＋1」通り、が未習熟" },
      { i: 1, root: "h-math-a-yakusu", why: "最大公約数は指数の小さい方、が未習熟" },
      { i: 2, root: "h-math-a-yakusu", why: "4の倍数は下2けたで判定、が未習熟" },
      { i: 3, root: "e-math-5-baisu-yakusu", why: "公倍数は最小公倍数の倍数、が小5で弱い" },
    ],
  },
  {
    unit: "h-math-a-gojo",
    needs: [
      { unit: "h-math-a-yakusu", why: "最大公約数の意味をもとに互除法を使う" },
      { unit: "j-math-2-renritsu", why: "2つの文字の一次式の整数解を考える" },
    ],
    mistakes: [
      { i: 0, root: "h-math-a-gojo", why: "余り0のときの割る数が答え、が未習熟" },
      { i: 1, root: "h-math-a-gojo", why: "整数 k で一般解を表す考えが未習熟" },
      { i: 2, root: "j-math-1-seifu", why: "マイナスを落とす、負の数の扱いが弱い" },
    ],
  },
  {
    unit: "h-math-a-nshin",
    needs: [
      { unit: "e-math-4-ookii", why: "10集まると上の位、10進法の位のしくみを広げる" },
      { unit: "e-math-3-amari", why: "n でわったあまりを並べて n 進法に直す" },
    ],
    mistakes: [
      { i: 0, root: "h-math-a-nshin", why: "右はしの位は n⁰＝1 から始まる、が未習熟" },
      { i: 1, root: "h-math-a-nshin", why: "最初の余りが一の位、が未習熟" },
      { i: 2, root: "h-math-a-nshin", why: "n たまったら上の位へ、が未習熟" },
    ],
  },

  // ===== 数学Ⅱ =====
  {
    unit: "h-math-2-shomei",
    needs: [
      { unit: "h-math-1-shiki", why: "展開・因数分解で式の形をそろえる" },
      { unit: "h-math-a-baai", why: "二項定理の係数は組合せ nCr" },
    ],
    mistakes: [
      { i: 0, root: "h-math-2-shomei", why: "係数以外の 2³ や (−1)² もかける、が未習熟" },
      { i: 1, root: "h-math-2-shomei", why: "相加・相乗は正の数のときだけ、が未習熟" },
      { i: 2, root: "h-math-2-shomei", why: "等号成立を確かめて最小値とする、が未習熟" },
      { i: 3, root: "e-math-5-hayasa", why: "平均の速さ＝全体の道のり÷全体の時間、が弱い" },
    ],
  },
  {
    unit: "h-math-2-fukuso",
    needs: [
      { unit: "h-math-1-nijihoteishiki", why: "解の公式・判別式を、複素数の範囲に広げる" },
      { unit: "h-math-1-jissu", why: "実数の性質をもとに数の範囲を広げる" },
    ],
    mistakes: [
      { i: 0, root: "h-math-2-fukuso", why: "負の数の平方根は先に i で表す、が未習熟" },
      { i: 1, root: "h-math-2-fukuso", why: "D＜0 は虚数解をもつ、が未習熟" },
      { i: 2, root: "h-math-2-fukuso", why: "α＋β＝−b/a のマイナスが未習熟" },
    ],
  },
  {
    unit: "h-math-2-koji",
    needs: [
      { unit: "h-math-2-shomei", why: "整式の割り算 A＝BQ＋R をもとにする" },
      { unit: "h-math-2-fukuso", why: "残った2次式から虚数解を求める" },
    ],
    mistakes: [
      { i: 0, root: "h-math-2-koji", why: "x−a の形で a を読む、が未習熟" },
      { i: 1, root: "h-math-2-koji", why: "割る式を0にする x を代入する、が未習熟" },
      { i: 2, root: "h-math-2-fukuso", why: "2次式から虚数解を出す力が弱い" },
      { i: 3, root: "h-math-2-shomei", why: "整式の割り算で0の項をあける、が未習熟" },
    ],
  },
  {
    unit: "h-math-2-chokusen",
    needs: [
      { unit: "j-math-3-sanheiho", why: "2点間の距離は三平方の定理そのもの" },
      { unit: "j-math-2-ichiji-kansu", why: "直線の式・傾き・切片の考えを使う" },
    ],
    mistakes: [
      { i: 0, root: "h-math-2-chokusen", why: "近い点ほど重みが大きい、が未習熟" },
      { i: 1, root: "h-math-2-chokusen", why: "垂直は傾きの積が−1、が未習熟" },
      { i: 2, root: "h-math-2-chokusen", why: "ax＋by＋c＝0 の形に直してから使う" },
    ],
  },
  {
    unit: "h-math-2-en",
    needs: [
      { unit: "h-math-2-chokusen", why: "円の式は、中心からの距離の式から作る" },
      { unit: "h-math-1-nijikansu", why: "平方完成で中心と半径を読みとる" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-nijikansu", why: "かっこの中と座標の符号は逆、が弱い" },
      { i: 1, root: "j-math-3-heihokon", why: "r² から r を出す平方根の扱いが弱い" },
      { i: 2, root: "h-math-1-nijikansu", why: "平方完成でひいてつり合いをとる、が弱い" },
      { i: 3, root: "h-math-2-en", why: "2円が交わるかを先に確かめる、が未習熟" },
    ],
  },
  {
    unit: "h-math-2-kiseki",
    needs: [
      { unit: "h-math-2-en", why: "軌跡として円・直線の方程式を読みとる" },
      { unit: "h-math-1-futoshiki", why: "不等式の向きを変える性質を領域で使う" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-futoshiki", why: "移項で−をかけると向きが変わる、が弱い" },
      { i: 1, root: "h-math-2-kiseki", why: "条件を満たさない点を除く確認が未習熟" },
      { i: 2, root: "h-math-2-kiseki", why: "≦ は境界をふくむ、が未習熟" },
    ],
  },
  {
    unit: "h-math-2-sankaku",
    needs: [
      { unit: "h-math-1-sankakuhi", why: "半円上の点の座標を、単位円全体へ広げる" },
      { unit: "j-math-1-heimen", why: "弧度法は、おうぎ形の弧の長さで角を測る" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-sankakuhi", why: "鈍角では cos が負、が数学Ⅰで弱い" },
      { i: 1, root: "h-math-2-sankaku", why: "−θ は x 軸で折り返した点、が未習熟" },
      { i: 2, root: "h-math-2-sankaku", why: "θ の係数で周期が縮む、が未習熟" },
    ],
  },
  {
    unit: "h-math-2-kahou",
    needs: [
      { unit: "h-math-2-sankaku", why: "単位円上の点 (cosθ, sinθ) を使う" },
      { unit: "h-math-2-chokusen", why: "2点間の距離の式から加法定理を導く" },
    ],
    mistakes: [
      { i: 0, root: "h-math-2-kahou", why: "三角関数は分配できない、が未習熟" },
      { i: 1, root: "h-math-2-kahou", why: "cos の加法定理の符号が未習熟" },
      { i: 2, root: "h-math-2-kahou", why: "合成で a を x 座標、b を y 座標にとる" },
    ],
  },
  {
    unit: "h-math-2-shisu",
    needs: [
      { unit: "j-math-1-seifu", why: "累乗（同じ数を何回かけるか）の意味を使う" },
      { unit: "h-math-1-jissu", why: "分数の指数は累乗根（√ の仲間）で表す" },
    ],
    mistakes: [
      { i: 0, root: "h-math-2-shisu", why: "負の指数は逆数、の意味が未習熟" },
      { i: 1, root: "h-math-2-shisu", why: "a⁰＝1 になるわけが未習熟" },
      { i: 2, root: "h-math-2-shisu", why: "かけ算は指数をたす、の指数法則が未習熟" },
      { i: 3, root: "h-math-2-shisu", why: "底が1より小さいと減少、が未習熟" },
    ],
  },
  {
    unit: "h-math-2-taisu",
    needs: [{ unit: "h-math-2-shisu", why: "log は「何乗するか」。指数の裏返し" }],
    mistakes: [
      { i: 0, root: "h-math-2-taisu", why: "和に分けられるのは真数の積、が未習熟" },
      { i: 1, root: "h-math-2-taisu", why: "真数は正、の条件を先に出す習慣がない" },
      { i: 2, root: "h-math-2-taisu", why: "log は割り算でなく「何乗か」、が未習熟" },
      { i: 3, root: "h-math-2-shisu", why: "a⁰＝1、0乗の意味が弱い" },
    ],
  },
  {
    unit: "h-math-2-bibun",
    needs: [
      { unit: "h-math-2-chokusen", why: "接線は1点と傾きで決まる直線" },
      { unit: "j-math-2-ichiji-kansu", why: "変化の割合（平均変化率）の考えを広げる" },
      { unit: "h-math-1-shiki", why: "積の形は展開してから項ごとに微分する" },
    ],
    mistakes: [
      { i: 0, root: "h-math-2-bibun", why: "積の微分は各微分の積でない、が未習熟" },
      { i: 1, root: "h-math-2-bibun", why: "符号が変わるときだけ極値、が未習熟" },
      { i: 2, root: "h-math-2-chokusen", why: "1点と傾きで直線の式を作る力が弱い" },
    ],
  },
  {
    unit: "h-math-2-sekibun",
    needs: [{ unit: "h-math-2-bibun", why: "積分は微分の逆。導関数の公式を逆に使う" }],
    mistakes: [
      { i: 0, root: "h-math-2-sekibun", why: "積分定数 C が必要なわけが未習熟" },
      { i: 1, root: "h-math-2-sekibun", why: "微分と積分の向きの区別が未習熟" },
      { i: 2, root: "h-math-2-sekibun", why: "x 軸より下の定積分は負、が未習熟" },
      { i: 3, root: "h-math-2-sekibun", why: "上端の値から下端の値をひく、が未習熟" },
    ],
  },

  // ===== 数学B =====
  {
    unit: "h-math-b-tosa",
    needs: [
      { unit: "j-math-2-ichiji-kansu", why: "一定ずつ増える一次関数と、等差数列は同じ形" },
      { unit: "h-math-2-shisu", why: "等比数列の項は rⁿ⁻¹ と指数で表す" },
    ],
    mistakes: [
      { i: 0, root: "h-math-b-tosa", why: "公差をたすのは n−1 回、が未習熟" },
      { i: 1, root: "h-math-b-tosa", why: "差の回数＋1が項数、が未習熟" },
      { i: 2, root: "h-math-b-tosa", why: "r＝1 では公式が使えない、が未習熟" },
      { i: 3, root: "h-math-b-tosa", why: "差か比か、一定なものを見分ける力が未習熟" },
    ],
  },
  {
    unit: "h-math-b-sigma",
    needs: [{ unit: "h-math-b-tosa", why: "等差・等比数列の和をもとに Σ の公式を使う" }],
    mistakes: [
      { i: 0, root: "h-math-b-sigma", why: "定数も n 回たす、Σ の読み方が未習熟" },
      { i: 1, root: "h-math-b-sigma", why: "2乗の和には専用の公式、が未習熟" },
      { i: 2, root: "h-math-b-sigma", why: "スタートの項も数える項数が未習熟" },
      { i: 3, root: "h-math-b-sigma", why: "たす差は n−1 個、が未習熟" },
    ],
  },
  {
    unit: "h-math-b-zenka",
    needs: [
      { unit: "h-math-b-tosa", why: "等差・等比数列にもちこんで一般項を出す" },
      { unit: "h-math-b-sigma", why: "階差型は Σ で差をまとめる" },
    ],
    mistakes: [
      { i: 0, root: "h-math-b-zenka", why: "aₙ−α が等比数列になる、が未習熟" },
      { i: 1, root: "h-math-b-zenka", why: "新しい数列の初項は a₁−α、が未習熟" },
      { i: 2, root: "h-math-b-sigma", why: "階差でたすのは n−1 個、が弱い" },
    ],
  },
  {
    unit: "h-math-b-kino",
    needs: [
      { unit: "h-math-b-sigma", why: "Σ の等式などが、帰納法で示す代表的な題材" },
      { unit: "h-math-1-shugo", why: "「すべての n で成り立つ」命題の意味を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-math-b-kino", why: "仮定を使って次へつなぐ、が未習熟" },
      { i: 1, root: "h-math-b-kino", why: "最初の値を確かめる必要性が未習熟" },
      { i: 2, root: "h-math-b-kino", why: "出発点は命題の範囲で決める、が未習熟" },
      { i: 3, root: "h-math-b-kino", why: "例を並べても証明にならない、が未習熟" },
    ],
  },
  {
    unit: "h-math-b-bunpu",
    needs: [
      { unit: "h-math-a-kakuritsu", why: "期待値・確率の計算をもとに分布を表にする" },
      { unit: "h-math-1-data", why: "分散・標準偏差の考えを確率変数に広げる" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-data", why: "ずらしても散らばりは不変、2乗で効く、が弱い" },
      { i: 1, root: "h-math-b-bunpu", why: "2乗してから期待値をとる、が未習熟" },
      { i: 2, root: "h-math-1-data", why: "標準偏差は |a| 倍、負にならない、が弱い" },
      { i: 3, root: "h-math-a-kakuritsu", why: "期待値はくり返しの平均、の意味が弱い" },
    ],
  },
  {
    unit: "h-math-b-nikou",
    needs: [
      { unit: "h-math-b-bunpu", why: "確率分布・期待値・分散の考えを使う" },
      { unit: "h-math-a-kakuritsu", why: "反復試行の確率 nCr pʳ(1−p)ⁿ⁻ʳ を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-math-a-kakuritsu", why: "期待値と実際に出る値の区別が弱い" },
      { i: 1, root: "h-math-b-nikou", why: "二項分布の分散 np(1−p) が未習熟" },
      { i: 2, root: "h-math-b-nikou", why: "わるのは標準偏差 σ、が未習熟" },
      { i: 3, root: "h-math-b-nikou", why: "正規分布表の読み方が未習熟" },
    ],
  },
  {
    unit: "h-math-b-suitei",
    needs: [
      { unit: "h-math-b-nikou", why: "正規分布と標準化を、標本平均に使う" },
      { unit: "j-math-3-hyohon", why: "母集団・標本・無作為抽出の考えを広げる" },
    ],
    mistakes: [
      { i: 0, root: "h-math-b-suitei", why: "分散 σ²/n の平方根をとる、が未習熟" },
      { i: 1, root: "h-math-b-suitei", why: "動くのは区間で母平均ではない、が未習熟" },
      { i: 2, root: "h-math-b-suitei", why: "幅は 1/√n に比例、が未習熟" },
      { i: 3, root: "h-math-b-suitei", why: "母集団の大きさは式に入らない、が未習熟" },
    ],
  },
  {
    unit: "h-math-b-kentei",
    needs: [
      { unit: "h-math-b-nikou", why: "二項分布を正規分布で近似して確率を出す" },
      { unit: "h-math-1-data", why: "数学Ⅰの仮説検定の考え方をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-data", why: "棄却されないとき「正しい」とは言えない、が弱い" },
      { i: 1, root: "h-math-b-kentei", why: "主張の反対を帰無仮説にする、が未習熟" },
      { i: 2, root: "h-math-b-kentei", why: "両側と片側の境目のちがいが未習熟" },
      { i: 3, root: "h-math-b-kentei", why: "それ以上かたよる場合もふくめる、が未習熟" },
    ],
  },

  // ===== 数学Ⅲ =====
  {
    unit: "h-math-3-kansu",
    needs: [
      { unit: "j-math-1-hirei", why: "反比例 y＝a/x のグラフが分数関数のもと" },
      { unit: "h-math-1-nijikansu", why: "グラフの平行移動の考えを使う" },
      { unit: "h-math-1-futoshiki", why: "符号で場合分けして不等式を解く" },
    ],
    mistakes: [
      { i: 0, root: "h-math-3-kansu", why: "割り算で k/(x−p)＋q の形に直す、が未習熟" },
      { i: 1, root: "h-math-3-kansu", why: "x の係数をくくってから移動を読む、が未習熟" },
      { i: 2, root: "h-math-3-kansu", why: "2乗したら代入して確かめる、が未習熟" },
      { i: 3, root: "h-math-1-futoshiki", why: "符号のわからない式をかけるときの場合分けが弱い" },
    ],
  },
  {
    unit: "h-math-3-gyaku",
    needs: [
      { unit: "h-math-3-kansu", why: "分数・無理関数の定義域と値域を読む" },
      { unit: "h-math-2-taisu", why: "指数と対数は逆関数の代表的な組" },
    ],
    mistakes: [
      { i: 0, root: "h-math-3-gyaku", why: "f⁻¹ は逆数でなく逆の対応、が未習熟" },
      { i: 1, root: "h-math-3-gyaku", why: "合成は内側（右側）から計算、が未習熟" },
      { i: 2, root: "h-math-3-gyaku", why: "もとの値域が逆関数の定義域、が未習熟" },
    ],
  },
  {
    unit: "h-math-3-suretsu",
    needs: [
      { unit: "h-math-b-tosa", why: "等比数列の一般項・和の極限を考える" },
      { unit: "h-math-1-jissu", why: "√ をふくむ式を有理化して形を変える" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-jissu", why: "和と差の積で根号を消す有理化が弱い" },
      { i: 1, root: "h-math-3-suretsu", why: "|r|＜1 を確かめてから公式を使う、が未習熟" },
      { i: 2, root: "h-math-3-suretsu", why: "振動する発散がある、が未習熟" },
      { i: 3, root: "h-math-3-suretsu", why: "項→0 は収束の必要条件にすぎない、が未習熟" },
    ],
  },
  {
    unit: "h-math-3-kyokugen",
    needs: [
      { unit: "h-math-3-suretsu", why: "数列の極限の考えを関数の極限に広げる" },
      { unit: "h-math-3-kansu", why: "分数関数・漸近線のふるまいを使う" },
      { unit: "h-math-2-sankaku", why: "sin x/x の極限は弧度法の三角関数で考える" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-shiki", why: "因数分解して約分する力が弱い" },
      { i: 1, root: "h-math-3-kyokugen", why: "sin の中身と分母をそろえる、が未習熟" },
      { i: 2, root: "h-math-3-kyokugen", why: "左右の極限が一致して極限がある、が未習熟" },
      { i: 3, root: "h-math-3-suretsu", why: "項→0 でも級数は発散しうる、が弱い" },
    ],
  },
  {
    unit: "h-math-3-bibun",
    needs: [
      { unit: "h-math-2-bibun", why: "導関数の意味と多項式の微分を広げる" },
      { unit: "h-math-3-kyokugen", why: "sin x/x→1 と e の極限が導関数のもと" },
      { unit: "h-math-3-gyaku", why: "合成関数のしくみを微分で使う" },
    ],
    mistakes: [
      { i: 0, root: "h-math-3-bibun", why: "商の微分の順序が未習熟" },
      { i: 1, root: "h-math-3-bibun", why: "中身の微分をかける合成関数の微分が未習熟" },
      { i: 2, root: "h-math-3-bibun", why: "三角関数の導関数の符号が未習熟" },
      { i: 3, root: "h-math-3-bibun", why: "eˣ と xⁿ の公式の区別が未習熟" },
    ],
  },
  {
    unit: "h-math-3-bibun-oyo",
    needs: [{ unit: "h-math-3-bibun", why: "いろいろな関数の導関数を求められることが前提" }],
    mistakes: [
      { i: 0, root: "h-math-2-bibun", why: "符号が変わるときだけ、の考えが数学Ⅱで弱い" },
      { i: 1, root: "h-math-2-chokusen", why: "垂直は傾きの積が−1、が弱い" },
      { i: 2, root: "h-math-3-bibun", why: "合成関数で中身の微分をかける、が弱い" },
    ],
  },
  {
    unit: "h-math-3-sekibun",
    needs: [
      { unit: "h-math-3-bibun", why: "微分の公式を逆に読んで不定積分を求める" },
      { unit: "h-math-2-sekibun", why: "不定積分・定積分の基本を広げる" },
    ],
    mistakes: [
      { i: 0, root: "h-math-3-bibun", why: "(cos x)′＝−sin x の符号が弱い" },
      { i: 1, root: "h-math-3-sekibun", why: "真数を正にする絶対値が未習熟" },
      { i: 2, root: "h-math-3-sekibun", why: "置換したら区間も直す、が未習熟" },
      { i: 3, root: "h-math-3-sekibun", why: "部分積分で微分する側の選び方が未習熟" },
    ],
  },
  {
    unit: "h-math-3-sekibun-oyo",
    needs: [{ unit: "h-math-3-sekibun", why: "置換・部分積分で積分を計算できることが前提" }],
    mistakes: [
      { i: 0, root: "h-math-3-sekibun-oyo", why: "断面積 πy² を積分する、が未習熟" },
      { i: 1, root: "h-math-2-sekibun", why: "x 軸より下の積分は負、が数学Ⅱで弱い" },
      { i: 2, root: "h-math-3-sekibun-oyo", why: "道のりは |v| を積分する、が未習熟" },
    ],
  },

  // ===== 数学C =====
  {
    unit: "h-math-c-heimen",
    needs: [
      { unit: "h-math-1-sankakuhi", why: "内積は大きさ×大きさ×cosθ" },
      { unit: "h-math-2-chokusen", why: "座標・平行・垂直の考えを成分で使う" },
    ],
    mistakes: [
      { i: 0, root: "h-math-c-heimen", why: "内積は1つの数（実数）、が未習熟" },
      { i: 1, root: "h-math-1-shiki", why: "(a＋b)² の展開の形が弱い" },
      { i: 2, root: "h-math-c-heimen", why: "始点をそろえてなす角を測る、が未習熟" },
    ],
  },
  {
    unit: "h-math-c-zukei",
    needs: [
      { unit: "h-math-c-heimen", why: "ベクトルの和・実数倍を使う" },
      { unit: "h-math-2-chokusen", why: "内分点・外分点の考えをベクトルに広げる" },
    ],
    mistakes: [
      { i: 0, root: "h-math-2-chokusen", why: "内分点で比をかける向きが数学Ⅱで弱い" },
      { i: 1, root: "h-math-c-zukei", why: "2本の直線には別の文字を使う、が未習熟" },
      { i: 2, root: "h-math-c-zukei", why: "1次独立のときだけ係数比較できる、が未習熟" },
      { i: 3, root: "h-math-c-zukei", why: "終点−始点で ↑AB を表す、が未習熟" },
    ],
  },
  {
    unit: "h-math-c-kukan",
    needs: [
      { unit: "h-math-c-zukei", why: "位置ベクトル・係数比較を空間に広げる" },
      { unit: "h-math-a-kukan", why: "空間の直線・平面の位置関係を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-math-c-kukan", why: "空間では z 成分もふくめる、が未習熟" },
      { i: 1, root: "h-math-c-kukan", why: "空間では1次独立なベクトルが3つ必要" },
      { i: 2, root: "h-math-c-kukan", why: "係数の和が1で平面上、が未習熟" },
      { i: 3, root: "h-math-2-en", why: "右辺は r²、の円の方程式の読み方が弱い" },
    ],
  },
  {
    unit: "h-math-c-fukuso",
    needs: [
      { unit: "h-math-2-fukuso", why: "複素数の計算と i²＝−1 を使う" },
      { unit: "h-math-2-kahou", why: "積の偏角が和になるのは加法定理から" },
    ],
    mistakes: [
      { i: 0, root: "h-math-2-kahou", why: "加法定理から偏角はたし算、と結びついていない" },
      { i: 1, root: "h-math-2-sankaku", why: "点の象限で角を決める、が弱い" },
      { i: 2, root: "h-math-c-fukuso", why: "中心を原点に移してから回す、が未習熟" },
    ],
  },
  {
    unit: "h-math-c-nijikyokusen",
    needs: [
      { unit: "h-math-2-kiseki", why: "距離の条件を x, y の式にする軌跡の考え" },
      { unit: "h-math-2-en", why: "円の方程式を、楕円・双曲線へ広げる" },
    ],
    mistakes: [
      { i: 0, root: "h-math-c-nijikyokusen", why: "y²＝4px の p で焦点を読む、が未習熟" },
      { i: 1, root: "h-math-c-nijikyokusen", why: "楕円と双曲線の c² の符号の区別が未習熟" },
      { i: 2, root: "h-math-c-nijikyokusen", why: "右辺を1にして分母を読む、が未習熟" },
    ],
  },
  {
    unit: "h-math-c-baikai",
    needs: [
      { unit: "h-math-c-nijikyokusen", why: "t を消すと出てくる曲線の式を読む" },
      { unit: "h-math-2-sankaku", why: "cosθ・sinθ で円や点の位置を表す" },
    ],
    mistakes: [
      { i: 0, root: "h-math-2-en", why: "右辺は r²、円の方程式の読み方が弱い" },
      { i: 1, root: "h-math-2-sankaku", why: "x＝r cosθ, y＝r sinθ の対応が弱い" },
      { i: 2, root: "h-math-2-sankaku", why: "tan だけでなく象限で角を決める、が弱い" },
    ],
  },

  // ===== 情報Ⅰ =====
  {
    unit: "h-info-1-media",
    needs: [],
    mistakes: [
      { i: 0, root: "h-info-1-media", why: "データと情報のちがいが未習熟" },
      { i: 1, root: "h-info-1-media", why: "情報の残存性、が未習熟" },
      { i: 2, root: "h-info-1-media", why: "表現メディアと伝達メディアの区別が未習熟" },
      { i: 3, root: "h-info-1-media", why: "発信元と別の情報源で確かめる習慣がない" },
    ],
  },
  {
    unit: "h-info-1-chizai",
    needs: [{ unit: "h-info-1-media", why: "情報は複製しやすい、という性質が権利の背景" }],
    mistakes: [
      { i: 0, root: "h-info-1-chizai", why: "公開と権利放棄は別、が未習熟" },
      { i: 1, root: "h-info-1-chizai", why: "著作権は無方式主義、が未習熟" },
      { i: 2, root: "h-info-1-chizai", why: "引用の条件全体が未習熟" },
      { i: 3, root: "h-info-1-chizai", why: "特許・商標・意匠の区別が未習熟" },
    ],
  },
  {
    unit: "h-info-1-design",
    needs: [{ unit: "h-info-1-media", why: "受け手に伝えるメディアの役割をもとに考える" }],
    mistakes: [
      { i: 0, root: "h-info-1-design", why: "情報デザインの目的が未習熟" },
      { i: 1, root: "h-info-1-design", why: "抽象化して伝える考えが未習熟" },
      { i: 2, root: "h-info-1-design", why: "UDとBFの出発点のちがいが未習熟" },
      { i: 3, root: "h-info-1-design", why: "色以外でも区別する配慮が未習熟" },
    ],
  },
  {
    unit: "h-info-1-digital",
    needs: [
      { unit: "h-math-a-nshin", why: "2進法・16進法は n 進法のしくみそのもの" },
      { unit: "j-math-1-seifu", why: "2ⁿ 通りを数える累乗の計算を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-math-a-nshin", why: "最初の余りが一の位、の n 進法の変換が弱い" },
      { i: 1, root: "h-info-1-digital", why: "1ビットふえると2倍、のかけ算の増え方が未習熟" },
      { i: 2, root: "h-info-1-digital", why: "1バイト＝8ビット、が未習熟" },
      { i: 3, root: "h-math-a-nshin", why: "位が上がると重みが n 倍、が弱い" },
    ],
  },
  {
    unit: "h-info-1-hyogen",
    needs: [{ unit: "h-info-1-digital", why: "ビット・バイトと 2ⁿ 通りの考えを使う" }],
    mistakes: [
      { i: 0, root: "h-info-1-digital", why: "ビットとバイトの換算が弱い" },
      { i: 1, root: "h-info-1-digital", why: "n ビットで 2ⁿ 通り、が弱い" },
      { i: 2, root: "h-info-1-hyogen", why: "チャンネル数をかける、が未習熟" },
      { i: 3, root: "h-info-1-hyogen", why: "ラスタとベクタのちがいが未習熟" },
    ],
  },
  {
    unit: "h-info-1-assyuku",
    needs: [
      { unit: "h-info-1-hyogen", why: "文字・画像をビットで表すしくみを使う" },
      { unit: "e-math-5-wariai", why: "圧縮率は、もとのデータ量でわる割合" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-wariai", why: "比べる量÷もとにする量、の割合が弱い" },
      { i: 1, root: "h-info-1-assyuku", why: "方式に合わないと増える、が未習熟" },
      { i: 2, root: "h-info-1-assyuku", why: "可逆と非可逆の形式の区別が未習熟" },
      { i: 3, root: "h-info-1-assyuku", why: "よく出る文字を短くする理由が未習熟" },
    ],
  },
  {
    unit: "h-info-1-computer",
    needs: [{ unit: "h-info-1-digital", why: "0と1で情報を表すしくみが計算のもと" }],
    mistakes: [
      { i: 0, root: "h-info-1-computer", why: "主記憶と補助記憶の役割の区別が未習熟" },
      { i: 1, root: "h-info-1-computer", why: "CPU＝演算装置＋制御装置、が未習熟" },
      { i: 2, root: "h-math-1-shugo", why: "「または」は少なくとも一方、の論理が弱い" },
    ],
  },
  {
    unit: "h-info-1-program",
    needs: [
      { unit: "h-info-1-computer", why: "命令を順に実行するCPUのしくみが前提" },
      { unit: "j-math-1-moji", why: "変数を文字式の文字のように使う" },
    ],
    mistakes: [
      { i: 0, root: "h-info-1-program", why: "代入で前の値が消える、が未習熟" },
      { i: 1, root: "h-info-1-program", why: "添字は0から、が未習熟" },
      { i: 2, root: "e-math-3-amari", why: "整数の商とあまり、のわり算の見方が弱い" },
      { i: 3, root: "h-info-1-program", why: "条件を調べる時点の理解が未習熟" },
    ],
  },
  {
    unit: "h-info-1-algorithm",
    needs: [{ unit: "h-info-1-program", why: "変数・分岐・くり返しで手順を書く" }],
    mistakes: [
      { i: 0, root: "h-info-1-algorithm", why: "二分探索は整列が前提、が未習熟" },
      { i: 1, root: "h-info-1-algorithm", why: "半分ずつ絞る回数の増え方が未習熟" },
      { i: 2, root: "h-info-1-algorithm", why: "あいまいさのない手順、の意味が未習熟" },
      { i: 3, root: "h-info-1-algorithm", why: "計算量の増え方の考えが未習熟" },
    ],
  },
  {
    unit: "h-info-1-model",
    needs: [
      { unit: "h-info-1-program", why: "前の値から次の値を計算する手順を書く" },
      { unit: "j-math-2-kakuritsu", why: "多数回くり返すと割合が確率に近づく" },
    ],
    mistakes: [
      { i: 0, root: "h-info-1-model", why: "目的に合わせて単純化する考えが未習熟" },
      { i: 1, root: "e-math-5-wariai", why: "前年の残高をもとにする量にする割合が弱い" },
      { i: 2, root: "j-math-2-kakuritsu", why: "多数回で確率に近づく、の考えが弱い" },
    ],
  },
  {
    unit: "h-info-1-data",
    needs: [
      { unit: "h-math-1-data", why: "分散・標準偏差・相関係数の考えを使う" },
      { unit: "e-math-6-data", why: "平均値・中央値・最頻値の使い分けを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-data", why: "平均値は外れ値に引っぱられる、が弱い" },
      { i: 1, root: "h-math-1-data", why: "偏差は2乗してから平均、が弱い" },
      { i: 2, root: "h-math-1-data", why: "相関と因果のちがいが弱い" },
      { i: 3, root: "h-info-1-data", why: "量的データと質的データの区別が未習熟" },
    ],
  },
  {
    unit: "h-info-1-moral",
    needs: [
      { unit: "h-info-1-media", why: "情報の複製性・伝播性が、守るべき理由" },
      { unit: "h-math-a-baai", why: "パスワードの候補の数は積の法則で数える" },
    ],
    mistakes: [
      { i: 0, root: "h-info-1-moral", why: "知識・所持・生体の要素の区別が未習熟" },
      { i: 1, root: "h-info-1-moral", why: "機密性・完全性・可用性の区別が未習熟" },
      { i: 2, root: "h-info-1-moral", why: "公開鍵と秘密鍵の役割が未習熟" },
      { i: 3, root: "h-math-a-baai", why: "候補の数＝種類の文字数乗、の数え方が弱い" },
      { i: 4, root: "h-info-1-media", why: "情報は複製・伝播する性質、が弱い" },
    ],
  },
  {
    unit: "h-info-1-network",
    needs: [
      { unit: "h-info-1-computer", why: "コンピュータどうしをつなぐしくみを学ぶ" },
      { unit: "h-info-1-digital", why: "IPアドレスのビット数・通り数を計算する" },
    ],
    mistakes: [
      { i: 0, root: "h-info-1-digital", why: "256通りに8ビット、のビット数の考えが弱い" },
      { i: 1, root: "h-info-1-network", why: "DNSとWebサーバーの役割の区別が未習熟" },
      { i: 2, root: "h-info-1-network", why: "パケットは順不同で届く、が未習熟" },
      { i: 3, root: "h-info-1-moral", why: "公開鍵と秘密鍵の役割が弱い" },
    ],
  },
  {
    unit: "h-info-1-system",
    needs: [
      { unit: "h-info-1-network", why: "サーバとネットワークの上に情報システムが立つ" },
      { unit: "h-info-1-moral", why: "情報セキュリティの考えで安全を守る" },
    ],
    mistakes: [
      { i: 0, root: "h-info-1-system", why: "主キーは重複しない項目、が未習熟" },
      { i: 1, root: "h-info-1-system", why: "選択と射影の区別が未習熟" },
      { i: 2, root: "h-info-1-system", why: "レコードとフィールドの区別が未習熟" },
      { i: 3, root: "h-info-1-moral", why: "可用性・認証の対策の考えが弱い" },
    ],
  },
];
