import type { CastScript } from "../types";

// 止まる授業：関係副詞（高校・英文法）× 熱血エンタメ講義（ダイチ・カエデ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-kanfuku.ts の本文だけ。
// 画面の前のきみに語りかける講義ショー。実在の講演家・YouTuber のあいさつ・決めぜりふはまねしない。英文は say でカタカナに開く。問題は data/h-eng-gram-kanfuku.ts から引く。

export const H_KANFUKU_H_NEKKETSU: CastScript = {
  unitId: "h-eng-gram-kanfuku",
  castId: "h-nekketsu",
  title: "欠けを探せ！　where と which の分かれ道ショー",
  scenes: [
    { kind: "chapter", title: "オープニング：秘密の花園の案内板" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さあ、始めよう！　ダイチだ！　今日の依頼人は、英国式庭園を再現した植物園の英語ガイド！　『秘密の花園』の小道に立てる案内板が、the garden where Mary opened と the garden which Mary opened で真っ二つに割れている！",
      say: "さあ、始めよう！　ダイチだ！　きょうの、いらいにんは、英国式庭園を再現した、植物園の、英語ガイド！　秘密の花園の、小道に立てる案内板が、ザ ガーデン ウェア メアリー オープンドと、ザ ガーデン ウィッチ メアリー オープンドで、真っ二つに割れている！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "聞き役のカエデです！　庭は場所なんだから、where でしょ？　悩むところある？",
      say: "聞き役のカエデです！　庭は場所なんだから、ウェアでしょ？　悩むところある？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "それが、あるんだ！　作者バーネットは、ムーアの小さな家を the moorland cottage which held fourteen people と書いた！　家も場所なのに which！　{{なぜ分かれるのか}}、画面の前のきみと解き明かすぞ！",
      say: "それが、あるんだ！　作者バーネットは、ムーアの小さないえを、ザ ムーアランド コテージ ウィッチ ヘルド フォーティーン ピープルと書いた！　いえも場所なのに、ウィッチ！　なぜ、わかれるのか、画面のまえのきみと、解き明かすぞ！",
    },

    { kind: "chapter", title: "1. 関係副詞、4人そろい踏み！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "関係副詞は4つ！　場所の {{where}}、時の {{when}}、理由の {{why}}、方法の {{how}}！　英語は名詞を言い切ってから説明を足す。the town where I grew up、「ぼくが育った町」だ！",
      say: "関係副詞は、よっつ！　場所のウェア、ときのウェン、理由のワイ、方法のハウ！　英語は、名詞を言い切ってから、説明を足す。ザ タウン ウェア アイ グルー アップ。ぼくが育った町、だ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ここが熱い！　1911年の『秘密の花園』第4章！　コマドリが塀をこえて消えた瞬間、メアリーが叫ぶ。the garden where there is no door！　ドアのない庭！",
      say: "ここが熱い！　1911ねんの、秘密の花園、第4章！　コマドリが、塀をこえてきえた瞬間、メアリーが叫ぶ。ザ ガーデン ウェア ゼア イズ ノー ドア！　ドアのない庭！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "where の1語で、入口のない庭があるって、読んでるわたしも気づいちゃう！",
      say: "ウェアの1語で、入口のない庭があるって、読んでるわたしも、きづいちゃう！",
    },
    { kind: "talk", who: "sensei", text: "そうだ！　では時の名詞だ！　画面の前のきみ、問題だ！", say: "そうだ！　では、ときの名詞だ！　画面のまえのきみ、問題だ！" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "the day は時！　we first met に欠けはない！　だから when！　第6章の The time had come when …… みたいに、先行詞と when が{{離れる}}こともあるから、長文では気をつけろ！",
      say: "ザ デイは、とき！　ウィー ファースト メットに、欠けはない！　だから、ウェン！　第6章の、ザ タイム ハド カム ウェン、みたいに、先行詞とウェンが、離れることもあるから、長文ではきをつけろ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ方法は、the way と how を両方つけて、Tell me the way how you made it. が最強だね！",
      say: "じゃあ、方法は、ザ ウェイと、ハウを、両方つけて、テル ミー ザ ウェイ ハウ ユー メイド イット、が最強だね！",
    },
    { kind: "talk", who: "sensei", text: "最強かどうか、確かめよう！　問題だ！", say: "最強かどうか、確かめよう！　問題だ！" },
    { kind: "pause", ref: "mistake:1" },

    { kind: "chapter", title: "2. where の正体をあばけ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "さあ、正体をあばくぞ！　関係副詞は{{前置詞＋ which}}を1語にまとめたもの！　This is the house. と I was born in it. をつなぐと？",
      say: "さあ、正体をあばくぞ！　関係副詞は、前置詞たすウィッチを、1語にまとめたもの！　ディス イズ ザ ハウス、と、アイ ワズ ボーン イン イット、をつなぐと？",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "This is the house where I was born." },
      text: "the house in which I was born！　その in which を where 1語に！　だから where の後ろは、主語も目的語もそろった{{完全な文}}！　on which なら when、for which なら why だ！",
      say: "ザ ハウス イン ウィッチ アイ ワズ ボーン！　その、イン ウィッチを、ウェア、1語に！　だから、ウェアのうしろは、主語も目的語もそろった、完全な文！　オン ウィッチなら、ウェン。フォー ウィッチなら、ワイだ！",
    },

    {
      kind: "talk",
      who: "seito",
      text: "The robin lives in the garden. なら、the garden in which the robin lives をへて、the garden where the robin lives になるんだね！",
      say: "ザ ロビン リヴズ イン ザ ガーデン、なら、ザ ガーデン イン ウィッチ ザ ロビン リヴズをへて、ザ ガーデン ウェア ザ ロビン リヴズに、なるんだね！",
    },

    { kind: "chapter", title: "3. 欠けがあるか、ないか！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "ここが今日いちばん熱い！　決め手は場所かどうかじゃない！　{{後ろの文の形}}だ！　名詞が欠けていれば関係代名詞 which / that、何も欠けていなければ関係副詞 where！",
      say: "ここが、きょう、いちばん熱い！　決めては、場所かどうかじゃない！　うしろの文の、かたちだ！　名詞が欠けていれば、関係代名詞、ウィッチ、ザット。なにも欠けていなければ、関係副詞、ウェア！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でもさ、町なら場所でしょ。This is the town where I visited last year. でばっちり！",
      say: "でもさ、町なら場所でしょ。ディス イズ ザ タウン ウェア アイ ヴィジテッド ラスト イヤー、で、ばっちり！",
    },
    { kind: "talk", who: "sensei", text: "後ろの文を見るんだ！　画面の前のきみも、問題だ！", say: "うしろの文を見るんだ！　画面のまえのきみも、問題だ！" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "seito",
      board: { section: 2, focus: "名詞が欠けている" },
      text: "そっか、visit は目的語をとるから、I visited の後ろに穴がある！　だから which。逆に the city where I was born は、I was born に欠けがないから where だ！",
      say: "そっか、ヴィジットは目的語をとるから、アイ ヴィジテッドのうしろに、あながある！　だから、ウィッチ。逆に、ザ シティ ウェア アイ ワズ ボーンは、アイ ワズ ボーンに欠けがないから、ウェアだ！",
    },

    { kind: "chapter", title: "謎解き：庭と小屋の分かれ道" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "謎を解くぞ！　that garden where he lives の he lives は、主語と動詞で{{完全な文}}！　live in it の in it を where が引き受けている！",
      say: "謎を解くぞ！　ザット ガーデン ウェア ヒー リヴズの、ヒー リヴズは、主語と動詞で、完全な文！　リヴ イン イットの、イン イットを、ウェアが引き受けている！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "一方 the moorland cottage which held fourteen people は、held の主語が{{欠けている}}！　その穴を which が埋める！　第7章の an old key which looked as if …… も同じだ！",
      say: "一方、ザ ムーアランド コテージ ウィッチ ヘルド フォーティーン ピープルは、ヘルドの主語が、欠けている！　そのあなを、ウィッチが埋める！　第7章の、アン オールド キー ウィッチ ルックト アズ イフ、も同じだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "わかった！　案内板は、opened の目的語が欠けた the garden which Mary opened と、欠けのない the garden where the robin lives。両方正しい！",
      say: "わかった！　案内板は、オープンドの目的語が欠けた、ザ ガーデン ウィッチ メアリー オープンドと、欠けのない、ザ ガーデン ウェア ザ ロビン リヴズ。両方、正しい！",
    },

    { kind: "chapter", title: "4. コンマと省略、ラストスパート！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "ラストスパートだ！　コンマつきの where は{{非制限用法}}！　I went to Nara, where I saw many deer. は「奈良へ行き、そこで」と前から順に訳す！　why と how には、この用法はないぞ！",
      say: "ラストスパートだ！　コンマつきのウェアは、非制限用法！　アイ ウェント トゥ ナラ、ウェア アイ ソー メニー ディア、は、奈良へいき、そこで、と、まえから順に訳す！　ワイとハウには、この用法はないぞ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "第6章の below stairs, where there was a huge kitchen は、コンマの where が「そしてそこには大きな台所が」と情報を足している！　同じ文の a large servants' hall where …… はコンマなしで、食堂をしぼりこむ！",
      say: "第6章の、ビロウ ステアーズ、ウェア ゼア ワズ ア ヒュージ キッチンは、コンマのウェアが、そしてそこには、大きな台所が、と、情報を足している！　おなじ文の、ア ラージ サーヴァンツ ホール ウェア、は、コンマなしで、食堂をしぼりこむ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そして{{先行詞の省略}}！　メドロック夫人の This room and the next are where you'll live は、the place が消えた形！　では理由なら？　画面の前のきみ、最後の問題だ！",
      say: "そして、先行詞の省略！　メドロック夫人の、ディス ルーム アンド ザ ネクスト アー ウェア ユール リヴは、ザ プレイスがきえたかたち！　では、理由なら？　画面のまえのきみ、最後の問題だ！",
    },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "seito",
      text: "That's why は the reason が消えて「だから」！　where を見たら前置詞＋ which に戻して、後ろの文の穴をチェック。もう案内板、まかせて！",
      say: "ザッツ ワイは、ザ リーズンが消えて、だから！　ウェアを見たら、前置詞たすウィッチに戻して、うしろの文のあなを、チェック。もう案内板、まかせて！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "最高だ！　画面の前のきみも、長文で where と which が出てきたら、後ろの文の欠けを探してみよう！",
      say: "最高だ！　画面のまえのきみも、長文で、ウェアと、ウィッチが出てきたら、うしろの文の欠けを、探してみよう！",
    },
  ],
};
