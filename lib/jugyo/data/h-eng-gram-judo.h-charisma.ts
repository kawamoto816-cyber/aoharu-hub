import type { CastScript } from "../types";

// 止まる授業：受動態（高校・英文法）× カリスマ講師（カナメ先生・ユウキ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-judo.ts の本文だけ。
// 要点をしぼって言い切り、「ポイントは〜」で整理する。英文は say でカタカナに開く。問題は data/h-eng-gram-judo.ts から引く。

export const JUDO_H_CHARISMA: CastScript = {
  unitId: "h-eng-gram-judo",
  castId: "h-charisma",
  title: "わざわざ遠回り？　受動態は「主役」と「最後の名前」で選ぶ",
  scenes: [
    { kind: "chapter", title: "つかみ：序文の遠回り" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "カナメです。今日の依頼人は古典ホラー映画祭の字幕翻訳者。1818年に出た『フランケンシュタイン』の序文は、The event … has been supposed, by Dr. Darwin … と、考えた人をわざわざ文の後ろに回している。",
      say: "カナメです。きょうの、いらいにんは、古典ホラー映画祭の字幕翻訳者。1818ねんに出た、フランケンシュタインの序文は、ジ イベント、ハズ ビーン サポーズド、バイ ドクター ダーウィン、と、考えたひとを、わざわざ文のうしろに回している。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "受講生のユウキです。Dr. Darwin has supposed … と能動態で書けば短いのに。直訳すると「〜されてきた」で、ぎこちないですよね。",
      say: "受講生のユウキです。ドクター ダーウィン ハズ サポーズド、と、能動態で書けば短いのに。直訳すると、されてきた、で、ぎこちないですよね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そこが入口。{{なぜ作者は、あえて受動態を選んだのか}}。理由がわかれば訳し方も決まる。今日はこれを解く。",
      say: "そこが入口。なぜ作者は、あえて受動態を選んだのか。理由がわかれば、訳しかたも決まる。きょうはこれを解く。",
    },

    { kind: "chapter", title: "1. 作り方は3手順" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "受動態は「何が・どうされる」の文。ポイントは3手順。①目的語を主語に。②動詞を{{be ＋過去分詞}}に。③もとの主語を {{by ＋目的格}}で後ろへ。言わなくてよければ省く。",
      say: "受動態は、なにが、どうされる、の文。ポイントは3手順。いち、目的語を主語に。に、動詞を、ビー、たす、過去分詞に。さん、もとの主語を、バイ、たす、目的格で、うしろへ。言わなくてよければ、省く。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "This room is used by many students." },
      text: "Many students use this room. なら、This room を主語に。主語は単数・現在だから is used。This room is used by many students. be は新しい主語と{{時制}}に合わせる。",
      say: "メニー スチューデンツ ユーズ ディス ルーム、なら、ディス ルームを主語に。主語は単数、現在だから、イズ ユーズド。ディス ルーム イズ ユーズド バイ メニー スチューデンツ。ビーは、新しい主語と、時制に合わせる。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "小説でも試す。生き物が初めて目を開ける場面の a convulsive motion agitated its limbs。受動態なら Its limbs were agitated by a convulsive motion. 主語が「手足」に入れかわり、読者の目が体そのものに向く。",
      say: "小説でも試す。いきものが、初めてめを開ける場面の、ア コンヴァルシヴ モーション アジテイティッド イッツ リムズ。受動態なら、イッツ リムズ ワー アジテイティッド バイ ア コンヴァルシヴ モーション。主語が、手足に入れかわり、読者のめが、体そのものに向く。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ「窓は風で割られた」は、過去のことだから The window was broke by the wind. ですね。",
      say: "じゃあ、窓は風で割られた、は、過去のことだから、ザ ウィンドウ ワズ ブローク バイ ザ ウィンド、ですね。",
    },
    { kind: "talk", who: "sensei", text: "ここで差がつく。問題。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "過去を表すのは was。後ろは{{いつも過去分詞}}。by の後ろの代名詞も目的格で、by him・by them。そして目的語のない文、自動詞の文は受動態にできない。",
      say: "過去を表すのは、ワズ。うしろは、いつも過去分詞。バイのうしろの代名詞も、目的格で、バイ ヒム、バイ ゼム。そして、目的語のない文、自動詞の文は、受動態にできない。",
    },

    { kind: "chapter", title: "2. 時制は be が背負う" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "一言でいうと、{{時制は be の形}}で表す。過去分詞はそのまま、be だけが is → was → will be → has been と姿を変える。",
      say: "ひとことでいうと、時制は、ビーのかたちで表す。過去分詞はそのまま、ビーだけが、イズ、ワズ、ウィル ビー、ハズ ビーン、と姿を変える。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "be being ＋過去分詞" },
      text: "He has written the letter. は The letter {{has been written}}. They are building a bridge. は A bridge {{is being built}}. 助動詞があれば{{助動詞＋be＋過去分詞}}。では確認。",
      say: "ヒー ハズ リトゥン ザ レター、は、ザ レター ハズ ビーン リトゥン。ゼイ アー ビルディング ア ブリッジ、は、ア ブリッジ イズ ビーイング ビルト。助動詞があれば、助動詞、たす、ビー、たす、過去分詞。では確認。",
    },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "序文に戻る。has been supposed は{{完了形の受動態}}で「昔から今まで考えられてきた」。続く I shall not be supposed … は助動詞＋be で「わたしが〜と思われることはないだろう」。",
      say: "序文に戻る。ハズ ビーン サポーズドは、かんりょうけいの受動態で、昔から今まで、考えられてきた。続く、アイ シャル ノット ビー サポーズドは、助動詞、たす、ビーで、わたしが、なになにと思われることは、ないだろう。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ダーウィン博士とは、チャールズ・ダーウィンの祖父、エラズマス・ダーウィン。死んだものに命がもどるという考えが、当時まじめに論じられていたことを、この1文が伝えている。",
      say: "ダーウィン博士とは、チャールズ ダーウィンの祖父、エラズマス ダーウィン。死んだものに、命がもどるという考えが、当時、まじめに論じられていたことを、この1文が伝えている。",
    },

    { kind: "chapter", title: "3. by を言わない、by 以外を使う" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "実際の英文では、受動態の8割ほどは by 〜をつけないといわれる。する人が{{分からない}}、{{言う必要がない}}、{{わざと伏せたい}}。序文の結びの The following tale is the only one which has been completed. も、書き上げた人を伏せている。",
      say: "実際の英文では、受動態の8わりほどは、バイ なになにを、つけないといわれる。するひとが、わからない、言う必要がない、わざと伏せたい。序文の結びの、ザ フォロウイング テイル イズ ジ オンリー ワン フィッチ ハズ ビーン コンプリーティッド、も、かきあげたひとを、伏せている。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そもそも1818年の初版の扉には、作者の名前がない。メアリー・シェリーの名前が載ったのは1823年の第2版から。by 〜がない受動態は「する人を言わないことを選んだ」文だ。",
      say: "そもそも、1818ねんの初版の扉には、作者の名前がない。メアリー シェリーの名前が載ったのは、1823ねんの、第2版から。バイ なになにがない受動態は、するひとを、言わないことを選んだ文だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "interested in" },
      text: "by 以外の前置詞をとる熟語もある。{{be surprised at}}・{{be interested in}}・be covered with・be known to。材料なら be made of、形が変わった原料なら be made from。",
      say: "バイ以外の前置詞をとる熟語もある。ビー サプライズド アット、ビー インタレスティッド イン、ビー カバード ウィズ、ビー ノウン トゥ。材料なら、ビー メイド オブ、かたちが変わった原料なら、ビー メイド フロム。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "「歴史に興味がある」なら、歴史はおもしろいから I am interesting in history. ですよね。",
      say: "歴史に興味がある、なら、歴史はおもしろいから、アイ アム インタレスティング イン ヒストリー、ですよね。",
    },
    { kind: "talk", who: "sensei", text: "いちばん落とす所。問題。", say: "いちばん落とすところ。問題。" },
    { kind: "pause", ref: "mistake:2" },

    { kind: "chapter", title: "謎解き：主役を頭、名前を最後に" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "では謎解き。英語は、すでに話題のもの（旧情報）を文の頭に、新しく伝えたいこと（新情報）を終わりに置くと、すっと入る。序文の主役は「この物語のもとになった出来事」。だからそれを主語にして頭へ。",
      say: "では謎解き。英語は、すでに話題のもの、旧情報を、文の頭に、新しく伝えたいこと、新情報を、終わりに置くと、すっと入る。序文の主役は、この物語の、もとになった出来事。だから、それを主語にして、頭へ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そして聞かせたい権威の名前 Dr. Darwin を、by で{{文の終わり}}に回した。ポイントは2つ。主役を頭に置く力と、by を省いて伏せる力。この本は序文の中で両方を使い分けていた。",
      say: "そして、聞かせたい権威の名前、ドクター ダーウィンを、バイで、文の終わりに回した。ポイントは2つ。主役を頭に置く力と、バイを省いて、伏せる力。この本は、序文のなかで、両方をつかいわけていた。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "だから字幕も「この物語のもとになった出来事は――ダーウィン博士たちも、ありうると考えていた」と、名前を最後にひびかせればいいんですね。",
      say: "だから字幕も、この物語の、もとになった出来事は、ダーウィン博士たちも、ありうると考えていた、と、名前を最後に、ひびかせればいいんですね。",
    },

    { kind: "chapter", title: "4. 目的語が2つ、補語がある文" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "SVOO は目的語が2つだから、受動態も2通り。My aunt gave me this watch. は、I was given this watch by my aunt. と、This watch was given {{to}} me by my aunt. 物が主語なら、人の前に to。",
      say: "エスブイオーオーは、目的語が2つだから、受動態も2とおり。マイ アント ゲイヴ ミー ディス ウォッチ、は、アイ ワズ ギヴン ディス ウォッチ バイ マイ アント、と、ディス ウォッチ ワズ ギヴン トゥ ミー バイ マイ アント。ものが主語なら、ひとのまえに、トゥ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "SVOC" },
      text: "SVOC は O が主語になり、{{C はそのまま}}残る。People often call the creature Frankenstein. は The creature is often called Frankenstein. 本当は造った科学者の名前なのに、だ。",
      say: "エスブイオーシーは、オーが主語になり、シーは、そのまま残る。ピープル オフン コール ザ クリーチャー フランケンシュタイン、は、ザ クリーチャー イズ オフン コールド フランケンシュタイン。本当は、造った科学者の名前なのに、だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "使役の make も同じで、C の原形がそのまま残るから He was made clean the room. ですか？",
      say: "使役のメイクも同じで、シーの原形が、そのまま残るから、ヒー ワズ メイド クリーン ザ ルーム、ですか？",
    },
    { kind: "talk", who: "sensei", text: "最後の落とし穴。問題。" },
    { kind: "pause", ref: "mistake:3" },
    {
      kind: "talk",
      who: "sensei",
      text: "能動態の make 人＋原形が、受動態では{{to ＋原形}}。He was made to feel lonely. 造られ、名前もなく、孤独に置かれた生き物の物語は、受動態そのものだともいえる。",
      say: "能動態の、メイク、ひと、たす、原形が、受動態では、トゥ、たす、原形。ヒー ワズ メイド トゥ フィール ロンリー。造られ、名前もなく、孤独に置かれたいきものの物語は、受動態そのものだとも、いえる。",
    },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "sensei",
      text: "次はきみが講師だ。キーワードは、3手順、時制は be、by を伏せる、旧情報と新情報、C はそのまま。この順につないで、字幕翻訳者に説明してみよう。",
      say: "次はきみが講師だ。キーワードは、3手順、時制はビー、バイを伏せる、旧情報と新情報、シーは、そのまま。この順につないで、字幕翻訳者に説明してみよう。",
    },
  ],
};
