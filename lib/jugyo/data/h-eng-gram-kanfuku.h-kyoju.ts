import type { CastScript } from "../types";

// 止まる授業：関係副詞（高校・英文法）× 名物教授（チグサ教授・ミオ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-kanfuku.ts の本文だけ。
// 答えをすぐ言わず、問いで考えさせる。英文は say でカタカナに開く。問題は data/h-eng-gram-kanfuku.ts から引く。

export const H_KANFUKU_H_KYOJU: CastScript = {
  unitId: "h-eng-gram-kanfuku",
  castId: "h-kyoju",
  title: "庭は where、小屋は which？　チグサ教授と考える関係副詞",
  scenes: [
    { kind: "chapter", title: "つかみ：植物園の案内板" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さて、チグサです。英国式庭園を再現した植物園の英語ガイドから相談が来ておる。『秘密の花園』の小道の案内板が、the garden where Mary opened と the garden which Mary opened で割れて、だれも理由を説明できんそうだ。",
      say: "さて、チグサです。英国式庭園を再現した、植物園の、英語ガイドから、相談が来ておる。秘密の花園の、小道の案内板が、ザ ガーデン ウェア メアリー オープンドと、ザ ガーデン ウィッチ メアリー オープンドで割れて、だれも、理由を説明できんそうだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "ゼミのミオです。仮説。庭は場所だから、where で決まり！",
      say: "ゼミのミオです。仮説。庭は場所だから、ウェアで決まり！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "うむ。ところがバーネットは、that garden where he lives と書く一方で、ムーアの小さな家を the moorland cottage which held fourteen people と書いた。庭も家も場所なのに、なぜ分かれたと思う？",
      say: "うむ。ところが、バーネットは、ザット ガーデン ウェア ヒー リヴズと書く一方で、ムーアの小さないえを、ザ ムーアランド コテージ ウィッチ ヘルド フォーティーン ピープルと書いた。庭もいえも場所なのに、なぜ、わかれたと思う？",
    },

    { kind: "chapter", title: "1. 4つの関係副詞" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "まず道具をそろえよう。関係副詞は4つ。場所の {{where}}、時の {{when}}、理由の {{why}}、方法の {{how}}。名詞を言い切ってから、後ろで説明を足す。the town where I grew up、「ぼくが育った町」だ。",
      say: "まず、道具をそろえよう。関係副詞は、よっつ。場所のウェア、ときのウェン、理由のワイ、方法のハウ。名詞を言い切ってから、うしろで説明を足す。ザ タウン ウェア アイ グルー アップ。ぼくが育った町、だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "1911年の『秘密の花園』第4章。コマドリが塀をこえて消えたとき、メアリーは the garden where there is no door と叫ぶ。さて、ドアのない庭。読者はここで何に気づくと思う？",
      say: "1911ねんの、秘密の花園、第4章。コマドリが塀をこえてきえたとき、メアリーは、ザ ガーデン ウェア ゼア イズ ノー ドア、と叫ぶ。さて、ドアのない庭。読者は、ここで、なににきづくと思う？",
    },
    {
      kind: "talk",
      who: "seito",
      text: "仮説。入口のない庭が、どこかにある！",
      say: "仮説。入口のない庭が、どこかにある！",
    },
    { kind: "talk", who: "sensei", text: "うむ、where 1語でな。では時ならどうなる？　問題だ。", say: "うむ、ウェア、1語でな。では、ときなら、どうなる？　問題だ。" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "うむ。ただし油断は禁物。第6章の The time had come when …… では、the time と when のあいだに had come がはさまる。さて、when 節はどの名詞を説明していると思う？",
      say: "うむ。ただし、油断は禁物。第6章の、ザ タイム ハド カム ウェン、では、ザ タイムと、ウェンのあいだに、ハド カムがはさまる。さて、ウェンせつは、どの名詞を、説明していると思う？",
    },
    { kind: "talk", who: "seito", text: "仮説。離れていても the time！", say: "仮説。離れていても、ザ タイム！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "how" },
      text: "うむ。表のいちばん下を見たまえ。how だけ「先行詞なし」とある。さて、なぜだと思う？",
      say: "うむ。表の、いちばんしたを見たまえ。ハウだけ、先行詞なし、とある。さて、なぜだと思う？",
    },
    {
      kind: "talk",
      who: "seito",
      text: "仮説。省いただけで、本当は the way how が正式。だから Tell me the way how you made it. と言えば丁寧！",
      say: "仮説。省いただけで、本当は、ザ ウェイ ハウが正式。だから、テル ミー ザ ウェイ ハウ ユー メイド イット、と言えば、丁寧！",
    },
    { kind: "talk", who: "sensei", text: "おもしろい仮説だ。確かめよう。問題だ。", say: "おもしろい仮説だ。確かめよう。問題だ。" },
    { kind: "pause", ref: "mistake:1" },

    { kind: "chapter", title: "2. where の中にかくれた2語" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "さて、where という1語の中には、じつは2つの語がかくれておる。The robin lives in the garden. の in the garden は「どこに」を表す副詞のまとまりだ。庭を先行詞にしてつなぐと？",
      say: "さて、ウェアという1語のなかには、じつは、2つのごが、かくれておる。ザ ロビン リヴズ イン ザ ガーデン、の、イン ザ ガーデンは、どこに、を表す、副詞のまとまりだ。庭を先行詞にしてつなぐと？",
    },
    {
      kind: "talk",
      who: "seito",
      text: "仮説。the garden in which the robin lives。その in which を1語にまとめると、the garden where the robin lives！",
      say: "仮説。ザ ガーデン イン ウィッチ ザ ロビン リヴズ。その、イン ウィッチを1語にまとめると、ザ ガーデン ウェア ザ ロビン リヴズ！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "This is the house where I was born." },
      text: "うむ、正解だ。関係副詞は{{前置詞＋ which}}。on which が when、for which が why。だから後ろには、主語も目的語もそろった{{完全な文}}が続く。",
      say: "うむ、正解だ。関係副詞は、前置詞たすウィッチ。オン ウィッチが、ウェン。フォー ウィッチが、ワイ。だから、うしろには、主語も目的語もそろった、完全な文が続く。",
    },

    { kind: "chapter", title: "3. 後ろの文に穴はあるか" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "では、場所の名詞のあとに which が来るのはいつか。関係代名詞の which は、後ろの文で主語や目的語の代わりをする。さて、which の後ろの文には何があると思う？",
      say: "では、場所の名詞のあとに、ウィッチが来るのは、いつか。関係代名詞のウィッチは、うしろの文で、主語や目的語の、代わりをする。さて、ウィッチのうしろの文には、なにがあると思う？",
    },
    {
      kind: "talk",
      who: "seito",
      text: "仮説。名詞が1つ{{欠けた}}穴！　でも先行詞が町なら、やっぱり This is the town where I visited last year. でいいはず！",
      say: "仮説。名詞が1つ欠けた、あな！　でも、先行詞が町なら、やっぱり、ディス イズ ザ タウン ウェア アイ ヴィジテッド ラスト イヤー、でいいはず！",
    },
    { kind: "talk", who: "sensei", text: "前半はいい線だ。後半を確かめよう。問題だ。", say: "前半は、いい線だ。後半を確かめよう。問題だ。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "後ろの文を見る" },
      text: "うむ。visit は目的語をとる動詞。I visited の後ろに穴がある。決め手は場所かどうかではなく、{{後ろの文に欠けがあるか}}。これがただ一つの決め手だ。",
      say: "うむ。ヴィジットは、目的語をとる動詞。アイ ヴィジテッドのうしろに、あながある。決めては、場所かどうかではなく、うしろの文に、欠けがあるか。これが、ただ一つの決めてだ。",
    },

    { kind: "chapter", title: "謎解き：鍵穴の正体" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "さて、謎にもどろう。the moorland cottage which held fourteen people。held したのは何か。主語はどこにある？",
      say: "さて、謎にもどろう。ザ ムーアランド コテージ ウィッチ ヘルド フォーティーン ピープル。ヘルドしたのは、なにか。主語は、どこにある？",
    },
    {
      kind: "talk",
      who: "seito",
      text: "ない！　held の主語が欠けていて、which がその穴を埋めている。でも that garden where he lives の he lives は、主語と動詞でもう完成。live in it の in it を where が引き受けてるんだ！",
      say: "ない！　ヘルドの主語が欠けていて、ウィッチが、そのあなを埋めている。でも、ザット ガーデン ウェア ヒー リヴズの、ヒー リヴズは、主語と動詞で、もう完成。リヴ イン イットの、イン イットを、ウェアが引き受けてるんだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "うむ。わたしの最初の問いの答えだ。案内板は、opened の目的語が欠けた the garden which Mary opened と、欠けのない the garden where the robin lives。どちらも自信をもって書ける。",
      say: "うむ。わたしの最初の問いの答えだ。案内板は、オープンドの目的語が欠けた、ザ ガーデン ウィッチ メアリー オープンドと、欠けのない、ザ ガーデン ウェア ザ ロビン リヴズ。どちらも、自信をもって書ける。",
    },

    {
      kind: "talk",
      who: "sensei",
      text: "第7章で拾った an old key which looked as if …… も同じだ。looked の主語が欠けておるから which。10年間閉ざされた庭の鍵だよ。",
      say: "第7章で拾った、アン オールド キー ウィッチ ルックト アズ イフ、も同じだ。ルックトの主語が欠けておるから、ウィッチ。10ねんかん閉ざされた、庭の鍵だよ。",
    },

    { kind: "chapter", title: "4. コンマと、消えた先行詞" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "おまけを2つ。コンマのついた where は{{非制限用法}}。I went to Nara, where I saw many deer. は「奈良へ行き、そこで」と前から訳す。, where は and there、と考えればよい。",
      say: "おまけを2つ。コンマのついたウェアは、非制限用法。アイ ウェント トゥ ナラ、ウェア アイ ソー メニー ディア、は、奈良へいき、そこで、と、まえから訳す。コンマ ウェアは、アンド ゼア、と考えればよい。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "もう1つは先行詞の省略。メドロック夫人は This room and the next are where you'll live と言った。the place が消えて、where 節が「〜する所」になっておる。では理由ならどうなる？　問題だ。",
      say: "もう1つは、先行詞の省略。メドロック夫人は、ディス ルーム アンド ザ ネクスト アー ウェア ユール リヴ、と言った。ザ プレイスが消えて、ウェアせつが、するところ、になっておる。では、理由なら、どうなる？　問題だ。",
    },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "うむ。That's why は「だから」。さて最後の問いだ。きみは英文で where を見たら、まず何をするかね？",
      say: "うむ。ザッツ ワイは、だから。さて、最後の問いだ。きみは、英文でウェアを見たら、まず、なにをするかね？",
    },
    {
      kind: "talk",
      who: "seito",
      text: "前置詞＋ which に戻して、後ろの文に穴があるかを確かめる！　わたしの最初の仮説は外れでしたけど、もう迷いません。",
      say: "前置詞たすウィッチに戻して、うしろの文に、あながあるかを確かめる！　わたしの最初の仮説は、外れでしたけど、もう迷いません。",
    },
  ],
};
