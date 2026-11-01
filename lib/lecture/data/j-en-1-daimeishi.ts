import type { Lecture } from "../types";

export const J_EN_1_DAIMEISHI: Lecture = {
  unit: "j-en-1-daimeishi",
  title: "代名詞は「文の中の場所」で形が変わる。I・my・me・mine",
  hook: "「ケンはサッカーが好きです。ケンのお兄さんもケンとよくサッカーをします」と、同じ名前をくり返すのは少しくどいですね。英語では2回目から he・his・him などの代名詞にかえます。どの形を使うかは、文の中のどこに置くかで決まります。",
  sections: [
    {
      heading: "名詞のかわりをする語",
      body: "{{代名詞}}は、一度出た名詞のかわりに使う語です。男性1人なら{{he}}、女性1人なら{{she}}、物や動物1つなら{{it}}、2人・2つ以上なら人でも物でも{{they}}になります。自分をふくむときは we です。",
      figure: {
        type: "formula",
        title: "名詞を代名詞にかえる",
        prose: true,
        steps: [
          { expr: "Ken likes Yumi.", note: "名前をそのまま使う" },
          { expr: "{{He}} likes {{her}}.", note: "主語の Ken → He、動詞のあとの Yumi → her" },
          { expr: "{{His}} sister knows {{them}}.", note: "Ken の → His、2人 → them" },
        ],
      },
    },
    {
      heading: "場所で決まる3つの形",
      body: "人称代名詞は、文の中の場所によって形が変わります。主語の位置では{{主格}}（I・he）、名詞の前で「〜の」を表すときは{{所有格}}（my・his）、動詞や前置詞のあとでは{{目的格}}（me・him）です。it と you は主格と目的格が同じ形です。",
      figure: {
        type: "compare",
        title: "人称代名詞の変化（主格・所有格・目的格）",
        columns: [{ title: "主格 〜は", tone: "blue" }, { title: "所有格 〜の", tone: "yellow" }, { title: "目的格 〜を・に", tone: "red" }],
        rows: [
          { cells: ["I", "my", "me"] },
          { cells: ["you", "your", "you"] },
          { cells: ["he", "his", "him"] },
          { cells: ["she", "her", "her"] },
          { cells: ["it", "its", "it"] },
          { cells: ["we", "our", "us"] },
          { cells: ["they", "their", "them"] },
        ],
        note: "her は所有格と目的格が同じ形。his は所有格と所有代名詞が同じ形。",
      },
    },
    {
      heading: "迷ったら、置く場所を見る",
      body: "空らんに入る形は、その空らんが文のどこにあるかで決まります。動詞の前で主語になるなら主格、すぐ後ろに名詞が続くなら所有格、動詞や with・for などの{{前置詞のあと}}なら目的格です。「〜のもの」と名詞なしで使う{{所有代名詞}}（mine・yours・his・hers・ours・theirs）もあります。",
      figure: {
        type: "tree",
        title: "空らんの場所から形を選ぶ",
        root: {
          label: "（ ）に入る代名詞",
          tone: "navy",
          children: [
            { label: "主語の位置", sub: "（ ）plays tennis.", children: [{ label: "主格 he", tone: "blue" }] },
            { label: "名詞の前", sub: "（ ）bag", children: [{ label: "所有格 his", tone: "yellow" }] },
            { label: "動詞・前置詞の後", sub: "with（ ）", children: [{ label: "目的格 him", tone: "red" }] },
            { label: "名詞なしで「〜のもの」", sub: "This is（ ）.", children: [{ label: "所有代名詞 his" }] },
          ],
        },
      },
    },
    {
      heading: "this・that・these・those",
      body: "近くのものは{{this}}、遠くのものは{{that}}で指します。2つ以上なら、this は{{these}}、that は{{those}}になり、be動詞も are にかわります。名前を表す名詞には 's をつけて Ken's（ケンの）のように「〜の」を表せます。",
      figure: {
        type: "compare",
        title: "近い・遠いと数で4つ",
        columns: [{ title: "近く", tone: "blue" }, { title: "遠く", tone: "yellow" }],
        rows: [
          { label: "1つ", cells: ["this（これ）", "that（あれ）"] },
          { label: "2つ以上", cells: ["these（これら）", "those（あれら）"] },
        ],
        note: "These are my books. のように、these・those の文では be動詞は are。",
      },
    },
  ],
  mistakes: [
    { wrong: "I like he.", right: "I like him.", why: "動詞のあとは目的格。主語でない位置に he は置けない。" },
    { wrong: "This is me bag.", right: "This is my bag.", why: "名詞（bag）の前で「〜の」を表すのは所有格の my。" },
    { wrong: "This bag is my.", right: "This bag is mine.", why: "後ろに名詞がないときは所有代名詞 mine を使う。" },
    { wrong: "These is my pens.", right: "These are my pens.", why: "these は2つ以上なので be動詞は are。" },
  ],
  check: [
    { q: "I often play with ___ .（彼ら）", a: "them", why: "前置詞 with のあとは目的格。" },
    { q: "___ name is Emi.（彼女の）", a: "Her", why: "名詞 name の前なので所有格。文の最初なので大文字で書く。" },
    { q: "That is your pen. の that を those にかえて全文を書きましょう。", a: "Those are your pens.", why: "those は複数なので are、pen も pens にする。" },
  ],
  next: [
    { label: "4択ドリル「代名詞」に挑戦", href: "/learn/eibunpo-chu/j-en-1-daimeishi" },
    { label: "前の単元「名詞の複数形と冠詞」のレクチャー", href: "/learn/lecture/j-en-1-meishi" },
    { label: "つぎに「疑問詞」", href: "/learn/eibunpo-chu/j-en-1-gimonshi" },
  ],
};
