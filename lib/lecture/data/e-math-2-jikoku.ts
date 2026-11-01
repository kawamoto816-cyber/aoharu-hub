import type { Lecture } from "../types";

export const E_MATH_2_JIKOKU: Lecture = {
  unit: "e-math-2-jikoku",
  title: "「時こく」はそのとき、「時間」は2つの時こくの間",
  hook: "「8時20分に家を出て、8時50分に学校についた」。出た時と ついた時は時こくです。その間の30分が時間です。ことばを分けると、何を聞かれているかがわかります。",
  sections: [
    {
      heading: "時こくと時間はちがう",
      body: "{{時こく}}は、時計のはりがさす「そのとき」です。{{時間}}は、時こくから時こくまでの長さです。8時20分から8時50分までは{{30分間}}です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "家を出てから学校につくまで",
        max: 60,
        bars: [
          {
            label: "8時から9時",
            parts: [
              { value: 20, tone: "plain" },
              { value: 30, label: "30分間", tone: "yellow" },
              { value: 10, tone: "plain" },
            ],
            total: "1時間",
          },
        ],
        scale: [
          { at: 0, label: "8時" },
          { at: 20, label: "8時20分" },
          { at: 50, label: "8時50分" },
        ],
        note: "目もりのところが時こく。黄色の長さが時間。",
      },
    },
    {
      heading: "ことばで見分ける",
      body: "「何時何分」と聞かれたら、時こくを答えます。「何分」「何時間」と聞かれたら、時間を答えます。答えに「間」をつけると時間だとわかります。",
      figure: {
        type: "compare",
        title: "時こくと時間",
        columns: [{ title: "時こく", tone: "blue" }, { title: "時間", tone: "yellow" }],
        rows: [
          { label: "なに？", cells: ["そのとき", "時こくと時こくの間"] },
          { label: "れい", cells: ["8時20分", "30分間"] },
          { label: "聞き方", cells: ["何時何分ですか", "何分かかりますか"] },
        ],
      },
    },
    {
      heading: "1時間は60分、1日は24時間",
      body: "長いはりがひと回りすると{{1時間＝60分}}です。1日は{{24時間}}です。昼の12時を{{正午}}といいます。正午より前が午前、後が午後です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "1日は 午前12時間と午後12時間",
        max: 24,
        bars: [
          {
            label: "1日",
            parts: [
              { value: 12, label: "午前 12時間", tone: "blue" },
              { value: 12, label: "午後 12時間", tone: "navy" },
            ],
            total: "24時間",
          },
        ],
        scale: [
          { at: 0, label: "夜中" },
          { at: 12, label: "正午" },
          { at: 24, label: "夜中" },
        ],
      },
    },
    {
      heading: "ちょうどの時こくでくぎる",
      body: "9時40分の30分後をもとめます。まず、ちょうど{{10時}}までの20分をすすめます。のこりは10分です。答えは{{10時10分}}です。",
      figure: {
        type: "formula",
        title: "9時40分の 30分後は？",
        prose: true,
        steps: [
          { expr: "30分 ＝ {{20分}} と {{10分}}", note: "10時までが20分" },
          { expr: "9時40分 ＋ 20分 ＝ {{10時}}", note: "ちょうどの時こく" },
          { expr: "10時 ＋ 10分 ＝ {{10時10分}}", note: "のこりの10分" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "9時40分の30分後を 9時70分 とする", right: "10時10分", why: "60分で1時間です。60分になったら、時を1つすすめます。" },
    { wrong: "「何分かかったか」に 8時50分 と答える", right: "30分", why: "かかったのは時間です。時こくを答えないようにします。" },
    { wrong: "1時間を100分と思う", right: "1時間＝60分", why: "長いはりは60目もりでひと回りです。" },
  ],
  check: [
    { q: "7時30分から8時までは何分間ですか。", a: "30分間", why: "長いはりが6から12まですすむので30分です。" },
    { q: "2時50分の20分後は何時何分ですか。", a: "3時10分", why: "3時まで10分。のこりの10分で3時10分です。" },
    { q: "1日は何時間ですか。", a: "24時間", why: "午前が12時間、午後が12時間です。" },
  ],
  next: [
    { label: "「時こくと時間」のドリル", href: "/learn/sansu-zukei/e-math-2-jikoku" },
    { label: "ふりかえり「時計の読み方」（1年）", href: "/learn/sansu-zukei/e-math-1-tokei" },
    { label: "つづき「時こくと時間」（3年）", href: "/learn/sansu-zukei/e-math-3-jikoku" },
  ],
};
