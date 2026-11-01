import type { Lecture } from "../types";

export const J_EN_1_KAKOKEI: Lecture = {
  unit: "j-en-1-kakokei",
  title: "過去形は動詞の形で「時」を示す。否定・疑問は did、be動詞は was / were",
  hook: "「きのうサッカーをした」「去年は京都にいた」。日本語は「〜した」と語尾で過去を表しますが、英語は動詞そのものの形を変えます。日記や思い出話、テストの長文の多くは過去の話なので、過去形を正しく作れることがとても大切です。",
  sections: [
    {
      heading: "一般動詞の過去形：-ed をつける動詞と、形が変わる動詞",
      body: "多くの動詞は終わりに{{-ed}}をつけて過去形にします（play → played）。e で終わる語は -d だけ、「子音字＋y」は y を i にかえて -ed（study → studied）です。一方、go → went、see → saw のように{{形がまったく変わる不規則動詞}}もあり、これは1つずつ覚えます。過去形は主語に関係なく{{同じ形}}で、三単現の -s のような区別はありません。",
      figure: {
        type: "tree",
        title: "一般動詞の過去形の作り方",
        root: {
          label: "一般動詞",
          children: [
            {
              label: "規則動詞",
              sub: "-ed をつける",
              tone: "blue",
              children: [
                { label: "played", sub: "ふつうは -ed" },
                { label: "liked", sub: "e で終わる → -d" },
                { label: "studied", sub: "子音字＋y → ied" },
                { label: "stopped", sub: "短母音＋子音字 → 重ねる" },
              ],
            },
            {
              label: "不規則動詞",
              sub: "形が変わる",
              tone: "red",
              children: [
                { label: "go → went" },
                { label: "have → had" },
                { label: "come → came" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "否定文・疑問文は did ＋ 原形",
      body: "一般動詞の過去の否定文は動詞の前に{{did not（didn't）}}、疑問文は文の頭に{{Did}}を置きます。主語が何でも did です。過去であることは did が示すので、あとの動詞は{{原形}}にもどします。played も went も、did のあとでは play・go です。",
      figure: {
        type: "formula",
        title: "She went to the library. を書きかえる",
        prose: true,
        steps: [
          { expr: "She {{went}} to the library.", note: "肯定文：go の過去形 went" },
          { expr: "She {{didn't go}} to the library.", note: "否定文：didn't＋原形" },
          { expr: "{{Did}} she {{go}} to the library?", note: "疑問文：Did を文の頭へ" },
          { expr: "— Yes, she {{did}}. / No, she {{didn't}}.", note: "答えも did で" },
        ],
        note: "現在の do / does が、過去では主語に関係なく did になる。",
      },
    },
    {
      heading: "be動詞の過去形は was と were の2つ",
      body: "be動詞の過去形は、am・is が{{was}}、are が{{were}}になります。否定文・疑問文は現在と同じく、be動詞のあとに not、be動詞を主語の前へ出して作ります。be動詞の文では did は使いません。",
      figure: {
        type: "compare",
        title: "現在と過去の be動詞",
        columns: [{ title: "主語" }, { title: "現在" }, { title: "過去", tone: "yellow" }],
        rows: [
          { cells: ["I", "am", "was"] },
          { cells: ["he / she / it / 1人・1つ", "is", "was"] },
          { cells: ["you / we / they / 複数", "are", "were"] },
        ],
        note: "例：I was busy yesterday. / Were you at home? — Yes, I was.",
      },
    },
    {
      heading: "過去を示すことばといっしょに使う",
      body: "過去形の文には、{{yesterday}}（きのう）、{{last 〜}}（この前の〜）、{{〜 ago}}（〜前に）などのことばがよくいっしょに出てきます。文の中にこうしたことばを見つけたら、動詞を過去形にする合図です。last week、two days ago、then（そのとき）なども覚えておきましょう。",
    },
  ],
  mistakes: [
    { wrong: "Did you went to the park?", right: "Did you go to the park?", why: "did を使ったら、あとの動詞は原形にもどします。" },
    { wrong: "I didn't busy yesterday.", right: "I wasn't busy yesterday.", why: "busy は形容詞で、この文の動詞は be動詞。be動詞の否定は was not（wasn't）です。" },
    { wrong: "We was happy.", right: "We were happy.", why: "are の過去形は were。we・you・they・複数の主語には were を使います。" },
    { wrong: "He goed to school.", right: "He went to school.", why: "go は不規則動詞で、過去形は went です。" },
  ],
  check: [
    { q: "I (study) math last night. の（ ）を正しい形に。", a: "studied", why: "last night があるので過去形。子音字＋y は y を i にかえて -ed。" },
    { q: "Ken watched TV. を疑問文にしましょう。", a: "Did Ken watch TV?", why: "Did を文の頭へ出し、watched は原形 watch にもどす。" },
    { q: "They ___ in Osaka two years ago. の ___ に入る be動詞は？", a: "were", why: "two years ago で過去。主語 they は複数なので were。" },
  ],
  next: [
    { label: "4択ドリル「過去形」に挑戦", href: "/learn/eibunpo-chu/j-en-1-kakokei" },
    { label: "前の単元「一般動詞」のレクチャー", href: "/learn/lecture/j-en-1-ippan" },
    { label: "つぎに「過去進行形」", href: "/learn/eibunpo-chu/j-en-2-kako-shinko" },
  ],
};
