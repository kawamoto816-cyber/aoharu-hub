import type { Lecture } from "../types";

export const H_ENG_GRAM_DOMEISHI: Lecture = {
  unit: "h-eng-gram-domeishi",
  title: "動名詞は「〜すること」を名詞として使う形。to 不定詞との使い分けがカギ",
  hook: "趣味を聞かれて I like playing the guitar. と答えるとき、playing は「ひくこと」という名詞のはたらきをしています。動名詞は、不定詞とよく似ているのに、動詞によっては片方しか使えなかったり、意味が変わったりします。そのちがいの理由をつかむと、入試の4択がぐっと解きやすくなります。",
  sections: [
    {
      heading: "動名詞は名詞の席ならどこにでも座れる",
      body: "動名詞は動詞の {{-ing 形}}で「{{〜すること}}」を表し、文の中で名詞と同じ働きをします。主語・目的語・補語になれるほか、不定詞とちがって{{前置詞の後ろ}}にも置けます。動詞の性質も残っているので、後ろに目的語や副詞をつなげられます。",
      figure: {
        type: "tree",
        title: "動名詞の働き",
        root: {
          label: "動名詞 -ing",
          sub: "〜すること",
          tone: "navy",
          children: [
            { label: "主語", sub: "Reading is fun", tone: "blue" },
            { label: "動詞の目的語", sub: "enjoy cooking", tone: "blue" },
            { label: "補語", sub: "is teaching", tone: "blue" },
            { label: "前置詞の目的語", sub: "good at -ing", tone: "yellow" },
          ],
        },
        note: "前置詞の後ろに to 不定詞は置けない。動詞の形を置くなら動名詞。",
      },
    },
    {
      heading: "動名詞だけをとる動詞、不定詞だけをとる動詞",
      body: "動名詞は「{{すでにしていること・実際のこと}}」、to 不定詞は「{{これから先のこと}}」に向きやすい、と考えると整理できます。そのため、楽しむ・終える・やめる・避けるなどの動詞は{{動名詞}}、望む・決める・計画する・約束するなどの動詞は{{不定詞}}を目的語にとります。",
      figure: {
        type: "compare",
        title: "目的語の形が決まっている動詞",
        columns: [{ title: "動名詞だけ（実際のこと）", tone: "blue" }, { title: "不定詞だけ（これから）", tone: "yellow" }],
        rows: [
          { cells: ["enjoy（楽しむ）", "want（したい）"] },
          { cells: ["finish（終える）", "hope（望む）"] },
          { cells: ["mind（いやがる）", "decide（決める）"] },
          { cells: ["avoid（避ける）", "plan（計画する）"] },
          { cells: ["give up（やめる）", "promise（約束する）"] },
        ],
        note: "この考え方は目安。例外もあるので、よく出る動詞は組で覚える。",
      },
    },
    {
      heading: "どちらもとれるが、意味が変わる動詞",
      body: "remember・forget・regret・try は、どちらも目的語にとれますが意味が変わります。ここでも、{{-ing は「したこと（過去）」}}、{{to do は「これからすること」}}です。stop は目的語に動名詞だけをとり、stop to do の to do は「〜するために」という副詞的用法なので注意しましょう。",
      figure: {
        type: "compare",
        title: "-ing と to do で意味が変わる",
        columns: [{ title: "＋ -ing（したこと）", tone: "blue" }, { title: "＋ to do（これから）", tone: "yellow" }],
        rows: [
          { label: "remember", cells: ["〜したのを覚えている", "忘れずに〜する"] },
          { label: "forget", cells: ["〜したのを忘れる", "〜するのを忘れる"] },
          { label: "regret", cells: ["〜したのを後悔する", "残念ながら〜する"] },
          { label: "try", cells: ["ためしに〜してみる", "〜しようと努める"] },
        ],
      },
    },
    {
      heading: "意味上の主語・否定・完了形",
      body: "動名詞の動作をする人が文の主語とちがうときは、-ing の前に{{所有格か目的格}}を置きます（{{意味上の主語}}）。否定は {{not を -ing の前}}に置きます。述語動詞より{{前のこと}}を表すときは having ＋過去分詞（完了動名詞）を使います。",
      figure: {
        type: "formula",
        title: "that 節を動名詞で書きかえる",
        prose: true,
        steps: [
          { expr: "I'm sure {{that he will win}}.", note: "勝つのは he" },
          { expr: "I'm sure of {{his}} winning.", note: "意味上の主語 his を -ing の前に" },
          { expr: "She is proud {{that she was}} a nurse.", note: "看護師だったのは過去" },
          { expr: "She is proud of {{having been}} a nurse.", note: "前のことは having ＋過去分詞" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "I enjoyed to talk with her.", right: "I enjoyed talking with her.", why: "enjoy は動名詞だけを目的語にとります。" },
    { wrong: "I'm looking forward to see you.", right: "I'm looking forward to seeing you.", why: "look forward to の to は前置詞なので、後ろは動名詞です。" },
    { wrong: "Thank you for invite me.", right: "Thank you for inviting me.", why: "前置詞 for の後ろに動詞を置くときは動名詞にします。" },
    { wrong: "I remember to visit this temple as a child.", right: "I remember visiting this temple as a child.", why: "子どものころに「訪れたこと」は過去なので -ing。to do は「忘れずに〜する」になります。" },
  ],
  check: [
    { q: "Would you mind ___ (open) the door?", a: "opening", why: "mind は動名詞だけを目的語にとる。" },
    { q: "Don't forget ___ (lock) the door when you leave.", a: "to lock", why: "これから「かぎをかけること」なので to 不定詞。" },
    { q: "He is ashamed of ___ (be) lazy last year. の空所を2語で。", a: "having been", why: "去年のことで、述語の is より前なので完了動名詞。" },
  ],
  next: [
    { label: "4択ドリル「動名詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-domeishi" },
    { label: "ひとつ前「不定詞」", href: "/learn/eibunpo-ko/h-eng-gram-futeishi" },
    { label: "つぎの単元「分詞」", href: "/learn/eibunpo-ko/h-eng-gram-bunshi" },
  ],
};
