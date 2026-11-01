import type { Lecture } from "../types";

export const E_MATH_1_3TSU: Lecture = {
  unit: "e-math-1-3tsu",
  title: "3つの かずは、まえから じゅんに けいさん",
  hook: "かごに りんごが 4こ あります。3こ と 2こ を じゅんに 入れました。ぜんぶで なんこ でしょう。1つの しきに すると、よく わかります。",
  sections: [
    {
      heading: "まえから じゅんに",
      body: "4＋3＋2 は、{{まえから じゅんに}} けいさんします。まず 4＋3＝7 です。つぎに 7＋2＝9 です。こたえは 9こ です。",
      figure: {
        type: "flow",
        dir: "row",
        title: "4＋3＋2 の けいさん",
        steps: [
          { label: "4＋3", sub: "まず ここ" },
          { label: "7＋2", sub: "つぎに ここ" },
          { label: "9", sub: "こたえ", tone: "yellow" },
        ],
        arrows: ["7に なる", "9に なる"],
      },
    },
    {
      heading: "ふえたら ＋、へったら −",
      body: "バスに 5人 のって います。3人 のって、2人 おりました。{{ふえる ときは ＋}}、{{へる ときは −}} です。しきは 5＋3−2 です。5＋3＝8、8−2＝6 で 6人 です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "バスの 人の かず",
        max: 8,
        bars: [
          { label: "はじめ", parts: [{ value: 5, label: "5人", tone: "blue" }], total: "5人" },
          {
            label: "3人 のる（＋3）",
            parts: [
              { value: 5, label: "5人", tone: "blue" },
              { value: 3, label: "3人", tone: "yellow" },
            ],
            total: "8人",
          },
          {
            label: "2人 おりる（−2）",
            parts: [
              { value: 6, label: "6人", tone: "blue" },
              { value: 2, label: "おりた", tone: "red" },
            ],
            total: "6人",
          },
        ],
        note: "のると ながく、おりると みじかく なります。",
      },
    },
    {
      heading: "ひきざんが 2かい",
      body: "10−4−2 も まえから じゅんに します。10−4＝6 です。6−2＝4 です。{{とちゅうの こたえ}}を つかって つぎを します。",
      figure: {
        type: "formula",
        title: "10−4−2 を じゅんに",
        steps: [
          { expr: "10 − 4 − 2", note: "まえの 2つから" },
          { expr: "{{6}} − 2", note: "10−4＝6" },
          { expr: "{{4}}", note: "6−2＝4" },
        ],
      },
    },
    {
      heading: "とちゅうの こたえを かいて おく",
      body: "とちゅうの こたえは わすれやすいです。しきの 下に {{小さく かいて おく}} と あんしんです。なれたら あたまの 中で できます。",
    },
  ],
  mistakes: [
    {
      wrong: "10−4−2 で 4−2＝2 を さきに して、10−2＝8",
      right: "10−4＝6、6−2＝4",
      why: "3つの かずは まえから じゅんに けいさんします。",
    },
    {
      wrong: "「2人 おりた」を ＋2 に する",
      right: "おりると へるので −2",
      why: "へる ときは ひきざん です。",
    },
    {
      wrong: "とちゅうの 7 を わすれて、4＋2＝6 に する",
      right: "4＋3＝7、7＋2＝9",
      why: "とちゅうの こたえに つぎの かずを たします。",
    },
  ],
  check: [
    { q: "3＋4＋2 は いくつ？", a: "9", why: "3＋4＝7、7＋2＝9。" },
    { q: "10−3−5 は いくつ？", a: "2", why: "10−3＝7、7−5＝2。" },
    { q: "6＋4−3 は いくつ？", a: "7", why: "6＋4＝10、10−3＝7。" },
  ],
  next: [
    { label: "けいさんの だんで「3つの かず」を れんしゅう", href: "/learn/sansu/6" },
    { label: "たしざん（けいさんの だん）", href: "/learn/sansu/1" },
    { label: "ひきざん（けいさんの だん）", href: "/learn/sansu/2" },
  ],
};
