import type { Lecture } from "../types";

const C = "/media/commons/e-english-56-chumon";

export const E_ENGLISH_56_CHUMON: Lecture = {
  unit: "e-english-56-chumon",
  nameRuby: "注文と値段《ねだん》（What would you like?）",
  title: "注文は I'd like 〜.、値段《ねだん》は How much 〜? でたずねる",
  hook: "レストランやお店では、「何にしますか」「〜をください」「いくらですか」という会話がくり返されます。英語でもこの流れはほとんど同じで、決まった言い方をいくつか覚えれば、外国のお店でも注文できます。ここでは、ていねいな言い方の I'd like と、値段《ねだん》の言い方を組み立てます。",
  mystery: "want も like も、注文では「ほしい」に近い意味です。それなのに、レストランで I want pizza! と言うと、店員さんにはぶっきらぼうに聞こえることがあります。I'd like の、小さな 'd には、どんな力がかくれているのでしょう？",
  mission: {
    from: "商店街の洋食屋さんの店長",
    request: "うちの店には、外国のお客さんも食べに来てくれます。ところがアルバイトの高校生が「I want water! と言われました。おこっていたのでしょうか」と心配しています。同じ「ほしい」なのに、なぜ聞こえ方がちがうのか、メニューのうらに書いて説明したいのです。名探偵《めいたんてい》のあなたに、I want と I'd like のちがいのなぞを解いてほしいのです。",
    thanks: "お客さんはおこっていたのではなく、気持ちをまっすぐ言っただけだったのですね。メニューのうらに「'd は would。would は言葉をやわらかくするクッション」と書いたら、アルバイトの子も安心して、自分でも What would you like? と笑顔で聞けるようになりました。",
  },
  sections: [
    {
      heading: "お店の会話は決まった流れ",
      body: "お店の人は {{What would you like?}}（何になさいますか）と聞きます。お客は {{I'd like 〜, please.}} と注文し、{{How much is it?}} で値段《ねだん》をたずねます。お金や品物をわたすときは {{Here you are.}}（はい、どうぞ）と言い、受け取ったら Thank you. と返します。",
      figure: {
        type: "formula",
        title: "注文の会話（例）",
        prose: true,
        steps: [
          { label: "店", expr: "{{What would you like?}}", note: "何になさいますか" },
          { label: "客", expr: "{{I'd like}} a sandwich, please.", note: "サンドイッチをください" },
          { label: "客", expr: "{{How much}} is it?", note: "いくらですか" },
          { label: "店", expr: "It's 350 yen.", note: "350円です" },
          { label: "客", expr: "{{Here you are.}}", note: "お金をわたす" },
          { label: "店", expr: "Thank you.", note: "品物をわたす" },
        ],
      },
      reading: [
        "お店での英語の会話は、キャッチボールのように決まった順番で進みます。店員さんが What would you like?（何になさいますか）と投げかけ、お客さんが I'd like a sandwich, please. と返します。値段《ねだん》を知りたければ How much is it?、お金をわたすときは Here you are. です。流れが頭に入っていれば、次に何を言われるかが予想できるので、あわてずに答えられます。",
        "英語の国でも、物を売り買いする言葉は、昔から町にあふれていました。今から230年ほど前のロンドンでは、花や野菜、牛乳などを売る人が、品物の名前と{{値段《ねだん》}}を、節をつけた大きな声でよびながら通りを歩いていました。この「売り声」は町の名物で、画家が絵にも残しています。そのうちの一枚には、Two bunches a penny, primroses（サクラソウ、2たばで1ペニー）という声が書かれています。ペニーは、イギリスの小さなお金の単位です。",
      ],
      photos: [
        {
          src: `${C}/primroses.webp`, width: 800, height: 1059,
          alt: "かごにサクラソウの花を入れた若い女の人と、花を持った2人の子ども、犬が、石の建物の前の通りを歩いている版画",
          caption: "230年ほど前のロンドンの「売り声」をえがいた版画（1793年）。下に「サクラソウ、2たばで1ペニー」と、品物と{{値段《ねだん》}}をよぶ声が書かれています。",
          credit: { author: "Francis Wheatley（原画）, Luigi Schiavonetti（版画）", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", source: "https://commons.wikimedia.org/wiki/File:Bloemenverkoopster_Two_bunches_a_penny_primroses_(titel_op_object)_Straatroepen_van_Londen_(serietitel)_Cries_of_London_(serietitel),_RP-P-1928-200.jpg" },
        },
      ],
      cliff: "店員さんの What would you like? にも、お客さんの I'd like にも、同じ would がかくれています。",
    },
    {
      heading: "I want と I'd like のちがい",
      body: "I'd は {{I would}} を短くした形で、I'd like 〜. は「〜をいただきたいです」という{{ていねいな言い方}}です。I want 〜. も「〜がほしい」という意味ですが、お店の人に向かって言うと少し強く聞こえます。注文のときは I'd like を使い、最後に please をつけるとさらにていねいになります。",
      figure: {
        type: "compare",
        title: "2つの言い方",
        columns: [{ title: "I want 〜.", tone: "blue" }, { title: "I'd like 〜.", tone: "yellow" }],
        rows: [
          { label: "意味", cells: ["〜がほしい", "〜をいただきたい"] },
          { label: "感じ", cells: ["ふつう", "ていねい"] },
          { label: "使う相手", cells: ["家族・友だち", "お店の人・初めての人"] },
        ],
      },
      reading: [
        "I want 〜. は「〜がほしい」と、自分の気持ちをまっすぐに伝える言い方です。家族や友だちに言うのは、何の問題もありません。でも、お店の人に I want water. と言うと、日本語で「水！」「水がほしい」と言われたときのように、少しぶっきらぼうに聞こえることがあります。言っている人に悪気はなくても、聞く人には「命令みたい」と感じられてしまうのです。",
        "I'd like の 'd は、{{would}} を短くした形です。would には、言い方を少しやわらかくする、クッションのような働きがあります。I'd like water. は「お水をいただきたいのですが」と、相手にお願いする感じになります。店員さんの What would you like? にも would が入っていて、「何がほしい？」ではなく「何になさいますか」というていねいな聞き方になっています。聞く人も答える人も would を使うことで、おたがいに気持ちよく話せるのです。",
        "日本語でも、「水」より「水をください」、さらに「お水をいただけますか」のほうがやわらかく聞こえますね。英語でも、I'd like 〜 の最後に please をつけると、もっとていねいになります。",
      ],
      reveal: "I'd like の 'd は {{would}} の短い形です。would は、言葉をやわらかくするクッションの働きをします。I want 〜! は「〜がほしい！」と気持ちをまっすぐ言うので、お店ではぶっきらぼうに聞こえることがあります。'd をつけた I'd like 〜. は「〜をいただきたいのですが」と相手にお願いする{{ていねいな言い方}}になるのです。",
      cliff: "注文が決まったら、次は値段《ねだん》。How much? と聞かれて、数で答えてもいいのでしょうか？",
    },
    {
      heading: "合計を英語で言う",
      body: "注文がいくつかあるときは、たし算で合計を出します。100は {{one hundred}}、1,000は {{one thousand}} です。たとえば750円は、700の {{seven hundred}} と50の {{fifty}} を続けて {{seven hundred fifty yen}} と言います。yen は2つ以上でも s をつけません。",
      figure: {
        type: "area",
        kind: "bar",
        title: "注文の合計（例）",
        bars: [
          {
            label: "注文",
            parts: [
              { value: 400, label: "ピザ 400", tone: "yellow" },
              { value: 150, label: "ジュース 150", tone: "blue" },
              { value: 200, label: "アイス 200", tone: "red" },
            ],
            total: "750円",
          },
        ],
        scale: [{ at: 0, label: "0" }, { at: 400, label: "400" }, { at: 550, label: "550" }, { at: 750, label: "750" }],
        scaleLabel: "円",
        note: "750 yen は seven hundred fifty yen と読む。",
      },
      reading: [
        "{{How much}} は「どれくらいの量」、{{How many}} は「いくつ」をたずねる言葉です。お金は数えるより「どれくらい」で考えるので、値段《ねだん》は How much で聞きます。How much is it? と聞かれて、Two! と数だけで答えると、「2円？　2ドル？　2こ？」と相手はこまってしまいます。答えるときは、It's 350 yen. のように、お金の単位までつけましょう。",
        "大きな数は、100の hundred と、1,000の thousand を組み合わせて言います。750円なら seven hundred fifty yen。イギリスでは seven hundred and fifty のように、間に and を入れて言うことが多いです。また、yen は2つ以上でも s をつけませんが、アメリカのお金の dollar は two dollars と s がつきます。お金の単位によって、きまりがちがうのです。",
      ],
      cliff: "お店の人に「〜はいかがですか」とすすめられたら、どう答えればよいでしょう？",
    },
    {
      heading: "すすめられたときの答え方",
      body: "お店の人に Would you like some tea?（お茶はいかがですか）とすすめられることもあります。ほしいときは {{Yes, please.}}、いらないときは {{No, thank you.}} と答えます。いらないときも thank you をつけるのが、相手を気づかう言い方です。",
      reading: [
        "Would you like 〜? は「〜はいかがですか」とすすめる言い方です。ここにも、やわらかくする would が入っています。ほしいときは Yes, please.、いらないときは No, thank you. と答えます。ことわるときにも thank you をつけて、「すすめてくれてありがとう」という気持ちをそえるのです。",
        "下の歌は、200年以上前からイギリスで歌われてきたマザーグースの「Pease Porridge Hot」です。pease porridge は、かわかしたえんどう豆をにこんだおかゆのことで、むかしのふだんの食事でした。子どもたちは向かい合って、歌に合わせて手をたたき合います。「9日め」は、なべで作って何日も温め直して食べることがあったから、とも言われます。",
        "歌の中の Some like it hot は「あついのが好きな人もいる」。この like は「好き」の like です。注文の I'd like とくらべてみましょう。I like it hot. は「あついのが好きです」という好みの話、I'd like it hot. は「あついのでお願いします」という注文になります。小さな 'd ひとつで、話が注文に変わるのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Pease porridge hot,\nPease porridge cold,\nPease porridge in the pot,\nNine days old.\nSome like it hot,\nSome like it cold,\nSome like it in the pot,\nNine days old.",
        ja: "あつあつの 豆のおかゆ\nひえひえの 豆のおかゆ\nなべに入った 豆のおかゆ\nできてから 9日め\nあついのが好きな人もいる\nつめたいのが好きな人もいる\nなべに入ったままが好きな人もいる\nできてから 9日め",
        cite: "Mother Goose, \"Pease Porridge\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/clap.webp`, width: 585, height: 459,
          alt: "台にすわって向かい合った男の子と女の子が、両手を合わせて手遊びをしている絵",
          caption: "「Pease Porridge Hot」に合わせて手をたたき合う子どもたち。1920年にアメリカで出た子ども向けの本のさし絵です。",
          credit: { author: "Olive Beaupré Miller（編）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:PeasePorridgeHotImage1920.png" },
        },
        {
          src: `${C}/pease.webp`, width: 800, height: 579,
          alt: "黒っぽい皿に、黄色い豆のペーストがしかれ、その上に丸い肉料理がのっている写真",
          caption: "下の黄色いものが、えんどう豆をにこんだイギリスの豆料理。pease porridge とよばれることもあります。上はひき肉の料理です。",
          credit: { author: "Haydn Blackey", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Faggott_and_pease_pudding_-_Milkwood_(49526644286).jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "manzai",
    title: "アイドルが好き？",
    cast: ["ハヤト", "リン"],
    lines: [
      { who: "ハヤト", text: "どうもー、ハヤトです！　今日はレストランごっこをします。ぼくがお客さん！" },
      { who: "リン", text: "リンです。じゃあわたしが店員さん。いらっしゃいませ。What would you like?", say: "リンです。じゃあわたしが店員さん。いらっしゃいませ。ワット・ウッジュー・ライク？" },
      { who: "ハヤト", text: "I want pizza! I want juice! I want ice cream!", say: "アイ・ウォント・ピーツァ！ アイ・ウォント・ジュース！ アイ・ウォント・アイスクリーム！" },
      { who: "リン", text: "「ほしい！ほしい！ほしい！」って、だだっ子か！　お店の人には{{I'd like}}でしょ。", say: "ほしい、ほしい、ほしいって、だだっ子か！ お店の人にはアイド・ライクでしょ。" },
      { who: "ハヤト", text: "アイドライク？　アイドルが好きってこと？" },
      { who: "リン", text: "ちがう！　I'd は {{I would}} の短い形。would が言葉をやわらかくして、「〜をいただきたいです」っていう{{ていねいな言い方}}になるの。", say: "ちがう！ アイドは、アイ・ウッドの短い形。ウッドが言葉をやわらかくして、〜をいただきたいです、っていう、ていねいな言い方になるの。" },
      { who: "ハヤト", text: "なるほど。I'd like pizza, please.", say: "なるほど。アイド・ライク・ピーツァ、プリーズ。" },
      { who: "リン", text: "いいね。じゃあ交代。今度はハヤトが店員さん。How much is it?", say: "いいね。じゃあ交代。今度はハヤトが店員さん。ハウ・マッチ・イズ・イット？" },
      { who: "ハヤト", text: "Two!", say: "トゥー！" },
      { who: "リン", text: "2円！？　安すぎるでしょ！　{{How much}} は値段《ねだん》。数を聞くのは {{How many}}。", say: "2円！？ 安すぎるでしょ！ ハウ・マッチは、ねだん。数を聞くのは、ハウ・メニー。" },
      { who: "ハヤト", text: "じゃあ、It's two hundred yens!", say: "じゃあ、イッツ・トゥー・ハンドレッド・イェンズ！" },
      { who: "リン", text: "おしい！　{{yen}} は2つ以上でも s をつけないの。It's two hundred yen.", say: "おしい！ イェンは2つ以上でも、エスをつけないの。イッツ・トゥー・ハンドレッド・イェン。" },
      { who: "ハヤト", text: "Here you are. ピザです。それから本日のおすすめ、えんどう豆のおかゆ。nine days old!", say: "ヒア・ユー・アー。ピザです。それから本日のおすすめ、えんどう豆のおかゆ。ナイン・デイズ・オールド！" },
      { who: "リン", text: "9日前のおかゆをすすめないで！　それはマザーグースの歌の中だけ！" },
      { who: "ハヤト", text: "Would you like some?", say: "ウッジュー・ライク・サム？" },
      { who: "リン", text: "{{No, thank you.}}", say: "ノー、サンキュー。" },
      { who: "ハヤト", text: "ことわるときもサンキューって、リンはやさしいなあ。" },
      { who: "リン", text: "すすめてくれた気持ちにお礼を言うの。でも、そのおかゆはいらない！　もういいよ。" },
      { who: "ハヤト", text: "どうも、ありがとうございました！" },
    ],
    note: "ハヤトとリンは作り話の人で、会話も作り話です。I'd が I would の短い形でていねいな言い方になることや、How much と How many のちがい、yen に s をつけないことは、英語のきまりです。「Pease Porridge Hot」はイギリスに伝わるマザーグースの歌です。",
  },
  mistakes: [
    { wrong: "注文で I like a hamburger. と言う。", right: "I'd like a hamburger.", why: "I like は「〜が好き」。注文の「〜をください」は I'd like です。" },
    { wrong: "How many is it?", right: "How much is it?", why: "値段《ねだん》をたずねるときは How much。How many は数をたずねます。" },
    { wrong: "I'd like a orange juice.", right: "I'd like an orange juice.", why: "orange のように a・i・u・e・o の音で始まる言葉の前は an です。" },
  ],
  check: [
    { q: "「ピザをください」をていねいに言いましょう。", a: "I'd like pizza, please.", why: "注文は I'd like 〜, please." },
    { q: "値段《ねだん》をたずねる文は？", a: "How much is it?", why: "「いくら」は How much。" },
    { q: "300円を英語で言いましょう。", a: "three hundred yen", why: "yen には s をつけない。" },
  ],
  next: [
    { label: "ポイントと練習問題「注文と値段《ねだん》」", href: "/learn/eigo-sho/e-english-56-chumon" },
    { label: "小3・4「ほしいものを伝える（I want 〜.）」", href: "/learn/eigo-sho/e-english-34-hoshii" },
    { label: "小3・4「数の言い方」", href: "/learn/eigo-sho/e-english-34-kazu" },
  ],
};
