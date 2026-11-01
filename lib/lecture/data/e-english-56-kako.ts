import type { Lecture } from "../types";

export const E_ENGLISH_56_KAKO: Lecture = {
  unit: "e-english-56-kako",
  title: "したことは過去の形で。go は went、enjoy は enjoyed、感想は It was 〜.",
  hook: "夏休みが終わると、「どこに行った？」「何をした？」と話したくなりますね。英語では、もうすんだことを話すとき、動作の言葉の形を変えます。この形が使えると、休みの思い出や週末のできごとを伝えられます。",
  sections: [
    {
      heading: "したことは「いつ→したこと→感想」",
      body: "すんだことを話すときは、{{過去の形}}を使います。いつのことかは {{last weekend}}（先週末）、{{yesterday}}（きのう）、{{last summer}}（去年の夏）などで言います。最後に It was 〜. で感想をつけると、聞く人に気持ちが伝わります。",
      figure: {
        type: "flow",
        title: "したことを伝える3つの文",
        steps: [
          { label: "① いつ", sub: "Last weekend,", tone: "plain" },
          { label: "② したこと", sub: "I saw pandas.", tone: "blue" },
          { label: "③ 感想", sub: "It was fun.", tone: "yellow" },
        ],
        note: "saw は see（見る）の過去の形、was は is の過去の形です。",
      },
    },
    {
      heading: "ed がつく言葉と、形が変わる言葉",
      body: "過去の形には2つの作り方があります。enjoy → enjoyed のように{{後ろに ed をつける言葉}}と、go → went のように{{形がまるごと変わる言葉}}です。形が変わる言葉は、1つずつ覚えるしかありません。goed や seed とは言わないので注意しましょう。",
      figure: {
        type: "compare",
        title: "ふだんの形と過去の形",
        columns: [{ title: "ふだんの形" }, { title: "過去の形", tone: "yellow" }],
        rows: [
          { label: "行く", cells: ["go", "went"] },
          { label: "食べる", cells: ["eat", "ate"] },
          { label: "見る", cells: ["see", "saw"] },
          { label: "泳ぐ", cells: ["swim", "swam"] },
          { label: "楽しむ", cells: ["enjoy", "enjoyed（ed）"] },
          { label: "訪《たず》ねる", cells: ["visit", "visited（ed）"] },
        ],
      },
    },
    {
      heading: "感想は It was 〜. で、たずね方は How was 〜?",
      body: "感想の It was 〜. の was は、is の過去の形です。fun（楽しい）、exciting（わくわくする）、delicious（おいしい）、beautiful（美しい）などを後ろに置きます。相手にたずねるときは {{How was 〜?}}（〜はどうだった？）と聞きます。",
      figure: {
        type: "formula",
        title: "夏休みの会話",
        prose: true,
        steps: [
          { expr: "How {{was}} your summer vacation?", note: "感想をたずねる" },
          { expr: "It {{was}} great.", note: "is → was" },
          { expr: "I {{went}} to the sea.", note: "go → went" },
          { expr: "I {{enjoyed}} swimming.", note: "enjoy → enjoyed" },
        ],
        note: "「どこに行ったの？」は Where did you go? とたずねます。",
      },
    },
  ],
  mistakes: [
    { wrong: "I goed to the park yesterday.", right: "I went to the park yesterday.", why: "go は ed をつけず、went に形が変わります。" },
    { wrong: "（きのうの話で）It is fun.", right: "It was fun.", why: "すんだことの感想なので、is ではなく was を使います。" },
    { wrong: "I enjoy fishing last Sunday.", right: "I enjoyed fishing last Sunday.", why: "last Sunday（この前の日曜日）のことなので、enjoy に ed をつけます。" },
  ],
  check: [
    { q: "see の過去の形は？", a: "saw", why: "see は形が変わる言葉。seed とは言わない。" },
    { q: "I ___ to Hokkaido last winter. の ___ に入るのは？", a: "went", why: "last winter（去年の冬）のことなので go の過去の形。" },
    { q: "How was the festival? に「楽しかった」と答えると？", a: "It was fun.", why: "すんだことの感想は It was 〜. で言う。" },
  ],
  next: [
    { label: "「したことを伝える」のドリル", href: "/learn/eigo-sho/e-english-56-kako" },
    { label: "つぎの図解レクチャー「将来《しょうらい》の夢」", href: "/learn/lecture/e-english-56-yume" },
    { label: "中学の図解レクチャー「過去形」", href: "/learn/lecture/j-en-1-kakokei" },
  ],
};
