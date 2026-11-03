import type { Lecture } from "../types";

const C = "/media/commons/e-english-56-kyoka";

export const E_ENGLISH_56_KYOKA: Lecture = {
  unit: "e-english-56-kyoka",
  nameRuby: "曜日と教科・時間割《じかんわり》",
  title: "時間割《じかんわり》は「I have ＋教科＋on ＋曜日.」で伝える",
  hook: "「月曜日は算数と体育があるよ」と、毎日の時間割《じかんわり》の話はよくしますね。英語では、曜日・教科の言葉と、I have 〜. の形を組み合わせると時間割《じかんわり》を伝えられます。曜日の前の on、時刻《じこく》の前の at という小さな言葉も、ここでいっしょに覚えましょう。",
  mystery: "「算数の授業がある」は、英語で I have math. と言います。でも、have は「持っている」という意味のはず。算数の授業は、手に持つことも、かばんに入れることもできません。それなのに、なぜ have を使うのでしょう？",
  mission: {
    from: "放課後の学童クラブの先生",
    request: "わたしの学童クラブに、オーストラリアから来た女の子が入りました。毎日「明日は何の授業？」と英語で聞いてくれるので、英語の時間割《じかんわり》表をかべにはろうと思います。ところが、ある子に「have は『持っている』でしょ？　授業は持てないのに、なぜ I have math. なの？」と聞かれて、答えにつまってしまいました。名探偵《めいたんてい》のあなたに、have のなぞを解いてほしいのです。",
    thanks: "have は「自分のところにある」ことを表すから、一週間の中にある授業にも使えるのですね。時間割《じかんわり》表のすみに「I have a sister. も I have math. も同じ have」と書いたら、子どもたちが自分の時間割《じかんわり》を英語で言い合うようになりました。",
  },
  sections: [
    {
      heading: "曜日は7つとも day で終わる",
      body: "曜日の言葉は、{{どれも day で終わり}}、{{大文字で始めます}}。Tuesday（火曜日）と Thursday（木曜日）は、始まりがにているのでまちがえやすい組です。Tu は火曜日、Th は木曜日と覚えましょう。今日の曜日は What day is it today? と聞き、It's Friday. のように答えます。",
      figure: {
        type: "compare",
        title: "曜日の言い方",
        columns: [{ title: "英語", tone: "yellow" }, { title: "短い書き方", tone: "plain" }],
        rows: [
          { label: "日曜日", cells: ["Sunday", "Sun."] },
          { label: "月曜日", cells: ["Monday", "Mon."] },
          { label: "火曜日", cells: ["Tuesday", "Tue."] },
          { label: "水曜日", cells: ["Wednesday", "Wed."] },
          { label: "木曜日", cells: ["Thursday", "Thu."] },
          { label: "金曜日", cells: ["Friday", "Fri."] },
          { label: "土曜日", cells: ["Saturday", "Sat."] },
        ],
        note: "Wednesday の d は読まないが、書くときはわすれずに。",
      },
      reading: [
        "時間割《じかんわり》の話をするには、まず曜日の言葉が必要です。英語の曜日は Sunday から Saturday まで7つあり、{{どれも day で終わります}}。day は「日」という意味なので、日本語の「月曜日」「火曜日」の「日」と同じ役わりです。曜日は名前なので、文のとちゅうでも{{大文字で始めます}}。",
        "まちがえやすいのは、Tuesday（火曜日）と Thursday（木曜日）です。どちらも T で始まり、長さもにています。見分けるコツは2文字め。{{Tu は火曜日}}、{{Th は木曜日}}です。Thursday の th は日本語にない音なので、音声をよく聞いてまねしましょう。もう一つ、Wednesday（水曜日）は、まん中の d を読みません。読まない文字ほど書くときにわすれやすいので、つづりは目でも覚えます。",
        "外国のカレンダーや時間割《じかんわり》では、Mon. や Fri. のような{{短い書き方}}もよく見かけます。多くは、はじめの3文字にピリオドをつけた形です。今日の曜日を聞くときは What day is it today?（今日は何曜日？）。答えは It's Friday. のように、It's のあとに曜日を言います。",
      ],
      cliff: "曜日はそろいました。次は教科。でも、大文字で始まる教科が2つだけあるのは、なぜでしょう？",
    },
    {
      heading: "教科の言葉：大文字で始めるのは2つだけ",
      body: "教科の言葉は、算数 {{math}}、理科 {{science}}、社会 {{social studies}}、体育 {{P.E.}} などです。このうち国語の {{Japanese}} と英語の {{English}} は、「日本語」「英語」という{{ことばの名前なので大文字}}で始めます。ほかの教科は小文字で書きます。好きな教科は What subject do you like? と聞きます。",
      figure: {
        type: "tree",
        title: "教科の書き始め",
        root: {
          label: "教科",
          children: [
            {
              label: "大文字で始める",
              sub: "ことばの名前",
              tone: "yellow",
              children: [{ label: "Japanese", sub: "国語" }, { label: "English", sub: "英語" }],
            },
            {
              label: "小文字で始める",
              sub: "ほかの教科",
              tone: "blue",
              children: [
                { label: "math", sub: "算数" },
                { label: "science", sub: "理科" },
                { label: "music", sub: "音楽" },
                { label: "P.E.", sub: "体育（短い形）" },
              ],
            },
          ],
        },
        note: "社会 social studies、図工 arts and crafts、家庭科 home economics も小文字。",
      },
      reading: [
        "教科の言葉を見てみましょう。算数は {{math}}、理科は {{science}}、社会は {{social studies}}、音楽は music、図工は arts and crafts、家庭科は home economics です。体育の {{P.E.}} は、physical education の頭文字をとった短い形です。physical は「体の」、education は「教育」。つまり「体の教育」で、漢字の「体育」とほとんど同じつくりです。",
        "書くときに気をつけたいのが、大文字と小文字です。国語の {{Japanese}} と英語の {{English}} だけは、大文字で始めます。この2つは「日本語」「英語」という、{{ことばの名前}}だからです。国の名前の Japan が大文字で始まるのと同じなかまです。いっぽう、math や music は「数の勉強」「音を楽しむこと」を表すふつうの言葉なので、小文字で書きます。",
        "教科の名前は、時代とともに変わってきました。100年以上前のイギリスでは、算数を arithmetic（計算）、音楽を singing（歌）とよぶ学校もありました。下の写真は、そのころの教室を博物館に再現したものです。かべには、かけ算の表がはってあります。",
      ],
      photos: [
        {
          src: `${C}/lincoln.webp`, width: 800, height: 600,
          alt: "木のつくえが何列もならび、黒板とつくえ、かべにかけ算の表がはってある古い教室",
          caption: "イギリスの博物館に再現された、100年以上前の教室。黒板の右のかべには、かけ算の表が2まいはってあります。",
          credit: { author: "Rept0n1x", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Museum_of_Lincolnshire_Life,_Lincoln,_England_-_DSCF1650.JPG" },
        },
      ],
      cliff: "曜日と教科の言葉がそろいました。いよいよ文にします。でも、授業は手に持てないのに……？",
    },
    {
      heading: "時間割《じかんわり》は I have 〜 on 〜.",
      body: "「〜の授業があります」は {{I have ＋教科.}} で言います。曜日をつけるときは、曜日の前に {{on}} をおきます。たずねるときは What do you have on Monday? と聞き、I have math and music. のように答えます。2つ以上の教科は and でつなぎます。",
      figure: {
        type: "formula",
        title: "時間割《じかんわり》の文を組み立てる",
        prose: true,
        steps: [
          { expr: "I have {{science}}.", note: "理科の授業がある" },
          { expr: "I have science {{and P.E.}}", note: "and で教科をふやす" },
          { expr: "I have science and P.E. {{on Wednesday}}.", note: "曜日の前は on" },
          { expr: "What do you have {{on Wednesday}}?", note: "たずねる文" },
        ],
      },
      reading: [
        "「理科の授業があります」は、{{I have science.}} と言います。2つなら I have science and P.E.、3つなら I have math, science and music. のように、最後の教科の前に and を入れます。曜日をつけるときは、曜日の前に {{on}} をおいて、I have science and P.E. on Wednesday. とします。友だちに聞くときは What do you have on Wednesday?（水曜日は何がある？）です。",
        "have は、はじめに「持っている」と習うことが多い言葉です。でも本当は、もっと広く「{{自分のところにある}}」ことを表します。I have a sister. は「姉か妹がいる」、I have a cold. は「かぜをひいている」、I have time. は「時間がある」。お姉さんも、かぜも、時間も、手には持てませんね。それでも自分のところにあるので have を使います。",
        "下の写真は、今から140年ほど前の1881年に、イギリスの女子の学校が出した報告の本にのっている時間割《じかんわり》です。MONDAY から FRIDAY まで、曜日ごとに教科がならんでいます。算数は Arithmetic、歌は Singing。午後の2時半からは、ほとんどの日が Homework（宿題）の時間です。金曜日の朝には Needlework（さいほう）があります。この学校の子なら、On Friday, I have needlework. と言えたはずです。",
      ],
      photos: [
        {
          src: `${C}/mhsg.webp`, width: 500, height: 747,
          alt: "MONDAY から FRIDAY までの見出しの下に、時こくと教科名が英語で3列ならんだ古い印刷物",
          caption: "1881年、イギリスのマンチェスターの女子の学校の時間割《じかんわり》。曜日ごとに、9時からの教科が書かれています。土曜日の欄《らん》はありません。",
          credit: { author: "作者不明（Manchester High School for Girls の学校報告）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:MHSG_Timetable_1880s.jpg" },
        },
      ],
      reveal: "have は「手に持っている」だけでなく、「{{自分のところにある}}」ことを広く表す言葉です。I have a sister.（姉か妹がいる）や I have time.（時間がある）と同じように、算数の授業も、自分の一週間の中にちゃんと「ある」予定です。だから、授業は手に持てなくても {{I have math.}} と言えるのです。",
      cliff: "時間割《じかんわり》の文に出てきた on。曜日には on なのに、時刻《じこく》には別の言葉を使います。",
    },
    {
      heading: "曜日の前は on、時刻《じこく》の前は at",
      body: "「〜曜日に」は {{on}}、「〜時に」は {{at}} を使います。I get up at seven. は「7時に起きる」、I have P.E. on Friday. は「金曜日に体育がある」です。時刻《じこく》は What time is it? と聞き、It's eight thirty. のように答えます。",
      figure: {
        type: "compare",
        title: "on と at の使い分け",
        columns: [{ title: "on", tone: "blue" }, { title: "at", tone: "red" }],
        rows: [
          { label: "前におく言葉", cells: ["曜日", "時刻《じこく》"] },
          { label: "例", cells: ["on Monday", "at 8:30"] },
          { label: "文の例", cells: ["I swim on Sunday.", "I get up at 6:30."] },
        ],
      },
      reading: [
        "日本語では「月曜日に」も「7時に」も同じ「に」ですが、英語では言葉を使い分けます。曜日の前は {{on}}、時刻《じこく》の前は {{at}} です。on はもともと「〜の上に」という意味です。カレンダーの月曜日のマスの上に、予定が乗っているところを思いうかべると覚えやすいでしょう。at は「その一点で」という感じで、時計の針《はり》がぴたりと指す時刻《じこく》に使います。",
        "on ＋曜日を楽しく覚えられる歌が、イギリスに古くから伝わるマザーグースの「Solomon Grundy」です。ソロモン・グランディという人の一生を、月曜日から日曜日までの、たった7日間で歌ってしまう、とぼけた歌です。月曜日に生まれ、火曜日に名前をつけてもらい（christened は、キリスト教の教会で名前をもらう式のこと）、水曜日には結婚《けっこん》……。ありえないほど急ぎ足なので、聞いた人はくすっと笑ってしまいます。",
        "歌をよく見ると、ほとんどの行が「〇〇 on ＋曜日」の形です。しかも曜日が Monday から Sunday まで順番に出てくるので、曜日の順番と on の使い方が、いっしょに覚えられます。声に出して、リズムに乗って読んでみましょう。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Solomon Grundy,\nBorn on a Monday,\nChristened on Tuesday,\nMarried on Wednesday,\nTook ill on Thursday,\nWorse on Friday,\nDied on Saturday,\nBuried on Sunday.\nThis is the end\nOf Solomon Grundy.",
        ja: "ソロモン・グランディ\n月曜日に生まれて\n火曜日に名前をもらい\n水曜日に結婚《けっこん》して\n木曜日に病気になり\n金曜日にもっと悪くなり\n土曜日に死んで\n日曜日にうめられた\nこれでおしまい\nソロモン・グランディのお話",
        cite: "Mother Goose, \"Solomon Grundy\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/grundy.webp`, width: 484, height: 504,
          alt: "小鳥がとまった石に、HERE LIES YE BODYE of Solomon Grundy DIED ON SATURDAY と手書きの文字がある白黒のさし絵",
          caption: "昔の子ども向けの本『A Book of Nursery Rhymes』にある「Solomon Grundy」のさし絵。石に DIED ON SATURDAY と、{{on ＋曜日}}が書かれています。",
          credit: { author: "Clara E. Atwood", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:BookOfNurseryRhymes_p89.jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "manzai",
    title: "算数を持っています",
    cast: ["ゲンキ", "ツムギ"],
    lines: [
      { who: "ゲンキ", text: "どうもー、ゲンキです！　英語で時間割《じかんわり》が言えるようになりました！" },
      { who: "ツムギ", text: "ツムギです。じゃあ聞くね。What do you have on Monday?", say: "ツムギです。じゃあ聞くね。ワット・ドゥ・ユー・ハヴ・オン・マンデー？" },
      { who: "ゲンキ", text: "I have math! ほら、かばんにちゃんと入ってるよ。算数の教科書とノート。", say: "アイ・ハヴ・マス！ ほら、かばんにちゃんと入ってるよ。算数の教科書とノート。" },
      { who: "ツムギ", text: "持ち物チェックじゃないの！　この {{have}} は「算数の授業がある」っていう意味。", say: "持ち物チェックじゃないの！ このハヴは、算数の授業がある、っていう意味。" },
      { who: "ゲンキ", text: "えっ、have って「持っている」でしょ？　授業は手に持てないよ？", say: "えっ、ハヴって、持っている、でしょ？ 授業は手に持てないよ？" },
      { who: "ツムギ", text: "have は「{{自分のところにある}}」こと全部に使えるの。I have a sister. は「お姉さんか妹がいる」。お姉さんも、かばんに入れる？", say: "ハヴは、自分のところにある、こと全部に使えるの。アイ・ハヴ・ア・シスターは、お姉さんか妹がいる。お姉さんも、かばんに入れる？" },
      { who: "ゲンキ", text: "入らない入らない！　じゃあ、算数の授業も「ぼくの月曜日にある」から have なんだ。", say: "入らない入らない！ じゃあ、算数の授業も、ぼくの月曜日にある、からハヴなんだ。" },
      { who: "ツムギ", text: "そういうこと。じゃあ次は、曜日をつけて言ってみて。" },
      { who: "ゲンキ", text: "I have P.E. Friday!", say: "アイ・ハヴ・ピーイー・フライデー！" },
      { who: "ツムギ", text: "「体育、金曜日！」って、メモか！　曜日の前には {{on}}。I have P.E. on Friday.", say: "体育、金曜日！って、メモか！ 曜日の前にはオン。アイ・ハヴ・ピーイー・オン・フライデー。" },
      { who: "ゲンキ", text: "on って「〜の上に」でしょ？　金曜日の上に乗って体育するの？", say: "オンって、〜の上に、でしょ？ 金曜日の上に乗って体育するの？" },
      { who: "ツムギ", text: "乗らない！　カレンダーの金曜日のマスに、体育の予定が乗っているって考えるの。時刻《じこく》なら {{at}} だよ。", say: "乗らない！ カレンダーの金曜日のマスに、体育の予定が乗っているって考えるの。じこくならアットだよ。" },
      { who: "ゲンキ", text: "よし、ぼくの夢の時間割《じかんわり》を発表します。I have P.E. on Monday. I have P.E. on Tuesday. I have P.E. on Wednesday……", say: "よし、ぼくの夢のじかんわりを発表します。アイ・ハヴ・ピーイー・オン・マンデー。アイ・ハヴ・ピーイー・オン・チューズデー。アイ・ハヴ・ピーイー・オン・ウェンズデー……" },
      { who: "ツムギ", text: "毎日体育！？　じゃあ、算数はいつやるの？" },
      { who: "ゲンキ", text: "体育のあとのおやつの時間に、クッキーの数をかぞえます。" },
      { who: "ツムギ", text: "それは算数じゃなくて、おやつ！　{{math}} もちゃんと時間割《じかんわり》に入れて。", say: "それは算数じゃなくて、おやつ！ マスもちゃんとじかんわりに入れて。" },
      { who: "ゲンキ", text: "じゃあ、I have math and P.E. on Monday. それから、on Sunday も P.E.!", say: "じゃあ、アイ・ハヴ・マス・アンド・ピーイー・オン・マンデー。それから、オン・サンデーも、ピーイー！" },
      { who: "ツムギ", text: "日曜日は学校がお休み！　毎日体育じゃ、体がもたないよ。もういいよ。" },
      { who: "ゲンキ", text: "どうも、ありがとうございました！" },
    ],
    note: "ゲンキとツムギは作り話の人で、会話も作り話です。have が「自分のところにある」ことを広く表すこと、曜日の前に on、時刻《じこく》の前に at を使うことは、英語のきまりです。",
  },
  mistakes: [
    { wrong: "I have math in Monday.", right: "I have math on Monday.", why: "曜日の前には on を使います。" },
    { wrong: "木曜日を Tuesday と書く。", right: "木曜日は Thursday、火曜日は Tuesday。", why: "Tu で始まるのが火曜日、Th で始まるのが木曜日です。" },
    { wrong: "I like japanese.", right: "I like Japanese.", why: "Japanese（国語・日本語）は、ことばの名前なので大文字で始めます。" },
  ],
  check: [
    { q: "水曜日を英語で書きましょう。", a: "Wednesday", why: "d をわすれやすいので、つづりを確かめる。" },
    { q: "I have P.E. ___ Friday. の ___ に入る言葉は？", a: "on", why: "曜日の前は on。" },
    { q: "「何の教科が好きですか」を英語で言いましょう。", a: "What subject do you like?", why: "subject は「教科」。" },
  ],
  next: [
    { label: "ポイントと練習問題「曜日と教科・時間割《じかんわり》」", href: "/learn/eigo-sho/e-english-56-kyoka" },
    { label: "小3・4「曜日と天気」", href: "/learn/eigo-sho/e-english-34-youbi-tenki" },
    { label: "つぎの単元「できること（can）」", href: "/learn/eigo-sho/e-english-56-can" },
  ],
};
