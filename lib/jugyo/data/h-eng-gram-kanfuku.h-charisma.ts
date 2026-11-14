import type { CastScript } from "../types";

// 止まる授業：関係副詞（高校・英文法）× カリスマ講師（カナメ先生・ユウキ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-kanfuku.ts の本文だけ。
// 要点をしぼって言い切り、「ポイントは〜」で整理する。英文は say でカタカナに開く。問題は data/h-eng-gram-kanfuku.ts から引く。

export const H_KANFUKU_H_CHARISMA: CastScript = {
  unitId: "h-eng-gram-kanfuku",
  castId: "h-charisma",
  title: "where か which か　関係副詞は「欠け」で選ぶ",
  scenes: [
    { kind: "chapter", title: "つかみ：花園の案内板" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "カナメです。今日の依頼人は、英国式庭園を再現した植物園の英語ガイド。『秘密の花園』の小道に立てる案内板が、the garden where Mary opened か、the garden which Mary opened かで割れている。",
      say: "カナメです。きょうの、いらいにんは、英国式庭園を再現した、植物園の、英語ガイド。秘密の花園の、小道に立てる、案内板が、ザ ガーデン ウェア メアリー オープンドか、ザ ガーデン ウィッチ メアリー オープンドかで、割れている。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "受講生のユウキです。庭は場所だから、where に決まってますよね？",
      say: "受講生のユウキです。庭は場所だから、ウェアに決まってますよね？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そう思うと落とす。バーネットは、ムーアの小さな家を the moorland cottage which held fourteen people と which で書いた。同じ場所なのに、なぜ分かれるのか。今日はこれを解く。",
      say: "そう思うと落とす。バーネットは、ムーアの小さないえを、ザ ムーアランド コテージ ウィッチ ヘルド フォーティーン ピープルと、ウィッチで書いた。同じ場所なのに、なぜ、わかれるのか。きょうはこれを解く。",
    },

    { kind: "chapter", title: "1. 関係副詞は4つ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "日本語は「ぼくが育った町」と説明が前。英語は the town where I grew up と、名詞を言い切ってから説明を足す。ポイントは、関係副詞は{{4つ}}だけということ。",
      say: "日本語は、ぼくが育った町、と、説明がまえ。英語は、ザ タウン ウェア アイ グルー アップと、名詞を言い切ってから、説明を足す。ポイントは、関係副詞は、よっつだけということ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "where" },
      text: "先行詞が場所なら {{where}}、時なら {{when}}、理由の the reason なら {{why}}、方法なら {{how}}。この表を一言でいうと「先行詞の種類で選ぶ」。",
      say: "先行詞が場所ならウェア、ときならウェン、理由の、ザ リーズンならワイ、方法ならハウ。この表を、ひとことでいうと、先行詞の種類で選ぶ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "1911年に出た『秘密の花園』第4章。コマドリが塀をこえて消えたとき、メアリーが叫ぶ。the garden where there is no door。「ドアのない庭」だ。この where 1語で、入口のない庭があると読者も気づく。",
      say: "1911ねんに出た、秘密の花園、第4章。コマドリが塀をこえてきえたとき、メアリーが叫ぶ。ザ ガーデン ウェア ゼア イズ ノー ドア。ドアのない庭だ。このウェア、1語で、入口のない庭があると、読者もきづく。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "when も同じしくみ。第6章の The time had come when ……。先行詞 the time と when のあいだに had come がはさまる。長文では、先行詞と関係副詞が{{離れる}}こともある。ここは要注意。",
      say: "ウェンも同じしくみ。第6章の、ザ タイム ハド カム ウェン。先行詞、ザ タイムと、ウェンのあいだに、ハド カムがはさまる。長文では、先行詞と関係副詞が、離れることもある。ここは要注意。",
    },
    { kind: "talk", who: "sensei", text: "では確認。時の名詞なら？　問題。", say: "では確認。ときの名詞なら？　問題。" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "the day は時で、後ろの we first met に欠けがない。だから when。ここで差がつくのが how。how は{{the way と並べて使えない}}。",
      say: "ザ デイは、ときで、うしろの、ウィー ファースト メットに欠けがない。だからウェン。ここで差がつくのがハウ。ハウは、ザ ウェイと並べて使えない。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "えっ、「作り方を教えて」なら Tell me the way how you made it. で丁寧じゃないですか？",
      say: "えっ、作りかたを教えて、なら、テル ミー ザ ウェイ ハウ ユー メイド イット、で、丁寧じゃないですか？",
    },
    { kind: "talk", who: "sensei", text: "いちばん落とす所。問題。", say: "いちばん落とすところ。問題。" },
    { kind: "pause", ref: "mistake:1" },

    { kind: "chapter", title: "2. 正体は「前置詞＋ which」" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "一言でいうと、関係副詞は{{前置詞＋ which}} を1語にまとめたもの。This is the house. と I was born in it. をつなぐ。",
      say: "ひとことでいうと、関係副詞は、前置詞たすウィッチを、1語にまとめたもの。ディス イズ ザ ハウス、と、アイ ワズ ボーン イン イット、をつなぐ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "This is the house where I was born." },
      text: "in it は場所を表す副詞のまとまり。the house in which I was born をへて、in which を where 1語に。だから where の後ろは、主語も目的語もそろった{{完全な文}}になる。",
      say: "イン イットは、場所を表す、副詞のまとまり。ザ ハウス イン ウィッチ アイ ワズ ボーンをへて、イン ウィッチを、ウェア、1語に。だから、ウェアのうしろは、主語も目的語もそろった、完全な文になる。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "時と理由も同じ。on which が when、for which が why。where や when を見たら、前置詞＋ which に戻して考える。これがポイント。",
      say: "ときと理由も同じ。オン ウィッチが、ウェン。フォー ウィッチが、ワイ。ウェアや、ウェンを見たら、前置詞たすウィッチに戻して考える。これがポイント。",
    },

    { kind: "chapter", title: "3. 決め手は後ろの「欠け」" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "ポイントは2つ。後ろの文で名詞が{{欠けている}}なら関係代名詞 which / that。{{何も欠けていない}}なら関係副詞 where。先行詞が場所かどうかは決め手じゃない。",
      say: "ポイントは2つ。うしろの文で、名詞が欠けているなら、関係代名詞、ウィッチ、ザット。なにも欠けていないなら、関係副詞、ウェア。先行詞が場所かどうかは、決めてじゃない。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ「これは去年わたしが訪れた町です」は、町だから This is the town where I visited last year. ですね。",
      say: "じゃあ、これは、去年わたしが訪れた町です、は、町だから、ディス イズ ザ タウン ウェア アイ ヴィジテッド ラスト イヤー、ですね。",
    },
    { kind: "talk", who: "sensei", text: "後ろの文を見ろ。問題。", say: "うしろの文を見ろ。問題。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "名詞が欠けている" },
      text: "visit は目的語をとる。I visited のあとに穴がある。逆に Kyoto is the city where I was born. の I was born は欠けがないから where。",
      say: "ヴィジットは、目的語をとる。アイ ヴィジテッドのあとに、あながある。逆に、キョウト イズ ザ シティ ウェア アイ ワズ ボーン、の、アイ ワズ ボーンは、欠けがないから、ウェア。",
    },

    {
      kind: "talk",
      who: "seito",
      text: "第7章で拾った an old key which looked as if …… も、looked の主語が欠けているから which なんですね。",
      say: "第7章で拾った、アン オールド キー ウィッチ ルックト アズ イフ、も、ルックトの主語が欠けているから、ウィッチなんですね。",
    },
    { kind: "talk", who: "sensei", text: "そのとおり。10年間閉ざされた庭の鍵だ。", say: "そのとおり。10ねんかん閉ざされた、庭の鍵だ。" },

    { kind: "chapter", title: "謎解き：庭と小屋" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "謎にもどる。第7章の that garden where he lives。he lives は主語と動詞で{{完全な文}}。live in it の in it を where が引き受けている。",
      say: "謎にもどる。第7章の、ザット ガーデン ウェア ヒー リヴズ。ヒー リヴズは、主語と動詞で、完全な文。リヴ イン イットの、イン イットを、ウェアが引き受けている。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "一方 the moorland cottage which held fourteen people は、held の主語が{{欠けている}}。その穴を which が埋める。庭も小屋も場所。違いは後ろの文の形だけ。",
      say: "一方、ザ ムーアランド コテージ ウィッチ ヘルド フォーティーン ピープルは、ヘルドの主語が、欠けている。そのあなを、ウィッチが埋める。庭も小屋も場所。違いは、うしろの文の、かたちだけ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "だから案内板は、opened の目的語が欠けた the garden which Mary opened と、欠けのない the garden where the robin lives。両方正しく書き分けられる！",
      say: "だから案内板は、オープンドの目的語が欠けた、ザ ガーデン ウィッチ メアリー オープンドと、欠けのない、ザ ガーデン ウェア ザ ロビン リヴズ。両方、正しく書きわけられる！",
    },

    { kind: "chapter", title: "4. コンマと省略" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "最後に2点。コンマつきの where と when は{{非制限用法}}。I went to Nara, where I saw many deer. は「奈良へ行き、そこで」と前から訳す。why と how にこの用法はない。",
      say: "最後に2点。コンマつきの、ウェアとウェンは、非制限用法。アイ ウェント トゥ ナラ、ウェア アイ ソー メニー ディア、は、奈良へいき、そこで、と、まえから訳す。ワイとハウに、この用法はない。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "もう1つは{{先行詞の省略}}。the place や the reason は省かれることがある。メドロック夫人の This room and the next are where you'll live がそれ。では最後の問題。",
      say: "もう1つは、先行詞の省略。ザ プレイスや、ザ リーズンは、省かれることがある。メドロック夫人の、ディス ルーム アンド ザ ネクスト アー ウェア ユール リヴが、それ。では、最後の問題。",
    },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "That's why は、the reason が省かれた形。前の文が理由で、後ろが結果。「だから」と訳せば一発で読める。",
      say: "ザッツ ワイは、ザ リーズンが省かれたかたち。まえの文が理由で、うしろが結果。だから、と訳せば、一発で読める。",
    },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "sensei",
      text: "次はきみが講師だ。キーワードは、先行詞、前置詞＋ which、欠け、非制限用法。この順につないで、庭が where で小屋が which になる理由を説明してみよう。",
      say: "次はきみが講師だ。キーワードは、先行詞、前置詞たすウィッチ、欠け、非制限用法。この順につないで、庭がウェアで、小屋がウィッチになる理由を、説明してみよう。",
    },
  ],
};
