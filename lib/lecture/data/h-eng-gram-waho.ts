import type { Lecture } from "../types";

export const H_ENG_GRAM_WAHO: Lecture = {
  unit: "h-eng-gram-waho",
  title: "話法は「そのまま引用」か「自分の言葉で伝え直す」か。立場が変わると語も変わる",
  hook: "友だちが「明日ここに来るよ」と言ったのを、1週間後に別の人に伝えるなら「あの子は翌日そこに行くと言っていた」と言い直しますね。英語の話法の書きかえは、この「話し手の立場・時・場所の言い直し」をルールにしたものです。",
  sections: [
    {
      heading: "直接話法と間接話法",
      body: "人のことばを \" \" でそのまま示すのが{{直接話法}}、自分の言葉に直して that 節などで伝えるのが{{間接話法}}です。間接話法では、元の話し手の I が he や she に、「今・ここ」が「その時・そこ」に変わります。伝える動詞が過去形なら、that 節の中も{{時制の一致}}で過去にずらします。",
      figure: {
        type: "formula",
        title: "直接話法 → 間接話法",
        prose: true,
        steps: [
          { label: "直接", expr: "Ken said, \"{{I am}} busy {{now}}.\"", note: "ことばをそのまま引用" },
          { label: "間接", expr: "Ken said (that) {{he was}} busy {{then}}.", note: "I → he、am → was、now → then" },
        ],
      },
    },
    {
      heading: "書きかえは決まった順で",
      body: "平叙文の書きかえは、下の順に進めると迷いません。said to 人 は {{told 人}} に変えます。ただし、{{今も変わらない事実}}や習慣は、時制の一致をしないこともあります（He said that the earth goes around the sun.）。",
      figure: {
        type: "flow",
        dir: "col",
        title: "平叙文を間接話法にする手順",
        steps: [
          { label: "伝える動詞", sub: "said to → told", tone: "navy" },
          { label: "引用符をはずす", sub: "that でつなぐ" },
          { label: "人称を変える", sub: "I → he など", tone: "blue" },
          { label: "時制を一致", sub: "現在 → 過去 など", tone: "yellow" },
          { label: "時・場所の語", sub: "now → then など", tone: "red" },
        ],
      },
    },
    {
      heading: "変わる語の一覧",
      body: "間接話法では、話し手から見た時や場所が「その時の」言い方に変わります。today は {{that day}}、yesterday は {{the day before}}（the previous day）、tomorrow は {{the next day}}（the following day）です。ただし、同じ日に同じ場所で伝えるなら、変えないこともあります。",
      figure: {
        type: "compare",
        title: "直接話法と間接話法で変わる語",
        columns: [{ title: "直接話法", tone: "blue" }, { title: "間接話法", tone: "yellow" }],
        rows: [
          { cells: ["now", "then"] },
          { cells: ["today", "that day"] },
          { cells: ["yesterday", "the day before"] },
          { cells: ["tomorrow", "the next day"] },
          { cells: ["… ago", "… before"] },
          { cells: ["here / this", "there / that"] },
          { cells: ["is / does", "was / did"] },
          { cells: ["did / has done", "had done"] },
          { cells: ["will / can", "would / could"] },
        ],
      },
    },
    {
      heading: "疑問文・命令文を伝える",
      body: "疑問文は伝える動詞を{{ask}}にし、疑問詞（疑問詞がなければ{{if / whether}}）のあとを{{主語＋動詞の語順}}にします。命令文は{{tell 人 to 〜}}、Please のついた依頼は{{ask 人 to 〜}}で表し、「〜するな」は not to 〜 にします。",
      figure: {
        type: "formula",
        title: "疑問文・命令文の書きかえ",
        prose: true,
        steps: [
          { label: "直接", expr: "She said to me, \"Where {{do you live}}?\"", note: "疑問詞のある疑問文" },
          { label: "間接", expr: "She asked me where {{I lived}}.", note: "主語＋動詞の語順、時制の一致" },
          { label: "直接", expr: "He said to me, \"{{Are you}} tired?\"", note: "疑問詞のない疑問文" },
          { label: "間接", expr: "He asked me {{if I was}} tired.", note: "if / whether でつなぐ" },
          { label: "直接", expr: "Mom said to me, \"{{Don't}} be late.\"", note: "否定の命令文" },
          { label: "間接", expr: "Mom told me {{not to}} be late.", note: "tell 人 not to 〜" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "He said me that he was busy.", right: "He told me that he was busy.", why: "say は「人」をすぐ後ろに置けません。人に伝えるなら tell 人 that 〜 です。" },
    { wrong: "She asked me where did I live.", right: "She asked me where I lived.", why: "間接話法の疑問文は、疑問詞のあとをふつうの語順（主語＋動詞）にします。" },
    { wrong: "He told me don't open the box.", right: "He told me not to open the box.", why: "否定の命令文は tell 人 not to 〜 の形にします。" },
    { wrong: "She said that she will come the next day.", right: "She said that she would come the next day.", why: "said が過去なので、時制の一致で will は would になります。" },
  ],
  check: [
    { q: "Tom said, \"I am hungry.\" を間接話法に。", a: "Tom said (that) he was hungry.", why: "I → he、am → was（時制の一致）。" },
    { q: "She said to me, \"Close the door.\" を間接話法に。", a: "She told me to close the door.", why: "命令文は tell 人 to 〜。" },
    { q: "He said to me, \"Do you like tea?\" を間接話法に。", a: "He asked me if (whether) I liked tea.", why: "疑問詞のない疑問文は if / whether、語順は主語＋動詞、時制の一致。" },
  ],
  next: [
    { label: "4択ドリル「話法」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-waho" },
    { label: "つぎの単元「否定・倒置・強調・省略」", href: "/learn/eibunpo-ko/h-eng-gram-tokushu" },
    { label: "関連「時制」（時制の一致の土台）", href: "/learn/eibunpo-ko/h-eng-gram-jisei" },
  ],
};
