import type { Lecture } from "../types";

const C = "/media/commons/e-math-2-m";

export const E_MATH_2_M: Lecture = {
  unit: "e-math-2-m",
  title: "長い長さは「1m＝100cm」で考える",
  hook: "こくばんのよこの長さを、30cmのものさしではかると、何回もずらします。長いものは、mというたんいではかるとべんりです。cmとのかんけいがわかれば、計算もできます。",
  mystery: "ろうかの長さを、ユウトさんは「3m50cm」、ミオさんは「350cm」と書きました。書いた数字はちがうのに、先生は「どちらも正しい」と言いました。どうしてでしょう？",
  mission: {
    from: "児童館《じどうかん》の先生",
    request: "児童館《じどうかん》で、こうさくに使《つか》う大きなたなをつくります。メモを見ると、ある人は「1m20cm」、ある人は「120cm」と書いていて、どちらの長さで木を切ればよいのか、こまっています。名探偵《めいたんてい》のあなたに、2つが同じ長さなのかどうか、たしかめてほしいのです。",
    thanks: "1mは100cmだから、1m20cmと120cmは同じ長さなのですね。これで安心《あんしん》して木を切れます。たなができたら、あそびに来てください！",
  },
  sections: [
    {
      heading: "1m は 100cm",
      body: "100cmを{{1m}}と書きます。「1メートル」と読みます。{{1m＝100cm}}です。30cmのものさしなら、3回と少しで1mです。",
      reading: [
        "こくばんのよこの長さを、30cmのものさしではかってみましょう。ものさしをおいて、はしにしるしをつけて、ずらして、またおいて……。8回、9回とつづけるうちに、「いま何回目だっけ？」とわからなくなります。長いものには、もっと長いものさしがほしくなりますね。",
        "そこでつかうのが、{{1m}}のものさしです。mは「メートル」と読みます。1mは、1cmが100こならんだ長さです。だから{{1m＝100cm}}です。30cmのものさしを3回ならべても90cm。あと10cmで、やっと1mです。",
        "1mは、どのくらいの長さでしょう。2年生のせの高さより、少しひくいくらいです。ゆかから、むねのあたりまで。教室《きょうしつ》のつくえを2つならべた長さより、少し長いくらいです。",
        "1mの長さは、230年ほど前に、フランスという国の人たちが、地球《ちきゅう》の大きさをもとにきめました。そのあと、1mのしるしをつけたとくべつな金ぞくのぼう「{{メートル原器《げんき》}}」をつくって、いろいろな国にくばりました。日本にも130年ほど前にとどき、いまも大切にのこされています。だから、どこの国でも1mは同じ長さなのです。",
      ],
      figure: {
        type: "area",
        kind: "bar",
        title: "1m と 30cmのものさし",
        max: 100,
        bars: [
          { label: "1mのものさし", parts: [{ value: 100, label: "1m", tone: "blue" }], total: "100cm" },
          {
            label: "30cmのものさし",
            parts: [
              { value: 30, label: "30cm", tone: "yellow" },
              { value: 30, label: "30cm", tone: "plain" },
              { value: 30, label: "30cm", tone: "yellow" },
            ],
            total: "90cm",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 50, label: "50cm" },
          { at: 100, label: "1m" },
        ],
        note: "30cmを3回では90cm。1mにはあと10cm。",
      },
      photos: [
        {
          src: `${C}/vaugirard.webp`, width: 800, height: 600,
          alt: "石のかべに、白い石のいたがはめこまれている。いたには「METRE」という字と、左右のでっぱりのあいだに引かれた細いぼうがある",
          caption: "フランスのパリの町のかべにある「1m」。200年より前に、町の人が自分のものさしの長さをたしかめられるように、つけられました。",
          credit: { author: "Airair", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:M%C3%A8tre_%C3%A9talon_(36,_rue_de_Vaugirard,_Paris).jpg" },
        },
        {
          src: `${C}/prototype-bar.webp`, width: 800, height: 526,
          alt: "赤いだいの上に、切り口がXの形をした金ぞくのぼうが、ななめにおかれている絵",
          caption: "{{メートル原器《げんき》}}の形を、コンピューターでかいた絵。切り口がXの形のぼうで、上についた2本の線のあいだを1mとしていました。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Platinum-Iridium_meter_bar.jpg" },
        },
      ],
      cliff: "1mのものさしで1回と、少しのこり。そんな長さは、どう書けばいいのでしょう？",
    },
    {
      heading: "1m20cm は 120cm",
      body: "両手《りょうて》を広げた長さが「1m20cm」の人がいます。1mは100cmなので、{{1m20cm＝120cm}}です。mとcmをつかうと、長い長さを読みやすくできます。",
      reading: [
        "ユウトさんが、両手《りょうて》を広げた長さをはかりました。1mのものさしで1回。のこりを30cmのものさしではかると、20cmでした。このとき「{{1m20cm}}」と書いて、「1メートル20センチメートル」と読みます。",
        "1mは100cmです。だから1m20cmは、100cmと20cmで{{120cm}}。同じ長さを、「1m20cm」と「120cm」の2とおりであらわせるのです。",
        "はんたいに、cmだけの長さをmとcmになおすときは、{{100cmを1mに}}します。250cmなら、100cmが2つで2m、のこりが50cmで、{{2m50cm}}です。",
        "気をつけたいのは、1m5cmです。「1と5だから15cm」としてはいけません。1mは100cmなので、100cmと5cmで{{105cm}}です。",
      ],
      figure: {
        type: "area",
        kind: "bar",
        title: "1m20cm を cm だけであらわす",
        max: 120,
        bars: [
          {
            label: "両手《りょうて》",
            parts: [
              { value: 100, label: "1m", tone: "blue" },
              { value: 20, label: "20cm", tone: "yellow" },
            ],
            total: "120cm",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 100, label: "100cm" },
        ],
      },
      reveal: "1mは100cmです。だから3m50cmは、100cmが3つで300cm、それに50cmで350cm。ユウトさんはmとcmで、ミオさんはcmだけで、{{同じ長さ}}を書いていたのです。書き方がちがっても、長さはかわりません。",
      cliff: "mm・cm・m。3つのたんいは、どうつかい分ければよいのでしょう？",
    },
    {
      heading: "ものに合うたんいをえらぶ",
      body: "長さのたんいは、mm・cm・mの3つです。小さいものはmmやcmではかります。こくばんやろうかは{{m}}がべんりです。",
      reading: [
        "これで、長さのたんいは{{mm}}・{{cm}}・{{m}}の3つになりました。1cm＝10mm、1m＝100cmです。「1m＝10cm」とまちがえないように、cmとmmのかんけいとくべつしておきましょう。",
        "どのたんいをつかうかは、はかるものの大きさできめます。けしゴムのあつさのような小さいものは{{mm}}。ノートやえんぴつは{{cm}}。こくばん・ろうか・プールのような大きいものは{{m}}がべんりです。",
        "たとえば、学校のプールの長さを「2500cm」と言われても、どのくらいかぴんときません。「25m」と言えば、すぐにつたわります。大きいものには大きいたんい、小さいものには小さいたんい。そうすると、数が読みやすくなるのです。",
      ],
      figure: {
        type: "compare",
        title: "何をはかるか と たんい",
        columns: [{ title: "はかるもの", tone: "navy" }, { title: "合うたんい", tone: "yellow" }],
        rows: [
          { cells: ["けしゴムのあつさ", "mm"] },
          { cells: ["ノートのよこ", "cm"] },
          { cells: ["こくばんのよこ", "m"] },
        ],
        note: "1cm＝10mm、1m＝100cm。",
      },
      cliff: "長さのたし算で、cmが100をこえたら、どうすればよいのでしょう？",
    },
    {
      heading: "たし算は、同じたんいどうし",
      body: "長さのたし算も、{{同じたんいどうし}}を計算します。cmが100をこえたら、{{100cmを1mに}}します。",
      reading: [
        "長さも、たし算やひき算ができます。大切なのは、{{同じたんいどうし}}を計算することです。mはmと、cmはcmと計算します。",
        "1m50cmのテープに、70cmのテープをつなぎます。ぜんぶで何m何cmでしょう。まず、cmどうし。50＋70＝120で、120cmです。120cmは、100cmを1mにして、1m20cm。さいごに、mどうしをあわせて、1m＋1m20cm＝{{2m20cm}}。こたえは2m20cmです。",
        "ひき算も同じです。2m80cmのリボンから、50cmを切ります。cmどうしで80−50＝30。mはそのままなので、のこりは{{2m30cm}}です。",
        "こたえが「1m120cm」のように、cmが100より大きいままになっていたら、見なおしましょう。{{100cmを1mに}}するのを、わすれていませんか。",
      ],
      figure: {
        type: "formula",
        title: "1m50cm ＋ 70cm",
        steps: [
          { expr: "cm：50 ＋ 70 ＝ {{120cm}}", note: "cm どうし" },
          { expr: "120cm ＝ {{1m20cm}}", note: "100cm で 1m" },
          { expr: "1m ＋ 1m20cm ＝ {{2m20cm}}", note: "m どうし" },
        ],
      },
    },
  ],
  story: {
    kind: "manga4",
    title: "こくばんは何cm？",
    panels: [
      {
        scene: "きょうしつで、ハルとミオが、30cmのものさしでこくばんのよこをはかりはじめる。",
        lines: [
          { who: "ハル", text: "ぼくがはかるよ！" },
          { who: "ミオ", text: "30cmのものさしでね" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハル", look: "boy", x: 252, face: "smile", fx: "!", hand: [212, 220] },
            { who: "ミオ", look: "girl", x: 86, face: "normal" },
          ],
          props: [{ kind: "board", x: 170, y: 236, s: 0.85, text: "30cm" }],
        },
      },
      {
        scene: "なんかいもずらしているうちに、ハルはかぞえたかずがわからなくなる。",
        lines: [
          { who: "ハル", text: "…8、9、あれ？" },
          { who: "ハル", text: "いま、なんかいめ？" },
          { who: "ミオ", text: "また、はじめから…" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハル", look: "boy", x: 252, face: "sweat", fx: "sweat", hand: [212, 220] },
            { who: "ミオ", look: "girl", x: 86, face: "sweat" },
          ],
          props: [{ kind: "board", x: 170, y: 236, s: 0.85, text: "？かいめ" }],
        },
      },
      {
        scene: "せんせいが、ながいものさしをもってくる。",
        lines: [
          { who: "せんせい", text: "1mのものさしがあるよ" },
          { who: "ハル", text: "ながーい！" },
          { who: "ハル", text: "100cmぶんだね" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "せんせい", look: "teacher", x: 252, face: "smile", fx: "idea", hand: [212, 220] },
            { who: "ハル", look: "boy", x: 86, face: "surprise", fx: "!" },
          ],
          props: [{ kind: "board", x: 170, y: 236, s: 0.85, text: "1m＝100cm" }],
        },
      },
      {
        scene: "1mのものさしで3かい。のこりは40cm。あっというまにはかりおわった。",
        lines: [
          { who: "ミオ", text: "1mが3かいと40cm！" },
          { who: "ハル", text: "3m40cmだね！" },
          { who: "ミオ", text: "こんどはまちがえない！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ミオ", look: "girl", x: 252, face: "smile", fx: "!", hand: [212, 220] },
            { who: "ハル", look: "boy", x: 86, face: "smile" },
          ],
          props: [{ kind: "board", x: 170, y: 236, s: 0.85, text: "3m40cm" }],
        },
      },
    ],
    note: "1m＝100cmであることや、長いものは1mのものさしではかるとべんりなことは本当です。ハルとミオと先生の話は作り話です。",
  },
  mistakes: [
    { wrong: "1m＝10cm と思う", right: "1m＝100cm", why: "1cm＝10mm とまぜないようにします。1mは100cmです。" },
    { wrong: "1m5cm を 15cm とする", right: "105cm", why: "1mは100cmです。100cmと5cmで105cmです。" },
    { wrong: "1m50cm＋70cm を 1m120cm のままにする", right: "2m20cm", why: "120cmは1m20cmです。100cmを1mにします。" },
  ],
  check: [
    { q: "2m は何cmですか。", a: "200cm", why: "1m＝100cm なので、100cmが2つ分です。" },
    { q: "130cm は何m何cmですか。", a: "1m30cm", why: "100cmを1mにして、のこりが30cmです。" },
    { q: "1m40cm ＋ 30cm はいくつですか。", a: "1m70cm", why: "cmどうし 40＋30＝70。1mとあわせて1m70cmです。" },
  ],
  next: [
    { label: "「長い長さ（m）」のドリル", href: "/learn/sansu-zukei/e-math-2-m" },
    { label: "ふりかえり「長さ（cm・mm）」", href: "/learn/sansu-zukei/e-math-2-nagasa" },
    { label: "つづき「長さ（km）」（3年）", href: "/learn/sansu-zukei/e-math-3-km" },
  ],
};
