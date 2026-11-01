import type { Lecture } from "../types";

export const E_JAPANESE_1_KANA_ON: Lecture = {
  unit: "e-japanese-1-kana-on",
  title: "のばす 音・ねじれた 音・つまる 音：そえる 字と 小さい 字",
  hook: "「おかあさん」と「おかさん」は、音が ちがいますね。のばす 音や 小さい 字で、ことばは かわります。正しく 書《か》けると、読《よ》む 人に きちんと つたわります。",
  sections: [
    {
      heading: "のばす 音は 字を そえる",
      body: "ひらがなでは、のばす 音に {{「ー」を 使《つか》いません}}。のばす 音の 字を {{そえて}} 書《か》きます。あの 行《ぎょう》は「あ」、いの 行《ぎょう》は「い」を そえます。",
      figure: {
        type: "compare",
        title: "のばす 音に そえる 字",
        columns: [{ title: "行《ぎょう》", tone: "navy" }, { title: "そえる 字", tone: "yellow" }, { title: "れい", tone: "blue" }],
        rows: [
          { cells: ["あの 行《ぎょう》", "あ", "おかあさん"] },
          { cells: ["いの 行《ぎょう》", "い", "おにいさん"] },
          { cells: ["うの 行《ぎょう》", "う", "くうき"] },
          { cells: ["えの 行《ぎょう》", "い（ときどき え）", "せんせい"] },
          { cells: ["おの 行《ぎょう》", "う（ときどき お）", "おとうさん"] },
        ],
      },
    },
    {
      heading: "えの 行《ぎょう》と おの 行《ぎょう》",
      body: "えの 行《ぎょう》は「い」を そえる ことが {{多《おお》い}}です。せんせい、とけい です。おの 行《ぎょう》は「う」を そえる ことが 多《おお》いです。でも「おねえさん」「おおきい」「こおり」は {{とくべつ}}です。",
      figure: {
        type: "tree",
        title: "おの 行《ぎょう》を のばす とき",
        root: {
          label: "おの 行《ぎょう》",
          children: [
            { label: "「う」を そえる", sub: "ほとんど これ", tone: "blue", children: [{ label: "おとうさん" }, { label: "ぼうし" }] },
            { label: "「お」を そえる", sub: "とくべつ", tone: "yellow", children: [{ label: "おおきい" }, { label: "こおり" }, { label: "とおい" }] },
          ],
        },
        note: "とくべつな ことばは、1つずつ おぼえましょう。",
      },
    },
    {
      heading: "ねじれた 音",
      body: "「きゃ」「しゅ」「ちょ」の ような 音が {{ねじれた 音}}です。「き」の あとに、{{小さい「ゃ」}}を 書《か》きます。2つの 字で、{{1つの 音}}に なります。",
      figure: {
        type: "flow",
        title: "ねじれた 音の できかた",
        steps: [
          { label: "き", sub: "ふつうの 字" },
          { label: "ゃ", sub: "小さく 書《か》く" },
          { label: "きゃ", sub: "1つの 音", tone: "yellow" },
        ],
        arrows: ["たす", "なる"],
      },
    },
    {
      heading: "つまる 音",
      body: "「きって」の「っ」で、音が いったん とまります。これを {{つまる 音}}と いいます。つまる 音は、{{小さい「っ」}}で 書《か》きます。大きく 書《か》くと「きつて」に なって しまいます。",
    },
    {
      heading: "手を たたいて たしかめる",
      body: "ことばを 言《い》いながら、手を たたいて みましょう。{{のばす 音}}も {{つまる 音}}も、1つ たたきます。{{ねじれた 音}}は、2つの 字で 1つです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "手を たたく かず",
        max: 5,
        bars: [
          { label: "おかあさん", parts: [{ value: 1, label: "お" }, { value: 1, label: "か" }, { value: 1, label: "あ", tone: "yellow" }, { value: 1, label: "さ" }, { value: 1, label: "ん" }], total: "5つ" },
          { label: "きって", parts: [{ value: 1, label: "き" }, { value: 1, label: "っ", tone: "yellow" }, { value: 1, label: "て" }], total: "3つ" },
          { label: "きしゃ", parts: [{ value: 1, label: "き" }, { value: 1, label: "しゃ", tone: "yellow" }], total: "2つ" },
        ],
        note: "「しゃ」は 字が 2つでも、たたくのは 1つです。",
      },
    },
  ],
  mistakes: [
    { wrong: "おかーさん", right: "おかあさん", why: "ひらがなでは「ー」を 使《つか》わず、「あ」を そえます。" },
    { wrong: "とけえ", right: "とけい", why: "えの 行《ぎょう》は、「い」を そえる ことが 多《おお》いです。" },
    { wrong: "おうきい", right: "おおきい", why: "「おおきい」は「お」を そえる とくべつな ことばです。" },
    { wrong: "きしや", right: "きしゃ", why: "ねじれた 音の「ゃ」は、小さく 書《か》きます。" },
  ],
  check: [
    { q: "「せんせえ」を 正しく 書《か》くと？", a: "せんせい", why: "えの 行《ぎょう》を のばす ときは、「い」を そえます。" },
    { q: "「がっこう」と 言《い》いながら 手を たたくと、いくつ？", a: "4つ", why: "が・っ・こ・う。つまる 音も のばす 音も 1つです。" },
    { q: "「らっぱ」の 小さい 字は どれ？", a: "っ", why: "音が いったん とまる、つまる 音です。" },
  ],
  next: [
    { label: "「のばす 音・ねじれた 音・つまる 音」ドリル", href: "/learn/kokugo-sho/e-japanese-1-kana-on" },
    { label: "かたかな（図解《ずかい》レクチャー）", href: "/learn/lecture/e-japanese-1-katakana" },
    { label: "「は」「を」「へ」の 使《つか》い方《かた》（図解《ずかい》レクチャー）", href: "/learn/lecture/e-japanese-1-ha-wo-he" },
  ],
};
