import type { Lecture } from "../types";

export const E_ENGLISH_56_ALPHA_KAKU: Lecture = {
  unit: "e-english-56-alpha-kaku",
  title: "4本線の「部屋」を使って、読みやすい英語を書く",
  hook: "友だちへのカードに英語で名前やメッセージを書くとき、文字の大きさや高さがばらばらだと読みにくくなります。英語には、4本線と大文字のルールという「書き方の約束」があります。約束を守ると、だれが読んでもすぐに分かる文が書けます。",
  sections: [
    {
      heading: "4本線は3つの部屋",
      body: "英語を練習するノートには、{{4本の線}}が引いてあります。線と線の間を上から{{上の部屋・真ん中の部屋・下の部屋}}と考えます。3本目の線は、文字が乗る「地面」のような線です。{{大文字}}はどれも、1本目から3本目の線の間に書きます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "4本線と部屋の名前",
        steps: [
          { label: "上の部屋", sub: "1本目と2本目の間", tone: "blue" },
          { label: "真ん中の部屋", sub: "2本目と3本目の間", tone: "yellow" },
          { label: "下の部屋", sub: "3本目と4本目の間", tone: "plain" },
        ],
        note: "大文字は上の部屋と真ん中の部屋を使い、下の部屋には出ません。",
      },
    },
    {
      heading: "小文字は3つのなかまに分かれる",
      body: "小文字は、どの部屋を使うかで3つのなかまに分けられます。a や o は{{真ん中の部屋だけ}}、b や h は{{上の部屋までのびる}}、g や y は{{下の部屋までのびる}}文字です。i と j は上に点がつき、j は下の部屋までのびます。",
      figure: {
        type: "compare",
        title: "小文字が使う部屋",
        columns: [{ title: "上までのびる", tone: "blue" }, { title: "真ん中だけ", tone: "yellow" }, { title: "下までのびる" }],
        rows: [
          { cells: ["b d f h", "a c e i m n o", "g j p"] },
          { cells: ["k l t", "r s u v w x z", "q y"] },
        ],
        note: "t は上の部屋の半分くらいまでのびます。i と j の点は上の部屋に書きます。",
      },
    },
    {
      heading: "大文字で始めるところ",
      body: "英語の文では、どこを大文字にするかが決まっています。{{文のはじめ}}の文字、自分を表す {{I}}、{{人や国・町の名前}}のはじめの文字は大文字にします。それ以外は小文字で書きます。",
      figure: {
        type: "tree",
        title: "大文字にするところ",
        root: {
          label: "大文字で書く",
          tone: "navy",
          children: [
            { label: "文のはじめ", sub: "My name is 〜.", tone: "yellow" },
            { label: "I（わたし）", sub: "文の中でもいつも", tone: "blue" },
            { label: "名前のはじめ", sub: "Emma / Japan", tone: "red" },
          ],
        },
      },
    },
    {
      heading: "すき間と記号の約束",
      body: "1つの単語の中の文字は{{つめて書き}}、単語と単語の間は{{小文字1つ分}}くらいあけます。文の終わりには {{.}}（ピリオド）、たずねる文の終わりには {{?}}（クエスチョンマーク）をつけます。Yes や No のあとには {{,}}（コンマ）をつけてから続けます。",
      figure: {
        type: "formula",
        title: "まちがいを直して、正しい文にする",
        prose: true,
        steps: [
          { expr: "i like dogs", note: "直す前" },
          { expr: "{{I}} like dogs", note: "文のはじめと I を大文字に" },
          { expr: "I like dogs{{.}}", note: "終わりにピリオド" },
          { expr: "{{D}}o you like dogs{{?}}", note: "たずねる文は ? で終わる" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "y や g を真ん中の部屋の中に小さく書く", right: "下の部屋までのばして書く", why: "のびる部分がないと、v や a などと見分けにくくなります。" },
    { wrong: "My name is ken.", right: "My name is Ken.", why: "人の名前のはじめの文字は大文字にします。" },
    { wrong: "i am from Japan.", right: "I am from Japan.", why: "I は文のはじめでなくても、いつも大文字です。" },
    { wrong: "Ilikedogs.", right: "I like dogs.", why: "単語と単語の間は、小文字1つ分くらいあけます。" },
  ],
  check: [
    { q: "下の部屋までのびる小文字を、p のほかに1つ答えましょう。", a: "g・j・q・y のどれか", why: "この5文字は下の部屋までのびます。" },
    { q: "do you like music を正しく書き直すと？", a: "Do you like music?", why: "文のはじめは大文字、たずねる文なので ? をつける。" },
    { q: "大文字はどの線からどの線の間に書く？", a: "1本目から3本目の間", why: "大文字は上の部屋と真ん中の部屋を使う。" },
  ],
  next: [
    { label: "ドリルで「アルファベットを書く」を練習する", href: "/learn/eigo-sho/e-english-56-alpha-kaku" },
    { label: "3・4年「アルファベット（小文字）」（ドリル）", href: "/learn/eigo-sho/e-english-34-alpha-komoji" },
    { label: "「音と文字」（ドリル）", href: "/learn/eigo-sho/e-english-56-oto-moji" },
  ],
};
