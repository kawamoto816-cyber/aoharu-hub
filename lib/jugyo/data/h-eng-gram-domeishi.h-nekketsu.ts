import type { CastScript } from "../types";

// 止まる授業：動名詞（高校・英文法）× 熱血エンタメ講義（ダイチ・カエデ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-domeishi.ts の本文だけ。
// 画面の前のきみに語りかけ、テンポよく進める。英文は say でカタカナに開く。問題は data/h-eng-gram-domeishi.ts から引く。

export const H_DOMEISHI_H_NEKKETSU: CastScript = {
  unitId: "h-eng-gram-domeishi",
  castId: "h-nekketsu",
  title: "-ing の正体をあばけ！　名詞の席に座るのはだれだショー",
  scenes: [
    { kind: "chapter", title: "オープニング：-ing の大行列" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さあ、いくぞ！　ダイチだ！　今日の依頼人は、自然史博物館の展示翻訳スタッフ！　ダーウィン展で『種の起源』の結びの段落をパネルにするのに、-ing の語が多すぎて、どれを「〜すること」と訳すかでチームが割れた！",
      say: "さあ、いくぞ！　ダイチだ！　きょうのいらいにんは、自然史博物館の、展示翻訳スタッフ！　ダーウィン展で、しゅのきげんの、結びの段落を、パネルにするのに、イングのごが、多すぎて、どれを、なになにすること、と訳すかで、チームが割れた！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "聞き役のカエデです！　singing、crawling、conceiving、cycling……-ing だらけ！　ぜんぶ動名詞でしょ？",
      say: "聞き役のカエデです！　シンギング、クローリング、コンシービング、サイクリング。イングだらけ！　ぜんぶ、動名詞でしょ？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ところが！　1859年の初版のこの段落で、名詞の席に座る動名詞は、たった1つ！　画面の前のきみも、四つのステージで正体をあばこう！",
      say: "ところが！　1859ねんの、初版の、この段落で、名詞の席に座る動名詞は、たったひとつ！　画面の前のきみも、よっつのステージで、正体をあばこう！",
    },

    { kind: "chapter", title: "1. 名詞の席に座れ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "最初のステージ！　英語には名詞しか座れない{{席}}がある！　主語、動詞のあとの目的語、be 動詞のあとの補語、そして{{前置詞のあと}}！　動詞に -ing をつけて名詞の顔をさせる、それが{{動名詞}}だ！",
      say: "最初のステージ！　英語には、名詞しか座れない、席がある！　主語、動詞のあとの目的語、ビー動詞のあとの補語、そして、前置詞のあと！　動詞に、イングをつけて、名詞の顔をさせる、それが、動名詞だ！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "主語" },
      text: "Reading novels is my favorite way to relax. Reading は主語の席！　しかも novels という目的語をとる！　名詞の席にいながら、動詞の手足も残す！　ここが熱い！　「{{半分名詞、半分動詞}}」だ！",
      say: "リーディング ノベルズ イズ マイ フェイバリット ウェイ トゥー リラックス。リーディングは、主語の席！　しかも、ノベルズという目的語を、とる！　名詞の席にいながら、動詞のてあしも残す！　ここが熱い！　半分名詞、半分動詞だ！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "前置詞の目的語" },
      text: "そして to 不定詞は、{{前置詞の後ろには置けない}}！　1813年の『高慢と偏見』を見よ！　To be fond of dancing was a certain step towards falling in love. of と towards のあとは、dancing と falling だ！",
      say: "そして、トゥー不定詞は、前置詞のうしろには、置けない！　1813ねんの、高慢と偏見を見よ！　トゥー ビー フォンド オブ ダンシング ワズ ア サートゥン ステップ トゥワーズ フォーリング イン ラブ。オブと、トゥワーズのあとは、ダンシングと、フォーリングだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "なるほど！　でも I'm looking forward to see you. は、to のあとだから原形でいいんだよね！",
      say: "なるほど！　でも、アイム ルッキング フォワード トゥー シー ユー、は、トゥーのあとだから、原形でいいんだよね！",
    },
    { kind: "talk", who: "sensei", text: "ちょっと待った！　問題だ！" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "seito",
      text: "look forward to の to は前置詞だったんだ！　だから seeing。Thank you for inviting me. の for と同じだね！",
      say: "ルック フォワード トゥーの、トゥーは、前置詞だったんだ！　だから、シーイング。サンキュー フォー インバイティング ミーの、フォーと、同じだね！",
    },

    { kind: "chapter", title: "2. 実際か、これからか！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "第二ステージ！　目的語の席には -ing も to も座れる！　でも動詞によって片方しかとらない！　カギは、to がもともと「〜へ向かって」の方向の語だったこと！　to は{{これから先のこと}}、-ing は{{すでにしていること・実際のこと}}！",
      say: "第二ステージ！　目的語の席には、イングも、トゥーも座れる！　でも、動詞によって、片方しかとらない！　カギは、トゥーが、もともと、なになにへ向かって、の、方向のごだったこと！　トゥーは、これから先のこと。イングは、すでにしていること、実際のこと！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "enjoy（楽しむ）" },
      text: "enjoy・finish・mind・avoid・give up は動名詞！　楽しむには、まずやっていなきゃ始まらない！　want・hope・decide・plan・promise は未来を見つめて to だ！",
      say: "エンジョイ、フィニッシュ、マインド、アボイド、ギブ アップは、動名詞！　楽しむには、まず、やっていなきゃ始まらない！　ウォント、ホープ、ディサイド、プラン、プロミスは、未来を見つめて、トゥーだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でも「ドアを開けていただけますか」は、これからのお願いだよ！　mind のあとは to open じゃないの？",
      say: "でも、ドアを、開けていただけますか、は、これからのお願いだよ！　マインドのあとは、トゥー オープン、じゃないの？",
    },
    { kind: "talk", who: "sensei", text: "画面の前のきみ、どっちだ！", say: "画面の前のきみ、どっちだ！" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "mind（いやがる）" },
      text: "mind は動名詞だけ！　この考え方は目安、例外もある！　よく出る動詞は組で覚えろ！　ダーウィンも Darwin put off publishing his theory for about twenty years. 発表をおよそ20年延ばした！",
      say: "マインドは、動名詞だけ！　この考えかたは、目安、例外もある！　よく出る動詞は、組で覚えろ！　ダーウィンも、ダーウィン プット オフ パブリッシング ヒズ セオリー フォー アバウト トゥエンティ イヤーズ。発表を、およそ20ねん、延ばした！",
    },

    { kind: "chapter", title: "3. 1通の手紙！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "第三ステージ！　1858年、ウォレスから届いた手紙が、先延ばしを止めた！　The letter made Darwin stop putting off his book.　そして翌1859年、『種の起源』が出た！",
      say: "第三ステージ！　1858ねん、ウォレスから届いた手紙が、先延ばしを止めた！　ザ レター メイド ダーウィン ストップ プッティング オフ ヒズ ブック。そして、翌1859ねん、しゅのきげんが出た！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "remember" },
      text: "ここが熱い！　Darwin stopped to write his book. の to write は「書くために」の{{副詞的用法}}！　stop の後ろの形で、やめたものが正反対！　remember・forget・regret・try も、-ing は「したこと」、to は「これから」だ！",
      say: "ここが熱い！　ダーウィン ストップト トゥー ライト ヒズ ブックの、トゥー ライトは、書くために、の、副詞的用法！　ストップのうしろのかたちで、やめたものが正反対！　リメンバー、フォゲット、リグレット、トライも、イングは、したこと。トゥーは、これから、だ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "よーし！　「子どものころ、このお寺を訪れたのを覚えている」は、I remember to visit this temple as a child.！",
      say: "よーし！　子どものころ、このお寺を、訪れたのを覚えている、は、アイ リメンバー トゥー ビジット ディス テンプル アズ ア チャイルド！",
    },
    { kind: "talk", who: "sensei", text: "画面の前のきみ、時の向きを見ろ！　問題だ！", say: "画面の前のきみ、時の向きを見ろ！　問題だ！" },
    { kind: "pause", ref: "mistake:3" },
    {
      kind: "talk",
      who: "seito",
      text: "as a child は過去だから visiting！　Remember to return this book. なら「忘れずに返してね」だね！",
      say: "アズ ア チャイルドは、過去だから、ビジティング！　リメンバー トゥー リターン ディス ブック、なら、忘れずに返してね、だね！",
    },

    { kind: "chapter", title: "4. だれが、いつ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "最終ステージ！　動作をするのが主語とちがうなら、-ing の前に{{所有格か目的格}}！　I'm proud of my son's winning. 否定は{{not を -ing の直前}}！　Thank you for not giving up.",
      say: "最終ステージ！　動作をするのが、主語とちがうなら、イングの前に、所有格か、目的格！　アイム プラウド オブ マイ サンズ ウィニング。否定は、ノットを、イングの直前！　サンキュー フォー ノット ギビング アップ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "having been" },
      text: "前のことは having ＋過去分詞！　She is proud of having been a nurse. 誇りは今、看護師だったのは過去！　さあ、きみの番だ！",
      say: "前のことは、ハビング、たす、過去分詞！　シー イズ プラウド オブ ハビング ビーン ア ナース。誇りは、いま。看護師だったのは、過去！　さあ、きみの番だ！",
    },
    { kind: "pause", ref: "check:2" },

    { kind: "chapter", title: "謎解き：正体はこいつだ！" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "さあ謎解きだ！　決め手は、-ing が{{名詞の席}}に座っているかどうか！　birds singing on the bushes は「やぶでさえずる鳥」！　worms crawling through the damp earth は「湿った土をはうミミズ」！",
      say: "さあ謎解きだ！　きめては、イングが、名詞の席に、座っているかどうか！　バーズ シンギング オン ザ ブッシズは、やぶでさえずる鳥！　ワームズ クローリング スルー ザ ダンプ アースは、湿った土をはう、ミミズ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "前の名詞を説明する{{現在分詞}}だ！　cycling on は決まった言い方、having been breathed は powers の説明……",
      say: "前の名詞を説明する、現在分詞だ！　サイクリング オンは、決まった言いかた。ハビング ビーン ブリーズドは、パワーズの説明。",
    },
    {
      kind: "talk",
      who: "seito",
      board: { section: 4, focus: "capable of conceiving" },
      text: "わかった！　前置詞 of のあとに座って、which を目的語にとる capable of conceiving！　これがただ1つの動名詞！",
      say: "わかった！　前置詞オブのあとに座って、ウィッチを目的語にとる、ケイパブル オブ コンシービング！　これが、ただひとつの、動名詞！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そのとおり！　conceiving だけを「思いえがくこと」と訳せば、パネルの日本語はぐっと自然になる！　画面の前のきみも、-ing を見たら、まず席を確かめろ！",
      say: "そのとおり！　コンシービングだけを、思いえがくこと、と訳せば、パネルの日本語は、ぐっと自然になる！　画面の前のきみも、イングを見たら、まず、席を確かめろ！",
    },
  ],
};
