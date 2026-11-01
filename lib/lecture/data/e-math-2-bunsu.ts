import type { Lecture } from "../types";

export const E_MATH_2_BUNSU: Lecture = {
  unit: "e-math-2-bunsu",
  title: "分数は「同じ大きさに分けた1つ分」",
  hook: "ピザを2人で分けるとき、大きさがちがうとこまります。同じ大きさに分けた1つ分を、分数で言えます。半分のことを「2分の1」と言うのです。",
  sections: [
    {
      heading: "2分の1は、半分のこと",
      body: "テープを{{同じ長さ}}に2つにおります。その1つ分を{{2分の1}}といいます。1/2と書きます。もとの長さは、2分の1の2つ分です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "テープを2つにおった1つ分",
        max: 8,
        bars: [
          {
            label: "もとの長さ",
            parts: [
              { value: 4, label: "1つ分" },
              { value: 4, label: "1つ分" },
            ],
          },
          { label: "2分の1", parts: [{ value: 4, label: "1/2", tone: "yellow" }] },
        ],
        note: "2つの1つ分は、ぴったり同じ長さです。",
      },
    },
    {
      heading: "4分の1は、4つに分けた1つ分",
      body: "同じ大きさに4つに分けた1つ分が{{4分の1}}です。1/4と書きます。4つに分けると、1つ分は2分の1より小さくなります。4分の1を2つ合わせると、2分の1と同じです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "2分の1と4分の1をくらべる",
        max: 8,
        bars: [
          {
            label: "もとの長さ",
            parts: [
              { value: 2, label: "1/4" },
              { value: 2, label: "1/4" },
              { value: 2, label: "1/4" },
              { value: 2, label: "1/4" },
            ],
          },
          { label: "2分の1", parts: [{ value: 4, label: "1/2", tone: "blue" }] },
          { label: "4分の1", parts: [{ value: 2, label: "1/4", tone: "yellow" }] },
        ],
        note: "もとの長さは、4分の1の4つ分です。",
      },
    },
    {
      heading: "同じ大きさでないと、分数ではない",
      body: "大きさがちがう分け方は、2分の1と言えません。{{同じ大きさ}}かどうかを見ます。おって、ぴったりかさなればよいです。",
      figure: {
        type: "compare",
        title: "2分の1と言える？ 言えない？",
        columns: [{ title: "同じ大きさ", tone: "blue" }, { title: "ちがう大きさ", tone: "red" }],
        rows: [
          { label: "分けたもの", cells: ["ぴったりかさなる", "かさならない"] },
          { label: "2分の1？", cells: ["言える", "言えない"] },
        ],
      },
    },
    {
      heading: "数の2分の1・4分の1",
      body: "おはじき8こを、同じ数ずつ2つに分けます。1つ分は{{4こ}}です。これが8この2分の1です。4つに分けると1つ分は{{2こ}}で、8この4分の1です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "おはじき8こを分ける",
        max: 8,
        bars: [
          {
            label: "8こ",
            parts: [
              { value: 4, label: "4こ", tone: "yellow" },
              { value: 4, label: "4こ" },
            ],
            total: "2つに分ける",
          },
          {
            label: "8こ",
            parts: [
              { value: 2, label: "2こ", tone: "yellow" },
              { value: 2, label: "2こ" },
              { value: 2, label: "2こ" },
              { value: 2, label: "2こ" },
            ],
            total: "4つに分ける",
          },
        ],
        note: "黄色が1つ分。8この2分の1は4こ、4分の1は2こ。",
      },
    },
  ],
  mistakes: [
    {
      wrong: "大きさがちがっても、2つに分けたら2分の1",
      right: "同じ大きさに2つに分けた1つ分が2分の1",
      why: "分数は、同じ大きさに分けたときだけ言えます。",
    },
    {
      wrong: "4分の1は2分の1より大きい（4の方が大きいから）",
      right: "4分の1は2分の1より小さい",
      why: "たくさんに分けるほど、1つ分は小さくなります。",
    },
    {
      wrong: "8この2分の1は2こ",
      right: "8この2分の1は4こ",
      why: "8こを2つに同じ数ずつ分けると、4こずつです。",
    },
  ],
  check: [
    { q: "テープを同じ長さに4つにおりました。1つ分は何分の1？", a: "4分の1（1/4）", why: "4つに分けた1つ分です。" },
    { q: "12この2分の1は何こ？", a: "6こ", why: "12こを2つに同じ数ずつ分けると6こずつです。" },
    { q: "もとの大きさは、4分の1の何こ分？", a: "4こ分", why: "4分の1を4つ合わせると、もとの大きさです。" },
  ],
  next: [
    { label: "分数（2分の1・4分の1）のドリル", href: "/learn/sansu-zukei/e-math-2-bunsu" },
    { label: "3年の分数（計算の段）", href: "/learn/sansu/31" },
    { label: "かけ算（九九）", href: "/learn/sansu/13" },
  ],
};
