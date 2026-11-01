import type { Lecture } from "../types";

export const J_EN_2_KAKO_SHINKO: Lecture = {
  unit: "j-en-2-kako-shinko",
  title: "過去進行形は was / were ＋ -ing。「そのとき〜しているところだった」",
  hook: "「きのうの7時、何してた？」「お風呂に入ってたよ」。このように、過去のある時点で動作のとちゅうだったことを伝えるのが過去進行形です。物語や日記では「〜していると、…が起きた」という場面がよく出てくるので、過去形との使い分けが読み取りの力になります。",
  sections: [
    {
      heading: "形は was / were ＋ 動詞の -ing 形",
      body: "過去進行形は{{was / were ＋ 動詞の -ing 形}}で、「（そのとき）〜していた」という意味です。現在進行形の am・is を{{was}}に、are を{{were}}にかえるだけで作れます。-ing のつけ方も現在進行形と同じで、make → making、run → running のように形が変わる語に注意します。",
      figure: {
        type: "formula",
        title: "現在進行形から過去進行形へ",
        prose: true,
        steps: [
          { expr: "I {{am}} reading a book.", note: "現在進行形：今〜している" },
          { expr: "I {{was}} reading a book.", note: "am → was" },
          { expr: "They {{were}} playing soccer.", note: "are → were" },
          { expr: "Ken {{was}} {{running}} in the park.", note: "is → was／run → running" },
        ],
      },
    },
    {
      heading: "過去形は「した」、過去進行形は「している最中だった」",
      body: "過去形は、動作を{{ひとまとまりの出来事}}として「〜した」と伝えます。過去進行形は、過去の{{ある時点}}で動作が{{とちゅう}}だったことを伝えます。そのため、at seven last night や then（そのとき）など、時点を示すことばとよくいっしょに使います。",
      figure: {
        type: "compare",
        title: "過去形と過去進行形のちがい",
        columns: [{ title: "過去形" }, { title: "過去進行形", tone: "yellow" }],
        rows: [
          { label: "形", cells: ["played / went", "was / were ＋ -ing"] },
          { label: "意味", cells: ["〜した", "〜しているところだった"] },
          { label: "見え方", cells: ["出来事をまるごと", "とちゅうの一場面"] },
          { label: "例", cells: ["I studied.", "I was studying then."] },
        ],
      },
    },
    {
      heading: "when と組み合わせて「〜していると、…した」",
      body: "When you called me, I was taking a bath. は「あなたが電話をくれたとき、私はお風呂に入っていた」です。{{長く続いていた動作}}は過去進行形、そのとちゅうで{{起きた短い出来事}}は過去形で表します。図のように、お風呂という長い帯の中に電話という一瞬がはさまっているイメージです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "長い動作の中に、短い出来事が起きる",
        max: 10,
        bars: [
          {
            label: "お風呂に入っていた（過去進行形）",
            parts: [
              { value: 2, tone: "plain" },
              { value: 6, label: "was taking a bath", tone: "blue" },
              { value: 2, tone: "plain" },
            ],
          },
          {
            label: "電話が鳴った（過去形）",
            parts: [
              { value: 5, tone: "plain" },
              { value: 1, label: "電話", tone: "red" },
            ],
          },
        ],
        scale: [
          { at: 2, label: "6:40" },
          { at: 5, label: "7:00" },
          { at: 8, label: "7:20" },
        ],
        scaleLabel: "時刻",
        note: "When you called me（過去形）, I was taking a bath（過去進行形）.",
      },
    },
    {
      heading: "否定文と疑問文は be動詞の文と同じ作り方",
      body: "否定文は was / were の{{すぐ後ろに not}}を置きます。疑問文は was / were を{{主語の前に出し}}、答えも was / were で答えます。「何をしていたの？」は What were you doing? とたずね、I was 〜ing. で答えます。",
      figure: {
        type: "formula",
        title: "She was watching TV. を書きかえる",
        prose: true,
        steps: [
          { expr: "She {{was}} watching TV.", note: "肯定文" },
          { expr: "She {{was not}} watching TV.", note: "否定文：wasn't でもよい" },
          { expr: "{{Was}} she watching TV{{?}}", note: "疑問文：was を主語の前へ" },
          { expr: "— Yes, she {{was}}. / No, she {{wasn't}}.", note: "答えも was で" },
        ],
        note: "know・like・have（持っている）など「状態」を表す動詞は、ふつう進行形にしない。",
      },
    },
  ],
  mistakes: [
    { wrong: "I was play tennis at that time.", right: "I was playing tennis at that time.", why: "was のあとの動詞は -ing 形にします。was ＋ 原形という形はありません。" },
    { wrong: "We was cooking dinner.", right: "We were cooking dinner.", why: "主語が we・you・they や複数のときは were を使います。" },
    { wrong: "Did you studying then?", right: "Were you studying then?", why: "進行形の疑問文は be動詞（was / were）を前に出します。did は使いません。" },
    { wrong: "When I got home, my sister cooked dinner.", right: "When I got home, my sister was cooking dinner.", why: "「帰ったとき料理中だった」と言うなら過去進行形。過去形だと「帰ってから料理を始めた」に近い意味になります。" },
  ],
  check: [
    { q: "They ___ swimming in the river. の ___ に入る語は？", a: "were", why: "主語 they は複数なので were。" },
    { q: "He was running. を疑問文にして、No で答えましょう。", a: "Was he running? — No, he wasn't.", why: "was を主語の前に出し、答えも was で。" },
    { q: "「あなたはそのとき何をしていましたか」を英語に。", a: "What were you doing then?", why: "What のあとに疑問文の語順 were you doing を続ける。" },
  ],
  next: [
    { label: "4択ドリル「過去進行形」に挑戦", href: "/learn/eibunpo-chu/j-en-2-kako-shinko" },
    { label: "もとになる形「現在進行形」", href: "/learn/eibunpo-chu/j-en-1-shinkokei" },
    { label: "つぎに「未来の表現（will・be going to）」", href: "/learn/eibunpo-chu/j-en-2-mirai" },
  ],
};
