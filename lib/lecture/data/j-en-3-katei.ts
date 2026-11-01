import type { Lecture } from "../types";

export const J_EN_3_KATEI: Lecture = {
  unit: "j-en-3-katei",
  title: "仮定法は「現実とちがう今」を、時制を1つ過去にずらして表す",
  hook: "「もし鳥だったら、空を飛べるのに」「もっと時間があればいいのに」。こうした{{現実とはちがう想像}}や願いを伝えるのが仮定法です。今の話なのに過去形を使うのがふしぎなところですが、そのわけがわかると、形はすっきり覚えられます。",
  sections: [
    {
      heading: "ふつうの if と仮定法のちがい",
      body: "If it is sunny tomorrow, I will go out. は、晴れる{{可能性がある}}ことを言うふつうの条件の文です。一方、If I were a bird, I could fly. は、自分が鳥になることは{{ありえない}}とわかったうえでの想像です。このように現実とちがうことを言うとき、動詞を{{過去形}}にします。",
      figure: {
        type: "compare",
        title: "条件の if と仮定法の if",
        columns: [{ title: "ふつうの条件", tone: "blue" }, { title: "仮定法", tone: "yellow" }],
        rows: [
          { label: "起こる？", cells: ["起こるかもしれない", "現実とちがう・ありえない"] },
          { label: "if の中", cells: ["現在形 is / have", "過去形 were / had"] },
          { label: "後半", cells: ["will＋原形", "would / could＋原形"] },
        ],
      },
    },
    {
      heading: "形は「If＋過去形, would / could＋原形」",
      body: "仮定法では、if のあとの動詞を{{過去形}}に、後半を {{would（〜だろう）}}・{{could（〜できるのに）}}＋動詞の原形にします。過去形でも、意味は{{今の}}ことです。過去形にすることで「現実から一歩はなれた話」だと伝えています。",
      figure: {
        type: "formula",
        title: "現実の文を仮定法にする",
        prose: true,
        steps: [
          { label: "現実", expr: "I {{don't have}} a car, so I {{can't}} drive there.", note: "車がないので行けない" },
          { label: "仮定法", expr: "If I {{had}} a car, I {{could}} drive there.", note: "肯定・否定が逆になり、過去形に" },
        ],
        note: "意味：もし車を持っていたら、そこへ運転して行けるのに。",
      },
    },
    {
      heading: "be動詞は主語に関係なく were",
      body: "仮定法の if の中の be動詞は、主語が I や he でも {{were}} を使うのが基本です。If I {{were}} you, I would ask him.（もし私があなたなら、彼に聞くだろう）は、アドバイスするときの決まった言い方です。会話では was が使われることもありますが、テストでは were と覚えましょう。",
    },
    {
      heading: "I wish で「〜ならいいのに」",
      body: "{{I wish＋主語＋過去形}}で、「〜ならいいのに」という現実とちがう願いを表します。I wish I {{had}} a dog. は「犬を飼っていればいいのに（実際は飼っていない）」です。「〜できればいいのに」は I wish I {{could}} 〜. とします。",
      figure: {
        type: "tree",
        title: "仮定法の2つの型",
        root: {
          label: "仮定法（今の話）",
          children: [
            { label: "もし〜なら…のに", sub: "If＋過去形, would＋原形", tone: "blue", children: [{ label: "If I were rich, I would …" }] },
            { label: "〜ならいいのに", sub: "I wish＋主語＋過去形", tone: "yellow", children: [{ label: "I wish I could swim." }] },
          ],
        },
      },
    },
  ],
  mistakes: [
    { wrong: "If I am a bird, I could fly.", right: "If I were a bird, I could fly.", why: "現実とちがう想像なので、if の中も過去形。be動詞は were にします。" },
    { wrong: "If I had time, I will help you.", right: "If I had time, I would help you.", why: "仮定法の後半は will ではなく would（できるなら could）を使います。" },
    { wrong: "I wish I can play the guitar.", right: "I wish I could play the guitar.", why: "I wish のあとも過去形。can は could にします。" },
  ],
  check: [
    { q: "If I ( ) you, I would study harder. の ( ) に be動詞を。", a: "were", why: "仮定法では主語が I でも were が基本。" },
    { q: "I don't have a bike. を I wish で「持っていればいいのに」に。", a: "I wish I had a bike.", why: "I wish＋主語＋過去形（had）。" },
    { q: "If I had a lot of money, … の文が表す「時」は過去？今？", a: "今", why: "形は過去形でも、今の現実とちがう想像を表している。" },
  ],
  next: [
    { label: "4択ドリル「仮定法」に挑戦", href: "/learn/eibunpo-chu/j-en-3-katei" },
    { label: "ふりかえり「接続詞（if・when）」", href: "/learn/lecture/j-en-2-setsuzokushi" },
    { label: "高校で深める「仮定法」", href: "/learn/lecture/h-eng-gram-kateiho" },
  ],
};
