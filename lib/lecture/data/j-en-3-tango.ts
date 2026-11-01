import type { Lecture } from "../types";

export const J_EN_3_TANGO: Lecture = {
  unit: "j-en-3-tango",
  title: "中3の英単語は「語のパーツ」と「熟語」で増やし、知らない語は推測する",
  hook: "中3になると長文が長くなり、入試では教科書で見ていない単語にも出会います。中学で習う1600〜1800語を土台に、{{1つの語からなかまの語を広げる}}方法と、{{知らない語の意味を予想する}}方法を身につけると、覚える負担を減らしながら読める英文が増えます。",
  sections: [
    {
      heading: "1語から「なかまの語」を広げる",
      body: "英単語は、{{もとになる語}}に頭（接頭辞）やおしり（接尾辞）がついてできていることがよくあります。happy を知っていれば、{{un-}}（〜でない）がついた unhappy、-ly がついた happily、-ness がついた happiness も意味が予想できます。新しい語は、もとの語といっしょに覚えましょう。",
      figure: {
        type: "tree",
        title: "happy から広がる語",
        root: {
          label: "happy",
          sub: "幸せな（形容詞）",
          children: [
            { label: "unhappy", sub: "不幸な", tone: "red" },
            { label: "happily", sub: "幸せに（副詞）", tone: "blue" },
            { label: "happiness", sub: "幸せ（名詞）", tone: "yellow" },
          ],
        },
      },
    },
    {
      heading: "語のおしりで品詞がわかる",
      body: "接尾辞は、その語の{{品詞（名詞・形容詞・副詞など）}}を教えてくれます。-ful や -ous なら形容詞、-ly ならたいてい副詞、-tion や -ness なら名詞です。品詞がわかると、文の中のどこに置く語なのかもわかります。",
      figure: {
        type: "compare",
        title: "よく出る語のおしり",
        columns: [{ title: "おしり" }, { title: "品詞", tone: "yellow" }, { title: "例" }],
        rows: [
          { cells: ["-tion / -ness", "名詞", "information / kindness"] },
          { cells: ["-ful / -ous", "形容詞", "useful / famous"] },
          { cells: ["-ly", "副詞（多い）", "quickly / slowly"] },
          { cells: ["-er / -ist", "名詞（人）", "player / pianist"] },
        ],
        note: "friendly（親切な）のように、-ly でも形容詞の語があります。",
      },
    },
    {
      heading: "熟語は「かたまり」で覚える",
      body: "be famous for（〜で有名だ）や look forward to（〜を楽しみに待つ）のように、{{いくつかの語で1つの意味}}になる熟語は、1語ずつ訳すと意味がずれます。前置詞まで{{セットで}}覚え、短い例文で使い方も確かめましょう。look forward to の to は前置詞なので、あとには名詞か {{-ing 形}}が来ます。",
    },
    {
      heading: "知らない単語は前後から推測する",
      body: "長文で知らない単語が出ても、すぐに止まる必要はありません。まず{{文の中の位置から品詞}}を考え、次に語のパーツを見て、最後に{{前後の文}}から意味を予想します。例のあとの such as や、言いかえの or、反対を表す but は、意味のヒントになります。",
      figure: {
        type: "flow",
        title: "知らない語に出会ったら",
        dir: "col",
        steps: [
          { label: "品詞を考える", sub: "名詞？動詞？形容詞？", tone: "navy" },
          { label: "パーツを見る", sub: "un- / -ful / -tion など", tone: "blue" },
          { label: "前後から予想", sub: "but・such as などがヒント", tone: "yellow" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "I'm looking forward to see you.", right: "I'm looking forward to seeing you.", why: "look forward to の to は前置詞。あとは名詞か -ing 形です。" },
    { wrong: "She speaks English very good.", right: "She speaks English very well.", why: "動詞 speaks を説明するのは副詞の well。good は形容詞です。" },
    { wrong: "知らない単語が出るたびに読むのをやめる", right: "品詞・パーツ・前後から予想して読み進める", why: "入試の長文には知らない語が必ずあります。全体の意味をつかむほうが大切です。" },
  ],
  check: [
    { q: "careful に -ly をつけると、品詞は何になる？", a: "副詞（carefully：注意深く）", why: "-ly はおもに副詞をつくる。" },
    { q: "「京都は古いお寺で有名です」：Kyoto is ( ) ( ) its old temples.", a: "famous / for", why: "be famous for 〜 で「〜で有名だ」。" },
    { q: "possible に un- ではなく im- がついた語は？", a: "impossible（不可能な）", why: "im- も「〜でない」の意味。p の前ではふつう im- になる。" },
  ],
  next: [
    { label: "中学英単語1200で覚える", href: "/learn/chu-tango" },
    { label: "覚え方のきほん「英単語」（中1）", href: "/learn/lecture/j-en-1-tango" },
    { label: "単語を使って読む「長文読解」", href: "/learn/eigo-chu/j-en-3-chobun" },
  ],
};
