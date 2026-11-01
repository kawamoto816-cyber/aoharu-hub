import type { Lecture } from "../types";

export const H_ENG_GRAM_MEISHI: Lecture = {
  unit: "h-eng-gram-meishi",
  title: "名詞は「数えられるか」、冠詞は「どれのことか相手に伝わるか」で決まる",
  hook: "日本語では「本を買った」「水を飲んだ」と、数を気にせずに言えます。ところが英語では、a book・books・water のように、名詞を使うたびに「数えられるか」「1つか2つ以上か」「どれのことか分かるか」を決めなければなりません。この判断の筋道をつかむと、英作文での小さなミスがぐっと減ります。",
  sections: [
    {
      heading: "数えられる名詞・数えられない名詞",
      body: "英語の名詞は、{{数えられる名詞（可算名詞）}}と{{数えられない名詞（不可算名詞）}}に分かれます。決まった形や区切りがあるものは数えられ、液体や素材、形のない考えなどは数えられません。information・advice・furniture・homework・news は、日本語の感覚では数えられそうでも{{不可算名詞}}なので要注意です。",
      figure: {
        type: "tree",
        title: "名詞の分類",
        root: {
          label: "名詞",
          tone: "navy",
          children: [
            {
              label: "数えられる",
              tone: "blue",
              children: [
                { label: "普通名詞", sub: "book / apple" },
                { label: "集合名詞", sub: "family / class" },
              ],
            },
            {
              label: "数えられない",
              tone: "red",
              children: [
                { label: "物質名詞", sub: "water / paper" },
                { label: "抽象名詞", sub: "advice / news" },
                { label: "固有名詞", sub: "Japan / Ken" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "量の言い方は、数えられるかで変わる",
      body: "「たくさんの」「少しの」を表す語は、名詞が数えられるかどうかで使い分けます。数えられる名詞には {{many・a few・few}}、数えられない名詞には {{much・a little・little}} です。a のつく a few / a little は「{{少しある}}」、a のない few / little は「{{ほとんどない}}」という意味になります。不可算名詞を数えるときは、a cup of tea のように{{単位の語}}を使います。",
      figure: {
        type: "compare",
        title: "量を表す語の使い分け",
        columns: [{ title: "数えられる", tone: "blue" }, { title: "数えられない", tone: "red" }],
        rows: [
          { label: "たくさん", cells: ["many books", "much water"] },
          { label: "少しある", cells: ["a few books", "a little water"] },
          { label: "ほとんどない", cells: ["few books", "little water"] },
          { label: "数える", cells: ["two books", "two glasses of water"] },
        ],
        note: "a lot of はどちらにも使える。",
      },
    },
    {
      heading: "a と the：相手が「どれか」分かるかどうか",
      body: "{{a / an}} は「（いくつかあるうちの）ある1つ」で、聞き手が{{どれか特定できない}}ときに使います。{{the}} は、すでに話に出た、状況で分かる、ひとつしかないなど、聞き手が{{どれのことか分かる}}ときに使います。a か an かはつづりではなく{{発音}}で決まり、an hour・a university となります。",
      figure: {
        type: "formula",
        title: "話の流れで a が the に変わる",
        prose: true,
        steps: [
          { expr: "I saw {{a}} dog in the park.", note: "初めて出る。相手はどの犬か知らない" },
          { expr: "{{The}} dog was very big.", note: "さっきの犬だと分かる" },
          { expr: "Look at {{the}} moon.", note: "ひとつしかないもの" },
          { expr: "Please close {{the}} window.", note: "状況でどの窓か分かる" },
        ],
      },
    },
    {
      heading: "冠詞をつけない決まった言い方",
      body: "建物や物を本来の{{目的}}で使うときは、冠詞をつけないのがふつうです。go to school（勉強しに）、go to bed（寝るために）がその例で、建物そのものを指すなら the を使います。{{by ＋交通手段}}（by bus・by train）、{{食事}}（have lunch）、{{スポーツ}}（play tennis）にも冠詞をつけません。一方、楽器を演奏するときは play the piano のように the をつけるのが基本です。",
    },
  ],
  mistakes: [
    { wrong: "She gave me many advices.", right: "She gave me a lot of advice (much advice).", why: "advice は不可算名詞なので複数形にせず、many も使いません。" },
    { wrong: "I have a good news.", right: "I have (some) good news. / a piece of good news", why: "news は -s で終わりますが不可算名詞。a はつけません。" },
    { wrong: "I'll go to the school by a bus.", right: "I'll go to school by bus.", why: "勉強しに行く school と、by ＋交通手段には冠詞をつけません。" },
    { wrong: "It takes a hour.", right: "It takes an hour.", why: "hour の h は発音しないので、母音で始まる音として an を使います。" },
  ],
  check: [
    { q: "There is ___ milk in the bottle.（少しある）", a: "a little", why: "milk は不可算名詞なので little。「少しある」なので a をつける。" },
    { q: "He has ___ friends here, so he feels lonely.", a: "few", why: "friends は可算名詞の複数。「ほとんどいない」なので a をつけない。" },
    { q: "My mother bought ___ new bag. ___ bag is red.", a: "a / The", why: "初めて出るときは a、2回目は相手に分かるので the。" },
  ],
  next: [
    { label: "4択ドリル「名詞・冠詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-meishi" },
    { label: "つぎの単元「代名詞」", href: "/learn/eibunpo-ko/h-eng-gram-daimeishi" },
    { label: "関連「形容詞・副詞」（many・much など）", href: "/learn/eibunpo-ko/h-eng-gram-keiyoshi" },
  ],
};
