import type { Lecture } from "../types";

export const J_EN_1_GIMONSHI: Lecture = {
  unit: "j-en-1-gimonshi",
  title: "疑問詞は文の先頭。そのあとはふつうの疑問文の語順",
  hook: "「大阪に住んでいますか？」なら Yes か No で答えられますが、「どこに住んでいますか？」には場所で答えます。具体的な情報をたずねるときに使うのが疑問詞です。疑問詞の種類と、文のどこに置くかをおさえましょう。",
  sections: [
    {
      heading: "疑問詞は何をたずねるか",
      body: "疑問詞は、たずねたい中身によって使い分けます。物は{{What}}、人は{{Who}}、持ち主は{{Whose}}、選ぶときは{{Which}}、時は{{When}}、場所は{{Where}}、理由は{{Why}}、方法やようすは{{How}}です。多くが wh で始まるので、まとめて wh 疑問文ともいいます。",
      figure: {
        type: "compare",
        title: "おもな疑問詞",
        columns: [{ title: "疑問詞", tone: "yellow" }, { title: "たずねること" }, { title: "例" }],
        rows: [
          { cells: ["What", "何", "What is this?"] },
          { cells: ["Who", "だれ", "Who is she?"] },
          { cells: ["Whose", "だれの", "Whose bag is this?"] },
          { cells: ["Which", "どちら", "Which is yours?"] },
          { cells: ["When", "いつ", "When is your birthday?"] },
          { cells: ["Where", "どこ", "Where do you live?"] },
          { cells: ["Why", "なぜ", "Why do you like it?"] },
          { cells: ["How", "どう・どうやって", "How do you go there?"] },
        ],
      },
    },
    {
      heading: "語順：疑問詞＋疑問文",
      body: "疑問詞は{{文の先頭}}に置き、そのあとに{{ふつうの疑問文}}（be動詞の疑問文や do / does の疑問文）を続けます。答えは Yes / No ではなく、たずねられた{{中身}}を答えます。Why の質問には、ふつう{{Because 〜}}で理由を答えます。",
      figure: {
        type: "formula",
        title: "ふつうの文から疑問詞の文へ",
        prose: true,
        steps: [
          { expr: "You live {{in Osaka}}.", note: "ふつうの文。たずねたいのは場所" },
          { expr: "{{Do}} you live in Osaka?", note: "まず疑問文にする" },
          { expr: "{{Where}} do you live?", note: "場所の部分を Where にして先頭へ" },
          { expr: "— I live {{in Osaka}}.", note: "Yes / No ではなく場所を答える" },
        ],
      },
    },
    {
      heading: "How と What は後ろの語で意味が広がる",
      body: "How は{{How ＋形容詞・副詞}}で、数や量、程度をたずねられます。What も{{What ＋名詞}}で「何の〜」「何時」などをたずねます。How many のあとの名詞は{{複数形}}にします。",
      figure: {
        type: "tree",
        title: "How ＋ 〜 と What ＋ 〜",
        root: {
          label: "後ろに語をつける疑問詞",
          tone: "navy",
          children: [
            {
              label: "How ＋形容詞",
              tone: "blue",
              children: [
                { label: "How many", sub: "数：〜s を続ける" },
                { label: "How much", sub: "値段・量" },
                { label: "How old", sub: "年れい・古さ" },
                { label: "How tall", sub: "身長・高さ" },
              ],
            },
            {
              label: "What ＋名詞",
              tone: "yellow",
              children: [
                { label: "What time", sub: "時刻" },
                { label: "What sport", sub: "何のスポーツ" },
                { label: "What color", sub: "何色" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "Who が主語になるとき",
      body: "「だれが〜しますか」と、疑問詞そのものが{{主語}}になるときは、do / does を使わず、{{疑問詞＋動詞}}の語順になります。Who は3人称単数あつかいなので、Who {{plays}} the piano? のように動詞に -s をつけます。答えは Ken does. のように「主語＋do / does」で短く答えます。",
    },
  ],
  mistakes: [
    { wrong: "Where you live?", right: "Where do you live?", why: "疑問詞のあとはふつうの疑問文の語順。一般動詞なら do / does が必要。" },
    { wrong: "Where do you live? — Yes, I do.", right: "I live in Osaka.", why: "疑問詞の質問には Yes / No で答えず、たずねられた中身を答える。" },
    { wrong: "How many book do you have?", right: "How many books do you have?", why: "How many のあとの数えられる名詞は複数形にする。" },
    { wrong: "Who does play the piano?", right: "Who plays the piano?", why: "Who が主語のときは does を使わず、動詞に -s をつける。" },
  ],
  check: [
    { q: "___ is your birthday? — It's May 5.", a: "When", why: "日付（時）を答えているので When。" },
    { q: "___ pens do you have? — I have three.", a: "How many", why: "数を答えているので How many。後ろの pens は複数形。" },
    { q: "He lives in Kyoto. の下線部 in Kyoto をたずねる文にしましょう。", a: "Where does he live?", why: "場所なので Where。主語が he なので does を使い、live は原形にもどす。" },
  ],
  next: [
    { label: "4択ドリル「疑問詞」に挑戦", href: "/learn/eibunpo-chu/j-en-1-gimonshi" },
    { label: "前の単元「代名詞」のレクチャー", href: "/learn/lecture/j-en-1-daimeishi" },
    { label: "つぎに「命令文」", href: "/learn/eibunpo-chu/j-en-1-meirei" },
  ],
};
