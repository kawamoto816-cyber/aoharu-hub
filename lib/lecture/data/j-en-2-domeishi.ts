import type { Lecture } from "../types";

export const J_EN_2_DOMEISHI: Lecture = {
  unit: "j-en-2-domeishi",
  title: "動名詞は -ing で「〜すること」。enjoy や前置詞のあとは -ing",
  hook: "「サッカーをするのが好き」「ピアノをひき終えた」「来てくれてありがとう」。英語では、動詞に -ing をつけて「〜すること」という名詞のかたまりにできます。これが動名詞です。不定詞と同じ「〜すること」でも、動詞によってどちらを使うかが決まっているので、そこが大きなポイントです。",
  sections: [
    {
      heading: "動詞の -ing 形が「〜すること」になる",
      body: "動名詞は{{動詞の -ing 形}}で、「〜すること」という{{名詞のはたらき}}をします。名詞と同じように、文の主語、動詞の目的語、be動詞のあと（補語）、前置詞のあとに置けます。形は進行形の -ing と同じですが、be動詞といっしょに「〜している」となっているかどうかで見分けます。",
      figure: {
        type: "compare",
        title: "動名詞が入る場所",
        columns: [{ title: "例文", tone: "yellow" }, { title: "意味" }],
        rows: [
          { label: "主語", cells: ["{{Swimming}} is fun.", "泳ぐことは楽しい"] },
          { label: "目的語", cells: ["I like {{reading}}.", "読むことが好き"] },
          { label: "補語", cells: ["My hobby is {{cooking}}.", "趣味は料理すること"] },
          { label: "前置詞の後", cells: ["Thank you for {{coming}}.", "来てくれてありがとう"] },
        ],
        note: "主語の動名詞は1つのことなので、be動詞は is（Swimming is ...）。",
      },
    },
    {
      heading: "動名詞だけをとる動詞、不定詞だけをとる動詞",
      body: "{{enjoy・finish・stop}} などは、あとに{{動名詞だけ}}をとります。反対に {{want・hope・decide}} などは{{不定詞（to ＋ 原形）だけ}}です。{{like・start・begin}} などは、どちらをとってもほぼ同じ意味になります。enjoy は「楽しむこと」、finish は「終えること」のように、すでにしている・したことに目を向ける動詞は動名詞、これからのことに向かう動詞は不定詞、と考えると覚えやすくなります。",
      figure: {
        type: "tree",
        title: "あとに続く形で動詞を分ける",
        root: {
          label: "「〜すること」が続く動詞",
          children: [
            { label: "動名詞だけ", sub: "-ing", tone: "yellow", children: [{ label: "enjoy / finish", sub: "stop など" }] },
            { label: "不定詞だけ", sub: "to ＋ 原形", tone: "blue", children: [{ label: "want / hope", sub: "decide など" }] },
            { label: "どちらも", sub: "意味はほぼ同じ", tone: "plain", children: [{ label: "like / start", sub: "begin など" }] },
          ],
        },
        note: "stop ～ing は「〜するのをやめる」。stop to ～ は「〜するために立ち止まる」で意味が変わる。",
      },
    },
    {
      heading: "前置詞のあとの動詞は必ず -ing",
      body: "at・for・about・of・in などの{{前置詞のあと}}に動詞を置くときは、必ず{{動名詞}}にします。不定詞（to ＋ 原形）や原形はおけません。be good at 〜ing（〜するのが得意）、Thank you for 〜ing（〜してくれてありがとう）、How about 〜ing?（〜するのはどうですか）は決まった言い方として覚えましょう。",
      figure: {
        type: "formula",
        title: "前置詞のあとを -ing にする",
        prose: true,
        steps: [
          { expr: "I am good at {{swim}}.", note: "× at のあとに原形" },
          { expr: "I am good at {{swimming}}.", note: "○ swim → swimming" },
          { expr: "How about {{going}} to the park?", note: "○ 〜するのはどう？" },
          { expr: "Thank you for {{helping}} me.", note: "○ 〜してくれてありがとう" },
        ],
        note: "-ing のつけ方：make → making（e をとる）、run → running（重ねる）。",
      },
    },
  ],
  mistakes: [
    { wrong: "I enjoyed to talk with her.", right: "I enjoyed talking with her.", why: "enjoy のあとは動名詞だけです。不定詞はとりません。" },
    { wrong: "I want going to Hokkaido.", right: "I want to go to Hokkaido.", why: "want のあとは不定詞だけです。" },
    { wrong: "He is good at play the guitar.", right: "He is good at playing the guitar.", why: "前置詞 at のあとの動詞は動名詞にします。" },
    { wrong: "Reading books are fun.", right: "Reading books is fun.", why: "主語は「本を読むこと」という1つのことなので is。books につられて are にしないようにします。" },
  ],
  check: [
    { q: "She finished ___ (write) the letter. の ( ) の語を正しい形に。", a: "writing", why: "finish のあとは動名詞。write は e をとって writing。" },
    { q: "「写真をとるのはどうですか」を How about を使って英語に。", a: "How about taking pictures?", why: "前置詞 about のあとは動名詞 taking。" },
    { q: "I like to sing. を動名詞を使って書きかえましょう。", a: "I like singing.", why: "like は不定詞・動名詞のどちらもとり、意味はほぼ同じ。" },
  ],
  next: [
    { label: "4択ドリル「動名詞」に挑戦", href: "/learn/eibunpo-chu/j-en-2-domeishi" },
    { label: "もう1つの「〜すること」＝「不定詞」", href: "/learn/eibunpo-chu/j-en-2-futeishi" },
    { label: "つぎに「文型（SVOO・SVOC）」", href: "/learn/eibunpo-chu/j-en-2-bunkei" },
  ],
};
