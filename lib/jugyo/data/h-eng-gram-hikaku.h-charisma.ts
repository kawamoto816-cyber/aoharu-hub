import type { CastScript } from "../types";

// 止まる授業：比較（高校・英文法）× カリスマ講師（カナメ先生・ユウキ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-hikaku.ts の本文だけ。
// 要点をしぼって言い切る。英文は say でカタカナに開く。問題は data/h-eng-gram-hikaku.ts から引く。

export const H_HIKAKU_H_CHARISMA: CastScript = {
  unitId: "h-eng-gram-hikaku",
  castId: "h-charisma",
  title: "「いちばん」が2つ？　比較は比べる相手で決まる",
  scenes: [
    { kind: "chapter", title: "つかみ：最良で最悪の時代" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "カナメです。今日の依頼人は、文化祭で『二都物語』の英語朗読劇をやる演劇部の顧問。書き出しは It was the best of times, it was the worst of times。最良の時代であり、最悪の時代でもあった。",
      say: "カナメです。きょうの依頼人は、文化祭で、二都物語の英語朗読劇をやる、演劇部の顧問。書き出しは、イット ワズ ザ ベスト オブ タイムズ、イット ワズ ザ ワースト オブ タイムズ。最良の時代であり、最悪の時代でもあった。",
    },
    { kind: "talk", who: "seito", text: "受講生のユウキです。いちばんが2つって、矛盾してませんか？", say: "受講生のユウキです。いちばんが2つって、矛盾してませんか？" },
    {
      kind: "talk",
      who: "sensei",
      text: "しかもディケンズは、同じ物語の最後の一文を、最上級ではなく{{比較級}}で締めくくった。なぜか。今日はこれを解く。",
      say: "しかもディケンズは、同じ物語の、最後の一文を、最上級ではなく、比較級で締めくくった。なぜか。きょうは、これを解く。",
    },

    { kind: "chapter", title: "1. 3つの形" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "比較の形は3段。{{原級}}・{{比較級}}・{{最上級}}。短い語は -er / -est、長い語は more / most を前に置く。目安は音節の数で、1音節は -er、3音節以上は more。",
      say: "比較のかたちは3段。原級、比較級、最上級。短い語は、イーアール、イーエスティー。長い語は、モア、モーストを、まえに置く。目安は音節のかずで、1音節はイーアール、3音節以上はモア。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "better" },
      text: "good → better → best、many / much → more → most は{{不規則変化}}。そのまま覚える。よく使う語ほど形が変わりやすい。",
      say: "グッド、ベター、ベスト。メニー、マッチ、モア、モースト。これは、不規則変化。そのまま覚える。よく使う語ほど、かたちが変わりやすい。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "1865年の『不思議の国のアリス』で、アリスは Curiouser and curiouser! とさけぶ。curious は3音節なので、正しくは more and more curious。おどろいて正しい英語を忘れた、という笑いだ。",
      say: "1865ねんの、不思議の国のアリスで、アリスは、キュリオサー アンド キュリオサー、とさけぶ。キュリアスは3音節なので、正しくは、モア アンド モア キュリアス。おどろいて、正しい英語を忘れた、という笑いだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "同じ場面でアリスは、自分の体を the largest telescope that ever was にたとえる。最上級のあとに that ever was を添えると「史上最大」。今の英語なら the largest telescope ever だ。",
      say: "同じ場面でアリスは、自分のからだを、ザ ラージェスト テレスコープ ザット エバー ワズ、にたとえる。最上級のあとに、ザット エバー ワズを添えると、史上最大。今の英語なら、ザ ラージェスト テレスコープ エバーだ。",
    },
    { kind: "talk", who: "seito", text: "じゃあ、兄のほうが背が高いは My brother is more taller than me. でいいですよね。", say: "じゃあ、兄のほうが背が高い、は、マイ ブラザー イズ モア トーラー ザン ミー、でいいですよね。" },
    { kind: "talk", who: "sensei", text: "いちばん落とす所。問題。", say: "いちばん落とすところ。問題。" },
    { kind: "pause", ref: "mistake:0" },

    { kind: "chapter", title: "2. 原級と倍数" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "as ＋原級＋ as は「同じくらい」。ここで差がつくのは否定。My bag is not as heavy as yours. は「あなたのほど重くない」。重いのは{{相手のほう}}だ。",
      say: "アズ、たす原級、たす、アズは、同じくらい。ここで差がつくのは否定。マイ バッグ イズ ノット アズ ヘビー アズ ユアーズ、は、あなたのほど重くない。重いのは、相手のほうだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "6 kg" },
      text: "倍数は{{as の前}}。B is twice as heavy as A. で、3 kg の箱 A に対して B は 6 kg。3倍以上は three times as ... as だ。",
      say: "倍数は、アズのまえ。ビー イズ トゥワイス アズ ヘビー アズ エー。で、3キロの箱エーに対して、ビーは6キロ。3倍以上は、スリー タイムズ アズ、アズ、だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "half as much as は「〜の半分」、three times as many as は「〜の3倍の数」。as cool as a cucumber、キュウリのように落ち着きはらって、というたとえもある。",
      say: "ハーフ アズ マッチ アズは、の半分。スリー タイムズ アズ メニー アズは、の3倍のかず。アズ クール アズ ア キューカンバー、キュウリのように落ち着きはらって、というたとえもある。",
    },
    { kind: "pause", ref: "check:0" },

    { kind: "chapter", title: "3. 比較級は than で相手を示す" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "比較級のポイントは、{{than のあとに何を置くか}}。つまり、だれと比べるか。差の大きさは比較級の前。This bag is 200 grams lighter than that one.",
      say: "比較級のポイントは、ザンの、あとに、なにを置くか。つまり、だれと比べるか。差の大きさは、比較級のまえ。ディス バッグ イズ ツーハンドレッド グラムズ ライター ザン ザット ワン。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ポイントは対句。1599年ごろのシェイクスピアの『ジュリアス・シーザー』。ブルータスは、自分のシーザーへの愛はだれにも no less than、劣らないと語り、Not that I loved Caesar less, but that I loved Rome more. と続ける。",
      say: "ポイントは、対句。1599ねんごろの、シェイクスピアの、ジュリアス シーザー。ブルータスは、自分のシーザーへの愛は、だれにも、ノー レス ザン、劣らないと語り、ノット ザット アイ ラブド シーザー レス、バット ザット アイ ラブド ローマ モア、と続ける。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "さらに Had you rather ... than ...? と問いかける。2つを並べて比べさせると、聞き手は「より大きいほう」を自分で選んだ気になる。比較で人を動かす演説の力と危うさだ。",
      say: "さらに、ハッド ユー ラザー、ザン、と問いかける。2つを並べて比べさせると、ききては、より大きいほうを、自分で選んだきになる。比較で、ひとを動かす演説の、力と危うさだ。",
    },
    { kind: "talk", who: "seito", text: "強めるなら、This question is very easier than that one. ですね。", say: "強めるなら、ディス クエスチョン イズ ベリー イージアー ザン ザット ワン、ですね。" },
    { kind: "talk", who: "sensei", text: "ここで差がつく。問題。" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "sensei",
      text: "比較級を強めるのは much / far。それから The ＋比較級, the ＋比較級 で「〜すればするほど」。The more you practice, the better you play.",
      say: "比較級を強めるのは、マッチか、ファー。それから、ザ、たす比較級、ザ、たす比較級で、すればするほど。ザ モア ユー プラクティス、ザ ベター ユー プレイ。",
    },

    { kind: "chapter", title: "4. 最上級には範囲" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "一言でいうと、最上級は「ある範囲の中で1位」。だから{{範囲}}がつく。複数の仲間なら of、場所や集団なら in。in my class のようにね。",
      say: "ひとことでいうと、最上級は、ある範囲のなかで1位。だから範囲がつく。複数の仲間ならオブ、場所や集団ならイン。イン マイ クラス、のようにね。",
    },
    { kind: "pause", ref: "check:1" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "any other lake" },
      text: "書きかえも押さえる。Lake Biwa is the largest lake in Japan. は、larger than any other lake とも言える。any other の後ろは{{単数形}}だ。",
      say: "書きかえも押さえる。レイク ビワ イズ ザ ラージェスト レイク イン ジャパン、は、ラージャー ザン エニー アザー レイク、とも言える。エニー アザーの、うしろは、単数形だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "1859年、ディケンズは自分の週刊誌の創刊号から『二都物語』の連載を始めた。ロンドンとパリ、2つの都を舞台に、フランス革命の前後を生きた人々を描く物語だ。",
      say: "1859ねん、ディケンズは、自分の週刊誌の創刊号から、二都物語の連載を始めた。ロンドンとパリ、2つの都を舞台に、フランス革命の前後をいきた、ひとびとを描く物語だ。",
    },

    { kind: "chapter", title: "謎解き：比べる相手を選ぶ" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "最上級は範囲の中の1位。範囲が変われば1位も変わる。豊かな人と貧しい人、ロンドンとパリでは、同じ時代が{{最良}}にも{{最悪}}にもなりえた。",
      say: "最上級は、範囲のなかの1位。範囲が変われば、1位も変わる。豊かなひとと、貧しいひと、ロンドンとパリでは、同じ時代が、最良にも、最悪にもなりえた。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "それでも声の大きい人々は、範囲を言わずに最上級で決めつけた。ディケンズは superlative degree of comparison という文法用語で、その大げささを皮肉った。",
      say: "それでも、声の大きいひとびとは、範囲を言わずに、最上級で決めつけた。ディケンズは、スーパーラティブ ディグリー オブ コンパリソン、という文法用語で、その大げささを、皮肉った。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "しかも、その時代は the present period、いまの時代とよく似ていた、と書きそえる。物語の時代と、読者が生きる1859年とを重ねた皮肉だ。",
      say: "しかも、その時代は、ザ プレゼント ピリオド、いまの時代と、よく似ていた、と書きそえる。物語の時代と、読者がいきる、1859ねんとを重ねた、皮肉だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "結びでカートンが比べる相手に選んだのは、{{かつての自分}}。than のあとに自分の過去を置く比較級だから、他人との順位ではない、ひとりの人間の変化が伝わる。",
      say: "結びで、カートンが比べる相手に選んだのは、かつての自分。ザンのあとに、自分の過去を置く比較級だから、他人との順位ではない、ひとりの人間の変化が伝わる。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "比較級に than I have ever ... をつなぐと「今までのどれよりも」。This is better than anything I have ever eaten. は、This is the best thing I have ever eaten. とほぼ同じ内容になる。",
      say: "比較級に、ザン アイ ハブ エバーをつなぐと、今までのどれよりも。ディス イズ ベター ザン エニシング アイ ハブ エバー イートゥン、は、ディス イズ ザ ベスト シング アイ ハブ エバー イートゥン、とほぼ同じ内容になる。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "整理する。主人公の一人シドニー・カートンは、愛する女性ルーシーの家族を救うため、彼女の夫の身代わりとなってギロチンの台へ向かう。最後の一文は、far で強めた比較級と than I have ever done の組み合わせだ。",
      say: "整理する。主人公のひとり、シドニー カートンは、愛する女性ルーシーの家族を救うため、彼女の夫の身代わりとなって、ギロチンの台へ向かう。最後の一文は、ファーで強めた比較級と、ザン アイ ハブ エバー ダンの組み合わせだ。",
    },
    { kind: "talk", who: "seito", text: "冒頭は決めつけを皮肉る調子で、結びは静かな声で読めばいいんだ。", say: "冒頭は、決めつけを皮肉る調子で、結びは、静かな声で読めばいいんだ。" },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "sensei",
      text: "次はきみが講師だ。キーワードは、3つの形、as ... as、than、範囲、かつての自分。この順につないで、ディケンズのたくらみを説明してみよう。",
      say: "次はきみが講師だ。キーワードは、3つのかたち、アズ アズ、ザン、範囲、かつての自分。この順につないで、ディケンズのたくらみを、説明してみよう。",
    },
  ],
};
