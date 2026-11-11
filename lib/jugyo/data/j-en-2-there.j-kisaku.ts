import type { CastScript } from "../types";

// 止まる授業：There is / are（中2・英語）× 気さくな兄・姉（アサヒ兄さん・スミレ姉さん）。事実・例文・人名・年は lib/lecture/data/j-en-2-there.ts の本文だけ。
// 雑談の調子で、うろ覚えを「わたしもそう覚えてた」と言って直していく。英文は say でカタカナに開く。
// 名作の言葉は lecture にある英文だけを引き、登場人物のせりふは作らない。問題は data/j-en-2-there.ts から引く。

export const J_THERE_J_KISAKU: CastScript = {
  unitId: "j-en-2-there",
  castId: "j-kisaku",
  title: "there は「そこ」じゃなかった：There is / are のしくみ",
  scenes: [
    { kind: "chapter", title: "つかみ：深夜ラジオの相談" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "よっ、アサヒです。今日は深夜ラジオのDJさんから相談。毎晩、英語の名作の一言を紹介してて、先週は『オズの魔法使い』の There is no place like home. を流したんだって。",
      say: "よっ、アサヒです。きょうは、深夜ラジオの、ディージェーさんから相談。毎晩、英語の名作の一言を、紹介してて、先週は、オズの魔法使いの、ゼア イズ ノー プレイス ライク ホーム。を流したんだって。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "スミレです。ドロシーの言葉だよね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そう。で、中学生から「Home is the best place. じゃだめなの？　そもそも there って、どこ？」ってメッセージが来たらしい。",
      say: "そう。で、中学生から、ホーム イズ ザ ベスト プレイス、じゃだめなの？　そもそも、ゼアって、どこ？　って、メッセージが来たらしい。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "there って「そこに」だよね。わたしもそう覚えてた。",
      say: "ゼアって、そこに、だよね。わたしも、そう覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "そこ、最後にちゃんとつながるから、語順から見ていこう。", say: "そこ、最後に、ちゃんとつながるから、語順から見ていこう。" },

    { kind: "chapter", title: "1. There is ＋ もの ＋ 場所" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "There is a cat on the desk. は「机の上にねこがいる」。この there を「そこに」って訳すと、場所が2つになっちゃうでしょ。だから訳さないで、There is をひとまとまりで「〜がある・いる」って考えるんだ。",
      say: "ゼア イズ ア キャット オン ザ デスク。は、机のうえに、ねこがいる。このゼアを、そこに、って訳すと、ばしょが2つに、なっちゃうでしょ。だから、訳さないで、ゼア イズを、ひとまとまりで、がある、いる、って考えるんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "on the desk" },
      text: "語順は There is ＋ あるもの ＋ 場所。場所は on the desk とか under the bed みたいに前置詞で言う。本当の主語は、be動詞の{{後ろの名詞}}なんだよ。",
      say: "語順は、ゼア イズ、たす、あるもの、たす、ばしょ。ばしょは、オン ザ デスクとか、アンダー ザ ベッドみたいに、前置詞で言う。本当の主語は、ビー動詞の、うしろの名詞なんだよ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "Your cat is over there. の there は、ほんとに「あそこ」を指すほうだね。こっちは強く、構文のほうは軽く「ゼァ」か。",
      say: "ユア キャット イズ オーバー ゼア。のゼアは、ほんとに、あそこを指すほうだね。こっちは強く、構文のほうは、軽く、ゼァ、か。",
    },

    {
      kind: "talk",
      who: "sensei",
      text: "道をたずねるなら Is there a convenience store near here?。「この近くにコンビニはありますか」。旅先でそのまま使えるよ。",
      say: "道をたずねるなら、イズ ゼア ア コンビニエンス ストア ニア ヒア？　この近くに、コンビニは、ありますか。旅先で、そのまま使えるよ。",
    },
    { kind: "chapter", title: "2. is か are か" },
    {
      kind: "talk",
      who: "seito",
      text: "で、There のあとはいつも is じゃなかった？　There is three books on the desk. って、わたしもそう覚えてた。",
      say: "で、ゼアのあとは、いつもイズじゃなかった？　ゼア イズ スリー ブックス オン ザ デスク。って、わたしも、そう覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "主語がどこにあるか、思い出してみて。ここで問題。", say: "主語が、どこにあるか、思い出してみて。ここで問題。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "There are two parks." },
      text: "There is a park in my town. と There are two parks in my town.。後ろが1つなら is、2つ以上なら are。過去の話なら is が{{was}}、are が{{were}}になるよ。",
      say: "ゼア イズ ア パーク イン マイ タウン。と、ゼア アー トゥー パークス イン マイ タウン。うしろが1つなら、イズ。2つ以上なら、アー。過去の話なら、イズが、ワズ。アーが、ワーになるよ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "1600年ごろの『ハムレット』にも、There are more things in heaven and earth って一行がある。more things が複数だから are なんだ。",
      say: "1600ねんごろの、ハムレットにも、ゼア アー モア シングズ イン ヘブン アンド アース、って、いちぎょうがある。モア シングズが、複数だから、アーなんだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "「きみの学問ではとらえきれないものが、この世にはまだまだある」ってことか。400年後の今も引用されてるんだって。",
      say: "きみの学問では、とらえきれないものが、このよには、まだまだある、ってことか。400ねんごの、いまも、引用されてるんだって。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ water みたいに、コップにたくさん入ってるのは？　are でいい気がする。",
      say: "じゃあ、ウォーターみたいに、コップに、たくさん入ってるのは？　アーで、いいきがする。",
    },
    { kind: "talk", who: "sensei", text: "水って、1つ2つって数えられる？　ここで問題。", say: "水って、1つ、2つって、かぞえられる？　ここで問題。" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "water や milk は数えられない名詞だから、単数あつかいで is。There is some milk in the bottle.。some がついても、名詞が複数なら are だよ。",
      say: "ウォーターや、ミルクは、かぞえられない名詞だから、単数あつかいで、イズ。ゼア イズ サム ミルク イン ザ ボトル。サムがついても、名詞が複数なら、アーだよ。",
    },

    { kind: "chapter", title: "3. 否定文と疑問文" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "否定は be動詞のあとに not で、There isn't a bank near here.。疑問は be動詞を there の前に出して、Is there a bank near here?。数なら How many ＋ 複数名詞 ＋ are there 〜? だね。",
      say: "否定は、ビー動詞のあとに、ノットで、ゼア イズント ア バンク ニア ヒア。疑問は、ビー動詞を、ゼアのまえに出して、イズ ゼア ア バンク ニア ヒア？　かずなら、ハウ メニー、たす、複数名詞、たす、アー ゼア、だね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "How many students are there in your class? なら「クラスに生徒は何人いますか」。How many のあとは必ず複数形ね。",
      say: "ハウ メニー スチューデンツ アー ゼア イン ユア クラス？　なら、クラスに、生徒は、なんにんいますか。ハウ メニーのあとは、必ず、複数形ね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "Are there a library near here? って聞いて、答えは Yes, it is.。わたしもそう覚えてた。",
      say: "アー ゼア ア ライブラリー ニア ヒア？　って聞いて、答えは、イエス、イット イズ。わたしも、そう覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "ちょっと立ち止まろう。ここで問題。" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "— Yes, there is. / No, there isn't." },
      text: "答えも there で、Yes, there is. / No, there isn't.。それと「1つもない」は、名詞の前に no でも言える。There are no clouds in the sky.。not より「ゼロだ」って言い切る感じが強いんだ。",
      say: "答えも、ゼアで、イエス、ゼア イズ。ノー、ゼア イズント。それと、1つもない、は、名詞のまえに、ノーでも言える。ゼア アー ノー クラウズ イン ザ スカイ。ノットより、ゼロだ、って言い切る感じが、強いんだ。",
    },

    { kind: "chapter", title: "4. 特定のものには使わない" },
    {
      kind: "talk",
      who: "seito",
      board: { section: 3 },
      text: "じゃあ「私のペンはテーブルの上にある」は There is my pen on the table.？",
      say: "じゃあ、わたしのペンは、テーブルのうえにある、は、ゼア イズ マイ ペン オン ザ テーブル？",
    },
    { kind: "talk", who: "sensei", text: "そのペン、相手はもう知ってるよね。ここで問題。", say: "そのペン、相手は、もう知ってるよね。ここで問題。" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "sensei",
      text: "英語には、相手がまだ知らない{{新しい情報}}を文の後ろに置くっていう好みがある。There 構文は、頭を軽い there でうめて、新しいものを後ろに出すための形なんだ。my pen みたいに分かってるものは主語にする。",
      say: "英語には、相手がまだ知らない、新しい情報を、文のうしろに置くっていう、好みがある。ゼア構文は、あたまを、軽いゼアでうめて、新しいものを、うしろに出すための、かたちなんだ。マイ ペンみたいに、わかってるものは、主語にする。",
    },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "で、ドロシーの一言。Home is the best place. は、家を「いちばんいい」って評価する文。There is no place like home. は、どこも指さない there で世界じゅうを見わたして、「家のような場所は、どこにも存在しない」って言い切ってるんだよ。",
      say: "で、ドロシーの一言。ホーム イズ ザ ベスト プレイス。は、いえを、いちばんいい、って評価する文。ゼア イズ ノー プレイス ライク ホーム。は、どこも指さないゼアで、世界じゅうを見わたして、いえのような場所は、どこにも存在しない、って言い切ってるんだよ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "there は場所じゃなくて「存在」の合図だったのか。だから強く残るんだね。",
      say: "ゼアは、ばしょじゃなくて、存在の合図だったのか。だから、強く残るんだね。",
    },

    { kind: "chapter", title: "まとめ：物語の始まり" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4 },
      text: "昔話の Once upon a time, there was …… も同じ。まだ知らない登場人物を紹介するからなんだ。1611年の『欽定訳聖書』の Let there be light: and there was light. も、光が現れる瞬間を there で語ってる。",
      say: "昔話の、ワンス アポン ア タイム、ゼア ワズ、も同じ。まだ知らない、登場人物を、紹介するからなんだ。1611ねんの、きんていやく聖書の、レット ゼア ビー ライト、アンド ゼア ワズ ライト。も、光が現れる瞬間を、ゼアで語ってる。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "2人以上なら there were で、There were three little pigs. か。「3びきの子ぶたがいました」だね。",
      say: "ふたり以上なら、ゼア ワーで、ゼア ワー スリー リトル ピッグズ。か。3びきの、子ぶたがいました、だね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "DJさん、来週の放送で答えられそうだね。わたしも次は there を「そこ」って訳さないようにする。",
      say: "ディージェーさん、来週の放送で、答えられそうだね。わたしも、つぎは、ゼアを、そこ、って訳さないようにする。",
    },
  ],
};
