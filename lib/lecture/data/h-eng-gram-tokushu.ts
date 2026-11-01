import type { Lecture } from "../types";

export const H_ENG_GRAM_TOKUSHU: Lecture = {
  unit: "h-eng-gram-tokushu",
  title: "否定・倒置・強調・省略は「ふつうの形からのずれ」に意味がある",
  hook: "Never have I seen such a beautiful sunset. は、ふつうの I have never seen … の語順をわざと変えて「一度も」を強めています。入試の長文や並べかえ問題では、こうした「型からのずれ」を元の形にもどして読めるかが問われます。ずれ方には決まった型があるので、型ごとに整理しましょう。",
  sections: [
    {
      heading: "部分否定と全体否定",
      body: "not が all・every・always・both などと組むと、「すべてが〜とは限らない」という{{部分否定}}になります。「1つも〜ない」という{{全体否定}}は、no・none・never・neither などで表します。Not all students like math. は「数学が好きでない生徒もいる」という意味で、No student likes math. とはちがいます。",
      figure: {
        type: "compare",
        title: "部分否定と全体否定",
        columns: [{ title: "部分否定", tone: "yellow" }, { title: "全体否定", tone: "red" }],
        rows: [
          { label: "全部", cells: ["not all（全部とは限らない）", "none（1つも〜ない）"] },
          { label: "いつも", cells: ["not always（必ずしも〜ない）", "never（決して〜ない）"] },
          { label: "2つ", cells: ["not both（両方とは限らない）", "neither（どちらも〜ない）"] },
        ],
        note: "hardly・scarcely（ほとんど〜ない）、seldom・rarely（めったに〜ない）は準否定語。not はつけない。",
      },
    },
    {
      heading: "否定語が文頭に出ると、疑問文の語順になる",
      body: "never・little・hardly・rarely など{{否定の語句}}を強調して文頭に出すと、後ろは{{疑問文と同じ語順}}になります（{{倒置}}）。be動詞・助動詞・have は主語の前に出し、一般動詞なら do・does・did を主語の前に出して、動詞は原形にします。「〜もそうだ」の So do I. / Neither do I. や、仮定法で if を省いた Had I known, … も同じ倒置の型です。",
      figure: {
        type: "formula",
        title: "否定語を文頭に出す",
        prose: true,
        steps: [
          { expr: "I have {{never}} seen such a view.", note: "ふつうの語順" },
          { expr: "{{Never have I}} seen such a view.", note: "have を主語の前へ" },
          { expr: "She {{rarely}} goes out at night.", note: "一般動詞の文" },
          { expr: "{{Rarely does she}} {{go}} out at night.", note: "does を主語の前へ、動詞は原形" },
        ],
      },
    },
    {
      heading: "It is 〜 that … の強調構文",
      body: "文の中の1つの要素を {{It is 〜 that …}} の「〜」にはさむと、「…なのは〜だ」と{{強調}}できます。強調できるのは主語・目的語・副詞（句・節）などで、動詞は入れられません。強調するのが人なら that のかわりに who も使えます。動詞を強めたいときは、{{do / does / did ＋原形}}を使います（I did call you.）。",
      figure: {
        type: "formula",
        title: "1つの文から3通りの強調",
        prose: true,
        steps: [
          { expr: "Mika found the key in the garden.", note: "もとの文" },
          { expr: "It was {{Mika}} that (who) found the key in the garden.", note: "主語を強調" },
          { expr: "It was {{the key}} that Mika found in the garden.", note: "目的語を強調" },
          { expr: "It was {{in the garden}} that Mika found the key.", note: "副詞句を強調" },
        ],
        note: "It was と that を取りのぞいて、元の文にもどれば強調構文。形式主語の it と見分けるときに使える。",
      },
    },
    {
      heading: "省略：言わなくてもわかる語は省く",
      body: "英語では、くり返しになる語や{{言わなくてもわかる語}}がよく省略されます。when・while・though などの副詞節では、主の文と主語が同じなら{{主語＋be動詞}}をまとめて省けます（When young, he lived in Kyoto.）。また、I'd like to.（＝ I'd like to go.）のように、動詞を省いて to だけを残す{{代不定詞}}もあります。",
      figure: {
        type: "tree",
        title: "よく出る省略",
        root: {
          label: "省略",
          tone: "navy",
          children: [
            { label: "主語＋be動詞", sub: "When (I was) …", tone: "yellow" },
            { label: "くり返しの語句", sub: "Ken can (ski).", tone: "blue" },
            { label: "代不定詞", sub: "I'd like to.", tone: "red" },
          ],
        },
      },
    },
  ],
  mistakes: [
    { wrong: "Never I have seen such a view.", right: "Never have I seen such a view.", why: "否定語が文頭に出たら、疑問文と同じ語順（have ＋主語）にします。" },
    { wrong: "Rarely he goes out at night.", right: "Rarely does he go out at night.", why: "一般動詞の文の倒置は does を主語の前に出し、動詞は原形にもどします。" },
    { wrong: "「生徒は1人も来なかった」を All the students didn't come. と書く。", right: "None of the students came.", why: "all と not の組み合わせは部分否定（全員が来たわけではない）と読まれます。全体否定は none です。" },
    { wrong: "It was in this town which I was born.", right: "It was in this town that I was born.", why: "強調構文の「つなぎ」は that（強調するのが人なら who も可）。in this town は副詞句なので、関係代名詞の which は使えません。" },
  ],
  check: [
    { q: "I like tennis. — ___ ___ my brother.（兄もそうだ）", a: "So does", why: "「〜もそうだ」は So ＋助動詞（does）＋主語の倒置。" },
    { q: "Hardly ___ I sleep last night.", a: "did", why: "否定語 hardly が文頭、一般動詞の過去の文なので did を主語の前に。" },
    { q: "Not every student has a phone. は部分否定・全体否定のどちら？", a: "部分否定", why: "not ＋ every で「全員が持っているとは限らない」。" },
  ],
  next: [
    { label: "4択ドリル「否定・倒置・強調・省略」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-tokushu" },
    { label: "ひとつ前「話法」", href: "/learn/eibunpo-ko/h-eng-gram-waho" },
    { label: "関連「仮定法」（if を省いた倒置）", href: "/learn/eibunpo-ko/h-eng-gram-kateiho" },
  ],
};
