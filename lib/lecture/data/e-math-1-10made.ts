import type { Lecture } from "../types";

export const E_MATH_1_10MADE: Lecture = {
  unit: "e-math-1-10made",
  title: "10までのかず：1つずつふえていく",
  hook: "おはじきは、いくつあるかな。かずをつかうと、おおさがすぐにつたわります。10までのかずは、けいさんのもとです。",
  sections: [
    {
      heading: "1つずつかぞえる",
      body: "ものを1つずつゆびでさして、{{1、2、3}}とかぞえます。さいごにいったかずが、ぜんぶのかずです。おなじものを2かいかぞえないようにします。",
      figure: {
        type: "flow",
        title: "かぞえかた",
        steps: [
          { label: "ゆびでさす", sub: "1つずつ" },
          { label: "かずをいう", sub: "1、2、3…" },
          { label: "さいごのかず", sub: "それがぜんぶ", tone: "yellow" },
        ],
      },
    },
    {
      heading: "かずは1つずつふえる",
      body: "1のつぎは2、2のつぎは3です。つぎのかずは、{{1つふえた}}かずです。10は、9より1つ大きいかずです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "1つずつふえるかいだん",
        max: 5,
        bars: [
          { label: "3", parts: [{ value: 3, label: "3", tone: "blue" }], total: "3こ" },
          { label: "4", parts: [{ value: 3, label: "3", tone: "blue" }, { value: 1, label: "1", tone: "yellow" }], total: "4こ" },
          { label: "5", parts: [{ value: 4, label: "4", tone: "blue" }, { value: 1, label: "1", tone: "yellow" }], total: "5こ" },
        ],
        note: "きいろが、ふえた1こです。",
      },
    },
    {
      heading: "5のまとまりで見る",
      body: "おはじきを{{5のまとまり}}で見ると、はやくわかります。7は、5と2です。10は、5と5です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "5といくつ",
        max: 10,
        bars: [
          { label: "7", parts: [{ value: 5, label: "5", tone: "blue" }, { value: 2, label: "2", tone: "yellow" }], total: "7こ" },
          { label: "9", parts: [{ value: 5, label: "5", tone: "blue" }, { value: 4, label: "4", tone: "yellow" }], total: "9こ" },
          { label: "10", parts: [{ value: 5, label: "5", tone: "blue" }, { value: 5, label: "5", tone: "yellow" }], total: "10こ" },
        ],
      },
    },
    {
      heading: "なにもないときは0",
      body: "1つもないときは、{{0}}といいます。みかんを1こずつたべると、さいごは0こです。0も、かずのなかまです。",
      figure: {
        type: "flow",
        dir: "col",
        title: "1こずつたべていくと",
        steps: [
          { label: "3こ" },
          { label: "2こ" },
          { label: "1こ" },
          { label: "0こ", sub: "なにもない", tone: "yellow" },
        ],
        arrows: ["1こたべる", "1こたべる", "1こたべる"],
      },
    },
  ],
  mistakes: [
    { wrong: "おなじおはじきを2かいかぞえる", right: "かぞえたものは、よけておく", why: "よけておくと、まだのものだけがのこります。" },
    { wrong: "6と9のかたちをまちがえる", right: "6はまるが下、9はまるが上", why: "まるがどこにあるか、よく見てかきます。" },
    { wrong: "なにもないときは、かずがない", right: "なにもないときは0", why: "0も、かずのなかまです。" },
  ],
  check: [
    { q: "7は、5といくつですか。", a: "2", why: "5のまとまりと、あと2こです。" },
    { q: "8のつぎのかずは、なんですか。", a: "9", why: "8より1つふえると9です。" },
    { q: "6と9では、どちらが大きいですか。", a: "9", why: "9のほうが、6より3つおおいです。" },
  ],
  next: [
    { label: "「10までのかず」ドリル", href: "/learn/sansu-zukei/e-math-1-10made" },
    { label: "つぎは「いくつといくつ」", href: "/learn/sansu-zukei/e-math-1-ikutsu" },
    { label: "「20までのかず」", href: "/learn/sansu/3" },
  ],
};
