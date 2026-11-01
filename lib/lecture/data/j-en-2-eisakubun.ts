import type { Lecture } from "../types";

export const J_EN_2_EISAKUBUN: Lecture = {
  unit: "j-en-2-eisakubun",
  title: "英作文は短い文に分けてつなぐ。意見は「理由」とセットで書く",
  hook: "中2になると「〜したとき」「もし〜なら」「〜するために」など、長めの内容を英語にする問題がふえます。テストでは「あなたの意見と理由を書きなさい」という{{自由英作文}}もよく出ます。長い日本語も、決まった手順で短い文に分ければ、習った文法で書けます。",
  sections: [
    {
      heading: "長い文は2つに分けて、接続詞でつなぐ",
      body: "「明日雨が降ったら、家にいます」は、「雨が降る」と「家にいる」の{{2つの文}}に分けて考えます。それぞれを英語にしてから、{{if・when・because}} などの接続詞でつなぎます。if や when のあとでは、未来のことでも{{現在形}}を使うのがルールです。",
      figure: {
        type: "formula",
        title: "「明日雨が降ったら、家にいます」",
        prose: true,
        steps: [
          { label: "分ける", expr: "雨が降る ／ 家にいる", note: "2つの文にする" },
          { label: "英語に", expr: "it rains ／ I will stay home", note: "1つずつ英語に" },
          { label: "つなぐ", expr: "{{If}} it {{rains}} tomorrow, I will stay home.", note: "if のあとは現在形" },
        ],
      },
    },
    {
      heading: "「〜するために」「〜すること」は to＋動詞の原形",
      body: "「英語を勉強するために図書館へ行った」の「〜するために」は、{{不定詞（to＋動詞の原形）}}で表します。「〜すること」「〜するための」も同じ形です。to のあとは、主語や時に関係なく{{いつも原形}}にします。",
      figure: {
        type: "compare",
        title: "日本語から不定詞を見つける",
        columns: [{ title: "日本語" }, { title: "英語", tone: "yellow" }],
        rows: [
          { label: "〜するために", cells: ["会うために", "to see him"] },
          { label: "〜すること", cells: ["読むことが好き", "like to read"] },
          { label: "〜するための", cells: ["寝るための時間", "time to sleep"] },
        ],
      },
    },
    {
      heading: "意見文は「意見 → 理由2つ → まとめ」の型",
      body: "「あなたは〜に賛成ですか」などと聞かれたら、まず {{I think 〜.}} で意見を言い切ります。次に First, 〜. Second, 〜. で{{理由を2つ}}書き、最後に So, 〜. などでまとめます。型が決まっていれば、中身を考えることに集中できます。",
      figure: {
        type: "flow",
        title: "意見文の組み立て",
        dir: "col",
        steps: [
          { label: "意見", sub: "I think (that) 〜.", tone: "navy" },
          { label: "理由 1", sub: "First, 〜." },
          { label: "理由 2", sub: "Second, 〜." },
          { label: "まとめ", sub: "So, 〜.", tone: "yellow" },
        ],
        note: "例：I like summer better than winter. First, I can swim in the sea. Second, summer vacation is long.",
      },
    },
    {
      heading: "書けない語は、やさしい日本語に言いかえる",
      body: "「満喫した」「感動した」のように英語が浮かばない語は、まず{{やさしい日本語}}に言いかえてから英語にします。むずかしい単語に挑戦するより、{{確実に書ける表現}}でミスなく書くほうが点になります。最後に、主語と動詞の形・時・つづりを見直しましょう。",
      figure: {
        type: "flow",
        title: "言いかえてから英語にする",
        steps: [
          { label: "夏休みを満喫した", tone: "plain" },
          { label: "とても楽しんだ", tone: "blue" },
          { label: "I enjoyed it", sub: "very much", tone: "yellow" },
        ],
        arrows: ["言いかえ", "英語に"],
      },
    },
  ],
  mistakes: [
    { wrong: "If it will rain tomorrow, I will stay home.", right: "If it rains tomorrow, I will stay home.", why: "if（もし〜なら）のあとは、未来のことでも現在形を使います。" },
    { wrong: "I went to the library to studied.", right: "I went to the library to study.", why: "to のあとはいつも動詞の原形です。" },
    { wrong: "I like summer. Because I can swim.", right: "I like summer because I can swim.", why: "because は文と文をつなぐ語。英作文では because だけの文にしません。" },
  ],
  check: [
    { q: "「私が家に帰ったとき、母は料理をしていました」を英語にしましょう。", a: "When I came home, my mother was cooking.", why: "when で2つの文をつなぐ。「していた」は過去進行形。" },
    { q: "「私は写真をとるために京都へ行きました」を英語にしましょう。", a: "I went to Kyoto to take pictures.", why: "「〜するために」は to＋原形。" },
    { q: "意見文で理由を2つ並べるとき、それぞれの文の最初に置くことばは？", a: "First, 〜. / Second, 〜.", why: "順番を示すことばで、読む人に理由の数が伝わる。" },
  ],
  next: [
    { label: "4択ドリル「英作文」に挑戦", href: "/learn/eigo-chu/j-en-2-eisakubun" },
    { label: "文をつなぐ「接続詞」のレクチャー", href: "/learn/lecture/j-en-2-setsuzokushi" },
    { label: "「〜するために」の「不定詞」のレクチャー", href: "/learn/lecture/j-en-2-futeishi" },
  ],
};
