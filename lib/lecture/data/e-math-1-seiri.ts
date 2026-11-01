import type { Lecture } from "../types";

export const E_MATH_1_SEIRI: Lecture = {
  unit: "e-math-1-seiri",
  title: "かずしらべは「わけて ならべて くらべる」",
  hook: "クラスで すきな くだものを しらべました。どれが いちばん おおいかな？ えを きちんと ならべると、ひと目で わかります。",
  sections: [
    {
      heading: "まずは しゅるいごとに わける",
      body: "えが ばらばらだと、かぞえにくいです。{{おなじ しゅるいごとに わけて}} かぞえます。わけたら よこに ならべます。さいごに ならびを くらべます。",
      figure: {
        type: "flow",
        dir: "row",
        title: "かずしらべの 3つの じゅんばん",
        steps: [
          { label: "わける", sub: "おなじ しゅるいに", tone: "blue" },
          { label: "ならべる", sub: "はしを そろえて", tone: "yellow" },
          { label: "くらべる", sub: "ながさを 見る", tone: "navy" },
        ],
      },
    },
    {
      heading: "はしを そろえて 1こずつ ならべる",
      body: "えは {{左の はしを そろえて}} ならべます。1こに 1ますずつ つかいます。すると、ならびの ながさで かずが わかります。ながい ほうが おおいです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "すきな くだもの（1ます＝1人）",
        max: 6,
        bars: [
          { label: "りんご", parts: [1, 1, 1, 1, 1].map((v) => ({ value: v, label: "●", tone: "red" as const })), total: "5人" },
          { label: "みかん", parts: [1, 1, 1].map((v) => ({ value: v, label: "●", tone: "yellow" as const })), total: "3人" },
          { label: "バナナ", parts: [1, 1, 1, 1, 1, 1].map((v) => ({ value: v, label: "●", tone: "yellow" as const })), total: "6人" },
          { label: "いちご", parts: [1, 1, 1, 1].map((v) => ({ value: v, label: "●", tone: "red" as const })), total: "4人" },
        ],
        note: "はしが そろって いるので、ながさで くらべられます。",
      },
    },
    {
      heading: "ならべると わかる こと",
      body: "いちばん ながいのは バナナです。だから {{バナナが いちばん おおい}} です。りんごと いちごは、はみ出した 1ます ぶんが ちがいです。",
      figure: {
        type: "compare",
        title: "ならびから 見つけた こと",
        columns: [{ title: "しらべた こと", tone: "blue" }, { title: "こたえ", tone: "yellow" }],
        rows: [
          { cells: ["いちばん おおい", "バナナ 6人"] },
          { cells: ["いちばん すくない", "みかん 3人"] },
          { cells: ["りんごと いちごの ちがい", "1人"] },
        ],
      },
    },
    {
      heading: "かぞえまちがいを ふせぐ",
      body: "かぞえた えには {{しるしを つけます}}。おなじ えを 2かい かぞえずに すみます。えの 大きさも そろえて かきます。",
    },
  ],
  mistakes: [
    {
      wrong: "大きい えと 小さい えを まぜて ならべる",
      right: "えの 大きさを そろえて ならべる",
      why: "大きい えは 1こでも ながく 見えます。ながさで くらべられません。",
    },
    {
      wrong: "はしを そろえずに ならべる",
      right: "左の はしを そろえて ならべる",
      why: "はしが ずれると、ながい ほうが おおいとは いえません。",
    },
    {
      wrong: "おなじ えを 2かい かぞえる",
      right: "かぞえた えに しるしを つける",
      why: "しるしが あれば、どこまで かぞえたか わかります。",
    },
  ],
  check: [
    { q: "りんごが 5人、みかんが 3人。どちらが なん人 おおい？", a: "りんごが 2人 おおい", why: "5は 3より 2 おおいです。はみ出した 2ます ぶんです。" },
    { q: "バナナ 6人、いちご 4人、りんご 5人。いちばん すくないのは？", a: "いちご", why: "ならべると いちごが いちばん みじかいです。" },
  ],
  next: [
    { label: "かずしらべ（ドリル）", href: "/learn/sansu-zukei/e-math-1-seiri" },
    { label: "10までの かず（ドリル）", href: "/learn/sansu-zukei/e-math-1-10made" },
    { label: "つぎは 2年の「ひょうと グラフ」", href: "/learn/lecture/e-math-2-hyo-graph" },
  ],
};
