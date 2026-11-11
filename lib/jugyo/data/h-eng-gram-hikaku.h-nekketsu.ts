import type { CastScript } from "../types";

// 止まる授業：比較（高校・英文法）× 熱血エンタメ講義（ダイチ・カエデ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-hikaku.ts の本文だけ。
// 画面の前のきみに語りかけ、テンポよく。英文は say でカタカナに開く。問題は data/h-eng-gram-hikaku.ts から引く。

export const H_HIKAKU_H_NEKKETSU: CastScript = {
  unitId: "h-eng-gram-hikaku",
  castId: "h-nekketsu",
  title: "最上級で始まり、比較級で終わる！　比較の3段ショー",
  scenes: [
    { kind: "chapter", title: "つかみ：反則の書き出し？" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さあ、いくぞ！　ダイチだ。今日の依頼は演劇部の顧問から。『二都物語』の書き出しは It was the best of times, it was the worst of times。最良で、最悪の時代！",
      say: "さあ、いくぞ！　ダイチだ。きょうの依頼は、演劇部の顧問から。二都物語の書き出しは、イット ワズ ザ ベスト オブ タイムズ、イット ワズ ザ ワースト オブ タイムズ。最良で、最悪の時代！",
    },
    { kind: "talk", who: "seito", text: "カエデです！　えっ、いちばんが2つって反則じゃない？", say: "カエデです！　えっ、いちばんが2つって、反則じゃない？" },
    {
      kind: "talk",
      who: "sensei",
      text: "ここが熱い！　しかもディケンズは、最後の一文を{{比較級}}で締めくくった。なぜだ？　画面の前のきみ、比較の3段をのぼって答えをつかもう！",
      say: "ここが熱い！　しかもディケンズは、最後の一文を、比較級で締めくくった。なぜだ？　画面のまえのきみ、比較の3段をのぼって、答えをつかもう！",
    },

    { kind: "chapter", title: "1. 3つの形" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "1段目は形！　{{原級}}・{{比較級}}・{{最上級}}。fast → faster → fastest。big は子音字を重ねて bigger、easy は y を i にかえて easier だ！",
      say: "1段目は、かたち！　原級、比較級、最上級。ファスト、ファスター、ファステスト。ビッグは、子音字を重ねて、ビガー。イージーは、ワイをアイにかえて、イージアーだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "長い語は more / most を前に置く。useful は more useful！　1865年の『不思議の国のアリス』では、アリスがおどろいて Curiouser and curiouser! とさけぶ。本当は more and more curious。わざとのまちがいだ！",
      say: "長いごは、モア、モーストを、まえに置く。ユースフルは、モア ユースフル！　1865ねんの、不思議の国のアリスでは、アリスがおどろいて、キュリオサー アンド キュリオサー、とさけぶ。本当は、モア アンド モア キュリアス。わざとのまちがいだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "さらに！　同じ場面でアリスは、自分の体を the largest telescope that ever was にたとえる。最上級のあとに that ever was を添えると「史上最大」。今の英語なら the largest telescope ever だ。",
      say: "さらに！　同じ場面でアリスは、自分のからだを、ザ ラージェスト テレスコープ ザット エバー ワズ、にたとえる。最上級のあとに、ザット エバー ワズを添えると、史上最大。今の英語なら、ザ ラージェスト テレスコープ エバーだ。",
    },
    { kind: "talk", who: "seito", text: "じゃあ、もっと強く言いたいときは My brother is more taller than me. だね！", say: "じゃあ、もっと強く言いたいときは、マイ ブラザー イズ モア トーラー ザン ミー、だね！" },
    { kind: "talk", who: "sensei", text: "さあ、画面の前のきみはどっちだ？　問題！", say: "さあ、画面のまえのきみは、どっちだ？　問題！" },
    { kind: "pause", ref: "mistake:0" },
    { kind: "talk", who: "seito", text: "そっか、taller だけで比較級。more は重ねないんだ！", say: "そっか、トーラーだけで比較級。モアは重ねないんだ！" },

    { kind: "chapter", title: "2. as ... as と倍数" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "2段目は原級！　as ＋原級＋ as で「同じくらい」。否定の not as heavy as は「〜ほど重くない」で、重いのは相手のほう！　長文の数字の比較では、どちらが大きいか必ず確かめよう！",
      say: "2段目は原級！　アズ、たす原級、たす、アズで、同じくらい。否定の、ノット アズ ヘビー アズは、ほど重くない、で、重いのは、相手のほう！　長文の数字の比較では、どちらが大きいか、必ず確かめよう！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "6 kg" },
      text: "倍数は as の前に置く！　B is twice as heavy as A.　3 kg の箱 A に対して、B は 6 kg だ。さあ、いくぞ！",
      say: "倍数は、アズのまえに置く！　ビー イズ トゥワイス アズ ヘビー アズ エー。3キロの箱エーに対して、ビーは6キロだ。さあ、いくぞ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "half as much as は「〜の半分」、three times as many as は「〜の3倍の数」。as cool as a cucumber、キュウリのように落ち着きはらって、というたとえもある。",
      say: "ハーフ アズ マッチ アズは、の半分。スリー タイムズ アズ メニー アズは、の3倍のかず。アズ クール アズ ア キューカンバー、キュウリのように落ち着きはらって、というたとえもある。",
    },
    { kind: "pause", ref: "check:0" },

    { kind: "chapter", title: "3. 比較級は相手を示す" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "3段目は比較級！　than のあとに{{比べる相手}}を置く。シェイクスピアのブルータスは Not that I loved Caesar less, but that I loved Rome more. と、less と more を並べて聴衆の心をつかんだ！",
      say: "3段目は比較級！　ザンのあとに、比べる相手を置く。シェイクスピアのブルータスは、ノット ザット アイ ラブド シーザー レス、バット ザット アイ ラブド ローマ モア、と、レスと、モアを並べて、聴衆の心をつかんだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "さらに Had you rather ... than ...? と問いかける。2つを並べて比べさせると、聞き手は「より大きいほう」を自分で選んだ気になる。比較で人を動かす演説の力と危うさだ。",
      say: "さらに、ハッド ユー ラザー、ザン、と問いかける。2つを並べて比べさせると、ききては、より大きいほうを、自分で選んだきになる。比較で、ひとを動かす演説の、力と危うさだ。",
    },
    { kind: "talk", who: "seito", text: "わかった！　強めるなら This question is very easier than that one.！", say: "わかった！　強めるなら、ディス クエスチョン イズ ベリー イージアー ザン ザット ワン！" },
    { kind: "talk", who: "sensei", text: "ここが勝負どころ！　問題だ！" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "seito",
      text: "very は原級を強める語。比較級には much か far だね！　This question is much easier than that one.",
      say: "ベリーは、原級を強めるご。比較級には、マッチか、ファーだね！　ディス クエスチョン イズ マッチ イージアー ザン ザット ワン。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "最高だ！　さらに The ＋比較級, the ＋比較級 で「〜すればするほど」。The more you practice, the better you play.",
      say: "最高だ！　さらに、ザ、たす比較級、ザ、たす比較級で、すればするほど。ザ モア ユー プラクティス、ザ ベター ユー プレイ。",
    },

    { kind: "chapter", title: "4. 最上級の範囲" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "頂上は最上級！　「ある範囲の中で1位」だから、{{範囲}}が命だ！　複数の仲間なら of、場所や集団なら in。いくぞ、問題！",
      say: "頂上は最上級！　ある範囲のなかで1位、だから、範囲が命だ！　複数の仲間ならオブ、場所や集団ならイン。いくぞ、問題！",
    },
    { kind: "pause", ref: "check:1" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "No other lake" },
      text: "最上級は書きかえもできる！　No other lake in Japan is as large as Lake Biwa.　any other や No other の後ろの名詞は{{単数形}}だ！",
      say: "最上級は、書きかえもできる！　ノー アザー レイク イン ジャパン イズ アズ ラージ アズ レイク ビワ。エニー アザーや、ノー アザーの、うしろの名詞は、単数形だ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "段落の最後には in the superlative degree of comparison only！　しかも、その時代は the present period、いまの時代とよく似ていた、と書きそえる。物語の時代と、読者が生きる1859年とを重ねた皮肉だ。",
      say: "段落の最後には、イン ザ スーパーラティブ ディグリー オブ コンパリソン オンリー！　しかも、その時代は、ザ プレゼント ピリオド、いまの時代と、よく似ていた、と書きそえる。物語の時代と、読者がいきる、1859ねんとを重ねた、皮肉だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "さあ、謎の舞台だ！　1859年、ディケンズは自分の週刊誌の創刊号から『二都物語』の連載を始めた。ロンドンとパリ、2つの都を舞台に、フランス革命の前後を生きた人々を描く物語だ。",
      say: "さあ、謎の舞台だ！　1859ねん、ディケンズは、自分の週刊誌の創刊号から、二都物語の連載を始めた。ロンドンとパリ、2つのみやこを舞台に、フランス革命の前後をいきた、ひとびとを描く物語だ。",
    },

    { kind: "chapter", title: "謎解き：比べる相手" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "謎解きだ！　最上級は範囲の中の1位。範囲が変われば1位も変わる。ロンドンとパリ、豊かな人と貧しい人では、同じ時代が{{最良}}にも{{最悪}}にもなる！",
      say: "謎解きだ！　最上級は、範囲のなかの1位。範囲が変われば、1位も変わる。ロンドンとパリ、豊かなひとと、貧しいひとでは、同じ時代が、最良にも、最悪にもなる！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "声の大きい人々は範囲を言わずに最上級で決めつけた。ディケンズはそれを皮肉ったんだ！　そして結びのカートンは、比べる相手を{{かつての自分}}に選んだ！",
      say: "声の大きい、ひとびとは、範囲を言わずに、最上級で決めつけた。ディケンズは、それを皮肉ったんだ！　そして、結びのカートンは、比べる相手を、かつての自分に選んだ！",
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
      text: "主人公の一人シドニー・カートンは、愛する女性ルーシーの家族を救うため、彼女の夫の身代わりとなってギロチンの台へ向かう。最後の一文は、far で強めた比較級と than I have ever done の組み合わせだ。",
      say: "主人公のひとり、シドニー カートンは、愛する女性ルーシーの家族を救うため、彼女の夫の身代わりとなって、ギロチンの台へ向かう。最後の一文は、ファーで強めた比較級と、ザン アイ ハブ エバー ダンの組み合わせだ。",
    },
    { kind: "talk", who: "seito", text: "他人との順位じゃなくて、昔の自分より一歩よい自分。だから最後は比較級なんだ！", say: "他人との順位じゃなくて、昔の自分より、一歩よい自分。だから、最後は比較級なんだ！" },
    {
      kind: "talk",
      who: "sensei",
      text: "そのとおり！　画面の前のきみ、3つの形、as ... as、than、範囲、かつての自分で、朗読劇の演出を語ってみよう！",
      say: "そのとおり！　画面のまえのきみ、3つのかたち、アズ アズ、ザン、範囲、かつての自分で、朗読劇の演出を、語ってみよう！",
    },
  ],
};
