import type { Lecture } from "../types";

export const J_EN_2_BUNKEI: Lecture = {
  unit: "j-en-2-bunkei",
  title: "文型は動詞のあとを見る。SVOO は「人に物を」、SVOC は「O＝C」",
  hook: "誕生日に「友だちにプレゼントをあげた」、ペットを「ポチと呼んでいる」。こうした文は、動詞のあとに語が2つ並ぶのが特徴です。並び方で意味が決まるので、形を見分けられると長い英文も正しく読めるようになります。",
  sections: [
    {
      heading: "動詞のあとに何が来るかで文型が決まる",
      body: "英語の文は、主語（S）と動詞（V）のあとに何が来るかで型が分かれます。{{目的語（O）}}は「〜を・〜に」にあたる語、{{補語（C）}}は主語や目的語が「何か・どんなか」を説明する語です。中2では、動詞のあとに2つの語が並ぶ{{SVOO}}（人に物を〜する）と{{SVOC}}（OをCにする・と呼ぶ）を学びます。",
      figure: {
        type: "tree",
        title: "動詞のあとから文型を見分ける",
        root: {
          label: "動詞のあと",
          children: [
            {
              label: "語が1つ",
              tone: "blue",
              children: [
                { label: "SVC", sub: "You look happy." },
                { label: "SVO", sub: "I like tea." },
              ],
            },
            {
              label: "語が2つ",
              tone: "yellow",
              children: [
                { label: "SVOO", sub: "人に＋物を", tone: "blue" },
                { label: "SVOC", sub: "O＝C", tone: "red" },
              ],
            },
          ],
        },
        note: "SVC の C は主語の説明（You＝happy）。SVO の O は「〜を」にあたる語。",
      },
    },
    {
      heading: "SVOO：「人に」が先、「物を」があと",
      body: "give・show・tell・teach・send・buy・make などは、あとに{{人＋物}}の2つを並べられます。I gave Ken a book. は「ケンに本をあげた」です。順番は必ず{{「人」が先、「物」があと}}で、人が代名詞なら me・him・her・us・them などの{{目的格}}にします。物を先に言いたいときは、人の前に to か for を置いて SVO の文にします。",
      figure: {
        type: "formula",
        title: "I gave Ken a book. を書きかえる",
        prose: true,
        steps: [
          { label: "SVOO", expr: "I gave {{Ken}} {{a book}}.", note: "人 → 物の順" },
          { label: "SVO", expr: "I gave {{a book to Ken}}.", note: "物を先にすると to ＋ 人" },
          { label: "代名詞", expr: "I gave {{him}} a book.", note: "人は目的格（he → him）" },
        ],
      },
    },
    {
      heading: "to を使う動詞、for を使う動詞",
      body: "物を先に出すとき、人の前に置くのは{{to か for}}です。相手に{{届ける・伝える}}動詞（give・show・tell・teach・send）は {{to}}、相手の{{ために用意する}}動詞（buy・make・cook）は {{for}} を使います。「相手がいないとできない」なら to、「1人でもできて、相手のためにする」なら for と考えると区別しやすくなります。",
      figure: {
        type: "compare",
        title: "物を先にするときの to と for",
        columns: [{ title: "to を使う", tone: "blue" }, { title: "for を使う", tone: "yellow" }],
        rows: [
          { label: "動詞", cells: ["give / show / tell", "buy / make / cook"] },
          { label: "動詞", cells: ["teach / send", "get / find"] },
          { label: "意味", cells: ["相手に届ける・伝える", "相手のために用意する"] },
          { label: "例", cells: ["send a card to her", "make a cake for her"] },
        ],
      },
    },
    {
      heading: "SVOC：O と C の間に「＝」が成り立つ",
      body: "call・name・make は、あとに O と C を並べて「OをCと{{呼ぶ}}」「OをCと{{名づける}}」「OをCに{{する}}」を表します。We call the dog Pochi. では the dog＝Pochi、The news made me happy. では me＝happy の関係があります。動詞のあとの2つの語の間に{{「＝」が成り立てば SVOC}}、成り立たなければ SVOO と見分けられます。",
      figure: {
        type: "compare",
        title: "同じ make でも文型がちがう",
        columns: [{ title: "SVOO" }, { title: "SVOC", tone: "yellow" }],
        rows: [
          { label: "例", cells: ["She made me a cake.", "She made me happy."] },
          { label: "意味", cells: ["私にケーキを作った", "私を幸せにした"] },
          { label: "2つの語", cells: ["me ≠ a cake", "me ＝ happy"] },
          { label: "あとの語", cells: ["人 ＋ 物", "O ＋ 名詞・形容詞"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "I gave a book Ken.", right: "I gave Ken a book. / I gave a book to Ken.", why: "SVOO は「人 → 物」の順。物を先にするなら、人の前に to が必要です。" },
    { wrong: "She showed I her picture.", right: "She showed me her picture.", why: "動詞のあとの「人」は目的格（me・him・her）にします。" },
    { wrong: "My mother made a cake to me.", right: "My mother made a cake for me.", why: "make は「相手のために用意する」動詞なので for を使います。" },
    { wrong: "The song made me happily.", right: "The song made me happy.", why: "C には形容詞や名詞が入ります。happily は副詞なので C になれません。" },
  ],
  check: [
    { q: "My uncle bought me a bike. を for を使って書きかえましょう。", a: "My uncle bought a bike for me.", why: "buy は for を使う動詞。物（a bike）を先にして for me。" },
    { q: "We call him Taku. は SVOO と SVOC のどっち？", a: "SVOC", why: "him＝Taku の関係が成り立つ。" },
    { q: "「彼女は私たちに英語を教えています」を英語にしましょう。", a: "She teaches us English. (She teaches English to us.)", why: "teach は SVOO がとれる。人（us）→ 物（English）の順。" },
  ],
  next: [
    { label: "4択ドリル「文型（SVOO・SVOC）」に挑戦", href: "/learn/eibunpo-chu/j-en-2-bunkei" },
    { label: "目的格を確かめる「代名詞」のレクチャー", href: "/learn/lecture/j-en-1-daimeishi" },
    { label: "つぎに「比較」", href: "/learn/eibunpo-chu/j-en-2-hikaku" },
  ],
};
