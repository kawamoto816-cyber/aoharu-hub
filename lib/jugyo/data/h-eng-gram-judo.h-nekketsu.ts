import type { CastScript } from "../types";

// 止まる授業：受動態（高校・英文法）× 熱血エンタメ講義（ダイチ・カエデ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-judo.ts の本文だけ。
// 画面の前のきみに語りかける講義ショー。実在の講演家・YouTuber のあいさつ・決めぜりふはまねしない。英文は say でカタカナに開く。問題は data/h-eng-gram-judo.ts から引く。

export const JUDO_H_NEKKETSU: CastScript = {
  unitId: "h-eng-gram-judo",
  castId: "h-nekketsu",
  title: "主役を前へ、名前は最後に！　受動態ショー",
  scenes: [
    { kind: "chapter", title: "オープニング：序文のなぞ" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さあ、始めよう！　ダイチだ！　今日の依頼人は古典ホラー映画祭の字幕翻訳者！　1818年の『フランケンシュタイン』の序文は has been supposed, by Dr. Darwin と、考えた人をわざわざ文の後ろに回している！",
      say: "さあ、始めよう！　ダイチだ！　きょうの、いらいにんは、古典ホラー映画祭の字幕翻訳者！　1818ねんの、フランケンシュタインの序文は、ハズ ビーン サポーズド、バイ ドクター ダーウィン、と、考えたひとを、わざわざ文のうしろに回している！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "聞き役のカエデです！　Dr. Darwin has supposed って書けば短いのに！　遠回りじゃない？",
      say: "聞き役のカエデです！　ドクター ダーウィン ハズ サポーズド、って書けば、短いのに！　遠回りじゃない？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "その遠回りに理由がある！　{{なぜ作者は受動態を選んだのか}}！　画面の前のきみと解き明かすぞ！",
      say: "その遠回りに、理由がある！　なぜ作者は、受動態を選んだのか！　画面の前のきみと、解き明かすぞ！",
    },

    { kind: "chapter", title: "1. 受動態の作り方！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "手順は3つ！　①目的語を主語に！　②動詞を{{be ＋過去分詞}}に！　③もとの主語を {{by ＋目的格}}で後ろへ！　Many students use this room. は This room is used by many students. だ！",
      say: "手順は3つ！　いち、目的語を主語に！　に、動詞を、ビー、たす、過去分詞に！　さん、もとの主語を、バイ、たす、目的格で、うしろへ！　メニー スチューデンツ ユーズ ディス ルーム、は、ディス ルーム イズ ユーズド バイ メニー スチューデンツ、だ！",
    },
    {
      kind: "talk",
      who: "seito",
      board: { section: 0, focus: "This room is used by many students." },
      text: "主語の This room が単数で、現在だから is なんだね！",
      say: "主語の、ディス ルームが単数で、現在だから、イズなんだね！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そのとおり！　小説の名場面でもいくぞ！　生き物が初めて目を開け、a convulsive motion agitated its limbs！　受動態にすれば Its limbs were agitated by a convulsive motion！　主語が「手足」になって、目が生き物の体に向く！",
      say: "そのとおり！　小説の名場面でもいくぞ！　いきものが、初めてめを開け、ア コンヴァルシヴ モーション アジテイティッド イッツ リムズ！　受動態にすれば、イッツ リムズ ワー アジテイティッド バイ ア コンヴァルシヴ モーション！　主語が、手足になって、めが、いきものの体に向く！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "原文にも受動態がある！　my candle was nearly burnt out！　ろうそくを燃やした人は問題じゃないから、by 〜なしだ！",
      say: "原文にも、受動態がある！　マイ キャンドル ワズ ニアリー バーント アウト！　ろうそくを燃やしたひとは、問題じゃないから、バイ なになにも、なしだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "わかった！　「窓は風で割られた」は、The window was broke by the wind.！",
      say: "わかった！　窓は風で割られた、は、ザ ウィンドウ ワズ ブローク バイ ザ ウィンド！",
    },
    { kind: "talk", who: "sensei", text: "待った！　画面の前のきみはどう思う？　問題！" },
    { kind: "pause", ref: "mistake:0" },

    { kind: "chapter", title: "2. 時制は be が決める！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "ここが熱い！　{{過去分詞はいつも同じ}}！　時制は be だけが背負う！　is、was、will be、has been！　He has written the letter. は The letter {{has been written}}.！",
      say: "ここが熱い！　過去分詞は、いつも同じ！　時制は、ビーだけが背負う！　イズ、ワズ、ウィル ビー、ハズ ビーン！　ヒー ハズ リトゥン ザ レター、は、ザ レター ハズ ビーン リトゥン！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "will be ＋過去分詞" },
      text: "進行形なら {{be being}}、助動詞があれば{{助動詞＋be＋過去分詞}}！　さあ、画面の前のきみ、写してみろ！　問題！",
      say: "進行形なら、ビー ビーイング、助動詞があれば、助動詞、たす、ビー、たす、過去分詞！　さあ、画面の前のきみ、写してみろ！　問題！",
    },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "seito",
      text: "序文の has been supposed は、完了形の受動態！　「昔から今まで考えられてきた」ってことだね！",
      say: "序文の、ハズ ビーン サポーズドは、かんりょうけいの受動態！　昔から今まで、考えられてきた、ってことだね！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そうだ！　続く I shall not be supposed … は助動詞＋be！　ダーウィン博士は、チャールズ・ダーウィンの祖父のエラズマス・ダーウィン！　死んだものに命がもどる、という考えが、当時まじめに論じられていたんだ！",
      say: "そうだ！　続く、アイ シャル ノット ビー サポーズドは、助動詞、たす、ビー！　ダーウィン博士は、チャールズ ダーウィンの祖父の、エラズマス ダーウィン！　死んだものに、命がもどる、という考えが、当時、まじめに論じられていたんだ！",
    },

    { kind: "chapter", title: "3. 伏せる力と前置詞！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "受動態の8割ほどは by 〜をつけない！　する人が{{分からない}}、{{言う必要がない}}、{{わざと伏せたい}}！　序文の結びも The following tale is the only one which has been completed.！　書き上げた人は伏せてある！",
      say: "受動態の8わりほどは、バイ なになにを、つけない！　するひとが、わからない、言う必要がない、わざと伏せたい！　序文の結びも、ザ フォロウイング テイル イズ ジ オンリー ワン フィッチ ハズ ビーン コンプリーティッド！　かきあげたひとは、伏せてある！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "しかも初版の扉には、作者の名前がなかったんでしょ！　メアリー・シェリーの名前が載ったのは1823年の第2版から！",
      say: "しかも、初版の扉には、作者の名前がなかったんでしょ！　メアリー シェリーの名前が載ったのは、1823ねんの、第2版から！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "interested in" },
      text: "そして by 以外の前置詞！　気持ちの {{be surprised at}}・{{be interested in}}！　状態の be covered with・be known to！　材料の be made of、原料の be made from！",
      say: "そして、バイ以外の前置詞！　気持ちの、ビー サプライズド アット、ビー インタレスティッド イン！　状態の、ビー カバード ウィズ、ビー ノウン トゥ！　材料の、ビー メイド オブ、原料の、ビー メイド フロム！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "歴史が大好きだから、I am interesting in history.！",
      say: "歴史が大好きだから、アイ アム インタレスティング イン ヒストリー！",
    },
    { kind: "talk", who: "sensei", text: "おっと、気持ちの受動態のわなだ！　問題！" },
    { kind: "pause", ref: "mistake:2" },

    { kind: "chapter", title: "謎解き：最後にひびく名前！" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "さあ謎解きだ！　英語は、すでに話題のもの（旧情報）を文の頭に、新しく伝えたいこと（新情報）を終わりに置くと、すっと入る！　序文の主役は「この物語のもとになった出来事」！　だから主語にして頭へ！　聞かせたい権威の名前 Dr. Darwin は、by で{{文の終わり}}へ！",
      say: "さあ謎解きだ！　英ごは、すでに話題のもの、旧情報を、文の頭に、新しく伝えたいこと、新情報を、終わりに置くと、すっと入る！　序文の主役は、この物語の、もとになった出来事！　だから、主語にして頭へ！　聞かせたい権威の名前、ドクター ダーウィンは、バイで、文の終わりへ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "そして by を省けば伏せられる！　作者の名前さえ伏せたこの本は、受動態の2つの力を使い分けていたんだ！",
      say: "そして、バイを省けば、伏せられる！　作者の名前さえ伏せたこの本は、受動態の、2つの力を、つかいわけていたんだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "完璧！　字幕も「この物語のもとになった出来事は――ダーウィン博士たちも、ありうると考えていた」と、名前を最後にひびかせよう！",
      say: "完璧！　字幕も、この物語の、もとになった出来事は、ダーウィン博士たちも、ありうると考えていた、と、名前を最後に、ひびかせよう！",
    },

    { kind: "chapter", title: "4. 目的語が2つ、補語つき！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "SVOO は受動態が2通り！　My aunt gave me this watch. は I was given this watch by my aunt.、そして This watch was given {{to}} me by my aunt.！　物が主語なら、人の前に to！",
      say: "エスブイオーオーは、受動態が2とおり！　マイ アント ゲイヴ ミー ディス ウォッチ、は、アイ ワズ ギヴン ディス ウォッチ バイ マイ アント、そして、ディス ウォッチ ワズ ギヴン トゥ ミー バイ マイ アント！　ものが主語なら、ひとのまえに、トゥ！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "SVOC" },
      text: "SVOC は {{C がそのまま}}残る！　We call the dog Pochi. は The dog is called Pochi.！　そして The creature is often called Frankenstein.！　本当は造った科学者の名前なのに、だ！",
      say: "エスブイオーシーは、シーが、そのまま残る！　ウィー コール ザ ドッグ ポチ、は、ザ ドッグ イズ コールド ポチ！　そして、ザ クリーチャー イズ オフン コールド フランケンシュタイン！　本当は、造った科学者の名前なのに、だ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ使役の make も、そのまま残して He was made clean the room.！",
      say: "じゃあ、使役のメイクも、そのまま残して、ヒー ワズ メイド クリーン ザ ルーム！",
    },
    { kind: "talk", who: "sensei", text: "ラストの勝負だ！　問題！" },
    { kind: "pause", ref: "mistake:3" },
    {
      kind: "talk",
      who: "sensei",
      text: "受動態では{{to ＋原形}}！　He was made to feel lonely.！　造られ、名前もなく、孤独に置かれた生き物の物語は、受動態そのものだともいえるんだ！",
      say: "受動態では、トゥ、たす、原形！　ヒー ワズ メイド トゥ フィール ロンリー！　造られ、名前もなく、孤独に置かれたいきものの物ごは、受動態そのものだとも、いえるんだ！",
    },

    { kind: "chapter", title: "エンディング" },
    {
      kind: "talk",
      who: "sensei",
      text: "画面の前のきみ、最後のチャレンジだ！　3つの手順、時制は be、by を伏せる、旧情報と新情報、C はそのまま。この五つで、字幕翻訳者に説明してみろ！",
      say: "画面の前のきみ、最後のチャレンジだ！　3つの手順、時制はビー、バイを伏せる、旧情報と新情報、シーはそのまま。この五つで、字幕翻訳者に説明してみろ！",
    },
  ],
};
