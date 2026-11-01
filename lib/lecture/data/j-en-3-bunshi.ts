import type { Lecture } from "../types";

export const J_EN_3_BUNSHI: Lecture = {
  unit: "j-en-3-bunshi",
  title: "分詞は名詞を説明する。「している」は -ing、「された」は過去分詞",
  hook: "「ベンチで寝ているねこ」「日本で作られた車」。こうした説明つきの名詞は、英語では {{-ing 形}}や{{過去分詞}}を使って表せます。説明が2語以上になると名詞のうしろに回るので、長文を読むときに「どこまでが名詞のかたまりか」を見ぬく力にもなります。",
  sections: [
    {
      heading: "分詞は形容詞のように名詞を説明する",
      body: "動詞の -ing 形（{{現在分詞}}）と{{過去分詞}}は、形容詞のように名詞を説明できます。現在分詞は「{{〜している}}」、過去分詞は「{{〜された・〜されている}}」という意味です。進行形の -ing、受け身の過去分詞と同じ形なので、意味もそのまま覚えられます。",
      figure: {
        type: "compare",
        title: "2つの分詞",
        columns: [{ title: "現在分詞", tone: "blue" }, { title: "過去分詞", tone: "yellow" }],
        rows: [
          { label: "形", cells: ["動詞の -ing 形", "played / written など"] },
          { label: "意味", cells: ["〜している", "〜された・されている"] },
          { label: "例", cells: ["a running boy", "a broken window"] },
        ],
      },
    },
    {
      heading: "1語なら前、2語以上ならうしろ",
      body: "分詞が{{1語だけ}}のときは、ふつうの形容詞と同じく名詞の{{前}}に置きます。分詞に「どこで」「だれによって」などの語句がついて{{2語以上}}になると、名詞の{{うしろ}}に置きます。これを{{後置修飾}}といいます。日本語にするときは、うしろから前へもどって訳します。",
      figure: {
        type: "formula",
        title: "名詞のうしろに回るとき",
        prose: true,
        steps: [
          { expr: "a {{sleeping}} cat", note: "1語：名詞の前（寝ているねこ）" },
          { expr: "a cat {{sleeping on the bench}}", note: "語句がつくとうしろへ（ベンチで寝ているねこ）" },
          { expr: "Look at {{the cat sleeping on the bench}}.", note: "文の中では1つの名詞のかたまり" },
        ],
      },
    },
    {
      heading: "-ing か過去分詞かは「する側・される側」",
      body: "どちらを使うか迷ったら、説明される名詞が{{その動作をする側}}か、{{される側}}かを考えます。the boy と play なら、少年はプレーする側なので the boy {{playing}} soccer。a language と speak なら、言語は話される側なので a language {{spoken}} in many countries です。",
      figure: {
        type: "tree",
        title: "名詞と動作の関係で選ぶ",
        root: {
          label: "名詞は動作を…",
          children: [
            { label: "する側", sub: "現在分詞 -ing", tone: "blue", children: [{ label: "the boy playing soccer", sub: "サッカーをしている少年" }] },
            { label: "される側", sub: "過去分詞", tone: "yellow", children: [{ label: "a car made in Japan", sub: "日本で作られた車" }] },
          ],
        },
      },
    },
    {
      heading: "文の中では主語のかたまりに注意",
      body: "分詞のかたまりが主語の名詞についていると、文の{{本当の動詞}}がずっとうしろに来ます。The girl talking with Ken {{is}} my sister. の動詞は talking ではなく is です。主語のかたまりがどこで終わるかを見つけると、文の意味がすっきりわかります。",
      figure: {
        type: "flow",
        title: "主語のかたまりを見つける",
        steps: [
          { label: "The girl", sub: "名詞", tone: "navy" },
          { label: "talking with Ken", sub: "うしろから説明", tone: "blue" },
          { label: "is my sister.", sub: "本当の動詞", tone: "yellow" },
        ],
        note: "ケンと話している少女は私の姉（妹）です。",
      },
    },
  ],
  mistakes: [
    { wrong: "Look at the sleeping on the bench cat.", right: "Look at the cat sleeping on the bench.", why: "語句がついて2語以上になった分詞は、名詞のうしろに置きます。" },
    { wrong: "This is a book writing by Soseki.", right: "This is a book written by Soseki.", why: "本は「書かれる側」なので過去分詞 written を使います。" },
    { wrong: "The boy playing tennis are my brother.", right: "The boy playing tennis is my brother.", why: "主語は the boy（1人）。tennis につられて動詞の形をまちがえないこと。" },
  ],
  check: [
    { q: "「英語で書かれた手紙」：a letter ( ) in English。( ) に write の正しい形を。", a: "written", why: "手紙は書かれる側なので過去分詞。" },
    { q: "the man standing by the door の意味は？", a: "ドアのそばに立っている男の人", why: "standing by the door が the man をうしろから説明している。" },
    { q: "a (crying) baby と a baby (crying) in the room、正しいのはどちら？", a: "両方とも正しい", why: "1語なら名詞の前、in the room がつくと名詞のうしろ。" },
  ],
  next: [
    { label: "4択ドリル「分詞の後置修飾」に挑戦", href: "/learn/eibunpo-chu/j-en-3-bunshi" },
    { label: "うしろから説明するなかま「関係代名詞」", href: "/learn/lecture/j-en-3-kankei" },
    { label: "ふりかえり「不定詞の発展」", href: "/learn/lecture/j-en-3-futeishi" },
  ],
};
