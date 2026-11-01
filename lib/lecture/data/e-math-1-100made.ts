import type { Lecture } from "../types";

export const E_MATH_1_100MADE: Lecture = {
  unit: "e-math-1-100made",
  title: "10の まとまりで かぞえる",
  hook: "ビーズが 47こ あります。1こずつ かぞえると たいへんです。10こずつ まとめると、すぐに わかります。",
  sections: [
    {
      heading: "10の まとまりを つくる",
      body: "ビーズを 10こずつ まとめます。{{10の まとまりが 4つ}} できました。ばらが 7こ のこりました。これで {{47}} です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "47 は 10が 4つと ばらが 7",
        max: 50,
        bars: [
          {
            label: "ビーズ",
            parts: [
              { value: 10, label: "10", tone: "blue" },
              { value: 10, label: "10", tone: "blue" },
              { value: 10, label: "10", tone: "blue" },
              { value: 10, label: "10", tone: "blue" },
              { value: 7, label: "7", tone: "yellow" },
            ],
            total: "47こ",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 40, label: "40" },
          { at: 50, label: "50" },
        ],
      },
    },
    {
      heading: "十のくらい と 一のくらい",
      body: "10の まとまりの かずを {{十のくらい}} に かきます。ばらの かずを {{一のくらい}} に かきます。ばらが ない ときは 0を かきます。",
      figure: {
        type: "compare",
        title: "かずを くらいに わける",
        columns: [{ title: "十のくらい", tone: "blue" }, { title: "一のくらい", tone: "yellow" }],
        rows: [
          { label: "47", cells: ["4（10が 4つ）", "7（ばら 7）"] },
          { label: "60", cells: ["6（10が 6つ）", "0（ばら なし）"] },
          { label: "85", cells: ["8（10が 8つ）", "5（ばら 5）"] },
        ],
      },
    },
    {
      heading: "100は 10が 10こ",
      body: "99に 1を たすと {{100}} です。100は、{{10の まとまりが 10こ}} です。「ひゃく」と よみます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "100 は 10が 10こ",
        max: 100,
        bars: [
          {
            label: "10が 10こ",
            parts: Array.from({ length: 10 }, () => ({ value: 10, tone: "blue" as const })),
            total: "100",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 50, label: "50" },
          { at: 100, label: "100" },
        ],
      },
    },
    {
      heading: "どちらが 大きい？",
      body: "58と 62を くらべます。まず {{十のくらいを 見ます}}。5より 6が 大きいので、62が 大きいです。十のくらいが おなじ ときは、一のくらいを 見ます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "大きさの くらべかた",
        steps: [
          { label: "十のくらいを 見る", sub: "58と 62 → 5と 6" },
          { label: "おなじなら 一のくらい", sub: "34と 37 → 4と 7" },
          { label: "すうじが 大きい ほうの かずが 大きい", sub: "62、37 が 大きい", tone: "yellow" },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "「よんじゅうなな」を 407 と かく",
      right: "47",
      why: "十のくらいに 4、一のくらいに 7を かきます。",
    },
    {
      wrong: "10が 6つの かずを 6 と かく",
      right: "60",
      why: "ばらが ない ときも、一のくらいに 0を かきます。",
    },
    {
      wrong: "58と 62で、8が 大きいので 58が 大きい",
      right: "62の ほうが 大きい",
      why: "さきに 十のくらいを くらべます。",
    },
  ],
  check: [
    { q: "10が 7つと、ばらが 3こ。いくつ？", a: "73", why: "十のくらいが 7、一のくらいが 3。" },
    { q: "89の つぎの かずは？", a: "90", why: "ばらが 10こに なると、10の まとまりが 1つ ふえます。" },
    { q: "64と 46、大きいのは どっち？", a: "64", why: "十のくらいの 6と 4を くらべます。" },
  ],
  next: [
    { label: "けいさんの だんで「100までの かず」を れんしゅう", href: "/learn/sansu/7" },
    { label: "20までの かず（けいさんの だん）", href: "/learn/sansu/3" },
    { label: "1000までの かず（2年・レクチャー）", href: "/learn/lecture/e-math-2-1000made" },
  ],
};
