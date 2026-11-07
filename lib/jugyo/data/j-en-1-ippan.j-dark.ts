import type { CastScript } from "../types";

// 止まる授業：一般動詞（中1・英語）× ダーク解説（ヨトバリ・ミカゲ）。事実・例文・人名・年は lib/lecture/data/j-en-1-ippan.ts の本文だけ。
// 英文は say でカタカナに開く。詩・聖書・劇の英文は本文にある部分だけを引き、作中の人物や作者のせりふは作らない。問題は data/j-en-1-ippan.ts から引く。

export const IPPAN_J_DARK: CastScript = {
  unitId: "j-en-1-ippan",
  castId: "j-dark",
  title: "なぜ he のときだけ、しっぽがつく？：知識の書「一般動詞」の封印を解く",
  scenes: [
    { kind: "chapter", title: "序章：maketh と plays" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "……来たか。我が名はヨトバリ。今宵ひらくのは「一般動詞」と記された知識の書だ。",
      say: "……来たか。わがなはヨトバリ。こよい、ひらくのは、いっぱんどうし、と記された、知識の書だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "相棒のミカゲ。依頼人は市立図書館の司書。英語の名作の朗読会で、中学1年生に「聖書は maketh、シェイクスピアは plays。なんで he のときだけしっぽがつくの？」と聞かれ、答えにつまったそうよ。",
      say: "相棒のミカゲ。いらいにんわ、市立図書館の司書。英語の名作の、朗読会で、中学1年生に、聖書は、メイケス。シェイクスピアは、プレイズ。なんで、ヒーのときだけ、しっぽがつくの、と聞かれ、答えに、つまったそうよ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "英語は I play、you play、they play と形を変えぬ。なのに he・she・it のときだけ、動詞にしっぽがつく。……開け、知識の書。",
      say: "英語は、アイ プレイ、ユー プレイ、ゼイ プレイ、と、かたちを変えぬ。なのに、ヒー、シー、イットのときだけ、動詞に、しっぽがつく。……ひらけ、知識の書。",
    },

    { kind: "chapter", title: "第一章：動詞の席はひとつ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "英語の動詞は二つに分かれる。am・are・is の{{be動詞}}は、主語と説明をイコールでつなぐ。play・like・have・see などの{{一般動詞}}は、動作や気持ち・状態を表す。",
      say: "英語の動詞は、ふたつにわかれる。アム、アー、イズの、ビー動詞は、主語と説明を、イコールでつなぐ。プレイ、ライク、ハブ、シーなどの、一般動詞は、動作や、気持ち、状態を表す。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "1885年、スティーヴンソンの詩「ぼくの影」ね。He is very, very like me は is で説明。I see him jump before me は see と jump で動きをえがく。説明の文と動きの文が交互に来るのよ。",
      say: "1885ねん、スティーヴンソンの詩、ぼくのかげ、ね。ヒー イズ ベリー ベリー ライク ミーは、イズで説明。アイ シー ヒム ジャンプ ビフォー ミーは、シーと、ジャンプで、動きをえがく。説明の文と、動きの文が、交互に来るのよ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "なら両方使えば最強でしょう。「わたしはピアノをひく」は I am play the piano.",
      say: "なら、両方使えば、最強でしょう。わたしは、ピアノをひく、は、アイ アム プレイ ザ ピアノ。",
    },
    { kind: "talk", who: "sensei", text: "……その答え、試させてもらおう。" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "I play tennis." },
      text: "am も play も、文の中心にある「動詞の席」にすわる。席は一つ。だから I play the piano. だ。英語の文のほとんどは、この一般動詞の文なのだ。",
      say: "アムも、プレイも、文の中心にある、動詞の席に、すわる。席は、ひとつ。だから、アイ プレイ ザ ピアノ、だ。英語の文の、ほとんどは、この、一般動詞の文なのだ。",
    },

    { kind: "chapter", title: "第二章：ひとりか、何人か" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "話し手の I は1人称、聞き手の you は2人称、それ以外は3人称。3人称のうち、1人・1つのものが{{3人称単数}}だ。そのとき動詞に -s をつけ、Ken plays soccer. とする。",
      say: "はなしての、アイは、いちにんしょう。ききての、ユーは、ににんしょう。それ以外は、さんにんしょう。さんにんしょうのうち、ひとり、ひとつのものが、さんにんしょう単数だ。そのとき、動詞に、エスをつけ、ケン プレイズ サッカー、とする。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "1599年ごろ、シェイクスピアの『お気に召すまま』。They have their exits and their entrances の主語は複数の they で have。one man in his time plays many parts は one man で plays だ。",
      say: "1599ねんごろ、シェイクスピアの、おきにめすまま。ゼイ ハブ ゼア イグジッツ アンド ゼア エントランシズの主語は、複数の、ゼイで、ハブ。ワン マン イン ヒズ タイム プレイズ メニー パーツは、ワン マンで、プレイズだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "要するに I と you 以外なら -s。だから Ken and Mari plays soccer. ね。二人とも I じゃないもの。",
      say: "要するに、アイと、ユー以外なら、エス。だから、ケン アンド マリ プレイズ サッカー、ね。ふたりとも、アイじゃないもの。",
    },
    { kind: "talk", who: "sensei", text: "ふっ。次の封印だ。" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "2人・2つ以上" },
      text: "we・they・Ken and Mari は2人以上、複数だ。動詞の小さな s は、主語が1人なのか、何人もいるのかを教えるしるしなのだ。",
      say: "ウィー、ゼイ、ケン アンド マリは、ふたり以上、複数だ。動詞の小さな、エスは、主語が、ひとりなのか、なんにんもいるのかを、教える、しるしなのだ。",
    },

    { kind: "chapter", title: "第三章：三つの付け方" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "ふつうは{{そのまま -s}}、like は likes。s・x・sh・ch・o で終われば{{-es}}、watch は watches、go は goes。「子音字＋y」の study は{{y を i にかえて -es}}、studies。play はそのまま plays だ。",
      say: "ふつうは、そのまま、エス。ライクは、ライクス。エス、エックス、エスエイチ、シーエイチ、オーで終われば、イーエス。ウォッチは、ウォッチズ。ゴーは、ゴーズ。子音字プラスワイの、スタディは、ワイをアイにかえて、イーエス。スタディーズ。プレイは、そのまま、プレイズだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "ディキンソンの詩「希望」も主語は Hope 一つ。だから perches・sings・stops。perch は ch で終わるから -es ね。",
      say: "ディキンソンの詩、きぼうも、主語は、ホープ、ひとつ。だから、パーチズ、スィングズ、スタップス。パーチは、シーエイチで終わるから、イーエスね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "では問う。表のいちばん下の一語だけは、つけ方がちがう。",
      say: "では問う。表の、いちばんしたの、ひとつの単語だけは、つけかたがちがう。",
    },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "have → has" },
      text: "have だけは特別で、has に形が変わる。My mother has a car. 主語の my mother は3人称単数だからな。",
      say: "ハブだけは、特別で、ハズに、かたちが変わる。マイ マザー ハズ ア カー。主語の、マイ マザーは、さんにんしょう単数だからな。",
    },

    { kind: "chapter", title: "第四章：手伝い役 does" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "否定文は動詞の前に do not、疑問文は文の頭に Do。主語が3人称単数なら does だ。Ken does not play tennis. Does Ken play tennis? does に -s が移ったので、動詞は{{原形}}にもどる。",
      say: "否定文は、動詞の前に、ドゥー ノット。疑問文は、文の頭に、ドゥー。主語が、さんにんしょう単数なら、ダズだ。ケン ダズ ノット プレイ テニス。ダズ ケン プレイ テニス。ダズに、エスが移ったので、動詞は、原形にもどる。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でも she は3人称単数なのよ。念のため like にも -s をつけて She doesn't likes cats. これで二重に安全でしょう。",
      say: "でも、シーは、さんにんしょう単数なのよ。ねんのため、ライクにも、エスをつけて、シー ダズント ライクス キャッツ。これで、にじゅうに、安全でしょう。",
    },
    { kind: "talk", who: "sensei", text: "最後の封印だ。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "does not play" },
      text: "-s は一つの文に1回だけ。マザーグースの I do not like thee, Doctor Fell; も do not＋原形だ。シェイクスピアのころは I know not のような否定もあったが、やがてこの形がふつうになった。",
      say: "エスは、ひとつの文に、いっかいだけ。マザーグースの、アイ ドゥー ノット ライク ジー、ドクター フェルも、ドゥー ノット、プラス原形だ。シェイクスピアのころは、アイ ノウ ノットのような否定もあったが、やがて、このかたちが、ふつうになった。",
    },

    { kind: "chapter", title: "第五章：千年の生き残り" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4 },
      text: "千年ほど前の英語では、動詞は主語ごとに語尾をもっていた。I love、thou lovest、he {{loveth}}。thou は今の you にあたる親しい呼びかけだ。1611年の{{欽定訳聖書}}は、この -eth で書かれている。",
      say: "千年ほど前の英語では、動詞は、主語ごとに、語尾をもっていた。アイ ラブ、ザウ ラヴェスト、ヒー ラヴェス。ザウは、今のユーにあたる、親しい呼びかけだ。1611ねんの、きんていやくせいしょは、この、イーティーエイチで、書かれている。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "いっぽうイングランド北部では、3人称単数の語尾は早くから -s。それが南へ広がって、17世紀のうちにふつうになった。doth は does、hath は has に。",
      say: "いっぽう、イングランド北部では、さんにんしょう単数の語尾は、早くから、エス。それが、南へ広がって、17世紀のうちに、ふつうになった。ダスは、ダズ。ハスは、ハズに。",
    },
    {
      kind: "talk",
      who: "seito",
      card: "reveal",
      text: "……わかった。ほかの人称の語尾はすり減って消え、thou も使われなくなった。最後に残ったのが3人称単数の -s。he のときだけしっぽがつくのは、それが{{ただ1つの生き残り}}だからね。",
      say: "……わかった。ほかの人称の語尾は、すり減って消え、ザウも、使われなくなった。最後に残ったのが、さんにんしょう単数の、エス。ヒーのときだけ、しっぽがつくのは、それが、ただひとつの、いき残りだからね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "線は、つながった。He maketh me to lie down in green pastures の maketh は、今の英語なら makes。小さな s の向こうに、千年分の英語の旅が見える。",
      say: "線は、つながった。ヒー メイケス ミー トゥー ライ ダウン イン グリーン パスチャーズの、メイケスは、今の英語なら、メイクス。小さな、エスの向こうに、千年分の、英語の旅が見える。",
    },

    { kind: "chapter", title: "終章" },
    {
      kind: "talk",
      who: "sensei",
      text: "封印は解かれた。朗読会では maketh と makes を読みくらべるがいい。次に英文を書くとき、主語が1人か何人か、動詞の席に何がすわるかを確かめよ。",
      say: "封印は、解かれた。朗読会では、メイケスと、メイクスを、読みくらべるがいい。次に、英文を書くとき、主語が、ひとりか、なんにんか。動詞の席に、なにがすわるかを、確かめよ。",
    },
  ],
};
