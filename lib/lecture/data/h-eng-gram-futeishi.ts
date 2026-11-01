import type { Lecture } from "../types";

export const H_ENG_GRAM_FUTEISHI: Lecture = {
  unit: "h-eng-gram-futeishi",
  title: "不定詞 to ＋原形は3つの役割。「これから」の to と「すでに」の -ing",
  hook: "I want to go. の to go と、I enjoy going. の going。どちらも「行くこと」なのに、動詞によって使える形がちがいます。不定詞は文の中で名詞・形容詞・副詞の3役をこなす便利な形で、動名詞とのちがいは入試の定番です。役割と「時の向き」で整理しましょう。",
  sections: [
    {
      heading: "to ＋原形の3つの用法",
      body: "不定詞は、文の中での{{はたらき}}で3つに分けます。{{名詞的用法}}は「〜すること」で主語・目的語・補語になります。{{形容詞的用法}}は「〜するための・〜すべき」で、名詞を後ろから修飾します。{{副詞的用法}}は動詞や形容詞を説明し、目的（〜するために）・感情の原因（〜して）・結果（〜して…になる）などを表します。",
      figure: {
        type: "tree",
        title: "不定詞の用法",
        root: {
          label: "to ＋動詞の原形",
          tone: "navy",
          children: [
            { label: "名詞的", sub: "〜すること：I want to go.", tone: "blue" },
            { label: "形容詞的", sub: "〜するための：something to drink", tone: "yellow" },
            {
              label: "副詞的",
              tone: "red",
              children: [
                { label: "目的", sub: "went to buy milk" },
                { label: "感情の原因", sub: "glad to see you" },
                { label: "結果", sub: "grew up to be a doctor" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "長い主語は It で置きかえる",
      body: "To understand this book is difficult. のように不定詞が主語だと、頭が重くなります。そこで主語の位置に{{形式主語 It}} を置き、不定詞を後ろへ回します。不定詞の動作をする人（{{意味上の主語}}）は for 人 で示しますが、kind・nice・careless のように{{人の性質}}を言う形容詞なら of 人 にします。",
      figure: {
        type: "formula",
        title: "形式主語 It を使う",
        prose: true,
        steps: [
          { expr: "{{To understand this book}} is difficult for me.", note: "主語が長い" },
          { expr: "{{It}} is difficult for me {{to understand this book}}.", note: "It を主語にし、不定詞を後ろへ" },
          { expr: "It is kind {{of}} you to help me.", note: "人の性質（kind）なら of 人" },
        ],
      },
    },
    {
      heading: "目的語は to か -ing か：動詞で決まる",
      body: "動詞の目的語に不定詞をとるか動名詞をとるかは、動詞ごとに決まっています。大まかには、want, hope, decide のように{{これから先のこと}}に向かう動詞は to、enjoy, finish, mind, avoid, give up のように{{している最中・すでにしたこと}}を表す動詞は -ing です。begin, start, like のようにどちらもとれる動詞もあります。",
      figure: {
        type: "compare",
        title: "目的語の形で分ける動詞",
        columns: [{ title: "to ＋原形だけ", tone: "red" }, { title: "-ing だけ", tone: "blue" }],
        rows: [
          { cells: ["want / hope / wish", "enjoy / finish / mind"] },
          { cells: ["decide / plan / expect", "avoid / give up / put off"] },
          { cells: ["promise / refuse", "practice / consider"] },
        ],
        note: "どちらも可：begin / start / like / love。意味が変わる：remember / forget / stop / try。",
      },
    },
    {
      heading: "remember・forget は「時の向き」で意味が変わる",
      body: "remember・forget などは、to と -ing の両方をとり、意味が変わります。{{remember -ing}} は「（過去に）〜したことを覚えている」、{{remember to 〜}} は「（これから）忘れずに〜する」です。不定詞は{{未来向き}}、動名詞は{{過去向き}}と考えると区別できます。stop -ing は「〜するのをやめる」、stop to 〜 は「〜するために立ち止まる（副詞的用法）」です。",
      figure: {
        type: "numberline",
        title: "remember を「今」に置いて考える",
        min: -2,
        max: 2,
        points: [
          { x: -1.5, label: "meeting", tone: "blue" },
          { x: 0, label: "remember", tone: "yellow" },
          { x: 1.5, label: "to call", tone: "red" },
        ],
        moves: [
          { from: 0, to: -1.5, label: "過去：〜したこと", tone: "blue" },
          { from: 0, to: 1.5, label: "未来：〜すること", tone: "red" },
        ],
        desc: "−2から2の数直線。0に remember、−1.5に meeting（過去にしたこと）、1.5に to call（これからすること）。0から左右へ矢印。",
        note: "I remember meeting him.（会ったのを覚えている）／Remember to call him.（忘れずに電話して）",
      },
    },
  ],
  mistakes: [
    { wrong: "I enjoyed to talk with my friends.", right: "I enjoyed talking with my friends.", why: "enjoy は動名詞を目的語にとります。不定詞はとりません。" },
    { wrong: "It is kind for you to help me.", right: "It is kind of you to help me.", why: "kind は人の性質を表す形容詞なので、意味上の主語は of 人 です。" },
    { wrong: "Don't forget mailing this letter.", right: "Don't forget to mail this letter.", why: "これからすること（手紙を出す）を忘れないで、なので forget to 〜。" },
    { wrong: "I'm looking forward to see you.", right: "I'm looking forward to seeing you.", why: "look forward to の to は前置詞なので、後ろは動名詞です。" },
  ],
  check: [
    { q: "She decided ___ (study) abroad.", a: "to study", why: "decide はこれから先のことを決めるので不定詞をとる。" },
    { q: "I remember ___ (see) her at the party last year.", a: "seeing", why: "last year と過去にしたことを覚えているので remember -ing。" },
    { q: "It is careless ___ you to leave the door open. の ___ は for か of か。", a: "of", why: "careless は人の性質を表すので of 人。" },
  ],
  next: [
    { label: "4択ドリル「不定詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-futeishi" },
    { label: "つぎの単元「動名詞」", href: "/learn/eibunpo-ko/h-eng-gram-domeishi" },
    { label: "関連「分詞構文」", href: "/learn/eibunpo-ko/h-eng-gram-bunshikobun" },
  ],
};
