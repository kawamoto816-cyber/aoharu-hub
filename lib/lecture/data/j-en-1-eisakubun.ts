import type { Lecture } from "../types";

export const J_EN_1_EISAKUBUN: Lecture = {
  unit: "j-en-1-eisakubun",
  title: "英作文は「主語と動詞」を先に決め、英語の語順で並べる",
  hook: "「毎朝7時に起きます」を英語にしようとして、単語は知っているのに手が止まった経験はありませんか。日本語と英語は{{語順}}も、{{主語の扱い}}もちがいます。決まった手順で組み立てれば、中1で習った文法だけでも多くのことが書けるようになります。",
  sections: [
    {
      heading: "日本語にない主語を、まず決める",
      body: "日本語は「サッカーが好きです」のように主語をよく省きますが、英語の文には{{かならず主語}}が必要です。「だれが」の話なのかを考えて、I・you・Ken などの主語を補いましょう。「〜は」「〜が」がついていても、それが主語とは限りません。「私はサッカーが好き」の主語は I で、soccer は好きな{{相手}}です。",
    },
    {
      heading: "英語の語順は「だれが→どうする」が先",
      body: "日本語は動詞が最後に来ますが、英語は{{主語のすぐあとに動詞}}を置きます。そのあとに「何を」「どこで」「いつ」が続きます。「どこで」と「いつ」の両方があるときは、ふつう{{場所が先、時があと}}です。",
      figure: {
        type: "flow",
        title: "英文の基本の並び",
        dir: "col",
        steps: [
          { label: "だれが", sub: "主語　I", tone: "navy" },
          { label: "どうする", sub: "動詞　play", tone: "yellow" },
          { label: "何を", sub: "tennis" },
          { label: "どこで", sub: "in the park" },
          { label: "いつ", sub: "on Sundays", tone: "blue" },
        ],
        note: "I play tennis in the park on Sundays.（私は日曜日に公園でテニスをします）",
      },
    },
    {
      heading: "動詞を決めるときは2つを見分ける",
      body: "「〜です」「〜にいる」なら{{be動詞}}、「する・好きだ・持っている」など動作や気持ちなら{{一般動詞}}です。1つの文に be動詞と一般動詞を{{いっしょに使わない}}のが基本です。どちらかで、否定文・疑問文の作り方も変わります。",
      figure: {
        type: "tree",
        title: "日本語から動詞の種類を決める",
        root: {
          label: "日本語の述語",
          children: [
            {
              label: "〜です・〜にいる",
              sub: "be動詞",
              tone: "blue",
              children: [{ label: "否定は is not", sub: "疑問は Is 〜?" }],
            },
            {
              label: "〜する・好き など",
              sub: "一般動詞",
              tone: "yellow",
              children: [{ label: "否定は don't", sub: "疑問は Do 〜?" }],
            },
          ],
        },
      },
    },
    {
      heading: "最後に「時」と「主語」で動詞の形を整える",
      body: "並べ終わったら、動詞の形をチェックします。{{主語が3人称単数で現在}}なら s・es、{{今している}}なら be動詞＋ing、{{過去}}なら過去形です。最後に、文の最初が大文字か、ピリオドや「?」があるかも確かめましょう。",
      figure: {
        type: "formula",
        title: "「ケンは昨日、公園でテニスをしました」",
        prose: true,
        steps: [
          { label: "主語", expr: "{{Ken}}", note: "だれが：ケン" },
          { label: "動詞", expr: "Ken {{play}} tennis", note: "どうする・何を" },
          { label: "語句", expr: "Ken play tennis {{in the park yesterday}}", note: "場所→時の順" },
          { label: "形", expr: "Ken {{played}} tennis in the park yesterday{{.}}", note: "昨日なので過去形に" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "I am play tennis.", right: "I play tennis.", why: "「する」は一般動詞。be動詞といっしょには使いません。" },
    { wrong: "Ken like music.", right: "Ken likes music.", why: "主語が3人称単数で現在の文なので、動詞に s をつけます。" },
    { wrong: "I tennis play.", right: "I play tennis.", why: "日本語の順のまま並べています。英語は主語のすぐあとに動詞です。" },
    { wrong: "I very like dogs.", right: "I like dogs very much.", why: "「とても好き」は like 〜 very much。very は動詞の前に置けません。" },
  ],
  check: [
    { q: "「私の母は毎朝コーヒーを飲みます。」を英語に。", a: "My mother drinks coffee every morning.", why: "主語 my mother は3人称単数なので drinks。" },
    { q: "「私たちは今、教室にいます。」を英語に。", a: "We are in the classroom now.", why: "「いる」は be動詞。主語 we なので are。" },
    { q: "in the library と after school、文の最後に置くのはどっち？", a: "after school", why: "場所が先、時があと（I study in the library after school.）。" },
  ],
  next: [
    { label: "4択ドリル「英作文」に挑戦", href: "/learn/eigo-chu/j-en-1-eisakubun" },
    { label: "復習「一般動詞」のレクチャー", href: "/learn/lecture/j-en-1-ippan" },
    { label: "書ける単語をふやす「英単語」", href: "/learn/lecture/j-en-1-tango" },
  ],
};
