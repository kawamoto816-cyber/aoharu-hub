import type { Lecture } from "../types";

const C = "/media/commons/j-en-2-hikaku";

export const J_EN_2_HIKAKU: Lecture = {
  unit: "j-en-2-hikaku",
  title: "比較は「2つなら -er than」「3つ以上なら the -est」「同じなら as ～ as」",
  hook: "「兄は私より背が高い」「富士山は日本でいちばん高い山だ」「この本はあの本と同じくらいおもしろい」。ものや人をくらべる言い方は、毎日の会話でもテストでもよく使います。くらべる数と、形容詞の長さによって形が決まるので、そのしくみをつかみましょう。",
  mystery: "シェイクスピアのソネット130番は恋の詩なのに、「恋人の目は太陽にまるで似ていない」「さんごのほうが、くちびるよりずっと赤い」と、けなすような比較が続きます。それなのに、なぜ400年以上も愛される恋の詩なのでしょう？",
  mission: {
    from: "英語スピーチ大会を指導する中学校の先生",
    request: "今年の英語暗唱大会で、ある生徒がソネット130番を選びました。ところが友だちに「恋人の悪口の詩なんて、審査員に失礼じゃない？」と言われ、すっかり自信をなくしています。暗唱の前にこの詩のほんとうの意味を伝えてあげたいので、名探偵のあなたに、比較の文にかくされたなぞを解いてほしいのです。",
    thanks: "最後の as rare as で、詩はひっくり返るのですね。「うそのたとえでほめられた誰にも負けない」と、ありのままの恋人をたたえる詩だとわかりました。これで生徒は、最後の2行にいちばん心をこめて暗唱できます。",
  },
  sections: [
    {
      heading: "くらべる数で、3つの形を使い分ける",
      body: "2つをくらべて「〜より…だ」は{{比較級 ＋ than}}、3つ以上の中で「いちばん…だ」は{{the ＋ 最上級}}、2つが「同じくらい…だ」は{{as ＋ 原級 ＋ as}}を使います。原級とは、形容詞・副詞のもとの形のことです。",
      reading: [
        "日本語では「より」「いちばん」「同じくらい」ということばを足してくらべます。英語は、形容詞そのものの形を変えます。tall（背が高い）が、2人をくらべると taller、3人以上の中でいちばんなら tallest になります。もとの形を{{原級}}、-er の形を{{比較級}}、-est の形を{{最上級}}といいます。Tom is taller than Ken.（トムはケンより背が高い）のように、比較級のあとの than が「〜より」にあたります。",
        "「同じくらい」は形を変えず、原級を as と as ではさみます。Ken is as tall as Tom.（ケンはトムと同じくらいの背だ）。前の as は「同じくらい」、後ろの as は「〜と」をあらわすと考えると、語順がつかめます。as と as のあいだに入るのは、いつも{{原級}}です。",
        "比較級は、まわりの英語にもかくれています。近代オリンピックを始めたフランスのクーベルタンは、友人の神父ディドンの言葉をもとに、ラテン語の Citius, Altius, Fortius を標語にしました。英語では Faster, Higher, Stronger（より速く、より高く、より強く）。だれかに勝つ「いちばん」ではなく、きのうの自分「より」上をめざすという考えが、3つの{{比較級}}にこめられています。2021年には、ここに Together（いっしょに）が加えられました。",
      ],
      photos: [
        {
          src: `${C}/athens-1896.webp`, width: 800, height: 600,
          alt: "白い石の階段席をうめつくす、帽子をかぶった大勢の観客。手前に芝生のトラックの曲がり角が見える古い白黒写真",
          caption: "1896年、第1回近代オリンピックが開かれたアテネのパナシナイコ競技場。古代の競技場を大理石で復元した会場。オリンピックの標語は Faster, Higher, Stronger と、3つの{{比較級}}でできている。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Athens_1896-Pan-Athenian_stadium.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "比較の3つの形（tall を使って）",
        columns: [{ title: "形", tone: "yellow" }, { title: "意味（くらべる数）" }],
        rows: [
          { label: "原級", cells: ["as tall as", "同じくらい高い（2つ）"] },
          { label: "比較級", cells: ["taller than", "〜より高い（2つ）"] },
          { label: "最上級", cells: ["the tallest", "いちばん高い（3つ以上）"] },
        ],
      },
      cliff: "「いちばん」と言うとき、in と of のどちらを使えばよいのでしょう？",
    },
    {
      heading: "文の形の変化を見る",
      body: "同じ形容詞 tall を使っても、くらべ方によって形がかわります。最上級の文では、くらべる範囲を{{in ＋ 場所・集団}}（in my class）か{{of ＋ 複数・数}}（of the three）で表します。「〜ほど…ない」は as 〜 as の否定 {{not as 〜 as}}です。",
      reading: [
        "最上級の文には、ふつう「何の中で」いちばんなのかを添えます。Mt. Fuji is the highest mountain in Japan.（富士山は日本でいちばん高い山だ）のように、国・町・クラス・チームなど、ひとまとまりの場所や集団なら {{in}} を使います。Ken is the fastest of the five.（ケンは5人の中でいちばん速い）のように、数や、all・us などの複数の人やものをならべるときは {{of}} です。最上級の前には、ふつう the をつけます。「その中のただ1つ」に決まるからです。",
        "Kyoto is one of the oldest cities in Japan.（京都は日本で最も古い都市の1つだ）のように、{{one of the ＋ 最上級 ＋ 複数名詞}}で「最も〜なものの1つ」と言えます。いちばんを1つに決めつけず、上位のグループに入れる言い方で、ニュースや観光案内によく出てきます。cities と複数形にするのを忘れないようにしましょう。",
        "{{not as 〜 as}} は「〜ほど…ない」です。My dog is not as big as yours.（私の犬はあなたの犬ほど大きくない）。「同じではない」ではなく、「下回る」という意味になる点に注意します。英語のことわざにも比較はよく出てきます。Actions speak louder than words.（行動はことばより雄弁だ）、Better late than never.（おそくても、しないよりはまし）。短いので、口ずさんで覚えるのにぴったりです。",
      ],
      figure: {
        type: "formula",
        title: "Ken を中心にくらべる",
        prose: true,
        steps: [
          { expr: "Ken is {{as tall as}} Tom.", note: "Ken と Tom は同じくらいの背" },
          { expr: "Ken is {{taller than}} Tom.", note: "2人をくらべる：-er ＋ than" },
          { expr: "Ken is {{the tallest}} {{in}} his class.", note: "集団の中で：in ＋ 集団" },
          { expr: "Ken is {{the tallest}} {{of}} the three.", note: "数の中で：of ＋ 複数・数" },
          { expr: "Mike is {{not as tall as}} Ken.", note: "Mike は Ken ほど高くない" },
        ],
        note: "1行ずつ別の場面の例。tall の形がどう変わるかを見る。",
      },
      cliff: "beautiful に -est をつけて beautifulest？　長い語にはべつのやり方があります。",
    },
    {
      heading: "-er / -est か、more / most か",
      body: "短い語は{{-er・-est}}をつけます（e で終わる語は -r・-st、big は big-ger のように子音字を重ねる、easy は y を i にかえる）。beautiful・interesting・popular などの長い語は、前に{{more・most}}を置きます。good・well は{{better・best}}、many・much は more・most と形が変わります。",
      reading: [
        "tall・long・fast のような短い語は、そのまま -er・-est をつけます。large → larger のように e で終わる語は -r・-st だけ、big → bigger・hot → hotter のように「短い母音＋子音字1つ」で終わる語は子音字を重ね、easy → easier・happy → happiest のように「子音字＋y」は y を i にかえます。どれも、つづりと発音をくずさないための工夫です。",
        "beautiful・interesting・popular・famous のように音節が多い長い語に -est をつけると、言いにくく聞きとりにくくなります。そこで、前に{{more・most}}を置きます。more beautiful（より美しい）、the most interesting（いちばんおもしろい）。さらに good・well は better・best、bad は worse・worst と、形そのものが変わります。よく使う語ほど古い形が残るのは、多くの言語に共通する特徴です。",
        "1813年、イギリスの作家{{ジェーン・オースティン}}は小説『高慢と偏見』を出しました。地方の舞踏会で、明るい青年ビングリーは、ベネット家の長女ジェインを the most beautiful creature I ever beheld（ぼくが今まで見た中でいちばん美しい人）とほめます。beautiful は長い語なので {{most}}。一方、友人のダーシーは次女エリザベスを「まあまあだね」と冷たく評し、これを聞いてしまったエリザベスとの長いすれちがいが始まります。最上級の熱いほめ言葉と、そっけない一言の対比が、物語の幕を開けるのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "“You are dancing with the only handsome girl in the room,” said Mr. Darcy, looking at the eldest Miss Bennet.\n“Oh, she is the most beautiful creature I ever beheld! But there is one of her sisters sitting down just behind you, who is very pretty, and I dare say very agreeable. Do let me ask my partner to introduce you.”\n“Which do you mean?” and turning round, he looked for a moment at Elizabeth, till, catching her eye, he withdrew his own, and coldly said, “She is tolerable: but not handsome enough to tempt me; and I am in no humour at present to give consequence to young ladies who are slighted by other men.”",
        ja: "「きみは、この部屋でただひとりの美人とおどっているじゃないか」と、ダーシー氏はベネット家の長女のほうを見ながら言った。\n「ああ、あの人はぼくが今まで見た中でいちばん美しい人だよ！　でも、きみのすぐうしろに、あの人の妹さんがひとりすわっている。とてもかわいらしくて、きっと感じのいい人だと思う。ぼくのパートナーにたのんで、紹介してもらおうよ」\n「どっちのことだ？」とふり返ったダーシーは、少しのあいだエリザベスを見ていたが、目が合うと視線をそらし、冷たく言った。「まあまあだね。でも、ぼくの心を動かすほどの美人じゃない。それに今は、ほかの男に相手にされない若い女性を、もちあげてやる気分じゃないんだ」",
        cite: "Jane Austen, Pride and Prejudice, Chapter 3 (1813)",
        source: "https://www.gutenberg.org/ebooks/1342",
      }],
      photos: [
        {
          src: `${C}/tolerable.webp`, width: 800, height: 890,
          alt: "舞踏会の部屋で、長いすにすわる若い女性。その近くで、えりの高い上着の青年2人が立って話しているペン画",
          caption: "ヒュー・トムソンが1894年版『高慢と偏見』にえがいた挿絵「She is tolerable」。左がエリザベス、中央がダーシー。直前にビングリーは姉を {{the most beautiful}} とほめていた。",
          credit: { author: "Hugh Thomson", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Thomson-PP05.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "比較級・最上級の作り方",
        root: {
          label: "形容詞・副詞",
          children: [
            { label: "短い語", sub: "tall / big / easy", tone: "blue", children: [{ label: "-er / -est", sub: "taller / tallest" }] },
            { label: "長い語", sub: "beautiful / popular", tone: "yellow", children: [{ label: "more / most", sub: "more popular" }] },
            { label: "形が変わる", sub: "good / well / many", tone: "red", children: [{ label: "better / best", sub: "more / most" }] },
          ],
        },
      },
      cliff: "ダーシーの「Which do you mean?」。どちらかをたずねる形にも、比較が活躍します。",
    },
    {
      heading: "「どちらが〜？」の疑問文",
      body: "2つのうちどちらかをたずねるときは{{Which is 比較級, A or B?}}の形を使います。Which is longer, this river or that one? のように聞き、This river is. と答えます。好きなものをくらべるときは like 〜 better than …、いちばん好きなら {{like 〜 the best}} です。",
      reading: [
        "2つのうちどちらかをたずねるときは、{{Which}} を文の先頭に置き、最後に A or B? と選択肢をならべます。Which is longer, the Shinano River or the Tone River?（信濃川と利根川では、どちらが長いですか）。答えは The Shinano River is.（信濃川です）のように、主語と be動詞だけで短く返します。Yes / No では答えません。読むときは、A で上げ、B で下げる調子にすると、選択をせまる質問だと伝わります。",
        "人についてたずねるときは Who を使います。Who runs faster, Ken or Tom?（ケンとトム、どちらが速く走りますか）。答えは Ken does. です。fast は副詞なので、動詞 runs をくわしく説明しています。副詞も形容詞と同じように比較の形になります。",
        "好みをくらべるときは、{{like A better than B}}（BよりAが好き）と言います。I like summer better than winter.（冬より夏が好きです）。たずねるときは Which do you like better, cats or dogs? です。3つ以上の中でいちばん好きなものは {{like 〜 the best}} で、What sport do you like the best?（どのスポーツがいちばん好きですか）と聞きます。日本語の「より好き」を more で言いたくなりますが、like には better と best を使うのが基本です。",
      ],
      cliff: "では最後に、比較の文を武器にした、400年前の恋の詩を読んでみましょう。",
    },
    {
      heading: "名作の中の比較：シェイクスピアのソネット130番",
      body: "シェイクスピアのソネット130番は、恋人を太陽・さんご・音楽などと{{比較}}して「かなわない」と言いつづけ、最後の2行で {{as rare as}}（同じくらいすばらしい）とひっくり返します。比較の形を知っていると、詩のしかけが見えてきます。",
      reading: [
        "{{ソネット}}は14行でできた短い恋の詩の形です。イタリアで生まれ、16世紀のイギリスで大流行しました。当時の詩人たちは、恋人の目を太陽に、くちびるをさんごに、はだを雪にたとえ、「女神のようだ」とほめちぎるのがお決まりでした。シェイクスピアの154編のソネットは、1609年にロンドンで1冊の本として出版されました。",
        "130番は、そのお決まりをわざと裏返します。My mistress’ eyes are nothing like the sun（恋人の目は太陽にまるで似ていない）で始まり、Coral is far more red, than her lips red（さんごのほうが、くちびるよりずっと赤い）と続けます。far は比較級を強めて「ずっと」。さらに、音楽のほうが a far more pleasing sound（ずっと心地よい音）だとも言います。pleasing は長い語なので more を使っています。",
        "ところが最後の2行で、詩人は as rare, / As any she（どんな女性とも同じくらいすばらしい）と、{{as ＋ 原級 ＋ as}} を持ち出します。そのあとの belied with false compare は「うそのたとえでほめられた」という意味。比較級で「太陽よりは劣る」と正直に言ってきたからこそ、最後の as 〜 as が、「大げさにほめられたどんな女性にも負けない」という本気の言葉として胸に届くのです。",
      ],
      recite: [
        {
          lang: "en", voice: "male", accent: "gb",
          text: "My mistress’ eyes are nothing like the sun;\nCoral is far more red, than her lips red:",
          ja: "わが恋人の目は、太陽にまるで似ていない。\nさんごのほうが、あの人のくちびるの赤より、ずっと赤い。",
          cite: "William Shakespeare, Sonnet 130, lines 1–2 (Shake-speares Sonnets, 1609)",
          source: "https://www.gutenberg.org/ebooks/1041",
        },
        {
          lang: "en", voice: "male", accent: "gb",
          text: "I love to hear her speak, yet well I know\nThat music hath a far more pleasing sound:\nI grant I never saw a goddess go;\nMy mistress, when she walks, treads on the ground:\nAnd yet by heaven, I think my love as rare,\nAs any she belied with false compare.",
          ja: "あの人の話す声を聞くのは大好きだ。けれど、よくわかっている。\n音楽のほうが、ずっと心地よくひびくことを。\n女神が歩くのを、見たことがないのは認めよう。\nわが恋人は、歩くとき、地面をふみしめて歩く。\nそれでも天にちかって、わが恋人は、\nうそのたとえでほめそやされたどんな女性にも負けないほど、すばらしい。",
          cite: "William Shakespeare, Sonnet 130, lines 9–14 (Shake-speares Sonnets, 1609)",
          source: "https://www.gutenberg.org/ebooks/1041",
        },
      ],
      photos: [
        {
          src: `${C}/sonnets-1609.webp`, width: 800, height: 1154,
          alt: "古い紙に、SHAKE-SPEARES SONNETS と大きく印刷され、上に植物と天使の飾り模様、下に AT LONDON 1609 とある表紙",
          caption: "1609年にロンドンで出版された『シェイクスピアのソネット集』の扉。154編のソネットが収められ、130番もその1つ。当時の印刷では Never を Neuer とつづっている。",
          credit: { author: "William Shakespeare（フォルジャー・シェイクスピア図書館所蔵）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Sonnets1609titlepage.jpg" },
        },
      ],
      reveal: "前半の比較級 far more red than や far more pleasing は、恋人を太陽やさんご、音楽と正直にくらべて「かなわない」と認める文でした。ところが最後に {{as rare as}} が出てきます。as ＋ 原級 ＋ as は「同じくらい」。詩人は、うそのたとえで大げさにほめられたどんな女性とくらべても、ありのままの恋人は{{同じくらいすばらしい}}と言い切ったのです。比較級で正直さを積み上げ、原級の比較で愛を宣言する。けなす詩ではなく、いちばん誠実なほめ言葉だったから、400年以上愛されてきました。",
    },
  ],
  story: {
    kind: "manzai",
    title: "いちばん正直なラブレター",
    cast: ["コハル", "リク"],
    lines: [
      { who: "コハル", text: "どうもー、コハルとリクです！　今日は英語でラブレターを書いてきました！" },
      { who: "リク", text: "いきなりだね。だれに書いたの？" },
      { who: "コハル", text: "推しのアイドル。You are more cute than the sun!", say: "推しのアイドル。ユー・アー・モア・キュート・ザン・ザ・サン！" },
      { who: "リク", text: "太陽とくらべるな！　それに cute は短い語だから {{cuter}}。-er をつけるの。", say: "太陽とくらべるな！ それにキュートは短い語だから、キューター。イーアールをつけるの。" },
      { who: "コハル", text: "じゃあ beautiful も短く言える。You are beautifuler!", say: "じゃあビューティフルも短く言える。ユー・アー・ビューティフラー！" },
      { who: "リク", text: "言いにくいでしょ！　長い語は前に {{more}}。more beautiful、いちばんなら the most beautiful。", say: "言いにくいでしょ！ 長い語はまえにモア。モア・ビューティフル、いちばんならザ・モースト・ビューティフル。" },
      { who: "コハル", text: "オースティンの小説でも、ビングリーが言ってたね。the most beautiful creature I ever beheld!", say: "オースティンの小説でも、ビングリーが言ってたね。ザ・モースト・ビューティフル・クリーチャー・アイ・エバー・ビホールド！" },
      { who: "リク", text: "そうそう、「今まで見た中でいちばん美しい人」。よく読んでるじゃない。" },
      { who: "コハル", text: "で、推しは the most beautiful of Japan!", say: "で、推しはザ・モースト・ビューティフル・オブ・ジャパン！" },
      { who: "リク", text: "惜しい！　国や集団の中なら {{in}}。in Japan。of は of the five みたいに、数や複数をならべるとき。", say: "惜しい！ くにや集団の中ならイン。イン・ジャパン。オブは、オブ・ザ・ファイブみたいに、数や複数をならべるとき。" },
      { who: "コハル", text: "あと、歌もダンスも最高だから、gooder and gooder!", say: "あと、歌もダンスも最高だから、グッダー・アンド・グッダー！" },
      { who: "リク", text: "そんな単語はない！　good は {{better}}、{{best}} って形が変わるの。", say: "そんな単語はない！ グッドはベター、ベストって形が変わるの。" },
      { who: "コハル", text: "よし、シェイクスピアをまねして、ちょっとひねろう。「きみの目は太陽にまるで似ていない」。" },
      { who: "リク", text: "それ、ソネット130番でしょ。悪口だと思われるよ。" },
      { who: "コハル", text: "大丈夫。「音楽のほうが、きみの声よりずっと心地いい」も入れた。", say: "だいじょうぶ。音楽のほうが、きみのこえよりずっと心地いい、も入れた。" },
      { who: "リク", text: "なんで推しの歌声をけなすの！　あの詩は、最後に {{as rare as}} が来るから成り立つんだよ。", say: "なんで推しのうたごえをけなすの！ あの詩は、最後にアズ・レア・アズが来るから成り立つんだよ。" },
      { who: "コハル", text: "as rare as って、焼き加減のレア？", say: "アズ・レア・アズって、焼き加減のレア？" },
      { who: "リク", text: "ステーキじゃない！　rare は「めったにないほどすばらしい」。as と as で「うそのたとえでほめられた誰とも同じくらいすばらしい」って、最後に全部ひっくり返すの。" },
      { who: "コハル", text: "なるほど、正直にくらべたぶん、最後のほめ言葉が本気に聞こえるんだ。じゃあ書き直すね。You are as cute as my dog!", say: "なるほど、正直にくらべたぶん、最後のほめ言葉が本気に聞こえるんだ。じゃあ書き直すね。ユー・アー・アズ・キュート・アズ・マイ・ドッグ！" },
      { who: "リク", text: "形はかんぺき。as と as のあいだは原級だね。……でも、犬とくらべてどうするの。" },
      { who: "コハル", text: "うちの犬は、the cutest in the world なんだよ！", say: "うちの犬は、ザ・キューテスト・イン・ザ・ワールドなんだよ！" },
      { who: "リク", text: "結局、犬への手紙じゃないか！　もういいよ。" },
      { who: "コハル", text: "どうも、ありがとうございました！" },
    ],
    note: "コハルとリクは架空の人物で、会話はすべて創作です。『高慢と偏見』（オースティン、1813年）とソネット130番（シェイクスピア、1609年出版）の英文と内容は原作にもとづいています。",
  },
  mistakes: [
    { wrong: "This book is interestinger than that one.", right: "This book is more interesting than that one.", why: "interesting は長い語なので -er をつけず、前に more を置きます。" },
    { wrong: "She is the tallest of her class.", right: "She is the tallest in her class.", why: "class のような集団・場所には in。of は of the three、of all のように複数や数に使います。" },
    { wrong: "He is as taller as my father.", right: "He is as tall as my father.", why: "as と as の間は原級（もとの形）です。" },
    { wrong: "This is gooder than that.", right: "This is better than that.", why: "good の比較級は better、最上級は best。形が変わる語です。" },
  ],
  check: [
    { q: "This bag is (big) than mine. の（ ）を正しい形に。", a: "bigger", why: "than があるので比較級。big は g を重ねて -er。" },
    { q: "Kyoto is one of the (popular) cities in Japan. の（ ）を正しい形に。", a: "most popular", why: "「最も〜な…の1つ」で最上級。popular は長い語なので most。" },
    { q: "「私の犬はあなたの犬ほど大きくない」を英語に。", a: "My dog is not as big as yours (your dog).", why: "「〜ほど…ない」は not as 原級 as。" },
  ],
  next: [
    { label: "4択ドリル「比較」に挑戦", href: "/learn/eibunpo-chu/j-en-2-hikaku" },
    { label: "つぎに「受け身」", href: "/learn/eibunpo-chu/j-en-2-ukemi" },
  ],
};
