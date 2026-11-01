import type { Lecture } from "../types";

export const E_ENGLISH_56_CAN: Lecture = {
  unit: "e-english-56-can",
  title: "can は「できる」を足す言葉。後ろの動作の言葉は形をかえない",
  hook: "「ぼくは一輪車に乗れるよ」「わたしは歌が得意」など、自分のできることを伝えると、友だちに自分のことを知ってもらえます。英語では、動作の言葉の前に can を1つおくだけで「〜できる」の文になります。中学校でもそのまま使う大切な形です。",
  sections: [
    {
      heading: "can を動作の言葉の前におく",
      body: "I swim.（わたしは泳ぐ）の swim の前に {{can}} をおくと、I can swim.「わたしは泳げる」になります。できないときは {{can't}}（cannot）を使います。たずねるときは {{can を文の始めに出して}} Can you swim? と聞き、Yes, I can. か No, I can't. で答えます。",
      figure: {
        type: "formula",
        title: "I swim. から4つの文へ",
        prose: true,
        steps: [
          { expr: "I swim.", note: "わたしは泳ぐ" },
          { expr: "I {{can}} swim.", note: "泳げる：swim の前に can" },
          { expr: "I {{can't}} swim.", note: "泳げない：can't（cannot）" },
          { expr: "{{Can}} you swim? — Yes, I {{can}}. / No, I {{can't}}.", note: "たずねる：Can を前へ" },
        ],
      },
    },
    {
      heading: "だれが主語でも、can も動作の言葉もそのまま",
      body: "he や she のときも、{{can の形はかわりません}}。また、can の後ろの動作の言葉にも s をつけず、{{もとの形}}のまま使います。She can play the piano. が正しく、She can plays 〜 とは言いません。人や動物、だれのことでも同じ形なので、覚えやすいですね。",
      figure: {
        type: "compare",
        title: "主語がかわっても同じ形",
        columns: [{ title: "だれが" }, { title: "できる", tone: "blue" }, { title: "できない", tone: "red" }],
        rows: [
          { cells: ["I", "I can skate.", "I can't skate."] },
          { cells: ["you", "You can cook.", "You can't cook."] },
          { cells: ["he / she", "She can sing.", "He can't sing."] },
          { cells: ["動物", "Birds can fly.", "Fish can't fly."] },
        ],
      },
    },
    {
      heading: "play のあとに the をつける？つけない？",
      body: "「〜をする・ひく」の {{play}} は、後ろの言葉で the がいるかどうかが決まります。ピアノやギターなどの{{楽器には the をつけ}}、サッカーやテニスなどの{{スポーツには the をつけません}}。自転車に乗るは ride a bike、けん玉をするは do kendama のように、play 以外の言葉を使うものもあります。",
      figure: {
        type: "tree",
        title: "play の後ろ",
        root: {
          label: "play ＋ ？",
          children: [
            {
              label: "楽器",
              sub: "the をつける",
              tone: "yellow",
              children: [{ label: "the piano" }, { label: "the recorder" }],
            },
            {
              label: "スポーツ",
              sub: "the をつけない",
              tone: "blue",
              children: [{ label: "soccer" }, { label: "basketball" }],
            },
          ],
        },
      },
    },
    {
      heading: "何ができるかをたずねる",
      body: "相手のできることを広く聞くときは {{What can you do?}} と聞きます。答えは I can cook curry. のように {{I can ＋動作.}} です。He や She のことなら What can he do? と聞きます。答えを聞いたら That's great! と返すと、会話が楽しく続きます。",
    },
  ],
  mistakes: [
    { wrong: "She can plays tennis.", right: "She can play tennis.", why: "can の後ろの動作の言葉は、主語が she でももとの形のままです。" },
    { wrong: "I can soccer.", right: "I can play soccer.", why: "can のすぐ後ろには「する」にあたる動作の言葉が必要です。" },
    { wrong: "I can play the baseball.", right: "I can play baseball.", why: "スポーツには the をつけません。the をつけるのは楽器です。" },
    { wrong: "Can you jump high? — Yes, I do.", right: "Yes, I can.", why: "Can でたずねられたら can で答えます。" },
  ],
  check: [
    { q: "I can ride a unicycle. を「できない」の文にしましょう。", a: "I can't ride a unicycle.", why: "can を can't（cannot）にかえる。" },
    { q: "My brother can ___ fast. の ___ に入るのは run と runs のどちら？", a: "run", why: "can の後ろはもとの形。" },
    { q: "Can you play the guitar? に「いいえ」で答えましょう。", a: "No, I can't.", why: "Can の文には can で答える。" },
  ],
  next: [
    { label: "ポイントと練習問題「できること（can）」", href: "/learn/eigo-sho/e-english-56-can" },
    { label: "中1「助動詞《じょどうし》 can」", href: "/learn/eibunpo-chu/j-en-1-can" },
    { label: "つぎの単元「物の位置と道案内」", href: "/learn/eigo-sho/e-english-56-ichi" },
  ],
};
