import type { Lecture } from "../types";

const C = "/media/commons/j-en-1-tango";

export const J_EN_1_TANGO: Lecture = {
  unit: "j-en-1-tango",
  title: "英単語は「音・つづり・意味」をセットで、忘れかけたころにくり返す",
  hook: "文法がわかっても、単語を知らなければ英文は読めず、書けません。中学の3年間で習う英単語は{{1600〜1800語}}ほどあり（小学校の600〜700語に上乗せ）、一度に覚えきるのは無理です。だからこそ、むだなく覚えて忘れない「覚え方」を先に身につけましょう。",
  mystery: "Wednesday（水曜日）は「ウェンズデイ」と読むのに、なぜ発音しない d を書くのでしょう？　そして、書いたとおりに読めない英単語を、どうすれば忘れずに覚えられるのでしょう？",
  mission: {
    from: "英語ラジオ番組のDJ",
    request: "番組に、中学1年生のリスナーから「Wednesday はウェンズデイなのに、なぜ d を書くの？　読まない文字ばかりで、英単語がきらいになりそう」というお便りが届きました。来週の放送で、このなぞの答えと、忘れない覚え方をいっしょに伝えたいのです。名探偵のあなたに、発音しない d のなぞを解いてほしいのです。",
    thanks: "d は、むかしの音が残った「化石」だったのですね。来週の放送では、つづりのなぞといっしょに、音・つづり・意味をセットにして間をあけてくり返す覚え方を、リスナーに紹介します。",
  },
  sections: [
    {
      heading: "1語を「音・つづり・意味」の3点で覚える",
      body: "単語は、{{音}}（どう読むか）・{{つづり}}（どう書くか）・{{意味}}（何を表すか）の3つがそろって初めて使えます。見て意味がわかるだけでは、書く問題やリスニングで点になりません。発音を聞いて声に出し、つづりを書き、意味を言う、の3つを1セットにしましょう。",
      reading: [
        "英単語を1つ「知っている」とは、どういうことでしょう。たとえば Wednesday（水曜日）。意味が「水曜日」だとわかっても、「ウェンズデイ」と聞いて気づけなければリスニングで取れず、d を書き忘れれば英作文で×になります。単語には{{音}}・{{つづり}}・{{意味}}の3つの顔があり、3つがつながって初めて「使える」単語になります。日本語のかなは書いたとおりに読めばほぼ正しく発音できますが、英語はそうはいきません。knight（騎士）の k と gh、Wednesday の最初の d のように、書くのに読まない文字がたくさんあるからです。",
        "英語のつづりと意味を、はじめて大がかりに1冊にまとめた人がいます。18世紀ロンドンの文筆家{{サミュエル・ジョンソン}}です。1746年に本屋たちと契約し、3年で仕上げると約束したものの、実際には9年かけて、1755年に『英語辞典』を出しました。見出し語はおよそ4万2000。英語の辞書はそれまでにもありましたが、1つの語の意味をていねいにいくつにも分け、つづりの手本を示したこの辞書は、その後100年以上にわたって英語の「ものさし」として使われました。",
        "ジョンソンは辞書の序文で、ことばについてこう書いています。Language is only the instrument of science, and words are but the signs of ideas（ことばは学問の道具にすぎず、単語は考えの{{しるし}}にすぎない）。単語とは、頭の中の「考え」を、音や文字で表した記号だというのです。だから、しるし（音とつづり）と、それが指す考え（意味）をしっかり結びつけておかなければ、単語は使えません。そのうえでジョンソンは、この道具がもう少しくずれにくければいいのに、と書き添えました。ことばがたえず変わっていくことを、だれよりもよく知っていたからです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Language is only the instrument of science, and words are but the signs of ideas: I wish, however, that the instrument might be less apt to decay, and that signs might be permanent, like the things which they denote.",
        ja: "ことばは学問の道具にすぎず、単語は考えのしるしにすぎない。それでも私は願う。この道具がもう少しくずれにくいものであればと。そして、しるしが、それの指し示すものと同じように、いつまでも変わらないものであればと。",
        cite: "Samuel Johnson, Preface to A Dictionary of the English Language (1755)",
        source: "https://www.gutenberg.org/ebooks/5430",
      }],
      photos: [
        {
          src: `${C}/johnson.webp`, width: 800, height: 982,
          alt: "白いかつらに茶色の上着を着た年配の男性が、まゆをよせてこちらを見ている油絵",
          caption: "サミュエル・ジョンソン（1709〜84年）。画家レノルズがえがいた肖像。たった数人の助手と9年かけて、約4万2000語の{{英語辞典}}（1755年）を完成させた。",
          credit: { author: "Joshua Reynolds", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Samuel_Johnson_by_Joshua_Reynolds.jpg" },
        },
      ],
      figure: {
        type: "flow",
        title: "1語を覚える3ステップ",
        steps: [
          { label: "聞いて言う", sub: "音", tone: "blue" },
          { label: "書いてみる", sub: "つづり", tone: "yellow" },
          { label: "意味を言う", sub: "意味", tone: "red" },
        ],
      },
      cliff: "4万語の辞書を作った人も、覚えたことは忘れます。忘れないコツは何でしょう？",
    },
    {
      heading: "忘れかけたころにもう一度",
      body: "人は覚えたことを、{{次の日にはかなり忘れて}}しまいます。でも、忘れかけたところで思い出すと、前より長く覚えていられます。一度に長時間やるより、{{間をあけて何回もくり返す}}ほうが効果的です。答えを見る前に、まず自分で思い出そうとすることも大切です。",
      reading: [
        "1885年、ドイツの心理学者{{エビングハウス}}は、意味のない文字の組み合わせを自分で覚えては、時間をおいて覚え直す実験を何度もくり返しました。わかったのは、覚えたことは最初の1日ほどで大きく忘れ、そのあとはゆっくり忘れていくこと。そして、忘れかけたころに覚え直すと、1回目より短い時間で覚え直せることでした。この「忘れ方」をグラフにしたものは、今も{{忘却曲線}}とよばれています。",
        "ここから、単語の覚え方が見えてきます。1日に100語を1回だけ見るより、20語を、その日・次の日・3日後・1週間後と{{間をあけて}}くり返すほうが、ずっと長く残ります。もう1つのコツは、答えを見る前に自分で{{思い出す}}ことです。カードの日本語を見て、英語を声に出し、つづりを書いてから裏返す。思い出そうと頭を使った回数が、記憶を太くします。答えをながめるだけの復習は、わかった気になりやすいので注意しましょう。",
        "ジョンソンの辞書づくりも、小さな作業の積み重ねでした。ロンドンのガフ・スクエアにある家の屋根裏部屋で、助手たちが本から集めた用例を細長い紙きれに書き写し、ジョンソンはそれを見出し語ごとに並べて、意味を1つずつ分けていきました。一度に終わらせようとせず、毎日少しずつ重ねる。4万語の辞書も、中学の1600語も、作り方と覚え方の基本は同じです。",
      ],
      photos: [
        {
          src: `${C}/johnson-house.webp`, width: 640, height: 480,
          alt: "石だたみの広場に面した、白い窓わくのならぶ4階建てのれんが造りの家。入り口に黒いドア",
          caption: "ロンドンのガフ・スクエアに残るジョンソンの家。1748年からここに住み、屋根裏部屋で助手たちと辞書の{{用例}}を整理した。いまは記念館になっている。",
          credit: { author: "kim traynor", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Dr_Johnson%27s_House,_Gough_Square_-_geograph.org.uk_-_1713188.jpg" },
        },
      ],
      figure: {
        type: "cycle",
        title: "単語を定着させる輪",
        center: "間をあけてくり返す",
        steps: [
          { label: "覚える", sub: "カードで見る" },
          { label: "思い出す", sub: "答えを見ずに", tone: "yellow" },
          { label: "確かめる", sub: "○×をつける" },
          { label: "間をあける", sub: "1日後・数日後", tone: "blue" },
        ],
      },
      cliff: "ジョンソンは、意味を説明するのに11万もの「例文」を使いました。なぜでしょう？",
    },
    {
      heading: "単語は「なかま」と「例文」で覚える",
      body: "曜日・月・数・教科など、{{テーマごとにまとめる}}と思い出しやすくなります。また、play tennis、get up のように{{よくいっしょに使う語}}と組で覚えると、そのまま英作文に使えます。1語だけより短い例文で覚えるほうが、使い方まで身につきます。",
      reading: [
        "ジョンソンの辞書の扉には、単語の意味を EXAMPLES from the best WRITERS（すぐれた作家の用例）で示す、と大きく書かれています。実際、約11万5000もの用例が引かれ、なかでも{{シェイクスピア}}は、もっともよく引用された作家の一人でした。意味は、1語だけを見ても決まりません。どんな語といっしょに、どんな場面で使われるかを見て、はじめてはっきりします。だから単語は、play tennis や get up のような{{語の組}}や、短い{{例文}}で覚えるのが近道なのです。",
        "シェイクスピア（1564〜1616年）は、英語にたくさんの新しい語を持ちこんだ人だと言われます。記録に初めて出てくるのが彼の作品だとされる語は1700ほどとも言われ、lonely（ひとりぼっちの）、eyeball（目玉）、bedroom（寝室）などがよく例に挙げられます。もっとも、のちの研究で彼より前の使用例が見つかった語も少なくありません。それでも、彼の劇が人気を集め、くり返し上演され、印刷されたことで、多くの語や言い回しが英語に広まったのは確かです。",
        "語の組のおもしろさがよくわかるのが、シェイクスピアの劇で広まったとされる言い回しです。break the ice（氷を割る→場の緊張をほぐす）、a wild-goose chase（野ガモ追い→見こみのない追いかけっこ）。1語ずつ訳しても意味は出てきません。1604年ごろの悲劇『オセロー』では、悪だくみをする部下イアーゴーが、将軍オセローに{{嫉妬}}（jealousy）を「緑の目をした怪物」と言い表します。今も英語では green-eyed だけで「やきもちをやいた」を表すことがあります。jealousy をこの1行といっしょに覚えれば、もう忘れにくいはずです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "O, beware, my lord, of jealousy;\nIt is the green-ey'd monster which doth mock\nThe meat it feeds on.",
        ja: "ああ、将軍、嫉妬にはお気をつけください。\nそれは緑の目をした怪物で、\n自分がえさにする心を、あざ笑いながら食らうのです。",
        cite: "William Shakespeare, Othello, Act 3, Scene 3 (c. 1604)",
        source: "https://www.gutenberg.org/ebooks/1531",
      }],
      photos: [
        {
          src: `${C}/dictionary-title.webp`, width: 714, height: 1141,
          alt: "A DICTIONARY OF THE ENGLISH LANGUAGE と大きく印刷された、古い本の扉のページ",
          caption: "ジョンソン『英語辞典』の扉（第2版、1755年）。単語の意味を EXAMPLES from the best WRITERS、つまりすぐれた作家の{{例文}}で示すと書かれている。",
          credit: { author: "Samuel Johnson", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:JohnsonDictionary.png" },
        },
        {
          src: `${C}/first-folio.webp`, width: 800, height: 1274,
          alt: "SHAKESPEARES COMEDIES, HISTORIES, & TRAGEDIES の題と、ひだえりをつけた男性の銅版画の肖像がある本の扉",
          caption: "シェイクスピアの死後、1623年に仲間の役者たちが出した作品集（ファースト・フォリオ）の扉。劇が印刷されて読みつがれ、多くの語や{{言い回し}}が広まった。",
          credit: { author: "Martin Droeshout", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Title_page_William_Shakespeare%27s_First_Folio_1623.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "テーマでまとめる例",
        root: {
          label: "中1の単語",
          children: [
            { label: "曜日・月", sub: "大文字で書く", tone: "blue", children: [{ label: "Sunday" }, { label: "April" }] },
            { label: "数", sub: "-teen と -ty", tone: "yellow", children: [{ label: "thirteen" }, { label: "thirty" }] },
            { label: "動詞の組", sub: "語句で覚える", tone: "red", children: [{ label: "get up" }, { label: "play tennis" }] },
          ],
        },
      },
      cliff: "でも、例文で覚えても、音がそっくりな語には足をすくわれます。",
    },
    {
      heading: "つづりや音がにている語に注意",
      body: "英語には、{{音が同じでつづりと意味がちがう語}}や、つづりが1字ちがいの語がたくさんあります。こうした語は、2つを並べて{{ちがいを意識して}}覚えると、まちがえにくくなります。",
      reading: [
        "here（ここに）と hear（聞こえる）、write（書く）と right（右・正しい）、son（息子）と sun（太陽）。英語には、{{音が同じでつづりと意味がちがう語}}がたくさんあります。耳で聞いただけではどちらか決まらないので、聞くときは文の意味から判断し、書くときはつづりで区別します。fifteen（15）と fifty（50）のような{{にた音}}の組は、fifteen は後ろの -teen を強く長く、fifty は前の fif を強く言う、と音のちがいまで意識して覚えましょう。",
        "シェイクスピアは、この「同じ音」を笑いと切なさに使いました。『ロミオとジュリエット』1幕4場。仮面舞踏会へ向かう夜道で、恋に悩むロミオは、「踊れよ」とすすめる友人にこう答えます。you have dancing shoes / With nimble soles, I have a soul of lead（きみたちの靴は軽い底だが、ぼくのたましいは鉛だ）。sole（靴の底）と soul（たましい）は、どちらも「ソウル」という同じ音。耳で聞いた観客は2つの意味を同時に受け取ってにやりとし、同時にロミオの心の重さを感じたのです。",
        "では、なぜ英語は書いたとおりに読めないのでしょう。Wednesday は、古い英語で「ウォーデン（ゲルマン人の神）の日」という語で、むかしは d も発音していました。15世紀にイギリスでも印刷が始まると、つづりは本の中で少しずつ固まっていきます。ところが発音は変わり続けました。time も500〜600年前には「ティーム」に近い音でした。ジョンソンも辞書でつづりの手本を示しながら、序文に「音はうつろいやすく、規則でしばれない」と書いています。つづりは止まり、音は動く。そのずれが、読まない文字として残ったのです。",
      ],
      recite: [
        {
          lang: "en", voice: "male", accent: "gb",
          text: "Not I, believe me, you have dancing shoes,\nWith nimble soles, I have a soul of lead\nSo stakes me to the ground I cannot move.",
          ja: "ぼくはいいよ、ほんとうに。きみたちには踊りの靴がある。\n身軽な靴底のね。ぼくのは鉛のたましいで、\n地面にくいでとめられたように、動けないんだ。",
          cite: "William Shakespeare, Romeo and Juliet, Act 1, Scene 4 (c. 1595)",
          source: "https://www.gutenberg.org/ebooks/1513",
        },
        {
          lang: "en", voice: "male", accent: "gb",
          text: "… sounds are too volatile and subtile for legal restraints; to enchain syllables, and to lash the wind, are equally the undertakings of pride, unwilling to measure its desires by its strength.",
          ja: "……音は、あまりにうつろいやすく、つかみどころがないので、規則でしばることはできない。音節をくさりでつなぐことも、風をむちで打つことも、どちらも自分の力をわきまえない、おごりのしわざである。",
          cite: "Samuel Johnson, Preface to A Dictionary of the English Language (1755)",
          source: "https://www.gutenberg.org/ebooks/5430",
        },
      ],
      reveal: "Wednesday の d は、「ウォーデンの日」と発音していたころの{{音の化石}}です。印刷とジョンソンの辞書でつづりが固まったあとも音は変わり続けたので、英語では{{つづり}}と{{音}}がずれています。だから単語は、音・つづり・意味を別々に確かめてセットにし、Wed-nes-day のように区切りや由来といっしょに、{{間をあけてくり返す}}と忘れにくくなるのです。",
      figure: {
        type: "compare",
        title: "まちがえやすい組",
        columns: [{ title: "語 1" }, { title: "語 2", tone: "yellow" }],
        rows: [
          { label: "同じ音", cells: ["here（ここに）", "hear（聞こえる）"] },
          { label: "同じ音", cells: ["write（書く）", "right（右・正しい）"] },
          { label: "にた音", cells: ["fifteen（15）", "fifty（50）"] },
          { label: "1字ちがい", cells: ["three（3）", "tree（木）"] },
        ],
      },
    },
  ],
  story: {
    kind: "manzai",
    title: "水曜日の化石",
    cast: ["ケンタ", "リコ"],
    lines: [
      { who: "ケンタ", text: "どうもー、ケンタとリコです！　ぼく、英単語を一晩で1000個覚えてきました！" },
      { who: "リコ", text: "すごいね。じゃあ「水曜日」は？" },
      { who: "ケンタ", text: "ウェンズデイ！　つづりは W-E-N-S-D-A-Y！", say: "ウェンズデイ！ つづりは、ダブリュー、イー、エヌ、エス、ディー、エー、ワイ！" },
      { who: "リコ", text: "ちがう！　Wednesday。d は書くけど読まないの。{{音}}と{{つづり}}は別々に確かめなきゃ。", say: "ちがう！ ウェンズデイ。ディーは書くけど読まないの。音とつづりは別々に確かめなきゃ。" },
      { who: "ケンタ", text: "読まないなら書かなくてよくない？　文字のむだづかいだよ。" },
      { who: "リコ", text: "むかしは「ウォーデンの日」で、d も読んでたの。つづりが固まったあとで音が変わったから、{{音の化石}}みたいに残ってるんだよ。", say: "むかしはウォーデンの日で、ディーも読んでたの。つづりが固まったあとで音が変わったから、音の化石みたいに残ってるんだよ。" },
      { who: "ケンタ", text: "化石かあ。じゃあ一晩で覚えた1000個も、今日もう半分くらい化石になってる。" },
      { who: "リコ", text: "それは化石じゃなくて、忘れただけ！　人は次の日にかなり忘れるの。だから{{間をあけてくり返す}}。" },
      { who: "ケンタ", text: "間をあけて……じゃあ、次は来年やるね。" },
      { who: "リコ", text: "あけすぎ！　次の日、3日後、1週間後。忘れかけたころに、答えを見ずに思い出すのがコツ。" },
      { who: "ケンタ", text: "例文も覚えたよ。It is the green-eyed monster. 目が緑の怪獣が出る映画！", say: "例文も覚えたよ。イット・イズ・ザ・グリーンアイド・モンスター。目が緑の怪獣が出る映画！" },
      { who: "リコ", text: "怪獣映画じゃない！　シェイクスピアの『オセロー』で、{{嫉妬}}のこと。やきもちは心を食い荒らす怪物だっていう、たとえだよ。" },
      { who: "ケンタ", text: "シェイクスピアって lonely も作ったんでしょ？　じゃあ、その前の人はさびしくなかったんだ。", say: "シェイクスピアって、ロンリーも作ったんでしょ？ じゃあ、その前の人はさびしくなかったんだ。" },
      { who: "リコ", text: "さびしさはあったよ！　lonely が記録に初めて出てくるのが彼の作品だ、と言われてるだけ。", say: "さびしさはあったよ！ ロンリーが記録に初めて出てくるのが彼の作品だ、と言われてるだけ。" },
      { who: "ケンタ", text: "break the ice も覚えた。冬に池の氷を割るアルバイト。", say: "ブレイク・ジ・アイスも覚えた。冬に池の氷を割るアルバイト。" },
      { who: "リコ", text: "「場の緊張をほぐす」！　1語ずつ訳しちゃだめ。{{語の組}}のまま、例文で覚えるの。" },
      { who: "ケンタ", text: "じゃあ「ここに」は hear。音楽が hear にある。", say: "じゃあ、ここに、はヒア。音楽がヒアにある。" },
      { who: "リコ", text: "それは「聞こえる」！　「ここに」は here。{{音が同じでつづりと意味がちがう語}}は、並べてちがいを意識して覚える。", say: "それは、聞こえる！ ここに、のほうは、エイチ、イー、アール、イーのヒア。音が同じでつづりと意味がちがう語は、並べてちがいを意識して覚える。" },
      { who: "ケンタ", text: "ロミオも言ってたよね。「ぼくのたましいは靴の底」。" },
      { who: "リコ", text: "まぜないで！　sole（靴底）と soul（たましい）が同じ音なのを使った、シェイクスピアのしゃれ。", say: "まぜないで！ 靴底のソウルと、たましいのソウルが同じ音なのを使った、シェイクスピアのしゃれ。" },
      { who: "ケンタ", text: "よし、今日のことは間をあけてくり返します。次は来年の Wednesday！", say: "よし、今日のことは間をあけてくり返します。次は来年のウェンズデイ！" },
      { who: "リコ", text: "だから、あけすぎだって！　もういいよ。" },
      { who: "ケンタ", text: "どうも、ありがとうございました！" },
    ],
    note: "ケンタとリコは架空の人物で、会話はすべて創作です。Wednesday の由来、ジョンソンの『英語辞典』（1755年）、『オセロー』『ロミオとジュリエット』の英文は事実にもとづいています。シェイクスピアが作ったとされる語には、のちにもっと前の使用例が見つかったものもあります。",
  },
  mistakes: [
    { wrong: "monday / april と小文字で書く", right: "Monday / April", why: "曜日と月の名前は、文の途中でもいつも大文字で始めます。" },
    { wrong: "英語→日本語だけを練習する", right: "日本語→英語でつづりも書く", why: "意味がわかるだけでは、英作文や書きとりで使えません。" },
    { wrong: "1日に100語を1回だけ見る", right: "少しずつ、間をあけて何回も", why: "1回だけでは次の日にかなり忘れます。くり返す回数が定着を決めます。" },
  ],
  check: [
    { q: "「水曜日」を英語で書くと？", a: "Wednesday", why: "d を書き忘れやすい。大文字の W で始める。" },
    { q: "「音楽が聞こえますか」の「聞こえる」は here と hear のどっち？", a: "hear", why: "here は「ここに」。Can you hear the music?" },
    { q: "fifteen と fifty、「50」はどちら？", a: "fifty", why: "-ty は10の倍数（20, 30 …）、-teen は13〜19。" },
  ],
  next: [
    { label: "中学英単語1200で覚える", href: "/learn/chu-tango" },
    { label: "数字や曜日を聞き取る「リスニング」", href: "/learn/lecture/j-en-1-listening" },
    { label: "覚えた単語で「英作文」", href: "/learn/eigo-chu/j-en-1-eisakubun" },
  ],
};
