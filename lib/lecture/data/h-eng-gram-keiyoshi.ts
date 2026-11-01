import type { Lecture } from "../types";

export const H_ENG_GRAM_KEIYOSHI: Lecture = {
  unit: "h-eng-gram-keiyoshi",
  title: "形容詞は名詞を、副詞はそれ以外を説明する。置く場所にも決まりがある",
  hook: "a happy girl の happy は girl を、She sang happily. の happily は sang を説明しています。形容詞と副詞は「何を説明するか」がちがい、取りちがえると文法問題でも英作文でも減点されます。数や量の言い方、置く位置もあわせて整理しましょう。",
  sections: [
    {
      heading: "形容詞の2つの使い方",
      body: "形容詞には、名詞の前に置いて直接説明する{{限定用法}}（a sleeping baby）と、be動詞などの後ろで{{補語}}になる{{叙述用法}}（The baby is asleep.）があります。asleep・alive・afraid など a- で始まる語の多くは叙述用法だけ、main・only・elder などは限定用法だけで使います。something や anyone を説明する形容詞は{{後ろ}}に置きます（something cold）。",
      figure: {
        type: "compare",
        title: "限定用法と叙述用法",
        columns: [{ title: "限定用法", tone: "blue" }, { title: "叙述用法", tone: "yellow" }],
        rows: [
          { label: "置く所", cells: ["名詞の前", "be動詞などの後ろ"] },
          { label: "例", cells: ["a sleeping baby", "The baby is asleep."] },
          { label: "こちら専用", cells: ["main, only, elder", "asleep, alive など"] },
        ],
      },
    },
    {
      heading: "数えられるかどうかで「多い・少ない」を選ぶ",
      body: "「たくさん」「少し」は、名詞が{{数えられる}}かどうかで語が変わります。many・a few・few は数えられる名詞の複数形に、much・a little・little は数えられない名詞に使います。a がつくと「{{少しある}}」と肯定的、a がないと「{{ほとんどない}}」と否定的な意味になります。",
      figure: {
        type: "compare",
        title: "数・量を表す形容詞",
        columns: [{ title: "数えられる名詞", tone: "blue" }, { title: "数えられない名詞", tone: "yellow" }],
        rows: [
          { label: "たくさん", cells: ["many books", "much water"] },
          { label: "少しある", cells: ["a few books", "a little water"] },
          { label: "ほとんどない", cells: ["few books", "little water"] },
        ],
        note: "a lot of / lots of はどちらの名詞にも使える。",
      },
    },
    {
      heading: "副詞は名詞以外を説明する",
      body: "副詞は{{動詞}}・{{形容詞}}・{{ほかの副詞}}、さらに{{文全体}}を説明します。形容詞に -ly をつけた形が多いですが（careful → carefully）、friendly や lovely は -ly で終わっても形容詞です。名詞を説明できるのは形容詞だけなので、「注意深い運転手」は a careful driver、「注意深く運転する」は drive carefully です。",
      figure: {
        type: "tree",
        title: "副詞が説明するもの",
        root: {
          label: "副詞",
          tone: "navy",
          children: [
            { label: "動詞", sub: "run fast", tone: "yellow" },
            { label: "形容詞", sub: "very tall", tone: "blue" },
            { label: "ほかの副詞", sub: "too quickly", tone: "blue" },
            { label: "文全体", sub: "Luckily, …", tone: "red" },
          ],
        },
        note: "名詞を説明するのは形容詞の仕事。副詞は名詞を説明しない。",
      },
    },
    {
      heading: "頻度の副詞は「どのくらいよく」と置き場所",
      body: "always・usually・often・sometimes・rarely などの{{頻度の副詞}}は、ふつう{{一般動詞の前}}、{{be動詞・助動詞の後ろ}}に置きます（I often walk to school. / She is always busy.）。頻度の高さは、おおよそ下の順です。rarely・seldom・never は否定の意味をふくむので、not といっしょには使いません。",
      figure: {
        type: "area",
        kind: "bar",
        title: "頻度の副詞（高い順・目安）",
        max: 100,
        bars: [
          { label: "always", parts: [{ value: 100, tone: "navy" }], total: "いつも" },
          { label: "usually", parts: [{ value: 80, tone: "blue" }], total: "たいてい" },
          { label: "often", parts: [{ value: 60, tone: "blue" }], total: "よく" },
          { label: "sometimes", parts: [{ value: 40, tone: "yellow" }], total: "ときどき" },
          { label: "rarely", parts: [{ value: 10, tone: "red" }], total: "めったに〜ない" },
        ],
        note: "帯の長さはおおよその目安。never は「一度も〜ない」で0にあたる。",
      },
    },
    {
      heading: "-ly がつくと意味が変わる副詞",
      body: "hard（熱心に）と hardly（{{ほとんど〜ない}}）のように、-ly がつくと意味が大きく変わる副詞があります。late（遅く）と lately（{{最近}}）、near（近くに）と nearly（{{ほとんど・もう少しで}}）も同じです。He works hard. と He hardly works. は正反対の意味になります。",
    },
  ],
  mistakes: [
    { wrong: "She speaks English very good.", right: "She speaks English very well.", why: "動詞 speaks を説明するのは副詞。good は形容詞なので well にします。" },
    { wrong: "I have a little friends in Osaka.", right: "I have a few friends in Osaka.", why: "friends は数えられる名詞の複数形なので a few を使います。" },
    { wrong: "I want cold something to drink.", right: "I want something cold to drink.", why: "-thing の語を説明する形容詞は後ろに置きます。" },
    { wrong: "I studied hardly for the test.", right: "I studied hard for the test.", why: "hardly は「ほとんど〜ない」。「熱心に」は hard です。" },
  ],
  check: [
    { q: "There is ___ milk in the bottle. Let's buy some.（ほとんどない）", a: "little", why: "milk は数えられない名詞で、「ほとんどない」なので a のない little。" },
    { q: "He is late for school. に always を入れると？", a: "He is always late for school.", why: "頻度の副詞は be動詞の後ろに置く。" },
    { q: "「眠っている赤ちゃん」a(n) ___ baby に入るのは sleeping / asleep のどちら？", a: "sleeping", why: "asleep は叙述用法だけで、名詞の前に置けない。" },
  ],
  next: [
    { label: "4択ドリル「形容詞・副詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-keiyoshi" },
    { label: "つぎの単元「前置詞」", href: "/learn/eibunpo-ko/h-eng-gram-zenchishi" },
    { label: "関連「比較」（形容詞・副詞の比較級）", href: "/learn/eibunpo-ko/h-eng-gram-hikaku" },
  ],
};
