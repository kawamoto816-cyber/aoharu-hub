import type { CastScript } from "../types";

// 止まる授業：助動詞（中2・英語）× 気さくな兄・姉（アサヒ兄さん・スミレ姉さん）。事実・例文・人名・年は lib/lecture/data/j-en-2-jodoshi.ts の本文だけ。
// 雑談の調子で、うろ覚えを「わたしもそう覚えてた」と言って直していく。英文は say でカタカナに開く。
// ルーズベルト大統領の言葉は lecture にある演説の英文だけを引き、せりふは作らない。問題は data/j-en-2-jodoshi.ts から引く。

export const JODOSHI_J_KISAKU: CastScript = {
  unitId: "j-en-2-jodoshi",
  castId: "j-kisaku",
  title: "「恐れるな」じゃなかった：must not と don't have to のちがい",
  scenes: [
    { kind: "chapter", title: "つかみ：ラジオ番組の相談" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "よっ、アサヒです。今日は、コミュニティFMで英語番組をやってるDJさんから相談。1933年のルーズベルト大統領の就任演説を、特集で流すんだって。",
      say: "よっ、アサヒです。きょうは、コミュニティ エフエムで、英語番組をやってる、ディージェーさんから相談。1933年の、ルーズベルト大統領の、就任演説を、特集で流すんだって。",
    },
    { kind: "talk", who: "seito", text: "スミレです。どんな演説なの？" },
    {
      kind: "talk",
      who: "sensei",
      text: "銀行に人がつめかけて、国じゅうが不安だったころ。いちばん有名なのが the only thing we have to fear is fear itself って一文なんだ。",
      say: "銀行に、ひとがつめかけて、くにじゅうが、不安だったころ。いちばん有名なのが、ジ オンリー シング ウィー ハフ トゥ フィア イズ フィア イットセルフ、って一文なんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "で、リスナーの中学生から「恐れるなと言いたいなら、must not fear でいいのでは？」って質問が来たらしい。",
      say: "で、リスナーの中学生から、恐れるなと言いたいなら、マスト ノット フィア、でいいのでは？　って、質問が来たらしい。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "わたしもそう思っちゃう。なんで have to なんだろう。",
      say: "わたしも、そう思っちゃう。なんで、ハフ トゥなんだろう。",
    },
    { kind: "talk", who: "sensei", text: "そこ、あとでちゃんとつながるから、形から見ていこう。", say: "そこ、あとで、ちゃんとつながるから、かたちから見ていこう。" },

    { kind: "chapter", title: "1. 助動詞＋動詞の原形" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "must・should・may は、can や will の仲間の{{助動詞}}。動詞に話す人の気持ちを足すんだ。He studies hard. は事実だけど、He must study hard. なら「勉強しなきゃいけない」って判断が入る。",
      say: "マスト、シュッド、メイは、キャンや、ウィルの仲間の、助動詞。動詞に、話すひとの気持ちを、足すんだ。ヒー スタディーズ ハード。は、事実だけど、ヒー マスト スタディ ハード。なら、勉強しなきゃいけない、って判断が入る。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "He must not play games now." },
      text: "あとの動詞は{{いつも原形}}。否定は助動詞の{{すぐ後ろに not}}、疑問は助動詞を{{主語の前}}に出す。do や does はいらないよ。",
      say: "あとの動詞は、いつも原形。否定は、助動詞の、すぐうしろに、ノット。疑問は、助動詞を、主語のまえに出す。ドゥーや、ダズは、いらないよ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でも主語が he なら -s がつくでしょ。He musts go home. って、わたしもそう覚えてた。",
      say: "でも、主語がヒーなら、エスがつくでしょ。ヒー マスツ ゴー ホーム。って、わたしも、そう覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "そこ、よく出るんだよね。確かめてみよう。", say: "そこ、よく出るんだよね。確かめてみよう。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "演説の初めの This great Nation will endure もそう。Nation は3人称単数だけど、will のあとの endure・revive・prosper は全部原形なんだ。",
      say: "演説の初めの、ディス グレート ネイション ウィル エンデュア、もそう。ネイションは、3人称単数だけど、ウィルのあとの、エンデュア、リバイブ、プロスパーは、全部、原形なんだ。",
    },

    { kind: "chapter", title: "2. 否定で意味が分かれる" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "肯定" },
      text: "must と {{have to}} は、肯定ならどっちも「〜しなければならない」。I must finish this report today. も I have to finish this report today. も同じ意味。",
      say: "マストと、ハフ トゥは、肯定なら、どっちも、しなければならない。アイ マスト フィニッシュ ディス リポート トゥデイ。も、アイ ハフ トゥ フィニッシュ ディス リポート トゥデイ。も、同じ意味。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でも、ちょっとちがいがあるんだっけ。",
      say: "でも、ちょっと、ちがいがあるんだっけ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "うん。must は話し手が「そうしなきゃ」って強く思う気持ち、have to はルールや事情で外から「そうするしかない」ってときが多いんだ。",
      say: "うん。マストは、話し手が、そうしなきゃ、って強く思う気持ち。ハフ トゥは、ルールや事情で、そとから、そうするしかない、ってときが多いんだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ否定も同じだよね。「明日は来なくていい」は You must not come tomorrow.。",
      say: "じゃあ、否定も、同じだよね。あしたは来なくていい、は、ユー マスト ノット カム トゥモロー。",
    },
    { kind: "talk", who: "sensei", text: "それ、言われた人びっくりするやつ。見てみよう。", say: "それ、言われたひと、びっくりするやつ。見てみよう。" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "don't have to：〜する必要はない" },
      text: "{{must not}} は「してはいけない」って{{禁止}}。You must not run in the hallway. ね。{{don't have to}} は「する必要はない」。持ってきてもいいけど、持ってこなくてもいい、って感じ。",
      say: "マスト ノットは、してはいけない、って禁止。ユー マスト ノット ラン イン ザ ホールウェイ。ね。ドント ハフ トゥは、する必要はない。持ってきてもいいけど、持ってこなくてもいい、って感じ。",
    },
    {
      kind: "talk",
      who: "seito",
      card: "reveal",
      text: "わかった！　あの一文は「恐れなきゃいけないのは、恐れそのものだけ」。裏返すと、ほかのものは{{恐れる必要はない}}ってことなんだ。",
      say: "わかった！　あの一文は、恐れなきゃいけないのは、恐れそのものだけ。裏返すと、ほかのものは、恐れる必要はない、ってことなんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そう。You must not fear. だと、不安な人をしかる命令に聞こえちゃう。have to の文は重荷を下ろしてくれるんだよ。同じ演説で、行動のほうは We must act and act quickly. って must で決意を見せてるんだ。",
      say: "そう。ユー マスト ノット フィア、だと、不安なひとを、しかる命令に聞こえちゃう。ハフ トゥの文は、重荷を下ろしてくれるんだよ。同じ演説で、行動のほうは、ウィー マスト アクト アンド アクト クイックリー。って、マストで、決意を見せてるんだ。",
    },

    { kind: "chapter", title: "3. have to は形が変わる" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "She had to get up early." },
      text: "must には過去形も未来形もないんだ。だから have to の出番。主語が3人称単数なら{{has to}}、過去なら{{had to}}、未来なら will have to。否定・疑問は do・does・did を使うよ。",
      say: "マストには、過去形も、みらいけいも、ないんだ。だから、ハフ トゥの出番。主語が、3人称単数なら、ハズ トゥ。過去なら、ハッド トゥ。未来なら、ウィル ハフ トゥ。否定、疑問は、ドゥー、ダズ、ディッドを使うよ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "She doesn't have to cook tonight. で「今夜は料理する必要はない」。Did you have to stay home? には Yes, I did. か No, I didn't. で答える。一般動詞と同じだね。",
      say: "シー ダズント ハフ トゥ クック トゥナイト。で、今夜は、料理する必要はない。ディッド ユー ハフ トゥ ステイ ホーム。には、イエス アイ ディッド。か、ノー アイ ディドント。で答える。一般動詞と、同じだね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "will must みたいに助動詞を2つ並べられないから、未来は will have to なんだね。",
      say: "ウィル マスト、みたいに、助動詞を2つ並べられないから、未来は、ウィル ハフ トゥなんだね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "あと、過去なら -ed をつけて、I musted finish my homework yesterday. じゃだめ？",
      say: "あと、過去なら、イーディーをつけて、アイ マステッド フィニッシュ マイ ホームワーク イエスタデイ。じゃ、だめ？",
    },
    { kind: "talk", who: "sensei", text: "わかる、つけたくなるよね。1問いこう。", say: "わかる、つけたくなるよね。1問いこう。" },
    { kind: "pause", ref: "mistake:3" },
    {
      kind: "talk",
      who: "seito",
      text: "1933年の春のアメリカは、Many families had to live on very little money.、わずかなお金でやりくりしなければならなかったんだよね。",
      say: "1933年の春のアメリカは、メニー ファミリーズ ハッド トゥ リブ オン ベリー リトル マネー。わずかなお金で、やりくりしなければ、ならなかったんだよね。",
    },

    { kind: "chapter", title: "4. should と may" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "should" },
      text: "{{should}} は「〜したほうがよい」。You should see a doctor. みたいに、must ほど強くないやさしい助言。{{may}} は「〜してもよい」と「〜かもしれない」の2つ。It may rain this afternoon. は推量ね。",
      say: "シュッドは、したほうがよい。ユー シュッド シー ア ドクター。みたいに、マストほど強くない、やさしい助言。メイは、してもよい、と、かもしれない、の2つ。イット メイ レイン ディス アフタヌーン。は、推量ね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "会話だと May I use the bathroom? は許可を求める言い方、Could you help me? はていねいなお願い。Shall we dance? はさそいだね。",
      say: "会話だと、メイ アイ ユーズ ザ バスルーム。は、許可を求める言いかた。クッド ユー ヘルプ ミー。は、ていねいなお願い。シャル ウィー ダンス。は、さそいだね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "Shall I open the window? は「窓を開けましょうか」で、答えは Yes, please. か No, thank you. だっけ。",
      say: "シャル アイ オープン ザ ウィンドウ。は、窓をあけましょうか、で、答えは、イエス プリーズ。か、ノー サンキュー。だっけ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "may といえば、1962年のケネディ大統領の演説。月へ行く目標に反対する声に、they may well ask why climb the highest mountain. って返したんだ。may well は「〜するのももっともだ」。相手の問いをいったん受けとめてるんだよ。",
      say: "メイといえば、1962年の、ケネディ大統領の演説。月へ行く目標に、反対する声に、ゼイ メイ ウェル アスク ホワイ クライム ザ ハイエスト マウンテン、って返したんだ。メイ ウェルは、するのも、もっともだ。相手の問いを、いったん受けとめてるんだよ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "その演説の7年後、1969年7月に、アポロ11号の宇宙飛行士が月面に降り立ったんだよね。",
      say: "その演説の、7年後、1969年7月に、アポロ11号の、宇宙飛行士が、月面に降り立ったんだよね。",
    },
    { kind: "talk", who: "sensei", text: "そうそう。最後に、アドバイスの1問。", say: "そうそう。最後に、アドバイスの、1問。" },
    { kind: "pause", ref: "check:2" },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "seito",
      text: "次はきみの番。「してはいけないこと」と「しなくてもいいこと」を1つずつ考えて、must not と don't have to で言ってみてね。",
      say: "次はきみの番。してはいけないことと、しなくてもいいことを、1つずつ考えて、マスト ノットと、ドント ハフ トゥで、言ってみてね。",
    },
  ],
};
