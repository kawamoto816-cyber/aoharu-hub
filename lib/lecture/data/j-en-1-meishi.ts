import type { Lecture } from "../types";

export const J_EN_1_MEISHI: Lecture = {
  unit: "j-en-1-meishi",
  title: "英語は名詞の「数」を気にする。1つなら a / an、2つ以上なら -s",
  hook: "日本語では「ねこがいる」と言えば1ぴきでも3びきでも通じますが、英語では a cat か cats かを必ず言い分けます。英語は名詞の数をとても気にすることばです。数えられる名詞・数えられない名詞の区別と、複数形・冠詞のルールをまとめておさえましょう。",
  sections: [
    {
      heading: "数えられる名詞と数えられない名詞",
      body: "名詞は、1つ・2つと{{数えられる名詞}}と、{{数えられない名詞}}に分かれます。dog や book のように形がはっきりしたものは数えられます。water や milk のような決まった形のないもの、music や love のような目に見えないもの、Japan や Ken のような1つしかない名前は数えられません。数えられない名詞には a / an をつけず、複数形にもしません。",
      figure: {
        type: "tree",
        title: "名詞を2つに分ける",
        root: {
          label: "名詞",
          tone: "navy",
          children: [
            {
              label: "数えられる",
              tone: "blue",
              children: [
                { label: "1つ", sub: "a dog / an apple" },
                { label: "2つ以上", sub: "dogs / apples", tone: "yellow" },
              ],
            },
            {
              label: "数えられない",
              tone: "red",
              children: [
                { label: "形がない", sub: "water / milk" },
                { label: "目に見えない", sub: "music / love" },
                { label: "名前", sub: "Japan / Ken" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "複数形のつくり方",
      body: "数えられる名詞が2つ以上のときは{{複数形}}にします。ふつうは語尾に{{-s}}をつけますが、s・x・ch・sh で終わる語は{{-es}}、子音字＋y で終わる語は{{y を i にかえて -es}}です。man → men、child → children のように{{不規則に変わる}}語は1つずつ覚えます。",
      figure: {
        type: "compare",
        title: "語尾で決まる複数形のルール",
        columns: [{ title: "つけ方", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "ふつう", cells: ["-s", "book → books"] },
          { label: "s・x・ch・sh", cells: ["-es", "box → boxes"] },
          { label: "子音字＋y", cells: ["y → i ＋ -es", "city → cities"] },
          { label: "f・fe", cells: ["f(e) → v ＋ -es", "leaf → leaves"] },
          { label: "不規則", cells: ["形が変わる", "child → children"] },
        ],
        note: "母音字＋y は -s だけ（boy → boys）。fish・sheep は1つでも複数でも同じ形。",
      },
    },
    {
      heading: "a と an は「音」で選ぶ",
      body: "数えられる名詞が1つのときは前に{{a}}をつけます。ただし、次の語が{{母音の音}}で始まるときは{{an}}です。決め手は文字ではなく音なので、hour は h で始まっても「アワー」と母音で始まるので an hour、uniform は u で始まっても「ユー」と子音の音なので a uniform です。",
      figure: {
        type: "compare",
        title: "a か an か",
        columns: [{ title: "a（子音の音）", tone: "blue" }, { title: "an（母音の音）", tone: "yellow" }],
        rows: [
          { cells: ["a dog", "an apple"] },
          { cells: ["a uniform（ユー）", "an hour（アワー）"] },
          { cells: ["a big egg", "an egg"] },
        ],
        note: "a big egg のように形容詞が入ると、すぐ後ろの語（big）の音で決まる。",
      },
    },
    {
      heading: "the は「どれのことか決まっている」とき",
      body: "{{the}}は、話し手と聞き手の両方が「どれのことか分かる」ときにつけます。一度話に出たものをもう一度言うとき、the sun のように{{1つしかないもの}}、play the piano のような楽器を演奏するときなどです。a は「ある1つ」、the は「その」という感じです。",
      figure: {
        type: "formula",
        title: "a から the へ",
        prose: true,
        steps: [
          { expr: "I have {{a}} dog.", note: "初めて話に出る：ある1ぴきの犬" },
          { expr: "{{The}} dog is white.", note: "2回目：さっきの「その」犬" },
          { expr: "Look at {{the}} sun.", note: "1つしかないもの" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "I have two dog.", right: "I have two dogs.", why: "2つ以上なら名詞を複数形にする。two があっても -s は省かない。" },
    { wrong: "a apple / a hour", right: "an apple / an hour", why: "次の語が母音の音で始まるときは an。hour の h は発音しない。" },
    { wrong: "I want a water.", right: "I want some water. / a glass of water", why: "water は数えられないので a をつけない。数えるときは容器を使う。" },
    { wrong: "citys / childs", right: "cities / children", why: "子音字＋y は y を i にかえて -es。child は不規則に変わる。" },
  ],
  check: [
    { q: "box の複数形は？", a: "boxes", why: "x で終わる語は -es をつける。" },
    { q: "___ orange の ___ に入るのは a と an のどちら？", a: "an", why: "orange は母音の音（オ）で始まる。" },
    { q: "I play ___ guitar. の ___ に入る語は？", a: "the", why: "楽器を演奏するときは the をつける。" },
  ],
  next: [
    { label: "4択ドリル「名詞の複数形と冠詞」に挑戦", href: "/learn/eibunpo-chu/j-en-1-meishi" },
    { label: "前の単元「一般動詞」のレクチャー", href: "/learn/lecture/j-en-1-ippan" },
    { label: "つぎに「代名詞」", href: "/learn/eibunpo-chu/j-en-1-daimeishi" },
  ],
};
