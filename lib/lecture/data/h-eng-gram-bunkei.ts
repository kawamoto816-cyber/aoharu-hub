import type { Lecture } from "../types";

export const H_ENG_GRAM_BUNKEI: Lecture = {
  unit: "h-eng-gram-bunkei",
  title: "文型は動詞の後ろに「何が何個」来るかで決まる。C は S か O と「＝」になる",
  hook: "He made her a doll. と He made her happy. は、どちらも made her のあとに1語あるだけなのに、意味は「人形を作ってあげた」と「彼女を幸せにした」でまったくちがいます。この差を説明するのが文型です。文型がわかると、長い文でも骨組みが見え、訳をまちがえにくくなります。",
  sections: [
    {
      heading: "まず修飾語（M）を外して、骨組みを見る",
      body: "文の要素は、{{S（主語）・V（動詞）・O（目的語）・C（補語）}}の4つです。時・場所・様子を表す副詞や「前置詞＋名詞」は{{M（修飾語）}}といい、文型には数えません。長い文はまず M をかっこでくくり、残った骨組みで文型を考えます。",
      figure: {
        type: "formula",
        title: "M をくくって骨組みを取り出す",
        prose: true,
        steps: [
          { expr: "My uncle walks {{in the park}} {{every morning}}.", note: "もとの文" },
          { expr: "My uncle walks (in the park) (every morning).", note: "前置詞＋名詞・時を表す語は M" },
          { expr: "{{My uncle}} {{walks}}.", note: "残るのは S＋V → 第1文型" },
        ],
      },
    },
    {
      heading: "5つの文型",
      body: "動詞の後ろに{{何も来ない（M だけ）}}なら第1文型、{{1つ}}なら第2か第3、{{2つ}}なら第4か第5です。それぞれの文型は、とる動詞にも傾向があります。第2文型は become・look・seem・taste、第4文型は give・send・show・buy、第5文型は make・call・keep・find などがよく使われます。",
      figure: {
        type: "compare",
        title: "5つの文型と例",
        columns: [{ title: "文型" }, { title: "形", tone: "yellow" }, { title: "例" }],
        rows: [
          { cells: ["第1文型", "S V", "The baby smiled."] },
          { cells: ["第2文型", "S V C", "Mika became a nurse."] },
          { cells: ["第3文型", "S V O", "I lost my key."] },
          { cells: ["第4文型", "S V O O", "He sent me a card."] },
          { cells: ["第5文型", "S V O C", "We call him Ben."] },
        ],
      },
    },
    {
      heading: "O か C か、O O か O C かは「＝」で見分ける",
      body: "後ろが1つのとき、それが{{主語とイコール}}（Mika＝a nurse）なら C で第2文型、イコールでなければ O で第3文型です。後ろが2つのとき、{{2つ目が1つ目とイコール}}（him＝Ben）なら O C の第5文型、イコールでなければ「人に物を」の O O で第4文型です。C には名詞か{{形容詞}}が入り、副詞は入りません。",
      figure: {
        type: "tree",
        title: "動詞の後ろで文型を決める",
        root: {
          label: "動詞の後ろ",
          children: [
            { label: "なし（M だけ）", children: [{ label: "SV", tone: "plain" }] },
            {
              label: "1つ",
              children: [
                { label: "S＝それ", children: [{ label: "SVC", tone: "yellow" }] },
                { label: "S≠それ", children: [{ label: "SVO", tone: "blue" }] },
              ],
            },
            {
              label: "2つ",
              children: [
                { label: "1つ目＝2つ目", children: [{ label: "SVOC", tone: "red" }] },
                { label: "1つ目≠2つ目", children: [{ label: "SVOO", tone: "blue" }] },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "第4文型は「to / for ＋人」で第3文型に書きかえられる",
      body: "第4文型の「人に物を」は、物を先に出して{{「物＋to / for＋人」}}の第3文型にできます。相手に届けば成り立つ give・send・show・teach などは{{to}}、相手のためにわざわざする buy・make・cook・find などは{{for}}を使います。",
      figure: {
        type: "formula",
        title: "SVOO → SVO ＋ to / for",
        prose: true,
        steps: [
          { label: "to", expr: "I showed her the photo.", note: "第4文型" },
          { label: "to", expr: "I showed the photo {{to}} her.", note: "show は相手に届く動作 → to" },
          { label: "for", expr: "Dad cooked us dinner.", note: "第4文型" },
          { label: "for", expr: "Dad cooked dinner {{for}} us.", note: "cook は相手のためにする動作 → for" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "She looks happily.", right: "She looks happy.", why: "look（〜に見える）は第2文型をつくり、C には形容詞が入ります。副詞は C になれません。" },
    { wrong: "I went to the station. を第3文型と考える", right: "第1文型（to the station は M）", why: "「前置詞＋名詞」は修飾語で、目的語ではありません。go の後ろに O はありません。" },
    { wrong: "I bought a present to my sister.", right: "I bought a present for my sister.", why: "buy は「相手のために買ってあげる」動作なので for を使います。" },
    { wrong: "We discussed about the plan.", right: "We discussed the plan.", why: "discuss は他動詞で、すぐ後ろに目的語をとります（第3文型）。about は不要です。" },
  ],
  check: [
    { q: "Kenji painted the fence white. の文型は？", a: "第5文型（SVOC）", why: "the fence＝white の関係があるので、white は C。" },
    { q: "My aunt teaches us English. の文型は？", a: "第4文型（SVOO）", why: "us と English はイコールではない。「人に物を」の O O。" },
    { q: "This soup tastes ___. に入るのは sour と sourly のどちら？", a: "sour", why: "taste（〜の味がする）は第2文型。C には形容詞が入る。" },
  ],
  next: [
    { label: "4択ドリル「文型」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-bunkei" },
    { label: "つぎの単元「時制」", href: "/learn/eibunpo-ko/h-eng-gram-jisei" },
    { label: "ふりかえり「文型」（中2）のレクチャー", href: "/learn/lecture/j-en-2-bunkei" },
  ],
};
