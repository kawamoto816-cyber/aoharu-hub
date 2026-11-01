import type { Lecture } from "../types";

const ten = { value: 10, label: "10" } as const;

export const E_MATH_2_HIKI_HISSAN: Lecture = {
  unit: "e-math-2-hiki-hissan",
  title: "ひき算の ひっ算は「ひけない ときは 10を かりる」",
  hook: "シールが 52まい あります。27まい あげると、のこりは 何まいでしょう。ひっ算なら、一のくらいから じゅんに 計算できます。",
  sections: [
    {
      heading: "ひけない ときは たばを ばらす",
      body: "52−27 の 一のくらいは 2−7 です。このままでは ひけません。そこで {{十のくらいから 10を 1つ かります}}。52を 40と 12に 見なおします。",
      figure: {
        type: "area",
        kind: "bar",
        title: "52 の たばを 1つ ばらす",
        max: 52,
        bars: [
          { label: "52", parts: [ten, ten, ten, ten, ten, { value: 2, label: "2", tone: "yellow" }], total: "たば5つと 2" },
          { label: "見なおした 52", parts: [ten, ten, ten, ten, { value: 12, label: "12", tone: "red" }], total: "たば4つと 12" },
        ],
        note: "たばを 1つ ばらすと、ばらは 2＋10＝12 に なります。",
      },
    },
    {
      heading: "ひっ算の じゅんばん",
      body: "ひっ算は {{くらいを たてに そろえて}} 書きます。計算は {{一のくらいから}} です。10を かした 十のくらいは、1 へって います。",
      figure: {
        type: "flow",
        dir: "row",
        title: "52−27 の じゅんばん",
        steps: [
          { label: "そろえて 書く", sub: "右はしを そろえる", tone: "blue" },
          { label: "一のくらい", sub: "12−7", tone: "yellow" },
          { label: "十のくらい", sub: "4−2", tone: "navy" },
        ],
      },
    },
    {
      heading: "くり下がりの しかた",
      body: "2から 7は ひけないので、十のくらいから 1 かります。一のくらいは 12−7＝5 です。十のくらいは 5が 4に へって、4−2＝2 です。これが {{くり下がり}}です。",
      figure: {
        type: "formula",
        title: "52−27 を 1けたずつ",
        steps: [
          { label: "書く", expr: "52 − 27", note: "くらいを そろえる" },
          { label: "一のくらい", expr: "2 − 7 は ひけない", note: "十のくらいから 1 かりる" },
          { label: "一のくらい", expr: "{{12}} − 7 ＝ {{5}}", note: "かりた 10と 2で 12" },
          { label: "十のくらい", expr: "{{4}} − 2 ＝ {{2}}", note: "かしたので 5が 4に" },
          { label: "こたえ", expr: "{{25}}", note: "25まい" },
        ],
      },
    },
    {
      heading: "たし算で たしかめる",
      body: "{{こたえ＋ひく数＝ひかれる数}} に なれば 正しいです。25＋27＝52 なので あって います。のこりと あげた 分を あわせると、もとの 数に もどります。",
      figure: {
        type: "area",
        kind: "bar",
        title: "のこりと あげた 分で 52",
        max: 52,
        bars: [
          {
            label: "もとの シール",
            parts: [
              { value: 25, label: "のこり 25", tone: "yellow" },
              { value: 27, label: "あげた 27", tone: "blue" },
            ],
            total: "52まい",
          },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "2−7 を 7−2 に して 52−27＝35",
      right: "十のくらいから 1 かりて 12−7＝5",
      why: "上の 数から 下の 数を ひきます。入れかえては いけません。",
    },
    {
      wrong: "かりたのに 十のくらいを 5−2＝3 と する",
      right: "十のくらいは 4−2＝2",
      why: "10を 1つ かしたので、5は 4に へって います。",
    },
    {
      wrong: "50−27 で 0−7 は 0 と する",
      right: "10−7＝3、4−2＝2 で 23",
      why: "0からも ひけません。十のくらいから 1 かります。",
    },
  ],
  check: [
    { q: "63−28 は？", a: "35", why: "13−8＝5。十のくらいは 5−2＝3。" },
    { q: "70−34 は？", a: "36", why: "10−4＝6。十のくらいは 6−3＝3。" },
    { q: "41−15 の こたえを たし算で たしかめる しきは？", a: "26＋15＝41", why: "41−15＝26。こたえ＋ひく数 で もとに もどります。" },
  ],
  next: [
    { label: "計算の だんで「2けたの ひき算」", href: "/learn/sansu/9" },
    { label: "百いくつから ひく ひき算", href: "/learn/sansu/11" },
    { label: "たし算の ひっ算（レクチャー）", href: "/learn/lecture/e-math-2-tashi-hissan" },
  ],
};
