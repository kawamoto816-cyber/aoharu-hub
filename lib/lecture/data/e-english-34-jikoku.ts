import type { Lecture } from "../types";

export const E_ENGLISH_34_JIKOKU: Lecture = {
  unit: "e-english-34-jikoku",
  nameRuby: "時刻《じこく》と一日の生活",
  title: "時刻《じこく》は「時→分」の順《じゅん》。「〜時に」は at",
  hook: "朝は何時に起きて、何時に学校へ行きますか。一日の生活は、時刻《じこく》といっしょに話すことが多いです。英語《えいご》で時刻《じこく》と生活の言葉を言えると、自分の一日を友だちに伝《つた》えたり、相手の一日を聞いたりできます。",
  sections: [
    {
      heading: "時刻《じこく》は It's の後ろに「時→分」",
      body: "時刻《じこく》を言うときは {{It's 〜.}} を使います。7時なら It's seven.、7時30分なら {{It's seven thirty.}} のように、{{時の数を先、分の数を後}}に言います。ちょうど7時は It's seven o'clock. とも言えます。数の言い方をそのまま使えます。",
      figure: {
        type: "formula",
        title: "数をならべて時刻《じこく》を言う",
        prose: true,
        steps: [
          { expr: "It's {{seven}}.", note: "7時" },
          { expr: "It's seven {{o'clock}}.", note: "7時ちょうど" },
          { expr: "It's seven {{thirty}}.", note: "7時30分（時→分の順《じゅん》）" },
          { expr: "It's {{two fifteen}}.", note: "2時15分" },
        ],
      },
    },
    {
      heading: "時刻《じこく》をたずねて、答える",
      body: "「今、何時？」は {{What time is it?}} とたずねます。答えは It's の後ろに時刻《じこく》を入れます。相手の答えを聞いたら、Thank you. とお礼を言いましょう。",
      figure: {
        type: "flow",
        dir: "col",
        title: "時刻《じこく》をたずねる会話",
        steps: [
          { label: "What time is it?", sub: "今、何時？", tone: "blue" },
          { label: "It's three thirty.", sub: "3時30分だよ", tone: "yellow" },
          { label: "Thank you.", sub: "ありがとう" },
        ],
        arrows: ["たずねる", "聞いてお礼"],
      },
    },
    {
      heading: "一日の生活を表す言葉",
      body: "起きてからねるまでの{{一日の生活}}にも、決まった言い方があります。{{get up}}（起きる）、{{go to school}}（学校へ行く）、{{go to bed}}（ねる）などです。自分の一日を思い出しながら、時刻《じこく》の順《じゅん》に言ってみましょう。",
      figure: {
        type: "timeline",
        title: "ある子の一日（例《れい》）",
        events: [
          { year: 6, yearLabel: "午前6時", label: "get up（起きる）", key: true },
          { year: 7, yearLabel: "午前7時", label: "eat breakfast（朝ごはんを食べる）" },
          { year: 8, yearLabel: "午前8時", label: "go to school（学校へ行く）" },
          { year: 16, yearLabel: "午後4時", label: "go home（家に帰る）" },
          { year: 17, yearLabel: "午後5時", label: "do my homework（宿題をする）" },
          { year: 20, yearLabel: "午後8時", label: "take a bath（おふろに入る）" },
          { year: 21, yearLabel: "午後9時", label: "go to bed（ねる）", key: true },
        ],
      },
    },
    {
      heading: "「〜時に」は at、午前は a.m.・午後は p.m.",
      body: "「6時に起きる」のように{{何時にするか}}を言うときは、時刻《じこく》の前に {{at}} をつけて I get up at six. と言います。午前と午後を分けたいときは、数の後ろに {{a.m.}}（午前）か {{p.m.}}（午後）をつけます。",
      figure: {
        type: "compare",
        title: "a.m. と p.m.",
        columns: [{ title: "a.m.", tone: "blue" }, { title: "p.m.", tone: "red" }],
        rows: [
          { label: "意味", cells: ["午前", "午後"] },
          { label: "例《れい》", cells: ["7 a.m.＝午前7時", "7 p.m.＝午後7時"] },
          { label: "生活の例《れい》", cells: ["get up at 7 a.m.", "eat dinner at 7 p.m."] },
        ],
        note: "a.m.・p.m. は数の後ろにつける。",
      },
    },
  ],
  mistakes: [
    { wrong: "7時30分を It's thirty seven. と言う", right: "It's seven thirty.", why: "英語《えいご》の時刻《じこく》は、時の数を先、分の数を後に言います。" },
    { wrong: "I get up six.", right: "I get up at six.", why: "「〜時に」と言うときは、時刻《じこく》の前に at をつけます。" },
    { wrong: "午前9時を p.m. 9 と言う", right: "9 a.m.", why: "午前は a.m.、午後は p.m. で、数の後ろにつけます。" },
  ],
  check: [
    { q: "What time is it? に「8時」と答えると？", a: "It's eight.", why: "It's の後ろに時刻《じこく》を入れます。It's eight o'clock. でもよいです。" },
    { q: "「わたしは9時にねます」を英語《えいご》で言うと？", a: "I go to bed at nine.", why: "ねるは go to bed、「9時に」は at nine です。" },
    { q: "It's four fifteen. は何時何分？", a: "4時15分", why: "four が時、fifteen が分です。" },
  ],
  next: [
    { label: "カードとドリル「時刻《じこく》と一日の生活」", href: "/learn/eigo-sho/e-english-34-jikoku" },
    { label: "算数3年「時刻《じこく》と時間」のレクチャー", href: "/learn/lecture/e-math-3-jikoku" },
    { label: "図解《ずかい》レクチャー「曜日と天気」", href: "/learn/lecture/e-english-34-youbi-tenki" },
  ],
};
