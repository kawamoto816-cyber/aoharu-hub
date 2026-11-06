import type { CastScript } from "../types";

// 止まる授業：関係代名詞（高校・英文法）× カリスマ講師（カナメ先生・ユウキ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-kandai.ts の本文だけ。
// 要点をしぼって言い切り、「ポイントは〜」で整理する。英文は say でカタカナに開く。問題は data/h-eng-gram-kandai.ts から引く。

export const KANDAI_H_CHARISMA: CastScript = {
  unitId: "h-eng-gram-kandai",
  castId: "h-charisma",
  title: "コンマ1つで意味が変わる　関係代名詞は「穴」で選ぶ",
  scenes: [
    { kind: "chapter", title: "つかみ：ピューのコンマ" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "カナメです。今日の依頼人は、市民劇団で『宝島』の朗読劇を演出する人。盲目の海賊ピューのせりふ a poor blind man, who has lost the precious sight of his eyes …… のコンマで、間をとるべきか、と役者に聞かれた。",
      say: "カナメです。きょうの、いらいにんは、市民劇団で、宝島の朗読劇を演出するひと。盲目の海賊ピューのせりふ、ア プア ブラインド マン、フー ハズ ロスト ザ プレシャス サイト オブ ヒズ アイズ、の、コンマで、まをとるべきか、と役者に聞かれた。",
    },
    { kind: "talk", who: "seito", text: "受講生のユウキです。コンマなんて、息つぎの印くらいじゃないんですか？", say: "受講生のユウキです。コンマなんて、息つぎの、しるしくらいじゃないんですか？" },
    {
      kind: "talk",
      who: "sensei",
      text: "そう思うと落とす。このコンマを消すと、文の意味が変わる。{{たった1つのコンマで何が変わるのか}}。今日はこれを解く。",
      say: "そう思うと落とす。このコンマを消すと、文の意味が変わる。たった1つのコンマで、何が変わるのか。きょうはこれを解く。",
    },

    { kind: "chapter", title: "1. 名詞を後ろから説明する" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "日本語は「パリに住んでいる友だち」と説明を前に置く。英語は a friend who lives in Paris と{{後ろに置く}}。ポイントはこれだけ。",
      say: "日本語は、パリに住んでいる友だち、と、説明をまえに置く。英語は、ア フレンド フー リヴズ イン パリ、と、うしろに置く。ポイントはこれだけ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "I have a friend who lives in Paris." },
      text: "I have a friend. と He lives in Paris. の He を who に変え、{{先行詞}} a friend の{{すぐ後ろ}}へ。2文目がまるごと説明になる。これが{{関係詞節}}だ。",
      say: "アイ ハヴ ア フレンド、と、ヒー リヴズ イン パリ、の、ヒーをフーに変え、先行詞、ア フレンドの、すぐうしろへ。2ぶんめがまるごと説明になる。これが、かんけいしせつだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "1883年に本になった『{{宝島}}』にも出てくる。that old sea-song that he sang so often afterwards。2つ目の that が関係代名詞だ。",
      say: "1883ねんに本になった、宝島にも出てくる。ザット オールド シーソング ザット ヒー サング ソー オフン アフターワーズ。2つめのザットが、関係代名詞だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "a bit of stick like a handspike that he carried も同じ。He carried it. の it を that に変えてつなぐ。日本語は説明を先に積み上げるが、英語は{{まず物を見せ、あとで説明を足す}}。",
      say: "ア ビット オブ スティック ライク ア ハンドスパイク ザット ヒー キャリード、も同じ。ヒー キャリード イット、の、イットを、ザットに変えてつなぐ。日本語は、説明を先につみあげるが、英語は、まずものを見せ、あとで説明を足す。",
    },

    { kind: "chapter", title: "2. 先行詞と格で選ぶ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "先行詞が{{人}}なら who、{{人以外}}なら which、どちらにも that。次に格。後ろの文で{{主語}}のかわりなら主格、{{目的語}}なら目的格、{{「〜の」}}なら所有格 whose。",
      say: "先行詞が、ひとならフー、ひと以外ならウィッチ、どちらにもザット。次に格。うしろの文で、主語のかわりなら主格、目的語なら目的格、の、なら、所有格フーズ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "the man who trundled the barrow は、who のすぐ後ろが動詞だから主格。a bit of stick that he carried は carried の目的語だから目的格で、{{省略できる}}。",
      say: "ザ マン フー トランドルド ザ バロウは、フーの、すぐうしろが動詞だから主格。ア ビット オブ スティック ザット ヒー キャリードは、キャリードの目的語だから目的格で、省略できる。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "whose" },
      text: "ポイントは語順。老水夫のせりふは船乗りのなまりだらけでも、主格の who は{{動詞の前}}、目的格の that は{{「主語＋動詞」の前}}に来る。この手がかりで骨組みがたどれる。",
      say: "ポイントは語順。老水夫のせりふは、船乗りのなまりだらけでも、主格のフーは、動詞のまえ。目的格のザットは、主語たす動詞の、まえに来る。この、てがかりで、骨組みがたどれる。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ここで差がつく。that には所有格がない。a pirate whose map was stolen のように、{{whose は人にも物にも}}使える。では確認。",
      say: "ここで差がつく。ザットには、所有格がない。ア パイレート フーズ マップ ワズ ストールン、のように、フーズは、ひとにも、ものにも使える。では確認。",
    },
    { kind: "pause", ref: "check:0" },

    { kind: "chapter", title: "3. 後ろの文の「穴」を探せ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "一言でいうと、関係代名詞の後ろは名詞が1つ{{欠けた不完全な文}}。その「{{穴}}」の位置で格が決まる。動詞の前が空けば主格、動詞や前置詞の後ろが空けば目的格。",
      say: "ひとことでいうと、関係代名詞のうしろは、名詞が1つ欠けた、不完全な文。そのあなの位置で、格が決まる。動詞のまえが空けば主格、動詞や前置詞のうしろが空けば目的格。",
    },
    { kind: "talk", who: "seito", text: "なるほど。じゃあ「これはぼくが住んでいる家」は、This is the house which I live. ですね。", say: "なるほど。じゃあ、これはぼくが住んでいるいえ、は、ディス イズ ザ ハウス ウィッチ アイ リヴ、ですね。" },
    { kind: "talk", who: "sensei", text: "いちばん落とす所。問題。", say: "いちばん落とすところ。問題。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "live は自動詞。目的語の穴を作るには{{前置詞 in}}が要る。in which I live、where I live とも言える。",
      say: "リヴは自動詞。目的語のあなを作るには、前置詞のインが要る。イン ウィッチ アイ リヴ、ウェア アイ リヴ、とも言える。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "欠けがない" },
      text: "後ろに{{欠けがない完全な文}}なら、関係代名詞ではなく関係副詞。『宝島』の書き出しの the time when my father kept the Admiral Benbow inn は、穴がないから when だ。",
      say: "うしろに、欠けがない完全な文なら、関係代名詞ではなく、関係副詞。宝島の書き出しの、ザ タイム ウェン マイ ファーザー ケプト ジ アドミラル ベンボウ イン、は、あながないから、ウェンだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "もし the inn which my father kept なら、kept の目的語が欠けるので which。一言でいうと、{{穴があれば関係代名詞、なければ関係副詞}}。",
      say: "もし、ジ イン ウィッチ マイ ファーザー ケプト、なら、ケプトの目的語が欠けるので、ウィッチ。ひとことでいうと、あながあれば関係代名詞、なければ関係副詞。",
    },

    { kind: "chapter", title: "4. what とコンマ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "老水夫のせりふ rum and bacon and eggs is what I want。{{what}} は先行詞をふくむ。the things which と同じで「〜すること・もの」。だから前に名詞は置かない。",
      say: "老水夫のせりふ、ラム アンド ベーコン アンド エッグズ イズ ワット アイ ウォント。ワットは先行詞をふくむ。ザ シングズ ウィッチと同じで、すること、もの。だから、まえに名詞は置かない。",
    },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "もう1点。, which は前の文全体も受ける。He said nothing, which made me angry. で「彼は何も言わず、それが私を怒らせた」。",
      say: "もう1点。コンマ ウィッチは、まえの文全体も受ける。ヒー セッド ナッシング、ウィッチ メイド ミー アングリー。で、彼は何も言わず、それが私を怒らせた。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "非制限用法" },
      text: "最後にコンマ。a son who is a doctor は{{制限用法}}で、ほかにも息子がいるかもしれない。a son, who is a doctor は{{非制限用法}}で、息子が1人いて、ちなみに医者。",
      say: "最後にコンマ。ア サン フー イズ ア ドクターは、制限用法で、ほかにも息子がいるかもしれない。コンマのある、ア サン、フー イズ ア ドクターは、非制限用法で、息子がひとりいて、ちなみに医者。",
    },
    { kind: "talk", who: "seito", text: "じゃあ「ケンに会った、ちなみにいとこ」は I met Ken, that is my cousin. ですね。", say: "じゃあ、ケンに会った、ちなみにいとこ、は、アイ メット ケン、ザット イズ マイ カズン、ですね。" },
    { kind: "talk", who: "sensei", text: "ここで差がつく。問題。" },
    { kind: "pause", ref: "mistake:2" },

    { kind: "chapter", title: "謎解き：悪党の「間」" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "ピューにもどる。コンマがないと{{制限用法}}で、「盲人の中でも、視力を失った盲人」としぼりこむ、くどくておかしな文になる。",
      say: "ピューにもどる。コンマがないと制限用法で、盲人のなかでも、視力を失った盲人、としぼりこむ、くどくておかしな文になる。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "コンマがあれば{{非制限用法}}。「哀れな盲人です。ちなみに、祖国を守る戦いで目を失いまして」と身の上話を足す形。国王をたたえることばまで差しはさみ、聞く人の同情を誘っていた。じつは彼は凶悪な海賊。コンマは、悪党の芝居の「{{間}}」だった。",
      say: "コンマがあれば、非制限用法。哀れな盲人です。ちなみに、祖国を守る戦いで、めを失いまして、と、身の上話を足すかたち。国王をたたえることばまで差しはさみ、聞くひとの同情を誘っていた。じつは彼は凶悪な海賊。コンマは、悪党の芝居の、まだった。",
    },
    { kind: "talk", who: "seito", text: "だから役者さんは、コンマで息をついて、同情を誘う話をたっぷり足せばいいんだ。", say: "だから役者さんは、コンマで息をついて、同情を誘う話を、たっぷり足せばいいんだ。" },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "sensei",
      text: "次はきみが講師だ。キーワードは、先行詞、格、穴、what、非制限用法。この順につないで、ピューのコンマの意味を説明してみよう。",
      say: "次はきみが講師だ。キーワードは、先行詞、格、あな、ワット、非制限用法。この順につないで、ピューのコンマの意味を説明してみよう。",
    },
  ],
};
