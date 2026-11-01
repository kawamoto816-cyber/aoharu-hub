import type { Lecture } from "../types";

export const J_EN_1_CAN: Lecture = {
  unit: "j-en-1-can",
  title: "can は動詞の前に置いて「できる」。あとの動詞はいつも原形",
  hook: "「泳げる」「ピアノがひける」「この部屋を使ってもいい？」。できること・してもよいかを伝える言い方は、自己紹介にも頼みごとにも使います。can は動詞に意味をそえる{{助動詞}}の最初の1つで、ここでのルールは中2で習う will や must にもそのまま通じます。",
  sections: [
    {
      heading: "can は動詞の前。動詞は原形にもどす",
      body: "「〜できる」は、動詞の前に{{can}}を置きます。can のあとの動詞は、主語が何であっても{{原形}}です。He plays → He can play のように、三単現の s はとれます。can 自体の形も変わらず、cans とはなりません。",
      figure: {
        type: "formula",
        title: "He plays the guitar. に can を入れる",
        prose: true,
        steps: [
          { expr: "He {{plays}} the guitar.", note: "ふつうの文：三単現の s" },
          { expr: "He {{can play}} the guitar.", note: "can＋原形（s はとる）" },
          { expr: "He {{can't}} play the guitar.", note: "否定文：cannot / can't" },
          { expr: "{{Can}} he play the guitar?", note: "疑問文：Can を主語の前へ" },
          { expr: "— Yes, he {{can}}. / No, he {{can't}}.", note: "答えも can で" },
        ],
        note: "否定はふつう cannot と1語で書く。短縮形は can't。",
      },
    },
    {
      heading: "否定文・疑問文で do / does は使わない",
      body: "can の文の否定文・疑問文は、be動詞の文と同じように{{can そのものを動かします}}。否定は can のあとに not（cannot / can't）、疑問は Can を主語の前に出します。do や does はいっしょに使いません。疑問詞を使うときは、{{What can you 〜?}}のように疑問詞を文の最初に置きます。",
    },
    {
      heading: "can の3つの意味",
      body: "can の中心は{{能力}}の「〜できる」です。ほかに、{{Can I 〜?}}で「〜してもいいですか」と{{許可}}を求め、{{Can you 〜?}}で「〜してくれますか」と{{依頼}}する言い方もあります。主語が I か you かで意味が分かれる、と覚えましょう。",
      figure: {
        type: "tree",
        title: "can の意味の分かれ方",
        root: {
          label: "can",
          children: [
            { label: "能力", sub: "〜できる", tone: "blue", children: [{ label: "I can swim." }] },
            { label: "許可", sub: "Can I 〜?", tone: "yellow", children: [{ label: "Can I sit here?" }] },
            { label: "依頼", sub: "Can you 〜?", tone: "red", children: [{ label: "Can you help me?" }] },
          ],
        },
      },
    },
    {
      heading: "Can I 〜? / Can you 〜? への答え方",
      body: "許可や依頼の質問には、Yes, you can. よりも{{Sure.}}（いいですよ）や{{OK.}}がよく使われます。ことわるときは{{Sorry, 〜.}}と理由をそえるとていねいです。「できるか」をたずねる質問には Yes, I can. / No, I can't. と can で答えます。",
      figure: {
        type: "compare",
        title: "質問の種類と返し方",
        columns: [{ title: "能力の質問" }, { title: "許可・依頼", tone: "yellow" }],
        rows: [
          { label: "例", cells: ["Can you swim?", "Can I use this pen?"] },
          { label: "はい", cells: ["Yes, I can.", "Sure. / OK."] },
          { label: "いいえ", cells: ["No, I can't.", "Sorry, I'm using it."] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "She can speaks English.", right: "She can speak English.", why: "can のあとの動詞は、主語が3人称単数でも原形です。" },
    { wrong: "Do you can swim?", right: "Can you swim?", why: "can の疑問文は Can を主語の前に出します。do は使いません。" },
    { wrong: "Ken cans play tennis.", right: "Ken can play tennis.", why: "can 自体に s はつきません。" },
    { wrong: "I can't not ski.", right: "I can't ski.", why: "can't の中に not が入っているので、not は1回だけです。" },
  ],
  check: [
    { q: "My brother cooks curry. を「〜できる」の文に。", a: "My brother can cook curry.", why: "can を入れ、cooks を原形 cook にもどす。" },
    { q: "Can your sister ride a bike? に「いいえ」で答えると？", a: "No, she can't.", why: "your sister は she にかえ、can で答える。" },
    { q: "「窓を開けてくれますか」と頼むとき、文の最初の2語は？", a: "Can you", why: "依頼は Can you 〜?（Can you open the window?）。" },
  ],
  next: [
    { label: "4択ドリル「助動詞 can」に挑戦", href: "/learn/eibunpo-chu/j-en-1-can" },
    { label: "前の単元「命令文」のレクチャー", href: "/learn/lecture/j-en-1-meirei" },
    { label: "中2「助動詞」（must・may・should など）", href: "/learn/eibunpo-chu/j-en-2-jodoshi" },
  ],
};
