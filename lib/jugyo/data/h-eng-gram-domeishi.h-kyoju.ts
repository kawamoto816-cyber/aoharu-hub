import type { CastScript } from "../types";

// 止まる授業：動名詞（高校・英文法）× 名物教授（チグサ教授・ミオ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-domeishi.ts の本文だけ。
// 答えをすぐ言わず、問いで考えさせる。英文は say でカタカナに開く。問題は data/h-eng-gram-domeishi.ts から引く。

export const H_DOMEISHI_H_KYOJU: CastScript = {
  unitId: "h-eng-gram-domeishi",
  castId: "h-kyoju",
  title: "ダーウィンの -ing、どれが動名詞？　チグサ教授と「名詞の席」をさがす",
  scenes: [
    { kind: "chapter", title: "つかみ：翻訳チームの迷い" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さて、チグサです。自然史博物館の展示翻訳スタッフから相談が来ておる。ダーウィン展で、『種の起源』の結びの段落を英語のままパネルにするそうだ。ところが -ing の語が多くて、どれを「〜すること」と訳すかで、チームの意見が割れた。",
      say: "さて、チグサです。自然史博物館の、展示翻訳スタッフから、相談が来ておる。ダーウィン展で、しゅのきげんの、結びの段落を、英語のまま、パネルにするそうだ。ところが、イングのごが多くて、どれを、なになにすること、と訳すかで、チームの意見が、割れた。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "ゼミのミオです。singing、crawling、conceiving、cycling。仮説。-ing なんだから、ぜんぶ「〜すること」！",
      say: "ゼミのミオです。シンギング、クローリング、コンシービング、サイクリング。仮説。イングなんだから、ぜんぶ、なになにすること！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "うむ、元気な仮説だ。だが1859年の初版のこの段落で、名詞の席に座っている動名詞は、じつはたった1つ。さて、どうやって見分けると思う？",
      say: "うむ、元気な仮説だ。だが、1859ねんの初版の、この段落で、名詞の席に座っている動名詞は、じつは、たったひとつ。さて、どうやって、見分けると思う？",
    },

    { kind: "chapter", title: "1. 名詞しか座れない席" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "英語の文には、名詞しか座れない{{席}}がある。主語、動詞のあとの目的語、be 動詞のあとの補語、そして{{前置詞のあと}}。動詞はそのままでは座れん。そこで -ing をつけて名詞の顔をさせる。これが{{動名詞}}だ。",
      say: "英語の文には、名詞しか座れない、席がある。主語、動詞のあとの目的語、ビー動詞のあとの補語、そして、前置詞のあと。動詞は、そのままでは座れん。そこで、イングをつけて、名詞の顔をさせる。これが、動名詞だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "主語" },
      text: "Reading novels is my favorite way to relax. Reading は主語の席。だが novels という目的語をとり、reading quietly のように副詞もつけられる。さて、これは名詞かね、動詞かね？",
      say: "リーディング ノベルズ イズ マイ フェイバリット ウェイ トゥー リラックス。リーディングは、主語の席。だが、ノベルズという目的語をとり、リーディング クワイエットリーのように、副詞もつけられる。さて、これは名詞かね、動詞かね？",
    },
    {
      kind: "talk",
      who: "seito",
      text: "仮説。どっちも！　名詞の席に座りながら、動詞の手足も残してる。半分名詞、半分動詞！",
      say: "仮説。どっちも！　名詞の席に座りながら、動詞のてあしも、残してる。半分名詞、半分動詞！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "前置詞の目的語" },
      text: "見事。to 不定詞も「〜すること」を表せるが、{{前置詞の後ろには置けない}}。1813年の『高慢と偏見』の To be fond of dancing was a certain step towards falling in love. では、of と towards のあとに dancing と falling が座っておる。",
      say: "見事。トゥー不定詞も、なになにすること、を表せるが、前置詞のうしろには、置けない。1813ねんの、高慢と偏見の、トゥー ビー フォンド オブ ダンシング ワズ ア サートゥン ステップ トゥワーズ フォーリング イン ラブ、では、オブと、トゥワーズのあとに、ダンシングと、フォーリングが、座っておる。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "仮説。でも I'm looking forward to see you. は、to のあとだから原形で正しい！",
      say: "仮説。でも、アイム ルッキング フォワード トゥー シー ユー、は、トゥーのあとだから、原形で正しい！",
    },
    { kind: "talk", who: "sensei", text: "さて、その to は何者かな。問題だ。", say: "さて、そのトゥーは、何者かな。問題だ。" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "sensei",
      text: "うむ。look forward to の to は前置詞。Thank you for inviting me. の for も同じ。前置詞のあとに動作を入れたいときは、動名詞しか選べんのだ。",
      say: "うむ。ルック フォワード トゥーの、トゥーは、前置詞。サンキュー フォー インバイティング ミーの、フォーも同じ。前置詞のあとに、動作を入れたいときは、動名詞しか、選べんのだ。",
    },

    { kind: "chapter", title: "2. to は「向かう先」" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "では目的語の席。-ing も to も座れるのに、動詞によって片方しかとらん。なぜだと思う？　ヒントは、to がもともと「〜へ向かって」という方向を表す語だったことだ。",
      say: "では、目的語の席。イングも、トゥーも座れるのに、動詞によって、片方しかとらん。なぜだと思う？　ヒントは、トゥーが、もともと、なになにへ向かって、という方向を表す、ごだったことだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "仮説。to は、まだ起きていない{{これから先のこと}}。-ing は、{{すでにしていること・実際のこと}}！",
      say: "仮説。トゥーは、まだ起きていない、これから先のこと。イングは、すでにしていること、実際のこと！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "enjoy（楽しむ）" },
      text: "うむ。楽しむには、まずその動作をしていなければならん。だから enjoy・finish・avoid・give up は動名詞。want・hope・decide・plan・promise は先へ目を向けるから to。では mind（いやがる）は、どちらだと思う？",
      say: "うむ。楽しむには、まず、その動作を、していなければならん。だから、エンジョイ、フィニッシュ、アボイド、ギブ アップは、動名詞。ウォント、ホープ、ディサイド、プラン、プロミスは、さきへ、めを向けるから、トゥー。では、マインド、いやがる、は、どちらだと思う？",
    },
    {
      kind: "talk",
      who: "seito",
      text: "仮説。「ドアを開けていただけますか」は、これから開けてもらう話だから to open！",
      say: "仮説。ドアを、開けていただけますか、は、これから開けてもらう話だから、トゥー オープン！",
    },
    { kind: "talk", who: "sensei", text: "さて、図の左の列をよく見たまえ。問題だ。", say: "さて、図の左の列を、よく見たまえ。問題だ。" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "mind（いやがる）" },
      text: "うむ、mind は動名詞だけ。図の注のとおり、これは目安で、例外もある。よく出る動詞は組で覚えるのがよい。ダーウィン自身も、Darwin put off publishing his theory for about twenty years.　発表をおよそ20年延ばした。",
      say: "うむ、マインドは、動名詞だけ。図の注のとおり、これは目安で、例外もある。よく出る動詞は、組で覚えるのがよい。ダーウィン自身も、ダーウィン プット オフ パブリッシング ヒズ セオリー フォー アバウト トゥエンティ イヤーズ。発表を、およそ20ねん、延ばした。",
    },

    { kind: "chapter", title: "3. stop の謎" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "1858年、ウォレスから手紙と論文が届き、ダーウィンは大急ぎで本をまとめた。The letter made Darwin stop putting off his book. では Darwin stopped to write his book. は、何をやめたと思う？",
      say: "1858ねん、ウォレスから、手紙と論文が届き、ダーウィンは、大急ぎで本をまとめた。ザ レター メイド ダーウィン ストップ プッティング オフ ヒズ ブック。では、ダーウィン ストップト トゥー ライト ヒズ ブック、は、なにをやめたと思う？",
    },
    {
      kind: "talk",
      who: "seito",
      text: "仮説。本を書くのをやめた……あれ？　stop は to 不定詞を目的語にとらないから、to write は「書くために」！",
      say: "仮説。本を書くのを、やめた。あれ？　ストップは、トゥー不定詞を、目的語にとらないから、トゥー ライトは、書くために！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "remember" },
      text: "見事、{{副詞的用法}}だ。remember・forget・regret・try は両方とれて意味が変わる。ここでも -ing は「したこと」、to は「これから」。regret telling は「話してしまったのを後悔する」、regret to tell は「残念ながらお伝えします」。",
      say: "見事、副詞的用法だ。リメンバー、フォゲット、リグレット、トライは、両方とれて、意味が変わる。ここでも、イングは、したこと。トゥーは、これから。リグレット テリングは、話してしまったのを、後悔する。リグレット トゥー テルは、残念ながら、お伝えします。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "仮説。「子どものころ、このお寺を訪れたのを覚えている」は、I remember to visit this temple as a child.",
      say: "仮説。子どものころ、このお寺を、訪れたのを覚えている、は、アイ リメンバー トゥー ビジット ディス テンプル アズ ア チャイルド。",
    },
    { kind: "talk", who: "sensei", text: "さて、訪れたのはいつかな。問題だ。", say: "さて、訪れたのは、いつかな。問題だ。" },
    { kind: "pause", ref: "mistake:3" },

    { kind: "chapter", title: "4. だれが、いつ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "動名詞も動作だ。だれがするのか。勝ったのが息子なら I'm proud of my son's winning. と、-ing の前に{{所有格か目的格}}を置く。否定は Thank you for not giving up. のように、{{not を -ing の直前}}に。",
      say: "動名詞も、動作だ。だれがするのか。勝ったのが息子なら、アイム プラウド オブ マイ サンズ ウィニング、と、イングの前に、所有格か、目的格を置く。否定は、サンキュー フォー ノット ギビング アップ、のように、ノットを、イングの直前に。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "having been" },
      text: "さて、時のずれは？　She is proud of having been a nurse. 誇りは今、看護師だったのは過去。述語動詞より前のことは having ＋過去分詞だ。では、きみが確かめたまえ。",
      say: "さて、時のずれは？　シー イズ プラウド オブ ハビング ビーン ア ナース。誇りは、いま。看護師だったのは、過去。述語動詞より、前のことは、ハビング、たす、過去分詞だ。では、きみが確かめたまえ。",
    },
    { kind: "pause", ref: "check:2" },

    { kind: "chapter", title: "謎解き：ただ1つの動名詞" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "さて、謎にもどろう。birds singing on the bushes は「歌うこと」かね？",
      say: "さて、謎にもどろう。バーズ シンギング オン ザ ブッシズは、歌うこと、かね？",
    },
    {
      kind: "talk",
      who: "seito",
      text: "わたしの最初の仮説は外れでした。「やぶでさえずる鳥」。worms crawling も「はうミミズ」。前の名詞を説明する{{現在分詞}}で、名詞の席にはいません。",
      say: "わたしの最初の仮説は、外れでした。やぶでさえずる鳥。ワームズ クローリングも、はうミミズ。前の名詞を説明する、現在分詞で、名詞の席には、いません。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4, focus: "capable of conceiving" },
      text: "うむ。cycling on は go ＋ -ing の決まった言い方、having been breathed は powers を説明する分詞。前置詞 of のあとに座り、which を目的語にとるのは、capable of conceiving ただ1つ。半分名詞、半分動詞だね。",
      say: "うむ。サイクリング オンは、ゴー、たす、イングの、決まった言いかた。ハビング ビーン ブリーズドは、パワーズを説明する分詞。前置詞オブのあとに座り、ウィッチを目的語にとるのは、ケイパブル オブ コンシービング、ただひとつ。半分名詞、半分動詞だね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "翻訳チームには、こう伝えよう。-ing を見たら、まず座っている席を確かめる。さて、きみは次に -ing を見たとき、何から確かめるかね？",
      say: "翻訳チームには、こう伝えよう。イングを見たら、まず、座っている席を、確かめる。さて、きみは次に、イングを見たとき、なにから確かめるかね？",
    },
  ],
};
