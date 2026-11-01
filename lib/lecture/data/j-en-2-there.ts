import type { Lecture } from "../types";

export const J_EN_2_THERE: Lecture = {
  unit: "j-en-2-there",
  title: "There is / are は「〜がある・いる」。be動詞は後ろの名詞の数で決まる",
  hook: "「机の上にねこがいる」「この町には図書館が2つある」。何かが「ある・いる」と新しく伝えるとき、英語では There is / There are で文を始めます。道案内や部屋の説明、町の紹介でよく使う、とても便利な形です。",
  sections: [
    {
      heading: "There is ＋ もの ＋ 場所 の順に並べる",
      body: "There is a cat on the desk. は「机の上にねこがいる」です。there は「そこに」と訳さず、{{There is / are ＋ 主語（あるもの）＋ 場所}}の順でひとまとまりと考えます。文の本当の主語は be動詞の{{後ろにある名詞}}です。場所は on the desk・in the box・near the station のように前置詞で表します。",
      figure: {
        type: "flow",
        title: "There 構文の語順",
        dir: "row",
        steps: [
          { label: "There is", sub: "〜がある・いる", tone: "navy" },
          { label: "a cat", sub: "あるもの（主語）", tone: "yellow" },
          { label: "on the desk", sub: "場所", tone: "blue" },
        ],
      },
    },
    {
      heading: "is か are かは、後ろの名詞で決まる",
      body: "後ろの名詞が{{1つ（単数）}}や water のような{{数えられない名詞}}なら is、{{2つ以上（複数）}}なら are です。過去の文では is が {{was}}、are が {{were}} になります。There の形は変わらないので、必ず後ろの名詞を見て選びます。",
      figure: {
        type: "compare",
        title: "時と数で be動詞を選ぶ",
        columns: [{ title: "1つ・数えられない", tone: "blue" }, { title: "2つ以上", tone: "yellow" }],
        rows: [
          { label: "現在", cells: ["There is a park.", "There are two parks."] },
          { label: "過去", cells: ["There was a park.", "There were two parks."] },
        ],
        note: "some のあとでも、名詞が複数なら are（There are some apples.）、数えられない名詞なら is（There is some milk.）。",
      },
    },
    {
      heading: "否定文・疑問文と How many 〜 are there?",
      body: "否定文は be動詞のあとに {{not}}、疑問文は be動詞を {{there の前}}に出します。答えるときも {{there}} を使って Yes, there is. のように答えます。数をたずねるときは {{How many ＋ 複数名詞 ＋ are there 〜?}} の形にします。",
      figure: {
        type: "formula",
        title: "There is a dog in the park. を書きかえる",
        prose: true,
        steps: [
          { expr: "There {{is}} a dog in the park.", note: "肯定文" },
          { expr: "There {{isn't}} a dog in the park.", note: "否定文：is not" },
          { expr: "{{Is there}} a dog in the park?", note: "疑問文：is を there の前へ" },
          { expr: "— Yes, {{there is}}. / No, {{there isn't}}.", note: "答えも there で" },
          { expr: "{{How many}} dogs {{are there}} in the park?", note: "数をたずねる" },
        ],
        note: "「1つもない」は There are no 〜. や There aren't any 〜. でも表せる。",
      },
    },
    {
      heading: "the や my がつく「特定のもの」には使わない",
      body: "There is / are は、相手がまだ知らない{{新しいもの}}の存在を伝える形です。そのため、my bag や the book のように{{どれのことか決まっているもの}}には、ふつう使いません。「私のかばんは机の上にある」は My bag is on the desk. と、ふつうの be動詞の文で言います。",
    },
  ],
  mistakes: [
    { wrong: "There is three books on the desk.", right: "There are three books on the desk.", why: "後ろの名詞 three books が複数なので are です。" },
    { wrong: "There is my pen on the table.", right: "My pen is on the table.", why: "my のついた特定のものは、There 構文ではなく「主語 ＋ be動詞 ＋ 場所」で表します。" },
    { wrong: "Are there a library near here? — Yes, it is.", right: "Is there a library near here? — Yes, there is.", why: "a library は単数なので is。答えも there を使います。" },
    { wrong: "How many student are there in your class?", right: "How many students are there in your class?", why: "How many のあとの名詞は複数形にします。" },
  ],
  check: [
    { q: "There ___ some water in the glass. の ___ に入る語は？", a: "is", why: "water は数えられない名詞なので is。" },
    { q: "There were many people in the park. を疑問文にしましょう。", a: "Were there many people in the park?", why: "were を there の前に出す。" },
    { q: "「あなたの町には公園がいくつありますか」を英語に。", a: "How many parks are there in your town?", why: "How many ＋ 複数名詞 ＋ are there 〜?" },
  ],
  next: [
    { label: "4択ドリル「There is / There are」に挑戦", href: "/learn/eibunpo-chu/j-en-2-there" },
    { label: "be動詞のしくみをふり返る", href: "/learn/eibunpo-chu/j-en-1-be" },
    { label: "つぎに「不定詞」", href: "/learn/eibunpo-chu/j-en-2-futeishi" },
  ],
};
