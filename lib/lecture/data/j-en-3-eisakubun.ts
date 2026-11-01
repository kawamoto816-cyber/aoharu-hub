import type { Lecture } from "../types";

export const J_EN_3_EISAKUBUN: Lecture = {
  unit: "j-en-3-eisakubun",
  title: "中3の英作文は「意見→理由→まとめ」の型で、書ける英語に言いかえる",
  hook: "高校入試では「あなたは〜に賛成ですか。理由を2つ書きなさい」のような{{意見を書く英作文}}がよく出ます。思いついた日本語をそのまま訳そうとすると手が止まりますが、{{決まった型}}と、知っている英語への{{言いかえ}}を使えば、まとまった文章が書けるようになります。",
  sections: [
    {
      heading: "意見文は「意見→理由→まとめ」の順",
      body: "意見を書くときは、まず{{自分の立場}}をはっきり書き、次に{{理由}}を挙げ、最後にもう一度意見を{{まとめ}}ます。理由が2つなら First, 〜. Second, 〜. と番号をつけると、読む人に伝わりやすくなります。この順番を決めておけば、何を書くかだけを考えればよくなります。",
      figure: {
        type: "flow",
        title: "意見文の組み立て",
        dir: "col",
        steps: [
          { label: "意見", sub: "I think (that) 〜.", tone: "navy" },
          { label: "理由1", sub: "First, 〜.", tone: "blue" },
          { label: "理由2", sub: "Second, 〜.", tone: "blue" },
          { label: "まとめ", sub: "So, I think 〜.", tone: "yellow" },
        ],
        note: "賛成・反対なら I agree (with 〜). / I don't agree (with 〜). で始めてもよい。",
      },
    },
    {
      heading: "むずかしい日本語は、やさしい日本語にしてから英語に",
      body: "「人見知りだ」「充実している」のような日本語は、そのままの英単語が思いつかないことがあります。そんなときは、{{小学生にもわかる日本語}}に言いかえてから英語にします。知っている単語と文法だけで書くほうが、{{まちがいも少なく}}なります。",
      figure: {
        type: "formula",
        title: "「休日は充実していた」を英語に",
        prose: true,
        steps: [
          { label: "もと", expr: "休日は{{充実していた}}。", note: "英語が思いつかない" },
          { label: "言いかえ", expr: "休日に{{たくさんのことをして楽しかった}}。", note: "やさしい日本語に" },
          { label: "英語", expr: "{{I did many things and had a good time}} on my holiday.", note: "知っている英語で書く" },
        ],
      },
    },
    {
      heading: "中3の文法で、理由をくわしくする",
      body: "理由が「楽しいから」だけでは説得力が弱くなります。中3で習った{{It is 〜 to …}}、{{関係代名詞}}、{{分詞}}などを使うと、1文に情報をたくさん入れられます。ただし、自信のない形を無理に使うより、正しく書ける文を選ぶことが大切です。",
      figure: {
        type: "compare",
        title: "理由をくわしくする形",
        columns: [{ title: "使える形", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "不定詞", cells: ["It is 〜 for 人 to …", "It is fun to travel."] },
          { label: "関係代名詞", cells: ["名詞＋who / that 〜", "a friend who helps me"] },
          { label: "分詞", cells: ["名詞＋-ing / 過去分詞", "a book written in English"] },
        ],
      },
    },
    {
      heading: "書いたら必ず見直す",
      body: "書き終えたら、{{主語と動詞があるか}}、{{時制}}（現在・過去）、主語が3人称単数のときの s、名詞の{{複数形}}をチェックします。Because 〜. だけで文を終えていないかも確かめましょう。because は「〜なので」と前の文につなぐ語なので、I like dogs because they are cute. のように1文にします。",
    },
  ],
  mistakes: [
    { wrong: "I like summer. Because I can swim.", right: "I like summer because I can swim.", why: "because だけの文は不完全。前の文とつなげて1文にします。" },
    { wrong: "I agree this opinion.", right: "I agree with this opinion.", why: "「（意見）に賛成する」は agree with 〜。with を落としやすい。" },
    { wrong: "I want to go to there.", right: "I want to go there.", why: "there（そこへ）は副詞なので、to はつけません。" },
    { wrong: "It is important to studying English.", right: "It is important to study English.", why: "It is 〜 to のあとは動詞の原形です。" },
  ],
  check: [
    { q: "意見文で、理由を2つ並べるときの書き出しの語は？", a: "First, … / Second, …", why: "番号をつけると理由の区切りがはっきりする。" },
    { q: "「私は犬が好きです。なぜならかわいいからです。」を1文の英語に。", a: "I like dogs because they are cute.", why: "because で前の文とつなぐ。dogs は they で受ける。" },
    { q: "「本を読むことは大切だ」を It で始めて英語に。", a: "It is important to read books.", why: "仮の主語 It＋is 〜＋to＋原形。" },
  ],
  next: [
    { label: "4択ドリル「英作文」に挑戦", href: "/learn/eigo-chu/j-en-3-eisakubun" },
    { label: "ふりかえり「英作文」（中1）", href: "/learn/lecture/j-en-1-eisakubun" },
    { label: "使える形をふやす「不定詞の発展」", href: "/learn/lecture/j-en-3-futeishi" },
  ],
};
