import type { Lecture } from "../types";

export const E_ENGLISH_34_ALPHA_KOMOJI: Lecture = {
  unit: "e-english-34-alpha-komoji",
  title: "小文字は「高さ」と「向き」で見分ける",
  hook: "絵本やお店のかんばんの英語《えいご》をよく見ると、大文字より小文字のほうがずっと多く使われています。小文字は大文字と形がちがうものが多く、b と d のようににた文字もあります。見分け方のこつをつかむと、英語《えいご》の言葉が読みやすくなります。",
  sections: [
    {
      heading: "大文字と小文字は、名前が同じペア",
      body: "小文字も{{26文字}}で、A には a、B には b のように、{{同じ名前の大文字と小文字}}がペアになっています。C と c、O と o のように{{大きさだけがちがう}}ものもあれば、A と a、G と g のように{{形が大きくちがう}}ものもあります。",
      figure: {
        type: "tree",
        title: "大文字と小文字のペアを分ける",
        root: {
          label: "26のペア",
          children: [
            { label: "大きさだけちがう", sub: "Cc Oo Ss Vv Ww", tone: "blue", children: [{ label: "ほかにも", sub: "Xx Zz" }] },
            { label: "形が少しちがう", sub: "Kk Pp Uu Yy", tone: "yellow" },
            { label: "形が大きくちがう", sub: "Aa Bb Dd Ee Gg", tone: "red" },
          ],
        },
        note: "形のちがうペアは、ほかに Ff Hh Ll Mm Nn Qq Rr Tt など。",
      },
    },
    {
      heading: "上にのびる・下にのびる・まん中だけ",
      body: "小文字は、4本線の上で{{高さ}}がちがいます。b・d・h のように{{上にのびる文字}}、g・p・y のように{{下にのびる文字}}、a・c・e のように{{まん中の2本の間だけ}}に書く文字があります。高さのちがいも、文字を見分ける手がかりになります。",
      figure: {
        type: "compare",
        title: "小文字の高さで分ける",
        columns: [{ title: "上にのびる", tone: "blue" }, { title: "下にのびる", tone: "red" }, { title: "まん中だけ", tone: "yellow" }],
        rows: [
          { cells: ["b d f h", "g j p", "a c e i m n o"] },
          { cells: ["k l t", "q y", "r s u v w x z"] },
        ],
        note: "i と j は、上に点がつく。",
      },
    },
    {
      heading: "b・d・p・q は、丸の向きで見分ける",
      body: "{{b と d}}、{{p と q}} は、向きがちがうだけでよくにています。b は{{たて線の右に丸}}、d は{{たて線の左に丸}}があります。p と q は、たて線が下にのびる文字で、p は右に丸、q は左に丸です。",
      figure: {
        type: "compare",
        title: "丸の向きとのび方",
        columns: [{ title: "丸が右", tone: "blue" }, { title: "丸が左", tone: "red" }],
        rows: [
          { label: "上にのびる", cells: ["b", "d"] },
          { label: "下にのびる", cells: ["p", "q"] },
        ],
        note: "bed（ベッド）という言葉は、b と d が両はしでベッドの形に見える。",
      },
    },
    {
      heading: "言葉はふつう小文字で書く",
      body: "英語《えいご》の言葉は、{{ふつう小文字}}で書きます。名前や国の名前、文のはじめの文字だけを大文字にします。dog や apple のように、身の回りの言葉を見つけたら、先生の声を聞いてから、文字の名前を1つずつ言ってみましょう。",
      figure: {
        type: "formula",
        title: "大文字と小文字の使い分け",
        prose: true,
        steps: [
          { expr: "dog / apple / cat", note: "言葉はふつう小文字" },
          { expr: "{{K}}en / {{J}}apan", note: "名前・国の名前は、はじめだけ大文字" },
          { expr: "{{I}} like cats.", note: "文のはじめと I は大文字" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "dog を bog と読みまちがえる", right: "たて線の左に丸があるのは d", why: "b は右に丸、d は左に丸です。" },
    { wrong: "小文字の l と大文字の I を同じ文字だと思う", right: "l は L の小文字、I は i の大文字", why: "どちらもたて線1本に見えますが、ちがう文字です。言葉の中でどちらかを考えます。" },
    { wrong: "名前を emma と全部小文字で書く", right: "Emma", why: "名前のはじめの文字は大文字にします。" },
  ],
  check: [
    { q: "大文字 D の小文字は？", a: "d", why: "たて線の左に丸があり、上にのびる文字です。" },
    { q: "g・a・h のうち、下にのびる小文字は？", a: "g", why: "g は下にのび、h は上にのび、a はまん中だけです。" },
    { q: "大文字と小文字で、大きさだけがちがう文字を1つ言うと？", a: "c（C）など", why: "C と c、O と o、S と s などは形が同じで大きさだけがちがいます。" },
  ],
  next: [
    { label: "カードとドリル「アルファベット（小文字）」", href: "/learn/eigo-sho/e-english-34-alpha-komoji" },
    { label: "図解《ずかい》レクチャー「アルファベット（大文字）」", href: "/learn/lecture/e-english-34-alpha-oomoji" },
    { label: "5・6年「アルファベットを書く」", href: "/learn/eigo-sho/e-english-56-alpha-kaku" },
  ],
};
