import type { Lecture } from "../types";

export const E_JAPANESE_2_KATAKANA: Lecture = {
  unit: "e-japanese-2-katakana",
  nameRuby: "かたかなで書く言葉《ことば》",
  title: "かたかなで 書く 言葉《ことば》は 4つの なかま",
  hook: "きゅう食の「パン」や「スープ」は、 かたかなで 書きますね。 かたかなで 書く 言葉《ことば》には、 きまりが あります。 きまりを 知ると、 書き分けに まよわなく なります。",
  sections: [
    {
      heading: "4つの なかま",
      body: "かたかなで 書く 言葉《ことば》は、 二つに 分けられます。 {{外国の 言葉《ことば》}}と、 {{音や 声}}です。 それぞれ、 さらに 二つに 分かれます。",
      figure: {
        type: "tree",
        title: "かたかなで 書く 言葉《ことば》",
        root: {
          label: "かたかな",
          tone: "navy",
          children: [
            {
              label: "外国の 言葉《ことば》",
              tone: "blue",
              children: [
                { label: "外国から 来た", sub: "パン・ノート" },
                { label: "国や 人の 名前", sub: "アメリカ・ジョン" },
              ],
            },
            {
              label: "音や 声",
              tone: "yellow",
              children: [
                { label: "鳴き声", sub: "ワンワン・モー" },
                { label: "ものの 音", sub: "ガチャン・ドン" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "外国から 来た 言葉《ことば》",
      body: "ずっと 前に 外国から 来た 言葉《ことば》は、 {{かたかな}}で 書きます。 もとから 日本に ある 言葉《ことば》は、 ひらがなや 漢字《かんじ》で 書きます。 くらべて みましょう。",
      figure: {
        type: "compare",
        title: "にた ものを くらべる",
        columns: [{ title: "ひらがな・漢字《かんじ》" }, { title: "かたかな", tone: "yellow" }],
        rows: [
          { cells: ["おにぎり", "パン"] },
          { cells: ["つくえ", "テーブル"] },
          { cells: ["お茶", "ジュース"] },
        ],
        note: "「パン」は、 ポルトガル語から 来た 言葉《ことば》です。",
      },
    },
    {
      heading: "音と 声は かたかな",
      body: "{{鳴き声}}や ものの {{音}}は、 かたかなで 書く ことが あります。 {{ようす}}の 言葉《ことば》は、 ふつう ひらがなです。 「きらきら」「にこにこ」などです。",
      figure: {
        type: "compare",
        title: "音・声と、 ようす",
        columns: [{ title: "音・声", tone: "yellow" }, { title: "ようす", tone: "blue" }],
        rows: [
          { cells: ["ワンワン", "にこにこ"] },
          { cells: ["ガチャン", "きらきら"] },
          { cells: ["トントン", "ふわふわ"] },
        ],
        note: "「ねこが ニャーと 鳴く」「花が きらきら 光る」",
      },
    },
    {
      heading: "のばす 音と 小さい 字",
      body: "かたかなで のばす 音は、 {{「ー」}}で 書きます。 小さい「ッ」「ャ」「ュ」「ョ」にも 気を つけます。 たて書きでは、 「ー」も たてに 書きます。",
      figure: {
        type: "formula",
        title: "書き方の きまり",
        prose: true,
        steps: [
          { label: "のばす", expr: "コ{{ー}}ヒ{{ー}}", note: "「ー」で のばす" },
          { label: "小さい ッ", expr: "コ{{ッ}}プ", note: "つまる 音" },
          { label: "小さい ャ", expr: "{{シャ}}ツ", note: "二字で 一つの 音" },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "「コーヒー」を「コオヒイ」と 書く",
      right: "「コーヒー」",
      why: "かたかなで のばす 音は「ー」で 書きます。",
    },
    {
      wrong: "「シ」と「ツ」、 「ン」と「ソ」を 書きまちがえる",
      right: "シ・ンは 下から はらう",
      why: "ツ・ソの さいごの 画は、 上から 下に 書きます。",
    },
    {
      wrong: "「きらきら」を かたかなで 書く",
      right: "ようすの 言葉《ことば》は ふつう ひらがな",
      why: "かたかなに するのは、 音や 鳴き声です。",
    },
  ],
  check: [
    {
      q: "「ジュース」は 4つの なかまの どれ？",
      a: "外国から 来た 言葉《ことば》",
      why: "外国から 来た 言葉《ことば》なので、 かたかなです。",
    },
    {
      q: "犬の 鳴き声を かたかなで 書くと？",
      a: "ワンワン",
      why: "鳴き声は、 かたかなで 書きます。",
    },
    {
      q: "「ちょこれえと」を かたかなに 直すと？",
      a: "チョコレート",
      why: "「ちょ」は「チョ」、 のばす 音は「ー」です。",
    },
  ],
  next: [
    { label: "「かたかなで書く言葉《ことば》」ドリル", href: "/learn/kokugo-sho/e-japanese-2-katakana" },
    { label: "1年「かたかな」", href: "/learn/kokugo-sho/e-japanese-1-katakana" },
    { label: "2年「なかまの言葉《ことば》」", href: "/learn/kokugo-sho/e-japanese-2-nakama" },
  ],
};
