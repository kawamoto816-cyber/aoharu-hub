import type { CastScript } from "../types";

// 止まる授業：動名詞（中2・英語）× ダーク解説（ヨトバリ・ミカゲ）。事実・例文・人名・年は lib/lecture/data/j-en-2-domeishi.ts の本文だけ。
// 英文は say でカタカナに開く（-ing は「イング」）。名作の言葉は lecture にある英文だけを引き、作家のせりふは作らない。
// 問題は data/j-en-2-domeishi.ts から引く。

export const J_DOMEISHI_J_DARK: CastScript = {
  unitId: "j-en-2-domeishi",
  castId: "j-dark",
  title: "WALKING と wish to speak：知識の書「動名詞」の封印を解く",
  scenes: [
    { kind: "chapter", title: "序章：一ページの二つの顔" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "……来たか。我が名はヨトバリ。今宵ひらくのは「動名詞」と記された知識の書だ。",
      say: "……来たか。わがなはヨトバリ。こよい、ひらくのは、動名詞、と記された、知識の書だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "相棒のミカゲ。依頼人は市立図書館の司書。読書会で、アメリカの作家ソローのエッセイ『散歩』を原文で読むそうよ。",
      say: "相棒のミカゲ。依頼人は、市立図書館の司書。読書会で、アメリカの作家、ソローの、エッセイ、さんぽを、原文で読むそうよ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "題名は WALKING。なのに最初の一文は I wish to speak。どちらも「〜すること」。……作家の気分で選んだだけでしょう。",
      say: "題名は、ウォーキング。なのに、最初の一文は、アイ ウィッシュ トゥー スピーク。どちらも、することの意味。……作家の気分で、選んだだけでしょう。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "否。形を決める者は、別にいる。……開け、知識の書。",
      say: "いな。かたちを決める者は、別にいる。……ひらけ、知識の書。",
    },

    { kind: "chapter", title: "第一章：動作が名前になる" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "swim は「泳ぐ」という動作。-ing をつけた swimming は「泳ぐこと」という、ものごとの名前になる。これが{{動名詞}}だ。",
      say: "スイムは、泳ぐ、という動作。イングをつけた、スイミングは、泳ぐこと、という、ものごとの名前になる。これが、動名詞だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "補語" },
      text: "名前ゆえ、名詞の席に座れる。Swimming is fun. なら主語。I like reading. なら目的語。My hobby is cooking. なら補語。Thank you for coming. なら前置詞のあとだ。",
      say: "名前ゆえ、名詞の席に、座れる。スイミング イズ ファン、なら、主語。アイ ライク リーディング、なら、目的語。マイ ホビー イズ クッキング、なら、補語。サンキュー フォー カミング、なら、前置詞の、あとだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "swimming in the sea のように、うしろに語がついて長くなっても、全体で1つの名詞として働く。形は進行形の -ing と同じだが、役目がちがうのだ。",
      say: "スイミング イン ザ シー、のように、うしろにごがついて、長くなっても、全体で、ひとつの名詞として、働く。かたちは、しんこうけいの、イングと同じだが、役目が、ちがうのだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "なら「本を読むことは楽しい」は Reading books are fun.。books が複数だもの、are でしょう。",
      say: "なら、本を読むことは、楽しい、は、リーディング ブックス アー ファン。ブックスが、複数だもの、アーでしょう。",
    },
    { kind: "talk", who: "sensei", text: "……主語は、何だ。最初の封印だ。", say: "……主語は、なんだ。最初の封印だ。" },
    { kind: "pause", ref: "mistake:3" },
    {
      kind: "talk",
      who: "sensei",
      text: "エマソンの「自己信頼」にも Travelling is a fool's paradise. とある。主語の動名詞は1つのことゆえ、be動詞は is だ。",
      say: "エマソンの、自己信頼にも、トラベリング イズ ア フールズ パラダイス、とある。主語の動名詞は、ひとつのことゆえ、ビー動詞は、イズだ。",
    },

    { kind: "chapter", title: "第二章：時の向き" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "だが「〜すること」は、不定詞の to ＋ 原形でも表せる。どちらを従えるかは、前の動詞が決める。{{enjoy・finish・stop}} は動名詞だけ。{{want・hope・decide}} は不定詞だけ。like・start・begin はどちらでもよい。",
      say: "だが、することは、不定詞の、トゥー たす原形でも、表せる。どちらを従えるかは、まえの動詞が決める。エンジョイ、フィニッシュ、ストップは、動名詞だけ。ウォント、ホープ、ディサイドは、不定詞だけ。ライク、スタート、ビギンは、どちらでもよい。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "I finished writing the report. で「レポートを書き終えた」。I want to go to Hokkaido. で「北海道に行きたい」。I hope to see you again. で「また会えるといいな」。",
      say: "アイ フィニッシュト ライティング ザ レポート、で、レポートを、書き終えた。アイ ウォント トゥー ゴー トゥー ホッカイドー、で、北海道に、いきたい。アイ ホープ トゥー シー ユー アゲイン、で、また会えるといいな。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "to をつければ未来にも過去にも使える。I enjoyed to talk with her. で十分でしょう。",
      say: "トゥーをつければ、未来にも、過去にも使える。アイ エンジョイド トゥー トーク ウィズ ハー、で、じゅうぶんでしょう。",
    },
    { kind: "talk", who: "sensei", text: "……enjoy が従えるのは、どちらだ。見きわめよ。", say: "……エンジョイが、従えるのは、どちらだ。見きわめよ。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "動名詞だけ" },
      text: "見分けの鍵は{{時の向き}}。楽しむ・終える・やめるのは、実際にしていること。ゆえに -ing。望む・願う・決めるのは、これからのこと。to には「〜のほうへ向かう」感じがある。",
      say: "見分けのかぎは、ときの向き。楽しむ、終える、やめるのは、実際に、していること。ゆえに、イング。望む、願う、決めるのは、これからのこと。トゥーには、のほうへ向かう、感じがある。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "stop talking は「話すのをやめる」。stop to talk は「話すために立ち止まる」。……向きで意味まで変わるのね。",
      say: "ストップ トーキングは、話すのを、やめる。ストップ トゥー トークは、話すために、立ち止まる。……向きで、意味まで変わるのね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ソローの I wish to speak a word for Nature。{{wish}} は「これから」に向かう動詞。ゆえに to speak だ。",
      say: "ソローの、アイ ウィッシュ トゥー スピーク ア ワード フォー ネイチャー。ウィッシュは、これからに向かう、動詞。ゆえに、トゥー スピークだ。",
    },

    { kind: "chapter", title: "第三章：前置詞の掟" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "最大の掟だ。at・for・about・of などの{{前置詞のあと}}に動詞を置くなら、必ず{{動名詞}}。I am good at swimming. Thank you for helping me. to ＋ 原形は、ここには置けぬ。",
      say: "最大の、おきてだ。アット、フォー、アバウト、オブなどの、前置詞のあとに、動詞を置くなら、必ず、動名詞。アイ アム グッド アット スイミング。サンキュー フォー ヘルピング ミー。トゥー たす原形は、ここには置けぬ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "ギターがうまい彼なら He is good at play the guitar.。動詞は原形のままが基本でしょう。",
      say: "ギターがうまい彼なら、ヒー イズ グッド アット プレイ ザ ギター。動詞は、原形のままが、基本でしょう。",
    },
    { kind: "talk", who: "sensei", text: "……at のあとに、動詞がそのまま座れるか。", say: "……アットのあとに、動詞が、そのまま座れるか。" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "How about going to the park?" },
      text: "How about going to the park? も同じ掟。about は前置詞だ。では、「写真をとるのはどうですか」を言ってみよ。",
      say: "ハウ アバウト ゴーイング トゥー ザ パーク、も、同じおきて。アバウトは、前置詞だ。では、写真をとるのは、どうですか、を、言ってみよ。",
    },
    { kind: "pause", ref: "check:1" },
    {
      kind: "talk",
      who: "seito",
      text: "ソローは1845年の夏から約2年、ウォールデン池のほとりに自分で小屋を建てて、ひとりで暮らした。土地はエマソンのもの。その記録が1854年の『ウォールデン　森の生活』ね。",
      say: "ソローは、1845ねんの夏から、約2ねん、ウォールデンいけのほとりに、自分で小屋を建てて、ひとりで暮らした。土地は、エマソンのもの。その記録が、1854ねんの、ウォールデン、森の生活ね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そこに As if you could kill time without injuring eternity. とある。前置詞 {{without}} のあとゆえ injuring。時間をむだにすれば、もっと大きなものを傷つける、という皮肉だ。",
      say: "そこに、アズ イフ ユー クッド キル タイム ウィザウト インジュアリング エターニティ、とある。前置詞、ウィザウトのあとゆえ、インジュアリング。時間をむだにすれば、もっと大きなものを、傷つける、という皮肉だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "依頼の謎だ。『散歩』には the art of Walking とある。前置詞 of のあとゆえ Walking。題名の WALKING も、ソローが毎日していた営みにつけた{{動名詞}}だ。形を選んだのは気分ではない。すぐ前の語だ。……線は、つながった。",
      say: "依頼の謎だ。さんぽには、ジ アート オブ ウォーキング、とある。前置詞、オブのあとゆえ、ウォーキング。題名の、ウォーキングも、ソローが毎日、していた営みに、つけた、動名詞だ。かたちを選んだのは、気分ではない。すぐまえのごだ。……線は、つながった。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "……なるほどね。手引きには「-ing か to かは、前の語を見て決まる」と書いてもらうわ。",
      say: "……なるほどね。手引きには、イングか、トゥーかは、まえのごを見て決まる、と、書いてもらうわ。",
    },

    { kind: "chapter", title: "終章：-ing の二つの顔" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "最後に罠を一つ。My sister is reading. は、姉が今まさに読んでいる{{進行形}}。My hobby is reading. は、My hobby ＝ reading。こちらが動名詞だ。",
      say: "最後に、わなをひとつ。マイ シスター イズ リーディングは、姉が、いままさに読んでいる、しんこうけい。マイ ホビー イズ リーディングは、マイ ホビー、イコール、リーディング。こちらが、動名詞だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "ワイルドの喜劇『まじめが肝心』の原題は The Importance of Being Earnest。of のあとだから Being。earnest は男性の名前アーネストと同じ発音で、題名そのものがしゃれね。",
      say: "ワイルドの喜劇、まじめがかんじんの、原題は、ジ インポータンス オブ ビーイング アーネスト。オブのあとだから、ビーイング。アーネストは、男性の名前、アーネストと、同じ発音で、題名そのものが、しゃれね。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "主語 ＝ -ing（イコール）" },
      text: "主語と -ing がイコールで結べるか。それを見きわめれば、-ing の顔は見誤らぬ。封印は、解かれた。",
      say: "主語と、イングが、イコールで結べるか。それを見きわめれば、イングの顔は、見誤らぬ。封印は、解かれた。",
    },
  ],
};
