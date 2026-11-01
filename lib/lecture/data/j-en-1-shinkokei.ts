import type { Lecture } from "../types";

export const J_EN_1_SHINKOKEI: Lecture = {
  unit: "j-en-1-shinkokei",
  title: "現在進行形は be動詞＋ing。「今まさにしている」動作を表す",
  hook: "電話で「今なにしてるの？」と聞かれて「テレビを見てるよ」と答える。そんな「今この瞬間」の動作を伝えるのが現在進行形です。I watch TV.（ふだん見る）との使い分けがわかると、英語の「時」の感覚がつかめてきます。",
  sections: [
    {
      heading: "形は「be動詞＋動詞の ing 形」",
      body: "現在進行形は{{am / are / is＋動詞の ing 形}}で「（今）〜している」を表します。be動詞は be動詞の文と同じく{{主語で決まり}}ます。be動詞と ing は2つでセットなので、どちらかを落とすと文になりません。",
      figure: {
        type: "formula",
        title: "She reads a book. を進行形にする",
        prose: true,
        steps: [
          { expr: "She {{reads}} a book.", note: "現在形：ふだん読む" },
          { expr: "She {{is reading}} a book.", note: "進行形：今読んでいる" },
          { expr: "She is {{not}} reading a book.", note: "否定文：be動詞のあとに not" },
          { expr: "{{Is}} she reading a book?", note: "疑問文：be動詞を主語の前へ" },
          { expr: "— Yes, she {{is}}. / No, she {{isn't}}.", note: "答えも be動詞で" },
        ],
        note: "否定文・疑問文は be動詞の文とまったく同じ作り方。do / does は使わない。",
      },
    },
    {
      heading: "ing 形の作り方は3パターン",
      body: "ふつうは原形に{{ing}}をつけます。{{e で終わる語}}は e をとって ing（make → making）。{{短い母音＋子音字}}で終わる語は、最後の字を重ねて ing（run → running）です。play → playing のように y はそのまま残ります。",
      figure: {
        type: "tree",
        title: "動詞の ing 形",
        root: {
          label: "動詞の原形",
          children: [
            { label: "そのまま ing", tone: "blue", children: [{ label: "playing" }, { label: "reading" }] },
            { label: "e をとって ing", tone: "yellow", children: [{ label: "making" }, { label: "writing" }] },
            { label: "字を重ねて ing", tone: "red", children: [{ label: "running" }, { label: "swimming" }] },
          ],
        },
      },
    },
    {
      heading: "現在形と現在進行形のちがい",
      body: "現在形は{{ふだん・いつも}}くり返していること、現在進行形は{{今その場で}}している動作です。now や Look! があれば進行形の合図です。every day や usually があれば現在形を使います。",
      figure: {
        type: "compare",
        title: "同じ「見る」でも意味がちがう",
        columns: [{ title: "現在形" }, { title: "現在進行形", tone: "yellow" }],
        rows: [
          { label: "表すこと", cells: ["ふだん・習慣", "今している最中"] },
          { label: "例文", cells: ["I watch TV every day.", "I'm watching TV now."] },
          { label: "合図の語", cells: ["every day / usually", "now / Look! / Listen!"] },
        ],
      },
    },
    {
      heading: "進行形にしない動詞がある",
      body: "like（好きだ）、know（知っている）、want（ほしい）のように{{状態}}を表す動詞は、ふつう進行形にしません。「今好きだ」も I like it. です。ただし have は「持っている」なら進行形にしませんが、「食べる」の意味なら{{I'm having lunch.}}のように進行形にできます。",
    },
  ],
  mistakes: [
    { wrong: "I playing soccer now.", right: "I am playing soccer now.", why: "進行形には be動詞が必要です。ing だけでは文になりません。" },
    { wrong: "He is play the piano.", right: "He is playing the piano.", why: "be動詞のあとの動詞は ing 形にします。" },
    { wrong: "Are you study now? / Do you studying now?", right: "Are you studying now?", why: "疑問文は be動詞を前に出し、動詞は ing 形のまま。do は使いません。" },
    { wrong: "I am knowing her.", right: "I know her.", why: "know は状態を表す動詞なので、ふつう進行形にしません。" },
  ],
  check: [
    { q: "swim の ing 形は？", a: "swimming", why: "短い母音＋子音字で終わるので m を重ねる。" },
    { q: "They eat lunch. を「今〜している」の文に。", a: "They are eating lunch (now).", why: "主語 they なので are、eat を eating に。" },
    { q: "Ken is running in the park. を疑問文にすると？", a: "Is Ken running in the park?", why: "be動詞 is を主語の前に出す。" },
  ],
  next: [
    { label: "4択ドリル「現在進行形」に挑戦", href: "/learn/eibunpo-chu/j-en-1-shinkokei" },
    { label: "復習「一般動詞」のレクチャー", href: "/learn/lecture/j-en-1-ippan" },
    { label: "中2「過去進行形」（was / were＋ing）", href: "/learn/eibunpo-chu/j-en-2-kako-shinko" },
  ],
};
