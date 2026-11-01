import type { Lecture } from "../types";

const dots = (n: number, tone: "blue" | "yellow" | "red") => Array.from({ length: n }, () => ({ value: 1, label: "○", tone }));

export const E_MATH_2_HYO_GRAPH: Lecture = {
  unit: "e-math-2-hyo-graph",
  nameRuby: "表《ひょう》とグラフ",
  title: "表《ひょう》と グラフで「いくつ」を 見やすく する",
  hook: "クラスで すきな あそびを しらべました。表《ひょう》に すると、数が 数字で わかります。グラフに すると、多い・少ないが ひと目で 見えます。",
  sections: [
    {
      heading: "しらべた 数を 表《ひょう》に まとめる",
      body: "しらべた ことは、{{しゅるいごとに 数を 書いた 表《ひょう》}}に します。数が 数字で 正しく わかります。ぜんぶで 何人かも 計算できます。",
      figure: {
        type: "compare",
        title: "すきな あそびの 表《ひょう》",
        columns: [{ title: "あそび", tone: "blue" }, { title: "人数", tone: "yellow" }],
        rows: [
          { cells: ["おにごっこ", "7人"] },
          { cells: ["ドッジボール", "5人"] },
          { cells: ["なわとび", "3人"] },
          { cells: ["かくれんぼ", "4人"] },
          { cells: ["ぜんぶ", "19人"] },
        ],
        note: "7＋5＋3＋4＝19 で、ぜんぶの 人数が 出ます。",
      },
    },
    {
      heading: "グラフは ○を 1人 1こ ならべる",
      body: "グラフでは {{1人を ○1こ}}で あらわします。○は はしを そろえて ならべます。○の 大きさと 間も そろえます。すると、ならびの 長さで 多い・少ないが わかります。",
      figure: {
        type: "area",
        kind: "bar",
        title: "すきな あそびの グラフ（○1こ＝1人）",
        max: 8,
        bars: [
          { label: "おにごっこ", parts: dots(7, "yellow"), total: "7人" },
          { label: "ドッジボール", parts: dots(5, "blue"), total: "5人" },
          { label: "なわとび", parts: dots(3, "blue"), total: "3人" },
          { label: "かくれんぼ", parts: dots(4, "blue"), total: "4人" },
        ],
        note: "いちばん 長い おにごっこが、いちばん 多いです。",
      },
    },
    {
      heading: "表《ひょう》と グラフの よい ところ",
      body: "表《ひょう》と グラフは、同じ ことを ちがう 形で 見せます。{{数を 知りたい ときは 表《ひょう》}}。{{くらべたい ときは グラフ}}が べんりです。",
      figure: {
        type: "compare",
        title: "表《ひょう》と グラフを くらべる",
        columns: [{ title: "表《ひょう》", tone: "blue" }, { title: "グラフ", tone: "yellow" }],
        rows: [
          { label: "見える もの", cells: ["数が 数字で", "○の ならび"] },
          { label: "とくい", cells: ["ぜんぶの 数", "多い・少ない"] },
          { label: "くらべ方", cells: ["数字を 見る", "長さを 見る"] },
        ],
      },
    },
    {
      heading: "グラフで ちがいを 読む",
      body: "おにごっこは 7人、なわとびは 3人です。2つを ならべると、{{はみ出した ○が ちがい}}です。○は 4こ。7−3＝4 で、おにごっこが 4人 多いです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "はみ出した ぶんが ちがい",
        max: 8,
        bars: [
          { label: "おにごっこ", parts: [...dots(3, "blue"), ...dots(4, "red")], total: "7人" },
          { label: "なわとび", parts: dots(3, "blue"), total: "3人" },
        ],
        note: "赤い ○が ちがいの 4人です。",
      },
    },
  ],
  mistakes: [
    {
      wrong: "○の 大きさや 間を ばらばらに かく",
      right: "○の 大きさと 間を そろえて かく",
      why: "大きさが ちがうと、長さで くらべられません。",
    },
    {
      wrong: "ちがいを 7＋3＝10 と たす",
      right: "ちがいは 7−3＝4 と ひく",
      why: "ちがいは はみ出した ぶんです。ひき算で 出します。",
    },
    {
      wrong: "表《ひょう》に する ときに 同じ 人を 2かい 数える",
      right: "数えた ものに しるしを つける",
      why: "しるしが あれば、数えわすれも 2かい 数えるのも ふせげます。",
    },
  ],
  check: [
    { q: "おにごっこ 7人、かくれんぼ 4人。ちがいは 何人？", a: "3人", why: "7−4＝3。はみ出した ○が 3こです。" },
    { q: "7人・5人・3人・4人。ぜんぶで 何人？", a: "19人", why: "7＋5＝12、12＋3＝15、15＋4＝19。" },
  ],
  next: [
    { label: "表《ひょう》と グラフ（ドリル）", href: "/learn/sansu-zukei/e-math-2-hyo-graph" },
    { label: "1年の「かずしらべ」を ふりかえる", href: "/learn/lecture/e-math-1-seiri" },
    { label: "3年の「表《ひょう》と 棒《ぼう》グラフ」（ドリル）", href: "/learn/sansu-zukei/e-math-3-bou-graph" },
  ],
};
