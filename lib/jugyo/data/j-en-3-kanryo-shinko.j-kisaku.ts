import type { CastScript } from "../types";

// 止まる授業：現在完了進行形（中3・英語）× 気さくな兄・姉（アサヒ兄さん・スミレ姉さん）。事実・例文・人名・年は lib/lecture/data/j-en-3-kanryo-shinko.ts の本文だけ。
// 雑談の調子で、うろ覚えを「わたしもそう覚えてた」と言って直していく。英文は say でカタカナに開く。
// 「リップ・ヴァン・ウィンクル」の英文は本文にある部分だけを引き、登場人物のせりふは作らない。問題は data/j-en-3-kanryo-shinko.ts から引く。

export const J_KANRYO_SHINKO_J_KISAKU: CastScript = {
  unitId: "j-en-3-kanryo-shinko",
  castId: "j-kisaku",
  title: "「この20年、どこにいたの？」：have been ＋ ing と have been を使い分ける",
  scenes: [
    { kind: "chapter", title: "つかみ：英語劇のせりふ" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "よっ、アサヒです。今日は英語劇部の脚本係の先輩から相談。文化祭で「リップ・ヴァン・ウィンクル」をやるんだって。",
      say: "よっ、アサヒです。きょうわ、英語劇部の、きゃくほんがかりの、先輩から、相談。文化祭で、リップ・ヴァン・ウィンクルを、やるんだって。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "スミレです。山で20年眠ったリップが村に帰ると、年をとった女性が Where have you been these twenty long years? って聞くんだよね。",
      say: "スミレです。やまで、20ねん眠った、リップが、むらに帰ると、としをとった、女性が、ウェア ハブ ユー ビーン ジーズ トゥエンティ ロング イヤーズ、って、聞くんだよね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "役の後輩が「20年前のことなら Where were you? のほうが簡単では？」って。正直、わたしもそう思ってた。",
      say: "役の後輩が、20ねんまえのことなら、ウェア ワー ユー、のほうが、簡単でわ？　って。正直、わたしも、そう思ってた。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "それに、ずっといたなら have been being にならないのも、ふしぎじゃん。いっしょに見ていこう。",
      say: "それに、ずっと、いたなら、ハブ ビーン ビーイングに、ならないのも、ふしぎじゃん。いっしょに、見ていこう。",
    },

    { kind: "chapter", title: "1. 過去から今まで続く動作" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "I have been studying English since 2023. は、2023年に英語の勉強を始めて、{{今もしている}}ってこと。過去の点から今まで、一本の線でつながってるんだ。",
      say: "アイ ハブ ビーン スタディイング イングリッシュ シンス トゥエンティ トゥエンティスリー、わ、2023ねんに、英語の勉強を始めて、いまも、しているってこと。過去の、てんから、いままで、いっぽんの線で、つながってるんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "英語の勉強を始める" },
      text: "始まりは{{since}}、長さは{{for}}。since lunch でも for two hours でも、同じ線を別の角度から言ってるだけなんだよ。",
      say: "始まりわ、シンス。長さわ、フォー。シンス ランチでも、フォー トゥー アワーズでも、同じ線を、べつの角度から、言ってるだけ、なんだよ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "この話を書いたのはアメリカのワシントン・アーヴィングで、1819年の『スケッチ・ブック』に入ってるんだよね。",
      say: "この話を、書いたのわ、アメリカの、ワシントン・アーヴィングで、1819ねんの、スケッチ・ブックに、入ってるんだよね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そう。リップは山で、古風な服の男たちにすすめられた酒を飲んで、ぐっすり眠っちゃうんだ。",
      say: "そう。リップわ、やまで、古風な服の、男たちに、すすめられた、さけを飲んで、ぐっすり、眠っちゃうんだ。",
    },

    { kind: "chapter", title: "2. 形は have been ＋ ing" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "形は、進行形の be＋ing と、現在完了の have＋過去分詞の合体。be を過去分詞の{{been}}にして、have のあとに入れるんだ。",
      say: "かたちわ、しんこうけいの、ビー たす イングと、現在完了の、ハブ たす 過去分詞の、合体。ビーを、過去分詞の、ビーンにして、ハブのあとに、入れるんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "She has been waiting since ten." },
      text: "I have been waiting for an hour. で、1時間ずっと待っている。主語が she なら{{has been}}で、She has been waiting since ten.。",
      say: "アイ ハブ ビーン ウェイティング フォー アン アワー、で、いちじかん、ずっと、待っている。主語が、シーなら、ハズ ビーンで、シー ハズ ビーン ウェイティング シンス テン。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "あれ、been のあとって動詞そのままじゃなかった？　I have been study for two hours. みたいに。わたしもそう覚えてた。",
      say: "あれ、ビーンのあとって、動詞、そのままじゃ、なかった？　アイ ハブ ビーン スタディ フォー トゥー アワーズ、みたいに。わたしも、そう覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "そこ、まちがえやすいんだ。1問いこう。", say: "そこ、まちがえやすいんだ。いちもん、いこう。" },
    { kind: "pause", ref: "mistake:3" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "How long have you been waiting?" },
      text: "been のあとは ing。長さを聞くなら{{How long}}を前に出して、How long have you been waiting?。答えは For an hour. でいいんだ。じゃあ、続けてもう1問。",
      say: "ビーンのあとわ、イング。長さを聞くなら、ハウ ロングを、まえに出して、ハウ ロング ハブ ユー ビーン ウェイティング。答えわ、フォー アン アワー、で、いいんだ。じゃあ、続けて、もう、いちもん。",
    },
    { kind: "pause", ref: "check:1" },
    {
      kind: "talk",
      who: "seito",
      text: "目をさましたリップは、I have not slept here all night. って思うんだよね。ひと晩じゅう寝てたわけじゃあるまい、って。ほんとは20年なのに。",
      say: "めを、さました、リップわ、アイ ハブ ノット スレプト ヒア オール ナイト、って、思うんだよね。ひとばんじゅう、寝てたわけじゃ、あるまい、って。ほんとわ、20ねんなのに。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "知ってたら、I have been sleeping here for twenty years! ってさけんでたかもね。",
      say: "知ってたら、アイ ハブ ビーン スリーピング ヒア フォー トゥエンティ イヤーズ、って、さけんでたかもね。",
    },

    { kind: "chapter", title: "3. 動作の動詞と状態の動詞" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "「ずっと〜している」は二通り。study・play・wait みたいな{{動作}}の動詞は have been＋ing。know・like・want・be みたいな{{状態}}の動詞は、have＋過去分詞なんだ。",
      say: "ずっと、している、わ、ふたとおり。スタディ、プレイ、ウェイト、みたいな、動作の動詞わ、ハブ ビーン たす イング。ノウ、ライク、ウォント、ビー、みたいな、状態の動詞わ、ハブ たす 過去分詞、なんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "状態の動詞" },
      text: "状態の動詞は、もともと「続いている」意味が入ってるから、進行形にしないんだよね。",
      say: "状態の動詞わ、もともと、続いている、意味が、入ってるから、しんこうけいに、しないんだよね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "えっ、でも「ずっと知ってる」なら I have been knowing him for five years. って言いたくなる。わたしもそう覚えてた。",
      say: "えっ、でも、ずっと知ってる、なら、アイ ハブ ビーン ノウイング ヒム フォー ファイブ イヤーズ、って、言いたくなる。わたしも、そう覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "わかる。1問。", say: "わかる。いちもん。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "村に戻ったリップは、知った顔がなくておどろくんだ。眠ってる間に{{アメリカ独立戦争}}が起きて、宿屋の看板の国王ジョージは、ワシントン将軍に描きかえられてた。",
      say: "むらに戻った、リップわ、知った顔が、なくて、おどろくんだ。眠ってる、あいだに、アメリカ独立戦争が起きて、宿屋の看板の、国王ジョージわ、ワシントン将軍に、描きかえられてた。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "若い母親は it's twenty years since he went away って答えるんだよね。出ていってから20年になる、って。",
      say: "若い母親わ、イッツ トゥエンティ イヤーズ シンス ヒー ウェント アウェイ、って、答えるんだよね。出ていってから、20ねんになる、って。",
    },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "そこで年配の女性の Where have you been these twenty long years?。be は「いる」っていう{{状態}}の動詞だから、have been being にはしないで、現在完了の{{have been}}を使うんだ。",
      say: "そこで、年配の女性の、ウェア ハブ ユー ビーン ジーズ トゥエンティ ロング イヤーズ。ビーわ、いる、っていう、状態の動詞だから、ハブ ビーン ビーイングにわ、しないで、現在完了の、ハブ ビーンを、使うんだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "あ、わかった。Where were you? だと、過去のある時点のことを聞くだけ。have been だと、出ていった日から今ここに立つまでの20年を、まるごと聞いてるんだね。",
      say: "あ、わかった。ウェア ワー ユー、だと、過去の、ある時点のことを、聞くだけ。ハブ ビーンだと、出ていったひから、いま、ここに立つまでの、20ねんを、まるごと、聞いてるんだね。",
    },

    { kind: "chapter", title: "4. 現在進行形とのちがいは長さ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "最後に。It is raining now. は「今降ってる」だけ。It has been raining since this morning. だと「{{今朝からずっと}}降ってる」って、{{長さ}}も伝わるんだ。",
      say: "最後に。イット イズ レイニング ナウ、わ、いま、ふってる、だけ。イット ハズ ビーン レイニング シンス ディス モーニング、だと、けさから、ずっと、ふってる、って、長さも、伝わるんだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ、I am waiting for an hour. でも、1時間待ってるって伝わらない？　わたしもそう覚えてた。",
      say: "じゃあ、アイ アム ウェイティング フォー アン アワー、でも、いちじかん、待ってるって、伝わらない？　わたしも、そう覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "for があるのがポイント。ラスト1問。", say: "フォーが、あるのが、ポイント。ラスト、いちもん。" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "for / since / How long" },
      text: "for・since・How long が見えたら、完了進行形の目じるし。この短編だって People have been reading this story for more than 200 years. なんだよ。",
      say: "フォー、シンス、ハウ ロングが、見えたら、完了しんこうけいの、めじるし。この短編だって、ピープル ハブ ビーン リーディング ディス ストーリー フォー モア ザン トゥーハンドレッド イヤーズ、なんだよ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "原作のせりふ、そのまま残してもらおう。20年分の重みをこめてね。",
      say: "原作の、せりふ、そのまま、残してもらおう。20ねんぶんの、重みを、こめてね。",
    },
  ],
};
