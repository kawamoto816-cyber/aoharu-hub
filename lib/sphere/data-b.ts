import type { AxisB } from "./types";

// 軸 B テーマ星座。扇形がテーマ、内側から外側へ 小低 (小1〜3)・小高 (小4〜6)・中・高。
// 2つのテーマの members に同じ単元があれば、その単元は交差点 (扇の境目に置く)。
// テーマの順は、上から時計回り。

export const AXIS_B: AxisB = {
  themes: [
    {
      id: "jikan",
      name: "時間",
      members: [
        { unit: "e-math-2-jikoku", short: "時こく", ring: "小低" },
        { unit: "e-english-34-jikoku", short: "時刻(英)", ring: "小低" },
        { unit: "e-science-6-tsuki-taiyo", short: "月と太陽", ring: "小高" },
        { unit: "j-sci-3-tentai", short: "天体の動き", ring: "中" },
        { unit: "h-jpn-koten-joshiki", short: "古典常識", ring: "高", a: -20 },
        { unit: "h-eng-gram-jisei", short: "時制", ring: "高", a: 6 },
        { unit: "h-geo-sogo-jisa", short: "時差", ring: "高" },
      ],
    },
    {
      id: "ichi",
      name: "位置と地図",
      members: [
        { unit: "e-social-3-chizu", short: "地図記号", ring: "小低" },
        { unit: "e-english-56-ichi", short: "位置(英)", ring: "小高" },
        { unit: "j-soc-geo-sekai-sugata", short: "緯度経度", ring: "中" },
        { unit: "j-math-1-hirei", short: "座標", ring: "中" },
        { unit: "h-geo-sogo-jisa", short: "時差", ring: "高" },
        { unit: "h-math-2-chokusen", short: "点と直線", ring: "高", a: -6 },
        { unit: "h-geo-sogo-gis", short: "GIS", ring: "高", a: 22 },
      ],
    },
    {
      id: "okane",
      name: "お金",
      members: [
        { unit: "e-english-56-chumon", short: "注文(英)", ring: "小高", a: -14 },
        { unit: "e-math-5-wariai", short: "割合", ring: "小高", a: 18 },
        { unit: "j-soc-civ-shohi", short: "消費生活", ring: "中" },
        { unit: "h-math-b-tosa", short: "等比数列", ring: "高", a: -22 },
        { unit: "h-civ-kokyo-kinyu", short: "金融", ring: "高", a: 18 },
      ],
    },
    {
      id: "mizu",
      name: "水",
      members: [
        { unit: "e-math-2-kasa", short: "水のかさ", ring: "小低" },
        { unit: "e-science-4-yukue", short: "水のゆくえ", ring: "小高", a: -14 },
        { unit: "e-social-4-mizu", short: "飲み水", ring: "小高", a: 14 },
        { unit: "j-sci-1-jotai", short: "状態変化", ring: "中", a: -26 },
        { unit: "j-sci-3-suiatsu", short: "浮力", ring: "中", a: 26 },
        { unit: "h-sci-earth-kaiyo", short: "海洋", ring: "高", label: "r" },
      ],
    },
    {
      id: "sora",
      name: "空と天気",
      members: [
        { unit: "e-english-34-youbi-tenki", short: "天気(英)", ring: "小低" },
        { unit: "e-science-5-tenki", short: "天気の変化", ring: "小高", a: -20 },
        { unit: "e-social-5-kiko", short: "国土の気候", ring: "小高", a: 20 },
        { unit: "j-sci-2-tenki", short: "前線", ring: "中" },
        { unit: "h-sci-earth-kisho", short: "日本の気象", ring: "高" },
      ],
    },
    {
      id: "moji",
      name: "文字と記号",
      members: [
        { unit: "e-japanese-1-hiragana", short: "ひらがな", ring: "小低", a: -18 },
        { unit: "e-english-34-alpha-oomoji", short: "ABC", ring: "小低", a: 18 },
        { unit: "e-japanese-6-kana-yurai", short: "仮名の由来", ring: "小高", a: -20, label: "l" },
        { unit: "e-math-6-moji-shiki", short: "文字と式", ring: "小高", a: 20, label: "t" },
        { unit: "j-en-1-onsei", short: "発音", ring: "中" },
        { unit: "h-info-1-hyogen", short: "文字コード", ring: "高", label: "r" },
      ],
    },
  ],
  edges: [
    // 時間
    { from: "e-math-2-jikoku", to: "e-english-34-jikoku", line: "jikan", kind: "line", why: "時計の時刻を英語で言う (What time is it?)" },
    { from: "e-math-2-jikoku", to: "e-science-6-tsuki-taiyo", line: "jikan", kind: "line", why: "1日の時こくは、太陽の動きで決まる" },
    { from: "e-science-6-tsuki-taiyo", to: "j-sci-3-tentai", line: "jikan", kind: "line", why: "1日・1年の動きを、地球の自転と公転で説明する" },
    { from: "j-sci-3-tentai", to: "h-geo-sogo-jisa", line: "jikan", kind: "line", why: "地球の自転が、場所による時刻のちがいを生む" },
    { from: "j-sci-3-tentai", to: "h-jpn-koten-joshiki", line: "jikan", kind: "line", why: "昔の暦 (旧暦) は月の満ち欠けをもとにしていた" },
    { from: "e-english-34-jikoku", to: "h-eng-gram-jisei", line: "jikan", kind: "line", why: "いつのことかを、動詞の形 (現在・過去・未来) で表す" },
    // 位置と地図
    { from: "e-social-3-chizu", to: "e-english-56-ichi", line: "ichi", kind: "line", why: "方位と目印で、道を英語で案内する" },
    { from: "e-social-3-chizu", to: "j-soc-geo-sekai-sugata", line: "ichi", kind: "line", why: "身近な地図から、地球全体の位置の表し方へ" },
    { from: "j-soc-geo-sekai-sugata", to: "h-geo-sogo-jisa", line: "ichi", kind: "line", why: "経度15度ごとに、1時間の時差が生まれる" },
    { from: "j-soc-geo-sekai-sugata", to: "h-geo-sogo-gis", line: "ichi", kind: "line", why: "緯度・経度で決まる位置の情報を、重ねて地図にする" },
    { from: "e-english-56-ichi", to: "j-math-1-hirei", line: "ichi", kind: "line", why: "前後・左右の位置を、2つの数の組 (座標) で表す" },
    { from: "j-math-1-hirei", to: "h-math-2-chokusen", line: "ichi", kind: "line", why: "座標平面の上で、直線を式で表す" },
    // お金
    { from: "e-english-56-chumon", to: "e-math-5-wariai", line: "okane", kind: "line", why: "値段のやりとりから、何割引きの計算へ" },
    { from: "e-math-5-wariai", to: "j-soc-civ-shohi", line: "okane", kind: "line", why: "消費税や値引きは、割合で計算する" },
    { from: "j-soc-civ-shohi", to: "h-civ-kokyo-kinyu", line: "okane", kind: "line", why: "お金の流れを、家計から銀行・社会へ広げる" },
    { from: "e-math-5-wariai", to: "h-math-b-tosa", line: "okane", kind: "line", why: "毎年同じ利率で増えるお金 (複利) は等比数列になる" },
    { from: "h-math-b-tosa", to: "h-civ-kokyo-kinyu", line: "okane", kind: "line", why: "預金や借金の利子を、複利で計算する" },
    // 水
    { from: "e-math-2-kasa", to: "e-science-4-yukue", line: "mizu", kind: "line", why: "水の量をはかる見方で、自然の中の水を追う" },
    { from: "e-social-4-mizu", to: "e-science-4-yukue", line: "mizu", kind: "line", why: "飲み水も、雨→川→ダムという水のめぐりから来る" },
    { from: "e-science-4-yukue", to: "j-sci-1-jotai", line: "mizu", kind: "line", why: "水が蒸発して水蒸気になり、冷えて水にもどる" },
    { from: "j-sci-1-jotai", to: "h-sci-earth-kaiyo", line: "mizu", kind: "line", why: "海水の蒸発から始まる、地球規模の水の循環" },
    { from: "e-math-2-kasa", to: "j-sci-3-suiatsu", line: "mizu", kind: "line", why: "水に沈んだ部分の体積の分だけ、浮く力がはたらく" },
    // 空と天気
    { from: "e-english-34-youbi-tenki", to: "e-science-5-tenki", line: "sora", kind: "line", why: "sunny・cloudy・rainy で言った天気を、雲の動きで読む" },
    { from: "e-science-5-tenki", to: "e-social-5-kiko", line: "sora", kind: "line", why: "毎日の天気の積み重なりが、その土地の気候になる" },
    { from: "e-science-5-tenki", to: "j-sci-2-tenki", line: "sora", kind: "line", why: "天気が西から東へ変わるしくみを、気団と前線で説明する" },
    { from: "e-social-5-kiko", to: "j-sci-2-tenki", line: "sora", kind: "line", why: "梅雨は、梅雨前線が日本付近にとどまって起こる" },
    { from: "j-sci-2-tenki", to: "h-sci-earth-kisho", line: "sora", kind: "line", why: "季節ごとの気団と前線で、日本の天気を読む" },
    // 文字と記号
    { from: "e-japanese-1-hiragana", to: "e-japanese-6-kana-yurai", line: "moji", kind: "line", why: "ひらがなは、漢字をくずした形から生まれた" },
    { from: "e-japanese-6-kana-yurai", to: "h-info-1-hyogen", line: "moji", kind: "line", why: "コンピュータは、文字を番号 (文字コード) で表す" },
    { from: "e-english-34-alpha-oomoji", to: "j-en-1-onsei", line: "moji", kind: "line", why: "アルファベットの名前と、単語の中での音のちがい" },
    { from: "e-english-34-alpha-oomoji", to: "e-math-6-moji-shiki", line: "moji", kind: "line", why: "x や a などの文字を、数のかわりに使う" },
    { from: "e-math-6-moji-shiki", to: "h-info-1-hyogen", line: "moji", kind: "line", why: "記号に数を対応させる。文字コードは文字に番号を割り当てる" },
  ],
};
