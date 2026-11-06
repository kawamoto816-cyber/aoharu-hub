import type { CastScript } from "../types";

// 止まる授業：仮定法（高校・英文法）× カリスマ講師（カナメ先生・ユウキ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-kateiho.ts の本文だけ。
// 要点をしぼって言い切り、「ポイントは〜」で整理する。英文は say でカタカナに開く。問題は data/h-eng-gram-kateiho.ts から引く。

export const KATEIHO_H_CHARISMA: CastScript = {
  unitId: "h-eng-gram-kateiho",
  castId: "h-charisma",
  title: "なぜ今の話に過去形？　仮定法は「1つずらす」で全部つくれる",
  scenes: [
    { kind: "chapter", title: "つかみ：knocked と had had" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "カナメです。今日の依頼人は、市民劇場の朗読劇ディレクター。『嵐が丘』の少年ヒースクリフは、一度もなぐっていない相手について if I knocked him down と過去形で言い、詩人キーツは手紙に if I had had time と had を2つ重ねた。",
      say: "カナメです。きょうの、いらいにんは、市民劇場の、朗読劇ディレクター。あらしがおかの少年、ヒースクリフは、一度もなぐっていない相手について、イフ アイ ノックト ヒム ダウン、と、過去形で言い、詩人キーツは、手紙に、イフ アイ ハッド ハッド タイム、と、ハッドを2つ重ねた。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "受講生のユウキです。出演する高校生は、knocked を昔の思い出みたいに読んで、had had は「印刷ミスですか」と聞いたそうです。",
      say: "受講生のユウキです。出演する高校生は、ノックトを、昔の思い出みたいに読んで、ハッド ハッドは、印刷ミスですか、と聞いたそうです。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そこが入口。{{英語はなぜ、現実とちがうことを言うとき、時制を1つ昔へずらすのか}}。今日はこれを解く。",
      say: "そこが入口。英ごは、なぜ、現実とちがうことを言うとき、時制を、ひとつ昔へずらすのか。きょうは、これを解く。",
    },

    { kind: "chapter", title: "1. ふつうの if と仮定法" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "If he comes, I will tell him. は、来るかもしれないと思っている{{ふつうの条件}}。If he came, I would tell him. は、来ないだろうと思っている{{仮定法}}。ポイントは、表すのは事実ではなく{{話し手の判断}}。",
      say: "イフ ヒー カムズ、アイ ウィル テル ヒム、は、来るかもしれないと思っている、ふつうの条件。イフ ヒー ケイム、アイ ウッド テル ヒム、は、来ないだろうと思っている、仮定法。ポイントは、表すのは、事実ではなく、はなしての判断。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "仮定法過去（今）" },
      text: "形は3タイプ。仮定法過去は、if 節が過去形、主節が would ＋原形。仮定法過去完了は、if 節が had ＋過去分詞、主節が would have ＋過去分詞。主節の would は could・might にもなる。",
      say: "かたちは、3タイプ。仮定法過去は、イフせつが過去形、主節が、ウッド、たす、原形。仮定法過去完了は、イフせつが、ハッド、たす、過去分詞、主節が、ウッド ハヴ、たす、過去分詞。主節のウッドは、クッド、マイトにもなる。",
    },

    { kind: "chapter", title: "2. 今の反対は過去形" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "仮定法過去は、事実の文から作ると確実。As I don't have time, I can't go. の現在形を1つ過去にずらし、否定を肯定に。If I had time, I could go. 形は過去でも、話は{{今}}。",
      say: "仮定法過去は、事実の文から作ると、確実。アズ アイ ドント ハヴ タイム、アイ キャント ゴー、の、現在形を、ひとつ過去にずらし、否定を肯定に。イフ アイ ハッド タイム、アイ クッド ゴー。かたちは過去でも、話は、いま。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ「わたしがあなたなら待つ」は、今の話だから現在形のままで、If I am you, I would wait. ですね。",
      say: "じゃあ、わたしがあなたなら待つ、は、いまの話だから、現在形のままで、イフ アイ アム ユー、アイ ウッド ウェイト、ですね。",
    },
    { kind: "talk", who: "sensei", text: "ここで差がつく。問題。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "If I were you, I would wait." },
      text: "be動詞は主語にかかわらず{{were}}がふつう。ではヒースクリフ。着飾って帰ってきたキャサリンのそばの、色白のエドガーと自分を比べて、if I knocked him down twenty times, that wouldn't make him less handsome と言う。",
      say: "ビー動詞は、主語にかかわらず、ワーがふつう。では、ヒースクリフ。着飾って帰ってきた、キャサリンのそばの、色白のエドガーと、自分を比べて、イフ アイ ノックト ヒム ダウン トゥエンティ タイムズ、ザット ウドゥント メイク ヒム レス ハンサム、と言う。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "knocked は過去の出来事ではない。仮にそうしたとしても、という{{現実から一歩はなれた想像}}。続く I wish I had light hair も今の自分の裏返し。最後の as rich as he will be だけは will のまま。エドガーが金持ちになるのは、くつがえらない現実だからだ。",
      say: "ノックトは、過去の出来事ではない。仮にそうしたとしても、という、現実から一歩、はなれた想像。続く、アイ ウィッシュ アイ ハッド ライト ヘアも、いまの自分の裏返し。最後の、アズ リッチ アズ ヒー ウィル ビーだけは、ウィルのまま。エドガーが金持ちになるのは、くつがえらない、現実だからだ。",
    },

    { kind: "chapter", title: "3. 過去の反対は過去完了" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "過去の事実の反対は、もう1つ昔の形、過去完了まで下がる。{{仮定法過去完了}}。If I had known, I would have helped you. 知っていたら手伝ったのに。実際は知らなかった。では確認。",
      say: "過去の事実の反対は、もうひとつ昔のかたち、過去完了まで、さがる。仮定法過去完了。イフ アイ ハッド ノウン、アイ ウッド ハヴ ヘルプト ユー。知っていたら、手伝ったのに。実際は、知らなかった。では確認。",
    },
    { kind: "pause", ref: "check:1" },
    {
      kind: "talk",
      who: "seito",
      text: "でも、キーツの had had は、やっぱり had が1つ多い誤植ですよね。",
      say: "でも、キーツの、ハッド ハッドは、やっぱり、ハッドが、ひとつ多い、誤植ですよね。",
    },
    { kind: "talk", who: "sensei", text: "いちばん落とす所。問題。", say: "いちばん落とすところ。問題。" },
    { kind: "pause", ref: "mistake:3" },
    {
      kind: "talk",
      who: "sensei",
      text: "キーツは結核にかかっていると知ったあと、隣家のファニー・ブローンへの手紙に、if I had had time I would have made myself remember'd と書いた。まだ24歳。自分の一生を、もう閉じた過去のように見つめている。",
      say: "キーツは、結核にかかっていると知ったあと、隣家の、ファニー ブローンへの手紙に、イフ アイ ハッド ハッド タイム、アイ ウッド ハヴ メイド マイセルフ リメンバード、と書いた。まだ24歳。自分の一生を、もう閉じた過去のように、見つめている。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "would be" },
      text: "時がまたがる文もある。If I had studied harder, I would be a college student now. if 節は過去、主節は今。主節だけ would ＋原形にする{{混合型}}。",
      say: "ときがまたがる文もある。イフ アイ ハッド スタディド ハーダー、アイ ウッド ビー ア カレッジ スチューデント ナウ。イフせつは過去、主節は、いま。主節だけ、ウッド、たす、原形にする、混合型。",
    },

    { kind: "chapter", title: "謎解き：現実からの距離" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "では謎解き。英語の過去形は、時間の遠さだけでなく{{現実からの遠さ}}を表すしるし。knocked は今の空想だから、現在形から1つずらして過去形。had had は過ぎた過去の反対だから、さらに1つずらして{{過去完了}}。",
      say: "では謎解き。英ごの過去形は、時間の遠さだけでなく、現実からの遠さを表す、しるし。ノックトは、いまの空想だから、現在形から、ひとつずらして過去形。ハッド ハッドは、過ぎた過去の反対だから、さらにひとつずらして、過去完了。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "だから knocked はくやしい空想として、had had は取りもどせない時間への思いとして読めばいいんですね。",
      say: "だから、ノックトは、くやしい空想として、ハッド ハッドは、取りもどせない時間への思いとして、読めばいいんですね。",
    },

    { kind: "chapter", title: "4. I wish・倒置・ていねいさ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "I wish のあとも同じずらし方。今の願いなら過去形、過去への後悔なら過去完了。I wish I knew. と I wish I had known.",
      say: "アイ ウィッシュのあとも、同じずらしかた。いまの願いなら過去形、過去への後悔なら、過去完了。アイ ウィッシュ アイ ニュー、と、アイ ウィッシュ アイ ハッド ノウン。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ「泳げたらなあ」は、can を使って I wish I can swim. ですか？",
      say: "じゃあ、泳げたらなあ、は、キャンを使って、アイ ウィッシュ アイ キャン スウィム、ですか？",
    },
    { kind: "talk", who: "sensei", text: "最後の落とし穴。問題。" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "Had I known, I would have helped you." },
      text: "書きことばでは if を省いて{{倒置}}。If I had known は Had I known。ネリーがヒースクリフをはげます Were I in your place も、If I were in your place の if を消して、were を前に出した形だ。If it were not for 〜（〜がなければ）は Without 〜 や But for 〜 でも言える。",
      say: "書きことばでは、イフを省いて、倒置。イフ アイ ハッド ノウン、は、ハッド アイ ノウン。ネリーが、ヒースクリフをはげます、ワー アイ イン ユア プレイスも、イフ アイ ワー イン ユア プレイスの、イフを消して、ワーを前に出したかたちだ。イフ イット ワー ノット フォー、なになにがなければ、は、ウィズアウト、や、バット フォーでも言える。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "キーツは病気がわかる前の手紙で、I almost wish we were butterflies と書いた。チョウのように夏の3日だけ生きられたら、というありえない願い。だから were。almost をそえて、願いを少しひかえめにしている。",
      say: "キーツは、病気がわかる前の手紙で、アイ オールモスト ウィッシュ ウィー ワー バタフライズ、と書いた。チョウのように、夏のみっかだけ、いきられたら、という、ありえない願い。だから、ワー。オールモストをそえて、願いを、少しひかえめにしている。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4 },
      text: "もう1つ。Would you open the window? が Will you よりていねいなのも、過去形の距離が、人と人の距離になるから。仮定法とは、現実からの距離を時制で測る文法だ。",
      say: "もうひとつ。ウッド ユー オープン ザ ウィンドウ、が、ウィル ユーより、ていねいなのも、過去形の距離が、ひととひとの距離に、なるから。仮定法とは、現実からの距離を、時制で測る文法だ。",
    },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "sensei",
      text: "次はきみが講師だ。キーワードは、話し手の判断、1つ過去へずらす、were、had had、現実からの距離。この順につないで、ディレクターに説明してみよう。",
      say: "次はきみが講師だ。キーワードは、はなしての判断、ひとつ過去へずらす、ワー、ハッド ハッド、現実からの距離。この順につないで、ディレクターに、説明してみよう。",
    },
  ],
};
