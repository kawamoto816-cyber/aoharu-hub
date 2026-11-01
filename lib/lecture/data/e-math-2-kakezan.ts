import type { Lecture } from "../types";

export const E_MATH_2_KAKEZAN: Lecture = {
  unit: "e-math-2-kakezan",
  title: "かけ算は「1つ分の数 × いくつ分」",
  hook: "おさら1まいに、いちごが3こずつ。おさらが4まいなら、いちごは何こでしょう。3＋3＋3＋3 とたすより、かけ算ならすぐにもとめられます。九九をおぼえると、計算がぐんとはやくなります。",
  sections: [
    {
      heading: "同じ数ずつ、いくつ分",
      body: "1さらに3こずつ、4さら分あります。これを{{3×4}}と書きます。「3かける4」と読みます。答えは 3＋3＋3＋3 と同じ{{12}}です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "3こずつ 4さら分",
        max: 12,
        bars: [
          {
            label: "いちご",
            parts: [
              { value: 3, label: "3こ", tone: "yellow" },
              { value: 3, label: "3こ", tone: "blue" },
              { value: 3, label: "3こ", tone: "yellow" },
              { value: 3, label: "3こ", tone: "blue" },
            ],
            total: "12こ",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 3, label: "1さら" },
          { at: 6, label: "2さら" },
          { at: 9, label: "3さら" },
          { at: 12, label: "4さら" },
        ],
      },
    },
    {
      heading: "かけられる数と かける数",
      body: "3×4の3は「1つ分の数」です。4は「いくつ分」です。{{前が1つ分、後ろがいくつ分}}と書きます。ことばの文は、まず1つ分を見つけます。",
      figure: {
        type: "compare",
        title: "1つ分の数 × いくつ分",
        columns: [{ title: "しき", tone: "navy" }, { title: "1つ分の数", tone: "blue" }, { title: "いくつ分", tone: "yellow" }],
        rows: [
          { cells: ["3×4", "1さら 3こ", "4さら"] },
          { cells: ["5×2", "1人 5本", "2人"] },
          { cells: ["2×6", "1台 2人", "6台"] },
        ],
      },
    },
    {
      heading: "九九のだんは、同じ数ずつふえる",
      body: "3のだんは、答えが{{3ずつふえます}}。かける数が1ふえると、答えはかけられる数だけふえます。わすれたら、1つ前の答えにたします。",
      figure: {
        type: "formula",
        title: "3のだんを作る",
        steps: [
          { expr: "3×1 ＝ 3", note: "1さら分" },
          { expr: "3×2 ＝ 3 {{＋3}} ＝ 6", note: "3ふえる" },
          { expr: "3×3 ＝ 6 {{＋3}} ＝ 9", note: "3ふえる" },
          { expr: "3×4 ＝ 9 {{＋3}} ＝ {{12}}", note: "3ふえる" },
        ],
      },
    },
    {
      heading: "入れかえても答えは同じ",
      body: "おはじきを、たて3こ、よこ4こにならべます。よこに見ると、4こが3れつで{{4×3}}です。たてに見ると、3こが4れつで{{3×4}}です。どちらも12こです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "4×3 と 3×4 をならべてくらべる",
        max: 12,
        bars: [
          {
            label: "4×3",
            parts: [
              { value: 4, label: "4こ", tone: "blue" },
              { value: 4, label: "4こ", tone: "plain" },
              { value: 4, label: "4こ", tone: "blue" },
            ],
            total: "12こ",
          },
          {
            label: "3×4",
            parts: [
              { value: 3, label: "3こ", tone: "yellow" },
              { value: 3, label: "3こ", tone: "plain" },
              { value: 3, label: "3こ", tone: "yellow" },
              { value: 3, label: "3こ", tone: "plain" },
            ],
            total: "12こ",
          },
        ],
        note: "3×4 も 4×3 も 12。わすれた九九は、入れかえて考える。",
      },
    },
  ],
  mistakes: [
    { wrong: "1人に5本ずつ2人分を 2×5 と書く", right: "5×2", why: "かけ算のしきは、1つ分の数が前です。答えは同じでも、しきのあらわすことがかわります。" },
    { wrong: "3×4 を 3＋4＝7 とする", right: "3×4＝12", why: "3が4つ分なので、3を4回たした数です。" },
    { wrong: "7×8＝54 とおぼえる", right: "7×8＝56", why: "7×7＝49 に7をたすと56です。たしかめましょう。" },
  ],
  check: [
    { q: "1ふくろに4こずつ、5ふくろ分。しきと答えは？", a: "4×5＝20（20こ）", why: "1つ分は4こ、いくつ分は5ふくろです。" },
    { q: "6×4 の答えは、6×3 の答えよりいくつ大きいですか。", a: "6", why: "かける数が1ふえると、答えは6ふえます。" },
    { q: "8×3 と同じ答えになる、3のだんの九九は？", a: "3×8", why: "入れかえても答えは同じ。どちらも24です。" },
  ],
  next: [
    { label: "計算の段《だん》で「2のだん・5のだん」をれんしゅうする", href: "/learn/sansu/13" },
    { label: "九九ばらばら（計算の段《だん》）", href: "/learn/sansu/17" },
    { label: "つづき「かけ算のきまり」（3年）", href: "/learn/sansu-zukei/e-math-3-kake-kimari" },
  ],
};
