import type { Lecture } from "../types";

export const E_SCIENCE_3_OMOSA: Lecture = {
  unit: "e-science-3-omosa",
  title: "形をかえても、重さはかわらない",
  hook: "ねん土を丸めても、平たくのばしても、重さはかわるでしょうか。また、同じ大きさの鉄と木では、どちらが重いでしょう。物の重さの決まりを、はかりでたしかめていきます。",
  sections: [
    {
      heading: "形をかえても、重さは同じ",
      body: "ねん土を丸めたり、平たくしたり、いくつかに分けたりしても、ぜんぶ合わせた{{重さはかわりません}}。物を{{つけたしたり、取りのぞいたり}}しなければ、重さは同じです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "100gのねん土の形をかえる",
        bars: [
          { label: "丸めた", parts: [{ value: 100, tone: "blue" }], total: "100g" },
          { label: "平たくした", parts: [{ value: 100, tone: "blue" }], total: "100g" },
          {
            label: "4つに分けた",
            parts: [
              { value: 25, label: "25g", tone: "yellow" },
              { value: 25, label: "25g", tone: "yellow" },
              { value: 25, label: "25g", tone: "yellow" },
              { value: 25, label: "25g", tone: "yellow" },
            ],
            total: "100g",
          },
        ],
        note: "分けた物は、ぜんぶいっしょにはかると、もとと同じ100g。",
      },
    },
    {
      heading: "おき方をかえても、重さは同じ",
      body: "はかりの上で、物を{{立てても、ねかせても}}、重さは同じです。人が体重計に、りょう足で立っても、かた足で立っても、しゃがんでも、重さは{{かわりません}}。",
    },
    {
      heading: "同じ大きさでも、しゅるいで重さがちがう",
      body: "{{同じ大きさ}}でも、物の{{しゅるい}}がちがうと重さはちがいます。たとえば、同じ大きさのつつでくらべると、鉄はとても重く、木は軽くなります。重さをくらべるときは、{{大きさをそろえる}}ことが大事です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "同じ大きさのつつの重さ（およそのれい）",
        bars: [
          { label: "鉄", parts: [{ value: 79, tone: "navy" }], total: "79g" },
          { label: "アルミニウム", parts: [{ value: 27, tone: "blue" }], total: "27g" },
          { label: "木", parts: [{ value: 5, tone: "yellow" }], total: "5g" },
        ],
        note: "つつの大きさによって数はかわる。木の重さは、木のしゅるいでもかわる。",
      },
    },
    {
      heading: "はかりの正しい使い方",
      body: "はかりは{{平らな所}}におき、はりが{{0}}をさしているかを見てから使います。物はしずかにのせ、はりが{{止まってから}}目もりを読みます。電子てんびんは、のせる前に表じを0にしてからはかります。",
      figure: {
        type: "flow",
        dir: "col",
        title: "台ばかりの使い方",
        steps: [
          { label: "平らな所におく", tone: "blue" },
          { label: "はりを0に合わせる", sub: "何ものせないで", tone: "yellow" },
          { label: "しずかにのせる" },
          { label: "止まってから読む", sub: "目もりを正面から", tone: "navy" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "ねん土を細かく分けると、軽くなる", right: "ぜんぶ合わせれば、重さは同じ", why: "取りのぞいた物がなければ、形や数をかえても重さはかわりません。" },
    { wrong: "かた足で立つと、体重がへる", right: "立ち方をかえても、重さはかわらない", why: "体そのものの重さは同じだからです。" },
    { wrong: "大きい物ほど、いつも重い", right: "しゅるいがちがうと、小さくても重いことがある", why: "同じ大きさなら、鉄は木よりずっと重くなります。" },
  ],
  check: [
    { q: "100gのねん土を5つに分けました。ぜんぶ合わせてはかると何gですか。", a: "100g", why: "分けても、ぜんぶ合わせた重さはかわりません。" },
    { q: "同じ大きさの鉄と木では、どちらが重いですか。", a: "鉄", why: "物のしゅるいがちがうと、同じ大きさでも重さがちがいます。" },
    { q: "はかりを使う前に、はりが何をさしているかたしかめますか。", a: "0", why: "0からずれていると、正しい重さが読めません。" },
  ],
  next: [
    { label: "用語カード「物と重さ」で覚える・鍛える", href: "/learn/rika#e-science-3-omosa" },
    { label: "算数3年「重さ」の図解レクチャー", href: "/learn/lecture/e-math-3-omosa" },
    { label: "算数3年「重さ」のドリル", href: "/learn/sansu-zukei/e-math-3-omosa" },
  ],
};
