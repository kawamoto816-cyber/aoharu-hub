import type { CastScript } from "../types";

// 止まる授業：There is / are（中2・英語）× ダーク解説（ヨトバリ・ミカゲ）。事実・例文・人名・年は lib/lecture/data/j-en-2-there.ts の本文だけ。
// 英文は say でカタカナに開く。名作の言葉は lecture にある英文だけを引き、登場人物のせりふは作らない。問題は data/j-en-2-there.ts から引く。

export const J_THERE_J_DARK: CastScript = {
  unitId: "j-en-2-there",
  castId: "j-dark",
  title: "どこも指さない there：知識の書「There is / are」の封印を解く",
  scenes: [
    { kind: "chapter", title: "序章：ドロシーの一言" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "……来たか。我が名はヨトバリ。今宵ひらくのは「There is / are」と記された知識の書だ。",
      say: "……来たか。わがなはヨトバリ。こよい、ひらくのは、ゼア イズ、ゼア アー、と記された、知識の書だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "相棒のミカゲ。依頼人は深夜ラジオのDJ。毎晩、英語の名作の一言を流していて、先週は『オズの魔法使い』のドロシーの There is no place like home.。",
      say: "相棒のミカゲ。依頼人は、深夜ラジオの、ディージェー。毎晩、英語の名作の一言を、流していて、先週は、オズの魔法使いの、ドロシーの、ゼア イズ ノー プレイス ライク ホーム。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "中学生のリスナーから「Home is the best place. じゃだめなの？　そもそも there って、どこ？」と届いたそうよ。",
      say: "中学生のリスナーから、ホーム イズ ザ ベスト プレイス、じゃだめなの？　そもそも、ゼアって、どこ？　と、届いたそうよ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "there は「そこに」のはず。なのに、どこも指さない。この謎は、最後に一本の線でつながる。……開け、知識の書。",
      say: "ゼアは、そこに、のはず。なのに、どこも指さない。この謎は、最後に一本の線でつながる。……ひらけ、知識の書。",
    },

    { kind: "chapter", title: "第一章：存在を告げる合図" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "There is a cat on the desk. は「机の上にねこがいる」。この there を「そこに」と訳せば、場所が2つになってしまう。これは「何かがある・いる」と知らせる{{合図}}だ。",
      say: "ゼア イズ ア キャット オン ザ デスク。は、机のうえに、ねこがいる。このゼアを、そこに、と訳せば、ばしょが2つになってしまう。これは、何かがある、いる、と知らせる、合図だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "on the desk" },
      text: "語順は There is ＋ あるもの ＋ 場所。場所は on the desk や near the station のように前置詞で表す。本当の主語は、be動詞の{{後ろの名詞}}だ。",
      say: "語順は、ゼア イズ、たす、あるもの、たす、ばしょ。ばしょは、オン ザ デスクや、ニア ザ ステーションのように、前置詞で表す。本当の主語は、ビー動詞の、うしろの名詞だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "Look! Your cat is over there. の there は、本当に「あそこ」を指して強く言う。構文の there は、軽く短く「ゼァ」ね。",
      say: "ルック！　ユア キャット イズ オーバー ゼア。のゼアは、本当に、あそこを指して、強く言う。構文のゼアは、軽く短く、ゼァ、ね。",
    },

    {
      kind: "talk",
      who: "sensei",
      text: "道をたずねる Is there a convenience store near here? は「この近くにコンビニはありますか」。旅先でそのまま使える一文だ。",
      say: "道をたずねる、イズ ゼア ア コンビニエンス ストア ニア ヒア？　は、この近くに、コンビニは、ありますか。旅先で、そのまま使える、一文だ。",
    },
    { kind: "chapter", title: "第二章：後ろを見よ" },
    {
      kind: "talk",
      who: "seito",
      text: "ねこが2ひきでも、文は There で始まる。There の形は変わらない。だから There is three books on the desk.。……当然でしょう。",
      say: "ねこが2ひきでも、文は、ゼアで始まる。ゼアのかたちは、変わらない。だから、ゼア イズ スリー ブックス オン ザ デスク。……当然でしょう。",
    },
    { kind: "talk", who: "sensei", text: "主語はどこにある。最初の封印だ。", say: "主語は、どこにある。最初の封印だ。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "There are two parks." },
      text: "There is a park in my town. と There are two parks in my town.。後ろが1つなら is、2つ以上なら are。過去なら is は{{was}}、are は{{were}}になる。",
      say: "ゼア イズ ア パーク イン マイ タウン。と、ゼア アー トゥー パークス イン マイ タウン。うしろが1つなら、イズ。2つ以上なら、アー。過去なら、イズは、ワズ。アーは、ワーになる。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "この are が響く名ぜりふがある。1600年ごろの『ハムレット』。うろたえる親友ホレイショーに、王子は There are more things in heaven and earth と言い返した。more things が複数だから are だ。",
      say: "このアーが、響く名ぜりふがある。1600ねんごろの、ハムレット。うろたえる親友、ホレイショーに、王子は、ゼア アー モア シングズ イン ヘブン アンド アース、と言い返した。モア シングズが、複数だから、アーだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "きみの学問ではとらえきれないものが、この世にはまだまだ存在する。……400年後の今も、ふしぎな出来事を語るときに引用される一行ね。",
      say: "きみの学問では、とらえきれないものが、このよには、まだまだ存在する。……400ねんごの、いまも、ふしぎな出来事を語るときに、引用される、いちぎょうね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "なら water は？　びんの牛乳、コップの水。量があるなら are でもいいでしょう。",
      say: "なら、ウォーターは？　びんの牛乳、コップの水。量があるなら、アーでもいいでしょう。",
    },
    { kind: "talk", who: "sensei", text: "水は数えられるか。次の封印だ。", say: "水は、かぞえられるか。次の封印だ。" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "water や milk は数えられない名詞。単数あつかいで is。There is some milk in the bottle.。some のあとでも、名詞が複数なら are だ。",
      say: "ウォーターや、ミルクは、かぞえられない名詞。単数あつかいで、イズ。ゼア イズ サム ミルク イン ザ ボトル。サムのあとでも、名詞が複数なら、アーだ。",
    },

    { kind: "chapter", title: "第三章：打ち消しと問い" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "否定は be動詞のあとに not。There isn't a bank near here.。疑問は be動詞を there の前へ。Is there a bank near here?。数は How many ＋ 複数名詞 ＋ are there 〜? でたずねる。",
      say: "否定は、ビー動詞のあとに、ノット。ゼア イズント ア バンク ニア ヒア。疑問は、ビー動詞を、ゼアのまえへ。イズ ゼア ア バンク ニア ヒア？　かずは、ハウ メニー、たす、複数名詞、たす、アー ゼア、でたずねる。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "How many students are there in your class? で「クラスに生徒は何人いますか」。How many のあとは必ず複数形だ。",
      say: "ハウ メニー スチューデンツ アー ゼア イン ユア クラス？　で、クラスに、生徒は、なんにんいますか。ハウ メニーのあとは、必ず、複数形だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "疑問文は Are there で始めるのが響きがいい。答えは「それはある」で Yes, it is.。Are there a library near here? — Yes, it is.",
      say: "疑問文は、アー ゼアで始めるのが、響きがいい。答えは、それはある、で、イエス、イット イズ。アー ゼア ア ライブラリー ニア ヒア？　イエス、イット イズ。",
    },
    { kind: "talk", who: "sensei", text: "……二つ、外した。三つ目の封印だ。", say: "……ふたつ、外した。みっつめの封印だ。" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "— Yes, there is. / No, there isn't." },
      text: "「1つもない」は名詞の前に no。There are no clouds in the sky.。not よりも「ゼロだ」と言い切る強さがある。",
      say: "1つもない、は、名詞のまえに、ノー。ゼア アー ノー クラウズ イン ザ スカイ。ノットよりも、ゼロだ、と言い切る、強さがある。",
    },

    { kind: "chapter", title: "第四章：新しいものを、後ろに" },
    {
      kind: "talk",
      who: "seito",
      board: { section: 3 },
      text: "なら「私のペンはテーブルの上にある」も There で言える。There is my pen on the table.。",
      say: "なら、わたしのペンは、テーブルのうえにある、も、ゼアで言える。ゼア イズ マイ ペン オン ザ テーブル。",
    },
    { kind: "talk", who: "sensei", text: "そのペンは、相手の知らないものか。最後の封印だ。", say: "そのペンは、相手の、知らないものか。最後の封印だ。" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "sensei",
      text: "英語は、相手がまだ知らない{{新しい情報}}を文の後ろに置く。There 構文は、頭を軽い there でうめて、新しいものを後ろに登場させる形だ。my pen のような特定のものは、主語にして言う。",
      say: "英語は、相手がまだ知らない、新しい情報を、文のうしろに置く。ゼア構文は、あたまを、軽いゼアでうめて、新しいものを、うしろに登場させる、かたちだ。マイ ペンのような、特定のものは、主語にして言う。",
    },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "Home is the best place. は、家を評価するだけの文。だが There is no place like home. は、どこも指さない there で世界じゅうを見わたし、「家のような場所は、どこにも存在しない」と言い切る。",
      say: "ホーム イズ ザ ベスト プレイス。は、いえを評価するだけの文。だが、ゼア イズ ノー プレイス ライク ホーム。は、どこも指さないゼアで、世界じゅうを見わたし、いえのような場所は、どこにも存在しない、と言い切る。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "……なるほどね。存在そのものを打ち消すから、この一言は強い。",
    },
    { kind: "talk", who: "sensei", text: "there は場所ではなく、存在を知らせる合図。……線は、つながった。", say: "ゼアは、ばしょではなく、存在を知らせる合図。……線は、つながった。" },

    { kind: "chapter", title: "終章：物語は There で始まる" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4 },
      text: "昔話は Once upon a time, there was …… で始まる。聞き手のまだ知らない登場人物を紹介するからだ。1611年の『欽定訳聖書』でも、光が生まれる場面は Let there be light: and there was light. と、11語で語られる。",
      say: "昔話は、ワンス アポン ア タイム、ゼア ワズ、で始まる。ききての、まだ知らない、登場人物を、紹介するからだ。1611ねんの、きんていやく聖書でも、光がうまれる場面は、レット ゼア ビー ライト、アンド ゼア ワズ ライト。と、11語で語られる。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "2人以上なら there were。There were three little pigs. で「3びきの子ぶたがいました」ね。",
      say: "ふたり以上なら、ゼア ワー。ゼア ワー スリー リトル ピッグズ。で、3びきの、子ぶたがいました、ね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "依頼人は来週の放送で、この一言の重みをリスナーに伝えるそうよ。",
      say: "依頼人は、来週の放送で、この一言の重みを、リスナーに伝えるそうよ。",
    },
    { kind: "talk", who: "sensei", text: "封印は解かれた。何かが現れる瞬間を、there は告げる。次は、きみの言葉で使う番だ。", say: "封印は解かれた。何かが現れる瞬間を、ゼアは告げる。次は、きみのことばで、使う番だ。" },
  ],
};
