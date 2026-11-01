import type { Lecture } from "../types";

export const H_ENG_GRAM_JODOSHI: Lecture = {
  unit: "h-eng-gram-jodoshi",
  title: "助動詞は話し手の「気持ち・確信の強さ」を足す。過去の推量は助動詞＋have＋過去分詞",
  hook: "「彼は疲れている」と言い切るか、「疲れているにちがいない」「疲れているかもしれない」とぼかすか。日本語では文末で変えるこの差を、英語では動詞の前の助動詞で表します。高校では、must や may が「義務・許可」と「推量」の2つの顔をもつこと、過去のことを推し量る形が大事になります。",
  sections: [
    {
      heading: "1つの助動詞に、2つの顔がある",
      body: "助動詞の後ろはいつも{{動詞の原形}}です。そして多くの助動詞には、{{「〜しなければならない・〜してもよい」（義務・許可）}}と、{{「〜にちがいない・〜かもしれない」（推量）}}の2つの意味があります。どちらの意味かは文脈で決まり、be 動詞や状態を表す動詞が続くときは推量になりやすいです。",
      figure: {
        type: "compare",
        title: "助動詞の2つの顔",
        columns: [{ title: "義務・許可など", tone: "blue" }, { title: "推量", tone: "yellow" }],
        rows: [
          { label: "must", cells: ["〜しなければならない", "〜にちがいない"] },
          { label: "may", cells: ["〜してもよい", "〜かもしれない"] },
          { label: "should", cells: ["〜すべきだ", "〜のはずだ"] },
          { label: "can't", cells: ["〜できない・してはだめ", "〜のはずがない"] },
        ],
        note: "例：You must be tired.（疲れているにちがいない）は推量の must。",
      },
    },
    {
      heading: "推量の助動詞は「確信の強さ」でならぶ",
      body: "推量の助動詞は、話し手が{{どれくらい確かだと思っているか}}で使い分けます。must は「ほぼまちがいない」、should は「（理屈では）そのはず」、may は「半々」、might・could は「ひょっとしたら」くらいです。反対に「ありえない」と強く打ち消すときは{{can't（cannot）}}を使います。",
      figure: {
        type: "area",
        kind: "bar",
        title: "確信の強さ（目安）",
        max: 100,
        bars: [
          { label: "must", parts: [{ value: 95, tone: "red" }], total: "ほぼ確実" },
          { label: "should", parts: [{ value: 75, tone: "yellow" }], total: "そのはず" },
          { label: "may", parts: [{ value: 50, tone: "blue" }], total: "半々" },
          { label: "might・could", parts: [{ value: 35, tone: "blue" }], total: "ひょっとしたら" },
        ],
        note: "長さは順番を見せるための目安で、数値に決まりはない。may と might の差は小さいとする考え方もある。",
      },
    },
    {
      heading: "過去のことは「助動詞＋have＋過去分詞」",
      body: "「（あのとき）〜したにちがいない」のように{{過去のことを今推し量る}}ときは、助動詞の後ろを{{have＋過去分詞}}にします。助動詞そのものには過去形の意味をもたせず、have 以下で「過去」を示すしくみです。should have＋過去分詞は「〜すべきだったのに（しなかった）」という{{後悔・非難}}を表します。",
      figure: {
        type: "formula",
        title: "今の推量 → 過去の推量",
        prose: true,
        steps: [
          { expr: "She must {{be}} at home now.", note: "今：家にいるにちがいない" },
          { expr: "She must {{have been}} at home last night.", note: "過去：いたにちがいない" },
          { expr: "He can't {{have forgotten}} the date.", note: "過去：忘れたはずがない" },
          { expr: "I should {{have left}} earlier.", note: "過去：もっと早く出るべきだった（後悔）" },
        ],
      },
    },
    {
      heading: "must not と don't have to は意味がまったくちがう",
      body: "肯定文の must と have to はどちらも「〜しなければならない」ですが、否定にすると分かれます。{{must not}} は「〜してはいけない」という{{禁止}}、{{don't have to}} は「〜する必要はない」という{{不要}}です。need not（needn't）も「〜する必要はない」を表します。",
      figure: {
        type: "compare",
        title: "否定にすると分かれる",
        columns: [{ title: "must not", tone: "red" }, { title: "don't have to", tone: "blue" }],
        rows: [
          { label: "意味", cells: ["〜してはいけない", "〜する必要はない"] },
          { label: "はたらき", cells: ["禁止", "不要（してもよい）"] },
          { label: "例", cells: ["I mustn't go.", "I don't have to go."] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "You don't have to take photos here.（撮影禁止、のつもり）", right: "You must not take photos here.", why: "don't have to は「〜する必要はない」。禁止は must not です。" },
    { wrong: "I should study harder last week.", right: "I should have studied harder last week.", why: "過去にしなかったことへの後悔は should have＋過去分詞で表します。" },
    { wrong: "You will can swim soon.", right: "You will be able to swim soon.", why: "助動詞は2つ続けられません。will の後ろでは can の代わりに be able to を使います。" },
    { wrong: "She can't be in the office. →「彼女は事務所にいることができない」", right: "「彼女が事務所にいるはずがない」", why: "can't ＋ be は推量の否定「〜のはずがない」になることが多いです。" },
  ],
  check: [
    { q: "「彼がそんなことを言ったはずがない」を英語にしましょう。", a: "He can't (cannot) have said such a thing.", why: "過去のことを強く打ち消す推量は can't have＋過去分詞。" },
    { q: "You ___ come if you're busy. に入るのは must not と don't have to のどちら？", a: "don't have to", why: "「忙しいなら来る必要はない」という不要の意味。" },
    { q: "The lights are off. They may have gone out. の may have gone の意味は？", a: "出かけたかもしれない", why: "may have＋過去分詞は、過去のことについての「〜したかもしれない」。" },
  ],
  next: [
    { label: "4択ドリル「助動詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-jodoshi" },
    { label: "ひとつ前「完了形」", href: "/learn/eibunpo-ko/h-eng-gram-kanryo" },
    { label: "関連「仮定法」（would have＋過去分詞）", href: "/learn/eibunpo-ko/h-eng-gram-kateiho" },
  ],
};
