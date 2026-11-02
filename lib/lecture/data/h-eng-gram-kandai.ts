import type { Lecture } from "../types";

const M = "/media/commons/h-eng-gram-kandai";

export const H_ENG_GRAM_KANDAI: Lecture = {
  unit: "h-eng-gram-kandai",
  title: "関係代名詞は「名詞を後ろから説明する」つなぎ。後ろの文の「穴」で選ぶ",
  hook: "日本語は「パリに住んでいる友だち」と説明を名詞の前に置きますが、英語は a friend who lives in Paris と後ろに置きます。長文の1文が長くなるのは、たいていこの後ろからの説明のせいです。関係代名詞のしくみが分かると、長い英文の切れ目が見えてきます。",
  mystery: "スティーヴンソン『宝島』の盲目の海賊ピューは、宿屋の前で a poor blind man, who has lost the precious sight of his eyes …… と身の上を語ります。この who の前のコンマを消すと、文の意味が変わってしまいます。たった1つのコンマで何が変わり、ピューはなぜコンマのある言い方を選んだのでしょう？",
  mission: {
    from: "市民劇団で『宝島』の朗読劇を演出する人",
    request: "来月、英語の原文を一部まじえた『宝島』の朗読劇を上演します。ピュー役の役者に「a poor blind man, who …… のコンマで、間をとるべきですか？　コンマがあるとないとで、何がちがうんですか？」と聞かれ、答えに詰まりました。役者に演技の指示を出すために、名探偵のあなたに、このコンマの意味を解き明かしてほしいのです。",
    thanks: "コンマは「ちなみに」と身の上話を足す合図だったのですね。役者には、コンマで息をつき、同情を誘う話をたっぷり足すように演じてもらいます。悪党ピューの芝居がかった怖さが、きっと客席に伝わります。",
  },
  sections: [
    {
      heading: "2つの文を、名詞のところでつなぐ",
      body: "関係代名詞は、2つの文に共通する名詞（{{先行詞}}）のところで文をつなぎます。2文目の代名詞を who や which に変えて、先行詞の{{すぐ後ろ}}に置くと、2文目がまるごと先行詞の説明になります。説明の部分（{{関係詞節}}）は、形容詞のように名詞を修飾しています。",
      reading: [
        "1881年の夏、スコットランドの作家ロバート・ルイス・スティーヴンソン（1850〜1894）は、雨ばかりの休暇先で、妻の連れ子の少年と遊びながら一枚の島の地図を描きました。そこから生まれたのが冒険小説『{{宝島}}』です。少年向けの雑誌に1881〜82年に連載され、1883年に本になりました。宝のありかに印をつけた地図、片足の海賊、肩に乗ったオウム、「黒丸」の呼び出し状。わたしたちが思いうかべる海賊物語の道具立ての多くは、この小説から広まったといわれます。",
        "物語は、少年ジム・ホーキンズが、父の営む宿屋「ベンボウ提督亭」に、ほおに刀傷のある老水夫がやってきた日を思い出すところから始まります。下の朗読の that old sea-song that he sang so often afterwards に注目しましょう。最初の that は「あの」という指示語、2つ目の that が{{関係代名詞}}です。He sang the song so often afterwards.（のちにその歌を何度も歌った）の the song を that に変えて、先行詞 sea-song の{{すぐ後ろ}}に置いた形です。",
        "a bit of stick like a handspike that he carried も同じしくみです。He rapped on the door with a bit of stick like a handspike.＋He carried it. の it を that に変えてつなぐと、「彼が持ち歩いていた、てこ棒のような棒きれ」になります。日本語は説明を先に積み上げますが、英語はまず「棒きれ」を読者に見せ、そのあとで「いつも持ち歩いていた」と{{関係詞節}}で説明を足します。カメラがまず物を映し、それから持ち主の習慣へと寄っていくような順序が、見知らぬ男の不気味さを少しずつ明かしていくのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "I remember him looking round the cove and whistling to himself as he did so, and then breaking out in that old sea-song that he sang so often afterwards:\n……\nin the high, old tottering voice that seemed to have been tuned and broken at the capstan bars. Then he rapped on the door with a bit of stick like a handspike that he carried, and when my father appeared, called roughly for a glass of rum.",
        ja: "今も目に浮かぶ。男は入り江を見まわし、口笛を吹き、やがて、のちに何度も歌うことになるあの古い船乗りの歌を歌いだした。\n……\n甲高く、年老いて震える声だった。船の巻き上げ機の棒を押しながら歌ううちに調子をつけられ、そしてつぶれてしまったような声。それから男は、持ち歩いていた、てこ棒のような棒きれで戸をたたき、父が出てくると、ラム酒を一杯と荒っぽく言いつけた。",
        cite: "Robert Louis Stevenson, Treasure Island, Chapter I (1883)",
        source: "https://www.gutenberg.org/cache/epub/120/pg120.txt",
      }],
      figure: {
        type: "formula",
        title: "2つの文を1つにする",
        prose: true,
        steps: [
          { expr: "I have {{a friend}}. + {{He}} lives in Paris.", note: "a friend と He は同じ人" },
          { expr: "I have a friend {{who}} lives in Paris.", note: "He を who に変えて a friend の後ろへ" },
          { expr: "This is {{the book}} {{which}} I bought.", note: "目的語 it を which に。which は前へ出る" },
        ],
      },
      photos: [
        {
          src: `${M}/stevenson.webp`, width: 400, height: 605,
          alt: "口ひげをたくわえ、髪をなでつけた細面の男性が、上着姿で少し身を乗り出しているセピア色の写真",
          caption: "ロバート・ルイス・スティーヴンソン。スコットランドのエディンバラ生まれの作家で、『{{宝島}}』のほか『ジキル博士とハイド氏』でも知られる。晩年は南太平洋のサモアで暮らした。",
          credit: { author: "Henry Walter Barnett", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Robert_Louis_Stevenson_by_Henry_Walter_Barnett.jpg" },
        },
        {
          src: `${M}/bill-bones.webp`, width: 800, height: 1037,
          alt: "黒いマントをはおり、三角帽をかぶった赤ら顔の男が、真ちゅうの望遠鏡を手に岩の上に立っている絵",
          caption: "N・C・ワイエスが1911年版『宝島』に描いた挿絵「ビリー・ボーンズ船長」。冒頭で宿屋にやってくる老水夫で、毎日望遠鏡を持って崖の上から海を見張った。",
          credit: { author: "N. C. Wyeth", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:N._C._Wyeth_-_Treasure_Island_-_Captain_Bill_Bones.jpg" },
        },
      ],
      cliff: "老水夫は「手押し車の男」を who で説明します。who と that、どう使い分ける？",
    },
    {
      heading: "先行詞と「格」で、使う語が決まる",
      body: "先行詞が{{人}}なら who、{{人以外}}なら which、どちらにも that が使えます。さらに、関係代名詞が後ろの文で{{主語}}のかわりなら主格、{{目的語}}のかわりなら目的格、{{〜の}}にあたるなら所有格の whose です。whose は物にも使えます。",
      reading: [
        "宿屋に着いた老水夫は、ここが気に入ったと言い、荷物を運んできた男に命令します。the man who trundled the barrow（手押し車をころがしてきた男）。先行詞 the man は{{人}}なので who を使います。who のすぐ後ろには動詞 trundled が来ていて、もとの文 The man trundled the barrow. の{{主語}}が who に変わったことが分かります。これが{{主格}}です。前の節の voice that seemed …… も、声が「〜のようだった」の主語なので主格でした。",
        "一方、a bit of stick …… that he carried の that は、carried の{{目的語}}のかわりなので{{目的格}}です。目的格の関係代名詞は省略でき、a bit of stick he carried としても意味は同じです。物語では、人も物もまとめて受けられる that がよく使われます。ただし that には{{所有格}}がありません。「〜の」をつなぐときは whose を使います。a pirate whose map was stolen（地図を盗まれた海賊）、an island whose hills are covered with trees（丘が木でおおわれた島）のように、whose は人にも物にも使えます。",
        "老水夫のせりふは船乗りのなまりだらけです。mought は might のなまりで、for to watch は「見張るために」の古い言い方です。くだけた話しことばでも、関係代名詞のしくみはそのまま生きています。主格の who は動詞の前、目的格の that は「主語＋動詞」の前に来る。この語順の手がかりがあるから、読者は荒っぽい話しことばでも迷わずに文の骨組みをたどれるのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "“Well, then,” said he, “this is the berth for me. Here you, matey,” he cried to the man who trundled the barrow; “bring up alongside and help up my chest. I’ll stay here a bit,” he continued. “I’m a plain man; rum and bacon and eggs is what I want, and that head up there for to watch ships off.”",
        ja: "「よし、それなら」と男は言った。「ここはおれにうってつけの停泊地だ。おい、そこの若いの」と、手押し車をころがしてきた男に向かって叫んだ。「横づけして、おれの箱を運び上げるのを手伝え。しばらくここにいるぞ」と男は続けた。「おれは飾り気のない男だ。ラム酒とベーコンエッグ、それがおれのほしいものだ。それに、あの上の岬だ。沖を行く船を見張るためにな」",
        cite: "Robert Louis Stevenson, Treasure Island, Chapter I (1883)",
        source: "https://www.gutenberg.org/cache/epub/120/pg120.txt",
      }],
      figure: {
        type: "compare",
        title: "関係代名詞の表",
        columns: [{ title: "格", tone: "navy" }, { title: "先行詞が人", tone: "yellow" }, { title: "人以外", tone: "blue" }],
        rows: [
          { cells: ["主格", "who / that", "which / that"] },
          { cells: ["所有格", "whose", "whose"] },
          { cells: ["目的格（省略可）", "who(m) / that", "which / that"] },
        ],
        note: "that は人にも物にも使えるが、所有格はない。目的格はよく省略される：the book (which) I bought。",
      },
      cliff: "『宝島』の書き出しの1文には、関係代名詞ではない「つなぎ」がひそんでいます。",
    },
    {
      heading: "後ろの文の「穴」を見て格を決める",
      body: "関係代名詞の後ろは、名詞が1つ{{欠けた不完全な文}}になります。動詞の前の主語が欠けていれば主格、動詞や前置詞の後ろの目的語が欠けていれば目的格です。名詞の前に「〜の」が欠けていて、後ろが完全な文なら whose です。後ろが欠けのない{{完全な文}}なら、関係代名詞ではなく関係副詞（where, when など）を考えます。",
      reading: [
        "関係代名詞を見分けるコツは、後ろの文に空いた「{{穴}}」を探すことです。宝の地図の×印のように、関係詞節には名詞が1つ抜けた場所があります。a bit of stick that he carried ＿ では carried の後ろの目的語が、the man who ＿ trundled the barrow では動詞の前の主語が抜けています。先行詞は、その穴にはまる名詞です。穴の位置で{{主格}}か{{目的格}}かが決まります。",
        "『宝島』の書き出しは、およそ90語が1つの文になった長い文です。地主のトリローニさんたちに頼まれて、ジムが冒険の記録を書き始める場面で、最後は go back to the time when my father kept the Admiral Benbow inn …… と結ばれます。when の後ろ my father kept the Admiral Benbow inn は、主語も目的語もそろった{{完全な文}}です。穴がないので、この when は関係代名詞ではなく{{関係副詞}}です。もし the inn which my father kept ＿ なら kept の目的語が欠けるので which になります。",
        "この書き出しには、もう一つしかけがあります。島の位置（the bearings of the island）だけは書かない、宝がまだ掘り出されずに残っているから、とジムは言い、年号さえ「17――年」とぼかします。読者は1文目から、宝がまだどこかに眠っていると知らされるのです。長い文でも、穴の有無で切れ目を見きわめれば、the time を when 以下が説明していることがすっと見えてきます。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Squire Trelawney, Dr. Livesey, and the rest of these gentlemen having asked me to write down the whole particulars about Treasure Island, from the beginning to the end, keeping nothing back but the bearings of the island, and that only because there is still treasure not yet lifted, I take up my pen in the year of grace 17—, and go back to the time when my father kept the Admiral Benbow inn and the brown old seaman with the sabre cut first took up his lodging under our roof.",
        ja: "地主のトリローニさん、リヴジー先生、そのほかの紳士がたから、宝島のことを初めから終わりまで、何ひとつ隠さずくわしく書きとめてほしいと頼まれた。ただし島の位置だけは伏せておく。宝がまだ掘り出されずに残っているからだ。そこで私は、紀元17――年にペンをとり、父がベンボウ提督亭を営み、刀傷のある日焼けした老水夫が初めてうちの屋根の下に宿をとった、あのころへさかのぼることにする。",
        cite: "Robert Louis Stevenson, Treasure Island, Chapter I (1883)",
        source: "https://www.gutenberg.org/cache/epub/120/pg120.txt",
        say: "Squire Trelawney, Doctor Livesey, and the rest of these gentlemen having asked me to write down the whole particulars about Treasure Island, from the beginning to the end, keeping nothing back but the bearings of the island, and that only because there is still treasure not yet lifted, I take up my pen in the year of grace seventeen hundred and something, and go back to the time when my father kept the Admiral Benbow inn and the brown old seaman with the sabre cut first took up his lodging under our roof.",
      }],
      figure: {
        type: "tree",
        title: "関係詞の後ろに何が欠けているか",
        root: {
          label: "関係詞の後ろの文",
          tone: "navy",
          children: [
            { label: "主語が欠ける", sub: "who lives …", children: [{ label: "主格 who / which", tone: "blue" }] },
            { label: "目的語が欠ける", sub: "which I bought ＿", children: [{ label: "目的格（省略可）", tone: "red" }] },
            { label: "「〜の」が欠ける", sub: "whose father is …", children: [{ label: "所有格 whose", tone: "yellow" }] },
            { label: "欠けがない", sub: "where I was born", children: [{ label: "関係副詞へ" }] },
          ],
        },
      },
      photos: [
        {
          src: `${M}/map.webp`, width: 800, height: 1065,
          alt: "細長い島の地図。丘や森が細かく描かれ、赤い×印と手書きの文字、羅針盤、上に人魚の飾り絵がある",
          caption: "『{{宝島}}』の本に入れられた島の地図。宝のありかは赤い×印。ジムが書き出しで「島の位置だけは書かない」と言うのは、この宝がまだ眠っているから。",
          credit: { author: "Robert Louis Stevenson", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Treasure_Island_map.jpg" },
        },
      ],
      cliff: "先行詞がない what。そして、who の前にコンマを打つと、何が変わるのでしょう？",
    },
    {
      heading: "what と、コンマのある非制限用法",
      body: "{{what}} は先行詞をふくんだ関係代名詞で、the thing(s) which と同じく「〜すること・もの」の意味です。What he said is true. のように、what の前に先行詞は置きません。また、先行詞の後ろに{{コンマ}}を置いて , who 〜 / , which 〜 とすると、先行詞に「ちなみに」と情報をつけ足す{{非制限用法}}になります。非制限用法に that は使えません。",
      reading: [
        "老水夫は rum and bacon and eggs is what I want と言いました。{{what}} I want は the things which I want（おれがほしいもの）と同じ意味で、先行詞が what の中にふくまれています。だから what の前に名詞は置きません。want の後ろの目的語が欠けた穴も、ちゃんとあります。なお、3つも並べたのに is なのは、ラム酒とベーコンエッグを一そろいの注文のように言っているからとも、船乗りのくだけた話しぶりとも読めます。",
        "第3章では、目の見えない男ピューが、杖で道をたたきながら宿屋に近づいてきます。ピューはこう呼びかけます。a poor blind man, who has lost the precious sight of his eyes in the gracious defence of his native country ……。who の前に{{コンマ}}があります。これが{{非制限用法}}で、先行詞を「どの人か」しぼりこむのではなく、「ちなみにこういう人で」と情報をつけ足す使い方です。",
        "コンマのない{{制限用法}}は、「たくさんいる中のどれか」をしぼりこみます。a son who is a doctor なら、ほかにも息子がいて、その中の医者の息子、という意味になりえます。非制限用法では、先行詞がすでに特定されているか、1つしかないと分かっているときに、補足を足します。そのため、ほかを除外する働きの強い that は非制限用法では使えません。, which は前の文全体を受けて He said nothing, which made me angry.（彼は何も言わず、それが私を怒らせた）とも使えます。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Will any kind friend inform a poor blind man, who has lost the precious sight of his eyes in the gracious defence of his native country, England—and God bless King George!—where or in what part of this country he may now be?",
        ja: "どなたか親切なかた、教えてくださらんか。祖国イングランドを守る尊い戦いで、目というかけがえのない光を失った、哀れな盲人に――国王ジョージ陛下に神のお恵みを！――ここがどこで、この国のどのあたりなのかを。",
        cite: "Robert Louis Stevenson, Treasure Island, Chapter III (1883)",
        source: "https://www.gutenberg.org/cache/epub/120/pg120.txt",
      }],
      figure: {
        type: "compare",
        title: "コンマがあるかないか",
        columns: [{ title: "制限用法", tone: "blue" }, { title: "非制限用法", tone: "yellow" }],
        rows: [
          { label: "例", cells: ["a son who is a doctor", "a son{{,}} who is a doctor"] },
          { label: "意味", cells: ["医者の息子（他にも息子がいるかも）", "息子が1人いて、彼は医者"] },
          { label: "that", cells: ["使える", "使えない"] },
        ],
      },
      photos: [
        {
          src: `${M}/blind-pew.webp`, width: 800, height: 1050,
          alt: "夜の道で、目に布を巻いた男が杖を振りまわし、片手を前にのばして叫んでいる。後ろの丘の上に白い宿屋がある絵",
          caption: "N・C・ワイエスが1911年版『宝島』に描いた挿絵「盲目のピュー」。杖で道をたたきながら仲間を呼ぶ。この男が、コンマのある{{非制限用法}}で哀れな身の上を語った。",
          credit: { author: "N. C. Wyeth", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:N._C._Wyeth_-_Treasure_Island_-_Blind_Pew.jpg" },
        },
      ],
      reveal: "コンマのない a poor blind man who has lost the sight of his eyes は{{制限用法}}で、「盲人の中でも、視力を失った盲人」としぼりこむ、くどくておかしな文になります。コンマのある{{非制限用法}}なら、「哀れな盲人です。ちなみに、祖国を守る戦いで目を失いまして」と、身の上話をつけ足す形になります。ピューはコンマのあとに名誉の負傷の話を足し、国王をたたえることばまで差しはさんで、聞く人の同情を誘っていたのです。じつは彼は凶悪な海賊。コンマは、悪党の芝居の「間」でもあったのです。",
    },
  ],
  story: {
    kind: "manzai",
    title: "海賊見習いの英文法",
    cast: ["カイ", "ナギ"],
    lines: [
      { who: "カイ", text: "どうもー、カイとナギです！　ぼく、『宝島』を英語で読んで、海賊になる決心をしました！" },
      { who: "ナギ", text: "決心が早いよ。で、どこまで読んだの？" },
      { who: "カイ", text: "船長の登場シーン。a bit of stick like a handspike that he carried。船長は、てこ棒を運んできたんだね。", say: "船長の登場シーン。ア・ビット・オブ・スティック・ライク・ア・ハンドスパイク・ザット・ヒー・キャリード。船長は、てこ棒を運んできたんだね。" },
      { who: "ナギ", text: "運んだのは棒きれ！　like a handspike は「てこ棒みたいな」というたとえ。that の{{先行詞}}は a bit of stick だよ。", say: "運んだのは棒きれ！ ライク・ア・ハンドスパイクは、てこ棒みたいな、というたとえ。ザットの先行詞は、ア・ビット・オブ・スティックだよ。" },
      { who: "カイ", text: "じゃあ the man who trundled the barrow は、手押し車をころがした、フーさんっていう人。", say: "じゃあ、ザ・マン・フー・トランドルド・ザ・バローは、手押し車をころがした、フーさんっていう人。" },
      { who: "ナギ", text: "名前じゃない！　先行詞が人だから who。すぐ後ろに動詞 trundled が来てるから{{主格}}。", say: "名前じゃない！ 先行詞が人だからフー。すぐうしろに動詞のトランドルドが来てるから主格。" },
      { who: "カイ", text: "それにしても、海賊の島には魔女もいるんだね。which って何回も出てくるもん。", say: "それにしても、海賊の島には魔女もいるんだね。ウィッチって何回も出てくるもん。" },
      { who: "ナギ", text: "魔女は witch！　which は先行詞が{{人以外}}のときの関係代名詞。音は同じでも、つづりがちがう。", say: "魔女はダブリュー・アイ・ティー・シー・エイチのウィッチ！ 関係代名詞のウィッチは、先行詞が人以外のときに使うの。音は同じでも、つづりがちがう。" },
      { who: "カイ", text: "船長の名ぜりふも覚えた。rum and bacon and eggs is what I want。「ワット」って、電球の明るさ？", say: "船長の名ぜりふも覚えた。ラム・アンド・ベーコン・アンド・エッグズ・イズ・ワット・アイ・ウォント。ワットって、電球の明るさ？" },
      { who: "ナギ", text: "電気の話じゃない！　{{what}} は先行詞をふくんで「〜もの」。what I want で「おれがほしいもの」。", say: "電気の話じゃない！ ワットは先行詞をふくんで、もの、という意味。ワット・アイ・ウォントで、おれがほしいもの。" },
      { who: "カイ", text: "じゃあ英作文。The thing what I want is a ship!", say: "じゃあ英作文。ザ・シング・ワット・アイ・ウォント・イズ・ア・シップ！" },
      { who: "ナギ", text: "先行詞が二重！　what の前に名詞は置かない。What I want か、The thing which I want。", say: "先行詞が二重！ ワットの前に名詞は置かない。ワット・アイ・ウォントか、ザ・シング・ウィッチ・アイ・ウォント。" },
      { who: "カイ", text: "宝のありかも英語で書ける。This is the island which the treasure is.", say: "宝のありかも英語で書ける。ディス・イズ・ジ・アイランド・ウィッチ・ザ・トレジャー・イズ。" },
      { who: "ナギ", text: "{{穴}}が見つからない！　is の後ろに「その島に」が欠けてる。which the treasure is on か、where the treasure is。", say: "穴が見つからない！ イズのうしろに、その島に、が欠けてる。ウィッチ・ザ・トレジャー・イズ・オンか、ウェア・ザ・トレジャー・イズ。" },
      { who: "カイ", text: "地図をなくした海賊なら、the pirate who's map was lost だね。", say: "地図をなくした海賊なら、ザ・パイレーツ・フーズ・マップ・ワズ・ロストだね。" },
      { who: "ナギ", text: "その who's は who is の短縮形！　「〜の」は所有格の whose。発音は同じでも別物だよ。", say: "そのフーズは、フー・イズの短縮形！ 〜の、は所有格のフーズ、ダブリュー・エイチ・オー・エス・イー。発音は同じでも別物だよ。" },
      { who: "カイ", text: "じゃあ仲間を紹介するね。Silver, that is my friend.", say: "じゃあ仲間を紹介するね。シルバー、ザット・イズ・マイ・フレンド。" },
      { who: "ナギ", text: "コンマのあとに that は使えない！　Silver, who is my friend。コンマは「ちなみに」の合図、{{非制限用法}}。", say: "コンマのあとにザットは使えない！ シルバー、フー・イズ・マイ・フレンド。コンマは、ちなみに、の合図。非制限用法。" },
      { who: "カイ", text: "よし、ぼくはもう立派な海賊だ。ナギ、宝探しについてきて！　行き先は the island that nobody knows！", say: "よし、ぼくはもう立派な海賊だ。ナギ、宝探しについてきて！ 行き先は、ジ・アイランド・ザット・ノーバディ・ノウズ！" },
      { who: "ナギ", text: "文法は合ってる。でも、だれも知らない島なら、地図はどうするの？" },
      { who: "カイ", text: "地図は……これから描く！" },
      { who: "ナギ", text: "スティーヴンソンと同じ順番だ！　もういいよ。" },
      { who: "カイ", text: "どうも、ありがとうございました！" },
    ],
    note: "カイとナギは架空の人物で、会話はすべて創作です。作中の英文のうち、a bit of stick like a handspike that he carried・the man who trundled the barrow・rum and bacon and eggs is what I want はスティーヴンソン『宝島』（1883年）の原文、ほかの英文は説明のために作った例文です。スティーヴンソンが先に島の地図を描き、そこから物語を書いたことは、作家自身が後年の随筆で語っています。",
  },
  mistakes: [
    { wrong: "This is the house which I live.", right: "This is the house which I live in.（in which I live / where I live）", why: "live は自動詞なので、目的語の穴を作るには前置詞 in が必要です。" },
    { wrong: "The thing what I want is a new bike.", right: "What I want is a new bike.（The thing which I want …）", why: "what は先行詞をふくむので、前に名詞（先行詞）を置きません。" },
    { wrong: "I met Ken, that is my cousin.", right: "I met Ken, who is my cousin.", why: "コンマのある非制限用法では that は使えません。" },
    { wrong: "the house in that he lives", right: "the house in which he lives", why: "前置詞のすぐ後ろに that は置けません。which か whom を使います。" },
  ],
  check: [
    { q: "I know a girl ___ mother is a pilot.", a: "whose", why: "後ろの mother is a pilot は完全な文で、「その少女の」母が欠けているので所有格。" },
    { q: "The bag ___ he bought was expensive. で、___ を省略できるか。", a: "できる（目的格の which / that）", why: "bought の目的語が欠けているので目的格。目的格は省略できる。" },
    { q: "___ she told me surprised everyone.（the thing which の意味）", a: "What", why: "先行詞をふくむ「〜すること」は what。" },
  ],
  next: [
    { label: "4択ドリル「関係代名詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-kandai" },
    { label: "つぎの単元「関係副詞」", href: "/learn/eibunpo-ko/h-eng-gram-kanfuku" },
    { label: "関連「分詞」（後ろから名詞を修飾）", href: "/learn/eibunpo-ko/h-eng-gram-bunshi" },
  ],
};
