import type { CastScript } from "../types";

// 止まる授業：関係代名詞（高校・英文法）× 熱血エンタメ講義（ダイチ・カエデ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-kandai.ts の本文だけ。
// 画面の前のきみに語りかける講義ショー。実在の講演家・YouTuber のあいさつ・決めぜりふはまねしない。英文は say でカタカナに開く。問題は data/h-eng-gram-kandai.ts から引く。

export const KANDAI_H_NEKKETSU: CastScript = {
  unitId: "h-eng-gram-kandai",
  castId: "h-nekketsu",
  title: "穴を探せ！　コンマを読め！　関係代名詞ショー",
  scenes: [
    { kind: "chapter", title: "オープニング：宝島の朗読劇" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さあ、始めよう！　ダイチだ！　今日の依頼人は、市民劇団で『宝島』の朗読劇を演出する人！　盲目の海賊ピューのせりふ a poor blind man, who has lost the precious sight of his eyes ……。この who の前のコンマが問題だ！",
      say: "さあ、始めよう！　ダイチだ！　きょうの、いらいにんは、市民劇団で、宝島の朗読劇を演出するひと！　盲目の海賊ピューのせりふ、ア プア ブラインド マン、フー ハズ ロスト ザ プレシャス サイト オブ ヒズ アイズ。このフーのまえのコンマが問題だ！",
    },
    { kind: "talk", who: "seito", text: "聞き役のカエデです！　コンマって、点がひとつ打ってあるだけでしょ？" },
    {
      kind: "talk",
      who: "sensei",
      text: "そのひとつで、文の意味が変わる！　{{たった1つのコンマで何が変わり、ピューはなぜコンマのある言い方を選んだのか}}。画面の前のきみと解き明かすぞ！",
      say: "そのひとつで、文の意味が変わる！　たった1つのコンマで、何が変わり、ピューはなぜ、コンマのある言いかたを選んだのか。画面の前のきみと、解き明かすぞ！",
    },

    { kind: "chapter", title: "1. 説明は後ろから！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "日本語は「パリに住んでいる友だち」、説明が前！　英語は a friend who lives in Paris、説明が{{後ろ}}！　長い英文が長くなるのは、たいていこれのせいだ！",
      say: "日本語は、パリに住んでいる友だち、説明がまえ！　英語は、ア フレンド フー リヴズ イン パリ、説明が、うしろ！　長い英文が長くなるのは、たいていこれのせいだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "I have a friend who lives in Paris." },
      text: "I have a friend. ＋ He lives in Paris.。He を who に変えて、{{先行詞}} a friend の{{すぐ後ろ}}へ！　2文目がまるごと{{関係詞節}}、名詞の説明になる！",
      say: "アイ ハヴ ア フレンド、たす、ヒー リヴズ イン パリ。ヒーをフーに変えて、先行詞、ア フレンドの、すぐうしろへ！　2ぶんめがまるごと、かんけいしせつ、名詞の説明になる！",
    },
    { kind: "talk", who: "seito", text: "1883年に本になった『宝島』にも、that old sea-song that he sang so often afterwards って出てくるんだよね！", say: "1883ねんに本になった宝島にも、ザット オールド シーソング ザット ヒー サング ソー オフン アフターワーズ、って出てくるんだよね！" },
    {
      kind: "talk",
      who: "sensei",
      text: "そうだ！　2つ目の that が関係代名詞！　a bit of stick like a handspike that he carried も同じ！　英語はまず棒きれを見せて、あとから「持ち歩いていた」と説明を足す！　カメラが物から持ち主へ寄っていくみたいだろ！",
      say: "そうだ！　2つめのザットが、関係代名詞！　ア ビット オブ スティック ライク ア ハンドスパイク ザット ヒー キャリード、も同じ！　英語は、まず棒きれを見せて、あとから、持ち歩いていた、と説明を足す！　カメラが、ものから持ち主へ寄っていくみたいだろ！",
    },

    { kind: "chapter", title: "2. who・which・whose、使い分けろ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "ここが熱い！　先行詞が{{人}}なら who、{{人以外}}なら which、どっちにも that！　後ろの文で主語のかわりなら主格、目的語なら目的格、「〜の」なら所有格 {{whose}}！",
      say: "ここが熱い！　先行詞が、ひとならフー、ひと以外ならウィッチ、どっちにもザット！　うしろの文で、主語のかわりなら主格、目的語なら目的格、の、なら、所有格フーズ！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "whose" },
      text: "the man who trundled the barrow は主格！　a bit of stick that he carried は目的格で、省略もできる！　そして that には所有格がない！　a pirate whose map was stolen、whose は人にも物にも使えるぞ！",
      say: "ザ マン フー トランドルド ザ バロウは主格！　ア ビット オブ スティック ザット ヒー キャリードは目的格で、省略もできる！　そして、ザットには所有格がない！　ア パイレート フーズ マップ ワズ ストールン、フーズは、ひとにも、ものにも使えるぞ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "なまりだらけの船乗りのせりふでも迷わないのは、語順の手がかりがあるから！　主格の who は動詞の前、目的格の that は「主語＋動詞」の前！",
      say: "なまりだらけの船乗りのせりふでも迷わないのは、語順の、てがかりがあるから！　主格のフーは、動詞のまえ。目的格のザットは、主語たす動詞のまえ！",
    },
    { kind: "talk", who: "sensei", text: "さあ、画面の前のきみ、いってみよう！　問題！" },
    { kind: "pause", ref: "check:0" },

    { kind: "chapter", title: "3. 穴を探せ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "関係代名詞の後ろは、名詞が1つ{{欠けた不完全な文}}！　宝の地図の×印みたいな「{{穴}}」がある！　動詞の前が空けば主格、動詞や前置詞の後ろが空けば目的格！",
      say: "関係代名詞のうしろは、名詞が1つ欠けた、不完全な文！　宝の地図の、ばつじるしみたいな、あながある！　動詞のまえが空けば主格、動詞や前置詞のうしろが空けば目的格！",
    },
    { kind: "talk", who: "seito", text: "よーし！　「わたしが住んでいる家」は This is the house which I live.！", say: "よーし！　わたしが住んでいるいえ、は、ディス イズ ザ ハウス ウィッチ アイ リヴ！" },
    { kind: "talk", who: "sensei", text: "おっと、ここが勝負所だ！　問題！", say: "おっと、ここが勝負どころだ！　問題！" },
    { kind: "pause", ref: "mistake:0" },
    { kind: "talk", who: "seito", text: "live の後ろに穴がない！　自動詞だから、前置詞 in がいるんだ。in which I live、where I live でもいける！", say: "リヴのうしろに、あながない！　自動詞だから、前置詞のインがいるんだ。イン ウィッチ アイ リヴ、ウェア アイ リヴ、でもいける！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "欠けがない" },
      text: "逆に、後ろが{{欠けのない完全な文}}なら関係副詞！　『宝島』の書き出しの the time when my father kept the Admiral Benbow inn。穴がない、だから when だ！",
      say: "逆に、うしろが、欠けのない完全な文なら、関係副詞！　宝島の書き出しの、ザ タイム ウェン マイ ファーザー ケプト ジ アドミラル ベンボウ イン。あながない、だからウェンだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "もし the inn which my father kept なら、kept の目的語が欠けるから which！　穴があるかないか、それだけで見きわめろ！",
      say: "もし、ジ イン ウィッチ マイ ファーザー ケプト、なら、ケプトの目的語が欠けるから、ウィッチ！　あながあるかないか、それだけで見きわめろ！",
    },

    { kind: "chapter", title: "4. what とコンマ、いくぞ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "老水夫のひとこと、rum and bacon and eggs is what I want！　{{what}} は先行詞をふくむ、the things which と同じ「〜すること・もの」！　だから前に名詞は置かない！",
      say: "老水夫のひとこと、ラム アンド ベーコン アンド エッグズ イズ ワット アイ ウォント！　ワットは先行詞をふくむ、ザ シングズ ウィッチと同じ、すること、もの！　だから、まえに名詞は置かない！",
    },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "おまけだ！　, which は前の文全体も受けられる！　He said nothing, which made me angry.「彼は何も言わず、それが私を怒らせた」！",
      say: "おまけだ！　コンマ ウィッチは、まえの文全体も受けられる！　ヒー セッド ナッシング、ウィッチ メイド ミー アングリー。彼は何も言わず、それが私を怒らせた！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "非制限用法" },
      text: "そしてコンマ！　a son who is a doctor は{{制限用法}}、ほかにも息子がいるかも！　a son, who is a doctor は{{非制限用法}}、息子は1人で、ちなみに医者！",
      say: "そしてコンマ！　ア サン フー イズ ア ドクターは制限用法、ほかにも息子がいるかも！　コンマのある、ア サン、フー イズ ア ドクターは非制限用法、息子はひとりで、ちなみに医者！",
    },
    { kind: "talk", who: "seito", text: "なら that でもいけるでしょ！　I met Ken, that is my cousin.！", say: "なら、ザットでもいけるでしょ！　アイ メット ケン、ザット イズ マイ カズン！" },
    { kind: "talk", who: "sensei", text: "画面の前のきみ、待った！　問題！" },
    { kind: "pause", ref: "mistake:2" },

    { kind: "chapter", title: "クライマックス：ピューの芝居" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "さあピューだ！　コンマがないと{{制限用法}}、「盲人の中でも、視力を失った盲人」と、くどくておかしな文になる！",
      say: "さあピューだ！　コンマがないと制限用法、盲人のなかでも、視力を失った盲人、と、くどくておかしな文になる！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "コンマがあれば{{非制限用法}}！　「哀れな盲人です。ちなみに、祖国を守る戦いで目を失いまして」と身の上話を足す！　国王をたたえることばまで差しはさむ！　じつは彼は凶悪な海賊！",
      say: "コンマがあれば非制限用法！　哀れな盲人です。ちなみに、祖国を守る戦いで、めを失いまして、と、身の上話を足す！　国王をたたえることばまで、差しはさむ！　じつは彼は、凶悪な海賊！",
    },
    { kind: "talk", who: "seito", text: "コンマは悪党の芝居の「間」！　役者さんは、コンマで息をついて、同情を誘う話をたっぷり足せばいいんだ！", say: "コンマは、悪党の芝居の、ま！　役者さんは、コンマで息をついて、同情を誘う話を、たっぷり足せばいいんだ！" },

    { kind: "chapter", title: "エンディング" },
    {
      kind: "talk",
      who: "sensei",
      text: "画面の前のきみ、今日のキーワードは、先行詞、格、穴、what、非制限用法！　これでピューのコンマの謎を、だれかに語ってみよう！　またな！",
      say: "画面の前のきみ、きょうのキーワードは、先行詞、格、あな、ワット、非制限用法！　これで、ピューのコンマの謎を、だれかに語ってみよう！　またな！",
    },
  ],
};
