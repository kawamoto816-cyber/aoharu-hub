import type { Lecture } from "../types";

const C = "/media/commons/e-english-56-ikitai";

export const E_ENGLISH_56_IKITAI: Lecture = {
  unit: "e-english-56-ikitai",
  title: "I want to go to ＋場所. のあとに「そこでしたいこと」を足す",
  hook: "「夏休みに北海道へ行きたい」「いつかエジプトでピラミッドを見たい」。行きたい場所と、そこでしたいことを伝えると、話がぐっとふくらみます。英語では I want to go to 〜. の形に、理由を1文足すだけで伝えられます。",
  mystery: "I want to go to Italy. は、まちがいのない正しい英文です。それなのに、英語で話す人にこれだけを言うと、たいてい Why?（どうして？）と聞き返されます。この文には、いったい何が足りないのでしょう？",
  mission: {
    from: "駅前の旅行会社の窓口《まどぐち》の人",
    request: "うちの店では夏休みに、子どもたちが英語で書いた「行きたい所カード」をかべにかざっています。ところが、I want to go to Italy. とだけ書いたカードの前では、だれも足を止めてくれないのです。正しい英文なのに、何が足りないのか、カードの書き方の見本を作りたいと考えています。名探偵《めいたんてい》のあなたに、Why? と聞き返されてしまうなぞを解いてほしいのです。",
    thanks: "場所だけでは、その人の楽しみが見えなかったのですね。見本に「場所の次に、そこでしたいことを1文」と書きそえたら、I want to see koalas. や I want to eat pizza. のカードの前で、お客さんが笑顔で足を止めるようになりました。",
  },
  sections: [
    {
      heading: "I want to go to 〜. を組み立てる",
      body: "「行く」は go、「〜へ」は {{to ＋場所}} です。そこに「〜したい」の {{want to}} を前からつけると、I want to go to Italy.「イタリアへ行きたい」になります。この文には to が2回出てきます。{{want to は「〜したい」}}、{{go to は「〜へ行く」}}のはたらきです。",
      figure: {
        type: "formula",
        title: "「行く」から「行きたい」へ",
        prose: true,
        steps: [
          { expr: "I go.", note: "わたしは行く" },
          { expr: "I go {{to Italy}}.", note: "行き先は to ＋場所" },
          { expr: "I {{want to}} go to Italy.", note: "want to で「〜したい」" },
          { expr: "{{Where}} do you want to go?", note: "たずねる文：「どこへ」は Where" },
        ],
      },
      reading: [
        "I want to go to Italy. は、小さな部品を組み合わせてできた文です。中心にあるのは「行く」の {{go}}。行き先は、go のうしろに to をつけて go to Italy と言います。この to は「〜へ」と、向かう先を指す矢印のような言葉です。そこに「〜したい」の {{want to}} を前からつけると、「イタリアへ行きたい」になります。",
        "よく見ると、この文には to が2回出てきます。前の to は want とくっついて「〜したい」、うしろの to は「〜へ」の矢印です。同じ to でも、はたらきがちがうのですね。相手にたずねるときは、to Italy のかたまりを「どこへ」の {{Where}} にかえて文の先頭に出し、Where do you want to go? と言います。答えるときは、Where のところに場所を入れて返せばよいのです。",
      ],
      cliff: "「イタリアへ行きたい」で話はおしまい？　次は、行った先でできることを言う言葉を集めます。",
    },
    {
      heading: "国の名前と、そこでできること",
      body: "国の名前は {{Japan}}・{{France}} のように{{大文字で始めます}}。その国でできることは、You can see 〜.（〜が見られる）や You can eat 〜.（〜が食べられる）で言えます。見るなら {{see}}、食べるなら {{eat}} のように、したいことに合う動作の言葉をえらびます。",
      figure: {
        type: "compare",
        title: "国としたいこと（例）",
        columns: [{ title: "国", tone: "blue" }, { title: "有名なもの", tone: "plain" }, { title: "したいこと", tone: "yellow" }],
        rows: [
          { cells: ["Italy", "ピザ", "eat pizza"] },
          { cells: ["Egypt", "ピラミッド", "see the pyramids"] },
          { cells: ["Australia", "コアラ", "see koalas"] },
          { cells: ["Canada", "雪山", "ski"] },
        ],
      },
      reading: [
        "国の名前は、Japan・Italy・Egypt のように、いつも{{大文字}}で書き始めます。国の名前は、世界に1つしかないその国だけの「名前」です。Ken や Emma のような人の名前を大文字で書くのと同じ考え方なのです。",
        "その国でできることは、You can see 〜.（〜が見られます）や You can eat 〜.（〜が食べられます）で言えます。たとえばイタリアの首都ローマには、2000年近く前に建てられた大きな円形の競技場、コロッセオが今も残っています。見たいなら {{see}}、ピザを食べたいなら {{eat}}、海で泳ぎたいなら swim、おみやげを買いたいなら buy。したいことに合わせて、動作の言葉をえらびましょう。",
      ],
      photos: [
        {
          src: `${C}/colosseum.webp`, width: 800, height: 410,
          alt: "左に大きな門、右に半分くずれた円形の大きな石の建物があり、まわりを馬に乗った人や歩く人が行き来している油絵",
          caption: "19世紀（今から120年以上前）にえがかれたローマの風景。右の円形の建物がコロッセオです。I want to {{see}} the Colosseum. と、見たいものを足して言えます。",
          credit: { author: "作者不明（19世紀のイタリアの画家）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Colosseum_19th_century.jpg" },
        },
      ],
      cliff: "行きたい場所と、そこでできること。この2つをどうつなげば、聞く人の心が動くのでしょう？",
    },
    {
      heading: "理由をつけ足して話をふくらませる",
      body: "Where do you want to go? と聞かれたら、まず {{行きたい場所}}を言い、つぎに {{I want to 〜.}} で{{そこでしたいこと}}を足します。最後に It's exciting. などの気持ちをそえると、聞く人に伝わりやすくなります。国だけでなく、京都や沖縄、動物園などの場所も同じ形で言えます。",
      figure: {
        type: "flow",
        dir: "row",
        title: "3文で伝える（例）",
        steps: [
          { label: "行きたい所", sub: "go to Kenya", tone: "blue" },
          { label: "したいこと", sub: "see lions", tone: "yellow" },
          { label: "気持ち", sub: "It's exciting!", tone: "red" },
        ],
        arrows: ["なぜ？", "ひとこと"],
        note: "I want to go to Kenya. I want to see lions. It's exciting!",
      },
      reading: [
        "I want to go to Italy. と聞いた人は、「へえ、イタリアで何をするの？」と思います。場所だけでは、あなたが何を楽しみにしているのかが見えないからです。そこで2文めに I want to eat pizza. と足すと、聞く人の頭の中に、あつあつのピザをほおばるあなたの顔がうかびます。最後に It's exciting! と気持ちをそえれば、3文で、あなたの小さな夢が伝わります。",
        "行きたい場所に、そこにあるものを次々に足していった詩人がいます。スコットランドの作家ロバート・ルイス・スティーヴンソンです。かれは子どものころ体が弱く、ベッドの中で遠い国を思いうかべて過ごすことが多かったといわれます。1885年に出した子どものための詩集の中に、「Travel（旅）」という詩があります。大人になってからは『宝島《たからじま》』を書き、本当に海をわたって、南の島サモアでくらしました。",
        "詩は I should like to rise and go（立ち上がって、出かけてみたいな）と始まります。should like to は、今の英語の I'd like to（〜したいです）のなかまの、やわらかい言い方です。でも詩は「行きたい」では終わりません。Where（そこでは）と続けて、金のりんごが実る所、オウムがすむ島、ひとりで船を作るクルーソーたち……と、見たいものを次々に足していきます。Crusoe は、1719年の小説『ロビンソン・クルーソー』で、無人島でくらした主人公の名前です。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "I should like to rise and go\nWhere the golden apples grow;—\nWhere below another sky\nParrot islands anchored lie,\nAnd, watched by cockatoos and goats,\nLonely Crusoes building boats;—",
        ja: "立ち上がって、出かけてみたいな\n金のりんごが実るところへ。\nどこかちがう空の下、\nオウムの島々が、いかりを下ろしたようにうかぶところ。\nそこでは、白いオウムとヤギに見守られて、\nひとりぼっちのクルーソーたちが船を作っている。",
        cite: "Robert Louis Stevenson, \"Travel\" (lines 1-6), A Child's Garden of Verses (1885)",
        source: "https://www.gutenberg.org/ebooks/136",
      }],
      photos: [
        {
          src: `${C}/cockatoo.webp`, width: 800, height: 533,
          alt: "細い葉がしげる木の枝に、頭に黄色いかざり羽のある白い大きな鳥がとまっている写真",
          caption: "オーストラリアのキバタン。詩の cockatoo は、こうした頭にかざり羽のあるオウムのなかまです。",
          credit: { author: "Charles J. Sharp", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Sulphur-crested_cockatoo_(Cacatua_galerita_galerita)_Sydney.jpg" },
        },
        {
          src: `${C}/crusoe.webp`, width: 618, height: 534,
          alt: "左に、毛皮の服と大きなぼうしで鉄ぽうをかついだ男の人の版画、右に英語の題名が書かれたページ",
          caption: "1719年に出た『ロビンソン・クルーソー』の最初の本。左が、無人島でくらすクルーソーの絵です。詩の Crusoes は、この主人公から来ています。",
          credit: { author: "Clark & Pine（版画）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Robinson_Crusoe_1719_1st_edition.jpg" },
        },
      ],
      reveal: "I want to go to Italy. は正しい英文ですが、伝わるのは{{行きたい場所}}だけです。聞く人が本当に知りたいのは、そこで{{あなたが何をしたいか}}。だから Why? と聞き返されるのです。I want to eat pizza. のように{{そこでしたいこと}}を1文足すと、場所が「あなたの楽しみ」に変わります。スティーヴンソンの詩も、「行きたい」のあとに、見たいものを何行も足していました。",
      cliff: "最後に、動物園や公園へ行きたいときの、小さな落とし穴《あな》を見ておきましょう。",
    },
    {
      heading: "the がいる場所、いらない場所",
      body: "国や町の名前には the をつけず、go to Kyoto のように言います。動物園や公園のようなふつうの場所の言葉には {{the}} をつけて、{{go to the zoo}}・go to the park と言います。どこへ行きたいかを、まわりの人とたずね合ってみましょう。",
      reading: [
        "Kyoto や Okinawa、Italy のような町や国の名前は、それだけで「あの場所」と1つに決まります。だから the はつけずに、go to Kyoto と言います。いっぽう、zoo（動物園）や park（公園）は、世界中にたくさんある、ふつうの場所の言葉です。「いつも行くあの動物園」のように、話す人どうしで分かっている場所を指すときは {{the}} をつけて、go to the zoo、go to the park と言います。",
        "さあ、まわりの人と Where do you want to go? とたずね合ってみましょう。答えるときは、場所、したいこと、気持ちの3文です。I want to go to Okinawa. I want to swim in the sea. It's fun! 遠い国でも、となりの町の公園でもかまいません。したいことを足すだけで、あなたの話は、聞く人が身を乗り出す話に変わります。",
      ],
    },
  ],
  story: {
    kind: "manzai",
    title: "メニューの読み上げ",
    cast: ["タイガ", "ノノカ"],
    lines: [
      { who: "タイガ", text: "どうもー、タイガです！　今日は、夏休みに行きたい所を英語で発表します！" },
      { who: "ノノカ", text: "ノノカです。じゃあ聞くね。Where do you want to go?", say: "ノノカです。じゃあ聞くね。ホエア・ドゥー・ユー・ウォント・トゥー・ゴー？" },
      { who: "タイガ", text: "I want to go to Italy.", say: "アイ・ウォント・トゥー・ゴー・トゥー・イタリー。" },
      { who: "ノノカ", text: "いいね！　で、イタリアで何をしたいの？" },
      { who: "タイガ", text: "I want to go to Italy!", say: "アイ・ウォント・トゥー・ゴー・トゥー・イタリー！" },
      { who: "ノノカ", text: "同じ文をもう1回！　行き先はもう分かったって。聞いた人は、そこで{{何をしたいか}}が知りたいの。" },
      { who: "タイガ", text: "ピッツァ！　パスタ！　ジェラート！　全部食べたい！" },
      { who: "ノノカ", text: "食べ物の名前を言っただけ！　メニューの読み上げか！　その「食べたい」を英語にするの。{{I want to eat}} 〜. だよ。", say: "食べ物の名前を言っただけ！ メニューの読み上げか！ その、食べたいを英語にするの。アイ・ウォント・トゥー・イート、だよ。" },
      { who: "タイガ", text: "I want to eat pizza. I want to eat pasta. I want to eat gelato.", say: "アイ・ウォント・トゥー・イート・ピーツァ。アイ・ウォント・トゥー・イート・パスタ。アイ・ウォント・トゥー・イート・ジェラート。" },
      { who: "ノノカ", text: "食べてばっかり！　ほかにしたいことはないの？" },
      { who: "タイガ", text: "あるよ。I want to see the Colosseum.", say: "あるよ。アイ・ウォント・トゥー・シー・ザ・コロシアム。" },
      { who: "ノノカ", text: "おお、2000年近く前の大きな競技場！　見るなら {{see}}、食べるなら {{eat}}。ちゃんと使い分けられたね。", say: "おお、2000年近く前の大きな競技場！ 見るならシー、食べるならイート。ちゃんと使い分けられたね。" },
      { who: "タイガ", text: "最後に気持ちもそえます。It's exciting!　……ぐうう〜。", say: "最後に気持ちもそえます。イッツ・エキサイティング！ ……ぐうう〜。" },
      { who: "ノノカ", text: "おなかで返事しない！　じゃあ、わたしの番。I want to go to the zoo. I want to see pandas.", say: "おなかで返事しない！ じゃあ、わたしの番。アイ・ウォント・トゥー・ゴー・トゥー・ザ・ズー。アイ・ウォント・トゥー・シー・パンダズ。" },
      { who: "タイガ", text: "近っ！　しかも the zoo って、the がついてる！", say: "近っ！ しかも、ザ・ズーって、ザがついてる！" },
      { who: "ノノカ", text: "動物園みたいな、ふつうの場所の言葉には {{the}}。Italy みたいな国の名前にはつけないの。", say: "動物園みたいな、ふつうの場所の言葉にはザ。イタリーみたいな国の名前にはつけないの。" },
      { who: "タイガ", text: "なるほど。じゃあ、ぼくも決めた。I want to go to the pizza shop!", say: "なるほど。じゃあ、ぼくも決めた。アイ・ウォント・トゥー・ゴー・トゥー・ザ・ピーツァ・ショップ！" },
      { who: "ノノカ", text: "近所で食べる気だ！　結局、食べ物！　もういいよ。" },
      { who: "タイガ", text: "どうも、ありがとうございました！" },
    ],
    note: "タイガとノノカは作り話の人で、会話も作り話です。I want to go to ＋場所. のあとに I want to ＋動作の言葉. でしたいことを足す言い方、国の名前に the をつけず、zoo や park にはつけることは、英語のきまりです。コロッセオは、ローマに今も残る2000年近く前の競技場です。",
  },
  mistakes: [
    { wrong: "I want go to France.", right: "I want to go to France.", why: "「〜したい」は want to ＋動作の言葉。to をわすれやすいです。" },
    { wrong: "I want to go Italy.", right: "I want to go to Italy.", why: "行き先の前には to（〜へ）が必要です。" },
    { wrong: "I want to go to china.", right: "I want to go to China.", why: "国の名前は大文字で始めます。" },
  ],
  check: [
    { q: "「カナダへ行きたい」を英語で言いましょう。", a: "I want to go to Canada.", why: "want to go to ＋場所。" },
    { q: "相手の行きたい場所をたずねる文は？", a: "Where do you want to go?", why: "「どこへ」は Where。" },
    { q: "I want to go to Italy. I want to ___ pizza. の ___ は？", a: "eat", why: "ピザは食べるものなので eat。" },
  ],
  next: [
    { label: "ポイントと練習問題「行きたい国・場所」", href: "/learn/eigo-sho/e-english-56-ikitai" },
    { label: "「将来《しょうらい》の夢（I want to be 〜.）」", href: "/learn/eigo-sho/e-english-56-yume" },
    { label: "中2「不定詞《ふていし》」", href: "/learn/eibunpo-chu/j-en-2-futeishi" },
  ],
};
