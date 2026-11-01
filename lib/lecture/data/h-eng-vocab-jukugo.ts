import type { Lecture } from "../types";

export const H_ENG_VOCAB_JUKUGO: Lecture = {
  unit: "h-eng-vocab-jukugo",
  title: "熟語は「動詞＋前置詞・副詞」の組み合わせ。小さな語のイメージで意味をつかむ",
  hook: "look は「見る」なのに、look after は「世話をする」、look up は「（辞書で）調べる」になります。熟語は丸暗記するものと思われがちですが、up・out・off のような小さな語にはそれぞれイメージがあり、それが意味を決めています。しくみがわかると、覚える量がぐっと減り、文の中でも見つけやすくなります。",
  sections: [
    {
      heading: "同じ動詞でも、後ろの語で意味が変わる",
      body: "熟語の多くは、{{基本動詞}}（look, take, put, get など）に{{前置詞や副詞}}がついてできています。動詞の意味に、後ろの語の向き・イメージが加わると考えましょう。look for は「〜のほうへ目を向ける」から「探す」、look into は「中をのぞく」から「調べる」になります。",
      figure: {
        type: "tree",
        title: "look ＋ 小さな語",
        root: {
          label: "look",
          sub: "目を向ける",
          tone: "yellow",
          children: [
            { label: "look at", sub: "〜を見る", tone: "blue" },
            { label: "look for", sub: "〜を探す", tone: "blue" },
            { label: "look after", sub: "〜の世話をする", tone: "blue" },
            { label: "look into", sub: "〜を調べる", tone: "blue" },
          ],
        },
      },
    },
    {
      heading: "前置詞・副詞のコアイメージ",
      body: "up・out・off・on などは、場所の向きだけでなく{{「完全に」「なくなる」「続ける」}}のような意味も表します。eat up が「全部食べる」なのは、up に{{「すっかり・最後まで」}}のイメージがあるからです。新しい熟語に出会ったら、小さな語のコアに当てはめて考えてみましょう。",
      figure: {
        type: "compare",
        title: "小さな語のコアと熟語",
        columns: [{ title: "語" }, { title: "コア", tone: "yellow" }, { title: "熟語の例" }],
        rows: [
          { cells: ["up", "上へ・すっかり", "use up 使い切る"] },
          { cells: ["out", "外へ・なくなる", "run out of 切らす"] },
          { cells: ["off", "離れる・切れる", "put off 延期する"] },
          { cells: ["on", "くっつく・続く", "go on 続ける"] },
        ],
      },
    },
    {
      heading: "目的語の位置：代名詞は「動詞と副詞のあいだ」",
      body: "pick up（拾う）の up は{{副詞}}なので、目的語は up の前にも後ろにも置けます。ところが目的語が it・them などの{{代名詞}}だと、{{必ず動詞と副詞のあいだ}}に入れます。look for の for は前置詞なので、目的語はいつも for の後ろです。",
      figure: {
        type: "formula",
        title: "目的語をどこに置くか",
        prose: true,
        steps: [
          { expr: "Pick up {{the cup}}.", note: "◯ 名詞は副詞の後ろでもよい" },
          { expr: "Pick {{the cup}} up.", note: "◯ 名詞は動詞と副詞のあいだでもよい" },
          { expr: "Pick {{it}} up.", note: "◯ 代名詞はあいだに入れる" },
          { expr: "Pick up {{it}}.", note: "✕ 代名詞を副詞の後ろに置けない" },
          { expr: "I'm looking for {{it}}.", note: "◯ for は前置詞。目的語はいつも後ろ" },
        ],
      },
    },
    {
      heading: "1語の動詞で言いかえて覚える",
      body: "熟語は、同じ意味の{{1語の動詞}}と組で覚えると、読むときも書くときも役に立ちます。会話では熟語、かたい文章では1語の動詞がよく使われます。言いかえ問題でもよく問われるので、意味と合わせてセットにしておきましょう。",
      figure: {
        type: "compare",
        title: "熟語と1語の言いかえ",
        columns: [{ title: "熟語", tone: "blue" }, { title: "1語", tone: "yellow" }, { title: "意味" }],
        rows: [
          { cells: ["put off", "postpone", "延期する"] },
          { cells: ["carry out", "perform", "実行する"] },
          { cells: ["look up to", "respect", "尊敬する"] },
          { cells: ["come up with", "think of", "思いつく"] },
        ],
        note: "think of も熟語だが、come up with の言いかえとしてよく使う。",
      },
    },
  ],
  mistakes: [
    { wrong: "I found your key. I'll pick up it.", right: "I'll pick it up.", why: "pick up の up は副詞。目的語が代名詞のときは、動詞と副詞のあいだに入れます。" },
    { wrong: "I'm looking forward to see you.", right: "I'm looking forward to seeing you.", why: "look forward to の to は前置詞なので、後ろは動詞の -ing 形（動名詞）にします。" },
    { wrong: "She takes after her little brother.（世話をする、のつもり）", right: "She looks after her little brother.", why: "take after は「（親など）に似ている」。「世話をする」は look after です。" },
  ],
  check: [
    { q: "We have run ___ of milk. Let's buy some. の ___ は？", a: "out", why: "run out of 〜 で「〜を切らす・使い果たす」。out の「なくなる」イメージ。" },
    { q: "put off を1語の動詞で言いかえると？", a: "postpone", why: "どちらも「延期する」。off の「離れる」イメージで、予定を先へ離す。" },
    { q: "「それを書き留めなさい」を write ___ ___ で表すと？", a: "Write it down.", why: "write down の down は副詞。代名詞 it は動詞と副詞のあいだに入れる。" },
  ],
  next: [
    { label: "英熟語で覚える", href: "/learn/jukugo" },
    { label: "ひとつ前「英単語2000」", href: "/learn/eitango" },
    { label: "関連「前置詞」", href: "/learn/eibunpo-ko/h-eng-gram-zenchishi" },
  ],
};
