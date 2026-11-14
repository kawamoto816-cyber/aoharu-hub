import type { CastScript } from "../types";

// 止まる授業：完了形（高校・英文法）× 熱血エンタメ講義（ダイチ・カエデ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-kanryo.ts の本文だけ。
// 画面の前のきみに語りかける講義ショー。実在の講演家・YouTuber のあいさつ・決めぜりふはまねしない。英文は say でカタカナに開く。問題は data/h-eng-gram-kanryo.ts から引く。

export const H_KANRYO_H_NEKKETSU: CastScript = {
  unitId: "h-eng-gram-kanryo",
  castId: "h-nekketsu",
  title: "have had と had を書き分けろ！　完了形ショー",
  scenes: [
    { kind: "chapter", title: "オープニング：南極のテント" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さあ、始めよう！　ダイチだ！　今日の依頼人は科学館の学芸員！　展示の目玉は、1912年3月29日、南極のテントでスコット隊長が書いた最後の日誌だ！",
      say: "さあ、始めよう！　ダイチだ！　きょうの、いらいにんは、科学館の学芸員！　展示の目玉は、1912ねん3がつ29にち、南極のテントで、スコット隊長が書いた、最後の日誌だ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "Since the 21st we have had a continuous gale. そして We had fuel … on the 20th. どっちも「あった」なのに、have had と had！",
      say: "シンス ザ トゥエンティファースト、ウィー ハヴ ハッド ア コンティニュアス ゲイル。そして、ウィー ハッド フューエル、オン ザ トゥエンティエス。どっちも、あった、なのに、ハヴ ハッドと、ハッド！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "聞き役のカエデです！　パネルの訳は、両方「〜があった」でいいんじゃない？",
      say: "聞き役のカエデです！　パネルのやくは、両方、があった、で、いいんじゃない？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "待った！　それだと隊員がテントで過ごした時間が消えてしまう！　{{なぜ書き分けたのか}}、画面の前のきみと解き明かすぞ！",
      say: "待った！　それだと、隊員がテントで過ごした時間が、消えてしまう！　なぜ書きわけたのか、画面の前のきみと、解き明かすぞ！",
    },

    { kind: "chapter", title: "1. 現在完了は線だ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "have lived（3年間）" },
      text: "数直線を見ろ！　I have lived in Kyoto for three years.！　3年前から今まで、線が「今」にとどいている！　これが現在完了 have ＋過去分詞だ！",
      say: "数直線を見ろ！　アイ ハヴ リヴド イン キョウト フォー スリー イヤーズ！　3ねんまえから、今まで、線が、今に、とどいている！　これが、現在完了、ハヴ、プラス過去分詞だ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "I lived in Kyoto. だと「昔住んでいた、今はちがう」になるんだよね！",
      say: "アイ リヴド イン キョウトだと、昔、住んでいた、今はちがう、に、なるんだよね！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そのとおり！　過去形は点、現在完了は今につながる線！　I lost my key yesterday. は昨日の話、I have lost my key. なら今も見つかっていない！",
      say: "そのとおり！　過去形は点、現在完了は、今につながる線！　アイ ロスト マイ キー イエスタデイは、きのうの話。アイ ハヴ ロスト マイ キーなら、今も見つかっていない！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ここが熱い！　1912年1月16日の日誌！　marched、found と過去形が並んで、結論だけ The Norwegians have forestalled us.！　先を越された事実は、もう取り消せない！",
      say: "ここが熱い！　1912ねん1がつ16にちの日誌！　マーチト、ファウンドと、過去形が並んで、結論だけ、ザ ノーウィージャンズ ハヴ フォーストールド アス！　先を越された事実は、もう取り消せない！",
    },

    { kind: "chapter", title: "2. 3つの用法だ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "現在完了の意味は3つ！　{{完了}}の just・already・yet！　{{経験}}の ever・never・before！　{{継続}}の for・since！　目じるしの語でつかめ！",
      say: "現在完了の意味は、3つ！　完了の、ジャスト、オールレディ、イェット！　経験の、エヴァー、ネヴァー、ビフォー！　継続の、フォー、シンス！　めじるしのごで、つかめ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "know みたいな状態動詞は、現在完了のままで「ずっと」になるんだよね！",
      say: "ノウみたいな、状態動詞は、現在完了のままで、ずっと、に、なるんだよね！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そうだ！　write みたいな動作の動詞で「ずっと」なら、I have been writing this diary since November.！　現在完了進行形だ！",
      say: "そうだ！　ライトみたいな、動作の動詞で、ずっと、なら、アイ ハヴ ビーン ライティング ディス ダイアリー シンス ノヴェンバー！　現在完了進行形だ！",
    },
    { kind: "talk", who: "sensei", text: "さあ、いくぞ！　画面の前のきみ、問題だ！", say: "さあ、いくぞ！　画面の前のきみ、問題だ！" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "次は gone と been！　極点へ向かった5人は、基地に残った隊員にとって They have gone to the Pole.！　行ってしまって、今ここにいない！",
      say: "次は、ゴーンと、ビーン！　極点へ向かった、5にんは、基地に残った隊員にとって、ゼイ ハヴ ゴーン トゥ ザ ポール！　いってしまって、今ここにいない！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ「ハワイに2回行ったことがある」も、He has gone to Hawaii twice. だ！",
      say: "じゃあ、ハワイに、2かい、いったことがある、も、ヒー ハズ ゴーン トゥ ハワイ トゥワイス、だ！",
    },
    { kind: "talk", who: "sensei", text: "おっと！　画面の前のきみはどう思う？　問題だ！", say: "おっと！　画面の前のきみは、どう思う？　問題だ！" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "seito",
      text: "5人が無事に帰っていたら、They have been to the Pole. と言えたんだね。",
      say: "5にんが、無事に帰っていたら、ゼイ ハヴ ビーン トゥ ザ ポールと、言えたんだね。",
    },

    { kind: "chapter", title: "3. 過去の一点はNGだ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "現在完了の視点は「今」！　だから yesterday、〜 ago、last week、in 2020 みたいな{{過去の一点}}とはいっしょに使えない！　I saw him yesterday. は過去形だ！",
      say: "現在完了の視点は、今！　だから、イエスタデイ、アゴー、ラスト ウィーク、イン トゥエンティトゥエンティみたいな、過去の一点とは、いっしょに使えない！　アイ ソー ヒム イエスタデイは、過去形だ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でも、宿題が今終わったところなら、When have you finished your homework? でいいでしょ！",
      say: "でも、宿題が、今終わったところなら、ウェン ハヴ ユー フィニッシュト ユア ホームワーク？　で、いいでしょ！",
    },
    { kind: "talk", who: "sensei", text: "来たな！　ここが勝負どころ！　問題だ！", say: "来たな！　ここが、勝負どころ！　問題だ！" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "I have seen him twice." },
      text: "時点をたずねる When は過去形！　逆に、時点を言わない経験なら I have seen him twice. と現在完了でいける！　since 2020 は線の始まりだからOK、in 2020 は過去形だ！",
      say: "時点をたずねる、ウェンは、過去形！　逆に、時点を言わない、経験なら、アイ ハヴ シーン ヒム トゥワイスと、現在完了で、いける！　シンス トゥエンティトゥエンティは、線の始まりだから、オーケー。イン トゥエンティトゥエンティは、過去形だ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そしてもう1つ！　期間の長さは for three years、始まった時点は since 2023！　since three years とは言わないぞ！",
      say: "そして、もう1つ！　期間の長さは、フォー スリー イヤーズ。始まった時点は、シンス トゥエンティトゥエンティスリー！　シンス スリー イヤーズとは、言わないぞ！",
    },

    { kind: "chapter", title: "謎解き：やまない嵐" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "さあ、日誌にもどるぞ！　since the 21st は「21日から、書いている今まで」の線！　だから{{have had}}！　嵐は書いている今もやんでいない！",
      say: "さあ、日誌にもどるぞ！　シンス ザ トゥエンティファーストは、21にちから、書いている今まで、の線！　だから、ハヴ ハッド！　嵐は、書いている今も、やんでいない！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "on the 20th は過去の一点だから{{had}}！　燃料は20日にはあったけど、今はもうないんだ……。8日間やまない嵐と、尽きた燃料が、2つの文に詰まってる！",
      say: "オン ザ トゥエンティエスは、過去の一点だから、ハッド！　燃料は、20にちには、あったけど、今はもうないんだ。ようかかん、やまない嵐と、尽きた燃料が、2つの文に、詰まってる！",
    },

    { kind: "chapter", title: "4. 基準点をずらせ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "had left" },
      text: "ラストだ！　基準点を過去にずらすと過去完了！　The train had left when I arrived.！　着いた過去より、さらに前に列車が出ていた！",
      say: "ラストだ！　基準点を、過去にずらすと、過去完了！　ザ トレイン ハッド レフト ウェン アイ アライヴド！　着いた過去より、さらに、まえに、列車が出ていた！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "アムンセン隊が極点に着いたのは1911年12月14日、スコット隊は1912年1月17日。だから Amundsen had already left it. なんだね！",
      say: "アムンセン隊が、極点に着いたのは、1911ねん12がつ、じゅうよっか。スコット隊は、1912ねん1がつ17にち。だから、アムンセン ハッド オールレディ レフト イット、なんだね！",
    },
    { kind: "talk", who: "sensei", text: "完ぺきだ！　画面の前のきみも、ラスト問題！", say: "完ぺきだ！　画面の前のきみも、ラスト問題！" },
    { kind: "pause", ref: "check:1" },
    {
      kind: "talk",
      who: "sensei",
      text: "基準点が今なら have、過去なら had、未来なら will have！　By 2031, the hut will have stood there for 120 years.！　1911年に建った小屋が、2031年までに120年だ！",
      say: "基準点が、今なら、ハヴ！　過去なら、ハッド！　未来なら、ウィル ハヴ！　バイ トゥエンティサーティワン、ザ ハット ウィル ハヴ ストゥッド ゼア フォー ワンハンドレッドトゥエンティ イヤーズ！　1911ねんに建った小屋が、2031ねんまでに、120ねんだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "あれ？　スコットの「国民へのメッセージ」の Had we lived も had だよ！　これも過去完了？",
      say: "あれ？　スコットの、国民へのメッセージの、ハッド ウィー リヴドも、ハッドだよ！　これも、過去完了？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "いいところに気づいた！　それは If we had lived の if を省いて had を前に出した{{仮定法過去完了}}！　生きて帰れなかった事実の反対を想像しているんだ！",
      say: "いいところにきづいた！　それは、イフ ウィー ハッド リヴドの、イフを省いて、ハッドを、まえに出した、仮定法過去完了！　いきて帰れなかった事実の、反対を、想像しているんだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "さあ、画面の前のきみ！　学芸員のパネルの訳を「21日からずっと強風がやまない」「20日の時点では燃料があった」に直して、have と had の時間を伝えてくれ！",
      say: "さあ、画面の前のきみ！　学芸員のパネルのやくを、21にちから、ずっと強風がやまない。20にちの時点では、燃料があった。に直して、ハヴと、ハッドの、時間を伝えてくれ！",
    },
  ],
};
