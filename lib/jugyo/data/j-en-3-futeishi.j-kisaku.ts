import type { CastScript } from "../types";

// 止まる授業：不定詞の発展（中3・英語）× 気さくな兄・姉（アサヒ兄さん・スミレ姉さん）。事実・例文・人名・年は lib/lecture/data/j-en-3-futeishi.ts の本文だけ。
// 雑談の調子で、うろ覚えを「わたしもそう覚えてた」と言って直していく。英文は say でカタカナに開く。問題は data/j-en-3-futeishi.ts から引く。

export const J_FUTEISHI3_J_KISAKU: CastScript = {
  unitId: "j-en-3-futeishi",
  castId: "j-kisaku",
  title: "トムはなぜ塀ぬりを人にやらせられた？：It is ～ to・疑問詞＋to・人＋to",
  scenes: [
    { kind: "chapter", title: "つかみ：英語劇の相談" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "よっ、アサヒです。今日は中学校の英語劇クラブの顧問の先生から相談。文化祭で『トム・ソーヤーの冒険』の塀ぬりの場面をやるんだって。",
      say: "よっ、アサヒです。きょうわ、中学校の、英語劇クラブの、顧問の先生から、相談。文化祭で、トム ソーヤーの冒険の、塀ぬりの場面を、やるんだって。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "スミレです。1876年の小説だよね。罰で塀ぬりを言いつけられたトムが、友だちに「ぼくにもぬらせてよ」って頼ませる話。トムってずるいだけじゃない？",
      say: "スミレです。1876ねんの、小説だよね。ばつで、塀ぬりを、言いつけられた、トムが、友だちに、ぼくにも、ぬらせてよ、って、頼ませる話。トムって、ずるいだけじゃない？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "部員にもそう聞かれて、演出が決まらないんだって。実はトム、英語のある型で言いかえただけ。型を三つ見ていこう。",
      say: "部員にも、そう聞かれて、演出が、決まらないんだって。じつわ、トム、英語の、ある、かたで、言いかえただけ。かたを、みっつ、見ていこう。",
    },

    { kind: "chapter", title: "1. It is ～ to" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "まず、To speak English is fun. これも正しいけど、英語は頭が長い文が苦手。だから仮の主語 {{It}} を先に置いて、It is fun to speak English. この It は訳さない。",
      say: "まず、トゥー スピーク イングリッシュ イズ ファン。これも、正しいけど、英語わ、あたまが長い文が、にがて。だから、かりの主語、イットを、さきに置いて、イット イズ ファン トゥー スピーク イングリッシュ。この、イットわ、やくさない。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "It is fun for me to speak English." },
      text: "「私にとって」を足すなら、to の前に {{for＋人}}。It is fun for me to speak English. for のあとは me・him・her・us・them の形ね。",
      say: "わたしにとって、を足すなら、トゥーの、まえに、フォー、ひと。イット イズ ファン フォー ミー トゥー スピーク イングリッシュ。フォーの、あとわ、ミー、ヒム、ハー、アス、ゼムの、かたちね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "あー、そこ。for のあとは she でもいいと思ってた。わたし、そう覚えてた。じゃあ To play the piano is easy for her. を書きかえると……。",
      say: "あー、そこ。フォーの、あとわ、シーでも、いいと思ってた。わたし、そう覚えてた。じゃあ、トゥー プレイ ザ ピアノ イズ イージー フォー ハー、を、書きかえると……。",
    },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "It を先に、to 以下をうしろに。for のあとは目的格だから her。",
      say: "イットを、さきに、トゥー以下を、うしろに。フォーの、あとわ、目的格だから、ハー。",
    },

    { kind: "chapter", title: "2. 疑問詞＋to" },
    {
      kind: "talk",
      who: "seito",
      board: { section: 1 },
      text: "話にもどると、土曜の朝、トムはポリーおばさんに長い板塀を白くぬるように言いつけられる。",
      say: "話に、もどると、どようの、あさ、トムわ、ポリーおばさんに、長い、いたべいを、白く、ぬるように、言いつけられる。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "Tom didn't know what to do. これは自作の例文だけど、{{疑問詞＋to＋動詞の原形}}で「何をすべきか」。ひとまとまりの名詞になって、know の目的語になってるんだ。",
      say: "トム ディドント ノウ ホワット トゥー ドゥー。これわ、自作の、例文だけど、疑問詞、たす、トゥー、たす、動詞の、げんけいで、なにを、すべきか。ひとまとまりの、名詞になって、ノウの、目的語に、なってるんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "how to" },
      text: "表のとおり、how to は「〜のしかた」、what to は「何を」、where to は「どこへ」、when to は「いつ」。how to cook で料理のしかた。",
      say: "表の、とおり、ハウ トゥーわ、なになにの、しかた。ホワット トゥーわ、なにを。ホエア トゥーわ、どこへ。ホエン トゥーわ、いつ。ハウ トゥー クックで、料理の、しかた。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "そこへベンがからかいに来て、トムが返すんだよね。Does a boy get a chance to whitewash a fence every day? 塀をぬるチャンスなんて、毎日あるかい？",
      say: "そこへ、ベンが、からかいに来て、トムが、かえすんだよね。ダズ ア ボーイ ゲット ア チャンス トゥー ホワイトウォッシュ ア フェンス エブリ デイ？　へいを、ぬる、チャンスなんて、まいにち、あるかい？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そう、トムは「何と言えばいいか」を見つけたんだ。じゃあ、ちょっと練習。「どこで電車に乗ればいいか」は？",
      say: "そう、トムわ、なんと、言えばいいか、を、見つけたんだ。じゃあ、ちょっと、練習。どこで、電車に、乗ればいいか、わ？",
    },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "where のあとに to を忘れないこと。how to cook も、how cook って to を落としやすいんだよね。",
      say: "ホエアの、あとに、トゥーを、忘れないこと。ハウ トゥー クックも、ハウ クックって、トゥーを、落としやすいんだよね。",
    },

    { kind: "chapter", title: "3. 動詞＋人＋to" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "三つめ。I want to go. と I want you to go. うしろの文で行くのは you。動詞と to のあいだに人をはさむと、その人が動作をするんだ。",
      say: "みっつめ。アイ ウォント トゥー ゴー、と、アイ ウォント ユー トゥー ゴー。うしろの文で、いくのわ、ユー。動詞と、トゥーの、あいだに、ひとを、はさむと、その、ひとが、動作を、するんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "人に〜するよう頼む" },
      text: "{{want＋人＋to}}で「人に〜してほしい」、{{tell＋人＋to}}で「人に〜するように言う」、{{ask＋人＋to}}で「人に〜するように頼む」。",
      say: "ウォント、ひと、トゥーで、ひとに、なになにしてほしい。テル、ひと、トゥーで、ひとに、なになにするように、言う。アスク、ひと、トゥーで、ひとに、なになにするように、頼む。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でも「あなたに来てほしい」って、I want that you come. でもいけそう。わたしもそう覚えてた。",
      say: "でも、あなたに、来てほしい、って、アイ ウォント ザット ユー カム、でも、いけそう。わたしも、そう覚えてた。",
    },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "sensei",
      text: "want は that の文をとらないで、I want you to come. 塀ぬりも、自作の英文なら Aunt Polly told Tom to whitewash the fence.",
      say: "ウォントわ、ザットの文を、とらないで、アイ ウォント ユー トゥー カム。塀ぬりも、自作の、英文なら、アント ポリー トールド トム トゥー ホワイトウォッシュ ザ フェンス。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "で、トムの返事を聞いたベンは、Ben asked Tom to let him whitewash. からかってたのに、頼む側になっちゃった。",
      say: "で、トムの、へんじを聞いた、ベンわ、ベン アスクト トム トゥー レット ヒム ホワイトウォッシュ。からかってたのに、たのむ、がわに、なっちゃった。",
    },

    { kind: "chapter", title: "4. let は to なし" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "ベンの原文は Say, Tom, let me whitewash a little. なあトム、ちょっとぬらせてよ。ここ、let のあとに to がないでしょ。",
      say: "ベンの、げんぶんわ、セイ、トム、レット ミー ホワイトウォッシュ ア リトル。なあ、トム、ちょっと、ぬらせてよ。ここ、レットの、あとに、トゥーが、ないでしょ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "あ、ほんとだ。人のあとは to＋原形なんだから、Let me to try. が正しいんじゃないの？　わたし、そう覚えてた。",
      say: "あ、ほんとだ。ひとの、あとわ、トゥー、たす、げんけい、なんだから、レット ミー トゥー トライ、が、正しいんじゃないの？　わたし、そう覚えてた。",
    },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "原形だけ" },
      text: "{{let・make・help}}は、人のあとに to のない原形。let は「望むことをさせてあげる」、make は「いやでもさせる」。同じ「させる」でも正反対なんだ。",
      say: "レット、メイク、ヘルプわ、ひとの、あとに、トゥーのない、げんけい。レットわ、望むことを、させてあげる。メイクわ、いやでも、させる。同じ、させる、でも、正反対なんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "で、トムは一度ことわって、ジムもやりたがったけど she wouldn't let him、シドもやりたがったけど she wouldn't let Sid、って答える。",
      say: "で、トムわ、いちど、ことわって、ジムも、やりたがったけど、シー ウドゥント レット ヒム。シドも、やりたがったけど、シー ウドゥント レット シド、って、答える。",
    },
    {
      kind: "talk",
      who: "seito",
      card: "reveal",
      text: "わかった。told Tom to の「言いつけられた仕事」を、トムは let him の「許可」の型で言いなおしたんだ。特権に見えたから、ベンのほうから let me って頼んだんだね。",
      say: "わかった。トールド トム トゥーの、言いつけられた、しごとを、トムわ、レット ヒムの、許可の、かたで、言いなおしたんだ。特権に、見えたから、ベンのほうから、レット ミー、って、頼んだんだね。",
    },

    { kind: "chapter", title: "5. 教訓の1文" },
    {
      kind: "talk",
      who: "sensei",
      text: "最後に、トウェインはこうまとめてる。it is only necessary to make the thing difficult to attain. 手に入れにくくしさえすればいい。最初の It の形だよね。",
      say: "最後に、トウェインわ、こう、まとめてる。イット イズ オンリー ネセサリー トゥー メイク ザ シング ディフィカルト トゥー アテイン。てに入れにくく、しさえすれば、いい。最初の、イットの、かたちだよね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ劇では let him と let Sid をはっきり強く言わせればいいね。きみも、言いつけを let で言いかえてみて。",
      say: "じゃあ、劇でわ、レット ヒムと、レット シドを、はっきり、強く言わせれば、いいね。きみも、言いつけを、レットで、言いかえてみて。",
    },
  ],
};
