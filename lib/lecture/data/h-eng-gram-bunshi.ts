import type { Lecture } from "../types";

export const H_ENG_GRAM_BUNSHI: Lecture = {
  unit: "h-eng-gram-bunshi",
  title: "分詞は形容詞のはたらき。「する」なら -ing、「される」なら過去分詞",
  hook: "a sleeping cat（ねむっているねこ）や a broken cup（割れたカップ）のように、動詞を形容詞として使うのが分詞です。-ing にするか過去分詞にするかは、修飾される名詞が「する」側か「される」側かで決まります。この1つの見方で、名詞の修飾も、SVOC の C も、感情を表す語も解けるようになります。",
  sections: [
    {
      heading: "現在分詞と過去分詞：「する」か「される」か",
      body: "{{現在分詞（-ing）}}は「〜している」という{{能動・進行}}、{{過去分詞}}は「〜される・された」という{{受動}}を表します。名詞と分詞の関係を「名詞が〜する」「名詞が〜される」と文にしてみると、どちらか判断できます。fallen leaves（落ち葉）のように、自動詞の過去分詞は「〜してしまった」という{{完了}}を表します。",
      figure: {
        type: "compare",
        title: "2つの分詞のちがい",
        columns: [{ title: "現在分詞 -ing", tone: "blue" }, { title: "過去分詞", tone: "red" }],
        rows: [
          { label: "意味", cells: ["〜している（能動）", "〜される（受動）"] },
          { label: "名詞との関係", cells: ["名詞が〜する", "名詞が〜される"] },
          { label: "例", cells: ["a barking dog", "a stolen bike"] },
          { label: "自動詞なら", cells: ["a rising sun", "fallen leaves（完了）"] },
        ],
      },
    },
    {
      heading: "1語なら前から、語句がつけば後ろから",
      body: "分詞が{{1語だけ}}なら、ふつうの形容詞と同じく名詞の{{前}}に置きます。分詞に目的語や場所の語句などが{{ついてまとまり}}になったら、名詞の{{後ろ}}に置きます。後ろからの修飾は、関係代名詞＋be動詞を省いた形と考えると訳しやすくなります。",
      figure: {
        type: "formula",
        title: "the boy を分詞で修飾する",
        prose: true,
        steps: [
          { expr: "the boy", note: "修飾される名詞" },
          { expr: "the {{running}} boy", note: "1語なので前に置く" },
          { expr: "the boy {{running in the park}}", note: "語句がつくので後ろに置く" },
          { expr: "a letter {{written in French}}", note: "過去分詞も同じ。手紙は「書かれた」側" },
        ],
        note: "the boy running in the park ＝ the boy who is running in the park",
      },
    },
    {
      heading: "補語になる分詞：O と C の関係を見る",
      body: "分詞は補語にもなります。SVOC の文では、{{O が C する}}関係なら -ing、{{O が C される}}関係なら過去分詞です。I heard my name called. は「名前が呼ばれる」ので過去分詞、I saw him crossing the street. は「彼が渡っている」ので -ing です。have ＋O＋過去分詞は「O を〜してもらう・される」の意味になります。",
      figure: {
        type: "tree",
        title: "SVOC の C を選ぶ",
        root: {
          label: "O と C の関係",
          tone: "navy",
          children: [
            { label: "O が〜する", sub: "see O -ing", children: [{ label: "現在分詞 -ing", tone: "blue" }] },
            { label: "O が〜される", sub: "have O 過去分詞", children: [{ label: "過去分詞", tone: "red" }] },
          ],
        },
        note: "keep / leave / find / see / hear / have などでよく使う。",
      },
    },
    {
      heading: "感情の分詞：人は「させられる」、物は「させる」",
      body: "surprise は「驚かせる」、excite は「わくわくさせる」という意味の動詞です。だから、気持ちを{{感じている人}}は「させられる」側なので{{過去分詞}}、気持ちを{{引き起こす物ごと}}は「させる」側なので{{現在分詞}}を使います。人が主語でも、その人が周りを退屈させるなら He is boring. になります。",
      figure: {
        type: "compare",
        title: "感情を表す分詞",
        columns: [{ title: "動詞（〜させる）" }, { title: "人が感じる", tone: "red" }, { title: "物ごとが与える", tone: "blue" }],
        rows: [
          { cells: ["surprise", "surprised", "surprising"] },
          { cells: ["excite", "excited", "exciting"] },
          { cells: ["bore", "bored", "boring"] },
          { cells: ["disappoint", "disappointed", "disappointing"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "I was very exciting at the concert.", right: "I was very excited at the concert.", why: "わくわく「させられた」のは自分なので過去分詞。exciting だと「私が人をわくわくさせる」になります。" },
    { wrong: "Look at the sleeping on the sofa cat.", right: "Look at the cat sleeping on the sofa.", why: "語句のついた分詞は名詞の後ろに置きます。" },
    { wrong: "I had my bike repair yesterday.", right: "I had my bike repaired yesterday.", why: "自転車は「修理される」側なので過去分詞にします。" },
  ],
  check: [
    { q: "The language ___ (speak) in Brazil is Portuguese.", a: "spoken", why: "言語は「話される」側なので過去分詞で、後ろから修飾。" },
    { q: "The news was ___ (shock).", a: "shocking", why: "知らせは人をショックに「させる」側なので現在分詞。" },
    { q: "I kept him ___ (wait) for an hour.", a: "waiting", why: "彼が「待っている」関係なので現在分詞。" },
  ],
  next: [
    { label: "4択ドリル「分詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-bunshi" },
    { label: "つぎの単元「分詞構文」", href: "/learn/eibunpo-ko/h-eng-gram-bunshikobun" },
    { label: "関連「受動態」（be ＋過去分詞）", href: "/learn/eibunpo-ko/h-eng-gram-judo" },
  ],
};
