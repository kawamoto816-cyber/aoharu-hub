import type { Lecture } from "../types";

export const J_EN_1_IPPAN: Lecture = {
  unit: "j-en-1-ippan",
  title: "一般動詞は動作を表す。主語が3人称単数なら -s、否定と疑問は do / does",
  hook: "I play soccer. や She likes music. のように、「する・好きだ」など動作や気持ちを表す動詞を一般動詞といいます。英語の文のほとんどは一般動詞の文なので、ここで「-s がつくとき」と「do / does の使い方」をつかむことが、この先の文法すべての土台になります。",
  sections: [
    {
      heading: "be動詞の文と一般動詞の文",
      body: "英語の文の動詞は、{{be動詞}}か{{一般動詞}}のどちらかです。be動詞は「＝・いる」、一般動詞は play・like・have など「する・思う・持つ」といった動作や状態を表します。1つの文に動詞は基本1つなので、{{I am play}} のように be動詞と一般動詞を並べることはできません。",
      figure: {
        type: "compare",
        title: "be動詞の文と一般動詞の文",
        columns: [{ title: "be動詞の文", tone: "blue" }, { title: "一般動詞の文", tone: "yellow" }],
        rows: [
          { label: "肯定", cells: ["I am a student.", "I play tennis."] },
          { label: "否定", cells: ["I am not ～.", "I do not play ～."] },
          { label: "疑問", cells: ["Are you ～?", "Do you play ～?"] },
          { label: "答え", cells: ["Yes, I am.", "Yes, I do."] },
        ],
      },
    },
    {
      heading: "主語が「3人称単数」なら動詞に -s",
      body: "主語が I・you 以外の{{1人・1つ}}（he・she・it・Ken・my dog など）を{{3人称単数}}といいます。現在の文で主語が3人称単数のとき、一般動詞の終わりに {{-s か -es}} をつけます。これを「三単現の s」といいます。they や Ken and Mari は複数なので -s はつけません。",
      figure: {
        type: "tree",
        title: "動詞に -s をつけるか決める",
        root: {
          label: "主語",
          children: [
            { label: "I / you", sub: "1人称・2人称", children: [{ label: "play", tone: "blue" }] },
            {
              label: "それ以外",
              children: [
                { label: "1人・1つ", sub: "he / she / it / Ken", children: [{ label: "plays", tone: "yellow" }] },
                { label: "2人・2つ以上", sub: "we / they / Ken and I", children: [{ label: "play", tone: "blue" }] },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "-s のつけ方には3つのきまりがある",
      body: "ふつうは{{そのまま -s}}（play → plays）です。s・x・sh・ch・o で終わる語は{{-es}}（watch → watches、go → goes）。「子音字＋y」で終わる語は{{y を i にかえて -es}}（study → studies）です。have だけは形が変わって{{has}} になります。",
      figure: {
        type: "compare",
        title: "三単現の -s のつけ方",
        columns: [{ title: "語の終わり" }, { title: "つけ方", tone: "yellow" }, { title: "例" }],
        rows: [
          { cells: ["ふつうの語", "-s", "like → likes"] },
          { cells: ["s・x・sh・ch・o", "-es", "watch → watches"] },
          { cells: ["子音字＋y", "y→i＋es", "study → studies"] },
          { cells: ["母音字＋y", "-s", "play → plays"] },
          { cells: ["have", "形が変わる", "have → has"] },
        ],
      },
    },
    {
      heading: "否定文・疑問文は do / does を使う",
      body: "一般動詞の否定文は動詞の前に{{do not（don't）}}、疑問文は文の頭に{{Do}} を置きます。主語が3人称単数なら do のかわりに {{does}} を使います。このとき -s は does が引き受けるので、あとの動詞は{{もとの形（原形）}}にもどします。",
      figure: {
        type: "formula",
        title: "Ken plays tennis. を書きかえる",
        prose: true,
        steps: [
          { expr: "Ken {{plays}} tennis.", note: "肯定文：3人称単数なので -s" },
          { expr: "Ken {{does not play}} tennis.", note: "否定文：does not＋原形（doesn't）" },
          { expr: "{{Does}} Ken {{play}} tennis?", note: "疑問文：Does を文の頭へ、動詞は原形" },
          { expr: "— Yes, he {{does}}. / No, he {{doesn't}}.", note: "答えも does で" },
        ],
        note: "-s は1つの文に1回だけ。does を使ったら動詞の -s は消える。",
      },
    },
  ],
  mistakes: [
    { wrong: "She doesn't likes cats.", right: "She doesn't like cats.", why: "does を使ったら、あとの動詞は原形にもどします。-s は does が引き受けています。" },
    { wrong: "I am play the piano.", right: "I play the piano.", why: "be動詞と一般動詞は並べません。一般動詞の文に am は入りません。" },
    { wrong: "Ken and Mari plays soccer.", right: "Ken and Mari play soccer.", why: "主語は2人（複数）なので -s はつけません。" },
    { wrong: "My brother studys English.", right: "My brother studies English.", why: "「子音字＋y」で終わる語は y を i にかえて -es をつけます。" },
  ],
  check: [
    { q: "My mother (have) a car. の（ ）を正しい形に。", a: "has", why: "主語は3人称単数。have は has になる。" },
    { q: "Tom watches TV. を否定文にしましょう。", a: "Tom doesn't (does not) watch TV.", why: "does not＋原形。watches は watch にもどす。" },
    { q: "Does your sister play the guitar? に No で答えましょう。", a: "No, she doesn't.", why: "does でたずねられたら does で答える。your sister は she にかえる。" },
  ],
  next: [
    { label: "4択ドリル「一般動詞」に挑戦", href: "/learn/eibunpo-chu/j-en-1-ippan" },
    { label: "前の単元「be動詞」のレクチャー", href: "/learn/lecture/j-en-1-be" },
    { label: "つぎに「過去形」", href: "/learn/eibunpo-chu/j-en-1-kakokei" },
  ],
};
