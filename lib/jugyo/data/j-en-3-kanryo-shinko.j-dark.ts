import type { CastScript } from "../types";

// 止まる授業：現在完了進行形（中3・英語）× ダーク解説（ヨトバリ・ミカゲ）。事実・例文・人名・年は lib/lecture/data/j-en-3-kanryo-shinko.ts の本文だけ。
// 英文は say でカタカナに開く。「リップ・ヴァン・ウィンクル」の英文は本文にある部分だけを引き、登場人物のせりふは作らない。問題は data/j-en-3-kanryo-shinko.ts から引く。

export const J_KANRYO_SHINKO_J_DARK: CastScript = {
  unitId: "j-en-3-kanryo-shinko",
  castId: "j-dark",
  title: "二十年の問いかけ：知識の書「現在完了進行形」の封印を解く",
  scenes: [
    { kind: "chapter", title: "序章：二十年の眠り" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "……来たか。我が名はヨトバリ。今宵ひらくのは「現在完了進行形」と記された知識の書だ。",
      say: "……来たか。わがなわ、ヨトバリ。こよい、ひらくのわ、げんざいかんりょう、しんこうけい、と記された、知識の書だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "相棒のミカゲ。依頼人は英語劇部の脚本係の先輩。文化祭で、英語劇「リップ・ヴァン・ウィンクル」を上演するそうよ。",
      say: "相棒のミカゲ。依頼人わ、英語劇部の、きゃくほんがかりの、先輩。文化祭で、英語劇、リップ・ヴァン・ウィンクルを、上演するそうよ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "山で20年眠りこけた男が村に帰る。そこで、年をとった女性がたずねる。Where have you been these twenty long years?",
      say: "やまで、20ねん、眠りこけた男が、むらに帰る。そこで、としをとった、女性が、たずねる。ウェア ハブ ユー ビーン ジーズ トゥエンティ ロング イヤーズ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "20年前のことを聞くなら、過去形の Where were you? で足りる。その役の後輩もそう言っているそうね。……わたしも同じ意見。",
      say: "20ねんまえのことを、聞くなら、過去形の、ウェア ワー ユー、で足りる。その役の後輩も、そう言っているそうね。……わたしも、同じ意見。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "なぜ過去形ではないのか。しかも、ずっと続いていたのに、なぜ have been being とならないのか。……開け、知識の書。",
      say: "なぜ、過去形でわ、ないのか。しかも、ずっと続いていたのに、なぜ、ハブ ビーン ビーイング、と、ならないのか。……ひらけ、知識の書。",
    },

    { kind: "chapter", title: "第一章：一本の線" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "I have been studying English since 2023.。2023年に英語の勉強を始めて、{{今もしている}}。過去の点から今まで、動作が一本の線でつながる。これが{{現在完了進行形}}だ。",
      say: "アイ ハブ ビーン スタディイング イングリッシュ シンス トゥエンティ トゥエンティスリー。2023ねんに、英語の勉強を始めて、いまも、している。過去の、てんから、いままで、動作が、いっぽんの線で、つながる。これが、げんざいかんりょう、しんこうけいだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "今も勉強している" },
      text: "始まった時点は{{since}}、続いてきた長さは{{for}}。since lunch も for two hours も、線の「始まり」と「長さ」を、別の角度から言っているだけだ。",
      say: "始まった時点わ、シンス。続いてきた、ながさわ、フォー。シンス ランチも、フォー トゥー アワーズも、線の、始まりと、長さを、べつの角度から、言っているだけだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "物語を書いたのは、アメリカのワシントン・アーヴィング。1819年、作品集『スケッチ・ブック』で発表した短編よ。",
      say: "物語を書いたのわ、アメリカの、ワシントン・アーヴィング。1819ねん、作品集、スケッチ・ブックで、発表した、短編よ。",
    },

    { kind: "chapter", title: "第二章：been の封印" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "形は、二つの文法の合体だ。進行形の be＋ing と、現在完了の have＋過去分詞。be を過去分詞の{{been}}にして、have のあとに入れる。",
      say: "かたちわ、ふたつの文法の、合体だ。進行形の、ビー たす イングと、現在完了の、ハブ たす 過去分詞。ビーを、過去分詞の、ビーンにして、ハブのあとに、入れる。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "I have been waiting for an hour." },
      text: "I am waiting for Ken. は、今、待っている。I have been waiting for an hour. なら、1時間ずっと待っている。主語が she なら{{has been}}だ。",
      say: "アイ アム ウェイティング フォー ケン、わ、いま、待っている。アイ ハブ ビーン ウェイティング フォー アン アワー、なら、いちじかん、ずっと、待っている。主語が、シーなら、ハズ ビーンだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "been のあとは動詞をそのまま置けばいい。I have been study for two hours. ……当然でしょう。",
      say: "ビーンのあとわ、動詞を、そのまま、置けばいい。アイ ハブ ビーン スタディ フォー トゥー アワーズ。……当然でしょう。",
    },
    { kind: "talk", who: "sensei", text: "……その思いこみ、最初の封印で見きわめる。", say: "……その思いこみ、最初の封印で、見きわめる。" },
    { kind: "pause", ref: "mistake:3" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "How long have you been waiting?" },
      text: "been のあとは ing。そして長さをたずねるなら{{How long}}。How long have you been waiting? には、For an hour. と答える。",
      say: "ビーンのあとわ、イング。そして、長さを、たずねるなら、ハウ ロング。ハウ ロング ハブ ユー ビーン ウェイティング、にわ、フォー アン アワー、と答える。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "では問う。「どのくらいの間テレビを見ているの？」を英語で言え。",
      say: "では、問う。どのくらいの、あいだ、テレビを見ているの？　を、英語で言え。",
    },
    { kind: "pause", ref: "check:1" },
    {
      kind: "talk",
      who: "seito",
      text: "目をさましたリップは、心の中でつぶやく。I have not slept here all night.。ひと晩じゅうここで寝ていたわけじゃあるまい、と。本当は20年なのにね。",
      say: "めを、さました、リップわ、こころのなかで、つぶやく。アイ ハブ ノット スレプト ヒア オール ナイト。ひとばんじゅう、ここで、寝ていたわけじゃ、あるまい、と。本当わ、20ねんなのにね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "事実を知っていたら、こうさけんだことだろう。I have been sleeping here for twenty years!",
      say: "事実を、知っていたら、こう、さけんだことだろう。アイ ハブ ビーン スリーピング ヒア フォー トゥエンティ イヤーズ。",
    },

    { kind: "chapter", title: "第三章：動作と状態" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "動作の動詞" },
      text: "「ずっと〜している」には二つの形がある。study・play・wait のような{{動作}}の動詞は、have been＋ing。",
      say: "ずっと、している、にわ、ふたつの、かたちがある。スタディ、プレイ、ウェイトのような、動作の動詞わ、ハブ ビーン たす イング。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "状態の動詞" },
      text: "know・like・want・be のような{{状態}}の動詞は、もともと「続いている」意味をふくむ。だから進行形にせず、have＋過去分詞だ。",
      say: "ノウ、ライク、ウォント、ビーのような、状態の動詞わ、もともと、続いている、意味を、ふくむ。だから、進行形にせず、ハブ たす 過去分詞だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "知り合ってからずっと、なのだから、I have been knowing him for five years. ……これで問題ないでしょう。",
      say: "知り合ってから、ずっと、なのだから、アイ ハブ ビーン ノウイング ヒム フォー ファイブ イヤーズ。……これで、問題ないでしょう。",
    },
    { kind: "talk", who: "sensei", text: "know は何の動詞か。封印が問う。", say: "ノウわ、なんの動詞か。封印が、問う。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "seito",
      text: "村に戻ったリップに、若い母親が答える。it's twenty years since he went away。出ていってから20年になる、と。",
      say: "むらに戻った、リップに、若い母親が答える。イッツ トゥエンティ イヤーズ シンス ヒー ウェント アウェイ。出ていってから、20ねんになる、と。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "眠っている間に{{アメリカ独立戦争}}が起こり、宿屋の看板の国王ジョージの顔は、ワシントン将軍に描きかえられていた。",
      say: "眠っている、あいだに、アメリカ独立戦争が起こり、宿屋の看板の、国王ジョージの顔わ、ワシントン将軍に、描きかえられていた。",
    },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "そして人ごみから出てきた年配の女性が、リップの顔をのぞきこむ。Where have you been these twenty long years?。be は「いる」という{{状態}}の動詞。だから have been being とはせず、現在完了の{{have been}}を使う。",
      say: "そして、ひとごみから出てきた、年配の女性が、リップの顔を、のぞきこむ。ウェア ハブ ユー ビーン ジーズ トゥエンティ ロング イヤーズ。ビーわ、いる、という、状態の動詞。だから、ハブ ビーン ビーイング、とわせず、現在完了の、ハブ ビーンを使う。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "……わかった。Where were you? なら、過去のある時点でどこにいたかを聞くだけ。have been は、出ていった日から今ここに立つまでの20年を、丸ごと問いかけているのね。",
      say: "……わかった。ウェア ワー ユー、なら、過去の、ある時点で、どこにいたかを、聞くだけ。ハブ ビーンわ、出ていったひから、いま、ここに立つまでの、20ねんを、まるごと、問いかけているのね。",
    },
    { kind: "talk", who: "sensei", text: "……線は、つながった。", say: "……線わ、つながった。" },

    { kind: "chapter", title: "第四章：一コマと、その長さ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "It is raining now. は、窓の外の一コマを切り取る{{現在進行形}}。It has been raining since this morning. は、そこに「今朝から」という{{長さ}}を足す。",
      say: "イット イズ レイニング ナウ、わ、窓のそとの、ひとコマを、切り取る、現在進行形。イット ハズ ビーン レイニング シンス ディス モーニング、わ、そこに、けさから、という、長さを足す。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "なら、長さを言うときも進行形で足りる。I am waiting for an hour. ……問題ないでしょう。",
      say: "なら、長さを言うときも、進行形で足りる。アイ アム ウェイティング フォー アン アワー。……問題ないでしょう。",
    },
    { kind: "talk", who: "sensei", text: "for が見えぬか。最後の封印だ。", say: "フォーが、見えぬか。最後の封印だ。" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "for / since / How long" },
      text: "for・since・How long が見えたら、完了進行形の目じるしだ。続いてきた時間の重みまで伝わる。",
      say: "フォー、シンス、ハウ ロングが、見えたら、完了進行形の、めじるしだ。続いてきた時間の、重みまで、伝わる。",
    },

    { kind: "chapter", title: "終章：封印は解かれた" },
    {
      kind: "talk",
      who: "seito",
      text: "依頼人は、原作のせりふのまま演じてもらうそうよ。20年分の重みをこめて。",
      say: "依頼人わ、原作の、せりふのまま、演じてもらうそうよ。20ねんぶんの、重みを、こめて。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "この短編は、今も読み継がれている。People have been reading this story for more than 200 years.。過去から今まで、途切れずに続く線。封印は解かれた。",
      say: "この短編わ、いまも、読みつがれている。ピープル ハブ ビーン リーディング ディス ストーリー フォー モア ザン トゥーハンドレッド イヤーズ。過去から、いままで、とぎれずに続く線。封印わ、とかれた。",
    },
  ],
};
