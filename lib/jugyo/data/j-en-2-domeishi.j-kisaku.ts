import type { CastScript } from "../types";

// 止まる授業：動名詞（中2・英語）× 気さくな兄・姉（アサヒ兄さん・スミレ姉さん）。事実・例文・人名・年は lib/lecture/data/j-en-2-domeishi.ts の本文だけ。
// 雑談の調子で、うろ覚えを「わたしもそう覚えてた」と言って直していく。英文は say でカタカナに開く（-ing は「イング」）。
// 名作の言葉は lecture にある英文だけを引き、作家のせりふは作らない。問題は data/j-en-2-domeishi.ts から引く。

export const J_DOMEISHI_J_KISAKU: CastScript = {
  unitId: "j-en-2-domeishi",
  castId: "j-kisaku",
  title: "題名は Walking、1行目は wish to speak：動名詞",
  scenes: [
    { kind: "chapter", title: "つかみ：読書会の手引き" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "よっ、アサヒです。今日は市立図書館の司書さんから相談。英米文学の読書会で、ソローのエッセイ『散歩』を原文で読むんだって。",
      say: "よっ、アサヒです。きょうは、市立図書館の、司書さんから相談。英米文学の読書会で、ソローの、エッセイ、さんぽを、原文で読むんだって。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "スミレです。下見に来た中学生に「題名は Walking なのに、1行目は wish to speak。同じ『〜すること』なら、どっちでもいいんじゃないの？」って聞かれたんだって。……わたしもそう思ってた。",
      say: "スミレです。下見に来た中学生に、題名は、ウォーキングなのに、いちぎょうめは、ウィッシュ トゥー スピーク。同じ、すること、なら、どっちでも、いいんじゃないの？って、聞かれたんだって。……わたしも、そう思ってた。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "手引きにちゃんと書きたいんだってさ。まずは -ing の基本から。",
      say: "手引きに、ちゃんと書きたいんだってさ。まずは、イングの基本から。",
    },

    { kind: "chapter", title: "1. -ing で名詞になる" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "swim は「泳ぐ」。-ing をつけた swimming は「泳ぐこと」。動作が、ものごとの名前になるんだ。これが{{動名詞}}。",
      say: "スイムは、泳ぐ。イングをつけた、スイミングは、泳ぐこと。動作が、ものごとの名前に、なるんだ。これが、動名詞。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "目的語" },
      text: "表を見て。Swimming is fun. で主語、I like reading. で目的語、My hobby is cooking. で補語、Thank you for coming. で前置詞のあと。名詞と同じ場所に入れるんだ。",
      say: "表を見て。スイミング イズ ファン、で主語。アイ ライク リーディング、で目的語。マイ ホビー イズ クッキング、で補語。サンキュー フォー カミング、で、前置詞のあと。名詞と、同じ場所に、入れるんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "swimming in the sea、「海で泳ぐこと」みたいに長いかたまりになっても、全体で1つの名詞なんだ。形は進行形の -ing と同じだけど、はたらきがちがうんだよ。",
      say: "スイミング イン ザ シー、海で泳ぐこと、みたいに、長いかたまりになっても、全体で、ひとつの名詞なんだ。かたちは、しんこうけいの、イングと同じだけど、はたらきが、ちがうんだよ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ「本を読むことは楽しい」は Reading books are fun. だよね。books が複数だから are。わたしもそう覚えてた。",
      say: "じゃあ、本を読むことは、楽しい、は、リーディング ブックス アー ファン、だよね。ブックスが、複数だから、アー。わたしも、そう覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "主語って、何だろうね。ここで問題。", say: "しゅごって、なんだろうね。ここで問題。" },
    { kind: "pause", ref: "mistake:3" },
    {
      kind: "talk",
      who: "sensei",
      text: "表の下にもあるけど、主語の動名詞は1つのことだから is。エマソンの Travelling is a fool's paradise. も、動名詞が主語で is なんだ。",
      say: "表のしたにも、あるけど、主語の動名詞は、ひとつのことだから、イズ。エマソンの、トラベリング イズ ア フールズ パラダイス、も、動名詞が主語で、イズなんだ。",
    },

    { kind: "chapter", title: "2. -ing だけ、to だけ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "で、「〜すること」は不定詞の to ＋ 原形でも言える。どっちを使うかは前の動詞しだい。{{enjoy・finish・stop}} は動名詞だけ、{{want・hope・decide}} は不定詞だけ、like・start・begin はどっちでもいい。",
      say: "で、すること、は、不定詞の、トゥー たす原形でも、言える。どっちを使うかは、まえの動詞しだい。エンジョイ、フィニッシュ、ストップは、動名詞だけ。ウォント、ホープ、ディサイドは、不定詞だけ。ライク、スタート、ビギンは、どっちでもいい。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "たとえば I finished writing the report. で「レポートを書き終えた」。I want to go to Hokkaido. で「北海道に行きたい」。I hope to see you again. で「また会えるといいな」。",
      say: "たとえば、アイ フィニッシュト ライティング ザ レポート、で、レポートを、書き終えた。アイ ウォント トゥー ゴー トゥー ホッカイドー、で、北海道に、いきたい。アイ ホープ トゥー シー ユー アゲイン、で、また会えるといいな。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "「彼女と話すのを楽しんだ」は I enjoyed to talk with her. でいいよね。to をつけとけば安心。わたしもそう覚えてた。",
      say: "彼女と、話すのを、楽しんだ、は、アイ エンジョイド トゥー トーク ウィズ ハー、で、いいよね。トゥーを、つけとけば、安心。わたしも、そう覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "図で enjoy はどこにいたっけ。ここで問題。", say: "図で、エンジョイは、どこにいたっけ。ここで問題。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "不定詞だけ" },
      text: "見分けのこつは「時の向き」。楽しむ・終える・やめるのは、実際にしてること。だから -ing。望む・決めるのは、これからのこと。to には「〜のほうへ向かう」感じがあるんだ。",
      say: "見分けのこつは、ときの向き。楽しむ、終える、やめるのは、実際に、してること。だから、イング。望む、決めるのは、これからのこと。トゥーには、のほうへ向かう、感じが、あるんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "図の下にもあるけど、stop talking は「話すのをやめる」、stop to talk は「話すために立ち止まる」。向きがちがうと意味も変わるんだ。",
      say: "図のしたにも、あるけど、ストップ トーキングは、話すのを、やめる。ストップ トゥー トークは、話すために、立ち止まる。向きがちがうと、意味も変わるんだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "あ、だからソローの1行目は I wish to speak なんだ。wish は「これから」に向かう動詞だもんね。",
      say: "あ、だから、ソローの、いちぎょうめは、アイ ウィッシュ トゥー スピーク、なんだ。ウィッシュは、これからに向かう、動詞だもんね。",
    },

    { kind: "chapter", title: "3. 前置詞のあとは -ing" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "もう一つ大事なのが、at・for・about・of みたいな{{前置詞のあと}}。動詞を置くなら必ず{{動名詞}}なんだ。I am good at swimming. Thank you for helping me. みたいにね。",
      say: "もうひとつ、だいじなのが、アット、フォー、アバウト、オブみたいな、前置詞のあと。動詞を置くなら、必ず、動名詞なんだ。アイ アム グッド アット スイミング。サンキュー フォー ヘルピング ミー、みたいにね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でも「彼はギターをひくのが得意」は He is good at play the guitar. って書いちゃいそう。わたしもそう覚えてた。",
      say: "でも、彼は、ギターをひくのが得意、は、ヒー イズ グッド アット プレイ ザ ギター、って、書いちゃいそう。わたしも、そう覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "at は前置詞だったよね。ここで問題。", say: "アットは、前置詞だったよね。ここで問題。" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "How about going to the park?" },
      text: "How about going to the park? も about のあとだから going。じゃあ「写真をとるのはどうですか」は？",
      say: "ハウ アバウト ゴーイング トゥー ザ パーク、も、アバウトの、あとだから、ゴーイング。じゃあ、写真をとるのは、どうですか、は？",
    },
    { kind: "pause", ref: "check:1" },
    {
      kind: "talk",
      who: "seito",
      text: "1854年の『ウォールデン　森の生活』には、As if you could kill time without injuring eternity. って一文があるんだよね。without のあとだから injuring か。",
      say: "1854ねんの、ウォールデン、森の生活には、アズ イフ ユー クッド キル タイム ウィザウト インジュアリング エターニティ、って一文が、あるんだよね。ウィザウトのあとだから、インジュアリングか。",
    },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "で、題名の話。『散歩』には the art of Walking って出てくる。of は前置詞だから Walking。題名の WALKING も、ソローが毎日実際にしてたことにつけた名前、動名詞なんだ。決めてたのは気分じゃなくて、すぐ前の語。",
      say: "で、題名の話。さんぽには、ジ アート オブ ウォーキング、って出てくる。オブは、前置詞だから、ウォーキング。題名の、ウォーキングも、ソローが毎日、実際に、してたことに、つけた名前、動名詞なんだ。決めてたのは、気分じゃなくて、すぐまえのご。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "ソローは1845年の夏から約2年、ウォールデン池のほとりの小屋で暮らして、毎日森を歩いてたんだよね。手引きには「-ing か to かは、前の語を見て決まる」って書いてもらおう。",
      say: "ソローは、1845ねんの夏から、約2ねん、ウォールデンいけのほとりの、小屋で暮らして、毎日、森を歩いてたんだよね。手引きには、イングか、トゥーかは、まえのごを見て決まる、って、書いてもらおう。",
    },

    {
      kind: "talk",
      who: "sensei",
      text: "ワイルドの喜劇『まじめが肝心』の原題、The Importance of Being Earnest も of のあとだから Being。-ing は題名でも大活躍なんだ。",
      say: "ワイルドの喜劇、まじめがかんじんの、原題、ジ インポータンス オブ ビーイング アーネスト、も、オブのあとだから、ビーイング。イングは、題名でも、大活躍なんだ。",
    },
    { kind: "chapter", title: "まとめ：進行形との見分け" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "主語 ＝ -ing（イコール）" },
      text: "最後に、My sister is reading. は「姉は読書をしている」で{{進行形}}。My hobby is reading. は My hobby ＝ reading で動名詞。主語とイコールで結べるかを見ればいいんだ。",
      say: "最後に、マイ シスター イズ リーディングは、姉は、読書をしている、で、しんこうけい。マイ ホビー イズ リーディングは、マイ ホビー、イコール、リーディングで、動名詞。主語と、イコールで、結べるかを、見ればいいんだ。",
    },
  ],
};
