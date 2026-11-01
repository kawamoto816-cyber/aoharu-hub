import type { Lecture } from "../types";

export const H_ENG_GRAM_SETSUZOKUSHI: Lecture = {
  unit: "h-eng-gram-setsuzokushi",
  title: "接続詞は「対等につなぐ」か「主の文にくっつける」か。節の中の時制にも注意",
  hook: "I was tired, but I finished my homework. の but は2つの文を対等につなぎ、I stayed home because it was raining. の because は「理由」の部分を主の文にくっつけています。つなぎ方の2つの型がわかると、長い英文の中でどれが主役の文かが見えてきます。",
  sections: [
    {
      heading: "等位接続詞は、対等につなぐ",
      body: "and・but・or・so などの{{等位接続詞}}は、語と語・句と句・文と文を{{対等}}につなぎます。命令文のあとに続けると、{{命令文, and 〜}}は「そうすれば〜」、{{命令文, or 〜}}は「さもないと〜」の意味になります。どちらも if を使った文に言いかえられます。",
      figure: {
        type: "formula",
        title: "命令文, and / or",
        prose: true,
        steps: [
          { expr: "Leave now, {{and}} you will catch the train.", note: "そうすれば〜" },
          { expr: "Leave now, {{or}} you will miss the train.", note: "さもないと〜" },
          { expr: "{{If}} you leave now, you will catch the train.", note: "and の文を if で言いかえる" },
        ],
      },
    },
    {
      heading: "2つで1組の接続詞と、動詞の数",
      body: "both A and B（AもBも）、either A or B（AかBのどちらか）、neither A nor B（AもBも〜ない）、not only A but also B（AだけでなくBも）は、{{2つで1組}}の接続詞です。これらが主語になったとき、both A and B は{{複数扱い}}、ほかの3つは動詞を{{Bに合わせる}}のが原則です。",
      figure: {
        type: "compare",
        title: "2つで1組の接続詞",
        columns: [{ title: "意味", tone: "blue" }, { title: "主語のときの動詞", tone: "yellow" }],
        rows: [
          { label: "both A and B", cells: ["AもBも", "複数扱い"] },
          { label: "either A or B", cells: ["AかBのどちらか", "Bに合わせる"] },
          { label: "neither A nor B", cells: ["AもBも〜ない", "Bに合わせる"] },
          { label: "not only A but also B", cells: ["AだけでなくBも", "Bに合わせる"] },
        ],
        note: "例：Either you or Ken has the key. / Not only I but also my sisters like cats.",
      },
    },
    {
      heading: "従属接続詞は、主の文に節をくっつける",
      body: "that・whether・when・because・though・if などの{{従属接続詞}}は、後ろの「主語＋動詞」を{{節}}にして、主の文にくっつけます。that・whether（if）の節は「〜ということ」「〜かどうか」という{{名詞節}}になり、主語や目的語になります。when・because・though などの節は、時・理由・譲歩・条件を表す{{副詞節}}になります。",
      figure: {
        type: "tree",
        title: "従属接続詞がつくる節",
        root: {
          label: "従属接続詞",
          tone: "navy",
          children: [
            {
              label: "名詞節",
              sub: "主語・目的語になる",
              tone: "blue",
              children: [
                { label: "that", sub: "〜ということ" },
                { label: "whether / if", sub: "〜かどうか" },
              ],
            },
            {
              label: "副詞節",
              sub: "主の文につけ足す",
              tone: "yellow",
              children: [
                { label: "時", sub: "when, until" },
                { label: "理由", sub: "because, since" },
                { label: "譲歩", sub: "though" },
                { label: "条件", sub: "if, unless" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "時・条件の副詞節では、未来のことも現在形",
      body: "when・until・as soon as・if など、{{時}}や{{条件}}を表す副詞節の中では、未来のことでも{{現在形}}を使います。ただし、if や when が「〜かどうか」「いつ〜か」という{{名詞節}}をつくるときは、未来のことなら will を使います。節が文の中で目的語になっているか、つけ足しかで見分けます。",
      figure: {
        type: "formula",
        title: "副詞節と名詞節の時制",
        prose: true,
        steps: [
          { expr: "I'll call you when he {{arrives}}.", note: "時の副詞節：未来でも現在形" },
          { expr: "I'll stay home if it {{rains}} tomorrow.", note: "条件の副詞節：現在形" },
          { expr: "I don't know if it {{will rain}} tomorrow.", note: "know の目的語（名詞節）：will を使う" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "Though it was cold, but we went swimming.", right: "Though it was cold, we went swimming.", why: "though と but は両方とも「けれども」の役。1つの文で両方は使いません。" },
    { wrong: "Both Ken and Mary is from Kobe.", right: "Both Ken and Mary are from Kobe.", why: "both A and B は2人なので複数扱いです。" },
    { wrong: "Let's start when he will come.", right: "Let's start when he comes.", why: "時を表す副詞節の中は、未来のことでも現在形です。" },
    { wrong: "During I was in Hawaii, I swam every day.", right: "While I was in Hawaii, I swam every day.", why: "during は前置詞で後ろは名詞。文を続けるなら接続詞 while です。" },
  ],
  check: [
    { q: "Hurry up, ___ you'll be late.", a: "or", why: "「急ぎなさい、さもないと遅れる」なので 命令文, or。" },
    { q: "Not only Tom but also his parents ___ (like / likes) soccer.", a: "like", why: "動詞は B の his parents（複数）に合わせる。" },
    { q: "Please wait here until I ___ (come / will come) back.", a: "come", why: "until の節は時の副詞節なので、未来でも現在形。" },
  ],
  next: [
    { label: "4択ドリル「接続詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-setsuzokushi" },
    { label: "つぎの単元「話法」", href: "/learn/eibunpo-ko/h-eng-gram-waho" },
    { label: "ひとつ前「前置詞」", href: "/learn/eibunpo-ko/h-eng-gram-zenchishi" },
  ],
};
