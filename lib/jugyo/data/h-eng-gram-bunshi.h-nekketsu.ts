import type { CastScript } from "../types";

// 止まる授業：分詞（高校・英文法）× 熱血エンタメ講義（ダイチ・カエデ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-bunshi.ts の本文だけ。
// 画面の前のきみに語りかけ、テンポよく進める。英文は say でカタカナに開く。問題は data/h-eng-gram-bunshi.ts から引く。

export const H_BUNSHI_H_NEKKETSU: CastScript = {
  unitId: "h-eng-gram-bunshi",
  castId: "h-nekketsu",
  title: "する？　される？　分詞で名前を最後に置く大作家ショー",
  scenes: [
    { kind: "chapter", title: "オープニング：名前はまだか！" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さあ、いくぞ！　ダイチだ！　今日の依頼人は、オーディオブックの朗読ナレーター！　ディケンズ『大いなる遺産』の原書を録音するが、冒頭の長い長い1文で、どこで息をつぐか決められないんだ！",
      say: "さあ、いくぞ！　ダイチだ！　きょうの依頼人は、オーディオブックの、朗読ナレーター！　ディケンズの、大いなる遺産の原書を、録音するが、冒頭の、長い長い1文で、どこで息をつぐか、決められないんだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "聞き役のカエデです！　その文、主人公の名前がいちばん最後に was Pip って出てくるんだって。ふつう、名前は最初に言うよね？",
      say: "聞き役のカエデです！　その文、主人公の名前が、いちばん最後に、ワズ ピップって出てくるんだって。ふつう、名前は、最初に言うよね？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そこが謎だ！　画面の前のきみも、いっしょに追いかけよう！　する・される、置き場所、補語、感情！　四つのステージで攻略だ！",
      say: "そこが謎だ！　画面の前のきみも、いっしょに追いかけよう！　する、される。置き場所。補語。感情！　よっつのステージで、攻略だ！",
    },

    { kind: "chapter", title: "1. する側か、される側か！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "分詞は、動詞を形容詞として使う技！　a sleeping cat、ねむっているねこ！　a broken cup、割れたカップ！　-ing か過去分詞か、決め手は名詞が「する」側か「される」側かだ！",
      say: "分詞は、動詞を、形容詞として使う、わざ！　ア スリーピング キャット、ねむっているねこ！　ア ブロークン カップ、割れたカップ！　イングか、過去分詞か、きめては、名詞が、するがわか、されるがわかだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "a barking dog" },
      text: "迷ったら、名詞を主語にして文に戻せ！　a barking dog は犬がほえる、{{能動}}で -ing！　a stolen bike は自転車が盗まれる、{{受動}}で過去分詞！",
      say: "迷ったら、名詞を主語にして、文に戻せ！　ア バーキング ドッグは、犬がほえる、能動でイング！　ア ストールン バイクは、自転車が、盗まれる、受動で過去分詞！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ fallen leaves は、だれかに落とされた葉っぱ？",
      say: "じゃあ、フォールン リーヴズは、だれかに、落とされた葉っぱ？",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "fallen leaves（完了）" },
      text: "おしい！　fall は自動詞！　自動詞の過去分詞は「〜してしまった」、{{完了}}だ！　落ち葉は、落ちてしまった葉っぱなんだ！",
      say: "おしい！　フォールは、自動詞！　自動詞の過去分詞は、してしまった、完了だ！　落ち葉は、落ちてしまった、葉っぱなんだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ここが熱い！　墓地に現れた脱走囚を、ディケンズは soaked、smothered、lamed、cut、stung、torn と、「された」ことを過去分詞で6つ並べて描く！",
      say: "ここが熱い！　墓地に現れた、脱走囚を、ディケンズは、ソークト、スマザード、レイムド、カット、スタング、トーンと、されたことを、過去分詞で、むっつ並べて描く！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "そのあと limped, shivered, glared, growled って、自分から「した」ことが続くんだよね。痛めつけられてきた人が、いま牙をむいてる感じ！",
      say: "そのあと、リンプト、シヴァード、グレアード、グラウルドって、自分から、したことが、続くんだよね。痛めつけられてきたひとが、いま、きばをむいてる感じ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そうだ！　後ろの四つは過去形だが、「される」の列から「する」の列へ！　順番で男の姿を見せる技だ！",
      say: "そうだ！　うしろの、よっつは、かこけいだが、される、の列から、する、の列へ！　順番で、男の姿を見せる、わざだ！",
    },

    { kind: "chapter", title: "2. 長くなったら後ろへ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "次のステージは置き場所！　分詞が{{1語}}なら名詞の前、the running boy！　{{語句がついてまとまり}}になったら名詞の後ろ、the boy running in the park！　これが{{後置修飾}}だ！",
      say: "次のステージは、置き場所！　分詞が1語なら、名詞のまえ、ザ ランニング ボーイ！　語句がついて、まとまりになったら、名詞のうしろ、ザ ボーイ ランニング イン ザ パーク！　これが、こうちしゅうしょくだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "the boy running in the park" },
      text: "訳すときは who is を補え！　the boy who is running in the park と同じだ！",
      say: "訳すときは、フー イズを補え！　ザ ボーイ フー イズ ランニング イン ザ パークと同じだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でも「ソファで寝ているねこを見て」なら、Look at the sleeping on the sofa cat. でいけそう！　形容詞は前でしょ？",
      say: "でも、ソファで寝ているねこを見て、なら、ルック アット ザ スリーピング オン ザ ソファ キャット、でいけそう！　形容詞は、まえでしょ？",
    },
    { kind: "talk", who: "sensei", text: "画面の前のきみはどう思う？　問題だ！", say: "画面の前のきみは、どう思う？　問題だ！" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "seito",
      text: "sleeping on the sofa は語句つきだから、cat の後ろ！　Look at the cat sleeping on the sofa. だね！",
      say: "スリーピング オン ザ ソファは、語句つきだから、キャットのうしろ！　ルック アット ザ キャット スリーピング オン ザ ソファ、だね！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そのとおり！　次は、形と置き場所の合わせ技だ！　いくぞ！",
      say: "そのとおり！　次は、かたちと、置き場所の、合わせわざだ！　いくぞ！",
    },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "ディケンズの書き出しの1文にも、両方そろってる！　scattered cattle は1語だから前！　this bleak place overgrown with nettles は語句つきだから後ろ！　cattle feeding on it は、牛が草をはむ側で -ing が後ろからだ！",
      say: "ディケンズの、書き出しの1文にも、両方そろってる！　スキャタード キャトルは、1語だから、まえ！　ディス ブリーク プレイス、オーヴァーグロウン ウィズ ネトルズは、語句つきだから、うしろ！　キャトル フィーディング オン イットは、牛が、草をはむ側で、イングが、うしろからだ！",
    },

    { kind: "chapter", title: "3. O と C のかくれた文！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "分詞は{{補語}}にもなる！　SVOC なら、O と C のあいだに「O is C」がかくれてる！　I heard my name called. は名前が呼ばれる、だから過去分詞！",
      say: "分詞は、補語にもなる！　エス ブイ オー シーなら、オーとシーのあいだに、オー イズ シーが、かくれてる！　アイ ハード マイ ネーム コールドは、名前が呼ばれる、だから過去分詞！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "have my hair cut は、髪を切ってもらう。じゃあ「きのう自転車を修理してもらった」は I had my bike repair yesterday. だ！",
      say: "ハヴ マイ ヘア カットは、髪を切ってもらう。じゃあ、きのう、自転車を修理してもらった、は、アイ ハッド マイ バイク リペア イエスタデイ、だ！",
    },
    { kind: "talk", who: "sensei", text: "ここが勝負だ！　問題！" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "seito",
      board: { section: 2, focus: "have O 過去分詞" },
      text: "自転車は「修理される」側だから repaired！　have ＋ O ＋過去分詞で「O を〜してもらう」なんだね！",
      say: "自転車は、修理される側だから、リペアード！　ハヴ、オー、過去分詞で、オーを、してもらう、なんだね！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "最高だ！　墓地の場面でも分詞が光る！　男に逆さにされたピップは、I was seated on a high tombstone, trembling！　seat は「すわらせる」だから、seated は墓石に置かれた側！　trembling は、ピップ自身がふるえている！",
      say: "最高だ！　墓地の場面でも、分詞が光る！　男に、さかさにされたピップは、アイ ワズ シーテッド オン ア ハイ トゥームストーン、トレンブリング！　シートは、すわらせる、だから、シーテッドは、墓石に置かれた側！　トレンブリングは、ピップ自身が、ふるえている！",
    },

    { kind: "chapter", title: "4. 感じる側か、感じさせる側か！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "ラストステージは感情！　surprise、excite、bore は、どれも「人を〜させる」動詞だ！　だから{{感じている人}}は過去分詞、{{引き起こす物ごと}}は現在分詞！",
      say: "ラストステージは、感情！　サプライズ、エキサイト、ボアは、どれも、ひとを、させる、動詞だ！　だから、感じているひとは、過去分詞。引き起こす、ものごとは、現在分詞！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "surprising" },
      text: "I was surprised. と The news was surprising.！　ピップは I was dreadfully frightened、ピップをこわがらせる男は a frightening man！　日本語ならどっちも「こわい」なのに、英語は分けるんだ！",
      say: "アイ ワズ サプライズドと、ザ ニューズ ワズ サプライジング！　ピップは、アイ ワズ ドレッドフリー フライトゥンド。ピップをこわがらせる男は、ア フライトゥニング マン！　にほんごなら、どっちも、こわい、なのに、英語は、わけるんだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "わかった！　じゃあコンサートで最高に盛り上がったら、I was very exciting at the concert.！",
      say: "わかった！　じゃあ、コンサートで、最高に盛りあがったら、アイ ワズ ヴェリー エキサイティング アット ザ コンサート！",
    },
    { kind: "talk", who: "sensei", text: "画面の前のきみ、最後の勝負だ！　問題！", say: "画面の前のきみ、最後の勝負だ！　問題！" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "seito",
      board: { section: 3, focus: "excited" },
      text: "わくわく「させられた」のは自分だから excited！　exciting だと、わたしがみんなをわくわくさせる人になっちゃう！",
      say: "わくわく、させられたのは、自分だから、エキサイテッド！　エキサイティングだと、わたしが、みんなを、わくわくさせるひとに、なっちゃう！",
    },

    { kind: "chapter", title: "フィナーレ：最後の Pip！" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "さあ、謎解きだ！　語句のついた分詞は名詞の後ろに回る！　だから the small bundle of shivers のあとに growing afraid of it all and beginning to cry と長い{{後置修飾}}が続き、名前 Pip は最後まで押し出された！",
      say: "さあ、謎解きだ！　語句のついた分詞は、名詞のうしろに回る！　だから、ザ スモール バンドル オブ シヴァーズのあとに、グロウイング アフレイド オブ イット オール アンド ビギニング トゥ クライと、長い、こうちしゅうしょくが続き、名前、ピップは、最後まで、押し出された！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "しかも -ing は「いま、そうなっていく途中」。荒れ地、川、海の大きな景色のあとで、こわくなっていく途中の小さな子を見せて、最後にそれがピップだって知らせるんだ！",
      say: "しかも、イングは、いま、そうなっていく途中。荒れ地、川、海の、大きな景色のあとで、こわくなっていく途中の、小さな子を見せて、最後に、それがピップだって、知らせるんだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そうだ！　幼い子が世界と自分を同時に見つけた瞬間を、読者も同じ順番で体験するしかけだ！　画面の前のきみも、ナレーターさんに「最後の Pip はそっと置いて」と伝えられるはずだ！",
      say: "そうだ！　幼い子が、世界と自分を、同時に見つけた瞬間を、読者も、同じ順番で、体験するしかけだ！　画面の前のきみも、ナレーターさんに、最後のピップは、そっと置いて、と伝えられるはずだ！",
    },
  ],
};
