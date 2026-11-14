import type { CastScript } from "../types";

// 止まる授業：動名詞（高校・英文法）× カリスマ講師（カナメ先生・ユウキ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-domeishi.ts の本文だけ。
// 要点をしぼって言い切り、「ポイントは〜」で整理する。英文は say でカタカナに開く。問題は data/h-eng-gram-domeishi.ts から引く。

export const H_DOMEISHI_H_CHARISMA: CastScript = {
  unitId: "h-eng-gram-domeishi",
  castId: "h-charisma",
  title: "-ing だらけの名文で、動名詞はただ1つ？　決め手は「名詞の席」",
  scenes: [
    { kind: "chapter", title: "つかみ：-ing だらけの結びの段落" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "カナメです。今日の依頼人は、自然史博物館の展示翻訳スタッフ。ダーウィン展で『種の起源』の結びの段落をパネルにするが、-ing の語が多すぎて、どれを「〜すること」と訳すかで意見が割れている。",
      say: "カナメです。きょうの依頼人は、自然史博物館の、展示翻訳スタッフ。ダーウィン展で、しゅのきげんの、結びの段落を、パネルにするが、イングのごが多すぎて、どれを、なになにすること、と訳すかで、意見が割れている。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "受講生のユウキです。singing、crawling、conceiving、cycling……たしかに並んでますね。",
      say: "受講生のユウキです。シンギング、クローリング、コンシービング、サイクリング。たしかに、並んでますね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "1859年の初版だ。この中で「名詞の席」に座っている動名詞は、じつはたった1つ。見た目が同じ -ing を、どう見分けるか。今日はこれを解く。",
      say: "1859ねんの初版だ。このなかで、名詞の席に座っている動名詞は、じつは、たったひとつ。みためが同じイングを、どう見分けるか。きょうは、これを解く。",
    },

    { kind: "chapter", title: "1. 動名詞は名詞の席に座る" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "動名詞は動詞の -ing 形で「{{〜すること}}」。ポイントは、英語には名詞しか座れない{{席}}があること。主語、動詞のあとの目的語、be 動詞のあとの補語、そして{{前置詞のあと}}だ。",
      say: "動名詞は、動詞の、イングけいで、なになにすること。ポイントは、英語には、名詞しか座れない、席があること。主語、動詞のあとの目的語、ビー動詞のあとの補語、そして、前置詞のあとだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "主語" },
      text: "Reading novels is my favorite way to relax. なら、Reading が主語の席。しかも novels という目的語をとっている。名詞の席に座りながら、動詞の手足も残す。一言でいうと「{{半分名詞、半分動詞}}」だ。",
      say: "リーディング ノベルズ イズ マイ フェイバリット ウェイ トゥー リラックス、なら、リーディングが、主語の席。しかも、ノベルズという目的語を、とっている。名詞の席に座りながら、動詞の手足も残す。ひとことでいうと、半分名詞、半分動詞だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "前置詞の目的語" },
      text: "ここで差がつく。to 不定詞も「〜すること」を表せるが、{{前置詞の後ろには置けない}}。1813年の『高慢と偏見』の To be fond of dancing was a certain step towards falling in love. では、of と towards のあとに dancing と falling が座っている。",
      say: "ここで差がつく。トゥー不定詞も、なになにすること、を表せるが、前置詞のうしろには、置けない。1813ねんの、高慢と偏見の、トゥー ビー フォンド オブ ダンシング ワズ ア サートゥン ステップ トゥワーズ フォーリング イン ラブ、では、オブと、トゥワーズのあとに、ダンシングと、フォーリングが、座っている。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ「会えるのを楽しみにしています」は、I'm looking forward to see you. ですよね。to のあとは原形だし。",
      say: "じゃあ、会えるのを、楽しみにしています、は、アイム ルッキング フォワード トゥー シー ユー、ですよね。トゥーのあとは、原形だし。",
    },
    { kind: "talk", who: "sensei", text: "定番のひっかけ。問題。" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "sensei",
      text: "look forward to の to は前置詞。だから後ろは seeing。Thank you for inviting me. の for も同じ。前置詞のあとに動作を入れるなら、動名詞しか選べない。",
      say: "ルック フォワード トゥーの、トゥーは、前置詞。だから、うしろは、シーイング。サンキュー フォー インバイティング ミーの、フォーも同じ。前置詞のあとに、動作を入れるなら、動名詞しか、選べない。",
    },

    { kind: "chapter", title: "2. -ing は実際のこと、to はこれから" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "次は目的語の席。-ing も to も座れるが、動詞によって片方しかとらない。手がかりは、to がもともと「〜へ向かって」という方向の語だったこと。to 不定詞は{{これから先のこと}}、動名詞は{{すでにしていること・実際のこと}}に向きやすい。",
      say: "次は、目的語の席。イングも、トゥーも座れるが、動詞によって、片方しかとらない。てがかりは、トゥーが、もともと、なになにへ向かって、という方向のごだったこと。トゥー不定詞は、これから先のこと。動名詞は、すでにしていること、実際のことに、向きやすい。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "enjoy（楽しむ）" },
      text: "enjoy・finish・mind・avoid・give up は、実際の動作が相手だから動名詞。楽しむには、まずその動作をしていないといけない。want・hope・decide・plan・promise は先に目を向けるから to。",
      say: "エンジョイ、フィニッシュ、マインド、アボイド、ギブ アップは、実際の動作が、相手だから、動名詞。楽しむには、まず、その動作を、していないといけない。ウォント、ホープ、ディサイド、プラン、プロミスは、さきに、めを向けるから、トゥー。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ Would you mind ___ the door? は、これからお願いする動作だから to open ですね。",
      say: "じゃあ、ウッド ユー マインド、なになに、ザ ドア、は、これからお願いする動作だから、トゥー オープン、ですね。",
    },
    { kind: "talk", who: "sensei", text: "そう考えた人、要注意。問題。", say: "そう考えたひと、要注意。問題。" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "mind（いやがる）" },
      text: "mind は動名詞だけ。ダーウィンも Darwin put off publishing his theory for about twenty years.　発表をおよそ20年延ばした。put off のあとも動名詞だ。",
      say: "マインドは、動名詞だけ。ダーウィンも、ダーウィン プット オフ パブリッシング ヒズ セオリー フォー アバウト トゥエンティ イヤーズ。発表を、およそ20ねん延ばした。プット オフのあとも、動名詞だ。",
    },

    { kind: "chapter", title: "3. 意味が変わる動詞" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "1858年、ウォレスから届いた手紙で、ダーウィンは大急ぎで本をまとめ、翌1859年に出した。The letter made Darwin stop putting off his book.　putting は動名詞で、「先延ばしにすること」をやめた。",
      say: "1858ねん、ウォレスから届いた手紙で、ダーウィンは、大急ぎで本をまとめ、翌1859ねんに出した。ザ レター メイド ダーウィン ストップ プッティング オフ ヒズ ブック。プッティングは動名詞で、先延ばしにすることを、やめた。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "remember" },
      text: "では Darwin stopped to write his book. は？　stop は to 不定詞を目的語にとらないから、to write は「書くために」の{{副詞的用法}}。remember・forget・regret・try は両方とれて、意味が変わる。ポイントは、-ing は「したこと」、to は「これから」。",
      say: "では、ダーウィン ストップト トゥー ライト ヒズ ブック、は？　ストップは、トゥー不定詞を、目的語にとらないから、トゥー ライトは、書くために、の、副詞的用法。リメンバー、フォゲット、リグレット、トライは、両方とれて、意味が変わる。ポイントは、イングは、したこと。トゥーは、これから。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "「子どものころ、このお寺を訪れたのを覚えている」は、I remember to visit this temple as a child. ですね。",
      say: "子どものころ、このお寺を、訪れたのを覚えている、は、アイ リメンバー トゥー ビジット ディス テンプル アズ ア チャイルド、ですね。",
    },
    { kind: "talk", who: "sensei", text: "時の向きを見よう。問題。", say: "ときの向きを見よう。問題。" },
    { kind: "pause", ref: "mistake:3" },
    {
      kind: "talk",
      who: "sensei",
      text: "as a child は過去。だから visiting。Remember to return this book. なら「忘れずに返してね」。regret も同じ向きで、regret telling は「話してしまったのを後悔する」だ。",
      say: "アズ ア チャイルドは、過去。だから、ビジティング。リメンバー トゥー リターン ディス ブック、なら、忘れずに返してね。リグレットも同じ向きで、リグレット テリングは、話してしまったのを後悔する、だ。",
    },

    { kind: "chapter", title: "4. だれが、いつ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "動作をするのが文の主語とちがうときは、-ing の前に{{所有格か目的格}}。I'm proud of my son's winning. 否定は{{not を -ing の直前}}に。Thank you for not giving up.",
      say: "動作をするのが、文の主語とちがうときは、イングの前に、所有格か、目的格。アイム プラウド オブ マイ サンズ ウィニング。否定は、ノットを、イングの直前に。サンキュー フォー ノット ギビング アップ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "having been" },
      text: "述語動詞より{{前のこと}}は having ＋過去分詞。She is proud of having been a nurse. 看護師だったのは過去、誇りに思うのは今。では確認。",
      say: "述語動詞より、前のことは、ハビング、たす、過去分詞。シー イズ プラウド オブ ハビング ビーン ア ナース。看護師だったのは過去、誇りに思うのは、いま。では確認。",
    },
    { kind: "pause", ref: "check:2" },

    { kind: "chapter", title: "謎解き：名詞の席にいるのは" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "謎解きだ。決め手は、-ing が{{名詞の席}}に座っているかどうか。birds singing on the bushes は「やぶでさえずる鳥」、worms crawling through the damp earth は「湿った土をはうミミズ」。前の名詞を説明する{{現在分詞}}だ。",
      say: "謎解きだ。きめては、イングが、名詞の席に、座っているかどうか。バーズ シンギング オン ザ ブッシズは、やぶでさえずる鳥。ワームズ クローリング スルー ザ ダンプ アースは、湿った土をはう、ミミズ。前の名詞を説明する、現在分詞だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4, focus: "capable of conceiving" },
      text: "cycling on は go ＋ -ing の決まった言い方、having been breathed は powers を説明する分詞。前置詞 of のあと、名詞の席に座るのは capable of conceiving だけ。しかも which を目的語にとる。これが、ただ1つの動名詞だ。",
      say: "サイクリング オンは、ゴー、たす、イングの、決まった言いかた。ハビング ビーン ブリーズドは、パワーズを説明する分詞。前置詞オブのあと、名詞の席に座るのは、ケイパブル オブ コンシービングだけ。しかも、ウィッチを目的語にとる。これが、ただひとつの、動名詞だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "だから conceiving だけを「思いえがくこと」と訳して、ほかは「さえずる鳥」のように訳せばいいんですね。",
      say: "だから、コンシービングだけを、思いえがくこと、と訳して、ほかは、さえずる鳥のように、訳せばいいんですね。",
    },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "sensei",
      text: "次はきみが講師だ。キーワードは、名詞の席、前置詞のあとは -ing、実際のことは -ing、これからは to、意味上の主語と having。この順につないで、翻訳スタッフに説明してみよう。",
      say: "次はきみが講師だ。キーワードは、名詞の席、前置詞のあとは、イング、実際のことは、イング、これからは、トゥー、意味上の主語と、ハビング。この順につないで、翻訳スタッフに、説明してみよう。",
    },
  ],
};
