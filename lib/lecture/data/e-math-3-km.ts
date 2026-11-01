import type { Lecture } from "../types";

export const E_MATH_3_KM: Lecture = {
  unit: "e-math-3-km",
  title: "1km は 1000m。道のりときょりのちがい",
  hook: "家から学校まで、学校から駅まで。長い道の長さをmで表すと、数が大きくなりすぎます。そこで使うのが km（キロメートル）という単位《たんい》です。",
  sections: [
    {
      heading: "1km＝1000m",
      body: "1000mを{{1km}}と書き、「1キロメートル」と読みます。「キロ」は1000という意味です。1周《しゅう》200mのトラックなら、5周《しゅう》で1000m、つまり1kmです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "200mを5回で1km",
        max: 1000,
        bars: [
          {
            label: "5周《しゅう》",
            parts: [
              { value: 200, label: "200m", tone: "blue" },
              { value: 200, label: "200m", tone: "yellow" },
              { value: 200, label: "200m", tone: "blue" },
              { value: 200, label: "200m", tone: "yellow" },
              { value: 200, label: "200m", tone: "blue" },
            ],
            total: "1km",
          },
        ],
        scale: [
          { at: 0, label: "0m" },
          { at: 500, label: "500m" },
          { at: 1000, label: "1000m" },
        ],
      },
    },
    {
      heading: "km と m がまじった長さ",
      body: "1200mは、1000mと200mに分けて{{1km200m}}と書けます。反対に、2km50mをmだけで表すと、2000m＋50m＝2050m です。mになおすときは、{{1kmを1000m}}として考え、0をわすれないようにします。",
      figure: {
        type: "formula",
        title: "km と m を行き来する",
        steps: [
          { label: "①", expr: "1200m ＝ 1000m ＋ 200m", note: "1000mのまとまりを出す" },
          { label: "①", expr: "＝ {{1km}}200m", note: "1000m を 1km に" },
          { label: "②", expr: "2km50m ＝ 2000m ＋ 50m", note: "2km を 2000m に" },
          { label: "②", expr: "＝ 20{{5}}0m", note: "十の位《くらい》に5" },
        ],
      },
    },
    {
      heading: "道のりときょり",
      body: "道にそってはかった長さを{{道のり}}、まっすぐにはかった長さを{{きょり}}といいます。家から駅までの道が曲がっていると、道のりはきょりより長くなります。地図で考えるときは、どちらを聞かれているかを見ます。",
      figure: {
        type: "compare",
        title: "家から駅まで",
        columns: [{ title: "道のり", tone: "blue" }, { title: "きょり", tone: "yellow" }],
        rows: [
          { label: "はかり方", cells: ["道にそってはかる", "まっすぐはかる"] },
          { label: "長さ", cells: ["1km300m", "900m"] },
          { label: "くらべると", cells: ["長い（同じこともある）", "短い"] },
        ],
      },
    },
    {
      heading: "道のりをたす",
      body: "家から公園まで600m、公園から学校まで700mなら、家から公園を通って学校までの道のりは 600m＋700m＝1300m です。1300mは{{1km300m}}とも書けます。km と m は、同じ単位《たんい》どうしで計算します。",
      figure: {
        type: "area",
        kind: "bar",
        title: "600m＋700m＝1km300m",
        max: 1300,
        bars: [
          {
            label: "家→公園→学校",
            parts: [
              { value: 600, label: "600m", tone: "blue" },
              { value: 700, label: "700m", tone: "yellow" },
            ],
            total: "1300m",
          },
          {
            label: "km と m",
            parts: [
              { value: 1000, label: "1km", tone: "navy" },
              { value: 300, label: "300m", tone: "plain" },
            ],
            total: "1km300m",
          },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "1km＝100m", right: "1km＝1000m", why: "キロは1000という意味。100mが10こで1kmです。" },
    { wrong: "2km50m＝250m", right: "2km50m＝2050m", why: "2kmは2000m。それに50mをたすので、百の位《くらい》は0になります。" },
    { wrong: "道のりときょりは、いつも同じ", right: "道が曲がっていると、道のりのほうが長い", why: "道のりは道にそってはかり、きょりはまっすぐはかるからです。" },
  ],
  check: [
    { q: "3km は何mですか。", a: "3000m", why: "1km＝1000m なので、3つ分で3000m。" },
    { q: "1km400m は何mですか。", a: "1400m", why: "1000m＋400m＝1400m。" },
    { q: "2500m は何km何mですか。", a: "2km500m", why: "2000mが2km、のこりが500m。" },
  ],
  next: [
    { label: "ドリル：長さ（km）", href: "/learn/sansu-zukei/e-math-3-km" },
    { label: "小2 長い長さ（m）", href: "/learn/sansu-zukei/e-math-2-m" },
    { label: "重さ（g・kg）", href: "/learn/sansu-zukei/e-math-3-omosa" },
  ],
};
