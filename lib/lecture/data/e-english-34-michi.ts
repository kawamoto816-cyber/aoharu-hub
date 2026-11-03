import type { Lecture } from "../types";

const C = "/media/commons/e-english-34-michi";

export const E_ENGLISH_34_MICHI: Lecture = {
  unit: "e-english-34-michi",
  nameRuby: "道案内《みちあんない》",
  title: "まっすぐ・右・左を組み合わせて、道を教える",
  hook: "町で「駅はどこですか」と聞かれたら、どう教えますか。日本語でも英語《えいご》でも、道案内《みちあんない》は「まっすぐ行く」「曲がる」「見える」の組み合わせでできています。少しのことばを覚《おぼ》えるだけで、こまっている人を助けられます。",
  mystery: "駅前で、外国から来た人に公園への道を聞かれたユイさん。向かい合ったまま、自分の右の道を指さして Turn right. と言いました。ところがその人は、指さした道とは反対のほうへ曲がっていきました。英語《えいご》はまちがっていないのに、なぜでしょう？",
  mission: {
    from: "駅の駅員さん",
    request: "わたしは駅で切符《きっぷ》を売ったり、道を教えたりしています。外国から来た人に道を聞かれることがふえたので、駅の前に「英語《えいご》の道案内《みちあんない》マップ」を作ることにしました。ところが練習《れんしゅう》で教えてみると、なぜか相手が反対のほうへ歩いていってしまうのです。名探偵《めいたんてい》のあなたに、右と左が入れかわるなぞを解《と》いてほしいのです。",
    thanks: "right と left は、歩く人から見た向きだったのですね。マップには駅を背《せ》にして立ったときの右・左で書き、口で教えるときは、相手のとなりに立って同じほうを向いてから言うことにします。",
  },
  sections: [
    {
      heading: "道案内《みちあんない》のやりとりの流れ",
      body: "知らない人に話しかけるときは、まず {{Excuse me.}}（すみません）と声をかけます。場所は {{Where is 〜?}}（〜はどこですか）でたずねます。教えてもらったら {{Thank you.}}、お礼を言われたら {{You're welcome.}}（どういたしまして）と返します。",
      reading: [
        "道案内《みちあんない》は、知らない人との小さな会話です。まず {{Excuse me.}}（すみません）と声をかけます。いきなり用事を言うより、ひと言あるほうが、相手は「聞くじゅんび」ができます。次に {{Where is the station?}}（駅はどこですか）のように、Where is のあとに行きたい場所を入れてたずねます。",
        "教えてもらったら {{Thank you.}}。お礼を言われたら {{You're welcome.}}（どういたしまして）と返します。うまく言えないときは、地図を指さしたり、手で向きを見せたりしてもかまいません。いちばん大切なのは、むずかしい英語《えいご》より、こまっている人を見て「手つだおう」と思う気持ちです。",
      ],
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
      cliff: "では、道そのものは、どんなことばで教えるのでしょう？",
    },
    {
      heading: "動きを表す3つのことば",
      body: "道の教え方の中心は、{{Go straight.}}（まっすぐ行って）、{{Turn right.}}（右に曲がって）、{{Turn left.}}（左に曲がって）の3つです。right と left は、地図の上での右左ではなく、{{歩いている人から見た}}右左です。地図を指でたどりながら、自分が歩いているつもりで考えましょう。",
      reading: [
        "道の教え方の中心は、3つのことばです。{{Go straight.}}（まっすぐ行って）、{{Turn right.}}（右に曲がって）、{{Turn left.}}（左に曲がって）。go は「行く」、turn は「くるりと向きを変える」という意味です。言いながら体を動かすと、すぐに覚えられます。",
        "イギリスには、聞いたとおりに体を動かして遊ぶマザーグースの歌があります。「えらいヨークの公爵《こうしゃく》さま」は、1万人の兵隊《へいたい》を大きな山の上まで歩かせて、また下まで歩かせた、というおかしな歌です。up（上へ）で立ち上がり、down（下へ）でしゃがみます。今の形で本にのったのは、1913年の絵本が最初《さいしょ》といわれます。さいごの2行は「上でも下でもないときは、上でも下でもなかった」という、あたりまえを言うだけのおふざけです。",
        "道案内《みちあんない》の right と left は、{{歩いている人から見た}}右と左です。気をつけたいのは、相手と{{向かい合ったとき}}。わたしの右手は、向かい合った相手から見ると、相手の左手のほうにあります。鏡《かがみ》の前で右手を上げると、鏡《かがみ》の中の人は左手を上げているように見えるのと同じです。",
        "スマートフォンの地図アプリは、このなやみをうまく解決《かいけつ》しています。歩きはじめると地図がくるりと回り、自分を表す{{矢印}}がいつも画面の上を向きます。矢印の右が、そのまま自分の右です。教える人も、相手のとなりに立って{{同じほうを向けば}}、二人の右と左がそろいます。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "O, the grand old Duke of York,\nHe had ten thousand men;\nHe marched them up a great big hill,\nAnd he marched them down again!\nSo when they were up, they were up,\nAnd when they were down, they were down;\nAnd when they were neither down nor up,\nThey were neither up nor down.",
        ja: "えらいえらい、ヨークのこうしゃくさま、\nへいたいは1万人。\n大きな大きな山をのぼらせて、\nまた下までおりさせた！\nだから、上にいたときは上にいて、\n下にいたときは下にいた。\n下でも上でもなかったときは、\n上でも下でもなかったのさ。",
        cite: "Mother Goose, \"The Grand Old Duke of York\" (Mother Goose: The Old Nursery Rhymes, illustrated by Arthur Rackham, 1913)",
        source: "https://archive.org/details/oldnurseryrhymes00rack",
      }],
      photos: [
        {
          src: `${C}/rackham-1913.webp`, width: 800, height: 1088,
          alt: "月の上を牛が飛びこえ、ねこがバイオリンをひき、犬が立ってわらい、お皿《さら》とスプーンがおどっている絵",
          caption: "1913年に出た、アーサー・ラッカムが絵をかいたマザーグースの本の絵（「ヘイ・ディドル・ディドル」の歌）。「ヨークの公爵《こうしゃく》さま」の歌も、この本にのっています。",
          credit: { author: "Arthur Rackham / The Century Company", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Mother_Goose._The_Old_Nursery_Rhymes_MET_DT270091.jpg" },
        },
      ],
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
      reveal: "ユイさんは、向かい合ったまま自分の右を指さして Turn right. と言いました。でも right は{{歩いている人から見た}}右です。向かい合うと右と左は入れかわるので、その人は自分の右、つまりユイさんから見て左へ曲がったのです。地図アプリの矢印のように、相手のとなりに立って同じ向きを向いてから言えば、指さした道と Turn right. がぴったり合います。",
      cliff: "右か左かは分かりました。では、どこの角で曲がればよいのでしょう？",
    },
    {
      heading: "「どこで曲がるか」と「どこに見えるか」",
      body: "曲がる場所は、角を数えて言います。1つ目の角は {{at the first corner}}、2つ目の角は {{at the second corner}} です。着いたら {{You can see it on your right.}}（右に見えます）のように、どちら側《がわ》に見えるかを伝《つた》えます。",
      reading: [
        "「どこで曲がるか」は、角を数えて伝《つた》えます。1つ目の角は {{the first corner}}、2つ目の角は {{the second corner}}、3つ目は the third corner です。first・second・third は「1番目」「2番目」「3番目」という、順番を表すことばです。数の one・two・three とはちがうので、気をつけましょう。",
        "ことばは and でつなげます。Go straight and turn left at the second corner.（まっすぐ行って、2つ目の角で左に曲がって）。言った順に進めばよいので、聞く人は頭の中で道をたどれます。着いたら {{You can see it on your right.}}（右に見えます）。on your right は「あなたの右に」。ここでも your、つまり歩く人の右です。",
      ],
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
      cliff: "道の言い方はそろいました。さいごに、行き先の名前を覚《おぼ》えましょう。",
    },
    {
      heading: "町の建物《たてもの》の名前",
      body: "道案内《みちあんない》では、行き先の名前も大切です。{{station}}（駅）、{{park}}（公園）、{{hospital}}（病院）、{{library}}（図書館）、{{post office}}（郵便局《ゆうびんきょく》）などを覚《おぼ》えておきましょう。どれも Where is the 〜? の 〜 に入れて使えます。",
      reading: [
        "行き先の名前も、道案内《みちあんない》には大切です。{{station}}（駅）、{{park}}（公園）、{{hospital}}（病院）、{{library}}（図書館）、{{post office}}（郵便局《ゆうびんきょく》）。Where is the 〜? の 〜 に入れるだけで、たずねる文ができます。答えるときも、Go straight. のあとに、もう一度その名前を言うと安心してもらえます。",
        "イギリスのいなかの道には、昔ながらの道しるべが立っています。うでのような板に町の名前と道のりが書いてあり、うでの指すほうへ進めば、その町に着きます。歌に出てきたヨークの町の近くにも、こうした道しるべがあります。英語《えいご》の道案内《みちあんない》は、この道しるべを、ことばでしているのと同じなのです。",
      ],
      photos: [
        {
          src: `${C}/signpost.webp`, width: 800, height: 600,
          alt: "いなかの道ばたに立つ、白と黒の古い道しるべ。左のうでに YORK、右のうでにべつの村の名前が書いてある",
          caption: "イギリスのヨークの近くの村にある、古い道しるべ。左のうでには「YORK 5½」（ヨークまで5.5マイル、やく9キロ）と書いてあります。",
          credit: { author: "Nigel Thompson", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Vintage_road_signpost,_Holtby_-_geograph.org.uk_-_8256918.jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "manga4",
    title: "地図アプリの矢じるし",
    panels: [
      {
        scene: "駅前で道あんないの練習。ユイとソラは向かい合って立っている。",
        lines: [
          { who: "ソラ", text: "ウェア・イズ・ザ・パーク？" },
          { who: "ユイ", text: "自分の右をさして…" },
          { who: "ユイ", text: "ターン・ライト！" },
        ],
        art: {
          bg: "outdoor",
          cast: [
            { who: "ソラ", look: "boy", x: 254, face: "think", fx: "?" },
            { who: "ユイ", look: "girl", x: 86, face: "smile", hand: [40, 214] },
          ],
          props: [{ kind: "board", x: 170, y: 214, s: 0.85, text: "こうえん" }],
        },
      },
      {
        scene: "ソラは自分の右へ歩き出す。ユイが指さしたのと反対のほうだ。",
        lines: [
          { who: "ユイ", text: "ちがう、そっちじゃない！" },
          { who: "ソラ", text: "えっ、ぼくの右は" },
          { who: "ソラ", text: "こっちだよ？" },
        ],
        art: {
          bg: "outdoor",
          cast: [
            { who: "ユイ", look: "girl", x: 254, face: "shout", fx: "!" },
            { who: "ソラ", look: "boy", x: 86, face: "sweat", fx: "sweat", flip: true },
          ],
          props: [{ kind: "arrow", x: 40, y: 214, s: 0.8 }],
        },
      },
      {
        scene: "ユイが、スマートフォンの地図アプリを思い出す。",
        lines: [
          { who: "ユイ", text: "地図アプリの矢じるしは" },
          { who: "ユイ", text: "いつも歩く人の向き！" },
          { who: "ソラ", text: "向き合うと右左がぎゃく？" },
        ],
        art: {
          bg: "outdoor",
          cast: [
            { who: "ユイ", look: "girl", x: 254, face: "surprise", fx: "idea" },
            { who: "ソラ", look: "boy", x: 86, face: "think", fx: "?" },
          ],
          props: [{ kind: "board", x: 170, y: 214, s: 0.85, text: "地図アプリ" }],
        },
      },
      {
        scene: "二人はとなりにならび、同じほうを向く。",
        lines: [
          { who: "ユイ", text: "となりで同じ向きなら" },
          { who: "ユイ", text: "ターン・ライト！" },
          { who: "ソラ", text: "こんどはぴったり！" },
        ],
        art: {
          bg: "outdoor",
          cast: [
            { who: "ユイ", look: "girl", x: 254, face: "smile", hand: [300, 214] },
            { who: "ソラ", look: "boy", x: 150, face: "smile", fx: "!" },
          ],
          props: [{ kind: "arrow", x: 60, y: 220, s: 0.8 }],
        },
      },
    ],
    note: "ユイとソラの話は作り話です。向かい合うと右と左が入れかわること、スマートフォンの地図アプリに、進む向きに合わせて地図を回すしくみがあることは、ほんとうのことです。",
  },
  mistakes: [
    { wrong: "地図の上の右左で right と left を決める", right: "歩いている人から見た右左で決める", why: "地図を回して進む向きを上にすると、まちがえにくくなります。" },
    { wrong: "向かい合ったまま、自分の右を指さして Turn right. と言う", right: "相手のとなりに立ち、同じ向きを向いてから言う", why: "向かい合うと、わたしの右は相手の左になります。" },
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
