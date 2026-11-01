import type { Lecture } from "../types";

export const E_MATH_1_KATACHI: Lecture = {
  unit: "e-math-1-katachi",
  title: "かたちの なかまわけ：はこ・つつ・ボール",
  hook: "はこ、かん、ボール。いえの 中には いろいろな かたちが あります。かたちの とくちょうが わかると、つむ ときや ころがす ときに やくに たちます。",
  sections: [
    {
      heading: "3つの なかま",
      body: "かたちは 3つの なかまに わけられます。{{はこの かたち}}、{{つつの かたち}}、{{ボールの かたち}} です。いろや 大きさが ちがっても、おなじ なかまです。",
      figure: {
        type: "tree",
        title: "かたちの なかまわけ",
        root: {
          label: "かたち",
          tone: "navy",
          children: [
            { label: "はこ", sub: "おかしの はこ", tone: "blue" },
            { label: "つつ", sub: "ジュースの かん", tone: "yellow" },
            { label: "ボール", sub: "てまり・ビーだま", tone: "red" },
          ],
        },
      },
    },
    {
      heading: "ころがる？ つめる？",
      body: "はこは {{たいらな ところ}}が あるので、つめます。ボールは どこも まるいので、{{よく ころがります}}。つつは よこに すると ころがり、たてに すると つめます。",
      figure: {
        type: "compare",
        title: "かたちの とくちょう",
        columns: [{ title: "ころがる？", tone: "yellow" }, { title: "つめる？", tone: "blue" }],
        rows: [
          { label: "はこ", cells: ["ころがらない", "よく つめる"] },
          { label: "つつ", cells: ["よこに すると ころがる", "たてなら つめる"] },
          { label: "ボール", cells: ["どこへでも ころがる", "つめない"] },
        ],
      },
    },
    {
      heading: "なぞると 出る かたち",
      body: "かたちの たいらな ところを かみに あてて、なぞります。はこから は {{しかく}}、つつから は {{まる}} が できます。ボールには たいらな ところが ありません。",
      figure: {
        type: "flow",
        dir: "row",
        title: "かたちを なぞって うつす",
        steps: [
          { label: "かみに あてる", sub: "たいらな ところを" },
          { label: "なぞる", sub: "ふちを えんぴつで" },
          { label: "しかく・まる", sub: "はこ→しかく つつ→まる", tone: "yellow" },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "大きい はこと 小さい はこは べつの なかま",
      right: "どちらも はこの かたち",
      why: "大きさや いろでは なく、かたちで なかまわけ します。",
    },
    {
      wrong: "つつは ぜったいに つめない",
      right: "たてに すれば つめる",
      why: "つつの 上と 下は たいらだからです。",
    },
  ],
  check: [
    { q: "ジュースの かんは どの なかま？", a: "つつの かたち", why: "まるい ところと たいらな ところが あります。" },
    { q: "いちばん よく ころがるのは？", a: "ボールの かたち", why: "どこも まるいからです。" },
    { q: "はこを なぞると どんな かたち？", a: "しかく", why: "はこの たいらな ところは しかくです。" },
  ],
  next: [
    { label: "かたちあそび（カード）", href: "/learn/sansu-zukei/e-math-1-katachi" },
    { label: "はこの かたち（2年）", href: "/learn/sansu-zukei/e-math-2-hako" },
    { label: "さんかくと しかく（2年）", href: "/learn/sansu-zukei/e-math-2-sankaku-shikaku" },
  ],
};
