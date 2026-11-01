import type { Lecture } from "../types";

export const J_EN_2_UKEMI: Lecture = {
  unit: "j-en-2-ukemi",
  title: "受け身は be動詞＋過去分詞。「される側」を主語にして作る",
  hook: "「このお寺は約600年前に建てられた」「英語は多くの国で話されている」。だれがしたかより、{{されたもの}}を話の中心にしたいときに使うのが受け身です。説明文や案内によく出てくる形で、ここで覚える過去分詞は中3の現在完了でも使います。",
  sections: [
    {
      heading: "受け身は「される側」が主語",
      body: "ふつうの文（{{能動態}}）は「する側」が主語ですが、受け身（{{受動態}}）は「される側」を主語にします。形は {{be動詞＋過去分詞}} で、「〜される・〜された」という意味です。だれがしたかを言うときは、後ろに {{by＋人}} を置きます。",
      figure: {
        type: "compare",
        title: "能動態と受け身",
        columns: [{ title: "能動態" }, { title: "受け身", tone: "yellow" }],
        rows: [
          { label: "主語", cells: ["する側（Tom）", "される側（it）"] },
          { label: "動詞", cells: ["made", "was made"] },
          { label: "例", cells: ["Tom made it.", "It was made by Tom."] },
          { label: "意味", cells: ["トムがそれを作った", "それはトムに作られた"] },
        ],
      },
    },
    {
      heading: "能動態を受け身に書きかえる3ステップ",
      body: "①もとの文の{{目的語を主語}}にする、②動詞を{{be動詞＋過去分詞}}にする、③もとの主語を {{by のあと}}に置く、の順で書きかえます。by のあとが代名詞なら、him・her・them などの{{目的格}}にします。",
      figure: {
        type: "formula",
        title: "Many people love this song. を受け身に",
        prose: true,
        steps: [
          { label: "もと", expr: "Many people love {{this song}}.", note: "目的語を見つける" },
          { label: "①", expr: "{{This song}} …", note: "目的語を主語に" },
          { label: "②", expr: "This song {{is loved}} …", note: "主語と時に合う be動詞＋過去分詞" },
          { label: "③", expr: "This song is loved {{by many people}}.", note: "もとの主語を by のあとへ" },
        ],
      },
    },
    {
      heading: "be動詞で「時」と「数」を表す",
      body: "受け身の時（現在か過去か）は{{be動詞で表し}}、過去分詞の形は変わりません。今のことなら is・am・are、過去のことなら {{was・were}} を、主語の数に合わせて選びます。These pictures were taken in Kyoto. は、主語が複数で過去なので were です。",
      figure: {
        type: "tree",
        title: "受け身の be動詞を選ぶ",
        root: {
          label: "主語と時",
          children: [
            {
              label: "現在",
              sub: "今のこと",
              tone: "blue",
              children: [
                { label: "is / am", sub: "1つ・1人（I は am）" },
                { label: "are", sub: "2つ以上・you" },
              ],
            },
            {
              label: "過去",
              sub: "前のこと",
              tone: "yellow",
              children: [
                { label: "was", sub: "1つ・1人" },
                { label: "were", sub: "2つ以上・you" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "否定文・疑問文は be動詞の文と同じ",
      body: "受け身には be動詞が入っているので、否定文は be動詞の{{後ろに not}}、疑問文は be動詞を{{主語の前}}に出します。{{do・does・did は使いません}}。答えるときも be動詞を使います。",
      figure: {
        type: "formula",
        title: "This bag was made in Italy. を書きかえる",
        prose: true,
        steps: [
          { expr: "This bag {{was made}} in Italy.", note: "肯定文" },
          { expr: "This bag was {{not}} made in Italy.", note: "否定文：was のあとに not（wasn't）" },
          { expr: "{{Was}} this bag made in Italy{{?}}", note: "疑問文：was を主語の前へ" },
          { expr: "— Yes, it {{was}}. / No, it {{wasn't}}.", note: "答えも be動詞で" },
        ],
      },
    },
    {
      heading: "by を使わないとき",
      body: "したのがだれか{{わからない}}とき、{{言わなくてもわかる}}ときは by 〜 を省きます。English is spoken in Canada. の「話す人」はカナダの人々だとわかるので、by は書きません。また、be known {{to}} 〜（〜に知られている）、be covered {{with}} 〜（〜でおおわれている）、be interested {{in}} 〜（〜に興味がある）のように、by 以外を使う決まった言い方もあります。",
    },
  ],
  mistakes: [
    { wrong: "This letter was write by Ken.", right: "This letter was written by Ken.", why: "be動詞のあとは過去分詞。write は write - wrote - written と変化します。" },
    { wrong: "This room is cleaned by she.", right: "This room is cleaned by her.", why: "by のあとの代名詞は目的格にします。" },
    { wrong: "Did this book written by him?", right: "Was this book written by him?", why: "受け身の疑問文は be動詞を主語の前に出します。did は使いません。" },
    { wrong: "English is speaked in Australia.", right: "English is spoken in Australia.", why: "speak は不規則動詞（speak - spoke - spoken）です。" },
  ],
  check: [
    { q: "They built this bridge in 2010. を受け身にしましょう。", a: "This bridge was built in 2010.", why: "過去なので was built。they は「人々」で言わなくてもわかるので by them は省く。" },
    { q: "These pictures ___ taken by my father.（過去の文）の ___ に入る語は？", a: "were", why: "主語が複数で過去なので were。" },
    { q: "Was this cake made by your mother? に Yes で答えましょう。", a: "Yes, it was.", why: "be動詞（was）でたずねられたら be動詞で答える。this cake は it に。" },
  ],
  next: [
    { label: "4択ドリル「受け身」に挑戦", href: "/learn/eibunpo-chu/j-en-2-ukemi" },
    { label: "過去分詞の型をまとめる「英単語（中2）」", href: "/learn/lecture/j-en-2-tango" },
    { label: "過去分詞をもう一度使う中3「現在完了」", href: "/learn/eibunpo-chu/j-en-3-kanryo" },
  ],
};
