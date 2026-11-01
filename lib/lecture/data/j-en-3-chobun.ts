import type { Lecture } from "../types";

export const J_EN_3_CHOBUN: Lecture = {
  unit: "j-en-3-chobun",
  title: "長文は「段落の要点」と「つなぎの語」で読み、答えは本文にもどって確かめる",
  hook: "長文を見ると、知らない単語があるだけで手が止まってしまうことがあります。でも、テストの長文問題は、一語一語を訳すより{{段落ごとの要点}}と{{文と文のつながり}}をつかむほうが速く正確に解けます。ここでは短い文章を例に、読み方の型を身につけます。",
  sections: [
    {
      heading: "設問を先に見て、段落ごとに要点を1行でつかむ",
      body: "本文を読む前に{{設問}}にざっと目を通すと、何に注意して読めばよいかがわかります。読みながら、段落ごとに「{{だれが・何をして・どうなったか}}」を日本語1行でまとめます。下の3段落の文章では、始まり → 変化 → 今、という流れになっています。",
      figure: {
        type: "formula",
        title: "例文（3段落）と、段落ごとの要点",
        prose: true,
        steps: [
          { expr: "Last April, Mika and four classmates {{started a small vegetable garden}} behind their school. At first, few students were interested in it.", note: "始まり：5人で畑を始めた" },
          { expr: "In July, {{however}}, the tomatoes grew big and red. The students gave some of {{them}} to the school cafeteria, and lunch became more popular.", note: "変化：トマトが育ち、給食に" },
          { expr: "Now {{more than thirty students}} work in the garden. Mika says, “Growing vegetables taught us how to work together.”", note: "今：30人以上。協力を学んだ" },
        ],
      },
    },
    {
      heading: "it・they・this が指すものは、前から探す",
      body: "代名詞や this・that などの{{指示語}}は、ふつう{{それより前}}に出た語や内容を指します。第2段落の them は、直前の文の the tomatoes です。見つけたら、その語を代わりに入れて読んでみて、{{意味が通るか}}を確かめましょう。this は語ではなく、前の文全体の内容を指すこともあります。",
      figure: {
        type: "flow",
        title: "指示語の指すものを見つける",
        steps: [
          { label: "指示語に印", sub: "them / it / this", tone: "yellow" },
          { label: "前の文を探す", sub: "数が合う名詞・内容" },
          { label: "入れかえて確認", sub: "the tomatoes で通る", tone: "blue" },
        ],
      },
    },
    {
      heading: "つなぎの語が、文と文の関係を教えてくれる",
      body: "however や so などの{{つなぎの語}}は、前後の文がどんな関係かを示す道しるべです。特に however・but のあとは、前と{{反対の内容}}が来て、筆者が言いたいことになりやすい部分です。例文でも however のあとで「関心が少ない → トマトが育った」と話が変わっています。",
      figure: {
        type: "compare",
        title: "つなぎの語と、そのあとに来る内容",
        columns: [{ title: "はたらき" }, { title: "あとに来る内容", tone: "yellow" }],
        rows: [
          { label: "However / But", cells: ["逆接（しかし）", "前と反対の内容・大事な点"] },
          { label: "So", cells: ["結果（だから）", "前の文の結果"] },
          { label: "For example", cells: ["例を挙げる", "前の内容の具体例"] },
          { label: "First / Then", cells: ["順序", "できごと・手順の順番"] },
        ],
      },
    },
    {
      heading: "内容に合う文は、本文の該当する場所にもどって選ぶ",
      body: "「本文の内容に合うもの」を選ぶ問題では、選択肢のキーワードを手がかりに{{本文の該当する場所}}にもどり、1文ずつ照らし合わせます。まちがいの選択肢は、{{数・人・時}}が少しだけちがっていたり、{{本文に書いていないこと}}が入っていたりします。記憶にたよらず、必ず本文で確かめましょう。",
      figure: {
        type: "tree",
        title: "選択肢を本文と照らし合わせる",
        root: {
          label: "選択肢の文",
          children: [
            { label: "本文と一致", sub: "言いかえも OK", tone: "blue", children: [{ label: "○ 正解" }] },
            { label: "一部がちがう", sub: "数・人・時", tone: "red", children: [{ label: "× 30人で始めた" }] },
            { label: "本文にない", sub: "ありそうでも ×", tone: "red", children: [{ label: "× 先生が提案した" }] },
          ],
        },
        note: "例文では畑を始めたのは5人（Mika＋4人）。30人以上は「今」の人数。",
      },
    },
  ],
  mistakes: [
    { wrong: "知らない単語が出るたびに止まって、全部訳そうとする", right: "前後の文から意味を推測して読み進める", why: "1語わからなくても、段落の要点はつかめることがほとんどです。設問に関わる語だけ、ていねいに考えます。" },
    { wrong: "them を、すぐ近くの the students だと考える", right: "them ＝ the tomatoes", why: "「生徒たちは them の一部を給食室にあげた」なので、生徒ではなく、前の文のトマトを指します。意味が通るかで確かめます。" },
    { wrong: "記憶だけで内容一致の選択肢を選ぶ", right: "本文の該当する場所にもどって確かめる", why: "数や時が少しだけちがう選択肢は、記憶だけだと見分けにくいからです。" },
  ],
  check: [
    { q: "例文で、畑を始めたのは何人？", a: "5人", why: "Mika and four classmates なので、Mika ＋ 4人 ＝ 5人。" },
    { q: "例文の第2段落の them は何を指す？", a: "the tomatoes（トマト）", why: "直前の文の the tomatoes を入れると「トマトの一部を給食室にあげた」と意味が通る。" },
    { q: "However のあとには、ふつうどんな内容が来る？", a: "前と反対の内容", why: "however は逆接のつなぎの語。話の流れが変わり、大事な内容が来やすい。" },
  ],
  next: [
    { label: "4択ドリル「長文読解」に挑戦", href: "/learn/eigo-chu/j-en-3-chobun" },
    { label: "長い文を読みとく「関係代名詞」", href: "/learn/lecture/j-en-3-kankei" },
    { label: "語いをふやす「英単語」", href: "/learn/chu-tango" },
  ],
};
