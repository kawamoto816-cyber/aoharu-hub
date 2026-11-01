import type { Lecture } from "../types";

export const H_ENG_GRAM_JUDO: Lecture = {
  unit: "h-eng-gram-judo",
  title: "受動態は「される側」を主語にした文。be ＋過去分詞で、時制は be が表す",
  hook: "駅の案内の This train is bound for Kyoto. や、ニュースの The bridge was built in 1970. のように、だれがしたかより「何がどうされたか」を伝えたい場面はたくさんあります。そんなときに使うのが受動態です。能動態からの作りかえを手順で押さえると、時制・助動詞・文型が変わっても迷いません。",
  sections: [
    {
      heading: "作り方：目的語を主語にして、be ＋過去分詞",
      body: "受動態は、能動態の{{目的語を主語}}にして、動詞を{{be ＋過去分詞}}にした形です。もとの主語は {{by ＋目的格}}で後ろに回します。be動詞は新しい主語と{{時制}}に合わせて選びます。目的語のない文（自動詞の文）は受動態にできません。",
      figure: {
        type: "formula",
        title: "Many students use this room. を受動態に",
        prose: true,
        steps: [
          { expr: "Many students use {{this room}}.", note: "能動態。目的語は this room" },
          { expr: "{{This room}} … by many students.", note: "目的語を主語に、主語を by の後ろへ" },
          { expr: "This room {{is used}} by many students.", note: "主語は単数・現在なので is ＋ used" },
        ],
        note: "by の後ろの代名詞は目的格（by him・by them）。",
      },
    },
    {
      heading: "時制や助動詞がついても、変わるのは be の部分だけ",
      body: "受動態の時制は {{be の形}}で表し、過去分詞はいつも同じです。過去なら was / were、助動詞があれば{{助動詞＋be}}、進行形は {{be being}}、完了形は {{have been}} ＋過去分詞になります。否定は be（または助動詞・have）の後ろに not、疑問文はそれを主語の前に出します。",
      figure: {
        type: "compare",
        title: "受動態の形のバリエーション",
        columns: [{ title: "形", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "過去", cells: ["was / were ＋過去分詞", "It was made here."] },
          { label: "助動詞", cells: ["will be ＋過去分詞", "It will be sent."] },
          { label: "進行形", cells: ["be being ＋過去分詞", "It is being fixed."] },
          { label: "完了形", cells: ["have been ＋過去分詞", "It has been sold."] },
        ],
      },
    },
    {
      heading: "by を使わないとき、by 以外の前置詞のとき",
      body: "する人が{{分からない・言う必要がない}}ときは、by 〜を省きます（English is spoken in Australia.）。また、気持ちや状態を表す受動態には{{決まった前置詞}}がつくものがあり、これは熟語として覚えます。be made of（材料）と be made from（原料）は、元の形が見えるかどうかで使い分けます。",
      figure: {
        type: "tree",
        title: "by 以外の前置詞をとる受動態",
        root: {
          label: "be ＋過去分詞＋前置詞",
          tone: "navy",
          children: [
            { label: "気持ち", children: [{ label: "interested", sub: "in：〜に興味がある", tone: "yellow" }, { label: "surprised at", sub: "〜に驚く", tone: "yellow" }] },
            { label: "状態", children: [{ label: "covered with", sub: "〜でおおわれる", tone: "blue" }, { label: "known to", sub: "〜に知られている", tone: "blue" }] },
            { label: "材料・原料", children: [{ label: "made of", sub: "見た目で分かる材料", tone: "red" }, { label: "made from", sub: "形が変わった原料", tone: "red" }] },
          ],
        },
      },
    },
    {
      heading: "目的語が2つの文、補語のある文の受動態",
      body: "SVOO の文は目的語が2つあるので、{{どちらを主語にしても}}受動態が作れます。物を主語にしたときは、人の前に to や for を置くのがふつうです。SVOC の文では O が主語になり、{{C はそのまま}}後ろに残ります。使役の make や知覚動詞の see は、受動態にすると原形の前に {{to}} が入ります（He was made to wait.）。",
      figure: {
        type: "formula",
        title: "SVOO・SVOC を受動態に",
        prose: true,
        steps: [
          { label: "SVOO", expr: "My aunt gave {{me}} {{this watch}}.", note: "目的語が2つ" },
          { label: "人が主語", expr: "{{I}} was given this watch by my aunt.", note: "this watch は残る" },
          { label: "物が主語", expr: "{{This watch}} was given {{to}} me by my aunt.", note: "人の前に to" },
          { label: "SVOC", expr: "{{The dog}} is called {{Pochi}}.", note: "We call the dog Pochi. から。C は残る" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "The window was broke by the wind.", right: "The window was broken by the wind.", why: "受動態は be ＋過去分詞。broke は過去形、過去分詞は broken です。" },
    { wrong: "This song was written by she.", right: "This song was written by her.", why: "by は前置詞なので、後ろの代名詞は目的格にします。" },
    { wrong: "I am interesting in history.", right: "I am interested in history.", why: "「興味をもたされている」側なので過去分詞 interested。interesting は「おもしろい」です。" },
    { wrong: "He was made clean the room.", right: "He was made to clean the room.", why: "使役の make を受動態にすると、原形の前に to が必要です。" },
  ],
  check: [
    { q: "They will hold the festival next week. を受動態に。", a: "The festival will be held next week (by them).", why: "助動詞のあとは be ＋過去分詞。by them は省くのがふつう。" },
    { q: "The roof is covered ___ snow. の ___ は？", a: "with", why: "be covered with 〜で「〜でおおわれている」。" },
    { q: "Ken is painting the wall. を受動態に。", a: "The wall is being painted by Ken.", why: "進行形の受動態は be being ＋過去分詞。" },
  ],
  next: [
    { label: "4択ドリル「受動態」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-judo" },
    { label: "ふりかえり「文型」（目的語と補語）", href: "/learn/eibunpo-ko/h-eng-gram-bunkei" },
    { label: "関連「分詞」（過去分詞の形容詞用法）", href: "/learn/eibunpo-ko/h-eng-gram-bunshi" },
  ],
};
