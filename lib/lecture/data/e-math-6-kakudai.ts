import type { Lecture } from "../types";

export const E_MATH_6_KAKUDAI: Lecture = {
  unit: "e-math-6-kakudai",
  title: "拡大図・縮図は「どの辺も同じ倍、角はそのまま」",
  hook: "写真を大きく引きのばしても、顔の形は変わりません。地図は町をそのまま小さくした図です。形を変えずに大きさだけを変えるきまりがわかると、地図から実際の距離《きょり》を求めたり、測れない高さを求めたりできます。",
  sections: [
    {
      heading: "形を変えずに大きく・小さくした図",
      body: "形を変えずに大きくした図を{{拡大図}}、小さくした図を{{縮図}}といいます。拡大図・縮図では、{{対応する辺の長さがすべて同じ倍}}になり、{{対応する角の大きさは等しい}}ままです。たてだけ2倍にした図は、形が変わるので拡大図ではありません。",
      figure: {
        type: "compare",
        title: "三角形ABCと、その2倍の拡大図",
        columns: [{ title: "もとの図", tone: "blue" }, { title: "2倍の拡大図", tone: "yellow" }],
        rows: [
          { label: "辺AB", cells: ["3cm", "6cm"] },
          { label: "辺BC", cells: ["4cm", "8cm"] },
          { label: "辺CA", cells: ["5cm", "10cm"] },
          { label: "角B", cells: ["90°", "90°（同じ）"] },
        ],
        note: "辺はどれも2倍。角は変わらない。",
      },
    },
    {
      heading: "辺の長さを線分図でくらべる",
      body: "もとの辺が4cmなら、{{2倍の拡大図}}では 4×2＝8cm、{{1/2の縮図}}では 4÷2＝2cm です。どの辺にも{{同じ数をかける}}（わる）ので、図全体が同じ形のまま大きくなったり小さくなったりします。",
      figure: {
        type: "area",
        kind: "bar",
        title: "辺BC（4cm）の長さ",
        max: 8,
        bars: [
          { label: "1/2の縮図", parts: [{ value: 2, label: "2cm", tone: "blue" }], total: "×1/2" },
          { label: "もとの図", parts: [{ value: 4, label: "4cm", tone: "plain" }], total: "×1" },
          { label: "2倍の拡大図", parts: [{ value: 8, label: "8cm", tone: "yellow" }], total: "×2" },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 2, label: "2" },
          { at: 4, label: "4" },
          { at: 8, label: "8cm" },
        ],
      },
    },
    {
      heading: "何倍かを求めて、ほかの辺に使う",
      body: "もとの図と拡大図で、{{対応する辺を1組見つけて}}、何倍になっているかを求めます。その倍を、知りたい辺にもかけます。たて4cm・横6cmの長方形の拡大図で、たてが10cmなら、10÷4＝2.5倍なので、横は 6×2.5＝15cm です。",
      figure: {
        type: "formula",
        title: "たて4cm→10cm のとき、横6cmは？",
        prose: true,
        steps: [
          { expr: "10 ÷ 4 ＝ {{2.5倍}}", note: "対応する辺で倍を求める" },
          { expr: "6 × {{2.5}} ＝ {{15}}", note: "横にも同じ倍をかける" },
          { expr: "横は 15cm", note: "角はすべて90°のまま" },
        ],
      },
    },
    {
      heading: "縮尺：実際の長さをどれだけ縮めたか",
      body: "縮図で、実際の長さを縮めた割合を{{縮尺}}といいます。1/1000 は「実際の長さの1000分の1」という意味で、{{1：1000}} とも書きます。地図の長さから実際の長さを求めるときは、{{縮尺の分母をかけて}}、最後に単位を直します。",
      figure: {
        type: "flow",
        title: "縮尺1/1000の地図で5cmは、実際は？",
        steps: [
          { label: "地図で5cm", tone: "blue" },
          { label: "5000cm", sub: "5×1000" },
          { label: "50m", sub: "100cm＝1m", tone: "yellow" },
        ],
        arrows: ["×1000", "÷100"],
      },
    },
    {
      heading: "地図のものさしで読む",
      body: "地図には、0から目もりのついた{{ものさし}}がかいてあることがあります。縮尺1/1000なら、地図の1cmが実際の10mです。ものさしに当てれば、計算しなくてもおよその距離《きょり》が読めます。",
      figure: {
        type: "numberline",
        title: "縮尺1/1000のものさし（地図の1cmが10m）",
        min: 0,
        max: 60,
        tick: 10,
        points: [{ x: 50, label: "地図で5cm", tone: "yellow" }],
        ranges: [{ from: 0, to: 50, label: "実際は50m", tone: "blue" }],
        note: "目もりの数は実際の長さ（m）。",
      },
    },
  ],
  mistakes: [
    { wrong: "2倍の拡大図では、角も2倍になる", right: "対応する角の大きさは変わらない", why: "拡大図・縮図で変わるのは辺の長さだけ。角が変わると形が変わってしまいます。" },
    { wrong: "縮尺1/1000の地図で5cmを「5000m」と答える", right: "5×1000＝5000cm＝50m", why: "かけた答えは地図と同じ単位（cm）です。100でわってmに直します。" },
    { wrong: "たてを2cm、横を2cmのばした図を拡大図とする", right: "どの辺も同じ数をかけたものが拡大図", why: "同じ長さを「たす」と、辺の長さの倍がそろわず、形が変わります。" },
  ],
  check: [
    { q: "8cmの辺は、1/2の縮図では何cmですか。", a: "4cm", why: "どの辺も1/2になるので 8÷2＝4cm。" },
    { q: "縮尺1/25000の地図で4cmの長さは、実際は何kmですか。", a: "1km", why: "4×25000＝100000cm＝1000m＝1km。" },
    { q: "実際の200mは、縮尺1/5000の地図では何cmですか。", a: "4cm", why: "200m＝20000cm。20000÷5000＝4cm。" },
  ],
  next: [
    { label: "「拡大図と縮図」（ドリル）", href: "/learn/sansu-zukei/e-math-6-kakudai" },
    { label: "ふりかえり「比」（図解）", href: "/learn/lecture/e-math-6-hi" },
    { label: "5年「合同な図形」（ドリル）", href: "/learn/sansu-zukei/e-math-5-goudou" },
  ],
};
