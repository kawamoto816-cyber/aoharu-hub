import type { Lecture } from "../types";

export const J_EN_1_LISTENING: Lecture = {
  unit: "j-en-1-listening",
  title: "リスニングは「最初の1語」と「数字」をつかめば答えが絞れる",
  hook: "英語の放送は一度きりで、聞きのがした文はもどってきません。でも、すべての単語を聞き取る必要はなく、{{答えに関わる語}}さえつかめば正解できます。テストのリスニングは、どこを聞けばよいかを知っているだけで点数が大きく変わります。",
  sections: [
    {
      heading: "放送の前・中・後にすること",
      body: "放送が始まる前に{{選択肢を読んで}}、何が聞かれそうか（時刻？場所？）を予想しておきます。聞いている間は、数字・曜日・人の名前を{{メモ}}します。会話の{{最後の質問}}をよく聞き、それに合う答えを選びましょう。",
      figure: {
        type: "flow",
        title: "リスニングの3ステップ",
        steps: [
          { label: "選択肢を読む", sub: "何が聞かれるか予想", tone: "blue" },
          { label: "メモをとる", sub: "数字・曜日・名前", tone: "yellow" },
          { label: "質問に合わせる", sub: "最後の文を聞く", tone: "red" },
        ],
      },
    },
    {
      heading: "疑問詞で、答えの種類が決まる",
      body: "疑問文の{{最初の1語}}を聞きのがさないことがいちばん大切です。What ならもの、Where なら場所、When なら時を答えます。How many は数、How は手段や調子です。最初の1語で、答えになる選択肢の{{種類}}がしぼれます。",
      figure: {
        type: "compare",
        title: "最初の1語と答えの例",
        columns: [{ title: "疑問詞", tone: "yellow" }, { title: "答えること" }, { title: "答えの例" }],
        rows: [
          { cells: ["Where", "場所", "It's on the desk."] },
          { cells: ["When", "時・日付", "It's May 5."] },
          { cells: ["What time", "時刻", "It's ten thirty."] },
          { cells: ["Who", "人", "She is my cousin."] },
          { cells: ["How many", "数", "I have two."] },
        ],
      },
    },
    {
      heading: "Yes / No の質問は、同じ動詞で答える",
      body: "Do・Are・Can など、疑問詞のない質問には{{Yes か No}}で答えます。そのとき、質問に使われた{{同じ語}}で返すのがルールです。Can you 〜? なら can、Are you 〜? なら am で答えるので、選択肢の Yes, I do. と Yes, I am. を見分けられます。",
      figure: {
        type: "tree",
        title: "最初の語から答えの形を決める",
        root: {
          label: "質問の最初の語",
          children: [
            { label: "Do / Does", tone: "blue", children: [{ label: "Yes, I do.", sub: "No, I don't." }] },
            { label: "Are / Is", tone: "yellow", children: [{ label: "Yes, I am.", sub: "No, it isn't." }] },
            { label: "Can", tone: "red", children: [{ label: "Yes, I can.", sub: "No, I can't." }] },
          ],
        },
      },
    },
    {
      heading: "似た音の数字と、決まった返し方",
      body: "fifteen（15）と fifty（50）のような数字は、{{強く読む位置}}で聞き分けます。-teen は後ろの teen を強く、-ty は前を強く読みます。また、Thank you. には You're welcome.、I'm sorry. には That's OK. のように、{{決まった返し方}}がある表現はセットで覚えておくと、聞いた瞬間に答えが選べます。",
      figure: {
        type: "compare",
        title: "聞き分けと決まった返し方",
        columns: [{ title: "聞こえた文" }, { title: "ポイント・返し方", tone: "yellow" }],
        rows: [
          { label: "数字", cells: ["fif-TEEN", "後ろが強い → 15"] },
          { label: "数字", cells: ["FIF-ty", "前が強い → 50"] },
          { label: "お礼", cells: ["Thank you.", "You're welcome."] },
          { label: "おわび", cells: ["I'm sorry.", "That's OK."] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "Can you swim? — Yes, I do.", right: "Yes, I can.", why: "Can でたずねられたら can で答えます。" },
    { wrong: "1語でも聞きのがすとあきらめる", right: "答えに関わる語だけを拾う", why: "全部聞き取れなくても、疑問詞・数字・最後の質問がわかれば答えられます。" },
    { wrong: "会話の最初に出た時刻を答える", right: "質問が聞いている時刻を答える", why: "会話には「今の時刻」と「バスの時刻」など、数字が2つ以上出てくることがよくあります。" },
  ],
  check: [
    { q: "A: Where is my cap? の答えとして合うのは「It's blue.」と「It's on the chair.」のどっち？", a: "It's on the chair.", why: "Where は場所をたずねる。" },
    { q: "Are you busy? に「いいえ」で答えると？", a: "No, I'm not.", why: "Are you 〜? には I am を使って答える。" },
    { q: "「後ろを強く」読む数字は fourteen と forty のどっち？", a: "fourteen", why: "-teen は後ろの teen を強く読む。forty は前が強い。" },
  ],
  next: [
    { label: "4択ドリル「リスニング」に挑戦", href: "/learn/eigo-chu/j-en-1-listening" },
    { label: "疑問詞を確かめる「疑問詞」のドリル", href: "/learn/eibunpo-chu/j-en-1-gimonshi" },
    { label: "数字や曜日を覚える「英単語」", href: "/learn/lecture/j-en-1-tango" },
  ],
};
