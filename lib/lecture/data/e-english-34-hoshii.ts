import type { Lecture } from "../types";

export const E_ENGLISH_34_HOSHII: Lecture = {
  unit: "e-english-34-hoshii",
  nameRuby: "ほしいものを伝《つた》える（I want 〜.）",
  title: "I want 〜. で、ほしい物を伝《つた》える",
  hook: "おまつりの店で「わたあめがほしい」、たんじょう日に「新しいボールがほしい」。ほしい物を相手に伝《つた》えられると、買い物やプレゼントえらびがうまくいきます。英語《えいご》では I want 〜. の形をおぼえるだけで、いろいろな物を伝《つた》えられます。",
  sections: [
    {
      heading: "ほしい物は I want のあとに言う",
      body: "「わたしは〜がほしい」は {{I want 〜.}} と言います。I が「わたしは」、{{want}} が「ほしい」で、そのあとにほしい物を言います。日本語とちがって、「ほしい」が物より{{先に来る}}ことに気をつけましょう。",
      figure: {
        type: "formula",
        title: "I want のあとを入れかえる",
        prose: true,
        steps: [
          { expr: "I want {{a ball}}.", note: "ボールがほしい" },
          { expr: "I want {{a new bag}}.", note: "新しいかばんがほしい" },
          { expr: "I want {{juice}}.", note: "ジュースがほしい" },
        ],
        note: "I want までは同じ。うしろの物だけを入れかえれば、いろいろ言えます。",
      },
    },
    {
      heading: "1つの物には a か an をつける",
      body: "ボールやかばんのように1つ、2つと数えられる物が1つのときは、前に {{a}} をつけます。apple や egg や orange のように、はじめの音が日本語の{{ア・イ・ウ・エ・オに近い音}}の語には {{an}} をつけます。決めるのは文字ではなく、はじめの{{音}}です。",
      figure: {
        type: "compare",
        title: "a と an の使い分け",
        columns: [{ title: "a をつける", tone: "blue" }, { title: "an をつける", tone: "yellow" }],
        rows: [
          { label: "はじめの音", cells: ["ア・イ・ウ・エ・オ以外《いがい》", "ア・イ・ウ・エ・オに近い"] },
          { label: "語の例《れい》", cells: ["a ball / a cake", "an apple / an egg"] },
          { label: "語の例《れい》", cells: ["a pencil / a dog", "an orange"] },
        ],
        note: "juice や milk のように数えない物には、a も an もつけません。",
      },
    },
    {
      heading: "2つ以上《いじょう》なら s をつける",
      body: "ほしい物が2つ以上《いじょう》のときは、数のあとに物の名前を言い、{{語の終わりに s}} をつけます。two apples、three pencils のようになります。店でたのむときは、終わりに {{please}} をつけると、ていねいな言い方になります。",
      figure: {
        type: "area",
        kind: "bar",
        title: "りんごの数と言い方",
        max: 3,
        bars: [
          { label: "1つ", parts: [{ value: 1, tone: "red" }], total: "an apple" },
          { label: "2つ", parts: [{ value: 1, tone: "red" }, { value: 1, tone: "red" }], total: "two apples" },
          { label: "3つ", parts: [{ value: 1, tone: "red" }, { value: 1, tone: "red" }, { value: 1, tone: "red" }], total: "three apples" },
        ],
        note: "2つからは a・an をつけず、数と s を使います。",
      },
    },
    {
      heading: "たずねる・答える",
      body: "相手に何がほしいかを聞くときは {{What do you want?}} とたずね、I want 〜. で答えます。「〜はほしいですか」と聞くときは {{Do you want 〜?}} です。答えは、ほしいなら {{Yes, I do.}}、ほしくないなら {{No, I don't.}} と言います。",
      figure: {
        type: "flow",
        dir: "col",
        title: "店でのやりとり",
        steps: [
          { label: "What do you want?", sub: "何がほしいですか", tone: "navy" },
          { label: "A cake, please.", sub: "ケーキをください", tone: "yellow" },
          { label: "Here you are.", sub: "はい、どうぞ", tone: "blue" },
          { label: "Thank you.", sub: "ありがとう" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "I'm want a ball.", right: "I want a ball.", why: "want の前に am はいりません。I のすぐあとに want を言います。" },
    { wrong: "I want a apple.", right: "I want an apple.", why: "apple はアに近い音で始まるので、a ではなく an をつけます。" },
    { wrong: "Three apple, please.", right: "Three apples, please.", why: "2つ以上《いじょう》のときは、物の名前の終わりに s をつけます。" },
    { wrong: "Do you want milk? — Yes, I want.", right: "Yes, I do.", why: "Do you 〜? と聞かれたら、Yes, I do. か No, I don't. で答えます。" },
  ],
  check: [
    { q: "I want ___ egg. の ___ に入るのは a と an のどちら？", a: "an", why: "egg はエに近い音で始まるので an。" },
    { q: "「えんぴつを2本ください」を英語《えいご》で言うと？", a: "Two pencils, please.", why: "2つ以上《いじょう》なので pencil に s をつけ、ていねいに please。" },
    { q: "Do you want a cookie? に「ほしくない」と答えると？", a: "No, I don't.", why: "Do you 〜? には do を使って答える。" },
  ],
  next: [
    { label: "ドリルで「ほしいものを伝《つた》える」を練習する", href: "/learn/eigo-sho/e-english-34-hoshii" },
    { label: "「好《す》きなものを伝《つた》える（I like 〜.）」（ドリル）", href: "/learn/eigo-sho/e-english-34-suki" },
    { label: "「数の言い方」（ドリル）", href: "/learn/eigo-sho/e-english-34-kazu" },
  ],
};
