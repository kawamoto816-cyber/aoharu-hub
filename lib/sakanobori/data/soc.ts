import type { PrereqUnit } from "../types";

// 小学校社会（3〜6年）と中学社会（地理・歴史・公民）の前提の地図。
export const PREREQ_SOC: PrereqUnit[] = [
  // ───────── 小3 ─────────
  {
    unit: "e-social-3-chizu",
    needs: [],
    mistakes: [
      { i: 0, root: "e-social-3-chizu", why: "地図は上が北という決まりがまだ身についていない" },
      { i: 1, root: "e-social-3-chizu", why: "方位磁針の色のついた針が北を指すことの理解不足" },
      { i: 2, root: "e-social-3-chizu", why: "地図記号を、もとになった形と結びつけて覚えていない" },
    ],
  },
  {
    unit: "e-social-3-machi",
    needs: [{ unit: "e-social-3-chizu", why: "方位と地図記号で、どこに何があるかを読みとる" }],
    mistakes: [
      { i: 0, root: "e-social-3-machi", why: "土地の使われ方を、場所ごとにくらべていない" },
      { i: 1, root: "e-social-3-machi", why: "交通と店の集まり方のつながりの理解不足" },
      { i: 2, root: "e-social-3-machi", why: "公共施設が市のものだという理解がまだ弱い" },
    ],
  },
  {
    unit: "e-social-3-seisan",
    needs: [{ unit: "e-social-3-machi", why: "市のどこに田畑や工場があるかを知っておく" }],
    mistakes: [
      { i: 0, root: "e-social-3-seisan", why: "農家の1年の仕事を、季節ごとに見ていない" },
      { i: 1, root: "e-social-3-seisan", why: "工場で人がする仕事の理解がまだ弱い" },
      { i: 2, root: "e-social-3-seisan", why: "作った物が市の外へ運ばれる流れの理解不足" },
    ],
  },
  {
    unit: "e-social-3-mise",
    needs: [{ unit: "e-social-3-machi", why: "店が集まる場所と交通のつながりを知っておく" }],
    mistakes: [
      { i: 0, root: "e-social-3-mise", why: "品物の産地を調べて、来た所を確かめていない" },
      { i: 1, root: "e-social-3-mise", why: "店の中の見えない仕事の理解がまだ弱い" },
      { i: 2, root: "e-social-3-mise", why: "お客を呼ぶ店の工夫の理解不足" },
    ],
  },
  {
    unit: "e-social-3-shobo",
    needs: [{ unit: "e-social-3-machi", why: "消防署など、市の公共施設の場所と役わりを知る" }],
    mistakes: [
      { i: 0, root: "e-social-3-shobo", why: "通信指令室が連絡の中心になるしくみの理解不足" },
      { i: 1, root: "e-social-3-shobo", why: "多くの機関が協力するつながりの理解がまだ弱い" },
      { i: 2, root: "e-social-3-shobo", why: "消防署の人の24時間の備えの理解不足" },
    ],
  },
  {
    unit: "e-social-3-keisatsu",
    needs: [{ unit: "e-social-3-shobo", why: "119番のしくみを知ると、110番との共通点がわかる" }],
    mistakes: [
      { i: 0, root: "e-social-3-shobo", why: "119番が火事・救急の番号だと身についていない" },
      { i: 1, root: "e-social-3-keisatsu", why: "交番が交代で24時間守るしくみの理解不足" },
      { i: 2, root: "e-social-3-keisatsu", why: "地域の人も安全を守っていることの理解不足" },
    ],
  },
  {
    unit: "e-social-3-utsurikawari",
    needs: [{ unit: "e-social-3-machi", why: "今の市の様子を知って、昔とくらべる" }],
    mistakes: [
      { i: 0, root: "e-social-3-utsurikawari", why: "年号の順（昭和→平成→令和）がまだ身についていない" },
      { i: 1, root: "e-social-3-utsurikawari", why: "長い時間で少しずつ変わる見方がまだ弱い" },
      { i: 2, root: "e-social-3-utsurikawari", why: "人口のグラフから増減を読みとっていない" },
    ],
  },

  // ───────── 小4 ─────────
  {
    unit: "e-social-4-todofuken",
    needs: [{ unit: "e-social-3-chizu", why: "方位を使って、北から順に地方をたどる" }],
    mistakes: [
      { i: 0, root: "e-social-4-todofuken", why: "1都1道2府43県の区別がまだ身についていない" },
      { i: 1, root: "e-social-4-todofuken", why: "8つの地方の分け方の理解不足" },
      { i: 2, root: "e-social-4-todofuken", why: "県名と県庁所在地の名前を分けて覚えていない" },
    ],
  },
  {
    unit: "e-social-4-ken",
    needs: [
      { unit: "e-social-4-todofuken", why: "自分の県が日本のどこにあるかを知っておく" },
      { unit: "e-social-3-machi", why: "土地の使われ方と交通を地図で見る方法を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-social-4-ken", why: "土地の高さと使われ方のつながりの理解不足" },
      { i: 1, root: "e-social-3-machi", why: "交通の集まる所に人や店が集まることの理解不足" },
      { i: 2, root: "e-social-4-ken", why: "何まいもの地図を重ねて読む方法がまだ弱い" },
    ],
  },
  {
    unit: "e-social-4-mizu",
    needs: [
      { unit: "e-social-4-ken", why: "県の山・川・ダムの位置から水の通り道をたどる" },
      { unit: "e-science-4-yukue", why: "自然の中の水のめぐりを知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-4-mizu", why: "浄水場で水をきれいにする流れの理解不足" },
      { i: 1, root: "e-social-4-mizu", why: "浄水場と下水処理場の役わりの区別がまだ弱い" },
      { i: 2, root: "e-social-4-mizu", why: "森林が雨水をたくわえるはたらきの理解不足" },
    ],
  },
  {
    unit: "e-social-4-gomi",
    needs: [{ unit: "e-social-3-machi", why: "清掃工場など、市の公共施設の役わりを知る" }],
    mistakes: [
      { i: 0, root: "e-social-4-gomi", why: "清掃工場で灰が残り、うめ立てる流れの理解不足" },
      { i: 1, root: "e-social-4-gomi", why: "3Rのそれぞれの意味の区別がまだ弱い" },
      { i: 2, root: "e-social-4-gomi", why: "ごみの処理は市町村の仕事だという理解不足" },
    ],
  },
  {
    unit: "e-social-4-saigai",
    needs: [
      { unit: "e-social-4-ken", why: "県の地形から、起こりやすい災害を考える" },
      { unit: "e-social-3-chizu", why: "ハザードマップを地図として読みとる" },
    ],
    mistakes: [
      { i: 0, root: "e-social-4-saigai", why: "自助・共助・公助の3つの力の理解不足" },
      { i: 1, root: "e-social-4-saigai", why: "ハザードマップを前もって使う意味の理解不足" },
      { i: 2, root: "e-social-4-saigai", why: "防災の日と関東大震災の結びつきの理解不足" },
    ],
  },
  {
    unit: "e-social-4-dento",
    needs: [{ unit: "e-social-3-utsurikawari", why: "昔から今への移り変わりを年代で見る" }],
    mistakes: [
      { i: 0, root: "e-social-4-dento", why: "行事にこめられた願いの理解がまだ弱い" },
      { i: 1, root: "e-social-4-dento", why: "受けつぐ人の努力で伝統が残ることの理解不足" },
      { i: 2, root: "e-social-4-dento", why: "芸能なども文化財になることの理解不足" },
    ],
  },
  {
    unit: "e-social-4-senjin",
    needs: [
      { unit: "e-social-4-ken", why: "県の地形や川から、昔のこまりごとを考える" },
      { unit: "e-social-3-utsurikawari", why: "年代をさかのぼって、昔と今をくらべる" },
    ],
    mistakes: [
      { i: 0, root: "e-social-4-senjin", why: "用水が人の手でつくった水路だという理解不足" },
      { i: 1, root: "e-social-4-senjin", why: "地域の人が力を合わせた工事の理解不足" },
      { i: 2, root: "e-social-4-senjin", why: "今も使われる用水や堤防の理解不足" },
    ],
  },
  {
    unit: "e-social-4-tokushoku",
    needs: [
      { unit: "e-social-4-ken", why: "県内の地域の位置と地形を知っておく" },
      { unit: "e-social-4-dento", why: "受けつがれてきたわざや文化を知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-4-tokushoku", why: "地場産業が地域のわざを生かすことの理解不足" },
      { i: 1, root: "e-social-4-tokushoku", why: "姉妹都市が外国の都市との関係だという理解不足" },
      { i: 2, root: "e-social-4-tokushoku", why: "観光のよい面と課題の両方を見ていない" },
    ],
  },

  // ───────── 小5 ─────────
  {
    unit: "e-social-5-sekai",
    needs: [
      { unit: "e-social-4-todofuken", why: "日本の地方と都道府県の位置を知っておく" },
      { unit: "e-social-3-chizu", why: "方位を使って、国や大陸の位置を言い表す" },
      { unit: "e-math-4-kaku", why: "緯度・経度は、角の大きさの「度」で表す" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-sekai", why: "地球の陸と海の割合の理解不足" },
      { i: 1, root: "e-social-5-sekai", why: "経度0度の線がロンドンを通ることの理解不足" },
      { i: 2, root: "e-social-5-sekai", why: "領海と排他的経済水域の区別がまだ弱い" },
      { i: 3, root: "e-social-5-sekai", why: "日本が南北に長いことの理解不足" },
    ],
  },
  {
    unit: "e-social-5-chikei",
    needs: [
      { unit: "e-social-5-sekai", why: "日本の国土の位置と広がりを知っておく" },
      { unit: "e-social-4-ken", why: "山地・平地など土地の高さで地図を読む" },
      { unit: "e-science-5-nagareru", why: "流れる水のはたらきで、平地のでき方がわかる" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-chikei", why: "国土の約4分の3が山地だという理解不足" },
      { i: 1, root: "e-social-5-chikei", why: "長さと流域面積を区別して覚えていない" },
      { i: 2, root: "e-social-5-chikei", why: "盆地・平野・台地などの地形のよび名の理解不足" },
    ],
  },
  {
    unit: "e-social-5-kiko",
    needs: [
      { unit: "e-social-5-chikei", why: "山地の位置が、季節風や雨・雪に関わる" },
      { unit: "e-social-5-sekai", why: "日本が南北に長く、大陸と海の間にある" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-kiko", why: "季節で風の向きが変わる季節風の理解不足" },
      { i: 1, root: "e-social-5-chikei", why: "日本の中央に山地がつらなることの理解不足" },
      { i: 2, root: "e-social-5-chikei", why: "中国山地・四国山地の位置の理解不足" },
    ],
  },
  {
    unit: "e-social-5-kurashi",
    needs: [
      { unit: "e-social-5-chikei", why: "低い土地・高い土地の地形を知っておく" },
      { unit: "e-social-5-kiko", why: "寒い土地・あたたかい土地の気候を知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-chikei", why: "大きな川の下流の低い土地の理解不足" },
      { i: 1, root: "e-social-5-kiko", why: "高い土地は夏もすずしいという理解不足" },
      { i: 2, root: "e-social-5-chikei", why: "日本の川が短く流れが急なことの理解不足" },
    ],
  },
  {
    unit: "e-social-5-kome",
    needs: [
      { unit: "e-social-5-chikei", why: "広い平野と川の水が米づくりをささえる" },
      { unit: "e-social-5-kiko", why: "夏の日照や季節風が、米の育ち方に関わる" },
      { unit: "e-social-3-seisan", why: "農家の1年の仕事と工夫の見方を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-kome", why: "品種改良で寒い地方でも作れることの理解不足" },
      { i: 1, root: "e-social-5-kome", why: "苗づくりから出荷までの1年の流れの理解不足" },
      { i: 2, root: "e-social-5-kiko", why: "米どころの夏の天気の特ちょうの理解不足" },
    ],
  },
  {
    unit: "e-social-5-suisan",
    needs: [
      { unit: "e-social-5-sekai", why: "日本をとりまく海と排他的経済水域を知る" },
      { unit: "e-social-3-seisan", why: "生産して消費者に届けるまでの見方を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-suisan", why: "漁業の種類ごとの漁獲量の変化の理解不足" },
      { i: 1, root: "e-social-5-suisan", why: "養殖業と栽培漁業の区別がまだ弱い" },
      { i: 2, root: "e-social-5-suisan", why: "暖流と寒流がぶつかる潮目の理解不足" },
    ],
  },
  {
    unit: "e-social-5-shokuryo",
    needs: [
      { unit: "e-social-5-kome", why: "米がほぼ国内でまかなえる理由を知っておく" },
      { unit: "e-social-5-suisan", why: "水産業の生産と輸入の変化を知っておく" },
      { unit: "e-math-5-wariai", why: "食料自給率は、割合（％）で表す" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-shokuryo", why: "品目ごとの自給率のちがいの理解不足" },
      { i: 1, root: "e-social-5-shokuryo", why: "輸入にたよる危うさの理解不足" },
      { i: 2, root: "e-social-5-shokuryo", why: "地産地消の意味の理解不足" },
    ],
  },
  {
    unit: "e-social-5-kogyo",
    needs: [{ unit: "e-social-3-seisan", why: "工場で人と機械が分担して作る見方を使う" }],
    mistakes: [
      { i: 0, root: "e-social-5-kogyo", why: "関連工場が部品を作る分業の理解不足" },
      { i: 1, root: "e-social-3-seisan", why: "工場で人と機械が分担することの理解不足" },
      { i: 2, root: "e-social-5-kogyo", why: "必要な時に必要な数だけ届くしくみの理解不足" },
    ],
  },
  {
    unit: "e-social-5-boeki",
    needs: [
      { unit: "e-social-5-kogyo", why: "工場で原料から製品をつくる流れを知る" },
      { unit: "e-social-5-sekai", why: "貿易相手の国の位置を世界地図で知る" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-boeki", why: "原料を輸入する加工貿易の理解不足" },
      { i: 1, root: "e-social-5-boeki", why: "工場の数と生産額のちがいの理解不足" },
      { i: 2, root: "e-social-5-boeki", why: "運ぶ物に合った輸送手段の理解不足" },
    ],
  },
  {
    unit: "e-social-5-kogai",
    needs: [{ unit: "e-social-5-boeki", why: "工業の発展と工業地域の広がりを知っておく" }],
    mistakes: [
      { i: 0, root: "e-social-5-kogai", why: "四大公害病と原因の結びつけがまだ弱い" },
      { i: 1, root: "e-social-5-kogai", why: "四大公害病と原因の結びつけがまだ弱い" },
      { i: 2, root: "e-social-5-kogai", why: "今も続く被害と新しい環境問題の理解不足" },
    ],
  },
  {
    unit: "e-social-5-joho",
    needs: [{ unit: "e-social-3-mise", why: "店が売れ行きを調べて品物をそろえる工夫を知る" }],
    mistakes: [
      { i: 0, root: "e-social-5-joho", why: "情報をくらべて確かめる習慣がまだ弱い" },
      { i: 1, root: "e-social-5-joho", why: "ニュースが選ばれて作られる流れの理解不足" },
      { i: 2, root: "e-social-5-joho", why: "肖像権やプライバシーの理解不足" },
    ],
  },
  {
    unit: "e-social-5-shinrin",
    needs: [
      { unit: "e-social-5-chikei", why: "国土の多くが山地で森林が広いことを知る" },
      { unit: "e-social-4-mizu", why: "森林が雨水をたくわえるはたらきを知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-shinrin", why: "間伐など人工林を育てる仕事の理解不足" },
      { i: 1, root: "e-social-5-shinrin", why: "森林の広さと木材輸入の理由の理解不足" },
      { i: 2, root: "e-social-5-shinrin", why: "人工林と天然林の区別がまだ弱い" },
    ],
  },
  {
    unit: "e-social-5-bosai",
    needs: [
      { unit: "e-social-5-chikei", why: "山が多く川が急な国土が災害に関わる" },
      { unit: "e-social-4-saigai", why: "自助・共助・公助とハザードマップを知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-4-saigai", why: "自助・共助・公助の3つの力の理解不足" },
      { i: 1, root: "e-social-4-saigai", why: "ハザードマップを前もって使う意味の理解不足" },
      { i: 2, root: "e-social-5-bosai", why: "津波がくり返しおしよせることの理解不足" },
    ],
  },

  // ───────── 小6 ─────────
  {
    unit: "e-social-6-kenpo",
    needs: [],
    mistakes: [
      { i: 0, root: "e-social-6-kenpo", why: "公布と施行の区別と、その日付の理解不足" },
      { i: 1, root: "e-social-6-kenpo", why: "国民の権利と義務の区別がまだ弱い" },
      { i: 2, root: "e-social-6-kenpo", why: "国民主権と天皇が象徴であることの理解不足" },
    ],
  },
  {
    unit: "e-social-6-seiji",
    needs: [{ unit: "e-social-6-kenpo", why: "国民主権の考えが、国の政治のしくみの土台" }],
    mistakes: [
      { i: 0, root: "e-social-6-seiji", why: "国会・内閣・裁判所の役わりの区別がまだ弱い" },
      { i: 1, root: "e-social-6-seiji", why: "衆議院と参議院のちがいの理解不足" },
      { i: 2, root: "e-social-6-seiji", why: "国民が選ぶのは国会議員だという理解不足" },
    ],
  },
  {
    unit: "e-social-6-kurashi-seiji",
    needs: [
      { unit: "e-social-6-seiji", why: "議会で話し合い、議決して決めるしくみを知る" },
      { unit: "e-social-4-saigai", why: "災害のときの公助のはたらきを知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-6-kurashi-seiji", why: "市役所と市議会の役わり分担の理解不足" },
      { i: 1, root: "e-social-6-kurashi-seiji", why: "消費税などみんなが税をはらう理解不足" },
      { i: 2, root: "e-social-6-kurashi-seiji", why: "復旧と復興のちがいの理解不足" },
    ],
  },
  {
    unit: "e-social-6-jomon",
    needs: [
      { unit: "e-social-3-utsurikawari", why: "年代の順に並べて、昔と今をくらべる" },
      { unit: "e-social-5-kome", why: "米づくりの手間と水の管理を知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-6-jomon", why: "縄文と弥生のくらしのちがいの理解不足" },
      { i: 1, root: "e-social-6-jomon", why: "まだ決まっていない説があることの理解不足" },
      { i: 2, root: "e-social-6-jomon", why: "古墳が王や豪族の墓だという理解不足" },
    ],
  },
  {
    unit: "e-social-6-asuka-nara",
    needs: [{ unit: "e-social-6-jomon", why: "豪族とヤマト王権の国のまとまりを知っておく" }],
    mistakes: [
      { i: 0, root: "e-social-6-asuka-nara", why: "十七条の憲法が役人の心がまえだという理解不足" },
      { i: 1, root: "e-social-6-asuka-nara", why: "大化の改新の中心人物の理解不足" },
      { i: 2, root: "e-social-6-asuka-nara", why: "税の種類と納め方の理解不足" },
    ],
  },
  {
    unit: "e-social-6-heian",
    needs: [{ unit: "e-social-6-asuka-nara", why: "天皇中心の国と都のしくみを知っておく" }],
    mistakes: [
      { i: 0, root: "e-social-6-heian", why: "摂政と関白のちがいの理解不足" },
      { i: 1, root: "e-japanese-6-kana-yurai", why: "平仮名と片仮名の成り立ちの理解不足" },
      { i: 2, root: "e-social-6-heian", why: "国風文化の作者と作品の結びつけがまだ弱い" },
    ],
  },
  {
    unit: "e-social-6-kamakura",
    needs: [{ unit: "e-social-6-heian", why: "武士が力をのばし、平氏が政治を動かした流れ" }],
    mistakes: [
      { i: 0, root: "e-social-6-kamakura", why: "御恩と奉公の向きの理解不足" },
      { i: 1, root: "e-social-6-kamakura", why: "恩賞の土地が足りなかったことの理解不足" },
      { i: 2, root: "e-social-6-kamakura", why: "執権が将軍を助ける役だという理解不足" },
    ],
  },
  {
    unit: "e-social-6-muromachi",
    needs: [{ unit: "e-social-6-kamakura", why: "武士の政治が続いていく流れを知っておく" }],
    mistakes: [
      { i: 0, root: "e-social-6-muromachi", why: "金閣と銀閣を建てた将軍の区別がまだ弱い" },
      { i: 1, root: "e-social-6-heian", why: "平安の貴族の寝殿造の理解不足" },
      { i: 2, root: "e-social-6-muromachi", why: "銀閣のつくりの理解不足" },
    ],
  },
  {
    unit: "e-social-6-tenka",
    needs: [{ unit: "e-social-6-muromachi", why: "室町幕府がおとろえ戦国の世になる流れを知る" }],
    mistakes: [
      { i: 0, root: "e-social-6-tenka", why: "信長と秀吉の天下統一の歩みの理解不足" },
      { i: 1, root: "e-social-6-tenka", why: "刀狩で武士と百姓を分けたことの理解不足" },
      { i: 2, root: "e-social-6-tenka", why: "信長と秀吉の政策の区別がまだ弱い" },
    ],
  },
  {
    unit: "e-social-6-edo-seiji",
    needs: [{ unit: "e-social-6-tenka", why: "秀吉の全国統一と身分の区別を知っておく" }],
    mistakes: [
      { i: 0, root: "e-social-6-edo-seiji", why: "家康と家光の政策の区別がまだ弱い" },
      { i: 1, root: "e-social-6-edo-seiji", why: "鎖国中の四つの窓口の理解不足" },
      { i: 2, root: "e-social-6-edo-seiji", why: "身分ごとの人口の割合の理解不足" },
    ],
  },
  {
    unit: "e-social-6-edo-bunka",
    needs: [{ unit: "e-social-6-edo-seiji", why: "鎖国中もオランダと交流していたことを知る" }],
    mistakes: [
      { i: 0, root: "e-social-6-edo-bunka", why: "解体新書が翻訳だという理解不足" },
      { i: 1, root: "e-social-6-edo-bunka", why: "蘭学と国学の区別がまだ弱い" },
      { i: 2, root: "e-social-6-edo-bunka", why: "浮世絵が版画で大量に刷れた理解不足" },
    ],
  },
  {
    unit: "e-social-6-meiji",
    needs: [{ unit: "e-social-6-edo-seiji", why: "鎖国と江戸幕府のしくみが開国で変わる" }],
    mistakes: [
      { i: 0, root: "e-social-6-meiji", why: "和親条約と通商条約の区別がまだ弱い" },
      { i: 1, root: "e-social-6-meiji", why: "大日本帝国憲法の天皇主権の理解不足" },
      { i: 2, root: "e-social-6-meiji", why: "廃藩置県で政府が県を治めたことの理解不足" },
    ],
  },
  {
    unit: "e-social-6-sekai",
    needs: [{ unit: "e-social-6-meiji", why: "開国で結んだ不平等条約と明治の国づくり" }],
    mistakes: [
      { i: 0, root: "e-social-6-sekai", why: "条約改正の2つの内容と人物の結びつけ不足" },
      { i: 1, root: "e-social-6-sekai", why: "日清・日露戦争の結果のちがいの理解不足" },
      { i: 2, root: "e-social-6-sekai", why: "1925年の普通選挙の対象の理解不足" },
    ],
  },
  {
    unit: "e-social-6-senso",
    needs: [{ unit: "e-social-6-sekai", why: "日清・日露戦争後の大陸進出の流れを知る" }],
    mistakes: [
      { i: 0, root: "e-social-6-senso", why: "日中戦争と太平洋戦争の始まりの区別不足" },
      { i: 1, root: "e-social-6-senso", why: "ポツダム宣言の受け入れと終戦の日の理解不足" },
      { i: 2, root: "e-social-6-senso", why: "学童疎開の意味の理解不足" },
    ],
  },
  {
    unit: "e-social-6-sengo",
    needs: [
      { unit: "e-social-6-senso", why: "戦争の終わりから戦後の改革が始まる" },
      { unit: "e-social-6-kenpo", why: "日本国憲法の公布と3つの原則を知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-6-kenpo", why: "憲法の公布と施行の日の区別がまだ弱い" },
      { i: 1, root: "e-social-6-sengo", why: "条約を結んだ年と独立回復の年の区別不足" },
      { i: 2, root: "e-social-6-sekai", why: "1925年の普通選挙は男子だけという理解不足" },
    ],
  },
  {
    unit: "e-social-6-kuniguni",
    needs: [
      { unit: "e-social-5-sekai", why: "世界の国々の位置を地図で知っておく" },
      { unit: "e-social-5-boeki", why: "日本の主な輸入品・輸出品と相手国を知る" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-boeki", why: "日本の主な貿易相手国の理解不足" },
      { i: 1, root: "e-social-5-boeki", why: "原油を中東から輸入していることの理解不足" },
      { i: 2, root: "e-social-6-kuniguni", why: "ブラジルの言葉と歴史の理解不足" },
    ],
  },
  {
    unit: "e-social-6-kokuren",
    needs: [
      { unit: "e-social-6-senso", why: "第二次世界大戦の反省から国連が生まれた" },
      { unit: "e-social-6-kuniguni", why: "日本と世界の国々のつながりを知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-6-senso", why: "第二次世界大戦が終わった年の理解不足" },
      { i: 1, root: "e-social-6-kokuren", why: "国連の機関ごとの役わりの区別がまだ弱い" },
      { i: 2, root: "e-social-6-kokuren", why: "NGOが民間の団体だという理解不足" },
    ],
  },

  // ───────── 中学 地理 ─────────
  {
    unit: "j-soc-geo-sekai-sugata",
    needs: [{ unit: "e-social-5-sekai", why: "六大陸・三大洋と緯度・経度を小5で学んでいる" }],
    mistakes: [
      { i: 0, root: "j-soc-geo-sekai-sugata", why: "大陸と州の区別がまだ弱い" },
      { i: 1, root: "j-soc-geo-sekai-sugata", why: "図法ごとに正しいものがちがう理解不足" },
      { i: 2, root: "e-social-5-sekai", why: "緯度と経度の区別がまだ身についていない" },
    ],
  },
  {
    unit: "j-soc-geo-nihon-sugata",
    needs: [
      { unit: "j-soc-geo-sekai-sugata", why: "東経・西経など経度の表し方を使う" },
      { unit: "e-social-5-sekai", why: "日本の位置と、領海・排他的経済水域を知る" },
      { unit: "e-math-3-jikoku", why: "時差は、何時間後・前の時刻を求める計算" },
      { unit: "e-social-4-todofuken", why: "都道府県と地方区分を知っておく" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-sekai-sugata", why: "東経と西経が0度をはさむことの理解不足" },
      { i: 1, root: "j-soc-geo-nihon-sugata", why: "東ほど時刻が進んでいることの理解不足" },
      { i: 2, root: "e-social-5-sekai", why: "領海と排他的経済水域の区別がまだ弱い" },
    ],
  },
  {
    unit: "j-soc-geo-seikatsu",
    needs: [
      { unit: "j-soc-geo-sekai-sugata", why: "緯度で気候帯がおおまかに並ぶことを使う" },
      { unit: "e-social-5-kiko", why: "季節や地域で気候がちがう見方を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-seikatsu", why: "雨温図から雨の多い季節を読む力の不足" },
      { i: 1, root: "j-soc-geo-sekai-sugata", why: "南半球の高緯度に陸地が少ないことの理解不足" },
      { i: 2, root: "j-soc-geo-seikatsu", why: "熱帯の中の雨季・乾季の区別がまだ弱い" },
      { i: 3, root: "j-soc-geo-seikatsu", why: "乾燥帯の中の砂漠とステップの区別不足" },
    ],
  },
  {
    unit: "j-soc-geo-asia",
    needs: [
      { unit: "j-soc-geo-seikatsu", why: "気候帯と、気候に合わせた農業を知っておく" },
      { unit: "e-social-5-kiko", why: "季節で風向きが変わる季節風を知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-kiko", why: "季節風の向きが夏と冬で逆になる理解不足" },
      { i: 1, root: "j-soc-geo-asia", why: "沿岸部と内陸部の格差の理解不足" },
      { i: 2, root: "j-soc-geo-asia", why: "輸出用作物を大規模につくる意味の理解不足" },
      { i: 3, root: "j-soc-geo-seikatsu", why: "乾燥帯と雨の多い地域の分布の理解不足" },
    ],
  },
  {
    unit: "j-soc-geo-europe",
    needs: [
      { unit: "j-soc-geo-seikatsu", why: "温帯の中の気候のちがいを知っておく" },
      { unit: "j-soc-geo-sekai-sugata", why: "緯度で、ヨーロッパが北にあることがわかる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-europe", why: "暖流と偏西風が温暖にする理解不足" },
      { i: 1, root: "j-soc-geo-seikatsu", why: "地中海性気候は夏に乾燥する理解不足" },
      { i: 2, root: "j-soc-geo-europe", why: "EUと共通通貨ユーロの区別がまだ弱い" },
    ],
  },
  {
    unit: "j-soc-geo-africa",
    needs: [
      { unit: "j-soc-geo-seikatsu", why: "熱帯・乾燥帯など気候帯の並び方を使う" },
      { unit: "j-soc-geo-sekai-sugata", why: "赤道・緯線・経線で位置を読みとる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-seikatsu", why: "気候帯が赤道から帯のように並ぶ理解不足" },
      { i: 1, root: "j-soc-geo-africa", why: "植民地支配で国境が引かれた歴史の理解不足" },
      { i: 2, root: "j-soc-geo-africa", why: "モノカルチャー経済の不安定さの理解不足" },
    ],
  },
  {
    unit: "j-soc-geo-north-america",
    needs: [
      { unit: "j-soc-geo-seikatsu", why: "気候に合わせた農業の見方を使う" },
      { unit: "j-soc-geo-sekai-sugata", why: "緯度・経度で地域の位置を読みとる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-north-america", why: "サンベルトの位置と工業の移動の理解不足" },
      { i: 1, root: "j-soc-geo-north-america", why: "移り住んだ人々の出身地の理解不足" },
      { i: 2, root: "j-soc-geo-north-america", why: "適地適作の意味の理解不足" },
    ],
  },
  {
    unit: "j-soc-geo-south-america",
    needs: [
      { unit: "j-soc-geo-seikatsu", why: "熱帯や高山気候など気候帯の見方を使う" },
      { unit: "e-social-6-kuniguni", why: "ブラジルと日本のつながりを知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-6-kuniguni", why: "ブラジルの言葉がポルトガル語だという理解不足" },
      { i: 1, root: "j-soc-geo-seikatsu", why: "高地では赤道近くでも涼しい理解不足" },
      { i: 2, root: "j-soc-geo-south-america", why: "パンパとアマゾンの区別がまだ弱い" },
    ],
  },
  {
    unit: "j-soc-geo-oceania",
    needs: [
      { unit: "j-soc-geo-seikatsu", why: "乾燥帯と温帯の分布の見方を使う" },
      { unit: "j-soc-geo-sekai-sugata", why: "南半球の大陸と島々の位置を知っておく" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-seikatsu", why: "内陸が乾燥帯で人が住みにくい理解不足" },
      { i: 1, root: "j-soc-geo-oceania", why: "結びつきがアジアへ移った理解不足" },
      { i: 2, root: "j-soc-geo-oceania", why: "先住民の名前と国の結びつけがまだ弱い" },
    ],
  },
  {
    unit: "j-soc-geo-chiiki-chosa",
    needs: [
      { unit: "e-social-3-chizu", why: "方位と地図記号で地図を読みとる" },
      { unit: "e-math-6-kakudai", why: "縮尺で地図上の長さから実際の長さを出す" },
    ],
    mistakes: [
      { i: 0, root: "e-math-6-kakudai", why: "縮尺で長さを出し、単位を直す手順の不足" },
      { i: 1, root: "j-soc-geo-chiiki-chosa", why: "等高線の間かくと坂の急さの理解不足" },
      { i: 2, root: "j-soc-geo-chiiki-chosa", why: "縮尺ごとの等高線の間かくの理解不足" },
    ],
  },
  {
    unit: "j-soc-geo-nihon-tokushoku",
    needs: [
      { unit: "j-soc-geo-nihon-sugata", why: "日本の位置と範囲、地域区分を知っておく" },
      { unit: "e-social-5-chikei", why: "山地・川・平地など日本の地形を小5で学ぶ" },
      { unit: "e-social-5-kiko", why: "季節風と気候区分を小5で学んでいる" },
      { unit: "e-social-5-suisan", why: "暖流と寒流、潮目を小5で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-chikei", why: "扇状地と三角州のでき方の区別が弱い" },
      { i: 1, root: "e-social-5-kiko", why: "冬の季節風が日本海側に雪をふらせる理解不足" },
      { i: 2, root: "e-social-5-suisan", why: "暖流と寒流の名前の区別がまだ弱い" },
    ],
  },
  {
    unit: "j-soc-geo-kyushu",
    needs: [
      { unit: "j-soc-geo-nihon-tokushoku", why: "日本の地形・気候・産業の見方を使う" },
      { unit: "e-social-5-kogai", why: "水俣病など公害と環境の取り組みを知る" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-kyushu", why: "シラス台地の水はけと農業の関係の理解不足" },
      { i: 1, root: "j-soc-geo-kyushu", why: "二毛作と二期作の区別がまだ弱い" },
      { i: 2, root: "e-social-5-kogai", why: "四大公害病と原因の結びつけがまだ弱い" },
    ],
  },
  {
    unit: "j-soc-geo-chugoku-shikoku",
    needs: [
      { unit: "j-soc-geo-nihon-tokushoku", why: "季節風と山地で地域の気候が分かれる" },
    ],
    mistakes: [
      { i: 0, root: "e-social-5-kiko", why: "山地が季節風をさえぎる瀬戸内の気候の理解不足" },
      { i: 1, root: "j-soc-geo-chugoku-shikoku", why: "3つのルートの橋と結ぶ所の理解不足" },
      { i: 2, root: "j-soc-geo-chugoku-shikoku", why: "ストロー現象の理解不足" },
    ],
  },
  {
    unit: "j-soc-geo-kinki",
    needs: [
      { unit: "j-soc-geo-nihon-tokushoku", why: "日本の地形・気候・産業の見方を使う" },
      { unit: "e-social-4-todofuken", why: "近畿の府県の位置を知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-4-todofuken", why: "近畿の府県の位置がまだ身についていない" },
      { i: 1, root: "j-soc-geo-kinki", why: "湖でも赤潮が起こるしくみの理解不足" },
      { i: 2, root: "j-soc-geo-nihon-tokushoku", why: "夏の季節風が太平洋側に雨をふらせる理解不足" },
    ],
  },
  {
    unit: "j-soc-geo-chubu",
    needs: [
      { unit: "j-soc-geo-nihon-tokushoku", why: "季節風と地形による気候のちがいを使う" },
      { unit: "e-social-5-kurashi", why: "高い土地のくらしと高原野菜を小5で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-nihon-tokushoku", why: "山に囲まれた内陸は雨が少ない理解不足" },
      { i: 1, root: "e-social-5-kurashi", why: "高原野菜が夏のすずしさを生かす理解不足" },
      { i: 2, root: "j-soc-geo-chubu", why: "雪国の水田単作の理解不足" },
    ],
  },
  {
    unit: "j-soc-geo-kanto",
    needs: [
      { unit: "j-soc-geo-nihon-tokushoku", why: "日本の地形・人口・産業の見方を使う" },
      { unit: "e-social-5-boeki", why: "工業地帯・地域の位置を小5で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-kanto", why: "関東ロームが火山灰の土だという理解不足" },
      { i: 1, root: "j-soc-geo-kanto", why: "昼間人口と夜間人口の区別がまだ弱い" },
      { i: 2, root: "e-social-5-boeki", why: "工業地帯・地域の位置の理解不足" },
    ],
  },
  {
    unit: "j-soc-geo-tohoku",
    needs: [
      { unit: "j-soc-geo-nihon-tokushoku", why: "季節風と海流による気候の見方を使う" },
      { unit: "e-social-5-kome", why: "東北が米どころになった理由を小5で学ぶ" },
      { unit: "e-social-5-suisan", why: "潮目とよい漁場の関係を小5で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-tohoku", why: "やませの季節と向きの理解不足" },
      { i: 1, root: "j-soc-geo-tohoku", why: "東北の夏祭りと県の結びつけがまだ弱い" },
      { i: 2, root: "j-soc-geo-tohoku", why: "果物の産地と県の結びつけがまだ弱い" },
    ],
  },
  {
    unit: "j-soc-geo-hokkaido",
    needs: [
      { unit: "j-soc-geo-nihon-tokushoku", why: "日本の気候区分と海流の見方を使う" },
      { unit: "e-social-5-kurashi", why: "寒い土地のくらしの工夫を小5で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-hokkaido", why: "北海道の冷帯の気候の理解不足" },
      { i: 1, root: "j-soc-geo-hokkaido", why: "地域ごとの農業のちがいの理解不足" },
      { i: 2, root: "j-soc-geo-nihon-tokushoku", why: "親潮が寒流だという理解不足" },
    ],
  },

  // ───────── 中学 歴史 ─────────
  {
    unit: "j-soc-hist-toraekata",
    needs: [{ unit: "e-social-3-utsurikawari", why: "年号で時代を表し、順に並べる見方を使う" }],
    mistakes: [
      { i: 0, root: "j-soc-hist-toraekata", why: "世紀の区切り（01年から始まる）の理解不足" },
      { i: 1, root: "j-math-1-seifu", why: "負の数と同じく、数が大きいほど前になる" },
      { i: 2, root: "j-soc-hist-toraekata", why: "西暦から世紀を出すしかたの理解不足" },
    ],
  },
  {
    unit: "j-soc-hist-bunmei",
    needs: [
      { unit: "j-soc-hist-toraekata", why: "紀元前・世紀で古い年代を表す" },
      { unit: "j-soc-geo-sekai-sugata", why: "大陸や大河の位置を世界地図で知る" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-bunmei", why: "人類がアフリカで出現したことの理解不足" },
      { i: 1, root: "j-soc-hist-bunmei", why: "打製石器と磨製石器の区別がまだ弱い" },
      { i: 2, root: "j-soc-hist-bunmei", why: "文明と文字の結びつけがまだ弱い" },
    ],
  },
  {
    unit: "j-soc-hist-nihon-naritachi",
    needs: [
      { unit: "e-social-6-jomon", why: "縄文・弥生・古墳の流れを小6で学んでいる" },
      { unit: "j-soc-hist-bunmei", why: "中国の王朝と記録が日本の古代を伝える" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-nihon-naritachi", why: "稲作と狩り・漁が並んで続いた理解不足" },
      { i: 1, root: "e-social-6-jomon", why: "邪馬台国の場所に2つの説がある理解不足" },
      { i: 2, root: "j-soc-hist-nihon-naritachi", why: "倭の王と中国の記録の結びつけ不足" },
    ],
  },
  {
    unit: "j-soc-hist-kodai-kokka",
    needs: [
      { unit: "j-soc-hist-nihon-naritachi", why: "大和政権と豪族の国のまとまりを知る" },
      { unit: "e-social-6-asuka-nara", why: "聖徳太子・大化の改新・税を小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-kodai-kokka", why: "大化の改新が改革全体だという理解不足" },
      { i: 1, root: "e-social-6-asuka-nara", why: "十七条の憲法が役人の心がまえだという理解不足" },
      { i: 2, root: "j-soc-hist-kodai-kokka", why: "租・調・庸の納め先の区別がまだ弱い" },
    ],
  },
  {
    unit: "j-soc-hist-heian",
    needs: [
      { unit: "j-soc-hist-kodai-kokka", why: "律令国家と公地公民のゆらぎを知っておく" },
      { unit: "e-social-6-heian", why: "藤原氏の政治と国風文化を小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "e-social-6-heian", why: "摂政と関白のちがいの理解不足" },
      { i: 1, root: "j-soc-hist-heian", why: "院政を始めたのが上皇だという理解不足" },
      { i: 2, root: "j-soc-hist-heian", why: "国の使いと民間の交易の区別がまだ弱い" },
    ],
  },
  {
    unit: "j-soc-hist-kamakura",
    needs: [
      { unit: "j-soc-hist-heian", why: "院政と武士の成長、平氏の政治を知っておく" },
      { unit: "e-social-6-kamakura", why: "御恩と奉公・元との戦いを小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "e-social-6-kamakura", why: "御恩と奉公の向きの理解不足" },
      { i: 1, root: "e-social-6-kamakura", why: "恩賞の土地が足りなかったことの理解不足" },
      { i: 2, root: "e-social-6-kamakura", why: "執権が将軍を助ける役だという理解不足" },
      { i: 3, root: "j-soc-hist-kamakura", why: "鎌倉仏教の宗派と教えの結びつけ不足" },
    ],
  },
  {
    unit: "j-soc-hist-muromachi",
    needs: [
      { unit: "j-soc-hist-kamakura", why: "鎌倉幕府のおとろえから建武の新政へ続く" },
      { unit: "e-social-6-muromachi", why: "足利氏の幕府と室町文化を小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-muromachi", why: "南朝と北朝の場所の区別がまだ弱い" },
      { i: 1, root: "j-soc-hist-muromachi", why: "勘合貿易を始めた将軍の理解不足" },
      { i: 2, root: "j-soc-hist-muromachi", why: "守護大名と戦国大名の区別がまだ弱い" },
      { i: 3, root: "e-social-6-muromachi", why: "金閣と銀閣を建てた将軍の区別がまだ弱い" },
    ],
  },
  {
    unit: "j-soc-hist-tenka-toitsu",
    needs: [
      { unit: "j-soc-hist-muromachi", why: "応仁の乱から戦国時代への流れを知る" },
      { unit: "e-social-6-tenka", why: "信長・秀吉の統一と政策を小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-tenka-toitsu", why: "鉄砲とキリスト教の伝来の年の区別不足" },
      { i: 1, root: "j-soc-hist-tenka-toitsu", why: "信長と秀吉のキリスト教への態度の区別不足" },
      { i: 2, root: "e-social-6-tenka", why: "刀狩で百姓から武器を取り上げた理解不足" },
    ],
  },
  {
    unit: "j-soc-hist-edo-seiritsu",
    needs: [
      { unit: "j-soc-hist-tenka-toitsu", why: "秀吉の統一と兵農分離を知っておく" },
      { unit: "e-social-6-edo-seiji", why: "参勤交代・身分・鎖国を小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-edo-seiritsu", why: "親藩・譜代・外様の区別がまだ弱い" },
      { i: 1, root: "e-social-6-edo-seiji", why: "参勤交代を制度にした将軍の理解不足" },
      { i: 2, root: "e-social-6-edo-seiji", why: "鎖国中の四つの窓口の理解不足" },
    ],
  },
  {
    unit: "j-soc-hist-edo-tenkai",
    needs: [
      { unit: "j-soc-hist-edo-seiritsu", why: "幕府と藩、年貢をささえる百姓のしくみ" },
      { unit: "e-social-6-edo-bunka", why: "町人の文化と新しい学問を小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-edo-tenkai", why: "三大改革と中心人物の結びつけが弱い" },
      { i: 1, root: "j-soc-hist-edo-tenkai", why: "株仲間への政策のちがいの理解不足" },
      { i: 2, root: "j-soc-hist-edo-tenkai", why: "元禄文化と化政文化の中心地の区別不足" },
    ],
  },
  {
    unit: "j-soc-hist-kaikoku",
    needs: [
      { unit: "j-soc-hist-edo-tenkai", why: "幕府の財政難と改革の行きづまりを知る" },
      { unit: "e-social-6-meiji", why: "ペリー来航から開国の流れを小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "e-social-6-meiji", why: "和親条約と通商条約の区別がまだ弱い" },
      { i: 1, root: "j-soc-hist-kaikoku", why: "和親条約で開いた港の理解不足" },
      { i: 2, root: "j-soc-hist-kaikoku", why: "領事裁判権の向きの理解不足" },
      { i: 3, root: "j-soc-hist-kaikoku", why: "産業革命が始まった国の理解不足" },
    ],
  },
  {
    unit: "j-soc-hist-meiji-ishin",
    needs: [
      { unit: "j-soc-hist-kaikoku", why: "開国と江戸幕府の終わりを知っておく" },
      { unit: "e-social-6-meiji", why: "明治政府の改革と文明開化を小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "e-social-6-meiji", why: "廃藩置県で藩がなくなったことの理解不足" },
      { i: 1, root: "j-soc-hist-meiji-ishin", why: "地租改正の地価と現金納入の理解不足" },
      { i: 2, root: "j-soc-hist-meiji-ishin", why: "徴兵令の対象の理解不足" },
    ],
  },
  {
    unit: "j-soc-hist-rikken",
    needs: [
      { unit: "j-soc-hist-meiji-ishin", why: "明治政府の改革と不満の高まりを知る" },
      { unit: "e-social-6-sekai", why: "日清・日露戦争と条約改正を小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-rikken", why: "憲法の手本がドイツだという理解不足" },
      { i: 1, root: "e-social-6-sekai", why: "日露戦争で賠償金がなかった理解不足" },
      { i: 2, root: "e-social-6-sekai", why: "条約改正の2つの内容と人物の結びつけ不足" },
    ],
  },
  {
    unit: "j-soc-hist-taisho",
    needs: [{ unit: "j-soc-hist-rikken", why: "帝国議会と制限選挙、日露戦争後の国際関係" }],
    mistakes: [
      { i: 0, root: "e-social-6-sekai", why: "1925年の普通選挙は男子だけという理解不足" },
      { i: 1, root: "j-soc-hist-taisho", why: "日英同盟と連合国側の参戦の理解不足" },
      { i: 2, root: "j-soc-hist-taisho", why: "国際連盟にアメリカが入らなかった理解不足" },
    ],
  },
  {
    unit: "j-soc-hist-sekai-taisen",
    needs: [
      { unit: "j-soc-hist-taisho", why: "大戦後の国際協調と国際連盟を知っておく" },
      { unit: "e-social-6-senso", why: "日中戦争から太平洋戦争の流れを小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-sekai-taisen", why: "世界恐慌がアメリカから始まった理解不足" },
      { i: 1, root: "e-social-6-senso", why: "満州事変・日中戦争・太平洋戦争の順の不足" },
      { i: 2, root: "j-soc-hist-sekai-taisen", why: "五・一五事件と二・二六事件の区別不足" },
    ],
  },
  {
    unit: "j-soc-hist-sengo",
    needs: [
      { unit: "j-soc-hist-sekai-taisen", why: "戦争の終わりと占領の始まりを知っておく" },
      { unit: "e-social-6-sengo", why: "戦後の改革と高度経済成長を小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-taisho", why: "1925年の普通選挙は男子だけという理解不足" },
      { i: 1, root: "j-soc-hist-sengo", why: "沖縄の返還が1972年だという理解不足" },
      { i: 2, root: "j-soc-hist-sengo", why: "農地改革で土地が小作人へ移った理解不足" },
    ],
  },
  {
    unit: "j-soc-hist-gendai",
    needs: [{ unit: "j-soc-hist-sengo", why: "冷戦の始まりと高度経済成長を知っておく" }],
    mistakes: [
      { i: 0, root: "j-soc-hist-gendai", why: "冷戦後の地域紛争やテロの理解不足" },
      { i: 1, root: "j-soc-hist-gendai", why: "冷戦の終わりの出来事の順の理解不足" },
      { i: 2, root: "j-soc-hist-sengo", why: "高度経済成長の時期の理解不足" },
    ],
  },

  // ───────── 中学 公民 ─────────
  {
    unit: "j-soc-civ-gendai-shakai",
    needs: [
      { unit: "j-soc-hist-gendai", why: "冷戦後のグローバル化の流れを知っておく" },
      { unit: "e-social-5-joho", why: "情報の集め方・使い方を小5で学んでいる" },
      { unit: "e-math-5-wariai", why: "高齢化は人数ではなく割合で表す" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-wariai", why: "数と割合を区別して読みとる力の不足" },
      { i: 1, root: "j-soc-civ-gendai-shakai", why: "国際分業の意味の理解不足" },
      { i: 2, root: "j-soc-civ-gendai-shakai", why: "情報リテラシーと情報モラルの区別不足" },
    ],
  },
  {
    unit: "j-soc-civ-bunka",
    needs: [
      { unit: "e-social-4-dento", why: "地域の行事や伝統の受けつぎを小4で学ぶ" },
      { unit: "j-soc-civ-gendai-shakai", why: "グローバル化で多様な文化が出会う" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-bunka", why: "文化が科学や生活もふくむ理解不足" },
      { i: 1, root: "j-soc-civ-bunka", why: "年中行事と通過儀礼の区別がまだ弱い" },
      { i: 2, root: "j-soc-civ-bunka", why: "多文化共生の意味の理解不足" },
      { i: 3, root: "j-soc-civ-bunka", why: "無形文化遺産が「習わし」だという理解不足" },
    ],
  },
  {
    unit: "j-soc-civ-goi",
    needs: [{ unit: "e-social-6-kurashi-seiji", why: "話し合いと議決で決めるしくみを知っておく" }],
    mistakes: [
      { i: 0, root: "j-soc-civ-goi", why: "効率と公正の2つの見方の理解不足" },
      { i: 1, root: "j-soc-civ-goi", why: "少数意見の尊重の理解不足" },
      { i: 2, root: "j-soc-civ-goi", why: "手続きと結果の公正さの区別がまだ弱い" },
    ],
  },
  {
    unit: "j-soc-civ-kenpo",
    needs: [
      { unit: "e-social-6-kenpo", why: "日本国憲法の3つの原則を小6で学んでいる" },
      { unit: "j-soc-hist-rikken", why: "大日本帝国憲法とくらべて変化をつかむ" },
      { unit: "j-soc-hist-sengo", why: "戦後の民主化で新しい憲法ができた流れ" },
    ],
    mistakes: [
      { i: 0, root: "e-social-6-kenpo", why: "公布と施行の区別と、その日付の理解不足" },
      { i: 1, root: "j-soc-civ-kenpo", why: "改正の発議に必要な賛成の条件の理解不足" },
      { i: 2, root: "e-social-6-kenpo", why: "天皇が象徴であることの理解不足" },
    ],
  },
  {
    unit: "j-soc-civ-jinken",
    needs: [
      { unit: "j-soc-civ-kenpo", why: "基本的人権の尊重は憲法の基本原理の1つ" },
      { unit: "j-soc-hist-kaikoku", why: "市民革命と人権宣言の歴史を知っておく" },
    ],
    mistakes: [
      { i: 0, root: "e-social-6-kenpo", why: "教育を受ける権利と受けさせる義務の区別" },
      { i: 1, root: "j-soc-civ-jinken", why: "社会権を定めた憲法の理解不足" },
      { i: 2, root: "j-soc-civ-jinken", why: "自由権と社会権の区別がまだ弱い" },
    ],
  },
  {
    unit: "j-soc-civ-senkyo",
    needs: [
      { unit: "j-soc-civ-jinken", why: "参政権は人権を守るための権利" },
      { unit: "j-soc-hist-taisho", why: "普通選挙が広がってきた歴史を知る" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-senkyo", why: "小選挙区制と比例代表制の特ちょうの区別不足" },
      { i: 1, root: "j-soc-civ-senkyo", why: "ドント式の計算のしかたの理解不足" },
      { i: 2, root: "j-soc-hist-taisho", why: "1925年の普通選挙は男子だけという理解不足" },
    ],
  },
  {
    unit: "j-soc-civ-kokkai",
    needs: [
      { unit: "j-soc-civ-senkyo", why: "国会議員は選挙で国民が選ぶ" },
      { unit: "e-social-6-seiji", why: "国会・内閣・裁判所の役わりを小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-kokkai", why: "出席議員と総議員の区別がまだ弱い" },
      { i: 1, root: "j-soc-civ-kokkai", why: "国会の種類と開かれるときの理解不足" },
      { i: 2, root: "e-social-6-seiji", why: "内閣も法律案を出せることの理解不足" },
    ],
  },
  {
    unit: "j-soc-civ-naikaku",
    needs: [{ unit: "j-soc-civ-kokkai", why: "国会が首相を指名し、内閣を信任する" }],
    mistakes: [
      { i: 0, root: "j-soc-civ-naikaku", why: "国務大臣の過半数が国会議員の理解不足" },
      { i: 1, root: "j-soc-civ-naikaku", why: "不信任決議が衆議院だけの理解不足" },
      { i: 2, root: "e-social-6-seiji", why: "首相は国会が指名することの理解不足" },
    ],
  },
  {
    unit: "j-soc-civ-saibansho",
    needs: [{ unit: "j-soc-civ-naikaku", why: "国会と内閣の関係をふまえて三権を見る" }],
    mistakes: [
      { i: 0, root: "j-soc-civ-saibansho", why: "すべての裁判所が違憲審査をする理解不足" },
      { i: 1, root: "j-soc-civ-naikaku", why: "衆議院の解散を内閣が決める理解不足" },
      { i: 2, root: "j-soc-civ-saibansho", why: "控訴と上告の区別がまだ弱い" },
      { i: 3, root: "j-soc-civ-saibansho", why: "刑事と民事の用語の区別がまだ弱い" },
    ],
  },
  {
    unit: "j-soc-civ-chiho",
    needs: [
      { unit: "j-soc-civ-senkyo", why: "首長と議員を住民が選挙で選ぶ" },
      { unit: "e-social-6-kurashi-seiji", why: "市役所・市議会と税金のしくみを小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-naikaku", why: "議院内閣制と首長の直接選挙を混同" },
      { i: 1, root: "j-soc-civ-chiho", why: "直接請求の請求先の理解不足" },
      { i: 2, root: "j-soc-civ-chiho", why: "地方交付税交付金と国庫支出金の区別不足" },
    ],
  },
  {
    unit: "j-soc-civ-shohi",
    needs: [{ unit: "e-social-3-mise", why: "店に品物がとどく流通のしくみを知っておく" }],
    mistakes: [
      { i: 0, root: "j-soc-civ-shohi", why: "契約が合意で成り立つことの理解不足" },
      { i: 1, root: "j-soc-civ-shohi", why: "クーリング・オフの対象の理解不足" },
      { i: 2, root: "j-soc-civ-shohi", why: "消費支出と非消費支出の区別がまだ弱い" },
    ],
  },
  {
    unit: "j-soc-civ-shijo",
    needs: [
      { unit: "j-soc-civ-shohi", why: "財とサービス、売り買いのしくみを知る" },
      { unit: "j-math-1-hirei", why: "需要・供給曲線は座標のグラフで読む" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-shijo", why: "価格と需要量・供給量の動きの理解不足" },
      { i: 1, root: "j-soc-civ-shijo", why: "均衡価格が市場で決まる理解不足" },
      { i: 2, root: "j-soc-civ-shijo", why: "売れ残ると価格が下がる理解不足" },
      { i: 3, root: "j-soc-civ-shijo", why: "物価とお金の価値の関係の理解不足" },
    ],
  },
  {
    unit: "j-soc-civ-kigyo",
    needs: [
      { unit: "j-soc-civ-shohi", why: "家計・企業など経済の主体を知っておく" },
      { unit: "e-social-5-kogyo", why: "工場と関連工場の分業を小5で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-kigyo", why: "株主の有限責任の理解不足" },
      { i: 1, root: "j-soc-civ-jinken", why: "労働三権と勤労の権利の区別がまだ弱い" },
      { i: 2, root: "e-social-5-boeki", why: "中小工場が数では大部分だという理解不足" },
    ],
  },
  {
    unit: "j-soc-civ-kinyu",
    needs: [
      { unit: "j-soc-civ-shijo", why: "市場と物価（インフレ・デフレ）を知る" },
      { unit: "j-soc-civ-kigyo", why: "企業がお金を集めるしくみを知っておく" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-kinyu", why: "預金と貸し出しの利子の差の理解不足" },
      { i: 1, root: "j-soc-civ-kinyu", why: "日本銀行の取り引き相手の理解不足" },
      { i: 2, root: "j-soc-civ-kinyu", why: "金融政策の向きの理解不足" },
      { i: 3, root: "j-soc-civ-kinyu", why: "円高・円安の意味の理解不足" },
    ],
  },
  {
    unit: "j-soc-civ-zaisei",
    needs: [
      { unit: "j-soc-civ-kinyu", why: "景気の波と金融政策を知っておく" },
      { unit: "e-social-6-kurashi-seiji", why: "税金が集められ使われるしくみを小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-zaisei", why: "直接税と間接税の区別がまだ弱い" },
      { i: 1, root: "j-soc-civ-zaisei", why: "累進課税のしくみの理解不足" },
      { i: 2, root: "j-soc-civ-zaisei", why: "財政政策の向きの理解不足" },
    ],
  },
  {
    unit: "j-soc-civ-shakai-hosho",
    needs: [
      { unit: "j-soc-civ-zaisei", why: "歳出で社会保障費が大きいことを知る" },
      { unit: "j-soc-civ-jinken", why: "生存権が社会保障の根拠になる" },
      { unit: "j-soc-civ-gendai-shakai", why: "少子高齢化の進み方を知っておく" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-shakai-hosho", why: "社会保障の4つの柱の区別がまだ弱い" },
      { i: 1, root: "j-soc-civ-shakai-hosho", why: "社会保障の4つの柱の区別がまだ弱い" },
      { i: 2, root: "j-soc-civ-shakai-hosho", why: "介護保険の加入年齢の理解不足" },
      { i: 3, root: "j-soc-civ-shakai-hosho", why: "年金の賦課方式の理解不足" },
    ],
  },
  {
    unit: "j-soc-civ-kokusai",
    needs: [
      { unit: "j-soc-geo-nihon-sugata", why: "領域と排他的経済水域を地理で学ぶ" },
      { unit: "e-social-6-kokuren", why: "国際連合のしくみと役わりを小6で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-nihon-sugata", why: "領海と排他的経済水域の区別がまだ弱い" },
      { i: 1, root: "j-soc-civ-kokusai", why: "常任理事国の拒否権の理解不足" },
      { i: 2, root: "j-soc-hist-sengo", why: "日本の国連加盟が1956年だという理解不足" },
    ],
  },
  {
    unit: "j-soc-civ-chikyu",
    needs: [
      { unit: "j-soc-civ-kokusai", why: "国連など国際協力のしくみを知っておく" },
      { unit: "e-science-6-kankyo", why: "地球温暖化のしくみを理科で学んでいる" },
      { unit: "j-soc-geo-africa", why: "モノカルチャー経済と貧困を地理で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-chikyu", why: "京都議定書とパリ協定のちがいの理解不足" },
      { i: 1, root: "j-soc-civ-chikyu", why: "南北問題の意味の理解不足" },
      { i: 2, root: "e-social-6-kokuren", why: "SDGsが国連で決めた目標だという理解不足" },
    ],
  },
];
