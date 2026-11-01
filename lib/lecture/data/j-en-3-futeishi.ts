import type { Lecture } from "../types";

export const J_EN_3_FUTEISHI: Lecture = {
  unit: "j-en-3-futeishi",
  title: "不定詞の発展は「It is ～ to」「疑問詞＋to」「人＋to」の3つの型",
  hook: "「英語を話すのは楽しい」「料理のしかたを知りたい」「母は私に早く寝てほしいと思っている」。どれも中2で習った to＋動詞の原形を使えば言えますが、置く場所や組み合わせに決まった{{型}}があります。型を知ると、言いたいことをぐっと自然な英語にできます。",
  sections: [
    {
      heading: "長い主語は It で先に置く",
      body: "To speak English is fun. は正しい文ですが、英語は{{頭が長い文}}をきらいます。そこで仮の主語 {{It}} を先に置き、本当の主語 to speak English をうしろに回して It is fun to speak English. とします。この It は「それ」と訳しません。「だれにとって」を言いたいときは、to の前に {{for＋人}} を入れます。",
      figure: {
        type: "formula",
        title: "「英語を話すことは私にとって楽しい」",
        prose: true,
        steps: [
          { expr: "{{To speak English}} is fun.", note: "主語が長い" },
          { expr: "{{It}} is fun {{to speak English}}.", note: "It を先に、to 以下をうしろへ" },
          { expr: "It is fun {{for me}} to speak English.", note: "「私にとって」は to の前に" },
        ],
        note: "for のあとの代名詞は me・him・her・us・them の形（目的格）にします。",
      },
    },
    {
      heading: "疑問詞＋to で「何を〜すべきか」",
      body: "how・what・where・when などの疑問詞のうしろに to＋動詞の原形を続けると、{{ひとまとまりの名詞}}になり、know や tell の目的語として使えます。とくに {{how to 〜（〜のしかた）}} はよく出ます。what to do は「何をすべきか」、where to go は「どこへ行けばよいか」です。",
      figure: {
        type: "compare",
        title: "疑問詞＋to の意味",
        columns: [{ title: "意味", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "how to", cells: ["〜のしかた", "how to cook"] },
          { label: "what to", cells: ["何を〜すべきか", "what to buy"] },
          { label: "where to", cells: ["どこへ〜すべきか", "where to go"] },
          { label: "when to", cells: ["いつ〜すべきか", "when to start"] },
        ],
        note: "例：I don't know what to say.（何と言えばよいかわからない）",
      },
    },
    {
      heading: "want・tell・ask＋人＋to",
      body: "「（人）に〜してほしい」「（人）に〜するように言う」のように、{{動作をするのが主語ではなく別の人}}のときは、動詞のあとに人を置いてから to＋動詞の原形を続けます。I want {{you to come}}. では、来るのは I ではなく you です。人の部分は me・him・her などの目的格にします。",
      figure: {
        type: "compare",
        title: "動詞＋人＋to の3つ",
        columns: [{ title: "want", tone: "blue" }, { title: "tell", tone: "yellow" }, { title: "ask", tone: "red" }],
        rows: [
          { cells: ["人に〜してほしい", "人に〜するよう言う", "人に〜するよう頼む"] },
          { cells: ["I want you to help.", "He told me to wait.", "I asked her to sing."] },
        ],
      },
    },
    {
      heading: "let・make・help は to をつけない",
      body: "同じ「動詞＋人＋動作」の形でも、let（〜させてあげる）・make（〜させる）・help（〜するのを手伝う）のあとは、{{to のない動詞の原形}}を置きます。Let me {{try}}.（私にやらせて）、My mother made me {{clean}} my room.（母は私に部屋をそうじさせた）のようになります。",
      figure: {
        type: "tree",
        title: "人のあとの動詞の形",
        root: {
          label: "動詞＋人＋動作",
          children: [
            { label: "to＋原形", sub: "want / tell / ask", tone: "blue", children: [{ label: "tell him to go" }] },
            { label: "原形だけ", sub: "let / make / help", tone: "yellow", children: [{ label: "let him go" }] },
          ],
        },
        note: "help は to をつけた help him to carry も使われますが、中学では原形の形で覚えます。",
      },
    },
  ],
  mistakes: [
    { wrong: "It is difficult for I to swim.", right: "It is difficult for me to swim.", why: "for のあとは目的格。I ではなく me にします。" },
    { wrong: "I want that you come.", right: "I want you to come.", why: "「人に〜してほしい」は want＋人＋to＋原形。that の文は使いません。" },
    { wrong: "Let me to try.", right: "Let me try.", why: "let・make のあとは to をつけない原形です。" },
    { wrong: "I don't know how cook it.", right: "I don't know how to cook it.", why: "「〜のしかた」は how to＋原形。to を落とさないこと。" },
  ],
  check: [
    { q: "To play the piano is easy for her. を It で始めて書きかえると？", a: "It is easy for her to play the piano.", why: "仮の主語 It を先に置き、to 以下をうしろへ回す。" },
    { q: "「先生は私たちに静かにするように言った」の ( )：The teacher told ( ) ( ) be quiet.", a: "us / to", why: "tell＋人（目的格）＋to＋原形。" },
    { q: "「どこで電車に乗ればいいか」を英語の3語で？", a: "where to take（the train）", why: "疑問詞 where＋to＋動詞の原形。" },
  ],
  next: [
    { label: "4択ドリル「不定詞の発展」に挑戦", href: "/learn/eibunpo-chu/j-en-3-futeishi" },
    { label: "ふりかえり「不定詞」（中2）のレクチャー", href: "/learn/lecture/j-en-2-futeishi" },
    { label: "つぎの単元「分詞の後置修飾」", href: "/learn/lecture/j-en-3-bunshi" },
  ],
};
