import type { Lecture } from "../types";

const C = "/media/commons/e-english-34-youbi-tenki";

export const E_ENGLISH_34_YOUBI_TENKI: Lecture = {
  unit: "e-english-34-youbi-tenki",
  title: "曜日をたずねるのは What day、天気は How's the weather",
  hook: "朝の会で「今日は何曜日？」「天気はどう？」と話すことがありますね。曜日と天気は、毎日だれとでも話せる話題です。英語《えいご》で言えるようになると、あいさつのあとに、もう一言を続《つづ》けられます。",
  mystery: "Sunday と sunny。どちらにも sun（太陽）が入っています。それなのに、雨がふっている日曜日でも、Sunday は Sunday のままです。同じ sun の仲間《なかま》なのに、2つの言葉はどこがちがうのでしょう？",
  mission: {
    from: "となりの家に住む、イギリスから来た留学生《りゅうがくせい》のお姉さん",
    request: "わたしは毎朝、通学路で会う子どもたちと Good morning! とあいさつしています。もう一言話したくて、曜日と天気の絵カードを作りました。ところが、ある子が雨の日曜日に、太陽の絵のカードを持ってきて「今日は Sunday だから、これ！」と言うのです。カードの使い方を説明《せつめい》するために、名探偵《めいたんてい》のあなたに、Sunday と sunny のちがいを見つけてほしいのです。",
    thanks: "Sunday は「太陽の日」という曜日の名前、sunny は「太陽が出ている」という天気の様子なのですね。カードを「What day? の箱」と「How's the weather? の箱」に分けて、明日からみんなで話してみます。",
  },
  sections: [
    {
      heading: "7つの曜日の言い方",
      body: "曜日の言葉は、どれも {{day}} で終わります。Sunday は sun（太陽）、Monday は moon（月）から来た言葉で、日本語の{{日曜日・月曜日}}と同じ考え方です。曜日の言葉は、書くときに{{はじめの文字をいつも大文字}}にします。",
      reading: [
        "英語《えいご》の曜日は、Sunday、Monday、Tuesday……と7つあり、どれも最後《さいご》が {{day}}（日）です。日本語でも、日曜日・月曜日……と、どれも「曜日」で終わりますね。英語《えいご》の曜日の言葉は、人の名前と同じように、書くときは{{はじめの文字を大文字}}にします。",
        "曜日の名前は、空にあるものから来ています。Sunday は sun（太陽）の日、Monday は moon（月）の日です。日本語の日曜日・月曜日と、まったく同じですね。1週間を7日にして、太陽や月の名前をつける考え方は、何千年も前に西のほうの国ぐにで生まれ、世界に広がったといわれています。",
        "では、Thursday は何の日でしょう。これは{{トール}}という神さまの日です。トールは、むかしの北ヨーロッパの人びとが語りついできたお話に出てくる、{{かみなりの神さま}}です。大きなハンマーをふると、空にかみなりが鳴ると考えられていました。曜日の名前の中に、天気の神さまがかくれていたのです。Wednesday や Friday も、北ヨーロッパのお話の神さまの名前から来ています。",
      ],
      figure: {
        type: "compare",
        title: "曜日の言葉",
        columns: [{ title: "英語《えいご》", tone: "blue" }, { title: "日本語" }],
        rows: [
          { cells: ["Sunday", "日曜日"] },
          { cells: ["Monday", "月曜日"] },
          { cells: ["Tuesday", "火曜日"] },
          { cells: ["Wednesday", "水曜日"] },
          { cells: ["Thursday", "木曜日"] },
          { cells: ["Friday", "金曜日"] },
          { cells: ["Saturday", "土曜日"] },
        ],
        note: "Tuesday（火）と Thursday（木）は、どちらも T で始まるので、まちがえやすい。",
      },
      photos: [
        {
          src: `${C}/thor.webp`, width: 800, height: 1157,
          alt: "金色の髪《かみ》の男の人が、ヤギの引く車に乗り、かみなりの光る空の下でハンマーをふり上げている油絵《あぶらえ》",
          caption: "ウィンゲという画家《がか》の絵『トールと巨人《きょじん》のたたかい』（1872年）。ハンマーをふり上げているのが、かみなりの神さまトール。Thursday（木曜日）は「トールの日」です。",
          credit: { author: "Mårten Eskil Winge", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:M%C3%A5rten_Eskil_Winge_-_Tor%27s_Fight_with_the_Giants_-_Google_Art_Project.jpg" },
        },
      ],
      cliff: "曜日の名前が分かりました。では「今日は何曜日？」は、英語《えいご》でどう聞くのでしょう？",
    },
    {
      heading: "曜日をたずねて、答える",
      body: "「今日は何曜日？」は {{What day is it today?}} とたずねます。答えるときは {{It's 〜.}} の後ろに曜日を入れて、It's Friday. のように言います。好《す》きな曜日を聞くときは What day do you like? と言えます。",
      reading: [
        "曜日をたずねるときは、{{What day is it today?}} と言います。what は「何」、day は「日」。「今日は何の日？」と聞いているのです。答えは It's Monday. のように、{{It's}} のあとに曜日を言うだけです。この it は「それ」という意味ではなく、曜日や天気を話すときに使う、とくべつな it です。",
        "相手の好《す》きな曜日を聞くこともできます。What day do you like? と聞かれたら、I like Saturdays. のように答えます。好《す》きなわけも一言足すと、会話がはずみます。",
        "イギリスには、曜日が出てくる古いわらべうたがあります。{{マザーグース}}とよばれる歌の一つ、Monday's Child（月曜日の子）です。何曜日に生まれた子はどんな子かを、月曜日から順番《じゅんばん》に歌い、最後《さいご》は Sabbath day（お休みの日。ここでは日曜日）で終わります。自分が生まれた曜日の行をさがして楽しむ人が、今もたくさんいます。",
        "下の歌を聞いてみましょう。face と grace、woe と go のように、行の終わりの音がそろっていて、口に出すと気持ちがいいのです。曜日の言葉が聞こえたら、手をたたいてみましょう。「水曜日の子は、悲しいことがいっぱい」なんて言われたらびっくりしますが、これはむかしの人が言葉あそびのように歌いついできた歌です。",
      ],
      figure: {
        type: "flow",
        dir: "col",
        title: "曜日の会話",
        steps: [
          { label: "What day is it today?", sub: "今日は何曜日？", tone: "blue" },
          { label: "It's Friday.", sub: "金曜日だよ", tone: "yellow" },
          { label: "I like Fridays!", sub: "金曜日が好《す》き！" },
        ],
        arrows: ["たずねる", "聞いて一言"],
      },
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Monday's child is fair of face,\nTuesday's child is full of grace,\nWednesday's child is full of woe,\nThursday's child has far to go,\nFriday's child is loving and giving,\nSaturday's child works hard for its living,\nBut a child that's born on the Sabbath day\nIs bonny and blithe, and good and gay.",
        ja: "月曜日に生まれた子は、かおがきれい。\n火曜日に生まれた子は、しぐさがきれい。\n水曜日に生まれた子は、悲しいことがいっぱい。\n木曜日に生まれた子は、遠くまで旅をする。\n金曜日に生まれた子は、やさしくて、人にあげるのがすき。\n土曜日に生まれた子は、くらしのために、よくはたらく。\nけれど、お休みの日に生まれた子は、\nかわいくて、ほがらかで、よい子で、元気いっぱい。",
        cite: "Mother Goose, \"A Week of Birthdays\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/rmg2.webp`, width: 800, height: 957,
          alt: "緑と白のごばんの目のわくの中に、羽のついたぼうしの子どもとブタのかげ絵",
          caption: "『ザ・リアル・マザーグース』（1916年、アメリカ）のページをかざる絵。この本には、Monday's Child など、たくさんのわらべうたがのっています。",
          credit: { author: "Blanche Fisher Wright", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:The_Real_Mother_Goose_pg_2.jpg" },
        },
      ],
      cliff: "歌の中の Sunday には sun が入っています。じつは sun からは、天気の言葉も生まれました。",
    },
    {
      heading: "天気の言葉は、もとの言葉に y がつく",
      body: "天気を表す言葉は、{{sun（太陽）・cloud（雲）・rain（雨）}}などの言葉に {{y}} がついてできています。sunny は n が2つになることに気をつけましょう。もとの言葉を知っていると、天気の言葉の意味が分かりやすくなります。",
      reading: [
        "天気の言葉の多くは、もとの言葉に {{y}} をつけて作ります。sun（太陽）に y をつけると sunny（晴れ）、cloud（雲）なら cloudy（くもり）、rain（雨）なら rainy（雨ふり）。y には「〜が出ている」「〜がいっぱい」という感じがあります。sunny は、太陽が出ている様子です。",
        "ここで、Sunday と sunny をくらべてみましょう。どちらも sun から来ていますが、Sunday は day（日）がついた{{曜日の名前}}、sunny は y がついた{{天気の様子}}です。曜日の名前は、雨がふっても雪がふっても変《か》わりません。後ろにつくものが、言葉の役目を決めているのです。",
        "イギリスの人は、天気の話が大好《す》きだといわれます。1日の中でも、晴れたり雨がふったりと、天気がよく変《か》わるからです。教会の塔《とう》の上には、風の向きを知らせる{{風見《かざみ》どり}}が、今も立っています。",
      ],
      figure: {
        type: "formula",
        title: "もとの言葉 → 天気の言葉",
        prose: true,
        steps: [
          { label: "太陽", expr: "sun → sun{{ny}}", note: "晴れ（n が2つ）" },
          { label: "雲", expr: "cloud → cloud{{y}}", note: "くもり" },
          { label: "雨", expr: "rain → rain{{y}}", note: "雨" },
          { label: "雪", expr: "snow → snow{{y}}", note: "雪" },
          { label: "風", expr: "wind → wind{{y}}", note: "風が強い" },
        ],
      },
      photos: [
        {
          src: `${C}/vane.webp`, width: 800, height: 533,
          alt: "くもり空を背《せ》に、にわとりの形をした風見《かざみ》どりが、とがった柱の上に立っている。下の横ぼうに鳥が2羽とまっている",
          caption: "イギリスの教会の塔《とう》の上にある、にわとりの形の風見《かざみ》どり。風が来るほうに頭を向けて、風の向きを教えます。この日の空は cloudy（くもり）ですね。",
          credit: { author: "Tim Green from Bradford", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", source: "https://commons.wikimedia.org/wiki/File:Rooster_weather_vane_of_St_Andrew%27s_Church,_Holmfield,_Halifax.jpg" },
        },
      ],
      cliff: "天気の言葉がそろいました。では、天気はどうたずねて、どう答えるのでしょう？",
    },
    {
      heading: "天気をたずねて、答える",
      body: "「天気はどう？」は {{How's the weather?}} とたずねます。答えるときは {{It's sunny.}} のように、It's の後ろに天気の言葉を入れます。曜日のときも天気のときも、答えは It's で始まることをおさえましょう。",
      reading: [
        "天気をたずねるときは、{{How's the weather?}} と言います。how は「どう」、weather は「天気」です。答えは It's sunny. のように、It's のあとに天気の言葉を入れます。曜日と同じ It's で始まるので、後ろの言葉で、曜日の話か天気の話かが決まります。",
        "だから、質問《しつもん》の始めの言葉をよく聞くことが大切です。What day と聞こえたら曜日、How's the weather と聞こえたら天気。始めの言葉が、どちらの箱からカードを出せばよいかを教えてくれます。",
        "雨がはげしくふる日のことを、英語《えいご》では It's raining cats and dogs.（ねこと犬がふってくる）と、おもしろく言うこともあります。天気の言い方を一つ覚《おぼ》えると、朝、まどの外を見るのが楽しくなりますね。",
      ],
      figure: {
        type: "compare",
        title: "曜日と天気のたずね方",
        columns: [{ title: "曜日", tone: "blue" }, { title: "天気", tone: "yellow" }],
        rows: [
          { label: "たずねる", cells: ["What day is it today?", "How's the weather?"] },
          { label: "答える", cells: ["It's Monday.", "It's rainy."] },
        ],
      },
      reveal: "Sunday も sunny も、もとは sun（太陽）です。でも Sunday は、sun に day（日）がついた「太陽の日」という{{曜日の名前}}なので、雨の日でも Sunday です。sunny は、sun に y がついた「太陽が出ている」という{{天気の様子}}です。だから What day? には Sunday、How's the weather? には sunny と、たずねる言葉で使い分けるのです。",
    },
  ],
  story: {
    kind: "manzai",
    title: "日曜日はいつも晴れ？",
    cast: ["ハルト", "メイ"],
    lines: [
      { who: "ハルト", text: "どうもー、ハルトです！英語《えいご》で曜日と天気を言えるようになりました！" },
      { who: "メイ", text: "メイです。じゃあ聞くよ。What day is it today?", say: "メイです。じゃあ聞くよ。ワット・デイ・イズ・イット・トゥデイ？" },
      { who: "ハルト", text: "It's sunny!", say: "イッツ・サニー！" },
      { who: "メイ", text: "天気を答えてどうするの！What day は「何曜日？」。曜日で答えるの。", say: "天気を答えてどうするの！ワット・デイは、何曜日？曜日で答えるの。" },
      { who: "ハルト", text: "だって今日は日曜日でしょ。Sunday は、つまり「晴れの日」！", say: "だって今日は日曜日でしょ。サンデーは、つまり、晴れの日！" },
      { who: "メイ", text: "ちがう！Sunday は「太陽の日」っていう{{曜日の名前}}。雨がふっても Sunday だよ。", say: "ちがう！サンデーは、太陽の日っていう曜日の名前。雨がふってもサンデーだよ。" },
      { who: "ハルト", text: "えっ、雨の日曜日は Rainday にならないの？", say: "えっ、雨の日曜日は、レインデーにならないの？" },
      { who: "メイ", text: "ならない！曜日の名前は、天気で変《か》わらないの。" },
      { who: "ハルト", text: "じゃあ、晴れは英語《えいご》で何て言うの？" },
      { who: "メイ", text: "sun に y をつけて{{sunny}}。n を2つ書くのを忘《わす》れないでね。", say: "サンにワイをつけてサニー。エヌを2つ書くのを忘れないでね。" },
      { who: "ハルト", text: "分かった。じゃあメイ、How's the weather?", say: "分かった。じゃあメイ、ハウズ・ザ・ウェザー？" },
      { who: "メイ", text: "外は雨だから、It's rainy.", say: "外は雨だから、イッツ・レイニー。" },
      { who: "ハルト", text: "えーっ、今日は Sunday なのに？", say: "えーっ、今日はサンデーなのに？" },
      { who: "メイ", text: "まだ言ってる！Sunday は曜日、sunny は天気。{{たずね方}}で答えを決めるの。", say: "まだ言ってる！サンデーは曜日、サニーは天気。たずね方で答えを決めるの。" },
      { who: "ハルト", text: "じゃあ Thursday は？かみなりの神さまトールの日だから、毎週かみなり？", say: "じゃあサーズデーは？かみなりの神さまトールの日だから、毎週かみなり？" },
      { who: "メイ", text: "毎週鳴ったら、かさが何本あっても足りないよ！名前に神さまがいるだけ。天気は空を見て答えるの。" },
      { who: "ハルト", text: "よし、今度こそ。What day is it today? It's Sunday. How's the weather? It's rainy.", say: "よし、今度こそ。ワット・デイ・イズ・イット・トゥデイ？イッツ・サンデー。ハウズ・ザ・ウェザー？イッツ・レイニー。" },
      { who: "メイ", text: "かんぺき！……って、全部自分で聞いて、自分で答えてる。もういいよ。" },
      { who: "ハルト", text: "どうも、ありがとうございました！" },
    ],
    note: "ハルトとメイは作り話の人で、会話も作り話です。Sunday が sun（太陽）から、Thursday がかみなりの神さまトールから名前がついたことは、英語《えいご》の言葉の歴史《れきし》にもとづいています。",
  },
  mistakes: [
    { wrong: "Tuesday と Thursday を取りちがえる", right: "Tuesday は火曜日、Thursday は木曜日", why: "どちらも T で始まり、音もにています。曜日の順《じゅん》では火→水→木です。" },
    { wrong: "曜日を monday と小文字で始める", right: "Monday", why: "曜日の言葉は、はじめの文字をいつも大文字で書きます。" },
    { wrong: "How's the weather? に It's Sunday. と答える", right: "It's sunny.", why: "Sunday は日曜日、sunny は晴れです。天気を聞かれたら天気の言葉で答えます。" },
  ],
  check: [
    { q: "「水曜日」を英語《えいご》で言うと？", a: "Wednesday", why: "日・月・火・水の順《じゅん》で、4番目の曜日です。" },
    { q: "What day is it today? に「金曜日」と答えると？", a: "It's Friday.", why: "It's の後ろに曜日を入れます。" },
    { q: "雨の日に How's the weather? と聞かれたら？", a: "It's rainy.", why: "rain（雨）に y がついた rainy を使います。" },
  ],
  next: [
    { label: "カードとドリル「曜日と天気」", href: "/learn/eigo-sho/e-english-34-youbi-tenki" },
    { label: "図解《ずかい》レクチャー「時刻《じこく》と一日の生活」", href: "/learn/lecture/e-english-34-jikoku" },
    { label: "理科4年「天気と気温」のレクチャー", href: "/learn/lecture/e-science-4-tenki" },
  ],
};
