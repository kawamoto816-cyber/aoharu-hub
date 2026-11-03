import type { Lecture } from "../types";

const C = "/media/commons/e-english-56-jikoshokai";

export const E_ENGLISH_56_JIKOSHOKAI: Lecture = {
  unit: "e-english-56-jikoshokai",
  nameRuby: "自己紹介《じこしょうかい》",
  title: "名前・出身・好きなものを、決まった形で伝える",
  hook: "新しいクラスや、外国から来た先生と会ったとき、最初にするのが自己紹介《じこしょうかい》です。英語の自己紹介《じこしょうかい》は、名前・出身・好きなものを決まった形に入れるだけで組み立てられます。相手のことをたずねる言い方もいっしょに身につけると、会話が続きます。",
  mystery: "I'm Kenta. は「わたしはケンタです」。では I'm from Nagoya. は「わたしは名古屋から……」、いま名古屋から来たところ、という意味でしょうか？　小さな from が、どうして「ふるさと」を表せるのでしょう？",
  mission: {
    from: "町を走るバスの運転手さん",
    request: "わたしのバスには、外国から来たお客さんもよく乗ります。そこで、運転席のよこに英語の自己紹介《じこしょうかい》カードをはろうと思いました。ところが I'm from と書きかけたら、孫に「おじいちゃんは毎朝、車庫から来るんだから、I'm from the garage. だね」と言われて、何を書けばよいのか分からなくなってしまったのです。名探偵《めいたんてい》のあなたに、from のなぞを解いてほしいのです。",
    thanks: "from は出発点を表す言葉で、I'm from 〜. は出身を言う文なのですね。車庫ではなく生まれた町の名前を書いて、Hello. I'm Ken. I'm from Akita. I like buses. とはりました。外国のお客さんが Nice to meet you! と声をかけてくれるようになりましたよ。",
  },
  sections: [
    {
      heading: "自己紹介《じこしょうかい》の流れ",
      body: "まず {{Hello.}} とあいさつし、名前を言います。名前は {{I'm 〜.}} か {{My name is 〜.}} で伝えます。続けて、出身の {{I'm from 〜.}}、好きなものの {{I like 〜.}} を言い、最後に {{Nice to meet you.}}（はじめまして、よろしく）でしめくくります。",
      figure: {
        type: "flow",
        dir: "col",
        title: "自己紹介《じこしょうかい》の組み立て",
        steps: [
          { label: "Hello.", sub: "あいさつ", tone: "plain" },
          { label: "I'm Haruto.", sub: "名前", tone: "navy" },
          { label: "I'm from Nagoya.", sub: "出身", tone: "blue" },
          { label: "I like tennis.", sub: "好きなもの", tone: "yellow" },
          { label: "Nice to meet you.", sub: "しめくくり", tone: "red" },
        ],
        note: "相手が Nice to meet you. と言ったら、Nice to meet you, too. と返します。",
      },
      reading: [
        "英語の自己紹介《じこしょうかい》は、5つの部品を順番にならべて作ります。Hello. であいさつをして、I'm 〜. で名前、I'm from 〜. で出身、I like 〜. で好きなものを言い、Nice to meet you. でしめくくります。この順番には理由があります。初めて会った相手がまず知りたいのは「あなたはだれ？」ということです。名前が分かってはじめて、相手はあなたをよぶことができ、そのあとの話も頭に入りやすくなります。だから、{{名前はいちばん先}}なのです。",
        "Nice to meet you. をそのまま訳すと「あなたに会えてうれしい」。日本語の「はじめまして。よろしくお願いします」にあたる言葉で、初めて会った人に使います。言われた人は、{{too}}（〜も）をつけて Nice to meet you, too. と返します。「わたしも、会えてうれしいです」という意味です。この返事で、二人のあいさつがひとまとまりになります。",
      ],
      cliff: "名前・出身・好きなもの。そこに入れる言葉は、どうやって自分のものに取りかえるのでしょう？",
    },
    {
      heading: "形はそのまま、中身を入れかえる",
      body: "自己紹介《じこしょうかい》の文は、{{形はそのまま}}で、自分のことに入れかえるだけで作れます。I like のあとには、スポーツ・食べ物・動物など好きなものを入れます。{{very much}} をつけると「とても好き」になります。",
      figure: {
        type: "formula",
        title: "好きなものの文を作りかえる",
        prose: true,
        steps: [
          { expr: "I like {{tennis}}.", note: "スポーツ" },
          { expr: "I like {{curry}}.", note: "食べ物" },
          { expr: "I like {{cats}}.", note: "動物（ふつう s をつける）" },
          { expr: "I like cats {{very much}}.", note: "とても好き" },
        ],
      },
      reading: [
        "自己紹介《じこしょうかい》の文は、型ぬきのクッキーに似ています。型（I like 〜.）はそのままで、中に入れる生地（tennis・curry・cats）だけを取りかえれば、何まいでも新しい文が焼き上がります。英語を習いはじめたばかりでも外国の人と自己紹介《じこしょうかい》ができるのは、この{{型が決まっている}}からです。好きなものの単語を一つ知っていれば、それだけで一つの文ができます。",
        "入れる言葉には、小さなきまりがあります。動物や果物のように1ぴき、2こと数えられるものは、I like cats. / I like apples. のように、ふつう s をつけて「その仲間みんなが好き」という意味にします。curry や soccer、music のように数えないものには s をつけません。そして最後に very much をつけると「とても好き」になります。",
        "好きなものは人それぞれです。下の歌は、イギリスに古くから伝わるマザーグースの「Jack Sprat」です。ジャック・スプラットさんは肉のあぶら身（fat）が食べられず、おくさんは赤身（lean）が食べられません。好みは正反対。でも、だからこそ二人で食べると、大皿《おおざら》はなめたようにぴかぴかになります。好き・きらいを伝え合うことは、相手を知り、自分を知ってもらう第一歩なのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Jack Sprat\nCould eat no fat,\nHis wife could eat no lean;\nAnd so,\nBetwixt them both,\nThey licked the platter clean.",
        ja: "ジャック・スプラットは\nあぶら身が食べられない\nおくさんは 赤身が食べられない\nだから\nふたりそろえば\n大皿《おおざら》は ぴかぴか",
        cite: "Mother Goose, \"Jack Sprat\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/sprat-rogers.webp`, width: 800, height: 585,
          alt: "テーブルで、赤い服の女の人と、やせた男の人が向かい合って食事をし、右から給仕の人が水差しを運んでくる絵。右下に英語の歌が書かれている",
          caption: "150年ほど前の絵本にえがかれた「Jack Sprat」。おくさんは赤身をよけ、ジャックはあぶら身をよけて食べています。右下に歌が書かれています。",
          credit: { author: "James Edward Rogers", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:J._E._Rogers,_Jack_Sprat_could_eat_no_fat.jpeg" },
        },
      ],
      cliff: "自分のことを言えたら、次は相手のこと。どうたずねれば、会話のボールが返ってくるでしょう？",
    },
    {
      heading: "相手のことをたずねる",
      body: "相手の名前は {{What's your name?}}、出身は {{Where are you from?}} とたずねます。好きかどうかは {{Do you like 〜?}} と聞き、{{Yes, I do.}} か {{No, I don't.}} で答えます。たずねる文とその答えを、組にしておぼえましょう。",
      figure: {
        type: "compare",
        title: "たずねる文と答え方",
        columns: [{ title: "たずねる文", tone: "navy" }, { title: "答え方", tone: "yellow" }],
        rows: [
          { label: "名前", cells: ["What's your name?", "I'm Emma."] },
          { label: "出身", cells: ["Where are you from?", "I'm from Osaka."] },
          { label: "好きか", cells: ["Do you like music?", "Yes, I do."] },
        ],
      },
      reading: [
        "会話はキャッチボールです。自分のことを言ったら、相手にもボールを投げましょう。名前は What's your name?、出身は Where are you from?、好きかどうかは Do you like 〜? でたずねます。Do you like 〜? には Yes, I do. か No, I don't. で答えます。Yes, I like. とだけ言うと、何が好きなのかが文から消えてしまいます。{{do}} は、質問の「like 〜」をまるごと受け取って返す、便利な言葉なのです。",
        "ところで、I'm from Nagoya. の {{from}} は、もともと「〜から」という意味です。from Tokyo to Osaka なら「東京から大阪まで」。では I'm from Nagoya. は「わたしは今、名古屋から来たところです」なのでしょうか。じつは、ちがいます。from は、ものごとが始まった{{出発点}}を表す言葉です。I'm from 〜. は「わたしは〜が出発点の人です」、つまり生まれ育った町や国、{{出身}}を表します。",
        "Where are you from? の from も同じです。where（どこ）と from を合わせて「あなたの出発点はどこ？」、つまり「どちらのご出身ですか」という質問になります。答えるときも from をそのまま使い、I'm from Osaka. と言えばよいのです。今どこから来たのかを言いたいときは、come（来る）を使った別の言い方をします。",
      ],
      reveal: "from は「〜から」、つまりものごとの{{出発点}}を表す言葉です。I'm from Nagoya. は「名古屋から今来ました」ではなく、「わたしは名古屋が出発点の人です」、つまり名古屋の{{出身}}だという意味になります。だから自己紹介《じこしょうかい》カードには、毎朝出発する車庫ではなく、生まれ育った町の名前を入れればよいのです。",
      cliff: "話すときには聞こえないのに、書くとはっきり見えるきまりがあります。それは何でしょう？",
    },
    {
      heading: "書くときは大文字に気をつける",
      body: "自己紹介《じこしょうかい》を紙に書くときは、{{文のはじめ}}と、{{人の名前・町や国の名前}}のはじめの文字を大文字にします。I'm Haruto. の H、I'm from Nagoya. の N が大文字になります。I'm の「'」は、I am をちぢめた印です。",
      reading: [
        "自己紹介《じこしょうかい》をカードに書くと、話すときには気づかなかったきまりが見えてきます。{{文のはじめ}}の文字と、{{人の名前・町や国の名前}}のはじめの文字は、大文字にします。Kenta の K、Nagoya の N、Japan の J です。大文字は「ここからが名前ですよ」という目印で、読む人は、たくさんの単語の中から名前をすぐに見つけられます。",
        "「わたし」を表す I は、文のどこにあっても大文字です。I'm の「'」は、I am の a をはぶいた印で、話すときのように短くつなげて書いた形です。むかし、英語の国では、人の家をたずねたとき、名前を印刷した小さなカードを置いていく習わしがありました。カードには名前しか書かれていませんが、大文字で始まる名前が、だれが来たのかをはっきり伝えていたのです。",
      ],
      photos: [
        {
          src: `${C}/visiting-card.webp`, width: 800, height: 471,
          alt: "白い台の上にならべられた、名前が細い字で印刷された小さな白いカードと、二つ折りのカード",
          caption: "ジョージ・ボンドさんの訪問カード（ニュージーランドの博物館の所蔵）。Mr George Bond と、名前のはじめが大文字で印刷されています。",
          credit: { author: "Auckland Museum（作者不明）", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0", source: "https://commons.wikimedia.org/wiki/File:Card,_visiting_(AM_1968.62-1).jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "manzai",
    title: "名前より先にカレー",
    cast: ["ケンタ", "サキ"],
    lines: [
      { who: "ケンタ", text: "どうもー、ケンタです！　今日は英語で自己紹介《じこしょうかい》をします！" },
      { who: "サキ", text: "サキです。じゃあ、ケンタからどうぞ。" },
      { who: "ケンタ", text: "Hello! I like curry, ramen, sushi, udon, pizza, gyoza, takoyaki, natto, onigiri, and melon!", say: "ハロー！ アイ・ライク・カリー、ラーメン、スシ、ウドン、ピッツァ、ギョウザ、タコヤキ、ナットウ、オニギリ、アンド・メロン！" },
      { who: "サキ", text: "長い！　10こも言って、まだ名前を言ってないでしょ！　自己紹介《じこしょうかい》は{{名前がいちばん先}}！" },
      { who: "ケンタ", text: "おなかがすいてて、つい。じゃあやり直し。Hello. I'm Kenta.", say: "おなかがすいてて、つい。じゃあやり直し。ハロー。アイム・ケンタ。" },
      { who: "サキ", text: "そうそう。名前は {{I'm 〜.}} か {{My name is 〜.}}。次は出身ね。", say: "そうそう。名前は、アイム、か、マイ・ネーム・イズ。次は出身ね。" },
      { who: "ケンタ", text: "I'm from the kitchen!", say: "アイム・フロム・ザ・キッチン！" },
      { who: "サキ", text: "台所《だいどころ》？" },
      { who: "ケンタ", text: "from は「〜から」でしょ。今、台所《だいどころ》でつまみ食いしてから来ました！" },
      { who: "サキ", text: "今来た場所じゃないの！　from は{{出発点}}。I'm from 〜. は、生まれ育った町、{{出身}}を言う文！", say: "今来た場所じゃないの！ フロムは、しゅっぱつてん。アイム・フロム、は、生まれ育った町、しゅっしんを言う文！" },
      { who: "ケンタ", text: "じゃあ、I'm from Nagoya.", say: "じゃあ、アイム・フロム・ナゴヤ。" },
      { who: "サキ", text: "それでいいの。書くときは Nagoya の N を大文字にね。じゃあ最後に、好きなものを1つ。" },
      { who: "ケンタ", text: "1つだけ！？　……I like curry very much.", say: "1つだけ！？ ……アイ・ライク・カリー・ベリー・マッチ。" },
      { who: "サキ", text: "very much で「とても好き」。ちゃんと言えたね。Nice to meet you.", say: "ベリー・マッチで、とても好き。ちゃんと言えたね。ナイス・トゥ・ミート・ユー。" },
      { who: "ケンタ", text: "Nice to meet you.", say: "ナイス・トゥ・ミート・ユー。" },
      { who: "サキ", text: "おうむ返し！　返すときは {{too}} をつけて「こちらこそ」でしょ。", say: "おうむ返し！ 返すときは、トゥーをつけて、こちらこそ、でしょ。" },
      { who: "ケンタ", text: "Nice to meet you, too. ……and I like ramen, sushi, udon, pizza……", say: "ナイス・トゥ・ミート・ユー、トゥー。……アンド・アイ・ライク・ラーメン、スシ、ウドン、ピッツァ……" },
      { who: "サキ", text: "また始まった！　もういいよ。" },
      { who: "ケンタ", text: "どうも、ありがとうございました！" },
    ],
    note: "ケンタとサキは作り話の人で、会話も作り話です。自己紹介《じこしょうかい》で名前を先に言うこと、I'm from 〜. が出身を表すこと、Nice to meet you, too. の返し方は、英語のきまりです。",
  },
  mistakes: [
    { wrong: "I'm name is Haruto.", right: "My name is Haruto.", why: "「わたしの名前は」は My name is 〜.。I'm を使うなら I'm Haruto. です。" },
    { wrong: "Nice to meet you. — Nice to meet you.", right: "Nice to meet you, too.", why: "返すときは too（〜も）をつけて「こちらこそ」の気持ちを表します。" },
    { wrong: "Do you like soccer? — Yes, I like.", right: "Yes, I do.", why: "Do you 〜? には do を使って答えます。" },
    { wrong: "I'm from osaka.", right: "I'm from Osaka.", why: "町や国の名前は、はじめの文字を大文字にします。" },
  ],
  check: [
    { q: "「わたしは京都の出身です」を英語で言うと？", a: "I'm from Kyoto.", why: "出身は I'm from 〜.、町の名前は大文字で始める。" },
    { q: "What's your name? に名前を答える形は？（2つのうちどちらか）", a: "I'm 〜. / My name is 〜.", why: "どちらも名前を伝える言い方。" },
    { q: "Nice to meet you. への返事は？", a: "Nice to meet you, too.", why: "too をつけて「こちらこそ」。" },
  ],
  next: [
    { label: "ドリルで「自己紹介《じこしょうかい》」を練習する", href: "/learn/eigo-sho/e-english-56-jikoshokai" },
    { label: "「月と誕生日《たんじょうび》」（ドリル）", href: "/learn/eigo-sho/e-english-56-tanjobi" },
    { label: "「できること（can）」（ドリル）", href: "/learn/eigo-sho/e-english-56-can" },
  ],
};
