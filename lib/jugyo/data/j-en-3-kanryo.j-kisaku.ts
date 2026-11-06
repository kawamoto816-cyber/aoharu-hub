import type { CastScript } from "../types";

// 止まる授業：現在完了（中3・英語）× 気さくな兄・姉（アサヒ兄さん・スミレ姉さん）。事実・例文・人名・年は lib/lecture/data/j-en-3-kanryo.ts の本文だけ。
// 雑談の調子で、うろ覚えを「わたしもそう覚えてた」と言って直していく。英文は say でカタカナに開く。実在の人物のせりふは作らない。問題は data/j-en-3-kanryo.ts から引く。

export const KANRYO_J_KISAKU: CastScript = {
  unitId: "j-en-3-kanryo",
  castId: "j-kisaku",
  title: "I have lived はなぜ現在完了？：過去を「今」につなぐ形",
  scenes: [
    { kind: "chapter", title: "つかみ：ラジオに届いたお便り" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "よっ、アサヒです。今日は、FMラジオの英語番組のDJさんから相談が来てるんだ。3月に「卒業と旅立ちの名スピーチ」特集をやるんだって。",
      say: "よっ、アサヒです。きょうは、エフエムラジオの、英語番組の、ディージェーさんから、相談が来てるんだ。3がつに、卒業と旅立ちの、名スピーチ、という特集をやるんだって。",
    },
    { kind: "talk", who: "seito", text: "スミレです。いいね。どんなスピーチを読むの？" },
    {
      kind: "talk",
      who: "sensei",
      text: "1861年、リンカーンが故郷の町を去るときの別れの言葉。本人が書き残した版には Here my children have been born、新聞にのった版には here my children were born とあるんだ。",
      say: "1861ねん、リンカーンが、故郷の町を去るときの、別れの言葉。本人が書き残した版には、ヒア マイ チルドレン ハブ ビーン ボーン。新聞にのった版には、ヒア マイ チルドレン ワー ボーン、とあるんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そしたら番組に「過去の話なのに、なぜ I lived じゃなくて I have lived なの？　訳も『住んでいた』でいいのでは？」ってお便りが来たんだって。",
      say: "そしたら番組に、過去の話なのに、なぜ、アイ リブドじゃなくて、アイ ハブ リブドなの？　やくも、住んでいた、でいいのでは？　って、お便りが来たんだって。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "わたしもそう思っちゃう。子どもが生まれたのは、どっちにしても昔のことだよね。",
      say: "わたしも、そう思っちゃう。子どもがうまれたのは、どっちにしても、昔のことだよね。",
    },
    { kind: "talk", who: "sensei", text: "そこ、最後にちゃんとつながるから、形から順に見ていこう。", say: "そこ、最後に、ちゃんとつながるから、かたちから順に見ていこう。" },

    { kind: "chapter", title: "1. 形は have / has＋過去分詞" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "現在完了は{{have＋過去分詞}}。I have finished my homework. で「宿題をもう終えた」。この have は「持ってる」じゃなくて、過去分詞と組んで「今の時点で〜した状態にある」って意味になるんだ。",
      say: "現在完了は、ハブたす、過去分詞。アイ ハブ フィニッシュト マイ ホームワーク。で、宿題を、もう終えた。このハブは、持ってる、じゃなくて、過去分詞と組んで、いまの時点で、した状態にある、って意味になるんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "過去分詞は、規則動詞なら played みたいに過去形と同じ。不規則動詞は go - went - gone、see - saw - seen。3つセットで声に出すと覚えやすいよ。",
      say: "過去分詞は、規則動詞なら、プレイドみたいに、過去形と同じ。不規則動詞は、ゴー、ウェント、ゴーン。シー、ソー、シーン。3つセットで、声に出すと、覚えやすいよ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "Have you finished your homework yet?" },
      text: "否定は have のあとに not で I haven't finished it yet.。疑問は have を前に出して Have you finished it?。{{do や did は使わない}}のがポイント。",
      say: "否定は、ハブのあとに、ノットで、アイ ハブント フィニッシュト イット イェット。疑問は、ハブを、まえに出して、ハブ ユー フィニッシュト イット。ドゥーや、ディッドは、使わないのが、ポイント。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "have っていう形なんだから、主語が she でも She have lived here since 2020. でいいんだよね？　わたし、そう覚えてた。",
      say: "ハブ、っていうかたちなんだから、主語がシーでも、シー ハブ リブド ヒア シンス トゥエンティ トゥエンティ。でいいんだよね？　わたし、そう覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "あー、そこ、うっかりしがち。確かめてみよう。" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "sensei",
      text: "he・she・it や Ken みたいな3人称単数なら has。My sister has finished her homework. ね。会話だと I've とか she's って短くもなるよ。",
      say: "ヒー、シー、イットや、ケンみたいな、3人称単数なら、ハズ。マイ シスター ハズ フィニッシュト ハー ホームワーク。ね。会話だと、アイブとか、シーズって、短くもなるよ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "この形って、昔からあるの？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "400年以上前にはもうあった。1600年ごろの『ハムレット』で、王子が I have of late …… lost all my mirth、「近ごろ、なぜかすっかり陽気さをなくしてしまった」って打ち明けるんだ。なくしたのは過去でも、陽気さがないのは{{今}}。だから現在完了。",
      say: "400ねん以上まえには、もうあった。1600ねんごろの、ハムレットで、王子が、アイ ハブ オブ レイト、ロスト オール マイ マース。近ごろ、なぜか、すっかり陽気さを、なくしてしまった、って打ち明けるんだ。なくしたのは過去でも、陽気さがないのは、いま。だから、現在完了。",
    },

    { kind: "chapter", title: "2. 3つの意味と目じるし" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "意味は3つ。{{完了}}は I have just eaten lunch.、「ちょうど昼ごはんを食べたところ」。just・already・yet が目じるし。",
      say: "意味は3つ。完了は、アイ ハブ ジャスト イートゥン ランチ。ちょうど昼ごはんを、食べたところ。ジャスト、オールレディ、イェットが、めじるし。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "経験" },
      text: "{{経験}}は I have seen this movie three times.、「3回見たことがある」。ever・never・once・〜 times が目じるし。",
      say: "経験は、アイ ハブ シーン ディス ムービー スリー タイムズ。3回、見たことがある。エバー、ネバー、ワンス、タイムズが、めじるし。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "継続" },
      text: "{{継続}}は I have lived in this town for ten years.、「この町に10年間住んでいる」。10年前に住み始めて、今も住んでる。for・since・how long が目じるしだよ。",
      say: "継続は、アイ ハブ リブド イン ディス タウン フォー テン イヤーズ。この町に、10年間住んでいる。10年前に住みはじめて、いまも住んでる。フォー、シンス、ハウ ロングが、めじるしだよ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "how long なら継続、how many times なら経験。表で見るとすっきりするね。",
      say: "ハウ ロングなら継続、ハウ メニー タイムズなら経験。表で見ると、すっきりするね。",
    },

    { kind: "chapter", title: "3. 過去形とどうちがう？" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "I lost my key. は、過去の1点のできごとだけ。見つかったかはわからない。I have lost my key. は、なくして{{今もない}}から、家に入れなくて困ってる、ってところまで伝わるんだ。",
      say: "アイ ロスト マイ キー。は、過去の1点の、できごとだけ。見つかったかは、わからない。アイ ハブ ロスト マイ キー。は、なくして、いまもないから、いえにはいれなくて、困ってる、ってところまで、伝わるんだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ、現在完了のほうが丁寧なんだ。I have visited Kyoto last year. とか、わたしも言っちゃいそう。",
      say: "じゃあ、現在完了のほうが、丁寧なんだ。アイ ハブ ビジテッド キョウト ラスト イヤー。とか、わたしも、言っちゃいそう。",
    },
    { kind: "talk", who: "sensei", text: "ん、last year がついてるね。見てみよう。", say: "ん、ラスト イヤーが、ついてるね。見てみよう。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "yesterday や two years ago みたいに{{過去の1点だけを示すことば}}とは、現在完了はいっしょに使えないんだ。",
      say: "イエスタデイや、トゥー イヤーズ アゴーみたいに、過去の1点だけを示すことばとは、現在完了は、いっしょに使えないんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "で、リンカーン。1861年2月11日の朝、スプリングフィールドの駅を発った。28歳で来て、結婚して、4人の息子にめぐまれた町。冷たい雨の中で、列車の後ろのデッキからあいさつしたんだ。",
      say: "で、リンカーン。1861ねん、2がつ11にちの朝、スプリングフィールドの駅を、たった。28さいで来て、結婚して、よにんの息子にめぐまれた町。冷たい雨のなかで、列車のうしろのデッキから、あいさつしたんだ。",
    },
    {
      kind: "talk",
      who: "seito",
      card: "reveal",
      text: "わかった！　were born は「ここで生まれた」って過去の記録。have been born は、それが{{今とつながってる}}ってこと。町を去る瞬間のリンカーンにとって、25年の暮らしは終わった昔話じゃなくて、今の自分をつくってたんだ。",
      say: "わかった！　ワー ボーンは、ここでうまれた、って過去の記録。ハブ ビーン ボーンは、それが、いまとつながってる、ってこと。町を去る瞬間のリンカーンにとって、25ねんの暮らしは、終わった昔話じゃなくて、いまの自分を、つくってたんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "それ。だから訳も「住んでいた」より「ここで暮らしてきました」が近いんだよ。",
      say: "それ。だから、やくも、住んでいた、より、ここで暮らしてきました、が近いんだよ。",
    },

    { kind: "chapter", title: "4. for と since、been と gone" },
    {
      kind: "talk",
      who: "sensei",
      text: "継続の「どのくらいの間」は{{for＋期間}}、「いつから」は{{since＋始まった時点}}。since 2020 とか since I was a child とかね。",
      say: "継続の、どのくらいのあいだ、は、フォーたす、期間。いつから、は、シンスたす、始まった時点。シンス トゥエンティ トゥエンティ、とか、シンス アイ ワズ ア チャイルド、とかね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "since って「〜から」でしょ？　だから I have lived here since three years. で「3年前から」になるって、わたしも覚えてた。",
      say: "シンスって、から、でしょ？　だから、アイ ハブ リブド ヒア シンス スリー イヤーズ。で、3年まえから、になるって、わたしも覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "惜しい。three years が何なのか、見てみよう。", say: "惜しい。スリー イヤーズが、なんなのか、見てみよう。" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "もう1つ。I have been to Washington. は「行ったことがある」で、本人は今ここにいる。He has gone to Washington. は「行ってしまった」で、今ここにいないんだ。",
      say: "もうひとつ。アイ ハブ ビーン トゥ ワシントン。は、いったことがある、で、本人は、いま、ここにいる。ヒー ハズ ゴーン トゥ ワシントン。は、いってしまった、で、いま、ここにいないんだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "列車を見送った町の人たちは、Mr. Lincoln has gone to Washington. って言い合ったのかもね。",
      say: "列車を見送った町のひとたちは、ミスター リンカーン ハズ ゴーン トゥ ワシントン。って、言い合ったのかもね。",
    },
    { kind: "talk", who: "sensei", text: "最後に、been か gone かの1問。", say: "最後に、ビーンか、ゴーンかの、1問。" },
    { kind: "pause", ref: "check:0" },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "seito",
      text: "次はきみの番。「ずっと続いてること」と「したことがあること」を、自分のことで1つずつ、現在完了の文にして言ってみてね。",
      say: "次はきみの番。ずっと続いてることと、したことがあることを、自分のことで、1つずつ、現在完了の文にして、言ってみてね。",
    },
  ],
};
