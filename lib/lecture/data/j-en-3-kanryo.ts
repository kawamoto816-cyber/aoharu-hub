import type { Lecture } from "../types";

export const J_EN_3_KANRYO: Lecture = {
  unit: "j-en-3-kanryo",
  title: "現在完了は have ＋ 過去分詞。過去から「今」までのつながりを表す",
  hook: "「もう宿題を終えた（だから今は自由だ）」「3年間ずっとここに住んでいる」「京都に2回行ったことがある」。どれも過去のできごとを、今の自分とつなげて話しています。日本語にはない考え方なので、過去形とのちがいをつかむことが現在完了の一番のポイントです。",
  sections: [
    {
      heading: "形は have / has ＋ 過去分詞",
      body: "現在完了は{{have ＋ 過去分詞}}の形で、主語が3人称単数なら{{has}}を使います。過去分詞は、規則動詞なら過去形と同じ -ed の形（played）、不規則動詞は1つずつ覚えます（go - went - {{gone}}、see - saw - {{seen}}）。否定文は have のあとに not、疑問文は have を主語の前に出します。",
      figure: {
        type: "formula",
        title: "I have finished my homework. を書きかえる",
        prose: true,
        steps: [
          { expr: "I {{have finished}} my homework.", note: "肯定文：have＋過去分詞" },
          { expr: "I {{have not finished}} my homework {{yet}}.", note: "否定文：have のあとに not（haven't）" },
          { expr: "{{Have}} you finished your homework {{yet}}?", note: "疑問文：Have を主語の前へ" },
          { expr: "— Yes, I {{have}}. / No, I {{haven't}}.", note: "答えも have で" },
        ],
        note: "do / does / did は使わない。have が be動詞や助動詞のようにはたらく。",
      },
    },
    {
      heading: "3つの意味：完了・経験・継続",
      body: "現在完了には3つの意味があります。{{完了}}は「（ちょうど・もう）〜したところだ」、{{経験}}は「〜したことがある」、{{継続}}は「（ずっと）〜している」です。どの意味かは、いっしょに使われる{{ことば}}が大きな手がかりになります。",
      figure: {
        type: "compare",
        title: "現在完了の3つの意味と目じるし",
        columns: [{ title: "意味" }, { title: "目じるし", tone: "yellow" }],
        rows: [
          { label: "完了", cells: ["（ちょうど・もう）〜したところだ", "just / already / yet"] },
          { label: "経験", cells: ["〜したことがある", "ever / never / once / 〜 times"] },
          { label: "継続", cells: ["ずっと〜している", "for 〜 / since 〜 / how long"] },
        ],
        note: "how long（どのくらいの間）は継続、how many times（何回）は経験をたずねる。",
      },
    },
    {
      heading: "過去形は「過去だけ」、現在完了は「過去から今まで」",
      body: "過去形は、過去のある時点のできごとだけを表し、今どうなのかは言いません。現在完了は、過去のできごとが{{今とつながっている}}ことを表します。だから現在完了は、yesterday・last week・〜 ago・when など{{はっきり過去を示すことば}}といっしょには使いません。",
      figure: {
        type: "compare",
        title: "過去形と現在完了のちがい",
        columns: [{ title: "過去形", tone: "plain" }, { title: "現在完了", tone: "yellow" }],
        rows: [
          { label: "表すこと", cells: ["過去の1点だけ", "過去から今までのつながり"] },
          { label: "例", cells: ["I lost my key.", "I have lost my key."] },
          { label: "今は？", cells: ["わからない", "今もない（困っている）"] },
          { label: "使える語", cells: ["yesterday / ago", "just / ever / for / since"] },
        ],
      },
    },
    {
      heading: "for と since、been と gone",
      body: "継続の「〜の間」は{{for ＋ 期間}}（for two years）、「〜以来」は{{since ＋ 起点}}（since 2020、since last year）です。また、have {{been}} to 〜 は「〜へ行ったことがある（経験）」、have {{gone}} to 〜 は「〜へ行ってしまった（今はここにいない）」という意味で、区別して使います。",
    },
  ],
  mistakes: [
    { wrong: "I have visited Kyoto last year.", right: "I visited Kyoto last year.", why: "last year のようにはっきり過去を示すことばがあるときは、現在完了ではなく過去形を使います。" },
    { wrong: "She have lived here since 2020.", right: "She has lived here since 2020.", why: "主語が3人称単数なので has を使います。" },
    { wrong: "I have lived here since three years.", right: "I have lived here for three years.", why: "three years は期間なので for。since のあとには始まった時点を置きます。" },
    { wrong: "Did you have finished it?", right: "Have you finished it?", why: "現在完了の疑問文は have を主語の前に出します。do / did は使いません。" },
  ],
  check: [
    { q: "I have ___ to Hokkaido twice.（2回行ったことがある）の ___ に入る語は？", a: "been", why: "経験の「行ったことがある」は have been to 〜。" },
    { q: "He came to Japan five years ago. He still lives here. を現在完了の1文に。", a: "He has lived in Japan for five years.", why: "5年前から今までの継続。期間なので for five years。" },
    { q: "Have you ever seen a koala? に No で答えましょう。", a: "No, I haven't. (No, I have never seen one.)", why: "Have でたずねられたら have で答える。" },
  ],
  next: [
    { label: "4択ドリル「現在完了」に挑戦", href: "/learn/eibunpo-chu/j-en-3-kanryo" },
    { label: "つぎに「現在完了進行形」", href: "/learn/eibunpo-chu/j-en-3-kanryo-shinko" },
    { label: "復習「過去形」のレクチャー", href: "/learn/lecture/j-en-1-kakokei" },
  ],
};
