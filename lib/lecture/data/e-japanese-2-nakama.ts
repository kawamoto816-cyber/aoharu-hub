import type { Lecture } from "../types";

export const E_JAPANESE_2_NAKAMA: Lecture = {
  unit: "e-japanese-2-nakama",
  nameRuby: "なかまの言葉《ことば》",
  title: "まとめる 言葉《ことば》と、 その 中に 入る 言葉《ことば》",
  hook: "「くだもの、 何が すき？」と 聞かれたら、 りんごや みかんと 答えますね。 「くだもの」は、 まとめて よぶ 言葉《ことば》です。 まとめる 言葉《ことば》を 知ると、 ものを 分けやすく なります。",
  sections: [
    {
      heading: "まとめる 言葉《ことば》",
      body: "いくつかの ものを、 {{まとめて よぶ 言葉《ことば》}}が あります。 すずめや からすは「鳥」です。 「鳥」「魚」「虫」は、 「生きもの」に まとめられます。",
      figure: {
        type: "tree",
        title: "生きものの なかま",
        root: {
          label: "生きもの",
          tone: "navy",
          children: [
            { label: "鳥", sub: "すずめ・からす", tone: "blue" },
            { label: "魚", sub: "めだか・こい", tone: "blue" },
            { label: "虫", sub: "ちょう・せみ", tone: "blue" },
          ],
        },
      },
    },
    {
      heading: "いろいろな なかま",
      body: "きせつ・方角・天気・教科なども、 {{まとめる 言葉《ことば》}}です。 その 中に、 {{なかまの 言葉《ことば》}}が 入って います。",
      figure: {
        type: "compare",
        title: "まとめる 言葉《ことば》と なかま",
        columns: [{ title: "まとめる 言葉《ことば》", tone: "navy" }, { title: "なかまの 言葉《ことば》", tone: "yellow" }],
        rows: [
          { cells: ["きせつ", "春・夏・秋・冬"] },
          { cells: ["方角", "東・西・南・北"] },
          { cells: ["天気", "晴れ・雨・くもり・雪"] },
          { cells: ["教科", "国語・算数・音楽"] },
        ],
      },
    },
    {
      heading: "大きい なかま・小さい なかま",
      body: "なかまの 中に、 もっと 小さい なかまが ある ことも あります。 「食べもの」の 中に「くだもの」、 その 中に「りんご」です。 {{どちらが 大きい まとまりか}}を 考えます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "大きい まとまりから 小さい まとまりへ",
        steps: [
          { label: "食べもの", sub: "一番 大きい", tone: "navy" },
          { label: "くだもの", sub: "食べものの 一つ", tone: "blue" },
          { label: "りんご", sub: "くだものの 一つ", tone: "yellow" },
        ],
        arrows: ["その 中に", "その 中に"],
      },
    },
    {
      heading: "なかまはずれを 見つける",
      body: "ならんだ 言葉《ことば》の 中から、 {{なかまで ない もの}}を さがします。 まとめる 言葉《ことば》を 考えると、 見つけやすく なります。",
      figure: {
        type: "formula",
        title: "なかまはずれは どれ？",
        prose: true,
        steps: [
          { label: "くだもの", expr: "りんご・みかん・{{にんじん}}・ぶどう", note: "にんじんは やさい" },
          { label: "きせつ", expr: "春・夏・{{朝}}・冬", note: "朝は 一日の 時間" },
          { label: "鳥", expr: "すずめ・はと・{{めだか}}・からす", note: "めだかは 魚" },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "「くだもの」と「りんご」を ならべて 書く",
      right: "くだものの 中に りんごが ある",
      why: "くだものは まとめる 言葉《ことば》、 りんごは その 中の 一つです。",
    },
    {
      wrong: "ちょうを 鳥の なかまに 入れる",
      right: "ちょうは 虫の なかま",
      why: "はねが あって とんでも、 ちょうは 虫です。",
    },
    {
      wrong: "「雨」を きせつの なかまに 入れる",
      right: "雨は 天気の なかま",
      why: "きせつは 春・夏・秋・冬の 四つです。",
    },
  ],
  check: [
    {
      q: "東・西・南・北を まとめて よぶ 言葉《ことば》は？",
      a: "方角",
      why: "むきを あらわす なかまです。",
    },
    {
      q: "「月曜日・火曜日・春・水曜日」で なかまはずれは？",
      a: "春",
      why: "ほかは 曜日、 春は きせつです。",
    },
    {
      q: "国語・算数・音楽を まとめて よぶ 言葉《ことば》は？",
      a: "教科",
      why: "学校で 学ぶ べんきょうの なかまです。",
    },
  ],
  next: [
    { label: "「なかまの言葉《ことば》」カード", href: "/learn/kokugo-sho/e-japanese-2-nakama" },
    { label: "1年「なかまの言葉《ことば》」", href: "/learn/kokugo-sho/e-japanese-1-nakama" },
    { label: "2年「反対《はんたい》の意味《いみ》の言葉《ことば》」", href: "/learn/kokugo-sho/e-japanese-2-hantai" },
  ],
};
