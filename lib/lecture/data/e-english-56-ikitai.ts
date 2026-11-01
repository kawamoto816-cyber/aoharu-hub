import type { Lecture } from "../types";

export const E_ENGLISH_56_IKITAI: Lecture = {
  unit: "e-english-56-ikitai",
  title: "I want to go to ＋場所. のあとに「そこでしたいこと」を足す",
  hook: "「夏休みに北海道へ行きたい」「いつかエジプトでピラミッドを見たい」。行きたい場所と、そこでしたいことを伝えると、話がぐっとふくらみます。英語では I want to go to 〜. の形に、理由を1文足すだけで伝えられます。",
  sections: [
    {
      heading: "I want to go to 〜. を組み立てる",
      body: "「行く」は go、「〜へ」は {{to ＋場所}} です。そこに「〜したい」の {{want to}} を前からつけると、I want to go to Italy.「イタリアへ行きたい」になります。この文には to が2回出てきます。{{want to は「〜したい」}}、{{go to は「〜へ行く」}}のはたらきです。",
      figure: {
        type: "formula",
        title: "「行く」から「行きたい」へ",
        prose: true,
        steps: [
          { expr: "I go.", note: "わたしは行く" },
          { expr: "I go {{to Italy}}.", note: "行き先は to ＋場所" },
          { expr: "I {{want to}} go to Italy.", note: "want to で「〜したい」" },
          { expr: "{{Where}} do you want to go?", note: "たずねる文：「どこへ」は Where" },
        ],
      },
    },
    {
      heading: "国の名前と、そこでできること",
      body: "国の名前は {{Japan}}・{{France}} のように{{大文字で始めます}}。その国でできることは、You can see 〜.（〜が見られる）や You can eat 〜.（〜が食べられる）で言えます。見るなら {{see}}、食べるなら {{eat}} のように、したいことに合う動作の言葉をえらびます。",
      figure: {
        type: "compare",
        title: "国としたいこと（例）",
        columns: [{ title: "国", tone: "blue" }, { title: "有名なもの", tone: "plain" }, { title: "したいこと", tone: "yellow" }],
        rows: [
          { cells: ["Italy", "ピザ", "eat pizza"] },
          { cells: ["Egypt", "ピラミッド", "see the pyramids"] },
          { cells: ["Australia", "コアラ", "see koalas"] },
          { cells: ["Canada", "雪山", "ski"] },
        ],
      },
    },
    {
      heading: "理由をつけ足して話をふくらませる",
      body: "Where do you want to go? と聞かれたら、まず {{行きたい場所}}を言い、つぎに {{I want to 〜.}} で{{そこでしたいこと}}を足します。最後に It's exciting. などの気持ちをそえると、聞く人に伝わりやすくなります。国だけでなく、京都や沖縄、動物園などの場所も同じ形で言えます。",
      figure: {
        type: "flow",
        dir: "row",
        title: "3文で伝える（例）",
        steps: [
          { label: "行きたい所", sub: "go to Kenya", tone: "blue" },
          { label: "したいこと", sub: "see lions", tone: "yellow" },
          { label: "気持ち", sub: "It's exciting!", tone: "red" },
        ],
        arrows: ["なぜ？", "ひとこと"],
        note: "I want to go to Kenya. I want to see lions. It's exciting!",
      },
    },
    {
      heading: "the がいる場所、いらない場所",
      body: "国や町の名前には the をつけず、go to Kyoto のように言います。動物園や公園のようなふつうの場所の言葉には {{the}} をつけて、{{go to the zoo}}・go to the park と言います。どこへ行きたいかを、まわりの人とたずね合ってみましょう。",
    },
  ],
  mistakes: [
    { wrong: "I want go to France.", right: "I want to go to France.", why: "「〜したい」は want to ＋動作の言葉。to をわすれやすいです。" },
    { wrong: "I want to go Italy.", right: "I want to go to Italy.", why: "行き先の前には to（〜へ）が必要です。" },
    { wrong: "I want to go to china.", right: "I want to go to China.", why: "国の名前は大文字で始めます。" },
  ],
  check: [
    { q: "「カナダへ行きたい」を英語で言いましょう。", a: "I want to go to Canada.", why: "want to go to ＋場所。" },
    { q: "相手の行きたい場所をたずねる文は？", a: "Where do you want to go?", why: "「どこへ」は Where。" },
    { q: "I want to go to Italy. I want to ___ pizza. の ___ は？", a: "eat", why: "ピザは食べるものなので eat。" },
  ],
  next: [
    { label: "ポイントと練習問題「行きたい国・場所」", href: "/learn/eigo-sho/e-english-56-ikitai" },
    { label: "「将来《しょうらい》の夢（I want to be 〜.）」", href: "/learn/eigo-sho/e-english-56-yume" },
    { label: "中2「不定詞《ふていし》」", href: "/learn/eibunpo-chu/j-en-2-futeishi" },
  ],
};
