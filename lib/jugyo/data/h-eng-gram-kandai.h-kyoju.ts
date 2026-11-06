import type { CastScript } from "../types";

// 止まる授業：関係代名詞（高校・英文法）× 名物教授（チグサ教授・ミオ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-kandai.ts の本文だけ。
// 答えをすぐ言わず、問いで考えさせる。脱線は lecture の本文の中だけ。英文は say でカタカナに開く。問題は data/h-eng-gram-kandai.ts から引く。

export const KANDAI_H_KYOJU: CastScript = {
  unitId: "h-eng-gram-kandai",
  castId: "h-kyoju",
  title: "コンマの謎：チグサ教授と読む『宝島』の関係代名詞",
  scenes: [
    { kind: "chapter", title: "つかみ：盲目の海賊のせりふ" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さて、チグサです。市民劇団で『宝島』の朗読劇を演出する人から相談が来ておる。盲目の海賊ピューは、宿屋の前で a poor blind man, who has lost the precious sight of his eyes …… と身の上を語る。",
      say: "さて、チグサです。市民劇団で、宝島の朗読劇を演出するひとから相談が来ておる。盲目の海賊ピューは、宿屋のまえで、ア プア ブラインド マン、フー ハズ ロスト ザ プレシャス サイト オブ ヒズ アイズ、と、みのうえを語る。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "役者に「who の前のコンマで、間をとるべきですか？」と聞かれたそうだ。このコンマを消すと、文の意味が変わってしまう。さて、なぜだと思う？",
      say: "役者に、フーのまえのコンマで、まをとるべきですか？と聞かれたそうだ。このコンマを消すと、文の意味が変わってしまう。さて、なぜだと思う？",
    },
    { kind: "talk", who: "seito", text: "ゼミのミオです。仮説。コンマは読みやすくするための飾りで、意味は変わらない！" },
    {
      kind: "talk",
      who: "sensei",
      text: "うむ、反対の仮説から始めるのも手だ。{{たった1つのコンマで何が変わるのか}}。しくみから確かめよう。",
      say: "うむ、反対の仮説から始めるのも、てだ。たった1つのコンマで、何が変わるのか。しくみから確かめよう。",
    },

    { kind: "chapter", title: "1. 説明は名詞の後ろに" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "脱線から。1881年の夏、スティーヴンソンは雨ばかりの休暇先で、少年と遊びながら一枚の島の地図を描いた。そこから生まれたのが『{{宝島}}』だ。",
      say: "脱線から。1881ねんの夏、スティーヴンソンは、雨ばかりの休暇先で、少年と遊びながら、一枚の島の地図を描いた。そこからうまれたのが、宝島だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "I have a friend who lives in Paris." },
      text: "さて、I have a friend. と He lives in Paris.。a friend と He は同じ人。1文にするには、どうする？",
      say: "さて、アイ ハヴ ア フレンド、と、ヒー リヴズ イン パリ。ア フレンドと、ヒーは同じひと。1文にするには、どうする？",
    },
    { kind: "talk", who: "seito", text: "He を who に変えて、a friend の後ろにくっつける！", say: "ヒーをフーに変えて、ア フレンドの、うしろにくっつける！" },
    {
      kind: "talk",
      who: "sensei",
      text: "見事。共通の名詞が{{先行詞}}、説明の部分が{{関係詞節}}。日本語は説明を先に積むが、英語はまず物を見せ、あとで説明を足す。a bit of stick like a handspike that he carried のように、カメラが物を映してから持ち主の習慣へ寄るのだ。",
      say: "見事。共通の名詞が先行詞、説明の部分が、かんけいしせつ。日本語は、説明を先に積むが、英語は、まずものを見せ、あとで説明を足す。ア ビット オブ スティック ライク ア ハンドスパイク ザット ヒー キャリード、のように、カメラが、ものを映してから、持ち主の習慣へ寄るのだ。",
    },

    { kind: "chapter", title: "2. 何のかわりか" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "the man who trundled the barrow。who のすぐ後ろには何が来ておる？",
      say: "ザ マン フー トランドルド ザ バロウ。フーの、すぐうしろには、何が来ておる？",
    },
    { kind: "talk", who: "seito", text: "動詞の trundled。だから who は主語のかわり、主格！", say: "動詞の、トランドルド。だから、フーは主語のかわり、主格！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "whose" },
      text: "うむ。先行詞が{{人}}なら who、{{人以外}}なら which、両方に that。目的語のかわりなら目的格で{{省略できる}}。そして「〜の」をつなぐのは所有格 {{whose}}。that には所有格がない。",
      say: "うむ。先行詞が、ひとならフー、ひと以外ならウィッチ、両方にザット。目的語のかわりなら目的格で、省略できる。そして、の、をつなぐのは、所有格フーズ。ザットには、所有格がない。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "a pirate whose map was stolen、an island whose hills are covered with trees。whose は人にも物にも使える。",
      say: "ア パイレート フーズ マップ ワズ ストールン。アン アイランド フーズ ヒルズ アー カヴァード ウィズ トゥリーズ。フーズは、ひとにも、ものにも使える。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "脱線だ。老水夫のせりふは船乗りのなまりだらけで、mought は might のなまり、for to watch は「見張るために」の古い言い方。それでも読者が迷わんのは、なぜだと思う？",
      say: "脱線だ。老水夫のせりふは、船乗りのなまりだらけで、モートは、マイトのなまり。フォー トゥ ウォッチは、見張るために、の古い言いかた。それでも読者が迷わんのは、なぜだと思う？",
    },
    { kind: "talk", who: "seito", text: "主格の who は動詞の前、目的格の that は「主語＋動詞」の前。語順が手がかりになるから！", say: "主格のフーは、動詞のまえ。目的格のザットは、主語たす動詞のまえ。語順が、てがかりになるから！" },
    { kind: "talk", who: "sensei", text: "うむ。では試してみよう。" },
    { kind: "pause", ref: "check:0" },

    { kind: "chapter", title: "3. 地図の×印" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "宝の地図の×印のように、関係詞節には名詞が1つ抜けた「{{穴}}」がある。動詞の前が空けば主格、動詞や前置詞の後ろが空けば目的格。穴にはまる名詞が先行詞だ。",
      say: "宝の地図の、ばつじるしのように、かんけいしせつには、名詞が1つ抜けた、あながある。動詞のまえが空けば主格、動詞や前置詞のうしろが空けば目的格。あなにはまる名詞が、先行詞だ。",
    },
    { kind: "talk", who: "seito", text: "仮説。「わたしが住んでいる家」は This is the house which I live.！", say: "仮説。わたしが住んでいるいえ、は、ディス イズ ザ ハウス ウィッチ アイ リヴ！" },
    { kind: "talk", who: "sensei", text: "ふむ。その文に、穴はあるかね？　問題。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "live は自動詞。目的語の穴を作るには、前置詞 in が要るのだ。in which I live、where I live とも言える。",
      say: "リヴは自動詞。目的語のあなを作るには、前置詞のインが要るのだ。イン ウィッチ アイ リヴ、ウェア アイ リヴ、とも言える。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "欠けがない" },
      text: "では逆に、穴がなければ？　『宝島』の書き出し、およそ90語の1文は the time when my father kept the Admiral Benbow inn と結ばれる。when の後ろは{{完全な文}}。だから関係副詞だ。",
      say: "では逆に、あながなければ？　宝島の書き出し、およそ90語の1文は、ザ タイム ウェン マイ ファーザー ケプト ジ アドミラル ベンボウ イン、と結ばれる。ウェンのうしろは、完全な文。だから関係副詞だ。",
    },

    { kind: "chapter", title: "4. 先行詞のない what" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "老水夫は rum and bacon and eggs is what I want と言った。what の前に名詞がない。なぜだと思う？",
      say: "老水夫は、ラム アンド ベーコン アンド エッグズ イズ ワット アイ ウォント、と言った。ワットのまえに、名詞がない。なぜだと思う？",
    },
    { kind: "talk", who: "seito", text: "what の中に、先行詞がもう入ってる！　the things which と同じ！", say: "ワットのなかに、先行詞がもう入ってる！　ザ シングズ ウィッチと同じ！" },
    { kind: "talk", who: "sensei", text: "うむ。では、これはどうかね。", say: "うむ。では、これは、どうかね。" },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "おまけに、, which は前の文全体を受けることもある。He said nothing, which made me angry.「彼は何も言わず、それが私を怒らせた」。",
      say: "おまけに、コンマ ウィッチは、まえの文全体を受けることもある。ヒー セッド ナッシング、ウィッチ メイド ミー アングリー。彼は何も言わず、それが私を怒らせた。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "非制限用法" },
      text: "さてコンマだ。a son who is a doctor は{{制限用法}}で、ほかにも息子がいるかもしれん。a son, who is a doctor は{{非制限用法}}で、息子が1人いて、ちなみに医者。ほかを除外する働きの強い that は、非制限用法では使えん。",
      say: "さてコンマだ。ア サン フー イズ ア ドクターは、制限用法で、ほかにも息子がいるかもしれん。コンマのある、ア サン、フー イズ ア ドクターは、非制限用法で、息子がひとりいて、ちなみに医者。ほかを除外する働きの強いザットは、非制限用法では使えん。",
    },
    { kind: "talk", who: "seito", text: "じゃあ I met Ken, that is my cousin. は……あれ？", say: "じゃあ、アイ メット ケン、ザット イズ マイ カズン、は、あれ？" },
    { kind: "talk", who: "sensei", text: "その「あれ？」が大事だ。問題。", say: "その、あれ？が、だいじだ。問題。" },
    { kind: "pause", ref: "mistake:2" },

    { kind: "chapter", title: "謎解き：コンマの芝居" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "さて、ピューだ。コンマがなければ{{制限用法}}で、「盲人の中でも、視力を失った盲人」としぼりこむ、くどくておかしな文になる。",
      say: "さて、ピューだ。コンマがなければ制限用法で、盲人のなかでも、視力を失った盲人、としぼりこむ、くどくておかしな文になる。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "コンマがあれば{{非制限用法}}で、「ちなみに、祖国を守る戦いで目を失いまして」と身の上話を足すんだ。同情を誘ってたんですね！",
      say: "コンマがあれば非制限用法で、ちなみに、祖国を守る戦いで、めを失いまして、と、身の上話を足すんだ。同情を誘ってたんですね！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "うむ。国王をたたえることばまで差しはさむ。じつは彼は凶悪な海賊。コンマは、悪党の芝居の「間」でもあった。飾りの仮説は外れたが、よい出発点だったぞ。",
      say: "うむ。国王をたたえることばまで、差しはさむ。じつは彼は、凶悪な海賊。コンマは、悪党の芝居の、までもあった。飾りの仮説は外れたが、よい出発点だったぞ。",
    },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "sensei",
      text: "さて最後の問いだ。きみなら役者に、このコンマをどう説明する？　先行詞、穴、what、非制限用法。これらで組み立ててみたまえ。",
      say: "さて最後の問いだ。きみなら役者に、このコンマを、どう説明する？　先行詞、あな、ワット、非制限用法。これらで組み立ててみたまえ。",
    },
  ],
};
