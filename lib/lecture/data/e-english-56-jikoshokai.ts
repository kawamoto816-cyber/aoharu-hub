import type { Lecture } from "../types";

export const E_ENGLISH_56_JIKOSHOKAI: Lecture = {
  unit: "e-english-56-jikoshokai",
  nameRuby: "自己紹介《じこしょうかい》",
  title: "名前・出身・好きなものを、決まった形で伝える",
  hook: "新しいクラスや、外国から来た先生と会ったとき、最初にするのが自己紹介《じこしょうかい》です。英語の自己紹介《じこしょうかい》は、名前・出身・好きなものを決まった形に入れるだけで組み立てられます。相手のことをたずねる言い方もいっしょに身につけると、会話が続きます。",
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
    },
    {
      heading: "書くときは大文字に気をつける",
      body: "自己紹介《じこしょうかい》を紙に書くときは、{{文のはじめ}}と、{{人の名前・町や国の名前}}のはじめの文字を大文字にします。I'm Haruto. の H、I'm from Nagoya. の N が大文字になります。I'm の「'」は、I am をちぢめた印です。",
    },
  ],
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
