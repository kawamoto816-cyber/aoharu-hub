import type { PrereqUnit } from "../types";

// 理科（小3〜高校）のさかのぼりデータ。
export const PREREQ_SCI: PrereqUnit[] = [
  // ───────── 小3 ─────────
  {
    unit: "e-science-3-shizen",
    needs: [],
    mistakes: [
      { i: 0, root: "e-science-3-shizen", why: "虫めがねは日光を集めるので、太陽を見ると目をいためる" },
      { i: 1, root: "e-science-3-shizen", why: "虫めがねは目に近づけ、見る物を動かすのが正しい使い方" },
      { i: 2, root: "e-science-3-shizen", why: "日付・天気・場所がないと、あとで比べられない" },
    ],
  },
  {
    unit: "e-science-3-shokubutsu",
    needs: [
      { unit: "e-science-3-shizen", why: "色・形・大きさを見て記録する観察のしかたを使う" },
      { unit: "e-math-2-nagasa", why: "草たけを cm・mm で測って記録する" },
    ],
    mistakes: [
      { i: 0, root: "e-science-3-shokubutsu", why: "子葉とあとから出る葉を、よく見比べていない" },
      { i: 1, root: "e-science-3-shokubutsu", why: "種→芽→花→実→種と、育ちが一回りすることの理解" },
      { i: 2, root: "e-science-3-shokubutsu", why: "根・くき・葉それぞれのはたらきの理解" },
    ],
  },
  {
    unit: "e-science-3-konchu",
    needs: [{ unit: "e-science-3-shizen", why: "生き物の体のつくりを観察して記録する方法を使う" }],
    mistakes: [
      { i: 0, root: "e-science-3-konchu", why: "頭・むね・はらの区別と、あしの出ている所の観察" },
      { i: 1, root: "e-science-3-konchu", why: "体が3つ・あし6本という、こん虫の見分け方" },
      { i: 2, root: "e-science-3-konchu", why: "さなぎになる育ち方とならない育ち方の2通り" },
    ],
  },
  {
    unit: "e-science-3-kaze-gomu",
    needs: [{ unit: "e-math-2-m", why: "車が進んだ距離を m と cm で測る" }],
    mistakes: [
      { i: 0, root: "e-science-3-kaze-gomu", why: "比べるときは変える条件を1つにする、という考え方" },
      { i: 1, root: "e-science-3-kaze-gomu", why: "結果がばらつくので、何回か測ってたしかめる" },
      { i: 2, root: "e-science-3-kaze-gomu", why: "ゴムを安全に使う決まりの理解" },
    ],
  },
  {
    unit: "e-science-3-hikari",
    needs: [],
    mistakes: [
      { i: 0, root: "e-science-3-hikari", why: "光は鏡で向きが変わるだけで、まっすぐ進む" },
      { i: 1, root: "e-science-3-hikari", why: "光を重ねるほど明るくあたたかくなることの理解" },
      { i: 2, root: "e-science-3-hikari", why: "光を小さく集めるほど熱くなることの理解" },
    ],
  },
  {
    unit: "e-science-3-oto",
    needs: [],
    mistakes: [
      { i: 0, root: "e-science-3-oto", why: "音が出る物はふるえている、というきまり" },
      { i: 1, root: "e-science-3-oto", why: "ふるえ方の大きさと音の大きさの関係" },
      { i: 2, root: "e-science-3-oto", why: "ふるえが物を伝わって音が届くしくみ" },
    ],
  },
  {
    unit: "e-science-3-taiyo",
    needs: [{ unit: "e-science-3-hikari", why: "日光がまっすぐ進むから、かげができる" }],
    mistakes: [
      { i: 0, root: "e-science-3-hikari", why: "日光がまっすぐ進み、さえぎられた後ろがかげになる" },
      { i: 1, root: "e-science-3-taiyo", why: "太陽は東→南→西と動くことの理解" },
      { i: 2, root: "e-science-3-taiyo", why: "温度計の目もりは真横から読む" },
    ],
  },
  {
    unit: "e-science-3-denki",
    needs: [],
    mistakes: [
      { i: 0, root: "e-science-3-denki", why: "＋極から−極へもどる輪の形が回路" },
      { i: 1, root: "e-science-3-denki", why: "ぬり物は電気を通さない、という見分け" },
      { i: 2, root: "e-science-3-denki", why: "金属はどれも電気を通すことの理解" },
    ],
  },
  {
    unit: "e-science-3-jishaku",
    needs: [{ unit: "e-science-3-denki", why: "電気を通す金属と磁石につく鉄を比べて区別する" }],
    mistakes: [
      { i: 0, root: "e-science-3-denki", why: "「金属は電気を通す」と「磁石につく」を混同している" },
      { i: 1, root: "e-science-3-jishaku", why: "極は磁石の両はしで、力がいちばん強い" },
      { i: 2, root: "e-science-3-jishaku", why: "同じ極はしりぞけ合い、ちがう極は引き合う" },
    ],
  },
  {
    unit: "e-science-3-omosa",
    needs: [{ unit: "e-math-3-omosa", why: "g・kg の単位と、はかりの目もりの読み方を使う" }],
    mistakes: [
      { i: 0, root: "e-science-3-omosa", why: "形や数を変えても、全体の重さは変わらない" },
      { i: 1, root: "e-science-3-omosa", why: "置き方を変えても、重さは変わらない" },
      { i: 2, root: "e-science-3-omosa", why: "同じ大きさでも、物の種類で重さがちがう" },
    ],
  },

  // ───────── 小4 ─────────
  {
    unit: "e-science-4-kisetsu",
    needs: [
      { unit: "e-science-3-shokubutsu", why: "種から種へと植物が育つ一生をもとにする" },
      { unit: "e-science-3-konchu", why: "たまご・幼虫・さなぎ・成虫の育ち方をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "e-science-3-konchu", why: "こん虫にたまご・さなぎなどのすがたがあると知らない" },
      { i: 1, root: "e-science-4-kisetsu", why: "様子の変化と気温を結びつけて記録する考え方" },
      { i: 2, root: "e-science-3-shokubutsu", why: "花のあとに実と種ができ、次につながることの理解" },
    ],
  },
  {
    unit: "e-science-4-tenki",
    needs: [
      { unit: "e-science-3-taiyo", why: "日なたと日かげの温度、温度計の読み方を使う" },
      { unit: "e-math-4-oresen", why: "1日の気温の変わり方を折れ線グラフで表す" },
    ],
    mistakes: [
      { i: 0, root: "e-science-4-tenki", why: "気温は日光が直接当たらない所ではかる決まり" },
      { i: 1, root: "e-science-4-tenki", why: "地面があたたまってから気温が上がる、時間のずれ" },
      { i: 2, root: "e-math-4-oresen", why: "折れ線グラフのかたむきで、変わり方を比べられない" },
    ],
  },
  {
    unit: "e-science-4-denryu",
    needs: [{ unit: "e-science-3-denki", why: "回路が輪になると電気が流れることをもとにする" }],
    mistakes: [
      { i: 0, root: "e-science-4-denryu", why: "直列と並列のつなぎ方による電流のちがい" },
      { i: 1, root: "e-science-4-denryu", why: "電流は＋極から出て−極にもどる向きの理解" },
      { i: 2, root: "e-science-4-denryu", why: "検流計を安全に使う、つなぎ方の決まり" },
    ],
  },
  {
    unit: "e-science-4-amamizu",
    needs: [],
    mistakes: [
      { i: 0, root: "e-science-4-amamizu", why: "地面のかたむきと土のつぶで水たまりができる" },
      { i: 1, root: "e-science-4-amamizu", why: "つぶが大きいとすき間が大きく、水が通りやすい" },
      { i: 2, root: "e-science-4-amamizu", why: "水も物も高い所から低い所へ動く" },
    ],
  },
  {
    unit: "e-science-4-kuki-mizu",
    needs: [],
    mistakes: [
      { i: 0, root: "e-science-4-kuki-mizu", why: "空気はおしちぢめられるが、水はできない" },
      { i: 1, root: "e-science-4-kuki-mizu", why: "とじこめた空気は量が同じで、かさだけが変わる" },
      { i: 2, root: "e-science-4-kuki-mizu", why: "おしちぢめた空気がおし返す力で玉が飛ぶ" },
    ],
  },
  {
    unit: "e-science-4-tsuki-hoshi",
    needs: [{ unit: "e-science-3-taiyo", why: "太陽が東→南→西と動く見方を、月や星にも使う" }],
    mistakes: [
      { i: 0, root: "e-science-3-taiyo", why: "太陽と同じく、東→南→西と動く見方ができていない" },
      { i: 1, root: "e-science-4-tsuki-hoshi", why: "星は動いてもならび方は変わらないことの理解" },
      { i: 2, root: "e-science-4-tsuki-hoshi", why: "月の形と、夕方に見える方位の関係" },
    ],
  },
  {
    unit: "e-science-4-hone",
    needs: [],
    mistakes: [
      { i: 0, root: "e-science-4-hone", why: "骨は曲がらず、関節で曲がることの理解" },
      { i: 1, root: "e-science-4-hone", why: "筋肉は縮んで引っぱることしかできない" },
      { i: 2, root: "e-science-4-hone", why: "筋肉は関節をまたいで骨についている" },
    ],
  },
  {
    unit: "e-science-4-ondo",
    needs: [
      { unit: "e-science-4-kuki-mizu", why: "とじこめた空気のかさが変わる見方を使う" },
      { unit: "e-science-3-omosa", why: "かさが変わっても重さは変わらないことを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-science-4-ondo", why: "金属も温度でかさが変わる、という実験の結果" },
      { i: 1, root: "e-science-3-omosa", why: "形やかさが変わっても重さは同じ、が身についていない" },
      { i: 2, root: "e-science-4-ondo", why: "空気・水・金属の変わり方の大きさの比べ" },
    ],
  },
  {
    unit: "e-science-4-atatamari",
    needs: [{ unit: "e-science-4-ondo", why: "あたためた水や空気はかさがふえ、上へ動く" }],
    mistakes: [
      { i: 0, root: "e-science-4-atatamari", why: "金属は熱した所から近い順にあたたまる" },
      { i: 1, root: "e-science-4-atatamari", why: "水はあたためられた所が上へ動いて全体があたたまる" },
      { i: 2, root: "e-science-4-ondo", why: "あたためた空気はかさがふえて軽くなり、上へ動く" },
    ],
  },
  {
    unit: "e-science-4-sugata",
    needs: [
      { unit: "e-science-4-ondo", why: "温度による水のかさの変化をもとにする" },
      { unit: "e-math-4-oresen", why: "熱したときの温度の変化を折れ線グラフで読む" },
    ],
    mistakes: [
      { i: 0, root: "e-science-4-sugata", why: "水蒸気は見えず、湯気は冷えた水のつぶ" },
      { i: 1, root: "e-math-4-oresen", why: "グラフが横ばいの所＝温度が変わらない、と読めない" },
      { i: 2, root: "e-science-4-sugata", why: "水は氷になるとかさがふえる、という特別な性質" },
    ],
  },
  {
    unit: "e-science-4-yukue",
    needs: [
      { unit: "e-science-4-sugata", why: "水が水蒸気になり、冷えて水にもどる変化を使う" },
      { unit: "e-science-4-amamizu", why: "地面に降った雨水の行方をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "e-science-4-sugata", why: "沸騰だけが水蒸気になる道だと思いこんでいる" },
      { i: 1, root: "e-science-4-yukue", why: "空気中の水蒸気が冷やされて水にもどる結露" },
    ],
  },

  // ───────── 小5 ─────────
  {
    unit: "e-science-5-tenki",
    needs: [{ unit: "e-science-4-tenki", why: "天気と気温の観察のしかたをもとにする" }],
    mistakes: [
      { i: 0, root: "e-science-5-tenki", why: "晴れ・くもりは雲の量で決めるという決まり" },
      { i: 1, root: "e-science-5-tenki", why: "雲が西から東へ動くので天気も西から変わる" },
      { i: 2, root: "e-science-5-tenki", why: "台風の進み方は、ほかの天気の変化とちがう" },
    ],
  },
  {
    unit: "e-science-5-hatsuga",
    needs: [
      { unit: "e-science-3-shokubutsu", why: "種から芽と子葉が出る育ちをもとにする" },
      { unit: "e-science-3-kaze-gomu", why: "変える条件を1つにして比べる方法を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-science-5-hatsuga", why: "発芽の条件は水・空気・温度で、日光はいらない" },
      { i: 1, root: "e-science-3-kaze-gomu", why: "変える条件を1つだけにする比べ方ができていない" },
      { i: 2, root: "e-science-5-hatsuga", why: "発芽には空気も必要なことの理解" },
    ],
  },
  {
    unit: "e-science-5-medaka",
    needs: [{ unit: "e-science-3-konchu", why: "たまごから育つ生き物の育ち方をもとにする" }],
    mistakes: [
      { i: 0, root: "e-science-5-medaka", why: "ひれの形でおすとめすを見分ける方法" },
      { i: 1, root: "e-science-5-medaka", why: "受精したたまごだけが育つことの理解" },
      { i: 2, root: "e-science-5-medaka", why: "子メダカははらの養分でしばらく育つ" },
    ],
  },
  {
    unit: "e-science-5-hito",
    needs: [{ unit: "e-science-5-medaka", why: "受精卵から育つしくみをメダカで学んでいる" }],
    mistakes: [
      { i: 0, root: "e-science-5-hito", why: "胎盤とへそのおで養分を受け取るしくみ" },
      { i: 1, root: "e-science-5-hito", why: "羊水は子どもを守る液体だという理解" },
      { i: 2, root: "e-science-5-medaka", why: "メダカのたまごの大きさ（約1mm）と比べられない" },
    ],
  },
  {
    unit: "e-science-5-mi",
    needs: [{ unit: "e-science-3-shokubutsu", why: "花がさいたあと実ができ、種ができる育ちを使う" }],
    mistakes: [
      { i: 0, root: "e-science-5-mi", why: "受粉させないために、つぼみのうちに取る理由" },
      { i: 1, root: "e-science-5-mi", why: "お花とめ花のちがいと、実ができるのはめ花" },
      { i: 2, root: "e-science-5-mi", why: "めしべの根元がふくらんで実になることの理解" },
    ],
  },
  {
    unit: "e-science-5-nagareru",
    needs: [{ unit: "e-science-4-amamizu", why: "水が高い所から低い所へ流れることを使う" }],
    mistakes: [
      { i: 0, root: "e-science-5-nagareru", why: "曲がる所では外側の流れが速く、深くけずる" },
      { i: 1, root: "e-science-5-nagareru", why: "運ばれるうちに石は小さく丸くなる" },
      { i: 2, root: "e-science-5-nagareru", why: "流れがゆるやかな所で積もらせることの理解" },
    ],
  },
  {
    unit: "e-science-5-tokekata",
    needs: [
      { unit: "e-science-3-omosa", why: "形が変わっても重さは変わらないことを使う" },
      { unit: "e-science-4-yukue", why: "水を蒸発させて、とけた物を取り出す" },
    ],
    mistakes: [
      { i: 0, root: "e-science-5-tokekata", why: "食塩は温度でとける量がほとんど変わらない" },
      { i: 1, root: "e-science-3-omosa", why: "見えなくなっても重さは同じ、が身についていない" },
      { i: 2, root: "e-science-5-tokekata", why: "水溶液はすき通っていること、色は関係ない" },
      { i: 3, root: "e-science-5-tokekata", why: "決まった量の水にとける量には限りがある" },
    ],
  },
  {
    unit: "e-science-5-furiko",
    needs: [
      { unit: "e-science-3-kaze-gomu", why: "変える条件を1つにして比べる方法を使う" },
      { unit: "e-math-5-heikin", why: "10往復の時間から1往復の平均を出す" },
    ],
    mistakes: [
      { i: 0, root: "e-science-5-furiko", why: "1往復の時間はおもりの重さで変わらない" },
      { i: 1, root: "e-science-5-furiko", why: "1往復の時間はふれはばでほとんど変わらない" },
      { i: 2, root: "e-science-5-furiko", why: "ふりこの長さは支点からおもりの中心まで" },
      { i: 3, root: "e-science-5-furiko", why: "もとの位置にもどって1往復という数え方" },
    ],
  },
  {
    unit: "e-science-5-denjishaku",
    needs: [
      { unit: "e-science-4-denryu", why: "電流の向きと、直列つなぎで大きくなることを使う" },
      { unit: "e-science-3-jishaku", why: "N極・S極と鉄を引きつける性質をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "e-science-4-denryu", why: "並列つなぎでは電流がほぼ変わらないことの理解" },
      { i: 1, root: "e-science-3-kaze-gomu", why: "変える条件を1つにする比べ方ができていない" },
      { i: 2, root: "e-science-5-denjishaku", why: "電流の向きで電磁石の極が入れかわる" },
    ],
  },

  // ───────── 小6 ─────────
  {
    unit: "e-science-6-moekata",
    needs: [{ unit: "e-math-5-wariai", why: "空気の成分を%（百分率）で読む" }],
    mistakes: [
      { i: 0, root: "e-science-6-moekata", why: "酸素が少なくなると燃えなくなる、という結果" },
      { i: 1, root: "e-science-6-moekata", why: "空気は窒素が約78%、酸素が約21%" },
      { i: 2, root: "e-science-6-moekata", why: "燃やすはたらきがあるのは酸素だけ" },
    ],
  },
  {
    unit: "e-science-6-karada",
    needs: [
      { unit: "e-science-4-hone", why: "骨・筋肉など体のつくりをもとにする" },
      { unit: "e-science-6-moekata", why: "酸素と二酸化炭素の調べ方を呼吸で使う" },
    ],
    mistakes: [
      { i: 0, root: "e-science-6-moekata", why: "気体の割合が変わるだけで、なくならないことの理解" },
      { i: 1, root: "e-science-6-karada", why: "養分は主に小腸で吸収されることの理解" },
      { i: 2, root: "e-science-6-karada", why: "唾液がでんぷんを別の物に変えるので色が出ない" },
      { i: 3, root: "e-science-6-karada", why: "心臓の拍動が血管に伝わったのが脈拍" },
    ],
  },
  {
    unit: "e-science-6-shokubutsu",
    needs: [
      { unit: "e-science-5-hatsuga", why: "でんぷんとヨウ素液、日光と成長の関係を使う" },
      { unit: "e-science-6-moekata", why: "酸素と二酸化炭素の調べ方を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-science-6-shokubutsu", why: "吸った水の多くは葉から出ていく（蒸散）" },
      { i: 1, root: "e-science-5-hatsuga", why: "ヨウ素液がでんぷんで青紫色になることの理解" },
      { i: 2, root: "e-science-6-shokubutsu", why: "植物も動物と同じく呼吸をしている" },
    ],
  },
  {
    unit: "e-science-6-kankyo",
    needs: [
      { unit: "e-science-6-shokubutsu", why: "植物が日光で養分をつくることをもとにする" },
      { unit: "e-science-6-karada", why: "動物が食べ物と酸素を取り入れるしくみを使う" },
      { unit: "e-science-4-yukue", why: "水が蒸発し、また水にもどるめぐりを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-science-6-shokubutsu", why: "養分をつくるのは日光を受けた植物" },
      { i: 1, root: "e-science-6-shokubutsu", why: "植物も呼吸して二酸化炭素を出すことの理解" },
      { i: 2, root: "e-science-4-yukue", why: "水は蒸発して空気中に出て、また雨になる" },
    ],
  },
  {
    unit: "e-science-6-tsuki-taiyo",
    needs: [{ unit: "e-science-4-tsuki-hoshi", why: "月の動きと形の変わり方の観察をもとにする" }],
    mistakes: [
      { i: 0, root: "e-science-6-tsuki-taiyo", why: "月は太陽の光を受けた半分が光っている" },
      { i: 1, root: "e-science-4-tsuki-hoshi", why: "三日月が夕方に西の空に見えることの理解" },
      { i: 2, root: "e-science-6-tsuki-taiyo", why: "太陽のある側が光る、という位置関係" },
    ],
  },
  {
    unit: "e-science-6-tochi",
    needs: [{ unit: "e-science-5-nagareru", why: "流れる水がけずり・運び・積もらせることを使う" }],
    mistakes: [
      { i: 0, root: "e-science-5-nagareru", why: "流れで運ばれる石は角がとれて丸くなる" },
      { i: 1, root: "e-science-6-tochi", why: "下から順に積もるので、下の層ほど古い" },
      { i: 2, root: "e-science-6-tochi", why: "水で運ばれた土砂は海や湖の底に積もる" },
    ],
  },
  {
    unit: "e-science-6-suiyoeki",
    needs: [{ unit: "e-science-5-tokekata", why: "水溶液と、蒸発させて取り出す方法を使う" }],
    mistakes: [
      { i: 0, root: "e-science-6-suiyoeki", why: "リトマス紙の色で酸性・中性・アルカリ性を決める" },
      { i: 1, root: "e-science-6-suiyoeki", why: "においは手であおいでかぐ、安全な決まり" },
      { i: 2, root: "e-science-6-suiyoeki", why: "金属が水溶液で別の物に変わることの理解" },
    ],
  },
  {
    unit: "e-science-6-teko",
    needs: [{ unit: "e-science-3-omosa", why: "おもりの重さをはかって比べる見方を使う" }],
    mistakes: [
      { i: 0, root: "e-science-6-teko", why: "力点が支点から遠いほど小さな力ですむ" },
      { i: 1, root: "e-science-6-teko", why: "つり合いは「重さ×距離」で比べるきまり" },
      { i: 2, root: "e-science-6-teko", why: "作用点が力点の内側にある道具の特徴" },
    ],
  },
  {
    unit: "e-science-6-denki",
    needs: [
      { unit: "e-science-5-denjishaku", why: "電流の大きさとはたらきの関係を使う" },
      { unit: "e-science-4-denryu", why: "電流には向きがあることを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-science-6-denki", why: "つくる（発電）とためる（蓄電）のちがい" },
      { i: 1, root: "e-science-4-denryu", why: "電流には向きがあることが身についていない" },
      { i: 2, root: "e-science-6-denki", why: "速く回すほど電流が大きくなることの理解" },
    ],
  },

  // ───────── 中1 ─────────
  {
    unit: "j-sci-1-shokubutsu-bunrui",
    needs: [{ unit: "e-science-5-mi", why: "花のつくりと、めしべの根元が実になることを使う" }],
    mistakes: [
      { i: 0, root: "e-science-5-mi", why: "めしべの根元（子房）が実になることがあいまい" },
      { i: 1, root: "j-sci-1-shokubutsu-bunrui", why: "花弁や子房がなくても花だという理解" },
      { i: 2, root: "e-science-5-mi", why: "めしべの根元（子房）が実になることがあいまい" },
      { i: 3, root: "j-sci-1-shokubutsu-bunrui", why: "仮根と根のはたらきのちがい" },
    ],
  },
  {
    unit: "j-sci-1-dobutsu-bunrui",
    needs: [
      { unit: "e-science-3-konchu", why: "体のつくりで、こん虫かどうかを見分けた経験" },
      { unit: "e-science-4-hone", why: "骨のつくりが背骨の有無で分ける土台" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-1-dobutsu-bunrui", why: "すむ場所ではなく呼吸・ふえ方で分ける" },
      { i: 1, root: "j-sci-1-dobutsu-bunrui", why: "両生類は子と親で呼吸のしかたが変わる" },
      { i: 2, root: "j-sci-1-dobutsu-bunrui", why: "飛べるかではなく体の特徴で分ける" },
      { i: 3, root: "e-science-3-konchu", why: "体が3つ・あし6本という、こん虫の条件" },
    ],
  },
  {
    unit: "j-sci-1-busshitsu",
    needs: [
      { unit: "e-science-3-jishaku", why: "磁石につくのは鉄で、金属すべてではない" },
      { unit: "e-science-3-omosa", why: "同じ大きさでも物の種類で重さがちがう" },
      { unit: "e-math-5-tanni", why: "密度は「1cm³あたり」の単位量あたりの大きさ" },
    ],
    mistakes: [
      { i: 0, root: "e-science-3-jishaku", why: "磁石につくのは鉄などで、金属すべてではない" },
      { i: 1, root: "e-math-5-tanni", why: "「1cm³あたり」は質量÷体積、の考え方が弱い" },
      { i: 2, root: "j-sci-1-busshitsu", why: "炭素そのものや二酸化炭素は無機物という決まり" },
    ],
  },
  {
    unit: "j-sci-1-kitai",
    needs: [{ unit: "e-science-6-moekata", why: "酸素と二酸化炭素の性質と見分け方を使う" }],
    mistakes: [
      { i: 0, root: "e-science-6-moekata", why: "酸素は物を燃やすはたらきがあり、自分は燃えない" },
      { i: 1, root: "j-sci-1-kitai", why: "水へのとけやすさと重さで集め方を決める" },
      { i: 2, root: "j-sci-1-kitai", why: "はじめは装置の中の空気が出てくる" },
    ],
  },
  {
    unit: "j-sci-1-suiyoeki",
    needs: [
      { unit: "e-science-5-tokekata", why: "とけても重さは変わらず、とける量に限りがある" },
      { unit: "e-math-5-wariai", why: "質量パーセント濃度は百分率の計算" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-wariai", why: "もとにする量（水溶液全体）を取りちがえている" },
      { i: 1, root: "e-science-5-tokekata", why: "とけても重さは変わらず、物は残っている" },
      { i: 2, root: "e-science-5-tokekata", why: "食塩は温度でとける量がほとんど変わらない" },
      { i: 3, root: "j-sci-1-suiyoeki", why: "粒子は水全体に均一に広がっている" },
    ],
  },
  {
    unit: "j-sci-1-jotai",
    needs: [{ unit: "e-science-4-sugata", why: "水が氷・水・水蒸気とすがたを変えることを使う" }],
    mistakes: [
      { i: 0, root: "e-science-3-omosa", why: "形が変わっても重さは同じ、が身についていない" },
      { i: 1, root: "e-science-4-sugata", why: "沸騰中は約100℃から上がらないことの理解" },
      { i: 2, root: "e-science-4-sugata", why: "湯気は水蒸気が冷えてできた水のつぶ" },
      { i: 3, root: "e-science-4-sugata", why: "水がこおるとかさがふえることの理解" },
    ],
  },
  {
    unit: "j-sci-1-hikari",
    needs: [
      { unit: "e-science-3-hikari", why: "光はまっすぐ進み、鏡ではね返ることを使う" },
      { unit: "e-math-4-kaku", why: "入射角・反射角を分度器ではかる" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-1-hikari", why: "入射角は法線と光のなす角という決まり" },
      { i: 1, root: "j-sci-1-hikari", why: "空気→水では境目に近づくように曲がる" },
      { i: 2, root: "j-sci-1-hikari", why: "実像と虚像のちがいの理解" },
      { i: 3, root: "j-sci-1-hikari", why: "レンズのどこを通った光も像の全体をつくる" },
    ],
  },
  {
    unit: "j-sci-1-oto",
    needs: [
      { unit: "e-science-3-oto", why: "音は物のふるえで出て、伝わることを使う" },
      { unit: "e-math-5-hayasa", why: "距離＝速さ×時間で音の届く距離を求める" },
    ],
    mistakes: [
      { i: 0, root: "e-science-3-oto", why: "強くはじく＝ふるえが大きい＝大きい音、のきまり" },
      { i: 1, root: "j-sci-1-oto", why: "音を伝える物がない真空では伝わらない" },
      { i: 2, root: "j-sci-1-oto", why: "やまびこは往復なので距離は半分" },
    ],
  },
  {
    unit: "j-sci-1-chikara",
    needs: [
      { unit: "e-science-3-kaze-gomu", why: "ゴムやばねの力で物が動く経験をもとにする" },
      { unit: "j-math-1-hirei", why: "ばねののびが力に比例するフックの法則" },
    ],
    mistakes: [
      { i: 0, root: "j-math-1-hirei", why: "比例は0から始まる量どうし、が身についていない" },
      { i: 1, root: "j-sci-1-chikara", why: "100gの物にはたらく重力が約1Nという換算" },
      { i: 2, root: "j-sci-1-chikara", why: "重さ（力）と質量（物の量）のちがい" },
      { i: 3, root: "j-sci-1-chikara", why: "摩擦力は動きをさまたげる向きにはたらく" },
    ],
  },
  {
    unit: "j-sci-1-kazan",
    needs: [{ unit: "e-science-6-tochi", why: "火山のはたらきでできる地層・火山灰を使う" }],
    mistakes: [
      { i: 0, root: "j-sci-1-kazan", why: "地表近くで急に冷えると斑状組織になる" },
      { i: 1, root: "j-sci-1-kazan", why: "ねばりけが強いほど爆発的に噴火する" },
      { i: 2, root: "e-science-6-tochi", why: "流れで丸くなる石と火山灰の粒のちがい" },
      { i: 3, root: "j-sci-1-kazan", why: "深成岩と火山岩の見分け方" },
    ],
  },
  {
    unit: "j-sci-1-jishin",
    needs: [
      { unit: "e-science-6-tochi", why: "地震で土地が変化することをもとにする" },
      { unit: "e-math-5-hayasa", why: "波の速さ＝距離÷時間で震源距離を求める" },
      { unit: "j-math-1-hirei", why: "初期微動継続時間は震源距離に比例する" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-1-jishin", why: "震度は場所ごと、マグニチュードは規模" },
      { i: 1, root: "j-math-1-hirei", why: "比例のグラフで、距離が大きいほど長いと読めない" },
      { i: 2, root: "j-sci-1-jishin", why: "震央は震源の真上の地表の点" },
      { i: 3, root: "j-sci-1-jishin", why: "震度は5弱・5強などをふくむ10階級" },
    ],
  },
  {
    unit: "j-sci-1-chiso",
    needs: [
      { unit: "e-science-6-tochi", why: "地層ができるしくみとつぶの分け方を使う" },
      { unit: "j-sci-1-kazan", why: "火山灰の層をかぎ層として使う" },
    ],
    mistakes: [
      { i: 0, root: "e-science-6-tochi", why: "下から順に積もるので下の層ほど古い" },
      { i: 1, root: "e-science-5-nagareru", why: "大きな粒は流れがゆるむとすぐ積もる" },
      { i: 2, root: "j-sci-1-chiso", why: "示相化石と示準化石のちがい" },
      { i: 3, root: "j-sci-1-chiso", why: "石灰岩とチャートの見分け方" },
    ],
  },

  // ───────── 中2 ─────────
  {
    unit: "j-sci-2-genshi",
    needs: [
      { unit: "j-sci-1-kitai", why: "分解で出てくる水素・酸素の見分け方を使う" },
      { unit: "j-sci-1-suiyoeki", why: "純粋な物質と混合物の区別が土台になる" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-genshi", why: "分子は原子が結びついた粒で、H₂と書く" },
      { i: 1, root: "j-sci-2-genshi", why: "陰極に水素、陽極に酸素という結果" },
      { i: 2, root: "j-sci-2-genshi", why: "元素記号の大文字・小文字の書き方" },
      { i: 3, root: "j-sci-2-genshi", why: "1種類の元素だけでできた物質が単体" },
    ],
  },
  {
    unit: "j-sci-2-kagaku-henka",
    needs: [
      { unit: "j-sci-2-genshi", why: "原子・分子と化学式で変化を表す" },
      { unit: "e-science-6-moekata", why: "燃えると酸素が使われることをもとにする" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-genshi", why: "化学式の右下の数と、前につける数のちがい" },
      { i: 1, root: "j-sci-2-kagaku-henka", why: "酸素をうばわれた物が還元される" },
      { i: 2, root: "j-sci-2-kagaku-henka", why: "化学変化で別の物質になり性質が変わる" },
      { i: 3, root: "j-sci-2-kagaku-henka", why: "反応の熱で次々と反応が進む" },
    ],
  },
  {
    unit: "j-sci-2-shitsuryo",
    needs: [
      { unit: "j-sci-2-kagaku-henka", why: "酸化など、原子の組みかえを使う" },
      { unit: "e-math-6-hi", why: "結びつく質量の比で計算する" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-kagaku-henka", why: "燃える＝酸素と結びつく（酸化）ことの理解" },
      { i: 1, root: "e-math-6-hi", why: "比の各項が何を表すかを取りちがえている" },
      { i: 2, root: "j-sci-2-shitsuryo", why: "出入りした気体もふくめて質量を考える" },
    ],
  },
  {
    unit: "j-sci-2-saibo",
    needs: [
      { unit: "j-sci-1-shokubutsu-bunrui", why: "生物を観察してスケッチする方法を使う" },
      { unit: "e-science-6-karada", why: "呼吸で酸素を取り入れることが細胞の呼吸の土台" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-saibo", why: "植物と動物の細胞に共通するつくりの理解" },
      { i: 1, root: "j-sci-2-saibo", why: "葉緑体は光の当たる部分の細胞にある" },
      { i: 2, root: "j-sci-2-saibo", why: "核を染める染色液の使い分け" },
      { i: 3, root: "j-sci-2-saibo", why: "大きさではなく細胞の数で分ける" },
    ],
  },
  {
    unit: "j-sci-2-shokubutsu",
    needs: [
      { unit: "e-science-6-shokubutsu", why: "日光ででんぷんをつくる・蒸散を使う" },
      { unit: "j-sci-2-saibo", why: "葉緑体や気孔など細胞のつくりを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-science-6-shokubutsu", why: "植物も昼も夜も呼吸していることの理解" },
      { i: 1, root: "j-sci-2-shokubutsu", why: "維管束の道管と師管の位置" },
      { i: 2, root: "j-sci-2-shokubutsu", why: "ワセリンでふさいだ所の引き算の考え方" },
    ],
  },
  {
    unit: "j-sci-2-dobutsu",
    needs: [
      { unit: "e-science-6-karada", why: "消化・呼吸・血液の循環の基本をもとにする" },
      { unit: "j-sci-2-saibo", why: "細胞が養分と酸素を使うことを使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-dobutsu", why: "動脈・静脈と動脈血・静脈血の区別" },
      { i: 1, root: "j-sci-2-dobutsu", why: "胆汁は消化酵素をふくまないことの理解" },
      { i: 2, root: "j-sci-2-dobutsu", why: "肝臓でつくり、じん臓でこし出す分担" },
    ],
  },
  {
    unit: "j-sci-2-shigeki",
    needs: [{ unit: "e-science-4-hone", why: "骨・関節・筋肉で体が動くしくみを使う" }],
    mistakes: [
      { i: 0, root: "j-sci-2-shigeki", why: "反射は脊髄などが命令を出す近道" },
      { i: 1, root: "j-sci-2-shigeki", why: "感覚神経と運動神経の向きのちがい" },
      { i: 2, root: "e-science-4-hone", why: "筋肉は縮んで引っぱることしかできない" },
      { i: 3, root: "j-sci-2-shigeki", why: "感じるのは脳で、感覚器官は入り口" },
    ],
  },
  {
    unit: "j-sci-2-denryu",
    needs: [
      { unit: "e-science-4-denryu", why: "電流の向き、直列・並列のつなぎ方を使う" },
      { unit: "j-math-1-hirei", why: "電圧と電流が比例するオームの法則" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-denryu", why: "電流は豆電球で使われず、どこでも同じ" },
      { i: 1, root: "j-sci-2-denryu", why: "電圧計ははかる部分に並列につなぐ" },
      { i: 2, root: "j-sci-2-denryu", why: "mA を A に直してから計算する" },
      { i: 3, root: "j-sci-2-denryu", why: "並列では枝の電流の和が全体の電流" },
    ],
  },
  {
    unit: "j-sci-2-jikai",
    needs: [
      { unit: "j-sci-2-denryu", why: "回路の電流の向きと大きさを使う" },
      { unit: "e-science-5-denjishaku", why: "コイルに電流を流すと磁石になることを使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-jikai", why: "磁界が変化している間だけ誘導電流が流れる" },
      { i: 1, root: "j-sci-2-jikai", why: "向きを2つとも逆にすると力はもとの向き" },
      { i: 2, root: "j-sci-2-jikai", why: "磁力線はN極から出てS極に入る" },
    ],
  },
  {
    unit: "j-sci-2-seidenki",
    needs: [{ unit: "j-sci-2-denryu", why: "回路の電流の向きをもとに電子の動きを考える" }],
    mistakes: [
      { i: 0, root: "j-sci-2-seidenki", why: "移動するのは−の電気をもつ電子" },
      { i: 1, root: "j-sci-2-seidenki", why: "電子の向きは電流の向きと逆" },
      { i: 2, root: "j-sci-2-seidenki", why: "陰極線は電子の流れで、−極から出る" },
    ],
  },
  {
    unit: "j-sci-2-kisho",
    needs: [
      { unit: "j-sci-1-chikara", why: "力の大きさ（N）を圧力の計算に使う" },
      { unit: "e-math-5-wariai", why: "湿度は割合（百分率）で求める" },
      { unit: "e-science-4-yukue", why: "水蒸気が冷えて水滴になる結露を使う" },
      { unit: "e-science-5-tenki", why: "雲の量や天気の変化の観察をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-menseki", why: "cm² と m² の関係（1m²＝10000cm²）があいまい" },
      { i: 1, root: "j-sci-2-kisho", why: "風向はふいてくる方向で表す決まり" },
      { i: 2, root: "j-sci-2-kisho", why: "気温が上がると飽和水蒸気量が大きくなる" },
      { i: 3, root: "e-science-4-yukue", why: "冷やされて初めて水蒸気が水にもどる" },
    ],
  },
  {
    unit: "j-sci-2-tenki",
    needs: [{ unit: "j-sci-2-kisho", why: "気圧・湿度・露点の考え方を使う" }],
    mistakes: [
      { i: 0, root: "j-sci-2-tenki", why: "寒冷前線のうしろには寒気がある" },
      { i: 1, root: "j-sci-2-tenki", why: "前線の傾きと雲の種類で雨の降り方が変わる" },
      { i: 2, root: "j-sci-2-tenki", why: "北半球の低気圧は反時計回りにふきこむ" },
      { i: 3, root: "e-science-5-tenki", why: "天気が西から東へ変わることの理解" },
    ],
  },
  {
    unit: "j-sci-2-nihon-kisho",
    needs: [{ unit: "j-sci-2-tenki", why: "気団・前線・高気圧と低気圧を使う" }],
    mistakes: [
      { i: 0, root: "j-sci-2-kisho", why: "水面から水蒸気を取りこむと湿る、という理解" },
      { i: 1, root: "j-sci-2-nihon-kisho", why: "陸はあたたまりやすく冷えやすいことの理解" },
      { i: 2, root: "j-sci-2-nihon-kisho", why: "台風は熱帯低気圧で、前線をともなわない" },
    ],
  },

  // ───────── 中3 ─────────
  {
    unit: "j-sci-3-ion",
    needs: [
      { unit: "j-sci-2-genshi", why: "原子・化学式と電気分解をもとにする" },
      { unit: "j-sci-2-seidenki", why: "−の電気をもつ電子の考え方を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-ion", why: "電解質と非電解質のちがい" },
      { i: 1, root: "j-sci-2-seidenki", why: "電子は−の電気をもつ、が身についていない" },
      { i: 2, root: "j-sci-3-ion", why: "陽イオンは陰極に引かれることの理解" },
    ],
  },
  {
    unit: "j-sci-3-denchi",
    needs: [
      { unit: "j-sci-3-ion", why: "金属がイオンになり電子を出す考え方を使う" },
      { unit: "j-sci-2-denryu", why: "回路と＋極・−極の考え方を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-seidenki", why: "電子の流れと電流の向きは逆、が身についていない" },
      { i: 1, root: "j-sci-3-denchi", why: "イオンになりやすい亜鉛がとけることの理解" },
      { i: 2, root: "j-sci-3-denchi", why: "イオンへのなりやすさの差が電池をつくる" },
    ],
  },
  {
    unit: "j-sci-3-chuwa",
    needs: [
      { unit: "j-sci-3-ion", why: "H⁺ と OH⁻ などイオンの考え方を使う" },
      { unit: "e-science-6-suiyoeki", why: "酸性・アルカリ性の見分け方をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-chuwa", why: "H⁺ と OH⁻ が出会えば中和は起こる" },
      { i: 1, root: "j-sci-3-chuwa", why: "塩は酸の陰イオンとアルカリの陽イオンの物質" },
      { i: 2, root: "j-sci-3-chuwa", why: "BTB溶液の色の変化の覚えちがい" },
      { i: 3, root: "j-sci-3-ion", why: "水溶液の中でのイオンの数の追い方" },
    ],
  },
  {
    unit: "j-sci-3-saibo-bunretsu",
    needs: [{ unit: "j-sci-2-saibo", why: "細胞と核のつくり、観察のしかたを使う" }],
    mistakes: [
      { i: 0, root: "j-sci-3-saibo-bunretsu", why: "数がふえることと大きくなることの両方" },
      { i: 1, root: "j-sci-3-saibo-bunretsu", why: "体細胞分裂では染色体の数は変わらない" },
      { i: 2, root: "j-sci-3-saibo-bunretsu", why: "根の先端近くでさかんに分裂する" },
    ],
  },
  {
    unit: "j-sci-3-iden",
    needs: [
      { unit: "j-sci-3-saibo-bunretsu", why: "染色体と細胞分裂、受精の考え方を使う" },
      { unit: "e-math-6-hi", why: "子や孫の形質の数を比で表す" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-iden", why: "遺伝子の組み合わせの比と形質の比のちがい" },
      { i: 1, root: "j-sci-3-iden", why: "潜性は現れにくいだけで、優劣ではない" },
      { i: 2, root: "j-sci-3-iden", why: "減数分裂で遺伝子が1つずつに分かれる" },
    ],
  },
  {
    unit: "j-sci-3-shinka",
    needs: [
      { unit: "j-sci-1-dobutsu-bunrui", why: "脊椎動物の5つのなかまの特徴を使う" },
      { unit: "j-sci-3-iden", why: "形質が遺伝子で子に伝わることを使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-shinka", why: "進化は何世代もかけた集団の変化" },
      { i: 1, root: "j-sci-1-dobutsu-bunrui", why: "鳥類とは虫類の共通点（卵・うろこ）があいまい" },
      { i: 2, root: "j-sci-3-shinka", why: "相同器官は骨の基本のつくりが同じ" },
    ],
  },
  {
    unit: "j-sci-3-suiatsu",
    needs: [
      { unit: "j-sci-2-kisho", why: "圧力＝力÷面積と大気圧の考え方を使う" },
      { unit: "j-sci-1-chikara", why: "重力と力のつり合いを使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-suiatsu", why: "水圧はあらゆる向きからはたらく" },
      { i: 1, root: "j-sci-3-suiatsu", why: "浮力は上下の水圧の差で、深さによらない" },
      { i: 2, root: "j-sci-1-chikara", why: "重力（重さ）は場所が地球上なら変わらない" },
    ],
  },
  {
    unit: "j-sci-3-goryoku",
    needs: [
      { unit: "j-sci-1-chikara", why: "力を矢印で表し、つり合いを考える" },
      { unit: "e-math-4-suichoku", why: "平行線をひいて平行四辺形をかく" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-goryoku", why: "角度のある2力は平行四辺形の対角線で合成" },
      { i: 1, root: "j-sci-3-goryoku", why: "角度が開くと分力が大きくなることの理解" },
      { i: 2, root: "j-sci-3-goryoku", why: "重力は変わらず、分力の分かれ方が変わる" },
    ],
  },
  {
    unit: "j-sci-3-undo",
    needs: [
      { unit: "j-sci-3-goryoku", why: "力の合成とつり合いを使う" },
      { unit: "e-math-5-hayasa", why: "速さ＝距離÷時間の計算を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-undo", why: "力がつり合えば等速で進み続ける（慣性）" },
      { i: 1, root: "j-sci-3-undo", why: "傾きが大きいほど斜面方向の力が大きい" },
      { i: 2, root: "e-math-5-hayasa", why: "速さは距離÷時間、の式が身についていない" },
    ],
  },
  {
    unit: "j-sci-3-shigoto",
    needs: [
      { unit: "j-sci-3-undo", why: "力と運動の関係を使う" },
      { unit: "e-science-6-teko", why: "てこで小さな力ですむしくみをもとにする" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-shigoto", why: "力の向きに動いた距離だけが仕事になる" },
      { i: 1, root: "j-sci-3-shigoto", why: "力が半分なら距離が2倍（仕事の原理）" },
      { i: 2, root: "j-sci-3-shigoto", why: "位置と運動のエネルギーが移り変わる" },
    ],
  },
  {
    unit: "j-sci-3-tentai",
    needs: [
      { unit: "e-science-6-tsuki-taiyo", why: "月の形と太陽の位置関係を使う" },
      { unit: "e-science-4-tsuki-hoshi", why: "星が東から西へ動いて見えることを使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-tentai", why: "北の空は北極星を中心に反時計回り" },
      { i: 1, root: "j-sci-3-tentai", why: "日周運動と年周運動の速さのちがい" },
      { i: 2, root: "j-sci-3-tentai", why: "地軸の傾きで南中高度と昼の長さが変わる" },
      { i: 3, root: "e-science-6-tsuki-taiyo", why: "太陽に照らされた半分の見え方が変わる" },
    ],
  },
  {
    unit: "j-sci-3-taiyokei",
    needs: [{ unit: "j-sci-3-tentai", why: "地球の自転・公転と見かけの動きを使う" }],
    mistakes: [
      { i: 0, root: "j-sci-3-taiyokei", why: "惑星と衛星のちがい" },
      { i: 1, root: "j-sci-3-taiyokei", why: "黒点は周りより温度が低いので黒い" },
      { i: 2, root: "j-sci-3-taiyokei", why: "内側を回る金星は太陽から離れて見えない" },
      { i: 3, root: "j-sci-3-taiyokei", why: "光年は光が1年で進む距離" },
    ],
  },
  {
    unit: "j-sci-3-seitaikei",
    needs: [
      { unit: "e-science-6-kankyo", why: "食べる・食べられるのつながりをもとにする" },
      { unit: "j-sci-2-shokubutsu", why: "光合成と呼吸による気体の出入りを使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-seitaikei", why: "矢印は栄養が移る向きに書く" },
      { i: 1, root: "j-sci-2-shokubutsu", why: "植物も一日中呼吸していることの理解" },
      { i: 2, root: "j-sci-3-seitaikei", why: "土の中の小動物も分解者にふくめる" },
    ],
  },
  {
    unit: "j-sci-3-kagaku-gijutsu",
    needs: [
      { unit: "j-sci-3-shigoto", why: "エネルギーの移り変わりと保存を使う" },
      { unit: "e-science-6-denki", why: "電気をつくり、別のはたらきに変えることを使う" },
      { unit: "e-science-4-atatamari", why: "金属と水・空気のあたたまり方のちがいを使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-kagaku-gijutsu", why: "総量は保存され、一部が熱に変わる" },
      { i: 1, root: "e-science-4-atatamari", why: "固体は順に、液体・気体は動いてあたたまる" },
      { i: 2, root: "j-sci-3-kagaku-gijutsu", why: "発電の方法ごとの長所と課題" },
    ],
  },

  // ───────── 物理基礎 ─────────
  {
    unit: "h-sci-phyb-undo",
    needs: [
      { unit: "j-sci-3-undo", why: "速さの求め方と、力と運動の関係を使う" },
      { unit: "j-math-2-ichiji-kansu", why: "v–t グラフの傾きを読む" },
    ],
    mistakes: [
      { i: 0, root: "j-math-1-seifu", why: "向きを正負の数で表す考え方が弱い" },
      { i: 1, root: "h-sci-phyb-undo", why: "加速度は速度の変化の割合で、最高点でも g" },
      { i: 2, root: "h-sci-phyb-undo", why: "v–t グラフの面積が変位になる理由" },
      { i: 3, root: "e-math-5-hayasa", why: "時速と秒速の換算が身についていない" },
    ],
  },
  {
    unit: "h-sci-phyb-hosoku",
    needs: [
      { unit: "h-sci-phyb-undo", why: "加速度と速度の表し方を使う" },
      { unit: "j-sci-3-goryoku", why: "力の合成・分解と作用・反作用を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-goryoku", why: "つり合いと作用・反作用の区別があいまい" },
      { i: 1, root: "j-sci-3-undo", why: "等速なら合力は0（慣性）が身についていない" },
      { i: 2, root: "h-sci-phyb-hosoku", why: "静止摩擦力と最大摩擦力のちがい" },
      { i: 3, root: "h-sci-phyb-hosoku", why: "運動方程式の F は合力" },
    ],
  },
  {
    unit: "h-sci-phyb-energy",
    needs: [
      { unit: "h-sci-phyb-hosoku", why: "運動方程式から仕事とエネルギーを導く" },
      { unit: "j-sci-3-shigoto", why: "仕事＝力×距離とエネルギー保存を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-shigoto", why: "力の向きに動いた距離だけが仕事になる" },
      { i: 1, root: "j-math-3-kansu-ax2", why: "2乗に比例する量の増え方が身についていない" },
      { i: 2, root: "h-sci-phyb-energy", why: "F–x グラフの三角形の面積で ½ がつく" },
      { i: 3, root: "h-sci-phyb-energy", why: "摩擦の仕事の分だけ力学的エネルギーが減る" },
    ],
  },
  {
    unit: "h-sci-phyb-netsu",
    needs: [
      { unit: "j-sci-3-kagaku-gijutsu", why: "エネルギーの変換と熱の伝わり方を使う" },
      { unit: "j-sci-1-jotai", why: "状態変化と粒子の運動をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phyb-netsu", why: "絶対温度は℃に273を足す" },
      { i: 1, root: "h-sci-phyb-netsu", why: "温度と熱量のちがい" },
      { i: 2, root: "j-sci-1-jotai", why: "状態変化の間は温度が一定、が身についていない" },
      { i: 3, root: "h-sci-phyb-netsu", why: "熱機関は必ず熱の一部を捨てる" },
    ],
  },
  {
    unit: "h-sci-phyb-nami",
    needs: [{ unit: "j-sci-1-oto", why: "振動が次々と伝わる音の性質をもとにする" }],
    mistakes: [
      { i: 0, root: "h-sci-phyb-nami", why: "媒質はその場で振動し、波形が進む" },
      { i: 1, root: "h-sci-phyb-nami", why: "速さは媒質で決まり、v＝fλ で波長が変わる" },
      { i: 2, root: "h-sci-phyb-nami", why: "定常波の節と節の間隔は半波長" },
    ],
  },
  {
    unit: "h-sci-phyb-oto",
    needs: [
      { unit: "h-sci-phyb-nami", why: "v＝fλ と定常波の考え方を使う" },
      { unit: "j-sci-1-oto", why: "音の大きさは振幅、高さは振動数" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-1-oto", why: "大きさ・高さと伝わる速さを混同している" },
      { i: 1, root: "h-sci-phyb-oto", why: "うなりの回数は振動数の差" },
      { i: 2, root: "h-sci-phyb-oto", why: "閉管の閉じた端は必ず節になる" },
    ],
  },
  {
    unit: "h-sci-phyb-denryu",
    needs: [
      { unit: "j-sci-2-denryu", why: "オームの法則と直列・並列回路を使う" },
      { unit: "j-sci-2-seidenki", why: "電流の正体が電子の流れであることを使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-denryu", why: "並列の合成抵抗は 1/R の逆数で求める" },
      { i: 1, root: "h-sci-phyb-denryu", why: "抵抗は長さに比例し、断面積に反比例" },
      { i: 2, root: "j-sci-2-seidenki", why: "電子は電流と逆向きに動くことの理解" },
    ],
  },
  {
    unit: "h-sci-phyb-koryu",
    needs: [
      { unit: "j-sci-2-jikai", why: "電流と磁界、電磁誘導の基本を使う" },
      { unit: "h-sci-phyb-denryu", why: "電力 P＝IV を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-jikai", why: "磁界が変化している間だけ電流が流れる" },
      { i: 1, root: "h-sci-phyb-koryu", why: "変圧器では電力が保存される" },
      { i: 2, root: "h-sci-phyb-koryu", why: "交流の 100 V は実効値" },
    ],
  },
  {
    unit: "h-sci-phyb-riyo",
    needs: [
      { unit: "h-sci-phyb-energy", why: "力学的エネルギーと保存則を使う" },
      { unit: "h-sci-phyb-netsu", why: "熱と内部エネルギーの考え方を使う" },
      { unit: "j-sci-3-kagaku-gijutsu", why: "発電方法と放射線の基本をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-kagaku-gijutsu", why: "エネルギーの総量は保存される" },
      { i: 1, root: "h-sci-phyb-riyo", why: "半減期ごとに½ずつ減る" },
      { i: 2, root: "h-sci-phyb-riyo", why: "Bq と Sv が表す量のちがい" },
      { i: 3, root: "h-sci-phyb-riyo", why: "核分裂で減った質量がエネルギーになる" },
    ],
  },

  // ───────── 物理 ─────────
  {
    unit: "h-sci-phy-hoshabutsu",
    needs: [
      { unit: "h-sci-phyb-undo", why: "等速直線運動と自由落下を組み合わせる" },
      { unit: "h-math-1-sankakuhi", why: "初速度を v₀cosθ・v₀sinθ に分ける" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phy-hoshabutsu", why: "水平と鉛直の運動は別々に進む" },
      { i: 1, root: "h-sci-phy-hoshabutsu", why: "最高点で0になるのは鉛直成分だけ" },
      { i: 2, root: "h-sci-phyb-undo", why: "加速度はいつも g、が身についていない" },
    ],
  },
  {
    unit: "h-sci-phy-goutai",
    needs: [
      { unit: "h-sci-phyb-hosoku", why: "力のつり合いと力の見つけ方を使う" },
      { unit: "e-science-6-teko", why: "重さ×距離でつり合う、てこのきまり" },
      { unit: "h-math-1-sankakuhi", why: "斜めの力の垂直成分を sinθ で求める" },
    ],
    mistakes: [
      { i: 0, root: "h-math-1-sankakuhi", why: "力の成分を sin・cos で表すことが弱い" },
      { i: 1, root: "h-sci-phy-goutai", why: "モーメントのつり合いも必要" },
      { i: 2, root: "e-science-6-teko", why: "重さ×距離でつり合う、が身についていない" },
    ],
  },
  {
    unit: "h-sci-phy-undoryo",
    needs: [{ unit: "h-sci-phyb-hosoku", why: "運動方程式から力積と運動量を導く" }],
    mistakes: [
      { i: 0, root: "h-sci-phyb-undo", why: "速度に向き（正負）をつけて扱えていない" },
      { i: 1, root: "h-sci-phy-undoryo", why: "運動エネルギーが保存するのは弾性衝突だけ" },
      { i: 2, root: "h-sci-phy-undoryo", why: "N·s と kg·m/s は同じ次元" },
    ],
  },
  {
    unit: "h-sci-phy-enundo",
    needs: [
      { unit: "h-sci-phyb-hosoku", why: "運動方程式で向心力を考える" },
      { unit: "h-math-2-sankaku", why: "角速度を弧度法（rad）で表す" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phy-enundo", why: "向きが変われば加速度がある" },
      { i: 1, root: "h-sci-phy-enundo", why: "向心力は実在の力の合力" },
      { i: 2, root: "h-sci-phy-enundo", why: "遠心力は回る立場でだけ考える慣性力" },
    ],
  },
  {
    unit: "h-sci-phy-tanshindo",
    needs: [
      { unit: "h-sci-phy-enundo", why: "等速円運動の影として単振動を考える" },
      { unit: "h-sci-phyb-energy", why: "ばねの位置エネルギーとエネルギー保存を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phy-tanshindo", why: "周期は振幅によらない（等時性）" },
      { i: 1, root: "h-sci-phy-tanshindo", why: "単振り子の周期は質量によらない" },
      { i: 2, root: "h-sci-phy-tanshindo", why: "端では復元力が最大で加速度も最大" },
    ],
  },
  {
    unit: "h-sci-phy-baninryoku",
    needs: [
      { unit: "h-sci-phy-enundo", why: "万有引力を向心力として円運動を考える" },
      { unit: "h-sci-phyb-energy", why: "位置エネルギーとエネルギー保存を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phy-baninryoku", why: "万有引力は距離の2乗に反比例" },
      { i: 1, root: "h-sci-phy-baninryoku", why: "高い軌道ほど速さはおそい" },
      { i: 2, root: "h-sci-phy-baninryoku", why: "r は地球の中心からの距離" },
      { i: 3, root: "h-sci-phyb-energy", why: "mgh は地表近くだけで使える近似" },
    ],
  },
  {
    unit: "h-sci-phy-kitai",
    needs: [
      { unit: "h-sci-phy-undoryo", why: "壁への衝突を力積と運動量で考える" },
      { unit: "h-sci-phyb-netsu", why: "絶対温度と熱運動の考え方を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phyb-netsu", why: "比例は絶対温度で考える、が身についていない" },
      { i: 1, root: "h-sci-phy-kitai", why: "モル質量を kg/mol に直す" },
      { i: 2, root: "h-sci-phy-kitai", why: "同じ温度で同じなのは平均運動エネルギー" },
    ],
  },
  {
    unit: "h-sci-phy-netsurikigaku",
    needs: [{ unit: "h-sci-phy-kitai", why: "状態方程式と内部エネルギーを使う" }],
    mistakes: [
      { i: 0, root: "h-sci-phy-netsurikigaku", why: "ΔU は温度変化だけで決まる" },
      { i: 1, root: "h-sci-phy-netsurikigaku", why: "等温変化は ΔU＝0 で熱は出入りする" },
      { i: 2, root: "h-sci-phy-netsurikigaku", why: "した仕事・された仕事の符号のそろえ方" },
    ],
  },
  {
    unit: "h-sci-phy-hado",
    needs: [
      { unit: "h-sci-phyb-nami", why: "v＝fλ と重ね合わせ・定常波を使う" },
      { unit: "h-math-2-sankaku", why: "波の式を sin で表す" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phyb-nami", why: "媒質はその場で振動するだけ、が身についていない" },
      { i: 1, root: "h-sci-phyb-nami", why: "定常波の節の間隔が半波長、が身についていない" },
      { i: 2, root: "h-sci-phy-hado", why: "屈折で振動数は変わらない" },
    ],
  },
  {
    unit: "h-sci-phy-doppler",
    needs: [
      { unit: "h-sci-phy-hado", why: "波長・振動数・速さの関係を使う" },
      { unit: "h-sci-phyb-oto", why: "音の速さと高さの関係を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phy-doppler", why: "観測者が動いても波長は変わらない" },
      { i: 1, root: "h-sci-phy-doppler", why: "音速は空気に対して一定" },
      { i: 2, root: "h-sci-phy-doppler", why: "向きを決めて符号つきで代入する" },
      { i: 3, root: "h-sci-phy-doppler", why: "一定の速さなら高さも一定" },
    ],
  },
  {
    unit: "h-sci-phy-hikari",
    needs: [
      { unit: "h-sci-phy-hado", why: "干渉・回折と経路差の考え方を使う" },
      { unit: "j-sci-1-hikari", why: "反射と屈折の基本をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phy-hikari", why: "近似式から Δx＝Lλ/d を導く手順" },
      { i: 1, root: "h-sci-phy-hikari", why: "反射での位相のずれの数え方" },
      { i: 2, root: "h-sci-phy-hikari", why: "nm・mm を m に直してから代入する" },
    ],
  },
  {
    unit: "h-sci-phy-denba",
    needs: [
      { unit: "h-sci-phyb-energy", why: "位置エネルギーと仕事の関係を使う" },
      { unit: "j-sci-2-seidenki", why: "＋と−の電気が力をおよぼし合うことを使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phy-denba", why: "電場は 1/r²、電位は 1/r" },
      { i: 1, root: "h-math-c-heimen", why: "電場の合成はベクトルの和" },
      { i: 2, root: "h-sci-phy-denba", why: "負の電荷は電場と逆向きに力を受ける" },
    ],
  },
  {
    unit: "h-sci-phy-condenser",
    needs: [{ unit: "h-sci-phy-denba", why: "一様な電場と電位差 V＝Ed を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-phy-condenser", why: "電圧が0から上がるので平均で½がつく" },
      { i: 1, root: "h-sci-phy-condenser", why: "直列と並列の合成容量の求め方" },
      { i: 2, root: "h-sci-phy-condenser", why: "切り離すと電気量 Q が一定" },
      { i: 3, root: "h-sci-phy-condenser", why: "μF を F に直してから計算する" },
    ],
  },
  {
    unit: "h-sci-phy-chokuryu",
    needs: [{ unit: "h-sci-phyb-denryu", why: "オームの法則と合成抵抗を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-phy-chokuryu", why: "内部抵抗で端子電圧が下がる" },
      { i: 1, root: "h-sci-phyb-denryu", why: "並列の合成抵抗は逆数をとる、が身についていない" },
      { i: 2, root: "h-sci-phy-chokuryu", why: "1周の向きと電流の向きで符号を決める" },
    ],
  },
  {
    unit: "h-sci-phy-jiba",
    needs: [{ unit: "h-sci-phyb-koryu", why: "電流がつくる磁場と受ける力の基本を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-phy-jiba", why: "直線電流の磁場は距離に反比例" },
      { i: 1, root: "h-sci-phy-jiba", why: "ローレンツ力は速度に垂直で仕事をしない" },
      { i: 2, root: "h-sci-phyb-denryu", why: "電子は電流と逆向きに動く、が身についていない" },
    ],
  },
  {
    unit: "h-sci-phy-yudo",
    needs: [{ unit: "h-sci-phy-jiba", why: "磁場と磁束、電流が受ける力を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-phyb-koryu", why: "磁場が変化したときだけ電流が生じる" },
      { i: 1, root: "h-sci-phy-yudo", why: "巻数 N 倍の起電力になる" },
      { i: 2, root: "h-sci-phy-yudo", why: "電流が磁場から受ける力とつり合う外力" },
    ],
  },
  {
    unit: "h-sci-phy-koryu",
    needs: [
      { unit: "h-sci-phy-yudo", why: "自己誘導とコイルのはたらきを使う" },
      { unit: "h-sci-phy-condenser", why: "コンデンサーの充電・放電を使う" },
      { unit: "h-math-2-sankaku", why: "交流を sin で表し、位相を考える" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phyb-koryu", why: "100 V が実効値であることが身についていない" },
      { i: 1, root: "h-sci-phy-koryu", why: "位相のずれでインピーダンスは三平方で合成" },
      { i: 2, root: "h-sci-phy-koryu", why: "リアクタンスの周波数による変わり方" },
      { i: 3, root: "h-sci-phy-koryu", why: "位相のちがう電圧は矢印で合わせる" },
    ],
  },
  {
    unit: "h-sci-phy-denshi",
    needs: [
      { unit: "h-sci-phy-hado", why: "光の振動数と波長の関係 c＝fλ を使う" },
      { unit: "h-sci-phy-denba", why: "電位差と電子のエネルギー（eV）を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phy-denshi", why: "光子1個のエネルギーは振動数で決まる" },
      { i: 1, root: "h-sci-phy-denshi", why: "限界振動数より小さいと電子は出ない" },
      { i: 2, root: "h-sci-phy-denba", why: "eV は電荷×電位差で J に換算する" },
    ],
  },
  {
    unit: "h-sci-phy-genshi",
    needs: [
      { unit: "h-sci-phy-denshi", why: "光子のエネルギー hν を線スペクトルに使う" },
      { unit: "h-sci-phyb-riyo", why: "放射線・半減期・核分裂の基本を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-phy-genshi", why: "β崩壊は中性子が陽子に変わる" },
      { i: 1, root: "h-sci-phyb-riyo", why: "半減期ごとに½ずつ減る、が身についていない" },
      { i: 2, root: "h-sci-phy-genshi", why: "結合エネルギーの分だけ質量が小さい" },
    ],
  },

  // ───────── 化学基礎 ─────────
  {
    unit: "h-sci-chemb-bunri",
    needs: [
      { unit: "j-sci-1-jotai", why: "沸点のちがいで分ける蒸留を使う" },
      { unit: "j-sci-1-suiyoeki", why: "ろ過・再結晶と、純粋な物質と混合物を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-1-jotai", why: "蒸留ではかるのは出ていく蒸気の温度" },
      { i: 1, root: "h-sci-chemb-bunri", why: "冷却器を水で満たすための流し方" },
      { i: 2, root: "j-sci-1-suiyoeki", why: "食塩は冷やしてもほとんど出てこない" },
      { i: 3, root: "j-sci-1-suiyoeki", why: "純粋な物質と混合物の区別" },
    ],
  },
  {
    unit: "h-sci-chemb-genso",
    needs: [{ unit: "j-sci-2-genshi", why: "原子・元素記号と単体・化合物を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-chemb-genso", why: "同素体と同位体のちがい" },
      { i: 1, root: "h-sci-chemb-genso", why: "元素（成分）と単体（実物）の読み分け" },
      { i: 2, root: "h-sci-chemb-genso", why: "炎色反応でわかるのは元素の種類" },
    ],
  },
  {
    unit: "h-sci-chemb-genshi",
    needs: [
      { unit: "h-sci-chemb-genso", why: "元素と単体の区別を使う" },
      { unit: "j-sci-3-ion", why: "原子のつくり（陽子・電子）をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chemb-genshi", why: "質量数は陽子と中性子の数の和" },
      { i: 1, root: "h-sci-chemb-genshi", why: "化学的性質は電子配置で決まる" },
      { i: 2, root: "h-sci-chemb-genshi", why: "電子殻の最大数は 2n²" },
      { i: 3, root: "h-sci-chemb-genshi", why: "貴ガスは反応しにくく価電子0とする" },
    ],
  },
  {
    unit: "h-sci-chemb-ion",
    needs: [
      { unit: "h-sci-chemb-genshi", why: "電子配置と価電子を使う" },
      { unit: "j-sci-3-ion", why: "陽イオン・陰イオンと電離をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chemb-ion", why: "イオン結晶は分子をつくらない" },
      { i: 1, root: "h-sci-chemb-ion", why: "正負の電荷が打ち消し合う数の比" },
      { i: 2, root: "h-sci-chemb-ion", why: "多原子イオンはかっこでくくる" },
      { i: 3, root: "j-sci-3-ion", why: "イオンが動けると電流が流れる" },
    ],
  },
  {
    unit: "h-sci-chemb-kyoyu",
    needs: [{ unit: "h-sci-chemb-genshi", why: "価電子と電子配置を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-chemb-kyoyu", why: "分子の形で極性が打ち消し合う" },
      { i: 1, root: "h-sci-chemb-kyoyu", why: "配位結合もできれば共有結合と同じ" },
      { i: 2, root: "h-sci-chemb-kyoyu", why: "分子結晶は分子間力でまとまっている" },
    ],
  },
  {
    unit: "h-sci-chemb-kinzoku",
    needs: [
      { unit: "h-sci-chemb-genshi", why: "価電子と金属元素の位置を使う" },
      { unit: "j-sci-1-busshitsu", why: "金属に共通する性質をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chemb-kinzoku", why: "自由電子が動いて電気を通す" },
      { i: 1, root: "h-sci-chemb-kinzoku", why: "電気伝導性は銀が最大" },
      { i: 2, root: "h-sci-chemb-kinzoku", why: "水銀は常温で液体の金属" },
    ],
  },
  {
    unit: "h-sci-chemb-mol",
    needs: [
      { unit: "h-sci-chemb-genshi", why: "原子量・分子量のもとになる原子のつくり" },
      { unit: "e-math-6-hi", why: "mol・質量・個数を比例の関係で換算する" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chemb-mol", why: "1 mol は 6.0×10²³ 個の集まり" },
      { i: 1, root: "h-sci-chemb-mol", why: "22.4 L/mol は標準状態の気体だけ" },
      { i: 2, root: "h-sci-chemb-mol", why: "モル濃度は溶液全体 1 L あたり" },
    ],
  },
  {
    unit: "h-sci-chemb-hannoshiki",
    needs: [
      { unit: "h-sci-chemb-mol", why: "質量・体積を mol に直す" },
      { unit: "j-sci-2-kagaku-henka", why: "化学反応式の書き方をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-kagaku-henka", why: "化学式は変えず係数だけで数をそろえる" },
      { i: 1, root: "h-sci-chemb-mol", why: "係数は mol の比で、質量の比ではない" },
      { i: 2, root: "h-sci-chemb-hannoshiki", why: "不足するほうが生成物の量を決める" },
      { i: 3, root: "j-sci-2-shitsuryo", why: "反応の前後で質量の総和は変わらない" },
    ],
  },
  {
    unit: "h-sci-chemb-san",
    needs: [
      { unit: "j-sci-3-chuwa", why: "H⁺・OH⁻ と酸性・アルカリ性を使う" },
      { unit: "h-sci-chemb-mol", why: "モル濃度で [H⁺] を表す" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chemb-san", why: "価数と強弱（電離度）は別のもの" },
      { i: 1, root: "h-sci-chemb-san", why: "[H⁺]＝濃度×価数×電離度" },
      { i: 2, root: "h-sci-chemb-san", why: "ブレンステッドの定義で塩基を考える" },
      { i: 3, root: "h-sci-chemb-san", why: "水自身の電離で pH は7をこえない" },
    ],
  },
  {
    unit: "h-sci-chemb-chuwa",
    needs: [{ unit: "h-sci-chemb-san", why: "価数・電離度・pH を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-chemb-san", why: "硫酸が2価の酸であることの理解" },
      { i: 1, root: "h-sci-chemb-chuwa", why: "中和の量は電離度でなく価数と物質量で決まる" },
      { i: 2, root: "h-sci-chemb-chuwa", why: "塩の加水分解で液性が決まる" },
      { i: 3, root: "h-sci-chemb-chuwa", why: "塩の名前と液性は別のもの" },
    ],
  },
  {
    unit: "h-sci-chemb-sanka",
    needs: [
      { unit: "j-sci-2-kagaku-henka", why: "酸素のやりとりで見る酸化・還元を使う" },
      { unit: "h-sci-chemb-genshi", why: "電子のやりとりで酸化・還元を考える" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chemb-sanka", why: "酸化剤は相手を酸化し自分は還元される" },
      { i: 1, root: "h-sci-chemb-sanka", why: "酸化数の決め方の例外" },
      { i: 2, root: "h-sci-chemb-sanka", why: "酸化数とイオンの価数の書き方のちがい" },
    ],
  },
  {
    unit: "h-sci-chemb-denchi",
    needs: [
      { unit: "h-sci-chemb-sanka", why: "電子のやりとりで酸化・還元を考える" },
      { unit: "j-sci-3-denchi", why: "イオンへのなりやすさと電池の基本を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-seidenki", why: "電子と電流の向きが逆、が身についていない" },
      { i: 1, root: "j-sci-3-denchi", why: "イオンになりやすい金属が電子を出して−極" },
      { i: 2, root: "h-sci-chemb-denchi", why: "水素よりイオン化傾向が小さい金属" },
      { i: 3, root: "h-sci-chemb-denchi", why: "イオン化傾向が大きい金属が先にとける" },
    ],
  },

  // ───────── 化学 ─────────
  {
    unit: "h-sci-chem-jotai",
    needs: [
      { unit: "j-sci-1-jotai", why: "状態変化と粒子の並び方をもとにする" },
      { unit: "h-sci-chemb-kyoyu", why: "分子間力の考え方を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-1-jotai", why: "沸騰中は温度一定、が身についていない" },
      { i: 1, root: "e-science-4-yukue", why: "沸騰しなくても水面から蒸発する" },
      { i: 2, root: "e-science-4-sugata", why: "湯気は水蒸気が冷えた水のつぶ" },
    ],
  },
  {
    unit: "h-sci-chem-kitai",
    needs: [
      { unit: "h-sci-chemb-mol", why: "物質量 n と気体の体積を使う" },
      { unit: "h-sci-chem-jotai", why: "蒸気圧と粒子の運動を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chem-kitai", why: "比例は絶対温度で考える" },
      { i: 1, root: "h-sci-chem-jotai", why: "水蒸気圧が分圧として加わることの理解" },
      { i: 2, root: "h-sci-chem-kitai", why: "R の単位に合わせて体積を L で入れる" },
    ],
  },
  {
    unit: "h-sci-chem-yoeki",
    needs: [
      { unit: "h-sci-chemb-mol", why: "物質量とモル濃度を使う" },
      { unit: "j-sci-1-suiyoeki", why: "質量パーセント濃度と溶解度をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-1-suiyoeki", why: "濃度は溶液全体の質量で割る" },
      { i: 1, root: "j-sci-3-ion", why: "電解質は水中でイオンに分かれる" },
      { i: 2, root: "h-sci-chem-yoeki", why: "質量モル濃度は溶媒 1 kg あたり" },
      { i: 3, root: "h-sci-chem-kitai", why: "気体の式と同じく絶対温度を使う" },
    ],
  },
  {
    unit: "h-sci-chem-kesho",
    needs: [
      { unit: "h-sci-chemb-ion", why: "イオン結晶のつくりを使う" },
      { unit: "h-sci-chemb-kinzoku", why: "金属結晶のつくりを使う" },
      { unit: "h-sci-chemb-mol", why: "粒子の数と質量を mol で結ぶ" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chem-kesho", why: "頂点の粒子は 1/8 だけ単位格子に入る" },
      { i: 1, root: "j-math-3-sanheiho", why: "面の対角線の長さを三平方で出せていない" },
      { i: 2, root: "h-sci-chem-kesho", why: "体心立方格子の配位数は8" },
      { i: 3, root: "h-sci-chem-kesho", why: "長さの単位を cm にそろえてから3乗する" },
    ],
  },
  {
    unit: "h-sci-chem-energy",
    needs: [{ unit: "h-sci-chemb-hannoshiki", why: "反応式の係数と物質量を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-chem-energy", why: "発熱は系のエンタルピーが減るので負" },
      { i: 1, root: "h-sci-chemb-hannoshiki", why: "係数比で 1 mol あたりに直す" },
      { i: 2, root: "h-sci-chem-energy", why: "結合を切るのに吸収し、できると放出する" },
    ],
  },
  {
    unit: "h-sci-chem-denchi",
    needs: [{ unit: "h-sci-chemb-denchi", why: "イオン化傾向と電池の基本を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-chemb-sanka", why: "電子を失うのが酸化、が身についていない" },
      { i: 1, root: "h-sci-chem-denchi", why: "電子は導線、イオンは溶液を動く" },
      { i: 2, root: "h-sci-chem-denchi", why: "両極に PbSO₄ がつき質量が増える" },
    ],
  },
  {
    unit: "h-sci-chem-denki",
    needs: [
      { unit: "h-sci-chem-denchi", why: "電極での酸化・還元の考え方を使う" },
      { unit: "j-sci-3-ion", why: "陽イオンは陰極、陰イオンは陽極に引かれる" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chemb-sanka", why: "電子を受け取るのが還元、が身についていない" },
      { i: 1, root: "h-sci-chem-denki", why: "イオン化傾向の大きい金属は析出しない" },
      { i: 2, root: "h-sci-chemb-hannoshiki", why: "反応式の係数比で物質量を求める" },
      { i: 3, root: "h-sci-chem-denki", why: "Q＝It の t は秒で入れる" },
    ],
  },
  {
    unit: "h-sci-chem-sokudo",
    needs: [{ unit: "h-sci-chem-energy", why: "反応のエネルギーの出入りを使う" }],
    mistakes: [
      { i: 0, root: "h-sci-chem-sokudo", why: "触媒は活性化エネルギーだけを下げる" },
      { i: 1, root: "h-sci-chem-sokudo", why: "反応次数は実験で決める" },
      { i: 2, root: "h-sci-chem-sokudo", why: "温度で山をこえる分子の割合が変わる" },
    ],
  },
  {
    unit: "h-sci-chem-heiko",
    needs: [{ unit: "h-sci-chem-sokudo", why: "正反応と逆反応の速さを使う" }],
    mistakes: [
      { i: 0, root: "h-sci-chem-heiko", why: "平衡は正逆の速さがつり合った状態" },
      { i: 1, root: "h-sci-chem-heiko", why: "等しいのは速さで濃度ではない" },
      { i: 2, root: "h-sci-chem-sokudo", why: "触媒は正逆両方を同じだけ速める" },
      { i: 3, root: "h-sci-chem-heiko", why: "平衡定数を変えるのは温度だけ" },
    ],
  },
  {
    unit: "h-sci-chem-denri",
    needs: [
      { unit: "h-sci-chem-heiko", why: "平衡定数の考え方を電離に使う" },
      { unit: "h-sci-chemb-san", why: "電離度と pH の基本を使う" },
      { unit: "h-math-2-taisu", why: "pH＝−log[H⁺] の計算に対数を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chemb-san", why: "[H⁺] は濃度×電離度、が身についていない" },
      { i: 1, root: "h-sci-chemb-san", why: "水の電離で pH は7をこえない" },
      { i: 2, root: "h-sci-chemb-san", why: "価数をかけて [H⁺] を求める" },
      { i: 3, root: "h-sci-chem-denri", why: "緩衝液は弱酸とその塩でつくる" },
    ],
  },
  {
    unit: "h-sci-chem-hikinzoku",
    needs: [
      { unit: "h-sci-chemb-sanka", why: "酸化力・還元力の考え方を使う" },
      { unit: "j-sci-1-kitai", why: "気体の性質と集め方をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-1-kitai", why: "とけやすさと重さで集め方を決める" },
      { i: 1, root: "h-sci-chem-hikinzoku", why: "ハロゲンは原子番号が小さいほど酸化力が強い" },
      { i: 2, root: "h-sci-chem-hikinzoku", why: "HF は水素結合で電離しにくい弱酸" },
      { i: 3, root: "h-sci-chem-hikinzoku", why: "濃硫酸の希釈は大きな発熱に注意" },
    ],
  },
  {
    unit: "h-sci-chem-kinzoku",
    needs: [
      { unit: "h-sci-chemb-denchi", why: "イオン化傾向と金属の反応性を使う" },
      { unit: "h-sci-chemb-genshi", why: "周期表の族と価電子を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chem-kinzoku", why: "Fe²⁺ と Fe³⁺ の色の区別" },
      { i: 1, root: "h-sci-chem-kinzoku", why: "アンモニアで錯イオンをつくる金属" },
      { i: 2, root: "h-sci-chem-kinzoku", why: "不動態になる金属と酸の組み合わせ" },
      { i: 3, root: "h-sci-chemb-genso", why: "炎色反応を示す元素の覚えちがい" },
    ],
  },
  {
    unit: "h-sci-chem-yuki",
    needs: [
      { unit: "h-sci-chemb-kyoyu", why: "共有結合と構造式を使う" },
      { unit: "h-sci-chemb-mol", why: "元素分析で質量を物質量に直す" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chem-yuki", why: "つながり方が同じなら同じ物質" },
      { i: 1, root: "h-sci-chem-yuki", why: "二重結合の両側に異なる基が必要" },
      { i: 2, root: "h-sci-chem-yuki", why: "O は差し引きで求める" },
    ],
  },
  {
    unit: "h-sci-chem-shibo",
    needs: [
      { unit: "h-sci-chem-yuki", why: "官能基と構造式を使う" },
      { unit: "h-sci-chemb-sanka", why: "酸化・還元の考え方を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chem-shibo", why: "第二級アルコールはケトンになる" },
      { i: 1, root: "h-sci-chem-shibo", why: "還元性はアルデヒド基による" },
      { i: 2, root: "h-sci-chem-shibo", why: "ヨードホルム反応を示す構造の条件" },
      { i: 3, root: "h-sci-chem-shibo", why: "エステル化は縮合で可逆反応" },
    ],
  },
  {
    unit: "h-sci-chem-hokozoku",
    needs: [{ unit: "h-sci-chem-shibo", why: "官能基ごとの反応を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-chem-hokozoku", why: "ベンゼン環は安定で付加しにくい" },
      { i: 1, root: "h-sci-chemb-chuwa", why: "弱い酸でも塩基とは中和する" },
      { i: 2, root: "h-sci-chem-shibo", why: "エステル化とアセチル化の相手の区別" },
    ],
  },
  {
    unit: "h-sci-chem-tennen",
    needs: [{ unit: "h-sci-chem-shibo", why: "アルデヒドの還元性や縮合の考え方を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-chem-tennen", why: "還元性を示す構造が残るかどうか" },
      { i: 1, root: "h-sci-chem-tennen", why: "らせん構造がヨウ素デンプン反応の条件" },
      { i: 2, root: "h-sci-chem-tennen", why: "ビウレット反応はペプチド結合2つ以上" },
    ],
  },
  {
    unit: "h-sci-chem-gosei",
    needs: [
      { unit: "h-sci-chem-shibo", why: "二重結合の付加とエステル化を使う" },
      { unit: "h-sci-chem-tennen", why: "単量体がつながる高分子の考え方を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-chem-shibo", why: "エステル結合は縮合でできることの理解" },
      { i: 1, root: "h-sci-chem-gosei", why: "ナイロン66 の名前の由来" },
      { i: 2, root: "h-sci-chem-gosei", why: "熱硬化性は立体網目構造で熱に強い" },
    ],
  },

  // ───────── 生物基礎 ─────────
  {
    unit: "h-sci-biob-tayosei",
    needs: [
      { unit: "j-sci-2-saibo", why: "細胞のつくりと単細胞・多細胞を使う" },
      { unit: "j-sci-3-shinka", why: "共通の祖先から進化したことを使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-biob-tayosei", why: "菌類（酵母）と細菌のちがい" },
      { i: 1, root: "h-sci-biob-tayosei", why: "ウイルスは細胞をもたない" },
      { i: 2, root: "h-sci-biob-tayosei", why: "原核細胞は核膜がないだけで DNA をもつ" },
    ],
  },
  {
    unit: "h-sci-biob-saibo",
    needs: [
      { unit: "h-sci-biob-tayosei", why: "原核細胞と真核細胞の区別を使う" },
      { unit: "j-sci-2-saibo", why: "核・細胞膜・細胞壁・葉緑体をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-shokubutsu", why: "植物も呼吸する、が身についていない" },
      { i: 1, root: "j-sci-2-saibo", why: "細胞膜と細胞壁のはたらきの区別" },
      { i: 2, root: "h-sci-biob-saibo", why: "mm・μm・nm は千倍ずつ" },
    ],
  },
  {
    unit: "h-sci-biob-taisha",
    needs: [
      { unit: "h-sci-biob-saibo", why: "ミトコンドリアと葉緑体のはたらきを使う" },
      { unit: "j-sci-2-dobutsu", why: "消化酵素のはたらきをもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-biob-taisha", why: "酵素は触媒で反応後も変わらない" },
      { i: 1, root: "h-sci-biob-taisha", why: "酵素はタンパク質で高温で変性する" },
      { i: 2, root: "h-sci-biob-taisha", why: "高エネルギーリン酸結合の場所" },
      { i: 3, root: "j-sci-2-shokubutsu", why: "植物も昼も夜も呼吸する" },
    ],
  },
  {
    unit: "h-sci-biob-dna",
    needs: [
      { unit: "j-sci-3-iden", why: "遺伝子と、その本体が DNA であることを使う" },
      { unit: "h-sci-biob-tayosei", why: "すべての生物が DNA をもつことを使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-biob-dna", why: "DNA と RNA の糖のちがい" },
      { i: 1, root: "h-sci-biob-dna", why: "遺伝子は DNA の一部の区間" },
      { i: 2, root: "h-sci-biob-dna", why: "相補的な塩基の組み合わせ" },
      { i: 3, root: "h-sci-biob-dna", why: "ゲノムは生殖細胞の1組の情報" },
    ],
  },
  {
    unit: "h-sci-biob-bunretsu",
    needs: [
      { unit: "h-sci-biob-dna", why: "二重らせんと相補的な塩基対を使う" },
      { unit: "j-sci-3-saibo-bunretsu", why: "体細胞分裂の順序と染色体をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-biob-bunretsu", why: "DNA は間期の S 期に複製される" },
      { i: 1, root: "h-sci-biob-bunretsu", why: "半保存的複製のしくみ" },
      { i: 2, root: "h-sci-biob-bunretsu", why: "世代ごとの DNA の重さの割合の追い方" },
    ],
  },
  {
    unit: "h-sci-biob-hatsugen",
    needs: [{ unit: "h-sci-biob-dna", why: "塩基の相補性と遺伝子の考え方を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-biob-dna", why: "DNA と RNA の塩基のちがい（T と U）" },
      { i: 1, root: "h-sci-biob-saibo", why: "リボソームが細胞質にあることの理解" },
      { i: 2, root: "h-sci-biob-hatsugen", why: "遺伝情報は同じで発現がちがう" },
      { i: 3, root: "h-sci-biob-hatsugen", why: "3つの塩基で1つのアミノ酸" },
    ],
  },
  {
    unit: "h-sci-biob-taieki",
    needs: [
      { unit: "j-sci-2-dobutsu", why: "血液の循環と成分、肝臓・じん臓を使う" },
      { unit: "h-sci-biob-saibo", why: "細胞と、それをつつむ環境の考え方を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-biob-taieki", why: "組織液は細胞の外の液" },
      { i: 1, root: "h-sci-biob-taieki", why: "血液凝固はフィブリンのはたらき" },
      { i: 2, root: "e-math-5-wariai", why: "もとにする量（95%）を取りちがえている" },
      { i: 3, root: "j-sci-2-dobutsu", why: "肝臓でつくり、じん臓でこし出す分担" },
    ],
  },
  {
    unit: "h-sci-biob-shinkei",
    needs: [
      { unit: "h-sci-biob-taieki", why: "体液と体内環境の考え方を使う" },
      { unit: "j-sci-2-shigeki", why: "神経系のしくみをもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-biob-shinkei", why: "交感神経と副交感神経のはたらき" },
      { i: 1, root: "h-sci-biob-shinkei", why: "受容体をもつ標的細胞だけに作用" },
      { i: 2, root: "h-sci-biob-shinkei", why: "血糖値を上げる・下げるホルモンの区別" },
      { i: 3, root: "h-sci-biob-shinkei", why: "寒いときは熱を逃がさないしくみ" },
    ],
  },
  {
    unit: "h-sci-biob-meneki",
    needs: [{ unit: "h-sci-biob-taieki", why: "血液の成分（白血球など）を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-biob-meneki", why: "B 細胞は形質細胞になって抗体をつくる" },
      { i: 1, root: "h-sci-biob-meneki", why: "キラー T 細胞は直接攻撃する" },
      { i: 2, root: "h-sci-biob-meneki", why: "HIV はヘルパー T 細胞に感染する" },
      { i: 3, root: "h-sci-biob-meneki", why: "ワクチンと血清療法のしくみのちがい" },
    ],
  },
  {
    unit: "h-sci-biob-sento",
    needs: [{ unit: "j-sci-2-shokubutsu", why: "光合成と呼吸の関係を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-biob-sento", why: "林床が暗くなり陰樹が育つ" },
      { i: 1, root: "h-sci-biob-sento", why: "陰生植物は呼吸量が少なく補償点が低い" },
      { i: 2, root: "h-sci-biob-sento", why: "一次遷移と二次遷移の始まりのちがい" },
    ],
  },
  {
    unit: "h-sci-biob-biome",
    needs: [{ unit: "h-sci-biob-sento", why: "遷移と極相の考え方を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-biob-biome", why: "照葉樹林と夏緑樹林のちがい" },
      { i: 1, root: "h-sci-biob-biome", why: "日本は降水量が多く森林になる" },
      { i: 2, root: "h-sci-biob-biome", why: "森林限界より上には高木が育たない" },
      { i: 3, root: "h-sci-biob-biome", why: "ツンドラは低温でできる荒原" },
    ],
  },
  {
    unit: "h-sci-biob-seitaikei",
    needs: [
      { unit: "j-sci-3-seitaikei", why: "食物連鎖と炭素の循環をもとにする" },
      { unit: "h-sci-biob-taisha", why: "光合成と呼吸のエネルギーを使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-biob-seitaikei", why: "エネルギーは熱として出ていき循環しない" },
      { i: 1, root: "j-sci-3-seitaikei", why: "生産者も呼吸する、が身についていない" },
      { i: 2, root: "h-sci-biob-seitaikei", why: "植物は窒素をイオンの形で吸収する" },
    ],
  },
  {
    unit: "h-sci-biob-hozen",
    needs: [{ unit: "h-sci-biob-seitaikei", why: "食物網と物質循環を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-biob-hozen", why: "外来生物は人が持ちこんだ生物" },
      { i: 1, root: "h-sci-biob-hozen", why: "富栄養化で酸素不足が起こるしくみ" },
      { i: 2, root: "j-sci-3-seitaikei", why: "上の栄養段階ほど多く食べて濃縮される" },
    ],
  },

  // ───────── 生物 ─────────
  {
    unit: "h-sci-bio-shinka",
    needs: [
      { unit: "j-sci-3-shinka", why: "進化と自然選択の基本をもとにする" },
      { unit: "h-sci-biob-dna", why: "遺伝子と DNA の変化を使う" },
      { unit: "h-sci-biob-saibo", why: "ミトコンドリアと葉緑体のつくりを使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-shinka", why: "進化は目的に向かうものではない" },
      { i: 1, root: "j-sci-3-shinka", why: "進化は世代をこえた集団の変化" },
      { i: 2, root: "h-sci-biob-saibo", why: "細胞小器官それぞれの起源" },
      { i: 3, root: "j-math-3-tenkai", why: "(p＋q)² の展開で 2pq が出せていない" },
    ],
  },
  {
    unit: "h-sci-bio-keito",
    needs: [
      { unit: "h-sci-bio-shinka", why: "進化と共通祖先の考え方を使う" },
      { unit: "j-sci-1-dobutsu-bunrui", why: "特徴で生物をなかま分けする方法を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-biob-tayosei", why: "菌類と植物のちがいがあいまい" },
      { i: 1, root: "h-sci-bio-keito", why: "3ドメイン説での系統関係" },
      { i: 2, root: "h-sci-bio-keito", why: "二名法は属名と種小名" },
    ],
  },
  {
    unit: "h-sci-bio-tanpaku",
    needs: [
      { unit: "h-sci-biob-hatsugen", why: "アミノ酸の並びが遺伝子で決まることを使う" },
      { unit: "h-sci-biob-taisha", why: "酵素のはたらきと最適温度をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-bio-tanpaku", why: "変性で変わるのは立体構造" },
      { i: 1, root: "h-sci-biob-taisha", why: "最適温度をこえると変性する" },
      { i: 2, root: "h-sci-bio-tanpaku", why: "ペプチド結合は脱水縮合" },
    ],
  },
  {
    unit: "h-sci-bio-kokyu",
    needs: [{ unit: "h-sci-biob-taisha", why: "ATP と酵素、呼吸の全体像を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-bio-kokyu", why: "解糖系は細胞質基質で行われる" },
      { i: 1, root: "h-sci-bio-kokyu", why: "酸素は電子伝達系の最後で使われる" },
      { i: 2, root: "h-sci-bio-kokyu", why: "ATP の大部分は電子伝達系でできる" },
      { i: 3, root: "h-sci-bio-kokyu", why: "発酵は解糖系だけで ATP が少ない" },
    ],
  },
  {
    unit: "h-sci-bio-kogosei",
    needs: [
      { unit: "h-sci-bio-kokyu", why: "電子伝達系と ATP 合成のしくみを使う" },
      { unit: "h-sci-biob-taisha", why: "光合成の全体像と葉緑体を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-bio-kogosei", why: "O₂ は水の分解で生じる" },
      { i: 1, root: "h-sci-bio-kogosei", why: "カルビン回路は光の反応の産物を使う" },
      { i: 2, root: "j-sci-2-shokubutsu", why: "光合成と呼吸が同時に起こっていることの理解" },
    ],
  },
  {
    unit: "h-sci-bio-chosetsu",
    needs: [
      { unit: "h-sci-biob-hatsugen", why: "転写と翻訳のしくみを使う" },
      { unit: "h-sci-bio-tanpaku", why: "調節タンパク質のはたらきを使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-bio-chosetsu", why: "リプレッサーはオペレーターに結合" },
      { i: 1, root: "h-sci-bio-chosetsu", why: "誘導物質はリプレッサーに結合する" },
      { i: 2, root: "h-sci-bio-chosetsu", why: "選択的スプライシングのしくみ" },
    ],
  },
  {
    unit: "h-sci-bio-biotech",
    needs: [
      { unit: "h-sci-bio-chosetsu", why: "遺伝子の発現のしくみを使う" },
      { unit: "h-sci-biob-bunretsu", why: "DNA の複製のしくみを PCR に使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-bio-biotech", why: "短い断片ほどゲルの中を速く動く" },
      { i: 1, root: "h-sci-bio-biotech", why: "DNA は負に帯電し陽極へ動く" },
      { i: 2, root: "h-sci-bio-tanpaku", why: "酵素は高温で変性する、が身についていない" },
      { i: 3, root: "h-sci-bio-biotech", why: "制限酵素は特定の配列を切る" },
    ],
  },
  {
    unit: "h-sci-bio-genbun",
    needs: [
      { unit: "j-sci-3-iden", why: "減数分裂と遺伝の規則性をもとにする" },
      { unit: "h-sci-biob-bunretsu", why: "DNA の複製と体細胞分裂を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-bio-genbun", why: "第一分裂で相同染色体が分かれる" },
      { i: 1, root: "h-sci-biob-bunretsu", why: "DNA の複製は間期に1回、の理解" },
      { i: 2, root: "h-sci-bio-genbun", why: "乗換えで連鎖遺伝子も組換わる" },
      { i: 3, root: "e-math-5-wariai", why: "割合は全体をもとにする量にする" },
    ],
  },
  {
    unit: "h-sci-bio-dobutsu-hassei",
    needs: [
      { unit: "h-sci-bio-chosetsu", why: "遺伝子の発現調節で分化を考える" },
      { unit: "j-sci-3-saibo-bunretsu", why: "受精卵から体ができる発生の基本を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-bio-dobutsu-hassei", why: "卵割は成長せずに分裂する" },
      { i: 1, root: "h-sci-bio-dobutsu-hassei", why: "神経管は外胚葉からできる" },
      { i: 2, root: "h-sci-bio-dobutsu-hassei", why: "形成体は接する細胞を誘導する" },
    ],
  },
  {
    unit: "h-sci-bio-shokubutsu-hassei",
    needs: [
      { unit: "h-sci-bio-genbun", why: "減数分裂と核相を使う" },
      { unit: "j-sci-1-shokubutsu-bunrui", why: "花のつくりと胚珠・子房をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-bio-genbun", why: "核相 n・2n の考え方があいまい" },
      { i: 1, root: "h-sci-bio-shokubutsu-hassei", why: "花粉管の中の精細胞が受精する" },
      { i: 2, root: "h-sci-bio-shokubutsu-hassei", why: "4つのうち3つは退化する" },
      { i: 3, root: "h-sci-bio-shokubutsu-hassei", why: "ABC モデルの A と C の関係" },
    ],
  },
  {
    unit: "h-sci-bio-juyo",
    needs: [
      { unit: "h-sci-biob-shinkei", why: "神経系と自律神経の基本を使う" },
      { unit: "j-sci-2-shigeki", why: "感覚器官から効果器への流れを使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-bio-juyo", why: "活動電位は全か無かで大きさ一定" },
      { i: 1, root: "h-sci-bio-juyo", why: "シナプスでの伝達は一方向" },
      { i: 2, root: "h-sci-bio-juyo", why: "静止電位では内側が負" },
    ],
  },
  {
    unit: "h-sci-bio-kodo",
    needs: [{ unit: "h-sci-bio-juyo", why: "神経とシナプスのしくみを使う" }],
    mistakes: [
      { i: 0, root: "h-sci-bio-juyo", why: "シナプスの伝達の変化が学習になる" },
      { i: 1, root: "h-sci-bio-kodo", why: "刻印づけは限られた時期に起こる" },
      { i: 2, root: "h-sci-bio-kodo", why: "8の字ダンスは鉛直上向きが太陽" },
    ],
  },
  {
    unit: "h-sci-bio-oto",
    needs: [
      { unit: "j-sci-2-shokubutsu", why: "気孔や蒸散など植物のつくりを使う" },
      { unit: "h-sci-biob-shinkei", why: "ホルモンが受容体で信号を伝えるしくみ" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-bio-oto", why: "オーキシンは光の反対側へ移動する" },
      { i: 1, root: "h-sci-bio-oto", why: "花芽形成は連続した暗期の長さで決まる" },
      { i: 2, root: "h-sci-bio-oto", why: "最後に当てた光で発芽が決まる" },
      { i: 3, root: "h-sci-bio-oto", why: "器官で最適なオーキシン濃度がちがう" },
    ],
  },
  {
    unit: "h-sci-bio-kotaigun",
    needs: [
      { unit: "h-sci-biob-seitaikei", why: "生態系と生物どうしの関係を使う" },
      { unit: "e-math-6-hi", why: "標識再捕法は比の関係で個体数を出す" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-hi", why: "等しい比を正しく立てられていない" },
      { i: 1, root: "h-sci-bio-kotaigun", why: "環境収容力で個体数が頭打ちになる" },
      { i: 2, root: "h-sci-bio-kotaigun", why: "生存曲線の型の読み方" },
    ],
  },
  {
    unit: "h-sci-bio-seitaikei",
    needs: [
      { unit: "h-sci-biob-seitaikei", why: "物質循環とエネルギーの流れの基本を使う" },
      { unit: "h-sci-bio-kogosei", why: "光合成と呼吸の速度の関係を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-bio-seitaikei", why: "純生産量は総生産量から呼吸量を引く" },
      { i: 1, root: "h-sci-biob-seitaikei", why: "エネルギーは循環しない、が身についていない" },
      { i: 2, root: "h-sci-bio-seitaikei", why: "同化量は不消化排出量を引いた分" },
      { i: 3, root: "h-sci-biob-seitaikei", why: "植物は窒素をイオンで吸収する" },
    ],
  },

  // ───────── 地学基礎 ─────────
  {
    unit: "h-sci-earthb-katachi",
    needs: [
      { unit: "j-sci-3-tentai", why: "太陽の南中高度と緯度の関係を使う" },
      { unit: "j-math-1-heimen", why: "おうぎ形の弧の長さは中心角に比例" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-earthb-katachi", why: "自転で赤道方向にふくらむ" },
      { i: 1, root: "h-sci-earthb-katachi", why: "極付近は曲がり方がゆるく1°が長い" },
      { i: 2, root: "j-math-2-heiko-godo", why: "平行線の錯角が等しいことが使えていない" },
    ],
  },
  {
    unit: "h-sci-earthb-naibu",
    needs: [
      { unit: "j-sci-1-jishin", why: "地震波の伝わり方をもとにする" },
      { unit: "j-sci-1-kazan", why: "マグマと岩石の基本をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-earthb-naibu", why: "マントルはほぼ固体の岩石" },
      { i: 1, root: "h-sci-earthb-naibu", why: "プレートはリソスフェア" },
      { i: 2, root: "h-sci-earthb-naibu", why: "外核は液体、内核は固体" },
    ],
  },
  {
    unit: "h-sci-earthb-plate",
    needs: [{ unit: "h-sci-earthb-naibu", why: "リソスフェアとアセノスフェアを使う" }],
    mistakes: [
      { i: 0, root: "h-sci-earthb-naibu", why: "アセノスフェアもほぼ固体、の理解" },
      { i: 1, root: "h-sci-earthb-plate", why: "海嶺で生まれ海溝で沈みこむ" },
      { i: 2, root: "h-sci-earthb-plate", why: "海洋底は沈みこむので若い" },
      { i: 3, root: "h-sci-earthb-plate", why: "大陸移動説が受け入れられなかった理由" },
    ],
  },
  {
    unit: "h-sci-earthb-jishin",
    needs: [
      { unit: "j-sci-1-jishin", why: "P波・S波と初期微動継続時間を使う" },
      { unit: "h-sci-earthb-plate", why: "プレート境界で地震が起こるしくみ" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-1-jishin", why: "震度とマグニチュードのちがい" },
      { i: 1, root: "h-sci-earthb-jishin", why: "M が2大きいとエネルギーは1000倍" },
      { i: 2, root: "j-sci-1-jishin", why: "震源と震央の区別" },
    ],
  },
  {
    unit: "h-sci-earthb-kazan",
    needs: [
      { unit: "j-sci-1-kazan", why: "ねばりけと火山の形、火成岩の基本を使う" },
      { unit: "h-sci-earthb-plate", why: "プレート境界でマグマができるしくみ" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-1-kazan", why: "白っぽい岩石は無色鉱物が多い" },
      { i: 1, root: "j-sci-1-kazan", why: "斑状組織と等粒状組織のでき方" },
      { i: 2, root: "j-sci-1-kazan", why: "ねばりけが強いほど爆発的" },
      { i: 3, root: "h-sci-earthb-kazan", why: "部分融解でマグマができる" },
    ],
  },
  {
    unit: "h-sci-earthb-chiso",
    needs: [{ unit: "j-sci-1-chiso", why: "地層のでき方・堆積岩・化石をもとにする" }],
    mistakes: [
      { i: 0, root: "j-sci-1-chiso", why: "下ほど古いのは逆転していない場合" },
      { i: 1, root: "j-sci-1-chiso", why: "大きな粒ほど河口の近くに積もる" },
      { i: 2, root: "j-sci-1-chiso", why: "石灰岩とチャートの見分け方" },
    ],
  },
  {
    unit: "h-sci-earthb-rekishi",
    needs: [
      { unit: "h-sci-earthb-chiso", why: "地層の新旧と対比を使う" },
      { unit: "j-sci-3-shinka", why: "生物の進化の順をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-1-chiso", why: "示相化石と示準化石のちがい" },
      { i: 1, root: "h-sci-earthb-rekishi", why: "示準化石の条件（短く広く）" },
      { i: 2, root: "h-sci-earthb-rekishi", why: "地質時代の区切りと生物" },
      { i: 3, root: "h-sci-earthb-rekishi", why: "先カンブリア時代の長さ" },
    ],
  },
  {
    unit: "h-sci-earthb-taiki",
    needs: [
      { unit: "j-sci-2-tenki", why: "上昇気流と雲のでき方を使う" },
      { unit: "j-sci-2-kisho", why: "気圧と大気の重さを使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-earthb-taiki", why: "気温の変わり方で層を分ける" },
      { i: 1, root: "h-sci-earthb-taiki", why: "オゾンが紫外線を吸収して温める" },
      { i: 2, root: "h-sci-earthb-taiki", why: "天気の変化は対流圏で起こる" },
      { i: 3, root: "h-sci-earthb-taiki", why: "大気の厚さを地球の半径と比べる" },
      { i: 4, root: "h-sci-earthb-taiki", why: "温室効果ガスは地表からの赤外線を吸収する" },
    ],
  },
  {
    unit: "h-sci-earthb-junkan",
    needs: [
      { unit: "h-sci-earthb-taiki", why: "大気の構造と熱の出入りを使う" },
      { unit: "j-sci-2-nihon-kisho", why: "偏西風や季節風の基本をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-kisho", why: "風の名はふいてくる方向で表す" },
      { i: 1, root: "h-sci-earthb-junkan", why: "表層の海流は風が動かす" },
      { i: 2, root: "h-sci-earthb-junkan", why: "エルニーニョは東太平洋が高温" },
      { i: 3, root: "j-sci-2-tenki", why: "下降気流では雲ができにくい" },
    ],
  },
  {
    unit: "h-sci-earthb-uchu",
    needs: [{ unit: "j-sci-3-taiyokei", why: "太陽と銀河系の基本をもとにする" }],
    mistakes: [
      { i: 0, root: "h-sci-earthb-uchu", why: "空間そのものの膨張という考え方" },
      { i: 1, root: "h-sci-earthb-uchu", why: "太陽は核融合で光っている" },
      { i: 2, root: "j-sci-3-taiyokei", why: "黒点は周りより低温なだけ" },
      { i: 3, root: "h-sci-earthb-uchu", why: "宇宙の晴れ上がりの意味" },
    ],
  },
  {
    unit: "h-sci-earthb-taiyokei",
    needs: [
      { unit: "j-sci-3-taiyokei", why: "惑星の種類と特徴をもとにする" },
      { unit: "h-sci-earthb-uchu", why: "太陽と元素の誕生を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-taiyokei", why: "木星型惑星は大きいが密度が小さい" },
      { i: 1, root: "h-sci-earthb-taiyokei", why: "小惑星帯は火星と木星の間" },
      { i: 2, root: "h-sci-earthb-taiyokei", why: "冥王星は準惑星" },
      { i: 3, root: "h-sci-earthb-taiyokei", why: "彗星の尾は太陽と反対側" },
    ],
  },
  {
    unit: "h-sci-earthb-saigai",
    needs: [
      { unit: "h-sci-earthb-jishin", why: "地震と津波のしくみを使う" },
      { unit: "h-sci-earthb-kazan", why: "噴火と火山の災害のしくみを使う" },
      { unit: "j-sci-2-nihon-kisho", why: "台風や季節の気象をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-earthb-saigai", why: "津波は何度もくり返し押し寄せる" },
      { i: 1, root: "h-sci-earthb-saigai", why: "浅くなると津波は遅く高くなる" },
      { i: 2, root: "h-sci-earthb-jishin", why: "P波とS波の到着の差を使うしくみ" },
      { i: 3, root: "h-sci-earthb-saigai", why: "高潮と津波の原因のちがい" },
    ],
  },

  // ───────── 地学 ─────────
  {
    unit: "h-sci-earth-kozo",
    needs: [
      { unit: "h-sci-earthb-naibu", why: "地球の層構造の基本を使う" },
      { unit: "j-sci-2-jikai", why: "磁界と磁力線、電流がつくる磁界を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-earthb-naibu", why: "外核は液体、内核は固体" },
      { i: 1, root: "h-sci-earthb-naibu", why: "マントルは固体の岩石" },
      { i: 2, root: "h-sci-earth-kozo", why: "伏角は高緯度ほど大きい" },
      { i: 3, root: "h-sci-earth-kozo", why: "磁北と真北のずれが偏角" },
    ],
  },
  {
    unit: "h-sci-earth-plate",
    needs: [
      { unit: "h-sci-earthb-plate", why: "プレートの動きと境界の基本を使う" },
      { unit: "h-sci-earth-kozo", why: "地球の層構造と地磁気の逆転を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-earthb-naibu", why: "プレートはリソスフェア" },
      { i: 1, root: "h-sci-earthb-plate", why: "海嶺で生まれ海溝で沈みこむ" },
      { i: 2, root: "h-sci-earthb-plate", why: "大陸移動説が受け入れられなかった理由" },
      { i: 3, root: "h-sci-earth-plate", why: "火山前線の位置が決まるしくみ" },
      { i: 4, root: "h-sci-earth-plate", why: "スラブ引っぱり力がおもな原動力" },
    ],
  },
  {
    unit: "h-sci-earth-henseki",
    needs: [
      { unit: "h-sci-earthb-jishin", why: "P波・S波と大森公式の基本を使う" },
      { unit: "h-sci-earth-kozo", why: "地球の層構造と核の性質を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-earth-henseki", why: "変成岩はとけずに変わる" },
      { i: 1, root: "h-sci-earth-kozo", why: "外核で S 波が通らず P 波が屈折する" },
      { i: 2, root: "h-sci-earth-henseki", why: "k は波の速さで決まる" },
    ],
  },
  {
    unit: "h-sci-earth-kobutsu",
    needs: [{ unit: "h-sci-earthb-kazan", why: "火成岩の分類とマグマを使う" }],
    mistakes: [
      { i: 0, root: "h-sci-earth-kobutsu", why: "色指数は体積の割合" },
      { i: 1, root: "h-sci-earthb-kazan", why: "冷え方で深成岩と火山岩に分かれる" },
      { i: 2, root: "h-sci-earth-kobutsu", why: "多形と固溶体のちがい" },
      { i: 3, root: "j-sci-1-kazan", why: "無色鉱物と有色鉱物の区別" },
    ],
  },
  {
    unit: "h-sci-earth-chishi",
    needs: [
      { unit: "h-sci-earthb-chiso", why: "地層の新旧・しゅう曲・断層を使う" },
      { unit: "h-sci-earthb-rekishi", why: "化石と放射性同位体の年代を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-earthb-chiso", why: "逆転を級化層理などで確かめる" },
      { i: 1, root: "h-sci-earth-chishi", why: "背斜・向斜の中心に出る地層" },
      { i: 2, root: "h-sci-earth-chishi", why: "力の向きと断層の種類" },
      { i: 3, root: "h-sci-earthb-rekishi", why: "半減期ごとに½ずつ減る" },
    ],
  },
  {
    unit: "h-sci-earth-koseibutsu",
    needs: [{ unit: "h-sci-earthb-rekishi", why: "地質時代と示準化石を使う" }],
    mistakes: [
      { i: 0, root: "h-sci-earthb-rekishi", why: "恐竜は中生代の終わりに絶滅" },
      { i: 1, root: "h-sci-earth-koseibutsu", why: "生命は海で生まれ陸へ進出した" },
      { i: 2, root: "h-sci-earth-koseibutsu", why: "大量絶滅ごとの原因のちがい" },
    ],
  },
  {
    unit: "h-sci-earth-taiki",
    needs: [
      { unit: "h-sci-earthb-taiki", why: "大気の層構造と気温の変化を使う" },
      { unit: "h-sci-earthb-junkan", why: "大気の大循環の基本を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-earth-taiki", why: "雲ができると凝結熱で冷え方がゆるむ" },
      { i: 1, root: "h-sci-earth-taiki", why: "風上で水分を落として風下で乾く" },
      { i: 2, root: "h-sci-earth-taiki", why: "地上では摩擦力が加わる" },
      { i: 3, root: "h-sci-earth-taiki", why: "転向力の向きは南北の半球で逆" },
    ],
  },
  {
    unit: "h-sci-earth-kisho",
    needs: [
      { unit: "h-sci-earth-taiki", why: "大気の安定・不安定と風を使う" },
      { unit: "j-sci-2-nihon-kisho", why: "日本の気団と季節の天気をもとにする" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-2-nihon-kisho", why: "乾いた風が日本海で水蒸気をもらう" },
      { i: 1, root: "j-sci-2-tenki", why: "前線の種類のちがいがあいまい" },
      { i: 2, root: "j-sci-2-nihon-kisho", why: "台風は前線をともなわない" },
    ],
  },
  {
    unit: "h-sci-earth-kaiyo",
    needs: [
      { unit: "h-sci-earthb-junkan", why: "表層の海流と深層循環の基本を使う" },
      { unit: "h-sci-earth-taiki", why: "転向力で運ばれる向きが曲がる" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-earth-kaiyo", why: "塩類の組成比はほぼ一定" },
      { i: 1, root: "h-sci-earth-taiki", why: "転向力で右へそれる、が身についていない" },
      { i: 2, root: "h-sci-earth-kaiyo", why: "沿岸湧昇のしくみ" },
      { i: 3, root: "h-sci-earthb-saigai", why: "津波は深い所で速く、浅い所で高い" },
    ],
  },
  {
    unit: "h-sci-earth-wakusei",
    needs: [
      { unit: "j-sci-3-taiyokei", why: "内惑星・外惑星の見え方をもとにする" },
      { unit: "h-sci-earthb-taiyokei", why: "太陽系の惑星の並びと特徴を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-3-taiyokei", why: "金星は夕方か明け方にしか見えない" },
      { i: 1, root: "h-sci-earth-wakusei", why: "逆行は地球が追いこすときの見かけ" },
      { i: 2, root: "h-sci-earth-wakusei", why: "周期の2乗が長半径の3乗に比例" },
      { i: 3, root: "h-sci-earth-wakusei", why: "会合周期は公転周期の差で決まる" },
    ],
  },
  {
    unit: "h-sci-earth-kosei",
    needs: [
      { unit: "h-sci-earthb-uchu", why: "太陽のエネルギーと恒星の基本を使う" },
      { unit: "h-math-2-shisu", why: "5等級差で100倍＝1等級で約2.5倍" },
    ],
    mistakes: [
      { i: 0, root: "h-math-2-shisu", why: "かけ算で増える量（指数）の考え方が弱い" },
      { i: 1, root: "h-sci-earth-kosei", why: "表面温度と色の関係" },
      { i: 2, root: "h-sci-earth-kosei", why: "重い星ほど燃料を速く使う" },
      { i: 3, root: "h-sci-earth-kosei", why: "見かけの等級と絶対等級のちがい" },
    ],
  },
  {
    unit: "h-sci-earth-ginga",
    needs: [
      { unit: "h-sci-earth-kosei", why: "恒星の性質と一生を使う" },
      { unit: "h-sci-earthb-uchu", why: "宇宙の膨張とビッグバンの基本を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-sci-earth-ginga", why: "天の川は銀河系の円盤を内から見た姿" },
      { i: 1, root: "h-sci-earthb-uchu", why: "空間そのものが膨張する考え方" },
      { i: 2, root: "h-sci-earth-ginga", why: "球状星団はハローの古い星の集団" },
      { i: 3, root: "h-sci-earth-ginga", why: "近くの銀河は重力で近づくこともある" },
    ],
  },
];
