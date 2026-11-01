import type { Lecture } from "../types";

export const E_ENGLISH_56_CHUMON: Lecture = {
  unit: "e-english-56-chumon",
  nameRuby: "注文と値段《ねだん》（What would you like?）",
  title: "注文は I'd like 〜.、値段《ねだん》は How much 〜? でたずねる",
  hook: "レストランやお店では、「何にしますか」「〜をください」「いくらですか」という会話がくり返されます。英語でもこの流れはほとんど同じで、決まった言い方をいくつか覚えれば、外国のお店でも注文できます。ここでは、ていねいな言い方の I'd like と、値段《ねだん》の言い方を組み立てます。",
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
    },
    {
      heading: "すすめられたときの答え方",
      body: "お店の人に Would you like some tea?（お茶はいかがですか）とすすめられることもあります。ほしいときは {{Yes, please.}}、いらないときは {{No, thank you.}} と答えます。いらないときも thank you をつけるのが、相手を気づかう言い方です。",
    },
  ],
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
