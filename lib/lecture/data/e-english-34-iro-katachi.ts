import type { Lecture } from "../types";

export const E_ENGLISH_34_IRO_KATACHI: Lecture = {
  unit: "e-english-34-iro-katachi",
  title: "色を先に、形を後に。a red circle のように言う",
  hook: "クレヨンの箱や、交通安全のマーク、トランプのマークなど、身の回りは色と形であふれています。色と形の言葉を英語《えいご》で言えると、「赤い丸をかいて」「青い星はどこ？」のように、友だちと遊びながら話せるようになります。",
  sections: [
    {
      heading: "色の言葉は、身の回りの物と結《むす》びつけて覚《おぼ》える",
      body: "色の言葉は、聞いたらすぐにその色が思いうかぶようにしておくことが大切です。先生の言う{{red}}を聞いたら、赤い物を指さしてみましょう。りんごやトマトを見たら red、空を見たら blue のように、{{物と色を結《むす》びつけて}}声に出すと覚《おぼ》えやすくなります。",
      figure: {
        type: "compare",
        title: "色の言葉と、その色の物",
        columns: [{ title: "英語《えいご》", tone: "blue" }, { title: "その色の物（例《れい》）" }],
        rows: [
          { label: "赤", cells: ["red", "りんご・トマト"] },
          { label: "青", cells: ["blue", "晴れた日の空"] },
          { label: "黄色", cells: ["yellow", "バナナ・ひよこ"] },
          { label: "緑", cells: ["green", "木の葉・ピーマン"] },
          { label: "白", cells: ["white", "雪・牛乳《ぎゅうにゅう》"] },
          { label: "黒", cells: ["black", "夜の空・黒板消し"] },
        ],
        note: "ほかにも purple（むらさき）、pink（ピンク）、orange（オレンジ色）、brown（茶色）がある。",
      },
    },
    {
      heading: "形の言葉は、角と線で見分ける",
      body: "形を表す言葉も覚《おぼ》えましょう。{{circle}}は丸、{{triangle}}は三角、{{square}}は正方形です。角がいくつあるか、まがった線があるかを見ると、どの言葉か考えやすくなります。triangle の tri は「3」を表すので、角が3つの形です。",
      figure: {
        type: "tree",
        title: "形の言葉を分けてみる",
        root: {
          label: "形",
          children: [
            {
              label: "角がある",
              children: [
                { label: "triangle", sub: "三角・角が3つ", tone: "yellow" },
                { label: "square", sub: "正方形・角が4つ", tone: "yellow" },
                { label: "diamond", sub: "ひし形" },
                { label: "star", sub: "星・とがった先5つ" },
              ],
            },
            {
              label: "まがった線",
              children: [
                { label: "circle", sub: "丸", tone: "blue" },
                { label: "heart", sub: "ハート", tone: "blue" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "色と形をいっしょに言うときは、色が先",
      body: "「赤い丸」は英語《えいご》で{{a red circle}}です。日本語と同じで、{{色の言葉を形の言葉の前}}に言います。「青い星」なら a blue star です。形の言葉の前の a は「1つの」という気持ちで、さいごまではっきり言いましょう。",
      figure: {
        type: "formula",
        title: "形の前に色をつける",
        prose: true,
        steps: [
          { expr: "a circle", note: "丸（1つ）" },
          { expr: "a {{red}} circle", note: "色を形の前に入れる" },
          { expr: "I see a {{red}} circle.", note: "赤い丸が見えます" },
          { expr: "a {{blue}} star / a {{green}} heart", note: "色をかえても同じ順《じゅん》" },
        ],
      },
    },
    {
      heading: "好《す》きな色をたずねて、答える",
      body: "好《す》きな色をたずねるときは {{What color do you like?}} と言います。答えるときは {{I like 〜.}} の後ろに色の言葉を入れます。相手の答えを聞いたら、Me, too.（わたしも）や Nice. と返事をすると、会話が続《つづ》きます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "好《す》きな色の会話",
        steps: [
          { label: "What color do you like?", sub: "何色が好《す》き？", tone: "blue" },
          { label: "I like green.", sub: "緑が好《す》きだよ", tone: "yellow" },
          { label: "Me, too!", sub: "わたしも！" },
        ],
        arrows: ["たずねる", "聞いて返事"],
      },
    },
  ],
  mistakes: [
    { wrong: "「赤い丸」を a circle red と言う", right: "a red circle", why: "英語《えいご》でも、色の言葉は形の言葉の前に来ます。" },
    { wrong: "square と triangle を取りちがえる", right: "square は正方形、triangle は三角", why: "tri は「3」を表すので、角が3つの三角が triangle です。" },
    { wrong: "What color do you like? に Yes. と答える", right: "I like blue. のように色を答える", why: "「何色？」と聞かれているので、Yes か No ではなく色の言葉で答えます。" },
  ],
  check: [
    { q: "「黄色い星」を英語《えいご》で言うと？", a: "a yellow star", why: "色（yellow）を形（star）の前に言います。" },
    { q: "circle はどんな形？", a: "丸", why: "まがった線だけでできた、角のない形です。" },
    { q: "What color do you like? に「緑が好《す》き」と答えると？", a: "I like green.", why: "I like の後ろに色の言葉を入れます。" },
  ],
  next: [
    { label: "カードとドリル「色・形の言い方」", href: "/learn/eigo-sho/e-english-34-iro-katachi" },
    { label: "図解《ずかい》レクチャー「好《す》きなものを伝《つた》える」", href: "/learn/lecture/e-english-34-suki" },
    { label: "前の単元《たんげん》「数の言い方」", href: "/learn/eigo-sho/e-english-34-kazu" },
  ],
};
