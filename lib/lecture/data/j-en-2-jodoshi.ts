import type { Lecture } from "../types";

export const J_EN_2_JODOSHI: Lecture = {
  unit: "j-en-2-jodoshi",
  title: "助動詞は動詞に気持ちを足す。must not と don't have to は意味がちがう",
  hook: "「宿題をしなければならない」「ここで写真をとってはいけない」「もっと寝たほうがいい」。こうした義務・禁止・アドバイスは、動詞の前に助動詞を置いて表します。特に must not と don't have to は、形が似ているのに意味が大きくちがうので、テストでもよく問われます。",
  sections: [
    {
      heading: "助動詞 ＋ 動詞の原形が基本の形",
      body: "can・will と同じように、must・should・may も動詞の前に置く{{助動詞}}です。あとの動詞は{{いつも原形}}で、主語が he でも助動詞に -s はつきません。否定文は助動詞の{{すぐ後ろに not}}、疑問文は助動詞を{{主語の前}}に出します。",
      figure: {
        type: "formula",
        title: "He studies. に must を入れる",
        prose: true,
        steps: [
          { expr: "He {{studies}} hard.", note: "三単現の -s" },
          { expr: "He {{must study}} hard.", note: "must のあとは原形" },
          { expr: "He {{must not}} play games now.", note: "否定：must のあとに not" },
          { expr: "{{Must}} he study hard?", note: "疑問：Must を前へ" },
        ],
      },
    },
    {
      heading: "must と have to：肯定は同じ、否定でちがう",
      body: "must と {{have to}} は、どちらも「〜しなければならない」です。ところが否定にすると、{{must not}} は「〜してはいけない」という{{禁止}}、{{don't have to}} は「〜する必要はない」という意味になります。「しなくてもいい」と「してはいけない」は正反対に近いので、しっかり区別しましょう。",
      figure: {
        type: "compare",
        title: "must と have to の比べ方",
        columns: [{ title: "must", tone: "blue" }, { title: "have to", tone: "yellow" }],
        rows: [
          { label: "肯定", cells: ["〜しなければならない", "〜しなければならない"] },
          { label: "否定", cells: ["must not：〜してはいけない", "don't have to：〜する必要はない"] },
          { label: "過去", cells: ["（had to を使う）", "had to：〜しなければならなかった"] },
        ],
      },
    },
    {
      heading: "have to は主語と時で形が変わる",
      body: "have to は must とちがって、ふつうの動詞 have と同じように形が変わります。主語が3人称単数なら{{has to}}、過去なら{{had to}}です。否定文・疑問文は {{do / does / did}} を使って作ります。未来なら will have to になります。",
      figure: {
        type: "formula",
        title: "have to の形の変化",
        prose: true,
        steps: [
          { expr: "I {{have to}} get up early.", note: "I・you・複数" },
          { expr: "She {{has to}} get up early.", note: "3人称単数 → has to" },
          { expr: "She {{had to}} get up early.", note: "過去 → had to" },
          { expr: "{{Does}} she have to get up early?", note: "疑問は does を前へ" },
          { expr: "She {{doesn't have to}} get up early.", note: "〜する必要はない" },
        ],
      },
    },
    {
      heading: "意味で分けると覚えやすい",
      body: "{{should}} は「〜すべきだ・〜したほうがよい」というアドバイス、{{may}} は「〜してもよい（許可）」と「〜かもしれない（推量）」の2つの意味があります。会話では {{May I 〜?}}（〜してもよいですか）、{{Shall I 〜?}}（〜しましょうか）、{{Shall we 〜?}}（〜しませんか）、{{Could you 〜?}}（〜していただけませんか）もよく使います。",
      figure: {
        type: "tree",
        title: "助動詞を意味で分ける",
        root: {
          label: "助動詞",
          children: [
            { label: "義務", sub: "〜しなければ", tone: "red", children: [{ label: "must / have to" }] },
            { label: "助言", sub: "〜すべきだ", tone: "yellow", children: [{ label: "should" }] },
            { label: "許可・推量", sub: "〜してよい／かも", tone: "blue", children: [{ label: "may / can" }] },
          ],
        },
        note: "Shall I 〜? の答えは Yes, please. / No, thank you. が基本。",
      },
    },
  ],
  mistakes: [
    { wrong: "He musts go home.", right: "He must go home.", why: "助動詞には -s をつけません。あとの動詞も原形です。" },
    { wrong: "You must not come tomorrow.", right: "You don't have to come tomorrow.", why: "「明日は来なくていい」と言いたいとき。must not は「来てはいけない」という禁止で、「必要はない」は don't have to です。" },
    { wrong: "She have to clean her room.", right: "She has to clean her room.", why: "have to は主語が3人称単数なら has to になります。" },
    { wrong: "I musted finish my homework yesterday.", right: "I had to finish my homework yesterday.", why: "must には過去形がないので、過去は had to で表します。" },
  ],
  check: [
    { q: "「あなたはここで泳いではいけません」を英語に。", a: "You must not swim here.", why: "禁止は must not ＋ 原形。" },
    { q: "He has to wash the dishes. を否定文にしましょう。", a: "He doesn't have to wash the dishes.", why: "has to の否定は doesn't have to（〜する必要はない）。" },
    { q: "You ___ go to bed early.（早く寝たほうがいい）の ___ に入る助動詞は？", a: "should", why: "「〜したほうがよい」というアドバイスは should。" },
  ],
  next: [
    { label: "4択ドリル「助動詞」に挑戦", href: "/learn/eibunpo-chu/j-en-2-jodoshi" },
    { label: "最初の助動詞「can」をふり返る", href: "/learn/eibunpo-chu/j-en-1-can" },
    { label: "つぎに「接続詞」", href: "/learn/eibunpo-chu/j-en-2-setsuzokushi" },
  ],
};
