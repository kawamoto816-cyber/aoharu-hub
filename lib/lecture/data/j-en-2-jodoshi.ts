import type { Lecture } from "../types";

const C = "/media/commons/j-en-2-jodoshi";

export const J_EN_2_JODOSHI: Lecture = {
  unit: "j-en-2-jodoshi",
  title: "助動詞は動詞に気持ちを足す。must not と don't have to は意味がちがう",
  hook: "「宿題をしなければならない」「ここで写真をとってはいけない」「もっと寝たほうがいい」。こうした義務・禁止・アドバイスは、動詞の前に助動詞を置いて表します。特に must not と don't have to は、形が似ているのに意味が大きくちがうので、テストでもよく問われます。",
  mystery: "1933年、銀行に人々がつめかけ、国じゅうが不安に包まれていたアメリカで、新しい大統領は the only thing we have to fear is fear itself と語りました。「恐れるな」と言いたいなら You must not fear. でよさそうなのに、なぜ have to を使ったこの一文が、人々の心を落ち着かせたのでしょう？",
  mission: {
    from: "コミュニティFMの英語番組のDJ",
    request: "来月、「歴史を変えた声」という特集で、1933年のルーズベルト大統領の就任演説を流します。ところがリスナーの中学生から「恐れるなと言いたいなら、must not fear でいいのでは？」という質問が届きました。番組でこの質問にきちんと答えるために、名探偵のあなたに、この一文にこめられた助動詞のなぞを解いてほしいのです。",
    thanks: "have to の否定が「〜する必要はない」だと知って、あの一文が命令ではなく、重荷を下ろしてくれる言葉だったとわかりました。番組では「恐れるな」ではなく「恐れなくていい」という気持ちで訳して届けます。",
  },
  sections: [
    {
      heading: "助動詞 ＋ 動詞の原形が基本の形",
      body: "can・will と同じように、must・should・may も動詞の前に置く{{助動詞}}です。あとの動詞は{{いつも原形}}で、主語が he でも助動詞に -s はつきません。否定文は助動詞の{{すぐ後ろに not}}、疑問文は助動詞を{{主語の前}}に出します。",
      reading: [
        "中1で学んだ can（〜できる）と will（〜するだろう）は、動詞の前に置いて意味を足す{{助動詞}}でした。中2では、must（〜しなければならない）、should（〜すべきだ）、may（〜してもよい・〜かもしれない）が仲間に加わります。助動詞の役目は、動詞に話し手の「気持ち」を足すことです。He studies hard.（彼は熱心に勉強する）は事実を言うだけですが、He must study hard. なら「勉強しなければならない」、He should study hard. なら「勉強したほうがいい」と、話し手の判断が加わります。",
        "形のきまりは、すべての助動詞で共通です。助動詞のあとの動詞は{{いつも原形}}で、主語が he や she でも、助動詞にも動詞にも -s はつきません。否定文は助動詞の{{すぐ後ろに not}}を置き（He must not 〜）、疑問文は助動詞を{{主語の前}}に出します（Must he 〜?）。do や does は使いません。また、will must のように助動詞を2つ並べることはできません。",
        "助動詞が演説でどれほど力を持つかを示すのが、1933年3月4日、アメリカの首都ワシントンで行われた{{フランクリン・ルーズベルト}}大統領の就任演説です。1929年の株価の大暴落から始まった{{大恐慌}}で、働きたくても仕事のない人が4人に1人ほどにのぼり、銀行が次々にお金を返せなくなっていました。新しい大統領は、ラジオで全国に流れたこの演説の初めのほうで、This great Nation will endure ……と語ります。主語は3人称単数の Nation なのに、will のあとの endure（耐える）・revive（よみがえる）・prosper（栄える）は、どれも -s のない原形です。will を3回くり返して、「この国は必ず立ち直る」という見通しを、たたみかけるように伝えました。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "This great Nation will endure as it has endured, will revive and will prosper.",
        ja: "この偉大な国は、これまで耐えぬいてきたように、これからも耐えぬき、よみがえり、そして栄えるでしょう。",
        cite: "Franklin D. Roosevelt, First Inaugural Address (1933)",
        source: "https://avalon.law.yale.edu/20th_century/froos1.asp",
      }],
      photos: [
        {
          src: `${C}/fdr-inauguration.webp`, width: 800, height: 633,
          alt: "丸い屋根の大きな建物の前に観客席が組まれ、その手前の広場を黒い人の波が埋めつくしている空からの白黒写真",
          caption: "1933年3月4日、ルーズベルトの就任式が行われた連邦議会議事堂（ワシントン）。前の広場に大勢の人が集まった。演説はラジオで全国に放送された。",
          credit: { author: "Architect of the Capitol", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:FDR_inauguration_02894u.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "He studies. に must を入れる",
        prose: true,
        steps: [
          { expr: "He {{studies}} hard.", note: "三単現の -s" },
          { expr: "He {{must study}} hard.", note: "must のあとは原形" },
          { expr: "He {{must not}} play games now.", note: "否定：must のあとに not" },
          { expr: "{{Must}} he study hard?", note: "疑問：Must を前へ" },
        ],
      },
      cliff: "同じ演説の有名な一文には、must ではなく have to が使われていました。",
    },
    {
      heading: "must と have to：肯定は同じ、否定でちがう",
      body: "must と {{have to}} は、どちらも「〜しなければならない」です。ところが否定にすると、{{must not}} は「〜してはいけない」という{{禁止}}、{{don't have to}} は「〜する必要はない」という意味になります。「しなくてもいい」と「してはいけない」は正反対に近いので、しっかり区別しましょう。",
      reading: [
        "must と{{have to}}は、肯定文ではどちらも「〜しなければならない」です。I must finish this report today. も I have to finish this report today. も、「今日中にレポートを仕上げなければならない」。細かく言えば、must は話し手自身が「そうしなければ」と強く思う気持ち、have to はルールや事情など外から「そうするしかない」状況を表すことが多い、というちがいがあります。",
        "大きくちがうのは否定文です。You {{must not}} run in the hallway. は「ろうかを走ってはいけない」という{{禁止}}です。一方、You {{don't have to}} bring lunch tomorrow. は「明日はお弁当を持ってくる{{必要はない}}」。持ってきてもかまわないけれど、持ってこなくてもいい、という意味です。「してはいけない」と「しなくてもいい」は、言われた人の気持ちがまるでちがいます。",
        "ルーズベルトの演説でいちばん有名なのが、the only thing we have to fear is fear itself という一文です。the only thing（ただ一つのもの）を、we have to fear（わたしたちが恐れなければならない）が後ろからくわしくしています。直訳すると「わたしたちが恐れなければならない、ただ一つのものは、恐れそのものだ」。大統領は同じ演説で We must act and act quickly.（わたしたちは行動しなければならない、それもすばやく）とも言っています。行動については must で強い決意を示し、恐れについては have to で語っているのです。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "So, first of all, let me assert my firm belief that the only thing we have to fear is fear itself—nameless, unreasoning, unjustified terror which paralyzes needed efforts to convert retreat into advance.",
        ja: "ですから、まず何よりも、わたしの固い信念を述べさせてください。わたしたちが恐れなければならない、ただ一つのもの、それは恐れそのものです。名前もなく、わけもなく、根拠もない恐怖。それこそが、後退を前進に変えるために必要な努力を、動けなくしてしまうのです。",
        cite: "Franklin D. Roosevelt, First Inaugural Address (1933)",
        source: "https://avalon.law.yale.edu/20th_century/froos1.asp",
      }],
      photos: [
        {
          src: `${C}/bank-run.webp`, width: 587, height: 477,
          alt: "帽子とコート姿の男性たちが、建物の入り口の前の歩道にぎっしりと集まっている白黒写真",
          caption: "1933年2月、アメリカの銀行の前に集まった預金者たち。引き出せるお金が預金の5％までに制限されると発表され、人々がつめかけた。就任演説の数日前のようす。",
          credit: { author: "作者不明（米国国立公文書館）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Bank_Run_in_Michigan,_USA,_February_1933.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "must と have to の比べ方",
        columns: [{ title: "must", tone: "blue" }, { title: "have to", tone: "yellow" }],
        rows: [
          { label: "肯定", cells: ["〜しなければならない", "〜しなければならない"] },
          { label: "否定", cells: ["must not：〜してはいけない", "don't have to：〜する必要はない"] },
          { label: "過去", cells: ["（had to を使う）", "had to：〜しなければならなかった"] },
        ],
      },
      reveal: "the only thing we have to fear is fear itself は「恐れなければならない（{{have to}}）のは、恐れそのものだけ」という意味です。裏返せば、それ以外のものは{{恐れる必要はない（don't have to fear）}}ということになります。You must not fear.（恐れてはいけない）という{{禁止}}は、不安でいっぱいの人をしかる命令に聞こえますが、この一文は「ほかのものは恐れなくていい」と、聞き手の重荷を下ろしてくれます。have to の否定が「必要はない」になる性質が、人々を安心させる言葉の土台になっていた、と読み解けます。",
      cliff: "では、「しなければならなかった」と過去のことを言うには、must をどう変える？",
    },
    {
      heading: "have to は主語と時で形が変わる",
      body: "have to は must とちがって、ふつうの動詞 have と同じように形が変わります。主語が3人称単数なら{{has to}}、過去なら{{had to}}です。否定文・疑問文は {{do / does / did}} を使って作ります。未来なら will have to になります。",
      reading: [
        "must は、主語や時によって形が変わりません。過去形も未来形もないのです。そこで活躍するのが have to です。have to の have は、ふつうの動詞の have と同じように変化します。主語が3人称単数なら{{has to}}（She has to get up early.）、過去なら{{had to}}（I had to wait for an hour.）、未来なら{{will have to}}（You will have to change trains.）です。will must とは言えないので、未来の義務は will have to で表します。",
        "否定文と疑問文は、一般動詞と同じように{{do / does / did}}を使います。She doesn't have to cook tonight.（彼女は今夜、料理をする必要はない）、Did you have to stay home?（家にいなければならなかったの？）。答え方も Yes, I did. / No, I didn't. と、一般動詞と同じです。",
        "1933年の春、アメリカの人々はまさに had to の毎日を送りました。ルーズベルトは就任のすぐあと、全国の銀行をいったん休ませ、安全を確かめた銀行から順に再開させる手を打ちます。そのあいだ、多くの家族は手もとのわずかなお金でやりくりしなければなりませんでした（Many families had to live on very little money.）。3月12日、大統領はラジオで、銀行のしくみと再開の手順を、ふつうの人にもわかる言葉で語りかけます。「炉辺談話」とよばれたこの放送は、その後も続き、家族は居間のラジオの前に集まって耳をかたむけました。",
      ],
      photos: [
        {
          src: `${C}/radio-1930s.webp`, width: 624, height: 826,
          alt: "木の箱の上の部分が丸みをおび、スピーカーの布が3つの窓のように見える、古いラジオ",
          caption: "1930年代のアメリカの家庭用ラジオ。就任演説も、その後の大統領の「炉辺談話」も、人々はこうしたラジオの前に集まって聞いた。",
          credit: { author: "Joe Haupt", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Radio_Collection-_Vintage_Large_Wood_Westinghouse_Tombstone_Radio,_Circa_1930s_(8617610296).jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "have to の形の変化",
        prose: true,
        steps: [
          { expr: "I {{have to}} get up early.", note: "I・you・複数" },
          { expr: "She {{has to}} get up early.", note: "3人称単数 → has to" },
          { expr: "She {{had to}} get up early.", note: "過去 → had to" },
          { expr: "{{Does}} she have to get up early?", note: "疑問は does を前へ" },
          { expr: "She {{doesn't have to}} get up early.", note: "〜する必要はない" },
        ],
      },
      cliff: "義務だけではありません。助動詞には「かもしれない」とやわらかく語る使い方もあります。",
    },
    {
      heading: "意味で分けると覚えやすい",
      body: "{{should}} は「〜すべきだ・〜したほうがよい」というアドバイス、{{may}} は「〜してもよい（許可）」と「〜かもしれない（推量）」の2つの意味があります。会話では {{May I 〜?}}（〜してもよいですか）、{{Shall I 〜?}}（〜しましょうか）、{{Shall we 〜?}}（〜しませんか）、{{Could you 〜?}}（〜していただけませんか）もよく使います。",
      reading: [
        "{{should}}は「〜すべきだ・〜したほうがよい」というアドバイスです。You should see a doctor.（医者にみてもらったほうがいい）。must ほど強くなく、相手を思って言うやさしい助言になります。{{may}}には2つの意味があります。You may use my pen.（わたしのペンを使ってもいいですよ）の{{許可}}と、It may rain this afternoon.（午後は雨が降るかもしれない）の{{推量}}です。",
        "会話の決まった言い方も覚えましょう。{{May I}} use the bathroom?（トイレをお借りしてもいいですか）は許可を求める言い方、{{Shall I}} open the window?（窓を開けましょうか）は申し出、{{Shall we}} dance?（踊りませんか）はさそい、{{Could you}} help me?（手伝っていただけませんか）はていねいなお願いです。Shall I 〜? には Yes, please. / No, thank you. と答えます。",
        "may が名演説で光った例が、1962年9月12日、テキサス州ヒューストンのライス大学のスタジアムで行われた{{ケネディ}}大統領の演説です。当時アメリカとソ連は宇宙開発を競い、前の年にはソ連が人類初の有人宇宙飛行を成功させていました。ケネディは、この10年のうちに人間を月へ送るという目標をかかげます。「なぜ月なのか」という反対の声に対して、大統領は they may well ask why climb the highest mountain.（それなら、なぜいちばん高い山に登るのかと問うのももっともだ）と返しました。may well は「〜するのももっともだ」。相手の問いをいったん受けとめてから、自分の答えへ進むのです。",
        "続く We choose to go to the moon …… not because they are easy, but because they are hard（やさしいからではなく、むずかしいから選ぶ）は、宇宙開発の歴史でもっとも有名な言葉の一つになりました。演説の7年後の1969年7月、アポロ11号の宇宙飛行士が月面に降り立ちます。決意を語る must や will、相手を受けとめる may。助動詞は、話し手の気持ちを聞き手にそっと手わたす言葉なのです。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "But why, some say, the moon? Why choose this as our goal? And they may well ask why climb the highest mountain. Why, 35 years ago, fly the Atlantic? Why does Rice play Texas?\nWe choose to go to the moon. We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard, because that goal will serve to organize and measure the best of our energies and skills, because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one which we intend to win, and the others, too.",
        ja: "けれども、なぜ月なのか、と言う人がいます。なぜそれを目標に選ぶのか、と。それなら、なぜいちばん高い山に登るのかと問うのも、もっともでしょう。なぜ35年前に、大西洋を飛んでわたったのか。なぜライス大学はテキサス大学と試合をするのか。\nわたしたちは月へ行くことを選びます。この10年のうちに月へ行き、ほかのこともなしとげることを選びます。それがやさしいからではなく、むずかしいからです。その目標が、わたしたちの力と技のいちばんよいところをまとめ上げ、試すものになるからです。その挑戦こそ、わたしたちが進んで引き受け、先のばしにはしたくない、そして勝ちとるつもりの挑戦だからです。ほかの挑戦も同じです。",
        cite: "John F. Kennedy, Address at Rice University (1962)",
        source: "https://www.presidency.ucsb.edu/documents/address-rice-university-houston-the-nations-space-effort",
      }],
      photos: [
        {
          src: `${C}/kennedy-rice.webp`, width: 800, height: 1210,
          alt: "大統領の紋章のついた演台で片手を上げる男性と、後ろで拍手する人々。奥に大きなスタジアムの観客席が見える白黒写真",
          caption: "1962年9月12日、ライス大学のスタジアムで演説するケネディ大統領（NASA撮影）。この演説で、10年のうちに月へ行くという目標を語った。",
          credit: { author: "NASA", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Kennedy_at_Rice_University_-_GPN-2000-001618.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "助動詞を意味で分ける",
        root: {
          label: "助動詞",
          children: [
            { label: "義務", sub: "〜しなければ", tone: "red", children: [{ label: "must / have to" }] },
            { label: "助言", sub: "〜すべきだ", tone: "yellow", children: [{ label: "should" }] },
            { label: "許可・推量", sub: "〜してよい／かも", tone: "blue", children: [{ label: "may / can" }] },
          ],
        },
        note: "Shall I 〜? の答えは Yes, please. / No, thank you. が基本。",
      },
    },
  ],
  story: {
    kind: "novel",
    title: "恐れなくていいもの",
    paragraphs: [
      "1933年3月4日、土曜日の昼すぎ。オハイオ州の小さな町で、十三歳のルースは台所のラジオの前にいすを引きよせた。去年の秋、父さんの勤める工場が止まった。先週は町の銀行に人がつめかけ、扉に紙が一枚はられた。しばらくのあいだ、お金は引き出せません。ルースの貯金箱の硬貨が、今週の家族のパン代になっていた。",
      "となりには、おばあちゃんが座っていた。ナポリから海をわたってきて三十年になるが、英語はまだ少し苦手だ。「ルース、大統領さんの言うことを、あとで教えておくれ」。ルースはうなずいた。ラジオからは、遠いワシントンの群衆のざわめきが聞こえてくる。父さんは新聞をたたみ、弟のトミーまでだまりこんだ。",
      "やがて、ゆっくりとした、よく響く声が流れ出した。ルースは一語ものがすまいと耳をすませた。この国はきっと立ち直る、という言葉のあとに、その一文が来た。「{{the only thing we have to fear is fear itself}}」。台所が、しんと静かになった。父さんが、深く息をはくのがわかった。",
      "「なんて言ったんだい？」とおばあちゃんが小声で聞いた。「怖がっちゃいけない、って？」。ルースは首を横にふった。そうじゃない。大統領は、怖がってはいけない、とは言わなかった。have to、つまり「恐れなければならないもの」の話をしたのだ。「恐れなきゃいけないのは、恐れそのものだけ、って。だから、ほかのものは{{恐れなくていい}}んだよ、おばあちゃん」",
      "おばあちゃんは、しばらくその言葉を口の中でくり返していた。「怖がるなと言われたら、よけいに怖くなる。でも、怖がらなくていいと言われたら……」。そこで言葉を切って、エプロンのはしで目もとをおさえた。ラジオの声は続いていた。仕事のない人に仕事を、と語り、やがて「{{We must act and act quickly.}}」と言いきった。今度は must だった。父さんが、いすの上で背すじをのばした。",
      "演説が終わると、父さんは帽子をかぶった。「となり町の工事現場で、人を探しているらしい。月曜にもう一度行ってみる」。銀行の扉の紙は、まだはがれていない。パンの値段も変わらない。けれど、さっきまで台所にたまっていた重い空気が、少しだけ軽くなった気がした。",
      "その夜、ルースはノートに二つの文を書いた。must は、自分がやると決めること。have to の反対は、しなくていいこと。恐れなければならないのは、恐れだけ。ほかのものは、恐れなくていい。窓の外では、春の近い風が、まだ冷たい音を立てていた。",
    ],
    note: "ルースとその家族、会話や心情は創作です。1933年3月4日（土曜日）の就任演説、それがラジオで全国に放送されたこと、大恐慌と銀行への取りつけ騒ぎ、銀行の休業などは史実にもとづいています。作中の英文は演説の実際の言葉で、それ以外にルーズベルト大統領のせりふはつくっていません。",
  },
  mistakes: [
    { wrong: "He musts go home.", right: "He must go home.", why: "助動詞には -s をつけません。あとの動詞も原形です。" },
    { wrong: "You must not come tomorrow.", right: "You don't have to come tomorrow.", why: "「明日は来なくていい」と言いたいとき。must not は「来てはいけない」という禁止で、「必要はない」は don't have to です。" },
    { wrong: "She have to clean her room.", right: "She has to clean her room.", why: "have to は主語が3人称単数なら has to になります。" },
    { wrong: "I musted finish my homework yesterday.", right: "I had to finish my homework yesterday.", why: "must には過去形がないので、過去は had to で表します。" },
  ],
  check: [
    { q: "「あなたはここで泳いではいけません」を英語に。", a: "You must not swim here.", why: "禁止は must not ＋ 原形。" },
    { q: "He has to wash the dishes. を否定文にしましょう。", a: "He doesn't have to wash the dishes.", why: "has to の否定は doesn't have to（〜する必要はない）。" },
    { q: "You ___ go to bed early.（早く寝たほうがいい）の ___ に入る助動詞は？", a: "should", why: "「〜したほうがよい」というアドバイスは should。" },
  ],
  next: [
    { label: "4択ドリル「助動詞」に挑戦", href: "/learn/eibunpo-chu/j-en-2-jodoshi" },
    { label: "最初の助動詞「can」をふり返る", href: "/learn/eibunpo-chu/j-en-1-can" },
    { label: "つぎに「接続詞」", href: "/learn/eibunpo-chu/j-en-2-setsuzokushi" },
  ],
};
