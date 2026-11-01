import type { Lecture } from "../types";

export const J_EN_1_BE: Lecture = {
  unit: "j-en-1-be",
  title: "be動詞は主語で決まる。否定は後ろに not、疑問は前に出す",
  hook: "自己紹介の I am Ken. も、場所を伝える My bag is on the desk. も、be動詞の文です。英語の文の土台になる形なので、ここでしくみをつかむと、このあとの一般動詞や進行形もぐっと楽になります。",
  sections: [
    {
      heading: "be動詞は「＝（イコール）」と「いる・ある」",
      body: "be動詞は、主語とあとの語を{{イコールでつなぐ}}はたらきをします。I am a student. は「私＝生徒」、This is my pen. は「これ＝私のペン」です。また、あとに場所を表すことばが来ると「（〜に）{{いる・ある}}」の意味になります。The cat is under the table. は「ねこはテーブルの下にいる」です。",
    },
    {
      heading: "主語で am・are・is が決まる",
      body: "be動詞は、主語によって形が変わります。{{I には am}}、{{you と2人・2つ以上には are}}、{{それ以外の1人・1つには is}} を使います。he, she, it のほか、Ken や my mother、this のような1人・1つの主語も is です。",
      figure: {
        type: "compare",
        title: "主語と be動詞の組み合わせ",
        columns: [{ title: "主語" }, { title: "be動詞", tone: "yellow" }, { title: "例文" }],
        rows: [
          { cells: ["I", "am", "I am a student."] },
          { cells: ["you", "are", "You are kind."] },
          { cells: ["we / they / 2人・2つ以上", "are", "They are my friends."] },
          { cells: ["he / she / it / 1人・1つ", "is", "She is from Kyoto."] },
        ],
      },
    },
    {
      heading: "迷ったら、主語を分けて考える",
      body: "主語が「自分」か「相手」か「それ以外」かで分け、それ以外なら{{数}}を見ます。you は1人に話しかけるときも are です。Ken and I のように and でつながった主語は2人なので are になります。",
      figure: {
        type: "tree",
        title: "主語から be動詞を選ぶ",
        root: {
          label: "主語",
          children: [
            { label: "自分 1人", sub: "I", children: [{ label: "am", tone: "yellow" }] },
            { label: "相手", sub: "you（1人でも複数でも）", children: [{ label: "are", tone: "blue" }] },
            {
              label: "それ以外",
              children: [
                { label: "1人・1つ", sub: "he / she / it / Ken / this", children: [{ label: "is", tone: "red" }] },
                { label: "2人・2つ以上", sub: "we / they / Ken and I", children: [{ label: "are", tone: "blue" }] },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "肯定文 → 否定文 → 疑問文",
      body: "否定文は be動詞の{{すぐ後ろに not}} を置きます。疑問文は be動詞を{{主語の前に出し}}、文の終わりを「?」にします。答えるときも be動詞を使い、主語は he・she・it・they などの代名詞にかえます。",
      figure: {
        type: "formula",
        title: "She is a teacher. を書きかえる",
        prose: true,
        steps: [
          { expr: "She {{is}} a teacher.", note: "肯定文" },
          { expr: "She is {{not}} a teacher.", note: "否定文：is のあとに not（isn't でもよい）" },
          { expr: "{{Is}} she a teacher{{?}}", note: "疑問文：is を主語の前へ" },
          { expr: "— Yes, she {{is}}. / No, she {{isn't}}.", note: "答えも be動詞で" },
        ],
        note: "短縮形：I'm / you're / he's / isn't / aren't。am not はふつう短縮しない。",
      },
    },
  ],
  mistakes: [
    { wrong: "You is my friend.", right: "You are my friend.", why: "you は1人に話しかけるときでも are を使います。" },
    { wrong: "Ken and I am classmates.", right: "Ken and I are classmates.", why: "主語は Ken and I の2人なので are。I の近くにあっても am にはなりません。" },
    { wrong: "Is she a teacher? — Yes, she does.", right: "Yes, she is.", why: "be動詞でたずねられたら be動詞で答えます。do / does は一般動詞の文で使います。" },
    { wrong: "She not is a teacher.", right: "She is not a teacher.", why: "not は be動詞の後ろに置きます。" },
  ],
  check: [
    { q: "My sisters ___ in the park. の ___ に入る be動詞は？", a: "are", why: "my sisters は2人以上（複数）なので are。" },
    { q: "This is my bag. を否定文にしましょう。", a: "This is not (isn't) my bag.", why: "is のすぐ後ろに not を置く。" },
    { q: "You are hungry. を疑問文にし、Yes で答えましょう。", a: "Are you hungry? — Yes, I am.", why: "are を主語の前へ。you でたずねられたら I で答えるので am。" },
  ],
  next: [
    { label: "4択ドリル「be動詞」に挑戦", href: "/learn/eibunpo-chu/j-en-1-be" },
    { label: "つぎの単元「一般動詞」", href: "/learn/eibunpo-chu/j-en-1-ippan" },
  ],
};
