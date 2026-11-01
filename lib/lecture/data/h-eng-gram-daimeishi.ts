import type { Lecture } from "../types";

export const H_ENG_GRAM_DAIMEISHI: Lecture = {
  unit: "h-eng-gram-daimeishi",
  title: "代名詞は「名詞の身代わり」。it・one・other は何を指すかで選ぶ",
  hook: "Ken lost his umbrella, so he bought a new one. の his・he・one は、どれも名詞の身代わりです。代名詞が何を指すかを取りちがえると、長文の意味が逆になることもあります。「何を指しているか」で語を選ぶしくみを整理しましょう。",
  sections: [
    {
      heading: "人称代名詞は、文の中の役割で形が変わる",
      body: "人称代名詞は、文の中で{{主語}}になるか、{{目的語}}になるか、「〜の」になるかで形が変わります。前置詞の後ろも目的格です（with him）。「〜のもの」は{{所有代名詞}}（mine, hers）で表し、主語と目的語が同じ人や物のときは{{再帰代名詞}}（myself, herself）を使います。",
      figure: {
        type: "compare",
        title: "I と she の形の変化",
        columns: [{ title: "はたらき", tone: "navy" }, { title: "I", tone: "yellow" }, { title: "she", tone: "blue" }],
        rows: [
          { cells: ["主格（〜は）", "I", "she"] },
          { cells: ["所有格（〜の）", "my", "her"] },
          { cells: ["目的格（〜を・に）", "me", "her"] },
          { cells: ["所有代名詞（〜のもの）", "mine", "hers"] },
          { cells: ["再帰代名詞（〜自身）", "myself", "herself"] },
        ],
        note: "her は所有格と目的格が同じ形。a・this などと所有格は並べられないので、a friend of mine の形にする。",
      },
    },
    {
      heading: "it は「前に出たそれ」と「仮の主語」",
      body: "it は前に出た{{そのもの}}を指すほか、天気・時間・距離・明暗を表す文の主語にもなります（It is raining.）。また、不定詞や that 節が主語で長くなるときは、it を{{形式主語}}として文の初めに置き、本当の主語を後ろへ回します。SVOC の目的語が長いときも、{{形式目的語}}の it を置いて後ろへ回します。",
      figure: {
        type: "formula",
        title: "長い主語・目的語を後ろへ回す",
        prose: true,
        steps: [
          { expr: "{{To swim in this river}} is dangerous.", note: "主語が長く、頭でっかち" },
          { expr: "{{It}} is dangerous {{to swim in this river}}.", note: "形式主語 It を置き、本当の主語を後ろへ" },
          { expr: "I found {{it}} easy {{to solve the puzzle}}.", note: "形式目的語 it（found it easy）" },
        ],
      },
    },
    {
      heading: "it と one：同じ物か、同じ種類か",
      body: "前に出た名詞と{{まったく同じ物}}を指すのは it、{{同じ種類の別の物}}を指すのは one です。I lost my pen, and I can't find it. はなくしたペンそのもの、I lost my pen, so I bought a new one. は新しく買った別のペンです。one は数えられる名詞のかわりにだけ使い、複数なら ones になります。",
      figure: {
        type: "compare",
        title: "it と one のちがい",
        columns: [{ title: "it", tone: "blue" }, { title: "one", tone: "yellow" }],
        rows: [
          { label: "指すもの", cells: ["前に出たそのもの", "同じ種類の別の1つ"] },
          { label: "例", cells: ["I can't find it.", "I bought a new one."] },
          { label: "a・形容詞", cells: ["つけられない", "a new one とできる"] },
        ],
      },
    },
    {
      heading: "another・the other・the others は「残り」で決まる",
      body: "「1つは〜、もう1つは…」の言い方は、{{全部でいくつあるか}}と、{{残りが特定できるか}}で決まります。2つのうちの残り1つは決まっているので the other です。3つ以上の中で「別のもう1つ」は another、残り全部なら the others です。範囲を決めずに「〜する人もいれば、…する人もいる」は some 〜, others … です。",
      figure: {
        type: "tree",
        title: "残りをどう指すか",
        root: {
          label: "1つは one",
          tone: "navy",
          children: [
            { label: "全部で2つ", sub: "残りは1つに決まる", children: [{ label: "the other", tone: "yellow" }] },
            {
              label: "全部で3つ以上",
              children: [
                { label: "別のもう1つ", sub: "どれか1つ", children: [{ label: "another", tone: "blue" }] },
                { label: "残りの全部", sub: "特定できる", children: [{ label: "the others", tone: "red" }] },
              ],
            },
            { label: "範囲を決めない", sub: "some 〜, …", children: [{ label: "others" }] },
          ],
        },
        note: "the がつくのは、残りが「それで全部」と特定できるとき。",
      },
    },
  ],
  mistakes: [
    { wrong: "This bag is my.", right: "This bag is mine.", why: "「私のもの」は所有代名詞 mine。my は後ろに名詞が必要です。" },
    { wrong: "I lost my umbrella, so I have to buy it.", right: "I lost my umbrella, so I have to buy one.", why: "なくした傘そのものは買えません。同じ種類の別の物なので one です。" },
    { wrong: "I have two sisters. One is a nurse, and another is a cook.", right: "One is a nurse, and the other is a cook.", why: "2人のうち残りの1人は決まっているので the other を使います。" },
    { wrong: "We enjoyed at the party.", right: "We enjoyed ourselves at the party.", why: "enjoy は目的語が必要な動詞。「楽しむ」は enjoy oneself と再帰代名詞を置きます。" },
  ],
  check: [
    { q: "This isn't my notebook. It's ___.（彼女のもの）", a: "hers", why: "「〜のもの」は所有代名詞。she → hers。" },
    { q: "___ is important to sleep well.", a: "It", why: "本当の主語は to sleep well。形式主語 It を文頭に置く。" },
    { q: "There are three cups. One is white, and ___ are blue.（残り全部）", a: "the others", why: "3つ以上のうち、残り全部（特定できる）なので the others。" },
  ],
  next: [
    { label: "4択ドリル「代名詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-daimeishi" },
    { label: "つぎの単元「形容詞・副詞」", href: "/learn/eibunpo-ko/h-eng-gram-keiyoshi" },
    { label: "ひとつ前「名詞・冠詞」", href: "/learn/eibunpo-ko/h-eng-gram-meishi" },
  ],
};
