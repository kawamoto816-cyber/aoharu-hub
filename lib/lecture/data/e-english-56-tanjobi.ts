import type { Lecture } from "../types";

export const E_ENGLISH_56_TANJOBI: Lecture = {
  unit: "e-english-56-tanjobi",
  nameRuby: "月と誕生日《たんじょうび》",
  title: "誕生日《たんじょうび》は「月の名前＋何番目の日」で言う",
  hook: "クラスの誕生日《たんじょうび》カレンダーを英語で作るとしたら、7月10日をどう書けばよいでしょう。英語では、月の一つ一つに名前があり、日にちは「1番目・2番目」という順番の言い方を使います。この2つのきまりが分かれば、だれの誕生日《たんじょうび》でも言えるようになります。",
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
    },
    {
      heading: "誕生日《たんじょうび》にほしいもの",
      body: "誕生日《たんじょうび》の話は、ほしいものへと続けられます。What do you want for your birthday? と聞かれたら、{{I want 〜.}} で答えます。たとえば I want a new soccer ball. のように言います。{{for your birthday}} は「誕生日《たんじょうび》に」という意味です。",
    },
  ],
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
