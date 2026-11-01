import type { Lecture } from "../types";

export const J_EN_2_TANGO: Lecture = {
  unit: "j-en-2-tango",
  title: "中2の英単語は「変化形」と「語の家族」でまとめて増やす",
  hook: "中2では、過去形・過去分詞（受け身や現在完了で使う形）、比較の -er・-est など、{{1つの単語のいろいろな形}}が出てきます。1語ずつばらばらに覚えるより、決まった型や「なかま」でまとめると、覚える量がぐっと減ります。",
  sections: [
    {
      heading: "不規則動詞は4つの型に分ける",
      body: "不規則動詞の「原形 - 過去形 - 過去分詞」は、{{同じ形がどこに出るか}}で4つの型に分けられます。buy - bought - bought は{{過去形と過去分詞が同じ}}型、go - went - gone は{{3つともちがう}}型です。型ごとにまとめて、リズムよく声に出して覚えましょう。",
      figure: {
        type: "compare",
        title: "原形 - 過去形 - 過去分詞の4つの型",
        columns: [{ title: "例 1" }, { title: "例 2", tone: "yellow" }],
        rows: [
          { label: "A-B-C", cells: ["go - went - gone", "see - saw - seen"] },
          { label: "A-B-B", cells: ["buy - bought - bought", "make - made - made"] },
          { label: "A-B-A", cells: ["come - came - come", "run - ran - run"] },
          { label: "A-A-A", cells: ["cut - cut - cut", "put - put - put"] },
        ],
        note: "規則動詞も過去形と過去分詞が同じ（play - played - played）。",
      },
    },
    {
      heading: "語の終わりで品詞が変わる",
      body: "単語の終わりに決まった形（{{接尾辞}}）をつけると、ちがう品詞の語になります。-ful は形容詞、-ly は副詞、-er は「〜する人」、-ness や -tion は名詞になることが多いです。もとの語を知っていれば、初めて見る単語の意味も{{推測}}できます。",
      figure: {
        type: "tree",
        title: "もとの語から広がる「語の家族」",
        root: {
          label: "もとの語",
          children: [
            { label: "use", sub: "使う", tone: "blue", children: [{ label: "useful", sub: "役に立つ" }] },
            { label: "teach", sub: "教える", tone: "yellow", children: [{ label: "teacher", sub: "教える人" }] },
            {
              label: "happy",
              sub: "幸せな",
              tone: "red",
              children: [
                { label: "happily", sub: "幸せに" },
                { label: "happiness", sub: "幸せ" },
              ],
            },
          ],
        },
        note: "happy → happily のように、y で終わる語は y を i にかえてからつける。",
      },
    },
    {
      heading: "熟語は「動詞＋小さな語」で意味が変わる",
      body: "look at（〜を見る）、look for（〜を{{さがす}}）、look after（〜の{{世話をする}}）のように、同じ動詞でも後ろの前置詞などで意味が大きく変わります。熟語は{{ひとかたまり}}で覚え、例文の中で使えるようにしましょう。",
      figure: {
        type: "compare",
        title: "中2でよく使う熟語",
        columns: [{ title: "熟語", tone: "yellow" }, { title: "意味" }],
        rows: [
          { cells: ["look for 〜", "〜をさがす"] },
          { cells: ["look after 〜", "〜の世話をする"] },
          { cells: ["take care of 〜", "〜の世話をする・大事にする"] },
          { cells: ["get to 〜", "〜に着く"] },
          { cells: ["be good at 〜", "〜が得意だ"] },
        ],
      },
    },
    {
      heading: "形容詞は「反対語」と「比較の形」をセットで",
      body: "形容詞は{{反対の意味の語とペア}}で覚えると、一度に2語おぼえられます。比較の文で使うので、{{-er・-est の形}}もいっしょに確かめましょう。good - better - best のように不規則に変わる語もあります。",
      figure: {
        type: "flow",
        title: "1つの形容詞から3つ覚える",
        steps: [
          { label: "long", sub: "長い", tone: "blue" },
          { label: "short", sub: "短い", tone: "yellow" },
          { label: "比較の形", sub: "shorter / shortest", tone: "red" },
        ],
        arrows: ["反対語", "比べる形"],
      },
    },
  ],
  mistakes: [
    { wrong: "I buyed a new bag.", right: "I bought a new bag.", why: "buy は不規則動詞（buy - bought - bought）。-ed はつけません。" },
    { wrong: "Please walk careful.", right: "Please walk carefully.", why: "動詞（walk）を説明するのは副詞。careful に -ly をつけます。" },
    { wrong: "（さがしている）I'm looking at my key.", right: "I'm looking for my key.", why: "look at は「見る」、look for は「さがす」。熟語はかたまりで意味が決まります。" },
    { wrong: "This is gooder than that.", right: "This is better than that.", why: "good は good - better - best と不規則に変わります。" },
  ],
  check: [
    { q: "see の過去分詞は？", a: "seen", why: "see - saw - seen（A-B-C 型）。" },
    { q: "useful の意味と、もとの語は？", a: "役に立つ／use", why: "use（使う）＋ -ful で形容詞になる。" },
    { q: "「〜の世話をする」を look を使った熟語で言うと？", a: "look after 〜", why: "take care of 〜 もほぼ同じ意味。" },
  ],
  next: [
    { label: "中学英単語1200で覚える", href: "/learn/chu-tango" },
    { label: "過去分詞を使う「受け身」のレクチャー", href: "/learn/lecture/j-en-2-ukemi" },
    { label: "-er・-est を使う「比較」のレクチャー", href: "/learn/lecture/j-en-2-hikaku" },
  ],
};
