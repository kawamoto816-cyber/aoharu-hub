import type { PrereqUnit } from "../types";

export const PREREQ_JA: PrereqUnit[] = [
  // ───────── 小1 ─────────
  {
    unit: "e-japanese-1-hiragana",
    needs: [],
    mistakes: [
      { i: 0, root: "e-japanese-1-hiragana", why: "にた形の字を、さいごの「まる」で見分けていない" },
      { i: 1, root: "e-japanese-1-hiragana", why: "まる（゜）がつくのは「は」の行だけと知らない" },
      { i: 2, root: "e-japanese-1-hiragana", why: "「ほ」と「は」のちがいを、よこぼうの数で見ていない" },
      { i: 3, root: "e-japanese-1-hiragana", why: "ひらがなが漢字をくずしてできたことを知らない" },
    ],
  },
  {
    unit: "e-japanese-1-ha-wo-he",
    needs: [{ unit: "e-japanese-1-hiragana", why: "ひらがなが読み書きできて、はじめて書き分けられる" }],
    mistakes: [
      { i: 0, root: "e-japanese-1-ha-wo-he", why: "だれ・なにの後の「わ」は「は」と書くきまりの未習熟" },
      { i: 1, root: "e-japanese-1-ha-wo-he", why: "なにをするかの「お」は「を」と書くきまりの未習熟" },
      { i: 2, root: "e-japanese-1-ha-wo-he", why: "行く先の「え」は「へ」と書くきまりの未習熟" },
      { i: 3, root: "e-japanese-1-ha-wo-he", why: "ことばの中の音は音どおりに書く、の区別ができていない" },
    ],
  },
  {
    unit: "e-japanese-1-kana-on",
    needs: [{ unit: "e-japanese-1-hiragana", why: "1字1音がわかって、そえる字・小さい字が分かる" }],
    mistakes: [
      { i: 0, root: "e-japanese-1-kana-on", why: "ひらがなでは、のばす音を字をそえて書くと知らない" },
      { i: 1, root: "e-japanese-1-kana-on", why: "えの行は「い」をそえることが多い、の未習熟" },
      { i: 2, root: "e-japanese-1-kana-on", why: "「お」をそえるとくべつなことばを覚えていない" },
      { i: 3, root: "e-japanese-1-kana-on", why: "ねじれた音は小さい「ゃ」で書く、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-1-katakana",
    needs: [
      { unit: "e-japanese-1-hiragana", why: "ひらがなと同じ音の字として、かたかなを覚える" },
      { unit: "e-japanese-1-kana-on", why: "のばす音・小さい字の書き方を、かたかなでも使う" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-1-katakana", why: "「ン」と「ソ」の書く向きのちがいを覚えていない" },
      { i: 1, root: "e-japanese-1-katakana", why: "「シ」と「ツ」の点の向きのちがいを覚えていない" },
      { i: 2, root: "e-japanese-1-katakana", why: "かたかなでは、のばす音を「ー」で書くと知らない" },
      { i: 3, root: "e-japanese-1-kana-on", why: "つまる音を小さい字で書くことがあいまい" },
    ],
  },
  {
    unit: "e-japanese-1-kanji",
    needs: [{ unit: "e-japanese-1-hiragana", why: "漢字の読みを、ひらがなで書き表して覚える" }],
    mistakes: [
      { i: 0, root: "e-japanese-1-kanji", why: "字を合わせてできる字の、組み立てをたしかめていない" },
      { i: 1, root: "e-japanese-1-kanji", why: "漢字が絵からできたことと、もとの絵を知らない" },
      { i: 2, root: "e-japanese-1-kanji", why: "書きじゅんのきまりをまもっていない" },
      { i: 3, root: "e-japanese-1-kanji", why: "「右」と「左」の1画めのちがいを覚えていない" },
    ],
  },
  {
    unit: "e-japanese-1-kutoten",
    needs: [{ unit: "e-japanese-1-hiragana", why: "字が書けて、文をくぎるしるしが使えるようになる" }],
    mistakes: [
      { i: 0, root: "e-japanese-1-kutoten", why: "文の終わりに「。」をつけるきまりの未習熟" },
      { i: 1, root: "e-japanese-1-kutoten", why: "かぎの中の「。」を」の前に書くきまりの未習熟" },
      { i: 2, root: "e-japanese-1-kutoten", why: "かぎは口に出したことばにつける、の未習熟" },
      { i: 3, root: "e-japanese-1-kutoten", why: "たて書きで「。」をますの右上に書くと知らない" },
    ],
  },
  {
    unit: "e-japanese-1-keiken",
    needs: [
      { unit: "e-japanese-1-kutoten", why: "「。」や「」を使って、文を正しく書きならべる" },
      { unit: "e-japanese-1-ha-wo-he", why: "「は」「を」「へ」を正しく書けると文が書ける" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-1-keiken", why: "なにをしたか・どうだったかを書きくわえていない" },
      { i: 1, root: "e-japanese-1-keiken", why: "したじゅんにならべて書く、の未習熟" },
      { i: 2, root: "e-japanese-1-kutoten", why: "話したことばにかぎをつける使い方があいまい" },
    ],
  },
  {
    unit: "e-japanese-1-monogatari",
    needs: [
      { unit: "e-japanese-1-hiragana", why: "ひらがなをすらすら読めて、お話を読める" },
      { unit: "e-japanese-1-kutoten", why: "かぎが話したことばだと分かると、会話が読める" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-1-monogatari", why: "出てきて話す・動くものが登場人物、の未習熟" },
      { i: 1, root: "e-japanese-1-kutoten", why: "かぎ1つずつが、だれかの話したことばだとつかめない" },
      { i: 2, root: "e-japanese-1-monogatari", why: "気もちを文のことばから考える読み方の未習熟" },
    ],
  },
  {
    unit: "e-japanese-1-nakama",
    needs: [{ unit: "e-japanese-1-hiragana", why: "ことばを読み書きできて、なかま分けができる" }],
    mistakes: [
      { i: 0, root: "e-japanese-1-nakama", why: "まとめてよぶことばと、その中のことばの区別がない" },
      { i: 1, root: "e-japanese-1-nakama", why: "くだものとやさいのなかまのちがいを知らない" },
      { i: 2, root: "e-japanese-1-nakama", why: "使い方でなかまを決める見方ができていない" },
    ],
  },
  {
    unit: "e-japanese-1-setsumei",
    needs: [{ unit: "e-japanese-1-hiragana", why: "ひらがなをすらすら読めて、文章を読める" }],
    mistakes: [
      { i: 0, root: "e-japanese-1-setsumei", why: "はじめに、なにの話かをつかむ読み方の未習熟" },
      { i: 1, root: "e-japanese-1-setsumei", why: "「〜でしょう」は問いの文、という見分けの未習熟" },
      { i: 2, root: "e-japanese-1-setsumei", why: "「だから」の前がわけ、というつながりの未習熟" },
    ],
  },
  {
    unit: "e-japanese-1-shi",
    needs: [{ unit: "e-japanese-1-hiragana", why: "ひらがなを読めて、声に出して詩が読める" }],
    mistakes: [
      { i: 0, root: "e-japanese-1-shi", why: "行のかわりめで休む、詩の読み方の未習熟" },
      { i: 1, root: "e-japanese-1-shi", why: "くりかえしがリズムを作るくふうだと知らない" },
      { i: 2, root: "e-japanese-1-shi", why: "ようすのことばから場面をうかべる読み方の未習熟" },
    ],
  },
  // ───────── 小2 ─────────
  {
    unit: "e-japanese-2-hantai",
    needs: [{ unit: "e-japanese-1-nakama", why: "ことばどうしのつながりを考える見方の土台" }],
    mistakes: [
      { i: 0, root: "e-japanese-2-hantai", why: "なにが高いのかで反対がかわる、の未習熟" },
      { i: 1, root: "e-japanese-2-hantai", why: "ものによって使うことばがちがう、の未習熟" },
      { i: 2, root: "e-japanese-2-hantai", why: "「〜ない」と反対のことばの区別がついていない" },
    ],
  },
  {
    unit: "e-japanese-2-kanji",
    needs: [{ unit: "e-japanese-1-kanji", why: "成り立ちや書きじゅんのきまりを、2年の字にも使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-2-kanji", why: "送りがなを、ことばごとにたしかめていない" },
      { i: 1, root: "e-japanese-1-kanji", why: "「右」はノから書く、という1年の書きじゅんの未習熟" },
      { i: 2, root: "e-japanese-2-kanji", why: "読み方はことばで決まる、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-2-kansatsu",
    needs: [{ unit: "e-japanese-1-keiken", why: "見たこと・したことをじゅんに書く力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-2-kansatsu", why: "数や大きさで、くわしく書く書き方の未習熟" },
      { i: 1, root: "e-japanese-2-kansatsu", why: "見たことと思ったことを分けて書く、の未習熟" },
      { i: 2, root: "e-japanese-2-kansatsu", why: "くらべるために日づけを書く、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-2-katakana",
    needs: [{ unit: "e-japanese-1-katakana", why: "かたかなが書けて、どのことばに使うかが分かる" }],
    mistakes: [
      { i: 0, root: "e-japanese-1-katakana", why: "かたかなののばす音は「ー」、の1年の未習熟" },
      { i: 1, root: "e-japanese-1-katakana", why: "シ・ツ・ン・ソの書き分けが1年から身についていない" },
      { i: 2, root: "e-japanese-2-katakana", why: "ようすのことばと、音・鳴き声の区別ができていない" },
    ],
  },
  {
    unit: "e-japanese-2-keiken",
    needs: [{ unit: "e-japanese-1-keiken", why: "したことをじゅんに書く力を、組み立てにひろげる" }],
    mistakes: [
      { i: 0, root: "e-japanese-2-keiken", why: "書くことを一つにしぼる、の未習熟" },
      { i: 1, root: "e-japanese-1-keiken", why: "どうだったかを書きくわえる力が1年から弱い" },
      { i: 2, root: "e-japanese-1-kutoten", why: "話したことばにかぎをつける使い方があいまい" },
    ],
  },
  {
    unit: "e-japanese-2-monogatari",
    needs: [{ unit: "e-japanese-1-monogatari", why: "だれが・どこでと気もちを読む力を、場面にひろげる" }],
    mistakes: [
      { i: 0, root: "e-japanese-1-monogatari", why: "気もちを文のことばから考える読み方が身についていない" },
      { i: 1, root: "e-japanese-1-monogatari", why: "かぎがだれのことばか、たしかめる習慣がない" },
      { i: 2, root: "e-japanese-2-monogatari", why: "はじめとおわりの気もちをくらべる、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-2-nakama",
    needs: [{ unit: "e-japanese-1-nakama", why: "まとめることばの考えを、大小のなかまにひろげる" }],
    mistakes: [
      { i: 0, root: "e-japanese-1-nakama", why: "まとめることばと中のことばの区別が1年から弱い" },
      { i: 1, root: "e-japanese-2-nakama", why: "見た目でなく、どんな生き物かでなかまを決めていない" },
      { i: 2, root: "e-japanese-2-nakama", why: "きせつと天気のなかまのちがいの未習熟" },
    ],
  },
  {
    unit: "e-japanese-2-setsumei",
    needs: [{ unit: "e-japanese-1-setsumei", why: "「とい」と「こたえ」をさがす読み方をつづけて使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-1-setsumei", why: "「〜でしょう」は問いの文、の見分けが1年から弱い" },
      { i: 1, root: "e-japanese-2-setsumei", why: "じゅんじょのことばに目をつける読み方の未習熟" },
      { i: 2, root: "e-japanese-2-setsumei", why: "文と絵をくらべて読む、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-2-shi",
    needs: [{ unit: "e-japanese-1-shi", why: "声に出してリズムとようすを楽しむ読み方を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-2-shi", why: "行と連のちがいの未習熟" },
      { i: 1, root: "e-japanese-2-shi", why: "ようすを音のようなことばで表す書き方の未習熟" },
      { i: 2, root: "e-japanese-1-shi", why: "声に出してリズムを楽しむ読み方が1年から弱い" },
      { i: 3, root: "e-japanese-2-shi", why: "「〜のように」がたとえだと分かっていない" },
    ],
  },
  {
    unit: "e-japanese-2-shugo",
    needs: [
      { unit: "e-japanese-1-ha-wo-he", why: "「は」がだれ・なにの後につくと分かると主語が見える" },
      { unit: "e-japanese-1-kutoten", why: "「。」までが1つの文と分かると、文の中を調べられる" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-2-shugo", why: "「何が」にあたる言葉をさがす主語の見つけ方の未習熟" },
      { i: 1, root: "e-japanese-1-ha-wo-he", why: "「は」がだれ・なにの後の字だと結びついていない" },
      { i: 2, root: "e-japanese-2-shugo", why: "述語は文の終わりの「どうする」、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-2-teinei",
    needs: [{ unit: "e-japanese-1-kutoten", why: "文の終わりが分かって、そこをです・ますにかえられる" }],
    mistakes: [
      { i: 0, root: "e-japanese-2-teinei", why: "動きのことばには「ます」をつける、の未習熟" },
      { i: 1, root: "e-japanese-2-teinei", why: "「〜い」のことばには「です」をつける、の未習熟" },
      { i: 2, root: "e-japanese-2-teinei", why: "すぎた動きは「ました」にする、の未習熟" },
    ],
  },
  // ───────── 小3 ─────────
  {
    unit: "e-japanese-3-haiku",
    needs: [
      { unit: "e-japanese-1-kana-on", why: "小さい字やのばす音の数え方で十七音を数える" },
      { unit: "e-japanese-2-shi", why: "詩を声に出してリズムを味わう読み方を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-1-kana-on", why: "ねじれた音は小さい字と合わせて一音、が身についていない" },
      { i: 1, root: "e-japanese-1-kana-on", why: "つまる音の「っ」も一つの音、が身についていない" },
      { i: 2, root: "e-japanese-3-haiku", why: "季語は季節らしさが強い時で決まる、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-3-hen-tsukuri",
    needs: [{ unit: "e-japanese-2-kanji", why: "組み立てで漢字を覚えた経験が、部首の理解になる" }],
    mistakes: [
      { i: 0, root: "e-japanese-3-hen-tsukuri", why: "左がへん・右がつくり、場所で名前が決まる、の未習熟" },
      { i: 1, root: "e-japanese-3-hen-tsukuri", why: "さんずいとにすいの画数のちがいの未習熟" },
      { i: 2, root: "e-japanese-3-hen-tsukuri", why: "部首が意味のなかまを表すことの未習熟" },
    ],
  },
  {
    unit: "e-japanese-3-houkoku",
    needs: [
      { unit: "e-japanese-2-kansatsu", why: "見たことと思ったことを分けて書く力を使う" },
      { unit: "e-japanese-2-keiken", why: "はじめ・中・おわりに分けて書く組み立てを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-2-kansatsu", why: "見たこと（事実）と思ったことを分ける力が2年から弱い" },
      { i: 1, root: "e-japanese-3-houkoku", why: "問いを決めてから調べる、の未習熟" },
      { i: 2, root: "e-japanese-3-houkoku", why: "使った本の題名と書いた人を書く、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-3-jisho",
    needs: [
      { unit: "e-japanese-1-hiragana", why: "あいうえおのならびで、ことばをさがす" },
      { unit: "e-japanese-1-kana-on", why: "小さい字・にごる音のならび方を知る土台" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-3-jisho", why: "言い切りの形にしてから引く、の未習熟" },
      { i: 1, root: "e-japanese-1-kana-on", why: "大きい字と小さい字のちがいがあいまい" },
      { i: 2, root: "e-japanese-3-jisho", why: "文に合う意味をえらぶ、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-3-kanji",
    needs: [{ unit: "e-japanese-2-kanji", why: "読み方が一つでない・送りがなの考えを3年の字に使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-3-kanji", why: "形がかわる所から送る送りがなの決まりの未習熟" },
      { i: 1, root: "e-japanese-3-kanji", why: "同じ読みの漢字を意味で使い分ける、の未習熟" },
      { i: 2, root: "e-japanese-3-kanji", why: "二字の熟語は音読みが多い、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-3-kosoado",
    needs: [{ unit: "e-japanese-2-setsumei", why: "文と文のつながりを追う読み方が、指す言葉さがしの土台" }],
    mistakes: [
      { i: 0, root: "e-japanese-3-kosoado", why: "聞く人の近くは「そ」、という使い分けの未習熟" },
      { i: 1, root: "e-japanese-3-kosoado", why: "指す言葉はまず前からさがす、の未習熟" },
      { i: 2, root: "e-japanese-3-shushokugo", why: "くわしくする言葉までふくめてとらえる力が弱い" },
    ],
  },
  {
    unit: "e-japanese-3-kotowaza",
    needs: [{ unit: "e-japanese-2-shi", why: "「〜のように」のたとえの読み方が、ことわざの土台" }],
    mistakes: [
      { i: 0, root: "e-japanese-3-kotowaza", why: "ことわざはたとえで教える、の未習熟" },
      { i: 1, root: "e-japanese-3-kotowaza", why: "慣用句は合わさって意味がかわる、の未習熟" },
      { i: 2, root: "e-japanese-3-kotowaza", why: "慣用句は言葉が決まっている、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-3-monogatari",
    needs: [{ unit: "e-japanese-2-monogatari", why: "場面と気持ちのへんかを追う読み方をつづけて使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-2-monogatari", why: "お話のことばを手がかりにする読み方が2年から弱い" },
      { i: 1, root: "e-japanese-3-monogatari", why: "したこと・様子にも気持ちが出る、の未習熟" },
      { i: 2, root: "e-japanese-3-monogatari", why: "気持ちがかわったきっかけをさがす、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-3-romaji",
    needs: [
      { unit: "e-japanese-1-hiragana", why: "五十音の行と段が、子音と母音の組み合わせになる" },
      { unit: "e-japanese-1-kana-on", why: "つまる音・のばす音の考えをローマ字でも使う" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-1-kana-on", why: "「っ」が一つの音として入る、の感覚があいまい" },
      { i: 1, root: "e-japanese-3-romaji", why: "「ん」の後ろに母音・yが来るときの書き方の未習熟" },
      { i: 2, root: "e-japanese-3-romaji", why: "地名・人名は大文字で始める、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-3-setsumei",
    needs: [{ unit: "e-japanese-2-setsumei", why: "問いと答え・じゅんじょの言葉の読み方を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-2-setsumei", why: "問いの文の後に答えがある、が2年から身についていない" },
      { i: 1, root: "e-japanese-3-setsumei", why: "れいとまとめの区別の未習熟" },
      { i: 2, root: "e-japanese-3-setsumei", why: "段落が一ます下げのまとまり、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-3-shi",
    needs: [{ unit: "e-japanese-2-shi", why: "行と連・たとえの読み方をつづけて使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-2-shi", why: "行と連のちがいが2年から身についていない" },
      { i: 1, root: "e-japanese-3-shi", why: "人のように書く書き方の未習熟" },
      { i: 2, root: "e-japanese-1-shi", why: "様子の言葉から場面をうかべる読み方が弱い" },
    ],
  },
  {
    unit: "e-japanese-3-shushokugo",
    needs: [{ unit: "e-japanese-2-shugo", why: "主語・述語の骨組みが分かって、くわしくする言葉が分かる" }],
    mistakes: [
      { i: 0, root: "e-japanese-3-shushokugo", why: "つなげて読んでたしかめる、の未習熟" },
      { i: 1, root: "e-japanese-3-shushokugo", why: "修飾語ははなれていることもある、の未習熟" },
      { i: 2, root: "e-japanese-2-shugo", why: "「だれが」にあたる主語の見つけ方が2年から弱い" },
      { i: 3, root: "e-japanese-3-shushokugo", why: "大事な修飾語をえらぶ、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-3-tegami",
    needs: [
      { unit: "e-japanese-2-teinei", why: "です・ますのていねいな文で手紙を書く" },
      { unit: "e-japanese-2-keiken", why: "したことをくわしく書く力を本文に使う" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-3-tegami", why: "「様」は相手をうやまう言葉、の未習熟" },
      { i: 1, root: "e-japanese-3-tegami", why: "手紙の組み立て（はじめのあいさつ）の未習熟" },
      { i: 2, root: "e-japanese-2-keiken", why: "何がどうだったかをくわしく書く力が2年から弱い" },
    ],
  },
  {
    unit: "e-japanese-3-tsunagi",
    needs: [{ unit: "e-japanese-2-setsumei", why: "「はじめに」などのつなぐ言葉の読み方を広げる" }],
    mistakes: [
      { i: 0, root: "e-japanese-3-tsunagi", why: "予想とちがう結果は「でも」でつなぐ、の未習熟" },
      { i: 1, root: "e-japanese-3-tsunagi", why: "「なぜなら」は「〜から」とセット、の未習熟" },
      { i: 2, root: "e-japanese-3-tsunagi", why: "「それとも」はえらぶときの言葉、の未習熟" },
    ],
  },
  // ───────── 小4 ─────────
  {
    unit: "e-japanese-4-bun-kumitate",
    needs: [{ unit: "e-japanese-3-shushokugo", why: "主語・述語と修飾語を見分ける力で組み立てを見る" }],
    mistakes: [
      { i: 0, root: "e-japanese-2-shugo", why: "「何が」にあたる主語の見つけ方が2年から弱い" },
      { i: 1, root: "e-japanese-2-shugo", why: "「は」「も」の形でも主語になる、が身についていない" },
      { i: 2, root: "e-japanese-3-shushokugo", why: "つなげて読んでかかり先をたしかめる力が弱い" },
      { i: 3, root: "e-japanese-3-shushokugo", why: "修飾語が主語より前に来る文になれていない" },
    ],
  },
  {
    unit: "e-japanese-4-douon",
    needs: [{ unit: "e-japanese-3-kanji", why: "同じ読みの漢字を意味で使い分ける考えを広げる" }],
    mistakes: [
      { i: 0, root: "e-japanese-4-douon", why: "物の温度と気温の「あつい」の書き分けの未習熟" },
      { i: 1, root: "e-japanese-3-kanji", why: "「速い」と「早い」の使い分けが3年から弱い" },
      { i: 2, root: "e-japanese-4-douon", why: "「会う」と「合う」の意味のちがいの未習熟" },
    ],
  },
  {
    unit: "e-japanese-4-iken",
    needs: [
      { unit: "e-japanese-3-houkoku", why: "事実と考えを分け、組み立てて書く力を使う" },
      { unit: "e-japanese-3-tsunagi", why: "「なぜなら〜から」で理由をつなぐ書き方を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-3-tsunagi", why: "「なぜなら〜から」で理由を書く形が身についていない" },
      { i: 1, root: "e-japanese-4-iken", why: "考えをそのままささえる理由をえらぶ、の未習熟" },
      { i: 2, root: "e-japanese-4-iken", why: "終わりではじめの考えをまとめ直す、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-4-kanji",
    needs: [
      { unit: "e-japanese-3-kanji", why: "音と訓・送りがなの考えを4年の字にも使う" },
      { unit: "e-japanese-3-hen-tsukuri", why: "へんで形のにた漢字を見分ける" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-4-kanji", why: "「未」と「末」の横ぼうの長さのちがいの未習熟" },
      { i: 1, root: "e-japanese-3-kanji", why: "送りがなを形がかわる所から送る決まりが弱い" },
      { i: 2, root: "e-japanese-3-hen-tsukuri", why: "へんの意味（土・山）で字を見分ける力が弱い" },
    ],
  },
  {
    unit: "e-japanese-4-kanji-jiten",
    needs: [
      { unit: "e-japanese-3-hen-tsukuri", why: "部首が分かって、部首さくいんが引ける" },
      { unit: "e-japanese-3-jisho", why: "国語辞典で、ならび順にそって引く経験を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-2-kanji", why: "書きじゅんと画数の数え方が2年から身についていない" },
      { i: 1, root: "e-japanese-4-kanji-jiten", why: "部首をのぞいた画数でならぶ、の未習熟" },
      { i: 2, root: "e-japanese-4-kanji-jiten", why: "三つのさくいんの使い分けの未習熟" },
    ],
  },
  {
    unit: "e-japanese-4-kanyoku",
    needs: [{ unit: "e-japanese-3-kotowaza", why: "3年で知った慣用句を、体や物の言葉に広げる" }],
    mistakes: [
      { i: 0, root: "e-japanese-4-kanyoku", why: "「口がかたい」の決まった意味の未習熟" },
      { i: 1, root: "e-japanese-3-kotowaza", why: "慣用句は言葉どおりの意味でない、が3年から弱い" },
      { i: 2, root: "e-japanese-3-kotowaza", why: "慣用句は言葉が決まっている、が3年から弱い" },
    ],
  },
  {
    unit: "e-japanese-4-koji",
    needs: [{ unit: "e-japanese-3-kotowaza", why: "ことわざのように、短い言葉に教えがこもる考えを使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-4-koji", why: "故事成語は昔の中国の話から、の未習熟" },
      { i: 1, root: "e-japanese-4-koji", why: "「五十歩百歩」のもとの話の未習熟" },
      { i: 2, root: "e-japanese-4-koji", why: "「蛇足」のもとの話の未習熟" },
    ],
  },
  {
    unit: "e-japanese-4-monogatari",
    needs: [{ unit: "e-japanese-3-monogatari", why: "気持ちの変わり方とそのきっかけを追う読み方を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-3-monogatari", why: "したこと・様子から気持ちを読む力が3年から弱い" },
      { i: 1, root: "e-japanese-3-monogatari", why: "きっかけの場面を本文からさがす力が3年から弱い" },
      { i: 2, root: "e-japanese-4-monogatari", why: "景色に気持ちが重なる書き方の未習熟" },
    ],
  },
  {
    unit: "e-japanese-4-okurigana",
    needs: [{ unit: "e-japanese-3-kanji", why: "3年の送りがなの決まりを、例外までふくめて広げる" }],
    mistakes: [
      { i: 0, root: "e-japanese-2-kanji", why: "「新しい」の送りがなが2年から身についていない" },
      { i: 1, root: "e-japanese-4-okurigana", why: "決まりからはずれる言葉の未習熟" },
      { i: 2, root: "e-japanese-4-okurigana", why: "形がかわらない言葉の送り方の未習熟" },
    ],
  },
  {
    unit: "e-japanese-4-setsumei",
    needs: [
      { unit: "e-japanese-3-setsumei", why: "問い・れい・まとめの組み立てで読む力を使う" },
      { unit: "e-japanese-3-tsunagi", why: "つなぎ言葉で段落どうしの関係をつかむ" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-3-setsumei", why: "段落は一ます下げのまとまり、が3年から弱い" },
      { i: 1, root: "e-japanese-4-setsumei", why: "中心の文をつないで要約する、の未習熟" },
      { i: 2, root: "e-japanese-4-setsumei", why: "文の終わりで事実か考えかを見分ける、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-4-shi",
    needs: [{ unit: "e-japanese-3-shi", why: "行と連・たとえの読み方をつづけて使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-2-shi", why: "行と連のちがいが2年から身についていない" },
      { i: 1, root: "e-japanese-2-shi", why: "「〜のような」がたとえだという理解が弱い" },
      { i: 2, root: "e-japanese-4-shi", why: "詩の言葉を理由にして気持ちを読む、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-4-shinbun",
    needs: [{ unit: "e-japanese-3-houkoku", why: "調べたことを事実と考えに分けて書く力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-4-shinbun", why: "大事なことから先に書く新聞の書き方の未習熟" },
      { i: 1, root: "e-japanese-4-shinbun", why: "見出しは中身が分かる言葉にする、の未習熟" },
      { i: 2, root: "e-japanese-3-houkoku", why: "事実と考えを分けて書く力が3年から弱い" },
    ],
  },
  {
    unit: "e-japanese-4-tanka",
    needs: [{ unit: "e-japanese-3-haiku", why: "五・七・五の音の数え方を、三十一音に広げる" }],
    mistakes: [
      { i: 0, root: "e-japanese-4-tanka", why: "短歌と俳句の音の数のちがいの未習熟" },
      { i: 1, root: "e-japanese-1-kana-on", why: "ねじれた音は小さい字と合わせて一音、が弱い" },
      { i: 2, root: "e-japanese-4-tanka", why: "区切って声に出し、リズムを味わう読み方の未習熟" },
    ],
  },
  // ───────── 小5 ─────────
  {
    unit: "e-japanese-5-bun-kumitate",
    needs: [{ unit: "e-japanese-4-bun-kumitate", why: "主語・述語・修飾語の組み立てを、文の型に広げる" }],
    mistakes: [
      { i: 0, root: "e-japanese-3-shushokugo", why: "「ぼくの」は修飾語、の見分けが3年から弱い" },
      { i: 1, root: "e-japanese-4-bun-kumitate", why: "述語から主語をさがす手順が4年から弱い" },
      { i: 2, root: "e-japanese-5-bun-kumitate", why: "主語と述語を合わせる（ねじれ）の未習熟" },
    ],
  },
  {
    unit: "e-japanese-5-denki",
    needs: [{ unit: "e-japanese-4-monogatari", why: "人物の気持ちと行動を結びつけて読む力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-denki", why: "伝記には書き手の想像がまじる、の未習熟" },
      { i: 1, root: "e-japanese-5-denki", why: "出来事と考え・行動を結びつける、の未習熟" },
      { i: 2, root: "e-japanese-4-monogatari", why: "場面・わけ・自分ならで感想をまとめる力が弱い" },
    ],
  },
  {
    unit: "e-japanese-5-douon",
    needs: [{ unit: "e-japanese-4-douon", why: "同じ読みを意味で選ぶ考えを熟語に広げる" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-douon", why: "熟語の意味から字を選ぶ、の未習熟" },
      { i: 1, root: "e-japanese-5-douon", why: "「測る」と「計る」の使い分けの未習熟" },
      { i: 2, root: "e-japanese-5-douon", why: "「解答」と「回答」の意味のちがいの未習熟" },
    ],
  },
  {
    unit: "e-japanese-5-houkoku",
    needs: [
      { unit: "e-japanese-4-shinbun", why: "事実と感想を分け、大事なことから書く力を使う" },
      { unit: "e-math-4-oresen", why: "グラフの読み方が、資料で数を示す土台になる" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-4-shinbun", why: "事実と感想を分けて書く力が4年から弱い" },
      { i: 1, root: "e-japanese-5-houkoku", why: "数で正しく示す書き方の未習熟" },
      { i: 2, root: "e-japanese-5-houkoku", why: "資料から言えることの範囲をおさえる、の未習熟" },
      { i: 3, root: "e-japanese-3-houkoku", why: "使った本を書きのこす習慣が3年から弱い" },
    ],
  },
  {
    unit: "e-japanese-5-jukugo",
    needs: [{ unit: "e-japanese-4-kanji", why: "一字の意味から熟語の意味を考える力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-jukugo", why: "下から上へ返して読む型の未習熟" },
      { i: 1, root: "e-japanese-2-hantai", why: "反対の意味の言葉の組がつかめていない" },
      { i: 2, root: "e-japanese-5-jukugo", why: "「未」が下を打ち消す型の未習熟" },
    ],
  },
  {
    unit: "e-japanese-5-kanji",
    needs: [{ unit: "e-japanese-4-kanji", why: "音と訓・形のにた字の見分けを5年の字に使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-4-okurigana", why: "送りがなの決まりと例外が4年から身についていない" },
      { i: 1, root: "e-japanese-3-hen-tsukuri", why: "部首の意味で字を見分ける力が弱い" },
      { i: 2, root: "e-japanese-3-hen-tsukuri", why: "へんが意味のなかまを表す、の理解が弱い" },
    ],
  },
  {
    unit: "e-japanese-5-keigo",
    needs: [{ unit: "e-japanese-2-teinei", why: "です・ますの丁寧語が、敬語の一つ目になる" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-keigo", why: "だれの動作かで尊敬語・謙譲語を選ぶ、の未習熟" },
      { i: 1, root: "e-japanese-5-keigo", why: "自分の動作には謙譲語、の未習熟" },
      { i: 2, root: "e-japanese-5-keigo", why: "外の人には身内を高めない、の未習熟" },
      { i: 3, root: "e-japanese-5-keigo", why: "敬語を二重にしない、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-5-koten",
    needs: [
      { unit: "e-japanese-4-tanka", why: "百人一首で昔の言葉のリズムにふれた経験を使う" },
      { unit: "e-japanese-4-koji", why: "昔の中国の話になじむと、漢文に入りやすい" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-5-koten", why: "歴史的かなづかいの読み方の未習熟" },
      { i: 1, root: "e-japanese-5-koten", why: "昔と今で意味が変わった言葉の未習熟" },
      { i: 2, root: "e-japanese-5-koten", why: "随筆と物語のちがいの未習熟" },
      { i: 3, root: "e-japanese-5-koten", why: "古典はまず声に出して味わう、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-5-monogatari",
    needs: [{ unit: "e-japanese-4-monogatari", why: "山場と気持ちのかわるきっかけを読む力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-4-monogatari", why: "会話・行動・景色から気持ちを読む力が4年から弱い" },
      { i: 1, root: "e-japanese-4-monogatari", why: "きっかけで前後の気持ちを結ぶ読み方が弱い" },
      { i: 2, root: "e-japanese-4-monogatari", why: "景色に気持ちが重なる、の理解が4年から弱い" },
    ],
  },
  {
    unit: "e-japanese-5-setsumei",
    needs: [{ unit: "e-japanese-4-setsumei", why: "段落の役わりと中心の文をつかむ読み方を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-4-setsumei", why: "例と中心の文を分ける力が4年から弱い" },
      { i: 1, root: "e-japanese-4-setsumei", why: "文末で事実か考えかを見分ける力が弱い" },
      { i: 2, root: "e-japanese-4-setsumei", why: "例を省いて要約する力が4年から弱い" },
    ],
  },
  {
    unit: "e-japanese-5-shi",
    needs: [{ unit: "e-japanese-4-shi", why: "表現のくふうから様子と気持ちを読む力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-shi", why: "言い切るたとえ（隠喩）の未習熟" },
      { i: 1, root: "e-japanese-5-shi", why: "擬人法は人のような動きや気持ち、の未習熟" },
      { i: 2, root: "e-japanese-5-shi", why: "工夫の働き（効果）まで考える、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-5-suisen",
    needs: [{ unit: "e-japanese-4-iken", why: "考えに理由と例をそえて書く力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-4-iken", why: "理由に例や事実をそえる力が4年から弱い" },
      { i: 1, root: "e-japanese-5-suisen", why: "相手にとってのよさを考える、の未習熟" },
      { i: 2, root: "e-japanese-5-suisen", why: "書き出しで何をすすめるかを示す、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-5-wago",
    needs: [
      { unit: "e-japanese-3-kanji", why: "音読みと訓読みの区別が、和語と漢語の見分けになる" },
      { unit: "e-japanese-2-katakana", why: "外国から来た言葉を知ると、外来語が分かる" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-3-kanji", why: "訓読みは日本のもとの言葉、の理解が弱い" },
      { i: 1, root: "e-japanese-2-katakana", why: "外国から来た言葉という考えが弱く、表記で決める" },
      { i: 2, root: "e-japanese-5-wago", why: "組み合わせた言葉（混種語）の未習熟" },
    ],
  },
  // ───────── 小6 ─────────
  {
    unit: "e-japanese-6-hanashi-kaki",
    needs: [{ unit: "e-japanese-2-teinei", why: "文末をそろえる考えが、書き言葉の土台になる" }],
    mistakes: [
      { i: 0, root: "e-japanese-6-hanashi-kaki", why: "くだけた話し言葉と書き言葉の区別の未習熟" },
      { i: 1, root: "e-japanese-2-teinei", why: "一つの文章では文末をそろえる、が2年から弱い" },
      { i: 2, root: "e-japanese-6-hanashi-kaki", why: "場面に合わせて言葉を選ぶ、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-6-iken",
    needs: [
      { unit: "e-japanese-4-iken", why: "考え・理由・例の組み立てを、意見文に広げる" },
      { unit: "e-japanese-5-setsumei", why: "事実と考えを区別する読み方を、書くときに使う" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-5-suisen", why: "先に結論を示す書き方が5年から身についていない" },
      { i: 1, root: "e-japanese-4-iken", why: "理由に事実をそえる力が4年から弱い" },
      { i: 2, root: "e-japanese-4-iken", why: "終わりではじめの考えをまとめる力が弱い" },
    ],
  },
  {
    unit: "e-japanese-6-kana-yurai",
    needs: [
      { unit: "e-japanese-1-katakana", why: "ひらがなとかたかなの両方を知って由来をくらべる" },
      { unit: "e-japanese-5-koten", why: "昔の文章にふれた経験が、文字の歴史の土台" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-1-hiragana", why: "平仮名は漢字をくずした、の知識があいまい" },
      { i: 1, root: "e-japanese-6-kana-yurai", why: "音だけを借りた漢字（万葉仮名）の未習熟" },
      { i: 2, root: "e-japanese-6-kana-yurai", why: "もとの漢字が同じとはかぎらない、の未習熟" },
      { i: 3, root: "e-japanese-6-kana-yurai", why: "仮名は長い時間で生まれた、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-6-kanji",
    needs: [{ unit: "e-japanese-5-kanji", why: "部首と音の部分を手がかりにする力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-6-kanji", why: "「専」と「博」の形のちがいの未習熟" },
      { i: 1, root: "e-japanese-6-kanji", why: "下の部分で意味が決まる、の未習熟" },
      { i: 2, root: "e-japanese-4-douon", why: "同じ読みを意味で選ぶ力が4年から弱い" },
      { i: 3, root: "e-japanese-3-hen-tsukuri", why: "部首が意味のなかまを表す、の理解が弱い" },
    ],
  },
  {
    unit: "e-japanese-6-kotoba-henka",
    needs: [{ unit: "e-japanese-5-koten", why: "古典の言葉にふれて、今とのちがいに気づける" }],
    mistakes: [
      { i: 0, root: "e-japanese-6-kotoba-henka", why: "意味が変わった言葉の未習熟" },
      { i: 1, root: "e-japanese-5-koten", why: "歴史的かなづかいの読み方が5年から弱い" },
      { i: 2, root: "e-japanese-6-kotoba-henka", why: "言葉は変わり続けるもの、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-6-monogatari",
    needs: [{ unit: "e-japanese-5-monogatari", why: "心情の変化ときっかけを読む力を主題につなげる" }],
    mistakes: [
      { i: 0, root: "e-japanese-6-monogatari", why: "心情の変化から主題を考える、の未習熟" },
      { i: 1, root: "e-japanese-5-monogatari", why: "情景に心情を重ねる読み方が5年から弱い" },
      { i: 2, root: "e-japanese-6-monogatari", why: "語り手から見えることの範囲の未習熟" },
    ],
  },
  {
    unit: "e-japanese-6-setsumei",
    needs: [{ unit: "e-japanese-5-setsumei", why: "事実と考えを分け、要旨をつかむ力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-3-setsumei", why: "問いの文の後に答えがある、が身についていない" },
      { i: 1, root: "e-japanese-5-setsumei", why: "例を省いて要旨をまとめる力が5年から弱い" },
      { i: 2, root: "e-japanese-5-setsumei", why: "文末で考えを見分ける力が5年から弱い" },
    ],
  },
  {
    unit: "e-japanese-6-shi",
    needs: [{ unit: "e-japanese-5-shi", why: "比喩などの表現の工夫を見つける力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-shi", why: "言い切るたとえ（隠喩）が5年から身についていない" },
      { i: 1, root: "e-japanese-5-shi", why: "工夫の働きまで考える力が5年から弱い" },
      { i: 2, root: "e-japanese-2-shi", why: "行と連のちがいが2年から身についていない" },
    ],
  },
  {
    unit: "e-japanese-6-yojijukugo",
    needs: [{ unit: "e-japanese-5-jukugo", why: "二字熟語の組み立てを、二字＋二字に使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-6-yojijukugo", why: "字の意味から正しい字を選ぶ、の未習熟" },
      { i: 1, root: "e-japanese-6-yojijukugo", why: "四字熟語の意味と使い方の未習熟" },
      { i: 2, root: "e-japanese-6-yojijukugo", why: "字の意味から正しい字を選ぶ、の未習熟" },
      { i: 3, root: "e-japanese-6-yojijukugo", why: "二字＋二字に分けて意味を考える、の未習熟" },
    ],
  },
  {
    unit: "e-japanese-6-zuihitsu",
    needs: [
      { unit: "e-japanese-2-keiken", why: "経験を一つえらんでくわしく書く力を使う" },
      { unit: "e-japanese-4-iken", why: "考えを書く力が、出来事から考えへつなぐ土台" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-6-zuihitsu", why: "出来事から考えたことまで書く、の未習熟" },
      { i: 1, root: "e-japanese-2-keiken", why: "様子をくわしく書く力が2年から弱い" },
      { i: 2, root: "e-japanese-2-keiken", why: "書くことを一つにしぼる力が2年から弱い" },
    ],
  },
  // ───────── 中1 ─────────
  {
    unit: "j-ja-1-kanji",
    needs: [{ unit: "e-japanese-6-kanji", why: "音の部分と部首で漢字をまとめる力を使う" }],
    mistakes: [
      { i: 0, root: "j-ja-1-kanji", why: "部首の位置（かまえ）と意味の分類の未習熟" },
      { i: 1, root: "e-japanese-4-okurigana", why: "送りがなの決まりが小4から身についていない" },
      { i: 2, root: "e-japanese-5-douon", why: "同音異義語を意味で書き分ける力が小5から弱い" },
    ],
  },
  {
    unit: "j-ja-1-goi",
    needs: [
      { unit: "e-japanese-5-wago", why: "和語・漢語・外来語の区別を語彙の整理に使う" },
      { unit: "e-japanese-5-jukugo", why: "熟語の組み立てが、対義語を覚える土台" },
      { unit: "e-japanese-4-kanyoku", why: "慣用句は決まった意味で使う、の理解を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-1-goi", why: "慣用句の正しい意味の未習熟" },
      { i: 1, root: "j-ja-1-goi", why: "「役不足」と「力不足」の区別の未習熟" },
      { i: 2, root: "j-ja-1-goi", why: "「ためならず」の古い言い方の意味の未習熟" },
      { i: 3, root: "j-ja-1-goi", why: "「棹さす」のもとの様子の未習熟" },
    ],
  },
  {
    unit: "j-ja-1-bunpo-tani",
    needs: [{ unit: "e-japanese-5-bun-kumitate", why: "文の組み立てを知って、文を単位に分けられる" }],
    mistakes: [
      { i: 0, root: "j-ja-1-bunpo-tani", why: "「〜ている」の「いる」も文節になる、の未習熟" },
      { i: 1, root: "j-ja-1-bunpo-tani", why: "付属語は単独で文節にならない、の未習熟" },
      { i: 2, root: "e-japanese-3-setsumei", why: "段落は内容のまとまり、が小3から身についていない" },
    ],
  },
  {
    unit: "j-ja-1-bunpo-seibun",
    needs: [
      { unit: "j-ja-1-bunpo-tani", why: "文節に区切れて、文節どうしの関係が分かる" },
      { unit: "e-japanese-5-bun-kumitate", why: "主語・述語・修飾語の見分けを成分に広げる" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-4-bun-kumitate", why: "「も」などでも主語になる、が小学校から弱い" },
      { i: 1, root: "j-ja-1-bunpo-seibun", why: "独立語と接続語の区別の未習熟" },
      { i: 2, root: "j-ja-1-bunpo-seibun", why: "「〜を」は修飾語、という成分の見分けの未習熟" },
    ],
  },
  {
    unit: "j-ja-1-bunpo-hinshi",
    needs: [{ unit: "j-ja-1-bunpo-tani", why: "単語に分けられて、はじめて品詞が決められる" }],
    mistakes: [
      { i: 0, root: "j-ja-1-bunpo-hinshi", why: "活用するかどうかで形容詞と連体詞を分ける、の未習熟" },
      { i: 1, root: "j-ja-1-bunpo-hinshi", why: "言い切りの形で用言を見分ける、の未習熟" },
      { i: 2, root: "j-ja-1-bunpo-tani", why: "単独で文節を作れるか（自立語か）の見分けが弱い" },
    ],
  },
  {
    unit: "j-ja-1-hanasu",
    needs: [
      { unit: "e-japanese-6-hanashi-kaki", why: "話し言葉の特ちょうを知って、話し方を選べる" },
      { unit: "e-japanese-6-iken", why: "主張と根拠の組み立てを、スピーチに使う" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-6-iken", why: "主張を先に示す組み立てが小6から弱い" },
      { i: 1, root: "j-ja-1-hanasu", why: "キーワードだけを短くメモする、の未習熟" },
      { i: 2, root: "j-ja-1-hanasu", why: "受け止めてから意見をつなぐ、の未習熟" },
    ],
  },
  {
    unit: "j-ja-1-kaku",
    needs: [{ unit: "e-japanese-5-houkoku", why: "結果と考えを分け、資料で示す報告の書き方を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-houkoku", why: "結果と考えを段落で分ける力が小5から弱い" },
      { i: 1, root: "e-japanese-5-houkoku", why: "引用と出典の書き方が小5から身についていない" },
      { i: 2, root: "e-japanese-5-bun-kumitate", why: "主語と述語を合わせる力（ねじれ）が小5から弱い" },
    ],
  },
  {
    unit: "j-ja-1-kanbun",
    needs: [
      { unit: "e-japanese-5-koten", why: "漢文を日本語の順に直して読む経験を使う" },
      { unit: "e-japanese-4-koji", why: "故事成語のもとの話を、漢文で読み直す" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-1-kanbun", why: "レ点は下の字を先に読む、の未習熟" },
      { i: 1, root: "j-ja-1-kanbun", why: "置き字は読まない、の未習熟" },
      { i: 2, root: "e-japanese-4-koji", why: "「五十歩百歩」のもとの話が小4から弱い" },
    ],
  },
  {
    unit: "j-ja-1-kobun",
    needs: [
      { unit: "e-japanese-5-koten", why: "歴史的かなづかいを今の読み方に直す経験を使う" },
      { unit: "e-japanese-6-kotoba-henka", why: "言葉の意味や書き方は時代で変わる、の理解を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-1-kobun", why: "は行の読みかえは語頭以外だけ、の未習熟" },
      { i: 1, root: "e-japanese-5-koten", why: "「ふ」を「う」と読む決まりが小5から弱い" },
      { i: 2, root: "e-japanese-6-kotoba-henka", why: "「うつくし」の昔の意味が小6から身についていない" },
    ],
  },
  {
    unit: "j-ja-1-monogatari",
    needs: [{ unit: "e-japanese-6-monogatari", why: "心情の変化ときっかけから主題を読む力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-monogatari", why: "本文の行動・会話を根拠にする読み方が弱い" },
      { i: 1, root: "e-japanese-6-monogatari", why: "情景と心情を結ぶ読み方が小6から弱い" },
      { i: 2, root: "e-japanese-6-monogatari", why: "あらすじと主題の区別が小6から弱い" },
    ],
  },
  {
    unit: "j-ja-1-setsumei",
    needs: [{ unit: "e-japanese-6-setsumei", why: "構成・事実と意見・主張の位置で読む力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-6-setsumei", why: "具体例を省いて要旨をまとめる力が小6から弱い" },
      { i: 1, root: "e-japanese-6-setsumei", why: "問いの文と主張の区別が小6から弱い" },
      { i: 2, root: "j-ja-1-setsumei", why: "他人の考えの紹介と筆者の意見の区別の未習熟" },
    ],
  },
  {
    unit: "j-ja-1-shi",
    needs: [{ unit: "e-japanese-6-shi", why: "連の組み立てと表現技法を読む力を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-shi", why: "擬人法と隠喩の見分けが小5から弱い" },
      { i: 1, root: "j-ja-1-shi", why: "推定の「ようだ」と比喩の区別の未習熟" },
      { i: 2, root: "j-ja-1-shi", why: "自由詩の「自由」は形式のこと、の未習熟" },
    ],
  },
  // ───────── 中2 ─────────
  {
    unit: "j-ja-2-bunpo-fuzoku",
    needs: [{ unit: "j-ja-1-bunpo-hinshi", why: "自立語と付属語、活用の有無の区別を使う" }],
    mistakes: [
      { i: 0, root: "j-ja-1-bunpo-hinshi", why: "形容詞の「ない」と助動詞の「ない」の区別が弱い" },
      { i: 1, root: "j-ja-2-bunpo-fuzoku", why: "格助詞と副助詞のはたらきのちがいの未習熟" },
      { i: 2, root: "j-ja-2-bunpo-fuzoku", why: "「れる」の自発の意味の未習熟" },
    ],
  },
  {
    unit: "j-ja-2-bunpo-yogen",
    needs: [{ unit: "j-ja-1-bunpo-hinshi", why: "用言（動詞・形容詞・形容動詞）を見分けて活用を学ぶ" }],
    mistakes: [
      { i: 0, root: "j-ja-2-bunpo-yogen", why: "「ない」をつけて活用の種類を見分ける、の未習熟" },
      { i: 1, root: "j-ja-2-bunpo-yogen", why: "可能動詞は下一段、の未習熟" },
      { i: 2, root: "j-ja-1-bunpo-hinshi", why: "言い切りの形で形容動詞を見分ける力が弱い" },
    ],
  },
  {
    unit: "j-ja-2-goi",
    needs: [
      { unit: "j-ja-1-goi", why: "語彙をなかまと反対で整理する力を使う" },
      { unit: "e-japanese-6-yojijukugo", why: "四字熟語の組み立てと意味の理解を使う" },
      { unit: "j-ja-1-kanbun", why: "故事成語のもとの話を漢文で読んだ経験を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-4-koji", why: "「蛇足」のもとの話が小4から身についていない" },
      { i: 1, root: "e-japanese-5-jukugo", why: "下から返して読む熟語の型が小5から弱い" },
      { i: 2, root: "e-japanese-4-kanyoku", why: "慣用句は言葉どおりでない、の理解が弱い" },
      { i: 3, root: "j-ja-1-goi", why: "「棹さす」の意味が中1から身についていない" },
    ],
  },
  {
    unit: "j-ja-2-hanasu",
    needs: [{ unit: "j-ja-1-hanasu", why: "結論を先に話し、メモして聞く力を使う" }],
    mistakes: [
      { i: 0, root: "j-ja-1-hanasu", why: "結論を先に示す話し方が中1から弱い" },
      { i: 1, root: "j-ja-1-hanasu", why: "キーワードだけメモする聞き方が中1から弱い" },
      { i: 2, root: "j-ja-2-hanasu", why: "答えを受けて質問を重ねる、の未習熟" },
    ],
  },
  {
    unit: "j-ja-2-ikenbun",
    needs: [
      { unit: "j-ja-1-kaku", why: "事実と考えを分けて書く力を、意見文に使う" },
      { unit: "e-japanese-6-iken", why: "主張・根拠・反論への答えの組み立てを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-6-iken", why: "序論で主張を示す書き方が小6から弱い" },
      { i: 1, root: "e-japanese-6-iken", why: "確かめられる事実を根拠にする力が小6から弱い" },
      { i: 2, root: "j-ja-2-ikenbun", why: "反論に答えて主張にもどる、の未習熟" },
      { i: 3, root: "e-japanese-6-hanashi-kaki", why: "文末をそろえる書き言葉の力が小6から弱い" },
    ],
  },
  {
    unit: "j-ja-2-kanji",
    needs: [{ unit: "j-ja-1-kanji", why: "成り立ち・部首・同音異義語の理解を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-douon", why: "同音異義語を意味で選ぶ力が小5から弱い" },
      { i: 1, root: "e-japanese-5-kanji", why: "部首の意味で形のにた字を見分ける力が弱い" },
      { i: 2, root: "e-japanese-4-okurigana", why: "送りがなの決まりが小4から身についていない" },
    ],
  },
  {
    unit: "j-ja-2-kanshi",
    needs: [{ unit: "j-ja-1-kanbun", why: "返り点と書き下し文のきまりで漢詩を読む" }],
    mistakes: [
      { i: 0, root: "j-ja-2-kanshi", why: "句数で絶句・律詩を分ける、の未習熟" },
      { i: 1, root: "j-ja-1-kanbun", why: "書き下し文で助動詞はひらがな、が中1から弱い" },
      { i: 2, root: "j-ja-2-kanshi", why: "起承転結の句の順番の未習熟" },
      { i: 3, root: "j-ja-2-kanshi", why: "対句は組み立てが同じ二句、の未習熟" },
    ],
  },
  {
    unit: "j-ja-2-keigo",
    needs: [{ unit: "e-japanese-5-keigo", why: "尊敬語・謙譲語・丁寧語の区別を深める" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-keigo", why: "相手の動作には尊敬語、が小5から身についていない" },
      { i: 1, root: "e-japanese-5-keigo", why: "外の人に身内を高めない、が小5から弱い" },
      { i: 2, root: "e-japanese-5-keigo", why: "だれの動作かで敬語を選ぶ力が小5から弱い" },
      { i: 3, root: "e-japanese-5-keigo", why: "二重敬語をさける、が小5から身についていない" },
    ],
  },
  {
    unit: "j-ja-2-kobun",
    needs: [{ unit: "j-ja-1-kobun", why: "歴史的仮名遣いと古語の意味の基礎を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-koten", why: "「をかし」の昔の意味が小5から身についていない" },
      { i: 1, root: "j-ja-1-kobun", why: "語頭以外の「は」を「わ」に直す、が中1から弱い" },
      { i: 2, root: "j-ja-2-kobun", why: "「こそ」は已然形で結ぶ、の未習熟" },
      { i: 3, root: "j-ja-2-kobun", why: "作品と作者・時代の組み合わせの未習熟" },
    ],
  },
  {
    unit: "j-ja-2-setsumei",
    needs: [{ unit: "j-ja-1-setsumei", why: "構成と接続語を道しるべに読む力を使う" }],
    mistakes: [
      { i: 0, root: "j-ja-1-setsumei", why: "例とまとめを区別する力が中1から弱い" },
      { i: 1, root: "j-ja-2-setsumei", why: "逆接の後に主張がくる、の未習熟" },
      { i: 2, root: "j-ja-1-setsumei", why: "文末で事実と意見を分ける力が中1から弱い" },
    ],
  },
  {
    unit: "j-ja-2-shosetsu",
    needs: [{ unit: "j-ja-1-monogatari", why: "設定・展開と本文の手がかりで心情を読む力を使う" }],
    mistakes: [
      { i: 0, root: "j-ja-1-monogatari", why: "本文を根拠に心情を読む力が中1から弱い" },
      { i: 1, root: "e-japanese-5-monogatari", why: "前後の心情ときっかけをそろえる力が弱い" },
      { i: 2, root: "e-japanese-6-monogatari", why: "語り手から見える範囲の理解が小6から弱い" },
    ],
  },
  {
    unit: "j-ja-2-tanka",
    needs: [
      { unit: "e-japanese-4-tanka", why: "五・七・五・七・七の三十一音を知って読む" },
      { unit: "j-ja-1-shi", why: "表現技法を見分ける力を短歌に使う" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-2-tanka", why: "短歌は「首」で数える、の未習熟" },
      { i: 1, root: "e-japanese-4-tanka", why: "短歌と俳句の音数のちがいが小4から弱い" },
      { i: 2, root: "j-ja-2-tanka", why: "句切れは意味や調子の切れ目、の未習熟" },
    ],
  },
  // ───────── 中3 ─────────
  {
    unit: "j-ja-3-bunpo",
    needs: [
      { unit: "j-ja-2-bunpo-fuzoku", why: "助詞・助動詞の知識で識別問題を解く" },
      { unit: "j-ja-2-bunpo-yogen", why: "活用形の知識で「だ」「ぬ」を見分ける" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-2-bunpo-fuzoku", why: "「ぬ」に置きかえる「ない」の識別が中2から弱い" },
      { i: 1, root: "j-ja-2-bunpo-fuzoku", why: "「れる・られる」の意味の見分けが中2から弱い" },
      { i: 2, root: "j-ja-2-bunpo-yogen", why: "形容動詞の見分けが中2から身についていない" },
      { i: 3, root: "j-ja-3-bunpo", why: "連用形につく完了の「ぬ」の未習熟" },
    ],
  },
  {
    unit: "j-ja-3-goi",
    needs: [{ unit: "j-ja-2-goi", why: "熟語・故事成語・慣用句の知識をまとめて広げる" }],
    mistakes: [
      { i: 0, root: "e-japanese-4-koji", why: "故事成語は中国の話から、が小4から弱い" },
      { i: 1, root: "j-ja-1-goi", why: "「気が置けない」の意味が中1から身についていない" },
      { i: 2, root: "j-ja-1-goi", why: "対義語を組で覚える力が中1から弱い" },
    ],
  },
  {
    unit: "j-ja-3-haiku",
    needs: [
      { unit: "e-japanese-3-haiku", why: "十七音・季語・切れ字の基本を使う" },
      { unit: "j-ja-2-tanka", why: "句切れと情景に心を重ねる読み方を俳句に使う" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-3-haiku", why: "季語は旧暦の季節で決まる、の未習熟" },
      { i: 1, root: "e-japanese-1-kana-on", why: "ねじれた音を一音と数える力が小1から弱い" },
      { i: 2, root: "j-ja-2-tanka", why: "句切れの見つけ方が中2から身についていない" },
      { i: 3, root: "j-ja-3-haiku", why: "感動の中心と心情まで読む鑑賞の未習熟" },
    ],
  },
  {
    unit: "j-ja-3-hanasu",
    needs: [{ unit: "j-ja-2-hanasu", why: "中心と根拠を分けて聞き、受け止めて話す力を使う" }],
    mistakes: [
      { i: 0, root: "j-ja-3-hanasu", why: "広げる段階では否定しない、の未習熟" },
      { i: 1, root: "j-ja-3-hanasu", why: "目的に照らして合意をつくる、の未習熟" },
      { i: 2, root: "j-ja-3-hanasu", why: "主張と根拠に反論する型の未習熟" },
    ],
  },
  {
    unit: "j-ja-3-hihyo",
    needs: [{ unit: "j-ja-2-ikenbun", why: "主張と根拠を組み立てる力を評価の文章に使う" }],
    mistakes: [
      { i: 0, root: "j-ja-2-ikenbun", why: "根拠を示して主張する力が中2から弱い" },
      { i: 1, root: "j-ja-3-hihyo", why: "批評はよい点と課題をそろえる、の未習熟" },
      { i: 2, root: "j-ja-3-hihyo", why: "観点をしぼる、の未習熟" },
    ],
  },
  {
    unit: "j-ja-3-kanbun",
    needs: [
      { unit: "j-ja-1-kanbun", why: "レ点・一二点と書き下しのきまりを使う" },
      { unit: "j-ja-2-kanshi", why: "漢詩を返り点で読んだ経験を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-1-kanbun", why: "レ点の読み方が中1から身についていない" },
      { i: 1, root: "j-ja-1-kanbun", why: "助動詞はひらがなで書く決まりが中1から弱い" },
      { i: 2, root: "j-ja-1-kanbun", why: "置き字は書き下さない、が中1から弱い" },
      { i: 3, root: "j-ja-3-kanbun", why: "論語の「子」は孔子、の未習熟" },
    ],
  },
  {
    unit: "j-ja-3-kanji",
    needs: [{ unit: "j-ja-2-kanji", why: "意味で書き分け、送りがなをまもる力を使う" }],
    mistakes: [
      { i: 0, root: "j-ja-3-kanji", why: "訓＋音の湯桶読みの未習熟" },
      { i: 1, root: "e-japanese-5-douon", why: "「測る」と「計る」の使い分けが小5から弱い" },
      { i: 2, root: "e-japanese-4-okurigana", why: "「〜しい」の送りがなの決まりが小4から弱い" },
    ],
  },
  {
    unit: "j-ja-3-kobun",
    needs: [
      { unit: "j-ja-2-kobun", why: "仮名遣い・古語・係り結びの知識を使う" },
      { unit: "j-ja-2-tanka", why: "短歌の句切れと技法の読み方を和歌に使う" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-3-kobun", why: "枕詞はふつう訳さない、の未習熟" },
      { i: 1, root: "j-ja-1-kobun", why: "「ふ」を「う」と読む決まりが中1から弱い" },
      { i: 2, root: "j-ja-3-kobun", why: "三大和歌集の時代と特色の未習熟" },
    ],
  },
  {
    unit: "j-ja-3-ronsetsu",
    needs: [{ unit: "j-ja-2-setsumei", why: "接続語と事実・意見の区別で読む力を使う" }],
    mistakes: [
      { i: 0, root: "j-ja-2-setsumei", why: "具体例と主張の区別が中2から弱い" },
      { i: 1, root: "j-ja-1-setsumei", why: "要旨に例を入れない力が中1から弱い" },
      { i: 2, root: "j-ja-1-setsumei", why: "序論の問いと答えの区別が中1から弱い" },
      { i: 3, root: "j-ja-3-ronsetsu", why: "内容が確かめられるかで事実を見分ける、の未習熟" },
    ],
  },
  {
    unit: "j-ja-3-shosetsu",
    needs: [{ unit: "j-ja-2-shosetsu", why: "きっかけと手がかりで心情を読む力を使う" }],
    mistakes: [
      { i: 0, root: "j-ja-2-shosetsu", why: "本文を根拠に心情を読む力が中2から弱い" },
      { i: 1, root: "j-ja-2-shosetsu", why: "前・きっかけ・後をそろえる力が中2から弱い" },
      { i: 2, root: "j-ja-2-shosetsu", why: "一人称の語り手の見え方の理解が中2から弱い" },
      { i: 3, root: "j-ja-3-shosetsu", why: "回想と現在の場面の区別の未習熟" },
    ],
  },
  // ───────── 高校：現代の国語・言語文化（現代文） ─────────
  {
    unit: "h-jpn-gen-kanji",
    needs: [{ unit: "j-ja-3-kanji", why: "音と訓・熟語の読み・送りがなの整理を使う" }],
    mistakes: [
      { i: 0, root: "e-japanese-3-hen-tsukuri", why: "部首の意味で字を見分ける力が弱い" },
      { i: 1, root: "j-ja-3-kanji", why: "重箱読み・湯桶読みが中3から身についていない" },
      { i: 2, root: "j-ja-1-kanji", why: "形声文字の音の部分の扱いが中1から弱い" },
    ],
  },
  {
    unit: "h-jpn-gen-goi",
    needs: [{ unit: "j-ja-3-goi", why: "類義語・対義語・語種の知識を深める" }],
    mistakes: [
      { i: 0, root: "e-japanese-5-wago", why: "外来語はいろいろな国から来た、が小5から弱い" },
      { i: 1, root: "e-japanese-5-wago", why: "混種語の見分けが小5から身についていない" },
      { i: 2, root: "e-japanese-5-wago", why: "語種は表記でなく生まれで決まる、が弱い" },
      { i: 3, root: "e-japanese-5-jukugo", why: "「未」「不」で打ち消す熟語の型が小5から弱い" },
    ],
  },
  {
    unit: "h-jpn-gen-hanasu",
    needs: [{ unit: "j-ja-3-hanasu", why: "話し合い・討論の進め方を使う" }],
    mistakes: [
      { i: 0, root: "h-jpn-gen-hanasu", why: "聞き手を見て要点メモで話す、の未習熟" },
      { i: 1, root: "j-ja-3-hanasu", why: "広げる段階では否定しない、が中3から弱い" },
      { i: 2, root: "j-ja-3-hanasu", why: "主張と根拠に反論する型が中3から弱い" },
    ],
  },
  {
    unit: "h-jpn-gen-hokoku",
    needs: [
      { unit: "j-ja-1-kaku", why: "目的→方法→結果→考察の報告文の型を使う" },
      { unit: "e-math-5-wariai", why: "割合の意味が分かって、数値を正しく書ける" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-1-kaku", why: "事実と考察を分けて書く力が中1から弱い" },
      { i: 1, root: "e-math-5-wariai", why: "割合のもとになる量の理解が算数から弱い" },
      { i: 2, root: "j-ja-1-kaku", why: "引用と出典の示し方が中1から身についていない" },
      { i: 3, root: "h-jpn-gen-hokoku", why: "図表の読み取りを本文に書く、の未習熟" },
    ],
  },
  {
    unit: "h-jpn-gen-iken",
    needs: [
      { unit: "j-ja-2-ikenbun", why: "主張→根拠→反論への答えの組み立てを使う" },
      { unit: "j-ja-3-hihyo", why: "観点と根拠を示して評価する力を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-2-ikenbun", why: "立場を決めて反論に答える力が中2から弱い" },
      { i: 1, root: "e-japanese-5-bun-kumitate", why: "主語と述語のねじれに気づく力が小5から弱い" },
      { i: 2, root: "h-jpn-gen-iken", why: "事実と主張をつなぐ理由（論拠）の未習熟" },
    ],
  },
  {
    unit: "h-jpn-gen-jitsuyo",
    needs: [
      { unit: "j-ja-2-setsumei", why: "接続語と事実を読み分ける力で条件を読む" },
      { unit: "e-math-4-gaisu", why: "以上・以下・未満の意味が条件の読み取りに要る" },
      { unit: "e-math-5-wariai", why: "割合ともとの数の関係で図表を読む" },
    ],
    mistakes: [
      { i: 0, root: "e-math-4-gaisu", why: "「未満」はその数をふくまない、が算数から弱い" },
      { i: 1, root: "h-jpn-gen-jitsuyo", why: "「必着」と「消印有効」の区別の未習熟" },
      { i: 2, root: "e-math-5-wariai", why: "割合×もとにする量＝実数、が算数から弱い" },
    ],
  },
  {
    unit: "h-jpn-gen-ronri",
    needs: [{ unit: "j-ja-3-ronsetsu", why: "主張と根拠を分けて要旨をつかむ力を使う" }],
    mistakes: [
      { i: 0, root: "j-ja-3-ronsetsu", why: "具体例を除いて要旨をまとめる力が中3から弱い" },
      { i: 1, root: "j-ja-2-setsumei", why: "逆接の後に主張がくる、が中2から弱い" },
      { i: 2, root: "h-jpn-gen-ronri", why: "筆者がくり返す考えを要点にする、の未習熟" },
      { i: 3, root: "h-jpn-gen-ronri", why: "接続語や条件とあわせて主張を読む、の未習熟" },
    ],
  },
  // ───────── 高校：論理国語 ─────────
  {
    unit: "h-jpn-ronri-yogo",
    needs: [{ unit: "h-jpn-gen-goi", why: "抽象と具体・多義語の見方を評論の語に使う" }],
    mistakes: [
      { i: 0, root: "h-jpn-ronri-yogo", why: "「恣意的」の意味の未習熟" },
      { i: 1, root: "h-jpn-ronri-yogo", why: "「相対」と「絶対」の対の未習熟" },
      { i: 2, root: "h-jpn-gen-goi", why: "抽象と具体のはしごの理解が弱い" },
    ],
  },
  {
    unit: "h-jpn-ronri-hyoron",
    needs: [
      { unit: "h-jpn-gen-ronri", why: "主張・根拠・具体例の骨組みで評論を読む" },
      { unit: "h-jpn-ronri-yogo", why: "評論の重要語が分かって、対立を追える" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-gen-ronri", why: "譲歩の後の「しかし」に主張がくる、の理解が弱い" },
      { i: 1, root: "h-jpn-gen-ronri", why: "具体例と抽象的な主張の区別が弱い" },
      { i: 2, root: "h-jpn-ronri-hyoron", why: "逆説を言いかえで読み解く、の未習熟" },
      { i: 3, root: "h-jpn-gen-ronri", why: "自分の意見でなく筆者の考えで読む力が弱い" },
    ],
  },
  {
    unit: "h-jpn-ronri-kozo",
    needs: [{ unit: "h-jpn-gen-ronri", why: "主張と根拠の骨組みを、推論の型に広げる" }],
    mistakes: [
      { i: 0, root: "h-jpn-ronri-kozo", why: "前後関係と因果関係の区別の未習熟" },
      { i: 1, root: "h-jpn-ronri-kozo", why: "帰納の結論が言える範囲の未習熟" },
      { i: 2, root: "h-jpn-ronri-kozo", why: "誤った二分法に気づく、の未習熟" },
    ],
  },
  {
    unit: "h-jpn-ronri-shiryo",
    needs: [
      { unit: "h-jpn-gen-jitsuyo", why: "図表の割合と実数を区別する読み方を使う" },
      { unit: "h-math-1-data", why: "相関と因果のちがいが、資料の読み取りに要る" },
    ],
    mistakes: [
      { i: 0, root: "e-math-5-wariai", why: "割合の差と増加率の区別が算数から弱い" },
      { i: 1, root: "h-jpn-ronri-shiryo", why: "単位・時期・対象を先に確かめる、の未習熟" },
      { i: 2, root: "h-math-1-data", why: "相関は因果ではない、の理解が弱い" },
      { i: 3, root: "h-jpn-ronri-shiryo", why: "資料に根拠がある選択肢だけを選ぶ、の未習熟" },
    ],
  },
  {
    unit: "h-jpn-ronri-shoronbun",
    needs: [
      { unit: "h-jpn-gen-iken", why: "問い→主張→根拠→反論への答えの型を使う" },
      { unit: "h-jpn-ronri-kozo", why: "根拠と論拠で主張を支える論理を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-2-ikenbun", why: "文末をそろえ言い切る書き方が中2から弱い" },
      { i: 1, root: "h-jpn-gen-iken", why: "立場を一つに決めて書く力が弱い" },
      { i: 2, root: "h-jpn-ronri-shoronbun", why: "体験を一般的な理由につなげる、の未習熟" },
      { i: 3, root: "e-japanese-6-iken", why: "結論で主張をくり返す書き方が小6から弱い" },
    ],
  },
  {
    unit: "h-jpn-ronri-yoyaku",
    needs: [{ unit: "h-jpn-gen-ronri", why: "主張をさがし骨組みを読む力で要約する" }],
    mistakes: [
      { i: 0, root: "h-jpn-gen-ronri", why: "具体例と主張を区別する力が弱い" },
      { i: 1, root: "h-jpn-ronri-yoyaku", why: "要約に自分の意見を入れない、の未習熟" },
      { i: 2, root: "h-jpn-ronri-yoyaku", why: "論理の順に組み立て直す、の未習熟" },
      { i: 3, root: "h-jpn-gen-ronri", why: "接続語が論理の道しるべ、の理解が弱い" },
    ],
  },
  // ───────── 高校：文学国語 ─────────
  {
    unit: "h-jpn-bungaku-hyogen",
    needs: [{ unit: "j-ja-1-shi", why: "直喩・隠喩・擬人法などの技法の基本を使う" }],
    mistakes: [
      { i: 0, root: "j-ja-1-shi", why: "直喩と隠喩の見分けが中1から弱い" },
      { i: 1, root: "e-japanese-6-shi", why: "技法の効果まで書く力が小6から弱い" },
      { i: 2, root: "h-jpn-bungaku-hyogen", why: "体言止めは文末だけ、の未習熟" },
    ],
  },
  {
    unit: "h-jpn-bungaku-shi",
    needs: [
      { unit: "j-ja-1-shi", why: "詩の種類（用語と形式）の分け方を使う" },
      { unit: "h-jpn-bungaku-hyogen", why: "技法を名前と効果のセットで読む力を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-1-shi", why: "口語・文語と定型・自由の分け方が中1から弱い" },
      { i: 1, root: "j-ja-1-shi", why: "直喩と隠喩の見分けが中1から弱い" },
      { i: 2, root: "e-japanese-6-shi", why: "技法の効果まで書く力が小6から弱い" },
      { i: 3, root: "h-jpn-bungaku-shi", why: "連ごとの変化から主題を読む、の未習熟" },
    ],
  },
  {
    unit: "h-jpn-bungaku-shosetsu",
    needs: [{ unit: "j-ja-3-shosetsu", why: "描写から心情を読み、語り手の位置を見る力を使う" }],
    mistakes: [
      { i: 0, root: "j-ja-3-shosetsu", why: "本文を根拠に心情を答える力が中3から弱い" },
      { i: 1, root: "j-ja-3-shosetsu", why: "きっかけと心情をセットで書く力が弱い" },
      { i: 2, root: "j-ja-3-shosetsu", why: "一人称の語り手の見え方の理解が弱い" },
      { i: 3, root: "j-ja-1-monogatari", why: "情景描写に心情を重ねる読み方が中1から弱い" },
    ],
  },
  {
    unit: "h-jpn-bungaku-sosaku",
    needs: [
      { unit: "h-jpn-bungaku-shosetsu", why: "語り手と視点の理解を、書く側で使う" },
      { unit: "h-jpn-bungaku-hyogen", why: "表現の技法を、自分の作品に生かす" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-6-zuihitsu", why: "題材を一つにしぼる力が小6から弱い" },
      { i: 1, root: "e-japanese-6-zuihitsu", why: "様子を描いて気持ちを伝える力が弱い" },
      { i: 2, root: "h-jpn-bungaku-shosetsu", why: "一人称の語り手から見える範囲の理解が弱い" },
    ],
  },
  {
    unit: "h-jpn-bungaku-tanka",
    needs: [
      { unit: "j-ja-3-haiku", why: "季語・切れ字・十七音の読み方を使う" },
      { unit: "j-ja-2-tanka", why: "三十一音と句切れの読み方を使う" },
    ],
    mistakes: [
      { i: 0, root: "e-japanese-1-kana-on", why: "ねじれた音を一音と数える力が小1から弱い" },
      { i: 1, root: "j-ja-3-haiku", why: "季語は旧暦で決まる、が中3から弱い" },
      { i: 2, root: "j-ja-3-haiku", why: "切れ字に感動の中心がある、が中3から弱い" },
    ],
  },
  {
    unit: "h-jpn-bungaku-hyoron",
    needs: [
      { unit: "h-jpn-ronri-hyoron", why: "通説→しかし→主張の型を読めると評論を追える" },
      { unit: "j-ja-3-shosetsu", why: "作品の読み方を知って、評論の解釈を確かめられる" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-bungaku-hyoron", why: "引用（根拠）と筆者の解釈の区別の未習熟" },
      { i: 1, root: "h-jpn-ronri-hyoron", why: "常識→しかし→主張の型の読み取りが弱い" },
      { i: 2, root: "h-jpn-bungaku-hyoron", why: "根拠があれば別の読みも成り立つ、の未習熟" },
    ],
  },
  // ───────── 高校：言語文化（近代・詩歌） ─────────
  {
    unit: "h-jpn-bunka-kindai",
    needs: [{ unit: "j-ja-3-shosetsu", why: "語り手・心情の変化の読み方を近代小説に使う" }],
    mistakes: [
      { i: 0, root: "h-jpn-bunka-kindai", why: "自然主義の「自然」の意味の未習熟" },
      { i: 1, root: "j-ja-3-shosetsu", why: "語り手と作者を分ける見方が中3から弱い" },
      { i: 2, root: "h-jpn-bunka-kindai", why: "言文一致の始まりの文学史の未習熟" },
    ],
  },
  {
    unit: "h-jpn-bunka-shiika",
    needs: [
      { unit: "j-ja-1-shi", why: "詩の用語と形式の分け方を使う" },
      { unit: "j-ja-2-tanka", why: "短歌の句切れの読み方を使う" },
      { unit: "j-ja-3-haiku", why: "俳句の季語と切れ字の読み方を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-3-haiku", why: "季語は旧暦で決まる、が中3から弱い" },
      { i: 1, root: "e-japanese-1-kana-on", why: "ねじれた音・つまる音の数え方が小1から弱い" },
      { i: 2, root: "h-jpn-bunka-shiika", why: "季重なりをさける、の未習熟" },
    ],
  },
  // ───────── 高校：古文 ─────────
  {
    unit: "h-jpn-bunka-kobun-nyumon",
    needs: [{ unit: "j-ja-3-kobun", why: "中学の古文で読んだ歴史的仮名遣いを型にまとめる" }],
    mistakes: [
      { i: 0, root: "j-ja-1-kobun", why: "語頭のハ行はそのまま、の決まりが中1から弱い" },
      { i: 1, root: "j-ja-1-kobun", why: "母音が続く音をのばす音に直す力が中1から弱い" },
      { i: 2, root: "j-ja-1-kobun", why: "助詞以外の「を」は「お」、が中1から弱い" },
    ],
  },
  {
    unit: "h-jpn-bunka-kobun-tango",
    needs: [{ unit: "h-jpn-bunka-kobun-nyumon", why: "仮名遣いを直して読めないと、単語を引けない" }],
    mistakes: [
      { i: 0, root: "j-ja-1-kobun", why: "「うつくし」の昔の意味が中1から身についていない" },
      { i: 1, root: "h-jpn-bunka-kobun-tango", why: "語のなりたちから意味をつかむ、の未習熟" },
      { i: 2, root: "h-jpn-bunka-kobun-tango", why: "古今異義語「ののしる」の未習熟" },
      { i: 3, root: "h-jpn-bunka-kobun-tango", why: "「おどろく」の核の意味の未習熟" },
    ],
  },
  {
    unit: "h-jpn-bunka-yogen",
    needs: [
      { unit: "j-ja-2-bunpo-yogen", why: "口語の活用形と活用の種類の考え方を古文に使う" },
      { unit: "h-jpn-bunka-kobun-nyumon", why: "歴史的仮名遣いが読めて活用表が読める" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-bunka-yogen", why: "已然形＋ばは確定条件、の未習熟" },
      { i: 1, root: "j-ja-2-bunpo-yogen", why: "「見る」は上一段、が中2の口語から弱い" },
      { i: 2, root: "h-jpn-bunka-yogen", why: "ラ変動詞の見分けの未習熟" },
      { i: 3, root: "h-jpn-bunka-yogen", why: "ナ変の活用の未習熟" },
    ],
  },
  {
    unit: "h-jpn-bunka-jodoshi",
    needs: [{ unit: "h-jpn-bunka-yogen", why: "上の語の活用形が分かって、助動詞の接続が分かる" }],
    mistakes: [
      { i: 0, root: "h-jpn-bunka-yogen", why: "連用形を見分ける活用の力が弱い" },
      { i: 1, root: "h-jpn-bunka-jodoshi", why: "「けり」の詠嘆の意味の未習熟" },
      { i: 2, root: "h-jpn-bunka-yogen", why: "ラ変型の語の活用の理解が弱い" },
      { i: 3, root: "h-jpn-bunka-jodoshi", why: "接続で断定と伝聞の「なり」を分ける、の未習熟" },
    ],
  },
  {
    unit: "h-jpn-koten-joshi",
    needs: [{ unit: "h-jpn-bunka-yogen", why: "上の語の活用形で助詞の意味が決まる" }],
    mistakes: [
      { i: 0, root: "h-jpn-bunka-yogen", why: "未然形と已然形の見分けが弱い" },
      { i: 1, root: "h-jpn-koten-joshi", why: "「ばや」は自分の願望、の未習熟" },
      { i: 2, root: "h-jpn-koten-joshi", why: "同格の「の」の未習熟" },
    ],
  },
  {
    unit: "h-jpn-koten-shikibetsu",
    needs: [
      { unit: "h-jpn-bunka-jodoshi", why: "助動詞の接続と活用が識別の手がかりになる" },
      { unit: "h-jpn-koten-joshi", why: "助詞の「なむ」「に」などを知って見分けられる" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-bunka-yogen", why: "カ変「来」の連用形「き」の理解が弱い" },
      { i: 1, root: "h-jpn-koten-joshi", why: "願望の「なむ」は未然形につく、が弱い" },
      { i: 2, root: "h-jpn-bunka-jodoshi", why: "「ず」「ぬ」の活用表が身についていない" },
    ],
  },
  {
    unit: "h-jpn-koten-keigo",
    needs: [
      { unit: "j-ja-2-keigo", why: "尊敬・謙譲・丁寧の区別を古文にも使う" },
      { unit: "h-jpn-bunka-yogen", why: "活用の種類で「給ふ」の尊敬・謙譲を分ける" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-2-keigo", why: "謙譲語は相手を高める、が中2から弱い" },
      { i: 1, root: "h-jpn-bunka-yogen", why: "四段と下二段の活用の見分けが弱い" },
      { i: 2, root: "h-jpn-koten-keigo", why: "地の文と会話文で敬意の出どころが変わる、の未習熟" },
    ],
  },
  {
    unit: "h-jpn-bunka-kobun-dokkai",
    needs: [
      { unit: "h-jpn-bunka-kobun-tango", why: "古文単語の意味が分かって本文が読める" },
      { unit: "h-jpn-koten-joshi", why: "接続助詞で主語の切りかわりを追う" },
      { unit: "h-jpn-koten-keigo", why: "敬語で省かれた主語を補う" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-koten-joshi", why: "接続助詞で主語が変わる、の理解が弱い" },
      { i: 1, root: "h-jpn-bunka-kobun-dokkai", why: "随筆・説話は筆者の評をつかむ、の未習熟" },
      { i: 2, root: "h-jpn-koten-keigo", why: "尊敬語で動作の主を見分ける力が弱い" },
    ],
  },
  {
    unit: "h-jpn-koten-monogatari",
    needs: [{ unit: "h-jpn-bunka-kobun-dokkai", why: "主語を補いながら古文を読む力を物語に使う" }],
    mistakes: [
      { i: 0, root: "h-jpn-koten-joshi", why: "接続助詞で主語が変わる、の理解が弱い" },
      { i: 1, root: "h-jpn-koten-keigo", why: "尊敬語は動作する人を高める、の理解が弱い" },
      { i: 2, root: "h-jpn-koten-monogatari", why: "作り物語と歌物語の区別の未習熟" },
      { i: 3, root: "h-jpn-koten-joshi", why: "同格の格助詞の理解が弱い" },
    ],
  },
  {
    unit: "h-jpn-koten-nikki",
    needs: [
      { unit: "h-jpn-bunka-kobun-dokkai", why: "主語を補いながら古文を読む力を使う" },
      { unit: "h-jpn-bunka-jodoshi", why: "助動詞の識別が、日記の有名な一文で問われる" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-koten-nikki", why: "『土佐日記』の書き手のしかけの未習熟" },
      { i: 1, root: "h-jpn-koten-keigo", why: "尊敬語の有無で主語を決める力が弱い" },
      { i: 2, root: "h-jpn-bunka-jodoshi", why: "接続で伝聞と断定の「なり」を分ける力が弱い" },
      { i: 3, root: "j-ja-2-kobun", why: "作品と時代の組み合わせが中2から弱い" },
    ],
  },
  {
    unit: "h-jpn-koten-joshiki",
    needs: [{ unit: "h-jpn-bunka-kobun-nyumon", why: "古文が読めて、本文のすき間を知識で埋められる" }],
    mistakes: [
      { i: 0, root: "h-jpn-koten-joshiki", why: "陰暦は今の暦より約一か月遅い、の未習熟" },
      { i: 1, root: "j-ja-3-haiku", why: "旧暦の七月は秋、が中3の季語から弱い" },
      { i: 2, root: "h-jpn-koten-joshiki", why: "十二支による時刻の表し方の未習熟" },
      { i: 3, root: "h-jpn-koten-joshiki", why: "出家の遠回しな言い方の未習熟" },
    ],
  },
  {
    unit: "h-jpn-koten-waka",
    needs: [
      { unit: "j-ja-3-kobun", why: "和歌の三十一音と技法の基本を使う" },
      { unit: "h-jpn-bunka-yogen", why: "終止形を見分けて句切れを決める" },
    ],
    mistakes: [
      { i: 0, root: "j-ja-3-kobun", why: "枕詞はふつう訳さない、が中3から弱い" },
      { i: 1, root: "h-jpn-koten-waka", why: "掛詞は両方の意味を訳す、の未習熟" },
      { i: 2, root: "h-jpn-koten-waka", why: "掛詞と縁語のちがいの未習熟" },
      { i: 3, root: "j-ja-2-tanka", why: "句切れは意味の切れ目、が中2から弱い" },
    ],
  },
  // ───────── 高校：漢文 ─────────
  {
    unit: "h-jpn-bunka-kundoku",
    needs: [{ unit: "j-ja-3-kanbun", why: "返り点と書き下し文のきまりを全体に広げる" }],
    mistakes: [
      { i: 0, root: "j-ja-3-kanbun", why: "一二点の読む順番が中3から身についていない" },
      { i: 1, root: "j-ja-3-kanbun", why: "助動詞はひらがなで書く決まりが中3から弱い" },
      { i: 2, root: "j-ja-1-kanbun", why: "置き字は書き下さない、が中1から弱い" },
    ],
  },
  {
    unit: "h-jpn-bunka-saidoku",
    needs: [{ unit: "h-jpn-bunka-kundoku", why: "返り点で読む順番がたどれて、二度読みが分かる" }],
    mistakes: [
      { i: 0, root: "h-jpn-bunka-saidoku", why: "再読文字は二度読む、の未習熟" },
      { i: 1, root: "h-jpn-bunka-saidoku", why: "二度目の読みはひらがなで書く、の未習熟" },
      { i: 2, root: "h-jpn-bunka-saidoku", why: "「将」と「当」の読み分けの未習熟" },
      { i: 3, root: "h-jpn-bunka-kundoku", why: "置き字を送り仮名で表す考えが弱い" },
    ],
  },
  {
    unit: "h-jpn-bunka-kanshi",
    needs: [
      { unit: "j-ja-2-kanshi", why: "絶句・律詩・押韻・対句の基本を使う" },
      { unit: "h-jpn-bunka-kundoku", why: "訓読のきまりで漢詩を読みくだす" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-bunka-kanshi", why: "七言は第1句末も押韻、の未習熟" },
      { i: 1, root: "h-jpn-bunka-kanshi", why: "律詩の対句は頷聯と頸聯、の未習熟" },
      { i: 2, root: "j-ja-2-kanshi", why: "形式を句数だけで覚えたままになっている" },
    ],
  },
  {
    unit: "h-jpn-bunka-koji",
    needs: [
      { unit: "j-ja-2-goi", why: "故事成語のもとの話の知識を使う" },
      { unit: "h-jpn-bunka-kundoku", why: "原文を訓読して決めぜりふを読む" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-bunka-koji", why: "「杞憂」のもとの話の未習熟" },
      { i: 1, root: "h-jpn-gen-kanji", why: "部首で「璧」と「壁」を見分ける力が弱い" },
      { i: 2, root: "e-japanese-4-koji", why: "「五十歩百歩」のもとの話が小4から弱い" },
    ],
  },
  {
    unit: "h-jpn-koten-hitei",
    needs: [{ unit: "h-jpn-bunka-kundoku", why: "訓読と書き下しのきまりで否定の形を読む" }],
    mistakes: [
      { i: 0, root: "h-jpn-bunka-kundoku", why: "助動詞はひらがなで書く決まりが弱い" },
      { i: 1, root: "h-jpn-koten-hitei", why: "語順で決まる部分否定の未習熟" },
      { i: 2, root: "h-jpn-koten-hitei", why: "禁止の「勿」の読み方の未習熟" },
      { i: 3, root: "h-jpn-koten-hitei", why: "二重否定は強い肯定、の未習熟" },
    ],
  },
  {
    unit: "h-jpn-koten-gimon",
    needs: [
      { unit: "h-jpn-bunka-kundoku", why: "訓読のきまりで疑問・反語の形を読む" },
      { unit: "h-jpn-bunka-yogen", why: "未然形と連体形の見分けが文末の判断になる" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-koten-gimon", why: "未然形＋「んや」は反語、の未習熟" },
      { i: 1, root: "h-jpn-bunka-yogen", why: "未然形と連体形の見分けが弱い" },
      { i: 2, root: "h-jpn-koten-gimon", why: "「如何」と「何如」のちがいの未習熟" },
      { i: 3, root: "h-jpn-koten-gimon", why: "「不亦〜乎」は詠嘆、の未習熟" },
    ],
  },
  {
    unit: "h-jpn-koten-gentei",
    needs: [
      { unit: "h-jpn-bunka-kundoku", why: "訓読のきまりで文頭と文末の字を読む" },
      { unit: "h-jpn-koten-hitei", why: "限定の否定が累加になるので否定の形が要る" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-koten-gentei", why: "文末の「耳」は限定の助字、の未習熟" },
      { i: 1, root: "h-jpn-koten-hitei", why: "否定の位置で意味が変わる、の理解が弱い" },
      { i: 2, root: "h-jpn-koten-gentei", why: "「雖」は逆接、の未習熟" },
      { i: 3, root: "h-jpn-bunka-jodoshi", why: "文末の「ん（む）」は意志、の理解が弱い" },
    ],
  },
  {
    unit: "h-jpn-koten-hikaku",
    needs: [
      { unit: "h-jpn-bunka-saidoku", why: "置き字「於」の働きで比較の形を読む" },
      { unit: "h-jpn-koten-hitei", why: "「不如」「莫」などの否定の形を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-bunka-saidoku", why: "置き字「於」の意味の読み取りが弱い" },
      { i: 1, root: "h-jpn-koten-hikaku", why: "「如かず」は及ばない、の未習熟" },
      { i: 2, root: "h-jpn-koten-hikaku", why: "「莫如」は最上の形、の未習熟" },
      { i: 3, root: "h-jpn-koten-hikaku", why: "抑揚の「況んや〜をや」の未習熟" },
    ],
  },
  {
    unit: "h-jpn-koten-shieki",
    needs: [
      { unit: "h-jpn-bunka-kundoku", why: "訓読のきまりで使役・受身の形を読む" },
      { unit: "h-jpn-bunka-jodoshi", why: "「しむ」「る・らる」の接続と活用を使う" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-koten-shieki", why: "使役の相手に「ヲシテ」を送る、の未習熟" },
      { i: 1, root: "h-jpn-bunka-jodoshi", why: "「しむ」は未然形接続、が身についていない" },
      { i: 2, root: "h-jpn-koten-shieki", why: "受身の「見」は助動詞「る」、の未習熟" },
      { i: 3, root: "h-jpn-bunka-yogen", why: "サ変の未然形の理解が弱い" },
    ],
  },
  {
    unit: "h-jpn-koten-shiso",
    needs: [
      { unit: "h-jpn-bunka-kundoku", why: "訓読のきまりで思想・史伝の原文を読む" },
      { unit: "h-jpn-koten-hitei", why: "否定の句法が、主張の読み取りによく出る" },
    ],
    mistakes: [
      { i: 0, root: "h-jpn-gen-kanji", why: "字の成り立ち（人＋為）から意味を考える力が弱い" },
      { i: 1, root: "h-jpn-koten-shiso", why: "荀子の性悪説の中身の未習熟" },
      { i: 2, root: "h-jpn-koten-shiso", why: "紀伝体と編年体のちがいの未習熟" },
      { i: 3, root: "h-jpn-koten-shiso", why: "老子の「無為」の意味の未習熟" },
    ],
  },
];
