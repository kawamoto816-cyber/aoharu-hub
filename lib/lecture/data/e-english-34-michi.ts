import type { Lecture } from "../types";

export const E_ENGLISH_34_MICHI: Lecture = {
  unit: "e-english-34-michi",
  nameRuby: "道案内《みちあんない》",
  title: "まっすぐ・右・左を組み合わせて、道を教える",
  hook: "町で「駅はどこですか」と聞かれたら、どう教えますか。日本語でも英語《えいご》でも、道案内《みちあんない》は「まっすぐ行く」「曲がる」「見える」の組み合わせでできています。少しのことばをおぼえるだけで、こまっている人を助けられます。",
  sections: [
    {
      heading: "道案内《みちあんない》のやりとりの流れ",
      body: "知らない人に話しかけるときは、まず {{Excuse me.}}（すみません）と声をかけます。場所は {{Where is 〜?}}（〜はどこですか）でたずねます。教えてもらったら {{Thank you.}}、お礼を言われたら {{You're welcome.}}（どういたしまして）と返します。",
      figure: {
        type: "flow",
        dir: "col",
        title: "道をたずねてから、お礼まで",
        steps: [
          { label: "Excuse me.", sub: "すみません", tone: "plain" },
          { label: "Where is the park?", sub: "公園はどこですか", tone: "navy" },
          { label: "Go straight.", sub: "まっすぐ行ってください", tone: "yellow" },
          { label: "Thank you.", sub: "ありがとう", tone: "blue" },
          { label: "You're welcome.", sub: "どういたしまして" },
        ],
      },
    },
    {
      heading: "動きを表す3つのことば",
      body: "道の教え方の中心は、{{Go straight.}}（まっすぐ行って）、{{Turn right.}}（右に曲がって）、{{Turn left.}}（左に曲がって）の3つです。right と left は、地図の上での右左ではなく、{{歩いている人から見た}}右左です。地図を指でたどりながら、自分が歩いているつもりで考えましょう。",
      figure: {
        type: "compare",
        title: "動きのことば",
        columns: [{ title: "英語《えいご》", tone: "yellow" }, { title: "意味" }, { title: "動き" }],
        rows: [
          { cells: ["Go straight.", "まっすぐ行って", "前へ進む"] },
          { cells: ["Turn right.", "右に曲がって", "右手のほうへ"] },
          { cells: ["Turn left.", "左に曲がって", "左手のほうへ"] },
        ],
      },
    },
    {
      heading: "「どこで曲がるか」と「どこに見えるか」",
      body: "曲がる場所は、角を数えて言います。1つ目の角は {{at the first corner}}、2つ目の角は {{at the second corner}} です。着いたら {{You can see it on your right.}}（右に見えます）のように、どちら側《がわ》に見えるかを伝《つた》えます。",
      figure: {
        type: "formula",
        title: "ことばをつなげて、くわしく言う",
        prose: true,
        steps: [
          { expr: "Go straight.", note: "まっすぐ行って" },
          { expr: "Go straight {{and turn left}}.", note: "まっすぐ行って、左に曲がって" },
          { expr: "Go straight and turn left {{at the second corner}}.", note: "2つ目の角で" },
          { expr: "{{You can see it on your right.}}", note: "右に見えます" },
        ],
        note: "and で動きをつなぐと、言った順《じゅん》に進めばよいことが相手に伝《つた》わります。",
      },
    },
    {
      heading: "町の建物《たてもの》の名前",
      body: "道案内《みちあんない》では、行き先の名前も大切です。{{station}}（駅）、{{park}}（公園）、{{hospital}}（病院）、{{library}}（図書館）、{{post office}}（郵便局《ゆうびんきょく》）などをおぼえておきましょう。どれも Where is the 〜? の 〜 に入れて使えます。",
    },
  ],
  mistakes: [
    { wrong: "地図の上の右左で right と left を決める", right: "歩いている人から見た右左で決める", why: "地図を回して進む向きを上にすると、まちがえにくくなります。" },
    { wrong: "What is the station?", right: "Where is the station?", why: "場所をたずねるときは Where（どこ）を使います。" },
    { wrong: "at the two corner", right: "at the second corner", why: "「2つ目の」は second、「1つ目の」は first です。two は数の「2」です。" },
  ],
  check: [
    { q: "「右に曲がって」を英語《えいご》で言うと？", a: "Turn right.", why: "曲がるは turn、右は right。" },
    { q: "You can see it on your left. の意味は？", a: "左に見えます", why: "on your left は「あなたの左に」。" },
    { q: "Thank you. と言われたときの返事は？", a: "You're welcome.", why: "「どういたしまして」の意味。" },
  ],
  next: [
    { label: "ドリルで「道案内《みちあんない》」を練習する", href: "/learn/eigo-sho/e-english-34-michi" },
    { label: "5・6年「物の位置《いち》と道案内《みちあんない》」（ドリル）", href: "/learn/eigo-sho/e-english-56-ichi" },
    { label: "「身の回りの物の言い方」（ドリル）", href: "/learn/eigo-sho/e-english-34-mi-no-mawari" },
  ],
};
