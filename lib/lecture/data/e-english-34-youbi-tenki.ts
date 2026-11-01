import type { Lecture } from "../types";

export const E_ENGLISH_34_YOUBI_TENKI: Lecture = {
  unit: "e-english-34-youbi-tenki",
  title: "曜日をたずねるのは What day、天気は How's the weather",
  hook: "朝の会で「今日は何曜日？」「天気はどう？」と話すことがありますね。曜日と天気は、毎日だれとでも話せる話題です。英語《えいご》で言えるようになると、あいさつのあとに、もう一言を続《つづ》けられます。",
  sections: [
    {
      heading: "7つの曜日の言い方",
      body: "曜日の言葉は、どれも {{day}} で終わります。Sunday は sun（太陽）、Monday は moon（月）から来た言葉で、日本語の{{日曜日・月曜日}}と同じ考え方です。曜日の言葉は、書くときに{{はじめの文字をいつも大文字}}にします。",
      figure: {
        type: "compare",
        title: "曜日の言葉",
        columns: [{ title: "英語《えいご》", tone: "blue" }, { title: "日本語" }],
        rows: [
          { cells: ["Sunday", "日曜日"] },
          { cells: ["Monday", "月曜日"] },
          { cells: ["Tuesday", "火曜日"] },
          { cells: ["Wednesday", "水曜日"] },
          { cells: ["Thursday", "木曜日"] },
          { cells: ["Friday", "金曜日"] },
          { cells: ["Saturday", "土曜日"] },
        ],
        note: "Tuesday（火）と Thursday（木）は、どちらも T で始まるので、まちがえやすい。",
      },
    },
    {
      heading: "曜日をたずねて、答える",
      body: "「今日は何曜日？」は {{What day is it today?}} とたずねます。答えるときは {{It's 〜.}} の後ろに曜日を入れて、It's Friday. のように言います。好《す》きな曜日を聞くときは What day do you like? と言えます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "曜日の会話",
        steps: [
          { label: "What day is it today?", sub: "今日は何曜日？", tone: "blue" },
          { label: "It's Friday.", sub: "金曜日だよ", tone: "yellow" },
          { label: "I like Fridays!", sub: "金曜日が好《す》き！" },
        ],
        arrows: ["たずねる", "聞いて一言"],
      },
    },
    {
      heading: "天気の言葉は、もとの言葉に y がつく",
      body: "天気を表す言葉は、{{sun（太陽）・cloud（雲）・rain（雨）}}などの言葉に {{y}} がついてできています。sunny は n が2つになることに気をつけましょう。もとの言葉を知っていると、天気の言葉の意味が分かりやすくなります。",
      figure: {
        type: "formula",
        title: "もとの言葉 → 天気の言葉",
        prose: true,
        steps: [
          { label: "太陽", expr: "sun → sun{{ny}}", note: "晴れ（n が2つ）" },
          { label: "雲", expr: "cloud → cloud{{y}}", note: "くもり" },
          { label: "雨", expr: "rain → rain{{y}}", note: "雨" },
          { label: "雪", expr: "snow → snow{{y}}", note: "雪" },
          { label: "風", expr: "wind → wind{{y}}", note: "風が強い" },
        ],
      },
    },
    {
      heading: "天気をたずねて、答える",
      body: "「天気はどう？」は {{How's the weather?}} とたずねます。答えるときは {{It's sunny.}} のように、It's の後ろに天気の言葉を入れます。曜日のときも天気のときも、答えは It's で始まることをおさえましょう。",
      figure: {
        type: "compare",
        title: "曜日と天気のたずね方",
        columns: [{ title: "曜日", tone: "blue" }, { title: "天気", tone: "yellow" }],
        rows: [
          { label: "たずねる", cells: ["What day is it today?", "How's the weather?"] },
          { label: "答える", cells: ["It's Monday.", "It's rainy."] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "Tuesday と Thursday を取りちがえる", right: "Tuesday は火曜日、Thursday は木曜日", why: "どちらも T で始まり、音もにています。曜日の順《じゅん》では火→水→木です。" },
    { wrong: "曜日を monday と小文字で始める", right: "Monday", why: "曜日の言葉は、はじめの文字をいつも大文字で書きます。" },
    { wrong: "How's the weather? に It's Sunday. と答える", right: "It's sunny.", why: "Sunday は日曜日、sunny は晴れです。天気を聞かれたら天気の言葉で答えます。" },
  ],
  check: [
    { q: "「水曜日」を英語《えいご》で言うと？", a: "Wednesday", why: "日・月・火・水の順《じゅん》で、4番目の曜日です。" },
    { q: "What day is it today? に「金曜日」と答えると？", a: "It's Friday.", why: "It's の後ろに曜日を入れます。" },
    { q: "雨の日に How's the weather? と聞かれたら？", a: "It's rainy.", why: "rain（雨）に y がついた rainy を使います。" },
  ],
  next: [
    { label: "カードとドリル「曜日と天気」", href: "/learn/eigo-sho/e-english-34-youbi-tenki" },
    { label: "図解《ずかい》レクチャー「時刻《じこく》と一日の生活」", href: "/learn/lecture/e-english-34-jikoku" },
    { label: "理科4年「天気と気温」のレクチャー", href: "/learn/lecture/e-science-4-tenki" },
  ],
};
