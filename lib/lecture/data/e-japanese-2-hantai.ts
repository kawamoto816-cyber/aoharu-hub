import type { Lecture } from "../types";

export const E_JAPANESE_2_HANTAI: Lecture = {
  unit: "e-japanese-2-hantai",
  nameRuby: "反対《はんたい》の意味《いみ》の言葉《ことば》",
  title: "はんたいの ことばは 二つで 一くみ",
  hook: "シーソーは、かたほうが 上がると もう かたほうが 下がります。ことばにも「上」と「下」のような 一くみが あります。はんたいの ことばを つかうと、ちがいが よく つたわります。",
  sections: [
    {
      heading: "はんたいの ことばは 二つで 一くみ",
      body: "「大きい」と「小さい」は、いみが はんたいです。こういう 二つを {{はんたいの いみの ことば}}と いいます。二つを {{セット}}で おぼえましょう。",
      figure: {
        type: "compare",
        title: "はんたいの ことばの 一くみ",
        columns: [{ title: "こっち", tone: "blue" }, { title: "はんたい", tone: "yellow" }],
        rows: [
          { cells: ["大きい", "小さい"] },
          { cells: ["長い", "みじかい"] },
          { cells: ["多い", "少ない"] },
          { cells: ["明るい", "くらい"] },
        ],
        note: "どれも、二つで 一くみ。",
      },
    },
    {
      heading: "ようす・うごき・ばしょの はんたい",
      body: "はんたいの ことばには いろいろ あります。{{ようす}}の ことば、{{うごき}}の ことば、{{ばしょ}}の ことばです。「入る」と「出る」は うごきの はんたいです。",
      figure: {
        type: "tree",
        title: "はんたいの ことばの なかま",
        root: {
          label: "はんたいの ことば",
          tone: "navy",
          children: [
            { label: "ようす", sub: "おもい⇔かるい", tone: "blue" },
            { label: "うごき", sub: "入る⇔出る", tone: "yellow" },
            { label: "ばしょ", sub: "前⇔後ろ", tone: "blue" },
          ],
        },
      },
    },
    {
      heading: "はんたいが 二つ ある ことばも",
      body: "「高い」の はんたいは 一つでは ありません。山なら「ひくい」です。ねだんなら「やすい」です。{{何が 高いのか}}を 見て きめます。",
      figure: {
        type: "tree",
        title: "「高い」の はんたいは 二つ",
        root: {
          label: "高い",
          tone: "navy",
          children: [
            { label: "山が 高い", tone: "blue", children: [{ label: "山が ひくい", tone: "yellow" }] },
            { label: "ねだんが 高い", tone: "blue", children: [{ label: "ねだんが やすい", tone: "yellow" }] },
          ],
        },
        note: "「あつい」も、お茶なら「つめたい」、夏なら「さむい」。",
      },
    },
    {
      heading: "文の 中で かえて みる",
      body: "文の 中の 一つの ことばを、はんたいの ことばに かえて みます。すると、文の いみが {{ぎゃく}}に なります。",
      figure: {
        type: "formula",
        title: "はんたいの ことばに かえる",
        prose: true,
        steps: [
          { label: "もと", expr: "かばんが おもい。" },
          { label: "はんたい", expr: "かばんが {{かるい}}。", note: "ようす" },
          { label: "もと", expr: "まどを あける。" },
          { label: "はんたい", expr: "まどを {{しめる}}。", note: "うごき" },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "「ねだんが 高い」の はんたいを「ひくい」に する",
      right: "ねだんが やすい",
      why: "何が 高いのかで、はんたいが かわります。ねだんは「やすい」です。",
    },
    {
      wrong: "「あつい お茶」の はんたいを「さむい お茶」に する",
      right: "つめたい お茶",
      why: "「さむい」は 天気などに つかいます。のみものは「つめたい」です。",
    },
    {
      wrong: "「入る」の はんたいを「入らない」に する",
      right: "出る",
      why: "「〜ない」は「しない」と いう いみです。はんたいの ことばは べつの ことばです。",
    },
  ],
  check: [
    { q: "「長い」の はんたいの ことばは？", a: "みじかい", why: "「長い」と「みじかい」で 一くみです。" },
    { q: "「ふくを きる」の「きる」の はんたいは？", a: "ぬぐ", why: "ふくを きる ⇔ ふくを ぬぐ です。" },
    { q: "「ねだんが 高い」の「高い」の はんたいは？", a: "やすい", why: "ねだんの ときは「やすい」です。山なら「ひくい」です。" },
  ],
  next: [
    { label: "「はんたいの いみの ことば」を おぼえる", href: "/learn/kokugo-sho/e-japanese-2-hantai" },
    { label: "「なかまの ことば」を おぼえる", href: "/learn/kokugo-sho/e-japanese-2-nakama" },
    { label: "図解《ずかい》レクチャー「主語《しゅご》と 述語《じゅつご》」", href: "/learn/lecture/e-japanese-2-shugo" },
  ],
};
