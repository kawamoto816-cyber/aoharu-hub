import type { Lecture } from "../types";

export const E_ENGLISH_56_HITO: Lecture = {
  unit: "e-english-56-hito",
  nameRuby: "人を紹介《しょうかい》する（He is 〜. / She is 〜.）",
  title: "男の人は He、女の人は She。紹介《しょうかい》は「だれか→どんな人か→できること」の順に",
  hook: "新しく来た先生のことを、家の人に「この先生はね…」と話したことはありませんか。英語にも、人を紹介《しょうかい》するときの決まった形があります。He と She の使い分けを覚えると、家族や友だち、あこがれの人のことを英語で話せるようになります。",
  sections: [
    {
      heading: "This is 〜. で始め、2回目からは He・She",
      body: "写真や本人を指して紹介《しょうかい》するときは、まず {{This is 〜.}} で「こちらは〜です」と言います。This is Riku. のように名前を入れます。2回目からは名前をくり返さず、{{He}} か {{She}} にかえて話を続けます。",
      figure: {
        type: "flow",
        title: "紹介《しょうかい》の3つの文",
        steps: [
          { label: "① だれか", sub: "This is Riku.", tone: "navy" },
          { label: "② どんな人か", sub: "He is kind.", tone: "blue" },
          { label: "③ できること", sub: "He can swim.", tone: "yellow" },
        ],
        arrows: ["He にかえる", "つけたす"],
        note: "Riku は男の子なので、2文目から He になります。",
      },
    },
    {
      heading: "He と She の使い分け",
      body: "男の人・男の子は {{He}}、女の人・女の子は {{She}} で表します。「その人の名前は」と言うときは、男の人なら {{His name is 〜.}}、女の人なら {{Her name is 〜.}} です。friend や teacher は男女どちらにも使う言葉なので、その人が男か女かを見て決めます。",
      figure: {
        type: "compare",
        title: "He と She をくらべる",
        columns: [{ title: "He", tone: "blue" }, { title: "She", tone: "red" }],
        rows: [
          { label: "使う人", cells: ["男の人・男の子", "女の人・女の子"] },
          { label: "家族の例", cells: ["father / brother", "mother / sister"] },
          { label: "名前の前", cells: ["Mr. Ito", "Ms. Ito"] },
          { label: "「その人の」", cells: ["his（His name is 〜.）", "her（Her name is 〜.）"] },
        ],
      },
    },
    {
      heading: "He is・She is のあとに来る言葉",
      body: "He is・She is のあとには、その人が{{どんな人か}}を表す言葉を置きます。家族や友だちとの関係、仕事、人がらなどです。とくいなことは {{good at 〜}} で言えます。He is は {{He's}}、She is は {{She's}} とちぢめることもできます。",
      figure: {
        type: "tree",
        title: "He is / She is のあとに入るもの",
        root: {
          label: "He is / She is",
          tone: "navy",
          children: [
            { label: "関係", sub: "my uncle", tone: "plain" },
            { label: "仕事", sub: "a doctor", tone: "plain" },
            { label: "人がら", sub: "kind / funny", tone: "yellow" },
            { label: "とくいなこと", sub: "good at 〜", tone: "blue" },
          ],
        },
        note: "kind はやさしい、funny はおもしろい、brave は勇敢《ゆうかん》な、という意味です。",
      },
    },
    {
      heading: "「だれ？」とたずねる・答える",
      body: "写真の人がだれかをたずねるときは {{Who is this?}} と聞きます。答えは This is 〜. です。「その人は〜ですか」と聞くときは、is を前に出して {{Is he 〜?}}・{{Is she 〜?}} とし、答えも he・she で返します。",
      figure: {
        type: "formula",
        title: "たずねる・答えるの流れ",
        prose: true,
        steps: [
          { expr: "{{Who}} is this?", note: "だれかをたずねる" },
          { expr: "{{This is}} my uncle.", note: "関係を答える" },
          { expr: "{{Is he}} a cook?", note: "is を he の前に出す" },
          { expr: "Yes, {{he is}}. / No, {{he isn't}}.", note: "he でたずねられたら he で答える" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "This is my brother. She is ten.", right: "This is my brother. He is ten.", why: "brother（兄・弟）は男の人なので He を使います。" },
    { wrong: "He is name is Kenta.", right: "His name is Kenta.", why: "「その人（男の人）の名前」は his name。He is は「その人は〜です」の意味です。" },
    { wrong: "She is play the piano.", right: "She can play the piano.", why: "できることは can で言います。is と can はいっしょに使いません。" },
  ],
  check: [
    { q: "This is Mr. Kato. ___ is our music teacher. の ___ に入るのは？", a: "He", why: "Mr. は男の人の名前の前につけるので He。" },
    { q: "This is my aunt. ___ name is Saki. の ___ に入るのは？", a: "Her", why: "aunt（おば）は女の人なので「その人の」は her。" },
    { q: "Is she your sister? に「いいえ」で答えると？", a: "No, she isn't.", why: "she でたずねられたので she で答え、is not をちぢめて isn't。" },
  ],
  next: [
    { label: "「人を紹介《しょうかい》する」のドリル", href: "/learn/eigo-sho/e-english-56-hito" },
    { label: "つぎの図解レクチャー「一日の生活と頻度《ひんど》」", href: "/learn/lecture/e-english-56-hindo" },
    { label: "中学の図解レクチャー「be動詞《どうし》」", href: "/learn/lecture/j-en-1-be" },
  ],
};
