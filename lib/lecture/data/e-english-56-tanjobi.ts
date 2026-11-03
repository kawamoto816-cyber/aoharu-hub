import type { Lecture } from "../types";

const C = "/media/commons/e-english-56-tanjobi";

export const E_ENGLISH_56_TANJOBI: Lecture = {
  unit: "e-english-56-tanjobi",
  nameRuby: "月と誕生日《たんじょうび》",
  title: "誕生日《たんじょうび》は「月の名前＋何番目の日」で言う",
  hook: "クラスの誕生日《たんじょうび》カレンダーを英語で作るとしたら、7月10日をどう書けばよいでしょう。英語では、月の一つ一つに名前があり、日にちは「1番目・2番目」という順番の言い方を使います。この2つのきまりが分かれば、だれの誕生日《たんじょうび》でも言えるようになります。",
  mystery: "9月の September には、昔のローマの言葉で「7」を表す septem がかくれています。10月の October の octo は「8」、12月の December の decem は「10」。どれも番号が2つずつずれています。月の名前は、どうして番号と合わなくなったのでしょう？",
  mission: {
    from: "商店街のケーキ屋さん",
    request: "うちでは、誕生日《たんじょうび》ケーキのチョコのプレートに、英語で名前と日付を書いています。この前、9月生まれのお客さんに「September は、もとは『7』という意味なんですよ」と教えてもらいました。でも、なぜ9月なのかは、お客さんも知りませんでした。お店のカードに書いて、ほかのお客さんにも話したいのです。名探偵《めいたんてい》のあなたに、月の名前と番号がずれたなぞを解いてほしいのです。",
    thanks: "なるほど、昔のローマでは1年が3月から始まっていたから、9月が「7番目の月」だったのですね。お店のカードに「月の名前にも、日にちと同じ『何番目』がかくれている」と書いたら、プレートを注文するお客さんとの話がはずむようになりました。",
  },
  sections: [
    {
      heading: "12の月には、それぞれ名前がある",
      body: "英語の月は、1月・2月と数で言うのではなく、{{January}}・{{February}} のように一つ一つに名前があります。月の名前は、文の中のどこにあっても{{大文字で始めます}}。June（6月）と July（7月）は、つづりがにているので気をつけましょう。",
      figure: {
        type: "compare",
        title: "月の名前",
        columns: [{ title: "1〜4月", tone: "blue" }, { title: "5〜8月", tone: "yellow" }, { title: "9〜12月", tone: "red" }],
        rows: [
          { cells: ["1月 January", "5月 May", "9月 September"] },
          { cells: ["2月 February", "6月 June", "10月 October"] },
          { cells: ["3月 March", "7月 July", "11月 November"] },
          { cells: ["4月 April", "8月 August", "12月 December"] },
        ],
        note: "書くときは、どれも最初の1文字が大文字。",
      },
      reading: [
        "日本語の月は、1月・2月……と、数に「月」をつけるだけです。ところが英語では、January（1月）から December（12月）まで、12の月の一つ一つにちがう名前があります。数のように並《なら》んでいるわけではないので、最初は覚えにくく感じるかもしれません。でも、名前の一つ一つには、昔の人の物語がかくれています。",
        "英語の月の名前の多くは、2000年以上前のローマの言葉から来ています。January は、物事の始まりを守るとされた神様ヤヌスから、March は戦いの神様マルスから来たと言われています。July（7月）はローマの政治家ユリウス・カエサル、August（8月）はローマの最初の皇帝《こうてい》アウグストゥスの名前からつけられました。月の名前は、人の名前と同じように「この世に一つだけのものの名前」なので、文のどこにあっても{{大文字}}で書き始めます。",
        "では、September から December はどうでしょう。sept は7、oct は8、nov は9、dec は10を表すローマの言葉です。タコを英語で octopus と言うのも、足が8本だからです。とても古いローマのこよみでは、1年は{{3月から}}始まっていました。3月から数えると、9月はちょうど7番目、10月は8番目の月です。のちに1年の始まりが1月に変わっても、名前はそのまま残りました。",
        "月には30日の月と31日の月があります。英語の国の子どもたちは、どれがどれかを、昔から伝わる下の歌で覚えてきました。hath は has の古い言い方です。30日の月を4つ言い、2月だけは28日（うるう年は29日）、残りはみんな31日だと、リズムよく教えてくれます。日本で「にしむくさむらい」と覚えるのと同じ役目の歌です。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Thirty days hath September,\nApril, June, and November;\nFebruary has twenty-eight alone,\nAll the rest have thirty-one,\nExcepting leap-year, that's the time\nWhen February's days are twenty-nine.",
        ja: "30日あるのは 9月と\n4月、6月、11月\n2月だけは 28日\nほかはみんな 31日\nただし うるう年だけは\n2月が 29日になる",
        cite: "Mother Goose, \"Thirty Days Hath September\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/fasti.webp`, width: 800, height: 596,
          alt: "博物館のかべにかざられた、白いかけらをつなぎ合わせた横長の板。赤と黒の小さな文字が見える",
          caption: "2000年以上前のローマのこよみ。かべにかかれたものが、かけらになって見つかりました（イタリアの博物館）。縦《たて》に区切られた列の一つ一つが、ひと月分です。",
          credit: { author: "Juliana Bastos Marques", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Fasti_Antiates,_Palazzo_Massimo_alle_Terme,_Rome..jpg" },
        },
        {
          src: `${C}/augustus.webp`, width: 800, height: 1200,
          alt: "よろいを着て右手を高く上げた男の人の、白い大理石の像",
          caption: "ローマの最初の皇帝《こうてい》、アウグストゥスの像《ぞう》（バチカン美術館）。8月の {{August}} は、この人の名前からつけられました。",
          credit: { author: "Till Niermann", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Statue-Augustus.jpg" },
        },
      ],
      reveal: "September の septem は「7」、October の octo は「8」。とても古いローマのこよみでは、1年が{{3月から}}始まっていたので、3月から数えると9月は7番目、10月は8番目の月でした。1年の始まりが1月に変わっても名前は残ったので、番号が2つずれて見えるのです。月の名前も、もとは「{{何番目の月}}」という意味だったのですね。",
      cliff: "月の名前にも「何番目」がかくれていました。では、日にちはどう言うのでしょう？",
    },
    {
      heading: "日にちは「何番目の日か」で言う",
      body: "日にちは、数の one・two ではなく、{{first（1番目）}}・{{second（2番目）}}・{{third（3番目）}}のような{{順番の言い方}}を使います。数字で書くときは 1st・2nd・3rd のように、数字のあとに2文字をつけます。4日から先は、ほとんどが {{th}} で終わります。21日・22日・23日は、また st・nd・rd にもどります。",
      figure: {
        type: "tree",
        title: "日にちの終わりの2文字",
        root: {
          label: "日にち",
          children: [
            { label: "1・21・31日", sub: "first など", children: [{ label: "st", sub: "1st・21st", tone: "blue" }] },
            { label: "2・22日", sub: "second など", children: [{ label: "nd", sub: "2nd・22nd", tone: "yellow" }] },
            { label: "3・23日", sub: "third など", children: [{ label: "rd", sub: "3rd・23rd", tone: "red" }] },
            { label: "それ以外", sub: "fourth など", children: [{ label: "th", sub: "4th・11th・20th", tone: "plain" }] },
          ],
        },
        note: "11日・12日・13日は th（eleventh・twelfth・thirteenth）。5日 fifth・12日 twelfth はつづりに注意。",
      },
      reading: [
        "英語では、日にちを数の one、two ではなく、{{first（1番目）}}、{{second（2番目）}}、{{third（3番目）}}という順番の言い方で表します。5月5日なら May fifth。「5月の、5番目の日」という意味です。カレンダーの日にちは、1日から月の終わりまで一列に並《なら》んだ行列のようなもの。誕生日《たんじょうび》は、その行列の何番目の日かを言っているのです。",
        "4番目から先は、fourth、sixth のように、数の言葉のおしりに {{th}} をつけるのが基本です。ただし、形が少し変わるものがあります。five は fifth、nine は ninth（e が消えます）、twelve は twelfth。数字で書くときは、1st、2nd、3rd、4th のように、言葉の最後の2文字をつけます。21日・22日・23日は twenty-first、twenty-second、twenty-third なので、また st・nd・rd にもどります。",
        "月の最後の日も言ってみましょう。上の歌で30日まである April の最後は April thirtieth、31日まである December の最後は December thirty-first です。歌で月の日数を覚えておくと、カレンダーづくりにも役立ちます。",
      ],
      photos: [
        {
          src: `${C}/berry-sep.webp`, width: 800, height: 1327,
          alt: "青い空の下に白いお城が立ち、手前の畑で人々がぶどうをつんでいる絵。上に半円の形の、数字がならんだ帯がある",
          caption: "600年ほど前にフランスで作られ始めた本の、9月のページ。上の半円の帯に、その月の日にちの数が順番に並《なら》んでいます。下はぶどうをつむ人々です。",
          credit: { author: "Limbourg brothers / Barthélemy d'Eyck / Jean Colombe", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Les_Tr%C3%A8s_Riches_Heures_du_duc_de_Berry_septembre.jpg" },
        },
      ],
      cliff: "日にちが言えるようになりました。英語では、月と日のどちらを先に言うのでしょう？",
    },
    {
      heading: "たずねる・答える",
      body: "誕生日《たんじょうび》をたずねるときは、「いつ」の {{When}} を使って When is your birthday? と聞きます。答えは {{My birthday is ＋月＋日.}} です。日本語の「5月5日」と同じで、{{月が先、日があと}}になります。",
      figure: {
        type: "formula",
        title: "誕生日《たんじょうび》の会話",
        prose: true,
        steps: [
          { label: "聞く", expr: "{{When}} is your birthday?", note: "When は「いつ」" },
          { label: "答える", expr: "My birthday is {{October}} {{9th}}.", note: "月が先、日があと" },
          { label: "答える", expr: "It's {{October}} {{9th}}.", note: "It's で短く答えてもよい" },
          { label: "言う", expr: "Happy birthday!", note: "その日の人をおいわいする" },
        ],
        note: "9th は ninth と読む。nine のeが消えることに注意。",
      },
      reading: [
        "誕生日《たんじょうび》をたずねるときは、「いつ」の {{When}} を使って When is your birthday? と聞きます。答えは My birthday is July 10th. のように、{{月が先、日があと}}です。短く It's July 10th. と答えてもかまいません。your を友だちの名前に変えれば、When is Ken's birthday? と、ほかの人の誕生日《たんじょうび》もたずねられます。",
        "じつは、日付の言い方は、英語を話す国によって少しちがいます。アメリカでは July 10th のように月が先ですが、イギリスでは 10th July と書き、the tenth of July と言うこともよくあります。of は「〜の」なので、言葉そのものが「7月の、10番目の日」になっています。どちらの言い方でも、「何番目の日」という考え方は同じなのです。",
      ],
      cliff: "誕生日《たんじょうび》が分かったら、次は「何がほしい？」と聞いてみましょう。",
    },
    {
      heading: "誕生日《たんじょうび》にほしいもの",
      body: "誕生日《たんじょうび》の話は、ほしいものへと続けられます。What do you want for your birthday? と聞かれたら、{{I want 〜.}} で答えます。たとえば I want a new soccer ball. のように言います。{{for your birthday}} は「誕生日《たんじょうび》に」という意味です。",
      reading: [
        "誕生日《たんじょうび》の話は、ほしいものの話へと続けられます。What do you want for your birthday? と聞かれたら、I want a new bike. のように {{I want 〜.}} で答えます。{{for your birthday}} は「誕生日《たんじょうび》に」という意味です。理由をそえて、I like cycling. と続けると、相手にも気持ちが伝わります。",
        "英語の国では、誕生日《たんじょうび》のケーキにろうそくを立てて歌でおいわいし、本人がろうそくをふき消すことがよくあります。友だちの誕生日《たんじょうび》には、目を見て Happy birthday! と言ってみましょう。たった2語でも、とてもうれしいひとことです。",
      ],
    },
  ],
  story: {
    kind: "manzai",
    title: "ワンガツ・ワンス",
    cast: ["ダイチ", "ユナ"],
    lines: [
      { who: "ダイチ", text: "どうもー、ダイチです！　今日は英語で誕生日《たんじょうび》を言う練習をします。" },
      { who: "ユナ", text: "ユナです。じゃあ聞くね。When is your birthday?", say: "ユナです。じゃあ聞くね。ウェン・イズ・ユア・バースデイ？" },
      { who: "ダイチ", text: "My birthday is ゴガツ five!", say: "マイ・バースデイ・イズ、ゴガツ・ファイブ！" },
      { who: "ユナ", text: "ゴガツは日本語！　英語の月には、それぞれ名前があるの。5月は {{May}}。", say: "ゴガツは日本語！ 英語の月には、それぞれ名前があるの。5月は、メイ。" },
      { who: "ダイチ", text: "分かった。1月はワンガツ、2月はツーガツ、3月はスリーガツ！" },
      { who: "ユナ", text: "数に「ガツ」をつけない！　{{January}}、{{February}}、{{March}}。12の月に、一つ一つ名前があるの。", say: "数にガツをつけない！ ジャニュアリー、フェブルアリー、マーチ。12の月に、一つ一つ名前があるの。" },
      { who: "ダイチ", text: "よし。My birthday is May five!", say: "よし。マイ・バースデイ・イズ・メイ・ファイブ！" },
      { who: "ユナ", text: "おしい！　日にちは数じゃなくて{{順番の言い方}}。5日は {{fifth}}。「5月の5番目の日」ってこと。", say: "おしい！ 日にちは数じゃなくて、順番の言い方。5日は、フィフス。5月の5番目の日ってこと。" },
      { who: "ダイチ", text: "順番ね。じゃあ1日はワンス、2日はツース、3日はスリース！" },
      { who: "ユナ", text: "全部 th にしない！　1日は {{first}}、2日は {{second}}、3日は {{third}}。書くと 1st、2nd、3rd。", say: "全部ティーエイチにしない！ 1日はファースト、2日はセカンド、3日はサード。書くと、ワン・エス・ティー、ツー・エヌ・ディー、スリー・アール・ディー。" },
      { who: "ダイチ", text: "じゃあ5日はファイブス？" },
      { who: "ユナ", text: "fifth！　ve が f に変わるの。12日の twelfth も同じなかま。", say: "フィフス！ ブイ・イーが、エフに変わるの。12日のトウェルフスも同じなかま。" },
      { who: "ダイチ", text: "むずかしいなあ。ユナの誕生日《たんじょうび》はいつ？" },
      { who: "ユナ", text: "My birthday is September 10th.", say: "マイ・バースデイ・イズ・セプテンバー・テンス。" },
      { who: "ダイチ", text: "セプテンバー？　セブンににてるから、7月でしょ！" },
      { who: "ユナ", text: "いい耳！　昔のローマの言葉で sept は7。でも、昔のこよみは3月から始まったから、7番目の月が今の9月なの。", say: "いい耳！ 昔のローマの言葉で、セプトは7。でも、昔のこよみは3月から始まったから、7番目の月が今の9月なの。" },
      { who: "ダイチ", text: "よし、ユナの誕生日《たんじょうび》にはケーキを用意するよ。9月10日、ナインガツ・テンス！" },
      { who: "ユナ", text: "最後にまた「ガツ」が出た！　もういいよ。" },
      { who: "ダイチ", text: "どうも、ありがとうございました！" },
    ],
    note: "ダイチとユナは作り話の人で、会話も作り話です。月の名前や、日にちを first・second・third・fifth などの順番の言い方で言うことは、英語のきまりです。September の sept が7を表し、とても古いローマのこよみが3月から始まっていたことは、よく知られている説です。",
  },
  mistakes: [
    { wrong: "My birthday is May five.", right: "My birthday is May 5th (fifth).", why: "日にちは数の言い方ではなく、順番の言い方を使います。" },
    { wrong: "My birthday is august 3rd.", right: "My birthday is August 3rd.", why: "月の名前は、文のと中でも大文字で始めます。" },
    { wrong: "12日を twelveth と書く。", right: "twelfth", why: "twelve の ve が f にかわります。5日の fifth も同じなかまです。" },
    { wrong: "June を7月だと思う。", right: "June は6月、July は7月。", why: "つづりがにているので、Ju のあとの n（6月）と l（7月）で見分けます。" },
  ],
  check: [
    { q: "7月4日を英語で言いましょう。", a: "July 4th（fourth）", why: "月の名前が先、日にちは順番の言い方。" },
    { q: "22日を数字＋2文字で書きましょう。", a: "22nd", why: "22日は second と同じなかまなので nd。" },
    { q: "相手の誕生日《たんじょうび》をたずねる文は？", a: "When is your birthday?", why: "「いつ」は When。" },
  ],
  next: [
    { label: "ポイントと練習問題「月と誕生日《たんじょうび》」", href: "/learn/eigo-sho/e-english-56-tanjobi" },
    { label: "前の単元「自己紹介《じこしょうかい》」", href: "/learn/eigo-sho/e-english-56-jikoshokai" },
    { label: "つぎの単元「曜日と教科・時間割《じかんわり》」", href: "/learn/eigo-sho/e-english-56-kyoka" },
  ],
};
